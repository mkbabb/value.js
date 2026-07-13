# V · pass-2 · CHARTER-C — the D3 typed-diagnostics DIMENSION (F4) + the corrected battery

**Lane**: pass-2 Charter-C (AGGLOMERATION §3 · charter C). **Mode: RAN** — every number below
measured in an ISOLATED worktree at `tranche-u` HEAD (`9423094` at reset; the src proto is evidence
only, NEVER merged — diffs-as-stats + suite exits + gate runs). **Model**: opus (declared).
**Author**: charter-c lane. Reads over: `spec-f4` / `proto-f4` / `spec-f5` / `proto-f5` / `critique-f5`
(pass-1) **and the pass-2 `critiques/retro-f4.md`** (which docked F4 44%→36% with four load-bearing
findings that bear directly on this charter — G1 #11 cost, G2 memoize over-scope, G4 masking-fallback,
G5 dead sink). This lane HONORS the retro: where my charter's item-1 wording conflicts with a
retro finding measured on disk, the measurement wins and the record says so.

Base: worktree reset to `tranche-u` (the V docs + the CURRENT parsing source — the parsing tree moved
94 lines in `parsing/index.ts` between the proto's `6abef80`/`0feb0f4` and HEAD, so proto numbers were
NOT reused; everything here is re-measured on HEAD). `npm ci` clean; `npm run build` exit 0.

---

## §0 Headline — three items RAN; the fork is SPLIT (not "settled by memoize"), the battery culls to 7

