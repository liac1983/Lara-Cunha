"use client"

import { useState } from "react"

type Status = "idle" | "ok" | "error"

type TutoringFormProps = {
  dict: any
}

export function TutoringForm({ dict }: TutoringFormProps) {
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
      phone: form.get("phone"),
      topic: form.get("topic"),
      level: form.get("level"),
      goal: form.get("goal"),
      availability: form.get("availability"),
      message: form.get("message"),
    }

    try {
      const res = await fetch("/api/tutoring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data?.error ?? dict.tutoringForm.error)
        setLoading(false)
        return
      }

      setStatus("ok")
      setErrorMsg("")
      setLoading(false)
      e.currentTarget.reset()
    } catch {
      setStatus("error")
      setErrorMsg(dict.tutoringForm.error)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 rounded-2xl border border-black/10 bg-white p-8 sm:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.name}
          </label>
          <input
            name="name"
            required
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
            placeholder={dict.tutoringForm.placeholders.name}
            autoComplete="name"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.email}
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
            placeholder={dict.tutoringForm.placeholders.email}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.phone}
          </label>
          <input
            name="phone"
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
            placeholder={dict.tutoringForm.placeholders.phone}
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.topic}
          </label>
          <select
            name="topic"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="" disabled>
              {dict.tutoringForm.selectPlaceholder}
            </option>
            <option value="C">C</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value={dict.tutoringForm.options.topic.algorithms}>
              {dict.tutoringForm.options.topic.algorithms}
            </option>
            <option value={dict.tutoringForm.options.topic.other}>
              {dict.tutoringForm.options.topic.other}
            </option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.level}
          </label>
          <select
            name="level"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="" disabled>
              {dict.tutoringForm.selectPlaceholder}
            </option>
            <option value={dict.tutoringForm.options.level.secondary}>
              {dict.tutoringForm.options.level.secondary}
            </option>
            <option value={dict.tutoringForm.options.level.university}>
              {dict.tutoringForm.options.level.university}
            </option>
            <option value={dict.tutoringForm.options.level.beginner}>
              {dict.tutoringForm.options.level.beginner}
            </option>
            <option value={dict.tutoringForm.options.level.intermediate}>
              {dict.tutoringForm.options.level.intermediate}
            </option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.goal}
          </label>
          <select
            name="goal"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="" disabled>
              {dict.tutoringForm.selectPlaceholder}
            </option>
            <option value={dict.tutoringForm.options.goal.followCourse}>
              {dict.tutoringForm.options.goal.followCourse}
            </option>
            <option value={dict.tutoringForm.options.goal.examPrep}>
              {dict.tutoringForm.options.goal.examPrep}
            </option>
            <option value={dict.tutoringForm.options.goal.reviewBasics}>
              {dict.tutoringForm.options.goal.reviewBasics}
            </option>
            <option value={dict.tutoringForm.options.goal.solveExercises}>
              {dict.tutoringForm.options.goal.solveExercises}
            </option>
            <option value={dict.tutoringForm.options.goal.other}>
              {dict.tutoringForm.options.goal.other}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          {dict.tutoringForm.fields.availability}
        </label>
        <input
          name="availability"
          required
          className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
          placeholder={dict.tutoringForm.placeholders.availability}
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          {dict.tutoringForm.fields.message}
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full border border-black/10 bg-transparent p-4 text-neutral-950 outline-none placeholder:text-neutral-400"
          placeholder={dict.tutoringForm.placeholders.message}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mx-auto mt-4 w-full max-w-sm rounded-full bg-neutral-950 px-10 py-5 text-sm tracking-[0.22em] text-white transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? dict.tutoringForm.sending : dict.tutoringForm.button}
      </button>

      <p className="mx-auto -mt-1 text-center text-xs text-neutral-500">
        {dict.tutoringForm.responsePrefix}{" "}
        <span className="text-neutral-700">
          {dict.tutoringForm.responseTime}
        </span>.
      </p>

      {status === "ok" && (
        <p className="mx-auto max-w-xl text-center text-sm text-neutral-700">
          {dict.tutoringForm.success}
        </p>
      )}

      {status === "error" && (
        <p className="mx-auto max-w-xl text-center text-sm text-red-600">
          ❌ {errorMsg}
        </p>
      )}
    </form>
  )
}

