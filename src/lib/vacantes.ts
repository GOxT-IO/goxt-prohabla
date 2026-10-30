export interface Vacante {
  id: string;
  tituloPuesto: string;
  empresa: string;
  logoUrl?: string;
  descripcion: string;
  requisitos: string;
  categoria: string[];
  cantidadVacantes: number;
  modalidad: string[];
  tipoJornada: string[];
  ubicacion: string;
  experienciaMinima: string[];
  licenciaRequerida: string[];
  requiereVehiculoPropio: boolean;
  fechaPublicacion: string;
  fechaLimitePostular?: string;
  /**
   * Dato interno (nombre/correo de quien publicó la vacante). Nunca debe
   * renderizarse en la vista pública — solo se mantiene aquí por si se
   * necesita para un flujo de postulación server-side a futuro.
   */
  contacto?: {
    nombre: string;
    email: string;
  };
}

function haceDias(dias: number) {
  return new Date(Date.now() - dias * 24 * 60 * 60 * 1000).toISOString();
}

export const DEFAULT_LOGO_URL = "/colaboran-trimmed/Prohabla.png";

export const GOXT_LOGO_URL = "/empresas-trimmed/goxt-negro_13032026183533.png";

export const POSTULACION_FORM_URL =
  "https://crm.goxt.io/widget/form/formulario-de-postulacion";

/**
 * Opciones reales del formulario "Formulario Vacantes Disponibles" (custom_fields
 * de GET /api/widget/form/formulario-vacantes-disponibles/answers), sin espacios
 * sobrantes. El mock usa estos mismos valores para que la UI ya quede probada
 * contra el vocabulario real antes de conectar la API.
 */
export const CATEGORIA_OPTIONS = [
  "Tecnología y Desarrollo",
  "Ventas y Comercial",
  "Atención al Cliente / Call Center",
  "Administración y Finanzas",
  "Recursos Humanos",
  "Logística y Transporte",
  "Producción y Manufactura",
  "Comercio y Retail",
  "Construcción e Ingeniería",
  "Salud",
  "Turismo, Hotelería y Gastronomía",
  "Seguridad",
  "Otro",
] as const;

export const MODALIDAD_OPTIONS = ["Remoto", "Híbrido", "Presencial"] as const;

export const TIPO_JORNADA_OPTIONS = [
  "Tiempo Completo",
  "Medio Tiempo",
  "Por Turnos",
  "Temporal",
] as const;

export const EXPERIENCIA_MINIMA_OPTIONS = [
  "No especifica",
  "Sin experiencia",
  "1 a 2 Años",
  "+2 Años",
] as const;

export const LICENCIA_OPTIONS = ["No aplica", "A1", "B1", "B2", "B3", "B4", "Otra"] as const;

