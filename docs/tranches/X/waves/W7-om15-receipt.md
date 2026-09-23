SERVED MODEL: claude-opus-5-5[1m]

# X-W7 — OM-15 per-row abrogation receipt (X.W7.g · G19)

**Denominator**: `docs/tranches/V/megatranche/audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md` §1 (68 hits: class 1 = 27,
class 2 = 27, class 3 = 14; dispositions 26 KILL / 31 REDUCE / 3 MERGE / 8 KEEP). Read against the bytes at
2026-09-23 (HEAD `e9b8ad4e` at unit open); drifted anchors are recorded with their true line.
**Writable set of this seat** (harness bound): `EmptyState.vue` · `ShadowPalette.vue` · `PaletteCardSkeleton.vue` ·
`demo/workbenches/extract/**` · `AuroraPane.vue` · `ActionToolbar.vue` · `ErrorBoundary.vue` · `PreviewStrip.vue` ·
`GenerateControls.vue` · `BrowsePane.vue` · `PalettesPane.vue` · `demo/palettes/browser/admin/*.vue` · o9 · `demo/test/palettes/*.test.ts`.

Verdict key: **DONE** (landed, commit named) · **HELD-ORACLE** (in bounds, but landing the string inverts an
out-of-bounds oracle that asserts it — escalated, not landed) · **OUT** (the site is outside this seat's writable
set — escalated) · **PRE-CURED** (the bytes already carry the cure — drift since 07-28) · **KEEP**.

Commits: **#12 `8fe6a2db`** (plate; the caption) · **#11** (copy + the structural precondition; hash in the gate log).

## §1.A — class 1 · precious / contrived voice (27)

| # | site (census → true) | disposition | verdict |
|---|---|---|---|
| 1 | `ExtractWorkbench.vue:165` caption `· undeveloped plate — feed it an image ·` | KILL | **DONE #12** — element deleted with its wrapper |
| 2 | `EmptyState.vue:90` default `eyebrow: "· empty plate ·"` | KILL | **DONE #11** |
| 3 | `PalettesPane.vue:78` → `:101` `empty-eyebrow` | KILL | **DONE #11** |
| 4 | `BrowsePane.vue:84` `empty-eyebrow="· the commons ·"` | KILL | **DONE #11** |
| 5 | `AdminAuditPanel.vue:56` → `:74` `· ledger clear ·` | KILL | **DONE #11** |
| 6 | `AdminFlaggedPanel.vue:39` → `:65` `· nothing flagged ·` | KILL | **DONE #11** |
| 7 | `AdminNamesPanel.vue:42` → `:63` `· queue clear ·` | KILL | **DONE #11** |
| 8 | `AdminNamesPanel.vue:92` → `:114` `· none approved yet ·` | KILL | **DONE #11** |
| 9 | `AdminTagsPanel.vue:82` → `:119` `· no tags minted ·` | KILL | **DONE #11** (W7.113 / ATP-39 discharged) |
| 10 | `AdminUsersPanel.vue:63` → `:80` `· roster clear ·` | KILL | **DONE #11** |
| 11 | `AdminUsersPanel.vue:138` → `:169` `· none pinned ·` | KILL | **DONE #11** |
| 12 | `MixSourceSelector.vue:241` → `:272` `eyebrow="· nothing to mix ·"` | KILL | **OUT** — ESC-W7g-G19-BOUNDS; with the prop deleted it now falls through as a DOM attribute on the plate root |
| 13 | `EmptyState.vue:55-57` the eyebrow element | KILL | **DONE #11** — element, prop, default all deleted |
| 14 | `BrowsePane.vue:13` `Search the commons...` | REDUCE → `Search palettes...` | **DONE #11** |
| 15 | `BrowsePane.vue:65` `The commons is unreachable.` | REDUCE → `Couldn't load palettes.` | **HELD-ORACLE** — `e2e/smoke/crash-battery.spec.ts:60` asserts `/The commons is unreachable/` (out of bounds) |
| 16 | `BrowsePane.vue:86` `Publish one from My Palettes and start the wall.` | KILL | **DONE #11** |
| 17 | `BrowsePane.vue:142` `More from the commons` | REDUCE → `Load more` | **HELD-ORACLE** — `e2e/smoke/views/browse-pagination.spec.ts:62` names the button (out of bounds) |
| 18 | `AdminAuditPanel.vue:45` → `:57` `The ledger is unreachable.` | REDUCE → `Couldn't load the audit log.` | **DONE #11** |
| 19 | `AdminTagsPanel.vue:71` → `:108` `The tag ledger is unreachable.` | REDUCE → `Couldn't load tags.` | **DONE #11** |
| 20 | `AdminUsersPanel.vue:54` → `:71` `The roster is unreachable.` | REDUCE → `Couldn't load users.` | **DONE #11** |
| 21 | `AdminFlaggedPanel.vue:25` → `:51` `The flag queue is unreachable.` | REDUCE → `Couldn't load flagged palettes.` | **DONE #11** |
| 22 | `AdminNamesPanel.vue:33/:83` → `:52/:104` (2 sites, 1 row) | REDUCE → `Couldn't load proposals.` / `Couldn't load approved names.` | **DONE #11** |
| 22′ | drift: `AdminUsersPanel.vue:166` `This user's palettes are unreachable.` (born after 07-28, same idiom) | REDUCE (same register) → `Couldn't load this user's palettes.` | **DONE #11** (recorded as drift, not a census row) |
| 23 | `AboutPane.vue:15` description | REDUCE | **OUT** |
| 24 | `AboutPane.vue:16` heading fragment | REDUCE | **OUT** |
| 25 | `Markdown.vue:26` `Oh snap...` | REDUCE | **OUT** |
| 26 | `GeneratePane.vue:32` description | REDUCE | **OUT** (`GeneratePane` ≠ `GenerateControls`) |
| 27 | `MixSourceSelector.vue:243` hint | REDUCE | **OUT** |

