import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { getDictionary } from "@/lib/i18n"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Header locale={locale} dict={dict} />
      {children}
      <Footer dict={dict} />
    </div>
  )
}

