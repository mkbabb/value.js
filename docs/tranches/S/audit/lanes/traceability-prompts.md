# S — prompt-recap traceability matrix (the R campaign, reconstructed)

**Lane**: traceability-prompts · **Mode**: AUDIT ONLY, no product/doc edits outside this file.
**Repo**: value.js @ `102b37b` (branch `tranche-q`, pkg **2.0.1**, tag `v2.0.1-3-g102b37b`).
**Sources**: `docs/tranches/R/{R.md,PROGRESS.md,FINAL.md}`, `audit/{pass1,pass2}/*`,
`audit/RATIFICATION-2026-07-03.md`, `audit/PRECEPTS-{CHECKLIST,COMPLIANCE}.md`,
`audit/DEVELOPMENT-FIDELITY.md`, `audit/coordination/*`, `letters/*.md`, project MEMORY.md,
git log `bdba8fc..102b37b`, and this brief's own S-1..S-24 ledger + the 24 sibling
`docs/tranches/S/audit/lanes/*.md` reports already on disk.

**Method**: every directive clause in the task prompt is decomposed to a row; each row cites
the exact doc/commit that shows it addressed, or states plainly that no corpus artifact
covers it. Verdicts: **ADDRESSED** (landed + evidenced) · **PARTIAL** (landed in part, or
landed-but-booked-forward) · **UNADDRESSED** (no landing, only a plan/book) · **N/A-NO-TRACE**
(directive not independently verifiable from repo artifacts — a live-session fact, not a
tranche-doc fact).

---

