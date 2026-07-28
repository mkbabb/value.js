# AUDIT PLAN — the mega-tranche, re-formed under the tri-fold law

**Authored 2026-07-27, distilled and de-duplicated from this session's exact transcripts.**
Supersedes nothing; agglomerates everything. `STATE.md` is the resume point; this is the program.

---

## §1 — The precepts of record (every owner instruction, distilled, no drops)

**Scope.** The mega-tranche covers **value.js, keyframes.js, fourier-analysis, parse-that** (owner
correction: "not necessarily sci/atlas"). glass-ui's BJ is **not ours to refine** — coordinate with
that instance as need be. This is **NOT a new tranche** — it is THE mega-tranche, and it includes
the deep prototyping work that has failed hitherto: **properly prototyped parser items, with
idiomatic parse-that usage, is a requirement** (M-9).

**Method.**
1. **Challenge thrice** — every item is attacked on three axes by agents assuming: the design is
   flawed (D), the library improperly structured (L), the component improperly implemented (C).
2. **Triumvirate jury** adjudicates, then **re-authors the addenda and wave spec into an apotheosis
   of perfection**.
3. **Every component gets its own workflow.**
4. **Original prompts and exhortations are marked defects** — a prompt-recap completeness census
   with silent drops forbidden.
5. **Visual audits of every page, component, and state — in Safari, on mobile and desktop** — with
   Chrome DevTools MCP for fine-grained telemetry (M-5). Probe parsimony is standing law.
6. **Historical audit of the last 20+ tranches.**
7. **No deferrals. Re-booking is forbidden.** A chronic riding ≥2 closes is a disease row; deciding
   it is a wave of its own; every carry leaves with BUILD / FOLD / RETIRE; the string "next tranche
   decides" is banned.
8. **No quick solutions, no workarounds** — idiomatic, gestalt approaches. **No legacy code, no
   aliases, no migration shims, no dual paths, no masking fallbacks.**
9. Born-RED gates (RED *today*, failure pasted); π/DELTA obligations with **committed** witnesses;
   concrete deliverables only (file:line, failing probe, reproduction, named defect row); registry
   stable only when two consecutive passes surface nothing new; auditors denied the favored
   success narrative.
10. **No source edits land from this formation.** `src/ demo/ api/ test/ e2e/` untouched;
    `docs/tranches/V/vnext/**` Codex-owned READ-ONLY; `scripts/dev/dev.sh` never touched
    (its disposition is DR-24, decided by wave, not by hand).

**Operations law (accreted across the session, all owner-issued).**
- **≤4 concurrent workflows** — overrides any commissioned scale; honour scale sequentially.
- **Harvest before re-deploy** (L-13); re-deploy is `resumeFromRunId`, never restart; no seat whose
  rows are banked is re-run ("do not re-do work that's been done already").
- E13 mail law: every session opens with the coordination sweep; mail is ROWED, never remembered.

**The model law — CURRENT (M-16, 2026-07-28), supersedes M-12 prospectively.**

GPT Sol xhigh replaces Fable for orchestration, design synthesis, and adjudication. GPT Luna xhigh
replaces Opus for mechanical/extraction work. Historical receipts remain literal and cached work is
never renamed or rerun. Luna was unavailable to the 2026-07-28 external audit; its mechanical seat
used GPT Terra xhigh as a declared temporary fallback, not as a relabeled Luna result. New work may
not silently inherit that fallback.

Operationalized:
```
ORCHESTRATION            → GPT Sol xhigh
MECHANICAL / EXTRACTION  → GPT Luna xhigh                  (or an explicitly recorded approved fallback)
CHALLENGE SEATS (D/L/C)  → GPT Luna xhigh
TOUGHEST WORK            → TRI-FOLD:
  worker-S (Sol)    ─┐   independent, blind to each other
  worker-L (Luna)   ─┴─→ arbiter-S (Sol): refutation first → ONE choosy apotheosis
                         (adjudication, design synthesis, wave authoring, parser candidates,
                          convergent-design passes)
```
Every seat still returns a **model receipt** (L-11); the census, not the script, is the proof.

---

## §2 — Work done (the banked corpus; none of it is re-run)

