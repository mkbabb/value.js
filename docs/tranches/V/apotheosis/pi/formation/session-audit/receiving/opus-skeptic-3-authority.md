# O3 — authority, addenda, goal, and coordination

Seat: **O3 (hostile Opus skeptic 3)** of the mandated V·π receiving audit.
Subject: `AUDIT-SUBJECT.json` freeze at Value HEAD `c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`.
Report written: 2026-07-24, receiving session.

---

## Model receipt

- **Model identifier I observe myself to be:** `claude-opus-5[1m]` — "Opus 5 (1M context)", as declared in my own system context. I was spawned with an explicit Opus declaration and my observed identity matches it.
- **Effort level:** high (extended reasoning enabled; no explicit numeric effort token is exposed to me).
- **Environment probe:** `ANTHROPIC_MODEL` and `CLAUDE_CODE_SUBAGENT_MODEL` are both **unset** in my shell (`echo "MODEL_ENV: ${ANTHROPIC_MODEL:-unset} | ${CLAUDE_CODE_SUBAGENT_MODEL:-unset}"` → `MODEL_ENV: unset | unset`). I therefore **cannot produce a machine receipt of the served model from the environment**; my identity statement rests on my own system context, not on an independently verifiable env var. Per this tranche's own law (`FINDINGS.md` A13: labels are intent, not receipts) I flag that limitation rather than assert a receipt I do not have.
- **Prior V·π authorship:** none. I did not write any subject byte. I have made **no edit to any subject byte**; my only write is this file, under the mandated `receiving/` root.
- **Cross-repo discipline:** I read `/Users/mkbabb/Programming/bbnf-lang` **read-only**. I took **no snapshot into either repository** and **sent no coordination message**. I materialized 15 `.bbnf` blobs from the acknowledged commit into my session scratchpad (`/private/tmp/.../scratchpad/bbnf-l4/`) purely to hash them; nothing was written into value.js or bbnf-lang.

---

## What I actually executed

### Documents read in full
`CHARTER.md` (126 L) · `PI.md` (209 L) · `MODULE-DAG.md` (129 L) · `FEATURE-LEDGER.md` (397 L) · `HANDOFF.md` (402 L) · `HANDOFF-2026-07-24.md` (428 L) · `ADDENDA-01.md` (81 L) · `ADDENDA-07.md` (372 L) · `ADDENDA-08.md` (322 L) · `AUDIT-BRIEF.md` (153 L) · `FINDINGS.md` (208 L) · `AUDIT-SUBJECT.json` · `formation/bbnf-exchange-receipt-2026-07-22.md` · `formation/bbnf-owner-unblock-2026-07-22.md` · `formation/bbnf-transaction-receipt-2026-07-22.md` · `coordination/value-inbox-2026-07-20-pi-minitranche-notice.md` · `coordination/value-inbox-2026-07-20-bbnf-coordination.md` · `reformation/CARRY-LEDGER.md` · `docs/tranches/V/megatranche/SCOPE.md`.

### Documents sampled with stated sampling rule
- `ADDENDA-02.md` (611 L): read §1.3 (L174–192), §3 wave table (L249–300), §4 head; heading census of all 19 sections; targeted greps for `PB0`/`PB13`/`Gate 2`. **Not read:** §1.1, §1.2, §§5–9 bodies.
- `ADDENDA-03/04/05` (504/722/565 L): read preambles (L1–12 each) and `ADDENDA-04` §2 (L107–135). R-number census by regex over the whole file. **Not read:** the remainder.
- `ADDENDA-06.md` (7,057 L) + its two audits (4,157 / 3,775 L): **not read**. Grep-only for `OC-1` (61 hits enumerated) and status/preamble. I make no claim about its interior beyond its self-declared `PROPOSED · NOT RATIFIED` preamble and its `OC-1A/B` rows.
- `ADDENDA-02/03/04/05-AUDIT-{A,B}` and `-GESTALT`: existence, size and mtime only. Not read.

### Archives — exact sampling rule
- `raw-prompts/INDEX.json`: read in full; all three source hashes and counts recorded.
- `raw-prompts/value-v-pi-refinement.md` (3,568 L, 28 events): **all 28 events enumerated**; **all 12 direct owner prompt bodies extracted verbatim**; all 16 delegation bodies classified; 10 Glass delegation bodies read (first ~1,000 bytes each); events 007/019/027/028 read verbatim.
- `raw-prompts/value-tranche-v-formation.md` (1,400 L, 83 events): classification census (19 direct + 64 delegation); first-3 and last-5 event timestamps read. Bodies **not** individually read. Targeted greps: `mini-tranche`, `minitranche`, `megatranche`, `parser to spec`, `triumvirate` → all zero.
- `raw-prompts/bbnf-greenfield-coordination.md` (1,180 L, 70 events): classification census only (10 + 19 + 41). Bodies not read.
- `raw-agent-messages/*` (30,420 L across 3 files): **line counts only; not read.** I make no claim about their interior.
- `raw-agent-envelopes/*.jsonl` (3,283 rows): **machine census of every row** — `payload.author`, `payload.recipient`, and presence of `encrypted_content`. All 3,283 rows dispositioned by author. Plaintext: **none recoverable** (Fernet `gAAAAAB…`) → `ENCRYPTED_UNMATERIALIZED`.

### Executable replays I ran (outputs pasted in Findings)
1. SHA-256 of every top-level authority document.
2. `git cat-file -t af15f63e…` + `git log -1` in bbnf-lang.
3. Materialization + SHA-256 of all 15 `grammar/css/l4/*.bbnf` at the acknowledged commit.
4. Line/byte/declaration census of that tree.
5. Import-closure computation over that tree (comment-stripped).
6. Reconstruction of the "sorted fifteen-file ledger SHA-256" under the algorithm stated in delegation 007.
7. `git status --porcelain` census of bbnf-lang; `git diff --stat af15f63e -- grammar/css/l4`.
8. npm lockfile + installed-package verification of `@mkbabb/parse-that@1.0.0`.
9. SHA-256 of the active `numeric.ts`, `CARRY-LEDGER.md`, `demo/styles/foundation.css`, the receiving ledger TSV, and the BBNF sk-v25 handoff.
10. Porcelain/dirty-path recount against the freeze manifest.
11. Verbatim extraction of the founding owner orders from the Claude Code root transcript `46328b94-b746-4f08-8c95-40c9cce82622.jsonl` (outside the frozen subject).
12. Classification arithmetic over the prompt archives (32 direct / 79 delegated / 181 total).

---

## The supersession lattice

Read this as: **clause → the document that currently governs it → what it superseded → by what authority → defect**.

### Legend for "authority"
`OWNER-VERBATIM` = I reproduced the owner's exact words. `DERIVED` = an agent-authored rule with a traceable owner root. `SELF-ASSERTED` = an agent-authored rule with no owner root I could locate. `EXTERNAL` = a cross-repo receipt.

| # | Normative clause | Governing document today | Superseded | Authority | Lattice defect |
|---|---|---|---|---|---|
| L1 | No lexer / scanner / token-object / atom / generic CST | `ADDENDA-07` §1.1 (`ADDENDA-07.md:51-64`) | `ADDENDA-02` PB1; `PI.md` W0 `lexeme.ts`/`scanners.test.ts`; `CHARTER` G-4 partially; pre-reset mirror | OWNER-VERBATIM (prompt 004 "Why do we have a scanner?"; 005 "You do NOT need a lexical layer") | clean; the one clause with a complete supersession chain |
| L2 | ≥3 orthogonal prototypes → 5 hostile skeptics → 3 adjudicators | `ADDENDA-07` §§3–5 | `HANDOFF.md` E-1 two-pass floor (absorbed, `ADDENDA-07.md:235-236`) | OWNER-VERBATIM (prompt 006, 2026-07-22T04:51:59Z) | clean |
| L3 | Denominator must be frozen **before** any pilot acceptance | `ADDENDA-07` §2 (`:130-138`) | — | DERIVED | **VIOLATED, then retro-overridden** — see **O3-01** |
| L4 | Denominator/grammar may proceed together | `ADDENDA-08` §2.1(3) (`:145-148`) | silently overrides L3 | SELF-ASSERTED (labelled a "conflict ruling", not a supersession) | **O3-01** |
| L5 | Feature-ledger admission boundary | `FEATURE-LEDGER.md` + `ADDENDA-07` §2 | `ADDENDA-02` §1.2 occurrence-atomic denominator (uncited) | DERIVED | ADDENDA-02's machinery survives renamed under a "rejected" label — **O3-03** |
| L6 | G-1 coverage close condition | `CHARTER.md` §Goal (`:38-41`) | — | DERIVED | requires a **"Gate-2-ratified L4 direct/reachable surface"**; Gate 2 is defined only in `ADDENDA-02` §1.3 — **O3-03** |
| L7 | PB0 / PB13P wave identities | `CHARTER.md` (`:34`, `:47`) | — | DERIVED | defined only in `ADDENDA-02` §3, labelled historical — **O3-03** |
| L8 | G-3 absolute bench bars (VALUE ≥0.0500 / SHEET ≥0.1000 vs `jsonParser` peak) | `CHARTER.md` G-3 (`:48-55`), `PI.md` §3 | — | DERIVED from `parser-proof/GATE-VERDICT.md` | **absent from both live continuation documents**; OC-1 never ruled — **O3-04** |
| L9 | Strict-win rule = beat live regex + retained iterations | `ADDENDA-07` §6 (`:302-306`); handoff law 8 | narrows L8 without citing it | OWNER-VERBATIM in part (prompt 002 "best both the regex-variant and the previous iterations'") | silent drop of the absolute leg — **O3-04** |
| L10 | Full CSS L4 + hardening + BBNF coordination is π's scope | `ADDENDA-01` (active per both tables) | `PI.md` §2e DEFERRED bucket | OWNER-VERBATIM (2026-07-21T17:55:27Z tail) | **misdated 2026-07-20** — **O3-10** |
| L11 | Phase A "RATIFIED … executes now" (`PI.md` W0–W7) | `ADDENDA-01` §1 (`:13-14`) | — | DERIVED | contradicted by `HANDOFF-2026-07-24` §9 ("`PI.md` … not the active parser implementation sequence"); neither cites the other — **O3-05** |
| L12 | SUPERSEDED-BY-CONSUMPTION over the full CSS L4 `/css` surface | `ADDENDA-01` §4 (`:75-79`) + the sent letter | extends `value-inbox-2026-07-20-pi-minitranche-notice.md` §3 | DERIVED | **live, unbounded, unretracted, un-carried, and undelivered** — **O3-06** |
| L13 | E-1 … E-5 standing edicts | `ADDENDA-01` §4 "inherits E-1..E-5 whole"; `ADDENDA-07` §4 names E-1/E-3 | — | OWNER-VERBATIM (2026-07-21T17:55:27Z; 2026-07-20T14:31:51Z for E-5) | **text lives only in the demoted `HANDOFF.md` §1** — **O3-07** |
| L14 | Browser tooling: internal Browser before Playwright | `ADDENDA-08` §2.1(6) (`:154-157`) | `HANDOFF.md` E-4's unconditional Playwright wording | DERIVED, **explicitly cited** | clean — the model supersession in this tranche |
| L15 | Model routing / Fable | `CHARTER.md` §Constraints (`:105-106`), `PI.md` §4 | — | OWNER-VERBATIM ("Fable models sparringly", 2026-07-20T14:31:51.764Z) | **contradicted by the newest owner mark** `V/megatranche/SCOPE.md` M-2 (2026-07-24 14:07); no π document records it — **O3-07** |
| L16 | Prototype ≠ megatranche; π closes, then the megatranche ships | `CHARTER.md` §Authority(b); `HANDOFF-2026-07-24` §13 | — | interpretive gloss on OWNER-VERBATIM ("Devise a mini-tranche and **execute it** thereupon … before our megatranche execution") | **contested** by `V/megatranche/SCOPE.md` M-9 ("The V·π parser program **folds INTO** this mega-tranche"), authored ~20 min after the handoff; neither cites the other — **O3-08** |
| L17 | Engine = published `@mkbabb/parse-that@1.0.0` only | `CHARTER.md` §Scope; `ADDENDA-07` §7 (`:350-355`); handoff §10 | — | EXTERNAL + machine-verified | **clean, fully reproduced** — **O3-11** |
| L18 | Terminal DAG ACK at `291e5145…daca8f` | `MODULE-DAG.md` + `ADDENDA-07` §7 (`:343-348`) | the earlier qualified ACK at `3c8cd44a…` | EXTERNAL | hash exact; ACK itself EXTERNAL-only — **O3-11** |
| L19 | BBNF no-contact boundary (no new unbounded moving-tree exchange) | `HANDOFF-2026-07-24` §10 (`:346-348`) | narrows `ADDENDA-01` §3 (owner **lifted** the value-side no-contact and "directs active coordination") | EXTERNAL, from an **untracked** BBNF file with **no content address** | **O3-12**, and the narrowing is uncited against `ADDENDA-01` §3 — **O3-05** |
| L20 | Glass/SCI/Atlas: holds only, no Value action | `HANDOFF-2026-07-24` §10 (`:352-355`) + `CARRY-LEDGER` §D | `HANDOFF.md` §4 cross-system phase mark | OWNER-VERBATIM (phase marks, delegations 022/023) | agree on effect, **lossy on content** — **O3-13**; authority binds uncommitted bytes — **O3-14** |
| L21 | Spec-correction ledger R1–R33 | `PI.md` §2d (R1–R12, demoted) + `ADDENDA-03/04/05` (R13–R33, historical) | — | DERIVED | **R13–R33 named in no live document** — **O3-15** |
| L22 | E-3 addendum process (triumvirate → twice-challenge → gestalt → owner ratify) | `HANDOFF.md` §1 E-3 (demoted) | — | OWNER-VERBATIM (2026-07-21T17:55:27Z: "this is triumvariate (research, harden, addenda write) dispatch + twice challenged (assume faulty, prove otherwise) + gestalt analysis") | **not applied to `ADDENDA-07` or `ADDENDA-08`** — **O3-02** |

