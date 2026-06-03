# K.W0 — User-request recapitulation (the "recap ALL prompts" mandate)

The mandate "Recap ALL of our prompts and requests hitherto and ensure they've been addressed." The canonical prompt corpus is preserved verbatim across `B-PROMPTS.md §1`, `D-PROMPTS.md §1`, `E-PROMPTS.md §1`, `F-PROMPTS.md §2`, `G-PROMPTS.md §1`, `H-PROMPTS.md`. Below: every distinct request across A→J, its source, its status, and — for the unaddressed/folded ones — its **K disposition**.

**Status legend**: ADDRESSED (landed + verified) · FOLDED→K (carried into a K wave) · BOOKED (named-forward with trigger) · ONGOING (standing invariant).

| # | Request | Source | Status | Evidence / K disposition |
|---|---|---|---|---|
| 1 | Un-break the regression (`stops.length`, font 403, dropdowns/dock/animations) | A turn-1 | ADDRESSED | `A/FINAL.md §2` — cold-boot clean, 3 viewports |
| 2 | Styling resilience (non-idiomatic Tailwind/glass-ui; monolith stylesheets; deprecated CSS; fragile calc/min/max/z-index) | A m.1 | ADDRESSED | A.W2 FULL; D.W4 brittle-selector sweep |
| 3 | Design audit (tokens, `@apply`, font sizes/radii/shadows/hover/pop-ups) | A m.2 | ADDRESSED | A.W3; D.W4 51 token-reaches→0 + `demo/DESIGN.md` |
| 4 | Four-state buttons (hover/toggle/disabled/standard) | A m.3 | ADDRESSED | A.W4 |
| 5 | Modals/dropdowns/pop-ups/hover state + hierarchy | A m.4 | ADDRESSED | A.W4 overlay + W5 a11y |
| 6 | Duplicated components consistently styled | A m.5 | ADDRESSED | A.W3 `AdminListItem`, W4 |
| 7 | Golden-ratio hierarchies; abrogate spreadsheet lists | A m.6 | ADDRESSED | A.W3 φ scale |
| 8 | Colocation + idiomatic `@apply` | A m.7 | ADDRESSED | A.W2 |
| 9 | Root-level component restyling | A m.8 | ADDRESSED (demo) / **FOLDED→K.W3** (glass-ui side) | demo done; the 8 glass-ui asks (root variants) land in K.W3 (paired-authorship) |
| 10 | **glass-ui for ALL styling/components** | A m.9 | **FOLDED→K.W3** | partial across arc (ui/alert, useBreakpoint, Button, aurora); K.W3 consummates: ui/→shim, primitives lifted, asks landed |
| 11 | Flatten complex components | A m.10 | ADDRESSED | Dock/App/PaletteDialog/demo-decomp (A→H) |
| 12 | Gaps in value.js **AND** glass-ui (the "AND") | A m.12 | ADDRESSED (value.js) / **FOLDED→K** (glass-ui) | library gaps → B.W3; **the glass-ui-side AND is K's spine** |
| 13 | Playwright user+admin flows; **blob+aurora idiomatic abstraction** | A m.13 | ADDRESSED (e2e) / **FOLDED→K.W3+W4** | e2e 3→36 (D/E); **blob-extirpation→K.W3, aurora-derive→K.W4** (the two oldest mandates) |
| 14 | Dock sizing/layout contrived/overfit | B turn-4 | ADDRESSED | `B/FINAL.md §2` — `--dock-pos` deleted |
| 15 | "Hung on e2e" | B turn-4 | ADDRESSED | 16-spec → 3-smoke + CI gate |
| 16 | Simplify layout (preserve rendered styling) + structure | B turn-4 | ADDRESSED | B.W1/W2; isomorphic-render verified |
| 17 | Contract-v2 alignment (drop `development`/`build:watch`; port proof-resolution) | D-open #1 | ADDRESSED (runtime) / **FOLDED→K.W2** (TS half) | `proof:resolution` green for Vite; **the TS-source-resolution half is incomplete → inv-K-4 / K.W2** |
| 18 | Surgical `api/` refactor; service boundaries, DI, pipeline; no god >500 LoC | D-open #2 | ADDRESSED | D.W2 |
| 19 | Fail-explicit; no silent/graceful fallbacks unless befitting; excise legacy | D-open / B-4 | ADDRESSED (api) / **FOLDED→K.W2** (demo) | D3/E3; **the demo's optional-read CORS leak (inv-K-5) is the residual fail-explicit gap** |
| 20 | Frontend encapsulation/composables/state; split >500 LoC; colocate | D-open | ADDRESSED | D.W3 + H.W3 (≤400) |
| 21 | Localized design-idiom catalog; idiomatic applies; no nested imports; no effusive dynamicism | D-open | ADDRESSED | D.W4 + D6 |
| 22 | Full Playwright every user + admin view (mock, not live-login) | D-open #5 | ADDRESSED | D.W5 + E.W3 (36 specs, 5 projects). **NOTE: e2e currently RED on this tree (CORS) → K.W2 restores** |
| 23 | **Proper aurora derived from a singular color/colors (not cloud default)** | D-open #6 | **UNADDRESSED → FOLDED→K.W4** | glass-ui-blocked A→J; algorithm sketch `D/research/Dc-aurora.md §3`; VAL-1. **The oldest unaddressed mandate.** |
| 24 | **Full validation + extirpation of blob facilities (augment glass-ui, remove bespoke)** | D-open #6 | **UNADDRESSED → FOLDED→K.W3** | glass-ui-blocked A→J; `D/research/Dd-blob.md`; sole-consumer of `MetaballCanvas`. **The 2nd-oldest unaddressed mandate.** |
| 25 | NO god modules / workarounds / fallbacks; DRY/KISS; lint+typecheck every interval | D-open + standing | ONGOING | D1-D6; G3; H3; 9 proof scripts. **dispatch.ts now 372 > G3 350 → FOLDED→K.W2** |
| 26 | Architectural transpositions for elegance/simplicity/performance | E-open + standing | ONGOING | E.W1; G/H decompositions; **K is itself a transposition tranche** |
| 27 | NO legacy code (retire `@deprecated`) | E/F + standing | ONGOING | F.W3; `proof:no-deprecated`=0; **K: no-legacy at every wave** |
| 28 | DEEPLY audit with N agents in parallel; recap ALL prompts; planning-only at open | every open + standing | ONGOING | this K.W0 6-lane audit + this table |
| 29 | Analyze speedtest/glass-ui/fourier work | E-open | ADDRESSED | E/G/H peer audits |
| 30 | Relay all carry-forward items for ratification | G-open + standing | ONGOING | G1; the 3 K.W0 ratification gates |
| 31 | "No deferrals" (the F thesis) | F-seed + standing | ONGOING | F1; **K folds every chronic deferral or books-with-E5-trigger** |
| 32 | Fix cross-repos (CRUD-CONTRACT v2 conformance) | I-open | ADDRESSED | I closed; T7 12/12 |
| 33 | Constellation WAVE-D: REMIX/atom-diff; VAL re-gate | J-open | IN-FLIGHT (J authored, unexecuted) | **K.W0 J-disposition gate** — supersede-and-fold recommended |
| **K-1** | This mandate: glass-ui gaps · goo-blob→glass-ui+perfect · aurora/derive · OKLab dup · cyclical deps · pane system · vue-router 5 · modern-web-guidance · Playwright validation · fold deferrals · recap prompts · NO legacy · tranche-only | 2026-06-02 | **THIS TRANCHE** | every clause mapped to a K wave — see `K.md §0/§3` + the cross-walk below |

