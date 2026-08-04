claude-opus-5[1m]

# CHALLENGE · `CubeAxisLines` · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeAxisLines.vue` (90 lines)
**Tree:** keyframes.js HEAD `8281638c`, file **clean** (`git status --porcelain` → empty). Same HEAD the frontend census recorded.
**Mode:** static, read-only, source-derived. No browser, no dev server, no installs. Nothing in keyframes.js was written.
**Posture:** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a falsifier; two candidate claims were **killed by their own falsifier** and are recorded as such (§6).

**Files read whole (read-only):**

| file | why |
|---|---|
| `demo/scenes/cube/CubeAxisLines.vue` | target |
| `demo/scenes/cube/CubeTarget.vue` | sole consumer (`:101`, `:114`), owns the `lock` source |
| `demo/scenes/cube/CubeTarget.css` | the sibling sheet the target's styles were carved out of |
| `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` | publishes the `pressedKeys` latch the prop reads |
| `demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts` | `updatePressedKeys` (`:169–176`) |
| `demo/scenes/cube/orbital-drag/types.ts` | `PressedKeys` shape |
| `demo/styles/style.css` | `--axis-x/y/z` (`:109–111`), the z-contract (`:20–39`), `html,body{overflow:hidden}` (`:217`) |
| `demo/styles/layout.css` | `--z-behind: -10` (`:25`) |
| `demo/DESIGN.md` | the ratified design codex — §4 geometry/depth, §6 token partition + prose ownership, §7 affordance grammar, §9 module/split law |
| `demo/app/App.vue` | `.scene-host` (`:358–384`) — the T.G1 backdrop-filter de-layer contract |
| `node_modules/@mkbabb/glass-ui/dist/styles/{tokens,theme,utilities,transitions,accessibility}` | token resolution (`--ease-standard`, `--duration-*`, `--neutral-0`), `.preserve-3d`, global PRM/forced-colors reach |

**Hitherto corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (S-1…S-8 shadow census, F-1 phantom dep, §6.3 token namespace, §6.5 PRM roster). Overlaps cited inline; **one explicit contradiction** at C-1.

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **D-1** | **BLOCKER** | Three transitions, **zero** `prefers-reduced-motion` guard — and `:58–59` asserts "PRM-respecting via the wrapper below." No wrapper exists. |
| D-2 | MAJOR | `opacity` and `filter` are transitioned **alongside** the `--axis-active` they are computed from — a per-frame transition restart. The declared 180ms/`--ease-standard` curve is not what renders. |
| D-3 | MAJOR | WCAG 1.4.11 fails at **maximum emphasis**: locked `--axis-y` = **2.69:1** in light, locked `--axis-z` = **2.98:1** in dark. The axis palette has no dark arm. |
| D-4 | MAJOR | `.z`'s `rotateY(90deg)` lays a 0-height line **along the view ray through the perspective origin** — it projects to a needle, not an axis, and its near half sits past the eye plane. |
| D-5 | MAJOR | `z-index: var(--z-behind)` is **inert** once `.graph`'s 3D rendering context engages. The reconciliation the comment brags about is state-dependent prose. |
| D-6 | MAJOR | Keyboard-only affordance with **zero touch parity** and no §7 legend — the sibling egg in the same consumer was explicitly given touch parity (`CubeTarget.vue:224–226`). |
| D-7 | MAJOR | The latch is a bare `window` keydown with **no focus guard**: typing `x`/`y`/`z` into any input in the app lights the axis lines; a keyup lost to a tab-switch leaves one **permanently lit**. |
| D-8 | MAJOR | Unconditional `filter` on three ~10×-viewport-width elements, repainting inside a live `backdrop-filter` backdrop root — the exact coupling `App.vue:362–378` (T.G1) names as VERDICT #19 root cause #1. |
| D-9 … D-16 | MINOR | codex violations (§4 viewport literal, §6 partition + off-ladder duration), flat-namespace hazard, missing `aria-hidden`, no forced-colors block, dual state encoding, dishonest stroke primitive, decoupled containing block. |
| D-17 … D-20 | INFO | prose volume / §6 competing authority, a null declaration, inaccurate "single-axis" prose, §9.2 props grammar. |

**Tally: 20 defects · 1 blocker · 6 superlatives.**

---

## 1. BLOCKER

### D-1 · The `prefers-reduced-motion` guard does not exist, and the comment says it does — **BLOCKER**

`CubeAxisLines.vue:58–63`:

```
    /* Smooth the reveal as the key latches/releases (the registered @property
       lets both channels interpolate). PRM-respecting via the wrapper below. */
    transition:
        opacity 180ms var(--ease-standard, ease),
        --axis-active 180ms var(--ease-standard, ease),
        filter 180ms var(--ease-standard, ease);
```

There is no wrapper below. Lines 64–89 are `z-index`, `position`, `pointer-events`, `&.axis-line--locked`, `&.x`, `&.y`, `&.z`. The file contains no `@media` of any kind.

Nothing upstream rescues it, and I checked every candidate:

* `CubeTarget.css` — read whole (154 lines): **no** `prefers-reduced-motion` block.
* `demo/styles/` — `grep -rn "prefers-reduced-motion" styles/` → **zero hits**. There is no demo-wide PRM kill-switch.
* glass-ui `dist/styles/transitions.css` — its PRM block enumerates class selectors (`.fade-enter-active`, `.pane-swap-*`, `.metric-swap-*`, `.dock-in`). `.axis-line` matches none.
* glass-ui `dist/styles/accessibility.css` — read whole: it carries `prefers-contrast: more` and `forced-colors: active` blocks keyed on `[aria-current]`/`[aria-selected]`/`[aria-pressed]`/`[aria-checked]`/`[data-state]`. These divs carry **no** aria or data-state attributes. Nothing applies.
* Styles are `<style scoped>` — a rule authored elsewhere could not reach `.axis-line` without the `data-v-` hash anyway.

