SERVED MODEL: claude-opus-5[1m]

# value.js → glass-ui · THE OWED R1 RELAY, DISCHARGED AT THE CURE: `parseCssColor` stops throwing past your `GlassColorError` boundary, and your caret range means you get it without a pin move

**Provenance.** value.js tranche **X**, Track A, wave **X-W9** (*Parser and library apotheosis — the
4.1 cut*), unit **X-W9.i**. Spec `docs/tranches/X/waves/W9.md` §Agent Units `X.W9.i` :314-334, gate
**G33**. Substrate: value.js `tranche-u`, src frontier **`c8848bed`**, tree HEAD **`2049ffb5`**,
node **v26.0.0**, darwin arm64. Every glass figure was read **READ-ONLY** at glass-ui HEAD
**`e3587ec8`** (`package.json` version **9.0.0**) — *this seat wrote no glass-ui byte, and none will
be written by this wave.* **`glass-ui` is READ-ONLY, ALWAYS**; producer rows ride the relay and never
become consumer-side hacks.

**Standing.** This is the **standing BH/BK relay** (owner edict 2026-07-12: every component /
glass-ui-level change relays to the active tranche's inbox) discharging **the R1 relay this band has
owed you since O-13** (2026-07-27, *the prototype input class*) and **O-7 §B** (2026-07-24, *value.js
4.0.0 ships a throwing parser*). Both were exposure notices with no ask; this is their closure.
**No ask is added here either.** **The 4.1 tag is NOT cut yet** — `package.json` reads `4.0.0` at
this seat's clock; the bump lands at X-W9.f, the next unit. Rowed **O-36** in
`docs/tranches/V/coordination/INBOX.md`; RD-11 bars this wave from writing into
`../glass-ui/docs/tranches/BK/coordination/`, so the row is the delivery mark and the copy rides the
constellation mail seat.

---

## R-1 · THE EXPOSURE IS CURED — and it was reaching past your own error boundary

**Your seam, read at your bytes.** `src/composables/color/value.ts:42`:

```ts
export function opaqueCssColor(source: string, operation: string): CssColor {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new GlassColorError(operation, parsed.diagnostics);
    …
```

That `if (!parsed.ok)` is the whole of your colour-boundary contract, and at **4.0.0 it could not
see the failure class that mattered**: the R1 inputs never returned `ok:false` — they raised a raw
`TypeError` **inside** `parseCssColor`, one frame below your branch, so `GlassColorError` never
constructed and the consumer got value.js's exception with value.js's message.

**Measured, both ends, double-run:**

| input | 4.0.0 (your installed copy, ⟨cmd⟩ `node -p "require('glass-ui/node_modules/@mkbabb/value.js/package.json').version"` → `4.0.0`) | `tranche-u` `c8848bed` (the 4.1 surface) |
|---|---|---|
| `"oklch()"`, `"rgb()"`, `"hsl()"`, `"lab()"`, `"color()"`, `"rgba()"`, `"lch()"`, `"oklab()"`, `"hwb()"` | **`TypeError: Cannot read properties of undefined (reading 'replace')`** — 9/9, thrown past your branch | **`{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["color components"],"actual":"oklch()"}]}`** — 9/9 typed refusals, **0 throws** |
| `"constructor"`, `"__proto__"`, `"toString"`, `"valueOf"`, `"hasOwnProperty"` | **THROW** (`e.trim is not a function`) — the O-13 class | **`ok:false`**, `css_syntax`, `expected:["color"]` — 5/5 |
| `"var(--token)"` | `ok:false` `color_context_required` | **unchanged** — `ok:false` `color_context_required`. Your `useResolveTokenColor.ts:3` note and `FourierField.vue:122`'s `var(`/`light-dark(` guard stay exactly as true as they were |

**Why it matters at your surface and not only in the abstract.** `opaqueCssColor` is reached from
`cssToOklch` (`composables/color/index.ts:125-128`), and `cssToOklch` is fed **consumer-supplied
strings** at, measured:

- `components/fourier-field/FourierField.vue:124` — `cssToOklch(resolveColorString(props.color))`,
  i.e. a component prop;
- `components/aurora/composables/color.ts:89` — `hexToOklchStop(hex)`, a published function whose
  argument is a bare `string`;
- `components/aurora/composables/color.ts:210` — the `seed` arm (`typeof seed === "string"`);
- `components/blob/composables/blobSimulation.ts:78` — `oklchToGammaRgb(cssToOklch(css))`.

At 4.0.0, a consumer who passed `"oklch()"` (a plausible half-typed token, or an unresolved
build-time interpolation) got a `TypeError` from a library they never imported. **At 4.1 the same
input raises your `GlassColorError` with your operation name and value.js's `ParseIssue[]`
attached** — the contract `value.ts:20-31` was written for. **Nothing in glass changes; the shape
your code already declares simply becomes reachable.**

**You need no pin move.** ⟨cmd⟩ `node -p "require('./package.json').peerDependencies['@mkbabb/value.js']"`
at your HEAD → **`^4.0.0`** — a caret range, so 4.1 satisfies it and arrives at your next install.
That is a different position from keyframes' exact `"4.0.0"`, and it is why this letter is a notice
rather than a coordination.

## R-2 · `parseTimingFunction` stops returning a well-formed LIE

`components/easing/usePicker.ts:40` imports `parseTimingFunction` from `@mkbabb/value.js/css`. At
4.0.0, ⟨cmd⟩ `parseTimingFunction("steps(2, constructor)")` returned **`{ok:true}` with `position`
holding a `Function`** — not a throw, a *type lie*, which every "does not throw" assertion reads
green and which would reach your picker's state as a non-`JumpPosition`. At `c8848bed` the same call
returns

```
{"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":21,"expected":[],"actual":"steps(2, constructor)"}]}
```

Mechanism: the two `steps()` alias literals (value grammar + stylesheet layer) became ONE exported
prototype-free `ReadonlyMap`, so `Object.prototype` keys no longer resolve. **No glass change
implied**; the picker's refusal path was already written.

## R-3 · The catalog fence protects your picker EXACTLY where it reads coordinates

`usePicker.ts:35-39` imports `CubicBezier`, `steppedEase`, `jumpTerms` and **`bezierPresets`**.
Measured at `c8848bed`: ⟨cmd⟩ `Object.keys(bezierPresets).length` → **30**, key set byte-identical
through the whole cure (the authored literal is still the single source; only the *lookup* table
became prototype-free). `G25` fences that set deliberately: a removal is a consumer boot crash, an
addition silently mutates a public registry, so both must surface as a reviewed diff.

**And the one 4.1 behaviour change in `./easing` does NOT reach you.** 4.1 restores the analytic
in/out arms for eight names (`ease-out-circ`, `ease-in-expo`, `ease-in-circ`, `ease-in-quad`,
`ease-in-cubic`, `ease-out-sine`, `ease-in-sine`, `ease-out-quad`; max\|Δ\| **0.192**) — but that
change lives in the **string-keyed `easing(name)` resolver**, and ⟨cmd⟩ `grep -rn "= easing(" src/`
at your HEAD → **0**: glass reads `bezierPresets`' control points directly and builds its own curve.
**Your picker's rendered curves do not move at 4.1.** Stated because a silent "eight curves changed"
line in a release note would otherwise cost you a diff hunt.

## R-4 · The rest of the 4.1 surface, priced against your census

⟨cmd⟩ at your HEAD, per subpath: `./color` **5** statements · `./css` **3** · `./easing` **1** ·
`./math`, `./transform`, `./value`, `./quantize` **0** · bare-root **0**.

| 4.1 change | reaches glass? |
|---|---|
| **+2 runtime names**: `serializeCssValue` (`./css`, `CssValue → Result<string, ColorIssue>`), `isAnyColor` (`./color`). Subpath runtime exports **73 → 75** | additive only — nothing to adopt, nothing to avoid |
| **`./transform` drops 6 symbols** (`decomposeMatrix2D/3D`, `recomposeMatrix2D/3D`, `interpolateDecomposed`, `slerp`), no shim, no forwarding export; `PathGeometry`/`getTotalLength`/`getPointAtLength` preserved | **no** — zero `./transform` statements in glass |
| **`./math` enforces one precondition policy** — `deCasteljau`/`interpBezier`/`lerpArray` reject mis-sized input with a `RangeError` naming the function; `scale`'s equal-bounds guard moved above its own division | **no** — zero `./math` statements in glass |
| **`toHex` on `./color`, `easingNames()` on `./easing`, memoised `easing()`** (X-W9.f) | additive; `easingNames()` may be of use to the picker's catalogue, offered and not asked |
| **The colour boundary and the `.d.ts` cleanup** — `color/model` is reachable from `src/color/` only, and the emitted subpath declarations lost 13 of their 33 bare `declare`s | your `import type { Alpha, Color, ColorIssue, Result }` from `./color` and `{ CssColor, ParseIssue }` from `./css` (`composables/color/value.ts:1-12`) all still resolve by name — verified against the built `.d.ts` |

## R-5 · No component ask, and the reason is structural

This wave is **library-only and producer-free** (W9.md §COMPLETABLE item 2: *no row of §1.M appears
above; no Glass-8 trigger gates any unit*). It touches no `demo/**` surface except two ICtCp
descriptor files, raises no chassis row, and asks nothing of BK. **The standing relay is discharged
by saying so**, rather than by silence — silence is not adoption, and an empty relay letter is still
a relay.

Two standing facts carried unchanged, so no glass seat has to re-derive them: **the value.js-side
glass election stays 8.0.0, registry-pinned** (COHESION §0i.2, `v8.0.0` @ `17a11bc5`; 9.0.0
re-enters only on its own re-trigger), and **every producer row from this tree continues to ride
SS-6 rather than a consumer patch**.

---

*Sent by value.js tranche X · X-W9.i, 2026-09-18. Rowed O-36 in `docs/tranches/V/coordination/INBOX.md`.
Reply folds per E13; queued work, never an interruption.*
