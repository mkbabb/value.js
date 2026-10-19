# SS-8: UNPROVEN-NEEDS-LIVE visual-audit slot (value.js)

**SERVED MODEL:** `claude-opus-5-5` (Opus 5.5). This is the model ID shown in this seat's own system prompt. It was not inherited from another seat.
**Seat:** SS-8 INVENTORY · 2026-10-19 · authority: `docs/tranches/X/EXECUTION-RUNBOOK.md` §4.1, `REFINEMENT-FOLD-2026-08-28.md` §4, dispatched by COHESION §0gd.4.

## Law carried
- Every item keeps the status its record gave it. All 751 items are **UNPROVEN-NEEDS-LIVE**.
- An item becomes PROVEN or REFUTED only through a live witness that a seat ran and cites by command plus output or frame path. Transcribing an item never changes its status.
- The adjudicated records are **IMMUTABLE** under E-3. Verdicts go into SS8 packet files, never into `docs/tranches/V/megatranche/registry/adjudicated/*.md`.
- Probes are kept under `SS8/probes/`. Each one runs through `~/.claude/guard/guarded` in headless mode, with one browser per run and a new context per cell, and closes in `finally`. WebKit is used only through `guarded --exclusive webkit`.

## Files
- `INVENTORY.json` has:
  - `items`: all 751 items, each with its record path, line, native item id, the claim verbatim, the component file (at HEAD, or as the record cites it) and the route.
  - `batches`: 26 residue batches and 4 zero-cohort batches.
  - `zeroCohort`, `reconciliation`, and the SS-13 out-of-scope counts.
- `tools/parse_unproven.py` reads the records and extracts every top-level list item or table row under each heading that contains `UNPROVEN`. This includes the r2/r3 "additions" subsections. A section ends at the next heading of the same or higher level, or at `---`.
- `tools/build_inventory.py` scopes the items to value.js, adds the 12 prose-carried items, assigns batches and writes `INVENTORY.json`. The build can be repeated and does not modify the records.

## Reconciliation with §4.1 (~751 = 739 + 12)
- `grep -rln UNPROVEN` over the adjudicated records returns 202 files. Of those, 201 produce parsed items. The exception is `kf-CubeAxisLines`, whose residue is a prose "nine-item queue" and belongs to SS-13.
- The full corpus parses to **1965** items: **739 value.js** (78 records), 663 fourier (`fr-*`) and 563 keyframes (`kf-*`).
- The fold's 739 is exactly the value.js count. The fr/kf residue routes to SS-13 (runbook §4.2), so this inventory counts it but does not batch it.
- **+12:** `wb-gradient-visualizer` lists only R-13..R-15 as items. R-1..R-12 ride a single prose sentence at the record's section (about line 129), so they appear here as 12 items of kind `prose-carried`. Their R-n ordinals follow the order of that sentence, and the record does not number each one. **Total: 751.** This matches the runbook.
- The heaviest feeds were re-measured and match §4.1:

  | Record | Items |
  |---|---|
  | picker-spectrumcanvas | 17 |
  | PreviewStrip | 16 |
  | shell-dock-profilesection | 16 |
  | wb-gradient-visualizer | 15 (3 + 12) |
  | BrowsePane | 14 |
  | wb-gradient-codeeditor | 14 |

- Fifteen `pt-*` (parse-that) records also have no UNPROVEN section. They are not in the 14-record zero cohort and fall outside SS-8.
- Duplicates are not merged. Where a record repeats an earlier item in a revised r2/r3 section, each occurrence keeps its own line so that the fold's count method still reproduces exactly.

## Zero-residue cohort (14 records, no §UNPROVEN section)
§4.1 says *"SS-8 may not be called complete until this cohort is swept."* These records are batched Z1–Z4 with `zero: true`.

| Batch | Records |
|---|---|
| Z1 | App, Dock, chassis-fitness, layout-gestalt |
| Z2 | ColorPicker, ColorInput, ColorSpaceSelector, ConfigSliderPane |
| Z3 | GenerateControls, GradientStopEditor, Markdown |
| Z4 | AdminUsersPanel, library-band, parser-band |

Each record is at `docs/tranches/V/megatranche/registry/adjudicated/<name>.md`. For example, `Dock` has a `delta-r3/Dock.worker-O.md` sibling, and `AdminUsersPanel` has `delta-r3/AdminUsersPanel.worker-F.md`.

## Components missing at HEAD
Some record subjects no longer exist under their recorded name: ActionToolbar, DockStatusLamp, PaneSegmentedControl, ApiOfflineChip, PaletteCard/, ShadowPalette, PaletteSlugBar and PaletteRenameInput. In those items, `component.atHead` is empty and `citedByRecord` gives the recorded path. A seat should first establish the item's present subject, using `git log --follow` or the successor file. A deleted subject still leaves the item UNPROVEN. The seat should record that the subject is gone rather than closing the item.
