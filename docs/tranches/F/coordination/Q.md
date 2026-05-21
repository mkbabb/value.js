# Coordination — value.js F ↔ glass-ui ↔ keyframes.js ↔ speedtest ↔ fourier-analysis

Cross-repo manifest at F open. Inherits E's `coordination/Q.md` carry-forward items per F-AUDIT-2; refreshed at peer HEADs per F-AUDIT-4.

## §1 — Peer HEADs at F open (2026-05-20) / refreshed at F.W0 (2026-05-21)

**This repo (value.js)**: `tranche-f` @ `188bd6b` (F open commit; off post-W8-W12 master `e1549e0` — see `F.md §0`).
**Peer repo (glass-ui)**: HEAD `e150e2f` (was `5b81866` at F open; +13 commits during F.W0 window — AJ-tranche publisher activity per F.W0 Lane D §3). Full W8-W12 constellation lockstep + AI-W3-R3 motion-subpath breaking ship to v2.0.0 + DockGroup/ProgressiveSidebar archive (contraction posture per F-AUDIT-4 §1 + F.W0 Lane D §3 — intact post-refresh).
**Peer repo (keyframes.js)**: HEAD `d312517` (ZERO drift). W8-γ + W9-phase2 + W10-γ Vite 8 + Rolldown + W12-δ TS 6 + W12-unblocker repairing 2 TS errors. Lerp call sites at `numeric.ts:159` + `group.ts:251` **STILL UNMIGRATED** (per F-AUDIT-4 §3 + F.W0 Lane D §2 re-verification: `lerp(eased, startVals[i], stopVals[i])` + `lerp(layer.weight, existing.value, incoming.value)` — both legacy `(t, a, b)`). Working tree CLEAN — F.W2 precondition holds. Precept submodule still on divergent `458c2d1`.
**Peer repo (speedtest)**: HEAD `5e52d136` (was `30f7f555` at F open; +20 commits during F.W0 window — AJ-tranche consumer adoption + close ceremony). Tranche AI **CLOSED**; tranche AJ also closed during F.W0 window. CW seed `61079cb1` invariant; still planning-only + user-gated.
**Peer repo (fourier-analysis)**: HEAD `926ca6a` (ZERO drift). 109-file dirty tree exact. Phase-0 CW blocker holds.
**Shared submodule**: `docs/precepts` at `68d9b20` (ZERO drift across all pins). Value.js + glass-ui co-pinned at upstream HEAD; keyframes.js still on divergent tree; fourier-analysis no submodule.

> **F.W0 Lane D note**: Glass-ui drift between F open and F.W0 is AJ-tranche publisher activity (additive composables — useBreakpoint, useViewportReady; prop/token extensions — Progress crescendo, DialogContent scrim, metaballs duration, MetaballCanvas positioning, MetricRow cascade; motion-token canon expansion; util/cn bugfix). **The contraction posture (DockGroup, ProgressiveSidebar archived) is INTACT.** Speedtest drift is AJ-tranche consumer adoption + close ceremony.

## §2 — Glass-ui (contraction posture acknowledged)

**Glass-ui drifted +14 commits but ZERO of the 7 standing primitive/blob asks shipped.** Per F-AUDIT-4 §1: 3 of the 14 commits are **Path B archive** (DockGroup, ProgressiveSidebar) — glass-ui is in CONTRACTION posture, structurally further from the asks rather than closer. F honors this signal and keeps the asks as PEER-AUTHORSHIP-REQUIRED with sharpened (c) triggers.

