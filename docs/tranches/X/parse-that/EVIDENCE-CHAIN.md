SERVED MODEL: claude-opus-5[1m]

# X·P — EVIDENCE CHAIN AND ROUTING DECLARATION

**Authored by**: unit `X.P.W0.d` (Opus 5 implementation seat, M-23 §2), 2026-09-17, at
`cwd = /Users/mkbabb/Programming/value.js`, darwin arm64, node v26.0.0.
**Spec of record**: `docs/tranches/X/parse-that/waves/W0.md` §3.7 · §3.8 · §5 `X.P.W0.d` ·
§6 **G-6** · §6 **G-8** (and it collates §6 **G-7**, whose seven-row table lives in this wave's
execution record, `docs/tranches/X/execution/D/X-P-W0.md` → `### X.P.W0.d`).
**Lane authority**: `docs/tranches/V/megatranche/coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md`
(sha256 `ced234406d3d9ad6bb13e4dce92452a596c9af55dd2091fd90a83f02502f20f7`, re-derived by unit `.a`).

This file exists so that **no seat's output can be lost to a session wall**, and so that **PLAW-BIND
is checkable from this end** and not only from `COHESION.md`'s. It is a live operating document for
the X·P lane: W1..W4 read it at open and re-state §2's cadence against their own run.

---

## §1 The lane's workflow and its journal

