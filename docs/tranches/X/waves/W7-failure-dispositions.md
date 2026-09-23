SERVED MODEL: claude-opus-5-5[1m]

# X-W7 — Failure-disposition table (G7 · fold S-7 · W7.15 · W7.17)

**Seat**: X.W7.b, 2026-09-23 (sitting of record 2026-09-17). **Authority**: `W7.md` §3 item 3, §5.b, §6 G7, §8;
`X-W7-FOLD.md` §Gates S-7 (the denominator is the **failure-path set**, not the `console.warn` count;
unreachable `catch`es are `DELETE` rows by ECMA-402), W7.15, W7.17–W7.24.

## The ruling (made once, applied to every row)

| verb | rule |
|---|---|
| **SURFACE** | The path terminates an act the user initiated or is waiting on (a mutation, a requested load, an export). Its failure becomes a **typed result** the host renders on the surface where the act was taken (the card feedback rail, the panel's error state, the dialog's tally) — never a `console.warn` alone, never a success-shaped return. A catch that converts a foreign-input failure into the contract's own terminal, *visible* failure value is already SURFACE. |
| **LOG-ONLY-BY-RULING** | The path has **no user-visible consequence**: the failure means "the act did not begin", and the absence of the act is itself the correct, observable state. Nothing to announce, so nothing is surfaced; the path is kept because it is the platform's own signal. |
| **DELETE** | The `catch` cannot fire (ECMA-402 / platform law), or the `console.warn` is not a failure path at all. The code is removed, not re-ruled. |

No row is decided ad hoc: each row cites the one clause above that decides it.

## Instruments (settled bytes, double-run)

- Open (HEAD `e24361c6`): ⟨cmd⟩ `grep -rn "console.warn" demo/palettes | wc -l` → **38** · **38**; ⟨cmd⟩ `grep -rn "catch\b\|\.catch(" demo/palettes --include='*.ts' --include='*.vue' | grep -v "//" | wc -l`
  → **49** real `catch` sites (the record's "35 in-catch" used a 3-line window and under-counts `useBrowsePalettes.ts:82`'s 5-line span).
- **The failure-path set = 50 rows**: the 49 `catch` sites ∪ the 1 `console.warn` outside any catch (`useAdminUsers.ts:76`). Of the 49,
  **37** carry a `console.warn` and **12** do not. The spec's 31 and S-7's ~38 are floors this set contains.
- After this unit (X.W7.b): `console.warn` **37** · **37**; real `catch` **47** · **47** (−3 dead/legacy, +1 the export boundary).

## Rows

Anchors are the open bytes (HEAD `e24361c6`). **Owner** = the W7 unit whose writable set holds the file (record §Unit plan);
`—` = held by no W7 unit (routed, not absorbed). **State** = `CURED` (landed by X.W7.b) or `OWED` (the owner lands it).

