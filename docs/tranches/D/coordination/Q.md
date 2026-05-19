# Coordination — value.js D ↔ glass-ui ↔ keyframes.js

**Artefact class**: `coordination/Q.md` — value.js D's cross-repo manifest. Successor to `tranches/B/coordination/Q.md`. Q (glass-ui) is closed; this doc inherits B's §2a/§3/§9 state and refreshes against the post-Q glass-ui + the contract-v2 codification.
**Date**: 2026-05-19.
**This repo**: value.js, tranche D, branch `tranche-b` (D opens off B.W4 close).
**Peer repo (glass-ui)**: tranche Q **CLOSED** at `4b16de7` (v1.9.2; W0–W6); post-Q ship **contract-v2** at `ce5aad8` (v1.9.3). HEAD at D open: `e2e5303` (a Safari post-paint fix).
**Peer repo (keyframes.js)**: v2.1.1 / HEAD `0909177` — code-side contract-v2 OK.
**Shared submodule**: `docs/precepts` — value.js currently pinned at `3c32fae`; **fleet HEAD `68d9b20`** (the contract-v2 codification SHA, per `research/Dh-contract-v2.md §1`). **D.W0 advances value.js's pin to `68d9b20`** — see §6.

## §1 — Inheritance from B↔Q coordination

D inherits B's `coordination/Q.md` state. B closed every contested item; the cross-repo ledger at B close was:

- 7 standing glass-ui §3 gaps (NOT shipped at Q close) — still not shipped at D open (verified by `research/Dd-blob.md §3`).
- 1 SHIPPED (`Card` props fail-explicit, A.W1 consumed).
- 1 unchanged-PARTIAL (`UnderlineTabs` — B.W2 declined the wrong-shape migration; re-filed sharper).
- 1 RETIRED (`floating-panel-item` — B.W1 stripped, no glass-ui action needed).
- 1 newly filed (`<Tabs variant="underline">` on the provider family — the real ask).
- A↔Q contested boundary: MOOT.
- keyframes.js parity: coupling sound; 6 keyframes.js-side gaps filed.

## §2 — Glass-ui ship-state at D open (HEAD `e2e5303`)

Re-verified per `research/Dd-blob.md §3` and `research/Dc-aurora.md §1`. **No new ships since B close.** The metaballs/aurora/`BlobDot` surface is still gap-filled; the 7 metaballs additions + `BlobDot` + `deriveAuroraPalette` all stand.

## §3 — Glass-ui gap list (D's filing)

Inherits B's `§3` row set, **refreshes the metaballs row to 7 additions** (per `research/Dd-blob.md §3`), and **adds the algorithm sketch** for `deriveAuroraPalette` (per `research/Dc-aurora.md §3`).

| Gap | Evidence | Status | Wave (consumes) |
|---|---|---|---|
| **metaballs API additions (7)** — `positionSource` hook (G1), pointer input (G2), per-blob opacity (G3), HSV color perturbation (G4), context-loss recovery (G5), `MetaballCanvas mode="layout"` (G6, newly filed), `pauseOnHidden` (G7, newly filed) | `research/Dd-blob.md §3-4`; signature sketch in §4 of that doc | **STANDS — surface sharpened (7 items, was "5 + perturbation+context-loss")** | a value.js demo-abstraction tranche post-glass-ui-ship |
| **Aurora `deriveAuroraPalette(baseColor, opts)`** + `deriveAuroraConfig(baseColor, opts)` | `research/Dc-aurora.md §3` (~55 line algorithm sketch — two-cohort partition + 5-harmony hue gen + L-envelope; preserved from the older glass-ui `637955b` algorithm); §6 ships pseudocode | **STANDS — surface sharpened (algorithm + atmosphere-preset bundling)** | glass-ui successor; a value.js demo-abstraction tranche post-ship |
| `BlobDot` organic-dot primitive | `research/Dd-blob.md §6`; 11 `WatercolorDot` consumers (16 instance sites — corrected from "11") | STANDS | glass-ui successor; value.js extirpation tranche post-ship |
| `SelectTrigger size` prop | unchanged from B `§3` | STANDS | B does not retire; demo markers stay |
| `DockSelectTrigger clampLabel` | unchanged | STANDS | as above |
| `TooltipContent variant="mono"` | unchanged | STANDS | as above |
| `Button size="icon-sm"` rung | unchanged | STANDS | as above |
| **`<Tabs variant="underline">` on the provider family** (the real ask, re-filed at B.W2) | glass-ui shipped header-only `<UnderlineTabs>`; demo needs underline as a `<Tabs>` provider variant preserving `<TabsContent>` + `data-state` + ARIA | OPEN | demo's `.underline-tabs` override stays until glass-ui ships |
| `Card` props fail-explicit | A.W1 consumed Q.W2 | RETIRED | — |
| `floating-panel-item` | B.W1 stripped — phantom class, never glass-ui-defined | RETIRED at B.W1 | — |

