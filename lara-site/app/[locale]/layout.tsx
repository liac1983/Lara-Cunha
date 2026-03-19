import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { getDictionary } from "@/lib/i18n"
import { createClient } from "@/lib/supabase/server"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        isLoggedIn={!!user}
      />
      {children}
      <Footer dict={dict} />
    </>
  )
}

