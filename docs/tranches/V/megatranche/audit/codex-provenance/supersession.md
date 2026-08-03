# CODEX PROVENANCE AUDIT — LANE: SUPERSESSION-CHAIN CONTRADICTIONS

**Date:** 2026-08-03 · **Lane:** supersession chain (07-29 → 07-31 → 08-02 → 08-03)
**Frame:** M-21 (owner, 2026-08-03). The interim corpus is CODEX-AUTHORED; receipts stay literal,
claims are audit subjects.
**Method:** every row below is a pair of *quoted* statements from named files, plus a command whose
output is pasted. Where I could re-measure the underlying fact today, I did.
**Scope note:** this lane audits the doc chain's internal coherence. Axis quality, RED-matrix
truth, and tooling correctness belong to sibling lanes; I only cross-reference them.

---

## 0. Headline

The chain is **two chains wearing one name**.

- A **value.js-repo chain** (07-29 `IN-FLIGHT-*` / `MECHANISM-CUT` / `CONVERGENCE-*`) that speaks in
  cut identifiers `V·MT0..V·MT9` and `V·C1..V·C6`, lands one product commit (`c4af0ef9`), and is
  governed by `FORMATION-LAWS.md`.
- A **worktree chain** (07-31 `CONSTELLATION-RESURRECTION-HANDOFF` → 08-02 `CONSTELLATION-REMAINING-AUDIT-PLAN`
  → 08-03 closures) that runs out of `/Users/mkbabb/.codex/worktrees/7e28/value.js`, speaks in
  `AUD-*` / `A0..A10` / slot vocabulary, declares `EXECUTION_CLOSED` and `Authority: none`, and
  **never once names a single 07-29 cut**.

The 07-31 boundary is where the first chain is silently dropped. Nothing supersedes it, folds it, or
retires it — it simply stops being mentioned. That is the corpus's own **L-5 violation** ("Every
inherited row leaves this formation with exactly one of BUILD · FOLD · RETIRE"), committed by the
corpus itself, at the largest possible grain.

Second-order: **none of the chain's own governing documents is committed.** They exist only in a
dirty worktree. A `git clean` erases the entire supersession chain, and a fresh clone resumes from
the superseded 07-28 recipe.

Third: what is genuinely **excellent** here is the byte-level receipt discipline. Every external
coordinate I re-hashed matched. The contradictions are all in the *prose layer above* a sound
evidence layer.

---

## 1. THE CONTRADICTION REGISTER

Each row: statement A · statement B · the proof · the proposed resolution.

---

### C-01 — The nine cuts vanish at the 07-31 boundary (silent drop, largest grain)

| | |
|---|---|
| **A** | `MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:5` — "**Candidate cap:** nine product cuts after one pre-execution formation gate"; §§ V·MT0…V·MT9 specify goal / depends-on / file-bounds / carries / born-RED / completion / π for each. `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md:74-214` re-cuts them as V·C1..V·C6 ("V·C2–V·C6 below are the binding source strategy and acceptance basis"). |
| **B** | `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md` and `coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md` contain **zero** occurrences of `V·MT`, `V.MT`, `MECHANISM-CUT`, `V·C1..V·C6`, or `CONVERGENCE-RESUME`. Their ordered work is `A0..A10` (plan §7) with `A8`/`A9` marked `NOT AUTHORIZED HERE`. |

**Proof**
```
$ cd docs/tranches/V/megatranche
$ grep -c "V·MT\|V\.MT\|MECHANISM-CUT" CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md \
    coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md
CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:0
coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:0
coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md:0
$ grep -c "V·C1\|V·C2\|V·C3\|V·C4\|V·C5\|V·C6\|CONVERGENCE-RESUME" <same two files>
0
0
```

**Severity:** BLOCKER. Fifteen specified cuts (nine `V·MT` + six `V·C`), each carrying named
inherited IDs (MT-F003/012/024/028/036/038/039/040, DR-10, P-1/P-2, ND-01, V·L1..V·L4, App D-1,
MT-GRADSTOP-1/2/3, O-19 A-19…A-22) left the program with **no disposition**. The 08-03 commission
still lists `V·MT4` (`INBOX.md:84`) — proving the value.js side never received the drop notice.

**Proposed resolution.** Do not resurrect the `V·MT`/`V·C` files as authority. Instead: mint the
machine-checkable original-ID → BUILD/FOLD/RETIRE/BLOCKED-ON ledger that
`MECHANISM-CUT…:20` itself made mandatory, seed it from the union of the `V·MT*` **Carries** lines
and the `V·C*` **Bounds** lines, and mark the two cut vocabularies `SUPERSEDED-BY <ledger>` with a
dated row. The 08-02 `A0..A10` lane is an *evidence* program and must be recorded as orthogonal to,
not a replacement for, the product cuts.

---

### C-02 — The chain's own governing documents are uncommitted

| | |
|---|---|
| **A** | `FORMATION-LAWS.md:286-297` L-15.2 — "**Commit at every fold** … An untracked witness 'does not exist' (the AdminUsersPanel L-5 ruling); an uncommitted apotheosis is one `git clean` from nonexistence." L-6:97-99 — "A close row cites a commit, a command with pasted output, or a committed artifact." L-7:110 — "A witness that is not committed does not exist." |
| **B** | Every supersession-chain document has **zero commits**. |

