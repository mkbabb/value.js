# CODEX TOOLING CENSUS — L-19 lens

**Lane:** codex-provenance / tooling · **Date:** 2026-08-03 · **Frame:** M-21 provenance fleet.
**Rule applied:** L-19 (`FORMATION-LAWS.md:411`) — "Contrived gates, visual testing scripts,
`proof:`-style or meta scripts are PRESUMED overfit contrivance… The burden of proof sits on the
artifact, not its challenger."

Every verdict below is backed by a command I ran or a byte I hashed. Nothing in
`~/.codex/**` or `~/Documents/Codex/**` was written, moved, cleaned, or re-run.

---

## 0. Census — what the Codex interim actually authored

Full script sweep under `docs/tranches/V/megatranche/` (`find … -name '*.mjs' -o -name '*.py' -o
-name '*.sh'`, node_modules pruned). **Only three script files carry an mtime at or after
2026-07-29 12:00** — the boundary after which the interim is Codex-authored:

| path | bytes | mtime | git state |
|---|---:|---|---|
| `workflows/validate-completeness.mjs` | 15,047 | Aug 3 10:35 | tracked, clean, last touched in `87f56f11` |
| `workflows/validate-constellation-dag.mjs` | 24,760 | Jul 29 21:26 | **untracked (`??`)** |
| `workflows/hydrate-reports.mjs` | 5,784 | Jul 29 13:37 | tracked, **39-line uncommitted diff** |

Everything else — all 24 `audit/probes/*.mjs`, all ~200 per-component probes, both `.py`
(`audit/components/SearchFilterBar/analyze-P5-contrast{,2}.py`, Jul 29 10:45), the sole `.sh`
(`audit/components/BrowsePane/probe-L6/novelty-scan.sh`, Jul 29 10:23), `workflows/*.js`,
`design/layout-gestalt-geo-probe.mjs`, `audit/visual/*`, `audit/telemetry/*` — predates the
Codex window. **No new probe, no new gate, no new `.py`, no new `.sh` was authored under
`megatranche/` after 07-29.** The interim's entire tooling output is: two validators and, outside
the repo, a 243 KB Python builder that produced nothing.

---

## 1. `workflows/validate-completeness.mjs` — the hash-banking rewrite

**Provenance.** Base version authored 2026-07-28 (`640652df`, "L-15.8 completeness law").
Rewritten in `87f56f11` (2026-08-03 10:39:58, "saturation GREEN 264/264"). Diff:
`git diff 9268f054 87f56f11 -- docs/tranches/V/megatranche/workflows/validate-completeness.mjs`.

**What it claims to prove.** For each of 88 roster slugs × 3 axes = 264 canonical challenge
files: (a) the *exact* filename exists, (b) it has a row in `registry/HYDRATION-LEDGER.md`,
(c) its current SHA-256 equals the ledgered one. Anything else is `ABSENT` / `NO-LEDGER` /
`HASH-DRIFT` (lines 80–95).

### 1a. VERIFIED — the GREEN is arithmetically true

I recomputed the whole ledger independently (Python, `hashlib.sha256`, read-only):

```
ledger rows: 283 · missing files: 0 · hash mismatch: 0
roster slugs: 88 (unique 88) · needed axes: 264 · no-ledger: 0
```

**Every one of the 264 canonical axes exists, is ledgered, and its bytes match.** The headline
number in `87f56f11` is not fabricated. That is the strongest single positive result of this lane.

### 1b. SUPERLATIVE — the rewrite killed two real contrivances

1. **Loose-filename coverage.** The pre-rewrite gather (`for (const f of files) { const m =
   /^challenge-([DLC])-/.exec(f); … }`) counted *any* file whose name began `challenge-D-`.
   The rewrite demands the exact `challenge-D-design.md`. This is not cosmetic: the ledger
   contains **19 rows for non-canonical names** the old code would have banked —
   `wb-extract-controls/challenge-D-design-pass2.md`,
   `wb-gradient-easingeditor/challenge-L-library-r4.md`,
   `wb-gradient-visualizer/challenge-C-implementation-r2.md`, and 16 more. Evidence-history
   files masquerading as seats is exactly the false accounting L-15.8 was written to stop, and
   the rewrite closed it.
