claude-opus-5[1m]

# CHALLENGE · `SpringTarget.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringTarget.vue` (470 lines)
**Mode:** static, read-only, source-derived. No browser tooling, no installs, no dev server. Nothing was written outside this file.
**Date:** 2026-08-06. keyframes.js is READ-ONLY evidence.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise — but every claim below carries its own falsifier, and a claim that dies to its falsifier is worse than a claim never made. Three candidate findings were **killed during verification** and are recorded as such in §6 so the next auditor does not re-file them.

**Tally: 16 defects · 2 BLOCKER · 6 MAJOR · 6 MINOR · 2 INFO · 5 superlatives.**

---

## 0. Read set (every file the component reaches, read whole)

| file | why |
|---|---|
| `demo/scenes/spring/SpringTarget.vue` | the target |
| `demo/scenes/spring/SpringTrace.vue` | child component (`:152`) |
| `demo/scenes/spring/springKeys.ts` | injection key (`:166`) |
| `demo/scenes/spring/useSpringDemo.ts` | the injected context's producer |
| `demo/scenes/spring/useSpringHotPath.ts` | painter registry + readout mirrors |
| `demo/scenes/spring/useSpringDerby.ts` | the derby lanes + tones |
| `demo/scenes/spring/useSpringLinearStops.ts` | the plot's data source |
| `demo/scenes/spring/springPresets.ts` | the four ζ values |
| `demo/scenes/spring/SpringScene.vue` | the mounting parent (stage geometry) |
| `demo/scenes/spring/SpringPhysicsFacet.vue` | the ζ / response slider bounds |
| `demo/composables/useDragScrub.ts` | `:164` |
| `demo/composables/useDoubleTap.ts` | `:165` |
| `demo/styles/design-idioms.css` | `.progress-rail`/`.progress-ball`/`.stage-field-x`/`.status-badge`/`.focus-ring`/`.code-token`/`.readout-accent` |
| `demo/styles/style.css` | `--color-progress`, the display-voice authority, the z-contract |
| `demo/styles/layout.css` | stage geometry (checked for `container-type` — none) |
| `node_modules/@mkbabb/glass-ui/dist/**` (7.0.0) | `Card`→`Surface` defaults, typography rungs, theme literals, `accessibility.css` |
| `src/animation/physics/spring/{progress.ts,types.ts}` | `SpringProgress.value` semantics + `respectReducedMotion` |
| `src/animation/constants/defaults.ts` | the PRM default |

**Hitherto corpus folded:** `formation/keyframes/lane-frontend.md` — S-1..S-8 shadow census, F-1 phantom dep, §6.3 flat-namespace hazard, §6.5 PRM enforcement-site list. Overlaps and one explicit **contradiction** are cited inline.

---

## 1. BLOCKERS

### D-1 · BLOCKER · The protagonist ball leaves the stage on the exact parameters the scene exists to demonstrate

`SpringTarget.vue:206-208` — the live ball is painted **unclamped**:

```js
if (liveBallEl.value) {
    liveBallEl.value.style.transform = `translateX(${live.value * 100}cqw)`;
}
```

Contrast the two siblings in the same painter closure, both of which **do** clamp:

- `:210` sampler — `clamp(live.sampled, 0, 1)`
- `:222` derby lane — `clamp(trackValues[i] ?? 0, 0, 1.18)`, with the comment `:220-221` "cap so the ball can't leave the lane entirely"

So the clamp discipline exists in this exact function and is applied to the two *secondary* markers while the *primary* one goes without.

`SpringProgress.value` is the raw solver state, not a bounded read — `src/animation/physics/spring/progress.ts:187-189` `get value() { return this.currentValue; }`. For a step from rest the underdamped peak is `Mp = exp(−πζ/√(1−ζ²))`:

| ζ | source | `Mp` | ball centre at peak |
|---|---|---|---|
| 0.86 | default (`useSpringDemo.ts:84`) | 0.005 | 100.5 cqw |
| 0.65 | `snappy` preset (`springPresets.ts:26`) | 0.068 | 106.8 cqw |
| 0.45 | `bouncy` preset (`springPresets.ts:32`) | **0.205** | **120.5 cqw** |
| 0.20 | slider floor (`SpringPhysicsFacet.vue:42`) | **0.527** | **152.7 cqw** |

Both ζ = 0.45 and ζ = 0.20 are directly reachable — the facet's preset click writes both refs (`SpringPhysicsFacet.vue:170-171`) and the slider `:min` is `0.2`.

The stage clips. `SpringTarget.vue:12` puts `overflow-hidden` on the Card; the rail is `w-full` inside a `max-w-3xl` column (`:55`) centred by `items-center` (`:12`); the Card's inline padding is `px-6 lg:px-8`. A `translateX` child is clipped at the Card's padding box, so the ball disappears once its centre passes `W + slack + pad`, where `W` = rail width and `slack = max(0, (contentWidth − 768px)/2)`.

