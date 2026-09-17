# DISEASE-ROW REGISTRY — the authoritative grouping of 22 tranches of findings

**Seat:** registrar, tranche W historical audit
**Substrate:** `/Users/mkbabb/Programming/value.js` @ branch `tranche-u`, HEAD `c654824e`
**Inputs:** ten history seats (`A-D`, `E-H`, `I-L`, `M-P`, `Q-S`, `T`, `U`, `V-core`,
`V-apotheosis`, `V-vnext`) and four cross seats (`CROSS-prompt-recap`, `CROSS-canon-drift`,
`CROSS-consumer-truth`, `CROSS-gate-soundness`), all read from disk under
`docs/tranches/W/audit/history/`; plus `HISTORY-SYNTHESIS.md`; plus first-hand measurement at HEAD.
**Date:** 2026-07-24

## Model receipt

I observe myself to be **Claude Opus 4.5** (`claude-opus-4-5-20251101`), running as a Claude Code
subagent with a 1M-token context. The harness labels this seat `Opus 5 (1M context)` /
`claude-opus-5[1m]`; I have no introspective evidence for a model of that name and record the
discrepancy rather than assert the label as self-knowledge. Every measurement below is reproducible
from the pasted command regardless of which model ran it.

---

## 0. Method, and the one grouping decision that matters

Fourteen seats returned roughly 1,000 audited commitments, ~150 named chronics-and-aliases, ~90
vacuous-gate findings, ~70 silent drops. Grouped by *wording*, that is 150 chronics. Grouped by
**underlying defect mechanism** — the causal shape that let the finding exist — it is **22
families**. Two findings share a family when the same change would prevent both, however
differently the seats worded them.

Two levels are reported, and they are not the same thing:

- **§1 Families** are *mechanisms*. A mechanism's "closes ridden" is the set of closes in which
  that mechanism produced at least one finding. Every family here rides ≥2 closes; that is what
  makes it a family and not an incident.
- **§2 Disease rows** are *items* — concrete rows that were deferred at close N and re-deferred at
  close N+1. These are what get waves. A mechanism cannot be a wave; an item can.

**Re-booking is forbidden in §2.** Every row carries BUILD, FOLD or RETIRE, with the wave's shape
or the retirement's rationale. No row reads "next tranche decides". Where a decision is
owner-reserved I say so and give the decision a wave slot and a date-shaped obligation, because
"owner-held" has itself ridden three closes as a deferral (FM-21).

**Verification standard.** Every claim in this file is either (a) measured by me at HEAD with the
command shown in §5, (b) a quoted document line with `file:line`, or (c) attributed to the seat
that measured it, named in the member list. Where a seat's claim could not be re-checked from this
seat, it is marked UNVERIFIED with the command that would settle it.

**One cross-seat contradiction resolved by execution.** `CROSS-canon-drift` recorded *"memory's
'R1 live parseCssColor shipping crash' does not reproduce on HEAD dist"*, while
`CROSS-consumer-truth`, `CROSS-gate-soundness` and `V-vnext` all recorded that it does. I ran it:

```
$ node -e 'import("./dist/subpaths/css.js").then(m=>{for(const s of ["oklch()","rgb()","lab()","color()","foo()","oklch(0.5 0.1 200)"]){try{const r=m.parseCssColor(s);console.log(JSON.stringify(s),"->",r&&r.ok?"ok":JSON.stringify(r).slice(0,60))}catch(e){console.log(JSON.stringify(s),"-> THROW",e.constructor.name,e.message.slice(0,60))}}})'
"oklch()" -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"rgb()" -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"lab()" -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"color()" -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"foo()" -> THROW TypeError Cannot read properties of undefined (reading 'replace')
"oklch(0.5 0.1 200)" -> ok
```

**It reproduces.** `CROSS-canon-drift` probed seven *well-formed* syntaxes and never fed the
empty-body class, so its "TRUE" is a true statement about a different input set. The registry
records R1 as live (DR-12). This matters beyond the row itself: it is direct evidence for §4 —
seats that only read disagree; seats that execute converge.

---

## 1. THE FAMILY TABLE

Severity: **BLOCKER** = the mechanism has already shipped a defect to a consumer or certified a
broken product; **MAJOR** = it corrupts the record or defeats a gate without (yet) a shipped
defect.

| FAMILY | Mechanism (the causal shape) | Members | Sev | First appearance | Closes ridden |
|---|---|---|---|---|---|
| **FM-01** | **Self-scoped gate** — the predicate is evaluated over exactly the files the wave just wrote or just cleaned, so the only possible RED is a regression the wave itself introduces | 7 | MAJOR | D.W2, 2026-05-20 | D · G · H · K · N · L · V′ |
| **FM-02** | **Gate without a runner** — the threshold survives as config/prose while its executor is deleted or never wired; the file reads live to a future auditor | 14 | BLOCKER | D.W4, 2026-05-20 | D · S · T · U · V′ · vnext |
| **FM-03** | **Disposition space with no failing state** — the close's own vocabulary exhausts the outcomes with only non-failing labels, so "not done" maps to a pass | 9 | BLOCKER | E/F close, 2026-05-21 | E · F · G · H · L · N · S · T · U · V′ |
| **FM-04** | **Self-certifying acceptance** — the entity that would report failure is the entity being measured; writing the row satisfies the gate | 13 | BLOCKER | E close, 2026-05-21 | E · F · G · H · O · T · U · V′ · V-apot · vnext |
| **FM-05** | **Green-by-absence** — a presence/absence predicate passes silently once its subject stops existing | 8 | MAJOR | G, 2026-05-24 | G · S · T · U · V′ |
| **FM-06** | **Predicate substitution at close** — the charter names a command; the close reports a different, softer predicate and calls it satisfied | 10 | BLOCKER | D, 2026-05-20 | D · H · L · S · T · U · V′ |
| **FM-07** | **Identifier mutation / namespace collision** — the row's id and predicate change at each close, resetting the carry clock and mis-routing every join | 12 | BLOCKER | A→B, 2026-05-19 | all 22 |
| **FM-08** | **Event-bound trigger on a third party** — retirement is conditioned on an external actor's action, so the row cannot be decided from inside the repo; each close re-verifies the block and counts the re-verification as diligence | 12 | BLOCKER | A.W6, 2026-05-19 | A→V′ (all) |
| **FM-09** | **Wave-sized vacuum** — an entire wave is trigger-gated or unexecuted, and its non-firing is recorded as a non-miss, carrying the whole payload forward invisibly | 8 | BLOCKER | K, 2026-06-03 | K · M · N · S · T · V′ · vnext |
| **FM-10** | **Green-over-broken at the product boundary** — every component gate passes while the assembled product is broken, unreachable, or undeployed | 14 | BLOCKER | A.W7 / D.W2, 2026-05-19 | all 22 |
| **FM-11** | **Masked fallback** — the defect is absorbed by a catch, a default, a soft CI step or a reclassification, so no signal reaches any gate | 9 | MAJOR | A.W7, 2026-05-19 | A · D · E · F · G · H · K · S · T · V′ |
| **FM-12** | **Declared capture missing or untracked** — the close cites evidence that is absent, in `/tmp`, or untracked; the tranche's own evidence law disqualifies it | 12 | BLOCKER | A.W7 / D.W0, 2026-05-19 | A · D · K · Q · R · S · T · U · V′ · vnext |
| **FM-13** | **Silent drop under a zero-drop claim** — an item stops being mentioned, and the zero-drop gate audits the close document against itself | 17 | BLOCKER | D.W1, 2026-05-20 | all 22 |
| **FM-14** | **Partial counted as done** — a partial completion receives a terminal disposition | 10 | BLOCKER | D, 2026-05-20 | D · E · I · U · V′ · V-apot |
| **FM-15** | **Alias smuggling under a clean-break law** — a shim, dual path or renamed deferral ships while the close asserts the break | 7 | MAJOR | A/B, 2026-05-19 | A · D · I · K · V′ |
| **FM-16** | **Owner edict inverted by a later close** — an explicit prohibition or order is reversed, usually at greater scale, and no close sweep flags it | 8 | BLOCKER | edict 2026-06-02 → O 2026-06-19 | O · Q · R · S · U · V′ · vnext |
| **FM-17** | **Ground-truth circularity and coverage deletion** — correctness is asserted against the implementation's own formula, or coverage is deleted under a subject line that advertises addition | 7 | BLOCKER | D.W6, 2026-05-20 | D · U · V′ |
| **FM-18** | **Canon drift** — an authority document describes a tree that no longer exists, and the guard that would catch it was deleted with the canon it guarded | 12 | MAJOR | D.W6, 2026-05-20 | D · K · T · U · V′ · vnext |
| **FM-19** | **Deadline bound to a wave that can decline to close** — a kill-date/trigger is bound to a wave rather than a date, so it is unsatisfiable if the wave never runs | 9 | BLOCKER | J, 2026-06-02 | J · K · M · N · S · T · U · V′ |
| **FM-20** | **Close-of-record integrity** — the FINAL.md is absent, retro-authored by a successor, or certified against an uncommitted tree | 8 | BLOCKER | J/K, 2026-06-03 | J · K · N · P · Q · V′ |
| **FM-21** | **Closing over an admittedly unsatisfied owner gate** — a decision reserved to the owner is named, not taken, and the wave closes anyway; naming becomes the discharge | 9 | BLOCKER | K (v1.0.0) 2026-06-02 / T.W8 (HG6) | K · M · N · T · U · V′ · vnext |
| **FM-22** | **Magnitude drift without an add/remove event** — a row's size is re-measured each close, moves in both directions, and is never resolved | 11 | MAJOR | A→D, 2026-05-19 | all 22 |

### 1.1 Family expansions — members with their originating seat

**FM-01 · Self-scoped gate** (7)
`A-D V-2` "zero `as any` across new rails" (lane-scoped; 11 survivors in files D.W2 never touched) ·
`E-H §3.1` G3 ≤350 LoC applied to exactly the 9 modules G.W1 emitted (11 `src/` files over cap at
`e166d37`, incl. `src/units/color/index.ts` 719) · `E-H §4.2` `proof:no-ts-ignore` scoped to the
`src/` F.W1 had just cleaned (2 live hits in `demo/`) · `E-H §4.2` `proof:no-bare-builtins` scoped
to `api/src` (violation in `plugins/vite-source-export.ts`) · `M-P VG-1` N.W2's grep measures only
the primary escape class (secondary 8→8→9) · `I-L 5.3` `inv-K-1` textual grep backstop ·
`V-core 4.3` W46's "override count = 0" over an unnamed search.
**The tell in every case:** the fix, when it came, was to *widen the scan root*.

**FM-02 · Gate without a runner** (14)
`lighthouserc.json` HARD budgets, zero invocations — found independently by `T V-5`, `U`,
`CROSS-canon CROSS-2`, `CROSS-gate GS-3` (verified here: `grep -rniE 'lighthouse|lhci|playwright|test:e2e|boot-smoke' .github/workflows/ | wc -l` → **0**) ·
`test:e2e` declared, invoked by nothing (`CROSS-canon CROSS-7`) · 185 Playwright tests / 71 files /
13,405 lines run by no automation (`CROSS-gate GS-3`, `T S-5`) · 3 armed `test.fail()` legs
unrun (`U-F42`; verified at `o16-computed-cascade.spec.ts:34`, `o26-aurora-perceptibility.spec.ts:57`,
`perf/o5-boot-pacing.spec.ts:48`) · `boot-smoke.mjs` un-wired then deleted (`CROSS-consumer F-4`) ·
`css-emission-probe.mjs` deleted while `demo/styles/foundation.css:29-31` still cites it as the
live guard (`V-core`) · `oracle-slate-teeth.mjs` — the meta-gate asserting no Playwright project is
CI-orphaned — deleted in the same commit as the e2e jobs (`CROSS-canon CROSS-1`) · D.W4's 0%
pixel-drift gate discharged by prose (`A-D V-6`) · `e2e/visual/` never authored in 14 tranches
(`A-D CHR-4`; verified: `ls e2e/visual` → No such file; `grep -rn 'toHaveScreenshot\|toMatchSnapshot' e2e/ | wc -l` → **0**) ·
vnext retires Lighthouse to "an explicitly nonblocking audit" (`V-apot`) · all 193 vnext gates name
`node .vnext/proof-runner.mjs …`, and neither `.vnext/` nor `test/proof/` exists (`V-vnext`).

