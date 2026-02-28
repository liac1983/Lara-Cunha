import { Section } from "@/components/Section"

const projects = [
  {
    type: "Site One Page",
    title: "Belle Clinique",
    desc: "Presença digital minimalista para clínica de estética premium, transmitindo confiança e exclusividade.",
  },
  {
    type: "Loja Online",
    title: "Atelier Étoile",
    desc: "E-commerce sofisticado para marca de roupa sustentável com foco em peças atemporais e minimalistas.",
  },
]

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Projetos com atenção ao detalhe"
      subtitle="Uma amostra de trabalhos desenvolvidos com foco em estética, consistência e performance."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="rounded-2xl border border-black/10 p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{p.type}</p>
            <h3 className="mt-3 text-2xl font-light text-neutral-950">{p.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{p.desc}</p>

            <div className="mt-8 h-48 rounded-xl bg-neutral-100" />
          </article>
        ))}
      </div>
    </Section>
  )
}

