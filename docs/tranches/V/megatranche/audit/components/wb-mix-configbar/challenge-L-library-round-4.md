# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, 1M context. That is the tier
this seat was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines), area `demo/workbenches`.
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Write scope honoured: only files under `…/components/wb-mix-configbar/`. **No source edited.**

---

## §00 · Provenance — this is ROUND 4; rounds 1–3 are preserved intact, nothing lost

| round | report | status |
|---|---|---|
| 1 | `challenge-L-library-round-1.md` | **verbatim, untouched** |
| 2 | `challenge-L-library-round-2.md` | **verbatim, untouched** |
| 3 | `challenge-L-library-round-3.md` | **verbatim, copied from the head before this write** |
| **4** | `challenge-L-library.md` (this) | supersedes as the head; carries 1 + 2 + 3 whole |

All twenty-five prior findings — r1 `L-1…L-9`, r2 `L2-1…L2-7`, r3 `L3-1…L3-8`
(**2 BLOCKER · 12 MAJOR · 7 MINOR · 2 INFO**) — **stand in full.** I re-derived the import lattice
independently before reading them and reached the same boundaries; I contradict nothing and retract
nothing. Round-4 items are numbered `R4-n` so all four records remain collision-free.

**This round adds four findings, and one of them corrects a cure that rounds 2 and 3 both proposed.**

| new | severity | one line |
|---|---|---|
| **R4-1** | **MAJOR** | The mix **preview** and the mix **operation** are *different mathematical objects* — a path vs a weighted centroid. Measured **0.1358 OKLab** apart at N=3 (JND ≈ 0.02). The chip grammar is **inverted between the two features**: the workbench whose output is a ramp (gradient) has no chips; the one whose output is a point (mix) got the ramps. **This corrects r2 L2-3's and r3 §11's cure — unifying the three samplers does not fix it.** |
| **R4-2** | **MAJOR** | The O-14 "PREVIEW TRUTH LAW" oracle **re-implements the sampler's own loop and compares**, and never names `mixColorSequence` (`grep -c` → **0**). It is structurally incapable of detecting R4-1. Extends r2 L2-7 from "tautological on count" to *tautological on the whole algorithm, against the wrong referent*. |
| **R4-3** | **MAJOR** | **10 of the library's 19 vitest files import from `demo/`, covering 18 demo modules.** The library's own suite is already the de-facto owner of the demo's color math. Independent, measured proof for the r1 L-2 / r2 L2-3 transposition that no prior round used. |
| **R4-4** | MINOR | Two residuals the prior cures leave standing: the `workbenches/mix → palettes/types` edge that survives r1 L-2's move, and the third vocabulary idiom (`STRATEGIES`) that r1 L-7 fixes locally while r2 L2-5's `satisfies` idiom fixes the other two — one file, two different repairs for one defect shape. |

**Verdict: DEFECTIVE.** Cumulative across four rounds: **2 BLOCKER · 15 MAJOR · 8 MINOR · 2 INFO.**
Strongest defect this round: **R4-1.**

---

## §0 · Independent re-derivation of the import lattice

Traced before reading any prior round, so this is a fourth independent observation rather than a
re-reading.

| # | line | specifier | home | round-4 verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | peer | SOUND |
| 2 | 3–9 | `../../ui/select` | 1-line alias → `@mkbabb/glass-ui` | r1 **L-4** · r3 **L3-8** |
| 3 | 10 | `../../ui/button` | 1-line alias → `@mkbabb/glass-ui` | r1 **L-4** · r3 **L3-8** |
| 4 | 11 | `@lucide/vue` (`Blend`) | devDep | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` | **real `exports` key** | SOUND (code) · r2 **L2-2** (config) |
| 6 | 13 | `../../color-session/picker-color` | demo rename of `SpaceId` | r2 **L2-4** · r3 **L3-5** |
| 7 | 14 | `../../palettes/mix` | **sibling FEATURE tree** | r1 **L-2** · **R4-3** · **R4-4** |
| 8 | 15 | `reka-ui` (`AcceptableValue`) | glass-ui's private dep | r1 **L-6** |
| 9 | 18 | `../../color-session/color-space-meta` | canonical vocabulary | r2 **L2-5** · r3 **L3-5** |
| 10 | 23 | `../../color-session/color-chips` | single-consumer module | r1 **L-3** · **R4-1** · **R4-2** |

Independently re-confirmed this run:

```
$ grep -rn "@mkbabb/value.js" demo/ --include="*.vue" --include="*.ts" \
    | grep -vE "value\.js/(color|css|easing|math|transform|quantize|value)"
