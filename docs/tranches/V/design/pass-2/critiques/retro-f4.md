# V · pass-2 · RETRO-CRITIQUE — Family 4 · TYPE-ONTOLOGY / DOMAIN-PRIMITIVE

**Critic**: pass-2 adversarial retro-critic (NON-author; did not write `spec-f4` / `proto-f4` /
`f4`/`r4`/`t4`). **Mode: RAN** — every quantitative claim below was re-measured against `tranche-u`
HEAD **`8f87b38`** (the proto ran at `0feb0f4`; the spec/research at `tranche-u` earlier). Nothing
merged; all measurement read-only, incl. the READ-ONLY `../keyframes.js` sibling. This discharges the
AGGLOMERATION standing obligation ("pass 2 opens with an adversarial critic on F3 and F4 before their
convergence numbers are trusted as load-bearing"); F4 carried **no pass-1 critic** and was scored 44%
by the agglomerator with an explicit un-adversaried discount.

**Verdict up front: EARNED CONVERGENCE 36% — gapped, NOT blocked, and BELOW the un-adversaried 44%.**
F4's corpus measurement is genuinely strong (3-way verified; the 2/11-open verdict reproduces at HEAD)
and its proto did the adversary's own work on obligation 2 (it REFUTED the spec's "sink is
sufficient"). But the pass has three load-bearing defects an adversary must dock: (1) the ONE claim all
three probes AND the proto make with total confidence — the `#11` rename has **"0 external callers,
cheap, same-major"** — is **FALSE on disk**: keyframes.js imports the type at 4 sites, uses it in public
`Map<>` signatures, and its own `KF-VALUEJS-2.0.0.md` dispatches the rename as a value.js **2.0.0
MAJOR** with a downstream kf re-point; (2) the proto's headline architectural finding — "the memoize
forcing-function **decides** embedded-in-return" — is **over-deployed**: it decides sink-vs-embed, is
silent on the owner-relevant warn-vs-fail-closed fork, and was demonstrated on the ONE lossy case
(`!important`) where fail-closed is spec-INVALID, i.e. where the fork was already collapsed; (3) the
family's DEFINING mechanism ("tree mirrors the core type lattice") self-refuted to a single barrel-carve
every family reaches — which F4 did **not** execute — leaving the "irreplaceable typed `{value,
diagnostics}` boundary" delivered as two additive optional fields (one of them a proven DEAD channel) +
a rename. Enumerated below with the on-disk counterexamples and the closers.

---

## Failure-mode sweep (the critic mandate's checklist, hunted explicitly — mirroring retro:f3)

| mode | verdict on F4 |
|---|---|
| (1) vacuous convergence (spec passes while owner's edict unmet) | **HIT — G3.** The 44% scores the broad thesis (lattice-mirror + typed boundary); the deliverable is 2 additive fields (1 dead) + a rename. The owner's "typed `{value,diagnostics}` boundary" is DEFERRED, not delivered. |
| (2) spec-cites-itself circularity | **PARTIAL — G6.** F4's authority is the kf VJ corpus (external) + RAN dist probes (sound). But the memoize story is split across `r4` ("verified benign") and `t4` ("forcing function") with OPPOSITE headline verdicts, never reconciled before the number was set. |
| (3) gates that cannot fail | **CLEAN.** `proof:grammar-fuzz` #9/#11 are true born-RED (proto RAN both states, exit 1 → exit 0); the 9 CLOSED tripwires bite as a regression fence. This is the family's best-built artifact. |
| (4) elegant-reduction / "and then the hard part" | **HIT — G2 + G3.** "the memoize decides the fork" reduces a 3-way owner-law fork to a settled 2-way, leaving warn-vs-fail-closed (the hard part) unmeasured; the lattice-shape thesis reduces to "one carve F1 already owns." |
| (5) legacy aliases / dual paths / masked fallbacks | **HIT — G4.** The additive-optional closure chosen to AVOID `{ast,diagnostics}` IS a masking fallback: the parse still "succeeds" and silently drops data unless the consumer opts into a side field — the exact shape the owner's §0 forbids. |
| (6) unverified / mis-measured gestalt | **HIT — G1.** "#11 = 0 external callers" is falsified on disk (kf imports it 4×). The memoize MECHANICS are correctly measured (credit); the memoize CONCLUSION is over-scoped (G2). |
| (7) consumer-less substrate | **HIT — G5.** The `parseCSSValues` threaded sink Charter C1 relies on is a PROVEN dead channel (0/6 fires); it "closes" #9's value-list half with an inert wire. |
| clean-break law hold | **FAIL — G4.** The deliverable sits on the masking-fallback side of the owner's clean-break law; the clean `{value,diagnostics}` boundary is the owner-aligned break, deferred as "too breaking." |
| glass-ui / constellation referent divergences | **HIT — G1.** The `#11` rename is a KNOWN cross-repo coordination item (kf `KF-VALUEJS-2.0.0.md §KF-7`) with a standing BH/BI relay obligation the campaign never books. |

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — [LOAD-BEARING] The `#11` rename's "0 external callers / cheap / same-major" is FALSE on disk; it is a live cross-repo MAJOR break with a named kf re-point + a standing relay obligation

