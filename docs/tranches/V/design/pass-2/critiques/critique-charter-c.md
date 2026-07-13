# V · pass-2 · CRITIQUE — CHARTER-C (the D3 typed-diagnostics DIMENSION + the corrected battery)

**Critic**: pass-2 FRESH non-author critic (did NOT write `charter-c.md`). **Mode: RAN** — every
load-bearing number below re-measured against `tranche-u` HEAD **`d365053`** (charter-a `bd67b12` +
charter-c `184a9ec` + charter-b `d365053` are all landed as docs; the src proto charter-c ran was reset,
never merged, so the src tree here is the UN-fixed HEAD the charter measured against). READ-ONLY on the
`../keyframes.js` sibling. This discharges the campaign's pass-2 adversarial obligation on the charter that
EXECUTED retro-f4's docks — its job is to check whether charter-c's response actually holds on disk.

**Verdict up front: EARNED CONVERGENCE 54% — a genuine, verified advance over retro-f4's docked 36%,
capped by three fresh gaps the charter's own re-measure should have caught.** Charter-c closes retro-f4's
two dominant drags with evidence I independently reproduced: the `#11` re-cost is EXACTLY right on disk (4
kf type-imports + KF-7 dispatch + MAJOR cadence — G1 fully honored), and the memoize over-scope is split
cleanly into Axis-A (sink-vs-embed) + Axis-B (warn-vs-fail-closed, per-site) — G2 honored. The corrected
battery (10→7, Q13-floor arithmetic, derived barrel-pure RED set, dropped META-gate) reproduces on HEAD to
the symbol. BUT the item-2 lossy-success leg — one of the three composed legs — leans on work it does not
cite and carries a friction it does not measure: (1) the charter presents `grammar-fail-closed .eof()` as
ITS resolution of the owner-law axis, but that idiom + a typed `CSSParseError` **already landed on HEAD as
tranche-U U-F29 (`329932b`)** for the sibling `parseCSSValue`, and the charter neither credits it nor
reconciles with U-F29's explicit design that `parseCSSValues` is the *deliberately permissive* full-list
sibling; (2) the "permissive-string lossy class" friction is asserted un-measured and contradicts the
charter's OWN `kind:"unknown"` non-lossy logic; (3) the lossy-class inventory is inherited from the F4
proto, never re-derived, so "the single spec-mandated site" is unproven. Enumerated below with the on-disk
counterexamples and closers.

---

## Failure-mode sweep (the critic-mandate checklist, hunted explicitly)

| mode | verdict on charter-c |
|---|---|
| (1) MUST-RUN item shipped SPEC-ONLY | **CLEAN on the three headline items** — item-1 embed (§1.2), item-1 parseCSSValues .eof()+sink (§1.3), item-1 #11 rename (§1.4), item-2 kind:unknown refute (§2), item-3 barrel-pure + grammar-fuzz (§3.2/§3.3) all carry measured output. `barrel-cycle` runtime-edge validation is DEFERRED to Charter B — a correct boundary handoff, not a miss (§3.5). |
| (2) numbers don't support the claim | **PARTIAL — G2.** The permissive-string "lossy" friction (§1.3 / §5.1) carries NO drop measurement and inverts the charter's own §2 verbatim-capture=non-lossy logic. |
| (3) owner-reserved fork quietly pre-decided | **CLEAN.** The G4 boundary-vs-soft-add fork is NOT pre-decided to the soft-add — fail-closed is chosen for the non-spec-forced class (owner-aligned, mandated by AGGLOMERATION C1) and the one-site residual is routed to the owner (§4.3). @-ban idiom + api-vocab held owner-reserved (§4.1/§4.2), barrel-pure/grammar-fuzz correctly scoped as structural `proof:*` (not the contested @-ban). |
| (4) clean-break law holds end-to-end | **HOLDS with one honestly-flagged residual — G5.** The deliverable is fail-closed (no masking) everywhere the drop is not spec-forced; the ONE embed-warn site (`@keyframes !important`) is a masking fallback by §0's own definition, spec-forced, and surfaced as owner-routed. The §0/§6 "owner-law-clean (no masking)" headline over-claims by that one site. |
| (5) elegant-reduction / "and then the hard part" | **HIT — G1 + G3.** "grammar-fail-closed is the resolution" re-derives an already-landed in-tree idiom (U-F29) uncredited (G1); "the remaining lossy classes" is the proto's inherited enumeration, never re-swept for other silent-drop sites (G3). |
| (6) unverified / mis-measured gestalt | **HIT — G2 (permissive-string lossiness), G6 (kind:unknown "VERBATIM" overstated — body:null, structural not verbatim).** |
| (7) consumer-less / inert substrate | **CLEAN.** The retro-f4 G5 dead-sink charge is genuinely answered — .eof() converts the unconsumed-tail class to a hard failure the sink rides (3/6 measured); no inert wire survives into the charter. |
| glass-ui / tranche referent divergences | **HIT — G1.** The charter cites the "94-line parsing move" between proto and HEAD but never identifies it as the U-F29 loud-fail landing that pre-solves the singular-entry silent-truncation and ratifies the exact `.eof()`+typed-error idiom it presents as novel. |

