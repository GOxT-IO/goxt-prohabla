import type { Metadata } from "next";
import ExpoTalentoEmpresasHero from "@/components/sections/ExpoTalentoEmpresasHero";
import Footer from "@/components/sections/ExpoTalentoFooter";

export const metadata: Metadata = {
  title: "Publica tus vacantes",
  description:
    "Publica tus vacantes sin costo en Prohabla y participa en nuestras ferias de empleo. Conecta con estudiantes, egresados y jóvenes profesionales de Costa Rica.",
  alternates: { canonical: "/empresas" },
};

export default function EmpresasPage() {
  return (
    <div className="relative">
      <main>
        <ExpoTalentoEmpresasHero />
      </main>
      <Footer />
    </div>
  );
}
