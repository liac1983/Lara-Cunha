import Link from "next/link"
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

export function Portfolio({ locale, projects, dict }: PortfolioProps) {
  return (
    <Section
      id="portfolio"
      eyebrow={dict.portfolio.eyebrow}
      title={dict.portfolio.title}
      subtitle={dict.portfolio.subtitle}
    >
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => {
          const title = getLocalizedValue(project.title, locale)
          const imageUrl = project.mainImageUrl ?? null

          return (
            <Link
              key={project._id}
              href={`/${locale}/portfolio/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:shadow-lg"
            >
              {imageUrl ? (
                <div className="overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={title || "Project image"}
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}

              <div className="p-6">
                <h3 className="text-2xl font-light text-neutral-950 sm:text-3xl">
                  {title}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}


