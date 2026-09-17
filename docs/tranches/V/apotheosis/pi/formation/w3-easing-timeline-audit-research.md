# V·π W3 EASING/TIMELINE E-3 RESEARCH

2026-07-21 · **RESEARCH SEAT COMPLETE — PROPOSED, NOT AUTHORITY, NO CODE
AUTHORIZED**

This is the independent research input for a focused W3 correction addendum.
It read the W3 brief, author receipt, implementation/tests, LIVE anchors, and
W3 Audit A. It did **not** read or contact W3 Audit B. It changes no correction
ledger, does not ratify anything, and does not authorize implementation. The
labels `W3-C1` through `W3-C5` below are deliberately wave-local: root must
assign globally unique correction-row numbers after the concurrently forming
W2 rows are serialized.

## 1. Pinned authority and reproducibility

All normative text below was independently fetched from the official CSSWG
repository at commit `c7573530343759ace8e46438a1fa2c44515b5554`. The returned
byte lengths and SHA-256 values matched the proposed 76-root manifest exactly.
The manifest content digest is
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.

| carrier | exact path | bytes | SHA-256 | relevant rule |
|---|---|---:|---|---|
| CSS Easing 1 | `css-easing-1/Overview.bs` | 19,774 | `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185` | `cubic-bezier()` four arguments; `steps(<integer>, <step-position>?)`; step-count bounds |
| CSS Easing 2 | `css-easing-2/Overview.bs` | 36,116 | `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554` | `linear( [ <number> && <percentage>{0,2} ]# )`; one-or-more rows; control-point canonicalization |
| Scroll-driven Animations 1 | `scroll-animations-1/Overview.bs` | 65,357 | `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` | `view()` inset, animation-range shorthand/longhands, coordinating lists, current `scroll` range |
| CSS Syntax 3 | `css-syntax-3/Overview.bs` | 144,427 | `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` | token whitespace/comments/escapes, identifier values, comma-separated component groups |
| CSS Values 4 | `css-values-4/Overview.bs` | 230,907 | `7051146f8adf0b8c0e9243dd75dab39f18efe3e0905d86afb8abd43fe58d45bc` | literal `<integer>`, exponent-bearing `<number>`, unitless zero length, `<length-percentage>`, math typing |

The browser witness was headless Chromium **148.0.7778.96**. Each cited browser
result was checked both with `CSS.supports(property, value)` and by assigning a
fresh style declaration and reading its serialization. The primary prototype
comparison used the current built LIVE oracle and the current mirror; their
success trees or complete first diagnostic are recorded below where material.

## 2. Terminal research verdict

W3 should remain open. Five small-to-medium Phase-A semantic corrections need a
proper E-3 row, ratification, implementation, and two fresh implementation
audits:

1. extend R8 explicitly to empty comma members in all three easing functions;
2. enforce the exact `steps()` argument count and literal `<integer>` spelling;
3. implement the pinned Easing-2 `linear()` grammar, including one row and the
   unordered `&&` component order;
4. make `parseAnimationRange` a **single shorthand-arm** parser, resolve
   `normal` as a standalone boundary, and make structural serialization
   round trips true; and
5. separate view-inset `auto` from range offsets and recognize the real literal
   `<length-percentage>` domain, including exponent spelling and unitless zero.

CSS tokenization and math must not be reimplemented locally to close W3.
Comments, CSS whitespace, escape-decoded/non-ASCII names are PB1 work with a
mandatory W3/PB6 replay. Typed math is PB3 work with a PB6 replay. The current
`scroll` range and a lossless plural range overlay are PB6 work. These deferred
rows remain required before the tranche's L4 perfection verdict, but do not
create circular Phase-A dependencies.

## 3. Proposed Phase-A correction rows (wave-local labels)

### W3-C1 — explicit R8 extension for easing argument members

**Disposition:** extend existing R8 ownership to W3; do not spend a new global
semantic row merely to restate R8. Before calling `splitTopLevel`, all three
recognized function bodies must reject an empty leading, repeated, or trailing
top-level comma member. Nested commas are not members of the outer list.

