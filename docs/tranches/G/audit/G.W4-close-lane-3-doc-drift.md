# G.W4 close-audit Lane 3 — doc-drift INVENTORY

**Wave**: G.W4 (close ceremony, Lane 3 of 7).
**Branch / HEAD**: `tranche-g` @ `3a25f32` (pre-flight verified).
**Mode**: read-only audit. This doc is the drift INVENTORY only — the orchestrator's
close ceremony applies the fixes. No source/doc was modified by this lane.

---

## §0 — Method

Audited every doc named in the G.W4 prompt against the shipped tree at HEAD
`3a25f32`. Drift = a doc statement contradicted by the actual repo. Each row
gives file + line + stale content + correct content + severity.

**Severity scale**:
- **HIGH** — the doc points at a path/file that no longer exists, or makes a
  factually false structural claim. Breaks anyone navigating from the doc.
- **MED** — the doc is incomplete (omits shipped surface) but nothing it says
  is outright false.
- **LOW** — cosmetic / count drift / forward-looking-plan wording that the
  close ceremony will supersede anyway.

---

## §1 — Root `CLAUDE.md`

The `src/units/color/` decomposition (G.W1 Lane B — 9-module split: `utils.ts`
DELETED, 8 `conversions/*.ts` modules + `dispatch.ts` created) is **not**
reflected. Confirmed against the shipped tree:

```
src/units/color/
  conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct,index}.ts
  dispatch.ts
  (utils.ts — DELETED)
```

| Line | Stale content | Correct content | Severity |
|---|---|---|---|
| 60 | `│   │   ├── utils.ts        # conversion functions via XYZ hub, mixColors, gamutMap` | DELETE this line. `utils.ts` no longer exists (G.W1 Lane B). Replace with a `conversions/` cluster line + a `dispatch.ts` line, e.g.:<br>`│   │   ├── conversions/   # 8 focused {from}2{to} modules (hex, kelvin, cylindrical, lab, oklab, transfer, xyz-extended, direct) + index barrel`<br>`│   │   ├── dispatch.ts    # color2() generic converter, DIRECT_PATHS, gamutMap, interpolateHue, mixColors` | **HIGH** |
| 56 | `│   └── color/            # color system (15 spaces, conversion, gamut mapping)` | Comment is still accurate; only flagged so the orchestrator inserts the two new sub-entries (conversions/, dispatch.ts) under it in the correct sort position. No text change required. | LOW |
| 88–97 (`## Conventions`) | No `as any` / type-system budget note exists in this section. | G.W2 (Lanes A–D) + G.W3 Lane D established the **G2 `as any` budget (≤ 5 in `src/`; current count is 0)**, enforced by `npm run proof:as-any-budget`. The `## Test + verify` block lists `proof:resolution` and `proof:dts-layout` but omits the 4 G.W3 proof scripts (`proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:no-bare-builtins` / `proof:no-deep`). Add a Conventions bullet for the `as any` budget and/or extend the proof-script list. | MED |

**Note** — the `index.ts` comment at line 57 (`Color<T> base + 15 space classes
+ ColorChannel brand + ch<T> helper`) is still accurate; G.W1 Lane B appended a
color-subsystem barrel block to `index.ts` re-exporting `dispatch.ts`, but the
one-line summary remains true. No drift.

---

## §2 — `src/units/color/CLAUDE.md`

This file is the most drifted: its entire `## Files` block describes the
pre-decomposition layout. `utils.ts` is gone; 9 new modules are unmentioned.

| Line(s) | Stale content | Correct content | Severity |
|---|---|---|---|
| 29–35 | The whole `├── utils.ts        # all color conversions + interpolation` block (8 lines: `100+ conversion functions via XYZ hub`, transfer functions, `color2<T,C>()`, `mixColors()`, `interpolateHue()`, `gamutMap()`). | DELETE the entire `utils.ts` sub-block. `utils.ts` was DELETED at G.W1 Lane B with no shim. Replace with: (a) a `conversions/` directory entry enumerating the 8 modules (`hex`, `kelvin`, `cylindrical`, `lab`, `oklab`, `transfer`, `xyz-extended`, `direct`) + `index.ts` aggregate barrel; and (b) a `dispatch.ts` entry covering `color2()`, `DIRECT_PATHS`, `XYZ_FUNCTIONS`, `gamutMap()`, `interpolateHue()`, `mixColors()`, `getFormattedColorSpaceRange`, `CYLINDRICAL_HUE_COMPONENT`. See `G.W1-lane-b-color-utils-decomposition.md §2` for the exact function→module map. | **HIGH** |
| 9–24 (`index.ts`, `constants.ts` entries) | Accurate — no drift. | — | — |
| 36–39 (`normalize.ts` entry) | Accurate (`normalizeColorUnit`, `colorUnit2`, `normalizeColorUnits` still in `color/normalize.ts`). | — | — |
| 40–55 (`gamut.ts`, `colorFilter.ts`, `contrast.ts`, `mix.ts`) | Accurate — no drift. | — | — |
| 82–86 (`## Conversion architecture`) | `Naming convention: {from}2{to} ... Direct paths exist for performance-critical chains (OKLab↔LMS↔linear-sRGB).` Factually still true, but does not mention the new module homes. | OPTIONAL: add a sentence — "Each `{from}2{to}` family now lives in its own `conversions/*.ts` module; `dispatch.ts` owns `color2()` + the `DIRECT_PATHS` table." MED only because the existing text is not *false*. | MED |
| 25–28 (`matrix.ts` entry) | Accurate — no drift. | — | — |

