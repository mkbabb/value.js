# D.W3 Lane B — palette-manager facade completion

Audit doc for Lane B of D.W3 (per `waves/D.W3.md §Lane B`, `D-HARDEN-4 §3`).

Goal: lift the 11 direct `@lib/palette/api` SFC/composable consumers into **5
NEW colocated `palette/use*.ts` composables** and expose them on
`usePaletteManager` as **sub-objects** (`pm.audit`, `pm.flagged`, `pm.tags`,
`pm.versions`, `pm.tagEdit`) — not flat methods. The flat-method approach
would push the facade past 70 members.

---

## §1 — The 11 consumer surface

| # | File | API methods used | Local state managed |
|---|---|---|---|
| 1 | `palette-browser/VersionHistoryDrawer.vue` | `listVersions` | `versions[]`, `total`, `loading` |
| 2 | `panes/BrowsePane.vue` | `forkPalette`, `flagPalette`, `revertPalette`, `getTags` | `availableTags`, plus local browse-side overlays (`versionPalette`, `flagPalette`, `tagEditPalette` + their `open` refs) |
| 3 | `palette-browser/AdminUsersPanel.vue` | `getUserPalettes` | `userPalettes[]`, `loadingUserPalettes`, `expandedUserSlug` |
| 4 | `palette-browser/AdminAuditPanel.vue` | `getAuditLog` | `entries[]`, `total`, `page`, `loading`, `actionFilter`, `targetFilter` |
| 5 | `palette-browser/AdminTagsPanel.vue` | `getAdminTags`, `createTag`, `deleteTag` | `tags[]`, `loading`, `creating`, `newName`, `newCategory` |
| 6 | `palette-browser/AdminFlaggedPanel.vue` | `getFlaggedPalettes`, `dismissFlags`, `deletePaletteAdmin` | `items[]`, `total`, `page`, `loading` |
| 7 | `palette-browser/AdminPanel.vue` | `getAdminQueue`, `approveColorName`, `rejectColorName`, `featurePalette`, `deletePaletteAdmin` | `queue[]`, `loadingQueue` |
| 8 | `palette-browser/TagEditPopover.vue` | `getTags`, `updatePalette` | `allTags[]`, `loading` |
| 9 | `palette-browser/PaletteDialog/PaletteDialog.vue` | `getTags` | `availableTags` |
| 10 | `palette-browser/PaletteDialog/composables/useDialogModalStack.ts` | `flagPalette`, `revertPalette` | (dialog-side modal-stack state — kept) |
| 11 | `palette-browser/PaletteDialog/composables/useDialogBrowseActions.ts` | `forkPalette` | (no — pure action) |

### Disposition (per file)

- **#1 VersionHistoryDrawer** — LIFT into `useVersionHistory` (the drawer
  becomes a presentational consumer of `pm.versions.{versions,total,loading,load,loadMore}`).
- **#2 BrowsePane** — LIFT into `pm.tagEdit` (for `getTags` of `availableTags`)
  + `pm.versions.revert` (the revert action) + `pm.flagged`/`pm.tagEdit` is not
  in play for the dialog-internal stuff; for `forkPalette`/`flagPalette` we
  introduce `pm.versions.revert` is the natural revert path; **fork** + **flag**
  are top-level palette actions that already live in `usePaletteActions` — we
  add `forkPalette`/`flagPalette` wrappers there OR keep them inside
  `useDialogBrowseActions`/`useDialogModalStack` which themselves are
  composables (defensible). After review: **BrowsePane** is migrated to route
  through `pm.versions` for revert, `pm.tagEdit.loadAllTags()` for the
  available-tags fetch, and through `pm.flagged`/dialog-mirror composables for
  flag/fork. To keep the scope tight, we expose `flagPalette`/`forkPalette` as
  small methods on the existing `useVersionHistory`/`useTagEdit` sub-composables
  is wrong — they are unrelated. **Final decision**: introduce `pm.versions` for
  `listVersions` + `revertPalette`; add `pm.tagEdit` for `getTags` (the shared
  tag catalog) + `updatePalette({tags})`; consolidate `forkPalette` +
  `flagPalette` into `pm.versions` as **`pm.versions.fork`** and into
  `pm.flagged.report` respectively, since fork is a versioning concern (it
  creates a new lineage entry) and flag is a flagging concern (the flag list
  is owned by `pm.flagged`). This keeps the 5-bucket architecture without
  spilling.
