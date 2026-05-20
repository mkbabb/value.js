# D-HARDEN-4 — Frontend cohesion depth + De research fidelity

Read-only hardening audit for **D.W3** (the frontend cohesion wave). Scope: cross-walk
`research/De-frontend-god-modules.md` against `waves/D.W3.md`, surface mis-counts,
specify the `PaletteDialog/` split concretely, depth-check the facade-completion
recommendation, spot-check the reactive-props codemod, audit the view-schema
extraction routing, and place the chronically-deferred frontend items + the
`demo/CLAUDE.md` wholesale reconcile.

Working tree at audit: D-open commit base; tranche state planning-only. All citations
are `file:line`.

---

## §1 — De → D.W3 cross-walk

De's findings are tagged De-1 through De-7 in `findings.md §2`. The wave assignment is:

| De finding | Source | D.W3 lane | Coverage verdict |
|---|---|---|---|
| De-1 — PaletteDialog.vue 652 LOC (1 god module) | `De §1, §2.1, §8 P1.1` | **Lane A** | folded (the headline of Lane A) |
| De-2 — `TabValue` drift (5 vs 8) | `De §3.2` | **Lane A** | folded; **reframed below in §2** |
| De-3 — 10 component-side `@lib/palette/api` imports — incomplete facade | `De §7.3, §8 P2.3` | **Lane B** | folded; **count is actually 11 — see §3** |
| De-4 — 38/40 SFCs need reactive-props destructure | `De §6.2` | **Lane C** | folded; **count is actually 32 — see §4** |
| De-5 — 8 SFCs use `ref<HTMLElement>` instead of `useTemplateRef` | `De §6.1` | **Lane C** | folded; the 8 sites verified intact |
| De-6 — dead `provide("auroraConfig", …)` at App.vue | `De §5.2` | **Lane C** | folded; verified zero consumers (§4 below) |
| De-7 — KEEP composable-facade + InjectionKey; NO Pinia | `De §4.2` | architectural verdict — no lane | accepted; no D action |

De findings NOT carried into D.W3 (correctly noted in De but not folded here):

- **De §2.2 — PaletteCard.vue 426 LOC P3 sub-component dir** — De §8 P3.2 marked
  "only after P1, only if expansion grows". D.W3 omits. **Correct deferral** —
  cohesive at the script level; pending future expansion.
- **De §2.4 — ImageEyedropper.vue P2 split** — De §8 P2.2 named explicitly. **NOT
  folded into D.W3** — only the dialog split lands. Recommend either folding into
  Lane A's split-pattern PR (same pattern, separate file boundary) or filing for a
  future wave; today it sits unrouted between De §8 P2.2 and D.W3 silence.
- **De §3.2 — `useColorNameQueue.ts` → `palette/` or `admin/` move** + **delete
  `useAdminOperations.ts` barrel**. De §8 P2.5 + P3.4. **NOT folded into D.W3.**
  Both are small mechanical moves; Lane B is the obvious home (it already touches
  the palette/auth composable surface). Recommend folding into Lane B.
- **De §7.4 — `"__current__"` magic string → `palette-browser/constants.ts`**
  (`PaletteDialog.vue:403`, `useSwatchActions.ts:25,78`). De §8 P3.3.
  **NOT named in D.W3**, but the wave's `constants.ts` slot in Lane A's dir sketch
  is the natural home — recommend adding `CURRENT_PALETTE_ID = "__current__"`
  there as part of Lane A.

**Cross-walk gaps (action items for D.W3 spec)**:

1. **ImageEyedropper P2 split** — name explicitly in D.W3 Lane A scope, OR file
   for D.W6 close discussion / a future wave.
2. **`useColorNameQueue` move + `useAdminOperations` barrel deletion** — name
   explicitly in D.W3 Lane B scope (the lane already touches the palette/admin
   composable surface).
3. **`CURRENT_PALETTE_ID` constant** — fold into Lane A's `constants.ts`.

These are the only De findings not currently routed. Otherwise, the cross-walk is
clean: all P1 items map to Lane A, all "incomplete facade" items map to Lane B,
all Vue 3.5 modernization items map to Lane C.

---

## §2 — PaletteDialog split — concrete file sketch

### §2.1 — The architectural reframe

