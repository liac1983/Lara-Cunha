import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServer } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { isBookingSlotStillFree } from "@/lib/booking-availability"
import { rescheduleCalendarEvent } from "@/lib/google-calendar"
import { sendBookingRescheduledEmails } from "@/lib/email"

function getSupabaseAdmin() {
  return createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function isExactOneHour(start: Date, end: Date) {
  return end.getTime() - start.getTime() === 60 * 60 * 1000
}

function isWeekdayAllowed(date: Date) {
  const day = date.getDay()
  return day >= 1 && day <= 5
}

function isWithinConfiguredWindows(start: Date, end: Date) {
  const weekday = start.getDay()
  const startMinutes = start.getHours() * 60 + start.getMinutes()
  const endMinutes = end.getHours() * 60 + end.getMinutes()

  const windowsByWeekday: Record<number, Array<{ start: number; end: number }>> = {
    1: [
      { start: 9 * 60, end: 12 * 60 },
      { start: 14 * 60, end: 18 * 60 },
    ],
    2: [
      { start: 9 * 60, end: 11 * 60 },
      { start: 14 * 60, end: 18 * 60 },
    ],
    3: [
      { start: 9 * 60, end: 11 * 60 },
      { start: 14 * 60, end: 18 * 60 },
    ],
    4: [
      { start: 9 * 60, end: 11 * 60 },
      { start: 14 * 60, end: 18 * 60 },
    ],
    5: [
      { start: 9 * 60, end: 11 * 60 },
      { start: 14 * 60, end: 18 * 60 },
    ],
  }

  const windows = windowsByWeekday[weekday] ?? []

  return windows.some((window) => {
    return startMinutes >= window.start && endMinutes <= window.end
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const bookingId = String(body.bookingId || "").trim()
    const newStartTime = String(body.newStartTime || "").trim()
    const newEndTime = String(body.newEndTime || "").trim()

    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.json({ error: "Sem sessão." }, { status: 401 })
    }

    const start = new Date(newStartTime)
    const end = new Date(newEndTime)

    if (!bookingId || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 })
    }

    if (!isExactOneHour(start, end)) {
      return NextResponse.json(
        { error: "A sessão tem de ter 1 hora." },
        { status: 400 }
      )
    }

    if (!isWeekdayAllowed(start)) {
      return NextResponse.json(
        { error: "Só aceito marcações de segunda a sexta." },
        { status: 400 }
      )
    }

    if (!isWithinConfiguredWindows(start, end)) {
      return NextResponse.json(
        { error: "Esse horário não está dentro da disponibilidade definida." },
        { status: 400 }
      )
    }

    const admin = getSupabaseAdmin()

    const { data: booking, error } = await admin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json(
        { error: "Marcação não encontrada." },
        { status: 404 }
      )
    }

    if (booking.student_email.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json(
        { error: "Sem autorização." },
        { status: 403 }
      )
    }

    if (!booking.google_event_id) {
      return NextResponse.json(
        { error: "A marcação não tem evento Google associado." },
        { status: 400 }
      )
    }

    const availability = await isBookingSlotStillFree({
      startTime: newStartTime,
      endTime: newEndTime,
      excludeBookingId: booking.id,
      excludeEventId: booking.google_event_id,
    })

    if (!availability.isFree) {
      return NextResponse.json(
        {
          error: "O novo horário já não está disponível.",
          dbConflict: availability.dbConflict,
          googleConflict: availability.googleConflict,
        },
        { status: 409 }
      )
    }

    const calendarEvent = await rescheduleCalendarEvent({
      eventId: booking.google_event_id,
      startTime: newStartTime,
      endTime: newEndTime,
    })

    const { error: updateError } = await admin
      .from("bookings")
      .update({
        start_time: newStartTime,
        end_time: newEndTime,
        google_meet_link: calendarEvent.meetLink,
        status: "confirmed",
      })
      .eq("id", bookingId)

    if (updateError) {
      throw updateError
    }

    let emailWarning: string | null = null

    try {
      await sendBookingRescheduledEmails({
        studentName: booking.student_name,
        studentEmail: booking.student_email,
        oldStartTime: booking.start_time,
        newStartTime,
        meetLink: calendarEvent.meetLink,
      })
    } catch (emailError) {
      console.error("Erro ao enviar emails de remarcação:", emailError)
      emailWarning = "A remarcação foi feita, mas houve um problema no envio do email."
    }

    return NextResponse.json({
      success: true,
      bookingId,
      newStartTime,
      newEndTime,
      meetLink: calendarEvent.meetLink,
      emailWarning,
    })
  } catch (error) {
    console.error("Erro em /api/bookings/reschedule:", error)

    return NextResponse.json(
      { error: "Erro ao remarcar a explicação." },
      { status: 500 }
    )
  }
}

