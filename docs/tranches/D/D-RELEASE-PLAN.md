# D — Release plan (merge-to-master + version bump)

**Mode**: planning-only. This doc records the merge ceremony and version-bump strategy for tranche D's eventual close.

The user directive: "we must plan to fully merge all items into master, and version bump."

## §1 — Current state

- Branch: `tranche-b` (continues from B.W4 close; D planning + hardening + library-perf commits stacked on top).
- Commits since `f9a47ca` (B open): 34 — A close (4) + B execution (B.W1 ×5 + B.W2 ×5 + B.W3 ×5 + B.W4 ×3) + D planning (3 — open + hardening + library-perf) + the reactivity round (this one).
- Version: value.js `0.5.1` (unchanged since B open). keyframes.js consumes value.js `file:../value.js` at no pinned version.
- glass-ui post-Q reference: bumped patch v1.9.2 → v1.9.3 for contract-v2.

## §2 — Version-bump strategy

### Why a MINOR bump (`0.5.1 → 0.6.0`), not a patch

D's library deltas are NOT all backwards-compatible:

1. **L8 `Color<T>` storage transposition** — the public shape of every color-space class changes (`color.components.get("L")` → `color.L`). Consumers that read `Color.components` directly will break. **Breaking change.**
2. **L4 `evaluateSimpleCalc` excision** — internal refactor; not a public-API change. Patch.
3. **L1 contract-v2 alignment** — removes the `development` export condition + adds `build:watch`. Consumers that were relying on `development` resolution lose it. Per glass-ui's precedent (`ce5aad8` was a patch bump v1.9.2 → v1.9.3), this is arguably patch. But combined with L8, the cumulative shape is minor-grade.
4. **L6 CSSWideKeyword fix + L7 case-insensitivity fix** — bug fixes that change parser output for previously-invalid inputs. Patch (additive correctness).
5. **L10 `TimingFunction` type export** — purely additive. Patch.
6. **C1 `AnimationOptions` rename → `CSSAnimationOptions`** — breaking for the (single — keyframes.js) external consumer. **Breaking change.**