- **Narrow regime** (any card ≤ ~816px, i.e. every phone and tablet, and desktop with the rail pane open): `slack = 0`, so the clip margin is the bare 24/32px padding. At 375px viewport `W ≈ 327px`, `pad = 24px` → clipped at `Mp > 7.3%`, i.e. **any ζ below ≈ 0.64**. At the `bouncy` preset the centre lands 67px past the rail end against a 24px margin — with an 18px ball radius the hero ball is **fully off-card** for the whole ring.
- **Wide regime**: survives only once `slack > Mp·768` — for ζ = 0.45 that needs ≥ ~1150px of card content, i.e. a ~1210px+ card.

The scene's entire thesis is "the overshoot is the point" (`:100-102`, `useSpringDerby.ts:36-38`). The one element carrying that thesis is deleted from the frame by its own container on the majority of viewports.

Aggravating: **the comment describing the missing clamp is still in the file, orphaned** — `:178-180`:

> `// The sweep can overshoot past 1 (underdamped) — clamp the *marker* position`
> `// so the ball stays inside the track even though the read-out shows >1.`

That comment now sits immediately above a block that clamps only the derby (`:181-189`), documenting a guarantee the live path no longer honours.

**Falsifier.** Any of: (a) `SpringProgress.value` is internally bounded to `[0, target]` — killed, `progress.ts:187` returns `currentValue` raw and the whole `linear()` emitter depends on values > 1; (b) the Card is not actually `overflow-hidden` — killed, `:12`; (c) the stage card's content box is ≥ ~1150px wide on the reference viewport — **this is the live falsifier**: on a full-bleed ≥1200px desktop with the controls rail closed the ball stays on stage. Mark the *wide-desktop-only* case **UNPROVEN-NEEDS-LIVE**; the narrow-regime case is decided by the source geometry alone and needs no browser.

---

### D-2 · BLOCKER · The "locked" confirmation fires at a position the spring never visited

Two different primitives on the same 48px rail both claim to be "the target":

- `.spring-target-marker` (`:87-90`, styled `:319-332`) — a dashed ring at `left: calc(target*100%)`. This is the **true** target; it tracks `demo.target`.
- `.spring-target-line` (`:80-84`, styled `:362-370`) — a dashed vertical at `right: 0`, i.e. hard-pinned to rail value **1**, documented at `:75-79` as "the y=1 TARGET LINE every trace is measured against (**the rail's right edge = the spring's target**)".

The premise in that comment is false. `demo.reseat` accepts any ratio: `useSpringDemo.ts:294-300` `const v = clamp(value, 0, 1); target.value = v;` — and it is wired to pointer drag (`SpringTarget.vue:241`), to `ArrowLeft/Down` (`:258`), and to `Home` (`:261-263`, which sets target to **0**). The right edge is the target only in the single case `target === 1`.

The consequence is not cosmetic. `:81-82` binds the settle animation to that line:

```html
<div class="spring-target-line settle-pulse"
     :class="{ 'settle-pulse--fire': demo.liveSettled.value }" ...>
```

`:357-361` calls this "the instrument confirming *locked*". So: drag the ball to 0.3, wait for `liveSettled`, and the instrument confirms the lock by flashing a dashed line at 1.0 — 70% of the rail away from where anything happened, while the actual resting position is marked by an entirely different, *un-pulsing* primitive. An instrument that signals state at the wrong coordinate is worse than one that signals nothing.

Note the plot's target line (`SpringTrace.vue:23`, `y1="20"`) is **legitimately** fixed — in the plot, y = 1 genuinely is a constant axis. The defect is confined to the rail, where the axis is user-mutable.

**Falsifier.** (a) `demo.target` is pinned to 1 — killed by `useSpringDemo.ts:294-300` + the three keyboard branches at `SpringTarget.vue:258-266`. (b) The rail line is meant as a fixed *scale reference* (the "100%" tick), not the target — that reading is available, but then it must not carry the settle animation, and `:75-79` explicitly asserts the target reading. Either way the file contradicts itself. (c) `liveSettled` never becomes true off target=1 — killed, `settled` is a solver predicate on `(value, velocity)` vs whatever target is set, `progress.ts:195-197`.

---

## 2. MAJOR

### D-3 · MAJOR · The `prefers-reduced-motion` block is a no-op that manufactures the appearance of compliance

`:462-469`:

```css
@media (prefers-reduced-motion: reduce) {
    .settle-pulse--fire { animation: none; }
    .derby-lanes       { animation: none; }
}
```

Two facts kill this block's value.

