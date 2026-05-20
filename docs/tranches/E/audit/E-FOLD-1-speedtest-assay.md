# E-FOLD-1 — Speedtest tranches deep assay

**Author**: E-FOLD-1 read-only research lane (value.js tranche E open).
**Mode**: READ-ONLY across `/Users/mkbabb/Programming/speedtest`. No git mutations. No writes outside this deliverable.
**Date**: 2026-05-20.
**value.js HEAD at audit**: master after `70e61e9` (current branch `w.w2.1-value-js-prebuild`); E findings file `docs/tranches/E/findings.md` was the route-forward reference.
**Speedtest HEAD at audit**: master `9d22bcdf` (per orchestrator pre-flight; verified via `git -C /Users/mkbabb/Programming/speedtest log --oneline -1` returned `9d22bcdf docs(AI): §9 W6 Vite-upgrade ruthless wave`; subsequent §10 `9f3ffca6` + §11 `7d9211fd` had also landed on master at read-time but are amendment SHAs to the AI plan, not new tranche state).
**Scope guardrails**: speedtest read paths are `docs/tranches/AI/`, `docs/tranches/CW/`, `docs/tranches/AH/`. No file outside these dirs was modified. Cross-repo references checked against value.js's own `docs/tranches/E/findings.md` only.

---

## §1 — Methodology

I read against the following speedtest sources at the SHAs noted in §9 (Authority):

- **Tranche AI scaffold + amendments**: `docs/tranches/AI/AI.md` (190 lines; covers §1-§11 spans of the synthesis); the four amendments visible on master at read-time were §6 RD-cohort (`76e7d4ac`), §7 post-RD audit cohort (`ad728640`), §8 W3-R4 dev-cold (`960fd85c`), §9 W6 Vite-upgrade (`9d22bcdf`), §10 constellation dep-lift (`9f3ffca6`), §11 constellation-wide scope expansion (`7d9211fd`).
- **AI W0-cohort artefacts**: `docs/tranches/AI/artefacts/RD3-value-js-rename-duplication.md` (482 lines), `post-RD-8-W6-vite-upgrade-wave-spec.md` (516 lines), `post-RD-9-deps-value-js.md` (419 lines), `post-RD-9-deps-glass-ui.md` (484 lines), `post-RD-9-deps-keyframes-js.md` (641 lines), `post-RD-10-cross-repo-dep-drift-matrix.md` (668 lines), `post-RD-11-W-LOCKSTEP-vue-tsc.md`, `post-RD-13-W-LOCKSTEP-vitest-and-pinia.md`, `post-RD-14-future-tranche-coordination.md` (398 lines), `post-RD-5-cross-tranche-status.md` (306 lines), `user-corrections-card-recipe-and-duplication.md` (233 lines).
- **Tranche CW scaffold (seed)**: `docs/tranches/CW/CW.md` (223 lines), `docs/tranches/CW/seed-references.md` (94 lines).
- **Tranche AH close**: `docs/tranches/AH/FINAL.md` (459 lines), `docs/tranches/AH/AH.md` (81 lines), `docs/tranches/AH/PROGRESS.md` (106 lines).
- **Commit log**: `git -C /Users/mkbabb/Programming/speedtest log --oneline -50` (last 50 commits, spanning `7d9211fd → 1f3ffca6` window); cross-repo grep `git log | grep -iE "value\.js|glass-ui|keyframes|fourier"` (returned ~40 hits, oldest in tranche-Y, newest at `497fcf4e` AI synthesis).
- **value.js cross-reference**: `docs/tranches/E/findings.md` (§3 named-route-forward items list).

Hard cap honoured: ~40 minutes of read elapsed. No installs, no commits, no peer-repo writes.

---

## §2 — Speedtest tranche inventory

Per-tranche-letter table. Status legend: **ACTIVE** = open + dispatching; **CLOSED** = `FINAL.md` ratified + closing tag on master; **SEEDED** = scaffold present, W0 not dispatched.