Severity is BLOCKER, not MAJOR, on two grounds. First, the house standard is met everywhere else: `lane-frontend.md §6.5` enumerates **13** PRM enforcement sites across 12 files, including four in this very scene family's peers (`SquareInstrument.vue:207`, `SquareScene.css:136`, `SpringTarget.vue:462`, `StartingStyleTarget.vue:211`) and a JS query **in this same scene** at `scenes/cube/useCubeDemo.ts:164`. This component is the regression, not the norm. Second — and this is what makes it a blocker rather than a miss — the comment **actively certifies** the thing it omits. A reviewer running the census's own §6.5 grep sees `CubeAxisLines.vue` absent from the roster, reads `:59`, and concludes the coverage is inherited. The false certificate converts a fixable omission into a durable one.

**Falsifier:** a PRM rule that actually matches `.axis-line` — either a `@media (prefers-reduced-motion: reduce)` block inside this SFC's scoped styles, or a global `*`/`:where(*)` transition kill-switch reachable from the demo cascade. I grepped `demo/styles/` (0 hits) and read glass-ui's `transitions.css` and `accessibility.css` in full; produce either and this claim dies. A rule matching only glass-ui's own class names does **not** falsify it.

---

## 2. MAJOR

### D-2 · The reveal transitions `opacity` and `filter` **and** the custom property they are derived from — MAJOR

`CubeAxisLines.vue:53–63`:

```
    opacity: calc(0.45 + var(--axis-active, 0) * 0.55);
    filter: drop-shadow(
        0 0 calc(var(--axis-active, 0) * 6px)
            color-mix(in srgb, var(--color) calc(var(--axis-active, 0) * 80%), transparent)
    );
    transition:
        opacity 180ms var(--ease-standard, ease),
        --axis-active 180ms var(--ease-standard, ease),
        filter 180ms var(--ease-standard, ease);
```

`--axis-active` is registered (`:37–41`, `syntax: "<number>"`) and driven by an inline binding (`:13`, `:18`, `:23`), so it animates. That animation continuously changes the **computed** value of `opacity` and `filter`, because both are `calc()`s over it. Per CSS Transitions, a running transition whose after-change style no longer matches its end value is cancelled and restarted from the current value over the full duration. So on each frame of the `--axis-active` run, the `opacity` and `filter` transitions restart with a fresh 180ms budget toward a target that has already moved.

The result is not the declared curve. It is an exponential approach with a ~180ms time constant stacked on top of a 180ms eased ramp — a reveal that is materially longer than 180ms and whose easing is `cubic-bezier(0.4, 0, 0.2, 1)` applied **twice** (I resolved the token: `glass-ui/dist/styles/theme/bridges.css` → `--ease-standard: var(--motion-ease-standard)` → `cubic-bezier(0.4, 0, 0.2, 1)`). The lag is worst on release, where a laggy return reads as an unresponsive latch.

The comment at `:58–59` states the correct mechanism and then contradicts it: "the registered `@property` lets both channels interpolate" is exactly why `opacity` and `filter` must **not** appear in the transition list. Deleting them is the whole fix; `--axis-active 180ms var(--ease-standard, ease)` alone produces precisely the intended reveal.

**Falsifier:** a transition list containing only `--axis-active`, or evidence that the engines under test coalesce rather than restart derived-property transitions whose end value changes mid-run (CSS Transitions §"Starting of transitions" is explicit that they restart). A live trace showing the reveal completing in ~180ms with a single ease would kill it. Note the failure is *slow and mushy*, not broken — which is why it survived review.

### D-3 · WCAG 1.4.11: the locked line — the state that carries information — is under 3:1 in **both** themes — MAJOR

Tokens (`demo/styles/style.css:109–111`, three declarations total, **no `.dark` override anywhere in the tree**):

```
--axis-x: hsl(0 72% 54%);      → #DE3535
--axis-y: hsl(120 47% 47%);    → #3FB03F
--axis-z: hsl(240 76% 58%);    → #4343E5
```

Background resolves `--background` → `--neutral-0` → `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` (glass-ui `dist/styles/tokens/light-dark.css`, `tokens/dark-arm.css`). Composites computed with the sRGB relative-luminance formula; the rest state composites the border colour at the element `opacity` of 0.45.

| axis | rest (α 0.45) light | **locked** light | rest (α 0.45) dark | **locked** dark |
|---|---|---|---|---|
| `--axis-x` red | 1.96:1 | 4.32:1 ✓ | 1.71:1 | 4.40:1 ✓ |
| `--axis-y` green | 1.54:1 | **2.69:1 ✗** | 2.25:1 | 7.08:1 ✓ |
| `--axis-z` blue | 2.13:1 | 6.39:1 ✓ | 1.45:1 | **2.98:1 ✗** |

The rest register is defensible and I am **not** claiming it: `:47–49` documents the demotion from 0.75 to 0.45 as deliberate (T.A2), and `DESIGN.md:84–85` rules that "Stage tint is a low-contrast substrate, never a signal" — at rest these are substrate and 1.4.11's decorative exemption applies.

The **locked** state is the claim. `:4–7` and `:49–52` are explicit that the locked line is the sole carrier of "the single-axis constraint OrbitalDrag enforces" — it is state information about an active UI control, squarely inside 1.4.11. And the failure lands in each theme on a different axis, so no single-theme fix exists: green fails in light, blue fails in dark. The root cause is structural — the axis triple is three fixed `hsl()` literals with no dark arm, while the demo's own accent authority two declarations later (`style.css:~130`, `--accent-kf`) uses `light-dark()` precisely so "the accent keeps ONE identity across the theme toggle." The axis palette was left off that discipline.

