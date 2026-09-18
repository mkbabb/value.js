claude-opus-5[1m]

# Challenge · `SequenceTarget.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceTarget.vue` (252 lines)
**Axis** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system): subpath choices, shadow components (S-1..S-8 census), value.js transitive exposure (R1 class), props/emits contract quality, integration seams with the colocated sub-units.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier, and a false defect is worse than a missed one. No browser tooling was used — every claim below is static and source-derived. Claims that would need a live page are marked `UNPROVEN-NEEDS-LIVE`.

**Tally** — 13 defects (1 BLOCKER · 4 MAJOR · 8 MINOR) · 3 INFO non-defect observations · 5 superlatives.

---

## 0. The consumption surface, enumerated

Read whole: the target, plus every module it imports.

| edge | specifier | line | resolves to | verdict |
|---|---|---|---|---|
| value.js | `@mkbabb/value.js/math` → `clamp` | `:134` | `node_modules/@mkbabb/value.js@4.0.0` `dist/subpaths/math.js`; `math.d.ts:1` `clamp(value,min,max)` | ✅ correct |
| glass-ui | `@mkbabb/glass-ui` → `Button, Card` | `:136` | root barrel `dist/glass-ui.js` (23 938 B) | ⚠️ C-8 |
| glass-ui | `@mkbabb/glass-ui/metric` → `Metric` | `:138` | `dist/metric.js` (6 015 B) — **required**, `Metric` is *not* in the root barrel | ✅ correct |
| icons | `@lucide/vue` → `Clapperboard` | `:139` | `@lucide/vue@1.17.0`, `dist/lucide-vue.d.ts:5249` | ✅ exists |
| demo seam | `@composables/useDragScrub` | `:141` | `demo/composables/useDragScrub.ts` | ✅ |
| scene seam | `./sequenceKeys` → `SEQUENCE_DEMO_KEY` | `:142` | `sequenceKeys.ts:7` | ⚠️ C-11 |
| scene seam | `./useSequenceDemo` → `ROW_COUNT` | `:143` | `useSequenceDemo.ts:59` | ℹ️ I-2 |
| sub-units | `./SequenceScrubber.vue` / `SequencePlayhead.vue` / `SequenceAxis.vue` | `:146-148` | colocated | ⚠️ C-5 / C-9 |
| style | `<style scoped src="./SequenceTarget.css">` | `:252` | 259 lines | ⚠️ C-10 |
| **engine (indirect)** | `demo.childAnims[i].setTargets(el)` · `demo.sequence.progress = …` | `:187` · `:192` | `keyframes.js` `animation/engine/animation.ts:464`, `animation/orchestration/sequence/sequence.ts:221` | ⚠️ C-4 |

The component has **zero props and zero emits**. Its entire inbound contract is one `inject()` (`:150`); its entire outbound contract is method calls on the injected facade. That asymmetry is the root of C-4, C-9 and C-11.

---

## 1. BLOCKER

### C-1 · glass-ui is a phantom dependency — this file carries two of the unresolvable edges

**Severity BLOCKER** · `SequenceTarget.vue:136`, `SequenceTarget.vue:138`
**Folds** `lane-frontend.md` **F-1** (§0 headline, §2.1). Not re-derived — confirmed and localised.

`@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json`; 7.0.0 sits installed in `node_modules` only because of a stale install. This component consumes it at two import sites and, transitively, at every `.button` / `.card` / `.metric__*` rule its markup depends on. On a clean `npm ci` checkout the module graph for this file does not resolve, and the scene cannot build.

Confirmed against the tree:

```
$ node -e "…require('./node_modules/@mkbabb/glass-ui/package.json').version"  → 7.0.0
$ grep -n "node_modules/@mkbabb" package-lock.json                            → 611: @mkbabb/value.js   (only)
```

Note the contrast with the value.js edge, which is exemplary (§5, S+1): `@mkbabb/value.js` is pinned EXACT at `4.0.0` and locked. The *same file* holds one perfectly-governed package edge and two ungoverned ones.

**Falsifier** — a `@mkbabb/glass-ui` entry in `package-lock.json`, or an `overrides`/`workspaces` mechanism that injects it. I grepped the lockfile; there is exactly one `@mkbabb` node and it is value.js.

---

## 2. MAJOR

### C-2 · The Reel button re-implements `iconOnly` with utility overrides — and the primitive's own `min-block-size` floor defeats it

**Severity MAJOR** · `SequenceTarget.vue:29-37` (esp. `:31`, `:36`)

```vue
<Button
    emphasis="secondary"
    class="h-7 w-7 p-0 btn-interactive"
    aria-label="Play the reel — a cascading wave replay"
    @click="demo.playReel()"
>
    <Clapperboard class="w-3.5 h-3.5" />
</Button>
```

