# Coordination — value.js G ↔ glass-ui ↔ keyframes.js ↔ speedtest ↔ fourier-analysis

Cross-repo manifest at G open. Inherits F's `coordination/Q.md` §7 (F close summary) as the baseline; refreshed at peer HEADs per `audit/G-AUDIT-4`.

## §1 — Peer HEADs at G open (2026-05-21)

**This repo (value.js)**: `tranche-g` @ `6b3a41b` (F merge commit; v0.8.0 tag).
**Peer repo (glass-ui)**: HEAD `e150e2f` — **ZERO drift** vs F close. 33 commits unpushed to origin. Contraction posture INTACT (DockGroup + ProgressiveSidebar absent from active components). No new tranche-open since AJ.
**Peer repo (keyframes.js)**: HEAD `470814e` (F.W2 codemod commit) — **14 commits unpushed** to origin (the entire Q.W1 contract → freshness-gate retiral → demo restoration → W8-W12 modernization → F.W2 codemod chain). Working tree CLEAN. Both lerp call sites verified canonical `(a, b, t)`. Precept submodule still divergent `458c2d1` (vs upstream main `3310a8c`).
**Peer repo (speedtest)**: HEAD `a15857d0` (+2 vs F close). **NEW TRANCHE AK** opened + ratified + IMPLEMENTATION-GO same day as F close (2026-05-21). AI + AJ both CLOSED. CW Phase-2 STILL PLANNING-ONLY. **Speedtest does NOT consume value.js** (zero matches across workspace package.jsons) — past coord tracking was stale; G drops the speedtest-as-consumer assumption.
**Peer repo (fourier-analysis)**: HEAD `926ca6a` (ZERO drift). 109-file dirty tree exact. TS `^5.8` (no TS 6 catch-up). The constellation freezer.
**Shared submodule**: `docs/precepts` at `68d9b20` (ZERO drift; no upstream advance during F window OR G open).

> **G-AUDIT-4 §7 note**: F close didn't push anybody downstream (33 + 14 + 1 un-pushed commits same as F close); AK is the only peer with active tranche development at G open; CW Phase-2 still gated on un-met quiescence preconditions; the 7+1 glass-ui asks remain orthogonal to AK's surface so don't expect retirement from peer activity.

## §2 — Glass-ui (contraction posture acknowledged; AJ tranche shipped; Metaballs RENEGOTIATED)

**Glass-ui drifted +13 commits during F window** (AJ-tranche publisher activity) **+ 0 during G open** (zero drift). 7 of the 8 standing primitive/blob asks remain OPEN; the Metaballs ask is **partially renegotiated** per user ratification 2026-05-21 (see §2.1).

### §2.1 — Metaballs ask renegotiation (user-ratified 2026-05-21)

Per `audit/G-AUDIT-4 §2.2`: AJ-W1-β shipped `MetaballCanvas` `positioning="viewport|local"` + AJ-W4-γ `:duration`. The user ratified the renegotiation 2026-05-21: AJ's `positioning` + `:duration` props are **ACCEPTED** as fulfilling the original ask's positionSource + duration sub-clauses. The remaining sub-asks are re-scoped as:

| Sub-ask | Status | Note |
|---|---|---|
| positionSource (→ `positioning="viewport\|local"`) | **ACCEPTED via AJ-W1-β** | name reconciled to AJ shape |
| duration (animation timing) | **ACCEPTED via AJ-W4-γ** | name reconciled |
| pointer input (cursor-tracking blob influence) | OPEN | re-scope to AJ's component-property idiom (e.g., `:pointer-source="\"viewport\""`) |
| per-blob opacity | OPEN | possibly already a prop in AJ — re-verify at next dispatch |
| HSV color perturbation | OPEN | core ask remains |
| WebGL context-loss recovery | OPEN | core ask remains |
| MetaballCanvas mode="layout" | OPEN (overlaps with `positioning="local"`; needs verification) | possibly subsumed by AJ-W1-β |
| pauseOnHidden | OPEN | core ask remains |

The re-scoped sub-asks (4-5 items, down from 7) carry forward with the original ask's (c) trigger.

