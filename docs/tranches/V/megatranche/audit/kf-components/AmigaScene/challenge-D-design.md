claude-opus-5[1m]

# CHALLENGE · AmigaScene · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/amiga/AmigaScene.vue` (271 lines)
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser tooling. Every color/contrast/framing number below is computed from token literals and constants in the tree and is re-derivable by hand.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier and dies if the falsifier holds.
**Tally:** 2 BLOCKER · 6 MAJOR · 4 MINOR · 3 INFO (15 asserted defects) · 6 SUPERLATIVE · 1 NOT-APPLICABLE (recorded, not counted).

## 0. Read set (whole, in full)

| file | lines | role |
|---|---|---|
| `demo/scenes/amiga/AmigaScene.vue` | 271 | the target |
| `demo/scenes/amiga/useAmigaThree.ts` | 272 | renderer · camera · grid-room · shadow · present loop |
| `demo/scenes/amiga/useAmigaDemo.ts` | 156 | the authored arc (3 `CSSKeyframesAnimation` + the group) |
| `demo/scenes/amiga/useSphereSpin.ts` | 245 | pointer-drag spin + `decay()` release glide |
| `demo/scenes/amiga/utils.ts` | 91 | `tesselateSphere` + the `var()`→Canvas2D color resolver |
| `demo/scenes/amiga/amigaKeys.ts` | 5 | the scene id |
| `demo/composables/scene-runtime/useSceneVisibilityPause.ts` | 52 | tab-visibility pause |
| `demo/composables/scene-facility/index.ts` | 127 | `facilityFromGroup` (the transport contract) |

Context read for falsifiers (not the target): `app/scene/scenes.ts`, `app/App.skeleton.vue`, `state/useSceneMachine.ts`, `state/scenePlaybackAdapters.ts`, `styles/layout.css`, `styles/design-idioms.css`, `components/instrument/transport/AnimationControlsGroup.{vue,css}`, `scenes/square/SquareScene.vue`, `scenes/cube/{CubeTarget.vue,useCubeDemo.ts,orbital-drag/OrbitalDrag.vue}`, `src/animation/group/{group,lifecycle}.ts`, `src/animation/internal/reduced-motion.ts`, and glass-ui 7.0.0's installed `dist/styles/tokens/light-dark.css`.

## 1. Token substrate (the arithmetic base for §3–§5)

From `node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:1` and `theme.css`:

```
--background: var(--neutral-0)  →  light-dark(hsl(40 30% 98%), hsl(24  9%  4%))
--muted:      var(--neutral-1)  →  light-dark(hsl(38 26% 95%), hsl(28 12% 11%))
--border:     var(--neutral-4)  →  light-dark(hsl(32 26% 70%), hsl(30 16% 34%))
```

sRGB + WCAG relative luminance (sRGB→linear, `L = .2126R + .7152G + .0722B`):

| token | theme | sRGB | L |
|---|---|---|---|
| `--background` | light | `#FBFAF8` (251.4, 250.4, 248.4) | 0.9601 |
| `--muted` | light | `#F6F3EF` (245.6, 243.1, 239.0) | 0.8992 |
| `--background` | dark | `#0B0A09` (11.1, 10.0, 9.3) | 0.00309 |
| `--muted` | dark | `#1F1C19` (31.4, 27.8, 24.7) | 0.01189 |

**The design system is a warm-paper palette: every neutral sits at hue 24–40.** Hold that fact; §4.2 turns on it.

---

## 2. BLOCKERS

### D-1 · BLOCKER · The paused stage is pinned to HOME — the transport and the subject disagree

**Provenance:** `AmigaScene.vue:102`, `:126–145`, `:148–155`; `composables/scene-facility/index.ts:100–108`; `src/animation/group/lifecycle.ts:198–201`.

`onFrame()` writes the mesh from a private `rendered` buffer (`:88`), and `rendered` is updated in exactly two branches:

```
102   const playing = animationGroup.started && animationGroup.playing();
126   if (playing)        { rendered.* = pose.*  }       // follow the group
133   else if (reseat)    { rendered.* = lerp(…, HOME) } // the 400ms settle
```

`lifecycle.ts:198` — *"True iff the group is started and **not paused**."* So a transport PAUSE makes `playing` false. The re-seat then glides `rendered` to `SPHERE_HOME` and clears itself (`:139–144`). From that moment **neither branch executes**: `rendered` is frozen at `(0, 0, 0)` and lines 148–155 keep writing home to the mesh every frame.

Consequence — the scene's own transport contract is inert while paused. `facilityFromGroup` exposes per-channel `setProgress` (`scene-facility/index.ts:103–108`) which calls `setChildTime(anim, t).render()`; that repaints the group's `pose`, and **the scene never reads `pose` unless `playing`**. So:

- dragging the playback scrubber moves the playhead UI and does not move the ball;
- editing a keyframe in the Keyframes/Timeline triad produces zero stage feedback;
- the paused frame does not show the pose at the paused `t` — it shows the home pose, i.e. pause silently *discards* the visual state the user paused to inspect.

