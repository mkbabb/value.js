claude-opus-5[1m]

# CHALLENGE · HeroAurora · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/HeroAurora.vue` (128 lines)
**Sole consumer** `demo/app/App.vue:46` (`#backdrop` slot, `v-if="isHome"`); imported direct at `App.vue:142`, **not** via `shell/index.ts` (which exports only 4 of 8 shell components).
**Read whole, read-only**: the target; `demo/app/App.vue`; `demo/components/instrument/shell/EditorShell.vue` (the slot host); `demo/components/instrument/shell/index.ts`; `demo/styles/style.css`; `@mkbabb/glass-ui@7.0.0` `dist/components/aurora/**.d.ts`, `dist/aurora.js` (runtime + both shader backends), `dist/glass-ui.css`, `dist/styles/{index,components}.css`.
**No browser tooling used.** Every claim below is source-derived; the two claims that need a live page are marked `UNPROVEN-NEEDS-LIVE`.
**Hitherto corpus folded**: `formation/keyframes/lane-frontend.md` census row `| 128 | HeroAurora.vue | G | hero backdrop — Aurora, PAPER_WASH_GROUND, resolveAtoms |` (line 191) and the import row (line 119). The census classified the file; it did not audit the config composition — nothing below contradicts it. **F-1** (glass-ui a phantom dep, lane-frontend:15/54) is a live precondition for two findings and is cited where it bites. S-1..S-8 do not touch this file (S-5/S-8 are its shell-siblings `AnimatedText`/`TypingDots`).

**Verdict: 10 defects · 1 BLOCKER · 4 superlatives.** The component's central design promise — *cursor-as-light* — does not render. Everything else is secondary to that.

---

## Tally

| id | severity | one line |
|---|---|---|
| D-1 | **BLOCKER** | the cursor-as-light axis never reaches a shader — three independent kills |
| D-2 | MAJOR | `initStrategy: "eager"` puts GPU acquisition on the home route's first paint, and the file's own comment claims the opposite |
| D-3 | MAJOR | the seed is a hardcoded hex — the wash is theme-invariant on a theme-reactive page |
| D-4 | MAJOR | the `0.1` ceiling is load-bearing for WCAG AA and nothing records that; the prototype's `0.15` would have failed |
| D-5 | MAJOR | what the cursor actually drives is a **max-strength 120° swirl vortex**, authored nowhere, against an owner amendment that said "more subtle" |
| D-6 | MINOR | PRM: the stated mechanism does not exist in the installed library; `setCursor` carries no reduced-motion guard |
| D-7 | MINOR | no `forced-colors` degrade — canvas pigment survives High Contrast Mode |
| D-8 | MINOR | 4 of the file's ~60 prose lines are provably false against the installed library |
| D-9 | INFO | sizing is specified three times over |
| D-10 | INFO | init failure is unattributed (defensible, recorded for completeness) |

Superlatives **S-1..S-4** and six **dismissed** claims (false-defect discipline) follow the defects.

---

## D-1 · BLOCKER · The cursor-as-light does not render. Three independent kills, all live simultaneously.

**Provenance**
- `HeroAurora.vue:2` — "the cursor light"; `:57-59` — "The cursor-as-light interactivity axis is ON (Aurora's own wired axis — the light follows the cursor inside the field, everywhere on the page, no partiality)"; `:70` — `interactivity: { light: true }`.
- `App.vue:39-44`; `docs/tranches/T/stage-manifests/home.json:9` ("aurora-cursor-light"); `docs/tranches/T/FINAL.md:47` row 22 ("cursor light 'done right or removed' … LANDED").

The authored intent is unambiguous and is carried in three registers (code, comment, verdict ledger). It is not delivered. The evidence chain:

### Kill (a) — `resolveAtoms` silently discards `light`

`node_modules/@mkbabb/glass-ui/dist/aurora.js:2989` (the `resolveAtoms` interactivity branch, minified `fn`):

```js
if (e.interactivity !== void 0) {
    let t = e.interactivity,
        r = e.medium?.kind !== void 0 && e.medium.kind !== "smooth" ? e.interactivity.light : void 0;
    n.interactivity = {
        ...(r === void 0 ? {} : { light: r }),      // ← dropped when no medium ATOM
        ...(t.scroll === void 0 ? {} : { scroll: t.scroll }),
        swirl: t.swirl ?? !0,                        // ← injected true, never authored
        amplitude: t.amplitude === void 0 ? .5 : C(t.amplitude, 0, 1)
    };
}
```

`light` survives the door **only if a `medium` atom is passed in the same call and its kind is not `"smooth"`.** `HeroAurora.vue:63-71` passes no `medium` atom — the crayon medium arrives later, by the `...PAPER_WASH_GROUND` spread at `:72`, which `resolveAtoms` cannot see. So `r === undefined`, the `light` key is omitted, and `n.interactivity` is assigned **wholesale** (not merged), so `DEFAULT_AURORA_CONFIG.interactivity` cannot restore it either.

Resolved config: `interactivity = { swirl: true, amplitude: 0.5 }`. No `light` key.

