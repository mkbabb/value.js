# R.W2 — FUNCTIONAL TRUTH (demo P0s; behavior before beauty)

**Name**: W2 — Functional truth (the demo P0 sweep)
**Opens after**: R.W0 (runs parallel with R.W1 / R.W6). R.W3 requires this wave — design lands on a working substrate, never atop a shim.
**Spec of record**: `SYNTHESIS-v2.md §3 R.W2` · gate split per `dispatch-homes.md B.2` · boot proof per `boot-blast-radius.md`.
**Agents**: 1 serial — units 1→2→3 sequence (the boot cure unmasks the Tabs drift; the tripwire lands with the migration), and units 1 + 6 share `vite.config.ts`, so one writer keeps disjointness trivial.
**Hard gate**: composite (§Hard gate) — cold boot clean · gh-pages `✓ built` · hero-lab artifacts gone · e2e green · the 1440 defect + root confirmed in-tree · zero ungated rAF · zero phantom classes.
**Status**: DISPATCHABLE (RATIFIED-2026-07-03). The Q1 FLIP folds the **hero-lab artifact deletion** into this wave (item 6) and drops `build:hero-lab` from the gate (gh-pages only).

---

## §Goal criterion

The demo tells the truth on first contact, cold: it **boots** (the vite self-alias no longer mangles `@mkbabb/value.js/math`); it **builds** for deploy (the Tabs drift dies); the first destructive gesture **preserves data** (save with the backend down); the controls a user turns **change the output** (kC — the quantizer's chroma-weight control, today a placebo); the background **moves** (U33 motion); no ungated rAF (requestAnimationFrame) loop spins under PRM (prefers-reduced-motion); and the 1440 dual-pane defect is confirmed at its cascade root in-tree so the producer fix can be verified at consume. Behavior outranks polish — this wave is bugs, not design.

## §Completion criterion

The §Hard gate below: cold boot clean, both deploy builds `✓ built`, e2e green, the defect + root confirmed in-tree, zero ungated rAF, zero phantom classes.

---

## §Scope — agent units (R.W2.1–R.W2.6; "item N" below = R.W2.N)

### R.W2.1 · Boot fix — exports-map-driven anchored-regex aliases (proven all 4 vite modes)

- **Goal**: the demo boots cold — the self-alias no longer mangles `@mkbabb/value.js/math`, and the alias↔exports coupling can never silently drift again.
- **Mechanism**: alias generation from `package.json#exports` (anchored regexes), per the preserved seeds below.
- **Files**: `vite.config.ts:50` (dev-config-only; production dist byte-identical).
- **Sub-gate**: `boot-smoke` cold (`--force`) green; production dist hash-parity held.

Replace the object-form self-alias (**`vite.config.ts:50`** — a prefix rewrite that mangles `@mkbabb/value.js/math` → `dist/value.js/math`, "Not a directory") with **alias generation from `package.json#exports`**: one **`^…$`-anchored regex** entry per exports key, the replacement read from each entry's `conditions.import`, resolved against `import.meta.dirname`. Seeds: **`audit/pass2/seeds/vite-config-boot-cure.patch`** + **`seeds/vite.config.cured.ts`**.

- The alias↔exports coupling is eliminated **by construction** (kills CRIT-M2): add/rename/remove a subpath in the exports map and the dev alias follows; a `conditions.import`-missing entry throws loudly at config load (fail-fast).
- The `@…` demo aliases keep string-prefix semantics (they need them).
- **Corrected premise**: the alias's true job is to **override the stale registry self-install** `node_modules/@mkbabb/value.js@1.0.2` (the `package.json:113` self-dep materializes a real tarball dir — the "nothing to resolve to" rationale was false). State this in the config comment.
- **Dev-config-only**: production dist **byte-identical** (71 files hashed); no republish; decoupled from every publish gate.
- **Gate instrument**: **`boot-smoke` cold** (`--force`) — a warm dep-optimizer cache can render a stale-but-green graph; only cold links the whole runtime graph (demo + glass-ui dist + keyframes dist) and structurally trips both drift axes (path shape AND named exports).

### R.W2.2 · Tabs drift — the demo's migration to glass-ui `SegmentedTabs` (P0, unmasked by the boot cure)

- **Goal**: the deployed demo builds against glass-ui 4.2.0 — the dead Tabs shim dies at the producer's component-type name.
- **Mechanism**: migrate the 10 consumers to `SegmentedTabs`; reka-ui direct only as the proven fallback shape.
- **Files**: `demo/@/components/ui/tabs/index.ts:1` + the 10 consumer files.
- **Sub-gate**: `npm run gh-pages` reaches `✓ built`; no demo-defined Tabs.

glass-ui 4.2.0's barrel exports **none** of `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`; `./tabs` exports only `SegmentedTabs`. **`demo/@/components/ui/tabs/index.ts:1`** dead-imports the four; **10 demo files** consume the shim; gh-pages + hero-lab die at LINK phase — until migrated, the *deployed* demo is unbuildable against 4.2.0.

- **Migrate to `SegmentedTabs`** (glass-ui-first-class precept; reuse the producer's component-type name).
- **Proven fallback** (bounded risk, `SYNTHESIS-v2.md §13` residual-1): reka-ui direct (`TabsRoot as Tabs` + `TabsList`/`TabsTrigger`/`TabsContent`) — the diagnostic stub built **both** modes fully green (`gh-pages ✓ built 1.27s`, `hero-lab ✓ built 586ms`). If `SegmentedTabs` does not drop-in-cover the 10 consumers' compound usage, the API adaptation is decided at implementation under the glass-ui-first precept — never a demo-defined Tabs.

### R.W2.3 · Abrogation-sweep named-export tripwire (lands with the Tabs migration)

- **Goal**: a removed glass-ui named export can never again render the sweep green — its documented blind spot closes.
- **Mechanism**: extend the sweep's half-1 to assert each named binding against the resolved dist module's export set.
- **Files**: `scripts/abrogation-sweep.mjs:84-109`.
- **Sub-gate**: the extended sweep trips on the known pre-migration Tabs drift, then runs green post-migration.

Extend **`scripts/abrogation-sweep.mjs`** half-1 (`:84-109`): for each `import {A, B} from "@mkbabb/glass-ui[/sub]"` in `demo/`, assert each named binding exists in the resolved dist module's export set. The sweep is green **today despite the Tabs drift** (it validates specifier resolution only — a removed named export is precisely an abrogation it currently blind-spots). `boot-smoke` cold remains the load-bearing catch-all either way.

### R.W2.4 · Dual-pane 1440 (D8-1) — the gate split (verbatim per SYNTHESIS-v2 §3 R.W2 / dispatch-homes B.2)

- **Goal**: the 1440 dual-pane defect stands confirmed at its cascade root in-tree, so the producer's `layer(components)` cure verifies at consume.
- **Mechanism**: the INTERNAL/EXTERNAL gate split below — confirm + own the boot fix here; never the cascade cure.
- **Files**: the in-tree CSSOM probe (re-authored per the SHIM oracle; never the discarded `.w6a-audit*.mjs` scratch).
- **Sub-gate**: the probe records the defect + the unlayered `@import "./components.css"` root; the no-shim render bar stays a BOOK (books-never-gates: a BOOK is a trigger-bound follow-up, recorded and serviced when its trigger fires — never a close-blocking gate).

- **INTERNAL (hard, blocks R.W2)**: the boot fix green across all four modes; the 1440 dual-pane defect **and** its cascade root confirmed by an **in-tree CSSOM probe** (root: glass-ui's build-emitted unlayered `@import "./components.css"` — 53 KB of bare Tailwind utilities whose `.hidden` annihilates the demo's layered `lg:flex`; every demo-side cure REFUTES, breaking Tailwind-v4 `@utility` registration). R.W2 **confirms the defect + owns the boot fix**; it does **not** own the cascade cure.
- **EXTERNAL (BOOKED, does NOT block R.W2)**: the **no-shim render gate** — "dual-pane renders at 1440 without the w6a shim" — retires when glass-ui's `layer(components)` dist lands. The D8-1 ask was **dispatched to the live BG agent at pass-2 time** (`dispatch-homes.md B.3`); the fix is two emission sites in glass-ui `vite.style-assets.ts:307` / `:366`, zero collateral verified. **Verify at consume**: re-run the 1440 probe against the rebuilt `file:../glass-ui` dist, confirm `visibleCount 2` with no `!important`, retire the shim knowledge from the gate wording. Books-never-gates.

**The SHIM oracle (carried from W0-2, files dead, knowledge alive)**: the falsifiable before/after bar is that today a `display:flex !important` shim is the *only* thing that renders the panes at 1440; the in-tree probe re-authors that technique against the current substrate — the discarded `.w6a-audit*.mjs` scratch never returns as tracked source.

### R.W2.5 · The N.W10 rows + carries (functional-truth P0s; anchors live)

- **Goal**: the functional-truth P0s die at their live anchors — data preserved on the first destructive gesture, controls that do what they say, motion that moves (and stops under PRM).
- **Mechanism**: the row table below (the N.W10 born-RED witnesses + fix shapes, anchors re-verified against the live tree at pass 2).
- **Files**: the per-row cites in the table.
- **Sub-gate**: per-row fixes green under the e2e 5-project suite; the kC divergence vitest green; zero ungated rAF; zero phantom classes; each kill-list deletion spot-verified first (exists-at-path + rg re-run at HEAD + re-export-alias resolution, per `SPEC.md §"Audit-verdict spot-verification gate"`).

| Row | Root (file:line) | Fix |
|---|---|---|
| **U9** reset-broken | `demo/@/composables/color/useAppColorModel.ts:43` (`resetToDefaults`), `:62-68` (debounced store sync); `ColorInput.vue` repaint | reset writes the FULL default into the persisted store **synchronously** (a reset is an explicit act, not a typing cadence); contenteditable repainted unconditionally; the already-default no-op gets a NAMED design call |
| **save-P0** | `demo/@/composables/palette/usePaletteActions.ts:59-63` (`await ensureUser()` throws before `createPalette` runs) | local-first inversion: `createPalette` **unconditional**; `ensureUser()` deferred to publish (where `onPublish:35-41` already guards it); save with the backend down loses zero data |
| **kC placebo** | `useImageQuantize.ts:91-99` forwards only `{k}`; call site `ImagePaletteExtractor.vue:160-162` | thread `chromaWeight` into the worker options (the library already consumes it — `src/quantize/index.ts:141`); divergence vitest (`chromaWeight` 0 vs 1 on the same fixture yields a measurably different palette) |
| **K-INV5** | `client.ts:29` (`VITE_API_URL` hack) | delete → typed degraded-backend signal; kills the CORS noise polluting every console-clean gate |
| **U33 aurora motion** | `demo/@/components/custom/panes/keys.ts:22-28` (`DEFAULT_AURORA_ATOMS`; `motion:"breathing"` at `:28`) | flip to the spatial-drift register (derive landed at 4.x; the actual complaint — *motion* — didn't); temporal oracle per the N.W10 clause-e shape, thresholds calibrate-at-implementation, PRM-inverted |
| **X6** dual-mount WebGL blob | `App.vue:34-69` (three sibling `PaneSlot` mounts; hidden-but-LIVE `goo-blob-canvas`) | `v-if`-gated single mount; exactly **1** live blob canvas at any viewport |
| **X8** pane-router cold-hash | `demo/@/composables/usePaneRouter.ts` | fix the cold-load hash-route resolution |
| **X9** tags-warn | `BrowsePane.vue` (the tag-catalog computed) | `availableTags` Object→Array coercion |
| **mix-RAF PRM** | `useMixingAnimation.ts` — **5 ungated rAF** (`:77`, `:83`, `:99`, `:189`, `:196`) — the last live PRM hole | gate the loop on `prefers-reduced-motion` (the demo's standing PRM discipline) |
| **watercolor-swatch phantom** | `MixSourceSelector.vue:148` (class consumed; never defined) | **consume the glass-ui `WatercolorDot` ghost variant or delete** — never define-in-demo |
| **kill-list** (verify-then-delete) | `palette-browser/composables/useCardMenu.ts` · `markdown/composables/useCodeFormatting.ts` · dup `usePaletteExport` (`demo/@/composables/palette/usePaletteExport.ts` vs `palette-browser/PaletteDialog/composables/usePaletteExport.ts`) | grep-verify zero consumers, then delete (dedup the export pair to one module) |
| **K-W3DIFF** | PaletteDiff render (the chronic K→M→N.W6→R modern-web carry) | land the diff render |
| **K-PALID** | palette id-honesty (same carry chain) | land the id-honesty fix |

### R.W2.6 · Hero-lab artifact deletion (Q1 FLIP — owner order, RATIFIED-2026-07-03; NO legacy code)

- **Goal**: hero-lab dies entirely (the Q1 FLIP, owner order) — no legacy code, no orphaned build mode surviving the kill.
- **Mechanism**: delete the tree, the vite mode branch, and the two npm scripts, per the verified-live table below.
- **Files**: `demo/hero-lab/` (tree) · `vite.config.ts:202-229` · `package.json:72`/`:74`.
- **Sub-gate**: tree absent; no hero-lab branch in `vite.config.ts`; no `*:hero-lab` scripts; grep-zero (deletion proof).

Hero-lab was KILLED entirely at ratification (not slipped): the treatment (`docs/frontend-design/hero-lab.md`) and the wave doc (`waves/R.W5.md`) are already deleted from the corpus; this wave deletes the APP artifacts. Verified live at `e80b359` — exactly these exist, nothing else (no e2e/CI/scripts references grep-verified):

| Artifact | Live cite (verified 2026-07-03) | Action |
|---|---|---|
| `demo/hero-lab/` tree | `App.vue` · `components/` · `hero-lab.css` · `index.html` · `lib/` | **DELETE the tree** |
| vite hero-lab mode branch | `vite.config.ts:202-229` — the `} else if (mode.mode === "hero-lab") {` branch (root `./demo/hero-lab/`, outDir `./dist/hero-lab`) | **DELETE the branch** |
| npm scripts | `package.json:72` `"dev:hero-lab": "vite --mode hero-lab --port 9010"` · `package.json:74` `"build:hero-lab": "vite build --mode hero-lab"` | **DELETE both** |

The picker does NOT absorb hero-lab scope — the interpolation-path signature dies with the page (the gradient pane already covers interpolation as existing scope). The pass-2 all-4-modes boot proof (`boot-blast-radius.md`) remains valid historical evidence; post-deletion the live vite modes are production / gh-pages / dev.

---

## §Triumvirate dispatch

A triumvirate (research + plan-augment + redress, per `ORCHESTRATION.md §Triumvirate Auto-Triggers`) is mandatory — never a solo redispatch — on:

- **bounds expansion**: any `src/` runtime write (the kC fix threads options demo-side; the library half already ships) or any glass-ui write invalidates this demo wave (scope reveal, per `SPEC.md §Scope Reveal`);
- **non-local gate failures**: `SegmentedTabs` failing to cover the 10 consumers' compound usage beyond the proven reka-direct fallback shape (a producer-boundary API-adaptation call); the boot fix failing any live vite mode (the exports-map premise broken); the 1440 CSSOM probe refuting the cascade-root attribution (the unlayered-`@import` premise);
- **loop halt**: the third iteration of any of these diagnostic loops halts and routes.

## §File bounds · disjointness · worktrees

| Unit | Files | Access |
|---|---|---|
| R.W2.1 | `vite.config.ts:50` (alias block) | modify |
| R.W2.2 | `demo/@/components/ui/tabs/` + the 10 consumers | modify/delete |
| R.W2.3 | `scripts/abrogation-sweep.mjs` | modify |
| R.W2.4 | the in-tree CSSOM probe home (`e2e/`) | create |
| R.W2.5 | the per-row cites in its table; the kill-list paths (delete); the kC divergence vitest | modify/delete/create |
| R.W2.6 | `demo/hero-lab/` (tree, delete) · `vite.config.ts:202-229` · `package.json:72`/`:74` | delete/modify |

Do NOT touch: `src/` runtime modules, `../glass-ui` (the D8-1 cure is producer-owned; any cross-repo push is orchestrator-authored), `docs/precepts/`. Units 1 + 6 share `vite.config.ts` — one writer or sequenced, never parallel (§State). Single writer — no sibling worktrees.

## §Hard gate (verbatim per SYNTHESIS-v2 §3 R.W2)

Demo boots **cold-cache** clean (`boot-smoke --force`); `npm run gh-pages` reaches `✓ built` (`build:hero-lab` dropped from the gate — the Q1 FLIP, RATIFIED-2026-07-03; the pass-2 all-4-modes proof stands as historical evidence); **hero-lab artifacts gone** (item 6: `demo/hero-lab/` absent, no hero-lab branch in `vite.config.ts`, no `*:hero-lab` scripts in `package.json`, grep-zero); e2e 5-project suite green; the 1440 defect + root confirmed in-tree; zero ungated rAF; zero phantom classes. **The no-shim render bar is EXTERNAL-booked** (short window — BG is live and the fix is mechanical) — a BOOK, never a gate.

## §No-workaround prohibitions (binding)

- **NO demo-side cascade cure** for D8-1 — every demo-side variant REFUTES (breaks Tailwind-v4 `@utility` registration); the cure is the producer's `layer(components)`, verified at consume.
- **NO `!important`** on the demo's `lg:flex`/`lg:block` to out-shout the unlayered rule.
- **NO demo-defined Tabs** — `SegmentedTabs` first; reka-direct only as the proven fallback shape.
- **NO widening `boot-smoke`'s noise allow-list** to swallow CORS errors — the cure is the typed degraded-backend (don't make the doomed request), not filtering its symptom.
- **NO re-introducing `VITE_API_URL`** under another name.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each unit batch and before close; `npx playwright test` (the 5-project smoke suite) after the P0 rows and before close; `boot-smoke --force` cold re-runs after each unit that touches the module graph (units 1, 2, 6).

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the cold `boot-smoke --force` log; the gh-pages `✓ built` build log; the e2e 5-project summary; the 1440 CSSOM probe output (the defect + root record — the artefact the D8-1 BOOK verifies against at consume); the kC divergence vitest output; the hero-lab deletion proof (grep-zero capture); the kill-list spot-verification record; per-unit commit hashes.

## §Commit plan

The boot fix (R.W2.1); the Tabs migration + tripwire as one batch (R.W2.2 + R.W2.3 — the tripwire lands with the migration); the 1440 probe + gate-split record (R.W2.4); the P0 rows batched with row-scoped messages (R.W2.5); the hero-lab deletion as its own commit with body (R.W2.6 — a deletion commit); a doc/status commit at close. Commit scopes name the owned surface (boot / tabs / probe / the row anchor), not only the tranche.

## §Dependencies

- **Depends on**: R.W0 (the seeds + the SHIM-oracle gate wording).
- **Blocks**: R.W3 (design lands on a booting, building, truthful substrate).

## §BOOKS opened/serviced by this wave (books-never-gates)

- **D8-1 no-shim verify — RETIRED 2026-07-03 (verify-at-consume FIRED).** The defect recurred mid-wave at a NEW producer site (the BG rebuild moved `/styles` onto the emitted tree with the unlayered import at `dist/styles/index.css:266`, escalating the blast radius to boot-at-≥lg); escalated same-day (glass-ui `1599c230`), CURED same-day by BG (`4b637036` — `layer(components)` at the `vite.utility-emit.ts` emission site, legacy-line self-heal, rationale comment naming the escalation; reply: `VALUEJS-R-D8-1-REPLY-2026-07-03.md`). The re-authored 1440 probe records **CURE_OBSERVED** (visibleCount 2, no `!important`, all `.hidden` sites layered). The shim knowledge retires from all gate wording.
- **K-INV5 typed degraded-backend (BOOK, adjudicated 2026-07-03 — the row's literal fix REFUTED by experiment).** `VITE_API_URL` is idiomatic test-endpoint DI, not a hack: the mocked hermeticity specs are CORS-transparent under Playwright `route.fulfill` (deletion-probe 3/3 == baseline 3/3), and deleting it either couples `boot-smoke` to live-prod uptime (demonstrated: probe boot-smoke PASS only via `api.color.babb.dev` 200) or leans on the prohibited CORS noise-filter. The functional kernel (backend-down save loses zero data) landed via save-P0. **Residual → R.W3**: typed API-availability latch (first-failure → `ApiUnavailable`, no repeated doomed requests) + the "backend offline — saved locally" degraded affordance on save/publish surfaces. Trigger: R.W3 dispatch.
- **K-W3DIFF PaletteDiff render (BOOK, adjudicated 2026-07-03 — REFUTED-AS-CONTRIVANCE with evidence).** No natural diff-consumer surface exists: `/diff` recomputes on demand (never reads stored `atomDiff`); the stored field is surfaced only by `/remix`, consumed by zero demo code; `VersionHistoryDrawer` is a list with no two-version selector; `forkPalette` discards `atomDiff`/`remixedFrom`. Landing a render would build its own trigger — the write-only contrivance the adjudication clause names. **Trigger**: the first demo surface exposing (a) version-to-version compare in the drawer or (b) a remix-review panel. **Action on fire**: add `getPaletteDiff(slug, from, to)` to `demo/@/lib/palette/api/versions.ts` and render there. **Alternative exit**: cease persisting the write-only version `atomDiff` field (api-side). The chronic K→M→N.W6→R carry stops being a silent non-resolution.
- **glass-ui 5.0.0 adopt event** carries the neighboring demo re-points (`/goo-blob`→`/blob` at `App.vue:115`, GAP-3 subpath walk incl. `/tabs`) — not this wave's work.

## §Evidence packets consumed

`audit/pass2/boot-blast-radius.md` (four-mode proof + byte-parity + the Tabs unmask + the sweep blind spot) · `audit/pass2/dispatch-homes.md` PART B (the gate split + the dispatched D8-1 relay text) · `audit/pass2/seeds/{vite-config-boot-cure.patch, vite.config.cured.ts}` · `docs/tranches/N/waves/N.W10.md` (the born-RED witnesses + fix shapes for U9/X6/save-P0/kC/K-INV5/U33/X9 — anchors re-verified against the live tree at pass 2).

## §Hand-off

R.W3 (the instrument) opens only on this wave + R.W1 — design lands on a booting, building, truthful substrate. The D8-1 EXTERNAL book rides into R.W3's window (if the BG cut stalls past R.W3's start, the design wave proceeds on the internally-confirmed defect record with the book still open — never a gate, `SYNTHESIS-v2.md §13` residual-4). The Tabs migration + tripwire feed the R.W7 relay letter's GAP-3 (the glass-ui subpath walk) by-name discipline precedent.