The drop-shadow bloom (`:54–57`) adds a halo at lock that raises *perceived* salience, but a same-hue bloom does not raise the measured contrast of the 1px stroke against the ground.

**Falsifier (three ways):** (a) the effective backdrop is materially different from `--neutral-0` — the stage carries a graph-paper field per `DESIGN.md:82–83`, and if its ink shifts local luminance by enough, the green-in-light figure moves; I computed against the flat token and say so. (b) The locked state is ruled purely decorative — but `:4–7`'s own prose forecloses that reading. (c) The `dashed → solid` tell (D-15, S-1) is accepted as the informational channel, making the colour non-load-bearing — a defensible ruling, though 1.4.11 still asks that the boundary itself be perceivable.

### D-4 · The Z axis line is geometrically degenerate — it cannot render as an axis — MAJOR

`CubeAxisLines.vue:44–45, 85–88`:

```
    width: 1000vw;
    height: 0px;
    …
    &.z {
        --color: var(--axis-z);
        transform: rotateY(90deg);
    }
```

`.axis-line` is a direct child of `.graph`, which carries `perspective: 1200px` (`CubeTarget.css:14–16`) and the `.preserve-3d` utility (`CubeTarget.vue:9`; glass-ui `dist/styles/utilities/base-misc.css` → `.preserve-3d { transform-style: preserve-3d; }`). `perspective-origin` and `transform-origin` both default to `50% 50%`, and the element's static position centres it in `.graph`'s area (grid, `items-center justify-center`).

So `rotateY(90deg)` about the box centre maps the box's 1000vw **x**-extent onto **z**, producing a line that runs along the view axis and passes through the perspective origin. A line through the projection centre projects to a *point*. What actually survives is the 1px top/bottom borders offset ±1px in y — two nearly-coincident rays converging on the vanishing point, i.e. a sub-pixel needle at the die's centre. Worse, the half of the line at z > +1200px lies **beyond the eye plane**, where perspective projection is undefined and engines clip or invert.

X and Y are fine (`.x` horizontal, `.y` rotated 90° in-plane to vertical). Z — the one axis whose depth semantics a 3D scene actually needs — is the one that does not draw. A depth axis wants a small `rotateX`/`rotateY` off-normal (or an explicit `translateZ` sweep), not an exact 90°.

**Falsifier:** a render showing a legible, depth-receding Z line. The geometry argument is decidable from source, but the *exact* on-screen residue (needle vs. nothing vs. clip artifact) is engine-dependent — **UNPROVEN-NEEDS-LIVE for appearance, PROVEN for the projection**. If the axis lines' static position resolves off-centre (abspos-in-grid static position is the one cross-engine soft spot here — see D-16), the line no longer passes through the projection centre and would render as a converging line; that would falsify the "projects to a point" half while leaving the past-the-eye-plane half intact.

### D-5 · `z-index: var(--z-behind)` is inert inside the 3D rendering context — MAJOR

`CubeAxisLines.vue:64–67`:

```
    /* Below the content plane — the demo's named below-stack rung (W3.S2).
       Reconciles the former orphan raw below-plane value to the z-contract
       documented in style.css (--z-behind < --z-content). */
    z-index: var(--z-behind);
```

`.graph` is `preserve-3d` and carries no grouping property, so it establishes a 3D rendering context that both the axis lines and OrbitalDrag's container participate in. Within a 3D rendering context, painting order is depth-sorted, not `z-index`-ordered.

And the behaviour is **state-dependent**, which is the sharp part. `OrbitalDrag.vue:63–76`: `containerStyle` returns `{}` unless `applyTransformToContainer` is true, and `CubeTarget.vue:14` binds that to `props.isPlaying || props.isStarted`.

* **Not started:** the OrbitalDrag div has no transform and default `transform-style: flat`, so the die subtree flattens into a plane at z = 0, coplanar with the axis lines. `z-index` can act as a coplanar tiebreak → the lines paint behind. The comment holds.
* **Playing / started:** the div gains `transformStyle: 'preserve-3d'` plus a `translate3d…rotate3d…scale3d` transform and joins the 3D context. Faces sit at ±`--side-offset` (`CubeTarget.css:44`, `:87–103`). Depth sorting now runs, and the z = 0 axis lines **cut through** the die — front faces occlude them, back faces are occluded by them.

The 3D behaviour is arguably the *better* look for an axis gizmo. But it is not what the file says, and the file's claim propagates: `demo/DESIGN.md:99` and `demo/styles/style.css:38–39` both enshrine "the cube axis line" as the canonical `--z-behind` consumer. A depth rung whose ordering silently stops applying the moment the scene animates is a contract the codex cannot rely on.

**Falsifier:** a render in the *playing* state showing the axis lines uniformly behind every face (which would mean the engine honours `z-index` over depth sorting inside `preserve-3d`), or evidence that some ancestor between `.graph` and `.axis-line` flattens the context. I checked: `.graph` has no `opacity`/`filter`/`clip-path`/`mask`/`contain: paint`, and `.scene-host` (`App.vue:358–378`) explicitly removed its `contain: paint` as a falsified mitigation. `.axis-line`'s own `opacity` and `filter` flatten its (empty) subtree only; they do not withdraw it from the parent's context.

### D-6 · Keyboard-only, no touch parity, no §7 legend — the reveal does not cure the invisibility it claims to cure — MAJOR

The premise, `:2–8`: "the constraint was invisible. Holding the key now lights the matching axis line … so the otherwise-hidden single-axis lock becomes spatially legible."

