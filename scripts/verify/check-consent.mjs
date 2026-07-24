// TCPA gate: every form component that collects a phone number must carry
// the SMS consent checkbox (never pre-checked, never relying on native
// `required`) and the verbatim consent language wrapped in
// data-consent-language so it's captured with each lead.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const site = process.argv[2];
if (!site) {
  console.error('usage: check-consent.mjs <site-path>');
  process.exit(2);
}

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (name.endsWith('.astro')) yield path;
  }
}

let bad = 0;
for (const file of walk(join(site, 'src', 'components'))) {
  const text = readFileSync(file, 'utf8');
  const collectsPhone = /name="phone"|type="tel"/.test(text) && /<form|data-lead-form/.test(text);
  if (!collectsPhone) continue;
  const rel = file.replace(site + '/', '');

  if (!/name="smsConsent"/.test(text)) {
    console.error(`  ${rel}: collects a phone number but has no smsConsent checkbox`);
    bad++;
    continue;
  }
  if (!/checked=\{false\}/.test(text)) {
    console.error(`  ${rel}: consent checkbox must be hardcoded checked={false}`);
    bad++;
  }
  if (/name="smsConsent"[^>]*\srequired[\s/>]/.test(text)) {
    console.error(`  ${rel}: consent uses native \`required\` — custom validation owns this (lead-form.ts)`);
    bad++;
  }
  if (!/data-consent-language/.test(text)) {
    console.error(`  ${rel}: consent language not wrapped in data-consent-language`);
    bad++;
  }
}
process.exit(bad > 0 ? 1 : 0);
