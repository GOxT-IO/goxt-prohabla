import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getLogos } from "@/lib/logos";
import { GOXT_LOGO_URL } from "@/lib/vacantes";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site-config";

const COLABORADORES = getLogos("colaboran-trimmed").filter(
  (logo) => logo.name !== "Prohabla"
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="currentColor" />
  </svg>
);


const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" fill="currentColor" />
  </svg>
);


const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#goxt-instagram-clip)">
      <path d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="goxt-instagram-clip">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const footerSections = [
  {
    title: "Postulantes",
    links: [
      { title: "Buscar empleos", href: "/empleos" },
      { title: "Registrar mi CV", href: "/postulantes" },
      { title: "Ferias de empleo", href: "/eventos" },
    ],
  },
  {
    title: "Empresas",
    links: [
      { title: "Publicar vacante", href: "/empresas" },
      { title: "Participar en una feria", href: "/empresas" },
    ],
  },
  {
    title: "Prohabla",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Contacto", href: "/contacto" },
      { title: "Privacidad", href: "/privacidad" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12">
          <div className="col-span-full flex flex-col gap-5 md:col-span-4">
            <Link href="/" className="flex items-center" aria-label="Prohabla, ir al inicio">
              <Image
                src="/colaboran-trimmed/Prohabla.png"
                alt="Prohabla"
                width={140}
                height={46}
                style={{ width: "auto" }}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Conectamos talento con oportunidades reales. Un espacio donde estudiantes, profesionales y empresas se encuentran para construir el futuro laboral de Costa Rica.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="w-fit text-sm text-muted-foreground hover:text-foreground">
              {CONTACT_EMAIL}
            </a>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Prohabla en ${label}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="col-span-1 md:col-span-2 md:col-start-auto">
              <p className="mb-4 text-sm font-semibold text-navy">{title}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">Aliados y colaboradores</p>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <a href="https://goxt.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Impulsado con tecnología de</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GOXT_LOGO_URL} alt="GOxT" className="h-5 w-auto object-contain" />
              </a>
              <a href="https://nodo.goxt.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Impulsado por</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Nodo.svg" alt="Nodo" className="h-7 w-auto object-contain" />
              </a>
            </div>
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {COLABORADORES.map((logo) => (
              <li key={logo.src} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={36}
                  style={{ width: "auto" }}
                  className="h-9 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
        <Separator orientation="horizontal" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Prohabla. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
