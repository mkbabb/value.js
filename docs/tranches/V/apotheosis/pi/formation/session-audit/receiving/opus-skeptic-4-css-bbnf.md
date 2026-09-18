# O4 — CSS specification, browser witnesses, BBNF boundaries, ownership

Receiving audit seat 4 of the V·π parser-prototype mini-tranche.
Subject freeze: `receiving/AUDIT-SUBJECT.json`, value.js HEAD
`c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`.

---

## Model receipt

- **Model identifier I observe myself to be:** `claude-opus-5[1m]`, named
  "Opus 5 (1M context)". This is the identity my harness declares to me in the
  session system prompt. I probed the environment for an independent receipt and
  found none: `CLAUDE_MODEL`, `ANTHROPIC_MODEL`, and `CLAUDE_CODE_SUBAGENT_MODEL`
  are all empty in my process environment (`env | grep -i model` → no rows).
- **Honest limitation, stated plainly:** from inside the seat I have no
  cryptographic or API-level way to prove the served model. The only receipt
  available to me is the harness's own declaration. I therefore report:
  *declared Opus 5, self-observed as Opus 5, independently unverifiable from
  within the seat.* Adjudicators who need a hard receipt must read it from the
  spawning side's `turn_context`/routing log, not from this file. This is
  exactly the failure mode `FINDINGS.md` row **A13** already books as
  `REJECTED_CLAIM` ("historical Fable/Opus labels prove served model"), and I
  decline to launder my own label past it.
- **Effort level:** high / exhaustive. I ran real browsers, real network fetches
  against the pinned CSSWG commit, and real executions of the shipping parser and
  its built `dist`. No finding below rests on reading a status label.
- **Prior authorship:** none. I did not write any subject byte. I treated every
  claim as adversarial.
- **Writes performed:** this file only. I did not touch `src/`, `vnext/`,
  `scripts/dev/dev.sh`, any `INBOX.md`, or any subject byte. All scratch work is
  in the session scratchpad outside the repository.

---

## What I actually executed

Every command below was run by me in this session; outputs are pasted verbatim
in the findings.

**Specification acquisition (pinned, hash-verified):**

1. `curl` of `https://drafts.csswg.org/scroll-animations-1/` and
   `/css-animations-2/` (rendered HTML), de-tagged with a local Python filter and
   grepped for literal production text.
2. `gh api repos/w3c/csswg-drafts/commits/c7573530343759ace8e46438a1fa2c44515b5554`
   → verified the tranche's pinned commit exists and its tree OID is
   `75bf19c016ed98126381508073de6893c9f756f5` (exactly as recorded).
3. `gh api .../git/trees/75bf19c0…?recursive=1` → 3,608 entries, `truncated:false`.
4. Downloaded **all 168** pinned Overview sources from
   `raw.githubusercontent.com/w3c/csswg-drafts/c7573530…/` and verified byte
   length + SHA-256 for **168/168** against
   `denominator/source-universe.json`.

**Browser witnesses (three engines, headless, `about:blank`, CSSOM):**

5. Keyframe-selector CSSOM probe over 36 selectors × Chromium 148.0.7778.96,
   Firefox 150.0.2, WebKit 26.4 — insert `@keyframes probe { SEL { … } }`, read
   `sheet.cssRules[0].cssRules.length` and `keyText`.
6. `animation-range-start` probe over 21 values × the same three engines via
   `CSS.supports` + specified-value round-trip.
7. `CSS.supports("color", …)`, `CSS.supports("animation-timeline", …)` probe for
   E01/E03/E09/E10/E11.

**Shipping-parser execution (read-only; I ran it, I did not edit it):**

8. `npx vite-node` against `src/css/index.ts` — `parseCssColor`,
   `parseKeyframeSelector`, `parseAnimationRange`, `parseStylesheet`.
9. `node` against the built `dist/subpaths/css.js` — the *exact* engine the
   parser-proof harness names as `live`.

**Static census (mechanical, reproducible):**

10. Export census of `src/subpaths/*.ts` and `src/css/index.ts`.
11. Consumer census of `demo/**` and `/Users/mkbabb/Programming/keyframes-v-exec/src/**`.
12. Grammar-obligation census over the 168 pinned sources (method stated in F-13).
13. BBNF import-graph and declaration census from
    `git -C /Users/mkbabb/Programming/bbnf-lang show af15f63e:grammar/css/l4/*.bbnf`
    (read-only; no worktree touched, no message sent, no snapshot taken).

**Evidence-archive interrogation:**

14. `jq` over `parser-proof/equivalence-results.json` (403 rows) and
    `coverage.md`.

**What I deliberately did NOT do / did not sample:** I did not read the 2,862
raw agent messages or the 3,283 envelopes (seat 1's lens); I read only
`FINDINGS.md`, both handoffs, `CHARTER.md`, `MODULE-DAG.md`,
`W0-STRUCTURAL-CHECK.md`, `denominator/README.md`, and targeted greps of
`ADDENDA-0*`/`FEATURE-LEDGER.md`. I did not attempt to run the `mirror/` test
suite (seat 2's lens). I did not verify the bench numbers (seat 5's lens).

---

## Findings

Severity key: **BLOCKER** = falsifies a load-bearing tranche claim or is a live
shipping crash · **MAJOR** = materially wrong or unsupported · **MINOR** =
imprecision · **INFO** = confirmation with added precision.

---

### O4-01 — The keyframe-selector four-arm claim is CORRECT, and the bounded/unbounded asymmetry is REAL. `CONFIRMED` · INFO

**Claim under test** (HANDOFF-2026-07-24.md:281–287; FINDINGS E13/E14/E04;
MODULE-DAG.md:79–88): `<keyframe-selector> = from | to | <percentage [0,100]> |
<timeline-range-name> <percentage>`, with the named-range percentage **mandatory**
and **unbounded**, the bare percentage **bounded**, and **seven** names.

**Verdict: CONFIRMED on every sub-claim, by pinned spec bytes and by two
independent browser engines.** This is the tranche's single strongest technical
finding and it survives hostile re-derivation intact.

**(a) Pinned specification bytes.** The production is *not* in css-animations-2
(that spec defers to Level 1, which carries only the three-arm form). It is in
**scroll-animations-1, Appendix A "Timeline Ranges" → "Named Timeline Range
Keyframe Selectors"**. At the tranche's own pinned corpus commit
`c7573530343759ace8e46438a1fa2c44515b5554`, the bikeshed source reads, verbatim:

```
scroll-animations-1/Overview.bs:1337   <pre class="prod">
scroll-animations-1/Overview.bs:1338     <<keyframe-selector>> = from | to | <<percentage [0,100]>> | <<timeline-range-name>> <<percentage>>
scroll-animations-1/Overview.bs:1339   </pre>
```

The asymmetry is *typographic and normative*: the third arm carries the range
annotation `[0,100]`; the fourth arm's `<percentage>` carries **no** range
annotation and **no** `?` optionality marker. Mandatory. Unbounded. The
surrounding prose (rendered line 2675–2676) confirms the semantics: "the
`<percentage>` after it represents the percentage progress between the start and
end of that named timeline range."

The contrast case is in the same appendix — `animation-range-start` is
`[ normal | <length-percentage> | <timeline-range-name> <length-percentage>? ]#`
(rendered scroll-animations-1 line 2958, repeated 3005/3023/3070/3774/3784).
There the `?` **is** present. So the spec deliberately makes the percentage
optional on the *property* and mandatory on the *keyframe selector*. Any
implementation that shares one production between the two surfaces is wrong.

**Note on method:** my first pass used WebFetch's summarizer against the same
URL. It returned *"The percentage following the range name is **optional** (not
required)… The percentage is **unbounded**"* — half right, half hallucinated,
almost certainly by bleeding the `animation-range-start` grammar into the
keyframe-selector answer. I discarded it and went to literal bytes. Adjudicators
should treat any summarizer-sourced spec claim in this tranche as unproven.

