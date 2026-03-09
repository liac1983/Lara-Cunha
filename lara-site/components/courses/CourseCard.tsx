import Link from "next/link"

type CourseCardProps = {
  title: string
  slug: string
  description?: string
  eyebrow?: string // ex: "Curso"
  meta?: string // ex: "Iniciante · 12 aulas"
}

export function CourseCard({ title, slug, description, eyebrow = "Curso", meta }: CourseCardProps) {
  return (
    <Link
      href={`/${locale}/cursos/${slug}`}
      className="group block rounded-2xl border border-black/10 bg-white p-7 sm:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.25em] text-neutral-500">{eyebrow}</p>

          <h3 className="mt-3 text-xl font-medium text-neutral-950 sm:text-2xl">
            {title}
          </h3>

          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          ) : null}

          {meta ? (
            <p className="mt-5 text-xs tracking-[0.15em] text-neutral-500">
              {meta}
            </p>
          ) : null}
        </div>

        <span className="mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-black/10 text-neutral-600 transition group-hover:border-black/20 group-hover:text-neutral-950">
          →
        </span>
      </div>

      {/* micro underline */}
      <div className="mt-6 h-px w-full bg-black/10 transition group-hover:bg-black/20" />
    </Link>
  )
}


