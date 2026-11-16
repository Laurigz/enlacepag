# EnlaceStudio

Sitio de EnlaceStudio. React + Vite + TypeScript + Tailwind CSS. Deploy en Vercel.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # chequeo de tipos + build en dist/
```

## Antes del lanzamiento: datos a completar

Todo está en `src/config/site.ts`. Mientras un valor tenga su marcador, la función queda apagada
(no se muestran enlaces rotos ni se cargan scripts).

| Marcador | Qué activa |
| --- | --- |
| `[URL_DOMINIO_VERCEL]` | canonical, og:url, og:image, JSON-LD con URL, `sitemap.xml` y la línea Sitemap de `robots.txt` |
| `G-XXXXXXXXXX` | Google Analytics 4 (solo si el visitante acepta cookies) |
| `[ENDPOINT_FORMULARIO_O_WEBHOOK]` | envío real del formulario (POST JSON) |
| `[NUMERO_WHATSAPP]` | link secundario de WhatsApp en Contacto |
| `[URL_PERFIL_GOOGLE_EMPRESA]` | link a Google Maps en el footer y en `sameAs` del JSON-LD |
| `[NOMBRE_TITULAR_O_RAZON_SOCIAL]`, `[CUIT/CUIL]`, `[DOMICILIO_LEGAL_ARGENTINA]`, `[EMAIL_CONTACTO]`, `[CIUDAD_JURISDICCION]`, `[NUMERO_REGISTRO_BASE_DE_DATOS_AAIP]` | páginas legales |

Además, en `src/pages/PoliticaPrivacidad.tsx`: `[PROVEEDOR_DEL_FORMULARIO]`.

Los marcadores pendientes se ven resaltados en las páginas legales.

## Dónde editar

- Textos, precios, proyectos y FAQ: `src/data/content.ts`
- Secciones de la home: `src/components/`
- Páginas: `src/pages/` (home, aviso legal, privacidad, cookies, 404)
- Colores y tipografía: `tailwind.config.js`
- SEO de build (JSON-LD, robots, sitemap, 404.html): `vite.config.ts`
- Cabeceras de seguridad y rutas: `vercel.json`

## Eventos de GA4

- `generate_lead`: envío exitoso del formulario (servicio y rubro).
- `select_content`: clic en una demo (`content_type: demo`).
- `click_social`: clic en Instagram o Google Maps.
- `contact_whatsapp`: clic en WhatsApp (cuando esté activo).