The `## Color spaces` table (62–80) and `## Key patterns` (88–94) are unaffected
by the decomposition — no drift.

---

## §3 — `demo/CLAUDE.md`

Checked against G.W2 Lane E (useBreakpoint adoption — 4 sites) and Lane F
(PaletteSlugBar `<Button>` shim).

| Line(s) | Stale content | Correct content | Severity |
|---|---|---|---|
| (whole file) | No `matchMedia` / `useBreakpoint` mention exists; nothing references the hand-rolled-matchMedia retirement. | G.W2 Lane E retired ad-hoc `matchMedia` in `ImagePaletteExtractor.vue`, `ExtractPane.vue`, `useHoverPopover.ts`, `useCardMenu.ts` in favour of `useBreakpoint` from `@mkbabb/glass-ui/dom`. This is *new adoption*, not drift against an existing claim — there is **no stale statement** to correct; it is a documentation **gap**. Optional MED-severity ADD: a `## Library integration` or Conventions note that breakpoint/hover-capability queries route through glass-ui's `useBreakpoint`. | MED (gap, not contradiction) |
| 44 (`composables/` row: lists `useHoverPopover`) | `... useColorUrl, useCustomColorNames (...), usePointerDebug, useHoverPopover, useTouchGate, etc.` — `useHoverPopover` still listed and still exists; no path/name change. | No correction needed — `useHoverPopover.ts` was modified internally (matchMedia → useBreakpoint) but neither renamed nor moved. **NOT drift.** | — |
| 58 (`PaletteSlugBar.vue` row) | `| PaletteSlugBar.vue, PaletteRenameInput.vue | slug editing |` | Accurate — `PaletteSlugBar.vue` still exists, still under `palette-browser/`. G.W2 Lane F changed only its internal `<button>` → glass-ui `<Button>` markup. **NOT drift.** | — |
| 174–183 (`## Conventions`) | Conventions list does not mention the glass-ui-first-class consumption pattern for `useBreakpoint` / `<Button>` shims, despite `feedback_glass_ui_first_class.md` driving both G.W2 Lane E and Lane F. | OPTIONAL: extend the existing "glass-ui is the first-class design system" intent — a bullet that primitives like `useBreakpoint` and `<Button>` are consumed from glass-ui, not hand-rolled. LOW because no existing line is false. | LOW |

**Verdict for §3**: `demo/CLAUDE.md` contains **zero false statements** from
G.W2 Lanes E/F — Lane E/F were surgical internal swaps that did not rename or
relocate any file the doc indexes. The only items are optional *additive* gaps.

---

## §4 — `api/CLAUDE.md`

Checked against G.W3 Lane E (`withTransaction` 4-site expansion: `deletePalette`,
`revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)`) and re-verified
the G.W1 Lane C `services/` block fix still holds.

| Line(s) | Stale content | Correct content | Severity |
|---|---|---|---|
| 26–37 (`services/` structure block) | `services/` block enumerates 4 subdirs (`palette/`, `admin/`, `color/`, `session/`) with route-consumer cross-refs. | **HOLDS** — verified accurate vs `ls api/src/services/` (4 subdirs present). G.W1 Lane C fix is intact; no regression. **NOT drift.** | — |
| 77 (Pipeline-shape `service` bullet) | `services/{palette,admin,color,session}/*.ts` | **HOLDS** — G.W1 Lane C fix intact. **NOT drift.** | — |
| 66–80 (`## Pipeline shape`) | The pipeline narrative describes `validate → authn → authz → service → repository → format → response` but says nothing about transactional atomicity of cross-collection writes. | G.W3 Lane E expanded `withTransaction` coverage from 3 → 7 cross-collection write sites. There is **no existing transaction-coverage statement** in `api/CLAUDE.md` to contradict — this is a documentation **gap**, not a contradiction. Optional MED ADD: a note (under `## Pipeline shape` or a new `## Transactions` subsection) that cross-collection mutations (`deleteUser`, `forkPalette`, `toggleVote`, `deletePalette`, `revertToVersion`, `batchPalettes(delete)`, `batchUsers(suspend)` — 7 sites) wrap in `services.withTransaction(...)`; `makeWithTransaction` lives in `middleware/inject-services.ts`. | MED (gap, not contradiction) |
| 18–26 (`middleware/` block) | Lists 8 middleware files including `inject-services.ts`. | Accurate. `makeWithTransaction` (the `withTransaction` factory) lives in `inject-services.ts` and is hung off the `Services` DI object — the doc does not currently say so, but the file entry itself is correct. NOT drift; folds into the §4 row above as an optional ADD. | LOW |

