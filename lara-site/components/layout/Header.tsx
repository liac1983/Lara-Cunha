export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm tracking-[0.22em] text-neutral-950">
          LARA CUNHA
        </a>

        <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
          <a className="hover:text-neutral-950" href="#servicos">Serviços</a>
          <a className="hover:text-neutral-950" href="#processo">Processo</a>
          <a className="hover:text-neutral-950" href="#portfolio">Portfolio</a>
          <a className="hover:text-neutral-950" href="#faq">FAQ</a>
          <a className="hover:text-neutral-950" href="#contacto">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="rounded-full border border-neutral-900 px-4 py-2 text-xs tracking-[0.18em] text-neutral-950 hover:bg-neutral-950 hover:text-white"
        >
          MARCAR CHAMADA
        </a>
      </div>
    </header>
  )
}

