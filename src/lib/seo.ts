import { useEffect } from "react"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL, isConfigured } from "../config/site"

type PageMeta = {
  title?: string
  description?: string
  path: string
  noindex?: boolean
}

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Ajusta título, descripción, canonical y robots de cada ruta. */
export function usePageMeta({ title, description, path, noindex }: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | EnlaceStudio` : DEFAULT_TITLE
    const desc = description ?? DEFAULT_DESCRIPTION
    document.title = fullTitle
    setMeta('meta[name="description"]', "name", "description", desc)
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle)
    setMeta('meta[property="og:description"]', "property", "og:description", desc)
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle)
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", desc)

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) setMeta('meta[name="robots"]', "name", "robots", "noindex, follow")
    else robots?.remove()

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (isConfigured(SITE_URL) && !noindex) {
      const href = `${SITE_URL.replace(/\/$/, "")}${path === "/" ? "/" : path}`
      if (canonical) canonical.href = href
      else {
        const link = document.createElement("link")
        link.rel = "canonical"
        link.href = href
        document.head.appendChild(link)
      }
      setMeta('meta[property="og:url"]', "property", "og:url", href)
    } else {
      canonical?.remove()
    }
  }, [title, description, path, noindex])
}
