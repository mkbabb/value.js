# Coordination — value.js B ↔ glass-ui Q

**Artefact class**: `coordination/<peer-letter>.md` — value.js B's cross-repo manifest, successor to `tranches/A/coordination/Q.md`.
**Date**: 2026-05-18 (B open).
**This repo**: value.js, tranche B, HEAD `191d66a`, branch `master`.
**Peer repo**: glass-ui, tranche Q (in flight at A close; status verified at B open), HEAD `888d227`.
**keyframes.js**: HEAD `8d824ee` — `development` export condition shipped at A.W0; no further keyframes.js coordination required for B.
**Shared submodule**: `docs/precepts` — pinned at `3310a8c` (registered at A.W0).

## §1 — Inheritance from A↔Q coordination

B inherits A's `coordination/Q.md` substrate. The A↔Q boundary state at B open:

**Contested boundary** (`A coord §0-1`): glass-ui Q's wave specs still carry Q.W1 Lane C ("value.js un-break") and Q.W2 Lane B ("value.js Card migration") as direct value.js writes. A.W0 and A.W1 ran and committed those writes from the value.js side. No response from Q's orchestrator on the deletion request has been recorded in A's PROGRESS.md. B.W5 records the latest state at close.

**Boundary for B**: B writes value.js only. glass-ui and keyframes.js are read at the SHAs recorded here. B files new gaps in §3 below; B does not write glass-ui.

## §2 — Glass-ui ship-state verified at B open (HEAD `888d227`)

Bζ §2 verified each of A's 9 standing §3 gaps. Eight are unshipped; one is partially shipped with a shape mismatch.

| Gap from A §3 | Verified at HEAD | B disposition |
|---|---|---|
| metaballs `positionSource` hook + pointer + per-blob opacity + perturbation + context-loss recovery | NOT shipped — `metaballs/types.ts` has 8 flat fields; `useMetaballs.ts` `posData` is `vec3`; no pointer uniform; no `webglcontextlost` listener | **STAYS FILED** — B.W0 fallback path; demo keeps `useMetaballRenderer.ts` |
| Aurora `deriveAuroraPalette(baseColor, opts)` | NOT shipped — `aurora/index.ts` exports `cssToOklch`, `hexToOklchStop`, `flattenPalette` but no single-color helper | **STAYS FILED** — B.W0 (A.W6 fallback) |
| `BlobDot` organic-dot primitive | NOT shipped — no `BlobDot` in glass-ui src | **STAYS FILED** — `WatercolorDot` remains demo-local |
| `SelectTrigger size` prop (`sm`=`h-9`) | NOT shipped — `SelectTrigger.vue` has `variant` only | **STAYS FILED** — `h-9` overrides + marker remain in 11 demo sites |
| `DockSelectTrigger clampLabel` prop | NOT shipped — no `clampLabel` in props | **STAYS FILED** — `[&>span]:line-clamp-none` + marker remains in `DockViewSelect.vue` |
| `TooltipContent variant="mono"` | NOT shipped — `TooltipContent.vue` no `variant` prop | **STAYS FILED** — mono recipes + markers remain in 7 sites |
| `Button size="icon-sm"` | NOT shipped — sizes are `default/xs/sm/lg/icon`; no `icon-sm` | **STAYS FILED** — 7 demo-side completions + marker remain |
| **Tabs `underline` variant** | **PARTIAL** — glass-ui shipped `UnderlineTabs.vue` as a **standalone component**, not a `<Tabs variant="underline">` prop | **UPDATED — see §3 below** |
| `Card` props fail-explicit (Q-card-2) | Q-owned — not verified this lane | Unchanged |
| `floating-panel-item` (named in `floating-panel.css` comment but no CSS rule) | NOT defined | **NEWLY FILED — see §3 below** |

## §3 — Glass-ui gap list (B's filing)

Updated gap table for glass-ui Q. Rows STAND from A unless noted; one row UPDATED to reflect actual ship shape; one row NEWLY FILED.

