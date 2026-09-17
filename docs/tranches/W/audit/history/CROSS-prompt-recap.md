# CROSS SEAT — PROMPT-RECAP COMPLETENESS (hostile historical audit)

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`.
This receipt is my own observation of the serving tier, not a claim recovered from
configuration; no `CLAUDE_CODE_SUBAGENT_MODEL` override exists in any settings file
(`~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json` — grep 0 hits).

Subject: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Scope of write authority exercised: this file only.

---

## 0. The verdict in one line

**`docs/tranches/V/vnext/PROMPT-RECAP.md` is not a recap of the owner's prompts.** It is a
recap of two keyframes-authored seed letters, it was written *before* 69 of the 181 canonical
prompt events existed, and on a 35-row sample **18 rows (51%) have zero phrase-level grounding
in the 181-event owner corpus**. The standing edict it purports to discharge — *"Recap ALL of
our prompts and requests hitherto… Silent drops are forbidden"* — is **NOT DISCHARGED**. The
obligation has now ridden two closes un-decided (RF-20 → W56 → the 07-20 rewrite from a
different seed) and is therefore, by the owner's own definition, a **DISEASE ROW**.

---

## 1. Method (reproducible)

```
# 181 canonical events, three Codex sessions
$ ls docs/tranches/V/apotheosis/pi/formation/session-audit/raw-prompts/
INDEX.json  bbnf-greenfield-coordination.md  value-tranche-v-formation.md  value-v-pi-refinement.md

$ grep -o "Classification: \`[a-z-]*\`" *.md | sort | uniq -c
  120 cross-thread-delegation
   31 direct-user-prompt
   30 user-prompt-with-ide-context      # → 61 owner-authored, 120 relayed
```

Owner-authored bodies were extracted verbatim (IDE-context blocks elided at the
`## My request for Codex:` boundary) to a working corpus of 61 prompts / 580 lines.
Every claim below is a command, a `file:line`, or a quoted document line.

---

## 2. MEASURED TRUTHS — canon vs. the number I actually measured

| # | Claim in canon | Claimed | Measured | Verdict |
|---|---|---|---|---|
| T1 | `PROMPT-RECAP.md` recaps the owner's prompts ("Mega-Tranche Prompt Recap") | all prompts | authored `2026-07-20T11:25:23Z`; **69 of 181 events post-date it**, 29 of them owner-authored | **FALSE — structurally impossible** |
| T2 | Row grounding in the owner corpus | implied total | 35-row sample: **17 grounded / 18 UNGROUNDED (51%)** at phrase level | **HALF-VACUOUS** |
| T3 | "The adjudicated registry contains **193 direct waves**" | 193 | `node docs/tranches/V/vnext/tools/validate-formation.mjs` → `"total": 193, "edges": 797`, exit 0 | **TRUE** |
| T4 | "`SEED-ROW-INVENTORY.json` binds the 149 kickoff/P1–P5 requirements" | 149 | `rows` length = **149** | **TRUE** |
| T5 | "`HANDOFF-BOUNDARY-INVENTORY.json` … 30 P0 and nine P6 blocks" | 39 | `rows` length = **39** | **TRUE** |
| T6 | "Whole-formation credit is **0/2**" (PROMPT-RECAP) | 0/2 | `FORMATION-CLEAN-PASSES.json` → `status = clean`, `passes[].verdict = CLEAN, CLEAN` | **CONTRADICTED in-directory** |
| T7 | Two hostile clean passes were adversarial | adversarial | 6 seats × `findings=0, unsupported_claims=0, orphan_demands=0` | **VACUOUS** |
| T8 | "Spend little time on contrived gates or process" (owner, ×2) | little | `docs/tranches/V/vnext/tools/` = **44 files / 9,837 LOC** of validators | **INVERTED** |
| T9 | R1 `parseCssColor("oklch()")` shipping crash (gate verdict 07-20) | defect row | **REPRODUCED at HEAD today** (§4.2) | **STILL LIVE** |
| T10 | "Tests… displaced into a file structure isomorphic to the source" | isomorphic | displacement ✓ (0 colocated in `src/`, `demo/`); isomorphism ✗ — `test/parsing/` has no `src/` peer, 20 flat files vs 5 src dirs | **HALF-DONE** |
| T11 | "Grouped files… should always have their module name stripped" | 0 violations | **8 violations** (§5, F-10) | **VIOLATED** |
| T12 | value.js is the constellation producer (no consumer edge) | acyclic | `package.json` `dependencies` = `{@mkbabb/glass-ui ^7.0.0, @mkbabb/keyframes.js ^6.0.0}`; published 4.0.0 has `dependencies: None` | **CYCLE ARMED, UNPUBLISHED** |
| T13 | MEMORY.md: "Grammar files: `src/parsing/grammars/*.bbnf`… `test/bbnf-equivalence.test.ts`" | present | `find . -name "*.bbnf"` → **0 files**; that test does not exist | **STALE CANON** |
| T14 | `precepts/` governs specification (owner ×3) | pursuant | `grep -ci precept PROMPT-RECAP.md` → **0**; 1 of 69 `vnext/` files mentions it | **UNBOUND** |

---

## 3. FINDINGS

### F-01 · BLOCKER · The recap cannot recap — authorship precedes the corpus

`PROMPT-RECAP.md` mtime `2026-07-20T11:25:23Z`. Of the 181 canonical events, **69 occur after
that instant**, 29 of them owner-authored — including the three most consequential steering
prompts of the entire program:

- `value-v-pi-refinement #004` (2026-07-22T03:21Z) — *"Most of this sounds like contrivance and
  bullshit… parse-that is a generalized combinator framework. Why do we have a scanner?"*
- `#005` (04:45Z) — *"The atom framework is so profoundly un-idiomatic that it's repugnant…
  You do NOT need a lexical layer. This is a combinator framework, mate."*
- `#006` (04:51Z) — the **3×5×3 law** (three prototypes / five skeptics / three adjudicators).

Its own authority statement forecloses the possibility: *"This tranche is formed from exactly two
seed letters"* — both keyframes-authored (`keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md`,
`…-vnext-formation-handoff.md`; both present on disk, 20,179 B / 32,719 B). The value.js Codex
prompt corpus is not among its inputs.

