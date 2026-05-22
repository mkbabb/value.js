# G — speedtest deep audit (value.js-side actions)

**Lane**: G-PEER-SPEEDTEST (deferred deep-audit; chartered post-G.W0-close).
**Posture**: READ-ONLY across speedtest + value.js. WRITE only this artefact.
**Author date**: 2026-05-21.
**Branch + HEAD (value.js)**: `tranche-g` @ `0b9832c` (G.W0 close + ratification record).
**Branch + HEAD (speedtest)**: `master` @ `e9f85c16` (post-AK close ceremony; `ak-close` tag at `7701b253`; AL-SEED authored).

**Drift vs source-prompt baseline**: prompt anchors speedtest at `a15857d0` (AK RATIFIED) which was true at G open. Speedtest then executed all 8 substantive AK waves + W-HANDOFF + W-CLOSE in the same calendar day, landing at `e9f85c16` (+6 commits past the G-AUDIT-4 §4 baseline). AK is now CLOSED (not in-flight). AL-SEED.md is the forward-carry artefact.

---

## §1 — Tranche AK deep-walk

### §1.1 Structure

`speedtest/docs/tranches/AK/`:

| File | Purpose |
|---|---|
| `AK.md` | W0 scaffold; 14 precepts; 6-lane audit plan; halt-for-ratification |
| `RATIFIED.md` | G-AK-D1..D14 ratified dispositions; combined ratification + implementation-go stamp |
| `W8-W-HANDOFF-DISPOSITION.md` | Orchestrator-direct re-verification of W8 + W-HANDOFF gates (both DEFER) |
| `FINAL.md` | Close ceremony: 8 substantive waves landed; -82 KB entry-path plateau; 487/487 + 457/457 GREEN |
| `AL-SEED.md` | Forward-carry ledger to AL (15 carries across 7 categories) |

### §1.2 Ratified 14 decisions (G-AK-D1..D14)

| # | Decision | Disposition |
|---|---|---|
| D1 | METABALLS-RETIRE | RETIRE both consumer sites; publisher `positioning="local"` preserved |
| D2 | UNIFIED-CHASSIS-JOURNEY | RATIFY (App-level InstrumentChassis spine) |
| D3 | FONT-MEMORY | UPDATE `[[project_speedtest_fonts]]` |
| D4 | DEPLOY | DEFER (now 7-tranche chronic AE→AK) |
| D5 | PUSH-MANIFEST | Co-gate with D4 |
| D6 | W11-VUE-3.6 | DEFER (npm `latest=3.5.34`; 3.6 at beta.12) |
| D7 | W13-VUE-ROUTER-5 | DEFER (no user direction) |
| D8 | SUB-BARREL-PUBLISHING | ABSORB to W3+W4 |
| D9 | INSTRUMENT-RAIL primitive | RATIFY at glass-ui (W2-α) — cockpit-ratio 0.222 → 0.382 |
| D10 | SURVEY-CHASSIS-NATIVE | RATIFY; absorbed into W2-α/β |
| D11 | AURORA-OPACITY-CEILING | RATIFY per-route `:opacity-ceiling` prop (W6-α) |
| D12 | METER-STACK-RHYTHM-RETIRE | RATIFY (zero consumers) |
| D13 | ADMINLOGIN-H1-LIFT | RATIFY (1-line `text-display-3` swap) |
| D14 | SCRIM-BREATH-KEYFRAME | PATH B (glass-ui publisher canon) |

### §1.3 value.js touchpoints in AK docs

`grep -rn -i "value\.js\|@mkbabb/value" speedtest/docs/tranches/AK/`:

| File | Line | Reference |
|---|---|---|
| `AK.md` | 45 | "constellation push manifest (~80+ commits across speedtest + glass-ui + **value.js** + keyframes.js + bbnf-buddy + words)" |
| `AK.md` | 52 | Peer-specific chronic: "**value.js** demo typecheck errors (120)" |
| `AK.md` | 61 | A2 lane scope: "cross-repo state (... **value.js**/keyframes.js/bbnf-buddy/words pinned ...)" |
| `RATIFIED.md` | 39 | Cross-repo HEAD inventory: "**value.js** master: `bdfecf2a` (tranche-f drifted +3 from AJ pin)" |
| `FINAL.md` | 177 | Push manifest row: "**value.js** | 9 (tranche-f open)" |
| `AL-SEED.md` | 80 | "AL-CARRY-**VALUE-JS**-DEMO-CHRONICS (value.js follow-on)" |
| `AL-SEED.md` | 84 | "AL-CARRY-LUCIDE-GITHUB-BRAND (**value.js** alias-hygiene)" |