**Verdict for §4**: `api/CLAUDE.md` has **zero false statements** post-G. The
G.W1 Lane C `services/` fix holds. The only item is an optional additive note
documenting the (now 7-site) `withTransaction` coverage — the doc never claimed a
specific transaction-site count, so nothing is *stale*.

---

## §5 — `bench/color2-direct-paths.mjs`

The bench inlines a pre-state mirror and cites `src/units/color/utils.ts:NNN`
provenance comments. `utils.ts` was DELETED at G.W1 Lane B, so **every one of
these line citations now dangles** — the file does not exist, and the symbols
moved to the new conversion modules. These are comment-only (no runtime effect)
but are misleading provenance.

| Line | Stale content | Correct content | Severity |
|---|---|---|---|
| 66 | `// ─── Constants inlined verbatim from src/units/color/utils.ts ─────────────` | `utils.ts` deleted. Constants now sourced from the `conversions/` cluster. Replace with: `// ─── Constants inlined verbatim from src/units/color/conversions/* (G.W1 Lane B) ───` | MED |
| 70 | `// CSS Color 4 sRGB inverse — src/units/color/utils.ts:496.` | The `XYZ_RGB_MATRIX` is now derived in `src/units/color/conversions/xyz-extended.ts:49` as `invertMat3(RGB_XYZ_MATRIX)` (no longer a hand-typed literal). Correct ref: `src/units/color/conversions/xyz-extended.ts:49`. | MED |
| 77 | `// CSS Color 4 sRGB matrix — src/units/color/utils.ts:490.` | `RGB_XYZ_MATRIX` is now the literal in `src/units/color/conversions/xyz-extended.ts:43`. Correct ref: `src/units/color/conversions/xyz-extended.ts:43`. | MED |
| 84 | `// sRGB transfer encode — src/units/color/utils.ts:523.` | The sRGB encode transfer (`linearToSrgb`) now lives in `src/units/color/conversions/transfer.ts:38`; the `SRGB_GAMMA`/`SRGB_OFFSET`/`SRGB_SLOPE` constants are at `transfer.ts:14–19`. Correct ref: `src/units/color/conversions/transfer.ts:38` (or `:14` for the constants). | MED |
| 111 | `// HSL → RGB closed-form (verbatim from src/units/color/utils.ts:322).` | The HSL→RGB closed-form is now `hsl2rgb` in `src/units/color/conversions/cylindrical.ts:131`. Correct ref: `src/units/color/conversions/cylindrical.ts:131`. | MED |

**5 dangling `utils.ts` line citations.** All comment-only; bench still runs
correctly (it imports from `dist/value.js`, not source). Severity MED — they are
stale provenance an engineer would chase to a deleted file.

---

## §6 — Wave specs `docs/tranches/G/waves/G.W*.md`