It makes the *state* legible to someone who already knows the binding. It does nothing for the *affordance*. Nothing anywhere in the app tells a user that X/Y/Z do anything — I grepped the whole demo for the ruled instruction surface:

```
$ grep -rn "stage-legend\|stage-whisper" demo/
DESIGN.md:149, :167, :173, :258     ← spec only; ZERO implementation sites
```

`DESIGN.md §7` is unambiguous: "Every manipulable scene has one concise verb line in `.stage-legend`: what to drag, what motion is produced, **and what release/keyboard action does** … Cursor-only or home-only hints are not sufficient." §8 adds that the cube's whisper must carry "drag to orbit." Neither exists.

The scene-wide absence of `.stage-legend` is not this component's defect — it is the unlanded U.B8 rider (`DESIGN.md:258`). What *is* this component's defect is shipping a reveal whose stated purpose is discovery, whose entire discovery story is the unlanded rider, and which is **unreachable on touch**. There is no keyboard on a phone; `lock.x/y/z` can never become true. And the touch gap is not an oversight the codebase is blind to — the sibling egg in the same consumer was explicitly retrofitted for it:

```
CubeTarget.vue:224–226:
// S.G3 S2 — the Roll is a POINTER-based double-tap now (touch parity; the former
// `@dblclick` was mouse-only).
```

One egg in this file got touch parity as a named work item. The other, added later, has none.

**Falsifier:** a touch-reachable path to the axis lock (a long-press, a two-finger constraint gesture, a UI toggle), or a shipped legend/whisper naming X/Y/Z. `grep -rn "stage-legend\|stage-whisper" demo/` returning an implementation site kills the second half.

### D-7 · The latch is a global `keydown` with no focus guard — false lights and a stuck-lit state — MAJOR

`OrbitalDrag.vue:276–277` registers on **`window`**:

```
useEventListener(window, "keydown", (e: KeyboardEvent) => pointer.updatePressedKeys(e, true));
useEventListener(window, "keyup",   (e: KeyboardEvent) => pointer.updatePressedKeys(e, false));
```

and `useOrbitalPointer.ts:169–176` applies no guard at all:

```
const updatePressedKeys = (event: KeyboardEvent, isPressed: boolean) => {
    const key = event.key.toLowerCase();
    const slot = key === "control" ? "ctrl" : key;
    if (slot in pressedKeys.value) {
        pressedKeys.value[slot as keyof PressedKeys] = isPressed;
    }
};
```

No `event.target` test, no `isContentEditable` test, no `:focus-within` test, no drag-state test. Two consequences, both visible only because `CubeAxisLines` renders the latch:

1. **False lights.** Typing a literal `x`, `y`, or `z` into any focused field while the cube scene is mounted flashes the axis lines. The cube scene ships text inputs — `matrix-editor/MatrixEditor.vue:97` uses glass-ui `Input`, and the shell carries the share field (`SharePopover.vue`) and the Monaco host (`CSSCodeEditor.vue`). Typing "matrix" or "z-index" strobes the stage.
2. **Stuck-lit.** Hold `x`, switch tab or window; the `keyup` is delivered to the newly-focused surface and never reaches this `window`. `pressedKeys.x` stays `true`, so `--axis-active: 1` persists and one axis is permanently blown out and solid-stroked with no way to clear it but pressing and releasing `x` again. There is no `blur`/`visibilitychange` reset anywhere in `OrbitalDrag.vue` (read whole) or `useOrbitalPointer.ts`.

The fix belongs upstream in `updatePressedKeys`, and I say so plainly — but the reveal is what converts a silent state bug into a visible design defect, and the reveal is what should have forced the guard.

**Falsifier:** a focus/target guard inside `updatePressedKeys` or at the `useEventListener` call site, or a `blur`/`visibilitychange` handler clearing `pressedKeys`. I read both files whole and found neither. Also falsified if the cube scene never coexists with a focusable text input — `MatrixEditor.vue:97` says it does.

### D-8 · An unconditional `filter` on three ~10×-viewport-width elements, inside a live backdrop-filter's backdrop root — MAJOR

`:54–57` declares `filter: drop-shadow(...)` on `.axis-line` **unconditionally**. At rest `--axis-active` is 0, so it evaluates to `drop-shadow(0 0 0px color-mix(in srgb, var(--color) 0%, transparent))` — a visual no-op that nevertheless keeps a filter render pass and a stacking context resident on three elements each `1000vw` wide (≈19 200 px at a 1920 px viewport).

This scene's own stylesheet is the authority on why that matters. `CubeTarget.css:148–154` (T.A1) records that a `filter` in this subtree already caused one catastrophic regression — "`filter` is a CSS grouping property → it forced `.cube`'s USED `transform-style` to `flat`, collapsing the six 3D faces onto one plane (only face 1 survived — verdict #1)." The die is safe here (`.axis-line` has no 3D descendants), but the T.A1 lesson — *do not put a filter in this subtree without stating why it is safe* — is undischarged: nothing in this file acknowledges the hazard it is re-introducing one DOM level from a `preserve-3d` chain.

And `App.vue:362–378` (T.G1) states the paint mechanism precisely: "A live `backdrop-filter` re-rasterizes whenever ANY paint in its backdrop root changes within its footprint, so every frame the stage subject animates the glass chrome's blur re-samples it … VERDICT #19 root cause #1." The reveal animates a `drop-shadow` across the full stage for 180ms (in practice longer, per D-2), inside exactly that backdrop root. The `1000vw` width makes the filter's raster surface roughly ten times wider than any visible geometry requires.

`CubeTarget.css:52–61` (G5) shows the house discipline: `will-change: transform` is granted **only** while the cube is playing or hovered, "so an idle/off-screen cube holds no resident layer (a resident `will-change` keeps the layer alive forever, the G5 anti-pattern)." A resident no-op filter on three 19 200 px elements is the same anti-pattern with a different property. Gating the whole declaration behind `&.axis-line--locked` costs nothing — the class already exists at `:73`.

**Falsifier:** a paint profile showing no filter pass for `.axis-line` at rest (i.e. the engine folds a zero-radius, fully-transparent `drop-shadow` to `none`), or evidence that the glass chrome's `backdrop-filter` footprint does not overlap the stage. Both are live observations — **UNPROVEN-NEEDS-LIVE**; the source-side facts (unconditional filter, 1000vw, T.G1's stated mechanism) are proven.

