# Client Intake Form — Clean Lab by EZ

> Status: PARTIAL. Verified fields cite their source image below (all three
> live in `assets/existing/`). Fields marked "per operator, 2026-07-23" were
> answered directly by the business owner in a follow-up round after the
> Stage 0 asset audit. Everything else remaining is marked **UNANSWERED —
> PENDING OPERATOR**. A pending marker is not a fact — nothing here is guessed.
>
> Sources: `flyer-1.PNG` (bilingual EN/ES service flyer, areas-served list),
> `flyer-2.jpg` (pricing flyer), `google-profile.jpg` (Google Business Profile
> screenshot).

## 1 — Basics

1. Legal business name — **Confirmed: "Clean Lab by EZ"**, matching the flyer (per operator, 2026-07-24: "the legal business name, it's the one on the flyer, Clean Lab by EZ") — no separate registered LLC entity name given, this is the full legal picture
2. Name for the website — **Clean Lab by EZ** (per `flyer-1.PNG`, `flyer-2.jpg`). Note: Google Business Profile displays it as "Clean lab by EZ" (per `google-profile.jpg`) — treating flyer capitalization as canonical
3. Domain — UNANSWERED — PENDING OPERATOR
4. Main phone number — **(689) 200-6472** (per `flyer-1.PNG`, `flyer-2.jpg`, `google-profile.jpg` — consistent across all three sources)
5. Can that number receive texts? — **Yes, standard SMS works** (per operator, 2026-07-23)
6. Email for form submissions — **cleanlabbyez@gmail.com** (per operator, 2026-07-23)
7. Street address — **None — fully mobile, no address to log** (per operator, 2026-07-23). `site.config.geo` will anchor to a Davenport, FL-area centroid rather than a real address
8. Hours — **Monday–Saturday, 8:00 AM – 5:00 PM. Closed Sunday** (per operator, 2026-07-23) — supersedes the single-day GBP snapshot
9. Year founded — UNANSWERED — PENDING OPERATOR
10. Licence number(s) and issuing state — UNANSWERED — PENDING OPERATOR. Flag: may be N/A for a mobile detailing business in FL — do not assume, confirm
11. Insurance / bonding to mention — UNANSWERED — PENDING OPERATOR
12. Google Business Profile link — UNANSWERED — PENDING OPERATOR (the profile itself is confirmed to exist via the screenshot, but no URL/place ID is captured)
13. Facebook / Instagram / TikTok / Yelp / Nextdoor — **Instagram: @cleanlabbyez** (per `flyer-1.PNG`, `flyer-2.jpg`). Facebook icon also appears on `flyer-1.PNG` but no handle/URL is legible. Other platforms — UNANSWERED
14. Spanish-speaking customers? Need a Spanish site? — **PARTIAL**: `flyer-1.PNG` is written entirely in Spanish (service descriptions), suggesting real Spanish-speaking customer reach — worth asking directly rather than assuming a full `/es/` site is wanted

## 2 — Service area

15. Primary city — **Davenport, FL** (confirmed by operator)
16. Every city/town/county served — **Kissimmee, Davenport, St. Cloud, Orlando, Poinciana, Haines City** (per `flyer-1.PNG`, "ÁREAS QUE CUBRIMOS") — these six become the initial service-area pages
17. Anywhere specifically excluded — **None — confirmed the six flyer cities are the full list** (per operator, 2026-07-23)
18. A city wanted more work from — UNANSWERED — PENDING OPERATOR (operator confirmed no changes to the flyer's six-city list; didn't name a growth-priority city)

## 3 — Services

19. Every service offered, top three starred — **PARTIAL, per `flyer-2.jpg` and `flyer-1.PNG`**:
    - **Lab Refresh — Maintenance Detail / Basic Cleaning**: exterior hand wash w/ foam cannon pre-wash, wheel & tire cleaning + tire shine, interior vacuum, dashboard/console/panel wipe-down, interior glass. Sedan $79 · SUV (3-row) $99 · Truck $119
    - **Lab Reset — Deep Interior + Exterior ("Most Popular")**: deep interior clean, seat/carpet/mat shampoo & stain extraction, odor elimination, detailed cleaning of all surfaces. Sedan $125 · SUV $150 · Truck $175
    - **Additional services**: engine bay cleaning, pet hair removal, "custom services per vehicle needs"
    - **Add-ons**: extra stain extraction $25–40, pet hair removal $25, additional wax application $20
    - Top-three moneymaker ranking not stated — UNANSWERED — PENDING OPERATOR
20. More of / less of — UNANSWERED — PENDING OPERATOR
21. What competitors don't do — UNANSWERED — PENDING OPERATOR
22. Pricing posture — **Confirmed current — publish the flyer prices as-is** (per operator, 2026-07-23)
23. Free estimates? Conditions? — UNANSWERED — PENDING OPERATOR
24. Financing? — UNANSWERED — PENDING OPERATOR (unlikely to apply at this price point, confirm rather than assume)
25. Warranties / guarantees — UNANSWERED — PENDING OPERATOR
26. Brands, products, certifications — UNANSWERED — PENDING OPERATOR

## 4 — How customers reach you

27. How customers book today — Call/WhatsApp to the main number (per `flyer-2.jpg`); moving to a GHL calendar (see Q28)
28. Which scheduler / access — **GHL (GoHighLevel) calendar** (per operator, 2026-07-23: "we're going to be using GHL calendar. It may change, but for now that's what we're going to do."). **No embed/booking URL provided yet** — this blocks wiring `booking.provider: 'ghl'` for real; `site.config.ts` will ship with `booking.provider: 'none'` (safe form+phone fallback) until a real GHL embed URL exists, to avoid ever rendering a broken/empty booking widget
29. Who answers the phone — UNANSWERED — PENDING OPERATOR
30. Average response time to a web lead — UNANSWERED — PENDING OPERATOR
31. AI chat assistant interest — UNANSWERED — PENDING OPERATOR
32. Collect emails for newsletter/promotions — UNANSWERED — PENDING OPERATOR

