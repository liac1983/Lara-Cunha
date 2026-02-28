import { Section } from "@/components/Section"

const steps = [
  { n: "01", title: "Call Inicial", time: "15–30 min", desc: "Objetivos, público-alvo, referências visuais e expectativas." },
  { n: "02", title: "Workshop & Briefing", time: "1–2h", desc: "Requisitos, conteúdo, sitemap, prioridades e funcionalidades." },
  { n: "03", title: "Proposta & Cronograma", time: "2–3 dias", desc: "Scope fechado, preço final, fases, marcos e timeline." },
  { n: "04", title: "Design", time: "Variável", desc: "Direção visual, wireframes e UI final com revisões incluídas." },
  { n: "05", title: "Desenvolvimento", time: "Variável", desc: "Implementação técnica com foco em performance, SEO e acessibilidade." },
  { n: "06", title: "QA & Lançamento", time: "3–5 dias", desc: "Testes, otimização, validação e lançamento com analytics." },
]

export function Process() {
  return (
    <Section
      id="processo"
      eyebrow="Processo"
      title="Transparente, profissional, orientado a resultados"
      subtitle="O processo é o que justifica o investimento: reduz riscos, garante qualidade e eleva a perceção de valor."
    >
      <div className="grid gap-6">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-6 rounded-2xl border border-black/10 p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-sm text-neutral-500">
              {s.n}
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-medium text-neutral-950">{s.title}</h3>
                <p className="text-sm text-neutral-500">{s.time}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
            </div>
          </div>
        ))}

        <div className="mt-6 rounded-2xl bg-[#f6f1ea] p-8 text-sm text-neutral-700">
          Suporte e manutenção (opcional) disponível após o lançamento: atualizações, backups, monitorização e melhorias contínuas.
        </div>
      </div>
    </Section>
  )
}

