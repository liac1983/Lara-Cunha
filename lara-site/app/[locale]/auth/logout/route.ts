import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

type RouteContext = {
  params: Promise<{ locale: string }>
}

export async function POST(request: Request, { params }: RouteContext) {
  const { locale } = await params
  const supabase = await createClient()

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL(`/${locale}`, request.url), {
    status: 303,
  })
}

