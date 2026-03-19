"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import "react-day-picker/dist/style.css"

type SlotsByDate = Record<string, string[]>

function formatDateKey(date: Date) {
  return format(date, "yyyy-MM-dd")
}

export default function RemarcarForm({
  bookingId,
  currentStartTime,
}: {
  bookingId: string
  currentStartTime: string
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [loadingAvailability, setLoadingAvailability] = useState(true)
  const [availabilityError, setAvailabilityError] = useState("")
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [slotsByDate, setSlotsByDate] = useState<SlotsByDate>({})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")

  useEffect(() => {
    async function loadAvailability() {
      try {
        setLoadingAvailability(true)
        setAvailabilityError("")

        const res = await fetch(
          `/api/availability?excludeBookingId=${encodeURIComponent(bookingId)}`,
          { cache: "no-store" }
        )

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          setAvailabilityError(data?.error ?? "Erro ao carregar disponibilidade.")
          setLoadingAvailability(false)
          return
        }

        setSlotsByDate(data.slotsByDate ?? {})
        setLoadingAvailability(false)
      } catch {
        setAvailabilityError("Erro ao carregar disponibilidade.")
        setLoadingAvailability(false)
      }
    }

    loadAvailability()
  }, [bookingId])

  const enabledDates = useMemo(
    () =>
      Object.keys(slotsByDate).map((date) => {
        const [year, month, day] = date.split("-").map(Number)
        return new Date(year, month - 1, day, 12, 0, 0)
      }),
    [slotsByDate]
  )

  const selectedDateKey = selectedDate ? formatDateKey(selectedDate) : ""
  const availableTimes = selectedDateKey ? slotsByDate[selectedDateKey] ?? [] : []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccessMsg("")

    if (!selectedDate) {
      setError("Seleciona uma data.")
      setLoading(false)
      return
    }

    if (!selectedTime) {
      setError("Seleciona um horário.")
      setLoading(false)
      return
    }

    const start = new Date(`${selectedDateKey}T${selectedTime}:00`)
    const end = new Date(start.getTime() + 60 * 60 * 1000)

    const res = await fetch("/api/bookings/reschedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
        newStartTime: start.toISOString(),
        newEndTime: end.toISOString(),
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      setError(data?.error ?? "Erro ao remarcar.")
      setLoading(false)
      return
    }

    setSuccessMsg(
        data?.emailWarning
            ? `Explicação remarcada com sucesso. ${data.emailWarning}`
            : "Explicação remarcada com sucesso."
    )


    setSlotsByDate((prev) => {
      const updated = { ...prev }
      const currentTimes = updated[selectedDateKey] ?? []
      const nextTimes = currentTimes.filter((time) => time !== selectedTime)

      if (nextTimes.length > 0) {
        updated[selectedDateKey] = nextTimes
      } else {
        delete updated[selectedDateKey]
      }

      return updated
    })

    setLoading(false)

    setTimeout(() => {
      router.push("/minhas-explicacoes")
      router.refresh()
    }, 800)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-black/10 bg-white p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Nova data
          </label>

          <div className="mt-4 rounded-2xl border border-black/10 p-4">
            {loadingAvailability ? (
              <p className="text-sm text-neutral-500">
                A carregar disponibilidade...
              </p>
            ) : availabilityError ? (
              <p className="text-sm text-red-600">{availabilityError}</p>
            ) : (
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedTime("")
                }}
                locale={pt}
                showOutsideDays
                disabled={(date) => {
                  const key = formatDateKey(date)
                  return !slotsByDate[key]
                }}
                modifiers={{
                  available: enabledDates,
                }}
                modifiersClassNames={{
                  selected: "bg-neutral-900 text-white rounded-full",
                  today: "font-bold text-neutral-950",
                  available: "text-neutral-950",
                }}
              />
            )}
          </div>

          {selectedDate && (
            <p className="mt-3 text-sm text-neutral-600">
              Dia selecionado:{" "}
              <span className="font-medium text-neutral-900">
                {selectedDate.toLocaleDateString("pt-PT", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Novo horário
          </label>

          <div className="mt-4 rounded-2xl border border-black/10 p-4">
            {!selectedDate && (
              <p className="text-sm text-neutral-500">
                Primeiro escolhe um dia no calendário.
              </p>
            )}

            {selectedDate && availableTimes.length === 0 && (
              <p className="text-sm text-neutral-500">
                Não há horários disponíveis para esse dia.
              </p>
            )}

            {selectedDate && availableTimes.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {availableTimes.map((time) => {
                  const isSelected = selectedTime === time

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-full border px-4 py-3 text-sm transition ${
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-black/10 bg-white text-neutral-900 hover:border-neutral-900"
                      }`}
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <p className="mt-3 text-sm text-neutral-600">
            Marcação atual:{" "}
            {new Date(currentStartTime).toLocaleString("pt-PT", {
              timeZone: "Europe/Lisbon",
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>

          <p className="mt-2 text-sm text-neutral-600">
            Todas as sessões têm duração fixa de 1 hora.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || loadingAvailability}
        className="rounded-full bg-neutral-950 px-8 py-4 text-sm tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "A guardar..." : "Confirmar remarcação"}
      </button>

      {successMsg && <p className="text-sm text-emerald-700">{successMsg}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}


