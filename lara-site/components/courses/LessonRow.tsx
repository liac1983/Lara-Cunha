import Link from "next/link"

type LessonRowProps = {
  courseSlug: string
  lessonSlug: string
  number: number | string
  title: string
  duration?: string
  isActive?: boolean
}

export function LessonRow({
  courseSlug,
  lessonSlug,
  number,
  title,
  duration,
  isActive = false,
}: LessonRowProps) {
  const n = typeof number === "number" ? String(number).padStart(2, "0") : number

  return (
    <Link
      href={`/cursos/${courseSlug}/aulas/${lessonSlug}`}
      className={[
        "group flex items-center justify-between gap-6 rounded-xl border border-black/10 bg-white px-5 py-4 transition",
        "hover:border-black/20 hover:bg-neutral-50",
        isActive ? "border-black/20 bg-neutral-50" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* number editorial */}
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="text-xs tracking-[0.25em]">{n}</span>
          <span className="h-px w-8 bg-neutral-200" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-950">{title}</p>
          {duration ? (
            <p className="mt-1 text-xs text-neutral-500">{duration}</p>
          ) : null}
        </div>
      </div>

      <span className="text-neutral-400 transition group-hover:text-neutral-950">
        →
      </span>
    </Link>
  )
}

