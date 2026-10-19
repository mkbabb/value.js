SERVED MODEL: claude-fable-5-1

# KF.W12.c — KFED-UNIT: gate transcripts at the unit head (keyframes.js `c82f92ea`)

All readings double-run unless a triple is stated; every ⟨cmd⟩ is the one that produced the line under it.

## G-KFW12-3 — runtime clause

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/keyframes-editor-honest.test.ts`

```
run 1:  Test Files  1 passed (1)     Tests  7 passed (7)
run 2:  Test Files  1 passed (1)     Tests  7 passed (7)
run 3:  Test Files  1 passed (1)     Tests  7 passed (7)      (after c82f92ea, the comment-only commit)
run 4:  Test Files  1 passed (1)     Tests  7 passed (7)
```

The seven: (1) KF-KE-4 identity · (2) KF-KE-3 the field · (3) KF-KE-5 structural · (4a) KF-KE-7 a settling motion → one removal for two presses, no report · (4b) KF-KE-7 a never-settling `play()` → the removal lands within the budget, reported once · (5) KF-KE-6/-12 two owners · (6) EE-03 re-regression guard.

The identity strings, printed by (1) with `--disableConsoleIntercept` at the head:

```
[KF-KE-4] class="keyframes-style-kfed-identity-Transform" selector="keyframes-style-kfed-identity-Transform" animation-name="keyframes-style-kfed-identity-Transform" @keyframes="keyframes-style-kfed-identity-Transform"
```

## G-KFW12-3 — byte clauses (BEFORE → AFTER)

| clause | ⟨cmd⟩ | base `2cd314af` | head `c82f92ea` |
|---|---|---|---|
| KF-KE-3 | `grep -c 'parseCssScalar' …/KeyframesEditor.vue` | 2 · 2 | **0 · 0** |
| KF-KE-3, the wider census over the whole writable set (ten files) | `grep -rc 'parseCssScalar' <set> \| awk sum` | — | **0 · 0** (a comment in `KeyframeCard.vue:58` read 1 at `4fa6efec`; renamed by kind at `c82f92ea`) |
| KF-KE-5 | `grep -c 'class="absolute top-2 right-4' …/components/KeyframeCard.vue` | 1 · 1 | **0 · 0** |
| KF-KE-4 | `grep -c 'toLowerCase()' …/composables/useKeyframesState.ts` | 1 · 1 | **0 · 0** |
| the `:38-47` comment | re-read at the bytes | stated the occlusion mechanism | rewritten to describe the cluster on `z-content` + `pointer-events-none` with a `pointer-events-auto` control row, the `<pre>` an unpositioned later sibling (`d10ab8b4`) |

## §0u ratchet

⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'`

```
banked at this unit's open (receipt part 1):  16 · 16     (this unit's rows: 3 — useKeyframeOps.ts(80,13) TS2322 · KeyframesEditor.vue(445,39)/(446,37) TS2345)
at the head c82f92ea:                          14 · 14     (this unit's rows: 1 — useKeyframeOps.ts(91,13) TS2322, ESCALATED; the two TS2345 fell with KF-KE-7's guard at eda8bc43)
```

The one remaining, verbatim:

```
demo/components/instrument/keyframes/composables/useKeyframeOps.ts(91,13): error TS2322: Type 'string' is not assignable to type 'Easing | TimingFunction | "linear" | "ease" | … | undefined'.
```

The other thirteen are outside this unit's rows (two of them `KeyframesStringControls.vue(55,9)`/`(76,5)`, `.e`'s by the re-open table). The count never rose during the unit. No `as`, `@ts-expect-error` or `eslint-disable` written.

## `npm run test:demo` (the whole demo project, double-run at `4fa6efec`; `c82f92ea` is comment-only)

```
run 1:  Test Files  2 failed | 50 passed (52)     Tests  2 failed | 438 passed (440)
run 2:  Test Files  2 failed | 50 passed (52)     Tests  2 failed | 438 passed (440)
 FAIL  test/demo/instrument/css-code-editor-seam.test.ts > G-KFW12-4 > (2) KF-CE-1: the tokenizer …        (.d's, RED pending E-d1 — stated in .d's receipt)
 FAIL  test/demo/scenes/spring-trace-truth.test.ts > SpringTrace … > (4b) the floor the heatmap declares … (KF.W11's inherited honest-RED, KF11-E(j1))
```

Neither failure is this unit's; both were RED before its first byte. Before `781ac250`/`4fa6efec` the same command read `3 failed | 49 passed` twice, the third being this unit's (4a) — the flake the correction removed (see `KF-W12-c-born-red.md` §6).

## Hygiene

- Skip / masking census over this unit's test diff: ⟨cmd⟩ `git diff 2cd314af..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` → **0**.
- `git diff --check` clean on every commit; eslint 0 on every touched file (one unused `eslint-disable-next-line no-console` in the test removed before commit).
- Prettier: `KeyframeCard.vue` fails `--check` on class-attribute ordering — the committed baseline (`.a`'s lines at `697d045d`) already fails the same check; not reformatted (a reformat would sweep a sibling's bytes).
- Bounds: ⟨cmd⟩ `git diff --name-only 2cd314af..HEAD` restricted to this unit's twelve shas touches only `demo/components/instrument/keyframes/{KeyframesEditor.vue, components/KeyframeCard.vue, composables/{useKeyframesState,useHighlightCSS,useApplyCSS,useKeyframeBrushApply,useKeyframeOps,useKeyframesEditor}.ts}` and `test/demo/instrument/keyframes-editor-honest.test.ts` — all in the writable set; `src/`, `orbital-drag/`, `node_modules`, glass-ui and `scripts/dev/dev.sh` untouched. `KeyframesAddDialog.vue` and `useToolbarKeyboard.ts` (in the set) were not written.
- Shared index: `.d` committed concurrently on the same branch (`7cda421c` · `ccda20c7` · `850b62a9` · `b6914c36` · `6f065d36` · `b965afa1` · `ec49bbef`, interleaved with this unit's shas by timestamp); no path was staged by both units.

## SELF-COUNT

⟨cmd⟩ `git log --oneline 2cd314af..HEAD | grep -c 'X.KF.W12.c'` → **12**:
`1b29fb22` · `7a10d7ff` · `d10ab8b4` · `73e57a93` · `eda8bc43` · `a10e5793` · `c026121a` · `eba0bd6b` · `5e95bdf3` · `781ac250` · `4fa6efec` · `c82f92ea`.
