SERVED MODEL: claude-opus-5-5[1m]

# X-W7 — Mutation-ownership table (G13 · fold S-13 · DAG §2.3 rows 1/2/3/6)

**Seat**: X.W7.d, 2026-09-23 (sitting of record 2026-09-17). **Authority**: `W7.md` §5.d, §6 G13, §8; `X-W7-FOLD.md`
§Rows X.W7.d, §Gates S-13 (a 3 s unannounced flourish is not a visible result; the table carries `report`).

## The law this table measures

- **One call site.** Each mutation reaches its transport function from exactly ONE composable function. A second
  caller routes through the first, never beside it.
- **One visible result.** The act's verdict is observable where the act was taken, in the same interaction: a
  changed row, a removed row, or an announced verdict (`ActionFeedback` inside an always-mounted `aria-live`
  region, or the card's `role="status"` feedback rail). Errors do not auto-dismiss.

## Instruments (settled bytes)

- Call-site census ⟨cmd⟩ `for f in <transport fn>; do grep -rln "\b$f(" demo --include='*.ts' --include='*.vue' | grep -v palettes/api/; done`
  — measured at open (HEAD `23e7fcb0`): `deletePaletteAdmin` → **2** files (`useAdminUsers.ts`, `useAdminFlagged.ts`);
  `createAndSavePalette` → **2** (`usePaletteActions.ts`, `useSlugMigration.ts`). After `f5b13794`: **1** each.
- Unit rows: `demo/test/palettes/admin-crud.test.ts` (real `providePalettePorts` under the real `AdminPane`, `fetch`
  stubbed at the platform boundary).
- Browser rows: `e2e/smoke/oracles/w7-mutation-visibility.spec.ts` (`smoke` project, dev server, API routed).

## Rows

**State** — `GREEN` (one call site measured AND a browser row asserts the visible result) · `OWED-ORACLE` (one call
site measured and the verdict wired; no browser row asserts it yet — named, with the reason) · `ROUTED` (the owning
composable or rendering surface is outside X.W7.d's writable set; named with its owner, never absorbed).

| # | mutation | entity | the one call site | visible result | evidence | state |
|---|---|---|---|---|---|---|
| 1 | rename | local palette | `usePaletteActions.onRenameSaved` (store `updatePalette`) | the card's specimen name is the new name | oracle `library rows › rename` | GREEN |
| 2 | rename | remote palette | `useBrowsePalettes.onRename` → `renamePalette` | card feedback (swallowed on failure — row 16 of `W7-failure-dispositions.md`) | `flows/palette-edit.spec.ts` (request only) | ROUTED — `useBrowsePalettes.ts` is held by no W7 unit |
| 3 | tag | remote palette | `useTagEdit.saveTags` → `updatePalette({tags})`, pre-flight `preflightTags` (≤ 10, vocabulary) | `useTagEdit.error` carries the refusal / failure in words | unit: pre-flight in `api/preflight.ts` | ROUTED (render) — `TagEditPopover.vue` (X.W7.a's) must render `tagEdit.error`; the verdict is produced, not yet painted |
| 4 | version (revert) | remote palette | `useVersionHistory.revert` → `revertPalette` | the card reads "Reverted" / "Revert failed: …"; the row is replaced by the server's palette | BrowsePane `onRevert` | OWED-ORACLE — the revert is driven from `VersionHistoryDrawer.vue` (X-W4's file, read-only here) |
| 5 | publish | local palette | `usePaletteActions.onPublish` → `createAndSavePalette` (the slug migration's publish-all is injected with it, `f5b13794`) | the card's feedback rail: "Published!" / the pre-flight refusal / "Failed to publish: …" | oracle `library rows › publish at N = 51` (zero requests) | GREEN |
| 6 | publish / unpublish (visibility) | owned remote palette | `useBrowsePalettes.onSetVisibility` → `publishPalette` / `unpublishPalette` | card feedback, success or error | BrowsePane `onSetVisibility` | ROUTED — `useBrowsePalettes.ts` |
| 7 | fork (remix) | remote palette | `useVersionHistory.fork` via `useDialogBrowseActions.onFork` | failure → card feedback (`onForkError`); success → the forked palette in the library | — | ROUTED — `useDialogBrowseActions.ts` (row 47) |
| 8 | vote | remote palette | `useBrowsePalettes.onVote` → `votePalette` | the vote count / toggle (failure swallowed — row 14) | `flows/vote-toggle.spec.ts` | ROUTED — `useBrowsePalettes.ts` |
| 9 | feature / unfeature | remote palette (admin) | `useAdminUsers.onFeaturePalette` → `setPaletteFeatured` | users scene: announced verdict; browse wall: card feedback; the `Featured` badge follows the server's tier | unit `G13 › row 1` (failure announced); oracle `admin rows › feature` | GREEN |
| 10 | delete | local palette | `usePaletteActions.onDelete` (store `deletePalette`) | the card leaves the library | oracle `library rows › delete` | GREEN |
| 11 | delete | owned remote palette | `useBrowsePalettes.onDeleteOwned` → `deletePaletteUser` | card feedback on failure; the card leaves on success | — | ROUTED — `useBrowsePalettes.ts` |
| 12 | delete (admin) | any palette | `useAdminUsers.adminDeletePalette` → `deletePaletteAdmin` — the ONE site for the browse wall, the expanded user row and the flag queue (`f5b13794`) | the row leaves every list that shows it; each scene announces its own verdict | oracle `admin rows › admin delete` | GREEN |
| 13 | delete-all | a user's palettes (admin) | `useAdminUsers.onDeleteUserPalettes` → `deleteUserPalettes` | confirmed, then announced ("Deleted N palettes of …"); the disclosure closes; the count reads 0 | oracle `admin rows › delete-all` | GREEN |
| 14 | delete-all | the local library | `usePaletteActions.onDeleteAllSaved` | confirmed; the grid becomes the true-empty plate | `PalettesPane.vue` confirm dialog | OWED-ORACLE — the destructive-seat network oracle is X.W7.e's (G14 · N-6) |
| 15 | delete user | admin | `useAdminUsers.onDeleteUser` → `deleteUser` | confirmed, then announced; the row leaves; the roster total decrements | `admin/flows/user-status.spec.ts` (request only) | OWED-ORACLE — the destructive-seat oracle is X.W7.e's (G14 · N-6) |
| 16 | prune empty users | admin | `useAdminUsers.onPruneEmpty` → `pruneEmptyUsers` | the confirm states the server-global scope and the UNFILTERED count (N-3); announced "Pruned N …" / "Prune failed: …" (never the success register on failure — W7.86); the roster is re-read | unit `N-3`; oracle `admin rows › prune` | GREEN |
| 17 | report (flag) | remote palette | `useAdminFlagged.report` → `flagPalette` | card: "Reported — thank you." or "Report failed: …" — the dialog no longer closes as a success on failure (W7.22) | oracle `user rows › report` ×2 | GREEN |
| 18 | dismiss reports | flag queue (admin) | `useAdminFlagged.dismiss` → `dismissFlags` | the row leaves; announced | oracle `admin rows › flag dismiss` | GREEN |
| 19 | approve / reject / delete name | colour-name queue (admin) | `useColorNameQueue.onApproveColor` / `onRejectColor` / `onDeleteColor` (one write per item in flight) | announced; the row moves or leaves | oracle `admin rows › name approve` | GREEN |
| 20 | create / delete tag | tag taxonomy (admin) | `useAdminTags.createTag` / `deleteTag`; the palette editor's catalog re-reads in the same act (W7.79) | announced; the chip appears / leaves; the contract problem is shown before any request (W7.80) | oracle `admin rows › tag delete` | GREEN |

## Tally (read from the rows above by command, double-run)

⟨cmd⟩ `grep -E "^\| [0-9]+ \|" W7-mutation-ownership.md | grep -c <state>` → **20 rows**: GREEN **11** · OWED-ORACLE **3** ·
ROUTED **6** (11 + 3 + 6 = 20). One call site per mutation holds on **all 20** (the two measured doubles are cured at
`f5b13794`).

## The DAG §2.3 rows G13 names

| DAG row | defect | disposition |
|---|---|---|
| 1 | Admin feature broken and silent; the mutation error absent | **CURED** — `onFeaturePalette` settles an announced verdict; unit `G13 › row 1` asserts a 404 is announced ("Could not feature the palette: Palette not found"); oracle `admin rows › feature` asserts success |
| 2 | soft-deleted palettes inflate user counts (`deletedAt` disagreement) | **ESCALATED — server-side.** The roster count is computed by `api/src/modules/session/repository/user.ts`'s `$lookup` + `$size` with no `deletedAt` predicate, while the collection read excludes soft-deleted rows. The cure is one `$match`/`pipeline` stage in `api/**`, which X.W7.d may not write (§4 Do-NOT-touch). No client arithmetic is substituted for it (that would be a masking fallback). |
| 3 | expanded user palettes go stale until collapse/re-expand | **CURED** — the expanded list is domain state in `useAdminUsers`; `loadAdminUsers` re-reads the open disclosure; unit `G13 › row 3` asserts a palette deleted elsewhere leaves on Refresh |
| 6 | Admin cards inherit Save/Remix/Export/Report | **CURED** — the admin user row renders the props-only `PaletteSpecimen` with the Admin scene's own seat (Feature, Delete); unit `G13 › row 6` asserts exactly those two controls |

## What this table does not claim

- The selected-entity **inspector** of `W7.md` §5.d is not built: the action seat for the browse wall and the local
  library is still `PaletteCard.vue`'s menu (see the record's ESC-W7d-INSPECTOR). The ownership law above holds
  regardless of which surface hosts the controls — it is measured at the composables.
- Table rows 2, 3, 6, 7, 8, 11 are owned by files no W7 unit holds (`useBrowsePalettes.ts`, `useDialogBrowseActions.ts`) or
  by X.W7.a's `TagEditPopover.vue`; their verdict paths are named, not absorbed.

## Addendum 2026-09-23 — X-W7 Repair 1 (Check 1 D-3): the three OWED-ORACLE rows

The rows above stand as written (E-3). Each OWED-ORACLE row now has its browser assertion in
`e2e/smoke/oracles/w7-mutation-visibility.spec.ts` (commit `afa3a556`):

| # | oracle | what it asserts | state now |
|---|---|---|---|
| 4 | `G13 · user rows (Repair 1) › row 4 · version revert` | the drawer (X-W4's file, driven, not written) shows the server's palette as subject and `v1 (current)`; on dismiss the card announces "Reverted" and reads the reverted name; exactly one `POST /revert {"hash":"h1"}` | GREEN |
| 14 | `G13 · library rows (Repair 1) › row 14 · delete-all` | nothing is destroyed before the confirm is accepted; after it, the card is gone and the true-empty plate reads "No saved palettes yet." | GREEN |
| 15 | `G13 · admin rows (Repair 1) › row 15 · delete user` | confirmed; "Deleted user azure-fox-01" is announced; the row's delete control leaves the roster | GREEN |

Row 4 went RED on its first run: the drawer showed "0 versions". `VersionHistoryDrawer` loads when `open`
changes, and `BrowsePane` mounted it with `open` already true, so it never saw a change (W7.78's
release-on-close made every open a fresh mount). The fix went into `BrowsePane.vue` (§4) at `b6d3d7af`:
mount the drawer, wait `nextTick`, then open it. Its watch not being `immediate` stays in the drawer, which
is X-W4's file and is left for X-W4 to rule on.

**Tally after this addendum** (these three rows re-read over the table above): GREEN **14** · OWED-ORACLE
**0** · ROUTED **6** (14 + 0 + 6 = 20).
