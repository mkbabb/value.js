SERVED MODEL: claude-opus-5-5

# KF.W3 .c2b — G-KF3-4 arm (B) receipts (2026-11-02, kf `8ca052ad`, parent `d4148cdc`)

## G-KF3-3 arm (c) roster, re-derived by command

⟨`git grep -l -E '@mkbabb/value\.js/css|parseCss(Color|Scalar|Values)|parseTimingFunction|serializeCssValue|reverseAnimationShorthand|cssIdent' HEAD -- test/`⟩ at kf `d4148cdc` (pre-cure) → 18 paths:
```
test/_root/public-surface.test.ts
test/compile/compile-roundtrip.test.ts
test/compile/interp-slot.test.ts
test/compile/roundtrip-fidelity.test.ts
test/compile/structural-emit.test.ts
test/compile/valuejs-contract.test.ts
test/demo/instrument/apply-css-identity.test.ts
test/demo/scenes/square-w13x.test.ts
test/engine/color-fidelity.test.ts
test/engine/computed-resolution.test.ts
test/engine/interpolate-anything.test.ts
test/group/structural-composition.test.ts
test/ingest/keyframes-name-escapes.test.ts
test/physics/raf-degrade.test.ts
test/resolve/emerging-css-resolve-fn.test.ts
test/resolve/emerging-css-resolve-now.test.ts
test/resolve/emerging-css-resolve-p2.test.ts
test/resolve/value4-immutable-resolve.test.ts
```

Delta at the cure: the five census-1 test modules now import `serializeAdmittedValue` from `compile/emit/serialize-value` (they no longer match `serializeCssValue`; kept in the roster by identity, not dropped); + `test/compile/serialize-invariant.test.ts` (new). `manifest.json` is arm (a)'s fixture, not a module. Run roster (arms a+b+c, `.test.ts` only) = 19 files:
```
test/_root/public-surface.test.ts
test/compile/compile-roundtrip.test.ts
test/compile/interp-slot.test.ts
test/compile/roundtrip-fidelity.test.ts
test/compile/serialize-invariant.test.ts
test/compile/structural-emit.test.ts
test/compile/valuejs-contract.test.ts
test/demo/instrument/apply-css-identity.test.ts
test/demo/scenes/square-w13x.test.ts
test/engine/color-fidelity.test.ts
test/engine/computed-resolution.test.ts
test/engine/interpolate-anything.test.ts
test/group/structural-composition.test.ts
test/ingest/keyframes-name-escapes.test.ts
test/physics/raf-degrade.test.ts
test/resolve/emerging-css-resolve-fn.test.ts
test/resolve/emerging-css-resolve-now.test.ts
test/resolve/emerging-css-resolve-p2.test.ts
test/resolve/value4-immutable-resolve.test.ts
```

⟨`guarded --timeout 10 -- npx vitest run <the 19> --maxWorkers=2`⟩ ×2 → `Test Files 19 passed (19)` · `Tests 235 passed (235)` (run 1 ≡ run 2).

## Census 1b at 4.1.0 (installed packed artifact)

```
color 31 [] · value 1 [] · css 20 [ 'serializeCssValue' ] · easing 17 [] · math 9 [] · transform 3 [] · quantize 2 []
```