2. **Hand-declared coverage.** The old file carried `const ACTIVE = new Set(['demo-workbenches',
   'palettes']); const QUEUED = new Set([]);` — a human-maintained escape hatch that let an
   author declare a failing band "covered". The rewrite derives coverage from the durable run
   record (`coverageFor`, lines 158–178) and adds a genuine third state,
   `BLOCKED-ON-CAPACITY`, for a terminal record whose `componentsRun < componentsRequested`.
   This is real de-contrivance, and it is the opposite of what L-19 presumes.

### 1c. DEFECT (severe) — the committed toolchain cannot reproduce its own GREEN

`validate-completeness.mjs:62` requires a **64-hex** ledger hash:

```js
const match = /^\| (audit\/components\/[^|]+?) \| [^|]+ \| `([0-9a-f]{64})`/.exec(line);
```

The **committed** `hydrate-reports.mjs` writes a **16-hex** hash:

```
-  '| canonical path | status | sha256 (first 16) | source harvest | payloads |',
-  ...rows.map((r) => `| … | \`${r.hash.slice(0, 16)}\` | …`),
```

(that is the `-` side of `git diff docs/tranches/V/megatranche/workflows/hydrate-reports.mjs` —
i.e. what is in HEAD). The 39-line edit that widens the hash to 64 and adds `EXISTS-DIRECT`
**is uncommitted working-tree state.** So: check out `87f56f11` clean, run the prescribed
sequence (`hydrate-reports.mjs` then `validate-completeness.mjs`, per
`hydrate-reports.mjs:5` and the M-16 comment), and **every one of the 264 axes becomes
`NO-LEDGER`, all 88 components become `UNCOVERED`, and the validator exits 1.** The committed
ledger was produced by a script that exists only in one person's working tree. The
`saturation GREEN 264/264` claim is true today and unreproducible from the repository.
`git status` confirms: ` M docs/tranches/V/megatranche/workflows/hydrate-reports.mjs`.

### 1d. DEFECT (severe) — one whole band is hard-wired exempt

```js
'frontend-omissions': 'UNASSIGNED-FRONTEND-OMISSIONS',   // line 24
…
if (runId === 'UNASSIGNED-FRONTEND-OMISSIONS') {          // line 159
  return { status: 'QUEUED', covered: true, detail: 'no run ID assigned' };
}
```

A magic string makes a band unconditionally `covered: true`, so its rows can never reach
`uncovered` and can never set exit 1. Look at what that band actually is, from
`registry/COMPLETENESS-LEDGER.md`:

```
| picker-componentsliders-consolerail | CDL | CDL | — | BANKED |
| picker-colorcomponentdisplay        | CDL | CDL | — | BANKED |
| picker-debugeventlog                | CDL | CDL | — | BANKED |
| picker-pointerdebugoverlay          | CDL | CDL | — | BANKED |
| shell-dock-actiontoolbar            | CDL | CDL | — | BANKED |
| shell-dock-parseechoreadout         | CDL | CDL | — | BANKED |
| shell-dock-genericactionbar         | CDL | CDL | — | BANKED |
```

`harvest axes: —` for all seven. **21 axes marked BANKED with no run record, no run ID, and no
harvested payload.** All 21 are `EXISTS-DIRECT` rows (see §2). The band was created in the same
commit that declared GREEN, and it is the band with zero executed workflow evidence.

### 1e. DEFECT — the non-band section's stated law has no failure mode

The section header (line 264) says "every run record must be completed **+ harvested**". The
code (line 275):

```js
if (run.status !== 'completed' && !disposition) incomplete.push({ … });
```

The harvest half never fires. The live ledger prints `| wf_4a8ad4ff-130 | completed | 0 |
**NOT HARVESTED** |` and `| wf_c88c8125-52c | completed | 8 | 3 |` (8 agents, 3 results
harvested — 5 seats' work unaccounted) and still ends `**GREEN — zero incomplete components.**`
Two columns of the table are decorative.

### 1f. L-19 CAVEAT — 51 of 283 rows are self-certifying

`hydrate-reports.mjs` computes the hash *from the file on disk*; `validate-completeness.mjs`
then confirms the file on disk still hashes to that. For the 232 `EXISTS-ORIGINAL` rows there
is an independent cross-check (a harvest payload declared that exact `reportPath`). For the
**51 `EXISTS-DIRECT` rows there is none** — the file is banked because it is there. Run the two
scripts back to back, as the docs instruct, and that check is a tautology; the ledger and
completeness runs are 10 minutes apart (`HYDRATION-LEDGER.md` Aug 3 10:29,
`COMPLETENESS-LEDGER.md` Aug 3 10:39). It rises above tautology only because the ledger is
committed — post-commit mutation *is* detectable. The prose ("exact path + current hash are the
**durability truth**") overstates what 51 of those rows can carry. Distribution:
`palettes 25 · frontend-omissions 21 · demo-workbenches 5`.

Content spot-check of the smallest `EXISTS-DIRECT` files:
`PaginationBar/challenge-C-implementation.md` = 1,006 B; `UserSortMenu/challenge-C-implementation.md`
= 1,063 B; against `wb-mix-animationcanvas/challenge-L-library.md` = 44,920 B. A 45× spread inside
one "banked" status — the gate measures existence, never substance.

**VERDICT — ADOPT WITH AMENDMENT.** This is the best thing Codex produced and it does catch real
drift (§1b). Three fixes before it can be trusted as a gate: (1) commit the `hydrate-reports.mjs`
edit or the GREEN is not reproducible; (2) delete the `UNASSIGNED-FRONTEND-OMISSIONS` exemption
and give that band a real run; (3) make `NOT HARVESTED` / agents≠results fail, per the section's
own stated law.

---

## 2. `workflows/hydrate-reports.mjs` — Claude baseline + an uncommitted Codex edit

**Provenance.** Committed 2026-07-28 (`37ee17dd`, M-16). The 39-line working-tree diff
(`EXISTS-DIRECT` + full-width hashes) is Codex-era and uncommitted.

**What it proves.** That a challenge seat's *content* survived, either as its own file or
materialized verbatim from the returned payload. Lines 73–97 stamp hydrated files with a
provenance header naming harvest file, agent id, and payload count — that is honest archaeology,
and the distinction between "the file survived" and "we rebuilt it from the payload" is exactly
the right one to make.

**Can it fail?** Partially. `UNPARSEABLE-PAYLOAD` is a real state (line 72). But the live totals
line reads `232 original · 51 direct · 0 hydrated · 0 unparseable` — **the hydration function
has never once fired.** In its current state the script is a hash recorder, not a hydrator.

**The Codex edit is the load-bearing one.** `EXISTS-DIRECT` (lines 101–112) is what made 51
payload-less files bankable, including all 21 axes of the exempt band in §1d. It is scoped
defensively (current-roster canonical paths only, so `-r3`/`-pass2` names cannot enter by this
route — good), but it is the mechanism by which "banked" stopped meaning "a seat returned this".

**VERDICT — ADOPT, COMMIT, AND RENAME THE STATUS.** `EXISTS-DIRECT` should read
`UNWITNESSED-DIRECT` in the ledger so a reader cannot mistake it for returned work.

---

## 3. `workflows/harvest-journals.mjs` — Claude baseline (unmodified)

`5,445 B`, mtime Jul 24 16:55, tracked, no diff. Untouched across the entire Codex interim.

**What it proves.** That completed agent results are pulled out of
`<session>/subagents/workflows/<runId>/journal.jsonl` and onto disk before a compaction discards
them. Its docstring states the exact failure it exists to prevent — truncated task notifications
plus session-limit kills — and states its own idempotence contract.

**Can it fail?** It is a harvester, not a gate, so "failure" is the wrong frame; what matters is
that it is the *sole* source of the 232 payload paths. Everything downstream — the hydration
ledger, the completeness ledger, the 10.5 MB `registry/DEFECT-LEDGER.md` — is derived from its
output. Remove it and the whole accounting apparatus has no inputs.

**SUPERLATIVE — this is the tooling that genuinely earns its keep**, and the fact that the Codex
interim did not touch it is to its credit. Minor caveat: the `NAMES` runId→label map is
hand-maintained, with a documented fallback to the raw runId (so a new workflow still harvests).

**VERDICT — ADOPT UNCHANGED.**

---

## 4. `BUILD-V12.py` — TERMINAL CONTRIVANCE

`~/Documents/Codex/2026-08-02/parser-novelty-v12-construction/BUILD-V12.py`
243,827 B · 2,346 lines · `sha256 0732ebc27bc712d64d0b6ade30db13b9d8c7817524268af7d3d7474654b64ee8`
(read and sampled only; never executed, never imported, nothing in that tree touched).

### 4a. It produced nothing

`build()` writes to `/Users/mkbabb/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v12/outputs`.
`ls -d ~/Documents/Codex/2026-08-02/parser-novelty-and-experiment-v*` returns **v1…v11 and no v12**.
`build()`'s first statement (line 1141) is `if V12.exists() or V12.parent.exists(): raise` — so a
successful materialization is impossible to have happened and been removed without leaving the
parent. Every Codex receipt agrees: `targetState: ABSENT`, `packetMaterialized: false` — in all
nine `PARSER-NOVELTY-V12-*.json` receipts.

### 4b. Eight revisions in under two hours, all RED, and the final one unreviewed

From the receipts at
`~/Documents/Codex/2026-07-30/constellation-nonparser-convergence/outputs/evidence/crossrepo-v5-source-review/`:

| bytes | sha256 (12) | recorded disposition |
|---:|---|---|
| 143,048 | `166b1de27197` | falsifier `RUN_PLAN_AUTHENTICATED_CHOSEN_ARTIFACTS_WITHOUT_REQUIRING_ALL_J1_W1_D1_CANDIDATES` |
| 147,554 | `8f2ce7a3a5e7` | superseded |
| 158,878 | `7410563f2b78` | falsifier `EXACT_CARTESIAN_LABELS_DID_NOT_ATTEST_EXECUTED_ARTIFACT_IDENTITY` |
| 173,984 | `40885c8a8ff9` | reviewSet: standards CLEAN, **mechanics RED**, **semantics RED** |
| 205,775 | `3ccb5458b62a` | superseded |
| 213,181 | `148fe02dfa6a` | `TERMINAL_THREE_REVIEW_SOURCE_RED` |
| 223,116 | `a83ff07a4146` | **second pass 3/3 TERMINAL_RED** |
| **243,827** | **`0732ebc27bc7`** | **no receipt names this hash — never reviewed** |

The three second-pass falsifiers, all `TERMINAL_RED`, on the 223,116-byte revision:
`OR04_STAGE_UNION_NOT_EXHAUSTIVE_OVER_INHERITED_RUNTIME_IDENTITY_AND_EXIT_FIELDS` (standards),
`OR05_CONDITIONAL_DERIVED_FIELD_SELECTOR_OUTSIDE_RUN_KIND_DOMAIN` (mechanics),
`S01_TARGET_FIXTURE_ID_HASHED_BUT_SEMANTICALLY_DETACHED` (semantics). After 3/3 RED the file grew
another **20,711 bytes** and stopped. Growth across the day: **143 KB → 244 KB (+70%) with zero
product and zero accepted review.** Predecessor scale: `BUILD-V9.py` 51,926 B, `BUILD-V10.py`
51,282 B, `BUILD-V11.py` 133,083 B.

`__pycache__/BUILD-V12.cpython-314.pyc` header decodes to source mtime `2026-08-02 11:36:30`,
source size `142,143` — **no snapshot of the final 243,827-byte file was ever even compiled.**

### 4c. The mechanism cannot fail for its intended reason

`make_source` (line 679) constructs the v12 "auditor" by taking v10's shipped auditor **verbatim**
and doing a blind global string substitution over 173,862 bytes of JavaScript:

```python
source = verify_regular(V10_SOURCE / "audit-packet-v10.mjs", "9219caf7…", 173862)
          .decode("utf-8").replace("v10", "v12")          # line 690
