import type { Vacante } from "@/lib/vacantes";

export interface FiltrosVacantes {
  q: string;
  ubicacion: string;
  categoria: string;
  modalidad: string;
  jornada: string;
  experiencia: string;
}

export const FILTROS_VACIOS: FiltrosVacantes = {
  q: "",
  ubicacion: "",
  categoria: "",
  modalidad: "",
  jornada: "",
  experiencia: "",
};

type SearchParams = Record<string, string | string[] | undefined>;

export function parseFiltros(params: SearchParams): FiltrosVacantes {
  const get = (key: keyof FiltrosVacantes) => {
    const value = params[key];
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  };
  return {
    q: get("q"),
    ubicacion: get("ubicacion"),
    categoria: get("categoria"),
    modalidad: get("modalidad"),
    jornada: get("jornada"),
    experiencia: get("experiencia"),
  };
}

export function filtrosToQuery(filtros: FiltrosVacantes): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filtros)) {
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

function normalizar(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function filtrarVacantes(vacantes: Vacante[], filtros: FiltrosVacantes): Vacante[] {
  const q = normalizar(filtros.q);
  const ubicacion = normalizar(filtros.ubicacion);

  return vacantes.filter((v) => {
    if (q) {
      const texto = normalizar([v.tituloPuesto, v.empresa, v.descripcion, v.categoria.join(" ")].join(" "));
      if (!q.split(/\s+/).every((palabra) => texto.includes(palabra))) return false;
    }
    if (ubicacion && !normalizar(v.ubicacion).includes(ubicacion)) return false;
    if (filtros.categoria && !v.categoria.includes(filtros.categoria)) return false;
    if (filtros.modalidad && !v.modalidad.includes(filtros.modalidad)) return false;
    if (filtros.jornada && !v.tipoJornada.includes(filtros.jornada)) return false;
    if (filtros.experiencia && !v.experienciaMinima.includes(filtros.experiencia)) return false;
    return true;
  });
}