**(a) It is redundant.** glass-ui's `dist/styles/utilities/a11y-overrides.css` — reached through `@import "@mkbabb/glass-ui/styles"` (`style.css:3`) → `styles/index.css` → `accessibility.css` → `a11y-overrides.css` — already ships:

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}
```

`!important` on a universal selector. Both of the local `animation: none` declarations were already dead. The two things the block suppresses are a **220 ms** border-colour pulse (`:376`) and a **220 ms** opacity fade (`:415`).

**(b) It suppresses none of the component's actual motion.** The dominant motion is imperative, not CSS: a 60 Hz rAF loop (`useSpringDemo.ts:191-246`) writing `el.style.transform` for the live ball, the sampler ball, and four derby balls (`SpringTarget.vue:198-226`). No PRM query touches it. `grep -rn "prefers-reduced-motion\|useMediaQuery" demo/scenes/spring/ demo/composables/` returns only the three `@media` blocks in the SFCs — zero JS gates in this scene's runtime.

And the engine ships the exact opt-in that would fix it: `SpringProgressOptions.respectReducedMotion` (`src/animation/physics/spring/types.ts:66`), consumed at `progress.ts:154/218/233/386` via `withReducedMotion(...)` which snaps to target with zero velocity. It **defaults to `false`** (`src/animation/constants/defaults.ts:87`, `types.ts:119`), and none of `useSpringDemo`'s five `new SpringProgress({...})` constructions (`:90-97`, `:102-110`, `:325-333`) passes it. The library under test provides the honest path; its own showcase declines it and then advertises a PRM block that only reaches the decorations.

**Contradicts the hitherto corpus.** `lane-frontend.md §6.5` counts `scenes/spring/SpringTarget.vue:462` among "13 enforcement sites" and rates coverage "conscientious but inconsistent in mechanism". Against the tree that count is too generous for this site: the site exists, enforces nothing that was not already enforced, and leaves the scene's principal motion untouched. Recommend the census line be qualified rather than deleted — the other nine CSS sites were not re-audited here.

**Falsifier.** (a) A PRM gate exists upstream in `useSweepScene`/`usePainterRegistry`/`useSceneVisibilityPause` — not found by grep over `demo/composables/`; if one is added later this finding dies. (b) The scene never autoplays so PRM is moot — partially true and worth crediting (`SpringScene.vue:194` `autoPlays: false`, a genuinely good decision, see SL-3), but PRM is about motion the user *did* trigger too, and pressing Play or tapping the rail starts an unbounded ping-pong sweep. (c) glass-ui's global rule reaches the rAF path — it cannot; `!important` CSS cannot constrain a `style.transform` write.

---

### D-4 · MAJOR · Every derby lane label fails WCAG AA in light theme; the repo's own AA-solved idiom was available and not used

`:448-455`:

```css
.derby-lane-tag {
    color: color-mix(in srgb, var(--ball-tone, var(--color-progress)) 90%, var(--foreground));
    opacity: 0.85;
}
```

A 90% saturated-hue / 10% ink mix, then knocked back 15%. Computed against `--card` (light `hsl(30 85% 96%)` = `#fdf5ec`, dark `hsl(26 22% 17%)` = `#352a22`; glass-ui `tokens/color-radius.css` + `theme/literals.css`), with the lane tones resolved from `design-idioms.css:28-31` and `style.css:130-131`:

| lane | tone | light CR | dark CR |
|---|---|---|---|
| smooth | `--rainbow-blue` `#308ce8` | **3.03** | **3.61** |
| snappy | `--rainbow-green` `#26d944` | **1.92** | 5.83 |
| bouncy | `--rainbow-violet` `#e64ce6` | **2.94** | **3.76** |
| gentle | `--color-progress` (`--accent-kf`) | **3.93** | 4.91 |

Text size is `text-mono-caption` → `--type-caption` = `clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = 12–16px, weight 400. That is *normal* text: the AA floor is **4.5:1**. Four of four lanes fail in light; two of four fail in dark. `1.92:1` is the worst measured ratio anywhere in the component.

This is not a hard problem the component lost to — the repo already solved it. `design-idioms.css:213-229` documents the fix as load-bearing:

```
AA-CONTRAST (load-bearing): the tint paints --badge-tone at --badge-tint (14%); the
text pushes it toward --foreground at --badge-text-mix (50%) so it reads ≥4.5:1
against the tint in both themes.
```

Measured, that idiom delivers **7.58:1** light / **6.33:1** dark for `.settled-badge` and **5.97 / 8.17** for `.tracking-badge` — and `SpringTarget.vue:44-47` consumes it correctly, 400 lines above the rule that ignores it. The derby tag re-derived a colour formula from scratch (90/10 instead of 50/50, plus an opacity multiplier the idiom does not have) and landed 2.3–3.1 CR points short.

**Falsifier.** (a) The tags are decorative — `aria-hidden="true"` is on the wrapper (`:107`), but the tags render the preset name and its ζ, which is the only place the derby's four curves are identified; 1.4.3 exempts *pure decoration*, not information the sighted user is expected to read. (b) The true backdrop is the glass plate, not `--card` — correct, and the plate composites the app background through `backdrop-filter`; the exact figure is therefore **UNPROVEN-NEEDS-LIVE**. But the direction is robust: `--card` and `--background` differ by only 0.013 in OKL (`0.974` vs `0.987`) and a saturated `#26d944` cannot reach 4.5:1 against *any* plate in the light family. (c) The overlay is transient (~2.4s per `useSpringDerby.ts:89-108`) — reduces exposure, does not change conformance.

