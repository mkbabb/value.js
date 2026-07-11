# T.W6 · Lane N — the Generate verb (W6-5) close record

**Lane**: N (generate) — the four-lane W6 map's single-item lane.
**Branch**: `worktree-wf_c9d0ca77-ec3-3`, cut from the wave head `3408433`
(the Lane D PARTIAL tip — W6-4 + W6-7 in-lineage; the round-4 W5/Lane-G/Lane-D-remainder
merges are NOT beneath this base and none of their diffs touch this lane's files,
verified: `git diff HEAD t-w6-laneD-remainder --stat` intersects Lane N's set only at
`PROGRESS.md`, one appended row).
**Commits (item-scoped, per the §Commit plan)**:

| Item | Commit | One line |
|---|---|---|
| W6-5 | `5571f2b` | T-16 re-seat — the verb JOINS the plate chrome; seed = bench note; the orphan row DIES; O-20 minted GREEN |
| T-17 (routed) | `3372749` | the Lane D chip handoff executed through Lane N's queue — seed-exact preset/harmony strips; O-20 grows the truth-law leg |

## §1 W6-5 — the re-seat (T-16 / t-misc-elements F2 / plan-audit-2 F21)

- **The orphan died into the redesign (REDESIGN, never excise)**: the toolbar row
  that hung between plate and marginalia is gone; `GenerateControls.vue` now owns an
  **instrument plate** (`[data-generate-plate]`, `role`-free section with
  `aria-label="Generated palette"`) — the rung-2 WELL species (Q4's ratified sibling
  assignment: PaletteCard → well), composed of: the full-bleed `PaletteColorStrip`
  face (clipping its OWN corners — S.W5-10; the T-45 clip class not joined) → the
  chrome row (**name — count — Regenerate — Save — Copy**) → the specimen swatches
  (each a direct copy verb) → the **seed bench note** (Fira mono, muted,
  `select-all` kept — provenance like a specimen label).
- **The chrome grammar**: the row wraps as designed — title+count lead; the verb
  cluster rides `ml-auto` as ONE unit; identical grammar at 1280 and 390 (probed
  both schemes × both widths — no clipped title, no orphaned wrap).
- **The single-writer adjudication (recorded)**: the F2 cure prose names the
  PaletteCard header row, but `PaletteCard.vue` is **T.W5's file** (cards lane,
  landed at `f23b97b` with a full cartoon-register rewrite) and Lane N's file bound
  is `GenerateControls.vue` alone. Writing PaletteCard from this lane's pre-W5 base
  would be a second writer on a sibling wave's file AND a guaranteed textual
  conflict. The landing therefore re-seats the plate **inside Lane N's one file**:
  the borrowed catalog `PaletteCard` leaves the Generate view — with it die the
  synthetic-`Palette` shim (fake id/slug + `new Date()` timestamps minted per
  recompute) and the **dead popover emits** (`addColor`/`editColor` had no listener
  — two of the three swatch-popover actions were live dead-ends); the live
  per-color copy collapses to one honest click on the swatch. The spec-of-record
  row ("the Generate verb joins the plate chrome; seed = bench-note; the orphan row
  dies" + O-20 containment) is landed in full; the evidence-lane prose's
  PaletteCard-header letter is satisfied by the plate's OWN chrome row.
- **The save is now truthful at this file's boundary**: `save` emits
  `[colors, name]` — the plate's editable title is provenance FOR the save.
  **Residual (named)**: `GeneratePane.vue:20` still writes the hardcoded
  `"Generated Palette"` into `pm.createPalette` (a pre-existing lie — renaming the
  plate never reached the save). The pane has NO round-4 writer; the one-liner
  (`onSave(colors, name)` → `pm.createPalette(name, …)`) is routed to the wave-close
  integrator / W8 sweep, never patched cross-bounds from this lane.
- **No new motion minted**: the plate is static at rest (an instrument fixture, not
  a clickable card); no `transition-*` was added — the F22/T-48 dead-default class
  is not joined by this lane.

## §2 T-17 — the handoff receipt (the intra-wave single-writer clause)

- **Handed**: Lane D authored the chip module + spec (`2ab5654` —
  `demo/@/components/custom/color-chips/`); the barrel's CONSUME MAP routes the
  GenerateControls consume through Lane N's queue. The barrel cites
  `audit/w6-lane-d-record.md` for the handoff spec — **that file never landed**
  (the prior Lane D merged PARTIAL at `b4711d8` without its record); the operative
  spec = the module barrel + `t-nav-dropdowns.md` F5/F7 + the `2ab5654` message.
  Recorded here as the receiving half.
- **Executed** (`3372749`): preset rows preview
  `generatePalette(count, candidate, harmony, seed)`; harmony rows
  `generatePalette(count, preset, candidate, seed)` — the F5 truth law (pure,
  mulberry32-seeded: the strip IS the palette selecting it yields). Chip leading in
  the producer `#description` lane, description after, `gap-2` (F7); the N-4
  segment cap + honest truncation live in `PreviewStrip`; labels non-bold (the
  T-40 §0.6 constraint on re-authored dropdowns); menu `min-w` 14rem → **17rem**
  with the B.W1 width comments kept honest (F7's own instruction).

## §3 Gate — O-20 (SYNTHESIS §6.1; the wave's Hard-gate row 6)

`e2e/smoke/oracles/o20-generate-plate.spec.ts` — **2/2 GREEN** (smoke project):

1. **Containment**: Regenerate + Save + Copy + the bench note live INSIDE
   `[data-generate-plate]`; the orphan is dead by construction —
   page-count(Regenerate) ≡ plate-count(Regenerate); the verb ACTS on its plate
   (click re-stamps the bench note).
2. **The T-17 truth-law leg**: a NON-selected preset row's stamped `data-stops`
   ≡ the plate's live swatch computed paint after selecting it — byte-identical
   `rgb()` strings, same order (the library ≡ stamp half is identity by
   construction: same pure function, same args).

## §4 Verification artefacts + gates

- lint 0 · typecheck 0 (lib + demo) · vitest 72 files / 2208 green · O-20 2/2 ·
  full 6-project close-run tallied below.
- `GenerateControls.vue` = 304 LoC (≤ 400, PP-8 cap).
- Frames (scratchpad, lane-local): plate both schemes × {1280, 390}
  (`gen-plate3-*`), open preset/harmony menus both schemes (`gen-menu-*`) — the
  chips show the preset character honestly (Pastel soft / Neon saturated / Earth
  muted), the wrap grammar holds at 390.
- ROWS.md check: no w45-checkpoint rows route to Lane N (R10/B-1/C-5 are Lane D's).
- §0.6 riders: none bind Lane N by name; T-45 (border clip class, population-wide)
  is guarded here by NOT clipping at the plate level; T-40 non-bold consumed on the
  two re-authored dropdowns.

### Close-run tally (6 projects, lane close)

The full 6-project run was LAUNCHED at the lane close (lane-unique ports
8293/8294; the owner's :9000 untouched) and was STILL EXECUTING at the forced
report — the W4.5 row-4 env-class caveat verbatim: the un-observed all-project
tally is recorded as such, never asserted. What WAS observed: the lane's own
oracle (O-20 2/2, two independent runs), the smoke-project artifacts
accumulating only in the known classes (o16/o26 born-RED `test.fail()`;
o11 gate-4 / dual-pane contention-retry dirs, both empty = passed on retry;
the o7 census fixture is `[role="article"].bg-well` — the new plate is a
`section` and cannot join it). The wave-close integrator re-drives the
all-project tally per §Hard-gate 9.