Consequence at the WebGL2 uniform bridge, `aurora.js:984`:

```js
… t.uniform1f(r.uTime, i), o().interactivity?.light) {   // ← gate
    …
    t.uniform3f(r.uLightDir, …);                          // ← the cursor→light projection
}
```

`uLightDir` is never uploaded per-frame. The per-config upload at `aurora.js:125266` writes only the static fallback `a.lightDir ?? [-.5, .6, .62]` — the fixed upper-left rim. **The light does not follow the cursor; it does not move at all.**

### Kill (b) — `uLightDir` does not exist on the preferred backend

`aurora.js:139266` (WGSL uniform accessors, verbatim): *"the metal light is cursor-synthesized so it crosses to WGSL (a phantom uLightDir read would be flat on the primary — **uLightDir is .frag-only**)"*, and `:150558` again: *"raked by the IN-STRUCT cursor-synth light (crosses to WGSL — **never uLightDir**)"*.

`Aurora.vue.d.ts` `renderMode` doc: `"webgl"` — *"the historical public mode name; **the runtime prefers WebGPU** and supports WebGL2"*. `renderMode="auto"` (`HeroAurora.vue:29`) resolves to `"webgl"` on every non-software device (`aurora.js:116586`, `function M`), and `createAurora` then tries WebGPU first (`runtime.d.ts` `armAsync`: *"tries WebGPU then falls to the WebGL2 net"*).

So on any WebGPU-capable browser — Chrome/Edge 113+, i.e. the majority of the demo's traffic — there is **no `uLightDir` uniform in the pipeline at all**. Kill (a) is moot there because the mechanism it gates is absent.

### Kill (c) — `uLightDir`'s only consumer is unreachable for this config, twice over

`uLightDir` is read in exactly one function, `relightImpasto` (`aurora.js` `mediums.glsl`), called from exactly one place, `paintStrokeMedium` — the oil / van-Gogh / oil-pastel **stroke** mediums.

`PAPER_WASH_GROUND` pins `medium: "crayon"` (`presets.d.ts:308`). The crayon medium is a separate dispatch, and the library says so in terms:

> `// ── Crayon — DRY wax pigment on paper tooth (first-class medium, uMedium==4) ──`
> `// Crayon is not strokes.` … `// NO sheen, NO burnish film` … `// Crayon shares the SUBSTRATE …, not the dispatch body.`

`mediumCrayon`'s body (read whole) references `uStrokeAmount`, `uStrokeAnisotropy`, `uStrokeScale`, `brokenColorJitter`, `saturate3` — and **no `uLightDir`, no `uImpasto`, no `relightImpasto` call**.

And even if the medium *were* a stroke medium, `PAPER_WASH_GROUND` also pins `impasto: 0`, while both lit terms in `relightImpasto` are multiplied by `uImpasto`:

```glsl
vec3 lit = col * (1.0 + uImpasto * relief * (diff - 0.5) * 0.5 * uLightColor);
lit += uImpasto * relief * spec * specGate * 0.5 * uLightColor;
```

At `uImpasto == 0` this is the algebraic identity `lit = col`. The relight contributes exactly zero.

### What the user actually gets

`isAuroraPointerEnabled` (`aurora.js:2287`) is `interactivity?.swirl === true || (medium !== "smooth" && interactivity?.light === true)`. The injected `swirl: true` from kill (a) satisfies the first disjunct, so `uCursor`/`uCursorStrength`/`uCursorRadius` **do** upload every frame, and `domainWarp` (`aurora.js:96398`) rotates the field around the pointer. The library's own `useCursorInteraction.d.ts` names this axis correctly: *"Fires `setCursor(x,y,strength)` for continuous **swirl**."*

So the page has a cursor effect. It is a **swirl vortex**, not a light — see D-5 for its magnitude.

**Severity** BLOCKER. This is not a polish gap: the file's reason to exist, the OD-2 amendment it encodes, the T.D13 verdict, and the `home.json` stage manifest all name a behaviour that no shader path can produce for this config. The T-ledger row 22 "LANDED · REAL" (`lane-03-t-verdict-trace.md:40`) was verified against `proof:cursor-light-subtle`, which asserts *the opacity literal and the template binding* (`HeroAurora.vue:17-18, 44-45`) — it never asserted that a light renders. The oracle is green and the feature is absent; that is exactly the failure mode a proof-of-the-literal invites.

**Falsifier** — any one of these kills the claim:
1. `DEFAULT_AURORA_CONFIG.interactivity` contains `light: true` **and** `resolveAtoms` merges rather than replaces → then `light` survives. *(Checked: `aurora.js:2990` assigns `n.interactivity = {…}` wholesale; the default config object, `aurora.js` `var P`, carries no `interactivity` key at all.)*
2. A WGSL path reads a cursor-driven light for `uMedium==4`. *(Checked: only `metalShade`, `uMedium==8/9`, synthesizes a cursor light in-struct.)*
3. `mediumCrayon` calls `relightImpasto`, or `uImpasto` is non-zero. *(Checked: neither.)*
4. The installed glass-ui differs from what `package.json` pins — **this is exactly F-1**: glass-ui is absent from `package.json` *and* `package-lock.json`, so my evidence is the tree's 7.0.0, not a locked contract. If the intended version wires `light` differently, this finding is version-scoped, not wrong. **F-1 must land before this is re-verified.**

