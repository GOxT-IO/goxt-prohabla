import { EmpleosBoard } from "@/components/empleos/EmpleosBoard";
import { getVacantes } from "@/lib/vacantes-source";
import type { FiltrosVacantes } from "@/lib/filtros-vacantes";
import type { Vacante } from "@/lib/vacantes";

interface ExpoTalentoEmpleosHeroProps {
  initialSelectedId?: string;
  initialFiltros?: FiltrosVacantes;
  /** Vacante vencida abierta desde un enlace directo: se muestra aunque ya no esté en la lista. */
  vacanteExtra?: Vacante;
}

export default async function ExpoTalentoEmpleosHero({
  initialSelectedId,
  initialFiltros,
  vacanteExtra,
}: ExpoTalentoEmpleosHeroProps) {
  const vigentes = await getVacantes();
  const vacantes =
    vacanteExtra && !vigentes.some((v) => v.id === vacanteExtra.id) ? [vacanteExtra, ...vigentes] : vigentes;

  return (
    <section className="relative isolate overflow-hidden pt-6 pb-10 md:pt-10" style={{ background: "#F7FBFE" }}>
      <div className="page-bg-grid" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium tracking-tight text-navy md:text-4xl">
            Empleos en <span className="text-primary">Costa Rica</span>
          </h1>
          <p className="text-muted-foreground">
            Vacantes publicadas por empresas que participan en Prohabla. Postular es gratis.
          </p>
        </div>
        <div className="lg:h-[calc(100vh-8rem)] lg:min-h-[640px]">
          <EmpleosBoard
            vacantes={vacantes}
            initialSelectedId={initialSelectedId}
            initialFiltros={initialFiltros}
          />
        </div>
      </div>
    </section>
  );
}
