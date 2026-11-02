"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CrmFormEmbedProps {
  src: string;
  title: string;
  /** Alto en px para pantallas grandes; en celular se usa más alto porque los campos se apilan. */
  desktopHeight?: number;
  className?: string;
}

const CRM_ORIGIN = "https://crm.goxt.io";

/**
 * Formulario del CRM embebido. Si el formulario informa su alto por postMessage
 * ({ height } o { type: "resize", height }), el iframe se ajusta y no queda doble scroll.
 */
export function CrmFormEmbed({ src, title, desktopHeight = 850, className }: CrmFormEmbedProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [altoInformado, setAltoInformado] = useState<number | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CRM_ORIGIN || event.source !== ref.current?.contentWindow) return;
      const height = typeof event.data === "object" && event.data ? Number(event.data.height) : NaN;
      if (Number.isFinite(height) && height > 200) setAltoInformado(Math.ceil(height));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <iframe
        ref={ref}
        src={src}
        title={title}
        loading="lazy"
        className={cn("w-full rounded-2xl border-0 bg-white", !altoInformado && "h-[1100px] lg:h-(--alto)")}
        style={
          altoInformado
            ? { height: altoInformado }
            : ({ "--alto": `${desktopHeight}px` } as React.CSSProperties)
        }
      />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-xs text-muted-foreground hover:text-foreground"
      >
        ¿No carga el formulario? Ábrelo en una pestaña nueva
      </a>
    </div>
  );
}
