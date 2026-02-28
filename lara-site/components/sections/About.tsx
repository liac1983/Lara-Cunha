import { Section } from "@/components/Section"

export function About() {
  return (
    <Section
      eyebrow="Sobre"
      title="Combino engenharia e sensibilidade estética"
      subtitle="Crio experiências digitais que refletem identidade, elegância e posicionamento — com foco em performance, acessibilidade e resultados."
    >
      <div className="max-w-4xl text-neutral-600">
        <p className="leading-relaxed">
          Formada em Engenharia Informática pela FEUP, especializo-me em desenvolvimento
          full-stack e direção visual para marcas que valorizam detalhe, estética e consistência.
        </p>
      </div>
    </Section>
  )
}

