# HARDEN-6 — Tranche A methodology and process conformance audit

**Audit lane**: hardening lane 6, methodology and process.
**Subject**: `docs/tranches/A/` — value.js tranche A, planning-only state, 2026-05-18.
**Spec basis**: `docs/precepts/instructions/tranche/SPEC.md` + `README.md`, `RESEARCH.md`, `CHALLENGE.md`, `WAVE_SPEC.md`, `DOC_UPDATE_WAVE.md`, `ORCHESTRATION.md`, `AGENT_DISPATCH_TEMPLATE.md`, `instructions/README.md`.
**Method**: every file in `docs/tranches/A/` read in full; every precept instruction file read in full; claims cross-checked against the research findings.
**Verdict**: tranche A is structurally sound and conforms to the spec on most points. The defects are concentrated in three places: two wave specs cite invalid hard gates, the close ceremony invents glass-ui-internal machinery the precept spec does not define, and the research lettering is genuinely sloppy. None of the defects is fatal to the plan; all are doc fixes.

---

## 1 — Document set

SPEC §"Document Set" requires `{LETTER}.md`, `PROGRESS.md`, and `FINAL.md` (the last at close only). A carries `A.md` and `PROGRESS.md`; `FINAL.md` is correctly absent because A has not closed. Conditional documents — `waves/`, `research/`, `audit/`, `coordination/` — are all present and warranted: A is a broad parallel tranche with open design space.

One naming non-conformance. SPEC §"Document Set" names the required research directory `research/*.md`, and `coordination/` is mentioned nowhere in SPEC at all. `coordination/Q.md` §intro claims "Per the precept `SPEC §'Document Set'`: when ≥2 repos run tranches concurrently ... both publish a coordination artefact." That sentence is false. SPEC §"Document Set" lists no coordination artefact and contains no concurrent-repo clause. The `coordination/` directory is a sound idea inherited from glass-ui's constellation practice, but A.md and Q.md both cite a precept rule that does not exist. This is a citation defect, not a structural one: the directory should stay; the false citation must be corrected.

`audit/` exists as a directory only because this audit doc populates it. A's plan names `audit/W0-playwright-boot/`, `audit/W1-class-resolution.md`, and similar paths as gate artefacts. SPEC §"Document Set" permits `audit/*.md` as conditional, so this is conformant.

Malformation check: A.md follows the §"Plan Shape" 9-point order exactly (opening paragraph, thesis, invariants, wave table, phase links, critical files, hard gates, cross-tranche debt, brittleness window). PROGRESS.md is an execution log with a wave table. Both are well-formed.

---

## 2 — WAVE_SPEC conformance

WAVE_SPEC.md §"Required Sections" lists nine sections: Header, State, Scope, File Bounds, Agent Units, Hard Gate, Verification Artefacts, Dependencies, Archaeology (Archaeology conditional). Every wave is numbered and named — `A.W0 HEADLINE — Consumer un-break` through `A.W5 HEADLINE close — Blob/aurora abstraction + close`. The numbering is contiguous W0..W5.

Section-by-section across W0..W5:

- Header, State, Scope, File Bounds, Hard Gate, Verification Artefacts, Dependencies — present in all six.
- Archaeology — present in W0 (the three reproduced faults), correctly absent from W1..W5, which revisit no prior attempt.

One real WAVE_SPEC gap. §5 "Agent Units" requires `One subsection per dispatchable unit` in the form `### {LETTER}.W<N>.<x> <Title>` with `Mechanism:`, `Files:`, `Sub-gate:` bullets. No wave in A uses that subsection form. The waves instead organize scope into "Lane A / Lane B / Lane C" headings under §Scope. The lanes carry mechanism prose and a file table, but they are not WAVE_SPEC §5 agent-unit subsections and they carry no per-lane `Sub-gate:`. The hard gates are wave-level only. For a 4-lane wave like W3 or W4, a missed lane has no isolated close criterion; the orchestrator cannot verify lane C closed without re-deriving its sub-gate from the wave gate. This is a uniform omission across all six waves.

Two non-standard sections appear in every wave: `Format and lint cadence` and `Commit plan`. WAVE_SPEC does not define these. They are harmless additions and carry real content (the commit-scope convention), but they are extra-spec.

---

## 3 — Hard-gate validity

