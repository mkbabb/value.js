# A — Progress

Execution log for tranche A. Updated at wave boundaries. Planning-only at A open per user directive; no implementation commits exist at the time of this entry.

## 2026-05-18 — A open (planning round)

### Round 1 — research wave (5 angles + Playwright probe)

Five research lanes dispatched in parallel, each authoring a deliverable under `research/`. The five angles map to the Greek sequence α β γ δ ε, transliterated `a b g d e`.

| Lane | Angle | Deliverable | Headline finding |
|---|---|---|---|
| Aα | runtime keystone | `research/Aa-runtime-keystone.md` | three stacked fatal faults + one cosmetic; A-key-2 is the user's `stops.length` crash, absent from glass-ui Q's ledger |
| Aβ | styling resilience | `research/Ab-styling-resilience.md` | 19 findings; the dock `calc()` chain folds back on itself |
| Aγ | design tokens + hierarchy | `research/Ag-design-tokens-hierarchy.md` | 13 findings; `font-mono-code`/`text-2xs`/`text-pane-description` undefined classes silently dropped |
| Aδ | interactive states | `research/Ad-interactive-states.md` | 20 findings; four-state gaps; `<SelectTrigger class="h-9">` ×11 |
| Aε | structure + blob/aurora | `research/Ae-structure-blob-aurora.md` | `Dock.vue`/`App.vue` god-components; GooBlob duplicates glass-ui `useMetaballs`; Aurora built against a deleted schema |

Playwright probe (Vite dev server, 3 viewports). Three captures in `research/screenshots/`.

### Round 2 — challenge pass

`research/A-challenge.md` — five adversarial challenges. Two changed the plan: the gap list became evidenced problem statements; the Aurora work split across W0 (boot) and W5/W6 (picker-derived).

### Round 3 — plan synthesis

`A.md` synthesized — thesis, five invariants, a 6-wave schedule, hard gates, cross-tranche debt. Wave specs `waves/W0..W5.md`. Cross-repo coordination `coordination/Q.md`.

## 2026-05-18 — Hardening round (6-lane audit)

Six hardening lanes dispatched in parallel against the round-3 plan, each authoring an audit doc under `audit/`.

| Lane | Angle | Deliverable | Headline correction |
|---|---|---|---|
| HARDEN-1 | A↔Q de-dup boundary | `audit/HARDEN-1-dedup-boundary.md` | 6 pure-duplicate value.js writes between A.W0/A.W1 and Q.W1-C/Q.W2-B; Q's gate silently depends on A; value.js does not pin `docs/precepts` |
| HARDEN-2 | W0 keystone | `audit/HARDEN-2-w0-keystone.md` | A-key-3 line is `:178-179` not `:131`; the cascade is an App-subtree crash not a hook-tail; `vue-tsc` not installed; `dist/` already clobbered; font 403 is a `server.fs` fault; keyframes.js already fixed at `8d824ee` |
| HARDEN-3 | design waves W1-W3 | `audit/HARDEN-3-design-waves.md` | 12 findings unassigned; W2 under-scoped; the 11 Card sites are not homogeneous; Ag has 13 findings not 14 |
| HARDEN-4 | W4-W5 + blob/aurora | `audit/HARDEN-4-w4-w5-blob.md` | W5 un-closeable (close ceremony over an open dependency); `usePopupMutex` split hazard; gap-list error — Ae-15 struck, `ConfigSliderPane` re-framed |
| HARDEN-5 | coverage gaps | `audit/HARDEN-5-coverage-gaps.md` | accessibility, animation, and the e2e suite were entirely uncovered; `hero-lab` scope unrecorded |
| HARDEN-6 | methodology | `audit/HARDEN-6-methodology.md` | brittleness window mislabeled; zero-deferral claim overstated; wave specs lack per-lane sub-gates; style tics |

### Synthesis — augmented wave-set

The plan was re-synthesized from the hardening audits:

