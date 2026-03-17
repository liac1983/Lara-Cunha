import { Section } from "@/components/Section"
import { TutoringForm } from "@/components/forms/TutoringForm"

type TutoringPageProps = {
  locale: string
  dict: any
}

export function TutoringPage({ dict }: TutoringPageProps) {
  return (
    <main>
      <Section
        id="explicacoes-hero"
        eyebrow={dict.tutoringPage.hero.eyebrow}
        title={dict.tutoringPage.hero.title}
        subtitle={dict.tutoringPage.hero.subtitle}
      >
        <div className="mt-20">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.tutoringPage.topics.title}
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dict.tutoringPage.topics.items.map((item: string) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <p className="text-sm leading-relaxed text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-2xl bg-[#F5F5F5] p-8 sm:p-10">
          <p className="text-xs tracking-[0.25em] text-neutral-500">
            {dict.tutoringPage.format.title}
          </p>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
            {dict.tutoringPage.format.text}
          </p>
        </div>

        <div className="mt-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.tutoringPage.audience.title}
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.tutoringPage.audience.items.map((item: string) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <p className="text-sm leading-relaxed text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        
      </Section>
    </main>
  )
}

