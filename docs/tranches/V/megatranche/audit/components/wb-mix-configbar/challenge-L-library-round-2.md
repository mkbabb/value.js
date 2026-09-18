# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M context) — the tier this
seat was explicitly spawned with. The declaration is honoured, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines), area `demo/workbenches`.
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface.
- Write scope honoured: only files under `…/components/wb-mix-configbar/`. **No source edited.**

---

## §00 · Provenance — this is ROUND 2; round 1 is preserved, nothing lost

A prior CHALLENGE-L seat (also Opus 5) audited this component on 2026-07-27 19:21. Its report is
preserved **verbatim and complete** at:

> `docs/tranches/V/megatranche/audit/components/wb-mix-configbar/challenge-L-library-round-1.md`

Round 1's finding set — **L-1** (`tag="button"` on `WatercolorDot` renders the mix add-affordance
pointer-dead, so `operandColors` is permanently `[]` and the whole T-17 preview apparatus is dead
code), **L-2** (`palettes/mix` homed in a sibling feature tree; `mixColorSequence` is library math),
**L-3** (GradientVisualizer is a diverged second copy), **L-4** (`demo/ui/` 19 alias barrels, 90-vs-119
dual path), **L-5** (three-hop re-export chain), **L-6** (`reka-ui`'s `AcceptableValue` used where
glass-ui emits `SelectionValue`, which glass-ui does not publish), **L-7** (`STRATEGIES`
non-exhaustive), **L-8** (unowned portal teardown across route change bricks the page), **L-9**
(208 `mixColors`/re-eval once L-1 is cured) — **stands in full**. I independently re-verified five of
those nine this run (§8) and found no contradiction.

**This round adds seven findings round 1 did not carry, one of which is a BLOCKER and one of which
corrects a claim in round 1's own negative proof.** Round-2 findings are numbered `L2-n` so the two
records never collide.

| new | severity | one line |
|---|---|---|
| **L2-1** | **BLOCKER** | `variant="primary-audacious"` is not a glass-ui 7.0.0 `Button` prop — it lands as a raw DOM attribute; the CTA renders `data-emphasis="secondary"`; **51 of 55** Button sites carry the dead prop |
| **L2-2** | MAJOR | `tsconfig.demo.json#paths` ≠ `package.json#exports` — 3 phantom keys typecheck green and are runtime-fatal. **Corrects round 1 §11's negative proof.** |
| **L2-3** | MAJOR | **Three** hand-rolled chain samplers with three divergent off-by-one conventions (round 1 named one) |
| **L2-4** | MAJOR | `PickerSpace = SpaceId` (17 members) but the dropdown renders 9 — the prop admits 8 unrenderable states |
| **L2-5** | MAJOR | `HUE_INTERPOLATION_METHODS` is non-exhaustive over a **library-owned** union — a 5th method shipped by value.js is silently unreachable |
| **L2-6** | MINOR | Two dangling `<label>` elements (`label.control === null`); the twin uses `<span>` |
| **L2-7** | MINOR | `RAMP_SAMPLE_COUNT = 16` yields 17–22 stops; the vitest oracle re-derives the same formula, so it is tautological on count |

**Verdict: DEFECTIVE.** Combined: **2 BLOCKER, 9 MAJOR, 3 MINOR, 1 INFO.**
Strongest defect this round: **L2-1**, which makes round 1's L-1 a *family*, not an incident.

---

## §0 · The import lattice, re-traced

