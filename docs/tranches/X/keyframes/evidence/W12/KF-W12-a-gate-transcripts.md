SERVED MODEL: claude-opus-5[1m]

# X.KF.W12.a — CARD-UNIT · gate transcripts and measured evidence

Unit `KF.W12.a`, wave `KF.W12` (Track B · X·KF). Every command run from
`/Users/mkbabb/Programming/keyframes.js`. Every figure double-run and read from
the settled bytes (WRITE-THEN-MEASURE).

**Open substrate**: keyframes.js `master` **`bf4a9a9c`** — the wave record's
re-open head. **Unit head**: **`ed96f2b0`**.

---

## 1. G-KFW12-1 — the three clauses

### 1.1 Runtime clause

**BORN RED**, at `bf4a9a9c`, before any byte of this unit:

```
⟨cmd⟩ npx vitest run --project demo test/demo/instrument/keyframe-card-offset-loop.test.ts
 RUN  v4.1.8 /Users/mkbabb/Programming/keyframes.js
No test files found, exiting with code 1
filter:  test/demo/instrument/keyframe-card-offset-loop.test.ts
projects: demo
```

⟨cmd⟩ `ls test/demo/instrument/keyframe-card-offset-loop.test.ts` → `No such file
or directory` (twice). The RED is **born-RED**, not UNRUNNABLE: the sole cause is
the absent file.

**GREEN**, at `ed96f2b0`, double-run:

```
run 1:  Test Files  1 passed (1)   ·   Tests  9 passed (9)
run 2:  Test Files  1 passed (1)   ·   Tests  9 passed (9)
```

### 1.2 Byte clause

```
⟨cmd⟩ grep -c 'frame.start.value = starts' demo/components/instrument/keyframes/KeyframesEditor.vue
at bf4a9a9c : 1 · 1        (the spec's authoring figure, reproduced)
at ed96f2b0 : 0 · 0        (the gate's requirement)
```

**A false reading was caught and cured at this seat.** The first draft of the
KC-2 comment quoted the defect verbatim, which kept the clause reading `1` over
a file whose defect was already gone — a gate green or red on prose rather than
on code. The comment now names the mechanism without reproducing the token, and
the clause reads the bytes it was written to read.

### 1.3 Order clause (KC-34 / OP-3) — read from `git log`

```
⟨cmd⟩ git log --oneline --reverse bf4a9a9c..HEAD -- demo/components/instrument/keyframes/
e5235ca0 fix(… KC-34 — the highlight path stops replacing Vue-owned DOM) …
f6a51e23 fix(… KC-1 + KC-27 …)
dec084a8 fix(… KC-2 ≡ KF-KE-2 …)
5b80d54c fix(… KC-8 / KC-9 — keep-mounted …)
8099b19e fix(… KC-10 + KC-3 ≡ KF-CB-11's shell + KC-7 …)
361d2d17 fix(… KC-28 + KC-15 + KC-36 + KC-18 …)
697d045d chore(… the tail …)
```

The highlight-path commit **`e5235ca0`** precedes the keep-mounted commit
**`5b80d54c`**. **CLAUSE GREEN.**

---

## 2. §0u ratchet

| reading | command | value |
|---|---|---|
| wave total at this unit's open | `npx vue-tsc --noEmit -p tsconfig.json 2>&1 \| grep -c 'error TS'` | **24 · 24** |
| wave total at this unit's last commit | same | **18 · 18** |
| this unit's two named diagnostics | `… \| grep 'KeyframesEditor.vue(76,73)\|KeyframesEditor.vue(81,41)'` | **0** |

The banked pair — `KeyframesEditor.vue(76,73)` and `(81,41)`, TS2339 *"Property
'value' does not exist on type 'KeyframeSelector'"* — fell **with** the cure that
owns them (KC-2 ≡ KF-KE-2, `dec084a8`), never by a cast, `@ts-expect-error` or
`// eslint-disable`. The total FELL from the banked floor; it never rose. The
wave total moves under `.b`'s concurrent work in the same checkout, so the figure
above is the reading at this unit's own last commit, not a claim about `.b`'s.