Three separate seams are bypassed at once:

1. **`iconOnly` is a first-class prop** — `dist/components/button/Button.vue.d.ts:13`: *"Square geometry for an accessibly named icon command."* Its rule is `dist/components/button/styles.css`: `.button[data-icon-only] { inline-size: var(--button-size); block-size: var(--button-size); min-block-size: var(--button-size); padding: 0; }`. This call site omits it and hand-rolls `h-7 w-7 p-0`.
2. **`size` is omitted**, so `--button-size` falls to the base `--control-h-md`.
3. **The glyph bypasses the repo's own `icon-sm` utility** (`demo/styles/design-idioms.css:102`, `--icon-sm: 0.875rem`) for a raw `w-3.5 h-3.5` — numerically identical, idiomatically off-seam.

The consequence is **not** cosmetic-only. `.button` base carries `min-block-size: var(--button-size)` unconditionally, and Tailwind's `h-7` sets `height`, not `min-height`. `min-block-size` clamps `height` — this is a **property-level** interaction, not a cascade contest, so it holds regardless of `@layer` order:

```
styles/tokens/sizing.css:1  :root { --ui-scale: 1; --control-floor: 0px;
                                    --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor)); }
                            @media (pointer: coarse) { :root { --ui-scale: 1.5; --control-floor: 2.75rem; } }
```

- fine pointer → `min-block-size = max(2.5rem·1, 0) = 40px`
- coarse pointer → `min-block-size = max(2.5rem·1.5, 2.75rem) = 60px`

`w-7` (28px) *does* win — `min-inline-size` is `0` on the base rule and `[data-icon-only]` never applies. So the rendered command is **28 × ≥40 px** (28 × 60 on touch), radius `--radius-pill`, holding a 14px glyph: a tall lozenge where a square icon button was authored. Neighbouring `.status-badge` in the same flex row is `py-0.5` caption height, so the header row's baseline is set by this button's unintended height.

The repo's own idiom is the counter-example: `icon-only` appears at 7 sites in 3 files (`KeyframeTimeline.vue:16,32,48,63,114`; `EditorShell.vue:34`; `TimingFunctionPanel.vue:17`), and `KeyframeTimeline.vue:14-16` pairs it with `size="sm"` so the `h-7` override matches a real token rung. This call site is the outlier in its own tree.

**Falsifier** — a demo rule setting `min-height`/`min-block-size` on `.button` or `.btn-interactive`. Grepped: `demo/styles/*.css` has exactly two `min-height` declarations (`design-idioms.css:83` `.tap-floor`, `style.css:220` `100dvh`); neither reaches `.button`. `.btn-interactive` defines nothing at all (see C-6). Also falsified if `iconOnly` were absent from the installed 7.0.0 — it is present, typed and styled.
**UNPROVEN-NEEDS-LIVE** — the exact painted pixels; the CSS derivation above is complete, the visual read is for SS-13.

---

### C-3 · Five hand-rolled `role="slider"` row handles — a shadow-component instance the S-1..S-8 census does not enumerate

**Severity MAJOR** · `SequenceTarget.vue:96-107` (markup) + `:227-243` (keyboard) + `:209-225` (drag)
**Contradicts-by-extension** `lane-frontend.md` **S-4**, which scopes the sequence-scene slider shadow to `SequenceScrubber.vue` alone ("162 lines").

S-4 is correct but under-counted. The *same scene* hand-rolls a **second** slider family inside `SequenceTarget.vue` itself — five of them, one per storyboard row:

```vue
<div class="seq-handle" role="slider"
     :aria-label="`Re-time row ${row.index + 1} start offset`"
     :aria-valuenow="Math.round(row.at)" aria-valuemin="0" :aria-valuemax="demo.STAGGER_MAX"
     tabindex="0" @pointerdown="onRowDown(row.index, $event)" @keydown="onRowKeydown(row.index, $event)" />
```

plus a hand-rolled arrow/Home/End keyboard model (`:232-243`, `ROW_AT_STEP = 40`) and a hand-rolled thumb (`SequenceTarget.css:120-170`, including its own `:focus-visible` ring at `:163-167`). That is `role`, `aria-value*`, `tabindex`, pointer capture, keyboard stepping, thumb paint and focus ring — the complete `Slider` contract, re-authored.

glass-ui `Slider` is **already in this demo's vocabulary**, from the root barrel, in three files:

```
scenes/cube/matrix-editor/MatrixEditor.vue:97   import { Slider, Card, CardContent } from "@mkbabb/glass-ui";
components/instrument/keyframes/KeyframesEditor.vue:109  import { Card, CardContent, Slider } from "@mkbabb/glass-ui";
components/playback/PlaybackRibbon.vue:92       import { Button, Slider, useTouchGate } from "@mkbabb/glass-ui";
```

