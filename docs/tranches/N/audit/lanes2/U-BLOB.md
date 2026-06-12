# Lane U-BLOB — grounding U3 + U30b (the hero blob)

**Fleet**: second N-tranche deep-audit (lanes2). **Mode**: tranche-development only — nothing
implemented. **Live**: http://localhost:9000 (own devtools page, page 8).
**Evidence shots**: `docs/tranches/N/audit/lanes2/shots/U-BLOB-resting.png` (full card; the blob is
the pale near-white bead top-of-card).

---

## Verdict (one line)

U3 has THREE independent root causes, all **demo-side**, plus ONE genuine glass-ui gap. The
"colors FAR TOO WHITE" is **NOT a `deriveBlobPalette` bug and NOT the `chromaCeiling`** — it is the
demo's **default seed color** being near-white (`lab(92% …)` → OKLCh **L=0.912**). The "NO satellite
blobs" is NOT an un-armed satellite system (3 are armed + running) — it is that the satellites
**share the body palette field** (no per-satellite color), so at 112 px + a near-white ramp they are
imperceptible; the user's specific ask (satellites = derived shades, deriveAurora-style) **requires a
new `uSatColor[]` half that does not exist** — this is the §8 ask, confirmed missing.

---

## U3.a — "colors FAR TOO WHITE" — ROOT CAUSE (demo seed, not glass-ui)

### The feed (App.vue)

`demo/color-picker/App.vue:292-306` watches `cssColorOpaque` and pushes:

```
blobConfig.color.paletteStops = deriveBlobPalette(css, {
    stopCount: 4, harmony: "analogous", chromaCeiling: 0.16,
}).map(oklchStopToHex);
```

### The seed

`demo/@/components/custom/color-picker/index.ts:36`:
`const DEFAULT_INPUT_COLOR = "lab(92% 88.8 20 / 82.70%)";` — this is the live default (the address
bar confirms `?color=lab(92%25+88.80+20+/+82.70%25)`).

### The math (run via node against `../glass-ui/dist/color.js`, read-only)

`cssToOklch("lab(92% 88.8 20 / 82.70%)")` → **`{ L: 0.9118, C: 0.0464, h: 9.83 }`**.
The seed is **already near-white** (white = L 1.0; this seed is L 0.91 at chroma 0.046 — a barely-pink
near-white). `deriveBlobPalette` walks `L = anchorL - lightnessSpread/2 + lightnessSpread·t` (glass-ui
`src/composables/color/index.ts:291`, `lightnessSpread=0.18` default) so the four stops are:

| stop t | OKLCh L | C | h | hex |
|---|---|---|---|---|
| 0 (deepest = **body**) | 0.822 | 0.046 | 345.8 | `#dcb9cb` |
| 0.33 | 0.881 | 0.067 | 1.8 | `#ffc6d4` |
| 0.67 | 0.932 | 0.035 | 17.8 | `#ffe0e0` |
| 1 (lightest = satellites) | 0.965 | 0.018 | 33.8 | `#fff0ec` (near-white) |

The **body** reads the deepest stop = `#dcb9cb` (L 0.82, already very pale); the upper field /
satellite stops go to `#fff0ec` (L 0.965 — effectively white). The screenshot confirms a pale-white
bead.

### `chromaCeiling: 0.16` is a NO-OP here — it is NOT the culprit

The cap (`src/composables/color/index.ts:298`) clamps stop chroma to ≤ 0.16. But every derived stop's
C ≤ 0.067 — nowhere near 0.16. With/without the ceiling the hex is **byte-identical**
(`["#dcb9cb","#ffc6d4","#ffe0e0","#fff0ec"]` both ways). The audit hypothesis "chromaCeiling 0.16?"
(LEDGER U3) is **disproven**: the cap never fires for this seed. The pallor is **pure L**, not C.

### Proof that the derivation is healthy for a non-white seed

`deriveBlobPalette` faithfully reflects the seed L. For a saturated mid-L seed:
- `#e0218a` (anchorL 0.603) → body `#973d91`, ramp `#973d91 #b84a8c #d55982 #ef6d76` — rich magentas.
- `oklch(0.55 0.18 350)` (anchorL 0.55) → body `#832e87`, ramp `#832e87…#db5c6e` — saturated.

So the deriver is correct; **the demo simply seeds it with a near-white color.**

