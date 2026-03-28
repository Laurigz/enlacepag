"use client"

import { Sparkles, Zap, ArrowDownToDot } from "lucide-react"
import { PricingSection } from "@/components/ui/pricing-section"

const defaultTiers = [
  {
    name: "PRINCIPIANTE",
    price: {
      monthly: 25000,
      yearly: 250000,
    },
    description: "Identidad Local. Ideal para: Negocios micro",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-500/30 blur-2xl rounded-full" />
        <Zap className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400 animate-[float_3s_ease-in-out_infinite]" />
      </div>
    ),
    features: [
      {
        name: "Google Maps",
        description: "Optimización de perfil en Google Maps.",
        included: true,
      },
      {
        name: "WhatsApp Business",
        description: "Configuración y diseño para WhatsApp Business.",
        included: true,
      },
      {
        name: "Diseño Gráfico Básico",
        description: "Diseño gráfico básico de marca (Logotipo/Paleta).",
        included: true,
      },
    ],
  },
  {
    name: "Avanzado",
    price: {
      monthly: 49000,
      yearly: 490000,
    },
    description: "Crecimiento Digital",
    highlight: true,
    badge: "MÁS POPULAR",
    icon: (
      <div className="relative">
        <ArrowDownToDot className="w-7 h-7 relative z-10" />
      </div>
    ),
    features: [
      {
        name: "Diseño Web Premium",
        description: "Landing Page o sitio de hasta 5 secciones.",
        included: true,
      },
      {
        name: "Branding",
        description: "Branding y ecosistema visual.",
        included: true,
      },
      {
        name: "Redes Sociales",
        description: "Integración de redes sociales.",
        included: true,
      },
      {
        name: "SEO Básico",
        description: "SEO básico para que los encuentren en Google.",
        included: true,
      },
    ],
  },
]

function PricingSectionDemo() {
  return <PricingSection tiers={defaultTiers} />
}

export { PricingSectionDemo }
