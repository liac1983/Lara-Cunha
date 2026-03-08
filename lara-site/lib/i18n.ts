import { pt } from "@/messages/pt"
import { en } from "@/messages/en"

export const dictionaries = {
  pt,
  en,
}

export type Locale = "pt" | "en"

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? pt
}