### The shader then pushes it EVEN whiter

`metaball.frag.ts` adds, on top of the already-pale palette sample:
- `oklch.x = clamp(oklch.x + uBrightnessShift, …)` (line 283) — a brightness bias;
- the iridescence sheen `oklch.x = min(oklch.x + 0.05*w, 1.0)` (line 310) — rim brightening;
- default-on lit-glass + SSS inner-glow (`uLit` default 1, `paramsFor.iridScale` 0.55–1.35).

On an L-0.82-and-up body these all bias toward white. The lit-glass superset is TUNED for the
warm-CREAM library default (`BLOB_CONFIG_DEFAULTS.color.paletteStops = ["#b5947f","#d4b27d","#dad6b1"]`,
anchor `{L:0.78,C:0.05,h:78}`, glass-ui `types.ts:284-302`) — a body L≈0.78 with REAL chroma. The demo
overrides that warm default with a near-white pink ramp, so the same SSS/iridescence that reads as a
"warm wet bead" on cream reads as a "white blob" on pale pink.

### The fix surface (for the wave — NOT implemented here)

Three independent levers, in priority order:
1. **Demo default seed** — `DEFAULT_INPUT_COLOR` (index.ts:36) should be a mid-L saturated color, or
   the blob feed should floor/scale the seed's L before deriving (e.g. derive the blob ramp from a
   darkened/saturated variant of the picker color so a near-white pick still yields a perceptible
   body). The user wants the blob to "derive from current color" — so a per-pick L-floor in the
   `deriveBlobPalette` options (App.vue:296) is the least-surprising lever: pass `lightnessSpread`
   wider AND clamp the anchor L into a body-visible band (≈0.45–0.70) before the ramp walk.
2. **Lower `config.color.brightnessShift` / iridScale on the demo instance** so the shader stops
   white-biasing the already-light pick.
3. **A `deriveBlobPalette` option to anchor the BODY (t=0) stop at a target L** rather than
   `anchorL - spread/2` — a glass-ui ask (the deriver currently centres the ramp on the seed L; a
   `bodyLightness?` / `lightnessFloor?` option would let the consumer guarantee a visible body
   regardless of seed pallor). **glass-ui tranche item.**

---

## U3.b — hover "broken + janky" — live characterization

- **Console**: clean — `list_console_messages` returned NO errors/warns. The hover does NOT throw.
- **Mood IS triggering**: `HeroBlob.vue:10` wires `@mouseenter="gooBlobRef?.setMood('curious')"`; the
  click path (`onBlobClick`, lines 43-47) calls `setMood('happy') + nudge()`. The FSM is glass-ui's
  autonomic `{valence,arousal}` circumplex (constants.ts:48-104) — it works.
- **The jank is FRAME RATE, not a logic break.** Measured RAF cadence (own probe, `evaluate_script`):
  - **At rest**: **28 FPS**, median frame delta **38.8 ms**, p95 49.9 ms, max 53 ms.
  - **During hover** (dispatched pointerenter → curious transition): **~33 FPS**, median **30.8 ms**,
    p95 40.8 ms, max 40.9 ms.
  - Both are ~2× over the 16.7 ms/60fps budget. **Caveat**: devtools runs the software-GL
    (SwiftShader) path, so absolute FPS is pessimistic vs a real GPU — but the RELATIVE story (every
    interaction frame is double-budget, and rest itself never reaches 60) is real and matches the
    user's "janky." This is a whole-page number (the aurora background canvas + blob both RAF); a
    proper trace should attribute the cost, but the blob's per-frame `samplePaletteOklch` + FBM +
    analytic-gradient + lit/SSS/iridescence fragment work on a 358×358 device-px canvas is a real
    fragment-shader load.
- **Recommended for the wave**: a `performance_start_trace` hover capture on a real-GPU profile to
  split aurora vs blob cost; and the demand-loop quiescence (glass-ui `useBlobSatellites.isQuiescent`
  / `nextEventMs`, lines 348-370) should already park the blob between phase boundaries — verify it
  actually parks at rest (the 28 fps rest number suggests the AURORA, not the blob, is the rest cost;
  cross-check with lane U-AURORA / U33).

---

## U30b — "blob bigger; essentially absolutely top-right of the picker card"

