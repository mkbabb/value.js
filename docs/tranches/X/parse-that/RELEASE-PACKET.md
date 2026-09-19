SERVED MODEL: claude-opus-5[1m]

# RELEASE-PACKET — what the parser seam offers, and the condition on taking it

**Authority**: `docs/tranches/X/parse-that/waves/W4.md` §3 item 8, §4 (`RELEASE-PACKET.md` — create,
by `.d`), §5 `X.P.W4.d`, and §6 **G-8**. Sub-tranche X·P; tranche X authority
`docs/tranches/X/COHESION.md`. Written at the **X.P.W4 REPAIR 2** seat, 2026-09-19, sitting of record
2026-09-17 (the owner's begin-word, COHESION §0j).

**Seat disclosure, first, because it bounds what this document may claim.** `W4.md` §5 assigns this
file to `.d`, **a fresh Fable adjudicator** (M-23 §1). `.d` has never been dispatched. This packet is
authored by the round-2 **repair seat**, `claude-opus-5[1m]`, which is fresh to this wave (it authored
no gate, no unit receipt, no close and no check) but is **not** a Fable adjudicator. It therefore
performs only the **transcriptive** half of `.d`'s work — assembling measurements other seats banked
and quoting rulings other authorities made — and performs **none** of the adjudicative half:

- it does **not** rule the 45 `PENDING-ADJUDICATION` seam cells (COHESION §0v routes them to _"`.d`'s
  fresh adjudicator"_, and an Opus seat ruling them would be the very defect M-23 §1 exists to prevent);
- it does **not** stamp `VERIFIED` anywhere (R-A; and `W4.md` §6 G-10's falsifier forbids the stamp
  outright while **G-3** is RED, which it is);
- it decides nothing this packet reports. Every disposition below is quoted by id from an authority
  that is named beside it.

**This packet is not a release, and not an ask.** It states what the seam offers and the predicate
that governs taking it. Whether it may be taken is `RC-P`'s, evaluated by command. **O-15** (the
parse-that evidence packet, SENT 2026-07-27, _"no ask, no bug claim, no dependency on a reply"_) is
**not** converted into an ask by this document, and nothing here asks parse-that for anything.

---

## 1. Delivery — where this file lives and how it travels

|                                                            |                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Delivery point (in-repo, and it IS the delivery point)** | `docs/tranches/X/parse-that/RELEASE-PACKET.md` — this file                                                                                                                                                                                                                    |
| **Ledger row**                                             | `docs/tranches/V/coordination/INBOX.md`, outbound **O-40**, dated 2026-09-19 (E13)                                                                                                                                                                                            |
| **Cross-repo courier**                                     | **COHESION.md §1 SS-6**, quoted verbatim, never rewritten: _"Glass communique assembly … ONE batched BJ letter at the next boundary … root-authored (Fable); E13"_ — the batch is **ACCRETING**; this packet is handed to it and rides it outward                             |
| **Primary recipient**                                      | X·KF / `keyframes.js`, whose **KF.W3** is gate-keyed on `RC-P`. Its pin today is `"@mkbabb/value.js": "4.0.0"` in `keyframes.js@6.0.0`                                                                                                                                        |
| **Also addressed**                                         | X·F (`fourier-analysis`) — as a **NON-EDGE**: fourier receives parser effects only through an admitted, packed value.js release; the direct `parse-that → fourier` edge is FORBIDDEN and is asserted absent. X·V — as the seam's consumer-to-be, once G-9's disposition fires |

**X·P wrote no byte in any sibling repo to deliver this.** `W4.md` §4 lists `keyframes.js/**`,
`fourier-analysis/**` and `glass-ui/**` as Do-NOT-touch, and §6 G-8 keeps the cure arm inside this
wave's bounds: _"'send' here means author in-repo + row + hand to the courier."_ A packet written
directly into a recipient's tree fails the gate **even if its content is perfect**, and SS-6 is the
only lawful cross-repo write path in tranche X. No ad-hoc channel was opened.

---

## 2. The seam, in one table

The normative document is `docs/tranches/X/parse-that/SEAM-CONTRACT.md` (52 rows, signatures,
providers, dispositions, consumer directions). This is its summary, and it does not replace it.

|                                                                                       |                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Surface**                                                                           | the frozen `/css` export set of `@mkbabb/value.js` — **52** names: **19** runtime + **33** types                                                                                                                                                                     |
| **Candidate provider**                                                                | `@mkbabb/parse-that` at `<p2>/typescript/src/css/**`, two lowerings (js · wasm), built through `entry.mjs`                                                                                                                                                           |
| **Disposition census** (the wave's own instrument, `seam-contract-check.mjs`, EXIT=0) | `identical` **7** · `PENDING-ADJUDICATION` **45** · `not-provided` **0**. Both set-differences against `universe-52.json` are **∅**                                                                                                                                  |
| **Rows also carrying `declared-divergence`**                                          | **4** runtime exports — `parseCssColor`, `parseCssValue`, `parseTimingFunction`, `parseStylesheet`                                                                                                                                                                   |
| **Non-goals, declared**                                                               | relative colour is **recognised-not-validated** (promotion is a css-color-5 wave, not opened); `color-mix()` is a **both-sides gap** (verdict _"neither"_, GROUND-A `P-028`) — neither incumbent nor candidate implements it, so the seam neither gains nor loses it |

**What `PENDING-ADJUDICATION` means, exactly.** Per COHESION **§0v**: _"the seam contract publishes
the carried cells as **PENDING-ADJUDICATION** dispositions, not as dispositions the producer cannot
honour."_ A consumer reading this packet today **cannot** treat those 45 rows as settled behaviour.
The ruled-class id set is COHESION **§0w**'s: `{GROUND-C · ID-1/ID-1b · ID-2 · ID-3 · ID-4 · ID-5 ·
PB-11 · R-f1 · E-k2}`; every carried cell carries one of those ids and none is unauthored surface.
Their per-cell ruling is `.d`'s fresh adjudicator's and **has not been performed**.

---

## 3. Every `declared-divergence` row's consumer direction, verbatim

`W4.md` §4 requires this packet to carry _"every `declared-divergence` row's consumer-direction
field"_. Four rows carry that disposition. Each field below is reproduced from `SEAM-CONTRACT.md`
§3 **unedited**; `DIVERGENCE-LEDGER.md`'s own per-row field remains normative and more specific.

### 3.1 `parseCssColor` — `declared-divergence [PB-01 … PB-13 · ADJ-1 · ADJ-2 · ADJ-3 · SP-1 · ID-5 · PB-11 (F-l3) · CAP-9]`, plus `PENDING-ADJUDICATION [GROUND-C ×1]`

> **MIXED, and every arm is rowed.** Measured js ≡ wasm: AGREE 24,252 · DECLARED*DIVERGENCE 2,557 ·
> FIXTURE_R1 211 · MIS_ACCEPT 1. **Strictly safer**: the 211 `FIXTURE_R1` cells are strings on which
> published 4.0.0 \_throws a raw `TypeError`* and the candidate returns `ok:false` with a span and a
> code (`R1`). **Widens**: `PB-01`/`PB-02` (legacy 4-arg `rgba()`/`hsla()`), `PB-04`/`PB-05`
> (out-of-range channel and alpha clamp), `ADJ-2` (token juxtaposition). **Narrows**:
> `PB-06`…`PB-13`, `SP-1` (`hsl(120, 50, 50)` — which 4.0.0 accepted _and returned a 100× wrong value
> for_), `ID-5` (legacy comma form mixing `<number>` with `<percentage>` or `none`). **New refusal
> 4.0.0 has no counterpart for**: `CAP-9` (`Θ.expsnap` = 32 frames, a declared bound). **UNRULED**: 1
> carried `GROUND-C` cell (`rgb(.843, -0, +54, 5e498)`) — a consumer cannot yet predict the answer for
> a non-finite numeral here.

### 3.2 `parseCssValue` — `declared-divergence [ID-1]`, plus `PENDING-ADJUDICATION [GROUND-C ×1]`

> **NARROWS.** Measured js ≡ wasm: AGREE 23,556 · DECLARED_DIVERGENCE 3,344 · FIXTURE_R1 120 ·
> MIS_ACCEPT 1. `ID-1` is the behaviour change a consumer will actually feel: 4.0.0 read a component
> value **unanchored** — `#ff0.99cc` returned the colour `#ff0` and discarded five bytes in silence —
> and the candidate rejects with `css_syntax` spanning the unconsumed tail. A consumer that relied on
> prefix-tolerance breaks; a consumer that fed well-formed values does not. 120 cells are `R1`-class
> (4.0.0 threw, the candidate returns `ok:false`) and are **strictly safer**. **UNRULED**: 1 carried
> `GROUND-C` cell.

### 3.3 `parseTimingFunction` — `declared-divergence [CAP-5 · CAP-6 · CAP-8]`, plus `PENDING-ADJUDICATION [GROUND-C ×23 · ID-2 ×1]`

> **MIXED, and the largest carried remainder on the surface.** Measured js ≡ wasm: AGREE 26,851 ·
> DECLARED_DIVERGENCE 146 · MIS_ACCEPT 23 · FALSE_REJECT_IN_SHAPE 1. **Narrows, ruled**: `ID-2` —
> `steps(1e43,, start)` was accepted by 4.0.0 (the empty list part was skipped) and now rejects.
> **New refusals 4.0.0 has no counterpart for**: `CAP-5` (`Θ.C` = 65,536), `CAP-6` (`Θ.P` = 65,536),
> `CAP-8` (`Θ.arena` = 7,208,960 B) — declared bounds that answer `ok:false` rather than trapping.
> **UNRULED, 23 cells**: `GROUND-C` — whether a `±Infinity` numeral in a `cubic-bezier`/`steps`
> argument is a syntax error or a clamped value is owner-owed. A consumer feeding computed numbers
> that can overflow **cannot predict this export's answer today**.

### 3.4 `parseStylesheet` — `declared-divergence [ID-3 · CAP-1 · CAP-2 · CAP-3 · CAP-4 · CAP-7]`, plus `PENDING-ADJUDICATION [ID-1b ×9 · ID-4 ×5 · GROUND-C ×2]`

> **NARROWS, and it is the export with the most consumer-visible new refusals.** Measured js ≡ wasm:
> AGREE 26,249 · DECLARED_DIVERGENCE 756 · MIS_ACCEPT 7 · FALSE_REJECT_IN_SHAPE 7 · DIVERGENT_VALUE 2.
> **Narrows, ruled**: `ID-3` — a **non-string** argument (a `null` from a failed read, a parsed object,
> a number) returned `ok:true` with an **empty sheet** from 4.0.0, or threw a raw `TypeError` for
> `undefined`/`null`; it now returns `ok:false` with `expected ["<string source>"]`. **New refusals
> 4.0.0 has no counterpart for**: `CAP-1` `Θ.input` = **14,107 code units** — 4.0.0 parses inputs of
> any size, so a consumer whose stylesheets exceed 14,107 code units must chunk or read the diagnostic
> — plus `CAP-2` (`Θ.marks` 32,768), `CAP-3` (`Θ.recoveries` 4,096), `CAP-4` (`Θ.D` 4,096), `CAP-7`
> (`Θ.vstack` 65,536), and a `<nesting-depth>` bound of **64 levels**. **UNRULED, 16 cells**: `ID-1b`
> ×9 (4.0.0 reads a non-ident run such as `col!r` as a declaration NAME), `ID-4` ×5 (4.0.0's signed
> paren counter loses the rule's own `{`), `GROUND-C` ×2.

### 3.5 The two rows a consumer may adopt without reading a divergence row

`parseAnimationRange` and `parseAnimationTimeline` are both `identical`:

> **NO CHANGE.** AGREE 27,021 of 27,021 in **both** lowerings; 0 mirror-defects, 0
> declared-divergence cells, 0 carried cells, 0 throws over the 172-input R1 anchor. No
> `DIVERGENCE-LEDGER.md` row names this export in any field.

### 3.6 One row whose `PENDING` is an instrument question, not a behaviour change

`parseKeyframeSelector` — `PENDING-ADJUDICATION [R4]`:

> **NO MEASURED CHANGE**: AGREE 27,021 of 27,021 in **both** lowerings, 0 mirror-defects, 0
> declared-divergence cells, 0 carried cells. The disposition is PENDING only because
> `DIVERGENCE-LEDGER.md`'s `R4` names this export while resting on a premise this seat measures FALSE
> … `.d`'s adjudicator rules whether `R4` is retired or restated; a consumer should plan for
> `identical`.

---

## 4. `RC-P(V)` — the condition, quantified over `V`

Reproduced from `docs/tranches/X/parse-that/RELEASE-CONDITION.md` §1, itself verbatim from `W4.md`
§6a. **`V` is a variable.** `W4.md` §3's prohibition is the reason: _"No version literal in RC-P — the
predicate quantifies over `V`, because a predicate that names `4.1.0` is a schedule wearing a gate's
clothes."_ No version literal appears in the table below.

> **`RC-P(V)` is TRUE if and only if all six conjuncts below evaluate TRUE for the same version `V`
> of `@mkbabb/value.js`. KF.W3 opens if and only if `RC-P(V)` is TRUE, evaluated by running the six
> commands against the registry coordinate `V` — never by reading a status word in any document,
> including this one.**

| #   | conjunct           | command                                                                                                                                                                                                                                          | TRUE when                                                                                                                                                                                                                                                         |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **PUBLISHED(V)**   | `npm view @mkbabb/value.js@<V> dist.shasum` then `npm pack @mkbabb/value.js@<V>` then `node scripts/ci/verify-packed-surface.mjs <tarball>`                                                                                                      | the coordinate resolves at the registry **and** the packed `/css` subpath resolves all 52 frozen symbols from the installed bytes; exit 0                                                                                                                         |
| 2   | **TOTALITY(V)**    | `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` (unmodified) against `V`'s registry tarball                                                                                                                            | exit 0 — **0 throws / 1548 calls** across all nine public parsers                                                                                                                                                                                                 |
| 3   | **EQUIVALENCE(V)** | X.P.W3's full-surface differential harness, `V` vs the sha-pinned 4.0.0 tarball                                                                                                                                                                  | **0 MIRROR-DEFECTs**, and every difference has a `DIVERGENCE-LEDGER.md` row with a non-empty consumer-direction field                                                                                                                                             |
| 4   | **ADMITTED(V)**    | `node scripts/wasm-admission.mjs <artifact>`                                                                                                                                                                                                     | **0 function-kind imports**, empty-import-object instantiation succeeds, full import list printed and accounted                                                                                                                                                   |
| 5   | **BAR-DISCHARGED** | read the dated OC-1 ruling                                                                                                                                                                                                                       | the owner has ruled **either** a ratified bench bar (and `V`'s three-leg table meets it) **or** that admission is decided on correctness with the bench table recorded-not-gating                                                                                 |
| 6   | **ROUTED(V)**      | `grep -n 'RC-P' docs/tranches/V/coordination/INBOX.md` for the dated sent-row; `ls docs/tranches/X/parse-that/RELEASE-PACKET.md`; plus the two-grep forbidden-edge probe over `fourier-analysis/package.json` and that repo's `web/package.json` | the packet naming `V` exists at its in-repo path, its dated INBOX row names **that** path as the delivery point and the **SS-6** batch carrying it cross-repo (E13), **and** the direct `parse-that → fourier` edge is absent from fourier's manifests and source |

**The evaluator.** `<p2>/typescript/scripts/rc-p-evaluate.mjs`, `--version <V>` **required, no
default**. It prints the six-row table and **exits non-zero while any conjunct is FALSE**, naming
which. A conjunct implemented as _"a previous run said so"_ fails its own gate; each command runs
against the registry coordinate at evaluation time.

### 4.1 The evaluation of record — a coordinate that was EVALUATED, never one the predicate contains

At the only coordinate published to date, `RC-P` is **FALSE**, with **3 of 6** conjuncts TRUE
(measured at this seat, after this packet and its row landed; the run is banked at
`evidence/W4/rc-p-evaluation-after-packet-2026-09-19.json`):

- **TRUE**: 2 TOTALITY · 5 BAR-DISCHARGED · 6 ROUTED
- **FALSE**: 1 PUBLISHED (the packed `/css` surface does not resolve against the published tarball) ·
  3 EQUIVALENCE (the harness exits 1 with 44 mirror-defects) · 4 ADMITTED (the published bytes
  contain zero `.wasm` artifacts, so the admission has **no subject** — FALSE, never vacuously TRUE)

**KF.W3 does not open. The X·V adoption wave's re-trigger does not fire.** That is the packet's
operative sentence, and it is the output of a program, not a judgement of its author.

---

## 5. What a recipient owes, and what it does not

| recipient                     | owed                                                                                                                                                                                                                                                                                   | not owed                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **X·KF / keyframes.js**       | nothing today. `KF-W3.md:9` already carries its half of the reciprocity **verbatim and by predicate name**; it opens **iff** `RC-P(V)` evaluates TRUE. The repin `4.0.0`→`V`, the `serializeCssValue` fork retirement and the DUAL-1 unification are all downstream of that evaluation | no reply, no schedule, no pin move. A letter does not owe a letter back                                |
| **X·F / fourier-analysis**    | nothing. `F-W0.md:459` carries its half: _"fourier receives parser effects only through an admitted, packed value.js release satisfying `RC-P`; the direct `parse-that → fourier` edge is forbidden and is asserted absent by the two-grep probe."_ The probe reads **0 / 0** today    | nothing. The transitive parse-that copies on that tree are **not** a violation and must not be "cured" |
| **X·V / value.js**            | the third reciprocity sentence has **no file to live in** — no X·V wave adopts a parser. That is G-9's subject, ruled **(C)** at COHESION §0i.1                                                                                                                                        | X·P does not get to author an X·V wave, and did not                                                    |
| **parse-that (the producer)** | nothing. O-15 stays what it was: evidence, no ask                                                                                                                                                                                                                                      | this packet creates no obligation on that repo                                                         |

---

## 6. What this packet is not

1. **Not a release.** Specifying a release protocol is not performing one. The pause handoff's own
   words stand: _"research evidence is not product authority. Source review is not parser execution.
   A replay is not release."_
2. **Not a schedule.** It names no date and no version literal for adoption. `RC-P` is gate-keyed,
   never scheduled.
3. **Not an adjudication.** 45 of 52 seam rows are `PENDING-ADJUDICATION` and remain so; their ruling
   is `.d`'s fresh Fable adjudicator's and has not happened.
4. **Not a certification.** No `VERIFIED` verb is moved by this document or by the seat that wrote it.
5. **Not an ask of anyone.** No recipient is asked to reply, repin, build, or decide.