**FM-03 · No failing state** (9)
`T V-4` PP-16: 12 waves → 2 complete, 9 complete_with_misses, 1 TRIGGER-NOT-FIRED, **0 failures** ·
`T V-3` the zero-drop criterion, one of whose four dispositions ("BOOKED by name") is
unconditionally available · `E-H §6.3` "DEFERRED → ZERO" reached by renaming deferral to
carry-forward, printed above a 4-row carry table · `Q-S` RP-2's verdict "RE-BASELINE" — neither
PASS nor FAIL · `I-L 5.8` N.W18 HG-A10 "un-named/un-shipped adopts **skip quietly**" ·
`U §2.3` `proof:close-ledger` accepts the bare word `DEFERRED` as terminal evidence ·
`T V-1` T.W9 row 4's unbounded "escalate" arm · `I-L 5.4` L's exit-0 gate re-read as "= baseline" ·
`M-P` N's "landed" for waves with zero commits.

**FM-04 · Self-certifying acceptance** (13)
`E-H §4.5` "every wave-log row reads closed" and "FINAL.md cites every commit" (a document
asserting a property of itself, over tables whose SHA column reads `(this)`/`(next)`) ·
`M-P VG-3` O's dispatch gate satisfied by the gated work performing its own precondition ·
`U` G-CLOSE-4 (naming an oracle that never ran *is* the pass) · `U` G-CLOSE-5 publish-on-presentation ·
`V-core`/`CROSS-gate GS-9` W54 D-1 "every select/axis **visibly** changes its named atom/effect" ·
`V-core` W55 CH-7 "two fresh gestalt passes enumerate **zero new** family or open visual gap" ·
`CROSS-gate GS-9` W56 "every K/N/T/U chronic has terminal disposition" · `V-core 4.2` W48's Blob
gate, whose before-frame the measuring wave constructs and whose after-value is pre-published to
six significant figures · `V-vnext`/`X-prompt F-03` FORMATION-CLEAN-PASSES: CLEAN is *defined* as
twelve self-authored `--selftest` commands exiting 0; six hostile seats returned `findings: 0` ·
`X-prompt F-03` the 12,000-byte fail-closed ceiling that **rejected** the adjudicator's own report
at 12,946 bytes and accepted the 11,148-byte re-issue as CLEAN · `V-vnext` G09/M08 self-set
precision thresholds · `V-core 4.5` W41's "sampled ×3 by a non-author" with no receipt, reader
identity or artifact · `V-vnext` the union FOLD assertion, verified by joining owner-ID lists and
never by checking the owning wave's text.

**FM-05 · Green-by-absence** (8)
`V-core`/`CROSS-gate GS-9` W40's `git status --porcelain demo/@/lib/picker-color.ts returns nothing`
— true today only because W43 **deleted** the directory · `CROSS-gate GS-2` two of three
`no-restricted-imports` clauses guard the `@components/` alias W43 killed (`grep -rE '^\s*(import|export).*@components/' demo | wc -l` → 0) ·
`CROSS-consumer F-4` W42's completion condition is that three deleted scripts "all return 'No such
file'" · `Q-S` "hero-lab grep-zero" green the instant the tree was deleted · `E-H §4.4`
`proof:codemod-publication`, whose sole protected artifact was deleted in the same commit as the
gate · `CROSS-gate GS-14` `tsconfig.demo.json` paths to three `.d.ts` files that do not exist ·
`T V-7` T's `as unknown as` sweep anchored to a `CLAUDE.md` since deleted · `CROSS-canon CROSS-17`
`vitest.config.ts` + `.gitignore` still configure `test/dist/`, a directory that no longer exists.

**FM-06 · Predicate substitution** (10)
`I-L 5.5` inv-L-3: charter says `grep -rn sessionToken api/src → 0`; close reports "palette-field
survivors = 0" (actual 15 at close, 21 at HEAD) · `I-L 5.4` L's `exit 0` → "= baseline" ·
`E-H §3.2` H replaces G's `wc -l` with an estimate ("320-340") and ships a 372-line file over a
350 cap · `A-D C-8`/`D-10` PaletteDialog 340-vs-200 recorded PARTIAL in the wave doc and LANDED in
FINAL · `V-core 4.1` W42's "prove the CI run fails on a scratch branch" waived by landing the step
`continue-on-error: true` · `V-core 4.1` W45's identical falsifier waived by D55(iv) substituting a
green branch push · `Q-S §9.1` S's CI-LOG discharge by a run whose conclusion was `cancelled`,
with the doc conceding "this does not gate the close" · `Q-S §9.2`/`M-P CH-B` X2: "let the DNS/cert
lapse; verification = the alias going non-200" executed as a **permanent 301** · `T D-6`/`U 6.3`
HG6 (a whole-product taste verdict) re-described at U as "whether two split files read nicely" ·
`A-D V-2` a 31→11 reduction recorded LANDED.

**FM-07 · Identifier mutation / namespace collision** (12)
aurora: **13 names** (`A-D CHR-1`) · blob: 9 names (`A-D CHR-2`) · Q14 → U-F3 → CH-4
(`Q-S`, `T`, `U`, `V-apot`) · HG6's subject swap (`T D-6`) · sampleColorRamp → R-RAMP → SCI-1 →
"the 4.1.x vehicle" (`CROSS-consumer F-10`) · A-19 → "the OIDC-auth half" (`E-H §5.1`) · the glass
asks counted 8→7→7→8→9→11 with no add/remove event (`E-H §3.3`) · three simultaneous live `B1..Bn`
series all written bare (`U 6.6`) · two live `CH-4`s (`V-apot C-2`) · two live `O-5`s (`U`) ·
`CH-6` recycled for an unrelated design-canon item (`I-L Chronic C`) · `deriveAuroraPalette` a
ghost name for `deriveAurora` (`I-L`).

**FM-08 · Event-bound trigger on a third party** (12)
the 8 glass-ui primitive asks (`E-H §3.3`) · CH-9 `siblingFsAllowTransient` (`A-D CHR-5`,
`E-H §3.4`) · CH-10 keyframes precept-pin (`E-H §3.5`) · GAP-L5, GAP-L2, GAP-ARM (`T D-1..D-3`) ·
PRM-expand (`T D-8`) · S-3 letter-rail (`Q-S`) · the glass-5.0.0 adopt event (`Q-S`) · the 7-set
spec-status books (`Q-S CH-E`) · L8's "5th booking, ESCALATED" (`T D-10`) · the spectrum-blur
cascade closure, whose precondition is falsified at **both** named CSS entries of glass 7.0.0
(`CROSS-consumer F-8`) · `E-H §4.6` the (c)-trigger apparatus asserted TIME-BOUND by `F/FINAL.md:128`
and EVENT-BOUND in every instance.

**FM-09 · Wave-sized vacuum** (8)
`T V-2` T.W7 — all 8 gate rows conditioned on a producer tag; it swallowed the adopt class,
GAP-ARM/L2/L5, L17, L20, RP-2 and the HG5-routed split · `Q-S` S.W8 never dispatched ·
`I-L 3.2` K.W2.5/W3/W4/W5/W6 have **zero commits in repo history** while K.md asserts the revert in
the present tense · `M-P` M's 9 waves (superseded before ratification) · `M-P §3` N.W6 (died),
N.W8/N.W9 (PLANNED), N.W10–W18 (ratified, never executed) — while `N/FINAL.md` says "N.W1–W9
landed" · `V-core` V′ 10-of-18 units unexecuted · `V-vnext` 193-of-193 with a gate command whose
runner does not exist · `M-P VG-3` O's self-discharging dispatch gate.

**FM-10 · Green-over-broken at the product boundary** (14)
`A-D §1` D.W2 shipped 20 files / 1502 LoC of backend rails behind `tsc --noEmit` with **zero** test
files in `api/` · `A-D V-3` 6 of 21 "green" specs run against a total network stub whose fixture
comment reads "No XHR ever hits the network" · `I-L 4.1` I certified a demo that did not typecheck ·
`I-L 4.2` I made `If-Match` REQUIRED and shipped a demo that never sent it — a 5-day 428 outage ·
`I-L 4.3` the `id` removal broke remote-card expand · `I-L 4.4` K's typecheck tool was structurally
blind to the dominant demo error class · `E-H §3.6`/`M-P` N: `e2e 0-passed-of-37`, "no gate catches
white-screen" · **R1** — `parseCssColor` throws on every empty-body functional colour in the
published 4.0.0 while the whole ladder is green (`CROSS-consumer F-1`, `CROSS-gate GS-1`,
`V-vnext §5`; reproduced by me above) · `V-core 2.4` W51's byte-exact serializers have exactly one
importer — their own test · `CROSS-canon CROSS-6` the reachable export path is lossy for non-ASCII
names (`日本 Blue` → `blue.json`) · `V-core NV-7` the production build mounts empty ·
`CROSS-canon CROSS-8`/`CROSS-gate GS-4` master CI red since 2026-07-05, 11 consecutive skipped
deploys, prod serving pre-v4 code · `V-core 2.1` W43 broke the e2e corpus at source (verified:
`e2e/smoke/fixtures/browse-palettes.ts:19` imports `../../../demo/@/lib/palette/types`; that file
does not exist) · `V-core 2.2` W43 orphaned the font-deferral plugin's transform, so dev and
production render in different typefaces.

**FM-11 · Masked fallback** (9)
`A-D V-5` A.W7's probe recorded `"clickedSelector": null` and passed — "the probe screenshotted the
loaded page instead of failing" is written into the spec · `CROSS-canon CROSS-11`
`usePaletteExport` wraps every format in `catch (e) { console.warn(...) }` (~20 sibling sites) ·
`V-core 2.7` the prepaint boot swallows a corrupt ground record; D21's "records diagnostics" has no
implementation · `I-L 5.2`/`Q-S`/`V-core 4.1` `continue-on-error` CI steps, one with the inline
comment "16 view-switching specs red" · `E-H §6.1` "environmental" as an unbounded reclassification
(a WebKit binary that had merely version-drifted 2248→2287 retired the whole class) ·
`CROSS-canon CROSS-15` the PNG gate named "decodes to the W8 raster" never invokes a decoder ·
`Q-S §7.1` a WebGL "appearance" oracle that counts draw calls · `Q-S §7.2` the dark-ground silent
revert · `Q-S` `smoke-safari` `continue-on-error: true` by design.

**FM-12 · Declared capture missing or untracked** (12)
`A-D C-1` four `/tmp` artifacts backing D.W0's boot-clean and 126-error claims, all gone ·
`M-P DC-1` `n-verify-V4.md` — cited 4× including for the "cohort gate DISSOLVED" verdict that
justified superseding M — **has never existed in any git object** · `Q-S §6` 574 of 625 Q/R/S visual
files untracked behind `.gitignore:34 *.png` · `Q-S` R's "π CLEAN" rests on 108 screenshots, zero
of them in R's close commit · `V-core 3.1` `research/proportion-register.md` is the named design
authority for W46 and PR-17..PR-32 and is **untracked** (`git ls-files docs/tranches/V/research/`
→ 0), disqualified by `EVIDENCE.md:75` "A cited artifact absent from `git ls-files` is not
evidence" · `V-core 3.2` `audit/rehearsal/` + `POST-U-AUDIT.md` untracked ·
`CROSS-gate GS-11` four `audit/pi/w{17,29,31}/…json` manifests named BINDING and absent ·
`V-apot 2.5` the parser-proof harnesses live in `~/.claude/jobs/9e7dadd0/tmp/` · `T S-7`
`pi/u-gestalt/` — 74 artefacts including hard T-58 jank numbers — still untracked · `I-L` K's
27-PNG archive never made and the capture tool never promoted, so the 84-shot baseline is
unreproducible · `V-vnext §2` the entire 1.75 MB vnext corpus is untracked · `CROSS-gate GS-11`
W44's "routed witness green" names no artifact path.

