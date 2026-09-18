# V·π receiving audit — COVERAGE LEDGER summary (mechanical seat)

**Artifact:** `coverage.tsv` (6,451 rows + 1 header = 6,452 lines)
**Builder:** `build-coverage.mjs` (this directory) — re-runnable, deterministic
**Built at:** 2026-07-24, repo `value.js` HEAD `c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`
**coverage.tsv SHA-256:** `f8057b396ade2d0bc2d74962f4a29db71a6905614312ab7bb7e28bdfe9334214`
**build-coverage.mjs SHA-256:** `d894f30f9bfbffb8c35bea64dbe679deb7d6e27c8fc06ee5f88507e08ad3d177`

This is the **SKELETON** pass demanded by `AUDIT-BRIEF.md` §4. It establishes
*totality of accounting* — every accountable source unit has a row — using
**mechanical defaults only**. It contains **no adjudication**. The five
skeptics and three adjudicators refine the `disposition` column; this seat only
guarantees that nothing was silently omitted, and that every row's identity is
independently reproducible from the frozen bytes.

No subject byte was read for meaning and no subject byte was modified. Both
files written by this seat live under `formation/session-audit/receiving/`.

---

## 1. Counts by disposition

| disposition | rows | which source kinds |
|---|---:|---|
| `ENCRYPTED_UNMATERIALIZED` | 2,040 | envelopes only (all `Message Type: MESSAGE`) |
| `OPEN` | 3,915 | 125 FINDINGS rows + 2,862 root agent messages + 928 plaintext envelopes |
| `EXTERNAL` | 435 | 120 cross-thread-delegation prompts + 315 plaintext envelopes whose only resolvable file references lie outside the `value.js` repository |
| `MACHINE_FACT` | 61 | owner-authored prompt events (exact bytes reproduced) |
| `ADMITTED_JUDGMENT` | 0 | — reserved for skeptics |
| `REJECTED` | 0 | — reserved for skeptics |
| `RESEARCH_ONLY` | 0 | — reserved for skeptics |
| `FORMATION_ONLY` | 0 | — reserved for skeptics |
| `NO_FINDING` | 0 | — **no grouping and no `NO_FINDING` was used by this pass** (see §3) |
| **total** | **6,451** | |

### Counts by source kind

| source_kind | rows | denominator it must equal | check |
|---|---:|---|---|
| `FINDINGS_ROW` | 125 | 115 table IDs (`A01…J10`) + 10 §K obligations | ✅ |
| `PROMPT_EVENT` | 181 | 83 + 28 + 70 canonical prompt events | ✅ |
| `AGENT_MESSAGE` | 2,862 | 546 + 578 + 1,738 root assistant messages | ✅ |
| `AGENT_ENVELOPE` | 3,283 | `wc -l` of the three JSONL archives | ✅ |

---

## 2. The verification arithmetic (pasted verbatim)

### 2.1 Envelopes — every line accounted for

```
$ wc -l raw-agent-envelopes/*.jsonl
    1577 raw-agent-envelopes/bbnf-greenfield-coordination.jsonl
     886 raw-agent-envelopes/value-tranche-v-formation.jsonl
     820 raw-agent-envelopes/value-v-pi-refinement.jsonl
    3283 total

$ awk -F'\t' 'NR>1&&$1=="AGENT_ENVELOPE"' receiving/coverage.tsv | wc -l
    3283
$ awk -F'\t' 'NR>1&&$1=="AGENT_ENVELOPE"{print $2"|"$3}' receiving/coverage.tsv | sort -u | wc -l
    3283          # distinct (archive, line) pairs — no duplicate, no collapse
$ awk -F'\t' 'NR>1&&$1=="AGENT_ENVELOPE" && $4 ~ /^[0-9a-f]{64}$/' ... | wc -l
    3283          # every row carries a full source-line SHA-256
$ awk -F'\t' 'NR>1&&$1=="AGENT_ENVELOPE" && $5 != ""' ... | wc -l
    3283          # every row carries an author
```

Arithmetic: `1577 + 886 + 820 = 3283`; ledger envelope rows `= 3283`;
`3283 − 3283 = 0` unaccounted lines. Per-file maximum line index equals that
file's `wc -l` exactly (1577 / 886 / 820), so the indices are contiguous
`L1..LN` with no gaps and no overshoot. Zero blank lines were skipped; zero
lines failed JSON parsing.

### 2.2 Independent re-implementation cross-check

A second implementation in Python (different language, different hashing call
path) re-hashed all three archives and re-extracted `payload.author`, then
joined against `coverage.tsv`:

```
FINAL CROSS-CHECK: expected 3283 covered 3283 mismatch 0 missing 0 distinct authors 760
```

