SERVED MODEL: claude-opus-5[1m]

# X-W9 — the `ESC-W9R1-BOUNDS-GRANT` addendum, landed beside (E-3), 2026-09-19

Authority: `docs/tranches/X/COHESION.md` §0ac, ruled 2026-09-19. Writer: `X-W9.f`. This file is the
dated record of the grant's execution; `W9.md`'s own §File Bounds already carries the matching
`ADDENDUM 2026-09-19` line at `:526`, and neither file rewrites the other. Nothing here widens a
bound the sitting did not rule.

## The grant, row by row, with what this seat did at the bytes

| id | granted path | the one act ruled | executed |
|---|---|---|---|
| `ESC-W9R1-BOUNDS-GRANT` / `ESC-W9d-EMERGING-SERIALIZE` | `test/v4-css-emerging.test.ts` | the import migrates to `serializeCssValue`'s new home; **the forwarding shim in `stylesheet.ts` stays REFUSED** | YES — the `from "../src/css/stylesheet"` line is deleted and the name folded into the existing `../src/subpaths/css` block, which is where `./css` publishes it. The four call sites unwrap the `Result` the symbol joined before it was exported (G15); no shim, no cast, no `as`. |
| `ESC-W9b-V4C1-SNAPSHOT` | `test/v4-c1.test.ts` | the six retired `./transform` names leave the snapshot, which becomes **G27's own ratchet** | YES — and the snapshot is re-banked from the settled bytes for all four moved subpaths, so it ratchets the 4.1 surface rather than a hand-kept memory of it. |
| `ESC-W9e-FIXTURE-V4TYPES` | `fixtures/public-types/value-v4.ts` | the **fourteen** stale lines naming G27's retired symbols are deleted | YES — exactly 14 lines removed (4 type imports · 4 type-list rows · 6 runtime rows), counted by the deleting command. The five 4.1 runtime names were added in the same edit so the witness compiles the surface that ships. |
| `ESC-W9d-DTS-SPELLING` | `src/value.ts` · `src/quantize.ts` | the import specifiers take the **one spelling** the subpath barrels use, so the dts rollup's entity cache merges; G13/G14 measured after, remainder **named by count** | PARTLY — see §2. The ruling's literal premise is **false at the bytes** and is recorded as such; the cure X-W9.d *named* (publish from the module that returns it) was performed instead and **works**. |
| `ESC-W9a-PROBE-UNRUNNABLE` · `ESC-W9c-MTS06-SUPERSEDED` | `…/probes/src-surface-totality.2026-09-19.mjs` (create) | a dated sibling with MTS-05/MTS-06 re-pointed to the cured contract, **every other arm unchanged**; the original byte-untouched | YES — the original is byte-identical at HEAD; the sibling's other 7 arms are copied verbatim and the two that moved say so in their own block. |
| `ESC-W9d-ROOT-AND-SYNTAX` (a) | — | G12 LEG2 = **(ii) declared-retired**; O-12 is the position of record; **no `"."` key is added** | RECORDED — `package.json` `exports` still holds exactly the seven subpath keys; no root key was added by the cut. |
| `ESC-W9a-G3-LEG-SCOPE` | — | G3 binds to entries declaring a `string` parameter; `src/css/syntax.ts` **is not written** | RECORDED — `src/css/syntax.ts` is untouched by this unit. |
| `ESC-W9e-SHARMA-NO-SUBJECT` | — | **SUPERSEDED-BY-THE-V4-CUT**; G18's Sharma half relieved by this id | RECORDED — no colour-difference metric is on the 4.1 surface; the cut adds none. |
| `ESC-W9-G24-SUBSTRATE` | scratch dir outside every repo | the registry **`0.13.0` tarball** via `npm pack`; integrity hash into `bench-table-4.1.md`; `../fourier-analysis` untouched | YES — see `evidence/W9/bench-table-4.1.md`. `../fourier-analysis` has zero bytes written by this unit. |
| `D-10` | `W9.md` §State | the tally moves with `.f`'s close-time status edit | YES — at close. |