| door | exact mandatory rejects (minimum) |
|---|---|
| cubic | `cubic-bezier(,0,0,1,1)` · `cubic-bezier(0,,0,1,1)` · `cubic-bezier(0,0,1,1,)` |
| steps | `steps(,2)` · `steps(2,)` · `steps(2,,start)` |
| linear | `linear(,0,1)` · `linear(0,,1)` · `linear(0,1,)` |

LIVE and mirror currently accept every listed spelling after silently dropping
the empty member. Chromium rejects every one. The exact terminal diagnostic for
each recognized easing call is the existing function-path failure:

```text
{ code: "css_syntax", start: 0, end: source.length,
  expected: [], actual: source }
```

Use the existing shared `emptyTopLevelItem(body, ",")`; do not add another
comma scanner. Range-property empty members remain R8's W5 coded path (see
§5), not an easing diagnostic and not a reason for the scalar range door to
accept commas.

### W3-C2 — exact `steps()` arity and literal `<integer>`

CSS Easing 1 permits exactly one required argument and one optional argument.
CSS Values 4 defines a literal integer as `[+-]?` followed by one or more
decimal digits. Numeric integrality is not lexical conformance.

Terminal Phase-A rules:

- require `args.length === 1 || args.length === 2` after W3-C1 emptiness
  rejection;
- parse the first argument with exact literal form `[+-]?\d+` and then convert
  it to a finite JS number;
- require count `> 0`, except `jump-none` requires count `> 1`;
- preserve the current six aliases and default omitted position to `jump-end`;
- reject decimal and exponent spellings even when their numeric value is an
  integer.

| source | terminal result |
|---|---|
| `steps(+01)` | `{kind:"steps", count:1, position:"jump-end"}` |
| `steps(0002,start)` | `{kind:"steps", count:2, position:"jump-start"}` |
| `steps(-01)` · `steps(+00)` | lexically valid; reject on the semantic count bound |
| `steps(1.0)` · `steps(1e0)` | reject: not a literal `<integer>` |
| `steps(2,start,end)` | reject: nonempty third argument |

All rejects above use `css_syntax`, full source span, and `expected:[]`.
Current LIVE/mirror wrongly accept `1.0`, `1e0`, and the third argument;
Chromium rejects them, while accepting and canonicalizing `+01` and `0001`.
Math/substitution spellings such as `steps(calc(1))` and `steps(var(--n))`
cannot fit the frozen numeric `count` field losslessly; PB3 and PB13G/P provide
the typed values and PB6 owns the L4 easing replay/overlay.

### W3-C3 — Easing-2 `linear()` grammar, not LIVE's subset

The pinned grammar is
`linear( [ <number> && <percentage>{0,2} ]# )`. Consequently:

- `#` requires **one or more** nonempty comma rows, not two or more;
- each row contains exactly one number and zero, one, or two adjacent
  percentages;
- the percentage group may precede or follow the number because of `&&`;
- two percentages may not straddle the number; and
- the existing `CssLinearStop` shape is already sufficient: `output` stores
  the number and `input` stores the zero-to-two percentages in source order,
  divided by 100.

Exact success fixtures:

```text
linear(0)
→ {kind:"linear-function", stops:[{output:0,input:[]}]}

linear(0% 0)
→ {kind:"linear-function", stops:[{output:0,input:[0]}]}

linear(0% 0,100% 1)
→ {kind:"linear-function", stops:[
     {output:0,input:[0]}, {output:1,input:[1]}
   ]}

linear(0% 25% 0,1)
→ {kind:"linear-function", stops:[
     {output:0,input:[0,0.25]}, {output:1,input:[]}
   ]}
```

`linear(25% 0 75%,1)` rejects because the percentage multiplier is split
around the number. W3-C1 still rejects every empty row. LIVE/mirror reject all
percentage-first fixtures and every one-row fixture. Chromium accepts and
canonicalizes percentage-first rows when there are at least two resulting
control points, but rejects one-row `linear(0)` and `linear(0% 0)`. The pinned
spec is E-4's arbiter: the one-row cases are required expected divergences.
The same pinned source's evaluation algorithm explicitly returns the sole
control point's output when the list has one item, removing any cardinality
ambiguity.
The existing raw `input` tuple intentionally retains whether positions were
supplied; do not eagerly replace missing positions with used-value
canonicalization.

