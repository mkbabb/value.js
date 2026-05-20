# Coordination — value.js E ↔ glass-ui ↔ keyframes.js ↔ speedtest ↔ fourier-analysis

**Artefact class**: `coordination/Q.md` — value.js E's cross-repo manifest. Successor to `tranches/D/coordination/Q.md`.
**Date**: 2026-05-20 (E opened).
**This repo**: value.js, tranche E, branch `tranche-e` (E opens off master post-D-merge `eae8afc`; tagged `v0.6.0` at `7ac4ecc`).
**Peer repo (glass-ui)**: tranche Q **CLOSED** at `4b16de7` (v1.9.2); post-Q ships `ce5aad8` (v1.9.3, contract-v2). **HEAD at E open: `66e9b8f`** (5 commits post-Q-close: `ce5aad8` contract-v2, `ecd0679` aurora lazy-arm, `e2e5303` Safari aurora fallback, **`9275584` `./styles.css → dist/glass-ui.css`** — KEY E-relevant ship, `0124a8b` motion-token canon, `66e9b8f` chart-token swap).
**Peer repo (keyframes.js)**: v2.1.1 / HEAD `0909177` — code-side contract-v2 OK at D open; no new commits since. Precept submodule pin `458c2d1` (off-target on a divergent precepts tree per `E-AUDIT-4 §5`).
**Peer repo (speedtest)**: HEAD `7d9211fd` (tranche AI §11 constellation-wide scope expansion — W8-W13 fold all peers + GA majors; **tranche CW seed at `61079cb1`** — monorepo workspace transposition; planning-only). Drift since E-open SHA `9d22bcdf`: 2 commits, both `docs(AI):` planning amendments (`9f3ffca6` §10 dep-lift coordination + `7d9211fd` §11 constellation-wide scope expansion). NO source touched; value.js de-coupling at `bab2a6de` (May 8) holds; CW seed at `61079cb1` invariant. Reconciled at E.W0 Lane C — see `audit/E.W0-lane-c-coord-refresh.md`.
**Peer repo (fourier-analysis)**: HEAD `926ca6a` — dev-resolution contract adopted; consumes `@mkbabb/value.js` easings (5 files, no v0.6.0 breakage).
**Shared submodule**: `docs/precepts` at `68d9b20` (contract-v2 codification SHA). Value.js + glass-ui pinned; speedtest 1 commit behind (benign); keyframes.js on divergent tree; fourier-analysis no submodule.

## §1 — Inheritance from D ↔ peer-state

D's `coordination/Q.md` recorded the post-D-close cross-repo state. E inherits + refreshes against the post-D peer activity:

- **Glass-ui** shipped 5 commits in its post-Q-close window. None are the 7 D-filed primitive/blob asks. ONE (`9275584`) closes the D-FINAL-named contract-v2 §2.1 keystone gap. TWO (`0124a8b` motion canon, `9275584` styles.css) open new value.js-side adoption opportunities.
- **Keyframes.js** is unchanged; the v0.6.0 consumption-update ask remains filed.
- **Speedtest** opened tranche CW (monorepo workspace transposition). Value.js participates as CONSUMER.
- **Fourier-analysis** is in a transitional state (109-file dirty working tree per `E-AUDIT-4 §6`); the W-HANDOFF bundle is UNAPPLIED. Value.js cannot help.
- **Precepts** upstream has no commits after `68d9b20`. No advance needed at E open.

## §2 — Glass-ui ship-state at E open (HEAD `66e9b8f`)

The 5 post-Q-close commits re-verified per `E-AUDIT-4 §2`:

| Commit | Date | Ship | E-relevance |
|---|---|---|---|
| `ce5aad8` | 2026-05-19 | Contract-v2 publisher abrogation (v1.9.3) | LANDED at value.js D.W1 |
| `ecd0679` | 2026-05-19 | `useAurora` lazy-arm — defer shader compile-link past first paint | DEMO PERF — no value.js consumer change required |
| `e2e5303` | 2026-05-19 | Aurora Safari post-paint double-rAF | DEMO ROBUSTNESS — verify the demo's aurora path |
| **`9275584`** | 2026-05-19 | **`./styles.css → dist/glass-ui.css` subpath** (SFC-scoped compiled surface) | **PRIMARY E.W0 WIN — adopt the compiled subpath; may retire/narrow `siblingFsAllowTransient`** |
| `0124a8b` | 2026-05-19 | `--motion-duration-*` / `--motion-delay-*` token canon | E.W4 — adopt token canon |
| `66e9b8f` | 2026-05-20 | Chart-jitter / chart-upload color-token swap (AH.W2-C — speedtest XR work in glass-ui's tree) | NOT E-relevant (no chart consumers in value.js demo) |

## §3 — Glass-ui gap list (E's filing)

Inherits D's `§3` rows. Post-D-close updates:

| Gap | Evidence | Status | Wave (consumes) |
|---|---|---|---|
| **`./styles.css` → `dist/glass-ui.css` subpath** | `glass-ui:package.json` post-`9275584` declares `"./styles.css": "./dist/glass-ui.css"` | **ADOPTED at E.W0 Lane A** — `demo/@/styles/style.css` now imports BOTH `./styles` (Tailwind-source) AND `./styles.css` (SFC-scoped compiled). The SFC-scoped half of contract-v2 §2.1 is CLOSED; the Tailwind-source half remains structurally `src/`-shaped (Tailwind v4 `@theme` + `@source` cannot pre-compile). **Evidence**: `audit/E.W0-lane-a-styles-adoption.md`. | DONE (E.W0 Lane A) |
| **metaballs API additions (7)** — `positionSource`, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, `MetaballCanvas mode="layout"`, `pauseOnHidden` | unchanged from D | STANDS | a value.js demo-abstraction tranche post-glass-ui-ship |
| **Aurora `deriveAuroraPalette(baseColor, opts)` + `deriveAuroraConfig(baseColor, opts)`** | unchanged from D | STANDS | glass-ui successor; value.js demo-abstraction tranche post-ship |
| `BlobDot` organic-dot primitive | unchanged from D (16 `WatercolorDot` instance sites across 9 files) | STANDS | glass-ui successor; value.js extirpation tranche post-ship |
| `SelectTrigger size` prop | unchanged | STANDS | demo markers stay |
| `DockSelectTrigger clampLabel` | unchanged | STANDS | as above |
| `TooltipContent variant="mono"` | unchanged | STANDS | as above |
| `Button size="icon-sm"` rung | unchanged | STANDS | as above |
| **`<Tabs variant="underline">` on the provider family** | demo's `.underline-tabs` override still live | OPEN | demo override stays until glass-ui ships |
| **Contract-v2 §2.1 keystone gap on `./styles`** (filed at D.W1 Step 1) | glass-ui's `./styles` subpath still resolves to `./src/styles/index.css` (Tailwind-source — structurally `src/`) | **NARROWED at E.W0 Lane A** (post-glass-ui `9275584`). SFC-scoped half **CLOSED** via `./styles.css → dist/glass-ui.css` (verified zero `@font-face` / zero `url()` in compiled CSS — 110 `data-v-*` SFC selectors only). Tailwind-source half **REMAINS** because (a) Tailwind v4 `@theme` aliases + `@source` directive lose semantics under pre-compilation; (b) `@font-face` in `typography.css` resolves `url("../fonts/...woff2")` references that walk OUT of `node_modules/@mkbabb/glass-ui/src/styles/` into the symlink target's `fonts/` directory. `siblingFsAllowTransient` in `vite.config.ts` is **NARROWED** — now justifies font-asset resolution only. Retirement requires either (a) glass-ui inlining font binaries as base64 in `dist/glass-ui.css` and exporting `@font-face` through the compiled surface, OR (b) the demo dropping `./styles` entirely (forfeits tokens + `@source` class-scanning). Neither is tranche-E scope; filed as glass-ui-side successor concern. **Evidence**: `audit/E.W0-lane-a-styles-adoption.md`. | route forward (glass-ui-side) |
| **`--motion-duration-*` / `--motion-delay-*` token canon** (new in `0124a8b`) | Glass-ui's specialised celebratory canon (badge reveals, complete-shimmer, progress-lifecycle, ripple); demo doesn't author analogous motion | **REVIEWED — NOT ADOPTED at E.W4 Lane E** (Family B's semantics target staged-reveal SFCs the value.js demo doesn't author; Family A `--duration-*` canon already adopted at 74 sites). General-purpose `--duration-*` canon ADOPTED (3 hard-coded ms residuals tokenized; 6 bespoke literals preserved per `feedback_preserve_animations.md`). **Evidence**: `audit/E.W4-lane-e-motion-vite.md`. | DONE (E.W4 Lane E) |
| `Card` props fail-explicit | A.W1 consumed Q.W2 | RETIRED | — |
| `floating-panel-item` | B.W1 stripped — phantom class | RETIRED | — |

## §4 — Speedtest CW (monorepo workspace transposition)

**The largest in-flight constellation change.** Per `E-AUDIT-4 §4`:

- **Form**: pnpm-workspace overlay across the constellation (7 repos, 7 cadences, one `constellation/` root).
- **Authorship**: speedtest's CW lead. Value.js is a CONSUMER, not author.
- **Predecessor**: G-AH-D1 (decision from speedtest tranche AH).
- **Gating posture (per the CW seed `61079cb1`)**: Phase-0 quiescence (fourier-analysis is the lone Phase-0 blocker — 109 dirty files); user-explicit signal; AH-CLOSE (✓).
- **Value.js role**: when CW Phase-2 reaches value.js, it's a 1-line `package.json` flip (`file:../glass-ui` → `workspace:^`). No structural change.
- **E preparation (E.W4 sub-lane)**: verify value.js's CW-readiness:
  - Zero hard `dist/` aliases for `@mkbabb/*` siblings (already verified at D.W1).
  - `peerDependencies` declarations are correct (only `parse-that` currently; check if any `@mkbabb/*` should be peer-dep).
  - `siblingFsAllowTransient` removed (E.W0).
  - The contract-v2 publisher half stays green (post-E.W1 changes don't violate).

### CW-readiness verdict (E.W4 Lane D — read-only)

**Verdict**: **READY.**

| Check | Result |
|---|---|
| D.1 — Zero hard `dist/` aliases for `@mkbabb/*` in `vite.config.ts` | PASS (re-verified at HEAD post-E.W3; all `dist/` mentions are comments, rollup `external`, or `build.outDir`) |
| D.2 — `parse-that` peer-dep migration | **STAY-AS-RUNTIME**. Two consumers (value.js `^0.8.2`, keyframes.js `^0.8.1`); pnpm workspace hoist deduplicates by range overlap regardless of peer-dep declaration. Promoting to peer-dep is a BREAKING CHANGE for `@mkbabb/value.js@^0.4.6`'s registry consumer (fourier-analysis) and is out of E.W4 scope. Filed forward as a v0.7.0+ "library API consolidation" candidate. |
| D.3 — `siblingFsAllowTransient` posture | **NARROWED** at E.W0 Lane A (font-asset resolution only). Structurally retires under CW Phase-2 — workspace overlay hoists glass-ui's `src/styles/` inside `constellation/node_modules/`, so the `url("../fonts/...")` walk resolves inside the hoisted tree rather than escaping a `file:` symlink. No E.W4 action; the carve-out falls away with the CW flip. |
| D.4 — Contract-v2 publisher half (`proof:resolution`) | **GREEN**. 3-key shape (`types/import/default`); zero `development` condition keys; `build:watch` script present. `dist/index.d.ts` is the canonical types target (vite-plugin-dts emits from `src/index.ts`); shape-compliant per the contract check. |
| D.5 — `default` export key under workspace-resolution | **POINTS AT `./dist/value.js`** — verified. Under CW Phase-2 (`workspace:^` in demo + keyframes.js + fourier-analysis), the consumer resolves through `exports["."]` to `dist/value.js`; dev-orchestration relies on `build:watch` keeping `dist/` fresh. No `default → src/` resolution path exists; the contract-v1 `development` condition was abrogated at D.W1. |

**When CW Phase-2 reaches value.js**, the only change required is a 1-line `package.json` edit: `"@mkbabb/glass-ui": "file:../glass-ui"` → `"@mkbabb/glass-ui": "workspace:^"` in `devDependencies` (demo-side dep). The library publisher half (`exports`, `types`, `default`, `build:watch`) stays green; the consumer-half `vite.config.ts` requires no edits; `siblingFsAllowTransient` retires structurally with the symlink retirement.

**Sequencing reminder** (per A4 §5.1 option 2): value.js is FLIPPED LAST in CW Phase-2, after Phase-0 quiescence (fourier-analysis dirty-tree gate) clears and the per-member opt-in cadence reaches value.js.

**Filed at**: 2026-05-20 (E.W4 Lane D). **Evidence**: `audit/E.W4-lane-d-cw-readiness.md`.

## §5 — keyframes.js

**HEAD `0909177` — no commits since D open.**

| Item | Status |
|---|---|
| Contract-v2 code-side compliance | OK at `0909177` |
| `package.json @mkbabb/value.js` pin | unchanged at file:../value.js per the D-open record |
| `AnimationOptions → CSSAnimationOptions` import rename | NOT done (filed for keyframes.js's schedule) |
| `Color.components.get(...)` → `color.L` migration (v0.6.0 breaking) | NOT done (filed for keyframes.js's schedule) |
| Precept-pin convergence | Pin at `458c2d1` on a DIVERGENT precepts tree (NOT mkbabb/precepts upstream) per `E-AUDIT-4 §5`. Value.js cannot fix from this side. File as tracked anomaly. |

### §5.1 — v0.6.0 silent breakage (surfaced at E-FOLD round)

The E-FOLD audit (`audit/E-FOLD-2-3-4-synthesis.md §1`) surfaced that value.js's v0.6.0 release SILENTLY BROKE keyframes.js's `file:`-linked consumer:

**E.W4 Lane F surfaced a 2nd silently-broken call site** beyond the originally-named `numeric.ts:159`. Both are silently broken by v0.6.0's `(a, b, t)` arg flip:

**Site 1** — `/Users/mkbabb/Programming/keyframes.js/src/animation/numeric.ts:159-163`:
```ts
(this.result as Record<string, number>)[seg.keys[i]!] = lerp(
    eased,
    seg.startVals[i]!,
    seg.stopVals[i]!,
);
```

**Site 2** — `/Users/mkbabb/Programming/keyframes.js/src/animation/group.ts:251-255` (NEW per E.W4 Lane F audit):
```ts
existing.value = lerp(
    layer.weight,
    existing.value,
    incoming.value,
);
```

**Was** (pre-v0.6.0): `lerp(t, a, b)` — produced the interpolated value from the first arg (t) and the next two (endpoints).
**Now** (v0.6.0): `lerp(a, b, t)` — interprets the first arg as `start`, the second as `end`, the third as `t` — **produces garbage** at both sites.

**Call-site count**: 2 (verified by `grep -rn '\blerp(' /Users/mkbabb/Programming/keyframes.js/src/` at E.W4 Lane F dispatch).

### §5.2 — Migration diffs (the consumer-side change at both sites)

**Site 1** — `numeric.ts:159-163`:
```diff
- (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
-     eased,
-     seg.startVals[i]!,
-     seg.stopVals[i]!,
- );
+ (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
+     seg.startVals[i]!,
+     seg.stopVals[i]!,
+     eased,
+ );
```

**Site 2** — `group.ts:251-255` (NEW per E.W4 Lane F):
```diff
- existing.value = lerp(
-     layer.weight,
-     existing.value,
-     incoming.value,
- );
+ existing.value = lerp(
+     existing.value,
+     incoming.value,
+     layer.weight,
+ );
```

Plus value.js publishes `scripts/migrate-keyframes-js-lerp.mjs` at E.W4 Lane F — a tiny codemod (257 LoC, `--dry-run` + idempotency + parity-count assertion) the keyframes.js maintainer runs locally. The codemod covers BOTH sites and is idempotent (re-running on already-migrated code emits `[already-migrated]` and exits 0).

### §5.3 — `lerpLegacy` retirement trigger (E5 sharpened escalation)

Per E5: a deferral must record (a) the systemic blocker, (b) the smallest unblock action, (c) the re-check trigger.

- **(a) Blocker**: keyframes.js's `numeric.ts:159` AND `group.ts:251` consumers use the old `lerp(t, a, b)` signature; value.js's v0.6.0 silently breaks BOTH. Removing `lerpLegacy` BEFORE the consumer migrates would compound the breakage.
- **(b) Smallest unblock**: keyframes.js's maintainer applies the §5.2 diffs (or runs the §5.4 codemod — covers both sites). value.js's `lerpLegacy` stays as a transitional safety until then.
- **(c) Re-check trigger**: `cd /Users/mkbabb/Programming/keyframes.js && npm test` passes against master value.js (the keyframes.js test suite exercises the animation path; success indicates the migration is correctly applied). At that point value.js may delete `lerpLegacy` in its next breaking-change tranche.

**Critical reframing**: E2 ("NO LEGACY CODE") is honored — `lerpLegacy` is not dead code; it has ONE active consumer pattern. The deletion ships AT THE EARLIEST UNBLOCK MOMENT, not arbitrarily in the next tranche.

### §5.4 — Verification protocol

1. Boot `keyframes.js` against current master value.js: `cd /Users/mkbabb/Programming/keyframes.js && npm install && npm test`. Document any failure traces.
2. Apply the §5.2 diff manually OR run the value.js-published codemod (`scripts/migrate-keyframes-js-lerp.mjs`).
3. Re-run `npm test`. Expect PASS.
4. The keyframes.js maintainer commits + pushes the migration.
5. value.js's NEXT tranche deletes `lerpLegacy` (per (c) trigger above).

E does not block on keyframes.js completing this — Lane F's product is the migration scaffolding + the verification protocol, not the keyframes.js commit itself. The (c) trigger is the gate for the NEXT tranche's `lerpLegacy` removal.

E does not block on keyframes.js. Value.js's v0.6.0 is published; the keyframes.js silent-breakage is now FILED with the explicit migration path; keyframes.js consumes at its own schedule.

## §6 — fourier-analysis

**HEAD `926ca6a` — dev-resolution contract adopted; 109-file dirty working tree (Phase-0 blocker for CW seed).**

- Consumes `@mkbabb/value.js@^0.4.6` (registry-pinned, lone non-`file:`-linked consumer).
- Imports easings (5 files: `easeInOutSine`, `timingFunctions`). NO Color/AnimationOptions/ValueUnit consumption → ZERO v0.6.0 breaking-change impact.
- W-HANDOFF bundle (3 patches) UNAPPLIED.
- Has NO `docs/precepts` submodule.

E does not block on fourier-analysis. No action needed.

## §7 — Precepts state

`docs/precepts` upstream: no commits after `68d9b20`. Value.js + glass-ui pinned; speedtest 1 commit behind (benign). No advance at E open.

## §8 — Constellation health summary

| Dependency | Status | Evidence |
|---|---|---|
| Precepts SHA (value.js ↔ upstream) | GREEN | both at `68d9b20` |
| Contract-v2 publisher compliance | GREEN | `proof:resolution` PASS at master HEAD |
| Subpath surface (`./styles.css`) | PARTIALLY GREEN | `9275584` ships compiled surface; Tailwind-source remains `src/` |
| Value.js D-close gates | GREEN | 10/10 pre-merge gates at v0.6.0 |
| Precepts SHA (constellation) | YELLOW | keyframes.js + speedtest off-target; tracking |
| Keyframes.js + speedtest adoption | YELLOW | filed asks, no movement during D's window |
| CW seed | YELLOW | planning-only, high-future-impact, value.js is CONSUMER |
| 7 D-filed glass-ui primitive asks | RED | metaballs + BlobDot + deriveAuroraPalette + Tabs underline — none shipped |
| fourier-analysis (Phase-0 CW blocker) | RED | 109 dirty files |

## §9 — Conflict-resolution protocol

Inherited from D: E writes value.js only. E reads peer repos at their HEAD-at-open SHAs (above). Each E wave that depends on peer-repo surface re-reads at wave open; E.W0 records the open-state across all 4 peers.

## §10 — Cross-tranche sequencing

E writes value.js only. No E wave blocks on a cross-repo ship.

| Order | Action | Cross-repo gate |
|---|---|---|
| 1 | E opens at D close | none |
| 2 | E.W0 — `./styles.css` adoption + state-at-open + chronically-deferred fold-confirm | glass-ui at `9275584` |
| 3 | E.W1 — library transposition (v0.7.0 candidate — breaking) | none |
| 4 | E.W2-W4 — api/ pipeline parity + e2e expansion + vendor/CI | none on critical path |
| 5 | E.W5 — close + merge + v0.7.0 tag | `§3` reflects close state |

CW preparation (E.W4 sub-lane) is read-only against speedtest's CW seed.

## §11 — Smoke-safari WebKit follow-up (filed at D.W6, folded at E.W3)

D's `D.W6` filed `smoke-safari` as a named-destination follow-up: a `smoke-safari` Playwright project + 30s sustained spec to catch iOS-Safari engine-specific bugs that Pixel-7 Chromium emulation misses. **E.W3 folds this.** Closing the D-FINAL-named successor destination.

## §12 — Summary table

| Item | Where | Status at E open |
|---|---|---|
| 7 standing glass-ui §3 primitive/blob gaps | §3 | unchanged at E open; carried forward |
| Glass-ui `./styles.css` subpath ship | §2, §3 | NEW E.W0 win |
| Glass-ui motion-token canon (`--motion-duration-*`) | §2, §3 | NEW E.W4 adoption |
| keyframes.js consumption update (post-v0.6.0) | §5 | filed; keyframes.js's schedule |
| Speedtest CW seed | §4 | filed; E.W4 prep |
| Smoke-safari follow-up (D.W6) | §11 | folds at E.W3 |
| Precepts SHA convergence | §7 | no movement needed at E open |
