"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const accordionItems = [
  {
    id: 1,
    title: 'Voice Assistant',
    imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'AI Image Generation',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'AI Chatbot + Local RAG',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'AI Agent',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Visual Understanding',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
  },
]

function AccordionItem({ item, isActive, onMouseEnter }: { item: any; isActive: boolean; onMouseEnter: () => void }) {
  return (
    <div
      className={cn(
        "relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shrink-0",
        isActive ? "w-[260px] md:w-[400px]" : "w-[60px]"
      )}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <span
        className={cn(
          "absolute text-white text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out",
          isActive
            ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
            : "bottom-24 left-1/2 -translate-x-1/2 rotate-90"
        )}
      >
        {item.title}
      </span>
    </div>
  )
}

export function SolucionesIA() {
  const [activeIndex, setActiveIndex] = React.useState(2)

  return (
    <section id="soluciones-ia" className="relative px-4 py-16 max-w-7xl mx-auto w-full z-20">
      <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl p-6 md:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Soluciones IA<br />a <span className="text-primary">Tu Medida</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Implementá IA de alto rendimiento en tu negocio sin complicaciones tecnológicas. Potenciá tus procesos con
              asistentes de voz, chatbots locales y visión artificial avanzada.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a 
                href="#contacto" 
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-primary transition-all duration-300 hover:-translate-y-1"
              >
                Implementar ahora
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-7/12 flex flex-row items-center justify-start lg:justify-center gap-2 md:gap-4 overflow-x-auto py-4 hide-scrollbar">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
