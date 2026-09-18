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
`registry/adjudicated/parser-band.md`; §2's four DISSENTS and §3's five fixtures come from their own
authorities; §4 is `.b`'s F-b4, routed to this seat inside the wave; §5 is generated from the
candidate's own `UNREALIZED_ENTRIES` against the pinned barrel; **§7** is generated from `bounds.mjs`'s
own `CAPACITY_REGIONS` and carries §0p/§0q as its authority; **§8** carries css-color-4 §7.1 and the
fields `.g` banked for it. **This seat adjudicates nothing.** §6 is reserved for `.e`, the fresh Fable
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
| candidate | AC-1 TAGLESS-TWIN, two lowerings (`js`, `wasm`), entries `parseCssColor`, `parseTimingFunction`, `parseStylesheet` |
| candidate unrealized | `parseCssScalar`, `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`, `parseAnimationTimeline`, `parseAnimationRange` — named by the candidate itself, never omitted |

### §0.2 Row census

| § | family | rows | authority |
|---|---|---|---|
| §1 | ADJUDICATED | 16 | `registry/adjudicated/parser-band.md` via `.a`'s `lib/adjudications.mjs` |
| §2 | PRESERVED DISSENT | 4 | `parser-band.md` DISSENTS, anchored by text |
| §3 | REGRESSION FIXTURE | 5 | `apotheosis/parser-proof/GATE-VERDICT.md` F-2 |
| §4 | LABEL SURFACE | 1 | `X-P-W3.md` `.b` F-b4 |
| §5 | DECLARED COVERAGE NARROWING | 3 | the candidate's `UNREALIZED_ENTRIES` × the pinned barrel |
| | **total** | **39** | |

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
| `"lch(50% 50% 50%)"` | {"ok":true,"value":{"space":"lch","channels":[50,75,180],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":16,"expected":["<color>"],"actual":"lch(50% 50% 50%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":16,"expected":["<color>"],"actual":"lch(50% 50% 50%)"}]} |

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
| `"hwb(120, 30%, 40%)"` | {"ok":true,"value":{"space":"hwb","channels":[120,0.3,0.4],"alpha":1},"diagnostics":[]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":18,"expected":["<color>"],"actual":"hwb(120, 30%, 40%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":18,"expected":["<color>"],"actual":"hwb(120, 30%, 40%)"}]} |

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
| `"lab(50 1e400 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":[],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["<color>"],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["<color>"],"actual":"lab(50 1e400 0)"}]} |
| `"hsl(1e400 0% 50%)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":17,"expected":[],"actual":"hsl(1e400 0% 50%)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":17,"end":17,"expected":["<finite-number>"],"actual":null}]} |

---

## §2 The four preserved DISSENTS

`W3.md` §2c routes them here by name: *"`parser-band.md` DISSENTS (token juxtaposition · non-finite ·
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
| `"lab(50 1e400 0)"` | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":[],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["<color>"],"actual":"lab(50 1e400 0)"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":15,"expected":["<color>"],"actual":"lab(50 1e400 0)"}]} |
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
the mirror preserves spec-correctness, never bug-compatibility."* Three of the five are NOT met by this
wave and say so in their own rows; a fixture recorded as met when it was not is the dishonesty §11
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
| `"lab()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":5,"expected":["<color>"],"actual":"lab()"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":5,"expected":["<color>"],"actual":"lab()"}]} |
| `"color()"` | THROWS TypeError: Cannot read properties of undefined (reading 'replace') | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["<color>"],"actual":"color()"}]} | {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":7,"expected":["<color>"],"actual":"color()"}]} |

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

### CN-1 — the 6 frozen parse entries the candidate NAMES as unrealized

| field | value |
|---|---|
| **subjects** | `parseCssScalar` · `parseCssValue` · `parseCssValues` · `parseKeyframeSelector` · `parseAnimationTimeline` · `parseAnimationRange` |
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
the file it is about to replace, lifts every `### §6.x` subsection out of it verbatim, and emits it
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

### CAP-1 — the `input` region — Θ.input = 65,458 code units (class 1)

