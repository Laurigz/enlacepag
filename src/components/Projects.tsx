import { ArrowUpRight } from "lucide-react"
import { PROYECTOS } from "../data/content"
import { Section } from "./Section"

export function Projects() {
  return (
    <Section
      id="proyectos"
      number="02"
      label="Proyectos"
      title="Proyectos de muestra"
      intro="Demos funcionales que armamos para mostrar cómo resolvemos una landing según el rubro. No son clientes ni casos con resultados: son ejemplos navegables de nuestro trabajo."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROYECTOS.map((p) => (
          <li key={p.name}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/30">
              <div className="flex h-9 items-center gap-1.5 border-b border-ink/10 bg-paper-dim px-3.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="ml-2 truncate text-[11px] font-medium text-body">{p.domain}</span>
              </div>
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={`Captura de la portada de ${p.name}`}
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-ink/10 p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-celeste/45 px-2.5 py-1 text-xs font-semibold text-ink">
                    Proyecto de muestra
                  </span>
                  <span className="text-xs font-medium text-body">{p.rubro}</span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{p.description}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-cobalt after:absolute after:inset-0 after:content-['']"
                >
                  Ver demo<span className="sr-only"> de {p.name} (se abre en una pestaña nueva)</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
