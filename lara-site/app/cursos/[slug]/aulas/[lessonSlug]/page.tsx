import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Section } from "@/components/Section"
import { getLesson } from "@/lib/sanity/queries"

type Exercise = {
  title?: string
  statement?: string
}

type Resource = {
  label?: string
  url?: string
}

type Lesson = {
  _id: string
  title: string
  courseTitle?: string
  courseSlug: string
  lessonNumber?: number
  duration?: string
  theory?: any
  exercises?: Exercise[]
  homework?: Exercise[]
  resources?: Resource[]
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug?: string; lessonSlug?: string }>
}) {
  const { slug, lessonSlug } = await params
  if (!slug || !lessonSlug) return notFound()

  const lesson: Lesson | null = await getLesson(slug, lessonSlug)
  if (!lesson) return notFound()

  const number =
    typeof lesson.lessonNumber === "number"
      ? String(lesson.lessonNumber).padStart(2, "0")
      : null

  return (
    <Section
      id={`aula-${lesson._id}`}
      eyebrow={`Aula ${number ?? ""}`}
      title={lesson.title}
      subtitle={lesson.duration ? `Duração estimada: ${lesson.duration}` : undefined}
    >
      <div className="grid gap-8">
        {/* TEORIA */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">TEORIA</h3>

          <div className="prose prose-neutral mt-6 max-w-none">
            {lesson.theory ? (
              <PortableText value={lesson.theory} />
            ) : (
              <p className="text-sm text-neutral-600">
                Ainda não há teoria publicada para esta aula.
              </p>
            )}
          </div>
        </div>

        {/* EXERCÍCIOS */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">EXERCÍCIOS</h3>

          <div className="mt-6 grid gap-4">
            {lesson.exercises?.length ? (
              lesson.exercises.map((ex, i) => (
                <div key={i} className="rounded-xl border border-black/10 p-6">
                  <p className="text-sm font-medium text-neutral-950">
                    {ex.title ?? `Exercício ${i + 1}`}
                  </p>
                  {ex.statement ? (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {ex.statement}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-600">
                Ainda não existem exercícios para esta aula.
              </p>
            )}
          </div>
        </div>

        {/* TPC */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">TPC</h3>

          <div className="mt-6 grid gap-4">
            {lesson.homework?.length ? (
              lesson.homework.map((h, i) => (
                <div key={i} className="rounded-xl border border-black/10 p-6">
                  <p className="text-sm font-medium text-neutral-950">
                    {h.title ?? `TPC ${i + 1}`}
                  </p>
                  {h.statement ? (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {h.statement}
                    </p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-600">
                Ainda não existe TPC para esta aula.
              </p>
            )}
          </div>
        </div>

        {/* RECURSOS */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">RECURSOS</h3>

          <div className="mt-6 grid gap-2">
            {lesson.resources?.length ? (
              lesson.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-neutral-700 underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
                >
                  {r.label ?? r.url}
                </a>
              ))
            ) : (
              <p className="text-sm text-neutral-600">
                Ainda não existem recursos para esta aula.
              </p>
            )}
          </div>
        </div>

        {/* VOLTAR */}
        <div className="flex justify-center">
          <Link
            href={`/cursos/${lesson.courseSlug}`}
            className="text-xs tracking-[0.2em] text-neutral-500 hover:text-neutral-950"
          >
            ← VOLTAR AO CURSO
          </Link>
        </div>
      </div>
    </Section>
  )
}

