import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/Section"
import { Portfolio } from "@/components/sections/Portfolio"

type LocalizedText = {
  pt?: string
  en?: string
}

type ProjectItem = {
  _id: string
  order?: number
  title?: LocalizedText
  slug: string
  shortDescription?: LocalizedText
  clientType?: LocalizedText
  goal?: LocalizedText
  result?: LocalizedText
  mainImage?: any
}

type AboutPageProps = {
  locale: string
  dict: any
  projects: ProjectItem[]
}

export function AboutPage({ locale, dict, projects }: AboutPageProps) {
  const contactHref = `/${locale}/#contacto`

  return (
    <main>
      <Section
        id="about-page"
        eyebrow={dict.aboutPage.eyebrow}
        title={dict.aboutPage.title}
        subtitle={dict.aboutPage.intro}
      >
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-neutral-600">
              {dict.aboutPage.paragraph1}
            </p>

            <p className="text-base leading-relaxed text-neutral-600">
              {dict.aboutPage.paragraph2}
            </p>

            <p className="text-base leading-relaxed text-neutral-600">
              {dict.aboutPage.paragraph3}
            </p>
          </div>

          <div className="relative mx-auto max-w-[420px] md:ml-auto md:mr-0">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/lara-about.jpeg"
                alt="Lara Cunha"
                width={800}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/10 p-6">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.highlights.education}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              Informatics and Computing Engineering
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.highlights.experience}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              Frontend, testing, digital products
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.highlights.technologies}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              Html, Css, Php, JavaScript, WordPress, TypeScript, React, Next.js, Angular, Python, C/C++, Java, SQL, Flutter SDK and Android Studio
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.highlights.languages}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              Portuguese, English and Spanish
            </p>
          </div>
        </div>
      </Section>

              <div className="mx-auto max-w-6xl px-6 mt-24">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.experienceSection.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-light text-neutral-950 md:text-4xl">
              {dict.aboutPage.experienceSection.title}
            </h2>
          </div>

          <div className="mt-12 space-y-20">
            {dict.aboutPage.experienceSection.items.map((item: any, index: number) => (
              <div
                key={index}
                className="grid gap-y-6 border-l border-black/10 pl-6 md:grid-cols-[180px_1fr] md:gap-x-8 md:gap-y-0"
              >
                <div>
                  <p className="text-sm text-neutral-500">{item.period}</p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border border-neutral-900 bg-white" />

                  <p className="text-base text-neutral-500">
                    {item.company}
                  </p>

                  <h3 className="mt-1 text-2xl font-light text-neutral-950">
                    {item.role}
                  </h3>

                  <p className="mt-4 mb-8 max-w-3xl text-sm leading-relaxed text-neutral-750">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      <Portfolio
        locale={locale as "pt" | "en"}
        projects={projects}
        dict={dict}
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl bg-[#F5F5F5] p-8">
          <h3 className="text-xl font-light text-neutral-950">
            {dict.aboutPage.philosophyTitle}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-700">
            {dict.aboutPage.philosophyText}
          </p>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-2xl font-light text-neutral-950">
            {dict.aboutPage.ctaTitle}
          </h3>

          <div className="mt-6">
            <Link
              href={contactHref}
              className="inline-flex rounded-full border border-neutral-900 px-6 py-3 text-xs tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            >
              {dict.aboutPage.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


