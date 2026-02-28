import { Resend } from "resend";

export const runtime = "nodejs"; // garante Node runtime (emails)
export const dynamic = "force-dynamic"; // evita cache

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const siteType = String(body?.siteType ?? "").trim();
    const goal = String(body?.goal ?? "").trim();
    const deadline = String(body?.deadline ?? "").trim();
    const pagesOrProducts = String(body?.pagesOrProducts ?? "").trim();
    const budget = String(body?.budget ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // validações mínimas
    if (!name || name.length < 2) {
      return Response.json({ error: "Nome inválido." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return Response.json({ error: "Email inválido." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return Response.json({ error: "Mensagem muito curta." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Configuração de email em falta (.env.local)." },
        { status: 500 }
      );
    }

    const subject = `Novo pedido de contacto — ${name}`;

    const text = [
      `Nome: ${name}`,
      `Email: ${email}`,
      siteType ? `Tipo de site: ${siteType}` : "",
      goal ? `Objetivo: ${goal}` : "",
      deadline ? `Prazo desejado: ${deadline}` : "",
      pagesOrProducts ? `Nº páginas/produtos: ${pagesOrProducts}` : "",
      budget ? `Orçamento (opcional): ${budget}` : "",
      "",
      "Mensagem:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // responder diretamente ao cliente
      subject,
      text,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: "Erro inesperado ao enviar." },
      { status: 500 }
    );
  }
}