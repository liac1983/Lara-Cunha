import Link from "next/link"
import { Section } from "@/components/Section"
import { getCourses } from "@/lib/sanity/queries"
import { getDictionary } from "@/lib/i18n"

type LocalizedText = {
  pt?: string
  en?: string
}

type CourseListItem = {
  _id: string
  title?: LocalizedText
  slug: string
  description?: LocalizedText
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const courses: CourseListItem[] = await getCourses()

  return (
    <Section
      id="cursos"
      eyebrow={dict.courses.eyebrow}
      title={dict.courses.title}
      subtitle={dict.courses.subtitle}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((c) => {
          const localizedTitle = c.title?.[locale as "pt" | "en"] || c.title?.pt || ""
          const localizedDescription =
            c.description?.[locale as "pt" | "en"] || c.description?.pt || ""

          return (
            <div
              key={c._id}
              className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10"
            >
              <h2 className="text-2xl font-light text-neutral-950 sm:text-3xl">
                {localizedTitle}
              </h2>

              {localizedDescription ? (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {localizedDescription}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {dict.courses.available}
                </p>
              )}

              <div className="mt-6">
                <Link
                  href={`/${locale}/cursos/${c.slug}`}
                  className="inline-flex rounded-full border border-neutral-900 px-6 py-3 text-xs tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                >
                  {dict.courses.viewCourse}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

