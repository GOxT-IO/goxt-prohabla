import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/ExpoTalentoFooter";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Prohabla recopila, usa y protege los datos personales de postulantes y empresas.",
  alternates: { canonical: "/privacidad" },
};

// BORRADOR: revisar con el equipo legal antes de publicar.
export default function PrivacidadPage() {
  return (
    <div className="relative">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 md:py-20">
        <article className="flex flex-col gap-6 text-foreground [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <h1 className="text-4xl font-medium tracking-tight text-navy">Política de privacidad</h1>

          <p>
            En Prohabla cuidamos los datos personales que nos compartes al usar este sitio. Esta política explica qué datos recopilamos, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica.
          </p>

          <h2>Qué datos recopilamos</h2>
          <ul>
            <li>Datos de contacto: nombre, correo electrónico y teléfono.</li>
            <li>Datos profesionales que decidas compartir: CV, formación, experiencia y áreas de interés.</li>
            <li>En el caso de empresas: nombre de la organización, persona de contacto y detalle de las vacantes.</li>
          </ul>

          <h2>Para qué los usamos</h2>
          <ul>
            <li>Enviar tu postulación a la empresa que publicó la vacante.</li>
            <li>Compartir tu perfil con empresas participantes en las ferias de empleo de Prohabla.</li>
            <li>Avisarte de nuevas vacantes y próximas ferias, si así lo aceptas.</li>
            <li>Responder tus consultas.</li>
          </ul>

          <h2>Con quién los compartimos</h2>
          <p>
            Solo con las empresas a las que postulas o que participan en nuestras ferias, y con los proveedores tecnológicos que operan los formularios y la base de datos del sitio. No vendemos tus datos.
          </p>

          <h2>Tus derechos</h2>
          <p>
            Puedes solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos, o retirar tu consentimiento, escribiendo a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>{" "}
            o a través del <Link href="/contacto" className="font-medium text-primary underline-offset-4 hover:underline">formulario de contacto</Link>.
          </p>

          <h2>Cambios a esta política</h2>
          <p>Si actualizamos esta política, publicaremos la nueva versión en esta misma página.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
