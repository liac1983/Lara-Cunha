import { Section } from "@/components/Section"

type Locale = "pt" | "en"

type LocalizedText = {
  pt?: string
  en?: string
}

type ProjectItem = {
  _id: string
  order?: number
  title?: LocalizedText
  slug: string
  shortDescription?: LocalizedText
  clientType?: LocalizedText
  goal?: LocalizedText
  result?: LocalizedText
  mainImage?: any
}

type PortfolioProps = {
  locale: Locale
  projects: ProjectItem[]
  dict: {
    portfolio: {
      eyebrow: string
      title: string
      subtitle: string
      goalLabel: string
      resultLabel: string
      clientLabel: string
    }
  }
}

function getLocalizedValue(value: LocalizedText | undefined, locale: Locale) {
  if (!value) return ""
  return value[locale] || value.pt || value.en || ""
}

export function Portfolio({ locale, projects, dict }: PortfolioProps) {
  return (
    <Section
      id="portfolio"
      eyebrow={dict.portfolio.eyebrow}
      title={dict.portfolio.title}
      subtitle={dict.portfolio.subtitle}
    >
      <div className="grid gap-8">
        {projects.map((project) => {
          const title = getLocalizedValue(project.title, locale)
          const shortDescription = getLocalizedValue(project.shortDescription, locale)
          const clientType = getLocalizedValue(project.clientType, locale)
          const goal = getLocalizedValue(project.goal, locale)
          const result = getLocalizedValue(project.result, locale)

          return (
            <div
              key={project._id}
              className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10"
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-light text-neutral-950 sm:text-3xl">
                    {title}
                  </h3>

                  {shortDescription ? (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                      {shortDescription}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-5">
                  {clientType ? (
                    <div>
                      <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                        {dict.portfolio.clientLabel}
                      </p>
                      <p className="mt-2 text-sm text-neutral-700">{clientType}</p>
                    </div>
                  ) : null}

                  {goal ? (
                    <div>
                      <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                        {dict.portfolio.goalLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                        {goal}
                      </p>
                    </div>
                  ) : null}

                  {result ? (
                    <div>
                      <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                        {dict.portfolio.resultLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                        {result}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