D.W3 currently sketches a `PaletteDialog/` dir with `components/`, `composables/`,
`constants.ts`, optional `skeletons/`. Per the directive ("Complex components
should be structured into sub-component dirs"), the dir shape is correct **for a
component of this complexity**. But the split must be grounded in what actually
lives in the 401-line script — not the directive's full pattern applied
mechanically.

Reading `PaletteDialog.vue:192-594` end-to-end identifies **five separable
concerns**:

1. **Composable consumption** (lines 261-352, 80 LOC) — currently parallel-wires
   the 9 composables that `usePaletteManager` already exposes. **Replace with
   `inject(PALETTE_MANAGER_KEY)!`** — single highest-impact change.
2. **Overlay dismissal guards** (lines 429-453, 25 LOC) — `isTeleportedTarget`,
   `onPointerDownOutside`, `onInteractOutside`. Self-contained interaction logic.
3. **Modal stack** — three independent dialog flows: `VersionHistoryDrawer`
   (lines 518-536), `FlagReportDialog` (lines 540-556), `DeleteAllConfirm`
   (lines 493-501).
4. **Palette mutations** — `commitColorEdit` (lines 402-425), `onPublish`
   (lines 468-486), `onFork` (lines 505-514), `onExport` (lines 560-572). Each
   is a dialog-side wrapper around an API call or a `PaletteManager` method.
5. **Browse filter state** (lines 576-593) — `availableTags`, `onStatusChange`,
   `onTagsChange`, `onClearFilters`.

Concerns 4 and 5 partially belong in `usePaletteManager` (post-Lane-B facade
completion). The dialog's own dir owns 1, 2, 3, and the residual UI hooks of 4/5.

### §2.2 — Concrete file landing

```
demo/@/components/custom/palette-browser/PaletteDialog/
├── PaletteDialog.vue                        # outer shell (~180 LOC)
├── components/
│   ├── PaletteDialogHeader.vue              # MOVED from sibling (unchanged)
│   ├── PaletteControlsBar.vue               # MOVED from sibling (with §2.4 fix)
│   ├── PaletteSavedTab.vue                  # MOVED from sibling
│   ├── PaletteBrowseTab.vue                 # MOVED from sibling
│   ├── DeleteAllConfirm.vue                 # EXTRACTED — ConfirmDialog wrapper
│   ├── VersionHistoryDrawer.vue             # MOVED from sibling
│   └── FlagReportDialog.vue                 # MOVED from sibling
├── composables/
│   ├── usePaletteDialogState.ts             # MOVED (with §2.3 reconcile)
│   ├── useDialogModalStack.ts               # NEW — version/flag/delete-all state
│   └── useDialogOverlayGuards.ts            # NEW — pointer-down-outside + interact-outside
└── constants.ts                             # NEW — CURRENT_PALETTE_ID = "__current__"
```

**File-by-file**:

- **`PaletteDialog.vue` (~180 LOC)**: outer `<Dialog>` shell, `<Tabs>` block,
  TabsContent wiring (5 tabs only — see §2.3), composes `inject(PALETTE_MANAGER_KEY)`
  + `useDialogModalStack()` + `useDialogOverlayGuards()` + the existing
  `usePaletteDialogState()`. Template stays ~120 LOC, script drops to ~60 LOC
  (currently 401).

- **`components/DeleteAllConfirm.vue` (~30 LOC)**: a small `<ConfirmDialog>`
  wrapper that takes `:count` and emits `confirm`. Today this is 13 lines of
  inline template + 8 LOC of script in the parent. Worth its own file because
  it's a complete modal unit.

- **`composables/useDialogModalStack.ts` (~60 LOC)**: owns `versionDrawerOpen`,
  `versionDrawerPalette`, `flagDialogOpen`, `flagDialogPalette`,
  `showDeleteAllConfirm`. Exposes `openVersions(palette)`, `openFlag(palette)`,
  `confirmDeleteAll()` + the corresponding handlers (`onRevert`, `onFlagSubmit`).
  Today these are scattered across lines 493-556 of the dialog script.

- **`composables/useDialogOverlayGuards.ts` (~30 LOC)**: owns
  `isTeleportedTarget`, `onPointerDownOutside`, `onInteractOutside`. Today
  lines 429-453.

- **`constants.ts`**: `CURRENT_PALETTE_ID = "__current__"` (resolves De §7.4 +
  the magic-string drift between `PaletteDialog.vue:403` and
  `useSwatchActions.ts:25,78`).

### §2.3 — TabValue reconcile — reframed

De's framing was "5 vs 8 vs 13 — the dialog and dock disagree". A fresh read
shows the actual architecture:

- **`TabValue` = 5** (`usePaletteDialogState.ts:5`): saved, browse, extract,
  admin-users, admin-names. **This is the dialog's tab surface — correct.**
- **`ViewId` = 13** (`useViewManager.ts:20-34`): the dock+router view surface,
  which includes the 5 dialog tabs PLUS 4 standalone views (atmosphere, blob,
  mix, generate, gradient — wait, that's 5; plus picker, palettes) PLUS 3 admin
  views (admin-audit, admin-flagged, admin-tags) that render in `AdminPane.vue`
  (not in the dialog — verified at `AdminPane.vue:52,55,58`).
- **`PaletteControlsBar.vue:30-47` renders 8 triggers** (saved, browse,
  extract, admin-users, admin-names, admin-audit, admin-flagged, admin-tags).
  **But the dialog has TabsContent for only 5** (`PaletteDialog.vue:57-141`).
  **The 3 admin-audit / admin-flagged / admin-tags triggers in the dialog are
  dead** — clicking them moves the controls bar state but renders no content.

**The bug is in `PaletteControlsBar`, not `TabValue`.** `PaletteControlsBar` is
dialog-only (`grep PaletteControlsBar` confirms one consumer:
`PaletteDialog.vue:31,229`). The 3 admin-audit/flagged/tags triggers should be
**removed from the dialog's controls bar**, since those admin views render via
the dock pane router in `AdminPane.vue`.

**Reframed Lane A reconcile**:
- Keep `TabValue` at 5. It's correct.
- Strip the 3 unused admin triggers from `PaletteControlsBar.vue:38-46`.
- Optionally add a type-test `TabValue ⊆ ViewId` (since admin-audit etc. are
  ViewId members not in TabValue, the test asserts the dialog tabs are a
  subset of the views).

This is **less work and a cleaner fix** than D.W3's current "reconcile TabValue
to match the rendered set" framing — the rendered set is the bug.

### §2.4 — Skeleton (`skeletons/`) directive question — verdict

D.W3 says `skeletons/` is "optional". Audit verdict: **omit**. The dialog has no
`<Suspense>` boundary today. Its async data flows (`loadRemotePalettes`,
`loadAdminUsers`, `loadColorQueue`) all carry their own per-tab loading state
(`browsing`, `loadingUsers`, `loadingColorQueue`). The skeletons would be inside
each tab content (e.g. `PaletteCardSkeleton.vue` already exists at
`palette-browser/PaletteCardSkeleton.vue` per the `withDefaults` grep). Adding a
`PaletteDialogSkeleton.vue` is contrived for a non-async dialog shell.

**Verdict**: omit `skeletons/`. The dir's existing PaletteCardSkeleton stays at
its current location (sibling to the dialog, used inside Browse/Saved tabs).

### §2.5 — Final file count

- **Outer shell**: 1 file (`PaletteDialog.vue`).
- **`components/`**: 7 files (5 moved siblings + 1 extracted DeleteAllConfirm + 0
  new shells; PaletteDialogHeader/ControlsBar/SavedTab/BrowseTab/VersionHistoryDrawer/FlagReportDialog
  all move in unchanged).
- **`composables/`**: 3 files (1 moved usePaletteDialogState + 2 new:
  useDialogModalStack, useDialogOverlayGuards).
- **`constants.ts`**: 1 file.
- **Total**: **12 files** in the new dir; **0 new sub-shells** in the template;
  **~6 components moved**, **1 new component** (DeleteAllConfirm),
  **2 new composables**, **1 new constants file**.

The outer `PaletteDialog.vue` lands at ~180 LOC (vs 652 today). Each sub-file
≤ ~250 LOC per the wave sub-gate A.

---

## §3 — Facade completion depth assessment

### §3.1 — Fresh count

`grep -rn 'from "@lib/palette/api"' demo/@/components/custom` returns **11
matches**, not 10. The 11 sites:

| # | File:Line | Imports | Disposition |
|---|---|---|---|
| 1 | `panes/BrowsePane.vue:132` | (various) | LIFT into `usePaletteManager` |
| 2 | `color-picker/composables/useCustomColorNames.ts:5` | `getApprovedColorNames` | **KEEP** — composable, not component |
| 3 | `palette-browser/AdminAuditPanel.vue:75` | `getAuditLog` | LIFT into `palette/useAdminAudit.ts` |
| 4 | `palette-browser/AdminUsersPanel.vue:147` | `getUserPalettes` | LIFT (already partly via `useAdminUsers`) |
| 5 | `color-picker/controls/ColorInput.vue:117` | `proposeColorName` | **KEEP** — single endpoint, color-picker-local |
| 6 | `palette-browser/AdminFlaggedPanel.vue:108` | `getFlaggedPalettes, dismissFlags, deletePaletteAdmin` | LIFT into `palette/useAdminFlagged.ts` |
| 7 | `palette-browser/AdminTagsPanel.vue:83` | `getAdminTags, createTag, deleteTag` | LIFT into `palette/useAdminTags.ts` |
| 8 | `palette-browser/AdminPanel.vue:46` | (various) | LIFT (`useAdminUsers` or new) |
| 9 | `palette-browser/TagEditPopover.vue:46` | `getTags, updatePalette` | LIFT into existing `palette/useTagEdit.ts` |
| 10 | `palette-browser/VersionHistoryDrawer.vue:110` | `listVersions` | **NEW** — De §8 missed this one — LIFT into `palette/useVersionHistory.ts` |
| 11 | `palette-browser/PaletteDialog.vue:216` | `publishPalette, forkPalette, flagPalette, revertPalette, getTags` | LIFT into `usePaletteManager` actions |

**Mis-count source**: De §7.3 enumerated 10, missing `VersionHistoryDrawer.vue:110`.
Correct sub-gate B count: 11 (or 9 after keeping the 2 OK-to-keep at #2, #5).

### §3.2 — Architectural depth question — facade vs per-feature composables

`usePaletteManager` already exposes **50+ members** (`usePaletteManager.ts:17-113`).
Adding 5 new method clusters (admin-audit, admin-tags, admin-flagged,
version-history, tag-edit) would push it past 70 members. The `PaletteManager`
TypeScript interface would become unreadable.

**Recommended architecture (refines De §8 P2.3)**:

Lift the API calls into **per-feature composables colocated in `composables/palette/`**,
NOT directly into `usePaletteManager`. The composables either compose into
`usePaletteManager` (mirror of the existing `useAdminUsers` / `useColorNameQueue`
pattern) OR are provided via their own `InjectionKey<T>` (mirror of `useViewManager`).

**Concrete proposal**:

```
demo/@/composables/palette/
├── useAdminAudit.ts            # NEW — wraps getAuditLog; loadAuditLog(), auditEntries
├── useAdminFlagged.ts          # NEW — wraps getFlaggedPalettes/dismissFlags/deletePaletteAdmin
├── useAdminTags.ts             # NEW — wraps getAdminTags/createTag/deleteTag
├── useVersionHistory.ts        # NEW — wraps listVersions + revertPalette (already in usePaletteActions)
├── useTagEdit.ts               # NEW — wraps getTags + updatePalette for the popover
└── (existing: useBrowsePalettes, usePaletteActions, usePaletteExport,
              usePaletteManager, usePaletteManagerWiring, usePaletteStore,
              useSlugMigration)
```

**Then** the `PaletteManager` facade composes them as sub-objects:

```ts
interface PaletteManager {
    // ... existing ~50 members
    audit: ReturnType<typeof useAdminAudit>;
    flagged: ReturnType<typeof useAdminFlagged>;
    tags: ReturnType<typeof useAdminTags>;
    versionHistory: ReturnType<typeof useVersionHistory>;
}
```

This avoids the 50→70-member flat namespace bloat. Consumers do
`pm.audit.loadAuditLog()` instead of `pm.loadAuditLog()` — slightly more verbose
but architecturally clear.

**Verdict on Lane B**: D.W3's "lift into a `usePaletteManager` method (or a
colocated `palette/use*.ts` composable)" framing is correct but ambiguous.
Recommend the explicit choice: **always the colocated composable**; the manager
references them as sub-objects, not by flattening their methods.

### §3.3 — KEEP-vs-LIFT defensible exceptions

- **`useCustomColorNames.ts:5`** — composable, not a component. Direct API
  consumption is the composable's job. **KEEP.**
- **`ColorInput.vue:117` `proposeColorName`** — a single endpoint used in one
  control. Lifting into a composable creates 2 lines of indirection for 1 call.
  **KEEP, with a marker comment** ("dialog-internal endpoint — not in the
  palette facade").

The sub-gate B target: `grep -rln '@lib/palette/api' demo/@/components/custom/`
returns **2** (the two KEEPs), not 0.

---

## §4 — Codemod safety check — spot SFCs

### §4.1 — Fresh codemod-target count

D.W3 / De claim **38/40** SFCs need the codemod. Fresh grep:

- `grep -rln "const props = defineProps" demo/@/components/custom demo/color-picker`
  returns **32 SFCs** (the codemod-target set).
- `grep -rln "defineProps" demo/@/components/custom demo/color-picker`
  returns **64 SFCs total**.
- `grep -rln "const {.*} = defineProps"` returns **2** already destructured
  (Markdown, Katex).
- The remaining **30 SFCs** use `defineProps<...>()` without storing the
  return — template-only consumption. **Already Vue-3.5-idiomatic** — no
  codemod needed.

**Correct codemod count: 32 SFCs**, not 38. The "38/40" framing in De §6.2
appears to count something else (perhaps `defineProps` total minus a hand-picked
"OK" list); the fresh grep contradicts it. **Recommend D.W3 sub-gate C update**:
`grep -rln 'const props = defineProps<' demo/@/components/custom demo/color-picker`
≤ 2 (the truly-justified hold-outs — see §4.4 below).

### §4.2 — Spot-check 1: `GooBlob.vue` — DANGER

`GooBlob.vue:21-27`:
```ts
const props = withDefaults(
    defineProps<{ color: string; seed?: string }>(),
    { seed: "" },
);
// ...
const satelliteSystem = useBlobSatellites(cfg, props.color + props.seed);
const colorRef = toRef(props, "color");
```

**Codemod target**:
```ts
const { color, seed = "" } = defineProps<{ color: string; seed?: string }>();
// ...
const satelliteSystem = useBlobSatellites(cfg, color + seed);
const colorRef = toRef(() => color);  // Vue 3.5 getter form
```

**Risk**: `toRef(props, "color")` → `toRef(() => color)` is the Vue 3.5
idiomatic conversion (Vue 3.5+ accepts a getter). **A naive codemod that just
strips the `props.` prefix WITHOUT converting `toRef(props, "color")` would
produce `toRef(color, "color")` which is broken.** The codemod must explicitly
handle `toRef(props, ...)` and `toRefs(props)` patterns.

Also: the line `useBlobSatellites(cfg, props.color + props.seed)` passes the
**concatenation as a non-reactive snapshot**. After destructure, `color + seed`
is captured at call time once. Reactivity is preserved only if
`useBlobSatellites`'s 2nd arg is a getter or a ref. Per the existing
`watch(colorRef, ...)` below, the seed-string is consumed once at init then
on each color change via `reseed(c + props.seed)`. The codemod-correct form is
`reseed(c + seed)` — destructured `seed` reads the same closure-captured
default. **Safe**, but only because `seed` is non-reactive (default "").

**Verdict — GooBlob**: codemod-safe IF the codemod tool understands `toRef(props, key)` rewrite. Recommend manual hand-conversion for this file (and ImageEyedropper, see §4.3).

### §4.3 — Spot-check 2: `ImageEyedropper.vue` — DANGER

`ImageEyedropper.vue:92-97`:
```ts
const props = withDefaults(defineProps<{
    imageUrl: string;
    colorSpace?: DisplayColorSpace | undefined;
}>(), {
    colorSpace: "hex",
});
```
And `:336`:
```ts
watch(() => props.imageUrl, () => { loadImage(); });
```

**Codemod target**:
```ts
const { imageUrl, colorSpace = "hex" } = defineProps<{
    imageUrl: string;
    colorSpace?: DisplayColorSpace | undefined;
}>();
// ...
watch(() => imageUrl, () => { loadImage(); });
```

**Risk**: low. `watch(() => props.imageUrl, ...)` rewrites cleanly to
`watch(() => imageUrl, ...)` — Vue 3.5 reactive destructure preserves reactivity
in getter form. The destructure-default for `colorSpace` is the canonical pattern.

**BUT** — De §8 P2.2 marks ImageEyedropper for a *separate split* into
`ImageEyedropper/` sub-component dir (P2). If the split lands, the codemod
should run AFTER the split (to avoid two PRs touching the same file). Today
D.W3 silently omits the ImageEyedropper split. **Decision point for Lane A/C
ordering**: include the split in Lane A (recommended), or do codemod-first
and revisit the split later.

### §4.4 — Spot-check 3: `PaletteControlsBar.vue` — SAFE

`PaletteControlsBar.vue:88-100, 130, 136` uses `props.dialogOpen` + `props.isAdmin`
in `watch(() => props.X, ...)` form. Codemod target:
```ts
const { dialogOpen, isAdmin, /* ... */ } = defineProps<{ /* ... */ }>();
// ...
watch(() => dialogOpen, (open) => { /* ... */ });
watch(() => isAdmin, () => { /* ... */ });
```

**Risk**: low. Standard reactive destructure pattern.

### §4.5 — Codemod safety summary

| Pattern | Safe? | Sites |
|---|---|---|
| `props.X` direct read | safe — closure capture | most consumers |
| `watch(() => props.X, ...)` | safe — getter form preserved | PaletteControlsBar, ImageEyedropper, others |
| `toRef(props, "X")` → `toRef(() => X)` | safe IF codemod knows the rewrite | GooBlob (1 site) |
| `toRefs(props)` → manual destructure | safe IF rewritten | none found in grep |
| `Object.entries(props)` / `Object.keys(props)` | UNSAFE — destructure breaks Proxy reflection | none found in grep |
| `props` passed to function expecting reactive object | UNSAFE | none found in grep |

**Conclusion**: codemod is mechanically safe for ~30 of the 32 sites. The 2
risky-but-fixable sites are **GooBlob** and **ImageEyedropper** — both should
be hand-converted or assigned to a careful pass. The codemod tool must
explicitly handle `toRef(props, key)` and `toRefs(props)` patterns.

### §4.6 — Dead `provide("auroraConfig", …)` — verified

`grep -rn "auroraConfig" demo` returns three lines, all in `App.vue:211-215` — the
provider site itself. **Zero consumers.** Safe to delete. De §5.2 + §8 P2.4
verdict stands.

---

## §5 — `useViewManager` view-schema extraction — disposition

### §5.1 — Audit history

`Da-hitherto-deferrals.md §3 item 12` named this explicitly:

> `viewSchema.ts` extraction (separate `ViewId`/`PaneConfig`/`VIEW_MAP` schema
> from `useViewManager.ts` runtime state) — Source: `B/audit/B.W3-library-gap.md §3`
> (routed-from-B.W2 cleanup verdict) — OPEN — `useViewManager.ts` 238 lines
> conflates schema + state; `usePaneRouter.ts` carries its own component
> registry (a third copy); `router/index.ts` re-enumerates `ViewId` (a fourth
> copy) — CANDIDATE — clean, demo-only, one-extract architectural transposition.

`Da §4.2 Tier 2` then named it as a **D candidate** scope item.

### §5.2 — Verification — NOT in any D wave

`grep -n "viewSchema\|view-schema\|useViewManager"` across
`waves/D.W0..D.W6.md` returns **zero matches**. The extraction is not folded
into any D wave.

De §3.1 mentions `useViewManager.ts` only in the cohesion verdict ("cross-cutting
view registry — fine at root") — De does **not** mark it for extraction. **De
missed the inherited routing from Da.**

`useViewManager.ts` is 237 lines (verified `wc -l`); the `ViewId` enumeration
appears in **4 copies**:
- `useViewManager.ts:20-34` (canonical, 13 entries)
- `usePaletteDialogState.ts:5` (5-subset for the dialog — `TabValue`)
- `usePaneRouter.ts` (the component registry; B.W2 introduced)
- `router/index.ts` (vue-router routes; B.W2 introduced)

### §5.3 — Recommendation — fold into D.W3

The extraction is **demo-only**, **mechanical**, and **fixes the same drift
class** D.W3 already targets (TabValue, dialog/dock disagreement). Recommended
landing:

- **New Lane D in D.W3** (or fold into Lane A): extract
  `demo/@/composables/viewSchema.ts` with `ViewId`, `LeftPane`, `RightPane`,
  `PaneConfig`, `VIEW_MAP`. Route `useViewManager.ts`, `usePaneRouter.ts`,
  `router/index.ts` through it. Collapse the 4-copy enumeration.
- Update D.W3 sub-gate: `grep -c "type ViewId" demo` ≤ 1.

If D.W3 is already over-scoped (3 lanes + Lane A's split-pattern + ImageEyedropper +
the §3.2 sub-object refactor), the extraction can land in **D.W4** as a
preparatory step before the styling work (since `viewSchema` is consumed by
the dock styling) — but D.W3 is the more natural home (frontend cohesion wave).

**Authoritative disposition**: D folds the extraction into D.W3 (Lane A or a
new Lane D). The Da-item-12 thread closes at D.W3.

---

## §6 — Other chronically-deferred frontend items — D placement

### §6.1 — `cssColorToRgb` per-frame hot-spot

Source: `Da §3 item 13`. `useMetaballRenderer.ts:174` does a 1×1 canvas-2D
round-trip every frame for color resolution. Fix is a 5-line memoise.

**D's filing**: `Da §4.2 Tier 3` named it as a "Tier 3 — pure performance/
maintenance, optional" candidate, paired with the (glass-ui-blocked) demo-
abstraction migration. **D.W3 omits it**; D.W4 (styling) is the wrong wave;
D.W5 (Playwright) is the wrong wave; D.W6 (close) is the wrong wave.

**Recommendation**: file in D.W3 Lane C as a 1-liner. The fix is independent
of glass-ui's `useMetaballs` ship (which would replace the file entirely) —
memoising in the meantime is harmless. Sub-gate C language: "the
`cssColorToRgb` call at `useMetaballRenderer.ts:174` is memoised on input
string".

Alternative: leave it for the value.js demo-abstraction successor tranche
post-glass-ui-ship, since the whole file is slated for deletion. **Either is
defensible**; my preference is the D.W3 micro-fix (it's 5 lines and it stops
the bleed today).

### §6.2 — `--menu-min-w` exception sites — verified intact

`grep -rn "menu-min-w" demo/@/components` returns the 3 marker-commented
sites:
- `dock/DockViewSelect.vue:57` — "B.W1: kept wider than `--menu-min-w` — long
  view-option labels need the space"
- `generate/GenerateControls.vue:91` — "B.W1: kept wider than `--menu-min-w` —
  preset names + descriptions need the space"
- `generate/GenerateControls.vue:114` — "B.W1: kept wider than `--menu-min-w` —
  harmony names + descriptions need the space"

All 3 markers **survived B.W2**. No D action needed; documented design choice
per Da §3 item 14.

### §6.3 — Markdown `rounded-2xl` documented exceptions — verified intact

`grep -rn "rounded-2xl" demo/@/components/custom/markdown` returns:
- `Markdown.vue:175` — "/* rounded-2xl: documented exception (content
  element, not a surface) — W3-conventions */"
- `Markdown.vue:210` — same comment

Both markers intact. No D action.

### §6.4 — Other deferred items not folded — quick check

- **`ConfigSliderPane` → glass-ui `./configurator`** (Da §3 item 9): the only
  glass-ui-unblocked half of the demo-abstraction work. **Not folded into D.**
  Da §4.2 named it as a Tier 3 candidate; D.W3 omits. Filed for a successor
  tranche or could land in D.W4 (styling-adjacent). Recommend filing
  explicitly in `coordination/Q.md` or D.W4 Lane B; today it's silently
  deferred.
- **`useColorNameQueue` move + `useAdminOperations` barrel deletion** (De §3.2,
  §8 P2.5+P3.4): see §1 above — recommend Lane B.

---

## §7 — `demo/CLAUDE.md` wholesale reconcile — D.W3 or D.W6?

### §7.1 — Current state

The system reminder embeds `demo/CLAUDE.md`. It carries an explicit
self-aware drift marker:

> The structure tables below predate the Mar-2026 composable restructure and
> tranche B's consolidations; component/composable counts are indicative,
> not exact. A wholesale reconcile is routed to the next value.js tranche
> (which reworks the frontend component/composable surface).

That "next tranche" is D. The structure section is severely stale:

- `composables/` is listed as a flat directory; reality is subdirs `auth/`,
  `color/`, `palette/` (per De §3.1).
- `useColorNameQueue` is listed at the root; reality is `auth/useColorNameQueue.ts`
  (and De §3.2 recommends moving to `palette/` or `admin/`).
- `useAdminOperations` is listed as a single composable; reality is a 2-line
  barrel re-exporting `useAdminUsers` + `useColorNameQueue` (De §3.2 recommends
  deleting).
- Component counts pre-date Mar-2026 restructure.
- Missing entries for the colocated composables under each `custom/<dir>/`
  (color-picker has 8, palette-browser has 6, gradient has 2, mix has 1,
  markdown has 3, image-palette-extractor has 1, goo-blob has 4, dock has 3).
- Custom components tables miss many sub-components added post-Mar-2026
  (e.g. `panes/`, `dock/menus/`, `dock/layers/`).

### §7.2 — D.W3 vs D.W6 — verdict

**D.W6 owns the wholesale reconcile.** Evidence:

`waves/D.W6.md:15` Lane 3 (doc-drift) explicitly names it:

> `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md` (the D.W2 reconcile to 9
> collections), the wave specs against the shipped tree. **`demo/CLAUDE.md`'s
> wholesale reconcile (the pre-Mar-2026-restructure structure section) lands
> here.**

D.W3 should NOT touch `demo/CLAUDE.md` wholesale — the doc must reflect the
post-D shipped tree, which only exists at D.W6. D.W3 may make **minor in-place
edits** (e.g. removing references to `PaletteDialog.vue` as a single file once
the split lands, adding `useDialogModalStack.ts` to a composable table) but
the wholesale rewrite is D.W6's job.

**Authoritative disposition**: wholesale reconcile in **D.W6 Lane 3**; D.W3
makes targeted in-place fixes only for files it directly touched.

### §7.3 — D.W3 micro-touches to `demo/CLAUDE.md`

To minimize D.W6's burden, D.W3 could add the following in-place edits when
the dialog split lands:

- Replace the `PaletteDialog` row in the `palette-browser/` table with a
  pointer: "PaletteDialog | Modal palette browser. Split into colocated
  PaletteDialog/ dir at D.W3 — see `palette-browser/PaletteDialog/`."
- Add new composable entries (`useDialogModalStack`, `useDialogOverlayGuards`).
- Update the `auth/` composable list if Lane B moves `useColorNameQueue`.

But these are bookkeeping, not the wholesale reconcile. The structure-section
rewrite is D.W6.

---

## §8 — Sub-gate impact summary

If §1–§7 recommendations land, D.W3 sub-gates restate as:

**Sub-gate A** (PaletteDialog split):
- `wc -l demo/@/components/custom/palette-browser/PaletteDialog/**/*.vue` shows
  every file ≤ ~250.
- The dialog injects `PALETTE_MANAGER_KEY` and `usePaletteManager` composables
  are NOT re-wired in the dialog.
- `PaletteControlsBar.vue` renders exactly 5 triggers (the 3 admin-audit/flagged/
  tags removed); `TabValue` stays at 5.
- `CURRENT_PALETTE_ID` constant in `PaletteDialog/constants.ts`; magic string
  `"__current__"` grep returns 0 hits outside that file.

**Sub-gate B** (facade completion):
- `grep -rln '@lib/palette/api' demo/@/components/custom/` ≤ 2 (the 2 KEEPs
  at `useCustomColorNames.ts` and `ColorInput.vue`, each marker-commented).
- New composables exist: `palette/useAdminAudit.ts`, `useAdminFlagged.ts`,
  `useAdminTags.ts`, `useVersionHistory.ts`, `useTagEdit.ts`.
- `PaletteManager` exposes them as sub-objects, not flattened methods.

**Sub-gate C** (codemod):
- `grep -rln 'const props = defineProps<' demo/@/components/custom demo/color-picker`
  ≤ 2 (the truly-justified hold-outs recorded in `audit/D.W3-codemod.md`).
- 8 `ref<HTMLElement>` → `useTemplateRef`.
- `App.vue` no longer carries `provide("auroraConfig", …)`.
- `useMetaballRenderer.ts:174` `cssColorToRgb` memoised (§6.1).

**New Sub-gate D** (view-schema extraction, §5):
- `demo/@/composables/viewSchema.ts` exists with `ViewId`, `LeftPane`,
  `RightPane`, `PaneConfig`, `VIEW_MAP`.
- `grep -c "type ViewId\b" demo` ≤ 1.

---

## §9 — Summary

1. **De cross-walk coverage**: 7 findings, 6 folded into D.W3, 1 architectural
   verdict accepted. 3 De sub-findings (`ImageEyedropper` split, `useColorNameQueue`
   move + `useAdminOperations` deletion, `CURRENT_PALETTE_ID` extraction) are
   **NOT explicitly named in D.W3** — recommend explicit folding.
2. **PaletteDialog split**: 12 files in the new `PaletteDialog/` dir
   (1 shell + 7 components + 3 composables + 1 constants); no `skeletons/`.
   The TabValue "drift" is actually a PaletteControlsBar over-rendering bug.
3. **Facade completion**: 11 component-side `@lib/palette/api` imports (De
   missed `VersionHistoryDrawer.vue:110`); lift into 5 new colocated `palette/use*.ts`
   composables exposed as sub-objects on `PaletteManager`, not as 50+ flat
   methods.
4. **Codemod safety**: 32 SFCs (not 38); 2 hand-conversion sites (GooBlob,
   ImageEyedropper) due to `toRef(props, ...)` rewrites; the codemod tool must
   handle `toRef(props, key)` → `toRef(() => key)`.
5. **View-schema extraction**: NOT in D.W3 today; routed from Da; **fold into
   D.W3 as a new Lane D** or extend Lane A.
6. **Chronically-deferred frontend items**: `cssColorToRgb` memoise → D.W3
   Lane C micro-fix; `--menu-min-w` markers and Markdown `rounded-2xl` markers
   intact; `ConfigSliderPane → ./configurator` still un-folded.
7. **demo/CLAUDE.md wholesale reconcile**: D.W6 Lane 3 (doc-drift).
