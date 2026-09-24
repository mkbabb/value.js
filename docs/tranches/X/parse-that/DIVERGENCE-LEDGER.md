SERVED MODEL: claude-opus-5[1m]

# DIVERGENCE-LEDGER — X·P, opened by X.P.W3.d

**Authority**: `docs/tranches/X/parse-that/waves/W3.md` §5 `.d` and §6 **G-7**. **Sub-tranche** X·P,
`docs/tranches/X/COHESION.md` §0j.E. **Generated**, never hand-written:
`<p2>/typescript/test/css-equivalence/emit-divergence-ledger.mjs`. Re-running it against the same
settled bytes reproduces this file byte-for-byte — the document carries no timestamp, by design.

## §0 What this file is, and what it is not

`W3.md` §5 `.d` names the six fields every row carries: **input · incumbent result · candidate
result · spec citation · adjudication · the direction of behaviour change for a consumer**. §6 G-7's
falsifier makes the last one load-bearing: *"A row whose 'direction of behaviour change for a
consumer' field is empty fails; that field is what the KF and glass packets quote."* And it makes the
file itself load-bearing: *"one mirror-defect reddens it, and so does an **unrowed** intentional
difference — the gate treats 'we meant to do that' without a ledger row as identical to a defect."*

**The two result columns are MEASURED.** Every input below was run, at this file's generation, through
the vendored sha-pinned published 4.0.0 tarball and through **both** candidate lowerings, and what the
engines did is what is printed. Nothing in those two columns was typed from a document.

**The adjudication and direction columns are CARRIED.** §1's sixteen are `.a`'s, out of
`registry/adjudicated/parser-band.md`; §2's 4 DISSENTS and §3's 5 fixtures come from their own
authorities; §4 is `.b`'s F-b4, routed to this seat inside the wave; §5 is generated from the
candidate's own `UNREALIZED_ENTRIES` against the pinned barrel; **§7** is generated from `bounds.mjs`'s
own `CAPACITY_REGIONS` and carries §0p/§0q as its authority; **§9** carries 8 INCUMBENT-DEFECT rows,
each citing the specification the incumbent's acceptance contradicts. **This seat adjudicates nothing.**
§6 is reserved for `.e`, the fresh Fable
adjudicator (M-23 §1) — *an author cannot adjudicate his own union* — is deliberately left empty by
this program, and is now CARRIED VERBATIM across re-emissions instead of being destroyed by them.

### §0.1 Provenance, measured

| item | reading |
|---|---|
| pinned value.js commit | `6aca86020b6b2605e7d0f04fccb6601746e387f7` |
| frozen barrel | `6aca86020b6b2605e7d0f04fccb6601746e387f7:src/css/index.ts` — 1310 B, sha256 `c09d076ed779fedee1840c59900e0f34e5cba36c32c126ced864a849a3acf90c` |
| frozen types | `6aca86020b6b2605e7d0f04fccb6601746e387f7:src/css/types.ts` — 5879 B, sha256 `109327ce94fdcc37d57677e23e3c0bd0c8dfde399ace2998a87e2442d9338fe2` |
| **oracle** | `typescript/test/css-equivalence/vendor/value.js-4.0.0.tgz` — 37290 B, sha256 `7f80658ca4e16e99ccbb41ad6c9d8c08b2e5f86a7c951d2a833c97f89fb303ae` |
| oracle npm integrity | `sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==` — the registry's own, asserted in-test before any comparison runs |
| oracle exports | 19 runtime names |
| candidate | AC-1 TAGLESS-TWIN, two lowerings (`js`, `wasm`), entries `parseCssColor`, `parseTimingFunction`, `parseStylesheet`, `parseCssScalar`, `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`, `parseAnimationTimeline`, `parseAnimationRange` |
| candidate unrealized | `` — named by the candidate itself, never omitted |

### §0.2 Row census

| § | family | rows | authority |
|---|---|---|---|
| §1 | ADJUDICATED | 16 | `registry/adjudicated/parser-band.md` via `.a`'s `lib/adjudications.mjs` |
| §2 | PRESERVED DISSENT | 4 | `parser-band.md` DISSENTS, anchored by text |
| §3 | REGRESSION FIXTURE | 5 | `apotheosis/parser-proof/GATE-VERDICT.md` F-2 |
| §4 | LABEL SURFACE | 1 | `X-P-W3.md` `.b` F-b4 |
| §5 | DECLARED COVERAGE NARROWING | 3 | the candidate's `UNREALIZED_ENTRIES` × the pinned barrel |
| §7 | CAPACITY BOUND | 9 | `bounds.mjs`'s own `CAPACITY_REGIONS`, measured or derived |
| §8 | SPEC-DIVERGENCE (realized entry) | 0 | this wave's own measurement; EMPTY since `.k` promoted SP-1 to §9 |
| §9 | INCUMBENT-DEFECT | 8 | ESC-g1 — the oracle mis-accepts, the candidate is right per spec |
| | **total** | **46** | 8 generated families; §6 is `.e`'s carried block and is counted in neither column |

**Empty consumer-direction fields: 0.** (G-7 fails on any.)
**`GATE-VERDICT.md` anchors present: 5/5** — each fixture's anchor re-read in its authority at generation.

---

## §1 The adjudicated conflicts — `.a` resolved them, this seat rows them

`X-P-W3.md` §P.1 binds the two halves: *"`.a`'s adjudicated conflicts and `.d`'s divergence rows are
one family: every conflict `.a` resolves against `parser-band.md` MUST appear as a `.d` row. G-7 fails
on an unrowed intentional difference exactly as it fails on a defect."* The family is asserted
mechanically by `node typescript/scripts/css-universe.mjs --cross-check-ledger <this file>`, which
checks each row's **id** and each of its **inputs** by string.

**NO NINTH `ParseIssue` CODE IS PROPOSED ANYWHERE IN THIS FILE.** `parser-band.md` spells ADJ-3's
resolution `color_non_finite`, which is cand-O's own diagnostic vocabulary and is **not** one of the
frozen eight (`src/css/types.ts:11-19`). The adjudication is carried at its MEANING — clamp where a
clamp exists, reject the unclamped non-finite channel — lowered onto `css_syntax`, and the naming
difference is itself ADJ-3's own field. Adding the ninth would be a `W3.md` §3a halt to X·V and the
owner, *"never a local decision"*.

### PB-01 — legacy 4-argument rgba() parses

| field | value |
|---|---|
| **input(s)** | `"rgba(1, 2, 3, 0.5)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECT — the gap confirmed as P-012 |
| **candidate (required)** | ACCEPT — `{"space":"rgb","channels":[1,2,3],"alpha":0.5}` |
| **spec citation** | css-color-4 §8.1 — the legacy rgba() form with four comma-separated arguments |
| **adjudication** | ACCEPT — the most-deployed colour syntax on the web must parse |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:87 — "REJECT (gap) \| accept \| accept \| **GAP confirmed** (P-012): the most-deployed colour syntax on the web fails" |
| **consumer direction** | WIDENS acceptance: input the incumbent rejects now parses. A consumer that treated the rejection as a signal loses it; no consumer that relied on acceptance is affected. |
| **G-6 row** | `a` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgba(1, 2, 3, 0.5)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":18,"expected":["CSS color"],"actual":"rgba(1, 2, 3, 0.5)"}]} | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":0.5},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":0.5},"diagnostics":[]} |

### PB-02 — legacy 4-argument hsla() parses

| field | value |
|---|---|
| **input(s)** | `"hsla(120, 50%, 50%, 0.5)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECT — the gap confirmed as P-015 |
| **candidate (required)** | ACCEPT — `{"space":"hsl","channels":[120,0.5,0.5],"alpha":0.5}` |
| **spec citation** | css-color-4 §7 — the legacy hsla() form |
| **adjudication** | ACCEPT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:88 — "REJECT (gap) \| accept \| accept \| **GAP confirmed** (P-015)" |
| **consumer direction** | WIDENS acceptance, as PB-01. |
| **G-6 row** | `b` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hsla(120, 50%, 50%, 0.5)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":24,"expected":["CSS color"],"actual":"hsla(120, 50%, 50%, 0.5)"}]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":0.5},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":0.5},"diagnostics":[]} |

### PB-03 — the two spec-identical hsl spellings agree bit-for-bit

| field | value |
|---|---|
| **input(s)** | `"hsl(120 50 50)"` · `"hsl(120 50% 50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | [120,50,50] vs [120,0.5,0.5] — R6 confirmed: two spec-identical spellings disagree 100× |
| **candidate (required)** | ACCEPT |
| **spec citation** | css-color-4 §7 — <percentage> and <number> are interchangeable for hsl() saturation/lightness in the modern form |
| **adjudication** | BOTH parse to [120,0.5,0.5] — the bare number and the percentage are the same value |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:96 — "[120,50,50] vs [120,0.5,0.5] \| consistent \| consistent (0.5) \| **R6 confirmed**: two spec-identical spellings disagree 100×" |
| **consumer direction** | CHANGES VALUE by a factor of 100 for `hsl(120 50 50)`: the incumbent returns 50, the candidate 0.5. A consumer that read the incumbent's bare-number saturation as a percentage got a value 100× too large; that arithmetic changes. |
| **G-6 row** | `c` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hsl(120 50 50)"` | {"ok":true,"value":{"space":"hsl","channels":[120,50,50],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} |
| `"hsl(120 50% 50%)"` | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} |

### PB-04 — out-of-range rgb channels clamp

| field | value |
|---|---|
| **input(s)** | `"rgb(300 -20 3)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | [300,−20,3] — unclamped |
| **candidate (required)** | ACCEPT — `{"space":"rgb","channels":[255,0,3],"alpha":1}` |
| **spec citation** | css-color-4 §8.1 / §12 — rgb() channel values are clamped to the [0,255] range |
| **adjudication** | CLAMP to [255,0,3] |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:94 — "[300,−20,3] unclamped \| [255,0,3] \| [255,0,3] \| §8.1 clamp missing in published" |
| **consumer direction** | CHANGES VALUE: out-of-range channels now arrive clamped. Downstream colour maths that compensated for the incumbent's unclamped values must stop compensating. |
| **G-6 row** | `d` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(300 -20 3)"` | {"ok":true,"value":{"space":"rgb","channels":[300,-20,3],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,3],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,3],"alpha":1},"diagnostics":[]} |

### PB-05 — out-of-range alpha clamps rather than rejecting

| field | value |
|---|---|
| **input(s)** | `"rgb(1 2 3 / 1.5)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECT |
| **candidate (required)** | ACCEPT — `{"space":"rgb","channels":[1,2,3],"alpha":1}` |
| **spec citation** | css-color-4 §4.2 — <alpha-value> outside [0,1] is clamped, not invalid |
| **adjudication** | ACCEPT with alpha clamped to 1 |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:95 — "REJECT \| alpha=1 \| alpha=1 \| §4.2 says clamp, not reject" |
| **consumer direction** | WIDENS acceptance and fixes the value: input the incumbent rejected now parses with alpha 1. |
| **G-6 row** | `e` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1 2 3 / 1.5)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":16,"expected":["color_out_of_range"],"actual":"rgb(1 2 3 / 1.5)"}]} | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} |

### PB-06 — a trailing legacy comma rejects

| field | value |
|---|---|
| **input(s)** | `"rgb(1,2,3,)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT — P-037 unsound accept confirmed |
| **candidate (required)** | REJECT |
| **spec citation** | css-syntax-3 §5.4.1 / css-color-4 §8.1 — an empty component value is not <alpha-value> |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:89 — "ACCEPT \| reject \| reject \| P-037 unsound accept confirmed" |
| **consumer direction** | NARROWS acceptance: a malformed string the incumbent accepted is now an ok:false with a located diagnostic. |
| **G-6 row** | `f` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1,2,3,)"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |

### PB-07 — a dangling slash rejects

| field | value |
|---|---|
| **input(s)** | `"rgb(1 2 3 / )"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT — P-037 |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §4.2 — the solidus must be followed by an <alpha-value> |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:90 — "ACCEPT \| reject \| reject \| P-037 confirmed" |
| **consumer direction** | NARROWS acceptance, as PB-06. |
| **G-6 row** | `g` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1 2 3 / )"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":12,"end":13,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":12,"end":13,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |

### PB-08 — mixed separators reject

| field | value |
|---|---|
| **input(s)** | `"rgb(1, 2 3)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT [1,2,3] — the comma→space rewrite makes separators invisible |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §8.1 — the legacy form is comma-separated throughout; the modern form is space-separated throughout |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:91 — "ACCEPT [1,2,3] \| reject \| reject \| comma→space rewrite makes separators invisible (found by the bench honesty gate)" |
| **consumer direction** | NARROWS acceptance. This row is the one the BENCH honesty gate found, not the suite: a candidate that reproduces the rewrite passes every value check and still fails here (W3.md §6 G-6). |
| **G-6 row** | `h` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1, 2 3)"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":9,"end":11,"expected":["<comma>"],"actual":"3)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":9,"end":11,"expected":["<comma>"],"actual":"3)"}]} |

### PB-09 — a percentage hue rejects

