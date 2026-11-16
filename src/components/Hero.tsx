import { ArrowRight, Check } from "lucide-react"
import { RUBROS } from "../data/content"
import { Container } from "./Container"

const INCLUYE = [
  "Diseño a medida de tu marca",
  "Adaptada a celulares y tablets",
  "Formulario y WhatsApp conectados",
  "SEO base para aparecer en Google",
  "Publicación con tu dominio",
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-title" className="pb-8 pt-12 sm:pt-20 lg:pt-24">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow enter">Diseño y desarrollo web para toda Argentina</p>
            <h1
              id="inicio-title"
              className="enter mt-6 text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink [animation-delay:60ms] sm:text-6xl lg:text-[4.5rem]"
            >
              Landing pages que convierten visitas en <span className="text-cobalt">clientes</span>
            </h1>
            <p className="enter mt-7 max-w-xl text-lg leading-relaxed text-body [animation-delay:120ms] sm:text-xl">
              Para industrias, comercios y estudios profesionales. Sitios rápidos, modernos y conectados con tus
              canales de venta: formulario, WhatsApp y Google.
            </p>
            <div className="enter mt-9 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row">
              <a href="#contacto" className="btn btn-primary group">
                Solicitar presupuesto
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a href="#proyectos" className="btn btn-outline">
                Ver proyectos de muestra
              </a>
            </div>
          </div>

          <aside
            aria-label="Qué incluye una landing"
            className="enter rounded-2xl border border-ink/10 bg-white p-6 [animation-delay:240ms] sm:p-8 lg:col-span-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-body">Landing page completa</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
              <span className="tnum text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">$220.000</span>
              <span className="text-sm font-medium text-body">ARS · pago único</span>
            </p>
            <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6">
              {INCLUYE.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-ink">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-cobalt" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
              <div>
                <dt className="text-xs font-medium text-body">Entrega</dt>
                <dd className="tnum mt-1 font-bold">2 a 4 semanas</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-body">Cobertura</dt>
                <dd className="mt-1 font-bold">Toda Argentina</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 sm:mt-24 sm:flex-row sm:items-center sm:gap-10">
          <p className="text-sm font-semibold text-body">Trabajamos con</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {RUBROS.map((r) => (
              <li key={r} className="text-lg font-bold tracking-[-0.01em] text-ink sm:text-xl">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