So the census tally for the sequence scene should read **6 shadow sliders, not 1** (5 row handles + the scrubber). Two gaps the primitive would close for free are visible statically: no `aria-valuetext` (a reader announces `"480"` with no unit against a 0–1600 range whose domain is milliseconds), and no PageUp/PageDown step — both are baseline `Slider` behaviour.

I do **not** claim a mechanical swap is right: re-timing a `Sequence` entry by dragging is a domain gesture, and S-3's "evaluate, not mechanical swap" caveat applies with equal force here. The defect is the **census gap** and the un-argued re-authorship, not the existence of the affordance.

**Falsifier** — evidence that glass-ui `Slider` cannot host a `--row-start`-anchored thumb over a `container-type: inline-size` rail, or a rationale comment in-tree explaining the fork (`SequenceTarget.css:117-136` explains the *touch-floor geometry*, never the *not-a-Slider* choice). Also falsified if `Slider` were unreachable — it is root-barrel exported and already imported thrice.

---

### C-4 · The SFC binds the engine's targets and writes `Sequence.progress` directly — two writers on the playhead, and the composable cannot guarantee its own animations are bound

**Severity MAJOR** · `SequenceTarget.vue:184-196` (esp. `:187`, `:192`)

```ts
onMounted(() => {
    for (let i = 0; i < ROW_COUNT; i++) {
        const el = ballEls[i];
        if (el) demo.childAnims[i]!.setTargets(el);
    }
    demo.sequence.progress = demo.progress.value;
    demo.powerOn();
});
```

`useSequenceDemo` builds five `CSSKeyframesAnimation`s (`useSequenceDemo.ts:126-140`), inserts them into a `Sequence` (`:147-150`), and hands out a rich transport façade — `scrub`, `reset`, `reseatRow`, `facility.channels[0].setProgress`, `scenePlayback.setProgress`. Every one of those routes a playhead write through the machine or through `syncFromSequence()`. The view then reaches **past all of them** twice:

1. **`childAnims[i].setTargets(el)`** — the library's target-binding (`animation/engine/animation.ts:464-470`, `this.targets = targets; bindTargets(this)`) is performed by the *template*, not the owner. The composable therefore ships five animations that are, from its own perspective, permanently unbound; nothing in `useSequenceDemo` can assert its invariant. If `SequenceTarget` ever mounts without `SequenceScene` (or a second Target mounts against the same provided demo), the last mount silently steals the engine's targets — a class of failure with no diagnostic.

2. **`demo.sequence.progress = demo.progress.value`** — `sequence.ts:221` is a real setter (`seek(clamp(p,0,1) * duration)`), so this *works*; but it is the one playhead write in the tree that does **not** call `syncFromSequence()` and does **not** dispatch to the scene machine. The composable's own comment at `useSequenceDemo.ts:440-442` calls itself "the composable-side belt-and-braces" for exactly this line — i.e. the code acknowledges two writers and adds a third guard rather than collapsing the seam.

The honest shape is a `demo.bindRowTargets(els)` / `demo.paintCurrent()` pair on the façade, keeping `sequence` and `childAnims` out of the view's reach entirely. Today both are exported raw (`useSequenceDemo.ts:461-462`) precisely so the view can reach them.

**Falsifier** — if `Sequence.progress` had no setter (it does, `sequence.ts:221`), or if `setTargets` were additive rather than replacing (it is replacing, `animation.ts:465`), the analysis would change. Also falsified if the demo shell mounted `SequenceTarget` under `<KeepAlive>` such that `onMounted` were guaranteed once-per-provider — `useSequenceDemo.ts:445-446` states the host has no `<KeepAlive>`, which makes the mount/provider pairing incidental rather than enforced.

---

### C-5 · `<Metric>` is adopted here and hand-rolled 110 lines away in its own colocated sub-unit

**Severity MAJOR** · `SequenceTarget.vue:18-24` vs `SequenceScrubber.vue:9-17`

This file is the **sole** `<Metric>` consumer in the entire 58-file demo:

```
$ grep -rn "glass-ui/metric\|<Metric" --include="*.vue" demo/
scenes/sequence/SequenceTarget.vue:18   <Metric
scenes/sequence/SequenceTarget.vue:138  import { Metric } from "@mkbabb/glass-ui/metric";
```

It uses the primitive correctly — `size="xl"` ∈ `MetricSize`, `label`/`value`/`unit` all in `MetricProps` (`dist/components/metric/types.d.ts`). That is genuinely good (§5, S+5).

But `SequenceScrubber.vue` — the sub-unit split out of *this file* at the "≤500L split seam" (`SequenceTarget.vue:124-127`) — hand-rolls the identical construct:

