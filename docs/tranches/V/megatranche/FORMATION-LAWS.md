# FORMATION LAWS — binding on every wave this mega-tranche writes

Each law below is **derived from a measured failure in this repository's own history**, not from
general principle. The citation is the evidence; the law is the response. A wave that violates one
of these is malformed and does not enter the registry.

Authority: the 22-tranche historical audit (10 hostile Opus seats, `audit/history/`), the root
findings (`registry/ROOT-FINDINGS.md`), and the owner marks in `SCOPE.md` §0.

---

## L-1 — Size the program to the measured rate, not the ambition

**Evidence.** Across 22 tranches: **1,005 commitments promised, 380 verifiably landed — 38%**
(MT-F020). The standing 193-wave formation sits at **3 of 199 = 2%** executed with 0/2 clean credit.

**Law.** The wave count is bounded by what the measured rate can deliver. Every wave must be
*individually completable* — closeable on its own evidence, by one session, without any other wave
landing first. A wave that only makes sense as part of a 40-wave arc is not a wave; it is an arc
wearing a wave's name, and the record says arcs do not land.

**Test.** For each wave: "if this were the only wave that ever executed, would the tree be better
and would the wave be closed?" If no, split it or kill it.

---

## L-2 — A gate asserts a product, never an exit code

**Evidence.** `npm run gh-pages` exits 0 while emitting a bundle with no application in it
(MT-F012); the deploy workflow runs it and hands the output to `wrangler` with nothing in between.
W44's close cited "build + gh-pages exit 0" as evidence of health. Historically: ~76 vacuous gates
across the arc, including T.W9's "GREEN or write an escalation paragraph".

**Law.** Every gate names the artifact property it asserts and the exact input that violates it.
`exit 0`, "builds cleanly", "no errors" and "passes" are not gates. A gate that cannot be made RED
by a stated input is deleted, not weakened.

**Test.** Write the failing input next to the gate. No failing input, no gate.

---

## L-3 — Born RED, and RED *today*

**Evidence.** S declared a HARD Lighthouse CWV gate whose `staticDistDir` pointed at a nonexistent
path; the fix landed two hours *after* the close merge. Gates authored green stayed green because
they never had contact with the defect.

**Law.** If the defect a wave addresses reproduces against today's tree, the wave opens RED and its
gate command **fails right now**, in the formation, with the failure pasted into the spec. A gate
that is green at authorship is presumed vacuous until proven otherwise.

---

## L-4 — Every banked row carries a *mechanically checkable* re-trigger

**Evidence.** Two banked rows, same tranche, opposite outcomes (MT-F013 / MT-F014):

- `useLayerTransition` was banked on prose — "retire if glass ships a public successor". Glass
  shipped `DockCrossfade` **in the very version we adopted**; nobody re-evaluated; the bank rotted
  into a live dual path.
- The `foundation.css` spectrum shim was banked on six conditions a script can evaluate. It is
  still correctly banked, and it will fire the moment Glass 8 lands.

**Law.** A bank states a condition a command can answer. "When X ships", "at the next consume",
"when convenient" are not conditions. The re-trigger is written as the command.

**Corollary.** Every bank is swept at every wave open, by running its command. A bank nobody runs
is a deferral wearing a bank's name.

---

## L-5 — Re-booking is forbidden; every carry gets BUILD, FOLD or RETIRE

**Evidence.** 233 deferrals and 72 silent drops across the arc. The ~5s boot has ridden **five
closes under four names** (S RP-2/L20 → T Q14/O-5 → U U-F3 → V′ CH-4). Renaming is the mechanism by
which a chronic survives.