**Where the fix lives (one line, in the door):** pass the medium *through the atoms*, not around them —
`resolveAtoms({ …, medium: { kind: "crayon", amount: 0.35 }, interactivity: { light: true, swirl: false } })` — which makes kill (a) pass. Kills (b) and (c) are library-domain and belong in a glass-ui BH/BI relay per the standing edict: **a crayon-medium aurora has no cursor-light implementation on either backend.** Until that lands, `interactivity: { light: true }` on a `PAPER_WASH_GROUND` config is unimplementable and the honest options are (i) accept swirl and rename the intent everywhere, or (ii) remove the cursor axis — the owner's own T-row wording was "done right **or removed**".

---

## D-2 · MAJOR · `initStrategy: "eager"` puts GPU acquisition on the home route's first paint — and the file's own comment claims the opposite

**Provenance** `HeroAurora.vue:28` — `:runtime-options="{ initStrategy: 'eager' }"`, against `HeroAurora.vue:8` — *"and the **lazy WebGL arm past first paint**"*.

`runtime.d.ts` `AuroraInitStrategy`:
> `"deferred"` (default) — … *"The Vue wrapper `useAurora` schedules that acquisition past first paint on an idle tick, gated on canvas visibility — so the shader compile-link never lands on the consumer's first-paint critical path."*
> `"eager"` — *"acquisition starts immediately. **Capture / thumbnail-baking consumers** then await `armAsync()` before `renderAt`."*

HeroAurora is not a capture consumer. It never calls `renderAt`, never awaits `armAsync`, never reads a deterministic frame. It takes the capture strategy for a decorative background.

The mechanism, `useAurora` / `Vt` at `aurora.js:2443`+, inside `onMounted`:

```js
let v = n.mode === "capture" || n.initStrategy === "eager";
…
if (v) { b(); return; }                       // ← arm NOW, and RETURN
p = a(e, { pause: () => c?.pause("off-screen-io"),
           resume: () => c?.resume("off-screen-io") }, …);
u = O(r, (e) => { … Bt(() => { … b(); }) }, { immediate: !0 });   // idle-tick, visibility-gated
```

Two consequences, both structural:
1. `b()` → `armAsync()` → adapter → device → configure → shader compile-link runs **synchronously from `onMounted` on the home route**, the demo's landing. This is precisely the shape value.js already escalated once: memory row Q14, *"LCP 5141 / TBT 5988; eager-WebGL-blob boot blocker"* → `U.W-PERF`. The blob was cured; this is the same pattern re-entered on a different layer.
2. The early `return` skips the IntersectionObserver seam entirely (`p` stays `null`), so the `"off-screen-io"` suspend reason is never registered for this instance. For *this* component that costs nothing — the layer is `fixed inset-0`, always intersecting — so I do **not** claim a wasted-frames defect. The `"tab-hidden"` suspend is substrate-owned and still works.

**Severity** MAJOR, not BLOCKER: the wash still paints (the palette ground is the frame-0 surface either way), so nothing is broken — a boot budget is spent. It is MAJOR rather than MINOR because the route is the LCP route, the cost is a shader compile-link, the default was engineered specifically to avoid it, and **the file documents the behaviour it does not have** (`:8`).

**Falsifier** A commit or verdict recording that `deferred` measurably failed here (e.g. the intersection gate never fired inside the `#backdrop` slot, leaving the canvas un-armed). I found no such record in `docs/tranches/T/verdicts/T.D13.md` or `APPEARANCE-WAVES.json`; both discuss only the opacity amendment. If such a record exists, this becomes a documentation defect only — but then `:8` still must be corrected. Second falsifier: a live trace showing arm completing off the critical path anyway (WebGPU `armAsync` is async, so the *await* is off-thread even though the *request* is not) — this would reduce severity to MINOR. `UNPROVEN-NEEDS-LIVE` for the magnitude; the code path itself is proven.

---

## D-3 · MAJOR · The seed is a hardcoded hex — the wash is theme-invariant on a theme-reactive page

**Provenance** `HeroAurora.vue:64` — `seed: "#7c5ce6"`, with `:55-57` claiming it *"sits on the OD-6 violet accent axis (the `--accent-kf` oklch ~295° family the T.D7 ramp landed — the wash previews the blessed hue, **both themes**)"*.

The token (`demo/styles/style.css:130`) is theme-switched by construction:

```css
--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305));
```

Measured divergence (sRGB→OKLab, D65, computed):

| | L | C | h |
|---|---|---|---|
| `#7c5ce6` (the seed) | **0.580** | **0.200** | **289.4°** |
| `--accent-kf` light | 0.56 | 0.17 | 295 | 
| Δ vs light | +0.020 | +0.030 (+17.6%) | −5.6° |
| `--accent-kf` dark | 0.74 | 0.13 | 305 |
| **Δ vs dark** | **−0.160** | **+0.070 (+53.8%)** | **−15.6°** |