## 5 — Proof

33. Best reviews / Google-pull consent — **Confirmed OK to show reviews** (per operator, 2026-07-23). Aggregate **5.0★ from 25 Google reviews** is visible (per `google-profile.jpg`). Individual review *text* still isn't in hand — operator's consent covers displaying the reviews, but actual quotes need to be pulled from Google or pasted by the operator before `/build-site` writes the Reviews page; do not fabricate quotes to fill the gap
34. Awards / certifications / press — UNANSWERED — PENDING OPERATOR
35. Notable named jobs/clients — UNANSWERED — PENDING OPERATOR
36. Customers willing to be named/photographed — UNANSWERED — PENDING OPERATOR

## 6 — Assets

37. Logo — **`assets/logo/logo.png` provided, but it's raster (PNG), not vector.** No `.ai/.eps/.svg/.pdf` source available yet — flagged gap, not blocking but worth requesting
38. Brand style guide / colors — UNANSWERED. No written brand colors provided; palette will be derived from the flyer/logo artwork (orange/black/white/silver) during Stage 0's asset audit, per design-playbook's "real-world brand evidence" approach
39. Photos — **13 work photos provided** in `assets/photos/` (exterior/interior detailing, headlight restoration, engine bay, a Tesla, various vehicle types). Count is well under the 50+ target — flagged in Stage 0's blocking/nice-to-have list, not fabricated around
40. Wraps / uniforms / signage / business cards — none clearly identified among the provided photos yet — pending Stage 0's full asset audit
41. Video — UNANSWERED — PENDING OPERATOR (none provided)
42. Anything NOT to use — UNANSWERED — PENDING OPERATOR

## 7 — Who you are *(the important part)*

43. Why did you start this business? — **PARTIAL, per operator, 2026-07-23.** The operator's raw answer to the combined vibe/why prompt was: *"performance, dark, be able to provide the best service possible, and dictate my quality."* This wasn't cleanly split across separate questions in their response — recording verbatim rather than force-fitting it. My read (interpretation, not a direct quote, flagged as such): the "provide the best service possible, and dictate my quality" portion reads as the founding motivation — wanting direct control over service quality rather than relying on someone else's standard. Worth a one-line confirmation from the operator before `/brand-read` treats this as settled.
44. What do you do differently — Not separately answered; may overlap with Q43's "dictate my quality" — UNANSWERED as a distinct answer
45. Ideal customer — UNANSWERED — PENDING OPERATOR
46. The moment a customer decides to call — UNANSWERED — PENDING OPERATOR
47. What surprises you that customers say — UNANSWERED — PENDING OPERATOR
48. Biggest objection to overcome — UNANSWERED — PENDING OPERATOR
49. Five words wanted — Not given as five distinct words; operator's answer (see Q43 verbatim quote) opened with **"performance, dark"** — recording those two as the closest thing to a direct answer here rather than inventing three more to round out five
50. Five words never wanted — UNANSWERED — PENDING OPERATOR
51. Vibe pick — **"Performance, dark"** (per operator, 2026-07-23) — this independently confirms the design-team's tentative pre-read from the flyers/photos (dark backgrounds, high-gloss orange accent) and also matches design-playbook's mobile-detailing "Obvious" archetype (performance: dark base, high-gloss reflections, electric accent, motion, mono numerics, before/after slider) — can now treat as a real operator-confirmed direction, not just a design-team guess
52. Liked websites — UNANSWERED — PENDING OPERATOR
53. Disliked website / competitor to avoid resembling — UNANSWERED — PENDING OPERATOR
54. The one thing every visitor should do — **"Book an appointment or ask for more information"** (per operator, 2026-07-23) — supports a dual-intent primary CTA rather than a single forced action
55. A running story/phrase — **"Lab grade clean for your car."** and "We make it EZ" / "Clean, Convenient, Professional." appear as taglines on the flyers (per `flyer-1.PNG`, `flyer-2.jpg`) — worth confirming these are the operator's actual voice, not just flyer copy
56. Comfortable on camera — UNANSWERED — PENDING OPERATOR

## 8 — Content and access

57. Blog interest — UNANSWERED — PENDING OPERATOR
58. Team profile pages — UNANSWERED — PENDING OPERATOR (appears to be a solo/small operation based on available material, unconfirmed)
59. Main point of contact — UNANSWERED — PENDING OPERATOR
60. Deadline — UNANSWERED — PENDING OPERATOR
61. Access grants — UNANSWERED — PENDING OPERATOR

---

## Internal notes — not sent to the client

- Stage 0 asset audit complete (`brief/00-audit.md`): **Photo grade C** — 12 usable photos (one file was a pre-built marketing graphic, not a raw photo), well under the 20-photo B-grade floor, though 7 of the 12 are genuinely strong. Design implication: type-driven, not photo-forward. Brand palette (black/vivid orange/white) independently confirmed across logo, both flyers, and a crew uniform — treat as locked.
- Crew consent: one photo (`seat-extraction-action.jpg`) shows a crew member's first name (and a partial second name) on their uniform, back-facing, face not visible. **Operator confirmed OK to use as-is** (2026-07-23).
- Red flags: none. Remaining structural gap: Section 7 (voice) answers came back blended/abbreviated rather than fully worked through — enough to start `/brand-read` (vibe and the "one thing" CTA are now real, operator-confirmed answers), but ideal-customer, biggest-objection, and liked/disliked-site questions are still open and may be worth a second short round before `/directions`.