### F-02 · BLOCKER · R1 is a live shipping crash, re-deferred behind a 0-of-52 mirror

The gate verdict (`apotheosis/parser-proof/GATE-VERDICT.md`) named it 2026-07-20:
> *"`parseCssColor("oklch()")` (and `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`) throws
> `TypeError` from `parseFunctionalColor` (`src/css/grammar.ts` ~L181) — the frozen public
> contract says clean `ok:false`."*

Reproduced at HEAD `c654824e` today (esbuild bundle of `src/css/index.ts`, node):

```
oklch()            => THREW TypeError: Cannot read properties of undefined (reading 'replace')
rgb()              => THREW TypeError: ...
hsl()              => THREW TypeError: ...
lab()              => THREW TypeError: ...
color()            => THREW TypeError: ...
rgba()             => THREW TypeError: ...
oklch(0.5 0.1 200) => {"ok":true,"value":{"space":"oklch",...}}
```

Root cause on disk: `src/css/grammar.ts:178` — `splitTopLevel(slash[0]!.replace(/,/g," "), "space")`
with `slash[0]` undefined for an empty body.

**The close-class lie here is #6 (re-booked chronic) compounded with #8 (partial counted as done).**
The gate's own disposition is *"4.0.0 is immutable; the mirror swap is the cure"* — but the same
gate measures the mirror at **0 TOTAL of 52 frozen exports**. A cure with zero coverage is not a
cure; it is a re-deferral. The gate also reads RED and then recommends a "staged reading" under
which execution may begin — a self-issued release from its own RED.

### F-03 · BLOCKER · The formation clean-pass gate cannot fail

`docs/tranches/V/evidence/vnext-clean-passes/61d4954f…/FORMATION-CLEAN-PASS-1-A.prompt.txt`,
final line of the contract:

> *"CLEAN requires matching epochs, successful commands, twelve CLEAN rows and empty defect vectors."*

**What exact input makes this RED?** Only a validator script that exits non-zero. Every one of the
twelve probes is a `--selftest` or a validator authored by the same formation
(`validate-api-contract.mjs --selftest`, `resolve-consumer-universe.mjs --selftest`,
`deletion-judgment.mjs --selftest`, …). A *formation defect* — a wrong wave, a mis-assigned owner,
a dropped prompt — cannot turn any of them red. **The gate is vacuous.** I name the input that
should have reddened it and did not: the 29 owner prompts of F-01, none of which any of the twelve
domains inspects.

Result, all six seats (2 passes × critic_a / critic_b / adjudicator):

```
FORMATION-CLEAN-PASS-1-A|1-B|1-ADJ|2-A|2-B|2-ADJ .report.json
  verdict=CLEAN  findings=0  unsupported_claims=0  orphan_demands=0  served=gpt-5.6-sol
```

Zero findings from six hostile seats over a 193-wave, 69-file formation. And the machinery
**punishes analysis**: `FORMATION-CLEAN-PASS-1-ADJ.oversize-rejection.json` records

```json
{"artifact":"FORMATION-CLEAN-PASS-1-ADJ.report.json","bytes":12946,"limit":12000,
 "reason":"report exceeded the fail-closed clean-artifact byte ceiling","status":"REJECTED"}
```

The adjudicator's first return was **rejected for being 946 bytes too long**; the accepted
replacement is 11,148 bytes and its verdict is CLEAN. A 12,000-byte ceiling across twelve domains
budgets ≈1 KB per domain — there is no room in the schema for a finding.

### F-04 · MAJOR · Two files in one directory disagree about the same fact

- `vnext/PROMPT-RECAP.md`: *"Whole-formation credit is **0/2** and production execution is 0/193."*
- `vnext/FORMATION-CLEAN-PASSES.json`: `"status": "clean"`, `passes[0].verdict = "CLEAN"`,
  `passes[1].verdict = "CLEAN"`, `predecessor_adjudication_sha256` chained.

Either the recap is stale or the JSON is over-claiming. Neither carries a supersession marker.
No consumer of `vnext/` can tell which is authoritative.

### F-05 · MAJOR · Gate-farm re-growth, directly against a twice-issued owner order

Owner, `value-tranche-v-formation #003`:
> *"Spend little time on any meta processes or 'gates'—most of these are contrivances and to be deleted."*

Owner, `#009`:
> *"essentially ignore, or abrogate and delete, any contrivances like proof: or gate: meta scripts
> unless proven to be of value without overfitting."*

Measured: `docs/tranches/V/vnext/tools/` = **44 files, 9,837 lines** of `validate-*.mjs` /
`selftest-*.mjs` / contract runtimes. The owner's own edict ledger records the same order as
**E3 (LAW) / E4 (BUILD, "gate farm stays dead", `reformation/DISPOSITIONS.md:16-19`)**. The
reformation half honoured it (`W42` executed the kill list); the vnext half rebuilt it ~10× larger.
`PROMPT-RECAP.md` carries **no row for this ask at all** (`grep -ci "gate\|contrivance"` → 0 for
the edict framing).

### F-06 · MAJOR · The 3×5×3 law is contradicted, not merely omitted

Owner, `value-v-pi-refinement #006` (2026-07-22T04:51Z):
> *"we should have no less than 3 orthogonally begat prototypes per feature, which shall then be
> adjudicated by a quintetto of skeptics that all assume they're incorrect and NOT idiomatic, NOT
> performant: it's then the job of a triumvariate to further adjudicate those prototypes into a
> final apotheosis."*

`PROMPT-RECAP.md` encodes **2 + 1**, twice:
- *"Fresh R4 skeptic pair plus third-Sol adjudication"*
- *"every implemented wave receives exactly **one** fresh immutable-final-state hostile A/B
  challenge … then third-Sol adjudication"*

`apotheosis/pi/formation/session-audit/preflight-prompt-census.md:81` concedes the point:
> *"The owner's `3×5×3` requirement remains binding … Re-grouping, exemption, or weakening is a new
> owner/addendum decision; a handoff may not silently reinterpret it."*

The recap has not been amended. Any executor reading `vnext/` will run 2+1.

