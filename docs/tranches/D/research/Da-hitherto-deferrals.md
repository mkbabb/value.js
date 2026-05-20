# Da — Hitherto recap + chronically-deferred items catalogue

**Tranche**: D (value.js, opening). **Lane**: Da (read-only research).
**Date**: 2026-05-19. **Repo HEAD at audit**: `625322e` on branch `tranche-b` (B closed; D not yet opened on disk — `docs/tranches/D/` currently holds only empty `audit/coordination/dispatch/research/waves/` directories).
**Posture**: declarative, evidence-led, read-only. No git mutation, no edits outside this document.

## §1 — User-prompt ledger (verbatim extracts, dated, with addressed-by citation)

The full prompt corpus across A and B sits in `docs/tranches/B/B-PROMPTS.md §1` (the single canonical ledger). A's own `findings.md §1` quoted the turn-1 directive only; B-PROMPTS extends it to the full corpus through turn-4. The ledger below is verbatim from those two sources, plus the brand-new turn-5 directive that opens D (parsed from the orchestrator's Da brief at the head of this lane).

### Turn 1 — A open, prior session (2026-05-18)

**1a — the regression report + 13-mandate audit brief.** From `B-PROMPTS.md:8-22`, `A/findings.md §1`:

> Recently, a series of changes were made to this core app and glass-ui that has broken many dropdowns, animations, and core features. \[pasted `stops.length` crash + `fira-code-latin.woff2` 403]. Develop a new tranche … alongside a value.js-focused design and functionality audit:
> 1. Audit the frontend for **styling quality and resilience** — (a) non-idiomatic Tailwind / non-idiomatic glass-ui usage; (b) monolithic/global stylesheet patterns that should be colocated or component-scoped; (c) deprecated/archaic CSS; (d) fragile rules (magic numbers, brittle `calc()/min()/max()` chains, viewport-unit traps, z-index coupling, browser-specific breakage).
> 2. A **design audit** — consistent, coherent, idiomatic design language with proper tokens (Tailwind utilities and plugins); `@apply` for custom styling; audit font sizes, border radii, box shadows in cards, hover states, pop-ups.
> 3. Every button has **four-state actions**: hovered, toggled, disabled, standard.
> 4. Audit **modals, dropdowns, pop-ups, hover-over elements** for styling consistency, state handling, visual hierarchy; clear affordances and feedback.
> 5. **Duplicated components** consistently styled — reused tabs headers/items, dropdown navs and items.
> 6. **Golden-ratio-backed hierarchies** for fonts, cards, visual elements; abrogate spreadsheet-like lists in favor of structured, content-rich approaches.
> 7. Favor **colocation + idiomatic Tailwind `@apply` and plugin usage**.
> 8. **Root-level component restyling** — reusable core components (shadcn, reka) edited at their roots, not with ad-hoc styles.
> 9. Use **glass-ui for all styling and component usage when possible** — cards, typography, z-index tiering, radii, tokens.
> 10. **Flatten** unnecessarily complex or overly-deep components (HTML, Vue).
> 11. Skip duplicates; avoid generic advice.
> 12. Identify **gaps in value.js AND glass-ui** for better cohesion, coverage, design affordance.
> 13. **Playwright** validation of user and admin flows; idiomatic usage of glass-ui's **blob system** and **aurora system** — what gaps exist, how to abstract onto them.

Addressed-by: A's 8-wave execution (`A/FINAL.md §2-§3`); B.W3 closes the Mandate 12 library-side AND (`B/audit/B.W3-library-gap.md`); see §2 verifications below. The 13-mandate disposition table is `A/FINAL.md §3`.

**1b — mid-session amendment.** `B-PROMPTS.md:24`:

> The panels seem to be broken largely, and the dock is broken as well.

Addressed-by: A.W0 root-cause attribution (`A/findings.md §3` — A-key-1/2/3/4); A.W1 Card migration; A.W2 dock calc-chain de-tangle; A.W4 Dock.vue/App.vue decomposition.

**1c — scope clarifications.** `B-PROMPTS.md:27-29`:

> This is for a tranche created herein, not glass-ui per-se. Glass-ui has a tranche development process underway right now. This is a tranche that should be developed herein, tranche A (but we should still develop glass-ui fixes, idiomatically, at the root, too).
>
> This is tranche development only in this session.

Addressed-by: A.md §5 (scope-boundary); `A/coordination/Q.md` carries every glass-ui-side root-level item to glass-ui's tranche Q. Planning-only constraint subsequently lifted (`A/PROGRESS.md:60` — "the user lifted the planning-only constraint and authorized tranche execution in totality").

### Turn 2 — A hardening (2026-05-18)

`B-PROMPTS.md:32-33`:

> Properly de-dup from Q, and then take another pass to harden this tranche, A, with 6 agents in parallel. Recap the plan first, and identify gaps, challenge and harden for an augmented wave-set.

