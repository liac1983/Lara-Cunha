"use client"

import Link from "next/link"
import { useState } from "react"

type HeaderProps = {
  locale: string
  dict: {
    nav: {
      about: string
      services: string
      process: string
      portfolio: string
      courses: string
      faq: string
      contact: string
      bookCall: string
    }
  }
}

export function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const homeHref = `/${locale}`
  const aboutHref = `/${locale}/about`
  const servicesHref = `/${locale}/#servicos`
  const processHref = `/${locale}/#processo`
  const portfolioHref = `/${locale}/#portfolio`
  const faqHref = `/${locale}/#faq`
  const contactHref = `/${locale}/#contacto`
  const coursesHref = `/${locale}/cursos`

  const switchToPT = "/pt"
  const switchToEN = "/en"

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          href={homeHref}
          className="text-sm tracking-[0.22em] text-neutral-950"
        >
          LARA CUNHA
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">

          <Link className="hover:text-neutral-950" href={aboutHref}>
            {dict.nav.about}
          </Link>

          <Link className="hover:text-neutral-950" href={servicesHref}>
            {dict.nav.services}
          </Link>

          <Link className="hover:text-neutral-950" href={processHref}>
            {dict.nav.process}
          </Link>

          <Link className="hover:text-neutral-950" href={portfolioHref}>
            {dict.nav.portfolio}
          </Link>

          <Link className="hover:text-neutral-950" href={coursesHref}>
            {dict.nav.courses}
          </Link>

          <Link className="hover:text-neutral-950" href={faqHref}>
            {dict.nav.faq}
          </Link>

          <Link className="hover:text-neutral-950" href={contactHref}>
            {dict.nav.contact}
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* LANGUAGE SWITCHER */}
          <div className="hidden items-center gap-2 text-xs tracking-[0.18em] md:flex">
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

          

          {/* HAMBURGER BUTTON (mobile only) */}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-neutral-700">

            <Link
              href={aboutHref}
              onClick={() => setMenuOpen(false)}
            >
              {dict.nav.about}
            </Link>

            <Link href={servicesHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.services}
            </Link>

            <Link href={processHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.process}
            </Link>

            <Link href={portfolioHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.portfolio}
            </Link>

            <Link href={coursesHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.courses}
            </Link>

            <Link href={faqHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.faq}
            </Link>

            <Link href={contactHref} onClick={() => setMenuOpen(false)}>
              {dict.nav.contact}
            </Link>

            {/* MOBILE LANGUAGE SWITCH */}
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

            
          </nav>
        </div>
      )}
    </header>
  )
}

