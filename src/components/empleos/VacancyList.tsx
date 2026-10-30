"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DEFAULT_LOGO_URL,
  formatList,
  formatRelativeDate,
  getInitials,
  isVacanteNueva,
  joinNonEmpty,
  toTitleCase,
  vacanteCierraProximo,
  type Vacante,
} from "@/lib/vacantes";

interface VacancyListProps {
  vacantes: Vacante[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function VacancyList({ vacantes, total, selectedId, onSelect, onClear }: VacancyListProps) {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-navy" aria-live="polite">
          {vacantes.length === total
            ? `${total} ${total === 1 ? "vacante disponible" : "vacantes disponibles"}`
            : `${vacantes.length} de ${total} vacantes`}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {vacantes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <p className="font-medium text-navy">No encontramos vacantes con esos filtros</p>
            <p className="text-sm text-muted-foreground">Prueba con otra palabra o quita algunos filtros.</p>
            {total > 0 && (
              <Button variant="outline" className="rounded-full" onClick={onClear}>
                Ver todas las vacantes
              </Button>
            )}
          </div>
        ) : (
          vacantes.map((vacante) => {
            const selected = selectedId === vacante.id;
            return (
              <button
                key={vacante.id}
                type="button"
                onClick={() => onSelect(vacante.id)}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-l-4 border-border px-5 py-4 text-left transition-colors last:border-b-0",
                  selected
                    ? "border-l-primary bg-secondary/40"
                    : "border-l-transparent hover:bg-muted/50"
                )}
              >
                <Avatar className="h-10 w-14 shrink-0 rounded-lg bg-white">
                  <AvatarImage
                    src={vacante.logoUrl ?? DEFAULT_LOGO_URL}
                    alt=""
                    className="object-contain p-1"
                  />
                  <AvatarFallback className="rounded-lg text-xs">
                    {getInitials(vacante.empresa)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2 min-w-0 font-semibold text-navy">
                      {toTitleCase(vacante.tituloPuesto)}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatRelativeDate(vacante.fechaPublicacion)}
                    </span>
                  </div>
                  <p className="truncate text-sm text-foreground">{toTitleCase(vacante.empresa)}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {joinNonEmpty([toTitleCase(vacante.ubicacion), formatList(vacante.modalidad, "")])}
                  </p>

                  {(isVacanteNueva(vacante) || vacanteCierraProximo(vacante)) && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {isVacanteNueva(vacante) && (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-emerald-700"
                        >
                          Nueva
                        </Badge>
                      )}
                      {vacanteCierraProximo(vacante) && (
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-amber-700"
                        >
                          Cierra pronto
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
