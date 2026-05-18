# B — Close A, simplify, complete the AND

**Tranche letter**: B (value.js repo; second tranche).
**Successor to**: A (value.js HEAD `191d66a` at B open; A.W0–W4 closed; A.W5 uncommitted; A.W6/W7 planned-not-run).
**glass-ui peer tranche**: Q (in flight; glass-ui HEAD `888d227`).
**Cohort identity**: close A honestly; abrogate the four over-fits the user flagged; complete Mandate 12's "AND" (value.js library audit); reshape the e2e gate; retire residual legacy; close A and B both on `FINAL.md` artefacts.
**Mode**: planning-only at open per user directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-18.
**Precepts pinned**: `docs/precepts` at `3310a8c` (inherited from A.W0 registration).

## §1 — Thesis

The user named the diagnosis precisely: "the dock sizing, layout, seem contrived, overfit, and over-engineered." The audit (`research/Bβ`, `research/Bγ`) confirms it across three surfaces: the dock-pos centring fold-back, the dual pane router, and four over-fitted decomposition products (`DockMainLayer.vue`, `useDockLayers.ts`, `useAtmosphere.ts`, and the dual router itself). The user also named the wave-state precisely: "this seems hung on e2e." `research/Bα` confirms it — A.W5's source changes sit in the working tree without a commit, and A.W6/W7 have never run.

Tranche A succeeded at its primary mandate — un-break the demo, audit and repair styling resilience, design tokens, four-state controls, and structural overload — but its closure stalled and its later waves accumulated complexity that the precept "architectural transposition wins" rejects in two specific places. The user's `coordination/Q.md §3` glass-ui dependencies remain unshipped across eight gaps, so the conditional A.W6 was always going to need its fallback path.

B's job is narrow and concrete:

1. **Close A honestly** (B.W0). Commit the uncommitted W5; execute or formally re-scope A.W6 per `A.md §9`; run A.W7's close ceremony with `FINAL.md`. A becomes a closed tranche, not a permanently-open ledger.
2. **Abrogate the over-fits** (B.W2, B.W3). Delete `--dock-pos` (Bβ Proposal B); merge `DockMainLayer.vue` back; inline `useDockLayers.ts` and `useAtmosphere.ts`; collapse the dual router into `usePaneRouter.ts`. Net: −4 files, less state.
3. **Fix the W5 over-reaches** (B.W1). `SpectrumCanvas role="slider"` is invalid; `SwatchHoverMenu role="toolbar"` sits on a keyboard-inaccessible panel; the reduced-motion sledgehammer needs an overlay opacity carve-out. Also: define `floating-panel-item` locally or strip it (the class has no CSS rule anywhere).
4. **Reshape the e2e gate** (B.W4 — paired with library audit). Stand up a 4–5-spec smoke suite with role/label selectors as the wave-gate; the 16-spec full suite runs nightly, not on every feature wave.
5. **Complete Mandate 12's AND** (B.W4). The value.js `src/` library was scoped out of A's audit; audit it now for cohesion and coverage gaps, disposition the 5 untracked WIP files re-exported from `src/index.ts`, address the custom-component typecheck cluster (~155 errors B-fixable; shadcn-vue ~104 routes to its own future tranche).
6. **Hero-lab pass** (B.W3). 31 typecheck errors, 4 unguarded RAF loops, no reduced-motion, no e2e — and DESIGN.md calls it the "exemplary visual hierarchy reference." Make the exemplar genuinely exemplary.
7. **Strengthened close** (B.W5). FINAL.md, doc-drift fixes, `coordination/Q.md §3` update (`<UnderlineTabs>` shipped as standalone — shape mismatch), A close-residual cleanups, `CLAUDE.md` test-count refresh, the research-letter renaming fix.

## §2 — Invariants B1–B5

