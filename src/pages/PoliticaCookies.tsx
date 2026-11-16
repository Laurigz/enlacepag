import { ROUTES } from "../config/site"
import { openConsentSettings } from "../lib/consent"
import { LegalLayout } from "../components/LegalLayout"

export function PoliticaCookies() {
  return (
    <LegalLayout
      title="Política de cookies"
      description="Qué cookies usa el sitio de EnlaceStudio, para qué sirven y cómo aceptarlas o rechazarlas."
      path={ROUTES.cookies}
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Son pequeños archivos que un sitio guarda en tu navegador para recordar información entre visitas. Algunas son
        necesarias para que el sitio funcione y otras sirven para medir su uso.
      </p>

      <h2>2. Qué usamos en este sitio</h2>
      <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-ink/15 bg-white">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="border-b border-ink/15 text-ink">
            <tr>
              <th scope="col" className="p-4 font-bold">Nombre</th>
              <th scope="col" className="p-4 font-bold">Tipo</th>
              <th scope="col" className="p-4 font-bold">Para qué sirve</th>
              <th scope="col" className="p-4 font-bold">Duración</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 text-body">
            <tr>
              <td className="p-4 font-medium text-ink">enlacestudio:consent</td>
              <td className="p-4">Necesaria (almacenamiento local)</td>
              <td className="p-4">Guarda si aceptaste o rechazaste las cookies analíticas.</td>
              <td className="p-4">Hasta que la borres</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-ink">_ga</td>
              <td className="p-4">Analítica (Google Analytics 4)</td>
              <td className="p-4">Distingue visitantes de forma anónima.</td>
              <td className="p-4">2 años</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-ink">_ga_&lt;ID&gt;</td>
              <td className="p-4">Analítica (Google Analytics 4)</td>
              <td className="p-4">Mantiene el estado de la sesión.</td>
              <td className="p-4">2 años</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Las cookies analíticas solo se instalan si las aceptás. Si las rechazás, Google Analytics no se carga. Las
        usamos para saber qué secciones se visitan, cuántas consultas llegan y qué demos se abren, y así mejorar el
        sitio. No las usamos para publicidad.
      </p>

      <h2>3. Servicios de terceros</h2>
      <p>
        La tipografía del sitio se carga desde Google Fonts. Al hacerlo, tu navegador se conecta con servidores de
        Google, que reciben tu dirección IP. Este servicio no instala cookies.
      </p>

      <h2>4. Cómo cambiar tu elección</h2>
      <p>Podés cambiar tu preferencia cuando quieras:</p>
      <p>
        <button type="button" onClick={openConsentSettings} className="btn btn-primary !mt-0">
          Configurar cookies
        </button>
      </p>
      <p>
        También podés borrar o bloquear las cookies desde la configuración de tu navegador. Para más información
        sobre el tratamiento de tus datos, leé la <a href={ROUTES.privacidad}>Política de privacidad</a>.
      </p>
    </LegalLayout>
  )
}