### W3-C4 — scalar range grammar, `normal`, and structural round trip

`parseAnimationRange` returns one `AnimationRangeValue`; it therefore parses
exactly one item of the `animation-range` shorthand's outer `#` list. A
top-level comma is a property-list separator and is never a boundary separator.

Within one arm, `normal` is a standalone longhand alternative. It cannot take
an offset. Other named timeline ranges can take one optional
`<length-percentage>`. This makes the ambiguous minimum deterministic:

```text
parseAnimationRange("normal 0")
→ {ok:true, value:{
     start:{phase:"normal"},
     end:{offset:"0"}
   }, diagnostics:[]}

parseAnimationRange("normal 100%")
→ {ok:true, value:{
     start:{phase:"normal"},
     end:{offset:"100%"}
   }, diagnostics:[]}
```

`normal 0 100%` rejects: it cannot be one boundary and it has three standalone
components. `entry 10% exit 90%`, `entry 10% 90%`, and `10% 90%` retain their
ordinary 2/1 disambiguation.

The serializer needs no speculative alternate spelling. These two mandatory
properties become true solely when parsing is corrected:

```text
serializeTimelineOptions({range:{start:{phase:"normal"},end:{offset:"0"}}})
→ {"animation-range":"normal 0"}
→ parse → the identical range structure

serializeTimelineOptions({range:{start:{phase:"normal"},end:{offset:"100%"}}})
→ {"animation-range":"normal 100%"}
→ parse → the identical range structure
```

Chromium accepts `normal 0`, serializes it as `normal 0px`, and rejects
`normal 0 100%`. Current LIVE/mirror instead attach `0` to `normal`, losing the
public end boundary, and accept the three-component invalid value.

At the scalar door, `entry,exit`, `entry,,exit`, `entry,`, and `,entry` all
reject with:

```text
{ code:"timeline_option_invalid", start:0, end:source.length,
  expected:["animation range"], actual:source }
```

This is deliberately different from property parsing: Chromium accepts
`animation-range: entry,exit` and serializes `entry, exit`, meaning two
coordinating-list items, not `{start:entry,end:exit}`. See §5 for ownership.

### W3-C5 — split view inset from range offset; exact literal domain

There is no valid shared rule in which `auto` and every alphabetic unit are
both animation-range offsets. Define two semantic consumers over one shared
literal numeric primitive:

- view inset: `auto | <length-percentage>`;
- animation-range boundary: `<length-percentage>` only.

For the immediate Phase-A literal slice, `<length-percentage>` means:

- a finite percentage token;
- a finite dimension token whose ASCII-case-insensitive unit is in the exact
  CSS Values 4 length-unit registry already present in `syntax.ts`; or
- a literal number token with numeric value zero, including signed, decimal,
  or exponent spellings such as `-0`, `+0.0`, and `0e0`.

Do not duplicate the current length-unit set. Extract/reuse one shared helper
for W3 and `coerceToSyntax`; if that moves a W0-owned primitive, replay W0's
single structural check and the affected W4 fixtures.

