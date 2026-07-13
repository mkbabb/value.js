# V · pass-1 · PROTO — Family 4 · TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Prototyper**: pass-1 F4 proto (worktree `wf_cb377abc-406-13`, the lowest of the -13/-14/-15
batch = f4/f5/f6). **Family**: 4 · TYPE-ONTOLOGY. **Model**: opus (declared). **Mode: RAN**
(measured, isolated worktree; nothing merges — the deliverable is this evidence).

**Self-assignment note (read first)**: the orchestrator spawned this prototyper with the task
template variables (`${x.id}`/`${x.family}`/`${x.brief}`) UNSUBSTITUTED — the same broken fan-out
r1/r4/f1/f2 recorded. Self-assigned to **Family 4** by the worktree index: batch-1 (-10/-11/-12)
already committed protos f1/f2/f3; batch-2 is (-13/-14/-15) over the three uncovered families
(f4/f5/f6); -13 is the lowest → the first, TYPE-ONTOLOGY. Discharges `spec-f4.md §6`'s five
prototype obligations against value.js's actual HEAD.

**Environment**: `npm ci` clean (exit 0). **Base-drift reconciliation (measured, load-bearing)**:
the worktree was created at `6abef80`, but `6abef80` is a strict ANCESTOR of the current
`tranche-u` HEAD `0feb0f4` (`git merge-base --is-ancestor` → true) — the 10 intervening
`docs(V.pass-1 …)` commits also carried **670 src insertions / 284 deletions across 29 files**
(incl. the `parseCSSValues` addition + `units/index.ts` +35 that the spec/t4 measured). `6abef80`
lacks `parseCSSValues` entirely (`grep -c` = 0). To make my numbers comparable to the spec's
referent I `git reset --hard 0feb0f4` in the isolated worktree; every count below is against
`0feb0f4` (`units/index.ts` = 451 LoC, `parsing/index.ts` = 644 LoC — matching spec §4/§3). All
probes run via `npx vite-node proto-probes/*.ts` (imports `src/` directly, no rebuild per edit);
dist-based gates rebuild first. Probe scripts live in `proto-probes/` (untracked, throwaway).

---

## §0 Headline — all five §6 obligations RAN; the spec's obligation-2 assumption is REFUTED

| # | §6 obligation | verdict | the decisive measured fact |
|---|---|---|---|
| 1 | #8 unflatten no-NaN | **CONFIRMED CLOSED** | `unflat.opacity` isArray, `toString()="1.5"`, no NaN at the value.js surface |
| 2 | wire `onParseError` + memoize hazard | **RAN — spec REFUTED** | the sink is WIRED + typechecks, but is a **structurally DEAD channel on `parseCSSValues`** (0/6 garbage inputs fire it); memoize forcing-function PROVEN with the real `memoize` |
| 3 | lossy-success closure | **RAN — CLOSED (option 2)** | the `!important` drop now surfaces a `warning`; drop preserved; the diagnostic **survives the memoize cache hit** |
| 4 | #11 rename → typecheck 0 | **RAN — GREEN** | 14 renames / 7 files, 0 bare left; `npm run typecheck` exit 0; parsing 388/388; serialize-fidelity 4/4 |
| 5 | author + RUN `proof:grammar-fuzz` | **RAN — born-RED→GREEN** | HEAD: exit 1, 9 GREEN / 2 RED; post-fix: exit 0, 11 GREEN / 0 RED |

**Change surface (diff-as-stats)**: `git diff --numstat -- src/` = **8 files, 66 insertions /
16 deletions**. The rename is 7 files (14 occurrences); the diagnostics wiring is
`parsing/index.ts` (+10), `stylesheet-types.ts` (+24/-2), `stylesheet.ts` (+23/-6),
`stylesheet/index.ts` (+2/-1). No file crosses any ceiling; every change is additive or a pure
rename.

---

## §1 · Obligation 1 — #8 unflatten array-boxing (SPEC-ONLY → now CLOSED by execution)

`proto-probes/baseline.ts`, run against `src/`:

```
GREEN | #8 unflatten no-NaN | flat={"opacity":"1.5"} unflat.opacity isArray=true toString="1.5"
```

