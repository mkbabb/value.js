# CHALLENGE-C — `demo/picker/visual/HeroBlob.vue` — implementation

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the seat's declared model.
Declaration honoured; no inherited/undeclared seat.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- Seat spec named HEAD `c654824e`; the working tree had already advanced to **`e79fcd43`**
  (`docs(V·mega): core band COMPLETE 21/21 validated — picker promoted into the freed slot`).
  `demo/picker/visual/HeroBlob.vue` is byte-identical between the two — no source commits landed
  between them touching this component. All measurements below are against `e79fcd43`.
- **No source edits made.** Only files under this directory were written (the report + five probes).

---

## What was measured

| probe | file | what it decides |
|---|---|---|
| C1 | `probe-C1-boot.mjs` | boot vitals, engine-mount long task, backing-store ratio |
| C2 | `probe-C2-gl-loss-and-inkfloor.mjs` | plate lightness light vs dark; the `floorStops` decision in both schemes |
| C3 | `probe-C3-stops-and-realloss.mjs` | the LIVE `paletteStops` HeroBlob feeds the producer, across a scheme flip |
| C4 | `probe-C4-ornament-kill.mjs` | can an atmosphere GL loss delete the ornament |
| C5 | `probe-C5-park-leak.mjs` | does the W3-3 idle park leak after a pointer wake |
| C6 | `probe-C6-hover-wake.mjs` | does the parked bead answer a pointer at all (GL draw-call count) |

Run: `node docs/tranches/V/megatranche/audit/components/picker-heroblob/probe-C*.mjs` against the
live dev server at `http://localhost:9000` (Chromium, 1440×900, DPR 2). All outputs pasted below.

---

## C-1 · BLOCKER — the ink floor is bought by destroying 68% of the picked chroma; the hero bead is not the picked colour

`reseedHeroStops` (HeroBlob.vue:117-130) derives the ramp, then `floorStops` (HeroBlob.vue:97-111)
shifts every stop's `L` **after** `deriveBlobPalette` has already centred the ramp on the seed's L
and gamut-mapped it. The seed L is where the chroma lives; the post-hoc shift moves the ramp off
that L without re-deriving chroma, so the bead lands at the right lightness and the wrong colour.

**The live ramp, read out of the running app** (probe C3 — `.goo-blob-wrapper.__vueParentComponent.props.config.color.paletteStops`):

```
"before": { "stops": ["#c384a6","#c3a4ab","#c4bbbb","#c4bbb9"], "quality":"full",
            "fissionAmp":0.6, "bodyRadius":0.325 }
```

Decoded (`cssToOklch`, glass-ui 7.0.0):

```
LIVE boot stops (read from the running app, probe C3):
  L 0.6872 C 0.0890 h 346.1
  L 0.7482 C 0.0375 h 2.8
  L 0.7994 C 0.0102 h 17.4
  L 0.7989 C 0.0106 h 32.5
  meanL 0.7584   maxC 0.0890
```

The seed at that moment is `lab(92% 88.8 20)` (probe C2, read from `--blob-color`):
`seed L 0.9583 C 0.2725`.

**Max ramp chroma 0.0890 against a seed chroma of 0.2725 — 32.7%.** The bead is a mid-mauve grey
(`#c4bbbb` is effectively neutral) for a hot-pink pick.

**Byte-exact offline reproduction of the shipped path**, and the cure measured beside it:

```
seed L 0.9583 C 0.2725
A · SHIPPED derive (chromaCeiling=0.2725), then the demo L-push -0.1808:
   L 0.6875 C 0.0879 -> #c384a6
   L 0.7475 C 0.0388 -> #c3a3ab
   L 0.7992 C 0.0097 -> #c4bbbb
   L 0.7992 C 0.0099 -> #c4bbb9
   maxC 0.0879
B · producer bodyLightness:0.65 (the shipped knob HeroBlob does not use):
   L 0.6500 C 0.2725 -> #f60bb2
   L 0.7100 C 0.1975 -> #ff6198
   L 0.7700 C 0.1364 -> #ff8e93
   L 0.8300 C 0.0958 -> #ffb19e
   maxC 0.2725
```

