import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ locale: string }>
}

export async function GET(request: Request, { params }: RouteContext) {
  const { locale } = await params
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get("code")
  const next = searchParams.get("next")

  const fallbackPath = `/${locale}/minhas-explicacoes`

  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : fallbackPath

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(`${origin}/${locale}/auth/login?error=auth_callback`)
    }
  }

  return NextResponse.redirect(`${origin}${safeNext}`)
}


