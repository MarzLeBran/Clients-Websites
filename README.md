# Home Services Website Studio

A Claude Code workspace for building custom Astro sites for local service businesses — one client per directory, one pipeline, no two sites alike.

## Setup

```bash
git init
chmod +x scripts/new-client.sh .claude/hooks/*.sh
```

Build your Astro starter once and leave it at `_template/`. Every new client gets a copy. Whatever you standardize there — base layout, form component, booking abstraction, schema helpers, legal page stubs — you never rebuild.

Then from the repo root:

```bash
claude
```

## Daily workflow

```
./scripts/new-client.sh acme-plumbing "Acme Plumbing"
# drop intake + photos into clients/acme-plumbing/

/new-client acme-plumbing      # Stage 0 — asset audit, photo grade
/brand-read acme-plumbing      # Stage 1 — who they are        [approve]
/directions acme-plumbing      # Stage 2 — design directions   [approve]
/architect acme-plumbing       # Stage 3 — page map, schema
/build-site acme-plumbing      # Stage 4+5 — design system, build
/ship acme-plumbing            # Stage 6 — QA gauntlet
```

Approving a direction means editing `clients/<slug>/brief/02-design-directions.md` and replacing the commented placeholder with:

```
APPROVED: Direction B — Concours
```

Until that line exists, the stage-gate hook blocks all writes to `site/`.

## What's here

```
CLAUDE.md                    always-loaded constitution
.claude/
  settings.json              permissions + hooks
  skills/
    new-client/              Stage 0    scaffold + audit
    brand-read/              Stage 1
    directions/              Stage 2
    architect/               Stage 3
    build-site/              Stage 4+5
    city-pages/              local SEO pages, on demand
    ship/                    Stage 6    QA gauntlet
    design-playbook/         reference — auto-loads on design decisions
    build-standards/         reference — auto-loads on build + QA
  agents/
    brand-analyst            reads the photo library in isolation
    site-copywriter          writes in the owner's voice, invents nothing
    seo-auditor              read-only
    a11y-auditor             read-only
    design-critic            read-only
  hooks/
    stage-gate.sh            blocks site/ writes before direction approval
    check-hardcoded-nap.sh   warns on business facts outside site.config.ts
_system/
  intake-form.md             what you send clients
  RECIPE-LOG.md              anti-repetition ledger
_template/                   your Astro starter
clients/                     one directory per client
```

## The three things holding this together

**The stage gate is a hook, not a hope.** "Don't write code before the design is approved" is the rule that instructions alone always lose by session three. `stage-gate.sh` exits 2 and Claude physically cannot write into `site/`. Approval is a line in a file, so it's greppable and it lives in git history.

**The photo library never enters the main context.** A client folder holds 50+ images. Reading them inline would consume the context you need for the actual build. `brand-analyst` reads them in an isolated window and returns one page: photo grade, extracted brand colors, usable files by name, missing info. The grade then drives the whole design strategy — A-grade libraries get photo-forward layouts, C-grade get type-driven ones. Since no two clients have the same photos, this is the strongest natural source of variation in the system.

**The recipe log is a real file in git.** Every build appends its hero archetype, services layout, nav, and type direction. `/directions` reads it before proposing, and `design-critic` cross-references it during QA. Without it, session twelve quietly rebuilds session three.

## Hook dependencies

The hooks parse JSON with `node`, which Astro requires anyway — no `jq` needed. On Windows, rewrite them in PowerShell and add `shell: powershell` to the hook entries in `settings.json`.

## Extending it

Verticals accumulate. When a vertical's menu in the `design-playbook` skill starts feeling exhausted, add archetypes rather than repeating them — the log will tell you when you're close.

Skills that declare `allowed-tools` or `hooks` prompt for approval on first use. That's expected; approve once.
