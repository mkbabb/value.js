# S2 — ARCHITECTURE / SCOPE SYNTHESIS

**Seat:** S2, synthesis adjudicator 2 of 3, V·π receiving audit.
**Axis:** authority, module ownership, audit granularity, and the correct continuation graph.
**Subject:** the unchanged frozen tranche at `receiving/AUDIT-SUBJECT.json` — value.js HEAD
`c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`, 2,324 files / 354,220,932 bytes,
`trackedFilesInHead: 0`.
**Standing:** I did not author the subject and did not author any skeptic report. I have made no
edit to any subject byte; my only write is this file.

---

## Model receipt

- **Model identifier I observe myself to be:** `claude-opus-5[1m]`, declared to me by the harness
  as "Opus 5 (1M context)".
- **Effort:** high. Every number below that is not attributed to a skeptic was produced by a
  command I ran in this session.
- **Honest limitation, stated in the terms this tranche's own row A13 demands:** I have no
  introspection channel that yields a served-model receipt. All five skeptics recorded the same
  limitation independently (O1 Model receipt; O2 Model receipt; O3 "`ANTHROPIC_MODEL` and
  `CLAUDE_CODE_SUBAGENT_MODEL` are both unset"; O4 "`env | grep -i model` → no rows"; O5 "I cannot
  cryptographically self-attest served weights"). Five seats reporting the identical gap is
  evidence about the *harness*, not about the seats: **the receiving protocol has no model-receipt
  mechanism at all.** That is a defect in `AUDIT-BRIEF.md`, not in any report, and it must be
  fixed at the spawn layer — O1 says exactly this and is right. Nothing in my findings depends on
  my identity; every one is a re-runnable command or a citation to frozen bytes.

---

## What I executed, and what I only read

**Read in full on disk:** all five skeptic reports
(`opus-skeptic-{1-prompts,2-prototypes,3-authority,4-css-bbnf,5-performance-gestalt}.md`,
5,346 lines total); `HANDOFF-2026-07-24.md`; `ADDENDA-07.md`; `ADDENDA-08.md`; `CHARTER.md`;
`MODULE-DAG.md`; `FEATURE-LEDGER.md` §1–§2.2; `AUDIT-SUBJECT.json`;
`docs/tranches/V/megatranche/SCOPE.md`.

**Executed by me (outputs pasted where load-bearing):**

| # | command | purpose |
|---|---|---|
| 1 | `shasum -a 256` on `mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts` and `MODULE-DAG.md` | verify the two content addresses my axis turns on |
| 2 | `cat` + `wc -l -c` of the accepted parser | read the entire accepted substrate myself (17 lines / 560 bytes) |
| 3 | export census of `src/subpaths/css.ts` | verify the "52" (19 runtime + 33 type) |
| 4 | `grep -nE "^export (const\|function) (parseCssValue\|parseCssValues\|parseCssScalar)"` on `src/css/grammar.ts` + `cat src/subpaths/value.ts` | verify O4-06's type-closure consequence |
| 5 | Python census of all 3,283 rows of `raw-agent-envelopes/*.jsonl` by `content[]` element type, first-line message class, author, and character volume | **resolve the O1-vs-O3/O5 encryption disagreement** |
| 6 | `find -iname "*module-dag*"` + `grep -rl MODULE-DAG` filtered to audit/gestalt/challenge filenames, over the whole 2,324-file tree | test whether `MODULE-DAG.md`'s own invariant 8 was satisfied — **new finding, §3 R-L0** |
| 7 | `sed` reads of `ADDENDA-07.md` §0/§2/§4, `ADDENDA-08.md` §2.1, `FEATURE-LEDGER.md` §2.1, `HANDOFF-2026-07-24.md` §11–§14, `MODULE-DAG.md` whole, `megatranche/SCOPE.md` whole | verify every clause I quote, rather than inheriting a skeptic's quotation |
| 8 | `ls FIRST-VERTICAL*` + read of `FIRST-VERTICAL-AUDIT-A.md` | establish that a vertical was already attempted once in this tranche — **new, §6 P5 preamble** |

**What I did not do:** I did not re-run any benchmark, browser witness, holdout replay, or
denominator derivation. Those are the skeptics' measurements and I adopt or reject them on the
evidence they pasted, never on their eloquence.

---

## §1 — The verdict, in one paragraph

**The substrate is right, the lattice is half-built, the granularity is wrong by roughly an order
of magnitude, and the close condition is unsatisfiable — and only the last of those needs the
owner.** Nothing in five hostile reports identifies a CSS obligation that direct static parse-that
combinators cannot express; what the reports identify is that the substrate has never been tested
above a 17-line leaf, that its performance justification was manufactured by peer selection, and
that the instrument used to certify it spent 44 adversarial seats and found none of the three
defects that decide the acceptance. The correct reformulation is therefore **not architectural**:
it is to move the unit of work from the leaf to the vertical, to build the two machine rails
(neutral paired bench with a fixed peer set; three-way differential oracle) exactly once before
any further candidate, and to schedule the falsifying vertical —
`component value → function/typed math → declaration → qualified rule → stylesheet` — *first*
rather than seventh, because it is the only artifact that could falsify the substrate and
everything ahead of it in the current order is leaf polish. The module lattice keeps its
byte-exact BBNF structural acknowledgement (I re-verified `291e5145…daca8f` myself) and gains a
second ring, three ownership rulings, and a `source` node; that extension does not touch the
acknowledged shared boundary and therefore needs no new cross-repo exchange. The mega-tranche
inherits twelve genuinely decided things — chief among them a *measured* denominator (883 / 1,333
/ 304) that V·π's own nine analyzer generations never produced — and fourteen that must be
re-decided, six of which only the owner can rule.

---

## §2 — (a) Is the direct-static-combinator architecture the right substrate?

### Ruling: **YES. The audit surfaced no reason to reformulate the substrate, and one decisive reason to reformulate its justification and its close condition.**

**What the substrate has actually earned.** The reset rests on owner-verbatim authority, not agent
invention: O1-19 reproduces prompts 004 ("Why do we have a scanner?"), 005 ("You do NOT need a
lexical layer. This is a combinator framework, mate."), and 006 ("A total re-grounding in IDIOMATIC
parse-that must be done"), and records the root agent accepting the veto seven seconds after 005.
O3's supersession lattice independently calls this row L1 "clean; the one clause with a complete
supersession chain." The accepted artifact behaves: O2 reproduced the 180/180 holdout and 65,024
independent-oracle transactions byte-identically from a cold process, ran a 200,000-call
randomized fuzz with **0 throws and 0 offset violations**, bounded a 10⁶-digit input at 1.76 ms,
and measured `consumeNumber.id === 2` stable across 100,000 parses. I read the whole accepted
substrate myself; it is one `regex()` terminal and one `.map()`:

```ts
export const consumeNumber = regex(
    /[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?/,
).map((representation): CssNumber => ({ … }));
```

`shasum -a 256` → `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`, matching
`HANDOFF-2026-07-24.md:169` exactly.

**The three candidate reasons to reformulate, adjudicated one by one.**

**(i) Performance — does not falsify the substrate; falsifies a claim about it.** O5's measurements
are the most consequential in the audit and I adopt them: the G16 "strict equivalent peer win" is
an adapter artifact (candidate slower in **9 of 9** fresh-process runs against a fairly built
same-regex peer, median 1.0269); the timed "deposed" peer is the revision immediately *before*
value.js's own `perf(O.W6)` commit `9aedfc50` retired it, and against the true retained
predecessor the candidate is slower in **9 of 9** (median 1.1484); the percentage lane lost 21.1 %
to the operation-equivalent live kernel and that lane was then dropped; and the 2026-07-20 gate has
live regex ~1.8× ahead of both combinator engines with the c14 sheet ratio 0.0537 against a 0.1000
floor. **None of that is an argument against combinators.** It is an argument against the sentence
"the regex parser was slow," which the tranche's own `GATE-VERDICT.md` F-4 already retired on
2026-07-20: *"the retirement now rests where it always should have — on correctness (F-2's crash
and over-rejection are its defects) and architecture."* O4 then supplied the correctness half with
executable proof: `parseCssColor("oklch()")` throws `TypeError` in `src/` **and** in
`dist/subpaths/css.js`, on a user-typed path at `demo/color-session/picker-color.ts:110`, against a
contract promising `ok:false`. A substrate justified by correctness and maintainability, expected
to land within a small constant factor of a hand-tuned regex thicket, is a coherent engineering
position. A substrate justified by speed is not, and the record shows the tranche resolving that
contradiction by *selecting peers* rather than by amending the charter. **That is the reformulation
the audit compels, and it is a close-condition reformulation, not an architectural one.**

**(ii) Engine semantics — a documented-contract obligation, not a substrate defect.** O2-26
reproduced the parse-that 1.0.0 behaviour on the exact promoted bytes and then did the work no one
else did: it is **not** `skip`-specific. `any()` (dist line 396) and `all()`/`fuseAll()` (line 481)
restore `offset` only on failure, identically; `ParserState.save()/restore()` is a full
`{offset,value}` transaction the core combinators do not use; and `parser.d.ts:18` documents no
failure contract. The right disposition is O2's: affirm `RESEARCH_ONLY`, re-scope the statement to
library level, and require a documented failure-state contract upstream. It becomes a *blocking*
question only at composition depth — which is precisely what the falsifying vertical (§6, Wave 5)
must probe, because the very next production the tranche intends,
`consumeNumber.skip(string("%"))`, sits directly on it.

**(iii) Expressiveness — no skeptic found a limit.** This is the decisive negative finding and I
want it stated plainly, because absence of evidence is being under-read. O4 audited the CSS
semantics lane exhaustively — pinned spec bytes at commit `c7573530…`, a three-engine CSSOM
witness, the full BBNF import graph — and identified **zero** normative constructs the substrate
cannot express. `MODULE-DAG.md:107-109` clause 4 explicitly permits *"exact recursive parse-that
combinator productions for nested functions and blocks"*; the forbidden list is hand-rolled idioms
only (`state.src`, manual loops/slicing, `indexOf`, `balancedUntil`, `splitTopLevel`, generic
remainder, `[^)]*`/`[^;{}]*`). O1-15 adds the exculpatory reading: parse-that 1.0.0's own
`containsDelimiter`/`splitBalanced` are *not* on the forbidden list, and the owner's own words at
PI 004 were *"If you're using generalized facilities that scan within parse-that, so be it."*

**The honest caveat, and it is large.** O2-19 is right that the no-scanner compliance gate is
currently **vacuous — it cannot fail**, because the active runtime is one regex plus one map, and
no configuration of that could contain a token tape. So the substrate is **right but unproven above
the leaf**. Four obligations remain entirely untested by anything in the tranche: recursive
block/function productions at depth, error recovery, source-span/offset preservation back to
original UTF-16 positions, and value-transactionality under composition. **The first thing the
continuation must build is the artifact that could falsify the substrate, and only if that artifact
requires a forbidden construct is reformulation on the table.** That is a schedulable test, and
§6 Wave 5 schedules it.

**One argument I explicitly reject.** O5-F02's byte-loop `scanNumberFast` is scanner-shaped and
~15 % faster, and O5 asks whether it belongs in the peer set. It does — O5's own answer, *"yes, as
a peer, never as an ancestor,"* is correct and is not in tension with `ADDENDA-07 §3`'s
anti-scanner gate, which rejects retired-tree imports **into candidates**. O2-20 already
established the same candidate-vs-peer distinction for the quarantine boundary. Refusing to *time*
the fastest retained implementation because its architecture is vetoed is exactly how a
replacement ships slower than what it replaced.

---

## §3 — (b) The correct module lattice

### Ruling: the acknowledged 16-node DAG is **structurally sound and semantically incomplete**. Keep it as the *trunk ordering*; it is not, and must stop being carried as, a module lattice for the mandatory surface.

**What is settled and must be inherited unchanged.** `MODULE-DAG.md` hashes to
`291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` — I verified this myself, and
O1-17 and O3-11 each verified it independently against the terminal ACK in PI prompt 010. O4
transcribed the graph mechanically: **16 nodes, all reachable from `stylesheet`, zero cycles**. O3
reproduced the entire BBNF receipt chain to the byte (15 files, 276 declarations, 1,329 lines,
56,598 bytes, sorted ledger `907db43f…`, 9-of-15 reachability) and calls it "the best work in the
tranche." That is correct and it should be said out loud in the continuation packet, which
currently does not point at it.

**R-L0 — what the ACK actually buys, measured by me, and it is less than the handoff says.**
`HANDOFF-2026-07-24.md:20` presents the file as *"terminally acknowledged production-family
ownership"*. Its own first line reads:

```
MODULE-DAG.md:3   **Status: PROPOSED / challenge required (2026-07-22).**
```

and its own invariant 8 (`:118-120`) sets the condition for credit:

> "The exact graph and all module roots are content-addressed, **twice challenged,
> gestalt-adjudicated**, and acknowledged by the BBNF task **before shared-boundary credit**."

Three of those four are testable on disk and I tested them. Content-addressed: **YES**
(`291e5145…daca8f`, verified). BBNF-acknowledged: **YES** (O1-17, O3-11, both independent).
Twice challenged and gestalt-adjudicated: **NO** — `find -iname "*module-dag*"` over all 2,324 files
returns exactly one file, the document itself; there is no `MODULE-DAG-AUDIT-A/B` and no
`MODULE-DAG-GESTALT`, in a tree where `ADDENDA-02..05` each carry all three and `ADDENDA-06` carries
two. So the graph satisfies the *external* half of its own credit condition and fails the *internal*
half. **This is the ownership-lattice analogue of O3-02, and no skeptic reported it**: O3 measured
the missing E-3 artifacts for `ADDENDA-07`/`08` and O4 measured the graph's semantic gaps, but
neither tested the DAG against its own invariant 8. The correction is not to withdraw the ACK — the
ACK is real and its text is honest about being structural only — it is to stop describing a
self-declared `PROPOSED / challenge required` document as terminal ownership, and to give it the two
challenges and the gestalt it asks for, which `ADDENDA-09` can carry at the same time as the Ring-2
rulings below (P4.1).

**What is not settled, from O4's lens, and which I adopt in full.**

1. **Node count is 16, not 15.** BBNF's 15 families plus the new `timeline-range`.
   `MODULE-DAG.md:124`'s "fifteen" is about BBNF. Any downstream count of 15 for the proposed DAG
   is off by one.
2. **`timeline-range`'s home is self-contradicted three ways** — `:26` "(ledger-derived submodule
   under `values`)", `:62` `keyframes -> tokens, properties, timeline-range` (a direct import), and
   `:115` "the shared semantic owner below `values`". Until ruled, "one owner" is not
   implementable. **I add a fourth site O4 did not reach:** `FEATURE-LEDGER.md` §2.1 spells the
   owner of `TIMELINE-RANGE-NAME` as `values/timeline-range` — the submodule reading — in the very
   queue that schedules the work, so the contradiction is already load-bearing on the *execution*
   document and not only on the graph. Any seat that implements the ledger row as written and the
   graph as drawn produces two different import topologies from one ruling.
