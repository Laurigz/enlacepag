import { useEffect } from "react"
import { ROUTES } from "./config/site"
import { applyAnalyticsConsent } from "./lib/analytics"
import { useConsent } from "./lib/consent"
import { CookieBanner } from "./components/CookieBanner"
import { Home } from "./pages/Home"
import { AvisoLegal } from "./pages/AvisoLegal"
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad"
import { PoliticaCookies } from "./pages/PoliticaCookies"
import { NotFound } from "./pages/NotFound"

const PAGES: Record<string, () => JSX.Element> = {
  [ROUTES.home]: Home,
  [ROUTES.avisoLegal]: AvisoLegal,
  [ROUTES.privacidad]: PoliticaPrivacidad,
  [ROUTES.cookies]: PoliticaCookies,
}

function currentPath() {
  const p = window.location.pathname.replace(/\/+$/, "").replace(/\.html$/, "")
  return p === "" || p === "/index" ? "/" : p
}

export default function App() {
  const path = currentPath()
  const Page = PAGES[path]
  const { consent } = useConsent()

  // GA4 se activa o desactiva según la elección del banner.
  useEffect(() => {
    applyAnalyticsConsent(consent?.analytics === true)
  }, [consent])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[80] rounded-lg bg-cobalt px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      {Page ? <Page /> : <NotFound path={path} />}
      <CookieBanner />
    </>
  )
}
