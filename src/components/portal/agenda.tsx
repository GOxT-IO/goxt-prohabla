import Link from "next/link";
import { CalendarPlus, Clock, Download, MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  comoLlegarUrl,
  googleCalendarUrl,
  partesFecha,
  type Evento,
  type TipoEvento,
} from "@/lib/eventos";

const COLOR_TIPO: Record<TipoEvento, string> = {
  "Feria de empleo": "bg-primary/10 text-primary",
  Taller: "bg-sky/20 text-navy",
  Charla: "bg-emerald-50 text-emerald-700",
};

function BloqueFecha({ iso, apagado = false }: { iso: string; apagado?: boolean }) {
  const { dia, mes } = partesFecha(iso);
  return (
    <div
      className={cn(
        "flex size-18 shrink-0 flex-col items-center justify-center rounded-2xl",
        apagado ? "bg-muted/60 text-muted-foreground" : "bg-navy text-white"
      )}
      aria-hidden
    >
      <span className="text-2xl font-bold leading-none">{dia}</span>
      <span className="text-xs font-medium uppercase tracking-wide">{mes}</span>
    </div>
  );
}

export function EventoAgendaCard({ evento }: { evento: Evento }) {
  const inscripcion = evento.inscripcionUrl ?? "/postulantes";
  const externa = inscripcion.startsWith("http");

  return (
    <article
      id={evento.id}
      className="flex scroll-mt-28 flex-col gap-5 rounded-2xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:p-6"
      aria-labelledby={`${evento.id}-titulo`}
    >
      <BloqueFecha iso={evento.inicio} />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Badge className={cn("h-auto border-0 px-2.5 py-0.5", COLOR_TIPO[evento.tipo])}>{evento.tipo}</Badge>
          <h3 id={`${evento.id}-titulo`} className="text-xl font-semibold leading-snug text-navy">
            {evento.nombre}
          </h3>
          {evento.descripcion && <p className="text-muted-foreground">{evento.descripcion}</p>}
        </div>

        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-medium text-navy">
                {evento.diaSemana} {evento.fecha}
              </span>
              <span className="text-muted-foreground">
                {evento.horario} · {evento.entrada}
              </span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-medium text-navy">{evento.institucion}</span>
              <span className="text-muted-foreground">{evento.sede}</span>
            </span>
          </li>
        </ul>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild className="h-10 rounded-full px-5">
            {externa ? (
              <a href={inscripcion} target="_blank" rel="noopener noreferrer">
                Inscribirme
              </a>
            ) : (
              <Link href={inscripcion}>Inscribirme</Link>
            )}
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-full px-4">
            <a href={googleCalendarUrl(evento)} target="_blank" rel="noopener noreferrer">
              <CalendarPlus aria-hidden /> Google Calendar
            </a>
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-full px-4">
            <a href={`/agenda/${evento.id}/calendario.ics`} download>
              <Download aria-hidden /> Apple / Outlook
            </a>
          </Button>
          <Button asChild variant="ghost" className="h-10 rounded-full px-4">
            <a href={comoLlegarUrl(evento)} target="_blank" rel="noopener noreferrer">
              <Navigation aria-hidden /> Cómo llegar
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function EventoPasadoItem({ evento }: { evento: Evento }) {
  return (
    <li id={evento.id} className="flex scroll-mt-28 items-center gap-4 rounded-2xl border border-border bg-white p-4">
      <BloqueFecha iso={evento.inicio} apagado />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{evento.tipo}</p>
        <p className="font-medium text-navy">{evento.nombre}</p>
        <p className="truncate text-sm text-muted-foreground">
          {evento.fecha} · {evento.institucion}, {evento.sede}
        </p>
      </div>
    </li>
  );
}