| field | value |
|---|---|
| **region / class** | `input` · class 1 · checked before the run |
| **declared capacity Θ.input** | 65,458 code units (DERIVED; the layout CAP is 1,048,576) |
| **raw label → promoted production** | `input <= 65458` → `<input-window>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<input-window>` (raw label `input <= 65458`, checked before the run). Θ.input = 65,458 code units of the region's layout CAP 1,048,576. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `input` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS acceptance, and it is consumer-visible on the shipped JS target. An input whose code units exceed **65,458** — a size published 4.0.0 parses and returns a value for — is answered `ok:false` with `expected[0] = "<input-window> …"`. A consumer whose stylesheets can exceed that size must chunk its input or read the diagnostic; it will not receive a partial value and it will not receive a throw. The direction is strictly safer than the state it replaced (a Wasm trap on one target and an untyped acceptance on the other), and strictly narrower than 4.0.0. |
| **witness family** | `witnessAtCapacity("input", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the bound** — `witnessAtCapacity("input", 65,458)` | 65,458 | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:true · 1 top-level item(s) · 0 diagnostic(s) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("input", 65,459)` | 65,459 | ok:true · 1 top-level item(s) · 0 diagnostic(s) | ok:false · 1 diagnostic(s): css_syntax [0,65459) "<input-window> (at most 65458 code units)" | ok:false · 1 diagnostic(s): css_syntax [0,65459) "<input-window> (at most 65458 code units)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 65,459._

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
| **AT the bound** — `witnessAtCapacity("marks", 16,381)` | 49,143 | ok:true · 16,381 top-level item(s) · 0 diagnostic(s) | ok:true · 16,381 top-level item(s) · 0 diagnostic(s) | ok:true · 16,381 top-level item(s) · 0 diagnostic(s) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("marks", 16,382)` | 49,146 | ok:true · 16,382 top-level item(s) · 0 diagnostic(s) | ok:false · 1 diagnostic(s): css_syntax [0,49146) "<mark-journal> (at most 32768 marks)" | ok:false · 1 diagnostic(s): css_syntax [0,49146) "<mark-journal> (at most 32768 marks)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 16,382._

### CAP-3 — the `recoveries` region — Θ.recoveries = 4,096 recoveries (class 1)

| field | value |
|---|---|
| **region / class** | `recoveries` · class 1 · checked after the run |
| **declared capacity Θ.recoveries** | 4,096 recoveries (the layout CAP itself) |
| **raw label → promoted production** | `recoveries <= 4096` → `<recovery-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<recovery-journal>` (raw label `recoveries <= 4096`, checked after the run). Θ.recoveries = 4,096 recoveries. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `recoveries` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS acceptance, and it is consumer-visible on the shipped JS target. An input whose recoveries exceed **4,096** — a size published 4.0.0 parses and returns a value for — is answered `ok:false` with `expected[0] = "<recovery-journal> …"`. A consumer whose stylesheets can exceed that size must chunk its input or read the diagnostic; it will not receive a partial value and it will not receive a throw. The direction is strictly safer than the state it replaced (a Wasm trap on one target and an untyped acceptance on the other), and strictly narrower than 4.0.0. |
| **witness family** | `witnessAtCapacity("recoveries", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the bound** — `witnessAtCapacity("recoveries", 4,096)` | 16,384 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 4,096 diagnostic(s): css_syntax [0,4) "<colon>" · css_syntax [4,8) "<colon>" …(+4094) | ok:false · 4,096 diagnostic(s): css_syntax [0,4) "<colon>" · css_syntax [4,8) "<colon>" …(+4094) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("recoveries", 4,097)` | 16,388 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 2 diagnostic(s): css_syntax [0,16388) "<recovery-journal> (at most 4096 recoveries)" · css_syntax [0,16388) "<diagnostic-journal> (at most 4096 diagnostics)" | ok:false · 2 diagnostic(s): css_syntax [0,16388) "<recovery-journal> (at most 4096 recoveries)" · css_syntax [0,16388) "<diagnostic-journal> (at most 4096 diagnostics)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 4,097._

### CAP-4 — the `D` region — Θ.D = 4,096 diagnostics (class 1)

| field | value |
|---|---|
| **region / class** | `D` · class 1 · checked after the run |
| **declared capacity Θ.D** | 4,096 diagnostics (the layout CAP itself) |
| **raw label → promoted production** | `D <= 4096` → `<diagnostic-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | REJECTS at the bound on the parse path, in BOTH lowerings, as an ordinary `ok:false` — `css_syntax` with `expected[0]` the promoted production `<diagnostic-journal>` (raw label `D <= 4096`, checked after the run). Θ.D = 4,096 diagnostics. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `D` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NARROWS acceptance, and it is consumer-visible on the shipped JS target. An input whose diagnostics exceed **4,096** — a size published 4.0.0 parses and returns a value for — is answered `ok:false` with `expected[0] = "<diagnostic-journal> …"`. A consumer whose stylesheets can exceed that size must chunk its input or read the diagnostic; it will not receive a partial value and it will not receive a throw. The direction is strictly safer than the state it replaced (a Wasm trap on one target and an untyped acceptance on the other), and strictly narrower than 4.0.0. |
| **witness family** | `witnessAtCapacity("D", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the bound** — `witnessAtCapacity("D", 4,096)` | 16,384 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 4,096 diagnostic(s): css_syntax [0,4) "<colon>" · css_syntax [4,8) "<colon>" …(+4094) | ok:false · 4,096 diagnostic(s): css_syntax [0,4) "<colon>" · css_syntax [4,8) "<colon>" …(+4094) | YES |
| **ONE PAST the bound** — `witnessAtCapacity("D", 4,097)` | 16,388 | ok:false · 1 diagnostic(s): css_syntax [0,1) "declaration" | ok:false · 2 diagnostic(s): css_syntax [0,16388) "<recovery-journal> (at most 4096 recoveries)" · css_syntax [0,16388) "<diagnostic-journal> (at most 4096 diagnostics)" | ok:false · 2 diagnostic(s): css_syntax [0,16388) "<recovery-journal> (at most 4096 recoveries)" · css_syntax [0,16388) "<diagnostic-journal> (at most 4096 diagnostics)" | YES |

_Coordinate found by binary search at this generation: the region is first named at n = 4,097._

### CAP-5 — the `C` region — Θ.C = 65,536 entries (class 2)

| field | value |
|---|---|
| **region / class** | `C` · class 2 · checked after the run (peak) |
| **declared capacity Θ.C** | 65,536 entries (the layout CAP itself) |
| **raw label → promoted production** | `C <= 65536` → `<complement-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | DECLARED and ASSERTED (§0q class 2, peak-with-grant: the JS lowering keeps a high-water on the journal it already appends, the same quantity the module guards), and measured UNREACHABLE under the derived Θ.input — C ⊔ P tiles the consumed input, so C + P ≤ Θ.input = 65,458 < 65,536. The raw label `C <= 65536` exists and promotes to `<complement-journal>`, so the bound is readable even though no input reaches it. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `C` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE TODAY. The bound is declared so that a consumer can read it and so that a later Θ.input restoration (R-f1) cannot make it silent, but no input under the present window breaches it — measured at the window on this family, below. Rowed rather than left undeclared: an unreachable bound that nobody declared is still an undeclared bound. |
| **witness family** | `witnessAtCapacity("C", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("C", 21,816)` | 65,457 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 21,816) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-6 — the `P` region — Θ.P = 65,536 entries (class 2)

