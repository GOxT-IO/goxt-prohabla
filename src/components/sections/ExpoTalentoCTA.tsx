"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { proximoEvento } from "@/lib/eventos";

export default function CTASection() {
  const ref = useRef(null);

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="page-bg-grid" />
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto sm:px-16 px-4">
          <div
            ref={ref}
          >
            <motion.div
              initial={{ y: "5%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col gap-6 items-center mx-auto"
            >
              <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-navy">
                  Listo para la <span className="text-primary">{proximoEvento.nombre}</span>?
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Conéctate con empresas, descubre oportunidades y da el siguiente paso en tu carrera profesional. ¡No pierdas la oportunidad de crecer!
                </p>
              </div>
              <a href="/empleos" className="group relative">
                <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-all duration-500">
                    Ver Vacantes
                  </span>
                  <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