SPEC §"Hard Gates" lists five invalid forms: `"API exists"`, `"grep found a source string"` for runtime behaviour, `"consumer will be wired later"`, disabled feature flag with no restoration wave, narrative-only proof. WAVE_SPEC §Prohibitions repeats `No grep-only runtime gates`.

W0 gate — valid. Five numbered conditions: dev-server boot with no overlay, a Playwright 3-viewport probe, `npm run build` artefact presence, `vue-tsc` clean, `npm test` green. Every condition names a command or a runtime observation. Conformant.

W2 gate — partially invalid. Conditions 1, 2, and 4 are grep checks used as the close criterion for runtime behaviour:

- Condition 1: `style.css contains no plain component selector — manual review + grep`.
- Condition 2: `No unscoped <style> block contains a non-transition, non-portal selector` — verified by inspection.
- Condition 4: `grep for -webkit-box, -webkit-overflow-scrolling, ::-webkit-slider in demo/ returns only the legitimate prefixes`.

Conditions 1 and 4 target structural facts about source text, so under `instructions/README.md` ("Grep-only checks are supplementary unless the target is purely structural") they are defensible as structural gates. Condition 2 — "no unscoped block contains a non-transition selector" — is a judgement call, not a mechanical grep, and is closer to narrative-only. W2 condition 3 (the Playwright dock-position probe) is a valid runtime gate, so W2 is not gateless; the structural conditions need an explicit `(structural)` label so a reader does not mistake them for runtime proof.

W3 gate — same pattern. Conditions 1, 2, 3 are all grep checks ("`grep` shows no `box-shadow:` literal", "no raw `rounded-2xl`", "the raw Tailwind sizes reduced to documented exceptions"). Condition 4 is a Playwright re-probe. W3's substantive claims — "one shadow language", "demo type roles on the φ scale" — are design outcomes a grep cannot prove. The grep proves the negative (no raw literal survives); it does not prove the positive (the surviving token is the right one). W3 needs the Playwright visual-diff condition promoted to the primary gate and the grep conditions marked structural-supplementary.

W1 gate — borderline. Conditions 1 and 2 are grep checks (`grep -rl 'variant="pane"'` returns zero; `grep` for the three undefined classes returns zero). Condition 1 also says "glass-ui Q.W2's `Card` warning is silent at boot" — that half is a runtime observation and valid. Condition 3 is a Playwright re-probe. W1 is acceptable because the runtime half (Card warning silent, Playwright re-probe) carries the gate; the greps are supplementary deletion proof of a structural fact (the prop string is gone). Label them structural.

W4 gate — valid. Condition 1 is a manual state walk in the Playwright probe (runtime). Condition 3 is `wc -l` on two files (a measurable artefact, valid as a deletion/structure proof). Condition 4 is a Playwright overlay sweep. Condition 2 ("no raw `bg-card/95` floating surface") is the one grep-shaped condition and is structural. Conformant.

W5 gate — valid. Condition 1 is a `git` deletion proof. Condition 2 is a runtime render observation. Condition 3 is a Playwright re-probe. Conditions 4 and 5 are audit-clean plus the build/test/typecheck matrix. Conformant.

No wave gate closes on "API exists" or "consumer wired later". No wave carries a disabled flag. The defect is narrower than that: W2 and W3 lean on grep as the load-bearing gate for design outcomes that grep cannot verify. The fix is to re-rank the conditions so the Playwright probe is primary and label the greps `(structural, supplementary)`.

---

## 4 — Research lettering

A's research files are `Aa`, `Ab`, `Ad`, `Ae`, `Ag` — five deliverables with gaps at `Ac` and `Af`. The internal lane IDs compound the inconsistency: PROGRESS.md §"Round 1" labels the five lanes `Aα Aβ Aγ Aδ Aε` (Greek), and the deliverables themselves use a third scheme — `Aa-runtime-keystone.md` opens with the header `# A.Rα` and `Ad`/`Ae`/`Ag` refer to themselves as `A.Rδ`, `A.Rε`, and so on. So one tranche carries three parallel naming systems for the same five lanes: Latin filenames with gaps (`Aa..Ag`), Greek lane IDs (`Aα..Aε`), and `A.R<greek>` document headers.

