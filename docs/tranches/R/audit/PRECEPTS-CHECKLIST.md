# Precepts Checklist — binding form for Tranche R wave/tranche-spec documents

The numbered rows below are the binding checklist an author (or auditor) runs
against every `docs/tranches/R/**` plan, wave spec, letter, and close doc. Each
row gives its class, the precept in one sentence, the source anchor, and what
compliance concretely looks like in an R wave spec.

The precepts govern FORM — structure, criteria pairing, explication, style,
calibration. They never govern R's ratified substance (α=1.0, hero-lab KILLED,
X2 in-W7, the retro-tag table, the 2.0.0 cut, every file:line anchor). A
compliance edit preserves technical content exactly.

Source roots (all under `docs/precepts/`): `instructions/tranche/SPEC.md`
(working tree), `instructions/tranche/WAVE_SPEC.md`, `instructions/README.md`,
`instructions/TRANCHE-AND-WAVE-SPEC.md`, `instructions/STYLE.md`,
`instructions/LESSONS-LEARNED.md` (working tree), `cross-repo-dev-resolution.md`,
`glossary/meta-terms.md`. Two commits postdate the R corpus authoring and are the
likeliest compliance gaps: `f27627e` (paired goal + completion criterion at every
unit level) and `a59c60d` (explication discipline + abrogate meta-jargon).

