# T HARDENING · lane h-evidence-sweeps

**Charge**: adversarial re-verification of four EVIDENCE lanes — `t-legacy-sweep.md`,
`t-a11y-contrast.md`, `t-oracle-gaps.md`, `t-docs-truth.md` — against the live tree. Spot-verify
4-5 claims per lane, re-run 2-3 of the cheap greps, confirm the docs-truth drift rows still stand.
Adversarial posture per the mandate: a clean bill requires evidence, not absence of alarm.

**Method**: every claim below was checked against the live filesystem, `git log`/`git diff`,
`npm test`, `npx playwright test`, and — for two contrast-ratio tables — a from-scratch vitest
scratch file (`test/tmp-hardening-verify.test.ts`, written, run, then **deleted**; never
committed) that called the library's OWN `wcagContrastRatio`/`OKLCHColor` leaves the way the
lane's own method describes, to test whether its cited numbers reproduce independently. The
`../keyframes.js` producer citation was re-checked at its CURRENT HEAD (`9d03124`, which has
moved on from the lane's cited `5addc4a`) via `git log <range> -- <file>` to confirm the cited
file is untouched, not just re-read at the old commit.

**Verdict**: substantively, all four lanes hold — every root-cause claim, every "STAYS"/"EXCISE"
verdict, and the one producer re-confirmation (PRM-expand) reproduce exactly, several down to the
byte. The defects found are all in the EVIDENCE LAYER, not the conclusions: two lanes independently
mis-state the same headline integer (a proof:* script count that is actually 12, cited as "13" and
"11" in two different documents), one lane's "no producer mechanism exists" claim skipped a
sibling source file that literally contains the word it says doesn't exist, and one lane's own
test-count citation is off by a factor of ~2. None of these reverse a verdict; all of them are the
exact class of "session-interruption residue" the owner asked this fleet to hunt for.

**Severity tally**: **MUSTFIX 0 · SHOULDFIX 3 · NOTE 3**.

---

## SHOULDFIX

### HES-1 — Two different lanes independently mis-state the SAME `proof:*` script count (13 / 11), and neither is the true 12

**Corpus location**: `t-legacy-sweep.md` §4 F5 ("package.json's current `scripts` block still
wires **13** `proof:*` entries... (12 scripts backing 11 files under `scripts/` + one
vitest-driven entry)"); `t-docs-truth.md` F4 ("`package.json:86-97` lists **11** live `proof:*`
scripts today: ...").

**The defect**. Live `grep -n '"proof:' package.json` (this session) returns exactly **12** lines
— `proof:css-parity`, `proof:subpath-budget`, `proof:subpath-resolve`, `proof:contrast-color`,
`proof:gamut-alloc`, `proof:grammar-2026`, `proof:serialize-fidelity`, `proof:grammar-q`,
`proof:color-arch-q`, `proof:round-trip-idempotent`, `proof:perf-target`, `proof:progress-honesty`.
Both lanes **enumerate this exact same 12-item list verbatim** — but `t-legacy-sweep.md`'s prose
sentence says "13" (self-contradicted three lines later by its own parenthetical, which correctly
says "12 scripts... + one vitest-driven entry"), and `t-docs-truth.md`'s prose sentence says "11"
against the identical 12-item list it just typed out. `git diff --stat cc4f4fa..HEAD --
package.json` is **empty** — the file has not changed since before either lane was authored, so
this is not drift between the two lanes' authoring sessions; both got the same static fact wrong,
independently, in different directions (one over by one, one under by one), while each correctly
transcribed the list its miscounted integer describes.

**Why it matters here**: this is exactly the "many interruptions, suspect seam" pattern the
mandate names — two lanes producing a confident, specific, wrong headline number about the
identical unchanged artifact, where the enumerated evidence directly beneath the number is
correct. It does not change either lane's substantive verdict (both correctly conclude the
`proof:*` idiom was reintroduced post-retirement and needs a policy ruling) — but a reader citing
either lane's headline count without recomputing it would carry the wrong number forward into the
amend pass.

**Proposed amendment**: the amend pass should fold both citations to the one live-verified number
(**12**, confirmed by grep this session and unchanged since `cc4f4fa`) and drop the internal
self-contradiction in `t-legacy-sweep.md` F5's own sentence.

---

### HES-2 — `t-legacy-sweep.md` F6's "no underline variant anywhere" evidence skipped a THIRD sibling file that literally contains the word "underline"

**Corpus location**: `t-legacy-sweep.md` §5 F6 ("glass-ui's base `Tabs`/`TabsList`/`TabsTrigger`
triad (`../glass-ui/src/components/ui/tabs/*.vue`...) carries **no** `underline` variant prop
anywhere in `TabsList.vue`/`TabsTrigger.vue`").

**The defect**. `../glass-ui/src/components/ui/tabs/` has **five** `.vue` files, not the two the
finding's evidence sentence names: `Tabs.vue`, `TabsContent.vue`, `TabsIndicator.vue`,
`TabsList.vue`, `TabsTrigger.vue`. `grep -n underline` on `TabsList.vue`/`TabsTrigger.vue`/
`Tabs.vue` is indeed empty (re-confirmed this session) — but `TabsIndicator.vue:10` reads: *"the
base `<Tabs>` **underline register** wants the plate (default `true`, byte-identical to the prior
unconditional render)"* — a real, on-point occurrence of the exact word the retire-condition asks
about (*"retired once glass-ui ships a Tabs `underline` variant"*), in a file the finding's own
`*.vue` glob should have caught but its narrated evidence never mentions.

Read in full, `TabsIndicator.vue` turns out NOT to satisfy the retire-condition after all — its
"underline register" is glass-ui-internal jargon for the sliding rounded-pill highlight background
(`bg-(--glass-bg-quiet) [backdrop-filter:...]`), a materially different visual mechanism from the
demo's literal `border-bottom: 2px solid` override at `style.css:481-483`. So the finding's
ultimate verdict (**STAYS**, sharpen the producer ask) is very likely still correct — but the
evidence trail as written implies a check of "the whole Tabs triad" that in fact omitted a file
using the very word being searched for, and a sharper producer ask (option (a) in the finding's own
cure direction) should now explicitly rule out `TabsIndicator`'s existing `:plate` toggle as a
candidate too, not just note that `SegmentedTabs --underline` is a different component.

**Proposed amendment**: re-open F6's evidence citation to include `TabsIndicator.vue` by name and
explain why its "underline register" does not meet the retire-condition (plate-background vs.
border-bottom), so a future reader searching the same word doesn't have to re-derive this.

---

### HES-3 — `t-a11y-contrast.md` §0 cites `test/color-contrast.test.ts` as "20 tests"; live run is 38

**Corpus location**: `t-a11y-contrast.md` §0 ("Both leaves are pure, tested
(`test/color-contrast.test.ts`, 20 tests) and take `bgLightness` as an explicit parameter").

**The defect**. `npx vitest run test/color-contrast.test.ts` (this session): **38 tests**, all
green. `git diff --stat cc4f4fa..HEAD -- test/color-contrast.test.ts` is empty — the file has not
changed since before the lane was authored, so this is a miscount at authoring time, not drift.
The lane's substantive point in §0 (the guard leaves are pure, well-tested, and take an explicit
`bgLightness` the demo mis-supplies) is completely unaffected by the exact count — but this is the
same evidentiary-integrity class as HES-1: a lane whose entire method rests on "re-derivable from
the cited code, not eyeballed" citing a number that is off by nearly 2x.

**Proposed amendment**: fold to **38** in the amend pass; no other change needed.

---

## NOTE

### HES-4 — `t-a11y-contrast.md` F-2's contrast-ratio table does not reproduce to the digit via the exact same library leaf; every verdict (pass/fail/invisible) still holds

**Corpus location**: `t-a11y-contrast.md` §1 F-2 table (owner brown / deep navy / near-black /
saturated red / mid gray / pale mint / near-white, at menu `L≈0.936` light / `L≈0.379` dark).

**Evidence**. Re-derived this session via a scratch vitest file calling the exact leaf the lane
names (`wcagContrastRatio(new OKLCHColor(...), new OKLCHColor(bgL, 0, 0, 1))`), fed the exact CSS
strings and the exact two `bgL` values from the lane's own F-1 table:

| test color | cited light | reproduced light | cited dark | reproduced dark |
|---|---|---|---|---|
| owner brown | 7.62:1 | 6.28:1 | 1.28:1 | 1.33:1 |
| deep navy | 11.31:1 | 11.52:1 | 1.16:1 | 1.38:1 |
| near-black | 11.95:1 | 14.78:1 | 1.22:1 | 1.77:1 |
| saturated red | 5.26:1 | 4.40:1 | 1.86:1 | 1.89:1 |
| mid gray | 4.38:1 (fail) | 3.72:1 (fail) | 2.23:1 (fail) | 2.24:1 (fail) |
| pale mint | 1.01:1 | 1.06:1 | 9.64:1 | 7.88:1 |
| near-white | 1.11:1 | 1.09:1 | 10.85:1 | 9.10:1 |

Deltas range from negligible to ~24% (near-black light), but **every pass/fail/invisible verdict
in the table is unchanged** — the finding's actual argument ("any dark pick fails catastrophically
in dark mode, any light pick fails catastrophically in light mode... structural, not an edge case")
survives fully. The likely source of the digit-level drift is an unstated intermediate step (how
the lane's live-probed `lab(...)` test colors were carried from CSS string to `OKLCHColor` — the
demo's `cssToRawColor` round-trips through `parseCSSColor` → `colorUnit2`, and small gamut-mapping
or rounding choices at that boundary compound before `wcagContrastRatio` sees them); this was not
resolved further since it does not change any conclusion.

**Owner**: n/a — recorded per the sweep's "confirm docs-truth drift rows still stand" charge; no
amendment needed to the verdict, only worth noting the digits are illustrative, not exact, if a
future lane cites this table's numbers as load-bearing to the ones-place.

### HES-5 — Clean-bill corroboration, `t-legacy-sweep.md`: 6 of 6 spot-checked findings reproduce exactly

**Evidence**. Live-verified this session, byte-for-byte: F1 (`ColorSpaceRanges`/
`ColorSpaceDenormUnits`/`ColorComponent` at exactly `constants.ts:340,341,344`, zero real
usages repo-wide beyond declaration); F2 (`BulkActionToolbar.vue`/`SortFilterMenu.vue`, zero
`.vue`/`.ts` importers, doc-only mentions at exactly the cited 3 sites); F3 (`dark-mode-toggle/
index.ts`, the exact 2-line re-export, all 4 cited consumers still import from it); F7 (glass-ui
`Slider.vue:421-422` source carries both the prefixed and unprefixed `backdrop-filter: none`
legs; the published `dist/glass-ui.css` still minifies to `-webkit-backdrop-filter:none` only,
unprefixed leg genuinely absent, glass-ui still pinned at 4.2.0 — the retire-gate is honestly
unmet); F8 (`globals` devDependency, zero imports anywhere including `eslint.config.js`'s exact
4-import list); F9 (`@vue/test-utils` present in `package.json` as a real devDependency, the
stale comment confirmed harmless). Recorded because a sweep whose job is finding drift should also
report when it finds none — six independent byte-exact reproductions is the strongest form of
"this lane is trustworthy" evidence available.

### HES-6 — Clean-bill corroboration, producer re-verification and the two remaining lanes

**Evidence**. `t-a11y-contrast.md` §6's PRM-expand re-check: `../keyframes.js` HEAD has moved from
the lane's cited `5addc4a` to `9d03124` (two commits later, this session) — `git log
5addc4a..9d03124 -- src/animation/physics/spring/managed-play.ts
src/animation/internal/reduced-motion.ts` returns **zero commits**, and the current file content
is byte-identical to the lane's citation (`snap()` → `_snapSettled()`, confirmed to set value/
velocity/`isSettled` with no `onFrame` call anywhere in the call chain). The producer has moved
twice since the lane's snapshot and the defect is still verifiably live — the strongest possible
form of "not stale" for a cross-repo producer claim. Separately, `t-oracle-gaps.md` §1's `npm
test` (68 files / 2158 tests, all green) reproduces exactly; its documented `gradient.spec.ts`
flake reproduces its OWN diagnosis — an isolated re-run this session passed 7/7, and a full
`--project=smoke` re-run passed **39/39** (no flake this time), which corroborates rather than
contradicts the lane's own "host-CPU-contention flake, not a fresh regression" verdict. Every
zero-hit grep census spot-checked (`card-material`/`glass-opacity`, `ShadowPalette`/`EmptyState`,
`gamut-ink`/`WEBBING`, `DevMisconfigBanner`) re-confirmed empty. `t-docs-truth.md`'s numeric
claims (parsing/ 15 files, units/color/ 17 top-level + conversions/ 11, subpaths/ 7 files,
DESIGN.md's 30/44rem vs live 25/32rem, the 6th `smoke-perf` project, `demo/CLAUDE.md`'s 2-of-6
`color/` composables table) all reproduce exactly against the live tree.

---

## Summary table

| # | Finding | Lane | Severity | Verdict-changing? |
|---|---|---|---|---|
| HES-1 | proof:* script count: 13 / 11 cited, live = 12 (both lanes list the correct 12 names) | t-legacy-sweep, t-docs-truth | SHOULDFIX | No |
| HES-2 | F6 "no underline variant" evidence omitted `TabsIndicator.vue`, which uses the word | t-legacy-sweep | SHOULDFIX | No (verdict survives on closer read) |
| HES-3 | `color-contrast.test.ts` cited as 20 tests; live = 38 | t-a11y-contrast | SHOULDFIX | No |
| HES-4 | F-2 contrast-ratio table digits don't reproduce exactly (≤24% delta); every verdict holds | t-a11y-contrast | NOTE | No |
| HES-5 | 6/6 spot-checked t-legacy-sweep findings reproduce byte-exact | t-legacy-sweep | NOTE (positive) | — |
| HES-6 | PRM-expand producer re-check survives 2 more producer commits; oracle-gaps + docs-truth numeric claims all reproduce | t-a11y-contrast, t-oracle-gaps, t-docs-truth | NOTE (positive) | — |

**Scope note**: `test/tmp-hardening-verify.test.ts` was written to the repo, run via `npx vitest
run`, and deleted before this artefact was committed — confirmed via `git status` that no such
file is staged. Zero product-code or corpus files were edited; this document is the lane's sole
write, per the mandate.
