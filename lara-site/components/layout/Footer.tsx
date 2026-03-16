type FooterProps = { dict: any }

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-black/5 bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm tracking-[0.22em]">LARA CUNHA</p>

          <div className="flex gap-8 text-xs tracking-[0.18em] text-white/80">
            <a
              className="hover:text-white"
              href="mailto:laracunha@email.com"
            >
              EMAIL
            </a>

            <a
              className="hover:text-white"
              href="https://linkedin.com/in/lara-cunha-1a2848229/"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>

            <a
              className="hover:text-white"
              href="https://www.instagram.com/larainesalves/"
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM
            </a>

            <a
              className="hover:text-white"
              href="https://github.com/liac1983"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/50">
          © {new Date().getFullYear()} — {dict.footer.credit}
        </p>
      </div>
    </footer>
  )
}

