type ExerciseBlockProps = {
  label?: string // "Exercício" | "TPC" etc
  number?: number
  title: string
  statement?: string
  difficulty?: "Easy" | "Medium" | "Hard"
  hint?: string
  children?: React.ReactNode // se quiseres meter código, links, etc
}

export function ExerciseBlock({
  label = "Exercício",
  number,
  title,
  statement,
  difficulty,
  hint,
  children,
}: ExerciseBlockProps) {
  const n = typeof number === "number" ? String(number).padStart(2, "0") : null

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-neutral-400">
          {n ? <span className="text-xs tracking-[0.25em]">{n}</span> : null}
          <span className="text-[11px] tracking-[0.25em] text-neutral-500">{label}</span>
          <span className="h-px w-10 bg-neutral-200" />
        </div>

        {difficulty ? (
          <span className="rounded-full border border-black/10 px-3 py-1 text-[11px] tracking-[0.2em] text-neutral-600">
            {difficulty.toUpperCase()}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 text-base font-medium text-neutral-950">
        {title}
      </h3>

      {statement ? (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {statement}
        </p>
      ) : null}

      {hint ? (
        <div className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
          <p className="text-xs tracking-[0.2em] text-neutral-500">DICA</p>
          <p className="mt-2 leading-relaxed">{hint}</p>
        </div>
      ) : null}

      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  )
}

