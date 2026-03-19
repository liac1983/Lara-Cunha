import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getDictionary } from "@/lib/i18n"
import RemarcarForm from "./remarcar-form"

type Props = {
  params: Promise<{ locale: string; bookingId: string }>
}

export default async function RemarcarPage({ params }: Props) {
  const { locale, bookingId } = await params
  const dict = await getDictionary(locale)
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    redirect(`/${locale}/auth/login`)
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .eq("student_email", user.email)
    .single()

  if (!booking) notFound()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">
        {dict.myLessonsPage.reschedulePageTitle}
      </h1>

      <p className="mt-3 text-neutral-600">
        {dict.myLessonsPage.currentLabel}:{" "}
        {new Date(booking.start_time).toLocaleString(
          locale === "pt" ? "pt-PT" : "en-GB",
          {
            timeZone: "Europe/Lisbon",
            dateStyle: "full",
            timeStyle: "short",
          }
        )}
      </p>

      <div className="mt-10">
        <RemarcarForm
          bookingId={booking.id}
          currentStartTime={booking.start_time}
        />
      </div>
    </main>
  )
}