Path A reproduces the live stops to ±1 in one channel (`#c3a3ab` vs live `#c3a4ab`). Path B is the
**same body lightness** (0.65 vs the shipped 0.6875) at **3.1× the chroma** — because
`deriveBlobPalette`'s own `bodyLightness` option pins the body stop's L *before* the gamut-map, so
the derivation gets to spend the lightness headroom on chroma instead of having it taken away
afterwards.

`bodyLightness` is a **shipped glass-ui 7.0.0 option** —
`node_modules/@mkbabb/glass-ui/dist/composables/color/index.d.ts:122-131`:

> Pin the body stop's OKLCh lightness. […] When set, the body stop (t=0) anchors at exactly this L
> and the satellites still climb `lightnessSpread` from it — so a consumer picks the body luminance
> directly (the deep-body read) without moving the seed hue/chroma.

That sentence is a verbatim description of what `floorStops` is trying to do. HeroBlob does it by
hand, after the fact, and loses the chroma.

Corroborated visually: `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-dark/picker.png`
shows the bead as a **near-white cream teardrop** for the same hot-pink pick (dark scheme takes the
no-push branch — see C-2 — so the raw derive's own near-white ramp ships unmodified). Between the
two schemes the bead is either grey-mauve or cream. **It is never the picked colour.**

**Cure (architectural transposition, not a patch):** delete `floorStops` and `INK_FLOOR`; compute
the target body lightness from the live plate (`plateL ± INK_FLOOR`) and pass it as
`deriveBlobPalette`'s `bodyLightness`, with `lightnessFloor: clampLightnessFloor()` (also shipped —
`presets.d.ts`). The ink floor then becomes an *input* to a gamut-correct derivation instead of a
post-hoc mutilation of one.

---

## C-2 · MAJOR — the ink floor never re-derives on a scheme flip (reactivity that cannot fire)

`floorStops` reads `inkAmbient?.value` (line 98) and `isDark.value` (line 99). Both reads happen
inside the **callback** of

```ts
watch(cssColorOpaqueFrame, (css) => reseedHeroStops(css), { immediate: true });   // :132
```

A watch callback is not a reactive scope. The only tracked source is `cssColorOpaqueFrame`, so a
dark↔light flip, or any ambient drift, cannot re-run the derive.

**Mechanically proven** (probe C3 — flip `documentElement.classList` dark, wait 1500 ms, re-read the
live props, no colour touched):

```
"stopsUnchangedAcrossFlip": true
"before":     ["#c384a6","#c3a4ab","#c4bbbb","#c4bbb9"]
"afterFlip":  ["#c384a6","#c3a4ab","#c4bbbb","#c4bbb9"]
"afterColourChange": ["#ac5987","#d26082","#eb7378","#f3937a"]   ← only a colour change re-derives
```

**And the two schemes genuinely demand different ramps** (probe C2 — resting-plate composited OKLab L
measured with the same dual-ground instrument `useContrastSafeColor` uses):

```
"light": { "bgToken":"color(srgb 0.994 0.96 0.926 / 0.65)",  "alpha":0.651, "plateL":0.8079 }
"dark":  { "bgToken":"color(srgb 0.2074 0.165013 0.1326 / 0.72)", "alpha":0.722, "plateL":0.3511 }
"pick": "lab(92% 88.8 20)",  "pickL": 0.7862
"decisionLight": { "delta": -0.0217, "pushes": true  }
"decisionDark":  { "delta":  0.4351, "pushes": false }
```