3. **`bare-keyframe-percentage` is mis-assigned.** `:84`/`:91` place a css-animations-**1**
   production, which predates scroll-driven animations and carries a different bound, inside the
   timeline-range ownership block — violating the document's own invariant 2 one line before it
   says "The two percentage domains remain distinct."
4. **The graph cannot host the surface it is gated on.** `CHARTER.md:38` requires "all 52 exports
   … TOTAL"; mapping the 19 `/css` runtime exports onto the 16 nodes leaves **≥6 with no owner** —
   `coerceToSyntax`, `collectPropertyDescriptors`, `collectCustomFunctions`,
   `parseAnimationTimeline`, `serializeTimelineOptions`, and partially `collectTimelineOptions` —
   while `src/css/stylesheet.ts:691-695` already parses `@scope` and `@starting-style` with no
   at-rule / descriptor / custom-property / recovery node anywhere in the graph.
5. **BBNF is a target, not a source of truth.** In committed BBNF, `values` — the hub the proposed
   DAG centres on — is **unreachable and imported by nothing**; there are 17 duplicated declaration
   names across 6 module pairs plus a 12-production uppercase shadow layer inside `keyframes.bbnf`;
   and `keyframes.bbnf`'s `KEYFRAME_SELECTOR` folds the comma-list *inside* the singular production
   and has an unreachable ordered-choice arm. Isomorphism means repairing those, never transposing
   them — which `ADDENDA-07 §1.2` already says.

