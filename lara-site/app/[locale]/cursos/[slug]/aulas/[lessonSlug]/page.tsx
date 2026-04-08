import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { Section } from "@/components/Section"
import { ExerciseBlock } from "@/components/courses/ExerciseBlock"
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

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-neutral-800">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="mb-4 text-3xl font-medium text-neutral-950">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 text-2xl font-medium text-neutral-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 text-xl font-medium text-neutral-950">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-black/10 pl-4 italic text-neutral-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc pl-6 text-lg leading-relaxed text-neutral-800">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal pl-6 text-lg leading-relaxed text-neutral-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-950">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#"
      const isExternal = href.startsWith("http")

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
        >
          {children}
        </a>
      )
    },
  },
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

  const currentLocale = locale as "pt" | "en"

  const number =
    typeof lesson.lessonNumber === "number"
      ? String(lesson.lessonNumber).padStart(2, "0")
      : null

  const localizedTitle =
    lesson.title?.[currentLocale] || lesson.title?.pt || ""

  const localizedDuration =
    lesson.duration?.[currentLocale] || lesson.duration?.pt || ""

  const localizedTheory =
    lesson.theory?.[currentLocale] || lesson.theory?.pt || null

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
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.theory}
          </h3>

          <div className="mt-6 max-w-none">
            {localizedTheory ? (
              <PortableText
                value={localizedTheory}
                components={portableTextComponents}
              />
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noTheory}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.exercises}
          </h3>

          <div className="mt-6 grid gap-4">
            {lesson.exercises?.length ? (
              lesson.exercises.map((ex, i) => {
                const exerciseTitle =
                  ex.title?.[currentLocale] ||
                  ex.title?.pt ||
                  `${dict.courses.exercises} ${i + 1}`

                const exerciseStatement =
                  ex.statement?.[currentLocale] || ex.statement?.pt || ""

                const exerciseSolution =
                  ex.solution?.[currentLocale] || ex.solution?.pt || ""

                return (
                  <ExerciseBlock
                    key={i}
                    label={dict.courses.exercises}
                    number={i + 1}
                    title={exerciseTitle}
                    statement={exerciseStatement}
                    difficulty={ex.difficulty}
                    solution={exerciseSolution}
                  />
                )
              })
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noExercises}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.homework}
          </h3>

          <div className="mt-6 grid gap-4">
            {lesson.homework?.length ? (
              lesson.homework.map((h, i) => {
                const homeworkTitle =
                  h.title?.[currentLocale] ||
                  h.title?.pt ||
                  `${dict.courses.homework} ${i + 1}`

                const homeworkStatement =
                  h.statement?.[currentLocale] || h.statement?.pt || ""

                const homeworkSolution =
                  h.solution?.[currentLocale] || h.solution?.pt || ""

                return (
                  <ExerciseBlock
                    key={i}
                    label={dict.courses.homework}
                    number={i + 1}
                    title={homeworkTitle}
                    statement={homeworkStatement}
                    difficulty={h.difficulty}
                    solution={homeworkSolution}
                  />
                )
              })
            ) : (
              <p className="text-sm text-neutral-600">
                {dict.courses.noHomework}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.resources}
          </h3>

          <div className="mt-6 grid gap-2">
            {lesson.resources?.length ? (
              lesson.resources.map((r, i) => {
                const resourceLabel =
                  r.label?.[currentLocale] || r.label?.pt || r.url || ""

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


