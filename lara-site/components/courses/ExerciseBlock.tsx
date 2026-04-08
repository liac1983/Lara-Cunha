type ExerciseBlockProps = {
  label?: string
  number?: number
  title: string
  statement?: string
  difficulty?: string
  hint?: string
  solution?: string
  children?: React.ReactNode
}

function MultilineText({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const lines = text.split(/\r?\n/)

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className={line.trim() === "" ? "h-4" : ""}>
          {line.trim() === "" ? "\u00A0" : line}
        </div>
      ))}
    </div>
  )
}

export function ExerciseBlock({
  label = "Exercise",
  number,
  title,
  statement,
  difficulty,
  hint,
  solution,
  children,
}: ExerciseBlockProps) {
  const n = typeof number === "number" ? String(number).padStart(2, "0") : null
  const hasExpandableContent = Boolean(solution || children)

  if (!hasExpandableContent) {
    return (
      <section className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-neutral-400">
            {n ? <span className="text-xs tracking-[0.25em]">{n}</span> : null}
            <span className="text-[11px] tracking-[0.25em] text-neutral-500">
              {label}
            </span>
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
          <MultilineText
            text={statement}
            className="mt-3 text-sm leading-relaxed text-neutral-600"
          />
        ) : null}

        {hint ? (
          <div className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            <p className="text-xs tracking-[0.2em] text-neutral-500">HINT</p>
            <MultilineText
              text={hint}
              className="mt-2 text-sm leading-relaxed text-neutral-700"
            />
          </div>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}
      </section>
    )
  }

  return (
    <details className="group rounded-2xl border border-black/10 bg-white transition open:border-black/20 open:bg-neutral-50/40">
      <summary className="cursor-pointer list-none p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-neutral-400">
            {n ? <span className="text-xs tracking-[0.25em]">{n}</span> : null}
            <span className="text-[11px] tracking-[0.25em] text-neutral-500">
              {label}
            </span>
            <span className="h-px w-10 bg-neutral-200" />
          </div>

          <div className="flex items-center gap-3">
            {difficulty ? (
              <span className="rounded-full border border-black/10 px-3 py-1 text-[11px] tracking-[0.2em] text-neutral-600">
                {difficulty.toUpperCase()}
              </span>
            ) : null}

            <span className="text-lg leading-none text-neutral-400 transition-transform duration-200 group-open:rotate-45 group-open:text-neutral-700">
              +
            </span>
          </div>
        </div>

        <h3 className="mt-4 text-base font-medium text-neutral-950">
          {title}
        </h3>

        {statement ? (
          <MultilineText
            text={statement}
            className="mt-3 text-sm leading-relaxed text-neutral-600"
          />
        ) : null}

        {hint ? (
          <div className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
            <p className="text-xs tracking-[0.2em] text-neutral-500">HINT</p>
            <MultilineText
              text={hint}
              className="mt-2 text-sm leading-relaxed text-neutral-700"
            />
          </div>
        ) : null}
      </summary>

      <div className="border-t border-black/10 px-6 py-6 sm:px-8 sm:py-8">
        {solution ? (
          <div className="rounded-xl bg-neutral-50 px-5 py-5">
            <p className="text-xs tracking-[0.2em] text-neutral-500">
              SOLUTION
            </p>

            <MultilineText
              text={solution}
              className="mt-4 text-sm leading-relaxed text-neutral-700"
            />
          </div>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </details>
  )
}