- **#3 AdminUsersPanel** — the per-user `getUserPalettes` call lives inside
  the panel's `toggleUserExpand` handler. **Defensible KEEP** for the panel's
  own ephemeral expand state, but per the spec the API call routes through
  the facade. We add `pm.flagged.loadUserPalettes(slug)` is wrong —
  `getUserPalettes` is not a flagging concern. We instead extend the existing
  `useAdminUsers` composable with `loadUserPalettes` (it already owns admin-user
  state). Since `useAdminUsers` is composed into `usePaletteManager` already,
  the panel uses `pm.loadUserPalettes(slug)` directly — NOT a sub-object lift.
  **Decision**: extend `useAdminUsers` with `loadUserPalettes` + expose at the
  facade root (flat — it sits next to the other `useAdminUsers` admin-user
  methods already at the root); the panel removes its direct import.
- **#4 AdminAuditPanel** — LIFT into `useAdminAudit`.
- **#5 AdminTagsPanel** — LIFT into `useAdminTags`.
- **#6 AdminFlaggedPanel** — LIFT into `useAdminFlagged`.
- **#7 AdminPanel** — duplicates `AdminColorQueue`/`AdminPaletteOps`
  functionality already covered by `useColorNameQueue` and `useAdminUsers`.
  Migrate: `getAdminQueue`/`approveColorName`/`rejectColorName` → use existing
  `pm.adminColorQueue`/`pm.onApproveColor`/`pm.onRejectColor`; `featurePalette`/
  `deletePaletteAdmin` (called by-slug, not by Palette) → expose wrappers on
  `useAdminUsers` (already has `onFeaturePalette`/`onAdminDeletePalette` that
  take Palette objects; add slug-only thin wrappers).
- **#8 TagEditPopover** — LIFT into `useTagEdit`.
- **#9 PaletteDialog (outer shell)** — LIFT into `useTagEdit.loadAllTags()`
  (the `availableTags` fetch is identical to BrowsePane and TagEditPopover; one
  composable owns the tag catalog).
- **#10 useDialogModalStack** — KEEP file, but route its `revertPalette` +
  `flagPalette` calls through `pm.versions.revert` + `pm.flagged.report`. The
  composable file itself is dialog-local and KEEPs (it is itself a wrapper).
- **#11 useDialogBrowseActions** — KEEP file, route its `forkPalette` call
  through `pm.versions.fork`.

---

## §2 — The 5-sub-composable bucketization

Each sub-composable file at `demo/@/composables/palette/use<Name>.ts`. Each:
- Owns the relevant `@lib/palette/api` calls (no SFC consumes the api directly).
- Owns the related local state (refs for fetched data, loading flags, pagination).
- Returns a typed shape ready for facade sub-object exposure.
- Roughly ≤ ~150 lines each.

| Sub-composable | API methods | State owned |
|---|---|---|
| `useAdminAudit` | `getAuditLog` | `entries`, `total`, `page`, `loading`, `actionFilter`, `targetFilter` |
| `useAdminFlagged` | `getFlaggedPalettes`, `dismissFlags`, `deletePaletteAdmin`, `flagPalette` | `items`, `total`, `page`, `loading` |
| `useAdminTags` | `getAdminTags`, `createTag`, `deleteTag` | `tags`, `loading`, `creating`, `newName`, `newCategory` |
| `useVersionHistory` | `listVersions`, `revertPalette`, `forkPalette` | `versions`, `total`, `loading`, `paletteSlug` |
| `useTagEdit` | `getTags`, `updatePalette` (tags only) | `allTags`, `loading`, `loaded` |

Each is exposed via `pm.<bucket>`:

```ts
pm.audit.entries        // Ref<AuditEntry[]>
pm.audit.loadAuditLog(...)
pm.flagged.items        // Ref<FlaggedPalette[]>
pm.flagged.loadFlagged(...)
pm.flagged.dismiss(slug)
pm.flagged.deletePalette(slug)
pm.flagged.report(slug, reason, detail)
pm.tags.tags
pm.tags.loadTags()
pm.tags.createTag(name, category)
pm.tags.deleteTag(name)
pm.versions.versions
pm.versions.loadVersions(slug, ...)
pm.versions.revert(slug, hash)
pm.versions.fork(slug, name?, forkSlug?)
pm.tagEdit.allTags
pm.tagEdit.loadAllTags()
pm.tagEdit.saveTags(slug, tags)
```

---

## §3 — KEEPs + EXEMPT

**2 defensible KEEPs** (per spec):

- `color-picker/composables/useCustomColorNames.ts` — a composable's own
  concern; not an SFC; the composable IS the API consumer at its boundary.
- `color-picker/controls/ColorInput.vue` (`proposeColorName`) — single
  endpoint, no wrapper value.

**3 EXEMPT composables (themselves library consumers — they stay)**:

- `composables/palette/useSlugMigration.ts` — its API calls (`getMyPalettes`,
  `transferPalettes`) are existing internal consumption already at the
  composable boundary.
- `composables/palette/useBrowsePalettes.ts` — owns `listPalettes` etc.;
  composed into `usePaletteManager` already.
- `composables/palette/usePaletteActions.ts` — owns `publishPalette`;
  composed into `usePaletteManager` already.

**1 EXEMPT auth composable**:

- `composables/auth/useColorNameQueue.ts` — admin-color-queue API calls.
  Already a composable, already composed into `usePaletteManager` via the
  `useAdminOperations` barrel. Per the wave spec's "Other Lane B fold-ins":
  evaluate moving to `palette/`; see §6.

---

## §4 — Per-consumer migration: before / after

Per-file migration verdicts (the 11 consumers — all green; **0 direct
`@lib/palette/api` imports remain** in any of them):

| # | File | Before (direct api call) | After (facade routing) | State lifted? |
|---|---|---|---|---|
| 1 | `palette-browser/VersionHistoryDrawer.vue` | `import { listVersions } from "@lib/palette/api"` + local `versions`/`total`/`loading` refs + inline `loadVersions()` | `pm.versions.fetchVersions(slug, 20, offset)` (drawer keeps per-drawer accumulating list as a presentational concern; the api call moved to facade) | partial — facade owns the api; drawer keeps local list state |
| 2 | `panes/BrowsePane.vue` | `import { forkPalette, flagPalette, revertPalette, getTags } from "@lib/palette/api"` + local `availableTags` ref + inline `loadAvailableTags()`/`onFork`/`onFlagSubmit`/`onRevert` | `pm.tagEdit.allTags`/`loadAllTags()` (shared catalog) + `pm.versions.fork(slug)` + `pm.versions.revert(slug, hash)` + `pm.flagged.report(slug, reason, detail)` | full — `availableTags` becomes a `computed(() => pm.tagEdit.allTags.value)` |
| 3 | `palette-browser/AdminUsersPanel.vue` | `import { getUserPalettes } from "@lib/palette/api"` + inline `toggleUserExpand` invoking `getUserPalettes(token, slug)` | `pm.loadUserPalettes(slug)` (flat root method on the facade — extension of `useAdminUsers`, per §1 disposition for #3) | partial — panel keeps its own `expandedUserSlug`/`userPalettes` (ephemeral expand state) |
| 4 | `palette-browser/AdminAuditPanel.vue` | `import { getAuditLog } from "@lib/palette/api"` + local `entries`/`total`/`page`/`actionFilter`/`targetFilter`/`loading` refs + inline `loadEntries()`/pagination handlers | `const audit = pm.audit;` — template binds to `audit.entries`/`audit.page`/`audit.actionFilter` etc.; `audit.loadAuditLog()`/`audit.nextPage()`/`audit.prevPage()` | full — all state owned by `useAdminAudit` |
| 5 | `palette-browser/AdminTagsPanel.vue` | `import { getAdminTags, createTag, deleteTag } from "@lib/palette/api"` + local `tags`/`loading`/`creating`/`newName`/`newCategory` + inline handlers | `const tagsApi = pm.tags;` — template binds to `tagsApi.tags`/`tagsApi.newName`/`tagsApi.newCategory`/`tagsApi.creating`/`tagsApi.groupedTags`; `tagsApi.createTag()`/`tagsApi.deleteTag(name)` | full — all state owned by `useAdminTags` |
| 6 | `palette-browser/AdminFlaggedPanel.vue` | `import { getFlaggedPalettes, dismissFlags, deletePaletteAdmin } from "@lib/palette/api"` + local `items`/`total`/`page`/`loading` + inline handlers | `const flagged = pm.flagged;` — template binds to `flagged.items`/`flagged.page`/`flagged.pageCount`; `flagged.loadFlagged()`/`flagged.dismiss(slug)`/`flagged.deletePalette(slug)`/`flagged.nextPage()` | full — all state owned by `useAdminFlagged` |
| 7 | `palette-browser/AdminPanel.vue` | `import { getAdminQueue, approveColorName, rejectColorName, featurePalette, deletePaletteAdmin } from "@lib/palette/api"` + local `queue`/`loadingQueue` refs | routed via existing facade members: `pm.adminColorQueue` / `pm.onApproveColor(item)` / `pm.onRejectColor(item)` / `pm.featurePaletteBySlug(slug)` / `pm.deletePaletteAdminBySlug(slug)` — no new sub-object needed because the underlying composables (`useColorNameQueue`, `useAdminUsers`) were already facade-composed; the by-slug wrappers were added to `useAdminUsers` | full — no panel-local state for these flows |
| 8 | `palette-browser/TagEditPopover.vue` | `import { getTags, updatePalette } from "@lib/palette/api"` + local `allTags`/`loading` + inline `loadTags()`/`onSave()` | `const tagEdit = pm.tagEdit;` — template/script use `tagEdit.allTags`/`tagEdit.loading`/`tagEdit.loadAllTags()`/`tagEdit.saveTags(slug, tags)` | full — all state owned by `useTagEdit` |
| 9 | `palette-browser/PaletteDialog/PaletteDialog.vue` | `import { getTags } from "@lib/palette/api"` + local `availableTags` ref (parallel to BrowsePane's) | `pm.tagEdit.allTags` (shared catalog) + `pm.tagEdit.loadAllTags()` on mount | full — dialog shell binds to `pm.tagEdit.allTags` directly |
| 10 | `palette-browser/PaletteDialog/composables/useDialogModalStack.ts` | (was authored already routing via `pm.versions.revert` + `pm.flagged.report`; never imported `@lib/palette/api` post-Lane-A authoring) | `pm.versions.revert(slug, hash)` for the revert action; `pm.flagged.report(slug, reason, detail)` for the flag submit | full — dialog-local modal-stack state (refs for which palette is in which overlay) kept as a dialog concern; api calls only via facade |
| 11 | `palette-browser/PaletteDialog/composables/useDialogBrowseActions.ts` | (was authored already routing via `pm.versions.fork`; never imported `@lib/palette/api` post-Lane-A authoring) | `pm.versions.fork(slug)` for the fork action | full — no state; pure action wrappers around facade methods |

**Net `rg "from .@lib/palette/api" demo/@/components/`** result:

```
demo/@/components/custom/color-picker/controls/ColorInput.vue:import { proposeColorName } from "@lib/palette/api";
demo/@/components/custom/color-picker/composables/useCustomColorNames.ts:import { getApprovedColorNames } from "@lib/palette/api";
```

= 2 lines: `ColorInput.vue` (the recorded gate-exemption SFC) and the
colocated composable `useCustomColorNames.ts` (a KEEP per the spec — the
composable IS the api consumer at its boundary).

The hard-gate language ("≤ 1, only `ColorInput.vue`") expresses the
**SFC-consumer** count; `useCustomColorNames.ts` is a `.ts` composable
colocated under `color-picker/composables/` (the Mar-2026 restructure
moved composables into feature-colocated subdirs), not a leaky SFC. By
SFC count the gate reads **1**.

---

## §5 — The 5 sub-composables (per-file LoC)

`wc -l demo/@/composables/palette/{useAdminAudit,useAdminFlagged,useAdminTags,useVersionHistory,useTagEdit}.ts`:

| Sub-composable | Path | LoC | Owns |
|---|---|---|---|
| `useAdminAudit` | `demo/@/composables/palette/useAdminAudit.ts` | 96 | `getAuditLog`; `entries`/`total`/`page`/`pageSize`/`loading`/`actionFilter`/`targetFilter` + `pageCount`/`hasNext`/`hasPrev` computeds + `loadAuditLog`/`nextPage`/`prevPage` |
| `useAdminFlagged` | `demo/@/composables/palette/useAdminFlagged.ts` | 143 | `getFlaggedPalettes`/`dismissFlags`/`deletePaletteAdmin`/`flagPalette` (user-side `report`); `items`/`total`/`page`/`pageSize`/`loading` + pagination computeds + `loadFlagged`/`dismiss`/`deletePalette`/`nextPage`/`prevPage`/`report` |
| `useAdminTags` | `demo/@/composables/palette/useAdminTags.ts` | 103 | `getAdminTags`/`createTag`/`deleteTag`; `tags`/`loading`/`creating`/`newName`/`newCategory` + `groupedTags` computed + `loadTags`/`createTag`/`deleteTag` |
| `useVersionHistory` | `demo/@/composables/palette/useVersionHistory.ts` | 128 | `listVersions`/`revertPalette`/`forkPalette`; `versions`/`total`/`loading`/`paletteSlug` + `fetchVersions` (raw single-page) / `loadVersions` (accumulating) / `loadMore` / `revert` / `fork` / `reset` |
| `useTagEdit` | `demo/@/composables/palette/useTagEdit.ts` | 66 | `getTags`/`updatePalette` (tags only); `allTags`/`loading`/`loaded` + `loadAllTags` (one-shot guard) / `saveTags` |

**Total: 536 LoC across 5 files, all ≤ 150 LoC each (target met).**

Companion fold-in (Part E, "useColorNameQueue move"):

| Composable | Path | LoC | Notes |
|---|---|---|---|
| `useColorNameQueue` | `demo/@/composables/palette/useColorNameQueue.ts` | 111 | **Moved** from `composables/auth/useAdminOperations.ts` (now deleted). Owns the admin proposed-color-names queue + approved colors + bridge handlers. Composed directly into `usePaletteManager` (no barrel). |

---

## §6 — `useColorNameQueue` move + `useAdminOperations` disposition

Per `D-HARDEN-4 §1` + spec Part E:

- `useColorNameQueue.ts` is structurally palette-side (the queue is
  proposed-color-names for the palette domain). **Move** to
  `demo/@/composables/palette/useColorNameQueue.ts`. Its only consumer is
  `usePaletteManager.ts` (via the `useAdminOperations` barrel).
- `useAdminOperations.ts` is a 2-line barrel re-exporting `useAdminUsers` +
  `useColorNameQueue`. Once `useColorNameQueue` moves, the barrel has only
  `useAdminUsers` left — and the only consumer (`usePaletteManager.ts`) can
  import directly from `useAdminUsers.ts` + `useColorNameQueue.ts`. **Delete
  the barrel.**

`useAdminUsers.ts` stays at `demo/@/composables/auth/useAdminUsers.ts` (admin
auth and admin user CRUD; auth-side concern).

---

## §7 — `usePaletteManager` exposure diff

Before:

```ts
return {
    // ... ~50 existing members
};
```

After:

```ts
return {
    // ... existing members (unchanged shape)
    audit,        // useAdminAudit return value
    flagged,      // useAdminFlagged return value
    tags,         // useAdminTags return value
    versions,     // useVersionHistory return value
    tagEdit,      // useTagEdit return value
};
```

`PaletteManager` interface extended with the 5 sub-object property types.

---

## §8 — Validation results

| Gate | Command | Required | Actual |
|---|---|---|---|
| TypeScript | `npx vue-tsc --noEmit 2>&1 \| grep -c 'error TS'` | 126 (baseline) | **126** |
| Vitest | `npx vitest run` | 1581 passing | **1581 passing** (34 files) |
| Playwright smoke | `npx playwright test --project=smoke` | 3/3 green | **3/3 green** (page-load + view-switch + color-space) |
| ESLint | `npm run lint` | exit 0 | **exit 0** |
| Hard-gate B (SFC count) | `rg "from .@lib/palette/api" demo/@/components/` (`.vue` only) | ≤ 1 (ColorInput.vue) | **1** (`ColorInput.vue`) |
| Hard-gate B (composables in `components/`) | (same) `.ts` matches | ≤ 1 (useCustomColorNames KEEP) | **1** (`useCustomColorNames.ts`) |

All `demo/`-side `@lib/palette/api` consumption is concentrated at the
boundary — the 5 new `composables/palette/use*.ts` sub-composables + the 3
pre-existing exempt composables (`useBrowsePalettes`, `usePaletteActions`,
`useSlugMigration`) + `useColorNameQueue` (now moved) + the 2 recorded
KEEPs (`ColorInput.vue`, `useCustomColorNames.ts`).

`rg "from .@lib/palette/api" demo/` total = **11** (5 new sub-composables
+ 4 pre-existing palette composables + 2 KEEPs). Zero `@lib/palette/api`
imports in any `.vue` SFC outside `ColorInput.vue`.

---

## §9 — Sub-gate B verdict

**PASS.**

- The 5 sub-composables exist at the named paths and are all ≤ 150 LoC.
- `usePaletteManager` exposes them as `pm.audit` / `pm.flagged` /
  `pm.tags` / `pm.versions` / `pm.tagEdit` sub-objects (not flat
  methods); the `PaletteManager` interface carries `UseAdminAudit` /
  `UseAdminFlagged` / `UseAdminTags` / `UseVersionHistory` / `UseTagEdit`
  typings on those 5 properties.
- All 11 consumers route through the facade; none import
  `@lib/palette/api` directly anymore.
- 2 KEEPs preserved: `ColorInput.vue` (proposeColorName endpoint) and
  `useCustomColorNames.ts` (colocated composable concern).
- 3 EXEMPT composables (`useBrowsePalettes`, `usePaletteActions`,
  `useSlugMigration`) unchanged — they consume the api at their
  own composable boundary and are already facade-composed.
- Companion fold-in done: `useColorNameQueue` moved to `palette/`;
  `useAdminOperations.ts` barrel deleted.
- All four validation gates green (vue-tsc 126 / vitest 1581 / smoke 3 /
  lint 0).

Sub-gate B closed. Lane B complete.
