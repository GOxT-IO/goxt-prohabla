import {
  Briefcase,
  Calculator,
  Factory,
  HardHat,
  Headset,
  HeartPulse,
  Laptop,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Truck,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIA_OPTIONS, type Vacante } from "@/lib/vacantes";

const ICONOS: Record<string, LucideIcon> = {
  "Tecnología y Desarrollo": Laptop,
  "Ventas y Comercial": TrendingUp,
  "Atención al Cliente / Call Center": Headset,
  "Administración y Finanzas": Calculator,
  "Recursos Humanos": Users,
  "Logística y Transporte": Truck,
  "Producción y Manufactura": Factory,
  "Comercio y Retail": ShoppingBag,
  "Construcción e Ingeniería": HardHat,
  Salud: HeartPulse,
  "Turismo, Hotelería y Gastronomía": UtensilsCrossed,
  Seguridad: ShieldCheck,
};

export function iconoCategoria(categoria: string): LucideIcon {
  return ICONOS[categoria] ?? Briefcase;
}

/** Categorías del formulario de vacantes con su cantidad de vacantes, de mayor a menor. */
export function contarCategorias(vacantes: Vacante[]) {
  return CATEGORIA_OPTIONS.filter((c) => c !== "Otro")
    .map((categoria) => ({
      categoria,
      total: vacantes.filter((v) => v.categoria.includes(categoria)).length,
    }))
    .sort((a, b) => b.total - a.total);
}

export function hrefCategoria(categoria: string) {
  return `/empleos?categoria=${encodeURIComponent(categoria)}`;
}