### F-07 · MAJOR · RF-20 — the recap-completeness obligation is itself a chronic

Chain of custody:

1. `docs/tranches/V/audit/REFORMATION-2026-07-16.md:78` (RF-20):
   > *"PROMPT-RECAP's method boundary (≤07-14) excludes the 07-16 REFORMATION prompt entirely;
   > **3 asks UNOWNED** (backend colocation, library file-idiom at keyframes-critique grain,
   > dirty-tree commit sequencing) + DesignSync tooling unowned; **over-claims RC-1→W10** (backend
   > colocation phantom) and **K-22→W16**; 7 vague rows"*
2. `reformation/DISPOSITIONS.md:29` (E10): disposition = **BUILD**, owner = **W56**.
3. `reformation/CARRY-LEDGER.md:30`: W56 owes *"PROMPT-RECAP §7 (E1–E11) terminal"*.
4. `docs/tranches/V/archive/PROMPT-RECAP.md` — §7 **does not exist**; the file ends at §6, and its
   header reads *"ARCHIVED 2026-07-17 — historical; superseded … Read-only."*
5. **W56 has never executed.** A *new* recap (`vnext/PROMPT-RECAP.md`, 07-20) was authored from a
   different seed and also omits E1–E11 (`grep -c "E1" PROMPT-RECAP.md` → 0).

Two closes, no decision, renamed once. By the owner's definition — *"A chronic that has ridden two
or more closes un-decided is a disease row, and deciding it is a wave of its own"* — this is a
**disease row and must be its own wave**.

### F-08 · MAJOR · A publishable dependency cycle is armed in the working tree

```
$ python3 -c "import json;print(json.load(open('package.json'))['dependencies'])"
{'@mkbabb/glass-ui': '^7.0.0', '@mkbabb/keyframes.js': '^6.0.0'}

$ npm view @mkbabb/value.js@4.0.0 --json | ... → dependencies: None
```

value.js is the constellation **producer**; keyframes 6.0.0's packed manifest declares
*"dependency @mkbabb/value.js exactly 4.0.0"* (raw prompt `value-tranche-v-formation #053`).
Demo-only consumers sit in `dependencies`, not `devDependencies`. The published 4.0.0 is clean;
the **next** `npm publish` from this tree ships value → keyframes → value.

Known and booked: `apotheosis/post-convergence/delta-census.md:110` —
*"AM-13 AMEND V00A/V00B/V29T (deps allowlist ⊆ {@mkbabb/parse-that})"*. The gate verdict calls it
*"first commit = AM-13 deps-strip"*. Unexecuted. `PROMPT-RECAP.md` has no row for it.

### F-09 · MAJOR · An admitted shim survives the "clean break" law

`demo/shell/dock/layers/ActionBarLayer.vue:61`:
> `// content-swap composable would retire this local shim.)`

Against `#001/#002/#009/#010/#048`: *"NO legacy code. Clean breaks: no aliases, no migration shims,
no dual paths, no masking fallbacks."* Booked at `CARRY-LEDGER.md:126` to W47 — **alias smuggling
by deferral**, and W47 is unexecuted.

### F-10 · MAJOR · Module-name-strip: 8 measured violations

Owner, `bbnf-greenfield-coordination #001`:
> *"Grouped files in a module should always have their module name stripped in the file—as an
> abstract and generalized de-duplication mechanism."*

```
api/src/platform/db/db.ts
demo/palettes/browser/card/PaletteCard/PaletteCard.vue
demo/picker/controls/ComponentSliders/ComponentSliders.vue
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue
demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue
demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue
demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue
```

Plus `test/parsing/timeline/parsing-easing.test.ts` — a double violation (`parsing/` has no `src/`
peer *and* the leaf repeats the module name). `PROMPT-RECAP.md` books this to
`V00C, V29T, K22T, D00, M00` — all unexecuted.

### F-11 · MAJOR · Test-isomorphism is half-done and counted as done

Displacement is real and clean: `find src demo -name "*.test.ts"` outside `test/`/`demo/test/` → **0**.
Isomorphism is not:

```
src/  : color/ css/ foundation/ subpaths/ transform/
test/ : parsing/ parsing/timeline/ transform/   + 20 flat *.test.ts
```

`test/parsing/` mirrors a `src/parsing/` that was deleted in the v4 cut. `PROMPT-RECAP.md` row 36
reads *"Tests outside source in an isomorphic tree"* and marks it owned — the **partial counted as
done**, close-class lie #8.

### F-12 · MINOR · Silent drops from `PROMPT-RECAP.md` (each verified `grep -ci … → 0`)

| Owner ask | Source | RECAP hits |
|---|---|---:|
| *"always use your internal browser… not playwright… Mark me… Swear."* | formation #013 | 0 |
| *"Any material defects should result in addenda. Mark me."* | formation #016 | 0 |
| *"aristotelian proportionality"* card/margin/divider audit | formation #007 | 0 |
| *"the 'lab'… font one glass-ui golden typography scale smaller… blob bigger without forcing the card larger"* | formation #007 | 0 |
| *"pursuant to precepts/"* | #001, #002, bbnf #001 | 0 |
| *"best lightningcss… by at least 5-6x… best sonic-rs by at least 1.1-2x"* | bbnf #011 | 0 |
| *"No x86 ever. This is an ARM machine."* | bbnf #023 | 0 |
| *"until library perfection, readability, and DIRIGIBILITY is reached"* | bbnf #001 | 0 |
| *"Everything must and always rooted in PROFILING and ANALYSIS. Not vibes."* | bbnf #007 | 0 |
| *"four orthogonal full implementations"* | bbnf #010 | 0 |
| *"You do NOT need a lexical layer"* / no scanner | pi #005, #004 | 0 |
| *"proper meta-tranches of research, hardening, and analysis"* | formation #004 | 0 |

All twelve are honoured **somewhere** (`apotheosis/pi/` and/or `archive/PROMPT-RECAP.md §6`) — but
`archive/PROMPT-RECAP.md` is stamped read-only/superseded and `pi/` is untracked at HEAD. The
tracked, current, canonically-named recap carries none of them.

### F-13 · MINOR · probe-parsimony is not embedded where the memory requires

