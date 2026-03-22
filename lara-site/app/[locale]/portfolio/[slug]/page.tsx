import { getProjectBySlug } from "@/lib/sanity/queries"

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
  mainImageUrl?: string
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return <div className="p-10">Projeto não encontrado.</div>
  }

  const title = getLocalizedValue(project.title, locale)
  const shortDescription = getLocalizedValue(project.shortDescription, locale)
  const clientType = getLocalizedValue(project.clientType, locale)
  const goal = getLocalizedValue(project.goal, locale)
  const result = getLocalizedValue(project.result, locale)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {project.mainImageUrl ? (
        <img
          src={project.mainImageUrl}
          alt={title || "Project image"}
          className="mb-10 w-full rounded-2xl object-cover"
        />
      ) : null}

      <h1 className="text-4xl font-light text-neutral-950">{title}</h1>

      {shortDescription ? (
        <div className="mt-6 text-lg leading-relaxed text-neutral-700">
          {renderTextWithBreaks(shortDescription)}
        </div>
      ) : null}

      <div className="mt-10 space-y-8">
        {clientType ? (
          <div>
            <p className="text-[11px] tracking-[0.25em] text-neutral-500">
              Cliente
            </p>
            <p className="mt-2 text-sm text-neutral-700">{clientType}</p>
          </div>
        ) : null}

        {goal ? (
          <div>
            <p className="text-[11px] tracking-[0.25em] text-neutral-500">
              Objetivo
            </p>
            <div className="mt-2 text-sm leading-relaxed text-neutral-700">
              {renderTextWithBreaks(goal)}
            </div>
          </div>
        ) : null}

        {result ? (
          <div>
            <p className="text-[11px] tracking-[0.25em] text-neutral-500">
              Resultado
            </p>
            <div className="mt-2 text-sm leading-relaxed text-neutral-700">
              {renderTextWithBreaks(result)}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