## 2026-06-02 mandate → K wave cross-walk

| Mandate clause | K home |
|---|---|
| glass-ui usage + gaps | K.W2 (topology) + K.W3 (consummation) |
| goo-blob → glass-ui + **perfect it** (all 6 defects D1/D2/D4/D6/D8/D9 gated) | K.W3 (D1/D2/D4/D6) + K.W4 (D8/D9) |
| aurora + derive-aurora | K.W4 |
| duplicated OKLAB/math + cyclical deps | K.W2 (delete dup, inv-K-1/K-2) |
| pane system | K.W5 (VIEW_MAP single-source) |
| vue-router 5 | K.W5 (zero-breaking bump + typed routes) |
| Chrome modern-web-guidance | K.W5 (View Transitions, @layer, @container, Popover, scheduler.yield) |
| audit + validate with Playwright | K.W0 (empirical baseline — RED, captured) + K.W2 (restore green) |
| recap ALL prompts | this document |
| fold deferred items | K.md §7 + PROGRESS.md ledger |
| NO legacy / gestalt / transposition | inv-K-1..K-5; every wave deletes-not-shims |
| tranche-development ONLY | K is planning-only at open; no code authored |

**Net**: every distinct request A→J is ADDRESSED, ONGOING-as-invariant, or FOLDED into a named K wave. The two requests that were genuinely **UNADDRESSED across the whole arc** — #23 aurora-derive and #24 blob-extirpation — are K.W4 and K.W3 respectively, unblocked by the paired-authorship cohort. The 2026-06-02 mandate (K-1) is fully cross-walked.
