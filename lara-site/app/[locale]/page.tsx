import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { getDictionary } from "@/lib/i18n"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <main>
      <Hero dict={dict} locale={locale} />
      <About dict={dict} />
      <Services />
      <Process />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  )
}
