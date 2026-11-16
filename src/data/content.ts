export const NAV = [
  { id: "servicios", n: "01", label: "Servicios" },
  { id: "proyectos", n: "02", label: "Proyectos" },
  { id: "proceso", n: "03", label: "Proceso" },
  { id: "inversion", n: "04", label: "Inversión" },
  { id: "nosotros", n: "05", label: "Nosotros" },
  { id: "faq", n: "06", label: "FAQ" },
] as const

export const RUBROS = ["Industrias", "Comercios", "Estudios profesionales"] as const

export const SERVICIOS_OPCIONES = [
  "Landing page",
  "Mantenimiento mensual",
  "Branding",
  "Google Maps y SEO local",
  "Chatbot y WhatsApp",
  "Varios / todavía no sé",
] as const

export type ServicioOpcion = (typeof SERVICIOS_OPCIONES)[number]

export const RUBROS_OPCIONES = ["Industria", "Comercio", "Estudio profesional", "Otro"] as const

export const SERVICIO_PRINCIPAL = {
  n: "01",
  title: "Diseño y desarrollo de landing pages",
  promise: "Una página pensada para que quien la visita te consulte.",
  benefits: [
    "Diseño a medida de tu marca y tu rubro",
    "Carga rápida en celular y computadora",
    "100% adaptable a móviles y tablets",
    "Estructura y formulario orientados a conversión",
  ],
}

export const SERVICIOS_COMPLEMENTARIOS = [
  {
    n: "02",
    title: "Restauración y diseño de branding",
    promise: "Una identidad visual coherente en todos tus canales.",
    benefits: [
      "Logo nuevo o rediseño del actual",
      "Paleta de colores de marca",
      "Selección de tipografías",
      "Coherencia entre web, redes e impresos",
    ],
  },
  {
    n: "03",
    title: "Posicionamiento digital y Google Maps",
    promise: "Que te encuentren cuando buscan tu rubro en tu zona.",
    benefits: [
      "Optimización del perfil de empresa en Google",
      "Categorías, horarios, fotos y datos al día",
      "SEO local para búsquedas por zona",
      "Más visibilidad en Maps y en el buscador",
    ],
  },
  {
    n: "04",
    title: "Integración de chatbot y WhatsApp",
    promise: "Respuestas automáticas cuando no estás disponible.",
    benefits: [
      "Respuestas a preguntas frecuentes fuera de horario",
      "Conexión con tu WhatsApp",
      "Derivación de consultas a ventas",
      "Instalado en tu web",
    ],
  },
  {
    n: "05",
    title: "Mantenimiento y soporte técnico",
    promise: "Tu web funcionando y actualizada todos los meses.",
    benefits: [
      "Soporte técnico ante cualquier falla",
      "Actualizaciones de contenido",
      "Seguridad y copias de respaldo",
      "Monitoreo de funcionamiento",
    ],
  },
]

export const PROYECTOS = [
  {
    name: "Sin Remordimiento",
    rubro: "Comercio · Gastronomía",
    description:
      "Churros artesanales a domicilio. Menú, zonas y horarios de envío, y pedidos directos por WhatsApp.",
    url: "https://6af7b3e1775112813f4eebaa--sinremordi.netlify.app/",
    domain: "sinremordi.netlify.app",
    image: "/proyectos/sin-remordimiento.webp",
  },
  {
    name: "Vilar & Asociados",
    rubro: "Estudio profesional · Contable",
    description:
      "Firma contable, fiscal y estratégica. Servicios, método de trabajo en etapas y sectores que atiende, con estética corporativa.",
    url: "https://vilar-asociados.netlify.app/",
    domain: "vilar-asociados.netlify.app",
    image: "/proyectos/vilar-asociados.webp",
  },
  {
    name: "Café Lunar",
    rubro: "Comercio · Gastronomía",
    description:
      "Cafetería de especialidad en Rosario. Carta digital, horarios, ubicación y reservas por WhatsApp, con estética editorial.",
    url: "https://cafe-lunar-rosario.netlify.app/",
    domain: "cafe-lunar-rosario.netlify.app",
    image: "/proyectos/cafe-lunar.webp",
  },
]

