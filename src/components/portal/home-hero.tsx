import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JobSearchForm } from "@/components/portal/job-search-form";
import { hrefCategoria } from "@/components/portal/categorias";

interface HomeHeroProps {
  totalVacantes: number;
  categoriasPopulares: string[];
}

export function HomeHero({ totalVacantes, categoriasPopulares }: HomeHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24"
      style={{ background: "#F7FBFE" }}
      aria-labelledby="hero-heading"
    >
      <div className="page-bg-grid" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-16 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col gap-7">
          <Badge className="h-auto w-fit gap-2 border-0 bg-secondary px-3 py-1 text-sm text-navy">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Portal de empleo · Costa Rica
          </Badge>
          <div className="flex flex-col gap-4">
            <h1 id="hero-heading" className="text-balance text-4xl font-medium tracking-tight text-navy md:text-6xl">
              Encuentra tu próximo <span className="text-primary">empleo</span> en Costa Rica
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Vacantes, prácticas y ferias de empleo para estudiantes, egresados y jóvenes profesionales. Postula gratis y conecta directo con las empresas.
            </p>
          </div>

          <JobSearchForm />

          {categoriasPopulares.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Populares:</span>
              {categoriasPopulares.map((categoria) => (
                <Link
                  key={categoria}
                  href={hrefCategoria(categoria)}
                  className="rounded-full border border-border bg-white px-3 py-1 text-navy transition hover:border-primary hover:text-primary"
                >
                  {categoria}
                </Link>
              ))}
            </div>
          )}

          <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6 sm:max-w-lg">
            <div>
              <dt className="text-xs text-muted-foreground">Vacantes activas</dt>
              <dd className="text-2xl font-bold text-navy">{totalVacantes}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Empresas aliadas</dt>
              <dd className="text-2xl font-bold text-navy">+90</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Para postular</dt>
              <dd className="text-2xl font-bold text-navy">Gratis</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src="/Hero.jpg"
              alt="Personas conversando con reclutadores en una feria de empleo de Prohabla"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-8 top-10 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg">
            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <CalendarDays className="size-4" aria-hidden />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-navy">Ferias de empleo</p>
              <p className="text-muted-foreground">en distintos puntos del país</p>
            </div>
          </div>
          <div className="absolute -right-6 bottom-12 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-lg">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="size-4" aria-hidden />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-navy">+90 empresas aliadas</p>
              <p className="text-muted-foreground">comercio, logística y servicios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