## 1 — The original R convergence-loop mandate

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 1.1 | **Scope: the library** | R.W1 shipped 2.0.0: `GAMUT_ALPHA=1.0` (`src/units/color/gamut.ts:242`), KF-1 5-file grammar fix, OKHSL/OKHSV, ΔE-2000/ΔE-ITP, K-DISP decomposition, `/easing` 5-export guard, boundary API + goldens. `PROGRESS.md` 2026-07-03 R.W1-CLOSED entry; independent verifier 12/12 PASS; vitest 1996/1996. Then 2.0.1 (parse-that `^1.0.0` re-pin, `a7eabcc`). | **ADDRESSED** |
| 1.2 | **Scope: picker facilities** | R.W3 "THE INSTRUMENT" (`R.W3.md`, commits `0cbef49..ad1ab93`): font/accent keystone, gamut-truth overlay, ComponentSliders consume, readout rhythm, three-beat motion. `FINAL.md` §1 R.W3 row: taste bar MET, e2e 38/38. **But**: today's S-ledger (S-1..S-3, S-14, S-17, S-19) re-opens picker defects the R.W3 close believed shut (dropdown restyle, slider thumb color, channel rail, counter text, input rounding, header width) — see `design-picker.md`. | **PARTIAL** — R.W3 landed and closed green; the S-ledger shows regressions/misses surfaced only under live user probing after close |
| 1.3 | **Scope: CRUD union w/ fourier** | R.md §5 verdict **LEAVE** (extract rejected, converge already happened, twin-drift is the one live risk). R.W6 closed: 5 inline fixture rows in `api/test/conformance/diff.test.ts` (`7351297`, merge `8a2a617`), isolated-clone proof (14/14 + 224/224 api suite), contract-currency invariant recorded. `FINAL.md` §1 R.W6 row: complete. | **ADDRESSED** |
| 1.4 | **Scope: fourier uplift** | FN-1..FN-7 charter paired-authored into `fourier-analysis/docs/tranches/N/` (fourier commit `cd26c65`, `R.W6.md` item 4). `DEVELOPMENT-FIDELITY.md` §1 confirms FN-1 anchor fixes + the R8-18 named-carry addition. Execution itself is fourier-owned, "realistically post-M" (`COORDINATION-ANALYSIS.md` §2.3) — value.js's uplift obligation was the charter, not fourier's implementation. | **ADDRESSED** (charter delivered; execution correctly fourier-owned, not a value.js miss) |
| 1.5 | **Scope: constellation gestalt** | `audit/coordination/{COORDINATION-ANALYSIS,KF-LATEST,FOURIER-LATEST,PT-SPINE}.md` — full interlock map (17 edges scored: 9 SOUND, 1 SOUND-with-drift, 1 STALE-don't-join, 1 AT-RISK, 5 MISSING), 6 concrete amendments applied pre-W1, sequencing ruling authored. `letters/{KF-VALUEJS-2.0.0,GLASSUI-RELAY,CASCADE-VJS-RESPONSE,FOURIER-NOTE}.md` all dispatched. | **ADDRESSED** |
| 1.6 | **Scope: glass-ui BG/BH alignment** | `letters/GLASSUI-RELAY.md` (9 items, routed BG items 1/4/7/8, BH items 2/3/5/6/9); D8-1 escalated (`1599c230`) and cured same-day by BG (`4b637036`), CURE_OBSERVED. Peer-floor `^1.0.0→^2.0.0` ask authored (still `^1.0.0` at close per re-check — item open on glass-ui's side, correctly booked not gated). `git log` shows R.W7 pinning CI checkouts to `tranche/BG` (`102b37b`). | **PARTIAL** — the relay is dispatched and one item (D8-1) closed in-tranche; GAP-1 (`uSatColor[]`), GAP-2/3 (5.0.0 rename table), GAP-4 (blob perf verify) all remain WAITING on glass-ui's own cut, by design (books never gates) |
| 1.7 | **32-agent audit** | Traces to the **N-open** "32-lane + 5-verification-lane deep audit" (`docs/tranches/N/N.md:12-14`), cited as the standing authority R inherits (`R2-PROMPTS.md` P13). R's own pass-1 ran R1–R8 lane reports feeding `SYNTHESIS.md`; pass-2 ran 8 burn-down lanes; not a literal re-run of 32 agents inside R itself — R correctly treats the N-32-lane audit as already-discharged prior art (`R2-PROMPTS.md` §0/§8), not a thing to re-execute. | **ADDRESSED** (as inherited authority, not literal re-invocation) |
| 1.8 | **No-workarounds** | Verbatim owner ratification: *"fold and use your best judgment given our no workarounds discipline"* (`R.md:28-29`, `audit/RATIFICATION-2026-07-03.md §0`). Concretely enforced: R.W2's D8-1 fix was "no demo-side cure (binding prohibition)" — escalated to the producer instead of shimming (`PROGRESS.md` 2026-07-03 entry); R.W3's Tabs migration went to `reka-ui`-direct rather than a compound-Tabs polyfill. `PRECEPTS-CHECKLIST.md` M18 codifies "no `proof:*` grep-script gates… enforce structurally." | **ADDRESSED** |
| 1.9 | **No-legacy** | hero-lab tree + `vite.config.ts` mode branch + `dev:hero-lab`/`build:hero-lab` scripts deleted (`9ed9175`, Q1 FLIP) rather than left dead; EasingSelector fork deleted onto `<EasingPicker>` (`9754cc4`); spectrum-slider fork deleted onto `variant="spectrum"` (`c98480a`); Tabs compound fork deleted (`6ed3677`). `SYNTHESIS.md §2.4` explicitly rejects "shipping any `[data-*]` glass-ui interim… manufacturing legacy." | **ADDRESSED** — for the R-scope surfaces. **Caveat**: sibling S lanes (`legacy-sweep-demo-components.md`, `legacy-sweep-src.md`) found fresh legacy/fallback/god-module residue post-R that R's own close gates did not (and structurally could not) catch — see §5 below |
| 1.10 | **Fold ALL deferred** | R.md §10 zero-drop fold ledger (every N-era item → exactly one wave, BOOK, or PRUNE/OBSOLETE disposition); `FINAL.md` §2 reconciles every row. `DEVELOPMENT-FIDELITY.md` §1 traced the fold-ledger and found ONE missing transcription (R8-18 fourier-owned carry), fixed in place. | **ADDRESSED** |
| 1.11 | **Tranche-dev-only** | `R.md:4` "Mode: tranche development only. Nothing here modifies source"; `PRECEPTS-CHECKLIST.md` binds this as a standing form rule; the pass-1/pass-2/ratification corpus is entirely docs until the 2026-07-03 dispatch gate closes. | **ADDRESSED** |
| 1.12 | **Fable-for-design** | R.W3/R.W4 both dispatched as Fable design lanes (`R2-PROMPTS.md` §6 "Fable for design… R design work → Fable"); `FINAL.md` cites "Fable lanes A–F" for W4, "Fable + frontend-design" for W3. | **ADDRESSED** |
| 1.13 | **Batches-of-3** | Read as the **3-pass convergence loop** the charter itself names its provenance mechanism: pass 1 (87.8/84) → pass 2 (93.2/88) → pass 3 (100/100, CONVERGED) — `R.md` Provenance table, `PASS3-VERDICT.md`. (If instead meant as "dispatch S audit lanes in batches of 3" — that is this session's own orchestration pattern, not a fact recorded in the R corpus; no R-doc evidence for that reading.) | **ADDRESSED** (3-pass reading) / **N/A-NO-TRACE** (batch-dispatch reading) |

---

## 2 — The ratification

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 2.1 | Verbatim intent: *"hero lab is to be deleted."* | Q1 FLIPPED: `waves/R.W5.md` deleted, `docs/frontend-design/hero-lab.md` deleted (was untracked), app artifacts (`demo/hero-lab/` tree, vite mode branch, `dev:hero-lab`/`build:hero-lab` scripts) deleted at R.W2 (`9ed9175`). `RATIFICATION-2026-07-03.md` §2(b)/(c) certify zero live hero-lab surface; grep-verified live at `e80b359`. | **ADDRESSED** |
| 2.2 | *"no ncsu alias."* | Q2 FLIPPED: X2 became R.W7 in-wave, maintainer-on-host. `FINAL.md` §7 recorded the alias as still-live at close-synthesis time (PENDING, maintainer op); post-close git log does not show a subsequent alias-retirement commit in the range inspected. | **PARTIAL** — ratified + in-gate, but the alias-retirement is a maintainer on-host op outside git history; not independently confirmable as fired from repo artifacts alone |
| 2.3 | *"for all other items, fold and use your best judgment given our no workarounds discipline."* | Six rows ratified as speced (Q4 file:-deps, Q7 `GAMUT_ALPHA=1.0`, Q8 hard-ask, Q10 Parse-Lab fused, Q11 display-p3 lens, Q12 both easing riders) — `R.md §12`, certified corpus-wide by `RATIFICATION-2026-07-03.md`. | **ADDRESSED** |

---

## 3 — Precepts-pursuance

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 3.1 | Wave-spec form compliance (24 MUST rows + 5 STYLE rows) | `PRECEPTS-CHECKLIST.md` enumerates the full 24+5 row set; `PRECEPTS-COMPLIANCE.md` MUST-row × file matrix — **all PASS**, diff-sensed against ratification commit `8169956` (+390/−50, FORM only, zero ratified-substance touched). | **ADDRESSED** |
| 3.2 | No-god-modules / DRY / demo ≤400 LoC | R.W4 gate-(c): `9675ef3` decomposed `App.vue` atmosphere region → `useAtmosphere`; `ColorInput` Parse-Lab echo → `ParseEchoReadout` to hold the cap. `FINAL.md` §1 R.W4: "demo/ ≤400 LoC over-cap 0." **But** `god-module-dry-census.md` (this S fleet) found fresh over-cap files post-R-close — the R-scope cap held at R's own close, new work since has drifted. | **PARTIAL** — held at R-close; not durable across the gap to S |
| 3.3 | No test files in src / no `proof:*` grep gates | `PRECEPTS-CHECKLIST.md` M18: "value.js retired the grep-based `proof:*` invariant scripts… R wave gates enforce invariants structurally." CLAUDE.md's own `## Test + verify` note confirms the retirement stands. | **ADDRESSED** |
| 3.4 | Fail-explicit, no silent handling | R.W2's K-DISP/BlobPane type-root cure (31 `TS2322`→0, `648843b..46ad669`); the D8-1 no-consumer-workaround prohibition held (escalate, don't shim). `M6` in `PRECEPTS-CHECKLIST.md` explicitly bans "a silent `console.warn`+return in a library-owned failure mode." | **ADDRESSED** for R's own surfaces. `legacy-sweep-src.md` (this fleet) flags the `srgbToLinear` decode-threshold defect as a genuine silent-wrong-answer bug still open (booked, not silent-swallowed — see §5) | **PARTIAL** overall (booked-not-silent, but not yet fixed) |
| 3.5 | ι integrity sweep + π visual-runtime lane binding | `FINAL.md` §3 ι CLEAN (one bisect incident, fully reverted, recorded); §4 π CLEAN (both R.W3/R.W4 paired baseline/close archives, zero unresolved deltas). | **ADDRESSED** |
| 3.6 | Zero-deferral close; named successor exact | `FINAL.md` §5 "Open BOOKS at close" — every deferral names an exact trigger (glass-ui 5.0.0 cut, kf S.H4, vue-router 5 stable, etc.), never "a future tranche." `M11` compliance confirmed in `PRECEPTS-COMPLIANCE.md`. | **ADDRESSED** |

---

## 4 — kf/fourier coordination

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 4.1 | kf KF-1 re-pin letter dispatched inside 2.0.0 | `letters/KF-VALUEJS-2.0.0.md` dispatched 2026-07-03, landed at kf `9a0f6cb` (`docs/tranches/S/KF-VALUEJS-2.0.0.md`). | **ADDRESSED** |
| 4.2 | fourier peer-floor note dispatched | `letters/FOURIER-NOTE.md`, landed at fourier `cd26c65` (`docs/tranches/N/VALUEJS-2.0.0-NOTE.md`); amendment items 1–3 from `COORDINATION-ANALYSIS.md §3.2` (trigger S.H2→S.H4 retarget, `color2Into`-currency book, third letter) all applied before dispatch. | **ADDRESSED** |
| 4.3 | The kf-owned `^1.0.0` re-pin book fires | Fired: kf's S.H4 published parse-that 1.0.0; kf executed the booked re-pin AS 2.0.1 under its own publish authorization, hand-back letter `letters/KF-EXECUTED-THE-REPIN-2.0.1.md`; git `a7eabcc` "2.0.1: the booked parse-that ^1.0.0 re-pin"; widened verify green (58 files/1998 tests, tsc, build, css-parity, `color2Into` currency). | **ADDRESSED** |
| 4.4 | FN-5-before-M.W10 sequencing rider | `COORDINATION-ANALYSIS.md` §3.2 item 5 authored; delivered into the fourier charter at R.W6 (fourier `cd26c65`). | **ADDRESSED** |
| 4.5 | cascade-vjs hygiene ask response | `letters/CASCADE-VJS-RESPONSE.md`: item 1 (unplugin-vue-markdown bump) ACCEPTED+re-verified; item 2 (`file:`→published re-pin) DECLINED citing Q4; item 3 (lockfile regen) ACCEPTED+EXECUTED (`858c844`). | **ADDRESSED** |
| 4.6 | parse-that S.H3 Pratt consume-edge | Booked, correctly dormant — `parse-that-audit.md` (this fleet) confirms parse-that is at 1.0.0 with the Pratt sketch still not presented; the book has not fired and the S corpus does not claim it has. | **UNADDRESSED (correctly, per design — book has not fired)** |
| 4.7 | glass-ui 5.0.0 adopt-event book | Not fired: glass-ui is still pre-5.0.0 (`glassui-bg-bh-assay.md`: sibling at 4.2.0 on branch `tranche/BG`, cutting jointly with BH). `App.vue:115` still imports `/goo-blob`; `uSatColor[]` still absent from dist. | **UNADDRESSED (booked, awaiting the sibling's own cut — this is the live open edge into S)** |

---

## 5 — The compaction + kf-statement order

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 5.1 | The kf-statement (KF-VALUEJS-2.0.0 letter) authored and dispatched at the correct point in the 2.0.0 cut | `PROGRESS.md` 2026-07-03 "R.W1 CLOSED" entry lists the letter dispatch inside the same close as the 2.0.0 publish; `DEVELOPMENT-FIDELITY.md` §1 traced its §1-§5 content verbatim-faithful against the live `resolve-function.ts` deletion map. | **ADDRESSED** |
| 5.2 | A mid-session context-compaction event and any ordering constraint it imposed on when the kf-statement fired | No `docs/tranches/R/**` artifact records a compaction event by name (grepped: zero hits for "compaction"/"compact" across the R corpus). This is a live-session execution fact (conversation/context management), not a tranche-doc fact — the tranche corpus is silent on it by construction (it records WHAT shipped, not the session mechanics of drafting it). | **N/A-NO-TRACE** — cannot be confirmed or denied from repository artifacts; would require the live session transcript, which this audit does not have access to |

---

## 6 — The R execution order (adhere exactly; orchestrate; indefatigable; publish/push/deploy authorized)

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 6.1 | Adhere to the ratified spec exactly | `DEVELOPMENT-FIDELITY.md` (pre-execution) certified the corpus RATIFICATION-READY, zero-drop, gate-faithful, anchor-true; `PRECEPTS-COMPLIANCE.md` (post) certified zero ratified-substance was touched by any FORM fix. Every wave's `FINAL.md` row cites its exact gate evidence against the charter's own gate text. | **ADDRESSED** |
| 6.2 | Orchestrate (dispatch fleets, not solo-author) | `FINAL.md` cites named lanes throughout ("Fable lanes A–F", "triumvirate adjudications", "the completion lane re-dispatched"); `PROGRESS.md` names per-wave agent rosters. | **ADDRESSED** |
| 6.3 | Indefatigable (push through interruptions to close) | R.W2's lane died mid-flight on a rate limit (§7 below) and was recovered via a re-dispatched completion lane rather than abandoned; R.W3 hit a close-blocking dev-only Vue Transition defect and was root-cured (`fceed47`) rather than shipped broken; gate-(f) provenance defect was repaired on the record (`ad1ab93`) rather than papered over. All seven waves (W0–W4, W6, W7; W5 killed by owner order) closed. | **ADDRESSED** |
| 6.4 | Publish authorized | 2.0.0 published (`96f124d`/`v2.0.0`, merge `20bbc8d`) and 2.0.1 (`a7eabcc`/`v2.0.1`) — `npm view @mkbabb/value.js version` confirmed `2.0.0` at R.W1 close (`FINAL.md §6`); tag `v2.0.1-3-g102b37b` confirms the 2.0.1 cut is live in the current tree. | **ADDRESSED** |
| 6.5 | Push authorized | `git log bdba8fc..102b37b` shows the full R.W7 close ceremony committed and the merge to master (`bdba8fc "merge(R · close)"`) landed; `FINAL.md §11` records master-merge + tag as the orchestrator's own close ceremony fields. | **ADDRESSED** |
| 6.6 | Deploy authorized | `FINAL.md §7` X1 (prod deploy)/X3 (first CF-Pages wire run) recorded PENDING-ON-MERGE at close-synthesis time, with the exact post-deploy probes named (`/health` lineage stamp, `/diff` envelope, run id/URL). `102b37b`'s own commit message ("X3 first-wire… CI never-green root" / "un-pin booked at the 5.0.0 master landing") shows the wire-run was actively worked post-FINAL.md, with the nested-workspace sibling-checkout CI problem still being solved at the tip commit. | **PARTIAL** — deploy work is in flight at HEAD, not confirmed fully green; `api-broken-rootcause.md` (this fleet) independently found the **dev-server-side** palette API broken by CORS (S-11), a live, currently-unresolved instance of exactly the class X1 was meant to retire |

---

## 7 — The rate-limit redeploy orders

| # | Directive clause | Evidence-of-address | Verdict |
|---|---|---|---|
| 7.1 | R.W2 Lane B died on a server rate limit mid-flight | `PROGRESS.md` 2026-07-03: "W2-B (P0 rows) died on a server rate limit with most row work uncommitted in-tree; completion lane re-dispatched." | **ADDRESSED** (recorded honestly, not hidden) |
| 7.2 | The recovery/redeploy order: recover the work-order from the lane journal, re-dispatch a completion lane, row-scope commits | `FINAL.md §10` lesson 10 states the pattern explicitly: "recover the work-order from the lane journal, re-dispatch a completion lane against the in-tree residue, row-scope the commits (`648843b..46ad669`) so each row lands attributable… the standing pattern (first proven at tranche L)." | **ADDRESSED** |
| 7.3 | A second D8-1 recurrence during the same interruption window, escalated rather than worked around | `PROGRESS.md`: the glass-ui 15:10 rebuild re-emitted the unlayered import at a NEW site mid-R.W2; escalated (`1599c230`), cured same-day by BG (`4b637036`), CURE_OBSERVED, book retired. | **ADDRESSED** |

---

## 8 — TODAY's refinement mandate (read the S-lane siblings + this brief's S-ledger)

The corpus already contains 24 independent audit lanes (`docs/tranches/S/audit/lanes/*.md`,
authored earlier in this same fleet) that ground the S-1..S-24 ledger against the live tree.
This lane's job is traceability, not re-litigation of their findings — the table below is a
routing index into them, confirming the mandate's own instruction ("read the siblings") was, in
fact, honorable in this fleet, and none of the S-ledger rows are orphaned.

| S | Owning sibling lane(s) | Root-routing verdict (as found by the owning lane) |
|---|---|---|
| S-1 | `design-picker.md`, `design-docs-about.md` | demo (both dropdowns share one root component; About's face mismatch is a demo consumer bug, not a glass-ui defect) |
| S-2 / S-16 | `design-picker.md` | glass-ui producer (slider thumb + hover states are `ComponentSliders`/glass-ui Slider primitive) |
| S-3 | `design-picker.md` | demo + glass-ui (rail restyle as a carousel/dock-rail variant) |
| S-4 | `blob-greenfield-tech.md` | glass-ui producer half (GAP-1 `uSatColor[]`, blob rebuild) + demo consumer half (`App.vue:115` placement) |
| S-5 | `design-dock-shell.md` | demo (`@MBABB`→`@mbabb` is a literal string in a demo view) |
| S-6 | `design-gradient.md` | demo (netting/hatch expansion consumes the existing `spectrumLuma.ts` shared helper) |
| S-7 | `design-dock-shell.md`, `design-gradient.md` | glass-ui producer (pill/SelectTrigger clipping) |
| S-8 | `design-dock-shell.md` | demo (collapsed-dock composition: WatercolorDot + icon, no text) |
| S-9 / S-23 | `perf-transitions.md`, `perf-general.md` | mixed: demo consumer (transition families) + glass-ui producer (primitive cost) |
| S-10 | `design-browse-palettes.md` | demo (skeleton/shimmer sequencing + shadow variants) |
| S-11 | `api-broken-rootcause.md` | api/demo boundary (CORS root cause, not the palette API logic itself) |
| S-12 | `design-*` lanes generally (hierarchy/superfluity sweep) | demo (copy/hierarchy cleanup, per-page) |
| S-13 | `design-gradient.md` | demo + keyframes.js (easing pane functional consume) |
| S-14 | `design-picker.md` | demo (counter text removal) |
| S-15 | `aliasing-dithering.md` | mixed: demo (border-radius/compositing) + glass-ui producer (shared primitives) |
| S-17 | `design-browse-palettes.md`, `design-picker.md` | glass-ui producer (Input rounding at the root) |
| S-18 | `aurora-derive-audit.md` | demo (the aurora-consume wiring; lane found the three literal S-18 claims FALSE-as-stated with wiring intact — a taste/weakness finding, not a broken-wiring one) |
| S-19 | `design-picker.md` | demo (readout layout width) |
| S-20 | `design-extract-mix-generate.md`, `design-browse-palettes.md` | demo (cartoon-card consistency) |
| S-21 | cross-cutting (all design lanes) | precept, not a finding — the root-routing discipline itself |
| S-22 | `safari-truth.md` | mixed, per-finding (WebKit-specific engine gaps vs demo consumer bugs) |
| S-23 | `perf-general.md` | mixed: demo + glass-ui |
| S-24 | `lib-color-audit.md`, `lib-core-value-audit.md`, `lib-parsing-audit.md`, `parse-that-audit.md` | src (library correctness: `srgbToLinear` threshold defect, DRY/dup findings) + parse-that (sibling, read-only) |

**Verdict on the mandate itself: ADDRESSED.** The fleet dispatched the 24 sibling lanes this
brief instructs to read, each grounded in live probes against `localhost:9000` and file:line
citations; this lane's contribution is the connective trace back to R, not a duplicate
investigation.

---

## 9 — Cross-cutting UNADDRESSED / PARTIAL rows — the S-tranche seeds

Collected from the tables above; each is a candidate wave-item for S, not a re-litigation:

1. **Picker regressions post-R.W3-close** (§1.2; S-1/S-2/S-3/S-14/S-17/S-19) — root: demo +
   glass-ui producer. R.W3 closed green against its OWN π baseline/close pair; the S-ledger is
   evidence that the treatment's gate (screenshot-corroborated taste bar) did not anticipate
   these specific regressions — a scope gap in the R.W3 gate's coverage, not a broken gate.
2. **glass-ui 5.0.0 adopt-event book, still WAITING** (§4.7) — root: glass-ui producer. `uSatColor[]`
   (GAP-1), the `/goo-blob`→`/blob` rename (GAP-2), the by-name subpath table (GAP-3), blob perf
   verify (GAP-4) all sit on the sibling's own cadence; S's `glassui-bg-bh-assay.md` lane already
   maps the current state of that cut.
3. **NCSU-alias retirement (§2.2) and the deploy/wire chain (§6.6)** — root: maintainer-on-host +
   api/demo boundary. Neither is independently confirmable green from repo artifacts alone; S-11
   (`api-broken-rootcause.md`) found a live, currently-broken instance (CORS) of the class this
   was meant to retire.
4. **Fresh legacy/god-module residue since R-close** (§3.2/§1.9) — root: demo + src. R's own
   close gates (ι, π, lint, typecheck) verified the R-scope surfaces at R-close; the sibling
   `god-module-dry-census.md` and `legacy-sweep-{demo-components,src}.md` lanes found new
   over-cap files and a real numerical library defect (`srgbToLinear`) that postdate or fall
   outside R's own gate scope — evidence that "wave closes green" does not imply "the repo stays
   green," and a standing S invariant (a repo-wide sweep, not just the touched surfaces) is owed.
5. **The compaction/kf-statement ordering (§5.2)** — no corpus trace either way; if this
   ordering matters to the S ratification, it needs to be re-stated by the orchestrator from the
   live session record, not inferred from tranche docs.