The seed is a fair approximation of the *light* token and a poor one of the *dark* token: 15.6° off-hue, 0.16 darker, 54% more chromatic. And these are not merely the seed's numbers — `deriveAurora` (`aurora.js`, `function tt`) anchors the whole palette on them: the lightness band is `[seed.L − 0.16, seed.L + 0.16]` (`lightnessSpread` default 0.32, centred on `n.L`), the chroma bell is centred on `n.C`, and every stop's hue derives from `n.h`. All four stops inherit the divergence.

Worse than the static mismatch is the **dynamics**: `config` (`HeroAurora.vue:62-73`) is a plain object literal evaluated once at `setup`. No `computed`, no `watch`, no token read. Meanwhile `EditorShell.vue:44` mounts a `<DarkModeToggle>` in the header ribbon — one click away, on the same screen. On theme flip every other surface re-tints through `light-dark()` and the aurora does not move. That is a design-system conformance break, not a taste call.

glass-ui ships the exact door: `cssToOklch` is a public export (`components/aurora/index.d.ts`), alongside `hexToOklchStop` and `deriveAurora`. Deriving the seed from the live computed value of `--accent-kf` inside a `computed` is the in-library idiom; the component reached past it for a literal.

**Severity** MAJOR. Token conformance is the named sub-axis, the divergence is computed rather than asserted, and the page carries the theme toggle that exhibits it.

**Falsifier** (a) `--accent-kf` resolves identically in both themes — killed by `style.css:130`; (b) the home route is theme-locked — killed by `EditorShell.vue:44`, which is rendered on every route including home; (c) `deriveAurora` re-anchors lightness to the page ground rather than the seed — killed by `function tt`, where `b = n.L - a/2, x = n.L + a/2` and `lBand`/`scheme` are both absent from the call at `HeroAurora.vue:63-71`, so the default band applies and the seed's L is the centre. (d) The *perceptual* size of the dark-theme mismatch at 0.1 composite opacity is `UNPROVEN-NEEDS-LIVE`; the colorimetric divergence and the non-reactivity are proven.

---

## D-4 · MAJOR · The `0.1` ceiling is load-bearing for WCAG AA, and nothing in the tree records that

**Provenance** `HeroAurora.vue:46` — `HERO_AURORA_OPACITY_CEILING = 0.1`, justified at `:14-19` and `:43-45` **purely aesthetically**: *"the P-HERO prototype's opacityCeiling 0.15 is the CEILING, not the target … (OD-2, owner verbatim: 'I like the aurora, but more subtle')"*. `proof:cursor-light-subtle` asserts *the literal + the template binding* (`:18`, `:44-45`) on that aesthetic basis.

The ceiling is not only aesthetic. Computed, from tokens:

- `--background` → `--neutral-0` → light `hsl(40 30% 98%)` (`glass-ui/dist/styles/**`)
- `--muted-foreground` → `--neutral-5` → light `hsl(30 22% 40%)`
- the wash composites at exactly the ceiling: `DEFAULT_AURORA_CONFIG.alpha = 1` and `PAPER_WASH_GROUND` does not override `alpha`, so per-pixel pigment opacity is 1 and the outer envelope governs (`Aurora.vue.d.ts` `opacityCeiling`: *"applies uniformly to the placeholder and the canvas"*, via `--aurora-opacity-ceiling`; `glass-ui.css` `.aurora-canvas--armed{opacity:var(--aurora-opacity-ceiling,1)}`).

Contrast of `--muted-foreground` against the background, as the aurora tints it (wash colour taken as the seed):

| ceiling | contrast | WCAG AA (4.5:1) |
|---|---|---|
| 0.00 (no wash) | 5.209 : 1 | pass |
| 0.05 | 4.897 : 1 | pass |
| **0.10 (shipped)** | **4.597 : 1** | **pass — margin 0.097** |
| 0.12 | 4.481 : 1 | **FAIL** |
| **0.15 (the P-HERO prototype)** | **4.310 : 1** | **FAIL** |

**AA break-even = 0.1167.**

Two things follow. First — and this is to the component's credit, see S-3 — the shipped value is right, and the owner's aesthetic amendment *rescued* AA for muted body text without anyone noticing. Second, the defect: the margin is **2.2%**, the recorded rationale is "more subtle", and the guard rail asserts a literal whose stated basis is taste. A future "make it a touch more present" to 0.12 is, on the record as written, a permitted aesthetic adjustment — the reviewer would edit `proof:cursor-light-subtle`'s expected literal (that is what a literal-assertion oracle invites) and ship a silent AA regression across every muted-text surface on the home route, because this layer is `fixed inset-0` and sits under **all** page text, not just the hero.

The true margin is smaller than computed. `deriveAurora` bands palette lightness to `[0.42, 0.74]` around the seed, so the darkest stop is materially darker than the seed I substituted; wherever that stop dominates a region, contrast there is below 4.597.

**Severity** MAJOR — a live AA pass with a 2.2% margin, guarded by an oracle that does not know it is an a11y bound.

