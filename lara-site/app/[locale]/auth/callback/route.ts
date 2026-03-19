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
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}${safeNext}`)
}

