export const TIPOS_EVENTO = ["Feria de empleo", "Taller", "Charla"] as const;
export type TipoEvento = (typeof TIPOS_EVENTO)[number];

export interface Evento {
  /** Identificador único en minúsculas y con guiones; se usa en la URL. */
  id: string;
  tipo: TipoEvento;
  nombre: string;
  /** Resumen de una o dos frases para la agenda. */
  descripcion?: string;
  diaSemana: string;
  fecha: string;
  horario: string;
  horarioNota: string;
  entrada: string;
  institucion: string;
  sede: string;
  /** Inicio y fin en ISO 8601 con zona horaria de Costa Rica. */
  inicio: string;
  fin: string;
  addressLocality: string;
  latitude?: number;
  longitude?: number;
  /** URL de Google Maps embebible (opcional). */
  mapaEmbedUrl?: string;
  /** true si el evento es virtual (Zoom, Meet, etc.). */
  enLinea?: boolean;
  /** Formulario de inscripción propio del evento. Si falta, se usa el registro de postulantes. */
  inscripcionUrl?: string;
}

/**
 * Agenda de Prohabla: ferias, talleres y charlas.
 * Para sumar un evento, agrega un objeto a esta lista; el sitio lo ordena por fecha,
 * lo muestra en /agenda y en la home, y lo mueve a "Eventos realizados" cuando termina.
 */
export const agenda: Evento[] = [
  {
    id: "feria-empleo-conectate-la-fortuna-2026",
    tipo: "Feria de empleo",
    nombre: "Feria de Empleo Conéctate La Fortuna 2026",
    descripcion:
      "Feria de empleo presencial con empresas de turismo, comercio y servicios de la zona norte.",
    diaSemana: "Jueves",
    fecha: "17 de septiembre, 2026",
    horario: "10:00 AM – 4:00 PM",
    horarioNota: "Puedes llegar en cualquier momento del horario",
    entrada: "Entrada libre",
    institucion: "CTP La Fortuna",
    sede: "Finca del CTP, La Fortuna, San Carlos",
    inicio: "2026-09-17T10:00:00-06:00",
    fin: "2026-09-17T16:00:00-06:00",
    addressLocality: "La Fortuna, San Carlos",
    latitude: 10.470251989660488,
    longitude: -84.64013292496246,
    mapaEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4832.711726924088!2d-84.64013292496246!3d10.470251989660488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDI4JzEyLjkiTiA4NMKwMzgnMTUuMiJX!5e1!3m2!1ses!2scl!4v1788868723826!5m2!1ses!2scl",
  },
];

const porInicio = (a: Evento, b: Evento) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime();

/** Eventos que todavía no terminan, del más cercano al más lejano. */
export function getEventosProximos(now: Date = new Date()): Evento[] {
  return agenda.filter((e) => new Date(e.fin) > now).sort(porInicio);
}

/** Eventos ya realizados, del más reciente al más antiguo. */
export function getEventosPasados(now: Date = new Date()): Evento[] {
  return agenda.filter((e) => new Date(e.fin) <= now).sort((a, b) => porInicio(b, a));
}

export function getEvento(id: string): Evento | undefined {
  return agenda.find((e) => e.id === id);
}

/** La próxima feria de empleo (no talleres ni charlas), o null si no hay ninguna agendada. */
export function getProximoEvento(now: Date = new Date()): Evento | null {
  return getEventosProximos(now).find((e) => e.tipo === "Feria de empleo") ?? null;
}

const ZONA_CR = "America/Costa_Rica";

/** Día y mes abreviado para el bloque de fecha de la agenda, en hora de Costa Rica. */
export function partesFecha(iso: string) {
  const fecha = new Date(iso);
  return {
    dia: new Intl.DateTimeFormat("es-CR", { day: "numeric", timeZone: ZONA_CR }).format(fecha),
    mes: new Intl.DateTimeFormat("es-CR", { month: "short", timeZone: ZONA_CR }).format(fecha).replace(".", ""),
    mesAnio: new Intl.DateTimeFormat("es-CR", { month: "long", year: "numeric", timeZone: ZONA_CR }).format(fecha),
  };
}

function aFechaCalendario(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Enlace para agregar el evento a Google Calendar. */
export function googleCalendarUrl(evento: Evento) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: evento.nombre,
    dates: `${aFechaCalendario(evento.inicio)}/${aFechaCalendario(evento.fin)}`,
    details: evento.descripcion ?? "",
    location: `${evento.institucion}, ${evento.sede}`,
    ctz: ZONA_CR,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Archivo .ics (Apple Calendar, Outlook) con el evento. */
export function eventoIcs(evento: Evento, siteUrl: string) {
  const escapar = (texto: string) => texto.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prohabla//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${evento.id}@prohabla.org`,
    `DTSTAMP:${aFechaCalendario(new Date().toISOString())}`,
    `DTSTART:${aFechaCalendario(evento.inicio)}`,
    `DTEND:${aFechaCalendario(evento.fin)}`,
    `SUMMARY:${escapar(evento.nombre)}`,
    `DESCRIPTION:${escapar(evento.descripcion ?? "")}`,
    `LOCATION:${escapar(`${evento.institucion}, ${evento.sede}`)}`,
    `URL:${siteUrl}/agenda#${evento.id}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

/** Enlace de Google Maps para llegar al lugar. */
export function comoLlegarUrl(evento: Evento) {
  const destino =
    evento.latitude != null && evento.longitude != null
      ? `${evento.latitude},${evento.longitude}`
      : `${evento.institucion}, ${evento.sede}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
}