export const PASOS = [
  {
    n: "01",
    title: "Relevamiento y estrategia",
    text: "Entendemos tu rubro, tus clientes y el objetivo de la web.",
  },
  {
    n: "02",
    title: "Diseño UI/UX a medida",
    text: "Armamos la estructura visual con tu identidad de marca.",
  },
  {
    n: "03",
    title: "Desarrollo y conexiones",
    text: "Programamos la web y conectamos formulario, WhatsApp y SEO base.",
  },
  {
    n: "04",
    title: "Entrega y publicación",
    text: "Publicamos la web online. Plazo total estimado: 2 a 4 semanas.",
  },
]

export const PLANES = {
  landing: {
    title: "Desarrollo de landing page",
    tag: "Pago único",
    price: "$220.000",
    unit: "ARS",
    note: "Entrega en 2 a 4 semanas.",
    includes: [
      "Diseño personalizado con tu identidad",
      "Desarrollo responsivo: celular, tablet y computadora",
      "Optimización de velocidad de carga",
      "Vinculación de dominio y hosting",
      "Formulario de contacto integrado",
    ],
    cta: "Consultar por la landing",
    servicio: "Landing page" as ServicioOpcion,
  },
  mantenimiento: {
    title: "Mantenimiento mensual",
    tag: "Mínimo 3 meses",
    price: "$25.000",
    unit: "ARS / mes",
    note: "Contratación mínima de 3 meses.",
    includes: [
      "Soporte técnico",
      "Actualizaciones de contenido",
      "Monitoreo de funcionamiento",
      "Ajustes menores",
    ],
    cta: "Consultar por mantenimiento",
    servicio: "Mantenimiento mensual" as ServicioOpcion,
  },
}

export const PRINCIPIOS = [
  {
    title: "Precio cerrado",
    text: "Sabés cuánto vas a pagar antes de empezar. Sin costos ocultos.",
  },
  {
    title: "Plazos concretos",
    text: "Entre 2 y 4 semanas desde el relevamiento hasta la publicación.",
  },
  {
    title: "Todo en un lugar",
    text: "Web, branding, Google Maps y chatbot con el mismo equipo y el mismo criterio.",
  },
  {
    title: "En todo el país",
    text: "Trabajamos a distancia con empresas, comercios y profesionales de toda Argentina.",
  },
]

export const FAQS = [
  {
    q: "¿Cuánto tarda el desarrollo?",
    a: "Entre 2 y 4 semanas. El plazo depende del alcance del proyecto y de qué tan rápido contemos con el material: textos, logo y fotos.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Completar el formulario con tu rubro y lo que necesitás. Después coordinamos una charla para definir el objetivo, las secciones y el contenido. Si tenés logo, fotos y textos, sumalos; si te falta algo, lo resolvemos en el relevamiento.",
  },
  {
    q: "¿Cómo funciona el mantenimiento de 3 meses mínimos?",
    a: "Cuesta $25.000 por mes y la contratación mínima es de 3 meses. Incluye soporte técnico, actualizaciones de contenido, monitoreo de funcionamiento y ajustes menores.",
  },
  {
    q: "¿Trabajan con clientes fuera de mi ciudad?",
    a: "Sí. Trabajamos con clientes de toda Argentina y todo el proceso se hace a distancia.",
  },
  {
    q: "¿Puedo sumar branding o chatbot después?",
    a: "Sí. Branding, Google Maps y chatbot se pueden sumar en cualquier momento, antes o después de publicar la landing. Se cotizan según el alcance.",
  },
]

export const INSTAGRAM = {
  handle: "@enlacepage",
  url: "https://www.instagram.com/enlacepage/",
}
