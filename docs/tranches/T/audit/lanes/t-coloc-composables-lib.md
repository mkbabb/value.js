# t-coloc-composables-lib — COLOCATION CENSUS 2 (E-1: demo composables + lib + styles)

**Lane**: `t-coloc-composables-lib` (T DEVELOPMENT structural fleet). **Mandate**:
`docs/tranches/T/MANDATE-2026-07-06.md` §2 **E-1 (the colocation grand edict)**. **Charter**:
census `demo/@/composables/**`, `demo/@/lib/**`, `demo/@/styles/**` — classify each unit
TRULY-module/global (→ stays in a `composables/`/module dir at its level) vs single-component
(→ COLOCATE into that component's subtree); name the long-running dirs that outgrew one concern
and must break into encapsulated common modules; deliver the target-structure table + spec-grade
cure directions. **ZERO product-code changes** — this file is the only write. This is DEVELOPMENT:
gestalt direction, never a patch.

**Substrate**: `tranche-t` @ `cc4f4fa` (the S close). **Method**: full import-graph consumer census
(grep every module-tree file's basename across `demo/**`, minus self) — the raw census is preserved
inline below as `[consumers=N]`. Baseline already-colocated corpus (the pattern to extend):
`demo/@/components/custom/<feature>/composables/**` (40 feature-owned composables already colocated
across 12 features — the D.W3 restructure + the H.W3 sub-component lifts). The residual module tier
is `demo/@/{composables,lib,styles,utils}` — this lane's subject.

---

## §0 — The six load-bearing findings (one line each)

1. **CL-1 (TWO-HOMES DOMAIN SPLIT, demo, structural-major)** — the palette domain and the color
   domain each occupy **two module homes** — `composables/palette/` (13 files) **+** `lib/palette/`
   (15 files); `composables/color/` (6) **+** `lib/{color-utils,color-space-meta,gamut-ink,view-accents}`
   — split on a **reactive-vs-pure** axis that is NOT a colocation axis. E-1 wants domain-encapsulated
   modules; the `lib/` top-level is a mirror-of-`composables/`-by-reactivity that must dissolve into
   per-domain modules (pure + reactive side-by-side, encapsulated).
2. **CL-2 (APP-SHELL COLOCATION GAP, demo, structural-major)** — `App.vue` lives at
   `demo/color-picker/` with **no colocated composables home**; its three shell-private composables
   (`useDevicePixelSnap` [1←App], the `useAtmosphereBoot` boot chain [1←App], `usePaletteManagerWiring`
   [1←App]) sit in the SHARED module tree pretending to be module-level. The app shell is itself a
   component and must own its private composables.
3. **CL-3 (SINGLE-FEATURE LEAVES IN MODULE TREE → COLOCATE, demo)** — `composables/prng.ts`
   [1← generate], `lib/quantize-worker.ts` [1← image-palette-extractor], `lib/dateFormat.ts`
   [3, ALL palette-browser admin panels] are single-feature and belong INSIDE that feature's subtree;
   the module tree is not their home (`quantize-worker` carries a `?worker` import — colocation is
   build-safe).
4. **CL-4 (REACTIVE/PURE TWIN SPLITS, demo)** — three concerns have their pure half and reactive half
   in different trees: `lib/view-accents.ts` [1] ↔ `composables/color/useViewAccents.ts` [1];
   `lib/palette/export.ts` [1] ↔ `composables/palette/usePaletteExport.ts` [3];
   `composables/color/useColorPersistence.ts` [1] ↔ `useColorPipeline.ts`. One concern = one unit;
   the split is legacy residue (E-3 binds).
5. **CL-5 (THE ATMOSPHERE/BOOT SUBSYSTEM IS APP-SHELL-PRIVATE, demo, ties T-1/T-25/T-27)** —
   `useAtmosphereBoot → {useAtmosphere [1], useViewAccents [1] → lib/view-accents [1], useContrastSafeColor}`
   is a closed App-shell-owned chain masquerading as generic `composables/color/`; it colocates with
   App as the boot unit — and this is the exact subsystem the T load-animation findings edit, so its
   home should be legible.
6. **CL-6 (THE MODULE TIER IS THE LONG-RUNNING DIR; `palette/` is the CORRECT model)** — E-1's
   "long-running dirs → common modules, encapsulated" already succeeded ONCE: `usePaletteManager`
   (25 consumers) is a 153-LoC facade over **10 encapsulated sub-composables consumed only by it**
   — the model to copy. The un-encapsulated long-running dir is the `composables/` + `lib/` **pair**
   itself; the break is CL-1's domain-module transposition.

---

## §1 — Method + the module-tier inventory

The residual module tier (everything NOT already colocated under a `components/custom/<feature>/`
subtree):

| Dir | Files | LoC | Role |
|---|---|---|---|
| `demo/@/composables/` | 29 (`auth/` 4, `color/` 6, `palette/` 13, root 6) | 3977 | reactive module composables |
| `demo/@/lib/` | 24 (root 4, `palette/` 5 + `palette/api/` 15) | 2107 | pure module logic + API client |
| `demo/@/styles/` | 4 (`style.css` 530, `animations.css` 212, `hljs.css` 102, `utils.css` 99) | 943 | global CSS |
| `demo/@/utils/` | 1 (`utils.ts` = `cn()`) | — | the one shared class-merge util |
| `demo/@/router/` | 1 (`index.ts`) | — | vue-router 5 route table (genuinely app-level) |

Aliases in play (tsconfig): `@composables → demo/@/composables`, `@lib → demo/@/lib`,
`@styles → demo/@/styles`, `@utils → demo/@/utils`. **Any restructure is alias-scoped**: the target
table below implies moving alias roots + rewriting `@composables/`/`@lib/` callsites (52 + 102 refs).
That is the E-3 architectural-transposition cost, paid once, not a reason to defer (E-4 folds it in).

---

## §2 — `demo/@/composables/` classification (29 files)

Verdict key: **MODULE** = truly cross-feature/global, stays in a module `composables/` (possibly
re-homed by domain per CL-1); **COLOCATE→X** = single-feature, moves into X's subtree; **SHELL** =
App-shell-private, colocates with `App.vue`.

| File | consumers | Verdict | Why |
|---|---|---|---|
| `palette/usePaletteManager.ts` | 25 | **MODULE** (palette) | the canonical facade — the domain hub |
| `palette/usePaletteManagerWiring.ts` | 1 ← App | **SHELL** | App↔facade bridge; owns the 4 orchestration watchers — pure app-shell wiring |
| `palette/useAdminAudit.ts` | 1 ← pm | **MODULE** (palette, encapsulated) | `pm.audit` sub-composable — the CL-6 decomposition, correct in-domain |
| `palette/useAdminFlagged.ts` | 1 ← pm | **MODULE** (palette, enc.) | `pm.flagged` sub-composable |
| `palette/useAdminTags.ts` | 1 ← pm | **MODULE** (palette, enc.) | `pm.tags` sub-composable |
| `palette/useVersionHistory.ts` | 1 ← pm | **MODULE** (palette, enc.) | `pm.versions` sub-composable |
| `palette/useTagEdit.ts` | 1 ← pm | **MODULE** (palette, enc.) | `pm.tagEdit` sub-composable |
| `palette/usePaletteActions.ts` | 1 ← pm | **MODULE** (palette, enc.) | facade action extraction |
| `palette/useColorNameQueue.ts` | 1 ← pm | **MODULE** (palette, enc.) | admin color queue |
| `palette/useSlugMigration.ts` | 1 ← pm | **MODULE** (palette, enc.) | slug-switch flows |
| `palette/useAdminUsers.ts` | 1 ← pm | **MODULE** (palette, enc.) | admin user CRUD |
| `palette/useBrowsePalettes.ts` | 1 ← pm | **MODULE** (palette, enc.) | remote browse/sort/vote |
| `palette/usePaletteStore.ts` | 3 | **MODULE** (palette) | localStorage CRUD — also used by IPE + browse |
| `palette/usePaletteExport.ts` | 3 | **MODULE** (palette) | export dispatch — **CL-4: unify with `lib/palette/export.ts`** |
| `auth/useAdminAuth.ts` | 6 | **MODULE** (auth) | admin bearer — cross-feature |
| `auth/useSession.ts` | 5 | **MODULE** (auth) | API session token |
| `auth/useUserAuth.ts` | 2 | **MODULE** (auth) | user slug/token auth |
| `auth/useAdminUsers.ts` | 1 ← pm | **MODULE** (auth) | admin user auth (distinct from palette's) |
| `color/useColorPipeline.ts` | 2 (App + picker keys) | **MODULE** (color) | the ONE color spine (S.W2) — App-owned, injected |
| `color/useColorPersistence.ts` | 1 ← useColorPipeline | **MODULE** (color) | **CL-4: unify with `useColorPipeline`** (its only caller) |
| `color/useContrastSafeColor.ts` | 4 | **MODULE** (color) | contrast helpers — cross-feature (sliders, cards, boot, accents) |
| `color/useAtmosphere.ts` | 1 ← Boot | **SHELL** (boot unit) | **CL-5** — App-shell atmosphere field |
| `color/useAtmosphereBoot.ts` | 1 ← App | **SHELL** (boot unit) | **CL-5** — the boot orchestrator |
| `color/useViewAccents.ts` | 1 ← Boot | **SHELL** (boot unit) | **CL-5** — writes the 9 accent tokens; **CL-4: pairs `lib/view-accents.ts`** |
| `useViewManager.ts` | 8 | **MODULE** (view) | view router — cross-feature |
| `usePaneRouter.ts` | 3 | **MODULE** (view) | pane source-of-truth (B.W2) |
| `viewSchema.ts` | 3 | **MODULE** (view) | canonical `ViewId`/`VIEW_MAP` — pure data+types |
| `useFilteredList.ts` | 3 | **MODULE** (common) | generic filtered-list helper |
| `useSafeStorage.ts` | 3 (all auth) | **MODULE** (common/auth) | Safari-private-safe storage — auth's dep |
| `useDevicePixelSnap.ts` | 1 ← App | **SHELL** | DPR snap — App-shell layout concern |
| `prng.ts` | 1 ← generate | **COLOCATE→generate** | Mulberry32; sole consumer `generate/composables/useColorGeneration.ts` |

**Composables tally**: MODULE 21 (of which palette 12, auth 4, color 3, view 3, common 2 — overlaps
noted), SHELL 5 (`usePaletteManagerWiring`, `useDevicePixelSnap`, and the 3-file boot chain),
COLOCATE 1 (`prng`).

---

## §3 — `demo/@/lib/` classification (24 files)

| File | consumers | Verdict | Why |
|---|---|---|---|
| `palette/types.ts` | 47 | **MODULE** (palette) | the domain type spine — canonical |
| `palette/constants.ts` | 30 | **MODULE** (palette) | `CURRENT_PALETTE_ID` + shared consts |
| `palette/utils.ts` | 22 | **MODULE** (palette) | slugify + palette utils |
| `palette/mix.ts` | 11 | **MODULE** (palette) | mix helpers — used by gradient+mix+router |
| `palette/export.ts` | 1 ← usePaletteExport | **MODULE** (palette) | **CL-4: unify with the export composable** |
| `palette/api/client.ts` | 9 (all api/) | **MODULE** (palette/api) | HTTP transport — api-internal hub |
| `palette/api/index.ts` | 1 ← ComponentSliders + barrel | **MODULE** (palette/api) | pure barrel |
| `palette/api/palettes.ts` | 2 (index + router) | **MODULE** (palette/api) | user CRUD |
| `palette/api/{colors,versions,sessions,availability,admin-*}.ts` | 1 ← barrel each | **MODULE** (palette/api, enc.) | per-resource api leaves — the correct CL-6 decomposition (mirror of `usePaletteManager`) |
| `palette/api/api-problem.ts` | 1 ← useSlugMigration | **MODULE** (palette/api) | typed problem+ shape |
| `palette/api/useApiClient.ts` | 4 (App provide + 3 UI) | **MODULE** (palette/api) | the provide/inject client — App-provided |
| `color-utils.ts` | 8 | **MODULE** (color) | cross-feature color math (gradient, mix, contrast) |
| `gamut-ink.ts` | 3 (color-picker + gradient×2) | **MODULE** (color/paint) | canvas ink-probe — shared by 2 features' painters |
| `color-space-meta.ts` | 2 (gradient + mix) | **MODULE** (color) | space metadata — 2 features |
| `view-accents.ts` | 1 ← useViewAccents | **SHELL** (boot unit) | **CL-4+CL-5**: the pure half of `useViewAccents`; travels with the boot unit |
| `quantize-worker.ts` | 1 ← image-palette-extractor | **COLOCATE→image-palette-extractor** | Web Worker; `?worker` import — build-safe to move under the feature |
| `dateFormat.ts` | 3 (all palette-browser admin) | **COLOCATE→palette-browser** | single-feature date formatter (or → `common/` if a 2nd feature ever consumes) |

**Lib tally**: MODULE 20 (palette-data 5, palette/api 13, color 3 — with gamut-ink a paint-common
candidate), SHELL 1 (`view-accents`), COLOCATE 2 (`quantize-worker`, `dateFormat`).

---

## §4 — `demo/@/styles/` classification (4 files) + `utils/`

| File | Verdict | Evidence |
|---|---|---|
| `style.css` (530) | **GLOBAL — stays** | `@theme` Tailwind tokens, `@property --accent-*`, `:root` project tokens, the app-layout/pane grid law, `@layer base` body ground. Genuinely global. |
| `animations.css` (212) | **GLOBAL — stays** | shared keyframes (`vj-*`, `vj-settle`) + the global PRM reduced-motion guard that neutralises scoped animations app-wide. |
| `hljs.css` (102) | **GLOBAL — stays** | the ONE house code-plate token theme (S.W4-8) — shared by `GradientCodeEditor` + `useMarkdownHighlighting`. |
| `utils.css` (99) | **GLOBAL — stays** (audit residuals) | shared recipes: `.section-subtitle`, `.skeleton-ink-register`, `.dashed-well`, `.gold-shimmer-icon`, `.swatch-row`, `.fraunces`/`.fira-code` font aliases — all multi-consumer. |
| `@/utils/utils.ts` (`cn()`) | **GLOBAL — stays** (→ `common/`) | the clsx+tailwind-merge helper — universal. Fold into a `common/` module if CL-1's re-home lands. |

**Styles verdict: NO restructure needed — the discipline already ran.** D.W4 Lane A already
colocated the four component-specific blocks OUT of `style.css` (`.palette-card-grid`→PaletteCardGrid,
`.palette-tab-content`→PaletteDialog, `.touch-gate-*`→ComponentSliders, `.pane-scroll-fade`→PaneHeader),
and the S waves colocated the rest into SFC `<style>` blocks. The residual class rules in `style.css`
(`.app-layout`, `.pane-*`, `.underline-tabs`, `.glass-slider[data-variant]`, `.slug-pill`) are all
genuinely global/multi-consumer (`.slug-pill` = shared across dock menus + palette bars). **Standing
rule for T** (not a move): any NEW component-specific rule colocates into its SFC; `styles/` holds
only tokens + global keyframes + genuinely-shared recipes. The one watch item is `.underline-tabs` /
`.glass-slider[data-variant="spectrum"]` — component-scoped selectors that could migrate to their
SFCs, but both are cross-instance recipes today; leave until their component is otherwise touched.

---

## §5 — CL-1 in depth: the two-homes domain split (the structural core)

The module tier is organized by **reactivity** (`composables/` = has-refs, `lib/` = pure) instead of
by **domain**. The consequence: the palette domain is **28 files across two top-level dirs**
(`composables/palette/` 13 + `lib/palette/` 15), and the color domain is **10 files across two**
(`composables/color/` 6 + 4 `lib/` roots). The reactive/pure boundary runs THROUGH each domain, and
E-1's colocation axis (does-this-serve-one-consumer / is-this-one-concern) is orthogonal to it —
which is why CL-4's twin-splits exist at all (`export.ts`+`usePaletteExport`, `view-accents.ts`+
`useViewAccents` are ONE concern cut in half by the dir boundary).

**Cure direction (gestalt, not a patch)**: dissolve the top-level `lib/` mirror; re-home the module
tier **by domain**, pure and reactive side-by-side, each domain encapsulated with its own barrel:

```
demo/@/
  app/                         # (or keep at demo/color-picker/) the App shell + its SHELL composables
    App.vue
    composables/               # useDevicePixelSnap, usePaletteManagerWiring, boot/
      boot/                    # useAtmosphereBoot + useAtmosphere + useViewAccents + view-accents (CL-5, one unit)
  palette/                     # ONE domain (was composables/palette + lib/palette)
    model/                     # types.ts, constants.ts, utils.ts, mix.ts  (pure)
    api/                       # client + per-resource leaves + useApiClient + index  (the CL-6 model, kept)
    export/                    # export.ts + usePaletteExport.ts  (CL-4 unified)
    composables/               # usePaletteManager facade + its 10 encapsulated sub-composables
    index.ts                   # domain barrel
  color/                       # ONE domain (was composables/color + lib color roots)
    model/                     # color-utils.ts, color-space-meta.ts  (pure)
    paint/                     # gamut-ink.ts  (shared canvas ink — or a top-level paint/ if mix wants it)
    composables/               # useColorPipeline (+ folded useColorPersistence, CL-4), useContrastSafeColor
  view/                        # viewSchema.ts (model) + useViewManager + usePaneRouter (composables)
  auth/                        # the 4 auth composables + useSafeStorage (its dep)
  common/                      # cn(), useFilteredList, dateFormat (if it stays shared), prng (if generate keeps it shared)
  styles/                      # UNCHANGED — global tokens + keyframes + recipes
```

This is a large transposition; it is exactly the "architectural transposition for elegance/simplicity"
E-3 endorses and E-4 folds in. **Staging note for the T plan**: it can land in two beats without a
half-state — (A) the low-risk leaf colocations + twin-unifications (CL-3/CL-4/CL-5, ~8 files, no
domain re-home) FIRST; (B) the `lib/`-dissolve domain re-home (CL-1) SECOND, alias-scoped. Beat A
alone discharges the single-consumer colocation letter of E-1; Beat B discharges the "long-running
dir → encapsulated common modules" clause.

---

## §6 — CL-2/CL-5 in depth: the App shell has no home

`App.vue` is the app shell but sits alone at `demo/color-picker/` (alongside only `index.html`,
favicons, `vite.d.ts`). Its private composables live in the shared tree and read as "module-level"
purely because there's nowhere shell-local to put them:

- `useDevicePixelSnap` [1←App] — DPR layout snap, shell-only.
- `usePaletteManagerWiring` [1←App] — the App↔`usePaletteManager` bridge that owns the 4 cross-module
  orchestration watchers (auth↔view↔browse↔admin↔colorQueue). It is App-shell glue by construction.
- The boot chain (CL-5): `useAtmosphereBoot` [1←App] → `useAtmosphere` [1], `useViewAccents` [1] →
  `lib/view-accents` [1]. A closed 4-file subsystem whose ONLY entry is App. This is the atmosphere/
  aurora boot the owner is editing in **T-1 / T-25 / T-27** (load desync, "too gray/slow/jittery"
  boot, aurora arrival) — its physical home should be legible as "the shell's boot", not buried in a
  generic `color/` bucket. Colocating it as `app/composables/boot/` makes the T load-animation lanes'
  target obvious.

**Cure**: give the shell a colocated `composables/` (either promote `demo/color-picker/` into the
`@/app/` module above, or add `demo/color-picker/composables/`). The 5 SHELL units move there.

---

## §7 — CL-3/CL-4 leaf actions (the low-risk Beat-A set)

Single-feature leaves (COLOCATE) and one-concern twin-splits (UNIFY) — 8 files, no domain re-home,
independently landable:

| Action | Files | Target |
|---|---|---|
| COLOCATE | `composables/prng.ts` | `components/custom/generate/` (its `composables/` — sole consumer `useColorGeneration.ts`) |
| COLOCATE | `lib/quantize-worker.ts` | `components/custom/image-palette-extractor/` (sole consumer `useImageQuantize.ts`; `?worker` import moves cleanly) |
| COLOCATE | `lib/dateFormat.ts` | `components/custom/palette-browser/` (3 consumers, all its admin panels) — or `common/` if you prefer a shared home |
| UNIFY | `lib/palette/export.ts` + `composables/palette/usePaletteExport.ts` | one `palette/export/` unit (pure + reactive) |
| UNIFY | `lib/view-accents.ts` + `composables/color/useViewAccents.ts` | one boot-unit file (travels with CL-5's boot subsystem) |
| FOLD | `composables/color/useColorPersistence.ts` → `useColorPipeline.ts` | its only caller; the persistence concern is the pipeline's tail, not a separate module |

Each is a mechanical move + alias-callsite rewrite; none changes runtime behaviour (E-3-clean, no
shim — the callers move to the new path at the root, per `feedback_no_backwards_compat`).

---

## §8 — Owner + cross-refs + interactions

- **Owner**: all findings are **demo** (this is the demo module tree). No producer/src surface —
  `lib/quantize-worker.ts` imports `@src/quantize` but that's a consume boundary, unaffected by moving
  the worker file. No glass-ui interaction (E-2 lane owns that).
- **E-1 discharge**: this lane is the composables/lib/styles half of E-1's census. Its sibling
  (components/ colocation — "CENSUS 1") owns the SFC tree; this lane owns the residual module tier.
  The two target-structure tables must be reconciled at synthesis so `common/` / domain-module names
  agree.
- **T load-animation interaction**: CL-5's boot subsystem (`useAtmosphereBoot`/`useAtmosphere`/
  `useViewAccents`) is the physical code the T-1/T-25/T-27 lanes edit. This lane recommends its home;
  those lanes own its behaviour. Any T restructure wave must land AFTER (or jointly-sequenced with)
  the load-animation waves so the boot files aren't moving under those lanes' feet — a plan-ordering
  constraint, not a merge conflict.
- **No freeze-window / producer dependency**: pure demo-internal transposition; nothing waits on the
  glass-ui BG/BH cut. Can land in any T impl wave; recommend late (post-load-animation), and Beat-A
  (§7) before Beat-B (§5).
- **E-3/E-4 posture**: NO shims, NO legacy — consumers migrate to the new path at the root. The twin
  splits (CL-4) are legacy residue of the reactive/pure dir carve; unifying them is the E-3 elegance
  the owner demands. All items are FOLDED INTO T (E-4), none deferred.

---

## §9 — The census appendix (raw consumer counts, for verification)

Composables (basename → importers, self excluded): `usePaletteManager`=25, `useViewManager`=8,
`useAdminAuth`=6, `useSession`=5, `useContrastSafeColor`=4, `usePaneRouter`=3, `useSafeStorage`=3,
`useFilteredList`=3, `viewSchema`=3, `usePaletteStore`=3, `usePaletteExport`=3, `useUserAuth`=2,
`useColorPipeline`=2, and 13 single-consumer files (the pm sub-composables + the shell/boot leaves +
`prng`). Lib: `types`=47, `constants`=30, `utils`=22, `mix`=11, `client`=9 (api-internal),
`color-utils`=8, `useApiClient`=4, `dateFormat`=3, `gamut-ink`=3, `color-space-meta`=2, `palettes`=2,
and the single-consumer leaves (`export`, `view-accents`, `quantize-worker`, the per-resource api
modules behind the barrel). Full per-file importer lists were computed live (grep import-graph over
`demo/**`, 2026-07-07) and drove §2/§3.