```

then splices in the expectations — including, at line 757:

```python
hard_pins = {"matrix": sha256(matrix_bytes), "contract": sha256(contract_bytes),
             "markdown": sha256(markdown_bytes), "predecessor": sha256(predecessor_bytes)}
source = re.subn(r"const HARD_PINS = \{.*?\};", "const HARD_PINS = " + json.dumps(hard_pins…
```

**The auditor's `HARD_PINS` are the SHA-256 of the four artifacts the same process is about to
write, computed from the same in-memory bytes.** A packet audited against hashes derived from
itself carries zero information. Dry-run output reports `sourceBytes: 1,738,935` — a 1.7 MB
generated auditor grown from a 173 KB template (v11's was 1,119,023 B).

### 4d. The V11 falsifier was cured by making the check unfailable

The V11 terminal ruling
(`parser-novelty-v11-terminal-static-ruling/outputs/PARSER-NOVELTY-V11-TERMINAL-STATIC-RULING.json`)
named a genuine defect at `audit-packet-v11.mjs:18048`, `owningCheck: verifyCanonicalMarkdown`:
the auditor's `MARKDOWN_PREFIX` required a sentence the frozen Markdown did not contain, so
"the generated packet cannot satisfy its own canonical Markdown predicate."

Its `successorLaw` prescribed the cure:
`canonicalMarkdownPrefixMustBeRenderedOnceAndSharedByWriterAndVerifier: true`. V12 implements it
literally — line 24 defines `MARKDOWN_PREFIX`, line 101 renders the Markdown with it, and lines
698–711 splice **that same Python literal** into the generated JS as the verifier's constant:

```python
markdown_framing = ("const MARKDOWN_PREFIX = " + json.dumps(MARKDOWN_PREFIX.decode("utf-8"), …
source, markdown_framing_count = re.subn(r"const MARKDOWN_PREFIX = .*?;\nconst MARKDOWN_SUFFIX = .*?;", …
```

Writer and verifier now hold the identical literal. The predicate is true by construction and can
never fire again. **The remedy for a check that failed was to make the check unfailable.** That is
the textbook L-19 shape.

### 4e. What is salvageable

Exactly one component: `tokenize_executable` / `scan_executable_source` (lines 121–349) — a
hand-rolled JS tokenizer producing an ordered call-site census (`orderedCallSiteCount: 522`).
It is real, self-contained code that could serve a genuine "no dynamic import / no template
injection" policy. Even it is pinned to a magic constant — `EXPECTED_EXECUTABLE_REPORT_SHA256 =
"41d5fb84ed9ea3d645736e367758b090b8845fea7d0300760fccc84afbe74d39"` (line 34), compared at line
2290 — which makes it a change-detector, not a correctness check.

### 4f. SUPERLATIVE — the receipts are excellent even though the artifact is worthless

Credit where it is owed, and it is owed loudly:

- The **V11 terminal ruling names file, line, owning check, expected failure code, and the exact
  divergent sentence**, and states plainly that the packet cannot satisfy its own predicate. That
  is a better falsifier record than most of the Claude-era challenge reports.
- Every V12 receipt records `credit: {experiment:0, novelty:0, parserExecution:0, product:0,
  release:0, rebind:0}`, `authority: NONE`, `materializationAuthorized: false`. **Codex never once
  claimed credit for this.** The failure is one of judgement (eight revisions of a thing that
  should have been abandoned at the first RED), not of honesty.
- `PARSER-NOVELTY-V12-CONSTRUCTION-ROOT-CONTAMINATION-RECEIPT-v1.json` records the `__pycache__`
  residue as `CONTAMINATED_PENDING_OWNER_ADJUDICATION`, `creator: UNKNOWN`, with all three
  reviewers denying they created it, `cleanupAuthorized: false`, `cleanupPerformed: false`. It
  preserved evidence it could not explain rather than tidying it away.
- I verified the receipted pyc identity: `shasum -a 256` →
  `de1d62ff18da4851968136b1e3190c00f6c463b9b8a5e7b5d23103155cc00937`, 154,221 B — **exactly** as
  receipted. Their measurements are trustworthy.

**VERDICT — RETIRE. Terminal contrivance, not salvageable.** Preserve as evidence per owner law;
never resume the vN ladder. If the underlying goal (a source-only parser-novelty boundary) is
still wanted, it needs a fresh statement of what property is being proven, in under 200 lines, by
someone who is allowed to say "this cannot be proven statically."

---

## 5. `workflows/validate-constellation-dag.mjs` — RED, unreferenced, out-of-repo authority

**Provenance.** 24,760 B, Jul 29 21:26, **untracked** (`?? docs/tranches/V/megatranche/workflows/validate-constellation-dag.mjs`).

**I ran it** (it performs no writes — verified by grep for `writeFile|appendFile|mkdir|unlink|execSync|spawn`, zero hits):

```
$ node docs/tranches/V/megatranche/workflows/validate-constellation-dag.mjs ; echo $?
{"ok": false,
 "baseErrors": ["V.form.packet-post-CA01 evidence bytes do not match
   /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/VALUE-FORMATION-PACKET-2026-07-29.md"]}
1
```

**It fails on its own base graph.** Root cause: its evidence authority lives **outside the
value.js worktree**, in a Codex worktree. That file exists but was rewritten after the validator
was pinned — validator mtime Jul 29 21:26, evidence mtime **Aug 2 05:26**, current
`sha256 d07b6ddc5cf0d673b37d696c8e940fec974227a129d2f614f89f7b305ffb14e6`. There is **no in-repo
copy** of `VALUE-FORMATION-PACKET-2026-07-29.md` (`ls` → No such file or directory). The validator
is therefore unrunnable by anyone who does not have `~/.codex/worktrees/7e28/` in the state it had
on 07-29, which is nobody, including its author.

**Referenced by nothing.** `grep -rn "validate-constellation-dag" *.md coordination/*.md` under
`megatranche/` returns zero hits. `FORMATION-LAWS.md` names only `harvest-journals.mjs` (lines
244, 292) and `validate-completeness.mjs` (line 311).

**SUPERLATIVE inside it, and it is real.** Lines ~561+ implement a mutation harness:

```js
function expectReject(id, mutate) {
  const candidate = clone(); mutate(candidate);
  const errors = validate(candidate);
  if (!errors.length) throw new Error(`${id} was falsely accepted`);
}
```

It deliberately corrupts its own graph — removes edges, relabels nodes, injects a stale
`"Value W3"` prerequisite, shrinks the 29-row mutant inventory — and demands each corruption be
rejected. **That is the single best-engineered validation idea in this entire census: a gate that
proves it can fail.** It is the direct answer to L-19's burden of proof, and no other artifact
here attempts it.

Against that: `exactCoverageBindings` is nine hardcoded 64-hex constants (lines 36–46) and
`exactCoverageAuthorityFiles` hardcodes absolute `~/.codex/worktrees/...` paths. Baked expected
values can only ever confirm the state at authoring time.

**VERDICT — RETIRE AS-IS, SALVAGE THE HARNESS.** Delete or repoint the out-of-repo authorities;
port `expectReject` into `validate-completeness.mjs`, which currently has no self-test at all.

---

## 6. `audit/probes/*.mjs` — the born-RED probes (all Claude-era, all pre-Codex)

24 probes in `audit/probes/`, mtimes Jul 24–Jul 27. **Codex authored none of them.** Sampled three;
ran the two that do not need a live dev server.

### 6a. `r1-published-totality.mjs` — STILL RED, reproduced exactly

Its docstring claims: *"RED today: 324 throws / 1548 calls, all one failure mode, all from
`src/css/grammar.ts:181`."* I re-ran its core assertion directly against the built artifact
`dist/subpaths/css.js` (Jul 29 13:48) — same corpus, same 9 functions:

```
RED parseCssColor            102/172
RED parseCssScalar           102/172
RED parseCssValue             60/172
RED parseCssValues            60/172
ok  parseKeyframeSelector      0/172   (+4 more ok)
TOTAL 324 / 1548
MODES [ "TypeError: Cannot read properties of undefined (reading 'replace')" ]
```

**324 / 1548, one distinct failure mode — byte-identical to the docstring.** Mechanism confirmed
live: `src/css/grammar.ts:181` is
`const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");` — the non-null
assertion on `slash[0]` is the throw site. Note `grep -c "throw " src/css/*.ts` returns **0 for
grammar.ts** — this is an *implicit* TypeError, which is why a source-level "no throws" grep would
miss it and the probe does not. The probe asserts one property, cites the mechanism, and makes the
exit code the assertion. **ADOPT.**

### 6b. `library-band-gates.mjs` — RED with 12 source-cited assertions

```
$ node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs ; echo $?
… RED — 12 failing assertion(s)
1
```

Every line names a mechanism, not a vibe: `easing(name)` reachable through
`Object.prototype` (`src/easing.ts:168` `if (!(name in PRESETS))`, `:169` destructures);
33 bare `declare` in the emitted subpath `.d.ts`; 5 mangled duplicate colour declarations
(`Alpha_2`, `Channel_2`, `Color_2`, …) with 58 references in `css.d.ts`; `./css` returns
`CssValue`/`CssScalar`/`CssCall`/`CssList` but cannot name them. Its docstring even explains why it
is *not* redundant with `r1-published-totality.mjs` (that probe's FNS list is the 9 CSS parsers;
15 of LIB-02's 33 throwers are outside it). **ADOPT.**

**One L-19 caveat:** LIB-05, "the god-module cap, measured over src/ only" — a hard 350-LoC
threshold flagging 5 files. It is the only block here that goes GREEN by *moving lines* rather
than fixing a defect. Keep it as a report, drop it from the exit code.

### 6c. `hashprobe.mjs`, `boot-exec-probe.mjs` — instruments, not gates

Pure Playwright observers. Zero writes (`grep -c writeFileSync` → 0). They `console.log` a
signature and exit 0 regardless of what they see: `hashprobe.mjs` prints route/textLen tuples,
`boot-exec-probe.mjs` prints `vueApp`, `appChildren`, console tail. **They cannot fail.** That is
legitimate for an instrument and illegitimate for a gate — the distinction is not marked in the
files, and both live in a directory called `probes` alongside things that do exit 1. Recommend a
one-line header convention (`INSTRUMENT — exit code carries no verdict`) rather than retirement.

---

## 7. Roll-up

| artifact | author | proves | can fail for its reason? | verdict |
|---|---|---|---|---|
| `harvest-journals.mjs` | Claude | agent results reach disk before compaction | n/a (harvester); sole input to everything downstream | **ADOPT unchanged** |
| `r1-published-totality.mjs` | Claude | published CSS parsers are total | **yes — RED now, 324/1548 reproduced** | **ADOPT** |
| `library-band-gates.mjs` | Claude | 5 library-surface laws, exit 1 | **yes — 12 RED, exit 1** | **ADOPT** (drop LIB-05 from exit code) |
| `validate-completeness.mjs` | Codex rewrite | 264 canonical axes exist + hash-match | yes (ABSENT/NO-LEDGER/HASH-DRIFT) but 3 holes | **ADOPT with amendment** |
| `hydrate-reports.mjs` | Claude + Codex edit | seat content survived, hashed | partly (`UNPARSEABLE`); hydration never fired | **ADOPT, commit, rename EXISTS-DIRECT** |
| `hashprobe.mjs`, `boot-exec-probe.mjs` | Claude | nothing — they observe | **no** | keep, label INSTRUMENT |
| `validate-constellation-dag.mjs` | Codex | a DAG's shape + evidence hashes | **yes, and it is failing right now**; authority out-of-repo | **RETIRE as-is, salvage `expectReject`** |
| `BUILD-V12.py` | Codex | nothing; pins itself against itself | **no** — `HARD_PINS` derived from its own output | **RETIRE — terminal contrivance** |

**L-19 scorecard.** The presumption was correct for the two heaviest Codex artifacts and wrong for
the one it rewrote. `BUILD-V12.py` is the purest specimen of the failure mode the law describes:
244 KB, eight revisions, 3/3 TERMINAL_RED, zero output, and a self-derived pin that guarantees the
auditor agrees with the auditee. `validate-constellation-dag.mjs` is contrivance with a genuinely
good idea buried in it. But `validate-completeness.mjs` **earns its keep** — it removed a
hand-declared coverage escape hatch, it closed a loose-filename hole worth 19 rows of false
accounting, and its 264/264 GREEN reproduces byte-for-byte under independent recomputation. The
census does not support "Codex tooling is contrivance"; it supports "Codex's *validators* got
better and its *builders* went terminal."

**The one thing a reader should act on first:** commit the `hydrate-reports.mjs` diff (§1c). Until
that lands, the megatranche's headline saturation claim cannot be regenerated from the repository
by anyone.

---

### Commands used (all read-only)

```
find docs/tranches/V/megatranche -name node_modules -prune -o -type f \( -name '*.mjs' -o -name '*.py' -o -name '*.sh' \) -print
git diff 9268f054 87f56f11 -- docs/tranches/V/megatranche/workflows/validate-completeness.mjs
git diff docs/tranches/V/megatranche/workflows/hydrate-reports.mjs
python3  # recompute all 283 ledger hashes + roster cross-product
node docs/tranches/V/megatranche/audit/probes/library-band-gates.mjs        # exit 1
node docs/tranches/V/megatranche/workflows/validate-constellation-dag.mjs   # exit 1
node --input-type=module -e '<r1 totality corpus against dist/subpaths/css.js>'   # 324/1548
shasum -a 256 ~/Documents/Codex/2026-08-02/parser-novelty-v12-construction/BUILD-V12.py
shasum -a 256 ~/Documents/Codex/2026-08-02/parser-novelty-v12-construction/__pycache__/BUILD-V12.cpython-314.pyc
```

Nothing under `~/.codex/**` or `~/Documents/Codex/**` was written, moved, cleaned, or executed.
`BUILD-V12.py` was read and sampled only.
