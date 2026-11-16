import { LEGAL, ROUTES, isConfigured } from "../config/site"
import { Dato, LegalLayout } from "../components/LegalLayout"

/*
 * Política de privacidad adaptada a la Ley 25.326 de Protección de Datos
 * Personales (Argentina), su Decreto 1558/2001 y la normativa de la AAIP.
 * Revisar con un profesional antes del lanzamiento.
 */
export function PoliticaPrivacidad() {
  const email = isConfigured(LEGAL.email) ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : <Dato value={LEGAL.email} />

  return (
    <LegalLayout
      title="Política de privacidad"
      description="Cómo trata EnlaceStudio los datos del formulario de presupuesto, conforme a la Ley 25.326 de Protección de Datos Personales."
      path={ROUTES.privacidad}
    >
      <p>
        Esta política explica qué datos personales recolecta EnlaceStudio a través de este sitio, para qué los usa y
        cómo podés ejercer tus derechos, conforme a la Ley 25.326 de Protección de Datos Personales y su normativa
        complementaria.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          Responsable: <Dato value={LEGAL.titular} /> (EnlaceStudio)
        </li>
        <li>
          CUIT/CUIL: <Dato value={LEGAL.cuit} />
        </li>
        <li>
          Domicilio: <Dato value={LEGAL.domicilio} />
        </li>
        <li>Email para consultas sobre datos personales: {email}</li>
        <li>
          Registro de la base de datos ante la AAIP: <Dato value={LEGAL.registroAaip} />
        </li>
      </ul>

      <h2>2. Datos que recolectamos</h2>
      <p>Cuando completás el formulario de presupuesto, recolectamos:</p>
      <ul>
        <li>Nombre y apellido.</li>
        <li>Empresa (opcional) y rubro.</li>
        <li>Email.</li>
        <li>Teléfono o WhatsApp (opcional).</li>
        <li>Servicio de interés y el mensaje que escribas.</li>
      </ul>
      <p>
        No pedimos datos sensibles. Te pedimos que no los incluyas en el mensaje. Si aceptás las cookies analíticas,
        también se recolectan datos de navegación anónimos, como se explica en la{" "}
        <a href={ROUTES.cookies}>Política de cookies</a>.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tu consulta y enviarte una propuesta y un presupuesto.</li>
        <li>Coordinar el proyecto si decidís contratar nuestros servicios.</li>
      </ul>
      <p>
        No usamos tus datos para enviarte publicidad sin tu consentimiento, no los vendemos ni los cedemos a terceros
        con fines comerciales.
      </p>

      <h2>4. Consentimiento</h2>
      <p>
        Al enviar el formulario prestás tu consentimiento libre, expreso e informado para el tratamiento de tus datos
        con las finalidades indicadas, según el artículo 5 de la Ley 25.326. Brindar los datos es voluntario, pero sin
        los obligatorios no podemos responder tu consulta.
      </p>

      <h2>5. Con quién se comparten</h2>
      <p>Para funcionar, el sitio utiliza proveedores que pueden procesar datos por cuenta nuestra:</p>
      <ul>
        <li>Vercel Inc. (alojamiento del sitio).</li>
        <li>
          El servicio que recibe los formularios: <Dato value="[PROVEEDOR_DEL_FORMULARIO]" />.
        </li>
        <li>Google LLC (Google Analytics), solo si aceptás las cookies analíticas.</li>
      </ul>
      <p>
        Algunos de estos proveedores están fuera de Argentina, por lo que puede haber una transferencia internacional
        de datos. Solo trabajamos con proveedores que ofrecen niveles adecuados de protección, conforme al artículo 12
        de la Ley 25.326.
      </p>

      <h2>6. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos los datos mientras sean necesarios para responder tu consulta y, si contratás un servicio, durante
        la relación comercial y los plazos que exija la ley. Después los eliminamos.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Podés solicitar el acceso, la rectificación, la actualización o la supresión de tus datos, y retirar tu
        consentimiento, escribiendo a {email}.
      </p>
      <ul>
        <li>
          Acceso: es gratuito si se pide con intervalos no inferiores a seis meses, salvo interés legítimo (art. 14,
          inc. 3). Respondemos dentro de los 10 días corridos.
        </li>
        <li>Rectificación, actualización o supresión: respondemos dentro de los 5 días hábiles (art. 16).</li>
      </ul>

      <h2>8. Seguridad</h2>
      <p>
        El sitio funciona sobre HTTPS y aplicamos medidas técnicas y organizativas razonables para proteger tus datos
        contra pérdida, acceso no autorizado o alteración.
      </p>

      <h2>9. Menores de edad</h2>
      <p>El formulario está dirigido a personas mayores de 18 años que consultan por servicios profesionales.</p>

      <h2>10. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política. La versión vigente es siempre la publicada en esta página, con su fecha de
        última actualización.
      </p>

      <h2>11. Autoridad de control</h2>
      <p className="rounded-xl border border-ink/15 bg-white p-5 text-sm">
        La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene
        la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos
        por incumplimiento de las normas vigentes en materia de protección de datos personales.
      </p>
    </LegalLayout>
  )
}