```vue
<span class="seq-eyebrow text-caption font-medium text-muted-foreground">master playhead</span>
<span class="seq-timecode readout-accent text-mono-caption tabular-nums">{{ demo.progress.value.toFixed(3) }}</span>
```

label + value, tabular figures, muted label / accented reading — that is `MetricProps` verbatim (`{ label, value, unit?, context? }`, with a `value` slot available for the phosphor treatment and `orientation: "stacked"` for the vertical arrangement). One feature, one author, two idioms, ~110 lines apart in files that were carved from the same original component. The `.seq-timecode` scoped rule (`SequenceScrubber.vue:137-141`) re-authors `font-feature-settings: "tnum"` which `Metric` already owns.

This is a **new shadow-census row** (an S-9 candidate) that lane-frontend's S-4 entry — scoped to the *slider* half of `SequenceScrubber` — does not cover.

**Falsifier** — a `Metric` limitation that blocks the phosphor `text-shadow` treatment. `Metric.vue.d.ts:3-11` exposes `label`, `value`, `unit` and `context` slots, and `MetricTextProps` accepts `class`, so the treatment is expressible. Also falsified if the two readouts were semantically different — both are "the master clock's current position", rendered at the same instant on the same card.

---

## 3. MINOR

### C-6 · `btn-interactive` is a phantom class — 8 call sites, zero definitions

**Severity MINOR** · `SequenceTarget.vue:31`

```
$ grep -rn "btn-interactive" demo/ --include="*.css"                     → (no output)
$ grep -rno "btn-interactive" node_modules/@mkbabb/glass-ui/dist/styles/ → (no output)
$ grep -c  "btn-interactive" node_modules/@mkbabb/glass-ui/dist/glass-ui.css → 0
```

