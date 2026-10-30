import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobSearchFormProps {
  defaultQuery?: string;
  defaultUbicacion?: string;
}

/** Buscador del portal. Envía por GET a /empleos, así funciona aun sin JavaScript. */
export function JobSearchForm({ defaultQuery, defaultUbicacion }: JobSearchFormProps) {
  return (
    <form
      action="/empleos"
      method="get"
      role="search"
      className="flex w-full flex-col gap-2 rounded-2xl border border-border bg-white p-2 shadow-lg shadow-navy/5 sm:flex-row sm:items-center sm:rounded-full"
    >
      <label className="flex flex-1 items-center gap-2 px-3">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="sr-only">Cargo, empresa o palabra clave</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Cargo, empresa o palabra clave"
          className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </label>
      <span className="hidden h-8 w-px bg-border sm:block" aria-hidden />
      <label className="flex flex-1 items-center gap-2 border-t border-border px-3 sm:border-t-0">
        <MapPin className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <span className="sr-only">Ubicación</span>
        <input
          type="text"
          name="ubicacion"
          defaultValue={defaultUbicacion}
          placeholder="Provincia o cantón"
          className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </label>
      <Button type="submit" className="h-12 rounded-xl px-6 text-base sm:rounded-full">
        Buscar empleos
      </Button>
    </form>
  );
}
