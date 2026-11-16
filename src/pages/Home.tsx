import { useState } from "react"
import { SERVICIOS_OPCIONES, type ServicioOpcion } from "../data/content"
import { usePageMeta } from "../lib/seo"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Services } from "../components/Services"
import { Projects } from "../components/Projects"
import { Process } from "../components/Process"
import { Pricing } from "../components/Pricing"
import { About } from "../components/About"
import { Faq } from "../components/Faq"
import { Contact } from "../components/Contact"
import { Footer } from "../components/Footer"

export function Home() {
  usePageMeta({ path: "/" })
  // El servicio elegido en Servicios o Inversión llega preseleccionado al formulario.
  const [servicio, setServicio] = useState<ServicioOpcion>(SERVICIOS_OPCIONES[0])

  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Services onCotizar={setServicio} />
        <Projects />
        <Process />
        <Pricing onCotizar={setServicio} />
        <About />
        <Faq />
        <Contact servicio={servicio} onServicioChange={setServicio} />
      </main>
      <Footer />
    </>
  )
}