| File:line | Stale content | Correct content | Severity |
|---|---|---|---|
| `G.W1.md:22` | `### Lane B — G-OPP-1: src/units/color/utils.ts decomposition (1,430 LoC → 7 modules)` | Decomposition shipped as **9 modules** (8 `conversions/*.ts` + `dispatch.ts`), ratified at G.W1 Lane B — see `G.W1-lane-b-color-utils-decomposition.md §6`. Heading says "7 modules". | LOW (planning doc — superseded by the lane audit) |
| `G.W1.md:85` (gate-matrix Lane B row) | `... src/units/color/conversions/{hex,kelvin,cylindrical,lab,xyz-extended,transfer}.ts (new, 6 files) ...` | Shipped **8** conversion-cluster files: the list omits `oklab.ts`, `direct.ts`, and `index.ts`. Correct: `conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct,index}.ts (new, 9 files)`. | MED (factually wrong file list) |
| `G.W1.md:102` (commit-plan line) | `refactor(library/w1): decompose src/units/color/utils.ts 1430 → 7 focused modules (G3 invariant; G.W1 Lane B)` | Shipped as 9 modules; the actual commit message may already differ — orchestrator should reconcile the planned commit-plan line with the landed commit subject. | LOW |
| `G.W2.md:13` | `... closes ~5 as any lookups in src/units/color/normalize.ts + src/units/color/utils.ts (post-decomposition: src/units/color/dispatch.ts).` | This line **already self-corrects** with the parenthetical `(post-decomposition: src/units/color/dispatch.ts)`. The bare `src/units/color/utils.ts` mention is annotated as superseded — acceptable as written. NO change required. | — (already annotated) |
| `G.W2.md:130` | `Depends on: G.W1 close (color/utils.ts decomposition — typed strengthening targets the new focused modules).` | Forward-looking dependency note, correctly phrased ("the new focused modules"). NO drift. | — |
| `G.W4.md:23` | `... root CLAUDE.md's src/ structure block needs update).` | Accurate — this is the very task this lane executes. NO drift. | — |
| `G.W4.md:25` | `G3 (color/utils.ts decomposed; 9 modules — ratified at G.W1 Lane B; ≤ 350 LoC each)` | Accurate — correctly cites 9 modules. NO drift. | — |
| `G.W4.md:39` | `Update root CLAUDE.md — src/units/color/ structure block reflects 7-module split; as any budget gate note.` | Says **"7-module split"** — contradicts the ratified 9-module count cited two lines earlier (line 25) and in `G.W4.md:16`. Correct: "9-module split". | MED (internal contradiction within G.W4.md) |
| `G.W4.md:16` | `The 9 new color sub-modules (G.W1 Lane B; ratified 9 vs the planned 7)` | Accurate. NO drift. (Cited only to show G.W4.md:39 contradicts G.W4.md:16/25.) | — |
| `G.W4.md:52,97` | Gate matrix header says "21 items" (line 52) but `## Gate` (line 97) says "18-item pre-merge gate matrix". | Internal inconsistency: line 52 enumerates 21 (F's 14 + 7 G-NEW); line 97 says 18. Reconcile to 21 (or to whatever the FINAL.md gate actually runs). | LOW (planning-doc internal drift) |

`G.W0.md` and `G.W3.md` — scanned, no `utils.ts` / decomposition references; no
drift found.

---

## §7 — Out of scope (noted, not audited)

`docs/tranches/C/` exists as an **untracked** scaffold (`git status` →
`?? docs/tranches/C/`; `git ls-files` returns nothing for it). Contents:
`C.md`, `PROGRESS.md`, `coordination/`, `research/`, `waves/`. Per **G.md §5**
this scaffold is OUT OF SCOPE for the G close — recorded here for the
orchestrator's awareness; **not audited**.

---

## §8 — Drift summary

| File | HIGH | MED | LOW | Total |
|---|---|---|---|---|
| Root `CLAUDE.md` | 1 | 1 | 1 | 3 |
| `src/units/color/CLAUDE.md` | 1 | 1 | 0 | 2 |
| `demo/CLAUDE.md` | 0 | 1 | 1 | 2 |
| `api/CLAUDE.md` | 0 | 1 | 1 | 2 |
| `bench/color2-direct-paths.mjs` | 0 | 5 | 0 | 5 |
| `docs/tranches/G/waves/G.W*.md` | 0 | 3 | 3 | 6 |
| **Total** | **2** | **12** | **6** | **20** |

**20 drift items** across 6 files (2 HIGH, 12 MED, 6 LOW).

### Orchestrator close-ceremony worklist (priority order)

1. **HIGH — `src/units/color/CLAUDE.md` §2**: rewrite the `## Files` block —
   delete the `utils.ts` sub-block (lines 29–35), add `conversions/` (8 modules
   + index) + `dispatch.ts` entries.
2. **HIGH — root `CLAUDE.md` §1**: replace line 60 (`utils.ts`) with
   `conversions/` + `dispatch.ts` lines.
3. **MED ×12**: bench provenance comments ×5 (§5), wave-spec file-list/count
   fixes ×3 (§6: `G.W1.md:22`, `:85`, `G.W4.md:39`), additive doc gaps ×3
   (root CLAUDE.md `as any` budget note; `demo/CLAUDE.md` useBreakpoint note;
   `api/CLAUDE.md` withTransaction note), `color/CLAUDE.md` conversion-arch ×1.
4. **LOW ×6**: cosmetic / planning-doc internal-consistency fixes — can be
   batched or deferred (the planning-doc rows are superseded by FINAL.md anyway).

**Key correctness note**: `api/CLAUDE.md` and `demo/CLAUDE.md` carry **zero
false statements** from G — every item against those two files is an *additive
gap* (new surface G shipped that the doc never described), not a contradiction.
The only outright-false drift is in the two structure blocks (root `CLAUDE.md`
+ `color/CLAUDE.md`) that still name the deleted `utils.ts`, plus the bench
provenance comments and two wave-spec file lists.

---

**Lane 3 (doc-drift) complete.** 20 drift items inventoried; no doc/source
modified by this lane. Hand-off: the orchestrator's close ceremony applies the
fixes per §8.