### Clauses where two *live* documents disagree and neither cites the other

1. `ADDENDA-01` §1 ("Phase A … executes now") **vs** `HANDOFF-2026-07-24` §9 ("`PI.md` … not the active parser implementation sequence").
2. `ADDENDA-01` §3 (owner-lifted no-contact, "directs active coordination", "Owner bridges dispatch") **vs** `HANDOFF-2026-07-24` §10 (no-contact narrowing) — and against the `bbnf-owner-unblock` receipt, which shows the exchange in fact went by **direct cross-instance dispatch**, not owner bridging.
3. `CHARTER.md` G-3 (absolute + relative + corpus-matched, "beat both comparator classes") **vs** `HANDOFF-2026-07-24` §13 (relative-only, "strictly faster on every genuinely comparable retained peer lane").
4. `CHARTER.md` §Goal / G-1 (PB0, PB13P, Gate-2-ratified surface) **vs** `HANDOFF-2026-07-24` §9 (`ADDENDA-02` historical) and `ADDENDA-07` §0 (PB0 design "rejected").
5. `CHARTER.md` §Constraints (Fable sparingly, permitted for research + root adjudication) **vs** `V/megatranche/SCOPE.md` M-2 ("Not Fable"; supersedes every inherited routing law) — 2026-07-24, ~20 min after the handoff.
6. `HANDOFF-2026-07-24` §13 / `CHARTER` §Authority(b) (π closes first, megatranche then executes) **vs** `V/megatranche/SCOPE.md` M-9 (π "folds INTO this mega-tranche as live prototyping work … not as a closed mini-tranche").
7. `ADDENDA-07` §2 ("no pilot acceptance … precedes full-ledger freeze") **vs** `ADDENDA-08` §2.1(3) ("the whole CSS ledger is not a precondition").
8. `HANDOFF-2026-07-24` §9 rows for 03/04/05 ("code authority superseded") **vs** `ADDENDA-08` §5 ("**proposed** code authority superseded") — the handoff's wording attributes an authority those documents never held (all four self-declare `PROPOSED · NOT RATIFIED`).

### Clauses marked "historical" that remain load-bearing

| Clause | Where it is marked historical | Where it is still load-bearing |
|---|---|---|
| `ADDENDA-02` §1.3 **Gate 2** | handoff §9; `ADDENDA-08` §5; `ADDENDA-07` §0 | `CHARTER.md` G-1 close condition |
| `ADDENDA-02` §3 **PB0**, **PB13P** | same | `CHARTER.md` §Goal (`:34`), G-3 (`:47`) |
| `ADDENDA-02` §1.1/§1.2 source-lock + occurrence-atomic denominator | same | `FEATURE-LEDGER.md` §3 (76-root seed, `source-universe.json`), `ADDENDA-07` §2's freeze procedure |
| `HANDOFF.md` §1 **E-1…E-5** definitions | `HANDOFF.md` L3–7 "historical evidence" | `ADDENDA-01` §4 "inherits E-1..E-5 whole"; `ADDENDA-07` §4 cites E-1's three altitudes and E-3's governance; `ADDENDA-01` §5 cites `HANDOFF.md §1` |
| `PI.md` §2d **R1–R12** | handoff §9 | `CHARTER` G-2, handoff §8, `FINDINGS.md` §E |
| `ADDENDA-03/04/05` **R13–R33** | handoff §9 "code authority superseded" | nothing — **dropped**, see O3-15 |
| `PI.md` §3 **OC-1** owner-decision row | handoff §9 | `CHARTER` G-3's bar is unmeetable without it |
| `value-inbox-2026-07-20-pi-minitranche-notice.md` §3 collision rule | nowhere | `ADDENDA-01` §4 extends it; `CHARTER`/`PI.md` cite it as "sent" |

---

## Findings

### O3-01 — the one accepted feature was accepted in violation of the governing addendum, and the override is retroactive, unratified, and undeclared — **BLOCKER / CONFIRMED**

