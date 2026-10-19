SERVED MODEL: claude-opus-5[1m]

# X-W9.d — the seam, the derivation, and the one thing the gates' model did not predict

Every figure below is read from the settled bytes and double-run. Commands are quoted.

## 1. The cut — three products, two cross-seam edges, zero cycles

`src/css/stylesheet.ts` carried three layers. It now carries one.

| product | what it is | LoC |
|---|---|---|
| `src/css/rules.ts` (create) | the DECLARATION layer: text → `Declaration[]`, the `CssValue` readers each declaration's grammar needs, the `animation` shorthand expansion, `collectDeclarations`, `collectAnimationOptions` | **519** |
| `src/css/stylesheet.ts` | the STYLESHEET layer: the block scanner, the at-rule dispatch, `parseStylesheet`, the path-indexed `collect*` family, `collectTimelineOptions` | **476** |
| `src/css/serialize.ts` (create) | `serializeCssValue`, the parser's inverse | **50** |

⟨cmd⟩ `wc -l src/css/serialize.ts src/css/rules.ts src/css/stylesheet.ts` → `50 · 519 · 476`
(pre-cut: `src/css/stylesheet.ts` = **920**).

**Cross-seam edges — TWO**, both out of `stylesheet.ts`:

⟨cmd⟩ `grep -n 'from "./\(serialize\|rules\|stylesheet\)"' src/css/{serialize,rules,stylesheet}.ts`
→ `src/css/serialize.ts` none · `src/css/rules.ts` none · `src/css/stylesheet.ts:31 from "./rules"`,
`:32 from "./serialize"`.

`serialize.ts` and `rules.ts` are leaves of the seam; nothing imports `stylesheet.ts` from inside
it. The graph is a two-edge fan, so it is **acyclic by construction**, not by inspection.

The spec banked the seam as **265/381/153 with two cross-seam edges** against a 899-line file. The
**edge property reproduces exactly**; the line triple does not, and the drift is measured, not
asserted: (a) X-W9.a's cure landed 21 lines into the file before this seat opened it (899 → 920,
⟨cmd⟩ `git show 41450f02:src/css/stylesheet.ts | wc -l` → 899), and (b) each product carries its own
docstring-and-import header — ⟨cmd⟩ `awk '/^(const|function|export (function|const|type)|type )/
{print NR-1; exit}'` → **25 · 35 · 59** lines — which the banked triple's 799-line sum does not
include.

**Why `collectTimelineOptions` sits in `stylesheet.ts` and not beside `collectAnimationOptions`.**
It is the only declaration-level collector that round-trips a `CssValue` back through the
serializer — three times (`animation-range`, `timeline-scope`, `animation-trigger`) — because
`parseAnimationRange`, `parseTimelineScope` and `parseAnimationTrigger` all take text. Keeping it in
`rules.ts` would make the declaration layer depend on `./serialize`, a **third** seam edge for one
function. This was chosen by measurement of the call graph, not by taste, and it is the only
placement in the cut that is not purely by layer.

## 2. The cut moves no behaviour — measured, not asserted

⟨cmd⟩ `node docs/tranches/X/waves/evidence/W9/split-equivalence.mjs <scratch>` → exit 0, twice,
`diff -q` silent. The harness bundles the **pre-split** entry (`git archive HEAD src` at the parent
commit, through `esbuild --bundle`) and the post-split entry and replays one corpus through both:

- **933 cases · 0 mismatches** — 75 value inputs × 9 published entries, 37 stylesheets ×
  `parseStylesheet` + the whole `collect*` family + `serializeTimelineOptions`, compared by deep
  JSON equality (throws compared as throws).
- 59 parseable inputs `parse → serialize → parse`, **0 round-trip failures**.

Full transcript: `split-equivalence.txt`.

## 3. G15 — the fork diverges on the `:`/`;` class, and OURS is the faithful one

`serializeCssValue` is published (⟨cmd⟩ `'serializeCssValue' in CSS` → **true**, was `false`) and it
**joins the `Result` idiom before it is exported**: the pre-split body threw
`TypeError: Cannot serialize CSS color` on an `AnyColor` that CSS cannot spell; the published one
answers `{"ok":false,"error":{"code":"color_invalid_input"}}` (measured on an `hsv` scalar).

The differential against the verbatim fork
(`../keyframes.js/src/animation/compile/emit/css-text.ts:42-57`) reproduces the spec's banked
reading — **2 of the 3 fixtures diverge**, `"a : b"` → ours `"a: b"`, fork `"a : b"` — and names
the cause the bank did not:

```
ours -> if(supports(color: rgb(255 0 0)): rgb(255 0 0); else: rgb(0 0 255))
fork -> if(supports(color : rgb(255 0 0)) : rgb(255 0 0) ; else : rgb(0 0 255))
```

