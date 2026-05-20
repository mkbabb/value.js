# E-AUDIT-4 — Cross-repo state at tranche-E open

**Tranche**: E (planning).
**Lane**: E-AUDIT-4 — cross-repo state audit across the `@mkbabb/*` constellation peers.
**Mode**: READ-ONLY. No mutating git operations in any repo. No `src/` edits. No peer-repo writes.
**Authored at**: 2026-05-20.
**Author posture**: this artefact informs tranche-E planning; ratification + dispatch belong to E's W0 substrate, not to this audit.

---

## §1 — Methodology

**Repos surveyed** (SHAs captured at probe time):

| Repo                    | HEAD SHA    | Branch / state                                                               |
|-------------------------|-------------|------------------------------------------------------------------------------|
| `value.js`              | `eae8afc`   | master (Merge tranche-b into master — D close v0.6.0); 6 commits ahead of `origin/master` (the D close push) |
| `glass-ui`              | `66e9b8f`   | master (`fix(tokens)/AH.W2-C: swap --chart-jitter and --chart-upload …`)     |
| `speedtest`             | `9d22bcdf`  | master (`docs(AI): §9 W6 Vite-upgrade ruthless wave — speedtest catch-up to v7.3.3`) |
| `keyframes.js`          | `0909177`   | master (`build: abrogate "development" export condition — contract-v2`)      |
| `fourier-analysis`      | `926ca6a`   | master (`fix(resolution): adopt cross-repo dev-resolution contract consumer half`); 1 commit ahead of `origin/master`; **dirty working tree** (≥3 modified files surfaced by `git status` — `.env.example`, `.gitignore`, `api/Dockerfile`, plus more truncated by output buffer) |
| `precepts/` (submodule) | `68d9b20`   | "contract-v2 — abrogate the `development` dev-resolution condition" — value.js, glass-ui both pinned here; origin/main is the same SHA (no upstream-ahead) |

**Dates**: all probes 2026-05-20 between 13:00 and 14:30 EDT. The D-close commit on value.js landed 2026-05-20 morning per `tag v0.6.0` at `7ac4ecc` (CommitDate in the FINAL ledger). Glass-ui's `66e9b8f` landed 2026-05-19 19:41 EDT; speedtest `9d22bcdf` landed 2026-05-20 12:12 EDT (mid-W0 planning); keyframes.js `0909177` landed 2026-05-19 01:39 EDT; fourier-analysis `926ca6a` landed 2026-05-18 21:51 EDT (the contract-v1-condition addition; pre-dates value.js D-close).

**Sources of evidence**: `git log`, `git submodule status`, `git status`, direct reads of `docs/tranches/AH|AI|CW/*.md` in speedtest, package.json/lockfile snippets, the speedtest `post-RD-9-deps-{value-js,fourier-analysis,keyframes-js,glass-ui}.md` artefacts (each is 30-50KB of evidence already authored against the same SHAs).

