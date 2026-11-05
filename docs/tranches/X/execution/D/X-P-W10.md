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