---

### D-5 · MAJOR · The scene's signature feature is pointer-only and invisible to assistive tech

The derby is reachable by exactly one gesture. `useDoubleTap` (`:247-252`) binds `pointerdown`/`pointermove`/`pointerup` on the rail (`useDoubleTap.ts:59-83`) and nothing else. The rail's keyboard handler (`SpringTarget.vue:254-268`) covers `ArrowRight`/`ArrowUp`/`ArrowLeft`/`ArrowDown`/`Home`/`End` — no `Enter`, no `Space`, no derby key. `grep -rn "derby" demo/ --include=*.ts --include=*.vue` outside `scenes/spring/` returns exactly one hit, a prose mention in `useDoubleTap.ts:6` — no global shortcut is registered for it.

Simultaneously the entire overlay carries `aria-hidden="true"` (`:107`), so even a user who triggers it by other means gets no announcement that four solvers just launched, no lane names, no ζ values, and no notice when it ends.

So: keyboard-only → cannot trigger. Screen reader → cannot trigger *and* cannot perceive. The component's own header calls it "A discovered double-tap gesture egg" (`:173`) and records that "the on-stage legend layer was retired at T.M" (`:173`) — i.e. the one affordance that hinted at it was deliberately removed, leaving no discovery path at all for two whole input classes.

**Falsifier.** A shortcut registered through `@mkbabb/glass-ui/keyboard` (`registerShortcut`, used at `EditorShell.vue:122`) that dispatches the derby — grepped, absent. Or: an easter egg is by definition undiscoverable and equality-of-discovery is not owed — a defensible design position for *discoverability*, but it does not license `aria-hidden` on a live region of the stage, nor an input-modality gate. If the owner rules "eggs are pointer-only by design", D-5 reduces to the `aria-hidden` half.

---

### D-6 · MAJOR · The stage has no heading — and the sibling scene proves it should

`:35-37`:

```html
<span class="text-display text-foreground truncate leading-none">
    SpringProgress
</span>
```

The scene title is a `<span>`. There is no `<h1>`–`<h6>` anywhere in `demo/scenes/spring/` (grepped across all seven files). The Card carries no `aria-label`, no `role="region"`, no `aria-labelledby`. A screen-reader user navigating by heading or by landmark passes straight over the entire stage; the first thing they can land on is the rail's `role="slider"` with the label "Drag to re-seat the spring target" — an instruction with no subject.

The sibling stage card is the counter-example, at the identical visual rung: `demo/scenes/easing/EasingTarget.vue:22-28` wraps its title in `<header class="gallery-header">` + `<h2 class="specimen-name text-display text-foreground">`. Same `text-display` utility, same `text-foreground`, same structural role — one semantic, one not. This is intra-repo divergence, not a house style.

**Falsifier.** An ancestor supplies the heading — `App.vue` / `EditorShell.vue` / `SpringScene.vue` were grepped for `<h1|<h2|<h3`; the only hits in the demo tree are `EasingTarget.vue:24`, `TimingFunctionPanel.vue:14`, `EditorStartScreen.vue:27/40/45`, `KeyboardShortcutsModal.vue:12`. None is in the spring chain. Or: the stage is a canvas-like widget for which a heading is inappropriate — then it needs `role="group"` + `aria-label`, which it also lacks.

---

### D-7 · MAJOR · The derby's overshoot — its entire payload — is clipped and then overprinted by its own label

Two independent occlusions land on the same 12.8px ball at the same moment.

**Clipping.** `:222` allows `clamp(v, 0, 1.18)` so the bouncy ball rides to 118 cqw, 18% past its lane's right edge. `.derby-lane` sits inside the same `max-w-3xl` column inside the same `overflow-hidden` Card as D-1. At 375px viewport (`W ≈ 327px`, `pad = 24px`) the ball's centre exits the Card's padding box at ≈107.3 cqw — so only ~40% of the sanctioned overshoot is ever drawn, and the ball is fully gone past ≈113 cqw.

**Overprinting.** `.derby-lane-tag` is `position: absolute; right: 0; top: -0.65rem` (`:448-451`) and is the **last** positioned sibling in the lane (`:115-122`: rail → ball → tag), so it paints on top. Geometry, all from the file:

- lane height `0.9rem` = 14.4px (`:419`); rail centred at +7.2px (`:429-431`)
- ball `--ball-size: 0.8rem` = 12.8px with `margin-top: calc(var(--ball-size) / -2)` (`:437-442`) → spans **[0.8, 13.6]** px in the lane
- tag: `--type-caption` ≈ 14.4px at a 1440px viewport, `--type-leading-body: 1.5` (glass-ui `typography/scale.css`) → 21.6px line box at −10.4px, half-leading 3.6px → ink spans **[−6.8, 7.6]** px

