import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { getDictionary } from "@/lib/i18n"
import { getServices } from "@/lib/sanity/queries"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const services = await getServices()

  return (
    <main>
      <Hero dict={dict} locale={locale} />
      <About dict={dict} />
      <Services locale={locale as "pt" | "en"} services={services} dict={dict} />
      <Process dict={dict} />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  )
}