**One further defect I verified myself, which no skeptic surfaced as a lattice consequence.** The
52-export `/css` door is **not type-closed**:

```
src/css/grammar.ts:334  export function parseCssScalar(source: string): ParseResult<CssScalar>
src/css/grammar.ts:393  export function parseCssValue(source: string):  ParseResult<CssValue>
src/css/grammar.ts:397  export function parseCssValues(source: string): ParseResult<CssList>
src/subpaths/value.ts   export type { CssCall, CssList, CssScalar, CssValue } from "../value";
```

`CssValue`, `CssList`, and `CssScalar` appear in the 33 types of `src/subpaths/css.ts` **nowhere**
— they are exported only from `/value`. Three of the 19 `/css` runtime exports cannot have their
return type named from their own door. O4-06 found the symptom at consumer scale (63 symbols over
6 doors, not 37 over 1); the *lattice* consequence is that grammar-result shapes are a first-class
ownership row, and a mirror that reproduces the door split without booking it will reproduce an
untypeable contract.

### The lattice to build

**Ring 1 — the acknowledged trunks (unchanged, immutable at `291e5145…`).** `tokens`, `value-unit`,
`keywords`, `func-body`, `timeline-range`, `color`, `easing`, `gradients`, `transforms`, `filters`,
`values`, `properties`, `selectors`, `media`, `keyframes`, `stylesheet`.

**Three ownership rulings on Ring 1** (all follow from the document's own invariants; none changes
the shared boundary):

- **R-L1 — `timeline-range` is a PEER TRUNK below `values`, not a submodule inside it.** Two
  consumers reach it (`keyframes` directly per `:62`; `properties` only transitively via `values`).
  Under the submodule reading, `values` must re-export the timeline-range productions for
  `properties` to see them, which reintroduces a second exporter by the back door and defeats
  invariant 2. Rule it a trunk; `keyframes`, `properties`, and `values` each import it directly.
- **R-L2 — `keyframes` owns `bare-keyframe-percentage`; `timeline-range` owns the seven names and
  the unbounded named-range percentage.** This is O4's recommendation and it is the only assignment
  consistent with invariant 2, since the two percentages differ in bound *and* in provenance.
- **R-L3 — grammar-result shapes (`CssValue`/`CssList`/`CssScalar`/`CssCall`) are owned by
  `values`.** The `/css`-vs-`/value` door split is a packaging fact of the frozen 4.0.0 surface,
  not a grammar fact, and must be booked as an adapter concern rather than replicated as a lattice
  boundary.

**Ring 2 — the families the DAG's own §Denominator reminder names and the graph does not draw.**
Each is a named node reachable from `stylesheet` (satisfying invariant 1), added *below* existing
trunks:

| new node | owns | parent |
|---|---|---|
| `source` | CSS input preprocessing + mapping back to original UTF-16 offsets | below `tokens` |
| `recovery` | error recovery + source fidelity as grammar productions | below `stylesheet`, used by all |
| `at-rules` | at-rule prelude/block dispatch; `@scope`, `@starting-style`, forward-compat unknowns | below `stylesheet` |
| `descriptors` | `@property` / `@function` descriptor grammar; `coerceToSyntax` syntax strings | below `at-rules` |
| `custom-properties` | registered + unregistered custom property grammar, substitution | below `properties` |
| `conditions` | media/container/supports/style-query condition trees | already partly in `media` |
| `cascade` | layers, scope, nesting | below `stylesheet` |
| `timeline-notation` | `scroll()` / `view()` functional notation, timeline descriptors, serialization | below `func-body` + `timeline-range` |
| `images` | images beyond gradients | below `values` |
| `fonts`, `counters`, `shapes-motion` | the remaining named families | below `values` / `properties` |
| `experiments` | the owner's experimental functions and spaces | below `values` |

**R-L4 — the `source` node carries a hard non-scanner gate.** It returns a *preprocessed string plus
an offset map*, never a token sequence; it is consumed by grammar productions, not by a runtime.
`FEATURE-LEDGER.md §2.1` already proposes `SYNTAX-SOURCE-MAP` as a row and correctly says "no token
stream"; MODULE-DAG has no node for it, and *every diagnostic and span door depends on it*. This is
the single most likely place for the rejected architecture to re-enter under a new name, and it
must be gated explicitly at introduction rather than caught at review.

**R-L5 — Ring 2 does not require a new BBNF acknowledgement.** The terminal ACK (PI prompt 010,
quoted by O1-17) states it *"grants no Value or BBNF mutation, implementation, conformance,
movement, package, release, or production authority"* — it closed the shared **reachability and
ownership boundary** only, i.e. the 16 trunk names and their import direction. Adding families
below existing trunks with `stylesheet` reachability satisfies invariant 1 and `ADDENDA-07 §1.2`
without altering that boundary. **Therefore Ring 2 is not blocked on BBNF and may be scheduled
immediately.** A change to the trunk names or the import direction *would* require a new exchange.
To keep the ACKed bytes immutable, Ring 2 is written to a new file (`MODULE-DAG-2.md`) and
`MODULE-DAG.md` at `291e5145…` is never edited.

---

## §4 — (c) At what granularity should the 3×5×3 law apply?

### Ruling: **per coherent VERTICAL, at the owner's full seat floor (5 skeptics + 3 adjudicators), with a mandatory executed-evidence requirement. This captures ~5.5× of O5's ~10× savings without touching the owner's floor at all — and therefore does not block on an owner ruling.**

**What the owner actually said, and what was done to it.** PI 006, verbatim (O1-07, O5-F12):
*"no less than 3 orthogonally begat prototypes **per feature**."* The owner never defined "feature."
`ADDENDA-07.md:104-107` defines a feature row as *"the smallest independently specifiable grammar
operation"* — granularity-**minimizing**. `ADDENDA-08.md:137-141` then writes that the unit is
*"the coherent feature operation defined in `ADDENDA-07 §2`"*, and O1-07 measured
`grep -ni "coherent" ADDENDA-07.md` → **0 hits**. A granularity-loosening term was attributed to a
section whose actual text is granularity-minimizing, and the false citation propagated into four
downstream documents including the preflight census. `ADDENDA-08 §2.1(2)` then bolted it shut in
the same breath — *"Any proposed regrouping, exemption, or weaker granularity is a new
owner/addendum decision, not a handoff interpretation"* — which O1 credits and I credit too. **The
net effect: no document currently in force defines the unit on any authority the owner supplied.**

**The measured economics of the granularity actually executed.** I adopt O5-F11/F12/F14 and
O2-22/24 without qualification, because they are arithmetic over a frozen ledger and both seats
pasted their method:

| measurement | value |
|---|---|
| adversarial seats spent on the one accepted feature | **44** (law prescribes 8) — 5.5× |
| generations burned → acceptances | **34–40 → 1** (2.9 %) |
| authored machinery lines per accepted parser line | **≈ 2,137 : 1** |
| authored process bytes per accepted source byte | **17,916 : 1** |
| detection yield of those 44 seats on the 3 blockers that decide the acceptance | **0 of 3** |
| time for one seat to find all 3 with a 200-line script and `git log -S` | ~30 minutes |
| `syntax-number-start`: 7 generations, 72 files, candidate code produced | **zero** |
| extrapolation at leaf granularity (explicitly an estimate) | ~4,069 h ≈ 2.0 years @ 8 h/day |

`syntax-number-start` is the reductio and it should be quoted whenever this decision is
re-litigated: seven complete admission / holdout / benchmark ceremonies, `candidates/` and `bench/`
both **empty**, terminal verdict `TWO_REJECTS_PLUS_ROOT_REJECT_BEFORE_CANDIDATE_CODE`.

