claude-opus-5[1m]

# CHALLENGE · SquareInstrument · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareInstrument.vue` (212 lines)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, integration seams with siblings.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Tree HEAD `f9752c58` for this file (`git log --oneline -3 -- …/SquareInstrument.vue`).
**Posture:** assumed DEFECTIVE until the tree proved otherwise. Every claim carries file:line provenance and its own falsifier. Claims that cannot be closed statically are marked **UNPROVEN-NEEDS-LIVE** and reserved for the SS-13 visual audit.

**Verdict: 14 charged findings — 1 BLOCKER, 3 MAJOR, 9 MINOR, 1 INFO — plus 4 superlatives.**

---

## 0. What this component actually consumes

The census marks it `b` — no glass-ui import (`lane-frontend.md` §4, scenes table, row `212 | square/SquareInstrument.vue | b`). That is correct and it is the whole axis in one line:

| producer | import-level | string-level |
|---|---|---|
| keyframes.js | **0** — no `@kf-engine`, no `@mkbabb/keyframes.js` | 0 |
| glass-ui | **0** — no `@mkbabb/glass-ui` subpath | **11 utility classes + 6 CSS custom properties** |
| value.js | **0** | 0 (its colour work is browser-native `color-mix()`) |
| vue | `computed` only (`:60`) | — |

So the component consumes both producers **entirely through unversioned, untypechecked strings**: `text-display` `text-mono-small` `text-mono-caption` `text-caption` `text-admin-label` `readout-accent` `status-badge` `settled-badge` `tracking-badge` `tabular-nums` `leading-none` (+ `px-2 py-0.5 rounded-full`), and `--border` `--foreground` `--color-progress` `--duration-fast` `--ease-standard` `--z-content`.

Provenance of the class rungs (installed 7.0.0, `node_modules/@mkbabb/glass-ui/dist/`):

```
typography/semantic.css   → text-caption, text-admin-label      (glass-ui-owned)
typography/utilities.css  → text-mono-small, text-mono-caption   (glass-ui-owned)
demo/styles/style.css:271 → .text-display                        (demo-owned)
demo/styles/design-idioms.css:190,218,230,234
                          → .readout-accent, .status-badge, .settled-badge, .tracking-badge  (demo-owned)
```

That mixture — four glass-ui rungs and five demo idioms, visually indistinguishable at the call site — is the structural finding this axis exists to surface. It is charged concretely at **C-14**; its upside is charged at **S+4**.

---

## 1. BLOCKER

### C-1 · The tether `<svg>` has no `viewBox`; `preserveAspectRatio="none"` is therefore a no-op and the whole coordinate contract the file documents does not exist — **BLOCKER**

`SquareInstrument.vue:12–19`:

```
12  <svg
13      class="square-tether"
14      :class="{ 'square-tether--active': tetherActive }"
15      aria-hidden="true"
16      preserveAspectRatio="none"
17  >
18      <path class="square-tether-line" :d="tetherPath" />
19  </svg>
```

Three attributes. **No `viewBox`.** The file's own comment asserts the opposite (`:78–81`):

> `// The SVG user space is 0..100 (preserveAspectRatio="none"); home is the centre (50,50)`

and the geometry is written to that assertion (`:84–96`): `hx = 50`, `hy = 50`, emitting `M 50 50 Q … `.

`preserveAspectRatio` governs the fit of a **viewBox** into a viewport. With no `viewBox` there is no user-space→viewport mapping to govern: the attribute is inert and SVG user units equal CSS pixels of the `<svg>` box. The element is `position:absolute; inset:0; width:100%; height:100%` (`:147–151`), so `M 50 50` resolves at **50 px right / 50 px down from the stage's top-left corner** — not at the plate centre, where `.square-field`'s crosshair is drawn (`:113–121`, 50 %-stop gradients on both axes) and where the box sits (`SquareScene.vue:12`, `grid place-items-center`). The "rubber-band tether from home to the box" is, statically, a ≤38 px arc in the top-left corner attached to nothing.

**Three independent corroborations that the 0..100 space was intended and is missing, not that px was intended:**

