import { PASOS } from "../data/content"
import { CtaRow } from "./CtaRow"
import { Section } from "./Section"

export function Process() {
  return (
    <Section
      id="proceso"
      number="03"
      label="Proceso"
      title="De la primera charla a la web publicada en cuatro pasos"
    >
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {PASOS.map((p) => (
          <li key={p.n} className="border-t-2 border-ink pt-6">
            <p className="tnum text-5xl font-extrabold tracking-[-0.04em] text-cobalt" aria-hidden="true">
              {p.n}
            </p>
            <h3 className="mt-6 text-xl font-extrabold tracking-[-0.02em]">
              <span className="sr-only">Paso {p.n}: </span>
              {p.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-body">{p.text}</p>
          </li>
        ))}
      </ol>
      <CtaRow text="¿Tenés un proyecto en mente? El primer paso es contarnos qué necesitás." />
    </Section>
  )
}
