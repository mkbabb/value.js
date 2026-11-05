# X.P.W10 — execution record (born 2026-11-04 at `.c10`; plan `parse-that/waves/W10.md`, COHESION §0ht)

Seat: Opus 5.5. Every receipt is a command this seat ran.

## Opening state

- W10 opens after W9 `.pin`. `.pin` waits on the owner's `.rel` ruling, because bbnf-lang 0.3.0 is merged (`7bd8e7a14`) but not published. So the value.js grammar bytes are still the 0.2.0 emission, with E-6 headroom of 31 B gz on grammar.js and 3 B gz on color.js.
- **Not started, and why:**
  - `.t10` (grammar) and `.m10` (action bytes in color.js) would cross E-6 on the 0.2.0 bytes. A crossing escalates and is never shaved, so neither runs before `.pin`.
  - `.r10` needs ruling DR-c, which is open.
  - `.k10` needs ruling XP-13, which is open.
- **Started:** `.c10` only. It is corpus and instrument work, and changes no grammar or action byte.

## `.c10` (XP-12, XP-13 corpora): corpus first, born RED

### Vendored corpus
- ⟨`node test/css/wpt-values/vendor-list.mjs ~/.cache/wpt/raw test/css/wpt-values/corpus-w10.json`⟩ → `vendored 15 of 15 listed files at WPT 5a5b2b59…`. Their sha256 entries are appended to `pins.json` (E-3).
- `vendor-list.mjs` is a new script that vendors an explicit list of files. The list itself is `corpus-w10.json`.
- At the pin, WPT names contrast-color's computed file `color-computed-contrast-color-function.html`.

### Recorders and extraction
- `extract.mjs` gains recorders for `test_computed_value`, `test_math_used` and color-testcommon.js's `fuzzy_test_valid_color`, `fuzzy_test_computed_color` and `fuzzy_test_computed_color_property`. The fuzzy recorders keep WPT's epsilon, which defaults to 0.01.
- None of the 164 files vendored earlier calls these harnesses (⟨`grep -rlE "fuzzy_test_|test_computed_value\(|test_math_used\(" wpt`⟩ → empty).
- ⟨`node test/css/wpt-values/extract.mjs 2026-11-04-c10`⟩ → `17307 cases from 179 files → cases-2026-11-04-c10.json`. The 6392 cases of `cases-2026-11-04.json` are identical inside it, and 10,915 cases are new.

### How V-C judges each case kind (`conformance.ts`)
| case kind | entry and comparison |
|---|---|
| computed colour | `parseCssColor` + `serializeCssColor`, compared with color-testcommon's fuzzy comparison when WPT's harness is fuzzy |
| computed easing | `parseTimingFunction` on the input. It matches when the expected text parses to a deep-equal timing function, so this seat writes no serializer. |
| every other case (specified, used) | `parseCssValue` + `serializeCssValue`, as before |

Ruled rows for the new files are born empty.

### Reading: born RED ×2
⟨`guarded --light -- npx vite-node bench/wpt-conformance/conformance.ts`⟩ → exit 1 both times. The two outputs are identical apart from the pid line (`bench/records/W10c10/W10c10-vc-{1,2}.txt`). Totals: 17,307 cases, 7,189 pass, 3,898 ruled, **6,220 unruled misses**, 0 stale rows, 0 unruled files.

Misses per module:
| module | misses | note |
|---|---|---|
| css-anchor-position | 2,266 | |
| css-color | 3,769 | |
| css-easing | 25 | |
| css-values | 118 | |
| css-syntax | 32 | the W9 `.vc9` rows |
| css-variables | 10 | the W9 `.vc9` rows |
| css-fonts, css-grid, css-images, css-transforms | 0 | unchanged |