1. **B1 — Close A before opening new structural work.** B.W1 through B.W5 do not run while A.W5/W6/W7 are open. B.W0 closes A honestly; only then does B's own structural work proceed. Closure of A's residuals is a precondition, not an option.
2. **B2 — Abrogate before patch.** Every B finding asks "can we delete?" before "can we patch?". Bβ Proposal B (delete `--dock-pos`) and Bγ (delete 4 over-fitted files) embody this.
3. **B3 — One path.** Reject parallel codepaths for one logical concern. The dual pane router is the canonical violation; `usePaneRouter.ts` is the resolution.
4. **B4 — Runtime evidence.** Same shape as A3. Every demo-touching wave closes on a Playwright probe (3 viewports light+dark, 0 console errors, 0 non-2xx) plus `vue-tsc` + `npm test` + the smoke suite. Wave gates do not depend on the 16-spec full e2e suite.
5. **B5 — Zero deferral at close.** Same shape as A5. Every research finding lands in B, retires with recorded rationale, or names a cross-repo destination in `coordination/Q.md`. B closes with `FINAL.md` and zero open ledger items.

## §3 — Wave schedule (6 waves)

| Wave | Opens after | Headline | Closes on |
|---|---|---|---|
| **B.W0 HEADLINE** | open | Close A — commit W5, execute/re-scope W6, A.W7 close ceremony + A's FINAL.md | A.W5 commit landed; A.W6 closed (executed or formally re-scoped per A.md §9); A's FINAL.md cites every wave's commits and artefacts; A's wave-log shows zero "planned" rows |
| **B.W1** | W0 close | W5 a11y corrections + reduced-motion refinement + floating-panel-item wire + Markdown residuals | `SpectrumCanvas` and `SwatchHoverMenu` ARIA corrected; overlay opacity carve-out in reduced-motion block; `floating-panel-item` defined locally or stripped; Markdown.vue 2 residual `rounded-2xl` resolved; Playwright re-probe clean |
| **B.W2** | W1 close | Layout simplification — Bβ Proposal B (delete `--dock-pos`; flex+fixed) | Token count 9→7; `--dock-pos` token deleted; fold-back edge gone; Playwright at 1280×800 / 1280×720 / 375×667 / 2520×1080 light+dark shows 0 visual regression at standard viewports; the 21:9 dock pin documented |
| **B.W3** | W2 close | Component consolidation (Bγ) + hero-lab pass + UnderlineTabs structural migration + --menu-min-w rationale | 4 over-fits resolved (DockMainLayer merged back; useDockLayers inlined; useAtmosphere inlined; dual router → usePaneRouter); hero-lab 31 type errors closed, 4 RAF loops carry `prefers-reduced-motion`; PaletteDialog tabs migrate to `<UnderlineTabs>`; `.underline-tabs` CSS override retired; menu-min-w exception sites carry inline rationale |
| **B.W4** | W3 close | value.js library gap audit + WIP disposition + custom typecheck cluster + e2e strategy shift | Audit doc for `src/` cohesion/coverage gaps written; 5 untracked WIP files dispositioned (commit/retire/route); custom-component typecheck cluster closes ~155 errors (target vue-tsc count ≤135); smoke suite (4–5 specs) stood up in `e2e/smoke/`; playwright.config gates on smoke suite only |
| **B.W5 HEADLINE close** | W4 close | Strengthened close — FINAL.md, doc drift, Q.md §3 update, research-letter renaming, A close-residual cleanups | FINAL.md exists, cites every B commit + artefact + the A close commit; CLAUDE.md test count refreshed (1409/26); coord/Q.md §3 reflects current glass-ui ship state; research dir contiguous (Aa..Ae); Ad-20/Ae-12/Ab-16 retirements recorded in A.md §8; A↔Q boundary status logged; `npm test` 1409+, `vue-tsc` target met, smoke suite green |

Critical path: W0 → W1 → W2 → W3 → W4 → W5, linear. No cross-repo gate on the critical path (every glass-ui dependency is in `coordination/Q.md` with a named destination). B.W0's conditional A.W6 re-scope is the one decision point — if glass-ui ships the metaballs/aurora APIs between B open and B.W0 close, A.W6 executes; otherwise it formally re-scopes and routes to the named destination (glass-ui successor tranche + value.js tranche C).

## §4 — Per-wave anchors

Each wave has a spec under `waves/`. Each spec carries (per HARDEN-6 §2) per-lane sub-gates, an explicit verification artefact set, and a commit plan. The waves draw their scope from the six research docs:

- `waves/B.W0.md` — A-close mechanics.
- `waves/B.W1.md` — W5 corrections + a11y behavioural pass + `floating-panel-item`.
- `waves/B.W2.md` — layout simplification (Proposal B confirmed by user at open).
- `waves/B.W3.md` — Bγ consolidations + hero-lab + UnderlineTabs migration.
- `waves/B.W4.md` — library audit + WIP + typecheck + e2e smoke.
- `waves/B.W5.md` — strengthened close.

## §5 — Critical files and ownership

| Surface | Files | Owning wave |
|---|---|---|
| W5 close (commit, gate, PROGRESS) | A's working-tree changes; PROGRESS.md; W5 audit docs | B.W0 |
| A.W6 conditional execution / re-scope | `audit/W6-deferred.md` or new commits; `coordination/Q.md` | B.W0 |
| A.W7 close ceremony + FINAL.md | `docs/tranches/A/FINAL.md` (new); `PROGRESS.md` reconcile | B.W0 |
| SpectrumCanvas / SwatchHoverMenu a11y | `SpectrumCanvas.vue`, `SwatchHoverMenu.vue` | B.W1 |
| reduced-motion overlay carve-out | `animations.css` | B.W1 |
| floating-panel-item | `style.css` or `utils.css`; `CurrentPaletteEditor.vue`, `PaletteCard.vue` | B.W1 |
| Markdown.vue radius residuals | `Markdown.vue` | B.W1 |
| layout simplification | `style.css`, `Dock.vue` (top property), `ColorPicker.vue` (max-h) | B.W2 |
| dock + app consolidation | `Dock.vue`, `DockMainLayer.vue` (deleted), `dock/composables/useDockLayers.ts` (deleted), `App.vue`, `composables/useAtmosphere.ts` (deleted), `composables/usePaneRouter.ts` (new), `useMobilePaneRouter.ts` (deleted), `useDesktopPaneRouter.ts` (deleted) | B.W3 |
| hero-lab pass | `demo/hero-lab/**` | B.W3 |
| UnderlineTabs migration | `PaletteDialog.vue`, `style.css` (delete `.underline-tabs` block) | B.W3 |
| `--menu-min-w` rationale | `Dock.vue`, `GenerateControls.vue` | B.W3 |
| value.js library audit | `src/**` audit doc only; no `src/` edits unless WIP disposition | B.W4 |
| `src/` WIP disposition | `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`, plus modified `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts` | B.W4 |
| custom typecheck cluster | `useInertiaGesture.ts`, `useWatercolorBlob.ts`, + ~6 SFCs | B.W4 |
| e2e smoke suite | `e2e/smoke/**` (new), `playwright.config.ts` | B.W4 |
| FINAL.md + doc drift | `docs/tranches/B/FINAL.md`, `CLAUDE.md`, `coordination/Q.md §3`, research-dir rename, A.md §8 records | B.W5 |

Out of B's bounds:
- The 104-error shadcn-vue `auto-form`/`ui/button`/`ui/chart` generated cluster. Routed to a future generator-update effort or a successor tranche. Recorded in B.W4 audit.
- glass-ui-side variant/primitive ships. All 9 standing Q.md §3 gaps remain Q's to ship; B reads, files, and consumes only.
- The 8 keyframes.js / coord-Q overlap. A handled it; nothing for B.

## §6 — Hard gates

