import { google } from "googleapis";

export function getGoogleCalendar() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
}

export async function isCalendarSlotFree(startTime: string, endTime: string) {
  const calendar = getGoogleCalendar();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startTime,
      timeMax: endTime,
      timeZone: "Europe/Lisbon",
      items: [{ id: process.env.GOOGLE_CALENDAR_ID || "primary" }],
    },
  });

  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const busy = response.data.calendars?.[calendarId]?.busy ?? [];

  return busy.length === 0;
}

import crypto from "crypto";

type CreateCalendarEventInput = {
  studentName: string;
  studentEmail: string;
  topic?: string;
  level?: string;
  notes?: string;
  startTime: string;
  endTime: string;
};

export async function createCalendarEvent(input: CreateCalendarEventInput) {
  const calendar = getGoogleCalendar();

  const requestId = crypto.randomUUID();

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Tutoring session — Lara Cunha + ${input.studentName}`,
      description: [
        `Tema: ${input.topic || "-"}`,
        `Nível: ${input.level || "-"}`,
        `Notas: ${input.notes || "-"}`,
        `Email do aluno: ${input.studentEmail}`,
      ].join("\n"),
      start: {
        dateTime: input.startTime,
        timeZone: "Europe/Lisbon",
      },
      end: {
        dateTime: input.endTime,
        timeZone: "Europe/Lisbon",
      },
      attendees: [{ email: input.studentEmail }],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
    sendUpdates: "all",
  });

  const event = response.data;

  const meetLink =
    event.hangoutLink ||
    event.conferenceData?.entryPoints?.find((p) => p.entryPointType === "video")?.uri ||
    null;

  return {
    eventId: event.id ?? null,
    htmlLink: event.htmlLink ?? null,
    meetLink,
  };
}

