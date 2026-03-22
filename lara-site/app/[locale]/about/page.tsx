import { getDictionary } from "@/lib/i18n"
import { getProjects } from "@/lib/sanity/queries"
import { AboutPage } from "@/components/pages/AboutPage"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const projects = await getProjects()

  return (
    <AboutPage
      locale={locale}
      dict={dict}
      projects={projects}
    />
  )
}