Every F4 artifact asserts the `#11` rename is caller-free and cheap:
- `r4` L48-49: *"a same-major internal rename (no external caller: kf imports only
  `parseCSSStylesheet`/`extractKeyframes` … none name `PropertyDescriptor`)."*
- `f4` headline #4 + net-verdict: *"0 external callers … cheap, do it."*
- `t4` §2: *"no runtime (type-only) … do it as a clean break."*
- `proto §4`: *"0 external callers: keyframes.js imports `parseCSSStylesheet`/`extractKeyframes`, never
  the `PropertyDescriptor` type (a type-only, runtime-free break)."*

**Falsified — measured at HEAD against the READ-ONLY sibling** (`grep -rn "import.*PropertyDescriptor"
../keyframes.js/src`): keyframes.js imports **`type PropertyDescriptor` from
`@mkbabb/value.js/parsing`** at **four** sites —
`animation/compile/adapter.ts:1`, `animation/compile/emit/format-options.ts:20`,
`animation/engine/css/css-animation.ts:12`, `animation/engine/css/metadata.ts:31` — and USES it in
consumer-facing public signatures (`Map<string, PropertyDescriptor>` at `css-animation.ts:169`,
`metadata.ts:127`, `adapter.ts:90`, `format-options.ts:140`).

Worse, kf has **already documented this exact collision AND the fix name**. `../keyframes.js/docs/
tranches/S/KF-VALUEJS-2.0.0.md:73` (KF-7) reads verbatim: value.js's `PropertyDescriptor` collides
with the DOM global, kf's API-Extractor rolls it up as **`PropertyDescriptor_2`** in the published
`dist/keyframes.d.ts` (`propertyRegistry: Map<string, PropertyDescriptor_2>`), the leak is
**consumer-observable** (a `platform-adopt` test asserts on `propertyRegistry`; `properties` is a
public `ResolvedKeyframes` field), and — **DISPATCH** — *"rename value.js's export to a collision-free
name (e.g. `CSSPropertyDescriptor`) on the **2.0.0 grammar-rename cadence** … kf re-points its import +
the `Map<string, …>` types at the value.js **`^2.0.0` re-pin**."*

So the rename is (a) NOT caller-free — 4 kf type-imports + 4 public `Map<>` signatures; (b) NOT
"same-major internal" — kf's own dispatch scopes it to a value.js **MAJOR bump**; (c) NOT free of relay
— it is a booked constellation adopt-event with a named downstream kf re-point, under the standing
BH/BI relay law (MEMORY). The trilogy's single most confident, unanimous claim is exactly backwards on
cost class.

