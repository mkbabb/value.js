# E-FOLD-2 + 3 + 4 — Comprehensive folding (synthesis)

**Lane**: combined E-FOLD-2 (glass-ui reclassification) + E-FOLD-3 (keyframes.js reclassification) + E-FOLD-4 (comprehensive folding synthesis).

**History**: 3 of the 4 dispatched fold-agents (E-FOLD-2, E-FOLD-3, E-FOLD-4) hit transient API rate-limits before authoring; the orchestrator executed the work directly to preserve momentum. E-FOLD-1 landed cleanly at `audit/E-FOLD-1-speedtest-assay.md` (461 lines).

**Mode**: read-only research + E plan amendment authoring. NO src/, demo/, api/, e2e/ writes.

**Sources**: E-FOLD-1 deliverable; `E-AUDIT-1..6`; the original `findings.md §3` route-forward list; live read of glass-ui (`66e9b8f`) + keyframes.js (`0909177`).

---

## §1 — Critical finding surfaced: keyframes.js IS BROKEN against v0.6.0

**The single most important finding of the E-FOLD round.**

Per the live audit at master HEAD:

- `value.js src/math.ts` ships `export function lerp(start, end, t)` — the v0.6.0-shipped `(a, b, t)` canonical order.
- `value.js src/math.ts` ALSO ships `export const lerpLegacy = (t, start, end) => lerp(start, end, t)` with `@deprecated` JSDoc + "Will be removed in the next tranche" comment.
- `keyframes.js src/animation/numeric.ts:159-163` calls:
  ```ts
  (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
      eased,           // ← was `t` in old (t, a, b) order
      seg.startVals[i]!,
      seg.stopVals[i]!,
  );
  ```
  Under the v0.6.0 `(a, b, t)` order, this is interpreted as `lerp(start=eased, end=startVals, t=stopVals)` — **producing garbage outputs**.

`keyframes.js`'s `package.json` carries `"@mkbabb/value.js": "file:../value.js"` — meaning the `file:`-linked consumer picks up master's v0.6.0 surface immediately. Keyframes.js's animation kernel is silently broken right now.

**This is an actual constellation regression, not a filed-ask.** D's v0.6.0 release plan acknowledged the keyframes.js consumption-update as a post-merge filing; it did NOT measure that the file:-linked consumer breaks silently.

**E5 invariant binding**: this must be FOLDED with a triggering condition, not routed.

### Disposition

- **Defer `lerpLegacy` retirement** from E.W1 Lane A (which the current spec deletes) until the keyframes.js side catches up. The `@deprecated` JSDoc updates to: "Removal triggered by the keyframes.js consumption-update (currently broken at file:../value.js — see `coordination/Q.md §5`)."
- **Add a new E lane** for the keyframes.js coordination: publish the migration steps + the codemod script + verify keyframes.js's catch-up before E.W5 close.
- **Update `keyframes.js/src/animation/numeric.ts` migration path** (file the exact diff in `coordination/Q.md §5`): change the single call site to `lerp(seg.startVals[i]!, seg.stopVals[i]!, eased)`.

This re-frames the "NO LEGACY CODE" + "Will be removed in the next tranche" promise: E2 doesn't say "every deprecated marker dies in the next tranche regardless of consumer state" — it says "no legacy code that has no consumer." `lerpLegacy` has one consumer pattern (the keyframes.js call site that hasn't been migrated). E retires `lerpLegacy` AFTER the consumer migration ships, not before.

---

## §2 — Glass-ui ask reclassification (E-FOLD-2 work)

Read of glass-ui at HEAD `66e9b8f`. Confirmed via `package.json`:
- 44 total exports (the `./styles.css` ship at `9275584` lives alongside 41 other subpath surfaces).
- Subpaths include: `./metaballs`, `./aurora`, `./tabs`, `./responsive-tabs`, `./tokens` — the glass-ui surface is much richer than `coordination/Q.md §3` records.
- Glass-ui has 19 tranche directories; the most recent CLOSED tranche is Q at `4b16de7`. The post-Q-close commits (`ce5aad8` through `66e9b8f`) ship contract-v2 + the aurora perf + the `./styles.css` subpath + the motion-token canon + a chart-token swap. **No glass-ui tranche specifically addresses the 7 D-filed primitive/blob asks.**

### Per-ask reclassification

