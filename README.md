# EnlaceStudio

Landing corporativa de EnlaceStudio. React + Vite + TypeScript + Tailwind CSS. Deploy en Vercel.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # chequeo de tipos + build en dist/
```

## Dónde editar

- Textos, precios, proyectos y FAQ: `src/data/content.ts`
- Secciones: `src/components/`
- Colores y tipografía: `tailwind.config.js`
- Capturas de proyectos: `public/proyectos/` (960×600, webp)

## Formulario de contacto

El envío está en `src/lib/send-lead.ts`. Para conectarlo, cargá `VITE_FORM_ENDPOINT` en Vercel
(Project → Settings → Environment Variables) con una URL que reciba un POST en JSON (por ejemplo, Formspree).

- Sin endpoint, en desarrollo simula un envío exitoso.
- Sin endpoint, en producción muestra un error y deriva a Instagram, para no perder consultas.