`flattenObject({ opacity: parseCSSValue("1.5") })` → `{ "opacity": [ValueUnit 1.5] }` (the array
IS the contract, `units/utils.ts:186` signature `Record<string, any[]>`); `unflattenObject` →
`opacity` is an Array whose `toString()` is `"1.5"`, **no NaN**. t4 partly ran this; it is now
CLOSED at the value.js public surface by direct execution — the NaN t4 attributed to the kf-U
consumer is NOT reproducible here. **This is a consumer-contract seam, not a value.js src defect**
— confirmed, not merely asserted.

## §2 · Obligation 2 — `onParseError` wired, and the spec's sufficiency claim REFUTED

**The wire (non-breaking, `parsing/index.ts` +10 LoC)**: added `onParseError?: utils.OnParseError`
to `ParseCSSValuesOptions` and threaded it as `tryParse`'s 3rd arg. `parseCSSValues` is a plain
`function` (not memoized), so the sink threads cleanly; `npm run typecheck` stays exit 0.

**The refutation (`proto-probes/after-fix.ts` §2a — the load-bearing finding)**: the spec (`§3`,
verdict-b) claims "threading `onParseError` is **sufficient + non-breaking for the FAILURE/throw
class**" on `parseCSSValues`. **Measured, it is a DEAD channel — `parseCSSValues` has no throw
class at all**:

```
input=")("         sinkFired=false returned garbage="" (len=0)
input="@@@"        sinkFired=false returned garbage="@@@" (len=1)
input="1px @ bad"  sinkFired=false returned garbage="1px @ bad" (len=3)
input="rgb("       sinkFired=false returned garbage="rgb" (len=1)
input="calc(1 +"   sinkFired=false returned garbage="calc" (len=1)
input="///"        sinkFired=false returned garbage="/ / /" (len=3)
=> 0/6 sink fires: the grammar recovers instead of failing.
```

`parseCSSValues` = `any(FunctionArgs, ValuesValue)` and `FunctionArgs = sepBy(Value)`; `sepBy`
succeeds with `[]` on no match (0 consumed), so `any(...)` **always** returns a (possibly-garbage)
`ValueArray` and `tryParse` **never** sees `state.isError`. The sink can therefore NEVER fire
through `parseCSSValues` on realistic garbage — the "failure/throw class" the spec relied on is
empty. The real defect on this surface is **silent partial-validity** (`"rgb("` → `rgb`,
`"calc(1 +"` → `calc` — data dropped, no signal), which a total-failure sink is the wrong shape to
catch. This is the same lossy-success sting the spec pins on `parseCSSStylesheet`, present on
`parseCSSValues` too.

**Positive mechanism proof (§2b)** — the plumbing IS correct; the same sink fires on a genuine
hard failure through the shared primitive:

```
parseResult(number,"abc") status=false sinkFired=true
  diagnostic={"message":"Parse error at offset -1 …","offset":-1,"line":1,"column":-1,"input":"abc"}
```

So the gap is localized to **grammar permissiveness**, not wiring. (Friction footnote: the fast
`number` parser reports `furthest = -1`, so `buildDiagnostic` emits `offset:-1` — a pre-existing
`parsing/utils.ts:541` edge where the fast-path never advances `furthest`; the sink still fires
correctly, only the offset is uninformative for that one primitive.)

**The memoize forcing function (§2b, PROVEN with the REAL `src/utils.ts` `memoize`)**:

```
sinkCalls after 2 identical calls = 1   (a success-path sink fires on COLD-MISS only)
r1===r2 (same cached ref)? true
embedded diagnostics survive the cache hit? ["lossy:aa"]   (present on the HIT)
```

A side-effect callback inside a `memoize`d entry is **structurally unsound**: on a cache hit the
inner fn is not invoked, so the sink never re-fires; a diagnostics array **embedded in the return**
is cached alongside the value and survives every hit. This is not aesthetics — for the memoized
public entries (`parseCSSValue`, `parseCSSStylesheet`), if diagnostics must appear on SUCCESS, the
`{ …, diagnostics }` return is strictly MORE correct than a sink. The spec's §3 "memoize forcing
function" is confirmed by direct execution.

## §3 · Obligation 3 — the lossy-success closure (option 2, embed-in-return) CLOSED

**Baseline (`proto-probes/lossy-baseline.ts`)** — the silent drop, measured at HEAD:

```
parsed 0% rule.declarations: ["opacity"]        (authored: opacity + color !important => 2)
declaration count after lift: 1                  (the !important 'color' is GONE)
any diagnostics field on the keyframes item? ABSENT
PROVEN LOSSY-SILENT: a spec-mandated drop with ZERO signal to the consumer.
```