The gate is doubled: at rest `onFrame()` returns `false` (`:171`) and `setProgress` never calls `three.markRenderDirty()`, so even a corrected `rendered` would not be presented until an unrelated dirty event.

This is scene-specific, not a house limit. `cube` and `square` paint DOM targets directly through the engine (`useCubeDemo.ts:154–157` `setTargets(cubeEl)`), so `render()` reaches their subject with no `playing` gate. Amiga is the only scene that interposes a `playing`-gated buffer between the engine and its subject.

**Falsifier:** show any path that (a) copies `pose → rendered` while `playing === false`, or (b) re-drives `onFrame`'s compose from `setProgress`/`render()`, or (c) proves the amiga channels expose no scrub surface. I grepped the scene for `markRenderDirty` (2 hits: the handle definition and the IntersectionObserver at `:216`) and for a `pose` read outside `:127–131` (none). If `playing()` were true while paused, D-1 dies — `lifecycle.ts:199` says it is not.

### D-2 · BLOCKER · The interactive subject has no accessible name, no role, no keyboard path, no fallback content

**Provenance:** `AmigaScene.vue:13–16` (the entire rendered DOM of this component).

```html
<canvas ref="canvas" class="amiga-canvas h-full w-full rounded-card"></canvas>
```

No `role`, no `aria-label`, no `tabindex`, no keydown handler, no text between `<canvas>` and `</canvas>`. The scene's two interactions — sphere-spin (`useSphereSpin.ts:98–136`) and camera orbit (`useAmigaThree.ts:181–192`) — are pointer-only. A keyboard user cannot reach or operate either; a screen-reader user is told nothing at all about the page's primary content region.

The excuse "it's a canvas, nothing can be done" is refuted **twice inside this repo, in the same `scenes/` directory**:

- `scenes/square/SquareScene.vue:44–75` — the same problem (a pointer-drag manipulable subject) solved in full: `role="group"` + `aria-label="Drag the box across two axes…"` + `tabindex="0"` + `@keydown` + two visually-hidden `role="slider"` children carrying live `aria-valuenow`/`aria-valuetext`, plus a `.focus-ring` idiom for visible focus. Its own comment (`:34–43`) reasons about WCAG 4.1.2 explicitly.
- `scenes/cube/orbital-drag/OrbitalDrag.vue:276` — the other 3D drag subject drives its orbit from `keydown`-tracked `pressedKeys`.

Amiga is the only `stageMode: "subject"` scene (`app/scene/scenes.ts:137–153`: cube · amiga · square) whose subject has neither.

The sharpest form: **the placeholder is more accessible than the thing it replaces.** `app/App.skeleton.vue:28–33` — the `<Suspense>` fallback that stands in for AmigaScene while its chunk loads — ships `role="status"` + `aria-busy="true"` + `aria-label="Loading scene"`. The scene that swaps in behind it announces nothing.

No ancestor rescues it: `grep -rn "aria-\|role=\|<main\|sr-only" app/App.vue` returns **zero** hits; the only shell `aria-label`s are on the dock triggers (`ChromeDock.vue:241,291,309,330`).

**Falsifier:** produce an ancestor or sibling that supplies an accessible name for the stage region, or a keyboard route to spin/orbit, or an `aria-describedby`/sr-only mirror of the scene state. The `__kfAmigaProbe` window hook (`:184–198`) is a test probe, not an assistive-technology surface. If the owner rules the 3D scene *decorative* (WCAG 1.1.1 exempt), D-2 downgrades to MAJOR for the operability half (2.1.1) but does not die — orbit and spin remain functionality with no keyboard route.

---

## 3. MAJOR

### D-3 · MAJOR · The "never a teleport" contract is kept on stop and broken on start

**Provenance:** `AmigaScene.vue:71–74` (the claim), `:106–123` (the stop path), `:126–131` (the start path); `state/scenePlaybackAdapters.ts:96–99`.

The header claims: *"settles HOME through a short SpringProgress re-seat on stop (T.A8 — **never** a `position.set` teleport)."* The stop side honors it. The **resume** side does not:

1. PAUSE → `playing` false → the re-seat glides `rendered` from the paused pose to `(0,0)` over ~400 ms.
2. PLAY → `resume(): … else if (group.paused) group.resume()` (`scenePlaybackAdapters.ts:98`) un-pauses from the *stored clock*, so `pose` is the paused pose.
3. Next frame, `:127–130` assigns `rendered.px = pose.px; rendered.py = pose.py` — **one frame, no interpolation.**

Worst-case magnitude: paused at a wall during a floor slam, `pose = (±WALL_X, FLOOR_Y) = (±5, −4)`; the jump from home is `√(5²+4²) = 6.40` world units. The visible half-height at the ball plane is 6.47 (§3.4), so a single frame moves the subject **98.9 % of the frame's half-height / 49.4 % of its full height**.

`useAmigaDemo.ts:19–22` anticipates only the *cold* case ("every authored arc starts AND ends at this home so PLAY cold-enters continuously") — true at `t = 0`, silent about resume from an arbitrary `t`.