**Verdict**: AK references value.js only as (a) a peer in the push-manifest inventory, (b) a tracked-but-peer-bound chronic (value.js demo typecheck errors @ 120 — historical; value.js's actual current vue-tsc count is **0** post-F.W3 Lane C strict-zero gate per `node.js.yml:46-53`), and (c) two AL-bound follow-on items (`AL-CARRY-VALUE-JS-DEMO-CHRONICS` + `AL-CARRY-LUCIDE-GITHUB-BRAND`). **AK takes no value.js-side action.** The 120-typecheck-error chronic is stale.

### §1.4 glass-ui interactions in AK (value.js peer)

AK touches glass-ui substantively across 5 waves (W1-α scrim-breath keyframe; W2-α InstrumentRail primitive; W3 sub-barrel publishing; W5 Metaballs publisher contract preserved; W6-α Aurora opacity-ceiling prop). Glass-ui is at `3822f48` post-AK (5 commits past `e150e2f` which was the G-open glass-ui HEAD per `coordination/Q.md`). **This is significant drift for the cross-repo coord — but ALL of those glass-ui writes are AK-internal and unrelated to value.js's 7 outstanding asks** (Metaballs renegotiation per G's R1; Aurora derive; BlobDot; SelectTrigger; DockSelectTrigger; TooltipContent; Button; Tabs).

---

## §2 — D1 METABALLS-RETIRE interaction with G's R1

### §2.1 The renegotiation context

G.W0 ratification accepted (per `coordination/Q.md §2.1`):
> "AJ-W1-β shipped `MetaballCanvas` `positioning="viewport|local"` + AJ-W4-γ `:duration`. The user ratified the renegotiation 2026-05-21: AJ's `positioning` + `:duration` props are ACCEPTED as fulfilling the original ask's positionSource + duration sub-clauses."

The remaining sub-asks (events `@bloom-start`/`@bloom-end`; programmatic `bloom()` method; particle-count control; explicit gradient direction) carry forward at the original (c) trigger.

### §2.2 What AK D1 actually retired

AK W5 retired the **two speedtest consumer sites** of MetaballCanvas:
- W5-α (`8cf9dda7`): meter-idle backdrop at `MeterColumn` (-116 LOC)
- W5-β (`2128270e`): CompleteBadge gold-blob (-141 LOC)

Per `AK/RATIFIED.md §1 D1` and `AK/FINAL.md §2 W5`: "publisher `positioning='local'` contract stays for downstream consumers." Glass-ui's `MetaballCanvas` primitive is NOT retired.

### §2.3 AL-SEED forward-pressure

`AL-SEED.md §5 row 2` raises a candidate worth noting:

> **AL-CARRY-METABALLS-PUBLISHER-CONSUMERS** — Speedtest no longer consumes MetaballCanvas. If no other constellation peer uses it, the primitive could retire at glass-ui too. Verify at AL W0.

**value.js IS a MetaballCanvas consumer** via its demo (verified at G-AUDIT-4 §2.2: "the renegotiation context exists *because* value.js demo uses Metaballs"). If AL retires the publisher, value.js's demo loses the primitive without warning.

### §2.4 Cross-walk verdict

**Direction of pressure**: AK's D1 reinforces value.js's R1 carry — value.js is now the **sole identified MetaballCanvas consumer** in the constellation. The remaining 4-5 sub-asks (events / `bloom()` / particle-count / gradient-direction) gain a NEW (c) trigger: "AL considers MetaballCanvas publisher retirement → value.js demo becomes the deciding consumer voice."

**No FOLD-INTO-G action required**; G's R1 disposition holds. **One INFORMATIONAL item surfaces**: value.js should self-track that it is now sole-consumer of `glass-ui/MetaballCanvas`, so AL's retirement consideration cannot blindside the demo. Capture in coordination/Q.md §2.1 or as a self-note in CLAUDE.md.

---

## §3 — Tranche-discipline pattern observations

### §3.1 Comparison matrix