- **Wave-set augmented 6 → 8.** The former W5 illegally combined the close ceremony with an open cross-repo dependency (`HARDEN-4`); it split into W6 (the conditional blob/aurora abstraction, carrying the dependency) and W7 (the clean close). A new W5 absorbs the accessibility, animation, and e2e-integrity scope the five-angle audit never covered (`HARDEN-5`).
- **De-dup hardened.** `coordination/Q.md` rewritten with the contested-boundary statement, the airtight ownership table, the reverse gate-dependency edges, the merged cross-tranche timeline, and the gate-handoff protocol. Q.W1 Lane C and Q.W2 Lane B are flagged for deletion from Q's plan.
- **12 prior-unassigned findings routed** — Ab-1..7 and Ab-16..19 into W2's added fourth lane, Ag-6 into W3. `A.md §8` is now honest.
- **W0 corrected** — line numbers, the cascade description, and four missed items added: `vue-tsc` install, `dist/` clear, the `server.fs` font fix, the `docs/precepts` submodule registration. The keyframes.js dependency is discharged.
- **Gap list corrected** — Ae-15 struck (the glass `Select` is already complete); the config-pane gap re-framed as non-adoption of glass-ui's existing `./configurator`.
- **`A.md §9`** reframed from a brittleness window to a cross-repo dependency (no tree-breaking, no suspended gates).
- `findings.md` and `research/Aa` carry correction notes for the A-key-2 cascade and A-key-3 line citation.

### State at A open (post-hardening)

Plan substrate: `A.md`, `findings.md`, `research/Aa..Ae` + `A-challenge.md`, `research/screenshots/` (3), `audit/HARDEN-1..6`, `coordination/Q.md`, `dispatch/AGENT.md`, `waves/W0..W7.md`, this file. No implementation has run — the session is tranche development only.

## 2026-05-18 — A.W0 HEADLINE close — consumer un-break + repo hygiene

User directive lifted the planning-only constraint and authorized tranche execution in totality. W0 executed by the orchestrator directly (the three lanes are surgical, tightly file-coupled across `vite.config.ts`/`package.json`, and must land atomically for one boot gate — direct execution is befitting per `dispatch/AGENT.md`).

### What landed

