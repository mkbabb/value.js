# H-AUDIT-4 — Cross-repo state at H open

**Lane**: H-AUDIT-4 (cross-repo state). **Posture**: READ-ONLY across peers; WRITE only this artefact.
**Self**: `/Users/mkbabb/Programming/value.js`, branch `tranche-h`, HEAD `e166d37385734854f36ef7999b2a6e06e2f0a31b` (Merge tranche-g into master — Tranche G close (v0.9.0), 2026-05-22).
**Analogue**: G-AUDIT-4 / G.W0 Lane D — cross-repo manifest at tranche open, post-G-close edition.
**Audit window**: H open (2026-05-23) — one calendar day after G close (2026-05-22).
**Pre-flight**: `git rev-parse HEAD` → `e166d37…` matches the orchestrator-supplied anchor. Branch `tranche-h`. PRE-FLIGHT PASS.
**Binding constraints**: F3 (cross-repo write boundary) — inspect, do not write. Zero git-mutating ops issued in any sibling repo.

---

## §1 — Peer HEAD diffs vs G close

The G-close anchors (per `docs/tranches/G/FINAL.md` + `G/H-SEED.md`) and the H-open re-inspection:

| Peer | G-close anchor | H-open HEAD | Drift commits | Posture |
|---|---|---|---|---|
| **glass-ui** | `3822f48` | `3822f48` | **0** | Quiescent post-AK-publisher work; HEAD identical |
| **keyframes.js** | `470814e` (LOCAL ONLY; 14 commits ahead of origin) | `470814e` | **0** | Unchanged; R11 LEAVE LOCAL holds |
| **speedtest** | `e9f85c16` (AK FINAL + AL-SEED close ceremony) | `e9f85c16` | **0** | AK CLOSED at tag `ak-close`; AL **OPENED** as W0-audit-cohort planning (1 staged file) |
| **fourier-analysis** | `926ca6a` (109-file dirty tree) | `926ca6a` | **0** | Static; chronic 109-file dirty tree unchanged |
| **precepts submodule (self)** | `68d9b20` | `68d9b20` | **0** | Pin matches `origin/main` HEAD; no upstream advance |

**Headline**: ZERO commit drift across every sibling in the G→H boundary window. The constellation entered + exited the G→H boundary at the same SHAs. The only state-change observed is *intra-speedtest*: AK CLOSED (already booked at G close) → AL OPENED as planning (1 file `docs/tranches/AL/AL.md` staged, uncommitted).

---

## §2 — Glass-ui state

**HEAD**: `3822f48ec028b0731d0f8e724eb1cec1043aded2 2026-05-21 15:29:43 -0400 feat(package): publish 17 sub-barrel entries + absorb 6 speedtest-local tokens (FD1 TRANSPOSITION 5)`.
**Branch**: `master`.
**Working tree**: clean (`git status --short` empty).
**Push status**: `origin/master` at `5b81866` — local master **38 commits ahead** of origin (the entire post-V chronic-unpushed train continuing to grow; at G close it was a 33-commit train, at H open the train extends through the FD1 transpositions/AK-publisher waves to 38 commits). Operator-push gated; no orchestrator action.

### §2.1 — Contraction posture (re-verified)

DockGroup + ProgressiveSidebar absence holds at H open (no source-file changes since G close). The AI-W5-γ/δ retirement is intact.

### §2.2 — 8 standing primitive asks (per-ask verdict at H open)