**(b) The seven names.** scroll-animations-1 §3.1 "View Progress Timeline
Ranges" — "View progress timelines define the following named timeline ranges" —
enumerates exactly seven `<dfn>`s (rendered lines 1916, 1932, 1962, 1975, 1988,
2005, 2022): `cover`, `contain`, `entry`, `exit`, `entry-crossing`,
`exit-crossing`, `scroll`. E14 is exact.

**(c) Browser witness — 36 selectors × 3 engines.** Verbatim output:

```
### chromium 148.0.7778.96
true  "from"                 keyText="0%"
true  "to"                   keyText="100%"
false "-10%"                 keyText=null          <- bare percentage BOUNDED
false "120%"                 keyText=null          <- bare percentage BOUNDED
false "entry"                keyText=null          <- percentage MANDATORY
false "cover"                keyText=null
false "scroll"               keyText=null
false "entry-crossing"       keyText=null
false "exit-crossing"        keyText=null
true  "entry 150%"           keyText="entry 150%"  <- named percentage UNBOUNDED
true  "entry -50%"           keyText="entry -50%"  <- UNBOUNDED, signed
true  "entry 1000%"          keyText="entry 1000%"
true  "cover 200%"           keyText="cover 200%"
true  "scroll 50%"           keyText="scroll 50%"       <- 7th name accepted
true  "entry-crossing 25%"   keyText="entry-crossing 25%"
true  "exit-crossing 25%"    keyText="exit-crossing 25%"
true  "ENTRY 50%"            keyText="entry 50%"        <- ASCII case-insensitive
false "entry50%"             keyText=null               <- whitespace required
false "bogus 50%"            keyText=null               <- name set is CLOSED
false "entry 50"             keyText=null               <- must be <percentage>
false "entry 50px"           keyText=null
true  "0%, 50%"              keyText="0%, 50%"
true  "entry 0%, exit 100%"  keyText="entry 0%, exit 100%"
true  "from, entry 50%"      keyText="0%, entry 50%"    <- arms mix in one list
```

WebKit 26.4 is identical modulo `keyText` serialization whitespace
(`"0%,50%"` vs `"0%, 50%"`). **Firefox 150.0.2 rejects every timeline-range
arm** — it implements only the three Level-1 arms. That is an interop gap the
tranche never records; a differential harness that uses Firefox as an oracle for
this feature would produce false defects.

**(d) The asymmetry, double-witnessed.** The same three engines, on
`animation-range-start`:

```
### chromium 148.0.7778.96          ### webkit 26.4 (identical)
true  "entry"          specified="entry"      <- OPTIONAL on the property
true  "entry 0%"       specified="entry"      <- 0% is the start default
true  "entry 150%"     specified="entry 150%" <- unbounded here too
true  "scroll 50%"     specified="scroll 50%"
false "bogus"          specified=""
```

`entry` alone is **valid** as a property value and **invalid** as a keyframe
selector, in both engines. The asymmetry the tranche asserts is not a reading of
the grammar — it is observable behaviour.

**Consequence:** E13, E14, E04 stand as `ACCEPTED_FACT`. I am upgrading their
evidentiary basis from "handoff prose" to "pinned spec bytes + 3-engine CSSOM
witness", which is what the evidence law requires and what the tranche had not
supplied.

---

### O4-02 — R1 is REPRODUCED and STILL LIVE in 4.0.0, in `src/` **and** in the built `dist/`. `CONFIRMED` · BLOCKER

**Claim under test** (prior memory; GATE-VERDICT.md F-2): "live
`parseCssColor(\"oklch()\")` shipping crash."

**Exact repro (src, HEAD):**

```
$ npx vite-node scratchpad/r1.mjs
THROW "oklch()" => TypeError: Cannot read properties of undefined (reading 'replace')
THROW "rgb()"   => TypeError: Cannot read properties of undefined (reading 'replace')
THROW "lab()"   => TypeError: Cannot read properties of undefined (reading 'replace')
THROW "hsl()"   => TypeError: Cannot read properties of undefined (reading 'replace')
THROW "color()" => TypeError: Cannot read properties of undefined (reading 'replace')
THROW "oklch( )"=> TypeError: Cannot read properties of undefined (reading 'replace')
OK   "oklch(1)"          => fail:"css_syntax"
OK   "oklch(0.5 0.1 200)"=> ok:{"space":"oklch",...}
```

**Stack, unedited:**

```
TypeError: Cannot read properties of undefined (reading 'replace')
    at parseFunctionalColor (/Users/mkbabb/Programming/value.js/src/css/grammar.ts:181:48)
    at parseCssColor (/Users/mkbabb/Programming/value.js/src/css/grammar.ts:280:19)
```

**Exact defective byte — `src/css/grammar.ts:181`:**

```ts
const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
```

The `!` non-null assertion on `slash[0]` is false whenever `splitTopLevel("", "/")`
returns an empty array, i.e. for every empty functional-colour body.

**It is live in the shipped artifact, not only in source.** Against the built
`dist/subpaths/css.js` — the exact module the parser-proof harness names as its
`live` engine:

```
$ node -e "import('/…/dist/subpaths/css.js').then(m=>{try{m.parseCssColor('oklch()')}catch(e){console.log('THROWS:',e.constructor.name,e.message)}})"
dist parseCssColor("oklch()") THROWS: TypeError Cannot read properties of undefined (reading 'replace')
```

**It is on a user-input path.** `demo/color-session/picker-color.ts:110`:

```ts
export function parsePickerColor(source: string): CssColor {
    const result = parseCssColor(source.trim());
```

That is the colour-picker's text field. The GATE-VERDICT's mitigation — "no
known consumer feeds the crash shape (kf's 37 seams verified — none constructs
empty functional colors)" — is **true of `keyframes.js` and false of the demo**:
`keyframes.js` never constructs `oklch()`, but a human typing into the picker
does, and `parsePickerColor` has no try/catch around `parseCssColor` (only a
`PickerColorError` thrown on a clean `ok:false`). The mitigation surveys the
wrong consumer set.

