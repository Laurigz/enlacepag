import { MessageCircle } from "lucide-react"
import { WHATSAPP_NUMBER, isConfigured } from "../config/site"
import { track } from "../lib/analytics"

/**
 * Canal secundario de consulta rápida. Queda oculto hasta completar
 * WHATSAPP_NUMBER en src/config/site.ts. El foco sigue en el formulario.
 */
export function WhatsAppLink() {
  if (!isConfigured(WHATSAPP_NUMBER)) return null
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "")
  const text = encodeURIComponent("Hola, quiero hacer una consulta sobre una landing page.")

  return (
    <p className="mt-8 text-[15px] text-white/75">
      ¿Preferís una consulta rápida?{" "}
      <a
        href={`https://wa.me/${digits}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("contact_whatsapp", { link_location: "contacto" })}
        className="inline-flex items-center gap-1.5 font-semibold text-white underline underline-offset-4"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Escribinos por WhatsApp
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    </p>
  )
}