demo/shared/utils.ts:12: * `@mkbabb/value.js` specifier — the full-barrel import that drags the   ← prose only
```

Line 12 (`@mkbabb/value.js/color` → `HueInterpolationMethod`, exported at `src/subpaths/color.ts:8`)
is the file's one clean library edge and a real consumer could write it verbatim. Ten edges, one
unqualified. The public-surface axis is sound *in the code* and defective *in the config* (r2 L2-2,
which I re-verified: `ls dist/` shows no `index.d.ts`, and `vite.config.ts:174-175` states the
closure — *"The seven literal package capabilities are the complete library graph; there is no root
or compatibility entry."*).

---

## §1 · R4-1 — MAJOR · the preview and the operation are different functions; the chip grammar is inverted between the two features

Rounds 1–3 established that N-ary interpolation is library math trapped in the demo (r1 L-2), that
there are **three** hand-rolled chain samplers with divergent joint conventions (r2 L2-3), and that
`mixColors` re-converts both endpoints per stop (r3 L3-7). All three framed the problem as **one
arithmetic, copied**. It is not. Two of those functions compute **different mathematical objects**,
and this component wires one to its preview and the other to its verb.

### 1a — the two objects

| | `sampleInterpolationRamp` | `mixColorSequence` |
|---|---|---|
| home | `demo/color-session/color-chips/sample.ts:52` | `demo/palettes/mix.ts:36` |
| shape | N colors → **k stops** (a path) | N colors → **1 color** (a weighted centroid) |
| rule | piecewise segments, uniform param, joints deduped | running accumulation `mix(acc, cᵢ, wᵢ/(Σw))` |
| driven by | `MixConfigBar.vue:57-74` — the Space and Hue chips | `MixConfigBar.vue:167` → `MixPane.vue:104` → `useMixingState.ts:88` — the Mix button |

Both are reached through **this component's same two v-models**. The chip claims to preview what the
button will do. It previews a different function.

### 1b — measured divergence

Both chains reimplemented verbatim against the built `dist/subpaths/{color,css}.js`
(`<scratchpad>/div2.mjs`, never written to the repo), `space=oklab hue=shorter`:

```
$ node div2.mjs
operands=["#ff0000","#00ff00"]  N=2
  Mix button RESULT   (palettes/mix.ts mixColorSequence) = oklch(74.719749072243% 0.152739026921 91.692893198925deg)
  preview chip STOPS  (color-chips/sample.ts)            = 17 stops
  min OKLab distance result -> nearest previewed stop    = 0.0000
operands=["#ff0000","#00ff00","#0000ff"]  N=3
  Mix button RESULT   (palettes/mix.ts mixColorSequence) = oklch(64.88028998731% 0.013979941145 188.478372779407deg)
  preview chip STOPS  (color-chips/sample.ts)            = 17 stops
  min OKLab distance result -> nearest previewed stop    = 0.1358
operands=["oklch(0.7 0.2 30)","oklch(0.6 0.18 150)","oklch(0.5 0.15 270)","oklch(0.8 0.1 90)"]  N=4
  Mix button RESULT   (palettes/mix.ts mixColorSequence) = oklch(65% 0.035266839949 82.947322972739deg)
  preview chip STOPS  (color-chips/sample.ts)            = 19 stops
  min OKLab distance result -> nearest previewed stop    = 0.0534
