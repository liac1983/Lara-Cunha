import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    dateStyle: "full",
    timeStyle: "short",
  })
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL || process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.FROM_EMAIL || process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !ownerEmail || !fromEmail) {
    throw new Error("Configuração do Resend em falta no .env.local.")
  }

  return {
    ownerEmail,
    fromEmail,
  }
}

export async function sendBookingCreatedEmails(params: {
  studentName: string
  studentEmail: string
  phone?: string
  topic?: string
  level?: string
  goal?: string
  notes?: string
  startTime: string
  endTime: string
  meetLink?: string | null
  eventLink?: string | null
}) {
  const manageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/[locale]/auth/login?email=${encodeURIComponent(params.studentEmail)}`
  const { ownerEmail, fromEmail } = getEmailConfig()

  const whenText = formatDateTime(params.startTime)

  const ownerText = [
    "Nova marcação de explicação",
    "",
    `Nome: ${params.studentName}`,
    `Email: ${params.studentEmail}`,
    params.phone ? `Telefone: ${params.phone}` : "",
    params.topic ? `Tema: ${params.topic}` : "",
    params.level ? `Nível: ${params.level}` : "",
    params.goal ? `Objetivo: ${params.goal}` : "",
    `Data/hora: ${whenText}`,
    "Duração: 60 min",
    params.meetLink ? `Google Meet: ${params.meetLink}` : "",
    params.eventLink ? `Evento Google Calendar: ${params.eventLink}` : "",
    "",
    "Notas:",
    params.notes || "-",
  ]
    .filter(Boolean)
    .join("\n")

  const ownerSend = await resend.emails.send({
    from: fromEmail,
    to: ownerEmail,
    replyTo: params.studentEmail,
    subject: `Nova marcação — ${params.studentName}`,
    text: ownerText,
  })

  if (ownerSend.error) {
    throw new Error(ownerSend.error.message)
  }

  const studentText = [
    `Olá ${params.studentName},`,
    "",
    "A tua explicação foi confirmada.",
    `Data/hora: ${whenText}`,
    "Duração: 60 min",
    params.meetLink ? `Google Meet: ${params.meetLink}` : "",
    "",
    "Entra no link alguns minutos antes da sessão.",
    "Se precisares de cancelar ou remarcar, responde a este email.",
    "",
    "Até já,",
    "Lara Cunha",
  ]
    .filter(Boolean)
    .join("\n")

  const studentSend = await resend.emails.send({
    from: fromEmail,
    to: params.studentEmail,
    subject: "Confirmação da tua explicação",
    text: studentText,
  })

  if (studentSend.error) {
    throw new Error(studentSend.error.message)
  }
}

export async function sendBookingCancelledEmails(params: {
  studentName: string
  studentEmail: string
  startTime: string
  reason?: string
}) {
  const { ownerEmail, fromEmail } = getEmailConfig()
  const whenText = formatDateTime(params.startTime)

  const ownerSend = await resend.emails.send({
    from: fromEmail,
    to: ownerEmail,
    subject: `Marcação cancelada — ${params.studentName}`,
    text: [
      "Uma explicação foi cancelada.",
      "",
      `Nome: ${params.studentName}`,
      `Email: ${params.studentEmail}`,
      `Data/hora original: ${whenText}`,
      params.reason ? `Motivo: ${params.reason}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  })

  if (ownerSend.error) {
    throw new Error(ownerSend.error.message)
  }

  const studentSend = await resend.emails.send({
    from: fromEmail,
    to: params.studentEmail,
    subject: "A tua explicação foi cancelada",
    text: [
      `Olá ${params.studentName},`,
      "",
      `A explicação marcada para ${whenText} foi cancelada.`,
      params.reason ? `Motivo: ${params.reason}` : "",
      "",
      "Podes responder a este email para combinar nova data.",
      "",
      "Lara Cunha",
    ]
      .filter(Boolean)
      .join("\n"),
  })

  if (studentSend.error) {
    throw new Error(studentSend.error.message)
  }
}

export async function sendBookingRescheduledEmails(params: {
  studentName: string
  studentEmail: string
  oldStartTime: string
  newStartTime: string
  meetLink?: string | null
}) {
  const { ownerEmail, fromEmail } = getEmailConfig()

  const oldWhen = formatDateTime(params.oldStartTime)
  const newWhen = formatDateTime(params.newStartTime)

  const ownerSend = await resend.emails.send({
    from: fromEmail,
    to: ownerEmail,
    subject: `Marcação remarcada — ${params.studentName}`,
    text: [
      "Uma explicação foi remarcada.",
      "",
      `Nome: ${params.studentName}`,
      `Email: ${params.studentEmail}`,
      `Data/hora antiga: ${oldWhen}`,
      `Nova data/hora: ${newWhen}`,
      params.meetLink ? `Google Meet: ${params.meetLink}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  })

  if (ownerSend.error) {
    throw new Error(ownerSend.error.message)
  }

  const studentSend = await resend.emails.send({
    from: fromEmail,
    to: params.studentEmail,
    subject: "A tua explicação foi remarcada",
    text: [
      `Olá ${params.studentName},`,
      "",
      `A tua explicação foi remarcada de ${oldWhen} para ${newWhen}.`,
      params.meetLink ? `Google Meet: ${params.meetLink}` : "",
      "",
      "Até já,",
      "Lara Cunha",
    ]
      .filter(Boolean)
      .join("\n"),
  })

  if (studentSend.error) {
    throw new Error(studentSend.error.message)
  }
}

