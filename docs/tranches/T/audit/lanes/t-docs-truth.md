# t-docs-truth — doc-truth audit: CLAUDE.md (root + demo/ + src) + DESIGN.md vs post-S reality

**Lane**: `t-docs-truth` (T DEVELOPMENT fleet; forensics/design-direction only — **ZERO product-code
changes**; this file is the sole write). **Substrate**: `tranche-t` @ `cc4f4fa` (= the S close);
`git diff cc4f4fa..HEAD -- src/ demo/ api/` is empty at the time of writing — every drift found below
is pre-existing (S-era or earlier), not something T introduced.

**Charter** (per the dispatch): audit CLAUDE.md (root + `demo/` + `src` trees) vs the post-S tree;
confirm/detail the known 5→6 e2e-projects drift; flag every structure section the E-1 colocation
grand edict's coming restructure will invalidate; check `demo/DESIGN.md` currency against the S
register changes (owner rulings, new facilities); and check MEMORY.md against the live tree.

**Method**: every `## Structure` / file-table claim in the six live `CLAUDE.md` files and in
`demo/DESIGN.md` was checked against a live `find`/`grep`/`wc -l` of the tree, not against another
doc. Numbers below are commands-run, not estimates. This lane does NOT re-derive the E-1
colocation verdicts (`t-coloc-components.md`, `t-coloc-composables-lib.md`, `t-coloc-backend.md`,
`t-coloc-src.md` own that census); it answers the narrower question those lanes don't: **which
doc *sections*, as written today, will the restructure orphan wholesale**, and where is the doc
already wrong *independent of* T.

---

## §0 — The six load-bearing findings (one line each; full evidence below)

1. **The E-1 colocation edict will invalidate `demo/CLAUDE.md` and `api/CLAUDE.md` as *documents*,
   not as sections** — both files' entire organizing principle (domain-grouped flat composables/lib
   dirs; layer-first `routes/services/repositories`) is the exact shape the edict dissolves; a
   post-restructure doc pass is a rewrite, not a diff.
2. **Root `CLAUDE.md`'s `src/` Structure block undercounts the tree by ~30 files** and omits an
   entire top-level directory (`src/subpaths/`, the O.W2 tree-shake split) that the same doc's own
   Build section alludes to but never structurally documents.