| # | line | specifier | home | round-2 verdict |
|---|---|---|---|---|
| 1 | 2 | `vue` | peer | SOUND |
| 2 | 3–9 | `../../ui/select` | 1-line alias → `@mkbabb/glass-ui` root barrel | r1 **L-4** |
| 3 | 10 | `../../ui/button` | 1-line alias → `@mkbabb/glass-ui` root barrel | r1 **L-4** |
| 4 | 11 | `@lucide/vue` (`Blend`) | devDep `^1.16.0` | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` (`type HueInterpolationMethod`) | **published subpath** | SOUND at the code level — **but see L2-2 for the config-level hole** |
| 6 | 13 | `../../color-session/picker-color` (`type PickerSpace`) | demo alias of library `SpaceId` | **L2-4** |
| 7 | 14 | `../../palettes/mix` (`type LeftoverStrategy`) | sibling FEATURE tree | r1 **L-2** |
| 8 | 15 | `reka-ui` (`type AcceptableValue`) | glass-ui's own primitive lib | r1 **L-6** |
| 9 | 18 | `../../color-session/color-space-meta` | canonical vocabulary home | SOUND here; r1 **L-5** at the twin; **L2-5** on its shape |
| 10 | 23 | `../../color-session/color-chips` | single-consumer module, 2 trees away | r1 **L-3** context |

Re-verified this run — **no demo module reaches into `src/`**:

```
$ grep -rn '@src\|\.\./src/\|/src/' demo --include='*.vue' --include='*.ts' | grep -v assets/docs
demo/platform/transport/api-problem.ts:6:    * `web/src/lib/api-problem.ts`). Same shape, ...
demo/platform/transport/client.ts:18:        * own copy at `web/src/lib/api-problem.ts`; ...
demo/palettes/types.ts:20:                    * emits NO `id` (see `api/src/format/palette.ts` ...
demo/palettes/api/palettes.ts:167:           * API's `paletteETag()` (`api/src/middleware/etag.ts` ...
```

All four are prose in comments naming *other* repositories. Zero source-internal reaches. Round 1's
finding on this point is confirmed.

---

## §1 · L2-1 — **BLOCKER** · the page's ONE verb passes a prop glass-ui 7.0.0 does not have; it renders at the default secondary register

`MixConfigBar.vue:158-170` — the component's only command, carrying a four-line rationale:

```vue
<!-- The page's ONE verb — the producer's deliberate-primary register
     (S.W5-6 · L6 rider: consumed at the root vocabulary, never a
     per-instance costume; `default` is the quiet glass capsule and
     read disabled-forever over the wash tier). -->
<Button
    variant="primary-audacious"
    :disabled="!canMix"
    class="h-10 gap-2 font-medium font-display"
    @click="emit('mix')"
>
```

glass-ui 7.0.0's Button declares **no `variant` prop**
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-19`):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // Visual priority. It does not change the command's semantics.
    tone?: Tone;                 // Semantic intent, orthogonal to emphasis.
    size?: ButtonSize;
    iconOnly?: boolean; loading?: boolean;
    type?: ButtonHTMLAttributes["type"]; disabled?: …; class?: …;
}
```

The 7.0.0 API is the orthogonal **`emphasis` × `tone`** pair. The single `variant` axis is gone.

### Reproduction — live DOM, headless Chromium against the dev server at `:9000`

```
$ node <scratchpad>/probe-mix.mjs      # goto /#/mix, locate the <button> in <main> whose text is "Mix"
{
 "mixButton": {
  "attrs": [ "data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"",
             "data-size=\"md\"", "data-press-armed=\"\"", "type=\"button\"", "disabled=\"\"",
             "class=\"button tap-squish focus-ring glass-wash glass-capsule h-10 gap-2 font-medium font-display\"",
             "variant=\"primary-audacious\"",
             "style=\"--glass-btn-press-t: 0.0000; --flex-vel: 0.0000;\"" ],
  "bg": "oklab(0.915626 0.00551148 0.0130686 / 0.52)",
  "bgImage": "none",
  "rect": { "w": 462, "h": 40 },
  "disabled": true
 }
}
```

Two facts, both decisive:

1. `variant="primary-audacious"` appears **after `class`, outside glass-ui's `data-*` contract** — it
   is a Vue fallthrough attribute stamped onto the raw `<button>`, not a consumed prop.
2. The button's actual register is `data-emphasis="secondary"` + `glass-wash glass-capsule` — glass-ui's
   default. Not primary. Not audacious. The comment at `:158-161` describes an intent the runtime
   never receives.

The screenshot corroborates: `audit/visual/shots/safari-desktop-light/mix.png` shows the Mix CTA as a
full-width, near-invisible wash capsule (round 1 §11 read the same pixels and correctly attributed
the *disabled* half to its L-1; the **register** half is this finding, and it survives L-1's cure).

### Blast radius — repo-wide, and it is the same mechanism as round 1's L-1

Census of every `<Button …>` tag in `demo/**/*.vue`:

```
$ python3 — regex over every `<Button …>` open tag, bucketed by variant=/emphasis=
  28  variant="outline"
  19  variant="ghost"
   2  EMPHASIS:text            ← the ONLY 2 sites speaking the real 7.0.0 API
   2  (no emphasis/variant)
   2  variant="primary-audacious"  → demo/workbenches/mix/MixConfigBar.vue:162
                                     demo/workbenches/generate/GenerateControls.vue:157
   1  variant="destructive"
   1  variant="default"
```

**51 of 55 Button call sites pass a prop the component does not read.**

Scoping note that makes the cure precise: `variant` *is* real elsewhere in glass-ui —
`SelectTrigger.vue.d.ts:6` declares `variant?: "default" | "ghost"`, which is why
`ColorSpaceSelector.vue:44` is correct. This is a **Button-specific** API break, not a blanket one.

### Why every gate is green

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
(exit 0 — zero diagnostics)

$ npx eslint demo/workbenches/mix/MixConfigBar.vue demo/color-session/color-chips/sample.ts
(no output — clean)
```

