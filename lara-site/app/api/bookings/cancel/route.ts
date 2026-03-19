import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServer } from "@/lib/supabase/server"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { deleteCalendarEvent } from "@/lib/google-calendar"
import { sendBookingCancelledEmails } from "@/lib/email"

function getSupabaseAdmin() {
  return createAdminClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const bookingId = String(formData.get("bookingId") || "").trim()

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId em falta." }, { status: 400 })
    }

    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email) {
      return NextResponse.redirect(new URL("/[locale]/auth/login", req.url))
    }

    const admin = getSupabaseAdmin()

    const { data: booking, error } = await admin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: "Marcação não encontrada." }, { status: 404 })
    }

    if (booking.student_email.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json({ error: "Sem autorização." }, { status: 403 })
    }

    if (booking.status === "cancelled") {
      return NextResponse.redirect(new URL("/minhas-explicacoes", req.url))
    }

    if (booking.google_event_id) {
      await deleteCalendarEvent(booking.google_event_id)
    }

    const { error: updateError } = await admin
      .from("bookings")
      .update({
        status: "cancelled",
        google_meet_link: null,
      })
      .eq("id", bookingId)

    if (updateError) {
      throw updateError
    }

    await sendBookingCancelledEmails({
      studentName: booking.student_name,
      studentEmail: booking.student_email,
      startTime: booking.start_time,
    })

    return NextResponse.redirect(new URL("/minhas-explicacoes", req.url))
  } catch (error) {
    console.error("Erro em /api/bookings/cancel:", error)

    return NextResponse.json(
      { error: "Erro ao cancelar a marcação." },
      { status: 500 }
    )
  }
}


