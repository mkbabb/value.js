# GROUND-A — the real denominator

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`. Seat: GROUND-A,
mega-tranche parser band. No subagents spawned; every number below was measured by this seat.

**Subject:** `@mkbabb/value.js` @ `tranche-u` / HEAD `c654824e`, and the published artifact
`@mkbabb/value.js@4.0.0` from the npm registry.
**Measured:** 2026-07-24.

---

## 0 · What this document is, and how to re-run it

This is the band's scoreboard. It is **83 numbered productions**, each with probe inputs, each
classified by *running the live parser* — not by reading it. Every later coverage claim in this
mega-tranche is a fraction of the numbered list below.

The scoreboard is code, not prose. It lives at
`/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser/denominator/`:

| file | role |
| --- | --- |
| `productions.ts` | the 83 numbered productions; each case carries the verdict the **pinned spec** owes it |
| `measure.ts` | runs every probe against the live `src/css/*` and classifies each production |
| `surface.ts` | enumerates `package.json#exports` + `src/subpaths/*.ts` via the TypeScript AST |
| `report.ts` | prints the scoreboard |
| `denominator.test.ts` | **104 assertions** locking every number in this document |
| `../fixtures/css-color-4-{named,system}-colors.json` | the spec keyword tables, scraped from `drafts.csswg.org` with provenance recorded |

```
cd docs/tranches/V/megatranche/prototypes/css-parser
npm run check                       # tsc --noEmit — clean
npm test                            # 181 tests pass (104 are this seat's)
npx tsx denominator/report.ts --misses
npx tsx denominator/surface.ts
```

If `src/css/*` changes, `denominator.test.ts` fails and this document is stale by construction.
That is the only way a scoreboard stays honest.

---

## 1 · The public surface — measured three ways, and one prior record corrected

The task asked me to confirm "52 exports" and verify "126 distinct names". Both were measured by
three independent methods that agree with each other:

1. **TypeScript AST over `src/subpaths/*.ts`** (`denominator/surface.ts`)
2. **Regex over the same barrels** (independent cross-check)
3. **The published `.d.ts` rollups inside `npm pack @mkbabb/value.js@4.0.0`** — i.e. what consumers
   actually receive

| subpath | values | types | total |
| --- | ---: | ---: | ---: |
| `./color` | 23 | 11 | 34 |
| `./value` | 1 | 4 | 5 |
| **`./css`** | **19** | **33** | **52** |
| `./easing` | 16 | 5 | 21 |
| `./math` | 9 | 0 | 9 |
| `./transform` | 9 | 6 | 15 |
| `./quantize` | 2 | 3 | 5 |
| **package** | **79** | **62** | **141** |

- **`./css` = 52 symbols. CONFIRMED.** The prior record's "52 exports" means the `./css` subpath,
  not the package.
- **The package total is 141 distinct names, NOT 126.** No name is exported from two subpaths, so
  slots and distinct names coincide at 141.
- **Where 126 came from:** `./transform` contributes exactly 15 names, and `141 − 15 = 126`. Every
  other subpath subset misses. The prior figure is arithmetically consistent with a count that
  omitted `./transform`. I could not confirm that provenance from git — no commit in the reachable
  history yields 126 — so I record it as the only consistent explanation, not as a proven one.
- **Seven subpaths, no root export.** `package.json#exports` has no `"."` key.
- **A separate history finding, because it bears on "what the library owes":** before commit
  `164343c1` (*"value 4.0 producer surface; retire pre-v4 src trees"*, 2026-07-17), the export map
  was `./color ./parsing ./math ./easing ./transform ./units ./quantize` totalling **337** names.
  `./parsing` → `./css` and `./units` → `./value` were renamed, and the surface was cut 337 → 141
  (−58%). The npm registry serves the **new** map for 4.0.0, so the working tree and the published
  artifact agree. There is no pre-v4 denominator still owed.

**Decree status, measured:** INBOX I-11 §2 says *"parse-that READOPTED as published; regex parser
retired unconditionally."* `package.json#dependencies` is exactly
`{"@mkbabb/glass-ui": "^7.0.0", "@mkbabb/keyframes.js": "^6.0.0"}` and `@mkbabb/parse-that` appears
in neither `dependencies` nor `devDependencies`. The decree is **unexecuted**. Locked as a test.

### 1.1 · The ten entries that consume a string

Of `./css`'s 19 exported values: **9 `parse*` + 1 `coerceToSyntax` = 10 string-consuming entries**;
2 serializers (`serializeCssColor`, `serializeTimelineOptions`); 7 `collect*` walkers that operate
on already-parsed trees.

| entry | grammar it owns | implementation |
| --- | --- | --- |
| `parseCssColor` | `<color>` | `grammar.ts:257–281` + `parseFunctionalColor:175–255` |
| `parseCssScalar` | one component-value token | `grammar.ts:315–336` |
| `parseCssValue` | `<declaration-value>` as a comma/slash/space tree | `grammar.ts:338–395` |
| `parseCssValues` | as above, always list-wrapped | `grammar.ts:397–403` — **same accepted language as `parseCssValue`**, asserted over the whole §B corpus |
| `parseTimingFunction` | `<easing-function>` | `grammar.ts:436–481` |
| `parseKeyframeSelector` | `<keyframe-selector>` | `grammar.ts:405–426` |
| `parseAnimationTimeline` | `<single-animation-timeline>` | `timeline.ts:17–51` |
| `parseAnimationRange` | `animation-range[-start\|-end]` | `timeline.ts:66–84` |
| `parseStylesheet` | `<stylesheet>` + at-rules + declarations | `stylesheet.ts:624–745` |
| `coerceToSyntax` | `@property` `<syntax>` matching | `syntax.ts:91–101` |

So there are **9 distinct accepted languages** behind 10 names.

### 1.2 · The subject's shape, measured

| file | lines | non-null assertions | of which index-access |
| --- | ---: | ---: | ---: |
| `grammar.ts` | 483 | **72** | **70** |
| `stylesheet.ts` | 899 | 18 | 12 |
| `timeline.ts` | 124 | 4 | 4 |
| `syntax.ts` | 101 | 0 | 0 |
| `types.ts` | 131 | 0 | 0 |
| `named-colors.ts` | 150 | 0 | 0 |
| **`src/css/`** | **1888** | **94** | **86** |

Counted with `ts.isNonNullExpression` over the AST. The brief's "70 index-`!`" is **exact**; the
brief's "74 non-null assertions" measures **72** by the AST. Each of the 86 index-`!` sites is an
override of `noUncheckedIndexedAccess` — and one of them is the shipping crash (§3).

---

## 2 · The accepted language, as it stands today

Read from the implementation, then confirmed by probe. Everything here is **currently accepted**.

**Colour** (`parseCssColor`) — hex `#RGB` `#RGBA` `#RRGGBB` `#RRGGBBAA` (case-insensitive); all
**148** `<named-color>` keywords, ASCII case-insensitive, *name-for-name identical to the css-color-4
table with zero misses and zero extras* (asserted over all 148 × 3 spellings); `transparent`;
`rgb()`/`rgba()`/`hsl()`/`hsla()` in the **modern** space-separated form with optional `/ <alpha>`;
`rgb()`/`hsl()` in the **legacy 3-argument comma form** (commas are rewritten to spaces before
splitting); `hwb()`; `lab()`; `lch()`; `oklab()`; `oklch()`; `color()` over the six predefined RGB
spaces (`srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`) and the three XYZ
spellings (`xyz`, `xyz-d65`, `xyz-d50` — the last with a real D50→D65 Bradford adaptation);
the `none` channel keyword; `<hue>` as bare number or `deg`/`grad`/`rad`/`turn`; free mixing of
`<number>` and `<percentage>` per channel with per-space scale factors (rgb 255, lab L 100 / ab 125,
lch C 150, oklab 1 / 0.4, oklch 1 / 0.4, hue 360).

Refused **on purpose, with a typed code**: `currentcolor`, all 19 `<system-color>` keywords, `var()`,
`env()`, and every relative-colour `from` form all return `ParseIssue.code ===
"color_context_required"` — the parser is context-free by contract and refuses to invent a
resolution. The four non-CSS library spaces (`hsv`, `kelvin`, `ictcp`, `jzazbz`) are refused with
`css_syntax`.

**Component values** (`parseCssScalar` / `parseCssValue` / `parseCssValues`) — numbers, dimensions
(any unit), percentages, idents, dashed-idents, quoted strings, a fixed operator set
(`+ - * <= >= == != < > = : ;`), and a comma → slash → space nesting hierarchy. Any
`ident( …non-empty… )` with balanced parens becomes an opaque `CssCall`; nothing is type-checked or
arity-checked, so `var()`, `calc()`, `min()`, `clamp()`, `repeat()`, `counter()`, `attr()`,
`sin()`, `hypot()` all "parse" identically as generic calls.

**Easing** (`parseTimingFunction`) — `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`,
`step-start`, `step-end`, `cubic-bezier()` with the `x ∈ [0,1]` constraint enforced, `steps()` with
all six `<step-position>` spellings and the `jump-none ⇒ count ≥ 2` rule enforced, and `linear()`
with **two or more** stops.

**Keyframe selectors** (`parseKeyframeSelector`) — `from`, `to`, `<percentage>` clamped to `[0,100]`,
and four of the seven `<timeline-range-name>`s (`entry`, `exit`, `cover`, `contain`) with an optional
percentage.

**Timelines and ranges** — `auto`, `none`, `<dashed-ident>`, `scroll([<scroller> || <axis>]?)`,
`view([<axis> || <inset>]?)`; `animation-range` start/end with named phases including
`entry-crossing`/`exit-crossing` (which the *keyframe selector* refuses — see P-061);
`timeline-scope`; `animation-trigger`.

**Stylesheet** (`parseStylesheet`) — qualified rules with comments, `!important`, and CSS nesting;
`@keyframes`; `@property` with full descriptor validity (syntax + inherits mandatory, `initial-value`
mandatory unless `syntax: "*"`, and the initial value coerced against the descriptor);
`@function` with a typed parameter list and defaults; `@scope (root) [to (limit)]`;
`@starting-style`; `@scroll-timeline` / `@view-timeline`; the `animation` shorthand expanded into ten
longhands with per-longhand validity; and **every other at-rule preserved verbatim** as
`kind: "unknown"` — `@media`, `@supports`, `@container`, `@layer`, `@import`, `@font-face`,
`@charset` are retained but not modelled.

**`@property` `<syntax>`** (`coerceToSyntax`) — 13 component names
(`<angle> <color> <custom-ident> <flex> <integer> <length> <length-percentage> <number> <percentage>
<resolution> <time> <transform-function> <transform-list>`), `*`, and `|` alternation. 49 length
units are enumerated; `<custom-ident>` correctly excludes the six CSS-wide keywords.

---

## 3 · R1 escalated — the crash is a *language*, and it reaches six public entries

The brief named eight crashing inputs. Measurement says the fault is far larger on both axes.

**The input class.** `parseCssColor(s)` throws `TypeError: Cannot read properties of undefined
(reading 'replace')` at `grammar.ts:181`

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

for **every** input matching, after trim,

```
/^[a-z][\w-]*\( [\s\/]* \)$/i      (body containing only whitespace and/or solidus)
```

minus the six function heads pre-empted upstream (`var`, `env`, `hsv`, `kelvin`, `ictcp`, `jzazbz`).
`splitTopLevel("", "/")` returns `[]`, so `slash[0]!` — one of the 70 index-`!` overrides — is
`undefined`. This is an **unbounded input class, not eight strings**: `hwb()`, `rgba()`, `hsla()`,
`xyz()`, `calc()`, `url()`, `steps()`, `scroll()`, `rgb( )`, `rgb(/)`, `rgb( / )`, `rgb(\t)` and
`foo()` — *any* unknown function name — all throw. Asserted exhaustively over a generated
21 × 10 = **210-member** sub-language, plus a negative assertion that a non-blank body never throws.

**The blast radius.** Because `parseScalarInternal` calls `parseCssColor` first for *every* scalar
token, the throw escapes through **6 of the 10 public entries**:

| entry | `rgb()` |
| --- | --- |
| `parseCssColor` | **THROW** |
| `parseCssScalar` | **THROW** |
| `parseCssValue` | **THROW** |
| `parseCssValues` | **THROW** |
| `parseStylesheet` (`a{color:rgb()}`) | **THROW** |
| `coerceToSyntax` | **THROW** |
| `parseTimingFunction` | reject (clean) |
| `parseKeyframeSelector` | reject (clean) |
| `parseAnimationTimeline` | reject (clean) |
| `parseAnimationRange` | reject (clean) |

A `ParseResult`-returning, failure-explicit library that throws on `parseStylesheet` of a stylesheet
containing one malformed colour is the strongest correctness argument this band has. It is **not** a
performance argument (§6).

**A second, quieter fault in the same code path.** `alphaToken(undefined)` returns `1`, so an empty
slash tail is silently promoted to full opacity: `rgb(1 2 3 / )`, `rgb(1 2 3 /)` and `rgb(1,2,3,)`
all **ACCEPT** as opaque colours. css-color-4's `[ / [<alpha-value>|none] ]?` admits no empty tail.
That is an unsound accept, numbered P-037.

---

## 4 · What is missing versus the pinned specs

Bounded and named. Every row is a probed production id, not "all of CSS".

**css-color-4** — `<legacy-rgba-syntax>` and `<legacy-hsla-syntax>`, i.e. the four-argument
`rgba(r,g,b,a)` / `hsla(h,s%,l%,a)` forms (P-012, P-015); `none` in the `xyz-d50` adaptation path
(P-024). Nothing else in css-color-4's `<color-function>` set is missing.

**css-color-5** — relative colour syntax `[from <color>]` across all eight functions (P-027, refused
with a typed code, so *deferred* rather than absent); `color-mix()` (P-028);
`<color-interpolation-method>` (P-032); `light-dark()` (P-029); `contrast-color()` (P-030);
`device-cmyk()` (P-031); `color()` over a `<dashed-ident>` custom profile (P-026).

**css-values-4** — the unquoted `url-token` form (P-045; only `url("…")` parses); `<calc-sum>` /
`<calc-product>` internal structure and `<calc-keyword>` resolution (P-046 — `calc(1px + )`,
`calc(*)`, `calc(+)` and `calc(1px 2px)` all currently *accept*); arity for the 18 stepped/trig/
exponential/sign functions (P-047 — `pow(2)`, `clamp(1px)`, `atan2(1)` accept); math functions as
colour components (P-033); `<an+b>` (P-048); `<unicode-range-token>` (P-049).

**css-easing-2** — `linear()` with a single stop (P-056). The grammar is
`linear( [ <number> && <percentage>{0,2} ]# )` where `#` is one-or-more, and the canonicalisation
algorithm explicitly handles the one-point case; value.js requires `stops.length >= 2`.

**css-animations-2** — `animation-delay-start` / `animation-delay-end` parse but are not modelled;
`collectAnimationOptions` still exposes a single `delay` (P-077).

**scroll-animations-1** — three of the seven `<timeline-range-name>`s (`entry-crossing`,
`exit-crossing`, `scroll`) are refused as *keyframe selectors* while being accepted in
`animation-range`, an internal inconsistency (P-061); `animation-range` accepts any dimension where
only `<length-percentage>` is legal, so `1s` and `entry 1deg` pass (P-066).

**Obsolete surface, the other direction.** `@scroll-timeline` and `@view-timeline` **at-rules do not
exist in the current scroll-animations-1 draft** — timelines are declared by properties only.
value.js models both and exports `ScrollTimelineDescriptor` / `ViewTimelineDescriptor` for them:
2 of the 33 `./css` types, plus 2 of the 9 `StylesheetItem` variants, describing a removed feature
(P-074). This is the one place the denominator is *larger* than the spec.

**Deliberately out of scope, and correctly so:** `@media` / `@supports` / `@container` condition
grammars, selector parsing, and CSS-wide value keywords per property. They are retained verbatim by
the forward-compatible `kind: "unknown"` path (P-073) and are **not** claimed.

---

## 5 · The prioritised denominator — 83 numbered productions

Status legend, most severe first:
**CRASH** some probe throws · **UNSOUND** an input the spec forbids is accepted ·
**GAP** an input the spec requires is refused generically ·
**DEFERRED** refused with the typed, deliberate `color_context_required` ·
**SHIPS** every probe matches what the spec owes.

```
productions = 83     probes = 325

  SHIPS     54          tier 1 (n=57):  SHIPS 52  GAP  0  UNSOUND 1  CRASH 4
  DEFERRED   3          tier 2 (n=18):  SHIPS  1  GAP 11  UNSOUND 3  DEFERRED 3
  GAP       18          tier 3 (n= 8):  SHIPS  1  GAP  7
  UNSOUND    4
  CRASH      4
```

### Tier 1 — ships today; must not regress (57 productions, 259 probes)

| id | production | spec | status |
| --- | --- | --- | --- |
| P-001 | `<hex-color>` 3 digits | color-4 §5.2 | SHIPS |
| P-002 | `<hex-color>` 4 digits (RGBA) | color-4 §5.2 | SHIPS |
| P-003 | `<hex-color>` 6 digits | color-4 §5.2 | SHIPS |
| P-004 | `<hex-color>` 8 digits | color-4 §5.2 | SHIPS |
| P-005 | `<named-color>` — all 148, case-insensitive | color-4 §6.1 | SHIPS |
| P-006 | `transparent` | color-4 §6.2 | SHIPS |
| P-009 | `<modern-rgb-syntax>` | color-4 §7.1 | SHIPS |
| P-010 | `<modern-rgba-syntax>` | color-4 §7.1 | SHIPS |
| P-011 | `<legacy-rgb-syntax>` without alpha | color-4 §7.1 | SHIPS |
| P-013 | `<modern-hsl-syntax>` | color-4 §7.2 | SHIPS |
| P-014 | `<legacy-hsl-syntax>` without alpha | color-4 §7.2 | SHIPS |
| P-016 | `hwb()` | color-4 §7.3 | SHIPS |
| P-017 | `lab()` | color-4 §9.1 | SHIPS |
| P-018 | `lch()` | color-4 §9.2 | SHIPS |
| P-019 | `oklab()` | color-4 §9.3 | SHIPS |
| P-020 | `oklch()` | color-4 §9.4 | SHIPS |
| P-021 | `color()` — 6 predefined RGB spaces | color-4 §10 | SHIPS |
| P-022 | `color()` — xyz / xyz-d65 / xyz-d50 | color-4 §10.1 | SHIPS |
| P-023 | `none` channel keyword | color-4 §4.4 | SHIPS |
| P-025 | `<hue>` as `<angle>` or `<number>` | values-4 §7.1 | SHIPS |
| P-034 | `var()` / `env()` not resolved context-free | variables-1 §3 | SHIPS |
| P-035 | non-CSS library spaces refused | value.js contract | SHIPS |
| **P-036** | **hostility floor for `parseCssColor`** | value.js contract | **CRASH** |
| **P-037** | **malformed alpha must not be accepted** | color-4 §7.1 | **UNSOUND** |
| P-038 | `<number>` / `<dimension>` / `<percentage>` token | values-4 §5–6 | SHIPS |
| P-039 | `<ident>` / `<custom-ident>` / `<dashed-ident>` | values-4 §3.2 | SHIPS |
| P-040 | `<string>` token | values-4 §3.3 | SHIPS |
| P-041 | comma / slash / space component lists | values-4 §2.2 | SHIPS |
| P-042 | generic `<function-token>` with non-empty body | syntax-3 §5.4.9 | SHIPS |
| P-043 | `var()` / `env()` with fallback | variables-1 §3 | SHIPS |
| P-044 | `calc` / `min` / `max` / `clamp` arity-free parse | values-4 §10.1–10.2 | SHIPS |
| **P-050** | **hostility floor for `parseCssValue`** | value.js contract | **CRASH** |
| P-051 | `ease` / `ease-in` / `ease-out` / `ease-in-out` | easing-2 §2.1 | SHIPS |
| P-052 | `linear` keyword | easing-2 §2.2 | SHIPS |
| P-053 | `cubic-bezier()` with the `x∈[0,1]` constraint | easing-2 §2.1 | SHIPS |
| P-054 | `<step-easing-function>` incl. `jump-none ⇒ n≥2` | easing-2 §2.3 | SHIPS |
| P-055 | `linear()` with ≥ 2 stops | easing-2 §2.2 | SHIPS |
| P-057 | non-easing input refused | easing-2 §2 | SHIPS |
| P-058 | `from` \| `to` | animations-1 §3 | SHIPS |
| P-059 | `<percentage [0,100]>` selector with range check | animations-1 §3 | SHIPS |
| P-060 | `<timeline-range-name>` — entry/exit/cover/contain | scroll-anim-1 §5.2 | SHIPS |
| P-062 | `auto` \| `none` \| `<dashed-ident>` timeline | animations-2 §3.5 | SHIPS |
| P-063 | `scroll([<scroller> \|\| <axis>]?)` | scroll-anim-1 §4.1 | SHIPS |
| P-064 | `view([<axis> \|\| <inset>]?)` | scroll-anim-1 §4.2 | SHIPS |
| P-065 | `animation-range-start` / `-end` | scroll-anim-1 §5.3 | SHIPS |
| P-067 | `<qualified-rule>` + comments + `!important` | syntax-3 §5.4 | SHIPS |
| P-068 | nested style rules | nesting-1 §2 | SHIPS |
| P-069 | `@keyframes` | animations-1 §3 | SHIPS |
| P-070 | `@property` descriptor validity | props-values-api-1 §2 | SHIPS |
| P-071 | `@function` with parameter list + defaults | mixins-1 §2 | SHIPS |
| P-072 | `@scope` / `@starting-style` | cascade-6 §3, transitions-2 §5 | SHIPS |
| P-073 | unknown at-rules preserved verbatim | syntax-3 §5.4.2 | SHIPS |
| P-075 | `animation` shorthand → 10 longhands | animations-2 §4 | SHIPS |
| P-076 | timeline / range / scope / trigger declarations | animations-2, scroll-anim-1 | SHIPS |
| **P-078** | **hostility floor for `parseStylesheet`** | value.js contract | **CRASH** |
| P-080 | 13 `<syntax-component>` names + `*` + `\|` | props-values-api-1 §3 | SHIPS |
| **P-083** | **hostility floor for `coerceToSyntax`** | value.js contract | **CRASH** |

**The tier-1 mandate: 52 of these 57 must stay SHIPS. Five are already broken (P-036, P-037, P-050,
P-078, P-083) and a replacement must fix them, not preserve them.** The test suite encodes exactly
this: any tier-1 production leaving SHIPS other than those five booked five fails the build.

### Tier 2 — named gaps with real consumer demand (18 productions)

| id | production | status | why it is tier 2 |
| --- | --- | --- | --- |
| P-012 | `rgba(r,g,b,a)` / `rgb(r,g,b,a)` legacy alpha | GAP | the most-deployed colour syntax on the live web; every legacy stylesheet, every design-token export |
| P-015 | `hsla(h,s%,l%,a)` legacy alpha | GAP | same, for HSL |
| P-028 | `color-mix()` | GAP | value.js already ships `mixColors` + `interpolateHue` on `./color`; only the **syntax** is missing |
| P-029 | `light-dark()` | GAP | baseline-available; a colour picker demo that cannot read its own theme tokens is a real defect |
| P-027 | relative colour syntax `[from <color>]` | DEFERRED | needs a resolution context; the refusal is already typed, so this is an API-shape decision, not a parser hole |
| P-032 | `<color-interpolation-method>` | GAP | prerequisite for P-028 |
| P-007 | `currentColor` | DEFERRED | same context argument as P-027 |
| P-008 | the 19 `<system-color>`s | DEFERRED | same |
| P-024 | `none` through the xyz-d50 adaptation | GAP | the single channel-keyword hole in an otherwise complete P-023 |
| P-045 | unquoted `url()` token | GAP | breaks `@font-face`, `background-image`, `@import` in real sheets |
| P-046 | `<calc-sum>` structure + `<calc-keyword>` | UNSOUND | `calc(1px + )`, `calc(*)`, `calc(+)` all accept today |
| P-047 | arity for the 18 math functions | UNSOUND | `pow(2)`, `clamp(1px)`, `atan2(1)` all accept today |
| P-056 | `linear()` with a single stop | GAP | spec-legal; cheap |
| P-061 | `entry-crossing` / `exit-crossing` / `scroll` selectors | GAP | value.js accepts these in `animation-range` and refuses them in `@keyframes` — an internal inconsistency |
| P-066 | `animation-range` non-`<length-percentage>` tail | UNSOUND | `1s` and `entry 1deg` accept |
| P-077 | `animation-delay-start` / `-end` | SHIPS (untyped) | parse but are not modelled by `collectAnimationOptions` |
| P-079 | `selector()` / bare-hash descriptor values | GAP | blocks `@view-timeline { subject: selector(#x) }` — a tokenizer hole, not a colour hole |
| P-081 | `<syntax>` multipliers `+` and `#` | GAP | `@property --x { syntax: "<length>+" }` is rejected outright |

### Tier 3 — speculative (8 productions)

| id | production | status |
| --- | --- | --- |
| P-026 | `color()` with a `<dashed-ident>` custom profile | GAP |
| P-030 | `contrast-color()` | GAP |
| P-031 | `device-cmyk()` | GAP |
| P-033 | `<math-function>` as a colour component | GAP |
| P-048 | `<an+b>` | GAP |
| P-049 | `<unicode-range-token>` | GAP |
| P-074 | `@scroll-timeline` / `@view-timeline` at-rules | SHIPS — **but the spec removed them** |
| P-082 | `<syntax>` literal idents (`solid \| double`) | GAP |

---

## 6 · Honest performance posture

The prior parser-proof gate measured the **live regex parser as fastest (~1.8×)**. I ran no benchmark
in this seat and I make **no** performance claim. A replacement is not justified by speed, and any
later benchmark in this band must state: identical operation, identical input bytes, identical
semantics, raw retained attempts, and the environment. UTF-16 code units are not UTF-8 MB/s.

The case for replacement, as measured here, rests on four things and nothing else:

1. **Correctness under hostility** — 4 crash sites reaching 6 of 10 public entries over an unbounded
   input class (P-036, P-050, P-078, P-083).
2. **Soundness** — 4 productions accept inputs the spec forbids (P-037, P-046, P-047, P-066).
3. **Coverage** — 18 named gaps, of which 11 are tier 2 with real consumer demand.
4. **Maintainability** — 86 index-`!` overrides of `noUncheckedIndexedAccess` across `src/css/`, one
   of which is the shipping crash.

Against that: **52 tier-1 productions ship correctly today**, including a name-perfect 148-colour
table, the complete css-color-4 function set, complete `<easing-function>` constraint checking, and a
stylesheet parser with `@property` descriptor validation and forward-compatible at-rule retention.
**That is what must not regress**, and it is a large and genuinely good denominator. Any replacement
that lands with fewer than 52 tier-1 SHIPS has made the library worse.

---

## 7 · What the next seats owe this scoreboard

- Coverage claims cite production ids. "n of 83", or "n of 57 tier-1", never a bare percentage.
- New productions **append** (P-084…). Ids are never reused or renumbered.
- Changing `BASELINE` in `denominator.test.ts` is the *only* way to move the scoreboard, and it
  requires a re-run of `npx tsx denominator/report.ts --misses` in the same commit.
- The four crash sites and four unsound accepts are the acceptance gate: a replacement flips
  P-036 / P-050 / P-078 / P-083 from CRASH and P-037 / P-046 / P-047 / P-066 from UNSOUND, while
  holding all 52 tier-1 SHIPS.