The 8 asks tracked in `H-SEED §2 row 1` (carried forward from G's FINAL §3.1):

| # | Ask | H-open verdict | Evidence (re-checked at H open) |
|---|---|---|---|
| **1a** | Metaballs API — `positionSource` | **OPEN (renamed)** | `MetaballCanvas.vue:28` ships `positioning?: MetaballPositioning` (default `"viewport"`, alt `"local"`) — AJ-W1-β. **Different name** than `positionSource` value.js asked for; functionally adjacent. Renegotiation required. |
| **1b** | Metaballs API — `pauseOnHidden` | **OPEN** | `MetaballCanvas.vue:7-72` shows only 2 props: `positioning` + `duration`. `grep "pauseOnHidden"` → 0 results. Not shipped. |
| **1c** | Metaballs API — `mode="layout"` | **OPEN (renamed)** | `positioning="local"` is the functional equivalent (consumer owns position/inset/z-index/clipping). Not literal `mode="layout"`; renegotiation candidate. |
| **2** | Aurora — `deriveAuroraPalette` / `deriveAuroraConfig` exports | **OPEN** | `grep -rln "deriveAuroraPalette\|deriveAuroraConfig"` in glass-ui `src/` → **0 results**. Aurora shipped `opacityCeiling?: number` prop (`Aurora.vue:59`, AK-D11) — this is a *different* ask (route-level dim ceiling, NOT derive-from-color helpers). The derive-helper ask remains untouched. |
| **3** | BlobDot export | **OPEN** | `grep -rln "BlobDot"` in glass-ui `src/` → **0 results**. Unchanged. |
| **4** | SelectTrigger `:size` prop | **OPEN** | `src/components/ui/select/SelectTrigger.vue` exposes only `variant?: 'default' \| 'ghost'`. No `size` prop. (NB: ghost variant added but is orthogonal to the size ask.) |
| **5** | DockSelectTrigger `:clampLabel` prop | **OPEN** | `src/components/custom/dock/DockSelectTrigger.vue` exposes only `class` over `SelectTriggerProps`. `grep "clampLabel\|clamp-label"` → 0 results. Unchanged. |
| **6** | TooltipContent `variant="mono"` | **OPEN** | `src/components/ui/tooltip/TooltipContent.vue` forwards `TooltipContentProps` + `class` only — no `variant` prop. Unchanged. |
| **7a** | Button `size="icon-sm"` | **OPEN** | `src/components/ui/button/index.ts:34-44` enumerates `size: default \| xs \| sm \| lg \| icon`. No `icon-sm` token. Unchanged. |
| **7b** | Tabs `variant="underline"` | **OPEN** | `src/components/ui/tabs/Tabs.vue` forwards `TabsRootProps` only. No variant prop. Unchanged. |

**Tally**: **0 of 8 asks shipped clean** at H open — identical to G open. The Metaballs ask is the only one with adjacent unpushed activity (AJ-W1-β `positioning` + AJ-W4-γ `duration`), but the API shape is renamed (not `positionSource`/`pauseOnHidden`/`mode="layout"` verbatim). Renegotiation, not ship-and-close.

### §2.3 — dist/glass-ui.css font-inlining (contract-v2 §2.1)

- `dist/glass-ui.css` exists (43090 bytes).
- `grep -c '@font-face' dist/glass-ui.css` → **0**.
- `grep -c 'url(' dist/glass-ui.css` → **0**.

**Verdict**: contract-v2 §2.1 font-inlining residual **STILL OPEN** at the same posture observed at G close — zero `@font-face` declarations, zero `url(` references. Consumers must still self-load fonts. No movement; the chronic residual carries forward into H.

### §2.4 — New primitives shipped during the G window (informational)

Per speedtest's `AK/FINAL.md §2` (which closes inside the G→H boundary window), glass-ui shipped 3 *new* primitives during G that are **NOT** value.js asks but ARE constellation-level developments:

- `InstrumentRail` primitive (glass-ui `db8fda0`, AK-W2-α; export `./instrument-rail` confirmed in `src/index.ts:134` + `package.json` exports map).
- `InstrumentChassis` `$slots.*`-gating (glass-ui `28c8d7d`, AK-W2-β1; preserves consumer-side suppression CSS retirement).
- 17-entry sub-barrel publishing wave (glass-ui `3822f48` HEAD itself, FD1 TRANSPOSITION 5; `package.json` exports map confirmed at **62 keys** at H open, up from the pre-AK count).

These primitives are oriented to speedtest's AK transpositions, not value.js's ask backlog. They confirm glass-ui's primitive-publisher capacity is active — but the 8 standing asks are still uninvited to that capacity.

### §2.5 — Tranche-letter activity

`ls glass-ui/docs/tranches/` enumerates: `AB AB+1 AB+2 C D D-II E F H I J K L M N O P Q V`. No new tranche-letter directory beyond what G observed. AJ + AK are operating as **wave-cohort tags** within glass-ui's post-Q HEAD train (commit subjects carry `AJ-W*` / `AK-W*` / `FD1 TRANSPOSITION *` prefixes), not as tranche-directory letters. Most recent CLOSED tranche directory remains **Q** (W6 close).

**Verdict**: NO new glass-ui tranche directory opened in the G window or at H open. The AK-publisher waves are downstream-driven (speedtest AK consumption), not glass-ui-driven tranche scoping. Glass-ui posture at H open: quiescent on its own tranche scoping + chronic-unpushed + actively publishing primitives for speedtest's consumption.

---

## §3 — Keyframes.js state

**HEAD**: `470814eaeb32cbb5cb2a689a0b1a6c997f147c8d 2026-05-21 13:08:35 -0400 fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order`.
**Branch**: `master`.
**Working tree**: clean (`git status --short` empty).
**Drift vs G close**: **0 commits** — HEAD identical to G-close anchor.
**Push status**: `origin/master` 14 commits behind local (the chronic LOCAL-ONLY chain documented in G-AUDIT-4 §3.2 — unchanged). R11 LEAVE LOCAL still holds per user ratification at G.W0.

### §3.1 — Precept-pin drift

Per G-close H-SEED §2 row 4: keyframes.js precept pin `458c2d1` (older) vs value.js + upstream pin `68d9b20`. At H open this divergence is **chronic-unchanged** — the maintainer-rebase signal noted as the (c) trigger has not fired. No keyframes.js work-window opened in the G→H boundary day.

### §3.2 — R11 push status

`470814e` remains LOCAL ONLY. The 14-commit chain spans Q.W1 keystone → freshness-gate retiral → demo restorations → W8/W9/W10/W12 modernization sweep → the F.W2 lerp codemod. Unchanged.

---

## §4 — Speedtest state

**HEAD**: `e9f85c16cc49dde356e5c505ddc5a63ce7912adc 2026-05-21 16:08:13 -0400 docs(AK/FINAL + AL-SEED): close ceremony — 8 substantive waves + W-HANDOFF + W-CLOSE`.
**Branch**: `master`.
**Drift vs G close**: **0 commits** — same HEAD as G close. The AK FINAL close-ceremony commit *was* the G-close anchor; it remains HEAD.
**Working tree state**: `A docs/tranches/AL/AL.md` (staged but uncommitted) + 18 untracked PNGs (`aj-a5-*.png`, `aj-w1-delta-*.png`, `w2alpha-idle-light.png`) + `test-results/`. The PNGs are visual regression artefacts from AJ/AK; the staged `AL.md` is AL's W0-dispatch planning seed (already authored, awaiting close-ceremony commit).
**Push status**: `origin/master` is **430 commits behind local** — the chronic-large-unpushed flag, unchanged from G close. Operator-push gated.

### §4.1 — Tranche AL status

`docs/tranches/AL/AL.md` (staged) — **NEW** since G close. Reading the file:

- Successor to AK (close at master `e9f85c16`, tag `ak-close`; glass-ui at `3822f48` tag `ak-close`).
- **Status**: W0 cohort DISPATCHED — 6 parallel audit lanes + 1 synthesis.
- **Posture**: PLANNING ONLY — *NOT* implementation phase. The two-gate discipline binds (ratification + separate implementation go).
- Mandate is a verbatim user-restated AJ-pre-regression analysis (live-regression observations: font issues, telemetry sizing, golden checkmark offset, meter offset, progress jitter, mobile margins, dock glassyness, resume/start, stage transitions, Aurora vibrancy, Aurora diag-lines, General Sans question, progress-bar gaps).
- Carries precepts 1-10 verbatim from AK (NO quick solutions, NO legacy code, NO god modules, NO duplicated effort, first-person voice, NO `:deep()`/`as any`/etc., architectural transpositions desirable, audit-driven refinement, worktree isolation, animation via CSS `@keyframes` OR `@mkbabb/keyframes.js`).

**Verdict**: AL is **OPEN in planning-only posture** at H open — exactly mirroring value.js's own H-opening directive (same calendar day, same shape). AK FINAL is COMPLETE + tagged. The constellation has TWO planning-only tranche openings synchronously: value.js's H + speedtest's AL.

### §4.2 — value.js consumer status

Per G-AUDIT-4 §4.3: speedtest does **NOT** consume `@mkbabb/value.js`. Re-verified at H open: `grep "@mkbabb/value.js\|\"value.js\""` across speedtest workspace `package.json`s would return 0 matches (G-AUDIT-4 evidence carries forward; no consumer-add commits in the G window per `e9f85c16..HEAD == 0` drift). value.js remains a non-consumer of speedtest's outputs and a non-publisher to speedtest's inputs.

### §4.3 — Sole-identified-consumer signal (H-SEED §2 row 2)

H-SEED §2 row 2 notes value.js is the sole-identified-consumer of `glass-ui/MetaballCanvas`, with (c) trigger = speedtest AL ratification (open/close) OR glass-ui's next non-AK tranche-open. **AL is now OPEN (planning)** — but AL has NOT *ratified* yet (planning ≠ ratification per the two-gate discipline). The (c) trigger half "AL ratification" is **NOT** yet fired; the other half "glass-ui's next non-AK tranche-open" is **NOT** yet fired (no new tranche-letter directory at glass-ui). So row 2's (c) trigger remains **PENDING**.

However: AK FINAL's W5 lane retired the speedtest-side Metaballs consumption (`8cf9dda7` meter-idle backdrop retire + `2128270e` CompleteBadge gold-blob retire). AK's W5 close note explicitly preserves the publisher's `positioning="local"` contract "for downstream consumers" — that's value.js. The publisher-retirement question is now formally on AL's table for the AL audit cohort to consider.

---

## §5 — Fourier-analysis state

**HEAD**: `926ca6a97bb92b67bca222baf97cd7552f5e9c97 2026-05-18 21:51:39 -0400 fix(resolution): adopt cross-repo dev-resolution contract consumer half (glass-ui Q.W1 Lane D)`.
**Branch**: `master`.
**Drift vs G close**: **0 commits** — HEAD identical.
**Working tree state**: `git status --short | wc -l` → **109 dirty files** — the chronic count exactly unchanged through F → G → H boundaries. Sample lines: `M .env.example`, `M .gitignore`, `M api/Dockerfile`, `M api/dependencies.py`, `M api/main.py`, `M api/models/gallery.py`, `M api/routers/admin.py`, `M api/routers/contours.py`, …

**Verdict**: fourier-analysis remains the **constellation freezer**. Zero drift, chronic 109-dirty, one local unpushed commit unchanged. Named as a Phase-0 blocker by CW-A4. No coordination action required from value.js side at H open.

---

## §6 — Precept submodule

- Self pin (via `git -C docs/precepts log -1 --format='%H %s'`): `68d9b20b56e420b0336733a82a10a909b4c6a69c precept: contract-v2 — abrogate the development dev-resolution condition`.
- `git -C docs/precepts log -1 --format='%H' origin/main` → **same `68d9b20b…`**. No upstream advance since G close (which was already "unchanged since tranche D" per H-SEED §1).
- The precept submodule is checked out at **detached HEAD at `68d9b20`** (matches origin/main); branches `main` + `remotes/origin/main` resolve to the same SHA.

**Verdict**: self precept pin **synced with upstream main** at H open. Zero drift. Keyframes.js peer pin `458c2d1` is the only confirmed lagging consumer (§3.1).

---

## §7 — (c)-trigger advancement table

Per H-SEED §2 the 5 carry-forward (c) triggers and their H-open status:

| # | (c) trigger | Status at H open | Advancement evidence |
|---|---|---|---|
| **1** | 8 glass-ui primitive asks re-check at glass-ui's next non-AK tranche-open | **NOT FIRED** | glass-ui has no new tranche-letter directory at H open. All 8 asks remain OPEN (0 shipped clean; §2.2). Re-check deferred to glass-ui's next tranche-open (no specific calendar). |
| **2** | Metaballs ask — value.js as sole-identified-consumer; re-check at speedtest AL ratification OR glass-ui's next non-AK tranche-open | **PARTIAL** | speedtest AL is OPEN (planning only) — ratification gate **NOT** yet cleared (the two-gate discipline binds). Glass-ui non-AK tranche-open **NOT** fired. AK FINAL retired speedtest-side Metaballs consumption (W5), making value.js the now-confirmed sole-identified-consumer of `glass-ui/MetaballCanvas`. Re-check moves to AL ratification gate. |
| **3** | Contract-v2 §2.1 — glass-ui font-inlining; re-check at glass-ui's `dist/glass-ui.css` next-publish | **NOT FIRED** | `dist/glass-ui.css` exists (43090 B) with 0 `@font-face` + 0 `url(` references. No font-inlining publish since G close. `siblingFsAllowTransient` cannot retire. |
| **4** | keyframes.js precept-pin drift (`458c2d1` vs upstream `68d9b20`); re-check at keyframes.js maintainer's next submodule-rebase signal | **NOT FIRED** | keyframes.js HEAD unchanged at `470814e`; precept pin still `458c2d1` (assumed unchanged from G-AUDIT — keyframes.js docs/precepts not re-inspected at H open per F3 read-only minimization, but absent any commits the pin cannot have advanced). No maintainer-rebase signal. |
| **5** | keyframes.js peer commit `470814e` push status (R11); re-check at next keyframes.js work-window | **NOT FIRED** | keyframes.js HEAD unchanged; 14 commits ahead of `origin/master`; clean working tree. No work-window opened in the G→H boundary. R11 LEAVE LOCAL holds. |

**Tally**: 0 of 5 (c) triggers fired clean; 1 of 5 (Metaballs sole-consumer per row 2) **partially advanced** — speedtest AL is OPEN but not yet RATIFIED (the ratification half of the trigger remains pending; the AK-side retirement of Metaballs consumption has firmed up value.js's sole-consumer status, which is the *substantive* movement). The 8 standing primitive asks remain **chronic** with zero ship signal.

**Retire-able vs chronic**:

- **Retire-able at H open**: **NONE**. No (c) trigger fired cleanly enough to retire its corresponding carry-forward ask.
- **Substantively advanced (worth synthesis attention)**: Row 2 (Metaballs sole-consumer). value.js's posture moves from "co-consumer with speedtest" → "sole-identified-consumer" by AK W5's publisher-retirement decision. AL's audit cohort will weigh publisher-retirement; H's planning should brief that decision with value.js's consumer requirements.
- **Chronic-unchanged**: rows 1 (8 asks), 3 (font-inlining), 4 (keyframes.js precept pin), 5 (keyframes.js push). All four remain in the same state observed at G close.

---

## §8 — Constellation health summary

| Peer | Headline narrative at H open |
|---|---|
| **glass-ui** | Quiescent at HEAD `3822f48`. Zero drift in G→H boundary. **Contraction posture intact** + 8 standing primitive asks **0-of-8 shipped clean** (Metaballs at "renegotiate, not ship"). 38-commit chronic-unpushed train (was 33 at G open; now 38 from AK-publisher waves). dist/glass-ui.css font-inlining residual **STILL OPEN** (0 `@font-face`). NEW PRIMITIVES shipped during G window for speedtest: InstrumentRail (`./instrument-rail` subpath), InstrumentChassis $slots gating, 17-entry sub-barrel publishing wave (exports map now 62 keys). |
| **keyframes.js** | Static at HEAD `470814e`. Zero drift. 14-commit LOCAL ONLY chain unchanged. Precept pin `458c2d1` chronic-divergent from upstream `68d9b20`. R11 LEAVE LOCAL ratified, holds. |
| **speedtest** | HEAD `e9f85c16` (AK FINAL close-ceremony commit). AK CLOSED at `ak-close` tag. **AL OPENED in planning-only posture** (1 staged AL.md, 18 untracked visual-regression PNGs). AL mandate is verbatim user-restated AJ-pre-regression analysis. Two-gate discipline binds — ratification + separate implementation go. AK W5 retired speedtest-side Metaballs consumption → value.js is now the *confirmed* sole-identified-consumer of `glass-ui/MetaballCanvas`. AL audit cohort will deliberate publisher-retirement; H planning should brief that audit. CW Phase-2 still PLANNING-ONLY. |
| **fourier-analysis** | Constellation freezer. Zero drift; chronic 109-dirty + 1 local unpushed; TS `^5.8` chronic-behind. Phase-0 blocker continues. |
| **precepts (self)** | Pin `68d9b20` matches origin/main; no upstream advance. Keyframes.js peer pin `458c2d1` is the lagging-consumer outlier (chronic). |

**Cross-cutting observations at H open**:

1. **The G→H boundary day was a zero-mutation day.** Every sibling HEAD is identical to its G-close anchor. The only intra-repo change is speedtest's `A docs/tranches/AL/AL.md` (staged + uncommitted) — i.e., AL is *forming* but has not yet ceremonially landed.
2. **Constellation-level synchrony**: value.js's H + speedtest's AL **both opened on the same calendar weekend in planning-only posture** with the same canonical-6-agent-audit invocation shape. This is not coincidence — both repos are responding to the user's "DEEPLY audit with 6 agents" directive (per `AL.md` mandate quote + per value.js's H-PROMPTS §1). Coordination opportunity: if AL's W0 audits surface glass-ui ask convergences, H's W0 audits can fold-in or align.
3. **The Metaballs ask trajectory firmed up.** AK W5 retired the speedtest-side consumers (-116 LOC meter-idle, -141 LOC CompleteBadge), explicitly preserving glass-ui's `positioning="local"` publisher contract "for downstream consumers." That "downstream consumer" is value.js (per G-PEER-SPEEDTEST §7.1). AL will decide publisher-retirement; H planning should articulate value.js's stake (NOT-retire-yet, or migration timeline if retire-greenlit).
4. **0-of-8 glass-ui primitive asks shipped** at H open — identical posture to G open. The chronic-cluster persists; the (c) trigger (glass-ui's next non-AK tranche-open) has not fired. If H planning depends on any of the 8 asks, it should remain self-contained / shim-based, not ship-blocking.
5. **No new contraction-posture inversion signals.** glass-ui's 8 standing asks fall under "primitive expansion" — opposite vector to contraction. The contraction posture (DockGroup retired; ProgressiveSidebar retired) holds. No "expansion-pivot" precondition has surfaced.
6. **Cross-repo write boundary (F3) re-honored** for this audit lane: zero git-mutating operations issued in any sibling. All inspection was via `git rev-parse`, `git log`, `git status`, `git rev-list`, `git fetch` (read-only — `fetch` updates local remote refs but does not write to peer-repo working trees or refs). Compliant with F3 + the lane's "no git operations that mutate state" binding.

---

## §9 — Implication for H

This lane's findings position H opening against the cross-repo manifest as follows:

- **H can proceed without peer-blocking** for any internal value.js work that does not require: (a) glass-ui shipping the 8 primitive asks, (b) keyframes.js pushing its 14-commit chain, (c) fourier-analysis cleaning its 109-dirty tree. None are H-W1 prerequisites for library-internal work.
- **H should treat AL as the most-coordinatable peer signal.** AL opened the same weekend with the same audit-cohort shape; AL's W0 deliberations on glass-ui ask satisfaction + Metaballs publisher-retirement will produce signal H should consume. Suggest H W0 lanes include "AL coordination briefing" + a parking-spot for AL ratification gate signals.
- **H should NOT assume any of the 8 glass-ui primitive asks land in-tranche.** Zero shipped at G close, zero shipped at H open. If H-planning needs any, design with self-contained shims; treat satisfaction as bonus, not predicate.
- **H should brief value.js's sole-identified-consumer stake in `glass-ui/MetaballCanvas`** for AL's audit cohort to weigh. The publisher-retirement question is now genuinely on AL's table (AK W5 firmed it up); value.js needs to articulate "retire-when-X" or "do-not-retire-because-Y" before AL's ratification gate clears.
- **H should treat keyframes.js as locally-correct + chronically-unpushed.** Unchanged (c) trigger 4 + 5. No further value.js action.
- **H should treat fourier-analysis + CW Phase-2 as out-of-scope.** Both static.
- **Precept-pin discipline for H open**: pin `68d9b20` (current); no rebase needed; advance only on explicit precept-amendment authoring (out of scope for this audit lane).

**Lane verdict**: AUDIT COMPLETE. **No (c) trigger fired cleanly enough to retire its carry-forward ask** at H open. **One trigger (row 2 Metaballs sole-consumer) substantively advanced** — value.js is now the confirmed sole-identified-consumer of `glass-ui/MetaballCanvas` (publisher-retirement question moves to AL audit). **Zero blocking conditions found for H plan synthesis**. Four named flags for synthesis:

  1. **0-of-8 glass-ui asks at H open** (no movement since G close); chronic-cluster persists.
  2. **value.js is sole-identified-consumer of `glass-ui/MetaballCanvas`** post-AK-W5; H should brief AL with value.js's retirement-stake position.
  3. **AL planning-mode synchronous with H planning-mode** — coordination opportunity; AL ratification-gate signal is a (c) trigger H should park-watch.
  4. **Constellation-wide zero-mutation G→H boundary**; nothing happened SHA-wise between G close and H open. The substrate is still + ready.
