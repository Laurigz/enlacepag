"use client"

import * as React from "react"
import { Send, Instagram, Linkedin, Twitter, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactFooter() {
  return (
    <section id="contacto" className="relative mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-zinc-900/50 pointer-events-none" />
      
      <footer className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-zinc-50">
              Dejá de perder ventas por culpa del <span className="text-primary italic">caos digital.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
              Da el primer paso hoy. Analizamos tu presencia actual y te decimos exactamente qué tenés que mejorar para
              empezar a convertir visitas en clientes.
            </p>
          </div>

          <a 
            href="https://wa.me/+"
            className="group relative flex items-center justify-center gap-3 rounded-2xl h-16 px-10 bg-primary text-white text-xl font-bold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-primary/30"
          >
            <MessageCircle className="h-6 w-6 fill-current" />
            Solicitar Auditoría Gratuita
          </a>

          <div className="w-full h-px bg-slate-200 dark:bg-zinc-800 my-8" />

          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-slate-500 dark:text-zinc-500 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800">
                <img src="/logo-enlace.png" alt="Enlace Logo" className="h-10 w-auto mix-blend-multiply dark:invert" />
              </div>
            </div>

            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors font-semibold">Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors font-semibold">Términos</a>
              <div className="flex gap-4 ml-4 border-l border-slate-200 dark:border-zinc-800 pl-8">
                <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>

            <p className="font-medium">© 2024 Enlace. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