### 2.1 DISCLOSED — two diagnostics moved into `.c`'s region

```
demo/components/instrument/keyframes/KeyframesEditor.vue(445,39): error TS2345:
  Argument of type 'HTMLElement | null | undefined' is not assignable to
  parameter of type 'HTMLElement'.
demo/components/instrument/keyframes/KeyframesEditor.vue(446,37): error TS2345: (same)
```

`setTargets(el1)` / `setTargets(el2)` inside `removeKeyframe`. They were
suppressed by `cardInstances` being `ref<any[]>`; typing the ref store (KC-17 /
KC-18) is what makes **KC-15's own named consequence** — a stale or absent index
handed to `setTargets` — visible to the checker. There is no green path that is
not `any`: under `noUncheckedIndexedAccess`, indexing **any** array yields
`| undefined`, so even a filtered non-null `HTMLElement[]` reds at the same call.
The guard's site is `removeKeyframe`, outside this unit's `:76-88` card seam and
inside `.c`'s region, which `.c` already rewrites for KF-KE-7 / KF-KE-8.

---

## 3. The BITE, executed rather than claimed

The unit's cure was temporarily regressed at the bytes and the gate re-run:

```
⟨edit⟩ frame.start = percentSelector(percent)  →  frame.start = { kind: "percent", value: percent }
⟨cmd⟩ npx vitest run --project demo test/demo/instrument/keyframe-card-offset-loop.test.ts
× (2) KC-2 ≡ KF-KE-2: a retiming emit REPLACES the frozen selector, in percent
    AssertionError: expected [ '0%', '3750%', '100%' ] to deeply equal [ '0%', '37.5%', '100%' ]
× (2) KC-2: the surviving frames all move, so no throw aborted the loop
    AssertionError: expected [ '1000%', '6000%', '9000%' ] to deeply equal [ '10%', '60%', '90%' ]
      Tests  2 failed | 7 passed (9)
⟨restore⟩ git diff --stat -- …/KeyframesEditor.vue → (no output)
```

That is **exactly the 100× destructive write L-B1 warned of** — the outcome of
curing the freeze without the unit — reproduced and caught. It is the measured
justification for the spec's MUST-NOT-SPLIT lock on this commit family.

---

## 4. The producer, quoted from the installed `.d.ts` (never guessed)

`node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts`:

```ts
export interface SliderProps extends FormFieldProps {
    modelValue?: number[] | null;
    min?: number;
    max?: number;
    step?: number;
    /** Decorative checkpoints in the numeric domain; they never snap the value. */
    marks?: readonly number[];
    …
}
```

`…/labeled-field/types.d.ts` + `LabeledField.vue.d.ts`:

```ts
export interface LabeledFieldProps extends LabeledFieldCommonProps {
    /**
     * Whether the control is a native labelable element … Composite controls
     * whose root is a non-labelable element — e.g. reka Slider's `span` root —
     * set this `false` so the label drops the invalid `for` and the control
     * names itself through `aria-labelledby` (the slot's `labelledBy`) instead.
     */
    controlLabelable?: boolean;
}
type __VLS_Slots = { default(props: LabeledFieldSlotProps): unknown; … };
```

`…/_shared/axes.d.ts`: `TONES: readonly ["neutral","success","warning","info","destructive"]`.
`…/button/types.d.ts`: `iconOnly?: boolean` — *"Square geometry for an accessibly named icon command."*
`…/separator/…`: `decorative?: boolean`.

### 4.1 PRODUCER ASK for the SS-6 relay at `.g` — per-thumb `aria-valuetext`

The spec's KC-2 cure list names *"per-thumb `aria-valuetext`"*. It is **not
expressible at the installed producer**, measured at the shipped bundle rather
than inferred:

