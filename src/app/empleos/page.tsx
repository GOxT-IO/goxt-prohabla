import type { Metadata } from "next";
import Footer from "@/components/sections/ExpoTalentoFooter";
import ExpoTalentoEmpleosHero from "@/components/sections/ExpoTalentoEmpleosHero";
import { parseFiltros } from "@/lib/filtros-vacantes";

export const metadata: Metadata = {
  title: "Empleos en Costa Rica",
  description:
    "Vacantes de empleo y prácticas en Costa Rica publicadas por empresas que participan en Prohabla. Filtra por categoría, modalidad, jornada y ubicación, y postula gratis.",
  alternates: { canonical: "/empleos" },
};

export default async function EmpleosPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filtros = parseFiltros(await searchParams);

  return (
    <div className="relative">
      <main>
        <ExpoTalentoEmpleosHero initialFiltros={filtros} />
      </main>
      <Footer />
    </div>
  );
}