| Item | verdict | the decisive measured fact |
|---|---|---|
| **1 · diagnostics fork + #11** | **RAN — resolved by SPLITTING the fork (retro-f4 G2 upheld)** | the memoize forcing-fn decides ONLY sink-vs-embed; the owner-law axis (warn-vs-fail-closed) is decided per-site by CSS semantics: **fail-closed where the grammar auto-recovers, embed-warn only where the drop is spec-MANDATED**. #11 renamed (14/7, typecheck 0) + **re-costed as a kf-coupled 2.0.0 MAJOR**, not "0 callers" |
| **2 · remaining lossy classes** | **RAN — 1 closed, 1 REFUTED as non-lossy, 1 closed** | `parseCSSValues` partial-recovery → fail-closed (sink fires 3/6, was 0/6); the `.map()`-closure drop → embed-in-return (survives the memoize cache); **`kind:"unknown"` MEASURED NOT lossy** (verbatim forward-compat capture; fail-closed would reject every real `@media`) |
| **3 · the corrected battery** | **RAN — 7 authored + run; honest 6 GREEN / 1 born-RED** | 10 → **7** confirmed by applying the overfit rubric per-gate; `barrel-pure` is a DERIVED runtime-purity property (RED set `{parsing,units,quantize}` computed per run); `grammar-fuzz` born-RED (#9/#11) at HEAD → GREEN under this charter's fixes; META-gate DROPPED |

**Change surface (diff-as-stats, prototype — NEVER merged)**: `git diff --numstat -- src/` = **8 files,
+68 / −17**. The #11 rename is 7 files (14 occurrences, pure rename); the diagnostics wiring is
`parsing/index.ts` (+16/−1), `stylesheet-types.ts` (+21/−2), `stylesheet.ts` (+23/−6). No file crosses
any ceiling; every change is additive or a rename. Two new gate scripts authored (`proof-barrel-pure.mjs`
7.4 KB, `proof-grammar-fuzz.mjs` 7.5 KB — worktree-only).

**Suite exits (HEAD + all fixes, in-worktree)**: `vitest` parsing **388/388**; full unit suite
**2326/2326** (85 files — the rename touches the root barrel + `subpaths/parsing.ts`, zero regression);
`vue-tsc` lib **exit 0**, demo **exit 0**.

---

## §1 · Item 1 — the diagnostics fork RESOLVED by splitting it; #11 landed + re-costed

### §1.1 The fork was CONFLATED — retro-f4 G2 is upheld, and it sharpens the resolution

The charter (AGGLOMERATION C1) and the pass-1 spec present ONE fork ("sink vs embed vs fail-closed").
The retro correctly shows this is **two orthogonal axes**, and measuring them separately is what makes
the resolution owner-law-clean rather than a masking soft-add:

- **Axis A — sink vs embed** (a mechanics question, memoize-decided). PROVEN, re-measured on HEAD with
  the real `src/utils.ts` `memoize`: a would-be success-path sink fires **1 time across 2 identical
  calls** (dead on the cache HIT — `func` is not invoked); a diagnostic **embedded in the return rides
  the cached value and survives every hit**. So for the memoized entries (`parseCSSValue`
  `parsing/index.ts:542`, `parseCSSStylesheet` `stylesheet.ts:637`, both `keyFn:(i)=>i`), IF a
  diagnostic must appear on success, embed-in-return is strictly more correct than a sink.
- **Axis B — warn (keep-and-surface) vs fail-CLOSED (no masking)** (the owner-law question §0: "no
  masking fallbacks"). The memoize argument is **silent** on this axis (retro G2). It is decided
  **per contested site, by CSS semantics**:
  - where the drop is **spec-MANDATED** (`@keyframes` `!important` — CSS Animations §3 says the decl "is
    ignored"; you cannot fail the stylesheet closed), fail-closed is **spec-invalid** → the only honest
    move is embed-warn (Axis A then forces embed over a dead sink);
  - where the grammar **auto-recovers on non-spec-mandated garbage** (`parseCSSValues` partial-validity),
    fail-CLOSED is the owner-aligned break — the silent partial becomes a reported hard failure, **no
    masking**.

This dissolves retro-f4 **G4** (the "additive soft-add IS a masking fallback" charge) for the contested
class: I do **not** ship the additive soft-add as the general answer. Fail-closed (no masking) is the
answer wherever the drop is not spec-forced; embed-warn survives ONLY at the single spec-mandated site.

### §1.2 Axis A — embed-in-return for the memoized `@keyframes !important` drop (MEASURED)

`liftKeyframeMetadata` (the `.map()` closure at `stylesheet.ts:222`) now emits a `StylesheetDiagnostic`
(`{severity, message, property?}` — deliberately lighter than the combinator-seam `ParseDiagnostic`; the
post-parse closure has no parse offset) embedded on `KeyframeRule.diagnostics`. Measured via
`parseCSSStylesheet("@keyframes k { 0% { opacity: 0; color: red !important; } }")`:

```
cold-miss  declarations : ["opacity"]                         (color !important still dropped — spec-mandated)
cold-miss  diagnostics  : [{severity:"warning", property:"color", message:"Dropped …"}]
cache-hit  same cached ref? true                              (parseCSSStylesheet is memoized)
cache-hit  diagnostics present? true                          (SURVIVES the cache hit — the Axis-A proof)
control (no !important)   diagnostics: undefined              (non-lossy shape byte-identical to pre-V)
```

The drop stays (spec-faithful); it stops being SILENT; the diagnostic rides the cached AST.

### §1.3 Axis B — `parseCSSValues` fail-closed + threaded sink (MEASURED; retro-f4 G5 answered)

retro-f4 **G5**: the charter's "threaded sink for the non-memoized `parseCSSValues`" is a **proven DEAD
channel** (`sepBy` auto-recovers to `[]`, so `tryParse` never sees `state.isError` — 0/6 at HEAD). This
is **true and I confirm it** — and it is why the sink alone was never the answer. The charter's OWN third
prong ("grammar-fail-closed where the grammar auto-recovers") is what makes the sink live: I added
`.eof()` to the `parseCSSValues` parser (partial consumption → hard failure) AND threaded the sink. The
two together, measured:

```
input        sinkFired  threw   offset          (proto/retro measured 0/6 firing at HEAD)
")("         true       true    0
"rgb("       true       true    4
"calc(1 +"   true       true    8
"@@@"        false      false   —               ← total-consumed as a permissive string value
"1px @ bad"  false      false   —               ← total-consumed
"///"        false      false   —               ← total-consumed
=> 3/6 fire (the PARTIAL-recovery class); legitimate inputs unaffected:
   "10px" · "scale(2) rotate(45deg)"→"scaleX(2) scaleY(2) rotateZ(45deg)" · "1px 2px 3px" · "red, blue" all parse
```

**The honest, sharper finding** (beyond both the proto and the retro): `.eof()` fail-closed converts the
**partial-recovery** class (unconsumed tail: `)(`, `rgb(`, `calc(1 +`) into a reported failure — that is
the class retro-G5 named. But it exposes a SECOND, distinct class the retro did not separate: inputs the
value grammar **totally consumes** as permissive string ValueUnits (`@@@`, `///`, `1px @ bad`) still
succeed silently — there is no unconsumed tail for `.eof()` to catch. Closing THOSE requires tightening
the value grammar to reject bare `@`/`/` tokens, a deeper change with real blast risk (it would reject
legitimate arbitrary CSS idents). **I flag it, I do not force it** — the fail-closed `.eof()` is the
correct, no-regression close of the partial class (388/388 hold); the permissive-string class is a
separate grammar-tightening decision, out of scope for a diagnostics pass.

### §1.4 #11 rename — landed on HEAD, and RE-COSTED as a kf-coupled MAJOR (retro-f4 G1)

Applied word-boundary across the 7 files: **0 bare `PropertyDescriptor`, 14 `CSSPropertyDescriptor`**;
`vue-tsc` lib + demo **exit 0**; parsing 388/388; the dist `.d.ts` (`index.d.ts`, `subpaths/parsing.d.ts`)
now export the collision-free name.

**But "0 external callers / cheap / same-major" is FALSE on disk — retro-f4 G1 confirmed, verbatim from
the READ-ONLY sibling**: keyframes.js imports `type PropertyDescriptor` from `@mkbabb/value.js/parsing`
at **4 sites** (`animation/compile/adapter.ts:1`, `emit/format-options.ts:20`,
`engine/css/css-animation.ts:12`, `engine/css/metadata.ts:31`) and uses it in **public `Map<string,
PropertyDescriptor>` signatures** (`css-animation.ts:169`, `metadata.ts:127`, `adapter.ts:90`,
`format-options.ts:140`). kf's `docs/tranches/S/KF-VALUEJS-2.0.0.md §KF-7` already DISPATCHES this rename:
value.js exports the collision-free name **on the 2.0.0 grammar-rename cadence**; kf re-points its import
+ `Map<>` types at the value.js **`^2.0.0` re-pin**; the leak is consumer-observable (API-Extractor
mangles the current name to `PropertyDescriptor_2` in `dist/keyframes.d.ts`). **So #11 is a value.js
2.0.0 MAJOR coupled to a named kf re-point + a standing BH/BI relay obligation** (MEMORY) — NOT a
value.js-local freebie. The rename is still right (it cures the real `PropertyDescriptor_2` mangle); this
charter books it at its TRUE price.

### §1.5 The "kf VJ regression corpus" run

= the 11-input A6 corpus, run as `proof:grammar-fuzz` against the BUILT dist (§3.4): **14/14 GREEN** in
the fixed worktree; **born-RED at unfixed HEAD** (#9 silent-drop + #11 bare-name both RED). Full VJ
disposition table in §3.4.

---

## §2 · Item 2 — the remaining lossy-success classes (RAN)

| class | pass-1 status | this charter (MEASURED) |
|---|---|---|
| `@keyframes !important` `.map()` drop | closed in proto (0feb0f4, unmerged) | **re-closed on HEAD** via embed-in-return (§1.2) — the "deep `.map()`-closure rewire": the drop lives in `liftKeyframeMetadata`'s `.map()` with no top-level-sink reach, so the diagnostic MUST ride the returned rule; measured to survive the memoize cache |
| `parseCSSValues` partial-recovery | OPEN (proto §7.2) | **closed** via fail-closed `.eof()` + sink (§1.3) — 3/6 partial class now reported; residual permissive-string class flagged, not forced |
| `kind:"unknown"` at-rule capture | asserted lossy (spec §3 / retro G2 "fail-closed is a live option") | **REFUTED as lossy — MEASURED** ↓ |

**`kind:"unknown"` is NOT a lossy-success class** — measured against `stylesheet.ts:412` `unknownBody`:

```
@media (min-width: 700px) { .a { color: red; } }
  → kind="unknown"  atName="media"  prelude="(min-width: 700px)"  children=1 (nested {kind:"style", selectors:[".a"]})
@layer base;
  → kind="unknown"  atName="base"  prelude="base"  body=null
```

`atName`, `prelude`, and the recursively-parsed `children` are **all retained — nothing is dropped**. An
unknown at-rule is captured VERBATIM (the codebase's division-of-labour law); this is forward-compat
CORRECT (value.js has no typed arm for `@container`/`@supports`, but must not lose them). **Fail-closed
here would reject every real `@media`/`@container`/`@supports` stylesheet** — the opposite of the owner's
intent. The honest close: this is unvalidated-but-complete capture, not a silent drop; it needs no
diagnostic and MUST NOT fail closed. This corrects the spec's classification (and narrows retro-G2's
"contested cases" from two to one — only `parseCSSValues` was genuinely contested, and §1.3 closes it).

---

## §3 · Item 3 — the enforcement battery CORRECTED to 7 (RAN)

### §3.1 The arithmetic: 10 → 7 (not "flat at 10"), by APPLYING the rubric, not asserting it

`test:dist` chains **10** gates at HEAD (verified: `dts-surface · css-parity · round-trip-idempotent ·
perf-target · serialize-fidelity · subpath-budget · lib-correctness · barrel-parity · pack-manifest ·
close-ledger`). The repo's ratified **Q13 floor is 5** (the behavioral set). F5's "10 → 10 flat"
entrenches a 5-gate re-growth (critique-f5 G1). The owner-aligned arithmetic is **10 → 7 = Q13-five +
`barrel-pure` + `grammar-fuzz`**. To reach 7, five current gates must be excised. I applied the overfit
rubric **per gate** rather than cherry-pick, and ran each to record its live state:

**Rubric (distilled from the Q13 precedent, CLAUDE.md)**: KEEP iff the gate guards a BEHAVIORAL
correctness invariant of the SHIPPED library that the type system + eslint + review + the vitest source
suite cannot carry. EXCISE iff it is (a) config-/ceremony-coupled, (b) a type-surface/publish-shape check
tsc + consumer-typecheck already carry, (c) a dist-mirror redundant with the vitest source suite, or (d)
tranche bookkeeping.

| gate | LoC | state (RAN) | rubric verdict | residual risk the excision accepts |
|---|---|---|---|---|
| **css-parity** | — | GREEN 8/8 | **KEEP** (Q13 behavioral floor) | — |
| **round-trip-idempotent** | — | GREEN 6/6 | **KEEP** (Q13) | — |
| **perf-target** | — | GREEN 2/2 | **KEEP** (Q13) | — |
| **serialize-fidelity** | — | GREEN 4/4 | **KEEP** (Q13) | — |
| **subpath-budget** | — | GREEN 11/11 | **KEEP** (Q13; the parse-that-free bundle floor) | — |
| **dts-surface** | 68 | GREEN | **EXCISE** (leans) — a single-symbol (`extractFunctions`) grep on the published `.d.ts`; the "dist-only scare" it locks is REFUTED by its own comment; tsc strict-zero on build + kf's consumer-typecheck + subpath-budget's resolve clauses carry the type surface | a build/rollup silently dropping a public type export while source compiles — narrow; caught by consumer typecheck + exports-map review |
| **lib-correctness** | 240 | GREEN 10/10 | **EXCISE — closest-to-keep** — genuinely BEHAVIORAL, but a per-defect dist-MIRROR of `test/tranche-u-lib.test.ts` (its own header); the Q13-five carry the general behavioral floor against dist, the source suite carries the per-defect assertions | a dist-only behavioral corruption that source passes but the general dist gates miss — small (round-trip/css-parity/serialize-fidelity already run against dist) |
| **pack-manifest** | 106 | GREEN | **EXCISE** (leans) — a packaging/config guard (asserts `package.json` `files` negation-glob) — the config-coupled ceremony the owner's D4 attacks; the real 4.3 MB-demo defect is a one-time fix | someone re-broadening `files` — caught by the RELEASE publish ceremony + diff review |
| **barrel-parity** | 194 | GREEN | **EXCISE** (F5-named) — a narrow subpath-symbol-set regression, superseded by subpath-budget's bundle trace + review | a subpath/root symbol-set drift — caught by subpath-budget + review |
| **close-ledger** | 300 | GREEN | **EXCISE** (F5-named) — a 300-LoC tranche-ceremony "zero-silent-drop" ledger audit; pure bookkeeping, the exact overfit the owner attacks | — (not a library correctness invariant) |

**Net: 10 − 5 + 2 = 7.** Honest caveat (not smoothed): **`lib-correctness` is a legitimate keep-candidate**
— it is behavioral, it bites, and a stricter reading that values the dist-mirror over the source-suite
redundancy would retain it (→ 8). I present the 7 as the owner-aligned floor and name the 8-candidate;
the disposition is a one-time judgment, routed with the evidence, not asserted as inevitable.

**The META-gate is DROPPED** (critique-f5 G1/G8): a gate that COUNTS gates is config-coupled ceremony
that LOCKS the re-grown count and can never fire below its ceiling. The cull is a one-time disposition +
review, NOT a perpetual gauge. Never authored.

### §3.2 `proof:barrel-pure` — a DERIVED runtime-purity property (authored + RUN)

Authored `scripts/gates/proof-barrel-pure.mjs`. Rule: an `**/index.ts` barrel is IMPURE iff it declares
any OWN runtime export (`export const/let/var/function/class/enum/namespace`, or a local `export {x}`
without `from`); `export type`, `export … from`, `export * from` are pure. **The RED set is COMPUTED per
run and printed as evidence — it is NEVER compared to a hardcoded membership list** (critique-f5 G6 /
AGGLOMERATION §4: the spec's hardcoded `{src/index.ts, parsing, units}` is FALSE at HEAD). RUN:

```
SELF.1–5 (bites): pure re-export→PURE · type-only→PURE · const/class/fn/enum→IMPURE ·
                  local `export {x}` no-from→IMPURE · a comment `export const`→NOT tripped   [5/5 PASS]
barrels scanned: 10 · PURE: 7 · IMPURE (RED set, DERIVED): 3
  ✗ src/parsing/index.ts   (own-decls=10, local-value-exports=0)
  ✗ src/quantize/index.ts  (own-decls=2,  local-value-exports=0)
  ✗ src/units/index.ts     (own-decls=3,  local-value-exports=0)
GATE RED (born-RED as designed) — exit 1
```

The derived set `{parsing, units, quantize}` matches AGGLOMERATION §4 EXACTLY; `src/index.ts` is PURE (0
own decls). The gate distinguishes a self-test failure ("GATE BROKEN") from the property failure ("GATE
RED born-RED"). It stays born-RED under this charter — the carve of those 3 barrels into kind-named
siblings is Charter A/B EXECUTION, not this lane's; I authored + verified the fence, I did not carve.

### §3.3 `proof:grammar-fuzz` — the 11 A6 tripwires (authored + RUN both states)

Authored `scripts/gates/proof-grammar-fuzz.mjs` — the VJ corpus against the BUILT `dist/value.js`
(serialize-fidelity philosophy). EN-a discipline: round-trip clauses assert SEMANTIC survival, not
`in===out` (a self-round-trip is blind to `parseCSSValue("1px solid red")=>"1px"`). Two self-test bites
(a TRUE check must pass; a FALSE check must fail) gate the harness.

| # | VJ | check | HEAD (unfixed) | fixed |
|---|---|---|---|---|
| 1 | VJ-L3 | `scale(2) rotate(45deg)` both fns survive | GREEN | GREEN |
| 2a | VJ-Q9 | `oklch(0.6 none 200)` none kept, no NaN | GREEN | GREEN |
| 2b | VJ-Q9 | `color(display-p3 1 0 0)` wrapper kept | GREEN | GREEN |
| 3 | KF-1 | `@function --foo` parses (no garbage mirror) | GREEN | GREEN |
| 4 | VJ-Q6 | `--double(2)` FunctionValue round-trips | GREEN | GREEN |
| 5 | VJ-Q7 | `if()` keeps all 3 branch tokens | GREEN | GREEN |
| 6 | VJ-Q1 | `contrast-color(red)` → `rgb(0 0 0)` | GREEN | GREEN |
| 7 | VJ-Q4 | FunctionValue provenance survives `clone` | GREEN | GREEN |
| 8 | kf-U | unitless `1.5` not NaN-boxed | GREEN | GREEN |
| 10 | VJ-L2 | `linear(0, 0.5 50%, 1)` idempotent | GREEN | GREEN |
| **9** | **kf#9** | `@keyframes !important` drop surfaces a diagnostic | **RED** | **GREEN** |
| **11** | **KF-7** | dist `.d.ts` free of bare `PropertyDescriptor` | **RED** | **GREEN** |

**Born-RED PROVEN by the flip** (`git stash push -- src/` + rebuild): unfixed → exit 1 (#9 "no
diagnostic surfaced — silent lossy success", #11 "bare PropertyDescriptor in `dist/index.d.ts`,
`dist/subpaths/parsing.d.ts`"); fixed → exit 0, **14/14**. The #9 tripwire is the runnable behavioral
form of the bug (the §1.2 embed), NOT the dead `parseCSSValues` sink — the honest flip-able shape.

### §3.4 The full 7-battery run — honest mix (6 GREEN / 1 born-RED)

```
css-parity            GREEN  8/8       │ round-trip-idempotent GREEN  6/6
perf-target           GREEN  2/2       │ serialize-fidelity    GREEN  4/4
subpath-budget        GREEN  11/11     │ barrel-pure           born-RED (3 impure: parsing/units/quantize)
grammar-fuzz          GREEN  14/14 (fixed) / born-RED #9,#11 (unfixed HEAD)
```

`barrel-pure` is born-RED because its cure (the barrel carves) is Charter A/B execution; `grammar-fuzz`
is GREEN precisely because THIS charter closed its #9/#11 targets. This is the designed born-RED slate:
the gates that fence THIS lane's work flip GREEN; the gate that fences the layout lanes stays RED until
they run.

### §3.5 `barrel-cycle` — runtime edges only (a note, not one of the 7)

`barrel-cycle` is NOT in the 7 (it is CI-only, like the incumbent `size-graph`). The charter's standing
correction holds: when it runs it must classify on RUNTIME edges (type-erased under
`verbatimModuleSyntax`) — the type-only edges bridge the two true runtime SCCs into one 28-node madge
blob (proto-f5 §2). Wiring + validating that scanner is Charter B's banked-F2 substrate, not this lane.

---

## §4 · Owner-reserved forks (PRESENTED, not decided)

1. **The `@`-ban idiom** — eslint `no-restricted-imports` (incumbent, IDE-native, 0-FP, but misses the 10
   dynamic `import()` sites + breaks glass-ui's "never ESLint" law F1 adopts) vs a device-free `proof:*`
   grep (idiom-compliant, but 15 prose-FP + no IDE). **Owner-reserved.** Note: the two gates THIS lane
   authored (`barrel-pure`, `grammar-fuzz`) are device-free `proof:*` — consistent with glass-ui's idiom
   for STRUCTURAL gates — but the `@`-ban specifically stays the owner's fork; I do not pre-decide it.
2. **The api vocabulary** — `routes/service/repository` (measured-clean L-variant) vs `api/model/lib`
   (constellation uniformity). Not this lane's surface (Charter A); flagged owner-reserved.
3. **[surfaced by retro-f4 G4] The `{value,diagnostics}` clean boundary vs the additive soft-add** — this
   charter LARGELY dissolves it (§1.1): fail-closed (no masking) is the general answer; embed-warn
   survives ONLY at the single spec-mandated `!important` site where fail-closed is spec-INVALID. The
   **narrow residual** owner question: for that one spec-forced drop, is an embedded warning acceptable,
   or must the full top-level `{value,diagnostics}` return (breaking: `r4` measured 491 sites, a 2.0.0
   major) be adopted so a lossy parse cannot be read as a plain success? I PRESENT it at its true, narrow
   scope (one site, not the retro's 491-site framing) and route it alongside the two forks above — I do
   not force the full boundary, and I do not ship the soft-add as the general answer.

---

## §5 · Honest frictions + weaknesses (measured)

1. **Fork B closes the partial class, not the permissive-string class.** `.eof()` fail-closed fires the
   sink on 3/6 garbage (unconsumed tail); the other 3/6 (`@@@`, `///`, `1px @ bad`) are totally consumed
   as permissive string ValueUnits and still succeed silently. Closing them is a value-grammar tightening
   with real blast risk — flagged, deliberately not forced in a diagnostics pass.
2. **#11 is a MAJOR, not a freebie.** The single most-confident pass-1 claim ("0 external callers") is
   false on disk (4 kf sites); this charter re-costs it as a kf-coupled 2.0.0 + BH/BI relay. The rename
   is landed on HEAD and typecheck-clean, but its LANDING is owner-gated on the coupled U-ratify/T-close
   MAJOR event, not this lane's to merge (and per fences, nothing here merges).
3. **`barrel-pure` regex-not-AST.** It comment-strips then regex-scans (5/5 bites, matches the corpus
   exactly), but a pathological `export{X}` split across an odd string literal could fool it; a landed
   gate should back the regex with a tiny TS AST pass (same nuance glass-ui's `.mjs` protos carry).
4. **`grammar-fuzz` is not a browser oracle.** Its clauses are semantic-survival checks; a
   spec-dead-but-self-consistent emission could still pass a clause. It is the tripwire skeleton, not the
   EN-a browser-actuated oracle the spec ultimately wants.
5. **The rubric excisions accept residual risk** (tabulated §3.1). Each rests on "tsc + review + the
   vitest source suite carry it" — the SAME justification Q13 used for its original 7-excision — but they
   ARE bets, and `lib-correctness` is a real keep-candidate a stricter reading would retain.
6. **Workflow friction (recorded for honesty):** an early bash `cd` targeted the MAIN tree instead of the
   isolated worktree; the misdirected src edits were reverted (`git checkout` on the 7 rename files; the
   unrelated pre-existing `D src/parsing/CLAUDE.md` was left untouched — not mine) and ALL work re-run in
   the worktree. The numbers above are all in-worktree at HEAD.

---

## §6 · Composition verdict (facts, not a ranking)

Charter-C confirms F4 as an owner-mandated **D3 DIMENSION**, not a shape family, and re-scopes it per
retro-f4 into a **measured, costed punch list**: (i) the diagnostics resolution — SPLIT into Axis-A
(memoize-settled embed) + Axis-B (owner-law fail-closed-vs-warn, decided per-site by CSS semantics),
which makes the deliverable owner-law-clean (no masking) rather than a soft-add; (ii) the `#11` rename —
landed + re-costed as a kf-coupled 2.0.0 MAJOR with the KF-7 relay; (iii) the corrected battery — 7
authored + run, `barrel-pure` a derived property, `grammar-fuzz` a proven born-RED, the overfit rubric
applied per-gate with residual risk named, the META-gate dropped. Two D3 gates (`barrel-pure`,
`grammar-fuzz`) fold into the standing enforcement battery over whichever shape (Charter A) + execution
(Charter B) win. Nothing native to D1; ratifies D2. **Run it as a composed layer, its payloads now proven
runnable on HEAD and its costs stated at their true price.**