```

At **N=2 they agree exactly** (0.0000 — the centroid of two equal weights *is* the path's midpoint).
At **N≥3 they do not**: the produced color sits **0.1358** (N=3) and **0.0534** (N=4) OKLab from the
*nearest* stop the chip painted, against an OKLab JND of ≈0.02 — roughly **7×** and **2.7×** a
just-noticeable difference. At N=3 the button yields a near-achromatic teal (chroma **0.014**) while
all 17 previewed stops are high-chroma (**0.25–0.31**). The user chooses a color space by reading a
ramp the operation never traverses.

The component asserts the opposite in its own prose — `MixConfigBar.vue:38-43` calls `operandColors`
*"the preview ramps' truth inputs"*, and `sample.ts:20` states *"a chip that approximates the library
output is FORBIDDEN."* The chip does not approximate the output. It computes something else.

### 1c — the structural finding: the grammar is assigned backwards

The deeper defect is not the arithmetic. It is **which chip went to which feature**.

| workbench | what the operation produces | chip it renders |
|---|---|---|
| `workbenches/gradient` | **a ramp** (`GradientVisualizer` paints a gradient) | **none** — `grep PreviewRamp` → 0 hits outside MixConfigBar |
| `workbenches/mix` (colors) | **one color** (`useMixingState.ts:89` → `{ type: "color", css }`) | **`PreviewRamp`** — a path |

`PreviewRamp` is the correct grammar for the feature whose output *is* a ramp, and it went to the
feature whose output is a point. `color-chips/index.ts:14-17` records the assignment as deliberate:

> *"Lane D wires MixConfigBar + AuroraPane; … the GradientVisualizer consume through Lane G's queue"*

Lane D landed on the wrong feature; Lane G — the one where a ramp is literally the product — never
drained. Round 1's L-3 found the *duplication* of the select pair between these two components;
this is the complementary half it did not reach: the one behaviour that differs between the two
copies is on the wrong side.

### 1d — why this corrects the prior cure

Round 2's L2-3 cure proposes one library `sampleColorRamp` and notes it *"composes with round 1's
L-2 cure (`mixColorSequence` promoted alongside)"*; round 3's §11 lattice carries the same shape
(`mixColors · sampleColorRamp`, with `mixSequence` folded in beside it). **Promoting them alongside
as two independent library functions preserves this defect exactly.** The mix chip would still call
`sampleColorRamp` while the mix button calls `mixSequence`, and at N≥3 they would still be 0.1358
apart. Unifying three *samplers* does not relate the sampler to the *operation*.

- **Mechanism:** the library's interpolation surface stops at arity 2, so each consumer lifted it
  independently; two consumers needed two *different* lifts (a path, a point), and a preview module
  authored for the path was wired to the feature that computes the point.
- **Reproduction:** `node <scratchpad>/div2.mjs`, pasted above. **In the shipped app this is dormant
  behind r1 L-1** — `operandColors` is permanently `[]`, so no chip renders and the divergence cannot
  currently be seen. It goes live the moment L-1's `tag="button"` is cured, exactly like r1 L-9.
  I label the *live-app* half a hypothesis and the *code/measurement* half proven.
- **Cure — relate the two functions in the library, then give each feature its own grammar:**

```ts
// src/color/operations.ts → src/subpaths/color.ts
export function mixSequence(                    // N → 1 : the OPERATION (absorbs mixColorSequence)
    colors: readonly AnyColor[],
    options: { space: SpaceId; hue?: HueInterpolationMethod; weights?: readonly number[] },
): Result<Color<S>, ColorIssue>;