glass-ui's peer tranche Q uses one coherent Greek scheme (`Qα..Qζ`). A's filename gaps at `Ac` and `Af` are not intentional reservations — nothing in A.md, PROGRESS.md, or A-challenge.md explains them, and the lane count is five, not seven. The most likely cause is research lanes that were planned with letters `Aa..Ag`, two of which (`Ac`, `Af`) were dropped or merged before the deliverables were saved, with the survivors keeping their original letters. PROGRESS.md's wave table names the lanes "Aα/runtime keystone ... Aε/structure" but the design-tokens lane is `Aγ` mapped to file `Ag` — the Greek and Latin orders do not even agree (γ is the 3rd Greek letter, `g` is the 7th Latin letter).

This is sloppy, not malformed. The deliverables are present and authoritative; the plan reads correctly. But a future reader who sees `research/Aa, Ab, Ad, Ae, Ag` will assume `Ac` and `Af` exist and were lost, and the three-scheme overlap makes every cross-reference ambiguous.

Recommendation: rename the five research files to one contiguous scheme. The cheapest correct fix is `research/A1..A5` (Latin-numeric, contiguous, no Greek/Latin collision), or `research/Aα..Aε` to mirror glass-ui Q. Update the `# A.R<x>` headers, the PROGRESS.md lane table, and every `research/A<x>` cross-reference in A.md, findings.md, A-challenge.md, the wave specs, and coordination/Q.md to match. A.md §10 and the wave-spec `Source:` lines are the high-traffic cross-references.

---

## 5 — Challenge

CHALLENGE.md requires that every open-ended research wave is followed by a challenge wave that falsifies research claims against artefacts, that challengers do not brainstorm or expand scope, and that claims marked speculation cannot become hard gates. Dispatch sizing: "half the research-agent count, minimum two."

`research/A-challenge.md` carries five challenges (C1..C5). Research had five lanes, so five challenges exceeds the "half, minimum two" floor — A ran more challenge coverage than the minimum, which is permitted. Each challenge follows the CHALLENGE.md prompt skeleton: it states the claim, identifies the supporting or contradicting artefact, marks a disposition (resolved / partly upheld / upheld in part / spot-verified), and states the plan consequence. C2 and C5 are recorded as having changed the plan, which is the correct challenge outcome — research becomes authority only after challenge. The challenge does not expand scope; C2 explicitly narrows it (the 11 glass-ui gaps become problem statements, not API). This satisfies CHALLENGE.md's intent.

One structural weakness. A-challenge.md is a single document authored as one pass, not the output of dispatched challenge agents. CHALLENGE.md §Dispatch says "Assign each challenger specific research deliverables or claim clusters." A's five challenges read as orchestrator-authored adversarial review, which is permitted (DOC_UPDATE_WAVE.md allows orchestrator-owned work), but PROGRESS.md §"Round 2" calls it a "challenge pass" without recording whether agents were dispatched. For a five-lane research wave with ~70 findings, a single-author challenge is thinner coverage than the per-cluster dispatch CHALLENGE.md describes.

Should A run a round-2 audit the way glass-ui Q ran 6 round-1 + 2 round-2? glass-ui Q's two-round structure is a glass-ui-internal practice; the precept spec mandates exactly one challenge wave after research, not two. A is planning-only and has authored a challenge. The precept floor is met. The hardening lanes now running against A (this audit is HARDEN-6) are the functional round-2 audit — methodology, gate validity, honesty. A does not need a separate research round-2 before implementation; it needs the hardening-lane findings folded back into the plan before W0 dispatch. The recommendation is to record in PROGRESS.md that the hardening sweep is A's round-2 review, so the lineage is explicit.

---

## 6 — Zero-deferral honesty

A.md §8 claims "None within value.js's bounds. Every `research/Aa..Ae` finding is assigned to a wave (W0–W5) or, where the fix is a glass-ui substrate change, to `coordination/Q.md`." Invariant A5 restates this. SPEC §Close permits "a named destination" as a valid close-state.

Cross-check against the research finding inventory. The five research files carry roughly 70 findings: Aa has 4 (`A-key-1..4`), Ab has 19 (`Ab-1..19`), Ad has 20 (`Ad-1..20`), Ae has 16 (`Ae-1..16`), Ag has 14 (`Ag-1..14`). Note A.md §8 and §10 both write "`research/Aa..Ae`" — that range omits `Ag`, the design-tokens file with 14 findings. A.md §3's W3 row and §4 do reference `research/Ag` explicitly, so Ag's findings are routed; the `Aa..Ae` shorthand is a writing slip that under-states the research set by one file. It should read `Aa..Ag` or, after the §4 rename, the corrected contiguous range.