| # | site (open anchor) | path | verb | clause | owner | state |
|---|---|---|---|---|---|---|
| 1 | `usePaletteExport.ts:21-23` | every export (json/css/tailwind/svg/png) | SURFACE | user-initiated export | b (+ d renders) | **CURED** — typed `ExportOutcome` + `failure` ref; host render → ESC-W7b-HOST (d) |
| 2 | `browser/dateFormat.ts:10` | `formatTime` | DELETE | ECMA-402: `toLocaleString` never throws here | b | **CURED** |
| 3 | `browser/dateFormat.ts:22` | `formatDate` | DELETE | ECMA-402: `toLocaleDateString` never throws here | b | **CURED** |
| 4 | `useVersionHistory.ts:59-60` | load versions | SURFACE | requested load (drawer) | d | OWED |
| 5 | `useVersionHistory.ts:91-92` | revert | SURFACE | mutation | d | OWED |
| 6 | `useVersionHistory.ts:104-105` | fork from version | SURFACE | mutation | d | OWED |
| 7 | `useAdminTags.ts:56-59` | load tags | SURFACE | requested load | d | OWED |
| 8 | `useAdminTags.ts:80-81` | create tag | SURFACE | mutation (W7.18: the interface has no error member — the type is the defect) | d | OWED |
| 9 | `useAdminTags.ts:93-94` | delete tag | SURFACE | mutation (W7.18) | d | OWED |
| 10 | `useTagEdit.ts:44` | tag catalog load ("silent — best-effort") | SURFACE | requested load: the editor opens without its catalog and says nothing | d | OWED |
| 11 | `useTagEdit.ts:63-64` | save tags | SURFACE | mutation (N_tags = 11 → 400, W7.md G10) | d | OWED |
| 12 | `useBrowsePalettes.ts:77-82` | load remote palettes | SURFACE | requested load | — | OWED (routed) |
| 13 | `useBrowsePalettes.ts:109-110` | load more | SURFACE | requested load | — | OWED (routed) |
| 14 | `useBrowsePalettes.ts:139-140` | vote | SURFACE | mutation (W7.17 / AF-8: `onVote` swallows while siblings return a result) | — | OWED (routed) |
| 15 | `useBrowsePalettes.ts:150-151` | delete palette | SURFACE | mutation | — | OWED (routed) |
| 16 | `useBrowsePalettes.ts:174-175` | rename palette | SURFACE | mutation (W7.17 / AF-8: `onRename`) | — | OWED (routed) |
| 17 | `useBrowsePalettes.ts:213-214` | set visibility | SURFACE | mutation | — | OWED (routed) |
| 18 | `useAdminFlagged.ts:72-75` | load flag queue | SURFACE | requested load (W7.24: 401/403 must not read as an outage) | d | OWED |
| 19 | `useAdminFlagged.ts:88-89` | dismiss flags | SURFACE | mutation (W7.20) | d | OWED |
| 20 | `useAdminFlagged.ts:100-101` | delete flagged palette | SURFACE | mutation (W7.20) | d | OWED |
| 21 | `useAdminFlagged.ts:127-128` | report / flag palette | SURFACE | mutation (W7.22: every API failure renders as success; host closes unconditionally) | d | OWED |
| 22 | `useColorNameQueue.ts:43-45` | load colour queue | SURFACE | requested load | d | OWED |
| 23 | `useColorNameQueue.ts:60-62` | load approved colours | SURFACE | requested load | d | OWED |
| 24 | `useColorNameQueue.ts:76-77` | approve name | SURFACE | mutation (W7.19: ungated → double-POST, losing 404 dies in `console.warn`) | d | OWED |
| 25 | `useColorNameQueue.ts:87-88` | reject name | SURFACE | mutation (W7.19) | d | OWED |
| 26 | `useColorNameQueue.ts:99-100` | delete colour | SURFACE | mutation (W7.19) | d | OWED |
| 27 | `useAdminUsers.ts:62-65` | load users | SURFACE | requested load | d | OWED |
| 28 | `useAdminUsers.ts:76` | impersonation **success** logs `token.slice(0, 8)` | DELETE | not a failure path; it prints a credential prefix to the console (the ceremony itself is X-W8's subtraction, CC-076 row 7) | d | OWED |
| 29 | `useAdminUsers.ts:77-78` | impersonate | SURFACE | mutation | d | OWED |
| 30 | `useAdminUsers.ts:100-101` | feature palette | SURFACE | mutation (DAG §2.3 row 1: the absent mutation error) | d | OWED |
| 31 | `useAdminUsers.ts:111-112` | delete palette | SURFACE | mutation | d | OWED |
| 32 | `useAdminUsers.ts:126-127` | delete palette (expanded list) | SURFACE | mutation | d | OWED |
| 33 | `useAdminUsers.ts:139-140` | delete user palettes (delete-all) | SURFACE | mutation (destructive — G14/G15) | d | OWED |
| 34 | `useAdminUsers.ts:151-152` | delete user | SURFACE | mutation | d | OWED |
| 35 | `useAdminUsers.ts:162-163` | load user palettes | SURFACE | requested load (expand) | d | OWED |
| 36 | `useAdminUsers.ts:174-175` | delete palette (user row) | SURFACE | mutation | d | OWED |
| 37 | `useAdminUsers.ts:188-189` | prune empty users | SURFACE | mutation | d | OWED |
| 38 | `useAdminAudit.ts:64-67` | load audit log | SURFACE | requested load | d | OWED |
| 39 | `useSlugMigration.ts:57` | per-palette publish ("Skip failures") | SURFACE | mutation — W7.23 / A-26: the tally becomes the visible result | d | OWED |
| 40 | `useSlugMigration.ts:61-62` | publish all | SURFACE | mutation (W7.23) | d | OWED |
| 41 | `useSlugMigration.ts:92` | slug login (typed `ApiProblem.status` branch) | SURFACE | already surfaced (authored copy per status) — row confirms, no change | d | SURFACED |
| 42 | `useSlugMigration.ts:127-128` | migration action | SURFACE | mutation (W7.23) | d | OWED |
| 43 | `usePaletteActions.ts:44` | ensure session before publish | SURFACE | already a typed `{success:false,message}` the host shows | d | SURFACED |
| 44 | `usePaletteActions.ts:54` | publish | SURFACE | already a typed result; the zod-string relay at N = 51 is G10/d's pre-flight | d | SURFACED |
| 45 | `usePaletteStore.ts:29` | corrupt local store → `defaultStore` | SURFACE | the user's local palettes are silently replaced by an empty store; the reset must be told | d | OWED |
| 46 | `browser/slug/PaletteSlugBar.vue:216` | switch slug | SURFACE | already renders `slugError` — but branches on `.message` substrings (the S.W2 W2-6 defect `useSlugMigration.ts:92` cured by `ApiProblem.status`) | d | SURFACED (branching owed) |
| 47 | `browser/dialog/composables/useDialogBrowseActions.ts:68-72` | remix / fork | SURFACE | routed through `onForkError` when the host passes it; the `else console.warn` arm is the unsurfaced remainder | — | OWED (routed) |
| 48 | `browser/search/MiniColorPicker.vue:99` | `setPointerCapture` → `NotFoundError` | LOG-ONLY-BY-RULING | the pointer is gone; no drag begins, and no drag is the correct, visible state (X.W7.a N-10) | a | KEPT |
| 49 | `export/reload.ts:152` | stored bytes not UTF-8 | SURFACE | converts to the contract's terminal `snapshot_corrupt` result | b | SURFACED |
| 50 | `export/reload.ts:159` | stored bytes not JSON | SURFACE | converts to the contract's terminal `snapshot_corrupt` result | b | SURFACED |

## Tally (read from the rows above)

- **50 rows**: SURFACE **46** · LOG-ONLY-BY-RULING **1** · DELETE **3**.
- State: CURED **3** (rows 1-3) · SURFACED-already **6** (41, 43, 44, 46, 49, 50) · KEPT **1** (48) · OWED **40** —
  **d 33** (rows 4-11, 18-40, 42, 45) · routed (no W7 owner) **7** (12-17, 47).

## Failure paths outside the `catch` census (the set's non-`catch` members, W7.17)

A failure path need not be a `catch`. The fold names these; each is ruled by the same clause:

- **W7.22** `BrowsePane.vue:298-299` closes the report dialog unconditionally while `report()` returns `{flagged} | undefined`
  → SURFACE, owner d (the discarded result, not a catch).
- **W7.21 / N-11** `void writeClipboard(...)` ×8 discards the typed `CopyResult` → SURFACE, owner c (card sites) / routed.
- **W7.23** `MigratePalettesDialog.vue:69-72` closes before the emit → SURFACE via the tally, owner d (B-6).
- **This unit's own new paths**: capture refusals (`export/capture.ts` — empty, over-cap, name bounds, tag set, missing
  release, unparseable / out-of-contract colour), the PNG serializer's `serializer_contract`, an unknown format — all
  resolve to the same `ExportOutcome` (row 1). None `console.warn`s.