---

## What HOLDS (verified on HEAD — measurement earns, elegance earns nothing)

- **The `#11` re-cost is EXACTLY right on disk (retro-f4 G1 fully honored).** `grep` on the READ-ONLY
  sibling confirms `type PropertyDescriptor` imported at **4 sites** (`adapter.ts:1`,
  `emit/format-options.ts:20`, `engine/css/css-animation.ts:12`, `engine/css/metadata.ts:31`) and used in
  **4 public `Map<string, PropertyDescriptor>` signatures** (`adapter.ts:90`, `format-options.ts:140`,
  `css-animation.ts:169`, `metadata.ts:127`). `KF-VALUEJS-2.0.0.md §KF-7` dispatches VERBATIM: rename to
  `CSSPropertyDescriptor` on the **2.0.0 grammar-rename cadence**, kf re-points at the `^2.0.0` re-pin,
  API-Extractor currently mangles to `PropertyDescriptor_2`. The charter's "MAJOR + kf re-point + BH/BI
  relay, NOT a value.js-local freebie" is the correct cost class. This is the charter's best-earned item.
- **The barrel-pure RED set is DERIVED-correct on HEAD.** Own-runtime `export const/let/var/function/
  class/enum/namespace` counts: `src/index.ts` = **0** (PURE), `parsing/index.ts` = **10**, `units/index.ts`
  = **3**, `quantize/index.ts` = **2** → RED set `{parsing, units, quantize}`, matching §3.2 and
  AGGLOMERATION §4 to the symbol. The gate-derived-not-hardcoded discipline is honored.
- **`test:dist` chains exactly 10 gates** (`dts-surface · css-parity · round-trip-idempotent · perf-target
  · serialize-fidelity · subpath-budget · lib-correctness · barrel-parity · pack-manifest · close-ledger`);
  `size-graph` is a separate CI-only `proof:*`. The Q13 behavioral floor is 5; the **10 → 7** arithmetic
  (Q13-five + barrel-pure + grammar-fuzz) is correct, and the rubric is applied to ALL of dts-surface /
  lib-correctness / pack-manifest per AGGLOMERATION C3 — with `lib-correctness` HONESTLY named as an
  8-candidate keep, not smoothed. The META-gate is dropped. Item-3 is verified.
- **The Axis-A/Axis-B split is a coherent, faithful response to retro-f4 G2.** The memoize forcing-function
  is confined to sink-vs-embed; the owner-law warn-vs-fail-closed axis is decided per-site by CSS semantics.
  This is the exact re-scope the retro demanded and it is executed cleanly, not asserted.
- **The drop-site and unknown-capture reads are accurate on HEAD.** `liftKeyframeMetadata`
  (`stylesheet.ts:228-234`) drops `!important` decls with a bare `continue` and NO diagnostic — the silent
  lossy site §1.2's embed targets is real. `unknownBody` (`stylesheet.ts:412-432`) retains `atName`,
  `prelude`, and recursively-parsed `children` — the §2 refutation's DIRECTION (fail-closed would wrongly
  reject every real `@media`/`@container`/`@supports`) is sound.

Everything below is the distance between those verified results and the charter's composed thesis.

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — [LOAD-BEARING] The `parseCSSValues` fail-closed resolution re-derives an ALREADY-LANDED tranche-U idiom (U-F29) it never credits — and does not reconcile with U-F29's explicit design that `parseCSSValues` is the *deliberately permissive* sibling