Same pick: the light plate needs a push, the dark plate does not. Flip the theme after boot and the
component keeps whichever answer it computed first. In the observed case the residual |ΔL| after a
dark→light flip is **0.0217 — 7× below the 0.15 ink floor** the whole F-4 cure exists to guarantee.
The figure-ground collapse the comment at :81-93 describes ("a pink bead sits on a pink plate")
returns on every theme toggle.

**Cure:** `heroStops` should be a `computed` over `(cssColorOpaqueFrame, isDark, inkAmbient)` — or,
after C-1's cure, the floor is an argument to the derive and the derive is the computed. Either way
the referent must be tracked, not sampled.

---

## C-3 · MAJOR — the ornament's mount is gated on ANOTHER canvas's WebGL success; there is no context-loss path anywhere in the blob chain

The mount gate is `ColorPicker.vue:94` → `v-if="blobReady && ornamentOpen"`, with
`ornamentOpen = overture?.b4.value ?? true` (`ColorPicker.vue:162`). The transitive chain:

```
useAtmosphere.ts:321-324   auroraArrived = (mode==="css" || aurora.isArmed) && !contextLost
App.vue:296                overture = useOverture(auroraArrived)
useOverture.ts:106-118     b2 latches on  fieldArmed ∧ dockLanded      (latch-once, never re-opens)
useOverture.ts:152-156     b4 opens on    b3Complete ∧ b2
ColorPicker.vue:94         HeroBlob mounts iff b4
```

So a `webglcontextlost` on the **atmosphere** canvas before `b2` latches removes the hero blob for
the whole session. And nothing recovers it: grepping the producer's shipped bundle finds **zero**
context-loss handling in the blob path —

```
$ grep -o "webglcontextlost\|webglcontextrestored\|context lost\|isContextLost" \
      node_modules/@mkbabb/glass-ui/dist/blob.js | sort | uniq -c
(no output)

$ grep -rn "webglcontextlost\|webglcontextrestored" demo/
demo/color-picker/composables/boot/useAtmosphere.ts:298:  canvas.addEventListener("webglcontextlost", …)
demo/color-picker/composables/boot/useAtmosphere.ts:301:  canvas.addEventListener("webglcontextrestored", …)
```

The atmosphere — the sibling WebGL surface in the same app — has the "NO-FIELD HONEST TERMINAL"
(`useAtmosphere.ts:283-310`): loss → the persisted gradient ground serves, restore-once re-arms.
HeroBlob has no equivalent, and it ignores the producer's shipped `rendererStatus` seam
(`blob.js` exposes `{ nudge, setMood, pulse, currentMood, pause, resume, settled, settledFrame,
rendererStatus }`).

**Observed instance** — `docs/tranches/V/megatranche/audit/visual/REPORT.json`, the picker route
across the real-Safari matrix:

```
safari-desktop-light  settle 18905  canvas 1  consoleErrors ["WebGL: context lost."]
safari-desktop-dark   settle  3515  canvas 2  consoleErrors []
safari-mobile-light   settle  3317  canvas 2  consoleErrors []
safari-mobile-dark    settle  3287  canvas 2  consoleErrors []
```

`shots/safari-desktop-light/picker.png` confirms it by eye: **no bead at the card corner.** The
producer renders its `<canvas>` unconditionally (`blob.js`: `D("canvas", { class:"goo-blob-canvas",
"data-testid":"goo-blob-canvas" })`, no `v-if`), so `canvas 2 → 1` means the whole HeroBlob subtree
was never mounted — not that a mounted canvas went blank. Settle blew out 5.7× (18 905 ms vs
~3 300 ms) on the same route.

**Reproduction status — partial, and I say so plainly.** The Safari capture *is* the observed
failure. I could not force it in Chromium: probe C2 dispatched a synthetic `webglcontextlost`
at 400 ms, probe C3 called `WEBGL_lose_context.loseContext()` at 400/900 ms, probe C4 patched
`getContext` before boot to hold the app's own context and lost it at 500/1000/3000 ms — b2 latched
normally every time (`overture:b2@1360..1502`) and the blob mounted (`canvasCount 2`). C4's context
log shows why the last attempt missed: the app's first `webgl2` context is created at ~126-175 ms on
a canvas whose `className` is empty, so my atmosphere key never matched:

```
ctxLog: [('webgl2','(none)',169,True), ('2d','(none)',175,True),
         ('2d','(none)',269,True), ('webgl2','goo-blob-canvas',2410,True)]
```

The source chain is **read-confirmed**; the *trigger* in Safari is not yet pinned. Treat the coupling
itself as the defect: an ornament that cannot render must not be gated on an unrelated GPU surface,
and a WebGL consumer with no loss path is unsound regardless of how often loss happens.

**Cure:** gate `b4` on paint-completion, not on the field's GPU arrival (`b3Complete ∧ dockLanded`
is sufficient for the beat DAG's stated order); and give the blob the atmosphere's honest terminal —
subscribe `rendererStatus`, and on a non-ok status keep the `.hero-blob-anchor::before` contact
shadow as the seated ornament rather than nothing.

---

## C-4 · MAJOR — the blob engine mount is 100% of the picker route's Total Blocking Time (measured)

Probe C1, Chromium 1440×900 DPR 2, warm dev server, unthrottled:

```json
"vitals": {
  "fcpMs": 264, "lcpMs": 264, "cls": 0.0193, "loadEventMs": 238,
  "longTaskCount": 2, "longTaskTotalMs": 531, "longestTaskMs": 397,
  "tbtAfterFcpMs": 347,
  "top5Tasks": [ { "startMs": 2321, "durMs": 397 }, { "startMs": 84, "durMs": 134 } ],
  "overtureMarks": [["overture:b0",7],["overture:b1",175],["overture:b3",595],
                    ["overture:b2",1296],["overture:b4",2308]]
}
```

- `overture:b4 @ 2308 ms`; the 397 ms long task starts at **2321 ms** — 13 ms later.
- Probe C4's context log independently timestamps the blob's own GL context creation at
  `('webgl2','goo-blob-canvas', 2410)`, inside that task.
- **TBT after FCP = 347 ms = 397 − 50 exactly.** The blob mount is not *a* contributor to blocking
  time on this route; it is the **entire** contributor. The other long task (134 ms @ 84 ms) is
  pre-FCP and does not count toward TBT.

Two honest corrections to the standing record:

1. **The Q14 escalation number does not reproduce on this matrix.** LCP is **264 ms**, not 5141 ms.
   CH-4's "p75 LCP ≤ 2.5 s" is met here by a factor of 9.5. Whatever produced 5141 ms was a
   different matrix (throttled / cold / production bundle) — a wave spec that inherits "5141" as its
   born-RED number is born against a number nobody can currently measure.
2. **The chronic disease has moved.** The eager-boot framing is stale: the chunk *is* deferred
   (`defineAsyncComponent` + `useIdleReady`, `ColorPicker.vue:157-158`) and the mount *is* beat-gated
   past the field's arrival. What survives is a **single indivisible 397 ms main-thread task** —
   exactly the "ONE indivisible producer-engine init task (WebGL2 context + shader compile)" the
   demo's own forensic already named (`useOverture.ts:120-127`). Deferring it further only moves the
   347 ms; it does not remove it. The honest born-RED gate is **`longestTask(blob mount) ≤ 150 ms`**
   or **`TBT ≤ 100 ms` on `/#/`**, measured with `probe-C1-boot.mjs`, and it is a **producer** row
   (shader precompile / `armAsync` chunking), not a demo placement row.

Backing store is healthy — the R2 emerge re-measure cure holds:

```json
"dom": { "canvasCount": 2, "blobPresent": true,
         "blobBacking": {"w":360,"h":360}, "blobCss": {"w":180.2,"h":180.2},
         "dpr": 2, "ratio": 0.999 }
```