| Ask | G-open verdict | (a) blocker | (b) smallest unblock | (c) re-check trigger |
|---|---|---|---|---|
| 1 — Metaballs API additions (RENEGOTIATED at G open — see §2.1) | **PARTIALLY ACCEPTED via AJ** (positioning + duration accepted; sub-asks re-scoped per user ratification 2026-05-21) | glass-ui authorship for the re-scoped sub-asks | glass-ui maintainer ships the re-scoped subset | Re-check at glass-ui's next non-AK tranche-open. |
| 2 — Aurora `deriveAuroraPalette` + `deriveAuroraConfig` | OPEN | glass-ui authorship | glass-ui maintainer ships the derive helpers | Re-check at glass-ui's next non-AK tranche-open. |
| 3 — `BlobDot` organic-dot primitive | OPEN (10 `WatercolorDot` instance sites in demo per `audit/G-AUDIT-5 §5`) | glass-ui authorship | glass-ui ships BlobDot | Re-check at glass-ui's next non-AK tranche-open. |
| 4 — `SelectTrigger size` prop | OPEN | glass-ui authorship | glass-ui ships prop | Re-check at glass-ui's next non-AK tranche-open. |
| 5 — `DockSelectTrigger clampLabel` | OPEN | glass-ui authorship | glass-ui ships prop | Re-check at glass-ui's next non-AK tranche-open. |
| 6 — `TooltipContent variant="mono"` | OPEN | glass-ui authorship | glass-ui ships variant | Re-check at glass-ui's next non-AK tranche-open. |
| 7 — `Button size="icon-sm"` rung | OPEN (1 live consumer TODO at `demo/@/components/custom/palette-browser/PaletteSlugBar.vue:16` confirms chronic anchor per G-AUDIT-2) | glass-ui authorship | glass-ui ships rung | Re-check at glass-ui's next non-AK tranche-open. |
| 8 — `<Tabs variant="underline">` provider family | OPEN | glass-ui authorship | glass-ui ships variant | Re-check at glass-ui's next non-AK tranche-open. |

### Contract-v2 §2.1 font-asset residual

| Ask | G-open verdict | (c) trigger |
|---|---|---|
| 9 — Glass-ui font-inlining in `dist/glass-ui.css` (closes contract-v2 §2.1 residual; allows value.js to RETIRE `siblingFsAllowTransient`) | OPEN (verified at `audit/G-AUDIT-4 §2.3` — `dist/glass-ui.css` still has 0 `@font-face`, 0 `url()`) | Re-check at glass-ui's `dist/glass-ui.css` next-publish. |

## §3 — Keyframes.js (post-F.W2 codemod state)

### §3.1 — Local-only commit chain

Per `audit/G-AUDIT-4 §3.2`: **14 commits unpushed** to keyframes.js origin/master. These include:
- Q.W1 contract migration.
- Freshness-gate retiral.
- Demo restoration.
- W8-W12 modernization (TS 6 + Vite 8 + Rolldown + vue-tsc 3.3).
- W12-unblocker (TS error repairs).
- **F.W2 lerp codemod commit `470814e`** (applied 2026-05-21 per F.W2 Lane A).

The chain is fully local. keyframes.js's GitHub origin master still carries the pre-Q.W1 state. Third-party consumers pinning to keyframes.js master see broken lerp behavior when they update value.js to v0.8.0.

### §3.2 — F.W2 outcome (re-pinned at G open)

Per F.W2 close (commit `df0650c` + `coordination/Q.md §3.3`):
- keyframes.js HEAD: `470814e` (LOCAL ONLY).
- npm test PASS: 218/15 (vitest 4.1.7).
- Both lerp call sites (`numeric.ts:159` + `group.ts:251`) canonical `(a, b, t)`.
- Idempotency confirmed.

At G open: re-verified by `audit/G-AUDIT-4 §3.3`. No drift.

### §3.3 — G ratification request (R11)