**Falsifier:** show that the transport's play button always restarts the group from `t = 0` (then `pose === HOME` and there is no jump), or that a resume-side re-seat exists. `scenePlaybackAdapters.ts:96–99` shows `group.play()` only when `!group.started`; a paused-started group takes `group.resume()`.

### D-4 · MAJOR · The contact shadow — the load-bearing height cue — computes to 1.02:1 in dark theme

**Provenance:** `useAmigaThree.ts:56–75` (the texture), `:160–166` (the material), `AmigaScene.vue:157–166` (the per-frame opacity lerp).

`T.A10` deleted the gray Lambert box and made the contact shadow the primary read of the ball's height (`useAmigaThree.ts:19–23`). The shadow is a hardcoded black radial gradient — `rgba(0,0,0,0.55)` at center (`:69`) — with the material opacity lerped `0.5` (floor) → `0.12` (apex) (`AmigaScene.vue:165`). Effective peak alpha at contact = `0.55 × 0.5 = 0.275`.

Composited over the theme backdrop, at floor contact and at apex:

| theme | backdrop | contact | apex |
|---|---|---|---|
| light | `#FBFAF8` L=0.9601 | (182.3,181.5,180.1) L=0.4654 → **1.96 : 1** | L=0.8225 → **1.16 : 1** |
| dark | `#0B0A09` L=0.00309 | (8.1,7.3,6.7) L=0.002241 → **1.02 : 1** | L=0.002887 → **1.004 : 1** |

Black over a `hsl(24 9% 4%)` ground has nowhere to go. In dark theme the shadow is not "subtle", it is **absent** — 1.02:1 at its strongest, 1.004:1 at apex — so the entire height/contact channel the T.A10 redesign rests on evaporates for every dark-theme user, and the 1.9× scale-up (`AmigaScene.vue:164`) animates an invisible sprite.

The alpha ramp is also inverted-cheap: it fades the shadow as the ball *rises*, which is right for light theme and pointless in dark where the floor value is already invisible.

**Falsifier:** the arithmetic dies if `--background` is not `--neutral-0` in dark, or if a dark-mode branch re-authors the shadow color. `theme.css` gives `--background: var(--neutral-0)`; `useAmigaThree.ts` contains zero theme reads (no `useGlobalDark`, no `matchMedia`), unlike `SpringHeatmap.vue:` and `CSSCodeEditor.vue` which both import `useGlobalDark` precisely to re-render canvas content on the theme flip.

### D-5 · MAJOR · The grid-room is a theme-blind cool-lavender literal in a warm-paper system, at 1.10–2.15:1

**Provenance:** `useAmigaThree.ts:144–156`.

```ts
const gridColor = new THREE.Color("#b9b9c6");
floorGrid.material.opacity = 0.35;   //  y = CONTACT_FLOOR
backGrid.material.opacity  = 0.18;   //  z = −BOX_SIZE/2
```

`#b9b9c6` = `hsl(240 10% 75%)` — **hue 240**, the only cool element in a system whose every neutral sits at hue 24–40 (§1). It is a raw literal: it does not move with the theme, and it does not sit in the token graph at all.

Composited contrast against the backdrop it is drawn over:

| element | light | dark |
|---|---|---|
| floor grid (α 0.35 over `--background`) | (228.2,227.5,230.8) L=0.7749 → **1.22 : 1** | (72.0,71.3,75.4) L=0.0643 → **2.15 : 1** |
| back wall (α 0.18 over `--muted`) | (234.7,232.6,231.6) L=0.8146 → **1.10 : 1** | (59.1,56.1,55.9) L=0.0411 → **1.47 : 1** |

Both themes sit under the 3:1 non-text threshold (WCAG 1.4.11) for a graphic that carries the room's ground plane and depth, and **light theme is 1.8× worse than dark on the floor and 1.34× worse on the wall**. At 1.10:1 the back wall is not a "quiet neutral line" (`:141–143`), it is a blank field. The comment's claim that the grid reads "over the theme backdrop" holds only in the theme it was eyeballed in.

**Falsifier:** if the owner rules the grid purely decorative (1.4.11 exempt), the contrast half downgrades to MINOR — but the *asymmetry* and the *cool-in-a-warm-system* half survive independently, and the T.A10 rationale (`:141–143`) explicitly assigns the grid the load-bearing job of replacing the deleted box. Re-derive: composite `c = α·185 + (1−α)·bg` per channel, then the standard sRGB luminance.

### D-6 · MAJOR · The authored ±5 sweep does not fit a portrait stage — clipped ~50 % of every loop on a phone

**Provenance:** `useAmigaThree.ts:114–120` (the camera), `:241–250` (the resize handler), `useAmigaDemo.ts:30` (`WALL_X = 5`), `components/instrument/transport/AnimationControlsGroup.css:115–135` (the mobile stage), `styles/layout.css:78–84` (the reserve).

Geometry, entirely from constants:

```
fov 50° vertical · camera (0, 1.5, 13.8) · target (0,0,0)
distance = √(1.5² + 13.8²) = 13.881
half-height at the ball plane H = 13.881 · tan 25° = 6.472
half-width  W = H · aspect
ball needs |x|max + radius = 5 + 1 = 6   ⇒   fits only when aspect ≥ 6 / 6.472 = 0.927
```

The mobile stage is `position: fixed; inset: 0` with `padding-block: var(--dock-band-reserve)` and **no `aspect-ratio`, no `max-width`, no letterbox** (`AnimationControlsGroup.css:115–135`; `AnimationControlsGroup.vue:65–67` slots the scene into `.stage-cell … h-full`; the sole `aspect-ratio` in the demo's CSS is `styles/style.css:246`, unrelated). `--dock-band-reserve ≥ 2.75rem + --dock-margin + safe-area` (`layout.css:48,78–84`), i.e. ≥ 44 px per side.

On a 390 × 844 phone the stage is 390 × ~724–756 ⇒ **aspect ≈ 0.52–0.54 ⇒ W ≈ 3.36–3.49.** Against a linear ±5 triangle sweep of period 8 s:

- fully framed only while `|x| ≤ W − 1` ≈ 2.4 → **under half the authored amplitude**;
- **partially clipped ~50–52 % of every 8-second loop** (`|x| > W−1`);
- **completely off-screen ~10–12 % of every loop** (`|x| > W+1 ≈ 4.4`).

Nothing compensates. `THREE.PerspectiveCamera` holds the *vertical* fov fixed, so a narrower aspect narrows the horizontal view; the resize handler (`:241–250`) sets `camera.aspect` and nothing else. `T.A9` (`useAmigaThree.ts:16–18`) records that the frustum-fit apparatus was deleted for crushing the arc to ±0.42 — a correct kill — but **nothing replaced it**, so the scene now has neither fit nor framing.

The converse holds at the other end: on a 2560-wide desktop the room (`BOX_SIZE = 12`, i.e. ±6) occupies well under 60 % of the frame width, floating in empty wash. The framing is right only in an aspect band of roughly 0.93–1.4.

**Falsifier:** produce a mobile letterbox, a min-aspect clamp, an aspect-aware fov/dolly term, or a mobile gate that hides the amiga scene. I found none: `grep -rn "aspect-ratio\|aspect-\[" styles/ components/instrument/transport/` → one unrelated hit. If the stage's real mobile aspect measures ≥ 0.93, the claim dies — that is the single measurement that kills it (marked **UNPROVEN-NEEDS-LIVE** for exact device numbers; the *inequality* and the CSS are decidable now).

### D-7 · MAJOR · PRM honesty: one motion source of four is governed, and it is the smallest

**Provenance:** `AmigaScene.vue:58` (`usePreferredReducedMotion`), `:108–112` (the only use); `useAmigaDemo.ts:93–140`; `useSphereSpin.ts:149–157`; `useAmigaThree.ts:182–183`; `src/animation/constants/types.ts:147–152, 201–202`; `src/animation/internal/reduced-motion.ts:90–107`.

The scene reads the preference and applies it to exactly one thing: the **400 ms re-seat**, which snaps instead of springing. Everything larger is ungoverned:

| motion source | duration under `reduce` | PRM branch |
|---|---|---|
| the group bounce — X ±5 @ 8 s, Y floor↔apex @ 1.6 s, `iterationCount: Infinity` | unbounded | **none** |
| the `decay()` release glide (`friction 2.4`, coasts to `REST_SPEED 1e-3`) | seconds after the finger lifts | **none** |
| OrbitControls damping (`enableDamping`, `dampingFactor 0.05`) | continues after release | **none** |
| the stop re-seat | 400 ms | ✅ `:108` |

The engine under demonstration ships a first-class, **scaled** PRM gate — `ReducedMotionPolicy = boolean | number` with the documented intent *"shorten the travel, keep the meaning"* (`reduced-motion.ts:90–107`), reachable as `respectReducedMotion` on every animation (`constants/types.ts:201`, default `false`). All three of amiga's `CSSKeyframesAnimation` option objects (`useAmigaDemo.ts:93–97, 110–114, 127–131`) omit it. A `respectReducedMotion: 0.3` on the X/Y channels would attenuate amplitude while preserving the demonstration — the exact case the mechanism was built for, declined by the flagship scene that dogfoods the library.

The honesty defect is the *asymmetry*: a single visible PRM branch advertises a contract the surrounding 99 % of the scene's motion does not keep.

**Falsifier — and it is partly load-bearing:** playback here is gesture-gated (see S-F: cold boot coerces `playing → false`, `useSceneMachine.ts:85–99`), and the transport offers pause, so **WCAG 2.2.2 is satisfied** and this is not a Level-A failure — that is precisely why it is MAJOR and not BLOCKER. The claim dies only if a global PRM gate suppresses group playback; `grep -rn "prefers-reduced-motion\|usePreferredReducedMotion" demo/state/ demo/app/` returns three hits, all unrelated (skeleton CSS, the scene-swap spring snap). It also dies if the owner rules that motion *is* the essential content (WCAG 2.3.3's "unless essential") — in which case the correct fix is the *intensity* scale, not the binary snap, which is the mechanism the engine already ships.

### D-8 · MAJOR · No error state: a WebGL failure presents as a blank rectangle with a lying cursor

**Provenance:** `useAmigaThree.ts:122–126`; `AmigaScene.vue:174–179`; `:253–255`.

`new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas })` throws when a context cannot be created. It is called inside `onMounted` (`AmigaScene.vue:175`) with no `try`/`catch` and no fallback branch. On failure:

- `sphereSpin.attach(canvasEl.value!)` (`:179`) and the probe install (`:184`) never run;
- the user is left with the CSS gradient plus the inset hairline — a blank card;
- `.amiga-canvas { cursor: grab }` (`:254`) and `:active { cursor: grabbing }` (`:268–270`) still advertise a manipulable subject that does not exist. The affordance outlives the object.

Context **loss** is equally unhandled: `grep -rn "contextlost\|contextrestored\|onErrorCaptured\|errorCaptured" demo/` returns **zero hits repo-wide**. A GPU-pressure context loss (routine on mobile Safari after backgrounding) freezes the canvas on its last frame with no recovery and no notice, while the present loop keeps ticking `onFrame` against a dead context.

There is no compensating shell: the `<Suspense>` fallback (`App.skeleton.vue`) covers *loading* only, and there is no `onErrorCaptured` anywhere.

**Falsifier:** a global error boundary, a `webglcontextlost` listener, or a `WEBGL_lose_context`-aware wrapper. The repo-wide grep says none exists. If the demo's supported-browser floor guarantees WebGL, the *creation-failure* half weakens — the *context-loss* half does not.

---

## 4. MINOR

### D-9 · MINOR · One color of seven is tokenized, and the comment celebrates that one

**Provenance:** `useAmigaThree.ts:132, 135, 137, 144, 175`; `utils.ts:68–72`; `useAmigaThree.ts:69–71`.

| site | value | tokenized? |
|---|---|---|
| `tesselateSphere(color2)` `:175` | `var(--amiga-red)` → `--rainbow-red` → `hsl(0 85% 60%)` | ✅ |
| `tesselateSphere(color1)` `:175` | `"#ffffff"` | ✗ |
| grid `:144` | `"#b9b9c6"` | ✗ |
| hemisphere ground `:135` | `"#c8c8c8"` | ✗ |
| hemisphere sky / spot `:135,137` | `"white"` ×2 | ✗ |
| phong specular `utils.ts:70` | `0x333333` | ✗ |
| shadow texture `:69–71` | `rgba(0,0,0,·)` | ✗ |

`utils.ts:5–13` and `useAmigaThree.ts:172–175` spend eleven comment lines celebrating the single tokenized value ("single-sourced in design-idioms.css") while six literal siblings sit in the same two files — and each of the six neutrals is cool or achromatic against the warm-paper system (§1). The `#ffffff` checker is *whiter than the design system's own paper white* (`hsl(40 30% 98%)`), so the ball's highlights read cooler than every surface around them.

**Falsifier:** a case that the WebGL literals are lighting-rig physics rather than brand color. It holds for the specular constant; it does not hold for the checker white, the grid, or the hemisphere ground, all of which are surface color under a theme that has tokens for exactly this.

### D-10 · MINOR · The "sky/ground wash" measures 1.05 : 1 in light theme and inverts polarity between themes

**Provenance:** `AmigaScene.vue:256–263`.

```css
background: linear-gradient(to bottom, var(--muted, …), var(--background, …));
```

described as *"a soft vertical wash evoking the Amiga sky/ground gradient, light/dark-aware via the theme tokens."* It is token-aware — and both halves of the description fail:

| theme | top (`--muted`) | bottom (`--background`) | top→bottom | contrast |
|---|---|---|---|---|
| light | L = 0.8992 | L = 0.9601 | **darker → lighter** | **1.05 : 1** |
| dark | L = 0.01189 | L = 0.00309 | **lighter → darker** | 1.17 : 1 |

In light theme it is a 1.05:1 gradient — visually a flat field; the wash does not exist. And the polarity *reverses* between themes, so a horizon reading (bright sky over darker ground) is available only in dark. One design intent, two opposite renderings, neither authored.

**Falsifier:** if `--muted`/`--background` are ever re-tuned further apart, the light number rises. As of the installed glass-ui 7.0.0 they are `hsl(38 26% 95%)` vs `hsl(40 30% 98%)`.

### D-11 · MINOR · The framing is bottom-heavy against the repo's own declared φ optical-centering law

**Provenance:** `useAmigaThree.ts:114–120`; `useAmigaDemo.ts:31–32`; `styles/layout.css:62–70`.

The arc's bounding box in the ball plane is `y ∈ [FLOOR_Y − r, APEX_Y + r] = [−5, +3]`, centered at **y = −1**. The frame is centered at the look-at, **y = 0**, with a half-height of 6.472. So:

```
headroom above the apex   =  6.472 − 3  =  3.47 units
footroom below the floor  =  6.472 − 5  =  1.47 units      →  2.36 : 1
```

Two-and-a-third times more dead air above the subject than below, in a scene whose subject spends most of its cycle *low* (the Y arc dwells at `FLOOR_Y` twice per 1.6 s period against one apex visit). `styles/layout.css:62–67` declares the house law in the opposite direction and names it: `--work-area-vertical-bias-top: 0.382; /* 1/φ² — subject parks above optical centre */`. The amiga camera targets the geometric origin and parks the subject below it.

**Falsifier:** the φ bias governs CSS work-area layout, not 3D camera targets, so this is an argument from consistency rather than a rule breach — kill it by showing the room (the grid, `y = −5` to the back wall) is the intended compositional subject rather than the ball. Even then the `+3.47 / −1.47` asymmetry stands as an unauthored consequence of `camera.lookAt(origin)`.

### D-12 · MINOR · Bespoke card chrome hand-rolled onto a full-bleed background layer

**Provenance:** `AmigaScene.vue:15`, `:264–267`; `AnimationControlsGroup.css:115–135`; census `lane-frontend.md` §3.1 (`/surface` among the 52 unreached subpaths), §4 (amiga = one of 21 `.vue` with no glass-ui import).

```html
class="amiga-canvas h-full w-full rounded-card"
```
```css
box-shadow: inset 0 0 0 1px var(--border);   /* "the 1px inset stage-boundary hairline
                                                defining the glass stage's edge" */
```

Two problems, one structural:

1. **Category error.** On mobile the element this chrome lands on is `position: fixed; inset: 0` — the viewport-filling background layer. A card radius plus a card hairline on a full-bleed layer traces a bezel around the *screen*, not around a card. `AnimationControlsGroup.vue:155–158` names the mode explicitly: *"`subject` full-bleeds the fixed stage (cube/amiga/square)"*.
2. **Bespoke where the system has a primitive.** The scene reaches for glass-ui's *tokens* (`--muted`, `--background`, `--border`, `.rounded-card` → `--radius-card` → `--radius-2xl`) while hand-assembling the surface those tokens describe. glass-ui 7.0.0 ships `/surface` and `Card`; the sibling `SquareScene.vue:76` wraps its subject in `<Card>`. This extends census **S-6/S-7**'s bespoke-vs-glass pattern to the scene layer, and it is the concrete instance of the census's flat-namespace hazard (`lane-frontend.md` §6.3, *"98 unprefixed demo custom properties sharing a global namespace with glass-ui's"*): the scene consumes four glass tokens by bare name with inline fallbacks, so a collision degrades silently to `hsl(0 0% 96%)`/`hsl(0 0% 100%)` — pure grays that would land *cool* in the warm-paper system, i.e. the fallback is itself off-palette.

**Falsifier:** if the owner intends the stage to read as an edge-to-edge bezel (an Amiga-CRT frame), the radius/hairline are deliberate — but then `--border`/`--radius-card` are the wrong tokens (they encode *card* semantics), and the CRT overlay this would evoke was itself deleted at T.A10 (`AmigaScene.vue:9–10`).

---

## 5. INFO

### D-13 · INFO · The component defines itself by what was deleted

**Provenance:** `AmigaScene.vue:6–12`, `:181–183`, `:208–211`, `:244–247`.

Roughly 14 of 271 lines narrate absent features rather than present ones — "the CRT overlay, the gesture legend, the parked telemetry readout, and the boot power-on flash are GONE", "the parked telemetry readout is gone", "The former power-on BOOT re-entry egg is GONE", "carries NO `content-visibility: auto`". The leading seven-line block is a **removal changelog living inside the rendered `<template>`**; Vue's SFC compiler keeps template comments in dev builds and strips them in production, so it is DOM-visible to anyone inspecting the dev app.

Two of these earn their keep (the `content-visibility` refusal states its mechanism — see S-E; the T.A11 note explains why the probe is non-DOM). The rest are tranche archaeology addressed to auditors, in the file a reader opens to learn what the scene *is*.

**Falsifier:** if the demo's comment register is deliberately a work-ledger for the audit program, this is a house idiom, not a defect. The prose is not trite or clichéd — there is no user-facing copy in this component at all — so this is a register complaint, filed at INFO.

### D-14 · INFO · A dev probe is installed on `window` in production builds

**Provenance:** `AmigaScene.vue:184–198`.

`(window as unknown as Record<string, unknown>).__kfAmigaProbe = { omega, pose }` is written unconditionally in `onMounted`, with no `import.meta.env.DEV` guard. It is deleted on unmount (`:228`), so it does not leak across scenes — but it ships. The comment (`:181–183`) frames it as a test witness for `proof:amiga-decay-visible`.

**Falsifier:** a build-time define that strips it, or a policy that demo builds intentionally expose probes. Neither appears in `vite.config.ts`'s alias/define surface as read.

### D-15 · INFO · Zero forced-colors handling, against a design system that ships two blocks

`grep -c forced-colors` over the whole demo → **0**; over glass-ui's installed stylesheets → 2 (`dist/styles/accessibility.css`, `dist/styles/components.css`). The scene's CSS surface (the gradient, the hairline) has no forced-colors branch, and the canvas pixels are inherently exempt from forced-color remapping.

Filed at INFO deliberately: a WebGL scene in Windows High Contrast is a medium-inherent limit, not a fixable component bug, and inflating it would be the false defect this challenge is required to avoid. The *actionable* residue is small — the CSS backdrop and hairline could adopt system colors under `forced-colors: active` so the frame does not read as an untinted hole. Exact browser treatment of `background-image` on a replaced element in forced-colors is **UNPROVEN-NEEDS-LIVE** (SS-13).

### N/A · RTL — recorded, not counted

The component renders no text, no directional layout, and no logical-property-sensitive box model; the X sweep is a physical trajectory, not a reading order. There is no RTL defect here. Recorded so the axis is covered rather than silently skipped.

---

## 6. SUPERLATIVES (L-18, running the other way)

### S-A · The render-on-demand liveness contract is real, and it actually idles

`AmigaScene.vue:171` returns `playing || sphereSpin.isGliding() || reseat != null`; `useAmigaThree.ts:200–216` renders only on `renderDirty || controlsChanged || sceneLive`. Each term is genuinely transient: `renderDirty` is cleared immediately after the render (`:213`), `controls.update()` returns true only while damping settles, and `sceneLive` is false at rest. At true rest the WebGL context stops presenting entirely. Very few demo scenes with a live GL canvas ever reach that state; most ship an unconditional rAF.
**Falsifier:** any permanently-true term, or a `markRenderDirty()` inside the loop. Neither exists — the only external dirty calls are mount, resize (`:249`), and IO re-entry (`AmigaScene.vue:216`).

### S-B · Exactly one mesh writer, verified by exhaustion

`grep -rn "mesh.position\|\.quaternion\|sphereMesh.position" scenes/amiga/` → four hits: `useAmigaThree.ts:176` (a once-only seat in `setup`) and `AmigaScene.vue:153–154` (the per-frame compose). The T.A7 claim — group writes a *pose*, gesture writes an *offset*, the scene composes both into the one transform — is structurally true, not aspirational. It is the correct cure for the last-wins stomp that a two-animator 3D scene otherwise produces, and it is the reason the gesture offset survives the re-seat (`:74`) instead of being clobbered.
**Falsifier:** a fifth write site anywhere in the frame path. There is none.

### S-C · Two drag semantics on one surface, disjoint by construction

`useSphereSpin.ts:98–99` hit-tests the sphere on a **capture-phase** `pointerdown` and returns early on a miss, letting OrbitControls' own bubbling listener take the gesture untouched (`:196–208`). Sphere-hit → spin; miss → orbit. No mode toggle, no modifier key, no modal state, and the pivot is the subject (`useAmigaThree.ts:185–187`) so the two gestures share one center. That is a genuinely elegant interaction model — the affordance is the object, not a control.
**Falsifier:** a raycast against a stale world matrix would make hits unreliable; `:92` calls `mesh.updateMatrixWorld()` before every test precisely because render-on-demand may have skipped frames. The seam is anticipated.

### S-D · Complete pointer discipline

`setPointerCapture` on down (`:104`), `hasPointerCapture`-guarded release (`:142–144`), `pointercancel` wired to the same `endDrag` (`:206`), `pointerId` matching on every move (`:116`), and `touch-action: none` on the surface (`AmigaScene.vue:254`). That is the full set — and it is exactly the class of leak documented as a live scar elsewhere in this constellation (value.js's iOS Safari `lostpointercapture` recovery work). Nothing is missing.
**Falsifier:** a path that leaves `dragging` true after a lost pointer. `pointercancel` + capture + id-matching closes it.

### S-E · A negative design decision recorded with its mechanism

`AmigaScene.vue:244–247` states that the scene root deliberately carries **no** `content-visibility: auto`, and says why: it is wrong over a live WebGL present loop (a per-frame ReadPixels stall), with the occlusion intent moved to the IntersectionObserver instead. Paired with `useSceneVisibilityPause.ts:14–17`'s explicit **honesty contract** — *"the gate only resumes what IT paused"*, so a user-paused scene is never force-resumed on tab return — this is design documentation of the rare kind: it records the road not taken and the reason, which is what stops the next author from "fixing" it back.
**Falsifier:** none available; both are verifiable in-place.

### S-F · Playback cannot start without a gesture

`state/useSceneMachine.ts:85–99` (K4-C) coerces a hydrated `playing → true` to `false` at the hydration seam specifically because *"the amiga bounce auto-resumed on a gestureless cold reload."* The named regression was this scene's, and the cure is systemic. The consequence is that an infinite, large-amplitude, full-viewport bounce can never begin on its own — which satisfies WCAG 2.2.2 by construction and is the sole reason D-7 is a MAJOR rather than a second BLOCKER. Credit belongs to the shell, but the protection is real and this scene is its beneficiary.
**Falsifier:** an `autoPlays: true` on the amiga descriptor. `app/scene/scenes.ts:144–152` sets none, and `useSceneMachineShellBinding.ts:200–210` plays only on `autoPlays || autoPlayNext` (both gesture-derived).

---

## 7. Fold of the hitherto corpus

- **`lane-frontend.md` F-1 (phantom glass-ui dependency, RED)** — confirmed load-bearing for this component and *unnamed by it*. AmigaScene consumes `--muted`, `--background`, `--border`, and `.rounded-card` (→ `--radius-card` → `--radius-2xl`) entirely through the undeclared glass-ui cascade. On a clean `npm ci` those four resolve to the inline fallbacks or to nothing: the backdrop becomes `hsl(0 0% 96%)`→`hsl(0 0% 100%)` (cool grays in a warm system, D-12) and `box-shadow: inset 0 0 0 1px var(--border)` — which has **no** fallback (`:266`) — becomes an invalid declaration, dropping the hairline. The census's §10 rec 1 ("F-1 first") is correct and this scene is one of its silent dependents.
- **`lane-frontend.md` §4 roster** — lists `amiga/AmigaScene.vue` (271 lines) as **b** = no glass-ui import. Confirmed exactly, and D-12 is the design consequence: it reaches glass-ui's tokens through the cascade while declining its primitives, so it inherits the theme's *values* without the theme's *components*.
- **`lane-frontend.md` §6.5 (13 PRM enforcement sites)** — amiga appears in **neither** the 10 CSS sites nor the 3 JS sites, despite calling `usePreferredReducedMotion` at `AmigaScene.vue:58`. The census's mechanism-inconsistency finding ("two scenes use raw `window.matchMedia`, one uses VueUse `useMediaQuery`") gets a fourth mechanism here: VueUse's `usePreferredReducedMotion`. Four mechanisms, four scenes. D-7 extends this from *inconsistent mechanism* to *inconsistent scope*.
- **`lane-frontend.md` §6.3 (`--kf-*` = 0; 98 unprefixed demo tokens sharing a global namespace)** — this scene is a concrete instance in both directions: it consumes four bare glass tokens with fragile fallbacks (D-12) and adds seven un-namespaced hardcoded literals in the WebGL layer that no token audit will ever see (D-9), because they are `THREE.Color` arguments, not CSS.
- **`lane-frontend.md` S-8 (TypingDots, JUSTIFIED BESPOKE — dogfoods the engine)** — the same defense is available to AmigaScene and is *partly* earned: the scene genuinely dogfoods `RAFPlayback`, `AnimationGroup`, `SpringProgress`, and `decay()`. It does **not** extend to D-1 (the buffer that breaks scrub is scene-invention, not engine dogfooding) or to D-7 (declining `respectReducedMotion` is declining the engine's own surface — the opposite of dogfooding).
- **No contradiction of the census found.** Its amiga row, its glass-ui roster, its PRM tally, and its token-namespace claim all hold against the tree as read on 2026-08-04.

---

## 8. Ranked repair order (design axis only — no code written)

1. **D-1** — un-gate the compose: copy `pose → rendered` whenever the group has ticked (playing *or* paused-with-a-seated-clock) and call `markRenderDirty()` from `setProgress`. Without this the scene's entire instrument premise is dead while paused.
2. **D-2** — port the `SquareScene.vue:44–75` contract onto the canvas: `role="group"` + `aria-label`, `tabindex="0"`, arrow/`[`/`]` keys onto the spin offset and orbit, fallback content inside `<canvas>`, and a visible focus ring.
3. **D-3** — mirror the stop-side re-seat on the start side (spring `rendered → pose` on resume), or do not re-seat on stop at all; symmetric is the only honest pair.
4. **D-4 + D-5 + D-9** — move the grid, the shadow, the checker white, and the hemisphere ground onto theme-resolved values (the `resolveColor` helper in `utils.ts:14–27` already does the `var()` → literal work), and rebuild them on the dark-mode flip the way `SpringHeatmap`/`CSSCodeEditor` already do with `useGlobalDark`. Target ≥ 3:1 for the floor grid in both themes; give the dark theme a light contact-glow rather than an invisible black blob.
5. **D-6** — restore an aspect-aware framing term that scales the *camera*, not the arc (the T.A9 kill was of arc-crushing, and dollying/widening fov below aspect 0.93 does not resurrect it).
6. **D-7** — set `respectReducedMotion` to an intensity (e.g. `0.3`) on the X/Y channels and snap the `decay()` glide + OrbitControls damping under `reduce`.
7. **D-8** — guard `setup()`, handle `webglcontextlost`, and render a real fallback where the cursor currently lies.
8. **D-10 · D-11 · D-12 · D-13 · D-14 · D-15** — taste and hygiene, individually landable.
