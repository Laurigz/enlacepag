"use client"

import * as React from "react"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Estudio Jurídico Nova",
    metrics: "+150% Leads",
    description: "Rediseño web y embudo de conversión enfocado en captación local.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBliOTaYehT4jSKadshBqDY-1xxCl7AM-ofdQAfZPIEv9uWuYL4W1Ti9TXdUP_mfUj-805P6BaFoTuTptLdsKJKskpbfO5Cf5tFvAghbbxF1-E3ox-Dwwsx5QgbEIf_nKedXujlBbb7Zk9NETBOdoalxdyo2wnj2Ga9TrEkYlMQSJLKHJBU7jp87Y9PsPsvFBvGoxY1OIz39rMOxSYiHkNlr_2rxIlTzv8la6TWMYJHl98p9HTqUItLGfCFpBuJ5cgmspKo9vtqV24M",
    tags: ["Web Design", "Marketing"]
  },
  {
    title: "Café de Especialidad 8M",
    metrics: "Rebranding Global",
    description: "Nueva identidad visual y sistema de diseño para franquicias.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1KR2vWzmMS1U_PvS493Q6JwPQcgpz-rs4DyM2s_sjgdyCLAmU0Cj0Ej3yW18a4mh5GO1G2Spk9Ig7YKREXK0EzLnrZYruyEJP_s-rPy-0wa_yCYMrsCA3SdV-9F6iZpE5qqiooVgOibFg6plM-LtWwMZMGKgxY6QDk7CDGQTI3kuvSe9U-YG-SDkB6SeHs1J3SBVrFOyGBvfqg9PfNUSe7tUldiG2BiY3LPGTJpweND6Nby-rcf6hRPpf3WBd7xcwlewSxH_UxfVa",
    tags: ["Branding", "Strategy"]
  },
  {
    title: "Moda Urbana Store",
    metrics: "Ventas x3",
    description: "Desarrollo de e-commerce a medida con integración de pagos automatizada.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4CHKdElfyn4BoVNhY_8e6iwCzS9hqXeS5F3FQaaYNHLOCBqK9uf4vg1wr3LaehrybcD7siTX58b1-15Ny3yLImmiQRtHz_BeFReZaLZxY1yTSg5FPJ1DfV5lGUXzfo3TfGxFoXGnPA9dx08jV0A-KLVpU-7rNLxweBDydVkhkM2Y0Sd2nmveCHmz0sqr-6touCcUSnIyoT5n3j2e_qtLRx6eahpfrTk67MTPsqC9D-8A6gfJ3FBo2u60V0I9w0imcJkbbfMvor8Hh",
    tags: ["E-commerce", "Web App"]
  }
]

export function Portfolio() {
  return (
    <section id="portafolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
          Más que una agencia, somos tu <span className="text-primary italic">equipo digital.</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          No hacemos plantillas, hacemos estrategia visual. Nos dedicamos a entender tu marca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div key={project.title} className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-[1px] group-hover:blur-0"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 right-4 flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-800 border border-white/50 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3 gap-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {project.title}
                </h3>
                <span className="shrink-0 text-sm font-black text-primary bg-primary/5 px-3 py-1 rounded-lg">
                  {project.metrics}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                {project.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                Ver caso de éxito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="portfolio.html" 
          className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors"
        >
          Ver todos los proyectos <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
