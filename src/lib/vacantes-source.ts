import { getLogos, type Logo } from "@/lib/logos";
import { resolveCompanyLogo } from "@/lib/company-logo";
import { isVacanteVigente, vacantes as vacantesDeEjemplo, type Vacante } from "@/lib/vacantes";

const VACANTES_ENDPOINT =
  "https://api-crm.goxt.io/api/widget/form/formulario-vacantes-disponibles/answers";

const FIELD_KEYS = {
  tituloPuesto: "4lk8k3v",
  descripcion: "amgeiw0",
  requisitos: "4ef125l",
  categoria: "m8c5x8z",
  cantidadVacantes: "tr9lphl",
  modalidad: "mw7v5uz",
  tipoJornada: "i9q0xgn",
  ubicacion: "egoi7kw",
  experienciaMinima: "ev6jx7m",
  licenciaRequerida: "nanomoa",
  requiereVehiculoPropio: "qhpizwq",
  fechaLimitePostular: "mje9sx4",
} as const;

interface RawAnswerRecord {
  id: number;
  created_at: string;
  answers: Record<string, string | string[] | boolean | undefined>;
  opportunity_id: number;
  person: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    linkedin_url: string | null;
  };
  organization: {
    id: number;
    name: string;
    document_number: string | null;
    web_page: string | null;
    industry: string | null;
  };
  notes: unknown[];
}

interface RawFormResponse {
  success: boolean;
  form: { id: number; name: string; slug: string };
  custom_fields: unknown[];
  answers: RawAnswerRecord[];
}

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function mapAnswerToVacante(raw: RawAnswerRecord, logos: Logo[]): Vacante {
  const respuestas = raw.answers ?? {};
  const empresa = raw.organization?.name?.trim() || "Empresa Confidencial";
  const fechaLimitePostular = toText(respuestas[FIELD_KEYS.fechaLimitePostular]);

  return {
    id: String(raw.id),
    tituloPuesto: toText(respuestas[FIELD_KEYS.tituloPuesto]),
    empresa,
    logoUrl: resolveCompanyLogo(empresa, logos),
    descripcion: toText(respuestas[FIELD_KEYS.descripcion]),
    requisitos: toText(respuestas[FIELD_KEYS.requisitos]),
    categoria: toList(respuestas[FIELD_KEYS.categoria]),
    cantidadVacantes: Number(respuestas[FIELD_KEYS.cantidadVacantes]) || 0,
    modalidad: toList(respuestas[FIELD_KEYS.modalidad]),
    tipoJornada: toList(respuestas[FIELD_KEYS.tipoJornada]),
    ubicacion: toText(respuestas[FIELD_KEYS.ubicacion]),
    experienciaMinima: toList(respuestas[FIELD_KEYS.experienciaMinima]),
    licenciaRequerida: toList(respuestas[FIELD_KEYS.licenciaRequerida]),
    requiereVehiculoPropio: respuestas[FIELD_KEYS.requiereVehiculoPropio] === true,
    fechaPublicacion: raw.created_at,
    fechaLimitePostular: fechaLimitePostular || undefined,
    // No se incluye `contacto` (nombre/correo de la persona que publicó):
    // es dato personal y esta vista es pública sin autenticación.
  };
}

function ordenarPorFecha(vacantes: Vacante[]): Vacante[] {
  return [...vacantes].sort(
    (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
  );
}

/** Vacantes vigentes, de la más nueva a la más antigua. */
export async function getVacantes(): Promise<Vacante[]> {
  // Solo para desarrollo local sin acceso al CRM: VACANTES_MOCK=1 usa los datos de ejemplo.
  if (process.env.VACANTES_MOCK === "1") {
    return ordenarPorFecha(vacantesDeEjemplo.map((v) => ({ ...v, contacto: undefined })));
  }
  return ordenarPorFecha((await getTodasLasVacantes()).filter((v) => isVacanteVigente(v)));
}

/** Todas las vacantes del CRM, incluidas las vencidas (para no romper enlaces compartidos). */
export async function getTodasLasVacantes(): Promise<Vacante[]> {
  if (process.env.VACANTES_MOCK === "1") return getVacantes();
  try {
    const res = await fetch(VACANTES_ENDPOINT, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error("No se pudo obtener las vacantes desde el CRM:", res.status);
      return [];
    }

    const data: RawFormResponse = await res.json();
    if (!data.success || !Array.isArray(data.answers)) return [];

    const logos = getLogos("empresas-trimmed");
    return data.answers.map((raw) => mapAnswerToVacante(raw, logos));
  } catch (error) {
    console.error("No se pudo obtener las vacantes desde el CRM:", error);
    return [];
  }
}
