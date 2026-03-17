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
  const [successData, setSuccessData] = useState<null | {
    startTime: string
    endTime: string
    meetLink?: string | null
  }>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")
    setErrorMsg("")
    setSuccessData(null)

    const form = new FormData(e.currentTarget)

    const selectedDate = String(form.get("selectedDate") || "")
    const selectedTime = String(form.get("selectedTime") || "")
    const duration = Number(form.get("duration") || 60)

    const start = new Date(`${selectedDate}T${selectedTime}:00`)
    const end = new Date(start.getTime() + duration * 60 * 1000)

    const payload = {
      studentName: String(form.get("name") || ""),
      studentEmail: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      topic: String(form.get("topic") || ""),
      level: String(form.get("level") || ""),
      goal: String(form.get("goal") || ""),
      notes: String(form.get("message") || ""),
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      timezone: "Europe/Lisbon",
    }

    try {
      const res = await fetch("/api/bookings/create", {
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
      setSuccessData({
        startTime: data.startTime,
        endTime: data.endTime,
        meetLink: data.meetLink,
      })
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

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.date}
          </label>
          <select
            name="selectedDate"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="" disabled>
              Seleciona uma data
            </option>
            <option value="2026-03-17">Terça, 17 Março</option>
            <option value="2026-03-19">Quinta, 19 Março</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.time}
          </label>
          <select
            name="selectedTime"
            required
            defaultValue=""
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="" disabled>
              {dict.tutoringForm.fields.selecttime}
            </option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {dict.tutoringForm.fields.duration}
          </label>
          <select
            name="duration"
            required
            defaultValue="60"
            className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
          >
            <option value="60">60 min</option>
            <option value="90">90 min</option>
          </select>
        </div>
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

      {status === "ok" && successData && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-neutral-800">
          <h2 className="text-xl font-semibold text-emerald-900">
            Sessão marcada com sucesso
          </h2>

          <p className="mt-2 text-sm text-emerald-800">
            Receberás um email de confirmação em breve.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <strong>Data:</strong>{" "}
              {new Date(successData.startTime).toLocaleString("pt-PT", {
                timeZone: "Europe/Lisbon",
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>

            <p>
              <strong>Duração:</strong>{" "}
              {Math.round(
                (new Date(successData.endTime).getTime() -
                  new Date(successData.startTime).getTime()) /
                  60000
              )}{" "}
              min
            </p>

            {successData.meetLink && (
              <p>
                <strong>Google Meet:</strong>{" "}
                <a
                  href={successData.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  Entrar na sessão
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mx-auto max-w-xl text-center text-sm text-red-600">
          {errorMsg}
        </p>
      )}
    </form>
  )
}