**Law.** Every inherited row leaves this formation with exactly one of:
**BUILD** (a named wave owns it) · **FOLD** (into a named wave, with the row's identity preserved) ·
**RETIRE** (with a written rationale that survives adversarial reading).
The string "next tranche decides" — and every synonym — may not appear.

**Anti-rename rule.** A carry keeps its *original* identifier for life. A row that has worn more
than one name is a **disease row**, is listed with all its aliases, and deciding it is a wave of its
own.

---

## L-6 — A partial is not a completion, and a close document is not evidence

**Evidence.** N's FINAL says "N.W1–W9 landed"; N's own board says W6 died and W8/W9 were planned —
zero commits for all three, and the close was written by a *successor tranche* three weeks later.
J's FINAL certified "140/140 green" against a tree that did not exist until the next day.
`docs/tranches/N/audit/lanes/n-verify-V4.md` is cited four times as primary evidence — including for
the ruling that superseded tranche M — and **has never existed in any git object**.

**Law.** A close row cites a commit, a command with pasted output, or a committed artifact. A close
may not cite a document that the same close authored. Before any close cites a file, that file's
existence is verified (`git cat-file -e`), and the check is recorded.

---

## L-7 — π obligations name *committed* witnesses

**Evidence.** 91.8% of Q/R/S visual evidence — 574 of 625 files — is untracked behind
`.gitignore:34 *.png`. R's "π CLEAN" verdict rests on 108 screenshots of which **zero** are in R's
close commit.

**Law.** Every visual claim carries a **π obligation** (the pinned witness: matrix, route, selector,
and the committed path of the capture) and a **DELTA obligation** (the before/after pair proving the
change). A witness that is not committed does not exist. Where `.gitignore` would swallow it, the
wave force-adds it or the claim is not made.

---

## L-8 — Prefer structure over gates; the invariant that needs no gate is the one that survives

**Evidence.** The G/H invariant-codification pillar was deleted across three commits; three of its
six invariants have since regressed (`as unknown as` 2→17 in `src/`, `:deep(` 0→22 in `demo/`,
demo files >400 LoC 0→3). Meanwhile **`api/src` — 10,869 lines — still has `as any` = 0 and
`as unknown as` = 1, fourteen tranches after tranche L, with no gate still running** (MT-F021).

**Law.** Where a defect class can be made unrepresentable — by a type, a module boundary, a deleted
dual path, an API that cannot express the wrong thing — do that instead of adding a gate. Gates
decay; structure does not. Every wave states which of the two it is using and why.

---

## L-9 — Scope every measurement to source before believing it

**Evidence.** Twice in one session a count nearly became a false finding: `as any = 584` in `api`
was 584 in `node_modules/zod`+`mongodb` (source: **0**), and a `getTotalLength` "= 0" was the root
calling a `(d: string)` function with an object (MT-F019, MT-F021).

**Law.** Every count states its scope and excludes `node_modules`, `dist`, `test-results` and
vendored trees. Every hostile probe reads the signature before believing the output. A finding
whose measurement cannot be re-run from the stated command is not a finding.

---

## L-10 — Inherited claims are re-measured, never assumed

**Evidence.** Project memory asserted a `src/parsing/` tree that does not exist (MT-F007), a test
count of 1607 against a measured 346 (MT-F017), a shadcn file count for a directory that now holds
zero `.vue` files, and "reverted in K.W2.5" for a wave that **never ran** (corrected in memory this
session, verified by `git log`).

**Law.** Every number, path and status inherited from memory, a prior close, or a sibling repo's
prose is a **claim to re-measure**. The formation's premises are what it measured, and each premise
records the command that produced it.

---

## L-11 — Model declaration is a receipt, not a default

**Evidence.** Owner marks M-1/M-2: Opus 5 for all tasks, not Fable. The V·π audit brief is explicit
that "a model not literally served as Opus earns no requested-audit credit and is not relabeled".
One seat in this session self-reported a discrepancy between the harness label and its own
self-knowledge — and recorded it rather than resolving it, which is the correct behaviour.

**Law.** Every spawn declares `model` explicitly. Every report opens with a model receipt. An
undeclared or inherited seat is a defect, and its output carries no credit.

**RE-ASSERTED BY THE OWNER 2026-07-24: "All agents are to use Opus 5, mark."** This is not a default
to fall back to — it is a standing requirement on every seat this formation dispatches, at any depth,
including seats inside nested workflows.

**Verified, not asserted (2026-07-24).** Across all 51 harvested agent results:

```
seats inspected: 51
  49  opus-5   (explicit receipt, exact model id claude-opus-5[1m])
   2  no model receipt returned (parser-band `ground` seats — plain-string returns, not structured)
  'fable'  as a model value anywhere in the corpus: 0
  'sonnet' as a model value anywhere in the corpus: 0
  'haiku'  as a model value anywhere in the corpus: 0
```

Static check of every workflow script: zero non-Opus declarations; every `agent()` call site carries
`model: 'opus'`.

**Method note, recorded because it nearly became a false finding.** The first pass flagged a
history seat as NON-OPUS. It was the root's own regex matching the word "Fable" inside the seat's
sentence *"Declared Opus seat; not Fable, not Sonnet"* — an assertion of compliance read as a
violation. Cf. MT-F022: a grep that does not read the matched context manufactures findings.

**Gap closed:** a seat returning an unstructured string cannot carry a receipt, so the receipt is
now required *by schema* rather than by convention — every structured return declares
`modelObserved`, and a band whose seats return prose must state the model in the first line of that
prose. Two seats currently sit in that gap; they are recorded here rather than counted as compliant.

---

## L-12 — The witness environment must be able to see the defect

**Evidence.** The dev-server witness was declared "the spec's canonical environment" and is GREEN;
the production build has had no application in it (MT-F012). **The dev server cannot witness a build
defect and was used as the witness.** Separately, this session's own first visual audit produced 60
captures of the *same screen* while reporting 0 blank pages, 0 errors and 0 overflow, because it
navigated path URLs at a hash-router app (MT-F006).

**Law.** Every gate states the environment it runs in and what that environment is structurally
blind to. Performance and bundle claims are measured against the **built** artifact
(MT-F011) — never the dev server. Any per-route assertion must first prove the routes differ.

---

## The wave template these laws imply

```
WAVE <id> — <title>
  DEFECT      the reproduction, with its command and today's output
  BORN        RED | GREEN   (RED iff the defect reproduces today — L-3)
  SCOPE       exact files, exact end state
  STRUCTURE   what is made unrepresentable (L-8), or why a gate is unavoidable
  GATES       each: command · asserted product property · the input that makes it RED (L-2)
  π           matrix · route · selector · committed capture path (L-7)
  DELTA       before/after pair
  CARRIES     inherited rows, each BUILD | FOLD | RETIRE, original ids preserved (L-5)
  BANKS       each with its re-trigger written as a runnable command (L-4)
  ENV         where gates run and what that environment cannot see (L-12)
  COMPLETABLE the one-wave test from L-1, answered
```

---

## L-13 — Work that was paid for is harvested before anything is re-deployed

**Evidence.** This formation lost, and then recovered, a large fan-out twice. Of ~460 nested agent
seats dispatched across seven concurrent area workflows, ~30 completed before a session limit killed
the rest. The completed seats' output existed **only** in
`<session>/subagents/workflows/<runId>/journal.jsonl` — the root saw them as task notifications that
were truncated mid-sentence, and a compaction would have discarded them entirely. 48 agent results
carrying **244 defects** were sitting on disk unread while the root was preparing to re-run the very
same seats.

Worse than the waste: a re-run is not a re-read. Two runs of the "same" audit against a moving tree
produce different rows, so discarding completed work silently introduces drift and destroys the
provenance of anything already cited.

**Law.** After every workflow completion or kill, and **before** any re-deploy:

```
node docs/tranches/V/megatranche/workflows/harvest-journals.mjs
```

The harvest is idempotent and writes `registry/harvest/<workflow>.json` (raw, complete) plus
`registry/DEFECT-LEDGER.md` (readable, severity-ordered). **No seat whose rows are already in the
ledger may be re-run.** Re-deploy is always `resumeFromRunId`, never a fresh invocation, so completed
seats replay from cache.

**Corollary — a summary is not a result.** `componentsRun: 32` with every row `NO_JURY` and
`defectCount: 0` is a **failed** run, not a clean area. Before believing any workflow summary, read
its `<failures>` block and its journal. A rate wall converts fan-out into false-negative coverage,
and the false negative is indistinguishable from success in the return value.

**Corollary — concurrency is capped at 4 workflows** (owner instruction, 2026-07-24). The scale the
owner commissions is honoured *sequentially*, in batches of ≤4, never simultaneously. Prefer
finishing small bands completely over half-running large ones: a band at 100% yields adjudicated
findings, whereas two bands at 40% yield challengers with no jury.

---

## L-14 — The tri-fold law: hard work is done twice and believed once

**Evidence.** Owner constitutions M-12 (2026-07-27) and M-16 (2026-07-28). This formation's own
record argues for the independent shape:
the root manufactured seven false findings this session and caught them only by *independent
re-derivation* (MT-F006, MT-F019, MT-F021, the four of MT-F022); the history audit's strongest
convergence evidence was *independent rediscovery* of the same eight chronics by seats that could
not see each other. Independence is the only verifier this repository's history shows working.

**Law.** Prospectively, orchestration is GPT Sol xhigh. Mechanical and challenge work is GPT Luna
xhigh; if Luna is unavailable, work stops or the exact owner-approved substitute is recorded before
dispatch—no model is relabeled. Historical Fable/Opus receipts remain literal.
The toughest work — adjudication, design synthesis, parser candidates, wave authoring — runs
**tri-fold**: worker-S (Sol) and worker-L (Luna) execute the same brief blind to each other;
arbiter-S (Sol) agglomerates with sagacity and incredulity into one apotheosis. The arbiter is
not a merger: it must attempt to refute both workers before it may adopt either, and its output
records where the workers disagreed and which side won, with the evidence that decided it.

**Corollary.** A tri-fold whose two workers agree suspiciously well is re-examined, not celebrated —
agreement is only evidence when the workers were genuinely independent. Cache-replayed seats count
as the model that produced them, not the model law of the day (no relabeling; cf. L-11).

## L-15 — THE SESSION-DURABILITY EDICT (owner: "Lose no progress to session walls")

Derived from three measured wall events in ONE day (2026-07-27: ~5pm, ~10:50pm, + the mid-band
kill of 07-24). Binding on every session of this formation:

1. **Harvest is unconditional and immediate** — after EVERY workflow completion or failure
   notification, before any other action: `node docs/tranches/V/megatranche/workflows/harvest-journals.mjs`.
2. **Commit at every fold** — a completed band's artifacts (apotheoses, registries, witnesses,
   STATE.md) are COMMITTED in the same turn they land. An untracked witness "does not exist"
   (the AdminUsersPanel L-5 ruling); an uncommitted apotheosis is one `git clean` from nonexistence.