Vertical overlap of tag ink and ball = **[0.8, 7.6]**, i.e. 6.8 of the ball's 12.8px. Horizontally the tag is flush right and ~70–90px wide, so it covers the last ~10–25% of the lane — precisely the region the winning ball occupies. The ζ label sits on top of the event it labels.

The doc-comment states the intent plainly (`:96-103`): "bouncy (ζ=0.45) rings PAST it… the overshoot is the point." The layout removes the point.

**Falsifier.** (a) The tag is short enough to clear the ball — no: `right: 0` guarantees the tag's *right* edge coincides with the lane's right edge, which is where the ball finishes; tag width only changes how much is covered, never whether. (b) The stage card is wide enough that `slack` absorbs the 18% — same wide-desktop escape as D-1, **UNPROVEN-NEEDS-LIVE** for that regime; decided by source for the narrow regime. (c) The tag's ink box is smaller than computed — the leading token is published (`--type-leading-body: 1.5`) and the tag sets no `line-height`; the only way out is a `line-height` inherited from an ancestor, and none of the ancestors in this subtree sets one.

---

### D-8 · MAJOR · The value axis and the drag affordance are below the 1.4.11 non-text floor

WCAG 1.4.11 asks 3:1 for "parts of graphical objects required to understand the content". Computed against `--card` in both themes, with alpha composited (`color-mix(… X%, transparent)` over the plate):

| element | site | light CR | dark CR |
|---|---|---|---|
| `.progress-rail` (8% tone) | `design-idioms.css:174` | **1.11** | **1.15** |
| `.spring-target-marker` (the ghost target, 50%) | `:329` | **1.99** | **2.54** |
| `.spring-target-line` (35%) | `:368` | **1.59** | **1.92** |
| `.derby-lane-rail` (22%) | `:434` | **1.27** | **1.31** |
| `.stage-field-x` gridlines (`--border`) | `design-idioms.css:205-211` | **1.87** | **1.99** |
| `.sampler-ball` (65%) | `:353` | **2.53** | 3.31 |
| `.progress-ball` live (solid) | `design-idioms.css:184` | 4.63 | 5.77 |

Only the live ball clears 3:1. The **ghost target marker at 1.99:1 is the worst-placed failure**: it is the sole visual feedback for the rail's primary gesture ("Tap or drag the rail", `:126-130`) — the user drags, and the thing that tells them *where they dragged to* is a ring at twice-background luminance. Under the derby state it is worse still: `.spring-rail--derby` drops `.progress-rail`, `.spring-ball` and `.spring-target-marker` to `opacity: 0.35` (`:381-386`), taking the rail to **1.035:1** — indistinguishable from the plate.

The 8% rail tint is inherited, not invented — `:308-317` records it as EasingTarget's "canonical lineage (rail-tint 8%…)", superseding this scene's former 12%. So this is a *cross-scene* idiom defect the component adopted, which is worth saying plainly: the consolidation traded a 50%-higher-contrast rail for uniformity and nobody measured the result.

**Falsifier.** (a) The glass plate is darker/lighter than `--card` in situ — true, so the exact figures are **UNPROVEN-NEEDS-LIVE**; but an 8% tint of *any* colour over *any* plate cannot exceed ~1.2:1, so the rail finding is backdrop-independent. (b) 1.4.11 exempts these as decorative because the ball alone communicates position — arguable for `.stage-field-x` and `.spring-target-line`; **not** arguable for `.spring-target-marker`, which has no redundant encoding and is the only feedback for a drag. (c) The `--border` gridline value is glass-ui's, so it is the design system's floor, not the component's — accepted as mitigation for that row only.

---

## 3. MINOR

### D-9 · MINOR · `6cqi` has no query container; the bespoke display rung buys nothing

`:287-296` invents a type rung:

```css
.spring-readout-primary {
    font-size: clamp(2.25rem, 6cqi, 3.25rem);
    font-weight: var(--font-weight-semibold, 600);
    letter-spacing: -0.01em;
}
```

`cqi` resolves against the nearest ancestor **query container**. The ancestors are `span → div.flex.flex-col → div.flex.max-w-3xl → Card`. Every `container-type` declaration in the subtree is on a *non-ancestor*: `.spring-rail`/`.sampler-track` (`:305`) and `.derby-lane` (`:424`). `layout.css` declares none; `style.css:238-240` defines a `.container-inline-size` utility that is not applied here; glass-ui's only card-side `container-type` is on `.card-header` (`components/card/styles.css`), which this markup does not use. Per CSS Containment L3, with no eligible container the unit falls back to the **small viewport** size.