Local value.js authority (governs the retired-idiom rows): the repo `CLAUDE.md`
`## Test + verify` note ("the grep-based `proof:*` invariant scripts (G/H-era)
were retired as overfit") and project memory `feedback-proof-idiom-retired`.

---

## MUST — genuinely binding (structure, gates, close discipline)

**M1 · Paired goal + completion criterion at EVERY unit level.**
Every tranche, wave, and sub-wave (numbered agent unit) declares BOTH a goal
criterion (forward-looking aim, "what is this for?") AND a completion criterion
(backward-looking evidence, "what artefact proves it done?"); both must hold for a
clean close.
Source: `TRANCHE-AND-WAVE-SPEC.md §"Goal criterion + completion criterion
(paired)"`; `README.md` edict (:55-65); `SPEC.md §Plan Shape` items 3+8 (:49,:57);
`WAVE_SPEC.md §2a` (:37-47) + agent-unit `Goal`/`Sub-gate` (:112-125); commit
`f27627e`.
Compliance in a wave spec: `R.W2.md` carries a `§Goal criterion` and a
`§Completion criterion` (as `R.W0.md` already does at :10-16), and EACH
`R.W2.<x>` agent unit carries a `Goal:` bullet paired with a `Sub-gate:` bullet —
not a lone hard-gate. A wave whose gates pass but whose goal is unmet closes
`complete_with_misses`, not `complete`.

**M2 · Tranche plan carries the 10-item Plan Shape in order.**
`R.md` contains, in sequence: opening paragraph, thesis, goal criterion,
invariants, wave table (each row with an inline goal column or a cross-ref to the
wave's Goal section), phases/links, critical files + ownership, completion
criterion (hard gates), cross-tranche debt + explicit deferrals, brittleness
window.
Source: `SPEC.md §Plan Shape` (:43-71).
Compliance: `R.md`'s wave table row for each of W0/W1/W2/W3/W4/W6/W7 names the
wave (M3) and either an inline goal cell or points at `waves/R.W<N>.md §Goal
criterion`.

**M3 · Every wave carries a number AND a name; bare `W<N>` is invalid.**
The canonical display form `W<N> - <Title>` appears in the tranche table, progress
log, dispatch prompts, letters, and close reports wherever the wave has a name.
Source: `README.md` edict "Every wave is named" (:50-54); `SPEC.md §Waves`
(:76-79); `WAVE_SPEC.md §Header` (:12-17).
Compliance: `PROGRESS.md` and `R.md` write "R.W7 — X2 / NCSU retirement", never a
bare "W7". (R.W0's header `# R.W0 — SUBSTRATE (hygiene + truth...)` is the
pattern.)

**M4 · Wave-spec required sections are present.**
A `waves/R.W<N>.md` carries Header, State (Name/Opens-after/Agents/Hard-gate/
Status), Goal criterion, Scope, Triumvirate Dispatch, File Bounds, Disjointness,
Worktree Plan (if >1 writer), Agent Units, Hard Gate, Format+Lint Cadence,
Verification Artefacts, Commit Plan, Dependencies, Archaeology (only when
revisiting).
Source: `WAVE_SPEC.md §"Required Sections"` (:19-169).
Compliance: `R.W1.md` names its lint/format cadence (`npm run lint` + `typecheck`
+ `npm test`) under a Format+Lint Cadence section and its saved artefacts (commit
hashes, test counts) under Verification Artefacts, not only a bare gate line.

**M5 · Agent units are named and paired.**
Each dispatchable unit is `R.W<N>.<x> <Title>` with a noun-phrase title (bare
positional refs like `W2.2` are invalid in tables, packets, gates, audits) and
carries `Goal:`, `Mechanism:`, `Files:`, `Sub-gate:`.
Source: `WAVE_SPEC.md §5` (:104-125); `TRANCHE-AND-WAVE-SPEC.md §"Agent unit"`.
Compliance: a multi-agent R wave lists `### R.W2.1 dual-mount blob defect` with all
four bullets, not `### Agent 1`.

**M6 · Hard gates close on artefacts; invalid-gate forms are banned.**
A gate is valid only when an artefact verifies it: build/lint output, focused test
output, runtime observation, benchmark/profiling output, generated-code diff,
deletion proof, or explicit document reconciliation. Invalid: "API exists",
grep-for-a-source-string standing in for runtime behaviour, "consumer wired
later", a disabled flag with no restoration wave, narrative-only proof, or a silent
`console.warn`+return in a library-owned failure mode.
Source: `SPEC.md §Hard Gates` (:94-116); `README.md §Gates` (:171-186); fail-explicit
edict (:82-93).
Compliance: `R.W2`'s "renders without the w6a shim" bar cites a Playwright/runtime
observation (the SHIM-oracle wording from R.W0-2), not a grep. A library-internal
failure in `src/` throws; only browser-API degradation stays a befitting silent
fallback.

**M7 · Six-agent implementation ceiling; disjoint write bounds.**
At most six parallel agents in an implementation wave (read-only audit lanes are the
documented exception, ceiling seven); no two agent units share a `modify` /
`modify-carve` path, and no two parallel waves write the same path.
Source: `SPEC.md §Waves` (:75,:83); `WAVE_SPEC.md §4a Disjointness` (:80-87);
`LESSONS-LEARNED.md` 2026-04-30 "Six-Agent Wave Ceiling".
Compliance: a parallel R wave's File Bounds table proves per-unit path
disjointness and its Worktree Plan names sibling worktrees before dispatch.

**M8 · Substrate lands with a same-wave consumer, or a declared brittleness
window + restoration wave; no stubs or forward hooks.**
Every new abstraction lands with a runtime caller, test, benchmark, or deletion
proof in the same wave; unconsumed scaffolding, stubs, and forward hooks are
forbidden.
Source: `README.md` "Substrate with consumer" (:28-29); `WAVE_SPEC.md
§Prohibitions` (:171-181); `LESSONS-LEARNED.md` 2026-04-29 "Substrate Without
Consumer Is Not Progress".
Compliance: R.W1's export-stability test lands in the same wave as the 2.0.0
`/easing` contract it guards.

**M9 · Brittleness window is declared before dispatch and restores in its wave.**
A wave that intentionally breaks the tree declares the YAML block
(`breaking_changes_during_wave` / `suspended_gates` / `restoration_wave` /
`reason`) before dispatch; the close ceremony cannot run while a window is open,
and every window restores in the wave that declared it.
Source: `SPEC.md §Brittleness Window` (:137-152); `glossary/meta-terms.md`
(brittleness-window entry).
Compliance: if R.W1's 2.0.0 field renames transiently red the build, the wave spec
carries the YAML block naming the restoration point; otherwise every wave closes
green.

**M10 · DEGRADED close requires a named restoration wave AND tranche.**
A wave that ships a knowingly-degraded runtime outcome declares DEGRADED in its
status line, names the restoration wave AND restoration tranche, emits a CHANGELOG
"KNOWN LIMITATION" entry, and the receiving tranche inherits the deferral as a hard
gate (not optional debt).
Source: `SPEC.md §"DEGRADED runtime outcomes"` (:118-135); `LESSONS-LEARNED.md`
2026-05-11 "DEGRADED Close Requires Bound Restoration".
Compliance: no R wave closes DEGRADED without both names; a bare CHANGELOG note is
an invalid gate.

**M11 · Zero-deferral close; the named successor is exact.**
When the owner binds zero-deferral, every planned item LANDS, RETIRES with
rationale, or ARCHIVES with permanent-out-of-scope justification; "deferred to next
tranche" is not a close-state, and a named successor is an exact wave/letter, never
"a future tranche".
Source: `SPEC.md §Close` (:191); `README.md` "No silent deferrals" (:25-27);
`LESSONS-LEARNED.md` 2026-05-16 "Zero Deferral Codified At Glass-UI P.W6".
Compliance: R's `hero-lab` KILL is recorded as a RETIRE-with-rationale (owner
order 2026-07-03), not a defer; the GLASSUI-RELAY GAP-1 ask names an explicit
owner/cut or is treated as a decline.

**M12 · Goal criterion is reconciled at close.**
`FINAL.md` reconciles each unit's stated aim against the landed work and records any
goal-miss honestly; gates-all-pass but goal-unmet closes `complete_with_misses`.
Source: `SPEC.md §Close` (:192); commit `f27627e`.
Compliance: R's `FINAL.md` (when authored) states, per wave, whether the goal
criterion held, not only whether the composite gate passed.

**M13 · Wire before retire, guarded by the audit-verdict spot-verification gate.**
An under-wired primitive is a wiring candidate by default; before a wave-spec
retires any `delete-unused` / `library-orphan` / `inline-and-remove` item, the
orchestrator spot-verifies: (a) the item exists at the cited path, (b) the cited rg
count re-runs accurately at HEAD, (c) every "zero consumers" claim resolves through
re-export aliases.
Source: `README.md` "Wire before retire" (:33-49); `SPEC.md §"Audit-verdict
spot-verification gate"` (:300-323); `LESSONS-LEARNED.md` 2026-05-13.
Compliance: R.W0's KEEP+RECORD of the `@mkbabb/keyframes.js` devDep cites the
verified non-phantom chain (`w0-truth §a`), refuting the N.W9′ "phantom" premise
before any retire is considered.

**M14 · The π visual-runtime lane is binding for a visual-shipping tranche.**
π runs paired (before/after) with a per-page `DELTA.md`, over ≥3 viewports, with
animation-timing samples on every modified state-toggle, contrast-vs-background
measurement for new interactive surfaces, a per-story consumption sweep, and an
explicit present/positioned assertion (DOM-rect + non-empty-pixel) on every
WebGL/canvas surface; baselines archive under
`audit/R.W<N>-visual-runtime/{baseline,close}/`. When browser automation is
unavailable, π runs at the build-verification floor and records the tooling
reason + the receiving-tranche re-probe obligation. A backend/doc-only wave may
skip π with a wave-spec justification.
Source: `SPEC.md §"The π visual-runtime lane"` (:219-281); `LESSONS-LEARNED.md`
2026-06-02 "Single-Snapshot π Misses Disappearing Elements (value.js Blob
Regression)".
Compliance: R.W3 (color-picker treatment) archives paired captures and asserts the
hero blob is present/positioned (the exact defect the value.js blob-regression
entry catalogues); a purely backend R wave writes the skip justification.