3. **Owner marks are secured FIRST** — screenshots arriving in volatile paths (TemporaryItems)
   are copied into `audit/visual/owner-marked/` with sha256s BEFORE any other work in the turn.
4. **STATE.md §RESUME is maintained at every deploy/fold** — run IDs, exact resume invocations,
   if-dead recipes, env relaunch commands. A fresh session resumes from disk alone.
5. **Rosters are files, not memories** — every workflow's args are banked under `workflows/args/`
   at launch time (recovered-from-transcript is the fallback, never the plan).
6. **/tmp is not durable** — any agent return that matters (receipts, deviations, flags) is
   banked into the megatranche tree in the turn it arrives.
7. **Walls are expected, not exceptional** — re-deploy is always `resumeFromRunId` with
   byte-identical args; completed seats replay from cache; a killed seat re-runs; NOTHING banked
   is ever re-run.
8. **Completeness is validated, never trusted** (owner edict 2026-07-28: "NO incomplete work").
   A workflow's own return is a CLAIM: wall-killed seats return null and can fold into a clean-
   looking result — three band records claimed full completion while 45 component rows had nothing
   banked (the palettes journal: 492 seats started, 38 returned). After EVERY workflow event and
   at every session open, run `node docs/tranches/V/megatranche/workflows/validate-completeness.mjs`;
   the truth is roster × axes vs disk ∪ harvest ∪ adjudicated, written to
   `registry/COMPLETENESS-LEDGER.md`. Exit 1 = unowned incomplete work = a standing violation:
   queue the exact resume in STATE.md §RESUME in the same turn. Every incomplete row must be
   owned by an ACTIVE or QUEUED resume at all times; work is DONE only when its ledger row reads
   ADJUDICATED or ON-DISK.
