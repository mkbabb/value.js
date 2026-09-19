SERVED MODEL: claude-opus-5[1m]

# KF.W11.r — evidence: the kf lockfile (R-C3) and the unowned `vue-tsc` remainder

Unit `KF.W11.r` (COHESION §0u · `KF-W11.md` ADDENDUM 2026-09-19 `:412-416`). All keyframes.js
commands run from `/Users/mkbabb/Programming/keyframes.js`. Every figure double-run and read from
the settled bytes.

## 1 · Substrate

| fact | command | reading |
|---|---|---|
| open sha | `git rev-parse --short HEAD` | `dd28da55` (== `origin/master`) |
| lockfile commit | `git log --oneline -1` after act 1 | `d8eb43ff` |
| cure commit | `git log --oneline -1` after act 2 | `2b649a1d` |

## 2 · Act 1 — R-C3, the lockfile takes the manifest

**Born-RED, measured before the act**

```
$ grep -c '@vue/test-utils' package-lock.json          → 0   (exit 1)
$ node -e "…package.json.devDependencies['@vue/test-utils']"  → "^2.5.1"
$ npm ci --dry-run | head -5
npm error code EUSAGE
npm error `npm ci` can only install packages when your package.json and package-lock.json … are in sync.
npm error Missing: @vue/test-utils@2.5.1 from lock file
$ npm ci --dry-run | grep -c '^npm error Missing:'     → 16
```

**The act** — `npm install --package-lock-only`, then `npm ci` twice.

```
$ npm install --package-lock-only        → "up to date, audited 426 packages in 4s"
$ grep -c '@vue/test-utils' package-lock.json          → 3
$ git diff --stat package-lock.json      → 1 file changed, 206 insertions(+)
$ git diff package-lock.json | grep -c '^-'            → 1   (the `--- a/` header alone: ZERO removals)
```

The 16 added `node_modules/…` entries are exactly the 16 `Missing:` rows — purely additive,
`@vue/test-utils` plus its transitive closure:

```
@one-ini/wasm · @vue/test-utils · abbrev · config-chain · editorconfig ·
editorconfig/node_modules/commander · editorconfig/node_modules/minimatch · glob · ini ·
js-beautify · js-cookie · minipass · nopt · path-scurry · proto-list · vue-component-type-helpers
```

```
$ npm ci ; echo $?                       → 0        (run 1)
$ npm ci ; echo $?                       → 0        (run 2, "added 425 packages, and audited 426 packages")
$ git status --porcelain                 → ` M package-lock.json` + the 2 untracked value.js mail packets
```

**No `node_modules` byte is tracked or committed.** Commit `d8eb43ff`
`chore(lock): the lockfile takes the manifest`, pathspec `package-lock.json` alone, pushed
`dd28da55..d8eb43ff`.

### The CI run, observed

**Run id `35428272041`** (`ci`, push, `master`, 2026-09-19T07:03:17Z, 1m10s) — **conclusion: failure**,
and both jobs now get PAST `npm ci`:

| job | id | conclusion | `npm ci` step | first failing step |
|---|---|---|---|---|
| demo correctness (browser roster) | `105857976499` | **failure** | **success** | `publish artifact boundary (post-build)` — `npm run proof:publish` → `proof:published-surface — FAIL (1 finding(s); the published surface lies)`; the findings are HEAVY exports with `NEITHER` doc coverage (`cssIdent`, `resolveTimingFunction`, `reverseCSSTime`, `serializeTimingFunction`, `timingFunctionEntries`) |
| library gates (library tests + proof:publish) | `105857976658` | **failure** | **success** | `check library types` — **exactly the three `src/**` `TS6133` rows of ESCALATION KF11-E2**, annotated by GitHub as `src/animation/physics/smooth.ts#194 '_startLoop'`, `src/animation/group/waapi.ts#9 'KeyframesAnimation'`, `src/animation/group/composite/compositor.ts#79 'groupedKeys'` |

**R-C3 is DISCHARGED**: the step that killed both jobs at the landing sha and the pre-landing
control alike now succeeds in both. "On the merge path" is now true of a pipeline that runs.

**What the running pipeline reveals, banked as a finding, not a cure**: the library job's blocker is
KF11-E2's own escalated set — independent, CI-side corroboration that §0u part (3) ("the count reads
0 at KF.W13's close") cannot be met by KF.W11–W13 alone.

## 3 · The §0u enumeration, re-run at this seat's clock — **54 does NOT reproduce; 31 does**

```
$ npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'   → 31 · 31   (exit 2 both; outputs byte-identical)
```

