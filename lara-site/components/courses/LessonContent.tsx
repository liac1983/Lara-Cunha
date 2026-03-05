import { PortableText } from "@portabletext/react"

type LessonContentProps = {
  eyebrow?: string // ex: "Aula 03"
  title: string
  meta?: string // ex: "20–30 min · Condicionais"
  theory?: any[] // Portable Text array vindo do Sanity
  children?: React.ReactNode // para renderizar exercícios/tpc abaixo
}

export function LessonContent({ eyebrow = "Aula", title, meta, theory, children }: LessonContentProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-7 sm:p-10">
      <header className="max-w-3xl">
        <p className="text-[11px] tracking-[0.25em] text-neutral-500">{eyebrow}</p>

        <h1 className="mt-3 text-2xl font-medium text-neutral-950 sm:text-3xl">
          {title}
        </h1>

        {meta ? (
          <p className="mt-2 text-sm text-neutral-500">{meta}</p>
        ) : null}
      </header>

      {/* divider */}
      <div className="mt-8 h-px w-full bg-black/10" />

      {/* theory */}
      {theory ? (
        <div className="prose prose-neutral mt-8 max-w-none prose-p:leading-relaxed prose-a:underline prose-a:decoration-black/20 prose-a:underline-offset-4 hover:prose-a:decoration-black/40">
          <PortableText value={theory} />
        </div>
      ) : null}

      {children ? (
        <>
          <div className="mt-10 h-px w-full bg-black/10" />
          <div className="mt-8 space-y-6">{children}</div>
        </>
      ) : null}
    </article>
  )
}