**Two dials are being conflated, and separating them is the whole answer.**

**Dial 1 — the unit of candidate ORTHOGONALITY (the "3"). This must move to the vertical.**
Orthogonality is a property of *design*, and a 17-line regex terminal has no design space: H/B/S
produced three near-equivalent regexes. The one place the instrument demonstrably produced design
information was where the operation was big enough to have a design — O5 cites
`raw-agent-messages:7396`, where candidate B was 14–40× slower *because it allocated per code
point*. That is the instrument working, and it only works at a scale where implementations can
genuinely diverge. At leaf granularity the three-candidate rule degenerates into three spellings of
the same regex, and the record shows exactly that.

**Dial 2 — the unit and modality of ADVERSARIAL REVIEW (the "5" and the "3"). Here the failure is
modality, not count.** 44 seats produced 1,608 lines of prose dominated by hash restatement and
caught none of F01/F02/F03. The binding fix is O5-F13 rule 4: **a review containing no executed
command scores zero.** Every finding that mattered in this entire audit — O2's holdout replay and
200k fuzz, O4's three-engine CSSOM witness and R1 stack trace, O5's 9-of-9 pairwise replays, my own
envelope census — came from an executed command. Every finding that was missed was missed by prose.

**Where the two skeptics conflict, and how I resolve it without exceeding my authority.** O5-F13
proposes reducing to *2 hostile reviewers + 1 adjudicator per vertical*. O1-05 establishes with
verbatim owner bytes that the floor is higher than that and that the one prior attempt to lower it
had no owner backing: BBNF prompt 030 — *"no less than **two** challenging and gestalt passes …
**Swear. Hic et ubique.**"* — and PI 006 — *"**Union** this with our above approaches and
disciplines, like the above quintet, or thrice auditing method."* "Union" is set union: keep both.
Every document in the packet converted it to "subsumes," and `ADDENDA-08`'s own law-table row is
*titled* "twice/thrice audit **union**" while its rule reads *"the quintetto **subsumes** the older
two-pass floor."*

**Therefore I rule as follows, and the arithmetic is the point:**

- **Adopt the vertical as the unit** (Dial 1), by a properly-E-3'd `ADDENDA-09` row —
  `ADDENDA-08 §2.1(2)` expressly permits *"a new owner/**addendum** decision."*
- **Do not reduce the seat count** (Dial 2). Five skeptics + three adjudicators per vertical, and
  the E-1 two-pass wave close that "union" preserves, remains owed.
- **Add the executed-evidence floor**: every skeptic and every adjudicator re-runs the differential
  and the benchmark and pastes output; a report with no executed command is not a report.

**Cost consequence:** 44 seats per **leaf** → 8 + 2 seats per **vertical** of ~14 leaves. That is
roughly **1/70th per leaf**, and conservatively — allowing that verticals are genuinely larger and
harder — an order of magnitude cheaper overall, achieved **entirely by moving the unit and none of
it by weakening the owner's floor**. Only the last increment (5+3 → 2+1) requires an owner ruling,
and it is worth perhaps 20 % of the remaining cost. **The continuation graph is therefore not
blocked on the granularity question.** That is the single most useful scheduling fact this axis
produces.

**One process debt that must be paid first.** `ADDENDA-07` and `ADDENDA-08` — the only two addenda
dispositioned active — are the only two that never received the E-3 treatment they impose. O3-02
measured it: `ADDENDA-02..05` each have `-AUDIT-A`, `-AUDIT-B`, `-GESTALT`; `06` has both audits;
`07` and `08` have none, and `ADDENDA-07`'s claimed *"one hostile protocol challenge"* returns
exactly one grep hit across 2,324 files — the sentence claiming it. `ADDENDA-09` must not repeat
that. It is one document and three seats; it is the cheapest correction in this entire report.

---

## §5 — (d) DECIDED versus MUST-BE-RE-DECIDED

### DECIDED — the mega-tranche inherits these and may not re-litigate them

| # | Decision | Basis (independently verified) |
|---|---|---|
| D-1 | **Architecture veto**: no lexer, scanner runtime, token tape, atom algebra, generic CST, or feature-local source cursor | Owner-verbatim PI 004/005 (O1-19); O3 lattice row L1 "clean"; agent acceptance in 7 s |
| D-2 | **Language scope**: the complete pinned July-2026 CSS corpus + owner experiments; the 52-export `/css` surface is a *compatibility invariant*, not the denominator | Owner-verbatim PI 002; quantified by O4-07 as **52 : 304 : 883 : 1,333** |
| D-3 | **The pinned corpus identity**: CSSWG commit `c7573530…`, tree `75bf19c0…`, 168 sources, 168/168 paths + blob OIDs + SHA-256 + byte lengths re-derived | O4-07 step 1–2, `gh api` + full download. **The single most reusable artifact V·π produced.** |
| D-4 | **The BBNF structural boundary**: HEAD `af15f63e`, CSS tree `3bbedd62`, 15 files / 276 decls / 1,329 lines / 56,598 bytes, sorted ledger `907db43f…`, `MODULE-DAG.md` = `291e5145…daca8f` with terminal ACK | O3-11 and O1-17 independently; DAG hash re-verified by me. Structural only — the ACK text disclaims implementation/conformance credit |
| D-5 | **Engine pin**: `@mkbabb/parse-that@1.0.0` exact, integrity `sha512-ygzF6JPb…`, real directory not a workspace link, exports only `.`, `./core`, `./diagnostics`; **no consumable uplift exists (RED)** | O3-11; O2-12 |
| D-6 | **The keyframe-selector normative grammar**: four arms, seven names, named-range percentage mandatory *and* unbounded, bare percentage bounded `[0,100]`, comma-list above the singular | O4-01: pinned spec bytes `scroll-animations-1/Overview.bs:1338` + three-engine CSSOM witness. **Upgraded from prose to spec-bytes + witness.** |
| D-7 | **E-16 as a law**: exactly one semantic owner per normative production | O4-04 confirms the law *and* a live three-way violation in shipping `src/` |
| D-8 | **The separator-identity law** (new synthesis product): never normalise commas to whitespace before component splitting — one mechanism behind four separately-filed rows E03/E09/E10/E11 | O4-11, executed differential vs Chromium 148 |
| D-9 | **R1 is a live shipping crash** in 4.0.0, in `src/` and `dist/`, on a user-typed path | O4-02, full stack trace, `src/css/grammar.ts:181` |
| D-10 | **The honest performance posture**: the replacement is justified by correctness and architecture, never by speed | `GATE-VERDICT` F-4 (2026-07-20) + O5-F09 confirming it at three independent scales |
| D-11 | **G16's CORRECTNESS and ARCHITECTURE credit** for `SYNTAX-CONSUME-NUMBER`: 180/180 replay, 65,024 oracle transactions, byte-identical promotion, no-throw over 200k fuzz, static parser identity | O2-04/05/28, all re-executed cold |
| D-12 | **Model truth**: zero Opus turns across all three Codex threads; historical Fable/Opus labels are requirements, not receipts | O1-12, machine-verified from `turn_context` |

### MUST BE RE-DECIDED — nothing here may be inherited as settled