**Falsifier** (a) `--muted-foreground` is never rendered over this layer on the home route — implausible for a `fixed inset-0` full-viewport layer, but enumerable and would narrow the claim to whichever tokens *are*; (b) the demo's own `style.css` overrides `--muted-foreground` or `--background` to a higher-contrast pair (I found neither name assigned in `demo/styles/style.css`); (c) the exact composited pixel differs from my seed substitution — true, and as argued it moves the number **down**, not up; (d) canvas compositing is performed in linear light rather than gamma-encoded sRGB, which would change the blend — CSS/canvas default is non-linear, which is what I computed. The *conclusion* (0.1 passes, 0.15 fails, break-even ≈0.117) is robust to reasonable variation in the wash colour; the exact ratios are not.

---

## D-5 · MAJOR · What the cursor actually drives is a max-strength 120° swirl vortex — authored nowhere, against an amendment that said "more subtle"

**Provenance** `HeroAurora.vue:94` — `aurora.setCursor(x, y, 1);`.

Two compounding facts:

1. **The strength argument is the library's maximum, and the library's own default is lower.** `createAurora`'s `setCursor(e, t, n = .8)` (`aurora.js`, `function b` inside `Rt`) defaults strength to `0.8`. HeroAurora passes `1` explicitly — a 25% uplift over the library's calibration, with no comment anywhere justifying it.
2. **The axis it feeds is swirl, not light** (D-1). Per `domainWarp` (`aurora.js:96398`, present identically in the WGSL twin at `:107446`):

```glsl
// Max rotation ~120° at cursor center, scaled by strength
float ang = w * uCursorStrength * 2.1;
…
float pinch = w * uCursorStrength * 0.08;      // gravity pinch toward the cursor
rotated = mix(rotated, uCursor, pinch);
warped = mix(warped, rotated + uWarpAmount * warp * 0.7, w * uCursorStrength);
```

At `uCursorStrength = 1` the field rotates by up to **2.1 rad ≈ 120°** about the pointer, plus a gravity pinch, plus a full-weight blend. That is the strongest cursor deformation the library offers.

Nobody chose this. `swirl: true` was *injected* by `resolveAtoms`' `swirl: t.swirl ?? !0` default (`aurora.js:2993`) as collateral of the `light` drop; the author wrote `interactivity: { light: true }` and got maximum swirl. The result stands directly against the amendment the file is built to encode — OD-2, *"I like the aurora, but more subtle"* — which was implemented on exactly one knob (the opacity ceiling) while a second, louder knob ran at maximum unattended.

**Mitigation, stated honestly:** the whole field composites at ≤0.1, so the vortex's *visibility* is clamped proportionally. This is why the finding is MAJOR and not BLOCKER, and why the perceived loudness needs the live audit.

**Falsifier** (a) `uCursorStrength` is scaled down before reaching the shader — checked: `W` (`aurora.js` frameLoop) passes `o.strength` straight from the cursor mapping, and the `i > 0` branch only *adds* a burst term; (b) the swirl is gated on a medium or a config field crayon lacks — checked: `domainWarp` runs in the warp stage, before medium dispatch, for every medium; (c) `0.8` vs `1` is within calibration noise — possible, and if so the finding reduces to the unauthored-swirl half, which stands alone. (d) Whether a 120° vortex at 0.1 opacity reads as "subtle" is `UNPROVEN-NEEDS-LIVE` and is the single highest-value thing for SS-13 to look at.

---

## D-6 · MINOR · prefers-reduced-motion: the stated mechanism does not exist in the installed library, and `setCursor` carries no guard

**Provenance** `HeroAurora.vue:6-7` — *"Aurora owns the rAF-coalescing, the **PRM-safe CSS-gradient substrate (renderMode "auto")**"*.

That is false against glass-ui 7.0.0. `resolveRenderMode` (`aurora.js:116586`) is, whole:

```js
function M(e, t = {}) {
    return e !== "css" && !t.forceWebGLUnderSoftwareRaster && j() ? "css" : e === "auto" ? "webgl" : e;
}
```

There is no reduced-motion branch. `Aurora.vue.d.ts` says so explicitly: *"BC.W-VIZ-AURORA (T1) **RETIRED** the dead-static `hardwareConcurrency <= 4` / `saveData` / **`reduced-motion`** falls … reduced-motion is handled SOLELY by the substrate's live `matchMedia` freeze (one static frame then park, re-arms on un-reduce)."* `"auto"` now yields `"webgl"` for every non-software device, PRM or not.

**PRM is nonetheless honoured for time-driven motion** — I verify this rather than assume it: `resolveAuroraRenderTime` (`Lt`, `aurora.js:2290`) returns the constant `3.7` under reduced motion, freezing the drift clock; and `needsAnimation` (`m` in `bt`) returns `false` first thing when `getReducedMotion()` is true, so the loop parks. Good. The comment misattributes a working mechanism, which is a D-8 instance.

The narrow live gap: `setCursor` has **no** reduced-motion guard, and the component adds none. Compare the sibling API on the same seam, which does:

```js
function b(e, t, n = .8) { Y(o) && (l = n, c.setActive(!0), c.setPointer(e, t), y.wake()); }        // setCursor — no PRM check
function C(e) { … t !== s && (s = t, o.interactivity?.scroll === !0 && !y.reducedMotion && y.wake()); }  // setScrollProgress — guarded
```

`HeroAurora.vue:86-95` calls `setCursor` on every mouse move regardless of `matchMedia("(prefers-reduced-motion: reduce)")`, so each move calls `y.wake()`.

**Severity** MINOR. `needsAnimation` returns `false` under PRM, so each wake renders at most one frame and re-parks — a cost, not a runaway. Whether the *swirl position* visibly advances under PRM depends on `usePointerVelocityField.tick(0)` semantics (the frame loop passes `0` for `dt` under PRM, so a mass-spring integrator should not advance) — that lives in `composables/glass/**`, outside this component's import closure, and I did not trace it.

**Falsifier** `UNPROVEN-NEEDS-LIVE` for the visual half: if `tick(0)` freezes the attractor, every wake renders an identical frame and the defect is pure cost. The comment falsehood at `:6-7` is proven outright and stands either way. The clean fix is a `useMediaQuery("(prefers-reduced-motion: reduce)")` early-out in `onPointerMove` — three lines, and it makes the component's PRM posture self-evident instead of inherited.

---

## D-7 · MINOR · No `forced-colors` degrade

**Provenance** `HeroAurora.vue:113-127` (the whole scoped block); the aurora's own CSS, extracted whole from `glass-ui.css`:

```css
.aurora-root{contain:content;content-visibility:auto;contain-intrinsic-size:auto 600px;display:grid}
.aurora-root>.aurora-placeholder,.aurora-root>.aurora-canvas{grid-area:1/1}
.aurora-root>.aurora-placeholder{opacity:var(--aurora-opacity-ceiling,1);…}
.aurora-canvas{opacity:0;transition:opacity var(--duration-slow) var(--ease-standard)}
.aurora-canvas--armed{opacity:var(--aurora-opacity-ceiling,1)}
@media (prefers-reduced-motion:reduce){.aurora-canvas{transition-duration:1ms}}
```

Six rules; the only media query is PRM. No `@media (forced-colors: active)` in the aurora CSS, in `HeroAurora.vue`, or (by grep) anywhere in `demo/styles/*.css` or `glass-ui/dist/*.css`.

In Windows High Contrast Mode the UA forces author colours on backgrounds and text but **does not touch `<canvas>` pixels or `background-image` gradients**. The `.aurora-placeholder` (a gradient) and the `.aurora-canvas` (pigment) therefore both survive at the ceiling opacity, laying a violet field under text the UA has just forced to the user's chosen high-contrast pair — the precise scenario forced-colors exists to prevent. The correct degrade for a decorative full-viewport wash is `display: none` under `forced-colors: active`.

**Severity** MINOR — the ceiling is 0.1, so the perturbation is small (D-4 bounds it), and forced-colors users are a small cohort. It is a real state-coverage gap on a named sub-axis, and it is a two-line fix in the component's own scoped block.

**Falsifier** A `forced-colors` rule reaching `.aurora-root` from `styles/accessibility.css` (present in `glass-ui/dist/styles/`, not read in full) or from `demo/styles/design-idioms.css`. My grep for the literal `forced-colors` across `demo/styles/*.css` and `glass-ui/dist/*.css` returned nothing, but I did not exhaustively read `glass-ui/dist/styles/accessibility.css` — **this is the weakest-evidenced finding in the file** and the first a reviewer should try to kill.

---

## D-8 · MINOR · Four of the file's ~60 prose lines are provably false against the installed library

The file is 128 lines carrying ~46 lines of executable script; the remainder is commentary. Density is a style choice and not by itself a defect. The defect is that the commentary has drifted into assertion about library behaviour that no longer holds, and each falsehood reads as verification:

| line | claim | status |
|---|---|---|
| `:8` | "the lazy WebGL arm past first paint" | **false** — `:28` passes `initStrategy: "eager"`, which is the branch that skips it (D-2) |
| `:6-7` | "the PRM-safe CSS-gradient substrate (renderMode 'auto')" | **false** — the PRM fall was retired from `resolveRenderMode`; no branch exists (D-6) |
| `:57-58` | "the cursor-as-light interactivity axis is ON (**Aurora's own wired axis**)" | **false twice** — the axis is off (D-1), and `Aurora.vue.d.ts` states "Cursor interaction is **deliberately not wired here**"; the component hand-rolls it at `:86-110` |
| `:60-61` | "Field atoms are the P-HERO blessed values verbatim; **ONLY** the opacity ceiling moved" | **false** — `...PAPER_WASH_GROUND` at `:72` spreads *over* the resolved atoms and clobbers 12 fields, `medium` among them, which is what causes D-1(a) |

**Severity** MINOR by direct impact, but this is the mechanism behind D-1 and D-2: the prose asserted the behaviour so confidently, and in such specific library vocabulary, that no reviewer re-derived it. Prose that narrates library internals ages against the library; prose that states *intent* does not. Three of the four would be caught by deleting the mechanism narration and keeping the intent.