3. **`demo/DESIGN.md` §Layout cites `--pane-max: 44rem` / `--pane-min: 30rem`** — the shipped values
   are **32rem / 25rem** (S FINAL.md Ruling #1, landed `52c5fd4`). A NORMATIVE numeric law in the
   canonical design catalog is simply wrong.
4. **Root `CLAUDE.md`'s "`proof:*` scripts... retired as overfit" line is stale to the point of
   being false**: 11 `proof:*` scripts are live in `package.json` today, all authored in tranches
   O/Q — *after* the retirement date MEMORY.md records — and none of the six docs mention the
   comeback.
5. **The 5→6 `e2e` smoke-projects count** is wrong in root `CLAUDE.md` at two sites (build comment +
   Structure block) — `smoke-perf` (W3, frame-budget gates) is undocumented. S's own `FINAL.md §6`
   already named this as "doc-truth residual for the successor's first doc pass" — this lane is
   that pass's confirmation, not a new discovery.
6. **`demo/DESIGN.md` documents zero of the two S owner-ruling facilities that shipped since its
   last edit** — the `--alpha-checker` token (Ruling #5) and the `@lib/gamut-ink` webbing/hatch
   facility (Ruling #6) are both landed, both cross-component, both absent from the catalog whose
   entire job is to make exactly this kind of thing griddable without grep-archaeology.

---

## §1 — Root `CLAUDE.md`: the `src/` Structure block is the most stale section in the corpus

### F1 — `src/parsing/` documents 9 files, the tree has 15

**Evidence** (`CLAUDE.md:49-58` vs `find src/parsing -name '*.ts'`):

Documented: `index.ts, units.ts, color.ts, math.ts, utils.ts, animation-shorthand.ts, extract.ts,
serialize.ts, stylesheet.ts`.

Actual (15): the 9 above **+** `color-unit.ts`, `easing.ts`, `relative-color.ts`,
`scroll-timeline.ts`, `stylesheet-types.ts`, `syntax.ts` — six wholly undocumented modules.
`easing.ts` in `parsing/` is a real collision risk with top-level `src/easing.ts` (both documented
and undocumented respectively) that a reader has no way to disambiguate from the doc alone.

**Root cause**: the block hasn't been touched since roughly the G-era 8-module `conversions/`
split note it still cites verbatim; every wave since (H..S) that added a parser (relative-color
syntax, `scroll-timeline()` values, the `<syntax>` descriptor grammar, `color-unit.ts`) landed
without a CLAUDE.md pass, because no wave charter treats "backfill root CLAUDE.md" as a closeable
gate item.

**Owner**: joint (docs; no product-code stake).

**Cure direction**: this is not a line-by-line patch problem — six waves' worth of additions have
accreted since the doc's last true refresh, and the E-1 restructure (§3 below) is about to move
half of this tree's paths again. The gestalt cure is to stop hand-maintaining an enumerated file
listing here at all: root `CLAUDE.md` should describe `src/` at the *module-boundary* level (what
each subdirectory's public contract is, its dependency-flow rule, its subpath-budget membership)
and delegate the literal file inventory to the per-directory `CLAUDE.md`s (`src/parsing/CLAUDE.md`
etc.) — which already carry the "LoC counts intentionally omitted, `wc -l` is the source of truth"
discipline for numbers. Apply that same discipline to file *enumeration*: the per-directory doc is
the one place a file list is asserted, and it should point at itself, not be duplicated upward.

### F2 — `src/units/color/` documents ~10 files (+ conversions/), the tree has 17 (+ conversions/11)

**Evidence** (`CLAUDE.md:68-78` vs `find src/units/color -maxdepth 1 -name '*.ts'`):

Documented: `index.ts, constants.ts, conversions/, dispatch.ts, matrix.ts, normalize.ts, gamut.ts,
colorFilter.ts, contrast.ts, mix.ts`.

Actual top-level (17): the above **+** `base.ts`, `boundary.ts`, `color-names.ts`, `difference.ts`,
`gamut-raytrace.ts`, `okhsl.ts`, `serialize.ts`, `spaces.ts` — eight undocumented modules, several
load-bearing (`gamut-raytrace.ts` is the Q8/S.W1 raytrace gamut map the same CLAUDE.md's Dependencies
section brags about; `okhsl.ts` is a full perceptual-picker pair; `difference.ts` holds `deltaE2000`
+ `deltaEITP`; `base.ts`/`spaces.ts` are the W1-8 leaf split that `src/units/color/CLAUDE.md` itself
documents correctly — root just never absorbed it).

`conversions/` is documented as "8 focused `{from}2{to}` modules... hex, kelvin, cylindrical, lab,
oklab, transfer, xyz-extended, direct" — actual is **10** (+ index barrel = 11): the 8 named **+**
`ictcp.ts`, `jzazbz.ts` — the exact two spaces S.W1's 3.1.0 remediation promoted from conversion-pair
to full public `Color` subclass (`FINAL.md §1` W1 row, §3 publish table). The root doc's own
Conventions section (`as unknown as` note) was updated for that wave; the Structure block, sitting
20 lines above it in the same file, was not.

**Root cause**: same as F1 — no wave charter gates "backfill the src Structure block," so
per-directory `CLAUDE.md`s (which DO get touched, see `src/units/color/CLAUDE.md:1-81`, current and
accurate for this exact directory) drift away from the root copy that duplicates them.

**Owner**: joint (docs).

**Cure direction**: as F1 — collapse root's `src/` Structure block to name the subdirectories and
their one-line contracts, cite `src/units/color/CLAUDE.md` for the space/conversion inventory
instead of re-listing it. One inventory, one owner, no duplicate to rot.

### F3 — `src/subpaths/` (O.W2, tree-shake split) has zero Structure-block presence anywhere in root `CLAUDE.md`

**Evidence**: `find src/subpaths -name '*.ts'` → 7 files (`color.ts, easing.ts, math.ts, parsing.ts,
quantize.ts, transform.ts, units.ts`), each carrying an explicit budget-invariant header comment
(`src/subpaths/color.ts:1-16`: *"the parse-that-ZERO color subpath... gated by
`proof:subpath-budget`"*). This is a real, load-bearing, gated architectural feature — package.json
exposes `@mkbabb/value.js/color` etc. as subpath exports, verified by two live `proof:subpath-*`
scripts (F4 below) — and root `CLAUDE.md`'s Structure block, which enumerates every other top-level
`src/` directory down to individual files, has no entry for it at all. The only trace in the whole
root doc is the parenthetical `(flat layout, W12-unblocker)` on the `npm run build` line — which
describes the *dist* output shape, not the `src/subpaths/` source directory that produces it, so a
reader can't connect the two.

**Root cause**: O.W2 landed a genuinely new top-level `src/` directory with its own dependency
discipline (a barrel that must NOT import `parsing/` — the header comment is explicit about this)
and no doc pass followed. Because the directory has no `src/subpaths/CLAUDE.md` of its own either,
there is *no* documentation of this subsystem anywhere in the six-file corpus — the single largest
undocumented surface found in this audit.

**Owner**: src (docs) / joint.

**Cure direction**: `src/subpaths/` needs the same per-directory `CLAUDE.md` treatment as
`parsing/`, `units/`, `units/color/`, `transform/` already have — its job (parse-that-free budget
per subpath, which barrels feed which `package.json` export condition, the `proof:subpath-budget`
+ `proof:subpath-resolve` gates that guard it) is exactly the kind of non-obvious invariant those
sibling docs exist to carry. Root `CLAUDE.md`'s Structure block gets one new line for it, same
depth as its five siblings.

### F4 — root `CLAUDE.md`'s "`proof:*` retired as overfit" line is now misleading-to-false

**Evidence**: `CLAUDE.md:33-34` — *"The grep-based `proof:*` invariant scripts (G/H-era) were
retired as overfit; the disciplines they guarded stand by the type system + eslint + review."*
MEMORY.md's `feedback-proof-idiom-retired.md` entry (dated 2026-06-02) is stronger still: *"Never
re-introduce; enforce invariants structurally."*

`package.json:86-97` lists **11 live `proof:*` scripts today**: `proof:css-parity`,
`proof:subpath-budget`, `proof:subpath-resolve`, `proof:contrast-color`, `proof:gamut-alloc`,
`proof:grammar-2026`, `proof:serialize-fidelity`, `proof:grammar-q`, `proof:color-arch-q`,
`proof:round-trip-idempotent`, `proof:perf-target`, `proof:progress-honesty`. `git log` on two of
them: `proof-subpath-budget.mjs`/`proof-subpath-resolve.mjs` were authored in the O.W1+O.W2 commit
(2026-06-19); `proof-color-arch-q.mjs` in the tranche-Q 1.2.0 commit (2026-06-23) — **both dates
are after** the memory entry's 2026-06-02 retirement, and both tranches (O, Q) postdate N, which is
itself after the retirement was recorded.

So the idiom was **reintroduced twice** (O, then Q) after being explicitly killed and flagged
"never re-introduce" — and neither root `CLAUDE.md` nor MEMORY.md was ever updated to reflect that
the reintroduction happened, why the O/Q scripts don't repeat the "overfit" failure mode (they may
well be principled — each carries a `born-RED gate` docstring naming a specific tranche invariant,
unlike the grep-sweep genre that was killed), or that they are a *live, distinct* practice from the
one the doc says is dead.

**Root cause**: the retirement was recorded as a blanket verdict on a named era (G/H); no one
threaded the needle when the pattern came back under a different rationale (per-tranche born-RED
gates, not repo-wide grep sweeps) in O and Q. The doc line reads past-tense-terminal ("were
retired") to any reader, including an agent deciding whether it's safe to add or delete a
`proof:*` script — which is exactly the kind of decision this doc exists to gate correctly.

**Owner**: joint (docs; also a live discipline question for whichever tranche next touches a
`proof:*` script).

**Cure direction**: this needs a decision, not just a doc edit — either (a) the O/Q `proof:*`
scripts are a *different, sanctioned* idiom (per-invariant born-RED gates scoped to one tranche's
claim) that deserves its own named paragraph distinguishing it from the killed G/H grep-sweep
genre, with the 11 live scripts enumerated and each one's owning invariant cited; or (b) they are
the same disease under a new name and the "never re-introduce" ruling should fire against them.
Either way, the current text (silently contradicted by 11 live files) is the one outcome that
cannot stand.

### F5 — `docs/` and `assets/docs/` structure lines are stale (files moved, renamed, and grew)

**Evidence**: `CLAUDE.md:97-98` — `docs/  # color-theory.md, gamut-mapping.md` and
`assets/docs/  # 10 color space reference pages`.

Actual: `docs/color-theory.md` and `docs/gamut-mapping.md` no longer exist at that path — a
`docs: reorganize into docs/colors/, expand quantization` commit (`4220b53`) moved/renamed them to
`docs/colors/theory.md` and `docs/colors/gamut-mapping.md`, and added **two new files**,
`docs/colors/app.md` and `docs/colors/quantization.md` (the last of which documents `src/quantize/`
— itself listed three lines above in the very same Structure block, so the cross-reference is
sitting right there unexploited). `assets/docs/` holds **11** files, not 10 — `kelvin.md` is present
alongside the 10 named spaces.

**Root cause**: an unannounced docs reorg (no tranche letter in the commit message — likely
landed as repo hygiene alongside a color-tranche wave) never propagated to the one line in root
`CLAUDE.md` that names it.

**Owner**: joint (docs).

**Cure direction**: fold into the same F1/F2 cure — the Structure block should name the directory
and its *purpose* ("`docs/colors/` — the color-theory reference set consumed by `assets/docs/`'s
KaTeX pages") rather than an exact file list that a reorg silently invalidates.

---

## §2 — Per-directory `src/*/CLAUDE.md`: mostly current, one real gap

`src/units/CLAUDE.md` and `src/units/color/CLAUDE.md` (`src/units/color/CLAUDE.md:1-120`, read in
full) are **current and accurate** against the live tree — every file, every W1-8 split, every S.W1
remediation (ICtCp/Jzazbz not yet folded into the space table on line 89-105, see below) checks out
except one detail: the "Color spaces" table (`color/CLAUDE.md:89-105`) still lists **15** spaces and
does not include ICtCp or Jzazbz as rows, even though S.W1's 3.1.0 remediation shipped them as full
public space classes (`FINAL.md §1/§3`) alongside the 15, and the Files section above the table
*does* name `difference.ts`'s `xyzToICtCp`. The table is the one place in this otherwise
well-maintained doc that undercounts (15 documented vs the real total once ICtCp/Jzazbz are counted
as first-class spaces, consistent with F2's `conversions/` finding at root).

`src/parsing/CLAUDE.md` inherits F1's file-list drift verbatim (same 9-of-15 file list, since it's
presumably the source root's Structure block was copied from) — this is the one per-directory doc
that's as stale as root, not fresher than it.

`src/transform/CLAUDE.md` documents **only** `decompose.ts` (541 LoC) as the directory's entire
content. The tree has a second file: `src/transform/path.ts` (562 LoC — LARGER than the documented
file), a complete SVG-path geometry module (`getTotalLength`/`getPointAtLength` without a DOM,
adaptive Bézier arc-length subdivision, all path commands incl. arcs) authored for tranche-N W7
(`VJ-F1`, per its own header comment) as a keyframes.js motion-path consumer. This is not a minor
omission — it is a **doubling of the directory's actual surface** that the dedicated doc for that
exact directory has never recorded.

**Owner**: joint (docs) for the writing; the fact that it's undocumented is orthogonal to whether
`path.ts` itself needs anything (it doesn't, per this lane's zero-code-change scope).

**Cure direction**: `src/transform/CLAUDE.md` needs a second `## Files` entry + an `## Algorithms`
subsection for path sampling (arc-length table construction, binary search, the arc out-of-range
radius correction) mirroring the existing decompose-matrix treatment — this is a same-directory,
low-risk backfill, unlike the root-level restructuring F1-F3 call for.

---

## §3 — The E-1 colocation edict: which doc *sections* it orphans wholesale

The mandate's E-1 (§2) requires recursive colocation of components with their sub-components,
composables, and constants, with a residual `composables/`-style dir reserved for **truly**
module/global units, applied "abstracted... befitting" to the backend too. The sibling census
lanes (`t-coloc-components.md`, `t-coloc-composables-lib.md`, `t-coloc-backend.md`,
`t-coloc-src.md`) do the classification work; this lane's job is narrower: **name the doc sections
whose entire premise the eventual restructure invalidates**, so nobody spends effort line-editing
them when a wholesale rewrite is coming.

### F6 — `demo/CLAUDE.md`'s "Custom components" + "Composables" sections ARE the pre-restructure map

`demo/CLAUDE.md` (`demo/CLAUDE.md:1-224`, read in full) is organized exactly as the *current*,
soon-to-be-superseded tree is: a `## Custom components (@/components/custom/)` section itemizing
each feature subtree's flat `controls/`, `display/`, `visual/`, `composables/` split; a
`## Composables (@/composables/)` section broken into `auth/`, `color/`, `palette/` domain
buckets plus "Root composables + utils"; a `## Lib palette surface (@/lib/palette/)` section for
the 15-module `api/` facade. Per `t-coloc-composables-lib.md §0` (CL-1..CL-6), this exact shape —
domain-grouped module tiers split on a reactive-vs-pure axis (`composables/palette/` +
`lib/palette/`; `composables/color/` + `lib/{color-utils,gamut-ink,view-accents}`), app-shell
composables sitting in the shared tree, single-feature helpers (`prng.ts`, `quantize-worker.ts`)
living in the module tier instead of their feature — is precisely what E-1 dissolves.

This means **every one of those three `## `-level sections in `demo/CLAUDE.md` will be wrong the
day the restructure lands**, not just a stale line inside them: the composables move out of
`composables/{auth,color,palette}/` into feature subtrees per CL-1/CL-3/CL-4; the `lib/palette/`
API modules either fold into the same domain module as `composables/palette/` (CL-1's "dissolve
the reactive/pure split") or stay as a genuinely global HTTP-transport layer (the one piece that
plausibly survives as-is). The document's three-way taxonomy (components / composables-by-domain /
lib-by-feature) is itself the artifact of the pre-E-1 shape.

**Root cause**: `demo/CLAUDE.md` was authored (and has been incrementally maintained, see F7) as a
*location index* — "here is where file X lives" — which is exactly the kind of document a
recursive move-everything restructure obsoletes wholesale. A location index has no shape that
survives the thing it indexes being reshaped.

**Owner**: demo (docs) — gated on E-1's execution, not before it.

**Cure direction**: do NOT attempt to keep `demo/CLAUDE.md` current through the restructure
incrementally (T is DEVELOPMENT-only regardless — no code moves happen in this tranche). Instead,
the T corpus should carry an explicit successor-facing note (this lane's contribution) that
`demo/CLAUDE.md` is scheduled for a **full rewrite**, not a diff, the moment E-1's move lands —
and that rewrite should describe the tree at the *pattern* level (colocation is the law; here is
what "truly global" means and its short allow-list) rather than as an exhaustive per-composable
table, so the next reshaping doesn't repeat this exact drift.

### F7 — `api/CLAUDE.md`'s Structure section is the backend's identical case, plus its own pre-existing drift

`api/CLAUDE.md:5-63` documents `api/src/` **layer-first** — top-level `middleware/`, `repositories/`,
`services/{palette,admin,color,session}/`, `routes/{palettes,admin}/`, `validation/`, `errors/`,
`events/`, `format/`, `cache/`, `migrations/`. Per `t-coloc-backend.md §1`'s ground-truth table, this
is the exact "sliced layer-first (horizontal)" shape the backend transposition of E-1 (package-by-
feature / bounded-context modules) is designed to regroup — so, same as F6, this entire Structure
section is a pre-restructure snapshot, not a section with a stale line in it.

Independent of E-1, the section is **already** behind the live tree (drift the restructure isn't
responsible for): it lists `services/palette/` as "crud + crud-list + forks + votes + flags +
versions + oklab" — missing `ownership.ts`, `visibility.ts`, `diff.ts` (tranche-L's ownership/ETag
split + the atom-diff service, per `t-coloc-backend.md §1`'s table, which shows all three live);
`routes/palettes/` is documented as "crud + forks + votes + flags + versions (+ index barrel)" —
missing `diff.ts` and `publish.ts`; `migrations/` is documented as only `check.ts` — the tree also
has `migrate-soft-delete.ts`. So this file needs the F1-class ordinary backfill even before the
architectural rewrite F6-class reasoning applies to it.

**Owner**: joint (docs).

**Cure direction**: same as F6 — schedule the rewrite for post-restructure; in the interim, if a
non-T lane touches `api/CLAUDE.md` for any reason, the three missing-module items above are a
same-day mechanical fix independent of E-1.

### F8 — root `CLAUDE.md`'s path-alias table is the one structural section E-1 does NOT threaten

For completeness: `@src/*`, `@styles/*`, `@components/*`, `@utils/*`, `@lib/*`, `@composables/*`,
`@assets/*` (`CLAUDE.md:134-141`) match `tsconfig.demo.json:28-37` verbatim today, and none of them
name a path *inside* the directories E-1 reshapes — they resolve to the directory roots
(`demo/@/composables/`, `demo/@/lib/`, etc.), which persist as import-alias targets regardless of
what recursive colocation does to their *contents*. This section is accurate and durable; it is
flagged here only to draw the contrast with F6/F7 — not every doc section touching a
restructure-adjacent directory is invalidated, only the ones that enumerate contents.

---

## §4 — `demo/DESIGN.md` currency vs the S register changes

`demo/DESIGN.md` (289 lines, read in full) is a well-maintained, NORMATIVE-law-carrying document —
its three-voice type law, card-lock law, and six depth laws are current and, on spot-check, accurate
against `style.css`. Two categories of drift found:

### F9 — §Layout's pane-clamp numbers are wrong (a NORMATIVE section citing false values)

**Evidence**: `demo/DESIGN.md:259` — *"`--pane-min: 30rem` / `--pane-max: 44rem`..."* Live
`demo/@/styles/style.css:316-318`:

```css
--pane-min: 25rem;
--pane-max: 32rem;
--pane-gap: clamp(0.5rem, 1.25vw, 1.618rem);
```

This is **S FINAL.md's Ruling #1** ("Card width — about 1/3 smaller… maybe 1/4"), landed `52c5fd4`
(`OWNER-RULING-2026-07-05-card-width.md §2`, `FINAL.md §4` row 1). The cure changed both tokens
(44→32, and — undocumented anywhere in the ruling record itself, worth noting — 30→25 on
`--pane-min` too); `DESIGN.md §Layout` still asserts the pre-ruling values verbatim, including the
derived doc-comment above them in `style.css:307-308` ("`--pane-min` is the floor, `--pane-max` the
per-card ceiling") which DESIGN.md paraphrases accurately in *prose* while getting the *numbers*
wrong.

**Root cause**: the S.W4 ruling implementation touched `style.css` directly (correctly — that's the
source of truth for the token) but the ruling's own record docs (`OWNER-RULING-2026-07-05-card-
width.md`) and `FINAL.md` narrate the change without anyone back-porting the new numbers into
`DESIGN.md §Layout`, which is the document whose entire job is to be the numbers' canonical home
for a component author who doesn't want to grep `style.css`.

**Owner**: demo (docs).

**Cure direction**: this is a one-line mechanical correction (32rem/25rem), but the fact that it
survived a `FINAL.md`-documented ruling, a probes re-verification at close (`w9-pi-review.md §2`,
which explicitly re-measured "512 px at 1440" against the *new* geometry), and this audit's read
without being caught is itself the finding: `DESIGN.md`'s numeric claims need a closing-ceremony
line item ("re-verify DESIGN.md against every landed owner ruling") the way `FINAL.md §6.2` already
demands re-measuring perf numbers — a design-token catalog is exactly as gate-worthy as a perf
budget, and should be checked by the same discipline at close, not left to incidental audit.

### F10 — Two ratified, shipped S-era facilities are entirely absent from the catalog

**Evidence**: `FINAL.md §4` Ruling #5 (alpha-slider checkerboard — "subtle, idiomatic") landed the
`--alpha-checker` token (`style.css:274`, consumed at `GradientStopEditor.vue:176,193,194,220`,
`GradientEasingEditor.vue:188`); Ruling #6 (variance + "flesh out the webbing facility") landed the
`@lib/gamut-ink` module (`WEBBING`/`SECOND_NET` token tables, `drawHatch`/`drawSecondNet`/
`createInkProbe`, consumed by `gamutOverlayPaint.ts`, `perceivedSpacePaint.ts`,
`PerceivedSpacePlate.vue`). Both are cross-component, both are the literal subject of an owner
ruling with its own record doc, and neither has a line anywhere in `demo/DESIGN.md`'s § Color, §
Surfaces, or a new section of its own — despite `demo/DESIGN.md`'s own stated purpose ("...without
grep-archaeology").

**Root cause**: same class as F9 — the ruling implementation commits (`695cca1` for the checker,
`6955fca`/`fe30d68` for the webbing facility) landed the code + the ruling record doc, but no one
folded the *catalog* entry back in. Two separate rulings, same omission pattern — this looks
systemic (every S.W4-close-era ruling skipped the DESIGN.md backfill step), not incidental.

**Owner**: demo (docs).

**Cure direction**: add a `§ Gamut ink / alpha ground` (or fold into the existing §Color "gamut
ink/paper pairs" paragraph, which already documents the *sibling* truth-line facility from the same
wave and would be the natural neighbor) documenting: the `--alpha-checker` token's recipe + its
"one ground, composed under every alpha ramp" rule (so a future alpha surface doesn't reinvent a
second checkerboard); and the `@lib/gamut-ink` webbing/hatch/second-net table as the ONE home for
that ink vocabulary (paralleling how §Color already documents `spectrumLuma` as "one function,
never a copied constant" for the WatercolorDot/overlay luma split — the same discipline, unapplied
to its own sibling facility two paragraphs later).

---

## §5 — MEMORY.md vs the live tree

### F11 — `composables/color/` count: memory says 2, the tree has 6

**Evidence**: MEMORY.md's "Shared composables in `demo/@/composables/`" line (2026-06-11 entry) —
*"`color/` (2)"*. Live: `demo/@/composables/color/` has 6 files — `useAtmosphere.ts`,
`useAtmosphereBoot.ts`, `useColorPersistence.ts`, `useColorPipeline.ts`, `useContrastSafeColor.ts`,
`useViewAccents.ts`. Four of the six (`useAtmosphere`, `useAtmosphereBoot`, `useColorPersistence`,
`useViewAccents`) are S.W2/S.W5/S.W6 landings — after the memory entry's stated verification date.
`palette/` (13) and `auth/` (4) counts in the same memory line DO still match the live tree exactly.

**Root cause**: ordinary memory drift — the entry was accurate when written (pre-S) and three S
waves added to `color/` without the memory file being re-verified. Unlike the CLAUDE.md findings
above, MEMORY.md is not meant to be authoritative documentation (it's session-continuity notes),
so this is lower stakes, but it is the exact "memory-vs-tree drift" this lane was asked to surface,
and `demo/CLAUDE.md`'s own dedicated `### color/` composables table (`demo/CLAUDE.md`, under
`## Composables`) has the **identical** gap — it lists only `useColorPipeline.ts` and
`useContrastSafeColor.ts`, missing the same four files. This is the more load-bearing half of the
finding: the *authoritative* per-directory doc, not just the memory scratch file, undercounts its
own subject 2-of-6.

**Owner**: demo (docs).

**Cure direction**: `demo/CLAUDE.md`'s `### color/` table needs the four missing rows (the atmosphere
+ persistence + view-accents composables are exactly the subsystem `t-coloc-composables-lib.md`'s
CL-5 identifies as "App-shell-private masquerading as generic `composables/color/`" — so this
backfill and that lane's colocation cure are the same motion; don't do the doc fix twice). The root
composables table separately misses `useDevicePixelSnap.ts` (7 root files exist; 6 are documented).

### F12 — MEMORY.md's test-suite count (1607/36 files) vs the live 2158/68 — self-hedged, lower priority

**Evidence**: MEMORY.md "Test Suite" section — *"vitest: 1607 passing, 36 files"*. Live: `npm test`
→ **2158 passing, 68 files** (matches `S/FINAL.md`'s recorded close numbers exactly). The memory
entry already carries its own caveat ("counts drift — the per-tranche FINAL.md is authoritative"),
so this is not a doc-truth defect in the same sense as F9-F11 — it's an intentionally-stale
snapshot that says so. Noted for completeness per the lane charter, not escalated.

**Root cause**: n/a — self-aware staleness, working as designed.

**Owner**: n/a.

**Cure direction**: none needed; the hedge already does the job. If anything, the six `CLAUDE.md`
files' "exact counts belong in FINAL.md" discipline (root `CLAUDE.md:36-38`) is the pattern this
MEMORY.md entry should have used from the start (a pointer, not a number) — worth propagating for
future memory entries that record any count, not just this one.

### F13 — the 5→6 e2e-projects drift: confirmed, still uncured, at two sites

**Evidence**: root `CLAUDE.md:28,89-94` (twice: the `npm test` command-block comment, and the
Structure block's `e2e/smoke/` itemization) lists 5 projects — `smoke / smoke-admin / smoke-mobile /
smoke-reactivity / smoke-safari`. `playwright.config.ts:129-239` defines **6**: the 5 above **+**
`smoke-perf` (the W3 `54135fd` frame-budget project — `accent-contrast-guard`, and the perf specs
under `e2e/smoke/perf/`). `S/FINAL.md §6` already named this exact gap in its own words: *"e2e is
now 6 projects (CLAUDE.md 'S projects' and `waves/S.W9.md §Hard gate 7` are stale on this count —
doc-truth residual for the successor's first doc pass; recorded, not silently patched here)."*

**Root cause**: S deliberately deferred the fix to "the successor's first doc pass" rather than
patch it mid-close (consistent with S's ι-integrity discipline of not making unscoped doc edits
inside a scoped commit). T is that successor's audit stage; this lane is the confirmation the
mandate asked for. It has not yet been cured anywhere in the six-file corpus.

**Owner**: joint (docs) — purely mechanical once someone is authorized to touch root `CLAUDE.md`
(this lane is DEVELOPMENT-only and does not do that).

**Cure direction**: two one-line edits (the comment + the Structure-block itemization), both
already fully specified by `S/FINAL.md §6`'s own text — no design judgment required, just the
authorization this tranche withholds by charter.

---

## §6 — Summary table (finding → owner → doc(s) affected → class)

| # | Finding | Owner | Doc(s) | Class |
|---|---|---|---|---|
| F1 | `parsing/` 9-of-15 files documented | joint | root `CLAUDE.md` | ordinary drift |
| F2 | `units/color/` 10-of-17 (+8-of-11 `conversions/`) documented | joint | root `CLAUDE.md` | ordinary drift |
| F3 | `src/subpaths/` (7 files) wholly undocumented | src/joint | root `CLAUDE.md` (+ needs own file) | coverage gap |
| F4 | "`proof:*` retired" is contradicted by 11 live O/Q scripts | joint | root `CLAUDE.md`, MEMORY.md | stale precept claim |
| F5 | `docs/color-theory.md`/`gamut-mapping.md` moved+expanded, uncredited | joint | root `CLAUDE.md` | ordinary drift |
| — | `units/color/CLAUDE.md` space table omits ICtCp/Jzazbz | joint | `src/units/color/CLAUDE.md` | ordinary drift (minor) |
| — | `transform/CLAUDE.md` omits `path.ts` (562 LoC, doubles the dir) | joint | `src/transform/CLAUDE.md` | coverage gap |
| F6 | `demo/CLAUDE.md`'s components+composables sections ARE the pre-E-1 map | demo | `demo/CLAUDE.md` | **structural obsolescence** |
| F7 | `api/CLAUDE.md`'s layer-first Structure IS the pre-E-1 map (+ own drift) | joint | `api/CLAUDE.md` | **structural obsolescence** + ordinary drift |
| F8 | path-alias table is E-1-durable (contrast case, not a finding) | — | root `CLAUDE.md` | confirmed-current |
| F9 | `DESIGN.md` §Layout pane-max/min values wrong (44/30 vs 32/25rem) | demo | `demo/DESIGN.md` | **normative-law falsity** |
| F10 | `DESIGN.md` omits `--alpha-checker` + `@lib/gamut-ink` facilities | demo | `demo/DESIGN.md` | coverage gap |
| F11 | `composables/color/` 2-of-6 documented (memory AND CLAUDE.md) | demo | `demo/CLAUDE.md`, MEMORY.md | ordinary drift |
| F12 | test-count memory entry stale but self-hedged | n/a | MEMORY.md | benign (no action) |
| F13 | 5→6 e2e projects, confirmed uncured | joint | root `CLAUDE.md` | confirmed known drift |

**Coverage-completeness note**: this lane read all six live `CLAUDE.md` files in full
(root, `demo/`, `api/`, `src/units/`, `src/parsing/`, `src/transform/`, `src/units/color/` — seven,
correcting the charter's "root+demo+src" framing which undercounts by one: `api/CLAUDE.md` exists
and is in-scope by the root doc's own cross-reference to it) and `demo/DESIGN.md` in full. It did
not re-audit `docs/tranches/**` prose (out of scope — those are dated forensic records, not living
reference docs) or `docs/colors/*.md`/`assets/docs/*.md` content currency (only their *existence and
location*, per F5) — a content-accuracy pass on the color-theory reference set is a distinct,
narrower lane if ever wanted.
