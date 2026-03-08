import { Section } from "@/components/Section"

type Locale = "pt" | "en"

type LocalizedText = {
  pt?: string
  en?: string
}

type ServiceItem = {
  _id: string
  order?: number
  title?: LocalizedText
  tagline?: LocalizedText
  priceFrom?: string
  description?: LocalizedText
  features?: LocalizedText[]
}

type ServicesProps = {
  locale: Locale
  services: ServiceItem[]
  dict: {
    services: {
      eyebrow: string
      title: string
      subtitle: string
      priceLabel: string
      footerNote: string
    }
  }
}

function getLocalizedValue(value: LocalizedText | undefined, locale: Locale) {
  if (!value) return ""
  return value[locale] || value.pt || value.en || ""
}

export function Services({ locale, services, dict }: ServicesProps) {
  return (
    <Section
      id="servicos"
      eyebrow={dict.services.eyebrow}
      title={dict.services.title}
      subtitle={dict.services.subtitle}
      className="bg-white"
    >
      <div className="space-y-8">
        {services.map((s, index) => {
          const number =
            typeof s.order === "number"
              ? String(s.order).padStart(2, "0")
              : String(index + 1).padStart(2, "0")

          const title = getLocalizedValue(s.title, locale)
          const tagline = getLocalizedValue(s.tagline, locale)
          const description = getLocalizedValue(s.description, locale)

          return (
            <div
              key={s._id}
              className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <span className="text-xs tracking-[0.25em]">{number}</span>
                    <span className="h-px w-10 bg-neutral-200" />
                  </div>

                  <h3 className="mt-3 text-2xl font-light text-neutral-950 sm:text-3xl">
                    {title}
                  </h3>

                  {tagline ? (
                    <p className="mt-2 text-sm text-neutral-600">{tagline}</p>
                  ) : null}

                  {description ? (
                    <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600">
                      {description}
                    </p>
                  ) : null}

                  {s.features?.length ? (
                    <ul className="mt-6 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                      {s.features.map((feature, i) => {
                        const featureText = getLocalizedValue(feature, locale)
                        if (!featureText) return null

                        return (
                          <li key={`${s._id}-feature-${i}`} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-950/60" />
                            {featureText}
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="relative pl-10 sm:pl-12">
                  <span className="absolute left-0 top-2 h-16 w-px bg-neutral-200" />

                  <div className="text-right">
                    <p className="text-[11px] tracking-[0.25em] text-neutral-500">
                      {dict.services.priceLabel}
                    </p>
                    <p className="mt-2 text-3xl font-medium text-neutral-900">
                      <span className="ml-1">{s.priceFrom}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <p className="pt-6 text-center text-sm text-neutral-500">
          {dict.services.footerNote}
        </p>
      </div>
    </Section>
  )
}

