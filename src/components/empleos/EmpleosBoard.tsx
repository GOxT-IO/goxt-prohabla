"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Vacante } from "@/lib/vacantes";
import { VacancyList } from "@/components/empleos/VacancyList";
import { VacancyPreview } from "@/components/empleos/VacancyPreview";
import { JobFilters } from "@/components/empleos/JobFilters";
import {
  FILTROS_VACIOS,
  filtrarVacantes,
  filtrosToQuery,
  type FiltrosVacantes,
} from "@/lib/filtros-vacantes";

interface EmpleosBoardProps {
  vacantes: Vacante[];
  initialSelectedId?: string;
  initialFiltros?: FiltrosVacantes;
}

export function EmpleosBoard({ vacantes, initialSelectedId, initialFiltros = FILTROS_VACIOS }: EmpleosBoardProps) {
  const [filtros, setFiltros] = useState(initialFiltros);
  const filtradas = useMemo(() => filtrarVacantes(vacantes, filtros), [vacantes, filtros]);

  const initialId = vacantes.some((v) => v.id === initialSelectedId)
    ? initialSelectedId
    : (filtradas[0]?.id ?? null);
  const [selectedId, setSelectedId] = useState<string | null>(initialId ?? null);
  const [mobileView, setMobileView] = useState<"list" | "detail">(
    initialSelectedId && initialId === initialSelectedId ? "detail" : "list"
  );
  const selectedVacante =
    vacantes.find((v) => v.id === selectedId) ?? (initialSelectedId ? undefined : filtradas[0]);

  // Mantiene los filtros en la URL para poder compartir la búsqueda.
  useEffect(() => {
    const url = `${window.location.pathname}${filtrosToQuery(filtros)}`;
    if (url !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, "", url);
    }
  }, [filtros]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileView("detail");
  };

  return (
    <div className="flex flex-col gap-4 lg:h-full lg:min-h-0">
      <JobFilters filtros={filtros} onChange={setFiltros} />

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-white shadow-md lg:min-h-0 lg:flex-1 lg:grid-cols-[420px_1fr]">
        <div
          className={cn(
            "lg:flex lg:min-h-0 lg:min-w-0 lg:border-r lg:border-border",
            mobileView === "detail" ? "hidden" : "flex"
          )}
        >
          <VacancyList
            vacantes={filtradas}
            total={vacantes.length}
            selectedId={selectedVacante?.id ?? null}
            onSelect={handleSelect}
            onClear={() => setFiltros(FILTROS_VACIOS)}
          />
        </div>

        <div
          className={cn(
            "flex-col lg:flex lg:min-h-0 lg:min-w-0",
            mobileView === "detail" ? "flex" : "hidden"
          )}
        >
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className="flex shrink-0 items-center gap-1.5 border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground lg:hidden"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Volver a vacantes
          </button>
          <div className="min-h-0 flex-1">
            <VacancyPreview vacante={selectedVacante} />
          </div>
        </div>
      </div>
    </div>
  );
}
