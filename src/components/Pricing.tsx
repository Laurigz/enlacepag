import { Check } from "lucide-react"
import { PLANES, type ServicioOpcion } from "../data/content"
import { Section } from "./Section"

type Plan = (typeof PLANES)[keyof typeof PLANES]

function PlanCard({ plan, dark, onCotizar }: { plan: Plan; dark?: boolean; onCotizar: (s: ServicioOpcion) => void }) {
  const muted = dark ? "text-white/70" : "text-body"
  const line = dark ? "border-white/15" : "border-ink/10"

  return (
    <article
      className={`flex flex-col rounded-2xl p-7 sm:p-10 ${
        dark ? "on-dark bg-ink text-white" : "border border-ink/10 bg-white text-ink"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">{plan.title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            dark ? "bg-celeste text-ink" : "bg-celeste/45 text-ink"
          }`}
        >
          {plan.tag}
        </span>
      </div>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
        <span className="tnum text-5xl font-extrabold leading-none tracking-[-0.04em] sm:text-6xl">{plan.price}</span>
        <span className={`text-base font-semibold ${muted}`}>{plan.unit}</span>
      </p>
      <p className={`mt-3 text-[15px] ${muted}`}>{plan.note}</p>

      <div className={`mt-8 flex-1 border-t pt-8 ${line}`}>
        <p className={`text-xs font-bold uppercase tracking-[0.14em] ${dark ? "text-celeste" : "text-cobalt"}`}>Incluye</p>
        <ul className="mt-5 space-y-3">
          {plan.includes.map((item) => (
            <li key={item} className="flex gap-3 text-[15px]">
              <Check
                className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${dark ? "text-celeste" : "text-cobalt"}`}
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#contacto"
        onClick={() => onCotizar(plan.servicio)}
        className={`btn mt-10 w-full ${dark ? "btn-light" : "btn-primary"}`}
      >
        {plan.cta}
      </a>
    </article>
  )
}

export function Pricing({ onCotizar }: { onCotizar: (s: ServicioOpcion) => void }) {
  return (
    <Section
      id="inversion"
      number="04"
      label="Inversión"
      title="Precios claros en pesos argentinos"
      intro="Un pago único por la landing y, si lo necesitás, un mantenimiento mensual. Sin letras chicas."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <PlanCard plan={PLANES.landing} dark onCotizar={onCotizar} />
        <PlanCard plan={PLANES.mantenimiento} onCotizar={onCotizar} />
      </div>
      <p className="mt-6 text-sm text-body">
        Branding, posicionamiento en Google Maps y chatbot se cotizan aparte, según el alcance de cada proyecto.
      </p>
    </Section>
  )
}
