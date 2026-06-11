# N — Fold-ledger (the consolidated chronic + deferred census)

Every chronic / deferred / P0 item at N-open with its fold-disposition. Sources: the M
fold-ledger re-verified row-by-row (lane A5), the 32-lane audit, the 5-lane verification fleet.
Detail: `audit/lanes/*.md`. **Disposition key**: FOLD→N.Wn · BOOK (triggered) · KILL · KEEP ·
REFUTED (claim died under verification).

## §1 — P0s at N-open

| ID | Finding | Fold |
|---|---|---|
| N-P0-1 | Demo unbootable at HEAD: `./glass-carousel` import (value.js-own bug) + `BouncyTabs` rename + stale local glass-ui dist; typecheck RED ×3; e2e 0/37; gh-pages build fails; **no gate catches white-screen** | **N.W1** |
| N-P0-2 | `api/compose.yaml` standalone Mongo — 18 txn sites throw on the committed deploy artifact | **N.W4.A** |
| N-P0-3 | Production wire = I-era `23a7b27`; K.W2/L/J routes + envelope never deployed; NCSU alias un-retired (DEC-9 false on wire) | **N.W4.C/E** |
| N-P0-4 | Cross-repo CRUD contract dishonest: URN schemes diverge; conformance matrix cites ~7 nonexistent value.js test files | **N.W3.H** (+ fourier ask) |
| N-P0-5 | Release hygiene: v0.11.2 untagged; master CI broken since Jun 2; 39 commits CI-uncovered | **N.W8.A** |

## §2 — The chronic spine (re-verified; lineage H→K→L→M→N)

| ID | Item | Carry | State at N-open | Fold |
|---|---|---|---|---|
| CH-2 | aurora-derive-from-color (OLDEST mandate) | ~10 | producer published (3.12.0 `deriveAurora`); consumer 0× | **N.W5.B** |
| CH-1/CH-3 | blob + watercolor extirpation (2nd-oldest) | ~10 | glass-ui ships supersets (`./goo-blob` `./watercolor-dot`); forks live | **N.W5.A/C** |
| CH-4..8 | glass-ui primitive asks (Select size, clampLabel, Tooltip mono, Button icon-sm, Tabs underline) | ~10 | unshipped | cohort ask @ 3.13.0 cut; ship-or-KILL (§N.md8) |
| CH-9 | `fs.allow` retirement (font-inlining residual) | ~8 | band-aid live | **N.W1.C** |
| CH-10 | keyframes precept-pin convergence | ~9 | maintainer-signal | **BOOK** |
| CH-11 | wire-before-retire (aurora+blob §10) | ~8 | closes with CH-1/2/3 | **N.W5** |
| CH-13 | fourier Phase-0 quiescence | 6+ | fourier-owned | **BOOK** |
| CH-14a | CF-Pages half (Ask 5) | 6+ | scripted, un-CI'd | **N.W4.F** |
| CH-12 | speedtest CW | retired | — | **KILL (permanent)** |
| K-PARSE | parseCSSColor typing (11 demo casts + 2 lib `as any`) | ~5 | root = `color.ts:239` combinator annotation (E1: deeper than M knew) | **N.W2.C** |
| K-W26 | desktop-P0 `@source` | ~4 | comment-only still | **N.W2.B** |
| K-DOCK | dock e2e 16 RED | ~4 | cause re-diagnosed: the boot-break, not reka | **N.W1** (then re-verify) |
| K-VAL1 | VAL-1 aurora-LUT ship-or-KILL | ~4 | open | **N.W5.B** (final) |
| K-W3DIFF / K-PALID / K-INV5 / K-DISP / K-W5RT | PaletteDiff render · Palette id-honesty · VITE_API_URL · dispatch.ts decomp · router-5 | ~3 | all unaddressed (A3) | **N.W6.D** |
| L-SEED cron-txn | orphaned-vote TOCTOU (now precisely named, V2: `cron.ts:50-51`) | 2 | LIVE | **N.W3.A** |
| kf VJ ledger | 12 items: `linear()`/`steps()`, `toAnimationString`, outputSpace, P3 egress, LRU, path-sampler, diagnostics, unflatten-reuse, MCI-5 pad, `light-dark()` sentinels, parse-that `^0.9` | 3–7 (kf C→J) | all open (A4) | **N.W7.A** |

## §3 — M-wave supersede map (A3 verdicts)

| M wave | Verdict | N home |
|---|---|---|
| M.W1.A development-key | **DONE-OUT-OF-BAND** (0.11.1) | — |
| M.W1.B/B′/C mechanism-C + reka | STILL-LIVE | N.W1.C |
| M.W2.A desktop-P0 / M.W2.B WithId | STILL-LIVE (26 casts, V2) | N.W2 |
| M.W3 elegance set | STILL-LIVE (E1 re-verified + deepened) | N.W2.C + N.W5/W7 |
| M.W4 publish 0.11.0 | **DONE-OUT-OF-BAND** (→0.11.2; untagged) | tag @ N.W8 |
| M.W5 aurora / M.W7 blob+dock | STILL-LIVE; **cohort→unilateral** (producers published) | N.W5 |
| M.W6 modern-web | STILL-LIVE | N.W6.D |
| M.W8 infra | STILL-LIVE (+ worse: V3 prod-stale) | N.W4 |
| M.W9 close | re-derived | N.W9 |

## §4 — Architectural transpositions (the elegance mandate)

