# R.W2 — FUNCTIONAL TRUTH (demo P0s; behavior before beauty)

**Name**: W2 — Functional truth (the demo P0 sweep)
**Opens after**: R.W0 (runs parallel with R.W1 / R.W6). R.W3 requires this wave — design lands on a working substrate, never atop a shim.
**Spec of record**: `SYNTHESIS-v2.md §3 R.W2` · gate split per `dispatch-homes.md B.2` · boot proof per `boot-blast-radius.md`.
**Status**: DISPATCHABLE (RATIFIED-2026-07-03). The Q1 FLIP folds the **hero-lab artifact deletion** into this wave (item 6) and drops `build:hero-lab` from the gate (gh-pages only).

---

## §Goal criterion

The demo tells the truth on first contact, cold: it **boots** (the vite self-alias no longer mangles `@mkbabb/value.js/math`); it **builds** for deploy (the Tabs drift dies); the first destructive gesture **preserves data** (save with the backend down); the controls a user turns **change the output** (kC); the background **moves** (U33 motion); no ungated rAF loop spins under PRM; and the 1440 dual-pane defect is confirmed at its cascade root in-tree so the producer fix can be verified at consume. Behavior outranks polish — this wave is bugs, not design.

## §Completion criterion

The §Hard gate below: cold boot clean, both deploy builds `✓ built`, e2e green, the defect + root confirmed in-tree, zero ungated rAF, zero phantom classes.

---

## §Items

### 1 · Boot fix — exports-map-driven anchored-regex aliases (proven all 4 vite modes)

Replace the object-form self-alias (**`vite.config.ts:50`** — a prefix rewrite that mangles `@mkbabb/value.js/math` → `dist/value.js/math`, "Not a directory") with **alias generation from `package.json#exports`**: one **`^…$`-anchored regex** entry per exports key, the replacement read from each entry's `conditions.import`, resolved against `import.meta.dirname`. Seeds: **`audit/pass2/seeds/vite-config-boot-cure.patch`** + **`seeds/vite.config.cured.ts`**.

- The alias↔exports coupling is eliminated **by construction** (kills CRIT-M2): add/rename/remove a subpath in the exports map and the dev alias follows; a `conditions.import`-missing entry throws loudly at config load (fail-fast).
- The `@…` demo aliases keep string-prefix semantics (they need them).
- **Corrected premise**: the alias's true job is to **override the stale registry self-install** `node_modules/@mkbabb/value.js@1.0.2` (the `package.json:113` self-dep materializes a real tarball dir — the "nothing to resolve to" rationale was false). State this in the config comment.
- **Dev-config-only**: production dist **byte-identical** (71 files hashed); no republish; decoupled from every publish gate.
- **Gate instrument**: **`boot-smoke` cold** (`--force`) — a warm dep-optimizer cache can render a stale-but-green graph; only cold links the whole runtime graph (demo + glass-ui dist + keyframes dist) and structurally trips both drift axes (path shape AND named exports).

### 2 · Tabs drift — migrate the demo to glass-ui `SegmentedTabs` (P0, unmasked by the boot cure)

glass-ui 4.2.0's barrel exports **none** of `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`; `./tabs` exports only `SegmentedTabs`. **`demo/@/components/ui/tabs/index.ts:1`** dead-imports the four; **10 demo files** consume the shim; gh-pages + hero-lab die at LINK phase — until migrated, the *deployed* demo is unbuildable against 4.2.0.

