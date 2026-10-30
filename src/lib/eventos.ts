export interface Evento {
  id: string;
  nombre: string;
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
}

/**
 * Próxima feria de empleo. Al cambiar de evento, actualizar todos los campos.
 * Cuando la fecha `fin` ya pasó, el sitio deja de mostrarlo automáticamente.
 */
export const proximoEvento: Evento = {
  id: "feria-empleo-conectate-la-fortuna-2026",
  nombre: "Feria de Empleo Conéctate La Fortuna 2026",
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
};

/** Devuelve el próximo evento solo si todavía no terminó. */
export function getProximoEvento(now: Date = new Date()): Evento | null {
  return new Date(proximoEvento.fin) > now ? proximoEvento : null;
}
