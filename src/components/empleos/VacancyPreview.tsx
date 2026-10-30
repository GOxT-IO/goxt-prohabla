import { Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import ShareButtons from "@/components/sections/blog-share-buttons";
import {
  DEFAULT_LOGO_URL,
  GOXT_LOGO_URL,
  POSTULACION_FORM_URL,
  formatDate,
  formatList,
  formatRelativeDate,
  getInitials,
  isVacanteVigente,
  joinNonEmpty,
  toSentenceCase,
  toTitleCase,
  type Vacante,
} from "@/lib/vacantes";
import { SITE_URL } from "@/lib/site-config";

interface VacancyPreviewProps {
  vacante: Vacante | undefined;
}

export function VacancyPreview({ vacante }: VacancyPreviewProps) {
  if (!vacante) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <Briefcase className="size-10 opacity-30" />
        <p className="text-base">Selecciona una vacante para ver el detalle</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-20 shrink-0 rounded-lg border border-border bg-white">
            <AvatarImage
              src={vacante.logoUrl ?? DEFAULT_LOGO_URL}
              alt=""
              className="object-contain p-2"
            />
            <AvatarFallback className="rounded-lg">
              {getInitials(vacante.empresa)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{toTitleCase(vacante.empresa)}</p>
            <h2 className="text-2xl font-semibold text-navy">{toTitleCase(vacante.tituloPuesto)}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {joinNonEmpty([
                toTitleCase(vacante.ubicacion),
                formatList(vacante.modalidad, ""),
                formatRelativeDate(vacante.fechaPublicacion),
              ])}
            </p>
          </div>
        </div>

        {!isVacanteVigente(vacante) && (
          <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">
            Esta vacante ya cerró. Revisa otras oportunidades disponibles.
          </p>
        )}

        <div className="mt-5 flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 flex-1 rounded-full text-base" disabled={!isVacanteVigente(vacante)}>
                Postular
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[85vh] max-h-180 w-[calc(100%-2rem)] flex-col sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>Postulando a: {toTitleCase(vacante.tituloPuesto)}</DialogTitle>
              </DialogHeader>
              <iframe
                src={`${POSTULACION_FORM_URL}?ref=${vacante.id}&ref_label=${encodeURIComponent(vacante.tituloPuesto)}`}
                title="Formulario de postulación"
                className="min-h-0 flex-1 rounded-lg border-none"
              />
              <a
                href={`${POSTULACION_FORM_URL}?ref=${vacante.id}&ref_label=${encodeURIComponent(vacante.tituloPuesto)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs text-muted-foreground hover:text-foreground"
              >
                ¿No carga el formulario? Ábrelo en una pestaña nueva
              </a>
            </DialogContent>
          </Dialog>

          <ShareButtons
            title={toTitleCase(vacante.tituloPuesto)}
            url={`${SITE_URL}/empleos/${vacante.id}`}
            className="mt-0 shrink-0"
            showLabel={false}
          />
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-14 shrink-0 rounded-lg bg-white">
            <AvatarImage
              src={vacante.logoUrl ?? DEFAULT_LOGO_URL}
              alt={vacante.empresa}
              className="object-contain p-1"
            />
            <AvatarFallback className="rounded-lg text-xs">
              {getInitials(vacante.empresa)}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-foreground">
            Puesto ofrecido por{" "}
            <span className="font-semibold text-navy">{toTitleCase(vacante.empresa)}</span>
          </p>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-navy">Descripción</h3>
          <p className="text-sm leading-relaxed text-foreground">{toSentenceCase(vacante.descripcion)}</p>
        </div>

        {vacante.requisitos && (
          <div className="mt-5 flex flex-col gap-1.5">
            <h3 className="font-semibold text-navy">Requisitos</h3>
            <p className="text-sm leading-relaxed text-foreground">{toSentenceCase(vacante.requisitos)}</p>
          </div>
        )}

        <Separator className="my-4" />

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Categoría</dt>
            <dd className="font-medium text-foreground">{formatList(vacante.categoria)}</dd>
          </div>
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Tipo de jornada</dt>
            <dd className="font-medium text-foreground">{formatList(vacante.tipoJornada)}</dd>
          </div>
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Experiencia mínima</dt>
            <dd className="font-medium text-foreground">
              {formatList(vacante.experienciaMinima)}
            </dd>
          </div>
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Licencia requerida</dt>
            <dd className="font-medium text-foreground">
              {formatList(vacante.licenciaRequerida)}
            </dd>
          </div>
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Requiere vehículo propio</dt>
            <dd className="font-medium text-foreground">
              {vacante.requiereVehiculoPropio ? "Sí" : "No"}
            </dd>
          </div>
          <div className="flex justify-between gap-2 sm:flex-col sm:gap-0.5">
            <dt className="text-muted-foreground">Fecha límite para postular</dt>
            <dd className="font-medium text-foreground">
              {vacante.fechaLimitePostular
                ? formatDate(vacante.fechaLimitePostular)
                : "No especificado"}
            </dd>
          </div>
        </dl>

        <Separator className="my-5" />

        <a
          href="https://goxt.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <p className="text-xs text-muted-foreground">Impulsado con tecnología de</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GOXT_LOGO_URL} alt="GOxT" className="h-4 w-auto object-contain" />
        </a>
      </div>
    </div>
  );
}