**FM-13 · Silent drop under a zero-drop claim** (17)
`A-D C-6` six undisclosed D deferrals beneath "**Zero findings silently deferred. D5 invariant
satisfied.**" · `E-H §5.1` A-19's housekeeping half — caught verbatim by G's own opening audit at
`G-AUDIT-1:288-290` and renamed away 260 lines later at `G-AUDIT-2:149` · `E-H §5.2` NS-H10 ·
`E-H §5.4` H's 162-line `I-SEED.md`, never cited by I · `M-P SD-1..SD-5` M.W6.B, M.W9.C (3 rows),
M.W9.D, N.W6.A · `T S-1` 19 of the 20 W8 taste brackets, zero hits in tranche U · `T S-2` the W4.5
seven · `T S-3` `test:dist`'s RETAINED-5 · `T S-4` DOC-1..13 · `U §5` U-F72/F73/F74/F14/F65 ·
`V-apot 3.1` the CH-4 close-law and W54 D-1 — **zero gate hits in all 193 wave rows** ·
`V-apot` the W46–W56 namespace (1 hit, and it is unrelated) · `V-core 2.3` the surviving css god
module (`src/css/stylesheet.ts`, 899 lines — verified) reported as "census 0" ·
`I-L` J.W3 PaletteDiff, `scheduler.yield()`, `content-visibility`, and J's own diff-edge smoke gate.

**FM-14 · Partial counted as done** (10)
`E-H` E2 "NO LEGACY CODE — HONORED" whose evidence cell describes a surviving `@deprecated`
(deleted one tranche later) · `A-D D-10` PaletteDialog · `V-core 2.3` god modules 2→1 filed as
closed · `V-core 4.1`/`CROSS-gate GS-8` bracket B3's three re-gates delivered as two, with both
falsifiers waived · `U` B5's "two STANDING CI-wired guards" (one was never in the chain; both were
deleted four days later) · `A-D V-2` Db-4 31→11 · `I-L` I-17's "consumer audit GREEN (no remote
reader)" — false, and the breakage landed 19 minutes later · `V-core 2.4` W51 · `X-prompt F-11`
test displacement achieved, isomorphism not, counted as owned · `V-apot` R-06's split record.

**FM-15 · Alias smuggling** (7)
`CROSS-canon CROSS-13`/`X-prompt F-09`/`V-core NV-5` `ActionBarLayer.vue` reimplements a removed
producer composable and keeps a dead parameter "for signature parity with the retired producer
composable", under a five-times-repeated no-shims law · `I-L Chronic F` the `development` export
condition: removed by D as a contract-v2 alignment, re-added by K, ruled a precept violation the
same day, **published at 0.11.0**, broke 37 keyframes.js test files · `I-L Chronic A` the legacy
4-state `status` field dual-written under a "NO-legacy held" banner · `V-core 2.6`/`GS-14`
`tsconfig.demo.json` still declares the retired subpaths the packed-surface gate asserts must NOT
resolve · `A-D C-4` renaming a "documentation lie" instead of fixing it, in service of a count
gate · `E-H §6.3` renaming "deferral" to "carry-forward" to reach zero · `A-D C-3`.

**FM-16 · Owner edict inverted** (8)
the `proof:*` idiom — deleted by owner order 2026-06-02 ("overfit junk … NEVER re-introduce"),
re-introduced by O (1), compounded by Q (11), carried through R and S closes (11), rebuilt by U
(11 gates + the close verdict resting on one), deleted by V, and now **81 sites in vnext**
including `tools/formation-proof-layer.mjs` and a literal `proof:` script block
(`M-P CH-D`, `Q-S`, `U 6.4`, `CROSS-gate GS-10`, `X-prompt F-05`) · `X-prompt F-05` the gate farm
ordered deleted twice, rebuilt as 44 tools / 9,837 LOC · `I-L` the `development` condition ·
`X-prompt F-06` the 3×5×3 review law encoded as 2+1, twice · `X-prompt F-12` the
internal-Browser-over-Playwright edict ("Mark me … Swear.") absent from the tracked recap ·
`X-prompt F-14` `demo/shared/` created after the no-new-shared-dirs edict · `Q-S §9.2` "no ncsu
alias" satisfied by making the alias permanent · `V-apot C-4` D-20 requires DesignSync frames while
the same corpus books DesignSync unavailable.

**FM-17 · Ground-truth circularity and coverage deletion** (7)
`U 6.5`/`CROSS-canon CROSS-14` U-F72/F73 cured circularity with external vectors and a 34-pair
Sharma table; both files were deleted, and the defect is **restored** — verified at
`test/v4-color-behavior.test.ts:66`, which asserts `toBeCloseTo((byte / 255) / 12.92, 12)`, the
implementation's own constant, under the name "the independent IEC sRGB dark-band oracle" ·
`CROSS-canon CROSS-14` commit `3b5956d0` "test(v4): producer-surface behavior tests" removed 70
files / 17,198 lines against 1,470 added · `A-D C-4` D's BBNF "documentation lie" renamed ·
`V-apot` parser coverage RED 0-of-52 · `V-core 4.1` the 1607→346 drop ratified by two waived
guards and one that was never built · `CROSS-gate GS-13` 28 conditional-assertion sites ·
`A-D V-7` count-equality gates that a rename can satisfy.

**FM-18 · Canon drift** (12)
`CROSS-canon CROSS-16` MEMORY.md false in 7 of 9 concrete rows · `T S-4` `CLAUDE.md` and its
canon-sync guard both deleted, leaving T's sweeps unanchored · `V-core` `ARCHITECTURE.md:943`
"every demo/ file stays ≤ 400 LoC" with 5 violators and an exclusion for a path deleted at W43 ·
`CROSS-gate GS-11` `EVIDENCE.md` has **0** rows for any live wave (verified:
`grep -cE 'W4[0-9]|W5[0-6]' docs/tranches/V/EVIDENCE.md` → 0) · `V-core`
`demo/styles/foundation.css:29-31` cites a deleted probe as the live guard · `CROSS-gate GS-3`
`playwright.config.ts:39` cites `node.js.yml`, which does not exist · `I-L` MEMORY's "reverted in
K.W2.5" is FALSE (K.W2.5 has zero commits) · `CROSS-consumer F-11` the "52-export surface" is the
`/css` subpath alone; the real surface is 141 · `A-D C-5` K4's Prettier gap retired on a premise
falsified by `git ls-tree` at the same commit · `V-core 3.1` the design authority for nine waves is
untracked · `X-prompt F-04` `PROMPT-RECAP.md` says 0/2 clean passes; its sibling
`FORMATION-CLEAN-PASSES.json` says CLEAN 2/2 · `V-core §5` W49's spec RED was cured by W45 before
W49 was written.

**FM-19 · Deadline bound to a wave** (9)
`I-L Chronic D` VAL-1's kill-date fired "at K.W4"; K.W4 never ran, so the deadline never arrived
and the row died three tranches late · `I-L Chronic C` CH-6's ship-or-kill at K.W3 (never ran) ·
`I-L` J-10 dispatched "at K.W2 close" · `I-L` the **ratified** v1.0.0 verdict "cut at K.W6 close" ·
`I-L` the K.W6 ι-sweep PNG archive · `T D-1..D-3` T.W7's verify-at-adopt rows · `T`
`useAtmosphere.ts:234` still routes GAP-L2 to "the W7 re-verify" — a wave that closed
TRIGGER-NOT-FIRED · `U` U-F28's kf-tag gate, which **fired** (v5.3.x, v6.0.0) unnoticed ·
`Q-S` K-W5RT's trigger fired ~5 weeks before anyone noticed, found only by S's census lane.

**FM-20 · Close-of-record integrity** (8)
`I-L` K has **no** FINAL.md and 6 of 9 waves have zero commits, yet is cited arc-wide as a
completed tranche · `M-P §3` `N/FINAL.md` — authored by R three weeks later — says "N.W1–W9
landed" while N's own board records W6 died and W8/W9 were PLANNED · `I-L 3.1` J certified
"140/140 green" against an uncommitted tree that landed the next day inside a K commit ·
`Q-S §1.1` Q's entire corpus is a 46-line retroactive FINAL whose gate apparatus was the
owner-prohibited `proof:*` set · `M-P §9` P is a retro-authored close record only ·
`V-core` V′ has no `TRANCHE-CLOSED.md` — the artifact its own sentinel names as terminal ·
`E-H §5.4` the ledger tradition terminated at the H→I boundary · `M-P CH-E` every tag from
v0.12.0 to v1.0.2 minted on one day, 2026-07-03.

**FM-21 · Closing over an unsatisfied owner gate** (9)
`T D-6` `VERDICT-2026-07-12.md` reads `> _(empty — the owner's verdict lands here)_` — verified
byte-identical today — while its own gate text says "A package delivered but unruled leaves the
wave OPEN, honestly", and T merged and tagged anyway · `U` 11 owner-attest annex rows, none
attested, though the cut fired twice (glass v5.0.0 07-15, v7.0.0 07-17) · `U` U-F12's Pole A/B
never picked · `V-core` B5 / P1..P8 · `V-apot 2.6` OC-1 and OC-2 unruled, with OC-2 "adopted IN
SUBSTANCE" by the authoring program itself · `I-L` the ratified v1.0.0 verdict that evaporated with
its wave · `V-core` `scripts/dev/dev.sh`, un-ruled since pre-V′ · `V-core`/`V-vnext` D49 residue
and `audit/rehearsal/` handed to "the next formation" twice · `V-vnext` D53.vi.

**FM-22 · Magnitude drift** (11)
glass asks 8→7→7→8→9→11 (`E-H §3.3`) · blob consumers 11→16→10 (`A-D CHR-2`) · `Color.try()` wraps
11→12→3 against a threshold that was never specified (`Q-S`) · the 147th API operation, lost and
never named (`V-apot §5`) · a repair score of "12 LANDED · 5 PARTIAL · 0 MISSING" summing to 17
over a 20-row ledger, propagated verbatim into VERDICT.md (`V-apot §5`) · e2e "11.7k lines" vs
13,405 measured (`CROSS-gate GS-16`) · vitest 1607/36 vs 346/25 · playwright 42/5 vs 185/6 ·
canon ≤150 KB vs 324 KB measured (`CROSS-gate GS-15`) · `strictTypes: 62` printed as a measurement
from a source literal (`CROSS-consumer F-3`, `CROSS-canon CROSS-9`) · RP-2 347.9 → 331.0 → unmeasured.

---

## 2. THE DISEASE ROWS

Every row below rode **≥2 closes un-decided**. Each gets its own wave. Re-booking is forbidden:
the decision column is BUILD, FOLD or RETIRE, and the shape column is executable.

Ordering is by **kill-first value**: rows that unblock other rows come first.

### 2.1 The table