| field                                                | value                                                                                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **workflow id (runId)**                              | `wf_c431fb2c-82d`                                                                                                                                          |
| **phase label**                                      | `X.P.W0` (every seat's `started` row carries it)                                                                                                           |
| **journal path, as the form**                        | `<session>/subagents/workflows/<runId>/journal.jsonl`                                                                                                      |
| **journal path, resolved 2026-09-17**                | `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/subagents/workflows/wf_c431fb2c-82d/journal.jsonl` |
| **session root**                                     | the harvester's `CLAUDE_SESSION_DIR`, defaulting to the path above minus `/subagents/workflows/<runId>/journal.jsonl`                                      |
| **harvester**                                        | `docs/tranches/V/megatranche/workflows/harvest-journals.mjs` (5,445 B, unmodified — §4's row is _execute, no write to itself_)                             |
| **this lane's harvest**                              | `docs/tranches/V/megatranche/registry/harvest/x-p-w0.json`                                                                                                 |
| **prior parser-band harvest (kept, not superseded)** | `docs/tranches/V/megatranche/registry/harvest/parser-band.json`                                                                                            |

The journal is the **only** surviving record of a completed seat: workflow results reach the root as
task notifications that are **truncated**, and a session wall can kill a fan-out after its seats have
already been paid for. A later X·P seat that wants a returned seat's full text reads the journal, not
the notification.

## §2 L-13 — the cadence, stated as law for this lane

1. **Harvest after every workflow completion or kill, and before any re-deploy.** Not at the end of
   the wave; not at the end of the session. A kill is as much a trigger as a completion, because a
   killed run is exactly the case where the notification carries least and the journal carries most.
2. **A re-deploy is `resumeFromRunId`, never a fresh invocation.** A fresh invocation mints a new
   `runId`, hence a new journal, and the completed seats of the old run are re-paid for and re-run —
   which is not only waste but a source of drift between two runs of the "same" audit. Resuming
   keeps one journal and one harvest file per lane-wave.
3. **The harvest is idempotent.** Re-harvesting the same journal rewrites the same bytes, so running
   it more often than required costs nothing and losing a run costs everything. When in doubt, run it.
4. **L-13's corollary — a summary is not a result.** A workflow summary reporting seats with **zero**
   journal rows harvested is a **failed run**, not a green one: `componentsRun: N` with every row
   `NO_JURY` is the exact shape a rate wall manufactures, and it reads as a clean component unless the
   count is asserted. **The count is the assertion** (`W0.md` §6 G-6 falsifier).
5. **Why this lane cannot manufacture that false negative.** Under the owner's **≤4-concurrent-workflow
   cap** (2026-07-24; `EXECUTION-RUNBOOK.md` §5.1) X·P never fans out wide enough to meet a rate wall
   with a jury-shaped roster. This wave's peak concurrency was **2** (`.a` ∥ `.b`). The cap is a
   protection, not a throughput limit to be worked around.

## §3 The dispatch roster, and the harvest arithmetic stated rather than implied

Read from the journal's `started` and `result` rows (⟨cmd⟩ `node -e` over `journal.jsonl`), so a
later reader can re-derive the count instead of trusting it:

| seat label                                       | agentId             | model | `started` | `result`                | harvested |
| ------------------------------------------------ | ------------------- | ----- | --------- | ----------------------- | --------- |
| `X.P.W0:open` (the wave-open record + unit plan) | `aa1463c0583fa72bc` | opus  | yes       | **yes**                 | yes       |
| `X.P.W0:X.P.W0.a`                                | `a0db657d46d167768` | opus  | yes       | **yes** (`DONE`)        | yes       |
| `X.P.W0:X.P.W0.b`                                | `aa528852d0211f3f9` | opus  | yes       | **yes** (`DONE`)        | yes       |
| `X.P.W0:X.P.W0.c`                                | `ac399c0f9a5e60338` | opus  | yes       | **yes** (`DONE`)        | yes       |
| `X.P.W0:X.P.W0.d` (**this seat**)                | `ae2cbfaac365889ee` | opus  | yes       | **not yet** — see below | no        |

**The arithmetic, in full: seats dispatched 5 · seats returned 4 · seats harvested 4 · seats killed 0
· rows `NO_JURY` 0 · empty results 0.** Harvested = returned, exactly.

**The one seat missing is the harvesting seat itself, and this is structural, not a loss.** A `result`
row is written to the journal when a seat _returns_; the seat that runs the harvest has not returned
at the moment it runs it, so it cannot appear in its own harvest. This is **not** the false negative
G-6 guards against — that one is _seats paid for and killed with zero rows recovered_, and here every
returned seat is recovered. Per §2.1, **the orchestrator re-harvests after `X.P.W0.d` returns**, at
which point `x-p-w0.json` carries `resultCount: 5` and the roster above closes:

```
⟨re-harvest⟩ node docs/tranches/V/megatranche/workflows/harvest-journals.mjs
             # then refresh this lane's stable name from the run file:
             cp docs/tranches/V/megatranche/registry/harvest/wf_c431fb2c-82d.json \
                docs/tranches/V/megatranche/registry/harvest/x-p-w0.json
```

## §4 The harvest as run, 2026-09-17 — command, exit, and exact write surface

The literal command, exactly as run — the script is the repository's own, **unmodified**; only the
process `cwd` differs, which is what bounds its relative output paths (see _Not placed_ below):

```
⟨cmd⟩ cd <scratchpad>/harvest-run \
      && node /Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/workflows/harvest-journals.mjs
harvested 2756 agent results · 7506 defects · {"BLOCKER":914,"MAJOR":3245,"MINOR":2163,"INFO":685, …}
EXIT=0
```

`CLAUDE_SESSION_DIR` was **not** set, so the harvester read its own default session root — the real
one, named in §1 — and harvested **128** run journals of the **129** present (one carries no `result`
row). The `cwd` bounds only where the script _writes_: `OUT` and the ledger path are relative in the
script's source.

**Placed in this repository — exactly the two paths `W0.md` §4 names for this unit:**

| path                           | state                                        | receipt                                                                                                             |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `registry/harvest/x-p-w0.json` | **created**                                  | 30,067 B · 190 lines · sha256 `cccd07a2eced029ce89df55798df5c2435ad727068c2aa857eb98c88f06dabe0` · `resultCount: 4` |
| `registry/DEFECT-LEDGER.md`    | **regenerated by the script, never by hand** | 10,494,611 B → **10,548,743 B**; **6,033 → 7,506** defect rows                                                      |

**The ledger regeneration is a strict superset — proved, not asserted.** The script's `writeFileSync`
rebuilds the whole file, so "append" had to be verified at the bytes rather than assumed:

```
⟨cmd⟩ grep '^### ' <old> | sort > old-heads ; grep '^### ' <new> | sort > new-heads
⟨cmd⟩ comm -23 old-heads new-heads | wc -l   →     0    (rows LOST)
⟨cmd⟩ comm -13 old-heads new-heads | wc -l   →  1473    (rows RECOVERED)
```

**Zero rows lost; 1,473 recovered** from runs whose journals had never been harvested.

### §4a A MAJOR defect in the harvester, found by committing its output — do not read `7,506` at face value

`git diff --check` over the regenerated ledger returned **2,946 trailing-whitespace rows**, all of
them machine-emitted and all in the 1,473 recovered rows. Chasing the whitespace found the real
defect underneath it, which is not cosmetic:

**The harvester's row template assumes the _challenger_ result schema and silently drops every row
written in the _conformance_ schema.** Measured over all 128 journals:

```
⟨cmd⟩ (node, over every result with an Array `defects`) key histogram of the 1473 empty-subject rows
      → { severity: 1473, claim: 1473, receipt: 1473 }        ← every one of them, exactly these keys
```

The template emits `id`, `defect`, `mechanism`, `evidence`, `reproduction`, `proposedCure` and a
subject taken from `component ?? slug ?? axis`. A conformance-round seat returns
`{ severity, claim, receipt }` instead. The consequence, stated plainly:

- the heading degenerates to `###` · · ``and the body to`**Defect.** ` — hence the 2,946
  trailing-whitespace rows, which are a **symptom**, not the finding;
- **`claim` and `receipt` are never emitted at all**, so all 1,473 rows are banked as **empty stubs**;
- the file's own headline therefore reads **"7506 defects"** when **6,033** carry their content and
  **1,473 carry none**.

**Read the count as `7,506 = 6,033 with content + 1,473 empty stubs`.** The stubs are still worth
banking — before this harvest those 1,473 rows were absent from the ledger entirely, so their
_existence_ is now recorded — but a reader who takes `7506` as 7,506 readable defects is misled, and
this paragraph exists so that no reader is.

**Not cured here, and deliberately so.** The cure is two string templates in
`harvest-journals.mjs` (emit `claim`/`receipt` when present; omit the separators when a field is
empty). `W0.md` §4 gives this wave **execute, no write to itself** over that file, and hand-editing
the generated ledger would be worse than the defect — it would diverge the bytes from their
generator, and the next harvest would re-introduce the loss. **Filed as a MAJOR finding for whichever
wave owns the harvester**, with its falsifier: after the cure, a re-harvest must show `grep -c
'^\*\*Defect\.\*\* $'` → **0** and the headline count unchanged at 7,506.

**Cadence reading, stated per path rather than as a blanket claim** (§7): `git diff --check` is
**CLEAN** on all four hand-authored paths of this commit — `EVIDENCE-CHAIN.md`, `x-p-w0.json`,
`census-after.txt`, `COHESION.md` — and **RED, 2,946 rows, on `DEFECT-LEDGER.md` alone**, for
machine-emitted whitespace this unit is forbidden to hand-correct. Prettier: applied to
`EVIDENCE-CHAIN.md` (`--check` exits 0 after); **never** run on `DEFECT-LEDGER.md`, which would be a
hand rewrite of a generated artifact, nor on `COHESION.md`, where it would reformat a live document
far outside a two-line carve.

**Naming.** The harvester's `NAMES` map (its runId → stable-name table) has **no entry for
`wf_c431fb2c-82d`**, so the script's own output for this run is named `wf_c431fb2c-82d.json` and the
lane's stable name is applied by the consumer. `x-p-w0.json` is therefore a **byte-identical copy** of
that file (both sha256 `cccd07a2…dabe0` above) — zero hand-authored bytes inside a machine-generated
artifact, and its `runId`/`workflow` fields still name the true run. Adding the map entry would be a
write to the harvester, which §4 forbids this wave (_execute, no write to itself_); it is filed as a
residual for whichever wave owns the script.

**Not placed, and disclosed rather than taken.** A run of the harvester from the repository root would
additionally create **79** new `registry/harvest/*.json` files and change **2** more — 81 paths owned
by no `X.P.W0` unit's writable set. This unit therefore ran the harvester with its output root in a
scratchpad and placed only the two paths above. The consequence is stated plainly: **79 completed
workflow runs in this session still have no per-run JSON in `registry/harvest/`** (their defect rows
_are_ in `DEFECT-LEDGER.md`, which is why nothing is lost in substance). The cure is one command by a
seat whose bounds include `registry/harvest/**`.

## §5 PLAW-BIND, declared from this end (the X·P end)

The chain, **verbatim** from the pause handoff §2 ("Standing ownership and routing law"), which states
_"The only lawful receiver path remains:"_

```text
parser law or durable no-runtime ruling
  -> Value PLAW-BIND
  -> V.L1 / V.L5
  -> Value release and rebind
  -> packed Value
  -> Fourier F.W0 atomic tuple
  -> F.W1
```

The ownership clauses that make the chain the _only_ path, verbatim from the same section:

- _"`parse-that` owns the generic scannerless runtime."_
- _"Value owns the CSS grammar, CSS recovery, CSS consumers, and UI."_
- _"Keyframes is a typed consumer, not a grammar owner."_
- _"Fourier may receive parser effects only through an admitted, packed Value release."_
- **The forbidden edge, named:** _"Direct `parse-that -> Fourier` credit is forbidden."_
- _"Research evidence is not product authority. Source review is not parser execution. A replay is not
  release."_

**The forbidden edge in one line, for grep**: **`parse-that → fourier` is FORBIDDEN** — no fourier
wave may consume a parse-that artifact, receipt, benchmark, or grammar directly; the only admissible
carrier is a **packed Value release**. An X·P artifact appearing in a fourier input slot is a routing
violation regardless of how good the artifact is.

## §6 The reciprocal declaration, cited by section anchor and quoted sentence — never by line

`COHESION.md` declares itself a **live document** (its own header: _"live document — the sub-session
register and status board are kept current at every boundary"_). A line coordinate into it therefore
**rots by design**, and a gate discharged against a rotted coordinate is discharged against the wrong
bytes. The citation is the **section anchor plus the quoted sentence**; the locator is `grep`.

**Cited**: `docs/tranches/X/COHESION.md` **§2 "The cross-sub-tranche dependency graph", the X·P
release-condition bullet** —

> **X·P release condition → KF.W3** (parser consumption): gate-keyed, never scheduled; routing is
> PLAW-BIND — parser → value (X·V L1/L5 surfaces) → packed release → consumers. **Direct
> parse-that→fourier is FORBIDDEN** (standing routing law).

**Located by the two literal fragment greps** `W0.md` §6 G-8 prescribes; each must return **at least
one** row, and a zero-row return means the reciprocal end was rewritten away and the gate is RED:

```
⟨cmd⟩ grep -n 'X·P release condition → KF.W3' docs/tranches/X/COHESION.md
66:- **X·P release condition → KF.W3** (parser consumption): gate-keyed, never scheduled; routing is

⟨cmd⟩ grep -n 'parse-that→fourier is FORBIDDEN' docs/tranches/X/COHESION.md
68:  parse-that→fourier is FORBIDDEN** (standing routing law).
```

Each returns **1** row (≥1 required). **The `:66` / `:68` coordinates above are this seat's
measurement of 2026-09-17, and are explicitly NOT the citation** — they are pasted because G-8 asks
for the returned rows in place of a line pin. A later reader re-runs the greps; the line numbers will
move and the quoted sentence will not.

**Both ends are now declared** (the X·V W4-D2 lesson, now law at `COHESION.md` §2's last bullet:
_"Cross-repo edges are declared FROM BOTH ENDS in the spec files"_): `COHESION.md` §2 declares it
toward X·P, and **this file declares it from X·P**. Deleting either one makes the edge
one-directional, which is the defect that made both-ends declaration law.

## §7 Standing flag — this chain's own downstream node is mid-rename (`V·L5`)

The handoff chain's third node reads `V.L1 / V.L5`. **`V·L5` is CC-011's RETIRE row (per C-13)**: the
label is _used_ and **defined nowhere**. Measured by this seat, 2026-09-17:

```
⟨cmd⟩ grep -rl 'V·L5\|V\.L5' docs/tranches/X/ | wc -l                                      →  21
⟨cmd⟩ grep -c 'V·L5\|V\.L5' docs/tranches/V/megatranche/registry/adjudicated/layout-gestalt.md →   0
```

Twenty-one files under `docs/tranches/X/` carry the token; the adjudicated record that would define
the wave carries it **zero** times — X-W0.i's own no-definition probe, re-run here and still zero.
`CONFORMANCE-2026-08-03.md` §CC-011 states the retire act — _"rewrite the routing law against
V·L1..V·L4 + an explicitly defined new cut"_ — and homes it at **X-W0.i**; the related X·V L1/L5
parser-adoption leg (S-4) is ruled **DISPOSITION C (BLOCKED-ON)** at `COHESION.md` §0i.1.

**This lane therefore states the chain verbatim AND flags the rename; it adopts neither spelling
silently.** Two consequences bind X·P's successors:

1. No X·P wave may treat `V·L5` as a defined surface. Until X-W0.i lands the rewrite, the third node
   is cited as _"the handoff's `V.L1 / V.L5`, whose L5 limb is CC-011/C-13 RETIRE and is pending
   X-W0.i's replacement cut."_
2. When X-W0.i lands, this section is **amended by a dated addendum beside** (E-3), never by rewriting
   the verbatim handoff quotation in §5 — the handoff is a pinned authority.

## §8 G-7 row 7 — "no parser evidence bound into non-parser cross-repository input slots"

Handoff §7's seventh prohibition is discharged **by G-8, i.e. by this file**: the routing law is now
written from both ends, so binding an X·P artifact into a fourier input slot is checkable rather than
a matter of intent. The check, and its literal result:

```
⟨cmd⟩ grep -rn 'parse-that' docs/tranches/X/fourier/waves/ docs/tranches/X/keyframes/waves/ | wc -l  → 47
```

**All 47 were read; not one is a consumption.** They fall into exactly three classes:

1. **Declarations of the forbidden non-edge** — e.g. `F-W0.md` §6b's _"A declared NON-EDGE. Direct
   parse-that→fourier is FORBIDDEN"_, `F-W1.md`, `F-W2.md`, `F-W4.md`, `F-W5.md`. These are the
   reciprocal end doing its job.
2. **Bounds exclusions** — `parse-that/**` named in a Do-NOT-touch list (`F-W3.md`, `F-W7.md`,
   `F-W0.md`), i.e. the negative of a binding.
3. **The lawful gate-key** — `KF-W3.md`'s opening condition, _"This wave opens if and only if
   `RC-P(V)` evaluates TRUE per `docs/tranches/X/parse-that/RELEASE-CONDITION.md` §6a"_, and
   `KF-W0.md`'s `node_modules/@mkbabb/parse-that` inventory line. **Both are the packed-release
   route, not the forbidden edge**: `RC-P` is a _predicate evaluated against the registry coordinate
   `V`_, and the installed package is a published artifact, not a direct credit.

**Note for successors, measured**: `docs/tranches/X/parse-that/RELEASE-CONDITION.md` is **ABSENT**
today (⟨cmd⟩ `test -f` → ABSENT) and is **X.P.W4 unit `.c`'s** to create (`W4.md` §File Bounds). Until
it exists, KF.W3's key has no file to evaluate — which is correct, because KF.W3 is **gate-keyed,
never scheduled** (`W0.md` §10). W0 opens the ground that condition will be earned on; it does not
advance it.

The other six prohibitions are collated **per row** — never as a blanket claim, which the gate fails
by name — in `docs/tranches/X/execution/D/X-P-W0.md` → `### X.P.W0.d`.

## §9 Standing cautions for X.P.W1..W4

1. **Open by re-stating §2 against your own run.** Name your `runId`, paste your journal path, and
   publish the seats-dispatched / returned / harvested arithmetic of §3. A wave that reports only
   "the harvest ran" has not discharged G-6's successor.
2. **Never re-run a seat whose rows are already in `DEFECT-LEDGER.md`** (the harvester's own
   instruction). Check before dispatching.
3. **The `~/Documents/Codex` read grant is dated, not durable** (unit `.a`, ledger §6). It is a
   property of _this reader on this date_, never of the tree, and it is a **read grant, never a write
   licence**.
4. **`x-p-w0.json` is this wave's file.** A later X·P wave files its own (`x-p-w1.json`, …) beside it;
   it does not overwrite this one. Harvest artifacts accrete, like the dated `.sha256` packets that
   F-7 ruled must never be rewritten.
