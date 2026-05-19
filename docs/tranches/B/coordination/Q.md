# Coordination — value.js B ↔ glass-ui Q

**Artefact class**: `coordination/<peer-letter>.md` — value.js B's cross-repo manifest, successor to `tranches/A/coordination/Q.md`.
**Date**: 2026-05-18 (B open); **re-verified 2026-05-19** at Q close — see §2a.
**This repo**: value.js, tranche B, HEAD `191d66a`, branch `master`.
**Peer repo**: glass-ui — tranche Q **CLOSED** at HEAD `4b16de7` (v1.9.2; W0–W6 all closed). This doc was first written against Q's pre-execution HEAD `888d227`; §2 below is preserved as the B-open snapshot, §2a is the Q-close re-verification.
**keyframes.js**: HEAD `8d824ee` — `development` export condition shipped at A.W0; no further keyframes.js coordination required for B.
**Shared submodule**: `docs/precepts` — value.js pinned at `3310a8c` (registered at A.W0); **glass-ui Q.W6 advanced the shared submodule to `3c32fae`** (invariants 30–33 + π-lane re-activation). B.W0 advances value.js's pin to match — see §6.

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

## §2a — Re-verified at Q close (HEAD `4b16de7`, v1.9.2) — 2026-05-19

Q executed and closed W0–W6 since this doc was written. A 3-lane read-only assay re-verified every gap against the closed glass-ui source.

| Gap | Verdict at Q close | Proof | Change vs §2 |
|---|---|---|---|
| metaballs `positionSource` + pointer + per-blob opacity + perturbation + context-loss | NOT SHIPPED | `useMetaballs.ts:159-160,212-218,349` unchanged — `posData` still packed `vec3`, no pointer uniform, no `webglcontextlost` listener | none |
| Aurora `deriveAuroraPalette` | NOT SHIPPED | `aurora/index.ts:24-29` — same 5 helpers, no single-color derivation | none |
| `BlobDot` primitive | NOT SHIPPED | 0 matches in glass-ui src | none |
| `SelectTrigger size` | NOT SHIPPED | `SelectTrigger.vue:7-14` — `variant` only | none |
| `DockSelectTrigger clampLabel` | NOT SHIPPED | `DockSelectTrigger.vue:16-18` — no extra props | none |
| `TooltipContent variant="mono"` | NOT SHIPPED | `TooltipContent.vue:10` — no `variant` prop | none |
| `Button size="icon-sm"` | NOT SHIPPED | `button/index.ts:34-40` — default/xs/sm/lg/icon | none |
| Tabs `underline` | PARTIAL | `UnderlineTabs.vue:5-14,59-73` still standalone (`:options` array + `v-model`, not slotted children); no `variant` prop on `<Tabs>` | none — B.W3 migration shape confirmed |
| `Card` props fail-explicit | **SHIPPED** | Q.W2 `cab7258`; `Card.vue:17-43` — `tier`/`surface`/`shadow`/`grain`; `useStalePropWarning` dev-WARNs on stale `variant`/`flush` | **shipped + Q.W3 added `surface?: "glass"\|"cartoon"`** (ScrollPane/CartoonCard DEMOTE) |
| `floating-panel-item` | NOT SHIPPED | `floating-panel.css` defines `.floating-panel` only — no `-item` rule | none |