**This is a measured DIVERGENCE from the banked 54, and act 1 is its cause.** The enumeration seat
measured 54 against a `node_modules` that did **not** match `package-lock.json` (the lockfile lacked
`@vue/test-utils` entirely, yet the package was installed and 39 demo test files ran) — an
unreproducible local tree. `npm ci` replaced it with exactly the lockfile's resolutions, which is
what CI has always installed. **31 is the CI-faithful, reproducible count at `d8eb43ff`.**

Delta, itemized at the bytes: **54 − 24 + 1 = 31**.

| # | row | before | after | reading |
|---|---|---|---|---|
| 1 | `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | **24** | **0** | the whole banked `.a` block is absent under the lockfile's pins |
| 2 | `demo/components/instrument/transport/TransportDock.vue(95,34)` `TS2322` (`string \| null` → `SelectionValue`) | 0 | **1** | a row the banked enumeration does not carry; `TransportDock.vue` is a **KF.W13 §B.2 file** (`KF-W11.md` §Excluded) — booked there, untouched here |

Every other file's diagnostic count reproduces the banked enumeration exactly. Installed pins after
`npm ci`: `vue 3.5.35 · vue-tsc 3.3.11 · typescript 6.0.3 · @vue/language-core 3.3.11 ·
@vueuse/core 14.3.0 · gl-matrix 3.4.4 · @mkbabb/value.js 4.0.0 · @mkbabb/glass-ui 7.0.0` — each the
lockfile's own pin; `npm outdated` shows the tree sits below "Wanted" on 29 packages, which is the
drift the unpinned tree had absorbed.

**The ratchet is not violated: the count FELL (54 → 31) and did not rise.** The floor is re-banked at
**31** for `d8eb43ff`, and §0u part (2)'s "may not raise it" now reads against a figure any seat can
reproduce with `npm ci`.

### The homing at this seat's clock (31)

| home | files (count) | n |
|---|---|---|
| **KF.W11 §Bounds** | `matrix-editor/useTransformState.ts` **2** (`.a`) · `matrix-editor/MatrixEditor.vue` **1** (`.a`) · `CubeScene.vue` **1** (`.a`) · `spring/useSpringDemo.ts` **1** (`.c`) · `OrbitalDrag.vue` **0** (`.a`; was 24) | **5** |
| **KF.W12 §B.2** | `useKeyframeOps.ts(80,13)` 1 · `KeyframesEditor.vue` 2 · `KeyframesStringControls.vue` 2 · `useTimingFunctionEditor.ts` 3 · `ChannelControls.vue` 1 · `ChannelOptions.vue` 1 · `LayerConfigPanel.vue` 1 · `TimingFunctionPanel.vue` 1 · `EasingSidebar.vue(27,14)` 1 | **13** |
| **KF.W13 §B.2** | `MbabbMenu.vue` 2 · `TransportDock.vue` **3** (`(276,7)`, `(366,9)`, **`(95,34)` new**) | **5** |
| **UNOWNED — `.r`'s own** | `useEasingDemo.ts(294,13)` · `(310,43)` · `EasingScene.vue(8,10)` · `(45,7)` · `EditorShell.vue(175,10)` | **5** |
| **UNOWNED AND UNWRITABLE — KF11-E2** | `compositor.ts(79,11)` · `waapi.ts(9,1)` · `smooth.ts(194,13)` | **3** |
| | **TOTAL** | **31** ✓ |

**All five of `.r`'s rows and all three KF11-E2 rows reproduce at their banked coordinates,
character for character.** The enumeration's *identity* holds; only `OrbitalDrag.vue`'s block and the
one new `TransportDock.vue` row moved.

## 4 · Act 2 — the five UNOWNED rows: **2 cured, 3 ESCALATED**

### 4.1 CURED — `EasingScene.vue(8,10)` and `(45,7)`, `TS6133` (commit `2b649a1d`)

LAW A census before the delete, both zero-consumer:

```
$ grep -n 'computed' demo/scenes/easing/EasingScene.vue   → :8 (the import) and NOTHING else
$ grep -n 'isPlaying' demo/scenes/easing/EasingScene.vue  → :42 :43 (a comment) · :45 (the alias)
                                                            :86 :101 (both read `demo.isPlaying`) · :128 (a comment)
```

The local `const isPlaying = demo.isPlaying` has **zero** readers — every live read in the file goes
through `demo.isPlaying` directly. Both declarations deleted. Under the MISS-3 comment-truth lock the
note that captioned the alias is re-pointed at the two live read sites in the same commit, so no
comment is left true-sounding beside a deleted line.

### 4.2 ESCALATED — `useEasingDemo.ts(294,13)` `TS2322` and `(310,43)` `TS2345`

The specified cure is *"narrow the string→`Easing` at source, never a cast"*. **Measured at the
bytes, that narrowing is not reachable inside `.r`'s writable set**, and the file is left
**byte-unchanged** rather than substituted.

The seam is `cssValue` (`useEasingDemo.ts:93`), a `computed` whose three arms feed both sites
(`:294` the `timingFunction` option, `:310` `setTimingFunction(v)` — `v` is `cssValue`'s value type,
so ONE correct annotation would close both). Annotating it with the engine's own accepted type moves
the defect to its source, exactly as directed:

```
$ # with `computed<NonNullable<InputAnimationOptions["timingFunction"]>>(…)`
demo/scenes/easing/useEasingDemo.ts(93,85): error TS2769: No overload matches this call.
    Argument of type '() => string' is not assignable to parameter of type
    'ComputedGetter<NonNullable<Easing | TimingFunction | … | `cubic-bezier(${string})` | `steps(${string})` | …>>'
