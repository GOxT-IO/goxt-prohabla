import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { getTodasLasVacantes } from "@/lib/vacantes-source";
import { DEFAULT_LOGO_URL } from "@/lib/vacantes";

export const runtime = "nodejs";
export const alt = "Vacante disponible - Prohabla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function readPublicFileAsDataUri(publicUrl: string) {
  const relativePath = decodeURIComponent(publicUrl.replace(/^\//, ""));
  const filePath = path.join(process.cwd(), "public", relativePath);
  const ext = path.extname(filePath).slice(1) || "png";
  return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

interface OpengraphImageProps {
  params: Promise<{ id: string }>;
}

export default async function OpengraphImage({ params }: OpengraphImageProps) {
  const { id } = await params;
  const vacantes = await getTodasLasVacantes();
  const vacante = vacantes.find((v) => v.id === id);

  const logoSrc = readPublicFileAsDataUri(vacante?.logoUrl ?? DEFAULT_LOGO_URL);
  const empresa = vacante?.empresa ?? "Empresa Confidencial";
  const tituloPuesto = vacante?.tituloPuesto ?? "Oportunidad de Empleo";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: 80,
          gap: 56,
          background: "#F7FBFE",
        }}
      >
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            background: "#ffffff",
            borderRadius: 32,
            padding: 32,
            width: 240,
            height: 240,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 40px rgba(27,42,94,0.12)",
          }}
        >
          <img
            src={logoSrc}
            width={176}
            height={176}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 32, color: "#c41e1e", fontWeight: 600 }}>
            {empresa}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              color: "#000000",
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {tituloPuesto}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#737373" }}>
            Prohabla · Oportunidades de empleo
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