(`O-12·5`'s floor is 0.6; measured 0.999.)

---

## C-5 · MAJOR (vacuous gate) — the shared e2e fixture's bead ratio drifted 0.26 → 0.325 and was never updated

`e2e/smoke/fixtures/blob-timing.ts:56-57`:

```ts
/** Visible bead = 2·bodyRadius·fp (bodyRadius 0.26 — the HERO register). */
export const BEAD_RATIO = 0.52;
```

The HERO register ships **`bodyRadius: 0.325`** (`HeroBlob.vue:163`) — bead ratio **0.65**. The
fixture still encodes the pre-W29 value; the tag `v-blob-b0-26-ref-w40` literally names the retired
0.26. `test/picker-blob-config.test.ts:26` was updated to 0.325 in the same change; the e2e fixture
was not.

Consequence at the sole consumer, `e2e/smoke/oracles/o12-blob-seat.spec.ts:113`:

```ts
const r = (BEAD_RATIO / 2) * wrapper.width;   // = 0.26·w, should be 0.325·w
```

At the measured seat (`fp = 112.6 px`, probe C6 `blobBox` 180×180 canvas = 1.6·fp) the occlusion
probes sample a circle of radius **29.3 px** around a bead whose real radius is **36.6 px** — 20%
short in radius, 36% short in area. **O-12·2's whole purpose is to prove the bead's arc never enters
the dock band, and it never touches the arc.** The fixture's own header (:2-6) advertises itself as
the cure for "a three-file hand-sync waiting to skew". It skewed.

---

## C-6 · MAJOR (vacuous gate) — the only unit test is a regex over the raw `.vue` text; one template edit kills the whole component and keeps it green

`test/picker-blob-config.test.ts` reads `HeroBlob.vue` with `readFileSync` and asserts against the
source string: `bodyRadius: 0.325`, `orbitRadius: 0.4`, `satelliteRadius: 0.09`,
`eccentricity: 0.03`, `aria-hidden="true"`, no `@click`, no `writeClipboard`.

**Exact mutation that keeps every assertion green while deleting the component's entire behaviour:**

```diff
-            :config="heroConfig"
+            :config="appBlobConfig"
```

The `heroConfig` computed (:152-178) becomes dead code — its literals stay in the file, so all four
`toMatch` assertions still pass. What dies silently: the HERO geometry register, the fission arming
(`fissionAmp: 0.6` — the "never-meatball cure", :134-150), the `<lg` half-res quality rung (:177),
and the derived palette (`paletteStops: heroStops.value`, :171) — the blob reverts to
`BLOB_CONFIG_DEFAULTS` and renders the stock warm-cream meatball on every viewport. Zero tests fail.

Weaker but equally valid mutations: delete `floorStops` + `INK_FLOOR` entirely (nothing tests them);
invert the `dir` flip; change `INK_FLOOR` to `0`; drop the `onActivated` re-seed. **`floorStops` —
the function this challenge found two separate defects in — has no test of any kind, unit or e2e.**

---

## C-7 · MAJOR — O-12·3 asserts a hover response the component cannot produce (0 GL draws measured)

`e2e/smoke/oracles/o12-blob-seat.spec.ts:139-160` — "the parked bead visibly answers a hover within
400 ms", mean abs frame diff ≥ 6/255, described at :33-36 as "the wake+curious demo beat".

HeroBlob wires **no hover beat**. Its own header (:46-52) lists exactly three moments —
scrub / save / idle — and no pointer host exists: `pressLabel` is omitted, so the producer's hit
layer is not rendered (`blob.js`: `f.value ? button : …`), and the ornament root is
`pointer-events-none` (:10).

Probe C6, after the full park latency (2000 + 3300 + 800 ms), counting real GL draw calls by
patching `WebGL2RenderingContext.prototype.draw*`:

```json
{ "parkedBaseline": 0,
  "blobBox": { "x": 565, "y": 114, "w": 180, "h": 180 },
  "drawsDuringSweep": 0,
  "hitTest": { "tag": "DIV", "cls": "title-row w-full min-w-0", "testid": null },
  "rootPointerEvents": { "anchor":"none", "wrapper":"none", "canvas":"none", "hitLayer": false },
  "drawsAfterColourChange": 53 }
```

A 2-second, 60-step sustained pointer sweep over the bead's centre produced **0 draw calls**;
`elementFromPoint` at the bead centre resolves to `.title-row`, not the blob. The demo's own wake
path works (53 draws after a colour change), so the instrument is sound.

Either O-12·3 is currently RED, or it is green off an artifact: the blob canvas is `alpha: true` and
overscans 1.6×, so a `blob.screenshot()` frame-diff includes the *plate and atmosphere behind it*,
which drift on their own. **Name this a vacuous-gate candidate and re-derive the oracle** — the
metric must read the bead, not the composite.

---

## C-8 · MINOR — `chromaCeiling: Math.max(0.16, seed.C)` is inert; the comment asserting otherwise is false

HeroBlob.vue:73-77 claims "the RAMP CEILING TRACKING THE PICKED C … a C 0.23 pick now derives a
C 0.23 ramp". `chromaCeiling` is a **cap**, per the producer's own doc
(`composables/color/index.d.ts:99-110`: "each stop's chroma is clamped to AT MOST this value"). A
cap set above the derivation's natural output does nothing. Measured — derive with the ceiling vs
without, same seed:

```
B · producer bodyLightness:0.65, chromaCeiling 0.2725 : maxC 0.2725
C · same, chromaCeiling omitted                       : maxC 0.2725   ← byte-identical
```

And in the shipped path (no `bodyLightness`) the derive returns `maxC 0.0879` against a ceiling of
`0.2725` — the ceiling is never reached, let alone binding. Delete the option or replace it with the
knob that actually governs (`bodyLightness`, per C-1).

---

## C-9 · MINOR — four shipped producer primitives reimplemented or ignored; the comments still call them "BOOKED" (edict 4)

glass-ui **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`) exports, and HeroBlob consumes none:

| shipped | HeroBlob's comment | HeroBlob's actual code |
|---|---|---|
| `LIGHTNESS_FLOOR_DEFAULT = 0.15`, `LIGHTNESS_FLOOR_BRACKET = [0.12,0.20]`, `clampLightnessFloor()` (`presets.d.ts`) | ":90-92 — replaces this at the W7 adopt (BOOKED)" | local `const INK_FLOOR = 0.15` (:93) |
| `BlobColor.lightnessFloor` + `DeriveBlobPaletteOptions.lightnessFloor` | same | never passed |
| `BLOB_HERO: BlobConfig` (`presets.d.ts`) | ":148-149 — the exported HERO preset stay PRODUCER" | the register is hand-inlined at :160-177 |
| `settled`, `settledFrame` (`blob.js` expose block) | ":206-210 — the producer `settled`/park-from-quiescence seam (GAP-L5, booked at the 5.0.0 adopt)" | wall-clock `setTimeout` park (:211-226) |
| `rendererStatus` (`blob.js` expose block) | — | ignored (see C-3) |

Every one of those "BOOKED" notes is stale: glass-ui 7.0.0 landed them. The wall-clock park in
particular is the interim the comment itself says should retire the moment `settled` ships — it has.

---

## C-10 · MINOR — two masking fallbacks (edict 2)

1. `reseedHeroStops`'s bare `catch { }` (:127-129) swallows every `cssToOklch` / `deriveBlobPalette`
   throw. The producer's own contract (`index.d.ts:57-59`) is explicit: *"Invalid, contextual, and
   non-opaque inputs throw one `GlassColorError` carrying the parser diagnostics or the named local
   alpha failure. **No catch-to-default recovery occurs at this boundary.**"* HeroBlob re-introduces
   exactly the recovery the producer refused — and this repo has a live `parseCssColor` crash class
   on record, so a real parser regression on the picker's hot path would be silently invisible here.
2. `const ambient = inkAmbient?.value ?? 0.5` (:98), reached via `inject(INK_AMBIENT_KEY, null)`
   (:95). The app's own law for this key is loud-fail — `useContrastSafeColor.ts:347`:
   `const ambient = inject(INK_AMBIENT_KEY)!` with the docblock "a missing provider is a wiring
   defect, surfaced loudly" (:342-343). HeroBlob would instead compute its ink floor against a
   fabricated ambient of 0.5 forever. (The provider does exist today —
   `useAtmosphereBoot.ts:92` — so this is latent, not live.)

---

## C-11 · MINOR — the colour string is parsed twice per rAF-coalesced frame

```ts
const seed = cssToOklch(css);                    // :119 — used only for seed.C
heroStops.value = floorStops(
    deriveBlobPalette(css, { … chromaCeiling: Math.max(0.16, seed.C) }),   // :121-125 — parses css AGAIN
).map(oklchStopToHex);
```

`deriveBlobPalette`'s signature is `(seed: string | OklchStop, options?)` (`index.d.ts:145`) — it
accepts the already-parsed stop. Passing `seed` instead of `css` removes one full CSS colour parse
from a path the comment at :77-78 explicitly describes as running once per frame under a 60×/s
scrub. (After C-1's cure the whole `Math.max(0.16, seed.C)` expression goes away anyway.)

---

## C-12 · MINOR — a live-instrument consumer that skips the mandatory mount bump

`useContrastSafeColor.ts:72-77`, the docblock on the export HeroBlob imports:

> EXPORTED (T.W6.5-P): a component that folds `resolveSurfaceLightnessLive` into its OWN computed
> (the ConsoleRail idiom) is a live-instrument consumer like any other — **it must register the
> mount bump from its setup, or its first (possibly detached/pre-style) probe result caches until
> some OTHER consumer happens to bump the epoch.**

HeroBlob imports `resolveSurfaceLightnessLive` (:42) and never calls `bumpProbeEpochOnMount()`.
Worse, its first probe fires from `{ immediate: true }` at :132 — i.e. during setup, before mount,
which is precisely the detached instant the docblock warns about. The `resting` tier survives today
only because its probe appends to `document.body` rather than querying a mounted element, and
because the cache is keyed on `(darkClass, epoch)` so some other consumer's bump eventually heals
it (`useContrastSafeColor.ts:237-247`). It is a contract violation held up by an accident.

---

## C-13 · MINOR — `floorStops`'s flip branch never re-checks headroom, and on any light plate it always flips

```ts
let dir = delta >= 0 ? 1 : -1;
const need = INK_FLOOR - Math.abs(delta);
const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
if (headroom < need) dir = -dir;                       // :108 — flip, never re-tested
const push = dir * (INK_FLOOR - dir * delta);          // :109 — the flipped push is LARGER
return stops.map((s) => ({ ...s, L: clamp(s.L + push, 0.02, 0.98) }));   // :110 — silent truncation
```

Two problems in five lines:

- Flipping costs **more** travel, not less: the same-side push needs `INK_FLOOR − |delta|`, the
  flipped push needs `INK_FLOOR + |delta|`. The code tests headroom for the *original* side and then
  commits to the other side without testing it. If the flipped side is also short, `clamp` truncates
  and the ink floor is silently unmet — no signal, no fallback.
- On the positive side the flip condition reduces to a constant: `0.98 − meanL < 0.15 − (meanL −
  plateL)` ⟺ **`plateL > 0.83`**. `meanL` cancels. So on *any* plate lighter than 0.83 — which is
  every light-scheme resting plate (measured 0.8079 by probe C2 with a 0.5 ambient; back-solved
  ≈ 0.908 from the live push of −0.1808) — a light ramp is **always** inverted to a dark one, never
  merely nudged. That is why the light-mode bead is mid-mauve for a near-white pick, and it is the
  proximate cause of C-1's chroma loss.

Fold this away with C-1: pinning `bodyLightness` inside the derive makes the "which side, how far,
is there room" question disappear — the derivation gamut-maps at the lightness you asked for.

---

## Negative results (what I checked and could not break)

Stated positively, with the evidence, so a later seat does not re-spend the probes:

- **Backing store / R2 emerge re-measure — SOUND.** `ratio 0.999` at DPR 2 (probe C1); the
  `onEmergeEnd` `pause()`/`resume()` pair (:311-316) does its job. `O-12·5`'s 0.6 floor is clear.
- **The W3-3 idle park does NOT leak.** Probe C5: 0 draws over 2.5 s after the park latency, and
  0 draws through three further park cycles (≈ 16 s idle). The one-way `:paused` binding against a
  producer that also self-`wake()`s on pointer activity looked like a desync waiting to happen — it
  is not reachable, because HeroBlob renders no pointer host (C-7).
- **No timer/listener/observer leak.** `onScopeDispose` (:227-230) clears both timers; the only
  listener is the declarative `@animationend`; `changeTimes` is bounded by its own
  `SCRUB_WINDOW_MS` filter (:270). No rAF loop is owned by this component (no PRM-RAF row here).
- **Accessibility — clean, and it contributes zero defects to the visual REPORT.** The ornament is
  `aria-hidden="true"` + `pointer-events-none` (:10) with no focusable descendant (`hitLayer: false`,
  probe C6). Of the 8 `smallTapTargets` and 1 `namelessButton` the REPORT records on `/#/`, **none**
  belong to HeroBlob — the listed items are the slug input/buttons and the four channel spans
  (`REPORT.json`, `/#/` → `a11y.smallTapTargets`).
- **Edicts 1, 3, 6, 7, 8 — met.** One focused module, no god-module growth, no new shared dir or
  wrapper; `blob-emerge` lives in `demo/color-picker/composables/boot/overture.css` and the seat's
  contact shadow in `demo/picker/seat.css` (moved/tokenized, never deleted); `useTemplateRef` +
  `shallowRef` + `computed` are the idiomatic Vue 3.5 shapes; both type-only imports are
  `import type` (:35, :37) — `verbatimModuleSyntax` clean.

**Hypothesis, not a finding (labelled):** probe C1 measures `cls: 0.0193` on `/#/`, while
`ColorPicker.vue:156` asserts "the blob's footprint is reserved by construction (S.W4-2), so the
deferred mount causes no layout shift". I did not attribute the shift to a source element, so I make
no claim that it is HeroBlob's. It needs a per-shift-source breakdown before anyone acts on it.

---

## Verdict

**DEFECTIVE.** Six MAJOR-or-worse defects with pasted reproductions. The strongest is **C-1**: the
component's central purpose is to make the picked colour flesh, and the ink-floor mechanism it uses
to stay legible destroys 68% of that colour's chroma — measured 0.0890 delivered against 0.2725
picked, with the producer's own shipped `bodyLightness` knob returning the full 0.2725 at the same
body lightness. C-2 and C-13 are the same wound from two other angles (the floor never re-derives;
the floor always over-corrects on a light plate), which is why the cure is one architectural
transposition rather than three patches: **the ink floor belongs inside `deriveBlobPalette` as
`bodyLightness` + `lightnessFloor`, tracked reactively — not as a hand-rolled post-derive L-shift
sampled once per colour change.**

The chronic Q14 row must be **re-stated, not inherited**: LCP on this matrix is 264 ms, not 5141 ms;
what is real and measured is a single 397 ms engine-init task that is 100% of the route's 347 ms
TBT, and it is a producer row.
