import { ArrowRight } from "lucide-react"

/** Cierre de sección que lleva al formulario de presupuesto. */
export function CtaRow({ text }: { text: string }) {
  return (
    <div className="mt-14 flex flex-col gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-lg font-semibold text-ink">{text}</p>
      <a href="#contacto" className="btn btn-primary group shrink-0 self-start sm:self-auto">
        Solicitar presupuesto
        <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </div>
  )
}