| artifact | content | status |
|---|---|---|
| `registry/ROOT-FINDINGS.md` | **28 findings** MT-F001..MT-F027, each with a repro command, established by the root's own hand | GROWING |
| `registry/DISEASE-REGISTRY.md` | **33 disease rows, all terminal** (18 BUILD · 11 RETIRE · 4 FOLD) + 22 mechanism families, from the **complete 16/16 history audit** of tranches A..V | COMPLETE |
| `registry/DEFECT-LEDGER.md` + `harvest/` | **287 challenger defects** (40 BLOCKER · 134 MAJOR) from 57 harvested seats — *accusations with evidence, NOT adjudicated* | AWAITING JURY |
| V·π receiving audit | 9/9 seats; 6,451-row coverage ledger; 62.1% of the envelope corpus encrypted/unauditable; the U+2028 readline trap | COMPLETE |
| `FORMATION-LAWS.md` | L-1..L-14, each derived from a measured failure in this repo's own history | STABLE |
| Visual corpus | 60-shot route matrix (hash-corrected), 30-row state matrix (harness-corrected), owner-marked OM-1/OM-2, **first real-Safari witness** (`audit/visual/safari-real/`) | GROWING |
| Probes | 15 standalone born-RED gates/hostile probes, incl. `r1-published-totality.mjs` (exit 1 today) | STABLE |
| Coordination | I-17..I-20 rowed; O-7/O-8/O-9 sent (glass · keyframes · atlas); reciprocal hashes verified | CURRENT |

**The headline findings** (full detail in the registry): MT-F024 — the published `4.0.0` parser
throws 324 times across 1,548 degenerate calls, ONE failure mode, one `!` at `grammar.ts:181`, 4 of
9 public entry points; MT-F012 — the gh-pages build ships **no application**, stock-Vite repro
SHA-identical; MT-F023 — the PRM guard is structurally blind to scroll-driven animation (glass's
idiom is correct; ours adopts it); MT-F026/27 — the owner-marked shadow defects, both terminating in
glass tokens; MT-F022/25 — the harness produced four false signals out of four, and every prior
"Safari" frame was Playwright WebKit (**now unblocked**: real Safari 26.4 automatable as of
2026-07-27, first witness committed, `h1:0` re-confirmed in the real browser).

**The history audit's self-verdict, binding on us:** *"Converged on the document axis, still growing
on the execution axis… Not one of the fourteen seats booted the demo."* The execution axis is the
open flank; the seats predicted ≥3 new BLOCKERs there.

---

## §3 — Work remaining, as the tri-fold program (phases; ≤4 workflows at any time)

**Phase A — ADJUDICATION APOTHEOSIS** *(tri-fold by construction; starts now)*
The 287 challenger rows become adjudicated findings. Per component-with-findings: worker-F and
worker-O independently judge the defect set against the tree (verify, refute, re-scope), then
arbiter-F agglomerates into one apotheosis: per-defect verdicts (CONFIRMED / REFUTED / RESCOPED),
the re-authored wave spec, the addendum clause. Output: `registry/adjudicated/<slug>.md`.
Includes folding the new glass mail into the picker context (the §3 prefix trap is a *known,
glass-owned* cause for spectrum-slider visual rows — adjudicators must not re-book it as ours).

**Phase B — COMPLETE THE CHALLENGE COVERAGE** *(Opus challengers; tri-fold juries)*
Areas by remaining seats: palettes (31 components unchallenged), shell (8), workbenches (13),
scenes (2), core (4), picker (2). Resume via cached run IDs where prompts are unchanged; new juries
run under Phase A's tri-fold shape, not the old all-Opus jury.