**Falsifier** For each row, the library evidence cited in D-1/D-2/D-6 and `Aurora.vue.d.ts` respectively. Version-scoped to installed 7.0.0 — see F-1.

---

## D-9 · INFO · Sizing is specified three times over

`HeroAurora.vue:21` `fixed inset-0` (⇒ `top/right/bottom/left: 0`, a definite used size against the ICB), plus `:118-119` `height: 100dvh; width: 100dvw`, plus `:122-127` a `@supports not (height: 100dvh)` fallback to `vh`/`vw`. Any one suffices; `inset-0` alone already yields a definite height that the child's `h-full` resolves against.

I explicitly do **not** claim the two hazards this shape usually carries — both are killed by `demo/styles/style.css:214-221`, `html, body { overflow: hidden; … }`:
- **no** `100dvw`-vs-scrollbar overhang: the document never has a scrollbar;
- **no** mobile `dvh` resize churn: the document never scrolls, so the URL bar never retracts.

What remains is that the peer layer in the same stacking context uses the utility form (`EditorShell.vue:13`, `class="grid-background pointer-events-none fixed inset-0 h-dvh w-dvw"`) while this one hand-rolls the identical geometry in scoped CSS with a bespoke `@supports` block duplicating `EditorShell.vue:208-221`. Two spellings of one idiom, 15 lines apart in the render tree.

**Severity** INFO. **Falsifier** A browser where a fixed `inset-0` box does not give children a definite percentage height basis, making the explicit `height` load-bearing for `.aurora-root`'s `h-full`. I know of none among the demo's targets; a reviewer who does should promote this to MINOR and delete the *utilities* instead.

---

## D-10 · INFO · Init failure is unattributed

`HeroAurora.vue:24-30` passes neither `onInitError` nor `@renderer-status`, and `demo/app/main.ts` (65 lines) installs no `app.config.errorHandler` — which `Aurora.vue` would otherwise adapt automatically (`aurora.js`: `l = c?.appContext.config.errorHandler, u = l ? (e) => l(e, …, "Aurora initialization") : void 0`). A GPU-init failure is therefore silent everywhere.

I record this as INFO, not a defect, and say why: for a decorative backdrop, silent degrade is the *correct* UX — `Aurora.vue.d.ts` guarantees *"A failed runtime never marks the live canvas armed, so the palette ground remains visible"*, so the failure mode is a static palette-derived wash, which is a perfectly good hero background. The only reason it is worth a line at all is its interaction with D-2: with `initStrategy: "eager"` the failure happens during boot, unattributed, on the landing route, where a console breadcrumb would be cheap.

**Falsifier** An `errorHandler` installed outside `main.ts` (e.g. in a plugin), or a `rendererStatus` listener upstream. Neither found.

---

## Superlatives (L-18 — these carry falsifiers too)

### S-1 · The cursor handler is better than the library's own composable

`HeroAurora.vue:86-95` does zero DOM geometry reads: `e.clientX / window.innerWidth`, viewport metrics only, no style or layout flush, `passive: true`, and a `pointerType !== "mouse"` early-out so touch drags do not fight scene gestures.

Now compare glass-ui's *sanctioned alternative*, `useCursorInteraction` (`aurora.js`, `function Qt`):

```js
function s(e, t) {
    let n = t.getBoundingClientRect();                     // ← forced layout, per pointer event
    return { x: (e.clientX - n.left) / Math.max(n.width, 1), … };
}
```

`Aurora.vue.d.ts` offers both doors — *"use `useCursorInteraction` (or call the exposed `setCursor` API)"* — and the component took the raw one. That was the right call twice over: it avoids the per-event `getBoundingClientRect()` that value.js's own T-CL-3 recurrence guard forbids (`proof:no-hand-rolled-cursor-tracker` / `cursor-light-no-sync-layout`, `T/FINAL.md:47`), and it avoids `useCursorInteraction`'s nuclei CRUD (alt-click spawn, shift-click delete, drag) which is an authoring tool and would be actively wrong on a hero backdrop. The reasoning is recorded accurately at `:75-85`, and *that* comment is one of the file's true ones.

Note this refutes the obvious fix for D-6: the remedy is a PRM guard inside the existing handler, **not** adoption of `useCursorInteraction`.

**Falsifier** A measurement showing `getBoundingClientRect` on a `position: fixed` element is free (it is not — it flushes pending layout document-wide), or a version of `useCursorInteraction` that caches the rect across events (the installed one does not).

### S-2 · Layering by document order, verified — no z-index

`HeroAurora.vue:114-117` claims the wash paints under the grid ink "by document order alone, no z-index games". I checked rather than accepted it, because a `position: fixed` box paints in step 8 of the painting order and would sit *above* a non-positioned sibling — which would have inverted the entire "pigment IN the paper" premise.

It holds. `EditorShell.vue:10-14` places the `#backdrop` slot immediately before `<div class="grid-background pointer-events-none fixed inset-0 …">`; **both** siblings are `position: fixed` with `z-index: auto`, so both are step-8 painters ordered by tree order, and the aurora (first) paints under the grid (second). The containing block is the viewport in both cases — `.editor-shell` is `relative` with no transform/filter/`will-change`, and its `overflow-hidden` does not clip fixed descendants of a non-transformed ancestor.