Memory edict: *"embed in every workflow lane LAW block."* Measured: 3 of 11
`reformation/waves/*.md` mention parsimony; **0 of 4** `vnext/waves/*.md` do.

### F-14 · MINOR · `demo/shared/` is the named anti-pattern, with mitigation

`feedback_kiss_no_contrivance.md`: *"Don't create new directory structures (like `shared/`) or
wrapper components (like `LabeledSelect`, `SectionHeader`)."* Measured: `demo/shared/utils.ts`,
`demo/shared/ui/PaneHeader.vue`, `demo/shared/ui/EmptyState.vue`, created `a61094e3`
(2026-07-17, W43b3) — **after** the edict. Mitigation: 10 and 12 consumer files respectively, i.e.
genuine reuse pressure, which the edict's own escape clause permits. Recorded as a decided-or-not
row, not a defect.

### F-15 · INFO · Stale canon in the memory file itself

`MEMORY.md` § "BBNF Grammars" asserts `src/parsing/grammars/css-values.bbnf`,
`css-color.bbnf`, and `test/bbnf-equivalence.test.ts`. Measured: `find . -name "*.bbnf"
-not -path "./node_modules/*"` → **0 files**; the test does not exist. This matters because
`PROMPT-RECAP.md` row 82 — *"Mirror the accepted CSS BBNF module files exactly as TypeScript
parse-that-combinator modules"* — has **no in-repo mirror source**; the authority is external and
unpinned.

---

## 4. Edicts that ARE honoured (stated for falsifiability)

| Memory edict | Verdict | Evidence |
|---|---|---|
| `feedback_glass_ui_first_class` | **HONOURED** | `demo/ui/` = 19 dirs, **29 total LOC**, pure `index.ts` re-exports; 0 files with `<template>`, 0 with `class=` |
| `feedback_root_styling` | **HONOURED (moot)** | no local shadcn root components remain to override; 82 demo files import `@mkbabb/glass-ui` |
| `feedback_preserve_animations` | **HONOURED** | `demo/styles/animations.css:227-236` retains the exact pane geometry `translateX(∓110%) rotate(∓2deg)`, opacity pinned; comment documents the move onto `vj-enter`, not a deletion |
| `feedback_admin_dock_restructure` | **HONOURED** | `DockViewSelect.vue:80,134,135` `gold-shimmer-icon`/`gold-shimmer`; `ProfileSection.vue:96` `slug-pill … gold-shimmer`; admin is a dock mode, not extra items |
| `feedback_select_font` | **HONOURED** | `demo/styles/foundation.css:373` → `--select-font: var(--font-mono)` (token, not hardcoded) |
| `feedback_no_god_modules` | **HONOURED** | largest `src/` file 899 LOC (`css/stylesheet.ts`); whole `src/` = 4,654 LOC across 5 dirs; the 1,163-line `units/color/utils.ts` cited in the edict no longer exists |
| `feedback-mail-inbox-law` (E13) | **HONOURED** | `coordination/INBOX.md` — 25 `I-`/`O-` rows, `UNREAD → READ → FOLDED` vocabulary, four-path sweep law at :4-27 |
| `feedback_model_tiering_fanout` (E12) | **HONOURED** | no `CLAUDE_CODE_SUBAGENT_MODEL` in any settings file; all six clean-pass reports carry explicit `requested_model`/`served_model` |
| `feedback-glassui-bhbi-relay` | **HONOURED** | `../glass-ui/docs/tranches/BI/coordination/valuejs-inbox-2026-07-17-glass7-adopted-plus-three-marks.md` is the latest relay; no source-level change has landed since |
| `feedback-proof-idiom-retired` | **HONOURED in tree, AT RISK in plan** | `package.json` scripts contain no `proof:`/`gate:`; but `delta-census.md:110` AM-10 proposes *"extend `proof:structure`"* (keyframes-owned surface) |
| `feedback_no_backwards_compat` | **NEARLY** | `grep -c "@deprecated" src/` → 0; one admitted shim survives (F-09) |
| `feedback_kiss_no_contrivance` | **CONTESTED** | F-14 |
| `feedback-probe-parsimony` | **PARTIAL** | F-13 |

---

## 5. THE TABLE — every owner ask, recapped

`Addressed?` legend: **Y** landed/decided with evidence · **P** partial (the cardinal sin if
counted as done) · **N** unaddressed · **B** booked to an unexecuted wave · **X** contradicted.
`Owning wave` for N/B/X rows is the **proposed** owner for the next tranche (W-band).

### 5.1 `value-tranche-v-formation` (19 owner prompts)