Vue treats unknown attributes on a component as fallthrough attrs; `vue-tsc` never errors on one.
The visual audit cannot see it either — a *disabled* wash capsule and a *primary* wash capsule are
indistinguishable at rest, and `/#/mix` boots with `canMix === false`.

### Mechanism — the family diagnosis

W44/D58 adopted glass-ui 7.0.0 "WHOLE": `package.json dependencies["@mkbabb/glass-ui"] = "^7.0.0"`,
installed 7.0.0 confirmed. The **version** landed; the **consumer prop surface** did not. Round 1's
L-1 (`tag="button"` on `WatercolorDot`, 7 sites + ~14 `tag="div"`) and this finding (`variant` on
`Button`, 51 sites) are **the same defect mechanism at two different primitives**: a producer prop
renamed or removed at a major, silently absorbed by Vue's fallthrough-attr rule, invisible to
typecheck, lint, unit tests and pixel diffing alike.

That reframes the disposition. Round 1 cured its instance ("wrap, do not polymorph"). The family
needs a **structural** cure, or the next glass-ui major repeats it:

**Cure — three moves, in order.**

1. **Audit the whole consumer surface against the 7.0.0 `.d.ts` set**, not just Button and
   WatercolorDot. Every `<GlassComponent prop=…>` in `demo/` where `prop ∉ Props` is a dead prop.
   This is mechanisable in an afternoon from the published declaration files.
2. **Migrate at the root** (edict 2 — no `variant`→`emphasis` adapter, no shim). Here:
   `<Button emphasis="primary" …>`. Across the fleet: `outline`→`emphasis="secondary"`,
   `ghost`→`emphasis="quiet"`, `destructive`→`tone="danger"`. `primary-audacious` is not a 7.0.0
   value — **relay it to the glass-ui BH inbox** (standing fond): if "audacious" is a real design
   rung it is a producer `emphasis`/`tone` member; if not, it dies and the CTA takes
   `emphasis="primary"`.
3. **Close the hole so it cannot recur.** Unknown-attribute passthrough on *in-house design-system
   primitives* is the mechanism. Fix it in glass-ui with `inheritAttrs: false` + an explicit attrs
   allowlist on the primitives (relay), or in the demo with an eslint rule seeded from the producer
   `.d.ts` that makes an undeclared prop on a `@mkbabb/glass-ui` component an error. Without one of
   these, the six-gates-green-over-a-dead-prop pattern is permanent.

---

## §2 · L2-2 — MAJOR · `tsconfig.demo.json#paths` ≠ `package.json#exports` — the dogfood keystone's guardrail is FALSE

**This corrects round 1 §11**, which recorded as negative proof:

> *"The demo resolves it through an alias set **generated from `package.json#exports`** at
> `vite.config.ts:37–50`, so it cannot drift from the published map."*

That statement is true **of vite** and false **of the typecheck**. The two do not resolve the same
surface.

`tsconfig.demo.json` claims otherwise, in its own comment:

> *"the value.js published surface: the bare `.` root + the 7 subpath barrels … there is no `.../*`
> wildcard because the `exports` map is a **CLOSED 8-key set**. Mirrors the `vite.config.ts` runtime
> self-alias **generated from the same map**."*

Measured against the real node resolver in this checkout:

```
$ node --input-type=module -e "
  const specs=['@mkbabb/value.js','@mkbabb/value.js/color','@mkbabb/value.js/css',
               '@mkbabb/value.js/parsing','@mkbabb/value.js/units'];
  for (const s of specs){ try { console.log('OK  ', s, '->', await import.meta.resolve(s)) }
                          catch(e){ console.log('FAIL', s, '->', e.code) } }"

FAIL @mkbabb/value.js          -> ERR_PACKAGE_PATH_NOT_EXPORTED
OK   @mkbabb/value.js/color    -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/color.js
OK   @mkbabb/value.js/css      -> file:///Users/mkbabb/Programming/value.js/dist/subpaths/css.js
FAIL @mkbabb/value.js/parsing  -> ERR_PACKAGE_PATH_NOT_EXPORTED
FAIL @mkbabb/value.js/units    -> ERR_PACKAGE_PATH_NOT_EXPORTED
```

| set | members |
|---|---|
| `package.json#exports` — **7** | `./color ./css ./easing ./math ./quantize ./transform ./value` |
| `tsconfig.demo.json#paths` — **8** | `. /color /easing /math /parsing /quantize /transform /units` |
| **phantom** (typecheck-green, runtime-fatal) | **`.` · `/parsing` · `/units`** |
| **real but unmapped** | **`/css` · `/value`** |