## §1.B — class 2 · duplicative text (27)

| # | site | disposition | verdict |
|---|---|---|---|
| B1.1–B1.11 | the eleven eyebrow ↔ message pairs (PalettesPane · BrowsePane · Audit · Flagged · Names ×2 · Tags · Users ×2 · MixSourceSelector · the EmptyState default) | KILL eyebrow, keep message | **DONE #11** for 10 of 11 (the same acts as §1.A #2–#11/#13); BrowsePane's message → `No palettes published yet.` **DONE #11**; **MixSourceSelector OUT** (= §1.A #12) |
| B2.12 | `ExtractWorkbench.vue:165` vs `ImageDropZone.vue:49` | KILL the caption | **DONE #12** |
| B3.13 | `MixConfigBar.vue:98→100` `Color space` | KILL aria + associate | **PRE-CURED** — `:108` `:aria-labelledby="labelledBy"` (LabeledField); out of bounds regardless |
| B3.14 | `MixConfigBar.vue:121→123` `Hue method` | KILL aria + associate | **PRE-CURED** — `:130` |
| B3.15 | `MixConfigBar.vue:145→147` `Size mismatch` | REDUCE | **PRE-CURED** — `:158` |
| B3.16 | `ConfigSliderPane.vue:140→145` `:aria-label="def.label"` | KILL aria | **OUT** — still at `:145` |
| B3.17–19 | `GradientVisualizer.vue` Type / Space / Hue | REDUCE | **OUT** — the three drifting `aria-label`s are no longer at the bytes (re-measured: 0 hits); not re-audited here |
| B3.20 | `GradientVisualizer.vue:229` → `:269` `Gradient direction` | REDUCE | **OUT** — still present |
| B3.21 | `GenerateControls.vue:221` `Preset` / `Generation preset` | REDUCE | **PRE-CURED** — `LabeledField label="Preset"` + `:aria-labelledby` (true `:227-229`). Note: `e2e/smoke/walk.spec.ts:91` and `o20-generate-plate.spec.ts:71` still query `name: "Generation preset"` — walk.spec's Generate leg is RED at the bytes independent of this seat (measured, see the gate log) |
| B3.22 | `GenerateControls.vue:255` `Harmony` / `Color harmony` | REDUCE | **PRE-CURED** — `LabeledField label="Harmony"` + `:aria-labelledby` |
| B3.23 | `AuroraPane.vue:120→122` `Harmony` / `Palette harmony` | REDUCE (associate) | **DONE #11** — `:id` via `useId()` + `:aria-labelledby`; the `aria-label` deleted |
| B3.24 | `AuroraPane.vue:140→142` `Arrangement` / `Zone arrangement` | REDUCE (associate) | **DONE #11** |
| B3.25 | `AuroraPane.vue:154→156` `Medium` / `Painterly medium` | REDUCE (associate) | **DONE #11** |
| B3.26 | `AuroraPane.vue:168→170` `Motion` / `Motion register` | REDUCE (associate) | **DONE #11** |
| B4.27 | `MixPane.vue:75` → `:80` `Mix colors and palettes together.` | KILL | **OUT** |