**Bearing on the breaking-change story**: `#11` is a semver-major public-`.d.ts` change with a live
external consumer — the SAME class the campaign says it is *deferring* for `{ast,diagnostics}`. The
proto's clean split ("`#11` cheap → do now / `{ast,diagnostics}` breaking → defer") therefore collapses
to **churn-volume** (kf 4 sites vs. 491), not principle. Both are breaking; the campaign is simply
willing to pay the cheaper one — which is fine, but it must be *said*, not dressed as a caller-free
freebie.

**What closes it**: re-cost `#11` as a value.js MAJOR coupled to the kf `KF-7` re-point cadence; book it
as a constellation adopt-event + BH/BI relay, not a value.js-local rename; delete "0 external callers /
cheap / same-major" from the spec and net-verdict. Keep the rename — it cures the real
`PropertyDescriptor_2` mangle — but at its true price.

### G2 — [LOAD-BEARING] The memoize forcing-function is REAL but OVER-DEPLOYED: it decides sink-vs-embed, NOT the owner-relevant warn-vs-fail-closed fork — and was demonstrated on the one case where fail-closed is spec-INVALID

The mechanical claim **holds** — I re-verified against `src/utils.ts` `memoize`: on a throw, `func.apply`
at L162 propagates BEFORE the `cache.set` at L164-165, so **throws are never cached** (a failure sink
re-fires every call — `r4`'s "benign" is right for the FAILURE class); on a cache HIT, L148-156 returns
`cached.value` WITHOUT invoking `func`, so a **success-path side-effect sink is dead on the hit** while
an **embedded-in-return diagnostic on `cached.value` survives** (`t4`/proto right for the SUCCESS class).
`parseCSSValue` (`parsing/index.ts:542`, `keyFn:(input)=>input`) and `parseCSSStylesheet`
(`stylesheet.ts:637`, same `keyFn`) are both memoized; `parseCSSValues` (`index.ts:601`) is a plain
`function`. All confirmed. **Credit: the memoize mechanics are correctly measured, not assumed.**

**But the CONCLUSION is over-scoped.** AGGLOMERATION §2·F4 and Charter C1 state *"the memoize
forcing-function decides embedded-in-return for the memoized entries."* That is a category error. The
memoize argument adjudicates exactly one axis — **sink vs. embed** — and only *within* the frame "keep
the lossy-recovery branch and deliver a diagnostic on SUCCESS." It is **silent** on the axis the owner's
law actually turns on:

- **keep-recovery-and-warn** (options 1/2): the parse still SUCCEEDS, the data is still dropped, a
  warning rides a side field — a **masking fallback** by the owner's §0 definition; vs.
- **grammar-fail-CLOSED** (option 3, `t4`-preferred, *"aligns charter §0 'no masking fallbacks'"*): the
  malformed decl becomes a total FAILURE routed through the throw — which memoize **never caches** — so a
  sink fires reliably and there is **no success-path diagnostic to deliver at all**.

The memoize argument cannot choose between 2 and 3, because under option 3 the success-path diagnostic
the memoize reasoning is about **does not exist**. Presenting "memoize decides the fork" thus settles a
sub-question and is sold as settling the whole fork — silently resolving the owner-law axis toward the
MASKING option.

**The counterexample is the proto's own demonstration.** Proto §3 proves memoize-forces-embed on the
`@keyframes !important` drop (`stylesheet.ts:227-234`). But CSS Animations §3 **mandates** that decl be
"ignored" — you cannot fail the whole stylesheet because one keyframe decl carried `!important`. So on
that case fail-closed is **spec-invalid**; the warn-vs-fail-closed fork was never live there. The
genuinely contested cases — the `kind:"unknown"` at-rule capture (`stylesheet.ts:425`) and the
`parseCSSValues` partial-recovery (`"rgb("`→`rgb`) — where fail-closed IS a live, owner-preferred option
— proto §3 **explicitly leaves OPEN** ("NOT closed here … out of scope"). The "forcing function decides
the fork" is therefore demonstrated only where the fork was pre-collapsed by CSS semantics and
**untested where it is live**.

**What closes it**: split the two forks in the charter. Keep the memoize argument for sink-vs-embed (it
is sound). Route warn-vs-fail-closed as the owner-law question and **MEASURE** it per contested site:
`!important` → embed-warn (spec forces keep); `kind:"unknown"` + `parseCSSValues` partial → actually RUN
grammar-fail-closed and report the blast (does a real stylesheet still parse? do consumers break?)
before choosing. Do not let "memoize decides it" stand as the resolution.

### G3 — [LOAD-BEARING] The family's DEFINING mechanism self-refuted to one carve every family reaches — which F4 did NOT execute; the "typed boundary" thesis is quietly narrowed, yet still scored 44% ADVANCED

F4's named mechanism (§3 registry): *"tree mirrors the core type lattice
(ValueUnit/Color<T>/combinator)."* Measured, that survives as **exactly one** move — carve
`units/index.ts` (**451 LoC** at HEAD, confirmed by `wc -l`; three primitives + it is the barrel) into
`value-unit.ts`/`function-value.ts`/`value-array.ts`/`types.ts` — and that is the **same node** F1
(own-runtime-sibling) and F2 (cycle spine) independently reach (AGGLOMERATION §1 fact 1). F4's proto §6
**declined to run even that** ("F1's proto already MEASURED this carve … F4 does not re-run it"), and
the carve is **not on HEAD** (`ls src/units/value-unit.ts` → absent). So F4's UNIQUE, DISTINCTIVE layout
payload is **0 — nothing lattice-derived that another family doesn't already own, and nothing executed
by F4.** The "tree-mirrors-the-lattice" shape thesis is dead; all three probes + the proto concede it
(`t4` §5, `r4` failure-mode, spec §7). Honest — but it means the SHAPE half of a "TYPE-ONTOLOGY" family
is empty.

That leaves the "irreplaceable half": the typed `{value, diagnostics}` **boundary**. The proto does NOT
deliver a boundary. It ships (a) an additive optional `onParseError?` on `parseCSSValues` — which the
proto itself proves is a DEAD channel (G5), and (b) an additive optional `KeyframeRule.diagnostics`
field on ONE drop path. The ontology — "parse = a typed `{value,diagnostics}` boundary at the combinator
seam" — is narrowed to "add an optional warning field to `KeyframeRule`." The 44% "ADVANCED" registry
line scores the thesis; the tree ships the punch list.

**What closes it**: stop scoring F4 as a "family/dimension" and reclassify it as what the composition
notes already concede — a **3-item D3 punch list** bolted onto F1/F3: (i) the `units/index.ts` carve
(F1 owns it — no F4 credit); (ii) the diagnostics decision (UNRESOLVED per G2/G4); (iii) the `#11`
rename (a kf-coupled MAJOR per G1). Score the punch list on what is executed and correctly costed, not
the lattice-mirror thesis that self-refuted.

### G4 — The clean-break law is on the WRONG side of the deliverable: the additive-optional closure chosen to avoid `{ast,diagnostics}` is itself the "masking fallback" §0 forbids

Owner §0: *"NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking
fallbacks"* + *"architectural transpositions in the sake of elegance, simplicity, and performance above
all are both necessary and desirable."*

The proto's chosen closure — additive `KeyframeRule.diagnostics`, additive `onParseError?` — leaves the
parse **succeeding** while the data is **still dropped**, surfaced only if the consumer opts into a side
channel. That is the textbook masking fallback: the defect (silent lossy success) is *papered*, not
*removed*; a consumer that ignores `.diagnostics` sees the identical old silent-drop behavior. The clean
`{value, diagnostics}` boundary — where a lossy parse cannot be read as a plain success — is the
architectural transposition the owner's law explicitly calls "necessary and desirable" for THIS terminal
design tranche. It is deferred solely because it is breaking (491 sites, `r4`/`t4` measured), justified
by "the exact atomic-vs-publish hazard glass-ui deferred."

"glass-ui deferred it" is a precedent for *caution*, not a *warrant* to ship the soft-add under the
owner's clean-break banner. The choice "clean `{value,diagnostics}` boundary (owner-aligned, breaking
major) vs. additive soft-add (churn-cheap, masking)" is a genuine OWNER decision of the same class as
the `@`-ban and api-vocab forks the campaign already routes OUT — and the pass silently resolved it to
the soft-add, partly under the (over-scoped, G2) cover of "memoize forces it."