Routing spot-check against the ~70 findings:

- Aa `A-key-1..4` — routed to W0 (1,2,3) and W1 (4). Assigned.
- Ab `Ab-1..19` — W2 absorbs the dock chain (Ab-14), unscoped-style split (Ab-8,9,10), deprecated CSS (Ab-11,12,13), z-tier (Ab-15). W3 absorbs the shadow/radius/surface findings (Ab-1,2,4,17,19). Ab-3, Ab-5, Ab-6, Ab-7, Ab-16, Ab-18 are styling findings that map to W2/W3 by category but are not individually named in any wave spec. They are plausibly absorbed under W2's "deprecated-CSS retire" and W3's "token consolidation" headings, but a reader cannot confirm Ab-16 (PointerDebugOverlay hardcoded colors, which Ab itself marks "acceptable to defer") landed anywhere. Ab-16 is the clearest honesty gap: the research explicitly defers it, no wave names it, and A.md §8 claims zero deferrals.
- Ad `Ad-1..20` — W4 names Ad-1..6, Ad-13,14,15, Ad-7..12, Ad-16..19. Ad-20 (`SelectContent` widths) is explicitly marked in Ad as "Not worth fixing as a single change" — that is a retire-with-rationale, which A5 permits, but no wave records the retirement. Ad-20 needs an explicit "retired, see Ad §Ad-20" line in a wave spec or A.md §8.
- Ae `Ae-1..16` — W4 names Ae-1..6, W5 names Ae-9,10,11,13,14. Ae-12 (Aurora cursor seam) is marked in Ae as "Worth noting as a known seam, not a blocker" and Ae-15/Ae-16 route to coordination. Ae-12 is un-routed; it is a noted non-blocker, but A5 forbids un-destinationed items, so it needs a recorded disposition.
- Ag `Ag-1..14` — W1 absorbs Ag-2,3,4,8(partial). W3 absorbs Ag-1,5,7,9,10,11,12,13. Ag-6 (`--glass-opacity-subtle` override targets a retired token) is a P1 real bug in Ag's own priority list and is named in no wave. Ag-6 is a genuine miss: it is a runtime bug equal in class to the undefined-class bugs W1 carries, yet W1 and W3 both omit it.

Honest assessment: A's routing is ~90% complete. The headline and P0/P1 findings are all assigned. The misses are four lower-priority items — Ab-16, Ad-20, Ae-12, Ag-6 — that A.md §8's absolute "None" does not survive. Ag-6 is the one that matters: it is a P1 bug, not cleanup. The "named cross-repo destination" escape in §3 of coordination/Q.md is used honestly — the 11 glass-ui gaps each carry a consumer count and a file:line, the destination is named (glass-ui Q or a named successor), and C2 correctly demoted them from API proposals to problem statements. The cross-repo escape is not abused. The defect is the four un-routed value.js-side findings against an absolute "None" claim.

---

## 7 — Brittleness window

SPEC §"Brittleness Window" defines the format exactly:

```yaml
breaking_changes_during_wave: yes
suspended_gates:
  - <gate temporarily suspended>
restoration_wave: W<N>
reason: <why this is simpler than a false-compatible bridge>
```

A declares a brittleness window in two places, and neither uses the spec keys.

A.md §9:

```yaml
dependency: glass-ui metaballs positionSource hook + pointer input + per-blob opacity ...
blocks: A.W5 (blob/aurora idiomatic abstraction)
resolution: coordination/Q.md proposes the extension set to glass-ui Q; ...
```

W5.md §"Brittleness declaration":

```yaml
breaking_changes_during_wave: no
dependency: glass-ui metaballs positionSource hook + pointer input ...
blocks: A.W5 implementation lanes A and B
restoration: if glass-ui ships the extensions ...
reason: the extension set is not in glass-ui Q's current wave plan ...
```

The W5.md block uses `breaking_changes_during_wave` and `reason` (spec keys) but replaces `suspended_gates` with `dependency` + `blocks`, and `restoration_wave: W<N>` with a prose `restoration:` paragraph. The A.md §9 block drops `breaking_changes_during_wave` entirely and is keyed `dependency / blocks / resolution`.

