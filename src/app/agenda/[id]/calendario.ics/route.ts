import { eventoIcs, getEvento } from "@/lib/eventos";
import { SITE_URL } from "@/lib/site-config";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = getEvento(id);
  if (!evento) return new Response("Evento no encontrado", { status: 404 });

  return new Response(eventoIcs(evento, SITE_URL), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${evento.id}.ics"`,
    },
  });
}