**What closes it**: surface the boundary-vs-soft-add choice as an explicit owner-fork with honest
framing ("the additive path is churn-cheap but is a masking fallback the owner's §0 names; the boundary
is the clean break at a 491-site major"), and stop pre-deciding it to the additive field.

### G5 — The `parseCSSValues` threaded sink Charter C1 depends on is a PROVEN dead channel; the real fix (fail-closed) is unmeasured

Charter C1 assigns *"a threaded sink for the non-memoized `parseCSSValues`."* But `parseCSSValues =
any(FunctionArgs, ValuesValue)` and `FunctionArgs = Value.sepBy(any(comma, whitespace))`
(`parsing/index.ts:13-14`); `sepBy` succeeds with `[]` on no match, so `any(...)` **always** returns a
(possibly-garbage) `ValueArray`, `tryParse` **never** sees `state.isError`, and the sink **never
fires** — the proto measured **0/6** garbage inputs firing it (`"rgb("`→`rgb`, `"calc(1 +"`→`calc`,
data dropped, no signal). So the C1 wire "closes" #9's value-list half with an **inert** channel; the
genuine defect there is silent partial-validity, which needs grammar-fail-closed — and **no probe ran
it**.

**What closes it**: replace the C1 line "thread the sink on `parseCSSValues`" with "fail-closed the
`parseCSSValues` grammar (or embed a partial-validity diagnostic) and MEASURE the blast" — the sink is
dead per the proto's own §2 refutation and must not survive into the charter as if it closes anything.

### G6 — [minor] The two research probes give CONTRADICTORY memoize headlines, never reconciled before the 44% was set

`r4` L103-107 headlines the memoize interaction as *"verified benign"* (the sink re-fires because
throws are never cached). `t4` §3 / `f4` headline the memoize as the *"forcing function"* that makes
embed strictly more correct. Both are locally correct — about DIFFERENT classes (uncached FAILURE vs.
cached SUCCESS) — but the spec/agglomeration present a single settled "forcing function" without noting
the split. A reader who takes `r4`'s "benign" at face value would wire a sink and ship #9's success half
broken. The load-bearing nuance (sink OK for the uncached failure class; embed required for the
success/lossy class on memoized entries; neither settles fail-closed-vs-warn — G2) currently lives
NOWHERE as a single reconciled statement.

**What closes it**: state the three-way reconciliation explicitly in one place (Charter C1), so the
"benign" and "forcing function" headlines are visibly two halves of the same measured fact, not a
contradiction the agglomerator smoothed over.

---

## What F4 gets RIGHT (fairness — these are why 36% and not lower)

- **The corpus measurement is genuinely strong and reproduces at HEAD.** The 2/11-open verdict is
  3-way-verified (grep + drop-site read + `dist` run) and I re-confirmed both live defects at `8f87b38`:
  **#11** = 14 bare `PropertyDescriptor` / 0 `CSSPropertyDescriptor` in `src/`, still exported on `.`
  (`index.ts:361`) + `./parsing` (`subpaths/parsing.ts:39`), colliding with the TS-lib global
  (`lib.es5.d.ts:108`, verified); **#9** = the 3 public entries call `tryParse` with no sink (0
  `onParseError` on `parseCSSValue`/`parseCSSValues`/`parseCSSStylesheet`). The corpus is real substrate.
