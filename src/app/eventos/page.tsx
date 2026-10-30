import type { Metadata } from "next";
import EventsGrid from "@/components/sections/events-grid";
import Footer from "@/components/sections/ExpoTalentoFooter";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Un vistazo a todos los eventos de búsqueda de empleo de Prohabla: ferias pasadas y próximas.",
  alternates: { canonical: "/eventos" },
  openGraph: {
    title: "Eventos | Prohabla",
    description:
      "Un vistazo a todos los eventos de búsqueda de empleo de Prohabla: ferias pasadas y próximas.",
  },
};

export default function EventosPage() {
  return (
    <div className="relative">
      <main>
        <EventsGrid />
      </main>
      <Footer />
    </div>
  );
}
