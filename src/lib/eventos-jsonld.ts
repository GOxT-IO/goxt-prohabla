import type { Evento } from "@/lib/eventos";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

/** Datos estructurados schema.org/Event para Google. */
export function eventJsonLd(evento: Evento) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.nombre,
    startDate: evento.inicio,
    endDate: evento.fin,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: evento.descripcion ?? `${evento.nombre} en ${evento.institucion}, ${evento.sede}.`,
    image: [`${SITE_URL}/opengraph-image`],
    location: {
      "@type": "Place",
      name: evento.institucion,
      address: {
        "@type": "PostalAddress",
        addressLocality: evento.addressLocality,
        addressCountry: "CR",
      },
      ...(evento.latitude != null && evento.longitude != null
        ? { geo: { "@type": "GeoCoordinates", latitude: evento.latitude, longitude: evento.longitude } }
        : {}),
    },
    organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CRC",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/agenda#${evento.id}`,
    },
  };
}