The token appears only as markup, at 8 sites: `SequenceTarget.vue:31`, `CubeScene.vue:188,193`, `SpringScene.vue:167`, `SpringPhysicsFacet.vue:74,105`, `RibbonBar.vue:135`, `PlaybackRibbon.vue:55`. It is not a Tailwind-generatable name (no `btn-*` namespace, no `@utility btn-interactive` — the demo's only `@utility` blocks are `icon-{xs,sm,md,lg}` and `ppmycota-stroke`, `design-idioms.css:96-122`), and glass-ui's utilities file defines `text-mono-*`, `fira-code`, `cm-serif`, `fourier-f` — no `btn-*`.

The prose corpus shows it was once real: `docs/tranches/S/audit/pass1/design/morph.md:97` cites *"a glass-ui `Button` riding `.btn-interactive` … inherits the demo's single-sourced `:focus-visible` contract (`design-idioms.css:340-343`)"*. That rule no longer exists. So the eight call sites are each silently missing whatever interaction/focus contract they were written to inherit.

**Falsifier** — any `@utility btn-interactive`, `.btn-interactive {…}`, `@apply`-source, or Tailwind plugin producing it. I searched the whole repo excluding `node_modules` and all of glass-ui's shipped CSS; the only non-markup hits are prose in `docs/`.
Distinguish from a near-miss I checked and **cleared**: `text-mono-caption` (`:15`, `:85`) *is* real — `glass-ui/dist/styles/typography/utilities.css:1` `@utility text-mono-caption`. `text-admin-label` (`:39`) is real via the `--text-admin-label` theme token. `text-display` (`:14`) is real and additionally overridden at `demo/styles/style.css:271`.

---

### C-7 · `--stagger-max` is written on every render and read by nothing

**Severity MINOR** · `SequenceTarget.vue:63`

```vue
:style="{ '--stagger-max': demo.STAGGER_MAX, '--scrub-dir': demo.scrubDir.value }"
```

```
$ grep -rn -- "stagger-max" demo/ src/ node_modules/@mkbabb/glass-ui/dist/styles/ | grep -v "STAGGER_MAX\|staggerMax"
  demo/scenes/sequence/SequenceTarget.vue:63     ← the write, and nothing else
```

Zero consumers, repo-wide and in glass-ui. Its co-declared sibling `--scrub-dir` *is* live (`SequencePlayhead.vue:78` `transform: scaleX(var(--scrub-dir, 1))`, with the default seeded at `SequenceTarget.css:24`), which is exactly why the dead one is easy to miss. Both the block comment at `:56-59` and the CSS header at `SequenceTarget.css:20-25` describe the stage's inline custom properties as load-bearing; one of the two is not.

**Falsifier** — any `var(--stagger-max)` in a stylesheet, a scoped SFC block, or a `getComputedStyle` read. Grepped all three surfaces (`demo/`, `src/`, glass-ui `dist/styles/`); the ms domain is consumed through JS (`demo.STAGGER_MAX` at `:81`, `:98`, `:103`, `:217`, `:239`) and never through CSS.

---

### C-8 · Root-barrel and granular-subpath idioms collide inside one three-line import block

**Severity MINOR** · `SequenceTarget.vue:136` vs `:138`

```ts
import { Button, Card } from "@mkbabb/glass-ui";
// Glass 7 canonical poster-metric primitive.
import { Metric } from "@mkbabb/glass-ui/metric";
```

glass-ui 7.0.0 publishes **73** subpath exports, including `./button` (`dist/button.js`, 71 B) and `./card` (`dist/card.js`, 217 B). The root barrel is `dist/glass-ui.js` at 23 938 B of re-export graph. `lane-frontend.md` §3.1 measures the demo-wide split — 31 root-barrel imports against 21 distinct subpaths (29% utilisation) — and this file is a specimen of *both halves at once*, three lines apart.

Two honest qualifiers keep this MINOR rather than MAJOR:
- The `/metric` import is **not** stylistic preference. `Metric` is genuinely absent from the root barrel (`grep -n "Metric" dist/index.d.ts` → no output; only `dist/metric.d.ts` carries `export * from "./components/metric"`). The subpath is *required*, so the "inconsistency" is partly forced.
- glass-ui declares no `sideEffects` bomb for these entries and the build is rolldown-ES-only, so a production build most likely tree-shakes the barrel down. The cost that survives is dev-server graph size and the loss of a legible, uniform import idiom.

**Falsifier** — a build measurement showing the root barrel adds nothing to the `gh-pages` bundle (that would reduce this to a pure style note), or a project precept mandating root-barrel imports for leaf chrome. `lane-frontend.md` §3.2 records the mixed practice as an observation, not a rule.

---

### C-9 · The playhead sub-unit takes `progress` as a **prop**, so the split bought line-count but not render isolation

**Severity MINOR** · `SequenceTarget.vue:21` and `:70`; contrast `SequenceScrubber.vue:47`

```vue
:value="(demo.progress.value * 100).toFixed(0)"     <!-- :21  -->
<SequencePlayhead :progress="demo.progress.value" /> <!-- :70  -->
```

`demo.progress` is a ref written on **every rAF frame** by the mirror loop (`useSequenceDemo.ts:192-197`, `frame: () => { syncFromSequence(); … }`). Because both reads happen in `SequenceTarget`'s own render scope, the parent's render function is a per-frame reactive dependency: during playback the whole subtree (5 rows × 4 elements, the `:style` objects at `:63` and `:79-83`, the `left: calc(…%)` string at `:98`, plus the two `v-for` ref callbacks at `:90`/`:115`) re-renders each frame. Vue's patch finds most of it unchanged, so this is cheap — but it directly contradicts the design the composable states for itself: *"The ENGINE paints the balls directly … there is no per-frame Vue work for the motion"* (`useSequenceDemo.ts:117-118`).

The interesting part is the **asymmetry between the two sub-units carved from this file**:

| sub-unit | seam | per-frame effect |
|---|---|---|
| `SequenceScrubber.vue:47` | `inject(SEQUENCE_DEMO_KEY)` — no props | reads `progress` in *its own* scope; re-renders alone ✅ |
| `SequencePlayhead.vue:17` | `defineProps<{ progress: number }>()` | forces the **parent** to read `progress` ❌ |
| `SequenceAxis.vue:17` | props, both constants | props never change → skipped entirely ✅ |

Two of three seams are right. The `Metric` at `:21` reads `progress` in the parent scope too, so fixing `SequencePlayhead` alone would not isolate the parent — both sites move together, or the readout becomes its own leaf.

**Falsifier** — evidence the mirror loop does not tick per-frame (it is rAF-driven and gated on `machine.status === "playing"`, `useSequenceDemo.ts:194`), or a `v-memo` / `shallowRef` arrangement that decouples the parent render. Neither is present.
**UNPROVEN-NEEDS-LIVE** — the actual frame cost. The dependency graph is fully determined statically; only the magnitude needs a profile.

---

### C-10 · `.seq-ball` re-authors the promoted `.progress-ball` idiom's `box-shadow` — the exact thing its sibling file refuses to do

**Severity MINOR** · `SequenceTarget.css:205-208` vs `SequenceScrubber.vue:145-150`

`.progress-ball` is a demo-owned idiom "promoted ONCE (was authored four ways) and parameterized by drift-axis custom properties" (`design-idioms.css:161-165`); it owns the glow **shape** and exposes `--ball-size`, `--ball-tone`, `--ball-glow` as the parameters (`design-idioms.css:177-186`, `box-shadow: 0 2px 10px color-mix(…, var(--ball-glow, 35%), transparent)`).

`SequenceScrubber` consumes it exactly as intended, and says so:

```css
/* CONSUME the promoted .progress-ball idiom's --ball-glow parameter … rather than
   re-authoring its box-shadow — the idiom owns the 0 2px glow shape */
.seq-scrub.is-scrubbing .scrub-ball { --ball-glow: 60%; }
```

`SequenceTarget.css` — the same feature, the same idiom, one file over — replaces the whole declaration:

```css
.seq-ball {
    --ball-size: 1.6rem;
    box-shadow: 0 0
        calc(2px + var(--ball-p, 0) * 16px + var(--seq-glow, 0) * 6px)
        calc(var(--ball-p, 0) * 4px)
        color-mix(in srgb, var(--ball-tone, …) calc(30% + var(--ball-p, 0) * 50%), transparent);
}
```

The `--ball-size` and `--ball-tone` overrides are perfect idiom consumption. The `box-shadow` override discards the idiom's `0 2px` offset and its `--ball-glow` seam, so the traveller and the scrub-ball no longer share a glow shape — and a future change to the idiom's shape reaches five of the six balls on this card.

I take the mitigation seriously: the lane glow must scale with the engine's `--ball-p`, which `--ball-glow` alone cannot express (it parameterises intensity, not blur/spread). So the override has a *reason*. The defect is that the reason is unstated in a file whose sibling documents the opposite discipline — and that the fix (extend the idiom with `--ball-blur`/`--ball-spread`) was not taken.

**Falsifier** — extend `.progress-ball` with blur/spread parameters and show the lane cascade cannot be expressed; or find a comment in `SequenceTarget.css` explaining the re-authorship (lines 202-208 explain the *cascade motion*, never the idiom departure).

---

### C-11 · The component's entire inbound contract is an unguarded `inject(...)!`, in a repo with a documented injection-orphan crash

**Severity MINOR** · `SequenceTarget.vue:150` (and `SequenceScrubber.vue:47`)

```ts
const demo = inject(SEQUENCE_DEMO_KEY)!;
```

No default, no `if (!demo) throw new Error("SequenceTarget must be used within SequenceScene")`, no dev-only warning. The non-null assertion converts a **structural** contract into a TypeScript lie: a missing provider yields `undefined`, and the first failure is `Cannot read properties of undefined (reading 'progress')` inside a render function, with no mention of the missing provider.

This is not hypothetical in this codebase. `CubeScene.vue:41-44` carries a written post-mortem of exactly this class:

> *"The former scene-injected reka `<TabsTrigger>`/`<TabsContent>` … are now ORPHANS — they throw `"Injection Symbol(TabsRootContext) not found"` at runtime."*

Five `inject(...)!` sites exist demo-wide; two of them are this scene's. Contrast the sibling seams: `SequenceAxis.vue:17` and `SequencePlayhead.vue:17` declare typed, required props — a contract the compiler and Vue's dev-mode prop check both enforce. Within one four-component tree, two components have machine-checked contracts and two have asserted ones.

**Falsifier** — a dev-mode provider guard elsewhere in the chain, or a lint rule banning unprovided injection keys. `SequenceScene.vue:19` does `provide(SEQUENCE_DEMO_KEY, demo)` unconditionally, so today it holds — the claim is about the contract's enforceability, not a live crash.

---

### C-12 · Pre-stringifying with `.toFixed(0)` defeats `Metric`'s own empty/non-finite coalescing

**Severity MINOR** · `SequenceTarget.vue:21`

`MetricValue = string | number | null | undefined` (`dist/components/metric/types.d.ts`), so a string is legal. But `Metric` ships a coalescer specifically for the numeric case (`dist/metric.js`, `coalesce-metric`):

```js
let r = e == null || (typeof e == "string" && e.trim() === "")
        || (typeof e == "number" && !Number.isFinite(e));
return { display: r ? t /* placeholder "—" */ : String(e), empty: r, loading: !1 };
```

Passing `(demo.progress.value * 100).toFixed(0)` hands `Metric` a string, so the `Number.isFinite` arm can never fire and `data-empty` can never be set. A non-finite `progress` renders the literal text **`"NaN"`** in an `xl` poster rung instead of the placeholder. Passing `demo.progress.value * 100` (a number) with the primitive's own formatting would restore the guard.

Honest weighting, which is why this is MINOR and not MAJOR: `progress` is `clamp(sequence.progress, 0, 1)` (`useSequenceDemo.ts:180`) and `Sequence.progress` is `duration === 0 ? 0 : _time / duration` (`sequence.ts:217-219`) — the zero-duration case is already guarded upstream, and `duration` here is bounded below by `ROW_DURATION = 900`. So the NaN path is not currently reachable. The defect is that a defensive primitive was adopted and its defence disabled at the call site.

**Falsifier** — show `Metric` cannot render `"33"` from a number without extra formatting props (it can: `String(e)` on a finite number), or show a rounding requirement the primitive cannot express.

---

### C-13 · The rect-ratio projector is duplicated across both `useDragScrub` consumers in this scene

**Severity MINOR** · `SequenceTarget.vue:211-218` vs `SequenceScrubber.vue:77-82`

`useDragScrub` exists to collapse three hand-rolled copies of the pointer dance (`useDragScrub.ts:8-27`: *"Spring's `positionFromEvent`, Sequence's master-scrub `progressFromEvent`, and MotionPath's `projectPointer` were THREE hand-rolled copies of the SAME dance … They collapse to THIS composable; each scene now supplies ONLY its `project`"*). That collapse succeeded for capture/move/up/cancel and for the global select-suppression token (`:112-147`).

It did not collapse the geometry. Both consumers in *this scene* write the same rect-ratio:

```ts
// SequenceTarget.vue:215-217
const rect = el.getBoundingClientRect();
const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
return ratio * demo.STAGGER_MAX;

// SequenceScrubber.vue:80-81
const rect = el.getBoundingClientRect();
return clamp((e.clientX - rect.left) / rect.width, 0, 1);
```

The composable's own docstring names this shape twice ("a rect-ratio for a rail"), so a `rectRatio(el)` helper on the seam is the stated-but-unbuilt half of the extraction. The MotionPath consumer is genuinely different (nearest-point-on-path), so the seam correctly stays generic — a shipped default projector, not a narrowed signature, is the fix.

**Falsifier** — a third rail consumer whose ratio differs materially (vertical rails, inverted axis, non-linear domains). I read all `useDragScrub` call sites reachable from this scene; both are horizontal linear rails.

---

## 4. INFO — non-defect observations (the axis worked in the negative)

### I-1 · The R1 parser-crash class is **NOT** reachable from this component — verified, not assumed

`lane-library.md:243` locates the live R1 surface at `demo/scenes/square/useSquareTumble.ts:22` (`parseCssColor(css)`). The sequence scene does not reach it. Traced end-to-end:

- The component's only value.js edge is `clamp` from `/math` (`:134`) — pure arithmetic, no grammar.
- The engine keyframes carry **no colour**: `useSequenceDemo.ts:133-137` is `{ "--ball-p": <number>, opacity: <number>, scale: <number> }`. Values arrive as JS numbers, not CSS text, so no `/css` entry point is crossed.
- The one `color-mix(in oklab, …)` in the file (`ROW_TONES[3]`, `:165`) is written to `--ball-tone` by **Vue's** inline-style patch (`:80`), never handed to value.js. The browser parses it, not the library.
- The engine's write-back is `target.style.setProperty(property, String(value))` (`animation/compile/value-ast.ts:397`), and the numeric-writer branch (`:378-379`) emits a bare number — so `--ball-p` lands as `"0.43"`, which the `@property --ball-p { syntax: "<number>" }` registration at `SequenceTarget.css:14-18` accepts. No unit is appended, so the registration cannot reject the value and snap the ball to `initial-value: 0`. I checked this specifically because it is the failure mode a registered custom property would produce, and it does not occur.

**Falsifier** — a colour-valued keyframe added to `useSequenceDemo`, or an engine path that CSS-text-parses custom-property values before writing. Neither exists on this route today.

### I-2 · Split cardinality authority: `ROW_COUNT` (module) vs `demo.rows` (instance)

`:143` imports `ROW_COUNT` statically while the template iterates `demo.rows.value` (`:76`) and the mount loop counts to `ROW_COUNT` (`:185`). They agree because `rows` is `Array.from({ length: ROW_COUNT })` (`useSequenceDemo.ts:308-313`) and `:key="row.index"` keeps the five ball elements identity-stable, so the one-shot `setTargets` never desyncs. Should `rows` ever become dynamic, the engine binding would silently cover a prefix. `demo.STAGGER_MAX` is read off the instance (`:63`, `:81`, `:103`) while `ROW_COUNT` is read off the module — the same kind of constant, two access idioms.

**Falsifier** — make `rows` dynamic and observe unbound travellers; today the invariant holds.

### I-3 · `@lucide/vue` barrel import is acceptable, and matches the repo

`import { Clapperboard } from "@lucide/vue"` (`:139`) pulls a package with no `exports` map and `sideEffects: false` — so production tree-shaking is sound, and Vite's dep pre-bundle handles dev. `ChromeDock.vue:4` and `CubeScene.vue:49` use the identical idiom. `@lucide/vue@^1.17.0` is properly declared at `package.json:74`, in pointed contrast to C-1.

---

## 5. Superlatives (L-18, running the other way)

**S+1 · The value.js edge is the best-governed dependency in the file.** `:134` imports `clamp` from `@mkbabb/value.js/math` — the correct subpath on a package that ships **no root (`.`) export** (`lane-library.md:57`, "a rootless capability package"), pinned EXACT at `4.0.0` and present in the lockfile. Critically, it does **not** launder the import through keyframes' own re-export: `internal/leaves.ts:28` re-exports the same `clamp` from value.js (LEG-3), and consuming *that* would have coupled a demo view to a library-internal tier. The direct edge is right. This is one of two glass-ui-free imports in the file and the only one with a floor, a ceiling and a lock.
*Falsifier* — a project rule requiring demo code to consume math leaves through `@mkbabb/keyframes.js`; none exists, and `lane-library.md:485` describes the leaves as an internal light-engine convenience.

**S+2 · Per-child `setTargets`, not the `Sequence`-level broadcast.** `Sequence.setTargets` exists (`sequence.ts:310-312`) and fans one target set to *every* child. For a storyboard where each lane paints its own traveller, that would be exactly wrong. `:187` binds child-by-child instead. The API choice is correct, and the comment at `:176-182` records *why* the ball rather than the track is the target (a track-target let `scale: 0.7` shrink the row and drop the handle below the 24px target-size floor) — a real bug, correctly diagnosed at the consumption seam. (The *location* of the call is C-4; the *call itself* is right.)

**S+3 · `.status-badge` is justified bespoke, not a `Badge` shadow — and I checked.** glass-ui ships `./badge` with a `tone` axis, and it is one of the 52 unreached subpaths, so `:38-41` looks like a shadow at first pass. It is not. `design-idioms.css:213-240` parameterises the badge on `--badge-tone` bound to demo-owned `--color-progress` / `--rainbow-violet`, with an explicit load-bearing AA-contrast derivation (`--badge-tint: 14%`, `--badge-text-mix: 50%`, "so it reads ≥4.5:1 against the tint in both themes"). glass-ui's `Badge` `tone` axis is the fixed five-value semantic register `neutral|destructive|success|warning|info` — it cannot express "the master clock's green" or "the reverse violet". This belongs in the S-8 "keep, justified" column, not the shadow tally.

**S+4 · `SequenceScrubber` is the correctly-shaped sub-unit.** Injection-only, zero props, self-documenting about why (`SequenceScrubber.vue:5-6`: "it injects ONLY `demo`, no Target-private state"). It is render-isolated from the parent (C-9), and its `--ball-glow` consumption is the model the sibling should have followed (C-10). The split seam was chosen well even where the extraction was incomplete.

**S+5 · Sole adopter of the Glass 7 poster-metric primitive.** Across 58 `.vue` files this is the one place the new `Metric` is used, and it is used correctly: a required subpath, valid `MetricSize`, and label/value/unit mapped to the primitive's contract rather than approximated with spans. Adopting a freshly-shipped primitive first is the behaviour that keeps a design system alive; C-5 asks only that the adoption be finished inside its own feature.

---

## 6. Provenance & method

- Read whole: `SequenceTarget.vue` (252L), `SequenceTarget.css` (259L), `SequenceScrubber.vue` (162L), `SequencePlayhead.vue` (87L), `SequenceAxis.vue` (49L), `sequenceKeys.ts`, `useSequenceDemo.ts` (483L), `useSequenceInstrument.ts`, `useTypedTrigger.ts`, `useDragScrub.ts`, `SequenceScene.vue`.
- Read as evidence (read-only): glass-ui 7.0.0 `package.json` exports (73 keys), `dist/components/{button,card,metric,badge}/*.d.ts`, `dist/components/button/styles.css`, `dist/styles/{index.css,tokens/sizing.css,typography/utilities.css}`, `dist/metric.js`; value.js 4.0.0 `package.json` exports + `dist/subpaths/math.d.ts`; keyframes `src/animation/orchestration/sequence/sequence.ts`, `src/animation/engine/animation.ts`, `src/animation/compile/value-ast.ts`; `demo/styles/{style.css,design-idioms.css}`; `vite.config.ts`.
- Hitherto corpus folded: `lane-frontend.md` **F-1** (C-1), **S-4** (C-3 extends it, C-5 adds an S-9 candidate), **§3.1/§3.2** (C-8), **S-8** rationale pattern (S+3); `lane-library.md` **:243** R1 locus (I-1), **:57** rootless-package note and **LEG-3** (S+1).
- No writes to any product source in any repo. This file is the only artifact produced.
- No browser tooling. Two claims carry `UNPROVEN-NEEDS-LIVE` markers (C-2 painted geometry, C-9 frame cost); both have their static derivation completed here so SS-13 need only confirm magnitude.
