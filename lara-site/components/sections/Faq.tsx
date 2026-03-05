"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/components/Section"

const faqs = [
  {
    q: "Quanto tempo demora um projeto?",
    a: "Depende do tipo e complexidade. Um site one page pode levar 3–4 semanas, enquanto uma loja online grande pode levar 8–12 semanas. O prazo exato é definido após o briefing.",
  },
  {
    q: "Quantas revisões estão incluídas?",
    a: "Cada fase do projeto inclui 2–3 rondas de revisões. Alterações adicionais fora do scope inicial são orçamentadas separadamente.",
  },
  {
    q: "Preciso fornecer os conteúdos?",
    a: "Sim, idealmente forneces textos e imagens. Posso recomendar copywriters e fotógrafos, ou ajudar na curadoria do conteúdo.",
  },
  {
    q: "Como funciona o domínio e hosting?",
    a: "Posso ajudar na escolha e configuração do domínio e hosting. Recomendo soluções como Vercel/Netlify para sites e soluções dedicadas para lojas.",
  },
  {
    q: "Fazem manutenção após o lançamento?",
    a: "Sim. Existem pacotes mensais que incluem atualizações, backups, monitorização e pequenas alterações.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Pagamento faseado por marcos: 30% no início, 40% após aprovação do design, 30% no lançamento. Aceito transferência bancária ou MB Way.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Perguntas frequentes"
      subtitle="Respostas claras para tomares decisões com confiança."
    >
      <div className="rounded-2xl border border-black/10 bg-white">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i

          return (
            <div key={f.q} className="px-6 py-7 sm:px-8 sm:py-8">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] font-medium leading-snug text-neutral-950 sm:text-base">
                  {f.q}
                </span>

                {/* minimal + icon (vertical stroke collapses) */}
                <span className="relative h-5 w-5 flex-none text-neutral-400 transition-colors duration-200" style={{ color: isOpen ? "#0a0a0a" : undefined }}>
                  <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4">
                      <p className="max-w-3xl text-[13.5px] leading-relaxed text-neutral-600 sm:text-sm">
                        {f.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* divider (hidden on last item) */}
              {i !== faqs.length - 1 && <div className="mt-7 h-px w-full bg-black/10" />}
            </div>
          )
        })}
      </div>
    </Section>
  )
}