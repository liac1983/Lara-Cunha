import Link from "next/link"
import Image from "next/image"
import { Section } from "@/components/Section"

type AboutPageProps = {
  locale: string
  dict: any
}

export function AboutPage({ locale, dict }: AboutPageProps) {
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
              Computer Engineering
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
              Html, Css, Php, JavaScript, TypeScript, React, Next.js, Angular
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 p-6">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              {dict.aboutPage.highlights.languages}
            </p>
            <p className="mt-3 text-sm text-neutral-700">
              Portuguese, English
            </p>
          </div>
        </div>

        <div className="mt-24 rounded-2xl bg-[#f6f1ea] p-8">
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
      </Section>
    </main>
  )
}

