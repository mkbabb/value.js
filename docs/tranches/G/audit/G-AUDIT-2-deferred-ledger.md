# G-AUDIT-2 — Deferred-items ledger at G open

**Mode**: READ-ONLY. Authored at G open.
**Date**: 2026-05-21.
**Branch / HEAD**: `tranche-g` @ `6b3a41b` (`Merge tranche-f into master — Tranche F close (v0.8.0)`).
**Predecessor**: F closed at `6b3a41b` / tagged `v0.8.0` (`58acb0c` FINAL.md + close-ceremony commits + merge).
**Substrate window audited**: F-window (`47399c2..6b3a41b` — F open `188bd6b` to F merge `6b3a41b`) + F-G boundary (any drift between F close and G open — verified ZERO commits).

**Binding invariant (G-opening directive, strict reading)**: *"Delineate any chronically deferred items and fold them into this new tranche. Delineate any deferred items and fold them into this new tranche."* — TWO clauses; G honors both separately (§3 chronic-deferred bucket; §2+§4 currently-deferred bucket). Per F1 inheritance: every entry MUST carry an explicit G-disposition AND a TIME-BOUND or EVENT-BOUND (c) trigger — zero vague "later".

---

## §1 — Method

### §1.1 — Sources read (READ-ONLY)

**Canonical post-F state sources**:
- `docs/tranches/F/coordination/Q.md` (150 LoC) — §5 aggregate ledger (15 rows) + §6 health summary + §7 F close summary + standing peer-authorship asks.
- `docs/tranches/F/FINAL.md` (207 LoC) — §3 invariant inheritance + §6 v0.8.0 release surface (DEFERRED → ZERO claim) + §7 standing peer-authorship asks + §10 constellation health at F close + §12 successor candidates.
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (249 LoC) — F's open-time deferred audit (18-item ledger; 4 FOLD / 5 RETIRE / 3 PEER / 3 CARRY + 2 F-NEW).
- `docs/tranches/F/audit/F.W4-lane-1-plan-vs-actual.md` — plan-vs-actual + the F.W3 Lane F **DEFERRED-PER-SPEC** verdict (proof:resolution types-key probe).
- `docs/tranches/F/audit/F.W4-lane-3-doc-drift.md` — newly-surfaced api/CLAUDE.md tree-drift item flagged "future tranche".
- `docs/tranches/F/audit/F.W4-lane-4-idiomatic-gestalt.md` — F1/F2/F3/F4 verdicts + 15-row ledger PASS.
- `docs/tranches/F/audit/F.W4-lane-7-integrity-sweep.md` — integrity sweep + chronic dirty-tree restatement.