A CSS `if()` condition parses as a **space-separated list** whose `:` and `;` are their own keyword
tokens. A plain space join therefore emits `color : red` and loses the declaration's own spelling.
The library's serializer collapses that whitespace (`src/css/serialize.ts`, the one step the fork
lacks); the repository's own round-trip battery
(`test/v4-css-emerging.test.ts`, `if(supports(color: red): red; else: blue)`) is the witness, and it
**reddened when this seat first dropped the step** — which is how the direction of the divergence
was settled by measurement rather than by preference.

**8 of 59** corpus inputs diverge, every one in the `:`/`;` class. The fork's retirement is a
keyframes act; it rides X-W9.i's packet (RD-11 — no peer-repo file is edited by this wave).

## 4. What the gates' model did not predict: the `_2` duplication is SPELLING-keyed

G14's falsifier reads *"Reach `color/model` from outside `src/color/`; the duplicate declarations
re-emit"*. The boundary is now cured — ⟨cmd⟩ `library-band-gates.mjs` LIB-04 →
`ok LIB-04 colour types cross src/color/'s boundary through the barrel only`, and ⟨cmd⟩
`grep -rn "color/model" src | grep -v "^src/color/"` → **nothing** — and the duplicates did **not**
follow. They are rooted somewhere else, and this seat measured where.

**The experiment.** `src/css/serialize.ts` imported `ColorIssue` from `"../color/index"`. Changing
that ONE import to `"../color"` — the same file, resolved identically, spelled differently — split
the type in the emitted rollup:

```
export declare type ColorIssue = …
declare type ColorIssue_2 = …
export declare function serializeCssColor(color: CssColor): Result<string, ColorIssue>;
export declare function serializeCssValue(value: CssValue): Result<string, ColorIssue_2>;
```

The dts rollup (`vite-plugin-dts` `rollupTypes: true` → api-extractor) keys its entity cache on the
**import specifier string**, not on the resolved file, for a type that arrives through a re-export
chain. A type reached at its DECLARING module unifies; a type reached through a barrel materialises
one copy per distinct spelling. The experiment was reverted in the same shell act and no byte of it
is committed.

**Consequence.** `css.d.ts` carries two copies of the colour vocabulary:

| copy | entered by | spelling |
|---|---|---|
| the exported one | `src/css/types.ts`, `grammar.ts`, `stylesheet.ts`, `serialize.ts` | `"../color/index"` |
| the `_2` one | `src/value.ts`, riding in with `CssScalar`'s colour payload | `"./color/index"` |

`src/value.ts` sits at `src/`, so its spelling is one **no module under `src/css/` or
`src/subpaths/` can reproduce** — and `src/value.ts` is outside this unit's writable set. The same
mechanism drops the PSL-2 re-exports this seat wrote into `src/subpaths/{value,quantize,easing}.ts`:
they are correct TypeScript (a consumer importing the source names them), and the rollup elides them
because their spelling does not match the one the declaration arrived under. Measured, not inferred:
⟨cmd⟩ three variants tried in this seat's own files — `export type {…} from`, `import type` +
`export type {…}`, and `export type * from` — **all three left `value.d.ts` at 6 bare `declare`s**.

**Named cure, NOT performed** (it is one line in a file this unit may not write): publish the colour
vocabulary from `src/value.ts` itself —
`export type { Alpha, AnyColor, Channel, ChannelsBySpace, Color, SpaceId } from "./color/index";` —
so the declaration arrives under `src/value.ts`'s own spelling and `./css` can re-export it from
`"../value"`, one copy. The same one-liner serves `src/quantize.ts` (`Color`, `Result`) and
`src/easing.ts` (`Result`, and `PRESET_TABLE`'s leak at `src/easing.ts:15`). This seat states it as
a **candidate**: the spelling rule above is measured, the cure's effect is not, and whoever holds
those files must measure it rather than inherit this sentence.

## 5. The two published names this cut adds, and who must feed them

⟨cmd⟩ `Object.keys` over the 7 packed entries → **75** runtime exports (was 73).

| name | subpath | why it is published |
|---|---|---|
| `isAnyColor` | `./color` | the colour boundary. `src/css/grammar.ts:326` guards `serializeCssColor` with it, and the spec's *"exactly 3 statements move"* puts that import on the barrel — where PSL-1 says the barrel is the ONE place public/internal is decided, so a name the barrel carries is published |
| `serializeCssValue` | `./css` | G15 |

Both need **two edits each** in `scripts/ci/verify-packed-surface.mjs` (X-W9.e's file, X-W9.e §7.2's
own relay): an `expected` row and a `SMOKE` case, or the pre-tag cadence reddens with
`has no smoke case for: …`. Measured at this seat: ⟨cmd⟩ `grep -n 'isAnyColor\|serializeCssValue'
scripts/ci/verify-packed-surface.mjs` → **nothing**. `test/v4-c1.test.ts:540-560` pins both surfaces
by `Object.keys` and is the same one-edit cure ESC-W9b-V4C1-SNAPSHOT already asks for.