- **A-key-1** — `vite.config.ts` hard alias `@mkbabb/keyframes.js` → deleted `dist/keyframes.js` retired. `resolve.conditions: ["development", "module", "browser"]` added, mode-scoped to the demo modes (dev, gh-pages, hero-lab), never `production`. `server.fs.allow` set to the shared parent directory — fixes the `fira-code-latin.woff2` 403.
- **A-key-2** — `App.vue` Aurora integration migrated off the retired `useAuroraBlobs`/`AuroraBlobsConfig` schema: `reactive(structuredClone(DEFAULT_AURORA_CONFIG))`, `useAurora(canvasRef, () => auroraConfig, { onInitError })`, `provide("auroraConfig", auroraConfig)`. `atmosphereCanvas` changed from `useTemplateRef` to a plain `ref` (matches glass-ui Aurora.vue's own pattern; satisfies `useAurora`'s `Ref` signature). `AuroraPane.vue` renders an honest "under rework" state — W6 rebuilds its slider table against the live 30-field `AuroraConfig`.
- **A-key-3** — `useMetaballRenderer.ts` null-canvas RAF race guarded; the loop ends rather than reschedule when the canvas is gone.
- **A-key-4** — NOT touched in W0; the 11 `<Card variant="pane">` sites are W1's migration.
- **Build hygiene** — `gh-pages` build `outDir` → `dist/gh-pages/`; `.github/workflows/node.js.yml` `publish_dir` follows. `dist/` cleared; library build verified library-only. `vue-tsc@^2.2.0` + `typecheck` script added.
- **Repo hygiene** — `master` fast-forwarded to `70e61e9` (Q-chron-1's "diverged" premise was false); tranche commits land on `master`. `docs/precepts` submodule registered at `3310a8c`.

### Contact-revealed scope

- **Vue-instance dedup.** `vue-tsc`'s first run exposed glass-ui's nested `vue@3.5.30` vs value.js's `vue@3.5.29` — two Vue instances, a runtime + type hazard. Fixed as repo hygiene: `resolve.dedupe: ["vue"]` (Vite) + `tsconfig` `paths` pin for `vue`/`@vue/*` (tsc). Recorded in `audit/W0-build-typecheck.md`.
- **246 pre-existing demo type errors.** The demo had never been typechecked. `src/` is clean; the 246 are latent shadcn-vue + custom-component debt. The W0 typecheck gate is scoped to W0's changed surface (clean); the 246-error backlog is a scope-reveal finding routed to a dedicated demo type-debt effort (value.js tranche B candidate).

### Gate evidence

`audit/W0-build-typecheck.md` + `audit/W0-playwright-boot/` (4 captures). Cold-start boot clean; Playwright ×3 viewports + opened color-space Select, **0 console errors, 0 non-2xx** of 473 requests; `npm test` 1409 passed; library build clean; gh-pages writes `dist/gh-pages/` without clobbering `dist/value.js`.

### Commits

- `bc7ad2c` — `chore(tranche-a/w0)`: register `docs/precepts` submodule + tranche A plan substrate.
- `c20f609` — `fix(tranche-a/w0)`: un-break the demo boot.

The pre-existing uncommitted `src/` WIP (`vite-source-export.ts`, `index.ts`, `units.ts`, `normalize.ts`, the new `parsing/*.ts`) is untouched by W0 and deliberately not committed — it predates the tranche and is outside A's scope (`A.md §5`).

### Cross-tranche

glass-ui Q.W1's hard gate (c/d/e) can now reader-check value.js GREEN against `audit/W0-*` (`coordination/Q.md §7`). The keyframes.js dependency was already discharged at `8d824ee`.

## 2026-05-18 — A.W1 close — Card surface + real-bug sweep

Three lanes dispatched in parallel as agents (disjoint file sets, shared tree per `dispatch/AGENT.md`).

### What landed

- **Lane A1** (`audit/W1-card-wash-panes.md`) — the 10 scroll-pane `<Card variant="pane">` sites migrated to `tier="wash" :shadow="false" :grain="false"`. `variant` was never a Card prop; the silent fallback to `tier="resting"` + shadow was A-key-4's black drop-shadow.
- **Lane A2** (`audit/W1-card-colorpicker.md`) — `ColorPicker.vue` migrated to an explicit `tier="resting"`, shadow kept; it is the protagonist plate, not a wash pane.
- **Lane B** (`audit/W1-class-resolution.md`) — three undefined utility classes resolved: `font-mono-code`→`fira-code` (14 SFCs), `text-2xs`→`text-micro` (7 SFCs, glass-ui `@utility`), `text-pane-description`→`text-caption text-muted-foreground` (shared `PaneHeader.vue`). `ColorInput`'s contenteditable field `rounded-2xl`→`rounded-[var(--radius-input)]`.

### Gate evidence

`grep` confirms zero `variant="pane"` and zero residual undefined classes. `vue-tsc` error count unchanged at 246 (no new type debt). `npm test` 1409 passed. Playwright re-probe (`audit/W1-playwright/`, light + dark, 1280×800): the Palettes wash pane renders flat with no black drop-shadow, `ColorPicker` keeps its elevated `resting` plate, 0 console errors.

### Finding routed

Dark mode does not apply on cold load. `useGlobalDark` (glass-ui) wraps `useDark` inside `createGlobalState`, which initializes lazily on first consumer. Nothing in `App.vue` consumes it at mount, so a user who set dark mode sees light until the dock profile menu mounts. Fix: `App.vue` should call `useGlobalDark()` once at setup. Routed to **W4** (interactive states / App.vue wiring).

### Commits

- `92fe64d` — `fix(tranche-a/w1)`: 11 Card sites → `tier`.
- `efc7d25` — `fix(tranche-a/w1)`: 3 undefined classes + `ColorInput` radius.

## 2026-05-18 — A.W2 close — Style co-location + resilience

The orchestrator owned the global stylesheets (`style.css`, `utils.css`) — one coherent refactor by the single file owner. Three agents ran in parallel on disjoint SFC sets (partitioned by file ownership; no two agents touched the same file). This substitutes for the plan's worktree-isolation mechanism — the invariant it protects (no concurrent writes to one file) is satisfied by single-owner partitioning.

### What landed

- **Global stylesheets (orchestrator)** — dock calc chain de-tangled and documented; magic literal `0.75rem` named `--dock-padding-y`; `.app-layout` derives row sizing from `grid-template-rows` (dock-clearance row + `1fr` content row), `.pane-container` placed in `grid-row: 2`; the two dead `@theme` tokens `--color-ppmycota`/`--ppmycota-primary` deleted (zero consumers); `.section-subtitle` moved to `utils.css` with standard `line-clamp`; `.filter-section`/`.filter-option` removed from `style.css` (re-homed in `SearchFilterBar.vue`); `--menu-min-w` token added; the `.underline-tabs` reka-ui override kept with a coordination marker.
- **Lane B** (`audit/W2-lane-b.md`) — 6 unscoped `<style>` blocks split (plain selectors → `scoped`, transition/portal selectors stay global); `SearchFilterBar` re-homes the filter recipe; Ab-1 surface classes, Ab-2 `--shadow-modal`, Ab-4 (PaletteDialogHeader gold), Ab-17 radius fallback.
- **Lane C+A** (`audit/W2-lane-ca.md`) — deprecated CSS retired (`-webkit-overflow-scrolling`, `::-webkit-scrollbar`→`.scrollbar-hidden`, native range inputs→reka-ui `Slider`); bare z-index → glass-ui z-tier tokens (3 SFCs); Ab-16 recorded-deferred (dev-only).
- **Lane D** (`audit/W2-lane-d.md`) — Ab-3/4/5/6/7/18/19: ad-hoc colors→`--color-gold`, utility-soup surfaces→`.input-bar`/`.glass-floating`, arbitrary menu widths→`--menu-min-w` (two kept wider with recorded content rationale), magic-pixel `max-h`→flex layout, raw shadow→`--shadow-sm`.

### Plan deviation — `--dock-pos` (recorded per the scope-reveal protocol)

`waves/W2.md` Lane A item 1 prescribed recomputing `--dock-pos` "purely from the dock's own footprint" so `--content-max-h` becomes a leaf. Runtime measurement showed this prescription conflicts with the same wave's gate item 3 ("dock position matches the W0 baseline within 1px at 1280×800 **and a 21:9 viewport**"): the original `--dock-pos` centring formula places the dock at **173px** at 2520×1080, while a footprint-only `--dock-pos = --dock-inset` pins it at **8px** — a 165px relocation, a visible behavior change at ultra-wide. The 21:9 centred-cluster layout is a deliberate design (the `@media (min-aspect-ratio: 21/9)` block tunes it). Per "evidence beats claims", the gate (runtime evidence) overrides the soft prescription: `--dock-pos` keeps its centring dependency on `--content-max-h`, now documented as an explicit one-way derivation rather than a fold-back. The genuine fragility — silent, undocumented coupling — is resolved by documentation; the dependency itself is correct. Verified: W2 dock position is 8px @ 1280×800 and 173px @ 2520×1080, both 0px from the W0 baseline.

### Gate evidence

`style.css` holds no plain component selector; no unscoped `<style>` keeps a non-transition/non-portal selector; deprecated `-webkit-*` retired; `vue-tsc` 246 (unchanged); `npm test` 1409 passed. Playwright (`audit/W2-playwright/`): dock position 0px from baseline at both viewports, layout intact, 0 console errors.

## 2026-05-18 — A.W3 close — Design tokens + hierarchy

Orchestrator owned `style.css` (shadow consolidation, `.slug-pill` `@apply`). Six agents ran in parallel on file-disjoint component groups (color-picker, palette-cards, palette-controls, admin, dock-panes, feature-controls), each applying the binding rules in `audit/W3-conventions.md` + its slice of `research/Ag`.

### What landed

- **Shadow** — `--shadow-card`/`-hover` route through `--shadow-cartoon`/`-hover`, overridden to the demo's pop-art intensity; one cartoon language, no fourth recipe. Dead `--glass-opacity-subtle` deleted (Ag-6).
- **φ type scale** (Ag-1) — raw Tailwind sizes mapped to glass-ui φ utilities by role across ~48 SFCs. `text-mono-*` for mono contexts; genuine misfits recorded as documented exceptions in the lane docs.
- **Radii** (Ag-8) — role-bearing radii on semantic aliases; the `ColorInput`/`CurrentPaletteEditor` input fields stop wearing card radius.
- **Hierarchy** (Ag-9/Ag-10) — `ColorNutritionLabel` rebuilt into a φ heading→emphasis→body cascade.
- **Admin lists** (Ag-13) — `AdminListItem` restructured into a primary/secondary hierarchy primitive with a leading swatch; the admin panels + `VersionHistoryDrawer` adopt it.
- **Normalization** (Ag-11/Ag-12) — `.slug-pill` adopted at the dock menus + admin users panel; `DropdownMenuItem`, descriptor sub-text, count indicators normalized; `AdminNamesPanel` tabs moved to the filled `TabsList`.

### Orchestrator corrections

- **ColorComponentDisplay** — the W3 color-picker agent moved the large numeric readout to `text-display`; runtime probe showed the φ heading utilities force Fraunces serif, which mis-fits a numeric value row and wraps it across lines (regardless of size — `text-title` wrapped too). Restored to `text-4xl font-normal` and recorded as a documented W3 exception per the conventions doc ("no fitting φ utility → documented exception"). A large numeric readout is a `text-mono-*`-shaped need glass-ui does not cover at display size — a candidate glass-ui gap.
- `demo/DESIGN.md` updated (doc drift — the old `--glass-opacity-subtle` / raw-8px-shadow description).

### `underline-tabs` residual

`AdminNamesPanel` dropped `underline-tabs`; `PaletteDialog.vue:27` still consumes it, so the `.underline-tabs` class stays in `style.css` with its W2 coordination marker (glass-ui Tabs `underline` variant pending).

### Gate evidence

`vue-tsc` 246 (unchanged), `npm test` 1409 passed. Playwright `audit/W3-playwright/` (light + dark, 1280×800): one cartoon shadow language renders on cards in both modes, the `ColorNutritionLabel` hierarchy reads as a cascade, 0 console errors. Two residual `rounded-2xl` remain in `Markdown.vue` (a code block and an image — not role-bearing surfaces; out of W3 scope).

### Commits

`e58155f` shadow + slug-pill, `8e99a7d` admin restructure, `6cfded5` φ-scale + radii sweep.

## 2026-05-18 — A.W4 close — Interactive states + structure

Four agents ran in parallel on file-disjoint sets: states-A (color-picker/gradient/mix), states-B (palette-browser), dock-decomposition, app-decomposition.

### What landed

- **Four-state contract** (`audit/W4-states-a.md`, `W4-states-b.md`) — every interactive control named in `research/Ad §1` + the four HARDEN-4 §2 additions (ProfileSection, PaletteCard, UserSortMenu, CurrentPaletteEditor floating-panel-item triplet) completed to default/hover/active/disabled + focus-visible. EditDrawer's bare clickable SVGs became real `<button>`s.
- **Overlay convergence** — BulkActionToolbar/PaletteDialog dropped bespoke surfaces for `glass-floating`; the three HoverCardContent `z-*` re-passes deleted (PaletteSlugBar's forced `z-popover` was a real stacking bug); PaletteControlsBar sticky header dropped to `z-bar`.
- **Dock.vue decomposed** 426→128 (`audit/W4-dock-decomposition.md`) — `useDockLayers`, `useDockAdminMode`, `DockViewSelect.vue`, `DockMainLayer.vue`. The three HARDEN-4 split gates honored (single `usePopupMutex`; `DockViewSelect` takes `viewSelectOpen` as `v-model:open`; `dockRef` watchers stay in the SFC; immediate-watch deps passed as refs).
- **App.vue decomposed** 387→290, script 210→156 (`audit/W4-app-decomposition.md`) — `usePaletteManagerWiring`, `useAtmosphere`, `PaneSlot`, `ConfigSliderPane` (merges AuroraPane+BlobPane, composes glass-ui `./configurator`). The dark-mode cold-load fix (W1-routed) landed: `useGlobalDark()` at App setup.

### Orchestrator follow-up

The app-decomposition agent collapsed the pane template with `PaneSlot` but left the desktop route tables as `computed`s inside App.vue's script (script 196). The orchestrator extracted them into `useDesktopPaneRouter` — the companion to `useMobilePaneRouter`, properly realizing Ae-3's "one pane route table out of the shell." App.vue script 196→156.

### Findings recorded

- `floating-panel-item` is an **undefined glass-ui class** (named in `floating-panel.css`'s comment but with no CSS rule). Used by PaletteCard + CurrentPaletteEditor. A glass-ui gap — the four-state contract was completed demo-side on the consuming buttons; the class is kept so it picks up a future glass-ui definition. Filed for glass-ui.
- The glass-ui-variant root fixes (`SelectTrigger size`, `TooltipContent variant=mono`, `DockSelectTrigger clampLabel`, `Button size=icon-sm`) stay filed in `coordination/Q.md §3`; demo-side completions landed with marker comments.

### Gate evidence

`vue-tsc` 243 (down from 246 — the 2 `usePaletteManagerWiring` errors are the pre-existing color-library debt relocated out of App.vue, not new). `npm test` 1409 passed. Playwright (`audit/W4-playwright/`, light + dark): the decomposed dock's view-select opens, view-switching transitions layers through `PaneSlot`, the dark preference applies on cold load, 0 console errors. Dock.vue 128 and App.vue script 156 are at the `≤ ~120`/`≤ ~150` targets.

### Commits

`c011b18` states + overlays, `c3df1e2` Dock decomposition, `3f39026` App decomposition.

## 2026-05-19 — A.W5 close — accessibility + animation (ratified at B.W0)

A's W5 work was complete in the working tree but committed nowhere — the "hung on e2e" diagnostic the user named. Tranche B's invariant B1 ("close A before new structural work") closes it. B.W0 Lane A **ratified** the working tree against the W5 audit docs and committed it; it did not re-do W5's work.

### What landed

- **Lane A — accessibility** (`audit/W5-a11y.md`) — ARIA roles/labels, `<nav>`/`<main>` landmarks, 4 SVG-as-button fixes, decorative `aria-hidden`, focus-visible coverage across 25 demo SFCs + `App.vue`. `style.css` carried the landmark-integration fix (the new `<main>` landmark needed `.pane-main` as a definite-height grid item) — W5-a11y collateral not listed in that doc's file table; folded into the a11y commit with recorded rationale.
- **Lane B — animation** (`audit/W5-animation.md`) — global `prefers-reduced-motion: reduce` block in `animations.css`; GooBlob `<canvas>` `aria-hidden`; `useMetaballRenderer.ts` tab-hidden RAF idle.

### Lane C — e2e — superseded

The W5 plan carried an e2e-integrity Lane C; its agent was killed mid-run (the "hung on e2e"). The 16 modified `e2e/*.spec.ts` selector-migration edits remain uncommitted and are **deliberately not committed** — Tranche B.W3 abrogates the entire 16-spec Playwright suite (`docs/tranches/B/research/B-e2e-investigation.md`). Committing work the next wave deletes would be churn. The e2e-integrity *intent* is carried forward by B.W3's role/label smoke suite.

### Gate evidence

`vue-tsc` 243 (the W5 ARIA additions did not raise the count — the `audit/W5-animation.md` baseline held; B.W0 expected ~290, actual is better). `npm test` 1409 passed, 26 files. Playwright re-probe (`audit/W5-playwright/`, 3 viewports × light+dark): **0 console errors, 0 non-2xx, 0 glass-ui stale-prop dev-warnings** — the invariant-31 check passes (A.W1 migrated all `<Card>` consumers to the `tier` API; glass-ui's now-fail-explicit `<Card>` emits no stale-prop warning).

### Commits

- `7088da4` — `fix(tranche-a/w5)`: accessibility sweep — ARIA roles, landmarks, SVG-as-button.
- `5247313` — `fix(tranche-a/w5)`: animation correctness — global reduced-motion + GooBlob tab-hidden.

## Wave log

| Wave | Status | Opened | Closed | Commits |
|---|---|---|---|---|
| W0 HEADLINE — consumer un-break + repo hygiene | closed | 2026-05-18 | 2026-05-18 | bc7ad2c, c20f609 |
| W1 — Card surface + real-bug sweep | closed | 2026-05-18 | 2026-05-18 | 92fe64d, efc7d25 |
| W2 — style co-location + resilience | closed | 2026-05-18 | 2026-05-18 | 3b72007, f0b8c54, 3a1b673, 6b3b64e |
| W3 — design tokens + hierarchy | closed | 2026-05-18 | 2026-05-18 | e58155f, 8e99a7d, 6cfded5 |
| W4 — interactive states + structure | closed | 2026-05-18 | 2026-05-18 | c011b18, c3df1e2, 3f39026 |
| W5 — accessibility + animation + e2e integrity | closed | 2026-05-18 | 2026-05-19 | 7088da4, 5247313 (e2e lane superseded by B.W3) |
| W6 — blob/aurora idiomatic abstraction (conditional) | planned | — | — | — |
| W7 HEADLINE close — strengthened close | planned | — | — | — |

## Open dependencies

- A.W1 depends on glass-ui Q.W2 Lane A (`Card` props fail-explicit).
- A.W6 depends on glass-ui shipping the `coordination/Q.md §3` extension set — not in glass-ui Q's current wave plan; W6 re-scopes per `A.md §9` if unscheduled.
- Reverse direction: glass-ui Q.W1 hard gate (c/d/e) depends on A.W0 close + artefacts; Q.W2 hard gate (b) depends on A.W1; Q.W5's value.js re-audit reads A.W0 + A.W1 (`coordination/Q.md §2`).
- The A↔Q boundary is contested until glass-ui Q deletes Q.W1 Lane C and Q.W2 Lane B from its plan (`coordination/Q.md §0-1`). A's orchestrator sends the request; Q's response is recorded here when received.
- A.W0 registers `docs/precepts` at `3310a8c`; A acknowledges Q's W5 precepts advance before A close.
