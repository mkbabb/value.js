SERVED MODEL: claude-opus-5-5[1m]

# X-W7 — the §4 File Bounds addendum, landed beside (E-3), 2026-09-23

Authority: `docs/tranches/X/COHESION.md` §0k.3 (**S-5**, **S-6**, **S-7**), ruled 2026-09-17, and
`docs/tranches/X/REFINEMENT-FOLD-2026-08-28.md` §READINESS R.1 packets 4 · 6 · 10 · 14 (the amendment
`EXECUTION-RUNBOOK.md` §1.1 reads the waves through), which HOME `X-W7-FOLD.md` §BoundsDelta B-1..B-6 at
X-W7. Writer: `X.W7.d` (S-5's *"landed as the wave's first docs act"* — the first commit of unit d).
`W7.md` (dated 2026-08-03) is IMMUTABLE and is not edited: this file stands **beside** its §4, and the
reading rule is `W7.md` §4 first, this file second. Nothing here widens a bound the sitting did not rule.

## §1 — S-5: `PaletteCard.vue` gains the `delete` verb

| path | `W7.md` §4 verb | verb after this addendum | ruled at | the one act it licenses |
|---|---|---|---|---|
| `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` | `modify-carve` | `modify-carve` **· `delete`** | §0k.3 S-5 | X.W7.d deletes the file **once every importing consumer has moved** to the selected-entity inspector, whose result surface is `ActionFeedback.vue` (already in tree) — within this wave. A carved corpse behind a moved consumer set is the compat shim the no-backwards-compat law forbids. |

**Consumer census at the bytes (dated correction beside S-5's prose, never silent).** S-5 reads *"its
three importing consumers"*. Measured at HEAD `23e7fcb0`:

⟨cmd⟩ `grep -rnE "<PaletteCard[ >]|<PaletteCard$" demo | grep -v '^demo/test'` →
`demo/workbenches/extract/ExtractWorkbench.vue:145` · `demo/palettes/BrowsePane.vue:92` ·
`demo/palettes/PalettesPane.vue:92` · `demo/palettes/browser/admin/AdminUsersPanel.vue:140` — **four**,
re-exported once at `demo/palettes/browser/card/index.ts:4`. The delete precondition is therefore
**four** consumers moved, not three; the ruling's verb is unchanged.

## §2 — S-6: the AdminGate seam

X-W3 first (CLOSED 2026-09-17); X-W7 inherits the seam. No X-W7 gate is reported GREEN over X-W3's
edit, and neither wave reports the identity closed alone. No path is added by this row.

## §3 — S-7: the one `ErrorBoundary.vue` path

`demo/color-picker/ErrorBoundary.vue` is the only path (X-W5's `demo/shell/…` spelling is an authoring
error, corrected at X-W5-FOLD). X-W7 writes the component's **bytes**; X-W5 owns the containment
altitude only (`App.vue`'s wrap); X-W6 and X-W10 read and cite. Write order on the shared file = stage
order, each seat re-reading at open.

## §4 — B-1..B-6: the BoundsDelta packets, homed at X-W7 by the refinement fold

| packet | paths (from `X-W7-FOLD.md` §BoundsDelta) | homed by | X-W7 unit |
|---|---|---|---|
| **B-1** XP-EXTRACT | `demo/workbenches/extract/**` (carve set) | R.1 packet 4 | `g` |
| **B-2** MT-AU1 | `browser/admin/{AdminListItem,AdminListSkeleton,PaginationBar}.vue` · `browser/admin/index.ts` · `useAdmin{Audit,Flagged,Tags}.ts` · `useColorNameQueue.ts` · `useFilteredList.ts` · `demo/palettes/types.ts` · `demo/palettes/api/**` · `browser/dateFormat.ts` · `demo/shell/viewSchema.ts` · `browser/search/UserSortMenu.vue` | R.1 packet 6 | `d` (admin core, DTO, api) · `b` (`dateFormat.ts`) · `UserSortMenu.vue:8` stays X-W10/X-W8's (§0k.3 S-4) |
| **B-3** MMD-IDENTITY (the CARRY LOCK) | `demo/shell/dock/menus/**` · `demo/palettes/useSlugMigration.ts` | R.1 packet 10 | `d` — routed **as a unit** with X-W8 G-13's `C-5/L-1(a)` sibling (§CrossEdges CE-5) |
| **B-4** BROWSE-SEARCH | `browser/search/{MiniColorPicker,UserSortMenu}.vue` · `browser/search/index.ts` | R.1 packet 14 | `a` |
| **B-5** §5-glob vs §4-table | `browser/card/{CurrentPaletteEditor,SwatchHoverMenu}.vue` · `card/composables/*.ts` · `card/PaletteCard/{ActionFeedback,PaletteRenameInput}.vue` | the §5.c glob `browser/card/**` | `c` |
| **B-6** adjacent surfaces | `demo/color-picker/ErrorBoundary.vue` (S-7) · `browser/dialog/{FlagReportDialog,MigratePalettesDialog}.vue` · `browser/slug/PaletteSlugBar.vue` · `browser/status/ApiOfflineChip.vue` (**view bytes only** — its transport half is X-W3's, §0j.B GF-R1) · `demo/color-session/color-chips/PreviewStrip.vue` · `demo/workbenches/generate/GenerateControls.vue` | fold §BoundsDelta B-6 | `d` (dialogs · slug bar · chip view) · `g` (ErrorBoundary bytes) |

**Read-only beside the packets (cite, never fork):** `VersionHistoryDrawer.vue` is X-W4's (`W4.md:127`);
`demo/styles/foundation.css` is X-W10's survivor recipe (CE-4). **§0j.B:** the migrate identity flow
(`MigratePalettesDialog`'s migrate-from-a-prior-slug flow) is **DECLINE-WITH-REASON** — no W7 unit
changes it; B-6 licenses only the dialog's surrounding error surface. MMD-2 (`Regenerate slug`, the chain
through `useSlugMigration.ts`'s `userRegenerate`) is a **distinct** row and is X-W7's CARRY LOCK (B-3).
