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
  mainImageUrl?: string
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

function renderTextWithBreaks(text: string) {
  return text
    .split(/\r?\n+/)
    .filter((line) => line.trim() !== "")
    .map((line, index) => (
      <p key={index} className={index === 0 ? "" : "mt-2"}>
        {line}
      </p>
    ))
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
          const imageUrl = project.mainImageUrl ?? null

          return (
            <div
              key={project._id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              {imageUrl ? (
                <div className="w-full">
                  <img
                    src={imageUrl}
                    alt={title || "Project image"}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="p-8 sm:p-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-light text-neutral-950 sm:text-3xl">
                      {title}
                    </h3>

                    {shortDescription ? (
                      <div className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {renderTextWithBreaks(shortDescription)}
                      </div>
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
                        <div className="mt-2 text-sm leading-relaxed text-neutral-700">
                          {renderTextWithBreaks(goal)}
                        </div>
                      </div>
                    ) : null}

                    {result ? (
                      <div>
                        <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                          {dict.portfolio.resultLabel}
                        </p>
                        <div className="mt-2 text-sm leading-relaxed text-neutral-700">
                          {renderTextWithBreaks(result)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

