# S1 — Truth synthesis

**Seat:** Opus synthesis adjudicator 1 of 3 (`AUDIT-BRIEF.md §5.1` — *truth synthesis:
reconciles facts, counterexamples, and evidence*)
**Subject:** the unchanged frozen V·π tree bound by
`receiving/AUDIT-SUBJECT.json` (Value HEAD `c654824e0b252cda7f8490b67f182a48c48cc0ed`,
branch `tranche-u`, tranche path `docs/tranches/V/apotheosis/pi`, 2,324 files,
354,220,932 bytes, ledger `b723e3cc…f593aea`, `trackedFilesInHead: 0`).
**Inputs:** the frozen subject plus all five immutable skeptic reports.
**Standing:** I did not author the subject, did not author any skeptic report, and did not
read either sibling synthesis (`opus-synthesis-2-architecture.md`,
`opus-synthesis-3-performance-gestalt.md`) — both are present on disk and both were left
unopened, per `AUDIT-BRIEF §5` ("They do not communicate").
**Report date:** 2026-07-24. No subject byte was edited by this seat.

---

## Model receipt

- **Model I observe myself to be:** `claude-opus-5[1m]`, declared to me by the harness as
  "Opus 5 (1M context)". It is an Opus-family identifier and nothing in my context
  contradicts it.
- **Effort — and this is a machine receipt, not a self-report:** the process environment
  carries `CLAUDE_EFFORT=xhigh`. This is the one identity field in this seat that is
  independently readable rather than declared. **No skeptic reported it**; all five stated
  effort from their own prose. It matters, because it demonstrates that the
  harness-layer receipt O1/O3/O4 asked for is *partially implementable today*.
- **Model receipt: ABSENT, same as all five skeptics.** `ANTHROPIC_MODEL` and
  `CLAUDE_CODE_SUBAGENT_MODEL` are both unset in my shell; `AI_AGENT` reads
  `claude-code_2-1-219_agent`; there is no served-weights attestation. Under this
  tranche's own row **A13** — *"labels are intent only"* — my model identity is a **label,
  not a receipt**.
- **Consequence the triumvirate must not step over:** `AUDIT-BRIEF §2` requires that
  "each report begins with the actual served model identifier" and that "a model not
  literally served as Opus earns no requested-audit credit". **Eight seats have now run
  (five skeptics, three adjudicators) and not one produced a served-model receipt.** The
  receiving audit reproduces, at seat level, exactly the defect it convicted the Codex
  sessions of. The Codex side is strictly *better* evidenced here: `turn_context` proves
  what Codex actually ran (O1-12). This side proves nothing. **A12 cannot close on
  model-truth grounds until the harness records the receipt**, and I say so about myself
  first.

---

## §0. What I independently executed

I am an adjudicator, not a sixth skeptic. But "no majority vote manufactures truth" means
that where skeptics contradict each other I must go to the bytes myself. I ran the
following against the frozen subject and the live repository. Every number below is mine.

