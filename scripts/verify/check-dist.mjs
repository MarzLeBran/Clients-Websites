// Built-output gates over dist/:
//   always      — internal link validation (href/src/srcset)
//   production  — per-page metadata (title, single h1, meta description,
//                 canonical), JSON-LD parses with the right types per page
//                 kind, near-duplicate detection across city-service pages
//                 (flagged, not failed), and no GHL URL anywhere in dist
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const site = process.argv[2];
const mode = process.argv[3] ?? 'demo';
if (!site) {
  console.error('usage: check-dist.mjs <site-path> <mode>');
  process.exit(2);
}
const dist = join(site, 'dist');
if (!existsSync(dist)) {
  console.error('  dist/ missing — build first');
  process.exit(1);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const htmlFiles = [...walk(dist)].filter((f) => f.endsWith('.html'));
let bad = 0;
const err = (msg) => {
  console.error(`  ${msg}`);
  bad++;
};

// --- internal links (all modes) ---------------------------------------------
const targets = new Set([...walk(dist)].map((f) => f.replace(dist, '').replaceAll('\\', '/')));
const exists = (path) => {
  const clean = path.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return true;
  return (
    targets.has(clean) ||
    targets.has(clean.replace(/\/$/, '') + '/index.html') ||
    targets.has(clean + '/index.html')
  );
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '');
  const refs = new Set();
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) refs.add(m[1]);
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url.startsWith('/')) refs.add(url);
    }
  }
  for (const ref of refs) {
    if (ref.startsWith('//')) continue;
    if (!exists(ref)) err(`${rel}: broken internal link ${ref}`);
  }
}

if (mode === 'production') {
  // --- per-page metadata ------------------------------------------------------
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const rel = file.replace(dist, '');
    if (!/<title>[^<]+<\/title>/.test(html)) err(`${rel}: missing/empty <title>`);
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) err(`${rel}: ${h1s} <h1> elements (want exactly 1)`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) err(`${rel}: missing meta description`);
    if (!/<link rel="canonical"/.test(html)) err(`${rel}: missing canonical`);
  }

  // --- JSON-LD parses + expected types per page kind --------------------------
  const typesIn = (html) => {
    const found = [];
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        const parsed = JSON.parse(m[1]);
        for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
          if (node['@type']) found.push(node['@type']);
        }
      } catch {
        found.push(null); // parse failure marker
      }
    }
    return found;
  };
  for (const file of htmlFiles) {
    const rel = file.replace(dist, '');
    const types = typesIn(readFileSync(file, 'utf8'));
    if (types.includes(null)) err(`${rel}: JSON-LD failed to parse`);
    if (rel === '/index.html' && !types.some((t) => t && t !== 'BreadcrumbList' && t !== 'FAQPage'))
      err(`${rel}: home page missing LocalBusiness schema`);
    if (/^\/services\/[^/]+\/index\.html$/.test(rel) && rel !== '/services/index.html' && !types.includes('Service'))
      err(`${rel}: service page missing Service schema`);
    if (rel === '/faq/index.html' && !types.includes('FAQPage')) err(`${rel}: FAQ page missing FAQPage schema`);
  }

  // --- near-duplicate city-service pages (flag, never fail) -------------------
  const cityPages = htmlFiles.filter((f) => /\/services\/[^/]+-[^/]+\/index\.html$/.test(f.replace(dist, '')));
  const shingles = (html) => {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .toLowerCase()
      .replace(/\s+/g, ' ');
    const words = text.split(' ').filter(Boolean);
    const set = new Set();
    for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(' '));
    return set;
  };
  const sets = cityPages.map((f) => ({ rel: f.replace(dist, ''), set: shingles(readFileSync(f, 'utf8')) }));
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const inter = [...sets[i].set].filter((s) => sets[j].set.has(s)).length;
      const union = new Set([...sets[i].set, ...sets[j].set]).size;
      const sim = union === 0 ? 0 : inter / union;
      if (sim > 0.7)
        console.error(
          `  flag: ${sets[i].rel} ~ ${sets[j].rel} are ${(sim * 100).toFixed(0)}% similar — tighten the local angle`
        );
    }
  }

  // --- provider config: no GHL URL in dist, endpoint set, provider valid -----
  for (const file of [...walk(dist)].filter((f) => /\.(html|js|css|xml|txt|json)$/.test(f))) {
    const text = readFileSync(file, 'utf8');
    if (/leadconnectorhq|gohighlevel|msgsndr/i.test(text))
      err(`${file.replace(dist, '')}: GHL URL leaked into dist — it belongs in the server env secret only`);
  }
  const config = readFileSync(join(site, 'src/config/site.config.ts'), 'utf8');
  if (!/endpoint:\s*'[^']+'/.test(config)) err(`site.config.ts: forms.endpoint is empty — production forms need the proxy path`);
  if (!/provider:\s*'(calendly|ghl|google|other|none)'/.test(config))
    err(`site.config.ts: booking.provider must resolve to a known provider or 'none'`);
}

process.exit(bad > 0 ? 1 : 0);