```
⟨cmd⟩ node -e "…read dist/slider-DzqeQmMu.js…"   (5 810 bytes)
  occurrences of 'aria-valuetext' : 0
  the thumb render, verbatim:
    (v(t, (t, n) => (_(), c(y(T), {
        key: n,
        "aria-label": e.$attrs["aria-label"] ?? void 0,
        "aria-labelledby": e.$attrs["aria-labelledby"] ?? void 0,
        "aria-describedby": e.$attrs["aria-describedby"] ?? void 0,
        "aria-errormessage": e.$attrs["aria-errormessage"] ?? void 0,
        "aria-invalid": A.invalid || void 0,
        class: "slider-thumb glass-specular-track"
      }, …
```

One `aria-label` / `aria-labelledby`, forwarded from `$attrs` to **every** thumb,
and **no thumb slot**. This is the same fact kf-KeyframesEditor's **KF-KE-34**
recorded (*"glass forwards ONE `aria-label` to ALL thumbs … thumb identity needs
per-thumb `aria-valuetext`"*), now confirmed at the installed 7.0.0 dist. The
bank's suggested `LabeledSlider` cure is additionally **refuted for this control**:
`LabeledSliderProps` declares `modelValue: number` — single-thumb — so it cannot
host an N-stop retiming rail. `LabeledField` + `controlLabelable: false` is the
producer's own shape for the case and is what landed.

**The ask**: a per-thumb accessible-value channel on `Slider` — a thumb slot, or
a `thumbValueText?: (value: number, index: number) => string` prop. **Rides SS-6
at `.g`.** Glass-ui is READ-ONLY; no demo-side reach into rendered thumbs was
made (that would be a copied producer selector, a HIGH defect).

---

## 5. Suite and lint

```
⟨cmd⟩ npx vitest run --project demo
at bf4a9a9c : Test Files 1 failed | 47 passed (48)  ·  Tests 1 failed | 414 passed (415)
at ed96f2b0 : Test Files 1 failed | 48 passed (49)  ·  Tests 1 failed | 423 passed (424)   (twice)
```

The single failure is unmoved and is **not this unit's**:
`test/demo/scenes/spring-trace-truth.test.ts > … (4b) the floor the heatmap
declares is not below the one the plot pins` — KF.W11's carried honest-RED
(ESCALATION KF11-E(j1), residual j-R5), named in this wave's own re-open block.
The file is outside every KF.W12 §B.2 row and was not touched, and nothing was
weakened to make it pass. The denominator grew by exactly this unit's one file:
48 → 49.

```
⟨cmd⟩ git diff bf4a9a9c..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('  →  0
⟨cmd⟩ npx tsc --noEmit -p tsconfig.test.json 2>&1 | grep keyframe-card-offset   →  (no output)
⟨cmd⟩ npx eslint test/demo/instrument/keyframe-card-offset-loop.test.ts
        demo/components/instrument/keyframes/components/
        demo/components/instrument/keyframes/KeyframesEditor.vue
        demo/components/instrument/keyframes/composables/useHighlightCSS.ts   →  clean
```

`value4-editor-boundary.test.ts`'s timeout was **NOT** widened; the file was not
touched at all. No timeout anywhere in this unit's diff exceeds a default.

---

## 6. The headless finding the gate carries but does not assert

```
⟨probe⟩ AnimationGroup.of(presets.warpLeft().setTargets(el1),
                          presets.jumpUp().setTargets(el2)).play()
BrowserScalarResolutionError: Could not resolve "translateX(0%) rotate(0deg)"
  for "transform" to a numeric CSS scalar (computed: "translateX(0%) rotate(0deg)").
  code: 'BROWSER_SCALAR_RESOLUTION'
```

`removeKeyframe` **awaits** that choreography with no `catch`, so in a headless
realm `removeKeyframeData` is never reached and the delete is silently dropped.
That is **KF-KC-27's third aggravation reproduced verbatim** — *"a play() failure
silently drops the delete — no catch anywhere on the template chain"*. Ungating
the mutation from the decorative animation is **KF-KE-7**, `.c`'s row, at a site
outside this unit's `:76-88` seam. The gate therefore witnesses the removal
COMMAND at the seam this unit owns and neither asserts the defect (which would
red the moment `.c` cures it) nor waits on it (which would gate this unit on
another unit's work).
