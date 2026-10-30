import type { Metadata } from "next";
import Footer from "@/components/sections/ExpoTalentoFooter";
import ExpoTalentoPostulantesHero from "@/components/sections/ExpoTalentoPostulantesHero";

export const metadata: Metadata = {
  title: "Registra tu CV",
  description:
    "Regístrate gratis en Prohabla y deja tu CV listo para las empresas. Entérate de nuevas vacantes y de las próximas ferias de empleo en Costa Rica.",
  alternates: { canonical: "/postulantes" },
};

export default function PostulantesPage() {
  return (
    <div className="relative">
      <main>
        <ExpoTalentoPostulantesHero />
      </main>
      <Footer />
    </div>
  );
}
