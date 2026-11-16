import { ArrowRight } from "lucide-react"
import { usePageMeta } from "../lib/seo"
import { Container } from "../components/Container"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export function NotFound({ path }: { path: string }) {
  usePageMeta({ title: "Página no encontrada", path, noindex: true })

  return (
    <>
      <Header />
      <main id="contenido" className="flex min-h-[70vh] items-center py-24">
        <Container>
          <p className="eyebrow tnum">Error 404</p>
          <h1 className="mt-6 max-w-[16ch] text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-6xl">
            Esta página no existe o fue movida
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Revisá la dirección o volvé al inicio para ver nuestros servicios, proyectos de muestra y precios.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/" className="btn btn-primary group">
              Volver al inicio
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="/#contacto" className="btn btn-outline">
              Solicitar presupuesto
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
