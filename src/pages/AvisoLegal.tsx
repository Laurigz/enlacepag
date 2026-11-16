import { INSTAGRAM, LEGAL, ROUTES } from "../config/site"
import { Dato, LegalLayout } from "../components/LegalLayout"

/*
 * Plantilla de aviso legal para un estudio de servicios digitales en Argentina.
 * Completar los datos en src/config/site.ts (LEGAL) y revisar con un profesional
 * antes del lanzamiento.
 */
export function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal"
      description="Datos del titular, condiciones de uso, propiedad intelectual y legislación aplicable del sitio de EnlaceStudio."
      path={ROUTES.avisoLegal}
    >
      <h2>1. Titular del sitio</h2>
      <p>Este sitio web pertenece a EnlaceStudio. Los datos de su titular son:</p>
      <ul>
        <li>
          Titular o razón social: <Dato value={LEGAL.titular} />
        </li>
        <li>
          CUIT/CUIL: <Dato value={LEGAL.cuit} />
        </li>
        <li>
          Domicilio legal: <Dato value={LEGAL.domicilio} />
        </li>
        <li>
          Email de contacto: <Dato value={LEGAL.email} />
        </li>
        <li>
          Instagram:{" "}
          <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
            {INSTAGRAM.handle}
          </a>
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        EnlaceStudio presta servicios de diseño y desarrollo de landing pages, branding, posicionamiento digital y en
        Google Maps, integración de chatbots y WhatsApp, y mantenimiento web, para empresas, comercios y profesionales
        de toda la República Argentina. Este sitio informa sobre esos servicios y permite solicitar un presupuesto.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        Al navegar este sitio aceptás usarlo de buena fe y conforme a la ley. No está permitido usarlo para enviar
        información falsa, contenido ilícito o comunicaciones no solicitadas, ni para intentar dañar su funcionamiento.
      </p>

      <h2>4. Precios y presupuestos</h2>
      <p>
        Los precios publicados están expresados en pesos argentinos (ARS) y tienen carácter informativo. La propuesta
        final, con su alcance, precio, plazos y forma de pago, se detalla en el presupuesto escrito que se envía a cada
        cliente. Ante cualquier diferencia, prevalece lo acordado en ese presupuesto.
      </p>
      <p>
        El precio de la landing page incluye la vinculación del dominio y del hosting, no el costo de esos servicios,
        que contrata y abona el cliente a su proveedor.
      </p>

      <h2>5. Proyectos de muestra</h2>
      <p>
        Los proyectos que se muestran en el sitio son demos funcionales creadas por EnlaceStudio para ilustrar su
        trabajo. No corresponden a clientes reales ni representan resultados comerciales obtenidos. Los nombres, datos
        y cifras que aparecen dentro de esas demos son ficticios.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        Los textos, diseños, logotipos, código e imágenes de este sitio son propiedad de EnlaceStudio o se usan con
        autorización, y están protegidos por la Ley 11.723 de Propiedad Intelectual. No pueden reproducirse ni
        distribuirse sin permiso escrito.
      </p>

      <h2>7. Enlaces a sitios de terceros</h2>
      <p>
        El sitio incluye enlaces a sitios externos, como Instagram o las demos alojadas en otros servidores.
        EnlaceStudio no controla esos sitios ni es responsable por su contenido o sus políticas de privacidad.
      </p>

      <h2>8. Responsabilidad</h2>
      <p>
        EnlaceStudio procura que la información del sitio sea correcta y esté actualizada, pero no garantiza la
        ausencia de errores ni la disponibilidad permanente del servicio, y no responde por daños derivados de
        interrupciones técnicas ajenas a su control.
      </p>

      <h2>9. Datos personales y cookies</h2>
      <p>
        El tratamiento de los datos que ingresás en el formulario se rige por la{" "}
        <a href={ROUTES.privacidad}>Política de privacidad</a>, y el uso de cookies por la{" "}
        <a href={ROUTES.cookies}>Política de cookies</a>.
      </p>

      <h2>10. Ley aplicable y jurisdicción</h2>
      <p>
        Este aviso se rige por las leyes de la República Argentina. Ante cualquier controversia, las partes se someten
        a los tribunales ordinarios de <Dato value={LEGAL.jurisdiccion} />, sin perjuicio de los derechos que la Ley
        24.240 de Defensa del Consumidor otorga a quienes revistan la calidad de consumidores.
      </p>
    </LegalLayout>
  )
}