**Net**: 8 of 10 gaps unchanged at Q close — every B disposition filed in §3 holds. One confirmed SHIPPED (`Card`, already consumed by A.W1). One unchanged-PARTIAL (`UnderlineTabs` — B.W3's structural-migration plan is correct as written).

**Consumer-breakage check**: Q.W3 DEMOTE'd `<ScrollPane>` and `<CartoonCard>` (folded into `<Card surface=>`). value.js's demo uses neither (`grep` returns 0) — no consumer breakage from the DEMOTE. Q.W2's `useStalePropWarning` dev-WARNs on stale `<Card variant>`/`<Card flush>`; value.js's demo passes neither (A.W1 migrated all Card consumers to the `tier` API) — B.W0/B.W1 Playwright probes verify zero stale-prop console warnings as an invariant-31 check.

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

**Update at Q close (2026-05-19)**: Q has closed. The cross-repo assay confirms Q **never wrote value.js** — Q.W1 `bb79eb4` and Q.W2 `cab7258` touched glass-ui files only. Q's round-4 audit retired the contested lanes from its own plan (`Q PROGRESS.md`: "W1 Lane C RETIRES — value.js A.W0 shipped the un-break"; "W2 value.js Lane B RETIRES — A.W1 already did it"). The one surviving value.js item, Q's W1 Lane I picker-0×0 fix, was delivered as `W1-Lane-I-valuejs.patch` and handed over — never committed by Q. Its content (the `default` exports key + `<nav>`/`<main>` landmarks + the `.pane-main` flex-stretch idiom) is already present in committed value.js history: `package.json:23-27` carries the 4-key `exports`; `App.vue:12,25` carries the landmarks; `style.css:130` carries `.pane-main`. **Verdict: the contested boundary is MOOT** — Q wrote nothing, value.js's own A waves produced the equivalent, value.js builds GREEN. B.W5 records it as a closed-state cross-repo item; no B wave acts on it.

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

value.js pins `docs/precepts` at `3310a8c` (registered in A.W0). **glass-ui Q.W6 (`4b16de7`) advanced the shared submodule to `3c32fae`.** The advance codifies:

- **Invariant 30** — cross-repo dev-resolution contract (4-key publisher `exports` shape `development`/`types`/`import`/`default`; explicit consumer `resolve.conditions`; zero hard `dist/` aliases) + a `proof-resolution-contract.mjs` fail-closed gate.
- **Invariant 31** — component props fail-explicit (dev-WARN → typed-reject on stale props; extends O's invariant 24 from composables to the component-prop surface).
- **Invariant 32** — phantom-class corpus-grep gate (a `.retired-classes.txt` registry + `proof-phantom-classes.mjs` blocking dangling CSS-class references).
- **Invariant 33** — dead-code-removal corpus-grep gate (every "cleanup"/"remove unused" commit proves, by pre-deletion corpus grep, that nothing references the removed artefact).
- **π lane** re-activated as a binding canonical close-ceremony lane (visual-runtime Playwright probe), contingent on browser-automation availability.

B advances value.js's pin to `3c32fae` at **B.W0** (a clean submodule bump — no working-tree entanglement) and operates under invariants 30–33 for the rest of the tranche. The advance is load-bearing for B's waves:

- **Invariant 33** governs B.W4's deletion of the 16 e2e specs and B.W1's `floating-panel-item` strip — both now require a pre-deletion corpus grep proving zero live references.
- **Invariant 32** governs the `floating-panel-item` strip specifically (a phantom-class retirement; the strip path adds the class name to a `.retired-classes.txt`-equivalent record in the B.W1 audit doc).
- **Invariant 30** governs B.W4's library audit — value.js is itself a publisher; its `exports` map already carries the 4-key shape (verified: `package.json:23-27`), and B.W4 confirms full invariant-30 compliance (consumer conditions + zero `dist/` aliases).
- **Invariant 31** — value.js consumes glass-ui's now-fail-explicit `<Card>`; B.W0/B.W1 Playwright probes verify zero stale-prop dev-warnings.

B's `FINAL.md` pins `3c32fae`.

## §7 — Conflict-resolution protocol

Same as A coord §8: B writes value.js only. B reads glass-ui at HEAD `888d227` unless an explicit re-read is recorded in a wave's audit doc. If A.W6 fallback or B.W3 UnderlineTabs migration depends on glass-ui surface shape, B re-reads at the wave open.

## §8 — Summary table

| Item | Where | Status — re-verified 2026-05-19 at Q close (`4b16de7`) |
|---|---|---|
| 7 standing glass-ui primitive/blob gaps | §2a, §3 | NOT SHIPPED at Q close — filed, B does not block; markers stay |
| 1 shipped gap (`Card` props fail-explicit) | §2a | SHIPPED Q.W2 `cab7258` (+ `surface` prop Q.W3); already consumed by A.W1 — no B action |
| 1 partially shipped gap (UnderlineTabs) | §2a, §3 | unchanged-PARTIAL; demo structural migration in B.W3 |
| 1 newly filed gap (floating-panel-item) | §2a, §3 | NOT SHIPPED; B.W1 strips locally (invariant-32 retirement) |
| Contested A↔Q boundary | §4 | **MOOT** — Q closed, never wrote value.js; B.W5 records closed-state |
| docs/precepts pin | §6 | value.js `3310a8c` → glass-ui advanced to `3c32fae`; **B.W0 advances value.js's pin to match** |
