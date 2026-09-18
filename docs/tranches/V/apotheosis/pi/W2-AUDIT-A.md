# π.W2 COLOR — independent E-1 adversarial audit A

model_served: `gpt-5.6-terra` (inherited Codex child route; exact service-side
effort label was not exposed to this seat, so this receipt does not claim Opus)

date: 2026-07-21

## Verdict

**REJECT.** The authored package is mechanically green and much of the direct
transpose is sound, but W2 cannot be accepted. I independently confirmed four
blocking classes:

1. the parser accepts spec-invalid legacy color forms;
2. it misses several parsed-value rules from the hash-pinned CSS Color 4
   authority, including accepting-and-clamping values that it instead rejects;
3. `serializeCssColor` can throw on adversarial object inputs despite the
   tranche-wide any-input no-throw law; and
4. an unsupported function-head family has the wrong LIVE-contract
   `expected[]` diagnostic.

The maintained H-8 bank also does not enumerate the complete legacy arm, and
the receipt's 4,158-case sweep has no executable corpus, command, or digest.
The latter differential claim cannot establish spec correctness in any event:
the most consequential failures below are common to LIVE and mirror.

This pass was independent. I did not read or contact another W2 auditor, did
not edit implementation or production code, and wrote only this report.

## 1. Total-tranche / gestalt analysis

### G-A1 — the W2 boundary is correctly early, but its oracle hierarchy was used incompletely

Closing color before the W1 color seam and before W4 is optimal. Color is a
self-contained L door, it exercises the W0 lexemes and color factories, and it
provides the exact typed value W1 and later serialization/analysis consume.
The Phase-A boundary also correctly defers relative colors, `color-mix()`,
`light-dark()`, and `contrast-color()` to Phase B.

The implementation nevertheless treated LIVE agreement as sufficient beyond
the four pre-enumerated R1/R3/R6/R9 corrections. The charter says the spec is
the arbiter whenever LIVE conflicts. The pinned Color 4 source exposes more
conflicts which are representable in the existing `CssColor` shape. They are
not optional Phase-B syntax growth; they change the meaning or validity of
ordinary W2 forms.

Because these are newly discovered in-progress semantic corrections, E-3
requires a focused research → harden → addenda-write amendment before they
are implemented. W2 should remain rejected while that amendment is challenged
and ratified. It must at least rule:

- legacy `rgb`/`rgba` homogeneous channel types and legacy `hsl`/`hsla`
  percentage-only S/L;
- prohibition of `none` in every legacy component, including alpha;
- parsed-value clamping/normalization for alpha, RGB channels, hue, HSL
  negative saturation, Lab/OKLab lightness, and LCH/OKLCH chroma;
- missing-component behavior for `color(xyz-d50 none …)`.

### G-A2 — the pinned Color 4 surface has grown beyond the frozen 13-space type

The exact pinned source now includes `display-p3-linear` in
`<predefined-rgb>`. The Phase-A `CssColorSpace` union and W2 brief intentionally
name only 13 output spaces, so W2 cannot lower that spelling without widening
the frozen contract. This is not an ad-hoc W2 fix. PB0/PB5 must explicitly
route it and decide the L4 type/serializer shape. Until then, wording such as
"full color door" must be read as "full frozen 13-space Phase-A door," not as
the complete pinned Color 4 inventory.

Unlike `display-p3-linear`, `xyz-d50` missing components are already within the
frozen `xyz`/`Channel = number | "none"` shape, so that rejection is a current
W2 spec defect, not a type-growth excuse.

### G-A3 — PB1 remains a real close-time dependency

The author correctly did not pull the unratified CSS Syntax tokenizer/comment
work into W2. It also means W2 is not independently a final CSS-syntax proof:
comment trivia, escaped identifiers/function heads, CSS whitespace, and token
boundaries remain PB1-owned. Phase-A W2 may close after its own repairs, but
the tranche perfection verdict must replay its full color corpus through PB1.
The receipt's comment-rejection note is therefore an explicit temporary
projection, not evidence that comments are invalid CSS colors.

### G-A4 — third-witness friction

I attempted the E-4 browser CSSOM witness after reading the browser-control
instructions. The runtime returned `No browser is available`; its one permitted
discovery returned an empty browser list. I did not substitute an unrelated UI
driver. The immutable spec bytes therefore arbitrate this pass. Root should
retain a browser `CSS.supports("color", source)`/computed-style replay for the
post-repair audit when a browser backend is available.

## 2. Wave analysis

### What is green

- The original W0 record establishes a pre-feature RED state for all 19 door
  witnesses, including `parseCssColor` and `serializeCssColor`.
- Current package tests, strict TypeScript, emitted declaration/source-contract
  parity, and production-dependency audit all pass.