| Discipline | speedtest AK | value.js G |
|---|---|---|
| W0 audit lanes | 6 parallel (A1+A2+A3+A4+A5+FD1) + 1 synthesis (A7) | 6 parallel (G-AUDIT-1..6); synthesis inline in G.md |
| Decision board | 14 G-AK-D decisions ratified en masse | 22 carry-forward items grouped into 5 ratification blocks |
| Ratification protocol | Combined ratification + implementation-go in one signal (G-AK-D1..D14 all-at-once) | G1 binding: per-block ratification BEFORE implementation; user replied via AskUserQuestion 4-question protocol |
| Two-gate discipline | Precept 14 ("ratifying a tranche plan is NOT a go to implement; needs separate explicit signal") | G1: same intent, sharper because AskUserQuestion forces explicit-per-block answers |
| Worktree isolation | Precept 9 + 13 (per-lane worktrees off pinned base; orchestrator merges; XR sub-protocol) | Less formal — value.js G uses sequential lane execution, not parallel worktrees |
| Audit-driven refinement | Precept 8 (4-6 parallel audits at every wave-close) | Single-lane wave closes; audit lanes only at tranche-open |
| Cross-repo write boundary | Precept 13 (publisher writes followed by dist regen + resolution-verify; pushes orchestrator-only) | F3 (zero cross-repo writes by default; equivalent intent narrower scope) |

### §3.2 What value.js could LEARN from speedtest's AK

#### Pattern A — Wave-close parallel audits (precept 8)

speedtest dispatches **4-6 parallel audits at every wave-close boundary**, not just at tranche-open. Example from AK FINAL.md §2 W1: "W1 close audit: PASS (engineering 8/8; FD GREEN/GREEN/YELLOW on δ chassis budget → resolved by W1-close refinement)."

value.js G runs 6 audits at G-OPEN only. F.W4-bench/ directory shows some wave-close artefacts but no formal "4-6 parallel audit lanes at every wave-close" discipline.

**Adoption fit**: MARGINAL. value.js's waves are smaller-surface than speedtest's; running 4-6 parallel audits at every wave-close may be over-instrumented for a single-repo library tranche. **Disposition**: INFORMATIONAL ONLY.

#### Pattern B — Worktree isolation (precept 9)

speedtest mandates `agents write only in orchestrator-managed worktrees off a pinned base; orchestrator merges`. Visible in the `.claude/worktrees/agent-*` directory inventory (20+ worktrees observed).

value.js has no equivalent. Lane work happens directly on `tranche-g`.

**Adoption fit**: MARGINAL. value.js G is single-author + sequential lanes; worktree isolation matters for parallel multi-agent dispatch which value.js doesn't do.

#### Pattern C — Combined ratification + implementation-go signal

speedtest's RATIFIED.md §1: "Ratified 2026-05-21 by user via combined ratification + implementation-go signal."

This is the OPPOSITE of value.js's G1. value.js's G1 is the right discipline for a library tranche where wave dispatch is fast and the user wants per-decision visibility; speedtest's combined signal is right for a 30+ wave tranche where per-decision ratification would be paralysing.

**Adoption fit**: G1 holds; no change. INFORMATIONAL.

#### Pattern D — Forward-carry SEED ledger

speedtest's `AL-SEED.md` (authored at AK close) is a **dedicated 96-line forward-carry ledger to the next tranche** with 8 categorized sections (load-bearing carries; architectural taste-debts; conditional dep waves; fourier-handoffs; sub-barrel hygiene; smaller deferred items; peer-specific chronics; tranche arc projection).

value.js's F → G handoff used `G-AUDIT-2-deferred-ledger.md` (G-side audit lane) — which works, but the artefact lives in the **successor's** tranche, not the **predecessor's** close ceremony. The speedtest pattern is *predecessor authors the seed*; the value.js pattern is *successor authors the ledger*.

**Adoption fit**: MEDIUM — worth considering for G close. value.js's G.W4 could author a `H-SEED.md` (next-tranche letter) alongside FINAL.md, mirroring speedtest's AL-SEED.md.

**Disposition**: FOLD-INTO-G candidate at G.W4 (close ceremony lane addition).

#### Pattern E — Two-gate discipline (precept 14)

speedtest precept 14: "ratifying a tranche plan is NOT a go to implement; implementation needs a separate explicit signal."

value.js G1 is structurally identical but framed at the carry-forward-item level (per-block ratification) rather than the tranche level. Both achieve the same intent.

**Adoption fit**: HELD; no change.

---

## §4 — CI / scripts / proof patterns

### §4.1 speedtest's check + proof harness

speedtest `package.json` scripts:

