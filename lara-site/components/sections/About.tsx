"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/Section"

export function About() {
  return (
    <Section id="sobre" eyebrow="Sobre">
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
            Combino engenharia e sensibilidade estética
          </h2>

          <p className="text-base leading-relaxed text-neutral-600">
            Crio experiências digitais que refletem identidade, elegância e posicionamento —
            com foco em performance, acessibilidade e resultados.
          </p>

          <p className="text-base leading-relaxed text-neutral-600">
            Formada em Engenharia Informática pela FEUP, especializo-me em desenvolvimento
            full-stack e direção visual para marcas que valorizam detalhe, estética e consistência.
          </p>
        </motion.div>

        {/* RIGHT — IMAGEM */}
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto md:ml-auto md:mr-0 max-w-[420px]"
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