- The barrel remains exactly 33 type + 19 runtime exports.
- The current W2 files contain no parse-that `regex()` combinator, parser
  `.map()`, `mapState()`, freeze call, or deferred Phase-B color-expression
  spelling.
- The copied named-color table is exactly equal to source: 148 ordered
  entries, canonical entry SHA-256
  `2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c`.
- The parser result, built color, and channel array are not frozen.
- The author preserved the Phase-A/production boundary; no production source
  edit is part of this artifact.

### W-A1 — the H-8 matrix is not actually 13 × three arms

`COLOR_SPACE_MATRIX` proves modern and `none` accepts for 13 output spaces,
but it supplies a legacy case only for RGB and HSL. That is correct for the
*acceptance* grammar, yet H-8's third arm also needs the explicit legacy
rejection for each modern-only family. The R9 test samples only `lab(...)` and
one generic `color(srgb,...)` spelling. It does not enumerate comma rejection
for `hwb`, `lch`, `oklab`, `oklch`, or every `color()` predefined space.

More importantly, the two legacy accepts do not challenge legacy-only
restrictions: homogeneous RGB channel types, HSL percentage-only S/L, and the
absence of `none`. The bank therefore went green around the defects in F-A1.

### W-A2 — the 4,158 sweep is not reproducible and is an insufficient oracle

Only the prose count survives. There is no retained generator, exact input
list, command, result JSON, or content digest. An audit cannot reconstruct what
4,158 combinations meant or prove that later code still passes the same set.

My independent deterministic grid used nine direct function names, seven
channel tokens, all ordered triples, and seven separator/alpha forms:

```text
names    = rgb rgba hsl hsla hwb lab lch oklab oklch
tokens   = 0 1 50% none x 1px 1e309
forms    = space | space/50% | space/none | dangling-/ |
           all-comma | all-comma+alpha | mixed-comma
total    = 9 × 7³ × 7 = 21,609
```

It produced 9,569 LIVE/mirror projection differences which a purely textual
route classified under the existing ledger (R3 3,087; R6 2,324; R9 4,158;
zero left by that classifier). This challenges, rather than validates, the
receipt: a broad R6/R9 label can absorb invalid legacy outcomes, and any
differential is blind to cases where LIVE and mirror share the same spec bug.
Every F-A1 common-mode witness below passes an agreement-only sweep.

The repaired wave should retain a deterministic corpus or generated test with
a digest and assert exact terminal outcomes, not only route differences by
which punctuation occurs in the source.

### W-A3 — born-RED provenance is partial

W0 proves the two public doors were RED before feature implementation. I found
no transcript showing the completed H-8 bank itself failing before the author
made it green. This is not the cause of rejection, but the repaired receipt
should preserve the exact pre-fix RED witnesses for each confirmed defect.

### W-A4 — 313 LOC is not the current optimization target

The file is larger than LIVE largely because it separates spec arms, carries
data rows, and uses shared lexemes. That is justified. `FUNCTION_GRAMMARS`
does lex the function head once and token channels through `numUnit`/`ident`.
However, each parser row is a `completeBody` wrapper which consumes the whole
body and delegates separator composition to imperative `splitTopLevel` calls;
it is not a wholly combinator-composed channel grammar. H-7 expressly permits
audited imperative scanners, so adding combinator ceremony merely to satisfy a
label would violate E-2. Root should either document this as the sanctioned
H-7 scanner layer or replace it only if PB1 reuse/measured behavior warrants.

There are small possible reductions (`containsWord` reimplements LIVE's one
regex in 17 lines), but reducing LOC before correcting the grammar would make
the patch harder to review. I found no safe material deletion that outranks the
semantic blockers.

## 3. Feature analysis

### `parseCssColor`

#### F-A1 — BLOCKING: legacy grammar accepts forbidden mixtures and `none`

The pinned Color 4 source states that legacy components must be all-number or
all-percentage, that `none` is forbidden, and that legacy HSL S/L are
percentages. `parseRow()` instead uses the same permissive channel parser for
modern and legacy branches.

Exact witnesses:

| source | required by pinned Color 4 | current mirror | LIVE |
|---|---|---|---|
| `rgb(1, 2%, 3)` | reject mixed legacy channel types | accepts `[1,5.1,3]` | same shared defect |
| `rgb(none, 2, 3)` | reject legacy `none` | accepts `['none',2,3]` | same shared defect |
| `rgba(1,2,3,none)` | reject legacy `none` alpha | accepts alpha `none` | rejects |
| `hsl(120,50,50)` | reject: legacy S/L require percentages | accepts `[120,.5,.5]` | accepts raw `[120,50,50]` |
| `hsl(none,50%,50%)` | reject legacy `none` hue | accepts | same shared defect |
| `hsla(120,50%,50%,none)` | reject legacy `none` alpha | accepts | rejects |

