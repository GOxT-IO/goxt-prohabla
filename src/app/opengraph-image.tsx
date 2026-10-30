import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { proximoEvento } from "@/lib/eventos";

export const runtime = "nodejs";
export const alt = "Prohabla - Portal de empleo y ferias de empleo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoPath = path.join(process.cwd(), "public", "colaboran-trimmed", "Prohabla.png");
  const logoSrc = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              borderRadius: 40,
              padding: 32,
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            <img src={logoSrc} width={420} height={137} style={{ objectFit: "contain" }} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#ffffff",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            {`${proximoEvento.diaSemana} ${proximoEvento.fecha} · ${proximoEvento.sede} · ${proximoEvento.entrada}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
