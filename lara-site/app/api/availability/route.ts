import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getGoogleBusyRanges } from "@/lib/google-calendar"

type SlotMap = Record<string, string[]>

const TIMEZONE = "Europe/Lisbon"
const LOOKAHEAD_DAYS = 60

const WEEKLY_WINDOWS: Record<number, Array<{ start: string; end: string }>> = {
  1: [
    { start: "09:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  2: [
    { start: "09:00", end: "11:00" },
    { start: "14:00", end: "18:00" },
  ],
  3: [
    { start: "09:00", end: "11:00" },
    { start: "14:00", end: "18:00" },
  ],
  4: [
    { start: "09:00", end: "11:00" },
    { start: "14:00", end: "18:00" },
  ],
  5: [
    { start: "09:00", end: "11:00" },
    { start: "14:00", end: "18:00" },
  ],
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase env vars em falta.")
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  return `${year}-${month}-${day}`
}

function getWeekdayNumber(date: Date) {
  return date.getDay()
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${pad(hours)}:${pad(mins)}`
}

function generateHourlySlotsFromWindow(start: string, end: string) {
  const startMinutes = parseTimeToMinutes(start)
  const endMinutes = parseTimeToMinutes(end)

  const slots: string[] = []

  for (let current = startMinutes; current + 60 <= endMinutes; current += 60) {
    slots.push(minutesToTime(current))
  }

  return slots
}

function buildCandidateSlots(from: Date, daysAhead: number): SlotMap {
  const slotsByDate: SlotMap = {}

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(from)
    date.setDate(from.getDate() + i)

    const weekday = getWeekdayNumber(date)
    const windows = WEEKLY_WINDOWS[weekday]

    if (!windows || windows.length === 0) continue

    const dateKey = formatDateKey(date)

    const times = windows.flatMap((window) =>
      generateHourlySlotsFromWindow(window.start, window.end)
    )

    if (times.length > 0) {
      slotsByDate[dateKey] = times
    }
  }

  return slotsByDate
}

function combineDateAndTime(dateKey: string, time: string) {
  return new Date(`${dateKey}T${time}:00`)
}

function addOneHour(date: Date) {
  return new Date(date.getTime() + 60 * 60 * 1000)
}

function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
) {
  return aStart < bEnd && aEnd > bStart
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const fromParam = searchParams.get("from")
    const daysParam = searchParams.get("days")
    const excludeBookingId = searchParams.get("excludeBookingId")

    const from = fromParam ? new Date(fromParam) : new Date()
    const daysAhead = daysParam ? Number(daysParam) : LOOKAHEAD_DAYS

    if (Number.isNaN(from.getTime())) {
      return NextResponse.json(
        { error: "Parâmetro 'from' inválido." },
        { status: 400 }
      )
    }

    if (!Number.isFinite(daysAhead) || daysAhead < 1 || daysAhead > 120) {
      return NextResponse.json(
        { error: "Parâmetro 'days' inválido." },
        { status: 400 }
      )
    }

    const candidateSlots = buildCandidateSlots(from, daysAhead)
    const allDateKeys = Object.keys(candidateSlots)

    if (allDateKeys.length === 0) {
      return NextResponse.json({
        timezone: TIMEZONE,
        slotsByDate: {},
      })
    }

    const firstDate = allDateKeys[0]
    const lastDate = allDateKeys[allDateKeys.length - 1]

    const rangeStart = new Date(`${firstDate}T00:00:00`).toISOString()
    const rangeEnd = new Date(`${lastDate}T23:59:59`).toISOString()

    const supabase = getSupabaseAdmin()

    let excludedGoogleEventId: string | null = null

    if (excludeBookingId) {
      const { data: excludedBooking } = await supabase
        .from("bookings")
        .select("id, google_event_id")
        .eq("id", excludeBookingId)
        .maybeSingle()

      excludedGoogleEventId = excludedBooking?.google_event_id ?? null
    }

    let bookingsQuery = supabase
      .from("bookings")
      .select("id,start_time,end_time,status")
      .in("status", ["pending", "confirmed"])
      .gte("start_time", rangeStart)
      .lte("start_time", rangeEnd)

    if (excludeBookingId) {
      bookingsQuery = bookingsQuery.neq("id", excludeBookingId)
    }

    const { data: bookings, error } = await bookingsQuery

    if (error) {
      throw error
    }

    const googleBusyRanges = await getGoogleBusyRanges({
      timeMin: rangeStart,
      timeMax: rangeEnd,
      timeZone: TIMEZONE,
      excludeEventId: excludedGoogleEventId ?? undefined,
    })

    const freeSlotsByDate: SlotMap = {}

    for (const dateKey of allDateKeys) {
      const times = candidateSlots[dateKey] ?? []

      const freeTimes = times.filter((time) => {
        const slotStart = combineDateAndTime(dateKey, time)
        const slotEnd = addOneHour(slotStart)

        const overlapsBooking = (bookings ?? []).some((booking) => {
          const bookingStart = new Date(booking.start_time)
          const bookingEnd = new Date(booking.end_time)

          return rangesOverlap(slotStart, slotEnd, bookingStart, bookingEnd)
        })

        if (overlapsBooking) return false

        const overlapsGoogleBusy = googleBusyRanges.some((busy) => {
          const busyStart = new Date(busy.start)
          const busyEnd = new Date(busy.end)

          return rangesOverlap(slotStart, slotEnd, busyStart, busyEnd)
        })

        if (overlapsGoogleBusy) return false

        return true
      })

      if (freeTimes.length > 0) {
        freeSlotsByDate[dateKey] = freeTimes
      }
    }

    return NextResponse.json({
      timezone: TIMEZONE,
      slotsByDate: freeSlotsByDate,
    })
  } catch (error) {
    console.error("Erro em /api/availability:", error)

    return NextResponse.json(
      { error: "Erro ao obter disponibilidade." },
      { status: 500 }
    )
  }
}