9. **The orchestrating shell never changes directory while workflows run, and workflow child
   paths are ABSOLUTE.** Measured failure (2026-07-28): a nested `workflow({scriptPath})`
   resolves a relative path against the HARNESS working directory, which the root shell's `cd`
   mutates for every running band — one mid-run `cd` into the megatranche dir instantly killed
   24 palettes children with a doubled path and would have done the same to every band's
   subsequent chunk. Cure at root: `SCRIPT` constants in orchestrators are absolute
   (`area-orchestrator.js` fixed 2026-07-28); root-shell commands use absolute paths.

## L-16 — Evidence modes never impersonate one another

**Evidence.** The 2026-07-28 consumer audit produced all of these in one pass:

- a Fourier CRUD E2E that used the UI for upload and direct API requests for later mutations;
- a populated Fourier Flagged panel that required a disposable database fixture because no public
  flag writer exists;
- value Admin empty states that were actually unauthenticated early returns;
- keyframes path-style probes that were invalid for its hash router;
- a value Admin Feature control that rendered and clicked but posted an invalid body and swallowed
  the error.

Treating any one of those as “frontend verified” would manufacture completion.

**Law.** Every operation/route claim is labelled **BROWSER-LIVE**, **BROWSER-FIXTURE**,
**API-TEST**, **SOURCE**, or **BLOCKED**. Only BROWSER-LIVE proves the frontend journey. A hotfix
records its blocker, exact root-seam cure, proof, and durability. Disposable witness infrastructure
is never product implementation and is removed at audit close.