export const vacantes: Vacante[] = [
  {
    id: "1",
    tituloPuesto: "Desarrollador FullStack",
    empresa: "GOxT SpA",
    logoUrl: "/empresas-trimmed/goxt-negro_13032026183533.png",
    descripcion:
      "Desarrollo y mantenimiento de aplicaciones web end-to-end (frontend y backend). Diseño e implementación de APIs REST. Integración con bases de datos y despliegue en la nube.",
    requisitos:
      "Node.js, TypeScript, React/Next.js, PostgreSQL. Experiencia con AWS o Railway deseable.",
    categoria: ["Tecnología y Desarrollo"],
    cantidadVacantes: 2,
    modalidad: ["Híbrido"],
    tipoJornada: ["Tiempo Completo"],
    ubicacion: "Santiago, Chile",
    experienciaMinima: ["1 a 2 Años"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(2),
    fechaLimitePostular: "2026-07-31",
    contacto: {
      nombre: "Kevin Collio",
      email: "kevincollio27@gmail.com",
    },
  },
  {
    id: "2",
    tituloPuesto: "Ejecutivo(a) de Ventas Retail",
    empresa: "Gollo",
    logoUrl: "/empresas-trimmed/GOLLO.png",
    descripcion:
      "Atención a clientes en tienda, cumplimiento de metas de venta mensuales y manejo de caja. Reporte diario de resultados al jefe de local.",
    requisitos:
      "Enseñanza media completa. Experiencia previa en atención al cliente o ventas retail.",
    categoria: ["Comercio y Retail"],
    cantidadVacantes: 3,
    modalidad: [],
    tipoJornada: ["Tiempo Completo"],
    ubicacion: "Las Condes, Santiago",
    experienciaMinima: [],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(4),
    fechaLimitePostular: "2026-08-05",
    contacto: {
      nombre: "Fernanda Rojas",
      email: "seleccion@gollo.cl",
    },
  },
  {
    id: "3",
    tituloPuesto: "Conductor(a) de Reparto",
    empresa: "Overseas Logistic",
    logoUrl: "/empresas-trimmed/OVERSEAS%20LOGISTIC.png",
    descripcion:
      "Reparto de mercadería en ruta asignada, control de guías de despacho y coordinación con bodega para la carga diaria.",
    requisitos:
      "Licencia clase B al día. Disponibilidad para trabajar por turnos, incluidos fines de semana.",
    categoria: ["Logística y Transporte"],
    cantidadVacantes: 1,
    modalidad: ["Presencial"],
    tipoJornada: ["Por Turnos"],
    ubicacion: "Santiago, Chile",
    experienciaMinima: ["1 a 2 Años"],
    licenciaRequerida: ["B1"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(6),
    fechaLimitePostular: "2026-07-28",
    contacto: {
      nombre: "Marco Salinas",
      email: "rrhh@overseaslogistic.cl",
    },
  },
  {
    id: "4",
    tituloPuesto:
      "Analista Senior de Ciberseguridad y Cumplimiento Normativo ISO 27001",
    empresa: "Deloitte",
    logoUrl: "/empresas-trimmed/DELOITTE.png",
    descripcion:
      "Buscamos un(a) Analista Senior de Ciberseguridad para liderar la evaluación de riesgos, la gestión de vulnerabilidades y el cumplimiento normativo de nuestros clientes corporativos. La persona seleccionada trabajará junto al equipo de arquitectura para diseñar controles de seguridad, participará en auditorías internas y externas, y será la contraparte técnica en la implementación y mantenimiento del Sistema de Gestión de Seguridad de la Información bajo la norma ISO 27001. También se espera que colabore en la respuesta a incidentes y en la elaboración de informes ejecutivos para la gerencia.",
    requisitos:
      "Título profesional en Ingeniería Informática, Ciberseguridad o carrera afín. Certificación CISSP, CISA o ISO 27001 Lead Auditor (deseable). Mínimo 4 años de experiencia en seguridad de la información, gestión de riesgos o auditoría de sistemas. Conocimientos de frameworks NIST, ISO 27001 y CIS Controls.",
    categoria: ["Tecnología y Desarrollo"],
    cantidadVacantes: 1,
    modalidad: ["Híbrido", "Remoto"],
    tipoJornada: ["Tiempo Completo"],
    ubicacion: "Providencia, Santiago",
    experienciaMinima: ["+2 Años"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(1),
    fechaLimitePostular: "2026-08-15",
    contacto: {
      nombre: "Paula Méndez",
      email: "talento@deloitte.cl",
    },
  },
  {
    id: "5",
    tituloPuesto: "Jefe(a) de Bodega",
    empresa: "Carga Internacional",
    logoUrl: "/empresas-trimmed/CARGA%20INTERNACIONAL.png",
    descripcion:
      "Control de inventario, recepción y despacho de mercadería, y supervisión del equipo de bodega en turno diurno.",
    requisitos: "Experiencia liderando equipos de bodega. Manejo de Excel.",
    categoria: ["Logística y Transporte"],
    cantidadVacantes: 1,
    modalidad: ["Presencial"],
    tipoJornada: [],
    ubicacion: "San Bernardo, Santiago",
    experienciaMinima: ["+2 Años"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(3),
    fechaLimitePostular: "2026-08-01",
    contacto: {
      nombre: "Ignacio Torres",
      email: "rrhh@cargainternacional.cl",
    },
  },
  {
    id: "6",
    tituloPuesto: "Community Manager",
    empresa: "Agencia Creativa Norte",
    descripcion:
      "Planificación y publicación de contenido para redes sociales de clientes, monitoreo de métricas y coordinación con el equipo de diseño para campañas mensuales.",
    requisitos:
      "Experiencia en manejo de Instagram, TikTok y Meta Business Suite. Redacción publicitaria.",
    categoria: ["Otro"],
    cantidadVacantes: 2,
    modalidad: ["Remoto", "Híbrido", "Presencial"],
    tipoJornada: ["Tiempo Completo"],
    ubicacion: "Santiago, Chile",
    experienciaMinima: ["1 a 2 Años"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(5),
    fechaLimitePostular: "2026-08-10",
    contacto: {
      nombre: "Camila Vidal",
      email: "postulaciones@agenciacreativanorte.cl",
    },
  },
  {
    id: "7",
    tituloPuesto: "Asistente Contable",
    empresa: "Estudio Contable Ramírez y Asociados",
    descripcion:
      "Apoyo en la contabilización de documentos tributarios, conciliaciones bancarias y preparación de reportes mensuales para la cartera de clientes del estudio.",
    requisitos:
      "Estudiante o técnico en Contabilidad. Manejo de Excel intermedio. Se valora experiencia con software contable.",
    categoria: [],
    cantidadVacantes: 1,
    modalidad: ["Presencial"],
    tipoJornada: ["Medio Tiempo"],
    ubicacion: "Ñuñoa, Santiago",
    experienciaMinima: ["Sin experiencia"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(8),
    fechaLimitePostular: "2026-08-20",
    contacto: {
      nombre: "Daniela Soto",
      email: "contacto@ramirezyasociados.cl",
    },
  },
  {
    id: "8",
    tituloPuesto: "Cajero(a) Supermercado",
    empresa: "Supermercados Líder Express",
    descripcion: "Atención de caja, cobro y empaque de productos en turno rotativo.",
    requisitos: "Enseñanza media completa o cursando. Buena disposición de trato al público.",
    categoria: ["Comercio y Retail"],
    cantidadVacantes: 5,
    modalidad: ["Presencial"],
    tipoJornada: ["Por Turnos"],
    ubicacion: "Maipú, Santiago",
    experienciaMinima: ["Sin experiencia"],
    licenciaRequerida: [],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(10),
    fechaLimitePostular: "2026-08-02",
    contacto: {
      nombre: "Rodrigo Peña",
      email: "seleccion@liderexpress.cl",
    },
  },
  {
    id: "9",
    tituloPuesto:
      "Ingeniero(a) DevOps Cloud con experiencia en Kubernetes, CI/CD y observabilidad",
    empresa: "Global Skill Center",
    logoUrl: "/empresas-trimmed/GLOBAL%20SKILL%20CENTER.png",
    descripcion:
      "Nos encontramos en búsqueda de un(a) Ingeniero(a) DevOps para fortalecer nuestro equipo de plataforma. La persona será responsable de diseñar, implementar y mantener pipelines de integración y despliegue continuo, administrar clústeres de Kubernetes en producción, y trabajar en conjunto con los equipos de desarrollo para mejorar la confiabilidad y observabilidad de los servicios. Se espera participación activa en la definición de estándares de infraestructura como código, automatización de procesos de monitoreo y en la respuesta ante incidentes críticos de producción, incluyendo turnos de guardia rotativos.",
    requisitos:
      "Experiencia sólida con AWS o GCP, Docker, Kubernetes, Terraform y herramientas de CI/CD (GitHub Actions, GitLab CI o Jenkins). Conocimientos de Prometheus/Grafana y buenas prácticas de SRE.",
    categoria: ["Tecnología y Desarrollo"],
    cantidadVacantes: 2,
    modalidad: ["Remoto"],
    tipoJornada: ["Tiempo Completo"],
    ubicacion: "Santiago, Chile",
    experienciaMinima: ["+2 Años"],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(15),
    fechaLimitePostular: "2026-09-01",
    contacto: {
      nombre: "Tomás Herrera",
      email: "jobs@globalskillcenter.cl",
    },
  },
  {
    id: "10",
    tituloPuesto: "Reponedor(a) de Mercadería Turno Noche",
    empresa: "Grupo Dipo",
    logoUrl: "/empresas-trimmed/GRUPO%20DIPO.png",
    descripcion:
      "Reposición de mercadería en sala de ventas durante turno noche, orden de bodega y apoyo en inventarios periódicos.",
    requisitos: "Disponibilidad para trabajar en turno noche. Trabajo en equipo.",
    categoria: ["Logística y Transporte", "Comercio y Retail"],
    cantidadVacantes: 4,
    modalidad: ["Presencial"],
    tipoJornada: ["Por Turnos"],
    ubicacion: "Quilicura, Santiago",
    experienciaMinima: [],
    licenciaRequerida: ["No aplica"],
    requiereVehiculoPropio: false,
    fechaPublicacion: haceDias(20),
    fechaLimitePostular: "2026-08-25",
    contacto: {
      nombre: "Valentina Muñoz",
      email: "rrhh@grupodipo.cl",
    },
  },
];

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatRelativeDate(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Hoy";
  if (days === 1) return "hace 1 día";
  if (days < 7) return `hace ${days} días`;

  const semanas = Math.floor(days / 7);
  if (semanas < 4) return semanas === 1 ? "hace 1 semana" : `hace ${semanas} semanas`;

  const meses = Math.floor(days / 30);
  return meses <= 1 ? "hace 1 mes" : `hace ${meses} meses`;
}

export function isVacanteNueva(vacante: Vacante): boolean {
  const dias = Math.floor(
    (Date.now() - new Date(vacante.fechaPublicacion).getTime()) / (1000 * 60 * 60 * 24)
  );
  return dias <= 1;
}

/** Una vacante sigue vigente hasta el final del día de su fecha límite. */
export function isVacanteVigente(vacante: Vacante, now: Date = new Date()): boolean {
  if (!vacante.fechaLimitePostular) return true;
  const limite = new Date(`${vacante.fechaLimitePostular.slice(0, 10)}T23:59:59-06:00`);
  return Number.isNaN(limite.getTime()) || limite >= now;
}

export function vacanteCierraProximo(vacante: Vacante): boolean {
  if (!vacante.fechaLimitePostular) return false;
  const dias = Math.ceil(
    (new Date(vacante.fechaLimitePostular).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return dias >= 0 && dias <= 3;
}

export function formatList(values: string[], fallback = "No especificado"): string {
  const clean = values.map((v) => v.trim()).filter(Boolean);
  return clean.length > 0 ? clean.join(" / ") : fallback;
}

export function joinNonEmpty(parts: (string | null | undefined)[], separator = " · "): string {
  return parts.filter((p): p is string => Boolean(p && p.trim())).join(separator);
}

export function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\p{L}+/gu, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

export function toSentenceCase(value: string): string {
  const trimmed = value.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : trimmed;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