Charter §1.3 presents `grammar-fail-closed .eof()` as the charter's resolution of the owner-law axis:
*"The charter's OWN third prong … is what makes the sink live: I added `.eof()` to the `parseCSSValues`
parser."* And §2 books the parseCSSValues partial-recovery class as *"OPEN (proto §7.2) → closed via
fail-closed `.eof()` + sink."*

**On HEAD, the `.eof()` fail-closed idiom + a typed error already exist — landed by tranche-U U-F29
(`329932b`: "fix(parsing · U-F29): parseCSSValue loud-fails on trailing tokens; rename to parseCSSValues
(LIB-G1)")**, verbatim at `parsing/index.ts`:
- L525-528: `const ValuesValueEOF: Parser<any> = ValuesValue.eof();` with the comment *"`.eof()` requires
  FULL-INPUT consumption (U-F29 · U.W-LIB LIB-G1): the parse fails when any trailing token remains … so a
  multi-token string is rejected instead of silently dropping every token past the first."*
- L542-558: `parseCSSValue` (singular) already `tryParse(ValuesValueEOF, input)` and throws a typed
  `CSSParseError` on unconsumed tail — *"`parseCSSValue('1px solid red')` throws … rather than silently
  returning the bare `'1px'`."*

That is the SAME silent-truncation the F4 corpus flagged, and it is **already cured on HEAD for the
singular entry**, using the **same `.eof()` + typed-error mechanism** the charter presents as its own
resolution. The charter's §preamble HAD the clue in hand — it notes the parsing tree "moved 94 lines …
between the proto's `6abef80`/`0feb0f4` and HEAD" — but never identifies that move as the U-F29 landing
that (a) pre-solves the singular-entry lossy case and (b) ratifies the exact idiom §1.3 claims to introduce.

Worse for the framing: U-F29's own in-code design (`parsing/index.ts:569-576`) states `parseCSSValues`
(plural) is the **deliberately PERMISSIVE full-list sibling** — *"consumes the WHOLE list and always wraps
in a `ValueArray` (even for a bare `'10px'`)."* The charter adds `.eof()` to make it throw, but never
engages with the ratified split (singular = strict/loud-fail, plural = permissive full-list). Its
partial-tail close is arguably consistent with "consume the WHOLE list or fail," but that reconciliation is
never argued — the charter treats parseCSSValues as if it had no prior design intent.

**Net**: the charter's UNIQUE surface on this axis is narrower than framed — "extend the landed U-F29
`.eof()` idiom to the plural sibling + thread a sink," not "introduce grammar-fail-closed." The resolution
is landable (and consistent with in-tree precedent, which is a point in its favor), but its novelty and its
`OPEN → closed` bookkeeping over-claim by ignoring the tranche-U work already on disk.

**What closes it**: cite U-F29 (`329932b`) as the in-tree precedent; re-scope the parseCSSValues item to
"extend the ratified `.eof()`+`CSSParseError` idiom to the permissive plural entry," and explicitly
reconcile it with U-F29's design (why a full-list parser SHOULD reject an unconsumable tail while keeping
its permissive wrap). Book the item's cost against the U-F29 design, not the stale proto-era "OPEN" status.

### G2 — [LOAD-BEARING] The "permissive-string lossy class" friction is asserted un-measured and CONTRADICTS the charter's own `kind:"unknown"` non-lossy logic