**The opening brief's framing CORRECTED**: the user's directive named glass-ui's recent commits `66e9b8f`, `0124a8b`, `9275584`, `e2e5303`, `ce5aad8` as "AH.W2-C", "AH.W5-e", "exports", "aurora Safari", "contract-v2" respectively, and asked the audit to inspect `glass-ui/docs/tranches/AH/`. **There is no `glass-ui/docs/tranches/AH/` directory.** Glass-ui's tranche directory contains AB, AB+1, AB+2, C, D, D-II, E, F, H, I, J, K, L, M, N, O, P, Q, V — no AH. The `AH.*` commit prefixes on glass-ui are **speedtest AH-tranche cross-repo work** that was authored and committed in glass-ui's tree by orchestrator-managed worktrees during speedtest AH's wave execution. Glass-ui's own most recent closed tranche is **Q** (closed at `4b16de7 feat(tranche-q/W6): Q close — strengthened audit + phantom-class gate + precept advance (v1.9.2)` on 2026-05-18 23:29). The `ce5aad8` "contract-v2" commit is glass-ui Q.W1's post-close substrate work (it lands AFTER the Q close commit `4b16de7` chronologically in glass-ui's master log per `git log` output). This audit treats the 5 glass-ui commits as **the post-Q-close cohort**, not as an AH tranche.

---

## §2 — glass-ui post-Q-close cohort (the 5 recent commits)

### §2.1 The 5 commits decomposed

| SHA       | Date         | Subject                                                                                                           | Type       | Contract-v2 / D-asked impact                                                                                                                                                                                                                                |
|-----------|--------------|-------------------------------------------------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ecd0679` | 2026-05-19 01:21 | `perf(aurora): lazy-arm — defer shader compile-link past first paint`                                          | perf       | unrelated to D-filings; pure aurora boot-time fix; no consumer breakage                                                                                                                                                                                       |
| `ce5aad8` | 2026-05-19 01:22 | `feat(glass-ui-core): contract-v2 — abrogate the "development" dev-resolution condition (v1.9.3)`               | substrate  | **This is the contract-v2 codification ship.** value.js D.W1 ported `scripts/proof-resolution-contract.mjs` from this commit (per D FINAL §2 D.W1 L1-L5 row). Closes the publisher half of the contract; the consumer half is each peer's own resolution-contract adoption. |
| `e2e5303` | 2026-05-19 01:34 | `fix(aurora): double-rAF the Safari post-paint fallback in scheduleAfterFirstPaint`                              | fix        | Safari aurora regression; affects value.js demo's aurora consumption — the goo-blob + atmosphere demo paths run through this fallback. **Benefit for value.js demo**: iOS-Safari boot fidelity on `useMetaballRenderer.ts`-adjacent surfaces.                          |
| `9275584` | 2026-05-19 17:54 | `feat(exports): add ./styles.css → dist/glass-ui.css for SFC-scoped surface`                                     | substrate  | **Closes the contract-v2 §2.1 keystone gap.** value.js D FINAL §8 explicitly named this gap ("Contract-v2 §2.1 keystone gap on glass-ui's `./styles` subpath; value.js's `vite.config.ts:siblingFsAllowTransient` is the consumer-side reciprocal; retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution"). **value.js can now retire its `siblingFsAllowTransient` transient carve-out.** |
| `0124a8b` | 2026-05-19 19:08 | `feat(tokens)/AH.W5-e: --motion-duration-* + --motion-delay-* canon`                                              | tokens     | Speedtest AH tranche work; introduces motion-duration / motion-delay canonical tokens at glass-ui's token surface. Adoptable by value.js's demo (the 51-token-utility surfacing at D.W4 Lane A may now consume these directly rather than via inline `--app-padding-x`-style locals). |
| `66e9b8f` | 2026-05-19 19:41 | `fix(tokens)/AH.W2-C: swap --chart-jitter and --chart-upload to match METRIC_DEFINITIONS truth (jitter=purple, upload=amber)` | fix        | Speedtest AH chart-jitter / chart-upload token fix. value.js does not consume `--chart-*` tokens directly; immaterial for value.js demo.                                                                                                                       |

### §2.2 "AH tranche" reality check (per §1 correction)

Glass-ui's tranches directory has no `AH/`. The `AH.W2-C`, `AH.W5-e` prefixes in commit subjects refer to **speedtest's AH tranche** (speedtest `docs/tranches/AH/` does exist and was closed at speedtest `61079cb1`). Glass-ui hosted the work under speedtest's XR sub-protocol (precept 13). Glass-ui's own tranches catalogue is Q (closed 2026-05-18) → no open tranche at glass-ui at the time of this audit; the 5 post-Q commits are substrate ships landed on master without a tranche envelope (per glass-ui's `4b16de7 ... precept advance` closing Q.W6 cleanly).

### §2.3 D-filed glass-ui asks — disposition

From value.js D FINAL §2 + `coordination/Q.md §3` + the original D-opening directive:

| D-filed ask                                                                  | Closed by post-Q cohort?                                                                                                                                                                                                                                       | Status            |
|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| 7 metaballs additions (the goo-blob extirpation surface)                     | **NOT addressed.** No glass-ui commit ships `<BlobDot>` / `<GooBlob>` / a metaballs primitive surface.                                                                                                                                                          | **STILL OPEN**     |
| `<BlobDot>` primitive                                                         | **NOT addressed.** Same.                                                                                                                                                                                                                                       | **STILL OPEN**     |
| `deriveAuroraPalette(color)` API                                              | **NOT addressed.** Aurora commits in the cohort touched perf (`ecd0679`) + Safari fallback (`e2e5303`) only; no derive-from-color surface lift.                                                                                                                  | **STILL OPEN**     |
| `<Tabs variant="underline">` provider family                                  | **NOT addressed.** Q close had a separate routing decision (per glass-ui Q-tranche close) to keep reka-ui Tabs; no underline-variant ship in the cohort.                                                                                                          | **STILL OPEN** (re-filed) |
| contract-v2 `./styles` subpath gap                                            | **ADDRESSED at `9275584`** — `./styles.css → dist/glass-ui.css` shipped. value.js can retire `siblingFsAllowTransient` in a follow-on commit.                                                                                                                       | **CLOSED**         |
| contract-v2 codification                                                     | **ADDRESSED at `ce5aad8`** — value.js D.W1 already ported the proof-resolution script and aligned `exports`. Consumer half complete.                                                                                                                              | **CLOSED**         |

### §2.4 New asks for value.js opened by the post-Q cohort

| Opening commit | Ask                                                                                                                                                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `9275584`      | **Adopt `./styles.css` subpath**: update value.js's demo Tailwind import path (or wherever `glass-ui/dist/glass-ui.css` is consumed) to use the new `@mkbabb/glass-ui/styles.css` subpath instead of any `@mkbabb/glass-ui/dist/glass-ui.css` deep-path import. **Retire `siblingFsAllowTransient`** in `vite.config.ts` once the demo build green-lights against the new subpath. |
| `0124a8b`      | **Adopt `--motion-duration-*` + `--motion-delay-*` tokens**: value.js's D.W4 Lane A surfaced 51 token reaches as Tailwind utilities; some animation-class durations were left as inline rem/ms values. Re-survey those against the new canon and migrate where the tokens semantically match.                                            |
| `e2e5303`      | **Verify Safari aurora boot**: re-run the D.W5 `smoke-mobile` Pixel-7 spec against the new glass-ui dist; the existing spec is Chromium-only (per D FINAL §7 "smoke-safari WebKit follow-up"). The Safari-fix benefit only materializes if value.js's demo loads the post-fix glass-ui.                                                |

### §2.5 Implications for value.js's demo consumption

- **No structural breakage**. The post-Q cohort is purely additive (`/styles.css`, motion-token additions) or fix-class (aurora perf, Safari fallback, chart-token color swaps). No glass-ui exports were removed; no `<Slot>` shape changed.
- **One transient simplification**: value.js's `vite.config.ts:siblingFsAllowTransient` carve-out (filed at D FINAL §8 as the keystone gap) is now retirable because `9275584` ships the SFC-scoped CSS surface contract-v2-compliantly.
- **No version bump required at glass-ui's side** — `ce5aad8` shipped v1.9.3; the cohort post-Q has not advanced to v2.0. value.js's `package.json` consumes glass-ui via `file:../glass-ui` (per dep audit `post-RD-9-deps-value-js.md` §1) so it sees `1.9.3` at-link; the registry version remains the published-`@^1.0.0` consumer-pinned version per other peer manifests.
- **Aurora derive-from-color value.js-side migration** — still blocked. The 5-commit cohort did NOT open a `deriveAuroraPalette` surface on glass-ui's side. value.js's `Dc-aurora.md §3` algorithm sketch + the grayscale carve remain forward-routed.

---

## §3 — speedtest AI tranche

### §3.1 AI scope + recent ships

Speedtest AI is mid-W0 planning (NOT execution). Per `speedtest/docs/tranches/AI/AI.md`:

- **Open ceremony**: `b21e7786 docs(AI): open tranche AI — 10-lane W0 cohort (6 audit + 4 frontend-design)` on 2026-05-19 21:56.
- **W0 cohort** (10 lanes; all parallel; all READ-ONLY): A1-A5 audits + FD1-FD4 frontend-design + A6 synthesis.
- **RD-cohort amendment** (2026-05-20 morning): 6-lane cross-repo rename + duplication audit (RD1-RD6); closes at `03625470`.
- **W0b post-RD audit cohort** (2026-05-20 evening): 6 parallel post-RD lanes + the AH W4 dev-cold-load investigation.
- **§8 W3-R4 ruthless dev-cold optimization fold** (2026-05-20 11:57): 349ms → 230ms target.
- **§9 W6 Vite-upgrade ruthless wave** (2026-05-20 12:12, the current HEAD): speedtest catch-up to Vite v7.3.3.

**Posture**: AI is **TRANCHE DEVELOPMENT ONLY** (per AI.md line 5 + the user's re-emphasis: *"This is NOT an implementation phase. Tranche development only"*). The G-AI-D1..D12 decision board is PROPOSED, awaiting user ratification. No source has been touched.

**Substantive AI wave plan** (from `post-RD-8-W6-vite-upgrade-wave-spec.md` + AI.md §9):

- **W1-W5**: 5 substantive waves (deep design + animation + glass-ui usage + mobile-desktop hierarchy + occlusion sweep).
- **W6** (NEW per §9): Vite upgrade ruthless — speedtest 5.4.8 → 7.3.3.
- **W-FINAL**: deployment ceremony (deferred 4-tranche-chronic from AE → AF → AG → AH).

### §3.2 Vite v7.3.3 upgrade — should value.js adopt?

**Direct answer: value.js is already on `vite ^7.0.6` and resolves to `7.3.1` at lock-time per `post-RD-9-deps-value-js.md` §1 + §4.2**. A patch lift to 7.3.3 is a one-line `package.json` bump (or zero-line if the lockfile-rebase picks it up at next `npm install`).

**Recommendation per `post-RD-9-deps-value-js.md` §8.2**: value.js's housekeeping wave (Group A.0 — npm install re-baseline) will deliver the 7.3.3 lift as a free side-effect, **provided it runs AFTER speedtest's W6-L1 ratifies 7.3.3 as the constellation parity floor**. Until then, value.js holding at `7.3.1` is harmless.

**No urgency**: nothing in value.js's D.W6 close blocks on 7.3.3. The CI was green at D close with 7.0.6/7.3.1. The lift is purely a parity gesture.

### §3.3 RD audit cohort — cross-cutting findings

Per the 6 RD lanes:

- **RD3-value-js-rename-duplication** (`docs/tranches/AI/artefacts/RD3-value-js-rename-duplication.md`, 37KB): cross-repo audit of names/symbols in value.js's surface that conflict with glass-ui/speedtest. The audit was authored against value.js's pre-D-close state; the **B5 finding** ("23 dirty files at HEAD `4d439bf` on `tranche-b`") was explicitly OVERRIDDEN by `post-RD-9-deps-value-js.md` §9.5 — value.js is now D-closed, working tree clean (except for E-tranche planning artefacts in flight).
- **CardHeader naming alignment** (`497fcf4e docs(AI): correction 2.5 — CardHeader naming alignment; absorb value.js shrink behavior into existing primitive`): user-corrected at 2026-05-20 00:02. This is **the "absorb value.js shrink behavior into existing primitive" finding** — see §3.5 below.
- **D11 carousel-double-home** (`post-RD-2-D11-carousel-analysis.md`): UI concern, not a value.js dep.
- **RD6 token-utility-drift**: cross-cuts the same surface value.js D.W4 Lane A addressed (51 tokens surfaced).

**Conclusion**: no RD-cohort finding flags a value.js regression OR opens a new actionable ask against value.js. The B5-staleness override is the most useful finding for tranche E (it confirms value.js is in a clean state at v0.6.0).

### §3.4 Dev-cold optimization — any value.js implications?

`post-RD-7-dev-cold-optimization.md` documents speedtest's cold-boot path: 1041 ms → 349 ms (per quiet-load re-measurement at `c51b132c`; the contract-v2 win is 2.98× cleaner than the original moderate-load-corrupted measurement) → targeting 230ms via 5 vectors (V1 retire unplugin-vue-macros: 85-95ms; V2a bypass npm-run in harness: 60-80ms; V3 .ts→.mjs config: 30-50ms; V4 drop unused SCSS: 5-15ms; V5 hoist build-only imports: 10-20ms).

**Value.js implications**:

- V1 (`unplugin-vue-macros` retire): **does NOT apply** — `unplugin-vue-macros` is NOT in value.js's package.json (verified at `post-RD-9-deps-value-js.md` §1).
- V2a (npm-run harness bypass): general optimization; if value.js sees similar bench shape, can adopt; not critical.
- V3 (.ts → .mjs config): value.js's `vite.config.ts` is already `.ts`; conversion to `.mjs` would skip the TS pre-typecheck. Adoptable but low-payoff.
- V4 (SCSS drop): **value.js already dropped Sass** (per `MEMORY.md` migration phase 1). N/A.
- V5 (build-only import hoist): adoptable but low-priority.

**Net**: the dev-cold optimization findings are speedtest-specific. value.js's dev-cold is already healthy (no benchmark filed; D close did not flag a cold-boot regression).

### §3.5 "Absorb value.js shrink behavior into existing primitive"

`497fcf4e docs(AI): correction 2.5 — CardHeader naming alignment; absorb value.js shrink behavior into existing primitive`.

This is **a speedtest-side correction**, not a value.js write. Per the AI synthesis line 8: *"correction 2.5 — CardHeader naming alignment; absorb value.js shrink behavior into existing primitive"*. The reading: speedtest's RD-3 lane proposed introducing a new primitive in glass-ui to express "value.js's shrink behavior" (the demo's pane-collapse / palette-card-shrink semantic). The user corrected: **do not introduce a new primitive — absorb the behavior into an existing glass-ui primitive** (likely a Card variant or a glass-ui DataGrid responsive-projection behavior, per `post-RD-9-deps-glass-ui.md` and the chart `1c6c3e5 feat(data-table): responsive card-per-row projection at narrow widths`).

**Implication for value.js**: ZERO immediate write asks. The "absorb" is a glass-ui design-system concern; value.js's demo will receive the benefit transparently when glass-ui ships the absorbed variant. Track in tranche-E filings as a glass-ui-blocked successor item.

---

## §4 — speedtest CW seed (the LARGEST constellation-wide change)

### §4.1 CW scope

Per `speedtest/docs/tranches/CW/CW.md`:

- **Tranche name**: CW (chronological-W-after-AH). Seeded by AH-R5-beta on 2026-05-19.
- **Predecessor**: AH (closed at speedtest `61079cb1`). CW is AH's successor per G-AH-D1.
- **Scope**: **the pnpm-workspace overlay** — 7 repos, 7 release cadences, one `constellation/` root with `pnpm-workspace.yaml`. Grade A (overlay) preserves 7 git histories; grade B (true monorepo) is OUT OF SCOPE per A4 §2.1.
- **Design seed**: `docs/audits/2026-05-19-pre-AH/A4-monorepo.md` (281 lines; verified at AH-R5-beta authorship time; not re-read by this audit but referenced via `CW.md`).
- **Posture**: POSTURE: PLANNING — CW W0 is NOT dispatched. CW.md is the scaffold; the W0 audit cohort opens on CW's own next move (NOT AH's).

### §4.2 Proposed monorepo shape

From `CW.md` and `seed-references.md`:

- **`workspace:^` replaces both `file:../` symlinks and `^2.0.0`-class registry pins** as one category. Today value.js's demo has `@mkbabb/glass-ui: file:../glass-ui` + `@mkbabb/keyframes.js: file:../keyframes.js`; in a workspace, both become `@mkbabb/glass-ui: workspace:^` + `@mkbabb/keyframes.js: workspace:^`. Same physical resolution; cleaner semantics.
- **One hoisted `pnpm-lock.yaml` for 7 repos**: structural deduplication — single physical `vue` instance, single `parse-that`, etc. The `useMetricResult as never` cast (speedtest's CW-CARRY-E3) deletes by construction.
- **Independent release cadence preserved**: each member keeps its own `version` field, its own `npm publish` flow, its own `docs/tranches/` history. `pnpm publish --filter <pkg>` rewrites `workspace:^` to concrete semver at publish time. `git repos` remain 7; no history merge.

### §4.3 G-AH-D1 — the predecessor decision

From `CW.md` Mandate section (verbatim from AH's plan-of-record):

> The monorepo workspace is a separate forward tranche (CW), not an AH wave. AH ratifies + seeds it. The pnpm workspace overlay (7 repos, 7 cadences, one root). Gated on the peer teams quiescing; needs its own W0 cohort.

This restates AG `FINAL.md` Deferred-ledger §4 line: *"the monorepo workspace transposition — its own forward tranche"*.

**Predecessor lineage**: AG (deferred) → AH (seeded) → CW (planning open).

### §4.4 Does CW expect value.js to migrate INTO a monorepo?

**Yes, but with significant flexibility**. Per `CW.md` "Phase-0 quiescence preconditions" (precept 14) + `seed-references.md` §3:

- **CW-CARRY-VALUEJS** — value.js's contract-v2 patch was HANDED OFF in AH W-HANDOFF. Per `CW.md`: *"In the workspace, the `development` export condition is moot because Vite resolves sibling `src/` directly — so CW does NOT need to chase value.js's team to apply the patch first."* **But contract-v2 is now landed at value.js D.W1** (per value.js D FINAL §2 D.W1 L1-L5). The patch absorption already happened.
- **Sequencing**: value.js is **flipped LAST in the workspace landing**. Per `CW.md` precept 14 + A4 §5.1 option 2: *"per-member opt-in flips … are the mechanism for the last two members (value.js + fourier-analysis) only after their own teams' trees are clean."* value.js is now clean (D closed; v0.6.0 published; no in-flight tranche at the moment this audit reads). **fourier-analysis is the lone blocker** (109 dirty working-tree files per `post-RD-9-deps-fourier-analysis.md` §0).

### §4.5 Value.js's authoring role in CW

**MINIMAL**. value.js is a **consumer of CW**, not an author:
- value.js does NOT write `pnpm-workspace.yaml` (that's the workspace root's job — speedtest CW or a dedicated `constellation/` repo).
- value.js does NOT change its `package.json` `exports` map (contract-v2 + the v0.6.0 surface stand as-is).
- value.js **MAY** change its `dependencies` block from `@mkbabb/glass-ui: file:../glass-ui` → `@mkbabb/glass-ui: workspace:^` — this is a 1-line `package.json` edit, opportunistic with CW Phase-2.

**Timing**: value.js should be ready to accept the `workspace:^` flip *whenever CW W0 ratifies and CW Phase-2 dispatches*. This is **post-fourier-quiescence** (could be weeks; depends on the fourier team's pace).

### §4.6 Tranche-E engagement

**Tranche E should engage with CW as a coordination-aware consumer, NOT as an author**:

- **Track CW W0 dispatch** (CW.md says "PLANNING — awaits W0 audit cohort dispatch"). The dispatch is gated on AH-CLOSE (✅ done at `75af6060`), Phase-0 quiescence (fourier blocks), and a user signal. Until the user opens CW W0, no value.js action is needed.
- **File the `workspace:^` opt-in flip as a tranche-E filing** under `coordination/Q.md` (or E's equivalent). When CW Phase-2 reaches out, value.js applies one PR.
- **Do NOT pre-author the flip** — per CW.md precept 15 (`pnpm install only from the workspace root`) + the discipline that the workspace root must exist first.

**ESCALATION**: this is the largest constellation-wide change in flight. Tranche E's planning should explicitly acknowledge CW as a dependency and reserve a sub-wave for the workspace flip. The earliest realistic dispatch is **post-fourier-quiescence + post-CW-W0**, which could be 1-4 weeks out.

---

## §5 — keyframes.js

### §5.1 Code-side state

- HEAD: `0909177 build: abrogate "development" export condition — contract-v2 (AG-GU0.L-a)` on 2026-05-19 01:39.
- Working tree: **CLEAN** (per `post-RD-9-deps-keyframes-js.md` §0 + this audit's `git status`).
- Un-pushed commits: 8 (per `post-RD-9-deps-keyframes-js.md` §9.6; the count is conservative — orchestrator-pushable but user-gated).
- **No new commits since value.js D opened** (`33cf235` at value.js, 2026-05-19; keyframes.js's most-recent commit is `0909177` of the same date).

### §5.2 Does keyframes.js still consume value.js correctly?

**YES**. Per keyframes.js's `package.json`:
- `"@mkbabb/value.js": "file:../value.js"` (runtime dep, per `post-RD-9-deps-keyframes-js.md` §1.1).
- The link picks up value.js's HEAD-state physically.

**At the audit moment**: keyframes.js links into value.js's `eae8afc` (D-closed, v0.6.0). The library code (`src/animation/playback.ts` consuming `requestAnimationFrame` shims from `@mkbabb/value.js`) is the only runtime touchpoint. The runtime contract is invariant under v0.5 → v0.6 because keyframes.js consumes:
- `requestAnimationFrame` / `cancelAnimationFrame` from value.js (timing primitives — unchanged in v0.6.0).
- Easing functions are now sourced from value.js per the fourier-analysis pattern (per `post-RD-9-deps-fourier-analysis.md` §6.5).

**Runtime regression risk under v0.5 → v0.6**: LOW. The 3 breaking changes in v0.6.0 (Color<T> flatten + AnimationOptions → CSSAnimationOptions rename + contract-v2 development-condition removal) all target the **demo surface** + the **library type-export surface**, not the rAF/timing-primitive surface keyframes.js consumes.

### §5.3 Precept-pin state

| Repo            | precepts SHA | Notes                                                                                       |
|-----------------|--------------|---------------------------------------------------------------------------------------------|
| value.js        | `68d9b20`    | contract-v2 codification; current upstream HEAD                                              |
| glass-ui        | `68d9b20`    | same — synchronized                                                                          |
| speedtest       | `26297c9`    | one commit behind (`lessons: same-setup provide/inject is a no-op`); pre-contract-v2 codification |
| keyframes.js    | `458c2d1`    | **divergent**: keyframes.js's `docs/precepts` is on a DIFFERENT precept tree (`458c2d1 Prune meta language and harden overfitting rules` → `80e1d8f Harden orchestration precepts` → `7c4d28c Initial precepts canon`). This is NOT the `mkbabb/precepts` upstream value.js + glass-ui pin to. **Mis-aligned submodule**. |
| fourier-analysis | (no submodule) | `docs/precepts` is not a git submodule; the repo does NOT use the shared precepts substrate |

**Critical finding for value.js E-tranche**: keyframes.js's `docs/precepts` submodule points to a separate precepts repository (or a fork) that does NOT share commits with value.js / glass-ui / speedtest. **This is a precept-pin drift of the highest severity** — keyframes.js has been running on its own precepts canon since at least `458c2d1`. value.js's D FINAL §7 named "`keyframes.js` precept-pin convergence + consumption update post-v0.6.0" as an open dependency at `coordination/Q.md §9.5`. This audit confirms the drift; tranche E inherits the filing.

### §5.4 Filed asks remaining post-D-v0.6.0

Per value.js D FINAL §7 + D FINAL §8 + this audit:

| Filed ask                                                                                                                                                          | Status                | Who closes it                                |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|----------------------------------------------|
| Bump `@mkbabb/value.js` pin to acknowledge `^0.6.0`                                                                                                                | OPEN                  | keyframes.js (its own schedule)              |
| Rename `AnimationOptions` → `CSSAnimationOptions` at import sites                                                                                                  | OPEN                  | keyframes.js                                  |
| Verify `Color.components.get("L")` → `Color.L` migration (L8 Color flatten)                                                                                        | OPEN                  | keyframes.js                                  |
| Precept-pin convergence: keyframes.js's `docs/precepts` divergent from `mkbabb/precepts`                                                                            | OPEN (per §5.3)        | keyframes.js (significant migration)         |
| Adopt contract-v2 development-condition retirement (already shipped at keyframes.js `0909177` AG-GU0.L-a — see §5.1 commit subject)                                  | **CLOSED at `0909177`** | keyframes.js (already done)                   |
| KJ.W1 + KJ.W2 dep hygiene + demo-surface major sweep (per `post-RD-9-deps-keyframes-js.md` §7)                                                                       | OPEN                  | keyframes.js's own tranche                    |

**value.js cannot write keyframes.js**; per precept 13 (XR sub-protocol). The asks above are FILED; keyframes.js follows on its own tranche schedule.

---

## §6 — fourier-analysis

### §6.1 value.js consumption surface

Per direct grep (this audit) + `post-RD-9-deps-fourier-analysis.md` §1:

- **Manifest**: `web/package.json` declares `"@mkbabb/value.js": "^0.4.6"` (registry-pinned; lockfile resolves to `0.4.6`). **fourier-analysis is the ONLY constellation peer pulling value.js from npm, not `file:`-linked.**
- **Imports** (5 files):
  - `web/src/components/equation/ConvergencePlot.vue`: `import { easeInOutSine } from "@mkbabb/value.js";`
  - `web/src/components/equation/composables/useCurveTransition.ts`: `import { easeInOutSine } from "@mkbabb/value.js";`
  - `web/src/components/equation/lib/harmonics.ts`: `import { easeInOutSine } from "@mkbabb/value.js";`
  - `web/src/lib/easings.ts`: `import { timingFunctions } from "@mkbabb/value.js";` + `import { ... } from "@mkbabb/value.js";` (multi-line re-export aggregator)
  - `web/src/composables/useFourierMorph.ts`: documentation reference (`with easing functions (from value.js) applied to the interpolation t`); the actual easing imports are routed through `web/src/lib/easings.ts`.

**Surface**: 2 distinct symbols (`easeInOutSine`, `timingFunctions`) consumed across 5 files. **All easing-class APIs.** No color-class API, no parser API, no transform API, no normalize/interpolate API.

### §6.2 v0.6.0 breaking-change impact

Per value.js D FINAL §2 D.W1 L6-L8, v0.6.0's three breaking changes:

1. **L8 Color<T> flatten**: `Color.components.get("L")` → `Color.L`. **NOT consumed by fourier-analysis** (no color API in the 5 files). **NO IMPACT.**
2. **L6 `AnimationOptions` → `CSSAnimationOptions` rename**: 14 internal sites in value.js renamed; the public type-export was renamed. **fourier-analysis does NOT import `AnimationOptions`** (no AnimationOptions import in the 5 files). **NO IMPACT.**
3. **L1-L5 contract-v2 development-condition removal**: the `development` export key was struck from value.js's `package.json` exports map. fourier-analysis adopted the contract-v1 dev-resolution at `926ca6a` (its current HEAD; per §6.4 below). Under contract-v2, the explicit `development` condition is NOT needed because Vite's serve-mode auto-injects it. **NO IMPACT at fourier-analysis's current commit**.

**Net**: **ZERO breakage on v0.5 → v0.6 for fourier-analysis**. The narrow easing-API surface is invariant under the v0.6 ship.

### §6.3 npm-registry-pin vs file-link posture

fourier-analysis is on **`^0.4.6` registry-pinned**. Latest published is `0.5.1` (per `post-RD-9-deps-value-js.md` §1). value.js's local working tree is **`0.6.0` UNPUBLISHED**.

**Three options per `post-RD-9-deps-fourier-analysis.md` §6.2** (this audit re-evaluates):

1. **HOLD at `^0.4.6`**: safest; v0.5.1 fixes never reach fourier-analysis until republish. **Surface impact**: easing symbols at 0.4.6 vs 0.5.1 — assumed compatible (the 0.5 line added easing exports per the keyframes.js architectural split; existing 0.4 easings unchanged).
2. **Lift to `^0.5.1`**: published; picks up bugfixes. **Recommended for safe-lift** per dep audit §6.2.
3. **Switch to `file:../../value.js`**: aligns with constellation; picks up unpublished `0.6.0`. Highest reward, highest risk per dep audit §6.2 (D.W6 churn already settled, but the linking changes the install graph). **Recommended for CW-Phase-2 timing**, not earlier.

**Recommendation for tranche E**: continue letting fourier-analysis follow its own schedule. value.js's D close at v0.6.0 unblocks an eventual `0.5.x` lift on fourier's side; no value.js action required.

### §6.4 Dev-resolution contract adoption state

fourier-analysis adopted **contract-v1 (the original cross-repo dev-resolution contract)** at `926ca6a fix(resolution): adopt cross-repo dev-resolution contract consumer half (glass-ui Q.W1 Lane D)` on 2026-05-18. The commit:

- Adds `conditions: ["development", "module", "browser", "default"]` to `web/vite.config.ts`.
- Widens `server.fs.allow` to `["../../.."]` (the workspace root reach).

**Under contract-v2**, this commit is **partially superseded**:
- The `development` condition is now declared OPTIONAL by glass-ui's `ce5aad8` ship (the publisher abrogates the requirement).
- The `server.fs.allow` widening is still relevant (the SFC-scoped subpath surface served via `/@fs/` still needs the reach).

**fourier-analysis has NOT adopted contract-v2 explicitly**. The `fourier-analysis-contract-v2.patch` at `speedtest/docs/tranches/AH/artefacts/W-HANDOFF/` was authored against fourier-analysis's `926ca6a` and remains UNAPPLIED (per the W-HANDOFF protocol — fourier team applies in their cadence after draining the 109-file dirty tree).

**Net**: fourier-analysis is in a **contract-v1 state with contract-v2 transitionally compatible** posture. Not blocking value.js E-tranche; affects fourier-analysis's own cadence only.

---

## §7 — Precepts upstream

### §7.1 Current pins

Reproducing from §5.3 + `git submodule status` evidence:

| Repo            | Pin       | Relative position                                          |
|-----------------|-----------|------------------------------------------------------------|
| value.js        | `68d9b20` | HEAD of `origin/main` (upstream-current)                    |
| glass-ui        | `68d9b20` | HEAD of `origin/main`                                       |
| speedtest       | `26297c9` | 1 commit behind upstream (`lessons: same-setup provide/inject is a no-op`) |
| keyframes.js    | `458c2d1` | **divergent submodule** (not on `mkbabb/precepts`'s upstream) |
| fourier-analysis | (none)    | no precepts submodule                                      |

### §7.2 Upstream commits AFTER `68d9b20`

Per `git -C docs/precepts log origin/main -5`:

```
68d9b20 precept: contract-v2 — abrogate the `development` dev-resolution condition
3c32fae precept: glass-ui Q close — invariants 30-33 + cross-repo dev-resolution contract + π re-activation
3310a8c spec(P close): invariants 28-29 codified + LL entries 51-53 from glass-ui P.W6
46ee7e9 feat(precepts): codify fail-explicit + typed-key DI + test-hygiene + tooling-stash invariants (glass-ui O.W0)
b8af314 feat(spec+style): canonicalize bidirectional audit + spot-verification gate + wire-before-retire (glass-ui N.W0 Lane B)
```

**`68d9b20` IS upstream HEAD.** No commits exist after `68d9b20` on `origin/main`. The `git diff HEAD..origin/main` is empty for value.js's pin.

### §7.3 Should value.js advance?

**NO — value.js is already at upstream HEAD.** Tranche E does not need to advance the submodule. Future tranches will advance only when `mkbabb/precepts` upstream lands new commits.

### §7.4 Side-channel: speedtest is 1 behind

Speedtest's `26297c9` is one commit before `68d9b20`. This is **expected and benign** — speedtest's AH/AI tranches operate under invariants 26-29 + cross-repo dev-resolution (the precept layer at `26297c9` already codifies contract-v1; contract-v2 is the publisher-side abrogation, not a consumer obligation). Speedtest does not need to advance for AI; advancement is its own future tranche concern.

---

## §8 — Constellation health

| Cross-repo dependency                                            | Verdict | Evidence                                                                                                                                                                                                                                                                                  |
|------------------------------------------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Precepts SHA convergence (value.js ↔ upstream)**                | GREEN   | value.js + glass-ui pin to `68d9b20` = `origin/main` HEAD. No drift. (§7)                                                                                                                                                                                                                  |
| **Precepts SHA convergence (constellation-wide)**                 | YELLOW  | speedtest 1 commit behind (benign per §7.4); keyframes.js on divergent tree (significant; §5.3); fourier-analysis has no submodule (architectural, not a drift). Filed at `coordination/Q.md §9.x` per D FINAL.                                                                                  |
| **Contract-v2 publisher compliance**                              | GREEN   | glass-ui publisher half landed at `ce5aad8` (v1.9.3); the `./styles` subpath gap CLOSED at `9275584`. Consumer half landed at value.js D.W1 (per D FINAL §2). Keyframes.js consumer half landed at `0909177` (per §5.4). fourier-analysis on contract-v1 transitional, patch in handoff bundle. |
| **Subpath surface gaps**                                          | GREEN   | glass-ui `./styles.css` shipped at `9275584` (closes the D-FINAL-named keystone gap). All other subpath surfaces (`/dock`, `/aurora`, etc. per glass-ui M.W0 Lane IV) shipped at glass-ui M.W1. No outstanding subpath gaps known.                                                          |
| **Consumer adoption posture — value.js**                          | GREEN   | D closed at v0.6.0; clean working tree; all 10 pre-merge gates GREEN at D close (per D FINAL §6).                                                                                                                                                                                          |
| **Consumer adoption posture — keyframes.js**                      | YELLOW  | code-side clean (CLEAN tree; 8 unpushed commits orchestrator-pushable). Three filed asks (AnimationOptions rename + Color.L flatten + value.js pin bump) remain OPEN; precept-submodule on divergent tree. (§5)                                                                                |
| **Consumer adoption posture — fourier-analysis**                  | RED     | **109-file dirty working tree** (per `post-RD-9-deps-fourier-analysis.md` §6.6 + this audit's `git status`); 1 unpushed commit; contract-v1 transitional. The W-HANDOFF bundle (3 patches) remains unapplied. **The lone constellation blocker for CW Phase-0 quiescence.**                |
| **Consumer adoption posture — speedtest**                         | YELLOW  | AI is mid-W0 planning (no source touched). Speedtest is the lone Vite-5 laggard (W6 lifts to 7.3.3). No D-filing impact; speedtest's CW seed is the major coupled work.                                                                                                                       |
| **glass-ui filed asks (7 metaballs + BlobDot + deriveAurora + Tabs underline)** | RED     | Not addressed in the post-Q cohort. Aurora derive-from-color + blob extirpation are precept-§10-blocked at value.js's side; the surface remains forward-routed. (§2.3)                                                                                                                |
| **CW seed (constellation-wide monorepo workspace)**               | YELLOW (planning); HIGH-FUTURE-IMPACT | CW is seeded but not opened (W0 not dispatched). Gated on AH-CLOSE (✅), Phase-0 quiescence (fourier blocks), user signal. Largest in-flight constellation-wide change. (§4)                                                                                                                       |

---

## §9 — Tranche-E entry points

### §9.1 HIGH PRIORITY

1. **Adopt glass-ui `./styles.css` subpath** (closes D-FINAL-named keystone gap):
   - One-line `vite.config.ts` change: retire `siblingFsAllowTransient`.
   - Update wherever the demo imports glass-ui's CSS to use `@mkbabb/glass-ui/styles.css` rather than a deep `dist/` path.
   - Verification: demo builds clean; D.W5 smoke 21/21 stays green.
   - **Time**: ~30-60 min (1 sub-wave).
   - **Owner**: value.js E (not glass-ui — the subpath is already shipped).

2. **Track CW W0 dispatch** (constellation-wide monorepo workspace):
   - Watch for the user signal to open CW W0 at speedtest's side.
   - When CW Phase-2 reaches value.js, accept the `workspace:^` opt-in flip (one-line `package.json` edit).
   - **Time**: opportunistic; depends on CW's own cadence.
   - **Owner**: shared (CW lead is speedtest's tranche; value.js applies the flip).

3. **Open dependencies from D FINAL §7** — re-evaluate at E-open:
   - Aurora derive-from-color value.js-side migration — STILL glass-ui-blocked (no `deriveAuroraPalette` in the post-Q cohort).
   - Blob value.js-side extirpation — STILL glass-ui-blocked (no metaballs primitive in the post-Q cohort).
   - smoke-safari WebKit follow-up — testing-hardening (not value.js-blocked; can dispatch independently).
   - keyframes.js precept-pin convergence + post-v0.6.0 consumption update — KEYFRAMES.JS-side; value.js cannot write.

### §9.2 MEDIUM PRIORITY

1. **Vite v7.3.3 patch lift** (`post-RD-9-deps-value-js.md` §8.2 Group A.0):
   - `npm install` re-baseline picks up 7.0.6 → 7.3.3 patch automatically (within `^7.0.6` range).
   - Pairs with lockfile re-baseline against `0.6.0` package.json (the stale-lockfile fix from `post-RD-9-deps-value-js.md` §0 + §6.4).
   - **Time**: ~10 min (1 sub-step inside E's housekeeping wave).

2. **Adopt glass-ui `--motion-duration-*` / `--motion-delay-*` tokens** (per §2.4):
   - Re-survey value.js demo's animation utilities against the new canon.
   - Some D.W4 Lane A inline values may now consume tokens directly.
   - **Time**: 1-2 hours (one sub-wave inside an E styling-housekeeping pass).

3. **Adopt `vitest 4.1.7` lift** (per `post-RD-9-deps-value-js.md` §5.6):
   - value.js is constellation laggard (3.2.4 vs glass-ui 4.1.5, speedtest 4.1.2, bbnf-buddy 4.1.3).
   - jsdom 26 → 29 paired lift (per §3.4 of the dep audit).
   - **Time**: bounded but non-trivial; test-runner shake-out + jsdom 3-major-jump. **One sub-wave**.

### §9.3 LOW PRIORITY

1. **`reka-ui 2.0.0 → 2.9.7` minor lift** (9 minors behind; demo-only blast radius). Speedtest A8 already proved the lift is mechanical; can be folded into a housekeeping pass.
2. **`lucide-vue-next 0.525 → 1.0.0`** — constellation-wide (every peer needs to lift). Wait for words/frontend or speedtest to canary.
3. **`vue-tsc 2.2.0 → 3.3.1`** — words/frontend is already on `^3.2.5`; wait one tranche cycle then constellation-lift.
4. **`zod 3.x → 4.x`** — constellation-wide; coordinate with words/frontend (heavier zod user).
5. **smoke-safari WebKit project addition** (D FINAL §8 named).
6. **`v-calendar` PINNED-FOR-REASON annotation** (`post-RD-9-deps-value-js.md` §3 — add a `package.json` comment so future audits don't flag the prerelease-pin).

### §9.4 Items NOT in tranche-E scope

- **Glass-ui's metaballs surface ship** — glass-ui-author work; value.js cannot author.
- **fourier-analysis's 109-file drain + W-HANDOFF apply** — fourier-team work; value.js cannot author.
- **keyframes.js's 3 filed consumption updates** — keyframes.js-author work.
- **CW W0 itself** — speedtest CW tranche's work, NOT value.js's.

---

## §10 — Authority

**Audit SHA references**:

- value.js: `eae8afc` (master, D-close merge) — local clone 6 commits ahead of `origin/master` (the close has not been pushed; orchestrator-gated).
- glass-ui: `66e9b8f` (master, post-Q-close substrate).
- speedtest: `9d22bcdf` (master, AI mid-W0 planning).
- keyframes.js: `0909177` (master, contract-v2 export-condition retirement).
- fourier-analysis: `926ca6a` (master, contract-v1 adoption; 1 unpushed commit; dirty working tree).
- precepts (shared): `68d9b20` = `origin/main` HEAD = value.js's submodule pin = glass-ui's submodule pin.

**Inputs referenced**:

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/Q/*` (predecessor tranche close).
- `/Users/mkbabb/Programming/speedtest/docs/tranches/AH/*` (predecessor tranche close at speedtest).
- `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/AI.md` (W0 planning).
- `/Users/mkbabb/Programming/speedtest/docs/tranches/CW/{CW.md, seed-references.md}` (CW seed scaffold).
- `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/artefacts/post-RD-9-deps-{value-js, fourier-analysis, keyframes-js, glass-ui}.md` (peer dep audits — these are 30-50KB each and were authored against the same SHAs as this audit; their findings are referenced rather than re-derived).
- `/Users/mkbabb/Programming/value.js/docs/tranches/D/FINAL.md` (D close ceremony).

**Posture statement**: this audit is **READ-ONLY**. No git mutations were performed in any repo. No `src/` edits. No peer-repo writes. This artefact is `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md` and is the only file authored by this lane.

**End E-AUDIT-4.**
