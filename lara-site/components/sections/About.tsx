"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/Section"

type AboutProps = {
  locale: string
  dict: {
    about: {
      eyebrow: string
      title: string
      text1: string
      text2: string
      cta: string
    }
  }
}

export function About({ dict, locale }: AboutProps) {
  const aboutPageHref = `/${locale}/about`

  return (
    <Section id="sobre" eyebrow={dict.about.eyebrow}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className=""
        >
          <h2 className="max-w-[11ch] text-4xl font-light leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl mb-10 md:mb-12">
            {dict.about.title}
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-neutral-600 mb-5">
            {dict.about.text1}
          </p>

          <p className="max-w-xl text-base leading-relaxed text-neutral-600">
            {dict.about.text2}
          </p>

          <Link
            href={aboutPageHref}
            className="group inline-flex items-center text-sm text-neutral-900"
          >
            <span className="relative">
              {dict.about.cta}
              <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto max-w-[420px] md:ml-auto md:mr-0"
        >
          <Link
            href={aboutPageHref}
            className="group relative block cursor-pointer overflow-hidden rounded-2xl"
            aria-label="Ir para a página Sobre"
          >
            <Image
              src="/lara-about.jpeg"
              alt="Lara Cunha"
              width={800}
              height={1000}
              className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/5" />
          </Link>

          <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-neutral-200/40 blur-2xl" />
        </motion.div>
      </div>
    </Section>
  )
}

