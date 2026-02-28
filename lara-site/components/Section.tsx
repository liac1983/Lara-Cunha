type Props = {
  id?: string
  eyebrow?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, subtitle, children, className = "" }: Props) {
  return (
    <section id={id} className={`w-full py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || subtitle) && (
          <header className="mb-10 sm:mb-14">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-light tracking-tight text-neutral-950 sm:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