Charter §1.3 ("the honest, sharper finding") and §5.1 (friction #1) name a class — inputs the value
grammar **totally consumes** as permissive string ValueUnits (`@@@`, `///`, `1px @ bad`) — and calls them a
lossy-success that "still succeed **silently**" (§5.1), implying dropped data.

But the charter provides **no measurement that any data is dropped** for this class — the §1.3 table shows
only `sinkFired=false, threw=false`, i.e. *the whole input was consumed*. And in §2 the charter uses
EXACTLY the opposite reasoning to REFUTE lossiness for `kind:"unknown"`: *"An unknown at-rule is captured
VERBATIM … this is unvalidated-but-complete capture, NOT a silent drop."* By that same logic, a
totally-consumed permissive-string ValueUnit that round-trips to itself is **non-lossy forward-compat
capture**, not a silent drop. The charter classifies verbatim capture as non-lossy in §2 and as a lossy
friction in §5.1 without reconciling — a self-inconsistency at the center of item-2's "remaining classes"
accounting.

**Failure scenario**: if `parseCSSValues("1px @ bad")` round-trips losslessly (whole string captured as a
permissive value), friction #1 is a phantom — there is no lossy class to flag, and item-2's "residual
permissive-string class" evaporates. If it drops the `@ bad` tail, then it IS a real open lossy class that
item-2 leaves unclosed AND that §2's verbatim-capture reasoning would have to be re-examined for the
unknown class too. The charter asserts a friction without running the one round-trip that decides which.

**What closes it**: MEASURE the round-trip of `parseCSSValues("1px @ bad")` / `"@@@"` / `"///"`; if
verbatim, retract friction #1 and align with §2 (non-lossy capture); if lossy, book it as a genuine open
item-2 class with the same standing as the partial-recovery class, and re-audit §2's verbatim=non-lossy
claim for symmetry.

### G3 — The lossy-success class INVENTORY is inherited from the F4 proto, never re-derived; "the single spec-mandated site" is therefore unproven

The charter's item-2 operates on exactly the F4 proto's three-class enumeration (`@keyframes !important` /
`parseCSSValues` partial / `kind:"unknown"`) and concludes (§1.1, §6) that embed-warn "survives ONLY at the
single spec-mandated `!important` site." That conclusion is only as strong as the enumeration, and the
enumeration is **inherited, not re-swept**. The charter never audits the declaration/rule parsers for OTHER
silent-drop sites — e.g. duplicate-property cascade drops, invalid-value drops in ordinary style rules, or
tokens inside an unknown block that `recursiveBlock` fails to recognize (see G6). Any one of those would be
a second spec-mandated or silent-drop site, falsifying "ONLY one."

**What closes it**: run a drop-site sweep (grep the declaration/rule/keyframe parsers for silent-skip
idioms — `continue`, `.filter(Boolean)`, discarded-branch `.map`s — the same pattern that surfaced the
`!important` drop) and confirm the spec-mandated-drop set is genuinely `{@keyframes !important}` before the
charter asserts a lone spec-forced site.

### G4 — [minor] `barrel-cycle` is framed as a CI incumbent but does not exist; its runtime-edge claim is cited from a prior proto, not re-measured

Charter §3.5: *"`barrel-cycle` is NOT in the 7 (it is CI-only, **like the incumbent `size-graph`**)."*
There is no `proof:barrel-cycle` script in `package.json` — `size-graph` IS incumbent, `barrel-cycle` is an
unbuilt banked-F2 proposal. The 28-node type-only-blob / true-2-SCC claim is cited from `proto-f5 §2`, not
re-measured on HEAD. Correctly DEFERRED to Charter B, but should not be framed as an existing CI gate.

**What closes it**: reword to "a banked-F2 gate to be authored in Charter B," and either re-measure the
runtime-vs-type-edge SCC count on HEAD or cite it explicitly as an un-refreshed proto-f5 number.

### G5 — [minor] The "no masking" headline over-claims by the one embed-warn site the charter itself flags

§0 and §6 call the resolution "owner-law-clean (no masking)." The deliverable ships exactly one embed-warn
site (`@keyframes !important` via `KeyframeRule.diagnostics`) where a consumer that ignores `.diagnostics`
sees the identical silent-drop behavior — a masking fallback by §0's own definition, spec-forced but still
masking. The charter surfaces this honestly in §4.3 / §5.2, so it is an internal-consistency nick, not a
hidden pre-decision — but the headline should carry the caveat it makes elsewhere.

**What closes it**: qualify the headline to "no masking except the one spec-forced `!important` site, whose
embed-warn-vs-full-`{value,diagnostics}` residual is owner-routed."

### G6 — [minor] The `kind:"unknown"` "captured VERBATIM" wording overstates; it is STRUCTURAL capture (body:null) tested on two clean cases

§2 says the unknown at-rule is "captured VERBATIM." On HEAD (`stylesheet.ts:425-431`) the block form sets
`body: null` and retains only the recursively-parsed `children` — the raw body TEXT is discarded, so any
token inside an unknown block that `recursiveBlock` does not recognize is dropped, not captured. The
refutation's direction is sound (an unknown at-rule is not a whole-rule silent drop, and fail-closed would
wrongly reject real `@media`), but "verbatim" overclaims, and it is demonstrated on 2 well-formed cases
(`@media`, `@layer`) — it does not prove NOTHING is ever dropped inside an unknown block.

**What closes it**: say "captured STRUCTURALLY (prelude + recursively-parsed children; raw body discarded),"
and test one unknown block containing a non-rule token to bound the inner-drop risk (feeds G3).

---

