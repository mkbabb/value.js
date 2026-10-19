SERVED MODEL: claude-fable-5-1

# KF.W12.c — KFED-UNIT: the born-RED transcript (G-KFW12-3)

Base: keyframes.js `2cd314af` (`.b`'s close; `.c` opens on `.a`'s shas KeyframeCard `697d045d` · KeyframesEditor `dec084a8` · useHighlightCSS `e5235ca0`). Every reading below was taken BEFORE the first product byte of this unit, and re-taken as each cure landed.

## 1. The gate file did not exist

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/keyframes-editor-honest.test.ts` (at `2cd314af`)

```
No test files found, exiting with code 1
```

## 2. The byte clauses at the base (double-run)

| clause | ⟨cmd⟩ | run 1 | run 2 |
|---|---|---|---|
| KF-KE-3 | `grep -c 'parseCssScalar' demo/components/instrument/keyframes/KeyframesEditor.vue` | **2** | **2** |
| KF-KE-5 | `grep -c 'class="absolute top-2 right-4' demo/components/instrument/keyframes/components/KeyframeCard.vue` | **1** | **1** |
| KF-KE-4 | `grep -c 'toLowerCase()' demo/components/instrument/keyframes/composables/useKeyframesState.ts` | **1** | **1** |

## 3. KF-KE-4 executed against the base bytes — the headline defect, RED by execution

The identity case (`test/demo/instrument/keyframes-editor-honest.test.ts` (1)) was written FIRST and run against the untouched `useKeyframesState.ts`. The four strings it reads back from the DOM — the class on the target, the injected sheet's `.selector`, its `animation-name`, its `@keyframes` name — printed by the case with `--disableConsoleIntercept`:

```
[KF-KE-4] class="keyframes-style-kfed-offsets-Transform" selector="kfed-offsets-transform" animation-name="kfed-offsets-transform" @keyframes="kfed-offsets-transform"

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

AssertionError: expected 'kfed-offsets-transform' to be 'keyframes-style-kfed-offsets-Transform' // Object.is equality

 Test Files  1 failed (1)
      Tests  1 failed (1)
```

The two halves of the identity differ in BOTH the prefix (`keyframes-style-` present on the class, stripped from the selector) and the case (`Transform` vs `transform`): `"keyframes-style-" + X ≠ X.toLowerCase()` unconditionally, as the spec states. Under `2cd314af` no element ever matched the injected rule — Apply-CSS applied nothing.

## 4. KF-KE-6 — the bite (the unconditional remove re-introduced)

With the refcounted registry in the tree (`7a10d7ff`), the old `useHighlightCSS.ts:58-61` behaviour — `onUnmounted(() => node.remove())` unconditionally — was re-inserted for one run so the gate's clause (5) would prove it bites:

```
AssertionError: expected +0 to be 1     // injectedSheets(styleId).length after the FIRST of two owners unmounted
```

The bite was taken back out; the tree never carried it in a commit.

## 5. KF-KE-7 — the engine's contract gap, measured under jsdom

`presets.warpLeft()` / `presets.jumpUp()` compile `translateX(0%) rotate(0deg)`, which jsdom cannot resolve. The throw happens INSIDE the draw loop:

```
Error: BrowserScalarResolutionError: Could not resolve "translateX(0%) rotate(0deg)"
  (unhandled — vitest reports it as an Unhandled Rejection and fails the run)
```

and `group.play()` never settles (`src/animation/group/lifecycle.ts:92-95`: the promise resolves only from the draw loop's completion). With the base bytes' open-ended `await group.play()` before `removeKeyframeData`, a delete under a throwing motion never lands — the hostage the KF-KE-7 gate + budget cures. The engine-side half (a draw-loop throw must settle `play()`/`finished`) is ESCALATED to KF.W5 in the receipt.

## 6. KF-KE-7 correction found BY the gate (post-landing)

The first budget was `duration + one frame`. In the full `npm run test:demo` run (52 files on one runner) clause (4a), then driven by a real rAF opacity motion, lost one run in three: a 700 ms motion landing at ~730 ms was reported as "did not settle" and the removal committed before the card had left. Corrected at `781ac250` (budget = `2 × duration`, "a bound for a hang, never for lateness") and the case made deterministic at the `AnimationGroup.of` seam at `4fa6efec`; three consecutive gate runs and two consecutive full-suite runs green thereafter (transcripts in `KF-W12-c-gate-transcripts.md`).
