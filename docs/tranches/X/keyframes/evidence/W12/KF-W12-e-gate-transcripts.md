SERVED MODEL: claude-opus-5[1m]

# KF.W12.e — G-KFW12-5 gate transcripts (APPLY-UNIT)

Unit `X.KF.W12.e`, third sitting (RESUME). All commands run from
`/Users/mkbabb/Programming/keyframes.js`. Every reading double-run.
Opened at kf `2a0afe7a` (the killed seat's four landed commits); closed at
`c9346000`.

## BEFORE — born-RED, unmoved since the wave opened

⟨cmd⟩ `ls test/demo/instrument/apply-css-identity.test.ts`
→ `ls: test/demo/instrument/apply-css-identity.test.ts: No such file or directory`
→ (run 2) same.

**The gate had never once run.** The four commits the killed seat landed
(`5bbb7b20` N-8 · `30efb823` RB-6 · `d0665322` D-5 · `2a0afe7a` D-23) were
proven by nothing but reading — the exact failure mode §L-18 (v) names.

## BEFORE — the working-tree error the resume seat measured

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts`
→ `Tests 1 failed | 3 passed (4)` ⊕ `Errors 1 error`
→ `TypeError: parseErrorShake.setTargets is not a function` at
`KeyframesStringControls.vue:217:25`.

## AFTER — G-KFW12-5, the runtime clause

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/apply-css-identity.test.ts`
→ run 1: `Test Files 1 passed (1)` · `Tests 4 passed (4)`
→ run 2: `Test Files 1 passed (1)` · `Tests 4 passed (4)`

The four clauses, with the strings the run itself printed:

```
[G-KFW12-5/N-8] class="keyframes-style-kfapply-Apply-Transform"
                selector="keyframes-style-kfapply-Apply-Transform"
                animation-name="keyframes-style-kfapply-Apply-Transform"
                @keyframes="keyframes-style-kfapply-Apply-Transform"
                cssIdent="keyframes-style-kfapply-Apply-Transform"

[G-KFW12-5/binds] selectorText=".keyframes-style-kfapply-Spring-Keyframes"
                  matchesTarget=true
                  @keyframes="keyframes-style-kfapply-Spring-Keyframes"
```

The second line is L-BL-2's own fixture (`"Spring Keyframes"`, the shipped
whitespace name at `useSpringKeyframesEditor.ts:65`): the space folds to `-`
through `cssIdent`, `classList.add` no longer throws, and the injected rule
**matches the target element** — read back through CSSOM, not compared as text.

## AFTER — the byte clause and the clock clause

⟨cmd⟩ `grep -rc 'cssIdent' demo | grep -v ':0$'`
→ `demo/utils/helpers.ts:1` · `…/composables/useKeyframesState.ts:5` ·
  `…/composables/useKeyframesParsing.ts:1` — identical both runs.

**Correction, measured (E-3: a dated reading beside the resume's figure, which
is not amended).** The resume section reads *"the demo now has two non-comment
consumer files"*. ⟨cmd⟩ `grep -rn 'cssIdent' demo` prints every hit, and the
`useKeyframesParsing.ts` hit is at `:39`, **inside a comment**; `helpers.ts:10`
is likewise a comment. The true census is **ONE file with non-comment
consumption — `useKeyframesState.ts:24` (the engine read) and `:56` (the call)**
— which satisfies the clause's `≥ 1` with room to spare and does not change the
arm. The ROUTED arm stands.

⟨cmd⟩ `grep -c 'cssIdent' dist/keyframes.d.ts` → **2 · 2** (clock clause, open
and close).

## AFTER — the anti-work clause

⟨cmd⟩ `grep -c 'animate the same target' test/demo/instrument/apply-css-identity.test.ts`
→ **1** — the docblock's single naming of the scenario **as killed**
(L-BL-1). It is witnessed by no clause, cured by no commit, and appears in no
commit message of this unit.

## The bites — measured, not asserted

The gate was born-RED as an absent file, so "RED before GREEN" is trivially
satisfied; these two probes prove the clauses are not vacuous. Each was applied
to a committed file, measured, and reverted with `git checkout --` against that
one path (no stash, no blanket restore).

1. Restore the audited second derivation in `useKeyframesParsing.ts`
   (`keyframesStyleId.replace("keyframes-style-", "").toLowerCase()`):
   → `Tests 2 failed | 2 passed (4)`;
   `AssertionError: expected 'kfapply-apply-transform' to be
   'keyframes-style-kfapply-Apply-Transfo…'` and
   `AssertionError: expected false to be true` (the CSSOM match).
2. Empty the ribbon's RB-6 watch body:
   → `Tests 1 failed | 3 passed (4)`; `AssertionError: expected true to be false`.

## §0u ratchet — this unit's own rows

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'`
→ **12 · 12** (banked floor at the resume: 12; **not raised**).

⟨cmd⟩ … `| grep -cE 'useKeyframesState|useApplyCSS|useKeyframeBrushApply|useKeyframesParsing|KeyframesStringControls|RibbonBar'`
→ **0** — every §B.2 `.e` row is at zero diagnostics, with no cast, no
`@ts-expect-error` and no `eslint-disable` anywhere in this unit's diff.

⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json 2>&1 | grep -c 'apply-css-identity'`
→ **7** at the test's first landing → **0** after `c9346000`.

## Masking census

⟨cmd⟩ `git diff 2a0afe7a..HEAD -- test demo | grep -c 'test.skip\|it.skip\|\.only(\|@ts-expect-error\|eslint-disable'`
→ **0**.

⟨cmd⟩ `npx eslint demo/components/instrument/keyframes demo/components/instrument/transport/controls-pane/RibbonBar.vue test/demo/instrument/apply-css-identity.test.ts`
→ *(no output)*.
