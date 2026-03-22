import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { getDictionary } from "@/lib/i18n"
import { getServices, getProjects } from "@/lib/sanity/queries"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const services = await getServices()
  const projects = await getProjects()

  return (
    <main>
      <Hero dict={dict} locale={locale} />
      <About dict={dict} />
      <Services locale={locale as "pt" | "en"} services={services} dict={dict} />
      <Process dict={dict} />
      <Portfolio
        locale={locale as "pt" | "en"}
        projects={projects}
        dict={dict}
      />
      <Faq dict={dict} />
      <Contact dict={dict} />
    </main>
  )
}

