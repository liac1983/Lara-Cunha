import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getDictionary } from "@/lib/i18n"

type Props = {
  params: Promise<{ locale: string }>
}

type Booking = {
  id: string
  topic: string | null
  level: string | null
  status: string
  start_time: string
  end_time: string
  google_meet_link: string | null
}

function formatDateTime(value: string, locale: string) {
  return new Date(value).toLocaleString(locale === "pt" ? "pt-PT" : "en-GB", {
    timeZone: "Europe/Lisbon",
    dateStyle: "full",
    timeStyle: "short",
  })
}

function isPast(booking: Booking) {
  return new Date(booking.end_time).getTime() < Date.now()
}

function canJoinMeet(booking: Booking) {
  if (booking.status !== "confirmed") return false
  if (!booking.google_meet_link) return false

  const now = Date.now()
  const start = new Date(booking.start_time).getTime()
  const end = new Date(booking.end_time).getTime()
  const fifteenMinutesBefore = start - 15 * 60 * 1000

  return now >= fifteenMinutesBefore && now <= end
}

function BookingCard({
  booking,
  showActions,
  locale,
  dict,
}: {
  booking: Booking
  showActions: boolean
  locale: string
  dict: Awaited<ReturnType<typeof getDictionary>>
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-medium text-neutral-950">
            {booking.topic || dict.myLessonsPage.defaultTopic}
          </h3>

          {booking.level && (
            <p className="mt-1 text-sm text-neutral-600">{booking.level}</p>
          )}

          <p className="mt-3 text-sm text-neutral-700">
            {formatDateTime(booking.start_time, locale)}
          </p>

          <p className="mt-1 text-sm text-neutral-600">
            {dict.myLessonsPage.statusLabel}: {booking.status}
          </p>

          {canJoinMeet(booking) && booking.google_meet_link && (
            <p className="mt-3">
              <a
                href={booking.google_meet_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm text-white transition hover:bg-neutral-800"
              >
                {dict.myLessonsPage.joinMeet}
              </a>
            </p>
          )}
        </div>

        {showActions && booking.status === "confirmed" && (
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/minhas-explicacoes/${booking.id}/remarcar`}
              className="rounded-full border border-black/10 px-5 py-3 text-sm text-neutral-900 transition hover:border-neutral-900"
            >
              {dict.myLessonsPage.reschedule}
            </Link>

            <form action="/api/bookings/cancel" method="post">
              <input type="hidden" name="bookingId" value={booking.id} />
              <button className="rounded-full bg-red-600 px-5 py-3 text-sm text-white transition hover:bg-red-700">
                {dict.myLessonsPage.cancel}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function MinhasExplicacoesPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    redirect(`/${locale}/auth/login`)
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("id, topic, level, status, start_time, end_time, google_meet_link")
    .eq("student_email", user.email)
    .order("start_time", { ascending: true })

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-red-600">{dict.myLessonsPage.loadingError}</p>
      </main>
    )
  }

  const allBookings = (bookings ?? []) as Booking[]

  const upcomingBookings = allBookings.filter(
    (booking) => booking.status === "confirmed" && !isPast(booking)
  )

  const pastBookings = allBookings.filter(
    (booking) => booking.status === "confirmed" && isPast(booking)
  )

  const cancelledBookings = allBookings.filter(
    (booking) => booking.status === "cancelled"
  )

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-950">
            {dict.myLessonsPage.title}
          </h1>
          <p className="mt-2 text-neutral-600">{user.email}</p>
        </div>

        <form action={`/${locale}/auth/logout`} method="post">
          <button className="rounded-full border border-black/10 px-5 py-3 text-sm transition hover:border-neutral-900">
            {dict.myLessonsPage.logout}
          </button>
        </form>
      </div>

      <div className="mt-12 space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-neutral-950">
            {dict.myLessonsPage.upcomingTitle}
          </h2>

          <div className="mt-6 space-y-6">
            {upcomingBookings.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-neutral-700">
                  {dict.myLessonsPage.noUpcoming}
                </p>
              </div>
            ) : (
              upcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showActions={true}
                  locale={locale}
                  dict={dict}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-950">
            {dict.myLessonsPage.pastTitle}
          </h2>

          <div className="mt-6 space-y-6">
            {pastBookings.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-neutral-700">
                  {dict.myLessonsPage.noPast}
                </p>
              </div>
            ) : (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showActions={false}
                  locale={locale}
                  dict={dict}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-950">
            {dict.myLessonsPage.cancelledTitle}
          </h2>

          <div className="mt-6 space-y-6">
            {cancelledBookings.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-neutral-700">
                  {dict.myLessonsPage.noCancelled}
                </p>
              </div>
            ) : (
              cancelledBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  showActions={false}
                  locale={locale}
                  dict={dict}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

