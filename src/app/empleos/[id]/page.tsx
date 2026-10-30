import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/ExpoTalentoFooter";
import ExpoTalentoEmpleosHero from "@/components/sections/ExpoTalentoEmpleosHero";
import { getTodasLasVacantes } from "@/lib/vacantes-source";
import { isVacanteVigente, toTitleCase, type Vacante } from "@/lib/vacantes";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

interface EmpleoPageProps {
  params: Promise<{ id: string }>;
}

async function getVacante(id: string) {
  const vacantes = await getTodasLasVacantes();
  return vacantes.find((v) => v.id === id);
}

export async function generateMetadata({ params }: EmpleoPageProps): Promise<Metadata> {
  const { id } = await params;
  const vacante = await getVacante(id);

  if (!vacante) {
    return { title: "Vacante no encontrada", robots: { index: false } };
  }

  const title = `${toTitleCase(vacante.tituloPuesto)} en ${toTitleCase(vacante.empresa)}`;
  const description =
    vacante.descripcion.length > 160
      ? `${vacante.descripcion.slice(0, 157)}...`
      : vacante.descripcion;
  const url = `${SITE_URL}/empleos/${vacante.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: isVacanteVigente(vacante) ? undefined : { index: false },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  "Tiempo Completo": "FULL_TIME",
  "Medio Tiempo": "PART_TIME",
  Temporal: "TEMPORARY",
  "Por Turnos": "OTHER",
};

/** Datos estructurados para Google for Jobs. */
function jobPostingJsonLd(vacante: Vacante) {
  const remoto = vacante.modalidad.includes("Remoto");
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: toTitleCase(vacante.tituloPuesto),
    description: [vacante.descripcion, vacante.requisitos && `Requisitos: ${vacante.requisitos}`]
      .filter(Boolean)
      .join("\n\n"),
    identifier: { "@type": "PropertyValue", name: SITE_NAME, value: vacante.id },
    datePosted: vacante.fechaPublicacion,
    ...(vacante.fechaLimitePostular
      ? { validThrough: `${vacante.fechaLimitePostular.slice(0, 10)}T23:59:59-06:00` }
      : {}),
    employmentType: vacante.tipoJornada.map((j) => EMPLOYMENT_TYPE[j] ?? "OTHER"),
    hiringOrganization: {
      "@type": "Organization",
      name: toTitleCase(vacante.empresa),
      ...(vacante.logoUrl ? { logo: `${SITE_URL}${vacante.logoUrl}` } : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(vacante.ubicacion ? { addressLocality: toTitleCase(vacante.ubicacion) } : {}),
        addressCountry: "CR",
      },
    },
    ...(remoto
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Costa Rica" } }
      : {}),
    ...(vacante.cantidadVacantes > 0 ? { totalJobOpenings: vacante.cantidadVacantes } : {}),
    directApply: true,
    url: `${SITE_URL}/empleos/${vacante.id}`,
  };
}

export default async function EmpleoPage({ params }: EmpleoPageProps) {
  const { id } = await params;
  const vacante = await getVacante(id);
  if (!vacante) notFound();

  return (
    <div className="relative">
      {isVacanteVigente(vacante) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(vacante)) }}
        />
      )}
      <main>
        <ExpoTalentoEmpleosHero initialSelectedId={id} vacanteExtra={vacante} />
      </main>
      <Footer />
    </div>
  );
}
