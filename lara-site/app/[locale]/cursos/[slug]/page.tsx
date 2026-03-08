import Link from "next/link"
import { notFound } from "next/navigation"
import { Section } from "@/components/Section"
import { getCourseBySlug, getLessonsByCourseSlug } from "@/lib/sanity/queries"

type Course = {
  _id: string
  title: string
  slug: string // depois das queries, isto já deve vir como string
  description?: string
}

type LessonListItem = {
  _id: string
  title: string
  slug: string // idem
  lessonNumber?: number
  time?: string
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug?: string }>
}) {
  const { slug } = await params
  if (!slug) return notFound()

  const course: Course | null = await getCourseBySlug(slug)
  if (!course) return notFound()

  const lessons: LessonListItem[] = await getLessonsByCourseSlug(slug)

  return (
    <Section
      id={`curso-${course.slug}`}
      eyebrow="Curso"
      title={course.title}
      subtitle={course.description ?? "Descrição do curso."}
    >
      <div className="mt-10 grid gap-6">
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">AULAS</h3>

          <div className="mt-6 divide-y divide-black/10">
            {lessons.map((l, i) => {
              const number =
                typeof l.lessonNumber === "number"
                  ? String(l.lessonNumber).padStart(2, "0")
                  : String(i + 1).padStart(2, "0")

              return (
                <Link
                  key={l._id}
                  href={`/cursos/${course.slug}/aulas/${l.slug}`}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="text-xs tracking-[0.25em]">{number}</span>
                      <span className="h-px w-10 bg-neutral-200" />
                    </div>

                    <div>
                      <p className="text-base font-medium text-neutral-950 group-hover:underline">
                        {l.title}
                      </p>
                      {l.time ? (
                        <p className="mt-1 text-sm text-neutral-500">{l.time}</p>
                      ) : null}
                    </div>
                  </div>

                  <span className="text-sm text-neutral-400 group-hover:text-neutral-950">
                    →
                  </span>
                </Link>
              )
            })}

            {lessons.length === 0 && (
              <p className="py-6 text-sm text-neutral-600">
                Ainda não existem aulas publicadas para este curso.
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/cursos"
            className="text-xs tracking-[0.2em] text-neutral-500 hover:text-neutral-950"
          >
            ← VOLTAR A CURSOS
          </Link>
        </div>
      </div>
    </Section>
  )
}

