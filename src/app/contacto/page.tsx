import type { Metadata } from "next";
import ExpoTalentoContact from "@/components/sections/expo-talento-contact";
import Footer from "@/components/sections/ExpoTalentoFooter";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes dudas o consultas? Escríbenos y el equipo de Prohabla te ayuda.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="relative">
      <main>
        <ExpoTalentoContact />
      </main>
      <Footer />
    </div>
  );
}