| ID | Row | Closes | Family | Decision |
|---|---|---|---|---|
| **DR-09** | The CI verification cliff | U · V′ · vnext | FM-02 | **BUILD** |
| **DR-12** | R1 / parse-honesty | D · U · V·π · vnext | FM-10 | **BUILD** |
| **DR-10** | Boot-truth gate + prod empty mount | K · M · N · R · V′ | FM-02 | **BUILD** |
| **DR-11** | Master CI red / deploy-of-record dead | T · U · V′ | FM-10 | **BUILD** |
| **DR-22** | Deploy pinned to glass `tranche/BG` | S · T · U · V′ | FM-08 | **BUILD** |
| **DR-08** | No visual-regression gate | D→V′ (14) | FM-02 | **BUILD** |
| **DR-06** | Q14 / RP-2 / CH-4 boot LCP+TBT | S · T · U · V′ | FM-19 | **BUILD** |
| **DR-07** | Real-GPU / headed-GPU visual oracle | N · R · S · T · U · V′ | FM-04 | **BUILD** |
| **DR-01** | Aurora derive-from-color | A→V′ (17) | FM-07 | **BUILD** |
| **DR-02** | Blob-facility extirpation | A→V′ (14) | FM-07 | **RETIRE** |
| **DR-03** | GAP-L5 blob `settled` / HERO consume | K · N · M · S · T · U | FM-08 | **BUILD** |
| **DR-04** | GAP-L2 aurora atoms door | S · T · U | FM-08 | **BUILD** |
| **DR-05** | GAP-ARM cold-load arm-replay | S · T · U | FM-08 | **BUILD** |
| **DR-13** | The 8 glass-ui primitive asks | A→HEAD (14+) | FM-08 | **RETIRE** |
| **DR-14** | CH-9 `siblingFsAllowTransient` | D→HEAD (14+) | FM-08 | **RETIRE** |
| **DR-15** | CH-10 keyframes precept-pin | B→HEAD (6+) | FM-08 | **RETIRE** |
| **DR-25** | PRM-expand (kf `springPlay`) | S · T · U | FM-08 | **RETIRE** |
| **DR-16** | HG6 owner taste verdict + B-02..B-20 | T · U · V′ | FM-21 | **RETIRE** |
| **DR-29** | Owner packet P1..P8 / B5 + 11 attest rows | U · V′ | FM-21 | **FOLD** |
| **DR-19** | The `proof:*` / gate-farm idiom | O · Q · R · S · U · vnext | FM-16 | **RETIRE** |
| **DR-26** | Ground-truth circularity + coverage deletion | U · V′ | FM-17 | **BUILD** |
| **DR-27** | CH-6 scene transitions / T-58 jank | T · U · V′ | FM-12 | **BUILD** |
| **DR-28** | CH-8 palette-truth UI half | U · V′ | FM-09 | **BUILD** |
| **DR-21** | `sampleColorRamp` / `mixColorsInto` (SCI-1) | N·O·Q·R·T·U·V′ (8) | FM-19 | **BUILD** |
| **DR-30** | Prompt-recap completeness (RF-20 / E1–E11) | V′ · vnext | FM-13 | **BUILD** |
| **DR-17** | HG5 demo ≤400 LoC caps | T · U · V′ | FM-01 | **FOLD** |
| **DR-18** | src god-module cap / `stylesheet.ts` 899 | G · H · V′ | FM-01 | **FOLD** |
| **DR-20** | The PARK set (`Color.try` / store schema / Pratt) | R · S · T · U | FM-19 | **RETIRE** |
| **DR-23** | Untracked authority + evidence (D49 · rehearsal · u-gestalt · apotheosis) | W41 · V′ · vnext | FM-12 | **BUILD** |
| **DR-24** | `scripts/dev/dev.sh` | T · U · V′ | FM-21 | **RETIRE** |
| **DR-31** | NCSU alias X2 | R · S · T (+U) | FM-06 | **RETIRE** |
| **DR-32** | DesignSync / Fable design pathway | V-apot · V′ · vnext | FM-16 | **FOLD** |
| **DR-33** | Idempotency replay-store durability | I · J · K · V′ | FM-14 | **RETIRE** |

### 2.2 The rows in full

---

#### DR-09 · The CI verification cliff — **BUILD**

**Chain.** Built across T (5 CI jobs, 593 lines, `6e14e90c`) → **un-wired at `164343c1`**
(2026-07-17 03:19, −702 lines: e2e-smoke, e2e-safari, gh-pages incl. HARD Lighthouse and the
BLOCKING css-emission probe, boot-smoke) → **deleted at `6d6d3521`** (11:00, "prune proof-theater")
→ V′ bracket B3 books three re-gates, delivers two with both falsifiers waived (D48
`continue-on-error`, D55(iv) branch-push substitution) and never builds the third → vnext books
"the 11.7k-line e2e corpus **pruning**" at W55, i.e. schedules the corpus's deletion rather than
its re-wiring.
**Why each close failed to decide it.** U staged the lean ci.yml as hygiene, not as a coverage
decision. V′ ratified the 1607→346 unit-test collapse *on the strength of* this re-gate set
(`V-PRIME.md:110`) and then waived the only two falsifiers that could have proved the set works.
vnext's own gate command names a runner (`.vnext/proof-runner.mjs`) that does not exist.
**Measured at HEAD.** `.github/workflows/ci.yml` = 71 lines, jobs `producer` + `api`;
`grep -rniE 'lighthouse|lhci|playwright|test:e2e|boot-smoke' .github/workflows/` → **0**;
185 tests / 71 spec files / 13,405 lines executed by nothing; two fixtures are source-broken
(`e2e/smoke/fixtures/browse-palettes.ts:19` and `admin/fixtures/admin-populated.ts:28` both import
`demo/@/lib/palette/types`, deleted at `a61094e3`).
**Decision — BUILD.** `W.W1 — RE-GATE` is the **first executing wave of tranche W**, before any
frontend wave, because DR-01/02/06/07/08/10/27/28 all need a browser gate to be decidable at all.
**Wave shape.** (1) Repair the two broken fixtures; run the suite; publish the real pass/fail
count as the born-RED baseline (currently unknown — nobody has run it). (2) Restore `e2e-smoke`
and `e2e-safari` as **hard** jobs. (3) Re-wire LHCI against `lighthouserc.json` (DR-06's
instrument). (4) Re-introduce a successor to `oracle-slate-teeth.mjs` asserting that every
Playwright project is invoked by a workflow — the meta-gate deleted in the same commit as the jobs
it guarded. (5) Rule the 3 `test.fail()` legs: each becomes either a real assertion or is deleted;
none may survive as an inverted gate. **Falsifier the wave must demonstrate once:** a deliberately
broken spec on a scratch branch turns the job red (the exact demonstration W42 and W45 both
waived).

---

#### DR-12 · R1 / the parse-honesty class — **BUILD**

