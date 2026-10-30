// Reduce el peso de logos y fotos de /public sin cambiar nombres ni formato.
// Uso: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const LOGO_FOLDERS = ["empresas-trimmed", "colaboran-trimmed", "Logos Empresas SC-trimmed"];
const PHOTOS = ["Hero.jpg", "Eventos.jpg", "Blogg.jpg", "Roxinia.jpg", "HelenaCarnesCastillo.jpg"];

// Logos: máximo 480x240 px (el sitio los muestra a 48 px de alto, con margen para pantallas 3x).
async function optimizeLogo(file) {
  const input = fs.readFileSync(file);
  const pipeline = sharp(input).resize(480, 240, { fit: "inside", withoutEnlargement: true });
  const output = /\.png$/i.test(file)
    ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
    : await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  if (output.length < input.length) fs.writeFileSync(file, output);
}

// Fotos: máximo 1600 px de ancho.
async function optimizePhoto(file) {
  const input = fs.readFileSync(file);
  const output = await sharp(input)
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  if (output.length < input.length) fs.writeFileSync(file, output);
}

for (const folder of LOGO_FOLDERS) {
  const dir = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
    await optimizeLogo(path.join(dir, name));
  }
  console.log(`${folder}: listo`);
}

for (const name of PHOTOS) {
  const file = path.join(PUBLIC_DIR, name);
  if (fs.existsSync(file)) await optimizePhoto(file);
}
console.log("Fotos: listo");