A correct, fragile-looking claim that is actually correct, arrived at by the simpler mechanism. This is the design instinct the rest of the file should have had.

**Falsifier** Any ancestor acquiring `transform`, `filter`, `backdrop-filter`, `will-change`, or `contain: paint` — which would re-parent the fixed boxes and could reorder them. `App.vue:358-379` documents a deliberate de-layer contract keeping the scene host outside any `backdrop-filter` ancestor subtree, so this is actively maintained. A stacking-context change anywhere above `.editor-shell` kills the guarantee **silently**, and nothing tests it.

### S-3 · The `0.1` ceiling is the right number

Vindicated by D-4's computation, not by taste: 0.1 → 4.597:1 (AA pass), break-even 0.1167, and the prototype's 0.15 → 4.310:1 (AA fail). The owner's aesthetic instinct landed on the correct side of an accessibility boundary neither the amendment nor the oracle knew was there. The value should be treated as frozen; only its *justification* needs repair (D-4).

**Falsifier** The token pair I computed against is not the one that renders over this layer on the home route (see D-4's falsifiers). If the real worst-case pair has more headroom, this stays a superlative and D-4 drops to MINOR; if less, both intensify.

### S-4 · The decorative-layer hygiene is complete

`aria-hidden="true"` **and** `pointer-events-none` on the wrapper (`:21-22`), plus `aria-hidden="true"` again on both the placeholder and the canvas from the library. The layer is invisible to AT and transparent to hit-testing — the correct and complete treatment for decoration, matching the pattern `V/audit/R1-13-a11y.md:153` records for this component. Both listeners ride `useEventListener` (`:104-110`) for `tryOnScopeDispose` teardown, so the home-only mount/unmount cycle leaks nothing, and the `pointerleave` target is a getter (`() => document.documentElement`) rather than an eagerly-captured node.

**Falsifier** A focusable descendant inside the aurora subtree (there is none — two `div`s and a `canvas`), or a listener registered outside the component scope (there is none).

---

## Dismissed — claims I formed, tested, and killed

Recorded because a false defect is worse than a missed one, and because each of these is a trap the next auditor will walk into.

1. **"`PAPER_WASH_GROUND` clobbers `saturation` and breaks the atoms' documented co-variance."** The atoms doc warns that moving saturation alone "reads as a defect". Computed: `colorEnergy: 0.18` → `lerp(0.85, 1.2, 0.18) = 0.913`; `PAPER_WASH_GROUND` pins `0.92`. A 0.77% difference — numerically inert. **Killed.** (The `medium` clobber from the same spread is *not* inert — that is D-1(a).)
2. **"`.aurora-root` collapses to ~150px because no CSS sizes it."** The six extracted CSS rules set no width/height. But the render function (`aurora.js:188138`) emits `class="aurora-root block h-full w-full overflow-hidden"`. **Killed.**
3. **"…and those Tailwind utilities are never generated, because Tailwind v4 does not scan `node_modules` and there is no `@source` directive."** True premises — no `@source` in `demo/styles/style.css`, no `tailwind.config.*`, and `.h-full` appears 0 times in `glass-ui.css`. But glass-ui ships its own utility layer: `dist/styles/components.css` contains `.h-full{height:100%}` and `.w-full{width:100%}`, and `dist/styles/index.css` imports it — reached by `style.css:3`, `@import "@mkbabb/glass-ui/styles"`. **Killed.** (Would have been a BLOCKER. Note it is contingent on F-1: a different glass-ui version that stops shipping `components.css` resurrects it.)
4. **"`width: 100dvw` overhangs the classic scrollbar; `height: 100dvh` churns the canvas on mobile toolbar retraction."** Both killed by `style.css:214-221`, `html, body { overflow: hidden; overscroll-behavior: none }` — the document has no scrollbar and never scrolls. **Killed** (residue is D-9's redundancy only).
5. **"Missing `onInitError` is a defect."** Silent degrade to the palette ground is correct for decoration and is a documented library guarantee. **Demoted to D-10 INFO.**
6. **"RTL exposure."** The layer is a symmetric full-bleed field; the cursor mapping is `clientX / innerWidth`, direction-agnostic; no logical properties are involved and no text is rendered. **No finding.** Likewise **typography**: the component renders no text — not applicable, not a gap.

---

## What SS-13 should look at live

1. **Does anything at all follow the cursor, and does it read as a light or as a vortex?** (D-1 predicts a swirl; D-5 predicts a strong one.) Home route, mouse, both themes.
2. **Toggle dark mode on home and watch the wash.** (D-3 predicts it does not move.)
3. **Boot trace of `/` with the aurora mounted vs. `initStrategy` removed.** (D-2's magnitude.)
4. Reduced-motion on, move the mouse. (D-6's visual half.)
5. Forced-colors on. (D-7 — and the first thing to try to kill, per its own falsifier.)