Addressed-by: 6-lane A hardening — `A/audit/HARDEN-1..6.md`; wave-set augmented 6 → 8 (A.md §11 revision history); 12 un-routed findings absorbed (`A/audit/HARDEN-3 §7`, `A.md §8`).

### Turn 3 — A execution opening (2026-05-18)

`B-PROMPTS.md:36-37`:

> Begin and continue the current tranche. You must read any and all appurtenant documentation and adhere exactly to the plan, in particular regarding agent orchestration and deep parallelization. Do not edit items directly unless befitting and fully orchestrate the processes as team lead.
>
> Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches.

Addressed-by: A.W0–W4 executed and shipped commits (`A/PROGRESS.md` wave-log, `A/FINAL.md §2`). The "indefatigability" precept entered the precept set explicitly via the `3c32fae` advance (`B/coordination/Q.md §6`).

### Turn 4 — B open + the "hung on e2e" diagnosis (2026-05-18)

`B-PROMPTS.md:39-58`:

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

Addressed-by: B opened in planning-only; 6 audit lanes Bα–Bζ dispatched (`B/findings.md §2` row A–N); B.W1 deletes `--dock-pos` (Bβ Proposal B); B.W2 collapses pane router to `usePaneRouter`; B.W3 abrogates the 16-spec Playwright suite (`B/FINAL.md §2`); the "chronically deferred items" ledger was authored at `B/research/Ba-deferred-ledger.md` (Bα).

### Turn 5 — D open (the brand-new directive)

The orchestrator's Da brief paraphrases the user's new directive; the load-bearing clauses are reproduced here as quoted by the lane brief:

> SCOPE … Recap every user prompt across tranches A and B … List every prompt verbatim-extract, dated. The user's brand-new directive (the one that opens tranche D) — quote its key clauses too. Mandates 1-13 of A's brief: verify each is closed against `docs/tranches/A/FINAL.md §3`.
> Verify the A close … and B close … claims against the actual repo. Spot-check 6-8 specific claims …
> **Catalogue chronically-deferred items** — items routed forward across A and B, not just B's most recent routings.

Addressed-by: this document. The turn-5 prompt is itself reflected as the Da/Db/… lane charter — the structure parallels turn 4 (a hardening + deferred-items catalogue + recap-and-disposition pass) but is now applied to B's close just as turn 4 applied to A's mid-flight state. The recurring shape of the user's directive — *recap, audit, simplify, delete legacy, fold deferred items into the new tranche* — is the load-bearing pattern.

### 1.1 — Total prompt count

Counted strictly: **6 distinct user prompts** across A+B (1a, 1b, 1c, 2, 3, 4) and **1 opening prompt for D** (5). Counted as turn-bundles: 5 turns (turn 1 was bundled — the regression report + 13 mandates + amendment + scope clarifications were all the opening message — turns 2/3/4/5 were single prompts).

### 1.2 — Mandate-by-mandate close-verification (against `A/FINAL.md §3`)

| # | Mandate | A FINAL §3 disposition | Re-verified status |
|---|---|---|---|
| 1 | styling resilience | FULL — W2 (calc-chain, scoped `<style>`, deprecated CSS) | CLOSED (A.W2 commits land; `A/audit/W2-*.md`) |
| 2 | design audit | FULL — W3 (φ scale, radii, shadows) | CLOSED (A.W3 commits land; 7 `A/audit/W3-*.md` docs) |
| 3 | four-state buttons | FULL — W4 | CLOSED (A.W4 commits land; `A/audit/W4-states-{a,b}.md`) |
| 4 | modals/dropdowns/hover | FULL — W4 overlay convergence + W5 a11y | CLOSED (A.W4 + A.W5 a11y; over-reaches corrected B.W1) |
| 5 | duplicated components | FULL — W3 + W4 | CLOSED |
| 6 | golden-ratio hierarchy | FULL — W3 | CLOSED |
| 7 | colocation + `@apply` | FULL — W2 | CLOSED |
| 8 | root-level restyling | PARTIAL — demo done; 4 glass-ui-side fixes filed `coord/Q.md §3` | OPEN-WITH-DESTINATION (7 standing glass-ui §3 gaps; see §3 below) |
| 9 | glass-ui for all | PARTIAL — residuals with named destinations | OPEN-WITH-DESTINATION (blob/aurora abstraction; see §3) |
| 10 | flatten complex components | FULL — W4 Dock/App; B.W1/B.W2 abrogated A.W4 over-fits | CLOSED |
| 11 | skip duplicates | FULL | CLOSED |
| 12 | gaps in value.js AND glass-ui | PARTIAL — glass-ui side filed; **value.js `src/` side scoped to B.W3** | CLOSED at B.W3 (`B/audit/B.W3-library-gap.md`); 11 library gaps recorded, see §3 |
| 13 | Playwright user/admin flows; blob/aurora | PARTIAL — boot probes shipped; full flow + blob/aurora → B.W3 + demo-abstraction tranche | PARTIAL — B.W3 abrogated the brittle 16-spec suite, shipped a 3-spec smoke suite + CI gate; blob/aurora demo-side abstraction remains routed to a future tranche (see §3) |