The two legacy-alpha cases (`rgba(...,none)` and `hsla(...,none)`) are
zero-whitelist mirror defects even against the primary oracle. The others prove
why the spec arbiter is mandatory. R6 applies
number-as-percentage scaling to modern HSL/HWB; it does not authorize widening
legacy HSL. R9 requires correct separate legacy and modern arms; it does not
authorize `none` or mixed types in the legacy arm.

#### F-A2 — BLOCKING/E-3: parsed-value clamping and hue normalization are absent

The hash-pinned source requires:

- alpha outside `[0,1]` to remain syntactically valid and clamp at parsed-value
  time;
- RGB channels outside their range to clamp at parsed-value time;
- hue numbers/angles to normalize to `[0,360)`;
- negative HSL saturation to clamp to zero;
- Lab/LCH lightness and OKLab/OKLCH lightness to clamp to their respective
  ranges; and
- negative LCH/OKLCH chroma to clamp to zero.

Current exact witnesses include:

| source | spec-shaped value/result | current mirror (and LIVE unless noted) |
|---|---|---|
| `rgb(300 -10 20)` | accept `[255,0,20]` | accepts `[300,-10,20]` |
| `rgb(1 2 3 / 2)` | accept, alpha clamps to `1` | rejects `expected:['color_out_of_range']` |
| `hsl(720 -10 50)` | accept `[0,0,.5]` | accepts `[720,-.1,.5]`; LIVE `[720,-10,50]` |
| `lab(150% 0 0)` | L clamps to `100` | L remains `150` |
| `lch(-5 -2 720)` | L `0`, C `0`, hue `0` | `[-5,-2,720]` |
| `oklab(2 0 0)` | L clamps to `1` | L remains `2` |
| `oklch(-1 -.1 -540)` | L `0`, C `0`, hue `180` | `[-1,-.1,-540]` |

These are not in R1/R3/R6/R9 and must not be silently patched. They need the
focused E-3 amendment described in G-A1, exact AST fixtures, and replay through
the serializer/property lane.

#### F-A3 — BLOCKING/E-3: valid missing-component `xyz-d50` is rejected

The pinned `color()` grammar allows `none` in each `<xyz-params>` channel and
lists `xyz-d50` as an `<xyz-space>`. Both LIVE and mirror reject
`color(xyz-d50 none 0 0)` with `expected:['concrete xyz-d50']`. The existing
AST can represent `xyz` missing channels, so the addendum must define the
D50→D65 missing-component lowering rather than reject valid syntax.

#### F-A4 — BLOCKING: unsupported function-head diagnostics drift from LIVE

`fnHead` accepts `_` and `-` starts while LIVE's color-call envelope requires an
ASCII letter. For `_rgb(1 2 3)`, `-rgb(1 2 3)`, and `--rgb(1 2 3)`, LIVE emits
`css_syntax expected:['color']`; the mirror routes an unsupported parsed head
and emits `expected:['CSS color']`. This violates exact ParseIssue fidelity and
is not a named divergence. The repair should preserve a single head lex while
distinguishing "not a color-call envelope" from "recognized call envelope,
unsupported color function."

#### F-A5 — guards, ordinary spaces, hex, named colors, and R1/R3 are sound

The following survived independent challenge:

- all 13 frozen output spaces have exact representative modern/`none` values;
- the listed `color()` spaces, including numeric `xyz-d50` adaptation, match
  LIVE exactly;
- 3/4/6/8-digit hex, `transparent`, case-insensitive named colors, the 148-row
  source table, and D50 numeric output are exact;
- empty functional colors return clean failures rather than throwing (R1);
- dangling top-level alpha slash rejects with `expected:['alpha']` (R3);
- modern raw-number HSL/HWB scaling is correct (the valid portion of R6);
- mixed comma/space forms sampled by the suite reject (the valid portion of
  R9);
- `var`/`env`/system colors emit `color_context_required`, non-CSS-native
  spaces emit the exact guard code, relative colors remain context-required,
  and deferred Color 5 functions remain untyped/rejected;
- non-string primitive inputs return `ok:false`, and ordinary malformed or
  non-finite strings did not throw.

### `serializeCssColor`

#### F-A6 — BLOCKING: any-input no-throw is false

ADDENDA-01 §2 requires every public `/css` entry to return rather than throw on
**any input**. The maintained hostile bank checks primitives and plain objects
only. Property getters and proxies escape the serializer:

```text
throwing `space` getter     -> Error: space
throwing `channels` getter  -> Error: channels
throwing `alpha` getter     -> Error: alpha
throw-on-get Proxy          -> Error: get
revoked Proxy               -> TypeError: Cannot perform 'get' on a revoked proxy
```

`parseCssColor` cleanly rejects all five because it checks `typeof` without
dereferencing. `serializeCssColor` needs an outer no-throw boundary (or an
equivalent hardened validator) and executable proxy/getter fixtures.

