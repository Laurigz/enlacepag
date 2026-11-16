import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV } from "../data/content"
import { Container } from "./Container"
import { Logo } from "./Logo"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-ink/10 bg-paper/95 backdrop-blur-md" : "border-transparent bg-paper"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#inicio" aria-label="EnlaceStudio, volver al inicio" className="shrink-0" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-body transition-colors duration-200 hover:text-ink"
                >
                  <span className="tnum mr-1 text-cobalt">{item.n}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contacto" className="btn btn-primary hidden min-h-[42px] px-5 text-sm sm:inline-flex">
            Cotizar proyecto
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="menu-movil" className="border-t border-ink/10 lg:hidden">
          <Container className="pb-5 pt-2">
            <nav aria-label="Principal (móvil)">
              <ul className="divide-y divide-ink/10">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} onClick={close} className="flex py-3.5 text-base font-semibold text-ink">
                      <span className="tnum mr-3 w-6 text-cobalt">{item.n}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href="#contacto" onClick={close} className="btn btn-primary mt-4 w-full">
              Cotizar proyecto
            </a>
          </Container>
        </div>
      )}
    </header>
  )
}