---

## 3. MINOR

### D-9 · `width: 1000vw` — a raw viewport literal in an SFC, against `DESIGN.md §4` — MINOR

`DESIGN.md:87–92`: "The dock geometry is derived, not eyeballed … **a component must not introduce a viewport literal that bypasses those tokens. Geometry tokens (lengths, ratios, viewport clamps) live in `layout.css`.**"

`:44` is `width: 1000vw`, undeclared and underived — not φ, not a work-area clamp, not a token. `1000vw` is 10× the viewport width; nothing in the scene needs more than ~1.5×.

**Falsifier:** a `--axis-span` (or similar) in `layout.css` that `:44` consumes, or a §4 amendment exempting scene decoration. I grepped `layout.css` — 210 lines, no axis-span token. *Note:* this is MINOR, not MAJOR, because I tested the obvious escalation and it failed — see §6, K-1.

### D-10 · Appearance magnitudes hardcoded; `180ms` is off the duration ladder — MINOR

`DESIGN.md:143–146` partitions token homes: "signal, appearance, material, and interaction tokens → `design-idioms.css`", and §4 names "graph ink and pane idle opacity" as the archetypes. This file hardcodes, in the SFC: the `0.45` rest register and `0.55` span (`:53`), the `6px` bloom radius (`:55`), the `80%` mix strength (`:56`), and `180ms` three times (`:61–63`).

The rest register is exactly the "graph ink / pane idle opacity" class of magnitude §4 sends to `design-idioms.css`, and it is a *shared* concern — `matrix-editor/MatrixEditor.vue:143–155` binds the same `--axis-x/y/z` triple, so a second consumer of the axis register already exists.

`180ms` is additionally **off the ladder**. glass-ui ships `--duration-fast: 0.2s`, `--duration-normal: 0.3s`, `--duration-slow: 0.45s`. `180ms` is neither, and the file reaches for `var(--ease-standard, …)` on the same lines — so it knows the token vocabulary and declines the duration half of it. The sibling `--lit` transition uses `160ms linear` (`CubeTarget.css:79`), so the scene now runs two bespoke durations and neither is a token.