| field | value |
|---|---|
| **input(s)** | `"hsl(120%, 50%, 50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT, hue = 432 |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §7 — <hue> is <number> \| <angle>; a <percentage> is not a hue |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:92 — "ACCEPT, hue=432 \| reject \| reject \| percentage `<hue>` over-accept, §7" |
| **consumer direction** | NARROWS acceptance, and removes a silently wrong hue (432). |
| **G-6 row** | `i` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hsl(120%, 50%, 50%)"` | {"ok":true,"value":{"space":"hsl","channels":[432,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":19,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":19,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… |

### PB-10 — a percentage in lch()'s hue position rejects

| field | value |
|---|---|
| **input(s)** | `"lch(50% 50% 50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT, hue = 180 |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §9.3 — lch()'s third component is <hue>, never <percentage> |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:93 — "ACCEPT, hue=180 \| reject \| reject \| same class" |
| **consumer direction** | NARROWS acceptance, as PB-09. |
| **G-6 row** | `j` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"lch(50% 50% 50%)"` | {"ok":true,"value":{"space":"lch","channels":[50,75,180],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":14,"end":16,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-un… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":14,"end":16,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-un… |

### PB-11 — the css-color-4 functions have no comma form

| field | value |
|---|---|
| **input(s)** | `"hwb(120, 30%, 40%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §8 — hwb() takes space-separated components only; there is no legacy comma form |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:98 — "ACCEPT \| reject \| reject \| css-color-4 functions have no comma form" |
| **consumer direction** | NARROWS acceptance. |
| **G-6 row** | `k` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hwb(120, 30%, 40%)"` | {"ok":true,"value":{"space":"hwb","channels":[120,0.3,0.4],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":18,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":18,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… |

### PB-12 — `1.` is not a CSS number

| field | value |
|---|---|
| **input(s)** | `"rgb(1. 2 3)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | ACCEPT |
| **candidate (required)** | REJECT |
| **spec citation** | css-syntax-3 §4.3.12 — a <number-token> with a decimal point requires at least one following digit |
| **adjudication** | REJECT |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:97 — "ACCEPT \| reject \| reject \| `1.` is not a CSS number" |
| **consumer direction** | NARROWS acceptance. |
| **G-6 row** | `l` |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1. 2 3)"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":5,"end":11,"expected":["<percent-sign>","<number>","<none-keyword> ('none')","<comma>"],"actual":". 2 3)… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":5,"end":11,"expected":["<percent-sign>","<number>","<none-keyword> ('none')","<comma>"],"actual":". 2 3)… |

### PB-13 — `currentcolor` is a context-dependent colour

| field | value |
|---|---|
| **input(s)** | `"currentcolor"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECT — the published gap; the adapter answers `color_context_required` |
| **candidate (required)** | REJECT |
| **spec citation** | css-color-4 §6.2 — currentcolor computes to the value of the color property, which a context-free parse does not have |
| **adjudication** | REJECT with the frozen `color_context_required` code — a context-free parse cannot resolve it |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:99 — "REJECT \| accept (node) \| context node; adapter `color_context_required` \| published gap" |
| **consumer direction** | NONE at the adapter boundary — incumbent and candidate both reject with `color_context_required`. The divergence parser-band records is at cand-F's NODE level, below the shipped surface. |
| **G-6 row** | — (not one of the twelve named G-6 rows) |
| **diverges from incumbent** | no — both engines agree; rowed so the agreement is on the record too |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"currentcolor"` | {"ok":false,"diagnostics":[{"code":"color_context_required","start":0,"end":12,"expected":["context-free color"],"actual":"currentcolor"}]} | {"ok":false,"diagnostics":[{"code":"color_context_required","start":12,"end":12,"expected":["<context-free-color> (a context colour has no value outside a compu… | {"ok":false,"diagnostics":[{"code":"color_context_required","start":12,"end":12,"expected":["<context-free-color> (a context colour has no value outside a compu… |

### ADJ-1 — hue is not wrapped at parse time

| field | value |
|---|---|
| **input(s)** | `"hsl(480 50% 50%)"` · `"hsl(-120 50% 50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | unwrapped — 480 / −120; the incumbent agrees with the adjudication |
| **candidate (required)** | ACCEPT |
| **spec citation** | css-color-4 §7 — <hue> is an <angle>; normalization is a serialization act, not a parse act |
| **adjudication** | UNWRAPPED — cand-F's parse-time mod-360 is dropped |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:98 — "480 / −120 (unwrapped) \| **120 / 240 (wrapped)** \| 480 / −120 \| cand-F's parse-time mod-360 is a drop-in divergence; wrapping is serialisation-time" |
| **consumer direction** | NONE against the incumbent — published and the adjudication agree. The change is against cand-F's FOLDED SUITE, whose wrapped expectations are dropped: a consumer of cand-F's numbers would read 480 where it read 120. |
| **G-6 row** | — (not one of the twelve named G-6 rows) |
| **diverges from incumbent** | no — both engines agree; rowed so the agreement is on the record too |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hsl(480 50% 50%)"` | {"ok":true,"value":{"space":"hsl","channels":[480,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[480,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[480,0.5,0.5],"alpha":1},"diagnostics":[]} |
| `"hsl(-120 50% 50%)"` | {"ok":true,"value":{"space":"hsl","channels":[-120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[-120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[-120,0.5,0.5],"alpha":1},"diagnostics":[]} |

### ADJ-2 — token juxtaposition is accepted

| field | value |
|---|---|
| **input(s)** | `"rgb(50%20%30%)"` · `"rgb(1.5.5 3)"` · `"hsl(120 50%50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECTS all three |
| **candidate (required)** | ACCEPT |
| **spec citation** | css-syntax-3 §4 — `50%20%30%` tokenizes as three <percentage-token>s; whitespace is not required between tokens that cannot merge |
| **adjudication** | ACCEPT — the css-syntax token-stream reading browsers implement |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:104 — "O accepts per css-syntax token-stream reading, matching browsers; F rejects as a declared simplification; note published rejects these too, so O diverges from the incumbent **toward** the spec" · DISSENT preserved at :140 |
| **consumer direction** | WIDENS acceptance relative to the incumbent: a consumer relying on the incumbent's rejection of juxtaposed tokens would see these parse. parser-band.md:140 reserves the owner's overrule toward cand-F's stricter line without disturbing the rest of the verdict. |
| **G-6 row** | — (not one of the twelve named G-6 rows) |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(50%20%30%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":14,"expected":["CSS color"],"actual":"rgb(50%20%30%)"}]} | {"ok":true,"value":{"space":"rgb","channels":[127.5,51,76.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[127.5,51,76.5],"alpha":1},"diagnostics":[]} |
| `"rgb(1.5.5 3)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":12,"expected":["CSS color"],"actual":"rgb(1.5.5 3)"}]} | {"ok":true,"value":{"space":"rgb","channels":[1.5,0.5,3],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[1.5,0.5,3],"alpha":1},"diagnostics":[]} |
| `"hsl(120 50%50%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["CSS color"],"actual":"hsl(120 50%50%)"}]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} |

### ADJ-3 — non-finite numerals — clamp where a clamp exists, reject where none does

| field | value |
|---|---|
| **input(s)** | `"rgb(1e400 0 0)"` · `"lab(50 1e400 0)"` · `"hsl(1e400 0% 50%)"` |
| **parser** | `parseCssColor` |
| **incumbent (as adjudicated)** | REJECTS `1e400` outright, in every position |
| **candidate (required)** | `"rgb(1e400 0 0)"` → ACCEPT · `"lab(50 1e400 0)"` → REJECT · `"hsl(1e400 0% 50%)"` → REJECT |
| **code naming** | cand-O names the rejection `color_non_finite`. That code is NOT in the frozen 8-code ParseIssue union (src/css/types.ts:11-19); adding it would be a ninth code and a W3.md §3a halt. The adjudication is carried at its meaning and lowered onto `css_syntax`. NO NINTH CODE IS PROPOSED. |
| **spec citation** | css-color-4 §4.2 and §12 (out-of-range values clamp at computed-value time); css-values-4 §10.9 — a numeric token outside the implementation range is not a <number> |
| **adjudication** | cand-O's reading — clamped channels accept at the clamp, unclamped channels reject |
| **citation** | docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:97 — "REJECT \| **accept, a=∞ in AST** \| `color_non_finite` \| cand-F's sole adjudicated correctness debit" · docs/tranches/V/megatranche/registry/adjudicated/parser-band.md:141 — "three-way split — published rejects 1e400 outright; cand-O clamps where clamps exist and fails color_non_finite on unclamped channels; cand-F admits Infinity … the GROUND-C contract question ('are ±Infinity admitted?') deserves an owner ruling" |
| **consumer direction** | WIDENS acceptance where a clamp exists (`rgb(1e400 0 0)` parses to 255 where the incumbent rejects) and holds the incumbent's rejection where none does. The GROUND-C ±Infinity contract ruling is OWNER-OWED and W3.md §10 leaves it 'not opened here'. |
| **G-6 row** | — (not one of the twelve named G-6 rows) |
| **diverges from incumbent** | YES |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1e400 0 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":14,"expected":[],"actual":"rgb(1e400 0 0)"}]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,0],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,0],"alpha":1},"diagnostics":[]} |
| `"lab(50 1e400 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":[],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":15,"end":15,"expected":["<finite-number>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":15,"end":15,"expected":["<finite-number>"],"actual":null}]} |
| `"hsl(1e400 0% 50%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":17,"expected":[],"actual":"hsl(1e400 0% 50%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} |

---

## §2 The four preserved DISSENTS

`W3.md` §2c routes them here by name — 4 of them: *"`parser-band.md` DISSENTS (token juxtaposition · non-finite ·
try/catch posture · bench epistemics) | **DECLARED-DIVERGENCE ROWS, not silent picks** | `.d`'s ledger,
asserted in both directions; **G-7** fails if any divergence is unrowed."* Each is PRESERVED and
UNRESOLVED: a dissent that this seat resolved would be a dissent this seat overruled.

### S-1 — Token juxtaposition

| field | value |
|---|---|
| **input(s)** | `"rgb(50%20%30%)"` · `"rgb(1.5.5 3)"` · `"hsl(120 50%50%)"` |
| **incumbent** | REJECT (published rejects; cand-F rejects) |
| **candidate** | ACCEPT — the css-syntax token-stream reading the adjudication adopted. SPLIT BY MEASUREMENT at X.P.W3.g (COHESION §0p F-e1/F-e2): the adopted reading is maximal-munch, and maximal-munch is what makes a juxtaposed NUMBER+IDENT run ONE <dimension-token> (§4.3.3). The three inputs above juxtapose `%`-terminated and `.`-led tokens, which ARE separate tokens, and they are still accepted; `hsl(120deg50%50%)` and `rgb(255none none)` are NOT — they were accepted before `.g` and are now rejected, which is the same reading applied where it bites rather than a second reading. The incumbent rejects those two as well, so the split ADDS no divergence: it removed seven MIS_ACCEPT cells from G-7 (5,890 → 5,883, measured). |
| **spec citation** | css-syntax-3 §4 — tokenization is maximal-munch over the code-point stream, so `50%20%` is two tokens; browsers agree. §4.3.3 is the same rule's other edge: after a number, code points that would start an ident sequence (§4.3.9) are consumed as the token's UNIT, so `255none` is one <dimension-token> and `deg50` is not `deg`. |
| **adjudication** | ADOPTED toward cand-O (parser-band.md VERDICT). PRESERVED, UNRESOLVED as a DISSENT: the ruling WIDENS acceptance relative to the incumbent and the owner may overrule toward cand-F's stricter line. |
| **consumer direction** | WIDENS acceptance. A consumer that fed `rgb(50%20%30%)` and read the rejection as 'malformed' now receives a colour. No consumer that relied on acceptance is affected. If the owner overrules toward cand-F, this row reverses and the reversal is a breaking change for anyone who came to depend on the widening — which is why the row is pinned before adoption, not after. |
| **anchor in `parser-band.md`** | `**Token juxtaposition**` |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(50%20%30%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":14,"expected":["CSS color"],"actual":"rgb(50%20%30%)"}]} | {"ok":true,"value":{"space":"rgb","channels":[127.5,51,76.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[127.5,51,76.5],"alpha":1},"diagnostics":[]} |
| `"rgb(1.5.5 3)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":12,"expected":["CSS color"],"actual":"rgb(1.5.5 3)"}]} | {"ok":true,"value":{"space":"rgb","channels":[1.5,0.5,3],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[1.5,0.5,3],"alpha":1},"diagnostics":[]} |
| `"hsl(120 50%50%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["CSS color"],"actual":"hsl(120 50%50%)"}]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,0.5],"alpha":1},"diagnostics":[]} |

### S-2 — Non-finite numerals

| field | value |
|---|---|
| **input(s)** | `"rgb(1e400 0 0)"` · `"lab(50 1e400 0)"` · `"hsl(1e400 0% 50%)"` |
| **incumbent** | REJECT outright |
| **candidate** | CLAMP where a clamp exists (`rgb(1e400 0 0)` → 255), REJECT the unclamped non-finite channel — lowered onto `css_syntax`, because the frozen union has eight codes and `color_non_finite` is not one of them |
| **spec citation** | css-values-4 §10.9 — a calculation producing a value outside the allowed range is clamped to that range; css-color-4 §4.1 — rgb() channels are clamped to [0,255] |
| **adjudication** | PRESERVED, UNRESOLVED — a three-way split (published rejects · cand-O clamps-then-rejects · cand-F admits Infinity). The GROUND-C contract question (are ±Infinity admitted?) is OWNER-OWED and `W3.md` §10 lists it under 'Not opened here'. `.a` carried the adjudication at its MEANING and rowed the naming difference rather than minting a ninth ParseIssue code, which would be a §3a halt. |
| **consumer direction** | SPLITS by channel. `rgb(1e400 0 0)` WIDENS (the incumbent rejects; the candidate clamps to 255). `lab(…)`/`hsl(…)` with a non-finite hue stay rejected, so nothing narrows. A consumer reading the diagnostic code sees `css_syntax` where cand-O's own vocabulary would have said `color_non_finite`: the code is less specific than the research prototype's, and deliberately so — the frozen eight-code union is a contract, not a preference. |
| **anchor in `parser-band.md`** | `**Non-finite numerals**` |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1e400 0 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":14,"expected":[],"actual":"rgb(1e400 0 0)"}]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,0],"alpha":1},"diagnostics":[]} | {"ok":true,"value":{"space":"rgb","channels":[255,0,0],"alpha":1},"diagnostics":[]} |
| `"lab(50 1e400 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":[],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":15,"end":15,"expected":["<finite-number>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":15,"end":15,"expected":["<finite-number>"],"actual":null}]} |
| `"hsl(1e400 0% 50%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":17,"expected":[],"actual":"hsl(1e400 0% 50%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} |

### S-3 — try/catch posture

| field | value |
|---|---|
| **input(s)** | — an axis, not a string |
| **incumbent** | n/a — a posture, not an input; the incumbent ships no shield and throws (R1) |
| **candidate** | cand-O's outer guard RETAINED as a proven non-load-bearing shield; `.c` measured 160,710 raw unshielded calls with 0 throws and `SHIELD.caught` = 0 |
| **spec citation** | not a specification question — an engineering posture over the same frozen `ParseResult` contract |
| **adjudication** | PRESERVED, UNRESOLVED. cand-F holds a shield converts an impossible bug into a silent `ok:false` and ships without one. `W3.md` §5 `.c` makes that position tenable 'if `.c` lands the depth bound' — the bound IS landed (`.c`, `<p2>` `f14f59f`) — and states removal is 'a live option for X.P.W4, not a decision here'. It is not decided here either. |
| **consumer direction** | NONE TODAY, by measurement: the shield has never fired, so no consumer has ever received a shield-shaped result. The direction is contingent — if X.P.W4 removes it, a future combinator defect would surface as a throw rather than as `ok:false`, which is cand-F's whole argument; if it stays, such a defect would surface as `ok:false` with `SHIELD.caught` incremented and the fault recorded. |
| **anchor in `parser-band.md`** | `**try/catch posture**` |

_No input cell: this row is an axis, not a string. Its two halves are stated as postures above._

### S-4 — Bench epistemics

| field | value |
|---|---|
| **input(s)** | — an axis, not a string |
| **incumbent** | the 07-20 gate's recorded reading: 'LIVE regex measured FASTEST ~1.8×' |
| **candidate** | three independent measurements (two candidates and an arbiter, three methods) read the opposite direction; this wave's own three-leg table is a fourth |
| **spec citation** | not a specification question — a measurement-epistemics question |
| **adjudication** | PRESERVED, UNRESOLVED and OWNER-GATED. COHESION §0j.E OC-1: 'ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING.' `W3.md` §6 G-10: 'Inventing a bar is a defect.' The contradiction with the 07-20 reading is carried as a ROW in the bench table, never reconciled and never erased. |
| **consumer direction** | NONE. No consumer behaviour changes on this row; it changes what a READER of the bench table may conclude. The row exists so that a future reader meeting two opposite readings finds both, with their methods, rather than one that quietly survived. |
| **anchor in `parser-band.md`** | `**Bench epistemics**` |

_No input cell: this row is an axis, not a string. Its two halves are stated as postures above._

---

## §3 R1–R5 — the spec-correct regression fixtures

`W3.md` §5 `.d`: *"R1–R5 from `GATE-VERDICT.md` F-2 are held as **spec-correct regression fixtures** —
the mirror preserves spec-correctness, never bug-compatibility."* The fixtures NOT met by this
wave say so in their own rows; a fixture recorded as met when it was not is the dishonesty §11
guardrail 2 names.

### R1 — empty functional colour bodies throw

| field | value |
|---|---|
| **input(s)** | `"oklch()"` · `"rgb()"` · `"hsl()"` · `"rgba()"` · `"lab()"` · `"color()"` |
| **incumbent** | THROWS `TypeError` from `parseFunctionalColor` (`src/css/grammar.ts` ~L181) — a shipping crash |
| **candidate** | `ok:false` with `css_syntax` and a non-empty diagnostics tuple — the frozen contract's own promise |
| **spec citation** | `src/css/types.ts:25-27` — `ParseResult<T>` is `{ok:true,…} \| {ok:false, diagnostics:[ParseIssue, ...ParseIssue[]]}`; a function that throws has not failed to be fast, it has failed to have the type it declares (`W3.md` §2a) |
| **adjudication** | SPEC-CORRECT REGRESSION FIXTURE (`GATE-VERDICT.md` F-2: 'In all five, C14 is the spec-correct engine. These become regression fixtures the mirror must PRESERVE — spec-correctness, NOT bug-compatibility with live'). The candidate is REQUIRED to differ. |
| **consumer direction** | STRICTLY SAFER. A consumer that called `parseCssColor('oklch()')` crashed; it now receives `ok:false`. A consumer that WRAPPED the call in try/catch to survive the crash keeps working — the catch simply stops firing. No consumer loses information: the thrown `TypeError` carried no span and no code, and the `ParseIssue` carries both. |
| **anchor in `GATE-VERDICT.md`** | `ʼparseCssColor("oklch()")ʼ` — PRESENT, re-read at generation |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"oklch()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"rgb()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"hsl()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"rgba()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":5,"end":6,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":5,"end":6,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"lab()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":5,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"color()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<color-space> (srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<color-space> (srgb, srgb-linear, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz… |

### R2 — valid qualified rules over-rejected

| field | value |
|---|---|
| **input(s)** | — no input cell in this wave's corpus; see the adjudication field |
| **incumbent** | REJECTS 10 valid qualified rules — `animation_option_invalid` on `var()`/`calc()` compositions, and relative-colour inside `color-mix()` |
| **candidate** | NOT REACHED by this wave's candidate: `color-mix()` and the relative-colour arm are outside the declared shape (`W3.md` §10 'Not opened here'), and the candidate's stylesheet entry carries qualified rules without the incumbent's animation-option pass |
| **spec citation** | css-animations-1 §3 · css-color-5 §4 (relative colour) · css-values-4 §7 (`var()`/`calc()` substitution) |
| **adjudication** | SPEC-CORRECT REGRESSION FIXTURE, HELD — and explicitly NOT discharged by this wave. Recorded so a later reader cannot mistake 'the candidate does not reproduce the over-rejection' for 'the candidate cures it'. |
| **consumer direction** | NO CHANGE TODAY for the ten inputs, because the candidate does not realize the productions they exercise. The direction is DEFERRED to the css-color-5 wave `W3.md` §10 names; this row is the standing reminder that the fixture is owed, not met. |
| **anchor in `GATE-VERDICT.md`** | `R2: 10 valid qualified rules` — PRESENT, re-read at generation |

_No input cell: this row is an axis, not a string. Its two halves are stated as postures above._

### R3 — dangling-alpha leniency

| field | value |
|---|---|
| **input(s)** | `"rgb(1 2 3 / )"` · `"rgb(1,2,3,)"` |
| **incumbent** | ACCEPTS both — the dangling separator is swallowed and a colour is returned |
| **candidate** | REJECTS both with `css_syntax` (measured; these are also `.a`'s PB-07 and PB-06) |
| **spec citation** | css-color-4 §4.1 — the `/ <alpha-value>` production requires an alpha value; a trailing comma terminates no production |
| **adjudication** | SPEC-CORRECT REGRESSION FIXTURE, MET. Overlaps `.a`'s PB-06/PB-07 by input, and the overlap is stated rather than deduplicated: the same two strings carry a GATE-VERDICT identity and a parser-band identity and a reader of either must find the other. |
| **consumer direction** | NARROWS acceptance. A consumer that fed `rgb(1,2,3,)` received a colour and now receives `ok:false`. That is the intended direction — the input is not valid CSS — but it IS a behaviour change and any consumer generating trailing commas must be fixed, not accommodated. |
| **anchor in `GATE-VERDICT.md`** | `R3 dangling-alpha leniency` — PRESENT, re-read at generation |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1 2 3 / )"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":12,"end":13,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":12,"end":13,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"rgb(1,2,3,)"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |

### R4 — selector range check off-api

| field | value |
|---|---|
| **input(s)** | — no input cell in this wave's corpus; see the adjudication field |
| **incumbent** | the keyframe-selector range check is performed off the public API surface |
| **candidate** | NOT REACHED: `parseKeyframeSelector` is one of the six entries the candidate does not realize (`UNREALIZED_ENTRIES`), so no selector range check exists to place on or off the API |
| **spec citation** | css-animations-1 §3 — keyframe selectors are `from`, `to`, or a percentage in [0%, 100%] |
| **adjudication** | SPEC-CORRECT REGRESSION FIXTURE, HELD and NOT met by this wave. Blocked on the same wall as `.a`'s F-a.6 and `.b`'s E-1. |
| **consumer direction** | NO CHANGE TODAY. Deferred with the entry itself; the row is carried so the fixture is not lost when `parseKeyframeSelector` is eventually realized. |
| **anchor in `GATE-VERDICT.md`** | `R4 selector` — PRESENT, re-read at generation |

_No input cell: this row is an axis, not a string. Its two halves are stated as postures above._

### R5 — comment trivia folded into declaration names

| field | value |
|---|---|
| **input(s)** | — no input cell in this wave's corpus; see the adjudication field |
| **incumbent** | comment trivia is folded into declaration NAMES, so `/*x*/color` can reach a consumer as part of the property name |
| **candidate** | NOT SEPARATELY WITNESSED by this wave's harness: the candidate's declaration production reads a name slice and the corpus union carries no comment-bearing declaration row, so the fixture has no executed cell here |
| **spec citation** | css-syntax-3 §4.3.2 — comments are trivia and are consumed before a component value is produced |
| **adjudication** | SPEC-CORRECT REGRESSION FIXTURE, HELD and NOT met by this wave — and the reason is a CORPUS gap, which is disclosed rather than repaired by this seat (adding inputs to `.a`'s corpus is a write in `.a`'s create row). |
| **consumer direction** | NO CHANGE TODAY, and the absence is a measurement gap rather than an agreement. Routed as a finding: the graduated corpus does not exercise comment trivia in declarations. |
| **anchor in `GATE-VERDICT.md`** | `R5 comment-trivia` — PRESENT, re-read at generation |

_No input cell: this row is an axis, not a string. Its two halves are stated as postures above._

---

## §4 The label surface

### F-b4 — `ParseIssue.expected` carries PROMOTED named productions, not raw σ labels

| field | value |
|---|---|
| **input(s)** | `"rgb(1,2,3,)"` · `"oklch()"` |
| **incumbent** | `expected` is a byte-class or a bare literal — measured on the pinned oracle: `parseCssColor('oklch()')` THROWS, and where 4.0.0 does reject it answers with labels like `"CSS color"` / `"color"` |
| **candidate** | `expected[0]` is a named production — `"<number>"`, `"<none-keyword> ('none')"`, `"<color>"`, `"<hex-color> (3, 4, 6 or 8 digits)"` — available with diagnostics UNARMED and with zero `console.*` on the parse path (`.b`, G-8 GREEN) |
| **spec citation** | `parser-band.md` debt 1 — 'the single clearest thing cand-F does better': cand-O's `never` arm yields an opaque `(?!)` expectation where cand-F yields a name. `W3.md` §6 G-8 makes the named label a gate condition. |
| **adjudication** | INTENDED, and required by G-8. Raised by `.b` as F-b4 with owner `.d` and rowed here — an intentional difference that went unrowed would fail G-7 exactly as a defect does. |
| **consumer direction** | A caller reading `expected[0]` receives a NAMED PRODUCTION where 4.0.0 gives a byte-class or a bare literal. Message text is not a stable API and no consumer should switch on it; a consumer that DID switch on the incumbent's exact strings breaks. The direction is strictly more informative — the label set is finite, declared in `diagnostics.mjs`, and every rejection carries one (`.b`: 0 of 3,744 unnamed). |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(1,2,3,)"` | {"ok":true,"value":{"space":"rgb","channels":[1,2,3],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":10,"end":11,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |
| `"oklch()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":7,"expected":["<number>","<none-keyword> ('none')"],"actual":")"}]} |

---

## §5 The declared coverage narrowing

The P-1 taxonomy this wave inherits makes **COVERAGE_NARROWING** a declared NON-defect *on condition
that it is declared*: *"C14 declines an input outside its declared shape that the live superset accepts
is **not** a defect — `status.json` declares it."* These three rows are that declaration, and they are
generated from the candidate's own bytes rather than listed, so the declaration cannot be wider than the
candidate. **None of them is discharged by this wave**; each names the standing row that owns it.

### CN-1 — the 0 frozen parse entries the candidate NAMES as unrealized

| field | value |
|---|---|
| **subjects** | — |
| **incumbent** | all six are exported and callable from published 4.0.0 |
| **candidate** | named in `entry.mjs`'s `UNREALIZED_ENTRIES` and NOT published. A stub rejection was refused on purpose: it 'would emit codes no grammar raises and would be the masking fallback `.b` refused' (`entry.mjs`, and `.b` b.5 E-1). |
| **spec citation** | P-1 taxonomy (`apotheosis/parser-proof/equivalence.md` §1, carried at `harness/equivalence/taxonomy.ts`): 'COVERAGE_NARROWING (C14 declines an input outside its declared shape that the live superset accepts) is not a defect — status.json declares it.' This row is that declaration. |
| **adjudication** | DECLARED COVERAGE NARROWING. NOT a mirror-defect, and NOT discharged: it is the same wall as `.a`'s F-a.6 (G-1's implementation is assigned to no unit) and `.b`'s E-1 (the ⊇ direction wants six more grammar entries), both standing orchestrator rows. |
| **consumer direction** | A consumer of these six CANNOT MIGRATE to the candidate today — the import would be `undefined`, which is a build-time failure rather than a runtime surprise. The direction is stated as a blocker, not as a difference: adoption (X.P.W4's seam) is gated on it. |

### CN-2 — the 10 frozen runtime exports that are neither realized nor named

| field | value |
|---|---|
| **subjects** | `serializeCssColor` · `coerceToSyntax` · `serializeTimelineOptions` · `collectAnimationOptions` · `collectCustomFunctions` · `collectDeclarations` · `collectKeyframes` · `collectPropertyDescriptors` · `collectStyleRules` · `collectTimelineOptions` |
| **incumbent** | all are exported and callable from published 4.0.0 |
| **candidate** | absent from the candidate and absent from `UNREALIZED_ENTRIES` — the collectors, the coercer and the serializers, which are not parse entries and which the candidate's grammar does not address at all |
| **spec citation** | as CN-1 — the same taxonomy sentence |
| **adjudication** | DECLARED COVERAGE NARROWING, declared HERE for the first time. `UNREALIZED_ENTRIES` names the six PARSE entries; these are the rest of the 19, and an absence nobody declared is exactly what G-7 treats as a defect. Rowed rather than left to be discovered. |
| **consumer direction** | As CN-1: a consumer of any of these cannot migrate. Recorded separately from CN-1 because the cure is different in kind — CN-1 wants six grammar entries, CN-2 wants collectors and serializers that no unit of this wave was asked to author. |

### CN-3 — the 28 frozen type exports the candidate does not declare

| field | value |
|---|---|
| **subjects** | `AnimationRangeValue` · `AnimationTimelineValue` · `AnimationTriggerValue` · `CSSAnimationOptions` · `CSSPropertyDescriptor` · `CSSTimelineOptions` · `CollectedRule` · `CssColorSpace` · `CssLinearStop` · `CustomFunctionDescriptor` · `CustomFunctionParameter` · `CustomFunctionRule` · `KeyframeRule` · `KeyframeSelector` · `KeyframesBlock` · `ParseIssue` · `ParseResult` · `PropertyRule` · `RangeBoundary` · `RangePhase` · `ScrollTimelineDescriptor` · `ScrollerKeyword` · `StylesheetItem` · `TimelineAxis` · `TimelineScopeValue` · `TriggerType` · `ViewInset` · `ViewTimelineDescriptor` |
| **incumbent** | all 33 are declared by published 4.0.0's `css.d.ts` |
| **candidate** | the candidate re-exports 5 (CssColor, CssTimingFunction, Stylesheet, StyleRule, Declaration) from the vendored declaration and declares no others |
| **spec citation** | as CN-1 — the same taxonomy sentence; `W3.md` §6 G-1 requires all 33 by bidirectional assignability |
| **adjudication** | DECLARED COVERAGE NARROWING. `.a` measured the same distance as G-1's types leg (5 TOTAL / 28 ABSENT) and reported it RED rather than narrowing the universe; this row is the differential's half of that reading. |
| **consumer direction** | A TypeScript consumer importing any of the 28 gets a compile error rather than a silent `any` — the failure is loud and at build time. No runtime behaviour changes. |

---

## §6 Adjudication — RESERVED FOR `.e`

**This section is deliberately empty.** `W3.md` §4a gives `.e` — a **fresh** Fable adjudicator — the
sole write on `DIVERGENCE-LEDGER.md` §Adjudication, and §5 `.e` gives the reason: *"an author cannot
adjudicate his own union."* `.e` is obligated under L-14 to attempt REFUTATION, not to average, and its
second named obligation lands here: *"at least one divergence row's **spec reading**"*.

Three rows are offered to that refutation as the ones whose spec reading is most load-bearing and least
settled, named by this seat so the choice is not left to convenience:

1. **S-1 (token juxtaposition)** — the widening is adopted from a css-syntax token-stream reading that
   `parser-band.md` itself marks PRESERVED, UNRESOLVED, and the owner may overrule toward cand-F.
2. **ADJ-3 / S-2 (non-finite numerals)** — a three-way split whose contract question (GROUND-C, are
   ±Infinity admitted?) is OWNER-OWED and which `W3.md` §10 explicitly does not open.
3. **PB-03 (the two `hsl` spellings)** — the 100× disagreement is the single largest value change in
   the file, and the row claims the incumbent's reading, not the candidate's, is the defect.

A fourth claim, outside the ledger but named in `.e`'s own obligations, is `.c`'s: that the retained
shield is non-load-bearing. Its evidence is `.c`'s T-1/T-1b/T-2/T-3/T-4 and it is designed to be
refutable at the bytes.

**`.e`'s block below is CARRIED, not regenerated** (F-e7, cured at the generator): this program reads
the canonical ledger — by name, not by `--out` (F-y2) — lifts every `### §6.x` subsection out of it, and emits it
here unaltered. It authors none of it and it no longer destroys it, so no seat has to remember to
re-append it. `.e`'s own warning — *"If the emitter is re-run, it will drop this section"* — is the
sentence this cure retires; it is left standing in the block because the block is `.e`'s and E-3
makes it immutable. The block predates **§7** and **§8** below, which are therefore **NOT**
adjudicated by it.

### §6.1 — Adjudication, X.P.W3.e (SERVED MODEL: claude-fable-5-1 · 2026-09-18 14:29–14:40 EDT)

**Standing.** This section is the one hand-written block in a generated file, by `W3.md` §4a's grant
(*"`.e` writes … the ledger's adjudication section"*). Everything above it is `.d`'s emitter's and is
untouched (631 L, sha256 `957f54f4…` at `0e9bac30`). **If the emitter is re-run, it will drop this
section**: any regeneration must re-append it (F-e7 in `waves/W3-CLOSE.md` §7). A first `.e` seat
died uncommitted with a draft of this block in the tree (`X-P-W3.md` F-r2.1); the draft was read
whole, every measurement in it re-run at this seat's clock, and this block is the **rewritten**
result — the full outputs, the fetched spec text and the corrections to the draft are in
`waves/W3-CLOSE.md` §0 and §3 R-ii. This seat authored none of the wave's bytes before this block;
every reading below was taken twice from the scratchpad against the settled `<p2>` bytes at `dc52ed5`
and was identical across the two runs.

**Method.** L-14: refute, never average. The three drafts were fetched at this clock
(`drafts.csswg.org/{css-color-4,css-syntax-3,css-values-4}/`, 2026-09-18 14:34 EDT) and every quoted
sentence was found verbatim in them. Targeted inputs were run through the sha-pinned published 4.0.0
oracle (`7f80658c…`) and BOTH candidate lowerings (js ≡ wasm on every row). A row is UPHELD only where
the spec's own sentence supports its reading and no measured input contradicts it.

| row | attempt | outcome |
|---|---|---|
| **PB-03** — the two `hsl` spellings | (a) read css-color-4 §7.1 for the number/percentage equivalence; (b) look for an input the generalized reading mis-handles: the **legacy** comma form with bare numbers | **(a) UPHELD, verbatim**: `<modern-hsl-syntax> = hsl( [<hue> \| none] [<percentage> \| <number> \| none] [<percentage> \| <number> \| none] [ / [<alpha-value> \| none] ]? )` and *"For saturation, 100% or 100 is a fully-saturated, bright color … For lightness, 50% or 50 represents the "normal" color"* — a bare `50` **is** `50%`, so `[120, 0.5, 0.5]` is the spec's value and the incumbent's `[120, 50, 50]` is the defect. **(b) NOT refuted — but a NEW divergence surfaced**: `<legacy-hsl-syntax> = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )` admits **no** `<number>`; measured, `hsl(120, 50, 50)` → incumbent `ok {hsl,[120,50,50]}` (**MIS-ACCEPT**, an R-class instance), candidate `REJECT css_syntax [11,16) expected ["<percent-sign>"]` in both lowerings (spec-correct); `hsl(120, 50%, 50)` → incumbent `ok {hsl,[120,0.5,50]}`, candidate `REJECT [16,17)`. Neither input is in any ledger row; this is exactly the "unrowed intentional difference" G-7 counts as a defect. Returned as **F-e2** for a `.d`-emitted row at X.P.W4, not hand-added here |
| **S-1 / ADJ-2** — token juxtaposition | find an input on which "the css-syntax token-stream reading browsers implement" and the candidate's acceptance part ways: a number immediately followed by an ident-start | **REFUTED as stated.** css-syntax-3 §4.3.3 (*consume a numeric token*): *"If the next 3 input code points would start an ident sequence, then: Create a <dimension-token> with the same value, type flag, and sign character as number, and a unit set initially to the empty string. Consume an ident sequence. Set the <dimension-token>'s unit to the returned value."* — so `120deg50` is ONE dimension-token with unit `deg50`, and `255none` ONE with unit `none`; both are invalid in any colour grammar. Measured: `hsl(120deg50%50%)` → candidate **`ok {hsl,[120,0.5,0.5]}`** (js and wasm), incumbent REJECT; `rgb(255none none)` → candidate **`ok {rgb,[255,"none","none"]}`**, incumbent REJECT. The three rowed inputs (`rgb(50%20%30%)` · `rgb(1.5.5 3)` · `hsl(120 50%50%)`) **remain correctly accepted** under §4.3.3 (a `%` cannot start an ident sequence; `.5` starts a number), as do `rgb(255-0 153 / 0.5)` (`-0` is a number-token) and `hsl(120 50%none)` (percentage-token, ident-token); `rgb(1e 2 3)` and `rgb(none255 0)` are rejected by both engines. The candidate therefore implements *whitespace-optional juxtaposition at the grammar level*, a strict superset of the tokenizer's maximal munch, and the row's spec citation does not license the dimension-merge acceptances. **Adjudication**: the row's *direction* ("WIDENS acceptance") stands but is understated — in this class the widening exceeds css-syntax, which is a candidate **MIS_ACCEPT against the spec** and the strongest evidence yet for the owner's reserved overrule toward cand-F's stricter line. Returned as **F-e1** (grammar act, X.P.W4) |
| **ADJ-3 / S-2** — non-finite numerals | test the REJECT half ("reject the unclamped non-finite channel") against the spec's own words for hue, and check the row's citation | **REFUTED on the REJECT half for `<hue>`; UPHELD on the clamp half; the citation is wrong.** css-color-4 §4.3 (*the <hue> syntax*): *"This number is normalized to the range [0,360). … In hsl(calc(-infinity) 0 0) or hsl(calc(infinity) 0 0), the <hue> component is again normalized to 0 degrees."* css-values-4 §5 (Numeric Data Types, the paragraph before §5.1): *"When a value cannot be explicitly supported due to range/precision limitations, it must be converted to the closest value supported by the implementation … If an <angle> must be converted due to exceeding the implementation-defined range of supported values, it must be clamped to the nearest supported multiple of 360deg."* Neither sentence makes an over-range hue invalid; both give it a **finite** value. Measured: `hsl(1e400 0% 50%)` → candidate `REJECT css_syntax [17,17) expected ["<finite-number>"]`, `oklch(0.5 0.1 1e400)` → `REJECT [20,20)`, both lowerings — contrary to both sentences. The clamp half is upheld: `rgb(1e400 0 0)` → `[255,0,0]`, `rgb(-1e400 0 0)` → `[0,0,0]`, `rgb(0 0 0 / 1e400)` → alpha 1 (css-color-4 §4.2, alpha *"clamped to that range at parsed-value time"*). The row cites *"css-values-4 §10.9 — a numeric token outside the implementation range is not a <number>"*: **§10.9 exists and is *Type Checking*** (math functions); the sentence attributed to it appears **nowhere** in the current draft (0 regex hits for its phrases), and §10.12 *Range Checking* says out-of-range does *not* invalidate. **Adjudication**: the GROUND-C `±Infinity` contract question stays **OWNER-OWED** (`W3.md` §10) and is not ruled here; but the ledger may no longer describe the REJECT half as a spec reading — it is cand-O's *preference*, and the spec-aligned disposition for a non-finite hue is normalization to 0deg. Returned as **F-e3**. Beside it, **F-e9**: the row's `lab(50 1e400 0)` witness is honoured **vacuously** — `lab` is a declared coverage narrowing (`R_disp` carries no `lab` head), so `lab(50 10 10)` is rejected with the identical `[0,13) ["<color>"]` and the witness tests nothing about non-finite handling |
| **ADJ-1** — hue not wrapped at parse time (observation, not a divergence) | read §4.3 against both engines | Both the incumbent and the candidate return `hue 480` for `hsl(480 50% 50%)`, `−120` for `hsl(-120 …)`, `360` for `hsl(360 …)`; §4.3 says the number *"is normalized to the range [0,360)"* and *"In hsl(360 0 0) the <hue> component is normalized to 0 degrees"*. This is a **shared** non-normalization, so it is not a candidate-vs-incumbent divergence and reddens nothing here; it is recorded for X.P.W4's adoption packet as a value-level question (**F-e4**) |
| **PB-01 · PB-02 · PB-04 … PB-13** | not individually re-derived | Each is `parser-band.md`'s direct-probe finding against the published parser with a standard css-color-4 citation; this seat re-ran the twenty-two witnessed inputs through both lowerings at G-1's and G-6's own commands (`22 witnessed inputs · 19 diverge from the incumbent · 0 NOT honoured`, twice) and did not attempt a per-row refutation beyond the three §6 named. **Carried as adjudicated**, not re-adjudicated |
| §3 fixtures · §4 label · §5 narrowing | no spec reading is claimed by these rows | not adjudicated; `.d`'s own disclosure that R2/R4 are unreached and R5 has no corpus cell (F-d6) stands |

**The signed reading.** Of the three rows §6 offered, **one is upheld (PB-03), one is refuted as
stated (S-1/ADJ-2), and one is half-refuted with a wrong citation (ADJ-3/S-2)**. Two of the three
"declared divergences" are therefore not yet *defensible readings of the specification* in the form
the ledger carries them; they are convenient readings that the spec's own sentences overrun in at
least one measured direction each. None of this moves G-7's number — the 5,890 cells stand as `.d`
measured them and as this seat re-measured them (`equivalence-full-surface.json` regenerated
sha256-equal) — but it does move the *character* of part of that number: the candidate's unadjudicated
`MIS_ACCEPT` samples `.d` printed split in both directions (`rgb(255-0 153 / 0.5)` is spec-VALID under
§4.3.3, `255` then `-0`; `hsl(120deg50%50%)`-class inputs are spec-INVALID), which is why the "counted
AGAINST the candidate" convention was the right one and why a spec-executable oracle is the missing
instrument. The consumer-direction fields of S-1/ADJ-2 and ADJ-3/S-2 are **amended beside, here, not
edited above**: S-1/ADJ-2 — *widens acceptance, and in the dimension-merge class widens it beyond
css-syntax*; ADJ-3/S-2 — *the REJECT half is not spec-backed for hue; the spec value is 0deg*.

**The fourth claim** §6 named — that the retained shield is non-load-bearing — is **REFUTED** at
`waves/W3-CLOSE.md` §3 R-iii (the Wasm lowering's fixed regions; ESC-e1) and is not a ledger matter,
except in one respect recorded here: the rejection the shield emits (`css_syntax [0,len) ["<stylesheet>"]`
for a valid 8,191-rule stylesheet) is a **FALSE_REJECT of a valid input** that no row of this ledger
declares, because no corpus cell reaches it.

---

## §7 The declared capacity bounds

**Landed by this emission, after `.e`'s L-14 pass — so §6 does NOT adjudicate these rows.** They
answer **F-L1**, raised against the round-4 close: X.P.W3.f gave both lowerings a set of capacity
rejections that NARROW the accepted language relative to published 4.0.0, on the shipped JS target,
and no row of this file declared them. G-7 does not grade intent — *"an **unrowed** intentional
difference … identical to a defect"* — and CN-2 set the wave's own standard: *"an absence nobody
declared is exactly what G-7 treats as a defect. Rowed rather than left to be discovered."*

**Not one byte of the candidate is wrong here, and nothing below asks for one to change.** The bounds
are ordained and the labels promote; what was owed was the declaration. The rows are **generated from
`bounds.mjs`'s own `CAPACITY_REGIONS`** — 9 regions, in the order the boundary names a breach — so they
cannot drift from Θ: a region added, renamed or re-capped moves these rows at the next emission.

**Authority.** COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave.

**The witness coordinates are FOUND, not pinned.** For every class-1 region this program binary-searches
the smallest witness that names the region's own promoted production (`.f`'s census method) and prints
the pair either side of it; a moved bound therefore moves the pair instead of falsifying a fixture.
Classes 2 and 3 have no such coordinate under the derived window — that absence *is* the claim — so
they carry the densest declared family AT the window and record that it does not name them.

### CAP-1 — the `input` region — Θ.input = 14,107 code units (class 1)

| field | value |
|---|---|
| **region / class** | `input` · class 1 · checked before the run |
| **declared capacity Θ.input** | 14,107 code units (DERIVED; the layout CAP is 1,048,576) |
| **raw label → promoted production** | `input <= 14107` → `<input-window>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<input-window>` (raw label `input <= 14107`, checked before the run). Θ.input = 14,107 code units of the region's layout CAP 1,048,576. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `input` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS acceptance, and it is consumer-visible on the shipped JS target. An input whose code units exceed **14,107** — a size published 4.0.0 parses and returns a value for — is answered `ok:false` with `expected[0] = "<input-window> …"`. A consumer whose stylesheets can exceed that size must chunk its input or read the diagnostic; it will not receive a partial value and it will not receive a throw. The direction is strictly safer than the state it replaced (a Wasm trap on one target and an untyped acceptance on the other), and strictly narrower than 4.0.0. |
| **witness family** | `witnessAtCapacity("input", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the bound** — `witnessAtCapacity("input", 14,107)` | 14,107 | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:true · 1 top-level item(s) · 0 diagnostic(s) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("input", 14,108)` | 14,108 | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:false · 1 diagnostic(s): css_syntax [0,14108) "<input-window> (at most 14107 code units)" | ok:false · 1 diagnostic(s): css_syntax [0,14108) "<input-window> (at most 14107 code units)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 14,108._

### CAP-2 — the `marks` region — Θ.marks = 32,768 marks (class 1)

| field | value |
|---|---|
| **region / class** | `marks` · class 1 · checked after the run |
| **declared capacity Θ.marks** | 32,768 marks (the layout CAP itself) |
| **raw label → promoted production** | `marks <= 32768` → `<mark-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<mark-journal>` (raw label `marks <= 32768`, checked after the run). Θ.marks = 32,768 marks. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `marks` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS acceptance, and it is consumer-visible on the shipped JS target. An input whose marks exceed **32,768** — a size published 4.0.0 parses and returns a value for — is answered `ok:false` with `expected[0] = "<mark-journal> …"`. A consumer whose stylesheets can exceed that size must chunk its input or read the diagnostic; it will not receive a partial value and it will not receive a throw. The direction is strictly safer than the state it replaced (a Wasm trap on one target and an untyped acceptance on the other), and strictly narrower than 4.0.0. |
| **witness family** | `witnessAtCapacity("marks", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the bound** — `witnessAtCapacity("marks", 1,723)` | 5,169 | ok:true · 1,723 top-level item(s) · 0 diagnostic(s) | ok:true · 1,723 top-level item(s) · 0 diagnostic(s) | ok:true · 1,723 top-level item(s) · 0 diagnostic(s) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("marks", 1,724)` | 5,172 | ok:true · 1,724 top-level item(s) · 0 diagnostic(s) | ok:false · 1 diagnostic(s): css_syntax [0,5172) "<mark-journal> (at most 32768 marks)" | ok:false · 1 diagnostic(s): css_syntax [0,5172) "<mark-journal> (at most 32768 marks)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 1,724._

### CAP-3 — the `recoveries` region — Θ.recoveries = 4,096 recoveries (class 1)

| field | value |
|---|---|
| **region / class** | `recoveries` · class 1 · checked after the run |
| **declared capacity Θ.recoveries** | 4,096 recoveries (the layout CAP itself) |
| **raw label → promoted production** | `recoveries <= 4096` → `<recovery-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory. It does NOT, however, return a value for the window witness measured below — it answers ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" — and it does so for its own reason, never for a capacity. MEASURED at this generation and generated from that measurement (**F-y1**): a row may not claim an incumbent verdict its own table denies. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<recovery-journal>` (raw label `recoveries <= 4096`, checked after the run). Θ.recoveries = 4,096 recoveries. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `recoveries` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS the declared shape — Θ.recoveries = **4,096** recoveries is a bound published 4.0.0 does not declare — but on THIS row's own witness family the narrowing is **not observable as a verdict change**: published 4.0.0 answers ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" on the witness the input window admits, so a consumer at that size received `ok:false` from 4.0.0 and receives `ok:false` here. What changes is the DIAGNOSTIC, not the verdict: the candidate spans the whole input and names the region (`expected[0] = "<recovery-journal> …"`) where 4.0.0 named the first construct it could not parse. The consumer will not receive a partial value and will not receive a throw. **Whether an input exists that published 4.0.0 ACCEPTS and this bound refuses is NOT established by these witnesses, and is not claimed here** — the class-1 rows that do establish it are the ones whose incumbent cell reads `ok:true` at the same coordinate. |
| **witness family** | `witnessAtCapacity("recoveries", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
**NO COORDINATE, AND THE REASON IS MEASURED:** the largest `recoveries` witness that FITS the derived input window is n = 3526 (14104 code units, window 14107), and it does not name `<recovery-journal>`; the search to n = 8192 found no coordinate because the WINDOW cuts first, not because the bound is absent. R-f1 (COHESION §0r) owns the window and is ruled for X.P.W4.

| **AT the largest witness the WINDOW admits** — `witnessAtCapacity("recoveries", 3,526)` | 14,104 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 1 diagnostic(s): css_syntax [0,14104) "<mark-journal> (at most 32768 marks)" | ok:false · 1 diagnostic(s): css_syntax [0,14104) "<mark-journal> (at most 32768 marks)" | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 3,526) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-4 — the `D` region — Θ.D = 4,096 diagnostics (class 1)

| field | value |
|---|---|
| **region / class** | `D` · class 1 · checked after the run |
| **declared capacity Θ.D** | 4,096 diagnostics (the layout CAP itself) |
| **raw label → promoted production** | `D <= 4096` → `<diagnostic-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory. It does NOT, however, return a value for the window witness measured below — it answers ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" — and it does so for its own reason, never for a capacity. MEASURED at this generation and generated from that measurement (**F-y1**): a row may not claim an incumbent verdict its own table denies. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<diagnostic-journal>` (raw label `D <= 4096`, checked after the run). Θ.D = 4,096 diagnostics. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `D` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS the declared shape — Θ.D = **4,096** diagnostics is a bound published 4.0.0 does not declare — but on THIS row's own witness family the narrowing is **not observable as a verdict change**: published 4.0.0 answers ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" on the witness the input window admits, so a consumer at that size received `ok:false` from 4.0.0 and receives `ok:false` here. What changes is the DIAGNOSTIC, not the verdict: the candidate spans the whole input and names the region (`expected[0] = "<diagnostic-journal> …"`) where 4.0.0 named the first construct it could not parse. The consumer will not receive a partial value and will not receive a throw. **Whether an input exists that published 4.0.0 ACCEPTS and this bound refuses is NOT established by these witnesses, and is not claimed here** — the class-1 rows that do establish it are the ones whose incumbent cell reads `ok:true` at the same coordinate. |
| **witness family** | `witnessAtCapacity("D", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
**NO COORDINATE, AND THE REASON IS MEASURED:** the largest `D` witness that FITS the derived input window is n = 3526 (14104 code units, window 14107), and it does not name `<diagnostic-journal>`; the search to n = 8192 found no coordinate because the WINDOW cuts first, not because the bound is absent. R-f1 (COHESION §0r) owns the window and is ruled for X.P.W4.

| **AT the largest witness the WINDOW admits** — `witnessAtCapacity("D", 3,526)` | 14,104 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 1 diagnostic(s): css_syntax [0,14104) "<mark-journal> (at most 32768 marks)" | ok:false · 1 diagnostic(s): css_syntax [0,14104) "<mark-journal> (at most 32768 marks)" | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 3,526) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-5 — the `C` region — Θ.C = 65,536 entries (class 2)

| field | value |
|---|---|
| **region / class** | `C` · class 2 · checked after the run (peak) |
| **declared capacity Θ.C** | 65,536 entries (the layout CAP itself) |
| **raw label → promoted production** | `C <= 65536` → `<complement-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | DECLARED and ASSERTED (§0q class 2, peak-with-grant: the JS lowering keeps a high-water on the journal it already appends, the same quantity the module guards), and measured UNREACHABLE under the derived Θ.input — C ⊔ P tiles the consumed input, so C + P ≤ Θ.input = 14,107 < 65,536. The raw label `C <= 65536` exists and promotes to `<complement-journal>`, so the bound is readable even though no input reaches it. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `C` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE TODAY. The bound is declared so that a consumer can read it and so that a later Θ.input restoration (R-f1) cannot make it silent, but no input under the present window breaches it — measured at the window on this family, below. Rowed rather than left undeclared: an unreachable bound that nobody declared is still an undeclared bound. |
| **witness family** | `witnessAtCapacity("C", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("C", 4,699)` | 14,106 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 4,699) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-6 — the `P` region — Θ.P = 65,536 entries (class 2)

| field | value |
|---|---|
| **region / class** | `P` · class 2 · checked after the run (peak) |
| **declared capacity Θ.P** | 65,536 entries (the layout CAP itself) |
| **raw label → promoted production** | `P <= 65536` → `<provenance-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | DECLARED and ASSERTED (§0q class 2, peak-with-grant: the JS lowering keeps a high-water on the journal it already appends, the same quantity the module guards), and measured UNREACHABLE under the derived Θ.input — C ⊔ P tiles the consumed input, so C + P ≤ Θ.input = 14,107 < 65,536. The raw label `P <= 65536` exists and promotes to `<provenance-journal>`, so the bound is readable even though no input reaches it. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `P` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE TODAY. The bound is declared so that a consumer can read it and so that a later Θ.input restoration (R-f1) cannot make it silent, but no input under the present window breaches it — measured at the window on this family, below. Rowed rather than left undeclared: an unreachable bound that nobody declared is still an undeclared bound. |
| **witness family** | `witnessAtCapacity("P", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("P", 4,699)` | 14,106 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 4,699) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-7 — the `vstack` region — Θ.vstack = 65,536 slots (class 3)

| field | value |
|---|---|
| **region / class** | `vstack` · class 3 · checked unreachable by construction |
| **declared capacity Θ.vstack** | 65,536 slots (the layout CAP itself) |
| **raw label → promoted production** | `vstack <= 65536` → `<value-stack>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 1 code unit, S = 1,269, ceiling 15,376 ≤ cap 65,536 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `vstack` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **14,107** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
| **witness family** | `witnessAtCapacity("vstack", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("vstack", 14,107)` | 14,107 | ok:true · 0 top-level item(s) · 0 diagnostic(s) | ok:true · 0 top-level item(s) · 0 diagnostic(s) | ok:true · 0 top-level item(s) · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 14,107) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-8 — the `arena` region — Θ.arena = 7,208,960 bytes (class 3)

| field | value |
|---|---|
| **region / class** | `arena` · class 3 · checked unreachable by construction |
| **declared capacity Θ.arena** | 7,208,960 bytes (the layout CAP itself) |
| **raw label → promoted production** | `arena <= 7208960` → `<arena>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 511 code unit, S = 129, ceiling 7,208,806 ≤ cap 7,208,960 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `arena` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **14,107** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
| **witness family** | `witnessAtCapacity("arena", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("arena", 4,699)` | 14,106 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 4,699) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-9 — the `expsnap` region — Θ.expsnap = 32 frames (class 3)

| field | value |
|---|---|
| **region / class** | `expsnap` · class 3 · checked unreachable by construction |
| **declared capacity Θ.expsnap** | 32 frames (the layout CAP itself) |
| **raw label → promoted production** | `expsnap <= 32` → `<expectation-snapshots>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory. It does NOT, however, return a value for the window witness measured below — it answers ok:false · 1 diagnostic(s): color_context_required [0,131) "context-free color" — and it does so for its own reason, never for a capacity. MEASURED at this generation and generated from that measurement (**F-y1**): a row may not claim an incumbent verdict its own table denies. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 0 depth level, S = 1, ceiling 1 ≤ cap 32 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `expsnap` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **14,107** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
| **witness family** | `witnessAtCapacity("expsnap", n)` under `P:color`, driven through `parseCssColor` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("expsnap", 64)` | 131 | ok:false · 1 diagnostic(s): color_context_required [0,131) "context-free color" | ok:false · 1 diagnostic(s): color_context_required [131,131) "<context-free-color> (a context colour has no value outside a computed style)" | ok:false · 1 diagnostic(s): color_context_required [131,131) "<context-free-color> (a context colour has no value outside a computed style)" | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 64) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

---

## §8 Spec-cited divergences on REALIZED entries

**Landed by this emission, after `.e`'s L-14 pass — so §6 does NOT adjudicate these rows.** This is
the family `.e` asked for and `.g` could not reach (**ESC-g1**): a difference on an entry the
candidate DOES realize, where the specification's own text says the candidate is right and the
incumbent is wrong. It is not §2 (`W3.md` §2c routes exactly four `parser-band.md` dissents there by
name), not §3 (`GATE-VERDICT.md` carries no anchor for this subject), and not §5 (the entry is
realized), which is why it needed a family of its own rather than a borrowed heading.

`.e`'s instruction is honoured literally: *"Returned as F-e2 for a `.d`-emitted row … not hand-added
here"* — the two result columns below are re-measured at every emission, never typed.

**Rows at this emission: 0.** SP-1, the family's first row, was an oracle MIS-ACCEPT and `.k` promoted it into §9's INCUMBENT-DEFECT family — one meaning, one row (F-aa3 (c)). The heading stands so that an empty family can be told from an absent one.

---

## §9 INCUMBENT-DEFECT — the oracle mis-accepts, the candidate is right per spec

**ESC-g1's family** (COHESION §0r). A row here is a difference where the INCUMBENT accepts a string the
specification forbids and the candidate refuses it, correctly. It is not §2 (`W3.md` §2c routes exactly
4 `parser-band.md` dissents there by name), not §3 (no `GATE-VERDICT.md` anchor), not §5 (the entry is
realized) and not §8 (whose subject is a spec-cited divergence that is NOT a mis-accept) — which is why
it needed a heading of its own. It takes the next free level-2 number: **§6 is `.e`'s reserved
hand-written adjudication block** and a generated family written over it would destroy the fresh
adjudicator's region (F-aa3 (a)).

Of the 8 rows, 5 are **UNADJUDICATED** and say so in their own adjudication field: `.k` measured them
at G-1's honest remainder and declines to rule them, because an author cannot adjudicate his own union
(M-23 §1). Their cells REMAIN counted as mirror-defects at G-7 — a row declares a difference, it does
not excuse one.

### SP-1 — `<legacy-hsl-syntax>` admits no `<number>`: the incumbent mis-accepts `hsl(120, 50, 50)`

| field | value |
|---|---|
| **input(s)** | `"hsl(120, 50, 50)"` · `"hsl(120, 50%, 50)"` |
| **entry** | `parseCssColor` |
| **incumbent** | ACCEPTS both. `hsl(120, 50, 50)` → `{space:"hsl", channels:[120,50,50], alpha:1}` — and the channels are UNSCALED, so this row carries the PB-03 100× defect a second time; `hsl(120, 50%, 50)` → `{hsl,[120,0.5,50]}`. |
| **candidate** | REJECTS both, identically in BOTH lowerings: `ok:false css_syntax [11,16) expected ["<percent-sign>"]` on the first, `[16,17)` on the second. |
| **spec citation** | css-color-4 §7.1 — `<legacy-hsl-syntax> = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )`. The legacy COMMA form admits no `<number>` for saturation or lightness; only `<modern-hsl-syntax>` does (`[<percentage> \| <number> \| none]`). The candidate's rejection is spec-correct and the incumbent's acceptance is an R-class mis-accept. |
| **adjudication** | SPEC-CORRECT, and the candidate is REQUIRED to differ. Discovered by `.e` under L-14 refutation (ledger §6.1, PB-03 attempt (b)), re-measured by `.g`, and NOT created by `.g`'s dimension-token cure — the pre-cure probe already read the identical rejection. `.e` routed it as **F-e2** for a `.d`-EMITTED row; this is that row, and both result columns above are re-measured at every emission rather than typed. |
| **consumer direction** | NARROWS acceptance. A consumer that fed `hsl(120, 50, 50)` received a colour — and a wrong one, whose saturation and lightness were 100× the spec's value — and now receives `ok:false`. That is the intended direction: the input is not valid CSS and the value it returned was not the value the string names. A consumer emitting unitless saturation/lightness in the COMMA form must be fixed, not accommodated; the same consumer's SPACE form (`hsl(120 50 50)`) keeps working and is adjudicated separately at PB-03. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hsl(120, 50, 50)"` | {"ok":true,"value":{"space":"hsl","channels":[120,50,50],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":16,"expected":["<percent-sign>"],"actual":", 50)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":16,"expected":["<percent-sign>"],"actual":", 50)"}]} |
| `"hsl(120, 50%, 50)"` | {"ok":true,"value":{"space":"hsl","channels":[120,0.5,50],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":16,"end":17,"expected":["<percent-sign>"],"actual":")"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":16,"end":17,"expected":["<percent-sign>"],"actual":")"}]} |

### ID-1 — the incumbent's UNANCHORED component read: a component value with trailing garbage is accepted

| field | value |
|---|---|
| **input(s)** | `"#ff0.99cc"` · `"steps(5e-2%28)"` · `"cubic-bezier(-293, +10, 43.6-49, 160)"` |
| **entry** | `parseCssValue` |
| **incumbent** | ACCEPTS all three. The read is unanchored: the incumbent consumes the prefix it recognizes — `#ff0`, `5e-2`, `43.6` — and never requires the rest of the component value to be consumed, so `.99cc`, `%28` and `-49` are discarded in silence. |
| **candidate** | REJECTS all three, identically in BOTH lowerings, with `css_syntax` spanning the unconsumed tail. |
| **spec citation** | css-syntax-3 §5.4.7 — a component value is consumed WHOLE, and input left over once the production is satisfied makes the declaration invalid (§5.4.4's trailing-input condition). A token run no production admits cannot be dropped. |
| **adjudication** | **UNADJUDICATED — routed to X.P.W4's fresh adjudicator.** Measured by `.k` as G-1's honest remainder at `parseCssValue` / `parseCssValues` (33 cells each) and inside `parseStylesheet`; those cells REMAIN counted as mirror-defects at G-7. `.k` declines to rule it: an author may not adjudicate his own union (M-23 §1). |
| **consumer direction** | NARROWS acceptance. A consumer that fed `#ff0.99cc` received the colour `#ff0` and now receives `ok:false`. The direction is intended: the string does not name that colour, and the old answer silently discarded five bytes its author wrote. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"#ff0.99cc"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":9,"expected":["scalar"],"actual":"#ff0.99cc"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":9,"expected":["<hex-digit>","<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or … | {"ok":false,"diagnostics":[{"code":"css_syntax","start":4,"end":9,"expected":["<hex-digit>","<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or … |
| `"steps(5e-2%28)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["scalar"],"actual":"5e-2%28"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":14,"expected":["<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or the end of i… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":14,"expected":["<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or the end of i… |
| `"cubic-bezier(-293, +10, 43.6-49, 160)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["scalar"],"actual":"43.6-49"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":29,"end":37,"expected":["<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or the end of i… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":29,"end":37,"expected":["<token-boundary> (whitespace, ',', '/', ':', ';', ')', '{', '}' or the end of i… |

### ID-2 — the incumbent accepts an EMPTY argument in a comma-separated list

| field | value |
|---|---|
| **input(s)** | `"steps(1e43,, start)"` |
| **entry** | `parseTimingFunction` |
| **incumbent** | ACCEPTS: `{kind:"steps", count:1e43, position:"jump-start"}` — the empty part between the two commas is skipped and the list reads as two arguments. |
| **candidate** | REJECTS in BOTH lowerings: `ok:false css_syntax [11,19) expected ["<jump-position>"]`. |
| **spec citation** | css-syntax-3 §5.4.1 / css-values-4 §2.1 — the parts of a comma-separated list are component values; an EMPTY part is not one, and a production that requires an argument is not satisfied by its absence. |
| **adjudication** | **UNADJUDICATED — routed to X.P.W4's fresh adjudicator**, for the reason ID-1 gives. Measured by `.k` as the last unattributed cell of G-1's `parseTimingFunction` remainder. |
| **consumer direction** | NARROWS acceptance, on a string no author writes deliberately. A consumer producing `steps(n,, start)` is emitting a malformed list and now learns of it at the parse instead of silently receiving a timing function it never spelled. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"steps(1e43,, start)"` | {"ok":true,"value":{"kind":"steps","count":1e+43,"position":"jump-start"},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":19,"expected":["<jump-position>"],"actual":", start)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":19,"expected":["<jump-position>"],"actual":", start)"}]} |

### ID-3 — the incumbent accepts a NON-STRING as an empty stylesheet

| field | value |
|---|---|
| **input(s)** | `undefined` · `null` · `42` · `{}` · `[]` · `true` · `NaN` |
| **entry** | `parseStylesheet` |
| **incumbent** | SPLITS, and the split is measured in the table below, not asserted: FIVE of the seven — `42`, `{}`, `[]`, `true`, `NaN` — come back `ok:true` with `value: []`, an EMPTY SHEET, because `.length` on a non-string is `undefined`, the scan loop never runs and the empty result is returned as a success; no diagnostic is emitted and the caller cannot tell an empty sheet from a source that was never text. The remaining two — `undefined` and `null` — THROW a raw `TypeError` (`Cannot read properties of … (reading 'length')`), which is the R1 class this wave's G-2 is about and not this row's subject. This row is the FIVE. |
| **candidate** | REJECTS all seven, identically in BOTH lowerings and with no throw: `ok:false css_syntax` with `expected ["<string source>"]` at `[0,0)`. The two the incumbent throws on are cured by the same guard, which is `.c`'s G-3 leg. |
| **spec citation** | css-syntax-3 §3 — parsing operates on a stream of CODE POINTS; a value that is not a string is not a stream of code points and has no parse. §5.3.3 ("parse a stylesheet") is defined over that stream alone, so `[]` is not the answer for a non-source; there is no answer, which is what a typed rejection says. |
| **adjudication** | **UNADJUDICATED — routed to X.P.W4's fresh adjudicator**, for the reason ID-1 gives (M-23 §1: an author may not adjudicate his own union). Its discovery is X.P.W3.n's: `.c` reported the shape as **BND-1** and `.m` measured it at **172 of `parseStylesheet`'s 206 G-1 misses** — but those 172 were the INSTRUMENT, not this defect. The universe's r1 arm was feeding the corpus `{id, src}` PAIRS instead of the `src` string, so `parseStylesheet` was being called with an object 172 times; §0w ruled that half an instrument defect and `.n` cured it at `test/css-totality/lib/corpus.mjs`. What remains here is the other half — the incumbent's own acceptance — and it is exercised by the SEVEN declared non-string boundary cases (`corpus.boundary`, `.c`'s G-3 leg), never by a corpus row, because a non-string is not a row. |
| **consumer direction** | NARROWS acceptance. A consumer that handed `parseStylesheet` a non-string — a `null` from a failed file read, a parsed JSON object, a number — received `ok:true` with an empty sheet and proceeded as though the stylesheet were empty. It now receives `ok:false` and learns at the call that it never had a source. No consumer that passed a string is affected. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `undefined` | THROWS TypeError: Cannot read properties of undefined (reading 'length') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `null` | THROWS TypeError: Cannot read properties of null (reading 'length') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `42` | {"ok":true,"value":[],"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `{}` | {"ok":true,"value":[],"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `[]` | {"ok":true,"value":[],"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `true` | {"ok":true,"value":[],"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |
| `NaN` | {"ok":true,"value":[],"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":0,"expected":["<string source>"],"actual":null}]} |

### ID-1b — the incumbent reads a NON-IDENT run as a declaration NAME — `col!r`, and a nested at-rule

| field | value |
|---|---|
| **input(s)** | `"b { col!r: rgb(9. none -76 / 0.) }"` · `"b { background-color: var(--brand) -!important }"` · `"h1 { img { @container (width > 400px) { nav { margin: 0 auto } } transition: opacity 200ms } }"` |
| **entry** | `parseStylesheet` |
| **incumbent** | ACCEPTS all three, and the NAME it returns is the defect: `col!r` comes back as a declaration named `col!r`; `-!important` is folded into the value as a keyword; and the third's first declaration is named `@container (width > 400px) { nav { margin` with value `0 auto`. The mechanism is one line — `parseDeclarations` takes `row.slice(0, row.indexOf(":"))` over a part of `splitTopLevel(body, ";")`, which is paren-aware and BRACE-BLIND, so any bytes at all become the name and a name may cross an inner `{`. |
| **candidate** | REJECTS the first two in BOTH lowerings (`css_syntax`, the span covering the rule), and reads the third's nested `@container` as an at-rule CHILD — css-syntax-3 §5.4.4's own answer — which is a DIVERGENT_VALUE against the incumbent's mangled declaration list rather than a rejection. |
| **spec citation** | css-syntax-3 §5.4.4 — a declaration's name is an `<ident-token>` (§4.3.11), and an `<at-keyword-token>` in a style block's contents starts an AT-RULE; §5.4.10 — `!important` follows a component value, so a run with no token boundary before the `!` is not one token. |
| **adjudication** | **UNADJUDICATED — routed to X.P.W4's fresh adjudicator**, for the reason ID-1 gives (M-23 §1). §0w defines ID-1b as "ID-1's mechanism one production up" and names the first two inputs; the THIRD is X.P.W3.n's own finding. `.m` filed it as **E-j1** ("2× `@container` nested inside a style rule") and §0w carried that reading as a candidate gap to be cured here. Measured at this seat by replaying the incumbent's own `blocks()` and `;` split, it is not a candidate gap: the candidate's reading is the specification's, and what differs is the incumbent's lax NAME production. The predicate in `adjudications.mjs` is that replay, so the attribution is mechanical and its census is printed beside its population on every run. The candidate's own disposition on the first two — refusing the whole sheet where §5.4.4 drops the invalid declaration and keeps the rule — is also unadjudicated and goes to the same seat. |
| **consumer direction** | NARROWS acceptance on the first two and CHANGES VALUE on the third. A consumer that fed `b { col!r: … }` received a declaration whose name is not a CSS property and could never match one; it now receives `ok:false`. A consumer that fed a nested at-rule received a declaration list with a name eighty characters long and no `children`; it now receives the at-rule as a child, which is what the stylesheet says. Both directions remove a value the string does not name. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"b { col!r: rgb(9. none -76 / 0.) }"` | {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"col!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb",… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":34,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<o… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":34,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<o… |
| `"b { background-color: var(--brand) -!important }"` | {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"list","separator":"space","items":[{"kind":"ca… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":48,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<o… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":48,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<o… |
| `"h1 { img { @container (width > 400px) { nav { margin: 0 auto } } transition: opacity 200ms } }"` | {"ok":true,"value":[{"kind":"style","selectors":["h1"],"declarations":[],"children":[{"kind":"style","selectors":["img"],"declarations":[{"name":"transition","v… | {"ok":true,"value":[{"kind":"style","selectors":["h1"],"declarations":[],"children":[{"kind":"style","selectors":["img"],"declarations":[{"name":"transition","v… | {"ok":true,"value":[{"kind":"style","selectors":["h1"],"declarations":[],"children":[{"kind":"style","selectors":["img"],"declarations":[{"name":"transition","v… |

### ID-4 — `blocks()`'s SIGNED paren counter goes negative and the rule's own `{` becomes invisible

| field | value |
|---|---|
| **input(s)** | `".c ){ color: #28cA }"` · `"#d ){ background-color: var(--a, rebeccapurple) }"` · `".c { background-color: rgb(-0 .504 6e-128 / 9e-415) } GARBAGE ) ;(#d { background-color: #eFEbC78B }"` |
| **entry** | `parseStylesheet` |
| **incumbent** | REJECTS all three, and rejects them for the counter rather than for the CSS: `blocks()`'s prelude scan does `else if (char === ")") parens--` with no floor, so a `)` that closes nothing leaves `parens === -1` and every later `{` or `;` fails the `parens === 0` test. The scan runs off the end, `boundary < 0`, and the answer is `failure(…, ["rule"])`. |
| **candidate** | ACCEPTS all three in BOTH lowerings, reading the stray `)` as ordinary prelude text: `.c )` and `#d )` are the selectors, and the third's second rule is the one its braces describe. |
| **spec citation** | css-syntax-3 §5.4.9 — a simple block is consumed to its MATCHING closer, so the parser holds a STACK; §4.3.1/§5.4.2 — a `)` with nothing open is a stray token and a parse error at most, never a depth of −1 that hides the next block. |
| **adjudication** | **UNADJUDICATED — routed to X.P.W4's fresh adjudicator**, for the reason ID-1 gives (M-23 §1). `.j` escalated the family as **SH-1** and reported rather than cured it; §0w rules it **ID-4**, "class predicate; candidate correct". X.P.W3.n narrows the family by MEASUREMENT: the predicate is the one byte-level disagreement between the two readings — a `)` that closes nothing — and the cells where the incumbent's `(` was never closed (`( { border-color: #26FA }`, `b ({ …`) are NOT this row's, because the candidate's own prelude now consumes a simple block to its matching `)` and refuses those sheets exactly as the incumbent does (X.P.W3.n's E-j1 cure). SH-1's eleven are therefore five here and six cured. |
| **consumer direction** | WIDENS acceptance. A consumer that fed `.c ){ … }` received `ok:false` with `expected ["rule"]` — a diagnostic naming nothing in the source — and now receives the rule the braces describe, with the stray `)` inside the selector text where the author wrote it. A consumer that relied on the rejection loses it; none that relied on acceptance is affected. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `".c ){ color: #28cA }"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":20,"expected":["rule"],"actual":".c ){ color: #28cA }"}]} | {"ok":true,"value":[{"kind":"style","selectors":[".c )"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rg… | {"ok":true,"value":[{"kind":"style","selectors":[".c )"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rg… |
| `"#d ){ background-color: var(--a, rebeccapurple) }"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":49,"expected":["rule"],"actual":"#d ){ background-color: var(--a, rebeccapurple) }"}]} | {"ok":true,"value":[{"kind":"style","selectors":["#d )"],"declarations":[{"name":"background-color","value":{"kind":"call","name":"var","args":[{"kind":"scalar"… | {"ok":true,"value":[{"kind":"style","selectors":["#d )"],"declarations":[{"name":"background-color","value":{"kind":"call","name":"var","args":[{"kind":"scalar"… |
| `".c { background-color: rgb(-0 .504 6e-128 / 9e-415) } GARBAGE ) ;(#d { background-color: #eFEbC78B }"` | {"ok":true,"value":[{"kind":"style","selectors":[".c"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"s… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":54,"end":65,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{' or ';')","<open-… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":54,"end":65,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{' or ';')","<open-… |

### ID-5 — the incumbent accepts a legacy comma form that mixes `<number>` with `<percentage>`, or spells `none`

| field | value |
|---|---|
| **input(s)** | `"rgb(24.745, 171.2787213968113, 41%)"` · `"rgb(+12, none, 40.121382917277515, 46.14)"` · `"rgb(none, 8e144, 80%, .86)"` |
| **entry** | `parseCssColor` |
| **incumbent** | ACCEPTS all three. It rewrites the commas to spaces before reading the channels, so the LEGACY form is parsed by the MODERN grammar, where every channel is `[<percentage> \| <number> \| none]` — the separator structure that distinguishes the two forms has been erased by the time the channels are read. |
| **candidate** | REJECTS all three in BOTH lowerings since X.P.W3.n: `legacy-rgb` is two homogeneous three-channel arms (`<percentage>#{3}` and `<number>#{3}`) and neither admits `none`. `<alpha-value>` is untouched, so `rgb(1, 2, 3, none)` still parses. |
| **spec citation** | css-color-4 §8.1 — `<legacy-rgb-syntax> = rgb( <percentage>#{3} , <alpha-value>? ) \| rgb( <number>#{3} , <alpha-value>? )`: the three channels are ONE type throughout, and `none` is admitted by the modern grammar alone. §7.1 says the same of `<legacy-hsl-syntax>`, whose saturation and lightness are `<percentage>`. |
| **adjudication** | **RULED at COHESION §0w — incumbent defect ID-5**, and the candidate's cure landed at X.P.W3.n WITH this row's class predicate, in one commit. `.k` measured the family as F-k2 and could not cure it (`src/css/**` was outside that unit's bounds); `.l` landed the cure twice and WITHDREW it both times, because a cure with no adjudication turns the 575 cells the oracle accepts into FALSE_REJECTs. The class predicate is what makes them declared divergences instead: 1,506 corpus rows match it and 1,487 cells are governed at the widest entry, both printed by `css-universe.mjs --check` on every run. |
| **consumer direction** | NARROWS acceptance. `rgb(24.745, 171.28, 41%)` and `rgb(none, 8e144, 80%, .86)` parsed and now return `ok:false` with a located diagnostic. A consumer emitting a mixed legacy form received a colour the string does not name — the incumbent read `41%` and `171.28` as the same kind of channel — and must emit either the all-`<number>` form, the all-`<percentage>` form, or the space-separated modern form, all three unaffected. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"rgb(24.745, 171.2787213968113, 41%)"` | {"ok":true,"value":{"space":"rgb","channels":[24.745,171.2787213968113,104.55],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":33,"end":35,"expected":["<comma>","<close-paren>"],"actual":"%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":33,"end":35,"expected":["<comma>","<close-paren>"],"actual":"%)"}]} |
| `"rgb(+12, none, 40.121382917277515, 46.14)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":41,"expected":["CSS color"],"actual":"rgb(+12, none, 40.121382917277515, 46.14)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":9,"end":41,"expected":["<number>"],"actual":"none, 40.121382917277515, 46.14)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":9,"end":41,"expected":["<number>"],"actual":"none, 40.121382917277515, 46.14)"}]} |
| `"rgb(none, 8e144, 80%, .86)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":26,"expected":["CSS color"],"actual":"rgb(none, 8e144, 80%, .86)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":8,"end":26,"expected":["<number>","<none-keyword> ('none')"],"actual":", 8e144, 80%, .86)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":8,"end":26,"expected":["<number>","<none-keyword> ('none')"],"actual":", 8e144, 80%, .86)"}]} |

### PB-11 (F-l3) — the ORACLE ACCEPTS `hwb(10, 10%, 10%)`, which PB-11's own prose says it rejects

| field | value |
|---|---|
| **input(s)** | `"hwb(10, 10%, 10%)"` · `"hwb(120, 30%, 40%)"` |
| **entry** | `parseCssColor` |
| **incumbent** | MEASURED at this emission, and the two do not agree with each other: this is the whole of the observation. `parser-band.md` rows `hwb(120, 30%, 40%)` as an unsound ACCEPT and PB-11 rules it REJECT; `.l` then measured `hwb(10, 10%, 10%)` accepted by the same oracle. The comma form has no legacy syntax on this head either way. |
| **candidate** | REJECTS both in BOTH lowerings — PB-11's ruling, honoured, and asserted as G-6 row (k). |
| **spec citation** | css-color-4 §8.3 — `hwb() = hwb( [<hue> \| none] [<percentage> \| <number> \| none] [<percentage> \| <number> \| none] [ / [<alpha-value> \| none] ]? )`: space-separated components only. §8 and §9 give hwb(), lab(), lch(), oklab(), oklch() and color() no legacy comma form at all. |
| **adjudication** | **OBSERVATION, rowed and not ruled here** (COHESION §0w: "rowed as an incumbent-defect observation under PB-11; adjudicated at W4"). `.l` raised it as **F-l3** — the oracle accepts what PB-11's prose says it rejects — and the disposition of the two cells is X.P.W4's fresh adjudicator's, not this wave's. PB-11 itself is unmoved: the candidate rejects both, which is what the ruling requires, and the class predicate's population over the 27,021-row corpus is **1**, printed beside the census on every run. |
| **consumer direction** | NARROWS acceptance. A consumer that fed `hwb(10, 10%, 10%)` received a colour from published 4.0.0 and now receives `ok:false`. The space-separated spelling `hwb(10 10% 10%)` is the same colour and is unaffected; that is the whole of the migration. |

| input | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) |
|---|---|---|---|
| `"hwb(10, 10%, 10%)"` | {"ok":true,"value":{"space":"hwb","channels":[10,0.1,0.1],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":17,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":6,"end":17,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… |
| `"hwb(120, 30%, 40%)"` | {"ok":true,"value":{"space":"hwb","channels":[120,0.3,0.4],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":18,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… | {"ok":false,"diagnostics":[{"code":"css_syntax","start":7,"end":18,"expected":["<angle-unit> ('deg')","<angle-unit> ('grad')","<angle-unit> ('rad')","<angle-uni… |

---

## §10 — `rulingId` appends, X.P.W4.f (SERVED MODEL: claude-fable-5-1 · 2026-09-19) — DATED, BESIDE (E-3)

**Standing.** Appended by the fresh Fable adjudicator of `X.P.W4S` under the third dated addendum of
`waves/W4.md` (*"`DIVERGENCE-LEDGER.md` (modify-append, `rulingId` fields)"*). Nothing above this line
is rewritten: §0–§9 are the emitter's bytes and `§6.1` is `.e`'s carried block. The emitter's F-e7
carry lifts `### §6.x` subsections only; **a regeneration must re-append this §10** (recorded in
`execution/D/X-P-W4S.md` as a residual for the emitter's owner). Every ruling below is derived in
`ADJUDICATION-W4.md`, whose section numbers are cited; the measurements are that file's Appendices A
and B, run twice at this seat.

#### §10.1 The 44 carried cells — `rulingId` per cell, as ruled

| cells (Appendix A `#`) | entry | `rulingId` the emitter attached | `rulingId` as RULED | disposition of record | direction |
|---|---|---|---|---|---|
| `#1`–`#4` | `parseCssColor` · `parseCssScalar` · `parseCssValue` · `parseCssValues` | `GROUND-C` | `GROUND-C` (COHESION §0v; css-color-4 §4.2 alpha clamp) | declared-divergence, candidate correct | WIDENS |
| `#5`–`#9` `#11`–`#28` (23) | `parseTimingFunction` | `GROUND-C` | `GROUND-C` (css-easing-1 bounds only `cubic-bezier` abscissae; ordinates and `linear()` stops carry `±Infinity`) | declared-divergence, candidate correct | WIDENS |
| `#10` | `parseTimingFunction` | `ID-2` | `ID-2` | declared-divergence, candidate correct | NARROWS |
| `#31` `#33` | `parseStylesheet` | `GROUND-C` | `GROUND-C` (§8.1 / §4.2 clamps inside a declaration) | declared-divergence, candidate correct | WIDENS |
| `#29` `#34` `#38` `#42` | `parseStylesheet` | `ID-4` | `ID-4` (css-syntax-3 §5.4.3 / §5.4.9) | declared-divergence, candidate correct | WIDENS |
| `#39` | `parseStylesheet` | `ID-4` | `ID-4` (the `(` block is consumed to EOF; the rule is a parse error) | declared-divergence, candidate correct under the seam's whole-sheet posture (ADJUDICATION-W4 §5) | NARROWS |
| `#43` `#44` | `parseStylesheet` | `ID-1b` | `ID-1b` (the nested at-rule; css-syntax-3 §5.4.4) | declared-divergence, candidate correct | CHANGES VALUE |
| `#30` `#35` `#36` | `parseStylesheet` | `ID-1b` | **`PB-12`** — the divergence is `9.`/`0.` · `4.deg` · `2.`; the non-ident NAME is accepted by BOTH engines (F-w4f-1, shared) | declared-divergence, candidate correct | NARROWS |
| `#32` | `parseStylesheet` | `ID-1b` | **`PB-09`** — `hsl(50% …)`; name shared | declared-divergence, candidate correct | NARROWS |
| `#37` | `parseStylesheet` | `ID-1b` | **`PB-05`** — alpha `-137` / `-116`: 4.0.0 rejects with `color_out_of_range`, the candidate clamps to 0; name shared | declared-divergence, candidate correct | WIDENS |
| `#40` | `parseStylesheet` | `ID-1b` | **CANDIDATE DEFECT F-w4f-2** ∧ `ID-1b` (F-m1: 4.0.0 folds `-!important` into the value as a keyword) | mirror-defect until F-w4f-2 is cured; then `ID-1b` | — |
| `#41` | `parseStylesheet` | `ID-1b` | **CANDIDATE DEFECT F-w4f-2** — `)!important` is valid (css-syntax-3 §5.4.7) and the candidate rejects it; 4.0.0 is correct here | mirror-defect until cured | — |

#### §10.2 Rows whose premise is measured FALSE at the producer — RETIRED as coverage claims (F-w4a-1)

| row | `rulingId` | ruling (ADJUDICATION-W4 §3) |
|---|---|---|
| `CN-2` | `F-w4a-1` | RETIRED — all 10 subjects are exported at `entry.mjs` and resolve from the installed tarball (G-3 `52 of 52`); 9 rows `identical`, `coerceToSyntax` `declared-divergence` inherited from `parseCssColor` |
| `CN-3` | `F-w4a-1` | RETIRED — all 33 types are re-exported in-package from the sha-pinned 4.0.0 declaration and resolve from the installed tarball; 28 rows `identical`. The generator cannot re-emit this row truthfully until `F-ab1` (the five-name literal at `run-full-surface.mjs:60`) is cured |
| `R4` | `F-w4a-1` | RETIRED as a coverage claim — `parseKeyframeSelector` is realized (27,021 of 27,021 AGREE); the fixture's axis is a SHARED posture, an observation |

#### §10.3 Rows whose `candidate` field is refuted as stated (L-14) — amended beside, never edited above

| row | field | as written | as measured | `rulingId` |
|---|---|---|---|---|
| `ID-1b` | **candidate** | *"REJECTS the first two in BOTH lowerings"* | both lowerings ACCEPT `b { col!r: rgb(9 none -76 / 0) }` and `b { background-color: var(--brand) - !important }` — the rejections in the rowed inputs are `PB-12`'s (`9.`, `0.`) and F-w4f-2's (`-!important` adjacency). The non-ident-name mechanism is SHARED (F-w4f-1). The row's incumbent half and its third (nested at-rule) input stand | `ID-1b` (narrowed to the brace-crossing form) · F-w4f-1 · F-w4f-2 |
| `ID-4` | **candidate** | *"ACCEPTS all three"* | the third input (`… GARBAGE ) ;(#d { … }`) is REJECTED by both lowerings, as the row's own measured table already shows — the prose is amended to the table | `ID-4` |

#### §10.4 The posture ruled once — the whole-sheet refusal

`ID-1b`'s open question (*"refusing the whole sheet where §5.4.4 drops the invalid declaration"*) is
**ruled the SEAM's error posture** (ADJUDICATION-W4 §5): the frozen `ParseResult<Stylesheet>` has no
kept-rule-dropped-declaration channel and 4.0.0's own answer to a malformed rule is whole-sheet
`ok:false`. Not a divergence class; no `rulingId`.

---

## §11 — the NEW divergence `X.P.W4.h` opens, appended (SERVED MODEL: claude-opus-5[1m] · 2026-09-19) — DATED, BESIDE (E-3)

**Standing.** Appended under `waves/W4.md`'s FIFTH dated addendum (COHESION §0ab bullet 3:
*"the new divergence against 4.0.0 is `declared-divergence`, rulingId **F-w4f-1**, candidate
correct, consumer direction stated"*). Nothing above this line is rewritten — §0–§9 are the
emitter's bytes, §6.1 is `.e`'s carried block, §10 is `.f`'s. A regeneration must re-append §10 AND
this §11 (recorded as a residual for the emitter's owner in `execution/D/X-P-W4S.md`).

### F-w4f-1 — a declaration NAME that is not one `<ident-token>`

**§11.1 — the row.** Rendered in the ledger's OWN row grammar (`### <id> — <title>`, the form
every `§9` row carries), so `scripts/seam-contract-check.mjs:112` reads this as ledger row
`F-w4f-1` and `SEAM-CONTRACT.md` row 19's disposition resolves to it. The three sections below
sit one level down for the same reason — `.f`'s `#### §10.1 … #### §10.4` precedent one section
above. **Repair 1, 2026-09-20 (Check 1 · C1-1, HIGH): a FORM cure inside `X.P.W4.h`'s own
appended bytes.** Every field's text below is `.h`'s, moved cell-for-cell and unedited; no
reading, no disposition and no direction changed. Nothing above `## §11` is touched (E-3).

| field | value |
|---|---|
| **rulingId** | `F-w4f-1` |
| **entry** | `parseStylesheet` |
| **subject** | **a declaration NAME that is not one `<ident-token>`** — css-syntax-3 §5.4.4 consumes a declaration only when the next token is an `<ident-token>`; §4.3.11 / §4.3.9 define one |
| **incumbent (4.0.0)** | **ACCEPTS** the rule and carries the malformed name through: `parseDeclarations` takes every trimmed byte before the first `:` of a `;`-split part, so `col!r`, `!color`, `color!`, `border-co+or`, `backgrou(d-color`, `(color`, `,color`, `backgro und-color`, `border-c%olor`, `border-color.` and `1color` are all NAMES there — **INCUMBENT DEFECT** (the 4.0.0 half is X·V's and rides X-W11's OUT-OF-WAVE roster by id) |
| **candidate (both lowerings)** | **REJECTS** the sheet (`decl-name` is the `ident` continuation set behind a zero-width no-leading-digit assertion; §5.4.4's optional whitespace before the `:` is read explicitly) |
| **disposition** | **declared-divergence, candidate correct** |
| **consumer direction** | **NARROWS.** A consumer whose stylesheet spells a declaration name that is not one ident-token had the rule accepted with the malformed name in the tree and is now refused **whole** (the seam's ruled error posture, §10.4). A comment that OPENS a style body is the other face of it: 4.0.0 reads the comment text as the name, the candidate reads the comment as trivia and the real declaration after it — the sheet is ACCEPTED by both and the VALUE differs |

#### §11.2 What it measures, at the pin

At the sha-asserted 27,021-row union (`evidence/W4/differential-full-surface-2026-09-19-w4h.txt`,
double-run): `parseStylesheet`'s miss count moves **14 → 124** and the surface total **42 → 152**,
of which **152 of 152 carry a rulingId from the §0w set — `NOT IN THE SET 0`**. The resolver files
this mechanism under **`ID-1b`**, whose own residual predicate is
`unanchoredBangRead(src) || nonIdentDeclarationName(src)` and whose `specCitation` is css-syntax-3
§5.4.4; its census **117** stays under its pinned population **534** and **no population drifted
from its pin**. Retagging that residual class from `ID-1b` to `F-w4f-1` moves `RULING_IDS`, which is
the id-set printed in the IMMUTABLE banked `evidence/W3/universe-52.json`; it is the adjudicator's
act (`X.P.W4.f2`), named here and not reached for.

#### §11.3 The `ID-1b` row's `candidate` field, once more (L-14)

`ID-1b` (§9) and §10.3's amendment both record that both lowerings ACCEPTED `b { col!r: … }`. That
reading was true at `.f`'s clock and is **superseded at the bytes from `X.P.W4.h`**: both lowerings
now REJECT it, for the reason this §11 row states. §9 and §10.3 are not edited (E-3); this is the
dated amendment beside.

#### §11.4 F-w4f-2 — DISCHARGED, so it opens no row here

`§10.1`'s cells `#40` and `#41` carried *"CANDIDATE DEFECT F-w4f-2 … mirror-defect until cured"*.
The cure landed at `X.P.W4.h` (`<p2>` `fede7d3`) and both cells re-measure **`identical`**
(`evidence/W4/two-cell-census-2026-09-19-w4h.txt`). F-w4f-2 is a candidate defect REPAIRED, not a
divergence declared: no ledger row is owed and none is written. `§10.1`'s two rows stand as written,
with this section as their dated disposition.

---

## §12 — the 152 cells at parse-that master, each dispositioned; the harness now honours the rulings (X.P.W5.b · SERVED MODEL: claude-opus-5-5 · 2026-09-23) — DATED, BESIDE (E-3)

**Standing.** Appended under `waves/W5.md` §Units `.b`: *"each cured at the parser (either side) or
rowed as an intended divergence with its spec citation; harness exit 0"*. Nothing above this line is
rewritten. §0–§9 are the emitter's bytes, §6.1 is `.e`'s, §10 is `.f`'s, §11 is `.h`'s. A
regeneration must re-append §10, §11 AND this §12.

**What was measured.** At parse-that master `4eac70c1` (the `.a` merge of `w2/harness`),
⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ (no `--limit`, no
`--out`) printed `MIRROR-DEFECTS 152 (of which spec-undecided 118)` and exited 1. `W5.md` quotes 44;
that figure is from before `X.P.W4.h` (§11.2 records the 42 → 152 move). **Every one of the 152 cells
was already ruled candidate-correct.** 41 are ruled one at a time in `ADJUDICATION-W4.md` §2 (Appendix
A `#1`–`#44`, less `#40`/`#41`, which F-w4f-2's cure made `identical`, and `#37`, which now falls under
F-w4f-1). The other 111 are ruled as a class, F-w4f-1 (COHESION §0ab; §11 above). No cell is a
candidate defect, so no grammar cure applies: a cure would copy the incumbent's defect into the
candidate. The rows already existed. The gap was the INSTRUMENT: the differential honoured only the
sixteen parser-band adjudications, so a ruled cell still counted as a defect.

#### §12.1 The dispositions, by ruling — every cell `declared-divergence`, candidate correct

| ruling | cells (entry × lowering-agnostic) | spec § | representative input | 4.0.0 | candidate (js ≡ wasm) | direction | ruled at |
|---|---|---|---|---|---|---|---|
| `GROUND-C` | 4 (`#1`–`#4`: `parseCssColor` · `parseCssScalar` · `parseCssValue` · `parseCssValues`) | css-syntax-3 §4.3.13 (overflow is not a syntax error); css-color-4 §4.2 (alpha clamps to [0,1]) | `rgb(.843, -0, +54, 5e498)` | REJECT `css_syntax` | ACCEPT `{rgb, [0.843, 0, 54], alpha 1}` | WIDENS | ADJUDICATION-W4 §2.1 |
| `GROUND-C` | 23 (`parseTimingFunction`) | css-easing-1: only `cubic-bezier` x1/x2 are range-restricted | `cubic-bezier(.319, 1e389, .334, 28.136)` | REJECT `css_syntax` | ACCEPT, `y1: Infinity` | WIDENS | §2.2 |
| `ID-2` | 1 (`#10`, `parseTimingFunction`) | css-syntax-3 §5.4.1 / css-values-4 §2.1 (an empty comma part is not a component value) | `steps(1e43,, start)` | ACCEPT `{steps, 1e43, jump-start}` | REJECT `[11,19) <jump-position>` | NARROWS | §2.2 |
| `GROUND-C` | 2 (`#31`, `#33`, `parseStylesheet`) | css-color-4 §8.1 / §4.2 | `a{ color: rgb(-232, 52.305, 67, 1e327) }` | REJECT | ACCEPT `[0, 52.305, 67] / alpha 1` | WIDENS | §2.3 |
| `ID-4` | 4 (`#29` `#34` `#38` `#42`) | css-syntax-3 §5.4.3 (a stray `)` is a prelude component value) | `.c ){ color: #28cA }` | REJECT `expected ["rule"]` | ACCEPT, selector `.c )` | WIDENS | §2.4 |
| `ID-4` | 1 (`#39`) | css-syntax-3 §5.4.9 (a `(` block is consumed to EOF) | `.c {…} GARBAGE ) ;(#d { … }` | ACCEPT two rules | REJECT `[54,65)` + `[65,100)` | NARROWS | §2.4 |
| `PB-12` | 3 (`#30` `#35` `#36`) | css-syntax-3 §4.3.12 (`1.` is not a number); the name is also non-ident (F-w4f-1) | `b { col!r: rgb(9. none -76 / 0.) }` | ACCEPT | REJECT | NARROWS | §2.5 |
| `PB-09` | 1 (`#32`) | css-color-4 §7 (a percentage hue); non-ident name too | `… a { border-colo!r: hsl(50% 1e-366 67.310) }` | ACCEPT | REJECT | NARROWS | §2.5 |
| `ID-1b` (nested rule) | 2 (`#43`, `#44`) | css-syntax-3 §5.4.4 (an `<at-keyword-token>` starts an at-rule, not a name) | `@property --ratio {…} h1, h2 {/* c */ img { @container (width > 400px) { nav {…} } … } … }` | ACCEPT, mangled names (`@container (width > 400px) { nav { margin`) | ACCEPT, `@container` a child of `img` | CHANGES VALUE | §2.5 |
| `F-w4f-1` | 111 (`parseStylesheet`: 79 + 27 + 5 by verdict below) | css-syntax-3 §5.4.4 / §4.3.11 (a name is one `<ident-token>`); §4.3.2 (a comment is trivia) | `a { co  lor: hsl(270rad 4e-280 +61 / 2.725) }` | ACCEPT, name `co  lor` | REJECT the sheet (whole-sheet posture, §10.4) | NARROWS | COHESION §0ab · §11 |
| `F-w4f-1` (comment-trivia face) | 5 of the 111 | css-syntax-3 §4.3.2 | ` [data-x] { /* note */opacity: 1 !important }` | ACCEPT, name `/* note */opacity` | ACCEPT, name `opacity` | CHANGES VALUE | COHESION §0ab · ADJUDICATION-W4 §12 |

The 111 F-w4f-1 cells by harness verdict before this unit: 79 `FALSE_REJECT_IN_SHAPE`, 27
`ADJUDICATION_UNHONOURED` and 5 `DIVERGENT_VALUE`. The 27 are sheets where a parser-band ruling
(PB-04/05, PB-01/02, ADJ-3) wants the colour accepted and the candidate refuses the sheet on its NAME.
After the repair (§12.2), the colour ruling is honoured. `#37` (PB-05) is one of them. 41 + 111 = 152.

#### §12.2 How the harness honours a ruling, and why it is not an allowlist

parse-that `902172d` (`typescript/test/css-equivalence/lib/ruled.mjs`, used by
`lib/differential.mjs`'s `applyRuling`) is consulted ONLY for a cell the differential already reads as
a RED trigger. A cell no ruling governs comes back unchanged and is still counted AGAINST the
candidate.

- **Per-cell rulings (41).** Each row carries the exact corpus input, the entries it binds, its
  Appendix A number, its ruling id as RULED (§10.1, not the emitter's tag), the section that rules it,
  the ruled candidate verdict and the direction. A cell is honoured only when the candidate's verdict
  equals the ruled verdict. If the candidate moves off it, the cell reads `ADJUDICATION_UNHONOURED`,
  which is a RED trigger.
- **The F-w4f-1 class (111).** It is entered only where the shared predicate
  `nonIdentDeclarationName`, the one `remainderId` files under `ID-1b`, fires. The repair rewrites
  exactly the incumbent's mis-spelled NAME runs. Runs that cross a brace are the nested-rule reading
  (`#43`/`#44`'s shape) and are left untouched. The cell is honoured only if every applicable
  condition below holds:
  - the repaired sheet reads non-RED against the same oracle and the same parser-band adjudications;
  - for a non-ident name, the candidate REFUSES the original and ACCEPTS the repaired sheet (so a
    sheet both engines refuse for another reason can never pass);
  - for a comment-only run, the candidate's reading does not move when the comment goes (same tree,
    or the same refusal code).

  If any condition fails, the cell keeps its RED verdict and the reason is appended to its `why`.
- **Negative controls, run at this seat** (a scratch driver of `resolveRuling` with synthetic
  candidate results). A per-cell `#8` with the candidate refusing → `honoured=false`. The same input
  at another entry → not governed. A non-ident name the candidate accepts → `false`. Both refusing the
  repaired sheet → `false`. A repaired sheet still RED → `false`. A comment-only run whose verdict
  flips, or whose tree moves → `false`. A nested-rule-only run → not governed. No ruling → not
  governed. Two positives were `true`.

**The reading after the unit (G-W5-b1), double-run.**
⟨`node test/css-equivalence/run-full-surface.mjs --pinned-value-commit 6aca8602…`⟩ →
`ledger 77 rows — … · RULED 39` · `MIRROR-DEFECTS 0 (of which spec-undecided 0)` ·
`GREEN — zero mirror-defects across the full surface, and every declared difference is rowed.` →
EXIT 0, both runs. The two runs differ only in the line-1 timestamp. Against the pre-unit report:
`AGREE` is unmoved on every row and `DECLARED_DIVERGENCE` rises by exactly the prior miss count
(`parseCssColor`/`Scalar`/`Value`/`Values` +1 each, `parseTimingFunction` +24,
`parseStylesheet` +124) in both lowerings.

#### §12.3 A SHARED departure the repair test surfaced (not a divergence; no mirror-defect)

**F-W5b-1 — `var()` inside the `animation` shorthand is refused by BOTH engines.**
`.h { animation: blob-emerge 500ms var(--ease-decelerate) backwards; }` → 4.0.0
`animation_option_invalid` · candidate `animation_option_invalid`. css-variables-1 §3: a property
value that contains a syntactically valid `var()` is assumed valid at parse time. The engines agree,
so the harness has nothing to count here. The corpus cell that surfaced it
(`.hero-blob-anchor { /* … */ animation: … var(--ease-decelerate) backwards; }`) diverged only
because 4.0.0 read the comment as part of the NAME. It is honoured as F-w4f-1's comment-trivia face:
the candidate's refusal code is unchanged when the comment goes. The shared departure is routed to
the seam's next grammar unit (`X.P.W5.c` / `.e`), not cured here. Curing it only on the candidate
would open a new divergence against the frozen 4.0.0 contract, so the cure and its row must land
together.

## §13 — X.P.W5 Repair 1: the shared Color 4/5 coverage gaps are rowed with owners, and the declaration-name class is cured for non-ASCII (SERVED MODEL: claude-opus-5-5 · 2026-09-23) — DATED, BESIDE (E-3)

Nothing above this heading is edited. These are NOT ledger rows: the engines agree on SC-1/SC-2, so, like §12.3's F-W5b-1, they sit one level down, outside `seam-contract-check.mjs`'s `### <id> — ` row grammar. This section answers `execution/D/X-P-W5.md` §Check 1 D-3
(R-c-3 had no named owner) and records one candidate-side cure that the R-c-1 re-pin surfaced.

#### SC-1 — `calc()` in a colour channel: refused by BOTH engines (shared spec-coverage departure)

| field | value |
|---|---|
| **entry** | `parseCssColor` (and every entry that reads a colour: `parseCssValue`, `parseStylesheet` declaration values) |
| **subject** | css-color-4 §4 channel grammar admits `<number>` / `<percentage>` / `<angle>`, and css-values-4 §10 lets a math function (`calc()`, `min()`, `max()`, `clamp()` …) stand wherever such a value does |
| **incumbent (4.0.0, MEASURED)** | ⟨`parseCssColor("rgb(calc(10) 20 30)")`⟩ → `ok:false css_syntax` · `rgb(calc(50% + 10%) 0 0)` → `ok:false` · `hsl(calc(120deg) 50% 50%)` → `ok:false` |
| **candidate (both lowerings, MEASURED at parse-that master + this repair)** | the same three → `ok:false css_syntax`, js ≡ wasm |
| **disposition** | **shared spec-coverage departure, not a mirror-defect**: the engines agree, so the harness counts nothing. WPT population excluded by `test/css-color5.test.ts` (R-c-3), counted from its own tallies (`:76`, `:103`, `:198`, `:220`): 18 `color-mix()` cells (10 computed + 8 valid) and 35 legacy cells (34 valid + 1 invalid) |
| **consumer direction** | NO CHANGE against 4.0.0. A consumer who writes `calc()` in a colour channel is refused today and stays refused |
| **owner** | **Track D, the next X·P grammar wave**: css-values-4 §10 as a production of the seam's value grammar, reachable from the colour channels, in BOTH lowerings, landed with its WPT cells un-excluded. No frozen type moves (a math function resolves to the channel's own number), so no contract ruling is needed |

#### SC-2 — `color(display-p3-linear …)` as an INPUT space: refused by BOTH engines (shared; contract-gated)

| field | value |
|---|---|
| **entry** | `parseCssColor` |
| **subject** | css-color-4 §10 predefined `display-p3-linear`. The seam ADMITS it as a `color-mix()` interpolation space (`in display-p3-linear`), but not as a `color()` input space |
| **incumbent (4.0.0, MEASURED)** | ⟨`parseCssColor("color(display-p3-linear 1 0 0)")`⟩ → `ok:false css_syntax`, `expected ["CSS color space"]` |
| **candidate (MEASURED)** | `ok:false css_syntax`, js ≡ wasm |
| **disposition** | **shared spec-coverage departure, contract-gated.** A `color()` value in this space has to be returned as a `CssColor` whose `space` is `display-p3-linear`, and that literal is not a member of the frozen 4.0.0 `CssColorSpace` union (`src/css/build/value-css-4.0.0.d.ts`). Widening it is a contract change (`W3.md` §3a), not a grammar act. WPT population excluded: 45 computed + 31 valid (8 invalid cells are refused anyway) |
| **consumer direction** | NO CHANGE against 4.0.0 |
| **owner** | **the orchestrator (contract ruling)**, then the Track D grammar wave that carries SC-1. Carried as escalation **ESC-R1-2** in `execution/D/X-P-W5.md` §Repair 1 |

#### §13.1 A candidate-side cure beside F-w4f-1: a non-ASCII declaration name is one `<ident-token>`

F-w4f-1 (§11) narrowed `decl-name` to "the `ident` continuation set". The table it used
(`typescript/src/css/algebra/tables.mjs`, `isIdent`) is ASCII-only, while css-syntax-3 §4.2 defines
an *ident code point* as an ident-start code point (a letter, U+005F, or a **non-ASCII** code point),
a digit, or U+002D. Measured at parse-that master `488523c`, before the cure:
⟨`parseStylesheet("a { Xé: red }")`⟩ → `ok:false css_syntax`, and `a { --x≡y: red }` → `ok:false`.
Both are one `<ident-token>`, and 4.0.0 accepts both. The regression test that guarded this case
(`test/css-recovery/stylesheet-grammar.test.ts`, J-6) read RED on master.
The cure adds the non-ASCII marker `0xFF` to `decl-name`, the same marker `ident-start` already
carries. After it, `a { Xé: red }` → declaration `xé` and `a { X≡Y: red }` → `x≡y`, js ≡ wasm. F-w4f-1's
refusals are unmoved: `!color`, `border-co+or`, `backgrou(d-color`, `,ackground-color`, `/olor` and
`backgro und-color` are still refused whole. This opens no new divergence, since it moves the
candidate toward 4.0.0 on inputs that are ident-tokens. The full-surface harness still reads
`MIRROR-DEFECTS 0` afterwards (the reading is in the §Repair 1 of `execution/D/X-P-W5.md`).

#### §13.2 An observation for CAP-3 / CAP-4's owner (no row moved)

CAP-3 and CAP-4 say "NO COORDINATE … the WINDOW cuts first". That holds for the declared witness
family `a{c}×n`: at its largest fitting n = 3,526 it names `<mark-journal>` and never the recovery
or diagnostic journal. But the census family `a{c;×n}` (inside one body) names
`[marks, recoveries, D]` at 14,107 code units (measured in `capacity.test.ts` §6 at this repair).
So both journals **are** reachable under Θ.input, just not by the declared family. The emitter's
witness choice (`bounds.mjs` `witnessAtCapacity`) belongs to whoever next re-emits §7. It is not
re-emitted here (E-3).

## §14 — X.P.W5.g: full Color 4/5 coverage in the seam, the rows its cures open (SERVED MODEL: claude-opus-5-5 · 2026-09-23) — DATED, BESIDE (E-3)

Nothing above this heading is edited. Authority: `waves/W5.md` ADDENDUM 2026-09-23 (COHESION §0bx) — F-W5c-1 re-ruled to the spec; SC-1 / SC-2 / R-c-2 / R-b-2 / R-b-1 ordered to `.g`. Each row below lands in the same act as the parse-that commit that makes it true, and names that commit. The engines AGREE on every row below at 4.0.0's side of the seam (both refuse, or the incumbent refuses a form the candidate now reads per spec in a way no SEAM-CONTRACT disposition binds), so — like §13 — each sits one level down (`####`), outside `seam-contract-check.mjs`'s `### <id> — ` row grammar; SEAM-CONTRACT.md is not this unit's to edit.

#### F-W5c-1 — the LEGACY `rgb()/rgba()/hsl()/hsla()` forms refuse a `none` alpha (supersedes PB-01/02 for the legacy arms)

| field | value |
|---|---|
| **rulingId** | `F-W5c-1` (COHESION §0bx; W5.md ADDENDUM :25) — **supersedes PB-01 / PB-02's `none` face for the legacy arms only**; their numeric four-argument form (`rgba(1, 2, 3, 0.5)`, `hsla(120, 50%, 50%, 0.5)`) stands |
| **entry** | `parseCssColor` (and every entry that reads a colour through `P:color`) |
| **subject** | css-color-4 (ED) §4.2 `<alpha-value> = <number> \| <percentage>`; its changelog: "Made explicit that legacy forms do not support none". `none` stays lawful in the MODERN grammar behind `/` |
| **input** | `rgb(255, 255, 255, none)` · `hsla(120, 100%, 50%, none)` (WPT `color-invalid-rgb.html` / `color-invalid-hsl.html`) |
| **incumbent (4.0.0, MEASURED)** | `ok:false` — the incumbent refuses every four-argument legacy form (PB-01/02's premise), so it refuses these too |
| **candidate (both lowerings, MEASURED)** | before: `ok:true … alpha:"none"` (PB-01/02 as ruled) · after: `ok:false css_syntax`, js ≡ wasm; `rgb(255 255 255 / none)` still `ok:true alpha:"none"` |
| **disposition** | **ruling superseded, candidate correct**: the cure is one alpha edit per legacy arm (`legacyAlpha()` = `CLAMP(0,1, <percentage> \| <number>)` in `algebra/grammar.mjs`'s two `rgb` arms and its `hsl` arm); the PB-01/02 repair (`legacyAlphaEdits`, `test/css-totality/lib/adjudications.mjs`) no longer claims a `none` fourth argument, so the 17 corpus cells it used to repair are read at their raw verdict — both engines refuse, the harness counts nothing |
| **consumer direction** | **NARROWS** against the candidate's own prior (2.0.0-pre) reading and **NO CHANGE** against 4.0.0: a consumer who wrote `rgba(r, g, b, none)` was refused by 4.0.0 and is refused again; `rgb(r g b / none)` is the spec spelling and parses |
| **cure commit** | parse-that `98fbe48` (grammar + `ac1.wasm` + `css-color5.test.ts` + `adjudications.mjs`), landed with this row as one pair — two repositories cannot share one commit object |
| **cells re-read** | the 17 corpus cells PB-01/02 repaired through a `none` alpha, at each of the five colour-reading entries × 2 lowerings (`equivalence.test.ts` "every adjudicated conflict is HONOURED": 17 per entry before the adjudication edit, 0 after); `run-full-surface.mjs` MIRROR-DEFECTS 0 |

#### R-b-2 — `var()` in the animation family is valid at parse time (F-W5b-1 cured; supersedes §12.3's shared departure)

| field | value |
|---|---|
| **rulingId** | `R-b-2` (COHESION §0bx; W5.md ADDENDUM :28) — the cure §12.3 routed "to the seam's next grammar unit … the cure and its row must land together" |
| **entry** | `parseStylesheet` (the completer's `checkDeclaration`; both lowerings share it, so js ≡ wasm by construction and by test) |
| **subject** | css-variables-1 §3: "If a property contains one or more var() functions, and those functions are syntactically valid, the entire property's grammar must be assumed to be valid at parse time. It is only syntax-checked at computed-value time." |
| **input** | `a{animation: var(--a) 1s}` · `a{animation: fade 1s var(--e)}` · `a{animation-duration: var(--d)}` · corpus: `.stagger-children > * { animation: stagger-child-in var(--duration-normal) var(--ease-standard) both; }`, `.stagger-children > *:nth-child(1) { animation-delay: calc(var(--stagger-base, 0ms) + 0ms); }` (and its 6 siblings), `.pane-shell > :first-child { … animation: plate-land var(--overture-plate-land, 440ms) … }`, `.hero-blob-anchor { /* … */ animation: blob-emerge 500ms var(--ease-decelerate) backwards; }` |
| **incumbent (4.0.0, MEASURED)** | `ok:false animation_option_invalid` (8 corpus cells), `ok:false css_syntax` (the `.pane-shell` cell), and the `.hero-blob-anchor` cell ACCEPTED with the comment read into the NAME (F-w4f-1's trivia face) |
| **candidate (both lowerings, MEASURED)** | before: `ok:false animation_option_invalid` (all three probes) · after: `ok:true`, the `var()` carried as its parsed `{kind:"call",name:"var"}`; a var-free value is still checked (`animation: fade 1s bogus bogus2` → `animation_option_invalid`) |
| **disposition** | **declared-divergence, candidate correct.** The harness honours it as a RULED CLASS (`test/css-equivalence/lib/ruled.mjs` `R_B_2` / `resolveVarRuling`) by a mechanism test, never on a match: the candidate accepts the sheet AND deleting exactly its var()-holding animation-family declarations (leading trivia included) leaves a non-RED cell. Measured: 10 cells (9 MIS_ACCEPT + 1 DIVERGENT_VALUE, the latter composed with F-w4f-1's comment face) → DECLARED_DIVERGENCE; MIRROR-DEFECTS 10 → 0 |
| **cure commit** | parse-that `2382b30` (`entry.mjs` `containsVar` + the harness class + `test/css-var-animation.test.ts`), landed with this row as one pair — two repositories cannot share one commit object |
| **consumer direction** | **WIDENS.** A sheet whose animation declaration holds a `var()` was refused whole by 4.0.0 and now parses; the value is carried unsubstituted. `collectAnimationOptions` reads no parse-time option from such a declaration (its value is known only after substitution) |

## §15 — X.P.W6.h: value.js's BBNF grammar against the shipping hand parser; five mirror-defects cured at the grammar root, five classes rowed (SERVED MODEL: claude-opus-5-5 · 2026-09-23) — DATED, BESIDE (E-3)

Nothing above this heading is edited. Authority: `waves/W6.md` §Units `.h` (COHESION §0by): *"run the BBNF parser against the current `src/css/grammar.ts` over the full corpus … every divergence classified by the DIVERGENCE-LEDGER rulings (the per-cell and F-w4f-1 class rulings carry) or rowed new; MIRROR-DEFECTS 0 ×2."*

**What changed about the two sides.** Everything above compared parse-that's AC-1 candidate against the vendored 4.0.0 tarball. From this section on, the **incumbent** is value.js HEAD's hand parser (`src/css/grammar.ts`) and the **candidate** is value.js's BBNF grammar (`src/css/grammar/*.bbnf`, compiled by `@mkbabb/bbnf-lang` 0.1.4 onto `@mkbabb/parse-that` 0.8.2, actions in `src/css/bbnf/`). The surface is the six parse entries both carry: `parseCssColor` · `parseCssScalar` · `parseCssValue` · `parseCssValues` · `parseKeyframeSelector` · `parseTimingFunction`. `parseStylesheet` stays on the hand scanner (RES-b-1), so **F-w4f-1 and R-b-2, both `parseStylesheet` classes, carry but have no cell here**. Their resolvers are ported whole, and they are keyed to that entry.

**The instrument.** `test/css/equivalence/` in value.js. `lib/adjudications.mjs`, `lib/tokens.mjs` and `lib/ruled.mjs` are VERBATIM ports of the retired seam's modules; only one import path is re-pointed. `differential.ts` carries the seam's `classifyCell`, its RED triggers and its convention: where no ruling governs, a cell counts AGAINST the candidate. There is no COVERAGE_NARROWING leg. `w6-classes.ts` holds §15.3's classes, and each one is a mechanism test. `equivalence.test.ts` is G-h1, and it includes a falsifier: a planted alpha defect must read RED 3/3. Corpus: `assay-corpus.json` is the seam's 27,021-row union, byte-identical, and `rowsSha256` `e119d81b…` is asserted. `real-corpus.json` is generated by `build-corpus.mjs` from files read at HEAD. It holds 3,049 distinct sources: value.js demo CSS (100 files, 637), keyframes.js CSS (90 files, 578, `keyframes.js` HEAD pinned in the file), and value.js tests plus the vendored WPT cases (22 files, 1,983). The generator counts 2 sources that postcss cannot read as `unreadable`; they are two intentionally malformed test sheets.

### §15.1 BEFORE — the harness on the `.b` bytes (value.js `0b2b5d5f`)

| corpus · entry | AGREE | ruled | RED (by trigger) |
|---|---|---|---|
| assay · `parseCssColor` / `parseCssScalar` | 24,340 | 2,541 | **140** — DIVERGENT_VALUE 93 · MIS_ACCEPT 47 |
| assay · `parseCssValue` / `parseCssValues` | 23,535 | 2,544 | **942** — ADJUDICATION_UNHONOURED 784 (PB-12) · DIVERGENT_VALUE 93 · MIS_ACCEPT 47 · FALSE_REJECT_IN_SHAPE 18 |
| assay · `parseTimingFunction` | 26,851 | 170 | 0 |
| real · `parseCssColor` / `parseCssScalar` | 2,284 | 52 | **713** — MIS_ACCEPT 713 |
| real · `parseCssValue` / `parseCssValues` | 2,927 | 85 | **37** — MIS_ACCEPT 35 · ADJUDICATION_UNHONOURED 2 (PB-12) |
| both · `parseKeyframeSelector` | all | 0 | 0 |

### §15.2 The five MIRROR-DEFECTS, each cured at the grammar root (value.js `c02179fa`)

Each one is a BBNF-side defect: the candidate read an input the way no ruling allows. The cure goes in the `.bbnf` production, or in the semantic action the production feeds. It never goes in the harness.

| # | defect (cells before) | example | ruling / spec it broke | cure (file) | direction vs the shipping parser |
|---|---|---|---|---|---|
| MD-1 | `<number>` matched the INTEGER PART of a longer number through regex backtracking, so a two-argument colour read as three (4 assay MIS_ACCEPT) | `oklch(60% 0.15450deg)` → `[0.6, 0, 0.1545]` | css-syntax-3 §4.3.12 (a number is consumed greedily; `0.15450deg` is ONE dimension token) | `tokens.bbnf` `number`: the integer branch is `\d+(?!\.\d)` | none — both refuse |
| MD-2 | the component `numeric` admitted a trailing `.` (784 + 2 ADJUDICATION_UNHONOURED) | `steps(7., jump-start)` · `… Level 3.` | PB-12 (`1.` is not a CSS number, css-syntax-3 §4.3.12) | `value.bbnf` `numeric`: `(?:\d*\.\d+\|\d+)` with `.` in the negative lookahead | candidate NARROWS, as PB-12 rules |
| MD-3 | a `var()` fallback that ends in a comma was refused (1 FALSE_REJECT_IN_SHAPE) | `var(--brand, chocolate,)` | css-variables-1 §2: the fallback is `<declaration-value>?`, and commas are part of it | `value.bbnf` `varCall`/`varBody` (the trailing comma is optional and carries no item) + `bbnf/value.ts` `on("varCall", callValue)` | none — the same `{call var [--brand, chocolate]}` |
| MD-4 | an `hsl()`/`hwb()` bare number `n` was read as `n × 0.01` rather than exactly `n%`, so the result was one ulp off the ruled `n / 100` (part of the 93 DIVERGENT_VALUE) | `hsl(+30rad +82 7e-243)` → S `0.8200000000000001` | PB-03 (the two spellings agree bit-for-bit; `ruledValue` = `n / 100`) | `bbnf/color.ts`: `UNIT` reads a number as a percentage (`numberIsPercent`) | none — bit-identical |
| MD-5 | `rad` was converted as `v × (180/π)`, while the incumbent and the canonical form use `(v × 180) / π`, so the result was one ulp off (the rest of the 93) | `hsl(+30rad …)` hue `…696` vs `…698` | css-values-4 §6.1 (canonical deg); bit-identity with the shipping reading | `bbnf/math.ts` `ANGLE` as conversion functions, `rad: (v × 180) / π` | none — bit-identical |

**Behaviour MD-3 adds that the corpus does not witness.** `var(--a,)` (an empty fallback, which css-variables-1 allows) now parses to `{call var [--a]}`, and the incumbent refuses it. It is **WIDENS**, and it is spec-correct. It is rowed here so that no intended difference goes unrowed. No corpus cell carries it.

### §15.3 The classes — each divergence is ruled, and each is proved by a repair and never by a match

Each class is consulted only for a cell that reads RED and that no per-cell ruling governs. It governs the cell only when two things hold. First, the source with the construct repaired out reads **not RED** under every ruling. Second, for a widening, the candidate still ACCEPTS the repaired source. So the construct is the whole divergence. If the repair fails, the cell stays RED and the failure is named in its `why` (`w6-classes.ts`).

| class id | ruling it rides | construct · repair | spec | cells (assay · real, per entry) | incumbent → candidate | consumer direction |
|---|---|---|---|---|---|---|
| `ID-2` | COHESION §0w id-set; ADJUDICATION-W4 §2.2 `#10` | an empty comma part `(,` `,,` `,)` · the empty parts are deleted, and the candidate must then accept | css-values-4 §2.1, css-syntax-3 §5.4.1 | 17 · 0 (`parseCssValue`/`Values`); the `#10` literal stays per-cell at `parseTimingFunction` | ACCEPT, part dropped → REJECT `css_syntax` | **NARROWS** (e.g. `linear-gradient(90deg, red, blue,)`) |
| `GROUND-C` (hue face) | COHESION §0v (RULED): an overflow is not a syntax error, and a `<finite-number>` rejection label is REFUSED. This **supersedes ADJ-3's reject arm on the `<hue>`** (ADJ-3 left GROUND-C owner-owed; §0v ruled it) | a non-finite numeral as a `<hue>` argument · the hue is spelled `0<unit>`, and the candidate's tree must not move | css-syntax-3 §4.3.13; css-color-4 hue; WPT `color-valid-hsl.html` "the `<hue>` component is again normalized to 0 degrees" | 43 · 0 (each colour entry) | REJECT → ACCEPT, hue `0` | **WIDENS** |
| `SC-1` | COHESION §0bx (SC-1 → `.g`, carried by W6.md `.b`) | a colour argument that is one `calc/min/max/clamp/abs/sign` call · the call is spelled `0` / `0%` | css-color-4 §4.1, css-values-4 §10 (incl. §10.9 ±∞/NaN) | 0 · 33 | REJECT → ACCEPT | **WIDENS** |
| `C5-MIX` | COHESION §0bx "full Color 4/5 coverage"; W6.md `.b` | `color-mix()` / `light-dark()` · each call is spelled `red` | css-color-5 §3 (the value is pinned by WPT computed 931/931, `test/css/css-color5.test.ts`), §4 | 0 · 678 (`parseCssColor`/`Scalar`; `parseCssValue` reads both as generic calls on BOTH sides and AGREES) | REJECT → ACCEPT | **WIDENS** |
| `SC-2` | COHESION §0bx (SC-2) | `display-p3-linear` · the space is spelled `display-p3` | css-color-4 §10.5 | 0 · 2 | REJECT → ACCEPT | **WIDENS** |

Every other ruled cell rides a ruling this file already carries: parser-band PB-01/02, PB-03 (arithmetic), PB-04/05, PB-08, PB-09/10, PB-12, SP-1, ID-5, ADJ-2 and ADJ-3; the per-cell GROUND-C `#1` and `#5`–`#28`; and ID-2 `#10`. They resolve through the verbatim `adjudicator` / `resolveRuling`, with no edit.

### §15.4 AFTER — G-h1, read twice on the settled bytes (value.js `e046fe43`)

⟨`npx vitest run test/css/equivalence`⟩ ×2 → `Tests 15 passed (15)` both runs, and the per-entry census lines are byte-identical across the two runs:

| corpus · entry | cells | AGREE | DECLARED_DIVERGENCE | MIRROR-DEFECTS |
|---|---|---|---|---|
| assay · `parseCssColor` / `parseCssScalar` | 27,021 | 24,437 | 2,584 | **0** |
| assay · `parseCssValue` / `parseCssValues` | 27,021 | 23,633 | 3,388 | **0** |
| assay · `parseKeyframeSelector` | 27,021 | 27,021 | 0 | **0** |
| assay · `parseTimingFunction` | 27,021 | 26,851 | 170 | **0** |
| real · `parseCssColor` / `parseCssScalar` | 3,049 | 2,284 | 765 | **0** |
| real · `parseCssValue` / `parseCssValues` | 3,049 | 2,927 | 122 | **0** |
| real · `parseKeyframeSelector` / `parseTimingFunction` | 3,049 | 3,049 | 0 | **0** |

Falsifier: a planted alpha defect reads RED on 3 of 3 cells.

### §15.5 Residuals (not divergences between the two engines, named for `.x`)

- **R-h-1**: `parseStylesheet` and the stylesheet layer have no BBNF peer (RES-b-1). F-w4f-1, R-b-2 and the stylesheet-shaped rulings (ID-1b, ID-3, ID-4) have no cell on this surface. `.x`'s swap re-opens them when a `stylesheet.bbnf` exists.
- **R-h-2**: `color-mix()` / `light-dark()` in `parseCssValue` are generic calls on both sides. The candidate's colour reading of them reaches only `parseCssColor` / `parseCssScalar`. This is shared behaviour, not a divergence.

## §15-A — X.P.W6R.l: the ledger follows the files; SH-1 and `badTerm` rowed (SERVED MODEL: claude-opus-5-5 · 2026-09-23) — DATED, BESIDE (E-3)

Nothing above this heading is edited; §15.1–§15.5 stand as written on 2026-09-23. Authority: `waves/W6R.md` `.l` (COHESION §0cg: RES-x-4 becomes X.P.W6R). Sources: the X.P.W6 record `execution/D/X-P-W6.md` (`.x` receipt, the close's RES-x-4/RES-x-5 and LW-1 rows).

### §15-A.1 The instrument moved: `test/css/equivalence/…` → `bench/css-equivalence/…`

X.P.W6.x (value.js `7e60d700` family) moved the differential out of `test/` so it no longer rides `npm test`. Every §15 citation of `test/css/equivalence/…` (§15 "The instrument" paragraph; §15.4's command) now reads at `bench/css-equivalence/…`, with the file names unchanged:

| §15 cites | reads now at |
|---|---|
| `test/css/equivalence/` (the instrument) | `bench/css-equivalence/` |
| `lib/adjudications.mjs` · `lib/tokens.mjs` · `lib/ruled.mjs` | `bench/css-equivalence/lib/` (same three, plus their `.d.mts`) |
| `differential.ts` · `w6-classes.ts` | `bench/css-equivalence/differential.ts` · `bench/css-equivalence/w6-classes.ts` |
| `equivalence.test.ts` (G-h1) | `bench/css-equivalence/equivalence.measure.test.ts` |
| `assay-corpus.json` · `real-corpus.json` · `build-corpus.mjs` | `bench/css-equivalence/` (same names) |
| — (new at `.x`) | `bench/css-equivalence/stylesheet.measure.test.ts` (the `parseStylesheet` differential and SH-1, §15-A.2) |
| ⟨`npx vitest run test/css/equivalence`⟩ | ⟨`npx vitest run -c bench/vitest.config.ts`⟩, or ⟨`npm run test:css-equivalence`⟩ (X.P.W6R.c `1d970c7c`, which also runs it in the producer CI job): `Test Files 2 passed (2)` · `Tests 19 passed (19)` |

The count moves from §15.4's 15 tests to 19 because `.x` added `stylesheet.measure.test.ts` (4 tests: the `parseStylesheet` census, the two timeline entries, its falsifier). `real-corpus.json` keeps its generation note naming the old `build-corpus.mjs` path; that is `.h`'s evidence, re-pinned on its next regeneration (RES-x-5 / R-h-4), not edited here.

### §15-A.2 SH-1 · UNMATCHED DELIMITER — `parseStylesheet`, 13 cases (css-syntax-3 §5.4.8)

The §5-era SH-1 row above (the `.j` escalation, routed UNADJUDICATED; §0w rules it ID-4) read the vendored 4.0.0 against parse-that's candidate. This row is the same family on the X.P.W6.x surface: value.js's retired hand stylesheet layer (incumbent) against `src/css/grammar/stylesheet.bbnf` (candidate, `dff875e8`). Mechanism test: `bench/css-equivalence/stylesheet.measure.test.ts` (`withoutUnmatchedDelimiters`, `SHEET_CLASSES["SH-1"]`).

| field | value |
|---|---|
| **class id** | `SH-1` UNMATCHED DELIMITER |
| **entry** | `parseStylesheet` |
| **cells** | **13** of 32,021 sheets. ⟨`npx vitest run -c bench/vitest.config.ts bench/css-equivalence/stylesheet.measure.test.ts`⟩ (2026-09-23, this seat) → `parseStylesheet × 32021: {"AGREE":30252,"VALUE_GRAMMAR":1726,"BOTH_REFUSE":30,"DEFECT":0} · classes {"SH-1":13} · STYLESHEET DEFECTS 0`; the same census as the `.x` receipt (X-P-W6.md:226). |
| **example** | `a { backgrou(d-color: red }` |
| **incumbent (retired signed paren-depth)** | Counted parentheses with a signed depth: an unclosed `(` hid every later `;`/`{`, and a stray `)` drove the depth negative. It read the example as a declaration NAMED `backgrou(d-color`. |
| **candidate (BBNF reading)** | `stylesheet.bbnf` reads a `(` only as the start of a block that closes at its matching `)`, and a `)` with no `(` closes nothing. It REFUSES the sheet. |
| **spec citation** | css-syntax-3 §5.4.8: a `(`-block is consumed to its matching `)`, so the parser holds a stack, not a signed counter. |
| **governs when (the proof by repair)** | All three hold: (1) HEAD refuses the sheet (fail-closed, `after.ok === false`); (2) the sheet has at least one unmatched `(`/`)` outside strings and comments; (3) with exactly those delimiters removed, the retired-plus-BBNF-values hybrid and HEAD agree (deep-equal, or both refuse). Then the delimiter is the whole difference. |
| **falsifier** | The class is fail-closed. A sheet HEAD ACCEPTS, a sheet with no unmatched delimiter, or a sheet whose repair still disagrees is never SH-1; it counts as `DEFECT` and fails `STYLESHEET DEFECTS 0`. The census itself can fail: the planted sheet-layer defect (`!important` → false) reads `DEFECT` on 3 of 3 sheets (`falsifier: a planted sheet-layer defect reads RED`, GREEN in the same run: `Tests 4 passed (4)`). |
| **consumer direction** | **NARROWS.** A consumer that fed a sheet with an unmatched `(`/`)` got a misread rule (a declaration named across the delimiter) and now gets a refusal. |
| **adjudication** | Rowed as a mechanism class, as `.x` shipped it (X-P-W6.md:195). It is spec-correct on the candidate side. It shares only the predicate (a delimiter that closes nothing, or is never closed) with the §5-era SH-1 row; the direction differs because the incumbent differs (4.0.0 REJECTED there, the retired value.js layer MISREAD here). This row neither re-opens nor leans on that row's ID-4 ruling. |

### §15-A.3 `badTerm` — the refused component, cured in `value.bbnf` (X.P.W6.x, `7e60d700`; LW-1 ratified by COHESION §0cg)

| field | value |
|---|---|
| **what went RED** | With the BBNF path public, `test/v4-css-emerging.test.ts:100` went RED. `calc(1px @ 2px)` must refuse and name the offending component (`actual: "@"`); BBNF refused the whole input instead (X-P-W6.md:178). |
| **cure (grammar)** | `src/css/grammar/value.bbnf`: `badTerm = /[^\s(),\/:;"']+/ ;` is the LAST `valueTerm` alternative (`valueTerm = colorCall \| varCall \| call \| numeric \| string \| operator \| identTerm \| badTerm ;`). It matches a component no production above reads, only to REFUSE it. |
| **cure (action)** | `src/css/bbnf/value.ts`: `rules.badTerm` answers `refused("css_syntax", "scalar")`, with a `span` from `mapState`'s `prev.offset`/`next.offset`: exactly the run it matched. |
| **divergence vs the retired hand parser** | Verdict and label agree (`css_syntax`, expecting a scalar, naming `@`). The span is ABSOLUTE (an offset into the whole input), where the hand parser gave one relative to its sub-part. The differential compares verdicts and values, not refusal spans (RES-x-2), so no cell moves. The span difference is rowed here so it is not left unrowed. |
| **consumer direction** | none for the verdict; a consumer reading `span` gets whole-input offsets. |
| **bounds** | LW-1 (X-P-W6.md:274): `value.bbnf` sat outside `.x`'s dispatched set. COHESION §0cg ratified it after the fact under the ADJACENT-LINE RULE: same wave, same concern, required by the swap sentence. |
