---
name: new-client
description: Scaffold a new client project and run the Stage 0 asset audit. Use when starting a new website build, onboarding a client, or when the user says "new client", "start a build", or names a business to build a site for.
argument-hint: "<slug> <Business Name>"
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Glob, Agent
---

Onboard a new client: $ARGUMENTS

## 1. Scaffold

Run `./scripts/new-client.sh <slug>`. It creates `clients/<slug>/` with `intake/`, `assets/{photos,logo,reviews,existing}/`, `brief/`, and copies `_template/` to `site/`.

If the operator hasn't dropped assets in yet, stop and tell them what to put where.

## 2. Read the intake

Read everything in `clients/<slug>/intake/`. If there's no completed form, point them at `_system/intake-form.md` and stop — the audit is worthless without it.

## 3. Audit the assets

Delegate to the `brand-analyst` subagent. Do not read the photo folder yourself: 50+ images will flood this context and you'll lose the thread for the rest of the session. Give the subagent the client slug and let it return the summary.

## 4. Write `brief/00-audit.md`

```markdown
# Asset Audit — <Business Name>

## Photo grade: [A / B / C]
[Why. Count, quality, consistency, subject variety.]

## Design implication
[A → photo-forward. B → constrained and treated. C → type-driven.
 Say what this forces.]

## Real-world brand evidence
[Vehicle wraps, uniforms, signage, shop interior. Extracted colors.
 A truck wrap beats whatever hex codes they typed on the form.]

## People inventory
[Owner? Crew? Faces are the highest-converting asset on a home services
 site. If there are none, say so and recommend a shoot.]

## Usable / unusable
[Which specific files can carry a hero. Which are watermarked, blurry,
 wrong aspect, or have a competitor's branding in frame.]

## Missing info — blocking
[Licence number, service-area cities, hours, booking platform, pricing
 posture. Anything needed before Stage 3.]

## Missing info — nice to have
```

## 5. Report

Give the operator the photo grade, the design implication in one sentence, and the blocking list. Then tell them to run `/brand-read`.

Never invent a fact to fill a gap. An empty field stays empty and goes on the blocking list.
