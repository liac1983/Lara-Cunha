import { getDictionary } from "@/lib/i18n"
import { AboutPage } from "@/components/pages/AboutPage"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return <AboutPage locale={locale} dict={dict} />
}

