# LANE U-AURORA — grounding U33 ("aurora completely broken: no motion, no shade variation")

**Verdict:** U33 is REAL and reproduced live on the real GPU. **The prime suspect is REFUTED.**
The fix belongs in **glass-ui** (the `resolveAtoms` motion-fields table), with a one-line
**demo** default-atom change as the cheap interim. The library (value.js `src/`) is innocent.

---

## 1. The prime suspect (software-GL probe → static CSS fallback) is REFUTED

The brief's prime suspect: the `e59987ae` software-GL probe (`renderMode.ts`) or the demo's
`resolveRenderMode` consume mis-firing on a real GPU → the static CSS-gradient fallback always
painting. **This is false on this machine.** Live evidence (chrome-devtools `evaluate_script`,
my own page, cold app at `http://localhost:9000`):

| Probe signal (replica of `glass-ui/.../constants/renderMode.ts:81-106`) | Live value |
|---|---|
| `navigator.hardwareConcurrency` | **18** → `lowConcurrency=false` |
| `prefers-reduced-motion: reduce` | **false** |
| `navigator.connection.saveData` | **false** |
| `WEBGL_debug_renderer_info` UNMASKED_RENDERER | **`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`** |
| `isSoftwareWebGLRenderer()` | **false** (no swiftshader/llvmpipe/software/basic-render substring) |
| **`resolveRenderMode("auto")`** | **`"webgl"`** |

Read straight out of the running Vue app (`App.vue` setupState): `auroraRenderMode === "webgl"`.
There is **no static CSS fallback painting** — there is no `.aurora-root`/`.aurora-placeholder`
in the demo at all (the demo does NOT mount `<Aurora>`; it calls `useAurora` directly against
`atmosphereCanvas` — `App.vue:247-252`). The full-viewport atmosphere `<canvas class="absolute
inset-0 w-full h-full pointer-events-none">` (parent `.app-layout`) holds a **live, non-lost
webgl2 context** (2880×1800 backing buffer).

**And it IS rendering.** I wrapped `gl.drawArrays`/`gl.clear` on the live context:
**89 draw calls + 89 clears in 2 s ≈ 44 fps.** `gl.isContextLost() === false`. The WebGL field
armed correctly and runs a live RAF loop. So "no motion" is NOT "the GL never armed / the CSS
placeholder froze." The GL is alive.

---

## 2. The TRUE root cause — `motion: "breathing"` zeroes ALL spatial drift

The atmosphere armed, draws at 44 fps, and is fed an **advancing time uniform** (I hooked
`gl.uniform1f`: one stream advanced monotonically `215.449 → 216.920` over 1.5 s ≈ **0.98
units/s** — the live `uTime`). Yet the painted field is **visually frozen**. Why:

The demo's default atmosphere SHAPE is `motion: "breathing"`
(`demo/@/components/custom/panes/keys.ts:28`, confirmed live: the running `auroraAtoms` =
`{harmony:"analogous", colorEnergy:0.55, zones:{count:4,arrangement:"composed"}, noise:0.5,
medium:{kind:"smooth"}, motion:"breathing", seed:"lab(92% 88.80 20 / 100%)"}`).

`resolveAtoms` maps that atom through `MOTION_FIELDS`
(`glass-ui/src/components/custom/aurora/composables/atoms.ts:164-168`):

```ts
const MOTION_FIELDS: Record<AuroraMotionAtom, MotionFields> = {
    still:     { nucleiDrift: 0,     paletteDrift: 0,     warpDrift: 0,     breathDepth: 0    },
    breathing: { nucleiDrift: 0,     paletteDrift: 0,     warpDrift: 0,     breathDepth: 0.05 },
    drifting:  { nucleiDrift: 0.015, paletteDrift: 0.015, warpDrift: 0.008, breathDepth: 0.05 },
};
```

**For `breathing`, `nucleiDrift = paletteDrift = warpDrift = 0`.** In the fragment shader
(`aurora.frag.ts:148-157, 367-368`), the three SPATIAL motion terms — the nuclei orbit
(`K_NUCLEI=14`, ~45 s/cycle), the palette hue breathe (`K_PAL=24`, ~33 s/cycle), and the domain-
warp scroll (`K_WARP=5`) — are each gated by `uNucleiDrift` / `uPaletteDrift` / `uWarpDrift`.
All three are **0**, so every spatial/chromatic motion term multiplies by zero. The *only*
surviving animated term is the global brightness breath:

```glsl
float breath = sin(t * 6.2831 / max(uBreathPeriod, 1.0));   // frag:367
col *= 1.0 + uBreathDepth * breath * 0.5;                    // frag:368  → ±(0.05*0.5)= ±2.5%
```

So the entire "animation" of the default atmosphere is a **±2.5% global luminance pulse with
zero spatial movement and zero hue/shade variation.** That is precisely "does not move, no shade
variation."

### Quantitative confirmation (gl.readPixels on the live framebuffer)

I read an 8×8 center block of the default framebuffer immediately after each `drawArrays`,
over 2.5 s (45 post-draw samples):

| sample | center RGB |
|---|---|
| first | `[209,168,174]` |
| mid | `[210,169,174]` |
| last | `[211,170,176]` |

**Total drift ≈ ±1–2 / 255 (~0.5–0.8% luminance) over 2.5 s** — bit-level motion (45 distinct
hashes) that is **sub-perceptible** to the eye. There is NO spatial structure travel and NO hue
shift. Empirically, the user is right: nothing visibly moves and the shade does not vary.

