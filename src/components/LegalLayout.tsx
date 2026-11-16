import type { ReactNode } from "react"
import { LEGAL } from "../config/site"
import { usePageMeta } from "../lib/seo"
import { Container } from "./Container"
import { Footer } from "./Footer"
import { Header } from "./Header"

type Props = {
  title: string
  description: string
  path: string
  children: ReactNode
}

export function LegalLayout({ title, description, path, children }: Props) {
  usePageMeta({ title, description, path })

  return (
    <>
      <Header />
      <main id="contenido" className="pb-24 pt-12 sm:pt-20">
        <Container>
          <nav aria-label="Ruta de navegación" className="text-sm text-body">
            <a href="/" className="underline underline-offset-2 hover:text-cobalt">
              Inicio
            </a>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">{title}</span>
          </nav>
          <article className="legal mt-8 max-w-3xl">
            <h1 className="text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl">{title}</h1>
            <p className="!mt-5 text-sm text-body">Última actualización: {LEGAL.actualizado}</p>
            {children}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}

/** Muestra el dato o, si sigue pendiente, el marcador resaltado para detectarlo fácil. */
export function Dato({ value }: { value: string }) {
  return value.startsWith("[") ? <mark className="break-all rounded bg-celeste/50 px-1 text-ink">{value}</mark> : <>{value}</>
}