**Verdict on the 13 mandates**: 9 fully closed; mandates 8, 9, 13 carry named destinations (glass-ui successor tranche, demo-abstraction tranche). Mandate 12 — the AND — landed inside B.W3. No mandate is in silent-deferred state.

## §2 — A close + B close claim spot-checks

Spot-checked 8 specific claims from `A/FINAL.md` and `B/FINAL.md` against the live repo at HEAD `625322e`.

### 2.1 — A close claims

**Claim A-1**: "All keystone runtime faults are discharged: A-key-1 … A-key-4" (`A/FINAL.md:25`). **Spot-check**: `vite.config.ts` no longer hard-aliases `@mkbabb/keyframes.js` to `dist/keyframes.js`; `useMetaballRenderer.ts:74-76` carries the `prefersReducedMotion` const; `App.vue` no longer references `useAuroraBlobs`. **PASS**.

**Claim A-2**: "A's wave-log shows zero `planned`" (`A/FINAL.md:57`, restated `B/FINAL.md §2` row B.W0). **Spot-check**: `grep planned docs/tranches/A/PROGRESS.md` → 0 hits in the wave-log table (one prose hit — "A's PROGRESS.md still records W5 as `planned`" — is a historical-state quote, not a current row). All 8 A wave rows show `closed` or `closed (re-scoped)`. **PASS**.

**Claim A-3**: "Integrity sweep clean — zero unauthorized agent git mutations, zero stashed work, `docs/precepts` changed only as planned" (`A/FINAL.md §5`). **Spot-check**: `git stash list` → empty; `git log --oneline -- docs/precepts` since A open shows one change (`de8c573`, B.W0 advance to `3c32fae`); commit authorship is consistently the orchestrator. **PASS**.

**Claim A-4**: 8 wave commit hashes resolve (`A/FINAL.md §2` wave table). **Spot-check**: `git show bc7ad2c c20f609 c43fc76 92fe64d efc7d25 17f8355 3b72007 f0b8c54 3a1b673 6b3b64e 3a44da3 e58155f 8e99a7d 6cfded5 204c7f8 c011b18 c3df1e2 3f39026 191d66a 7088da4 5247313 36a4ad0 065c6fe a9b6a94` — every commit resolves to the subject line `A/FINAL.md` lists. **PASS**.

### 2.2 — B close claims

**Claim B-1**: "B's wave-log shows zero `planned`" (`B/FINAL.md §4`). **Spot-check**: `grep planned docs/tranches/B/PROGRESS.md` returns prose hits only; the wave-log table (`B/PROGRESS.md:187-193`) has 5 rows, all `closed`. The duplicate-`planned` rows that `B/audit/B.W4-doc-drift.md` D1 flagged (N5) have been removed (B.W4 close commit `625322e` reconciles it). **PASS**.

**Claim B-2**: "`docs/precepts` changed exactly once, as planned" (`B/audit/B.W4-integrity-sweep.md`). **Spot-check**: `git -C docs/precepts rev-parse HEAD` → `3c32faee4deebc79726a15ba7f8001cd0c0fbdf3`. `git log --oneline f9a47ca..HEAD -- docs/precepts` → exactly one entry: `de8c573 chore(precepts): advance shared submodule to 3c32fae`. **PASS**.

**Claim B-3**: "21 B.W2 deletions leave zero dangling imports" (`B/FINAL.md §4` substrate-without-consumer). **Spot-check**: `git ls-files | grep -E 'DockMainLayer|useMobilePaneRouter|useDesktopPaneRouter|useDockLayers|useAtmosphere|useGenericActionBar|PaneSearchBar|useDockActionBar'` → empty. `usePaneRouter.ts` exists, consumed by `App.vue:102,168`. The 7 wrapper composables/components, the 11 `ui/table/` files, and the 3 `ui/alert/` SFCs are all gone (and `ui/alert/index.ts` survives as a glass-ui re-export — `B/audit/B.W4-substrate-without-consumer.md` confirms). **PASS**.

**Claim B-4**: "vue-tsc 212→126" + "smoke 3/3" + "`npm test` 1409" (`B/FINAL.md §2` row B.W3, restated in `CLAUDE.md`). **Spot-check**: `ls test/*.test.ts | wc -l` → 26; `ls e2e/smoke/*.spec.ts | wc -l` → 3; `ls e2e/*.spec.ts` → none (the 16 root specs deleted). `CLAUDE.md:16` now reads "vitest (jsdom) — 1409 tests, 26 files" (B.W4 reconciled the W7-doc-drift item 1). The vue-tsc 126 figure is recorded in `B/PROGRESS.md` and `B/audit/B.W3-typecheck.md`; not re-run here per the read-only constraint. **PASS** (re-run pending).