**M15 · The ι integrity-sweep is a binding close step.**
ι walks `git reflog --since=<open>` for agent-attributed mutating git ops, walks
`git log --since=<open> -- docs/precepts/` for unexpected submodule changes (any
change halts close), and runs `git stash list` across the primary repo and every
worktree used; zero unauthorized mutations and an empty stash list are
close-blocking components.
Source: `SPEC.md §Close` ι sub-section (:202-217); `LESSONS-LEARNED.md` 2026-05-14
invariant 27 + 2026-05-16 stash-script entry.
Compliance: R.W0-7 (resolve the two uncommitted `docs/precepts` edits INSIDE the
submodule before close) and R.W0-14 (remove the pass-2 lane worktrees) are the ι
preconditions; `FINAL.md` records the sweep result.

**M16 · A cross-repo coordination artefact is required at a confirmed race
surface.**
When R has a confirmed cross-repo write/handoff surface, the coordination doc (here
the `letters/`) names the peer repo's tranche letter, the peer's HEAD at
coordination time, the shared surfaces, the writer-vs-reader boundaries, the
conflict-resolution protocol, and each consumer's tree-cleanliness →
commit-vs-handoff disposition.
Source: `SPEC.md §Document Set` (:19); `LESSONS-LEARNED.md` 2026-05-11 "Cross-Repo
Parallel-Tranche Coordination Artefact" + 2026-05-18 "Cross-Repo Dirty-Tree
Coordination".
Compliance: `letters/GLASSUI-RELAY.md` names glass-ui's BG/BH owners, the 16+1
subpath surface, the reply-by-item boundaries, and states nothing on value.js's
side gates on the reply (reader posture); it declares value.js consumes via
`file:../glass-ui` (the pin, hence the tree state).