| Gap | Evidence | Status | A wave (was) | B wave (consumes) |
|---|---|---|---|---|
| metaballs `positionSource` hook + pointer + per-blob opacity + perturbation + context-loss | `research/Ae` Ae-10; `useMetaballRenderer.ts` duplicated lifecycle | **STANDS** | A.W6 | B.W0 (A.W6 fallback recorded) |
| Aurora `deriveAuroraPalette(baseColor, opts)` | `research/Ae` Ae-11 | **STANDS** | A.W6 | B.W0 fallback |
| `BlobDot` primitive | `research/Ae` Ae-13; 11 demo consumers of `WatercolorDot` | **STANDS** | A.W6 | not consumed in B; routes to successor |
| `SelectTrigger size` prop (`sm`=`h-9`) | `research/Ad` Ad-16; `<SelectTrigger class="h-9">` ×11 | **STANDS** | A.W4 (marker) | B does not retire — marker stays |
| `DockSelectTrigger clampLabel` | `research/Ad` Ad-18; `[&>span]:line-clamp-none` hack | **STANDS** | A.W4 (marker) | B does not retire |
| `TooltipContent variant="mono"` | `research/Ad` Ad-17; 7 consumers | **STANDS** | A.W4 (marker) | B does not retire |
| `Button size="icon-sm"` rung | `research/Ad` Ad-5; ~7 inline icon buttons | **STANDS** | A.W4 (markers + demo-side completions) | B does not retire |
| **Tabs `underline`** (UPDATED) | glass-ui shipped `UnderlineTabs.vue` as standalone (`src/components/custom/tabs/UnderlineTabs.vue`, JS-animated indicator, ResizeObserver). The demo's `<Tabs class="underline-tabs">` cannot prop-swap. | **PARTIAL — structural migration available** | A.W2 (`.underline-tabs` CSS marker) | **B.W3** — `PaletteDialog.vue` migrates to `<UnderlineTabs>`; `.underline-tabs` CSS retires |
| `Card` props fail-explicit | A.W1 consumed Q.W2 Lane A's anticipated Card change | unchanged | A.W1 | — |
| **`floating-panel-item`** (NEWLY FILED) | `floating-panel.css:` comment names it, no CSS rule anywhere; demo applies the class at 7 sites with no styling effect | **NEW — never formally filed** | (`HARDEN-4 §5.3` said "consider filing"; never filed) | **B.W1** — either glass-ui defines the rule, or demo defines `.floating-panel-item` locally (B.W1 chooses) |
| **Open question** — `<Tabs>` underline as a variant prop | If glass-ui prefers a variant prop on the existing `<Tabs>` family rather than a parallel `<UnderlineTabs>` component, B can consume that instead. The current standalone shipped shape is fine for B's migration plan, but worth Q knowing. | Open | — | B.W3 (consumes whichever shape Q endorses) |

## §4 — A↔Q contested boundary (still open)

`A coord §0-1` declared Q.W1 Lane C + Q.W2 Lane B duplicate value.js writes that Q must delete. A.W0 + A.W1 ran and committed the value.js side. **No response from Q's orchestrator has been recorded in A's PROGRESS.md.**

B does not re-litigate the boundary. B.W5 records the latest state at close — whether Q has acted, what the current Q wave plan says, and whether the dual-orchestrator hazard remains. If still open at B close, B's `FINAL.md` names it as a closed-state-with-named-cross-repo-issue (precept-valid).

## §5 — Cross-tranche sequencing

B's waves carry no cross-repo gate on the critical path. Every glass-ui dependency has a fallback or a named destination:

| Order | Action | Cross-repo gate |
|---|---|---|
| 1 | B opens | none |
| 2 | B.W0 — close A | A.W6 conditional on glass-ui shipping the metaballs/aurora APIs. Verified NOT shipped at B open. **B.W0 records the re-scope per `A.md §9` — formal fallback path.** No wait. |
| 3 | B.W1..W4 | none — disjoint from glass-ui ships |
| 4 | B.W5 — close | `coordination/Q.md §3` reflects B-end ship state; A↔Q boundary status logged |

If glass-ui ships any of the 8 standing gaps mid-B, B records the ship and consumes opportunistically (likely in B.W3 or B.W5).

## §6 — The `docs/precepts` submodule

Pinned at `3310a8c` (registered in A.W0). B does not advance it. If glass-ui Q.W5 advances precepts (invariants 30-31 + π lane), B acknowledges the new SHA in `PROGRESS.md` before B close. B's `FINAL.md` pins the precepts SHA B acknowledged.

## §7 — Conflict-resolution protocol

Same as A coord §8: B writes value.js only. B reads glass-ui at HEAD `888d227` unless an explicit re-read is recorded in a wave's audit doc. If A.W6 fallback or B.W3 UnderlineTabs migration depends on glass-ui surface shape, B re-reads at the wave open.

## §8 — Summary table

| Item | Where | Status at B open |
|---|---|---|
| 8 standing glass-ui gaps | this doc §3 | filed, unshipped — B does not block |
| 1 partially shipped gap (UnderlineTabs) | §3 | demo structural migration in B.W3 |
| 1 newly filed gap (floating-panel-item) | §3 | B.W1 chooses local define or strip |
| Contested A↔Q boundary | §4 | open; B logs at close |
| docs/precepts pin | §6 | pinned `3310a8c`; B acknowledges any advance |
