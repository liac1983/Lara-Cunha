import Link from "next/link"

type CourseCardProps = {
  title: string
  slug: string
  locale: string
  description?: string
  eyebrow?: string // ex: "Curso"
  meta?: string // ex: "Iniciante · 12 aulas"
}

export function CourseCard({
  title,
  slug,
  locale,
  description,
  eyebrow,
  meta,
}: CourseCardProps) {
  return (
    <Link
      href={`/${locale}/cursos/${slug}`}
      className="group block rounded-2xl border border-black/10 bg-white p-6 transition hover:border-black/20 hover:bg-neutral-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-[11px] tracking-[0.25em] text-neutral-500">
              {eyebrow}
            </p>
          ) : null}

          <h3 className="mt-3 text-xl font-medium text-neutral-950">
            {title}
          </h3>

          {description ? (
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          ) : null}

          {meta ? (
            <p className="mt-4 text-xs tracking-[0.18em] text-neutral-400">
              {meta}
            </p>
          ) : null}
        </div>

        <span className="shrink-0 text-neutral-400 transition group-hover:text-neutral-950">
          →
        </span>
      </div>
    </Link>
  )
}