| Ask | Glass-ui subpath state | E disposition |
|---|---|---|
| metaballs API additions (7) | `./metaballs` subpath ships; the 7 additions (positionSource, pointer input, per-blob opacity, HSV perturbation, context-loss recovery, MetaballCanvas mode="layout", pauseOnHidden) are not in the published API per `Dd-blob.md §3-4` | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship; precept-§10 wire-before-retire applies. **E5 escalation**: (a) blocker = glass-ui's roadmap doesn't carry these; (b) smallest unblock = file a glass-ui-side audit OR proceed with a `demo/@/glass-ui-augmentation/` bridge module that absorbs the eventual ship without breaking current state; (c) re-check at E.W4 Lane D when filing CW preparation. |
| `deriveAuroraPalette` + `deriveAuroraConfig` | `./aurora` subpath ships; algorithm in `research/Dc-aurora.md §3` | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5 escalation: (a) blocker = glass-ui hasn't accepted the algorithm sketch; (b) smallest unblock = open a glass-ui issue/PR with the sketch; (c) re-check at E.W5 close. |
| `BlobDot` organic-dot primitive | not yet in glass-ui exports; 16 `WatercolorDot` consumers in value.js demo | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5: same as metaballs. |
| `SelectTrigger size` prop | `./controls` subpath ships (likely the home) | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship + carry the demo `.size-sm`/`.size-icon-sm` override. E5: low priority. |
| `DockSelectTrigger clampLabel` | `./dock` subpath ships | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5: low priority. |
| `TooltipContent variant="mono"` | (no explicit `./tooltip` subpath visible — bundled in `./controls`?) | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5: low priority. |
| `Button size="icon-sm"` rung | `./controls` subpath ships | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5: low priority. |
| `<Tabs variant="underline">` on the provider family | `./tabs` + `./responsive-tabs` subpaths ship; the underline variant on `<Tabs>` provider isn't there | **ROUTE-FORWARD-VERIFIED**: glass-ui authorship. E5: low priority. |
| Contract-v2 §2.1 keystone gap on `./styles` | **PARTIALLY MITIGATED** by glass-ui `9275584` — `./styles.css` (compiled SFC-scoped) ships alongside the Tailwind-source `./styles`. Full mitigation requires either glass-ui ships Tailwind-source in a dist-distributable form OR the consumer-side `siblingFsAllowTransient` widening as a documented Tailwind-source-distribution exception. | **FOLDED at E.W0 Lane A**: consume `./styles.css` + decide siblingFsAllowTransient's fate. |
| `--motion-duration-*` / `--motion-delay-*` token canon (NEW at glass-ui `0124a8b`) | shipped at glass-ui; value.js demo doesn't consume | **FOLDED at E.W4 Lane E**: adopt the canon in demo. |

### Demo-side preparation opportunities (E1 transposition candidates)