$ npx vue-tsc … | grep -c 'error TS'   → 28   (31 − 2 cured − 2 moved + 1 new)
```

The getter stays `() => string` because **two of its three arms have roots outside this unit's set**:

1. **Arm 1** `return cubicBezierToString(...bezierControlPoints.value)` — the helper's *declared*
   return type is `string`:
   `node_modules/@mkbabb/value.js/dist/subpaths/math.d.ts:5: export declare function cubicBezierToString(x1: number, y1: number, x2: number, y2: number): string;`
   while its implementation demonstrably returns the template literal
   (`dist/subpaths/math.js:44: return \`cubic-bezier(${i(e)}, ${i(t)}, ${i(n)}, ${i(r)})\`;`).
   The root cause is a **`@mkbabb/value.js` library declaration**, reachable only by editing that
   package — a `node_modules` patch is a HIGH defect by the standing law, and value.js's own `src/**`
   is another repo's.
2. **Arm 3** `return name` — `currentEasingName` is `ref("ease")`, i.e. `Ref<string>`, fed by
   `selectEasing(name: string)` whose external caller is `EasingTarget.vue:251`
   (`if (typeof v === "string" && v.length) demo.selectEasing(v)`, from reka's `ToggleValue`).

**The arm-3 narrowing was attempted and MEASURED, then reverted.** Typing the ref and the setter as
`Extract<NonNullable<InputAnimationOptions["timingFunction"]>, string>`:

```
$ npx vue-tsc … | grep -c 'error TS'                                   → 42    (28 → 42: +14)
$ npx vue-tsc … | grep -E '^demo/scenes/easing/(EasingSidebar|EasingTarget)\.vue' | grep -c 'error TS'  → 5   (baseline 1: +4 NEW)
```

The narrowing **raises** the count by 14 — **+4 of them in `EasingSidebar.vue` and
`EasingTarget.vue`, files outside `.r`'s writable set** (a ratchet violation and an out-of-bounds
write). The cascade also exposes *why*: the demo's editor vocabulary is deliberately **not** the
engine's CSS vocabulary — the bare names `"steps"` and `"cubic-bezier"` that `useEasingDemo.ts`
branches on (`:71 :76 :82 :85 :96 :99 :109 :254 :269 :270`) are **editor modes with no member in
`TimingFunctionNames | CssEasingLiteral`**, so every one of those comparisons turns `TS2367`
"no overlap" under the narrowed type. `cssValue`'s job is precisely to translate those two editor
modes into real CSS; the open `string` is the seam's honest type on the demo side.

**Disposition**: ESCALATED. The cure is one of two acts, neither `.r`'s:
(a) tighten `cubicBezierToString`'s declared return to `` `cubic-bezier(${string})` `` in
**`@mkbabb/value.js`** (a value.js library act — a producer row, not a keyframes-side hack), which
closes arm 1; and/or (b) give the easing scene a demo-owned name union spanning
`useEasingDemo.ts` + `EasingSidebar.vue` + `EasingTarget.vue` — a three-file contract act whose
bytes belong to **KF.W12's OPTIONS-UNIT** (`KF-W11.md` §Excluded: `demo/scenes/easing/**` →
*"`EasingSidebar.vue`'s seat rows are KF.W12's OPTIONS-UNIT carve"*).

### 4.3 ESCALATED — `EditorShell.vue(175,10)` `TS2379`

The brief's cure is *"give the argument the `undefined` its optional targets require"*, reading TS's
own *"Consider adding 'undefined' to the types of the target's properties."* **At the true bytes that
target does not exist.** The failing property is named by the diagnostic's own chain:

```
Types of property 'key' are incompatible.
  Type 'string | undefined' is not assignable to type 'PropertyKey'.
```

