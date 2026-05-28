import fs from 'node:fs/promises';
import path from 'node:path';

const [manifestPath, outputHtmlPath] = process.argv.slice(2);

if (!manifestPath || !outputHtmlPath) {
  console.error('Usage: node create-wallpaper-html.mjs manifest.json output.html');
  process.exit(2);
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const film = manifest.film || {};
const outputs = manifest.outputs || {};
const settings = manifest.wallpaper_settings || {};
const width = Number(settings.width) || 2560;
const height = Number(settings.height) || 1440;
const imagePath = outputs.visual_image || '';
const imageUrl = imagePath ? `file://${path.resolve(imagePath)}` : '';
const title = esc(film.title || 'Untitled Film');
const original = esc(film.original_title || '');
const meta = esc([film.director, film.year].filter(Boolean).join(' · '));
const country = esc(Array.isArray(film.country) ? film.country.join(' · ') : '');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; background: #111; }
    .wallpaper { position: relative; width: ${width}px; height: ${height}px; overflow: hidden; background: #111; color: #f0eadf; }
    .visual { position: absolute; inset: 0; background-image: url("${imageUrl}"); background-size: cover; background-position: center; }
    .copy {
      position: absolute;
      left: 96px;
      bottom: 80px;
      max-width: 1120px;
      padding: 18px 22px 20px;
      border-radius: 2px;
      background: color-mix(in srgb, #000 18%, transparent);
      backdrop-filter: blur(1.5px);
    }
    .title { font: 500 64px/1.05 "Songti SC", Georgia, serif; margin: 0 0 18px; text-shadow: 0 2px 10px rgba(0,0,0,.42); }
    .original { font: 400 28px/1.2 Georgia, serif; opacity: .82; margin-bottom: 30px; text-shadow: 0 1px 8px rgba(0,0,0,.38); }
    .meta { font: 400 24px/1.4 -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; opacity: .76; text-shadow: 0 1px 8px rgba(0,0,0,.34); }
    .country { position: absolute; right: 96px; bottom: 84px; font: 400 22px/1.4 -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; opacity: .72; text-shadow: 0 1px 8px rgba(0,0,0,.34); }
  </style>
</head>
<body>
  <main class="wallpaper">
    <div class="visual"></div>
    <section class="copy">
      <h1 class="title">${title}</h1>
      ${original ? `<div class="original">${original}</div>` : ''}
      ${meta ? `<div class="meta">${meta}</div>` : ''}
    </section>
    ${country ? `<div class="country">${country}</div>` : ''}
  </main>
</body>
</html>
`;

await fs.mkdir(path.dirname(outputHtmlPath), { recursive: true });
await fs.writeFile(outputHtmlPath, html, 'utf8');
console.log(outputHtmlPath);
