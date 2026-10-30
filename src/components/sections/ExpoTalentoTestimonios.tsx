"use client";

import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image: string;
    logoSrc: string;
    logoAlt: string;
    logoDark?: string;
    logoDarkClass?: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "La actividad facilitó el acercamiento con estudiantes y profesionales de distintas áreas, fortaleciendo la relación entre la empresa y el sector académico. Una iniciativa de gran valor tanto para las empresas como para quienes buscan empleo.",
        author: "Helena Góngora",
        role: "Asistente de Recursos Humanos · Carnes Castillo",
        image: "/HelenaCarnesCastillo.jpg",
        logoSrc: "/empresas-trimmed/CARNES CASTILLO.png",
        logoAlt: "Carnes Castillo",
    },
    {
        quote: "Participar en la Feria de Empleo de la UTN fue una experiencia sumamente positiva: nos permitió fortalecer nuestra marca empleadora y establecer contacto directo con candidatos interesados en nuevas oportunidades laborales.",
        author: "Roxinia Castillo",
        role: "Coordinadora de Recursos Humanos · Carnes Castillo",
        image: "/Roxinia.jpg",
        logoSrc: "/empresas-trimmed/CARNES CASTILLO.png",
        logoAlt: "Carnes Castillo",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section ref={sectionRef}
            className="relative isolate overflow-hidden"
            style={{ background: "#FFFFFF" }}
        >
            <div className="page-bg-grid" />
            <div className="max-w-7xl mx-auto sm:px-16 px-4 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    className="flex flex-col gap-3"
                >
                    <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit gap-2 bg-secondary text-navy">
                        <span className="size-1.5 rounded-full bg-primary" />
                        Testimonios
                    </Badge>
                    <h2 className="text-3xl md:text-5xl leading-none font-medium tracking-tight text-navy">
                        Lo que dicen las <span className="text-primary">empresas</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    className="pt-12 pb-8"
                >
                    <Carousel>
                        <CarouselContent>
                            {testimonials.map((t, index) => (
                                <CarouselItem key={index}>
                                    <div className="grid grid-cols-12 gap-6 items-center">

                                        {/* Columna izquierda: comilla + quote + autor */}
                                        <div className="lg:col-span-8 col-span-12 flex sm:flex-row flex-col sm:gap-10 gap-6 lg:pe-12">
                                            <div className="shrink-0 flex items-start">
                                                <Quote className="size-12 fill-primary text-primary" aria-hidden />
                                            </div>
                                            <div className="flex flex-col gap-12">
                                                <blockquote className="sm:text-3xl text-xl text-muted-foreground">
                                                    {t.quote}
                                                </blockquote>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-base font-medium">{t.author}</p>
                                                        <p className="text-sm text-muted-foreground">{t.role}</p>
                                                    </div>
                                                    <Image
                                                        src={t.logoSrc}
                                                        alt={t.logoAlt}
                                                        width={120}
                                                        height={40}
                                                        className={`object-contain ${t.logoDark ? "dark:hidden" : ""} ${t.logoDarkClass ?? ""}`}
                                                        style={{ width: "120px", height: "40px" }}
                                                    />
                                                    {t.logoDark && (
                                                        <Image
                                                            src={t.logoDark}
                                                            alt={t.logoAlt}
                                                            width={120}
                                                            height={40}
                                                            className="object-contain hidden dark:block"
                                                            style={{ width: "120px", height: "40px" }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Columna derecha: foto */}
                                        <div className="md:col-span-4 col-span-12">
                                            <div className="relative aspect-square rounded-xl overflow-hidden">
                                                <Image
                                                    src={t.image}
                                                    alt={`Foto de ${t.author}`}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-top-20 left-auto right-12 size-8 cursor-pointer" />
                        <CarouselNext className="-top-20 right-0 size-8 cursor-pointer" />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}
