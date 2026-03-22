"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Dict = {
  loginPage: {
    title: string
    subtitle: string
    emailLabel: string
    emailPlaceholder: string
    submit: string
    submitting: string
    successMessage: string
    rateLimitError: string
    googleSubmit?: string
  }
}

export default function LoginPageClient({
  locale,
  dict,
}: {
  locale: string
  dict: Dict
}) {
  const supabase = createClient()
  const searchParams = useSearchParams()

  const initialEmail = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams]
  )

  const [email, setEmail] = useState(initialEmail)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/${locale}/auth/callback?next=/${locale}/minhas-explicacoes`,
      },
    })

    if (error) {
      if (error.message.toLowerCase().includes("rate limit")) {
        setError(dict.loginPage.rateLimitError)
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    setMessage(dict.loginPage.successMessage)
    setLoading(false)
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true)
    setError("")
    setMessage("")

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${locale}/auth/callback?next=/${locale}/minhas-explicacoes`,
      },
    })

    if (error) {
      setError(error.message)
      setGoogleLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{dict.loginPage.title}</h1>

      <p className="mt-3 text-neutral-600">
        {dict.loginPage.subtitle}
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full rounded-full border border-black/10 px-8 py-4 text-sm tracking-[0.12em] text-neutral-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading
            ? "A redirecionar..."
            : (dict.loginPage.googleSubmit ?? "Continuar com Google")}
        </button>

        <div className="my-6 text-center text-xs uppercase tracking-[0.2em] text-neutral-400">
          ou
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.loginPage.emailLabel}
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
              placeholder={dict.loginPage.emailPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-neutral-950 px-8 py-4 text-sm tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? dict.loginPage.submitting : dict.loginPage.submit}
          </button>

          {message && <p className="text-sm text-emerald-700">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </main>
  )
}