Misses per file (`bench/records/W10c10/miss-by-file.txt`). These are the W10 units' falsifier columns:
| file | misses |
|---|---|
| anchor-parse-invalid | 22 of 25 accepted (refused 3/25) |
| anchor-size-parse-invalid | 19 of 22 accepted (refused 3/22) |
| anchor-parse-valid | 788 serialization |
| anchor-size-parse-valid | 1,436 serialization + 1 refused (serialization differences inside fall under DR-b) |
| color-valid-relative-color | 1,146 refused |
| color-computed-relative-color | 1,169 refused (`.r10`) |
| color-valid-color-mix-function | 580 serialization + 12 refused |
| color-computed-color-mix-function | 818 serialization + 27 refused (`.m10` covers part) |
| color-computed-contrast-color-function | 17 refused |
| linear-timing-functions-syntax | 10 serialization + 3 refused + 6 accepted |
| timing-functions-syntax-computed | 6 refused (`.t10`) |
| calc-size-parsing | 53 accepted + 6 serialization |
| interpolate-size-parsing | 3 accepted |
| calc-sibling-function-parsing | 7 accepted (refused 6/13) + 8 refused + 7 serialization |
| progress-computed | 27 serialization + 7 refused (used values) |

Stay-green: eslint over `bench/wpt-conformance` and `test/css/wpt-values/*.mjs` is 0; `vue-tsc -p tsconfig.test.json` is 0. **Gate: born RED ×2, recorded, as planned.**

## Units carried from W9 `.vc9` into W10
These cover the 42 misses `.vc9` measured. No grammar bytes changed in W9.
- **`.s10`**: `<urange>` specified serialization per css-syntax-3 §7.1: upper-case hex, leading zeros stripped, `?` expanded to a range, and comments allowed between `u` and `+`. Refuse `u + abc`, `U + a b c` and `u-0-1`. 32 rows.
- **`.v10`**: `var()` keeps an empty fallback, its name argument is `<declaration-value>`, and the argument may be wrapped in `{}`. 10 rows.

Both are BBNF and serialization cures, so both wait for `.pin` headroom, just as `.t10` does.

## Addendum §0hv.2 (2026-11-05) — the W10 cures, sitting 1 (E-3: the sections above stand as written)
Seat `claude-opus-5-5`, under COHESION §0hv (DR-c and XP-13 RECOMMENDED arms). Gates per unit: `bench/records/W10/gates.sh` (`--check` ×2, E-6 ×2, self-contained ×2, test/css ×2, MIRROR ×2, V-C ×2, L-G2 ×2 with `delta.mjs` against the W9 `.pin` read, the paired audit, L-G3), run under `guarded`.

