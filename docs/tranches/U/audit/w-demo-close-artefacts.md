# U.W-DEMO — CLOSE ARTEFACTS (gate rows · per-family disposition walk · books · the honest RELAY declaration)

**Wave**: U.W-DEMO — DEMO ARCHITECTURE (layer-inversion · token triplication · colocation E-1
residue · state cluster). **Spec of record**: `../waves/U.W-DEMO.md` (registry wins where they
diverge — `registry.md §13`). **Branch**: `tranche-u`. **Landed** on the post-`tranche-t-close`
tree (T merged to master `6e14e90`, tagged `tranche-t-close`; every U.W-DEMO commit pull-rebased
first and is path-scoped).

**VERDICT: COMPLETE.** All four families reached their DECIDED disposition (3 build · 1 fold); every
gate that guards a LIVE defect was witnessed born-RED on the pre-cure tree and flips GREEN at the
cure; the two STANDING import-boundary gates are wired and clean; zero silent drops. The scoped goal
(the color-spine near-cycle cut + the boundary guard over the color-composable layer) is MET — this
wave never claimed the FULL `demo/@`-stratum extraction, which the spec explicitly GATES on two
booked components-tree up-imports (surfaced by name below, not silently dropped). PP-16's
`complete_with_misses` clause does NOT fire: it binds only gates-pass-goal-unmet, and the scoped
goal is met. The carries below are deferred-by-design BOOKS (ordering dependencies + build-config +
the inherited HG5 hygiene lane), not gate misses.

**Landing commits** (3, path-scoped `demo/**` + colocated `test/**` + `eslint.config.js` gate wiring):

| Commit | Families | What landed |
|---|---|---|
| `7efc0b7` | U-F48 | the demo state-fragility FOLD — one singleton, one const, one predicate |
| `d039952` | U-F46 | single-source the session token + delete the dead teardown twin |
| `616e84f` | U-F45 · U-F47 | the color-spine layer-boundary cure + two STANDING import-boundary gates |

---

## §1 · Gate rows (born-RED witnessed → GREEN; standing rules wired) — with evidence anchors

Four born-RED gates, each ARMED over a LIVE defect on the pre-cure tree and flipping GREEN only at
the cure. This is a STRUCTURAL wave: every gate is a mechanical assertion (an ESLint import-boundary
check, an AST/grep symbol count, a barrel-presence check) — **none is a visual/headless assertion**,
so none rides the U-F54 real-GPU annex.

| Gate | Family | Assertion | RED (pre-cure evidence) | GREEN (cured state) | Verified |
|---|---|---|---|---|---|
| **G-DEMO-1** | U-F45 | no file under `demo/@/composables/color/` imports app-root boot (`demo/color-picker/**`) | `palettes-ramp.ts:72` raw-relative `../../../color-picker/composables/boot/view-accents` up-reach | `palettes-ramp.ts:72` imports `@composables/color/view-accent` (sibling, aliased) | ESLint `no-restricted-imports` STANDING (`eslint.config.js:279-286`); `npm run lint` exit 0 |
| **G-DEMO-2** | U-F46 | ONE canonical token cell (client `sessionTokenRef`) + `clearSession` absent | 3 cells (`useSession._token`, `useUserAuth._userToken`, `client.sessionTokenRef`) + exported-dead `clearSession` | 1 canonical `sessionTokenRef` (`client.ts:54`); two composables hold no private ref; `clearSession` deleted | `test/session-single-source.test.ts` (7 tests) GREEN — witnessed RED pre-cure |
| **G-DEMO-3a** | U-F47 | shared composables layer imports NO feature internal | `useColorParsing.ts:5` → `@components/custom/generate/composables/useColorGeneration` | `generateSingleColor` resolves from shared `@composables/color/generate-color`; spine→feature edge = 0 | ESLint STANDING (`eslint.config.js:288-291`); `npm run lint` exit 0; grep of `demo/@/composables/**` → feature-internal = none |
| **G-DEMO-3b** | U-F47 | `palette-browser` reached via barrel, never raw `.vue` | `App.vue:165` imports raw `palette-browser/dialog/MigratePalettesDialog.vue`; no top-level `index.ts` | `App.vue:172` imports `MigratePalettesDialog` from the `dialog` barrel; `palette-browser/index.ts` seam present | ESLint STANDING (2 disjoint-scope objects `eslint.config.js:241-250,293-298`); exit 0 |
| **G-DEMO-4** | U-F48 | `COLOR_STORE_KEY` defined once + `usePaletteStore` module singleton | key defined twice (`hydrate.ts:41` + `useColorPersistence.ts:9`); per-call `useStorage` factory | 1 def (`@lib/palette/constants.ts:22`); `getStore()` lazy module singleton (`usePaletteStore.ts:40-43`, binding outside fn body) | `test/demo-state-cluster.test.ts` (3 tests) GREEN — witnessed RED pre-cure |
| **G-DEMO-4** (Dock) | U-F48 | verify-at-execution: keepOpen/release call sites → ONE computed-predicate watch | 3 scattered imperative keepOpen/release watchers across 5 (`Dock.vue:49,55,77,78,79`) | `shouldKeepOpen` computed (`Dock.vue:86`) drives ONE `watch` (`:87`); imperative pairs → 1 | done-state confirmed by call-site count = 1 |

