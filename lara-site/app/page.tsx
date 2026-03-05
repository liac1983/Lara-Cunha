import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { Portfolio } from "@/components/sections/Portfolio"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  )
}