- **The proto did the adversary's own work on obligation 2.** It REFUTED the spec's "`onParseError` is
  sufficient for the throw class on `parseCSSValues`" by RUNNING it (0/6) and localizing the gap to
  grammar permissiveness — genuine self-correction, the same credit the F2 critic extended, and the
  reason G2/G5 are close-able rather than fatal.
- **The memoize MECHANICS are correctly measured** (I re-verified L148-176: throws uncached, cache-hit
  skips `func`, embed survives). The forcing-function is REAL — my dock is that it is over-*scoped*
  (G2), not that it is wrong.
- **#8 is correctly reclassified** as a consumer-contract seam, not a value.js src defect
  (`flattenObject` signature `Record<string, any[]>` by design, `units/utils.ts:186`) — verified
  plausible; the proto RAN the unflatten probe (no NaN at the value.js surface).
- **`proof:grammar-fuzz` is a true born-RED** (exit 1 → exit 0 across the two states), and the D4 hygiene
  claims hold at HEAD (`as any` in `src/` = **0**; `as unknown as` = **8**).

---

## EARNED CONVERGENCE: **36%**

| Dimension | State | Effect on score |
|---|---|---|
| VJ corpus measurement (2/11 open, 3-way, reproduces at HEAD) | **REAL, verified live** | carries most of the 36 |
| `proof:grammar-fuzz` born-RED #9/#11 | **RAN both states, bites** | supporting credit |
| The `#11` rename cost/relay | **FALSIFIED on disk** — 4 kf callers, MAJOR cadence, KF-7 relay (G1) | the dominant drag |
| "memoize decides the fork" | **over-scoped**; demonstrated where fork was spec-collapsed (G2) | second drag |
| Lattice-mirror SHAPE thesis | **self-refuted to F1's one carve; 0 executed by F4** (G3) | third drag |
| Clean-break law | deliverable on the masking-fallback side; boundary deferred as "too breaking" (G4) | drag |
| Charter-C1 `parseCSSValues` sink | **proven dead channel** (G5) | minor drag |

