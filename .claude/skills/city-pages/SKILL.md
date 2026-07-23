---
name: city-pages
description: Generate local landing pages for a service across multiple cities with genuinely differentiated content. Use when the user asks for city pages, service area pages, or local SEO pages.
argument-hint: "<slug> <service> <city1,city2,...>"
disable-model-invocation: true
---

Generate city × service pages: $ARGUMENTS

These are the revenue pages, and they're also the easiest thing in the whole system to get wrong. Thin, templated local pages don't just fail to rank — they drag the rest of the domain down.

## The test

Swap the city name for another city. If the page still reads correctly, it's spun text. Delete it and start over.

## Required per page — genuinely local

- Neighborhoods and subdivisions by name
- Housing stock: dominant era, construction type, typical systems. A 1960s ranch neighborhood has different plumbing failures than 2015 tract homes
- Climate and geography: hard water, clay soil, salt air, freeze depth, storm season
- Local code, permit, or HOA quirks
- Real landmarks for orientation
- Drive time from the client's base, and whether there's a trip charge
- A local job reference, only if one exists in the intake. **Never fabricate one**

## Structure

Unique H1, unique title and meta, unique intro. Shared service detail can be componentized and reused — that's fine and normal. What must be unique is the local content, and it should lead.

## Volume discipline

Cap at 15–20 until the domain has authority. Write fewer, better pages. If the intake doesn't give enough local substance for a city, don't build that page — tell the operator what to ask the client for.

Add each page to the sitemap, link it from the parent service page and the area index, and add `Service` + `BreadcrumbList` schema with the correct `areaServed`.
