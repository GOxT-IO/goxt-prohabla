import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const EVENTS_API = `https://api-crm.goxt.io/api/blog-widget/${process.env.EVENTS_API_KEY}/posts`;

interface EventPost {
  id: number;
  title: string;
  slug: string;
  thumbnail_url: string;
  tags: string;
  published_at: string;
}

async function getEvents(): Promise<EventPost[]> {
  try {
    // Sin cache: con revalidate, la primera visita tras publicar en el CRM
    // seguía viendo la lista vieja hasta la recarga siguiente.
    const res = await fetch(EVENTS_API, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.posts ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventsGrid() {
  const events = await getEvents();

  return (
    <section
      className="relative isolate overflow-hidden py-16 md:py-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="page-bg-grid" />
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="flex flex-col gap-4">
            <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit gap-2 bg-secondary text-navy">
              <span className="size-1.5 rounded-full bg-primary" />
              Eventos de Prohabla
            </Badge>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-navy">
              Un vistazo a todos los eventos de búsqueda de <span className="text-primary">empleo</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Revisa las ferias que ya realizamos y entérate de las próximas oportunidades para conectar con empresas.
            </p>
          </div>

          <div className="relative h-80 md:h-120 rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src="/Eventos.jpg"
              alt="Eventos de Prohabla"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {events.length === 0 ? (
          <p className="text-muted-foreground py-8">
            No hay eventos disponibles por ahora.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/eventos/${event.slug}`}
                className="group flex flex-col gap-4"
              >
                {/* Thumbnail */}
                <div className="relative h-52 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
                  {event.thumbnail_url && (
                    <Image
                      src={event.thumbnail_url}
                      alt={event.title}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2">
                  {event.tags && (
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {event.tags.split(",")[0].trim()}
                    </p>
                  )}
                  <h3 className="text-lg font-medium tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  {event.published_at && (
                    <p className="text-sm text-muted-foreground">{formatDate(event.published_at)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
