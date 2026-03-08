"use client"

import { useState } from "react"
import { Section } from "@/components/Section"

type Status = "idle" | "ok" | "error"

type ContactProps = {
  dict: any
}

const RequiredMark = () => <span className="ml-1 text-neutral-400">*</span>

export function Contact({ dict }: ContactProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")
    setErrorMsg("")

    const form = new FormData(e.currentTarget)

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      siteType: form.get("siteType"),
      goal: form.get("goal"),
      deadline: form.get("deadline"),
      pagesOrProducts: form.get("pagesOrProducts"),
      budget: form.get("budget"),
      message: form.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data?.error ?? dict.contact.error)
        setLoading(false)
        return
      }

      setStatus("ok")
      setLoading(false)
      e.currentTarget.reset()
    } catch {
      setStatus("error")
      setErrorMsg(dict.contact.error)
      setLoading(false)
    }
  }

  return (
    <Section
      id="contacto"
      eyebrow={dict.contact.eyebrow}
      title={dict.contact.title}
      subtitle={dict.contact.subtitle}
    >
      <form
        onSubmit={onSubmit}
        className="grid gap-6 rounded-2xl border border-black/10 p-8 sm:p-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.name} <RequiredMark />
            </label>
            <input
              name="name"
              required
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/40 required:invalid:border-black/30"
              placeholder={dict.contact.placeholders.name}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.email} <RequiredMark />
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/40 required:invalid:border-black/30"
              placeholder={dict.contact.placeholders.email}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.siteType}
            </label>
            <select
              name="siteType"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                {dict.contact.selectPlaceholder}
              </option>
              <option value={dict.contact.options.siteType.onePage}>
                {dict.contact.options.siteType.onePage}
              </option>
              <option value={dict.contact.options.siteType.multiPage}>
                {dict.contact.options.siteType.multiPage}
              </option>
              <option value={dict.contact.options.siteType.simpleStore}>
                {dict.contact.options.siteType.simpleStore}
              </option>
              <option value={dict.contact.options.siteType.largeStore}>
                {dict.contact.options.siteType.largeStore}
              </option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.goal}
            </label>
            <select
              name="goal"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                {dict.contact.selectPlaceholder}
              </option>
              <option value={dict.contact.options.goal.leads}>
                {dict.contact.options.goal.leads}
              </option>
              <option value={dict.contact.options.goal.bookings}>
                {dict.contact.options.goal.bookings}
              </option>
              <option value={dict.contact.options.goal.sales}>
                {dict.contact.options.goal.sales}
              </option>
              <option value={dict.contact.options.goal.institutional}>
                {dict.contact.options.goal.institutional}
              </option>
              <option value={dict.contact.options.goal.rebranding}>
                {dict.contact.options.goal.rebranding}
              </option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.deadline}
            </label>
            <input
              name="deadline"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/40 required:invalid:border-black/30"
              placeholder={dict.contact.placeholders.deadline}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.pages}
            </label>
            <input
              name="pagesOrProducts"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/40 required:invalid:border-black/30"
              placeholder={dict.contact.placeholders.pages}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dict.contact.fields.budget}
            </label>
            <input
              name="budget"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/40 required:invalid:border-black/30"
              placeholder={dict.contact.placeholders.budget}
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.contact.fields.message} <RequiredMark />
          </label>
          <textarea
            name="message"
            required
            className="mt-2 w-full border border-black/10 bg-transparent p-4 text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/30 required:invalid:border-black/30"
            rows={6}
            placeholder={dict.contact.placeholders.message}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mx-auto mt-4 w-full max-w-sm rounded-full bg-neutral-950 px-10 py-5 text-sm tracking-[0.22em] text-white shadow-sm transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? dict.contact.sending : dict.contact.button}
        </button>

        <p className="mx-auto -mt-1 text-center text-xs text-neutral-500">
          {dict.contact.responsePrefix}{" "}
          <span className="text-neutral-700">{dict.contact.responseTime}</span>.
        </p>

        {status === "ok" && (
          <p className="mx-auto max-w-xl text-center text-sm text-neutral-700">
            {dict.contact.success}
          </p>
        )}

        {status === "error" && (
          <p className="mx-auto max-w-xl text-center text-sm text-red-600">
            ❌ {errorMsg}
          </p>
        )}
      </form>
    </Section>
  )
}

