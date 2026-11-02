import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { getProximoEvento } from "@/lib/eventos";

interface Pregunta {
  pregunta: string;
  /** Texto plano para los datos estructurados de Google. */
  respuesta: string;
  /** Versión con enlaces para la página (opcional). */
  contenido?: React.ReactNode;
}

function getPreguntas(): Pregunta[] {
  const evento = getProximoEvento();

  return [
    {
      pregunta: "¿Qué es Prohabla?",
      respuesta:
        "Prohabla es un portal de empleo y un programa de ferias de empleo en distintos puntos de Costa Rica. Las empresas publican sus vacantes y estudiantes, egresados y jóvenes profesionales postulan gratis.",
    },
    {
      pregunta: "¿Cuánto cuesta postular o asistir a una feria?",
      respuesta:
        "Nada. Postular a vacantes y asistir a las ferias es 100% gratuito, sin boletos ni cupos limitados.",
    },
    {
      pregunta: "¿Cómo postulo a una vacante?",
      respuesta:
        "Entra a la sección Empleos, elige la vacante y presiona Postular. Completa el formulario con tus datos y tu CV, y la empresa recibirá tu postulación.",
      contenido: (
        <>
          Entra a <Link href="/empleos" className="font-medium text-primary underline-offset-4 hover:underline">Empleos</Link>, elige la vacante y presiona <strong>Postular</strong>. Completa el formulario con tus datos y tu CV, y la empresa recibirá tu postulación.
        </>
      ),
    },
    {
      pregunta: "¿Necesito experiencia laboral?",
      respuesta:
        "No. Hay oportunidades para personas con experiencia y para quienes buscan su primer empleo, incluidas prácticas para estudiantes avanzados y recién egresados. Puedes filtrar las vacantes por experiencia mínima.",
    },
    {
      pregunta: "Tengo una empresa, ¿cómo publico mis vacantes?",
      respuesta:
        "Completa el formulario de la sección Empresas con la información de tus vacantes. Publicarlas no tiene costo.",
      contenido: (
        <>
          Completa el formulario de la sección <Link href="/empresas" className="font-medium text-primary underline-offset-4 hover:underline">Empresas</Link> con la información de tus vacantes. Publicarlas no tiene costo.
        </>
      ),
    },
    {
      pregunta: "¿Cuándo es la próxima feria de empleo?",
      respuesta: evento
        ? `La próxima es la ${evento.nombre}: ${evento.diaSemana.toLowerCase()} ${evento.fecha}, de ${evento.horario}, en ${evento.institucion} (${evento.sede}).`
        : "Estamos preparando la próxima feria. Revisa la Agenda o registra tu CV para enterarte primero.",
    },
    {
      pregunta: "¿Qué llevo a una feria de empleo?",
      respuesta:
        "Lleva tu CV impreso y en digital, investiga antes a las empresas participantes y usa ropa formal y cómoda para el clima de la zona.",
    },
    {
      pregunta: "¿Qué tipo de empresas participan?",
      respuesta:
        "Principalmente empresas de comercio, logística, servicios y turismo, con nuevas organizaciones en cada feria.",
    },
  ];
}

export default function ExpoTalentoFAQ() {
  const preguntas = getPreguntas();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };

  return (
    <section
      style={{ background: "#FFFFFF" }}
      className="relative isolate overflow-hidden bg-background section-padding-y"
      aria-labelledby="faq-heading"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container-padding-x mx-auto flex max-w-4xl flex-col gap-10 md:gap-12">
        <div className="section-title-gap-lg flex flex-col items-center text-center">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit gap-2 bg-secondary text-navy">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Preguntas frecuentes
          </Badge>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-medium tracking-tight text-navy">
            ¿Tienes <span className="text-primary">dudas</span>?
          </h2>
          <p className="text-muted-foreground text-lg/8 text-pretty">
            Si no encuentras tu respuesta, <Link href="/contacto" className="font-medium text-primary underline-offset-4 hover:underline">escríbenos</Link>.
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0">
          {preguntas.map((p, i) => (
            <AccordionItem key={p.pregunta} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">{p.pregunta}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">{p.contenido ?? p.respuesta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
