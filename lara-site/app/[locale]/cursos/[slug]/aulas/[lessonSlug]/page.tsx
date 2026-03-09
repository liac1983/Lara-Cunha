import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Section } from "@/components/Section"
import { getLesson } from "@/lib/sanity/queries"
import { getDictionary } from "@/lib/i18n"

type LocalizedText = {
  pt?: string
  en?: string
}

type Exercise = {
  title?: LocalizedText
  statement?: LocalizedText
  difficulty?: string
  solution?: LocalizedText
}

type Resource = {
  label?: LocalizedText
  url?: string
  type?: string
}

type Lesson = {
  _id: string
  title?: LocalizedText
  courseTitle?: LocalizedText
  courseSlug: string
  lessonNumber?: number
  duration?: LocalizedText
  theory?: {
    pt?: any
    en?: any
  }
  exercises?: Exercise[]
  homework?: Exercise[]
  resources?: Resource[]
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale?: string; slug?: string; lessonSlug?: string }>
}) {
  const { locale, slug, lessonSlug } = await params
  if (!locale || !slug || !lessonSlug) return notFound()

  const dict = getDictionary(locale)
  const lesson: Lesson | null = await getLesson(slug, lessonSlug)
  if (!lesson) return notFound()

  const number =
    typeof lesson.lessonNumber === "number"
      ? String(lesson.lessonNumber).padStart(2, "0")
      : null

  const localizedTitle =
    lesson.title?.[locale as "pt" | "en"] || lesson.title?.pt || ""

  const localizedDuration =
    lesson.duration?.[locale as "pt" | "en"] || lesson.duration?.pt || ""

  const localizedTheory =
    lesson.theory?.[locale as "pt" | "en"] || lesson.theory?.pt || null

  return (
    <Section
      id={`aula-${lesson._id}`}
      eyebrow={`${dict.courses.lessonEyebrow} ${number ?? ""}`}
      title={localizedTitle}
      subtitle={
        localizedDuration
          ? `${dict.courses.durationPrefix} ${localizedDuration}`
          : undefined
      }
    >
      <div className="grid gap-8">
        {/* TEORIA */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.theory}
          </h3>

          <div className="prose prose-neutral mt-6 max-w-none">
            {localizedTheory ? (
              <PortableText value={localizedTheory} />
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noTheory}
              </p>
            )}
          </div>
        </div>

        {/* EXERCÍCIOS */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.exercises}
          </h3>

          <div className="mt-6 grid gap-4">
            {lesson.exercises?.length ? (
              lesson.exercises.map((ex, i) => {
                const exerciseTitle =
                  ex.title?.[locale as "pt" | "en"] ||
                  ex.title?.pt ||
                  `${dict.courses.exercises} ${i + 1}`

                const exerciseStatement =
                  ex.statement?.[locale as "pt" | "en"] || ex.statement?.pt || ""

                return (
                  <div key={i} className="rounded-xl border border-black/10 p-6">
                    <p className="text-sm font-medium text-neutral-950">
                      {exerciseTitle}
                    </p>
                    {exerciseStatement ? (
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {exerciseStatement}
                      </p>
                    ) : null}
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noExercises}
              </p>
            )}
          </div>
        </div>

        {/* HOMEWORK */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.homework}
          </h3>

          <div className="mt-6 grid gap-4">
            {lesson.homework?.length ? (
              lesson.homework.map((h, i) => {
                const homeworkTitle =
                  h.title?.[locale as "pt" | "en"] ||
                  h.title?.pt ||
                  `${dict.courses.homework} ${i + 1}`

                const homeworkStatement =
                  h.statement?.[locale as "pt" | "en"] || h.statement?.pt || ""

                return (
                  <div key={i} className="rounded-xl border border-black/10 p-6">
                    <p className="text-sm font-medium text-neutral-950">
                      {homeworkTitle}
                    </p>
                    {homeworkStatement ? (
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {homeworkStatement}
                      </p>
                    ) : null}
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noHomework}
              </p>
            )}
          </div>
        </div>

        {/* RECURSOS */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.resources}
          </h3>

          <div className="mt-6 grid gap-2">
            {lesson.resources?.length ? (
              lesson.resources.map((r, i) => {
                const resourceLabel =
                  r.label?.[locale as "pt" | "en"] || r.label?.pt || r.url || ""

                return (
                  <a
                    key={i}
                    href={r.url ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-neutral-700 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                  >
                    {resourceLabel}
                  </a>
                )
              })
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noResources}
              </p>
            )}
          </div>
        </div>

        {/* VOLTAR */}
        <div className="flex justify-center">
          <Link
            href={`/${locale}/cursos/${lesson.courseSlug}`}
            className="text-xs tracking-[0.2em] text-neutral-500 hover:text-neutral-950"
          >
            {dict.courses.backToCourse}
          </Link>
        </div>
      </div>
    </Section>
  )
}

