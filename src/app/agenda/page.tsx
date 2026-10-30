import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import Footer from "@/components/sections/ExpoTalentoFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventoAgendaCard, EventoPasadoItem } from "@/components/portal/agenda";
import { cn } from "@/lib/utils";
import {
  TIPOS_EVENTO,
  getEventosPasados,
  getEventosProximos,
  partesFecha,
  type Evento,
  type TipoEvento,
} from "@/lib/eventos";
import { eventJsonLd } from "@/lib/eventos-jsonld";

export const metadata: Metadata = {
  title: "Agenda de ferias y eventos",
  description:
    "Próximas ferias de empleo, talleres y charlas de Prohabla en Costa Rica. Revisa fechas y lugares, agrégalos a tu calendario e inscríbete gratis.",
  alternates: { canonical: "/agenda" },
};

function agruparPorMes(eventos: Evento[]) {
  const grupos = new Map<string, Evento[]>();
  for (const evento of eventos) {
    const { mesAnio } = partesFecha(evento.inicio);
    grupos.set(mesAnio, [...(grupos.get(mesAnio) ?? []), evento]);
  }
  return [...grupos.entries()];
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tipo: tipoParam } = await searchParams;
  const tipo = TIPOS_EVENTO.find((t) => t === tipoParam) as TipoEvento | undefined;
  const filtrar = (eventos: Evento[]) => (tipo ? eventos.filter((e) => e.tipo === tipo) : eventos);

  const proximos = filtrar(getEventosProximos());
  const pasados = filtrar(getEventosPasados());

  return (
    <div className="relative">
      {proximos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(proximos.map(eventJsonLd)) }}
        />
      )}
      <main className="relative isolate overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24" style={{ background: "#F7FBFE" }}>
        <div className="page-bg-grid" />
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-16">
          <header className="flex flex-col gap-4">
            <Badge className="h-auto w-fit gap-2 border-0 bg-secondary px-3 py-1 text-sm text-navy">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Agenda Prohabla
            </Badge>
            <h1 className="text-balance text-4xl font-medium tracking-tight text-navy md:text-5xl">
              Ferias de empleo, talleres y <span className="text-primary">charlas</span>
            </h1>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              Revisa fechas y lugares, inscríbete y agrega cada actividad a tu calendario para no perderte ninguna.
            </p>
            <nav aria-label="Filtrar por tipo de evento" className="flex flex-wrap gap-2 pt-2">
              {[undefined, ...TIPOS_EVENTO].map((t) => {
                const activo = t === tipo;
                return (
                  <Link
                    key={t ?? "todos"}
                    href={t ? `/agenda?tipo=${encodeURIComponent(t)}` : "/agenda"}
                    aria-current={activo ? "page" : undefined}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition",
                      activo
                        ? "border-navy bg-navy text-white"
                        : "border-border bg-white text-navy hover:border-primary hover:text-primary"
                    )}
                  >
                    {t ?? "Todos"}
                  </Link>
                );
              })}
            </nav>
          </header>

          <section aria-labelledby="proximos" className="flex flex-col gap-6">
            <h2 id="proximos" className="text-2xl font-semibold text-navy">
              Próximos eventos
            </h2>
            {proximos.length > 0 ? (
              agruparPorMes(proximos).map(([mes, eventos]) => (
                <div key={mes} className="flex flex-col gap-4">
                  <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{mes}</p>
                  {eventos.map((evento) => (
                    <EventoAgendaCard key={evento.id} evento={evento} />
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white p-10 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarClock className="size-6" aria-hidden />
                </span>
                <p className="text-lg font-medium text-navy">Estamos preparando las próximas actividades</p>
                <p className="max-w-md text-muted-foreground">
                  Registra tu CV y te avisamos apenas abramos inscripciones para la próxima feria.
                </p>
                <Button asChild className="h-11 rounded-full px-6">
                  <Link href="/postulantes">Registrar mi CV</Link>
                </Button>
              </div>
            )}
          </section>

          {pasados.length > 0 && (
            <section aria-labelledby="realizados" className="flex flex-col gap-4">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 id="realizados" className="text-2xl font-semibold text-navy">
                  Eventos realizados
                </h2>
                <Link href="/eventos" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                  Ver fotos y crónicas
                </Link>
              </div>
              <ul className="flex flex-col gap-3">
                {pasados.map((evento) => (
                  <EventoPasadoItem key={evento.id} evento={evento} />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
