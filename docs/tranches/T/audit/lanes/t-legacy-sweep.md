# t-legacy-sweep — the E-3 "NO legacy code" repo-wide fresh sweep

**Lane**: `t-legacy-sweep` (forensics / development-only) · **Substrate**: `tranche-t` @ HEAD
(source tree identical to `cc4f4fa` / `tranche-s-close` — the T corpus to date is docs-only, so
every citation below reads the S-close-landed tree exactly). **Scope**: dead exports, unused
files, commented-out blocks, deprecated patterns, compat residue, marker-commented producer
restatements (each with an excise-or-retire verdict), the alpha-checker MARKER by name, the W7
seal/mobile vestige class, and unused deps since the W0-9 dependency-excision ledger.

**Method**: no `proof:*`/grep-invariant script was written or revived (`feedback-proof-idiom-
retired` binds) — every candidate below was found by targeted grep/AST-shaped search, then
**verified live**: exact `file:line` read, cross-checked against `../glass-ui` source **and**
`dist` where a MARKER cites a producer retire-condition, cross-checked against the W0-9 ledger
and CLAUDE.md/CHANGELOG.md where a claim-vs-reality gap was suspected, and cross-checked against
the sibling `t-coloc-*` lanes to avoid duplicate authorship (two findings below corroborate
`t-coloc-components.md` F8/F9 and `t-coloc-backend.md` F7 independently rather than re-deriving
them from scratch — cited as such, not re-claimed).