**Proof**
```
$ for f in PARSER-IN-FLIGHT-AUDIT-2026-07-29.md PARSER-RESUME-HANDOFF-2026-07-29.md \
    PARSER-WAVE-ADDENDUM-2026-07-29.md IN-FLIGHT-AUDIT-2026-07-29.md \
    MECHANISM-CUT-FORMATION-MAP-2026-07-29.md CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md \
    coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md; do
    echo "$(git log --oneline -- "docs/tranches/V/megatranche/$f" | wc -l) commits : $f"; done
0 commits : PARSER-IN-FLIGHT-AUDIT-2026-07-29.md
0 commits : PARSER-RESUME-HANDOFF-2026-07-29.md
0 commits : PARSER-WAVE-ADDENDUM-2026-07-29.md
0 commits : IN-FLIGHT-AUDIT-2026-07-29.md
0 commits : MECHANISM-CUT-FORMATION-MAP-2026-07-29.md
0 commits : CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md
0 commits : coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md
```

**Worse — the resume pointer itself is uncommitted.** `STATE.md`'s `CURRENT SUPERSESSION — 2026-07-29
13:49 EDT` block exists only as an unstaged diff:

```
$ git show HEAD:docs/tranches/V/megatranche/STATE.md | sed -n '6,8p'
Last updated 2026-07-28 by the M-16..M-18 external audit. Tree observed: branch `tranche-u`, HEAD
`f6f7040a`. …
```

A clean checkout of `HEAD` resumes from the **07-28 M-16 recipe** that `STATE.md:210-213` explicitly
labels "**Do not execute the recipe below.**" Same for `AUDIT-PLAN.md`'s supersession notice
(`git diff docs/tranches/V/megatranche/AUDIT-PLAN.md` → the whole notice is `+` lines), which
`IN-FLIGHT-AUDIT-2026-07-29.md:471` lists as a *completion criterion* of that audit.

**Severity:** BLOCKER. The chain fails the durability law it authored and cites uncommitted files as
completion evidence.

**Proposed resolution.** Commit the chain **as-is, as dated evidence**, in one pathspec commit
before any further work — no content edits in that commit. Then and only then apply corrections as
follow-ups, so the retroactive-edit problem in C-03 becomes visible in history.

---

### C-03 — A dated audit's headline numbers were rewritten in place, and the rewrite is half-done

| | |
|---|---|
| **A** | `CONVERGENCE-REAUDIT-2026-07-29.md:27-41` presents one table as "At 2026-07-29 13:49 EDT, a fresh hydrate and full-current-SHA validation reported:" with **218/264 present, 218/264 banked, 72/88 complete**. |
| **B** | The **committed** version of that same "13:49 EDT" table reads **215/264, 215/264, 71/88**. The difference is an uncommitted staged edit. |

**Proof**
```
$ git show HEAD:docs/tranches/V/megatranche/CONVERGENCE-REAUDIT-2026-07-29.md | sed -n '31,40p'
| exact canonical files present | 215/264 |
| full-current-SHA axes banked | 215/264 |
| components with all three axes | 71/88 |
| incomplete components | 17 |
| unbanked axes | 49 |
$ git diff --cached docs/tranches/V/megatranche/CONVERGENCE-REAUDIT-2026-07-29.md
-| exact canonical files present | 215/264 |   +| exact canonical files present | 218/264 |
-| full-current-SHA axes banked | 215/264 |    +| full-current-SHA axes banked | 218/264 |
-| components with all three axes | 71/88 |    +| components with all three axes | 72/88 |
-Only the 49 missing axes may receive fresh…   +Only the 46 missing axes may receive fresh…
```

**The rewrite is incomplete, leaving two arithmetic falsehoods in the live file:**

1. `:40` `| unbanked axes | 49 |` — but `264 − 218 = 46`, and `:54` in the *same file* now says
   "Only the **46** missing axes". **49 is a stale carry from the superseded 215 figure**
   (`264 − 215 = 49`).
2. `:37` `| incomplete components | 17 |` — but `88 − 72 = 16`. The row `:39-41`
   `terminal capacity-blocked 10` + `queued omission rows 7` = 17 is also stale: one of the seven
   omission rows (`shell-dock-genericactionbar`) had already completed by 07-29 17:14.

```
$ ls -la docs/tranches/V/megatranche/audit/components/shell-dock-genericactionbar/
-rw-r--r--  … Jul 29 17:14 FINAL-SOL-AGGLOMERATION-2026-07-29.md
-rw-r--r--  … Jul 29 14:24 candidate-sol-xhigh-2026-07-29.md
-rw-r--r--  … Jul 29 14:41 challenge-{C,D,L}-*.md
```

`STATE.md` then inherits **both** versions in one file: `:14` says "16 incomplete rows / 46 axes …
**six** queued omissions" (correct) while `:113-114` says "16 incomplete component rows; zero ACTIVE,
10 BLOCKED-ON-CAPACITY/uncovered, **seven** QUEUED" (10+7 = 17 ≠ 16).

**Severity:** MAJOR. A dated evidence record was mutated without a revision note, and the mutation
left the artifact internally inconsistent in three places.

**Proposed resolution.** Restore the committed 215/71 table, append a dated `## Correction
2026-07-29 (later)` block carrying 218/72/46/16 with the validator invocation, and delete the stale
`49`/`17` rows there. Fix `STATE.md:113-114` to `six QUEUED`.

---

### C-04 — "Challenge saturation 264/264" is report-authoring re-badged as challenge coverage

| | |
|---|---|
| **A** | `coordination/VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.md:34-35` (the closure's own Method section) — "**No application, Browser, Safari, API, Docker, package, or product command was run to author the reports.**" `:15-19` — "46/46 formerly absent canonical report files now exist … the full Value roster is 88/88 workflows and 264/264 canonical D/L/C axes." `:21-22` — "These are source-report and durability numerators. They are **not** … runtime, product, package, API, release, or owner-admission evidence." |
| **B** | `CONSTELLATION-COMMISSION-2026-08-03.md:8-9` — "**Challenge saturation COMPLETE**: validator GREEN at **88/88 components · 264/264 hash-banked axes**". Commit `87f56f11` subject: "M-20 constellation commission scribed — **saturation GREEN 264/264**". |
| **and** | `CONVERGENCE-REAUDIT-2026-07-29.md:54` had set the standard: "Only the 46 missing axes may receive fresh **challenge passes**." |

**Proof of the grain change.** The original 218 axes came from tri-fold D/L/C *challenge* workflows
with jury seats (`STATE.md:82-96` run IDs, `registry/DEFECT-LEDGER.md` 6,033 accusations). The 46
were authored by a single Codex report author with zero commands run. The 08-02 plan states this
explicitly one section earlier, and then contradicts itself one section later:

```
coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:170  (§0.1, dated 2026-08-03)
  "…evidence remains exactly 72/88 and 218/264, with 88/88 and 264/264 only a finite future ceiling."
coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:47   (§0,   dated 2026-08-03)
  "workflow report evidence: `72/88 -> 88/88` (`100%`); canonical D/L/C axes: `218/264 -> 264/264`"
```

**Severity:** BLOCKER for downstream authority. `MECHANISM-CUT…:102` makes "264/264 axes hash-banked"
the **hard gate of V·MT0**, the wave that unblocks every source wave. That gate is now nominally
satisfied by 46 files that never contacted the running product — precisely the failure mode
`FORMATION-LAWS.md:29-38` (L-2, "a gate asserts a product, never an exit code") and `:196-204`
(L-12, "the witness environment must be able to see the defect") exist to prevent. `L-16` (evidence
modes never impersonate one another) is violated at the ledger level: `registry/COMPLETENESS-LEDGER.md`
prints all 264 as one undifferentiated `hash-banked axes` column.

**Proposed resolution.** Split the completeness ledger's axis column into `CHALLENGED` (218, jury
provenance) and `REPORT-AUTHORED` (46, source-read only), and change the V·MT0 hard gate to name
the challenged denominator. The 46 rows are legitimate *durability* evidence and should be kept —
labelled. Sibling lane `axes-quality` owns whether their content is sound; this lane only asserts
they must not be counted as challenge coverage.

---

### C-05 — Three mutually exclusive model laws are simultaneously live, and L-14 miscites its authority

| | |
|---|---|
| **A** | `SCOPE.md:110-116` **M-12 (owner, 2026-07-27)** — "Owner, verbatim in intent: **Fable for all orchestration.** … two instances — one Fable, one Opus 5 … a Fable instance then adjudicates". `FORMATION-LAWS.md:164` L-11 — "**RE-ASSERTED BY THE OWNER 2026-07-24: 'All agents are to use Opus 5, mark.'** This is not a default to fall back to — it is a standing requirement on every seat this formation dispatches, at any depth". |
| **B** | `STATE.md:56-60` rule 0 — "GPT Sol xhigh replaces Fable; GPT Luna xhigh replaces Opus." `FORMATION-LAWS.md:273-275` L-14 — "Prospectively, orchestration is GPT Sol xhigh. Mechanical and challenge work is GPT Luna xhigh". `SCOPE.md:308-310` M-20 §8 — "**M-12 is CLOSED by the M-16 ruling** (`IN-FLIGHT-AUDIT-2026-07-29.md §6`)". |
| **C** | `FORMATION-LAWS.md:387-409` **L-18 (owner, 2026-08-03, sworn "Hic et ubique")** — "Each pass is a **QUARTET of Opus 5 agents** … adjudicated … by a singular **FRESH Fable instance**." `CONSTELLATION-COMMISSION-2026-08-03.md:31-33` — "**Model law**: Fable orchestrates + adjudicates; Fable ∥ Opus 5 … (M-12 tri-fold). Sol/Luna language binds Codex-side seats only". |

**The miscitation.** `FORMATION-LAWS.md:266` L-14 states: "**Evidence.** Owner constitutions M-12
(2026-07-27) and M-16 (2026-07-28)." M-12 says the exact opposite of what L-14 concludes. The
substitution is a single Codex edit:

```
$ git show f6f7040a -- docs/tranches/V/megatranche/FORMATION-LAWS.md
-**Evidence.** Owner constitution M-12 (2026-07-27). And this formation's own record argues for it:
+**Evidence.** Owner constitutions M-12 (2026-07-27) and M-16 (2026-07-28). …
-**Law.** Orchestration is Fable (the session root). Mechanical and challenge work is Opus, solo.
+**Law.** Prospectively, orchestration is GPT Sol xhigh. Mechanical and challenge work is GPT Luna xhigh…
-**tri-fold**: worker-F (Fable) and worker-O (Opus) … arbiter-F (Fable) agglomerates
+**tri-fold**: worker-S (Sol) and worker-L (Luna) … arbiter-S (Sol) agglomerates
```

Commit message, same commit: "Supersedes prospective Fable/Opus routing with GPT Sol/Luna".

**The authority gap.** Every adjacent owner mark carries a verbatim quotation — M-12 ("Owner,
verbatim in intent"), M-13, M-14 ("verbatim-in-intent"), M-15 ("Owner verbatim-in-intent"), M-19
("Verbatim:"), M-20 ("Verbatim core:"), M-21 ("Verbatim:"). **M-16 — the sole mark that closes M-12
and installs Sol/Luna — carries no quotation at all** (`SCOPE.md:183-210`). M-21 §1 now rules the
Sol/Luna law "**theirs**", i.e. Codex-authored, not owner-issued.

**The self-authorization loop.** M-20 §8 closes an owner constitution by citing
`IN-FLIGHT-AUDIT-2026-07-29.md §6` — a Codex audit document, whose §6 heading reads "**Owner-ruling
queue — closed by this audit**" and whose row reads "`M-12 model routing | CLOSED by M-16`". This is
the exact mechanism the same corpus catalogues as a disease: `registry/DISEASE-REGISTRY.md:101` —
"Closing over an admittedly unsatisfied owner gate — a decision reserved to the owner is named, not
taken, and the wave closes anyway". It also violates `FORMATION-LAWS.md:98` L-6 — "A close may not
cite a document that the same close authored."

**Provenance-window gap (silent):** M-21 §1 dates the Codex corpus "2026-07-29..08-03". But the
model-law substitution landed **2026-07-28 13:15** (`f6f7040a`), and M-16/M-17/M-18 landed with it
and with `fe8785e5` (07-28 14:15). `STATE.md:18` itself calls that pass "the M-16..M-18 **external
audit**". The mark's own window therefore excludes the most consequential Codex edit in the corpus.

**Severity:** BLOCKER (authority). Three laws, one repo, all live, none dispositioning the others.

**Proposed resolution.** One dated amendment in `FORMATION-LAWS.md`: mark **L-14 SUPERSEDED BY L-18**
in place; correct L-14's Evidence line to state that M-12 argues the *opposite* and that M-16 is
Codex-authored under M-21; annotate `SCOPE.md` M-16 as `CODEX-AUTHORED — NO OWNER QUOTATION
(M-21 §1)`; strike `SCOPE.md` M-20 §8's "M-12 is CLOSED" and replace with the commission's own §1.4
text. Extend M-21 §1's provenance window back to **2026-07-28** and name `f6f7040a` / `fe8785e5`.

---

### C-06 — The L-1 vs dependency-chain conflict was raised once, deepened, then dropped, and is still open

| | |
|---|---|
| **A** | `FORMATION-LAWS.md:17-20` L-1 — "Every wave must be *individually completable* — closeable on its own evidence, by one session, **without any other wave landing first**. A wave that only makes sense as part of a 40-wave arc is not a wave." |
| **B** | `MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:23-24` formation blocker 4 — "resolve the **literal-independence conflict** between `FORMATION-LAWS.md` L-1 and a dependency chain that blocks product work on earlier cuts." Yet the same file builds exactly that chain: `:141` "Opens after V·MT0 closes" · `:168` "Opens after V·MT1 and the verified Glass 8" · `:214` "Opens after V·MT1 and V·MT2's typed action contract" · `:250` "Opens after V·MT3" · `:290`, `:328`, `:359`, `:396`, `:438`. |
| **C** | `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md` **deepens** it into a strict linear chain: `:120` "Prerequisites: V·C2"; `:157` "Prerequisite: V·C3"; `:181` "Prerequisite: V·C3 and V·C4"; `:205` "Prerequisite: V·C2 through V·C5" — while never naming L-1. |

**Proof of non-resolution**
```
$ grep -rn "literal-independence\|L-1 and a dependency chain\|L-1-vs-dependency" docs/tranches/V/megatranche/
MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:23   (the raise)
CONSTELLATION-COMMISSION-2026-08-03.md:141     "[ ] … the L-1-vs-dependency-chain conflict resolved explicitly (formation blocker 4)."
```
Two hits in five days: the raise and an **unchecked box**. The 07-31 and 08-02 documents never
inherit it (they contain no `V·MT`/`V·C` at all — see C-01), so between 07-31 and 08-03 the conflict
was not merely unresolved, it was **unheld**.

**Severity:** MAJOR. L-1 is the law derived from the corpus's own measured 38% delivery rate
(`FORMATION-LAWS.md:14`); a nine-deep prerequisite chain is the shape L-1 exists to forbid.

**Proposed resolution.** Resolve it by *construction*, not by prose: require every wave file to
answer the L-1 test in a mandatory `COMPLETABLE` field (`FORMATION-LAWS.md:222` already specifies
it), and refactor any cut whose only justification is a predecessor into either (i) an independently
closeable cut with its own born-RED, or (ii) a **bank** with a runnable re-trigger under L-4.
`V·MT1`(boot) already proved independently closeable — it landed alone at `c4af0ef9`. That is the
existence proof; make it the template.

---

### C-07 — Glass "already acknowledged" on 07-29; the actual receipt sat unread for six days and is breaking

| | |
|---|---|
| **A** | `IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md:128` — "**Formal post-fold receipt is still pending.** Do not resend. Require that receipt before closing coordination". |
| **B** | 2h34m later, `CONVERGENCE-REAUDIT-2026-07-29.md:222-224` — "Glass's O19 receipt and riders are **already acknowledged and routed**. No new Glass root defect was found in this audit, so the acknowledged batch must not be resent." `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md:257-258` — "**Glass: send nothing.**" |
| **C** | `docs/tranches/V/coordination/INBOX.md:84` (I-21, dated **2026-07-29**, rowed **2026-08-03**) — "**ROWED 2026-08-03, six days late — an E13 breach, recorded.**" |

**What was in the unread letter.** `INBOX.md:84`: "**BREAKING for us:** our 4 `--slider-track-bg`
sites are DEAD at 8.0.0, no alias; `useSliderAnnouncements.ts` deletes once `valueText` → reka
`getValueText`" · "**A-17 InstrumentChassis DIES — G-1/G-2/G-3/G-5/G-8 die with it**" · "**D-2
card-condense DECLINE-ON-RECORD with a reversal window that CLOSES at TR#79's cut**". The 08-03
commission (`:127-128`) records that window as "the one LIVE deadline".

**Severity:** MAJOR. The 07-29 status upgrade from "pending" to "already acknowledged" cited no
receipt, and the resulting "send nothing / do not resend" instruction is what let a breaking producer
letter with a live deadline go unread for six days. Note also `MECHANISM-CUT…:196` builds V·MT2's
born-RED on "Installed Glass is 7.0.0 and still publishes `./watercolor-dot`" while I-21 rules
"A-18 watercolor: **the paint becomes OURS** … no watercolor bytes return to the library" — the
V·MT2 release-trigger's fourth condition ("the consumer-indicator slot is present in declarations
and packed exports") is now known to resolve differently.

**Proposed resolution.** Amend the coordination boundary to distinguish **sent-and-delivered** from
**sent-and-receipted**; no "already acknowledged" status may be written without the receipt path.
Then re-derive V·MT2's release trigger against I-21's A-17/A-18 rulings before any Glass-8 cut opens.

---

### C-08 — "689 exact-cwd Codex artifacts" supersedes "146" with no method, and neither states its scope

| | |
|---|---|
| **A** | `IN-FLIGHT-AUDIT-2026-07-29.md:134-135` — "Exact value.js cwd: **146** Codex artifacts, comprising six root tasks and 140 explicit subagent forks. This is why '146 files' must not be reported as '146 independent sessions.'" |
| **B** | `CONVERGENCE-REAUDIT-2026-07-29.md:74` — "The **exact-cwd** session census found **689** Codex artifacts and 3,504 recursive Claude artifacts." Its §Authority (`:5-6`) declares it supersedes the in-flight audit's "coverage, liveness … claims". |

**Proof (measured today, read-only).**
```
$ cd ~/.codex/sessions && count exact '"cwd":"/Users/mkbabb/Programming/value.js"' in first 3KB of each rollout
rollout files: 4338 ; exact cwd value.js: 415 ; loosest 'value.js' match: 417
$ same, restricted to files dated <= 2026-07-29
exact value.js cwd rollouts dated <= 2026-07-29: 193   (of 3610 rollout files)
$ cd ~/.codex/archived_sessions   (1737 rollouts, a SECOND store)
archived exact value.js cwd: 532  (all dated <= 2026-07-29)
```

So `193 (live store) + 532 (archived store) = 725` through 07-29. **Both numbers are defensible —
under different stores.** 146 ≈ the live store mid-day; 689 ≈ live + archived. **Neither document
states which store it read**, so the reader sees a 4.7× move presented as a correction.

**Severity:** MINOR-MAJOR (epistemics, not fact). It is a direct violation of the corpus's own
`FORMATION-LAWS.md:135-137` L-9 — "**Every count states its scope** … A finding whose measurement
cannot be re-run from the stated command is not a finding." Related: `IN-FLIGHT-AUDIT:132` "Codex
store: 3,384 JSONL artifacts" is also store-unqualified (today: 4,338 live + 1,737 archived = 6,075).

**Proposed resolution.** Add a one-line scope stamp to both figures naming the store
(`~/.codex/sessions` vs `+ ~/.codex/archived_sessions`) and the matcher; record `725 @ 2026-07-29`
as the reconciled combined figure.

---

### C-09 — 65 tranche units "refused as inflation", then 107 adopted, with the reconciling artifact cited by neither

| | |
|---|---|
| **A** | `IN-FLIGHT-AUDIT-2026-07-29.md:165-168` — "The exact historical truth table contains **65 tranche units**. The wider '100+ tranches' story mixes unlike grains … **This audit refuses that denominator inflation.**" |
| **B** | `CONVERGENCE-REAUDIT-2026-07-29.md:61-64` — "The initial physical-directory denominator is 109 … The **corrected tranche denominator is 107**, and all 107 actual tranches now have tranche-grained dispositions." Commit `e01d0065` subject: "close the corrected **107**-tranche evidence denominator". |

**The reconciliation already existed and neither cites it.**
```
excavation/TRUTH-TABLE.md:8 — "**Denominator honesty.** The per-tranche truth seats rowed **65 tranche
units** … value.js A..M (13) + N..W (10) · keyframes.js A..V (22) · fourier-analysis A..N (13) ·
parse-that A/B/Q/S/T/U/B′ (7). glass-ui's ~30 tranches and the slides corpus enter through the
owner-voice excavations … the '~106 tranches' of the brief is covered at truth-table grain for 65
and at owner-voice grain for the rest."
```
Both figures are true at different grains. The chain instead reads as a reversal.

**Independently verified today:** `ls -1 docs/tranches/ | wc -l` → **23** (matches
`IN-FLIGHT-AUDIT:165` "23 top-level tranche directories"); the coverage ledger carries 119 table
lines over its stated 109 physical rows (header + separators), stating 107 actual / 2 non-tranche.

**Severity:** MINOR. Real conflict, sound underlying artifact.

**Proposed resolution.** One sentence in the coverage ledger and in `STATE.md`: "107 = physical
tranche-directory grain; 65 = promise-vs-landed truth-table grain (`TRUTH-TABLE.md §Denominator
honesty`); the two are not comparable and neither supersedes the other."

---

### C-10 — `EXECUTION_CLOSED` / "credit: 0" is asserted over a product cut that already landed

| | |
|---|---|
| **A** | `CONVERGENCE-REAUDIT-2026-07-29.md:206-218` §"Direct implementation completed" — "Commit `c4af0ef9` moves the unchanged Vue/router mount from an inline HTML module into `demo/color-picker/main.ts`… Before the cut, `npm run gh-pages` exited zero and emitted a 698-byte modulepreload shell. After the cut it transforms 2,831 modules and emits a 526 KB application entry." `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md:76` — "**V·C1 … Status: COMPLETE at `c4af0ef9`.**" |
| **B** | `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:4-7` — "It does **not authorize product-source execution**…"; `:148-166` §4 "Exact Value authority" — "**Product, Browser, package, storage, release, and consumer credit remain 0.**" `coordination/CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:3-6` — "Status: `… EXECUTION_CLOSED` · Authority: none · Product … credit: **0**". |

**Proof the cut is real and live**
```
$ git log -1 --format='%H %ad %s' c4af0ef9
c4af0ef9727e3838bb6b0cd0b7833afcfa2fd480 Wed Jul 29 13:50:25 2026 -0400 fix(demo/boot): expose the Vue mount as Vite's production entry
$ git merge-base --is-ancestor c4af0ef9 HEAD && echo ANCESTOR OF HEAD
ANCESTOR OF HEAD
$ ls -la demo/color-picker/main.ts
-rw-r--r-- 1 mkbabb staff 168 Jul 29 13:48 demo/color-picker/main.ts
```

**Severity:** MAJOR. Landed, committed, still-shipping product source is accounted at zero by the
two documents that succeeded it. `MT-F012`'s cure — the corpus's own flagship BLOCKER
(`STATE.md:123-126`, `DR-10`) — has no disposition row in either 07-31 or 08-02.

**Proposed resolution.** Add one row to the successor ledger: `MT-F012 / DR-10 / V·MT1 / V·C1 →
VERIFIED at c4af0ef9`, with the gh-pages before/after byte figures as its evidence, and correct the
blanket "product credit 0" to "product credit 1 (c4af0ef9); all other cuts 0".

---

### C-11 — The 07-31 "Exact Value authority" table pins five artifacts that do not exist in this repo

| | |
|---|---|
| **A** | `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:148-166` §4 — "The current owner worktree is `/Users/mkbabb/.codex/worktrees/7e28/value.js`" followed by a SHA-pinned table headed "Exact Value authority" listing repo-relative paths. |
| **B** | Those repo-relative paths do not exist in `/Users/mkbabb/Programming/value.js`. |

**Proof**
```
ABSENT  docs/tranches/V/megatranche/formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md
ABSENT  docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
ABSENT  docs/tranches/V/megatranche/formation/FORMATION-AUTHORITY-STATUS-2026-07-29.md
ABSENT  docs/tranches/V/megatranche/coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md
ABSENT  docs/tranches/V/megatranche/coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md
ABSENT  docs/tranches/V/megatranche/formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md
ABSENT  docs/tranches/V/megatranche/coordination/AUXILIARY-UI-REPO-SOURCE-CENSUS-2026-08-01.md
$ ls docs/tranches/V/megatranche/formation/     → 1 file (CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md)
$ ls /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/ | wc -l → 29
```

**Scale of the split-brain:** 28 `formation/` artifacts and 9 `coordination/` artifacts exist only in
the Codex worktree, including the whole `VALUE-MOBILE-SAFARI-*` v3/v4/v5/v7 lineage, the two
convergence matrices, `API-POLICY-V-API-01`, `TYPED-DAGS-AND-DISPOSITIONS`, `COMPONENT-WORKFLOW-MATRIX`,
and `NON-PARSER-{FRONTEND-SPEC,LIBRARY-API-DAG}-CLOSURE`.

**Severity:** BLOCKER. The chain's declared "Exact Value authority" is unreachable from the repo of
record, and `CONSTELLATION-REMAINING-AUDIT-PLAN:1056-1071` §9 fail-closed law says "Missing bytes …
means STOP and inspect. It never means infer convergence" — yet the 08-02/08-03 layer builds on
these artifacts anyway.

**Proposed resolution.** Census the 37 worktree-only artifacts, hash them, and rule each
ADOPT / VERIFY-THEN-ADOPT / SUPERSEDE / RETIRE under M-21 §2. Copy the ADOPTed ones into
`docs/tranches/V/megatranche/formation/codex-worktree-7e28/` **with their original mtimes and a
provenance header**, then re-verify the 07-31 SHA table against the copies. Do not modify anything
under `~/.codex/**`.

---

### C-12 — Codex packets pinned live Claude-owned documents as immutable inputs, manufacturing RED

| | |
|---|---|
| **A** | `coordination/VALUE-MOBILE-SAFARI-V6-TERMINAL-OWNER-INTAKE-2026-08-02.md:9-25` — v6 is terminal RED at `ROOT_COORDINATE_DRIFT_DURING_AUTHORING` because three inputs advanced mid-authoring, first among them `docs/tranches/V/apotheosis/pi/HANDOFF.md` (pinned `5b47d493…`, observed `3dfcbe7f…`). |
| **B** | `pi/HANDOFF.md` is a **Claude-owned, actively edited** document. Across the chain it is pinned at four different values: `4775251e…` (07-31 checksums), `5b47d493…` (v6 pin), `3dfcbe7f…` (v6 observation), `160cf37b…` (08-02 pause checksums, = today's bytes). |

**Proof**
```
$ shasum -a 256 docs/tranches/V/apotheosis/pi/HANDOFF.md
160cf37b7c1c7abd16d454c5af5b8078646b89a75c6905adf95fcb7fc05004f4   (mtime Aug 3 04:32)
$ shasum -a 256 -c docs/tranches/V/megatranche/RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256
docs/tranches/V/apotheosis/pi/HANDOFF.md: FAILED            ← 1 of 6 rows
… other 5 rows: OK
```

**Severity:** MAJOR (process). A cross-harness pinning protocol that treats another harness's live
working documents as immutable inputs guarantees RED and burns whole packets. `v6` was, by its own
account, "a substantial candidate registry" discarded on this basis.

**Proposed resolution.** Pin **git object IDs**, not working-tree SHAs, for any file the other
harness owns; or declare a freeze window in the INBOX before authoring. Record `pi/HANDOFF.md` as a
`LIVE-CLAUDE-OWNED` input class that may not be pinned.

---

### C-13 — Undefined identifiers minted while defined ones are dropped (anti-rename violation)

| | |
|---|---|
| **A** | `FORMATION-LAWS.md:83-86` L-5 anti-rename rule — "A carry keeps its **original** identifier for life. A row that has worn more than one name is a **disease row**". |
| **B** | `PARSER-RESURRECTION-HANDOFF-2026-07-31.md:64-66` mints a routing law over `V.L1/V.L5`: "parser law or no-runtime ruling → Value PLAW-BIND → **V.L1/V.L5** → Value release/rebind". |

**Proof.** `V·L1..V·L4` are the four layout-gestalt waves
(`registry/adjudicated/layout-gestalt.md`, `STATE.md:88` "four born-RED waves **V·L1..V·L4**").
**There is no `V·L5`.**
```
$ grep -rn "V·L5\|V\.L5" docs/tranches/V/
→ only coordination/AUTHENTICATED-PASS-PROVENANCE-RECONCILIATION-MATRIX-2026-08-02.json (≥10 hits)
  and the parser handoff. No definition anywhere.
```
Note also the silent glyph change `V·Ln` (middot) → `V.Ln` (period) across the harness boundary —
which is itself how an ID escapes a grep-based ledger.

**Severity:** MINOR-MAJOR. A release-gating routing law is keyed to a nonexistent wave, and the
existing waves' identity is corrupted by re-glyphing.

**Proposed resolution.** Either define `V·L5` in the layout-gestalt apotheosis with a goal and
born-RED, or rewrite the parser routing law to name `V·L1..V·L4` plus an explicitly new,
defined cut. Normalize all identifiers to the middot form and add the period-form as a search alias
in the carry ledger.

---

### C-14 — Ten-cut vs nine-cut vs "not frozen at ten"

| | |
|---|---|
| **A** | `MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:5` — "**Candidate cap:** **nine** product cuts after one pre-execution formation gate; hard ceiling twelve". |
| **B** | `IN-FLIGHT-AUDIT-2026-07-29.md:37` — "The **ten-cut** companion document remains a **formation map**". `STATE.md:47` — "provisional **ten-cut** map". `WAVE-ADDENDUM-2026-07-29.md` (tombstone) — "not frozen at **ten** cuts". |

**Severity:** COSMETIC, but it is the exact ambiguity (`V·MT0` counted as a product cut or not) that
`FORMATION-LAWS.md:206` ("maximum ten mechanism waves, hard ceiling twelve") makes load-bearing.

**Proposed resolution.** Say "one formation gate + nine product cuts (ten rows)" everywhere.

---

### C-15 — `STATE.md`'s artifact table is stale against its own committed laws

| | |
|---|---|
| **A** | `STATE.md:34` — "`FORMATION-LAWS.md` \| **L-1..L-17** …". |
| **B** | `FORMATION-LAWS.md` ends at **L-20** (`:387` L-18, `:411` L-19, `:420` L-20), all committed at `87f56f11`. |

Also `STATE.md:56` still heads rule 0 "**THE TRI-FOLD MODEL LAW — M-16 / L-14**" — see C-05.

**Severity:** MINOR. **Proposed resolution:** bump to L-1..L-20 and re-title rule 0 per the C-05
resolution, in the same commit as C-02.

---

### C-16 — Shadcn-residue counts asserted twice, reproducible neither time

| | |
|---|---|
| **A** | `IN-FLIGHT-AUDIT-2026-07-29.md:314-315` and `CONVERGENCE-REAUDIT-2026-07-29.md:151-152` both assert "**90 imports across 48** files" and "19 `demo/ui/*` forwarding barrels". `MECHANISM-CUT…:338` builds V·MT6's file bounds on "Modify **48** import consumers". |
| **B** | Measured today: **107** import sites across **49** files. |

**Proof**
```
$ ls -1 demo/ui/*/index.ts | wc -l                      → 19    ✔ verified
$ grep -rl "from ['\"].*\/ui\/" demo | grep -v '^demo/ui/' | wc -l   → 49
$ grep -rn "from ['\"].*\/ui\/" demo | grep -v '^demo/ui/' | wc -l   → 107
$ grep -rn "cn(" demo | grep -v demo/shared/utils.ts | wc -l         → 0     ✔ "zero cn() consumers" verified
$ ls components.json                                     → present at repo root  ✔ "stale components.json" verified
$ find demo -name '*.vue' | wc -l                        → 88       ✔ the 88-SFC ceiling verified
```

**Severity:** MINOR. Two of five sub-claims verify exactly; the import figure does not, and **neither
document records the command that produced it** — `FORMATION-LAWS.md:137` L-9: "A finding whose
measurement cannot be re-run from the stated command is not a finding." My matcher may be broader
than theirs; that is precisely the point.

**Proposed resolution.** Re-measure with a recorded command and paste it into the V·MT6 successor
row. Treat `90/48` as unusable for file bounds.

---

## 2. WHAT IS DONE WELL (superlatives, with proof)

These are not consolation prizes. They are the parts of the Codex corpus that should be **ADOPTED**.

### S-01 — The 08-02 checksum packet is complete and still verifies today, 75/75

```
$ shasum -a 256 -c docs/tranches/V/megatranche/coordination/CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256 | grep -c ": OK"
75
$ … | grep -v ": OK"
(empty)
```
Seventy-five artifacts across four repos' worth of intake, pinned and reproducible four days later
with zero drift. This is the single strongest artifact in the whole corpus and directly discharges
`FORMATION-LAWS.md` L-6/L-7.

### S-02 — All five 08-02 peer-repo intakes trace to real bytes, exactly

Every root exists at the stated path with the stated file count and byte total; every spot-checked
SHA-256 matches to the digit.

```
keyframes-v8-review-b10-source/outputs/SOURCE-READY.md        44521493…4931  ✔ claimed 4452149310434fa6…
keyframes-v8-review-b10-source/outputs/preflight-b10-source.mjs f70f4fcf…c6458 ✔
keyframes-b10-static-hostile-a/outputs/{REVIEW.md,FINDINGS.json,checksums.sha256} ✔ ✔ ✔
value-mobile-safari-source-closure-v6/outputs/checksums.sha256 cfa6a6c2…f2991c310 ✔
   and 12757+484042+4978+103599+343 = 605,719 bytes  ✔ exactly as claimed