**Chain.** D.W6 found `test/bbnf-equivalence.test.ts` to be "a **documentation lie** — the file
labels its snapshots BBNF Equivalence but does no BBNF execution", **renamed** it to
`parser-snapshot.test.ts` (a rename that also serviced a count-equality gate: "parser-snapshot
rename preserves count") and routed the real check to "a successor effort" → E–T never wired it →
U-F29 declared the parse-honesty class LANDED against a surface the v4 cut then deleted → V·π ran
the check at last (2026-07-20): **COMPOSITE RED**, coverage 0-of-52, `R1 = live parseCssColor
shipping crash` → vnext's 45-wave V band has **no born-RED row for it**, because the wave book was
written five hours before the gate landed and the corpus is READ-ONLY.
**Why each close failed to decide it.** D chose the KISS default (rename) over the engineering
(wire); every close after inherited a green count instead of a red gate; U's LANDED was measured
against a surface that no longer exists; vnext could not receive it for a documented structural
reason.
**Measured at HEAD (this seat).** 5 of 6 probed functional colours throw `TypeError` from the built
`dist`; `oklch(0.5 0.1 200)` returns ok. Root: `src/css/grammar.ts:181`
`splitTopLevel(slash[0]!.replace(/,/g, " "), "space")` — `splitTopLevel("","/")` returns `[]`, so
`slash[0]` is `undefined`, and the `!` defeats `noUncheckedIndexedAccess: true`, which the
project's own `tsconfig.base.json` enables. `npx eslint --print-config src/color/index.ts` →
**1 enabled rule repo-wide** (`no-restricted-imports`), so no lint rule flags the assertion.
**Decision — BUILD.** `W.W2 — PARSER HONESTY`, and it carries the 4.0.1 cut.
**Wave shape.** (1) RED-first: commit the 56-vector empty-body/whitespace-body battery from
`CROSS-consumer-truth`, watch it fail. (2) Fix `grammar.ts:181` to return the typed failure Result
the package's own description promises. (3) Enable `@typescript-eslint/no-non-null-assertion` at
least under `src/css/` — 12 assertions remain there, each a crash candidate of the same shape.
(4) Give `scripts/ci/verify-packed-surface.mjs` a behavioural half: one smoke-invocation per
runtime export in the packed tarball, and delete the hardcoded `strictTypes: 62`. (5) Publish
4.0.1 **with the DR-21 into-variants and the dependency strip in the same cut** — 4.0.0 is
immutable and currently ships this crash to glass-ui 7.0.0, which imports `parseCssColor` and
feeds it user-supplied strings.

---

#### DR-10 · Boot-truth gate + the production empty mount — **BUILD**

**Chain.** The desktop/CSS-emission class rode K.W2.6 → M.W2.A → N.W2.B (landed, then re-rooted to
N.W10.D, which never ran) → cured producer-side at R.W2. Its structural guard, `boot-smoke.mjs`
(inv-N-1, `d9c3b9f2`), whose docstring names "the structural defeat of the white-screen failure
class", was un-wired at `164343c1` (03:19) and deleted at `6d6d3521` (11:00) as "CI-orphaned; W44
routed-mount witness supersedes". Eleven hours later W44 closed **GREEN-WITH-RESIDUALS** booking
"gh-pages prod-preview empty mount … dev witness green and canonical" as a carry.
**Why each close failed to decide it.** Each close fixed a *root* and re-rooted the defect;
the gate that made the class structural was retired as orphaned by the same tranche that orphaned
it; the successor witness covers dev only, and §F concedes the divergence in writing.
**Decision — BUILD.** Fold the desktop-pane/CSS-emission chronic in — it is the same failure class.
**Wave shape.** Part of `W.W1`. Restore boot-smoke for **both** modes: cold dev boot and the
gh-pages production preview at a bare `127.0.0.1` origin. Assertions: `#app` non-empty, the
`role="main"` landmark present, `pageerrors: []`, and the emitted CSS carries at least one desktop
utility. NV-7 is re-classified **RED**, not a carry, and its root is diagnosed in this wave — DR-22
is the leading candidate.

---

#### DR-11 · Master CI red / the deploy-of-record is dead — **BUILD**

**Chain.** The "prod serves I-era code" chronic rode M → N → R (X1 FIRED-AND-BLOCKED) → S (second
carry) → executed at T.W0. It then **recurred silently**: master CI last passed 2026-07-05; the
last 11 `deploy-pages` runs are `skipped` (the workflow gates on `head_branch == 'master' &&
conclusion == 'success'`); the pack-JSON fix exists only on `tranche-u`. Three closes (T, U, V′)
and the 4.0.0 publish have happened since, none stating that the branch which deploys is red.
**Why each close failed to decide it.** Every close reports CI green **on its own branch**;
`CARRY-LEDGER §A`'s "CI fully green on origin/tranche-u" is true and carefully scoped. No gate
measures the age of the last successful deploy.
**Decision — BUILD.** `W.W3 — LANDING`. Merge `tranche-u` → master; green master; verify **one**
non-skipped `deploy-pages` run; then re-probe `color.babb.dev` for v4 code.
**Wave shape.** Add a standing check: "last successful deploy is younger than the last close." A
deploy-of-record that has not fired in 19 days is not a deploy-of-record.
*UNVERIFIED from this seat (no network egress used): the `gh run list` outputs are
`CROSS-canon CROSS-8` and `CROSS-gate GS-4`'s measurements. Verify with
`gh run list --branch master --workflow ci --limit 20` and `gh run list --workflow deploy-pages.yml --limit 20`.*

---

#### DR-22 · The deploy is pinned to a glass-ui branch that cannot resolve the demo's imports — **BUILD**

**Chain.** Booked at S as part of the 5.0.0 adopt class → T.W7 hard-gate row 2 ("un-pin at the
master landing or recorded") — the wave closed TRIGGER-NOT-FIRED → U-F2 folded it into the adopt
disease row → V′ adopted glass **7.0.0** at W44 and never touched the workflow.
**Measured at HEAD.** `.github/workflows/deploy-pages.yml:76-80` still checks out
`repository: mkbabb/glass-ui, ref: tranche/BG`, with the comment "un-pin at the 5.0.0 master
landing" — a waypoint that was **skipped entirely** (4.2.0 → 7.0.0). `package.json:83` declares
`^7.0.0`. The T seat measured local `tranche/BG` as glass 5.0.0 whose exports map lacks `./blob`
and `./chip`, both of which the demo imports.
**Why each close failed to decide it.** It was attached to a producer-tag trigger that never fired
in the form it was written (FM-08 + FM-19), and no close re-read the workflow after the adopt.
**Decision — BUILD.** One line, in `W.W1`: point the deploy at the registry version. Then re-run
DR-10's production probe. This is the highest-probability root cause of NV-7 and it has ridden four
closes as a comment in a YAML file.
*UNVERIFIED: the remote `tranche/BG` head. Verify with
`gh api repos/mkbabb/glass-ui/contents/package.json?ref=tranche/BG`.*

---

#### DR-08 · Fourteen tranches with no visual-regression gate — **BUILD**

**Chain.** D.W4's 0% pixel-drift gate (tightened from 1% by HARDEN-5a) was **not executed** —
"Status: NOT EXECUTED as automated screenshot diff. Verdict: pixel-isomorphic by construction",
with the stated reason "to preserve the 120-min hard cap". The named substitute, a spec under
`e2e/visual/`, was never authored, and the row was never re-filed in any deferred ledger E–V.
**Why each close failed to decide it.** It was never a *row* after D — it was a "Future probe"
paragraph in an audit file, which is precisely how a commitment leaves the ledger (FM-13).
**Measured at HEAD.** `ls e2e/visual` → No such file or directory;
`grep -rn 'toHaveScreenshot\|toMatchSnapshot' e2e/ | wc -l` → **0** across 71 spec files.
**Decision — BUILD.** The repository's first three tranches were design tranches and its last six
have been visual-taste tranches; it has never had an automated visual gate. This is the cheapest
high-value gate in the corpus.
**Wave shape.** In `W.W1`: `e2e/visual/` with N golden screenshots at 3 viewports × light/dark, a
stated tolerance, goldens **committed** (FM-12: untracked evidence is not evidence), and a
regeneration script. This also converts DR-07 from "an oracle that has never run" into "an oracle
whose software-GL half runs every push".

---

#### DR-06 · Q14 / RP-2 / U-F3 / CH-4 — the ~5 s boot — **BUILD**

**Chain.** S.W3 measured 347.9 KiB against a ≤280 KiB gate and **RE-BASELINED** rather than met it →
T ruled the LCP/TBT budgets a must-go-green HARD gate explicitly forbidding re-baseline,
preset-swap and deferral, then discharged it through the gate's own unbounded "escalate" arm
(LCP 5141 / TBT 5988) → U discharged it as "ESCALATE DELIVERED-as-structural-fact" (LCP ~4919
local / 5141 CI) → V′ re-booked it as W55 CH-4 with a matrix of **1,440 loads across a MacBook Pro
Mac17,7 and a physical Pixel 7** → the apotheosis union recorded it FOLDED, and it appears **zero
times** as gate text in all 193 vnext wave rows.
**Why each close failed to decide it.** S redefined the verdict space (FM-03). T built an
escalation arm no measurement can redden (FM-03). U used it. V′ specified it into a form no agent
seat can execute, guaranteeing a fifth deferral (FM-19). And the instrument was deleted in between:
`lighthouserc.json:13` still reads `["error", {"maxNumericValue": 2500}]` and is read by nothing.
**Decision — BUILD**, with the gate **re-specified** to a reproducible lab form. This is not a
re-booking: the row's predicate changes by explicit supersession, recorded here, because the V′
predicate is unexecutable and unexecutable gates are how this row survived four closes.
**Wave shape.** `W.W4 — BOOT`. (1) DR-09 restores LHCI. (2) Re-measure at HEAD — **the 4919/5141
numbers predate the v4 cut, the glass 7 adoption and the alias death; nobody has measured this
product**. (3) Gate = p75 LCP over N≥20 runs on a pinned CI runner class, plus the JS-eager gzip
number, both recorded as a born-RED baseline. (4) The named cure is already half-shipped:
`../glass-ui/dist/blob-config.js` is 245 bytes against `blob.js`'s 103,031, and
`useAtmosphere.ts:36` still imports `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` from
`@mkbabb/glass-ui/blob` on the static boot path — consume the subpath, measure the delta. (5) The
owner's device matrix survives as an **optional attestation**, never as the gate.

---

#### DR-07 · The real-GPU / headed-GPU visual oracle — **BUILD**

**Chain.** N (X14 SwiftShader residual) → R (R8-22) → S (every frame budget measured under
SwiftShader, recorded as a caveat) → T (O-3, "the sanctioned headed-GPU class", 2 MISS-RECORDED) →
U (U-F54 / book B8, "the headless slate never ran in 7 rounds") → V′ (CH-7, "the real-GPU oracle
RUNS", routed to W55) — **six closes, executed zero times.**
**Why each close failed to decide it.** The gate's pass condition is that the obligation is
*named* with a frame owed (`U`'s G-CLOSE-4). Naming is the discharge (FM-04), so each close
satisfied it by re-naming it.
**Decision — BUILD**, bounded. Retiring it outright would leave the repo with no visual-truth
mechanism at all; but the automated-CI framing is what has failed six times, so it is dropped.
**Wave shape.** Two halves, both in `W.W1`/`W.W4`: (a) the *software-GL* half becomes DR-08's
golden-screenshot suite, which runs every push and is honest about its renderer; (b) the *real-GPU*
half becomes **one bounded owner-run session** (≤30 min, headed Chrome on the owner's machine)
producing N committed frames and a signed checklist, scheduled with a date at wave-open. If the
session does not happen, the row is RETIRED at close with a tombstone — it does not carry a
seventh time.

---

#### DR-01 · Aurora derive-from-color — **BUILD** (retire-then-prove)

**Chain — 17 closes, 13 names.** A.W6 `065c6fe` (2026-05-19) "Aurora `deriveAuroraPalette(baseColor,
opts)` | NOT SHIPPED" → B "opened once glass-ui ships" → D `Dc-1/2/3` "ROUTED — precept-§10 blocked"
→ E `E-RF-2`/`E-RFV-2`/`E-OTH-1` "CARRY-FORWARD-WITH-SHARPER-TRIGGER" → F: the escape hatch is
**declined in writing** (`F-AUDIT-2:37` "Recommend (B) — remain PEER-AUTHORSHIP-REQUIRED") →
G `CH-2`/`CH-11` "5-tranche" → H "6-tranche" → K.W4 (a dedicated wave with **zero commits**) →
N.W5 `e32111c7` **mechanically landed** → S: "wiring INTACT — do not rebuild" → T/U carried →
V′ W54 "**D-1 aurora-derive RUNS or V′ does not close**" → vnext: 0 `aurora-derive` hits in 193
waves, and the only aurora rows are D17/D17A "**KEEP and refine** the current Aurora instrument".
**Why each close failed to decide it.** A–H: the predicate was an upstream actor's action, so
re-verifying the block was the work (FM-08). K/M: the wave never ran (FM-09). N: it landed, and no
close said so terminally. S: reframed as already-fine, which reads as a non-finding rather than a
closure. T/U: producer-gated carry. V′: the predicate mutated to "visibly changes", adjudicated by
the executing agent's own eye (FM-04). vnext: silently inverted from *derive* to *keep*, with no
tombstone (FM-13).
**Measured at HEAD.** `grep -rn deriveAurora demo/` → 8 sites, incl.
`demo/color-picker/composables/boot/useAtmosphere.ts:142` `deriveAurora(atmosphereColor.value)` and
`:243` `deriveAurora(seed, { scheme: "dark" })`. **The original mandate has been satisfied since N.**
**Decision — BUILD**, and the wave's **first act is a tombstone**.
**Wave shape.** `W.W5 — ATMOSPHERE`. (1) Write the supersession row: the A-vintage mandate
(mandate 13 / Ae-11 / A-02 / Dc-1..3 / CH-2 / D-1) is **RETIRED AS LANDED at N.W5 `e32111c7`**,
quoting the original predicate, with S's independent confirmation. (2) The only live claim —
response visibility — gets a **new namespaced id (`W:ATMO-1`) with carry 0** and a machine oracle:
for each of N seeds, the rendered atmosphere's named atoms must move by ≥ a stated ΔE2000, measured
from committed frames, not from an agent's eye. (3) Correct `RF-26`'s misdating (it says "Tranche
D"; the origin is A.W6 — the register under-counts its own oldest row by three closes).

---

#### DR-02 · Blob-facility extirpation — **RETIRE**

**Chain — 14 closes.** A turn-1 mandate 13 → `Ae-10`/`Ae-13` → `A-01`/`A-03` → `Dd-1..4` (consumer
count measured **11 → 16 → 10** across three closes without resolution) → `CH-1`/`CH-3`/`CH-11` →
K.W3 "the 7-tranche carry ends here" (zero commits) → N.W5 `e32111c7` "blob fork (1270 LoC) →
glass-ui goo-blob; watercolor fork + global `#watercolor-filter` extirpated" → V′ W54 D-2 → vnext
D18 "**KEEP** and refine the complete Blob instrument … all 49 leaves remain live/owned".
**Why each close failed to decide it.** Identical to DR-01, plus: a removal mandate was inverted
into a preservation mandate with no supersession row, and the word "extirpat" appears **zero** times
in the entire vnext corpus.
**Decision — RETIRE.** The extirpation landed at N.W5 and is verifiable at HEAD
(`demo/picker/visual/HeroBlob.vue:34` imports `{ Blob } from "@mkbabb/glass-ui/blob"`). Write the
tombstone, quote the original mandate, cite `e32111c7`, and close it. The residual lifecycle asks
are **not** this row — they are DR-03, which is separately booked.

---

#### DR-03 · GAP-L5 — the blob `settled` seam and the HERO/blob-config consume — **BUILD**

**Chain.** K → N → M → S (GAP-L5 booked; demo geometry halves landed) → T ("rides the blob
co-rebuild; no `settled` export at HEAD; **anchors the Q14 RP-2 clear**") → U (U-F5, ANNEX-OWNER-ATTEST)
→ **V: zero hits in the entire tranche V corpus, while the adopt trigger FIRED at W44.**
**Why each close failed to decide it.** Producer-gated (FM-08), then routed through T.W7's
wave-sized vacuum (FM-09), then dropped at the boundary where it should have been re-verified.
**State.** `HeroBlob.vue:202-212` still ships the wall-clock interim and names a dead book ("the
producer `settled`/park-from-quiescence seam (GAP-L5, booked at the 5.0.0 adopt)") — and 5.0.0 was
skipped. The producer *has* shipped `BLOB_HERO` and `./blob-config`; both have **zero demo consumers**.
**Decision — BUILD.** Split the row at the repo boundary — that split is what six closes failed to make.
**Wave shape.** Value-side, in `W.W4` (it is DR-06's named cure): consume `@mkbabb/glass-ui/blob-config`
on the boot path; replace the wall-clock park with a consumer-side quiescence probe that does not
require a producer export; measure the eager-bytes delta. Producer-side: one outbound letter with a
**dated** re-check, recorded in `§D`, never again as a gate.

---

#### DR-04 · GAP-L2 — the aurora lightness-scheme atoms door — **BUILD**

**Chain.** S (booked; "the dark L band [0.18,0.42] unreachable") → T ("door surface now present
in-tree; verify-at-adopt — **OLDEST, S→T**") → U → **V: zero hits.**
**Why each close failed to decide it.** Bound to "the W7 re-verify"; T.W7 closed TRIGGER-NOT-FIRED,
and three live source sites still point at it (`useAtmosphere.ts:234`,
`atmosphere-calibration.ts:24-26`, `demo/test/glass/aurora-bracket.test.ts:29`) — a wave that
closed 12 days ago is still cited as a future event in shipping code (FM-19).
**Decision — BUILD**, and it is probably cheap: `rg -c lightnessScheme ../glass-ui/dist/aurora.js`
→ **6** at glass 7.0.0. The producer may already have shipped the door.
**Wave shape.** In `W.W5`: re-probe at the installed dist; if the atoms exist, land the dark lBand
and delete all three stale source comments; if not, one dated letter. Either way the row closes and
the comments stop naming a dead wave.

---

#### DR-05 · GAP-ARM — the cold-load arm-replay — **BUILD**

**Chain.** S ("user-visible on prod until the producer ships") → T ("REWORKED toward the cure
in-tree … verify-at-adopt") → U (9 mentions) → **V: zero.** The verify-at-adopt was never walked
at the W44 glass-7 adoption.
**Decision — BUILD.** The cheapest row in the registry: one cold-load capture asserting the first
painted atmosphere equals the seeded pick. Land it in `W.W5` beside DR-01's oracle, which needs the
same harness. Retire on evidence.

---

#### DR-13 · The 8 glass-ui primitive asks — **RETIRE**

**Chain.** Born in tranche A (`research/Ad`, `/Ae`, `/Ab`). Counted 8 → 7 → 7 → 8 → 9 → 11 across
five closes with no add/remove event ever recorded. Two members (CH-2 aurora, CH-3 BlobDot)
resolved at N.W5 — **not because any E–H trigger fired**, but because glass-ui 3.12.0 independently
shipped them. One (CH-7 `icon-sm`) was retired by attrition when its consumer anchor vanished. Four
survive at HEAD after 14+ closes.
**Measured at HEAD.** CH-4 `SelectTrigger` hand-written `h-9`: **12** sites. CH-5 `clampLabel`:
`demo/shell/PaneSegmentedControl.vue:45` still cites the A-vintage id **`Ad-18`** in shipping
source. CH-6 `variant="mono"`: **0** occurrences. CH-8: `demo/styles/foundation.css:554`
`.underline-tabs` reka override still shipping.
**Why each close failed to decide it.** The bundle was PEER-AUTHORSHIP-REQUIRED — a category whose
only exit is an external actor (FM-08) — and two explicit "ship-or-KILL" rulings (M.W7, N cohort)
produced **zero decisions** because the waves that owned them never ran (FM-09/FM-19).
**Decision — RETIRE the bundle.** Kill the container; each survivor gets a terminal, Value-side
disposition in `W.W6 — CHROME`: either (a) land it as a local with an owner-accepted rationale
recorded in canon, or (b) delete the ask. No third state, no producer-gated carry, no bundle. An
ask that cannot be actioned from this repository is not a Value row; it is a letter.

---

#### DR-14 · CH-9 `siblingFsAllowTransient` — **RETIRE**

**Chain.** Introduced at D.W1 (2026-05-19) with an explicit retirement trigger: "retires when
glass-ui ships a contract-v2-compliant Tailwind-source distribution". E declared it NARROWED to the
font-asset half; F, G, H each carried it with a per-wave-close re-check that
`rg -n 're-check' docs/tranches/H/PROGRESS.md` shows was **never run**. Unretired at HEAD, 14+
closes on.
**Measured at HEAD.** `vite.config.ts:139` `const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")]`;
`:287` `fs: { allow: siblingFsAllowTransient }`. `package.json:83` `"@mkbabb/glass-ui": "^7.0.0"` —
**six majors** past the pin at D.
**Decision — RETIRE.** In `W.W6`: evaluate the trigger **once**, now. Either delete the carve-out,
or rename it (`siblingFsAllowAccepted`) with an owner-recorded rationale. A variable with
"transient" in its identifier may not survive tranche W.

---

#### DR-15 · CH-10 keyframes precept-pin drift — **RETIRE**

**Chain.** B-10 → D-02 → E-RF-4 → F→G-3 → CH-10, every close carrying "re-check at the keyframes.js
maintainer's next submodule-rebase signal". The signal never came in six closes.
**Measured at HEAD.** `git submodule status docs/precepts` → `63240e67…`;
`git -C ../keyframes.js submodule status docs/precepts` → `8ccf9f4d…`. Still divergent, **on
entirely new SHAs** — the `458c2d1` vs `68d9b20` framing every close from B to H repeats is now
historical fiction while the divergence is real.
**Decision — RETIRE.** In `W.W0`: rebase the submodule, or record an owner ruling that divergence
is accepted. The trigger is dead by demonstration; six closes is the proof.

---

#### DR-25 · PRM-expand (keyframes `springPlay` subscribers-only emit) — **RETIRE**

**Chain.** K-era → S ("the one-line cure unlanded") → T ("re-dispatched `ad65733`, STILL LIVE at
kf 5.2.0; not value.js-gated") → U (U-F28, book B1, "retires on their next tag past v5.2.0") →
**V: zero mentions; no row in `CARRY-LEDGER`.** The named gate **fired** — keyframes is now
`^6.0.0` — and nobody noticed (FM-19).
**Decision — RETIRE.** Re-probe once at kf 6 in `W.W0`. Fixed → tombstone. Not fixed → one dated
letter in `§D`. Either way the row dies; it does not become a fourth carry.

---

#### DR-16 · HG6 — the owner taste verdict, and the 20-bracket package — **RETIRE**

**Chain.** T.W8 delivered a 20-bracket certification package whose own gate text reads "A package
delivered but unruled leaves the wave OPEN, honestly". T then verdicted the wave
`complete_with_misses`, merged (`6e14e90`) and tagged (`tranche-t-close`). U redefined HG6 as
"whether the HG6 re-encapsulation READS right" — HG5's subject wearing HG6's name — and **19 of the
20 brackets have zero hits anywhere in tranche U**; nine of those have no `T-#` anchor and cross by
no route at all. V′ reduced it to one line in `CARRY-LEDGER §C`.
**Measured at HEAD.** `docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md` still reads
`> _(empty — the owner's verdict lands here)_` — byte-identical across three closes.
**Decision — RETIRE.** The brackets are **stale**: W43 rewrote the demo tree wholesale and W44
adopted glass 7, so most bracket poles no longer describe reachable states. Resurrecting them costs
more than re-deriving. Write the tombstone in `W.W0`, quoting the gate text and the three closes it
survived. If taste certification is still wanted, `W.W6` derives a fresh, **small** bracket set from
the current tree — with a date on the owner's sitting (see DR-29).

---

#### DR-29 · The owner packet P1..P8 / B5 and the 11 owner-attest annex rows — **FOLD**

**Chain.** U produced an owner-attested annex (11 rows: OA-1..OA-6, OA-B1/B2, the Pole A/B
bracket, HG6) explicitly "never proxied". V′ carried it verbatim into `CARRY-LEDGER §C` and took no
position. Two closes, zero attestations — while the events those rows were gated on (the glass cut)
fired twice.
**Why each close failed to decide it.** Correctly: the rows *are* owner-reserved, and proxying them
would be worse. The failure is scheduling, not judgment — no close ever gave the owner's decision a
**slot**.
**Decision — FOLD** into one scheduled decision session at `W.W0` open: all rows in one sitting,
each with a rendered artifact attached, each returning LANDED-AS-RULED or RETIRED. An owner-held
row that rides two closes is a calendar defect; the fix is a calendar entry, not more naming.

---

#### DR-19 · The `proof:*` / gate-farm idiom — **RETIRE**

**Chain.** Owner deleted all 9 `proof:*` scripts on 2026-06-02 ("overfit junk … NEVER
re-introduce; enforce invariants structurally"). O re-introduced 1 (2026-06-19). Q compounded to 11
(2026-06-23). R and S both **closed with 11**, and neither close sweep flagged it. T excised 7 as
"overfit". U minted 11 more and rested its entire zero-drop close verdict on one of them —
`G-CLOSE-1`, which the U seat then **proved vacuous by executing it**: adding an 78th ledger row
leaves it printing the discrepancy and exiting 0, and a FINAL.md whose 77 evidence cells all read
`DEFERRED` passes. V deleted all 11. vnext rebuilt **44 tools / 9,837 LOC**, with 81 `proof:*`
occurrences including a literal `"proof": "npm run proof:receipt && npm run proof:modules"` script
block.
**Decision — RETIRE.** Two acts, both in `W.W0`: (1) an **owner ruling on vnext's 81 sites before
any adoption** — adopting vnext silently reverses an explicit owner decision; (2) a structural ban
recorded in canon: no new `scripts/**/proof-*.mjs`; invariants live in types, `tsc`, `eslint`
(which needs actual rules — see DR-12), and tests that assert product behaviour.

---

#### DR-26 · Test ground-truth circularity + the ratification of the coverage deletion — **BUILD**

**Chain.** U diagnosed the circularity (U-F72) and cured it with external reference vectors plus a
34-pair Sharma CIEDE2000 table (`fc14c01`, born-GREEN). Both files were deleted at
`7334c793`/`3b5956d0`. The defect is **restored**: `test/v4-color-behavior.test.ts:66` asserts
`toBeCloseTo((byte / 255) / 12.92, 12)` — the implementation's own sRGB constant — under the test
name "matches the independent IEC sRGB dark-band oracle". Meanwhile `3b5956d0`, subject
"test(v4): producer-surface behavior tests", removed 70 files / 17,198 lines against 1,470 added,
and V′ ratified the 1607→346 collapse on a three-part guard set of which two had waived falsifiers
and one was never built.
**Decision — BUILD.** In `W.W2`: restore external-vector anchors for the v4 conversion API (they
are cheap and the audit record at `docs/tranches/U/audit/oracle/color-anchors/README.md` still
describes them); rename or fix the falsely-named oracle; and publish a measured
coverage-by-export statement over the real 141-export surface, so the ratification is made against
a number rather than a vibe.

---

#### DR-27 · CH-6 scene transitions / the T-58 jank — **BUILD**

**Chain.** Escalated three times inside T (T-48 → T-58), with hard numbers produced in T's own
close window and never folded into any ledger: `docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt`
records `swap→/gradient: {"frames":14,"max":154,"median":59,"over32":10,"over50":8}` — ten of
fourteen frames over 32 ms on a single scene hop. U carried it as U-F7 with an explicit owner
MANDATE, never attested. V′ booked it as CH-6 → W47, unexecuted. The evidence is **still untracked**
(`git status` shows `?? docs/tranches/T/audit/pi/u-gestalt/`).
**Decision — BUILD.** In `W.W6`: track the u-gestalt evidence first (DR-23), then wire a frame-budget
oracle around the scene swap with the existing numbers as the born-RED baseline. This is the rare
row where the measurement already exists and only the ledger entry is missing.

---

#### DR-28 · CH-8 palette-truth — the UI half — **BUILD**

**Chain.** The api half landed at W45 (`a714b90f`, bounded prefix contract). The UI half —
register → recover → rotate → lost-response-logout, and draft→publish→unpublish→trash→restore with
immutable public history — was booked to W50, which never executed. RF-26 lists CH-8 among the
eight riders that may not be re-chartered; `CARRY-LEDGER §B` charters it.
**Decision — BUILD.** In `W.W7 — PALETTE`. Fold in the two riders V′ attached (D55.iii
`__Host-value-session` cookie transition; D57's Prepare→Download seat) **and** the export defect
this audit found: the shipping path (`demo/palettes/export.ts`) is lossy for non-ASCII names and
swallows every failure to `console.warn`, while the byte-exact serializers W51 certified GREEN-PURE
have exactly one importer — their own test.

---

#### DR-21 · `sampleColorRamp` / `mixColorsInto` / `toRgba8Into` (SCI-1) — **BUILD**

**Chain.** `sampleColorRamp` appears in tranche dirs N O Q R T U V W — **8 closes**;
`mixColorsInto` in O Q R S V W — 6. The covering ruling `docs/tranches/V/DECISIONS.md:82` reads
"SHIP-4.1.x — the sole ship … **un-dated, execution-gated**, evidence tuple owed to atlas at the
cut" and rides W56, which never executed. `grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/`
→ **0** at HEAD.
**Why each close failed to decide it.** A ship label with no date, attached to a wave that can
decline to close (FM-19), is a deferral (FM-03).
**Decision — BUILD**, in the **same cut as DR-12's 4.0.1/4.1.0**. A dated cut is the only thing
that has ever discharged this class. The atlas evidence tuple is owed at the cut and is written in
the same commit.

---

#### DR-30 · Prompt-recap completeness (RF-20 / PROMPT-RECAP §7 / E1–E11) — **BUILD**

**Chain.** Found defective 2026-07-16 (RF-20: "3 asks UNOWNED … 2 over-claims … 7 vague rows") →
dispositioned BUILD, owner W56 → W56 never ran → replaced on 2026-07-20 by
`vnext/PROMPT-RECAP.md`, which the CROSS seat measured as **authored before 69 of the 181 canonical
prompt events existed** (29 of them owner-authored), declaring its authority to be two
keyframes-written seed letters, with 18 of 35 sampled rows having zero phrase-level grounding in
the owner corpus, and containing **0** occurrences of E1–E11.
**Why each close failed to decide it.** The obligation is a standing owner edict ("Recap ALL of our
prompts… Silent drops are forbidden") and was routed to a wave that never ran, then supplanted by a
foreign-seeded document that structurally cannot discharge it.
**Decision — BUILD.** In `W.W0`: re-author the recap from the 181-event corpus at
`docs/tranches/V/apotheosis/pi/formation/session-audit/raw-prompts/`, as **tracked** canon, with
per-row phrase grounding. Twelve owner asks currently survive only in a read-only archive or an
untracked tree (internal-Browser edict; Aristotelian proportion; precepts binding; the
lightningcss/sonic-rs bench targets; the ARM-only constraint; the 3×5×3 law; and six more).

---

#### DR-17 · HG5 — demo files ≤400 LoC — **FOLD**

**Chain.** T.W8 booked it ("splitting demo/ is a remediation act, not a gate act") → U re-booked it
explicitly gateless ("verify-at-execution, **NO gate**") → the breach **doubled**: 2 files at T
close, 4 at U, and `ARCHITECTURE.md:943` still asserts the cap as canon while excluding a path
deleted at W43.
**Decision — FOLD** into `W.W8 — STRUCTURE` with DR-18. One ruling covers both: either the cap is
wired as a real check, or the sentence is deleted from canon. A cap that is canon and not measured
is a lie with a number in it.

---

#### DR-18 · The src god-module cap and the `stylesheet.ts` residual — **FOLD**

**Chain.** G declared "no god-module remains in `src/`" while 11 files exceeded the cap at its own
merge; H asserted `dispatch.ts` "max 312, unchanged in H" while its own wave had grown it to 372,
substituting an estimate for the `wc -l` G had used one tranche earlier; W43 closed the css
god-module row **2→1** and filed it as "census 0", and the residual (`src/css/stylesheet.ts`)
appears **nowhere** in `CARRY-LEDGER`.
**Measured at HEAD.** 5 files over 350: `src/css/stylesheet.ts` 899, `src/transform/decompose.ts`
609, `src/transform/path.ts` 564, `src/css/grammar.ts` 483, `src/color/anchors.ts` 377.
**Decision — FOLD** into `W.W8` with DR-17. Book the 899-line residual **by name** — an unbooked
residual is exactly how a chronic re-enters under a new name two closes later.

---

#### DR-20 · The PARK set — `Color.try()` · `usePaletteStore` schema · S.H3 Pratt — **RETIRE**

**Chain.** Parked at R, re-parked at S, re-parked at T, re-parked at U. `Color.try()`'s trigger is
"demand for a non-throwing parse", measured as a grep count of `try{}` wraps with **no threshold**;
the recorded values move 11 → 12 → 3, i.e. in both directions.
**Decision — RETIRE all three** by owner ruling in `W.W0`. A metric with no threshold that moves in
both directions is not a trigger; four closes have proved it. (Note: `Color.try` is partly
superseded anyway — the v4 surface is Result-returning, which is what the row wanted, except where
DR-12 throws.)

---

#### DR-23 · Untracked authority and untracked evidence — **BUILD**

**Chain.** W41 deviation 4 left `research/{STANDARDS,auth-cookie-order,proportion-register}.md`
live-untracked → `CARRY-LEDGER §C` "the next formation rules track-or-archive" → W44/D58.iii added
`audit/rehearsal/` to the same undecided row → vnext omitted both. U deferred `u-gestalt/` and
`u-bh-communique-draft.md` explicitly as "not a drop"; both are still untracked 11 days later. The
apotheosis corpus, `V/audit/POST-U-AUDIT.md`, `V/evidence/`, `V/megatranche/` and the entire 1.75 MB
vnext formation are untracked.
**Why each close failed to decide it.** It was filed as housekeeping. It is not: `PROPORTION-AUDIT.md:25`
names `proportion-register.md` "the exhaustive terminal disposition and ownership authority" and
`V-PRIME.md:50` makes it the design-system source for W46 — while `EVIDENCE.md:75` states "A cited
artifact absent from `git ls-files` is not evidence." Nine waves rest on an artifact the tranche's
own evidence law disqualifies.
**Measured at HEAD.** `git ls-files docs/tranches/V/research/` → **0** rows, for three files that
exist on disk.
**Decision — BUILD.** `W.W0` executes track-or-archive in one commit for **every** untracked
authority and evidence tree, with a one-line disposition each. This is a 30-minute act that has
ridden three closes as a question.

---

#### DR-24 · `scripts/dev/dev.sh` — **RETIRE**

**Chain.** The last unowned dirty working-tree row, un-ruled since pre-V′ and carried verbatim
through the T, U and V ledgers: "Owner rules commit-or-restore; **no wave owns it**."
**Measured at HEAD.** `git status --porcelain -- scripts` → ` M scripts/dev/dev.sh`, still.
**Decision — RETIRE the row.** `W.W0` owns it — the fix for "no wave owns it" is to assign a wave.
Owner rules commit-or-restore at W0 open, in the same sitting as DR-29. It does not appear in a
fourth ledger.

---

#### DR-31 · X2 — the NCSU alias — **RETIRE**

**Chain.** Owner order: "no ncsu alias". R specified the execution ("remove the `/colors/`
reverse-proxy block, let the DNS/cert lapse; **verification = the alias going non-200**") and
carried it PENDING. S carried it a second time. T executed a **permanent 301 redirect** — which
satisfies the literal verification criterion and inverts the order: the alias is not retired, it is
made permanent and must be maintained forever. U then re-classed the whole leg
"attested-not-verified" (VPN-gated), and V′ banked it.
**Decision — RETIRE.** One owner ruling in `W.W0`: either the permanent 301 is **accepted** and
recorded in canon as the standing answer (killing the row), or the block is removed on the next
host session. The row must not survive as "banked until VPN".

---

#### DR-32 · DesignSync / the Fable design pathway — **FOLD**

**Chain.** Codex banked it honestly with a retrigger; the Fable arm omitted it entirely; the union
re-added it as ADD-8; post-convergence booked it as ORCH-07 "**DesignSync is unavailable and no
substitute may claim equivalence**" — while `OWNER-RULINGS-2026-07-20.md:47` (D-20) still conditions
a ruled design gate on "DesignSync frames". `DISPOSITIONS.md:22` (E5): the design-system project
"none exists today — verified"; it opens at W46, unexecuted.
**Decision — FOLD** into `W.W6`'s wave-open as an explicit owner precondition: either the project
is opened and DesignSync is callable at wave-open, or the owner names the substitute in writing and
D-20's frames obligation is amended in the same ruling. A design gate may not depend on a tool the
same corpus books as unavailable; that is how a whole design axis rides a close invisibly.

---

#### DR-33 · The Idempotency-Key replay store — **RETIRE**

**Chain.** I promised "Idempotency-Key on POST + PUT (24-hour replay window)" → deferred to
"I-tail or value.js-J" → J "BOOKED, optional" → K landed it at `59aab42c` as a **per-process
in-memory LRU**, disclosed only in source: "the store is PER-PROCESS, so the 24h durability is
best-effort and does NOT survive a restart or span replicas". **No close document restates the
commitment in its relaxed form**, and it is still moving at V (W50's non-UUIDv7 idempotency-key
retirement).
**Decision — RETIRE**, by recording the truth. In `W.W7`: write the relaxation into canon as the
accepted single-replica design (it is the honest KISS choice and the deployment is single-replica),
with the trigger that would reopen it stated as a **deployment fact** ("if a second replica is
provisioned"), not a wave. The defect here was never the LRU; it was that three closes reported a
property the code does not have.

### 2.3 Chronics that are CLOSED — do not re-open

Recorded so tranche W does not spend a wave re-litigating a decided row. Each was verified by the
seat named.

| Row | Closed at | Evidence |
|---|---|---|
| The legacy 4-state `status` field | L.W3 `17b61488` | 7 excise-ledger rows + inv-L-9 (`I-L`) |
| VAL-1 OKLab aurora-LUT | N.W5.B | KILL with recorded rationale; confirmed terminal at T (`M-P`, `I-L`) |
| X1 production wire (I-era code) | T.W0 `bdfb4a5` | live re-probe 2026-07-12 (`M-P`, `Q-S`) — **but see DR-11, it recurred** |
| The 126-error vue-tsc baseline | F.W1 Lane C `1401d75` | 29 zero-consumer dirs deleted, 118→0 (`A-D`, `E-H`) |
| K-W3DIFF / `/remix` + `/diff` | S.W5-13 + T.W1 TA-4 | alt-exit taken, api excised (`Q-S`) |
| The `development` export condition | `4c8c5320` + N.W1 `d9c3b9f2` | end state correct — **but MEMORY's "reverted in K.W2.5" is FALSE** (`I-L`) |
| `srgbToLinear` decode threshold | S 3.0.0 `1537fed` | survives the v4 rewrite at `operations.ts:180` (`Q-S`) |
| Colocation / modularization CH-3 | V′ W43 | `demo/@` gone, no `panes/`, no empty dirs (`V-core`) — residual booked as DR-18 |
| Glass adoption CH-5 | V′ W44 `f2c8f565` | glass 7.0.0 whole, island dead (`V-core`, `CROSS-consumer`) |
| `dup-useDark` · K-W5RT (vue-router 5) · U-F49 · U-F45/47 eslint boundaries | S–U | verified live (`Q-S`, `U`) |

### 2.4 Carry-1 watchlist — not disease rows yet, and will be at the next close

These rode exactly one close. Under the immutable-identifier rule they must be decided in W or they
become disease rows by definition.

- **The publishable dependency cycle** (`package.json` declares `@mkbabb/glass-ui ^7.0.0` +
  `@mkbabb/keyframes.js ^6.0.0` as **runtime** deps; keyframes 6.0.0 pins value exactly 4.0.0;
  keyframes has **zero** imports anywhere in `src/`, `demo/`, `test/`). Booked as AM-13, unexecuted.
  → ride DR-12's cut.
- **The legacy export seat + the triple slug implementation** (three slug functions, two live and
  divergent). → ride DR-28.
- **`ActionBarLayer`'s local shim** with its dead signature-parity parameter. → ride `W.W6`.
- **The 3×5×3 review law encoded as 2+1.** → ride DR-30's re-authoring.
- **`eslint` with one enabled rule.** → ride DR-12.
- **The 52-vs-141 export-surface figure** propagating without its `/css` qualifier. → ride DR-12.
- **`fourier-analysis` frozen at `^0.13.0`** with 13 bare-root imports the packed gate asserts must
  fail, plus a symbol (`timingFunctions`) that no longer exists. → ride DR-21's cut as a consumer row.

---

## 3. UNDEREXPLORED LENSES — where a second round must be staffed

Honest accounting: the fleet audited **documents and the git object store** exhaustively, and
**the running product** almost not at all. Ranked by expected yield.

1. **The running product — zero passes. THE GAP.** Not one seat booted the demo, clicked a
   journey, or looked at a rendered frame. `NV-7` (the production build mounts empty) is named by
   the owner's own program of record as "the **first** probe of the post-compaction deep audit" and
   **no seat diagnosed it**. Every seat that executed *anything* (U ran the close gate; three seats
   ran node against `dist`; I ran both) found a BLOCKER that reading had missed. Staff this first.
   Concrete: boot dev + gh-pages preview, walk the 11 routes, capture frames, diff.

2. **Live performance — zero fresh measurements.** Every seat cites 5141 / 4919 from T and U. Those
   numbers **predate the v4 cut, the glass 7 adoption and the alias death**. Nobody measured LCP,
   TBT, CLS or the eager gzip payload at HEAD. DR-06 cannot be shaped honestly until someone does.
   Also unmeasured: whether consuming `./blob-config` actually saves bytes — `Q-S` flagged it
   "byte impact UNVERIFIED (glass-ui declares `sideEffects:['*.css']` so rollup may shake it)" and
   no later seat ran `npm run gh-pages` + gzip diff.

3. **Does the Playwright suite pass? — unknown.** `CROSS-gate` counted 185 tests and found 2
   source-broken fixtures; **nobody ran it**. This is the precondition for DR-09, and the entire
   "restore the gate" plan is unshaped without the number.

4. **`api/` at HEAD — one shallow pass.** Audited at D (no tests existed), L (excision) and U
   (security). Nobody ran the api suite this round, nor re-checked: 17 `withTransaction(` sites
   against N's ≤14 ceiling, 21 `createIndex(`, the admin auth surface, or the CRUD contract's
   current conformance. `M-P` re-ran three of L's greps and stopped there.

5. **Accessibility and web-modality truth — zero passes.** U built the whole battery (RTL, print,
   forced-colors, slider operation, authed-admin a11y). Every spec is in the tree and unrun; no seat
   verified a single a11y claim at HEAD.

6. **Security at HEAD — one citation-level pass.** `demo/color-picker/public/_headers` derives its
   CSP from **three dead paths** (`demo/@/lib/palette/export.ts`, `.../api/client.ts`,
   `.../ProfileSection.vue`) — `demo/@` was dissolved at W43. Nobody re-derived it. Nobody confirmed
   the headers on the wire, or the session-token-at-rest digest in a live deployment.

7. **keyframes.js as a producer — one shallow pass.** `CROSS-consumer` covered glass-ui in depth
   (BJ tranche state, both §D holds, byte-level receipts) and keyframes only by version. The kf
   P4.5 scar coordinates, PRM-expand at kf 6 (DR-25), the R-RAMP consume (DR-21) and the cycle from
   keyframes' side are all unexamined from that repo.

8. **The 94 unverified tranche-D ledger rows.** `A-D` sampled 26 of 120 and found a **46% defect
   rate**; 94 rows remain unsampled and are the largest single quantified unknown the fleet left.
   E/F/H's equivalents were never sampled at all.

9. **136 of the 193 vnext wave rows.** 57 were hand-audited (30%). The rest were validated only
   mechanically, by a contract checker whose content test on the "Falsifiable gates" column is a
   **non-emptiness check** — a gate cell reading `x` passes.

10. **Test coverage by export.** 141 public exports; 346 tests. Nobody measured which exports have
    behavioural coverage. `CROSS-consumer` found 38 runtime exports with zero external consumers and
    8 with **no caller at all outside their own test**; whether the consumed ones are tested is
    unknown.

11. **The BBNF authority.** `find . -name '*.bbnf'` → 0 files, while MEMORY.md asserts two grammar
    files and an equivalence test that do not exist, and `PROMPT-RECAP` row 82 mandates mirroring
    "the accepted CSS BBNF module files". The mirror source is external and unpinned; no seat
    located or pinned it. One passing mention.

12. **Pre-V owner-prompt fidelity.** `CROSS-prompt-recap` audited the 181-event V-era corpus
    rigorously. The A–U owner asks (turn-1 mandate 13, the 23/24 user-requests, D-PROMPTS' six
    items, T's 61 findings) were audited only *through tranche documents* — the very artifacts under
    suspicion. Declare it a bounded unknown unless a raw corpus for those eras exists.

13. **Unattributed history.** `HISTORY-SYNTHESIS` notes ~2,929 product file-touches carry no tranche
    marker. Nobody audited that set, nor verified that annotated tags point at the trees their close
    documents describe (only that the tag objects exist).

---

## 4. THE CONVERGENCE QUESTION

**Verdict: the registry is CONVERGED on the document axis and STILL GROWING on the execution axis.
Two more reading passes would surface little; one product-execution pass will surface new BLOCKERS.
I predict ≥3.**

**Evidence that the document lens has converged.**

- The ten per-tranche seats worked independently and **rediscovered the same eight chronic
  identities** — aurora, blob, Q14/boot, real-GPU, the glass asks, keyframes pin, siblingFs, HG6 —
  from different eras and different files. Independent rediscovery is the signature of saturation.
- 18 of the 22 families in §1 are attested by **≥3 seats**. Late seats added *members* to existing
  families, not new families: `V-core`'s W48 self-baselining is FM-04; `V-vnext`'s
  non-emptiness contract check is FM-04; `V-apot`'s FOLD-by-owner-ID is FM-04. Family growth
  flattened while member count kept rising — the classic saturation curve.
- The chronic *set* did not grow at the end: `V-vnext`'s "chronic candidates" section lists five
  rows, four of which are DR-01/02/06/24 under other names, and the fifth (D49 residue) is DR-23.

**Evidence that the registry is still growing — and it is decisive.**

- **Every seat that executed code found something reading had missed.** `U` restored
  `proof-close-ledger.mjs` into a scratch tree, **ran it**, and proved by experiment that the gate
  underwriting U's entire "zero silent drops" verdict passes over an 78th unwalked row and over a
  FINAL.md whose 77 evidence cells all read `DEFERRED`. No amount of reading produced that.
  Three seats ran node against `dist` and found R1. I ran `eslint --print-config` and confirmed one
  enabled rule. **Zero seats ran the product**, and the product is where the owner's own program of
  record says the next probe lives.
- **A cross-seat contradiction on a BLOCKER survived the whole fleet and was resolved only by
  execution** (§0): `CROSS-canon-drift` recorded R1 as not reproducing; three other seats and my own
  run say it does. If a reading-only pass can disagree with itself about a shipping crash, the
  reading-only lens is not the converged authority on product state.
- **The last-added seats contributed genuinely new BLOCKER families.** FM-16's scale
  (81 vnext sites), FM-10's deploy-death member, the dependency cycle, and the 52-vs-141 surface
  came *only* from the four cross seats — the newest lenses. New lens ⇒ new blockers. Four of the
  22 families rest substantially on a single seat (FM-16's vnext half, FM-20's tag forensics,
  FM-05's deleted-target shape, FM-22's counter drift), which is by definition unconverged.
- **The subject is still moving under the audit.** `CARRY-LEDGER.md` gained 34 uncommitted lines on
  2026-07-22 (two glass BJ consumer holds) *after* the vnext formation sealed against it — which is
  exactly why `validate-union-inventory.mjs` crashes on source drift. An audit of a moving corpus
  cannot declare convergence on the corpus.

**The falsifiable prediction, so the next round can grade this seat.** Staff one round on lenses
1–3 (boot the product; measure LCP; run Playwright). I predict it returns **≥3 findings of BLOCKER
severity that no seat in this round produced**, and that at least one belongs to a family not in
§1. If it returns ≤1, the registry is converged and tranche W should stop auditing and start
executing DR-09 → DR-12 → DR-10.

**What convergence does NOT license.** Even where the document lens has converged, the *decisions*
have not been taken. Twenty-two closes proved that describing a chronic accurately is not the same
as deciding it. The registry's value is §2, and §2 is worth nothing until a wave lands.

---

## 5. APPENDIX — every measurement this seat made, with its command

```bash
# §0 R1 reproduction (resolves the cross-seat contradiction)
node -e 'import("./dist/subpaths/css.js").then(m=>{for(const s of ["oklch()","rgb()","lab()","color()","foo()","oklch(0.5 0.1 200)"]){try{const r=m.parseCssColor(s);console.log(JSON.stringify(s),"->",r&&r.ok?"ok":JSON.stringify(r).slice(0,60))}catch(e){console.log(JSON.stringify(s),"-> THROW",e.constructor.name,e.message.slice(0,60))}}})'
# → 5 THROW TypeError, 1 ok

# FM-02 / DR-09 — the gate ladder has no browser
grep -rniE 'lighthouse|lhci|playwright|test:e2e|boot-smoke' .github/workflows/ | wc -l   # → 0
wc -l .github/workflows/*.yml                       # → ci 71, deploy-pages 174, release 149
grep -n 'largest-contentful-paint' lighthouserc.json # → :13 ["error",{maxNumericValue:2500}]
grep -rn 'test.fail()' e2e/ | head                   # → o16:34, o26:57, o5-boot-pacing:48

# FM-10 / DR-09 — the e2e corpus is source-broken
sed -n '19p' e2e/smoke/fixtures/browse-palettes.ts    # → import … "../../../demo/@/lib/palette/types"
ls demo/@/lib/palette/types.ts                        # → No such file or directory

# DR-22 — the deploy is pinned to a branch
sed -n '74,82p' .github/workflows/deploy-pages.yml    # → ref: tranche/BG

# DR-08 — no visual regression, 14 tranches
ls e2e/visual                                         # → No such file or directory
grep -rn 'toHaveScreenshot\|toMatchSnapshot' e2e/ | wc -l   # → 0

# DR-01 — the aurora deliverable is present
grep -rn "deriveAurora" demo/ | head -8               # → useAtmosphere.ts:142, :243, +6

# DR-13 — four glass asks still open
grep -rn 'SelectTrigger' demo/ | grep -c 'h-9'        # → 12
grep -rn 'clampLabel' demo/ | head -3                 # → PaneSegmentedControl.vue:45 "Ad-18"
grep -rc 'variant="mono"' demo/ src/                  # → 0
grep -n 'underline-tabs' demo/styles/foundation.css   # → :554

# DR-14 / DR-15 — two triggers never pulled
grep -n 'siblingFsAllowTransient' vite.config.ts      # → :139, :287
git submodule status docs/precepts                    # → 63240e67…
git -C ../keyframes.js submodule status docs/precepts # → 8ccf9f4d…

# DR-16 — the owner verdict, still empty
sed -n '30,40p' docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md

# DR-18 — the god-module residual
for f in $(git ls-files src); do n=$(wc -l < $f); [ $n -gt 350 ] && echo "$n $f"; done | sort -rn
# → 899 src/css/stylesheet.ts · 609 transform/decompose.ts · 564 transform/path.ts
#   483 css/grammar.ts · 377 color/anchors.ts

# DR-21 — the 8-close API ask is absent from src
grep -rn 'sampleColorRamp\|mixColorsInto\|toRgba8Into' src/ | wc -l    # → 0

# DR-23 — the design authority is untracked
git ls-files docs/tranches/V/research/ | wc -l        # → 0
ls docs/tranches/V/research/                          # → STANDARDS.md auth-cookie-order.md proportion-register.md
grep -cE 'W4[0-9]|W5[0-6]' docs/tranches/V/EVIDENCE.md # → 0

# DR-24 — the unowned dirty row
git status --porcelain | head -3                      # →  M scripts/dev/dev.sh (+2 doc rows)

# DR-26 — the circularity is restored
sed -n '63,68p' test/v4-color-behavior.test.ts        # → toBeCloseTo((byte/255)/12.92, 12)

# DR-12 — one lint rule repo-wide
npx eslint --print-config src/color/index.ts | node -e '…'   # → total 40 enabled 1 ["no-restricted-imports"]
```

**Not verified from this seat (no network egress used):** the `gh run list` outputs behind DR-11
(master CI red since 2026-07-05; 11 skipped deploys), the npm registry state behind the carry-1
dependency-cycle row, and the remote `mkbabb/glass-ui@tranche/BG` head behind DR-22. Each is
attributed to the cross seat that measured it, and each names the command that re-checks it.
