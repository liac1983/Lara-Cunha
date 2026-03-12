import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const phone = String(body?.phone ?? "").trim()
    const topic = String(body?.topic ?? "").trim()
    const level = String(body?.level ?? "").trim()
    const goal = String(body?.goal ?? "").trim()
    const availability = String(body?.availability ?? "").trim()
    const message = String(body?.message ?? "").trim()

    if (!name || name.length < 2) {
      return Response.json({ error: "Nome inválido." }, { status: 400 })
    }

    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Email inválido." }, { status: 400 })
    }

    if (!topic) {
      return Response.json({ error: "Tema inválido." }, { status: 400 })
    }

    if (!goal) {
      return Response.json({ error: "Objetivo inválido." }, { status: 400 })
    }

    if (!message || message.length < 5) {
      return Response.json({ error: "Mensagem muito curta." }, { status: 400 })
    }

    const to = process.env.CONTACT_TO_EMAIL || process.env.OWNER_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL || process.env.FROM_EMAIL

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Configuração de email em falta (.env.local)." },
        { status: 500 }
      )
    }

    const ownerSubject = `Novo pedido de explicação — ${name}`

    const ownerText = [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefone: ${phone}` : "",
      `Linguagem / tema: ${topic}`,
      level ? `Nível: ${level}` : "",
      `Objetivo: ${goal}`,
      availability ? `Disponibilidade: ${availability}` : "",
      "",
      "Mensagem:",
      message,
    ]
      .filter(Boolean)
      .join("\n")

    const ownerSend = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: ownerSubject,
      text: ownerText,
    })

    if (ownerSend.error) {
      return Response.json({ error: ownerSend.error.message }, { status: 500 })
    }

    const userSend = await resend.emails.send({
      from,
      to: email,
      subject: "Recebi o teu pedido de explicação",
      text: [
        `Olá ${name},`,
        "",
        "Obrigada pelo teu pedido de explicação.",
        "Recebi as tuas informações e vou responder-te em breve para combinarmos os próximos passos.",
        "",
        "Até já,",
        "Lara Cunha",
      ].join("\n"),
    })

    if (userSend.error) {
      return Response.json({ error: userSend.error.message }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error("Tutoring API error:", error)

    return Response.json(
      { error: "Erro inesperado ao enviar o pedido." },
      { status: 500 }
    )
  }
}

