/**
 * Configuración central de EnlaceStudio.
 *
 * Todos los datos pendientes viven acá. Mientras un valor siga con su
 * marcador ([...] o G-XXXXXXXXXX), la función que depende de él queda
 * apagada: no se muestran enlaces rotos ni se cargan scripts.
 *
 * Este archivo también lo lee vite.config.ts para generar el canonical,
 * las etiquetas Open Graph, el JSON-LD, robots.txt y sitemap.xml.
 */

/** URL pública sin barra final. Ej.: https://enlacestudio.com.ar */
export const SITE_URL = "[URL_DOMINIO_VERCEL]"

/** ID de medición de Google Analytics 4. */
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"

/** URL que recibe un POST en JSON con cada consulta (Formspree, webhook, /api propia). */
export const FORM_ENDPOINT = "[ENDPOINT_FORMULARIO_O_WEBHOOK]"

/** WhatsApp en formato internacional, solo dígitos. Ej.: 5493411234567 */
export const WHATSAPP_NUMBER = "[NUMERO_WHATSAPP]"

/** Perfil de Google Business (Maps) cuando esté activo. */
export const GOOGLE_BUSINESS_URL = "[URL_PERFIL_GOOGLE_EMPRESA]"

export const INSTAGRAM = {
  handle: "@enlacepage",
  url: "https://www.instagram.com/enlacepage",
}

/** Datos del titular para las páginas legales. */
export const LEGAL = {
  titular: "[NOMBRE_TITULAR_O_RAZON_SOCIAL]",
  cuit: "[CUIT/CUIL]",
  domicilio: "[DOMICILIO_LEGAL_ARGENTINA]",
  email: "[EMAIL_CONTACTO]",
  jurisdiccion: "[CIUDAD_JURISDICCION]",
  registroAaip: "[NUMERO_REGISTRO_BASE_DE_DATOS_AAIP]",
  actualizado: "16 de noviembre de 2026",
}

/** true cuando el valor ya fue completado (no es un marcador). */
export function isConfigured(value: string): boolean {
  const v = value.trim()
  return v !== "" && !v.startsWith("[") && v !== "G-XXXXXXXXXX"
}

export const SITE_NAME = "EnlaceStudio"
export const DEFAULT_TITLE = "EnlaceStudio | Diseño y Desarrollo de Landing Pages en Argentina"
export const DEFAULT_DESCRIPTION =
  "Landing pages para industrias, comercios y estudios profesionales de toda Argentina. Pago único de $220.000 y entrega en 2 a 4 semanas."

export const ROUTES = {
  home: "/",
  avisoLegal: "/aviso-legal",
  privacidad: "/politica-de-privacidad",
  cookies: "/politica-de-cookies",
} as const