| # | Item | Who can rule | Why |
|---|---|---|---|
| U-1 | **G16's PERFORMANCE credit** (`PASS_STRICT_WIN`) | `ADDENDA-09` | Refuted 9/9 under a neutral peer; candidate 15 % slower than the true retained predecessor (O5-F01/F02) |
| U-2 | **The close condition**: `HANDOFF §13` speed rail vs `CHARTER` G-3 absolute bars vs `GATE-VERDICT` OC-1 | **OWNER ONLY** | Three live documents disagree; the pinned proof authority says the floors "don't transfer to this rig"; OC-1 open since 2026-07-20 and absent from every live document (O3-04, O5-F09/F14) |
| U-3 | **`SYNTAX-CONSUME-NUMBER`'s `APOTHEOSIS_ACCEPTED` status** under `ADDENDA-07 §2`'s ledger-freeze precondition | `ADDENDA-09` under real E-3 | Accepted 43 h *before* the only permitting text, in an unratified document declaring no supersession (O3-01) |
| U-4 | **The 3×5×3 unit** | Owner **or** an E-3'd addendum | `ADDENDA-08 §2.1(2)`'s own self-guard |
| U-5 | **The module lattice below the 16 trunks**, and the DAG's own standing | `ADDENDA-09` | Self-contradiction on `timeline-range` in four places (O4-09 + `FEATURE-LEDGER` §2.1, mine); mis-assigned bare percentage; ≥6 of 19 exports unowned (O4-09); and the graph has not received the twice-challenge + gestalt its invariant 8 requires (R-L0/S-11, mine) |
| U-6 | **The 76-root seed denominator** | `ADDENDA-09` | Falsified on its face: `css-mixins-1` is `UNCLASSIFIED_RED` while the frozen surface already parses `@function` and exports three of its symbols (O4-07) |
| U-7 | **The exported `KeyframeSelector` type** (4 names + `offset?` vs 7 names + mandatory) | **OWNER** — cross-repo, keyframes.js imports it | Spec conformance and the frozen contract cannot both hold (O4-03, O4 Q3) |
| U-8 | **The parser-proof P-1 GREEN** | `ADDENDA-09` | 35 % `OUT_OF_SCOPE`; all 22 keyframe rows filed out-of-scope on a door where the mirror is provably wrong; 2 `liveOk` receipts affirmatively false against the named live module (O4-10) |
| U-9 | **`ADDENDA-07`'s "OWNER-RATIFIED" label** and the ~200 lines of process machinery beside it (§2 freeze protocol, §4 custodian rules, §6 benchmark law) | Owner | No ratifying prompt exists; zero audit/gestalt artifacts; the claimed hostile challenge has no artifact (O1-06, O3-02) |
| U-10 | **SUPERSEDED-BY-CONSUMPTION** — a live, unbounded, undelivered instruction telling an external fleet to stand down on ~20 registry rows plus the whole CSS L4 surface against a 17-line delivery | Owner | O3-06 BLOCKER; `SCOPE.md` M-10 forbids "next tranche decides" |
| U-11 | **R13–R33** — 21 exact spec corrections with fixture tables, carried by no live document | `ADDENDA-09` | O3-15 |
| U-12 | **The π/megatranche boundary**: `HANDOFF §13` (π closes, then the megatranche ships) vs `SCOPE.md` M-9 (π folds *into* the megatranche) | **OWNER** | Authored 20 minutes apart, mutually exclusive, neither cites the other (O3-08) |
| U-13 | **Fable / E-5 routing** | Owner | `CHARTER §Constraints` and `PI.md §4` still print "Fable sparingly"; `SCOPE.md` M-2 says "Not Fable" and claims supersession; **no π document records it** (O3-07). M-2 also mis-attributes the routing law to `ADDENDA-07`, which contains no Fable clause — I confirmed this by reading `ADDENDA-07` in full |
| U-14 | **The `ENCRYPTED_UNMATERIALIZED` disposition class** | `ADDENDA-09` | Must be **split**, not struck — see §7, S-1 |

---

## §6 — THE CONTINUATION GRAPH

Ordered, wave-shaped, each entry small enough to schedule as one seat-set or one artifact. Waves 0,
2, 3, 4 and 10 are **unblocked today**. Wave 1 runs in parallel and gates only its named dependents.

### Wave P0 — Ledger corrections (unblocked; ~1 document + 3 seats)

| id | entry | blocks |
|---|---|---|
| P0.1 | Author **`ADDENDA-09`** under real E-3 — triumvirate dispatch → two independent hostile challenges → gestalt → owner ratification. It is the only vehicle for every `ADDENDA-09` row below. Do **not** repeat 07/08's self-exemption | P0.2–P0.6, U-1, U-3, U-5, U-6, U-8, U-11, U-14 |
| P0.2 | Strike the **performance clause** from `g16/acceptance.json` by addendum row; retain the feature on its correctness/architecture evidence (D-11); do not re-open the whole 3×5×3 | — |
| P0.3 | **Split `ENCRYPTED_UNMATERIALIZED`** per §7 S-1: 1,243 FINAL_ANSWER envelopes are materialized and must be swept for findings; 2,040 MESSAGE envelopes keep the class. Re-run the coverage ledger's disposition column over the 1,243 only | the finding-totality gate |
| P0.4 | Replace both document-granular disposition tables with one **clause-granular supersession table**; either define "`08` supersession" or strike the instruction at `HANDOFF-2026-07-24.md:19` | U-3 |
| P0.5 | Consolidate **R1–R33** into `FEATURE-LEDGER` as fixture rows with an owning family per row (R19's 11-row `rgb()`/`hsl()` homogeneity table is the model) | Wave 5+ fixtures |
| P0.6 | Split "Owner laws" into **§3a owner speech** (verbatim + prompt id + timestamp) and **§3b derived rules**; restore the three dropped laws (clean-break/no-shim ×3, agent orchestration ×4, maximal parallelism ×2) and the PI-004 "so be it" scanning permission; correct the three edits O1 measured (defects→addenda inversion, union→subsumes, feature→"coherent feature" false citation) | — |

### Wave P1 — Owner asks (parallel; each gates only its dependents)

| id | ask | gates |
|---|---|---|
| P1.1 | **The close condition.** Amend `HANDOFF §13`'s "strictly faster on every genuinely comparable retained peer lane" to a ratified regression budget, and rule OC-1 (do `CHARTER` G-3's absolute bars survive?). `GATE-VERDICT` F-4 already argued it | any acceptance carrying a performance verdict |
| P1.2 | **The 3×5×3 unit** — vertical (this report) vs smallest-operation (`ADDENDA-07 §2`) vs 2+1 seats (O5-F13). **Operable default pending ruling: vertical at 5+3.** | nothing — the default is operable |
| P1.3 | **π/megatranche boundary** — `HANDOFF §13` vs `SCOPE.md` M-9 | whether `PI-CLOSE.md` is a required artifact |
| P1.4 | **`KeyframeSelector` public type** — 7 names + mandatory offset (spec) vs 4 + optional (frozen contract). Cross-repo: keyframes.js imports it | P7.3 |
| P1.5 | **SUPERSEDED-BY-CONSUMPTION** — retract, bound to π's actually-delivered verticals, or deliver honestly with the real state attached. Deferral is forbidden by `SCOPE.md` M-10 | the megatranche's registry rows V03/C12/C15/V04–V28 |
| P1.6 | **Fable / E-5** — does `SCOPE.md` M-2 supersede `CHARTER §Constraints`? Record the answer in a π document either way | seat routing |

### Wave P2 — The two machine rails, built ONCE, before any further candidate (unblocked; highest leverage)

| id | entry |
|---|---|
| P2.1 | **The neutral paired benchmark harness**, one file, five hard rules: (a) **lane symmetry** — no lane pays an adapter another does not; a peer that cannot natively produce the observation shape means *every* lane takes the same wrapper; (b) **no oracle fields** into any lane; (c) **fixed peer set** (P2.2); (d) throughput in UTF-8 bytes or no unit at all; (e) **≤ 2 lanes per process** |
| P2.2 | **The addendum-bound peer manifest**: (a) the operation-equivalent extraction of the *live shipping* implementation, (b) the **fastest retained predecessor established by measurement** via `git log -S` over the production path — for numbers that is `numberFastParser`/`scanNumberFast` at `9aedfc50`, **not** its ancestor at `9aedfc50^`, (c) the previous accepted generation. **A peer that once produced a loss may never be dropped without an addendum row naming the loss.** Without P2.2, O5-F02 and O5-F04 recur by construction at every subsequent feature |
| P2.3 | **Re-run consume-number's benchmark once** against the corrected peer set and publish the honest number. Expect the candidate to lose. That is the point, and P1.1 is what makes losing survivable |
| P2.4 | **The three-way differential oracle** (pinned spec corpus × live engine × browser CSSOM) as one reusable rail, with two hard gates: a door that *has* a mirror implementation may not be filed `OUT_OF_SCOPE`, and `OUT_OF_SCOPE` may not exceed a declared fraction of rows. Withdraw or re-gate the parser-proof **P-1 GREEN**; correct the two false `liveOk` receipts (ids **104** `101%`, **213** `exit 101%`) |
| P2.5 | Reserve the word **"sealed"**: ciphertext + external key + **non-null** `frozen_candidate_set_sha256` + a custodian with no read access to candidate paths. G16 satisfies only the first; everything else in the tranche satisfies none. Ban the unqualified word **"peer"** until one third-party implementation is resolved and executed |

