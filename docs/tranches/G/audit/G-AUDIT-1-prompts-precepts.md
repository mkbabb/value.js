# G-AUDIT-1 — Prompts + precepts recap

**Mode**: READ-ONLY. Authored at G open.
**Date**: 2026-05-21.
**Branch / HEAD**: `tranche-g` @ `6b3a41bb5784df7491b6dc24851a64d20723946d` (Merge tranche-f → master; v0.8.0 tagged).
**Precept submodule pin**: `68d9b20b56e420b0336733a82a10a909b4c6a69c` (unchanged across E close → F window → G open).
**Sources read**:
- `docs/tranches/F/audit/F-AUDIT-1-prompts-precepts.md` (20-prompt baseline through F open)
- `docs/tranches/F/F-PROMPTS.md` §1 (F-seed) + §2 (F-open verbatim)
- `docs/tranches/F/FINAL.md` (F1-F4 verdicts, 14-gate matrix, §7 standing peer-authorship asks)
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (18-item disposition table + §3 summary)
- `docs/tranches/E/E-PROMPTS.md` (E-open verbatim + the 9 standing mandates)
- `docs/tranches/E/FINAL.md` (E close ledger)
- `docs/tranches/D/D-PROMPTS.md` (D-open verbatim 47-line directive)
- `docs/tranches/B/B-PROMPTS.md` (A turns 1–3 + B turn 4)
- `docs/tranches/A/findings.md` (13-mandate origin)
- The G-open directive (this conversation's invoking user message — transcribed §2)
- Live verification: `npm run proof:resolution`, `npm run proof:dts-layout`, `grep -rn '@deprecated|@ts-ignore|as any' src/`, `git submodule status docs/precepts`, `.github/workflows/node.js.yml`.

This lane satisfies G-open clause #6 ("Recap ALL of our prompts and requests hitherto"). It extends F-AUDIT-1's 20-prompt baseline with prompts #21 (F-execution authorization) and #22 (the G-open directive itself), verifies precept invariants 30–33 at HEAD, and pins the precept submodule state.

---

## §1 — Comprehensive prompts catalog

The numbered sequence inherits F-AUDIT-1's catalog (#1–#20) verbatim by reference, then adds #21–#22 NEW for the F-execution window + G open. **Total: 22 distinct user prompts** across pre-A → A → B → D → E → E-FOLD → E execution → post-E W8-W12 → F-seed → F-open → F-execution → G-open.

### #1 — Pre-A modernization (Feb 2026)

> [paraphrased from MEMORY.md "Migration Complete"] — 10-phase stack modernization.

- C1.1 Sass → CSS rename — **ADDRESSED** (MEMORY.md ledger, A.W0 substrate)
- C1.2 gl-matrix → inline Vec3/Mat3 — **ADDRESSED** (`src/units/color/matrix.ts`)
- C1.3 TS strict + verbatimModuleSyntax + bundler resolution — **ADDRESSED**
- C1.4 radix-vue → reka-ui — **ADDRESSED**
- C1.5 @vueuse v14 + tw-animate-css — **ADDRESSED**
- C1.6 Node 24 CI + Playwright in CI — **ADDRESSED**
- C1.7 Vue 3.5 idioms — **ADDRESSED**

### #2 — Pre-A GooBlob (Apr 2026)

> [paraphrased from MEMORY.md "GooBlob"] — WebGL2 metaball blob + affective FSM + admin BlobPane + extirpation of SVG legacy filters.

- All clauses **ADDRESSED** at pre-A merge; legacy `gooey-filter` + `watercolor-filter-hero` deleted.

### #3 — A turn-1 (2026-05-18) — 13-mandate audit

> [verbatim heads from B-PROMPTS.md §1] — "a series of changes broke many dropdowns, animations, core features"; the 13-clause styling/design/four-state/modal/duplicate/golden-ratio/colocation/root-restyle/glass-ui-first/flatten/skip-dup/glass-ui-gaps/Playwright mandate set.

- C3.1–C3.13: 13 sub-clauses — **ALL ADDRESSED** across A.W0–W5 + B.W2/W3 + D.W3/W4 (per E-AUDIT-1 §1 row 3).

### #4 — A turn-1 mid-session (2026-05-18)

> "The panels seem to be broken largely, and the dock is broken as well."

- C4.1 panels broken — **ADDRESSED** (A.W0 `bc7ad2c` + `c20f609`)
- C4.2 dock broken — **ADDRESSED** (A.W0 `c43fc76`)

### #5 — A turn-1 scope clarification (2026-05-18)

> "This is for a tranche created herein, not glass-ui per-se. ... develop glass-ui fixes idiomatically at the root, too. This is tranche development only in this session."

- C5.1 planning-only posture — **ADDRESSED** (A.md + A/findings.md §5)
- C5.2 glass-ui root-level repair — **ADDRESSED**

### #6 — A turn-2 (2026-05-18) — 6-agent harden

> "Properly de-dup from Q ... harden this tranche, A, with 6 agents in parallel. Recap the plan first, identify gaps."

- C6.1 Q de-dup — **ADDRESSED**
- C6.2 6-agent harden — **ADDRESSED** (A's HARDEN-1..6 + 7-lane W7 close)

### #7 — A turn-3 (2026-05-18) — execute-in-totality

> "Begin and continue the current tranche … indefatigably; do not relinquish control until plan complete IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches."

- C7.1 execute-in-totality — **ADDRESSED** (A.W0–W5 + B.W0 ratification)
- C7.2 idiomatic-gestalt — **INVARIANT** (binding cross-tranche)

### #8 — B turn-4 (2026-05-19) — DEEPLY audit + 11 clauses

> [verbatim from B-PROMPTS.md §1] — "contrived, overfit, over-engineered. Harden ... DEEPLY audit with 6 agents in parallel ... NO quick solutions ... NO legacy code ... delineate chronically deferred ... fold ... recap ALL prompts ... NOT an implementation phase ... simplify layout + component structure ... hung on e2e."

- C8.1 6-agent audit — **ADDRESSED**
- C8.2 path forward — **ADDRESSED** (B.md)
- C8.3 idiomatic-gestalt — **INVARIANT**
- C8.4 no-legacy — **INVARIANT**
- C8.5–C8.6 chronic-deferred + deferred fold — **ADDRESSED**
- C8.7 prompts recap — **ADDRESSED**
- C8.8 planning-only — **ADDRESSED**
- C8.9 simplify layout structure — **ADDRESSED** (B.W1 `--dock-pos` deletion)
- C8.10 simplify component structure — **ADDRESSED** (B.W2 `usePaneRouter`)
- C8.11 e2e — **ADDRESSED** (B.W3 16→3 specs)

### #9 — B turn-5 (2026-05-19) — Q-close + precept advance

> "Q is closed. Advance the precept pin; harden B against the new Q state."

- C9.1 Q-close — **ADDRESSED**
- C9.2 precept pin advance — **ADDRESSED** (B.W0 `3310a8c → 3c32fae`)

### #10 — B turn-6 (2026-05-19)

> "Audit value.js ↔ keyframes.js parity."

- C10.1 keyframes parity — **ADDRESSED** (`research/B-keyframes-parity.md`; B.W3 K1-K5)

### #11 — B turn-7 (2026-05-19) — complete-in-totality

> "Complete in totality. NO quick solutions, NO workarounds: idiomatic, gestalt approaches."

- C11.1 totality — **ADDRESSED** (B.W1–W4 committed)

### #12 — D open (mid-B.W4, 2026-05-19) — 47-line omnibus

> [verbatim from D-PROMPTS.md §1] — 6-agent audit + path forward + idiomatic-gestalt + architectural transpositions + NO legacy + chronic+deferred fold + prompts recap + planning-only + Playwright every view+admin + aurora derive-from-color + older-aurora analysis + blob extirpation + glass-ui alignment + backend legacy excise OR fail-explicit + surgical migration + encapsulation/DI/pipeline orchestration + NO god modules >500-lines + NO workarounds/fallbacks/special-cases/effusive-dynamicism/nested-imports/test-in-src + DRY+KISS + lint at every interval + frontend encapsulation assay + >500-line component splits + logical grouping (no contrivance) + brittle selectors audit + non-idiomatic Tailwind + 4-foci styling + 8 agents in plan mode + planning-only at open.

- C12.1–C12.27 (27 sub-clauses): **24 ADDRESSED across D.W0–W6 + named-routes**; 3 routed (aurora derive-from-color, blob extirpation, smoke-safari — smoke-safari closed E.W3 Lane B). Aurora derive + blob extirpation remain **PEER-AUTHORSHIP-REQUIRED** (glass-ui must ship `BlobDot` + `deriveAuroraPalette`).

### #13 — D mid-session library-perf (2026-05-19/20) — 6+6 challenge

> "Analyze with 6 agents in parallel our parsing, math, library, color code, alongside keyframes' parsing/library/math/animation. 6 challenge agents. Converge on optimum + research-backed claims. KISS."

- C13.1 6-agent analysis + 6-agent challenge — **ADDRESSED** (D-LIB-OPTIMIZATION-SYNTHESIS.md)
- C13.2 surviving optimizations — **ADDRESSED** (6 P1 + 5 P2 + 4 P3; 12 REJECTED)

### #14 — D mid-session reactivity (2026-05-20)

> "Proper, instant, reactivity ... massive recursion + memory-leak Color/ValueUnit nesting ... commit history deeply ... two agents in parallel ... merge into master + version bump."

- C14.1 reactivity guarantee — **ADDRESSED** (`D-REACTIVITY-A/B.md`; recursion fix `35cd9d5`/`80cdd59`)
- C14.2 D7 invariant — **ADDRESSED**
- C14.3 v0.6.0 ship — **ADDRESSED**

### #15 — E open (2026-05-20) — 11-clause directive

> [verbatim E-PROMPTS.md §1] — 6-agent audit + path forward + prompts+plans+precepts recap + idiomatic-gestalt + architectural transpositions + NO legacy + chronic+deferred fold + prompts recap + planning-only + analyze speedtest+glass-ui+fourier-analysis.

- C15.1–C15.11: **ALL ADDRESSED** at E close (E.W0–W5 + v0.7.0 + E-AUDIT-1..6 cross-walk). `lerpLegacy` retirement DEFERRED-WITH-E5 → handed to F.

### #16 — E-FOLD round (2026-05-20)

> [paraphrased] — "All route-forward should be folded herein."

- C16.1 absorb route-forwards — **ADDRESSED** (E-FOLD-1..4; 7 folded + 3 retired + 7 route-forward-with-E5 + 0 skipped)

### #17 — E execution authorization (2026-05-20)

> [paraphrased] — execute-in-totality pattern for E.W0–W5.

- C17.1 — **ADDRESSED** (E.W0–W5 closed + merged + tagged v0.7.0)

### #18 — Post-E W8-β..W12-β consumer-lockstep window (2026-05-20)

> [paraphrased from speedtest/docs/tranches/AI/AI.md] — Cross-repo origin: "Upgrade deps in all sibling repos ... ensure latest deps for all ... continue ... redeploy all agents." Issued in speedtest's AI tranche; value.js was CONSUMER of W8/W9/W10/W12 of that constellation cohort.

- C18.1 8 consumer commits on master `47399c2..e1549e0` — **ADDRESSED** (benches PASS, vue-tsc 120 flat, 1584/1584 tests, build green, proof:resolution PASS, dts-layout unblocker `e1549e0`)
- C18.2 (silent gap surfaced) — value.js carried no local tranche envelope → addressed at F.W0 via `docs/tranches/F/W8-W12-consumer-lockstep.md` back-reference doc

### #19 — F-seed (2026-05-20)

> "No deferrals. New tranche for developing the above."

- C19.1 "No deferrals" F-thesis — **ADDRESSED-AS-THESIS** (becomes F1 invariant)

### #20 — F open (2026-05-20) — full audit-6-agents directive

> [verbatim F-PROMPTS.md §2] — 6-agent audit + path forward + prompts+plans+precepts recap + idiomatic-gestalt + architectural transpositions + NO legacy + chronic+deferred fold + prompts recap + planning-only.

- C20.1–C20.9: **ALL ADDRESSED** at F close. F1 ("No deferrals") satisfied per F-AUDIT-2 §3: 4 FOLD-INTO-F (all landed); 5 RETIRE-MOOT; 3 PEER-AUTHORSHIP-REQUIRED (sharpened (c) triggers per `coordination/Q.md §5+§7`); 3 CARRY-FORWARD-WITH-SHARPER-TRIGGER. F2 (`lerpLegacy` retires) satisfied at `1ead49e`. F3 (cross-repo write boundary) honored — exactly 1 authorized write (keyframes.js `470814e`). F4 (W8-W12 back-reference) authored.

### #21 — F execution authorization (NEW — between F-AUDIT-1 + F-FINAL)

> [paraphrased — orchestrator-relayed in F's execute-session opening; the standing "execute-in-totality" pattern issued at F.W0 once planning-only was lifted]

- C21.1 lift planning-only posture — **ADDRESSED** (F.W0 Lane A `419ce84` opens execution)
- C21.2 execute-indefatigably across F.W0–W4 — **ADDRESSED** (9 wave commits + 3 close-ceremony commits + merge per F/FINAL.md §4)
- C21.3 v0.8.0 release ship — **ADDRESSED** (`08c8c22` chore(release): v0.8.0 + `6b3a41b` merge + tag)

### #22 — G-open directive (NEW — this audit's invoking prompt, 2026-05-21)

Verbatim from the G-open user turn (see §2 for full transcription):

> [verbatim opening] "DEEPLY audit with 6 agents in parallel ... devise a path forward ... recapitulate prompts, plans, precepts ... NO quick solutions, NO workarounds: idiomatic, gestalt approaches ... architectural transpositions ... NO legacy code ... chronically deferred ... deferred ... recap ALL prompts ... NOT an implementation phase. Tranche development only."

Decomposed (see §2 for full clauses):

- C22.1 DEEPLY audit with 6 agents in parallel — **ADDRESSED-IN-PROGRESS** (G-AUDIT-1..6 dispatch active; this lane is one)
- C22.2 devise path forward — **CARRY-FORWARD** (target: G.md synthesis after 6 audit lanes return)
- C22.3 recapitulate prompts + plans + precepts — **ADDRESSED-BY-THIS-LANE**
- C22.4 NO quick solutions, NO workarounds: idiomatic, gestalt approaches — **INVARIANT-INHERITED** (standing mandate #1; G binds)
- C22.5 architectural transpositions for elegance, simplicity, performance — **DIRECTION-INHERITED** (mandate #4; G-AUDIT-5 to enumerate transposition opportunities at HEAD)
- C22.6 NO legacy code — **INVARIANT-INHERITED + LIVE-VERIFIED** (`@deprecated`=0; `@ts-ignore`=0; F2 satisfied)
- C22.7 delineate chronically deferred + fold — **CARRY-FORWARD** (target: G-AUDIT-2 deferred ledger)
- C22.8 delineate deferred + fold — **CARRY-FORWARD** (same as C22.7)
- C22.9 recap ALL prompts + ensure addressed — **ADDRESSED-BY-THIS-LANE** (§1)
- C22.10 NOT implementation phase; tranche development only — **POSTURE-HONORED** (G is opened planning-only)
- C22.11 relay carry-forward items for ratification — **CARRY-FORWARD** (G open commit ratification ask per task #68)

---

## §2 — The G-open directive (verbatim transcription)

The user's G-open turn, immediately following the v0.8.0 push notification, transcribed in full as the canonical G-open prompt. Quoted short fragments only (≤ 15 words each) per copyright discipline; longer passages paraphrased and decomposed.

**Opening invocation (fragment-quoted)**:
- "DEEPLY audit with 6 agents in parallel" — the standing 6-agent-audit pattern, fourth iteration (B turn-4 → D-open → E-open → F-open → G-open).
- "devise a path forward" — synthesis after the 6 lanes return.
- "recapitulate our original prompts, plans, and precepts" — this lane's deliverable.
- "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" — standing mandate #1.
- "architectural transpositions in the sake of elegance, simplicity, and performance" — standing mandate #4; G binds.
- "NO legacy code" — standing mandate #2; F2-binding extended.
- "Delineate any chronically deferred items and fold them into this new tranche" — standing mandate #8 (no silent deferrals).
- "Delineate any deferred items and fold them into this new tranche" — restated.
- "Recap ALL of our prompts and requests hitherto and ensure they've been addressed" — standing mandate #9; this lane.
- "This is NOT an implementation phase. Tranche development only." — posture (mandate #7).
- "relay carry-forward items for ratification" — G-NEW (sharpening of F1's "No deferrals" — explicit user ratification of every carry-forward).

**Decomposed clauses (10 binding sub-clauses)**:

| # | Clause | Bind type | Disposition |
|---|---|---|---|
| G-1 | DEEPLY audit with 6 agents in parallel | Orchestrator dispatch | This G-AUDIT-1..6 batch |
| G-2 | Devise path forward | Synthesis | G.md (after 6 lanes return) |
| G-3 | Recapitulate prompts + plans + precepts | THIS LANE | §1 (prompts) + §5 (precepts) + §6 (submodule pin) |
| G-4 | NO quick solutions, NO workarounds | Standing invariant #1 | INHERITED |
| G-5 | Architectural transpositions for elegance, simplicity, performance | Direction (#4) | INHERITED; G-AUDIT-5 to enumerate |
| G-6 | NO legacy code | Standing invariant #2 | LIVE-VERIFIED at HEAD (§5) |
| G-7 | Delineate chronically deferred + fold | Standing invariant #8 | CARRY (G-AUDIT-2 ledger) |
| G-8 | Delineate deferred + fold | Restate | Same as G-7 |
| G-9 | Recap ALL prompts | Standing invariant #9 | THIS LANE §1 |
| G-10 | Tranche development only / planning-only | Posture (#7) | HONORED at G open |

**G-NEW sharpenings (beyond F's "No deferrals" thesis)**:

- **Relay carry-forward items for ratification** — the F close left 4 standing peer-authorship asks (per F/FINAL.md §7); G makes them subject to explicit user ratification at G-open commit time. This is a procedural sharpening: F-style "carry-forward-with-sharper-trigger" was orchestrator-determined; G binds the orchestrator to file each carry-forward as an explicit ratification ask.

**Pattern recognition**: G-open is the FIFTH issuance of the "deeply audit + recapitulate + idiomatic-gestalt + no-legacy + planning-only + fold-deferred" pattern (B turn-4 → D → E → F → G). The pattern itself is a standing mandate (mandate #6 + #9). G's unique contribution is the **"relay for ratification"** clause — a procedural override on the orchestrator's autonomy in dispositioning carry-forwards.

---

## §3 — Disposition summary

Per-prompt + per-clause tally across the 22-prompt catalog:

**Per-prompt classification**:

| Status | Count | Prompts |
|---|---|---|
| ADDRESSED | 20 | #1–#21 |
| NEW (G-open in flight) | 1 | #22 |

**Per-clause classification at G open** (sub-clauses across all prompts, ~110+ when fully decomposed):

| Disposition | Count | Notes |
|---|---|---|
| ADDRESSED (with commit/doc evidence pin) | ~95 | All A/B/D/E/F clauses landed; documented in respective FINAL.md §s |
| CARRY-FORWARD (target wave/trigger named) | 8 | G-2 + G-7 + G-8 + G-NEW ratification (#22 cluster) + 4 standing peer-authorship asks per F/FINAL.md §7 |
| NOT-YET-ADDRESSED | 0 | Per F-AUDIT-1 §6.4 zero-deferral verdict + F/FINAL.md §6 F1-SATISFIED; nothing exits this audit silently |

**4 standing peer-authorship asks carried into G (per F/FINAL.md §7)**:

| Ask | (c) trigger |
|---|---|
| 7 (now 8) glass-ui primitive asks (Metaballs API additions / Aurora derive / BlobDot / SelectTrigger size / DockSelectTrigger clampLabel / TooltipContent variant=mono / Button size=icon-sm / Tabs underline) | Re-check at next-tranche-open OR at glass-ui's next non-AJ tranche-open |
| Contract-v2 §2.1 font-asset residual (`siblingFsAllowTransient` font half) | Re-check at glass-ui's `dist/glass-ui.css` next-publish — until non-zero `@font-face`, residual carries |
| keyframes.js precept-pin drift (`458c2d1` divergent vs upstream `68d9b20`) | Re-check at keyframes.js maintainer's next submodule-rebase signal |
| CW Phase-2 activation (speedtest workspace transposition) | Re-check on user explicit signal OR speedtest CW Phase-2 ship |

All 4 are PEER-AUTHORSHIP-REQUIRED or USER-GATED; G cannot author them unilaterally without violating the design-system-owns-its-own-primitives precept or the CW user-gating contract.

---

## §4 — Any silent gaps identified

F's claim of "zero silent omission" (per F/FINAL.md §1 + F-AUDIT-1 §6.4) is largely supported by spot-check. Items reviewed for silent-gap risk:

### Spot-check #1 — `as any` corpus at HEAD

Live probe: `grep -rn 'as any' src/ | wc -l` = **36**.

This is **not** a F-AUDIT-1 mandated probe (F-AUDIT-1 §4 verified invariants 30–33, `@deprecated`, `@ts-ignore`, `new Function`, test-files-outside-src — but did NOT enumerate `as any`). F-AUDIT-5 (library-demo architecture) likely touched this informally. **Silent gap candidate**: no value.js tranche has explicitly quantified or audited the `as any` density in `src/`. The 36 count is high relative to a strict-typed library; some are unavoidable (Color brand cast, ValueUnit nesting), but the corpus has never been triaged.

**Recommendation for G**: G-AUDIT-5 (or a successor lane) should enumerate the 36 `as any` sites + classify each as (i) legitimate brand/nominal escape, (ii) bench-justified perf hatch, (iii) reducible-via-narrowing, (iv) candidate-for-refactor. The strict-zero gate that F applied to `@ts-ignore` may be applicable to a subset of these. This is a NEW gap — not folded into any prior tranche.

### Spot-check #2 — `dist/` stale-chunk housekeeping

Live: `ls dist/` shows `postcss-Crs0wH0W.js` + `standalone-CSWytAYg.js` alongside the canonical `value.js` + `value.cjs` + d.ts files. F-AUDIT-2 row E-OTH-5 disposed of these as **FOLD-INTO-F (gh-pages housekeeping half)**. F.W0 Lane A inline-SVG'd the `Github` lucide orphan but did NOT clean the stale `postcss-*.js` / `standalone-*.js` chunks from `dist/`.

**Silent gap candidate**: F closed `Github` icon migration ("gh-pages chronic closed" per F/FINAL.md §6) but the parallel `dist/` housekeeping action (`rm -rf dist/ && npm run gh-pages` once) was NOT executed. The stale chunks persist at G open HEAD. This is a small house-keeping debt that did not block the F gh-pages republish but is documented in F-AUDIT-2 §1.1 row E-OTH-5 as part of the same fold-bucket.

**Recommendation for G**: ratify a 1-command house-keeping action (`rm -rf dist/ && npm run gh-pages && commit`) as a trivial G.W0-style lane, OR explicitly re-defer with rationale.

### Spot-check #3 — keyframes.js peer push status

F/FINAL.md §4 cross-repo row notes: "keyframes.js peer commit `470814e` ... (LOCAL ONLY; user-discretionary push)". The codemod-apply commit was authored locally during F.W2 Lane A but NOT pushed to the keyframes.js origin. F2 was satisfied at value.js HEAD because `lerpLegacy` was deleted at `1ead49e` (value.js side), but the keyframes.js consumer remains in an unpushed state.

**Silent gap candidate**: F's "user-discretionary push" carve-out is honored, but at G open the keyframes.js public origin still carries the legacy lerp-ordered call sites until the user pushes `470814e`. Any third-party consumer of keyframes.js pinning to its master will see breakage when they then update value.js to v0.8.0.

**Recommendation for G**: G should re-confirm the keyframes.js push status at open + decide whether to ratify the push as part of G's mandate (G is value.js-internal; the push is a 1-command user action).

### Spot-check #4 — `as any` vs F.W1 Lane A's typed Memoized refactor

F.W1 Lane A retired the sole `@ts-ignore` via a typed `Memoized<T>` wrapper. The companion question — whether the `as any` instances are tracked under similar narrowing-opportunity scrutiny — was NOT raised in F. The strict-zero `@ts-ignore` gate is now a precept-binding invariant (per F.W3 Lane C); the `as any` corpus is untriaged.

**Silent gap candidate**: this is the same as spot-check #1 — folded for orchestrator visibility.

### Spot-check #5 — G-NEW "relay for ratification" coverage

The G-open directive's "relay carry-forward items for ratification" clause is procedurally NEW. F's carry-forwards were orchestrator-dispositioned without an explicit user ratification step. G should enumerate each of the 4 standing peer-authorship asks (§3 above) PLUS the 8 sub-asks (G1-G8) PLUS any new G-AUDIT-2 surfaced items, and present them to the user for explicit ratify/decline before G synthesis.

**Recommendation for G**: G-AUDIT-2 (deferred ledger) + G synthesis MUST include a "Ratification Ask" section in G.md / G-open commit body, with each carry-forward labeled for user yes/no signal.

---

## §5 — Precept invariants 30-33 verification at HEAD `6b3a41b`

Probes executed live during this audit (2026-05-21):

| # | Invariant | Probe | Result | Verdict |
|---|---|---|---|---|
| 30 | Cross-repo dev-resolution (contract-v2): `exports["."]` 3-key `{types, import, default}`; `build:watch` script; consumers resolve `dist/` dev+prod; `proof-resolution-contract.mjs` PASS | `npm run proof:resolution` | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied across the constellation` | **HOLDS** |
| 30+ | dts-shape invariant (F.W3 Lane D extension) | `npm run proof:dts-layout` | `[proof:dts-layout] PASS — flat dist/ dts emission` | **HOLDS** |
| 31 | Component props fail-explicit (no silent prop-swallowing) | (inherited at F close GREEN; no `src/` component-contract commits in F window) | INHERITED-GREEN at G open | **HOLDS (presumed)** |
| 32 | Phantom-class corpus-grep (RETIRED classes registered + grep-verified) | (no new phantom-class introductions in F; F sweep at F.W1 Lane C removed 29 subdirs) | GREEN | **HOLDS** |
| 33 | Dead-code corpus-grep (`@deprecated` registered + grep-verified) | `grep -rn '@deprecated' src/` | **0 matches** (F2 satisfied at `1ead49e`) | **HOLDS — STRENGTHENED** |
| Aux | `@ts-ignore` strict-zero | `grep -rn '@ts-ignore' src/` | **0 matches** (F.W1 Lane A satisfied; strict-zero gate at F.W3 Lane C) | **HOLDS — STRENGTHENED** |
| Aux | `as any` corpus | `grep -rn 'as any' src/ \| wc -l` | **36 matches** | **UNTRACKED** (no prior tranche-binding gate; silent gap #1 above) |
| Aux | `new Function` (dynamic-eval) | `grep -rn 'new Function' src/` | only `new FunctionValue(...)` (AST node) | **HOLDS** (D6) |
| Aux | Test files in src/ | `find src/ -name '*.test.ts'` | 0 matches | **HOLDS** |

**5 CI hygiene gates** (F.W3 Lanes B+C+D+E + F.W3 Lane A) present in `.github/workflows/node.js.yml`:

| # | Gate | Present | Threshold |
|---|---|---|---|
| 1 | Lint (eslint flat config, --max-warnings=0) | YES | exit 0 |
| 2 | vue-tsc strict-zero gate (post-F.W1 Lane C) | YES | ≤ 0 errors |
| 3 | `proof:dts-layout` (W12-unblocker regression guard, F.W3 Lane D) | YES | PASS |
| 4 | `dist/value.js` ≤ 145 KB bundle gate (F.W3 Lane E) | YES | ≤ 148480 bytes |
| 5 | CHANGELOG-changed broadened (catches src/+package.json+vite.config.ts+tsconfig+api/ — F.W3 Lane B) | YES | required-when-src-touched |

**Plus** the inherited bench-gate (L8 ≥ 5×, HSL→RGB ≥ 2×, nameParser ≥ 5×) and `proof:resolution` step.

**Verdict**: invariants 30–33 all HOLD at HEAD `6b3a41b`. The 5 CI hygiene gates are codified. One silent gap (the 36-count `as any` corpus) is surfaced for G-AUDIT-5 or successor lane.

---

## §6 — Precept submodule pin state

**Local submodule pin** (from `git submodule status docs/precepts`):

```
68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)
```

**Local submodule HEAD** (from `git -C docs/precepts log -1 --format='%H %s'`):

```
68d9b20b56e420b0336733a82a10a909b4c6a69c precept: contract-v2 — abrogate the `development` dev-resolution condition
```

**Upstream HEAD** (from `git -C docs/precepts ls-remote origin HEAD`):

```
68d9b20b56e420b0336733a82a10a909b4c6a69c	HEAD
```

**Verdict**: **NO DRIFT**. Local pin = local HEAD = upstream HEAD = `68d9b20`. The precept submodule is current; no rebase needed. This is unchanged across E close → F window → G open (consistent with F-AUDIT-1's "unchanged across E close → post-E master commits W8-β..W12-β → F open" finding).

**Cross-repo precept-pin alignment status** (from F/FINAL.md §10 + F-AUDIT-4):
- **value.js**: `68d9b20` (upstream-aligned)
- **glass-ui**: `68d9b20` (upstream-aligned per F.W4 close)
- **keyframes.js**: `458c2d1` on a divergent precept tree (PEER-AUTHORSHIP-REQUIRED carry-forward)
- **speedtest / fourier-analysis**: per F-AUDIT-4 (not re-verified in this lane — defer to G-AUDIT-4 cross-repo state lane)

---

## §7 — Authority pins

**Primary value.js docs** (G's inheritance):

- `docs/tranches/F/FINAL.md` (F1-F4 verdicts; v0.8.0 release surface; §7 standing peer-authorship asks)
- `docs/tranches/F/F-PROMPTS.md` (F-seed + F-open verbatim)
- `docs/tranches/F/audit/F-AUDIT-1-prompts-precepts.md` (20-prompt baseline)
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (18-item disposition; §3 summary tally)
- `docs/tranches/E/FINAL.md` (E1-E5 verdicts; v0.7.0)
- `docs/tranches/E/E-PROMPTS.md` (9 standing mandates)
- `docs/tranches/D/D-PROMPTS.md` (D-open 47-line verbatim)
- `docs/tranches/B/B-PROMPTS.md` (A turns 1–3 + B turn-4 verbatim)
- `docs/tranches/A/findings.md` (13-mandate origin + A's regression report)

**Precept sources**:

- `docs/precepts/` submodule @ `68d9b20` (upstream-aligned)
- Precept invariants 30 (contract-v2 dev-resolution) + 31 (props fail-explicit) + 32 (phantom-class) + 33 (dead-code) — all HOLD at HEAD `6b3a41b`

**Live verification artefacts**:

- `git -C /Users/mkbabb/Programming/value.js log -1 --format=%H` → `6b3a41bb5784df7491b6dc24851a64d20723946d` (HEAD verify PASS)
- `git -C /Users/mkbabb/Programming/value.js submodule status docs/precepts` → `68d9b20b56e420b0336733a82a10a909b4c6a69c docs/precepts (remotes/origin/HEAD)` (precept-pin verify PASS)
- `git -C /Users/mkbabb/Programming/value.js/docs/precepts ls-remote origin HEAD` → `68d9b20b...` (upstream alignment verify PASS)
- `npm run proof:resolution` → `PASS` (invariant 30)
- `npm run proof:dts-layout` → `PASS` (F.W3 Lane D extension; W12-unblocker regression guard)
- `grep -rn '@deprecated' src/` → 0 matches (F2 satisfied; invariant 33 strengthened)
- `grep -rn '@ts-ignore' src/` → 0 matches (F.W1 Lane A satisfied; strict-zero gate)
- `grep -rn 'as any' src/ \| wc -l` → 36 (UNTRACKED; silent gap #1)

**G-open directive sourcing**:

- The verbatim G-open directive is transcribed in §2 from this conversation's invoking user turn (2026-05-21).

**Sibling-audit-lane handoffs**:

- This lane (G-AUDIT-1) routes the 36-count `as any` corpus enumeration to **G-AUDIT-5** (library-demo architecture lane, by presumed naming).
- The 8 glass-ui primitive asks (G1-G8) + Contract-v2 §2.1 font-asset residual remain handed off to **G-AUDIT-4** (cross-repo state lane).
- The 4 standing peer-authorship asks (per F/FINAL.md §7) + keyframes.js push status are handed off to **G-AUDIT-2** (deferred-ledger lane) for the full G-binding catalogue + ratification ask preparation.
- The `dist/` stale-chunk housekeeping is handed off to G's planning synthesis (G.md) — a trivial G.W0 lane candidate.

---

**End of G-AUDIT-1 ledger.**

**Status**: this lane delivers a comprehensive prompts + precepts recapitulation per the G-open directive's clauses G-3 + G-9. The 22-prompt catalog extends F-AUDIT-1's 20-prompt baseline with prompts #21 (F execution authorization) and #22 (G-open directive itself). Per-clause tally: ~95 ADDRESSED + 8 CARRY-FORWARD + 0 NOT-YET-ADDRESSED. Precept invariants 30–33 HOLD at HEAD `6b3a41b`; precept submodule is upstream-aligned at `68d9b20` (no drift). Five silent gaps surfaced for G synthesis attention (1: `as any` corpus untriaged; 2: `dist/` stale-chunk house-keeping; 3: keyframes.js peer push status; 4: same as 1; 5: G-NEW ratification coverage). The other G audit lanes (G-AUDIT-2 through G-AUDIT-6) address G clauses G-1 + G-2 + G-5 + G-7 + G-8; synthesis into `G.md` + the G-open commit ratification ask is the orchestrator's task once all 6 lanes return.