**Why not lower**: the corpus is measured and real, both live defects reproduce at HEAD, the proto's
obligation-2 self-refutation is genuine intellectual credit, and the payloads that DO survive (embed-in-
return for the memoized lossy case; the `#11` rename at its TRUE cost; the units carve as F1's) are
landable. No missing primitive is as hard as the original problem — the hard parts are (a) an owner
decision (clean boundary vs. masking soft-add, G4), (b) two measurements the proto skipped (fail-closed
on the contested lossy cases, G2/G5), and (c) a cost re-count + relay booking (G1).

**Why below the un-adversaried 44%**: the family's single most confident, UNANIMOUS claim (`#11` = "0
external callers, cheap, same-major") is falsified on disk and inverts the cost story into a cross-repo
MAJOR (G1); its headline architectural finding (the memoize forcing-function) is over-deployed and
demonstrated only where the fork was pre-collapsed (G2); its DEFINING mechanism is dead and its unique
executed payload is ~zero (G3); and its clean-break law lands on the wrong side of the deliverable (G4).
An un-adversaried 44% could not have caught any of these — which is exactly what the agglomerator's
un-adversaried discount was reserving against.

**Why not BLOCKED**: no primitive is missing. F4 is a genuine, landable D3 punch list — it must simply
be **re-scoped and re-costed**: score it as three items bolted onto F1/F3, not a "type-ontology family";
book `#11` as a kf-coupled MAJOR with the KF-7 relay (G1); split the diagnostics fork into
sink-vs-embed (memoize-settled) and warn-vs-fail-closed (owner-law, per-site MEASURED, G2); surface the
`{value,diagnostics}`-vs-soft-add boundary decision as an OWNER fork (G4); and replace the dead
`parseCSSValues` sink with a measured fail-closed (G5).

**Recommendation to the pass-2 agglomerator**: adopt F4's corpus + `proof:grammar-fuzz` as standing D3
substrate; DOCK the family from 44% to 36%; move the `#11` rename onto the constellation adopt-event /
BH/BI relay rails with kf `KF-VALUEJS-2.0.0.md §KF-7` as the coordination referent; and route the
`{value,diagnostics}`-boundary-vs-additive-soft-add decision to the OWNER alongside the `@`-ban and
api-vocab forks — because shipping the additive soft-add under the owner's clean-break banner is the
one thing this campaign's §0 most explicitly forbids.
