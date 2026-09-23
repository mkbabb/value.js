SERVED MODEL: claude-opus-5[1m]

# RELEASE-CONDITION — `RC-P`, and when the consumer may act

**Authority**: `docs/tranches/X/parse-that/waves/W4.md` §3 item 5, §5 `X.P.W4.c`, §6 **G-5** and
**G-6**, and **§6a**, whose normative core is reproduced here verbatim. Sub-tranche X·P; tranche X
authority `docs/tranches/X/COHESION.md`. Written at the **X.P.W4 REPAIR 1** seat, 2026-09-19,
sitting of record 2026-09-17 (the owner's begin-word, COHESION §0j).

**This document answers exactly one of §2a's three questions — _when may the consumer act_ — and it
answers it with a predicate, not a status word.** The other two are answered by
`SEAM-CONTRACT.md` (_what value.js receives_) and by the packed-release protocol at
`<p2>/typescript/scripts/packed-candidate-surface.mjs` (_how it arrives_).

**Nothing here opens, packs, publishes or rebinds anything.** `RC-P` is FALSE at every coordinate
measured to date, and this file is the instrument that says so — never the authority that changes
it. Specifying a release condition is not performing a release.

---

## 1. `RC-P` — the normative core, verbatim from `W4.md` §6a

> **`RC-P(V)` is TRUE if and only if all six conjuncts below evaluate TRUE for the same version
> `V` of `@mkbabb/value.js`. KF.W3 opens if and only if `RC-P(V)` is TRUE, evaluated by running
> the six commands against the registry coordinate `V` — never by reading a status word in any
> document, including this one.**

`W4.md` §6a states why that sentence is load-bearing, and it is reproduced here with the same force:

> That sentence is load-bearing for the whole constellation graph: it is the sole edge from X·P into
> the consumer half, and **COHESION.md §2** states it from the other end — _"X·P release condition →
> KF.W3 (parser consumption): gate-keyed, never scheduled; routing is PLAW-BIND — parser → value
> (X·V L1/L5 surfaces) → packed release → consumers. Direct parse-that→fourier is FORBIDDEN."_

**`V` is a variable and is never a literal.** `W4.md` §3's prohibition is the reason:

> No version literal in RC-P — the predicate quantifies over `V`, because a predicate that names
> `4.1.0` is a schedule wearing a gate's clothes.

The evaluator enforces that mechanically: `--version <V>` is **required** and has **no default**, and
the program refuses to run without it. A coordinate named in §4 below is a coordinate that was
_evaluated_, never a coordinate the predicate _contains_.

---

## 2. The six conjuncts, each with its command

Reproduced verbatim from `W4.md` §6a's table, then stated as this document's operational form.

| #   | conjunct           | command                                                                                                                                                                                                                                                                                                  | TRUE when                                                                                                                                                                                                                                                                                                      |
| --- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **PUBLISHED(V)**   | `npm view @mkbabb/value.js@<V> dist.shasum` then `npm pack @mkbabb/value.js@<V>` then `node scripts/ci/verify-packed-surface.mjs <tarball>`                                                                                                                                                              | the coordinate resolves at the registry **and** the packed `/css` subpath resolves all 52 frozen symbols from the installed bytes; exit 0                                                                                                                                                                      |
| 2   | **TOTALITY(V)**    | `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` (unmodified) against `V`'s registry tarball                                                                                                                                                                                    | exit 0 — **0 throws / 1548 calls** across all nine public parsers                                                                                                                                                                                                                                              |
| 3   | **EQUIVALENCE(V)** | X.P.W3's full-surface differential harness, `V` vs the sha-pinned 4.0.0 tarball                                                                                                                                                                                                                          | **0 MIRROR-DEFECTs**, and every difference has a `DIVERGENCE-LEDGER.md` row with a non-empty consumer-direction field                                                                                                                                                                                          |
| 4   | **ADMITTED(V)**    | `node scripts/wasm-admission.mjs <artifact>`                                                                                                                                                                                                                                                             | **0 function-kind imports**, empty-import-object instantiation succeeds, full import list printed and accounted                                                                                                                                                                                                |
| 5   | **BAR-DISCHARGED** | read the dated OC-1 ruling                                                                                                                                                                                                                                                                               | the owner has ruled **either** a ratified bench bar (and `V`'s three-leg table meets it) **or** that admission is decided on correctness with the bench table recorded-not-gating. A **disjunction by design**: an unruled bar must not become a permanent veto, and it must never become an invented standard |
| 6   | **ROUTED(V)**      | `grep -n 'RC-P' docs/tranches/V/coordination/INBOX.md` for the dated sent-row; `ls docs/tranches/X/parse-that/RELEASE-PACKET.md`; plus the two-grep forbidden-edge probe `grep -c 'parse-that' /Users/mkbabb/Programming/fourier-analysis/package.json` and the same over that repo's `web/package.json` | the packet naming `V` exists at its in-repo path, its dated INBOX row names **that** path as the delivery point and the **SS-6** batch carrying it cross-repo (E13), **and** the direct `parse-that → fourier` edge is absent from fourier's manifests and source                                              |

### 2.1 · PUBLISHED(V) — and the registry-identity bridge

The three commands run in order. Between the second and the third the evaluator asserts one thing
the table leaves implicit and conjuncts 2 and 4 depend on absolutely:

```
shasum -a 1 <npm pack @mkbabb/value.js@V>   ===   npm view @mkbabb/value.js@V dist.shasum
```

`dist.shasum` is the registry's own sha1 over the published tarball, so equality is **byte
identity**: it proves the bytes every later conjunct inspects are `V`'s published bytes and not a
working tree that happens to be on disk. This is the value-side rule transferred — _"the repo's own
`dist/` is known to drift from what the registry ships … a source-resolved import cannot witness
what a consumer receives"_ (`W4.md` §5 `.b`, L-12). Without the bridge, conjuncts 2 and 4 would be
measurements of whatever tree the evaluator was invoked beside, which is exactly the failure mode
§6a's "against the registry coordinate `V`" forbids.

_Falsifier_: a sha1 mismatch fails the conjunct outright — not with a warning, and not by falling
back to the tree.

### 2.2 · TOTALITY(V) — the probe is run **unmodified**, by scratch mirror

§6a requires the probe _"(unmodified)"_ and requires its subject to be `V`'s registry tarball. The
probe resolves its own repository six directories above itself and packs **that**, so pointed at a
working tree it measures the working tree. Modifying the probe is forbidden; trusting the tree is
dishonest. The evaluator does neither:

1. unpack `V`'s registry-identical tarball into a scratch directory;
2. **symlink** — never copy, never edit — the probe at exactly its six-deep repo-relative path
   inside that scratch package root, so `import.meta.url`'s six-level walk lands on `V`'s own root;
3. run `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` there;
4. record the probe file's **sha256** on every run, so _"unmodified"_ is a measurement and not a
   promise.

This is COHESION **§0p**'s scratch-mirror idiom, applied to a probe instead of a harvester.

_Falsifier_: any throw fails. A `SKIP` line (an entry point the package does not export) is **not**
a pass — the probe prints it and the conjunct's reading is the probe's exit code, which the missing
export would not clear on its own; the nine-entry-point denominator is the assertion.

### 2.3 · EQUIVALENCE(V) — no `--limit`, ever

The command is X.P.W3's own harness,
`<p2>/typescript/test/css-equivalence/run-full-surface.mjs --pinned-value-commit <sha>`, run with
**no `--out`** (it must write nothing) and **no `--limit`**. The harness already enforces §6a's
TRUE-when in its own exit code — _"it EXITS NON-ZERO while any mirror-defect stands or any
adjudicated conflict is unrowed, because G-7's falsifier treats an unrowed intentional difference
exactly as it treats a defect"_ — so the conjunct is that exit code and nothing added to it.

`--limit` truncates the corpus. A run at `--limit 2` prints `MIRROR-DEFECTS 0` and exits 0 over a
two-row denominator; the unlimited run over the same bytes prints **44**. A gate satisfied by a
truncated denominator is the masking construct `W4.md` §3a forbids, which is why the flag is not
merely omitted but named here as prohibited.

**INSTRUMENT NOTE — DECLARED, OWNER-RULABLE, and it does not soften any reading.** The harness's
subject side is the **candidate's** `<p2>/typescript/src/css/**` lowering read at the pinned
value.js commit, not `V`'s packed bytes. The two coincide only once an adoption wave lands the
candidate in `V` — which is precisely the gap **OP-4 / G-9** records as not existing. Until then a
GREEN here would prove equivalence _of the candidate_, not _of `V`_. The evaluator records this on
every run and resolves it in neither direction: whether conjunct 3 may be read as satisfied by the
candidate-side harness is an **owner ruling**, and inventing an answer would be inventing a
standard. See §6, question Q-RC-1.

### 2.4 · ADMITTED(V) — the artifact is `V`'s, and absence is not a pass

The evaluator installs `V`'s registry-identical tarball into a clean temp consumer, enumerates every
`.wasm` under the **installed** package, and runs `wasm-admission.mjs` over all of them. Both legs of
G-4's falsifier are the admission script's own, measured separately and neither inferred from the
other: the static function-kind count, and the empty-import-object instantiation.

**Zero artifacts in `V` reads FALSE, not vacuously TRUE.** A conjunct with no subject is not a
conjunct that passed. Whether a release that ships no Wasm target satisfies ADMITTED vacuously is
**UNRULED**; the evaluator routes it to the owner rather than resolving it silently in either
direction. See §6, question Q-RC-2.

### 2.5 · BAR-DISCHARGED — the one conjunct that is a document read

§6 G-5's falsifier permits exactly two document reads and this is the first: _"BAR-DISCHARGED, which
is a ruling and can only be read"_. The ruling is landed and dated:

> **OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING**, with
> the LIVE regex numbers held as the _recorded ceiling_ the GATE-VERDICT proposal names — never a
> floor, never a veto, never an invented standard. RC-P conjunct 5 evaluates TRUE on this word once
> the three-leg table is recorded at X.P.W3.
> — `docs/tranches/X/COHESION.md` **§0j.E**, dated 2026-09-17

The ruling names its own further condition, so the evaluator checks **both**: the dated ruling line
is present in `COHESION.md`, **and** `evidence/W3/bench-three-leg.md` exists and is non-empty. This
conjunct is marked `documentRead: true` in the evaluator's output so a reader can see at a glance
that it is the exception and not the rule.

_Falsifier_: neither shape ruled → FALSE. The evaluator never treats silence as either a veto or a
pass, which is the whole content of §6a's _"a disjunction by design"_.

### 2.6 · ROUTED(V) — the packet, its row, and the forbidden edge

Four legs, all mechanical: the packet exists at `docs/tranches/X/parse-that/RELEASE-PACKET.md`; the
INBOX carries a dated sent-row naming `RC-P`; that row names **that in-repo path** as the delivery
point; and it names the **SS-6** batch that carries it cross-repo. Then the two-grep forbidden-edge
probe over fourier's two manifests, which must both read `0`.

The mail legs are §6 G-5's second permitted document read. The forbidden-edge legs are not reads of
a status word — they are counts.

_Falsifier_: §6 G-8's, adopted here unchanged — _"A packet written directly into a sibling repo's
tree fails even if its content is perfect"_, and _"A row whose delivery point is a path only the
sender can see fails."_

---

## 3. The evaluator

```
node scripts/rc-p-evaluate.mjs --version <V> [--value-repo <path>] [--pin <sha>] [--out <path.json>]
```

`<p2>/typescript/scripts/rc-p-evaluate.mjs` — `W4.md` §4, created by `X.P.W4.c`. It prints the
six-row table of §2 and **exits non-zero while any conjunct is false, naming which**.

Four properties, each checkable by reading the file rather than by trusting this paragraph:

1. **No version literal.** `--version` is required, has no default, and the program refuses without
   it. `grep` the file for a semver literal and there is none.
2. **Never short-circuits.** All six conjuncts are attempted on every run, and each carries **two**
   separate fields — `measured` (did this conjunct's own commands run _in this process_) and `value`
   (did they pass). `value: true` requires `measured: true` at the single assignment site, so
   §6 G-5's primary falsifier — _"an evaluator that returns TRUE with any conjunct unmeasured
   fails"_ — cannot be reached by any code path.
3. **No cache is read as a verdict.** Conjunct 2 does not read `r1-anchor-after.txt`; it runs the
   probe. Conjunct 3 does not read `equivalence-full-surface.json`; it runs the harness. Conjunct 1
   does not read a prior `packed-surface.json`; it packs from the registry and verifies. _"A
   conjunct implemented as 'a previous run said so' fails."_
4. **No narrowing.** §2.3's prohibition on `--limit`, and conjunct 4's refusal to treat an absent
   artifact as a pass.

**Negative control, run at the authoring seat.** `--version 0.0.0-does-not-exist` →
conjuncts **1, 2 and 4 report `MEASURED: NO` and `VALUE: FALSE`** with the registry failure named,
conjuncts 3 and 5 still measure (they do not depend on `V`'s bytes), 6 reads FALSE on the absent
packet. **No conjunct returns TRUE unmeasured**, which is the falsifier discharged by demonstration
rather than by assertion.

---

## 4. The evaluation of record

**`RC-P(4.0.0)` = FALSE — 4 of 6 conjuncts FALSE**, measured 2026-09-19 at the X.P.W4 REPAIR 1 seat,
double-run. `4.0.0` is the coordinate that was _evaluated_; it is not a literal inside the predicate.

```
#  conjunct          MEASURED  VALUE   reading
1  PUBLISHED(V)      yes       FALSE   verify-packed-surface.mjs exited 1 against V's registry tarball — the packed surface does not resolve
2  TOTALITY(V)       yes       TRUE    TRUE
3  EQUIVALENCE(V)    yes       FALSE   the harness exited 1 with 44 mirror-defects
4  ADMITTED(V)       NO        FALSE   V's installed bytes contain zero .wasm artifacts, so the admission has no subject — FALSE, not vacuously true
5  BAR-DISCHARGED    yes       TRUE    TRUE
6  ROUTED(V)         yes       FALSE   RELEASE-PACKET.md does not exist at its in-repo path — the packet has no delivery point

RC-P(4.0.0) = FALSE — 4 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V) · 6 ROUTED(V)
KF.W3 does NOT open. The X·V adoption wave's re-trigger does NOT fire.
```

Full output, per-command exit codes and digests: `evidence/W4/rc-p-evaluation.json`.
Registry identity: `npm pack @mkbabb/value.js@4.0.0` → sha1
`ccb962e592fb42e6602fc2bb6afbfb1763788b9d` ≡ `dist.shasum` — **identical**, so conjuncts 2 and 4
inspected `V`'s published bytes. Probe sha256 `77678a574d7c6b11448b19b6ab8fc0686dddf405a01cd7ea16757bc0837ad4ec`,
identical across both runs. Double-run: the printed table is identical line for line except the
`--out` path; the banked JSON is identical on every field except `evaluatedAt`, per-command `ms`,
and the `mkdtemp` workspace paths.

### 4.1 · Two conjuncts diverge from §6a's 2026-08-03 baseline — stated beside it, never over it

`W4.md` §6a's pasted baseline is **immutable evidence** (E-3) and is not rewritten. It records
_"RC-P is FALSE today, and every conjunct is FALSE, measured 2026-08-03"_. Two of its six readings no
longer reproduce, and the divergence is a finding rather than a correction:

| conjunct             | §6a's 2026-08-03 baseline                                                         | measured 2026-09-19                                           | why it moved                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **2 TOTALITY**       | _"the anchor probe reports **324 throws / 1548 calls**, 4 of 9 entry points RED"_ | **TRUE — `TOTAL 0 throws / 1548 calls`**, 9 of 9 `ok`, exit 0 | **An instrument divergence, not a repair.** The baseline was taken with the probe packing the **working tree** it sits in; §6a's own command binds the subject to _"`V`'s registry tarball"_. Run against the registry bytes of `4.0.0` through the §2.2 scratch mirror, the published parsers are total. The two numbers measure two different subjects, and the registry one is the conjunct's |
| **5 BAR-DISCHARGED** | _"OC-1 has been unruled since 2026-07-20"_                                        | **TRUE**                                                      | The owner ruled it: COHESION **§0j.E**, dated 2026-09-17 — admission decided on correctness, bench table recorded-not-gating. The ruling's own further condition (the three-leg table recorded at X.P.W3) is met: `evidence/W3/bench-three-leg.md` is present and non-empty                                                                                                                      |

The other four reproduce the baseline's direction exactly: 1 FALSE (now for a _measured_ reason — the
4.0.0 tarball's `/transform` subpath does not satisfy the current packed-surface law — rather than
for the baseline's reason that no candidate coordinate existed), 3 FALSE at **44** mirror-defects,
4 FALSE, 6 FALSE.

---

## 5. The three reciprocity sentences (§6 G-6)

**X·P may not write any of these into their files.** `W4.md` §4 forbids it and §6 G-6 states the
reason: _"a reciprocity a seat authored on both ends is not a reciprocity"_. The sentences are
recorded here because §8 names this document as the place they are recorded; the **acts** are their
own sub-tranches'.

### LEG 1 — **KF.W3** (X·KF). **LANDED, verbatim, before this wave acted.**

> _"This wave opens if and only if `RC-P(V)` evaluates TRUE per
> `docs/tranches/X/parse-that/RELEASE-CONDITION.md` §6a, run against the registry coordinate `V`;
> the repin 4.0.0→`V`, the `serializeCssValue` fork retirement, and the DUAL-1 unification are all
> downstream of that evaluation."_

At `docs/tranches/X/keyframes/waves/KF-W3.md:9`, authored by X·KF's own seat. Cites the **predicate
by name**, never this wave's number.

### LEG 2 — **F.W0** (X·F). **LANDED, verbatim, before this wave acted.**

> _"fourier receives parser effects only through an admitted, packed value.js release satisfying
> `RC-P`; the direct `parse-that → fourier` edge is forbidden and is asserted absent by the two-grep
> probe."_

At `docs/tranches/X/fourier/waves/F-W0.md:459`, inside X·F's dated addendum-beside, authored by X·F's
own seat. Cites the **predicate by name**, never this wave's number.

### LEG 3 — **the X·V adoption wave**. **ABSENT — there is no file for it to live in.**

> _"This wave consumes `docs/tranches/X/parse-that/SEAM-CONTRACT.md` at `src/css/**`; X·P writes no
> bytes here."_

`W4.md` §6 G-6's own RED baseline: _"the third sentence has no file to live in at all — that is
G-9."_ **None of X-W0..X-W11 adopts a parser** — `X/waves/W9.md` §5.g says so in terms, and G31's
falsifier is literally _"adopt a parser inside this wave"_. X·P **may not** author an X·V wave to fix
this: _"A sub-tranche does not get to write another sub-tranche's waves."_ The disposition is
**pre-ruled (C)** at COHESION §0i.1 with its re-trigger named; the **recording** is `X.P.W4.d`'s act
and is owed.

**Measurement**, banked at `evidence/W4/reciprocity-grep.txt`:
`grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/` → **25 hits over 5 files**, so G-6's
two-hit falsifier does not fire; `grep -rn 'SEAM-CONTRACT' docs/tranches/X/waves/` → **0**, leg 3
absent and routed to G-9.

---

## 6. Open contract questions — owner-rulable, and not resolved here

Both are instrument questions this evaluator surfaced by running rather than by arguing. Neither is
decided in either direction, because §3a halts the wave on _"any pressure to relax `RC-P`"_ and an
invented answer would be the mirror-image fault.

**Q-RC-1 — conjunct 3's subject binding.** The full-surface harness measures the **candidate's**
lowering against the sha-pinned 4.0.0 oracle; §6a binds conjunct 3 to `V`. The two coincide only
after an adoption wave lands the candidate in `V` (the G-9 gap). Ruling needed: _may conjunct 3 be
read as satisfied by the candidate-side harness once the adoption wave declares the candidate is
what `V` ships, or must the harness gain a `V`-tarball arm first?_ Today the question is moot —
the harness is RED at 44 — but it must be ruled before any GREEN reading is taken as `RC-P`'s.

**Q-RC-2 — conjunct 4's vacuity.** If `V` ships **no** Wasm target, does ADMITTED hold vacuously?
The evaluator reads it **FALSE** (a conjunct with no subject did not pass), which makes `RC-P`
unsatisfiable by a Wasm-free release. That may be exactly right — the KEEP clause is about the
Wasm target's closed accounting — or the owner may rule that ADMITTED is conditioned on the release
carrying such a target. Recorded, not chosen.

---

## 7. What this document is not

It is **not** a status word, and it must never be read as one. §6a: _"evaluated by running the six
commands against the registry coordinate `V` — **never by reading a status word in any document,
including this one**."_ A consumer that opens on this file's prose rather than on the evaluator's
exit code has done the thing this file exists to prevent.

It stamps **no verb**. It grants **no release**. It writes **zero** value.js source bytes — `W4.md`
G-2's invariant, which holds across every commit of this wave.

It does not carry the packet. The release packet is
`docs/tranches/X/parse-that/RELEASE-PACKET.md`, authored by `X.P.W4.d`, rowed in
`docs/tranches/V/coordination/INBOX.md` and carried cross-repo by COHESION **§1 SS-6**'s batched
communique — the only lawful cross-repo write path in tranche X. As of this writing that packet does
not exist, which is exactly why conjunct 6 reads FALSE.

---

**Provenance.** `W4.md` §6a (normative core, verbatim) · COHESION.md §2 (the edge, from the other
end) · COHESION.md §0j.E (the OC-1 ruling) · COHESION.md §0i.1 (the G-9 disposition) · COHESION.md
§0p (the scratch-mirror idiom) · `evidence/W4/rc-p-evaluation.json` and
`evidence/W4/reciprocity-grep.txt` (this document's measurements) ·
`<p2>/typescript/scripts/rc-p-evaluate.mjs` (the evaluator).

---

## ADDENDUM 2026-09-19 — §2.3 EQUIVALENCE(V) gains the V-TARBALL ARM (Q-RC-1, COHESION §0y) — dated, beside (E-3; X.P.W4.f, SERVED MODEL: claude-fable-5-1)

**What moved.** §2.3 above binds conjunct 3 to the CLI harness, whose candidate side is
`<p2>/typescript/src/css/**` at the pin — the candidate, not `V` — and declares that as an
owner-rulable instrument note (Q-RC-1). COHESION §0y ruled it: *"EQUIVALENCE(V) binds to V's bytes:
the differential harness gains an arm whose candidate is the packed V's `/css` subpath (the registry
tarball, sha-identity printed), and only that arm's 0-MIRROR-DEFECT reading is RC-P's. A document
declaring 'the candidate is what V ships' is a status word and is refused."* Landed in
`<p2>/typescript/scripts/rc-p-evaluate.mjs`; §2.3's text is not rewritten.

**The arm, as the evaluator now runs it.**

1. Conjunct 1 proves the registry identity (`npm pack @mkbabb/value.js@V` sha1 ≡ `dist.shasum`).
2. That tarball is installed into ONE clean consumer (`npm i <tarball>` under `mkdtemp`) — the
   same install conjunct 4 inspects for `.wasm` artefacts, so both conjuncts read what a consumer
   receives and never a repository's `dist/` (L-12).
3. **Arm V (the VALUE)**: the harness's own differential library —
   `test/css-equivalence/lib/differential.mjs`, the module `run-full-surface.mjs` is a CLI over — is
   run in-process with `surfaces = { V: import(<consumer>/node_modules/@mkbabb/value.js/<exports["./css"].import>) }`,
   `universe` = X.P.W3's pinned 52 (`readPin(<pin>)`), `unrealizedEntries = []`,
   `candidateTypeNames` = the type names V's own `exports["./css"].types` declares, `limit = null`.
   The oracle is the same sha-pinned 4.0.0 tarball; the corpus is the whole 27,021-row union. §6a's
   second half — every ledger row carries a consumer direction — is read from the ledger's SOURCE
   module (`lib/ledger.mjs`, the same assembly the CLI makes), never from `DIVERGENCE-LEDGER.md`.
   **`value` = `mirrorDefects === 0 ∧ emptyConsumerDirections = ∅`, measured in this process.**
4. **Arm C (RECORDED, never the value)**: the CLI exactly as §2.3 ran it, kept beside arm V as the
   candidate-side instrument reading.

The banked JSON carries, under conjunct 3: `armV.subject` (the consumer-relative install root, the
`/css` entry path and its sha256, the types path, the tarball sha1 and the registry `dist.shasum`,
`registryIdentical`), `armV.tally`, `armV.rows` (per export: status, mirror-defects, the class
tally), `armV.emptyConsumerDirections`, and `armC` (`ran`, `exit`, `mirrorDefects`, the instrument
note). `measured` is true only when arm V ran; `value` requires `measured`, at the one assignment
site, as before.

**The evaluation of record with the arm — `RC-P(4.0.0)`, double-run at this seat, 2026-09-19.**

```
#  conjunct          MEASURED  VALUE   reading
1  PUBLISHED(V)      yes       FALSE   verify-packed-surface.mjs exited 1 against V's registry tarball — the packed surface does not resolve
2  TOTALITY(V)       yes       TRUE    TRUE
3  EQUIVALENCE(V)    yes       FALSE   arm V read 20962 mirror-defects over V's installed /css (full corpus, no limit)
4  ADMITTED(V)       NO        FALSE   V's installed bytes contain zero .wasm artifacts, so the admission has no subject — FALSE, not vacuously true
5  BAR-DISCHARGED    yes       TRUE    TRUE
6  ROUTED(V)         yes       TRUE    TRUE

RC-P(4.0.0) = FALSE — 3 of 6 conjuncts are FALSE: 1 PUBLISHED(V) · 3 EQUIVALENCE(V) · 4 ADMITTED(V)
KF.W3 does NOT open. The X·V adoption wave's re-trigger does NOT fire.
EXIT=1
```

Arm V's subject, printed: tarball sha1 `ccb962e592fb42e6602fc2bb6afbfb1763788b9d` ≡ registry
`dist.shasum` (identical); `/css` entry `./dist/subpaths/css.js`, sha256
`8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42` — **the same bytes as the vendored
oracle's `css.js`**, which is the proof that the arm read `V`'s bytes and not a tree; 19 of 19 runtime
entries realized, 33 of 33 types declared; corpus 27,021 of 27,021 run; `emptyConsumerDirections`
∅. **Arm V reads 20,962 mirror-defects for `V = 4.0.0`**, and the reading is right, not a paradox: the
differential scores every cell against the RULED contract (`ruledValue`, the ADJUDICATED rows'
`expect`), so a `V` whose bytes are the pre-adjudication 4.0.0 fails exactly where the adjudications
ruled against 4.0.0 — `ADJUDICATION_UNHONOURED` 13,797 · `DIVERGENT_VALUE` 6,383 (the PB-03 /
PB-04/05 ruled values) · `CANDIDATE_THREW` 782 (the `R1` throws, now on the subject side) — and
nowhere else (`MIS_ACCEPT` 0 · `FALSE_REJECT_IN_SHAPE` 0). EQUIVALENCE(V) asks whether `V` honours
the ruled seam; 4.0.0 does not, by the rulings' own construction. **Arm C** in the same run: the
candidate at the pin, 44 mirror-defects (unchanged). Run 2 reproduced run 1 on every arm-V field
(`mirrorDefects`, the class tally, the per-row tally, both digests); the printed table is identical
line for line. **Negative control**: `--version 0.0.0-does-not-exist` → conjuncts 1–4 read
`MEASURED: NO · VALUE: FALSE` with conjunct 3's reason *"arm V … did not run — no registry-identical
tarball for V"*; no conjunct returns TRUE unmeasured.

**Q-RC-2** is unchanged and stands discharged at the bytes (conjunct 4 above: *"FALSE, not
vacuously true"*). **§4's evaluation of record is not rewritten** — its conjunct 3 read the
candidate-side CLI (`44`); this addendum's conjunct 3 reads `V` (`20,962`). Both are true of their
subject, and only the second is RC-P's.

**ADDENDUM 2026-09-23 (§2.4, dated beside; COHESION §0bx — F-W5d-1 (b)).** Conjunct 4 `ADMITTED(V)`'s subject is V's installed dependency closure: a `.wasm` shipped by a dependency V declares (e.g. `@mkbabb/parse-that/**/ac1.wasm`) counts. V never vendors a dependency's artefact to satisfy this conjunct.