**Verdict:** R1 `CONFIRMED`, still live in 4.0.0, in both source and dist, on a
reachable user path. FINDINGS **E01** ("empty functional color must return clean
failure, not throw", `ACCEPTED_FACT`) and **G01** ("every public CSS entry must
be no-throw on arbitrary input") are therefore correct laws that the shipping
library violates. Browser corroboration that `oklch()` *is* merely invalid and
not exceptional: `CSS.supports("color","oklch()") === false` in Chromium 148.

---

### O4-03 — The shipping keyframe-selector parser violates the four-arm grammar in **three** independent ways. `CONFIRMED` · MAJOR

`src/css/grammar.ts:405–426` is the whole of `parseKeyframeSelector`. Line 418:

```ts
const named = input.match(/^(entry|exit|cover|contain)(?:\s+([+-]?(?:\d+\.?\d*|\.\d+))%)?$/i);
```

and lines 423–425:

```ts
return Number.isFinite(offset) && offset >= 0 && offset <= 1
    ? success({ kind: "named", name, offset })
    : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
```

Three defects, each contradicting a `FINDINGS` `ACCEPTED_FACT`:

| # | defect | byte | contradicts |
|---|---|---|---|
| 1 | only **4** of 7 names (`entry\|exit\|cover\|contain`) — no `scroll`, `entry-crossing`, `exit-crossing` | grammar.ts:418 | E14 |
| 2 | percentage is **optional** (`(?:…)?`) — bare `entry` accepted | grammar.ts:418 | E13 |
| 3 | named percentage is **bounded** `[0,1]` after `/100` | grammar.ts:423 | E13 |

**Executed differential — live `dist` vs Chromium 148 / WebKit 26.4:**

| selector | Chromium | WebKit | value.js 4.0.0 | class |
|---|:--:|:--:|:--:|---|
| `entry 50%` | ✓ | ✓ | ✓ | agree |
| `scroll 50%` | ✓ | ✓ | ✗ | **false reject** |
| `entry-crossing 25%` | ✓ | ✓ | ✗ | **false reject** |
| `exit-crossing 25%` | ✓ | ✓ | ✗ | **false reject** |
| `entry 150%` | ✓ | ✓ | ✗ | **false reject** (bounded vs unbounded) |
| `entry -50%` | ✓ | ✓ | ✗ | **false reject** |
| `cover 200%` | ✓ | ✓ | ✗ | **false reject** |
| `entry` (bare) | ✗ | ✗ | ✓ | **false ACCEPT** |
| `cover` / `exit` / `contain` (bare) | ✗ | ✗ | ✓ | **false ACCEPT** |
| `120%` / `-10%` | ✗ | ✗ | ✗ | agree (bare bound correct) |

End-to-end through `parseStylesheet` the same defects propagate
(`@keyframes k { scroll 50% { … } }` → `keyframe_selector_invalid`;
`@keyframes k { entry { … } }` → accepted).

`KeyframeSelector`'s **type** encodes defect 1 permanently:

```
src/css/types.ts:44   | Readonly<{ kind: "named"; name: "entry" | "exit" | "cover" | "contain"; offset?: number }>;
```

so `scroll`/`entry-crossing`/`exit-crossing` are unrepresentable, and `offset?`
makes the mandatory percentage optional at the type level. Any V·π mirror that
must satisfy the frozen 52-export contract *and* the spec must therefore break
this exported type — a compatibility/correctness collision the tranche has not
booked. `FEATURE-LEDGER.md:112` gestures at it (`KF-SELECTOR-PUBLIC-COMPAT`) but
does not record that the *type* is the blocker.

---

### O4-04 — Timeline-range names have **three** mutually inconsistent owners inside shipping `src/css`. `CONFIRMED` · MAJOR

This is the concrete, in-production instance of the ownership defect **E16** and
**C07** legislate against. Three separate enumerations, none matching the spec's
seven:

```
src/css/grammar.ts:418   /^(entry|exit|cover|contain)…/i            (4 names, in a regex)
src/css/types.ts:44      "entry" | "exit" | "cover" | "contain"     (4 names, in the public type)
src/css/types.ts:85-87   "normal" | "cover" | "contain" | "entry" | "exit" | "entry-crossing" | "exit-crossing"
src/css/timeline.ts:53   new Set<RangePhase>([… same 7 strings …])  (6 names + the keyword `normal`)
```

`RangePhase` mixes the *keyword* `normal` — which is an `animation-range-start`
initial value, **not** a `<timeline-range-name>` — into the same enumeration as
the range names, and omits `scroll`. Measured consequence:

```
$ parseAnimationRange(...)  [live dist]
true   "entry-crossing"      {"start":{"phase":"entry-crossing"}}
false  "scroll"              REJECT      <- Chromium/WebKit: VALID
false  "scroll 50%"          REJECT      <- Chromium/WebKit: VALID
true   "entry 150%"          {"start":{"phase":"entry","offset":"150%"}}
```

So the *property* path correctly permits unbounded offsets and 6 names, while
the *keyframe* path permits 4 names and bounds them — the exact split-brain that
a single `values/timeline-range` owner would prevent. **E16 is not a style
preference; it is a defect the shipping code already exhibits.**

---

### O4-05 — "Comma-list composition belongs above the singular selector" is CORRECT, witnessed, and already realized in shipping `src/`. `CONFIRMED` · INFO

**Spec:** css-animations-1 defines the keyframe block prelude as a
comma-separated list of `<keyframe-selector>`; scroll-animations-1 extends the
*singular* production only (Overview.bs:1338 defines
`<<keyframe-selector>>`, not a list).

**Browser witness:** `keyText` round-trips a *mixed* list —
`"from, entry 50%"` → `"0%, entry 50%"` in Chromium, `"0%,entry 50%"` in WebKit.
A list whose members are drawn from different arms proves composition sits
above the arm alternation, not inside it.

**Shipping code already does this correctly** —
`src/css/stylesheet.ts:490–494`:

```ts
for (const token of splitTopLevel(row.prelude, ",")) {
    const selector = parseKeyframeSelector(token);
```

The list is split by the *caller*; `parseKeyframeSelector` is strictly singular
and rejects `"0%, 50%"` on its own. **E15 `ACCEPTED_FACT` confirmed.** I note
for the ledger that E15 is therefore *not a discovery* — it describes existing
`src/` architecture — and it is contradicted only by the **BBNF** grammar (see
O4-08), not by value.js.

---

### O4-06 — "52 exports" is the `/css` door, not the public surface. The handoff's own summaries overstate it. `PARTIALLY_TRUE` · MAJOR

**Mechanical census of the actual public surface of value.js 4.0.0** (from
`package.json` `exports` + `src/subpaths/*.ts`, counted by parsing the export
blocks):

```
color.ts       runtime=23 type=11
css.ts         runtime=19 type=33      <- 19+33 = 52
easing.ts      runtime=16 type=5
math.ts        runtime=9  type=0
quantize.ts    runtime=2  type=3
transform.ts   runtime=9  type=6
value.ts       runtime=1  type=4
TOTAL          runtime=79 type=62  sum=141   across SEVEN subpath doors
```

Cross-checked against the repo's own CI gate `scripts/ci/verify-packed-surface.mjs`,
whose hard-coded `expected` map lists exactly 79 runtime names over 7 doors and
prints `strictTypes: 62`. There is **no root export**; `@mkbabb/value.js`,
`/parsing`, and `/units` are asserted to be non-resolvable.

**So:** "52 exports" is exactly correct for `src/css/index.ts` (I counted 19
runtime + 33 type there too; `CHARTER.md:38` and `W0-STRUCTURAL-CHECK.md:102`
define it that way). It is **wrong** as a statement about value.js's public
census, which is 141 over 7 doors — 2.7× larger.

Two places state it the wrong way:
- `ADDENDA-08.md:213` — "The frozen **public census** is 52 exports and 37
  consumer symbols." The public census is 141.
- `HANDOFF-2026-07-24.md:91` — "The 52-export **surface**" (used unqualified as
  *the* compatibility invariant).

**Two substantive consequences, not mere pedantry:**

1. **The 52 are not type-closed.** `parseCssValue: ParseResult<CssValue>`
   (`grammar.ts:393`), `parseCssValues: ParseResult<CssList>` (`:397`),
   `parseCssScalar: ParseResult<CssScalar>` (`:334`). `CssValue`, `CssList`,
   `CssScalar` are **not** among the 33 types of `/css` — they are exported only
   from `/value` (`src/subpaths/value.ts`). A consumer cannot type the return of
   three of the 19 runtime exports without a second door. A "compatibility
   invariant" that cannot be typed from its own door is under-specified.
2. **The real consumer obligation is 63 symbols over 6 doors, not 37 over 1.**
   Census of `/Users/mkbabb/Programming/keyframes-v-exec/src/**`:

```
@mkbabb/value.js/css        37   <- the "37 consumer symbols", EXACTLY reproduced
@mkbabb/value.js/easing      9
@mkbabb/value.js/color       7
@mkbabb/value.js/value       5   (CssCall CssList CssScalar CssValue isLayoutTrackingUnit)
@mkbabb/value.js/math        4
@mkbabb/value.js/transform   1
TOTAL distinct symbols = 63
```

   The **37** is a machine fact — confirmed to the unit, and all 37 are within
   the 52, so GATE-VERDICT F-3's "zero orphan imports" holds for `/css`. But a
   V·π mirror that satisfies "52-export/37-consumer" and nothing else still
   breaks **26** live `keyframes.js` imports, including the three `/value` types
   that are the `/css` parsers' own return types.

**Judgement on the handoff's claim that the 52 "is only a compatibility
invariant" and not the denominator:** the *direction* is right and I confirm it
in O4-07 with numbers. But the framing is doubly imprecise — the invariant is
mis-sized (52 → really 63 across 6 doors for the one real consumer), and
`CHARTER.md:38` simultaneously uses the same 52 as a **gate denominator**
("G-1 coverage: all 52 exports … TOTAL"), which is precisely the role §3.2
denies it. The tranche uses one number in two incompatible roles.

---

### O4-07 — The real denominator, measured. My estimate: **883** grammar obligations in the tranche's own 76-root seed; **1,333** in the full pinned universe; **304** in a value/keyframes-scoped slice. `CONFIRMED (own measurement)` · MAJOR

The tranche's own denominator authority declares itself empty:
`FEATURE-LEDGER.md:309` — the source-lock "currently yields zero … zero sealed
feature rows"; `denominator/README.md` — "**BORN-RED** formation tooling; no
denominator or parser credit"; HANDOFF inventory row — "denominator V1–V9 …
research-only; zero normative ledger credit". Nine generations produced no
number. I produced one in under an hour. Here is the method, so it can be
attacked.

**Step 1 — verify the pin (this is the part V1–V9 got right).**

```
$ gh api repos/w3c/csswg-drafts/commits/c7573530343759ace8e46438a1fa2c44515b5554
{"date":"2026-07-17T20:42:40Z",
 "sha":"c7573530343759ace8e46438a1fa2c44515b5554",
 "tree":"75bf19c016ed98126381508073de6893c9f756f5"}
```

Both the commit and the tree OID match `source-universe.json` exactly.

**Step 2 — independently recount the universe.** From the recursive tree
(3,608 entries, `truncated:false`), applying the recorded selection rule
("Overview.bs, else Overview.src.html, else Overview.html", one per top-level
directory):

```
top-level directories        = 176
depth-2 Overview blobs       = 181
directories with ≥1 Overview = 168
universe per the stated rule = 168
```

Then a full cross-check against the tranche's 168 rows:

```
mine 168  theirs 168
dirs only in mine: []      dirs only in theirs: []
path disagreements: 0
blob oid mismatches: 0
seed count 76
```

And a byte-level fetch of **all 168** sources with size + SHA-256 verification:

```
fetched 168  hash+size OK: 168  BAD: []
```

**→ H01 is a MACHINE FACT.** 168 sources / 76 seed / 92 `UNCLASSIFIED_RED` at
the pinned tree, every path, every blob OID, every SHA-256, independently
reproduced. This is the one artifact in the entire denominator effort that
deserves credit, and it is exactly what `H01` claims. Everything downstream of it
in `denominator/` is, as the tranche itself says, zero.

**Step 3 — my denominator method (stated so it can be refuted).** A parser's
obligation is *grammar productions it must recognise*, not specs it must read.
From bikeshed source I count three carrier classes:

- **P (named grammar productions)** — a definition of the form
  `NAME = …` where NAME is `<<foo>>`/`&lt;foo&gt;`/`<'prop'>`/`func()`,
  taken from inside `<pre class=prod>` blocks **union** any
  `<dfn …>NAME</dfn> =` elsewhere in the source.
- **R (properties)** — `Name:` lines inside `<pre class=propdef>` blocks,
  comma-split for grouped definitions.
- **D (descriptors)** — `Name:` lines inside `<pre class=descdef>` blocks.

Denominator := |P ∪ R ∪ D| deduplicated **across** specs (so a property redefined
at Level 4 and Level 5 counts once).

**Known biases, stated:** (i) 12 of 168 sources are legacy `.src.html`/`.html`
without bikeshed markup — those undercount to ~0, so my numbers are a **lower
bound**; (ii) prose-only value types (`<length>` is defined in a `<dl>`, not a
`<pre class=prod>`) are missed — again a lower bound; (iii) one junk row (an
empty property name) survives in the complement set, so subtract 1; (iv) this
counts *recognition* obligations, not the ~30 named algorithms of css-syntax-3
(tokenizer, component-value parsing, error recovery), which are additional.

**Step 4 — results.**

```
                prods   props   descs    SUM
76-root seed      410     401      72     883
92 complement     174     464      21     659
union (168)       544     700      89   1,333
complement-ONLY   134     299      17     450   (new obligations the seed omits)
```

Value/keyframes-scoped slice — the 19 specs a `/css`-door parser actually needs
(css-syntax-3, css-values-4/5, css-color-4/5, css-color-hdr-1, css-easing-1/2,
css-animations-1/2, scroll-animations-1, animation-triggers-1, css-variables-2,
css-mixins-1, css-images-3/4, css-cascade-5, css-conditional-5,
css-transforms-2):

```
UNIQUE TOTAL  prod=228  prop=61  desc=15   SUM=304
```

**Step 5 — what the numbers say.**

- **52 : 304 : 883 : 1,333.** The frozen compatibility surface is ~5.9% of even
  the narrow value/keyframes obligation set and ~3.9% of the seed. The handoff's
  A03 / §3.2 direction is **confirmed** — with a magnitude the tranche never
  supplied.
- **H02 is not merely "unratified" — the seed is demonstrably under-inclusive by
  ~34%.** Adopting the 76-root seed as the denominator silently drops **450**
  distinct obligations (134 productions + 299 properties + 17 descriptors).
- **A concrete, byte-level refutation of the seed.** `css-mixins-1` — the spec
  that defines `@function` (`all/css-mixins-1.src:198` — "The `<dfn>@function</dfn>`
  Rule") — is marked `root_seed_membership: false`, i.e. `UNCLASSIFIED_RED`. But
  the **frozen 52-export surface already parses `@function` today**:

```
src/css/stylesheet.ts:599   const match = source.match(/^@function\s+(--[-\w]+)\s*\(([\s\S]*)\)$/i);
src/css/stylesheet.ts:676   if (lower.startsWith("@function ")) {
```

  and exports `CustomFunctionRule`, `CustomFunctionDescriptor`,
  `CustomFunctionParameter`, `collectCustomFunctions` — three of which
  `keyframes.js` imports. **The compatibility ring is not a subset of the
  proposed language ring.** The same holds for `animation-range-center`
  (`pointer-animations-1`, complement) and `css-color-hdr-1` (complement).
  Any denominator that excludes a spec the shipping surface already implements
  is falsified on its face, before any ratification question arises.

**Step 6 — reconciliation with "coverage RED 0-of-52 TOTAL".** That figure
(`GATE-VERDICT.md` P-2; `coverage.md`) is *not* a denominator statement and
should never be quoted as one. `coverage.md:8–33` is explicit: it measures a
throwaway three-function assay tree (`c14-css/src/css/api.ts`, exporting only
`parseColor`/`parseEasing`/`parseStylesheet`) against the frozen contract, and
it says so — "It is **not** a claim that value.js 4.0.0 is missing exports."
The 0/3/16 + 33-types-absent split is an honest self-report of a W0 pilot's
distance, and the RED is correct. Two integrity notes: the capture directory
`/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css` **still exists**
on disk (I checked — not a missing declared capture), and the arithmetic
"1607 lines backing the 52 exports" is exact (483+899+124+101 = 1607; I
re-ran `wc -l`).

---

### O4-08 — BBNF: D01, D02, D03 all CONFIRMED, and D03 is materially **understated**. `CONFIRMED` · MAJOR

Read-only, from the acknowledged HEAD. `git -C /Users/mkbabb/Programming/bbnf-lang log -1`
→ `af15f63e0d2d3d719938c13b906a50acbb92ea3b`, exactly the handoff's
"BBNF acknowledged HEAD". I used `git show af15f63e:grammar/css/l4/*.bbnf` — no
worktree read, no snapshot, no message, dirty tree untouched (respecting D11 and
the no-contact boundary).

**D01 — fifteen modules, 276 declarations. `CONFIRMED to the unit.`**

```
color 19 · easing 6 · filters 12 · func-body 18 · gradients 19 · keyframes 18
keywords 14 · media 13 · properties 44 · selectors 34 · stylesheet 14
tokens 3 · transforms 23 · value-unit 23 · values 16
TOTAL decls = 276    (15 files)
```

**D02 — "registered stylesheet reaches nine; six siblings are disconnected."
`CONFIRMED EXACTLY.`** Import closure from `stylesheet.bbnf` (comment lines
excluded — `value-unit.bbnf` contains a commented `// Usage: @import "value-unit.bbnf" ;`
that a naive extractor reads as a self-cycle; I excluded it and confirmed the
graph is acyclic):

```
reachable (9): color func-body keywords media properties selectors stylesheet tokens value-unit
UNREACHABLE (6): easing filters gradients keyframes transforms values
cycles: []
```

The severity here is larger than the row states: the unreachable set includes
**`values`** — the very hub the proposed `MODULE-DAG` makes the centre of the
graph (`properties -> values -> {color,easing,gradients,transforms,filters}`).
In committed BBNF, `values.bbnf` imports six modules and **nothing imports it**.
The entire value sub-lattice is dead code relative to the registered root.

**D03 — "no duplicated owners" is `REJECTED`; the tranche named 2 families,
there are at least 6, spanning 17 names.** Declaration names appearing in more
than one module:

```
func-body ∥ values (11): calcFunction clampFunction dashed envFunction mathExpr
                          mathProduct mathValue maxFunction minFunction
                          urlFunction varFallback varFunction
properties ∥ values (2): dimension value
properties ∥ tokens (1): ident
func-body ∥ tokens (1): string
keywords  ∥ values (1): globalKeyword
```

That is the *name-identical* duplication only. There is a second, larger class
the tranche's row does not capture: **`keyframes.bbnf` carries an entire private
UPPERCASE shadow token/value/declaration layer** — `IDENT`, `STRING`, `HASH`,
`DIMENSION`, `UNICODE_RANGE`, `FUNCTION`, `PROPERTY_VALUE`, `PROPERTY_NAME`,
`DECLARATION`, `DECLARATIONS_LIST`, `IMPORTANT_SYM`, `VENDOR_PREFIX` — 12
productions duplicating `tokens`/`value-unit`/`properties` under a different
spelling, invisible to any name-collision check.

**D03's "stylesheet/keyframes duplicate families" — `CONFIRMED`, semantically.**
Two independent, divergent keyframe grammars exist:

```
stylesheet.bbnf:   keyframeStop = /\d+(\.\d+)?%/ -> 0u8 | "from" -> 1u8 | "to" -> 2u8 ;
                   keyframeSel  = keyframeStop , (/\s*,\s*/ >> keyframeStop) * ;
                   keyframeBlock / keyframesRule
keyframes.bbnf:    FROM_TO_KEYWORD   = "from" -> 0u8 | "to" -> 1u8 ;
                   KEYFRAME_SELECTOR = percentage | FROM_TO_KEYWORD | (percentage , ("," ?w >> percentage) +) ;
                   KEYFRAME_BLOCK / KEYFRAME_BLOCKS / KEYFRAMES_RULE
```

Reachable from the registered root is the *inferior* copy (`stylesheet.bbnf`);
the dedicated `keyframes.bbnf` is unreachable.

**E17 — "current BBNF keyframe owners already implement E13–E16" — `REJECTED`,
CONFIRMED, plus two defects the tranche did not name.** Against the four-arm
grammar:

| obligation | `stylesheet.bbnf` | `keyframes.bbnf` |
|---|---|---|
| `<timeline-range-name> <percentage>` arm | absent | absent |
| bare percentage bounded `[0,100]` | absent (`/\d+(\.\d+)?%/` accepts `999%`) | absent |
| signed / decimal-leading percentages | `.5%` rejected | via `percentage` |
| comma-list **above** the singular selector | correct (`keyframeSel` composes `keyframeStop`) | **VIOLATED** — the list is the third alternative *inside* `KEYFRAME_SELECTOR` |
| reachable ordered choice | n/a | **DEAD ARM** — `percentage \| FROM_TO \| (percentage , …)+`: PEG ordered choice matches alternative 1 first, so the comma-list alternative is unreachable for any input beginning with a percentage |

The last two are mine, not the tranche's. E15's "composition above the singular
selector" is violated by BBNF and satisfied by value.js — the opposite of the
direction the tranche's coordination narrative implies.

---

### O4-09 — `MODULE-DAG.md`: reachable and acyclic (D04 confirmed) — but it is **16** nodes, it contradicts itself on `timeline-range`'s home, it mis-assigns the bare keyframe percentage, and it cannot host ≥6 of the 19 frozen runtime exports. `PARTIALLY_TRUE` · MAJOR

**D04 — "the proposed corrected DAG is reachable and acyclic." `CONFIRMED`,
mechanically.** Transcribing MODULE-DAG.md:9–66 verbatim into a graph:

```
DAG nodes: 16
DAG reachable from stylesheet: 16
DAG unreachable: []
DAG cycles: []
```

**Arithmetic correction (MINOR).** My brief called it a "15-trunk proposal"; the
document proposes **16** families — BBNF's 15 plus the new `timeline-range`.
`MODULE-DAG.md:124` ("The fifteen acknowledged BBNF families are trunks") is
about BBNF, not about this graph. Any downstream count of "15" for the proposed
DAG is off by one.

**Self-contradiction on `timeline-range`'s home (MAJOR).** The document says all
three of these:

```
:26   timeline-range (ledger-derived submodule under values)
:62   keyframes -> tokens, properties, timeline-range
:115  `timeline-range` is the shared semantic owner below `values`
```

If `timeline-range` is a *submodule under* `values`, then `keyframes ->
timeline-range` is an import through `values`'s interior — an encapsulation
breach. If it is a peer trunk, the "submodule under values" gloss and E16's
spelling "**values/**timeline-range is the sole owner" are wrong. The two
consumers also reach the owner by asymmetric paths: `keyframes` imports it
directly; `properties` reaches it only transitively via `values`
(`properties -> tokens, keywords, values`). Under the DAG as drawn, `values`
must re-export the timeline-range productions for `properties` to see them,
which reintroduces a second exporter by the back door. **This is unresolved and
it is the exact subject of E16.** It needs an adjudication, not another
invariant sentence.

**Mis-assigned ownership (MAJOR).** MODULE-DAG.md:79–92 puts
`bare-keyframe-percentage = <percentage [0,100]>` in the same ownership block as
the timeline-range productions and then states "keyframes consumes
timeline-range-name **and both percentage productions** from the sole
`values/timeline-range` owner." But `bare-keyframe-percentage` is a
css-animations-**1** production with no relation to timeline ranges; it predates
scroll-driven animations entirely. Assigning it to `timeline-range` makes that
module own a non-timeline production, which violates the document's own
invariant 2 ("Contextually distinct CSS productions are not collapsed merely
because their terminal spellings or regexes resemble one another") — the two
percentages differ in bound *and* in provenance, and the document itself says so
one line later ("The two percentage domains remain distinct").

**Disconnected families — the DAG cannot host the frozen surface it must satisfy
(MAJOR).** `CHARTER.md:38` requires "**all 52 exports … TOTAL**". Mapping the 19
runtime `/css` exports onto the 16 nodes:

| export | DAG owner |
|---|---|
| parseCssColor, serializeCssColor | `color` ✓ |
| parseCssScalar | `value-unit` ✓ |
| parseCssValue, parseCssValues | `values` ✓ |
| parseKeyframeSelector, collectKeyframes | `keyframes` / `timeline-range` ✓ |
| parseTimingFunction | `easing` ✓ |
| parseAnimationRange | `timeline-range` ✓ |
| collectDeclarations, collectAnimationOptions | `properties` ✓ |
| collectStyleRules, parseStylesheet | `stylesheet` ✓ |
| **coerceToSyntax** (`@property` syntax strings) | **none** |
| **collectPropertyDescriptors** (`@property`) | **none** |
| **collectCustomFunctions** (`@function`, css-mixins-1) | **none** |
| **parseAnimationTimeline** (`scroll()`/`view()` notation) | **none** |
| **serializeTimelineOptions** (serialization) | **none** |
| **collectTimelineOptions** (timeline descriptor properties) | partial |

**≥6 of 19 runtime exports have no home in the 16-node DAG**, and the tree also
already parses `@scope` and `@starting-style` (`stylesheet.ts:691–695`) with no
at-rule/descriptor/custom-property/recovery node anywhere in the graph. The
document's §"Denominator reminder" (:122–129) admits this in prose — it lists 14
further module families still needed — but the graph is nonetheless being carried
forward as "terminally acknowledged production-family ownership"
(HANDOFF-2026-07-24.md:20). **A structural ACK of a graph that cannot host the
mandatory compatibility surface is not the same as a usable module lattice**,
and D05 ("that DAG ACK grants implementation or conformance credit" →
`REJECTED_CLAIM`) is therefore not just correct but load-bearing.

---

### O4-10 — The parser-proof equivalence gate is **vacuous on exactly the arm where the mirror is provably wrong**, and two of its `liveOk` receipts are FALSE. `CONFIRMED` · BLOCKER

This is the most serious integrity finding in my lens. It is a
green-over-broken + self-asserted-JSON-receipt compound.

**(a) The mirror reproduces the live keyframe defects verbatim.** The
pre-reset mirror's keyframe selector — `mirror/grammar/keyframe-selector.ts`, 75
lines — is a faithful bug-compatible port of `src/css/grammar.ts`:

```ts
// mirror/grammar/keyframe-selector.ts:26-28
const named = select(identToken, (token) => {
    const name = String(token.value).toLowerCase();
    return name === "entry" || name === "exit" || name === "cover" || name === "contain" ? name : undefined;
}).then(gap.next(percentValue).opt()).chain(([name, offset]) => {
    if (offset !== undefined && (offset < 0 || offset > 100)) return new Parser<KeyframeSelector>((state) => state.err(undefined));
```

Four names, `.opt()` on the percentage, `0..100` bound. All three defects of
O4-03, carried into the artifact whose entire premise (GATE-VERDICT F-2) is
"**In all five, C14 is the spec-correct engine.**" On the keyframe-selector arm,
the mirror is exactly as wrong as live.

**(b) The gate is constructed so this cannot fail.**
`equivalence-results.json` has 403 rows, `"gate": "GREEN"`, and

```
"gateDefinition": "GREEN iff zero DIVERGENT_VALUE + zero MIS_ACCEPT +
                   zero FALSE_REJECT_IN_SHAPE on the frozen-surface subset."
```

All **22** rows with `"door": "keyframe-selector"` are classified
`OUT_OF_SCOPE` with `"note": "no C14 door for this construct"`, and the tally
books 142 of 403 rows (35%) as `OUT_OF_SCOPE`. The exact inputs that expose the
bounded/unbounded asymmetry are among them:

```
id  source        liveOk  c14Ok  verdict
104 101%          true    false  OUT_OF_SCOPE
209 entry 0%      true    false  OUT_OF_SCOPE
210 entry 50%     true    false  OUT_OF_SCOPE
212 exit 100%     true    false  OUT_OF_SCOPE
213 exit 101%     true    false  OUT_OF_SCOPE
142 @scope { @keyframes fade { entry 50% { opacity: 0; } } }
                  true    false  COVERAGE_NARROWING
```

Someone constructed `exit 101%` and `101%` deliberately — those are boundary
probes for exactly the E13 asymmetry. The harness then filed them in the bucket
that cannot turn the gate RED. **A gate whose failure modes are routed to
`OUT_OF_SCOPE` by the same author is not a gate.** P-1's "0 mirror-defects
GREEN" is a statement about the classification policy, not about the mirror.

**(c) Two `liveOk` receipts are demonstrably false.** The `engines` block names
`live` as `"value.js v4 — dist/subpaths/css.js"`. I ran that exact module
against all 22 keyframe-selector rows:

```
$ node -e "import('/…/dist/subpaths/css.js').then(m=>{ … })"
MISMATCH id=104 "101%"      recorded liveOk=true actual=false
MISMATCH id=213 "exit 101%" recorded liveOk=true actual=false
rows=22 liveOk mismatches=2
```

20 of 22 are right; the **2 that are wrong are precisely the two out-of-bound
probes** — the only two rows in the door whose value would have exposed the
bounded/unbounded question. `parseKeyframeSelector("101%")` returns
`ok:false, keyframe_selector_invalid` in both `src/` and `dist/`. The recorded
`true` is not reproducible. Per the tranche's own G03 law ("self-authored JSON
can prove independent review/custody" → `REJECTED_CLAIM`), these rows carry no
authority; I go further and say they are *affirmatively false*, and their
falseness is non-random.

Note also that `engines.live` lists only
`parseCssColor/parseTimingFunction/parseStylesheet + collect*` — `parseKeyframeSelector`
is not in the declared live door list at all, so it is unclear the 22 rows were
measured against anything.

---

### O4-11 — Four further live spec violations, all one mechanism: `String.replace(/,/g," ")`. `CONFIRMED` · MAJOR

Executed differential, `dist/subpaths/css.js` vs Chromium 148 `CSS.supports`:

| input | Chromium | value.js 4.0.0 | FINDINGS row |
|---|:--:|:--:|---|
| `rgb(1,2,3)` (legacy) | ✓ | ✓ | E09 |
| `rgb(1 2 3)` (modern) | ✓ | ✓ | E09 |
| `rgb(1,2 3)` (**mixed**) | ✗ | **✓** | **E09 violated** |
| `rgb(1 2,3)` (**mixed**) | ✗ | **✓** | **E09 violated** |
| `rgb(1 2 3 /)` | ✗ | **✓** | **E03 violated** |
| `rgb(1 2 3 / )` | ✗ | **✓** | **E03 violated** |
| `scroll(root, block)` | ✗ | **✓** | **E10 violated** |
| `view(block, 10px)` | ✗ | **✓** | **E10 violated** |
| `entry 10` (unitless nonzero) | ✗ | **✓** | **E11 violated** |

The first eight share one root cause — the parser normalises commas to spaces
*before* component splitting, destroying the legacy/modern separator distinction
the spec depends on:

```
src/css/grammar.ts:181   splitTopLevel(slash[0]!.replace(/,/g, " "), "space")
src/css/timeline.ts:23   splitTopLevel(scroll[1]!.replace(/,/g, " "), "space")
```

(The same line 181 is the R1 crash site — one byte, two defect classes.) The
ninth is a separate byte, an optional unit group:

```
src/css/timeline.ts:16   const LENGTH_PERCENTAGE = /^auto$|^[+-]?(?:\d+\.?\d*|\.\d+)(?:%|[a-z]+)?$/i;
```

`(?:%|[a-z]+)?` makes the unit optional, so `entry 10` passes. Per css-values-4
a nonzero `<length>` requires a unit; `0` and `0px` are both valid and both
correctly accepted (Chromium agrees).

**Why this matters for the tranche:** E03/E09/E10/E11 are all filed as separate
`ACCEPTED_FACT` rows with no mechanism. They are one mechanism plus one regex.
A mirror that fixes them row-by-row will re-introduce them the moment it reuses
a comma-normalising splitter. This belongs in the ledger as **one** law:
*separator identity is semantic; never normalise commas to whitespace before
component splitting.*

---

### O4-12 — `src/parsing/grammars/*.bbnf` do NOT exist. The tree truth. `REFUTED` (the premise) · INFO

The task premise ("verify the two grammar files still exist") is false, and the
project memory that asserts them is stale by two tranches.

```
$ ls src/parsing/            → No such file or directory
$ find src -name '*.bbnf'    → (empty)
$ git ls-files | grep .bbnf  → (empty; zero tracked .bbnf in value.js)
$ find docs/tranches/V/apotheosis/pi -name '*.bbnf' → (empty)
$ grep -rn "\.bbnf\|grammars/" src/ test/ demo/ vite.config.ts → (empty)
```

**Chronology, from git:**

- `36f918d2` *"refactor(S.W0 · dead-surfaces): excise the BBNF grammars …"* —
  deleted `src/parsing/grammars/css-color.bbnf` (135 lines) and
  `css-values.bbnf` (99 lines), removed the `*.bbnf?raw` ambient declaration
  from `src/vite-env.d.ts`, and removed the `**/*.bbnf` eslint ignore. The
  commit body states the equivalence test that consumed them was retired.
- `164343c1` *"feat(v4)!: value 4.0 producer surface + packed-surface gate;
  retire pre-v4 src trees"* — removed `src/parsing/` entirely (and
  `src/units/`).

**The actual `src/` at HEAD is 26 files / ~4,654 lines:**

```
src/color/{anchors,index,model,operations}.ts
src/css/{grammar,index,named-colors,stylesheet,syntax,timeline,types}.ts
src/{easing,quantize,value,vite-env.d}.ts
src/foundation/{math,result}.ts
src/subpaths/{color,css,easing,math,quantize,transform,value}.ts
src/transform/{decompose,path}.ts
```

`src/css/grammar.ts` exists but is a **hand-written regex/split parser**, not a
BBNF-driven one and not the removed `src/parsing/grammar.ts`. **Nothing in
value.js consumes a `.bbnf` file at HEAD.** The only BBNF CSS grammars relevant
to this work live in the separate `bbnf-lang` repository at
`grammar/css/l4/*.bbnf` (15 files, 276 declarations — see O4-08). The memory
entry describing `src/parsing/grammars/` + `test/bbnf-equivalence.test.ts`
should be corrected; it currently misdirects any reader about where the grammars
are and about the size and shape of the 4.0.0 source tree.

---

## Rows of FINDINGS.md I dispositioned

Only rows within my lens. "Audited" = my verdict after independent
reproduction; it supersedes the handoff author's provisional label for these
rows or confirms it on stronger evidence.

| row | author label | **audited** | basis |
|---|---|---|---|
| A03 | `ACCEPTED_FACT` | **CONFIRMED, quantified** | 52 : 304 : 883 : 1,333 (O4-07). "52 exports are not the denominator" is right; see A03-adjacent imprecision in O4-06 |
| D01 | `ACCEPTED_FACT` | **CONFIRMED (machine fact)** | 15 modules, **276** declarations counted from `af15f63e` |
| D02 | `REJECTED_CLAIM` | **CONFIRMED** | closure = 9; unreachable = {easing, filters, gradients, keyframes, transforms, **values**} |
| D03 | `REJECTED_CLAIM` | **CONFIRMED, understated** | 17 duplicated names / 6 module pairs, + a 12-production uppercase shadow layer in `keyframes.bbnf` |
| D04 | `ACCEPTED_FACT` | **CONFIRMED** | 16 nodes, all reachable from `stylesheet`, acyclic — but see O4-09 for what that does *not* buy |
| D05 | `REJECTED_CLAIM` | **CONFIRMED, strengthened** | the ACKed DAG cannot host ≥6 of the 19 frozen runtime exports |
| D06–D10 | various | **UNVERIFIABLE in my lens** | parse-that package integrity and cross-task ACK chronology are seats 2/5 |
| D11 | `REJECTED_CLAIM` | **CONFIRMED** | I audited `af15f63e` only, via `git show`; the live worktree is out of scope by the same law |
| E01 | `ACCEPTED_FACT` | **CONFIRMED — and violated live** | `oklch()` throws (O4-02); Chromium: `CSS.supports("color","oklch()")===false` |
| E02 | `ACCEPTED_FACT` | **UNVERIFIED** | not probed; `var`/`env` deferral is seat 2's surface |
| E03 | `ACCEPTED_FACT` | **CONFIRMED — and violated live** | Chromium rejects `rgb(1 2 3 /)`; value.js accepts (O4-11) |
| E04 | `ACCEPTED_FACT` | **CONFIRMED** | spec `<percentage [0,100]>`; `-10%`/`120%` rejected in all 3 engines; value.js agrees |
| E05 | `ACCEPTED_FACT` | **UNVERIFIED** | comment-trivia; not probed |
| E06 | `OPEN` | **remains OPEN** | not probed |
| E07 | `ACCEPTED_FACT` | **UNVERIFIED** | not probed |
| E08 | `ACCEPTED_FACT` | **UNVERIFIED** | not probed |
| E09 | `ACCEPTED_FACT` | **CONFIRMED — and violated live** | mixed `rgb(1,2 3)` rejected by Chromium, accepted by value.js (O4-11) |
| E10 | `ACCEPTED_FACT` | **CONFIRMED — and violated live** | `scroll(root, block)`/`view(block, 10px)` rejected by Chromium, accepted by value.js |
| E11 | `ACCEPTED_FACT` | **CONFIRMED — and violated live** | `entry 10` rejected by Chromium, accepted by value.js |
| E12 | `ACCEPTED_FACT` | **UNVERIFIED** | policy claim; not a probeable semantic |
| E13 | `ACCEPTED_FACT` | **CONFIRMED (spec bytes + 2-engine witness)** | scroll-animations-1/Overview.bs:1338; `entry` invalid, `entry 150%` valid |
| E14 | `ACCEPTED_FACT` | **CONFIRMED** | scroll-animations-1 §3.1 defines exactly the 7; `bogus 50%` rejected → closed set |
| E15 | `ACCEPTED_FACT` | **CONFIRMED — but not a discovery** | already realized at `stylesheet.ts:490`; violated by BBNF `keyframes.bbnf`, not by value.js |
| E16 | `ACCEPTED_FACT` | **CONFIRMED as a law; the DAG does not yet satisfy it** | 3 inconsistent owners in shipping `src` (O4-04); `MODULE-DAG` self-contradicts on where the owner lives (O4-09) |
| E17 | `REJECTED_CLAIM` | **CONFIRMED, + 2 new defects** | neither BBNF keyframe owner has the 4th arm or the `[0,100]` bound; `keyframes.bbnf` embeds the list inside the singular selector **and** has an unreachable ordered-choice arm |
| F10 | `ACCEPTED_FACT` (exact subject) | **UNVERIFIED for G4** | I produced my own 3-engine witness for keyframes; I did not replay G4's |
| F15 | `REJECTED_CLAIM` | **CONFIRMED, with a caveat** | no G0 candidate; but a keyframe parser **does** exist on disk at `mirror/grammar/keyframe-selector.ts` (pre-reset), and it is spec-wrong in all 3 ways — unbooked |
| G01 | `ACCEPTED_FACT` | **CONFIRMED as law; violated by shipping** | R1 (O4-02) |
| G03 | `REJECTED_CLAIM` | **CONFIRMED, with a live instance** | 2 false `liveOk` values in `equivalence-results.json` (O4-10) |
| G10 | `ACCEPTED_FACT` | **CONFIRMED, extended** | CSSOM is decisive here; I add the Firefox 150 non-implementation caveat — Firefox is not a valid oracle for this feature |
| H01 | `ACCEPTED_FACT` | **CONFIRMED (machine fact, fully re-derived)** | 168/168 paths, blob OIDs, sizes, SHA-256; commit + tree OID verified via GitHub API |
| H02 | `REJECTED_CLAIM` | **CONFIRMED, strengthened to falsified** | seed omits 450 obligations (~34%), incl. `css-mixins-1` whose `@function` the frozen surface already parses |
| H03 | `REJECTED_CLAIM` | **CONFIRMED** | my own census is a recognition-obligation count, explicitly not an operation closure |
| H04 | `ACCEPTED_FACT` | **UNVERIFIED** | V3 routing internals not audited |
| H05 | `REJECTED_CLAIM` | **CONFIRMED** | `FEATURE-LEDGER.md:309` — "zero sealed feature rows" by the tranche's own admission |
| H06 | `RESEARCH_ONLY` | **CONFIRMED** | consistent with what I saw; no upgrade earned |
| H07 | `REJECTED_CLAIM` | **CONFIRMED, demonstrated** | I produced a defensible denominator in one session without any analyzer |
| H08 | `REJECTED_CLAIM` | **CONFIRMED** | bijection absent; my count is a lower bound with stated biases |
| I01 | `ACCEPTED_FACT` | **CONFIRMED, sharpened** | 2,324 subject files / 354 MB vs a 17-line accepted production and a 75-line pre-reset keyframe parser that is spec-wrong |
| K.7 | obligation | **RE-SIZED** | "52-export/37-consumer" is really 63 symbols over 6 doors for the one real consumer; and `/css`'s own return types live in `/value` |

---

## What I could not verify and why

1. **My own served model.** Declared and self-observed as `claude-opus-5[1m]`;
   no environment variable or API receipt is exposed to the seat. Adjudicators
   must confirm from the spawn side.
2. **Firefox's future behaviour.** Firefox 150.0.2 does not implement
   timeline-range keyframe selectors or `animation-range-*` at all. Two of three
   engines agree with the spec; I did not consult WPT results, so I cannot say
   whether Chromium/WebKit agreement is normative consensus or shared
   implementation lineage. The **spec bytes** are the arbiter here and they are
   unambiguous; the engines corroborate.
3. **`<timeline-range-name>` for scroll-progress timelines.** scroll-animations-1
   defines the seven names under **§3.1 View Progress Timeline Ranges**. §2
   (Scroll Progress Timelines) defines no named ranges. So "seven names" is the
   union of all defined names, which is what a parser needs; whether a given name
   is *meaningful* on a given timeline is a resolution-time question the grammar
   does not answer. E14 is right for parsing; a semantics reviewer should note
   the scoping.
4. **The keyframe-selector production lives in an appendix marked for
   relocation.** scroll-animations-1 line 2643: "This section should move to
   CSS-ANIMATIONS-2 and WEB-ANIMATIONS-2." At the pin it has not moved. A parser
   citing "css-animations-2" for this production is citing the wrong document
   today.
5. **`c14-css` internals.** I confirmed the capture directory still exists and
   read `coverage.md`'s self-description, but I did not run the c14 assay. P-1's
   non-keyframe classifications are unaudited by me.
6. **Bench arm (P-3), `mirror/` test execution, prompt archives, envelopes.**
   Out of my lens by design; I sampled none of the 2,862 messages or 3,283
   envelopes.
7. **`@webref/css` as a second denominator instrument.** I did not install it;
   my census is single-instrument (bikeshed source parsing) with stated biases.
   A second instrument would tighten the bound.
8. **E02, E05, E06, E07, E08, E12, F10, H04, D06–D10** — not probed; listed
   above as `UNVERIFIED` / `OPEN` rather than silently inherited.

---

## Open questions for the adjudicators

1. **Is `timeline-range` a trunk or a child of `values`?** The document says
   both, and E16's spelling (`values/timeline-range`) presumes the second while
   the graph draws the first. Until this is ruled, "one owner" is not
   implementable. **Rule it explicitly.**
2. **Who owns `bare-keyframe-percentage`?** It is a css-animations-1 production.
   Assigning it to `timeline-range` (MODULE-DAG.md:84, 91) collapses two
   contextually distinct productions, which invariant 2 forbids. I recommend:
   `keyframes` owns the bare `[0,100]` arm; `timeline-range` owns the name and
   the unbounded arm.
3. **What happens to the exported `KeyframeSelector` type?** Spec conformance
   requires 7 names and a mandatory offset; the frozen contract exports 4 names
   and `offset?`. These cannot both hold. Does the compatibility ring win (and
   the mirror ships a known spec defect), or does the type break (and 4.0.0's
   contract breaks)? `keyframes.js` imports `KeyframeSelector` — this is a real
   cross-repo decision, not a local one.
4. **Should the parser-proof P-1 GREEN be withdrawn?** Its 22 keyframe-selector
   rows are `OUT_OF_SCOPE` on a door where the mirror is provably spec-wrong,
   and two of its `liveOk` receipts are false. At minimum the gate needs a rule
   that `OUT_OF_SCOPE` cannot exceed some fraction, or that a door with a
   *known* mirror implementation may not be filed out-of-scope.
5. **Does the 76-root seed survive the `css-mixins-1` counterexample?** The
   frozen surface parses `@function`; `css-mixins-1` is `UNCLASSIFIED_RED`. Either
   the seed grows or the compatibility ring shrinks. It cannot stay as-is.
6. **Should the compatibility invariant be restated as 63 symbols over 6 doors?**
   "52-export/37-consumer" under-states the real obligation and omits the three
   `/value` types that are `/css`'s own return types.
7. **Should R1 and the `replace(/,/g," ")` family be escalated out of V·π?**
   4.0.0 is immutable and the mirror is the stated cure, but R1 is a live
   TypeError on a user-typed input path in the shipped demo
   (`demo/color-session/picker-color.ts:110`). "No known consumer feeds the crash
   shape" surveyed `keyframes.js` and missed the demo. A one-line guard is not a
   parser decision.
8. **Does the project memory need correcting?** It describes
   `src/parsing/grammars/*.bbnf`, `src/units/color/matrix.ts`, and a
   1,607-test/36-file suite that no longer match the tree. Any future seat
   reading it will start from a false map of `src/`.

---

## Reproduction index

Everything above re-runs from these:

```sh
# spec pin
gh api repos/w3c/csswg-drafts/commits/c7573530343759ace8e46438a1fa2c44515b5554
gh api "repos/w3c/csswg-drafts/git/trees/75bf19c016ed98126381508073de6893c9f756f5?recursive=1"
curl -sSL https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/scroll-animations-1/Overview.bs | sed -n '1337,1339p'

# browser witness (playwright from the value.js node_modules)
#   @keyframes probe { SEL { opacity: .5 } } -> sheet.cssRules[0].cssRules[0].keyText
#   CSS.supports("animation-range-start", V)

# live parser
npx vite-node -e 'import("./src/css/index.ts")'          # src at HEAD
node   -e 'import("./dist/subpaths/css.js")'             # the harness "live" engine

# BBNF, read-only, acknowledged HEAD
git -C /Users/mkbabb/Programming/bbnf-lang show af15f63e:grammar/css/l4/stylesheet.bbnf

# receipts
jq '.rows[]|select(.door=="keyframe-selector")' docs/tranches/V/apotheosis/parser-proof/equivalence-results.json
```