```
"check": "npm run check:client && check:server && check:worker && check:worker-imports && check:boundary && check:bare-builtins && check:internal-boundaries && check:deep",
"check:boundary": "node scripts/check-glass-ui-boundary.mjs",
"check:bare-builtins": "node scripts/check-bare-built-ins.mjs",
"check:internal-boundaries": "node scripts/check-internal-boundaries.mjs",
"check:deep": "node scripts/check-deep.mjs",
"proof": "node scripts/proof/runner.mjs"
```

`scripts/proof/`:
- `runner.mjs` — CLI; profiles: `fast` (root check; no tracked writes) vs `close` (full close matrix; writes JSON)
- `manifest.mjs` — single source of truth for commands + repos + profiles
- `util.mjs` — `REPO_ROOT`, `runCommand`, `snapshotRepos`
- `adapters/` — 9 self-contained proof adapters (`style.mjs`, `bundle.mjs`, `coverage.mjs`, `lighthouse.mjs`, `playwright.mjs`, `frame.mjs`, etc.) each writing its own JSON artefact

### §4.2 value.js's CI + scripts

value.js `.github/workflows/node.js.yml` is a single 256-line workflow with: lint → vue-tsc strict-zero → build → dts-layout invariant → bundle-size gate → vitest → backend tests → proof:resolution → bench → Playwright (5 projects) → CHANGELOG-changed gate.

value.js `scripts/`:
- `generate-favicon.mjs`
- `migrate-keyframes-js-lerp.mjs`
- `proof-dts-layout.mjs`
- `proof-resolution-contract.mjs`

### §4.3 Pattern adoption candidates

#### §4.3.1 `check:deep` (forbid `:deep()` regression gate)

speedtest `scripts/check-deep.mjs` (AD.W2.T7) walks `.vue`/`.css`/`.scss` files and **fails CI on any non-narrative `:deep(` match**. AD precept 6: "NO `:deep()`, `as any`, `as unknown as`, `@ts-ignore`, `it.skip` without explicit halt + rationale."

value.js's parallel precept is precept 33 + G2 (`as any` corpus reduction); value.js has `as any` budget proof script (G.W3 Lane D — `proof-as-any-budget.mjs` planned).

**The `:deep()` lane is MISSING from value.js's G.W3.** value.js's demo/ has 192 .vue files (per radix-vue → reka-ui migration count); `:deep()` is not enumerated in G2/G3 lane coverage. If demo/ has any `:deep()` calls, they're not gated.

**Disposition**: FOLD-INTO-G candidate — G.W3 SCRIPTS-5 (`proof:no-deep`). Mirror `proof:no-deprecated` (G.W3 Lane B) shape.

#### §4.3.2 Profile-based proof runner

speedtest `scripts/proof/runner.mjs` has **two named profiles** (`fast` for dev loop; `close` for tranche-close matrix). Single CLI entry, manifest-driven, adapter pattern for per-domain proofs.

value.js has 2 proof scripts (`proof-dts-layout.mjs`, `proof-resolution-contract.mjs`) + 4 G.W3-planned (no-deprecated, no-ts-ignore, as-any-budget, resolution-types-key extension) + the bench gate run inline in CI. **No unified runner; no profile concept.**

Once G.W3 lands 4 more proof scripts (~6 total), the unified-runner pattern becomes more valuable — `npm run proof` (fast) vs `npm run proof -- --profile close` (full matrix).

**Disposition**: RAISE-AS-NEW-ASK — H-tranche material (post-G.W3 codification). NOT G-fold; G.W3 already lands 4 standalone proof scripts via the simpler per-script pattern. Reconsider once the script count justifies the runner abstraction.

#### §4.3.3 `check:bare-builtins` (Node-builtins `node:` prefix gate)

speedtest `scripts/check-bare-built-ins.mjs`: any import of `events`/`fs`/`path`/`crypto`/`stream`/`http`/`buffer` without the `node:` prefix fails CI.

value.js's `api/` is Hono + MongoDB on Node 22+; same surface. value.js `src/` doesn't import Node builtins (it's a browser library), so `src/` is exempt — but `api/src/` has the same fragility class speedtest's script protects against.

**Disposition**: FOLD-INTO-G candidate — G.W3 Lane E (API-1) is adjacent surface; addition of `check:bare-builtins` for `api/src/` is a small parallel lane. Could also live as G.W3 Lane I or H-fold.

#### §4.3.4 Constellation-wide proof manifest

speedtest `scripts/proof/manifest.mjs` REPOS map enumerates `speedtest`, `glassUi` (`../glass-ui`), `keyframesJs` (`../keyframes.js`) — cross-repo proof orchestration treats neighbour repos as first-class commands (`glass-ui.typecheck`, `glass-ui.build`, `keyframes.check`, etc.).

value.js's `proof:resolution` (`scripts/proof-resolution-contract.mjs`) is a single-repo probe with cross-repo READS (it checks glass-ui's exports map resolution) but no equivalent multi-repo proof matrix.

