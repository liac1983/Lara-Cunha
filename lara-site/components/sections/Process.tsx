import { Section } from "@/components/Section"

type ProcessStep = {
  n: string
  title: string
  time: string
  desc: string
}

type ProcessProps = {
  dict: {
    process: {
      eyebrow: string
      title: string
      subtitle: string
      maintenance: string
      steps: ProcessStep[]
    }
  }
}

export function Process({ dict }: ProcessProps) {
  const steps = dict.process.steps

  return (
    <Section
      id="processo"
      eyebrow={dict.process.eyebrow}
      title={dict.process.title}
      subtitle={dict.process.subtitle}
    >
      <div className="mt-10">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-0 h-full w-px bg-neutral-200 sm:left-1/2" />

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                <span className="absolute left-4 top-10 h-2 w-2 -translate-x-1/2 rounded-full bg-neutral-300 sm:left-1/2" />

                <div className={`${i % 2 === 0 ? "sm:pr-10" : "sm:col-start-2 sm:pl-10"}`}>
                  <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] tracking-[0.25em] text-neutral-400">
                        {s.n}
                      </span>
                      <span className="h-px w-10 bg-neutral-200" />
                    </div>

                    <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-lg font-light text-neutral-950 sm:text-xl">
                        {s.title}
                      </h3>
                      <p className="text-sm text-neutral-500">{s.time}</p>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#f6f1ea] p-8 text-sm text-neutral-700">
          {dict.process.maintenance}
        </div>
      </div>
    </Section>
  )
}

