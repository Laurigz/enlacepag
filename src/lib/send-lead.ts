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
 * Envía una consulta del formulario.
 *
 * Para conectarlo, definí VITE_FORM_ENDPOINT en Vercel
 * (Project > Settings > Environment Variables). El endpoint recibe
 * un POST con el lead en JSON. Sirve un servicio tipo Formspree
 * o una función propia en /api.
 *
 * Sin endpoint:
 * - en desarrollo simula un envío exitoso, para probar la interfaz;
 * - en producción devuelve error, para no mostrar "enviado"
 *   cuando la consulta no llegó a ningún lado.
 */
export async function sendLead(lead: Lead): Promise<void> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info("[EnlaceStudio] Envío simulado (falta VITE_FORM_ENDPOINT):", lead)
      await new Promise((resolve) => setTimeout(resolve, 700))
      return
    }
    throw new Error("VITE_FORM_ENDPOINT no está configurado")
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(lead),
  })

  if (!response.ok) {
    throw new Error(`El endpoint respondió ${response.status}`)
  }
}