**Disposition**: CARRY-FORWARD / INFORMATIONAL. Cross-repo proof matrices belong at the constellation root (CW tranche scope per `speedtest/docs/tranches/CW/CW.md §A4`), not at any single member. value.js can't unilaterally adopt without provoking the cross-repo-write boundary (F3).

### §4.4 What speedtest does NOT have that value.js does

- **Bench gate with median-speedup parsing** (value.js `.github/workflows/node.js.yml:111-179`). This is value.js-specific (color/parsing microbenches); speedtest doesn't have this surface. NO ADOPTION DIRECTION.
- **Bundle-size gate at the byte level** (value.js `node.js.yml:73-81`). speedtest has dist/ chunk-budget proof (`proof.bundle` adapter) — different shape, similar intent.
- **CHANGELOG-changed PR gate** (value.js `node.js.yml:221-227`). speedtest has no `CHANGELOG.md` (it's an internal-app repo, not a published library).

---

## §5 — CW seed status (informational)

`speedtest/docs/tranches/CW/CW.md` (planning-only since AH-R5-beta seed; 2026-05-19) — 224 lines, status unchanged at G open.

### §5.1 Quiescence preconditions (per CW.md §Halt)

CW-W0 dispatch gated on:
- (a) AH-CLOSE landing (`ah-close` tag + AH FINAL.md ratified) — **MET** (AH closed; AI/AJ/AK have all landed since)
- (b) Phase-0 quiescence preconditions per CW-precept 14:
  > "value.js's `tranche-b` and fourier-analysis's `codex/contour-rebaseline` quiesced — landed on master, clean tree — OR an explicit per-member opt-in plan from those teams"
- (c) separate explicit user "open CW W0" signal — **NOT GIVEN**

### §5.2 value.js's quiescence status

value.js was on `tranche-b` (30 dirty files) at CW seed time. Per the user's MEMORY.md: tranche-b CLOSED 2026-05-19; subsequent tranches D + E + F closed; G is currently in flight on `tranche-g`. value.js's `master` is at `6b3a41b` (v0.8.0 tag, F merge); the `tranche-g` branch is the in-flight work. **value.js side is materially clean for CW Phase-0 purposes**, but the strict reading of CW-precept 14 ("clean tree on master") would still flag `tranche-g` as in-flight.

### §5.3 CW reference to value.js

CW.md references value.js in 8 places (per grep). The two load-bearing references:

- **CW-CARRY-VALUEJS** (CW.md:152-161): "value.js contract-v2 patch (HANDED OFF in AH W-HANDOFF)... A4 §3.3 establishes the new finding: in the workspace, the `development` export condition is moot because Vite resolves sibling `src/` directly — so CW does NOT need to chase value.js's team to apply the patch first."
- **CW-A4 quiescence audit** (CW.md:196): designed to re-run the working-tree inventory at the live CW-open moment.

### §5.4 Verdict

Per G-AUDIT-4 §4.3 + G coordination/Q.md §3.4: "the 'value.js participation' framing is RETIRED. CW Phase-2 carries forward as INFORMATIONAL ONLY."

**Re-validation at this audit**: HOLDS. speedtest's CW.md still names value.js as a workspace-flip member (CW.md:67 + 156 + 159), but the contract-v2 patch concern is now moot per CW.md:155-158. The post-D `development` condition (per value.js's recent commit `70e61e9 refactor(freshness): add 'development' condition`) is in line with CW's expectation, NOT a blocker.

**No actionable value.js side. INFORMATIONAL.**

---

## §6 — speedtest's reference to value.js (verify absence)

### §6.1 Workspace package.json grep

`grep "value\.js\|@mkbabb/value" speedtest/{package.json,server/package.json,workers/speedtest-edge/package.json,scripts/lighthouse-plugins/speedtest-skeleton-paint/package.json}`:

**Zero matches.** Verdict from G-AUDIT-4 §4.3 HOLDS at speedtest HEAD `e9f85c16`.

