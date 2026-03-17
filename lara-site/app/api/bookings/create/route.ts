import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import crypto from "crypto";

export const runtime = "nodejs";

type BookingPayload = {
  studentName: string;
  studentEmail: string;
  topic?: string;
  level?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  timezone?: string;
};

const DEFAULT_TIMEZONE = "Europe/Lisbon";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase env vars em falta.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

function getGoogleCalendarClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !redirectUri || !refreshToken) {
    throw new Error("Google Calendar env vars em falta.");
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  return google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
}

function validatePayload(body: Partial<BookingPayload>) {
  const requiredFields: Array<keyof BookingPayload> = [
    "studentName",
    "studentEmail",
    "startTime",
    "endTime",
  ];

  for (const field of requiredFields) {
    const value = body[field];
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return `Campo obrigatório em falta: ${field}`;
    }
  }

  if (
    typeof body.studentEmail !== "string" ||
    !body.studentEmail.includes("@")
  ) {
    return "Email inválido.";
  }

  const start = new Date(body.startTime as string);
  const end = new Date(body.endTime as string);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Data/hora inválida.";
  }

  if (end <= start) {
    return "A hora de fim tem de ser depois da hora de início.";
  }

  return null;
}

async function isSlotFreeInDatabase(startTime: string, endTime: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .in("status", ["pending", "confirmed"])
    .lt("start_time", endTime)
    .gt("end_time", startTime)
    .limit(1);

  if (error) {
    throw new Error(`Erro ao verificar sobreposição na BD: ${error.message}`);
  }

  return !data || data.length === 0;
}

async function isSlotFreeInGoogleCalendar(
  startTime: string,
  endTime: string,
  timezone: string
) {
  const calendar = getGoogleCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startTime,
      timeMax: endTime,
      timeZone: timezone,
      items: [{ id: calendarId }],
    },
  });

  const busy = response.data.calendars?.[calendarId]?.busy ?? [];
  return busy.length === 0;
}

async function insertPendingBooking(payload: BookingPayload) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      student_name: payload.studentName,
      student_email: payload.studentEmail,
      topic: payload.topic || null,
      level: payload.level || null,
      notes: payload.notes || null,
      start_time: payload.startTime,
      end_time: payload.endTime,
      timezone: payload.timezone || DEFAULT_TIMEZONE,
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(
      `Erro ao criar booking pending: ${error?.message || "sem dados"}`
    );
  }

  return data.id as string;
}

async function createGoogleCalendarEvent(payload: BookingPayload) {
  const calendar = getGoogleCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const requestId = crypto.randomUUID();

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Tutoring session — Lara Cunha + ${payload.studentName}`,
      description: [
        `Tema: ${payload.topic || "-"}`,
        `Nível: ${payload.level || "-"}`,
        `Notas: ${payload.notes || "-"}`,
        `Email do aluno: ${payload.studentEmail}`,
      ].join("\n"),
      start: {
        dateTime: payload.startTime,
        timeZone: payload.timezone || DEFAULT_TIMEZONE,
      },
      end: {
        dateTime: payload.endTime,
        timeZone: payload.timezone || DEFAULT_TIMEZONE,
      },
      attendees: [{ email: payload.studentEmail }],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  const event = response.data;

  const meetLink =
    event.hangoutLink ||
    event.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri ||
    null;

  return {
    eventId: event.id ?? null,
    eventLink: event.htmlLink ?? null,
    meetLink,
  };
}

async function markBookingConfirmed(
  bookingId: string,
  googleEventId: string | null,
  meetLink: string | null
) {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "confirmed",
      google_event_id: googleEventId,
      google_meet_link: meetLink,
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(`Erro ao confirmar booking: ${error.message}`);
  }
}

async function markBookingFailed(bookingId: string) {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "failed",
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(`Erro ao marcar booking como failed: ${error.message}`);
  }
}

async function sendBookingEmails(params: {
  studentName: string;
  studentEmail: string;
  topic?: string;
  level?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  meetLink: string | null;
  eventLink: string | null;
}) {
  // Troca esta função pelo teu sistema real de email:
  // Resend, Nodemailer, SendGrid, etc.

  console.log("EMAIL PARA TI");
  console.log({
    to: process.env.BOOKING_NOTIFICATION_EMAIL,
    subject: `Nova marcação — ${params.studentName}`,
    body: `
Nome: ${params.studentName}
Email: ${params.studentEmail}
Tema: ${params.topic || "-"}
Nível: ${params.level || "-"}
Notas: ${params.notes || "-"}
Início: ${params.startTime}
Fim: ${params.endTime}
Meet: ${params.meetLink || "-"}
Evento: ${params.eventLink || "-"}
    `,
  });

  console.log("EMAIL PARA O ALUNO");
  console.log({
    to: params.studentEmail,
    subject: "Confirmação da tua sessão",
    body: `
Olá, ${params.studentName}.

A tua sessão foi confirmada.

Data/hora: ${params.startTime}
Fim: ${params.endTime}
Google Meet: ${params.meetLink || "-"}

Receberás mais detalhes por email.
    `,
  });
}

export async function POST(req: NextRequest) {
  let bookingId: string | null = null;

  try {
    const body = (await req.json()) as Partial<BookingPayload>;

    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const payload: BookingPayload = {
      studentName: body.studentName!.trim(),
      studentEmail: body.studentEmail!.trim(),
      topic: body.topic?.trim() || "",
      level: body.level?.trim() || "",
      notes: body.notes?.trim() || "",
      startTime: body.startTime!,
      endTime: body.endTime!,
      timezone: body.timezone || DEFAULT_TIMEZONE,
    };

    const slotFreeInDb = await isSlotFreeInDatabase(
      payload.startTime,
      payload.endTime
    );

    if (!slotFreeInDb) {
      return NextResponse.json(
        { error: "Este horário já não está disponível." },
        { status: 409 }
      );
    }

    const slotFreeInCalendar = await isSlotFreeInGoogleCalendar(
      payload.startTime,
      payload.endTime,
      payload.timezone || DEFAULT_TIMEZONE
    );

    if (!slotFreeInCalendar) {
      return NextResponse.json(
        { error: "Esse horário já está ocupado na agenda." },
        { status: 409 }
      );
    }

    bookingId = await insertPendingBooking(payload);

    const calendarResult = await createGoogleCalendarEvent(payload);

    await markBookingConfirmed(
      bookingId,
      calendarResult.eventId,
      calendarResult.meetLink
    );

    await sendBookingEmails({
      studentName: payload.studentName,
      studentEmail: payload.studentEmail,
      topic: payload.topic,
      level: payload.level,
      notes: payload.notes,
      startTime: payload.startTime,
      endTime: payload.endTime,
      meetLink: calendarResult.meetLink,
      eventLink: calendarResult.eventLink,
    });

    return NextResponse.json(
      {
        success: true,
        bookingId,
        googleEventId: calendarResult.eventId,
        meetLink: calendarResult.meetLink,
        eventLink: calendarResult.eventLink,
        startTime: payload.startTime,
        endTime: payload.endTime,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro em /api/bookings/create:", error);

    if (bookingId) {
      try {
        await markBookingFailed(bookingId);
      } catch (markError) {
        console.error("Erro ao marcar booking como failed:", markError);
      }
    }

    return NextResponse.json(
      { error: "Erro ao criar a marcação." },
      { status: 500 }
    );
  }
}