**Gate-run evidence (re-verified at close):**
- `npx vitest run test/session-single-source.test.ts test/demo-state-cluster.test.ts test/view-accents.test.ts` → **3 files / 42 tests PASSED** (session-single-source 7, demo-state-cluster 3, view-accents 32).
- `npm run lint` → **exit 0** (the two STANDING boundary rules are live; `--max-warnings=0`).
- Landing-commit record (`616e84f`): lint GREEN; **78 test files / 2281 tests GREEN**; typecheck **142 = 142 baseline parity** (zero new errors; the residual is the pre-existing glass-ui-untyped-dist gap, not U.W-DEMO's).

**The two STANDING gates are import-graph guards, not one-shot edits** (spec §Completion): G-DEMO-1 +
G-DEMO-3a/3b are wired as ESLint `no-restricted-imports` boundary objects in `eslint.config.js`, so a
future feature edit that re-inverts the graph born-REDs at lint. The flat-config last-match-wins
gotcha is handled by scope-disjointness (three disjoint file-glob scopes, not an array-merge). These
ride to U.W-CLOSE's book re-probe as live guards.

---

## §2 · Per-family disposition walk (DELTA before → after, each verified against the tree)

### U-F45 — `demo-cross-layer-inversion` · **build (relocate the resolver DOWN)** — DONE

The shared color spine no longer reaches UP into app-root boot. `resolveViewAccent` (the pure
rotate → C-floor → gamut-map → L re-guard → WCAG library-math resolver) was relocated byte-preserved
from `boot/view-accents.ts` into the shared layer at **`demo/@/composables/color/view-accent.ts`**
(its natural home beside `useContrastSafeColor` / `ink`), carrying its private domain (`mapToGamut`,
`RawOklch`, `VIEW_ACCENT_MIN_CHROMA`, `GRAPHICS_CONTRAST_FLOOR`) and the shared
`tryParseOklch`/`publicOklch` helpers. `boot/view-accents.ts` slims to `resolveSealInk` ONLY (the
app-root seal concern), importing the helpers DOWN from shared — NO re-export shim (E-3: consumers
migrated at the root). `palettes-ramp.ts:72` imports the resolver as a SIBLING via the alias (curing
the raw-relative up-reach AND the alias bypass in one stroke); `boot/useViewAccents.ts` imports it
DOWN from shared. The near-cycle across the stratum line dissolves.

| DELTA | before → after | verified |
|---|---|---|
| shared color-layer → app-root up-imports | 1 → **0** | `grep color-picker demo/@/composables/color/` = no raw boot up-import (the `@components/custom/color-picker` barrel hits are the ALLOWED public-face, carved out in `eslint.config.js:270`) |
| near-cycle (`palettes-ramp` ⟷ `boot`) | present → **dissolved** | `palettes-ramp.ts:72` sibling import; `useViewAccents` imports DOWN |
| raw-relative-path bypass | 1 → **0** | `palettes-ramp.ts:72` = `@composables/color/view-accent` |

The `resolveViewAccent` semantics are UNCHANGED (a pure move) — the Q5-ramp behavior that consumes it
is untouched. `test/view-accents.test.ts` re-points the 3 moved symbols (32 tests GREEN);
`resolveSealInk` stays sourced from boot.

### U-F46 — `session-token-triplication` · **build (single-source + delete dead twin)** — DONE

One logical token now lives in ONE canonical reactive cell. The api-client `sessionTokenRef`
(`client.ts:54`) is elected THE single cell — it is already the transport's read cell, so
transport-truth and app-truth are one object. `useSession`/`useUserAuth` hold NO private token ref;
they read it directly and drive it through ONE new persistence adapter
(**`demo/@/composables/auth/sessionToken.ts`**) keyed by a `persistent` flag (user token →
localStorage, anon → sessionStorage) — exactly one write path (`persistToken`) and one clear path
(`clearPersistedToken`). `clearSession` is DELETED (E-3: no dead-code desync landmine); the real
teardowns (`logout`/`clearSlug`/`regenerate`) are one-liners against the source. Public API preserved
(`useSession()` → `{ token, ensureSession }`; every `useUserAuth` member intact) — no consumer file
edited.

| DELTA | before → after | verified |
|---|---|---|
| token reactive cells | 3 → **1** canonical (+ write-through setters) | `sessionTokenRef` sole cell (`client.ts:54`); adapter `sessionToken.ts` present |
| storage-backend write paths | 2-hand-synced → **1** persistence owner | `persistToken`/`clearPersistedToken` in `sessionToken.ts` |
| dead desync twin (`clearSession`) | 1 → **0** | `grep clearSession useSession.ts` = ABSENT |

### U-F47 — `colocation-e1-violation` · **build (primitive-down + seam)** — DONE

Both E-1 residues cured. (1) The pure OKLCh generation core (presets, harmony, `generateSingleColor`,
`generatePalette`) relocated DOWN into **`demo/@/composables/color/generate-color.ts`**;
`prng.ts` moved to `demo/@/composables/prng.ts` (byte-identical rename). `useColorGeneration.ts`
keeps ONLY the Vue composable, importing the core UP from shared; `useColorParsing.ts` +
`GenerateControls.vue` re-point to shared — NO shim in the old feature location. The spine→feature
edge is gone. (2) A top-level **`palette-browser/index.ts` seam** (named re-exports of the
card/admin/search/dialog/slug sub-faces) is authored; `App.vue:172` reaches `MigratePalettesDialog`
through the `dialog/` barrel, never the raw `.vue`.

| DELTA | before → after | verified |
|---|---|---|
| spine → feature-internal imports | 1 (`generateSingleColor`) → **0** | `grep @components/custom/*/composables demo/@/composables/` = NONE |
| `palette-browser` top-level seam | absent → **present** | `demo/@/components/custom/palette-browser/index.ts` exists |
| raw-`.vue` consumer reaches | 1 (`App.vue`) → **0** | `App.vue:172` = `{ MigratePalettesDialog } from ".../palette-browser/dialog"` |

### U-F48 — `demo-state-fragility-cluster` · **fold (ONE state-cluster row — three sub-cures)** — DONE

One state-fragility gestalt cured coherently in a single remediation row.
1. **`usePaletteStore` → module singleton.** The per-call `useStorage` factory hoisted to the
   lazy-init module-ref pattern (`createStore`/`getStore`, `let _store` module-level,
   `usePaletteStore.ts:18-43`, binding created OUTSIDE the exported fn body). The three call sites
   (`usePaletteManager`/`useBrowsePalettes`/`useExtractSession`) are UNTOUCHED — return surface
   preserved byte-for-byte.
2. **`COLOR_STORE_KEY` single-sourced** to `@lib/palette/constants.ts:22`; both consumers import it
   (boot → lib DOWN, color → lib sideways — no color↔color-picker boundary breach). The dual-idiom
   silent-divergence trap is closed.
3. **Dock open/close hold → ONE declarative predicate.** `shouldKeepOpen = computed(() =>
   actionBarLayerActive || anyEditActive || isAnyOpen)` (`Dock.vue:86`) drives a single `watch`
   (`:87`). `keepOpen`/`release` are glass-ui's ref-counted holds (`useDockState keepOpenCount`);
   the ONE balanced +1/−1 pair per predicate edge is behaviour-equivalent to the former per-flag
   holds (held ⇔ any flag true). The expand-on-edit stays its own distinct watch; the
   settle-stamp/activeLayer/reset watchers (the T-annotated set) are reserved — this coalesces only
   the open/close-mutex arm, the genuine duplication.

| DELTA | before → after | verified |
|---|---|---|
| `usePaletteStore` bindings | 3 per-call → **1** singleton | `getStore()` lazy module ref (`usePaletteStore.ts:40-43`) |
| `COLOR_STORE_KEY` definitions | 2 → **1** | sole def `constants.ts:22` |
| Dock open/close imperative keepOpen/release call sites | 3-across-5-watchers → **1** computed-predicate watch | `Dock.vue:86-87` |

**Why FOLD**: the registry rules U-F48 a single "hoist-to-singleton + const-extract +
computed-predicate" row — the three sub-cures share the state-fragility gestalt and land as ONE
remediation row WITHIN U.W-DEMO (no independent per-sub-defect build row, no fold into another wave).

---

## §3 · BOOKS carried (named, by design — NOT gate misses)

Every carry below is a deliberate ordering / build-config / inherited-lane deferral the spec itself
books; none is a silent drop, none is a failed gate.

1. **The two adjacent components-tree → app-root up-imports (U-F45 broader class).** The registry
   converged U-F45 on the ONE color-spine instance; the execution surfaced two more of the SAME class
   in the COMPONENTS tree (not the gated color-composable layer), both STILL PRESENT as expected:
   - `demo/@/components/custom/panes/aurora-harmony-stops.ts:23` → `boot/atmosphere-calibration`
     (`resolveCalibratedAtmosphere`) — raw `../../../../color-picker/...` up-import (verified live).
   - `demo/@/components/custom/color-picker/ColorPicker.vue:114` → `boot/useOverture` (`OVERTURE_KEY`)
     — raw up-import (verified live).
   RECORDED by name (so no successor mistakes them for un-audited), BOOKED to the design-loop's
   judgment (relocate-or-ratify per instance) + U.W-CLOSE's re-probe. Surfaced, not scope-crept into
   a hard gate the converged registry did not ratify. G-DEMO-1's scope is exact-and-non-drifting: the
   color-composable layer where `palettes-ramp` is the sole up-importer.

2. **The HG5 demo-caps re-encapsulation (inherited hygiene lane, T/FINAL §5 · ledger §B.1 carry).**
   Two T.W8-remediation-grown demo files remain over the ≤400 god-module cap (verify-at-execution
   done-state, NOT a born-RED gate — T ruled "splitting demo/ is a remediation act, not a gate act"):
   - `demo/color-picker/composables/boot/useAtmosphere.ts` = **411** LoC (P9-R3/T-37 derive-seam).
   - `demo/@/components/custom/markdown/Markdown.vue` = **408** LoC (AB-1 KaTeX).
   Per §BOOKS these LAND AFTER the U.W-VISUAL re-cures that touch these two files settle
   (`useAtmosphere` ⟷ U-F11 derive-seam; `Markdown` ⟷ U-F19 AB-1) so the decomposition reserves the
   settled file shape. U.W-VISUAL has not closed → this lane is correctly deferred, not missed.

3. **The `App.vue` eager-chunk tree-shake reconciliation → U.W-CLOSE.** The root `package.json` marks
   `./demo/**` side-effecting, so the barrel reach does not tree-shake the lazy sibling dialogs by
   static analysis — a build-config change unverifiable while the demo build is blocked by the
   glass-ui 5.0.0 adopt-gap. Tracked to U.W-CLOSE (build-config, not a demo-source defect).

4. **The two STANDING import-boundary gates (G-DEMO-1, G-DEMO-3) → U.W-CLOSE re-probe.** The crown
   deliverable is a live boundary guard, not a one-shot fix; re-probed at close that the rule is still
   wired and STILL guards a future re-inversion.

**Coordinated safe-moment landings — HONORED (not carries):** the two co-owned edit loci the spec
flags — `palettes-ramp.ts` (U-F45 ⟷ U-F6/WR-8) and `Dock.vue` (U-F48 ⟷ T.W8 dock) — landed on
`tranche-u` AFTER T's terminal state (`6e14e90` merge / `tranche-t-close` tag), per the post-T.W8-
terminal safe-moment discipline. No thrash of the T-annotated Dock watcher set (reserved) or the
WR-8 ramp cure (U-F45's move is byte-preserving on the resolver).

---

## §4 · The honest RELAY declaration — E-2 CHECKED, found NOT triggered

The E-2 owner edict fires when a U wave "touches a glass-ui component or the glass-ui-level contract
(shared exports, token conventions, the `mixColors`/`sampleColorRamp`/`color2` raw-channel
convention, the producer surfaces)." **U.W-DEMO is checked against each clause and found entirely
value.js-repo-internal (demo-tree-internal, in fact) — NO RELAY row is triggered.** The check,
recorded truthfully (not a blanket "no cross-repo ask"):

- **Full changeset is `demo/**` + colocated `test/**` + `eslint.config.js` (the standing-gate wiring)
  — verified.** `git show --name-only 616e84f d039952 7efc0b7 | grep -E 'glass-ui|^src/|^api/'` =
  **NONE**. No `src/**` (value.js library) edit → no shared-export change → the "shared exports"
  clause is not triggered.
- **No convention change.** U-F45 relocates a demo resolver that CONSUMES `@mkbabb/value.js` math; it
  does not alter the `mixColors`/`sampleColorRamp`/`color2` raw-channel convention (that convention is
  U-F30's, in U.W-LIB) → the raw-channel-convention clause is not triggered.
- **No glass-ui producer / component surface change.** U-F48's Dock cure consolidates WHEN the demo
  calls `dockRef.keepOpen()`/`release()` — existing methods of the glass-ui `<GlassDock>` instance —
  into one declarative predicate; it changes NO `GlassDock` prop, method, or contract, only the demo's
  own watcher wiring that drives them. U-F47's `palette-browser` seam + U-F45's relocation + U-F46's
  token single-source are all demo-internal composable/barrel topology. No glass-ui component is
  touched → the producer-surface clause is not triggered.

**No convention change, no producer surface, no consumed-export break, no glass-ui component edit
ships from this wave** → E-2 discharged by the CHECK (the honest declaration), not by a communiqué
row. The U-formation BH communiqué (`17e0f522`) carries the cross-repo coupling that OTHER waves own;
U.W-DEMO adds nothing to it. The spec's §28 three-consumer-surface born-RED clause is CHECKED and
found not-applicable (it binds U-F29/F30's library-correctness cut; U.W-DEMO changes no library
export and no cross-repo convention) — no consumer-surface born-RED, no relay row.

---

## §5 · Close summary

| Family | Disposition | Gate | State |
|---|---|---|---|
| U-F45 | build (relocate `resolveViewAccent` down) | G-DEMO-1 (STANDING ESLint) | **GREEN** — near-cycle dissolved, up-imports 1→0 |
| U-F46 | build (single-source + delete dead twin) | G-DEMO-2 (born-RED test) | **GREEN** — cells 3→1, `clearSession` gone |
| U-F47 | build (primitive-down + seam) | G-DEMO-3a/3b (STANDING ESLint) | **GREEN** — spine→feature 1→0, seam present, raw-`.vue` 1→0 |
| U-F48 | fold (one singleton, one const, one predicate) | G-DEMO-4 (born-RED test) + Dock verify-at-execution | **GREEN** — key defs 2→1, store singleton, Dock watchers 3→1 |

- **4/4 families** reached DECIDED disposition (3 build · 1 fold); **zero silent drops**.
- **6 gate rows GREEN** (2 born-RED test flips over G-DEMO-2/4, 3 STANDING ESLint boundary objects
  over G-DEMO-1/3a/3b, 1 Dock verify-at-execution done-state).
- **No visual claim** (nothing renders) → no π-frame, no real-GPU annex; every claim is a mechanical
  DELTA, all four verified.
- **RELAY not-triggered** by the per-clause check (demo-tree-internal only).
- **4 BOOKS carried** by name (two components-tree up-imports · HG5 hygiene lane · App.vue
  tree-shake · the two standing gates → U.W-CLOSE re-probe); the two coordinated safe-moment landings
  HONORED post-`tranche-t-close`.
- **Verdict: COMPLETE** — gates pass, scoped goal met, PP-16 `complete_with_misses` does not fire.