## Owner-fork pre-decision audit (the mandate's explicit hunt)

- **G4 boundary-vs-soft-add fork (retro-f4 G4)**: NOT pre-decided to the soft-add. The charter chooses
  fail-closed (owner-aligned, no-masking) for the non-spec-forced class per AGGLOMERATION C1's mandate, and
  routes the narrow one-site residual to the owner (§4.3). This is the correct disposition — credit.
- **@-ban idiom (eslint vs `proof:*`)**: held owner-reserved (§4.1); the two authored gates are structural
  `proof:*`, NOT the contested import-restriction — no pre-decision.
- **api vocabulary**: held owner-reserved, correctly noted as Charter A's surface (§4.2).
- **The 10→7 vs 10→8 (lib-correctness) disposition**: the charter presents 7 as the floor and names the
  8-candidate rather than pre-deciding — the honest routing (§3.1).

No owner-reserved fork was quietly resolved. This is a clean pass on the mandate's central risk.

---

## EARNED CONVERGENCE: **54%** (up from retro-f4's docked 36%, earned)

| Item / dimension | State | Effect on score |
|---|---|---|
| #11 re-cost as kf-coupled MAJOR + KF-7 relay | **VERIFIED EXACT on disk** (4 kf sites, dispatch doc) | carries the lift over 36% |
| Battery 10→7, Q13-floor arithmetic, derived barrel-pure RED set, META dropped | **VERIFIED to the symbol** | strong credit |
| Axis-A/B split (memoize confined; owner-law per-site) | **coherent, faithful to retro-f4 G2** | credit |
| Dead-sink → live via `.eof()` (retro-f4 G5 answered) | **RAN, 3/6 measured** | credit |
| parseCSSValues fail-closed re-derives U-F29 uncredited + unreconciled with its permissive design | **G1 — the dominant fresh drag** | first drag |
| Permissive-string "lossy" friction un-measured + self-contradicting | **G2 — asserted, not run** | second drag |
| Lossy-class inventory inherited, "one spec-forced site" unproven | **G3** | third drag |
| barrel-cycle framing / no-masking headline / "verbatim" | **G4/G5/G6 minor** | small drag |

**Why materially above 36%**: charter-c is the pass-2 RESPONSE that closes retro-f4's two load-bearing
drags with evidence I reproduced independently — the `#11` cost inversion is now correct on disk, and the
over-scoped memoize is split. The corrected battery is verified end-to-end. Those are real, landable, and
were the retro's dominant docks; closing them earns the lift.

**Why capped at 54%**: the item-2 lossy-success leg — one of the three composed legs — is the soft one. Its
headline resolution (`parseCSSValues` grammar-fail-closed) substantially reproduces an already-landed
tranche-U idiom (U-F29 `329932b`) the charter neither cites nor reconciles with (G1); the "remaining
permissive-string class" it flags is asserted without the one round-trip that would decide whether it is
lossy at all, and contradicts the charter's own non-lossy logic (G2); and the "single spec-mandated site"
conclusion rests on the proto's inherited enumeration, never re-swept (G3). A fresh re-measure against HEAD
— which the charter claims to have done — should have surfaced the U-F29 landing sitting in the same file it
edited.

**Why not BLOCKED**: no primitive is missing. Charter-c is a genuine, landable D3 punch list + a verified
battery correction. The hard parts remaining are (a) an attribution + reconciliation edit against U-F29
(G1), (b) one round-trip measurement + a classification fix (G2), and (c) a drop-site completeness sweep
(G3) — none as hard as the original problem, all with named closers.

**Recommendation to the pass-2 agglomerator**: ADVANCE charter-c at **54%**, not the un-adversaried lift a
"closed all of retro-f4" reading would grant. Adopt as SOLID: the `#11` MAJOR re-cost on the KF-7 relay
rails, the 10→7 battery with barrel-pure as a derived property, and the Axis-A/B split. Require before the
item-2 lossy leg is load-bearing: (a) cite + reconcile U-F29's landed `.eof()`+`CSSParseError` idiom and
the permissive-plural design (G1); (b) MEASURE the permissive-string round-trip and fix the lossy/non-lossy
classification to be consistent with §2 (G2); (c) sweep for other silent-drop sites before asserting one
spec-forced site (G3). The owner-fork hygiene is clean — no fork pre-decided — and the clean-break law
holds end-to-end save the one spec-forced, owner-routed embed-warn site.
