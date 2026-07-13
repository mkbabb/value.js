# U.W-DEMO — DEMO ARCHITECTURE (layer-inversion · token triplication · colocation E-1 residue · state cluster)

**Wave**: U.W-DEMO · **designHeavy**: no (STRUCTURAL — precise gates, born-RED where the defect is
LIVE, mechanical rigor; the surfaces are import graphs, reactive-state topologies, and barrel seams,
NOT rendered pixels → no frontend-design loop, no π-frame, no real-GPU annex) · **Families**:
U-F45 · U-F46 · U-F47 · U-F48 (4 families).

**Opens after**: **root** (U.md §The wave DAG — `dependsOn: root`). No upstream wave gates this wave;
it opens at formation and runs in parallel with U.W-CANON / U.W-SEC / U.W-ORACLE (all root-dependent).
**Runs concurrently with T.W8 remediation on the shared `tranche-t` branch → every commit
pull-rebases first and is path-scoped** (planning: `docs/tranches/U/**` ONLY; execution: the
DEMO-owned `demo/**` source files). Two of this wave's surfaces are co-owned with concurrent work —
`palettes-ramp.ts` (U-F45's relocation touches the same file U-F6/WR-8 edit for the Q5 ramp) and
`Dock.vue` (U-F48's watcher-coalesce touches a heavily T-annotated shell) — those edits land at a
**coordinated, post-T.W8-terminal safe moment** (§Dependencies · §BOOKS).

**The spec of record is `../audit/registry.md`** (§13 U-F45/F46/F47/F48; §26 W-demo-arch wave-shape
seed). Where this doc and the registry could diverge, **the registry wins**; above both, **the
owner's verbatim wins**. Precedence: owner verbatim → registry → `U.md` → this wave doc.

---

## §Goal criterion

The demo's module graph and reactive-state topology tell the truth about their own layering. The
shared lower layer (`demo/@/composables/color/` — the color spine) is a **clean lower layer**: it
reaches DOWN into the library and sideways within itself, never UP into app-root boot (`demo/color-
picker/composables/boot/`) — the **color-spine** near-cycle that today keeps the shared color layer
from being a clean lower layer is dissolved by relocating the color-math resolver to where it belongs
(U-F45). **Scope-honest**: this wave dissolves the color-spine near-cycle and stands the boundary
guard over the color-composable layer where `palettes-ramp` is the sole up-importer; FULL `demo/@`-
stratum extraction remains GATED on the two BOOKED components-tree up-imports (`aurora-harmony-
stops.ts` → `boot/atmosphere-calibration`, `ColorPicker.vue` → `boot/useOverture` — relocate-or-
ratify per instance, §BOOKS), which G-DEMO-1 does not born-RED (the converged registry named one
instance; the two are surfaced, not inflated into a hard gate). The goal here is the color-spine
cut, not the whole-stratum claim. The live session token
has **one source of truth**, not three reactive cells manually write-through-synced across two
storage backends, and the dead incomplete-teardown twin that would desync all three is gone (U-F46).
The E-1 colocation edict has **no residue**: the color spine imports no feature internal, and the
`palette-browser` mega-feature exposes a clean seam so its six-plus consumers reach a barrel, never a
raw internal file (U-F47). The `demo/`-state fragility cluster is coalesced — one palette-store
singleton, one canonical store-key constant, one declarative open/close predicate in the dock (U-F48).
Every family reaches its DECIDED disposition (3 build · 1 fold); zero silent drops.

## §Completion criterion

- Every family (the 4 above) reaches its decided disposition (§Dispositions); zero silent drops.
- Every **build** family (U-F45/F46/F47) that guards a LIVE defect carries a **born-RED** gate
  (armed now over the live defect, flips GREEN only at the cure) — G-DEMO-1..3 (§Hard gate), each
  registry-cited to its live evidence anchor. The **fold** family (U-F48) carries the mechanically-
  assertable born-RED sub-gate G-DEMO-4 (the const-count + singleton assertions) plus a
  verify-at-execution done-state for the Dock watcher-coalesce.
- The two STANDING deliverables are import-graph guards, not one-shot edits: **G-DEMO-1** (the shared
  color layer has ZERO up-imports into app-root) and **G-DEMO-3** (the spine imports no feature
  internal; `palette-browser` reached only through its seam) are wired as ESLint `no-restricted-
  imports` / import-boundary rules so a future feature edit cannot silently re-invert the graph.
- **This wave has NO visual claim** — nothing renders, nothing is eyeballed. There is no before/after
  π-frame obligation and no real-GPU / owner-attested annex (the U-F54 annex is U.W-VISUAL's, not
  here); every claim is structural / mechanically-measurable, so each family carries a **DELTA count**
  in lieu of a π-frame (§π/DELTA).
- **The §28 three-consumer-surface born-RED clause is CHECKED and found not-applicable** — that
  clause binds U-F29/U-F30 (the library-correctness cut whose convention change reaches glass-ui +
  keyframes); U.W-DEMO changes NO library export and NO cross-repo convention (§Cross-repo RELAY),
  so it carries no consumer-surface born-RED and no relay row.
- PP-16 binds: gates-pass-goal-unmet closes `complete_with_misses`.

---

## §Scope — the families this wave builds (each with its cure APPROACH; E-3 binds — no workaround, no legacy, idiomatic gestalt)

E-3 (no quick solution / no legacy shim / architectural transposition for elegance · simplicity ·
performance is DESIRABLE) binds every cure below: a layer inversion is dissolved by MOVING the misfit
DOWN to where it belongs, never by suppressing the lint or aliasing around it; a triplicated token is
SINGLE-SOURCED at the root, never bridged by a fourth sync shim; a missing seam is a BARREL, never a
per-consumer re-path; a scattered-state cluster is a DECLARATIVE predicate, never one more imperative
watcher. Each cure migrates the consumers to the new shape at the root (no back-compat twin left
behind).

### U-F45 — `demo-cross-layer-inversion` · **build (relocate the resolver DOWN to the shared layer)**

**Evidence** (registry §13, CONFIRMED live): `demo/@/composables/color/palettes-ramp.ts:72` —
`import { resolveViewAccent } from "../../../color-picker/composables/boot/view-accents"` — the
SHARED color layer (`demo/@/composables/color/`) reaches UP into APP-ROOT boot
(`demo/color-picker/composables/boot/`) via a **raw 3-level relative path that bypasses the
`@composables`/`@src` alias**, calling it at `:111` (`resolveViewAccent(liveCss, shift, surfaceL)`).
The reverse edge closes a **near-cycle across the layer boundary**: app-root boot reaches DOWN into
the same shared file — `demo/color-picker/composables/boot/useViewAccents.ts:50` imports from
`@composables/color/palettes-ramp`. So `palettes-ramp` (shared) ⟷ `boot/` (app-root) point at each
other across the stratum line; `demo/@` cannot be extracted as a clean lower layer while the shared
color spine depends on app-root. `resolveViewAccent` is DEFINED at `view-accents.ts:126` and its only
imports are `@mkbabb/value.js/color`, `@mkbabb/value.js/math`, `@lib/color-utils` (verified) — all
shared-layer-safe, so the resolver has NO app-root dependency pinning it up there.

**BROADER-CLASS observation (recorded, not scope-crept — the registry named ONE instance)**: the
shared-tree → app-root up-import class has **three** live instances, not one: (1) the U-F45 named
`palettes-ramp.ts:72` → `boot/view-accents`; (2) `demo/@/components/custom/panes/aurora-harmony-
stops.ts:23` → `boot/atmosphere-calibration` (`resolveCalibratedAtmosphere`); (3) `demo/@/components/
custom/color-picker/ColorPicker.vue:114` → `boot/useOverture` (`OVERTURE_KEY`). The registry
converged U-F45 on the color-spine instance (`resolveViewAccent`); this doc scopes the born-RED gate
to the shared **color-composable** layer (`demo/@/composables/color/`), where `palettes-ramp` is the
sole up-importer — an exact, non-drifting gate over the registry's named finding. The two
components-tree instances (atmosphere / overture-key) are RECORDED here by name and BOOKED to the
design loop's judgment + U.W-CLOSE re-probe (§BOOKS) — surfaced, not silently dropped, but not
inflated into a hard gate the converged registry did not ratify.

**Cure APPROACH** (E-3 — architectural transposition, the resolver BELONGS in the shared color
layer): **relocate `resolveViewAccent`** (the pure rotate → C-floor → gamut-map → L-re-guard → WCAG
library-math resolver) DOWN from `boot/view-accents.ts` into the shared color layer
(`demo/@/composables/color/` — its natural home beside `useContrastSafeColor.ts` / `ink.ts`, all
value.js-math consumers). After the move: `palettes-ramp.ts` imports it as a **sibling shared import
via the alias** (curing BOTH the up-reach AND the raw-relative-path bypass in one stroke), and
`boot/useViewAccents.ts:133` imports it DOWN from shared (the CORRECT direction — app-root depends on
the lower layer). The near-cycle dissolves; `demo/@` becomes extractable. The byte-preserved
`resolveViewAccent` semantics are UNCHANGED (a pure move — no logic edit), so the Q5-ramp behavior
that consumes it is untouched (the U-F6/WR-8 ramp coordination is an edit-locus overlap, not a
semantic one; §Dependencies). No alias-suppression, no re-export shim in the old `boot/` location
(E-3: migrate the two consumers at the root).

### U-F46 — `session-token-triplication` · **build (single-source the live token + delete the dead twin)**

**Evidence** (registry §13, CONFIRMED live): ONE logical session token lives in **three reactive
cells across two storage backends**, kept coherent only by manual write-through:
- `demo/@/composables/auth/useSession.ts:21` `let _token: Ref<string|null>` (backed by
  **sessionStorage**, `SESSION_KEY = "palette-session-token"`);
- `demo/@/composables/auth/useUserAuth.ts:21` `let _userToken: Ref<string|null>` (backed by
  **localStorage**, `TOKEN_KEY = "palette-user-token"`);
- `demo/@/lib/palette/api/client.ts:50` `export const sessionTokenRef: Ref<string|null> = ref(null)`
  (in-memory; the transport's read cell — `client.ts:102-103` sets the `X-Session-Token` header from
  it).

The three are synced by hand at every mutation: `useUserAuth.persist()` (`:39-49`) writes localStorage
+ sessionStorage + `setSessionToken()`; `useSession.ensureSession()` (`:40-66`) writes sessionStorage
+ `setSessionToken()`; `useUserAuth.logout()`/`clearSlug()`/`regenerate()` each hand-clear all three.
A missed write-through desyncs the transport from the persisted state. **The dead twin**:
`useSession.clearSession()` (`:68-72`, exported at `:84`) nulls `_token` + removes the sessionStorage
key ONLY — it does NOT clear `_userToken`, the localStorage `TOKEN_KEY`, or call
`setSessionToken(null)`. It has **ZERO consumers** (grep-verified dead); were it ever wired it would
leave `sessionTokenRef` + `_userToken` + localStorage LIVE while the session cell reads null — an
incomplete-teardown that desyncs all three. It is a latent landmine, not dead-harmless code.

**Cure APPROACH** (E-3 — one source of truth, migrate consumers at the root, no fourth sync shim):
elect the api client's **`sessionTokenRef` as the single canonical reactive cell** — it is already the
transport's read cell (every request reads it), so the transport-truth and the app-truth become one
object. `useSession` / `useUserAuth` STOP holding their own `_token` / `_userToken` refs; they
read/write the ONE canonical ref through the existing `setSessionToken()` setter. The two storage
backends (persistent user-token in localStorage vs anonymous session-token in sessionStorage) collapse
into a **single persistence adapter keyed by a `persistent` property of the token** (the user-vs-anon
distinction becomes a FLAG on the one token, not a second cell) — so there is exactly one write path,
one clear path. **Delete `clearSession()`** (E-3 forbids dead-code-as-compat, and it is a desync
landmine); the real teardown paths (`logout`/`clearSlug`/`regenerate`) already exist and become
one-liners against the single source. The three-cell + two-backend + manual-write-through topology
collapses to one cell + one persistence owner.

### U-F47 — `colocation-e1-violation` · **build (move the primitive DOWN + give palette-browser a seam)**

**Evidence** (registry §13, CONFIRMED live) — the E-1 colocation edict's two residues:
- **The spine imports a feature internal.** `demo/@/composables/color/useColorParsing.ts:5` —
  `import { generateSingleColor } from "@components/custom/generate/composables/useColorGeneration"`
  — the SHARED color-pipeline spine reaches SIDEWAYS/UP into the `generate` FEATURE's internal
  composable. `generateSingleColor` (`useColorGeneration.ts:182`) is a **pure helper** (imports only
  `@mkbabb/value.js/color` + the sibling `./prng`; verified movable), which the file's own comment
  (`:4`) already flags: "the picker consumes the one pure helper." A shared-layer file depending on a
  feature is the colocation inversion — the feature should depend on the shared layer, never the
  reverse.
- **`palette-browser` exposes no top-level seam.** The mega-feature `demo/@/components/custom/palette-
  browser/` has NO top-level `index.ts` barrel (verified absent). Its sub-features DO carry barrels
  (`card/index.ts`, `admin/index.ts`, `search/index.ts`, `dialog/index.ts`, `slug/index.ts` — all
  present), and **nine consumer files** reach into them (`generate/`, `image-palette-extractor/`,
  `mix/`, three `panes/`, `auth/useAdminUsers.ts`, `palette/useSlugMigration.ts`, `App.vue`). The
  worst reach is a **raw `.vue` file bypass**: `demo/color-picker/App.vue:165` imports
  `@components/custom/palette-browser/dialog/MigratePalettesDialog.vue` DIRECTLY — past even the
  `dialog/` sub-barrel, into a raw internal component file.

**Cure APPROACH** (E-3 — move the primitive DOWN, seal the seam):
1. **Move `generateSingleColor` DOWN** into the shared color layer (`demo/@/composables/color/` —
   beside the spine that consumes it). The `generate` feature then imports it UP-from-shared
   (`GenerateControls.vue:29` re-points to the shared layer — the CORRECT direction: feature depends
   on shared). The spine → feature edge is gone; `useColorParsing.ts` imports a sibling shared
   primitive. (Only two consumers to migrate — `useColorParsing.ts` and `GenerateControls.vue` — no
   shim in the old feature location.)
2. **Give `palette-browser` a seam.** Author a top-level `palette-browser/index.ts` that re-exports
   the five sub-feature public faces (the `card`/`admin`/`search`/`dialog`/`slug` barrels), AND route
   the `App.vue:165` raw-`.vue` reach through the `dialog/` barrel (`MigratePalettesDialog` becomes a
   named export of `dialog/index.ts`, consumed via the barrel). After the cure NO consumer imports a
   raw internal file of `palette-browser`; every reach lands on a barrel (the top-level seam or a
   sub-barrel that the seam re-exports). The seam is the feature's stable public API; the raw-file
   bypass is closed.

### U-F48 — `demo-state-fragility-cluster` · **fold (ONE state-cluster remediation row — three coherent sub-cures)**

**Evidence** (registry §13, CONFIRMED live) — three instances of one gestalt (redundant / scattered
state that should be single-sourced or declarative):
- **`usePaletteStore` per-call factory ×3.** `demo/@/composables/palette/usePaletteStore.ts:10`
  `export function usePaletteStore()` re-creates a `useStorage<PaletteStore>("color-palettes", …)`
  binding on EVERY call — invoked at three sites (`usePaletteManager.ts:48`, `useBrowsePalettes.ts:24`,
  `useExtractSession.ts:31`), each spinning up an independent localStorage-round-trip binding rather
  than sharing one module singleton (contrast the `useSession`/`useUserAuth` module-singleton pattern
  already used two files over).
- **`COLOR_STORE_KEY` defined twice, two idioms.** `demo/color-picker/composables/boot/hydrate.ts:41`
  `const COLOR_STORE_KEY = "color-picker"` (app-root, vanilla `localStorage.getItem`, `:67`) AND
  `demo/@/composables/color/useColorPersistence.ts:9` `const COLOR_STORE_KEY = "color-picker"`
  (shared layer, VueUse `useStorage`, `:54`) — the SAME literal keyed independently in two files; a
  change to one silently diverges the persistence contract.
- **`Dock.vue` seven watchers, five coordinating one open/close state.**
  `demo/@/components/custom/dock/Dock.vue` runs 7 `watch`es; five of them coordinate the single
  dock-open state through scattered imperative `keepOpen()`/`release()` calls: `:49`
  (`hasAnyActionBar` → resets `actionBarLayerActive`) · `:55` (`actionBarLayerActive` →
  keepOpen/release) · `:77` (`expanded` → resets `slugEditMode`) · `:78` (`anyEditActive` →
  keepOpen/expand/release) · `:79` (`isAnyOpen` → keepOpen/release). Three watchers imperatively call
  keepOpen/release; two more feed the flags they read.

**Cure APPROACH** (E-3 — one hoist, one const, one predicate; the FOLD is that these three are the
same "state-fragility" gestalt cured in ONE coherent remediation row, not three independent build
rows):
1. **Hoist `usePaletteStore` to a module singleton** — the lazy-init module-ref pattern
   (`let _store … if (!_store) _store = useStorage(…)`) already idiomatic in `useSession`/`useUserAuth`
   — so the three call sites share ONE binding, ONE localStorage round-trip.
2. **Const-extract `COLOR_STORE_KEY`** to a single canonical definition (a shared persistence-keys
   const both `hydrate.ts` and `useColorPersistence.ts` import) — one literal, one source; the
   two-idiom divergence trap is closed.
3. **Coalesce the Dock open/close watchers into ONE computed predicate** —
   `const shouldKeepOpen = computed(() => actionBarLayerActive.value || anyEditActive.value ||
   isAnyOpen.value)` driving a SINGLE `watch(shouldKeepOpen, open => open ? dockRef.value?.keepOpen()
   : dockRef.value?.release())`. The three scattered imperative keepOpen/release watchers collapse to
   one declarative predicate + one watch (the `expand?.()` on edit-active and the `slugEditMode`/
   `dockSettle`/`activeLayer` concerns stay as their own distinct watchers — this coalesces only the
   open/close-mutex arm, the genuine duplication). The imperative `keepOpen`/`release` call sites drop
   from five/three to one.

**Why FOLD, not three builds**: the registry rules U-F48 a single "one hoist-to-singleton +
const-extract + computed-predicate row" — the three sub-cures share the state-fragility gestalt and
land as ONE remediation row within U.W-DEMO (no independent per-sub-defect build row). It is a fold
WITHIN this wave (the three merge into one state-cluster row), not a fold into another wave.

---

## §Hard gate (born-RED where the defect is LIVE — registry-cited; ZERO visual gates, no annex)

**Four born-RED gates**, each ARMED now over a LIVE defect and flipping GREEN only at the cure. This
is a STRUCTURAL wave: every gate is a mechanical assertion (an import-graph / ESLint boundary check, a
grep/AST symbol count, a barrel-presence check) — **none is a visual/headless assertion**, so none
rides the U-F54 real-GPU annex (this wave has no rendered surface). The two import-boundary gates
(G-DEMO-1, G-DEMO-3) are wired as STANDING ESLint `no-restricted-imports` rules so the graph cannot
silently re-invert; G-DEMO-2/4 are one-cure flips.

### G-DEMO-1 — U-F45 · the shared color layer is a clean lower layer · **born-RED (STANDING import-boundary rule)**

Assert **no file under `demo/@/composables/color/` imports from `demo/color-picker/`** (app-root) —
the shared color spine has ZERO up-imports into app-root boot. **RED today**:
`palettes-ramp.ts:72` imports `resolveViewAccent` from `../../../color-picker/composables/boot/view-
accents` (a raw-relative up-import). Flips GREEN when `resolveViewAccent` relocates into the shared
color layer, `palettes-ramp` imports it as a sibling, and `boot/useViewAccents` imports it DOWN from
shared. **Wired as a standing ESLint `no-restricted-imports` boundary** (`demo/@/composables/color/**`
may not import `**/color-picker/**`) — a future re-inversion born-REDs at lint. (The two adjacent
components-tree up-imports — `aurora-harmony-stops.ts:23`, `ColorPicker.vue:114` — are BOOKED, not
gated here; §Scope · §BOOKS.)

### G-DEMO-2 — U-F46 · single token source + dead twin removed · **born-RED**

Assert (a) the live session token has ONE canonical reactive cell (the api-client `sessionTokenRef`)
that `useSession`/`useUserAuth` write through, not three independent `Ref` cells; AND (b) the symbol
`clearSession` is ABSENT from `useSession.ts` (the dead desync twin is deleted). **RED today**: three
cells — `useSession._token` (`:21`), `useUserAuth._userToken` (`:21`), `client.sessionTokenRef`
(`:50`) — plus the exported-dead `clearSession` (`useSession.ts:68,84`). Flips GREEN when the token
single-sources (the two composables hold no private token ref) and `clearSession` is gone. Assertion:
an AST/grep count of independent token-holding module `ref` cells = 1 canonical + write-through
setters; `clearSession` export count = 0.

### G-DEMO-3 — U-F47 · colocation seam (primitive-down + barrel-sealed) · **born-RED (STANDING import-boundary rule)**

Assert (a) the shared color spine imports NO feature internal — no file under `demo/@/composables/`
imports from any `@components/custom/*/composables/**` feature-internal path; `generateSingleColor`
resolves from the shared color layer; AND (b) `palette-browser` exposes a top-level `index.ts` seam,
and NO consumer imports a raw `.vue`/internal file of `palette-browser` (every external reach lands on
a barrel). **RED today**: `useColorParsing.ts:5` imports `generateSingleColor` from the `generate`
feature internal; `palette-browser/index.ts` is absent; `App.vue:165` imports the raw
`palette-browser/dialog/MigratePalettesDialog.vue`. Flips GREEN when the primitive moves down + the
seam is authored + the raw-file reach routes through the `dialog/` barrel. **Wired as a standing
ESLint boundary** (the shared composables layer may not import feature internals; external consumers
may not import `palette-browser/**/*.vue` raw).

### G-DEMO-4 — U-F48 · state-cluster coalesced · **born-RED (the mechanical sub-assertions) + verify-at-execution (Dock coalesce)**

Assert (a) `COLOR_STORE_KEY` is defined EXACTLY ONCE (one canonical const both consumers import) —
grep-count of `COLOR_STORE_KEY =` definitions = 1; AND (b) `usePaletteStore` is a module singleton
(one module-level lazy `useStorage` binding, not a per-call factory) — the store binding is created
outside the exported function body. **RED today**: `COLOR_STORE_KEY` defined twice
(`hydrate.ts:41` + `useColorPersistence.ts:9`); `usePaletteStore.ts:10` creates the binding inside the
per-call factory (3 call sites). Flips GREEN at the const-extract + singleton hoist. The **Dock
watcher-coalesce is a verify-at-execution done-state** (assert the imperative `keepOpen`/`release`
call sites in `Dock.vue` drop from the current scattered set to ONE computed-predicate-driven
`watch`) — a structural refactor whose done-state is confirmed by the keepOpen/release call-site count
falling to one, not a standing gate.

**No born-RED for**: nothing further — all four families carry a gate (three build born-RED +
the fold's mechanical sub-assertions). **No real-GPU annex** (no visual surface). **No §28
three-consumer-surface born-RED** (that clause is U-F29/F30's; U.W-DEMO changes no library export or
cross-repo convention — §Cross-repo RELAY).

---

## §π / DELTA obligations (no π-frame — ZERO visual claims; every family carries a mechanical DELTA)

**This wave has NO visual claim.** No pixel is placed, moved, or recolored — the deliverables are
import edges, reactive-cell counts, barrel seams, and watcher topologies. There is therefore **no
before/after π-frame obligation and no real-GPU / owner-attested annex** (that discipline is
U.W-VISUAL's, for the §2 owner-eye still-reds; the U-F54 annex does not touch this wave). In lieu of a
π-frame, every family carries a **mechanical DELTA** — a before→after count/state, measurable without
a GPU or an eyeball:

| Family | DELTA measurement (before → after) | Evidence anchor |
|---|---|---|
| U-F45 | shared color-layer → app-root up-imports: 1 → 0 (`palettes-ramp`→`boot`); near-cycle: present → dissolved; raw-relative-path bypass: 1 → 0 | `palettes-ramp.ts:72,111` · `useViewAccents.ts:50` · `view-accents.ts:126` |
| U-F46 | token reactive cells: 3 → 1 canonical (+ write-through); storage-backend write paths: 2-hand-synced → 1 persistence owner; dead desync twin: 1 (`clearSession`) → 0 | `useSession.ts:21,68,84` · `useUserAuth.ts:21` · `client.ts:50` |
| U-F47 | spine→feature-internal imports: 1 (`generateSingleColor`) → 0; `palette-browser` top-level seam: absent → present; raw-`.vue` consumer reaches: 1 (`App.vue`) → 0 | `useColorParsing.ts:5` · `App.vue:165` · `palette-browser/` (no `index.ts`) |
| U-F48 | `usePaletteStore` bindings: 3 per-call → 1 singleton; `COLOR_STORE_KEY` definitions: 2 → 1; Dock open/close imperative keepOpen/release call sites: 3-across-5-watchers → 1 computed-predicate watch | `usePaletteStore.ts:10` · `hydrate.ts:41` + `useColorPersistence.ts:9` · `Dock.vue:49,55,77,78,79` |

No claim in this wave is gated by a headless-visual assertion; there is nothing visual to gate.

---

## §Cross-repo RELAY (the E-2 owner edict — CHECKED against each clause, found NOT triggered; the honest declaration)

The E-2 relay edict fires when a U wave "touches a glass-ui component or the glass-ui-level contract
(shared exports, token conventions, the `mixColors`/`sampleColorRamp`/`color2` raw-channel convention,
the producer surfaces)." **U.W-DEMO is checked against each clause and found entirely value.js-repo-
internal (demo-tree-internal, in fact) — NO RELAY row is triggered.** The check, honestly recorded
(not a blanket "no cross-repo ask"):

- **All four families edit ONLY `demo/**`** — `demo/@/composables/**`, `demo/@/components/custom/**`,
  `demo/@/lib/palette/**`, `demo/color-picker/**`. None edits `src/**` (the value.js library) → no
  library **shared-export** change → the "shared exports" clause is not triggered.
- **No convention change.** U-F45 relocates a demo resolver that CONSUMES `@mkbabb/value.js` math; it
  does not alter the `mixColors`/`sampleColorRamp`/`color2` raw-channel convention (that convention is
  U-F30's, in U.W-LIB) → the raw-channel-convention clause is not triggered.
- **No glass-ui producer / component surface change.** U-F48's Dock cure consolidates WHEN the demo
  calls `dockRef.keepOpen()`/`release()`/`expand()` — existing methods of the glass-ui `<GlassDock>`
  instance — into one declarative predicate; it changes NO `GlassDock` prop, method, or contract, only
  the demo's own watcher wiring that drives them. U-F47's `palette-browser` seam + U-F45's relocation
  + U-F46's token single-source are all demo-internal composable/barrel topology. No glass-ui
  component is touched → the producer-surface clause is not triggered.

**No convention change, no producer surface, no consumed-export break, no glass-ui component edit
ships from this wave** → E-2 discharged by the CHECK (the honest declaration), not by a communiqué
row. The U-formation BH communiqué (`17e0f522`) carries the cross-repo coupling that OTHER waves own;
U.W-DEMO adds nothing to it.

---

## §Dispositions (each family → the exact build/fold/retire + rationale)

| Family | Disposition | Rationale |
|---|---|---|
| **U-F45** | **build** (relocate `resolveViewAccent` down) | The shared color spine reaches UP into app-root boot via a raw-relative path (a near-cycle blocking `demo/@` extraction); relocate the pure library-math resolver DOWN to the shared color layer — curing the up-reach AND the alias bypass — with a standing import-boundary gate (G-DEMO-1). Two adjacent up-imports BOOKED. |
| **U-F46** | **build** (single-source + delete dead twin) | One token in three reactive cells + two hand-synced storage backends + a dead desync twin (`clearSession`); single-source on the api-client `sessionTokenRef`, collapse the backends into one persistence owner keyed by a `persistent` flag, delete `clearSession` (E-3: no dead-code landmine). Gate G-DEMO-2. |
| **U-F47** | **build** (primitive-down + seam) | The spine imports a `generate`-feature internal (`generateSingleColor`) and `palette-browser` has no top-level seam (App.vue reaches a raw `.vue`); move the pure primitive DOWN to shared, author the `palette-browser/index.ts` seam, route the raw reach through the `dialog/` barrel. Standing import-boundary gate G-DEMO-3. |
| **U-F48** | **fold** (ONE state-cluster row — three sub-cures) | `usePaletteStore` per-call factory ×3, `COLOR_STORE_KEY` dual-defined, Dock five open/close watchers — one state-fragility gestalt cured in a single remediation row: hoist-to-singleton + const-extract + computed-predicate. Fold WITHIN U.W-DEMO (not into another wave). Gate G-DEMO-4 (mechanical sub-assertions) + verify-at-execution (Dock coalesce). |

Zero silent drops: all 4 families reach a decided home (3 build · 1 fold).

---

## §Dependencies

- **Root** (U.md §The wave DAG — `dependsOn: root`). No upstream wave gates U.W-DEMO; it opens at
  formation and runs in parallel with U.W-CANON / U.W-SEC / U.W-ORACLE (all root-dependent).
- **T.W8 concurrent-landing coupling** (NOT a wave dependency — a branch-hygiene + shared-surface
  law): T.W8 remediation lands commits on the shared `tranche-t` branch; every U.W-DEMO commit
  **pull-rebases first** and is path-scoped (planning: `docs/tranches/U/**`; execution: `demo/**`
  DEMO-owned files). Two edit loci are co-owned with concurrent / adjacent work and MUST land at a
  coordinated post-T.W8-terminal safe moment:
  - **`palettes-ramp.ts` (U-F45 ⟷ U-F6/WR-8).** U-F45's relocation changes the IMPORT LINE of
    `resolveViewAccent` in `palettes-ramp.ts` (and adds/moves the resolver module); U-F6 (U.W-VISUAL)
    + the T.W8 WR-8 remediation edit the RAMP LOGIC of the same file. The two are edit-locus overlaps,
    not semantic conflicts (the relocation is byte-preserving on the resolver), but they must land
    coherently — U-F45's structural move should follow (or rebase cleanly over) the terminal ramp
    cure so it does not thrash the WR-8 work.
  - **`Dock.vue` (U-F48 ⟷ T.W8 dock work).** `Dock.vue` is a heavily T-annotated shell (T-29/T-31
    settle-stamp machinery); the watcher-coalesce lands AFTER the terminal T.W8 dock state so the
    computed-predicate refactor reserves the settled watcher set.
- **No downstream wave depends on U.W-DEMO** — it is a leaf feeding U.W-CLOSE's ledger walk only (and
  the two standing import-boundary gates ride to U.W-CLOSE's book re-probe).

---

## §BOOKS (what rides to a later wave — by name)

- **The two adjacent shared-tree → app-root up-imports → design-loop judgment + U.W-CLOSE re-probe
  (U-F45 broader class).** The registry converged U-F45 on the color-spine instance
  (`resolveViewAccent`); the execution surfaced two more up-imports of the SAME class —
  `demo/@/components/custom/panes/aurora-harmony-stops.ts:23` → `boot/atmosphere-calibration`
  (`resolveCalibratedAtmosphere`) and `demo/@/components/custom/color-picker/ColorPicker.vue:114` →
  `boot/useOverture` (`OVERTURE_KEY`). These are in the components tree (not the gated color-composable
  layer); RECORDED by name so no successor mistakes them for un-audited, and BOOKED to the design
  loop's judgment (relocate-or-ratify per instance) + U.W-CLOSE's re-probe. Surfaced, not dropped; not
  scope-crept into a hard gate the converged registry did not ratify.
- **The `palettes-ramp.ts` edit-locus coordination (U-F45 ⟷ U-F6/WR-8) → the coordinated safe moment.**
  Booked as a shared-surface landing order (§Dependencies), confirmed at execution against the
  terminal T.W8 ramp cure.
- **The `Dock.vue` watcher-coalesce landing order (U-F48 ⟷ T.W8 dock) → the coordinated safe moment.**
  The computed-predicate refactor reserves the settled watcher set after T.W8's terminal dock state.
- **The two standing import-boundary ESLint gates (G-DEMO-1, G-DEMO-3) → U.W-CLOSE re-probe.** The
  crown deliverable is a live boundary guard, not a one-shot fix; re-probed at close (the rule is
  wired and STILL guards a future re-inversion), booked to U.W-CLOSE's book re-probe.
- **The W8 HG5 demo-caps re-encapsulation → this wave's demo-hygiene lane (inherited from `T/FINAL.md
  §5`; the ledger §B.1 T-close carry).** T booked two W8-remediation-grown demo files over the ≤400
  god-module cap — `useAtmosphere.ts` (344→411, the P9-R3/T-37 derive-seam edit) + `Markdown.vue`
  (396→408, the AB-1 KaTeX edit); "splitting demo/ is a remediation act, not a gate act"
  (T/FINAL:294). Re-encapsulate the two below ≤400 the way H.W3 decomposed the demo god-modules
  (behaviour-preserving, cohesion-honest lifts) — a **verify-at-execution done-state** (raw-LoC ≤400
  per file), NO born-RED gate (T ruled it a remediation, not a gate, act). **Lands AFTER the
  U.W-VISUAL re-cures that touch these two files settle** (`useAtmosphere.ts` ⟷ U-F11 derive-seam;
  `Markdown.vue` ⟷ U-F19 AB-1) so the decomposition reserves the settled file shape — the same
  coordinated safe-moment discipline as the `palettes-ramp` / `Dock.vue` loci (§Dependencies).