**M17 · Cross-repo dev-resolution follows contract-v2.**
Any resolution/pin content resolves `dist/` in dev and prod alike (the 3-key
`types`/`import`/`default` `exports` shape, no `development` key), every publisher
declares `build:watch`, and no consumer carries a `dist/` `resolve.alias`, a
self-alias of its own published name, a phantom transitive-devDep hoist, a
checked-in `dist/`, or a shared library/demo `outDir`. Any cross-repo PUSH is
orchestrator-authored, never agent-authored.
Source: `cross-repo-dev-resolution.md §2` (:59-181) + §4 invariant 30 (:219-241);
`LESSONS-LEARNED.md` 2026-05-11 "Cross-Repo Annotation Push Asymmetry".
Compliance: the R letters and W0-8/W0-12 pin-policy rows keep the deliberate
`file:../glass-ui` + `file:../keyframes.js` links and record them; they introduce
no `development` key and no hard `dist/` alias.

**M18 · Retired-idiom prohibition: no `proof:*` grep-script gates in value.js; no
ceremony bloat.**
value.js retired the grep-based `proof:*` invariant scripts as overfit; R wave
gates enforce invariants structurally (the type system + `tsc`/`vue-tsc` +
`eslint` + review), never by a re-introduced local grep-script gate, and R docs
stay lean (no ceremony bloat, no duplicated shared precepts).
Source: repo `CLAUDE.md §"Test + verify"` note; project memory
`feedback-proof-idiom-retired`; `SPEC.md §Plan Shape` "Do not include commentary,
motivational prose, or duplicated shared precepts" (:68). (Note: the glass-ui-owned
`cross-repo-dev-resolution.md` still cites `proof:resolution` — that gate lives
glass-ui-side; an R wave spec does not add a value.js-local `proof:*` script.)
Compliance: R.W1's export-stability guard is a vitest test, not a
`scripts/proof-exports.mjs` grep; the `boot-smoke` cold check is the named-export
drift catch-all (per the Q4 pin policy).

