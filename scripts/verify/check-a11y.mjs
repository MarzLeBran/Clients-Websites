// axe-core over the built pages (home + first service page + contact) via
// the system Chrome. Fails on serious/critical violations. Exit 3 = no
// Chrome found (verify.sh downgrades that to a warning).
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

const site = process.argv[2];
if (!site) {
  console.error('usage: check-a11y.mjs <site-path>');
  process.exit(2);
}
const dist = join(site, 'dist');

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) process.exit(3);

const pages = [
  join(dist, 'index.html'),
  join(dist, 'contact', 'index.html'),
];
// First real service page, if any exist.
try {
  const { readdirSync, statSync } = await import('node:fs');
  const services = readdirSync(join(dist, 'services'))
    .filter((n) => statSync(join(dist, 'services', n)).isDirectory())
    .sort();
  if (services.length > 0) pages.push(join(dist, 'services', services[0], 'index.html'));
} catch {
  // no services dir — fine
}

const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
let bad = 0;
try {
  for (const file of pages.filter((p) => existsSync(p))) {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(() =>
      // eslint-disable-next-line no-undef
      axe.run(document, { resultTypes: ['violations'] })
    );
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    for (const v of serious) {
      console.error(`  ${file.replace(dist, '')}: [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s))`);
      bad++;
    }
    await page.close();
  }
} finally {
  await browser.close();
}
process.exit(bad > 0 ? 1 : 0);