Combined: at least two breaking changes (L8 + C1). semver mandates minor for pre-1.0 / major for post-1.0. value.js is `0.5.x` (pre-1.0); minor bump = `0.6.0`. Per [semver §4](https://semver.org/#spec-item-4): "Major version zero (0.y.z) is for initial development. Anything MAY change at any time" — but treating the bump as if value.js were already 1.0 is the disciplined choice. `0.6.0` it is.

### What lands in `0.6.0`

The "shipping changelog" the close ceremony writes. Sketched here so D.W6 has the template:

```
# v0.6.0 — 2026-05-?? (TBD at D close)

## BREAKING

- Color<T> components are now own properties (not a `Map`). Read `color.L`
  instead of `color.components.get("L")`. The Map storage was a V8 hidden-
  class miss in every lerp hot path and a per-frame allocation source
  (`.keys()` / `.values()` / `.entries()`). Channel access is now monomorphic
  inline-cache friendly. (D.W1 Lane L8)
- `AnimationOptions` (exported from `src/parsing/extract.ts`, the CSS-
  shorthand-string type) renamed to `CSSAnimationOptions` to break the
  silent shadow with keyframes.js's same-named engine-options type.
  (D.W1 Lane L6 / coordination/Q.md §9 C1)
- `package.json` `exports["."]` collapses to `{types, import, default}` —
  the `development` condition is removed per contract-v2 (glass-ui
  `ce5aad8`). Consumer dev tooling must resolve via the bundler default
  (Vite, esbuild, Rollup, etc.). (D.W1 Lane L1)

## FEATURES

- `solveCubicBezierX` exported from the barrel (K5 from B.W3 keyframes.js
  parity audit).
- `registerColorNames` / `clearCustomColorNames` exported from the barrel
  (G1 from B.W3 library-gap audit).
- `TimingFunction = (t: number) => number` type alias exported from
  `src/easing.ts` and the barrel (canonical name for the easing
  function shape).
- `parseCSSValue("inherit"|"unset"|"initial"|"revert")` now correctly
  carries the `CSSWideKeyword` `superType` (was opaque-string before).
- `RGB(...)` / `OKLCH(...)` / `CALC(...)` etc. — color and math function
  names are now ASCII case-insensitive per CSS Color L4 / CSS Values 4.
- `parseCSSColor` + `parseCSSValueUnit` now memoized (parity with the
  other parsers per the CLAUDE.md contract).
- `lerpColorValue` honours the `hueMethod` carried through from
  `normalizeColorUnits` — cylindrical-space animations (oklch / hsl /
  lch) now interpolate via the requested method (default `shorter` per
  CSS Color 4 §12.4), not the long way round.
- `interpolate.ts` argument-order canonicalised to `(a, b, t, opts?)`
  across `lerp` / `interpolateHue` / `slerp` family.
- `cssColorToRgb` per-frame in goo-blob renderer now memoized.
- New `build:watch` script for fleet dev orchestration.
- New `proof:resolution` script (ported from glass-ui contract-v2).
- New `lint` script + eslint config + CI step.

## INTERNAL

- src/parsing/animation-shorthand.ts / extract.ts / serialize.ts /
  stylesheet.ts and src/units/interpolate.ts are now tracked + tested
  (B.W3 committed but D.W1 Lane L7 lands their vitest specs).
- evaluateSimpleCalc routed through the existing calc AST evaluator
  (no more `new Function()` — D6 invariant).
- backend api/ refactor — service + repository + zod validation pipeline,
  fail-explicit migration, god modules split (palettes 845 → ≤250 per
  file; admin 750 → ≤250 per file). Cross-collection writes use
  `client.withTransaction`. (D.W2)
- PaletteDialog split into a colocated 12-file dir; palette-manager
  facade exposes 5 sub-objects (pm.audit / pm.flagged / pm.tags /
  pm.versions / pm.tagEdit). Vue 3.5 reactive-props destructure across
  32 SFCs. viewSchema.ts as the canonical ViewId source. (D.W3)
- ~43 arbitrary Tailwind `[var(--…)]` token-reaches surfaced as
  first-class utilities. (D.W4)
- e2e/smoke/ expanded from 3 specs to ~20 across smoke / smoke-admin /
  smoke-mobile projects. (D.W5)

## RECURSION-PREVENTION HARDENING (D7 invariant)

The Mar-2026 `colorUnit2` nesting bug (`80cdd59` fix of `35cd9d5`) is
now fortified by 4 cooperating safeguards under L8: a `ColorChannel<T>`
TypeScript brand, a dev-only `assertNotNested`, a `test/recursion-
guard.test.ts` vitest suite, and a depth-16 ceiling in `clone()`.

## DEPS

- (carry the contract-v2 ripple — `docs/precepts` advanced to `68d9b20`)
```

## §3 — Merge ceremony

Per project pattern (B's planning and execution both landed on `tranche-b`; this tranche continues that), the merge is `tranche-b → master` with `--no-ff`. Preserves the tranche history; the merge commit's first-parent path on master is the clean wave-by-wave story.

### Pre-merge checklist (run at D.W6 close, before opening the merge)

1. **Every D wave-log row reads `closed`** (D5 invariant).
2. **`FINAL.md` exists and cites every D commit** + the B/A close hashes.
3. **`npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npx playwright test`** all green across all 3 smoke projects.
4. **L8 microbenchmark recorded** — `bench/color-channel-access.mjs` output saved to `audit/D.W6-bench/` showing ≥ 5× speedup.
5. **Recursion-guard suite green** — `test/recursion-guard.test.ts` 3 tests passing.
6. **Reactivity-smoke spec green** — `e2e/smoke/reactivity-instant.spec.ts` measuring ≤ 50 ms median.
7. **Integrity sweep clean** — D's `audit/D.W6-integrity-sweep.md` records zero unauthorized agent git mutations across the D span, empty stash, `docs/precepts` changed exactly once.
8. **CHANGELOG.md** carries the v0.6.0 entry per §2 above.
9. **`package.json` version bumped to `0.6.0`** (the very last commit of D, on `tranche-b` before the merge).

### Merge sequence

```
# on tranche-b, at D close
git checkout master
git pull --ff-only origin master         # ensure master is current
git checkout tranche-b
git rebase master                        # no-conflict rebase if D didn't diverge
                                         # if conflicts, resolve per tranche-D-binds-master
git checkout master
git merge --no-ff tranche-b -m "$(tranche merge message — see below)"
git tag -a v0.6.0 -m "v0.6.0 — D close (contract-v2 + api/ refactor + frontend cohesion + library hardening)"
git push origin master --follow-tags
```

The merge commit message — drafted at D.W6:

```
Merge tranche-b into master — Tranche D close (v0.6.0)

Tranche D ships:
- Contract-v2 alignment (precepts 68d9b20, drop `development` condition,
  build:watch, proof-resolution-contract.mjs)
- api/ backend refactor (service + repository + zod, god modules split,
  fail-explicit migration, withTransaction for cross-collection writes)
- Frontend cohesion (PaletteDialog 12-file split, facade as sub-objects,
  Vue 3.5 reactive-props codemod 32 SFCs, viewSchema.ts canonical source)
- Styling (43 utility surfacings, demo/DESIGN.md catalog, 0% pixel-drift
  gate)
- Playwright coverage 3 → ~20 specs across smoke / smoke-admin /
  smoke-mobile
- Library hardening (Color<T> flatten to own-property storage,
  parseCSSColor memo, CSSWideKeyword + case-insensitivity fixes,
  TimingFunction type, recursion-guard suite)

Also closes Tranche A (B.W0) and Tranche B (B.W4 commit 625322e).
Includes the 8-lane research wave + 6-lane hardening audit + 6+6
library-perf research+challenge round + 2-lane reactivity round.

Sub-tranche commits live on tranche-b at f9a47ca..<D.W6-close-sha>.
```

### Post-merge

1. **Publish** — `npm publish` (or whatever the actual publish step is; verify against `.npmrc` + `package.json:publishConfig`). If the package is private (no `publishConfig.access: public`), the tag is the deliverable; the file:dep consumer (keyframes.js) picks it up via its own update.
2. **keyframes.js consumption update** — file in `coordination/Q.md §9`: keyframes.js needs to bump its `@mkbabb/value.js` pin to `^0.6.0` and rename `AnimationOptions` imports to `CSSAnimationOptions`. value.js cannot write keyframes.js; the ask routes to keyframes.js's maintainer.
3. **Delete the `tranche-b` branch** (locally + remote): the history is preserved by the merge commit + the v0.6.0 tag; the branch label is no longer needed.
4. **Open the next tranche's planning substrate** — at the new master HEAD. Per D's named-routed destinations (`audit/W6-deferred.md`, `coordination/Q.md §3`), the candidates are: a glass-ui-side primitive ship tranche (the 7 metaballs additions + BlobDot + deriveAuroraPalette + `<Tabs variant="underline">`); a value.js demo-abstraction tranche post-glass-ui-ship (consumes the new APIs, deletes `useMetaballRenderer.ts` + `WatercolorDot/`); the shadcn-vue generator-update effort (the ~126 generated typecheck cluster); the smoke-safari WebKit testing-hardening tranche. None of these are D's to author; they open as their own planning substrates.

## §4 — Risk register at merge time

| Risk | Mitigation | Owner |
|---|---|---|
| L8 Color flatten regresses a consumer | The breaking change is named in the CHANGELOG; consumers grep their tree for `.components.get(` / `.components.set(` and migrate. The dev-only `assertNotNested` (D7 hardening) flags any silent nesting that survives. | consumer (post-merge) |
| keyframes.js breaks against `0.6.0` | C1 (`AnimationOptions` rename) + L8 (Color shape) both need keyframes.js-side updates. The asks are filed in `coordination/Q.md §9`; the keyframes.js maintainer pins to `^0.5.x` until ready, then bumps. | keyframes.js maintainer |
| Production bundle includes dev-assertions | Sub-gate L8 verifies: `grep import.meta.env.DEV dist/value.js` returns zero. If non-zero, Vite tree-shaking is mis-configured — fix before the merge. | D.W6 close |
| Recursion-guard regression | The vitest suite from D.W1 Lane L8 (c) blocks any commit that re-introduces nesting. | CI |
| `proof:resolution` red against keyframes.js | The constellation-wide gate expects keyframes.js to advance its precept-pin to `68d9b20`. Until then `proof:resolution` will RED on the keyframes.js row. The v2 precept explicitly names this as acceptable transient (constellation convergence). value.js MERGES regardless; the red is a constellation-status indicator, not a value.js-side block. | value.js MERGES; keyframes.js follows on its own schedule |
| Merge conflicts on rebase | If master moves between D open and D close (unlikely — solo development), rebase resolves per "tranche-d binds master" — D's planning + execution is the authority. | orchestrator |

## §5 — Reactivity acceptance gate (the user's hard requirement)

The user's directive: "we MUST have proper, instant, reactivity within the keyframes.js demo app and value.js color picker app."

REACTIVITY-A + REACTIVITY-B verified the topology is correct today (rAF-coalesced, debounced-by-design, echo-suppressed; keyframes.js uses the gold-standard `markRaw + rAF-poll bridge` pattern). The audit primitives turn the topology argument into wall-clock evidence:

- **Reactivity-smoke spec** (D.W5 Lane A — added): the spectrum-drag → docs-pane-update timing assertion, ≤ 50 ms median across 5 paths.
- **L8 microbenchmark** (D.W1 Lane L8 acceptance gate — required): post-L8 channel-read ≥ 5× faster.
- **`useEffectCensus` dev probe** (optional, D.W5): leak detection across view switches.

**Merge gate**: both REQUIRED primitives green at D.W6 close. The OPTIONAL probe is bandwidth-dependent.

If either REQUIRED primitive fails — STOP. The L8 thesis (Map → own-property is faster) becomes empirically false, OR the reactivity is not instant. Either case is a re-evaluation, not a merge.