1. `stroke-width: 0.8` (`:162`). In a 100-unit space that is a hairline after scaling; at 1:1 px it is a sub-pixel ghost.
2. `vector-effect: non-scaling-stroke` (`:165`). This exists to defeat the anisotropic stroke distortion that `preserveAspectRatio="none"` + a `viewBox` produces. With no `viewBox` there is no scaling to defeat — the property is dead alongside the attribute.
3. The demo knows the idiom and applies it correctly two directories away: `demo/scenes/spring/SpringTrace.vue:18` `viewBox="0 0 100 60"`, with `:80` documenting "Map to a 100×60 viewBox". `demo/scenes/easing/EasingTarget.vue:97` `viewBox="0 0 1 1"`. Those are the demo's only other authored `viewBox`es (`grep -rn "viewBox" --include="*.vue" demo/` → 3 hits, one of them this file's sibling).

**Not a regression:** `git log -p --follow -- demo/scenes/square/SquareInstrument.vue | grep viewBox` → empty. The attribute was never present. The tether has been geometrically wrong since introduction (`L.W11 S4`).

**Falsifier.** Any of: (a) a `viewBox` supplied from another source — impossible, `viewBox` is a presentation attribute with no CSS property and no other authoring site exists (`grep -rn "square-tether" demo/` → 2 files, this one and one dead rule, see C-8); (b) a live render in which the path spans crosshair→box; (c) an SVG-spec reading in which `preserveAspectRatio` binds without a `viewBox`. (c) is closed by spec. (a) is closed by grep. **(b) is UNPROVEN-NEEDS-LIVE and is the single highest-value probe for the SS-13 visual pass — the static facts (attribute absent, spec no-op, three corroborating properties) stand regardless.**

**Why it lands on axis C.** This is the demo hand-rolling coordinate geometry that glass-ui already owns and ships: `dist/components/timeline/geometry.d.ts` is the primitive `lane-frontend.md` §S-3 names for exactly this ("percent-positioning arithmetic … that `geometry.d.ts` exists to own"). S-3 flagged the hand-roll as an **AMBER duplication**; this file demonstrates it is also a **correctness** cost. Extend S-3's argument with this datum.

---

## 2. MAJOR

### C-2 · `TETHER_REACH` is decoupled from the subject's real travel — the tether cannot track the box at any stage size but one — **MAJOR**

`SquareInstrument.vue:82` `const TETHER_REACH = 38;` — a fraction of the (intended) 100-unit space, i.e. **percent-of-stage**. The subject it claims to point at moves in **pixels**: `useSquareDemo.ts:64` `const TRAVEL = 110;` ("How far (px) a full [-1, 1] spring deflection translates the box"), consumed at `:203–204` (`springX.value * TRAVEL`) and re-exported to the drag math as `travel` (`:323`).

Grant C-1 its cure (`viewBox="0 0 100 100"`). Under `preserveAspectRatio="none"` over a stage of W×H px, one user unit = W/100 px horizontally and H/100 px vertically. The tether endpoint offset is `defl · 38 · W/100 = 0.38·defl·W`; the box's real offset is `defl · 110`. They coincide **iff W = 110/0.38 = 289.5 px**, and independently iff H = 289.5 px. Any other size mis-scales; and because W and H scale independently under `none`, a non-square stage mis-scales the two axes by **different** factors — the tether leaves the box's diagonal entirely.

The root cause is a **props-contract** one, which is why it is on this axis: the contract hands the component normalized deflection (`:63–64`) and nothing else. It receives no `travel`, no stage rect, no element ref. It therefore *cannot* compute the endpoint correctly even in principle, and invented a magic constant instead. `travel` is available at the parent (`SquareScene.vue:132`, destructured from `useSquareDemo`) and is passed to nothing.

**Falsifier.** A stage measured at 289.5 px in both axes would make the constant right by coincidence. `.square-stage` is `h-full w-full` of the scene cell (`SquareScene.vue:12`) with `overflow:hidden` to clip overshoot (`SquareScene.css:2–4`); the box alone is `--size: 12rem` = 192 px (`SquareScene.css:34`). Whether the live stage is 289.5 px square is **UNPROVEN-NEEDS-LIVE** — but the claim as stated ("coincides at exactly one size per axis, and only when square") is a closed-form fact of the mapping, not an observation.

### C-3 · The instrument observes ONLY the spring authority — during `playback` it freezes and reports false state, because it consumes zero keyframes.js — **MAJOR**

This is the headline of the consumption axis.

The square scene has **two** paint authorities over the same box:

1. the per-axis `SpringProgress` pair driven by an owned `RAFPlayback` loop (`useSquareDemo.ts:60–61, 164–252, 259–265`);
2. the engine's `CSSKeyframesAnimation` four-corner tour, played through the `AnimationGroup` (`useSquareDemo.ts:342–371`; `SquareScene.vue:173–180`).

All seven props of this component are sourced from **(1) only**. The parent's `onTick` hook (`SquareScene.vue:143–152`) writes `deflX/deflY/settled/tetherActive`, and `springReadout` is written at drag/keyboard cadence (`SquareScene.vue:266–268, 279–281, 304–308`). `onTick` is fired **only inside the spring loop's `frame()`** (`useSquareDemo.ts:243–247`), and that loop **self-terminates the moment every spring settles** (`:239, 251`) and is re-armed only by `reseat` / `settle` / `tumble` (`:275, 289; useSquareTumble.ts:45`). Nothing in the Play path arms it.

Consequence, statically derivable: when the user presses Play, `mode` becomes `playback` (`SquareScene.vue:165–168`), the group drives the box through a ±90 px diamond with a full 360° rotation and a colour sweep (`useSquareDemo.ts:348–369`) — **while the springs sit settled and the loop is stopped**. Therefore, for the entire duration of the tour:

- `settled` stays `true` → the badge renders **"settled"** (`:31–32`) while the box is visibly touring;
- `readoutX` / `readoutY` stay frozen at the last drag/keyboard **target** (`:25, 27`) while the subject is elsewhere entirely;
- `deflX` / `deflY` stay frozen → the tether geometry (`:83–97`) is stale;
- the legend still reads "spring-chased · drag the box, or press Play to tour it" (`:41–43`) with no state distinction.

A component whose stated job is telemetry (`:5–7`, "the telemetry strip (serif title + accent x/y readout + settled/tracking badge)") displays numbers that are wrong whenever the scene's *other* authority is painting.

The consumption framing: keyframes.js exposes the running animation's state, and the scene already holds the handle — `SquareScene.vue:311` builds `facilityFromGroup(() => animationGroup)` and exposes it (`:313–323`). The instrument is handed none of it, and it has **no `mode` prop** (the `SquareMode = "idle" | "drag" | "playback"` union at `SquareScene.vue:113` stops at the parent), so it cannot even suppress a reading it knows to be stale. The demo's most instrumented scene consumes zero engine state in its instrument layer.

**Falsifier.** Any of: (a) `onTick` firing during playback; (b) a Play path that arms the spring loop; (c) an engine-derived prop on this component. (a) — `frame()` runs only under `playback.loop()` (`useSweepScene.ts:82–87`), armed only by `startLoop`; (b) — `startLoop` has exactly three callers, all spring/gesture (`useSquareDemo.ts:275, 289`, `useSquareTumble.ts:45`), none on the group; (c) — `SquareScene.vue:18–26` passes seven props, all spring-derived. All three closed statically. The *visual* claim ("the badge says settled while the box tours") is **UNPROVEN-NEEDS-LIVE**; the *data-flow* claim is proven.

### C-4 · Every root is `aria-hidden`, so the disclosure of a **keyboard-only** feature is unreachable by assistive tech — and the square's keys are absent from the glass-ui shortcut registry the demo already consumes — **MAJOR**

All four root nodes carry `aria-hidden="true"`: `:10` (field), `:13` (tether), `:21` (telemetry), `:35` (legend). Inside the hidden legend sit the demo's only advertisements for two hidden features:

```
48      >double-click to tumble</span>
55      >press C to trace the field</span>
```

The second is a **keyboard** affordance — `useSquareKeyboard.ts:73–76` binds `c`/`C` to `tourEnvelope()`, the P.W6 envelope-tour egg. Its sole discoverability surface is inside an `aria-hidden` subtree. The box's own accessible name names neither (`SquareScene.vue:51`, "Drag the box across two axes — a spring chases each axis"), there is no `aria-describedby`, and there is no sr-only mirror.

The second half is the consumption defect proper. glass-ui ships a shortcut registry and the demo consumes it: `registerShortcut` from `@mkbabb/glass-ui/keyboard` (census §3.1, `/keyboard` ×3), driving `useRegisteredShortcuts` / `formatComboParts` in `KeyboardShortcutsModal.vue:48–51`. Twenty-odd bindings are registered at `useControlsKeyboardShortcuts.ts:50–70`. The square registers **none**:

```
$ grep -rn "registerShortcut" demo/scenes/square/   → (no output)
```

So `C`, the arrows, `Home`/`End` are invisible in the shortcuts modal — the one place a keyboard user would look. The component paints a bespoke hint for them instead, then hides it from AT.

Compounding: the hints are gated on `tumbleHintShown` (`:46, 53`), which the parent flips only after the **first drag settles** (`SquareScene.vue:149–151`, guarded by `hasDragged`). A keyboard-only user never drags, so the flag never flips, so the hint would never render even if it were exposed.

**Falsifier.** An `aria-describedby`, an sr-only mirror, a registry entry, or a keyboard path that sets `hasDragged` — `grep` closes all four (`hasDragged` is written at exactly one site, `SquareScene.vue:230`, inside the drag seam's `onStart`).

---

## 3. MINOR

### C-5 · Prop JSDoc asserts an aria coupling this component does not have — **MINOR**

`:70` — `/** The formatted x/y readouts (the aria-coupled telemetry numerals). */`

Within this file those props render into `aria-hidden` subtrees only (`:21, 25, 27`). The real aria coupling lives in the **parent** and does not route through these props at all: `SquareScene.vue:63, 73` bind `:aria-valuetext="\`x ${springReadout.x}\`"` on the sr-only sliders, reading the same `springReadout` object directly. The doc names a contract the component does not hold, and points a maintainer at the wrong file for the a11y guarantee.
**Falsifier:** any `aria-*` binding in this file consuming `readoutX`/`readoutY` — there is none (`:1–57` contains four `aria-hidden` and nothing else `aria-`).

### C-6 · `tumbleHintShown` gates two unrelated hints; the prop name is false for one of them — **MINOR**

`:73–74` declares it as "Whether the progressive tumble hint has been disclosed", and `:46` uses it for the tumble hint. `:53` then reuses the same boolean for the **envelope-tour** hint — a different feature, a different input modality (keyboard vs pointer), a different egg. One flag, two semantics, no way to disclose them independently or to name the second in the contract.
**Falsifier:** a second disclosure prop, or the two hints being the same feature — neither holds (`useSquareKeyboard.ts:13–21` vs `useSquareTumble.ts:42–46` are disjoint).

### C-7 · Orphan class `square-live-caption` — shipped in the DOM, defined nowhere — **MINOR**

`:41` `class="square-live-caption text-caption text-muted-foreground"`.

```
$ grep -rn "square-live-caption" demo/ node_modules/@mkbabb/glass-ui/dist/   → 1 hit (the usage above)
```

No rule in this file's scoped block (`:100–212`), none in `SquareScene.css`, none in `demo/styles/`, none in the installed design system.
**Falsifier:** any definition anywhere in the resolved cascade — the grep spans both producers' full trees.

### C-8 · A sibling reaches across the component boundary to style `.square-tether`, and the rule is dead — **MINOR**

`SquareScene.css:136–139` contains a `prefers-reduced-motion` block targeting `.square-tether { transition: none; }` — a class this file owns and already handles identically at `:207–211`. The same sibling file states the opposite intent nine lines earlier (`SquareScene.css:8–10`: "The instrument layer … is styled inside the colocated SquareInstrument sub-unit").

The rule is not merely redundant — it is **inert**. `SquareScene.css` is applied `<style scoped src>` (`SquareScene.vue:331`), so it compiles to `.square-tether[data-v-«SquareScene»]`. Vue 3.5.35 propagates a parent's scope id onto a child component's root **only when that child renders a single root vnode** (the renderer's `setScopeId` recurses to the parent vnode only when `vnode === parentComponent.subTree`). SquareInstrument renders **four** roots (`:10, 12, 21, 35`), so its subtree is a Fragment, no root equals it, and the parent's scope id is never stamped. The `<svg>` carries only SquareInstrument's own `data-v-*`.

The live rule at `:207–211` makes this harmless today; the defect is the boundary breach plus a rule that silently does nothing.
**Falsifier:** if Vue stamped the parent scope id onto every root of a fragment child, the rule would be live — and then merely a duplicate of `:207–211`. Either branch condemns the reach; only the severity moves.

### C-9 · Multi-root with no `$attrs` binding — attribute fallthrough is silently dropped — **MINOR**

Four roots (`:10, 12, 21, 35`), no `inheritAttrs: false`, no `v-bind="$attrs"`. Vue cannot choose a fallthrough target, so any `class` / `id` / `data-*` / listener a parent adds is discarded (with a dev-mode warning). Also the mechanism behind C-8.

Latent, not live: `SquareScene.vue:18–26` passes only declared props today. But the component publishes no signal of this constraint, so the first consumer that adds a `class` or a `data-testid` loses it without a build error.
**Falsifier:** a current call site passing a non-prop attribute — there is exactly one call site and it passes none.

### C-10 · Advertised verb contradicts the sibling's own documented cure — **MINOR**

`:48` "double-click to tumble". The gesture is not a double-click: `SquareScene.vue:287–292` wires `useDoubleTap`, adopted precisely because "the former `@dblclick` was mouse-only" (`SquareScene.vue:285–286`, "S.G3 S2 — the Tumble is a POINTER-based double-tap now (touch parity)"). On touch, the copy names an interaction the platform does not have. The fix the sibling landed was never propagated to the string that advertises it.
**Falsifier:** `useDoubleTap` being mouse-only — its own header states touch parity, and it is registered via pointer events on `el`.

### C-11 · **Shadow S-9** — the telemetry readout hand-rolls glass-ui `/metric`, which the *sibling scene* already imports — **MINOR**

`:21–28` builds a label/value telemetry grid from raw spans plus a 4-column CSS grid (`:185–190`). glass-ui 7.0.0 ships the primitive family, unimported by this file:

```
dist/components/metric/index.d.ts
  export { Metric, MetricCell, MetricRow, MetricStack }
dist/components/metric/types.d.ts
  MetricTextProps { value?, unit?, placeholder?, loading?, label?, context?, class? }
  MetricProps     { …, size?: "sm"|"md"|"lg"|"xl", orientation?: "inline"|"stacked" }
```

`label` + `value` + `orientation:"inline"` is precisely the shape being hand-built here, and `MetricRow` / `MetricStack` cover the two-axis stacking. The demo already consumes it — **in the adjacent scene**: `demo/scenes/sequence/SequenceTarget.vue:138` `import { Metric } from "@mkbabb/glass-ui/metric";`, rendered at `:18`. Two scenes render the same semantic (a labelled live numeric telemetry readout) two different ways.

This is a **new row for the S-1..S-8 shadow census** in `lane-frontend.md` §5 — file it as **S-9**, verdict *replace* (unlike S-3/S-4, no bespoke geometry or editing semantics ride on it; `/metric` is already a consumed subpath, so §3.1's utilisation figure does not move).
**Falsifier:** `MetricProps` lacking an inline two-axis shape — `orientation:"inline"` plus `MetricRow`/`MetricStack` covers it (`types.d.ts:5, 17–27`).

### C-12 · **Shadow S-10** — the settled/tracking pill vs glass-ui `Chip` — **MINOR (evaluate, not swap)**

`:29–32` renders a static status pill via demo idioms. glass-ui ships `Chip` with exactly this contract — `mode: "static"` (documented "the noninteractive default"), `shape`, `size`, `tone?: string`, `surface` (`dist/components/chip/types.d.ts:5–22`) — and `/chip` is already a consumed subpath (census §3.1, 2 sites: `EasingTarget.vue`, `SpringPhysicsFacet.vue`).

Weaker than C-11 and deliberately rated lower: `.status-badge` is a **demo-wide** idiom, not a per-component hand-roll — `design-idioms.css:213–242` defines it once and three scenes consume it (`SquareInstrument.vue:30`, `SequenceTarget.vue:39`, `SpringTarget.vue:45`) — and it carries a documented AA-contrast guarantee (`design-idioms.css:214–217`, `--badge-tint` 14 % tint with a `--badge-text-mix` 50 % push toward `--foreground` "so it reads ≥4.5:1 against the tint in both themes"). Whether `Chip`'s `tone` pipeline reproduces that guarantee is not statically decidable. File as **S-10, verdict *evaluate***, and note it is a demo-wide decision, not this component's.
**Falsifier:** `Chip`'s tone handling meeting the same AA contract — undetermined from the `.d.ts` alone; needs the producer's `chipVariants` + contrast evidence.

### C-13 · The tumble this component advertises is the demo's single known **value.js R1** crash surface, held safe only by cascade order — **MINOR (latent, currently governed)**

Axis instruction: value.js transitive exposure, the R1 parser-crash class, *where reachable*. In this file it is **not** reachable directly (see §5). It is reachable **through the affordance this file advertises**, and that path deserves recording because this component is its only recruiter.

`:48` discloses the tumble. The tumble's paint path is `useSquareTumble.ts:21–25`:

```
21  const asColor = (css: string): CssColor => {
22      const parsed = parseCssColor(css);
23      if (!parsed.ok) throw new TypeError(`Invalid square palette color: ${css}`);
```

`lane-library.md` §4.6 names this exact line: `demo/scenes/square/useSquareTumble.ts:22  parseCssColor(css)  ← the known R1 crash surface`. Its input is whatever `--rainbow-violet` / `--rainbow-cyan` / `--rainbow-green` resolve to at runtime, read straight from computed style with no space check (`useSquareTumble.ts:12–19`, `if (value) hues[index] = value`), and `colorAt` is called **inside the rAF frame** (`useSquareDemo.ts:219`), so a throw lands mid-paint.

Those tokens are a **live two-producer collision** whose two authors disagree on colour space:

```
glass-ui dist/styles/tokens/scale-paper.css  :root  --rainbow-violet: oklch(0.684 0.250 327.9);
                                                    --rainbow-green:  oklch(0.772 0.233 144.8);
demo/styles/design-idioms.css:18,20,21       :root  --rainbow-green:  hsl(130 70% 50%);
                                                    --rainbow-violet: hsl(300 75% 60%);
```

The demo currently wins — deliberately and by documented design (`design-idioms.css:9–11`: "OUTSIDE @layer so the demo's copy overrides glass-ui's incidental same-named tokens"), backed by import order (`style.css:1–16`, `@import "@mkbabb/glass-ui/styles"` then `@import "./design-idioms.css"`). So `parseCssColor` receives `hsl(...)`, and **I am explicitly NOT claiming a live crash.** What is charged is that the R1 exemption rests entirely on one unlayered override winning a same-specificity `:root` race: a layer change on either side, a `.dark`/scoped re-declaration, or an import reorder hands `oklch(…)` to the known crash surface. This is precisely the "98 unprefixed demo custom properties sharing a global namespace with glass-ui's" hazard the census flags for its own lane (`lane-frontend.md` §6.3, §10 item 7) — here it has a named blast radius.
**Falsifier:** demonstrate that `--rainbow-violet` resolves to the demo `hsl()` under every theme arm and every future cascade edit — the first half is currently true (glass-ui defines it in exactly one place, `:root` in `scale-paper.css`, with no dark arm: `grep -rlo -- "--rainbow-violet:" dist/styles/` → 1 file), the second half is not a property of the tree.

---

## 4. INFO

### C-14 · Inconsistent token-defence posture, and design-system tokens mixed with demo tokens indistinguishably — **INFO**

`:153` `transition: opacity var(--duration-fast, 160ms) var(--ease-standard, ease);` — both fallbacks are dead code. Both tokens ship in the glass cascade and are reached by the demo's `@import "@mkbabb/glass-ui/styles"`:

```
dist/styles/index.css  → tokens.css → tokens/scheme-motion.css   (--duration-fast, --z-content)
                                    → tokens/scheme-spring.css   (--ease-standard; also theme/bridges.css)
                                    → tokens/color-radius.css    (--border, --foreground)
```

Meanwhile `--z-content` (`:179, 201`), `--border` (`:113–121, 132–137`), `--foreground` (`:183`) and `--color-progress` (`:161`) carry **no** fallback. Two postures in one 113-line style block, with the guarded tokens being the ones that are guaranteed present.

Sharper: `--color-progress` is **demo-owned** (`demo/styles/style.css:163`, `--color-progress: var(--accent-kf)`), not glass-ui — `grep -rlo -- "--color-progress:" node_modules/@mkbabb/glass-ui/dist/` → nothing. So the file's "red motion-authority" (`:143–145, 161`) is a demo idiom sitting in the same `var()` syntax as four genuine design-system tokens, with nothing at the call site distinguishing what the design system guarantees from what the demo happens to define. Same root as C-13; recorded separately because it is a readability/ownership cost even where no crash rides on it.
**Falsifier:** a `--kf-*`-style namespace or any call-site marker separating the two — census §6.3 measured **0** namespaced tokens demo-wide.

---

## 5. Negative findings (axis closure — asserted, not skipped)

- **R1 is NOT reachable in this file.** No `@mkbabb/value.js` import; no engine-parsed colour; the only colour work is browser-native `color-mix(in srgb|oklab, …)` in CSS (`:113, 119, 132, 137`) and `var(--color-progress)` (`:161`), neither of which enters value.js. The scene's *direct* value.js surface is entirely in siblings (`useSquareDemo.ts:4–5` `parseCssScalar`/`clamp`; `useSquareTumble.ts:2–3` `parseCssColor`/`mixColors`/`serializeCssColor`). Charged only as the indirect C-13.
  *Falsifier:* any `@mkbabb/value.js` import in `:59–98` — there is one import statement total, `computed` from `vue`.
- **No phantom-dependency exposure at the module graph.** F-1 (`lane-frontend.md` §0/§2 — glass-ui installed 7.0.0, declared nowhere, absent from `package-lock.json`) cannot break this file's resolution: it imports no `@mkbabb/*` package. See S+4 for the sting.
- **No shadow of S-1/S-2 (KfPillTabs / `/tabs`), S-5 (typewriter), S-6 (skeleton), S-7 (CopyButton), S-8 (TypingDots), F-5 (re-export shims).** None of those seams touch this file; the census rows stand unmodified.
- **Not charged, sibling-owned, recorded for the lane that owns it:** (a) `useSquareDemo` constructs a `useSweepScene` adapter and never returns `scenePlayback` (`:259–265` vs `:403`), so the raw-rAF transport contract for this scene is built and dropped; (b) the square's `ArrowLeft`/`ArrowRight`/`Home`/`End` (`useSquareKeyboard.ts:81–95`) collide with the global registry's identical bindings (`useControlsKeyboardShortcuts.ts:53–58`) — glass-ui's dispatcher listens on `window` keydown and exempts only `INPUT`/`TEXTAREA`/`SELECT`/`contentEditable`/`.monaco-editor` (`dist/keyboard.js`, guard `f(e)`), and a focused `<div role="group" tabindex="0">` is exempt from none of it, so one arrow press can nudge the box *and* scrub the group. Both belong to `SquareScene.vue` / `useSquareKeyboard.ts`, not here; flagged so the sibling lane does not miss them.

---

## 6. Superlatives (L-18 runs both ways)

### S+1 · Single-authority discipline, structurally enforced, not merely observed

Seven props in (`:62–75`); one pure `computed` out (`:83–97`); zero emits, zero refs, zero DOM writes, zero timers, zero rAF, zero store reads, zero engine handles. The component **cannot** become a second writer even by accident — the inv-ζ anti-rAF law is a property of its shape here, not of author discipline. This is why C-3 is charged as a *props-supply* defect and not an architecture defect: the layer is correctly a derived read; it is simply reading only half the truth.
*Falsifier:* any side-effecting call in `:59–98` — the block contains one import and one `computed`.

### S+2 · Mechanically provable compliance with the T.D4 typography contract

The demo publishes a machine-read font contract (`demo/styles/font-roles.json`, `monoAllowedSelectors`, consumed by `proof:font-census` clause (e)). Every mono leaf in this file satisfies it: `:24, 25, 26, 27, 44` all carry `tabular-nums`, matching the allowed selector `[class*='tabular-nums']`. The one UI-voice leaf is correctly handled rather than exempted — `:30` pairs `text-admin-label` with `.status-badge`, whose un-layered `font-family: var(--font-text)` rule is documented to out-cascade the utility's mono bind (`design-idioms.css:224–228`). And the file hardcodes **no** `font-size` and **no** `font-family` anywhere in its 113-line style block: it consumes published rungs (`text-caption`/`text-admin-label` from `dist/styles/typography/semantic.css`; `text-mono-small`/`text-mono-caption` from `typography/utilities.css`).
*Falsifier:* a raw `font-size`/`font-family` declaration, or a mono leaf without a contract-bound selector — `grep` over `:100–212` finds neither.

### S+3 · PRM handled, and handled at the right granularity

`:207–211` kills the tether's opacity **transition** and nothing else — the fade snaps off while the geometry is untouched, exactly as documented at `:80–81`. Not a blanket `animation: none`, not a hidden element. This is one of only ten CSS `prefers-reduced-motion` blocks in the demo, and the census lists this line by name (`lane-frontend.md` §6.5, `scenes/square/SquareInstrument.vue:207`).
*Falsifier:* a motion-bearing declaration outside the PRM block — the only transition in the file is the one it guards (`:153`).

### S+4 · F-1 immunity — with a sting that is the whole axis

With zero `@mkbabb/*` imports this is one of the few demo components that survives the phantom-dependency RED untouched: after `npm ci` reconstructs `node_modules` from a lockfile containing no glass-ui (`lane-frontend.md` F-1), this file still resolves and still typechecks. Genuinely rare in a tree where 42 files import the package.

The sting, stated plainly because L-18 requires it: **the immunity is purchased, not earned.** It holds only because the component consumes glass-ui through eleven class strings and six custom properties that no compiler, bundler or typechecker validates. A rung renamed in `typography/semantic.css`, a token moved out of `tokens/scheme-motion.css`, or an override lost in the cascade degrades this component **silently, at runtime, with a green build** — the exact failure mode an import-level dependency would have caught. That trade is the CONSUMPTION axis's central structural note for this file, and it is what makes C-7 (an orphan class shipped for who-knows-how-long), C-13 and C-14 the same defect wearing three faces.
*Falsifier:* a lint rule, typed class registry, or CSS-module binding that validates these strings at build time — `grep -rn "class-variance-authority\|tailwind-merge\|from \"clsx\"" demo/` → nothing (census §3.3), and no `*.module.css` exists in the tree.

---

## 7. Tally

| id | severity | claim | proven statically |
|---|---|---|---|
| C-1 | **BLOCKER** | `<svg>` has no `viewBox`; `preserveAspectRatio` inert; documented 0..100 space does not exist | yes (visual outcome UNPROVEN-NEEDS-LIVE) |
| C-2 | MAJOR | `TETHER_REACH` (%-of-stage) decoupled from `TRAVEL` (px); coincides at one stage size only | yes (closed-form) |
| C-3 | MAJOR | props sourced only from the spring authority → instrument frozen/false during engine playback | yes (data flow) |
| C-4 | MAJOR | `aria-hidden` roots hide a keyboard affordance's only disclosure; keys absent from the glass-ui registry | yes |
| C-5 | MINOR | prop JSDoc claims an aria coupling this component does not hold | yes |
| C-6 | MINOR | `tumbleHintShown` gates two unrelated hints; name false for one | yes |
| C-7 | MINOR | orphan class `square-live-caption` (0 definitions) | yes |
| C-8 | MINOR | sibling styles `.square-tether` across the boundary; rule dead (multi-root scope-id) | yes |
| C-9 | MINOR | 4 roots, no `$attrs` — attribute fallthrough silently dropped (latent) | yes |
| C-10 | MINOR | "double-click" copy vs the sibling's pointer double-**tap** cure | yes |
| C-11 | MINOR | **S-9** shadow: hand-rolled telemetry vs `/metric`, already consumed by the sibling scene | yes |
| C-12 | MINOR | **S-10** shadow: status pill vs `Chip` — *evaluate*, demo-wide idiom w/ AA contract | partial |
| C-13 | MINOR | advertised tumble recruits into the known R1 surface; safe only by cascade order | yes (latent, not live) |
| C-14 | INFO | inconsistent token fallbacks; demo tokens indistinguishable from design-system tokens | yes |

**defects 14 · blockers 1 · superlatives 4**

Census deltas proposed: **S-9** (Metric, *replace*) and **S-10** (Chip, *evaluate*) added to `lane-frontend.md` §5; S-3's AMBER duplication argument extended with C-1 as evidence that the hand-rolled geometry also carries a correctness cost. No census row contradicted — every row touching this file (§4 `b` classification, §6.5 PRM site, §6.3 token namespace, F-1 blast radius) was confirmed against the tree.

## Provenance

All keyframes.js and glass-ui paths read read-only under `/Users/mkbabb/Programming/keyframes.js/`; glass-ui claims sourced from the **installed** `node_modules/@mkbabb/glass-ui/dist/` (7.0.0), so every replacement named is available without an upgrade. Vue behaviour claims verified against the installed `vue@3.5.35`. No file in any product repo was written, mutated or executed; no installs, no dev servers, no browser tooling. The single write of this lane is this file.