The substantive issue is that A.W5 is not actually a brittleness window as SPEC defines it. SPEC §"Brittleness Window" describes a tranche that "intentionally break[s] the tree inside a wave." W5.md's own block says `breaking_changes_during_wave: no`. A.md §9 states it plainly: "This is a cross-repo sequencing dependency, not a tree-breaking window." A correctly understands its own situation — W5 stalls on an external dependency, the tree never breaks — but then files that situation under the heading "Brittleness window" and dresses it in a YAML block that imitates the SPEC format with non-standard keys. SPEC §Close says "open brittleness windows are restored" and "the close ceremony cannot run while a brittleness window is open"; if A.W5 is labelled a brittleness window, a literal reading blocks A's close ceremony until W5 restores, even though nothing is broken.

This is a naming defect with a real consequence. A.W5's dependency is a cross-repo sequencing risk with a named fallback destination — exactly the §Close "named destination" mechanism and the §"Scope Reveal" mode-3 path. It is not a brittleness window. The fix: rename A.md §9 and W5.md's section from "Brittleness window" / "Brittleness declaration" to "Cross-repo dependency and fallback", drop the YAML mimicry, and state the dependency, the blocked wave, and the named fallback destination as prose. If A wants to keep a structured block, it should not borrow the brittleness-window keys, because A is not breaking the tree and should not inherit the close-blocking semantics of an open window.

---

## 8 — Close ceremony

W5.md §"Close ceremony" specifies: a strengthened close audit with "read-only lanes covering plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, the visual-runtime re-probe ... and an integrity sweep (`git reflog` ... `git stash list` clean)"; a visual-runtime lane; `FINAL.md`; a "close-honesty checklist". W5.md §State references "the strengthened close audit (read-only, up to 7 lanes per the dual ceiling)." The task framing refers to "the 7 read-only audit lanes α/β/γ/δ/ε/π/ι."

The precept spec defines no such ceremony. SPEC §Close is six bullet points: every item landed/retired/destinationed, every gate has evidence, PROGRESS.md matches reality, FINAL.md cites commits, brittleness windows restored, local repo close requirements satisfied. There is no 7-lane audit, no α/β/γ/δ/ε/π/ι lane lettering, no "integrity sweep", no "visual-runtime lane", and no "close-honesty checklist" anywhere in SPEC.md, README.md, ORCHESTRATION.md, or any precept instruction file. The grep confirms it: "close ceremony" appears once in the whole precept tree, in SPEC.md line 81, with no definition.

So the 7-lane close ceremony and its Greek/π/ι lettering are glass-ui-internal practice. value.js is a first tranche (A.md §intro: "first tranche authored in this repo"). A legitimately inherits the precept-defined close obligations — the SPEC §Close six bullets — and nothing more. The α/β/γ/δ/ε/π/ι lanes, the "dual ceiling", and the named "integrity sweep" / "visual-runtime lane" are conventions from glass-ui's tranche that A imported without a precept basis and without recording that they are a value.js-side choice.

This is not wrong to do — a richer close audit is good practice and the precept spec is a floor, not a ceiling — but A presents glass-ui-internal machinery as if it were spec. W5.md §State writes "up to 7 lanes per the dual ceiling" as though "the dual ceiling" is a known precept term; it is not. The orchestration ceiling in the precept spec is one number: 10 agents (SPEC §Waves, ORCHESTRATION §"Wave Model"). There is no "dual ceiling."

What A legitimately inherits as a value.js first tranche:

- SPEC §Close — the six close conditions. Binding.
- SPEC §Waves, §"Hard Gates", §"Brittleness Window" — binding.
- ORCHESTRATION integration checks, DOC_UPDATE_WAVE doc reconciliation — binding.
- The `git stash list` / `git reflog` integrity discipline — `dispatch/AGENT.md` correctly grounds this in `instructions/LESSONS-LEARNED.md` ("six `git stash` recurrences across glass-ui's K→Q span"), so the integrity sweep has a precept basis even though SPEC §Close does not name it as a ceremony lane.

What is glass-ui-internal and must be marked as a value.js-side adoption:

- The 7-lane α/β/γ/δ/ε/π/ι audit structure.
- The "dual ceiling" phrase.
- The named "visual-runtime lane" and "idiomatic-gestalt" lane.

Fix: W5.md §"Close ceremony" should state that the strengthened close audit is a value.js adoption of glass-ui's close practice, not a precept requirement, and should drop or define "the dual ceiling." The substance of the close audit can stay; the false precept attribution must go.