## §2 — `ESC-W9d-DTS-SPELLING`: the ruled premise is false, the named cure is true

The ruling says the rollup's entity cache is keyed on the **import-specifier string**, so
`src/value.ts` writing `"./color/index"` where the subpath barrels write `"../color/index"` is what
splits the entity. **Measured, twice, at this seat:**

- The two strings can never be made equal — the files sit at different depths, so `"./color/index"`
  is the only spelling `src/value.ts` can write for that module.
- Changing `src/value.ts` and `src/quantize.ts` to the directory form `"./color"` and rebuilding left
  **G13 = 20 and G14 = 60, unmoved**. The specifier string is therefore **not** the cache key, and
  the premise cannot be executed as written.

What *is* true is the cure X-W9.d named one paragraph later and did not perform: **the module that
returns a type publishes it**. `src/value.ts`, `src/quantize.ts` and `src/easing.ts` now carry their
own `export type` blocks, and the three subpath barrels drop the hand-kept lists that stood in for
them — which is PSL-1's own rule (*"the area barrel is the one place public/internal is decided"*),
not a fourth re-export variant in the barrels. Measured after, double-run:

```
G13  bare `declare` across dist/subpaths/*.d.ts   33 (4.0.0) → 20 (pre-cut) → 7
       css 6 · easing 1 · color 0 · math 0 · quantize 0 · transform 0 · value 0
G14  `_2` in dist/subpaths/css.d.ts               60 → 60 (unmoved)
```

**The remainder, named by count as the ruling requires — 7, of which 6 have one root:**

- **`easing.d.ts` 1** — `declare const PRESET_TABLE`, forced by
  `export type BezierPresetName = keyof typeof PRESET_TABLE`. Repair 2 measured that spelling the
  union by hand would create a **second authority for the 30-key set G25 fences**. Not cured, on
  purpose: a cure that endangers a green fence to move a red count by one is not a cure.
- **`css.d.ts` 6** — `AnyColor` plus the five `_2` mangles, and they are the same defect. They ride
  in with `CssScalar`'s colour payload from `src/value.ts`, while the exported copy enters from
  `src/css/index.ts:51-58`'s `export type { … } from "../color/index"`. **The cure is one edit of
  eight lines**: re-point that block to `"../value"`, which now publishes the same vocabulary, so
  both routes name one entity. `src/css/index.ts` is `modify` in `W9.md` §File Bounds but is **not in
  this unit's writable set**, so the edit is NOT performed here and is escalated by name as
  **`ESC-W9f-CSSD-VOCAB-SPELLING`**. It is also the whole of G1's residual: the dated sibling probe
  reports **27 arms GREEN, 1 RED**, and the one RED is MTS-09 reading exactly these six.

## §3 — two bounds notes this seat raises against itself

- **`package-lock.json`** is not named in `W9.md` §File Bounds. The AM-13 strip edits
  `package.json`, which is, and a manifest whose lockfile contradicts it breaks `npm ci` — so the
  lock was regenerated mechanically (`npm install --package-lock-only`, zero authored bytes) rather
  than left to contradict the cut. The diff is confined to the bump, the `dependencies` →
  `devDependencies` move, the `@mkbabb/keyframes.js` removal and the `"dev": true` markers that
  follow from it. Disclosed as **`ESC-W9f-LOCKFILE-DERIVATIVE`** for the check seat to rule.
- **`docs/tranches/V/ARCHITECTURE.md`'s parse-that paragraph** records *"`dependencies` reads exactly
  `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`"*. The AM-13 strip makes that
  enumeration stale. **G31 is NOT reddened**, because the paragraph dates itself in its own opening
  clause (*"recorded against ground truth 2026-09-18"*) and every parse-that claim it makes — that
  `@mkbabb/parse-that` is in neither block, the research-root status, the retired `≥10×` floor,
  nothing adopted — stays true after the strip. The stale clause is recorded as **INFO** with its
  one-sentence repair for whoever next holds that file: **`ESC-W9f-ARCH-DEPS-CLAUSE`**.