| field | value |
|---|---|
| **region / class** | `P` · class 2 · checked after the run (peak) |
| **declared capacity Θ.P** | 65,536 entries (the layout CAP itself) |
| **raw label → promoted production** | `P <= 65536` → `<provenance-journal>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | DECLARED and ASSERTED (§0q class 2, peak-with-grant: the JS lowering keeps a high-water on the journal it already appends, the same quantity the module guards), and measured UNREACHABLE under the derived Θ.input — C ⊔ P tiles the consumed input, so C + P ≤ Θ.input = 65,458 < 65,536. The raw label `P <= 65536` exists and promotes to `<provenance-journal>`, so the bound is readable even though no input reaches it. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `P` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE TODAY. The bound is declared so that a consumer can read it and so that a later Θ.input restoration (R-f1) cannot make it silent, but no input under the present window breaches it — measured at the window on this family, below. Rowed rather than left undeclared: an unreachable bound that nobody declared is still an undeclared bound. |
| **witness family** | `witnessAtCapacity("P", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("P", 21,816)` | 65,457 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 21,816) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-7 — the `vstack` region — Θ.vstack = 65,536 slots (class 3)

| field | value |
|---|---|
| **region / class** | `vstack` · class 3 · checked unreachable by construction |
| **declared capacity Θ.vstack** | 65,536 slots (the layout CAP itself) |
| **raw label → promoted production** | `vstack <= 65536` → `<value-stack>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 1 code unit, S = 78, ceiling 65,536 ≤ cap 65,536 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `vstack` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **65,458** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
| **witness family** | `witnessAtCapacity("vstack", n)` under `P:stylesheet`, driven through `parseStylesheet` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("vstack", 65,458)` | 65,458 | ok:true · 0 top-level item(s) · 0 diagnostic(s) | ok:false · 3 diagnostic(s): css_syntax [0,65458) "<mark-journal> (at most 32768 marks)" · css_syntax [0,65458) "<recovery-journal> (at most 4096 recoveries)" …(+1) | ok:false · 3 diagnostic(s): css_syntax [0,65458) "<mark-journal> (at most 32768 marks)" · css_syntax [0,65458) "<recovery-journal> (at most 4096 recoveries)" …(+1) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 65,458) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-8 — the `arena` region — Θ.arena = 7,208,960 bytes (class 3)

| field | value |
|---|---|
| **region / class** | `arena` · class 3 · checked unreachable by construction |
| **declared capacity Θ.arena** | 7,208,960 bytes (the layout CAP itself) |
| **raw label → promoted production** | `arena <= 7208960` → `<arena>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 101 code unit, S = 46, ceiling 6,611,304 ≤ cap 7,208,960 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `arena` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **65,458** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
| **witness family** | `witnessAtCapacity("arena", n)` under `P:timing-function`, driven through `parseTimingFunction` |

| witness | code units | incumbent (published 4.0.0, MEASURED) | candidate js (MEASURED) | candidate wasm (MEASURED) | js ≡ wasm |
|---|---|---|---|---|---|
| **AT the full window** — `witnessAtCapacity("arena", 21,816)` | 65,457 | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | ok:true · one value · 0 diagnostic(s) | YES |

_No coordinate exists under Θ.input: the densest declared family at the window (n = 21,816) names this region in neither lowering (js does not name it · wasm does not name it), which is what "unreachable" means here._

### CAP-9 — the `expsnap` region — Θ.expsnap = 32 frames (class 3)

| field | value |
|---|---|
| **region / class** | `expsnap` · class 3 · checked unreachable by construction |
| **declared capacity Θ.expsnap** | 32 frames (the layout CAP itself) |
| **raw label → promoted production** | `expsnap <= 32` → `<expectation-snapshots>` |
| **incumbent** | published 4.0.0 declares NO capacity of any kind on this axis: it parses until it runs out of host memory, and on the inputs measured below it returns a value. |
| **candidate** | UNREACHABLE BY CONSTRUCTION (§0q class 3). Θ declares the capacity from `layout.mjs` and `bounds.mjs` ASSERTS AT LOAD that `cap₃ ≥ K × bound₁ + S` — for this region K = 0 depth level, S = 1, ceiling 1 ≤ cap 32 — so a class-1 rejection always fires first and this region cannot be the one that answers. |
| **spec citation** | COHESION §0p — "both lowerings reject at the bound … with `css_syntax` and a label naming it" — and §0q's E-f2 per-class ruling (class 1 boundary-visible · class 2 peak-with-grant · class 3 unreachable-by-construction), carried into `W3.md`'s two dated 2026-09-18 ADDENDA as unit `.f`. Every bound VALUE is read from the built module's own layout constants (`layout.mjs`), and `Θ.input` is DERIVED (`INPUT_BOUND`) rather than pinned; no CAP was moved by this wave. |
| **adjudication** | DECLARED CAPACITY BOUND, rowed here for the first time (**F-L1**, raised by the round-4 `## Check 1`). The P-1 taxonomy's COVERAGE_NARROWING sentence — "C14 declines an input outside its **declared shape** that the live superset accepts is **not** a defect — `status.json` declares it" — is the governing one, and Θ **is** the declared shape; this row is that declaration for the `expsnap` axis. Not discharged and not repaired here: the bound is correct and ordained, and what was owed was the declaration. |
| **consumer direction** | NO CHANGE at this region, and the narrowing it CAUSES is rowed at CAP-1: Θ.input is **65,458** rather than the layout's own 1,048,576 precisely because `cap₃ ≥ K × Θ.input + S` must hold for this region among the three. Restoring the full window is R-f1, owned by X.P.W4; it is a capacity question, never a correctness one. |
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
