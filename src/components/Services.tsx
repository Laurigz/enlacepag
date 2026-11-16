import { ArrowRight, Check } from "lucide-react"
import { RUBROS, SERVICIO_PRINCIPAL, SERVICIOS_COMPLEMENTARIOS, type ServicioOpcion } from "../data/content"
import { Section } from "./Section"

const SERVICIO_POR_NUMERO: Record<string, ServicioOpcion> = {
  "02": "Branding",
  "03": "Google Maps y SEO local",
  "04": "Chatbot y WhatsApp",
  "05": "Mantenimiento mensual",
}

export function Services({ onCotizar }: { onCotizar: (s: ServicioOpcion) => void }) {
  return (
    <Section
      id="servicios"
      number="01"
      label="Servicios"
      title="Una landing como base y todo lo que la hace funcionar"
      intro="El servicio principal es el diseño y desarrollo de tu landing. Los complementos suman visibilidad, atención automática y continuidad."
    >
      <article className="on-dark grid gap-10 rounded-2xl bg-ink p-7 text-white sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-celeste">
            <span className="tnum">{SERVICIO_PRINCIPAL.n}</span>
            <span aria-hidden="true" className="h-px w-8 bg-celeste/50" />
            Servicio principal
          </p>
          <h3 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]">
            {SERVICIO_PRINCIPAL.title}
          </h3>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">{SERVICIO_PRINCIPAL.promise}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Rubros">
            {RUBROS.map((r) => (
              <li key={r} className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/90">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-6">
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {SERVICIO_PRINCIPAL.benefits.map((b) => (
              <li key={b} className="flex gap-4 py-4 text-base sm:text-lg">
                <Check className="mt-1 h-5 w-5 shrink-0 text-celeste" strokeWidth={2.5} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => onCotizar("Landing page")} className="btn btn-light group self-start">
            Cotizar una landing
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </article>

      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2">
        {SERVICIOS_COMPLEMENTARIOS.map((s) => (
          <article key={s.n} className="flex flex-col bg-paper p-7 sm:p-10">
            <p className="tnum text-sm font-bold text-cobalt">{s.n}</p>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-body">{s.promise}</p>
            <ul className="mt-6 space-y-2.5">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] text-ink">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-cobalt" />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={() => onCotizar(SERVICIO_POR_NUMERO[s.n])}
              className="mt-8 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt"
            >
              Consultar <span className="sr-only">por {s.title.toLowerCase()}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
}