Every one of the 3,283 `sha256` values and all 3,283 `author` values in the
ledger were reproduced independently. 760 distinct subagent authors appear.

### 2.3 Prompts, messages, findings

```
$ grep -hc '^## [0-9]\{3\} — ' raw-prompts/*.md | paste -sd+ - | bc      -> 181
$ awk -F'\t' '$1=="PROMPT_EVENT"' receiving/coverage.tsv | wc -l          -> 181

$ grep -hc '^## [0-9]\{4\} — ' raw-agent-messages/*.md | paste -sd+ - | bc -> 2862
$ awk -F'\t' '$1=="AGENT_MESSAGE"' receiving/coverage.tsv | wc -l          -> 2862

$ grep -cE '^\| [A-J][0-9]{2} \|' FINDINGS.md                              -> 115
$ awk '/^## K\./,0' FINDINGS.md | grep -cE '^[0-9]+\. '                    -> 10
$ awk -F'\t' '$1=="FINDINGS_ROW"' receiving/coverage.tsv | wc -l           -> 125
```

`115 + 10 = 125`. The set of 115 table IDs extracted by `grep` and the set of
115 non-`K` IDs in the ledger are **byte-identical** (`diff` returned empty);
there are zero duplicate IDs.

Grand total: `125 + 181 + 2862 + 3283 = 6451` rows; `wc -l coverage.tsv = 6452`
(6,451 rows + 1 header). Every line has exactly 7 tab-separated fields.

### 2.4 Body-hash reproduction (a real verification, not a restatement)

For all 181 prompt events and all 2,862 root agent messages, this seat
re-extracted the fenced body from the archive and recomputed its SHA-256,
comparing against the archive's own declared `Body SHA-256`:

```
"bodyHashVerification": { "HASH_VERIFIED": 3043 }
```

**3,043 of 3,043 declared body hashes reproduce exactly**, and every declared
`UTF-8 bytes` field matches the recomputed byte length. The `sha256` column for
these rows is *this seat's own* recomputation, not a copy of the declared
value; the declared value's first 12 hex digits are carried in `note` so a
reader can see the two agree.

