import Link from "next/link"
import { notFound } from "next/navigation"
import { Section } from "@/components/Section"
import { getCourseBySlug, getLessonsByCourseSlug } from "@/lib/sanity/queries"
import { getDictionary } from "@/lib/i18n"

type LocalizedText = {
  pt?: string
  en?: string
}

type Course = {
  _id: string
  title?: LocalizedText
  slug: string
  description?: LocalizedText
}

type LessonListItem = {
  _id: string
  title?: LocalizedText
  slug: string
  lessonNumber?: number
  duration?: LocalizedText
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string }>
}) {
  const { locale, slug } = await params
  if (!slug) return notFound()

  const dict = getDictionary(locale)
  const course: Course | null = await getCourseBySlug(slug)
  if (!course) return notFound()

  const lessons: LessonListItem[] = await getLessonsByCourseSlug(slug)

  const localizedCourseTitle =
    course.title?.[locale as "pt" | "en"] || course.title?.pt || ""

  const localizedCourseDescription =
    course.description?.[locale as "pt" | "en"] ||
    course.description?.pt ||
    dict.courses.available

  return (
    <Section
      id={`curso-${course.slug}`}
      eyebrow={dict.courses.courseEyebrow}
      title={localizedCourseTitle}
      subtitle={localizedCourseDescription}
    >
      <div className="mt-10 grid gap-6">
        <div className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
          <h3 className="text-sm tracking-[0.25em] text-neutral-500">
            {dict.courses.lessonsLabel}
          </h3>

          <div className="mt-6 divide-y divide-black/10">
            {lessons.map((l, i) => {
              const number =
                typeof l.lessonNumber === "number"
                  ? String(l.lessonNumber).padStart(2, "0")
                  : String(i + 1).padStart(2, "0")

              const localizedLessonTitle =
                l.title?.[locale as "pt" | "en"] || l.title?.pt || ""

              const localizedLessonDuration =
                l.duration?.[locale as "pt" | "en"] || l.duration?.pt || ""

              return (
                <Link
                  key={l._id}
                  href={`/${locale}/cursos/${course.slug}/aulas/${l.slug}`}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="text-xs tracking-[0.25em]">{number}</span>
                      <span className="h-px w-10 bg-neutral-200" />
                    </div>

                    <div>
                      <p className="text-base font-medium text-neutral-950 group-hover:underline">
                        {localizedLessonTitle}
                      </p>
                      {localizedLessonDuration ? (
                        <p className="mt-1 text-sm text-neutral-500">
                          {localizedLessonDuration}
                        </p>
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
                {dict.courses.noLessons}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/cursos`}
            className="text-xs tracking-[0.2em] text-neutral-500 hover:text-neutral-950"
          >
            {dict.courses.backToCourses}
          </Link>
        </div>
      </div>
    </Section>
  )
}