---

## 9 — Agent dispatch

`dispatch/AGENT.md` adapts the precept `AGENT_DISPATCH_TEMPLATE.md` and glass-ui Q's dispatch doc.

Git clause — complete and correct. The "Hardened agent git clause" enumerates every mutating git command as forbidden (`git add`, `git stash` any form, `git commit`, `git checkout`, `git reset`, `git restore`, `git rebase`, `git merge`, `git cherry-pick`, `git revert`, `git push`, `git pull`, `git fetch --prune`) and lists the read-only allowance (`git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-files`, `git stash list`). It grounds the rule in the LESSONS-LEARNED `git stash` incident ledger. It states the orchestrator owns the index and pushes, and that an agent reverts surgically with Edit, never with a state-rewinding git command. This is more thorough than the precept template, which says only "no stubs or disabled paths." Conformant and well-specified for value.js.

Hard caps — present and correct. The doc sets research/audit 25–35 min (HEADLINE runtime lane 35, live Playwright 40), implementation 30 min, doc-only 20 min. AGENT_DISPATCH_TEMPLATE only says "hard cap, if the harness supports one"; A specifies concrete numbers, which is acceptable repo-specific detail. ORCHESTRATION §"Dispatch Contract" wants the cap in every prompt; AGENT.md §"Agent dispatch contract" restates "a hard time cap" as a required prompt element. Conformant.

Worktree rules — present and correct. AGENT.md §"Worktree isolation" states that a wave with ≥2 agents writing shared files dispatches with worktree isolation and the orchestrator integrates via `git cherry-pick`, never merge; it names W2/W3/W4 as worktree waves and W0/W1 as shared-tree, and exempts read-only lanes. This matches the wave specs (W0.md and W1.md both say "shared tree, no worktree"; W2/W3/W4 say "worktree isolation"). ORCHESTRATION §"Wave Model" wants disjoint write scopes; A's worktree rule is the value.js mechanism for the case where bounds are not disjoint. Conformant.

One inconsistency between AGENT.md and the wave specs. AGENT.md §"Worktree isolation" says A.W0 and A.W1 "have disjoint-enough bounds for a shared tree." W0.md §State and §"File bounds" then disclose that Lanes A and C both write `vite.config.ts` and `package.json` — "disjoint blocks within shared files." That is two agents writing the same two files in one wave. ORCHESTRATION §"Wave Model" says "No overlapping write bounds inside a wave" and SPEC §Waves repeats it. W0 resolves this by claiming the blocks within the files are disjoint (A owns `resolve`, C owns `build.outDir` + `scripts`) and the orchestrator integrates both. Two agents editing one file is a write-bounds overlap at the file granularity even when the edited regions differ; the precept rule is stated at file granularity. W0 is defensible — the regions genuinely do not collide and the orchestrator merges two small disjoint hunks — but AGENT.md calling W0 "disjoint-enough for a shared tree" understates that W0 has a real shared-file write overlap that only the orchestrator's hunk-level integration keeps safe. The honest description is "W0 has overlapping file bounds resolved by orchestrator hunk integration," not "disjoint-enough."

One extra-spec but harmless addition: AGENT.md §Prose cites "the precept `STYLE.md`." There is no `STYLE.md` in `docs/precepts/instructions/` (confirmed: the directory holds README, ORCHESTRATION, CONSUMING, LESSONS-LEARNED, and the `tranche/` subdir; no STYLE.md anywhere under `docs/precepts/`). AGENT.md cites a precept file that does not exist. The prose rules it summarizes (declarative, evidence-led, unspaced em-dashes, no epanorthosis) are sound, but the citation is to a phantom document.

---

## 10 — Style spot-check

There is no `STYLE.md` in the precept tree, so this lane checks A's prose against the rules stated in the audit task: banned words (delve, robust, leverage, navigate, showcase, intricate, testament, underscore, pivotal, foster, seamless, realm, tapestry), unspaced em-dashes with max one per paragraph, no "not X but Y" epanorthosis, no bolded pseudo-list lead-ins.

Banned words — `grep -i` across A.md, findings.md, and the six wave specs finds zero occurrences of any banned word. Clean.

