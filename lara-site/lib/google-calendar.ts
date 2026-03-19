import { google } from "googleapis"
import crypto from "crypto"

type BusyRange = {
  start: string
  end: string
}

export function getGoogleCalendarClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error("Google Calendar env vars em falta.")
  }

  const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

  auth.setCredentials({
    refresh_token: refreshToken,
  })

  return google.calendar({
    version: "v3",
    auth,
  })
}

export async function getGoogleBusyRanges(params: {
  timeMin: string
  timeMax: string
  timeZone?: string
  excludeEventId?: string
}) {
  const calendar = getGoogleCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary"

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: params.timeMin,
      timeMax: params.timeMax,
      timeZone: params.timeZone || "Europe/Lisbon",
      items: [{ id: calendarId }],
    },
  })

  let busy =
    response.data.calendars?.[calendarId]?.busy?.map((item) => ({
      start: item.start ?? "",
      end: item.end ?? "",
    })) ?? []

  if (params.excludeEventId) {
    try {
      const eventResponse = await calendar.events.get({
        calendarId,
        eventId: params.excludeEventId,
      })

      const event = eventResponse.data
      const eventStart = event.start?.dateTime
      const eventEnd = event.end?.dateTime

      if (eventStart && eventEnd) {
        busy = busy.filter((item) => {
          return !(item.start === eventStart && item.end === eventEnd)
        })
      }
    } catch {
      // se o evento não existir ou já tiver sido apagado, ignoramos
    }
  }

  return busy.filter((item): item is BusyRange => Boolean(item.start && item.end))
}

export async function createCalendarEvent(params: {
  studentName: string
  studentEmail: string
  topic?: string
  level?: string
  goal?: string
  notes?: string
  phone?: string
  startTime: string
  endTime: string
}) {
  const calendar = getGoogleCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary"

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Tutoring session — Lara Cunha + ${params.studentName}`,
      description: [
        `Tema: ${params.topic || "-"}`,
        `Nível: ${params.level || "-"}`,
        `Objetivo: ${params.goal || "-"}`,
        `Telefone: ${params.phone || "-"}`,
        `Notas: ${params.notes || "-"}`,
        `Email do aluno: ${params.studentEmail}`,
      ].join("\n"),
      start: {
        dateTime: params.startTime,
        timeZone: "Europe/Lisbon",
      },
      end: {
        dateTime: params.endTime,
        timeZone: "Europe/Lisbon",
      },
      attendees: [{ email: params.studentEmail }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  })

  const event = response.data

  const meetLink =
    event.hangoutLink ||
    event.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri ||
    null

  return {
    eventId: event.id ?? null,
    htmlLink: event.htmlLink ?? null,
    meetLink,
  }
}

export async function deleteCalendarEvent(eventId: string) {
  const calendar = getGoogleCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary"

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: "all",
    })
  } catch (error: any) {
    const status = error?.code || error?.status || error?.response?.status

    if (status === 404 || status === 410) {
      return
    }

    throw error
  }
}

export async function rescheduleCalendarEvent(params: {
  eventId: string
  startTime: string
  endTime: string
}) {
  const calendar = getGoogleCalendarClient()
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary"

  const current = await calendar.events.get({
    calendarId,
    eventId: params.eventId,
  })

  const event = current.data

  const updated = await calendar.events.update({
    calendarId,
    eventId: params.eventId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      ...event,
      start: {
        dateTime: params.startTime,
        timeZone: "Europe/Lisbon",
      },
      end: {
        dateTime: params.endTime,
        timeZone: "Europe/Lisbon",
      },
    },
  })

  const result = updated.data

  const meetLink =
    result.hangoutLink ||
    result.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri ||
    null

  return {
    eventId: result.id ?? null,
    htmlLink: result.htmlLink ?? null,
    meetLink,
  }
}