**Predecessor sources (inheritance trace)**:
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` (the 38-item precedent — A-CHRONIC + B-CHRONIC + D-CHRONIC buckets).
- `docs/tranches/E/coordination/Q.md` (the 10-row §3 gap list + §4 CW + §5 keyframes.js).
- `docs/tranches/E/FINAL.md` — §6 4-row standing route-forward + §3 closing bullets.
- `docs/tranches/D/coordination/Q.md` — D's §3 9-row gap list (the original glass-ui asks surface).
- `docs/tranches/D/FINAL.md` — Da §3 30-item chronic-deferred ledger reference.

### §1.2 — Live peer-repo state verification at G open

- **glass-ui**: HEAD `e150e2f` — **ZERO drift** since F-close pin (`coordination/Q.md §1` Q-pin verified). The F.W4-pinned snapshot is the G-open snapshot. None of the 8 primitive asks shipped; contraction posture intact. Glass-ui tranche-list (`/Users/mkbabb/Programming/glass-ui/docs/tranches/`) shows `AB / AB+1 / AB+2 / C / D / D-II / E / F / H / I / J / K / L / M / N / O / P / Q / V` — **no new AJ-or-later tranche open in the F-G window** (the F-window AJ activity already closed inside F's view).
- **keyframes.js**: HEAD `470814e` (lerp codemod commit landed at F.W2 Lane A; **LOCAL ONLY**, unpushed). Submodule `docs/precepts` still `458c2d1` — divergent vs upstream `68d9b20`. Precept-pin drift UNCHANGED.
- **speedtest**: HEAD `c73a8d92` (was `5e52d136` at F close — +1 commit `docs(AK/W0): 7-lane audit cohort closes + A7 synthesis composes wave plan + 14 G-AK-D ratification gates`). **Speedtest AK tranche is now W0-open** (post-AI/AJ closed). CW Phase-2 still planning-only; user-gate signal NOT yet observed.
- **fourier-analysis**: HEAD `926ca6a` — **ZERO drift** since D close. 109-file dirty tree exact match. Phase-0 chronic intact.
- **precepts upstream**: `68d9b20` — UNCHANGED through F window and F-G boundary.

### §1.3 — Live in-tree deferral-marker scan at G open

- `grep -rn '@deprecated\|@ts-ignore' src/` → **0 hits**. F2 invariant + F.W1 Lane A still satisfied.
- `grep -rn 'TODO\|XXX\|FIXME' src/` → **0 hits**.
- `grep -rn 'TODO\|XXX\|FIXME' demo/@/` → **1 hit**: `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16` — `<!-- TODO(glass-ui): migrate to Button size="icon-sm" once shipped (Ad-5) -->`. Confirms the A-07 (Button icon-sm) chronic still has a live consumer-side anchor.

### §1.4 — Decomposition (per G-opening 2-clause directive)

The G-opening directive separates "chronically deferred items" from "deferred items." This ledger honors that decomposition:

- **§2** — Inherited ledger from F close (the 4 PEER-AUTH carries + the F.W3 Lane F deferred-per-spec + the CARRY-FORWARD-WITH-SHARPER-TRIGGER carries). **Currently-deferred bucket.**
- **§3** — Chronic-deferred items (carry-through 3+ tranches without resolution). **Chronically-deferred bucket.**
- **§4** — Newly-surfaced post-F items. **Currently-deferred bucket.**
- **§5** — Per-item G-disposition (the FOLD / RETIRE / PEER / CARRY classifier).
- **§6** — Disposition tally.
- **§7** — Per-F1 "No deferrals" sharpening — items lacking a TIME-BOUND trigger.

---

## §2 — Inherited ledger from F close

Per `F/coordination/Q.md §7` + `F/FINAL.md §7` + `F.W4-lane-1` Lane F deferred-per-spec finding. **5 items** carried forward from F close.

| # | Item | Origin tranche | Tranche-count at G open | F-close (c) trigger | Current state (verified at G open) |
|---|---|---|---|---|---|
| **F→G-1** | 7 glass-ui primitive asks (Metaballs API additions G1; Aurora derive G2; BlobDot G3; SelectTrigger size G4; DockSelectTrigger clampLabel G5; TooltipContent variant="mono" G6; Button size="icon-sm" G7; Tabs variant="underline" G8) | A.W6 (Ae-10..13 + Ad-5..18 + Ab-10) | **5** (A→B→D→E→F→G) | Re-check at next-tranche-open OR at glass-ui's next non-AJ tranche-open (whichever first) | Glass-ui HEAD `e150e2f` UNCHANGED since F close. ZERO drift in F-G window. NONE of the 8 primitives shipped. Contraction posture (DockGroup + ProgressiveSidebar archived) intact. Tranche-list shows no new post-AJ open. **(c) trigger has NOT fired** — but "next-tranche-open" half just fired (G open). |
| **F→G-2** | Contract-v2 §2.1 font-asset residual (glass-ui `dist/glass-ui.css` font-inlining) | E.W0 Lane A NARROWED | **4** (D→E→F→G; the original D-open Contract-v2 §2.1 keystone gap) | Re-check at glass-ui's `dist/glass-ui.css` next-publish; currently 0 @font-face. Until non-zero, residual carries + value.js cannot yet retire `siblingFsAllowTransient` | Glass-ui ZERO drift → `dist/glass-ui.css` UNCHANGED → still 0 @font-face. `siblingFsAllowTransient` still live in value.js `vite.config.ts`. **(c) trigger has NOT fired.** |
| **F→G-3** | keyframes.js precept-pin drift (divergent `458c2d1` vs upstream `68d9b20`) | E.W4 Lane F + E-AUDIT-4 §5 | **3** (E→F→G) | Re-check at keyframes.js maintainer's next submodule-rebase signal | `git -C keyframes.js submodule status docs/precepts` → `458c2d1` (UNCHANGED). The F.W2 cross-repo write at peer `470814e` did NOT touch the submodule (mechanical lerp call-site migration only — codemod scope). **(c) trigger has NOT fired.** |
| **F→G-4** | CW Phase-2 activation (speedtest monorepo workspace transposition) | D coord/Q.md §4 → E.W4 Lane D | **3** (D→E→F→G) | Re-check on user explicit signal OR speedtest CW Phase-2 ship | Speedtest +1 commit (`c73a8d92` — AK W0 audit cohort). **AK tranche now W0-open** — but per its commit subject (`14 G-AK-D ratification gates`) this is still planning-only + tranche-AK is auditing, not shipping CW Phase-2. **(c) trigger has NOT fired**; the AK opening is a soft signal that the CW pipeline is still active. |
| **F→G-5** | proof:resolution `types`-key probe (F-NEW-2; F.W3 Lane F **DEFERRED-PER-SPEC**) | F-AUDIT-2 §2.2 (F-NEW-2 introduction) | **2** (F→G) | F.W3 close — DEFERRED per the OPTIONAL framing of the wave spec ("If F.W3 is on a tight critical path, defer this lane to F.W4 close-prep OR a successor tranche") | Verified at `F.W4-lane-1-plan-vs-actual.md` line 132: "Lane F NOT executed; this is per-spec, not silent drift. **DEFERRED-PER-SPEC**." `scripts/proof-resolution-contract.mjs` still lacks a `types`-key probe step. **(c) trigger fires NOW** (G open is the named "successor tranche"). |

**Note on F→G-5**: This item is technically carried by F close into G — it is named in `F.W4-lane-1` as the Lane F deferral. Q.md §7 / FINAL.md §7 omit it from the standing-asks table because it is a value.js-side TODO, not a peer-authorship ask. G-AUDIT-2 surfaces it explicitly per the F1-binding "zero silent omission" reading.

---

## §3 — Chronic-deferred items (3+ tranche carry-through)

Per `E-AUDIT-2-deferred-ledger.md §3` A-CHRONIC bucket pattern (items first deferred in A that survived B + D), extended to F→G boundary.

| # | Item | First-deferred | Tranche-count | Systemic cause | Carry-through trace |
|---|---|---|---|---|---|
| **CH-1** | Metaballs API additions (G1 — `positionSource` + pointer input + per-blob opacity + HSV perturbation + WebGL context-loss recovery + `MetaballCanvas mode="layout"` + `pauseOnHidden`) | A `research/Ae` Ae-10 | **5-tranche** (A→B→D→E→F→G) | glass-ui-blocked: writer is glass-ui repo | A-01 → B `coord/Q.md §3` → D `coord/Q.md §3` → E `coord/Q.md §3` → F `coord/Q.md §2` → G F→G-1 |
| **CH-2** | Aurora `deriveAuroraPalette` + `deriveAuroraConfig` (G2) | A `research/Ae` Ae-11 | **5-tranche** (A→B→D→E→F→G) | glass-ui-blocked + precept-§10 (wire-before-retire) | A-02 → same trace as CH-1 |
| **CH-3** | `BlobDot` organic-dot primitive (G3) | A `research/Ae` Ae-13 | **5-tranche** | glass-ui-blocked (16 `WatercolorDot` instance sites still in demo) | A-03 → same trace |
| **CH-4** | `SelectTrigger size` prop (G4) | A `research/Ad` Ad-16 | **5-tranche** | glass-ui-blocked | A-04 → same trace |
| **CH-5** | `DockSelectTrigger`/`SelectTrigger clampLabel` (G5) | A `research/Ad` Ad-18 | **5-tranche** | glass-ui-blocked | A-05 → same trace |
| **CH-6** | `TooltipContent variant="mono"` (G6) | A `research/Ad` Ad-17 | **5-tranche** | glass-ui-blocked | A-06 → same trace |
| **CH-7** | `Button size="icon-sm"` rung (G7) | A `research/Ad` Ad-5 | **5-tranche** | glass-ui-blocked. **Live consumer-side anchor confirmed at G open**: `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16` carries a `TODO(glass-ui): migrate to Button size="icon-sm" once shipped (Ad-5)` comment | A-07 → same trace |
| **CH-8** | `<Tabs variant="underline">` provider family (G8) | A `research/Ab` Ab-10 | **5-tranche** | glass-ui-blocked: glass-ui shipped header-only `<UnderlineTabs>`; demo's `.underline-tabs` reka override stays | A-09 → same trace |
| **CH-9** | Contract-v2 §2.1 `./styles` Tailwind-source residual (font-asset half) | D.W1 Step 1 | **4-tranche** (D→E→F→G) | glass-ui-blocked: font-inlining authorship belongs to glass-ui | D-01 → E-RF-3 → F→G-2 |
| **CH-10** | keyframes.js precept-pin convergence (`458c2d1` → mkbabb/precepts upstream) | B coord/Q.md §9 | **5-tranche** (B→D→E→F→G) | keyframes.js-maintainer-blocked: peer's submodule SHA encodes intent | B-10 → D-02 → E-RF-4 → F→G-3 |
| **CH-11** | Aurora derive-from-color + blob extirpation precept-§10 wire-before-retire | D research/Dc-aurora + Dd-blob | **3-tranche** (D→E→F→G; derivative of CH-2 + CH-3) | derivative — closes only when CH-2 + CH-3 close | D `research/Dc-aurora.md §3` + `Dd-blob.md §6` → E-OTH-1 → F E-OTH-1 carry |
| **CH-12** | Speedtest CW Phase-2 (value.js as CONSUMER) | D coord/Q.md §4 | **4-tranche** (D→E→F→G) | speedtest-maintainer-blocked + user-gated | D-OTH → E-OTH-2 → F→G-4 |
| **CH-13** | fourier-analysis Phase-0 quiescence (109-file dirty tree) | Pre-D (chronic since CW Phase-0 inception) | **4-tranche** (D→E→F→G) at minimum (likely earlier) | fourier-maintainer-blocked: value.js cannot stash a peer's working tree. NOT on any value.js critical path | Continuously listed at every Q.md §1 / §6 across D-F |
| **CH-14** | `gh-pages` `dist/` housekeeping + secrets contention | A.W7-performance | **4-tranche** chronic in housekeeping form; the `Github` orphan sub-blocker (A-19/E-OTH-5) CLOSED at F.W0 Lane A (`419ce84`). The OIDC-auth half remains chronic. | tooling/infra (orchestrator-owned secrets config) | A-19 → B.W4-perf STILL-STANDS → Da §3 Δ6 → E-OTH-5 → F.W0 Lane A (Github half closed) → G (OIDC half remains chronic) |

**Total chronic-deferred items at G open**: **14**. Of these, 11 carry across 4-5 tranches; 3 are 3-tranche derivatives (CH-9, CH-11, CH-13). **8 are glass-ui-blocked** (CH-1..CH-8, CH-9 is derivative); **1 is keyframes.js-blocked** (CH-10); **1 is speedtest+user-gated** (CH-12); **1 is fourier-maintainer-blocked** (CH-13); **1 is tooling/infra** (CH-14 OIDC half).

---

## §4 — Newly-surfaced post-F items

Items that emerged during F execution but were NOT included in F's open-time `F-AUDIT-2` ledger (potential gaps in F1 "No deferrals" compliance). Cross-checked against F.W4 close-audit lanes 1-7.

| # | Item | Source | Origin | F1-compliance verdict |
|---|---|---|---|---|
| **NS-1** | `proof:resolution` `types`-key probe NOT IMPLEMENTED (F.W3 Lane F deferred-per-spec) | `F.W4-lane-1-plan-vs-actual.md` line 132 | Originally filed as **F-NEW-2** in `F-AUDIT-2 §2.2`. F.W3 wave spec framed it as OPTIONAL ("If F.W3 is on a tight critical path, defer this lane to F.W4 close-prep OR a successor tranche"); F.W3 closed without executing it; F.W4 did not pick it up. | F1-COMPLIANT (per-spec OPTIONAL deferral with named successor-tranche carry-forward), but **listed here for G visibility** because Q.md §7 / FINAL.md §7 omitted it (treats only peer-auth carries as standing asks). |
| **NS-2** | `api/src/services/` doc-drift (on-disk has `color/` + `session/` subdirs not reflected in `api/CLAUDE.md` lines 30-34, which list only `palette/` + `admin/`) | `F.W4-lane-3-doc-drift.md` line 131 | Pre-F drift surfaced by F.W4 Lane 3; flagged "Out-of-F-scope note for future tranche to decide doc reconciliation." | F1-MARGINAL: F.W4 Lane 3 explicitly punted to "future tranche" — not silent (documented), but lacks a TIME-BOUND (c) trigger. G should bind it. |
| **NS-3** | OIDC-auth half of `gh-pages` housekeeping (the secrets-config half of E-OTH-5/CH-14) | F.W0 Lane A closed only the `Github` orphan half; the OIDC half is preserved at A.W7-perf framing | F.W0 closed the build-blocker half; the deploy-pipeline OIDC half is orchestrator-infra-owned and was never bound to a lane | F1-COMPLIANT (chronic-status preserved; documented across A→B→D→E→F as orchestrator-owned). G should ratify the chronic status with a sharpened (c) trigger. |
| **NS-4** | F.W4 environmental Playwright flake class (11 of 36 specs failed under full-fleet host-pressure — all classified ENVIRONMENTAL) | `F/FINAL.md §9` Visual-runtime summary | Pre-existing class (F.W0 Lane C / E.W3 Lane B); 0 code regressions | F1-COMPLIANT — classified, documented, zero code regressions. **Not deferred** in the F1 sense; recorded here for ledger completeness. |
| **NS-5** | speedtest tranche AK opening signal (post-F-close +1 commit `c73a8d92`) | Live verification at G open | Speedtest AK W0 audit cohort opened in the F-G boundary | INFORMATIONAL — sharpens CH-12's (c) trigger landscape but is not itself a value.js-side deferral. |

**Total newly-surfaced post-F items**: **5**. Of these:
- **1 truly post-F deferral lacking a TIME-BOUND trigger**: NS-2 (`api/src/services/` doc-drift).
- **1 named-successor deferral** explicitly anticipated by F: NS-1 (proof:resolution types-key probe).
- **1 chronic continuation** (the OIDC half of CH-14): NS-3.
- **1 environmental class** (zero code-regression): NS-4.
- **1 peer-signal** (informational): NS-5.

**F1-compliance assessment**: NS-2 is the only true F1-marginal item — F.W4 Lane 3 documented but did not TIME-BIND it. G ratifies a (c) trigger in §5+§7.

---

## §5 — Per-item G-disposition

The 4 G-disposition classes (per the G-opening directive):
- **FOLD-INTO-G**: appropriate for G scope (value.js-side action).
- **RETIRE-MOOT**: no longer relevant (e.g., upstream shipped the API).
- **PEER-AUTHORSHIP-REQUIRED**: peer-repo authority (sharpened (c) trigger).
- **CARRY-FORWARD-WITH-SHARPER-TRIGGER**: still defer, but TIME-BOUND not "later".

### §5.1 — Disposition table

| ID | Item | G-disposition | Rationale | Proposed G-target wave OR sharpened (c) trigger |
|---|---|---|---|---|
| **CH-1** | Metaballs API additions (G1) | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns the API surface; F-AUDIT-2 §4.1 principle holds ("design system owns its own primitives") | Re-check at glass-ui's NEXT **non-AB-family** tranche-open OR at G.W4 close. If glass-ui ships any of G1-G8 during G window, evaluate adoption at G close. Hard ceiling: re-check at G close ceremony. |
| **CH-2** | Aurora derive | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-3** | BlobDot primitive | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-4** | SelectTrigger size | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-5** | DockSelectTrigger clampLabel | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-6** | TooltipContent variant="mono" | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-7** | Button size="icon-sm" | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1; live consumer-side TODO confirms the anchor | same trigger as CH-1; AND remove the `TODO(glass-ui)` comment in `PaletteSlugBar.vue:16` IF glass-ui ships the rung during G |
| **CH-8** | Tabs variant="underline" provider family | **PEER-AUTHORSHIP-REQUIRED** | same as CH-1 | same trigger as CH-1 |
| **CH-9** | Contract-v2 §2.1 font-asset residual | **PEER-AUTHORSHIP-REQUIRED** | glass-ui owns font distribution; F-AUDIT-2 §4.1 holds | Re-check at glass-ui's `dist/glass-ui.css` next-publish — specifically check `grep -c '@font-face\|data:font' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css`. If non-zero, the residual closes + value.js retires `siblingFsAllowTransient` in a G.W1-or-later mechanical lane. Hard ceiling: G close ceremony re-verifies; if still 0, carry forward to H. |
| **CH-10** | keyframes.js precept-pin drift | **PEER-AUTHORSHIP-REQUIRED** | peer's submodule SHA encodes maintainer's intent about which precept tree governs | Re-check at keyframes.js maintainer's next submodule-rebase signal OR at G close (whichever first). If still divergent at G close, carry forward to H with the same (c) trigger. NOT on any runtime gate; documentation-only consistency. |
| **CH-11** | Aurora derive-from-color + blob extirpation | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | derivative of CH-2 + CH-3; closes only when those close | Closes DERIVATIVELY when CH-2 + CH-3 close. Re-check at every G wave-close. If CH-2 + CH-3 ship during G, G opens a demo-abstraction lane (per F/FINAL.md §12 "value.js demo-abstraction post-glass-ui-ship"). |
| **CH-12** | Speedtest CW Phase-2 | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | speedtest-maintainer + user-gated; speedtest AK tranche now W0-open (soft positive signal, but AK is auditing, not shipping CW Phase-2) | Re-check at (a) user explicit signal OR (b) speedtest AK close + CW Phase-2 dispatch signal. Sharpened trigger: orchestrator re-reads `speedtest/docs/tranches/AK/` at every G wave-close; flag any CW-Phase-2-dispatch language. Hard ceiling: G close ceremony. |
| **CH-13** | fourier-analysis Phase-0 quiescence (109-file dirty tree) | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | fourier-maintainer-owned; value.js cannot stash a peer's working tree; NOT on any value.js critical path | Re-check at G close — `git -C /Users/mkbabb/Programming/fourier-analysis status --short | wc -l`. If non-109, investigate; if still 109 + still zero drift, carry forward to H with no escalation (chronic-stable). |
| **CH-14a** | `gh-pages` OIDC-auth half (secrets-config) | **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | orchestrator-infra-owned (GitHub Actions deploy-secret config) | Re-check on user explicit signal OR at the next gh-pages-deploy-policy review. NOT a code-side defer. Hard ceiling: G close — if no signal, carry to H with the same trigger language. |
| **F→G-1..4** | (Identical to CH-1..8, CH-9, CH-10, CH-12) | (Covered above) | — | — |
| **F→G-5 / NS-1** | `proof:resolution` `types`-key probe | **FOLD-INTO-G** | value.js-side mechanical 5-10 line script extension (`scripts/proof-resolution-contract.mjs`); F.W4 Lane 1 named G as the successor tranche; closes a close-honesty gap. | **FOLD-INTO-G.W1 or G.W2** (small lane: `proof-resolution-contract.mjs` types-key probe; 1-file ~15 min lane). Captures the close-honesty improvement that prevents another E-shape silent-claim. |
| **NS-2** | `api/src/services/` doc-drift (color/ + session/ subdirs missing from `api/CLAUDE.md` lines 30-34) | **FOLD-INTO-G** | Pure documentation drift, value.js-side, mechanical fix; F.W4 Lane 3 explicitly punted to "future tranche" — G IS that tranche. | **FOLD-INTO-G** as part of a G doc-drift sweep wave OR fold into a G `api/`-touching wave's close-honesty checklist. Mechanical 5-line `api/CLAUDE.md` update. |
| **NS-3** | OIDC-auth half of `gh-pages` housekeeping | (Same as CH-14a — CARRY-FORWARD-WITH-SHARPER-TRIGGER) | (See CH-14a) | (See CH-14a) |
| **NS-4** | Environmental Playwright flake class | **RETIRE-MOOT** | F.W4 Lane 6 classified all 11 failures as ENVIRONMENTAL (1 missing WebKit, 7 missing API backend, 1 host-pressure flake, 2 worker-contention); zero code regressions. Class is well-understood; isolating it would require infrastructure changes outside value.js's repo scope | RETIRE as not-a-defer. Re-open only if a code-regression failure mode is discovered in the class. |
| **NS-5** | Speedtest tranche AK opening | (Not a defer — peer-signal) | Informational input to CH-12's trigger landscape | Not a separate ledger item; sharpens CH-12's (c) trigger language. |

### §5.2 — Items that should be considered for RETIRE at G open

Per F-AUDIT-2 §1.5 retire-with-rationale precedent (bandwidth-gated items with no consumer signal across N+ tranches):

**No new RETIRE-MOOT candidates at G open beyond NS-4.** All carry-forwards retain their structural blockers (glass-ui contraction posture; keyframes.js maintainer authority; speedtest CW user-gate). The "2-tranche bandwidth-gated" retire pattern applied to E-OTH-4 + E-OTH-6 at F open is NOT applicable to any G-open item — every chronic-deferred item is BLOCKED, not BANDWIDTH-GATED. The distinction is precept-bound: bandwidth-gated items have NO external blocker; blocked items cannot proceed without peer action.

---

## §6 — Disposition tally

| Disposition | Count | Items |
|---|---|---|
| **FOLD-INTO-G** | **2** | F→G-5/NS-1 (proof:resolution types-key probe) · NS-2 (api/CLAUDE.md services tree-drift) |
| **RETIRE-MOOT** | **1** | NS-4 (Playwright environmental flake class — pre-existing, well-classified, 0 code regressions) |
| **PEER-AUTHORSHIP-REQUIRED** | **10** | CH-1..CH-8 (8 glass-ui primitive asks — 5-tranche chronic each) · CH-9 (contract-v2 §2.1 font residual) · CH-10 (keyframes.js precept-pin) |
| **CARRY-FORWARD-WITH-SHARPER-TRIGGER** | **4** | CH-11 (Aurora derive-from-color + blob extirpation — derivative) · CH-12 (speedtest CW Phase-2) · CH-13 (fourier Phase-0 dirty tree) · CH-14a/NS-3 (OIDC-auth gh-pages half) |
| **(Informational — not a ledger entry)** | 1 | NS-5 (speedtest AK opening — informational input to CH-12) |

**Total ledger entries**: **17** (2 FOLD + 1 RETIRE + 10 PEER + 4 CARRY).

**Verification arithmetic**:
- 14 chronic-deferred (§3) — all dispositioned (8 PEER for CH-1..CH-8 + 1 PEER for CH-9 + 1 PEER for CH-10 + 3 CARRY for CH-11/CH-12/CH-13 + 1 CARRY for CH-14a = 14 entries).
- 5 newly-surfaced post-F (§4) — 1 dropped to "informational" (NS-5), 4 dispositioned (1 FOLD for NS-1, 1 FOLD for NS-2, 1 CARRY for NS-3 = CH-14a duplicate, 1 RETIRE for NS-4).
- 5 inherited from F close (§2) — F→G-1..F→G-4 are identical to chronic-deferred CH-1..CH-8 + CH-9 + CH-10 + CH-12 (the carry-forward asks); F→G-5 = NS-1. No double-counting.

**Distinct G-disposition entries**: **17** (14 chronic + NS-1 + NS-2 + NS-4 = 17; NS-3 collapses into CH-14a; NS-5 collapses into CH-12; F→G-1..F→G-4 collapse into CH-1..CH-12 carries).

---

## §7 — Per-F1 "No deferrals" sharpening

Per F1's binding ("zero vague later"), every G-disposition entry must carry a TIME-BOUND or EVENT-BOUND (c) trigger.

### §7.1 — Items lacking TIME-BOUND triggers at G open (pre-G-fold)

| Item | F-close (c) trigger language | F1-sharpening verdict |
|---|---|---|
| CH-1..CH-8 (8 glass-ui asks) | "next-tranche-open OR glass-ui's next non-AJ tranche-open (whichever first)" | **PARTIALLY TIME-BOUND** — "next-tranche-open" half just fired (G open). The "glass-ui's next non-AJ tranche-open" half is EVENT-BOUND but not calendar-bound. **G sharpens**: re-check at every G wave-close + hard ceiling at G close ceremony. |
| CH-9 (contract-v2 §2.1 font) | "glass-ui's `dist/glass-ui.css` next-publish" | **EVENT-BOUND**; not calendar-bound. **G sharpens**: orchestrator re-greps `dist/glass-ui.css` at every G wave-close; hard ceiling at G close. |
| CH-10 (keyframes.js precept-pin) | "keyframes.js maintainer's next submodule-rebase signal" | **EVENT-BOUND**; not calendar-bound. **G sharpens**: re-check at G close ceremony; if still divergent, carry to H with documented multi-tranche-staleness rationale. |
| CH-12 (CW Phase-2) | "user explicit signal OR speedtest CW Phase-2 ship" | **EVENT-BOUND**; AK tranche-open is a soft positive signal. **G sharpens**: orchestrator re-reads speedtest tranche-AK at every G wave-close for CW-Phase-2 dispatch language. |
| CH-13 (fourier dirty tree) | (None explicit at F close — implicit "chronic-stable, NOT on critical path") | **MISSING (c) TRIGGER** — F flagged YELLOW health but did not author a (c) trigger. **G sharpens**: re-check at G close ceremony; if still 109 dirty files + zero drift, carry forward as chronic-stable (no escalation). |
| CH-14a/NS-3 (OIDC half) | (None explicit at F close — was rolled into the closed Github half) | **MISSING (c) TRIGGER**. **G sharpens**: re-check on user explicit signal OR at next gh-pages-deploy-policy review; orchestrator-infra-owned. |
| NS-2 (api/CLAUDE.md drift) | "future tranche" (F.W4 Lane 3 punt) | **VAGUE — F1-MARGINAL.** **G sharpens by FOLD-INTO-G**: mechanical fix within G window (no carry-forward). |
| NS-1 (proof:resolution types-key probe) | "F.W4 close-prep OR a successor tranche" | **EVENT-BOUND** (F.W4 close did not pick up; G is the named successor). **G sharpens by FOLD-INTO-G**: mechanical lane in G.W1 or G.W2. |

### §7.2 — Proposed F1-sharpened (c) triggers for G's coordination/Q.md

The G coordination Q.md (authored after this audit) should encode:

1. **CH-1..CH-8** — "Re-check at every G wave-close via `git -C /Users/mkbabb/Programming/glass-ui log --oneline e150e2f..HEAD` + tranche-list grep for any new non-AB-family tranche-open. Hard ceiling: G close ceremony. If still OPEN at G close, carry to H with same trigger; if 5+ tranches reached without any of G1-G8 shipping, file as `bandwidth-gated upstream` chronic." This catches the "5-tranche chronic" inflection.

2. **CH-9** — "Re-check at every G wave-close: `grep -c '@font-face\|data:font' /Users/mkbabb/Programming/glass-ui/dist/glass-ui.css`. If non-zero, FOLD an immediate G mechanical lane to retire `siblingFsAllowTransient`."

3. **CH-10** — "Re-check at G close: `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts`. If still `458c2d1`, carry to H."

4. **CH-11** — "Closes derivatively when CH-2 + CH-3 close. If CH-2 + CH-3 ship during G, open a G demo-abstraction lane."

5. **CH-12** — "Re-check speedtest tranche AK status at every G wave-close. If AK closes with a CW-Phase-2 dispatch signal, FOLD G or H lane to flip the `package.json` consumer side."

6. **CH-13** — "Re-check at G close: `git -C /Users/mkbabb/Programming/fourier-analysis status --short | wc -l`. If still 109 + zero drift, carry to H with no escalation."

7. **CH-14a/NS-3** — "Re-check on user explicit signal OR next gh-pages-deploy-policy review. Orchestrator-infra-owned; not on G critical path."

8. **NS-1** — "FOLD-INTO-G.W1 or G.W2 as a mechanical script-extension lane."

9. **NS-2** — "FOLD-INTO-G as part of a doc-drift sweep OR fold into the close-honesty checklist of any G wave touching `api/`."

10. **NS-4** — "RETIRE; re-open only on a code-regression failure mode in the class."

---

## §8 — Authority

This ledger was assembled from:

**Canonical post-F substrate**:
- `docs/tranches/F/coordination/Q.md` §1, §2, §3, §5, §6, §7 (verified by direct read).
- `docs/tranches/F/FINAL.md` §3, §6, §7, §10, §12 (verified by direct read).
- `docs/tranches/F/audit/F-AUDIT-2-deferred-ledger.md` (full 249 LoC, verified by direct read).
- `docs/tranches/F/audit/F.W4-lane-1-plan-vs-actual.md` (line 132 deferred-per-spec verdict).
- `docs/tranches/F/audit/F.W4-lane-3-doc-drift.md` (line 131 newly-surfaced api/CLAUDE.md note).
- `docs/tranches/F/audit/F.W4-lane-4-idiomatic-gestalt.md` (15-row ledger PASS).
- `docs/tranches/F/audit/F.W4-lane-7-integrity-sweep.md` (chronic dirty-tree restatement).

**Predecessor inheritance trace**:
- `docs/tranches/E/audit/E-AUDIT-2-deferred-ledger.md` §2 (full ledger) + §3 (A-CHRONIC) + §4 (B-CHRONIC) + §5 (D-CHRONIC) + §6 (Glass-ui-blocked) + §9 (E-disposition).
- `docs/tranches/E/coordination/Q.md` §3 + §4 + §5.
- `docs/tranches/E/FINAL.md` §6.
- `docs/tranches/D/coordination/Q.md` §3 + §4 + §9.
- `docs/tranches/D/FINAL.md` §4 (Da-1 30-item chronic ledger).

**Live peer-repo state verifications at G open (2026-05-21)**:
- `git -C /Users/mkbabb/Programming/glass-ui rev-parse HEAD` → `e150e2f` (UNCHANGED since F close).
- `git -C /Users/mkbabb/Programming/glass-ui log --oneline e150e2f..HEAD` → empty (zero drift).
- `git -C /Users/mkbabb/Programming/glass-ui ls docs/tranches/` → no new post-AB-family tranche open.
- `git -C /Users/mkbabb/Programming/keyframes.js rev-parse HEAD` → `470814e` (UNCHANGED since F.W2 codemod commit).
- `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts` → `458c2d1` (UNCHANGED).
- `git -C /Users/mkbabb/Programming/speedtest rev-parse HEAD` → `c73a8d92` (+1 commit since F close — AK W0 audit cohort).
- `git -C /Users/mkbabb/Programming/fourier-analysis rev-parse HEAD` → `926ca6a` (UNCHANGED).

**Live in-tree verifications at G open**:
- `grep -rn '@deprecated\|@ts-ignore' src/` → 0 hits.
- `grep -rn 'TODO\|XXX\|FIXME' src/` → 0 hits.
- `grep -rn 'TODO\|XXX\|FIXME' demo/@/` → 1 hit (`PaletteSlugBar.vue:16` — A-07 anchor confirms CH-7 chronic).

---

**End of G-AUDIT-2.** 17 distinct ledger entries dispositioned (2 FOLD + 1 RETIRE + 10 PEER + 4 CARRY). 14 chronic-deferred items (3+ tranche carry-through) + 5 newly-surfaced post-F items (1 of which is F1-marginal — NS-2; G ratifies a TIME-BOUND trigger by FOLD-INTO-G). Per F1 "No deferrals" inheritance: ZERO items remain silently deferred at G open. The G-AUDIT-2 ledger feeds G's wave allocation (2 FOLD-INTO-G items get bound to specific G lanes) and the G `coordination/Q.md` cross-repo manifest (10 PEER-AUTHORSHIP-REQUIRED items + 4 CARRY-FORWARD-WITH-SHARPER-TRIGGER items become standing asks with sharpened (c) triggers per §7.2).