**M19 · Research is challenged before synthesis.**
Open design space runs a research wave followed by a challenge wave before the plan
synthesizes; research without challenge is input, not authority, and a claim marked
speculation cannot become a hard gate.
Source: `SPEC.md §"Research And Challenge"` (:181-186); `RESEARCH.md`; `CHALLENGE.md`.
Compliance: R's pass-1 / pass-2 audit lanes feed a synthesis (`SYNTHESIS-v2.md`)
and the ratification record before wave dispatch; no speculative claim is promoted
straight into an R hard gate.

**M20 · No tranche-letter shadow execution; retrospective plan-folder for orphan
cohorts.**
Work spanning more than one release-tag boundary is tranche-attributed by the
second tag; an orphan cohort discovered at open is absorbed with a
reverse-engineered plan folder (`<LETTER>.md` + `FINAL.md` + `PROGRESS.md` + source-
commit citations).
Source: `SPEC.md §"Retrospective Discipline"` (:22-41); `LESSONS-LEARNED.md`
2026-05-06 "No Tranche-Letter Shadow Execution" + 2026-05-16 AB+1 entry.
Compliance: R.W0-9/W0-10/W0-11 author the missing P/Q/N `FINAL.md` records and mint
the ten retro-tags at their exact publish commits, closing the untagged shadow
cohort.

**M21 · Wave-close discipline.**
Every wave lands its substrate with a consumer (or deletes it), closes green unless a
brittleness window says otherwise, updates its docs at close, and — for broad
implementation waves — runs lint/format gates at regular intervals (at minimum after
each integration batch and before close); docs-only waves run available document
checks plus `git diff --check`.
Source: `SPEC.md §Waves` (:84-89); `WAVE_SPEC.md §7` (:132-139); `LESSONS-LEARNED.md`
2026-04-29 "Docs Are Part Of Wave Close".
Compliance: each R wave spec's Commit Plan includes a doc/status commit at close and
names its cadence commands.

**M22 · Scope-reveal protocol governs mid-wave dilation.**
Absorb only when the file-bound expansion is at most two paths AND the hard gate is
unchanged; otherwise open `{LETTER}-II.md` or the next letter, record the
disposition in `audit/SCOPE-REVEAL-<date>.md`, and never answer scope reveal with
shadow APIs, compatibility shims, or unconsumed scaffolding.
Source: `SPEC.md §"Scope Reveal"` (:154-179); `README.md` "No quick fixes" (:10-12).
Compliance: if an R wave's real work exceeds its declared bounds, the spec routes to
a new letter rather than absorbing silently.

**M23 · The close-honesty checklist runs before terminal close.**
Every `FINAL.md` claim is grounded in `PROGRESS.md` or a cited artefact; every gate
marked MET has a resolving evidence path; every status word matches the latest gate
run; every cross-tranche-debt entry names an exact next-letter destination.
Source: `SPEC.md §"Close-Honesty Checklist"` (:283-297); `LESSONS-LEARNED.md`
2026-04-30 "Close-Honesty Checklist Before Terminal Close".
Compliance: R's `FINAL.md` cites each wave's close commit and the composite-gate
evidence, with no stale BLOCKED/DEFERRED status words carried from a superseded
capture.

**M24 · Every wave item carries explication (WHAT + WHY).**
Each item in a plan, `PROGRESS.md`, `FINAL.md`, or audit doc names both WHAT the
work is and WHY — the problem it addresses, the gate it clears, or the prior
decision it discharges; a bare reference to a wave-internal artefact attaches inline
explication or a cross-reference.
Source: `README.md` "Wave items carry explication" (:72-81); `STYLE.md §"Wave item
explication"` (:104-138); commit `a59c60d`.
Compliance: an R.W2 scope bullet reads "delete the `!important` 1440 shim (WHAT)
because the layered `components.css` fix lands on the next `file:../glass-ui` dist
rebuild (WHY)", not a bare "retire the shim". (R.W0's work-order table already
pairs each disposition with a verify-step and rationale.)

---

## STYLE — form calibration (prose register, cross-reference, jargon)