Em-dashes — A uses unspaced em-dashes throughout, which matches the convention. Several paragraphs carry more than one em-dash. A.md §1 thesis paragraph and the A-key bullet list use two or three per item; findings.md §3 root-cause bullets likewise. The "max one per paragraph" rule is broken in roughly a quarter of the prose paragraphs across A.md and the research files. This is a density issue, not a correctness one — the dashes are all unspaced and used correctly as parenthetical or appositive breaks — but the plan would read tighter with some converted to commas or sentence breaks.

Epanorthosis ("not X but Y") — A.md §1 contains a clean instance: "not because the dock or panes are themselves broken, but because their setup was amputated mid-hook" (this exact phrasing is in Aa §3, quoted into the plan's logic). findings.md and the research files carry a few more "not X, Y" constructions. These are mild and the prose is otherwise direct; flag as a minor recurring tic, not a systemic problem.

Bolded pseudo-list lead-ins — A.md uses bolded lead-in fragments as paragraph openers: §1 "**Attribution correction.**", §2 invariant entries "**glass-ui-first consumption.**", "**Consumer-resolution integrity.**", and similar; Aa §3 "**The cascade.**", "**Attribution correction.**"; coordination/Q.md §2 "**Resolution of the five overlapping items.**", "**Sequencing.**". These are bolded sentence-openers, which the audit task names as an AI-writing sign. The numbered invariant list in A.md §2 is the heaviest concentration — every one of the five invariants opens with a bolded noun phrase. This is the clearest style defect: it is consistent across A.md, findings.md, and the research files, and it is exactly the pattern the task flags.

Overall the prose is declarative and evidence-led — every research finding cites a file:line, every gate names a command. The style defects are two recurring tics (em-dash density, bolded lead-ins) rather than vague or motivational writing. A.md §1 does carry one stretch of near-motivational framing ("A's remediation does not add machinery. Every fix is the deletion of a fossil that fights an existing mechanism") which SPEC §"Plan Shape" warns against ("Do not include commentary, motivational prose"); it is borderline — it is making a real architectural point — but it reads as thesis-flourish.

---

## Prioritized defect list and exact doc fix

P1 — honesty and correctness defects, fix before W0 dispatch:

1. **A.md §8 "None" overstates zero-deferral.** Four research findings are un-routed: `Ag-6` (P1 bug — `--glass-opacity-subtle` override targets a glass-ui-retired token), `Ab-16` (PointerDebugOverlay hardcoded colors, research-marked deferrable), `Ad-20` (`SelectContent` widths, research-marked not-worth-fixing), `Ae-12` (Aurora cursor seam, research-marked non-blocker). Fix: add `Ag-6` to W3 Lane A scope (it is a token bug, same class as the W3 shadow/radius work); add an explicit retire-with-rationale line for `Ab-16`, `Ad-20`, `Ae-12` to A.md §8, citing each research finding's own deferral note. §8 then reads "every finding lands, retires with recorded rationale, or has a named destination" honestly.

2. **A.W5 mislabelled as a brittleness window.** A.md §9 and W5.md §"Brittleness declaration" both say `breaking_changes_during_wave: no` and A.md §9 states "not a tree-breaking window," yet both file the dependency under "Brittleness window" with a YAML block mimicking SPEC §"Brittleness Window" keys. This risks SPEC §Close blocking A's close on a non-existent open window. Fix: rename both sections to "Cross-repo dependency and fallback"; remove the YAML brittleness-key mimicry; state the dependency, the blocked wave (W5 lanes A/B), and the named fallback (glass-ui successor tranche + value.js tranche B) as prose. Remove "Brittleness window — see A.md §9" from W5.md §State.

3. **W2 and W3 hard gates lean on grep for design outcomes.** W2 conditions 1/2/4 and W3 conditions 1/2/3 are grep checks used as the close criterion; W3's claims ("one shadow language", "type roles on the φ scale") are positive design outcomes a grep cannot prove. Fix: in W2.md and W3.md §"Hard Gate", promote the Playwright visual-diff condition to condition 1 (primary runtime gate) and append `(structural, supplementary)` to each grep condition.

P2 — citation and naming defects, fix before close:

4. **Phantom precept citations.** `coordination/Q.md` §intro cites "`SPEC §'Document Set'`" for a concurrent-repo coordination clause that SPEC does not contain; `dispatch/AGENT.md` §Prose cites "the precept `STYLE.md`" which does not exist. Fix: in Q.md, change the citation to "value.js A adopts glass-ui's constellation-coordination practice" with no false SPEC reference; in AGENT.md, replace "the precept `STYLE.md`" with the inline prose rules themselves or a reference to whatever style source actually governs.

5. **Close ceremony presents glass-ui-internal machinery as spec.** W5.md §"Close ceremony" and §State describe a 7-lane α/β/γ/δ/ε/π/ι audit and a "dual ceiling" with no precept basis; SPEC §Close is six bullets and the only orchestration ceiling is 10 agents. Fix: in W5.md, state that the strengthened close audit is value.js A's adoption of glass-ui's close practice, not a precept requirement; delete "the dual ceiling" or define it inline; keep the SPEC §Close six conditions as the binding floor.

6. **Research lettering is incoherent.** Files `Aa, Ab, Ad, Ae, Ag` have unexplained gaps at `Ac`/`Af`; lane IDs use Greek (`Aα..Aε`); document headers use `A.R<greek>`; the Greek and Latin orders disagree. Fix: rename the five files to one contiguous scheme (`research/A1..A5` recommended, or `Aα..Aε` to mirror Q); update the `# A.R<x>` headers, PROGRESS.md §"Round 1" lane table, and every `research/A<x>` cross-reference in A.md (§3, §4, §10), findings.md (§3, §4), A-challenge.md, the six wave specs (`Source:` lines), and coordination/Q.md §3.

7. **`research/Aa..Ae` shorthand omits Ag.** A.md §8 and §10, dispatch/AGENT.md §"Zero deferral", and coordination/Q.md all write "`research/Aa..Ae`" — a range that excludes `research/Ag` and its 14 findings. Fix: change every `Aa..Ae` to `Aa..Ag` (or the corrected contiguous range after fix 6).

P3 — structural and style defects, fix opportunistically:

8. **Waves omit WAVE_SPEC §5 agent-unit subsections and per-lane sub-gates.** All six waves organize scope into "Lane A/B/C" headings without the `### {LETTER}.W<N>.<x>` subsection form or a `Sub-gate:` per lane; multi-lane waves (W3, W4) have no per-lane close criterion. Fix: in each wave spec, give each lane a `Sub-gate:` line naming the artefact that closes that lane, so the orchestrator can verify lanes independently. Adopting the full `### A.W<N>.<x>` header form is optional; the load-bearing missing element is the per-lane sub-gate.

9. **AGENT.md understates W0's shared-file write overlap.** AGENT.md calls W0 "disjoint-enough for a shared tree"; W0.md discloses Lanes A and C both write `vite.config.ts` and `package.json`. Fix: change AGENT.md §"Worktree isolation" to state W0 has overlapping file bounds resolved by orchestrator hunk-level integration, not "disjoint-enough."

10. **Style tics — bolded pseudo-list lead-ins and em-dash density.** A.md (especially the §2 invariant list, every entry opening with a bolded noun phrase), findings.md, and the research files use bolded sentence-openers and run two-plus em-dashes per paragraph in roughly a quarter of paragraphs. Fix: convert bolded lead-in fragments to plain sentence openers or real headings; thin em-dashes to one per paragraph by substituting commas or sentence breaks. Trim the §1 motivational-flourish sentences ("does not add machinery", "deletion of a fossil") per SPEC §"Plan Shape."

11. **Challenge lineage unrecorded.** A-challenge.md is a single-author pass; PROGRESS.md does not say whether challenge agents were dispatched, and the hardening sweep's relationship to a round-2 review is unrecorded. Fix: add a PROGRESS.md line stating the challenge pass was orchestrator-authored adversarial review (permitted) and that the hardening lanes (HARDEN-1..N) are A's round-2 audit, to be folded into the plan before W0 dispatch.

---

## Summary

Tranche A is a competent, spec-aware plan. It carries the required document set, follows SPEC §"Plan Shape", runs research-then-challenge, and its agent-dispatch contract is more rigorous than the precept template. The methodology defects are real but bounded: the zero-deferral claim overstates by four findings (one a P1 bug), A.W5 is mislabelled a brittleness window when it is a cross-repo dependency, two wave gates lean on grep for design outcomes grep cannot prove, the close ceremony presents glass-ui-internal lane machinery as precept, the research lettering carries three competing schemes with unexplained gaps, and two precept citations point at clauses and a file that do not exist. Every defect is a doc fix; none requires re-planning. Fix the P1 honesty and gate defects before W0 dispatch.
