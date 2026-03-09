import Link from "next/link"
import { Section } from "@/components/Section"
import { getCourses } from "@/lib/sanity/queries"

type CourseListItem = {
  _id: string
  title: string
  slug: { current: string } | string
  description?: string
}

export default async function CoursesPage() {
  const courses: CourseListItem[] = await getCourses()

  return (
    <Section
      id="cursos"
      eyebrow="Cursos"
      title="Cursos disponíveis"
      subtitle="Conteúdos práticos, bem estruturados e editáveis no backoffice."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((c) => {
          const slug = typeof c.slug === "string" ? c.slug : c.slug.current

          return (
            <div
              key={c._id}
              className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10"
            >
              <h2 className="text-2xl font-light text-neutral-950 sm:text-3xl">
                {c.title}
              </h2>

              {c.description ? (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {c.description}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  Curso disponível.
                </p>
              )}

              <div className="mt-6">
                <Link
                  href={`/${locale}/cursos/${slug}`}
                  className="inline-flex rounded-full border border-black/10 px-6 py-3 text-xs tracking-[0.2em] text-neutral-950 hover:border-black/20"
                >
                  VER CURSO
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

