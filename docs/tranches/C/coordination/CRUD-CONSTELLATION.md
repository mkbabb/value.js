# C — CRUD constellation (value.js view)

This document is value.js-C's view of the cross-repo CRUD cohort. The **authoritative** cohort binding lives in fourier's repo:

> `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONSTELLATION.md`

Edits to the cohort contract or timing originate there and propagate here at the same wave boundary. This file is the value.js-anchored mirror — it cites the fourier file and adds value.js-specific notes.

## Cohort identity (value.js side)

| Field | Value |
|---|---|
| Cohort | CRUD facility convergence + identity-model consolidation |
| Peer repo | `fourier-analysis` (Python/FastAPI) |
| Peer tranche | **B** of fourier-analysis's sequence |
| This repo's tranche | **C** of value.js's sequence |
| Cross-repo relationship | **peer**, not substrate/consumer |
| Shared contract artefact | `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md` (ratified fourier-B.W1, value.js sign-off) |
| Joint research | `~/Programming/fourier-analysis/docs/tranches/B/research/R{1..6}-*.md` |
| Joint challenge | `~/Programming/fourier-analysis/docs/tranches/B/audit/challenge.md` |

## Why this is value.js-C, not value.js-B

value.js-B is already in flight at 2026-05-18 with a different thesis: "Close A, simplify, complete the AND" (close value.js-A; abrogate four over-fits; complete Mandate 12's library audit AND; reshape e2e). It is *not* a CRUD tranche; it does *not* author the `Palette` type or align palette-api to a shared contract. The cohort CRUD work is the next architectural intent after B — therefore tranche **C**. The fourier-B coordination document is authoritative on this naming.

## What value.js owns in the cohort

1. **Domain model in the library** (invariant 15) — `Palette` type + pure operations land at C.W1.
2. **palette-api alignment** — conforms to ratified `CRUD-CONTRACT.md` at C.W2.
3. **Demo native consumption** — `demo/color-picker` + `demo/hero-lab` consume the library `Palette` at C.W3.

fourier owns the symmetric items: the `visualization` entity (fourier-B.W3), consumer wiring + `colors.ts` gut onto value.js (fourier-B.W4).

## value.js-side structural inventory (acquired by joint Wα-R2)

| Surface | File | Disposition in value.js-C |
|---|---|---|
| Library entry | `src/index.ts` | extended (W1) — `Palette`, `colorScale`, `sampleToSVGPath` exports |
| Library — colour units | `src/units/**` (existing) | unchanged; `Palette` composes over existing colour types |
| Library — transforms | `src/transform/**` | extended (W1) — `colorScale` lives here |
| Library — easing | `src/easing.ts` | extended (W1) — `sampleToSVGPath` generalises the cubic-bezier sampler |
| Library — quantize/parsing | `src/quantize/**`, `src/parsing/**` | unchanged |
| api — types | `api/src/types.ts` | extended (W2) — `Palette` doc shape matches library + contract |
| api — routes | `api/src/routes/{palettes,colors,sessions,admin}.ts` | aligned to contract (W2); `formatPalette` `??` fallback retires |
| api — slug | `api/src/slugWords.ts`, `api/src/migrate-slugs.ts` | the slug word-list is the candidate for cohort-wide shared *data* per joint Wα-R3 |
| api — hash | `api/src/hash.ts` | unchanged at algorithm level; content-hash is dedup, not identity |
| api — cron | `api/src/cron.ts` | aligned to contract cron policy (W2); no unbounded `$nin` (mirrors fourier-A.W4 janitor invert) |
| api — migration | `api/src/migrate-palette-schema.ts` (create) | new W2 script; precedent: extant `migrate-slugs.ts`, `migrate-oklab.ts` |
| Demo — palette-browser | `demo/@/components/custom/palette-browser/**` | W3 — palette flows consume library `Palette` |
| Demo — color-picker | `demo/color-picker/**` | W3 |
| Demo — hero-lab | `demo/hero-lab/**` | W3 |

## Timing

```
2026-05-18    fourier-A planning     value.js-A planning, value.js-B planning
              ▼                      ▼
              fourier-A execution    value.js-A execution
              ▼                      ▼
              fourier-A close        value.js-A close (inside value.js-B.W0)
              ▼                      ▼
              fourier-B open         value.js-B execution (close-A + simplify)
              ▼                      ▼
              fourier-B.W0/Wα/Wχ     value.js-B close
              (joint research+challenge; covers value.js too)
              ▼                                       ▼
              fourier-B.W1                            (waits)
              (CRUD-CONTRACT.md ratified, value.js sign-off)
                                                      ▼
                                                      value.js-C open (requires
                                                      value.js-B close AND
                                                      fourier-B.W1 ratify)
                                                      ▼
                                                      value.js-C.W0 acquire artefacts
                                                      ▼
              fourier-B.W3      parallel              value.js-C.W1 (library Palette)
              (fourier entity)                        ▼ (version bump published)
                                                      value.js-C.W2 (api alignment)
                                                      │
              fourier-B.W4 ────── consumes ─────►    value.js-C.W1 (published version)
                                                     value.js-C.W3 (demo wiring)
              ▼                                       ▼
              fourier-B.W5 close                      value.js-C.W4 close
              ▼                                       ▼
              both close ceremonies cite this constellation discharged
```

Sequencing risks and mitigations are documented in joint Wα-R6. The single hard cross-repo dependency is **fourier-B.W4 → value.js-C.W1 published**.

## Authority

This file is owned by value.js-C and updated at every value.js-C wave boundary to mirror cohort state. Edits to contract or timing originate in the fourier-side file and propagate here within the same wave. At value.js-C close (W4), this file records discharge and is referenced from value.js-C's `FINAL.md`.
