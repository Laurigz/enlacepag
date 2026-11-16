import { PRINCIPIOS } from "../data/content"
import { Section } from "./Section"

export function About() {
  return (
    <Section
      id="nosotros"
      number="05"
      label="Nosotros"
      title="Un socio técnico para profesionalizar tu presencia digital"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3" aria-hidden="true">
          <img src="/logo-enlace-mark.png" alt="" width={537} height={334} className="h-auto w-28 opacity-90 lg:w-32" />
        </div>
        <div className="lg:col-span-9">
          <p className="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[1.85rem]">
            EnlaceStudio diseña y desarrolla landing pages para empresas, comercios y profesionales de todo el país que
            quieren una presencia digital seria, sin procesos eternos ni costos ocultos.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            Cada proyecto arranca por entender el rubro y a quién le vende. Con eso definimos qué tiene que decir la
            página, qué tiene que hacer el visitante y cómo te llega la consulta.
          </p>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {PRINCIPIOS.map((p) => (
              <div key={p.title} className="bg-paper p-6 sm:p-8">
                <dt className="text-lg font-extrabold tracking-[-0.01em]">{p.title}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-body">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
