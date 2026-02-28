"use client";

import { useState } from "react";
import { Section } from "@/components/Section";

type Status = "idle" | "ok" | "error";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      siteType: form.get("siteType"),
      goal: form.get("goal"),
      deadline: form.get("deadline"),
      pagesOrProducts: form.get("pagesOrProducts"),
      budget: form.get("budget"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Erro ao enviar. Tenta novamente.");
        setLoading(false);
        return;
      }

      setStatus("ok");
      setLoading(false);
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Sem ligação. Tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      title="Vamos trabalhar juntas?"
      subtitle="Preenche o formulário. Após enviar, recebes um email para marcar a primeira chamada."
    >
      <form
        onSubmit={onSubmit}
        className="grid gap-6 rounded-2xl border border-black/10 p-8 sm:p-10"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Nome
            </label>
            <input
              name="name"
              required
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="O teu nome"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="email@exemplo.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Tipo de site
            </label>
            <select
              name="siteType"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione…
              </option>
              <option value="Site One Page">Site One Page</option>
              <option value="Site Multipágina">Site Multipágina</option>
              <option value="Loja Online Simples">Loja Online Simples</option>
              <option value="Loja Online Grande">Loja Online Grande</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Objetivo principal
            </label>
            <select
              name="goal"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione…
              </option>
              <option value="Gerar leads">Gerar leads</option>
              <option value="Agendamentos">Agendamentos</option>
              <option value="Vendas online">Vendas online</option>
              <option value="Presença institucional">Presença institucional</option>
              <option value="Rebranding / reposicionamento">
                Rebranding / reposicionamento
              </option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Prazo desejado
            </label>
            <input
              name="deadline"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="Ex: 2 meses"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Nº páginas / produtos
            </label>
            <input
              name="pagesOrProducts"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="Ex: 5 páginas ou 50 produtos"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Orçamento (opcional)
            </label>
            <input
              name="budget"
              className="mt-2 w-full border-b border-black/10 bg-transparent py-3 text-neutral-950 outline-none placeholder:text-neutral-400"
              placeholder="Ex: €3.000 – €5.000"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Conte-me sobre o projeto
          </label>
          <textarea
            name="message"
            required
            className="mt-2 w-full border border-black/10 bg-transparent p-4 text-neutral-950 outline-none placeholder:text-neutral-400"
            rows={6}
            placeholder="Descreve o teu projeto, referências, identidade visual existente…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mx-auto mt-4 w-full max-w-xs rounded-full bg-neutral-950 px-8 py-4 text-xs tracking-[0.2em] text-white hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "A ENVIAR..." : "ENVIAR PEDIDO"}
        </button>

        {/* feedback sem estragar o layout */}
        {status === "ok" && (
          <p className="mx-auto max-w-xl text-center text-sm text-neutral-700">
            ✅ Pedido enviado com sucesso. Vou responder-te em breve.
          </p>
        )}

        {status === "error" && (
          <p className="mx-auto max-w-xl text-center text-sm text-red-600">
            ❌ {errorMsg}
          </p>
        )}
      </form>
    </Section>
  );
}