### 2.3 — Drift detected

| # | Item | Status |
|---|---|---|
| Δ1 | `findings.md` (A) header line still reads "glass-ui HEAD `d244dd5`" — `W7-doc-drift` item 8, called STILL-VALID in `B.W4-doc-drift §1` row 8 | NOT FIXED. `B.W4` close commit `625322e` did not touch `A/findings.md`. Open drift; D may pick up. |
| Δ2 | `A/findings.md §intro` still reads "Mode: tranche development only. No source edits this session" — `W7-doc-drift` item 9 | NOT FIXED. Same provenance — `A/findings.md` was not in B.W4's edit set. |
| Δ3 | `A/coordination/Q.md` (A's pre-B-open coord doc) still cites "precept `SPEC §\"Document Set\"`" — phantom citation, `W7-doc-drift` item 11 | UNCHANGED. The B.W4 close edited *B's* `coordination/Q.md` (the active manifest); the A-vintage Q.md is a frozen historical artefact and still carries the phantom citation. Recorded as historical, not active drift. |
| Δ4 | `A/dispatch/AGENT.md` cites "precept `STYLE.md`" — phantom (`W7-doc-drift` item 13). | UNCHANGED. Same provenance as Δ3. |

These four were inventoried but not corrected in the B.W4 close ceremony — B.W4 fixed the live B-vintage docs (`B/coordination/Q.md`, B's `PROGRESS.md`, `B.W2.md`, `B.W3.md`, `findings.md`, `Bz-legacy-cruft.md`) and the root + demo `CLAUDE.md`, plus the A-vintage close-residuals (`docs(tranche-a/close-residuals) 719d2a6`: `Ag→Ac` rename, `A.md §8`). The A-vintage `findings.md` / `coordination/Q.md` / `dispatch/AGENT.md` were left as historical artefacts of the A planning round, not touched. This is a doc-drift residual; D may opt to fold it in or accept the historical-frozen rationale.

**Verdict on A close + B close**: Substantive claims (wave-log zero `planned`, commit hashes resolve, integrity sweeps clean, deletions leave zero dangling imports, `docs/precepts` pinned to `3c32fae`) all PASS. Four minor doc-drift residuals (Δ1–Δ4) sit in historical A-vintage docs the B.W4 close did not edit.

## §3 — Chronically-deferred items catalogue

Every item routed forward from A and B (not just B's most recent routings). Tabular form: Item | Source | Current status | Folded-into-D candidate.

| # | Item | Source | Current status | Folded-into-D candidate |
|---|---|---|---|---|
| 1 | metaballs `positionSource` hook + pointer input + per-blob opacity + perturbation + WebGL context-loss recovery | `A/coordination/Q.md §3`, re-verified `B/coordination/Q.md §2a` at Q close `4b16de7`, re-verified `A/audit/W6-deferred.md` at glass-ui HEAD `e2e5303` | NOT SHIPPED by glass-ui; demo keeps `useMetaballRenderer.ts` (333 lines); routed to a glass-ui successor tranche | NO — glass-ui repo is the writer; D should re-verify and re-file if still needed |
| 2 | Aurora `deriveAuroraPalette(baseColor, opts)` | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a`, `A/audit/W6-deferred.md` | NOT SHIPPED by glass-ui; routed to a glass-ui successor tranche | NO — glass-ui repo |
| 3 | `BlobDot` organic-dot primitive | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a` | NOT SHIPPED; 11 `WatercolorDot` consumers stay demo-local | NO — glass-ui repo |
| 4 | `SelectTrigger size` prop (`sm` = `h-9`) | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a` | NOT SHIPPED; 11 demo sites carry `h-9` overrides + marker | NO — glass-ui repo |
| 5 | `DockSelectTrigger clampLabel` prop | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a` | NOT SHIPPED; `[&>span]:line-clamp-none` hack + marker stays in `DockViewSelect.vue` | NO — glass-ui repo |
| 6 | `TooltipContent variant="mono"` | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a` | NOT SHIPPED; mono recipes + markers in 7 sites | NO — glass-ui repo |
| 7 | `Button size="icon-sm"` rung | `A/coordination/Q.md §3`, `B/coordination/Q.md §2a` | NOT SHIPPED; 7 demo-side completions + marker | NO — glass-ui repo |
| 8 | `<Tabs variant="underline">` on the **provider** family (re-filed precisely after glass-ui shipped header-only `<UnderlineTabs>`) | `B/audit/B.W2-underline-tabs.md`, `B/coordination/Q.md §3` final row; `B/FINAL.md §3` | OPEN — re-filed sharper to glass-ui successor; demo keeps reka-ui `<Tabs>` + `.underline-tabs` override (a live, documented override) | NO — glass-ui repo (but D should consider whether a demo-side micro-variant is warranted in the interim) |
| 9 | Demo-side blob/aurora abstraction (delete `useMetaballRenderer.ts` lifecycle half, route through glass-ui hook, picker-derived atmosphere, migrate `ConfigSliderPane` → glass-ui `./configurator`) | `A/audit/W6-deferred.md`; `B/FINAL.md §3` | OPEN — a "value.js demo-abstraction tranche, opened once glass-ui ships". `ConfigSliderPane` → `./configurator` is the one piece NOT glass-ui-blocked (the `./configurator` surface ships); recorded as unblocked follow-up | **CANDIDATE** — the `./configurator` adoption is unblocked and demo-only; could be a self-contained D wave |
| 10 | 11 value.js `src/` library gaps (G1–G11) | `B/audit/B.W3-library-gap.md §2` | OPEN — P1 G1 (`registerColorNames`/`clearCustomColorNames` not in barrel) is a zero-cost two-line edit; G3 (14 deep `@src/...` imports in demo) is consumer hygiene; G4–G11 P2/P3 (optional symmetry, docs) | **CANDIDATE** — G1 + G3 + G11 + K5 (export `solveCubicBezierX`) are all small, mechanical, library-only edits |
| 11 | Invariant-30 contract-v2 staleness (value.js pinned `3c32fae` 4-key shape; glass-ui shipped contract-v2 at `ce5aad8` v1.9.3 — 3-key, no `development`, `build:watch` required) | `B/audit/B.W3-library-gap.md §4.2-§4.3`, `A/audit/W6-deferred.md` (adjacent finding) | OPEN — value.js's `package.json` would FAIL glass-ui's now-inverted `proof-resolution-contract.mjs`; no `build:watch` script declared | **STRONG CANDIDATE** — converging value.js to contract-v2 is a single targeted wave (drop `development` from `package.json:24` + `vite.config.ts:45`; add `build:watch` script; advance precept submodule `3c32fae → 68d9b20`; port `proof-resolution-contract.mjs`) |
| 12 | `viewSchema.ts` extraction (separate `ViewId`/`PaneConfig`/`VIEW_MAP` schema from `useViewManager.ts` runtime state) | `B/audit/B.W3-library-gap.md §3` (routed-from-B.W2 cleanup verdict) | OPEN — `useViewManager.ts` 238 lines conflates schema + state; `usePaneRouter.ts` carries its own component registry (a third copy); `router/index.ts` re-enumerates `ViewId` (a fourth copy) | **CANDIDATE** — clean, demo-only, one-extract architectural transposition |
| 13 | `cssColorToRgb` per-frame hot-spot at `useMetaballRenderer.ts:174` | `A/audit/W7-performance.md`, `B/audit/B.W4-performance.md §3` (confirmed still present, line still 174) | OPEN — 1×1 canvas-2D round-trip every frame; A.W7 routed it with `audit/W6-deferred.md` (the demo-abstraction follow-up) | **CANDIDATE** — memoising on the input-string is a 5-line fix that doesn't depend on glass-ui ship; could land alongside item 9 (or independently) |
| 14 | `--menu-min-w` exception sites (3 locations where the dock dropdown stays *wider* than `--menu-min-w` because preset/harmony/view labels need the space) | `demo/.../generate/GenerateControls.vue:91,114` ("B.W1: kept wider than `--menu-min-w`"); `demo/.../dock/DockViewSelect.vue:57` (same marker) | OPEN — a deliberate per-instance override with a marker comment. Records why each site does NOT use the shared token | NO — this is a documented design choice, not deferral; D should leave it unless a `--menu-min-w-wide` token is introduced |
| 15 | 14 W7 doc-drift items + 9 B-introduced items (14+9 = 23 items inventoried by `A/audit/W7-doc-drift.md` and `B/audit/B.W4-doc-drift.md`) | `A/audit/W7-doc-drift.md` (14 items); `B/audit/B.W4-doc-drift.md §2` (9 items) | LARGELY CLOSED — the active B-vintage docs were fixed in B.W4 close (`docs/tranches/B/...`); A close-residuals fixed in `docs(tranche-a/close-residuals) 719d2a6` (the `Ag→Ac` rename + `A.md §8`); root `CLAUDE.md` reconciled to 1409/26 + e2e smoke; demo `CLAUDE.md` reconciled. **4 historical A-vintage residuals remain** (§2 Δ1–Δ4): `A/findings.md` glass-ui HEAD + Mode line, `A/coordination/Q.md` phantom SPEC cite, `A/dispatch/AGENT.md` phantom STYLE.md cite | **OPTIONAL** — historical-frozen docs may be left, or D's close lane sweeps them for completeness |
| 16 | keyframes.js-side gaps (kf-1 through kf-6) + the precept-pin desync (keyframes.js at `458c2d1`, fleet target `3c32fae`) | `B/coordination/Q.md §9`, `B/research/B-keyframes-parity.md` | FILED — B writes value.js only; keyframes.js converges on its own schedule. Items: 965-line OOP god module, inconsistent `import type`, missing `"sideEffects": false`, fleet-divergent `dts({rollupTypes:true})`, demo hand-rolled clipboard, no tranche methodology | NO — keyframes.js repo is the writer |
| 17 | ~104 / 126 generated shadcn-vue typecheck cluster (`ui/auto-form/`, `ui/button/`, `ui/form/`, `ui/chart/`) | `B/audit/B.W3-typecheck.md`, `B/FINAL.md §3`, `findings.md §3` | OPEN — vendored/generated; not B-fixable without regenerating. Routed to a generator-update or vendoring-policy effort. vue-tsc total moved 212 → 126 (B.W3 cleared 86 custom-bucket errors); the residual 126 is the generated cluster | **CANDIDATE** — a generator-update / shadcn-vue regeneration lane, possibly paired with a vendoring-policy decision |
| 18 | K4 — keyframes.js Prettier doc gap | `B/findings.md §2 M`; `B/audit/B.W3-library-gap.md §5` records K4 as "no K4 in the routed item set for this lane" — meaning it routed to B.W4 not Lane A. `B/coordination/Q.md §9` does not list K4 explicitly | UNCLEAR — `findings.md` item M says K1–K3+K5 land in B.W3 and "K4 → B.W4". B.W4 doc-drift inventoried no Prettier-doc fix. **Possibly missed in B's close** | **CANDIDATE** — re-confirm K4 disposition; either close it or re-file |
| 19 | Substrate-without-consumer note: 5 B.W3 library modules (`src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`) have **0 in-repo test/demo consumers** | `B/audit/B.W4-substrate-without-consumer.md §"Note"` | OPEN — public-surface valid by §8 sense (re-exported in `src/index.ts`), but no test coverage; `B.W3 Lane B is expected to add test coverage`. The bundle stayed byte-identical at 139,306 because tree-shaking dropped these unreachable from `src/index.ts` (`B.W4-performance.md §1`) | **STRONG CANDIDATE** — small, library-only, mechanical: add vitest specs for the 5 modules; once wired, the bundle grows and the WIP is properly retired |
| 20 | Generator-update / vendoring-policy decision for `ui/auto-form/`, `ui/chart/`, etc. | `B/audit/B.W3-typecheck.md`, `B/FINAL.md §3` | OPEN — distinct from item 17 in that this is the *policy* layer (regenerate? freeze? remove?), not the error-count itself | **CANDIDATE** — could pair with item 17 |
| 21 | A.W6 fallback path — `useMetaballRenderer.ts` (333 lines) stays in full because the glass-ui hook is unshipped; `WatercolorDot` stays demo-local; `AuroraPane` keeps "under rework" state; atmosphere keeps W0's static `AuroraConfig` | `A/audit/W6-deferred.md` | OPEN — pure inheritance, no demo-side action possible until item 1/2/3 ship | NO — derivative of items 1–3; tracked via §"Named successors" |
| 22 | A↔Q contested boundary | `A/coordination/Q.md §0-1`, `B/coordination/Q.md §4`, `B/FINAL.md §6` | **MOOT** — Q closed without writing value.js; Q's own round-4 audit retired the contested Q.W1 Lane C / Q.W2 Lane B; B.W4 records closed-state | CLOSED — not a candidate; recorded for completeness |
| 23 | `Ab-16` PointerDebugOverlay hardcoded colors | `A.md §8` retire-rationale | RETIRED-WITH-RATIONALE — dev-only debugging surface; no design-token obligation | CLOSED |
| 24 | `Ad-20` SelectContent `min-w-*`/`max-h-*` per-instance literals | `A.md §8` retire-rationale (added by `docs(tranche-a/close-residuals) 719d2a6` per `B.W4-doc-drift §1` row 5) | RETIRED-WITH-RATIONALE — per-instance sizing, no shared token, consolidating invents an abstraction | CLOSED |
| 25 | `Ae-12` Aurora cursor interaction wired separately from canvas | `A.md §8` retire-rationale (same provenance as item 24) | RETIRED-WITH-RATIONALE — cosmetic seam, not a fault | CLOSED |
| 26 | `findings.md` (A) glass-ui HEAD `d244dd5` outlier | §2 Δ1, `B.W4-doc-drift §1` item 8 STILL-VALID | OPEN-RESIDUAL — historical A-vintage doc, not edited by B.W4 | **OPTIONAL** — D doc-drift lane could sweep |
| 27 | `findings.md` (A) stale "planning-only" Mode line | §2 Δ2, `B.W4-doc-drift §1` item 9 STILL-VALID | OPEN-RESIDUAL — historical A-vintage doc, not edited by B.W4 | **OPTIONAL** — D doc-drift lane could sweep |
| 28 | `A/coordination/Q.md §intro` phantom `SPEC §"Document Set"` citation | §2 Δ3, `B.W4-doc-drift §1` item 11 STILL-VALID | OPEN-RESIDUAL — historical | **OPTIONAL** |
| 29 | `A/dispatch/AGENT.md` phantom `STYLE.md` citation | §2 Δ4, `B.W4-doc-drift §1` item 13 STILL-VALID | OPEN-RESIDUAL — historical | **OPTIONAL** |
| 30 | `A/waves/W7.md` phantom "dual ceiling" + stale `3310a8c` header | `B.W4-doc-drift §1` item 14 STILL-VALID-for-W7.md | OPEN-RESIDUAL — historical A-vintage wave spec | **OPTIONAL** |

**Total chronically-deferred items**: 30. **Closed/MOOT**: 5 (items 22, 23, 24, 25, plus 15 partially-closed). **Routed to glass-ui repo (not D-actionable)**: 8 (items 1–8). **Routed to keyframes.js repo**: 1 (item 16). **Strong candidates for D scope**: 6 (items 9 `./configurator`, 10 G1+G3+G11, 11 contract-v2 alignment, 12 `viewSchema.ts` extraction, 13 `cssColorToRgb` memoise, 17/20 typecheck cluster + vendoring policy, 18 K4, 19 5-module test coverage). **Optional doc-drift residuals**: 5 (items 26, 27, 28, 29, 30).

### 3.1 — Additional routed-forward items not in the brief

Found during the read; flagged for completeness:

- **Δ5 — `B.W2.md` Lane C wave-spec drift** (B.W4-doc-drift §2 N8): the wave spec still describes a UnderlineTabs migration the wave explicitly rejected. B.W4 close should have added a "re-scope note" analogous to `B.W4.md:7` and `B.W2.md:7`. **Spot-check**: `B.W2.md` `+++ added 2 lines` at B.W4 close `625322e` — partially fixed (a note was added). May warrant a re-read to confirm completeness. **Status**: PARTIALLY-CLOSED; D may verify.
- **Δ6 — `gh-pages` `dist/` housekeeping** (`A/audit/W7-performance.md`, "rebuild with a clean `dist/` to drop the stale `gh-pages` demo chunks `postcss-BrHISTov.js`, `standalone-*.js`"): `B.W4-performance.md §1` confirms "still stands; those chunks remain in `dist/`". **Status**: OPEN-MINOR; D may sweep as a housekeeping item or leave.

## §4 — Brand-new tranche-D directive — parsed clauses + candidate scope list

The user's brand-new directive opens D. Reproduced and parsed from the Da lane brief.

### 4.1 — Quoted key clauses

> Recap every user prompt across tranches A and B. Sources: `docs/tranches/A/findings.md §1`, `docs/tranches/B/findings.md §1` … `docs/tranches/B/B-PROMPTS.md` (verbatim prompts). List every prompt verbatim-extract, dated. The user's brand-new directive (the one that opens tranche D) — quote its key clauses too. Mandates 1-13 of A's brief: verify each is closed against `docs/tranches/A/FINAL.md §3`.

→ Implies a **complete recap audit** scope: every turn-1 mandate verified closed-or-routed (§1.2 above).

> Verify the A close (`docs/tranches/A/FINAL.md`) and B close (`docs/tranches/B/FINAL.md`) claims against the actual repo. Spot-check 6-8 specific claims (commit hashes resolve, wave-log zero `planned`, integrity sweeps clean, etc.). Flag any drift.

→ Implies a **close-honesty re-verification** scope (§2 above). The phrase "Flag any drift" mandates surfacing residuals like Δ1–Δ6.

> **Catalogue chronically-deferred items** — items routed forward across A and B, not just B's most recent routings.

→ This is the **load-bearing scope clause** for D. The catalogue (§3 above, 30 items) is the substrate. The implicit thesis: B left ≥30 items routed forward; D should triage which are D-scope, which are external-repo, which are MOOT.

> [Enumeration of categories]: The 7 standing glass-ui §3 gaps … The blob/aurora demo-side abstraction … The 11 value.js `src/` library gaps … The 126 generated shadcn-vue typecheck cluster … The `<Tabs variant="underline">` re-filed gap … The invariant-30 contract-v2 staleness … The 14 W7-doc-drift items (fixed by B.W4) + 9 B-introduced (fixed) — verify all closed … The keyframes.js-side gaps … The `cssColorToRgb` per-frame hot-spot … The `useViewManager` view-schema extraction recommendation … The `--menu-min-w` exception sites … Any other routed-forward items you find.

→ The list is comprehensive; §3 covers every named item plus 3 additional residuals discovered during the read (items 15-Δ residuals, item 19 5-module test coverage, item 18 K4 K-disposition question, Δ5, Δ6).

> CONSTRAINTS: NO mutating git. NO edits anywhere except your research doc. Read-only across `docs/tranches/A`, `docs/tranches/B`, `git log`, the repo. Declarative evidence-led prose.

→ Lane Da posture: read-only research; this doc is the only artefact written.

### 4.2 — Candidate D scope list (synthesized from §3)

Triaged by **value.js-side actionability** (can D write the change?) and **size** (single-lane vs multi-lane).

**Tier 1 — small, mechanical, library-only (favoured for early waves)**:

- **D.x — Library-barrel completeness** (items 10 + 18 + 19):
  - G1: add `registerColorNames` + `clearCustomColorNames` to `src/index.ts` (2-line edit)
  - G11/K5: export `solveCubicBezierX` from the easing barrel (1-line edit)
  - Add vitest specs for the 5 B.W3 library modules (item 19) — closes the substrate-without-test gap
  - K4 K-disposition resolution (item 18) — verify and either close or re-file

**Tier 2 — single architectural transposition**:

- **D.x — Invariant-30 contract-v2 alignment** (item 11): drop `development` from `package.json:24` + `vite.config.ts:45`; add `build:watch` script; advance `docs/precepts` submodule `3c32fae → 68d9b20`; port `proof-resolution-contract.mjs` from glass-ui. One self-contained wave. **Highest precept-alignment value.**
- **D.x — `viewSchema.ts` extraction** (item 12): extract `ViewId`/`LeftPane`/`RightPane`/`PaneConfig`/`VIEW_MAP` from `useViewManager.ts` into `demo/@/composables/viewSchema.ts`; route `usePaneRouter.ts` + `router/index.ts` through it; collapse the 4-copy `ViewId` enumeration. Demo-only.

**Tier 3 — pure performance/maintenance, optional**:

- **D.x — Demo-abstraction micro-wave (unblocked half of item 9)** + **`cssColorToRgb` memoise (item 13)**:
  - Migrate `ConfigSliderPane.vue` onto glass-ui's `./configurator` surface (NOT glass-ui-blocked; the `./configurator` ships)
  - Memoise `cssColorToRgb` on the input string at `useMetaballRenderer.ts:174` (5-line fix)
  - Optional: `gh-pages` `dist/` housekeeping (Δ6)

**Tier 4 — broader, possibly out-of-scope for one tranche**:

- **D.x — Generated typecheck cluster + vendoring policy** (items 17, 20): regenerate `ui/auto-form/`/`ui/chart/` against current shadcn-vue, or formalise a vendoring-policy decision (freeze + suppress, remove unused, custom-fork). Larger surface; could be one wave or split.

**Tier 5 — housekeeping doc-drift residuals**:

- **D.x — A-vintage doc-drift residuals** (items 26, 27, 28, 29, 30; Δ1–Δ4 + Δ5): historical A `findings.md` / `coordination/Q.md` / `dispatch/AGENT.md` / `waves/W7.md`. Trivial edits if the orchestrator decides historical-frozen is not the right disposition.

**Not in D scope** (named external destinations):

- Items 1–8: glass-ui successor tranche
- Item 16: keyframes.js own schedule
- Items 22 (MOOT), 23, 24, 25 (already RETIRED)
- Item 21 derivative of 1–3

**Net candidate count**: 4 Tier-1/2 candidates (the librarian-grade ones), 2 Tier-3 candidates, 1 Tier-4 candidate, 5 Tier-5 housekeeping items. D's scope is large enough to require triage; a small-and-bounded posture (Tier 1 + Tier 2) is the lowest-risk close-completion shape (mirrors B's "five waves, narrow scope" pattern).

### 4.3 — Recurring user-directive pattern

Across turns 1, 2, 4, 5 the user repeatedly issues four clauses:

1. **Recap** — every prompt, every mandate, every plan;
2. **Audit + harden** — 6 agents in parallel; identify gaps; challenge;
3. **Deferred items** — delineate everything chronically deferred; fold into the new tranche;
4. **No legacy, no quick fixes** — architectural transposition over workaround.

D's plan should honour all four. The Da lane (this doc) covers clauses 1 + 3. A hardening pass (Db–Dζ) covers clause 2. The Tier-1/2 candidates (§4.2) satisfy clause 4 by being architectural transpositions (extraction, alignment, completeness), not patches.

---

**End of Da. Lane summary**: 6 user prompts (5 turn-bundles) across A+B + 1 new for D recapped verbatim; A close and B close substantive claims spot-checked PASS with 4 historical-doc-drift residuals; 30 chronically-deferred items catalogued (5 closed/MOOT, 9 external-repo, 6 strong D candidates, 5 housekeeping residuals, others derivative); D candidate scope triaged into 5 tiers.