## §4 — A↔Q contested boundary

**MOOT** — Q closed without writing value.js; recorded in `B/coordination/Q.md §4`. No D action.

## §5 — Cross-tranche sequencing

D writes value.js only. No D wave blocks on a cross-repo ship:

| Order | Action | Cross-repo gate |
|---|---|---|
| 1 | D opens at B.W4 close | none |
| 2 | D.W0 — precept advance + B residuals + coord refresh | none |
| 3 | D.W1 — contract-v2 alignment | precepts at `68d9b20` (Lane 0 lands it); glass-ui already shipped contract-v2 |
| 4 | D.W2–W5 | none |
| 5 | D.W6 — close | `§3` reflects close state |

The aurora/blob value.js-side migrations are explicitly OUT of D's waves (precept-§10 blocked).

## §6 — The `docs/precepts` submodule

value.js entered D at `3c32fae` (B.W0's advance). **Fleet HEAD: `68d9b20`** — the contract-v2 codification (per `research/Dh-contract-v2.md §1`). **D.W0 Lane 0 advances value.js's pin `3c32fae → 68d9b20`.** glass-ui is at `68d9b20`; keyframes.js is at `458c2d1` (off-target — see §9).

Contract-v2 redefines invariant 30 in-place (per `research/Dh-contract-v2.md §3`):
- Publisher `exports["."]` is `{types, import, default}` — `development` key FORBIDDEN.
- Every `@mkbabb/*` publisher MUST declare `build:watch`.
- Consumer `resolve.conditions: ["development"]` + sibling-`src/` `fs.allow` widening are STRUCK.
- `proof-resolution-contract.mjs` inverted to forbid-what-it-once-required + new watch-build check.

D.W1 ships value.js's compliance (5 lanes single wave).

## §7 — Conflict-resolution protocol

Inherits B `§7`: D writes value.js only. D reads glass-ui at the Q-close `4b16de7` (and the post-Q `e2e5303` HEAD for `research/Dd-blob.md`'s 7-additions assay) per the wave audit docs. Each wave that depends on glass-ui surface shape re-reads at the wave open; D.W0 records the open-state.

## §8 — Summary table

| Item | Where | Status at D open |
|---|---|---|
| 7 standing glass-ui §3 primitive/blob gaps | §3 | unchanged at D open; rows refreshed (7-addition metaballs surface; algorithm sketch for aurora) |
| 1 SHIPPED gap (`Card`) | §3 | RETIRED |
| 1 unchanged-PARTIAL (`UnderlineTabs`) | §3 | re-filed sharper as `<Tabs variant="underline">` provider-family ask |
| 1 RETIRED (`floating-panel-item`) | §3 | retired at B.W1 |
| A↔Q contested boundary | §4 | MOOT |
| docs/precepts pin | §6 | value.js `3c32fae` → `68d9b20` at D.W0; fleet on `68d9b20` |
| contract-v2 alignment | §6 | value.js consumes at D.W1 |
| keyframes.js parity | §9 | code-side OK; precept-pin off-target |

## §9 — keyframes.js coordination (refresh — corrects B `§9` framing)

`research/Dh-contract-v2.md §4` re-verified keyframes.js's contract-v2 alignment. **Refreshed verdict**: keyframes.js is **already contract-v2 compliant on the code side** at HEAD `0909177` (`build: abrogate development export condition — contract-v2`). Its `package.json` carries the 3-key shape + `build:watch`; its `vite.config.ts` drops `development` + the sibling-`fs.allow`.

The only remaining drift is the `docs/precepts` submodule pin — keyframes.js at `458c2d1`, fleet at `68d9b20`. **Refreshed ask**: a one-line submodule bump to `68d9b20`. The B-vintage filing's "6 keyframes.js gaps" framing (959-line god module, `import type` drift, missing `sideEffects`, etc.) was a maintainability inventory; those items route to keyframes.js's own maintenance schedule.

value.js cannot write keyframes.js. The ask is filed.

## §10 — Open question — contract-v2 codification + a precepts SHA

The precepts SHA `68d9b20` is named throughout this doc as the contract-v2 codification target. The agent that produced `research/Dh-contract-v2.md` cited it from glass-ui's `precepts@68d9b20`. D.W0 Lane 0 verifies the SHA against the actual precepts repository before the bump (the bump is the load-bearing change; the SHA must exist and codify contract-v2).