### `.t10` (XP-11): math functions in easing arguments
- **Adopted** an uncommitted working tree an earlier seat left at 03:30 (no live seat held it). Re-read every receipt here; repaired two defects in it: (i) its 8 `W10t-EASING-CANONICAL` rows were keyed `kind: valid`, but the cases are `test_computed_value` (`computed`), so V-C read them 8 STALE + 8 MISS; re-keyed. (ii) its value-list `linear()` check opened 5,837 L-G2 rows and 456 MIRROR-DEFECTS with no class; classed **W10t-LINEAR** (DIVERGENCE-LEDGER §20-T, `w6-classes.ts`).
- **RED ×2** on a `git archive HEAD` copy (`bench/records/red-before.sh`, outside the repo): `bbnf-easing-math.test.ts` `13 failed | 12 passed (25)` both. **GREEN ×2** `25 passed`.
- **Gates ×2** (`bench/records/W10t10/gates/`): `--check` 0; self-contained 0/0; test/css 23 files / 336; MIRROR 19/19, MIRROR-DEFECTS 0; L-G2 `identical 3347 · gone 0 · moved 0 · new 5837` (all W10t-LINEAR), `cmp`-identical ×2; audit exit 0; L-G3 0; `tsc -p tsconfig.lib.json`, `vue-tsc -p tsconfig.test.json` and eslint 0.
- **V-C ×2:** css-easing **MISS 0** (91 cases · 61 pass · 30 ruled). Total 6,226 → **6,201**. New ruled rows (12): `W10t-EASING-CANONICAL` ×8 (css-easing-2 §2.1.1: the computed value is the canonicalized `linear()`; `parseTimingFunction` keeps authored stops, the 4.x contract), `W8g-MATH-SERIALIZATION` ×2 (DR-b), `W8g-PROPERTY-GRAMMAR` ×1 (DR-a: `<easing-function>#`), `W10t-EASING-CONTEXT` ×1 (`em` in `steps()`).
- **E-6 ×2: grammar.js 83,903 / 15,065 gz — CROSSES the 15,050 ceiling by 15 B** (+23 over `.pin`'s 15,042); color.js 29,586 / 6,028 (unchanged). **ESC-W10-1** (below). Not shaved.

### ESC-W10-1 — the `.pin` ceilings leave W10's grammar 8 B
W10.md §State: "The headroom W10's grammar needs is the headroom bbnf-lang#2 recovers." W9 §0hv.1 then set the ceilings to the `.pin` measurement rounded up to 50 B (15,050 / 6,050), so the recovered 577 B is no longer available to W10. Every W10 grammar unit therefore crosses. Shape as §0fc: the overage is spec cures, not bloat. **Ask:** rule a W10 ceiling (proposal: the W10 close measurement rounded up to 50 B, capped at the pre-`.pin` 15,650 / 6,150). Until ruled, each unit lands with its delta read and this row open; the 4.3.0 cut waits on it.

### `.m10` (W8t-COLOR-SPACE-NONE): `xyz-d50` and `display-p3-linear` as model members
- **Cure** (no grammar byte): `src/color/{model,anchors,index}.ts`, `src/css/{types,serialize}.ts`, `src/css/bbnf/{color,mix}.ts` (DIVERGENCE-LEDGER §20-M). The demo maps keyed by `SpaceId` gain the two spaces; the space catalog carries them `listed: false`, so the selector still shows 18 rows (e2e o23 `CATALOG_SIZE` unchanged). `test/css/css-color5.test.ts` (its "concrete" class retired: 958 = 957 in + 1 context; valid 673 in:ok) and `test/v4-c1.test.ts` (the `./color` surface gains `displayP3Linear`, `xyzD50`; xyz-d50 answers `xyz-d50`) are updated to the new contract, each change commented at the assertion.
- **RED ×2** on `git archive 7114406a1`: `bbnf-color-space-members.test.ts` `8 failed | 1 passed (9)` both. **GREEN ×2** `9 passed`.
- **V-C ×2:** 6,201 → **6,131** (−70). The 8 W8t-COLOR-SPACE-NONE rows and 28 W8t-COLOR-SERIALIZATION rows read STALE (passing) and are deleted (ruled rows 3,910 → 3,874). css-color MISS 3,769 → 3,699.
- **Gates ×2** (`bench/records/W10m10/gates/`): `--check` 0; E-6 grammar.js 83,903 / 15,065 (unchanged from `.t10`; ESC-W10-1 stands), color.js 29,586 / 6,028 (unchanged: the cure is in actions, not the emitted module); test/css 24 files / 345; MIRROR 19/19 with **W10m-SPACE** (DIVERGENT_VALUE) — MIRROR-DEFECTS 0; L-G2 `new 26` against `.t10`, all W10m-SPACE (`new 5863` against `.pin` = 5837 + 26); audit 0; L-G3 0. Full unit suite 149 files / 1,735 ×1; `typecheck` (lib, demo, test, e2e) 0 after `npm run build`; eslint 0.

### `.s10` (the 32 `<urange>` misses)
- **Cure:** DIVERGENCE-LEDGER §20-S. **RED ×2** on `git archive c0ca1bb5d`: `bbnf-urange-serialize.test.ts` `17 failed | 8 passed (25)` both. **GREEN ×2** (with `bbnf-fonts.test.ts`) `33 passed`.
- **V-C ×2:** css-syntax **MISS 0** (101 · 97 pass · 4 ruled W8g-PROPERTY-GRAMMAR, DR-a). Total 6,131 → **6,099**.
- **Gates ×2** (`bench/records/W10s10/gates/`): `--check` 0; E-6 grammar.js **83,976 / 15,072** (+7 B gz; ESC-W10-1), color.js 29,586 / 6,028; test/css 25 files / 370; MIRROR 0 defects; L-G2 `new 0` beyond `.m10`; audit 0; L-G3 0.

### `.v10` (the 10 `var()` misses and the 6 custom-property rows)
- **Cure:** DIVERGENCE-LEDGER §20-V. **RED ×2** on `git archive c74ba680a`: `bbnf-var-arguments.test.ts` `7 failed | 10 passed (17)` both. **GREEN ×2** `17 passed`.
- **V-C ×2:** css-variables **MISS 0** (33 · 24 pass · 9 ruled: W10v-VAR-WHITESPACE ×3, W10v-CUSTOM-COMPONENTS ×6, both DR-b). Total 6,099 → **6,083**. **Flag for the orchestrator:** the 6 custom-property rows were routed by §0ht.1 as "an owed cure … not ruled"; this seat rules them under DR-b (§0hv, ruled after §0ht.1), because the cure (a custom property's value held as tokens) would change `parseCustomPropertyValue`'s 4.x contract for every consumer. Reverse by ruling, not by this seat.
- **Gates ×2** (`bench/records/W10v10/gates/`): `--check` 0; **E-6 grammar.js 84,599 / 15,157 (+85 B gz; the smallest of six measured variants; ESC-W10-1)**, color.js 29,586 / 6,028; test/css 26 files / 387; MIRROR 0 defects (W10v-VAR); L-G2 `new 956 · moved 2` (W10v-VAR); audit 0; L-G3 0.

### V-C instrument: a computed colour is judged by its value (before `.r10`)
- `.c10` judged a computed colour by text: `serializeCssColor` against WPT's spelling (fuzzy). value.js's spelling is its own canonical form (`oklab(44.29% …)`, `rgb(…)`, alpha as a percentage), which DR-b keeps, so the text judge measured spelling, not the computed colour. `conformance.ts` now also passes a case when an expectation parses (`parseCssColor`) to the colour the input computes to: channels compared in the expectation's space within WPT's epsilon in the units its text spells (`color(srgb …)` is 0..1, held as rgb 0..255), a hue modulo 360, `none` only against `none`. This is the computed-easing judge's rule (the expectation parses to the same value), applied to colour. A text match still passes.
- **V-C ×2 on `057c997ba` (no product byte changed):** 6,083 → **5,279**, identical ×2 (`bench/records/W10vcj/`). The 804 cases that moved are all `color-computed-color-mix-function.html` serialization misses; 0 cases newly miss. Spot read: `color-mix(25% oklab(0.1 0.2 0.3 / .4), oklab(0.5 0.6 0.7 / .8))` → `oklab(44.29% 0.543 0.643 / 70%)` against WPT `oklab(0.442857 0.542857 0.642857 / 0.7)`.
- **Flag:** an instrument change, attributed by its own commit and reading so the orchestrator can rule it; revert the commit to restore the text judge.

### `.r10` (DR-c): a relative colour resolves at parse from an absolute origin
- **Cure:** DIVERGENCE-LEDGER §20-R (`math.ts` channel-keyword binding, `color.ts` `relativeColor`, `value.bbnf` `colorHead`, `value.ts` `keepsRelativeColor`). Two tests that asserted the pre-DR-c contract (`css-color5.test.ts` "relative colour is a parsed production…", `bbnf-refusal.test.ts`'s refused-colour sample) are moved to the ruled contract, each commented at the assertion: an absolute origin answers ok, a context origin `color_context_required`.
- **RED ×2** on `git archive d58db7362`: `bbnf-relative-color.test.ts` `14 failed | 7 passed (21)` both. **GREEN ×2** `21 passed`.
- **V-C ×2:** 5,279 → **2,451** (−2,828). css-color MISS → **67**. Ruled: `W10-SPECIFIED-SERIALIZATION` ×1,376 (DR-b, each fixpoint-checked), `W8t-CSS-COLOR-6` ×10, `W8t-COLOR-CONTEXT` ×23; 8 stale rows deleted. Ruled rows 3,887 → 5,288.
- **Residual (routed, not ruled):** 25 refused computed-relative (trig `sin()`/`asin()` absent from the colour channel math; WPT's own `none`-vs-0 inconsistencies), 24 computed-relative serialization (powerless hue answered as a number where WPT spells `none`), 17 `contrast-color()` computed (an owed css-color-6 cure), 1 `color-mix()` with `em` (context). Routed to the W10 close / the next formation's css-color unit.
- **Gates ×2** (`bench/records/W10r10/gates/`, re-run after the two test moves and a lint pass in `bench/records/W10r10/gates2/`): `--check` 0; **E-6 grammar.js 84,378 / 15,158 (+1 B over `.v10`; `colorHead`'s lookahead against `relativeColor` leaving `colorCall`; ESC-W10-1)**, color.js 29,586 / 6,028 (unchanged); self-contained 0/0; test/css 27 files / 408; MIRROR 19/19, MIRROR-DEFECTS 0; L-G2 against `.v10`: `new 14 · moved 1 · gone 0` (one new corpus source read by 14 entries, and one stylesheet's first diagnostic: both the value-list call form, §20-R), `cmp`-identical ×2; audit 0; L-G3 0. Full unit suite 152 files / 1,798 (the 2 moved tests the only failures before the move); `vue-tsc -p tsconfig.test.json` 0; eslint 0.
- **Flag:** in a value list `parseCssValue` keeps the specified call, which serializes in value.js's canonical spelling (the 1,376 DR-b rows); the WPT specified form resolves channel keywords that value.js leaves to `parseCssColor`.

### `.k10` (XP-13), sub-unit (a): `calc-size()`
- **Cure:** DIVERGENCE-LEDGER §20-Ka (no grammar byte). **RED ×2** on `git archive 23766fe27`: `bbnf-calc-size.test.ts` `23 failed | 13 passed (36)` both. **GREEN ×2** `36 passed`.
- **V-C ×2:** 2,451 → 2,413 by the cure (38 `calc-size()` misses), → **2,389** with 24 ruled rows (`W8g-PROPERTY-GRAMMAR` ×18, DR-a; `W8g-MATH-SERIALIZATION` ×6, DR-b). `calc-size/` MISS 0.
- **Gates ×2** (`bench/records/W10k10a/gates/`): `--check` 0; E-6 grammar.js 84,378 / 15,158, color.js 29,586 / 6,028 (unchanged); self-contained 0/0; test/css 28 files / 444; MIRROR-DEFECTS 0; L-G2 unchanged from `.r10`; audit 0; L-G3 0; `tsc -p tsconfig.lib.json` and eslint 0.

### `.k10` sub-unit (b): `sibling-index()` / `sibling-count()`
- **Cure:** DIVERGENCE-LEDGER §20-Kb. **RED ×2** on `git archive 12462c749`: `bbnf-tree-counting.test.ts` `8 failed | 1 passed (9)` both. **GREEN ×2** `9 passed`.
- **V-C ×2:** 2,389 → **2,366** (23 ruled: `W8t-COLOR-CONTEXT` ×9, `W8v-PROPERTY-TYPE` ×7 DR-a, `W8g-MATH-SERIALIZATION` ×7 DR-b; the cure turns 9 colour refusals from syntax into the context contract). `tree-counting/` MISS 0.
- **Gates ×2** (`bench/records/W10k10b/gates/`): `--check` 0; **E-6 grammar.js 84,412 / 15,181 (+23), color.js 29,620 / 6,054 (+26) — color.js now CROSSES its 6,050 ceiling by 4 B**; ESC-W10-1 covers both files (variants recorded; not shaved). self-contained 0/0; test/css 29 files / 453; MIRROR-DEFECTS 0; L-G2 unchanged; audit 0; L-G3 0; tsc and eslint 0.

### `.k10` sub-unit (c): `progress(no-clamp …)`
- **Cure:** DIVERGENCE-LEDGER §20-Kc (no grammar byte). **RED ×2** on `git archive 8d7bb5b82`: `bbnf-progress-no-clamp.test.ts` `5 failed | 5 passed (10)` both. **GREEN ×2** `10 passed`.
- **V-C ×2:** 2,366 → **2,332** (7 no-clamp refusals cured into the computed-value class; 34 ruled `W10k-COMPUTED-VALUE`, a new class: the case asserts a computed value the element-free parser does not compute). **css-values MISS 0** (976 · 794 pass · 182 ruled).
- **Gates ×2** (`bench/records/W10k10c/gates/`): `--check` 0; E-6 15,181 / 6,054 (unchanged from `.k10b`); test/css 30 files / 463; MIRROR-DEFECTS 0; L-G2 unchanged; audit 0; L-G3 0; tsc, eslint 0.
- **Flag:** `W10k-COMPUTED-VALUE` is a new ruling class (34 rows), named for the orchestrator.

### `.k10` sub-unit (d): `anchor()` / `anchor-size()`
- **Cure:** DIVERGENCE-LEDGER §20-Kd (no grammar byte). **RED ×2** on `git archive 2fb233593`: `bbnf-anchor-signature.test.ts` `27 failed | 20 passed (47)` both. **GREEN ×2** `47 passed`.
- **V-C ×2:** 2,332 → 2,296 by the cure (36: 35 invalid columns now refused, `anchor-size()` read) → **66** with 2,230 ruled rows (`W8g-PROPERTY-GRAMMAR` ×6 DR-a; `W8g-PROPERTY-SERIALIZATION` ×2,224 DR-b, fixpoint-checked). **css-anchor-position MISS 0**: the invalid columns read 22/22 (anchor) and 19/19 (anchor-size) refused or ruled.
- **Gates ×2** (`bench/records/W10k10d/gates/`): `--check` 0; E-6 15,181 / 6,054 (unchanged); test/css 31 files / 510; MIRROR-DEFECTS 0; L-G2 unchanged; audit 0; L-G3 0; tsc, eslint 0.

### W10 sitting-1 close reading
- V-C **6,226 → 66** unruled misses (ruled rows 3,910 → 7,599). Every module MISS 0 except css-color 66 (the `.r10` residual less the one relative row `.k10b` ruled: 24 computed-relative refusals (trig, `none`-vs-0), 24 computed-relative serialization, 17 `contrast-color()` computed, 1 `color-mix()` with `em`). E-6 at close: grammar.js 84,412 / **15,181**, color.js 29,620 / **6,054**: ESC-W10-1's proposed ceiling (close measurement rounded up to 50 B) is **15,200 / 6,100**, inside the 15,650 / 6,150 cap.
- **4.3.0 is not cut by this seat:** the cut waits on ESC-W10-1 (both files cross the `.pin` ceilings). Ruling ESC-W10-1 as proposed releases it.
- **Push held (15:30Z):** tranche-u's `ci` run 42019540010 (another seat's, on `d2d006cb9`) has been in `e2e-smoke` since 13:58Z (no job timeout below the 6 h default), so under the push law the W10 commits (`7114406a1` … this addendum) stay local, 19 ahead of `origin/tranche-u`, 0 behind. The next seat to find tranche-u's CI idle pushes them (ordinary fetch + merge).

## Addendum §0hz (2026-11-05) — the W10 close seat: gates ×2, adversarial re-check, one mis-classing repaired (E-3: the sections above stand as written)
Seat `claude-opus-5-5`, fresh. HEAD `80b3ddbe0` plus this addendum's repair.
- **Close gates ×2** (`bench/records/W10close/gates/`, `W10/gates.sh` under `guarded`): `--check` 0 ×2; E-6 grammar.js 84,412 / **15,181** gz and color.js 29,620 / **6,054** gz ×2 (identical to `.k10b`–`.k10d`); self-contained 0/0 ×2; test/css 31 files / 510 ×2; MIRROR 19/19, MIRROR-DEFECTS 0 on every assay and real line ×2; V-C ×2 exit 1, **66 unruled misses**, 0 stale rows, 0 unruled or stale files, byte-identical to `W10k10d` bar the pid; L-G2 `identical 3344 · gone 0 · moved 3 · new 6833` against `.pin`, `cmp`-identical ×2 and `cmp`-identical to the `W10k10d` read; audit exit 0; L-G3 0.
- **Adversarial re-check (independent verifiers, not the seat's own rule scripts):**
  - `W8g-PROPERTY-SERIALIZATION` ×2,224 (`.k10d`): each row's product text was normalized by the class's stated mechanism (name-first token order inside `anchor()`/`anchor-size()`, a lone `calc()` wrapper dropped, a `0` fallback as `0px`) and compared with WPT's expectation. 2,216 hold. **8 do not:** `calc(anchor(--foo left, 1px) + 10%)`, `calc((anchor(--foo top) + anchor(--bar bottom)) / 2)` and their `anchor-size()` twins, across properties. WPT's form differs there by math simplification (sum terms sorted, `/ 2` as `0.5 *`), not by the stated mechanism. Not masking: each is a fixpoint and a DR-b spelling. **Repair:** the 8 rows are re-classed `W8g-MATH-SERIALIZATION` with a true reason and css-values-4 §10.10/§10.13 cited (`ruled.json`, 24 lines). V-C counts are unchanged by construction.
  - `W10-SPECIFIED-SERIALIZATION` ×1,376 (`.r10`): the input and WPT's expectation, each read by `parseCssColor`, compute to the same colour (rgb, ±1 channel, ±0.01 alpha) in 1,231 rows; 23 are context origins (`currentcolor`, `var()`, `sign(em …)`), refused `color_context_required` by DR-c's own contract; the other 122 all carry `none`, where WPT's specified form spells an inner legacy colour as `rgb()` with `none` → 0, and value.js keeps the missing channel. The reason holds for every row.
  - `W10v-CUSTOM-COMPONENTS` ×6 and `W10v-VAR-WHITESPACE` ×3: WPT's expectation, read by value.js, serializes to the product's text in 9/9. The §0ht.1-vs-DR-b routing flag stands for the orchestrator.
  - `W10k-COMPUTED-VALUE` ×34: every row is kind `used` (`test_math_used`); the reason says "computed". The mechanism (value.js does not simplify or resolve math at parse, DR-b) holds; the wording is noted, not changed.
  - V-C judge `d58db7362`: it only adds passes; `none` matches only `none`, default epsilon 1e-9, the hue compared mod 360 only on the hue index. Read by inspection; no path that passes a different colour was found.
  - The two test moves to DR-c (`css-color5.test.ts`, `bbnf-refusal.test.ts`) keep a context-origin refusal in each, and `bbnf-relative-color.test.ts` asserts the resolved values.
  - npm: `@mkbabb/value.js@4.2.1` (gitHead `594f423b5`) and `@mkbabb/bbnf-lang@0.3.0` (gitHead `c9b93adb4`) each carry an SLSA v1 provenance attestation; `npm audit signatures` in a clean install: 3 verified registry signatures, 2 verified attestations. `@mkbabb/parse-that@2.0.0` has none: no release was cut (`.pt`), and the first tag on the new workflow will carry one. `NPM_TOKEN` is present on both repos.
- **Id collision (noted, not renamed):** `ESC-W10-1` is also COHESION §0ac's X-W10 escalation. The X·P one is read as **ESC-XPW10-1** from here; the rows above keep their text.
- **Still open:** ESC-XPW10-1 (ceilings; proposal 15,200 / 6,100) gates the 4.3.0 cut; the 66 css-color misses (routed); `.rd` (load 14–19 this sitting, never < 8).
- **Push held:** tranche-u `ci` 42019540010 (another seat's, `d2d006cb9`) still in `e2e-smoke`'s playwright step at 15:42Z, started 13:58Z.