export function sampleColorRamp(                // N → k : the PATH (absorbs the three samplers)
    colors: readonly AnyColor[],
    options: { space: SpaceId; hue?: HueInterpolationMethod; count: number },
): Result<AnyColor[], ColorIssue>;
```

…with endpoints converted **once** (r3 L3-7) and one joint contract (r2 L2-3). Then:

- **gradient** rows render `PreviewRamp(sampleColorRamp(stops, …))` — the chip *is* the product;
- **mix** rows render a **single-swatch chip** of `mixSequence(operands, …)` — the chip *is* the
  result the button will produce, per candidate space. `PreviewStrip`/`PreviewRamp` already
  establish the chip family; the mix case needs the degenerate one-stop member, not a new module
  (edict 3 — no contrivance).

Each feature previews the function it actually calls. The divergence becomes unrepresentable rather
than merely corrected, and the O-14 law finally has a referent (R4-2).

---

## §2 · R4-2 — MAJOR · the O-14 oracle re-derives the sampler and never names the operation

`test/preview-chips.test.ts` is the guard built for exactly this class of defect. It cannot see R4-1,
by construction.

Its helper re-implements the sampler's own loop:

```ts
test/preview-chips.test.ts:38-49
function directRamp(from, to, count, space, hue): string[] {
    return Array.from({ length: count }, (_, index) => {
        const result = mixColors(from, to, index / (count - 1), { space, hue });
        …
    });
}
```

…and then asserts the sampler equals that re-implementation, joint convention included:

```ts
:66-76
const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 2) + 1);
const seg0 = directRamp(c0!, c1!, perSegment, "oklab", "shorter");
const seg1 = directRamp(c1!, c2!, perSegment, "oklab", "shorter");
expect(stops).toEqual([...seg0, ...seg1.slice(1)]);
```

`perSegment`, the `slice(1)` joint dedupe and the segment decomposition are the *sampler's* rules,
retyped in the test. The file header states the circularity as if it were the design
(`:5-8`):

> *"the sampler composes, never re-derives, so equality is by construction and this oracle guards the
> construction."*

It guards the construction. It does not guard the **claim** — that the chip shows what mixing does.

```
$ grep -c "mixColorSequence" test/preview-chips.test.ts
0
```

The file that calls itself *"the chip half of the PREVIEW TRUTH LAW"* never names the operation whose
truth it is asserting. Round 2's L2-7 found this tautological **on the stop count**; it is
tautological on the entire algorithm, and it is aimed at the wrong referent altogether.

And it is green:

```
$ npx vitest run test/preview-chips.test.ts test/mix-v4.test.ts
 ✓ test/mix-v4.test.ts (3 tests) 3ms
 ✓ test/preview-chips.test.ts (4 tests) 11ms
 Test Files  2 passed (2)   Tests  7 passed (7)
