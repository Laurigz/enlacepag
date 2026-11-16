import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import { GOOGLE_BUSINESS_URL, INSTAGRAM, ROUTES, SITE_URL, isConfigured } from "./src/config/site"

const DESCRIPTION =
  "Diseño y desarrollo de landing pages para industrias, comercios y estudios profesionales de toda Argentina."

function jsonLd(url: string | null) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "EnlaceStudio",
    description: DESCRIPTION,
    areaServed: { "@type": "Country", name: "Argentina", identifier: "AR" },
    priceRange: "$$",
    currenciesAccepted: "ARS",
    knowsLanguage: "es-AR",
    sameAs: [INSTAGRAM.url, ...(isConfigured(GOOGLE_BUSINESS_URL) ? [GOOGLE_BUSINESS_URL] : [])],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de EnlaceStudio",
      itemListElement: [
        {
          "@type": "Offer",
          price: "220000",
          priceCurrency: "ARS",
          description: "Pago único. Entrega en 2 a 4 semanas.",
          itemOffered: {
            "@type": "Service",
            name: "Diseño y desarrollo de landing pages",
            description: "Landing pages a medida para industrias, comercios y estudios profesionales.",
          },
        },
        {
          "@type": "Offer",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "25000",
            priceCurrency: "ARS",
            unitCode: "MON",
            unitText: "mes",
          },
          description: "Contratación mínima de 3 meses.",
          itemOffered: {
            "@type": "Service",
            name: "Mantenimiento web mensual",
            description: "Soporte técnico, actualizaciones de contenido, monitoreo y ajustes menores.",
          },
        },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Restauración y diseño de branding" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Posicionamiento digital y SEO local en Google Maps" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integración de chatbot y WhatsApp" } },
      ],
    },
  }
  if (url) {
    data["@id"] = `${url}/#organizacion`
    data.url = `${url}/`
    data.logo = `${url}/icon-512.png`
    data.image = `${url}/og-enlacestudio.png`
  }
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

/**
 * SEO en build: canonical, og:url, imágenes absolutas, JSON-LD,
 * robots.txt, sitemap.xml y 404.html. Lee SITE_URL de src/config/site.ts.
 */
function seo(): Plugin {
  const url = isConfigured(SITE_URL) ? SITE_URL.replace(/\/+$/, "") : null
  return {
    name: "enlacestudio-seo",
    enforce: "post",
    transformIndexHtml(html) {
      const tags = [`<script type="application/ld+json">${jsonLd(url)}</script>`]
      if (url) {
        tags.unshift(
          `<link rel="canonical" href="${url}/" />`,
          `<meta property="og:url" content="${url}/" />`,
          `<meta property="og:image" content="${url}/og-enlacestudio.png" />`,
          `<meta name="twitter:image" content="${url}/og-enlacestudio.png" />`,
        )
      }
      return html.replace("</head>", `    ${tags.join("\n    ")}\n  </head>`)
    },
    generateBundle(_options, bundle) {
      if (!url) {
        this.warn("SITE_URL sin completar: se omiten canonical, og:url, og:image y el sitemap. Completalo en src/config/site.ts.")
      }

      const robots = ["User-agent: *", "Allow: /", ...(url ? ["", `Sitemap: ${url}/sitemap.xml`] : [])].join("\n")
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `${robots}\n` })

      if (url) {
        const today = new Date().toISOString().slice(0, 10)
        const pages: [string, string, string][] = [
          [ROUTES.home, "monthly", "1.0"],
          [ROUTES.avisoLegal, "yearly", "0.3"],
          [ROUTES.privacidad, "yearly", "0.3"],
          [ROUTES.cookies, "yearly", "0.3"],
        ]
        const items = pages
          .map(
            ([path, freq, prio]) =>
              `  <url>\n    <loc>${url}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`,
          )
          .join("\n")
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`,
        })
      }

      // 404.html: misma app, sin canonical y con noindex. Vercel la sirve con estado 404.
      const index = bundle["index.html"]
      if (index && index.type === "asset") {
        const html = String(index.source)
          .replace(/\s*<link rel="canonical"[^>]*>/, "")
          .replace(/\s*<meta property="og:url"[^>]*>/, "")
          .replace("</title>", '</title>\n    <meta name="robots" content="noindex, follow" />')
        this.emitFile({ type: "asset", fileName: "404.html", source: html })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), seo()],
})
