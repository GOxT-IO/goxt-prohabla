"use client";

import { MapPin, SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CATEGORIA_OPTIONS,
  EXPERIENCIA_MINIMA_OPTIONS,
  MODALIDAD_OPTIONS,
  TIPO_JORNADA_OPTIONS,
} from "@/lib/vacantes";
import { FILTROS_VACIOS, type FiltrosVacantes } from "@/lib/filtros-vacantes";

interface JobFiltersProps {
  filtros: FiltrosVacantes;
  onChange: (filtros: FiltrosVacantes) => void;
}

const SELECTS: { key: keyof FiltrosVacantes; label: string; options: readonly string[] }[] = [
  { key: "categoria", label: "Categoría", options: CATEGORIA_OPTIONS },
  { key: "modalidad", label: "Modalidad", options: MODALIDAD_OPTIONS },
  { key: "jornada", label: "Jornada", options: TIPO_JORNADA_OPTIONS },
  { key: "experiencia", label: "Experiencia", options: EXPERIENCIA_MINIMA_OPTIONS.filter((o) => o !== "No especifica") },
];

export function JobFilters({ filtros, onChange }: JobFiltersProps) {
  const set = (key: keyof FiltrosVacantes, value: string) => onChange({ ...filtros, [key]: value });
  const hayFiltros = Object.values(filtros).some(Boolean);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-3 shadow-sm" role="search" aria-label="Filtrar vacantes">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <label className="relative">
          <span className="sr-only">Cargo, empresa o palabra clave</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            placeholder="Cargo, empresa o palabra clave"
            className="h-11 pl-9 text-base md:text-sm"
            value={filtros.q}
            onChange={(e) => set("q", e.target.value)}
          />
        </label>
        <label className="relative">
          <span className="sr-only">Ubicación</span>
          <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            placeholder="Provincia o cantón"
            className="h-11 pl-9 text-base md:text-sm"
            value={filtros.ubicacion}
            onChange={(e) => set("ubicacion", e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {SELECTS.map(({ key, label, options }) => (
          <label key={key} className="min-w-[calc(50%-0.25rem)] flex-1 sm:min-w-40 sm:flex-none">
            <span className="sr-only">{label}</span>
            <select
              value={filtros[key]}
              onChange={(e) => set(key, e.target.value)}
              className="h-10 w-full rounded-full border border-border bg-white px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[active=true]:border-primary data-[active=true]:text-primary"
              data-active={Boolean(filtros[key])}
            >
              <option value="">{label}: todas</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}
        {hayFiltros && (
          <Button type="button" variant="ghost" className="h-10 rounded-full" onClick={() => onChange(FILTROS_VACIOS)}>
            <X aria-hidden /> Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