`ADDENDA-07.md:130-138` (owner-ratified law, the tranche's governing document):

> "Before feature fan-out, a mechanical freeze records the exact specification manifest … and a bijection from every occurrence to one feature row or explicit exclusion. **Two independent denominator challenges and one gestalt adjudication must accept the exact ledger hash.** … The pilot may prepare candidates only after its own row, source occurrences, and fixtures receive the same boundary challenge; **no pilot acceptance or broad fan-out precedes full-ledger freeze.**"

The ledger is **not frozen**. `FEATURE-LEDGER.md:3` — "**Status: ACTIVE / denominator incomplete**". `FEATURE-LEDGER.md:311-313` — "Source-lock fixed-point closure, the complete include/exclude complement, owner-experiment identities, occurrence extraction, 52/37 compatibility joins, and a bidirectional validator **precede ledger freeze**."

Yet a pilot **was** accepted:

```
$ ls -la mirror/cells/syntax-consume-number/g16/acceptance.json
-r--r--r--  1 mkbabb  staff  2470 Jul 22 18:34 …/g16/acceptance.json
$ head -3 …/g16/acceptance.json
{ "schema": "value.pi.syntax-consume-number.g16.acceptance/v1",
  "status": "APOTHEOSIS_ACCEPTED", …
```

`FEATURE-LEDGER.md:9-10` — "One internal operation is accepted: `SYNTAX-CONSUME-NUMBER`, promoted exactly as `mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`."

The only text that permits this arrives **two days later** in `ADDENDA-08.md:145-148`:

> "**Full denominator versus early implementation.** Denominator work and grammar work proceed together. A feature needs a pinned local boundary before candidates, but the whole CSS ledger is not a precondition for building every independently sound foundation family."

Timing (`ls -la`): `g16/acceptance.json` = Jul 22 18:34; `ADDENDA-08.md` = Jul 24 13:48. **The override postdates the act it legitimises by ~43 hours.**

Worse, `ADDENDA-08` never *declares* the supersession. `grep -n "supersede|superseded|supersession|override" ADDENDA-08.md` returns seven hits, **none of which is a supersession clause over `ADDENDA-07`**. Compare `ADDENDA-07.md:16-21`, which does it properly: "On conflict, this addendum supersedes the scanner, lexical-layer, token-object, goal-neutral-CST, overlay, and prior wave-acceptance clauses in `CHARTER.md`, `PI.md`, `ADDENDA-01..06` …". And `HANDOFF-2026-07-24.md:19` instructs the reader to "apply `07`/`08` supersession" — **an undefined operation for `08`**, which claims no supersession force anywhere in its 322 lines.

**Consequence.** The single accepted parser feature in this tranche rests on a precondition the governing law forbids waiving, waived after the fact by a document that (a) is not owner-ratified, (b) was never twice-challenged, (c) has no gestalt adjudication, and (d) does not say it is superseding anything. Either `ADDENDA-07` §2's clause is live — in which case `SYNTAX-CONSUME-NUMBER`'s `APOTHEOSIS_ACCEPTED` status is void — or it is dead, in which case an owner-ratified law was repealed without an owner.

---

### O3-02 — the two documents that govern are the only two that never faced the process they impose — **MAJOR / CONFIRMED**

`ADDENDA-02` … `ADDENDA-06` each received the E-3 treatment. On disk:

```
ADDENDA-02-AUDIT-A.md  ADDENDA-02-AUDIT-B.md  ADDENDA-02-GESTALT.md
ADDENDA-03-AUDIT-A.md  ADDENDA-03-AUDIT-B.md  ADDENDA-03-GESTALT.md
ADDENDA-04-AUDIT-A.md  ADDENDA-04-AUDIT-B.md  ADDENDA-04-GESTALT.md
ADDENDA-05-AUDIT-A.md  ADDENDA-05-AUDIT-B.md  ADDENDA-05-GESTALT.md
ADDENDA-06-AUDIT-A.md  ADDENDA-06-AUDIT-B.md            (no GESTALT)
                                                        (no 07-*, no 08-*)
```

`ADDENDA-07` and `ADDENDA-08` — the only two dispositioned **active** — have **zero** audit or gestalt artifacts. `ADDENDA-06` is missing its gestalt.

The owner's E-3 words are exact (Claude Code root transcript `46328b94-b746-4f08-8c95-40c9cce82622.jsonl`, line 967, ts `2026-07-21T17:55:27.093Z`):

> "Mark that all in-progress features are to be properly and well defined with a tranche/wave set addenda, not an adhoc patch unless absolutely befitting (and still documented otherwise): **this is triumvariate (research, harden, addenda write) dispatch + twice challenged (assume faulty, prove otherwise) + gestalt analysis** (how does this fit into the greater plan, and is it optimal, or could it be better)."

`ADDENDA-07.md:11-12` claims: "Its operational details have received **one** hostile protocol challenge and the confirmed defects were repaired."

Two defects. (a) **One** is not "twice challenged". (b) **The artifact does not exist**:

```
$ grep -rn "hostile protocol challenge" docs/tranches/V/apotheosis/pi/
ADDENDA-07.md:11:Its operational details have received one hostile protocol challenge and the
```

That is the only hit in the entire 2,324-file tranche. The claimed challenge is a self-report with no receipt, in a tranche whose own law (`FINDINGS.md` G03) is "self-authored JSON can prove independent review/custody → `REJECTED_CLAIM`".

Additionally, `ADDENDA-07`'s status line reads "**OWNER-RATIFIED** RESET AND 3×5×3 LAW". The *substance* is owner-ratified — I reproduced prompts 004, 005 and 006 verbatim. The **document** is not: there is no owner prompt between its authorship (mtime Jul 22 01:27) and the next owner message (prompt 020, 2026-07-22T14:13:03Z, which asks for status and does not ratify). Every one of `ADDENDA-02..06` states the correct standard in its own preamble — "the owner must explicitly ratify" — and none of them got there either. `ADDENDA-07` is the only addendum that asserts the label without the process.

---

### O3-03 — the ADDENDA-02 rejection is incomplete: three of CHARTER's close conditions are defined inside the "rejected" document, and PB0 is misclassified as scanner design — **MAJOR / CONFIRMED**

Handoff §9 (`:319`): "`ADDENDA-02` | proposed/historical; exact research seed survives, **scanner/CST design rejected**". `ADDENDA-07.md:46`: "`ADDENDA-02`'s **scanner/CST PB0/PB1 design is rejected**."

**(a) PB1 is genuinely a scanner; PB0 is not.** `ADDENDA-02.md:267` — PB1 delivers "`SourceText` preprocessing/boundary map; **the sole shared prototype CSS-source token leaf**; token/trivia/recovery interval partition; component values/blocks". That is the rejected construct, correctly rejected; I found no live dependence on it.

`ADDENDA-02.md:266` — PB0 delivers "Occurrence-atomic source lock; generated-fact/reviewed-support join; fourteen-family routing; exact L4 barrel/type closure; maturity/operation/oracle/fixture matrices; diagnostics, limits, browser pins, exchange schema; and the occurrence-derived owner-wave/cost addendum. **No parser feature code.**" There is **no scanner, no CST, no token layer in PB0**. Bundling it into "scanner/CST PB0/PB1 design" is a misclassification that rejects the denominator machinery by association.

**(b) `CHARTER.md` — the live goal document, ranked 4th in the handoff's own reading order — still binds all three:**

- `CHARTER.md:34` — "**PB0** freezes the exact denominator before feature code".
- `CHARTER.md:47` — G-3 "measured at every feature-wave close and graduated at **W7/PB13P**".
- `CHARTER.md:38-40` — G-1 requires "the **Gate-2-ratified** L4 direct/reachable surface".

`grep -c PB13P` → `CHARTER.md:1  ADDENDA-02.md:7  ADDENDA-06.md:27`. **PB0, PB13P and Gate 2 exist nowhere in `ADDENDA-07`, `ADDENDA-08`, `FEATURE-LEDGER.md`, `MODULE-DAG.md`, or either handoff.** `ADDENDA-02.md:174-192` is the sole definition of Gate 2, and it is not a scanner clause — so by `ADDENDA-07`'s own supersession preamble (which reaches only "scanner, lexical-layer, token-object, goal-neutral-CST, overlay, and prior wave-acceptance clauses") it **survives**. Two live documents therefore disagree on whether `ADDENDA-02` §1.3 governs, and neither cites the other.

**(c) The denominator procedure survives renamed.** `ADDENDA-07` §2's freeze ("a mechanical freeze records the exact specification manifest … Two independent denominator challenges and one gestalt adjudication must accept the exact ledger hash") is a restatement of `ADDENDA-02` §1.3's PB0 → 2 audits → derived addendum → Gate 2 flow, **without citation**. `FEATURE-LEDGER.md:306-323` continues to run on `ADDENDA-02`'s 76-root seed and `denominator/source-universe.json`. The rejection is therefore complete for PB1 and **false for PB0/Gate 2/§1.1/§1.2**, which are alive and load-bearing under a "historical" label.

---

### O3-04 — the absolute G-3 bench bars and the unruled OC-1 owner decision fell out of the live document set — **MAJOR / CONFIRMED**

`CHARTER.md:48-55` (live):

> "The final proof reports the **frozen absolute bars (VALUE ≥0.0500 / SHEET ≥0.1000 vs `jsonParser` peak)**, relative parity or improvement over the deposed parser, and exact corpus-matched comparisons … The goal is to **beat both comparator classes**".

`parser-proof/GATE-VERDICT.md:88-92` — the pinned proof authority — says of exactly those bars:

> "**OC-1 — bench-bar recalibration.** The historical absolute floors (VALUE ≥ 0.0500 / SHEET ≥ 0.1000 vs jsonParser peak) **don't transfer to this rig — the calibration subject itself fails them.**"

`CHARTER.md:6-7` records that the 2026-07-20 owner order resolved **OC-2 only** ("OC-2 resolved by order: parser first, megatranche waits"). **OC-1 remains an open owner-confirm item.** It is carried in `PI.md:167`, `PI.md:193`, `PI.md:196` and `HANDOFF.md:265` — all four now demoted.

```
$ grep -n "OC-1|OC-2" HANDOFF-2026-07-24.md ADDENDA-07.md ADDENDA-08.md FEATURE-LEDGER.md
(no matches)
```

So: a live goal document carries a close condition that the pinned authority calls untransferable, gated on an owner decision nobody has made, and **neither current continuation document mentions it**. `ADDENDA-07` §6 and handoff §13 quietly redefine G-3 as relative-only ("strictly faster on every genuinely comparable retained peer lane"). That redefinition is a material comparator-identity change — precisely what `ADDENDA-07` §4 says "the **formation triumvirate/E-3** governs" — and it was made without an addendum, without a challenge, and without citing `CHARTER` G-3.

---

### O3-05 — ADDENDA-01 is dispositioned "active" wholesale while carrying three clauses the live continuation contradicts — **MAJOR / CONFIRMED**

Both disposition tables give `ADDENDA-01` a single unqualified row: handoff §9 (`:318`) "active scope: full CSS, hardening, BBNF coordination"; `ADDENDA-08` §5 (`:268`) "owner scope: full CSS, hardening, BBNF coordination". Neither carves out a clause. The document contains:

1. **`ADDENDA-01.md:13-14`** — "**Phase A** (RATIFIED, `PI.md` W0–W7): the frozen 52-export /css surface — the proof-gate totality. **Unchanged; executes now.**" Directly contradicted by `HANDOFF-2026-07-24.md:327-328` ("`PI.md` remains the original compatibility-wave census, **not the active parser implementation sequence** after the reset"). Neither cites the other.
2. **`ADDENDA-01.md:59-72` §3** — "the **owner, who drives both tracks, lifts [the no-contact boundary] from the value side and directs active coordination**", proposing a bidirectional exchange of the CSS-L4 spec corpus, grammar/AST decisions, R6–R12, and conformance vectors. Now narrowed by `HANDOFF-2026-07-24.md:346-348` without citation. Its mechanism clause — "**Owner bridges dispatch** (the codex is under its own no-contact and may not poll value's outbox)" — was in fact bypassed: `formation/bbnf-owner-unblock-2026-07-22.md` records "Cross-instance delivery / Destination task: `019f7685-…` / Delivery result: successful background continuation on the existing task", i.e. **direct dispatch**, not owner bridging. No addendum records the change of mechanism.
3. **`ADDENDA-01.md:75-79` §4** — the SUPERSEDED-BY-CONSUMPTION extension. See **O3-06**.

Also note: `HANDOFF.md:11` instructs readers that "the later addenda are authority **only at the status printed on each**". `ADDENDA-01` **prints no status line**. `grep -n "Status:" ADDENDA-0*.md` returns status lines only for `07` and `08`; `01`–`06` have none (02–06 instead carry blockquote `PROPOSED · NOT RATIFIED` preambles; `01` has neither).

---

### O3-06 — a live, unbounded promise to the megatranche that the prototype has not earned — and no evidence it was ever delivered — **BLOCKER / CONFIRMED**

`docs/tranches/V/coordination/value-inbox-2026-07-20-pi-minitranche-notice.md:19-27`, addressed "→ the active V-next Codex fleet":

> "**COLLISION RULE — please fold**: your registry rows that own this ground — **V03 (transpose) and the C12/C15 mirror-lane rows, plus the V-band feature rows the coverage census routed (V04–V05, V12–V14, V17, V19–V28)** — are SUPERSEDED-BY-CONSUMPTION for their parser-construction content: at megatranche kickoff they **consume the proven `pi/mirror/` tree as their input instead of re-building it**. … **Do NOT begin independent V03/C12 construction; the owner has routed that work here.**"

`ADDENDA-01.md:75-79` widens it: "The megatranche collision notice … **is hereby extended: the SUPERSEDED-BY-CONSUMPTION set now covers the full CSS L4 /css surface**, not only the frozen 52-export subset."

Against that promise, the prototype's total delivery is:

```
$ cat mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts   # 17 lines, 560 bytes
$ shasum -a 256 …/numeric.ts
8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa   (matches handoff §5)
$ find mirror/apotheosis -type f
apotheosis/README.md  apotheosis/vitest.config.ts  apotheosis/clean-base.json
apotheosis/test/value-unit/numeric.test.ts
apotheosis/grammar/css/l4/README.md
apotheosis/grammar/css/l4/value-unit/numeric.ts
```

**Neither handoff, nor `ADDENDA-07`, nor `ADDENDA-08` mentions the obligation at all:**

```
$ grep -rn "SUPERSEDED-BY-CONSUMPTION" docs/tranches/V/
coordination/value-inbox-2026-07-20-pi-minitranche-notice.md:22
apotheosis/pi/ADDENDA-01.md:18
apotheosis/pi/ADDENDA-01.md:77
```

It is not carried, bounded, conditioned on π's actual delivery, or retracted. This is the exact "megatranche implicitly promised something the prototype has not earned" pattern.

**Second half — the letter has no delivery evidence, yet is asserted as sent.** `CHARTER.md:101-102` and `PI.md:202-203` both state "`vnext/` Codex-owned READ-ONLY (**collision letter sent**: …)". But:

- The letter exists **only in Value's own `docs/tranches/V/coordination/`**, untracked. Every registered outbound letter (O-0…O-6) was written **into the recipient repository's** coordination directory (`../glass-ui/docs/…`, `../keyframes.js/docs/…`, `../sci-report/atlas/docs/…`).
- `INBOX.md`'s outbound register — the E13 durable mail ledger — **stops at O-6, 2026-07-17**. `grep -n "^| O-" INBOX.md` → O-0…O-6 only. There is no O-7 for the mini-tranche notice and no row for the BBNF coordination letter.
- The recipient tree contains **zero** reference: `grep -rn "pi-minitranche|mini-tranche|SUPERSEDED-BY-CONSUMPTION|V·π|apotheosis/pi" docs/tranches/V/vnext/` → no output. `vnext/coordination/` holds only `pt-e-bbnf-live-coordination-v2.{json,schema.json}`.
- Every file in `vnext/` predates the letter (newest mtime `2026-07-20 08:35`; the letter is `2026-07-20 13:55`).
- The BBNF coordination letter still self-declares, at line 3, "**STATUS: drafted, not yet transmitted** — held for the owner to bridge", while `ADDENDA-01` §3 cites it as the operative letter.

So the tranche simultaneously (i) told an external fleet to stand down on ~20 registry rows, (ii) widened that instruction to the whole CSS L4 surface, (iii) never recorded it in the mail ledger, (iv) never delivered it to the recipient, and (v) never carried the obligation into either handoff. Both the promise and the "sent" claim are defective, in opposite directions.

---

### O3-07 — E-1…E-5: none died cleanly; E-3's teeth and E-5's allocation died silently — **MAJOR / CONFIRMED**

Machine census of the live document set:

```
$ grep -n "E-1\b|E-2\b|E-3\b|E-4\b|E-5\b" HANDOFF-2026-07-24.md ADDENDA-08.md
(no matches)
$ grep -n … ADDENDA-07.md
:135  "…is an E-3 change; candidate authors never define their own feature boundary"
:235  "This quintetto subsumes E-1's two-audit minimum"
:236  "and its common rubric contains E-1's three altitudes"
:237  "The formation triumvirate/E-3 governs normative pins, ledger boundaries, …"
:328  "…forbidden unless an E-3 formation change actually occurs"
$ grep -n … ADDENDA-01.md
:5    "Per E-3 (`HANDOFF.md §1`) this is a formal scope change"
:56   "This is E-2/E-4 work"
:75   "Phase B inherits E-1..E-5 whole."
```

**Neither the current handoff nor `ADDENDA-08` names a single edict.** The definitions exist only in `HANDOFF.md` §1 — the document the current entry point demotes at `HANDOFF.md:3-7` to "historical evidence". Yet an **active** addendum (`ADDENDA-01` §4) inherits all five "whole" and cites `HANDOFF.md §1` as their home, and the **governing** addendum (`ADDENDA-07` §4) relies on E-1's three altitudes and E-3's governance by reference.

Per-edict adjudication against the handoff's 14 laws:

| Edict | Live carrier | Verdict |
|---|---|---|
| **E-1** twice-audit + three altitudes | absorbed by `ADDENDA-07` §4 (`:235-236`), handoff law 7 | **SURVIVES.** Only the W0 scaffold carve-out is dead by omission (harmless — no scaffold waves remain). |
| **E-2** parsimony/KISS/fewer LOC | handoff law 9; `ADDENDA-07` §1.3 | **SURVIVES.** Minor drift: `CHARTER` §Scope's "transpose … near-verbatim" for types/serializers/`coerceToSyntax`/`collect*` is flattened by handoff law 4 into "one candidate provenance, not final authority". |
| **E-3** addenda + triumvirate + twice-challenge + gestalt | handoff law 11 keeps only the first clause ("Material boundary changes receive addenda"); `ADDENDA-08` §2 the same | **PARTIALLY DIED.** The *teeth* — triumvirate dispatch, twice challenge, gestalt — survive only in the demoted `HANDOFF.md` §1 and were not applied to `ADDENDA-07`/`08` (O3-02). |
| **E-4** direct work; oracle order LIVE → spec → browser | handoff laws 1/10; `ADDENDA-08` §2.1(4) restates the full order | **SURVIVES.** Its tooling clause was properly superseded, with citation, by `ADDENDA-08` §2.1(6). This is the tranche's one clean supersession. |
| **E-5** Fable sparingly + `model_served` receipts | receipts duty survives and is strengthened (handoff §4; `ADDENDA-08` §2.1(5)). **The allocation clause is restated nowhere.** | **DIED SILENTLY inside π.** |

E-5's owner root is verbatim (root transcript line 457, ts `2026-07-20T14:31:51.764Z`): *"Ensure that we properly leverage Fable models sparringly: only for the most complex and design-forward passes."* It is still printed in two live documents — `CHARTER.md:105-106` and `PI.md:206-207`. It is **contradicted by the newest owner mark**, recorded outside the π tree at `docs/tranches/V/megatranche/SCOPE.md:15` (mtime 2026-07-24 14:07, sha256 `8d9c686214af787d78d6ccb834fe0598d8441a9b67935ddf684e581d9801ca53`):

> "| M-2 | "Opus 5 is to be leveraged for all tasks. Not Fable." | **Supersedes every inherited routing law that named Fable** (the V·π `ADDENDA-07` 3×5×3 law, …) |"

(SCOPE.md mis-attributes the Fable clause to `ADDENDA-07`, which contains no routing law; the clause is in `CHARTER` §Constraints / `PI.md` §4 / `HANDOFF.md` E-5. The substance nevertheless kills E-5's allocation.) **No π document records this.** A reader following the handoff's reading order would apply a dead routing law.

---

### O3-08 — the prototype-versus-megatranche boundary is contested by a sibling document authored twenty minutes after the handoff, and the freeze manifest is already stale — **MAJOR / CONFIRMED**

The handoff's position is unambiguous. `HANDOFF-2026-07-24.md:415-420`: "V·π closes only when … Then, and only then, write `PI-CLOSE.md`. **The later megatranche performs the production swap and ships it.**" `CHARTER.md:8-10`: "the megatranche does the production execution (the `src/` swap, consumer wiring, ship)".

A sibling document says the opposite. `docs/tranches/V/megatranche/SCOPE.md:22`:

> "| M-9 | "Deep prototyping work that's failed hitherto. Properly prototyped parser items, with idiomatic parse-that usage, is a requirement." | **The V·π parser program folds INTO this mega-tranche as live prototyping work with a named idiom gate — not as a closed mini-tranche and not as paperwork.** |"

Provenance: `docs/tranches/V/megatranche/` did **not exist** at my session start and materialized during it —

```
$ ls -la docs/tranches/V/megatranche/
drwxr-xr-x  SCOPE.md   Jul 24 14:07
drwxr-xr-x  audit/     Jul 24 14:06     (inventory/components.json 14:04; visual/capture.mjs 14:06;
                                         visual/shots/safari-desktop-light/*.png 14:07)
```

`HANDOFF-2026-07-24.md` mtime is Jul 24 13:47; `ADDENDA-08.md` 13:48. SCOPE.md is **~20 minutes later** and cites the receiving audit's own output root (`SCOPE.md:96-97`) — so it knows about this audit; the frozen subject, sealed at 13:57, cannot know about it.

**Consequence for the freeze.** `AUDIT-SUBJECT.json` records `"dirtyPathCount": 20` and `"porcelainSha256": "dcd883dd…"`. At the time I checked:

```
$ git status --porcelain | wc -l           →  21
$ git status --porcelain | shasum -a 256   →  5f972478e628a86115c2485db6a2a600e24f0475927c887a0adfa83723ba427d
```

The delta is exactly one new path: `?? docs/tranches/V/megatranche/`. The tranche ledger itself verifies clean (`shasum -a 256 audit-subject-ledger.tsv` → `b723e3cc25a3d30463cb331ff35f1502bdd676c0da264d218f50a5af8f593aea`, exact match; `git rev-parse HEAD^{tree}` → `948411a8…`, exact match), so the π subject is intact — but the **repository dirty census in the manifest is already superseded**, and the superseding path is the megatranche formation itself.

**The tree kept moving while I wrote.** Re-running the census at report close returned **22** dirty paths — the 22nd being `?? docs/tranches/W/` (mtime `Jul 24 14:10`, containing `audit/history/{A-D,E-H,I-L,M-P,Q-S}.md`). This is notable because `V/megatranche/SCOPE.md:3-5` opens with "**This is NOT a new tranche.** No new tranche letter is opened. This is the continuation and apotheosis of the mega-tranche already in formation, rehomed to a writable root". Three minutes after that sentence was written, a **tranche-W letter directory** appeared. I take no position on which is correct — I record only that the document O3-08 relies on was contradicted by its own repository within minutes, which is itself evidence about how much weight a fresh, moving, untracked scope document can bear.

I do **not** treat SCOPE.md as owner truth: it is an untracked, moving, agent-authored document quoting the owner without a transcript receipt. Under my evidence law the boundary is therefore **OPEN/contested**, not settled in either direction. The adjudicators must rule which reading governs; they cannot rule it from the frozen subject alone.

A secondary observation on the founding order's own verb: the owner said "Devise a mini-tranche and **execute it** thereupon" (verbatim below). `CHARTER.md:6-11` converts "execute it" into "(b) authorizes a parser **PROTOTYPING & PERFECTION** effort **only**". The conversion is defensible on "before our megatranche execution", but it is an *interpretation presented as a consequence of the quotation*, and M-9 reads the same words the other way.

---

### O3-09 — "raw prompts are fully discoverable" is false as stated: the founding owner orders are outside the frozen subject — **MAJOR / CONFIRMED**

`HANDOFF-2026-07-24.md:122-124` (law 14): "Raw prompts, steering, delegated receipts, and Codex findings **are discoverable from the generated archives**; no summary silently replaces them." `FINDINGS.md` A14 labels this `ACCEPTED_FACT`.

The archives cover **three Codex threads only**, and the Value formation thread ends four days before the V·π refinement thread begins:

```
value-tranche-v-formation.md : 001 = 2026-07-15T14:06:47Z … 083 = 2026-07-16T18:25:59Z
value-v-pi-refinement.md     : 001 = 2026-07-21T18:38:35Z … 028 = 2026-07-24T17:42:14Z
```

**Gap: 2026-07-16T18:26 → 2026-07-21T18:38 — 4 days, 23 hours.** That gap contains the entire V·π formation: the parser-proof gate, the union apotheosis, the 22 owner rulings, D-23, and both founding orders.

```
$ for p in "mini-tranche" "minitranche" "parser to spec" "triumvirate"; do grep -c "$p" value-tranche-v-formation.md; done
0 0 0 0
```

`CHARTER.md:3-5` quotes the founding order verbatim, and it appears **nowhere** in the 181 frozen prompt events. I located it **outside the frozen subject**, in the Claude Code root transcript:

```
/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-value-js/46328b94-b746-4f08-8c95-40c9cce82622.jsonl
line 886, type=user, ts=2026-07-20T17:52:12.504Z:
"Devise a mini-tranche and execute it thereupon for these above's. Deploy a proper
 triumvariate of research, harden, and wave/tranche write. Get this parser to spec
 before our megatranche execution"
```

Likewise `ADDENDA-01`'s authority quote, at line 967, ts `2026-07-21T17:55:27.093Z` (tail of the E-edict prompt):

> "This should include **a general hardening of the parse-that based parser, CSS L4 full implementation, and full coordination with the in-progress BBNF codex agent.**"

Both are **substantively faithful** — I confirm the quotations are real. But `FINDINGS.md` A14 as written is false: the archives bind three Codex threads, not "this audit"'s authority surface. There are 353 Claude Code transcript files in the 07-19…07-20 window alone, none in the subject. Any future seat that verifies CHARTER's or ADDENDA-01's authority *from the frozen subject* will find nothing and must either fabricate or report OPEN.

One faithful-quotation defect: `CHARTER.md` elides "for these above's" with "…", which removes the scope antecedent (the preceding owner message at line 732, ts `2026-07-20T17:33:01Z`: *"Profile both parsers and analyze why the combinator approach is so slow… What of our parse-that uplifts, those documents, locks, and proto-tranche plants?"*). The mini-tranche's chartered scope is thus anchored to text the charter drops.

---

### O3-10 — ADDENDA-01's authority is misdated by one day; PI.md's edict citation points at the wrong section — **MINOR / CONFIRMED**

`ADDENDA-01.md:1` and `:3` date the order "**2026-07-20**". The verbatim prompt is `2026-07-21T17:55:27.093Z` (13:55 EDT on 07-21); `ADDENDA-01.md` mtime is `Jul 21 14:05` — ten minutes after. The date is wrong by 24 hours, which matters for lattice ordering: `ADDENDA-01`'s scope order in fact arrived **after** CHARTER's founding order and **in the same message that created E-1…E-5**, so `ADDENDA-01.md:5`'s "Per **E-3** (`HANDOFF.md §1`) this is a formal scope change" applies a rule born in the same breath.

`PI.md:5-6`: "All waves govern under the edicts in `./HANDOFF.md §2` (twice-audit · parsimony · addenda-not-patch · direct-impl)." The edicts are in `HANDOFF.md` **§1**; §2 is "Expanded charter". The parenthetical also enumerates four of five, omitting E-5.

---

### O3-11 — the BBNF/parse-that coordination chain is fully reproducible and correct; the acknowledged HEAD still exists; the color grammar has since moved — **MAJOR / CONFIRMED (positive, with one live caveat)**

Every content address in `ADDENDA-07` §7 and `formation/bbnf-exchange-receipt-2026-07-22.md` reproduces exactly.

```
$ cd /Users/mkbabb/Programming/bbnf-lang
$ git rev-parse HEAD                                  → af15f63e0d2d3d719938c13b906a50acbb92ea3b
$ git cat-file -t af15f63e0d2d3d719938c13b906a50acbb92ea3b   → commit
$ git log -1 --format='%ad' af15f63e                  → Sat Jul 18 14:30:54 2026 -0400
$ git rev-parse af15f63e:grammar/css/l4               → 3bbedd62a685aa4592d23097cd49d0467c5faf40   ✓
$ git show af15f63e:grammar/css/l4/stylesheet.bbnf | shasum -a 256
  2c2e62e71cdbd76be78906ad5741763c3ba12c3d7418bc6b39620330027fda07                                ✓
```

All fifteen per-file SHA-256 match the receipt table exactly (`color.bbnf e923f52c…`, `easing.bbnf f5550fa8…`, `filters.bbnf 8321e543…`, `func-body.bbnf 5b804cb7…`, `gradients.bbnf f0f2495d…`, `keyframes.bbnf 889dec7c…`, `keywords.bbnf bac8e989…`, `media.bbnf e0cf30d9…`, `properties.bbnf 94451adf…`, `selectors.bbnf 455678a5…`, `stylesheet.bbnf 2c2e62e7…`, `tokens.bbnf 23e53585…`, `transforms.bbnf 650cc388…`, `value-unit.bbnf cb57f790…`, `values.bbnf ecbc3ad7…`).

```
files: 15    lines: 1329    bytes: 56598          ← receipt: "15 files, 1,329 lines, 56,598 bytes"  ✓
declarations (anchored ^ident =): 276             ← receipt: "276 declarations"                     ✓
```

The ledger hash reproduces under the algorithm stated in delegation 007 ("lines are `<file-sha256><two spaces><repo-relative path>\n`, paths byte-sorted"):

```
computed: 907db43f11738f26078d9539bb7ac69a6d6f934d85743f04d9f26ca8f05d82fe
receipt : 907db43f11738f26078d9539bb7ac69a6d6f934d85743f04d9f26ca8f05d82fe   ✓
```

**Import closure (comment-stripped) — 9 of 15 reachable, exactly as claimed:**

```
stylesheet -> properties, selectors, media       properties -> value-unit, color, func-body, keywords
selectors  -> tokens                             media      -> tokens
color      -> value-unit                         func-body  -> value-unit
keywords, tokens, value-unit -> (none)
UNREACHABLE from stylesheet: gradients, easing, filters, keyframes, transforms, values   (6)
```

**MODULE-DAG identity:** `shasum -a 256 MODULE-DAG.md` → `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` — **exact match** to the terminal-ACK hash in `ADDENDA-07` §7, `HANDOFF-2026-07-24` §5, `ADDENDA-08` §4.1(3), and `FINDINGS.md` D04.

**Published-only engine rule:** `mirror/package.json` pins `"@mkbabb/parse-that": "1.0.0"` (exact, no range). `mirror/package-lock.json` resolves `https://registry.npmjs.org/@mkbabb/parse-that/-/parse-that-1.0.0.tgz` with integrity `sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==` — **exact match** to `ADDENDA-07.md:352`. `node_modules/@mkbabb/` contains a real directory, **not a symlink or workspace link**, and **no other `@mkbabb` package**. The installed `package.json` exports are `"."`, `"./core"`, `"./diagnostics"` — **no CSS subpath**, corroborating D07. The active production imports only `@mkbabb/parse-that/core`. No file under `mirror/` (excluding `node_modules`) references `Programming/parse-that`; the only `Programming/bbnf-lang` references are **content-addressed reads of clean-HEAD bytes** in candidate provenance records (`value-unit.bbnf sha256 cb57f790…`, which I independently confirmed is the acknowledged-HEAD hash **and is still clean in the live worktree**).

**Live caveat — the acknowledged assay is no longer the live bytes:**

```
$ git status --porcelain | awk '{print $1}' | sort | uniq -c    →  196 M   8 D   38 ??   (242 dirty)
$ git status --porcelain -- grammar/css                          →   M grammar/css/l4/color.bbnf
$ git diff --stat af15f63e -- grammar/css/l4
  grammar/css/l4/color.bbnf | 630 ++++----  1 file changed, 357 insertions(+), 273 deletions(-)
```

`master` HEAD is still exactly the acknowledged commit (newest ref by committerdate, 2026-07-18; `af15f63e` is **not** an ancestor of any newer branch), so **no committed movement** has occurred — but `color.bbnf` has been rewritten in the worktree. `FINDINGS.md` D11 ("live BBNF worktree bytes are the acknowledged clean assay" → `REJECTED_CLAIM`) is **confirmed with exact bytes**.

**Duplicated ownership (D03) confirmed by bytes.** `stylesheet.bbnf` declares its **own** keyframe grammar while `keyframes.bbnf` exists as a separate module:

```
stylesheet.bbnf:  keyframeStop  = /\d+(\.\d+)?%/ -> 0u8 | "from" -> 1u8 | "to" -> 2u8 ;
                  keyframeSel   = keyframeStop , (/\s*,\s*/ >> keyframeStop) * ;
                  keyframeBlock = …   keyframesRule = /@(-[a-z]+-)?keyframes/ …
keyframes.bbnf:   IDENT STRING HASH DIMENSION FUNCTION PROPERTY_VALUE PROPERTY_NAME
                  DECLARATION DECLARATIONS_LIST FROM_TO_KEYWORD KEYFRAME_SELECTOR …
```

`keyframes.bbnf` re-declares identifier, string, dimension, function, property-value and declaration grammar that `tokens`/`value-unit`/`properties` already own. Its `KEYFRAME_SELECTOR = percentage | FROM_TO_KEYWORD | (percentage , ("," ?w >> percentage) +)` has **no timeline-range names, no `[0,100]` bound, and folds list composition into the singular production** — so `FINDINGS.md` E17 ("current BBNF keyframe owners already implement E13–E16" → `REJECTED_CLAIM`) is **confirmed**.

---

### O3-12 — the cross-repo no-contact boundary is derived from an untracked, uncontent-addressed file, in violation of the handoff's own rule — **MAJOR / CONFIRMED**

`HANDOFF-2026-07-24.md:175-176`: "BBNF's live worktree is heavily dirty and independent. **The acknowledged HEAD and exact receipts are authority; an unacknowledged current file is not.**"

`ADDENDA-08.md:240-248` then derives the entire current cross-task boundary from exactly such a file:

> "The BBNF task's additive `restart/skinny/tranches/sk-v25/CODEX-SESSION-HANDOFF-2026-07-24.md` confirms the current cross-task boundary … **Its present no-contact rule forbids a new unbounded moving-tree exchange**"

echoed at `HANDOFF-2026-07-24.md:344-348`.

```
$ ls -la /Users/mkbabb/Programming/bbnf-lang/restart/skinny/tranches/sk-v25/CODEX-SESSION-HANDOFF-2026-07-24.md
-rw-r--r--  13345  Jul 24 13:31
$ git ls-files --error-unmatch <that path>
error: pathspec … did not match any file(s) known to git   ← UNTRACKED
$ shasum -a 256 <that path>
109bedaed18b2d9e13fa31447e061139a345a125d98e4e1b0fd5a9ae033afdbf
```

**Neither Value document records a SHA-256 for it.** Every other external receipt in this tranche is content-addressed (parse-that integrity, BBNF root/tree/ledger, MODULE-DAG, Glass packet hashes). This one is not, and it is mutable and untracked.

Its *substance* is faithful — I read the file and confirm lines 76 / 124 / 201-202:

> "- Value is no-contact for unbounded messaging, freezes, whole-worktree snapshots, …"
> "- Value is sealed/no-contact, but received immutable Value evidence can be recorded"
> "- Value no-contact must not erase the previously owner-directed bounded exchange history; it means no new unbounded contact or moving-tree dependency."

So §10's characterization is accurate. The **authority basis** is not: it is precisely the "unacknowledged current file" the same handoff forbids. Fix is one line: record the hash and the read time.

---

### O3-13 — Glass §10 vs CARRY-LEDGER §D: they agree on effect, disagree on content — **PARTIALLY_TRUE / CONFIRMED**

`HANDOFF-2026-07-24.md:352-355`: "The received Glass receipts are **post-cut dependency/consumer holds only**. They **authorize no Value edit, repin, shim deletion, package acceptance, or visualization execution**. The **frozen** Value carry-ledger remains external to this parser handoff."

I read all eleven Glass cross-thread delegations in the frozen archive (events 011–019, 022, 023) and `CARRY-LEDGER.md` §D.

**Where they agree.** No Value action is authorized today. Every receipt says so verbatim — 011 "formation-only; do not edit value.js consumers yet"; 014 "no action now"; 015 "no Value source, package, pin, shim deletion, or acceptance action"; 016/017 "no … acceptance action"; 018 "C8 hold-only"; 019 "HOLD-ONLY; no Value action". Both preconditions in §D are unmet: "Glass remains producer/package/browser RED" (W4) and Glass 8 W8 has not landed. `FINDINGS.md` J08 and J09 are **confirmed REJECTED**. Owner phase marks 022/023 are verbatim and directly support J09.

**Where they disagree — three losses.**

1. **§D's W4 row is a hold *plus two conditional grants*, not a hold "only".** `CARRY-LEDGER.md:62-73`: "**Then migrate only the property name** to the inheriting CSS-`background` seam `--glass-slider-track-background` **in the four pinned receivers**: `ComponentSliders.vue` (`a61b5ed3…`), `ConfigSliderPane.vue` (`e4ae64e6…`), `ExtractControls.vue` (`71aa0a65…`), `GenerateControls.vue` (`4f95c57c…`)." And `:76-80`: "**retire the duplicate spectrum-range blur rule in `demo/styles/foundation.css`** only after both installed public CSS entries retain `backdrop-filter:none` plus `-webkit-backdrop-filter:none` and a real browser computes both as `none`". §10's flat "authorize no Value edit … [or] **shim deletion**" erases a precisely pre-authorized, hash-pinned edit set and a pre-authorized shim retirement. That is a *lossy* summary of a conditional grant, and it is the kind of loss that later reads as "nothing was ever authorized here".
2. **"post-cut dependency/consumer holds" mislabels most of the receipts.** Only 012's `foundation.css:559-574` clause is genuinely "post-cut" ("now a post-cut deletion proof—not a shim allowance"). Events 015–019 (C5, C6, C7, C8, C11) are **pure Glass-internal formation freezes with no Value dependency at all** — C6 corrects Glass roster arithmetic; C7 keeps Glass P-EX1 RED; C8/C11 freeze a semantic-ID roster. Calling them Value "dependency/consumer holds" overstates Value's entanglement.
3. **§10 drops three §D rows entirely.** `CARRY-LEDGER.md:51-54` — the two §7 **shipped defects Value is owed** (V-A95 aurora reverse-drag black-slab; Chip/Badge orphaned dist CSS, with "**our `/toggle-chip`→`<Chip>` site renders incomplete glass until it lands** — visual residual recorded at W44"). `:89-90` — atlas/sci: "any reply to O-5". `:46-50` — the keyframes live tail ("if a future 4.1 ships `sampleBezier`, kf adopts — rides the W56/SCI-1 4.1.x vehicle row"). §10's heading says "Glass/SCI/Atlas" but says nothing about SCI/Atlas beyond authorizing nothing, and nothing about the inbound expectations.

**Verdict:** `PARTIALLY_TRUE`. No live contradiction in *effect*; a real content conflict in *characterization*, on the axis (conditional grant vs flat denial) where a later reader is most likely to be misled.

---

### O3-14 — the entire Glass↔Value cross-repo authority binds an uncommitted Value file that has already been caught moving — **MAJOR / CONFIRMED**

Three separate Glass adjudications (C4 `3126040131025328bec0b57d907ee7f99fcbebf5477911f57cc0448e0db652d7`, C5 `8460a022…`, C8 `1f054c07…`/`7d52ce98…`) bind Value's carry-ledger at SHA-256 `9e88f9e2…`. I verified both anchors exactly:

```
$ shasum -a 256 docs/tranches/V/reformation/CARRY-LEDGER.md
9e88f9e23a64cf26d123c91cdd3595b8348039afb3671fb33840557fe2b983f9    ← Glass C4-bound hash  ✓
$ shasum -a 256 demo/styles/foundation.css
118dbe9c7fd1ff58c36b8b4fae7aecf78c96da41325ac11e3eecfaa294f33478    ← Glass source witness ✓
$ git show HEAD:docs/tranches/V/reformation/CARRY-LEDGER.md | shasum -a 256
725490e9b7afa02eb93476ec77557a34d4eba202e2a36265e8a97a432c67f9a9    ← HEAD is DIFFERENT
$ git diff --stat docs/tranches/V/reformation/CARRY-LEDGER.md
 1 file changed, 34 insertions(+)          ← the +34 are exactly the two glass BJ W4/W8 rows
```

So `9e88f9e2…` is a **working-tree-only** hash. The two §D rows that §10 characterizes — and the three Glass adjudications that bind them — exist **nowhere in committed history**. Any `git commit`, `stash`, `checkout` or `clean` in this repository silently invalidates a live cross-repo authority chain held by another team.

This is not hypothetical. Delegation **013** (`2026-07-22T12:17:37.320Z`) records Glass catching the file move under it:

> "**Moving-byte correction:** my live read now hashes `docs/tranches/V/reformation/CARRY-LEDGER.md` as `9e88f9e2…`, not receipt hash `33d33d88f9b1a6c9afbcb6d0c7e488908e6cb05a62346a42308f3e3146aa70ad`. … Please return whether `33d` was receipt-time and what changed … **Glass will not bind the stale hash as current authority.**"

The shim under hold is present and untouched at `demo/styles/foundation.css:571-574`:

```css
.glass-slider[data-variant="spectrum"] .slider-range {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}
```

`HANDOFF-2026-07-24.md:354` calls this "**the frozen** Value carry-ledger". It is frozen only in a dirty working tree, and it has already been observed to move once. Neither handoff records the moving-byte incident.

---

### O3-15 — twenty-one spec-correction rows (R13–R33) are named in no live document — **MAJOR / CONFIRMED**

The R-ledger spans R1–R33: R1–R12 in `PI.md` §2d + `parser-proof/equivalence.md` §4 + research §E; R13–R33 across the three W-audit addenda.

```
$ grep -oE "\bR[0-9]+\b" ADDENDA-03.md | sort -uV → R1 R4 R5 R8 R12 R13 R14 R15 R16 R17 R18
$ …             ADDENDA-04.md                     → R1 R3 R6 R9 R13 R18 R19 R20 R21 R22 R23 R24 R25 R26
$ …             ADDENDA-05.md                     → R8 R10 R11 R13 R18 R19 R26 R27 R28 R29 R30 R31 R32 R33
$ grep -oE "\bR[0-9]+\b" HANDOFF-2026-07-24.md ADDENDA-07.md ADDENDA-08.md CHARTER.md FEATURE-LEDGER.md | sort -u
CHARTER.md:R1   CHARTER.md:R5   HANDOFF-2026-07-24.md:R1   HANDOFF-2026-07-24.md:R12
```

The live set names only **R1, R5, R12** — and only as range endpoints ("R1–R5", "R1–R12"). **R13 through R33 appear in no live document.**

`ADDENDA-08.md:277-280` asserts: "No prior addendum's useful specification counterexample is deleted merely because its implementation authority may be historical." Nothing acts on that assertion: there is no consolidated R-index, no carry list, and `FEATURE-LEDGER.md` has no R column.

These are not process rows. `ADDENDA-04.md:107-135` (R19) is an exact normative grammar with a fixture table:

> "Comma-separated `rgb()`/`rgba()` requires **three homogeneous channels: all numbers or all percentages**. Comma-separated `hsl()`/`hsla()` requires percentage saturation and lightness. **No legacy component, including alpha, accepts `none`.** … Function aliases do not change the grammar." — with 11 exact `source → required result` rows (`rgb(1,2%,3)` → reject `css_syntax`; `hsl(120,50,50)` → reject; `rgb(1 2% 3)` → accept modern; …).

`FINDINGS.md` E09 captures a **fragment** ("legacy color syntax is comma-separated, modern syntax is space-separated, mixed form rejected") and drops the homogeneity rule, the `none` prohibition, the alias rule, and the entire fixture table. Twenty-one rows produced by three E-3 triumvirate formations and six independent adversarial audits are being carried by a one-line paraphrase of one of them. `FINDINGS.md` J04 ("`ADDENDA-03..05` counterexamples should be discarded" → `REJECTED_CLAIM`) is nominally correct and **operationally false**: they are being discarded by omission.

---

### O3-16 — the prompt census and the seat-independence structure are exactly reproducible — **INFO / CONFIRMED (positive)**

`HANDOFF-2026-07-24.md:208-210`: "181 canonical prompt events: 83 original Value, 28 V·π, and 70 BBNF. The two Value tasks contain **32 direct owner prompts and 79 delegated receipts/prompts**."

```
value-tranche-v-formation :  19 direct-user-prompt  +  0 ide-context  +  64 delegation  =  83
value-v-pi-refinement     :   2 direct-user-prompt  + 11 ide-context  +  15 delegation  =  28
bbnf-greenfield           :  10 direct-user-prompt  + 19 ide-context  +  41 delegation  =  70
owner = 19+2+11 = 32   delegated = 64+15 = 79   total = 181                              ✓ EXACT
```

Envelope census (all 3,283 rows machine-read): 820 / 886 / 1,577 rows; 410 / 581 / 1,049 carry `encrypted_content` (Fernet `gAAAAAB…`); **310 distinct author→recipient seat identities** in the V·π task alone. Plaintext is unrecoverable → `ENCRYPTED_UNMATERIALIZED` is the correct disposition for every one. But the **author field is plaintext**, which yields an independent, non-self-asserted witness on the process claims:

```
/root/g15_author_h  /root/g15_author_b  /root/g15_author_s  /root/g15_author_d  /root/g15_optimize_h
/root/g16_skeptic_{architecture,benchmark,correctness,gestalt,semantics}      → reviews/skeptic-1..5.md
/root/g16_v2_{architecture,benchmark_fresh,gestalt,runtime,semantic}          → reviews/v2-1..5.md
/root/g16_synth_{architecture,performance,semantic}                          → synthesis/{architecture,performance-gestalt,semantic}.md
```

Ten distinct skeptic seats and three distinct synthesis seats, **disjoint from the four author seats**, matching the on-disk review file counts. `ADDENDA-07` §3/§5's seat-independence law is therefore **structurally corroborated by the rollout transport**, not by the self-authored `acceptance.json`. This is the strongest evidence artifact the tranche produced and neither handoff points at it.

---

### O3-17 — the acceptance record self-grants an exemption from ADDENDA-07 §5 and names only one peer — **MINOR / CONFIRMED**

`ADDENDA-07.md:265-274` — `APOTHEOSIS-ACCEPTED` requires, among others: "the full feature corpus, no-throw/limit rail, **round-trip rail**, and **public adapter differential** are green" and "for **every** genuinely comparable door, the final candidate satisfies the predeclared strict-win rule against **the LIVE regex and every retained prior iteration**".

`g16/acceptance.json`:

```json
"public_adapter": "NOT_APPLICABLE_TO_INTERNAL_PREFIX_LEAF; downstream value-unit/public doors remain separately governed",
"performance": { "peer": "exact deposed operation-equivalent consume-number recognizer",
                 "qualification": "PASS_STRICT_WIN",
                 "scope": "exact 64-row common-domain corpus and pinned local environment only" }
```

No round-trip field; a self-declared `NOT_APPLICABLE` for a mandatory condition; **one** peer where §5 names two classes. The exemption may well be right on the merits for an internal prefix leaf — but it is granted **by the accepted artifact about itself**, in a tranche whose G03 law rejects exactly that. It should be an E-3 row, not a JSON field. (Depth on the benchmark itself belongs to O5; I raise only the authority-compliance gap.)

---

### O3-18 — CHARTER converts an owner directive into a gate without recording the narrowing — **MINOR / CONFIRMED**

Owner prompt 002 (`2026-07-21T21:25:25.313Z`, verbatim): "**Fold in and communicate** any parse-that uplifts fully actualized and hardened by bbnf-lang's active agent."

`CHARTER.md:19-22`: "Fully actualized and hardened BBNF/parse-that uplifts are **candidates for audited incorporation**; unaudited source, novelty, or status claims are not authority." — plus `CHARTER.md:75-80`'s requirement that "an **E-3 addendum explicitly changes the pin**".

"Fold in" (a directive to incorporate) became "candidate for audited incorporation" plus a pin-change gate. The hardening is defensible and probably correct, but it narrows an owner verb with no addendum recording the narrowing. No practical harm today: `formation/bbnf-transaction-receipt-2026-07-22.md` returns "**RED / no consumable uplift artifact**", which I corroborate — the installed 1.0.0 exposes only `.`, `./core`, `./diagnostics`.

---

### O3-19 — "PROPOSED · NOT RATIFIED" is upgraded to "superseded authority" in the handoff's table — **MINOR / CONFIRMED**

`ADDENDA-02` … `ADDENDA-06` each self-declare in their own preamble: "**PROPOSED · NOT RATIFIED · NO … AUTHORIZED**", and each requires "two independent adversarial ACCEPT challenges … root … gestalt adjudication, and the owner must explicitly ratify".

`HANDOFF-2026-07-24.md:320-322` describes 03/04/05 as "historical … **code authority superseded**" — implying a code authority they never held. `ADDENDA-08.md:270-272` says it correctly: "**proposed** code authority superseded". Two live disposition tables, different words, neither citing the other. The handoff's wording is the one a future reader will use (it is the entry point) and it is the inaccurate one.

---

## Rows of FINDINGS.md I dispositioned

My lens owns sections **A**, **D**, **J** in full; I also disposition rows elsewhere where I hold direct evidence. Rows not listed here are outside my evidentiary reach and belong to O1/O2/O4/O5.

| Row | Handoff label | My disposition | Basis |
|---|---|---|---|
| A01 | ACCEPTED_FACT | **OPEN** | `CHARTER.md:3-11` vs `V/megatranche/SCOPE.md:22` (M-9 folds π INTO the megatranche); founding order's verb is "execute it thereupon" |
| A02 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompt 001 verbatim: "deep prototyping and greenfield work NOW, not deferred until tranche execution time" |
| A03 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompt 002 verbatim: "The entire CSS spec is our goal … expanded CSS L4 spec as of July 2026 with our additional and experimental facilities" |
| A04 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompts 002 ("IDIOMATIC and non-contrived") + 005 ("You do NOT need a lexical layer") |
| A05 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompt 006 verbatim (3 prototypes / quintetto / triumvirate) |
| A06 | ACCEPTED_FACT | **MACHINE_FACT** (rule) | root transcript L967 verbatim; but see O3-02 — the rule's own process was not applied to `ADDENDA-07`/`08` |
| A07 | ACCEPTED_FACT | **MACHINE_FACT** | root transcript L967: "Spend little time on contrived gates or process and the majority of it on direct code implementation" |
| A08 | ACCEPTED_FACT | **MACHINE_FACT** | root transcript L967: "extreme parsimony … KISS-forward solutions … fewer lines of code" |
| A09 | ACCEPTED_FACT | **OPEN** | no verbatim owner text for the no-shim/no-alias law located in the frozen subject; it is asserted from "original V prompts" outside the archives |
| A10 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompt 020 verbatim: "The 48 hour goal was an abitrary upper bound" |
| A11 | ACCEPTED_FACT | **MACHINE_FACT** | owner prompt 021 verbatim: "Bollocks, claude does not own that. Unblock it." + `bbnf-owner-unblock` receipt + bbnf-lang master unmoved |
| A12 | OPEN | **OPEN** | this seat is one of the five; the audit is in progress, not closed |
| A13 | REJECTED_CLAIM | **REJECTED** | confirmed; and I could not produce an env-level model receipt for my own seat either (see Model receipt) |
| A14 | ACCEPTED_FACT | **REJECTED** as stated | 4d23h archive gap; founding orders absent from all 181 events; reproduced only from a Claude Code transcript outside the subject (O3-09) |
| B01 | REJECTED_CLAIM | **MACHINE_FACT** (claim REJECTED) | `find mirror/apotheosis -type f` → 6 files, one production, no barrel/root |
| B02 | ACCEPTED_FACT | **MACHINE_FACT** | `shasum -a 256 …/numeric.ts` → `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| C05 | ACCEPTED_FACT | **MACHINE_FACT** | `tokens.bbnf` declares exactly 3 primitive productions (`ident`, `selectorIdent`, `string`); no token objects |
| E17 | REJECTED_CLAIM | **REJECTED** | `keyframes.bbnf` `KEYFRAME_SELECTOR` has no range names, no `[0,100]` bound, folds list into the singular production |
| D01 | ACCEPTED_FACT | **MACHINE_FACT** | 15 files, 276 declarations, 1,329 lines, 56,598 bytes — all reproduced at `af15f63e` |
| D02 | REJECTED_CLAIM | **REJECTED** | computed closure reaches 9; `gradients, easing, filters, keyframes, transforms, values` unreachable |
| D03 | REJECTED_CLAIM | **REJECTED** | `stylesheet.bbnf` `keyframeStop/Sel/Block/Rule` vs `keyframes.bbnf`; `keyframes.bbnf` re-declares IDENT/STRING/DIMENSION/FUNCTION/DECLARATION |
| D04 | ACCEPTED_FACT | **EXTERNAL** | `MODULE-DAG.md` hash reproduced exactly (`291e5145…daca8f`); the ACK itself is a BBNF-side statement I could only read via Value-held receipts + delegation 007 |
| D05 | REJECTED_CLAIM | **REJECTED** | `bbnf-exchange-receipt` terminal-ACK section is explicit that it covers structure only |
| D06 | ACCEPTED_FACT | **MACHINE_FACT** | lockfile integrity `sha512-ygzF6JPb…` exact; real dir, not a link; no other `@mkbabb` dep |
| D07 | REJECTED_CLAIM | **REJECTED** | installed 1.0.0 exports are `.`, `./core`, `./diagnostics` — no CSS subpath |
| D08 | REJECTED_CLAIM | **REJECTED** | no `mirror/**` import of BBNF/parse-that source; only content-addressed reads of clean-HEAD `value-unit.bbnf` |
| D09 | REJECTED_CLAIM | **REJECTED** | the accepted production is built from published `regex` + `map` alone |
| D10 | REJECTED_CLAIM | **REJECTED** | `bbnf-transaction-receipt` returns RED/no consumable uplift; no status-based credit taken |
| D11 | REJECTED_CLAIM | **REJECTED** | 242 dirty entries; `git diff --stat af15f63e -- grammar/css/l4` → `color.bbnf` +357/−273 |
| H02 | REJECTED_CLAIM | **REJECTED** | `FEATURE-LEDGER.md:306-323` — 92-source complement `UNCLASSIFIED_RED`, no ratification |
| I01 | ACCEPTED_FACT | **MACHINE_FACT** | subject = 2,324 files / 354,220,932 bytes vs 17 lines of accepted grammar |
| I03 | REJECTED_CLAIM | **REJECTED** | owner prompt 006 is unretracted; `V/megatranche/SCOPE.md` M-4 re-imposes a challenge/jury shape |
| I07 | ACCEPTED_FACT | **ADMITTED_JUDGMENT** | owner prompt 026 ("Why do we not have a working, idiomatic, parse-that based css parser yet") supports it as an owner rebuke, not a mechanical metric |
| I08 | REJECTED_CLAIM | **REJECTED** | owner prompt 002's goal is unretracted; `SCOPE.md` M-9 re-affirms it as a requirement |
| J01 | ACCEPTED_FACT | **OPEN** | `ADDENDA-01` is "active" wholesale while carrying three clauses the live set contradicts (O3-05) |
| J02 | REJECTED_CLAIM | **REJECTED** — with carve-out | self-declares `PROPOSED · NOT RATIFIED`; **but** its §1.1/§1.2/§1.3 (PB0, Gate 2, occurrence-atomic denominator) remain load-bearing in `CHARTER` G-1/§Goal and `FEATURE-LEDGER` §3 (O3-03) |
| J03 | REJECTED_CLAIM | **REJECTED** | all three self-declare `NO NEW SEMANTIC CODE AUTHORIZED` |
| J04 | REJECTED_CLAIM | **REJECTED** nominally, **OPEN** operationally | R13–R33 are carried by no live document (O3-15) |
| J05 | REJECTED_CLAIM | **REJECTED** | `ADDENDA-06` self-declares `PROPOSED · NOT RATIFIED`; `ADDENDA-07` §6 retires the lifecycle. Caveat: its OC-1A/B rows are the only place OC-1 machinery survives (O3-04) |
| J06 | ACCEPTED_FACT | **MACHINE_FACT** | `ADDENDA-07.md:290-309` restates unit identity, pairwise denominator, schedule identity, immutable raw evidence, no-retry erasure |
| J07 | ACCEPTED_FACT | **ADMITTED_JUDGMENT** | substance owner-ratified (prompts 004/005/006); the **document** was never ratified, never twice-challenged, has no gestalt, and its "one hostile protocol challenge" has no artifact (O3-02) |
| J08 | REJECTED_CLAIM | **REJECTED** | all eleven Glass delegations say "no Value action"; both §D preconditions unmet |
| J09 | REJECTED_CLAIM | **REJECTED** | owner phase marks 022/023 verbatim |
| J10 | ACCEPTED_FACT | **MACHINE_FACT** | the receipt corpus records without acting; no Value byte moved |
| K.1–K.10 (obligations) | — | **OPEN** | all ten remain open; K.7 (52-export/37-consumer compatibility layer) additionally collides with the unretracted SUPERSEDED-BY-CONSUMPTION promise (O3-06) |
| all `raw-agent-envelopes` rows (3,283) | — | **ENCRYPTED_UNMATERIALIZED** | every payload is Fernet `gAAAAAB…`; author/recipient plaintext censused, content unrecoverable |
| `raw-agent-messages` (30,420 L) | — | **not dispositioned by this seat** | I did not read them; O1/O2/O5 own the message-level claim sweep |

---

## What I could not verify and why

1. **My own served-model receipt.** `ANTHROPIC_MODEL` / `CLAUDE_CODE_SUBAGENT_MODEL` are unset. I state my identity from my system context; there is no machine artifact. Under A13's own logic, this is a label, not a receipt.
2. **The BBNF-side terminal ACK.** I verified the *object* (`MODULE-DAG.md` = `291e5145…daca8f`) exactly. I did **not** find a BBNF-repository artifact recording the ACK; it exists only in Value-held receipts and the delegation stream. `EXTERNAL`, not `MACHINE_FACT`.
3. **`ADDENDA-06` interior** (7,057 L) and its two audits (7,932 L). Grep-only. I make no claim about its benchmark protocol beyond its `PROPOSED · NOT RATIFIED` header and its OC-1A/B rows.
4. **`ADDENDA-02` §§1.1/1.2/5–9, `ADDENDA-03/04/05` bodies** beyond the sampled ranges. R13–R33 were censused by number, and only R19 was read in full.
5. **`raw-agent-messages/*` (30,420 lines).** Not read. The finding-totality gate over root assistant messages is not discharged by this seat.
6. **Envelope plaintext (3,283 rows).** Fernet-encrypted; no key. `ENCRYPTED_UNMATERIALIZED` by construction.
7. **Whether the `V/megatranche/SCOPE.md` owner marks (M-1…M-10) are verbatim owner text.** SCOPE.md is untracked, moving, and agent-authored. I did not attempt to locate its source prompts. Its M-2/M-9 conflicts with the π handoff are therefore recorded as **contested**, not as owner rulings.
8. **Whether the mini-tranche notice or the BBNF coordination letter reached any human or agent by a channel outside the filesystem.** I can only observe: not in the recipient tree, not in the mail ledger, no counterpart file.
9. **Whether OC-1 was ever ruled.** `ADDENDA-06`'s audits speak of an "already-ratified OC-1A/B choice authority", but I did not read `ADDENDA-06` far enough to find a receipt, and no live document carries one. **OPEN.**
10. **The 92-source complement, the occurrence bijection, and every denominator claim.** Out of my lens; `FEATURE-LEDGER.md` self-declares them RED and I did not test them.
11. **Benchmark substance.** O5's lens. I assessed only whether the acceptance record satisfies `ADDENDA-07` §5's *stated conditions* (O3-17).

---

## Open questions for the adjudicators

1. **Is `SYNTAX-CONSUME-NUMBER`'s `APOTHEOSIS_ACCEPTED` status void?** `ADDENDA-07` §2 forbids pilot acceptance before ledger freeze; the ledger is not frozen; the only permission postdates the acceptance by 43 hours, sits in an unratified document, and declares no supersession. Either the clause is repealed (by whom?) or the one accepted feature is not accepted. There is no third reading.
2. **What is "`08` supersession"?** `HANDOFF-2026-07-24.md:19` instructs readers to apply it to `CHARTER.md`. `ADDENDA-08` contains no supersession clause. Adjudicators must either write one or strike the instruction.
3. **Which document defines Gate 2, PB0 and PB13P now?** `CHARTER` G-1/§Goal/G-3 depend on all three; the only definitions are in a document both tables call historical, and `ADDENDA-07` §0 misclassifies PB0 as scanner design. Options: (a) re-live `ADDENDA-02` §1.3/§3-PB0, (b) redefine in `ADDENDA-09`, (c) strike the CHARTER clauses.
4. **Does G-3 still carry the absolute bars, and who rules OC-1?** `CHARTER` says absolute+relative+corpus-matched; the handoff says relative-only; the pinned proof authority says the absolute floors do not transfer to this rig. This is an owner decision that has been open since 2026-07-20 and has now fallen out of every live document.
5. **What happens to SUPERSEDED-BY-CONSUMPTION?** A live instruction tells an external fleet not to build ~20 registry rows plus the whole CSS L4 surface, against a 17-line delivery — and it appears never to have been delivered, while `CHARTER`/`PI.md` assert it was sent. Adjudicators must choose: retract it, bound it to π's actual accepted verticals, or deliver it honestly with the real state attached. Note `V/megatranche/SCOPE.md` M-10 forbids the string "next tranche decides", so deferral is not available.
6. **Which reading of the π/megatranche boundary governs — `HANDOFF-2026-07-24` §13 or `V/megatranche/SCOPE.md` M-9?** They were authored twenty minutes apart, are mutually exclusive, and neither cites the other. This determines whether `PI-CLOSE.md` is still a required artifact.
7. **Is E-5's Fable allocation dead?** `CHARTER` §Constraints and `PI.md` §4 still print it; `SCOPE.md` M-2 kills it. If M-2 is real owner text, a π addendum must record it; if not, M-2 is an agent overreach that must be corrected in the other direction.
8. **Do `ADDENDA-07` and `ADDENDA-08` require retroactive E-3 treatment** (triumvirate → two independent challenges → gestalt → owner ratification) before they can continue to govern, given that they impose exactly that on everything else and are the only two addenda that never received it?
9. **Where does the R-ledger live now?** R13–R33 are twenty-one exact normative corrections with fixture tables, produced by three formations and six audits, currently carried by nothing. Either `ADDENDA-09` consolidates R1–R33 into the feature ledger as fixture rows, or they are lost.
10. **Should the Glass↔Value authority anchor be committed?** Three Glass adjudications bind Value `CARRY-LEDGER.md` at `9e88f9e2…`, a working-tree-only hash on an untracked-adjacent, already-observed-moving file, in a repository whose sole "never touch" dirty row (`scripts/dev/dev.sh`) makes a clean commit awkward. This is a cross-repo integrity hazard independent of the parser.
11. **Should the audit subject be re-frozen?** The manifest's `dirtyPathCount: 20` / `porcelainSha256: dcd883dd…` is already stale — 21 at mid-session (`+ docs/tranches/V/megatranche/`) and 22 at report close (`+ docs/tranches/W/`). The π tree itself verifies clean (ledger `b723e3cc…`, tree `948411a8…`), so a note may suffice — but the adjudicators should say which, and should note that a **tranche-W letter** now exists three minutes after `SCOPE.md` declared "no new tranche letter is opened".
12. **Does the audit's evidentiary base need to extend beyond Codex?** The founding authority of this entire tranche lives in a Claude Code root transcript that is not in the subject. `FINDINGS.md` A14 cannot stand as written, and no future seat can verify `CHARTER` or `ADDENDA-01` from the frozen subject alone.

---

*O3 seat closed. No subject byte was edited. No coordination message was sent. No snapshot was taken into any repository.*