### Wave P3 — Denominator: cheap, curated, honest (unblocked; recovers 72 % of the tranche's bytes)

| id | entry |
|---|---|
| P3.1 | Delete the eight rejected `denominator/occurrence-owner-formation-v1..v8` payloads and their shards; **retain the 11 rejection receipts and the tools** (~30 KB). Recovers **255,457,954 bytes** with zero loss of dispositioned truth |
| P3.2 | Adopt **O4-07's measured denominator** as the working ledger: 883 (76-root seed) / 1,333 (168-source union) / 304 (value+keyframes slice), with its four stated biases recorded so it is read as a **lower bound**. One curated TSV — spec URL · section · production name · owning module · status — ~100 KB. The root proposed exactly this itself at `raw-agent-messages:6496` |
| P3.3 | **Grow the seed or shrink the compatibility ring.** `css-mixins-1` (`@function`, already parsed and exported by the frozen surface), `pointer-animations-1` (`animation-range-center`), and `css-color-hdr-1` are complement/RED. The seed as it stands is falsified |
| P3.4 | *(optional, cheap)* second denominator instrument (`@webref/css`) to tighten the lower bound |

### Wave P4 — Lattice ruling and Ring-2 extension (unblocked; needs no BBNF exchange per R-L5)

| id | entry |
|---|---|
| P4.0 | Give `MODULE-DAG.md` the **two independent challenges and the gestalt its own invariant 8 requires** (R-L0). It currently self-declares `PROPOSED / challenge required` while the handoff calls it terminal ownership; the BBNF ACK supplies only the external half of its credit condition. Same seats can carry P4.1 |
| P4.1 | Rule **R-L1** (`timeline-range` = peer trunk), **R-L2** (`keyframes` owns `bare-keyframe-percentage`), **R-L3** (`values` owns grammar-result shapes) into `ADDENDA-09`. R-L1 must also correct `FEATURE-LEDGER.md` §2.1's `values/timeline-range` owner spelling, or the ledger and the graph will be implemented as two different topologies |
| P4.2 | Author **`MODULE-DAG-2.md`** = Ring 1 unchanged + Ring 2 (§3 table). Leave `MODULE-DAG.md` at `291e5145…` byte-immutable |
| P4.3 | Add the **`source`** node with its explicit non-scanner gate (**R-L4**): returns a preprocessed string + UTF-16 offset map, never a token sequence |
| P4.4 | Record the determination that Ring 2 does **not** alter the acknowledged shared boundary, with the ACK text quoted, so no seat later blocks on a phantom BBNF dependency |
| P4.5 | Book the **`/css` type-closure defect** as an explicit compatibility row: three of 19 runtime exports return types exported only from `/value` |

### Wave P5 — THE FALSIFYING VERTICAL (moved from `HANDOFF §11.7` to first construction wave)

This is the reordering this axis most insists on. Everything currently scheduled ahead of it is
leaf polish; this is the only artifact that can falsify the substrate.

**Precedent, which I verified and which no skeptic cites.** A first vertical was already attempted
in this tranche and adversarially audited: `FIRST-VERTICAL-AUDIT-{A,A2,A3,A4,B,B2,B3}.md` — seven
files, 2026-07-21/22, audit A opening `status: REJECT` over content-addressed
`combinators.ts`/`css-token.ts`/`component.ts`/`value.ts`/`color.ts`. Two facts follow. **(i) The
vertical unit is not novel here and it worked as an instrument** — audit A found real composition
defects and the seat's own model receipt honestly refuses to claim Opus or Fable, which is better
receipt discipline than `ADDENDA-07 §4` later required. **(ii) Those audits bind the *pre-reset*
architecture** — the exact files `mirror/REJECTED-PRE-RESET.md` quarantines — so they are evidence
about the method and **zero** evidence about the direct-combinator substrate. P5 must be authored
fresh; the seven audits are a template for the review shape, never an inherited pass.

| id | entry |
|---|---|
| P5.1 | Freeze the vertical boundary: **`component value → function/typed math → declaration → qualified rule → stylesheet`**, over the accepted numeric leaf plus a minimal identifier/string/whitespace/comment set (borrowed from G4 as *fixtures*, not as accepted code) |
| P5.2 | **Three orthogonal candidates for the VERTICAL** (H / B / S), not per leaf; a fourth clean-room seat if H/B ancestry defeats independence |
| P5.3 | Five skeptics + three adjudicators over the vertical, each **required to re-run the P2.4 differential and the P2.1 bench and paste output**. A report with no executed command scores zero |
| P5.4 | The four falsification targets this wave must resolve, none of which the 17-line leaf could touch: (i) recursive block/function productions at depth without a balanced scanner; (ii) error recovery as grammar; (iii) source-span preservation to original UTF-16 offsets; (iv) parse-that's offset-only failure convention (`skip` ∪ `any` ∪ `all`) under real composition depth |
| P5.5 | **The reformulation trigger.** If and only if P5.4 shows the substrate cannot express recovery or spans without a forbidden construct, reopen §2's ruling. Absent that, the substrate stands |

### Wave P6 — Foundation close and leaf recuts (after P5, so they compose into something)

