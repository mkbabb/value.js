# B — Findings + user directive

**Tranche letter**: B (value.js, second tranche).
**Date opened**: 2026-05-18.
**Repo HEAD at open**: `191d66a` (A's W4 close docs commit).
**A status at B open**: W0–W4 closed and committed; W5 source modifications uncommitted (the "hung on e2e"); W6/W7 planned-not-run.
**Mode**: planning-only.

## §1 — Verbatim user directive (turn-4)

> These items, like for the dock sizing, layout, seem contrived, overfit, and over-engineered. Harden and perform the following:
>
> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.
>
> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
>
> NO legacy code.
>
> Delineate any chronically deferred items and fold them into this new tranche.
>
> Delineate any deferred items and fold them into this new tranche.
>
> Recap ALL of our prompts and requests hitherto and ensure they've been addressed.
>
> This is NOT an implementation phase. Tranche development only.
>
> How might we simplify layout structure (preserving rendered styling), component structure, etc.
>
> This seems hung on e2e.

The full prompt history + precept recap is in `B-PROMPTS.md`.

## §2 — Audit-derived directive set

The 6-lane parallel audit (`research/Ba..Bζ`) produced these B-side directives, each tied to a finding and a destination wave:

### A. Close A first

A.W5 sits uncommitted; A.W6/W7 have never run. A is functionally complete in the working tree but officially open. **B.W0 closes A.** This is invariant B1.

Specific items folded:
- 30+ uncommitted SFC modifications from W5 a11y agent.
- `animations.css` reduced-motion + `useMetaballRenderer.ts` tab-hidden + `GooBlob.vue` aria-hidden from W5 animation agent.
- 16 modified e2e specs from W5-C agent.
- A.W6 conditional: execute if glass-ui shipped the API surface (it has not, per Bζ §2 verification against HEAD `888d227`); otherwise execute the formal re-scope path in `A.md §9` and write `audit/W6-deferred.md` naming the successor.
- A.W7 close ceremony + A's `FINAL.md` citing every wave's commits and artefacts.

### B. Simplify layout (Bβ)

**The dock-pos centring fold-back is the visible "contrived/overfit" surface.** Proposal B in `research/Bb-layout-simplification.md` deletes `--dock-pos` entirely (flex+fixed layout), removes 15 lines, deletes 1 token. Visual delta only at 21:9 (dock pins at 8px instead of floating at 173px above centred content). User confirms at B.W2 open whether Proposal B is acceptable or Proposal A (keep centring via `align-self: center`, 8 lines deleted) is preferred.

Folded into: **B.W2**.

### C. Consolidate components (Bγ)

Four W4 over-fits (Bγ verdicts):
- `DockMainLayer.vue` — 151 lines of pure passthrough → MERGE back into Dock.vue.
- `useDockLayers.ts` — 37 lines (one ref + one watch) → INLINE into Dock.vue.
- `useAtmosphere.ts` — 24 lines (two statements) → INLINE into App.vue.
- `useDesktopPaneRouter.ts` + `useMobilePaneRouter.ts` — duplicated `defineAsyncComponent` for 3 panes, parallel codepaths for one route table → MERGE into `usePaneRouter.ts`. **One-Path violation (precept §5).**

Net: −4 files, +1 file (usePaneRouter). Zero behaviour change.

Folded into: **B.W3**.

### D. W5 a11y corrections + reduced-motion refinement (Bδ)

- `SpectrumCanvas.vue` invalid `role="slider"` (missing `aria-valuenow/min/max`; widget is 2D, not linear). Replace with `role="img"` + dynamic `aria-label`.
- `SwatchHoverMenu.vue` `role="toolbar"` on a hover-triggered, keyboard-inaccessible panel — adds ghost landmark. Add `aria-hidden="true"` to the hover-teleport panel.
- PaletteCard.vue `role="article"` parent container — add `role="list"` to `PaletteCardGrid.vue` so the articles sit in a list landmark.
- Reduced-motion sledgehammer (`*, *::before, *::after { animation-duration: 0.01ms !important }`) carve-out for overlay state opacity transitions (preserves state-change communication; Radix UI pattern).

Folded into: **B.W1**.

### E. Floating-panel-item — wire or retire (Bζ §3)

The class is applied at 7 sites (`PaletteCard.vue`, `CurrentPaletteEditor.vue`) but has zero CSS rule anywhere — neither glass-ui nor demo. It is an orphan label implying a contract that doesn't exist. Choice: either define a local CSS rule with the four-state contract, or strip the class from all consumers (the buttons already carry Tailwind-utility-based styling that implements the states).

Folded into: **B.W1**.

### F. UnderlineTabs structural migration (Bζ §1)

glass-ui shipped `<UnderlineTabs>` as a standalone component (not a `<Tabs variant="underline">` prop). The demo's `PaletteDialog.vue` `<Tabs class="underline-tabs">` cannot prop-swap; it needs a structural migration to consume `<UnderlineTabs :options="tabs" v-model="active">`. Once migrated, the `.underline-tabs` CSS override in `style.css:161-167` retires entirely.

Folded into: **B.W3**.

### G. E2e abrogation (Bδ §3 + the four-lane e2e assay)

The user's second directive: "Most of our e2e tests are likely superfluous, and the playwright-driven ones are likely nonsense and can be totally abrogated." A four-lane parallel assay confirmed it (`research/B-e2e-census.md`, `B-e2e-overlap.md`, `B-e2e-brittleness.md`, `B-e2e-target.md`):

- **Census** — of 16 specs: 4 NONSENSE, 6 SUPERFLUOUS, 6 essential-but-entangled.
- **Overlap** — `color-visual-validation.spec.ts` injects `parseCSSColor`/`colorUnit2` into a headless browser and re-runs ~120 inputs already covered by `color-validation.test.ts` — a unit test masquerading as e2e.
- **Brittleness** — ≈3,510 lines; ~42 `.lucide-*` selectors, ~132 `waitForTimeout`, ~34 `page.evaluate()` interaction-workarounds, ~29 `test.skip`; 10 of 16 score ≥3/5 nonsense; the 2 live-API specs never run in CI. This lane *dissented* and recommended keep-and-migrate — the orchestrator overrode it: keep-and-migrate is the exact W5-C hang pattern, and the lane's "color-visual-validation is the best spec" contradicts the overlap lane's proof.
- **Target** — recommendation: abrogate all 16; replace with a 3-spec role/label smoke suite (`page-load`, `color-space-switching`, `view-switch`); add the project's first browser CI gate; the per-wave orchestrator live probe stays the wave-gate.

Resolution: **delete all 16 `e2e/*.spec.ts`** (≈3,510 lines). Create `e2e/smoke/` with exactly 3 role/label-selector specs. `playwright.config.ts` gains a `smoke` project and loses the `mobile` project. `.github/workflows/node.js.yml` gains a `playwright test --project=smoke` step. No `admin-login` smoke spec (the W5-C hang root; not smoke-critical).

Per **precept invariant 33** (in force after B.W0's submodule advance — see §K): the 16-spec deletion is a dead-code removal and B.W4 Lane D first runs a pre-deletion corpus grep proving nothing outside the deleted set imports the deleted specs or their helper modules.

Folded into: **B.W4 Lane D**.

### H. Library gap audit — Mandate 12's AND (Bε §5)

A scoped `src/` out as "no audit mandate" (findings.md §5, A.md §5). Valid for a regression-focused tranche, but Mandate 12 explicitly says "value.js AND glass-ui." The library was never audited for cohesion or coverage gaps. **B.W4 owns this:**
- Audit `src/` (parsing, color, units, transform, quantize) for cohesion + coverage gaps relative to the demo's color-model needs and the documented surface in `assets/docs/`.
- Disposition the 5 untracked WIP files (`parsing/animation-shorthand.ts`, `parsing/extract.ts`, `parsing/serialize.ts`, `parsing/stylesheet.ts`, `units/interpolate.ts`) — each is re-exported from `src/index.ts` so they are public-API debt: commit + finish, or retire and remove from the barrel.
- Address the custom-component typecheck cluster (`useInertiaGesture.ts` 18, `useWatercolorBlob.ts` 16, + 6 SFCs ≈ ~155 errors B-fixable). Shadcn-vue generated (~104) routes to a generator-update tranche.
- Confirm **invariant-30** compliance: value.js is itself a publisher; `package.json:23-27` already carries the 4-key `exports` shape (`development`/`types`/`import`/`default`) — verified. B.W4 checks the consumer-side `resolve.conditions` and the zero-`dist/`-alias rule, and records whether value.js should port glass-ui's `proof-resolution-contract.mjs` fail-closed gate.

### I. Hero-lab pass (Bα §3, Bζ §8)

`demo/hero-lab/` has 31 typecheck errors, 4 unguarded WebGL RAF loops with no `prefers-reduced-motion`, no e2e coverage, no Card migration. DESIGN.md calls it the "exemplary visual hierarchy reference" with an unchecked TODO. A light pass — Card migration + index narrowing + reduced-motion guards — closes it.

Folded into: **B.W3**.

### J. Doc drift + close cleanups (Bζ §10, Bα §41-44, §49)

- `CLAUDE.md` test count (1372/24 → 1409/26).
- Research-letter renaming (A's `Aa,Ab,Ad,Ae,Ag` → contiguous `Aa..Ae`).
- HARDEN-6 phantom citations (coordination/Q.md:10; dispatch/AGENT.md).
- A.md §8 records for Ad-20, Ae-12, Ab-16 retirements.
- A↔Q boundary status logged.
- `coordination/Q.md §3` row for Tabs underline updated to "shipped as standalone — structural migration".
- A.md §8's `Aa..Ae` shorthand omits `Ag` — corrected.
- `api/` exclusion explicit in `findings.md §5`.

Folded into: **B.W5**.

### K. Glass-ui Q-close realignment (2026-05-19)

B's plan was first drawn against glass-ui's pre-execution HEAD `888d227`. glass-ui's tranche Q has since fully executed and **closed at HEAD `4b16de7` (v1.9.2)**. A 3-lane read-only re-assay (Q-scope ledger, gap re-verification, contested-boundary check) realigned B's plan. Findings:

- **Gap stability** — 8 of B's 10 filed glass-ui gaps are unchanged at Q close. Q shipped exactly one (`Card` props fail-explicit, Q.W2 `cab7258`, already consumed by A.W1; Q.W3 also added a `surface` prop — no value.js consumer of the demoted `ScrollPane`/`CartoonCard`). `UnderlineTabs` is unchanged-PARTIAL — B.W3's structural-migration plan stands. The 7 primitive/blob gaps and `floating-panel-item` are all NOT SHIPPED — every marker stays. Detail in `coordination/Q.md §2a`.
- **Contested A↔Q boundary — MOOT** — Q never wrote value.js. Q's W1/W2 commits touched glass-ui only; Q's round-4 audit retired the contested value.js-write lanes; the one surviving item (the picker-0×0 fix) was handed over as a patch and its content already lives in committed value.js history. `coordination/Q.md §4` records the resolution; B.W5 logs the closed-state.
- **Precept advance** — glass-ui Q.W6 advanced the shared `docs/precepts` submodule `3310a8c` → `3c32fae`, codifying invariants 30–33 + π-lane re-activation. **B.W0 advances value.js's pin to `3c32fae`**; B operates under invariants 30–33. Invariant 33 (dead-code corpus-grep) gates the B.W4 e2e abrogation and the B.W1 `floating-panel-item` strip; invariant 32 (phantom-class) gates the strip; invariant 30 is checked in B.W4's library audit; invariant 31 is verified at the B.W0/B.W1 probes.

Folded into: **B.W0** (submodule advance + invariant-31 probe check), **B.W1** (invariant 32/33 on the strip), **B.W4** (invariant 33 on the e2e deletion, invariant 30 in the library audit), **B.W5** (precept SHA `3c32fae` pinned in FINAL.md; contested-boundary closed-state). No new wave; no scope change beyond gate hardening.

## §3 — Items NOT folded into B

Per invariant B5 (zero deferral at close, named destinations):

- **8 glass-ui standing gaps in `coordination/Q.md §3`**: routed to glass-ui Q (peer tranche) and its successor tranche. B does not block on them. The demo-side marker comments remain in code with their rationale. Retirement of each marker happens when the corresponding glass-ui ship lands — at that point, a value.js tranche C (or a maintenance commit on master) retires the marker.

- **104-error shadcn-vue generated typecheck cluster**: `demo/@/components/ui/auto-form/`, `ui/button/`, `ui/form/`, `ui/chart/`. Vendored/generated code; not B-fixable without regenerating. Routed to a generator-update effort (potential value.js tranche C scope) or a vendoring-policy review.

- **A↔Q contested boundary (Q.W1 Lane C + Q.W2 Lane B)**: documented as open in `coordination/Q.md §0-1`. Response from Q's orchestrator never recorded. B.W5 records the latest status; resolution is glass-ui-side.

All three above are named cross-repo / successor destinations, not silent deferrals.

## §4 — User-mandate coverage at A close (the AND status)

| Mandate | A coverage | B closes |
|---|---|---|
| 1 Styling resilience | FULL | — |
| 2 Design audit | FULL | — |
| 3 Four-state buttons | FULL | — |
| 4 Modals/dropdowns/etc | PARTIAL (W5 a11y uncommitted) | B.W0, B.W1 |
| 5 Duplicated components | FULL | — |
| 6 Golden-ratio + abrogate spreadsheets | FULL | — |
| 7 Colocation + @apply | FULL | — |
| 8 Root-level restyling | PARTIAL (4 glass-ui-side root fixes pending) | coord/Q (cross-repo) |
| 9 glass-ui for ALL | PARTIAL (6 residuals with named destinations) | B.W0 W6 re-scope; B.W1 floating-panel-item |
| 10 Flatten complex components | FULL (with Bγ over-fits) | B.W3 consolidation |
| 11 Skip duplicates | FULL | — |
| **12 Gaps in value.js AND glass-ui** | **PARTIAL — glass-ui side done; library side not audited** | **B.W4** |
| 13 Playwright user+admin flows; blob/aurora | PARTIAL (W5 hung; W6 conditional) | B.W0, B.W2 (smoke suite + W6 re-scope) |

After B closes: every mandate fully addressed or routed to a named destination (cross-repo or a recorded successor tranche).
