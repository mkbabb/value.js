SERVED MODEL: claude-fable-5-1

# KF.W12.c — KF-KE-4, the apply identity: both strings, the chain, the bite

## The decision (receipt part 1, `ec334c53`, BEFORE the byte)

Arm (i) — **class = selector**: `getTmpAnimationName()` returns `keyframesStyleId` verbatim (`keyframes-style-${animationUUID}`), the very token `useKeyframeBrushApply.ts:60` (`getClassName: () => options.styleId`) adds as the class. The `.replace("keyframes-style-", "")` strip and the `.toLowerCase()` fold at `useKeyframesState.ts:41-43` deleted. Arm (ii) — "pass `getTmpAnimationName()` as the class" — rejected: it lands its bytes at `useKeyframeBrushApply.ts:33` (`.e`'s row) and `KeyframesStringControls.vue:75` (`.d`/`.e`'s file), outside this unit's carve. No sanitization added: routing the token through the engine's `cssIdent` is N-8, the APPLY-UNIT's row; the measured consequence (an `animation.name` with a space — `useSpringKeyframesEditor.ts:66` "Spring Keyframes" — makes `classList.add` throw `InvalidCharacterError` under BOTH arms until `cssIdent`) is named there.

## The chain, at the head bytes (`c82f92ea`)

| link | byte | value on the identity fixture |
|---|---|---|
| the class added to the target | `useKeyframeBrushApply.ts:60` → `useApplyCSS.apply()` `classList.add(getClassName())` | `keyframes-style-kfed-identity-Transform` |
| the emitted rule's selector | `getTmpAnimationName()` → the emitter's `.${name} { animation-name: ${name}; … }` (`compile/emit/format/options.ts`) | `.keyframes-style-kfed-identity-Transform` |
| `animation-name` in that rule | same `name` | `keyframes-style-kfed-identity-Transform` |
| the `@keyframes` block | `@keyframes ${name}` (`format.ts:365`) | `keyframes-style-kfed-identity-Transform` |

One token, four readings, by construction: the emitter is handed the id the brush adds.

## Proven by execution — both strings pasted

**Born-RED** (base `2cd314af`, fixture name `offsets-Transform`, superKey `kfed`):

```
[KF-KE-4] class="keyframes-style-kfed-offsets-Transform" selector="kfed-offsets-transform" animation-name="kfed-offsets-transform" @keyframes="kfed-offsets-transform"
AssertionError: expected 'kfed-offsets-transform' to be 'keyframes-style-kfed-offsets-Transform' // Object.is equality
      Tests  1 failed (1)
```

**GREEN** (after `1b29fb22`, run twice at that sha — `Tests 1 passed (1)` · `Tests 1 passed (1)`; and at the unit head `c82f92ea` with the fixture renamed `identity-Transform` for per-test id uniqueness):

```
[KF-KE-4] class="keyframes-style-kfed-identity-Transform" selector="keyframes-style-kfed-identity-Transform" animation-name="keyframes-style-kfed-identity-Transform" @keyframes="keyframes-style-kfed-identity-Transform"
      Tests  7 passed (7)
```

The fixture's id carries an uppercase letter on purpose: a case-folding survivor would still read RED here.

## L-M3 / C-B2's residue, re-derived against a WORKING feature

L-M3 ("Apply is a no-op") and C-B2 ("three closures over one animation, each owning its own applied state") were read at bytes where the feature never worked, so their residue could not be told from the identity defect. Re-derived after `1b29fb22`:

- **L-M3 is the identity defect entire** — once class = selector, the applied rule matches the target and the animation runs (`animation-name` resolves against the injected `@keyframes`). No residue.
- **C-B2's residue is REAL and separate**: with the feature working, each of the three closures (`KeyframesEditor` ×2 slot copies + the force-mounted `KeyframesStringControls`) held its own `isApplied`/`prevPaused`/node, so the second brush's `aria-pressed` lied, and `useHighlightCSS.ts:58-61`'s unconditional `remove()` on the FIRST unmount stripped the sheet from the two live survivors. That residue is KF-KE-6's, cured at `7a10d7ff` by lifting the three to registries keyed by the style id (refcounted, lazy, last-holder-out) — clause (5) executes it, and the bite (`expected +0 to be 1`) proves the clause bites.
- **KF-KE-12 ≡ N-5** (`clear()` never wired): with the lift, `clear()` is wired into `onBeforeUnmount` refcount-aware — an owner leaving while another is live leaves the identity to the survivor; the last owner out removes the class, drops the sheet and restores the pause state (clause (5)'s second half, `pausedBefore` compared).
