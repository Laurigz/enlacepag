import { FORM_ENDPOINT, isConfigured } from "../config/site"

export type Lead = {
  nombre: string
  empresa: string
  rubro: string
  email: string
  telefono: string
  servicio: string
  mensaje: string
}

/**
 * Envía una consulta del formulario de presupuesto.
 *
 * Conectar: completar FORM_ENDPOINT en src/config/site.ts con una URL que
 * acepte un POST en JSON (Formspree, un webhook o una función en /api).
 *
 * Sin endpoint:
 * - en desarrollo simula un envío exitoso para probar la interfaz;
 * - en producción devuelve error, para no mostrar "enviado" cuando la
 *   consulta no llegó a ningún lado.
 */
export async function sendLead(lead: Lead): Promise<void> {
  if (!isConfigured(FORM_ENDPOINT)) {
    if (import.meta.env.DEV) {
      console.info("[EnlaceStudio] Envío simulado (falta FORM_ENDPOINT):", lead)
      await new Promise((resolve) => setTimeout(resolve, 700))
      return
    }
    throw new Error("FORM_ENDPOINT no está configurado")
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...lead, origen: "enlacestudio-web", enviadoEn: new Date().toISOString() }),
  })

  if (!response.ok) {
    throw new Error(`El endpoint respondió ${response.status}`)
  }
}
