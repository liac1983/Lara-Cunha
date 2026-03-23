"use client"

import Link from "next/link"
import { useState } from "react"

type HeaderProps = {
  locale: string
  isLoggedIn: boolean
  dict: {
    nav: {
      about: string
      services: string
      process: string
      portfolio: string
      courses: string
      tutoring: string
      faq: string
      contact: string
      bookCall: string
      login: string
      logout: string
      minhasexplicacoes: string
    }
  }
}

export function Header({ locale, dict, isLoggedIn }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const homeHref = `/${locale}`
  const aboutHref = `/${locale}/about`
  const servicesHref = `/${locale}/#servicos`
  const processHref = `/${locale}/#processo`
  const portfolioHref = `/${locale}/#portfolio`
  const faqHref = `/${locale}/#faq`
  const contactHref = `/${locale}/#contacto`
  const coursesHref = `/${locale}/cursos`
  const tutoringHref = `/${locale}/explicacoes`
  const authLoginHref = `/${locale}/auth/login`
  const myLessonsHref = `/${locale}/minhas-explicacoes`

  const switchToPT = "/pt"
  const switchToEN = "/en"

  const pillPrimaryClass =
    "inline-flex items-center rounded-full bg-neutral-950 px-5 py-3 text-sm tracking-[0.12em] text-white transition hover:bg-neutral-800"

  const pillSecondaryClass =
    "inline-flex items-center rounded-full border border-black/10 px-5 py-3 text-sm tracking-[0.12em] text-neutral-900 transition hover:border-neutral-900"

  const pillPrimaryMobileClass =
    "inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm tracking-[0.08em] text-white transition hover:bg-neutral-800"

  const pillSecondaryMobileClass =
    "inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm tracking-[0.08em] text-neutral-900 transition hover:border-neutral-900"
  
  const navLinkClass =
  "group relative inline-flex items-center hover:text-neutral-950"
  
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-10 py-4">
        <Link
          href={homeHref}
          className="text-sm tracking-[0.22em] text-neutral-950"
        >
          LARA CUNHA
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
          <Link href={aboutHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.about}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={servicesHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.services}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={processHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.process}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={portfolioHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.portfolio}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={coursesHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.courses}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={tutoringHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.tutoring}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={faqHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.faq}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>

          <Link href={contactHref} className={navLinkClass}>
            <span className="relative">
              {dict.nav.contact}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 text-xs tracking-[0.18em]">
              <Link
                href={switchToPT}
                className={locale === "pt" ? "text-neutral-950" : "text-neutral-400"}
              >
                PT
              </Link>

              <span className="text-neutral-300">/</span>

              <Link
                href={switchToEN}
                className={locale === "en" ? "text-neutral-950" : "text-neutral-400"}
              >
                EN
              </Link>
            </div>

            {!isLoggedIn ? (
              <Link href={authLoginHref} className={pillPrimaryClass}>
                {dict.nav.login}
              </Link>
            ) : (
              <>
                <Link href={myLessonsHref} className={pillSecondaryClass}>
                  {dict.nav.minhasexplicacoes}
                </Link>

                <form action={`/${locale}/auth/logout`} method="post">
                  <button type="submit" className={pillPrimaryClass}>
                    {dict.nav.logout}
                  </button>
                </form>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-neutral-950 transition ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-neutral-950 transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-neutral-950 transition ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-neutral-700">
            <Link href={aboutHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.about}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={servicesHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.services}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={processHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.process}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={portfolioHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.portfolio}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={coursesHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.courses}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={tutoringHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.tutoring}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={faqHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.faq}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <Link href={contactHref} className={navLinkClass}>
              <span className="relative">
                {dict.nav.contact}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>

            <div className="flex gap-3 pt-2 text-xs tracking-[0.18em]">
              <Link
                href={switchToPT}
                className={locale === "pt" ? "text-neutral-950" : "text-neutral-400"}
                onClick={() => setMenuOpen(false)}
              >
                PT
              </Link>

              <Link
                href={switchToEN}
                className={locale === "en" ? "text-neutral-950" : "text-neutral-400"}
                onClick={() => setMenuOpen(false)}
              >
                EN
              </Link>
            </div>

            <div className="flex flex-col items-start gap-3 pt-4">
              {!isLoggedIn ? (
                <Link
                  href={authLoginHref}
                  className={pillPrimaryMobileClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {dict.nav.login}
                </Link>
              ) : (
                <>
                  <Link
                    href={myLessonsHref}
                    className={pillSecondaryMobileClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {dict.nav.minhasexplicacoes}
                  </Link>

                  <form action={`/${locale}/auth/logout`} method="post">
                    <button type="submit" className={pillPrimaryMobileClass}>
                      {dict.nav.logout}
                    </button>
                  </form>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

