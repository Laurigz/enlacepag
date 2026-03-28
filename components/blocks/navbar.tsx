"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react"

const LOGO_SVG = (
  <img 
    className="h-12 w-auto object-contain mix-blend-multiply drop-shadow-sm" 
    src="/logo-enlace.png" 
    alt="Enlace Agencia Digital Logo" 
  />
)

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios", dropdown: true },
  { href: "portfolio.html", label: "Portafolio" },
  { href: "#precios", label: "Precios" },
  { href: "nosotros.html", label: "Nosotros" },
  { href: "blog.html", label: "Blog", dropdown: true },
  { href: "contacto.html", label: "Contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-[50] w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          {LOGO_SVG}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                )}
              >
                {link.label}
                {link.dropdown && <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />}
              </a>

              {/* Shifting Dropdown Logic (Simplified for now) */}
              {link.dropdown && activeDropdown === link.label && (
                <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                  {link.label === "Servicios" ? (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Identidad</p>
                        <a href="servicio-branding.html" className="block text-sm font-medium text-zinc-600 hover:text-primary">Branding</a>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Web & IA</p>
                        <a href="servicio-web.html" className="block text-sm font-medium text-zinc-600 hover:text-primary">Páginas Web</a>
                        <a href="servicio-ia.html" className="block text-sm font-medium text-zinc-600 hover:text-primary">IA Solutions</a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Últimas entradas</p>
                      <a href="blog.html" className="block text-sm font-medium text-zinc-600 hover:text-primary underline decoration-zinc-200 underline-offset-4">
                        El Futuro de la IA en 2024
                      </a>
                    </div>
                  )}
                  <a href="contacto.html" className="mt-4 flex items-center gap-2 border-t pt-4 text-xs font-bold text-primary group/more">
                    Ver más <ArrowRight className="h-3 w-3 transition-transform group-hover/more:translate-x-1" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://wa.me/+"
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-900"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-zinc-200 bg-white p-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/+"
              className="mt-4 rounded-xl bg-primary py-4 text-center text-base font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