## Addendum 2026-09-23 — X.W7.d2 (COHESION §0bk.1): the seven routed rows and the export host

Seat `claude-opus-5-5`. The rows above stand as written (E-3); this addendum re-states the state of the rows
§0bk.1 granted, at the settled bytes. Instrument ⟨cmd⟩ `grep -n console.warn demo/palettes/useBrowsePalettes.ts
demo/palettes/browser/dialog/composables/useDialogBrowseActions.ts` → **0** code lines (the one hit is prose
in `useDialogBrowseActions.ts`'s header comment naming the retired arm).

| # | verb (unchanged) | how it is surfaced now | state now |
|---|---|---|---|
| 1 (host) | SURFACE | the export is the inspector's own act: `PaletteInspector.vue` renders `usePaletteExport`'s `failure` on its rail (`role="status"`); `BrowsePane`/`PalettesPane` hold no export copy. Mounted test `demo/test/palettes/palette-inspector.test.ts › G7` forces a thrown download and reads "Export failed: disk full" | **CURED (host)** |
| 12 | SURFACE | the cause joins `browseError`, which the wall's error plate renders; the log beside it is gone | **CURED** |
| 13 | SURFACE | `loadMoreRemotePalettes` settles a `BrowseVerdict`; `BrowsePane` renders a failure beside the More control (`role="status"`) | **CURED** |
| 14 | SURFACE | `onVote` settles a `BrowseVerdict`; "Vote failed: …" on the inspector | **CURED** (oracle `vote`) |
| 15 | SURFACE | `onDeleteOwned`: "Delete failed: …" on the inspector | **CURED** (oracle `delete`) |
| 16 | SURFACE | `onRename` settles a `BrowseVerdict`; "Rename failed: …" on the inspector | **CURED** (oracle `rename`) |
| 17 | SURFACE | `onSetVisibility`: "Publish failed: …" / "Unpublish failed: …" on the inspector | **CURED** (oracle `publish / unpublish`) |
| 47 | SURFACE | `onForkError` is REQUIRED (the `else console.warn` arm deleted); a `fork` that settles `undefined` is rendered as "Remix failed: …" too | **CURED** (oracle `fork`) |

Rows 10/11 (`useTagEdit` catalog / save) were produced into `useTagEdit.error` at unit d; their RENDER is now
`BrowsePane`'s (the tagged palette's inspector rail) — oracle `tag`. Row 6 (`useVersionHistory.fork`'s own
`console.warn`) is in a file outside §0bk.1; its failure is rendered by row 47 above, its log line stays with its
owner (named, not absorbed).