**Reader beware — a trap this seat fell into and fixed.** A first
implementation used `node:readline`, which treats **U+2028** as a line
terminator. The corpus contains 4 literal U+2028 characters inside owner prompt
bodies (`raw-prompts/bbnf-greenfield-coordination.md` prompts **#004** and
**#030**), and `readline` silently destroyed 4 bytes of each body, producing 2
spurious `HASH_MISMATCH` results. `build-coverage.mjs` now uses a byte-faithful
streaming splitter that splits on LF only. Any future seat that re-derives
these archives with `readline`, `.split(/\r?\n| /)`, or most JS
line-oriented tooling **will silently corrupt those two owner prompts**. This
is documented in the script header.

---

## 3. Exact grouping rules used

**Rule G0 — no grouping was applied at all.** `AUDIT-BRIEF.md` §4 permits
non-material progress chatter to be collapsed into an explicitly-ranged group
marked `NO_FINDING`. This seat **declined that permission**: all 2,862 root
assistant messages are enumerated individually, all 3,283 envelope lines are
enumerated individually, and the ledger contains **zero** `NO_FINDING` rows and
**zero** ranged rows. Deciding that a message is "non-material" is a judgment,
and this is the mechanical pass. Skeptics may collapse rows later; they cannot
un-collapse rows this seat destroyed, so nothing was collapsed.

**Rule G1 — one row per source unit, keyed for re-derivation.**
- `FINDINGS_ROW` → `line_or_index = L<file-line>#<ID>`; `sha256` = SHA-256 of
  the exact UTF-8 bytes of that markdown line.
- `PROMPT_EVENT` / `AGENT_MESSAGE` → `line_or_index = #<archive-index>@L<header-line>`;
  `sha256` = SHA-256 of the exact fenced body bytes.
- `AGENT_ENVELOPE` → `line_or_index = L<1-based-line>`; `sha256` = SHA-256 of
  the exact source line **without** its trailing newline (and without a
  trailing CR, of which there are none in this corpus).

**Rule G2 — §K obligation IDs are synthesized and labelled as such.**
`FINDINGS.md` §K contains 10 numbered completion obligations that carry no
author-assigned IDs. Omitting them would be a silent drop, so they are entered
as `K01..K10` and every such row's `note` begins
`section=K synthesized-id (source item is unnumbered-by-ID)`. **These ten IDs
do not exist in the subject** — do not quote them back at the handoff author as
if they did.

**Rule G3 — envelope disposition is decided by transport shape, never by
content.** The three archives split perfectly and mechanically:

| `Message Type` | encrypted block present | count | disposition |
|---|---|---:|---|
| `MESSAGE` | yes (1+ `encrypted_content`) | 2,040 | `ENCRYPTED_UNMATERIALIZED` |
| `FINAL_ANSWER` | no | 1,243 | `OPEN` or `EXTERNAL` |

`2040 + 1243 = 3283`. The correspondence is exact and exceptionless: **every**
`MESSAGE` envelope is encrypted, **every** `FINAL_ANSWER` envelope is
plaintext. For `MESSAGE` envelopes the `input_text` part is a 73–97-character
routing stub only (`Message Type: … / Task name: … / Sender: … / Payload:`);
the actual payload is opaque ciphertext (`gAAAAA…`). Those rows carry
`NOT_INFERRED` in `note`. **No content was guessed, summarized, or attributed
for any of the 2,040.**

**Rule G4 — materialized-counterpart detection (plaintext envelopes only).**
For each `FINAL_ANSWER` payload, absolute `/Users/mkbabb/…` paths were
extracted, stripped of trailing sentence punctuation, `:line`, `:line-range`,
`:line:col` citations and `#anchors`, then tested against (a) the frozen
subject ledger and (b) the live filesystem:

| counterpart verdict | envelopes | meaning |
|---|---:|---|
| `MATERIALIZED_IN_SUBJECT` | 263 | references a file present in `audit-subject-ledger.tsv` |
| `MATERIALIZED_ON_DISK` | 392 | references a file that exists but is outside the frozen subject |
| `NO_PATH_REFERENCE` | 558 | payload cites no absolute path |
| `COUNTERPART_MISSING` | 30 | every path it cites is absent from disk |

`263 + 392 + 558 + 30 = 1243`. ✅

**Rule G5 — `EXTERNAL` for plaintext envelopes is a path-prefix test, nothing
more.** 315 plaintext envelopes are marked `EXTERNAL` **solely** because every
file path they cite that actually resolves lies outside
`/Users/mkbabb/Programming/value.js/`. This is a routing hint for the skeptics,
not a finding about content, and it is reversible: the `note` records the first
resolved path.

**Rule G6 — prompt authorship follows the extractor's own classification**
(`extract-raw-prompts.mjs:41-45`), which is itself mechanical:

| classification | count | author column | disposition |
|---|---:|---|---|
| `direct-user-prompt` | 31 | `owner` | `MACHINE_FACT` |
| `user-prompt-with-ide-context` | 30 | `owner` | `MACHINE_FACT` |
| `cross-thread-delegation` | 120 | `cross-thread-delegate` | `EXTERNAL` |

`31 + 30 + 120 = 181`. `MACHINE_FACT` here asserts **exactly one thing**: that
these 61 rows are the exact owner-authored bytes, reproduced and hash-verified
from the archive. It asserts nothing about whether any statement inside a
prompt is true, and nothing about whether the tranche obeyed it.

Note for O1/O3: **two thirds of the "181 prompt events" are not owner
prompts.** They are `<codex_delegation>` envelopes injected from other Codex
threads. Any statement of the form "181 owner prompts" is false on these bytes;
the owner-authored figure is **61**.

**Rule G7 — claim-marker flag.** Each `AGENT_MESSAGE` row's `note` carries
`claim_markers=yes|no`, a pure case-insensitive regex hit over the body for
tokens such as GREEN / RED / ACCEPTED / REJECTED / RATIFIED / PASS / FAIL /
proof / benchmark / faster / ops/s / MB/s / × / verified / conformance /
holdout / skeptic / adjudicat. It is a triage grep for skeptics. **It is not a
materiality judgment and must never be read as one.**

---

## 4. Mechanical signals surfaced for the skeptics (NOT verdicts)

1. **30 plaintext envelopes cite only files that do not exist.** All 30 are
   from `value-tranche-v-formation` and cite pre-reformation V-tranche
   paths. Most are explained by recorded moves — `docs/tranches/V/V.md` was
   deleted in commit `172794fd` ("V.md→V-PRIME authority swap"), and
   `docs/tranches/V/waves/W17.md` now lives at
   `docs/tranches/V/archive/waves/W17.md`. **However, six cited documents exist
   nowhere under `docs/` at this HEAD**: `PALETTE-DOMAIN.md`,
   `PALETTE-WIRE-CONTRACT.md`, `PALETTE-FACILITIES.md`,
   `PALETTE-OPERATIONS-REPLAY-CONTRACT.md`, `LEGACY-PALETTE-SOURCE-CONTRACT.md`,
   `PALETTE-EXPORT-CONTRACT.md`. That is a *declared-capture-missing* candidate
   and is left `OPEN`. It is **outside** the V·π subject tree (it belongs to the
   2026-07-15 V-formation session) and may reflect legitimate consolidation into
   `docs/tranches/V/PALETTE-CONTRACT.md`. This seat did not adjudicate it.
2. **62% of the envelope corpus is unreadable.** 2,040 of 3,283 subagent
   envelopes (62.1%) are encrypted with no plaintext counterpart in the
   envelope. Whatever those subagents actually reported cannot be audited from
   these archives.
3. **760 distinct subagent authors** appear across the three sessions
   (336 + 114 + 310 per archive, before de-duplication across archives),
   against 61 owner prompts.
4. **Two owner prompts contain U+2028** and are silently corruptible by
   standard JS line tooling (§2.4).

---

## 5. What a reader may NOT conclude from this ledger

This section is binding on anyone citing `coverage.tsv`.

1. **`OPEN` is not a finding, and it is not innocence.** 3,915 rows are `OPEN`.
   That means *no seat has adjudicated them yet*. It does not mean they are
   true, false, material, immaterial, benign, or suspicious.
2. **`MACHINE_FACT` on a prompt certifies bytes, not content.** It means "these
   are exactly the owner's bytes, and their hash reproduces." It does **not**
   mean the prompt was obeyed, that its claims are true, or that any downstream
   summary of it is faithful.
3. **`ENCRYPTED_UNMATERIALIZED` is an admission of ignorance, not a clearance.**
   For all 2,040 such rows this seat established only: the line exists, its hash
   is X, its author is Y, its declared message type is `MESSAGE`, and its
   payload is ciphertext. **Nothing about what those 2,040 subagents said,
   found, claimed, measured, or fabricated is established by this ledger.** No
   count of them may be cited as evidence of work performed, of agents run, of
   reviews conducted, or of findings produced. An envelope is a transport
   record; it is not evidence that its payload was ever correct, ever read, or
   ever acted upon.
4. **`EXTERNAL` is a path-prefix routing label** (Rule G5/G6), not a ruling that
   the row is out of scope, not an acknowledgement, and not an external receipt.
5. **Coverage ≠ verification.** That 6,451 rows exist proves only that the
   accounting denominator is closed. **Zero** claims in `FINDINGS.md`, zero
   benchmarks, zero status labels, zero "ACCEPTED_FACT"/"REJECTED_CLAIM"
   dispositions, and zero architectural assertions were verified by this seat.
   The `provisional=` values echoed in `FINDINGS_ROW` notes are the *handoff
   author's own labels*, transcribed for convenience, and carry **no** audit
   credit.
6. **Row count is not progress.** 3,283 envelopes and 2,862 messages measure
   *volume of process*, which the brief itself names as a close-class lie
   ("artifact volume posing as progress"). This ledger must never be cited as
   evidence that the parser advanced.
7. **`MATERIALIZED_IN_SUBJECT` / `MATERIALIZED_ON_DISK` mean a path resolves.**
   They do **not** mean the file's contents support the claim that referenced
   it, that the file is what the message says it is, or that it was authored
   when claimed.
8. **`COUNTERPART_MISSING` is not proof of fabrication.** A file may have been
   renamed, archived, or deleted after the message was written; §4.1 shows most
   of the 30 were. It marks a place to look.
9. **The ledger's completeness is bounded by its inputs.** It accounts for the
   three frozen archives only. It cannot detect a prompt, message, or subagent
   turn that never reached those archives, and it cannot detect anything the
   upstream extractor dropped. Notably, `extract-raw-prompts.mjs` deliberately
   **excludes** `response_item/message/user` envelopes and any
   non-`event_msg/user_message` record; whether that exclusion silently lost a
   steering instruction is an **open question this ledger cannot answer** and
   which O1 must resolve against the 126 MB rollouts themselves.
10. **The §K rows `K01..K10` are this seat's synthesized IDs** (Rule G2), not
    identifiers that exist in `FINDINGS.md`.
11. **Nothing here grants execution authority.** Per `AUDIT-BRIEF.md` §6, a
    closed coverage ledger is a precondition for resuming parser development,
    not a substitute for the five skeptic reports, the three synthesis reports,
    or `ADDENDA-09`.

---

## 6. Reproduction

```
$ cd /Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/formation/session-audit/receiving
$ node build-coverage.mjs      # rewrites coverage.tsv, prints the count report as JSON
```

The builder is pure: it opens the subject read-only, streams every input
(no file is slurped), and writes only `coverage.tsv` in this directory. Running
it twice produces byte-identical output.
