// Raw-hex detection in .astro components: every color must reference a
// token. tokens.css is the only home for hex values; a line may opt out
// with a `verify-ignore` comment when a literal is genuinely intentional.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const site = process.argv[2];
if (!site) {
  console.error('usage: check-hex.mjs <site-path>');
  process.exit(2);
}

// 3/6/8-digit hex not followed by more word chars or a hyphen — the
// lookahead keeps anchors like href="#add-ons" from matching.
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z-])/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (name.endsWith('.astro')) yield path;
  }
}

let bad = 0;
for (const file of walk(join(site, 'src'))) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes('verify-ignore')) return;
    // Comment-only lines may cite hex values as documentation (e.g. a
    // computed-contrast note) — only real declarations count.
    const trimmed = line.trim();
    if (/^(\/\/|\*|\/\*|\{\/\*)/.test(trimmed)) return;
    const match = line.match(HEX);
    if (match) {
      console.error(`  ${file.replace(site + '/', '')}:${i + 1}: ${match[0]}`);
      bad++;
    }
  });
}
process.exit(bad > 0 ? 1 : 0);