**S1 · Prose voice follows STYLE.md.**
Direct assertions; unspaced and sparing em-dashes (a paragraph with more than one is
over-punctuated); no epanorthosis ("not just X, but Y"); no banned words (delve,
tapestry, robust, leverage in the non-mechanical sense, pivotal, showcase,
landscape, intricate, and the rest); no editorializing or hype; contractions
welcome; tranche docs sit at the unpretentious-academic register.
Source: `STYLE.md §§Tone/Anti-patterns/Calibration` (:11-102,:158-179).
Compliance in a wave spec: gate text and scope bullets read as evidence and verbs;
the poetic-lilt budget (≤5%) does not touch a hard-gate clause.

**S2 · No AI-writing signs.**
Avoid empty significance gestures, vague attribution, promotional warmth,
outline-shaped closers, elegant variation (rotating synonyms for one noun),
inline-header vertical lists with bolded lead-ins followed by colons, mechanical
boldface across a paragraph, and title-case headings beyond sentence case.
Source: `STYLE.md §"AI-writing signs to abrogate"` (:60-73); `LESSONS-LEARNED.md`
2026-05-01 "Style Precept Absorbed".
Compliance: R headings use sentence case; a wave spec does not stack bolded-colon
list items as its primary prose vehicle.

**S3 · Cross-reference by what an item IS, not by bare enumeration.**
A reference to a past wave, audit lane, or backlog item names what the item IS, not
only its enumerated ID.
Source: `STYLE.md §"Cross-reference by what an item IS"` (:140-147); `README.md`
(:75-77); commit `a59c60d`.
Compliance: R writes "the SHIM-oracle wording (the falsifiable 'renders without the
w6a shim' bar)" rather than a bare "W0-2"; "the dual-mount consumer defect" rather
than a bare "N2 A′-1".

**S4 · Meta-terms are glossed on first use; unnecessary meta-jargon is abrogated.**
Wave, gate, trigger, lane, triumvirate, agent unit, cohort, brittleness window and
the rest carry a short inline gloss or a cross-reference at first use in a document;
repo/meta jargon is used only where befitting and necessary, per
`glossary/meta-terms.md`.
Source: `STYLE.md §"Inline gloss for meta-terms"` (:148-156); `README.md` "Meta-terms
get glossed" (via `a59c60d`); `glossary/meta-terms.md`.
Compliance: an R doc's first use of "triumvirate" or "π lane" glosses it or points
at the glossary; it does not stack unexplained enumerated invariants (e.g. bare
"invariant 30") without a WHAT/WHY.

**S5 · No commentary, motivational prose, or duplicated shared precepts in the
plan.**
The tranche plan and wave specs state their own substance and cross-reference
shared precepts rather than restating them.
Source: `SPEC.md §Plan Shape` (:68); `STYLE.md §"No editorializing or hype"`
(:98-102).
Compliance: an R wave spec cites `SPEC.md §Hard Gates` for the gate taxonomy instead
of transcribing it; it carries no "this elegant approach" self-congratulation.

---

## Notes on scope

- The two paired-criterion and explication precepts (`f27627e`, `a59c60d`) are
  called out by the STATE as the likeliest gaps because the R corpus was authored
  against `TRANCHE-AND-WAVE-SPEC.md` + exemplars before both commits landed. M1,
  M12, M24, S3, S4 carry them.
- Rows M17/M18 and S-rows govern the R letters (`letters/GLASSUI-RELAY.md`,
  `letters/KF-VALUEJS-2.0.0.md`): contract-v2 pin discipline binds their resolution
  content, the retired `proof:*` prohibition binds their gate language, and the
  coordination-artefact contents row (M16) binds their structure.
- Historical R audit docs (`audit/pass1`, `audit/pass2`, `DEVELOPMENT-FIDELITY.md`,
  `RATIFICATION-2026-07-03.md`) are records, not compliance targets.
</content>
</invoke>