- **B.W0**: A.W5 commit landed (working-tree clean after); A.W6 closed state (executed or re-scope record in `audit/W6-deferred.md`); A's `FINAL.md` cites every wave's commits and the re-probe artefact; A's wave-log shows zero `planned`.
- **B.W1**: SpectrumCanvas + SwatchHoverMenu ARIA corrected (verified by snapshot); overlay opacity carve-out in `animations.css`; `floating-panel-item` either gets a defined CSS rule or is stripped from every consumer (deletion proof); Playwright re-probe ≥3 viewports, 0 console errors.
- **B.W2**: `--dock-pos` token absent from `style.css` (deletion proof); Playwright probes at 1280×800 / 1280×720 / 375×667 / 2520×1080 light+dark — at the first three the dock position is unchanged from W4 baseline; at 21:9 the dock pins at `--dock-inset` (the documented visual delta); 0 console errors at every viewport.
- **B.W3**: `DockMainLayer.vue` absent (deletion proof); `useDockLayers.ts` absent; `useAtmosphere.ts` absent; `useMobilePaneRouter.ts` + `useDesktopPaneRouter.ts` absent; `usePaneRouter.ts` present and consumed by App.vue; hero-lab vue-tsc errors → 0; 4 hero-lab RAF loops carry `prefers-reduced-motion` checks; PaletteDialog tabs render with `<UnderlineTabs>`; `.underline-tabs` CSS rule absent from `style.css` (deletion proof); Playwright re-probe clean.
- **B.W4**: `audit/B.W4-library-gap.md` exists with the value.js cohesion/coverage findings + the WIP disposition decisions; the 5 untracked WIP files are either committed (`?? ` cleared) or removed from `src/index.ts` (no public-API debt); custom typecheck cluster vue-tsc count drops to ≤135 (from 290; ~155 closed); `e2e/smoke/` has 4–5 specs covering page-load+hydration / color-space-switching / palette-create+name / admin-login / mobile-layout; `playwright.config.ts` has a `smoke` project; `npm run test:e2e -- --project=smoke` green.
- **B.W5**: `FINAL.md` exists, cites every B + A close commit; A's residual cleanups recorded; B's wave-log shows zero `planned`; the integrity sweep (precept §SPEC close) shows zero unauthorized agent git mutations; CLAUDE.md test count current.

No gate closes on grep or claim alone. Every gate has an artefact.

## §7 — Cross-tranche debt

B inherits A's open `coordination/Q.md §3` rows. The audit (Bζ §2) verified each against glass-ui HEAD `888d227`:

- **STAND (8 gaps)**: `positionSource` hook + pointer + per-blob opacity + perturbation; `deriveAuroraPalette`; `BlobDot`; `SelectTrigger size`; `clampLabel`; `TooltipContent variant="mono"`; `Button size="icon-sm"`; `floating-panel-item` (formally file in B.W7 — never filed in A).
- **PARTIAL (1)**: `Tabs underline variant` — glass-ui shipped `<UnderlineTabs>` as a standalone component, not a `variant` prop. The demo's current `<Tabs>` + `.underline-tabs` CSS override needs a structural migration to consume the standalone; B.W3 owns it. `coordination/Q.md §3` row 67 is updated by B.W5 to reflect the actual ship shape.

B does not block on glass-ui shipping anything. The 8 standing gaps stay filed and are revisited at B close. Coordination updates land in B.W5.

## §8 — Finding disposition (zero deferral)

Every audit finding from `research/Bα..Bζ` lands in a B wave, retires with recorded rationale, or has a named cross-repo destination. The full ledger is in `research/Ba-deferred-ledger.md`; per-finding wave assignment is in the wave specs.

Three new B-specific items folded in from the user's directive:
- Layout simplification (Bβ) → B.W2.
- Component consolidation (Bγ) → B.W3.
- Library audit (Mandate 12 AND) → B.W4.

## §9 — Mode

Planning-only at B open. No implementation in this session per the user's explicit directive. The wave specs are complete enough that B's first execution session opens at B.W0 with no further planning.

## §10 — Authority

Plan substrate at B open: this file + `B-PROMPTS.md` (user-prompt + precept recap) + `findings.md` (user directive recap + W5 status) + `research/Ba..Bζ` (six audit lanes) + `coordination/Q.md` (the A↔Q reflection) + `dispatch/AGENT.md` (B agent contract) + `waves/B.W0..B.W5.md` (six wave specs) + `PROGRESS.md`.

Research-letter coherence: B uses the same Greek-sequence convention as A (`Bα = Ba`, `Bβ = Bb`, `Bγ = Bg`, `Bδ = Bd`, `Bε = Be`, `Bζ = Bz`). The mid-tranche fix to A's incoherent `Aa, Ab, Ad, Ae, Ag` (HARDEN-6 §4) is B.W5 doc work.
