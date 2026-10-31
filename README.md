# Prohabla

Sitio de [www.prohabla.org](https://www.prohabla.org): portal de empleo y agenda de ferias de empleo de Prohabla en Costa Rica. Hecho con Next.js 16 (App Router), Tailwind CSS 4 y componentes shadcn/ui.

Las vacantes, el blog, los eventos realizados y los formularios vienen del CRM de GOxT.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar las claves
npm run dev
```

Variables de entorno (`.env.example`):

| Variable | Para qué |
| --- | --- |
| `BLOG_API_KEY` | Posts del blog (`/blog`) desde el CRM |
| `EVENTS_API_KEY` | Crónicas de eventos realizados (`/eventos`) desde el CRM |
| `VACANTES_MOCK` | `1` usa vacantes de ejemplo en vez del CRM (solo desarrollo y CI) |

Antes de abrir un PR: `npm run lint`, `npx tsc --noEmit` y `npm run build`. GitHub Actions corre lo mismo en cada PR.

## Tareas frecuentes

**Agregar una feria, taller o charla a la agenda.** Sumar un objeto a la lista `agenda` en `src/lib/eventos.ts`. Las fechas `inicio` y `fin` van en ISO con la zona de Costa Rica (`2026-11-19T09:00:00-06:00`). El evento aparece en `/agenda` y, si es una feria, en la home y el FAQ; cuando termina pasa solo a "Eventos realizados".

**Cambiar correo, redes o formularios.** Todo está en `src/lib/site-config.ts`.

**Agregar logos de empresas.** Guardar el PNG recortado en `public/empresas-trimmed/` con el nombre de la empresa (así se asocia a sus vacantes) y correr `node scripts/optimize-images.mjs` para bajarle el peso.

## Estructura

- `src/app/`: páginas (`/`, `/empleos`, `/agenda`, `/eventos`, `/blog`, `/postulantes`, `/empresas`, `/contacto`, `/privacidad`), sitemap y robots.
- `src/components/portal/`: piezas del portal (buscador, tarjetas de vacantes, agenda, formularios del CRM).
- `src/components/empleos/`: bolsa de empleo con filtros.
- `src/lib/`: datos y lógica (vacantes del CRM, filtros, agenda, configuración del sitio).
