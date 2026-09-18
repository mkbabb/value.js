claude-opus-5[1m]

# CHALLENGE · `SpringScene` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringScene.vue` (204 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every contrast figure below is COMPUTED from the resolved token chain (script + method in §0.2); nothing is eyeballed.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries a severity, a `file:line`, and its own falsifier. Superlatives carry falsifiers too (L-18 both ways).

**Tally: 27 defects (2 BLOCKER · 9 MAJOR · 9 MINOR · 7 INFO) · 6 superlatives.**

---

## 0. Scope + method

### 0.1 Read set

`SpringScene.vue` imports, and all were read whole:

| import | file |
|---|---|
| `PlaybackRibbon` | `demo/components/playback/PlaybackRibbon.vue` (244L) |
| `SpringTarget` | `demo/scenes/spring/SpringTarget.vue` (470L) |
| `StartingStyleTarget` | `demo/scenes/spring/StartingStyleTarget.vue` (216L) |
| `SpringPhysicsFacet` | `demo/scenes/spring/SpringPhysicsFacet.vue` (242L) |
| `useSpringDemo` | `demo/scenes/spring/useSpringDemo.ts` (499L) |
| `SPRING_DEMO_KEY`, `SPRING_SCENE_ID` | `demo/scenes/spring/springKeys.ts` (11L) |
| `Button` | `node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts` + `dist/button-B7c944jy.js` |

Read transitively for token/behaviour resolution: `useSpringDerby.ts`, `useSpringHotPath.ts`, `springPresets.ts`, `SpringTrace.vue`, `useSweepScene.ts`, `state/sceneMachine.ts`, `app/scene/useSceneMachineShellBinding.ts`, `app/App.vue`, `styles/design-idioms.css`, `styles/playback-idiom.css`, `styles/style.css`, and glass-ui's `styles/tokens/light-dark.css`, `styles/typography/semantic.css`, `styles/theme/radius.css`.

### 0.2 Contrast method

Token chain resolved from source, then composited:

```
--color-progress → --accent-kf          (style.css:163)
--accent-kf      = light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))   (style.css:130)
--card           = light-dark(hsl(30 85% 96%), hsl(26 22% 17%))             (glass-ui tokens/light-dark.css)
--foreground     = light-dark(hsl(24 10% 10%), hsl(30 14% 90%))
--muted          = --neutral-1 = light-dark(hsl(38 26% 95%), hsl(28 12% 11%))
--muted-foreground = --neutral-5 = light-dark(hsl(30 22% 40%), hsl(34 14% 62%))
--rainbow-blue/green/violet = hsl(210 80% 55%) / hsl(130 70% 50%) / hsl(300 75% 60%)  (design-idioms.css:18-20)
```

`color-mix(in srgb, A p%, transparent)` is composited over the plate as straight alpha; `color-mix(in srgb, A p%, B)` as a gamma-sRGB mix; WCAG 2.x relative luminance for the ratio; OKLab ΔE for hue-separation. Resolved `--color-progress` = **`#7e5acc`** (light) / **`#be95ec`** (dark).

Type rungs from glass-ui `typography/semantic.css` (load-bearing for the "large text" 3:1 exemption):

| utility | family | size | weight |
|---|---|---|---|
| `text-display` | `--font-display` | `--type-display-1` clamp(1.618rem → 2.618rem) | `--type-weight-display` |
| `text-heading` | `--font-text` | `--type-heading` **1.618rem fixed** | **700** |
| `text-body` | `--font-text` | `--type-body` clamp(1rem → 1.375rem) | **400** |
| `text-mono-caption` | mono | `--type-caption` clamp(0.75rem → 1rem) | — |
| `.btn-playback` | inherited | `--type-body` | **500** (playback-idiom.css:24-29) |

---

## 1. BLOCKERS

### D-1 · BLOCKER · the scene's primary CTA fails WCAG 1.4.3 AA in both themes, and fails *worse* on hover

`.btn-playback-accent` paints `color: var(--color-progress)` on `background: color-mix(in srgb, var(--color-progress) 20%, transparent)` — the accent hue on a 20% wash of *itself*.

- `demo/styles/playback-idiom.css:31-33` (rest) and `:47-52` (hover, 32%)
- worn by the spring's Play/Pause cell — `demo/components/playback/PlaybackRibbon.vue:30`, mounted by `SpringScene.vue:108-129`
- and by the discrete face's domain verb — `SpringScene.vue:144` (`class: "btn-playback btn-playback-accent"`) and its on-stage twin `StartingStyleTarget.vue:42`

Computed (label is `--type-body` = 16px at base, weight 500 → **small text**, 4.5:1 required; it never reaches the 24px / 18.66px-bold large-text exemption at any clamp position):

| plate | rest | hover (32%) |
|---|---|---|
| light over `--card` | **3.58:1** ✗ | **3.03:1** ✗ |
| light over `--background` | **3.70:1** ✗ | **3.12:1** ✗ |
| dark over `--card` | **4.02:1** ✗ | **3.19:1** ✗ |
| dark over `--background` | 6.00:1 ✓ | 4.56:1 ✓ |

The ribbon is hosted inside a Card/Drawer surface (`App.vue:65-71` → `RibbonBar`/`ControlsPaneWrapper`), so `--card` is the operative plate in three of four cases. The hover state — the moment the control is under the pointer and most needs to read — is the worst cell in the table.

**Falsifier:** the plate under the ribbon resolves darker than `--card` in light mode (an opaque dark chrome band), **or** glass-ui's `Button` sets a `color` that out-specifies the unlayered `.btn-playback-accent` rule. Both are checkable: `playback-idiom.css` is imported outside `@layer` (`design-idioms.css:6` inside an un-layered file), so it wins over glass-ui's layered component styles — the `color` does land. A live paint-sample of the rendered button + its backdrop would settle the plate question. *(UNPROVEN-NEEDS-LIVE: the exact backdrop under the ribbon in the mobile drawer.)*

