import Link from "next/link";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DEFAULT_LOGO_URL,
  formatList,
  formatRelativeDate,
  getInitials,
  isVacanteNueva,
  toTitleCase,
  vacanteCierraProximo,
  type Vacante,
} from "@/lib/vacantes";

export function JobCard({ vacante }: { vacante: Vacante }) {
  const modalidad = formatList(vacante.modalidad, "");
  const jornada = formatList(vacante.tipoJornada, "");

  return (
    <Link
      href={`/empleos/${vacante.id}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-16 shrink-0 rounded-lg border border-border bg-white">
          <AvatarImage
            src={vacante.logoUrl ?? DEFAULT_LOGO_URL}
            alt=""
            className="object-contain p-1.5"
          />
          <AvatarFallback className="rounded-lg text-xs">{getInitials(vacante.empresa)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-semibold leading-snug text-navy group-hover:text-primary">
            {toTitleCase(vacante.tituloPuesto)}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{toTitleCase(vacante.empresa)}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
        {vacante.ubicacion && (
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{toTitleCase(vacante.ubicacion)}</span>
          </li>
        )}
        {(modalidad || jornada) && (
          <li className="flex items-center gap-2">
            <Briefcase className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{[modalidad, jornada].filter(Boolean).join(" · ")}</span>
          </li>
        )}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {isVacanteNueva(vacante) && (
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
            Nueva
          </Badge>
        )}
        {vacanteCierraProximo(vacante) && (
          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
            Cierra pronto
          </Badge>
        )}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          {formatRelativeDate(vacante.fechaPublicacion)}
        </span>
      </div>
    </Link>
  );
}