**Phase C — PARSER + LIBRARY BANDS** *(the M-9 requirement; tri-fold)*
Parser: ground study is banked (3 seats); now candidate-F and candidate-O each author a RUNNING
idiomatic parse-that CSS-colour parser in the prototype workspace; arbiter-F adjudicates against the
totality gate, the CSS L4 corpus, and the bench bar — with incredulity ("LIVE regex measured
FASTEST" is standing evidence, not heresy). Library band: value `src/` module surface, keyframes 61
import sites, fourier-analysis, parse-that API — Opus sweeps, tri-fold synthesis.

**Phase LG — THE LAYOUT GESTALT (M-13, 2026-07-27; tri-fold; RUNNING `wf_73c61fe0-093`)**
Owner charter: mobile takes up the full width and height, bespoke where earned; pathologically wide
screens handled; ONE layout where befitting, optimized variants otherwise; only the most modern
facilities; no contrivance. Baseline = MT-F028 (`audit/probes/layout-utilization.mjs`): mobile shows
~8% of desktop content with height voids; ultrawide coverage 65% @3440 from the `shell.css:69` cap;
three parallel adaptation mechanisms (34 `@media` + `lg:` fork + JS `isMobile` fork) against one
`container-type` feeding 18 `cqi` consumers. Two independent designs (worker-F/worker-O) → arbiter
apotheosis at `registry/adjudicated/layout-gestalt.md`; its wave specs join Phase F with gates keyed
to re-runs of the baseline probe (e.g. coverage ≥90% @3440; every route's purpose exercisable @390).

**Phase D — REAL-SAFARI MATRIX** *(now unblocked; Opus mechanical)*
Re-run the route + state matrices in Safari 26.4 via safaridriver alongside the WebKit cells —
glass's warning is law here: *webkit-engine and safari-app are separate evidence cells; they have
inverted verdicts twice; never infer one from the other.* The dock morph arm (`--dock-expand-t`
driven) is probed explicitly, coordinated with glass's S0.

**Phase E — CONVERGENT DESIGN LOOP** *(tri-fold, ≥3 passes to stability)*
Round-zero portfolio from the adjudicated corpus; each pass: worker-F + worker-O design
independently → arbiter-F agglomerates; repeat until two consecutive passes surface nothing new
(the registry-stability rule applied to design).

**Phase F — WAVE AUTHORING** *(the deliverable; tri-fold at maximum sagacity)*
The mega-tranche itself: every wave in the L-1..L-14 template (born-RED gate with pasted failure,
π/DELTA with committed witnesses, ENV blindness stated, one-wave completability). Inputs consumed
WHOLE: 33 disease rows (already terminal), 28+ root findings, the adjudicated defect corpus, the
CARRY-LEDGER tails, the V·π obligations. Draft-F and counter-draft-O per wave band → arbiter-F
apotheosis. Exit: an inventory of problems **with** the tranche that resolves them; zero re-bookings;
prompt-recap census closed (DR-30).

**Standing throughout:** E13 sweeps at every wave open; harvest after every workflow; STATE.md
updated at every phase boundary; outbound packets at every cross-repo consequence.

---

## §4 — Coordination posture (2026-07-27 sweep, all four paths)

- **glass-ui BJ** (their 07-25 outbound, rowed I-20): Sol/Luna dissolved — the
  `2026-07-21-convergent-hardening` addenda is now **archive, cite it for nothing**; I-17's six
  retirement conditions therefore re-anchor to glass's live `2026-07-24-refinement/AUDIT-PLAN.md`
  (the bank HOLDS; only its authority pointer moved). Their SIGABRT ACK identifies the crash arm
  (`--dock-expand-t` under morph) — explaining our clean rest-state cells. Their §3 discloses the
  **prefix trap live in our tree today**: the spectrum slider range keeps `blur(7px) saturate(1.4)`
  over half its ramp — glass-owned, cured in 8.0.0, **do not patch locally**. 8.0.0 repins will be
  requested with a fresh census; until then no repin, no shim, no copied selector.
- **keyframes V / atlas P**: no reply yet to O-8/O-9 (the parser exposure + the 4.0.1-vs-tuple
  question). The question stands open; nothing is cut without their answer.
- **fourier-analysis**: quiet; its exposure is nil on the direct surface (`/easing` measured 0/172).
- Our three outbound packets stand as sent; the trifold re-formation is internal posture and is not
  re-mailed (E13 covers consequences, not constitutions).

---

## §5 — PHASE X: THE EXCAVATION (M-14, commissioned 2026-07-27 evening; long-horizon, never shelved)

The last ~106 tranches (value 23 · keyframes 22 · fourier 14 · parse-that 4 · glass 43) and 42
top-level session logs (~9GB with agent transcripts; owner-voice extraction only) are PHYSICALLY
unearthed — memory recall is not evidence. Luna banausic seats (owner-message extraction per corpus,
per-tranche truth tables, shadcn/library census, design-canon census, vnext standing, glass-forward
compliance) → Sol AGGREGATED adjudication passes, batched: `EXHORTATION-CENSUS.md` (the
"how many more ecoute-moi's" answer: every repeated exhortation → ENCODED-DURABLY / RE-EXHORT /
ESCALATE-TO-DISEASE), `TRUTH-TABLE.md` (half-baked · silent-drop · rejected · kept registers),
`CONTRIVANCE-REGISTER.md` (addenda + library gestalt; the shadcn-abrogation skeleton),
`DESIGN-CANON-BRIEF.md` (GOLDEN GLASS · BREATH OF LIFE · MOVEMENT OF MOMENTUM; the design-MD
re-authoring verdict). Output feeds Phase E (design tri-folds — Sol+Luna author, frontend-design
plugin, Sol agglomerates) and Phase F (wave authoring consumes the registers WHOLE).
Instrument: `workflows/excavation.js` · run `wf_a6f71311-4e5`.
