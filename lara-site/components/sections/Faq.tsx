import { Section } from "@/components/Section"

const faqs = [
  {
    q: "Quanto tempo demora um projeto?",
    a: "Depende do tipo e complexidade. Um site one page pode levar 3–4 semanas, enquanto uma loja online grande pode levar 8–12 semanas. O prazo exato é definido após o briefing.",
  },
  {
    q: "Quantas revisões estão incluídas?",
    a: "Cada fase do projeto inclui 2–3 rondas de revisões. Alterações adicionais fora do scope inicial são orçamentadas separadamente.",
  },
  {
    q: "Preciso fornecer os conteúdos?",
    a: "Sim, idealmente forneces textos e imagens. Posso recomendar copywriters e fotógrafos, ou ajudar na curadoria do conteúdo.",
  },
  {
    q: "Como funciona o domínio e hosting?",
    a: "Posso ajudar na escolha e configuração do domínio e hosting. Recomendo soluções como Vercel/Netlify para sites e soluções dedicadas para lojas.",
  },
  {
    q: "Fazem manutenção após o lançamento?",
    a: "Sim. Existem pacotes mensais que incluem atualizações, backups, monitorização e pequenas alterações.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Pagamento faseado por marcos: 30% no início, 40% após aprovação do design, 30% no lançamento. Aceito transferência bancária ou MB Way.",
  },
]

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Perguntas frequentes" subtitle="Respostas claras para tomares decisões com confiança.">
      <div className="divide-y divide-black/10 rounded-2xl border border-black/10">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6 sm:p-8">
            <summary className="cursor-pointer list-none text-base font-medium text-neutral-950">
              {f.q}
              <span className="float-right text-neutral-400 group-open:text-neutral-950">+</span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