Vite's alias set genuinely is generated (`vite.config.ts:41-50`,
`Object.entries(VALUE_JS_PKG.exports).map(…)`), so runtime resolves the 7 real keys and only those.
The tsconfig is **hand-written** and has drifted 5 keys wide of the map it claims to mirror; the
"CLOSED 8-key set" it names does not exist.

**Why this is exactly the defect the challenge brief names.** A demo import that a real consumer
could not write — `from "@mkbabb/value.js"`, or `/parsing`, or `/units` — **typechecks green** and
dies only at bundle time. The map is a *false proof of the public API*. And the converse proves the
map is not the authority it claims: `/css` — used at 10 demo sites including
`demo/color-session/picker-color.ts:28`, **a direct dependency of this component** — has no `paths`
entry at all and resolves purely by node exports fallback.

```
$ grep -rhoE '"@mkbabb/value\.js(/[a-z]+)?"' demo | sort | uniq -c | sort -rn
  25 "@mkbabb/value.js/color"
  10 "@mkbabb/value.js/css"
   6 "@mkbabb/value.js/math"
   5 "@mkbabb/value.js/easing"
   4 "@mkbabb/value.js/quantize"
```

*Currently latent* — no demo file imports a phantom key today, which is why nothing is red. The
guardrail is nonetheless load-bearing for the T.W1 keystone and it does not hold.

**Cure — KISS, and it is the move that makes the demo a genuine consumer: delete the value.js
`paths` block entirely.** `moduleResolution: bundler` honours `exports`; node already resolves the
self-package through the `node_modules` self-link (proved above). One authority —
`package.json#exports` — for typecheck, vite, vitest, and any external consumer alike. If a `paths`
entry must survive for editor ergonomics, **generate** `tsconfig.paths.json` from `exports` in a
prebuild step exactly as `valueJsSelfAlias` does, so drift becomes structurally impossible instead
of comment-asserted.

---

## §3 · L2-3 — MAJOR · **three** hand-rolled chain samplers, three divergent conventions

Round 1's L-2 correctly identified that `mixColorSequence` and `sample.ts` are library math trapped
in the demo. The count is higher and the divergence is measurable. `mixColors` is the library's only
interpolation entry and it is **binary**; every real consumer needs *N colors → k stops*:

| # | site | the loop | joint convention |
|---|---|---|---|
| 1 | `demo/color-session/color-chips/sample.ts:68-85` (this component's) | `perSegment = max(2, ceil(k/segments)+1)`; `for (j = i===0 ? 0 : 1; j < perSegment; j++)` | drop the inclusive start on segments ≥ 1 |
| 2 | `demo/workbenches/gradient/composables/useGradientCSS.ts:180-214` | `stepsPerInterval = max(2, round(RES/(n-1)))`; `for (j = 0; j <= (i < n-2 ? stepsPerInterval-1 : stepsPerInterval); j++)` | a ternary on the loop **bound** |
| 3 | `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:100-107` | `Array.from({length: RAMP_STOPS}, (_, i) => i/(RAMP_STOPS-1))` | binary only, no joints |

Three answers to one piece of arithmetic, in one application, **two of them inside this component's
own feature tree** (`mix/`), and they disagree about the error channel too: site 1 `return null`,
sites 2 and 3 `throw`.

The demo is the library's dogfood. Three copies of the same loop is the library telling you its
public surface sits one granularity below what every consumer actually writes.

**Cure — transposition into `src/color/operations.ts`, out through `src/subpaths/color.ts`:**

```ts
export function sampleColorRamp(
    colors: readonly AnyColor[],
    options: { space: SpaceId; hue: HueInterpolationMethod; count: number },
): Result<AnyColor[], ColorIssue>;
```

One inclusive-chain contract, one joint-dedupe rule, one `count` that means `count` (L2-7), one
`Result` error channel. Then site 1 collapses to serialization, site 2 becomes easing+position
decoration over it, site 3 becomes an sRGB projection over it — and the operation moves under
`test/` where it can be property-tested, instead of under `demo/` where it cannot. This composes
with round 1's L-2 cure (`mixColorSequence` promoted alongside).

---

## §4 · L2-4 — MAJOR · `PickerSpace` is a bare rename of `SpaceId`; the prop admits 8 states the component cannot render

`demo/color-session/picker-color.ts:35`

```ts
export type PickerSpace = SpaceId;
```

A pure alias with no narrowing — a rename that carries zero information (edict 2). But the rendered
vocabulary *is* narrower than the type, and nothing in the type system says so:

- `SpaceId` (`dist/subpaths/color.d.ts:103`) — **17** members.
- `INTERPOLATION_SPACES` (`color-space-meta.ts:26-36`) — **9** rows.
- Admitted but unrenderable (**8**): `kelvin`, `srgb-linear`, `display-p3`, `a98-rgb`,
  `prophoto-rgb`, `rec2020`, `ictcp`, `jzazbz`.

`MixConfigBar.vue:33` types the prop `colorSpace: PickerSpace`, so the component's own contract
promises to render 8 states for which it emits no `SelectItem`. The same 17-wide type flows onward
through `useMixingState.ts:44`, `MixAnimationCanvas`, `MixResultDisplay` and `mixStage.ts` — every
one of them nominally accepting spaces the UI has no vocabulary for.

*Reproduction: **NONE — labelled HYPOTHESIS** for the runtime symptom.* No live path sets an unlisted
space (`useMixingState.ts:44` seeds `"oklab"`; only this component writes it), so a blank
`SelectValue` is unproven. The **type-modeling defect is CONFIRMED** by the 17-vs-9 count.

**Cure.** Make the type the vocabulary's shadow rather than the library union's rename:

```ts
export type InterpolationSpace = (typeof INTERPOLATION_SPACES)[number]["value"];
```

typed on the prop, the emit, and `useMixingState`'s ref. The 8 unrenderable states become
*unrepresentable*. `PickerSpace` retires in favour of the library's own `SpaceId` wherever the full
17 genuinely apply (the picker's space catalog), which also removes a demo type that exists only to
have a demo name.

---

## §5 · L2-5 — MAJOR · the hue vocabulary is non-exhaustive over a **library-owned** union

Round 1's L-7 caught `STRATEGIES` (`MixConfigBar.vue:83`) as a non-exhaustive restatement of a
**demo-owned** union. The same shape exists one level up over a **library-owned** union, and there
it is the more dangerous of the two:

`demo/color-session/color-space-meta.ts:38`

```ts
export const HUE_INTERPOLATION_METHODS: HueInterpolationMeta[] = [
    { value: "shorter", … }, { value: "longer", … },
    { value: "increasing", … }, { value: "decreasing", … },
];
```

`HueInterpolationMethod` is exported by `@mkbabb/value.js/color` — the demo does not own it. Typing
the vocabulary as a plain array means value.js can ship a fifth arc and the demo compiles green while
**both** the Mix and Gradient hue dropdowns silently omit it. There is no compile-time link between
the library's union and the demo's enumeration of it, in either direction.

Note the direction matters and the two cures differ:

- **Library-owned union** (`HueInterpolationMethod`): the *type* is the source, so exhaustiveness
  must run type → vocabulary — `Record<HueInterpolationMethod, {label; description}>` plus
  `Object.entries`. A new library member then fails the build until the demo names it.
- **Demo-owned union** (`LeftoverStrategy`, round 1 L-7): the *vocabulary* is the source, so derive
  the type from it — `as const` array + `(typeof X)[number]["value"]`.

Applying only one shape to both, in either direction, leaves one of them unpoliced. Today neither is
policed: `INTERPOLATION_SPACES` has the same plain-array shape as `HUE_INTERPOLATION_METHODS`, and
its members are `SpaceId`s — the library's, not the demo's (see L2-4, which is the same seam viewed
from the type side).

---

## §6 · L2-6 — MINOR · two dangling `<label>` elements; the twin uses `<span>`

`MixConfigBar.vue:98`, `:121`, `:145` caption each control with `<label class="section-label">`, and
none carries a `for`:

```
$ grep -n "for=" demo/workbenches/mix/MixConfigBar.vue
(no matches)
```

Measured live on `/#/mix` (the third label is behind `v-if="showLeftoverStrategy"`, absent in colors
mode):

```json
"labels": [ { "text": "Color space", "hasFor": false, "wrapsControl": false, "ctrl": null },
            { "text": "Hue method",  "hasFor": false, "wrapsControl": false, "ctrl": null } ]
```

`label.control === null` for both — these `<label>`s label nothing. They are captions wearing form
semantics. The accessible name is carried separately by `aria-label` on each trigger (`:100`, `:123`,
`:147`), so the element choice buys no association and risks a doubled announcement.

The diverged twin answers the same question differently: `GradientVisualizer.vue:180`, `:195` use
`<span class="section-label">` for the identical caption. Two answers, one question — which is round
1's L-3 showing up in the DOM semantics as well as the feature set.

**Cure** (fold into round 1 L-3's shared-component extraction): pick one and apply at both —
`<span class="section-label" :id>` + `aria-labelledby` on the trigger, retiring the duplicated
`aria-label`; or plain `<span>` keeping the existing `aria-label`.

`.section-label` itself is correctly glass-ui-owned — `dist/styles/typography/utilities.css`,
`@layer components { .section-label { @apply text-mono-caption; color: var(--muted-foreground) } }`.
That part is sound; only the element is wrong.

---

## §7 · L2-7 — MINOR · `RAMP_SAMPLE_COUNT = 16` never yields 16, and the oracle cannot notice

`sample.ts:35-36` — *"k — the F6 sample count (≈16): smooth to the eye, sub-ms to compute."*
`sample.ts:50` — *"the k samples distribute across the chain."*

Computed from the exact loop at `sample.ts:68-85`:

```
$ node -e "const k=16; for(let n=2;n<=8;n++){ const segments=n-1;
    const perSegment=Math.max(2,Math.ceil(k/segments)+1); let stops=0;
    for(let i=0;i<segments;i++) for(let j=(i===0?0:1);j<perSegment;j++) stops++;
    console.log('operands='+n,'perSegment='+perSegment,'TOTAL stops='+stops); }"

operands=2 perSegment=17 TOTAL stops=17
operands=3 perSegment=9  TOTAL stops=17
operands=4 perSegment=7  TOTAL stops=19
operands=5 perSegment=5  TOTAL stops=17
operands=6 perSegment=5  TOTAL stops=21
operands=7 perSegment=4  TOTAL stops=19
operands=8 perSegment=4  TOTAL stops=22
```

The count is `k+1` at best and drifts to `k+6`. The samples do not "distribute across the chain" —
each segment gets a full `perSegment` and the chain grows with operand count.

**The oracle is tautological on this axis.** `test/preview-chips.test.ts:60,68` re-derives the
identical expression to build its expectation:

```ts
const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 1) + 1);   // :60
const perSegment = Math.max(2, Math.ceil(RAMP_SAMPLE_COUNT / 2) + 1);   // :68
expect(stops).toHaveLength(perSegment * 2 - 1);
```

It correctly proves *sampler ≡ library* on the **values** — that leg is real and good — but it can
never catch count drift, because it computes the count the same way the code does.

Harmless today (a chip is 2.618rem wide). It stops being harmless the moment the sampler is shared
(L2-3), where `count` becomes a contract other consumers size buffers against. Dies with L2-3.

---

## §8 · Round-1 findings — carried, with re-verification status

| id | severity | round-1 finding | round 2 |
|---|---|---|---|
| L-1 | BLOCKER | `tag="button"` on `WatercolorDot` ⇒ add-affordance pointer-dead ⇒ `operandColors` permanently `[]` ⇒ the whole T-17 chip apparatus is dead code | **carried.** Not re-run (round 1's Playwright + e2e evidence is complete). **Re-classified as a family with L2-1** — same mechanism, different primitive; see §1 cure move 1 |
| L-2 | MAJOR | `demo/palettes/mix` is the mix workbench's domain module homed in a sibling feature tree; `mixColorSequence` is library math | **carried + re-verified.** `grep -rn 'palettes/mix"' demo` → 2 consumers, both in `workbenches/mix/`, zero in `demo/palettes/`. **Extended by L2-3** (the sampler count is 3, not 1) |
| L-3 | MAJOR | `GradientVisualizer.vue` is a diverged second copy of this component's Select pair | **carried + re-verified.** `MixConfigBar.vue:94-140` vs `GradientVisualizer.vue:178-211`; `color-chips/index.ts:16-19` names the never-drained Lane G queue; `grep -rn color-chips demo` → 3 consumers, gradient absent. **Extended by L2-6** (the copies also diverge on `<label>` vs `<span>`) |
| L-4 | MAJOR | `demo/ui/` is 19 alias barrels; 90-vs-119 dual path to glass-ui | **carried + re-verified.** `wc -l demo/ui/*/index.ts` → 19 files, 29 lines (alert carries a 9-line comment; the rest are 1-liners). One detail to add: `demo/ui/input/index.ts` is the sole barrel pointing at a producer **subpath** (`@mkbabb/glass-ui/forms`) while the other 18 pull the root barrel — so the layer also flattens glass-ui's **70-key** entry lattice, making the producer's own module boundaries invisible from the consumer side |
| L-5 | MAJOR | Three-hop re-export chain kept alive to preserve import paths | **carried + re-verified.** `useGradientInterpolation.ts:13-17` (*"so the gradient tree's own consumers … keep their import path"*) → `useGradientModel.ts:19-21` (*"── Re-exports (preserve public API surface) ──"*) → `GradientVisualizer.vue:19-21`. Self-declared back-compat aliasing, edict 2 |
| L-6 | MAJOR | `reka-ui`'s `AcceptableValue` used where glass-ui emits `SelectionValue`; glass-ui publishes neither | **carried + re-verified.** `Select.vue.d.ts:13-16` emits `SelectionValue`; `_shared/selection.d.ts:2` = `string \| number`; `reka-ui/dist/index3.d.ts:231` = `string \| number \| bigint \| Record<string,any> \| null` — strictly wider. `grep -n SelectionValue dist/index.d.ts` → no matches; `components/select/index.d.ts` exports 8 components + 9 prop/emit types, **not** the value type. Producer gap confirmed; BH relay stands |
| L-7 | MINOR | `STRATEGIES` non-exhaustive vs `strategyLabels` exhaustive, 6 lines apart | **carried. Extended by L2-5** — the same shape over a *library-owned* union needs the opposite cure direction |
| L-8 | MAJOR | Unowned portal teardown across route change: `body { pointer-events: none }` survives, bricking the next route | **carried.** Not re-run this round (round 1's `elementFromPoint` reproduction is decisive). Shell-level `router.beforeEach` cure stands |
| L-9 | INFO | ~208 `mixColors` per re-eval of the two ramp maps, dormant only because L-1 keeps the feature dead | **carried.** Composes with L2-3: memoise inside `sampleColorRamp`, re-sample only the candidate axis per row |

---

## §9 · The greenfield lattice — both rounds folded

Four strata, edges only ever downward, one home per concept.

```
  L4  demo/workbenches/mix/       MixPane · MixSourceSelector · MixConfigBar · MixResultDisplay
                                  mix.ts              ← r1 L-2 (relocated from demo/palettes/)
      demo/workbenches/gradient/  GradientVisualizer  (consumes L3's control — no second copy)
      demo/palettes/              the palettes feature only; exports no mix math
        │  MixConfigBar shrinks 173 → ~60 lines: <InterpolationSelects> + leftover row + the verb
        ▼
  L3  demo/color-session/         InterpolationSelects.vue   ← r1 L-3 / L2-6
                                  color-space-meta.ts   ← the ONE vocabulary, exhaustive (L2-5)
                                  color-chips/          ← the ONE chip grammar
                                  picker-color.ts       ← narrowed; PickerSpace retired (L2-4)
        │  no L3 module imports an L4 feature tree; L4 features never import each other
        ▼
  L2  @mkbabb/glass-ui/{select,button,card,forms,…}
                                  imported by ONE specifier per primitive, at its OWN subpath
                                  (r1 L-4; demo/ui/ deleted) · SelectionValue exported (r1 L-6)
                                  primitives declare inheritAttrs:false (L2-1 move 3)
        │  reka-ui is glass-ui's private business — zero demo edges to it
        ▼
  L1  @mkbabb/value.js/color      mixColors · mixColorSequence · sampleColorRamp   ← r1 L-2 / L2-3
                                  resolved ONLY through package.json#exports        ← L2-2

  ⟂   demo/shell/                 owns route ↔ overlay lifecycle (one writer)       ← r1 L-8
```

Five rules that make the sixteen findings *unrepresentable* rather than merely fixed:

1. **A design-system prop that does not exist must not be silently accepted.** `inheritAttrs: false`
   on glass-ui primitives, or a demo lint rule seeded from the producer `.d.ts`. This is the single
   highest-leverage move in the audit: it kills both BLOCKERs' *mechanism*, not just their instances
   (L2-1, r1 L-1).
2. **One resolution authority per boundary.** `package.json#exports` for value.js — generated, never
   hand-mirrored (L2-2). glass-ui's own subpath entries for the design system, with no demo alias
   layer between and no reach past it into reka (r1 L-4, r1 L-6).
3. **A vocabulary and its renderer live together, once.** `color-space-meta.ts` + `color-chips/` +
   `InterpolationSelects.vue` in one directory, consumed by two features that therefore cannot
   diverge (r1 L-3, r1 L-5, L2-6).
4. **Enumerations and types are linked by construction, in the direction the ownership runs.**
   `Record<LibUnion, Meta>` for library-owned unions; `as const` + `[number]["value"]` for
   demo-owned ones (L2-4, L2-5, r1 L-7).
5. **The library's granularity is set by what consumers actually write.** Three copies of a chain
   sampler is the specification for `sampleColorRamp` (L2-3, r1 L-2, r1 L-9, L2-7).

---

## §10 · Negative proof — what I checked this round and found genuinely sound

Recorded so the absences are evidence, not silence. One item corrects round 1 (see L2-2).

1. **The value.js import in this file is one a real consumer could write.** `MixConfigBar.vue:12`
   imports `type HueInterpolationMethod` from `@mkbabb/value.js/color` — a real `exports` key that
   resolves under the real node resolver (`OK @mkbabb/value.js/color → dist/subpaths/color.js`,
   §2), backed by `src/subpaths/color.ts:7`. **No deep path, here or anywhere in `demo/`** (§0).
   The *code-level* dogfood boundary is the cleanest thing in this component. The *config-level*
   guardrail behind it is not (L2-2) — that is the correction, and it does not touch this line.
2. **`verbatimModuleSyntax` is honoured.** All four type-only imports (`:12`, `:13`, `:14`, `:15`)
   carry `import type`; the value imports (`:2`, `:3-9`, `:10`, `:11`, `:18`, `:23`) do not. Edict 8
   satisfied.
3. **Idiomatic Vue 3.5.** Reactive props destructure with a default (`:25-45`), typed `defineEmits`
   (`:76-81`), lazy `computed` over props (`:57-74`). No `defineModel` stale-read hazard — the
   component is emit-based, holds no local mirror of a model value. Edict 7 satisfied.
4. **Zero styling contraband.** No `<style scoped>`, no `:deep()`, no numeric `z-[NN]`, no `100vh`,
   no per-instance material override. `.section-label` and `.text-micro` are both glass-ui-owned
   utilities (`dist/styles/typography/utilities.css`; `dist/styles/components.css`
   `.text-micro{font-size:var(--type-micro)}`). Edicts 5 and 6 satisfied. `eslint` clean.
5. **It contributes none of `/#/mix`'s a11y defects.** `REPORT.json` `safari-desktop-light /#/mix`
   lists 8 small tap targets — `"Switch to slug"`, `"Generate new slug"`, `"Cancel"` (22×22, dock)
   and `"L/A/B/ALPHA channel"` (12×24, picker rails) — **none** this component's. Measured live,
   its own controls are `227×36` (both Select triggers, both accessibly named) and `462×40` (the
   CTA). The route's single `namelessButtons: 1` is `class="send-btn btn-interactive"`, measured
   **outside** `<main>`.
6. **The route is clean on every hard signal, in all four Safari matrices.**
   `REPORT.md:123,138,153,168` — `overflowX 0 · main 1 · pageErr 0 · consoleErr 0` for
   `safari-{desktop,mobile}-{light,dark}`.
7. **`vue-tsc -p tsconfig.demo.json --noEmit` exits 0 and `eslint` is clean on the file** — which is
   precisely why L2-1 and L2-2 matter. Green gates over a dead prop and a false path map are the
   report's through-line: *every automated instrument this repository owns agrees the component is
   fine, and two of its most load-bearing statements about the world are false.*

---

## §11 · Verdict

**DEFECTIVE** — combined across both rounds: **2 BLOCKER · 9 MAJOR · 3 MINOR · 1 INFO.**

**Strongest defect this round: L2-1.** The component's single verb — the page's ONE command, carrying
a four-line comment asserting it consumes "the producer's deliberate-primary register … at the root
vocabulary, never a per-instance costume" — passes `variant="primary-audacious"` to a glass-ui 7.0.0
`Button` whose props are `emphasis × tone × size`. Measured in the live DOM, the string lands as a
raw fallthrough attribute on the `<button>` and the CTA renders at `data-emphasis="secondary"`:
glass-ui's default. **51 of 55** Button call sites in the demo carry the same dead prop; only 2 speak
the shipped API. `vue-tsc` exits 0, eslint is clean, and the Safari matrix is green, because Vue never
errors on an extra attribute and a disabled wash capsule looks like a quiet one.

Its significance is larger than its instance. Round 1's BLOCKER — `tag="button"` on a
`WatercolorDot` that has no `tag` prop — is **the same mechanism at a different primitive**. Together
they establish that the glass-ui 7.0.0 whole-adoption (W44/D58) moved the version and not the
consumer surface, and that nothing in this repository's toolchain can detect a renamed producer prop.
That is the finding the mega-tranche should act on: not two prop fixes, but one structural gate.

The rest of both rounds is a single sentence repeated at seven boundaries — **there is more than one
home for one concept**: the mix domain module in a sibling feature tree (r1 L-2), a diverged second
copy of this component (r1 L-3), nineteen alias barrels and a 90-vs-119 dual path (r1 L-4), a
three-hop re-export chain preserved for its import paths (r1 L-5), a type borrowed from the design
system's own dependency because the design system will not publish it (r1 L-6), three chain samplers
where the library ships none (L2-3), and a typecheck path map that has drifted five keys from the
export map it claims to mirror (L2-2).

---

*Seat: CHALLENGE-L (library structure), round 2. Round 1 preserved verbatim at
`challenge-L-library-round-1.md`. No source edits land from this formation. Probe scripts written to
the session scratchpad, never to the repository.*