| Ask | F-open verdict | (a) blocker | (b) smallest unblock | (c) re-check trigger |
|---|---|---|---|---|
| Metaballs API additions (positionSource, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, MetaballCanvas mode="layout", pauseOnHidden) | OPEN (verified at F-AUDIT-4 §2.1 via direct read of `MetaballCanvas.vue` + `useMetaballs.ts/types.ts`) | glass-ui in contraction posture | glass-ui maintainer schedules a primitive-expansion tranche | F orchestrator re-reads `glass-ui/docs/tranches/*` at each F wave-close; if primitive-expansion tranche-open detected, sync (c) here. Final re-check: F.W4 close. |
| Aurora `deriveAuroraPalette` + `deriveAuroraConfig` | OPEN (no shipped API) | glass-ui authorship | same as above | same as above |
| `BlobDot` organic-dot primitive | OPEN (16 `WatercolorDot` instance sites still in demo) | glass-ui authorship | same as above | same as above |
| `SelectTrigger size` prop | OPEN (`SelectTrigger.vue` verified) | glass-ui authorship | same as above | same as above |
| `DockSelectTrigger clampLabel` | OPEN (`DockSelectTrigger.vue` verified) | glass-ui authorship | same as above | same as above |
| `TooltipContent variant="mono"` | OPEN (`TooltipContent.vue` verified) | glass-ui authorship | same as above | same as above |
| `Button size="icon-sm"` rung | OPEN (`Button.vue`/`index.ts` verified) | glass-ui authorship | same as above | same as above |
| `<Tabs variant="underline">` provider family | OPEN (`Tabs.vue` verified; demo's `.underline-tabs` override still live) | glass-ui authorship | same as above | same as above |

### Contract-v2 §2.1 font-asset residual

| Ask | F-open verdict | (a) blocker | (b) smallest unblock | (c) re-check trigger |
|---|---|---|---|---|
| Glass-ui font-inlining in `dist/glass-ui.css` (closes contract-v2 §2.1 residual; allows value.js to RETIRE `siblingFsAllowTransient`) | OPEN (verified at F-AUDIT-4 §2.9 — `dist/glass-ui.css` has 0 `@font-face`, 0 `url()`, 0 `data:font`) | glass-ui authorship | glass-ui ships base64-inlined font binaries in `dist/glass-ui.css` AND exports @font-face through the compiled surface OR ships a `dist/font-bundle.css` subpath | F.W4 close — re-verify `dist/glass-ui.css` content. If @font-face appears, the residual closes + value.js can RETIRE `siblingFsAllowTransient`. |

## §3 — Keyframes.js (lerp codemod target + precept-pin drift)

### §3.1 — Lerp codemod application status

**Status at F open**: NOT APPLIED. F-AUDIT-4 §3 verified: both `numeric.ts:159` + `group.ts:251` still use legacy `(t, a, b)` ordering. The keyframes.js maintainer shipped 5 W8-W12 lockstep commits but did NOT apply the codemod published at value.js E.W4 Lane F.

### §3.2 — F.W2 action plan (the F3 boundary exception)

F.W2 applies the published codemod against keyframes.js. Per F3:

1. value.js's `scripts/migrate-keyframes-js-lerp.mjs` is the published artefact (parity-asserting + idempotent + dry-run-safe).
2. F.W2 Lane A's dispatch agent runs the codemod against `/Users/mkbabb/Programming/keyframes.js` per the protocol in `dispatch/AGENT.md`.
3. Outcome captured in §3.3 below at F.W2 close.

### §3.3 — F.W2 outcome (filled in at F.W2 close 2026-05-21)

**Pre-state SHAs**:
- keyframes.js: `d312517` (clean working tree at F.W2 dispatch; verified).
- value.js codemod publisher: `f1d2005` (`scripts/migrate-keyframes-js-lerp.mjs`, published at E.W4 Lane F; ZERO drift since publication — verified via `git log --oneline -- scripts/migrate-keyframes-js-lerp.mjs`).

**Post-state SHA**:
- keyframes.js: `470814e` — `fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order` (Mike Babb \<mike7400@gmail.com\>); on `master`, LOCAL ONLY (not pushed).

**Migration outcome**:
- 2 call sites migrated (numeric.ts:159 + group.ts:251), exactly matching F-AUDIT-4 §3 + F.W0 Lane D §2 enumeration.
- Dry-run summary: `rewritten=2, already-migrated=0, unmatched=0`.
- Real-apply summary: `rewritten=2, already-migrated=0, unmatched=0` (identical to dry-run).
- Diff verified: both sites reordered `(t, a, b)` → `(a, b, t)` preserving indentation/`!` non-null assertions/trailing-comma style. 2 files changed, 2 insertions(+), 2 deletions(-).
- npm test verdict: **PASS** — 15 test files / 218 tests passed (`vitest 4.1.7`, 1.96s).

**Idempotency**: CONFIRMED. Re-run after apply emitted `[already-migrated] src/animation/numeric.ts` + `[already-migrated] src/animation/group.ts`; summary `rewritten=0, already-migrated=2, unmatched=0`; zero additional file modifications (`git status --short` post-re-run showed only the original 2 modified files).

**F2 (c) trigger** ("keyframes.js codemod applied + tests PASS → unblocks F.W3 lerpLegacy delete"): **SATISFIED**.

**Push status**: LOCAL ONLY — user-discretionary push per F.W2.md Lane B step 3 default. The F2 (c) trigger fires on `npm test` PASS (achieved), not on origin push. Maintainer (mike@babb.dev) holds push authority.

### §3.4 — Precept-pin drift

| Ask | F-open verdict | (a) blocker | (b) smallest unblock | (c) re-check trigger |
|---|---|---|---|---|
| Keyframes.js's `docs/precepts` pin `458c2d1` (divergent tree, NOT mkbabb/precepts upstream) | OPEN (verified at F-AUDIT-4 §3.3) | keyframes.js maintainer authority — value.js cannot rebase a peer's submodule | keyframes.js maintainer rebases their `docs/precepts` onto mkbabb/precepts upstream `68d9b20` (or later) | F.W2 close — after the codemod-application cross-repo write completes, re-check `git -C keyframes.js submodule status docs/precepts`. If converged, the residual closes. Else, the (c) trigger sharpens to next-tranche-open OR to a calendar checkpoint TBD. |

## §4 — Speedtest CW (monorepo workspace transposition)

Per F-AUDIT-4 §4: Speedtest's tranche AI is CLOSED. CW seed at `61079cb1` remains planning-only + user-gated. Value.js still de-coupled at `bab2a6de` (May 8) as runtime dep.

| Item | F-open verdict | F-action |
|---|---|---|
| CW Phase-2 activation | NOT TRIGGERED | F does NOT activate (speedtest authority; user-gated). Carry-forward with TIME-BOUND (c) trigger: "user explicit signal OR speedtest CW Phase-2 ship". |
| value.js CW-readiness verdict (E.W4 Lane D) | INTACT post-W8-W12 | F.W4 close re-verifies: zero hard `dist/` aliases, siblingFsAllowTransient still NARROWED, contract-v2 publisher half GREEN. |
| Speedtest tranche AJ (in-flight per F-AUDIT-4 §4) | INFORMATIONAL | F watches for any tranche AJ consumer-lockstep signal; if shipped during F window, evaluate at F.W4 close. |

## §5 — Aggregate Q.md ledger

| Item | Origin | F-disposition | (c) trigger |
|---|---|---|---|
| lerpLegacy retirement | E.W1 Lane A DEFERRED | **FOLD-INTO-F.W3 Lane A** | F.W2 close (keyframes.js codemod applied + tests PASS) → unblocks F.W3 delete. |
| 7 glass-ui primitive asks | E + carry-forward | PEER-AUTHORSHIP — sharpened triggers above | Re-check at each F wave-close; final F.W4 close. |
| Contract-v2 §2.1 font-asset residual | E.W0 Lane A NARROWED | PEER-AUTHORSHIP — glass-ui font-inlining | F.W4 close. |
| keyframes.js precept-pin drift | E carry-forward | PEER-AUTHORSHIP | F.W2 close (post-cross-repo-write). |
| CW Phase-2 readiness | E.W4 Lane D + F-AUDIT-4 §4 | CARRY-FORWARD with TIME-BOUND (c) | User signal OR speedtest CW Phase-2 ship. |
| Vite/Rolldown manualChunks declarative | F-AUDIT-2 NEW | FOLD-INTO-F.W1 Lane B | F.W1 close. |
| `Github` lucide alias-hygiene (gh-pages unblock) | F-AUDIT-3 chronic | FOLD-INTO-F.W0 Lane A | F.W0 close. |
| W8-W12 back-reference doc | F-AUDIT-3 §6 + F-AUDIT-1 §5 | FOLD-INTO-F.W0 Lane B | F.W0 close. |
| `@ts-ignore` strengthening at `parsing/utils.ts:146` | F-AUDIT-5 §5.3 | FOLD-INTO-F.W1 Lane A | F.W1 close. |
| Zero-consumer shadcn-vue subdir sweep | F-AUDIT-5 §1 + VENDOR-POLICY follow-on | FOLD-INTO-F.W1 Lane C | F.W1 close. |
| CHANGELOG-changed gate broadening | F-AUDIT-6 §7 | FOLD-INTO-F.W3 Lane B | F.W3 close. |
| vue-tsc baseline lowering 126 → 120 | F-AUDIT-3 + F-AUDIT-6 | FOLD-INTO-F.W3 Lane C | F.W3 close. |
| dts-shape invariant guard | F-AUDIT-3 §6 + F-AUDIT-6 §6 | FOLD-INTO-F.W3 Lane D | F.W3 close. |
| Bundle-size gate | F-AUDIT-6 §6 | FOLD-INTO-F.W3 Lane E | F.W3 close. |
| proof:resolution types-key probe | F-AUDIT-2 carry-forward | FOLD-INTO-F.W3 Lane F (optional) | F.W3 close. |

## §6 — Constellation health summary

| Health-indicator | At E close | At F open | At F close (2026-05-21) | Verdict |
|---|---|---|---|---|
| Precept upstream HEAD | `68d9b20` | `68d9b20` (no advance) | `68d9b20` (no advance in F window) | NEUTRAL |
| Precept constellation-pin convergence (value.js + glass-ui) | YES | YES | YES (both pin `68d9b20`) | NEUTRAL |
| Precept pin (keyframes.js) | Divergent `458c2d1` | Divergent `458c2d1` (unchanged) | Divergent `458c2d1` (unchanged) | OPEN (peer-auth — sharpened (c) trigger per §3.4) |
| Contract-v2 dev-resolution | GREEN | GREEN | GREEN (`npm run proof:resolution` PASS) | NEUTRAL |
| Contract-v2 §2.1 font-asset residual | OPEN | OPEN | OPEN (glass-ui `dist/glass-ui.css` still ships 0 @font-face) — sharpened (c) trigger per §2 | YELLOW (peer-auth) |
| Glass-ui shipping cadence | 14 post-Q-close commits | +14 commits since E close (constellation-coupled) | +27 commits since E close (+13 in F window — all AJ-tranche publisher activity per F.W0 Lane D §3) | ACTIVE |
| Glass-ui primitive expansion | OPEN | OPEN + contraction posture | OPEN + contraction posture INTACT (DockGroup/ProgressiveSidebar still archived; AJ-window activity is additive composables + prop/token extensions) | YELLOW (peer-auth) |
| Keyframes.js lerp consumer migration | NOT APPLIED | NOT APPLIED (despite +5 commits) | **APPLIED** at peer commit `470814e` (LOCAL ONLY — user-discretionary push) via F.W2 codemod apply; npm test PASS 218/15 | **GREEN** (F2 SATISFIED) |
| Speedtest CW activation | Planning-only | Planning-only + AI tranche CLOSED | Planning-only + AI tranche CLOSED + AJ tranche CLOSED — CW Phase-2 still user-gated | NEUTRAL |
| Fourier-analysis Phase-0 quiescence | UNRESOLVED (109 dirty files) | UNRESOLVED (109 dirty files; ZERO drift) | UNRESOLVED (109 dirty files; ZERO drift in F window) | YELLOW |
| `@deprecated` in value.js `src/` | 1 (lerpLegacy) | 1 (lerpLegacy) | **0** — F2 invariant satisfied (lerpLegacy retired at F.W3 Lane A / `1ead49e`) | **GREEN** |
| `@ts-ignore` in value.js `src/` | 1 | 1 | **0** — F.W1 Lane A typed `Memoized<T>` wrapper retires the sole site | **GREEN** |
| value.js `vue-tsc --noEmit` errors | 126 | 120 (post-W12) → 118 (post-F.W0 Lane A) | **0** — F.W1 Lane C vendor sweep deleted all 118 attributable subdirs; F.W3 Lane C CI gate ≤ 0 | **GREEN** |
| `dist/value.js` bundle size | 141 KB | 125 KB (post-W12 Rolldown) | 124.94 KB (124,936 bytes) — F.W3 Lane E gate ≤ 145 KB | **GREEN** |

## §7 — F close summary (added at F.W4 close ceremony)

**Tranche F closed 2026-05-21**. Branch `tranche-f` (9 wave commits + 3 close-ceremony commits + merge); tagged `v0.8.0`.

### F-thesis verdicts

- **F1 (No deferrals)**: HONORED. 18 inherited entity-level items disposed (FOLD-INTO-F: 4 → all landed; RETIRE-MOOT: 5; PEER-AUTHORSHIP-REQUIRED: 3 → sharpened TIME-BOUND (c) triggers; CARRY-FORWARD-WITH-SHARPER-TRIGGER: 3). Zero silent.
- **F2 (lerpLegacy retires)**: SATISFIED. `grep '@deprecated' src/` = 0; keyframes.js call sites migrated + npm test PASS.
- **F3 (cross-repo write boundary)**: HONORED. Exactly 1 cross-repo write (keyframes.js codemod apply); zero other peer-repo writes by F.
- **F4 (W8-W12 back-reference)**: AUTHORED. `docs/tranches/F/W8-W12-consumer-lockstep.md` (139 LoC) + future-going protocol codification in dispatch/AGENT.md.

### Standing peer-authorship asks — carry-forward state

| Ask | (c) trigger at F close |
|---|---|
| 7 glass-ui primitive asks | Re-check at next-tranche-open OR at glass-ui's next non-AJ tranche-open (whichever first); status: contraction posture intact, asks remain OPEN. |
| Contract-v2 §2.1 font-asset residual | Re-check at glass-ui's `dist/glass-ui.css` next-publish (currently 0 @font-face; until non-zero, residual carries). |
| keyframes.js precept-pin drift | Re-check at keyframes.js maintainer's next submodule-rebase signal (currently divergent `458c2d1`). |
| CW Phase-2 activation | Re-check on user explicit signal OR speedtest CW Phase-2 ship. |

## §7 — Authority

Pinned: every F-AUDIT-1..6 deliverable + E's `coordination/Q.md` + every E wave's audit deliverable + (for F.W2 outcome §3.3) the keyframes.js commit SHA from the cross-repo write.
