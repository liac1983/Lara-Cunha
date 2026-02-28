export function Hero() {
  return (
    <section id="top" className="w-full bg-[#f6f1ea] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-light tracking-tight text-neutral-950 sm:text-6xl">
            Websites com identidade de marca
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Design requintado, performance e engenharia.
            <br />
            Não faço templates — cada projeto é único.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="w-full rounded-full bg-neutral-950 px-8 py-4 text-center text-xs tracking-[0.2em] text-white hover:bg-neutral-900 sm:w-auto"
            >
              MARCAR CHAMADA
            </a>

            <a
              href="#servicos"
              className="w-full rounded-full border border-neutral-950 px-8 py-4 text-center text-xs tracking-[0.2em] text-neutral-950 hover:bg-white/60 sm:w-auto"
            >
              VER SERVIÇOS
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-black/10 pt-10 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-neutral-950">Identidade</p>
              <p className="mt-2 text-sm text-neutral-600">Design de marca único</p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-950">Detalhe</p>
              <p className="mt-2 text-sm text-neutral-600">Estética requintada</p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-950">Engenharia</p>
              <p className="mt-2 text-sm text-neutral-600">Performance sólida</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