| ID | Smell → gestalt fix | Fold |
|---|---|---|
| T1 | 26 `as <Model> & {_id}` casts → 4 repo read-sigs return `WithId<T>` | N.W2.A |
| T2 | combinator-level `Parser<ValueUnit>` under-annotation → one annotation deletes 11+2 casts | N.W2.C |
| T3 | **4** divergent DOM color resolvers (metaball, mixing, gradient-interp, gradient-css — K2 corrected the M-era "2") → 1 library-backed path (`cssToRawColor` exists) | N.W2.C |
| T4 | carousel-shaped label rail → `role="tablist"` column (the semantic truth) | N.W1.A |
| T5 | perf fleet on a dead path → wire `mixColors`→frozen-plan or demote `lerpArray` from barrel | N.W7.B |
| T6 | prettier bundled into dist (54% of 560.7KB tarball; not rolldown-external) → external + optional peer or `/format` subpath; CI gate re-pointed at pack size | N.W7.B |
| T7 | 18 txns applied maximally → ~13 justified-each (KISS); 3 write-only indexes drop | N.W3.B/C |
| T14 | hand-rolled session expiry (`deleteExpired` + cron arm) → Mongo TTL index (`expireAfterSeconds:0`) — native primitive, less code | N.W3.C |
| ~~T15~~ | ~~`forkOfHash` delete~~ — **REFUTED by K1**: live on the wire (`format/palette.ts:74`); D4 conflated it with the write-only `palette_versions` indexes (those drop, T7) | — |
| T16 | un-gated mix-canvas RAF (`useMixingAnimation.ts:116,206` — the LIVE PRM hole; E1 corrected the watercolor framing, which is dormant) → PRM gate | N.W6.C |
| T17 | session-TTL contract drift: 7d mint vs the 30d spine contract; the 30d cron sweep is dead code → align or record sanctioned divergence (K2/K3 silent-drop catch) | N.W3.I |
| T18 | fork-count drift across delete/restore (ungated increment vs gated decrement) → recompute from `countForksOf` on restore | N.W3.J |
| T19 | extract pane discards `population`/dominance the quantizer computes → thread end-to-end + dominant hero swatch | N.W6.C |
| T20 | `ExtractPane`↔`ImagePaletteExtractor` ~90% duplicate → one shell (V5's KEEP proves consumption, not non-duplication) | N.W6.C |
| T21 | `EditDrawer` mounted-but-`display:none` dead UI → delete | N.W6.C |
| T8 | dual pagination + in-memory color post-filter → one mode, honest counts | N.W3.D |
| T9 | 1270-LoC blob fork → delete + consume; BlobPane re-author on the 8-atom config | N.W5.A |
| T10 | hand-rolled mood timers in HeroBlob → the component's autonomic circumplex | N.W5.A |
| T11 | flat single-color blob → live-palette `paletteStops` coupling (the expressivity headline) | N.W5.A |
| T12 | `useLayerTransition` local fork → glass-ui `/dock` export (spring; delta documented) | N.W5.D |
| T13 | net-loss direct oklab paths → prune (bench-verified 0.98×) | N.W7.B |

## §5 — Kill-list (with verification corrections)

| Item | Verdict |
|---|---|
| `useCardMenu.ts`, `useCodeFormatting.ts`, `usePaletteExport` duplicate | **KILL @ N.W8.E** (V5-confirmed dead) |
| `Katex.vue`, `ImagePaletteExtractor.vue` | **REFUTED — KEEP** (11 docs consume; PaletteDialog renders + owns camera) |
| `gold-shimmer` "undefined" claim | **REFUTED** (glass-ui `base.css:335`) — no action |
| `$OUT`, staged CHANGELOG/CONTRIBUTING/VENDOR-POLICY deletions | **N.W8.B** |
| M's 3.3.0 anchors, M.W4, glass-ui-P5, bench-script monitor | **KILL** (spent/phantom) |
| VAL-1 | ship-or-KILL @ **N.W5.B** — no re-book |
| `dashed-well`, `glass-elevated`, `pastel-rainbow-text`, `stagger-children` phantoms | fix @ **N.W5.E** (inv-N-7) |
| A5's "Ask-3/CF-Pages DISCHARGED" verdicts | **OVERRULED** (K2 arbitration): `scripts/deploy-hook.sh` absent from the tree — Asks 3/5 stay OPEN → N.W4 |

## §6 — Net-new deferrals TO value.js since 2026-06-04 (A5/D6)

| Source | Item | Fold |
|---|---|---|
| glass-ui AX.W34/35/42 | delete bespoke useLayerTransition/goo-blob/watercolor forks on barrel availability | **N.W5** (this is it) |
| glass-ui AZ FLEET | value.js as 2nd consumer for Button icon-sm / Select size / clampLabel / Tooltip mono | cohort ask @ 3.13.0; adopt @ N.W6 |
| glass-ui AZ | proof:motion-suite depends on value.js easing API stability | **N.W7.A** (the easing additions are additive) |
| kf I/J | `^0.11.2` floor honored; 0.12.0 notify | **N.W7.C** |
| fourier | conformance-matrix corrections + fourier-web `^0.11.0` bump | fourier-owned asks (§N.md8) |

**Net**: 5 P0s, 17 chronic rows, 9 M-supersede rows, 13 transpositions, 7 kill rows, 5 net-new —
**all dispositioned into N.W1–W9, BOOKED with a trigger, KILLED, or REFUTED**. Zero items leave
N un-dispositioned.
