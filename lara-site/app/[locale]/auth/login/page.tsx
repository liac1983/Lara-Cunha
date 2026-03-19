import { getDictionary } from "@/lib/i18n"
import LoginPageClient from "./login-page-client"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return <LoginPageClient locale={locale} dict={dict} />
}