- **Mount**: `ColorPicker.vue:22`:
  `<HeroBlob ref="heroBlobRef" class="col-start-2 col-span-2 row-span-2 justify-self-end" … />`
  inside a CardHeader `grid grid-cols-3 grid-rows-[auto_auto]` (line 4). It is **grid-flowed**, not
  absolutely positioned — `justify-self-end` pushes it right WITHIN its grid cell, but it shares the
  header row with the color-space selector + component display, so it reads as "top center-right,"
  not a bold top-right anchor. The resting screenshot confirms it sits roughly centered-top.
- **Size**: `HeroBlob.vue:8` hard-codes `class="w-[7rem]"` (112 px; canvas CSS-sized 1.6× = 179 px,
  device 358 px). The user wants it **bigger**.
- **Gap spec (demo)**: lift the blob to `position: absolute` (or grid-overlay) pinned top-right of the
  Card (not the header grid cell), bump the size token (`w-[7rem]` → a larger clamped token), and let
  it overhang the card corner ("essentially absolutely top-right"). Keep `pointer-events` correct so
  it doesn't eat header clicks. **demo wave item.**

---

## U3.c — satellites: what ships, what arms them, why the demo shows none, the §8 gap

### Satellites DO ship and ARE armed (the user's "NO satellite blobs" is a perception, not absence)

- glass-ui ships a full orbit/merge/absorb/emerge satellite FSM:
  `../glass-ui/src/components/custom/goo-blob/composables/useBlobSatellites.ts` (4-phase machine,
  lines 186-326; `createSatellite`, `orbitPos`, gooey merge-in via the smin membrane).
- **What arms them**: `config.geometry.satelliteCount` (consumed `useBlobSatellites.ts:161` in
  `syncCount`). Default = **3** (`../glass-ui/src/components/custom/goo-blob/types.ts:218`,
  `BLOB_CONFIG_DEFAULTS.geometry.satelliteCount: 3`). The demo mounts the blob from
  `BLOB_CONFIG_DEFAULTS` (App.vue:285 `reactive(structuredClone(BLOB_CONFIG_DEFAULTS))`) — so **3
  satellites are armed and ticking live.** The BlobPane admin slider can set 0–4
  (`BlobPane.vue:45`).

### Why the demo shows none (perception root cause)

1. **No independent color** — satellites are rendered by the SAME `samplePaletteOklch(colorNoise)`
   field as the body (`metaball.frag.ts:279`); the satellite uniforms carry only
   **position/radius/opacity** (`uSatPos`/`uSatRadius`/`uSatOpacity`,
   `metaball-uniforms.glsl.ts:84-86`; uploaded `uploadBlobUniforms.ts:285-296`). So a satellite is
   just an offset lump of the SAME near-white surface. Against a 112 px near-white body on a pale
   background, a near-white satellite at orbit radius 0.17 × POS_SCALE is invisible.
2. **Small footprint** — at 112 px the orbit envelope (`orbitRadius 0.17`, `satelliteRadius 0.082`)
   is a handful of CSS pixels; the goo merge events are sub-pixel-scale to the eye.
3. **Membrane merge is gooey-quiet** — `merge: "circular"` smin (types.ts:262) lays a smooth fillet,
   so a satellite necking into a same-colored body reads as a faint bulge, not a distinct orbiting
   ball.

### The §8 ask — `uSatColor[]` — CONFIRMED MISSING (the genuine glass-ui gap)

The user wants satellites = "slightly-different shades of the current color, like deriveAurora." That
requires each satellite to carry its OWN derived stop (a lighter/family shade), rendered with that
color — exactly the **`uSatColor[]`** uniform the §8 ask names. **It does not exist:**

- `grep uSatColor` across `../glass-ui/src/components/custom/goo-blob/` → **zero hits**. The shader's
  satellite uniform block (`metaball-uniforms.glsl.ts:83-86`) has `uSatCount`, `uSatPos[MAX_SATS]`,
  `uSatRadius[MAX_SATS]`, `uSatOpacity[MAX_SATS]` — and **no `uSatColor`**.
- The fragment shader colors the whole composited field from ONE palette sample
  (`metaball.frag.ts:279`); there is no per-source color routing. Satellites have no chromatic
  identity by construction.

