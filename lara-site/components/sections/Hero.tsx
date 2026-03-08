import Reveal from "@/components/Reveal"

type HeroProps = {
  dict: {
    hero: {
      title: string
      subtitle: string
      primaryCta: string
      secondaryCta: string
    }
  }
  locale: string
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section id="top" className="bg-[#F5F5F5]">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Reveal delay={0.05} y={14}>
          <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
            {dict.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={0.18} y={10}>
          <p className="mt-6 text-lg text-neutral-600">
            {dict.hero.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center gap-4">
          <Reveal delay={0.28} y={8}>
            <a
              href={`/${locale}#contacto`}
              className="inline-flex rounded-full bg-black px-7 py-3 text-white"
            >
              {dict.hero.primaryCta}
            </a>
          </Reveal>

          <Reveal delay={0.35} y={8}>
            <a
              href={`/${locale}#servicos`}
              className="group relative inline-flex rounded-full border border-black px-7 py-3"
            >
              <span className="relative">
                {dict.hero.secondaryCta}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