`key` is Vue's `VNodeProps['key']?: PropertyKey` — not a prop of `AnimationControlsGroup`, and not
editable from this repo. The component's *own* optional props **already** carry the explicit
`| undefined` the suggestion asks for — the error text prints them:
`readonly channels?: TransportChannel[] | undefined; readonly superKey?: string | undefined`. The
in-tree idiom for this class (documented in `EditorShell.vue`'s own prop comments: *"`| undefined` is
explicit because the App BINDS an `undefined` value … and `exactOptionalPropertyTypes` distinguishes
the two"*) is therefore **already applied and cannot reach `key`**.

**`key` is the sole blocker — probed, then reverted:**

```
$ # with the single line `:key="superKey"` (:176) removed
$ npx vue-tsc … | grep -E 'EditorShell'        → (nothing)
$ npx vue-tsc … | grep -c 'error TS'           → 28    (29 → 28; every other prop passes)
```

But that removal is a **behavioural** change the file's own `:164` docblock depends on
(*"`AnimationControlsGroup` below is `:key`ed to `superKey` and remounts on every swap"*), and the
remaining forms are behavioural too: a `?? ""` fallback changes the emitted key value, and making
`superKey` required changes a public prop contract documented as defaulting to `undefined`
(`:256`, `:277`) and cascades to hosts outside this set. §0u grants `.r` *"type-level cures only
(unused symbols, missing `import type`, narrowings the code already performs)"* and orders that
*"anything needing a behavioural change is ESCALATED … never forced."*

**Disposition**: ESCALATED to the wave that owns the shell seam (`kf-EditorShell` / KF-ES rows; the
shell's own wave), stated as a `key`-binding contract question, not a cast. **`EditorShell.vue:116`
— the `G-0.5` glass HOLD's subject — was never touched**; the file is byte-unchanged
(`git diff --stat HEAD -- …/EditorShell.vue` → empty).

## 5 · Gate readings BEFORE → AFTER

| gate | before | after | verdict |
|---|---|---|---|
| `npm ci` exit 0 (R-C3) | `EUSAGE`, 16 missing entries | **0 · 0** | **GREEN** |
| CI run observed, id + both jobs' outcomes | both jobs killed at `npm ci` | run **`35428272041`**; `105857976499` **failure** (at `proof:publish`) · `105857976658` **failure** (at the 3 KF11-E2 `src/**` rows); **`npm ci` success in both** | **GREEN** (observed and recorded) |
| vue-tsc count, double-run | **31 · 31** (the reproducible figure; the banked 54 was measured on an unreproducible tree) | **29 · 29**, outputs byte-identical | **RED against the brief's `54 → 49`**; **GREEN against §0u's own sub-gate** — *"the count after `.r` = the count before minus the remainder"* is 31 − 2 = 29, the remainder being 2 cured and 3 escalated |
| `npm run test:demo` | 39 files / 286 tests passed | **39 / 286 passed** | unmoved |
| `npx eslint demo/scenes/easing/EasingScene.vue` | — | exit **0** | clean |
| `git diff --check` | — | clean | clean |

## 6 · Escalations returned

- **KF11-E2 (inherited, re-measured and now CI-corroborated)** — the three `src/**` `TS6133` rows to
  KF.W5 / KF.W8. They reproduce exactly and they are the **sole** cause of the `library gates` job's
  failure at `check library types`.
- **KF11-E3 (new)** — `useEasingDemo.ts(294,13)` / `(310,43)`: the source narrowing needs either a
  `@mkbabb/value.js` declaration fix (`cubicBezierToString`) or a three-file easing-name contract
  spanning `EasingSidebar.vue` + `EasingTarget.vue` (KF.W12's OPTIONS-UNIT carve). Forcing it inside
  `.r`'s set raises the count 28 → 42 with +4 rows outside the set — measured, then reverted.
- **KF11-E4 (new)** — `EditorShell.vue(175,10)`: the failing property is Vue's `VNodeProps['key']`,
  not an editable target; every available cure is behavioural. To the shell seam's owning wave.
- **KF11-E5 (new, a substrate finding)** — the banked OP-0 count **54 is not reproducible**; it was
  read from a `node_modules` out of sync with `package-lock.json`. The CI-faithful floor at
  `d8eb43ff` is **31**, and `OrbitalDrag.vue`'s 24-diagnostic block — the largest single item in the
  `.a` packet's type-level shadow — **is absent under the lockfile's pins**. `.a` must re-derive its
  own OP-0 reading at its open before spending a cure against the banked 24, and `.j` must state the
  close delta against **31**, not 54.

## 7 · Commits

| sha | subject | pathspec |
|---|---|---|
| `d8eb43ff` | `chore(lock): the lockfile takes the manifest` | `package-lock.json` alone |
| `2b649a1d` | `fix(kf/easing · X.KF.W11.r): the two unread declarations die with their diagnostics` | `demo/scenes/easing/EasingScene.vue` |

Both pushed to `origin/master`. No `src/**` byte, no `node_modules` byte, no `@ts-expect-error` /
`as` / `eslint-disable`, no `test.skip`; `scripts/dev/dev.sh` never touched.