- **Migrate to `SegmentedTabs`** (glass-ui-first-class precept; reuse the producer's component-type name).
- **Proven fallback** (bounded risk, `SYNTHESIS-v2.md §13` residual-1): reka-ui direct (`TabsRoot as Tabs` + `TabsList`/`TabsTrigger`/`TabsContent`) — the diagnostic stub built **both** modes fully green (`gh-pages ✓ built 1.27s`, `hero-lab ✓ built 586ms`). If `SegmentedTabs` does not drop-in-cover the 10 consumers' compound usage, the API adaptation is decided at implementation under the glass-ui-first precept — never a demo-defined Tabs.

### 3 · Abrogation-sweep named-export tripwire (lands with the Tabs migration)

Extend **`scripts/abrogation-sweep.mjs`** half-1 (`:84-109`): for each `import {A, B} from "@mkbabb/glass-ui[/sub]"` in `demo/`, assert each named binding exists in the resolved dist module's export set. The sweep is green **today despite the Tabs drift** (it validates specifier resolution only — a removed named export is precisely an abrogation it currently blind-spots). `boot-smoke` cold remains the load-bearing catch-all either way.

### 4 · Dual-pane 1440 (D8-1) — the gate split (verbatim per SYNTHESIS-v2 §3 R.W2 / dispatch-homes B.2)

- **INTERNAL (hard, blocks R.W2)**: the boot fix green across all four modes; the 1440 dual-pane defect **and** its cascade root confirmed by an **in-tree CSSOM probe** (root: glass-ui's build-emitted unlayered `@import "./components.css"` — 53 KB of bare Tailwind utilities whose `.hidden` annihilates the demo's layered `lg:flex`; every demo-side cure REFUTES, breaking Tailwind-v4 `@utility` registration). R.W2 **confirms the defect + owns the boot fix**; it does **not** own the cascade cure.
- **EXTERNAL (BOOKED, does NOT block R.W2)**: the **no-shim render gate** — "dual-pane renders at 1440 without the w6a shim" — retires when glass-ui's `layer(components)` dist lands. The D8-1 ask was **dispatched to the live BG agent at pass-2 time** (`dispatch-homes.md B.3`); the fix is two emission sites in glass-ui `vite.style-assets.ts:307` / `:366`, zero collateral verified. **Verify at consume**: re-run the 1440 probe against the rebuilt `file:../glass-ui` dist, confirm `visibleCount 2` with no `!important`, retire the shim knowledge from the gate wording. Books-never-gates.

**The SHIM oracle (carried from W0-2, files dead, knowledge alive)**: the falsifiable before/after bar is that today a `display:flex !important` shim is the *only* thing that renders the panes at 1440; the in-tree probe re-authors that technique against the current substrate — the discarded `.w6a-audit*.mjs` scratch never returns as tracked source.

### 5 · The N.W10 rows + carries (functional-truth P0s; anchors live)

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

### 6 · Hero-lab artifact deletion (Q1 FLIP — owner order, RATIFIED-2026-07-03; NO legacy code)

Hero-lab was KILLED entirely at ratification (not slipped): the treatment (`docs/frontend-design/hero-lab.md`) and the wave doc (`waves/R.W5.md`) are already deleted from the corpus; this wave deletes the APP artifacts. Verified live at `e80b359` — exactly these exist, nothing else (no e2e/CI/scripts references grep-verified):

| Artifact | Live cite (verified 2026-07-03) | Action |
|---|---|---|
| `demo/hero-lab/` tree | `App.vue` · `components/` · `hero-lab.css` · `index.html` · `lib/` | **DELETE the tree** |
| vite hero-lab mode branch | `vite.config.ts:202-229` — the `} else if (mode.mode === "hero-lab") {` branch (root `./demo/hero-lab/`, outDir `./dist/hero-lab`) | **DELETE the branch** |
| npm scripts | `package.json:72` `"dev:hero-lab": "vite --mode hero-lab --port 9010"` · `package.json:74` `"build:hero-lab": "vite build --mode hero-lab"` | **DELETE both** |

The picker does NOT absorb hero-lab scope — the interpolation-path signature dies with the page (the gradient pane already covers interpolation as existing scope). The pass-2 all-4-modes boot proof (`boot-blast-radius.md`) remains valid historical evidence; post-deletion the live vite modes are production / gh-pages / dev.

---

## §Hard gate (verbatim per SYNTHESIS-v2 §3 R.W2)

Demo boots **cold-cache** clean (`boot-smoke --force`); `npm run gh-pages` reaches `✓ built` (`build:hero-lab` dropped from the gate — the Q1 FLIP, RATIFIED-2026-07-03; the pass-2 all-4-modes proof stands as historical evidence); **hero-lab artifacts gone** (item 6: `demo/hero-lab/` absent, no hero-lab branch in `vite.config.ts`, no `*:hero-lab` scripts in `package.json`, grep-zero); e2e 5-project suite green; the 1440 defect + root confirmed in-tree; zero ungated rAF; zero phantom classes. **The no-shim render bar is EXTERNAL-booked** (short window — BG is live and the fix is mechanical) — a BOOK, never a gate.

## §No-workaround prohibitions (binding)

- **NO demo-side cascade cure** for D8-1 — every demo-side variant REFUTES (breaks Tailwind-v4 `@utility` registration); the cure is the producer's `layer(components)`, verified at consume.
- **NO `!important`** on the demo's `lg:flex`/`lg:block` to out-shout the unlayered rule.
- **NO demo-defined Tabs** — `SegmentedTabs` first; reka-direct only as the proven fallback shape.
- **NO widening `boot-smoke`'s noise allow-list** to swallow CORS errors — the cure is the typed degraded-backend (don't make the doomed request), not filtering its symptom.
- **NO re-introducing `VITE_API_URL`** under another name.

## §BOOKS opened/serviced by this wave (books-never-gates)

- **D8-1 no-shim verify** — trigger: glass-ui rebuilds dist with `layer(components)` (ask already dispatched to BG). Action: re-run the 1440 probe against the rebuilt `file:` dist; `visibleCount 2`, no `!important`; retire the shim wording.
- **glass-ui 5.0.0 adopt event** carries the neighboring demo re-points (`/goo-blob`→`/blob` at `App.vue:115`, GAP-3 subpath walk incl. `/tabs`) — not this wave's work.

## §Evidence packets consumed

`audit/pass2/boot-blast-radius.md` (four-mode proof + byte-parity + the Tabs unmask + the sweep blind spot) · `audit/pass2/dispatch-homes.md` PART B (the gate split + the dispatched D8-1 relay text) · `audit/pass2/seeds/{vite-config-boot-cure.patch, vite.config.cured.ts}` · `docs/tranches/N/waves/N.W10.md` (the born-RED witnesses + fix shapes for U9/X6/save-P0/kC/K-INV5/U33/X9 — anchors re-verified against the live tree at pass 2).

## §Hand-off

R.W3 (the instrument) opens only on this wave + R.W1 — design lands on a booting, building, truthful substrate. The D8-1 EXTERNAL book rides into R.W3's window (if the BG cut stalls past R.W3's start, the design wave proceeds on the internally-confirmed defect record with the book still open — never a gate, `SYNTHESIS-v2.md §13` residual-4). The Tabs migration + tripwire feed the R.W7 relay letter's GAP-3 by-name discipline precedent.