#### F-A7 — finite-domain transpose and round-trip are exact

For ordinary values the serializer is an exact, parsimonious live transpose.
An independent generated sweep across 13 spaces, 343 channel triples from
`[-2,-0,0,.1,1,2,'none']`, and five alphas `[0,.5,1,'none',2]` produced:

```text
22,295 / 22,295 serializer results exactly equal to LIVE
17,836 successful serialized values round-tripped to the identical mirror AST
0 successful round-trip failures
```

Its 12-decimal formatter, hue/percentage scaling, alpha suffix, `xyz`
canonical spelling, finite checks, alpha range guard, invalid-shape errors, and
all 13 switch arms match LIVE. The alpha range guard is correct for direct
serializer input under the frozen live contract; F-A2 concerns parsing CSS,
where the spec says out-of-range authored alpha clamps before a color reaches
serialization.

### W1 color seam

The four maintained seam witnesses (`red`, hex, RGB, HSL) correctly wrap the
W2 color value in `parseCssScalar`, `parseCssValue`, and `parseCssValues` with
the LIVE AST shape. The seam itself is structurally simple and I found no
independent wrapping defect. Its bank is too narrow for close: after W2 repair,
the 13-space/hex/named/correction corpus should be projected through all three
W1 doors, and the eventual PB1 replay must cover color comments/escapes/token
boundaries.

## 4. Exact evidence

Pinned source verification:

```text
$ curl -fsSL https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-color-4/Overview.bs -o <tmp>/Overview.bs
$ shasum -a 256 <tmp>/Overview.bs
f5b6afc82d9198d130507448837e19c1b984ae9a1bebb579547822339aaf482a
$ wc -c <tmp>/Overview.bs
430720
```

Those bytes exactly match `formation/l4-root-seed-manifest.json` for Git blob
`238300b75970ab68bf6a0b9339f8e3a01c749b59`. The relevant pinned sections are
`#color-syntax-modern`, `#color-syntax-legacy`, `#alpha-syntax`,
`#hue-syntax`, `#rgb-functions`, HSL/HWB, Lab/LCH, OKLab/OKLCH, and
`#color-function`.

Mechanical gates from `docs/tranches/V/apotheosis/pi/mirror`:

```text
$ npm test
Test Files  10 passed (10)
Tests       45 passed | 4 todo (49)

$ npm run check
tsc --noEmit                         # exit 0

$ npm run dts-parity
tsc --noEmit                         # exit 0
tsc -p tsconfig.declarations.json    # exit 0
tsc -p tsconfig.source-contract.json # exit 0
V·π W0 d.ts parity GREEN: 33 types + 19 runtime exports.

$ npm audit --omit=dev
found 0 vulnerabilities
```

Static restrictions:

```text
$ rg -n 'Object\.freeze|deepFreeze|freeze\(|regex\(|\.map\(|mapState\(|color-mix|light-dark|contrast-color|relative' \
    mirror/grammar/color.ts mirror/serialize.ts mirror/lexeme.ts
# no matches (exit 1)

$ wc -l mirror/grammar/color.ts mirror/serialize.ts mirror/test/w2-color.test.ts
313 mirror/grammar/color.ts
 47 mirror/serialize.ts
217 mirror/test/w2-color.test.ts
```

Named source probe:

```text
sourceCount=148 mirrorCount=148 exact=true
ordered-entry-sha256=2949c59aab6154988afb83744b954bd58146a06ada4d53831e6720ee01f64d0c
```

The exact feature probes were executed with the package-local TS runtime:

```text
$ node --import tsx --input-type=module -e '<LIVE/mirror legacy, clamp, diagnostic, deferred-function bank>'
$ node --import tsx --input-type=module -e '<21,609-case direct-function grid defined in W-A2>'
$ node --import tsx --input-type=module -e '<22,295-case serializer grid defined in F-A7>'
$ node --import tsx --input-type=module -e '<throwing-getter/revoked-proxy hostile bank>'
```

## 5. Required route before re-audit

1. Keep W2 **REJECTED** and do not start dependent close adjudication from its
   current GREEN tests.
2. Form and twice-challenge the narrow E-3 color-correction addendum for F-A1,
   F-A2, and F-A3; explicitly route `display-p3-linear` to PB0/PB5.
3. Repair the legacy arms, parsed-value rules, missing-component lowering,
   diagnostic envelope, and serializer no-throw boundary.
4. Turn every exact witness in this report into maintained RED→GREEN tests;
   enumerate all H-8 legacy-reject rows and retain the generated sweep/corpus
   with a content digest.
5. Replay the repaired full color corpus through all three W1 value doors,
   rerun all mechanical gates, then dispatch two fresh independent E-1 passes.

**Final seal: REJECT — confirmed code defects and newly discovered spec
corrections require repair/addenda and fresh twice-audit.**