**The closure** (`stylesheet.ts` `liftKeyframeMetadata` + `stylesheet-types.ts`): a new
`StylesheetDiagnostic { severity; message; property? }` is emitted as a `warning` when the
CSS-Animations §3 `!important` drop fires, **embedded on `KeyframeRule.diagnostics`** (additive,
optional). Measured (`after-fix.ts` §3):

```
cold-miss  rule[0].declarations: ["opacity"]          (still dropped — spec-mandated)
cold-miss  rule[0].diagnostics : [{severity:"warning", property:"color", message:"Dropped …"}]
cache-hit  same cached ref?  true                      (parseCSSStylesheet is memoized)
cache-hit  rule[0].diagnostics : [{…same object…}]     (SURVIVES the cache hit)
control (no !important): rule[0].diagnostics = undefined   (non-lossy shape byte-identical)
```

Three design facts this run establishes:
1. **Embed-in-return, not a sink** — because `parseCSSStylesheet` is memoized (§2), a sink would
   miss every cache hit; the embedded diagnostic rides the cached AST (proven: `ss1===ss2` and
   `diagnostics` is the same reference). The memoize forcing function *decides* option 2 here.
2. **No offset/line/column on the diagnostic** — deliberately. The drop happens in a **post-parse
   `.map()` closure** (`keyframeRule.map`) with NO access to the parse offset — the exact "the
   `.map()` closure has NO access to any top-level sink" limitation `spec §3` names. The lighter
   `StylesheetDiagnostic` shape is the honest type for a post-parse lossy event.
3. **Spec-faithful, additive** — the declaration is STILL dropped (§3 says "ignored"); "ignored"
   just stops being "silent". The non-lossy shape is unchanged (control → `undefined`), so no
   consumer that ignores `diagnostics` is affected.

**Scope honesty**: this closes the ONE canonical drop (`@keyframes !important`). The other lossy
branches (`stylesheet.ts` `kind:"unknown"` at-rule capture; the `parseCSSValues` partial-recovery
in §2) are NOT closed here — a full closure is the "DEEP internal rewire of `.map()` closures" the
spec warns of. This prototype proves the MECHANISM + the memoize-decides-the-shape argument on the
canonical case, not the whole surface.

## §4 · Obligation 4 — the #11 rename `PropertyDescriptor` → `CSSPropertyDescriptor`

Applied as a clean-break codemod (word-boundary `perl -pi`) across the **7 files** t4 enumerated:

```
src/index.ts:1  subpaths/parsing.ts:1  stylesheet/index.ts:1  stylesheet-types.ts:2
stylesheet.ts:4  extract.ts:3  serialize.ts:2                → 14 occurrences renamed
grep '\bPropertyDescriptor\b' src/  = 0   (0 bare left — collision with TS-lib global cleared)
grep 'CSSPropertyDescriptor' src/   = 14
```

Verification bar (all met):
- `npm run typecheck` (`vue-tsc -p tsconfig.lib.json` **and** `tsconfig.demo.json`) — **exit 0**.
- `npx vitest run test/parsing/` — **388 / 388 pass**.
- `proof:serialize-fidelity` (touches the renamed `serialize.ts` path) — **GREEN 4/4**.
- **0 external callers**: keyframes.js imports `parseCSSStylesheet`/`extractKeyframes`, never the
  `PropertyDescriptor` type (a type-only, runtime-free break).

**Gate-coverage finding**: `proof:dts-surface` PASSES both before and after the rename — it asserts
only the `extractFunctions` walker, NOT the type name, so **no existing gate guards the
`PropertyDescriptor` collision**. That is consistent with #11 being a live OPEN defect for so long,
and it is exactly why the born-RED `#11` tripwire in `proof:grammar-fuzz` (§5) earns its place.

## §5 · Obligation 5 — `proof:grammar-fuzz` authored + RUN (born-RED → GREEN)

`proto-probes/proof-grammar-fuzz.ts` (intended home `scripts/gates/proof-grammar-fuzz.mjs`, wired
as `package.json` `proof:grammar-fuzz`; the one owner-sanctioned gate ADD). 11 tripwires seeded
with the A6 corpus: 9 assert CLOSED behavior (a regression flips them RED), #9 + #11 are BORN-RED
at HEAD and flip GREEN under the fixes. Demonstrated in BOTH states via `git stash push -- src/`:

```
BORN-RED (fixes stashed = unmodified 0feb0f4):   true exit code = 1   → 9 GREEN / 2 RED
    RED  | #9  diagnostics-surfaced | SILENT drop (no diagnostics field)
    RED  | #11 CSSPropertyDescriptor | bare=14 renamed=0
POST-FIX (my worktree edits applied):            true exit code = 0   → 11 GREEN / 0 RED
    GREEN | #9  diagnostics-surfaced | lossy drop warned
    GREEN | #11 CSSPropertyDescriptor | bare=0 renamed=14
```

(The `#9` tripwire is tied to the §3 lossy-success closure — a *runnable* behavioral assertion, not
the dead `parseCSSValues` sink — which is the honest, flip-able form of bug #9 on the stylesheet
surface.) The gate is a true born-RED: it FAILS (exit 1) at HEAD guarding the two live defects, and
PASSES (exit 0) once both are closed. The 9 CLOSED tripwires stay GREEN throughout, so the corpus
also functions as a regression fence for the already-hardened classes.

## §6 · The `units/index.ts` value-model carve (gap d) — NOT re-run; converges with F1

Spec §3/§4 name ONE lattice-derived layout move: `units/index.ts` (451 LoC — three primitives
`ValueUnit`/`FunctionValue`/`ValueArray` + 2 types jammed behind the barrel) → `value-unit.ts` /
`function-value.ts` / `value-array.ts` / `types.ts` behind a pure re-export barrel, mirroring the
already-landed `units/color/{base,spaces}` precedent. **F1's proto already MEASURED this carve**
("the units/index.ts zero-churn carve MEASURED", commit `765979f`). F4 does not re-run it; it
supplies the type-lattice RATIONALE and records the convergence: the same node F1 (barrel-purity)
and F2 (cycle spine) independently reach. Re-carving here would duplicate F1's evidence for no gain.

## §7 · Honest frictions + weaknesses (measured)

1. **The spec over-claimed obligation 2.** `onParseError` is NOT "sufficient for the throw class"
   on `parseCSSValues` — that class is EMPTY (0/6). The wire is correct but near-useless there; the
   real fix for `parseCSSValues` partial-validity is grammar-fail-closed (spec option 3) or an
   embedded-diagnostics return — NOT a sink. This is the sharpest correction this run makes.
2. **The lossy-success closure is SCOPED** to the `@keyframes !important` drop. The `kind:"unknown"`
   at-rule path and the `parseCSSValues` partial-recovery remain silent — full closure is the deep
   `.map()`-closure rewire the spec flagged, out of scope for a pass-1 prototype.
3. **`buildDiagnostic` offset:-1** for the fast `number` parser (`furthest=-1`) — a pre-existing
   edge, surfaced incidentally by the §2b positive proof. The sink fires; the offset is just
   uninformative for that one primitive. A one-line `Math.max(0, furthest)` clamp would fix it.
4. **No existing gate guards the #11 type name** (`proof:dts-surface` is too narrow) — the rename
   slid past every current gate. The born-RED `proof:grammar-fuzz` tripwire is what closes that gap.
5. **Base-drift** (worktree at an ancestor of HEAD) required a `git reset --hard`; a coordination
   note for the batch, not a defect — the numbers are against the true referent `0feb0f4`.

## §8 · Composition verdict (facts, not a ranking)

F4 stays what all three probes + this run confirm: a **src-CENTRIC / D3 DIMENSION** (typed
diagnostics + the value-model carve), not a whole-tree shape. Its two live payloads are now
EXECUTED and measured: (1) the diagnostics axis — where this run's contribution is the *refined*
design (sink where a throw class exists; **embedded-in-return where memoized or lossy-on-success**;
grammar-fail-closed where the grammar auto-recovers; the `proof:grammar-fuzz` born-RED fence over
all of it), correcting the spec's blanket "sink is sufficient"; (2) the `#11` clean-break rename
(cheap, done, typecheck-0). It composes onto a layout family (F1/F3 own D1/D2/D4 + the
`units/index.ts` carve F4 seconds). Nothing native to D1; ratifies D2. **Run it as a composed
layer, not a standalone whole-problem answer** — unchanged from the spec, now with the payloads
proven runnable.