**The 14 uncoupled labels (G19 "associated")**: 4 associated by this seat (AuroraPane) · 5 PRE-CURED at the bytes
(MixConfigBar ×3, GenerateControls ×2) · 5 OUT (ConfigSliderPane ×1, GradientVisualizer ×4 — 1 still present,
3 no longer at the bytes). **9 of 14 associated in the tree; the 5 OUT are ESC-W7g-G19-BOUNDS.**
S-19(c): ActionToolbar's glyph names are carried by `ActionButton.vue:16` (`:aria-label="title"`) — out of bounds;
the toolbar's own copy rows are cured below.

## §1.C — class 3 · explicit mechanics (14)

| # | site | disposition | verdict |
|---|---|---|---|
| C1 | `ActionToolbar.vue:8` → `:39` `Click to reset to the default color.` | REDUCE → `Back to the default color.` | **DONE #11** |
| C2 | `ActionToolbar.vue:20` → `:51` `Click to copy the current color to the clipboard.` | REDUCE → `Copies the current color.` | **DONE #11** |
| C3 | `ActionToolbar.vue:31` → `:61` `Click to generate a random color.` | REDUCE → `Picks a random color.` | **DONE #11** |
| C4 | `ActionToolbar.vue:42` → `:71` `Save, browse, and publish color palettes.` | KEEP | **KEEP** |
| C5 | `ActionToolbar.vue:55` → `:85` `Open image palette extraction from a photo or camera.` | REDUCE → `Palettes from a photo or camera.` | **DONE #11** |
| C6 | `ImageDropZone.vue:49` `Drop an image or click to browse` | REDUCE → `Add an image` | **DONE #11 at INTENT** → `Upload image` (see note) |
| C7 | `ImageDropZone.vue:20` three `aria-label` branches | REDUCE → `Sample colors` / `Replace image` / `Add an image` | **DONE #11 at INTENT** → `Sample colors` / `Replace image` / `Upload image` |
| C8 | `BrowsePane.vue:86` | KILL | **DONE #11** (= §1.A #16) |
| C9 | `PalettesPane.vue:80` → `:103` `Add colors above, then save the set.` | REDUCE → `Add colors, then save.` | **DONE #11** |
| C10 | `MixSourceSelector.vue:243` | REDUCE | **OUT** (= §1.A #27) |
| C11 | `PaletteSlugBar.vue:57` | REDUCE | **OUT** |
| C12 | `ColorInput.vue:99` | REDUCE | **OUT** |
| C13 | `ExtractWorkbench.vue:165` `feed it an image` | KILL | **DONE #12** |
| C14 | `AuroraPane.vue:115` two-sentence description (+ `colour` ×2 locale defect) | REDUCE → `Aurora palette follows the picked color.` | **DONE #11** |

**C6/C7 INTENT note (recorded, not silent).** The census's suggested string is `Add an image`; the REDUCE register
(one plain clause, no click/tap, no positional word) is the law. `e2e/smoke/walk.spec.ts:82` (out of bounds) locates
the drop zone by `name: /Upload image/i`. `Upload image` satisfies the register, keeps the visible label equal to the
accessible name (WCAG 2.5.3), and leaves the oracle true — so both the visible line and the unloaded-branch label read
`Upload image`. The owner may still rule `Add an image`; that re-ruling moves walk.spec with it.

## KEEP (8) — listed for completeness

`PalettesPane.vue` sr-only count · `ActionButton.vue:16`+`:41` · `ImageDropZone.vue:61` `sample`/`replace` (strings kept;
the chip's STYLE consolidated below) · `ExtractPane.vue:7` description · `BrowsePane.vue:3` description ·
`BlobPane.vue:128` · `ActionToolbar.vue:71` · the dev overlays. **All KEEP, untouched.**

## §1.D — the seven caption dialects → `.section-label`

`.section-label` is the producer's recipe (`@mkbabb/glass-ui/dist/styles/typography/utilities.css`:
`.section-label { @apply text-mono-caption; color: var(--muted-foreground); }`). It is **cited, not forked**: no rule
is authored in `demo/styles/foundation.css` (X-W10's survivor recipe, CE-4 / W7.118).

| site | dialect | verdict |
|---|---|---|
| `EmptyState.vue:55` | `text-mono-caption uppercase tracking-[0.18em]` | **DELETED #11** with the element |
| `ExtractWorkbench.vue:163` | same (the OM-15 caption) | **DELETED #12** with the caption |
| `ExtractWorkbench.vue:131` (`dominant`) | same | **DONE #11** → `section-label plate-ink` (the scoped `--ink-muted` rung keeps its certified contrast) |
| `ImageDropZone.vue:58` (`sample`/`replace` chip) | same | **DONE #11** → `section-label plate-ink` |
| `AuroraPane.vue:194-200` `.aurora-row-label` | hand re-implementation | **DONE #11** → `section-label`; the scoped rule deleted. (K-12's `text-admin-label` cure stays KILLED — not used.) |
| `ConfigSliderPane.vue:237-243` `.config-section-title` | hand re-implementation | **OUT** |
| `MixResultDisplay.vue:58` | bold + `tracking-wide` | **OUT** |
| `PaletteCardMenu.vue:155` | `tracking-wider` | **OUT** |
| `ParseEchoReadout.vue:12` | `tracking-[0.14em]` | **OUT** |
| `ApiOfflineChip.vue:41-42` | small-caps | **OUT** |
| dev overlays | `uppercase` | **KEEP** (census: out of scope) |

⟨cmd⟩ `grep -rn "tracking-\[0.18em\]\|uppercase" demo/workbenches/extract/` → **0** (was 3).

## Totals (self-counted from the three numbered tables above)

| table | rows | DONE | HELD-ORACLE | PRE-CURED | OUT | KEEP |
|---|---:|---:|---:|---:|---:|---:|
| §1.A (27 + drift 22′) | 28 | 20 | 2 | 0 | 6 | 0 |
| §1.B | 27 | 15 | 0 | 5 | 7 | 0 |
| §1.C | 14 | 10 | 0 | 0 | 3 | 1 |
| **all** | **69** | **45** | **2** | **5** | **16** | **1** |

45 + 2 + 5 + 16 + 1 = 69 = the census's 68 numbered hits + the drift row 22′. The census cross-lists several hits
under two classes (its own "9 carry two classes"): B1.1–B1.11 are the same acts as §1.A #2–#13, C8 = §1.A #16,
C13 = §1.A #1, C10 = §1.A #27, so a row here is a census *hit*, not a distinct edit. The census's separate KEEP
enumeration (the 8 above) is listed for completeness and is not inside the 68 numbered rows except C4.
The three dialect sites this seat consolidated (§1.D) are not census hits (§1.D is "not copy hits").

## G19 — the structural precondition

⟨cmd⟩ `grep -rn "eyebrow" demo/ | grep -v node_modules | wc -l` → **31 → 14** (double-run 14 · 14); **0 inside this
seat's writable set.** The 14 survivors, all OUT: `PaletteCardGrid.vue:25` (`:eyebrow="emptyEyebrow"` + its prop —
functional, the grid still forwards a now-undeclared attribute) · `MixSourceSelector.vue:272` (functional — §1.A #12)
· prose/unrelated: `DESIGN.md:37`, `ColorSpaceSelector.vue` ×2, `ParseEchoReadout.vue:15`, `ProfileSection.vue` ×2,
`GradientCodeEditor.vue:102`, `EasingSpecimenStrip.vue` ×4 (a `family-eyebrow` class — a different idiom the grep
cannot tell apart), `easingCatalogue.ts:81`. → **ESC-W7g-G19-BOUNDS.**
