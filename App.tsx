"use client"

import * as React from "react"
import { Navbar } from "@/components/blocks/navbar"
import { Hero } from "@/components/blocks/hero"
import { SolucionesIA } from "@/components/blocks/soluciones-ia"
import { Servicios } from "@/components/blocks/servicios"
import { Portfolio } from "@/components/blocks/portfolio"
import { PricingSectionDemo } from "@/components/ui/demo"
import { ContactFooter } from "@/components/blocks/contact-footer"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20 selection:text-primary dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main>
        <Hero />
        <SolucionesIA />
        <Servicios />
        <Portfolio />
        <PricingSectionDemo />
        <ContactFooter />
      </main>
      
      {/* Background Gradient Blobs (Seonet-style) */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none select-none" style={{ background: 'linear-gradient(60deg, #f0f4ff 0%, #f8faff 50%, #f5f0ff 100%)' }}>
        <div className="absolute top-[-5%] -left-[8%] w-[45%] h-[45%] rounded-full" style={{ background: '#0034d3', filter: 'blur(140px)', opacity: 0.12 }} />
        <div className="absolute top-[15%] right-[-5%] w-[35%] h-[35%] rounded-full" style={{ background: '#99ccff', filter: 'blur(120px)', opacity: 0.25 }} />
        <div className="absolute top-[50%] -left-[5%] w-[30%] h-[30%] rounded-full" style={{ background: '#003087', filter: 'blur(130px)', opacity: 0.08 }} />
        <div className="absolute top-[60%] right-[10%] w-[40%] h-[40%] rounded-full" style={{ background: '#0034d3', filter: 'blur(150px)', opacity: 0.10 }} />
        <div className="absolute bottom-[-10%] left-[15%] w-[55%] h-[40%] rounded-full" style={{ background: 'linear-gradient(50deg, #0034d3, #99ccff)', filter: 'blur(140px)', opacity: 0.12 }} />
      </div>
    </div>
  )
}