| Tranche | Scope summary | Status | Last commit / FINAL SHA | Cross-repo affected |
|---|---|---|---|---|
| **AI** | "Audit-driven refinement, NO legacy code, NO quick solutions" successor to AH. 15 substantive waves planned (post-§11): W1 PaneHeader→CardHeader-shrink + facilities; W2 spent-wisely visual + anti-duplication audit; W3 perf carve + R4 dev-cold ruthless; W4 animation-expressiveness; W5 frontend-arch hygiene; W6 Vite 5→7 catch-up; W7 speedtest dep-lift; W8 per-repo SAFE-MINOR sweep; W9 cross-cutting LOCKSTEPS; W10 Vite 8 + Rolldown; W11 Vue 3.6; W12 TS 6; W13 vue-router 5; + W-HANDOFF / W-FINAL / W-CLOSE. | **ACTIVE — planning, awaits G-AI-D1..D24 ratification** | `7d9211fd` (§11 constellation expansion amendment) | glass-ui (W1 publisher); value.js (W1 consumer-side rename + W8-CR-β SAFE-MINOR + W9 LOCKSTEPs); keyframes.js (W6 alignment + W8 sweep); fourier-analysis (W8 sweep + verified-patch); words/frontend (vue-tsc-3 canary); bbnf-buddy (W8 sweep) |
| **CW** | Monorepo workspace transposition. pnpm-workspace overlay (7 repos, 7 cadences, one `constellation/` root). Successor to AH per G-AH-D1. 6-lane W0 cohort designed (CW-A1..A6); none dispatched. Phase-0 (peer-team quiescence) is the gate. | **SEEDED — W0 not dispatched; gated on peer quiescence + user "open CW W0"** | `61079cb1` (CW seed merge); scaffold at `ad68b7e0` | ALL 7 repos. value.js role: **CONSUMER** (per CW.md §17, A4 §5.1 option 2 — value.js is "flipped last by its own team in one commit"). |
| **AH** | Successor-to-AG. 6 substantive waves shipped: W1 glass-ui CSS-distribution fix; W2 visual polish + telemetry design; W3 performance carve (admin LCP); W4 engineering hygiene + deploy-prep; W5 frontend-arch + design-idiom hygiene; W-HANDOFF MULTI-WRITER verified patches; W-FINAL S0 pre-flight READY. | **CLOSED — 2026-05-19** | `f9cf8fc1` (FINAL.md commit) → `75af6060` (R5-alpha merge) → `61079cb1` (R5-beta CW seed merge) | glass-ui (W1 `@import "@mkbabb/glass-ui/styles.css"` half — already shipped); keyframes.js (W3-C `defineAsyncComponent(Aurora)` carve; barrel-edge to CW); value.js (W-HANDOFF `value-js-contract-v2.patch` — **CLOSED-VIA-PEER-LAND**, peer already adopted at value.js D.W1 `73fdabc`); fourier-analysis (W-HANDOFF contract-v2 patch + 31-site phantom patch — leave-with-them) |
| AG, AF, AE, AD, AC, AB, AA, Z, Y, X, W, V, U, T, S, R, Q, P, O, N, M, L, J, I, H, G | Earlier tranches; all CLOSED with `FINAL.md` on master. Each shipped speedtest-internal scope; cross-repo edges (glass-ui upgrades + keyframes.js consumption + value.js `inline value.js helpers` etc.) accumulated as carries handled in successor tranches. | **CLOSED** | (per each tranche's FINAL.md) | Various; see §6 commit-by-commit table for the cross-repo edge surface. |

**Speedtest's active-tranche surface today = AI (planning, no source touched) + CW (seeded only). Everything else is closed.**

---

## §3 — Tranche AI deep read

### §3.1 — Wave inventory (post-§11)

| Wave | Scope (one-line) | Status today | value.js touch-surface |
|---|---|---|---|
| **W1** | glass-ui `<CardHeader shrink>` enhancement + `card-scroll-fade` utility + `--card-scroll` named timeline + `@mkbabb/glass-ui/motion` subpath surgery; speedtest SurveyWizard consumer adoption | planned; pre-impl | **HIGH**: value.js currently owns the canonical recipe + the local `PaneHeader.vue` (RD3 §1.6: 38 sites across 13 files). value.js is the LARGEST rename surface of the 3 repos (speedtest=1 ref; glass-ui owns destination; value.js owns 38 consumer sites). |
| **W2** | "Spent-wisely visual + spatial reset" + anti-duplication audit (1-2 sources max per page); telemetry duplication ceiling | planned | none direct; value.js panes already pass anti-duplication audit (RD3 §7.2) — surfaces as "value.js as exemplar" framing. |
| **W3** | Performance carve continues; **W3-R4 dev-cold ruthless** (349 ms → 230 ms target via V1 retire unplugin-vue-macros + V2a bypass npm-run + V3 .ts→.mjs config + V4 drop unused SCSS + V5 hoist build-only imports) | planned; speedtest-only | none |
| **W4** | Animation expressiveness (progress bars; meter exemplars); the FD2 lane scope | planned | none direct |
| **W5** | Frontend-architecture + design-idiom hygiene; the FA-1..FA-8 fold continuation | planned | none direct |
| **W6** | Vite 5.4.8 → 7.3.3 + `@vitejs/plugin-vue` 5.1.4 → 6.0.7 (Strategy C: skip 6.x). 3 sequential sub-lanes (L1 pre-flight; L2 the upgrade; L3 validation + cold-boot re-measurement). **Speedtest-only** per post-RD-8 §5.1: every other constellation peer already on 7.x. | planned; ratification-ready | **NONE**: speedtest-only catch-up. value.js is already at `vite ^7.0.6`. (See §3.5.) |
| **W7** | Speedtest dep-lift internal sweep in 3 PRs: W7-α Group A pre-W6 SAFE-MINOR; W7-β server/ majors; W7-γ workers/speedtest-edge/ patches | planned | none direct |
| **W8 NEW** | Per-repo SAFE-MINOR sweep — 6 parallel sub-lanes; one per peer. fourier as verified-patch deferred to W-HANDOFF | **planned but UNRATIFIED** | **W8-CR-β = value.js SAFE-MINOR sweep**. AI proposes to execute directly (per §11 override of precept-13 publish-only framing). **This is the key duplication risk for E.W4 tooling refresh + npm-update sweep.** |
| **W9 NEW** | Constellation cross-cutting LOCKSTEPS — 8 sub-lanes (vue-tsc / reka-ui / lucide-rename / vitest / pinia / @types-node / tailwind-merge / vaul-vue) | planned | **W9-A vue-tsc**: value.js on 2.2.0; AI proposes lift. **W9-D vitest**: value.js on 3.2.4 (laggard); AI proposes lift (`post-RD-13` §A: "0 break-touchpoints in value.js — manifest range bump + lockfile regen"). **W9-B reka-ui**: value.js on 2.0.0 vs 2.9.7 (9 minors behind). **W9-F @types-node**: value.js at ^24.1 vs proposed canon ^25.9.1. **HIGH duplication risk.** |
| **W10 NEW** | Vite 7 → 8 + Rolldown constellation-wide (7 sub-lanes; glass-ui canary-first; Rolldown 1.0.2 GA 13 days fresh — HIGH risk) | planned | value.js participates as one of 7 sub-lanes |
| **W11 NEW** | Vue 3.5 → 3.6 (CONDITIONAL on stable GA at execution time; currently beta.12) | conditional | value.js participates if executed |
| **W12 NEW** | TypeScript 5 → 6 constellation-wide (depends on W9-A vue-tsc 3) | conditional | value.js participates |
| **W13 NEW** | vue-router 4 → 5 (CONDITIONAL on user direction at execution gate) | conditional | value.js's `vue-router ^4.6.4` would participate |
| **W-HANDOFF / W-FINAL / W-CLOSE** | Verified-patch bundle + production deploy + close ceremony | planned (15-wave close ceremony) | value.js's Pane→Card consumer flip rides W-HANDOFF if it doesn't land directly |

### §3.2 — W0 cohort artefacts — what they specced

**9-lane cohort** (A1-A5 audit + FD1-FD4 frontend-design) dispatched in true parallel; A6 synthesis after.

| Lane | Concern | Output | value.js implication |
|---|---|---|---|
| A1 | Chronic + deferred recap (AE→AH session history) | `A1-chronic-recap.md` | none direct |
| A2 | Engineering correctness on post-AH master | `A2-engineering.md` | none direct |
| A3 | Visual + design audit on AH-final UI | `A3-visual-design.md` | none direct |
| A4 | Performance + load-time audit (ruthless) | `A4-performance.md` | none direct |
| A5 | Animation choreography audit | `A5-animation.md` | **mandate names value.js panes as exemplar**: "look to there for our pane animations, blob, aurora—how can we leverage some of our primitives better" |
| A6 | Synthesis | `A-synthesis.md` | composes the G-AI-D decision board |
| FD1 | Glass-UI usage gap analysis | `FD1-glass-ui-usage.md` | The "subsumed ScrollPane leveraged by value.js" framing originates here. |
| FD2 | Animation expressiveness | `FD2-animation-expressiveness.md` | none direct |
| FD3 | Mobile vs desktop hierarchy + occlusion | `FD3-mobile-desktop-hierarchy.md` | none direct |
| FD4 | Glass-UI improvement + cross-repo design surface | `FD4-glass-ui-improvement.md` | The "what value.js facilities are we eligible to consume?" question — surfaces PaneHeader as the canonical promotion target. |

### §3.3 — RD-cohort findings (6 lanes, 2026-05-20 morning)

Post-synthesis the user authorized a 6-lane RD cross-repo audit. The cohort closed at `03625470`:

| Lane | Output | value.js relevance |
|---|---|---|
| RD1 | speedtest rename + duplication | none direct |
| RD2 | glass-ui rename + namespace | none direct (glass-ui-side) |
| **RD3** | **value.js rename + local-duplication** | **direct — see §3.4** |
| RD4 | cross-repo namespace | confirms value.js is largest rename surface |
| RD5 | L-invariant-8 candidates | none direct |
| RD6 | token + utility drift | mild drift on `slug-pill` recipe (5 sites) — extend glass-ui `<Badge>` |

### §3.4 — RD3 (value.js rename + local-duplication audit) — the deep finding

Read in full (482 lines). Key statements that bind E:

1. **value.js owns the largest cross-repo rename surface**: **~38 sites across ~13 files** (10 `pane-scroll-fade` utility sites + 5 `--pane-scroll` named-timeline sites + 18 `PaneHeader` migration sites + barrel/comment touch-ups). Speedtest has 1 reference; glass-ui owns the destination, not consumer sites. (RD3 §1.6)
2. **Glass-ui promotion candidates beyond CardHeader = ZERO net-new** that pass the 2-consumer gate. `PaneSlot`, `ConfigSliderPane`, `PaneSegmentedControl`, `GooBlob`, `usePaneRouter`, `slug-pill` — all single-consumer value.js scaffolds. (RD3 §3.7) **This confirms the E findings AUD-4.3 ledger: the 7 standing glass-ui D-filed primitive/blob gaps remain glass-ui's successor-tranche concern, not E's.**
3. **`BasePane.vue` wrapper temptation rejected**: the recipe IS the canon per user correction; a BasePane would re-create the variant-ladder problem under a different name. **Status quo on the 9-pane recipe duplication.** (RD3 §6.3-§6.5) **Aligns with E's no-BasePane direction.**
4. **W-HANDOFF protocol for the rename**: two-patch shape (CSS-only rename first; component migration gated on glass-ui shipping `<CardHeader shrink>`). value.js performs the rename as a verified-patch handoff at the right peer-quiescence moment. (RD3 §2.2-§2.6)
5. **Anti-duplication audit findings on value.js panes**: **NO 3+-redundant-copy violations found.** value.js is a cleaner example of the principle than speedtest's running-meter surface. (RD3 §7.2) **value.js's discipline is consistent with the ceiling.**

### §3.5 — W6 Vite-upgrade (current state)

Read in full (`post-RD-8`, 516 lines). Findings binding to E:

- **Speedtest is the lone Vite-5.4.8 laggard.** Every other constellation repo (glass-ui, value.js, keyframes.js, bbnf-buddy, words/frontend, fourier-analysis/web) is on Vite 7.x at the W6 spec authoring (post-RD-8 §1).
- **value.js HEAD at W6 spec audit-time was `fa885c16`** (D.W6 in flight per their note); now master is `eae8afc`/`70e61e9`-ish per E's findings.
- **W6 is SPEEDTEST-ONLY** per post-RD-8 §5.1: glass-ui's `peerDependencies` does not declare `vite`; `dist/` shape is bundler-agnostic ESM; the dev-resolution contract-v2 is Vite-major-agnostic.
- **value.js already at `vite ^7.0.6`**. Lifting to 7.3.3 is a patch within `^7.0.6` — falls out at any fresh `npm install`. **Not E's work.**

### §3.6 — RD-cohort + post-RD audit "absorb value.js shrink behavior into existing primitive" (`497fcf4e`)

Read `user-corrections-card-recipe-and-duplication.md` Correction 2.5 in full (233 lines). **The value.js shrink behavior is value.js-LOCAL** at `demo/@/components/custom/panes/PaneHeader.vue` (verified by speedtest's audit, read-only on value.js):

- **What it is**: 3-lane CSS scroll-driven shrink via `animation-timeline: --pane-scroll` (header padding lane + title size lane + description grid-row/opacity lane). Plus sticky positioning + backdrop blur (`sticky top-0 z-[var(--z-header)] backdrop-blur-md bg-card/60`). Plus optional `description` prop with grid-row collapse animation.
- **What "absorb" means**: glass-ui extends its existing `<CardHeader>` primitive with an additive `shrink` prop (no new component) — reuses `CardTitle` + `CardDescription` sub-primitives. The L-invariant-8 demote precedent is honoured: behavior absorbs INTO the existing primitive, NOT into a new sibling.
- **value.js's writes** (per the same correction doc): rename `--pane-scroll` → `--card-scroll` + `pane-scroll-fade` → `card-scroll-fade` in the 9 pane consumers; eventually migrate from local `PaneHeader.vue` → glass-ui `<CardHeader shrink>` (deferred; not blocking AI).
- **The shrink behavior is being ABSORBED INTO glass-ui (good — it's elevation to first-class)**, not lost. value.js loses its local `PaneHeader.vue` (after migration), gains a cleaner consumer surface. This is **not a regression for value.js**; it is consistent with the feedback_glass_ui_first_class precept already in value.js's memory.

**Is value.js's shrink lost or absorbed?** **ABSORBED** — into glass-ui as a `<CardHeader shrink>` enhancement. The behavior survives; only the local file retires.

---

## §4 — Tranche CW deep read

### §4.1 — Monorepo workspace transposition shape

**Form**: **pnpm-workspace overlay**, NOT bun, NOT Nx, NOT Turborepo. (CW.md §Mandate + seed-references.md §1; A4-monorepo.md is the W0 design seed at HA6 grade A.)

**Layout**: 7 git repos remain independent (Grade A overlay), one `constellation/` root with `pnpm-workspace.yaml`. `workspace:^` protocol replaces `file:../` links AND the `^2.0.0` registry pins as one category. Each member keeps its own `version` field + publish flow + `docs/tranches/` history.

### §4.2 — The 7-repo scope

Per CW seed (CW.md §1 + seed-references.md §1) + post-RD-9-deps-glass-ui.md §4:

1. speedtest
2. glass-ui
3. value.js
4. keyframes.js
5. bbnf-buddy
6. words/frontend
7. fourier-analysis/web

### §4.3 — Phase gating

Per CW.md §Precepts (14-17) + §Halt for synthesis:

- **Phase 0 — quiescence preconditions**: BOTH value.js's `tranche-b` AND fourier-analysis's `codex/contour-rebaseline` must be quiesced (landed on master, clean tree) OR an explicit per-member opt-in plan from those teams. **A "dirty MULTI-WRITER peer receives no direct writes" (CW precept 14)** — this is binding.
- **Phase 1**: workspace-root standup + `pnpm install` (the only `pnpm install` allowed — workspace-root only per CW precept 15). Phantom-import cleanup as a CW Phase-1 sub-task (precept 16).
- **Phase 2**: publisher-flip (glass-ui + keyframes.js etc.) — but value.js + fourier-analysis flip LAST (CW precept 14; CW-CARRY-VALUEJS at CW.md line 152: "CW Phase-2 sequences fourier's flip last alongside value.js's").
- **Phase 3**: retire transitional machinery — `dev.sh` sibling-watch retires; `useMetricResult as never` cast retires (CW-CARRY-E3); `useAsyncResource<T>` lifted to glass-ui (CW-CARRY-ASYNC-RESOURCE).
- **Phase 4**: CI matrix transition (per A4 §4 Phase 4).

### §4.4 — value.js's role per the seed

**CONSUMER, NOT AUTHOR.** Specifically:

- **CW-CARRY-VALUEJS** (CW.md lines 152-161): value.js contract-v2 patch HANDED OFF in AH W-HANDOFF; the workspace makes the `development` export condition moot (CW-precept 13 + A4 §3.3). value.js gets flipped LAST by its own team, in one commit, per A4 §5.1 option 2.
- **value.js is on E.W4 CW-preparation lane** per E's findings (AUD-4.4): "Reserve a sub-lane to make value.js CW-ready (verify peer-dep declarations + zero hard `dist/` aliases survive any workspace flip). Not E's to author."
- **CW-CARRY-E3 absorbs value.js indirectly**: `useMetricResult` cross-package vue-dedup. value.js does not declare pinia or import `useMetricResult`; this is a speedtest-side artifact of the dual `vue` resolution. The `as never` cast deletes by construction under one hoisted `vue`. (CW.md lines 103-110)
- value.js's tranche-cadence is preserved (CW precept 17: independent release cadences are preserved).

### §4.5 — Value.js-side preparation work that is NOT a 1-line flip

Per CW.md + the seed-references + post-RD-9 deps-value-js + RD3 explicit recommendations, this is the **non-1-line list** that E should treat as actionable on the value.js side:

| Item | What | Source |
|---|---|---|
| **Lockfile re-baseline** | `package-lock.json` records `0.5.1`; `package.json` records `0.6.0`. Any pnpm or npm install from CW would surface this. value.js must `npm install` once on master before CW touches the tree. | post-RD-9-deps-value-js §0 + §1 + §6.4 |
| **`vite-plugin-dts` audit** | Determine if `dts()` is invoked in `vite.config.ts`. If unused, REMOVE rather than lift to v5. | post-RD-9 §A.1 |
| **`vue-router` placement** | E's own findings AUD-5.7: `vue-router` is mis-placed as a runtime dependency in package.json — move to `devDependencies`. (CW will surface peer-dep validity at workspace install.) | E findings AUD-5.7 |
| **Verify `file:` links survive a flip rehearsal** | E.W4 CW-prep sub-lane is the right place. | E findings AUD-4.4 |
| **Pane→Card rename pre-flight (deferred)** | The RD3 §2 two-patch shape; **does NOT block CW** but pairs naturally with peer-quiescence. | RD3 §2.5 |

### §4.6 — When does CW expect each peer to migrate? Is there a published schedule?

**NO PUBLISHED SCHEDULE.** Per CW.md §Halt for synthesis:

- CW W0 itself is gated on:
  - (a) AH-CLOSE landing — **DONE** (`75af6060`, `f9cf8fc1`).
  - (b) Phase-0 quiescence preconditions (value.js's `tranche-b` AND fourier-analysis's `codex/contour-rebaseline` quiesced).
  - (c) Explicit user "open CW W0" signal.
- **(b) was not met at the seed time** (per post-RD-5 §1.1: "value.js current branch is `tranche-b` (not `master`)" — but this has SINCE shifted; per post-RD-9-deps-value-js §0 B5 correction, value.js's `tranche-b` is now MERGED into master at `eae8afc`, D-close v0.6.0).
- **(b) update at E's read-time**: value.js master is at `eae8afc + tranche-E open` (post-D close, v0.6.0); tranche-b merged. **Phase-0 quiescence on value.js side IS now nominally met** modulo the lockfile-staleness gate. fourier-analysis's status is not re-checked here (out of E's scope) but per post-RD-5 §1.1 was 91 dirty + on `codex/contour-rebaseline`.
- **(c) NOT met**: no "open CW W0" signal visible in speedtest's log.
- The "POST-AI" framing (post-RD-14 §9.1) suggests CW dispatch is post-AI-close — i.e., post the 15-wave AI plan completing. That puts CW in 2026-Q3+ at earliest.

---

## §5 — Tranche AH closed — what shipped + implications for value.js

### §5.1 — `glass-ui/tree` "AH.*" commits (Apr-May 2026 XR work in glass-ui's tree)

Per E findings AUD-4.6 + cross-repo grep verification: the `AH.*`-prefixed commits in glass-ui's own tree are speedtest's tranche-AH XR work (consumer-side coordination patches authored by speedtest's orchestrator), not glass-ui's own AH tranche. Glass-ui's own tranche letters at the time were N/Q.

### §5.2 — G-AH-D1 decision (predecessor for CW)

Per AH FINAL.md §3 (D1):

> D1 — monorepo workspace is a separate forward tranche (**CW**), not an AH wave — **confirmed; landed**. AH ratifies + seeds CW with `docs/audits/2026-05-19-pre-AH/A4-monorepo.md` as the design input.

So CW is the **direct successor** to AH for the monorepo work. CW.md scaffold lives because of G-AH-D1.

### §5.3 — AH outcomes that close value.js-side gaps

| AH outcome | value.js relevance |
|---|---|
| **W1 — glass-ui `@import "@mkbabb/glass-ui/styles.css"` SFC-scoped layer** (`f139bc89`) | This is glass-ui's `9275584` ship that E findings AUD-4.1 names as "the highest-priority near-term win". **AH ratified the SFC-scoped surface from speedtest's side; value.js can now ADD the compiled `./styles.css` subpath as a glass-ui import.** E.W0 Lane A absorbs the verification. |
| **W3-C — `defineAsyncComponent(Aurora)`** (`e72bb636` + R2-delta) | Closes speedtest's `App.vue` → Aurora → keyframes static edge. **Reveals**: glass-ui's barrel re-export of `useAnimatedNumber` keeps keyframes.js (~102 KB) statically reachable. **CW-CARRY-BARREL** is the cross-repo fix. **value.js is unaffected** (value.js consumes glass-ui + keyframes.js via `file:` already; the consumer-side resolution is separate). |
| **W-HANDOFF — value.js contract-v2 patch verified-applied** | **CLOSED-VIA-PEER-LAND** confirmed at post-RD-5 §1.1: "value.js peer already adopted contract-v2 (`73fdabc` D.W1 L1-L5)". **value.js is already on contract-v2**; E findings AUD-2.7 correctly notes the `siblingFsAllowTransient` residual narrowly. |
| **W5-d — retire `@source "../../glass-ui/src"` relative-sibling escape** (`b0aa4729`) | Speedtest-side closure; the transitive `@source "../components"` from glass-ui's own `src/styles/index.css` bubbles through. **value.js's E.W0 Lane A should verify**: does value.js's own `style.css` have an analogous relative-sibling `@source` escape? (Quick grep; trivial verification.) |
| **W5-c — Tailwind `size-[var(--icon-*)]` → `size-icon-*` sweep** | The 4 residual glass-ui-upstream warnings (`NumberFieldIncrement`, `NumberFieldDecrement`, `HeaderRibbon`) — speedtest-side complete; cross-repo carry to a future glass-ui tranche. **value.js could quickly grep its own demo for the same pattern** as a defensive sweep — but not E-blocking. |
| **W4-A — `vue 3.5.11 → 3.5.34`** | Retires the upstream `[Vue warn] readonly` pervasive issue. **value.js should align to `^3.5.34`** in its next dep sweep (currently `^3.5.18` per post-RD-9-deps-value-js §5.1). Folds into E.W4 tooling refresh. |
| **W-HANDOFF in-flight from AH** | All three patches (value.js contract-v2, fourier-analysis contract-v2, fourier 31-site phantom) verified `EXIT 0` at W-HANDOFF authorship. value.js's is **CLOSED-VIA-PEER-LAND** (no action). |

---

## §6 — Cross-repo audit — speedtest commits that affect value.js / glass-ui / keyframes.js / fourier-analysis

Full grep output processed; deduplicated to cross-repo-affecting commits in chronological order (newest first). Per-commit action + reciprocal expectation on value.js.

| SHA | Message (head) | Cross-repo target | Action | Reciprocal expectation on value.js |
|---|---|---|---|---|
| `7d9211fd` | `docs(AI): §11 constellation-wide scope expansion — W8-W13 fold all peers + GA majors` | ALL peers | AI proposes to **directly execute** dep-lift writes across all 7 repos per the §11 precept-13 override | **HIGH duplication risk** if E.W4 does the same work. value.js's SAFE-MINOR sweep + LOCKSTEPs are scheduled here. |
| `9f3ffca6` | `docs(AI): §10 constellation dep-lift coordination — 12 lanes (C1-C6 + D1-D6) + W7 + 8 W-LOCKSTEP specs` | ALL peers | AI publishes per-peer dep specs + lockstep specs | **PUBLISHES SPECS only** at this SHA; the §10 framing was publish-only per precept 13. The §11 override (`7d9211fd`) is what flips to "AI executes". |
| `9d22bcdf` | `docs(AI): §9 W6 Vite-upgrade ruthless wave — speedtest catch-up to v7.3.3` | speedtest-only (per post-RD-8 §5.1) | speedtest W6 lift | **value.js NOT touched.** value.js already at `^7.0.6`; falls out at fresh install. |
| `497fcf4e` | `docs(AI): correction 2.5 — CardHeader naming alignment; absorb value.js shrink behavior into existing primitive` | glass-ui (W1 destination) + value.js (W-HANDOFF surface) | AI corrects: no new `PaneHeader` primitive; `<CardHeader shrink>` enhancement absorbs value.js's behavior; value.js performs rename via W-HANDOFF | **value.js side**: ~38-site rename surface (RD3 §1.6). E can defer this to a successor tranche per E findings §3 "the 7 standing glass-ui asks remain blocked on glass-ui's successor tranche". |
| `330c4aff` | `docs(AI): capture user corrections (3) — Card recipe canon + value.js verification + anti-duplication ceiling` | glass-ui + value.js | AI ratifies Card recipe IS the canon (value.js already proved); anti-duplication ceiling 1-2 sources per page | **value.js side**: NONE — value.js panes already pass anti-duplication audit per RD3 §7.2. |
| `61079cb1` | `merge(CW seed): R5-beta — tranche CW scaffold (monorepo workspace transposition; G-AH-D1 successor)` | ALL peers (CW founding) | CW seed merges to speedtest master | **value.js side**: prepare for CW Phase-2 consumer flip (deferred; not E's to execute). E.W4 CW-prep sub-lane reads-only. |
| `75af6060` | `merge(AH.W-CLOSE): R5-alpha — AH close ceremony` | (closes AH) | AH closes | **value.js W-HANDOFF carries**: contract-v2 = CLOSED-VIA-PEER-LAND; Pane→Card = leave-with-them (CW-bound or successor). |
| `a11e16ed` | `merge(AH.W3-C): R2-delta — defineAsyncComponent Aurora + rIC gate (Aurora→keyframes static edge closed; glass-ui→keyframes edge surfaces as cross-repo concern for AH chronic-delta)` | glass-ui + keyframes.js (carries) | Speedtest-side defer; surfaces CW-CARRY-BARREL | **value.js side**: NONE direct. value.js's own Aurora usage in `demo/` is `<HeroBlob>` (via GooBlob) — separate component path. |
| `b0aa4729` | `fix(styles)/AH.W5-d: retire @source "../../glass-ui/src" relative-sibling escape (FA-7 F1)` | (speedtest internal) | speedtest closes its half | **value.js side**: verify same pattern doesn't exist in value.js's `style.css` — quick grep; defensive. |
| `f139bc89` | `feat(styles)/AH.W1: @import @mkbabb/glass-ui/styles.css — SFC-scoped surface` | glass-ui (publisher half already shipped pre-AH) | speedtest adopts the compiled `./styles.css` subpath | **value.js side**: E.W0 Lane A — verify value.js can ADD the compiled subpath similarly (closes AUD-2.7 + AUD-4.1). |
| `6a8522f1` | `docs(AG): W3 + GU2 + GU3 closed — plan-of-record status + fourier handoff patch` | fourier-analysis | AG produced fourier handoff patch | **value.js side**: NONE direct. |
| `79d27178` | `docs(AG): W-PERF + GU0 closed — plan-of-record status + value.js handoff` | value.js | AG produced a value.js handoff patch (precursor to AH's verified-handoff bundle) | **value.js side**: CLOSED-VIA-PEER-LAND at value.js D.W1. |
| `27b0c0cf` | `perf(speedtest/build): de-monolith entry chunk — framework + glass-ui manualChunks (AG.W-PERF.L1)` | (speedtest internal) | manualChunks split | none |
| `d8a004dc` | `fix(dashboard): migrate retired <ScrollPane> to the <Card tier=wash> recipe (glass-ui Q.W6)` | glass-ui (consumer-side update) | speedtest adopts the Card recipe | **value.js side**: value.js had already adopted at B.W2 `4fde60e` — leads the constellation on this idiom. |
| `b33f58b0` | `fix(resolution): adopt cross-repo dev-resolution contract consumer half (glass-ui Q.W1 Lane G)` | glass-ui (contract-v2) | speedtest adopts contract-v2 consumer half | **value.js side**: value.js D.W1 `73fdabc` adopted the same. |
| `8d98a955` | `merge(W8e): AB+1 5-of-9 subset — FlowSelector + MetricCell + B7 + ResponsiveTabs + Path B hoist + glass-ui v1.7.0` | glass-ui | speedtest consumes glass-ui v1.7.0 | none |
| `a98fccad` | `docs(design): Living UI canon re-codification — consolidated narrative + glass-ui v1.6.0 token reference matrix (AC.W8d closes §15 Option A)` | glass-ui | speedtest tokens-canon work | none |
| `e88b85b6` | `merge(W6e): release ceremony — glass-ui AC.W6 cohort cross-reference + retro tags v1.5.0 + v1.5.1` | glass-ui | speedtest consumes glass-ui v1.5.x | none |
| `71935ab3` | `docs(AC/W6e): release ceremony — glass-ui v1.5.x + v1.6.0 cohort cross-reference (closes AC.W6e)` | glass-ui | release coordination | none |
| `bac3adf0` | `chore(lockfile): sync to glass-ui v1.6.0 (AC.W6d primitives cohort)` | glass-ui | speedtest lockfile bump | value.js consumes glass-ui via `file:` link — bypasses registry; this lockfile event does not propagate. |
| `a0cce51f` | `feat(preset/brand): activate self-host brand-uniform-sans via glass-ui v1.5.0 (AC.W6b consumer)` | glass-ui | speedtest font work | none |
| `105ee621` | `refactor(consumers/darkmode): rename useDarkModeSync → installDarkModeSync (glass-ui v1.4.0 API)` | glass-ui (API rename) | speedtest adopts the renamed API | **value.js side**: if value.js uses `useDarkModeSync`, may need to rename to `installDarkModeSync` at glass-ui v1.4.0+ consumption. Quick grep would confirm. |
| `8bafbb49` | `fix(vite): worker.plugins HMR carve + keyframes modulepreload drop (AC.W4 §B11 + §T0a)` | keyframes.js | speedtest's worker carve + keyframes modulepreload | none direct; value.js doesn't ship workers. |
| `cb5854b4` | `docs(audit AC-r3): GU-FONT — speedtest fonts + glass-ui canon (READ-ONLY)` | glass-ui | audit only | none |
| `b7173fb7` | `build(vite/freshness): wire glass-ui assertDistFresh into vite.config.ts (glass-ui N.W0 Lane A5)` | glass-ui | speedtest adopts `assertDistFresh` | **value.js side**: value.js's pre-A modernization already adopts the freshness pattern; verify at E.W0. |
| `9f36b55f` | `docs(AB/PROGRESS): close AB.W7 — keyframes.js consumed at v2.1.0 + bundle carve landed` | keyframes.js | speedtest pins v2.1.0 | value.js pins v2.1.x via `file:` link; falls out at fresh install. |
| `4ec22b97` | `perf(vite): split keyframes.js manualChunks per consumer (closes 5-tranche bundle-carve deferral)` | keyframes.js | speedtest manualChunks split | none |
| `93693db6` | `chore(deps): consume keyframes.js v2.1.0 — settled at AB.W6 tag` | keyframes.js | speedtest pins v2.1.0 | value.js may need a parallel pin bump per E AUD-2.8 (D-02 — keyframes.js post-v0.6.0 consumption); ROUTED. |
| `3f7c0d7a` | `docs(AB/W6): close — keyframes.js settled at v2.1.0 + disposition transcript` | keyframes.js | release coordination | none |
| `949bfa87` | `docs(AB/W4): close — B5 honesty + regression triage + 9-cell visual matrix + glass-ui v1.1.0` | glass-ui | speedtest v1.1.0 consumption | none |
| `586a1b26` | `fix(speedtest/dock): apply --shadow-dock-override consumer canon (B5 honesty close) + glass-ui v1.1.0` | glass-ui | speedtest adopts dock-shadow canon | none |
| `c6f1ccb9` | `docs(AA/W5): keyframes.js operator-handoff — 4th-tranche escalation` | keyframes.js | handoff | none |
| `e21b11a7` | `chore(AA/W3.5): drop CLOSE.md from repo root + reconcile glass-ui 1.0.2 → 1.0.3 lockfile` | glass-ui | speedtest lockfile bump | none |
| `40a0e766` | `feat(speedtest/typography): adopt --type-display-audacious/hero for hero + result-value ceilings (B-audacious; A3 SF1+; glass-ui v1.0.3 consumer)` | glass-ui | speedtest tokens-consumption | none |
| `28fef8fd` | `docs(AA/W1/artefacts): glass-ui patch diff + continuous story render + aria-valuenow test pass + changelog evidence` | glass-ui | audit only | none |
| `1f3653c2` | `chore(deps/lockfile): reconcile @mkbabb/glass-ui 1.0.0 → 1.0.2 reference` | glass-ui | speedtest lockfile bump | none |
| `27bc1438` | `docs(Z/W4): DEFER-FORWARD — keyframes.js operator WIP unchanged across Y→Z span` | keyframes.js | defer | none |
| `07d6d0ff` | `docs(Z/PROGRESS): close Z.W2 — glass-ui canon + speedtest adoption` | glass-ui | speedtest adoption | none |
| `2e2534d9` | `docs(Y/W3): DEFER-TO-Z — keyframes.js operator WIP not settled` | keyframes.js | defer | none |
| `68839f02` | `chore(deps/lockfile): reconcile glass-ui 0.9.3 → 1.0.0 reference` | glass-ui | lockfile | none |
| `98f88325` | `feat(deps): adopt glass-ui v1.0 — subpath migration for vueuse-bearing symbols` | glass-ui | speedtest subpath migration | value.js may parallel-need; per E AUD-4.1 the analogous v1.0+ migration is the ./styles.css subpath. |
| `fbd1d9a9` | `docs(audits/Y/A3): glass-ui v0.9.3 post-K-close inventory + L tranche material` | glass-ui | audit | none |
| `fcd93350` | `chore(deps): refresh lockfile against glass-ui v0.9.3 link (X.W3.c re-link)` | glass-ui | lockfile | none |
| `6f412d89` | `docs(W/W3/b1): K.WS Phase 1 outcome annotation — glass-ui v0.9.3 ships additive subpath; SCC trap deferred to v1.0` | glass-ui | audit | none |
| `e46b8aba` | `docs(audits/X.A3): glass-ui drift + K.WS scope + speedtest consumer surface` | glass-ui | audit | none |
| `dcdd4cea` | `chore(deps): bump @mkbabb/glass-ui to ^0.9.2 — fixes freshness root-barrel leak + cn rewrite` | glass-ui | speedtest bump | none |
| `94ea290f` | `perf(deps): trace vaul-vue path; route to glass-ui v0.9.2 follow-up` | glass-ui | trace audit | none |
| **`bab2a6de`** | **`perf(utils): inline value.js helpers — drop @mkbabb/value.js dep`** | **value.js (dependency dropped)** | **speedtest dropped its `@mkbabb/value.js` runtime dep**, inlining the helpers it used. **value.js IS NOT A RUNTIME DEP OF SPEEDTEST.** | **HIGH SIGNAL FOR E**: speedtest does NOT consume value.js's library API. The only cross-repo edges left are: (a) speedtest reads value.js's design idioms (PaneHeader, scroll-driven shrink) as patterns; (b) value.js is one of the constellation peers CW will overlay. **value.js's published library API is consumed by glass-ui (no — see RD3) + keyframes.js (via file: link, dev-time) + fourier-analysis (via registry pin `^0.4.6`). Speedtest is NOT a runtime consumer.** |
| `8cb06d5c` | `refactor(AppSettingsButton): consume ScrollingText from @mkbabb/glass-ui — drop local SFC` | glass-ui | speedtest consumes ScrollingText from glass-ui | none |
| `13b233ef` | `chore(deps): bump @mkbabb/glass-ui to ^0.9.1 — pull ScrollingText + freshness helper` | glass-ui | speedtest bump | none |
| `98cf42f0` | `docs(tranches/W/waves): W.W2 spec — glass-ui v0.9.1 (ScrollingText lift + prebuild gate + Section story + StorySection sweep)` | glass-ui | spec | none |

### §6.1 — Cross-repo audit headline

**Speedtest does not consume value.js at runtime** (per `bab2a6de`: "drop @mkbabb/value.js dep"). The cross-repo edges between speedtest and value.js are exclusively:

1. **Design idiom borrowing** — speedtest's W1 SurveyWizard refactor adopts value.js's pane-recipe pattern (the Card tier=wash recipe + the PaneHeader shrink behavior). value.js is the LEAD on these idioms.
2. **Constellation membership** — value.js is one of 7 peers CW will overlay. value.js will participate as a CONSUMER, not author.
3. **AI's §11 constellation expansion** — AI proposes direct execution of dep-lift writes into all 7 repos. Value.js participates as one of the lift targets (W8-CR-β SAFE-MINOR + W9 LOCKSTEPs).

**fourier-analysis IS a runtime consumer of value.js** (pinned `^0.4.6`, per E findings AUD-4.8). **keyframes.js IS a `file:` consumer of value.js** (per post-RD-9-deps-keyframes-js §0).

---

## §7 — Duplication-risk map per E's route-forward items

E's findings §3 (lines 70-78) enumerates 9 named-destination items + 6 ROUTED items in the §2 table = ~13 items the prompt loosely calls "14 route-forward items". I map each to a duplication-risk verdict.

| # | Item (per E findings) | Disposition in E | Speedtest activity? | Duplication-risk verdict |
|---|---|---|---|---|
| 1 | **AUD-2.3 / A-19 — gh-pages secrets contention** | route forward (tooling/infra) | NONE — speedtest deploys via CF Pages, not GH Pages | **SPEEDTEST INACTIVE — VALUE.JS CAN ACT** (but tooling-class, not E's critical path; route forward retained) |
| 2 | **AUD-2.8 / D-02 — keyframes.js post-v0.6.0 consumption** (pin bump + AnimationOptions rename + Color.L migration) | route forward (keyframes.js's own schedule) | NONE in speedtest's tree; keyframes.js team owns | **ORTHOGONAL** — route forward |
| 3 | **AUD-2.11 / D-05 — L13 k-means convergence tune** | route forward (bench-gated perf) | NONE | **SPEEDTEST INACTIVE** — value.js can act when bench evidence surfaces; route forward retained |
| 4 | **AUD-4.3 — 7 standing glass-ui D-filed primitive/blob gaps** (metaballs, BlobDot, deriveAuroraPalette, `<Tabs variant="underline">`) | route forward (glass-ui successor tranche) | NONE — RD3 §3.7 explicitly confirmed ZERO net-new glass-ui surface from this audit; AI W1 surface narrows to `<CardHeader shrink>` only | **ORTHOGONAL — glass-ui successor tranche owns**; route forward unchanged |
| 5 | **AUD-4.4 — Speedtest CW seed; value.js is CONSUMER not author** | E.W4 (CW preparation) + coordination/Q.md | CW SEEDED only — Phase-0 quiescence not user-signaled; no Phase-1 imminent | **ORTHOGONAL — speedtest is the author, value.js is the consumer. E.W4 sub-lane reads-only.** Fold as planned. |
| 6 | **AUD-4.5 — Vite 7.3.3 upgrade in speedtest AI W6; value.js on `^7.0.6`** | E.W4 tooling refresh | AI W6 PLANNED, NOT EXECUTED. Speedtest-only catch-up per post-RD-8 §5.1. value.js already at `^7.0.6`. | **SPEEDTEST INACTIVE on value.js's lockfile.** value.js's `npm update` will pick up 7.3.3 naturally. **VALUE.JS CAN ACT.** Fold as planned in E.W4. |
| 7 | **AUD-4.7 — keyframes.js precept-pin drift on a divergent precepts tree** (458c2d1 NOT mkbabb/precepts upstream) | coordination/Q.md (tracked anomaly) | NONE | **ORTHOGONAL** — cannot fix from value.js; tracking only |
| 8 | **AUD-4.8 — fourier-analysis consumes value.js easings (5 files); ZERO v0.6.0 breakage; on `^0.4.6` registry pin** | coordination/Q.md | NONE in speedtest's tree | **ORTHOGONAL** — no E action |
| 9 | **AUD-5.15 — `getComputedValue` memo-key nested WeakMap** | route forward (P3 perf) | NONE | **SPEEDTEST INACTIVE** — value.js can act if bench evidence surfaces; route forward retained |
| 10 | **Aurora derive-from-color + blob extirpation** (precept-§10 blocked) | route forward (glass-ui successor) | NONE — glass-ui's post-Q-close window shipped 5 commits; none of the 7 D-filed asks | **ORTHOGONAL — glass-ui owns**; route forward unchanged |
| 11 | **The 7 standing glass-ui primitive/blob gaps + `<Tabs variant="underline">` + `BlobDot` + `deriveAuroraPalette`** (same routing as #4) | route forward (glass-ui successor) | NONE | **ORTHOGONAL** — duplicate of #4; route forward unchanged |
| 12 | **CW (speedtest monorepo workspace transposition)** — author-side | route forward to E.W4 sub-lane (reads-only); coordination/Q.md | CW SEEDED only | **ORTHOGONAL — speedtest authors, value.js consumes.** E.W4 sub-lane as planned. |
| 13 | **The keyframes.js post-v0.6.0 consumption update** | route forward (keyframes.js's own schedule) | NONE | **ORTHOGONAL** — duplicate of #2 |
| 14 | **The ~126 generated shadcn-vue typecheck cluster** | E.W4 vendor-policy lane | NONE in speedtest's tree | **VALUE.JS CAN ACT independently.** Fold as planned in E.W4. |

### §7.1 — High-stakes items NOT in E's route-forward list that speedtest is ACTIVELY proposing to touch in value.js

These are the **AI §11 constellation-execution proposals**. They are NOT in E's findings §3 but they are **active speedtest proposals against value.js's tree**:

| # | Speedtest proposal | Speedtest evidence | Duplication risk for E |
|---|---|---|---|
| W8-CR-β | **value.js SAFE-MINOR sweep** (~22 deps: `vue` 3.5.18→3.5.34, `@vueuse/core` 14.2.1→14.3.0, `@playwright/test` 1.58.2→1.60.0, `@tailwindcss/*` 4.1.11→4.3.0, `prettier` 3.6→3.8, `tw-animate-css` 1.2.5→1.4.0, `tailwind-merge` 3.3→3.6, `reka-ui` 2.0.0→2.9.7, etc.) | post-RD-9-deps-value-js §7 Group B; §11 escalates to direct execution | **HIGH — overlaps E.W4 tooling refresh**. Recommended: **E.W0 verifies the §11 ratification status; if NOT ratified, E folds the SAFE-MINOR sweep into E.W4. If RATIFIED, E reads-only and lets speedtest drive — but value.js is on `master` + clean tree, so value.js is the natural owner per CW precept 14.** |
| W9-A | **value.js vue-tsc 2.2.0 → 3.3.1 lockstep** | post-RD-11 §SL-vt-2 | **MEDIUM — value.js is one of 5 lift targets**; cross-repo coordination needed. Defer per E findings AUD-4.4 framing (value.js is CONSUMER for lockstep dispatch) UNTIL speedtest signals ratification status. |
| W9-D | **value.js vitest 3.2.4 → 4.1.7 lift** | post-RD-13 §A: "0 break-touchpoints in value.js — manifest range bump + lockfile regen" | **MEDIUM** — value.js is constellation laggard with keyframes.js. Defer to W-LOCKSTEP, but if AI's W9-D is unratified at E.W4 dispatch, value.js can do it independently (post-RD-13 confirms zero touchpoints). |
| W9-B | **value.js reka-ui 2.0.0 → 2.9.7 lift** (9 minors behind) | post-RD-9-deps-value-js §5.7 | **MEDIUM** — value.js demo-only; mechanical per speedtest's A8 precedent. Fold to E.W4 if speedtest's W9-B is unratified. |
| W9-F | **value.js @types/node ^24 → ^25.9.1 lift** | post-RD-9-deps-value-js §3 MAJOR-LIFT | **LOW — defer constellation-wide.** Only acts if `engines.node` lifts past 22; value.js currently declares `>=22`. |
| W1 consumer-side | **value.js Pane→Card rename** (~38 sites) | RD3 §1.6 + §2 (W-HANDOFF protocol) | **LOW — gated on glass-ui's `<CardHeader shrink>` shipping.** Glass-ui successor tranche owns this; value.js is consumer. Per E findings §3 "the 7 standing glass-ui asks remain blocked". |

---

## §8 — Fold-back recommendations for E

Items the assay identifies as safely foldable by value.js with no duplication risk, OR with risk-management notes:

### §8.1 — Pure folds (no duplication risk)

| Fold item | E wave + lane | Evidence (speedtest-side) | Rationale |
|---|---|---|---|
| **F1 — Move `vue-router` from `dependencies` to `devDependencies`** | E.W1 Lane A (legacy-clean) | RD3 §3 + post-RD-9-deps-value-js §3 implicitly | Pure value.js-internal hygiene; speedtest does not touch value.js's package.json. |
| **F2 — Lockfile re-baseline (`package.json` 0.6.0 vs lockfile 0.5.1)** | E.W0 Lane A or housekeeping | post-RD-9-deps-value-js §0 + §1 + §6.4 | Confirmed by speedtest's RD9 audit; **AI does not write to value.js's lockfile** at any commit visible in the log. value.js must run `npm install` from master before any major work. **Speedtest INACTIVE on this exact action**; value.js owns. |
| **F3 — Verify `@import "@mkbabb/glass-ui/styles.css"` compiled subpath consumable** | E.W0 Lane A | AH W1 ship (`f139bc89`) — glass-ui publisher half landed pre-AH | value.js can ADD the compiled subpath without retroactive coordination; per AUD-4.1 the "highest-priority near-term win". |
| **F4 — Verify no `@source "../../glass-ui/src"` relative-sibling escape in value.js's `style.css`** | E.W0 Lane A | AH W5-d (`b0aa4729`) closed speedtest's side | Quick grep; defensive verification. Speedtest is INACTIVE on value.js's CSS source. |
| **F5 — Bump `vue ^3.5.18 → ^3.5.34`** | E.W4 tooling refresh | AH W4-A (`cb002f57`) | Retires upstream `[Vue warn] readonly` regression. value.js is laggard. Falls out of `npm update`. **Speedtest INACTIVE on value.js's package.json** (until/unless §11 W8-CR-β is ratified — see §8.2). |
| **F6 — Bump `vite ^7.0.6 → ^7.3.3`** | E.W4 tooling refresh | post-RD-8 §5.1 (speedtest-only W6) | value.js's `npm update` picks up 7.3.3 naturally within the `^7.0.6` range. No source touch. **Speedtest's W6 only touches speedtest's lockfile.** |
| **F7 — Bump `@vitejs/plugin-vue ^6.0.0 → ^6.0.7`** | E.W4 tooling refresh | post-RD-9-deps-value-js §3 SAFE-PATCH | 7 patches behind; mechanical. **Speedtest INACTIVE on value.js.** |
| **F8 — Bump `@vueuse/core` + `integrations` 14.2.1 → 14.3.0** | E.W4 tooling refresh | post-RD-9-deps-value-js §3 SAFE-MINOR | Mechanical minor; 30+ demo SFCs consume. **Speedtest INACTIVE.** |
| **F9 — Bump `@playwright/test ^1.58.2 → ^1.60.0`** | E.W3 testing hardening | post-RD-9-deps-value-js §5.11 | Pairs with the smoke-safari + 14-spec interactive-flow expansion already in E.W3. |
| **F10 — `katex 0.16.22 → 0.16.47`** (25 patches behind) | E.W4 tooling refresh | post-RD-9-deps-value-js §3 SAFE-PATCH | Mechanical patch sweep. |
| **F11 — `prettier 3.6.2 → 3.8.3`** | E.W4 tooling refresh | post-RD-9-deps-value-js §3 SAFE-MINOR | Mechanical. |
| **F12 — Defensive verify CW Phase-0 quiescence preconditions on value.js side** | E.W4 CW-prep sub-lane | CW.md precept 14 + post-RD-9-deps-value-js §0 B5 correction | value.js's `tranche-b` already merged into `master` at `eae8afc`; clean tree per current state. Verify still true at E execution. **No active speedtest write to disrupt this.** |

### §8.2 — Risk-managed folds (active speedtest proposal — verify ratification at E execution)

| Fold item | E wave + lane | Risk | Action |
|---|---|---|---|
| **R1 — `reka-ui 2.0.0 → 2.9.7` (9 minors behind)** | E.W4 tooling refresh | AI's W9-B proposes the lift constellation-wide; AI may execute directly per §11 override | **Verify W9-B ratification at E.W4 dispatch.** If AI not yet ratified, value.js does it itself (speedtest's A8 audit precedent shows the lift is mechanical). If AI ratified + dispatched, defer to LOCKSTEP coordination. |
| **R2 — `vitest 3.2.4 → 4.1.7`** | E.W3 testing hardening (or E.W4) | AI's W9-D proposes the lockstep; **post-RD-13 §A confirms 0 break-touchpoints in value.js's test surface** | **VALUE.JS CAN ACT — zero risk per speedtest's own audit.** If AI dispatches first, defer; otherwise fold cleanly. |
| **R3 — `vue-tsc 2.2.0 → 3.3.1`** | DEFER per E findings §3 + post-RD-11 | AI's W9-A lockstep gated on glass-ui canary | **Defer per E findings.** Words/frontend is the canary; glass-ui must be first. Cross-repo coordination required; not E's. |
| **R4 — `lucide-vue-next ^0.525 → 1.0.0`** | E.W4 tooling refresh OR defer | AI's W9-C is the biggest LOC lockstep (~309 import edits across 6 repos) | **Defer to LOCKSTEP coordination.** The 1.0 stabilisation is a constellation-wide re-baseline; if value.js does it alone, it diverges. |
| **R5 — `@types/node 24 → 25`** | DEFER per post-RD-14 §6 + §9.1 | Coupled to TS 6 + Node 24 LTS + engines.node pin | **Defer constellation-wide.** value.js's `engines.node >=22` is binding; bumping types past Node 24 needs Node 24 engines pin coordination. |

### §8.3 — Items E should NOT fold (let speedtest or constellation drive)

1. **AI's Pane→Card consumer migration in value.js (~38 sites)** — gated on glass-ui's `<CardHeader shrink>` ship. Per E findings §3, this is "the 7 standing glass-ui asks remain blocked on glass-ui's successor tranche". Don't pre-empt.
2. **Aurora derive-from-color + blob extirpation** — precept-§10 blocked; routes to a glass-ui successor tranche post-glass-ui-ship.
3. **CW workspace flip itself** — speedtest authors; value.js consumes (Phase-2 last-flipped).
4. **`vue-router 4 → 5`** — keyframes.js is the canary; defer until keyframes.js has carried at least one tranche cycle on v5.
5. **TS 6** — full constellation move; value.js cannot lead.
6. **Vite 8 + Rolldown** — explicitly out of scope per post-RD-8 §3.3 and post-RD-14 §2.6; ~2026-Q4 at earliest.

### §8.4 — Fold-back count

- **12 PURE-FOLDS** (no duplication risk; speedtest INACTIVE on value.js's tree for the specific edit): F1-F12.
- **2 RISK-MANAGED FOLDS** that value.js can take ALONE because speedtest's own audit confirms zero break-surface: R1 (reka-ui) + R2 (vitest 4) — **fold defensively if W9 unratified at E.W4 dispatch**.
- **3 DEFER-TO-LOCKSTEP** (cross-repo coordination required): R3 (vue-tsc-3), R4 (lucide-rename), R5 (@types/node-25).
- **6 NOT-E'S** items per §8.3.

---

## §9 — Authority (SHA references + per-file sources read)

### §9.1 — Speedtest SHAs referenced

- `9d22bcdf` — speedtest master HEAD at orchestrator pre-flight (matches commit log entry).
- `7d9211fd` — §11 constellation-wide scope expansion (current planning amendment).
- `9f3ffca6` — §10 constellation dep-lift coordination.
- `9d22bcdf` (= §9 head) — W6 Vite-upgrade ruthless wave.
- `960fd85c` — §8 W3-R4 dev-cold ruthless optimization fold.
- `c51b132c` — quiet-load re-measurement (349ms canonical baseline).
- `ad728640` — §7 W0b post-RD audit cohort.
- `76e7d4ac` — §6 RD-cohort amendment.
- `45fb203a` — backfill 9-lane W0 cohort artefacts.
- `03625470` — RD-cohort cross-repo audit closes (6 lanes: RD1-RD6).
- `497fcf4e` — correction 2.5 (CardHeader naming alignment; absorb value.js shrink behavior).
- `330c4aff` — user corrections (Card recipe canon + value.js verification + anti-duplication ceiling).
- `70f153d7` — A-synthesis wave plan + G-AI-D decision board.
- `b21e7786` — open tranche AI (10-lane W0 cohort).
- `61079cb1` — CW seed R5-beta merge.
- `75af6060` — AH W-CLOSE R5-alpha merge.
- `f9cf8fc1` — AH FINAL.md + PROGRESS.md + status update.
- `ad68b7e0` — CW seed (initial scaffold commit).
- `bab2a6de` — **speedtest dropped `@mkbabb/value.js` runtime dep** (load-bearing finding for §6).
- `73fdabc` (value.js-side) — value.js D.W1 L1-L5 contract-v2 adoption (closes AH W-HANDOFF value.js carry).
- `eae8afc` (value.js-side) — Tranche D close v0.6.0 (current value.js master per E findings open).

### §9.2 — Per-file sources read in this assay

Inside `/Users/mkbabb/Programming/speedtest`:

- `docs/tranches/AI/AI.md` (190 lines)
- `docs/tranches/AI/artefacts/RD3-value-js-rename-duplication.md` (482 lines)
- `docs/tranches/AI/artefacts/post-RD-8-W6-vite-upgrade-wave-spec.md` (516 lines)
- `docs/tranches/AI/artefacts/post-RD-9-deps-value-js.md` (419 lines, all)
- `docs/tranches/AI/artefacts/post-RD-9-deps-glass-ui.md` (sampled, esp. §0-§5 cross-repo matrix)
- `docs/tranches/AI/artefacts/post-RD-9-deps-keyframes-js.md` (sampled, esp. §0 vitest constellation laggard finding)
- `docs/tranches/AI/artefacts/post-RD-10-cross-repo-dep-drift-matrix.md` (sampled, esp. §0-§2 master matrix)
- `docs/tranches/AI/artefacts/post-RD-11-W-LOCKSTEP-vue-tsc.md` (sampled, value.js SL-vt-2 sub-lane)
- `docs/tranches/AI/artefacts/post-RD-13-W-LOCKSTEP-vitest-and-pinia.md` (sampled, §A zero-touchpoint finding)
- `docs/tranches/AI/artefacts/post-RD-14-future-tranche-coordination.md` (398 lines, all)
- `docs/tranches/AI/artefacts/post-RD-5-cross-tranche-status.md` (sampled, esp. §1.1 value.js status)
- `docs/tranches/AI/artefacts/user-corrections-card-recipe-and-duplication.md` (233 lines, all)
- `docs/tranches/CW/CW.md` (223 lines, all)
- `docs/tranches/CW/seed-references.md` (94 lines, all)
- `docs/tranches/AH/FINAL.md` (459 lines, all)
- `docs/tranches/AH/AH.md` (sampled)
- `docs/tranches/AH/PROGRESS.md` (sampled)

Inside `/Users/mkbabb/Programming/value.js`:

- `docs/tranches/E/findings.md` (full, for cross-reference)
- `CLAUDE.md` (full, as context)

### §9.3 — Working-tree confirmation

speedtest `git status --short` not modified by this read. value.js working tree per E's open: branch `w.w2.1-value-js-prebuild`, ahead of master per pre-existing tracked changes; this assay adds exactly one new file: `docs/tranches/E/audit/E-FOLD-1-speedtest-assay.md` (this document). No source touched in either repo.

---

## §10 — Summary verdicts

### §10.1 — Per-tranche status

- **AI**: ACTIVE — planning, awaits G-AI-D1..D24 ratification. NO source touched yet; 15-wave plan amplified to constellation-wide execution per §11 override of precept-13 publish-only framing.
- **CW**: SEEDED — W0 NOT dispatched. Gated on Phase-0 quiescence + explicit user "open CW W0". value.js's side of Phase-0 is nominally clear (tranche-b merged into master, clean tree); fourier-analysis's status not re-verified here.
- **AH**: CLOSED — FINAL.md at `f9cf8fc1` ratified, R5-alpha merge at `75af6060`; W-FINAL deploy held at user-confirm gate per G-AH-D5.

### §10.2 — Per-item duplication-risk verdict (E's 14 route-forward items, summarized)

- **0 items** carry an HIGH duplication risk where value.js duplicates speedtest in a damaging way — every E route-forward item is either speedtest-INACTIVE on value.js's tree OR speedtest-ORTHOGONAL (CW author vs. consumer; glass-ui successor vs. E).
- **The HIGH-risk surface is OUTSIDE E's findings §3**: it's the AI §11 constellation-execution proposals that target value.js's package.json directly (W8-CR-β SAFE-MINOR sweep + W9 LOCKSTEPs). These are NOT in E's route-forward list but ARE in speedtest's active queue. E.W0 must verify the §11 ratification status before E.W4 dispatches.

### §10.3 — Fold-back count for E

- **12 PURE-FOLDS** that E can absorb with no risk: F1-F12 (see §8.1).
- **2 RISK-MANAGED FOLDS** that value.js can take alone if W9 is unratified: R1-R2 (see §8.2).
- **3 DEFER-TO-LOCKSTEP** items requiring cross-repo coordination: R3-R5 (see §8.2).
- **6 NOT-E'S** items per §8.3.

### §10.4 — One-line summary

**Speedtest's active tranches (AI + CW) do not write to value.js's tree as of `9d22bcdf` + `61079cb1`; the AI §11 amendment proposes cross-repo execution, but ratification is not signaled. E can safely fold the 12 pure-fold items (F1-F12) into its existing E.W0/W1/W3/W4 waves without duplicating speedtest work. The value.js shrink behavior is being ABSORBED into glass-ui's `<CardHeader shrink>` (good), not lost.**

---

**Deliverable path**: `/Users/mkbabb/Programming/value.js/docs/tranches/E/audit/E-FOLD-1-speedtest-assay.md`.

**End of E-FOLD-1 assay.** READ-ONLY; no speedtest source touched; no commits; no peer-repo writes.