So `6cqi` ≡ `6svw`: 22.5px at 375w (clamps to the 36px floor), 86.4px at 1440w (clamps to the 52px ceiling). The middle term is live only across a ~600–867px band. The rung is therefore a two-value step keyed to the *viewport*, not the card — the opposite of what a `cqi` author intends, and it duplicates the published `--type-display-2` (`clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` = 32.9–53.3px) to within 3px at both ends.

The magic-number hygiene note at `:289-291` ("the `650` magic weight dies; weights step the ladder") shows the file already accepts this class of argument — it just stopped one declaration short.

**Falsifier.** A `container-type` on the Card root or an ancestor set by a class this audit did not resolve. `Surface-DOHf5u2R.js` was read: the root emits `data-slot/data-material/data-tier/data-surface/…` and a `glass-*` tier class, none of which carries `container-type` in `glass/ladder.css`. If one appears, the finding dies and the clamp becomes correct.

### D-10 · MINOR · Two structurally identical label rows, two different gaps, 20px apart

- `SpringTarget.vue:135` — `<div class="flex items-center justify-between mb-2">` above the sampler track
- `SpringTrace.vue:10` — `<div class="flex items-center justify-between mb-1">` above the plot

Same construction (a `text-small` label left, a `text-mono-caption` tabular readout right), same column, stacked directly on one another, 8px vs 4px. Nothing in either file explains the difference. Aristotelian proportion asks that like relations take like intervals; these are the *same* relation.

**Falsifier.** The plot's `overflow: visible` SVG (`SpringTrace.vue:107`) needs the tighter gap because the ζ=0.2 crest reaches y≈1.0 in a 0–60 viewBox — a real consideration (see SL-2), but it argues for *more* clearance, not less.

### D-11 · MINOR · The Card has zero vertical padding, `overflow-hidden`, and no overflow strategy

`:12` — `class="… h-full w-full px-6 lg:px-8 overflow-hidden"`. Inline padding only. The sibling declares both: `EasingTarget.vue:12-14` — `px-4 py-4 lg:px-6`.

The content stack is four blocks separated by `gap-8` (32px), of which three carry `shrink-0` (`:33`, `:134`, `SpringTrace.vue:9`) and one — the rail block (`:55`) — does not, but contains a fixed `h-12` rail so it cannot absorb pressure either. Summed intrinsic height ≈ 400–430px. `SpringScene.vue:8-12` gives the card `h-full` of a `flex-1 min-h-0` cell, so on a short stage (landscape phone; any viewport once the bottom dock and top band are subtracted) the stack exceeds the box and is cut **flush at the card edge**, with no fade, no scroll, and no `min-height` floor. `justify-center` means it clips symmetrically — the header readout and the trace plot go first, i.e. the two things a viewer needs to read the instrument.

**Falsifier.** The stage cell guarantees ≥ ~450px in every supported layout — plausible on desktop, **UNPROVEN-NEEDS-LIVE** for landscape phone. The *absence* of any strategy (no `overflow-y-auto`, no `FadingScroll` — which this repo owns and `EasingTarget.vue:137` imports) is decided by source.

### D-12 · MINOR · Five colour claims in the prose are false against the tokens

`style.css:155-163` repointed the motion authority: `--color-progress: var(--accent-kf)`, the violet (`light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` = `#7e5acc` / `#be95ec`), with the stated purpose "so **red exits the chrome entirely**". The component's prose never followed:

| site | claim | truth |
|---|---|---|
| `SpringTarget.vue:272-276` | "the spring icon's rest dot IS the **progress green** … the already-consistent identity is now a declared fact the clause-a oracle reads" | `--color-progress` is violet; the sentence asserts an identity that does not hold |
| `SpringTarget.vue:102-103` | "the page rests as one calm **red** spring" | violet |
| `SpringTarget.vue:357-360` | "ONE quiet **red-dashed** pulse" | violet |
| `SpringTrace.vue:100-101` | "the trace wears the scene's **red** identity" | violet |
| `useSpringDerby.ts:9` | "gentle → **red** (`--color-progress`…)" | violet |

`:272-276` is the load-bearing one: it does not merely mis-name a colour, it justifies the whole `--ball-tone` seam on a false premise ("the spring icon's rest dot IS the progress green"), which is exactly the kind of rationale a later maintainer will trust rather than re-derive.

**Falsifier.** An override repoints `--color-progress` inside the spring subtree — `:277-279` sets only `--ball-tone: var(--color-progress)`, no repoint. Or the `spring.svg` asset really is green and the comment describes the *icon*, not the token — then the sentence's conclusion ("so the tone seam binds to the canonical `--color-progress`") is a non-sequitur rather than a falsehood.

### D-13 · MINOR · The tone seam the file declares is not the seam it uses

`:272-279` names `--ball-tone` "the scene's **ONE** colour consumer", and `:327-329` congratulates `.spring-target-marker` for reading it ("the rule stays seam-coherent"). Three rules in the same file, and every rule in the child, bypass it:

- `:368` `.spring-target-line` → `var(--color-progress)` direct
- `:387-396` `@keyframes spring-settle-pulse` → `var(--color-progress)` ×3
- `SpringTrace.vue:109/122/127` `.plot-target-line`/`.plot-trace` → `var(--color-progress)` direct

Today these resolve identically, so there is no visual defect. The defect is that the seam is **not a seam**: setting `--ball-tone` on `.spring-target` would re-tone the ball, the marker, the rail and the sampler, and leave the target line, the settle pulse and the entire plot on the old hue — a half-recoloured instrument. This also compounds `lane-frontend.md §6.3`'s flat-namespace hazard: 98 unprefixed demo custom properties with no `--kf-*` namespace, of which `--ball-tone` is one that *looks* like a contract and is not enforced as one.

**Falsifier.** `SpringTrace` is out of the seam's scope by design — it is a DOM descendant of `.spring-target` (`:152`), so `--ball-tone` cascades into it; declining to read an inherited variable is a choice, not a boundary.

### D-14 · MINOR · The one discrete state change in the scene is silent to AT

`:44-47` renders `settled` ↔ `tracking` as a `<span class="status-badge …">` with no `role="status"`, no `aria-live`. It is the only *discrete* state in the component and the only thing worth announcing.

The surrounding restraint is correct and should be preserved: `liveValue`/`liveVelocity` flush at `PROGRESS_READOUT_HZ = 6` (`demo/utils/rafConstants.ts:15`) and are *rightly* not live regions — a 6 Hz numeric firehose would be unusable. The gap is that the one low-frequency, high-salience transition inherited the same silence.

**Falsifier.** The rail's `role="slider"` already conveys settle indirectly — it does not; `aria-valuenow` (`:67`) tracks `demo.target`, the *commanded* value, which does not change when the spring settles.

---

## 4. INFO

### D-15 · INFO · Three decimals at a 36–52px display rung, refreshed 6×/s

`:40` — `{{ demo.liveValue.value.toFixed(3) }}` at `clamp(2.25rem, …, 3.25rem)`. At `PROGRESS_READOUT_HZ = 6` the third decimal changes every frame of the readout and is never resolvable; the second is marginal. `tabular-nums` (declared twice — the class at `:40` and `font-variant-numeric` at `:295`) correctly prevents width jitter, so this is legibility, not layout. Two decimals would carry the same information with a calmer surface. Registered INFO because "how many decimals" is a taste call the owner may have made deliberately — the U-K18 note at `:26-32` argues for the promotion but says nothing about precision.

### D-16 · INFO · The quarter-tick field draws four lines, not three

`:57-59` describes `.stage-field-x` as "vertical quarter ticks at 0.25/0.5/0.75 of the target axis". The implementation (`design-idioms.css:205-211`) is `repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px calc(100% / 4))` — period 25%, so lines land at **0%**, 25%, 50%, 75%. The 0% line coincides with the rail origin and the live ball's rest position. Harmless; recorded because the prose is the only spec for the primitive.

---

## 5. SUPERLATIVES (L-18 runs both ways)

### SL-1 · The hot painter path is textbook, and it is *complete*

`:191-227` + `useSpringHotPath.ts:83-98` take the 60 Hz positional path off the Vue render graph (direct `el.style` writes through a painter registry) **and** off layout, by positioning with `transform: translateX(<cqw>)` rather than `left`. The `cqw` half is the part most implementations get wrong, and here it is closed: every ball's *direct positioning ancestor* declares `container-type: inline-size` — `.spring-rail`/`.sampler-track` at `:298-306`, `.derby-lane` at `:417-425` — so the value axis is rail-relative with zero per-frame `getBoundingClientRect`. `will-change: transform` is set on exactly the three continuously-moving elements (`:345`, `:354`, `:443`) and nowhere else. Both halves of the reasoning are written down at `:200-205`. This is the single best-engineered thing in the file.

**Falsifier (checked).** If any of those three containers were missing, `cqw` would silently fall back to the viewport and every ball would drift out of its rail — the exact failure mode D-9 documents for `cqi` one selector away. All three are present; verified line by line.

### SL-2 · The plot's viewBox is proportioned to the worst case the sliders can produce

`SpringTrace.vue:82-84` maps value→y with `Y_TARGET = 20`, `Y_ZERO = 56` in a 0–60 box: 36 units below the target line, **20 above**, i.e. headroom for an overshoot of `20/36 = 0.5556`. The ζ slider's floor is 0.2 (`SpringPhysicsFacet.vue:42`), whose peak overshoot is `exp(−π·0.2/√0.96) = 0.5266`. The trace crests at y ≈ 1.03 — inside the box, with **5% margin**. The `preserveAspectRatio="none"` + `vector-effect: non-scaling-stroke` pairing (`:19`, `:112/118/126`) then keeps the stroke weight uniform under the horizontal stretch, so the crest reads at constant ink.