---

### D-2 · BLOCKER · the on-stage instruction is inoperative in the state the scene is born in

SpringTarget prints, under the rail, as the scene's one instructional sentence:

> `demo/scenes/spring/SpringTarget.vue:126-130` — "Tap or drag the rail — the ball springs to the new target."

At entry that sentence is false. The chain:

1. `SpringScene.vue:194` exposes `autoPlays: false` ("the scene RESTS on entry").
2. `useSceneMachineShellBinding.ts:206-207` — with `autoPlays !== true` and no `autoPlayNext`, **no `PLAY` is dispatched**.
3. `sceneMachine.ts:123-125` — `SCENE_READY` returns `snap.playing ? "playing" : "paused"`, and `freshSnapshot()` (`:95-100`) is `playing: false`. **Status = `paused`.**
4. `useSpringDemo.ts:294-300` — `reseat()` sets `liveSpring.target` and calls `startLoop()`.
5. `useSweepScene.ts:80-85` — `startLoop` arms the rAF and calls `frame`.
6. `useSpringDemo.ts:197-206` — `frame()` sees `machine.status.value !== "playing"`, calls `flushReadouts()` + `paintScrubberPhase()`, and **returns `false`** — before `liveSpring.tickDt(dt)` (`:214`) and before `repaintSprings()` (`:232`).
7. `useSpringHotPath.ts:102-114` — `flushReadouts` writes reactive refs only; it never runs a painter.

Net observable at rest: the dashed ghost marker moves (`SpringTarget.vue:87-90`, a reactive `:style` on `demo.target`), `aria-valuenow` updates (`:67`) — and **the ball's `transform` is never rewritten, and the headline `x` readout stays frozen** (it mirrors `springLive.value`, which was never ticked). Tapping the rail produces a moved ghost and nothing else.

The scene's own comment asserts the opposite:

> `SpringScene.vue:192-193` — "The sampler sweeps + the ball springs the instant the user presses Play **(or taps the rail — `reseat` re-arms the loop directly)**."

`reseat` re-arms the *loop*; the loop is gated on the *machine*, which `reseat` never dispatches to. The parenthetical is wrong, and the on-stage copy inherits the error.

**Falsifier:** any path that leaves the machine at `playing` on first entry to `spring` — a persisted `perScene.spring.playing = true` snapshot surviving a reload, or a home-screen Play gesture setting `autoPlayNext`. Both exist as code paths (`useSceneMachineShellBinding.ts:207`), so the defect is *first-entry / rested-state*, not universal. It is nonetheless the scene's designed default state (`autoPlays: false` is deliberate, `SpringScene.vue:190-193`).

---

## 2. MAJOR

### D-3 · MAJOR · `btn-interactive` is a phantom class — 8 call sites, 0 definitions

```
$ grep -rn "btn-interactive" demo/          → 8 hits, ALL class strings
$ grep -rn "\.btn-interactive\s*[,{:]" demo/ node_modules/@mkbabb/glass-ui/dist/  → (no output)
$ grep -rl "btn-interactive" node_modules/  → (no output)
```

Three of the eight sit on the spring's own surface:

- `SpringScene.vue:167` — the Re-seat transport button
- `SpringPhysicsFacet.vue:74` — every preset cell
- `SpringPhysicsFacet.vue:105` — the re-sample button

There is no `@utility btn-interactive`, no `.btn-interactive` rule, in demo CSS, in any `<style>` block, or in the installed glass-ui `dist/`. Whatever hover/press affordance the author declared for these controls paints nothing. (`SpringPhysicsFacet.vue:209-223` re-authors the hover locally for `.preset-cell`, which is why that one site still animates — the *button* sites `:167` and `:105` do not.)

**Falsifier:** a Tailwind plugin or a `@utility` declaration generating `btn-interactive` from a source I did not grep. I grepped `demo/` and the whole of `node_modules/` for the literal; both are clean.

---

### D-4 · MAJOR · the two faces of the one scene wear two different type systems in the same slot

`SpringScene.vue:10-11` forks the stage between `SpringTarget` and `StartingStyleTarget`. Both open with a header row whose left cell is the plate's title. They do not agree:

| | `SpringTarget.vue:35-37` | `StartingStyleTarget.vue:16` |
|---|---|---|
| utility | `text-display` | `text-heading` |
| family | `--font-display` (Instrument Serif) | `--font-text` (Jakarta) |
| size | `--type-display-1` — **fluid** clamp(1.618rem → 2.618rem) = 25.9→41.9px | `--type-heading` — **fixed** 1.618rem = 25.9px |
| weight | `--type-weight-display` | **700** |

Switching channels therefore cross-fades the plate title between a fluid serif display rung and a fixed bold sans heading rung. The rhythm disagrees too — `gap-8` (`SpringTarget.vue:12`) vs `gap-6` (`StartingStyleTarget.vue:11`) on the same stage plate — as does the overflow strategy (see D-11).

A second-order symptom: the scene has **four** registers for code identifiers across two sibling files — `text-display` serif for `SpringProgress` (`SpringTarget.vue:36`), `text-heading` sans for `@starting-style` (`StartingStyleTarget.vue:16`), `text-mono-caption` for `springLinearStops()` (`:18`), `text-small` for `compileToEntry() artifact` (`:58`), and `.code-token` mono for `response`/`dampingFraction` (`SpringTarget.vue:128-129`). `SpringPhysicsFacet.vue:100-101` states the governing rule — "mono is data, not the UI voice" — which none of the first two obey.

**Falsifier:** a documented rule elsewhere in the tranche that grants a *scene-name* identifier the display rung while an *inline* identifier takes mono. Even under that rule the two plate titles occupy the identical structural slot and would still disagree on family, weight and fluidity.

---