```

Seven passing tests across the sampler and the sequence — **in the same run, in the same suite** —
and nothing compares them. This is round 3's §12.8 through-line in a new place: green gates that
cannot fail on the defect they were built for.

- **Mechanism:** an oracle written against the implementation rather than against the property.
- **Reproduction:** the greps and the vitest run above.
- **Cure:** the property, not the algorithm. With R4-1's library pair landed, one assertion states
  the whole law and is falsifiable:
  `expect(sampleColorRamp(ops, {…, count: k})).toContainEqual(mixSequence(ops, {…}))` for the
  2-operand case, and for N≥3 the honest statement of what the mix chip must show —
  `expect(mixChipStops(ops, space, hue)).toEqual([mixSequence(ops, { space, hue })])`. The e2e leg
  (`o14-preview-truth.spec.ts`) then holds paint ≡ stamp as it already does, and the chain is real
  end to end.

---

## §3 · R4-3 — MAJOR · the library's own test suite already owns the demo's color math

Rounds 1–3 argued the transposition (`mixColorSequence` and the samplers belong in `src/`) from
duplication and from API granularity. There is a third, independent, measured argument neither used:
**the code is already tested as library code.** Only its file location disagrees.

```
$ grep -rln 'from "\.\./demo/' test/ | wc -l ; ls test/*.test.ts | wc -l
      10
      19
$ grep -rhn 'from "\.\./demo/' test/ | sed 's/.*from "//;s/".*//' | sort -u
../demo/color-picker/composables/boot/view-accents
../demo/color-session/color-chips/sample
../demo/color-session/color-utils
../demo/color-session/ink
../demo/color-session/palettes-ramp
../demo/color-session/picker-color
../demo/color-session/view-accent
../demo/palettes/mix
../demo/picker/controls/ComponentSliders/composables/sliderAnnouncement
../demo/platform/transport/availability
../demo/shell/dock/status-lamp
../demo/shell/viewSchema
../demo/workbenches/extract/ImageEyedropper/composables/useImageSampler
../demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue
../demo/workbenches/gradient/composables/gradientParse
../demo/workbenches/gradient/composables/useGradientCSS
../demo/workbenches/gradient/composables/useGradientInterpolation
../demo/workbenches/gradient/composables/useGradientModel
```

**10 of 19 library test files — 53% — reach into `demo/`, covering 18 demo modules.** Both of this
component's math dependencies are in that list: `../demo/palettes/mix` (`test/mix-v4.test.ts:4`) and
`../demo/color-session/color-chips/sample` (`test/preview-chips.test.ts:31`).

That is the ownership question already answered, in the only place ownership is enforced by
execution. `test/` is the *library's* vitest project (its unit is `src/`); a library suite that must
import a sibling application tree to reach its subject is describing a boundary drawn in the wrong
place. Round 1 proved `demo/palettes/mix.ts` has only mix-workbench consumers by enumeration; this
adds that its **tests** live one directory above `src/`, not with the feature that owns the file.

Note also `demo/color-picker/composables/boot/view-accents` in that list — a `demo/color-picker/`
path co-existing with `demo/color-session/view-accent`, which is r3 L3-5's god-directory finding
showing up as *two* homes reachable from the same suite.

- **Mechanism:** the demo grew the library's missing capabilities; the tests followed the *capability*
  (library) while the files stayed with the *feature* (demo).
- **Reproduction:** the two commands above.
- **Cure:** it is already implied by r1 L-2 / r2 L2-3 / R4-1 — but this reframes the acceptance
  criterion. The transposition is **done** when `grep -rln 'from "../demo/' test/` returns only files
  that test genuine *view* concerns (`status-lamp`, `sliderAnnouncement`, `viewSchema`), and every
  color-math import in `test/` names `@mkbabb/value.js/*` or `@src`. That is a measurable, falsifiable
  gate for the wave, not a judgement call.

---

## §4 · R4-4 — MINOR · two residuals the prior cures leave standing

**(a) The `workbenches/mix → palettes/types` edge survives r1 L-2's move.** Relocating
`demo/palettes/mix.ts` → `demo/workbenches/mix/mix.ts` cures the *feature → sibling feature* reach
for `LeftoverStrategy`, but the module's other cross-tree import remains:

```ts
demo/palettes/mix.ts:15
import type { Palette, PaletteColor } from "./types";
```

After the move that becomes `workbenches/mix → palettes/types`. I judge this **legitimate and worth
stating explicitly**: `Palette`/`PaletteColor` are the application's data model, not palette-feature
internals, and a feature depending on the data model is a downward edge. But r3 L3-1's proposed
lint rule 3 (*"no workbench imports another workbench's internals"*) does not distinguish a feature's
*model* from its *internals*, and a naive glob would either forbid this edge or permit the one r1 L-2
found. The rule needs the model surface named — `demo/palettes/types.ts` allowed, `demo/palettes/**`
otherwise denied — or the model needs to move out of the feature (`demo/model/palette.ts`), which is
the cleaner form and costs one file move.

**(b) One file, two repairs for one defect shape.** `MixConfigBar` carries three vocabularies and the
prior rounds cure them by two different mechanisms: r1 L-7 fixes `STRATEGIES`/`strategyLabels`
locally (`:83-89`), while r2 L2-5 prescribes `satisfies Record<LibUnion, Meta>` for the space and hue
tables in `color-space-meta.ts`. Both are correct; applying them separately leaves the file with two
idioms for "an enumeration linked to its type". I verified the single idiom covers all three —
one declaration, exhaustiveness gated by the `Record`, enumeration derived:

```
$ tsc --strict --noEmit cure.ts     # LeftoverStrategy with a 4th member added
cure.ts(9,12): error TS1360: … Property 'truncate' is missing … in type 'Record<LeftoverStrategy, string>'.
tsc exit=2 (nonzero = the cure CATCHES the new member)
```

versus the current pair, where only one of the two declarations speaks:

```
$ tsc --strict --noEmit probe.ts    # the file's :83 and :85 verbatim, same 4th member
probe.ts(9,7): error TS2741: Property 'truncate' is missing … but required in type 'Record<LeftoverStrategy, string>'.
tsc exit=2                          # ONE diagnostic — the Record. The array at :83 is silent.
```

`LeftoverStrategy[]` never enforces exhaustiveness; `Record<LeftoverStrategy, …>` always does. The
same asymmetry is what r2 L2-5 found on the library-owned hue union. **One rule, applied three times
in this file, closes r1 L-7 and r2 L2-5 together** — and the idiom already exists in the tree at
`picker-color.ts:52,70` (`satisfies Record<SpaceId, …>`), as r3 noted.

---

## §5 · Rounds 1–3 — carried in full, round-4 status

No prior finding is retracted, downgraded, or contested. Where I re-derived one independently this
run, it is marked ✓.

| id | sev | round-4 status |
|---|---|---|
| r1 **L-1** | BLOCKER | carried. **R4-1 is dormant behind it** — no chip renders while `operandColors` is `[]`. Curing L-1 makes R4-1 visible. |
| r1 **L-2** | MAJOR | carried ✓ (re-enumerated: 3 consumers, all `workbenches/mix/` + 1 test). **Strengthened by R4-3**, residual named in R4-4a. |
| r1 **L-3** | MAJOR | carried ✓ (re-diffed the two select blocks: 33 vs 45 lines, identical skeleton; 4 names for 2 controls). **Completed by R4-1c** — the one differing behaviour is on the wrong side. |
| r1 **L-4** | MAJOR | carried ✓ (90 barrel imports vs 119 direct; **24 files use both**, incl. siblings `MixPane.vue:3,12`). |
| r1 **L-5** | MAJOR | carried. |
| r1 **L-6** | MAJOR | carried ✓ (glass-ui emits `SelectionValue = string \| number`, `_shared/selection.d.ts`; unexported — `grep -c` on `index.d.ts` → 0; reka's `AcceptableValue` is strictly wider — `reka-ui/dist/index3.d.ts:231`). |
| r1 **L-7** | MINOR | carried ✓ (`tsc` probe reproduced). **Merged with L2-5 in R4-4b.** |
| r1 **L-8** | MAJOR | carried, not re-run. |
| r1 **L-9** | INFO | carried. Refinement: the two `computed`s are **cross-coupled** (`spaceRamps` reads `hueMethod`, `hueRamps` reads `colorSpace`), so either axis invalidates the other's whole Map — but selection unmounts `SelectContent`, so the recompute is *deferred, not incurred*. **Not a live cost; recorded so it is not mistaken for one.** |
| r2 **L2-1** | BLOCKER | carried. |
| r2 **L2-2** | MAJOR | carried ✓ (`ls dist/` → no `index.d.ts`; `vite.config.ts:174-175` states the 7-key closure). |
| r2 **L2-3** | MAJOR | carried — **and its cure corrected by R4-1d.** Unifying the three samplers is necessary and not sufficient. |
| r2 **L2-4** | MAJOR | carried. |
| r2 **L2-5** | MAJOR | carried. **Merged with r1 L-7 in R4-4b.** |
| r2 **L2-6** | MINOR | carried ✓ (3 `<label class="section-label">`, all in this file; 7 `<span>` elsewhere; **0** carry `for`). |
| r2 **L2-7** | MINOR | carried — **extended by R4-2** from "tautological on count" to tautological on the algorithm, against the wrong referent. |
| r3 **L3-1** | MAJOR | carried. R4-2 and R4-3 are the same mechanism one layer out: the *tests* have the same blind spot the *lint* has — a guard aimed where the subject no longer is. |
| r3 **L3-2** | MAJOR | carried. |
| r3 **L3-3** | MAJOR | carried ✓. |
| r3 **L3-4** | MINOR | carried. |
| r3 **L3-5** | MINOR | carried ✓ — and visible from a new angle: `test/` imports **both** `demo/color-picker/composables/boot/view-accents` and `demo/color-session/view-accent` (R4-3). |
| r3 **L3-6** | MINOR | carried. |
| r3 **L3-7** | INFO | carried. **R4-1 supersedes its framing**: the primitive is not merely one granularity too fine, it is one *object* short — the library has no N→1 operation either. |
| r3 **L3-8** | MINOR | carried. |

---

## §6 · The greenfield lattice — four rounds folded

Round 3's four strata stand. Two edges change, both in the library layer, both from R4-1/R4-2.

```
  L4  demo/workbenches/mix/       MixPane · MixSourceSelector · MixConfigBar · MixResultDisplay
                                  mix-domain.ts   ← r1 L-2 (relocated out of demo/palettes/)
                                                    LeftoverStrategy + LEFTOVER_STRATEGY_LABELS
                                                    as const satisfies Record<…>  ← r1 L-7 + L2-5, ONE idiom (R4-4b)
      demo/workbenches/gradient/  GradientVisualizer — consumes L3's control, keeps no copy
      demo/palettes/              the palettes feature only; exports no mix math
      demo/model/palette.ts       Palette · PaletteColor — the data model, out of the feature (R4-4a)
        │  ⟦lint 3⟧ no workbench imports another workbench's internals; the MODEL is not internals
        │  MixConfigBar: 173 → ~60 lines. 3× defineModel + <InterpolationSelect> + the leftover row
        │  + the verb. No reka edge, no casts, no vocabulary, no ramp computation.
        ▼
  L3  demo/color/                 ← replaces demo/color-session/ (L3-5)
        InterpolationSelect.vue   ← r1 L-3 / L2-6 / L3-3 — ONE space+hue control, TWO consumers
              props { space, hue, preview: "ramp" | "result" }        ← R4-1c
              gradient asks for "ramp"  (its product IS the path)
              mix      asks for "result" (its product IS the point)
        spaces.ts · convert.ts · chips/ · ink/ · session/
        │  ⟦lint 2⟧ L3 never imports an L4 feature tree
        ▼
  L2  @mkbabb/glass-ui/{select,button,forms,typography,…}   demo/ui/ deleted   ← r1 L-4 / L3-8
        Select generic over its value; SelectionValue exported             ← r1 L-6
        FieldLabel ships the atom, not just the class                      ← L3-3
        │  ⟦lint 1⟧ zero demo edges to reka-ui
        ▼
  L1  @mkbabb/value.js/color
        mixColors(a, b, t)                  binary            (exists)
        mixSequence(colors, opts)           N → 1  THE OPERATION   ← r1 L-2 · R4-1
        sampleColorRamp(colors, opts)       N → k  THE PATH        ← L2-3 · L3-7 · R4-1
              endpoints converted ONCE · one joint contract · count means count (L2-7)
              ── and the two are RELATED by construction, not merely adjacent ──  ← R4-1d
        │  ⟦lint 1⟧ no demo module names src/ — the T.W1 keystone made structural
        │  ⟦gate⟧  `grep -rln 'from "../demo/' test/` names only VIEW concerns  ← R4-3
  ⟂   demo/shell/                 owns route ↔ overlay lifecycle, one writer   ← r1 L-8
```

**Round 3's six rules stand. Two gain a clause; one is new.**

- **Rule 5** (*the library's granularity is set by what consumers actually write*) gains: *…and by
  what they **claim**. Where one consumer previews another consumer's output, the two functions must
  be defined in terms of each other in the library, not merely shipped side by side.* **(R4-1)**
- **Rule 1** (*a prop that does not exist must not be silently accepted*) gains its test-side twin:
  **Rule 6 — an oracle must assert a property, never re-derive the implementation.** A test that
  restates the subject's own algorithm and compares is a tautology that passes forever. The receipt
  is `test/preview-chips.test.ts:38-49,66-76` — green, and blind to a 0.1358 OKLab divergence in the
  very claim it names. **(R4-2)**
- **Rule 0** (*every boundary has a live lint rule*) gains the same clause one layer out: **the test
  suite's imports are themselves a boundary declaration.** 53% of the library's suite importing the
  application is the ownership defect stating itself in executable form. **(R4-3)**

---

## §7 · Negative proof — checked this round, genuinely sound

Recorded so the absences are evidence, including one probe of my own that I ran and **discarded**.

1. **The public surface is clean in the code.** `MixConfigBar.vue:12` → `@mkbabb/value.js/color`, a
   real `exports` key; `HueInterpolationMethod` is exported at `src/subpaths/color.ts:8`. Re-verified
   independently that no demo module reaches an unpublished specifier: the only non-subpath match in
   the whole tree is prose in `demo/shared/utils.ts:12`. A real npm consumer could write line 12
   verbatim. (The *config* around it is r2 L2-2's defect, not the code's.)
2. **`verbatimModuleSyntax` honoured.** Lines 12, 13, 14, 15 all `import type`; lines 18, 23 are
   genuine value imports. Edict 8 satisfied.
3. **Not a god module.** 173 lines, one job, no local state, no timers, no fetches, one `computed`
   pair. Every defect found across four rounds is a *boundary* defect; the god-module finding in this
   neighbourhood is a directory (r3 L3-5), not this file.
4. **Vue 3.5 idiom is correct where it is used.** Reactive props destructure with a default
   (`operandColors = []`, `:25-45`), typed `defineEmits` (`:76-81`), lazy `computed` over props. No
   `defineModel` stale-read hazard — no local mirror exists. (r3 L3-6's divergence claim is about
   *which* idiom, not correctness, and I do not contest it.)
5. **The lazy-sampling claim at `:19-22` is true.** Both `computed`s are read only inside
   `SelectContent`, which reka unmounts when closed; nothing samples at rest. I verified this rather
   than assuming it — and the cross-coupling I found (r1 L-9 row, §5) is likewise deferred by the
   same laziness, so I decline to report it as a cost.
6. **Visual audit: nothing attributable to this component.** `REPORT.json` `/#/mix`, all four Safari
   matrices — `pageErrors 0 · consoleErrors 0 · overflowX 0 · main 1`, `hasDarkClass` correct per
   matrix. The 8 `smallTapTargets` are the dock slug controls (22×22) and the picker channel rails
   (12×24); the 1 `namelessButton` is outside `<main>`. This component's own targets are `h-9` (36 px)
   and `h-10` (40 px), both named. The `shots/safari-desktop-light/mix.png` capture renders the bar
   correctly: COLOR SPACE + HUE METHOD side by side, the size-mismatch row correctly hidden in colors
   mode, the CTA full-width and disabled (consistent with r1 L-1 — there is no way to select
   operands).
7. **A probe of mine that produced a false positive, discarded.** I checked all 65 symbols the 19
   `demo/ui/` barrels re-export against `@mkbabb/glass-ui/dist/index.d.ts` and got 64 "missing".
   That is an artefact: `index.d.ts` is a 42-line star-re-export hub
   (`export * from "./components/select"` …), so no symbol name appears in it literally. **There is
   no dead-export defect in the barrels** — r3 L3-8's finding (2 barrels with zero *consumers*)
   is the real one and stands; mine was measurement error and is recorded here rather than reported.

---

## §8 · Verdict

**DEFECTIVE** — cumulative across four rounds: **2 BLOCKER · 15 MAJOR · 8 MINOR · 2 INFO.**

**Strongest defect this round: R4-1.** The Space and Hue dropdowns in this component preview
`sampleInterpolationRamp` — a piecewise path through the operands. The button beneath them computes
`mixColorSequence` — a weighted centroid. These are different mathematical objects. They coincide at
N=2 (0.0000) and separate at N≥3 (**0.1358** OKLab at three operands, ≈7× a JND; **0.0534** at four),
with the produced color at N=3 sitting at chroma 0.014 while every previewed stop sits between 0.25
and 0.31. The component's own doc calls the operands *"the preview ramps' truth inputs"* and the
sampler's header declares that approximating the library output is *forbidden* — but the chip is not
approximating the output, it is showing a different function. And the assignment is backwards at the
feature level: the workbench whose product **is** a ramp renders no chips, while the workbench whose
product is a single color renders ramps.

This corrects a cure that rounds 2 and 3 both carried. Both proposed one library `sampleColorRamp`
with `mixColorSequence` *"promoted alongside"* — and promoting them alongside, as two independent
functions, leaves the mix chip previewing a function the mix button does not compute. The library
needs both objects and needs them **defined in terms of each other**: the path and the point, with
each feature previewing the one it calls.

**R4-2** explains why four rounds of green gates never surfaced it: the O-14 oracle re-implements the
sampler's own segment loop and asserts equality with it — *"equality is by construction and this
oracle guards the construction"*, in its own words — and never once names `mixColorSequence`
(`grep -c` → 0). Seven tests pass, in one run, over both functions, comparing neither to the other.

**R4-3** supplies the ownership proof from a direction no round used: 10 of the library's 19 vitest
files, 53%, import from `demo/`, covering 18 demo modules — including both of this component's math
dependencies. The suite already treats this code as library code. Only the file paths disagree, and
that gives the transposition a falsifiable acceptance gate instead of a judgement call.

Rounds 1–3 closed on *"there is more than one home for one concept"*, and round 3 added *"the rule
that said there must be only one no longer matches any file."* Round 4 adds the third layer: **where
one concept did get a single home, the guard built to protect it was pointed at its own reflection.**

---

*Seat: CHALLENGE-L (library structure), round 4. Rounds 1–3 preserved verbatim at
`challenge-L-library-round-{1,2,3}.md`. No source edits land from this formation. All probe,
benchmark and `tsc` scripts were written to the session scratchpad, never to the repository.*
