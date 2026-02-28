import { Section } from "@/components/Section"

const services = [
  {
    number: "01",
    title: "Site One Page",
    price: "€1.500",
    tagline: "Presença profissional elegante",
    desc: "Para marcas que precisam de uma presença digital refinada e direta.",
    bullets: ["Branding visual", "Copy ajustada", "Secções estratégicas", "SEO básico", "Responsivo"],
  },
  {
    number: "02",
    title: "Site Multipágina",
    price: "€3.000",
    tagline: "Estrutura completa e navegável",
    desc: "Para marcas que precisam de múltiplas páginas dedicadas e arquitetura de informação.",
    bullets: ["Arquitetura de informação", "Páginas dedicadas", "Blog opcional", "SEO completo", "Performance"],
  },
  {
    number: "03",
    title: "Loja Online Simples",
    price: "€4.500",
    tagline: "E-commerce para catálogo pequeno",
    desc: "Para validação de produto ou catálogo pequeno. Inclui checkout e pagamentos integrados.",
    bullets: ["Catálogo de produtos", "Checkout seguro", "Pagamentos", "Emails automáticos", "Gestão simples"],
  },
  {
    number: "04",
    title: "Loja Online Grande",
    price: "€8.000",
    tagline: "Alto desempenho e segurança",
    desc: "Para muitos produtos, categorias e volume. Foco em performance, segurança e escalabilidade.",
    bullets: ["Performance otimizada", "Segurança avançada", "Escalabilidade", "Filtros e pesquisa", "Observabilidade"],
  },
]

export function Services() {
  return (
    <Section
      id="servicos"
      eyebrow="Serviços"
      title="Soluções desenhadas de raiz"
      subtitle="Os valores abaixo são a partir de — o orçamento final é definido após reunião e levantamento de requisitos."
      className="bg-white"
    >
      <div className="space-y-8">
        {services.map((s) => (
          <div key={s.number} className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-neutral-400">{s.number}</p>
                <h3 className="mt-3 text-2xl font-light text-neutral-950 sm:text-3xl">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.tagline}</p>
                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600">{s.desc}</p>

                <ul className="mt-6 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-950/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">a partir de</p>
                <p className="mt-2 text-3xl font-light text-neutral-950">{s.price}</p>
              </div>
            </div>
          </div>
        ))}

        <p className="pt-6 text-center text-sm text-neutral-500">
          Pagamento faseado por marcos do projeto. Prazo estimado após briefing. Manutenção opcional disponível.
        </p>
      </div>
    </Section>
  )
}