| Ask | G-disposition | Proposed action |
|---|---|---|
| 11 — keyframes.js peer commit `470814e` push status | **RATIFICATION REQUESTED** | The 14-commit-local-only chain (including F.W2's codemod) needs maintainer decision. Options for user: (a) push the chain to keyframes.js origin master; (b) leave LOCAL until next keyframes.js work-window; (c) coordinate with keyframes.js maintainer for review. **G default**: option (b) — preserve the F.W2.md Lane B step 3 default; do not force-push. **Re-check trigger**: user ratification OR next keyframes.js work-window. |

### §3.4 — Precept-pin drift

| Ask | G-open verdict | (c) trigger |
|---|---|---|
| 10 — keyframes.js `docs/precepts` pin `458c2d1` (divergent vs upstream `68d9b20`) | OPEN | Re-check at keyframes.js maintainer's next submodule-rebase signal. |

## §4 — Speedtest (NEW TRANCHE AK + value.js NON-CONSUMER finding)

Per `audit/G-AUDIT-4 §4`: Speedtest opened tranche AK on 2026-05-21 (same day as F close) — ratified + IMPLEMENTATION-GO. 14 G-AK-D decisions ratified including:
- D1 METABALLS-RETIRE
- D9 INSTRUMENT-RAIL
- D11 AURORA-OPACITY-CEILING

CW Phase-2 STILL PLANNING-ONLY at G open. AI + AJ both CLOSED.

### §4.1 — value.js consumer status — STALE-COORD CORRECTION

Per `audit/G-AUDIT-4 §4.3`: **speedtest does NOT consume value.js**. Past coord tracking (B/D/E/F coordination/Q.md sections referencing "speedtest CW Phase-2 value.js participation") was stale. value.js was never wired into speedtest's workspace.

| Item | G-disposition | (c) trigger |
|---|---|---|
| 12 — CW Phase-2 activation (was: value.js participation) | CARRY-FORWARD as INFORMATIONAL ONLY | Re-check on user explicit signal. The "value.js participation" framing is RETIRED. |

## §5 — Fourier-analysis (constellation freezer — unchanged)

Per `audit/G-AUDIT-4 §5`: HEAD `926ca6a`, 109-file dirty tree, TS `^5.8` (no W8-W12 catch-up). 1 commit ahead of origin (`4df1a06a`). Pre-existing chronic; not actionable by G.

## §6 — Aggregate Q.md ledger at G open (after G-AUDIT-2 disposition)

| # | Item | Origin | G-disposition | (c) trigger |
|---|---|---|---|---|
| 1 | Color/utils.ts decomposition (G-OPP-1) | G-AUDIT-5 §2 | **FOLD-INTO-G.W1 Lane B** | G.W1 close |
| 2 | Typed `getColorSpaceBound<C,K>` (G-OPP-2) | G-AUDIT-5 §9 | **FOLD-INTO-G.W2 Lane A** | G.W2 close |
| 3 | Typed `DIRECT_PATHS` (G-OPP-3) | G-AUDIT-5 §9 | **FOLD-INTO-G.W2 Lane B** | G.W2 close |
| 4 | Typed `Color<T>` channel accessor (G-OPP-4) | G-AUDIT-5 §9 | **FOLD-INTO-G.W2 Lane C** (BREAKING risk; verify at dispatch) | G.W2 close |
| 5 | `ValueUnit.unwrapDeep()` static (G-OPP-5) | G-AUDIT-5 §9 | **FOLD-INTO-G.W2 Lane D** | G.W2 close |
| 6 | proof:resolution types-key probe (SCRIPTS-1) | G-AUDIT-2 NS-1 | **FOLD-INTO-G.W3 Lane A** | G.W3 close |
| 7 | proof:no-deprecated (SCRIPTS-2) | G-AUDIT-6 §5 | **FOLD-INTO-G.W3 Lane B** | G.W3 close |
| 8 | proof:no-ts-ignore (SCRIPTS-3) | G-AUDIT-6 §5 | **FOLD-INTO-G.W3 Lane C** | G.W3 close |
| 9 | proof:as-any-budget (SCRIPTS-4 — codifies G2) | new (G derivative) | **FOLD-INTO-G.W3 Lane D** | G.W3 close |
| 10 | API-1 withTransaction expansion | G-AUDIT-6 §1 | **FOLD-INTO-G.W3 Lane E** | G.W3 close |
| 11 | API-2 engines.node | G-AUDIT-6 §1 | **FOLD-INTO-G.W3 Lane F** | G.W3 close |
| 12 | E2E-1 mobile-walk spec | G-AUDIT-6 §2 | **FOLD-INTO-G.W3 Lane G** | G.W3 close |
| 13 | CI-1 workflow `origin/main` → `master` fix | G-AUDIT-6 §3 | **FOLD-INTO-G.W1 Lane A** | G.W1 close |
| 14 | CI-2 `npm pack --dry-run` | G-AUDIT-6 §3 | **FOLD-INTO-G.W3 Lane H** | G.W3 close |
| 15 | DOCS-1 api/CLAUDE.md services drift | G-AUDIT-6 §6 | **FOLD-INTO-G.W1 Lane C** | G.W1 close |
| 16 | 8 glass-ui primitive asks | A/D/E carry-forward | PEER-AUTHORSHIP — sharpened (c) per §2 | Re-check at glass-ui's next non-AK tranche-open |
| 17 | Contract-v2 §2.1 font-asset residual | E.W0 → F carry | PEER-AUTHORSHIP — glass-ui font-inlining | Re-check at glass-ui's `dist/glass-ui.css` next-publish |
| 18 | keyframes.js precept-pin drift | E carry → F carry | PEER-AUTHORSHIP | Re-check at keyframes.js maintainer's next submodule-rebase |
| 19 | keyframes.js peer commit `470814e` push status | F.W2 LOCAL-ONLY | **RATIFICATION REQUESTED** | User decision |
| 20 | CW Phase-2 activation | E/F/G carry | INFORMATIONAL (speedtest non-consumer per §4.1) | User signal OR speedtest CW Phase-2 ship |
| 21 | Playwright environmental flake class | F.W4 Lane 6 + G-AUDIT-6 §2 | **RETIRED 2026-05-21** (user-ratified) — documented-environmental-class | (n/a — closed) |

## §7 — Constellation health summary at G open

| Health-indicator | F close | G open | Verdict |
|---|---|---|---|
| Precept upstream HEAD | `68d9b20` | `68d9b20` (no advance) | NEUTRAL |
| Precept constellation-pin convergence (value.js + glass-ui) | YES | YES | NEUTRAL |
| Precept pin (keyframes.js) | Divergent `458c2d1` | Divergent `458c2d1` | OPEN (peer-auth) |
| Contract-v2 dev-resolution | GREEN | GREEN | NEUTRAL |
| Contract-v2 §2.1 font-asset residual | OPEN | OPEN | YELLOW (peer-auth) |
| Glass-ui shipping cadence | +13 commits in F window | 0 drift since F merge | QUIET |
| Glass-ui primitive expansion | OPEN + contraction intact | OPEN + contraction intact + Metaballs PARTIAL renegotiation candidate | YELLOW (peer-auth) |
| Keyframes.js lerp consumer migration | GREEN (F2 SATISFIED at peer `470814e`, LOCAL) | GREEN (LOCAL); 14 commits unpushed | YELLOW (push pending user ratification) |
| Speedtest tranche state | AI + AJ CLOSED | AI + AJ + AK opened/ratified | ACTIVE |
| Speedtest consumes value.js? | (assumed YES — stale) | **NO** (G-AUDIT-4 §4.3 correction) | NEUTRAL (de-coupled) |
| Speedtest CW Phase-2 activation | Planning-only | Planning-only | NEUTRAL |
| Fourier-analysis Phase-0 quiescence | UNRESOLVED (109 dirty files) | UNRESOLVED (109 dirty files; 0 drift) | YELLOW (chronic) |
| value.js `@deprecated` count | 0 | 0 | GREEN (F2 holds) |
| value.js `@ts-ignore` count | 0 | 0 | GREEN (F.W1 Lane A holds) |
| value.js `as any` count | 36 (untracked) | 36 (surfaced at G open) | YELLOW → G.W2 target ≤ 5 |
| value.js `vue-tsc --noEmit` errors | 0 | 0 | GREEN |
| value.js `dist/value.js` bundle | 124,936 bytes (gate ≤ 148,480) | 124,936 bytes | GREEN |

## §8 — Authority

Pinned: every `audit/G-AUDIT-1..6` deliverable + F's `coordination/Q.md` §7 (F close) + every F wave's audit deliverable + (for G.W2 Lane C BREAKING decision) the dispatch-time read of `src/units/color/index.ts:55` to confirm the `[key: string]: any` index signature is or is not part of the public API surface.
