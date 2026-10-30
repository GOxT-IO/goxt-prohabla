import type { Metadata } from "next";
import Footer from "@/components/sections/ExpoTalentoFooter";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ShareButtons from "@/components/sections/blog-share-buttons";

const EVENTS_API = `https://api-crm.goxt.io/api/blog-widget/${process.env.EVENTS_API_KEY}/posts`;

interface EventPost {
  title: string;
  slug: string;
  content: string;
  thumbnail_url: string;
  tags: string;
  published_at: string;
}

async function getEvent(slug: string): Promise<EventPost | null> {
  try {
    // Sin cache: con revalidate, la primera visita tras editar en el CRM
    // seguía viendo el evento viejo hasta la recarga siguiente.
    const res = await fetch(`${EVENTS_API}/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) return { title: "Evento no encontrado" };

  const description = event.content
    ? event.content.replace(/<[^>]*>/g, "").slice(0, 160).trim()
    : (event.tags ?? "");

  return {
    title: event.title,
    description,
    alternates: { canonical: `/eventos/${slug}` },
    openGraph: {
      title: event.title,
      description,
      url: `/eventos/${slug}`,
      type: "article",
      publishedTime: event.published_at,
      images: event.thumbnail_url
        ? [{ url: event.thumbnail_url, alt: event.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: event.thumbnail_url ? [event.thumbnail_url] : undefined,
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const allTags = event.tags
    ? event.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const MAX_VISIBLE_TAGS = 5;
  const tags = allTags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagsCount = allTags.length - tags.length;

  const description = event.content
    ? event.content.replace(/<[^>]*>/g, "").slice(0, 160).trim()
    : (event.tags ?? "");

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description,
    image: event.thumbnail_url || undefined,
    startDate: event.published_at,
    organizer: {
      "@type": "Organization",
      name: "Prohabla",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/eventos/${slug}`,
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <main>
        {/* Header — misma estructura que BlogHeader */}
        <section className="pt-8 md:pt-12 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto sm:px-16 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Columna izquierda */}
              <div className="flex flex-col gap-6">
                <Link
                  href="/eventos"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  <ArrowLeft size={14} />
                  Volver a eventos
                </Link>

                <div className="flex flex-col gap-4">
                  {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {tags.map((tag) => (
                        <Badge key={tag} className="text-sm h-auto py-1 px-3 border-0 gap-2 bg-secondary text-navy">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {tag}
                        </Badge>
                      ))}
                      {extraTagsCount > 0 && (
                        <Badge className="text-sm h-auto py-1 px-3 border-0 bg-secondary text-navy">
                          +{extraTagsCount}
                        </Badge>
                      )}
                    </div>
                  )}

                  <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-navy">
                    {event.title}
                  </h1>

                  {event.published_at && (
                    <p className="text-base text-muted-foreground">{formatDate(event.published_at)}</p>
                  )}

                  <ShareButtons title={event.title} />
                </div>
              </div>

              {/* Columna derecha: imagen (hoy 1 sola; listo para carrusel cuando el CRM entregue varias) */}
              {event.thumbnail_url && (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src={event.thumbnail_url}
                    alt={event.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Contenido del evento */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto sm:px-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
