import { getDictionary } from "@/lib/i18n"
import { TutoringPage } from "@/components/pages/TutoringPage"
import { TutoringForm } from "@/components/forms/TutoringForm"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <TutoringPage locale={locale} dict={dict} />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs tracking-[0.25em] text-neutral-500">
            {dict.tutoringPage.form.title}
          </p>

          <h2 className="mt-4 text-3xl font-light leading-tight text-neutral-950 sm:text-4xl">
            {dict.tutoringPage.form.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            {dict.tutoringPage.form.subtitle}
          </p>
        </div>

        <TutoringForm dict={dict} />
      </div>
    </>
  )
}