### §6.2 Stale-reference scan in speedtest docs

Past coord tracking ("CW Phase-2 value.js participation") was raised by G-AUDIT-4 §4.3 as stale. Re-scan at this audit:

- `speedtest/docs/tranches/CW/CW.md`: 8 references (load-bearing per §5 above; ALL framed as future-workspace-member references, not current-dependency references)
- `speedtest/docs/tranches/AK/`: 7 references (per §1.3 above; all push-manifest inventory or AL-bound peer-chronic)
- `speedtest/docs/tranches/CW/seed-references.md:48`: "**CW-CARRY-VALUEJS** — value.js contract-v2 patch (HANDED OFF in..."

**No stale "speedtest consumes value.js" framing remains in speedtest's authored docs at HEAD.** The references that exist are correctly framed as:
- (a) push-manifest peer-inventory (correct);
- (b) AL-bound peer-chronic tracking (correct; lives in AL-SEED §7 explicitly as "Peer-specific chronics — peer follow-on, not AL-bound");
- (c) CW workspace-member references (correct; CW.md treats value.js as a future workspace flip target, not a current consumer);
- (d) the AL-SEED §7 `AL-CARRY-VALUE-JS-DEMO-CHRONICS` carry **carries forward a stale 120-error count** (value.js's actual count is 0 post-F.W3 Lane C).

### §6.3 The 120-typecheck-error stale claim

`AK.md:52`: "value.js demo typecheck errors (120)" — this number was probably captured at the AJ-pin (`bdfecf2a` per RATIFIED.md:39, i.e. tranche-f drifted +3 from AJ pin). value.js's CURRENT state per `node.js.yml:46-53` is **0 vue-tsc errors** (strict-zero gate enforced).

**Action consideration**: this is a peer-authored doc; per F3 + G default, value.js should NOT write to speedtest's docs. The path forward is either:
- (a) note as PEER-AUTHORSHIP-REQUIRED for speedtest's AL W0 audit lane (AL-A* equivalent to AK-A2 cross-repo state) to refresh the chronic-tracking count;
- (b) capture as INFORMATIONAL with a self-note that speedtest's chronic-tracking is one tranche stale.

**Disposition**: INFORMATIONAL — raise in coordination/Q.md §5 (speedtest section) at G close. NOT a value.js-internal action.

---

## §7 — value.js-side actions surfaced

### §7.1 FOLD-INTO-G candidates

#### Candidate 1 — `proof:no-deep` lane addition

**Surface**: `docs/tranches/G/waves/G.W3.md` (current file authoring Lanes A-H).
**Proposed change**: ADD Lane I — `SCRIPTS-5: proof:no-deep` — mirrors Lane B (`proof:no-deprecated`) shape against `:deep(` pattern.

```mjs
#!/usr/bin/env node
// Codifies precept-6-analogue at value.js: zero :deep() in demo/ + src/.
// Mirrors speedtest's scripts/check-deep.mjs (AD.W2.T7).
import { execSync } from "node:child_process";
const out = execSync('grep -rn ":deep(" demo/ src/ 2>/dev/null || true', { encoding: "utf8" });
const count = out.trim() ? out.split("\n").length : 0;
if (count > 0) {
    console.error(`[proof:no-deep] FAIL — found ${count} :deep() site(s):`);
    console.error(out);
    process.exit(1);
}
console.log("[proof:no-deep] PASS — zero :deep() in demo/ + src/");
```

**Justification**: speedtest's AD precept 6 / AK precept 6 enforce this; value.js inherits the same precept (D/E/F precepts) but lacks the CI gate. value.js has ~192 .vue files in demo/; current `:deep()` count unknown — proof gate would surface it.

**Effort**: ~15 LOC script + 1 line `package.json` + 1 CI step. Small.

#### Candidate 2 — `proof:no-bare-builtins` for `api/src/`

**Surface**: `docs/tranches/G/waves/G.W3.md` Lane E (API-1) adjacent.
**Proposed change**: ADD Lane J — `API-3: proof:no-bare-builtins (api/src/)` — port speedtest's `scripts/check-bare-built-ins.mjs` to `value.js/scripts/proof-no-bare-builtins.mjs` scoped at `api/src/`.

**Justification**: value.js's `api/` is Hono + MongoDB on Node 22+. Same fragility class speedtest's script protects against (local directory shadowing of `events`/`fs`/`path`/`crypto`/`stream`/`http`/`buffer`). G.W3 already opens API-1 (withTransaction expansion) + API-2 (engines.node); API-3 is a natural sibling.

**Effort**: port script + 1 CI step + verify clean at HEAD. Small.

#### Candidate 3 — `H-SEED.md` at G close (predecessor-authored forward-carry ledger)

**Surface**: `docs/tranches/G/waves/G.W4.md` (close ceremony spec).
**Proposed change**: ADD as a G.W4 lane — author `docs/tranches/G/H-SEED.md` alongside `FINAL.md`. Mirror speedtest's `AL-SEED.md` shape:
- §1 Load-bearing carries (user-binding)
- §2 Architectural taste-debts (if any close at G with carry-forward)
- §3 Conditional dep waves
- §4 Cross-repo peer carries (the 7 glass-ui asks + 2 keyframes.js items)
- §5 Smaller deferred items + library hygiene
- §6 Peer-specific chronics (peer follow-on, not H-bound)
- §7 Tranche arc projected through H

**Justification**: value.js's current pattern places the deferred-ledger work in the **successor's** G-AUDIT-2 lane. speedtest's pattern places it in the **predecessor's** close. The predecessor-authored seed:
- (a) reduces re-discovery cost at successor open;
- (b) records the closing author's intent before context-window pressure;
- (c) mirrors the close-honesty checklist intent (G.W4 already has a "close-honesty checklist" planned per G.md:117).

**Effort**: 1 audit lane authored at G.W4; ~100 LOC markdown. Small. Complements rather than replaces successor-side audit.

### §7.2 CARRY-FORWARD

#### CF-1 — Profile-based proof runner (defer to H-tranche)

speedtest's `scripts/proof/runner.mjs` profile-based runner makes sense once value.js has ~6+ proof scripts. Post-G.W3, value.js will have 6 (dts-layout, resolution-contract, no-deprecated, no-ts-ignore, as-any-budget, plus possibly no-deep + no-bare-builtins if §7.1 lands). At H-open, the unified runner becomes a natural consolidation.

**Disposition**: Capture as `H-CARRY-PROOF-RUNNER` in H-SEED.md (per §7.1 Candidate 3).

#### CF-2 — Sole-consumer status for `glass-ui/MetaballCanvas`

Per §2.3, value.js is now sole-identified-consumer of `MetaballCanvas`. AL's retirement consideration (AL-SEED §5 AL-CARRY-METABALLS-PUBLISHER-CONSUMERS) cannot blindside the demo.

**Disposition**: Update `docs/tranches/G/coordination/Q.md §2.1` (Metaballs section) with a sole-consumer self-note. Carry as `G-CARRY-METABALLS-SOLE-CONSUMER` through G close. CF, not FOLD — already inherent in G's R1 disposition; the carry just sharpens the trigger.

### §7.3 RAISE-AS-NEW-ASK

#### NA-1 — None surfaced for cross-repo write

Per F3 + G default, value.js does not author at peer repos. The two stale-reference items observed (AK.md:52 120-typecheck count; AL-SEED §7 AL-CARRY-VALUE-JS-DEMO-CHRONICS) are noted as INFORMATIONAL (§6.3), NOT raised as new asks. speedtest's authorship is theirs; value.js's role is to ensure its OWN coord docs reflect the current state.

**Disposition**: ZERO new asks raised. The audit yields adoption candidates (§7.1) + carries (§7.2), not peer-asks.

### §7.4 INFORMATIONAL ONLY

#### INF-1 — Speedtest's AK is the constellation's most active surface at G open

Per G-AUDIT-4 §4 + this audit's §1: AK opened + ratified + executed all 8 substantive waves + W-HANDOFF + W-CLOSE on the same calendar day as value.js's F close (2026-05-21). Net: +88 commits at speedtest, +5 at glass-ui, since the G-coordination baseline. value.js is the only constellation peer that has held its substrate at v0.8.0 / `tranche-g` G.W0 close.

This is a constellation-rhythm observation — speedtest absorbs the active development pulse; value.js's measured G-pace (planning-only + ratification-first) is intentional and per-G1 binding. No action required.

#### INF-2 — speedtest precept 14 + value.js G1 converge on the same intent

Both repos arrived independently at the "ratification ≠ implementation-go" discipline. speedtest formalized it tranche-wide (precept 14); value.js sharpened it carry-item-wide (G1). Each shape fits its repo's tranche-surface size. The convergence is signal — the two-gate discipline is a sound cross-repo precept worth retaining at both sides.

**No action**; INFORMATIONAL acknowledgement.

#### INF-3 — speedtest's `AL-CARRY-VALUE-JS-DEMO-CHRONICS` carries stale 120-typecheck-error count

Per §6.3: speedtest's AK.md:52 (carried to AL-SEED:80) records "value.js demo typecheck errors (120)"; current value.js count is 0 post-F.W3 Lane C strict-zero gate. value.js cannot author at speedtest; the path forward is to surface in `coordination/Q.md` at G close so AL's W0 audit lane can refresh the chronic-tracking count.

**No value.js source change**; coord-doc update at G.W4 close.

#### INF-4 — CW.md still names value.js as workspace-flip member but contract-v2 patch concern is now moot

Per §5.3-5.4: CW.md treats value.js as a future workspace flip target (correct framing). The post-D `development` export condition addition (`70e61e9 refactor(freshness): add 'development' condition + relativize @src/* imports`) aligns value.js with CW's expectation, NOT a blocker. The "CW Phase-2 value.js participation" framing is correctly RETIRED at value.js's G coord.

**No action**; INFORMATIONAL acknowledgement.

---

## §8 — Synthesis & disposition tally

### §8.1 Disposition tally

| Disposition | Count | Items |
|---|---|---|
| FOLD-INTO-G | 3 | proof:no-deep (G.W3 Lane I); proof:no-bare-builtins for api/src/ (G.W3 Lane J); H-SEED.md (G.W4 lane add) |
| CARRY-FORWARD | 2 | CF-1 profile-based proof runner → H; CF-2 MetaballCanvas sole-consumer self-note → coordination/Q.md |
| RAISE-AS-NEW-ASK | 0 | None (per F3 + G default; no cross-repo writes) |
| INFORMATIONAL ONLY | 4 | INF-1 speedtest constellation-pulse; INF-2 precept 14 ↔ G1 convergence; INF-3 stale 120-typecheck claim in AL-SEED; INF-4 CW Phase-2 value.js framing correctly retired |
| **Total surfaced** | **9** | — |

### §8.2 Headline verdict

speedtest's AK closes a substantial architectural-transposition tranche but **touches value.js only at the push-manifest / chronic-tracking layer**. value.js's G-coord (Q.md + G-AUDIT-4) is correctly framed; the prompt's premise that "speedtest does NOT consume value.js" holds at speedtest HEAD `e9f85c16`.

The audit's value yield is **cross-repo pattern adoption**: 3 small G-foldable improvements (proof:no-deep, proof:no-bare-builtins, H-SEED.md) and 1 H-tranche carry (profile-based proof runner). The Metaballs sole-consumer status sharpens G's R1 trigger.

speedtest's two-gate ratification discipline (precept 14) + parallel-audit-driven-refinement (precept 8) are sound patterns; value.js's G1 + 6-lane-at-open match the intent at the tranche-surface-size value.js operates at. No invariant change required.

### §8.3 Specific G.W3 + G.W4 wave-spec deltas (if §7.1 candidates ratify)

| File | Section | Change |
|---|---|---|
| `docs/tranches/G/waves/G.W3.md` | `### Lane I — SCRIPTS-5: proof:no-deep` | ADD lane (after Lane D) |
| `docs/tranches/G/waves/G.W3.md` | `### Lane J — API-3: proof:no-bare-builtins` | ADD lane (after Lane F API-2) |
| `docs/tranches/G/waves/G.W4.md` | `### Lane K — H-SEED.md authorship` | ADD close-ceremony lane |
| `docs/tranches/G/G.md` §3 | Wave schedule G.W3 row | Update headline to include "+ no-deep + no-bare-builtins scripts" |
| `docs/tranches/G/G.md` §2 G4 | G4 invariant text | UPDATE "4 new proof scripts" → "6 new proof scripts" (no-deprecated, no-ts-ignore, as-any-budget, resolution-types-key, no-deep, no-bare-builtins) |
| `docs/tranches/G/coordination/Q.md` §2.1 | Metaballs renegotiation | ADD sole-consumer self-note + AL retirement-trigger |
| `docs/tranches/G/coordination/Q.md` §5 | speedtest section | ADD note on AL-CARRY-VALUE-JS-DEMO-CHRONICS stale count for AL W0 |

— G-PEER-SPEEDTEST deep-audit lane, 2026-05-21.