### D-5 · MAJOR · the same verb is on stage twice, simultaneously, in the discrete face

`App.vue` mounts `#ribbon-content` (`:65-71`) and `#target` (`:73+`) as **sibling** slots of the same layout — both are painted at once.

- `SpringScene.vue:138-156` — when `demo.view.value === "discrete"`, `ribbonContent` renders a Button whose label is `demo.visible.value ? "Dismiss" : "Reveal"`, `onClick: () => demo.toggleDiscrete()`.
- `StartingStyleTarget.vue:40-47` — the stage card renders a Button whose label is `visible ? "Dismiss" : "Reveal"`, `@click="toggle"` where `toggle = demo.toggleDiscrete` (`:98`).

Two controls, same label, same icon pair (`Eye`/`EyeOff`), same handler, visible together. And they are not even styled alike: `variant: "outline"` + `btn-playback btn-playback-accent` in the ribbon vs `emphasis="secondary"` + `btn-playback btn-playback-accent shrink-0` on stage — so the duplicate is also a *skin* inconsistency (see D-12 for why `variant` is a no-op).

This is the exact redundancy the neighbouring comment claims to have eliminated: `StartingStyleTarget.vue:64-70` retires a preset picker because "the same four presets were shown THREE times". The K.W4 S5 elision was applied to presets and not to the scene's own primary verb.

**Falsifier:** a host rule that suppresses `#ribbon-content` while the discrete channel is selected. `App.vue:65-71` has only `v-if="sceneRef?.ribbonContent"`, and `SpringScene.vue:135-137` returns `null` only when `selectedControl !== "spring"` — which is the *panel* surface, not the view. No such suppression exists. *(UNPROVEN-NEEDS-LIVE: whether both are in the viewport at once on a short mobile stage; on desktop the rail and ribbon are both persistent.)*

---

### D-6 · MAJOR · the Re-seat button breaks the transport band's own written one-voice law

`PlaybackRibbon.vue` documents the law twice, in the file that owns the band:

> `:38-45` (G7 / H.W10.S2) — every transport cell adopts `h-10` so the row reads equal-height, "for EVERY scene that mounts this ribbon (cube/amiga/easing/spring), **not a per-button magic number**".
> `:46-52` (K.W2 S3) — "the transport band carries ONE voice. Reverse adopts the SAME `.btn-playback` skin as Play/Pause (**was an ad-hoc `text-body` register**)."

`SpringScene.vue:159-177` stacks a third cell directly under that row, inside the same `grid gap-2`, and reinstates precisely what the law killed:

```js
class: "h-8 w-full rounded-full gap-2 text-body btn-interactive",
```

- **`h-8`** = 32px against the row's `h-10` = 40px (`PlaybackRibbon.vue:55`). An 8px height break in a 3-cell vertical stack.
- **`text-body`** = `font-weight: 400` (glass-ui `typography/semantic.css`), against `.btn-playback`'s `font-weight: 500` (`playback-idiom.css:29`). The Re-seat label is visibly lighter than Play and Reverse.
- **no `.btn-playback`** — so it also forgoes the band's shared `:focus-visible` ring (`playback-idiom.css:78-81`), `:active` press-scale (`:82-84`), and accent-family hover (`:66-71`). Note that the scene's *other* domain verb, the discrete Dismiss/Reveal, **does** wear `btn-playback btn-playback-accent` (`SpringScene.vue:144`) — so the scene is internally inconsistent about its own two domain verbs as well.
- **`btn-interactive`** paints nothing (D-3), so the button has no hover/press affordance at all.

**Falsifier:** a rule that gives *domain-extra* cells a deliberately quieter register than the *standard transport* cells. `SpringScene.vue:75-80` does distinguish the two categories in prose — but it argues for their coexistence, not for a different type/height register; and the discrete branch's domain verb contradicts it three lines later.

---

### D-7 · MAJOR · derby lane tags fail AA by up to 2.3×

`SpringTarget.vue:448-455`:

```css
.derby-lane-tag {
    color: color-mix(in srgb, var(--ball-tone, var(--color-progress)) 90%, var(--foreground));
    opacity: 0.85;
}
```

Rendered at `text-mono-caption` (`--type-caption` = 12px at base, `SpringTarget.vue:120`), carrying the only text that identifies which lane is which (`{{ lane.name }} · ζ{{ lane.zeta }}`).

Computed over the stage `--card` plate (4.5:1 required):

| lane | tone | light | dark |
|---|---|---|---|
| snappy | `--rainbow-green` | **1.92:1** ✗ | 5.83:1 ✓ |
| bouncy | `--rainbow-violet` | **2.94:1** ✗ | **3.76:1** ✗ |
| smooth | `--rainbow-blue` | **3.03:1** ✗ | **3.61:1** ✗ |
| gentle | `--color-progress` | **3.93:1** ✗ | **4.91:1** ✓ |

Four of four fail in light; two of four in dark. The `opacity: 0.85` is the aggravating multiplier — the mix is already at 90% of a saturated hue before the alpha knocks it down further.

**Falsifier:** the tag renders over a plate other than `--card` (it is absolutely positioned at `top: -0.65rem` above its lane, `:448-451`, and the lanes overlay the rail inside the stage Card — so `--card` is the correct plate). Or: the derby overlay carries an opaque scrim I did not find (it does not — `.derby-lanes` sets no background, `:404-416`).

---

### D-8 · MAJOR · the categorical lane encoding half-collapses, and three files disagree about the hue

`design-idioms.css:26-31` builds the four "rainbow" lanes:

```css
--spring-lane-bouncy: var(--rainbow-violet);   /* hsl(300 75% 60%)  → #e64ce6 */
--spring-lane-gentle: var(--color-progress);   /* → --accent-kf     → #7e5acc */
```

After the T.D7 / OD-6 repoint of `--color-progress` onto `--accent-kf` (`style.css:163`), **two of the four lanes are violets**. Measured separation:

