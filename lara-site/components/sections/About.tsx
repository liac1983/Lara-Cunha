"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/Section"

type AboutProps = {
  dict: {
    about: {
      eyebrow: string
      title: string
      text1: string
      text2: string
    }
  }
}

export function About({ dict }: AboutProps) {
  return (
    <Section id="sobre" eyebrow={dict.about.eyebrow}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* LEFT — TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-light leading-tight text-neutral-950 sm:text-5xl">
            {dict.about.title}
          </h2>

          <p className="text-base leading-relaxed text-neutral-600">
            {dict.about.text1}
          </p>

          <p className="text-base leading-relaxed text-neutral-600">
            {dict.about.text2}
          </p>
        </motion.div>

        {/* RIGHT — IMAGEM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto max-w-[420px] md:ml-auto md:mr-0"
        >
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/lara-about.jpeg"
              alt="Lara Cunha"
              width={800}
              height={1000}
              className="h-auto w-full object-cover transition duration-700 ease-out hover:scale-[1.03]"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-neutral-200/40 blur-2xl" />
        </motion.div>
      </div>
    </Section>
  )
}