| id | entry |
|---|---|
| P6.1 | Finish **G4 foundation**'s five-skeptic / three-adjudicator close against its exact frozen subject — currently **0 of 5 and 0 of 3 exist**, and no `foundation_g4_skeptic_*` or `_synth_*` seat appears in any of the 3,283 envelopes. Describe its holdout as a **revealed regression suite** (already conceded at `HANDOFF:229`) |
| P6.2 | **Recut percentage** over the accepted number, re-benched under P2.1/P2.2. Its honest status is FAIL until then |
| P6.3 | **Recut known-dimensions** consuming the *canonical identifier production* rather than another boundary regex. The reproduced counterexamples (`1px\` at EOF; `1px\`+LF/CRLF/FF) are exactly what an invented boundary regex produces |

### Wave P7 — Keyframes (gated on P1.4 for the public seam only)

| id | entry |
|---|---|
| P7.1 | `KF-SELECTOR-STANDARD` — the singular four-arm selector, seven names, correct asymmetric bounds, over accepted dependencies |
| P7.2 | `KF-SELECTOR-LIST` — the nonempty comma list, composed **above** the singular production |
| P7.3 | `KF-SELECTOR-PUBLIC-COMPAT` — **gated on P1.4** |

### Wave P8 — Live-defect escalation (leaves V·π; belongs to the megatranche's production lane)

| id | entry |
|---|---|
| P8.1 | **R1**: a one-line guard at `src/css/grammar.ts:181` is not a parser decision. 4.0.0 is immutable and V·π may not touch `src/` — so this must be booked as a megatranche production row with its own witness. The `GATE-VERDICT` mitigation surveyed keyframes.js's 37 seams and missed the demo's text input |
| P8.2 | The **separator-identity family** (E03/E09/E10/E11) as **one law + one fixture table**, not four rows. A mirror that fixes them row-by-row reintroduces them the moment it reuses a comma-normalising splitter |
| P8.3 | The **keyframe split-brain**: `grammar.ts:418` (4 names, optional %, bounded), `types.ts:44` (4 names, `offset?`), `types.ts:85-87` + `timeline.ts:53` (6 names + `normal`, missing `scroll`) |

### Wave P9 — Fan-out (only after P5 proves the substrate)

The seven file-disjoint families from `HANDOFF §11.8`, each scheduled as a **vertical** under the
P1.2 granularity: color + images/gradients · transforms + filters/motion · easing +
animation/timelines · selectors · media/container/supports · properties/descriptors/custom
properties · at-rules/recovery/stylesheet.

### Wave P10 — Integrity and hygiene (schedulable at any time; all unblocked)

| id | entry |
|---|---|
| P10.1 | **Track the tranche in git.** `trackedFilesInHead: 0` on 354 MB means one `git clean -fdx` destroys it and no diff review has ever been possible |
| P10.2 | **Content-address the BBNF sk-v25 handoff** (`109bedae…`) and record the read time. The current cross-task boundary derives from an untracked, unaddressed file, in violation of `HANDOFF:175-176`'s own rule |
| P10.3 | **Stabilize `CARRY-LEDGER.md`.** Three Glass adjudications bind `9e88f9e2…`, a working-tree-only hash on a file already caught moving once (delegation 013). `git show HEAD:` yields `725490e9…` |
| P10.4 | **Correct project memory.** It describes `src/parsing/grammars/*.bbnf`, `src/units/color/matrix.ts`, and a 1,607-test suite that no longer exist; actual `src/` at HEAD is 26 files / ~4,654 lines |
| P10.5 | **Add a harness-layer model receipt** to `AUDIT-BRIEF.md`. Five Opus seats independently reported that no served-model receipt is obtainable from inside a seat. A protocol that demands `turn_context`-grade proof of its subject and accepts self-report from its auditors is asymmetric |

---

## §7 — Settled dispositions

**S-1 — The envelope-encryption disagreement, RESOLVED by measurement.** O1-02 (BLOCKER) reports
all 3,283 envelopes are readable plaintext with 0 non-plaintext and 3,134,390 characters. O3-16,
O5 §5.1 and the coverage ledger report Fernet `gAAAAAB…` ciphertext. **Both measured real things
and both stopped early.** My census of every row:

```
TOTAL 3283   rows containing 'gAAAAA': 2040
  Message Type: MESSAGE       2040 rows — content[0] is a 62–97 char routing stub
                                          content[1] = {"type":"encrypted_content",
                                                        "encrypted_content":"gAAAAAB…"}
                                          167,840 stub chars · 530 distinct authors
  Message Type: FINAL_ANSWER  1243 rows — content[0] carries the FULL readable payload
                                          NO encrypted element
                                          2,966,550 readable chars · 721 distinct authors
exceptions to the split: 0
```

O1 measured `content[0].text` and missed `content[1]`; O3/O5 observed the ciphertext and did not
separate the classes. The split is **exceptionless**. Consequence: `ENCRYPTED_UNMATERIALIZED` must
be **split, not struck**. It correctly covers 2,040 MESSAGE rows. It must **not** cover the 1,243
FINAL_ANSWER rows, which are complete, readable subagent findings — O1's own quoted sample,
`/root/constellation_census`, *"## Constellation census verdict ### Model-truth gate: RED /
UNPROVEN"*, is one of them. **94.6 % of the character volume is readable and is currently
unswept.** O1's consequence stands; its per-row claim does not.

**S-2 — The substrate.** Direct static parse-that combinators are the correct substrate. No skeptic
identified a CSS obligation it cannot express; the performance findings refute a *claim about* the
substrate, not the substrate. Basis: §2 above.

**S-3 — The performance justification.** Correctness and architecture, never speed. `GATE-VERDICT`
F-4 plus O5-F09 at three independent scales, with O4-02's executed crash supplying the correctness
half. Unanimous across the reports.

**S-4 — The DAG's standing.** Structurally sound (16 nodes, reachable, acyclic, byte-exact ACK) and
semantically incomplete (≥6 of 19 mandatory exports unowned; self-contradiction on `timeline-range`;
mis-assigned bare percentage). Both halves are true; O3's positive verification and O4's negative
one are not in conflict once structural-ACK and lattice-completeness are separated. Basis: §3.

**S-5 — 3×5×3 granularity.** Move the unit to the vertical; hold the seat count at the owner's
floor; add the executed-evidence requirement. Basis: §4.

**S-6 — The 76-root seed is falsified**, not merely unratified. `css-mixins-1` is
`root_seed_membership: false` while `src/css/stylesheet.ts:599,676` already parses `@function` and
the frozen surface exports `CustomFunctionRule`/`Descriptor`/`Parameter`/`collectCustomFunctions`,
three of which keyframes.js imports. No skeptic dissents.

**S-7 — The parser-proof P-1 GREEN cannot stand as a gate.** 142 of 403 rows (35 %) `OUT_OF_SCOPE`;
all 22 keyframe-selector rows in that bucket on a door where `mirror/grammar/keyframe-selector.ts`
demonstrably implements all three live defects; and 2 `liveOk` receipts affirmatively false against
`dist/subpaths/css.js`, which the harness itself names as `live`. The two false rows are precisely
the two out-of-bound probes. No skeptic dissents.

**S-11 — `MODULE-DAG.md` has the external half of its credit condition and not the internal half.**
Measured by me, not adopted: content-addressed ✔ (`291e5145…daca8f`), BBNF-acknowledged ✔ (two
independent skeptic verifications), **twice-challenged ✘, gestalt-adjudicated ✘** — no
`MODULE-DAG-AUDIT-*` or `-GESTALT` exists anywhere in 2,324 files, and the document's own status line
is `PROPOSED / challenge required (2026-07-22)` while `HANDOFF-2026-07-24.md:20` calls it
"terminally acknowledged production-family ownership". Its invariant 8 makes all four conditions
prerequisites for **shared-boundary credit**. Disposition: the ACK stands and is honest; the
*terminal ownership* framing does not. No skeptic reported this; it is not in tension with O3-11 or
O4-09, it completes them. Remedy is P4.0, and it is three seats.

**S-8 — Ring 2 needs no new BBNF acknowledgement.** The terminal ACK closes reachability and
ownership at the trunk level and disclaims all implementation authority in its own text.
Extensions below existing trunks satisfy invariant 1 and `ADDENDA-07 §1.2`. Basis: §3 R-L5.

**S-9 — The scanner-shaped predecessor is a legitimate peer.** `ADDENDA-07 §3`'s anti-scanner gate
binds candidate *imports*; a benchmark peer is not a candidate, the same distinction O2-20 applied
to the quarantine boundary.

**S-10 — `SCOPE.md`'s apotheosis shape and 3×5×3 are complementary, not competing.**
`SCOPE.md §2`'s CHALLENGE-D/L/C + three jurors is an **audit** instrument over *existing* items;
`ADDENDA-07`'s three-candidates/five-skeptics/three-adjudicators is a **construction/selection**
instrument over *new* candidates. They must not be merged. Component/library audit uses the former;
the parser program uses the latter.

---

## §8 — Unresolved disagreements (kept explicit; I may not edit these away)

**X-1 — Seat count at the vertical.** *Position A (O5-F13):* 2 hostile reviewers + 1 adjudicator
per vertical, each required to execute; 44 seats bought 0 of 3 detections, so count is not the
binding variable. *Position B (O1-05, and my operable default):* the owner's floor is five skeptics
+ three adjudicators (PI 006) **unioned** with two independent wave passes (BBNF 030, *"Swear. Hic
et ubique"*), and the "subsumes" rewrite has no owner backing. *What would settle it:* an owner
ruling on PI-006's "Union this with our above approaches." *Note:* ~80 % of the savings comes from
moving the unit, which needs no ruling — so this disagreement does not block the graph.

**X-2 — Whether `SYNTAX-CONSUME-NUMBER`'s acceptance is void.** *Position A (O3-01):* the
acceptance violated `ADDENDA-07 §2`'s explicit precondition, the permission postdates it by 43 h in
an unratified document declaring no supersession, and "there is no third reading" — either the
status is void or an owner-ratified law was repealed without an owner. *Position B (O2, O5):* the
substance survives — the correctness evidence replays byte-identically and the promotion is exact —
and the correct remedy is to strike the performance clause and retain the feature. *What would
settle it:* an `ADDENDA-09` ruling produced under real E-3 plus the P2.3 corrected-peer re-bench.
*My narrowing, cited to bytes:* `ADDENDA-07 §4` states *"The formation triumvirate/E-3 governs
normative pins, **ledger boundaries**, observable result contracts, module ownership, and
comparator identities,"* and `ADDENDA-08 §2.1(2)` states that regrouping is *"a new
owner/**addendum** decision."* A third reading therefore exists inside the tranche's own law: an
E-3-compliant `ADDENDA-09` may amend §2's freeze precondition and re-affirm the acceptance on
independently verified correctness evidence. **O3-01's finding of violation stands CONFIRMED; only
its exclusive-disjunction remedy is incomplete.**

**X-3 — The π/megatranche boundary.** *Position A (`HANDOFF §13`, `CHARTER §Authority(b)`):* V·π
closes, `PI-CLOSE.md` is written, and *then* the megatranche performs the production swap.
*Position B (`SCOPE.md` M-9):* *"The V·π parser program folds INTO this mega-tranche as live
prototyping work … not as a closed mini-tranche and not as paperwork."* Authored ~20 minutes after
the handoff; neither cites the other. *What would settle it:* an owner transcript receipt for M-9,
or a direct owner ruling. *Aggravating fact recorded by O3-08 and re-observed by me:*
`SCOPE.md:3-5` declares *"No new tranche letter is opened"* and `docs/tranches/W/` exists three
minutes later — so `SCOPE.md` cannot bear ruling-grade weight on its own bytes.

**X-4 — Whether `CHARTER` G-3's absolute bars survive.** *Position A (O3-04):* `CHARTER.md:48-55`
is a live goal document and still binds VALUE ≥ 0.0500 / SHEET ≥ 0.1000; `ADDENDA-07 §6` and
`HANDOFF §13` silently redefined G-3 as relative-only without an addendum, which is precisely the
comparator-identity change `ADDENDA-07 §4` says E-3 governs. *Position B (O5-F14, `GATE-VERDICT`
OC-1):* the absolute floors *"don't transfer to this rig — the calibration subject itself fails
them,"* so the rail is unsatisfiable and must become a ratified regression budget. *What would
settle it:* the owner ruling OC-1, open since 2026-07-20 and now absent from every live document.

**X-5 — The `KeyframeSelector` public type.** *Position A:* spec conformance wins — 7 names,
mandatory offset, and 4.0.0's exported type breaks. *Position B:* the compatibility ring wins and
the mirror ships a known spec defect. *What would settle it:* an owner ruling coordinated with
keyframes.js, whose real obligation O4-06 measured at **63 symbols over 6 doors**, not 37 over 1.

**X-6 — Retain or delete the 255 MB rejected denominator.** *Position A (`FINDINGS` G05
append-only):* retain. *Position B (O5 open question 5, O2-23):* retain the eight rejection
receipts and the tools; delete the payloads and shards — ~255 MB recovered with zero loss of
dispositioned truth. *What would settle it:* an owner or `ADDENDA-09` ruling. *My scheduling
position (P3.1) follows B*, because both v2 and v3 carry rejection files and the 69.5 MB payload is
byte-equal between them.

---

## §9 — Where I mark a skeptic wrong, and the bytes that do it

Only two, and both are narrowings rather than reversals.

1. **O1-02's per-row claim** that all 3,283 envelopes are readable plaintext is **refuted** by
   `payload.content[1] = {"type":"encrypted_content","encrypted_content":"gAAAAAB…"}`, present in
   exactly 2,040 rows. Its *consequence* — that a class asserting unreadability would exempt real,
   readable subagent findings from audit — is **CONFIRMED** for the 1,243 FINAL_ANSWER rows
   (2,966,550 chars, 721 authors). Disposition: split the class (§7 S-1).
2. **O3-01's "there is no third reading"** is **narrowed** by `ADDENDA-07 §4` ("E-3 governs …
   ledger boundaries") and `ADDENDA-08 §2.1(2)` ("a new owner/**addendum** decision"). The
   underlying finding — that the one accepted feature was accepted in violation of the governing
   clause, and legitimised 43 hours later by an unratified document that declares no supersession —
   is **CONFIRMED and unaffected**.

I mark **nothing else** wrong. O2, O4 and O5's findings in my lens all reproduce from bytes they
pasted, and the three I re-verified myself (the promoted hash, the DAG hash, the 52-export census
and its type-closure gap) came back exact.

---

## §10 — What the next value.js mega-tranche must own because of this

1. **The production lane for V·π's findings.** R1's guard, the separator-identity family, and the
   keyframe split-brain are live 4.0.0 defects. V·π may not touch `src/` and 4.0.0 is immutable, so
   only the megatranche can discharge them (P8).
2. **The `KeyframeSelector` cross-repo type decision**, and the restated compatibility invariant:
   63 symbols over 6 doors, with three `/css` return types living in `/value`.
3. **The terminal disposition of SUPERSEDED-BY-CONSUMPTION** — its own registry rows
   V03/C12/C15/V04–V28 are the addressees, and `SCOPE.md` M-10 forbids deferring it.
4. **The close-condition ruling.** Under M-9 the megatranche inherits `HANDOFF §13`'s unsatisfiable
   speed rail directly. Until it is amended, the structural incentive to select flattering peers
   transfers with it.
5. **The 3×5×3 unit**, since M-9 folds the parser program in — and the obligation to keep
   `SCOPE.md §2`'s audit shape distinct from it (S-10).
6. **The two machine rails (P2) as shared infrastructure**, not per-feature machinery. They are the
   megatranche's cheapest defence against reproducing a 17,916 : 1 process-to-code ratio at seven
   families' scale.
7. **The measured denominator (P3.2) as the ledger of record** — 883 / 1,333 / 304 — and the
   seed-versus-ring decision that `css-mixins-1` forces.
8. **The R1–R33 fixture consolidation**, currently carried by nothing.
9. **Git-tracking a 354 MB untracked tranche** before it is folded into anything.
10. **The `MODULE-DAG-2` Ring-2 lattice**, and the standing determination that extending it needs
    no new BBNF exchange — so no megatranche seat blocks on a phantom cross-repo dependency.
11. **A harness-layer model receipt**, since M-1/M-2 mandate Opus on every seat and this audit
    proved that no seat can attest its own model from inside.

---

## §11 — What I could not verify

1. **My own served model.** No introspection channel. See Model receipt.
2. **Every benchmark timing.** I re-ran none of O5's replays. I adopt them because each pastes a
   method, a corpus hash, and 9-of-9 directional unanimity — but the decisive one (H2 vs
   `deposedFair` / `byteLoop`) has not been replicated by a second party under G16's exact
   predeclared estimator. P2.3 is where that gets settled.
3. **Every browser witness.** I opened no browser. O4's three-engine CSSOM results are adopted on
   its pasted output and its pinned spec bytes.
4. **The G16 holdout replay and the 200k fuzz.** O2's, adopted on its pasted cold-run output.
5. **The 2,040 opaque envelopes.** Unrecoverable without a key; nothing in this report is inferred
   from them.
6. **The 1,243 readable FINAL_ANSWER envelopes.** I proved they are readable and censused their
   authors and volume; I **did not read them**. That is a live, newly-created coverage obligation
   (P0.3), not a discharged one.
7. **`ADDENDA-06`** (7,057 lines) and its two audits. Not read. I make no claim about its interior,
   including whether an OC-1A/B ratification receipt exists inside it — which O3 also flagged as
   the one place OC-1 machinery might survive.
8. **`SCOPE.md`'s owner marks M-1..M-10.** Untracked, moving, agent-authored, no transcript receipt
   located. I treat M-2 and M-9 as **contested**, never as owner rulings.
9. **The 2,862 root assistant messages and the denominator payloads' semantic content.** Sampled by
   others, not by me.
10. **Whether the audit subject should be re-frozen.** `dirtyPathCount: 20` was already stale at 21
    (megatranche) and 22 (`docs/tranches/W/`) during the skeptic phase. The π tree itself verifies
    clean (ledger `b723e3cc…`, tree `948411a8…`), so a note may suffice — but the triumvirate
    should say which.

---

*S2 closed. No subject byte was edited. No coordination message was sent. No disagreement was
edited away.*
