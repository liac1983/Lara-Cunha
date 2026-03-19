import { createClient } from "@supabase/supabase-js"
import { getGoogleBusyRanges } from "@/lib/google-calendar"

const TIMEZONE = "Europe/Lisbon"

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase env vars em falta.")
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
) {
  return aStart < bEnd && aEnd > bStart
}

export async function hasDatabaseConflict(params: {
  startTime: string
  endTime: string
  excludeBookingId?: string
}) {
  const supabase = getSupabaseAdmin()

  let query = supabase
    .from("bookings")
    .select("id,start_time,end_time,status")
    .in("status", ["pending", "confirmed"])
    .lt("start_time", params.endTime)
    .gt("end_time", params.startTime)

  if (params.excludeBookingId) {
    query = query.neq("id", params.excludeBookingId)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return (data ?? []).length > 0
}

export async function hasGoogleCalendarConflict(params: {
  startTime: string
  endTime: string
  excludeEventId?: string
}) {
  const busyRanges = await getGoogleBusyRanges({
    timeMin: params.startTime,
    timeMax: params.endTime,
    timeZone: TIMEZONE,
    excludeEventId: params.excludeEventId,
  })

  const slotStart = new Date(params.startTime)
  const slotEnd = new Date(params.endTime)

  return busyRanges.some((busy) => {
    const busyStart = new Date(busy.start)
    const busyEnd = new Date(busy.end)

    return rangesOverlap(slotStart, slotEnd, busyStart, busyEnd)
  })
}

export async function isBookingSlotStillFree(params: {
  startTime: string
  endTime: string
  excludeBookingId?: string
  excludeEventId?: string
}) {
  const [dbConflict, googleConflict] = await Promise.all([
    hasDatabaseConflict({
      startTime: params.startTime,
      endTime: params.endTime,
      excludeBookingId: params.excludeBookingId,
    }),
    hasGoogleCalendarConflict({
      startTime: params.startTime,
      endTime: params.endTime,
      excludeEventId: params.excludeEventId,
    }),
  ])

  return {
    isFree: !dbConflict && !googleConflict,
    dbConflict,
    googleConflict,
  }
}

export async function createPendingBooking(params: {
  studentName: string
  studentEmail: string
  phone?: string
  topic?: string
  level?: string
  goal?: string
  notes?: string
  startTime: string
  endTime: string
  timezone?: string
}) {
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      student_name: params.studentName,
      student_email: params.studentEmail,
      topic: params.topic || null,
      level: params.level || null,
      notes: buildNotes(params),
      start_time: params.startTime,
      end_time: params.endTime,
      timezone: params.timezone || TIMEZONE,
      status: "pending",
    })
    .select("id")
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateBookingAfterCalendar(params: {
  bookingId: string
  googleEventId: string | null
  googleMeetLink: string | null
}) {
  const supabase = getSupabaseAdmin()

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "confirmed",
      google_event_id: params.googleEventId,
      google_meet_link: params.googleMeetLink,
    })
    .eq("id", params.bookingId)

  if (error) {
    throw error
  }
}

export async function markBookingFailed(bookingId: string) {
  const supabase = getSupabaseAdmin()

  const { error } = await supabase
    .from("bookings")
    .update({ status: "failed" })
    .eq("id", bookingId)

  if (error) {
    throw error
  }
}

function buildNotes(params: {
  phone?: string
  goal?: string
  notes?: string
}) {
  const parts = [
    params.goal ? `Objetivo: ${params.goal}` : null,
    params.phone ? `Telefone: ${params.phone}` : null,
    params.notes ? `Notas: ${params.notes}` : null,
  ].filter(Boolean)

  return parts.join("\n")
}