Screenshot evidence: `docs/tranches/N/audit/lanes2/shots/u-aurora-fullpage.png` — a soft, nearly-
flat pink/mauve wash. (Note the wash DOES derive from the picked LAB-pink seed — the
seed→palette coupling at `App.vue:269-280` works; "no shade variation" is about *temporal/spatial*
variation within the field, not the seed-tracking, which is fine.)

---

## 3. Why the N.W5 "aurora palette-derived ✓ (paired screenshots)" claim missed this

`PROGRESS.md:19` books N.W5 aurora as DONE with paired screenshots. The screenshots prove the
**seed→palette derive** works (the wash is pink, not the old static cyan "Sky"). They do NOT and
cannot prove **motion**, because a still image cannot. The motion-deadness slipped the gate
because the only static-image-checkable property (palette derivation) passed. U33 is the user
catching the temporal axis the screenshot gate is blind to.

---

## 4. Where the fix belongs — glass-ui root, with a demo interim

The user's instinct ("may need the glass-ui root") is **correct**. Two layers:

### 4a. glass-ui (the real fix — the motion-fields table is under-amplituded)
`glass-ui/src/components/custom/aurora/composables/atoms.ts:164-168`. The `breathing` register
shipping **zero spatial drift** is the design defect: a "breathing" atmosphere that only pulses
brightness ±2.5% reads as dead on a calm, low-chroma seed (exactly the demo's default LAB-pink).
The glass-ui ask for N (author into tranche BA, the just-written glass-ui tranche):
- Give `breathing` a *small but perceptible* spatial life — non-zero `nucleiDrift` (a slow nuclei
  orbit/sway) and/or a `paletteDrift` (gentle hue breathe), so "breathing" is visibly alive, not
  a near-static brightness pulse. The `K_*` lifts already scale these to a "slowly alive ~5–15 s
  window" (frag:148-157) — `breathing` just never engages them.
- Consider raising `breathDepth` for `breathing` above `0.05`, OR widening the `col *= 1 + depth*
  breath*0.5` half-scale, so even pure-breath has perceptible amplitude.
- This is a glass-ui-root change because every consumer (not just this demo) gets a dead
  "breathing" default otherwise; per `feedback_glass_ui_first_class.md` the design-system register
  table belongs in glass-ui, not patched per-consumer.

### 4b. demo (the cheap interim / independent improvement)
`demo/@/components/custom/panes/keys.ts:28`. The demo seeds `DEFAULT_AURORA_ATOMS.motion =
"breathing"`. Switching the demo default to **`"drifting"`** immediately engages the non-zero
`nucleiDrift/paletteDrift/warpDrift` (0.015/0.015/0.008) and gives the live spatial motion the
user expects — WITHOUT any glass-ui change, since `drifting` already carries non-zero drift. This
is the fastest path to satisfying U33's "must move." (Keep `breathing` available in `AuroraPane`'s
motion select; just don't ship it as the default.)

**Recommendation:** do BOTH — flip the demo default to `drifting` for the immediate fix
(N.W6/demo), AND author the glass-ui ask to make `breathing` non-dead (tranche BA) so the
register is honest for all consumers. The demo flip is the load-bearing one for U33.

---

## 5. Secondary observation (in-scope, for the fold)
The atmosphere opacity/contrast is also low — the pink wash is very pale against the gray card
field (ties into U1 "overwhelmingly gray and dark"). That is a separate amplitude/composite
concern (the demo does not pass `opacityCeiling`, defaulting to 1, but the *seed* is a high-L
low-chroma LAB pink so the derived palette is intrinsically pale). Not the U33 motion root cause,
but worth folding next to U1's "gray wash" finding — a more energetic default seed or a
`colorEnergy` bump would also help the field read.

---

## Evidence ledger (all live, my own chrome-devtools page, cold app :9000)
- `resolveRenderMode("auto") = "webgl"`; UNMASKED renderer = Apple M5 Max ANGLE Metal; software
  probe = false → **CSS-fallback hypothesis refuted**.
- atmosphere canvas = live webgl2, not context-lost, **44 fps draw loop**, advancing `uTime`.
- live `auroraAtoms.motion = "breathing"`; `MOTION_FIELDS.breathing` = all spatial drift **0**.
- `gl.readPixels` center: **±1–2/255 over 2.5 s** — sub-perceptible; no spatial/hue travel.
- Root: `glass-ui/.../composables/atoms.ts:164-168` (`MOTION_FIELDS`) + frag gating
  `aurora.frag.ts:148-157,367-368`; demo trigger `keys.ts:28` (`motion:"breathing"` default).

**File:line index**
- demo seed default: `demo/@/components/custom/panes/keys.ts:22-29` (`motion:"breathing"`)
- demo wiring: `demo/color-picker/App.vue:229-280` (`resolveRenderMode("auto")` @245; `useAurora` @247-252; seed watch @269-280)
- glass-ui probe: `glass-ui/src/components/custom/aurora/constants/renderMode.ts:33-106`
- glass-ui motion table: `glass-ui/src/components/custom/aurora/composables/atoms.ts:164-168, 388-401`
- glass-ui shader gating: `glass-ui/src/components/custom/aurora/constants/shaders/aurora.frag.ts:148-157, 367-368`
- glass-ui arm path: `glass-ui/src/components/custom/aurora/composables/useAurora.ts:247-345`