**Falsifier:** a codex amendment allowing colocated appearance magnitudes, or a `--duration-*` rung at 180ms. Neither exists (`grep -rho -- "--duration-[a-z]*:[^;]*;"` over glass-ui's styles returns exactly `0.2s`/`0.3s`/`0.45s`).

### D-11 · The flat-namespace hazard, twice — MINOR

`lane-frontend.md §6.3` names it: "**No `--kf-*` namespace exists** … Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own." This file instantiates it in two distinct ways.

1. **`--color`** (`:78`, `:82`, `:86`) is about as collision-prone a custom-property name as exists. It is unregistered, so it inherits by default; the only reason it is harmless today is that `.axis-line` has no descendants. `MatrixEditor.vue:143–155` uses the identical `--color` idiom, so a future shared ancestor makes this live. `--axis-line-color` costs three characters.
2. **`@property --axis-active` is declared inside `<style scoped>`** (`:37–41`). `@property` is a document-level at-rule; Vue's scoped transform rewrites *selectors*, not at-rule registrations. So `--axis-active` is registered **document-wide**, in a block whose delimiter tells every reader it is local. And because the cube scene is code-split, the registration's arrival time is coupled to route load — a second component registering `--axis-active` with a different `syntax`/`initial-value` would resolve last-wins in a non-deterministic order.

**Falsifier:** evidence that Vue's SFC compiler scopes `@property` registrations (it does not — it rewrites selectors and leaves standalone at-rules intact), or a demo-wide ruling that `--color` is a reserved local idiom. `grep -rho -- "--kf-[a-z-]*" demo/styles/*.css | wc -l` → 0 confirms the census finding still holds at this HEAD.

### D-12 · No `aria-hidden="true"` on three purely decorative divs — MINOR

`:10–24` renders three bare `<div>`s with no text, no role, no aria. Empty divs are largely inert to AT in practice, which is why this is MINOR rather than MAJOR — but the consumer sets the house precedent explicitly one file away, on an element of the same kind:

```
CubeTarget.vue:67–70:
    <span
        class="face-relit pointer-events-none absolute inset-0"
        aria-hidden="true"
    ></span>
```

Same job (a decorative visual overlay), same pointer-transparency, and it carries the attribute. The axis lines do not. Consistency here is nearly free and makes the decorative intent legible to the next reader as well as to AT.

**Falsifier:** an AT trace showing zero announcement, plus a ruling that empty decorative divs need no marking. The precedent at `CubeTarget.vue:69` is the argument, not a spec citation.

### D-13 · No `@media (forced-colors: active)` — the hue coding collapses while the bloom leaks colour — MINOR

In forced-colors mode `border-color` is forced to a system colour. All three lines then share one colour, so the entire X/Y/Z hue coding — the component's primary identity channel — collapses. Meanwhile `filter` is **not** in the forced-colors property set, so the `drop-shadow(... color-mix(in srgb, var(--color) …))` bloom keeps its authored red/green/blue and paints coloured haloes into a deliberately monochrome UI. Simultaneously, `opacity: 0.45` at rest reduces contrast against the forced `Canvas`, against the whole point of the mode.

glass-ui's `accessibility.css` has a `forced-colors: active` block, but it is keyed on `[aria-current]`/`[aria-selected]`/`[aria-pressed]`/`[aria-checked]`/`[data-state]` — these divs match none (see D-12). Nothing upstream covers this.

Note that the redundant `dashed → solid` tell (S-1) *does* survive forced colors, which is why this is MINOR: the lock state stays readable even when axis identity does not.

**Falsifier:** a forced-colors block reaching `.axis-line`, or evidence that `filter` colours are forced (they are not — `forced-color-adjust` covers `color`, `background-color`, `border-color`, `outline-color`, `fill`, `stroke`, `box-shadow`, not `filter`).

### D-14 · State is encoded twice, and the inline half is un-overridable — MINOR

`:10–14` (and the two siblings) bind the same boolean through two channels:

```
    :class="{ 'axis-line--locked': lock.x }"
    :style="{ '--axis-active': lock.x ? 1 : 0 }"
```

The class alone suffices: `&.axis-line--locked { --axis-active: 1; }` inside the existing block at `:73–75` produces identical behaviour with one binding instead of two.

The redundancy is not merely untidy. An inline `style` declaration outranks every stylesheet rule short of `!important`, so **no media query can override `--axis-active`**. A PRM block wanting to pin the reveal to its terminal state (the standard PRM idiom — keep the signal, drop the motion), or a forced-colors block wanting `--axis-active: 1` for maximum contrast, cannot do it without `!important`. The dual encoding therefore actively obstructs the fixes for D-1 and D-13.

**Falsifier:** a case where the reveal needs a value other than 0/1 — a continuous latch strength, say. `types.ts` types `PressedKeys` as six `boolean`s and `CubeTarget.vue:158–163` mirrors them into a three-boolean `reactive`, so no continuous source exists.

### D-15 · `border: 1px dashed` on a zero-height box is not a 1px line — MINOR

`:44–46`:

```
    width: 1000vw;
    height: 0px;
    border: 1px dashed var(--color);
```

`border` is the four-sided shorthand. With `height: 0`, the rendered stroke is the **top and bottom** borders stacked — a 2px double-dashed band, not the 1px line the declaration reads as. And the left/right borders paint 1px caps at ±500vw. When `:74` flips `border-style: solid`, it becomes a 2px solid bar. The honest primitives are `border-block-start: 1px dashed var(--color)` or a `repeating-linear-gradient` background; either gives a single stroke of stated weight and drops two useless edges.

This is not cosmetic pedantry — the stroke weight is what carries D-3's contrast, and a reader reasoning about that weight from `:46` will reason about the wrong number.

**Falsifier:** a rendered stroke measuring 1px. Two stacked 1px borders on a zero-height box measure 2px by the box model.

### D-16 · `position: absolute` with no offsets — the containing block is not the perspective parent — MINOR

`:68` declares `position: absolute` with no `top`/`left`/`inset`. The nearest positioned ancestor is CubeTarget's **outer** wrapper (`CubeTarget.vue:2–3`, which carries `relative`) — **not** `.graph`, which has no `position` and which is what supplies `perspective: 1200px` and `preserve-3d`. So the containing block and the perspective origin come from two different boxes, held concentric only by the outer grid centring `.graph`.

With all offsets `auto`, placement falls to static position, and for an abspos child of a grid container that is not its containing block, static position is resolved per CSS Grid §9.1 as if it were the sole item in an area coinciding with the grid's content edges — then `items-center`/`justify-items-center` apply. That is the single most engine-divergent corner of this component's geometry, and D-4's projection argument depends on it landing dead-centre.

`inset: 0; margin: auto` is the pattern the sibling already uses for exactly this problem — `CubeTarget.css:72–75`: "the faces are absolutely positioned; center them in the now honestly-sized side×side `.cube` box."

**Falsifier:** a cross-engine render showing the axis cross at the die's centre in all targets. Also weakened if `.graph` is given `position: relative`, which would collapse the two coordinate systems into one and make the placement explicit.

---

## 4. INFO

### D-17 · Prose volume and §6 prose ownership — INFO

26 of 90 lines are comment (template `:2–9` = 8; script `:29` = 1; style `:35–36`, `:45–52`, `:58–59`, `:64–66`, `:71–72` = 17), against roughly 20 CSS declarations. `DESIGN.md:140–142` rules: "Rationale prose is owned here. **Comments may point to a section; they do not mint a competing authority.**" `:45–52` mints one — an eight-line rationale for an appearance magnitude whose home §6 assigns to `design-idioms.css` and whose rationale §4 assigns to the codex.

"no new rAF, no new gesture machinery" appears three times across two files (`CubeAxisLines.vue:8`, `:29`, `CubeTarget.vue:157`), plus a fourth variant at `OrbitalDrag.vue:5`. `CubeTarget.css:11–12` already leaves the correct one-line pointer to this unit — that is the form §6 sanctions.

**Falsifier:** a codex amendment permitting colocated rationale. §6's sentence is unambiguous as written.

### D-18 · `transform: rotateX(0deg)` is a null declaration — INFO

`:79`. It is a no-op rotation kept so the `.x`/`.y`/`.z` rule blocks read symmetrically. It does create a stacking context (as its siblings do), so it is behaviourally consistent — but a reader looking for why `.x` is transformed finds nothing. A comment, or `transform: none`, would say what is meant.

**Falsifier:** a rendering difference between `rotateX(0deg)` and no `transform` on `.x`. Both create a stacking context and neither moves the box; the only distinction is documentary.

### D-19 · "single-axis lock" is not what the machinery does — INFO

`:3–7` and `:50–52` describe "the single-axis lock" and "the single-axis constraint OrbitalDrag enforces". `OrbitalDrag.vue:193–212` shows three **independent** `if` blocks — hold `x` and `y` together and both rotations apply. Multi-axis is reachable, and the reveal correctly lights two lines when it happens; only the prose says otherwise.

Sharper: within each block, `keys.shift` routes to `updateTranslation` and `keys.ctrl || keys.meta` routes to `updateScale` (`:198–200`). So the same lit line means *rotate*, *translate*, or *scale* along that axis depending on an invisible modifier. `PressedKeys` carries `shift`/`ctrl`/`meta` (`types.ts:8–15`) and `OrbitalDrag.vue:319` emits all six, but the prop type at `:30` narrows to `{ x, y, z }` — the reveal discards the three fields that would let it name the operation.

**Falsifier:** a constraint in `handleAxisSpecificInput` limiting to one axis (there is none — three sequential `if`s, no `else`), or a ruling that "which axis" is the whole intended signal and "which operation" is out of scope. The latter is defensible; the prose still overstates.

### D-20 · Props are not reactively destructured (`DESIGN.md §9.2`) — INFO

`:28–31` calls `defineProps<{ lock: … }>()` and discards the return, relying on the template's implicit binding. §9.2 rules: "**Props:** reactive destructure with inline defaults; getter functions are the seam into composables." The house form is `const { lock } = defineProps<{ … }>()`.

This is not the banned form — §9.2 names `withDefaults` and *runtime-object* `defineProps` as the legacy shapes, and this is neither. It is a deviation from the prescribed positive form only, hence INFO.

**Falsifier:** a §9.2 reading in which the prescription binds only when the script body reads a prop. The rule as written does not carve that out.

---

## 5. SUPERLATIVES

L-18 runs both ways; each carries its falsifier.

### S-1 · The redundant, motion-free lock tell — **genuinely excellent**

`:71–75`:

```
    /* While locked, the dashed stroke goes solid — a second, motion-free tell
       that the axis is the active rotation constraint. */
    &.axis-line--locked {
        border-style: solid;
    }
```

A shape channel independent of colour, opacity, and motion. It survives `prefers-reduced-motion` (no animation), forced-colors (`border-style` is not forced away), a low-contrast display, and every one of D-3's failing contrast rows. That is textbook WCAG 1.4.1 redundancy, and it is the single declaration most responsible for D-3 and D-13 being MAJOR/MINOR rather than blockers.

**Falsifier:** a forced-colors or high-contrast rule that normalises `border-style` across states — glass-ui's `accessibility.css` does force `border-style: solid !important`, but only under `[aria-current]`/`[aria-selected]`/`[aria-pressed]`/`[aria-checked]`/`[data-state]` selectors these divs do not match, so the tell survives. It would also die if the dashed/solid delta proved sub-perceptible at 1px — but see D-15: the stroke is actually 2px.

### S-2 · Axis identity rides orientation, not hue — **correct for X and Y, degenerate for Z**

`.x` horizontal, `.y` vertical (`rotateZ(90deg)`), `.z` depth (`rotateY(90deg)`). Orientation is a non-colour channel for axis identity, which matters because X is red and Y is green — the canonical deuteranopia-confusable pair. Two lines that a red/green-blind user cannot tell apart by hue remain trivially separable by direction.

**This superlative is partly falsified by my own D-4**, and I record that rather than banking it whole: the Z line's `rotateY(90deg)` is geometrically degenerate, so the orientation channel carries two of three axes, not three. Honest verdict: **strong for X/Y, void for Z.**

**Falsifier:** a render in which the depth line reads as a distinct third orientation — which would simultaneously kill D-4 and complete this superlative.

### S-3 · `pointer-events: none` on three ~19 200 px-wide elements — **load-bearing, not decorative**

`:69`. Without it, three elements each ten viewports wide, stacked at `--z-behind` over the entire stage, would intercept every pointer event in the cube scene and kill OrbitalDrag outright. `CubeTarget.vue:69` shows the same discipline applied to `.face-relit`. It is one declaration between working and catastrophically broken.

**Falsifier:** an ancestor already blocking hit-testing on this subtree, which would make the declaration redundant. `.graph` and its ancestors set no `pointer-events`; `CubeTarget.css:22–24` sets it only on `.cube--rolling`, transiently.

### S-4 · `@property` is the right primitive for this problem — **correct choice, mis-wired**

`:37–41` registers `--axis-active` with `syntax: "<number>"`, `inherits: false`, `initial-value: 0`. Registration is exactly what makes a custom property feeding two `calc()`-derived channels interpolate as one coherent value — an unregistered property would step 0→1 with no intermediate frames and no reveal at all. `CubeTarget.css:5–10` shows the same instinct for `--lit`. The mechanism is right; D-2 is that the transition list then also lists the two derived properties, which is what breaks it.

**Falsifier:** evidence that `opacity`/`filter` transitions alone (without the registration) would produce the intended reveal — they would not, since a step change in `--axis-active` yields a step change in both computed values, and transitioning *those* would in fact work, at the cost of two independently-timed channels instead of one. That alternative design is defensible; the registration is the better of the two.

### S-5 · Colocation is codex-compliant, and the pointer was left behind — **correct**

`DESIGN.md §9.1`: "The split rule is **one number:** a style block over 100L or an SFC over 300L gets a sibling sheet." This style block is 57 lines (`:34–90`) and the SFC is 90 — both under. Colocation is the correct call, and `CubeTarget.css:11–12` leaves precisely the pointer §6 sanctions:

```
/* P.W5.S3 — the axis-lock reveal (@property --axis-active + the .axis-line
   styles) lives in the colocated CubeAxisLines sub-unit, beside its markup. */
```

A reader arriving at the parent sheet looking for `.axis-line` is redirected in one line. This is the discipline D-17 says the rationale comments should have imitated.

**Falsifier:** a §9 amendment lowering the threshold (`DESIGN.md:222–224` explicitly supersedes "Lane 24's earlier ~40L suggestion" with this measured rule, so the 100L number is the current law).

### S-6 · `var(--ease-standard, ease)` resolves — **verified, not assumed**

I treated the fallback as a candidate defect (a fallback silently masking a dead token reference is a classic). It is not:

```
glass-ui/dist/styles/theme/bridges.css        → --ease-standard: var(--motion-ease-standard);
glass-ui/dist/styles/tokens/scheme-spring.css → --ease-standard: var(--motion-ease-standard);
                                              → --motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
```

reachable through `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"`. Thirteen other demo call-sites use the same defensive form. The fallback is belt-and-braces, not camouflage — and the token is the correct standard-motion curve for a state reveal.

**Falsifier:** glass-ui's `styles` index not importing `theme/bridges.css` on the demo's cascade path, which would make `ease` the live value. Worth one live `getComputedStyle` during SS-13 — **UNPROVEN-NEEDS-LIVE** for the resolved value, proven for the declaration.

---

## 6. Claims I killed with their own falsifier

Recorded because a false defect is worse than a missed one.

**K-1 · "`width: 1000vw` produces runaway document overflow / phantom scrollbars."** Attractive escalation of D-9 to MAJOR. **Killed:** `demo/styles/style.css:210–219` sets `html, body { overflow: hidden; overscroll-behavior: none; }`. The 19 200 px boxes are clipped at the viewport and contribute no scrollable region. D-9 stands as a codex violation and a wasted raster surface (D-8), **not** a layout defect.

**K-2 · "`filter` on `.axis-line` re-flattens the 3D scene, per T.A1."** The T.A1 note at `CubeTarget.css:148–154` makes this the first thing to check. **Killed:** the grouping-property rule forces `used transform-style: flat` on the element's own subtree; `.axis-line` is a childless leaf, and it still participates in `.graph`'s 3D context as a plane. The die is safe. What survives is the *undischarged-hazard* half of the argument and the raster cost — both folded into D-8 at reduced severity.

---

## 7. Corpus reconciliation

**C-1 · CONTRADICTION — `lane-frontend.md` is wrong at its own HEAD about this file's `z-index`.**

The census records, twice:

* §4 roster, line 253: `| 90 | scenes/cube/CubeAxisLines.vue | b | axis lines (raw z-index:-10) |`
* §6.3: "One acknowledged exception: `CubeAxisLines.vue`'s raw `z-index:-10`."

The tree reads:

```
CubeAxisLines.vue:67:    z-index: var(--z-behind);
```

This is not staleness. The census names HEAD `8281638c`; the repo is still at `8281638c`; `git status --porcelain demo/scenes/cube/CubeAxisLines.vue` is empty; and `git show HEAD:demo/scenes/cube/CubeAxisLines.vue | sed -n '64,68p'` returns the tokenised form with its reconciliation comment. The census was wrong when written.

**The census inherited the error from the demo's own prose**, which is the actionable half. Both of these are live and both are false:

* `demo/styles/style.css:38–39` — "The one raw `z-index: -10` (CubeTarget axis line) reconciles to `--z-behind` above."
* `demo/DESIGN.md:99` — `| --z-behind (-10) | below the content plane (the cube axis line) |`

The first describes a raw value that no longer exists. The second is the codex row that D-5 shows is only conditionally true. Any wave touching the demo's z-contract should correct the source prose first, then the census row.

**Folded without contradiction:**

* `lane-frontend.md §6.5` (PRM roster, 13 sites / 12 files) — the roster's *omission* of this file is the census being right; D-1 is the consequence the roster implies but does not state.
* `lane-frontend.md §6.3` (98 unprefixed demo custom properties, zero `--kf-*`) — D-11 is a concrete instance; both `--color` and the document-global `@property --axis-active` land in that flat namespace.
* `lane-frontend.md §5` shadow census — no glass-ui primitive shadows this component. `/aurora`, `/motion-core`, and the timeline geometry family are all wrong shapes for a 3D axis gizmo. **No S-n shadow claim applies; this is justified-bespoke**, in the S-8 sense rather than the S-1 sense.
* `lane-frontend.md §4` line count (90) — confirmed exact.

---

## 8. Verdict

Nineteen of twenty findings are cheap to discharge; the component's core idea — read a latch the gesture layer already owns, spend no new rAF, add a motion-free redundant tell — is sound, and S-1/S-3/S-4 are real craft.

What it does not survive is the gap between what it says and what it does. The transition block claims PRM compliance it does not have (**D-1**), claims a 180ms standard-ease curve it does not render (**D-2**), and claims a depth-rung reconciliation the 3D context nullifies the moment the scene animates (**D-5**). Its Z axis does not draw (**D-4**), its contrast fails at the exact moment it is trying to inform (**D-3**), its affordance is unreachable on touch while its sibling egg in the same file was explicitly fixed for touch (**D-6**), and it can be lit by typing in a text field (**D-7**).

The single highest-value repair is four lines: delete `opacity` and `filter` from the transition list, gate `filter` behind `.axis-line--locked`, move `--axis-active: 1` from the inline binding into that same rule, and add the `@media (prefers-reduced-motion: reduce)` block the comment already promises. That discharges D-1, D-2, D-8, and D-14 together and unblocks D-13.