For the 7+ asks that ROUTE-FORWARD-VERIFIED, the precept-§10 wire-before-retire allows value.js to author a `demo/@/glass-ui-augmentation/` bridge module:
- Re-exports glass-ui's current surface unchanged.
- Carries the value.js-demo-specific augmentation logic (the would-be primitive's behavior, behind a temporary value.js-owned surface).
- When glass-ui eventually ships the primitive, the bridge module re-exports glass-ui's new surface instead — consumer migration is a 1-file change.

**E5 disposition**: this is an OPPORTUNITY but not a FOLD without explicit precept clearance. The 7 standing asks stay ROUTE-FORWARD-VERIFIED with the bridge-module opportunity recorded for a value.js demo-abstraction tranche post-glass-ui-ship.

### §3 — keyframes.js ask reclassification (E-FOLD-3 work)

Read of keyframes.js at HEAD `0909177`. Confirmed value.js consumption:
- 10 files import from `@mkbabb/value.js` — wide surface coverage.
- Per-file imports (per the orchestrator's pre-flight survey):
  - `numeric.ts`: `clamp`, `lerp`, `scale` (math — **lerp is the breaker**).
  - `smooth.ts` / `animations.ts`: `CSSCubicBezier`, `steppedEase`.
  - `format.ts`: `formatCSS` + `ValueUnit` type.
  - `adapter.ts`: `Stylesheet` + `PropertyDescriptor` types.
  - `constants.ts`: `timingFunctions` + types (`HueInterpolationMethod`, `InterpolatedVar`, `TimingFunction`, `TimingFunctionNames`).
  - `utils.ts` / `group.ts` / `index.ts`: misc helpers.
- keyframes.js's OWN `AnimationOptions` lives at `src/animation/constants.ts:73` — internal, NOT imported from value.js. **MOOT for the value.js `AnimationOptions → CSSAnimationOptions` rename.**
- keyframes.js DOES NOT import `Color` from value.js — the L8 Color flatten doesn't break keyframes.js directly.
- keyframes.js's `InterpolatedVar` consumption uses the type structurally; the new optional fields (`hueMethod?`, `colorSpace?`, `_lerp?`) are additive and don't break consumers.
- The `lerp` signature flip IS the lone hard breakage.

### Per-ask reclassification

| Ask | Status | E disposition |
|---|---|---|
| `AnimationOptions → CSSAnimationOptions` rename | **MOOT** — keyframes.js has its own internal `AnimationOptions`; doesn't import value.js's. | **RETIRE** the ask. |
| `Color.components.get(...) → color.L` migration | **MOOT** — keyframes.js doesn't import `Color` from value.js. | **RETIRE** the ask. |
| `lerp(t, a, b) → lerp(a, b, t)` migration (NEW, surfaced by E-FOLD round) | **ACTIVELY BROKEN at master**: `numeric.ts:159` produces garbage outputs | **FOLDED at NEW E.W4 Lane F (keyframes.js coordination)**. |
| Pin bump `@mkbabb/value.js` to ^0.6.0 / current | **MOOT** — keyframes.js is `file:../value.js`, not a registry pin. The "file:" link automatically tracks master. | **RETIRE** the ask. |
| precept-pin drift (keyframes.js `docs/precepts@458c2d1`) | keyframes.js's submodule on `heads/main` of a divergent precepts tree. Cannot fix from value.js. | **ROUTE-FORWARD-VERIFIED**: (a) blocker = cross-repo submodule choice; (b) smallest unblock = keyframes.js maintainer advances OR documents the divergent-tree intent; (c) re-check at E.W5 close. |

### §4 — Coordination plan (NEW E.W4 Lane F)

**Lane F — keyframes.js consumption-update coordination**:

1. Publish in `coordination/Q.md §5` the exact lerp-call-site diff for keyframes.js:
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
   At `keyframes.js/src/animation/numeric.ts:159-163`.

2. Verify ONLY one call site exists — `grep -rn "lerp(" keyframes.js/src/`. If there are more, enumerate.

3. Either: (a) publish a tiny codemod script `scripts/migrate-keyframes-js-lerp.mjs` that value.js owns + the keyframes.js maintainer runs, OR (b) just document the diff in coord/Q.md for manual application.

4. **Trigger for `lerpLegacy` removal** (per E5): "remove `lerpLegacy` from value.js master AFTER keyframes.js's file:-linked consumer migrates the single `numeric.ts:159` call site, verified by a successful `cd keyframes.js && npm test` against master value.js."

5. Update the JSDoc on `lerpLegacy` to reflect this:
   ```ts
   /**
    * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
    * Will be removed after keyframes.js's `file:`-linked consumer migrates
    * the single call site at `src/animation/numeric.ts:159` (filed in value.js
    * `coordination/Q.md §5` at E open).
    */
   ```

This E5 escalation is precept-compliant: the (a) blocker, (b) smallest unblock, and (c) re-check trigger are all named explicitly.

---

## §5 — Comprehensive folding ledger (E-FOLD-4 work)

The full route-forward set at E open had 14 items per `findings.md §3`. Per the 3 fold-agents' analyses, the disposition:

### FOLDED into E (new) — 2 items

| # | Item | Folded into | Source |
|---|---|---|---|
| F.1 | keyframes.js `lerp` migration coordination + `lerpLegacy` retirement deferred until consumer catches up | **NEW E.W4 Lane F** | E-FOLD-3 §4 |
| F.2 | Glass-ui `9275584` `./styles.css` adoption — fold the consumption update (was already E.W0 Lane A) | E.W0 Lane A (confirmed) | E-FOLD-2 |

### ALREADY FOLDED at E open (verify, no change needed) — 5 items

| # | Item | Folded into | Status |
|---|---|---|---|
| A.1 | A-11 ConfigSliderPane verify-retired | E.W0 Lane B | retain |
| A.2 | A-14..A-18 doc-drift residuals | E.W5 close-audit | retain |
| A.3 | D-04 nameParser 152-branch | E.W1 Lane D | retain |
| A.4 | Motion-token canon adoption | E.W4 Lane E | retain |
| A.5 | CW preparation | E.W4 Lane D | retain |

### RETIRED (the ask is moot) — 3 items

| # | Item | Reason | Source |
|---|---|---|---|
| R.1 | keyframes.js `AnimationOptions → CSSAnimationOptions` rename | keyframes.js has its own internal `AnimationOptions`; doesn't import value.js's | E-FOLD-3 §3 |
| R.2 | keyframes.js `Color.components.get → color.L` migration | keyframes.js doesn't import `Color` from value.js | E-FOLD-3 §3 |
| R.3 | keyframes.js pin bump to ^0.6.0 | keyframes.js is `file:../value.js`, not a registry pin | E-FOLD-3 §3 |

### ROUTE-FORWARD-VERIFIED with E5 sharpened escalation — 7 items

| # | Item | (a) Blocker | (b) Smallest unblock | (c) Re-check trigger |
|---|---|---|---|---|
| RF.1 | metaballs API additions (7) | glass-ui authorship; precept-§10 wire-before-retire | file glass-ui audit OR demo bridge module | E.W5 close |
| RF.2 | `deriveAuroraPalette` + `deriveAuroraConfig` | glass-ui authorship | open glass-ui issue/PR with the algorithm sketch | E.W5 close |
| RF.3 | `BlobDot` primitive | glass-ui authorship | file glass-ui audit | E.W5 close |
| RF.4 | `SelectTrigger size` + `DockSelectTrigger clampLabel` + `TooltipContent variant="mono"` + `Button size="icon-sm"` | glass-ui authorship | carry demo overrides; low priority | E.W5 close |
| RF.5 | `<Tabs variant="underline">` provider variant | glass-ui authorship | demo `.underline-tabs` override stays | E.W5 close |
| RF.6 | Contract-v2 §2.1 residual on `./styles` Tailwind-source | structural-distribution-model question | E.W0 Lane A's siblingFsAllowTransient decision OR an authorial transposition | post-E.W0 |
| RF.7 | keyframes.js precept-pin drift (divergent tree) | cross-repo submodule choice | keyframes.js maintainer advances OR documents intent | E.W5 close |

### SKIPPED (speedtest pre-emption) — 0 items

E-FOLD-1's verdict (per `audit/E-FOLD-1-speedtest-assay.md §7`): **0 high-duplication-risk items** with E's route-forward list. Speedtest's AI tranche + CW seed are orthogonal or consumer-side to value.js's scope.

E-FOLD-1 also surfaced 12 PURE-FOLDS speedtest is doing in its AI tooling sweep that value.js could fold opportunistically — verified non-duplicating per `E-FOLD-1 §8`. Of those, value.js's E.W4 already plans the Vite 7.3.x bump (F4 / Lane E) + the playwright/vitest/katex/prettier patch sweeps fold naturally into E.W4 Lane B (CI hardening) — orchestrator captures these as Lane B sub-items at amendment.

---

## §6 — E plan amendments

The following E plan documents are amended:

1. **`E.md §7 Cross-tranche debt`** — refresh with the post-fold-round state: 2 FOLDED + 3 RETIRED + 7 ROUTE-FORWARD-VERIFIED + 0 SKIPPED.
2. **`E.md §8 Finding disposition`** — point at this synthesis doc.
3. **`findings.md §3`** — annotate each route-forward item with the E5-compliant 3-part escalation OR retirement.
4. **`coordination/Q.md §5`** — file the keyframes.js `lerp` migration diff + the `lerpLegacy` retire-trigger.
5. **`waves/E.W1.md` Lane A** — DEFER `lerpLegacy` deletion until the keyframes.js consumer migrates. Update the JSDoc per E5.
6. **`waves/E.W4.md`** — add NEW Lane F (keyframes.js consumption-update coordination).
7. **`PROGRESS.md`** — add a "2026-05-20 — E-FOLD round" execution-log entry.

---

## §7 — Authority

- `audit/E-FOLD-1-speedtest-assay.md` (E-FOLD-1 agent, 461 lines).
- This file (E-FOLD-2/3/4 synthesis, executed by orchestrator due to rate-limit on 3 of 4 fold-agents).
- Live state at HEAD `d90af08` (E substrate commit).
- glass-ui `66e9b8f`; keyframes.js `0909177`; precepts `68d9b20`.
