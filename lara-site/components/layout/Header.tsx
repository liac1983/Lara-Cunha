import Link from "next/link"

type HeaderProps = {
  locale: string
  dict: {
    nav: {
      services: string
      process: string
      portfolio: string
      courses: string
      faq: string
      contact: string
      call: string
    }
  }
}

export function Header({ locale, dict }: HeaderProps) {
  const otherLocale = locale === "pt" ? "en" : "pt"

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-sm tracking-[0.22em] text-neutral-950">
          LARA CUNHA
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
          <Link href={`/${locale}#servicos`} className="hover:text-neutral-950">
            {dict.nav.services}
          </Link>
          <Link href={`/${locale}#processo`} className="hover:text-neutral-950">
            {dict.nav.process}
          </Link>
          <Link href={`/${locale}#portfolio`} className="hover:text-neutral-950">
            {dict.nav.portfolio}
          </Link>
          <Link href={`/${locale}/cursos`} className="hover:text-neutral-950">
            {dict.nav.courses}
          </Link>
          <Link href={`/${locale}#faq`} className="hover:text-neutral-950">
            {dict.nav.faq}
          </Link>
          <Link href={`/${locale}#contacto`} className="hover:text-neutral-950">
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`/${otherLocale}`}
            className="text-xs tracking-[0.18em] text-neutral-500 hover:text-neutral-950"
          >
            {locale === "pt" ? "EN" : "PT"}
          </Link>

          <Link
            href={`/${locale}#contacto`}
            className="rounded-full border border-neutral-900 px-4 py-2 text-xs tracking-[0.18em] text-neutral-950 hover:bg-neutral-950 hover:text-white"
          >
            {dict.nav.call}
          </Link>
        </div>
      </div>
    </header>
  )
}

