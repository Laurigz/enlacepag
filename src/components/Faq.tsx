import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { FAQS } from "../data/content"
import { Section } from "./Section"
import { CtaRow } from "./CtaRow"

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <Section id="faq" number="06" label="FAQ" title="Preguntas frecuentes">
      <div className="lg:ml-[25%] lg:pl-2">
        <ul className="border-b border-ink/15">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            const buttonId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <li key={f.q} className="border-t border-ink/15">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold tracking-[-0.01em] text-ink transition-colors hover:text-cobalt sm:text-xl"
                  >
                    {f.q}
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-200 ease-out ${
                        isOpen ? "rotate-45 border-cobalt bg-cobalt text-white" : "border-ink/20 text-ink"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows,visibility] duration-[250ms] ease-out ${
                    isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 pr-12 text-base leading-relaxed text-body sm:text-lg">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <CtaRow text="¿Te quedó otra duda? Escribila en el formulario y te respondemos." />
      </div>
    </Section>
  )
}
