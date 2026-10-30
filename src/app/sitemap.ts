import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getVacantes } from "@/lib/vacantes-source";

const BLOG_API = `https://api-crm.goxt.io/api/blog-widget/${process.env.BLOG_API_KEY}/posts`;
const EVENTS_API = `https://api-crm.goxt.io/api/blog-widget/${process.env.EVENTS_API_KEY}/posts`;

interface BlogPost {
  slug: string;
  published_at: string;
}

async function getPostRoutes(
  apiUrl: string,
  basePath: string
): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    const posts: BlogPost[] = json.data?.posts ?? [];
    return posts.map((post) => ({
      url: `${SITE_URL}${basePath}/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/empleos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/postulantes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/empresas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/eventos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const vacanteRoutes: MetadataRoute.Sitemap = (await getVacantes()).map((v) => ({
    url: `${SITE_URL}/empleos/${v.id}`,
    lastModified: new Date(v.fechaPublicacion),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const [blogRoutes, eventRoutes] = await Promise.all([
    getPostRoutes(BLOG_API, "/blog"),
    getPostRoutes(EVENTS_API, "/eventos"),
  ]);

  return [...staticRoutes, ...vacanteRoutes, ...blogRoutes, ...eventRoutes];
}
