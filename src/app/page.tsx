import Testimonials from "@/components/sections/ExpoTalentoTestimonios";
import ExpoTalentoFAQ from "@/components/sections/ExpoTalentoFAQ";
import Footer from "@/components/sections/ExpoTalentoFooter";
import ExpoTalentoStats from "@/components/sections/ExpoTalentoStats";
import { HomeHero } from "@/components/portal/home-hero";
import {
  AudienceCTA,
  CategoryGrid,
  CompaniesStrip,
  EventBanner,
  LatestJobs,
} from "@/components/portal/home-sections";
import { contarCategorias } from "@/components/portal/categorias";
import { getProximoEvento } from "@/lib/eventos";
import { eventJsonLd } from "@/lib/eventos-jsonld";
import { getLogos } from "@/lib/logos";
import { getVacantes } from "@/lib/vacantes-source";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const revalidate = 60;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/empleos?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const vacantes = await getVacantes();
  const evento = getProximoEvento();
  const categorias = contarCategorias(vacantes);
  const populares = categorias.filter((c) => c.total > 0).slice(0, 4).map((c) => c.categoria);
  const jsonLd = evento ? [websiteJsonLd, eventJsonLd(evento)] : [websiteJsonLd];

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <HomeHero totalVacantes={vacantes.length} categoriasPopulares={populares} />
        <LatestJobs vacantes={vacantes.slice(0, 6)} />
        <CategoryGrid categorias={categorias.slice(0, 8)} />
        <CompaniesStrip logos={getLogos("empresas-trimmed").filter((l) => !l.name.startsWith("goxt"))} />
        <AudienceCTA />
        <EventBanner evento={evento} />
        <ExpoTalentoStats />
        <Testimonials />
        <ExpoTalentoFAQ />
      </main>
      <Footer />
    </div>
  );
}
