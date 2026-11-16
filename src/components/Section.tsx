import type { ReactNode } from "react"
import { Container } from "./Container"

type Props = {
  id: string
  number: string
  label: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, number, label, title, intro, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-20 sm:py-28 ${className}`}>
      <Container>
        <div className="border-t border-ink/15 pt-8 sm:pt-10">
          <div className="mb-12 grid gap-5 sm:mb-16 lg:grid-cols-12 lg:gap-8">
            <p className="eyebrow tnum lg:col-span-3 lg:pt-3">
              {number} <span aria-hidden="true">—</span> {label}
            </p>
            <div className="lg:col-span-9">
              <h2
                id={`${id}-title`}
                className="max-w-[20ch] text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.5rem]"
              >
                {title}
              </h2>
              {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{intro}</p>}
            </div>
          </div>
          {children}
        </div>
      </Container>
    </section>
  )
}