| source | terminal Phase-A result |
|---|---|
| `view(auto)` · `view(auto auto)` | accept; preserve the explicit raw inset(s) in the frozen AST |
| `auto` · `entry auto` · `auto auto` through range door | reject `timeline_option_invalid`, `expected:["animation range"]` |
| `view(1e2px)` / range `1e2px` | accept raw `1e2px` as length |
| `view(0e0)` / range `0e0` | accept raw `0e0` as unitless zero length (also closes R11's spelling hole) |
| `view(1q)` · `view(1svh)` and range equivalents | accept real L4 length units |
| `view(1s)` · `view(1deg)` · `view(1fr)` · `view(1foo)` | reject with `expected:["view timeline"]` |
| range `1s` · `1deg` · `1fr` · `1foo` | reject with `expected:["animation range"]` |
| nonzero unitless `5`, `1e0` | reject under R11 |

Current LIVE/mirror have the opposite polarity on exponent spellings and the
invalid unit classes. Chromium witnesses every result in the table. Math
values such as `calc(1px)`, `min(1px, 2%)`, and `calc(0px)` are normatively
valid and Chromium accepts them; `calc(0)` remains a number, not a unitless
zero length, and Chromium rejects it. Phase A must keep these math spellings
explicitly deferred rather than pretend its literal helper is L4-complete.
PB3 owns typed math; PB6 replays both timeline/range doors and R10's
top-level-comma decision with nested `min()` commas.

## 4. Required deferred replays (not local W3 patches)

### PB1 → W3/PB6 token replay

CSS Syntax, not JavaScript `\s` or an ASCII regex, determines these results:

| source | current LIVE/mirror | required after PB1 |
|---|---|---|
| `scroll(root` + U+000A + `x)` | reject | `{kind:"scroll",scroller:"root",axis:"x"}` |
| `scroll(root/**/x)` | reject | same success; comment is token trivia |
| `scroll(root` + U+00A0 + `x)` | wrongly accepts after JS-whitespace split | reject; NBSP is not CSS whitespace |
| `--é` | reject | `{kind:"name",name:"--é"}` |
| `--\61` | reject | `{kind:"name",name:"--a"}` using the decoded ident-token value |

The replay bank must cover all CSS whitespace code points U+0009, U+000A,
U+000C, U+000D, U+0020; comments at every W3 token boundary; escaped function
and dashed identifiers; non-ASCII identifiers; and quoted spellings that must
remain data. Do not add a W3 tokenizer or a second escape decoder. PB1 owns the
tokens and exact source spans; PB6 owns the current L4 timeline adapter replay.

### PB3/PB6 numeric and math replay

PB3 supplies typed numeric/math values. PB6 must then replay view inset and
range offsets for at least `calc(1px)`, `calc(0px)`, `calc(0%)`,
`min(1px, 2%)`, mixed length/percentage `calc()`, invalid `calc(0)`, invalid
time/angle/flex results, and nested commas under R10. The frozen raw-string
`RangeBoundary.offset` can preserve a source spelling in Phase A; the L4
overlay must preserve typed math without forcing evaluation to a JS number.

### PB6 current range-name and type growth

The pinned Scroll Animations source defines the current view-timeline ranges
`cover`, `contain`, `entry`, `exit`, `entry-crossing`, `exit-crossing`, and
`scroll`. The frozen Phase-A `RangePhase` has the first six plus `normal`, but
omits `scroll`; Chromium accepts `animation-range: scroll`, `scroll 0`, and
`scroll 0 100%`. Keep the legacy 33-type surface unchanged. PB6 must add the
L4 overlay type/value and replay current parser/serializer behavior there.
`normal` remains a longhand keyword, not a named timeline range.

## 5. Property-list ownership: W5 validates, W4 projects, PB6 models

Scroll Animations declares `animation-range` as
`[ <animation-range-start> <animation-range-end>? ]#` and explicitly makes the
range properties a coordinating list with `animation-name`. Therefore:

1. **W3** parses one shorthand arm and rejects any top-level comma.
2. **W5** owns declaration-level list splitting and R8 diagnostics. It accepts
   `animation-range: entry, exit`, invokes the scalar parser separately for
   each nonempty arm, and rejects `entry,,exit`/leading/trailing empties through
   the existing animation-coded R8 path (`animation_option_invalid`,
   `expected:["nonempty animation list item"]` at the empty separator span).
3. **W4** must never feed an unsplit coordinating list to the scalar door or
   collapse `entry,exit` into one start/end pair. The frozen
   `CSSTimelineOptions.range` is singular, so a multi-arm declaration is a
   representability finding: W4's Phase-A collection contract must explicitly
   decline a lossy plural projection, and PB6 must provide the plural L4
   overlay. At minimum add a negative fixture proving collection does **not**
   manufacture `{start:{phase:"entry"},end:{phase:"exit"}}` from the list.

The final W4 collection policy for an unrepresentable plural value belongs in
the W4 correction/addendum, not in W3. The terminal boundary above is fixed:
neither W3 nor the singular `AnimationRangeValue` may pretend a property list
is one range.

## 6. Direct defects, addendum rows, and no-scope-creep boundary

| finding | classification | owner / replay |
|---|---|---|
| empty easing comma members | existing R8 semantics, missing W3 ownership; E-3 extension required | W3-C1; W5 retains property-list R8 |
| extra `steps()` argument; decimal/exponent accepted as integer | new focused correction | W3-C2; PB3/PB6 typed-math replay |
| one-row and percentage-first `linear()` rejected | pinned brief/spec defect, including one browser disagreement | W3-C3 |
| `normal 0` end loss; scalar comma collapse | new range-boundary/API correction | W3-C4; W4/W5/PB6 downstream |
| range accepts `auto`; fake unit domain; exponent/zero rejected | new domain split plus direct R11 zero-spelling defect | W3-C5; PB3/PB6 math replay |
| CSS whitespace/comments/escaped and non-ASCII names | known shared-token deficiency, not a local W3 patch | PB1 then PB6 replay |
| current `scroll` range | frozen-type growth, not a Phase-A mutation | PB6 L4 overlay |

R10 itself remains correct for the Phase-A literal subset: top-level commas in
`scroll()`/`view()` reject. Its current `body.includes(",")` implementation is
not sufficient once nested math is valid, so PB3/PB6 must replace/replay that
decision using token-aware top-level structure. `spring()` remains unresolved
owner scope in PB0 and is not smuggled into this addendum.

## 7. Replay lattice, cost, and KISS prescription

Proposed order after owner ratification:

```text
W3-C1..C5 implementation
  → W0 structural replay only if shared lexeme/numeric ownership moved
  → W3 maintained bank + generated differential + Chromium witnesses
  → two fresh independent W3 E-1 audits
  → W4 serializer/collector replay
  → W5 declaration-list replay
  → W7 bench replay

PB1 close → W3/PB6 token replay
PB3 close → PB6 numeric/math replay
PB6 close → current range/type/plural-overlay replay
```

| slice | estimated cost | smallest sound implementation shape |
|---|---:|---|
| W3-C1 | S | call existing `emptyTopLevelItem` before splitting |
| W3-C2 | S | exact argument length + tiny literal-integer recognizer |
| W3-C3 | M | classify one number and one contiguous 0..2 percentage group per row; no general grammar engine |
| W3-C4 | S–M | reject top-level commas; special-case standalone `normal`; retain the small 2/1 split |
| W3-C5 literal slice | M | one shared length-unit/domain helper; separate `allowAuto` consumer semantics |
| PB1/PB3/PB6 replays | routed | reuse their token/typed-value rails; no W3-local substitutes |

Do not add a generic easing AST, a timeline god module, a second CSS tokenizer,
or a second unit registry. The immediate code delta should remain bounded; most
of the proof cost is fixture reclassification and downstream replay. W4 stays
close-gated on accepted W3, and W5 stays downstream of both, so correcting W3
now prevents a known lossy contract from hardening into later waves.

## 8. Addendum-writing acceptance checklist

The harden/write seats should not close this research into authority unless
the proposed addendum:

- assigns globally unique row numbers without colliding with concurrent W2;
- reproduces the exact success ASTs and failure code/expected/span carriers
  above;
- declares `linear(0)` a pinned-spec expected divergence from both LIVE and
  this Chromium build;
- makes scalar-versus-property comma ownership explicit;
- keeps view `auto` but rejects range `auto`;
- distinguishes literal exponent/zero/unit support from deferred typed math;
- records PB1, PB3, PB6, W4, W5, W7, and conditional W0 replays;
- does not mutate the frozen legacy type surface for `scroll` or plural ranges;
  and
- remains proposed until twice challenged, gestalt-approved, and explicitly
  owner-ratified.

model_served: Codex GPT-5 family (the exact backend revision is not exposed to
this seat; this is a truthful capability receipt and is not represented as an
Opus/Fable route)