| pair | Δh (OKLCH) | ΔE (OKLab) |
|---|---|---|
| bouncy ↔ gentle, light | **32.9°** | **0.19** |
| bouncy ↔ gentle, dark | **22.9°** | **0.15** |
| smooth ↔ bouncy (for scale) | 75.8° | 0.27 |
| snappy ↔ gentle (for scale) | 150.2° | 0.44 |

The two lanes the demo most wants a viewer to *contrast* are the two extremes of the physics — bouncy (ζ=0.45, rings past the line) and gentle (ζ=1.0, never crosses) — and they are the closest pair in the palette. In dark mode `#be95ec` vs `#e64ce6` at ΔE 0.15 is below the separation the other pairs hold.

The prose has not tracked the repoint. Within this one scene directory, `--color-progress` is described as three different colours:

- **green** — `SpringTarget.vue:272-275` ("the spring icon's rest dot IS the progress green")
- **red** — `SpringTarget.vue:103` ("the page rests as one calm red spring"), `:357-361` ("one quiet red-dashed pulse"), `StartingStyleTarget.vue:141-143` ("the `--color-progress` token, repointed red by Lane B"), `useSpringDerby.ts:10` ("gentle → red")
- **violet** — `SpringPhysicsFacet.vue:200-206` ("the OD-6 violet authority since T.D7; red is destructive-only"), `PlaybackRibbon.vue:208-216`

Only violet is true (`oklch(… 295)` / `oklch(… 305)`). Six comment sites in the scene's read set instruct the next designer wrongly.

**Falsifier:** a side-by-side render in which the bouncy and gentle lane balls are readily told apart at 0.8rem diameter (`SpringTarget.vue:437`). *(UNPROVEN-NEEDS-LIVE for the perceptual half; the token-level collapse is proven from source.)*

---

### D-9 · MAJOR · `prefers-reduced-motion` is honored only for decoration, never for the substance

The spring scene carries three PRM blocks, and all three gate cosmetics:

| site | what it suppresses |
|---|---|
| `SpringTarget.vue:462-469` | a 220ms `spring-settle-pulse` and a 220ms `derby-fade-in` |
| `StartingStyleTarget.vue:209-215` | the `.discrete-card` transition |
| `SpringHeatmap.vue:333` | a heatmap transition |

There is **zero** PRM gating in the spring's runtime — `useSpringDemo.ts`, `useSweepScene.ts`, `useSpringHotPath.ts`, `useSpringDerby.ts` contain no `matchMedia`, no `useMediaQuery`, no `prefers-reduced-motion` (grep across `demo/scenes/spring/` returns only the three CSS sites above). So under `reduce`:

- the 60 Hz sweep, the chasing ball, the sampler and the four preset-cell balls run at full amplitude once Play is pressed (`useSpringDemo.ts:191-246`, painters at `SpringTarget.vue:197-227` and `SpringPhysicsFacet.vue:151-162`);
- the derby launches a staggered four-lane race with a 110ms cascade and a ~2.5s span (`useSpringDerby.ts:75-113`) — only its *fade-in* is suppressed, never the race;
- the settle-pulse and the lane fade — the two smallest motions on the page — are the only things `reduce` actually removes.

Three sibling scenes do consult PRM in JS: `useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`, `EasingTarget.vue:234`. The spring, whose entire subject *is* motion, is the one rAF scene without a JS gate.

**Mitigation, stated honestly:** `autoPlays: false` means nothing moves without a gesture, so WCAG 2.2.2 (auto-starting motion > 5s) is not engaged. The defect is the *inversion* — the scene suppresses its 220ms garnish and lets its unbounded physics run — plus the divergence from three siblings that do better.

**Falsifier:** a PRM gate inside `RAFPlayback` or the scene machine. I read `useSweepScene.ts` whole (none) and `useSceneMachineShellBinding.ts:165-212` (none). `useSceneSwap.ts:29` does carry a PRM snap — but that is the *scene-transition* spring, not this scene's subject.

---

### D-10 · MAJOR · non-text contrast: the rail groove, the target line and the ghost marker are effectively invisible

`SpringTarget.vue:61-90` builds a `role="slider"` whose track, target line and target marker are all thin washes of the accent on transparent. WCAG 1.4.11 requires 3:1 for the parts needed to identify a control and its state. Computed against `--card`:

| element | source | light | dark |
|---|---|---|---|
| `.progress-rail` (the slider's track, `--rail-tint: 8%`) | `design-idioms.css:174` | **1.11:1** ✗ | **1.15:1** ✗ |
| `.preset-track .progress-rail` (`--rail-tint: 14%`) | `SpringPhysicsFacet.vue:184-186` | **1.19:1** ✗ | **1.28:1** ✗ |
| `.spring-target-line` (35% dashed — the y=1 target) | `SpringTarget.vue:362-370` | **1.59:1** ✗ | **1.92:1** ✗ |
| `.spring-target-marker` (50% dashed — **the only indicator of where the spring is chasing**) | `SpringTarget.vue:319-332` | **1.99:1** ✗ | **2.54:1** ✗ |
| `.derby-lane-rail` (22% of the lane tone) | `SpringTarget.vue:426-435` | **1.16:1** ✗ | **1.55:1** ✗ |
| `.spring-ball` while the derby dims it (`opacity: .35`) | `SpringTarget.vue:381-386` | **1.59:1** ✗ | **1.92:1** ✗ |
| `.spring-ball` at rest (solid accent) | `design-idioms.css:184` | 4.63:1 ✓ | 5.77:1 ✓ |

The ball passes; everything the ball is measured *against* does not. The ghost marker is the single element that communicates the interaction's outcome ("where you re-seated the target") and it sits at 1.99:1.

**Falsifier:** the `.stage-field-x` quarter-tick gridlines (`design-idioms.css:205-211`, painted in `var(--border)` = `--neutral-4`) supply enough of the track's identity that the 8% groove is not "required to identify the control" under 1.4.11's wording. That is a defensible reading for the *track*; it does not rescue the ghost marker or the target line, which encode state, not structure.

---

### D-11 · MAJOR · the solver face clips under vertical compression; the two faces disagree about overflow

`SpringTarget.vue:10-13`:

```
class="… flex flex-col items-center justify-center gap-8 h-full w-full … overflow-hidden"
```

Its five children are `shrink-0` or unflexed — header (`:33` `shrink-0`), rail block (`:55`, no shrink/flex), sweep block (`:134` `shrink-0`), `SpringTrace` (`SpringTrace.vue:9` `shrink-0`) — and there is **no scroll seam anywhere in the column**. `gap-8` alone contributes 96px across the four gaps. With `h-full` + `overflow-hidden`, a stage shorter than the column's intrinsic height silently amputates the bottom band (the `linear()` trace plot) with no affordance and no recovery.

The sibling face solves exactly this and does it differently: `StartingStyleTarget.vue:11` uses `gap-6`, and `:25-26` gives the stage area `flex-1 min-h-0` so it compresses instead of clipping.

**Falsifier:** a measured stage height that always exceeds the column's intrinsic minimum. Rough source-derived floor: header ~60px + rail block (h-12 rail + caption + gap-6) ~112px + sweep block (label + h-9 track) ~64px + trace block ~80px + 96px of gap ≈ **412px** before the Card's own padding. *(UNPROVEN-NEEDS-LIVE: the exact viewport at which the trace is first clipped — but the mechanism, `overflow-hidden` over a non-scrolling fixed column, is proven from source.)*

---

## 3. MINOR

### D-12 · MINOR · `variant: "outline"` is not a prop of the consumed `Button`

`SpringScene.vue:143` and `:166` pass `variant: "outline"`. glass-ui 7.0.0's `Button` contract (`dist/components/button/Button.vue.d.ts`) is:

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone; size?: ButtonSize; iconOnly?: boolean;
    loading?: boolean; type?: …; disabled?: …; class?: …;
}
```

No `variant`. Vue's fallthrough therefore emits a literal `variant="outline"` attribute onto the rendered `<button>`, and the button renders at the **default** `emphasis` — `emphasis: { default: "secondary" }` (`dist/button-B7c944jy.js`). The visual outcome coincidentally matches the ribbon's explicit `emphasis="secondary"`, so nothing is *currently* mispainted; the defect is that the author's declared intent is unexpressed, unverifiable, and would silently change meaning the day glass-ui adds a `variant` axis. Corroborated as a repo-wide pattern at `CubeScene.vue:187,192`.

**Falsifier:** `variant` reaching `Button` through `PrimitiveProps` or an `attrs`-driven variant read inside the component. `PrimitiveProps` (reka-ui) supplies only `as`/`asChild`; the runtime chunk reads `emphasis`, never `variant`.

---

### D-13 · MINOR · dead layout classes + a self-cancelling padding pair on the scene's only markup

`SpringScene.vue:8-12` is the entire template:

```html
<div class="flex h-full w-full flex-col items-center justify-center px-6 lg:px-8">
    <div class="min-h-0 w-full flex-1"> … </div>
```

- `items-center` centers on the cross axis; the sole child is `w-full` → **no-op**.
- `justify-center` distributes free main-axis space; the sole child is `flex-1` → **no free space** → **no-op**.
- `px-6 lg:px-8` is repeated verbatim on both stage Cards (`SpringTarget.vue:12`, `StartingStyleTarget.vue:11`), so the plate's internal gutter is *exactly equal* to its external margin. Aristotelian proportion wants those to differ; equal values read as an accidental doubling, and the content is inset 48px (64px at `lg`) from the stage edge before the Card's own `size`-driven padding is counted.

**Falsifier:** a `min-height` or intrinsic-size case where the child does not fill, making the centering live. `flex-1` + `w-full` + `h-full` on the parent leaves no such case.

---

### D-14 · MINOR · two scroll regions with no keyboard path

- `StartingStyleTarget.vue:61` — `<code class="artifact … max-h-32 overflow-auto whitespace-pre">`, the copy-pasteable `compileToEntry()` artifact, i.e. content the user is explicitly meant to *read*.
- `SpringPhysicsFacet.vue:233-238` — `.keyframes-editor-scroll { max-height: 26rem; overflow-y: auto; }`.

Neither carries `tabindex="0"` or a role, so neither is focusable.

**Falsifier:** Chrome 127+ and Firefox now make overflow-scrollers keyboard-focusable automatically, which resolves this in those engines. It remains a defect in Safari/WebKit, and it remains a failure of the axe `scrollable-region-focusable` rule that CI-grade audits enforce.

---

### D-15 · MINOR · Reverse paints a pressed state, does not reverse, and silently inverts the scrub

`SpringScene.vue:93-96`:

```js
const onToggleReverse = () => { userReversed.value = !userReversed.value;
                                demo.springEditAnim.reversed = userReversed.value; };
