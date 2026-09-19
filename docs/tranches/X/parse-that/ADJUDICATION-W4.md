SERVED MODEL: claude-fable-5-1

# ADJUDICATION-W4 — the 45 `PENDING-ADJUDICATION` seam cells, ruled

**Unit**: `X.P.W4.f` — the FRESH Fable adjudicator (M-23 §1) of the supplement wave `X.P.W4S`
(COHESION §0y E-r2-1), 2026-09-19. **Authority**: `waves/W4.md` third dated addendum (the `X.P.W4.f`
clause) · COHESION §0v (GROUND-C) · §0w (the id-set `{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 ·
ID-5 · PB-11 · R-f1 · E-k2}` and each class's ruling) · §0y (the three terminal forms; the stamp
iff G-1..G-9 GREEN, else withheld by gate id). **Seat disclosure**: this seat authored no byte of
X.P.W4, `.e` or `.e2`; every reading below was taken at this seat's own clock from the settled bytes
(value.js `c5c13f83`, `<p2>` `49ca70b`), and every measured table was run twice with identical output.

**What this file is.** The record of a ruling, one cell at a time: for each of the 44 carried cells
(`universe-52.json`'s non-TOTAL remainder, 88 miss entries at 44 per lowering) and each of the 39 rows
whose `PENDING` rested on a ledger premise, the class predicate applied, the inputs re-run through
the sha-pinned published 4.0.0 oracle (`css.js` 43,972 B, sha256 `8b538130…`) and BOTH candidate
lowerings, and the terminal disposition the seam contract now carries. **What it is not**: a status
word. `SEAM-CONTRACT.md` §3's cells are the contract; this file is why they read as they do.

**Method (L-14: refute, never average).** Every carried cell was re-measured (Appendix A, 44 of 44,
js ≡ wasm on every one). Where the rulingId the equivalence emitter attached to a cell was reached by
a class predicate that replays the INCUMBENT's mechanism (ID-1b, ID-4), the cell was reduced to
minimal variants — the name alone, the value alone — so the divergence is attributed to the
production that actually produces it (Appendix B). The three central claims of X.P.W4 were attacked
before any of them was certified (§7).

---

## §1 The id-set, each class's predicate, and how this seat read it

| id | class (COHESION §0w) | predicate | reading applied here |
|---|---|---|---|
| `GROUND-C` | ±Infinity numerals (§0v, RULED) | a numeric token whose conversion overflows | **not a syntax error**; range validity per production by that production's own clause: css-color-4 §4.2 (alpha clamps to [0,1]) · §8.1/§12 (`rgb()` channels clamp to [0,255]) · css-easing-1 (`cubic-bezier` abscissae in [0,1] — none of the 29 cells overflows an abscissa; ordinates and `linear()` stops unbounded) · css-values-4 §5.1 (where no range is declared the value is carried). Candidate correct on all 29 → `declared-divergence` |
| `ID-1` / `ID-1b` | the incumbent's unanchored component read; its brace-blind declaration NAME split (F-m1) | replay of `parseDeclarations`' `row.slice(0, row.indexOf(":"))` over `splitTopLevel(body, ";")` | incumbent defect **where the candidate answers css-syntax-3 §5.4.4** — measured TRUE for the nested-at-rule form (2 cells) and **FALSE for the non-ident-name form**: both engines accept `col!r` as a name (F-w4f-1, §6). Each tagged cell re-attributed in §2.5 |
| `ID-2` | the incumbent's empty-argument tolerance | an empty part in a comma-separated list is skipped | incumbent defect, candidate correct (css-values-4 §2.1) → `declared-divergence` |
| `ID-3` | the incumbent's non-string acceptance | a non-string source answers an empty sheet | already `declared-divergence` on `parseStylesheet`; no carried cell (the r1 arm was cured at `.n`) |
| `ID-4` | the incumbent's signed paren counter | a `)` that closes nothing drives the counter negative | incumbent defect, candidate correct (css-syntax-3 §5.4.9, a block is consumed to its MATCHING closer) → `declared-divergence`, 5 of 5 |
| `ID-5` | legacy comma form mixing `<number>`/`<percentage>`/`none` | css-color-4 §8.1's homogeneous arms | already `declared-divergence` on `parseCssColor`; no carried cell |
| `PB-11` (F-l3) | the oracle accepts `hwb(10, 10%, 10%)` against PB-11's prose | the comma form on a css-color-4 §8.3 head | **RULED**: PB-11 stands (the candidate rejects both witnesses, spec-correct); F-l3 is an incumbent observation with class population 1 — carried in `parseCssColor`'s row as it was, no cell moves |
| `R-f1` · `E-k2` | the derived window / class-1 bounds reaching the instrument | — | no carried cell names either id (`universe-52.json` remainder = `{GROUND-C, ID-1b, ID-4, ID-2}` only); nothing to rule, recorded so the set is read whole |

## §2 The 44 carried cells — ruled one at a time

Cell numbers are Appendix A's (`#1`–`#44`); every incumbent/candidate reading quoted is Appendix A's
measurement, taken at this seat.

### §2.1 `GROUND-C` on the four colour-family entries — 4 cells (`#1`–`#4`)

One input, `rgb(.843, -0, +54, 5e498)`, reaching `parseCssColor` · `parseCssScalar` · `parseCssValue` ·
`parseCssValues`. The alpha numeral `5e498` overflows to +∞. **Ruling**: not a syntax error (§0v);
css-color-4 §4.2 clamps `<alpha-value>` to [0,1] at parsed-value time → the value is `alpha 1`.
4.0.0 REJECTS all four (`css_syntax`, the whole call); the candidate ACCEPTS all four in both
lowerings — `{rgb, [0.843, 0, 54], alpha 1}` wrapped in each entry's own shape. **Candidate
correct. `declared-divergence`, rulingId `GROUND-C`. Direction: WIDENS.** Cross-check of the clamp
law at this seat: `rgb(-1e400 0 0)` → `[0,0,0]`; `rgb(0 0 0 / 1.5)` → alpha 1; `rgb(0 0 0 / -1)` →
alpha 0 (4.0.0 rejects all three with its own `color_out_of_range` label).

### §2.2 `GROUND-C` × 23 and `ID-2` × 1 on `parseTimingFunction` (`#5`–`#28`)

| cells | production | overflow position | css-easing-1 range | 4.0.0 | candidate (both lowerings) | ruling |
|---|---|---|---|---|---|---|
| `#8` `#14` `#16` `#20` | `cubic-bezier(x1, y1, x2, y2)` | `y1` and/or `y2` (`1e389`, `8e458`, `9e337`+`4e424`, `6e345`); `x1`,`x2` ∈ [0,1] in all four | only `x1`,`x2` are range-restricted | REJECT `css_syntax` | ACCEPT, `y1: Infinity` (`typeof number`, `Number.isFinite` false) | **candidate correct — `GROUND-C`, WIDENS** |
| `#5` `#6` `#7` `#9` `#11` `#12` `#13` `#15` `#17` `#18` `#19` `#21` `#22` `#23` `#24` `#25` `#26` `#27` `#28` | `linear( [<number> && <percentage>{0,2}]# )` | a stop's output `<number>` (`5e425`, `8e440`, …) or input `<percentage>` (`7e422%`, `4e495%`, …) | neither is range-restricted; the spec's own algorithm repairs non-monotonic inputs | REJECT `css_syntax` | ACCEPT, `stops[].output: Infinity` / `stops[].input[0]: Infinity`; underflows (`1e-315%`, `0e356`) arrive as the denormal / 0 they are | **candidate correct — `GROUND-C`, WIDENS** |
| `#10` | `steps(1e43,, start)` | — (`1e43` is finite) | — | ACCEPT `{steps, count 1e43, jump-start}` (the empty part skipped) | REJECT `css_syntax [11,19) ["<jump-position>"]` | **candidate correct — `ID-2` (incumbent defect), NARROWS** |

**Consumer direction, stated once**: a consumer feeding computed numbers that can overflow receives a
timing function whose overflowed coordinate is `±Infinity` — never a rejection — and `JSON.stringify`
renders that coordinate as `null`. `steps(n,, start)` is a malformed list and is now refused.

### §2.3 `GROUND-C` × 2 on `parseStylesheet` (`#31`, `#33`)

`#31` `a{ color: rgb(-232, 52.305, 67, 1e327) }` → 4.0.0 REJECTS the sheet; the candidate answers the
rule with `[0, 52.305, 67] / alpha 1` (channel and alpha clamped per §8.1 / §4.2). `#33` (three rules;
the second carries `rgb(7e456, 157.19…, 67.109, 9e480)`) → 4.0.0 REJECTS; the candidate answers all
three rules, the second's colour `[255, 157.19…, 67.109] / alpha 1`, and the third's `oklch(none
-41.3… -0deg / 3e-396)` with alpha 0 (underflow). **Candidate correct — `GROUND-C`, WIDENS.**

### §2.4 `ID-4` × 5 on `parseStylesheet` (`#29` `#34` `#38` `#42` `#39`)

| cell | input (abridged) | 4.0.0 | candidate | spec | ruling |
|---|---|---|---|---|---|
| `#29` | `.c ){ color: #28cA }` | REJECT `expected ["rule"]` | ACCEPT, selector `.c )` | §5.4.3: a stray `)` is a component value in the prelude | candidate correct — WIDENS |
| `#42` | `#d ){ background-color: var(--a, rebeccapurple) }` | REJECT | ACCEPT, selector `#d )` | same | candidate correct — WIDENS |
| `#34` | `a, b {…} b ) color: #0e8 } a, b {…}` | REJECT `[55,104)` | ACCEPT — `b ) color: #0e8 }` is read as §5.4.3 reads it | same | candidate correct — WIDENS |
| `#38` | `a { border-color: oklch}-0 139 -160deg) !important } a {…} b {…}` | REJECT `[24,138)` | ACCEPT — rule 1 `border-color: oklch` (ident), then a rule whose prelude is `-0 139 -160deg) !important } a` | §5.4.3: at the top level a `}` is a parse error that is consumed into the prelude, not a stop | candidate correct — WIDENS |
| `#39` | `.c {…} GARBAGE ) ;(#d { background-color: #eFEbC78B }` | ACCEPT — two rules, the second `#d {…}` | REJECT `[54,65) "GARBAGE ) ;"` + `[65,100)` | the `(` opens a simple block consumed to EOF (§5.4.9); the qualified rule ends at EOF — a parse error, the rule is nothing | candidate correct under the contract's posture (§5) — NARROWS; 4.0.0's acceptance is the counter defect (`)` → −1, `(` → 0, `{` visible) |

### §2.5 The 9 `ID-1b`-tagged cells on `parseStylesheet` — re-attributed under refutation

The emitter tags a cell `ID-1b` when `.n`'s predicate — a replay of the incumbent's brace-blind
name split — finds a non-ident run in a declaration-name position. That predicate attributes by
the incumbent's MECHANISM; it does not ask whether the candidate diverges on that mechanism. This
seat asked (Appendix B, every variant in both lowerings):

- **`a { col!r: red }` → 4.0.0 name `col!r` · candidate js name `col!r` · candidate wasm name `col!r`.**
  The same for `backgr!ound-color`, `backgr!und-color`, `border-colo!r`, `border-!olor`, `b!ound`,
  `x!oundy`, `color!`, `!color`, `co!lor`, `c!olor`. **Both engines accept a non-ident run as a
  declaration NAME.** That is a shared departure from css-syntax-3 §5.4.4 / §4.3.11 and is **not a
  divergence** — F-w4f-1 (§6).
- **`#d { color: red !important }` → both ACCEPT · `#d { color: red!important }` → 4.0.0 ACCEPT
  (`important: true`) · candidate REJECT, both lowerings.** css-syntax-3 §5.4.7 removes the trailing
  `!`+`important` pair from the value with no whitespace requirement; `red!important` is valid CSS.
  The candidate's refusal is a **candidate defect** — F-w4f-2 (§6).

| cell | input (abridged) | the divergence is produced by | 4.0.0 | candidate | ruling |
|---|---|---|---|---|---|
| `#30` | `b { col!r: rgb(9. none -76 / 0.) }` | `9.` / `0.` — `PB-12` (`1.` is not a CSS number); `b { col!r: rgb(9 none -76 / 0) }` → both ACCEPT, name `col!r` | ACCEPT | REJECT | **`PB-12`, NARROWS**; the name is shared (F-w4f-1) |
| `#32` | `… a { border-colo!r: hsl(50% 1e-366 67.310) }` | `hsl(50% …)` — `PB-09` (a percentage hue); with `hsl(50 …)` both ACCEPT, name `border-colo!r` | ACCEPT | REJECT | **`PB-09`, NARROWS**; name shared |
| `#35` | `b { backgr!und-color: oklch(3e-440 7e-206 4.deg) }` | `4.deg` — `PB-12`; with `4deg` both ACCEPT | ACCEPT | REJECT | **`PB-12`, NARROWS**; name shared |
| `#36` | `b { …: hsl(141.16…turn 2. 53.62…) !important } a, b { border-!olor: rgb(+16 -0 395) }` | `2.` in rule 1 — `PB-12`; rule 2 alone → both ACCEPT, name `border-!olor` | ACCEPT | REJECT | **`PB-12`, NARROWS**; name shared |
| `#37` | `b { …: oklch(.369 3e53 7e202turn / -137) } a { backgr!ound-color: rgb(42.187 none -0 / -116) } #d {…}` | alpha `-137` / `-116` — `PB-05` (4.0.0 rejects with `color_out_of_range`; the candidate clamps to 0; measured on `oklch(.369 0.1 10 / -137)` alone) | REJECT | ACCEPT (all three rules, name `backgr!ound-color` in rule 2) | **`PB-05`, WIDENS**; name shared |
| `#40` | `b { background-color: var(--brand) -!important }` | 4.0.0 folds `-!important` into the value as a keyword (`ID-1b`'s F-m1 form, incumbent defect); the candidate REJECTS on the `!important` adjacency — `var(--brand) - !important` (spaced) is ACCEPTED by both | ACCEPT (wrong) | REJECT (wrong) | **CANDIDATE DEFECT F-w4f-2 ∧ incumbent defect `ID-1b`** — neither engine gives §5.4.7's answer (value `var(--brand) -`, `important: true`); the cell stands as a mirror-defect until F-w4f-2 is cured, after which it is `ID-1b` |
| `#41` | `#d { background-color: hsl(73.416 -338 -290)!important } .c {…}` | the `)!important` adjacency only — with a space both ACCEPT | ACCEPT (`important: true`, correct) | REJECT | **CANDIDATE DEFECT F-w4f-2** — a mirror-defect until cured |
| `#43` `#44` | the `@property … h1, h2 { img { @container (width > 400px) { nav {…} } transition: … } … }` sheets (two variants) | 4.0.0's brace-blind split reads a declaration named `@container (width > 400px) { nav { margin` and another named `} } transition`; the candidate reads `@container` as an at-rule CHILD of `img` with `nav` nested inside it | ACCEPT (mangled) | ACCEPT (§5.4.4's tree) | **`ID-1b` (incumbent defect), candidate correct — CHANGES VALUE** |

**Tally of the 44**: 29 `GROUND-C` + 1 `ID-2` + 5 `ID-4` + 2 `ID-1b` + 3 `PB-12` + 1 `PB-09` + 1 `PB-05`
= **42 ruled candidate-correct, `declared-divergence`** by an id that is a ruled class or an
ADJUDICATED ledger row; **2 ruled CANDIDATE DEFECT (F-w4f-2)** — terminal, not PENDING, and not
dischargeable by this seat (a grammar act at `<p2>/typescript/src/css/**`, outside `.f`'s bounds).
**0 cells left PENDING.**

## §3 The 39 rows whose `PENDING` rested on a ledger premise — retired by measurement (F-w4a-1)

| ledger row | its premise | measured at this seat | ruling | rows |
|---|---|---|---|---|
| `CN-2` | *"the 10 frozen runtime exports … absent from the candidate and absent from `UNREALIZED_ENTRIES`"* | all 10 are exported at `entry.mjs` (L260 · L546 · L1001–L1004 · L1067 · L1168 · L1333 · L1337), answer 200–400 AGREE cells each with 0 mirror-defects, and resolve from the INSTALLED tarball at G-3 (`resolved 52 of 52`, X.P.W4.e2; re-run at this seat, double-run) | **RETIRED as a coverage claim.** 9 rows → `identical`; `coerceToSyntax` → `declared-divergence` inherited from `parseCssColor` through the `<color>` coercion (its 208 declared cells honour `SP-1` · `ADJ-2` · `ID-5` · `PB-12` · `PB-04`/`PB-05` · `PB-08`, the differential's own `why` fields; its 120 `R1`-class cells are strictly safer) | 10 |
| `CN-3` | *"the candidate re-exports 5 … and declares no others"* | `build/ac1.d.ts` re-exports all 33 from the in-package byte-copy of the sha-pinned 4.0.0 declaration (`c81d0952…`, X.P.W4.e C3), and all 33 resolve from the installed tarball (X.P.W4.e2's arity-instantiated check line); the differential's `noPeer 28` is `F-ab1`'s hard-coded five-name literal | **RETIRED as a coverage claim.** 28 rows → `identical` (the field-level caveats on `ParseIssue` — `F-b4`, and 4.0.0's `color_out_of_range` label that the candidate never emits — and on `ParseResult` — `R1` — are kept in the direction cells) | 28 |
| `R4` | *"`parseKeyframeSelector` is one of the six entries the candidate does not realize"* | `UNREALIZED_ENTRIES` = `[]`; the entry answers 27,021 of 27,021 AGREE in both lowerings | **RETIRED as a coverage claim.** The fixture's axis (the selector range check is off the public API) is a SHARED posture — an observation, not a divergence. `parseKeyframeSelector` → `identical` | 1 |

The ledger is E-3 evidence emitted by `<p2>`'s generator; these retirements are recorded there as a
dated appended section (`DIVERGENCE-LEDGER.md` §10) and the rows themselves are not rewritten. The
generator cannot yet re-emit `CN-3` truthfully — `run-full-surface.mjs:60` still carries the five-name
literal (`F-ab1`) — so a regeneration is owed to the emitter's owner, by id, not performed here.

## §4 The 45 terminal dispositions, as `SEAM-CONTRACT.md` §3 now carries them

| rows | disposition head | ids named | count |
|---|---|---|---|
| `parseCssColor` · `parseCssScalar` · `parseCssValue` · `parseCssValues` | `declared-divergence` | `GROUND-C` (+ each row's standing ids; `ID-1` on the two value entries) | 4 |
| `parseTimingFunction` | `declared-divergence` | `GROUND-C` `ID-2` `CAP-5` `CAP-6` `CAP-8` | 1 |
| `parseStylesheet` | `declared-divergence` · candidate-defect ×2 (F-w4f-2) | `ID-1b` `ID-4` `GROUND-C` `PB-12` `PB-09` `PB-05` `ID-3` `CAP-1` `CAP-2` `CAP-3` `CAP-4` `CAP-7` | 1 |
| `coerceToSyntax` | `declared-divergence` (inherited) | the `parseCssColor` rows + `R1`; `CN-2` retired | 1 |
| the 9 other `CN-2` runtime rows | `identical` (`CN-2` retired) | — | 9 |
| the 28 `CN-3` type rows | `identical` (`CN-3` retired) | — | 28 |
| `parseKeyframeSelector` | `identical` (`R4` retired) | — | 1 |
| | | | **45** |

Census after the ruling (⟨cmd⟩ `seam-contract-check.mjs`, twice): `identical 45 · declared-divergence
7 · not-provided 0 · PENDING-ADJUDICATION 0` — 52. The 7 rows that were already `identical` are
untouched.

## §5 A posture ruled once, so it is not re-argued per cell

**The whole-sheet refusal.** `ID-1b`'s ledger row names it as unadjudicated: *"the candidate's own
disposition … refusing the whole sheet where §5.4.4 drops the invalid declaration and keeps the rule."*
**Ruled — it is the SEAM's error posture, not a divergence class.** The frozen `ParseResult<Stylesheet>`
has an `ok:true` arm with a value and an `ok:false` arm with diagnostics, and no channel for a rule
kept with a declaration dropped; 4.0.0's own answer to a malformed rule is whole-sheet `ok:false`
(measured: `.c ){ … }` → `ok:false expected ["rule"]`; `(#d { … }` → `ok:false`). css-syntax-3's
drop-and-continue is a rendering UA's recovery, not this API's contract. Consequently what this seat
adjudicates per cell is **which inputs are malformed**, never whether a malformed input yields
`ok:false`. Every `ID-4` cell above was read under this posture.

## §6 Findings of this seat — two new, one carried, none cured here

| id | finding | measured | class | owner |
|---|---|---|---|---|
| **F-w4f-1** (MEDIUM) | **both engines accept a non-ident run as a declaration NAME** — `a { col!r: red }` → name `col!r` from 4.0.0 and from both candidate lowerings; likewise `!color`, `color!`, `backgr!ound-color` (Appendix B, 12 forms) | css-syntax-3 §5.4.4 / §4.3.11: a declaration's name is an `<ident-token>` | SHARED — no cell, no divergence; it REFUTES the `ID-1b` ledger row's `candidate` field as stated (*"REJECTS the first two in BOTH lowerings"* — those rejections were `PB-12`'s and F-w4f-2's) | a grammar act at `<p2>/typescript/src/css/**` (candidate); an incumbent defect of 4.0.0 (X·V's) |
| **F-w4f-2** (HIGH — 2 carried cells are candidate mirror-defects) | **the candidate requires whitespace before `!important`** — `color: red!important` REJECTED, `color: red !important` ACCEPTED; 4.0.0 accepts both with `important: true` | css-syntax-3 §5.4.7: the trailing `!`+`important` pair is removed from the value; no whitespace is required | CANDIDATE DEFECT — cells `#40`, `#41` stand as mirror-defects; RC-P conjunct 3 will count them at any `V` that ships the candidate uncured | a grammar act at `<p2>/typescript/src/css/**` — outside `.f`'s bounds; **returned by id** |
| **F-e3** (carried from X.P.W3.e) | a non-finite `<hue>` is REJECTED by both engines (`hsl(1e400 0% 50%)` → candidate `css_syntax ["<finite-number>"]`) where css-color-4 §4.3 normalizes it to 0deg | §0v: overflow is not a syntax error | SHARED — no cell (both reject → AGREE); a candidate grammar act | carried, owner unchanged |

## §7 L-14 — the three central claims, attacked before certification

| claim | attempt | outcome |
|---|---|---|
| **the seam is complete (G-1)** | re-run the checker at this seat before and after the ruling; look for a 53rd row, a blank field, a carried cell outside a ruled row | BEFORE: `VERDICT: GREEN`, census `PENDING 45 · identical 7`, both set-differences ∅ (twice). AFTER the ruling: set-differences ∅ / ∅, no blank field, no unknown id, census `identical 45 · declared-divergence 7` — and **`VERDICT: RED — 2 check(s) failed`**: **[E]** 37 rows read `identical` while `CN-2`/`CN-3` still bind them in a `subjects` field (the checker cannot read a retirement, and the ledger's generator cannot yet re-emit them, §3); **[G]** the 6 carried rows publish a terminal head while `universe-52.json` — immutable W3 evidence — still marks them PARTIAL (the checker encodes §0v's *"publishes the carried cells as PENDING-ADJUDICATION"* rider, which was the pre-adjudication state). **Both fires are the instrument's vocabulary, not the contract's content** — and the gate is read as it measures: **G-1 RED after the ruling.** The refutation attempt therefore SUCCEEDED against the instrument, not the seam: `scripts/seam-contract-check.mjs` is `.a`'s file, in no row of this unit's writable set — **E-w4f-1**, returned |
| **RC-P is unarguable (G-5)** | bind conjunct 3 to `V` rather than to the candidate tree (Q-RC-1); look for a conjunct that reads a document | conjunct 3's subject was the candidate's `src/css/**` — an INSTRUMENT reading of the wrong subject, declared by `.c` but still the value. **Cured**: the V-tarball arm (`rc-p-evaluate.mjs`, `RELEASE-CONDITION.md` addendum) — the harness's own differential run over V's INSTALLED `/css` from the registry-identical tarball; only that arm's reading is the value; the candidate-side CLI is recorded beside it. Conjuncts 5 and 6 remain the only document reads, as §6a permits |
| **no value.js byte moved (G-2)** | `git status --porcelain -- src api demo test e2e` at this seat, and `git show --name-only` over every commit of this wave | raw: 3 lines (`demo/DESIGN.md` · `demo/styles/foundation.css` · `demo/styles/shell.css`), **a concurrent Track-A seat's** in the shared checkout; every commit of this wave (`93bcb83` `43c3f48` `49ca70b` in `<p2>`; `e9140c34` `f170e178` `2bf4b205` `dfb9eab5` `8424a6eb` `c6ec1ee6` `c5c13f83` and this unit's in value.js) → **0** paths under those five roots. NOT refuted |

## §8 The carried ids COHESION §0y names — each handed by id, zero silent drops

| id | disposition by this seat |
|---|---|
| `U-d` | **DISCHARGED except the stamp**: the adjudicative half is performed here; the R-A stamp is **WITHHELD by gate id G-1** (§7) |
| `F-w4a-1` | **RULED** (§3): `CN-2` · `CN-3` · `R4` retired as coverage claims; the ledger's regeneration is owed to the emitter's owner (F-ab1's cure precedes it) |
| `SEAM-DRIFT` | in remit to record, not to cure: the 13 HEAD adds are outside the seam by construction; carried to the X·V adoption wave (G-9 disposition C's re-trigger payload) — **X-W11 OUT-OF-WAVE roster, by id** |
| `R-w4b-2` · `R-5` | the fresh root's eslint/tsc cadence has no subject — **X-W11 OUT-OF-WAVE roster, by id** (§0aa already routes R-5 there) |
| `F-ae1 / F-p1` | `test/css-equivalence/**`'s stale pins — in no unit's set of this wave; **X-W11 OUT-OF-WAVE roster, by id** |
| the W3 rounds-6–8 set (`ESC-c1` · `R6-1` · `F-ab1` · `F-ab2` · `F-ab3` · `R-f1` · `E-2/F-e10` · `ESC-d1` · `E-h*`/`E-j*`/`E-k*`) | `ESC-c1` (PT-03, the one-way latch) — a parse-that library seam question, unchanged; `F-ab1` — the five-name literal at `run-full-surface.mjs:60`, the reason `CN-3` cannot be re-emitted truthfully (§3), a `<p2>` act; `R-f1` · `E-k2` — in the id-set, no carried cell names them (§1); the rest name the triumvirate as their terminal site and are **handed to X-W11's OUT-OF-WAVE roster by id** |
| `R-4` (§0aa) | **DISCHARGED AT THE BYTES by `.e`'s dated file**: `evidence/W4/wasm-imports-2026-09-19-w4e.json` describes sha256 `f0d063d6…` / 662339 B, and ⟨cmd⟩ `shasum -a 256 src/css/build/ac1.wasm` at this seat → `f0d063d6…` — the same bytes; `evidence/W4/**` is in no row of this unit's grant, so nothing is re-banked and the identity is recorded here |
| `R-6` | by construction (no remote at `<p2>`) |

## §9 What follows from this ruling for the gates

- **G-1 reads RED at this seat after the ruling** (§7), on the instrument's two structural checks.
  Per `W4.md` §6 G-10 (*"a stamp performed while any of G-1..G-9 is red fails"*) and COHESION §0y
  (*"performs the R-A stamp iff G-1..G-9 read GREEN — else withholds again, by gate id"*), **the R-A
  stamp is WITHHELD by gate id G-1**, the five four-verb rows are untouched, and the two COHESION
  carves are not performed. The cure is one file outside this unit's bounds — **E-w4f-1**: the
  checker must learn the post-adjudication vocabulary (a carried row whose cells are ruled in this
  file is terminal; a ledger row retired in `DIVERGENCE-LEDGER.md` §10 no longer binds) — or the
  ledger must be regenerated without `CN-2`/`CN-3`'s stale subjects, which needs `F-ab1`'s cure first.
- **G-3 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9 GREEN** at this seat (receipt in `execution/D/X-P-W4S.md`);
  **G-2 GREEN for X·P**, read with attribution; **G-10 open-state 5, act not performed**.
- **RC-P(4.0.0)** re-evaluated with the V-tarball arm: recorded in `RELEASE-CONDITION.md`'s dated
  addendum — FALSE stays FALSE on PUBLISHED and ADMITTED by construction (`V` is the X-W11 coordinate).

---

## Appendix A — the 44 carried cells, re-measured at this seat (incumbent · candidate js · js ≡ wasm)

⟨cmd⟩ `node <scratch>/probe-cells.mjs` from `<p2>/typescript` — the oracle is the vendored sha-pinned
4.0.0 `css.js` (sha256 printed on line 1); the candidate surfaces are `loadPublicSurfaces()`'s `js`
and `wasm`. Run twice, byte-identical.

```
oracle sha256 8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42 43972 B
surfaces: [ 'js', 'wasm' ]

#1 parseCssColor [GROUND-C] MIS_ACCEPT
  input: "rgb(.843, -0, +54, 5e498)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":["CSS color"],"actual":"rgb(.843, -0, +54, 5e498)"}]}
  CAND-JS:   {"ok":true,"value":{"space":"rgb","channels":[0.843,0,54],"alpha":1},"diagnostics":[]}
  js≡wasm:   true

#2 parseCssScalar [GROUND-C] MIS_ACCEPT
  input: "rgb(.843, -0, +54, 5e498)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":["scalar"],"actual":"rgb(.843, -0, +54, 5e498)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[0.843,0,54],"alpha":1}}},"diagnostics":[]}
  js≡wasm:   true

#3 parseCssValue [GROUND-C] MIS_ACCEPT
  input: "rgb(.843, -0, +54, 5e498)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":["scalar"],"actual":"rgb(.843, -0, +54, 5e498)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[0.843,0,54],"alpha":1}}},"diagnostics":[]}
  js≡wasm:   true

#4 parseCssValues [GROUND-C] MIS_ACCEPT
  input: "rgb(.843, -0, +54, 5e498)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":["scalar"],"actual":"rgb(.843, -0, +54, 5e498)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"list","separator":"space","items":[{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[0.843,0,54],"alpha":1}}}]},"diagnostics":[]}
  js≡wasm:   true

#5 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(174.89818022586405 7e422%, 0e356 1e-315%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":48,"expected":[],"actual":"linear(174.89818022586405 7e422%, 0e356 1e-315%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":174.89818022586405,"input":[null]},{"output":0,"input":[1e-317]}]},"diagnostics":[]}
  js≡wasm:   true

#6 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(.95, +99, 5e325)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":23,"expected":[],"actual":"linear(.95, +99, 5e325)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":0.95,"input":[]},{"output":99,"input":[]},{"output":null,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#7 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(17.833 .896%, 8e440, -0)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":31,"expected":[],"actual":"linear(17.833 .896%, 8e440, -0)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":17.833,"input":[0.008960000000000001]},{"output":null,"input":[]},{"output":0,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#8 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "cubic-bezier(.319, 1e389, .334, 28.136)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":39,"expected":[],"actual":"cubic-bezier(.319, 1e389, .334, 28.136)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"cubic-bezier","x1":0.319,"y1":null,"x2":0.334,"y2":28.136},"diagnostics":[]}
  js≡wasm:   true

#9 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(-361 4e495%, 166.1066859262064, -223 -17.386972857639194%, -0 9.254%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":76,"expected":[],"actual":"linear(-361 4e495%, 166.1066859262064, -223 -17.386972857639194%, -0 9.254%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":-361,"input":[null]},{"output":166.1066859262064,"input":[]},{"output":-223,"input":[-0.17386972857639194]},{"output":0,"input":[0.09254]}]},"diagnostics":[]}
  js≡wasm:   true

#10 parseTimingFunction [ID-2] FALSE_REJECT_IN_SHAPE
  input: "steps(1e43,, start)"
  INCUMBENT: {"ok":true,"value":{"kind":"steps","count":1e+43,"position":"jump-start"},"diagnostics":[]}
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":11,"end":19,"expected":["<jump-position>"],"actual":", start)"}]}
  js≡wasm:   true

#11 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(+84 8e328%, 3.880178038962185)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":37,"expected":[],"actual":"linear(+84 8e328%, 3.880178038962185)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":84,"input":[null]},{"output":3.880178038962185,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#12 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(46.108, +98 33.651%, 9e313, +52 +26%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":44,"expected":[],"actual":"linear(46.108, +98 33.651%, 9e313, +52 +26%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":46.108,"input":[]},{"output":98,"input":[0.33651000000000003]},{"output":null,"input":[]},{"output":52,"input":[0.26]}]},"diagnostics":[]}
  js≡wasm:   true

#13 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(5e425, -0, 77.123,.272)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":30,"expected":[],"actual":"linear(5e425, -0, 77.123,.272)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[]},{"output":0,"input":[]},{"output":77.123,"input":[]},{"output":0.272,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#14 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "cubic-bezier(-0, 8e458, .893, +31)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":34,"expected":[],"actual":"cubic-bezier(-0, 8e458, .893, +31)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"cubic-bezier","x1":0,"y1":null,"x2":0.893,"y2":31},"diagnostics":[]}
  js≡wasm:   true

#15 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(7e324 102.8985577110201%, .27, 29 190.33129245508462%, 147 40.640%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":74,"expected":[],"actual":"linear(7e324 102.8985577110201%, .27, 29 190.33129245508462%, 147 40.640%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[1.028985577110201]},{"output":0.27,"input":[]},{"output":29,"input":[1.9033129245508462]},{"output":147,"input":[0.4064]}]},"diagnostics":[]}
  js≡wasm:   true

#16 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "cubic-bezier(.135, 9e337,.744, 4e424)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":37,"expected":[],"actual":"cubic-bezier(.135, 9e337,.744, 4e424)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"cubic-bezier","x1":0.135,"y1":null,"x2":0.744,"y2":null},"diagnostics":[]}
  js≡wasm:   true

#17 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(5e499, -0 -0%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":21,"expected":[],"actual":"linear(5e499, -0 -0%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[]},{"output":0,"input":[0]}]},"diagnostics":[]}
  js≡wasm:   true

#18 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(-0, 8e472, .147 130%, -0)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":32,"expected":[],"actual":"linear(-0, 8e472, .147 130%, -0)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":0,"input":[]},{"output":null,"input":[]},{"output":0.147,"input":[1.3]},{"output":0,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#19 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(3e399 64.899%, +92, .700 64%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":36,"expected":[],"actual":"linear(3e399 64.899%, +92, .700 64%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[0.64899]},{"output":92,"input":[]},{"output":0.7,"input":[0.64]}]},"diagnostics":[]}
  js≡wasm:   true

#20 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "cubic-bezier(.557, 6e345, .590, -0)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":35,"expected":[],"actual":"cubic-bezier(.557, 6e345, .590, -0)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"cubic-bezier","x1":0.557,"y1":null,"x2":0.59,"y2":0},"diagnostics":[]}
  js≡wasm:   true

#21 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(.855 -0%, -0 9e390%, -26.280247420072556)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":48,"expected":[],"actual":"linear(.855 -0%, -0 9e390%, -26.280247420072556)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":0.855,"input":[0]},{"output":0,"input":[null]},{"output":-26.280247420072556,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#22 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(-7.41244088858366 5e492%, 164.92977514863014)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":52,"expected":[],"actual":"linear(-7.41244088858366 5e492%, 164.92977514863014)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":-7.41244088858366,"input":[null]},{"output":164.92977514863014,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#23 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(5e312, 41.272, 91)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":[],"actual":"linear(5e312, 41.272, 91)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[]},{"output":41.272,"input":[]},{"output":91,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#24 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(8e478 +73%, +79 28.644%)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":31,"expected":[],"actual":"linear(8e478 +73%, +79 28.644%)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[0.73]},{"output":79,"input":[0.28644]}]},"diagnostics":[]}
  js≡wasm:   true

#25 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(.235, 7e424)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":19,"expected":[],"actual":"linear(.235, 7e424)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":0.235,"input":[]},{"output":null,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#26 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(8e317, 78.70270570274442)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":32,"expected":[],"actual":"linear(8e317, 78.70270570274442)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":null,"input":[]},{"output":78.70270570274442,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#27 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(-102, 4e429 3e283%, -277)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":32,"expected":[],"actual":"linear(-102, 4e429 3e283%, -277)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":-102,"input":[]},{"output":null,"input":[3e+281]},{"output":-277,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#28 parseTimingFunction [GROUND-C] MIS_ACCEPT
  input: "linear(94.750 79.25%, 9e441, 15.846)"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":36,"expected":[],"actual":"linear(94.750 79.25%, 9e441, 15.846)"}]}
  CAND-JS:   {"ok":true,"value":{"kind":"linear-function","stops":[{"output":94.75,"input":[0.7925]},{"output":null,"input":[]},{"output":15.846,"input":[]}]},"diagnostics":[]}
  js≡wasm:   true

#29 parseStylesheet [ID-4] MIS_ACCEPT
  input: ".c ){ color: #28cA }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":20,"expected":["rule"],"actual":".c ){ color: #28cA }"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":[".c )"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[34,136,204],"alpha":0.6666666666666666}}},"important":false}]}],"diagnostics":[]}
  js≡wasm:   true

#30 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "b { col!r: rgb(9. none -76 / 0.) }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"col!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[9,"none",-76],"alpha":0}}},"important":false}]}],"diagnostics":[]}
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":34,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"b { col!r: rgb(9. none -76 / 0.) }"}]}
  js≡wasm:   true

#31 parseStylesheet [GROUND-C] MIS_ACCEPT
  input: "a{ color: rgb(-232, 52.305, 67, 1e327) }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":28,"expected":["scalar"],"actual":"rgb(-232, 52.305, 67, 1e327)"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":["a"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[0,52.305,67],"alpha":1}}},"important":false}]}],"diagnostics":[]}
  js≡wasm:   true

#32 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "b { background-color: #74173d96 } a { border-colo!r: hsl(50% 1e-366 67.310) }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[116,23,61],"alpha":0.5882352941176471}}},"important":false}]},{"kind":"style"…
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":34,"end":77,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"a { border-colo!r: hsl(50% 1e-366 67.310) }"}]}
  js≡wasm:   true

#33 parseStylesheet [GROUND-C] MIS_ACCEPT
  input: ".c { color: rgb(98.741 .536 .74 / 16%) } .c { color: rgb(7e456, 157.19748854171485, 67.109, 9e480) } a { nonebackground-color: oklch(none -41.30891829263419 -0deg / 3e-396) }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":45,"expected":["scalar"],"actual":"rgb(7e456, 157.19748854171485, 67.109, 9e480)"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":[".c"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[98.741,0.536,0.74],"alpha":0.16}}},"important":false}]},{"kind":"style","selectors":[".…
  js≡wasm:   true

#34 parseStylesheet [ID-4] MIS_ACCEPT
  input: "a, b { color: hsl(85.89643812738359turn 23.763 .396) } b ) color: #0e8 } a, b { border-color: var(--z) }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":55,"end":104,"expected":["rule"],"actual":"b ) color: #0e8 } a, b { border-color: var(--z) }"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":["a","b"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","channels":[30922.717725858092,0.23763,0.00396],"alpha":1}}},"important":false}]},{"kind":"style…
  js≡wasm:   true

#35 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "b { backgr!und-color: oklch(3e-440 7e-206 4.deg) }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"backgr!und-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"oklch","channels":[0,7e-206,4],"alpha":1}}},"important":false}]}],"diagnostics":[]}
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":50,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"b { backgr!und-color: oklch(3e-440 7e-206 4.deg) }"}]}
  js≡wasm:   true

#36 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "b { background-color: hsl(141.1656975513324turn 2. 53.62424335908145) !important } a, b { border-!olor: rgb(+16 -0 395) }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","channels":[50819.65111847967,2,53.62424335908145],"alpha":1}}},"important":true}]},{"kin…
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":82,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"b { background-color: hsl(141.1656975513324turn 2. 53.62424335908145) !import…
  js≡wasm:   true

#37 parseStylesheet [ID-1b] MIS_ACCEPT
  input: "b { background-color: oklch(.369 3e53 7e202turn / -137) } a { backgr!ound-color: rgb(42.187 none -0 / -116) } #d { color: #Ef9 }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":33,"expected":["scalar"],"actual":"oklch(.369 3e53 7e202turn / -137)"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"oklch","channels":[0.369,3e+53,2.52e+205],"alpha":0}}},"important":false}]},{"kind":"style","s…
  js≡wasm:   true

#38 parseStylesheet [ID-4] MIS_ACCEPT
  input: "a { border-color: oklch}-0 139 -160deg) !important } a { border-color: #Fdd5dF } b { border-color: hsl(-249rad -0 100% / 15%) !important }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":24,"end":138,"expected":["rule"],"actual":"-0 139 -160deg) !important } a { border-color: #Fdd5dF } b { border-color: hsl(-249rad -0 100% / 15%) !important }"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":["a"],"declarations":[{"name":"border-color","value":{"kind":"scalar","payload":{"type":"keyword","value":"oklch"}},"important":false}]},{"kind":"style","selectors":["-0 139 -160deg) !important } a"],"declaration…
  js≡wasm:   true

#39 parseStylesheet [ID-4] FALSE_REJECT_IN_SHAPE
  input: ".c { background-color: rgb(-0 .504 6e-128 / 9e-415) } GARBAGE ) ;(#d { background-color: #eFEbC78B }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":[".c"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels":[0,0.504,6e-128],"alpha":0}}},"important":false}]},{"kind":"style","selectors…
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":54,"end":65,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{' or ';')","<open-brace>"],"actual":"GARBAGE ) ;"},{"code":"css_syntax","start":65,"end":100,"expected":["<open-paren>…
  js≡wasm:   true

#40 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "b { background-color: var(--brand) -!important }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"list","separator":"space","items":[{"kind":"call","name":"var","args":[{"kind":"scalar","payload":{"type":"keyword","value":"--brand"}}]},{"kind":…
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":48,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"b { background-color: var(--brand) -!important }"}]}
  js≡wasm:   true

#41 parseStylesheet [ID-1b] FALSE_REJECT_IN_SHAPE
  input: "#d { background-color: hsl(73.416 -338 -290)!important } .c { border-color: var(--x-y) }"
  INCUMBENT: {"ok":true,"value":[{"kind":"style","selectors":["#d"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","channels":[73.416,-338,-290],"alpha":1}}},"important":true}]},{"kind":"style","selector…
  CAND-JS:   {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":56,"expected":["<open-paren>","<qualified-rule-prelude> (any character but '{', '}' or ';')","<open-brace>"],"actual":"#d { background-color: hsl(73.416 -338 -290)!important }"}]}
  js≡wasm:   true

#42 parseStylesheet [ID-4] MIS_ACCEPT
  input: "#d ){ background-color: var(--a, rebeccapurple) }"
  INCUMBENT: {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":49,"expected":["rule"],"actual":"#d ){ background-color: var(--a, rebeccapurple) }"}]}
  CAND-JS:   {"ok":true,"value":[{"kind":"style","selectors":["#d )"],"declarations":[{"name":"background-color","value":{"kind":"call","name":"var","args":[{"kind":"scalar","payload":{"type":"keyword","value":"--a"}},{"kind":"scalar","payload":{"type":"color","value":{"sp…
  js≡wasm:   true

#43 parseStylesheet [ID-1b] DIVERGENT_VALUE
  input: "  @property --ratio { syntax: \"<number>\"; inherits: false; initial-value: 1 } h1, h2 {/* c */ img { @container (width > 400px) { nav { margin: 0 auto; animation-name: slide; margin: 0; } } transiti
  INCUMBENT: {"ok":true,"value":[{"kind":"property","name":"--ratio","descriptor":{"syntax":"<number>","inherits":false,"initialValue":{"kind":"scalar","payload":{"type":"number","value":1,"unit":""}}}},{"kind":"style","selectors":["h1","h2"],"declarations":[],"children":[…
  CAND-JS:   {"ok":true,"value":[{"kind":"property","name":"--ratio","descriptor":{"syntax":"<number>","inherits":false,"initialValue":{"kind":"scalar","payload":{"type":"number","value":1,"unit":""}}}},{"kind":"style","selectors":["h1","h2"],"declarations":[],"children":[…
  js≡wasm:   true

#44 parseStylesheet [ID-1b] DIVERGENT_VALUE
  input: "  @property --ratio { syntax: \"<number>\"; inherits: false; initial-value: 1 } h1, h2 {/* c */ img { @container (width > 400px) { nav { margin: 0 auto; animation-name: slide; margin: 0; } } transiti
  INCUMBENT: {"ok":true,"value":[{"kind":"property","name":"--ratio","descriptor":{"syntax":"<number>","inherits":false,"initialValue":{"kind":"scalar","payload":{"type":"number","value":1,"unit":""}}}},{"kind":"style","selectors":["h1","h2"],"declarations":[],"children":[…
  CAND-JS:   {"ok":true,"value":[{"kind":"property","name":"--ratio","descriptor":{"syntax":"<number>","inherits":false,"initialValue":{"kind":"scalar","payload":{"type":"number","value":1,"unit":""}}}},{"kind":"style","selectors":["h1","h2"],"declarations":[],"children":[…
  js≡wasm:   true

distinct cells: 44
```

## Appendix B — the minimal-variant probe behind §2.5 and §6

⟨cmd⟩ `node <scratch>/probe-id1b.mjs` and `node <scratch>/probe-name.mjs`, same oracle and surfaces.
Run twice, byte-identical.

```

[#30 as-is] "b { col!r: rgb(9. none -76 / 0.) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"col!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels
   CAND: REJECT [0,34) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { col!r: rgb(9. none -76 / 0.) }"  (js≡wasm)

[#30 name only] "b { col!r: rgb(9 none -76 / 0) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"col!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"col!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels  (js≡wasm)

[#30 value only] "b { color: rgb(9. none -76 / 0.) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels
   CAND: REJECT [0,34) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { color: rgb(9. none -76 / 0.) }"  (js≡wasm)

[#32 rule2 as-is] "a { border-colo!r: hsl(50% 1e-366 67.310) }"
   INC : ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"border-colo!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","
   CAND: REJECT [0,43) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="a { border-colo!r: hsl(50% 1e-366 67.31  (js≡wasm)

[#32 name only] "a { border-colo!r: hsl(50 1e-366 67.310) }"
   INC : ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"border-colo!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","
   CAND: ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"border-colo!r","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","  (js≡wasm)

[#32 value only] "a { color: hsl(50% 1e-366 67.310) }"
   INC : ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl","channels
   CAND: REJECT [0,35) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="a { color: hsl(50% 1e-366 67.310) }"  (js≡wasm)

[#35 as-is] "b { backgr!und-color: oklch(3e-440 7e-206 4.deg) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"backgr!und-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"okl
   CAND: REJECT [0,50) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { backgr!und-color: oklch(3e-440 7e-2  (js≡wasm)

[#35 name only] "b { backgr!und-color: oklch(3e-440 7e-206 4deg) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"backgr!und-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"okl
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"backgr!und-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"okl  (js≡wasm)

[#35 value only] "b { color: oklch(3e-440 7e-206 4.deg) }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"oklch","channe
   CAND: REJECT [0,39) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { color: oklch(3e-440 7e-206 4.deg) }  (js≡wasm)

[#36 rule1 as-is] "b { background-color: hsl(141.1656975513324turn 2. 53.62424335908145) !important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl
   CAND: REJECT [0,82) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { background-color: hsl(141.165697551  (js≡wasm)

[#36 rule1 value 2 not 2.] "b { background-color: hsl(141.1656975513324turn 2 53.62424335908145) !important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hsl  (js≡wasm)

[#36 rule2 as-is] "a, b { border-!olor: rgb(+16 -0 395) }"
   INC : ACCEPT [{"kind":"style","selectors":["a","b"],"declarations":[{"name":"border-!olor","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb
   CAND: ACCEPT [{"kind":"style","selectors":["a","b"],"declarations":[{"name":"border-!olor","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb  (js≡wasm)

[#37 rule1 alone] "b { background-color: oklch(.369 3e53 7e202turn / -137) }"
   INC : REJECT [0,33) ["scalar"] actual="oklch(.369 3e53 7e202turn / -137)"
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"okl  (js≡wasm)

[#37 alpha -137 only] "b { background-color: oklch(.369 0.1 10 / -137) }"
   INC : REJECT [0,25) ["scalar"] actual="oklch(.369 0.1 10 / -137)"
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"okl  (js≡wasm)

[#37 rule2 name only] "a { backgr!ound-color: rgb(42.187 none -0 / 0.5) }"
   INC : ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"backgr!ound-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rg
   CAND: ACCEPT [{"kind":"style","selectors":["a"],"declarations":[{"name":"backgr!ound-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rg  (js≡wasm)

[#40 as-is] "b { background-color: var(--brand) -!important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"list","separator":"space","items":[{"kind":"call","name
   CAND: REJECT [0,48) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { background-color: var(--brand) -!im  (js≡wasm)

[#40 spaced] "b { background-color: var(--brand) - !important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"list","separator":"space","items":[{"kind":"call","name
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"background-color","value":{"kind":"list","separator":"space","items":[{"kind":"call","name  (js≡wasm)

[#40 red -!important] "b { color: red -!important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"color","value":{"kind":"list","separator":"space","items":[{"kind":"scalar","payload":{"ty
   CAND: REJECT [0,28) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="b { color: red -!important }"  (js≡wasm)

[#40 red !important] "b { color: red !important }"
   INC : ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels
   CAND: ACCEPT [{"kind":"style","selectors":["b"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channels  (js≡wasm)

[#41 as-is] "#d { background-color: hsl(73.416 -338 -290)!important }"
   INC : ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hs
   CAND: REJECT [0,56) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="#d { background-color: hsl(73.416 -338   (js≡wasm)

[#41 spaced] "#d { background-color: hsl(73.416 -338 -290) !important }"
   INC : ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hs
   CAND: ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"hs  (js≡wasm)

[#41 red!important] "#d { color: red!important }"
   INC : ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channel
   CAND: REJECT [0,27) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="#d { color: red!important }"  (js≡wasm)

[#41 red! important] "#d { color: red! important }"
   INC : REJECT [0,4) ["scalar"] actual="red!"
   CAND: REJECT [0,28) ["<open-paren>","<qualified-rule-prelude> (any character but '{', '}'  actual="#d { color: red! important }"  (js≡wasm)

[#41 red!IMPORTANT] "#d { color: red !IMPORTANT }"
   INC : ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channel
   CAND: ACCEPT [{"kind":"style","selectors":["#d"],"declarations":[{"name":"color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rgb","channel  (js≡wasm)

[alpha -1 color] "rgb(0 0 0 / -1)"
   INC : REJECT [0,15) ["color_out_of_range"] actual="rgb(0 0 0 / -1)"
   CAND: ACCEPT {"space":"rgb","channels":[0,0,0],"alpha":0}  (js≡wasm)

[alpha 1.5 color] "rgb(0 0 0 / 1.5)"
   INC : REJECT [0,16) ["color_out_of_range"] actual="rgb(0 0 0 / 1.5)"
   CAND: ACCEPT {"space":"rgb","channels":[0,0,0],"alpha":1}  (js≡wasm)

[alpha -137 oklch] "oklch(.369 0.1 10 / -137)"
   INC : REJECT [0,25) ["color_out_of_range"] actual="oklch(.369 0.1 10 / -137)"
   CAND: ACCEPT {"space":"oklch","channels":[0.369,0.1,10],"alpha":0}  (js≡wasm)

[#39 as-is] ".c { background-color: rgb(-0 .504 6e-128 / 9e-415) } GARBAGE ) ;(#d { background-color: #eFEbC78B }"
   INC : ACCEPT [{"kind":"style","selectors":[".c"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":{"space":"rg
   CAND: REJECT [54,65) ["<open-paren>","<qualified-rule-prelude> (any character but '{' or '; actual="GARBAGE ) ;"  (js≡wasm)

[#39 tail alone] "GARBAGE ) ;(#d { background-color: #eFEbC78B }"
   INC : ACCEPT [{"kind":"style","selectors":["GARBAGE ) ;(#d"],"declarations":[{"name":"background-color","value":{"kind":"scalar","payload":{"type":"color","value":
   CAND: REJECT [0,11) ["<open-paren>","<qualified-rule-prelude> (any character but '{' or '; actual="GARBAGE ) ;"  (js≡wasm)

[#39 unclosed paren only] "(#d { background-color: #eFEbC78B }"
   INC : REJECT [0,35) ["rule"] actual="(#d { background-color: #eFEbC78B }"
   CAND: REJECT [0,35) ["<open-paren>","<balanced-tail-text> (any character but '(' or ')')", actual="(#d { background-color: #eFEbC78B }"  (js≡wasm)

"a { backgr!ound-color: red }"                                 inc: backgr!ound-color            js: backgr!ound-color            wasm: backgr!ound-color 
"a { backgr!und-color: red }"                                  inc: backgr!und-color             js: backgr!und-color             wasm: backgr!und-color 
"a { backgr!ound-colo: red }"                                  inc: backgr!ound-colo             js: backgr!ound-colo             wasm: backgr!ound-colo 
"a { b!ound: red }"                                            inc: b!ound                       js: b!ound                       wasm: b!ound 
"a { x!oundy: red }"                                           inc: x!oundy                      js: x!oundy                      wasm: x!oundy 
"a { col!r: red }"                                             inc: col!r                        js: col!r                        wasm: col!r 
"a { col!or: red }"                                            inc: col!or                       js: col!or                       wasm: col!or 
"a { color!: red }"                                            inc: color!                       js: color!                       wasm: color! 
"a { !color: red }"                                            inc: !color                       js: !color                       wasm: !color 
"a { co!lor: red }"                                            inc: co!lor                       js: co!lor                       wasm: co!lor 
"a { c!olor: red }"                                            inc: c!olor                       js: c!olor                       wasm: c!olor 
"a { backgr!ound-color: rgb(1 2 3) }"                          inc: backgr!ound-color            js: backgr!ound-color            wasm: backgr!ound-color 
"a { backgr!ound-color: rgb(42.187 none -0 / -116) }"          inc: REJECT@0-26                  js: backgr!ound-color            wasm: backgr!ound-color 
"a { col!r: rgb(42.187 none -0 / -116) }"                      inc: REJECT@0-26                  js: col!r                        wasm: col!r 
"a { colo!r: rgb(9. none -76 / 0.) }"                          inc: colo!r                       js: REJECT@0-35                  wasm: REJECT@0-35 
"a { color: red !important }"                                  inc: color                        js: color                        wasm: color 
"a { color: red!important }"                                   inc: color                        js: REJECT@0-26                  wasm: REJECT@0-26 
incumbent oklch range labels:
   oklch(.369 3e53 7e202turn / -137) → {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":33,"expected":["color_out_of_range"],"actual":"oklch(.36
   oklch(.369 3e53 7e202turn) → {"ok":true,"value":{"space":"oklch","channels":[0.369,3e+53,2.52e+205],"alpha":1},"diagnostics":[]}
   oklch(.369 0.1 10 / -137) → {"ok":false,"diagnostics":[{"code":"css_syntax","start":0,"end":25,"expected":["color_out_of_range"],"actual":"oklch(.36
   oklch(.369 3e53 10) → {"ok":true,"value":{"space":"oklch","channels":[0.369,3e+53,10],"alpha":1},"diagnostics":[]}
   oklch(.369 0.1 7e202turn) → {"ok":true,"value":{"space":"oklch","channels":[0.369,0.1,2.52e+205],"alpha":1},"diagnostics":[]}
```
