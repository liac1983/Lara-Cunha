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
      <div className="mt-10">
        {/* timeline wrapper */}
        <div className="relative">
            {/* center line */}
            <span className="pointer-events-none absolute left-4 top-0 h-full w-px bg-neutral-200 sm:left-1/2" />

            <div className="space-y-8">
            {steps.map((s, i) => (
                <div key={s.n} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                {/* dot */}
                <span className="absolute left-4 top-10 h-2 w-2 -translate-x-1/2 rounded-full bg-neutral-300 sm:left-1/2" />

                {/* card side (alternates) */}
                <div className={`${i % 2 === 0 ? "sm:pr-10" : "sm:col-start-2 sm:pl-10"}`}>
                    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
                    {/* small editorial number */}
                    <div className="flex items-center gap-3">
                        <span className="text-[11px] tracking-[0.25em] text-neutral-400">{s.n}</span>
                        <span className="h-px w-10 bg-neutral-200" />
                    </div>

                    <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-lg font-light text-neutral-950 sm:text-xl">{s.title}</h3>
                        <p className="text-sm text-neutral-500">{s.time}</p>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>

  {/* maintenance box */}
  <div className="mt-10 rounded-2xl bg-[#f6f1ea] p-8 text-sm text-neutral-700">
    Suporte e manutenção (opcional) disponível após o lançamento: atualizações, backups, monitorização e melhorias contínuas.
  </div>
</div>
    </Section>
  )
}