| ASK-ID | Tight quote | Source | Addressed? | Where | Owning wave |
|---|---|---|:--:|---|---|
| A01 | "Tranche U is not terminal… the last several tranches must be challenged and ruthlessly inspected for deferrals, particularly in the tails thereof" | #001/#002 | Y | `V-PRIME.md`, `CARRY-LEDGER.md` §A–§F | closed |
| A02 | "a minimum of 20+ waves, pursuant to precepts/ in specification and formulation" | #001/#002 | P | 193 waves measured (T3); **`precepts/` never bound** (T14) | W·CANON |
| A03 | "glass-ui's BI/P tranche is in active execution… if a modification is needed, note it and send it to that agent's inbox" | #001/#002 | Y | 5 `valuejs-inbox-*` letters in `../glass-ui/docs/tranches/BI/coordination/` | closed |
| A04 | "This is NOT an implementation phase. Tranche development only. No source edits land." | #001/#002 | X | **Violated by the same program**: W40–W45 landed source (`f2c8f565`, `ef57230b`, `4c1e9270`, `a61094e3`) | W·GOV (rule the boundary) |
| A05 | "DEEPLY audit our original plan and the waves thereof… with 32 agents" | #001/#002 | Y | `archive/AGENT-REGISTRY.md` (52 roles ≥ 32) | closed |
| A06 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | #001/#002/#009/#010/#048 | P | honoured in `src/`; F-09 shim survives | W·CUT |
| A07 | "NO legacy code. Clean breaks: no aliases, no migration shims, no dual paths, no masking fallbacks" | ×5 prompts | P | `@deprecated`=0 in `src/`; **`ActionBarLayer.vue:61` shim** | W·CUT |
| A08 | "A chronic that has ridden two or more closes un-decided is a disease row, and deciding it is a wave of its own" | #001/#002 | X | **RF-20 itself is now such a chronic** (F-07); AM-13 likewise (F-08) | W·DISEASE |
| A09 | "Recap ALL of our prompts… An unaddressed ask becomes a registry row with an owning wave. Silent drops are forbidden." | #001/#002 | **N** | F-01, F-07, F-12 | **W·RECAP** |
| A10 | audit lenses incl. "gate soundness (can each gate actually fail?)" and "prompt-recap completeness" | #001/#002 | X | The gate-soundness lens was never applied to the formation's own gate (F-03) | W·GATE |
| A11 | "Withhold the tranche's favored success narrative from most auditors" | #001/#002 | P | clean-pass prompts do say `ASSUME-FORMATION-WRONG`, but the 12-command script supplies the narrative | W·GATE |
| A12 | "an explicit registry of finding families, grouped by the underlying defect mechanism" | #001/#002 | Y | `DISPOSITIONS.md §2`, `UNION-ROW-INVENTORY.json` (114 rows) | closed |
| A13 | "The registry is stable when two consecutive passes surface nothing new" | #001/#002 | X | Satisfied *vacuously* — six seats surfaced nothing at all (F-03) | W·GATE |
| A14 | "ALL design routes through Fable and the frontend design plugin (DesignSync)… every fanout spawn declares its model explicitly" | #001/#002 | P | model declaration ✓ (all 6 reports); **DesignSync project does not exist** — `DISPOSITIONS.md:22` "none exists today — verified", owner W46 unexecuted | W·DESIGN |
| A15 | "Counting a partial as done is the close-class lie, and it is forbidden." | #001/#002 | X | F-02, F-11 are exactly this | W·DISEASE |
| A16 | "wave specs with acceptance gates, born RED wherever the defect is live; π and DELTA obligations for every visual claim" | #001/#002 | P | `born-RED` appears in only **5 of 11** reformation wave files (W40 ×2, W44 ×2, W46-48 ×1); 0 in W41/42/43/45/49-52/53-54/55-56/WL | W·GATE |
| A17 | "genuinely orthogonal formulations… Reject rewordings of one idea posing as several" | #001/#002 | Y | `apotheosis/pi/` occurrence-owner v1–v9 families | closed |
| A18 | "RESEARCH / SYNTHESIZE / PROTOTYPE / CRITIQUE / AGGLOMERATE… A prototype either runs or is marked spec-only" | #001/#002 | Y | `pi/{research,harden,*-challenge-a,*-root-gestalt}.md` | closed |
| A19 | "100% means zero enumerated open gaps, survival of a fresh adversarial audit by agents who did not author the winning spec, and two consecutive clean passes" | #001/#002 | X | the two clean passes are vacuous (F-03) | W·GATE |
| A20 | "Ensure a suffusion of glass-ui principles, and a sense of proportion in all things" | #003 | Y | `V/PROPORTION-AUDIT.md`, `V/OPTICAL-BENCH-COMPOSITIONS.md` | W46–W55 (unexec.) |
| A21 | "Look to our last many tranches for deferrals, look to our recent Claude Code sessions—properly de-duplicated, and ignore any meta-commands" | #003 | Y | `archive/PROMPT-RECAP.md §1` method (NFC, digest dedup, meta-command exclusion) | closed |
| A22 | "Spend little time on any meta processes or 'gates'—most of these are contrivances and to be deleted" | #003, #009 | X | **44 tools / 9,837 LOC** (F-05) | **W·GATE-KILL** |
| A23 | "V's scope is to expand to harden, refine, and fully realize our frontend design elements… alongside analysis of all palette API facilities" | #004 | B | `vnext` A00–A26 + D00–D25; **0/193 executed** | W·EXEC |
| A24 | "Tackle this in proper meta-tranches of research, hardening, and analysis" | #004 | P | `archive/V.md §2` had them; the vnext 8-band registry (P/V/K/A/G/D/M/C) is not that shape | W·FORM |
| A25 | "Use the goal facility with our original prompt, though melded with our hitherto edicts" | #004 | Y | `archive/PROMPT-RECAP.md §6` "SATISFIED in formation" | closed |
| A26 | "any glass-ui asks, or gaps thereof, should be targeted and scribed directly within this tranche set, alongside prose that can guide the active glass-ui execution agent" | #006, #017 | Y | O-1…O-6 in `coordination/INBOX.md` | closed |
| A27 | "the margin betwixt the header line… far too vast… the 'lab', chosen color space, font should be one glass-ui golden typography scale smaller than the numbers… the blob should be made bigger, though without forcing the card itself to be larger" | #007 | B | `archive/PROMPT-RECAP.md §6` → PR-01…03, constitution §3.2, W0/W18/W20/W29/W32 → re-homed to W46/W48; **unexecuted, and absent from the current recap** | **W·PROPORTION** |
| A28 | "Our cards… margins, paddings, dividing lines, small UI elements, should all be audited, challenged, and refined to have a sense of aristotelian proportionality" | #007 | B | `PROPORTION-AUDIT.md` register; W46 owns; unexecuted | W·PROPORTION |
| A29 | "Mark… any superfluous, duplicative, or distracting UI elements that are rife for removal; Mark other items of the converse, whereof more affordance may be necessary" | #007 | B | W0 register terminal `KEEP/TIGHTEN/ENLARGE/REMOVE/ADD-AFFORDANCE`; unexecuted | W·PROPORTION |
| A30 | "At some point we must converge. Mark me." | #008 | X | 9 days later (#026): *"What on earth have we been doing for the last two days then?"* | W·CONVERGE |
| A31 | "dispatch triumvariate fleets of research, harden, and wave ammend/write" | #009 | Y | `pi/{research-*,harden*,*-challenge-*}.md` | closed |
| A32 | "extreme parsimony and fastidious care… KISS-forward solutions that reduce complexity and suffuse fewer lines of code… the majority of it on direct code implementation… and visual verification" | #009/#010/#016 | X | `src/` is lean (4,654 LOC) but the *program* produced 9,837 LOC of validators and, per `HANDOFF-2026-07-24.md`, **one accepted 17-line parser operation** | **W·KISS** |
| A33 | "Maximal parallelism and workflow fanout, using agent v2… as many as you see fit" | #011/#012 | Y | `archive/PROMPT-RECAP.md §6` (52 roles, no fixed cap) | closed |
| A34 | "always use your internal browser for validation and browsing, not playwright if possible. Mark me, and have the subagents mark this as well. **Swear.**" | #013 | P | `HANDOFF-2026-07-24.md` law 10 ✓; `archive/PROMPT-RECAP.md §6` ✓; **`vnext/PROMPT-RECAP.md` 0 hits**; `playwright` still in `package.json` `test:e2e` | W·PROBE |
| A35 | "Ensure: the app crashed. Regain your footing." | #014 | Y | cured at W44 (D58, routed witness green) | closed |
| A36 | "ensure that we do not spin our wheels. What's the current status, and what's been done hitherto, and what remains?" | #015 (+8 repeats) | P | asked **9 times** across the three sessions; the repetition is itself the finding | W·STATUS |
| A37 | "Any material defects should result in addenda. Mark me." | #016 | Y | `pi/ADDENDA-01…08.md`; **0 hits in `vnext/PROMPT-RECAP.md`** | closed |
| A38 | "Ensure all of our documents are pursuant to precepts." | #017 | N | `grep -ci precept vnext/PROMPT-RECAP.md` → 0; 1 of 69 `vnext/` files | **W·CANON** |
| A39 | "Why is the app largely blank and broken?" | #029 | P | dev mount cured (W44/D58); **`CARRY-LEDGER.md:116` — gh-pages prod-preview still mounts empty** | W·BOOT |
| A40 | "Properly coordinate with keyframes.js to work this out." | #048 | Y | keyframes 6.0.0 published on exact value 4.0.0; I-10 discharged | closed |
| A41 | "develop a handoff for the other agentic system working on this problem space" | #082 | Y | `vnext/` seed letters + `HANDOFF-2026-07-24.md` | closed |