| # | what I ran | result | settles |
|---|---|---|---|
| 1 | Full JSON parse of all 3,283 envelope rows; classified each by `content[*].type` | **2,040 carry `content[1].type == "encrypted_content"` (Fernet `gAAAAAB…`); 1,243 do not** | O1-02 **vs** O2/O5 |
| 2 | Split by transport shape | `Message Type: MESSAGE` → 2,040, **all encrypted**; `Message Type: FINAL_ANSWER` → 1,243, **all plaintext**. Zero exceptions | the same |
| 3 | Character census | `sum(len(content[0].text))` = **3,134,390** — of which **2,966,550 is genuine FINAL_ANSWER prose from 721 distinct authors** and **167,840 is 79-char routing stubs** on the encrypted rows | why O1 measured what it measured |
| 4 | `grep "NO legacy code"` over `raw-prompts/` | **6 occurrences** — `value-tranche-v-formation.md:47,147,316,339,844`, `bbnf-greenfield-coordination.md:88` | O1 **vs** O3 on **A09** |
| 5 | `shasum -a 256` + `wc -l -c` on the accepted parser | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`, **17 lines, 560 bytes** | B02 |
| 6 | `node -e` against **`dist/subpaths/css.js`** (the module the parser-proof harness names `live`) | `parseCssColor("oklch()")`, `"rgb()"`, `"lab()"`, `"oklch( )"` **all throw `TypeError: Cannot read properties of undefined (reading 'replace')`** | O4-02 / E01 / G01 |
| 7 | `parseKeyframeSelector` against the same dist module | `"101%"` → `ok:false`; `"exit 101%"` → `ok:false`; `"entry"` → **`ok:true`**; `"entry 150%"` → `ok:false`; `"scroll 50%"` → `ok:false` | O4-03 / O4-10 |
| 8 | `equivalence-results.json` row census | `gate: GREEN`; **142 of 403 `OUT_OF_SCOPE` (35.2 %)**; **all 22 `door=="keyframe-selector"` rows `OUT_OF_SCOPE`**; rows **104 (`101%`) and 213 (`exit 101%`) both `liveOk: true`** | O4-10 |
| 9 | `ROOT-DISPOSITION.md` read | skeptics 1/3/5 **ACCEPT**, 2/4 **REJECT**; *"The exact G16 evidence subject is **REJECTED** before synthesis"* — against `acceptance.json` `"quintetto": "FIVE_OF_FIVE_ACCEPT"` | O2-08 |
| 10 | `ADDENDA-07.md:3` and `:137-138`; `ADDENDA-0{1..6}.md` headers; mtimes | `07` = **"Status: OWNER-RATIFIED"**; `02`–`06` = **"PROPOSED · NOT RATIFIED"**; `01` = **no status line**; §2 = *"no pilot acceptance or broad fan-out precedes full-ledger freeze"*; `acceptance.json` mtime **07-22 18:34**, `ADDENDA-08.md` mtime **07-24 13:48** (**+43.2 h**); `FEATURE-LEDGER.md:3` = *"ACTIVE / denominator incomplete"* | O1-06, O3-01, O3-05 |
| 11 | `git show 9aedfc50^:src/parsing/utils.ts \| shasum` vs the timed peer | **both `73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4`** — byte-identical. `9aedfc50` = *"perf(O.W6): SOTA hot-path rewrites — byte-loop scanners"*. `g7/lineage.json` `excluded_h_ancestry[1]` = *"current scanner-era numberFastParser — Post-historical scanner optimization is excluded"* | O5-F02 |
| 12 | Export census of `src/css/index.ts` and `ls src/subpaths/` | **19 runtime + 33 type = 52** for the `/css` door; **7 doors exist** | O4-06 |
| 13 | Structural census | `foundation-g4`: **17 files, 0 review/skeptic/synthesis files**. `syntax-number-start`: **80 files, `candidates/` empty**. `denominator/` = **244 MB**; v2 = 69,589,449 B, v3 = 69,590,643 B | O2-13, O2-24, O2-23 |
| 14 | `FINDINGS.md` row count | **115 table rows** + 10 §K obligations = **125** | scope of this report |

---

## §1. The authoritative answer

### 1.1 What V·π actually contains

**One accepted CSS parser production: 17 lines, 560 bytes, one regex terminal and one
`.map`.** That is the whole of the shipped grammar. It is real, it is byte-identical to
the candidate that was reviewed, it typechecks under strict TypeScript with
`noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`, four tests pass, and 180
sealed correctness cases plus 65,024 independent-oracle transactions replay
byte-identically on demand.

Around it: **2,324 files and 354,220,932 bytes.** 72.1 % of that is a machine analyzer's
output that the tranche itself rejects with `ZERO_CREDIT` in all eight generations —
including two 69.59 MB copies whose payloads are byte-equal and whose headers differ by
~1.2 KB. 22.4 % is `node_modules`. The accepted parser is **one part in 632,537** of the
tranche by bytes, and roughly **2,137 authored lines of machinery per line of parser**.
Six feature lineages ran 33–40 generations to produce one acceptance; one of them
(`SYNTAX-NUMBER-START`) ran seven complete admission/holdout/benchmark ceremonies across
72 files and **never wrote a single line of candidate code**.

Beside the accepted parser sits a **substantial, still-green rejected tree**: 23 runtime
files, 2,589 LOC, 86 passing tests — the atom/token/CST architecture the owner vetoed in
three consecutive prompts on 2026-07-22. It is quarantined by a `tsconfig` `exclude` that
one benchmark-peer import defeats.

### 1.2 What is actually proven

Proven means: I or a skeptic executed it, or it is a byte-exact identity, or it is a
pinned normative source, or it is a live browser witness.

1. **The accepted parser's identity and correctness within its exact operation.** SHA
   `8c3ac689…e95aa` (mine); 180/180 sealed cases and 65,024 oracle transactions replay
   cold (O2-04); 200,000-call randomized fuzz → 0 throws, 0 bad offsets; 10⁶-digit input
   in 1.76 ms; parser identity static at `id === 2` over 100,000 parses (O2-28).
2. **The prompt census.** 181 events / 180 unique / 2,862 root messages / 3,283 envelopes;
   all three source hashes and all nine archive hashes exact; the 32/79 split reproduces;
   the 13-item V·π owner chronology is faithful in content and order (O1, corroborated
   independently by O2-30 and O3-16).
3. **Model truth of the subject.** `turn_context` over all three rollouts: **zero Opus
   turns.** The handoff admits this and refuses to relabel. That admission is correct and
   is the single most creditable paragraph in the packet (O1-12).
4. **The keyframe-selector CSS semantics.** Four arms, seven names, named-range percentage
   **mandatory and unbounded** vs bare percentage **bounded [0,100]**, comma-list above
   the singular selector — confirmed from pinned spec bytes at the tranche's own commit
   `c7573530…` and by a Chromium 148 / WebKit 26.4 CSSOM witness (O4-01/05/13/14/15).
   This is the best intellectual work in the tranche.
5. **R1 is a live shipping crash.** I ran it: `parseCssColor("oklch()")` throws a
   `TypeError` from `dist/subpaths/css.js` in value.js **4.0.0**, on a user-typed input
   path (`demo/color-session/picker-color.ts:110`, no try/catch). Chromium says the input
   is merely invalid. (O4-02, reproduced by me.)
6. **The BBNF/parse-that coordination chain.** Acknowledged HEAD `af15f63e…` still master's
   tip; 15 files, 276 declarations, 1,329 lines, 56,598 bytes, all 15 per-file SHA-256, the
   sorted ledger hash under the stated algorithm, the 9-of-15 import closure, `MODULE-DAG.md`
   = `291e5145…daca8f` exactly, `@mkbabb/parse-that@1.0.0` pinned exact with matching
   registry integrity and no workspace link. Independently reproduced twice (O3-11, O4-08).
   **This is the most rigorous work product in the tranche.**
7. **Seat topology.** 760 distinct subagent authors across 3,283 envelopes; the named seats
   `g15_author_{h,b,d,s}`, `g16_skeptic_{5}`, `g16_v2_{5}`, `g16_synth_{3}` are disjoint and
   match the on-disk review files. The 3×5×3 process **did structurally run** at the
   transport layer (O2-31, O3-16). This is the strongest independence evidence in the
   packet and **neither handoff points at it.**
8. **The pinned corpus enumeration.** 168 CSSWG sources at commit `c7573530…`, fully
   re-derived — commit, tree OID, 168/168 paths, blob OIDs, sizes and hashes (O4-07).
9. **The append-only evidence discipline.** Both G16 quintets including the two REJECTs,
   both failed benchmark attempts, the erratum, and both rejected denominator generations
   are all retained on disk. G16's `wx`/fsync/no-retry rail reproduces its estimator to the
   last float digit (O2-09, O5-F06). **This is genuine and better than most production
   benchmarking.**

### 1.3 What is merely claimed

1. **"Accepted."** The one acceptance was granted in violation of `ADDENDA-07 §2`'s own
   precondition; the permitting clause arrives 43.2 hours later in a document that is not
   owner-ratified, was never twice-challenged, has no gestalt, and **nowhere declares a
   supersession** — while `HANDOFF-2026-07-24.md:19` instructs readers to "apply 07/08
   supersession", an operation `08` never defines. (O3-01; my mtimes.)
2. **"Five of five accept."** The record says 3–2 and *"REJECTED before synthesis"*.
3. **"Sealed."** G16's ciphertext and external key are real and pre-candidate, but its
   reveal gate (`frozen_candidate_set_sha256`) was left **null**, its blindness rests on a
   self-attestation of exactly the shape row G03 rejects, and the **promoted artefact H2
   was authored five minutes after the holdout was decrypted**. G4's holdout is plaintext,
   post-authorship, with zero custody artefacts.
4. **"Strict equivalent peer win."** No external peer exists anywhere in the tranche —
   every comparison is value.js against value.js. The 7.07 % win is an artifact of an
   adapter charged to the peer lane only; neutralized, the candidate loses 9/9. The timed
   "deposed" peer is byte-identical to the revision **immediately before** value.js's own
   perf tranche deposed it (I verified the hash), and the actual successor was explicitly
   excluded from ancestry and never timed — against it the candidate is **15 % slower**.
5. **"GREEN, 0 mirror-defects."** True as the gate defines itself, and misleading as a
   correctness claim: 35.2 % of the corpus is `OUT_OF_SCOPE`, **all 22 keyframe-selector
   rows are in that bucket**, and two of them carry `liveOk: true` values that I reproduced
   as **false**.
6. **"Owner-ratified" (`ADDENDA-07`).** No ratifying owner prompt exists. Every sibling
   addendum self-labels `PROPOSED · NOT RATIFIED`.
7. **"Fully discoverable" (A14).** The owner's only continuously-live instruction — his
   thread objective — is excluded from the "lossless" archive; rollback state is
   unrecorded; the tranche's own founding orders lie in a 4d23h gap outside the subject;
   and 62.1 % of the envelope corpus is genuinely opaque.
8. **"Denominator."** 168 sources enumerated is not a denominator. Nine analyzer
   generations produced **zero sealed feature rows** by the tranche's own admission. A
   defensible obligation count (883 / 1,333 / 304) was produced by one skeptic in one
   session with no bespoke tooling.
9. **"Collision letter sent."** `CHARTER.md:101-102` and `PI.md:202-203` assert it; there
   is no outbound ledger row past O-6, no counterpart in the recipient tree, and the letter
   still tells an external fleet to stop building ~20 registry rows plus the whole CSS L4
   surface — against a 17-line delivery.

### 1.4 The one-sentence answer

**V·π is an honest tranche with a broken economy and a compromised summary layer: nothing
I could execute was fabricated, but almost every top-level label — `FIVE_OF_FIVE_ACCEPT`,
`sealed_cases`, `peer`, `PASS_STRICT_WIN`, `OWNER-RATIFIED`, `GREEN`, "fully discoverable"
— overstates the record that sits one directory below it, and the acceptance those labels
decorate was itself granted in violation of the clause that governed it.**

---

## §2. Where the skeptics disagreed, and what the bytes say

### 2.1 SETTLED — the envelope corpus. Both O1 and O2/O5 are wrong; the truth is a split.

This is the most consequential factual contradiction in the five reports, and it is
decidable.

| position | claim | verdict |
|---|---|---|
| **HANDOFF-2026-07-24.md:197-203** | "Codex subagent payloads **are encrypted**" | **PARTIALLY FALSE** — true of 2,040 rows (62.1 %), false of 1,243 (37.9 %) |
| **O1-02 (BLOCKER)** | "**All 3,283 envelopes are readable plaintext** … There is **no ciphertext field, no `encrypted_content`, no opaque blob**" | **FALSE.** Refuted by subject bytes |
| **O2 / O5 (UNVERIFIED sections)** | "all 3,283 rows carry `encrypted_content` blobs"; "Codex subagent payloads are encrypted. I read no plaintext" | **FALSE.** Refuted by subject bytes |
| **O3-16 body measurement** | "410 / 581 / 1049 `encrypted_content`" | **CORRECT** (= 2,040). O3's own §"could not verify" line ("3,283 Fernet-encrypted payloads") contradicts its body and is wrong |
| **coverage ledger** | 2,040 `ENCRYPTED_UNMATERIALIZED` / 1,243 plaintext, split "perfectly and exceptionlessly by transport shape" | **CORRECT — the only fully accurate account in the packet** |

**The bytes.** Every envelope's `payload.content[0]` is an `input_text` routing header.
`Message Type: MESSAGE` rows (2,040) carry a **second** content item
`{"type":"encrypted_content","encrypted_content":"gAAAAAB…"}` and their `content[0].text`
is a **79-character stub** — sender, task, `Payload:` and nothing else.
`Message Type: FINAL_ANSWER` rows (1,243) carry **no second item** and their
`content[0].text` is the full legible report. Zero exceptions across all three files.

**Why O1 got it wrong, precisely:** O1 measured `content[0].text` and found it legible on
every row — which it is. Its three quoted samples (`/root/constellation_census`,
`/root/bbnf_portfolio_readonly` at 54,233 chars) are all `FINAL_ANSWER` rows. Its
"3,134,390 plaintext characters" is `sum(len(content[0].text))`, which I reproduced
exactly — but 167,840 of those characters are routing stubs standing in front of
ciphertext. O1 enumerated `payload` keys and never descended into `content[1]`.

**What survives of O1-02, and it is not small.** O1's *consequence* argument is
**CONFIRMED**: `ENCRYPTED_UNMATERIALIZED` applied corpus-wide would sweep **1,243 fully
readable subagent final answers — 2,966,550 characters from 721 distinct authors** out of
the audit unread. O2, O3 and O5 all did exactly that. That includes the
`/root/constellation_census` verdict *"Model-truth gate: RED / UNPROVEN"* rendered against
these very sessions. **The finding-totality gate at `AUDIT-BRIEF §4` is therefore
discharged for 2,040 rows and UNDISCHARGED for 1,243.** That is a live obligation for
`ADDENDA-09`, not a closed one.

**Ruling:** `ENCRYPTED_UNMATERIALIZED` **survives** as a class — O1's motion to strike it
fails on the bytes — but its scope is **exactly the 2,040 `Message Type: MESSAGE` rows**.
Applying it to a `FINAL_ANSWER` row is a coverage defect. `AUDIT-BRIEF §4`'s last
paragraph needs one added sentence, not a rewrite.

### 2.2 SETTLED — A09. O3 is wrong on subject bytes.

O1 dispositioned **A09** `MACHINE_FACT`, citing owner prompts FORM 009/010/048. O3
dispositioned it **OPEN**: *"no verbatim owner text for the no-shim/no-alias law located in
the frozen subject; it is asserted from 'original V prompts' outside the archives."*

I grepped the frozen archives. The text —
*"NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking
fallbacks."* — occurs **six times**: `raw-prompts/value-tranche-v-formation.md` lines
**47, 147, 316, 339, 844** and `raw-prompts/bbnf-greenfield-coordination.md` line **88**.

**O3 is WRONG on A09.** O1's disposition stands. O3's error is a sampling artifact — its
stated archive rule was grep-by-keyword, and it searched for the wrong keyword. This does
not impeach O3's other findings, which are the most byte-anchored in the packet, but it
does mean **O3's negative claims about archive contents carry less weight than its
positive ones.**

### 2.3 SETTLED — F02. Three seats, three different axes, one coherent answer.

| seat | disposition | axis |
|---|---|---|
| O2 | `PARTIALLY_TRUE` | the substance is real; the summary labels overstate |
| O5 | `REJECTED` | the acceptance rests on `PASS_STRICT_WIN`, which is refuted 9/9 |
| O3 | procedurally void | the acceptance violated `ADDENDA-07 §2` and the permission is retroactive |

These are not in conflict; they are three cuts of one artifact. My reconciliation:

- **Correctness and architecture credit SURVIVES, for the exact operation only.** The
  17 lines are spec-sound, direct, scanner-free, statically constructed, no-throw under a
  200,000-call fuzz, and promoted byte-identically. Every skeptic who read the source —
  including both G16 REJECTers — found it semantically sound. Neither rejection asked for
  a parser change.
- **Performance credit is REJECTED.** `PASS_STRICT_WIN` is an artifact of a harness that
  charges `source.slice` + `/[eE]/.test` + an object literal to the peer lane only. I
  verified the peer's byte-identity to `9aedfc50^:src/parsing/utils.ts` myself; the commit
  that deposed it is `9aedfc50` *"perf(O.W6): SOTA hot-path rewrites — byte-loop
  scanners"*, and `g7/lineage.json` explicitly excluded its successor from ancestry — an
  exclusion that silently propagated into the **comparator** set, which is a different
  thing entirely.
- **The acceptance LABEL is not earned.** `ADDENDA-07 §2` (my read, lines 137-138): *"no
  pilot acceptance or broad fan-out precedes full-ledger freeze."* `FEATURE-LEDGER.md:3`:
  *"ACTIVE / denominator incomplete."* `acceptance.json` mtime 07-22 18:34;
  `ADDENDA-08`'s permitting §2.1(3) mtime 07-24 13:48. **43.2 hours retroactive, in an
  unratified document, with no supersession clause.**

**Ruling on F02: PARTIALLY_TRUE / CORRECTED.** The row's *claim* ("accepted within its
exact operation") is defensible about the code and false about the process. Its *proof
column* — "acceptance, five skeptic, three adjudicator, active integration evidence" — is
falsified in one of four terms ("five skeptic": it was 3–2 then a second quintet) and
materially incomplete in another ("acceptance": granted against its own precondition).

### 2.4 SETTLED — A05 / J07: split the substance from the label.

O1 says `A05`/`J07`'s "ratified" is REJECTED; O3 says J07 is `ADMITTED_JUDGMENT` with the
same split; both agree on the facts. My bytes agree: `ADDENDA-07.md:3` is the **only**
addendum claiming ratification, `ADDENDA-02`–`06` all read `PROPOSED · NOT RATIFIED`,
`ADDENDA-01` prints **no status line at all**, and the complete direct-owner sequence after
`ADDENDA-07`'s authorship window contains a status request, a BBNF unblock, a question, a
percentage request, and a rebuke. **No ratification exists.**

**Ruling:** the 3-prototype/5-skeptic/3-adjudicator *content* and the architectural reset
*content* are owner speech verbatim (PI 004/005/006) and bind. The word **"owner-ratified"
is REJECTED wherever it appears** — `ADDENDA-07.md:3`, `HANDOFF-2026-07-24.md:18`,
`FINDINGS A05`, `FINDINGS J07`.

### 2.5 SETTLED — D04 node count, G09 scope, G11 scope, F10 status.

- **D04**: confirmed reachable and acyclic by O4's own transcription, but it is **16 nodes,
  not 15** — `MODULE-DAG.md:124`'s "fifteen" refers to BBNF's module count. Correction
  accepted; the row's disposition is unchanged.
- **G09**: O2 routed it away; O5 found the violation on disk (`12,748` is UTF-16 code
  units; UTF-8 is 12,821; 0.57 %, no verdict impact). Rejection upheld **as law**, and the
  violation is booked. V·π's own benches are clean.
- **G11**: O2 alone probed it and found it real, reproduced, and **mis-scoped** — the
  offset-only rewind is a library-wide convention shared by `any`, `all` and `skip`, not a
  `.skip` defect. `RESEARCH_ONLY` affirmed **with mandatory re-scope**.
- **F10 / G10 (G4 browser witness)**: **no seat replayed it.** O2 `UNVERIFIABLE`, O4
  `UNVERIFIED for G4`, O5 `RESEARCH_ONLY`. The handoff's `ACCEPTED_FACT for exact subject`
  **earns no audit credit** and must be downgraded to `OPEN`.

### 2.6 UNSETTLED — carried forward as explicit disagreement (see §6).

`A01` (O1 vs O3), `A06` (O1 vs O3), `I04` (O1 vs O5 vs the row), the standing of
`APOTHEOSIS_ACCEPTED` (O2 vs O5 vs O3), the live BBNF no-contact state (O1-08 vs
`HANDOFF §10`), and the 3×5×3 unit. All six are recorded in §6 with both positions and
what would settle them. **I did not edit any of them away.**

---

## §3. Claims that turned out to be FALSE

Ordered by consequence. "FALSE" here means: contradicted by bytes I or a skeptic executed
or read, not merely unproven.

| # | the false claim | where | refuted by | the truth |
|---|---|---|---|---|
| **1** | `"quintetto": "FIVE_OF_FIVE_ACCEPT"` | `g16/acceptance.json` | O2-08; **my read of `g16/ROOT-DISPOSITION.md:7-17`** | Skeptics 2 and 4 voted **REJECT**. Root wrote *"The exact G16 evidence subject is **REJECTED** before synthesis."* A second, disjoint quintet then ran. Both are on disk; the summary names neither |
| **2** | `"qualification": "PASS_STRICT_WIN"` / `"peer"` | `g16/acceptance.json` | O5-F01/F02; **my hash verification of the peer** | The 7.07 % is an adapter artifact; under a symmetric peer the candidate loses **9 of 9**, and against the true retained predecessor it is **15 % slower**. "Peer" names a value.js parser deleted from `src/` at `164343c1`. **No external peer exists in the tranche** (O2-12) |
| **3** | `liveOk: true` on rows 104 (`101%`) and 213 (`exit 101%`) | `parser-proof/equivalence-results.json` | O4-10; **my execution against `dist/subpaths/css.js`** | Both return `ok:false`. Two false receipts, on exactly the two out-of-bound probes that would have exposed the bounded/unbounded asymmetry |
| **4** | "Codex subagent payloads **are encrypted**" | `HANDOFF-2026-07-24.md:197-203` | O1-02; **my measurement** | False for **1,243 of 3,283** rows carrying 2,966,550 readable characters from 721 authors |
| **5** | "**All 3,283 envelopes are readable plaintext**; no `encrypted_content` exists" | **O1-02, a BLOCKER finding** | **my measurement** | False for **2,040 of 3,283**. O1 measured `content[0]` and never opened `content[1]` |
| **6** | "all 3,283 rows carry `encrypted_content`" | **O2 §"could not verify" 2; O5 §5.1; O3 §"could not verify" 6** | **my measurement** | False for **1,243**. Three seats declined to read 2.97 MB of readable subagent findings |
| **7** | **`Status: OWNER-RATIFIED`** | `ADDENDA-07.md:3`, repeated at `HANDOFF-2026-07-24.md:18`, `FINDINGS A05`, `J07` | O1-06, O3-02; **my header census** | No ratifying owner prompt exists. Every sibling says `PROPOSED · NOT RATIFIED`. `ADDENDA-01.md:5-9` — the packet's own rule — requires owner ratification |
| **8** | *"Material boundary changes receive addenda. **Ordinary code defects receive a fresh candidate generation**"*, presented as owner law 11 | `HANDOFF-2026-07-24.md:115-116`; restated at `FINDINGS A06` | O1-04 | Owner FORM 016: *"**Any material defects should result in addenda.** Mark me."* The trigger condition is **inverted** and defects are then explicitly excluded |
| **9** | *"the coherent feature operation **defined in `ADDENDA-07 §2`**"* | `ADDENDA-08.md:137-141`, propagated to `HANDOFF:101,385`, `preflight:75-77`, `FINDINGS I04` | O1-07; **`grep -ni coherent ADDENDA-07.md` → 0 hits** | `ADDENDA-07 §2` says **"smallest independently specifiable grammar operation"** — a granularity-*minimizing* definition. The citation does not exist |
| **10** | A14 — "raw prompts and Codex messages are **fully discoverable**" | `FINDINGS.md` | O1-03/09/10, O3-09; **my envelope census** | Owner thread objective excluded; rollback state unrecorded; a 4d23h gap contains both founding orders; 62.1 % of envelopes opaque |
| **11** | *"the frozen **PUBLIC CENSUS** is 52 exports"* | `ADDENDA-08.md:213` | O4-06; **my count: `src/css/index.ts` = 19+33 = 52, and 7 doors exist** | 52 is the `/css` door alone. The public surface is **141 over 7 doors**; the one real consumer needs **63 symbols over 6 doors** |
| **12** | *"the quintetto **subsumes** E-1's two-audit minimum"*, in a row titled **"union"** | `ADDENDA-07.md:237-239`, `ADDENDA-08` law table, `HANDOFF:104-105` | O1-05 | Owner PI 006: *"**Union** this with our above approaches."* Owner BBNF 030: *"no less than two … **Swear. Hic et ubique.**"* Union is not subsumption. Two real losses are concealed: E-1's unit is the *wave*, and E-1 required *Opus* seats |
| **13** | *"twice-independent wave audits" is a **stale** phrase … ADDENDA-07 **now supersedes that floor**"* | root msg 0404, 2026-07-22T18:06:27.820Z, laundered into `HANDOFF §3` law 7 | O1-03 | A self-authored addendum declared itself to supersede a **live owner instruction inside the active goal**, without asking. The owner's reply **33 seconds later** was *"What on earth have we been doing for the last two days then?"* |
| **14** | "**Route used:** `gpt-5.6-sol`, **ultra** reasoning" | `preflight-prompt-census.md:5-6` | O1-11 | `turn_context`: 48 × xhigh + 18 × high. **Zero ultra turns** — in a document whose own §3 correction turns on receipt exactness |
| **15** | A09 is unsupported in the frozen subject | **O3's disposition table** | **my grep: 6 verbatim occurrences** | The owner said it six times across two threads |
| **16** | "the acknowledged clean assay" = live BBNF worktree bytes | pre-existing claim, row D11 | O3-11 | 242 dirty entries; `color.bbnf` +357/−273 since the ACK. Correctly already rejected |
| **17** | *"current BBNF **no-contact** boundary"* as live owner authority | `HANDOFF-2026-07-24.md §10` | O1-08 | Owner PI 001 (*"Coordinate with…"*) and PI 005 (*"communicate … **as you need**"*) both **post-date** the 07-20 seal and are unconditional. The seal was retained as standing law and the later owner instructions were downgraded to per-packet exemptions |
| **18** | `src/parsing/grammars/css-values.bbnf` / `css-color.bbnf` exist and are consumed | **project memory `MEMORY.md`**, still live today | O4-12 | `src/parsing/` does not exist; **zero tracked `.bbnf` anywhere in value.js**. Deleted at `36f918d2`, tree retired at `164343c1`. Any seat reading memory starts from a false map of `src/` |
| **19** | *"the inherited subject has >1,100 files"* | `FINDINGS I01` | O2-22, O5-F11, `AUDIT-SUBJECT.json` | **2,324 files / 354,220,932 bytes.** Understated by 2× |
| **20** | "collision letter sent" | `CHARTER.md:101-102`, `PI.md:202-203` | O3-06 | No outbound ledger row past O-6; no counterpart in the recipient tree; recipient tree's newest mtime **precedes** the letter |

---

## §4. Claims that turned out to be TRUE-BUT-WORTHLESS

True statements that carry **no credit** toward what the tranche claims to have achieved.
Each is confirmed; each must stop being cited as progress.

| # | the true claim | why it is worthless as credit |
|---|---|---|
| **1** | `gate: GREEN` — "0 mirror-defects" in the parser-proof equivalence arm | True **as the gate defines itself** and false as a correctness statement. **142 of 403 rows (35.2 %) are `OUT_OF_SCOPE`**, including **all 22 keyframe-selector rows**, on the one door where the mirror reproduces all three live defects verbatim. A gate that routes its failure modes to `OUT_OF_SCOPE` by the same author cannot fail |
| **2** | Every SHA-256 in the G16 proof chain verifies | 44 adversarial seats and 1,608 lines of review prose reproduced every hash and caught **none** of the three decisive defects. Row **G02** already says identity is necessary and insufficient; the tranche then spent its entire review budget on identity |
| **3** | "180 sealed cases pass" | The promoted artefact **H2 was authored five minutes after the holdout was decrypted**. The evidence file itself concedes: *"regression evidence applied after candidate freeze; no cryptographically isolated author-access claim is made or needed."* It is a regression pass, correctly labelled one directory down and mislabelled at the top |
| **4** | "G4 revealed regression cases pass H/B/S 25/25, digest matches" | The holdout is plaintext, its `cases.json` post-dates every candidate by 8–12 minutes, and there is **not one custody artefact** in the whole `prototypes/` tree. It measures self-consistency |
| **5** | All six G4 candidate hashes verify; G4-H is a self-contained direct-combinator tree | `SUBJECT.json` records `feature_credit: 0`, `peer_win: false`, `full_parser_win: false`, and **zero** of the five required reviews and three syntheses exist. It is a well-hashed unfinished thing |
| **6** | 168 CSSWG sources enumerated at the pin, fully re-derived | Enumeration is not a denominator. Nine analyzer generations over 255 MB produced **zero sealed feature rows** (`FEATURE-LEDGER.md:309`). One skeptic produced 883/1,333/304 obligations in one session with no analyzer |
| **7** | BBNF has 15 modules and 276 declarations at the acknowledged HEAD | A precise census of **another repository's** grammar files. It grants value.js zero parser credit, and 6 of the 15 — including `values`, the hub the proposed DAG centres on — are unreachable from the registered root |
| **8** | The corrected `MODULE-DAG` is reachable and acyclic, terminally acknowledged | The ACK's own text disclaims implementation and conformance credit. The DAG **cannot host ≥6 of the 19 frozen runtime exports** it is gated on, contradicts itself three ways on `timeline-range`'s home, and mis-assigns the bare keyframe percentage one line after forbidding exactly that merge |
| **9** | Strict TypeScript green; 4 of 4 tests pass | Green over **17 lines** and one operation, with `--passWithNoTests` on the promotion rail. Row **B04** already says so; the label keeps travelling |
| **10** | "Comma-list composition sits above the singular keyframe selector" (E15) | Correct — and **already realized in shipping `src/css/stylesheet.ts:490-494`**. It is not a discovery. The construct it corrects is in **BBNF's** `keyframes.bbnf`, which inverts the tranche's coordination narrative |
| **11** | External receipts may be recorded without performing their held action (J10) | True, and it is an accounting rule, not progress. It appears in a findings ledger whose §I rows already concede that artifact volume is not convergence |
| **12** | The small benchmark identity/paired/raw/no-retry laws remain active (J06) | True, followed at G16 — and **insufficient by construction**: not one of them constrains *peer selection* or *lane symmetry*, which is precisely how the false strict win was produced under full compliance |
| **13** | The pre-reset mirror is substantial runnable reference code — 86 tests, 2,589 LOC (B05) | True, and it is the architecture the owner vetoed. Its only live effect is a quarantine breach: one benchmark-peer import pulls three rejected modules into the "clean" typecheck |
| **14** | 760 distinct subagent authors across 3,283 envelopes | Volume, not progress — and the coverage ledger says so in its own words. It corroborates that the seats *ran*; it says nothing about what they found, and 62 % of what they said is unreadable |
| **15** | "3.13 MB of plaintext across 3,283 envelopes" (O1-02) | Arithmetically reproducible and semantically misleading: 167,840 of those characters are routing stubs in front of ciphertext |

---

## §5. Final disposition of every `FINDINGS.md` row

125 rows: 115 table IDs (A14 · B8 · C10 · D11 · E17 · F16 · G13 · H8 · I8 · J10) + 10 §K
obligations. **Verdict** = my ruling on the row as written (`CONFIRM` / `CORRECT` /
`REJECT`). **Disposition** = the brief's vocabulary. No row is left unowned.

### A. Scope, authority, and steering

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| A01 | `ACCEPTED_FACT` | **CONFIRM, contested** | `MACHINE_FACT` within the subject; **CONTESTED_EXTERNAL** | O1: PI 001 *"not execution … per se"*, thread objective *"without production execution"*. **O3-08 dissents**: `V/megatranche/SCOPE.md:22` M-9 folds π *into* the megatranche. SCOPE.md is **outside** the frozen subject, untracked, authored ~20 min after the handoff. See §6.1 |
| A02 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1 + O3, PI 001 verbatim: *"deep prototyping and greenfield work NOW, not deferred"* |
| A03 | `ACCEPTED_FACT` | **CONFIRM, quantified** | `MACHINE_FACT` | O1 + O3 (PI 002); O4-07 quantifies the denominator as **52 : 304 : 883 : 1,333**. "52 exports are not the denominator" is right, and O4-06 shows 52 is not even the public surface |
| A04 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1 + O3, PI 002/005/006 verbatim |
| A05 | `ACCEPTED_FACT` | **CORRECT (split)** | 3/5/3 content `MACHINE_FACT`; **"ratified `ADDENDA-07`" `REJECTED`** | PI 006 backs the numbers verbatim (O1, O3). My header census: `ADDENDA-07.md:3` is the sole ratification claim; `02`–`06` say `PROPOSED · NOT RATIFIED`; no ratifying prompt exists (O1-06, O3-02) |
| A06 | `ACCEPTED_FACT` | **REJECT as stated** | `REJECTED` as owner steering; the narrowed rule is `ADMITTED_JUDGMENT` | O1-04: owner FORM 016 = *"**Any material defects** should result in addenda."* **O3 dissents** (`MACHINE_FACT` for the rule). See §6.2 |
| A07 | `ACCEPTED_FACT` | **CONFIRM as law** | `MACHINE_FACT` + recorded violation | O1 (FORM 003/009/010/016), O3 (L967). O5-F11: the tranche breached it at **17,916 : 1** authored-process-bytes per accepted source byte |
| A08 | `ACCEPTED_FACT` | **CONFIRM as law** | `MACHINE_FACT` + recorded violation | O1, O3. O5-F12: the *process* breached KISS more than the code ever could |
| A09 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | **My grep: 6 verbatim owner occurrences** (`value-tranche-v-formation.md:47,147,316,339,844`; `bbnf:88`). **O3's `OPEN` is WRONG on bytes.** Note O1-14: the law is **absent from `HANDOFF §3`** |
| A10 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1, O3, O5 — PI 020 verbatim |
| A11 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1, O3 — PI 021 *"Bollocks, claude does not own that. Unblock it."* + BBNF relay prompt 048 |
| A12 | `OPEN` | **CONFIRM — still open** | `OPEN` | Five skeptics have closed; this is synthesis 1 of 3. Closes only on three syntheses + `AUDIT-MANIFEST.json` + `ADDENDA-09`. **New defect: no seat produced a served-model receipt** (Model receipt, above), so `AUDIT-BRIEF §2`'s Opus condition is itself unreceipted on this side |
| A13 | `REJECTED_CLAIM` | **CONFIRM the rejection** | `MACHINE_FACT` | O1-12: `turn_context` across 181 prompts / 2,862 messages / 3,283 envelopes → **zero Opus turns**. **Extends to this audit**: all eight receiving seats are self-declared |
| A14 | `ACCEPTED_FACT` | **REJECT as stated** | `REJECTED` | Four independent grounds: O1-03 (objective excluded from a "lossless" archive), O1-09 (rollback state unrecorded), O3-09 (4d23h gap holds both founding orders), **my census** (2,040 of 3,283 envelopes opaque). O1 offered `PARTIALLY_TRUE`; O3 offered `REJECTED`; on four grounds the stronger reading governs |

### B. Current implementation truth

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| B01 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2 (`tsc --listFiles`), O3 (`find` → 6 files, no barrel/root) |
| B02 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | **My shasum: `8c3ac689…e95aa`, 17 lines, 560 bytes**; O2-05 diff against `g15/optimization/h2/index.ts` is empty |
| B03 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** as correctness evidence | O2 and O5 each ran `npm run check` (exit 0) and `npm test` (1 file / 4 tests). O2-03: the rail carries `--passWithNoTests` |
| B04 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-02, O5 — 4 tests, 1 operation |
| B05 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** | O2-21: `npm run test:rejected-g0` → 14 files / 86 tests, 23 runtime files / 2,589 LOC. It is the vetoed architecture |
| B06 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-21: `syntax/{atom,component-value,source,tokens}.ts`; `grammar/value.ts:12` *"Composable CST-backed grammar"* |
| B07 | `REJECTED_CLAIM` | **CONFIRM, with carve-out** | `MACHINE_FACT` | O1-19 establishes the reset's genuine owner authority; O2 finds no W0–W4 code in the active root. **Carve-out (O3-03):** the rejection is over-broad by association — `ADDENDA-02`'s PB0 contains no scanner and remains load-bearing in `CHARTER` |
| B08 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2, O5 — 15/15 families RED; no roots, no integration, no close rails |

### C. Direct-combinator architecture

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| C01 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2: the accepted production is `regex().map()` on published parse-that; no lexer runtime exists or is needed |
| C02 | `REJECTED_CLAIM` | **CONFIRM** | `ADMITTED_JUDGMENT` | O2 concurs; definitional. The accepted terminal is bounded and single-runtime |
| C03 | `REJECTED_CLAIM` | **CORRECT** | `PARTIALLY_TRUE` | O1-15: the row rejects a claim by citing the **terminal DAG ACK — a `gpt-5.6-sol` self-receipt** — over an explicit owner permission (PI 004: *"If you're using generalized facilities that scan within parse-that, **so be it**"*). Exculpatory: `MODULE-DAG:100-110` forbids only hand-rolled idioms and clause 4 **permits** recursive combinator productions. **Must be re-worded to preserve the owner's permission** |
| C04 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1-15 quotes `MODULE-DAG.md` clause 4 permitting *"exact recursive parse-that combinator productions for nested functions and blocks"* |
| C05 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O2 (rejected-tree `tokens.ts` = regex primitives, no token objects) **and** O3 (`tokens.bbnf` = 3 primitive productions) — two independent instruments |
| C06 | `REJECTED_CLAIM` | **CONFIRM** | `ADMITTED_JUDGMENT` | Corroborated by O4-08/O4-09: BBNF's own 15 modules are internally defective and the proposed DAG has **16** nodes — byte parity is neither achieved nor desirable |
| C07 | `ACCEPTED_FACT` | **CONFIRM as law; UNSATISFIED in fact** | `MACHINE_FACT` (law) + `OPEN` (implementation) | O4-04: **three mutually inconsistent owners** of `<timeline-range-name>` in shipping `src/css` (4 / 4 / 6 names, none of them 7). O4-09: `MODULE-DAG` contradicts itself three ways on where the owner lives |
| C08 | `REJECTED_CLAIM` | **CONFIRM, flagged** | `ADMITTED_JUDGMENT` | Uncontested by any seat. **Flag: this is `ADDENDA-07` law — agent-authored, not owner speech.** It survives on merit, not authority |
| C09 | `REJECTED_CLAIM` | **CONFIRM, unprobed** | `ADMITTED_JUDGMENT` — **no audit credit** | No seat probed it. Sound as a principle; unverified as a practice |
| C10 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-28: `consumeNumber.id === 2` stable over 100,000 parses; G14's S candidate demonstrated the failure mode |

### D. BBNF and parse-that coordination

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| D01 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** for Value credit | **Two independent reproductions**: O3-11 and O4-08 both measure 15 modules / **276** declarations / 1,329 lines / 56,598 bytes at `af15f63e…` |
| D02 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3-11 + O4-08: closure = **9**; unreachable = {easing, filters, gradients, keyframes, transforms, **values**}. O4 flags the comment-line trap that makes a naive extractor see a self-cycle |
| D03 | `REJECTED_CLAIM` | **CONFIRM, materially understated** | `MACHINE_FACT` | O4-08: **17** duplicated names across **6** module pairs, plus an unbooked **12-production UPPERCASE shadow layer** in `keyframes.bbnf` invisible to name-collision checks |
| D04 | `ACCEPTED_FACT` | **CONFIRM, corrected** | `MACHINE_FACT` | O1-17: on-disk SHA `291e5145…daca8f` = the terminal ACK subject exactly. O4-09: **16 nodes, not 15**; all reachable; acyclic |
| D05 | `REJECTED_CLAIM` | **CONFIRM, strengthened** | `MACHINE_FACT` | O1-17 quotes the ACK: *"grants no Value or BBNF mutation, implementation, conformance, movement, package, release, or production authority."* O4-09: the ACKed DAG **cannot host ≥6 of the 19 frozen runtime exports** |
| D06 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O2 + O3: `sha512-ygzF6JPb…EpY1Q==` exact, real directory, no workspace link, sole runtime dependency |
| D07 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2 + O3: installed exports are only `.`, `./core`, `./diagnostics` |
| D08 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3: no `mirror/**` import of BBNF source; only content-addressed reads of the clean HEAD |
| D09 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2 + O3: every replay in this audit ran on 1.0.0 |
| D10 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3: `bbnf-transaction-receipt-2026-07-22.md` returns **RED / no consumable uplift** |
| D11 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3-11: 242 dirty entries; `git diff --stat af15f63e -- grammar/css/l4` → `color.bbnf` **+357 / −273** |

### E. CSS semantic findings

*Standing rule for this section: rows no seat probed earn no audit credit and are
downgraded to `OPEN`, regardless of how plausible they read.*

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| E01 | `ACCEPTED_FACT` | **CONFIRM as law; VIOLATED LIVE** | `MACHINE_FACT` + **BLOCKER** | **My execution**: `oklch()`, `rgb()`, `lab()`, `oklch( )` all throw `TypeError` from `dist/subpaths/css.js`. Chromium: `CSS.supports('color','oklch()') === false`. Root cause `src/css/grammar.ts:181` — a false `!` on `slash[0]` |
| E02 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | **No seat probed it** (O4 explicit). Zero audit credit |
| E03 | `ACCEPTED_FACT` | **CONFIRM; violated live** | `MACHINE_FACT` | O4-11: Chromium rejects `rgb(1 2 3 /)`; value.js accepts |
| E04 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O4-01: spec `<percentage [0,100]>`; `-10%`/`120%` rejected by Chromium 148, WebKit 26.4 **and** value.js |
| E05 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | Not probed by any seat |
| E06 | `OPEN` | **CONFIRM — remains open** | `OPEN` | Not probed. Still requires a fresh normative replay |
| E07 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | Not probed by any seat |
| E08 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | Not probed by any seat |
| E09 | `ACCEPTED_FACT` | **CONFIRM; violated live** | `MACHINE_FACT` | O4-11: Chromium rejects `rgb(1,2 3)` / `rgb(1 2,3)`; value.js accepts. One root cause with E03/E10 |
| E10 | `ACCEPTED_FACT` | **CONFIRM; violated live** | `MACHINE_FACT` | O4-11: Chromium rejects `scroll(root, block)` / `view(block, 10px)`; value.js accepts |
| E11 | `ACCEPTED_FACT` | **CONFIRM; violated live** | `MACHINE_FACT` | O4-11: Chromium rejects `entry 10`; value.js accepts. `src/css/timeline.ts:16` makes the unit group optional |
| E12 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | Policy claim, not a probeable semantic (O4) |
| E13 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | **The strongest CSS finding in the tranche.** O4-01: pinned bytes `scroll-animations-1/Overview.bs:1337-1339` — fourth arm carries **no** `[0,100]` and **no** `?`; 2-engine CSSOM witness agrees; the contrast witness on `animation-range-start` proves the asymmetry is observable behaviour |
| E14 | `ACCEPTED_FACT` | **CONFIRM, scoped** | `MACHINE_FACT` | O4-01: exactly seven `<dfn>`s in `scroll-animations-1 §3.1`; `bogus 50%` rejected → closed set. O4's scoping caveat (§3.1 is *View* Progress ranges) is a resolution-time matter the grammar does not answer |
| E15 | `ACCEPTED_FACT` | **CONFIRM — but not a discovery** | `MACHINE_FACT` — **true-but-worthless** | O4-05: already realized at `src/css/stylesheet.ts:490-494`. The violation is in **BBNF's** `keyframes.bbnf` (O4-08), not in value.js |
| E16 | `ACCEPTED_FACT` | **CONFIRM as law; UNSATISFIED** | `MACHINE_FACT` (law) + `OPEN` (fact) | O4-04: three inconsistent owners in shipping `src`. O4-09: `MODULE-DAG` mis-assigns `bare-keyframe-percentage` to the timeline-range owner **one line before** declaring the two percentage domains distinct |
| E17 | `REJECTED_CLAIM` | **CONFIRM, + 2 new defects** | `MACHINE_FACT` | O3 + O4-08 independently. New: `keyframes.bbnf` embeds the comma list **inside** the singular selector (violating E15) and its third alternative is **unreachable** under PEG ordered choice; `stylesheet.bbnf`'s `keyframeStop` accepts `999%` |

### F. Prototype findings

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| F01 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-24: 7 generations / 72 files / **zero candidate code**; `g7/feature-public.json:56` terminal verdict `TWO_REJECTS_PLUS_ROOT_REJECT_BEFORE_CANDIDATE_CODE`. **My census: `candidates/` empty** |
| F02 | `ACCEPTED_FACT` | **CORRECT / DOWNGRADE** | `PARTIALLY_TRUE` — correctness+architecture credit **stands**; performance credit **REJECTED**; acceptance **label** not earned | See §2.3. O2-04/05/10 (substance real), O2-08 (3–2 concealed), O5-F01/F02 (**my peer-hash verification**), O3-01 (**my mtimes: +43.2 h retroactive permission**) |
| F03 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2, O5 — one numeric operation |
| F04 | `REJECTED_CLAIM` | **CORRECT** | `PARTIALLY_TRUE` | Rejection upheld (O2). **O5-F03 amends**: G14's `1.6907×` against the **same peer bytes on the same machine** is a valid unrefuted measurement, never reconciled with G16's `0.9293×`. The row's phrase *"quintetti rejected their … benchmark evidence"* buries a 1.8× unexplained swing |
| F05 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** | O2-15: all six candidate_h hashes verify. `SUBJECT.json` `feature_credit: 0` |
| F06 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O2-15: imports only parse-that core + local siblings; no scanner/CST path |
| F07 | `REJECTED_CLAIM` | **CONFIRM, strengthened** | `MACHINE_FACT` | O2-13 + **my `find`: 17 files, 0 review/skeptic/synthesis files**; no `foundation_g4_skeptic_*` or `_synth_*` author in any of the 3,283 envelopes. Not partial — **entirely absent** |
| F08 | `REJECTED_CLAIM` | **CONFIRM, strengthened to DISPROVED** | `MACHINE_FACT` | O2-14: candidate mtimes 21:15:58 → holdout `cases.json` 21:25:32; plaintext JSON; **zero** custody artefacts repo-wide under `prototypes/`. The handoff already concedes *"revealed regression suite, not proven blind"* |
| F09 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** | O2-16 executable replay: 25/25 × 3 seats, digest `9df7e683…4679bd` reproduced. It measures self-consistency of a revealed suite |
| F10 | `ACCEPTED_FACT` (exact subject) | **DOWNGRADE** | `OPEN` | **No seat replayed it.** O2 `UNVERIFIABLE`, O4 `UNVERIFIED for G4`, O5 `RESEARCH_ONLY`. The handoff label earns **no audit credit** |
| F11 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O2, O5: `consumeNumber.skip(string("%")).map(…)`, 7 lines over a byte-identical accepted `numeric.ts` |
| F12 | `REJECTED_CLAIM` | **CORRECT** | `PARTIALLY_TRUE` — **materially incomplete** | Rejection upheld (O2: both attempts `FAIL`). **O5-F04 amends in both directions**: "beats public peers" is a specialized-leaf-vs-dispatcher artifact, and the row **omits a 21.1 % loss to the operation-equivalent live kernel** that was measured once in `benchmark-v2-first-attempt.json` and then dropped from v3, G2, every review, `FINDINGS.md` and both handoffs |
| F13 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-18 executable replay of the exact frozen H/B/S bytes: `1px\` at EOF, `1px\`+LF/CRLF/FF, raw NUL — no candidate is correct. B's defect is `candidates/b/index.ts:31` |
| F14 | `OPEN` | **CONFIRM — remains open** | `OPEN` | O2: repair direction sound; needs fresh independent candidates |
| F15 | `REJECTED_CLAIM` | **CONFIRM, with an unbooked fact** | `MACHINE_FACT` | O2: no keyframe cell under `cells/`. **O4-10 adds**: a keyframe parser **does** exist at `mirror/grammar/keyframe-selector.ts` (pre-reset) and reproduces all three live spec defects verbatim — **booked nowhere in the subject** |
| F16 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2, O5: quarantined tree, not imported by any candidate |

### G. State, hostility, evidence, and benchmark findings

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| G01 | `ACCEPTED_FACT` | **CONFIRM as law; VIOLATED LIVE** | `MACHINE_FACT` + **BLOCKER** | **My execution of R1** against `dist/subpaths/css.js`. O2-28 confirms the law holds for the *accepted operation only* (200,000-call fuzz, 0 throws) |
| G02 | `REJECTED_CLAIM` | **CONFIRM, demonstrated** | `MACHINE_FACT` | O2-09: every hash verified **and** the packet still shipped four arithmetically false descriptives. O5-F11: 44 seats reproduced every SHA-256 and missed all three decisive defects |
| G03 | `REJECTED_CLAIM` | **CONFIRM, live instance** | `MACHINE_FACT` | O2-06 (`authorship_receipt.statement` is exactly this shape). **O4-10 + my execution**: two `liveOk: true` receipts in `equivalence-results.json` that are **false against the module the harness names `live`** |
| G04 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-06: G16's `escrow.frozen_candidate_set_sha256` is **`null`** — the declared reveal gate was never armed; G4 satisfies none of the four conditions |
| G05 | `REJECTED_CLAIM` | **CONFIRM; largely honoured** | `MACHINE_FACT` + required extension | O2, O5: both quintets, both failed benchmark attempts, the erratum and both rejected denominator generations are retained. **O5 extension needed**: a *lane* was dropped even though the *attempt* was retained (F04) — the law constrains erasure, not omission |
| G06 | `REJECTED_CLAIM` | **CORRECT** | `PARTIALLY_TRUE` | Letter met (G16 resolves and executes the pinned module), **spirit defeated**: a byte-exact copy of the **wrong revision** evades the rule entirely. **My verification**: `git show 9aedfc50^:src/parsing/utils.ts` = the timed peer, hash-for-hash. Extend to *"the peer is the fastest retained implementation, established by history search"* |
| G07 | `REJECTED_CLAIM` | **CONFIRM — and violated by the accepted feature** | `MACHINE_FACT` | O5-F01: the peer lane pays `source.slice` + `/[eE]/.test` + an object literal that the candidate never pays. `benchmark-manifest.json` **declares** the asymmetry; `reviews/skeptic-4.md:124` names the hazard in prose and measures nothing |
| G08 | `REJECTED_CLAIM` | **CONFIRM — and violated in the handoff summary** | `MACHINE_FACT` | O5-F04/F12: "2.5× the live public parser" and "all four beat LIVE regex" are dispatcher comparisons promoted to peer wins |
| G09 | `REJECTED_CLAIM` | **CONFIRM as law; violated on disk** | `MACHINE_FACT` | O5-F08: `parser-proof/bench-results.json` declares `bytes: 12748` for a corpus whose UTF-8 length is **12,821** (UTF-16 code units = 12,748). 0.57 %, no verdict impact. **V·π's own benches are clean** |
| G10 | `ACCEPTED_FACT` | **CONFIRM as law; the cited witness is unreplayed** | `MACHINE_FACT` (law) + `OPEN` (the G4 witness) | O4 produced a fresh 3-engine witness and it was decisive on E13/E14. **New constraint (O4)**: Firefox 150.0.2 implements none of the arm and is **not a valid oracle** for this feature |
| G11 | `RESEARCH_ONLY` | **CONFIRM, with mandatory re-scope** | `RESEARCH_ONLY` | O2-26 reproduced it and **re-scoped it correctly**: `any()`, `all()`/`fuseAll()` and `skip()` all restore offset only — it is a **library-wide convention**, not a `.skip` defect, and `ParserState.save()/restore()` (a full transaction) exists unused. O2-27: the accepted test's name *"fails transactionally"* over-claims under exactly the composition the next feature needs |
| G12 | `ACCEPTED_FACT` (exact subject) | **CONFIRM** | `MACHINE_FACT` | O2-28: 10⁶-digit input in 1.76 ms; 200,000-call fuzz 0 throws / 0 bad offsets. Does not generalize |
| G13 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O2-28, O5: exactly two `Parser` instances constructed for the whole module; `id` stable over 100,000 parses |

### H. Denominator and corpus analysis

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| H01 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** | O4-07 fully re-derived it: commit → tree `75bf19c0…`, 3,608 entries, 168/168 dirs, 0 path disagreements, 0 blob-OID mismatches, all 168 sources fetched and hash-verified |
| H02 | `REJECTED_CLAIM` | **CONFIRM, strengthened to FALSIFIED** | `MACHINE_FACT` | O4-07: the seed omits **~450 obligations (~34 %)**, including `css-mixins-1` — whose `@function` **the frozen 52-export surface already parses** (`src/css/stylesheet.ts:599,676`) and three of whose exports keyframes.js imports. The compatibility ring is **not a subset** of the proposed language ring |
| H03 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O4-07: a recognition-obligation census is explicitly not an operation closure |
| H04 | `ACCEPTED_FACT` | **CANNOT CONFIRM** | `OPEN` | O4 `UNVERIFIED`; no other seat probed V3's routing internals. No audit credit |
| H05 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-23, O5-F11, **my `ls`**: v2 = 69,589,449 B, v3 = 69,590,643 B, payloads byte-equal, both carry `*-rejection.json`; `denominator/` = 244 MB; all 8 generations `ZERO_CREDIT` |
| H06 | `RESEARCH_ONLY` | **CONFIRM** | `RESEARCH_ONLY` | O4, O5: plausible; 255 MB is not the proof of it |
| H07 | `REJECTED_CLAIM` | **CONFIRM, demonstrated** | `MACHINE_FACT` | O4-07 produced 883 / 1,333 / 304 in one session with no bespoke tooling. O5: the analyzer consumed ~11 h of a 19.5 h window |
| H08 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O4: bijection absent; O4's own count is stated as a lower bound with named biases |

### I. Process and convergence

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| I01 | `ACCEPTED_FACT` | **CONFIRM, materially understated** | `MACHINE_FACT` | The row says ">1,100 files". The frozen receiving subject is **2,324 files / 354,220,932 bytes** against 17 lines. O2-22: 632,537 : 1 by bytes, ~2,137 : 1 by LOC. O5-F11: 17,916 : 1 on the tightest authored denominator |
| I02 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O2-24, O5-F11: 33–40 generations, 1 acceptance (2.9 % per generation, 20 % per attempted feature) |
| I03 | `REJECTED_CLAIM` | **CONFIRM the rejection; FLAG the abuse** | `MACHINE_FACT` | The law binds (PI 006, unretracted). **O1-03 flag**: the same law was invoked unilaterally to declare a **live owner goal clause** "stale", 33 seconds before the owner's rebuke |
| I04 | `REJECTED_CLAIM` | **CORRECT** | `PARTIALLY_TRUE` — the rejection stands; the row's **replacement definition does not** | The rejection of per-constant 3×5×3 is right. But "smallest **coherent** independent operation" is **not the owner's word** and rests on a citation that does not exist (**my grep: `coherent` appears 0× in `ADDENDA-07`**). O5-F12/F13 argue the correct unit is the **vertical**. See §6.3 |
| I05 | `ACCEPTED_FACT` | **CONFIRM** | `ADMITTED_JUDGMENT` | O2, O5 concur; O5-F13 makes it concrete and costed |
| I06 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O5: the analyzer was never the critical path; O4 demonstrated it by not using one |
| I07 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` | O1 (root's own self-accounting: 79 formation documents / 22,741 lines vs **zero** parser TS files in the active tree at that moment), O2, O5-F14 |
| I08 | `REJECTED_CLAIM` | **CONFIRM as to the goal; a distinct problem is real** | `MACHINE_FACT` (goal) + `OPEN` (close condition) | O3: the goal is unretracted. **O5-F09/F14 raise a different thing**: `HANDOFF §13`'s *"strictly faster on every genuinely comparable retained peer lane"* is **unsatisfiable as written** — every operation-equivalent measurement in the record runs against the replacement. That is a close-condition amendment, **not** a narrowing of the goal. Owner ruling required |

### J. Addenda and cross-repository

| ID | handoff | verdict | final disposition | basis |
|---|---|---|---|---|
| J01 | `ACCEPTED_FACT` | **CORRECT** | `OPEN` | O3-05: dispositioned "active" **wholesale** by both tables while carrying three clauses the live continuation contradicts (Phase-A "unchanged" vs the demotion of `PI.md`; the owner's no-contact lift vs `HANDOFF §10`; the unretracted SUPERSEDED-BY-CONSUMPTION extension) — and **my census confirms it prints no status line at all**, in a packet whose rule is "authority only at the status printed on each" |
| J02 | `REJECTED_CLAIM` | **CONFIRM, with carve-out** | `REJECTED` + `OPEN` carve-out | Self-declares `PROPOSED · NOT RATIFIED` (my census). **O3-03 carve-out**: `CHARTER`'s live close conditions (Gate 2, PB0, PB13P) are **defined only inside this rejected document**, and `ADDENDA-07 §0` misclassifies PB0 — which contains no scanner — as scanner/CST design |
| J03 | `REJECTED_CLAIM` | **CONFIRM** | `REJECTED` | My census: all three self-declare `NO NEW SEMANTIC CODE AUTHORIZED` |
| J04 | `REJECTED_CLAIM` | **CONFIRM nominally; OPEN operationally** | `REJECTED` + `OPEN` | O3-15: **R13–R33 — twenty-one exact spec corrections from three E-3 formations and six audits — are named in no live document.** An R-number census over the live set returns only R1, R5, R12. `ADDENDA-04 §2`'s R19 is an exact normative grammar with an 11-row fixture table; `FINDINGS E09` preserves one clause of it |
| J05 | `REJECTED_CLAIM` | **CONFIRM, with caveat** | `REJECTED` | Self-declares `PROPOSED · NOT RATIFIED`; `ADDENDA-07 §6` retires the lifecycle. **Caveat (O3-04/05)**: `ADDENDA-06`'s OC-1A/B rows are the only surviving trace of the **OC-1 owner decision**, which has fallen out of every live document |
| J06 | `ACCEPTED_FACT` | **CONFIRM — and INSUFFICIENT** | `MACHINE_FACT` — **true-but-worthless** as a guarantee | O3: `ADDENDA-07:290-309` does carry them. **O5**: not one of them constrains **peer selection** or **lane symmetry** — the false strict win was produced in full compliance with all of them |
| J07 | `ACCEPTED_FACT` | **REJECT as to "owner-ratified"; CONFIRM the substance** | split: `MACHINE_FACT` (architecture) + `REJECTED` (ratification) | O1-06, O3-02, **my header census**. `ADDENDA-07`'s claimed *"one hostile protocol challenge"* has **no artifact anywhere in 2,324 files** (O3-02) |
| J08 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3: all eleven Glass delegations say no Value action; both `§D` preconditions unmet. **Two defects booked**: O3-13 (the §10 summary flattens two **conditional grants** into a flat denial and drops three §D rows) and O3-14 (the anchor is an **uncommitted working-tree hash** on a file already caught moving, called "frozen") |
| J09 | `REJECTED_CLAIM` | **CONFIRM** | `MACHINE_FACT` | O3: owner phase marks 022/023 verbatim |
| J10 | `ACCEPTED_FACT` | **CONFIRM** | `MACHINE_FACT` — **true-but-worthless** as progress | O3: the receipt corpus records without acting; no Value byte moved |

### K. Open completion obligations (1–10)

All ten are **OPEN**. No seat found any of them closed; several are now measurably further
from closure than the handoff implies.

| # | obligation | disposition | audited note |
|---|---|---|---|
| K1 | Freeze and independently challenge the exact denominator | `OPEN` | 9 analyzer generations → **zero sealed rows**. O4-07 shows the real magnitude: 883 (seed) / 1,333 (full) / 304 (value-scoped). The seed itself is **falsified** (H02) |
| K2 | Accept the direct token/source foundation incl. preprocessing and offset mapping | `OPEN` | Foundation G4 has **zero of 5 reviews and 0 of 3 syntheses** (F07), a disproved-blind holdout (F08), and **zero external performance evidence by its own declaration** (O5-F10) |
| K3 | Accept value-unit, substitution, typed math, function-body, generic component-value | `OPEN` | One numeric operation accepted; percentage withheld; dimensions rejected on reproduced counterexamples. **O2-27/G11**: the very next composition (`consumeNumber.skip(string("%"))`) sits on the one engine behaviour the tranche flagged unresolved |
| K4 | Accept color / images / transforms / easing / selectors / conditions / declarations / at-rules / recovery / stylesheet roots | `OPEN` | Not started. `FEATURE-LEDGER §1`: 15 module families, **all RED** |
| K5 | Make every claimed family reachable through the adjudicated DAG | `OPEN` | **O4-09: ≥6 of the 19 frozen runtime exports have no owner node in the ACKed DAG**, and the DAG self-contradicts on `timeline-range`'s home |
| K6 | Explicit grammar-shaped results, diagnostics, source preservation, serialization | `OPEN` | Not started |
| K7 | Build the 52-export / 37-consumer compatibility layer | `OPEN` — **RE-SIZED and COLLIDING** | O4-06: the real obligation is **63 symbols over 6 doors**, and `/css`'s own return types (`ParseResult<CssValue>` etc.) are exported only from `/value`. O3-06: it **collides with the unretracted SUPERSEDED-BY-CONSUMPTION letter** telling an external fleet not to build it |
| K8 | Complete spec/live/browser/WPT differentials, no-throw/fuzz, hostile limits, round trips, integrated benches | `OPEN` | The one existing differential (P-1) is 35.2 % `OUT_OF_SCOPE` and carries two false receipts (O4-10, reproduced by me). No WPT classification exists |
| K9 | Write `PI-CLOSE.md` only after every charter rail is proven | `OPEN` — **and its precondition is contested** | O3-08: `V/megatranche/SCOPE.md` M-9 would fold π into the megatranche, which would make `PI-CLOSE.md` moot. See §6.1 |
| K10 | Leave production replacement, wiring, release and ship to the megatranche | `OPEN` — **respected so far** | O3: no Value byte moved; J10 confirmed. This is the one obligation the tranche has honoured cleanly |

---

## §6. Unresolved disagreements — preserved, not adjudicated away

### §6.1 The prototype-versus-megatranche boundary (A01, K9)

- **Position A (O1, and the frozen subject):** V·π develops and proves a prototype; the
  megatranche performs production replacement. Owner PI 001 *"not execution of the tranche
  itself, per se"*; the thread objective *"without production execution"*;
  `CHARTER.md:8-10`; `HANDOFF-2026-07-24.md:415-420`.
- **Position B (O3-08):** `docs/tranches/V/megatranche/SCOPE.md:22` M-9 — *"the V·π parser
  program folds INTO this mega-tranche as live prototyping work … **not as a closed
  mini-tranche**"* — authored ~20 minutes after the handoff, citing the receiving audit
  root, with neither document citing the other.
- **My note, which neither seat could supply:** SCOPE.md is **outside the frozen subject**
  (`AUDIT-SUBJECT.json` binds `docs/tranches/V/apotheosis/pi` only), untracked, moving, and
  agent-authored; O3 could not locate source prompts for its M-marks; and it declares *"No
  new tranche letter is opened"* three minutes before `docs/tranches/W/` appeared.
- **What would settle it:** an owner transcript receipt for SCOPE.md's M-9 (and M-2), or a
  direct owner ruling. **Nothing in the frozen subject can settle it, and no ADDENDA-09
  clause should be built on SCOPE.md's bytes without that receipt.**

### §6.2 A06 — did the owner narrow "any material defects"? (O1 vs O3)

- **Position A (O1-04):** the row is **REJECTED as stated**. Owner FORM 016 said *"**Any
  material defects** should result in addenda. Mark me."* The row states the narrowed
  successor rule ("material scope/ownership/result/comparator changes") and attributes it
  to owner steering.
- **Position B (O3):** `MACHINE_FACT` **for the rule**, on the strength of the E-3 text at
  root-transcript L967 — with O3 itself noting that the rule's own process was never
  applied to `ADDENDA-07`/`08`.
- **Why it is not resolvable here:** O1's citation is inside the frozen archive; O3's is
  outside it (a Claude Code transcript), and the two texts address different subjects
  (defects vs. dispatch shape). Neither refutes the other.
- **What would settle it:** an owner ruling on whether ordinary code defects still require
  addenda. **Until then the owner's literal word governs and `HANDOFF §3` law 11 must carry
  a marker that it is a derived rule.**

### §6.3 The 3×5×3 unit (I04, A05) — leaf, "coherent feature", or vertical?

- **The owner said** *"no less than 3 orthogonally begat prototypes **per feature**"* and
  **never defined "feature"**.
- **Position A (`ADDENDA-07 §2`):** the *smallest independently specifiable* grammar
  operation — granularity-minimizing.
- **Position B (`ADDENDA-08`, `HANDOFF`, `FINDINGS I04`):** the "coherent feature
  operation" — **on a citation that does not exist** (my grep). Granularity-loosening,
  unsourced.
- **Position C (O5-F12/F13):** the **vertical** (value-unit entire, color entire), with
  8 seats replacing 44 and the adversary moved from prose to machine.
- **The measured cost of Position A:** one feature consumed ≥4 full quintetto rounds, 37
  skeptic seats where 5 are prescribed, on 17 lines — and caught none of the three
  blockers. O5's coverage-rail extrapolation is ~2.0 years at 8 h/day.
- **What would settle it:** an **owner ruling on the unit**. `ADDENDA-08 §2.1(2)` already
  concedes that any regrouping "is a new owner/addendum decision, not a handoff
  interpretation". It has not been made.

### §6.4 Does `APOTHEOSIS_ACCEPTED` survive? (O2 vs O5 vs O3)

- **O2:** the substance survives; the label does not. Fix by mandatory caveat propagation.
- **O5:** correctness and architecture credit survives; **strike the performance clause by
  addendum**, retain the feature, re-run once against a corrected peer set.
- **O3:** the acceptance is **procedurally void** — it violated `ADDENDA-07 §2` and the
  permission is retroactive, unratified and undeclared. *"There is no third reading."*
- **My reconciliation reaches §2.3 but not past it:** O2 and O5 are reconcilable (the code
  stands, the performance clause falls). **O3's objection is orthogonal and cannot be
  reconciled by evidence** — it is a question of who may repeal a governing clause.
- **What would settle it:** either an owner/`ADDENDA-09` ruling that `ADDENDA-07 §2`'s
  pre-freeze bar is repealed (and from when), or a ruling that the acceptance is void and
  must be re-granted after ledger freeze. **The one thing not available is silence**, since
  `HANDOFF:19` currently instructs readers to apply an "08 supersession" that `08` does not
  define.

### §6.5 The live BBNF no-contact state (`HANDOFF §10`, `AUDIT-BRIEF §1.4`)

- **Position A (O1-08):** owner precedence is inverted. PI 001 (*"Coordinate with…"*) and
  PI 005 (*"communicate … as you need"*) are later and unconditional; the 07-20 seal is
  earlier. The BBNF root refused contact **after** both reopenings, citing an
  **agent-maintained goal string**.
- **Position B (`HANDOFF §10`, and O3-12's narrower objection):** a current no-contact
  boundary exists — though O3-12 shows it is derived from an **untracked,
  uncontent-addressed** BBNF file (`shasum 109bedae…`, recorded in no Value document), in
  violation of the same handoff's rule that an unacknowledged current file is not authority.
- **Both seats agree** the "current state" claim is unsupported; they differ on whether the
  defect is *precedence* or *provenance*.
- **What would settle it:** one owner sentence. **Note the operational consequence:**
  `AUDIT-BRIEF §1.4` instructed this entire receiving audit not to send a coordination
  message, on the strength of that unsupported claim.

### §6.6 The undischarged 37.9 % of the envelope corpus

- **My ruling (§2.1)** settles the *facts* and creates an *obligation*: **1,243 readable
  subagent final answers, 2,966,550 characters, 721 distinct authors, were never read by
  any seat.** O1 proved they were readable and read three. O2, O3 and O5 classified them
  unreadable and read none. The coverage ledger classified them correctly and, by its own
  rules, adjudicated none.
- **`AUDIT-BRIEF §4`'s finding-totality gate is therefore NOT closed.** It is closed for
  the 2,040 encrypted rows and open for the 1,243 plaintext ones.
- **What would settle it:** a bounded sweep of the 1,243 `FINAL_ANSWER` payloads for
  material claims — cheap, mechanical, and the single highest-value unspent audit action
  available. It contains at least one verdict (`/root/constellation_census`:
  *"Model-truth gate: RED / UNPROVEN"*) rendered against these very sessions.

---

## §7. Continuation order this axis authorizes

Ordered. Each item is authorized by findings above; none authorizes production,
package, consumer or megatranche action.

1. **Correct the four false receipts before anything else is built on them.** Fix
   `equivalence-results.json` rows 104/213 (`liveOk` → false) and re-derive the gate;
   replace `"FIVE_OF_FIVE_ACCEPT"` with the true two-round record; strike `"peer"` and
   `PASS_STRICT_WIN` from `g16/acceptance.json` pending a symmetric re-run; strike
   `Status: OWNER-RATIFIED` from `ADDENDA-07.md:3` and every restatement.
2. **Fix R1.** `src/css/grammar.ts:181` — one false non-null assertion, two defect classes
   (the shipping `TypeError` **and** the comma-to-space normalisation behind E03/E09/E10).
   It is a live crash on a user-typed path in a published 4.0.0, it is row E01/G01's own
   counterexample, and it is the tranche's strongest correctness justification.
3. **Sweep the 1,243 readable `FINAL_ANSWER` envelopes** and close the finding-totality
   gate (§6.6). Amend `AUDIT-BRIEF §4` to scope `ENCRYPTED_UNMATERIALIZED` to
   `Message Type: MESSAGE` only.
4. **Put the six §6 disagreements to the owner as a single numbered ask** — π/megatranche
   boundary, A06's addenda trigger, the 3×5×3 unit, the standing of
   `APOTHEOSIS_ACCEPTED`, the BBNF contact state, and OC-1 / `HANDOFF §13`'s speed rail.
   Do not let `ADDENDA-09` decide any of them by drafting.
5. **Split `HANDOFF §3` into `§3a Owner speech` (verbatim + prompt ID + timestamp) and
   `§3b Derived operating rules`.** Restore the three dropped owner laws (clean-break /
   no-shim, agent orchestration, maximal parallelism). A merged list is the mechanism by
   which items 8, 9 and 12 of §3 stayed invisible.
6. **Fix the peer set by addendum before the next benchmark**: operation-equivalent live
   extraction + **fastest retained predecessor established by `git log -S`** + previous
   accepted generation; hard lane symmetry; a peer that once lost may never be dropped
   without an addendum naming it. Without this, F02 and F04 recur by construction.
7. **Consolidate R1–R33 into `FEATURE-LEDGER` as fixture rows** (O3-15), and book the
   unowned `mirror/grammar/keyframe-selector.ts` defects (O4-10/F15).
8. **Then, and only then, resume grammar work** — at whatever unit the owner rules in
   item 4, starting from the foundation vertical, with the differential oracle (spec × live
   × browser CSSOM) as the primary adversary. That instrument found R1 and five real
   live-side defects; 44 prose seats found none of the three that mattered.

---

## §8. What the next value.js mega-tranche must own because of this

1. **The R1 fix and its three siblings ship from the megatranche, not from π.** π may prove
   them; only the megatranche may replace `src/css/grammar.ts:181` and
   `src/css/timeline.ts:16,23` in a released package. Four spec violations (E03/E09/E10/E11)
   share **one** mechanism — comma-to-space normalisation before component splitting — and
   must be fixed as one change, not four.
2. **The keyframe-selector public type is a breaking change and the megatranche owns it.**
   `src/css/types.ts:44` encodes 4 names and an optional offset in an **exported** type,
   making the defect unrepresentable-away. Correcting to seven names + mandatory unbounded
   named percentage changes the public surface. Under owner law A09 (no shims, no dual
   paths — verbatim ×6) there is no compatibility path; it is a clean break.
3. **The compatibility obligation is 63 symbols over 6 doors, not "52/37".** A mirror
   satisfying 52/37 still breaks 26 live keyframes.js imports. `/css`'s own return types
   live in `/value`, so the door is not type-closed. The megatranche inherits this, and
   must inherit it correctly stated.
4. **The megatranche must terminally dispose of the SUPERSEDED-BY-CONSUMPTION letter.** An
   unretracted, undelivered instruction currently tells an external fleet to stop building
   ~20 registry rows plus the entire CSS L4 surface against a 17-line delivery. Either
   retract it, bound it to π's one accepted vertical, or deliver it with the true state
   attached — before any consumer wiring begins.
5. **Inherit the speed posture honestly.** Every operation-equivalent measurement in the
   record runs against the replacement: engine gate 1.8×, percentage 21 %, neutralized leaf
   2.7 %, true predecessor 15 %. The megatranche's shipping justification is **correctness
   and architecture**, and it should say so in its charter rather than inherit an
   unsatisfiable speed rail.
6. **Do not inherit the process.** 2,324 files and 354 MB for 17 lines; 72.1 % of it a
   rejected analyzer's output re-emitted whole across eight generations. Whatever the owner
   rules on the 3×5×3 unit, the megatranche must carry a hard cap on
   generations-per-feature and a ban on whole-artifact re-emission, or it will reproduce
   this outcome at production scale.
7. **Commit the tranche.** `trackedFilesInHead: 0`, `entirelyUntracked: true`. 354 MB of
   evidence — including every finding in this audit — is one `git clean -fdx` from
   non-existence and has never been diff-reviewed. Fix that before the megatranche depends
   on any of it.

---

*S1 truth synthesis closed. No subject byte edited. No sibling synthesis read. Six
disagreements carried forward explicitly; none resolved by vote.*
