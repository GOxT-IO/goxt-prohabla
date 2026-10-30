import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FORMS } from "@/lib/site-config";

const LOGOS_DESTACADOS = [
  "BURGER KING",
  "MCDONALDS",
  "STARBUCKS",
  "KFC",
  "HEINEKEN",
  "JUAN VALDEZ",
].map((name) => ({ src: `/empresas-trimmed/${name}.png`, name }));

const STATS = [
  {
    id: "candidatos",
    value: "Acceso",
    label: "A candidatos calificados",
  },
  {
    id: "horario",
    value: "100% gratuito",
    label: "Sin costo de participación",
  },
  {
    id: "marca",
    value: "Posicionamiento",
    label: "En el mercado de talento",
  },
];

export default function ExpoTalentoEmpresasHero() {
  return (
    <section className="relative isolate overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24"
        style={{ background: "#F7FBFE" }}
    >
      <div className="page-bg-grid" />
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Columna izquierda: contenido */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit gap-2 bg-secondary text-navy">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                Para empresas · Sin costo
              </Badge>
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl text-navy">
                Encuentra el{" "}
                <span className="text-primary">talento</span> que tu empresa necesita
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Completa el formulario para publicar tus vacantes en el portal y participar en las ferias de empleo de Prohabla. Conecta con estudiantes y profesionales listos para crecer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-1.5">
                  <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                Empresas que han participado en Prohabla
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {LOGOS_DESTACADOS.map((logo) => (
                  <li key={logo.src} className="flex shrink-0 items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={140}
                      height={36}
                      style={{ width: "auto" }}
                      className="h-9 w-auto object-contain"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna derecha: Formulario Iframe */}
          <div className="flex flex-col gap-8">
            <iframe
              src={FORMS.empresas}
              width="100%"
              height="850"
              style={{ border: "none", borderRadius: "16px" }}
              title="Formulario de registro de empresas"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
