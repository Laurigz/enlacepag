"use client"

import * as React from "react"
import { ArrowRight, Play, Star, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
      {/* Background with Grid (handled by global CSS or a separate component later) */}
      <div className="absolute inset-0 z-0 bg-white/20 backdrop-blur-[2px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Badge */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-white/60 px-4 py-2 backdrop-blur-md shadow-sm transition-colors hover:bg-white text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                ⭐ AGENCIA DIGITAL INTEGRAL
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900">
              Diseñando<br />
              <span className="bg-gradient-to-br from-primary via-sky-500 to-sky-300 bg-clip-text text-transparent">
                Experiencias
              </span><br />
              Que Impactan
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg text-slate-600 leading-relaxed font-medium">
              Diseñamos interfaces que combinan belleza con funcionalidad, creando experiencias fluidas que los usuarios
              aman y que hacen crecer tu negocio conectándolo con resultados reales.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#portafolio" 
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-primary active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                Ver Portafolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a 
                href="#contacto" 
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-8 py-4 text-sm font-bold text-slate-800 backdrop-blur-md transition-colors hover:bg-white hover:border-slate-400 shadow-sm"
              >
                <Play className="h-4 w-4" />
                Ver Casos de Éxito
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Stats Card */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 p-8 backdrop-blur-2xl shadow-2xl shadow-sky-900/10 transition-transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    <Target className="h-6 w-6 text-primary fill-current" />
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tight text-slate-900">+120%</div>
                    <div className="text-sm font-medium text-slate-500">Aumento de Tráfico Organico</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Crecimiento SEO y Visibilidad</span>
                    <span className="text-slate-900 font-black">98%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400 shadow-inner transition-all duration-1000" 
                      style={{ width: '98%' }} 
                    />
                  </div>
                </div>

                <hr className="border-white mb-8" />

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-900">29</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Negocios<br/>Optimizados (Nacional)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-900">-30%</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tiempo<br/>Operativo (IA)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-900">ROI+</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estrategia<br/>Digital Integral</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
