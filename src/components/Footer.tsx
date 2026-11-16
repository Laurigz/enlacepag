import { Instagram } from "lucide-react"
import { INSTAGRAM, NAV } from "../data/content"
import { Container } from "./Container"
import { Logo } from "./Logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <Container className="grid gap-12 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <a href="#inicio" aria-label="EnlaceStudio, volver al inicio">
            <Logo />
          </a>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">
            Diseño y desarrollo de landing pages para industrias, comercios y estudios profesionales.
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">Cobertura: toda Argentina</p>
        </div>

        <nav aria-label="Secciones" className="md:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-body">Secciones</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-[15px] text-ink transition-colors hover:text-cobalt">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="text-[15px] text-ink transition-colors hover:text-cobalt">
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-body">Redes</p>
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-cobalt"
          >
            <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
            {INSTAGRAM.handle}
            <span className="sr-only">(Instagram, se abre en una pestaña nueva)</span>
          </a>
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