**Headline reading**: the codebase is clean at the *file* level (a repo-wide "does any `.vue`/
`.ts` basename have zero real importer" sweep across `demo/` + `src/` returned **zero** hits once
markdown-prose false-positives were excluded — S.W9's W0-6/W0-9 hygiene holds for whole files).
The residue that survives is narrower and more interesting: **two self-admittedly-dead
components no file-level sweep should have missed** (found, not by me first — corroborated),
**one fully orphaned type trio** sitting beside load-bearing code in the same file, **one
genuinely unused devDependency mis-bucketed at the W0-9 ledger**, **a documentation-vs-reality
contradiction about the very "no legacy" claim CLAUDE.md itself makes** (12 `proof:*` npm [AMENDED-AT-HARDENING: count reconciled 13→12 — `grep -c '"proof:' package.json` = 12; h-seam-fleet-resume F3]
scripts + a dead one-shot script), and **one self-documented dead parameter** threaded through
three files for zero purpose. None of these are "quick patches" — each has a named excise-or-
retire verdict below.

---

## §1 Dead exports

### F1 — Orphaned type trio in `src/units/color/constants.ts:340-344` (EXCISE)
**Evidence**: `ColorSpaceRanges` (340), `ColorSpaceDenormUnits` (341), `ColorComponent<C>` (344)
— three `export type` aliases, immediately adjacent to the load-bearing `getColorSpaceBound`/
`getColorSpaceDenormUnit` helpers (347-386) the same G.W2 Lane A comment block introduces. Full-
repo grep (`src/`, `demo/`, `test/`, `api/src/`) for each name turns up **only their own
declaration line** (`ColorSpaceDenormUnits`, `ColorSpaceRanges`) or a declaration + one comment
mentioning the name (`ColorComponent`) — zero actual type-position usages anywhere, including
inside the very functions the surrounding comment says they're "for callers" of:
`getColorSpaceBound`/`getColorSpaceDenormUnit` both take `component: string` (deliberately
loose per the same comment block, since components are dynamic) and never touch
`ColorComponent<C>`. None of the three is re-exported by name from the public barrel
(`src/index.ts:123-131`'s `export type { ColorSpace, WhitePoint, ColorSyntaxFamily,
ColorFunctionForm }` — a 4-item list that omits all three) or `src/subpaths/color.ts`. Contrast
with the sibling `ColorSpaceBound` interface (347-350) declared in the same block: that one *is*
used, four times, as the real return/parameter type of the two load-bearing functions — it's
correctly kept, just needlessly `export`ed beyond its own file (a style nit, not a finding).
**Root cause**: `ColorComponent<C>` was authored as a convenience type for "callers that DO have
a concrete space literal" (the comment's own words) — a speculative API surface written ahead of
any caller, and its two supporting aliases (`ColorSpaceRanges`, `ColorSpaceDenormUnits`) exist
solely to feed it. No caller ever materialized; the pair became a closed loop referencing only
each other.
**Excise-or-retire verdict**: **EXCISE all three.** This is not "public API nobody happens to use
internally" (the normal, healthy shape for a published library's export surface) — it's
unreachable even from *outside* the library, since the public barrel doesn't carry the names.
Dead in both directions: not consumed, not exported. If a concrete `(space, component)` typed
accessor is wanted later, author it against a real call site (E-3: no speculative retention).

## §2 Dead / orphaned files (corroborating `t-coloc-components.md` F8/F9, independently re-verified)

### F2 — Two zero-importer `.vue` components (EXCISE)
**Evidence**: `demo/@/components/custom/palette-browser/BulkActionToolbar.vue` (35 LoC) and
`demo/@/components/custom/palette-browser/SortFilterMenu.vue` (52 LoC). A repo-wide, code-only
grep (`--include=*.vue --include=*.ts`, markdown excluded to kill the false-positive class my
first pass hit) across `demo/`, `src/`, `test/` returns **zero import statements** for either.
`BulkActionToolbar` surfaces only in prose: `demo/CLAUDE.md:62` (listed as a "utility primitive"),
`demo/DESIGN.md:86` (cited as a `.glass-floating` consumer), and a rueful comment at
`demo/@/lib/palette/api/admin-palettes.ts:11` — *"consumers (`BulkActionToolbar` is present but
nothing fed it batch calls)"* — i.e., the codebase already knows this file is unwired.
`SortFilterMenu` surfaces only at `demo/CLAUDE.md:59` (same table). This independently confirms
`t-coloc-components.md` F8 (same two files, same verdict) — I re-derived it from a clean repo-wide
sweep rather than taking that lane's word, and it holds.
**Root cause** (per F8): superseded during a prior palette-browser refactor, never deleted; the
component-table entries in `demo/CLAUDE.md`/`DESIGN.md` were never pruned either, so the docs
still advertise dead surface as live.
**Excise-or-retire verdict**: **EXCISE both** `.vue` files, and prune their `demo/CLAUDE.md:59,62`
/ `demo/DESIGN.md:86` table rows in the same pass (leaving the doc entries after the file is gone
would recreate exactly this class of drift). Confirm zero dynamic/template-string references at
delete-time (grep already clean here).

### F3 — `dark-mode-toggle/` is a directory wrapping a 2-line re-export (DISSOLVE)
**Evidence**: `demo/@/components/custom/dark-mode-toggle/index.ts` is its *only* file, 2 lines:
`export { DarkModeToggle } from "@mkbabb/glass-ui/controls"; export { useGlobalDark } from
"@mkbabb/glass-ui/dark";`. Four consumers (`demo/color-picker/App.vue:147`,
`demo/@/components/custom/markdown/composables/useMarkdownColors.ts:1`,
`demo/@/components/custom/dock/menus/ProfileSection.vue:8`,
`demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:6`) all import from
`@components/custom/dark-mode-toggle` — a folder that owns zero component/composable logic of
its own. Corroborates `t-coloc-components.md` F9 independently (verified the file count, the
2-line content, and all 4 consumer sites myself).
**Root cause**: an alias folder surviving from before the toggle moved wholesale into glass-ui
as a first-class primitive (`feedback_glass_ui_first_class.md` names exactly this pattern as a
thing to avoid going forward — this is the retroactive case).
**Excise-or-retire verdict**: **DISSOLVE.** Repoint the 4 consumers directly at
`@mkbabb/glass-ui/controls` / `@mkbabb/glass-ui/dark`; delete the folder. Trivial blast radius
(4 files, mechanical import-path edit).

## §3 Dead / self-admitted-dead plumbing

### F4 — `savedPalettes` on `PaletteDialogStateDeps`: threaded through 3 files, explicitly voided, never used (EXCISE)
**Evidence**: `demo/@/components/custom/palette-browser/PaletteDialog/composables/
usePaletteDialogState.ts:45` declares `savedPalettes: Ref<Palette[]>` on the deps interface, with
its own JSDoc admitting *"kept on the signature for source-compat. Currently unused inside the
composable (filteredSaved lives on usePaletteManager post-D.W3 Lane A); retained so future
dialog-local derivations can plug in."* Line 56 backs that with a literal
`void deps.savedPalettes; // see JSDoc` — the parameter is accepted and then explicitly discarded
in the same file that declares it. The caller pays the real cost of this fiction:
`PaletteDialog.vue:233` writes `savedPalettes: pm.savedPalettes,` purely to satisfy the unused
interface field, threading a full reactive `Ref<Palette[]>` through a call boundary for a
composable that immediately voids it.
**Root cause**: a D.W3 Lane A migration moved the real logic (`filteredSaved`) to
`usePaletteManager` and left the old signature parameter in place "for future derivations" that
never materialized — the textbook shape of speculative-retention legacy E-3 names explicitly.
**Excise-or-retire verdict**: **EXCISE** the `savedPalettes` field from `PaletteDialogStateDeps`,
the `void deps.savedPalettes` line, and the `PaletteDialog.vue:233` pass-through. If a future
dialog-local derivation over saved palettes is actually needed, it can inject `usePaletteManager`
directly at that point — not resurrect a parameter kept "just in case" today.

## §4 Deprecated pattern / compat-residue documentation contradiction

### F5 — 12 `proof:*` npm scripts [AMENDED-AT-HARDENING: 13→12] + a dead one-shot script contradict CLAUDE.md's own "retired" claim (corroborating `t-coloc-backend.md` F7, independently verified against CI)
**Evidence**: `CLAUDE.md:33` states *"The grep-based `proof:*` invariant scripts (G/H-era) were
retired as overfit."* That sentence is **literally true of its own referent** — I cross-checked
`CHANGELOG.md:508` (a **prior, now-fully-gone** G/H-era batch: `proof:no-deprecated`,
`proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`,
`proof:no-bare-builtins` — **none of these six names exist in `package.json` today**, confirming
that specific retirement is real and complete). But `package.json`'s current `scripts` block
still wires **12** `proof:*` entries [AMENDED-AT-HARDENING] from a **later, O/Q-era, behavioral** (not grep-based) batch:
`proof:css-parity`, `proof:subpath-budget`, `proof:subpath-resolve`, `proof:contrast-color`,
`proof:gamut-alloc`, `proof:grammar-2026`, `proof:serialize-fidelity`, `proof:grammar-q`,
`proof:color-arch-q`, `proof:round-trip-idempotent`, `proof:perf-target`,
`proof:progress-honesty` (12 scripts backing 11 files under `scripts/` + one vitest-driven
entry). Each script's own header self-declares a **closed** tranche it gated (`proof-css-
parity.mjs`: *"value.js O.W0 born-RED gate"*; `proof-subpath-budget.mjs`: O.W2;
`proof-round-trip-idempotent.mjs`: O.W5 / inv-O-2; `proof-perf-target.mjs`: O.W6;
`proof-progress-honesty.mjs`: *"value.js VJ-P.W0 born-RED gate"* — literally asserts the O
tranche's `PROGRESS.md` header isn't stale, a check with zero standing purpose once O closed).
Grep of `.github/workflows/*.yml` for `proof:` returns **zero matches** — none of the 12 fire in
CI. `scripts/generate-favicon.mjs` (a watercolor-favicon generator) has **zero references**
anywhere (not in `package.json`, not in any workflow, not in `deploy.sh`/`dev.sh`) — a manual
one-shot whose artifact (if ever run) is presumably already committed. This corroborates
`t-coloc-backend.md` F7's finding independently (I verified the CI-absence and the CHANGELOG
cross-reference myself, which sharpens F7's claim: the CLAUDE.md sentence is true of the batch it
names and false-by-omission about the batch that superseded it).
**Root cause**: the grep-based invariant idiom was deliberately killed
(`feedback-proof-idiom-retired`), but a structurally different *behavioral* gate class (exercising
the built `dist/value.js`, not source-grepping) kept accreting under the same `proof:` npm-script
prefix every tranche after — and no tranche close swept the accretion, because the retirement
note only ever named the grep idiom.
**Excise-or-retire verdict — split by what each script actually still tests**, not a blanket
purge:
- **RETAIN, reclassify** (`proof:css-parity`, `proof:round-trip-idempotent`,
  `proof:perf-target`, `proof:serialize-fidelity`): these exercise real, tranche-independent
  invariants over the *built artifact* (semantic round-trip idempotence, parser throughput ratio,
  gradient-direction parsing) that a normal `vitest` run against source doesn't cover (dist-level
  behavior). Promote out of the `proof:` ceremony naming into the standing CI-invoked test/build
  gate (e.g. a `test:dist` script actually wired into `ci.yml`), stripped of the tranche-ID framing.
- **EXCISE** (`proof:progress-honesty`): tests a fact about a closed tranche's own progress-doc
  string; zero ongoing invariant once O closed. Pure ceremony residue.
- **EXCISE or fold into a standing unit test** (`proof:subpath-budget`, `proof:subpath-resolve`,
  `proof:color-arch-q`, `proof:grammar-q`, `proof:contrast-color`, `proof:gamut-alloc`,
  `proof:grammar-2026`): each guards a *specific historical refactor* (the O.W2 subpath split, the
  Q-era color-arch/grammar work) that is now a permanent, unconditional architectural fact, not a
  live risk — per CLAUDE.md's own standing policy, "enforce invariants structurally," these belong
  as ordinary `test/*.test.ts` assertions (if the invariant is still worth guarding at all) rather
  than a separate ceremonial `proof:` category keyed to a tranche name nobody will recognize in a
  year.
- **EXCISE** `scripts/generate-favicon.mjs` if confirmed no consumer intends to regenerate the
  favicon from it (verify at excise-time, per F7's own caveat).
- **Fix the CLAUDE.md sentence** either way — today it reads as a blanket "no legacy proof
  scripts remain" claim that a fresh contributor would reasonably (and wrongly) trust; it needs to
  name *which* batch retired, or the batch that superseded it needs to actually be gone.
**Owner**: joint (demo/`src` build-tooling — `scripts/`, `package.json`, `CLAUDE.md` all live at
repo root, not a producer surface).

## §5 Marker-commented producer restatements — inventoried with retire-conditions, both LIVE-VERIFIED against `../glass-ui` today

The mandate names "the alpha-checker MARKER" by name; there are exactly **two** literal
`MARKER`-tagged sites in the tree (grep for the literal token `MARKER` across `demo/`, `src/`,
`api/`, excluding `node_modules`/generated `.d.ts`), both in `demo/@/styles/style.css`. I read
both against glass-ui's **current** source (`../glass-ui` @ 4.2.0) and **dist**
(`../glass-ui/dist/glass-ui.css`) to determine whether either retire-condition is now met.
**Verdict: neither is retirable yet** — both are correctly-scoped, currently-necessary producer
restatements, not legacy in the pejorative sense; they are recorded here as the inventory the
mandate asks for, with the live status that makes the "not yet" verdict falsifiable next sweep.

### F6 — `.underline-tabs` override (`style.css:476-484`, A.W2 / `coordination/Q.md §3`) — STAYS, retire-condition partially addressed but not met

[AMENDED-AT-HARDENING — h-evidence-sweeps HES-2: the producer's "underline register" is carried by
`TabsIndicator.vue` and is a PILL-PLATE indicator, not a border-bottom underline — the verdict
(MARKER STAYS) is unchanged, but the P7 base-Tabs `underline`-variant ask should name
`TabsIndicator.vue` so the producer sizes the right mechanism.]
**Evidence**: the marker's stated retire-condition is *"retired once glass-ui ships a Tabs
`underline` variant."* Checked live: glass-ui's base `Tabs`/`TabsList`/`TabsTrigger` triad
(`../glass-ui/src/components/ui/tabs/*.vue` — the exact component `PaletteDialog.vue:27`'s
`.underline-tabs` class targets) carries **no** `underline` variant prop anywhere in
`TabsList.vue`/`TabsTrigger.vue`. glass-ui *has* since grown an `--underline` modifier — but only
on the separate custom component `SegmentedTabs.vue`
(`../glass-ui/src/styles/segmented-tabs.css:295` `.segmented-tabs--underline`), which is a
different component with a different API (`variant="underline"` prop on `<SegmentedTabs>`, not a
`data-state="active"` attribute-selector override on the base `<Tabs>` primitive the demo
actually renders here). Swapping `PaletteDialog.vue`'s `<Tabs>` tree for `<SegmentedTabs>` is a
real migration, not a drop-in — so the retire-condition, read literally, is **not** met by the
component the override actually attaches to.
**Excise-or-retire verdict**: **STAYS**, but the inventory surfaces a live ask: either (a) file a
sharper producer ask for an `underline` variant on the *base* `Tabs` (matching the literal
retire-condition as originally written), or (b) rule explicitly that `SegmentedTabs --underline`
IS the intended replacement and plan the `<Tabs>`→`<SegmentedTabs>` migration at
`PaletteDialog.vue:27` as a T-corpus item (cross-ref: `t-search-tabs.md`'s T-20 already treats a
different `SegmentedTabs` pilling defect on this same producer surface — worth reconciling in one
producer request, not two).

### F7 — `.glass-slider[data-variant="spectrum"] .slider-range` backdrop-filter restatement (`style.css:486-501`, S owner-ruling 2026-07-05, "alpha-checker lane") — STAYS, retire-condition CONFIRMED not met
**Evidence**: the marker states the override is a byte-level restatement of glass-ui's own
`Slider.vue` source rule, needed because *"the DIST minification drops the UNPREFIXED
`backdrop-filter: none` leg, keeping only `-webkit-backdrop-filter: none`."* Retire-condition:
*"when the glass-ui dist keeps the unprefixed leg; the W8 /slider consume is the checkpoint."*
Checked live: `../glass-ui/src/components/ui/slider/Slider.vue:421-422` source **does** carry
both `backdrop-filter: none;` and `-webkit-backdrop-filter: none;` for
`.glass-slider[data-variant="spectrum"] .slider-range`. But `../glass-ui/dist/glass-ui.css`
(the actual npm-published artifact the demo consumes) minifies that selector to
`.glass-slider[data-variant=spectrum] .slider-range[data-v-af91810e]{-webkit-backdrop-filter:
none;box-shadow:none;background:0 0}` — **the unprefixed leg is still absent**, confirmed
byte-for-byte today. This is consistent with the standing task-tracker state: S.W8 ("5.0.0 ADOPT
— trigger-gated") has **not fired** (glass-ui is still 4.2.0, no v5 tag) — the checkpoint this
marker names as its retirement gate genuinely hasn't arrived yet.
**Excise-or-retire verdict**: **STAYS, correctly gated.** Nothing to do here beyond confirming (as
this sweep just did) that the gate is honest — re-check at the next glass-ui dist bump / the W8
adopt window, per the marker's own instructions. This is the sweep's one "producer restatement
inventoried and reconfirmed necessary" result, included for completeness since the mandate names
it by lane ("the alpha-checker MARKER").

## §6 Unused dependency (since the W0-9 ledger)

### F8 — `globals` devDependency: fully unused, mis-bucketed at the W0-9 dependency-excision ledger (EXCISE)
**Evidence**: `package.json` devDependencies lists `globals`. Repo-wide grep for any import of it
(`from "globals"`, `require("globals")`) across every `.js`/`.mjs`/`.cjs`/`.ts` config and source
file returns **zero** hits. The only plausible consumer, `eslint.config.js`, imports exactly four
things (`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-vue`,
`vue-eslint-parser`) — `globals` is not among them, and never has been: `git show
6ca2046:eslint.config.js` (the file's very first commit) already omits it. The W0-9 dependency-
excision ledger (`docs/tranches/S/audit/w0-9-dependency-ledger.md:42`) KEEPS it, but only inside
a **bucket justification** — `` `globals`, `@types/node` `` grouped under *"the build/lint/type/
test ladder"* — not a per-dependency import check. That bucket-level KEEP is where the miss
entered the record; it has ridden every wave since (S.W1-W9, now T) undetected because nothing
re-verified the bucket's members individually.
**Root cause**: a ledger justification written at the bucket level ("these are all part of the
tooling ladder") papered over one member of the bucket that was never actually wired to anything
— a false-negative in the very sweep whose job was to catch this class of thing.
**Excise-or-retire verdict**: **EXCISE** `globals` from `package.json` devDependencies (`npm
uninstall --save-dev globals`); no source change needed since nothing imports it. Lowest-blast-
radius finding in this lane — one line, zero consumers, zero migration.

## §7 Minor stale documentation residue (recorded, not headline)

### F9 — Stale manual-install instruction in `test/color-picker-lifecycle.test.ts:10-11`
**Evidence**: *"DEPENDENCY NOTE: These tests require @vue/test-utils to be installed: npm install
--save-dev @vue/test-utils"* — `@vue/test-utils` has been a real, declared `package.json`
devDependency since the **same original commit** that added this test file (`git log -p` shows
both landing together); the note has never been true-as-a-gap since. Harmless (nobody needs the
manual step — `npm install` already covers it) but a stale instruction that outlived its
condition.
**Excise-or-retire verdict**: **RETIRE the comment.** Trivial, but named per the lane's "inventory
each" instruction rather than silently dropped.

### F10 — `functionIdentityValue`'s `argIndex` parameter — reviewed, NOT a finding
**Evidence**: `src/units/utils.ts:73-80` accepts `argIndex?: number` and immediately
`void argIndex;`s it, with an explicit doc comment: *"accepted for symmetry with multi-argument
functions but is currently unused: every supported function's positional arguments share one
identity scalar."* Superficially the same shape as F4 (accept-and-void), but distinguished on
inspection: this is a **public library function's** forward-compatible parameter, justified by an
enumerable, closed set of supported CSS functions (`scale`, `translate`, etc.) all sharing one
identity scalar — keeping the parameter avoids a breaking signature change for any future function
that *doesn't* share it, at zero threading cost to any caller (nobody has to plumb a value through
multiple files to satisfy it, unlike F4). Recorded here only to show it was checked and correctly
NOT flagged — the lane's job is to distinguish this class from F4's, not just pattern-match on
"unused parameter."

---

## §8 What did NOT turn up (recorded so the next sweep doesn't re-walk this ground)

- **Commented-out code blocks**: none found. Every `^\s*//` line matching a code-shaped pattern
  (`import`, `const`, `function`, `return`, `if (`, template tags) across `demo/`+`src/`+`api/`
  resolved to prose-comment fragments, not disabled code.
- **`TODO`/`FIXME`/`HACK`/`XXX`/`@deprecated`**: exactly one hit repo-wide (the `PaletteSlugBar.vue`
  TODO investigated and reported to `t-request-packets.md`'s L8/Ad-18 thread rather than
  duplicated here, since it's a live-tracked producer ask, not free-floating legacy — see cross-
  ref below).
- **File-level dead code**: zero unused `.vue`/`.ts` files beyond F2 (a clean, code-only,
  markdown-excluded repo-wide basename-reference sweep).
- **`as any` / `as unknown as` drift**: `src/` count matches CLAUDE.md's claim exactly (0 real
  `as any` — the one textual hit is a comment *mentions* the phrase while explaining a cast is NOT
  needed; 8 `as unknown as`, matching the documented count). `api/src` matches too (0 / 1). No
  drift to report.
- **`lerpLegacy`**: confirmed fully gone (zero occurrences outside the CLAUDE.md line documenting
  its historical retirement) — a positive control that a *prior* legacy excision was actually
  complete, not just claimed.
- **`api/dist/*.d.ts`** locally shows a stale pre-L.W3 "legacy 4-state status" comment — this is
  **gitignored, untracked build output** (`api/dist/` matches `.gitignore:11`), not source; it
  reflects a local machine's un-rebuilt artifact, not repo drift. Recorded so no other lane
  mistakes a `grep -r` hit under `api/dist/` for live legacy.
- **Cross-ref, not duplicated**: the `PaletteSlugBar.vue:16` TODO (*"collapse to `<Button
  size='icon-sm'>` when glass-ui ships the rung"*) — checked live against
  `../glass-ui/src/components/ui/button/index.ts:188-201`: the rung shipped long ago
  (BH.W-SIZE-UNIFY: `iconOnly` boolean × `size` ordinal composition, e.g. `<Button iconOnly
  size="xs">` is the documented replacement for the old `size="icon-sm"`). The TODO's own named
  condition is **met**, but the migration was never done — `PaletteSlugBar.vue:19-24` still hand-
  sizes `icon-only class="h-6 w-6 shrink-0"` instead of consuming the shipped composition. Flagged
  here as **excise the stale TODO wording + do the migration** (owner: demo, mechanical) rather
  than filed as a new producer ask, since the producer already delivered.

---

## Summary table (excise-or-retire verdicts)

| # | Finding | File(s) | Verdict | Owner |
|---|---|---|---|---|
| F1 | Orphaned type trio (`ColorSpaceRanges`/`ColorComponent`/`ColorSpaceDenormUnits`) | `src/units/color/constants.ts:340-344` | EXCISE | src |
| F2 | Zero-importer components `BulkActionToolbar.vue`/`SortFilterMenu.vue` | `demo/@/components/custom/palette-browser/` | EXCISE (+ prune CLAUDE.md/DESIGN.md rows) | demo |
| F3 | `dark-mode-toggle/` 2-line re-export folder | `demo/@/components/custom/dark-mode-toggle/index.ts` + 4 consumers | DISSOLVE | demo |
| F4 | `savedPalettes` dead-and-voided dep param | `usePaletteDialogState.ts` + `PaletteDialog.vue:233` | EXCISE | demo |
| F5 | 12 `proof:*` scripts + dead favicon script vs. CLAUDE.md's "retired" claim | `package.json`, `scripts/*`, `CLAUDE.md:33` | SPLIT: retain-reclassify 4 / excise 8 / fix doc | joint |
| F6 | `.underline-tabs` MARKER — retire-condition partially met, not literally | `style.css:476-484` | STAYS (sharpen the producer ask) | joint |
| F7 | alpha-checker `backdrop-filter` MARKER — retire-condition confirmed unmet | `style.css:486-501` | STAYS (re-check at W8) | joint |
| F8 | `globals` devDependency, zero consumers | `package.json`, `eslint.config.js` | EXCISE | demo/src (root) |
| F9 | Stale `@vue/test-utils` install-instruction comment | `test/color-picker-lifecycle.test.ts:10-11` | RETIRE (comment only) | test |
| F10 | `functionIdentityValue`'s `argIndex` — reviewed, correctly kept | `src/units/utils.ts:73-80` | NO ACTION | — |

**Note on scope discipline**: F2/F3 corroborate `t-coloc-components.md` F8/F9 (independently
re-derived, not copied) and F5 corroborates `t-coloc-backend.md` F7 (independently verified
against CI + CHANGELOG history) — cited rather than re-claimed as sole authorship, per the
fleet's cross-lane accuracy norm. F1, F4, F6, F7, F8, F9, F10 are net-new to this lane.