### 5.2 `bbnf-greenfield-coordination` (29 owner prompts)

| ASK-ID | Tight quote | Source | Addressed? | Where | Owning wave |
|---|---|---|:--:|---|---|
| A42 | "full wave specs pursuant to precepts/ … for parse-that AND … the ENTIRETY of the restart of bbnf-lang" | #001 | Y (foreign) | `vnext/coordination/BBNF-PARSE-THAT-MAJOR-HANDOFF.md` exists (7,683 B) | external |
| A43 | "A lock set should be designed for parse-that, too." | #001 | UNVERIFIED | not resolvable from this repo — verify by `ls ../parse-that/docs/tranches/*/locks` | external |
| A44 | "our massive explosion of module, file, and directory structure must be finally settled, with better grouping and encapsulation in both the library, and the frontend/demo components" | #001 | P | `src/` settled (5 dirs, 4,654 LOC, W43); `demo/` restructured but F-10/F-14 remain | W·STRUCT |
| A45 | "long running directories should be pruned… too macro… god-modules; too small… sand—we want a goldilocks" | #001 | Y | `src/` max file 899 LOC; `demo/` max 453 | closed |
| A46 | "Grouped files in a module should always have their module name stripped in the file" | #001 | **N** | **8 violations measured** (F-10); booked to V00C/V29T/K22T/D00/M00, all unexecuted | **W·STRUCT** |
| A47 | "Tests should always be NOT co-located… always displaced into a file structure isomorphic to the source" | #001 | **P** | displaced ✓ (0 colocated); **not isomorphic** ✗ (F-11) | **W·STRUCT** |
| A48 | "a DAG… each and every node and edge, and cycles thereof… viewed thrice… until library perfection, readability, and DIRIGIBLITY is reached" | #001 | P | `vnext/CURRENT-DAGS.md`, `TARGET-DAGS.md`, `madge-*.json`, `pi/MODULE-DAG.md`; **"dirigibility" 0 hits in the recap**; the package-level cycle of F-08 was not caught by any DAG | W·DAG |
| A49 | "Pruning and deletion of entire sectors and modules is granted totally IFF our findings are their vacuity or superfluity—consumer count is NOT enough" | #001 | Y | recap row 38 → V15P/V18H/V18V/K14–K22/C01–C02W | W·EXEC |
| A50 | "any parse-that work should be coordinated with the active value.js megatranche uplift" | #002 | Y | `pt-e-bbnf-live-coordination-v2.json`, `bbnf-*-receipt-2026-07-22.md` | closed |
| A51 | "the playground should be planned for a total glass-ui uplift… Use the latest begat glass-ui, 7.0.0… each page assay with the frontend design plugin" | #002 | UNVERIFIED | bbnf-lang-owned; not resolvable here | external |
| A52 | "all implemented waves must be aggressively challenged by no less than two challenging and gestalt passes… total tranche analysis (was our wave optimal originally…), wave analysis, and feature analysis" | #004, #030 | Y | recap row 81; `pi/W1-AUDIT-A/B.md`, `W2-`, `W3-` | closed |
| A53 | "total generality and GRAMMAR driven cost analysis… entirely generalized L4 typing API. No overfit nonsense." | #005 | B | routed to the PT-E/BBNF session | external |
| A54 | "Rust and TS implementations of parse-that… perfected; the Rust implementation of BBNF perfected with a generalized IR backend… DEEP ARM ASM support, inspired by DAV1D" | #006 | B | routed; **0 hits in the recap** | external |
| A55 | "JSON and the entire CSS L4 spec… with a generalized hybrid value API, with tape… At least 10 orthogonal… Everything must and always rooted in PROFILING and ANALYSIS. Not vibes." | #007 | P | superseded to 4 by #010; `pi/PROFILE-ANALYSIS.md` + `bench-results.json` exist ✓; **"tape" explicitly routed out** by the recap's own preamble | external |
| A56 | "every single lock must be implemented, in a sophisticated lacuna of implementation. Ecoute-moi. And swear." | #008 | UNVERIFIED | bbnf-lang-owned | external |
| A57 | "Instead of 10, let's do four orthogonal full implementations." | #010 | N (in recap) | 0 hits; `pi/` runs H/B/S + clean-room = 4 ✓ in practice | W·RECAP |
| A58 | "best lightningcss in speed by at least 5-6x with FULL L4 parity (no excpetions) and best sonic-rs by at least 1.1-2x. Mark me. **Add this to our goal set.**" | #011 | N (in recap) | 0 hits in recap; 7 `pi/` files carry it; **`bench-results.json` measures the LIVE REGEX as fastest (14.06 MB/s vs C14 6.09)** — the 5-6× target is not merely unmet, the baseline moved | **W·BENCH** |
| A59 | "parse-that is to not be totally greenfieled, just perfected" | #013 | Y | `vnext` P00/P01 leave 1.0.0 untouched | closed |
| A60 | "**No x86 ever.** This is an ARM machine." | #023 | N (in recap) | 0 hits in recap; 10 `pi/` files | **W·BENCH** |
| A61 | "value.js is sealed—do not communicate with that instance any longer. Claude code is driving the parser proof" | #037 | Y | post-dates the recap by 4h; honoured (this seat is Claude) | closed |
| A62 | "Communicate with the other instances too—glass, sci, etc should not block our near orthogonal implementation" | #057 | Y | `CARRY-LEDGER.md §D` records the glass BJ holds as *holds*, not blocks | closed |
| A63a | "Ratify. Update our goal and continue." / "The goal has been deposed. Start now." | #035, #036 | UNVERIFIED | goal-facility state not inspectable from disk | — |
| A63b | "Status/what remains" (×8: #004,#009,#012,#030,#039,#040,#046,#047,#056) | ×8 | P | see A36 | W·STATUS |

### 5.3 `value-v-pi-refinement` (13 owner prompts)

| ASK-ID | Tight quote | Source | Addressed? | Where | Owning wave |
|---|---|---|:--:|---|---|
| A64 | "deep prototyping and greenfield work **NOW**, not deferred until tranche execution time" | #001 | P | `HANDOFF-2026-07-24.md` law 1 restates it; measured output = *"one accepted seventeen-line direct parse-that operation—CSS consume-number—and four passing tests"* | **W·PROTOTYPE** |
| A65 | "fully prototype the parse-that variant, backed with consistent and meticulous benches to best both the regex-variant and the previous iterations'. The entire CSS spec is our goal with IDIOMATIC and non-contrived parse-that code, with a directory structure matching a modulearized bbnf-variant" | #002 | **N** | coverage measured **0 TOTAL of 52** exports; bench sheet 0.0537 < 0.1000 floor | **W·PARSER** |
| A66 | "Fold in and communicate any parse-that uplifts fully actualized and hardened by bbnf-lang's active agent." | #002 | Y | `pi/bbnf-exchange-receipt-2026-07-22.md`, `bbnf-transaction-receipt-2026-07-22.md` | closed |
| A67 | "parse-that is a generalized combinator framework. **Why do we have a scanner?**… our custom and overfit begat parser using regex here2fore is what got us into a mess in the first place." | #004 | Y (post-recap) | `HANDOFF-2026-07-24.md` law 3 forbids scanner/tape/atom/CST; the multi-module mirror was rejected | W·PARSER |
| A68 | "The atom framework is so profoundly un-indiomatic that it's repugnant… **You do NOT need a lexical layer.** This is a combinator framework, mate. And have isomorphism with the module setup of the defined css grammar within BBNF (the .bbnf variants thereof)" | #005 | P | rejection honoured ✓; **BBNF isomorphism has no in-repo source — 0 `.bbnf` files** (F-15) | **W·PARSER** |
| A69 | "no less than **3** orthogonally begat prototypes per feature… a **quintetto** of skeptics… a **triumvariate** to further adjudicate" | #006 | **X** | recap encodes 2+1 (F-06); `ADDENDA-07.md` carries the 3×5×3 law but the recap was never amended | **W·RECAP** |
| A70 | "Bollocks, claude does not own that. Unblock it." | #021 | Y | `HANDOFF-2026-07-24.md` law 12; `pi/bbnf-owner-unblock-2026-07-22.md` | closed |
| A71 | "How much of our audit, from the ORIGINAL goal, has been done… What's the addenda status? … What prototypes have been build and challeneged?" | #024, #025, #056 | P | `preflight-prompt-census.md:88` concedes: *"Historical duration percentages and convergence estimates are judgments over an incomplete denominator"* | W·STATUS |
| A72 | "What on earth have we been doing for the last two days then?… Why do we not have a working, idiomatic, parse-that based css parser yet" | #026 | **N** | unanswered on disk; `HANDOFF-2026-07-24.md §1`: *"V·π does not yet contain a working CSS parser"* | **W·PARSER** |
| A73 | "fastidious, deep audit of the entire Codex development session(s) by a set of fresh Opus eyes. Every finding… is to be assayed… Include therein all of our mid-session steering edicts, and all raw prompts" | #027, bbnf #070 | **IN FLIGHT** | this program; raw-prompt archive landed 2026-07-24T13:56 | **W·AUDIT** |
| A74 | "This is for a handoff—not to run the audit herein now" | #028 | Y | `HANDOFF-2026-07-24.md` explicitly does not self-audit | closed |

### 5.4 The 13 feedback memories

| ASK-ID | Edict | Honoured today? | Evidence |
|---|---|:--:|---|
| M-01 | proof-idiom retired | **Y / at-risk** | 0 `proof:`/`gate:` scripts in `package.json`; AM-10 proposes to *extend* `proof:structure` (keyframes-owned) |
| M-02 | no god modules | **Y** | `src/` max 899 LOC; total 4,654; the 1,163-line offender is gone |
| M-03 | no backwards compat | **P** | `@deprecated`=0; one admitted shim (`ActionBarLayer.vue:61`) |
| M-04 | KISS — no contrived `shared/` or wrappers | **CONTESTED** | `demo/shared/ui/{PaneHeader,EmptyState}.vue` created `a61094e3` post-edict; 10/12 consumers = genuine reuse |
| M-05 | glass-ui first class | **Y** | `demo/ui/` = 29 LOC, pure re-exports, 0 templates |
| M-06 | root-level styling | **Y (moot)** | no local roots remain |
| M-07 | preserve animations | **Y** | pane geometry byte-preserved at `animations.css:227-236` |
| M-08 | admin dock restructure | **Y** | `DockViewSelect.vue:80,134,135`; `ProfileSection.vue:96` |
| M-09 | select font via token | **Y** | `foundation.css:373` `--select-font: var(--font-mono)` |
| M-10 | probe parsimony in every lane LAW block | **P** | 3/11 reformation waves; **0/4** vnext waves |
| M-11 | glass-ui BH/BI relay on every change | **Y** | 5 letters, latest `2026-07-17-glass7-adopted-plus-three-marks.md` |
| M-12 | mail/inbox law (E13) | **Y** | `INBOX.md` 25 rows, UNREAD→READ→FOLDED, 4-path sweep |
| M-13 | model tiering / declare per spawn | **Y** | no env override anywhere; all 6 clean-pass reports declare model |

---

## 6. REGISTRY ROWS — unaddressed asks and defects (**24**)

Every row below is an ask or defect with **no executed owner**. Per the standing edict each MUST
become a row in the next tranche.

| # | What | Why (evidence) | Disposition |
|---:|---|---|:--:|
| R-01 | **Re-author the prompt recap from the 181-event corpus** | F-01; 51% of sampled rows ungrounded; 29 owner prompts post-date the file | BUILD |
| R-02 | **Fix R1 — `parseCssColor("<fn>()")` TypeError** | F-02; reproduced at HEAD; frozen contract requires `ok:false` | BUILD |
| R-03 | **Retire the vacuous formation clean-pass gate** | F-03; CLEAN ≡ 12 self-authored selftests exit 0; 6/6 seats findings=0 | RETIRE |
| R-04 | **Remove the 12,000-byte adversarial-report ceiling** | F-03; a finding-bearing adjudication was rejected for length | RETIRE |
| R-05 | **Reconcile `0/2` vs `status: clean`** | F-04; two files, one directory, opposite facts | BUILD |
| R-06 | **Kill the 44-script / 9,837-LOC gate farm** | F-05; owner ordered contrivances deleted, twice | RETIRE |
| R-07 | **Amend every 2+1 review row to the 3×5×3 law** | F-06; owner order 2026-07-22T04:51Z | BUILD |
| R-08 | **RF-20 §7 (E1–E11) — decide, do not re-book** | F-07; two closes un-decided → disease row, owner says it is a wave of its own | BUILD |
| R-09 | **AM-13 deps-strip — remove glass-ui/keyframes from `dependencies`** | F-08; publishable value→keyframes→value cycle | BUILD |
| R-10 | **Retire the `ActionBarLayer` local shim** | F-09; against the five-times-repeated clean-break law | BUILD |
| R-11 | **Strip module names at the 8 measured sites** | F-10 | BUILD |
| R-12 | **Make `test/` isomorphic to `src/`** | F-11; `test/parsing/` mirrors a deleted module | BUILD |
| R-13 | **Restore the internal-Browser edict to the tracked recap** | F-12; "Mark me… Swear." — 0 hits | BUILD |
| R-14 | **Bind `precepts/` in the current canon** | A02/A38/A42; 0 hits in the recap, 1 of 69 vnext files | BUILD |
| R-15 | **Re-home the Aristotelian-proportion + Lab-header/blob asks into tracked canon** | A27/A28/A29; live only in a read-only archived file | BUILD |
| R-16 | **Register the peer-beating bench targets (lightningcss 5-6×, sonic-rs 1.1-2×)** | A58; 0 hits in recap; and `bench-results.json` shows the live regex is currently fastest | BUILD |
| R-17 | **Register "No x86 ever — ARM machine"** | A60; 0 hits in recap | BUILD |
| R-18 | **Open the DesignSync design-system project** | A14; `DISPOSITIONS.md:22` "none exists today — verified"; W46 unexecuted | BUILD |
| R-19 | **Born-RED coverage: 6 of 11 wave files have none** | A16; W41/42/43/45/49-52/53-54/55-56/WL | BUILD |
| R-20 | **gh-pages production preview mounts empty** | `CARRY-LEDGER.md:116`; A39 only half-cured | BUILD |
| R-21 | **Provide an in-repo BBNF mirror source** | F-15; row 82 mandates mirroring `.bbnf` modules; 0 exist here | BUILD |
| R-22 | **Rule the "no source edits land" boundary** | A04; W40–W45 landed source under a planning-only prompt | BUILD |
| R-23 | **Embed probe-parsimony in every lane LAW block** | M-10; 0/4 vnext waves | FOLD |
| R-24 | **Decide `demo/shared/` — keep with rationale or dissolve** | M-04/F-14; created post-edict, but 10/12 consumers | FOLD |

**Count: 24 registry rows.** 22 BUILD/RETIRE, 2 FOLD.

---

## 7. What I could not verify

| Item | What would verify it |
|---|---|
| A43 parse-that lock set | `ls ../parse-that/docs/tranches/*/locks/` in that repo at its HEAD |
| A51 bbnf-lang playground glass-7 uplift | inspect `../bbnf-lang` tranche docs |
| A56 "every single lock item fully implemented" | bbnf-lang execution receipts |
| A63a goal-facility state ("Ratify… The goal has been deposed") | the Codex goal store; not on disk |
| Whether the 120 cross-thread delegations contain further un-closed producer defects | a second pass reading all 120 relayed bodies (this seat read the 61 owner-authored ones in full and sampled the delegations) |

---

## 8. Provenance of this report

- Raw corpus: `docs/tranches/V/apotheosis/pi/formation/session-audit/raw-prompts/` (181 events;
  `INDEX.json` sha-pinned to three `~/.codex/sessions` rollouts).
- Extraction + phrase-grounding scripts ran in the session scratchpad; every number above is
  reproducible from the commands quoted inline.
- No file outside `docs/tranches/W/audit/history/` was created or modified. A transient probe file
  written at the repo root during F-02 reproduction was removed; `git status --porcelain` is
  unchanged from session start (3 M rows, the pre-existing untracked set).
