import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, CheckCircle2, Clock, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { JobCard } from "@/components/portal/job-card";
import { SectionHeader } from "@/components/portal/section-header";
import { hrefCategoria, iconoCategoria } from "@/components/portal/categorias";
import type { Logo } from "@/lib/logos";
import type { Evento } from "@/lib/eventos";
import type { Vacante } from "@/lib/vacantes";

export function LatestJobs({ vacantes }: { vacantes: Vacante[] }) {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="ultimas-vacantes">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-16">
        <SectionHeader
          id="ultimas-vacantes"
          eyebrow="Vacantes"
          title={<>Últimas <span className="text-primary">oportunidades</span></>}
          description="Empleos publicados por empresas que participan en Prohabla. Postula en minutos desde tu celular."
          action={
            <Button asChild variant="outline" className="h-11 w-fit rounded-full px-5">
              <Link href="/empleos">
                Ver todas las vacantes <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        {vacantes.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vacantes.map((vacante) => (
              <JobCard key={vacante.id} vacante={vacante} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-lg font-medium text-navy">Pronto publicaremos nuevas vacantes</p>
            <p className="max-w-md text-muted-foreground">
              Registra tu CV y te avisamos cuando haya oportunidades para tu perfil.
            </p>
            <Button asChild className="h-11 rounded-full px-6">
              <Link href="/postulantes">Registrar mi CV</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

interface CategoryGridProps {
  categorias: { categoria: string; total: number }[];
}

export function CategoryGrid({ categorias }: CategoryGridProps) {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "#F7FBFE" }} aria-labelledby="categorias">
      <div className="page-bg-grid" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-16">
        <SectionHeader
          id="categorias"
          eyebrow="Explora por área"
          title={<>Busca empleo por <span className="text-primary">categoría</span></>}
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map(({ categoria, total }) => {
            const Icono = iconoCategoria(categoria);
            return (
              <li key={categoria}>
                <Link
                  href={hrefCategoria(categoria)}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-primary/40 hover:shadow-md"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition group-hover:bg-primary">
                    <Icono className="size-5" aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-medium leading-snug text-navy">{categoria}</span>
                    <span className="text-sm text-muted-foreground">
                      {total === 0 ? "Ver vacantes" : total === 1 ? "1 vacante" : `${total} vacantes`}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function CompaniesStrip({ logos }: { logos: Logo[] }) {
  return (
    <section className="border-y border-border bg-white py-12" aria-labelledby="empresas-aliadas">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-16">
        <h2 id="empresas-aliadas" className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Empresas que han participado en las ferias de Prohabla
        </h2>
        <Marquee
          pauseOnHover
          repeat={2}
          className="w-full p-0 [--duration:40s] mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[&_*]:[animation-play-state:paused]"
        >
          {logos.map((logo) => (
            <div key={logo.src} className="mx-8 flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={48}
                style={{ width: "auto" }}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

const BENEFICIOS_POSTULANTES = [
  "Postula gratis a vacantes de empresas reales",
  "Primer empleo, prácticas y jóvenes profesionales",
  "Entérate primero de las próximas ferias",
];

const BENEFICIOS_EMPRESAS = [
  "Publica tus vacantes sin costo",
  "Recibe postulaciones de talento joven calificado",
  "Participa en las ferias de empleo presenciales",
];

export function AudienceCTA() {
  return (
    <section className="bg-white py-16 md:py-24" aria-label="Postulantes y empresas">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-3xl bg-navy p-8 text-white md:p-10">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/10">
            <UserRound className="size-6" aria-hidden />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium tracking-tight">¿Buscas empleo?</h2>
            <p className="text-white/70">Crea tu perfil una sola vez y deja tu CV listo para las empresas.</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {BENEFICIOS_POSTULANTES.map((b) => (
              <li key={b} className="flex items-start gap-2 text-white/90">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-auto h-12 w-fit rounded-full px-6 text-base">
            <Link href="/postulantes">
              Registrar mi CV <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl border border-border p-8 md:p-10" style={{ background: "#F7FBFE" }}>
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="size-6" aria-hidden />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium tracking-tight text-navy">¿Buscas talento?</h2>
            <p className="text-muted-foreground">Llega a estudiantes, egresados y jóvenes profesionales de tu zona.</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {BENEFICIOS_EMPRESAS.map((b) => (
              <li key={b} className="flex items-start gap-2 text-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-auto h-12 w-fit rounded-full border-navy px-6 text-base">
            <Link href="/empresas">
              Publicar una vacante <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EventBanner({ evento }: { evento: Evento | null }) {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24" style={{ background: "#F7FBFE" }} aria-labelledby="ferias">
      <div className="page-bg-grid" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeader
            id="ferias"
            eyebrow="Ferias de empleo"
            title={
              evento ? (
                <>Próxima feria: <span className="text-primary">{evento.nombre}</span></>
              ) : (
                <>Conoce a las empresas <span className="text-primary">cara a cara</span></>
              )
            }
            description={
              evento
                ? "Lleva tu CV impreso, conversa con reclutadores y conoce a las empresas participantes. La entrada es libre."
                : "Organizamos ferias de empleo presenciales en distintos puntos de Costa Rica. Revisa las ferias realizadas y entérate de las próximas."
            }
          />
          {evento && (
            <ul className="flex flex-col gap-3 rounded-2xl border border-border border-l-4 border-l-primary bg-white p-5">
              <li className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="font-medium text-navy">{evento.diaSemana} {evento.fecha}</span>
                  <span className="block text-sm text-muted-foreground">{evento.entrada}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="font-medium text-navy">{evento.horario}</span>
                  <span className="block text-sm text-muted-foreground">{evento.horarioNota}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="font-medium text-navy">{evento.institucion}</span>
                  <span className="block text-sm text-muted-foreground">{evento.sede}</span>
                </span>
              </li>
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            {evento && (
              <Button asChild className="h-12 rounded-full px-6 text-base">
                <Link href="/postulantes">Confirmar asistencia</Link>
              </Button>
            )}
            <Button asChild variant="outline" className="h-12 rounded-full px-6 text-base">
              <Link href="/eventos">
                Ver todas las ferias <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {evento?.mapaEmbedUrl ? (
          <div className="overflow-hidden rounded-2xl border border-border shadow-md">
            <iframe
              src={evento.mapaEmbedUrl}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`Mapa de ${evento.institucion}, ${evento.sede}`}
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/Eventos.jpg"
              alt="Asistentes en una feria de empleo de Prohabla"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