**Falsifier / latent fragility.** The margin is undocumented and unguarded: at ζ ≈ 0.167 the crest reaches y = 0, and below that it draws outside the box (`overflow: visible`, `:106`) into the label row 4px above. Nothing couples the slider floor to the viewBox. Cite this if the ζ range is ever widened.

### SL-3 · `autoPlays: false` — the honest answer to a measured regression

`SpringScene.vue:187-194` records that the sampler formerly "swept forever at idle, burning ~33% of a core (90 layouts/s) with no gesture", and fixes it by gating the rAF loop on the scene machine so a paused-on-entry scene issues **zero** ticks. The scene rests until the user acts. This is the correct answer both for CPU and for WCAG 2.2.2 (Pause, Stop, Hide), and it removes the strongest argument that would otherwise escalate D-3 to BLOCKER — reduced-motion users are not ambushed on arrival, only after they opt in.

### SL-4 · Drag and double-tap coexist on one element without fighting

`useDoubleTap.ts:70-83` resets the pending tap the moment the pointer exceeds a 12px slop (`:65-67`), so a rail scrub can never be laundered into a double-tap; `useDragScrub.ts:112-147` owns pointer capture, swallows the iOS `setPointerCapture` throw (`:119-123`), and clears its global select-suppression token on `pointerup` **and** `pointercancel` (`:141-147`) so an OS gesture takeover cannot strand `body.is-dragging` and freeze document selection. Two gesture recognizers, one element, both reference-counted and both cancel-safe. Most demo code has neither property.

### SL-5 · The one focus class chosen is the one with a forced-colors fallback

`:63` composes `.focus-ring`, whose implementation (`design-idioms.css:76-79`) is `box-shadow` + `outline: none` — normally a Windows-High-Contrast trap, because forced-colors mode forces `box-shadow` to `none` and the indicator would vanish on the component's only focusable control. It does not, because glass-ui ships the counterpart: `dist/styles/utilities/a11y-overrides.css` names `.focus-ring:focus-visible` explicitly under `@media (forced-colors: active)` with `outline: 2px solid Highlight; outline-offset: 2px`, reached through `styles/index.css → accessibility.css`. The component consumed the sanctioned class rather than rolling a local ring — and that is the entire reason the focus indicator survives.

**Falsifier (checked).** Had the file written its own `:focus-visible { box-shadow: … }`, this would be a BLOCKER. It did not. Verified in the installed 7.0.0 tree.

---

## 6. KILLED CANDIDATES (filed so the next auditor does not re-raise them)

| candidate | why it died |
|---|---|
| **`.focus-ring` is `box-shadow`-only → no focus indicator in forced-colors** | glass-ui `dist/styles/utilities/a11y-overrides.css` restores `outline: 2px solid Highlight` for that exact selector, and `styles/index.css` imports `accessibility.css`. Recorded as SL-5 instead. |
| **The header comment's `tier="resting" surface="glass"` is a lie — neither prop is passed** | It is true by default. `Surface-DOHf5u2R.js` shows `material: { default: "elevated" }`, `surface: { default: "glass" }`, and the material→tier map `{ content:"quiet", elevated:"resting", … }`, so an unpropped `Card` resolves to `data-tier="resting"`, `data-surface="glass"`. Comment verified correct. |
| **The four ζ tags collide vertically at the right edge** | Lane pitch is 20px (`0.9rem + 0.35rem`); tag *line boxes* overlap by 0–4px depending on viewport, but with `--type-leading-body: 1.5` the half-leading is 3.6px, so the **ink** boxes clear by ≥1.8px at every viewport in the caption clamp's range. Line-box overlap is not glyph collision. The ball-occlusion half of the original claim survives as D-7; the tag-vs-tag half is withdrawn. |

---

## 7. Provenance & limits

Every colour figure was computed from published token literals — `glass-ui/dist/styles/tokens/color-radius.css`, `theme/literals.css`, `typography/scale.css`, `typography/semantic.css`, `typography/utilities.css`, plus `demo/styles/style.css:130-131` and `design-idioms.css:15-31` — using sRGB relative luminance (WCAG 2.x) and OKLab/OKLCh for hue separation. The compositing model is `color-mix(… X%, transparent)` over the nominal plate; the *glass* plate's true in-situ luminance depends on `backdrop-filter` over the live app background and is therefore marked **UNPROVEN-NEEDS-LIVE** wherever a figure sits within ~0.5 CR of a threshold. Findings whose direction is threshold-independent (D-4's 1.92, D-8's 1.11) are asserted without that caveat.

No browser tooling was used. No file in keyframes.js, glass-ui or value.js was written, mutated, or executed; the sole write of this task is this document. `/Users/mkbabb/Programming/keyframes.js` was treated as read-only evidence throughout, including its `node_modules` and `src/` trees.