## L-17 — Architecture is adjudicated by graph cluster, at Goldilocks grain

**Evidence.** The same audit measured:

- four type-inclusive value demo clusters, including a runtime Dock barrel loop and a seven-node
  Admin/provider inversion;
- one runtime keyframes demo orbital cluster plus type clusters;
- two runtime SCCs in parse-that despite 124 green tests;
- 28 value API test files inside source-owned `__tests__`;
- both extremes at once: 900/712/686-line leaves and scores of one-file/forwarding capsules;
- a stale current-DAG identity pin that made the validator red while its graph input hashes stayed
  unchanged;
- an alias-aware rerun that changed keyframes demo internal edges from 245 to 399 and Fourier web
  from 130 to 314, proving the content-addressed old instrument still omitted real topology.
- a stock value demo receipt that first mixed four `demo/test/**` nodes into its 251-node count;
  moving the newly authored test to root `test/demo/**` left a 250-node forensic count but the same
  247-node product slice; and target-path manifests whose exact 103/67 leaf shapes were inventories,
  not adjudicated topology.

File count, line count, and consumer count each failed as a sufficient architectural criterion.

**Law.** First make the graph authority complete for resolver aliases, CSS, render/DI/route/state/API,
worker/asset, package/test-boundary, and Python edges. Then work proceeds in dynamic SCC/feature
clusters. Two fresh GPT Sol xhigh critics independently
assume the cluster is wrong; a third GPT Sol xhigh arbiter attempts to refute both and records one
terminal topology. Each batch includes source nodes, public exports, external tests, and bounded
consumer cuts. It closes only when every node/edge/cycle is disposed and the replacement ownership
path is explicit. Graph layers classify product, test, support, generated, asset, and operation
files separately; module-isomorphic tests do not imply one test file per source file.

**Goldilocks tests.**

- Split a file only when the split names an invariant and reduces measured change coupling or edge
  pressure; line count alone cannot split it.
- Retain a directory only when it contains at least two cohering implementation leaves or enforces
  an independently meaningful public boundary.
- A file inside module `x/` omits `x` from its basename after the module boundary is accepted.
- Tests live outside source in an isomorphic ownership tree.
- Barrels exist only at published capsule boundaries, never for same-directory convenience.
- Delete only on semantic proof of vacuity/superfluity. Zero consumers alone is not proof.
- Breaking cuts migrate the whole bounded constellation in one release. No aliases, root shims,
  migration layers, dual paths, or masking fallbacks.