```

But `useSpringDemo.ts:240` overwrites `springEditAnim.t = springLive.phase * duration` **every frame**, and `springLive.phase` is a forward wall-clock ramp (`:228`, `((now - startTime) / SAMPLER_DURATION) % 1`). Every painted element (ball, sampler, preset balls, readouts) reads `springLive`, never the animation's direction. So the sweep does not reverse.

Meanwhile `PlaybackRibbon.vue:53-69` gives the button a persistent pressed affordance — `:aria-pressed="userReversed"`, `aria-pressed:bg-primary/10`, `aria-pressed:border-primary/40`, a mirrored `scale-x-[-1]` glyph — and `playback-idiom.css:88-91` adds a filled `aria-pressed="true"` plate. And `PlaybackRibbon.vue:183-185` *does* consult `animation.reversed`, so the one real consequence of pressing Reverse is that the scrubber's drag direction inverts.

A control that announces a state it does not deliver, while quietly changing an unrelated one, is worse than an absent control.

**Falsifier:** `springEditAnim.reversed` feeding `AnimationVisualizer`'s own paint (`PlaybackRibbon.vue:72-80`) in a way the user reads as "reversed". Even then, the ball, sampler and readouts — the scene's subject — are unaffected, and the scrub inversion is undisclosed.

---

### D-16 · MINOR · `title` as the sole description carrier, three lines from the glass tooltip seam

`SpringPhysicsFacet.vue:73` — `:title="t.preset.blurb"` is the only place a preset's meaning ("pronounced overshoot, playful ring", `springPresets.ts:34`) is exposed. `:106` — `title="Re-sample the keyframe stops from the current spring params"` likewise.

`title` does not surface on touch, does not surface on keyboard focus, and has no controllable dwell. The same file uses the correct seam 30 lines above: `LabeledSlider … tooltip="Spring response time (s) — higher = slower"` (`:32`, `:42`), and glass-ui's `/tooltip` subpath is already consumed 6× elsewhere in the demo (lane-frontend §3.1).

**Falsifier:** glass-ui's `Chip` forwarding `title` into a real tooltip. `Chip` is consumed from `@mkbabb/glass-ui/chip` (`:131`) as a plain component; nothing in the call site wires a tooltip provider.

---

### D-17 · MINOR · `!important` twice to out-specify a consumed glass primitive

`SpringPhysicsFacet.vue:216-223`:

```css
.preset-cell:hover            { background: color-mix(…) !important; }
.preset-cell[data-state="on"] { background: color-mix(…) !important; }
```

Both fight the glass `Chip`'s own `mode="selectable" shape="cell"` background. The consumer is overriding the design system's state paint rather than parameterising it — the glass-first law's inverse. It also caps the scene: any future Chip state (`:disabled`, `:focus-visible` plate) will lose to these two rules.

**Falsifier:** `Chip` exposing no token or prop for selected/hover surface, making `!important` the only lever. `Chip` does accept `mode`/`shape`/`model-value`; whether it exposes a surface token is not decidable from the `.d.ts` alone — this is the weakest of the MINORs and should be re-checked against glass-ui's Chip source before acting.

---

### D-18 · MINOR · the headline egg is pointer-only, undiscoverable, and collides with the primary gesture

The four-lane derby (~200 lines across `useSpringDerby.ts` and `SpringTarget.vue:96-124, 398-460`) is reachable only through `useDoubleTap` on the rail (`SpringTarget.vue:247-252`). `onKeydown` (`:254-268`) implements Arrow/Home/End and has **no derby branch** — there is no keyboard path to the scene's largest visual feature. The affordance that once announced it was deliberately removed: `:173-174` — "the on-stage legend layer was retired at T.M — VERDICT #8".

Secondary: both taps of the double-tap pass through `useDragScrub` on the same element (`:233-242`), so launching the egg fires `demo.reseat(ratio)` twice before `derby()` overrides the targets. The file's claim of disjointness (`:245-246`, "drag-disjoint — a scrub never triggers it") covers only the opposite direction.

**Falsifier:** a documented decision that eggs are pointer-only by design. That would answer the keyboard half; it would not answer the double-reseat.

---

### D-19 · MINOR · zero forced-colors coverage, on a scene made entirely of tinted backgrounds

```
$ grep -rn "forced-colors" demo/    → 0
```

Every element that carries this scene's meaning is a `background` / `box-shadow` / `color-mix(… , transparent)`: `.progress-rail`, `.progress-ball` and its glow (`design-idioms.css:166-187`), `.derby-lane-rail` + `.derby-lane-ball` `drop-shadow` (`SpringTarget.vue:426-447`), `.spring-target-marker` and `.spring-target-line` (dashed borders on `color-mix`), `.discrete-card`'s tint and shadow (`StartingStyleTarget.vue:165-166`), `.active-preset-chip`'s outline+wash (`:144-151`), the `.status-badge` family (`design-idioms.css:218-242`). In forced-colors mode backgrounds are overridden to system colours and `box-shadow`/`drop-shadow` are dropped, collapsing the rail, the balls and the lanes into indistinguishable system-coloured rectangles.

**Falsifier:** a `@media (forced-colors: active)` block inside glass-ui's `styles/accessibility.css` covering these demo-owned classes. It cannot — `.progress-rail` / `.progress-ball` / `.derby-*` are demo-authored names glass-ui has never seen.

---

### D-20 · MINOR · the component's own comments route the reader to a file that does not exist

`SpringScene.vue` opens and closes with directions to `SpringSidebar.vue`:

> `:2-7` — "the view switcher … RELOCATES out of the top-center band into the RAIL (**SpringSidebar's head**)"
> `:203-204` — "the `.spring-view-*` switcher rules moved WITH the markup **into SpringSidebar.vue**"

`SpringSidebar.vue` does not exist. It was dissolved — `SpringPhysicsFacet.vue:2-7` records the dissolution — and the view fork became transport *channel data*: `useSpringDemo.ts:59-73` derives `view` from `storedControls.selectedAnimation === "Entry"`, driven by the facility's two channels (`:404-431`). Six more read-set sites still cite the dead file (`StartingStyleTarget.vue:65,67,101`; `useSpringLinearStops.ts:9`; `SpringHeatmap.vue:68`; and outside the scene, `KeyframesEditor.vue:5,136`, `KfPillTabs.vue:4`).

The design consequence is real, not merely editorial: a reader looking for the view switcher is sent to a deleted file, and the *actual* switch is a transport `Select` whose options are labelled "Sweep" / "Entry" — labels that name the facility's channels, not the two things a viewer sees (a live physics rail vs a `@starting-style` card). The scene's second face is discoverable only by guessing that "Entry" means the discrete demo.

**Falsifier:** a rendered pill/tab switcher I did not find. `grep -rn "SpringSidebar"` returns only comments; `view.value` is written at exactly one site, `useSpringDemo.ts:70`.

---

## 4. INFO

| id | finding | provenance |
|---|---|---|
| **D-21** | `computed` is imported and never used — the file contains exactly one occurrence of the token, the import itself. | `SpringScene.vue:17` |
| **D-22** | `isStarted = ref(true)` is never written, and is *not* the value the ribbon reads — `standardRibbon` hard-codes `isAnimStarted: true`. So `PlaybackRibbon`'s "not started" degraded state (`is-disabled` on the scrubber and the visualizer) is unreachable for this scene, despite the scene being deliberately born at rest. Two sources of one truth, both frozen. | `SpringScene.vue:57`, `:122`, `:184`; `PlaybackRibbon.vue:9`, `:74` |
| **D-23** | The button labelled "Re-seat" calls `demo.toggleTarget` (flip between the two rails); the function actually *named* `reseat` is the rail drag. The label names the wrong verb, and "Re-seat" is jargon the on-stage copy never teaches ("Tap or drag the rail…"). | `SpringScene.vue:163-176`; `useSpringDemo.ts:294`, `:303-305` |
| **D-24** | `ribbonContent` reads `demo.scrubberPhase.value` — a ref written every frame (`useSpringHotPath.ts:125-127`, called at `useSpringDemo.ts:239`) — inside a render-fn slot. Slot bodies are tracked by the *consumer's* render effect, so the host re-renders the whole ribbon subtree (Tooltip + Slider + Play + Reverse + AnimationVisualizer + the Re-seat Button) 60×/s while playing. The "born-continuous" thumb is correct; carrying static chrome in the same reactive read is the cost. | `SpringScene.vue:108-129`, `:159-177`; `App.vue:65-71` |
| **D-25** | Every positional rule in the scene is physical — `left: 0`, `right: 0`, `margin-left`, `translateX(+cqw)`. Latent, not active: the demo has no RTL support at all (one `margin-inline-end` mention tree-wide, `AnimatedText.vue:12`; no `dir` handling anywhere). Recording it so a future RTL pass knows the spring is the largest physical-property surface. | `SpringTarget.vue:207-224`, `:319-324`, `:341-355`, `:426-455`; `SpringPhysicsFacet.vue:192-198` |
| **D-26** | `.spring-pane` — one usage, zero definitions in demo CSS, any `<style>` block, or glass-ui. A dead class on the facet's root Card. | `SpringPhysicsFacet.vue:21` |
| **D-27** | In the discrete face the global transport can read "playing" with a static stage: `ribbonContent` returns only Reveal/Dismiss (`:138-157`) while the sweep loop keeps running, and `SpringTarget`'s painters have unregistered with its `v-if` unmount (`:10-11`, `SpringTarget.vue:228`). The dock's Play state and the stage decouple. | `SpringScene.vue:10-11`, `:138-157`; `useSpringDemo.ts:191-246` |

---

## 5. SUPERLATIVES (6) — each with its falsifier

### S-1 · The compositor-only value axis is genuinely excellent, and it is written down

`SpringTarget.vue:204-225` positions the live ball, the sampler ball and four derby balls by `transform: translateX(<cqw>)` against `container-type: inline-size` containers (`:298-306`, `:417-425`; `SpringPhysicsFacet.vue:156-159`, `:187-191`). This eliminates *both* per-frame layout (no `left` animation) *and* the per-frame width read that a `%`-of-pixels scheme would need — the `cqw` unit does the rail-relative arithmetic in the compositor. The rationale is stated at the line (T.G4). Very few demo codebases get the second half of this right.

**Falsifier:** a `getBoundingClientRect()` / `offsetWidth` read on the painter path. There is exactly one rect read in the file and it is per-*gesture*, not per-frame (`:237`, inside `useDragScrub`'s `project`).

### S-2 · The rail is a complete, honest `role="slider"`

`SpringTarget.vue:61-73` + `:254-268`: `tabindex="0"`, a real `aria-label`, `aria-valuenow`/`valuemin`/`valuemax` kept in sync with the model, Arrow-Left/Right/Up/Down at ±0.1 and Home/End at the extremes with `preventDefault()`, the demo's single documented focus contract (`.focus-ring` → `design-idioms.css:76-79`), no focusable descendants inside the composite, and a 48px (`h-12`) hit box that clears WCAG 2.5.5 with room. A custom slider that is actually operable by keyboard is the exception, not the rule.

**Falsifier:** a missing keydown branch (all four directions + both extremes are present) or a focus style that never paints (`.focus-ring:focus-visible` is defined and un-layered, so it lands).

### S-3 · The `@starting-style` implementation is textbook, including the part everyone gets wrong

`StartingStyleTarget.vue:158-197` builds the full triad — base (open) / `@starting-style` (entry FROM) / `.is-hidden` (exit TO with `display: none`) — and deliberately splits `transition-behavior: allow-discrete` into **its own declaration** so a non-supporting engine still honors the `opacity`/`translate`/`scale` list rather than dropping the whole shorthand. The reason is written at the line (`:177-179`). It also uses the independent `translate`/`scale` properties rather than a composite `transform`, so the three eased properties can be listed separately.

**Falsifier:** `allow-discrete` folded into the `transition` shorthand, or `display` omitted from the transition list. Neither.

### S-4 · The `.status-badge` AA claim is load-bearing *and true*

`design-idioms.css:213-217` asserts: "AA-CONTRAST (load-bearing): the tint paints `--badge-tone` at `--badge-tint` (14%); the text pushes it toward `--foreground` at `--badge-text-mix` (50%) so it reads ≥4.5:1 against the tint in both themes." Measured, as consumed by `SpringTarget.vue:44-47`:

| | light | dark |
|---|---|---|
| `.settled-badge` | **7.58:1** ✓ | **6.33:1** ✓ |
| `.tracking-badge` | **4.94:1** ✓ | **6.14:1** ✓ |

A documented contrast invariant that survives its own measurement, in a file where six other colour comments do not (D-8). The `--badge-text-mix` mechanism is the right shape: it makes the guarantee a *parameter*, not a hand-tuned hex.

**Falsifier:** my token resolution for `--neutral-5` / `--card` being wrong. Both are read directly from `glass-ui/dist/styles/tokens/light-dark.css`.

### S-5 · Measure discipline held without exception across both faces

`max-w-3xl` is applied to every content band in both stage cards — `SpringTarget.vue:33`, `:55`, `:134`, and `SpringTrace.vue:9`; `StartingStyleTarget.vue:15`, `:25`, `:56`, `:71`. Eight bands, one optical reading column, zero exceptions, on a full-bleed `h-full w-full` plate that would otherwise let the header row and the trace plot stretch to arbitrary widths. The comment naming the intent ("rides the content column as an optical reading measure", `SpringTarget.vue:9`) is honored everywhere it applies.

**Falsifier:** one band without the cap. There is none in either file.

### S-6 · Pointer-based double-tap instead of `dblclick`

`SpringTarget.vue:172-174` + `:247-252` uses a shared `useDoubleTap` on pointer events rather than the native `dblclick`, with the reason stated: mobile browsers do not synthesize `dblclick` reliably. One code path serves mouse, pen and touch. This is the correct call, and it was made deliberately (S.G3 S2) rather than discovered by bug report.

**Falsifier:** a residual `@dblclick` binding anywhere in the scene. None.

---

## 6. Corpus reconciliation (fold, don't re-invent)

| hitherto id | status here |
|---|---|
| **F-1** (`@mkbabb/glass-ui` phantom dependency — undeclared in `package.json` *and* `package-lock.json`, 7.0.0 installed) | **Folded, not re-derived.** It is the precondition for D-1/D-12: every contrast figure and the `Button` contract in this challenge are read from the *installed* 7.0.0 tree, which F-1 shows is unreproducible from the lockfile. If F-1 is fixed to a different pin, D-12's `emphasis` default and D-1's `.btn-playback-accent` plate must both be re-measured. |
| **S-1** (`KfPillTabs` fork, rationale stale against 7.0.0) | **No overlap; corroborated obliquely.** `KfPillTabs.vue:4` names "SpringSidebar" as one of its two band-aid sites — a fourth citation of the deleted file catalogued under D-20. The spring scene no longer renders `KfPillTabs` (`SpringPhysicsFacet.vue:6-7`, `useSpringDemo.ts:61`), so S-1's live consumer is `ChannelControls.vue` only, as the lane states. |
| **S-4** (`SequenceScrubber` → `ScrubberTimeline`/`Slider`) | **Adjacent, distinct.** The spring's rail is *not* a scrubber shadow: it is a `role="slider"` target-setter with its own keyboard contract (S-2), not a playhead. It should not be swept into an S-4-style replacement. |
| **§6.3** ("**No `--kf-*` namespace exists** … demo tokens share a flat global namespace with glass-ui's — a collision surface worth a lane of its own") | **Sharpened with a live instance.** The spring scene is where the flat namespace bites. `--color-progress` (`style.css:163`) is a demo-owned name repointed onto glass-ui's `--accent-kf`; six comments in the spring's read set still describe it as green or red (D-8); `--spring-lane-gentle` inherits the repoint and collapses onto `--rainbow-violet` (D-8); and `--ball-tone` cascades that unnamed hue through the whole scene by `var()` fallback. A `--kf-*` prefix would not have prevented the repoint — but the lane's proposed collision audit should treat *semantic drift under a shared flat name* as its first case, with this scene as the exhibit. |
| **§6.5** (13 PRM enforcement sites, "conscientious but inconsistent in mechanism"; spring listed with 3 CSS sites, 0 JS) | **Confirmed and given its consequence.** The census counted the sites; D-9 shows what the three spring sites actually cover (a 220ms pulse, a fade, a transition) versus what they leave ungated (the 60 Hz physics that is the scene's entire subject), and names the three siblings that do gate in JS. |
| **§4 roster** ("204 lines · `spring/SpringScene.vue` · G · spring scene — `Button`") | **Confirmed exactly.** 204 lines; the single glass-ui import is `Button` (`:18`); it is used at `:141` and `:163`, and both call sites pass a prop the component does not have (D-12). |
| **Contradiction filed** | The census's §6.4 `@keyframes` table lists `SpringTarget.vue:387` `spring-settle-pulse` and `:457` `derby-fade-in`. Both are correct in the tree read today. No contradiction found — recorded so the absence is on the record. |

---

## 7. What a repair wave would touch first

Ordered by (harm × decidability), not by size:

1. **D-1** — retune `.btn-playback-accent` (the label wants `--accent-kf-foreground`-class treatment or a deeper plate, not the hue on a wash of itself). One rule in `playback-idiom.css`; it fixes every scene that mounts the ribbon.
2. **D-2** — either dispatch `PLAY` from `reseat()`, or tick the solver in the paused branch of `frame()`, or change the on-stage sentence. Do not ship all three states disagreeing.
3. **D-3** — define `btn-interactive` or delete all 8 usages. It is a one-line answer either way.
4. **D-5 / D-6** — pick one home for each domain verb, and put the Re-seat cell on the `.btn-playback` skin at `h-10`.
5. **D-7 / D-10** — the derby tag and the ghost marker are the two contrast failures that destroy *meaning* rather than polish.
6. **D-8 / D-20** — the six wrong colour comments and the seven dead `SpringSidebar` citations are cheap to fix and expensive to leave: they are what the next designer will act on.
