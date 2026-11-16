import { GA_MEASUREMENT_ID, isConfigured } from "../config/site"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type Params = Record<string, string | number | boolean>

const enabled = isConfigured(GA_MEASUREMENT_ID)
const disableFlag = `ga-disable-${GA_MEASUREMENT_ID}`
let loaded = false
let allowed = false

function load() {
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag necesita el objeto `arguments`, no un array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_MEASUREMENT_ID)

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
  document.head.appendChild(script)
}

function clearGaCookies() {
  const host = window.location.hostname
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`]
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`
      })
    })
}

/** GA4 solo se carga si hay ID configurado y el usuario aceptó las cookies analíticas. */
export function applyAnalyticsConsent(accepted: boolean) {
  if (!enabled) return
  allowed = accepted
  ;(window as unknown as Record<string, unknown>)[disableFlag] = !accepted
  if (accepted && !loaded) load()
  if (!accepted) clearGaCookies()
}

/** Envía un evento a GA4. No hace nada sin consentimiento o sin ID. */
export function track(event: string, params: Params = {}) {
  if (!enabled || !loaded || !allowed || !window.gtag) return
  window.gtag("event", event, params)
}
