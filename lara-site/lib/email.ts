type SendBookingEmailsInput = {
  studentName: string;
  studentEmail: string;
  topic?: string;
  level?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  meetLink?: string | null;
  eventLink?: string | null;
};

export async function sendBookingEmails(data: SendBookingEmailsInput) {
  const startDate = new Date(data.startTime).toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    dateStyle: "full",
    timeStyle: "short",
  });

  const durationMinutes =
    (new Date(data.endTime).getTime() - new Date(data.startTime).getTime()) / 60000;

  // Email para ti
  await fakeSend({
    to: "teu-email@dominio.com",
    subject: `Nova marcação — ${data.studentName}`,
    html: `
      <h2>Nova marcação</h2>
      <p><strong>Nome:</strong> ${data.studentName}</p>
      <p><strong>Email:</strong> ${data.studentEmail}</p>
      <p><strong>Tema:</strong> ${data.topic || "-"}</p>
      <p><strong>Nível:</strong> ${data.level || "-"}</p>
      <p><strong>Notas:</strong> ${data.notes || "-"}</p>
      <p><strong>Quando:</strong> ${startDate}</p>
      <p><strong>Duração:</strong> ${durationMinutes} min</p>
      <p><strong>Google Meet:</strong> ${data.meetLink || "-"}</p>
      <p><strong>Evento:</strong> ${data.eventLink || "-"}</p>
    `,
  });

  // Email para o aluno
  await fakeSend({
    to: data.studentEmail,
    subject: "Confirmação da tua sessão",
    html: `
      <h2>Sessão marcada com sucesso</h2>
      <p>Olá, ${data.studentName}.</p>
      <p>A tua sessão foi confirmada.</p>
      <p><strong>Data e hora:</strong> ${startDate}</p>
      <p><strong>Duração:</strong> ${durationMinutes} min</p>
      <p><strong>Google Meet:</strong> ${data.meetLink || "-"}</p>
      <p><strong>Instruções:</strong> entra no link alguns minutos antes da sessão.</p>
    `,
  });
}

async function fakeSend(input: { to: string; subject: string; html: string }) {
  console.log("SEND EMAIL", input);
}