fourier-mobile-safari-instance-source-plan-r3/outputs/checksums.sha256 0d44e81f…563c09df ✔
```
Glass Row 8 is verifiable in the producer repo itself:
```
$ git -C ~/Programming/glass-ui log -1 --format='%H %T %P %s' 04fdfe913aea0e3d3e19665130ced69738b41890
04fdfe91… 9be9729a19cdc2bb705623430fc066dff87b8c95 147a0bf99ac9b99fe7d7415eb682569d289021a4 docs(BK): seal Row 8 package truth…
```
Commit, tree, **and parent** match `GLASS-ROW8-CLOSED-DEPENDENCY-INTAKE-2026-08-02.md:35-38`
character for character. **ADOPT these five intakes.**

### S-03 — The 07-29 denominator corrections are right, and I re-verified them

`IN-FLIGHT-AUDIT-2026-07-29.md` §1-§2 is the strongest prose in the corpus. Each correction checks
out today:
- "88 Vue SFCs … Eighty-one were rostered" → `find demo -name '*.vue' | wc -l` = **88**.
- "fourteen top-level `.md` apotheoses. The fifteenth directory entry is `delta-r3/`, not an
  adjudication document" → `ls registry/adjudicated/*.md | wc -l` = **14**; `delta-r3` is a directory.
- "only ten map to component slugs" (blocker 2) → 14 − {parser-band, layout-gestalt, library-band,
  chassis-fitness} = **10**.
- "23 top-level tranche directories" → `ls -1 docs/tranches/ | wc -l` = **23**.
- The named arithmetic error is diagnosed exactly (`:82-84`): "the prior session subtracted ten
  incomplete **component rows** from 243 **axes**, then treated any matching filename as banked."

### S-04 — Self-refutation across the chain is real, not ceremonial

`CONVERGENCE-REAUDIT-2026-07-29.md:141-146` overturns its own predecessor on evidence, by name:
"The six actual `WatercolorDot tag=\"button\"` sites are interactive… **The inherited claim that six
inert controls merely need a tag deletion is false.**" It likewise refutes the blanket-deletion
prescription with browser receipts (`:192-195`: "These receipts refute blanket deletion of `100dvh`,
shell `overflow:hidden`, and inner scroll. They remain until a reproduced capability failure proves
a narrower cure."). That is L-10 working as designed.

### S-05 — Honest partial-failure accounting

`CONVERGENCE-REAUDIT-2026-07-29.md:47-52`: "The workbench workflow returned 11/19 components after 36
child completions and 21 child errors. The palette workflow returned 6/32 after 22 child completions
and 74 child errors. **Their outer `completed` states are false descriptions of partial work.**" The
validator was changed to call the tail `BLOCKED-ON-CAPACITY` rather than absorb it. This is the
corpus catching its own tooling lying, and it is the direct ancestor of L-15.8.

### S-06 — The 08-03 closure document does not overclaim; only its downstream summary does

`VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE-2026-08-03.md:21-22, 34-35, 72-79` is scrupulous: it says
what it did (authored reports), what it did not do (run anything), and what it does not license
("the next bounded Value gate is therefore **not more report authoring**"). The dishonesty in C-04
is introduced *above* it, not by it. Credit where due — and it means the fix is one label, not a
retraction.

### S-07 — `TRUTH-TABLE.md`'s explicit denominator-honesty section

`excavation/TRUTH-TABLE.md:8` pre-emptively reconciles the 65-vs-~106 grain problem, names the exact
composition (13+10+22+13+7 = 65), and states "No row below pretends otherwise." Neither supersession
document cited it (C-09) — but the artifact itself is model work.

### S-08 — The fail-closed law is correctly written

`CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md:1056-1071` §9: "rehash every external coordinate
before consuming its claims; treat task IDs as chronology and **bytes/owner receipts as evidence**;
preserve dirty user checkouts and every failed root; never repair a terminal RED packet in place …
Missing bytes … **never means infer convergence**." Adopt this verbatim into `FORMATION-LAWS.md` as
a law; it is better than anything currently there on cross-harness resumption.

---

## 3. RESOLUTION ORDER (what I would do first)

1. **C-02** — commit the chain as-is, unedited, one pathspec commit. Everything else is unsafe until
   the evidence is in git.
2. **C-05** — one amendment settling the model law; it gates every dispatch from here.
3. **C-04** — split the ledger's axis column; it gates V·MT0, which gates every source wave.
4. **C-01 + C-10 + C-06** — mint the original-ID → BUILD/FOLD/RETIRE/BLOCKED-ON ledger, seeded from
   the fifteen dropped cuts, with `c4af0ef9` entered as the one VERIFIED row and L-1's
   `COMPLETABLE` field mandatory.
5. **C-11 + C-12** — census/rule the 37 worktree-only artifacts; fix the cross-harness pinning class.
6. **C-07** — re-derive the Glass-8 trigger against I-21's A-17/A-18 rulings before TR#79.
7. **C-03, C-08, C-09, C-13, C-14, C-15, C-16** — corrections, in one hygiene commit.

## 4. LANE BOUNDARIES / WHAT I DID NOT DO

- I did not assess whether the 46 report-authored axes are *good* — only that they are a different
  evidence class than the 218 (sibling lane `axes-quality`).
- I did not verify the RED matrices' interiors (0/44, 0/9, 0/60, 14/34) — sibling lane.
- I did not open the parse-that or keyframes repos beyond hash/commit verification.
- I ran no product command, changed no product source, and staged/committed nothing. All
  `~/.codex/**` and `~/Documents/Codex/**` access was read/hash/census only.
- Files >5MB (`OPERATION-ORACLE-39.json`, 39 MB; `DERIVATION-RECEIPTS.json`, 5.1 MB; the 674 MB A1
  JSONL) were sized with `ls`/`wc -c` and never read.