So the deriveBlobPalette ramp already PRODUCES the family shades (stops t=0.33/0.67/1 are the lighter
in-family shades the docstring calls "satellites take the lighter in-family stops",
`src/composables/color/index.ts:266-267`) — **but the shader never binds a stop to a satellite**; it
distributes all stops spatially by FBM noise across body AND satellites alike. The "satellites = the
lighter stops" is a docstring INTENT that the renderer does not honor per-source.

### The gap spec — what to build (cross-repo)

**glass-ui (the missing half):**
1. Add `uSatColor[MAX_SATS]` (vec3) to `metaball-uniforms.glsl.ts` + the `UNIFORM_NAMES` list
   (constants.ts:151-192) + the program-builder location cache.
2. In `metaball.frag.ts`, when compositing a satellite's contribution, sample the satellite's OWN
   color (not the body palette field) — likely a per-source weighted blend so the gooey merge
   cross-fades the satellite color INTO the body color at the neck (avoids a hard color seam at the
   smin fillet).
3. In `uploadBlobUniforms.ts`, upload a per-satellite color. Source: the lighter `deriveBlobPalette`
   stops — give each of the (≤4) satellites the (i+1)-th stop, so satellite colors ARE the derived
   family shades the docstring already promises (and the deriveAurora analogy the user draws).
   Wire the satellite-color array off `frame.paletteStops` (already plumbed,
   `uploadBlobUniforms.ts:48/100`) — assign satellite i ← stops[(i % (stopCount-1)) + 1].
4. Optionally a `config.color.satelliteShadeSpread` knob so a tuning session can widen the
   satellite-vs-body shade delta.

**demo (the seed half — U3.a):** floor/saturate the seed L so the body is a perceptible field, and
bump size/position (U30b) so the satellites + orbit are large enough to read.

These two together deliver the user's literal ask: a bigger, top-right, NOT-white blob whose orbiting
satellites are visibly-distinct family shades of the current color.

---

## Minor perf note (not in the audit, found live)

There are **two GooBlob WebGL2 contexts** mounted simultaneously — the mobile (`lg:hidden`) and
desktop (`hidden lg:flex`) ColorPicker copies each instantiate a GooBlob. On desktop the mobile copy's
canvas is 0×0 (its `pane-wrapper hidden lg:flex` is display:none) but **its WebGL2 context is still
allocated** (canvas.width 400, but rect 0×0). This is a wasted GPU context / RAM cost — NOT the
K.W2 dual-instance precept violation (these are two legitimate responsive ColorPicker mounts), but a
candidate for a `v-if`-gated single-mount when the wave touches the responsive shell. Confirmed via
`evaluate_script` enumerating `.goo-blob-wrapper` (2 wrappers: one visible 112×112, one hidden 0×0;
ancestor chains `lg:hidden` vs `pane-wrapper hidden lg:flex`).

---

## Ownership ledger (for the fold)

| Sub-finding | Owner | file:line |
|---|---|---|
| U3.a near-white = near-white SEED, not chromaCeiling | **demo** | `index.ts:36` (seed) + `App.vue:296` (feed) |
| chromaCeiling 0.16 is a no-op here (hypothesis disproven) | — | `glass-ui color/index.ts:298` (cap never fires; C≤0.067) |
| shader white-bias on light bodies (brightnessShift/irid/SSS tuned for cream) | glass-ui (tuning) + demo (override) | `metaball.frag.ts:283,310`; `types.ts:284-302` |
| U3.b jank = sub-60fps RAF (28 rest / 33 hover), no console error, mood fires | demo perf + glass-ui frag cost | `HeroBlob.vue:10`; `metaball.frag.ts` |
| U30b bigger + absolute top-right | **demo** | `ColorPicker.vue:22`; `HeroBlob.vue:8` |
| satellites ARE armed (count 3) + run | glass-ui (works) | `types.ts:218`; `useBlobSatellites.ts:161-186` |
| satellites show as none = no per-sat color + tiny + same-color | demo (size/seed) + glass-ui (gap) | `metaball.frag.ts:279`; `uploadBlobUniforms.ts:285-296` |
| **`uSatColor[]` §8 ask — MISSING** (the deriveAurora-shade satellites) | **glass-ui** (new uniform half) | `metaball-uniforms.glsl.ts:83-86` (no uSatColor); `UNIFORM_NAMES` constants.ts:151-192 |
| 2 GooBlob WebGL contexts (responsive double-mount) | demo (perf) | `ColorPicker.vue` desktop+mobile shells |
