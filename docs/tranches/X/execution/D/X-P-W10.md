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
