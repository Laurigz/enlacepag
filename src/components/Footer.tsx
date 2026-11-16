import { Instagram, MapPin } from "lucide-react"
import { NAV } from "../data/content"
import { GOOGLE_BUSINESS_URL, INSTAGRAM, ROUTES, isConfigured } from "../config/site"
import { openConsentSettings } from "../lib/consent"
import { track } from "../lib/analytics"
import { Container } from "./Container"
import { Logo } from "./Logo"

const linkClass = "text-[15px] text-ink transition-colors hover:text-cobalt"
const headingClass = "text-xs font-bold uppercase tracking-[0.14em] text-body"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <Container className="grid gap-12 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <a href="/#inicio" aria-label="EnlaceStudio, volver al inicio">
            <Logo />
          </a>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">
            Diseño y desarrollo de landing pages para industrias, comercios y estudios profesionales. Entrega en 2 a 4
            semanas.
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">Cobertura: toda Argentina</p>
        </div>

        <nav aria-label="Secciones" className="md:col-span-3">
          <p className={headingClass}>Secciones</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/#contacto" className={linkClass}>
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal" className="md:col-span-3">
          <p className={headingClass}>Legal</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={ROUTES.avisoLegal} className={linkClass}>
                Aviso legal
              </a>
            </li>
            <li>
              <a href={ROUTES.privacidad} className={linkClass}>
                Política de privacidad
              </a>
            </li>
            <li>
              <a href={ROUTES.cookies} className={linkClass}>
                Política de cookies
              </a>
            </li>
            <li>
              <button type="button" onClick={openConsentSettings} className={`${linkClass} text-left`}>
                Configurar cookies
              </button>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className={headingClass}>Redes</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("click_social", { platform: "instagram", link_location: "footer" })}
                className={`${linkClass} inline-flex items-center gap-2 font-semibold`}
              >
                <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
                {INSTAGRAM.handle}
                <span className="sr-only">(Instagram, se abre en una pestaña nueva)</span>
              </a>
            </li>
            {/* Se muestra solo cuando GOOGLE_BUSINESS_URL está completo en src/config/site.ts. */}
            {isConfigured(GOOGLE_BUSINESS_URL) && (
              <li>
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("click_social", { platform: "google_business", link_location: "footer" })}
                  className={`${linkClass} inline-flex items-center gap-2 font-semibold`}
                >
                  <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
                  Google Maps
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-t border-ink/10 py-6 text-sm text-body">
          © <span className="tnum">{year}</span> EnlaceStudio. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}
