import { ROUTES } from "../config/site"
import { setConsent, useConsent } from "../lib/consent"

export function CookieBanner() {
  const { bannerOpen } = useConsent()
  if (!bannerOpen) return null

  return (
    <div
      role="region"
      aria-label="Preferencias de cookies"
      className="on-dark enter fixed inset-x-3 bottom-3 z-[70] rounded-2xl bg-ink p-5 text-white shadow-[0_12px_40px_-12px_rgba(4,42,79,0.55)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-[26rem] sm:p-6"
    >
      <p className="text-sm font-bold">Cookies</p>
      <p className="mt-2 text-sm leading-relaxed text-white/80">
        Usamos cookies analíticas para saber cómo se usa el sitio y mejorarlo. Solo se activan si las aceptás.{" "}
        <a href={ROUTES.cookies} className="font-semibold text-white underline underline-offset-2">
          Política de cookies
        </a>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setConsent(false)}
          className="btn min-h-[44px] border border-white/30 px-4 text-sm text-white hover:border-white/70"
        >
          Rechazar
        </button>
        <button type="button" onClick={() => setConsent(true)} className="btn btn-light min-h-[44px] px-4 text-sm">
          Aceptar
        </button>
      </div>
    </div>
  )
}
