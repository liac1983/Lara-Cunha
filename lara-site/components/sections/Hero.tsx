import Reveal from "@/components/Reveal";

export function Hero() {
  return (
    <section className="bg-[#F5f5f5]">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Reveal delay={0.05} y={14}>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
            Websites com identidade de marca
          </h1>
        </Reveal>

        <Reveal delay={0.18} y={10}>
          <p className="mt-6 text-lg text-neutral-600">
            Design requintado, performance e engenharia. <br />
            Não faço templates — cada projeto é único.
          </p>
        </Reveal>

        <div className="mt-10 flex justify-center gap-4">
          <Reveal delay={0.28} y={8}>
            <button className="rounded-full bg-black px-7 py-3 text-white">
              Marcar chamada
            </button>
          </Reveal>

          <Reveal delay={0.35} y={8}>
            <button className="group relative rounded-full border border-black px-7 py-3">
            <span className="relative">
                Ver serviços
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}