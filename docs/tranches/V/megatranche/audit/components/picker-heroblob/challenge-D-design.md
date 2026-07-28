# CHALLENGE-D — `demo/picker/visual/HeroBlob.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** Seventeen findings, three of them BLOCKER-grade. The component's stated purpose —
"the picked colour made flesh" (`HeroBlob.vue:73`) — is **measurably not delivered**: for the
tracked reference seed the rendered bead carries **1.7 %–16 % of the picked chroma** and separates
from its own plate by **ΔL 0.0168 OKLab** where the component's own contract demands **≥ 0.15**.
It buys that failure with **two-thirds of the route's frame rate, permanently, including after it
claims to have parked.**

And a finding for the formation, not the component: **the Q14/CH-4 LCP framing is the wrong gate.**
Over three reps at 4× CPU throttle the median LCP was **928 ms with the blob and 1316 ms without**
— the LCP element is the card plate (`DIV.glass-resting card rounded-card`), which paints long
before the blob mounts. A born-RED gate written as "p75 LCP ≤ 2.5 s" cannot fail on this component
and cannot detect its regression. The blob's real, reproducible cost is **TBT and sustained frame
rate**. Write the gate against those.

---

## 1. Method and provenance

| Instrument | What it produced |
|---|---|
| Tracked Safari matrix | `docs/tranches/V/megatranche/audit/visual/REPORT.json` + `shots/{safari-desktop,safari-mobile}-{light,dark}/picker.png`, `shots/{zoom-200,reduced-motion,forced-colors,rtl}-desktop/picker*.png` |
| Owner mark | `docs/tranches/V/megatranche/audit/visual/owner-marked/OM-6-blob-vibrancy.png` |
| Live Chromium probes (read-only, dev server `:9000`) | `scratchpad/HBD-probe2.mjs`, `HBD-probe3.mjs`, `HBD-probe5.mjs`, `HBD-fc.mjs` → `HBD-{A,B,C,D,E,F,R1..R3}-*.json`, `HBD-geo.json` |
| Pixel analysis | OKLab conversion over the composited PNGs (numpy/PIL), `scipy.ndimage` connected components for `b₀` |
| Producer surface | `node_modules/@mkbabb/glass-ui@7.0.0/dist/components/blob/*.d.ts`, `composables/color/index.d.ts`, `composables/glass/webgpu/rendererStatus.d.ts` |
| Ramp arithmetic | `node -e "import('@mkbabb/glass-ui/color')"` — the exact call HeroBlob makes |

Canon read and applied: `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`,
`PALETTE-CONTRACT.md`, `reformation/CARRY-LEDGER.md` (W48/W54/W55 rows), tag
`v-blob-b0-26-ref-w40` (`ff098c54`, W48's before-frame source, at the pre-W5 path
`demo/@/components/custom/color-picker/`).

Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`, `dev.sh` or any `INBOX.md` was
touched. This report is the only file written.

---

## 2. Visual truth first

### 2.1 The four-matrix read

`docs/tranches/V/megatranche/audit/visual/REPORT.json`, route `/#/`:

| matrix | `canvas` count | consoleErrors | settleMs |
|---|---:|---|---:|
| safari-desktop-**light** | **1** | **`WebGL: context lost.`** | **18905** |
| safari-desktop-dark | 2 | — | 3515 |
| safari-mobile-light | 2 | — | 3317 |
| safari-mobile-dark | 2 | — | 3287 |

Look at `shots/safari-desktop-light/picker.png`. **There is no blob.** The card's top-right is a
blank pink field, and 93.12 px of padding plus a 73.12 px minimum are still reserved for it. The
same route in dark (`shots/safari-desktop-dark/picker.png`) shows the bead. One matrix in four lost
the ornament entirely and the composition has no answer for it — see **D-6**.

Where the bead *does* render, it is a **pearl, not a colour**. `OM-6-blob-vibrancy.png` is the
owner's mark on exactly this; §3 quantifies it.

### 2.2 Density, rhythm, hierarchy

`shots/zoom-200-desktop/picker.png` is the cruellest frame: "Lab" at the top-left, an enormous
empty band, then the numeric headline. Measured live at that arm (720 CSS px @ 2×):
**78.72 px** between the label line-box bottom and the headline top. At 1440: **70.42 px**. The
constitution's ceiling for that interval is `I_after ≤ φG` with `G ≈ 9.2 px` → **≤ 14.87 px**
(`VISUAL-CONSTITUTION.md §3.2`). It is 4.7×–5.3× over. Attribution is split, and I will not
over-charge the blob — see **D-8**.

### 2.3 Optical balance

The bead is flush to the card's top-right corner (`anchor.x == card.x + 399`, `anchor.right ==
card.right == 711`, `anchor.y == card.y == 147.5`). `--blob-seat: 0px`. PROPORTION-AUDIT PR-03's
disposition — "footprint moves one title-gap toward chassis center" — is **not implemented**. The
ornament reads exactly as PR-03 charged it: *timid and corner-bound.*

---

## 3. BLOCKER D-1 — the ornament is achromatic; the ink floor does not exist in the rendered frame

**Claim under test** (`HeroBlob.vue:73–78, 81–93`): "The picked colour made flesh, with the RAMP
CEILING TRACKING THE PICKED C … a C 0.23 pick now derives a C 0.23 ramp"; and
`|ΔL(bead body, card plate)| ≥ INK_FLOOR` with `INK_FLOOR = 0.15`.

**Measured, two independent captures, OKLab over composited pixels:**

| capture | bead mean L | plate mean L | **\|ΔL\|** | bead mean C | plate mean C |
|---|---:|---:|---:|---:|---:|
| live Chromium 1440 light (`HBD-base.png`) | 0.8347 | 0.8515 | **0.0168** | **0.0446** | 0.0695 |
| tracked `safari-mobile-light/picker.png` | 0.8494 | 0.8649 | **0.0156** | **0.0461** | 0.0465 |
| tracked `safari-desktop-dark/picker.png` | 0.9832 | 0.4728 | 0.5103 | **0.0047** | 0.0556 |

The seed is `lab(92% 88.8 20)` = **OKLCH(0.9583, C 0.2724, H 9.8)**.

* Light: **ΔL = 0.0168 = 11.2 % of the 0.15 floor**; the bead is *less chromatic than the plate it
  sits on* (0.0446 vs 0.0695). Luminance contrast ratio bead:plate = **1.00 : 1**.
* Dark: the bead is **C 0.0047 — an achromatic white pearl** for a C 0.272 pick (**1.7 %**).
* Scheme asymmetry **0.0168 vs 0.5103 — 30×**. The treatment was tuned in dark and never re-judged
  in light. That is the whole of OM-6.

**Mechanism, proven by running the component's own call:**

```
$ node --input-type=module -e "const m=await import('@mkbabb/glass-ui/color'); …"
seed {"L":0.9583,"C":0.2724,"h":9.83}
deriveBlobPalette('lab(92% 88.8 20)', {stopCount:4, harmony:'analogous', chromaCeiling:0.2725})
  -> [{L:0.8683,C:0.0879},{L:0.9283,C:0.0388},{L:0.9800,C:0.0097},{L:0.9800,C:0.0099}]
  meanL 0.9392   meanC 0.0366   hex #ffbde0 #ffdde5 #fff6f6 #fff6f4
```

Two of the four stops are **white**. Mean chroma 0.0366 = **13 % of the seed's chroma**. The
derivation is L-driven: it climbs toward the 0.98 clamp and the gamut map strips chroma on the way.
`chromaCeiling` is a *ceiling*, not a target, and it is not the binding constraint.

Then `floorStops` (`HeroBlob.vue:97–111`) runs. With plate L ≈ 0.85: `delta = 0.939 − 0.85 =
0.089 < 0.15`; `headroom = 0.98 − 0.939 = 0.041 < need 0.062` → the flip branch fires →
`push = −0.2377` → stops become L {0.630, 0.690, 0.742, 0.742}. **The floor computes a distinctly
dark ramp — and the rendered bead measures L 0.848.** The renderer's `lit`/Fresnel/SSS surface
re-lights the body straight back to plate lightness and discards the correction.

Both branches are fatal and I do not need to choose between them:

> either the modelled plate L disagrees with the rendered plate (0.8515) so the floor never fires,
> or it fires and the shader discards it. In both branches the **rendered** ΔL is 0.0168.

**Root design error:** an *open-loop* photometric correction, computed against a modelled plate,
applied to a renderer's *input palette*, and never once compared to the renderer's *output*. The
producer exposes `settledFrame` and `settled` (`Blob.vue.d.ts:63–64`) precisely so a consumer can
close that loop. HeroBlob ignores both.

**The cure exists in the shipped producer and is one option object away:**

```
{stopCount:4, harmony:'analogous', chromaCeiling:0.2725}                    -> meanL 0.939 meanC 0.0366
{stopCount:4, harmony:'analogous', chromaCeiling:0.2725, bodyLightness:0.70} -> meanL 0.790 meanC 0.1405
                                                          body stop = L 0.70 / C 0.242  (89 % of seed C)
```

`bodyLightness` is documented in `glass-ui/dist/composables/color/index.d.ts:118–126`: "the body
stop (t=0) anchors at exactly this L … so a consumer picks the body luminance directly (the
deep-body read) without moving the seed hue/chroma."

**Proposed cure (transposition, not patch).** Delete `INK_FLOOR`, `floorStops`, and the
`chromaCeiling` knob. Compute one number — `bodyLightness = plateL ± 0.15`, sign chosen by
headroom — and hand it to the producer's derivation. Then *verify against the rendered frame*: gate
on `settledFrame`'s sampled body pixels, not on the input stops. The palette-shaping logic leaves
the consumer entirely; what stays is one line of intent.

---

## 4. BLOCKER D-2 — a parked blob still costs two-thirds of the route's frame rate

Own self-rescheduling rAF chain, no screenshot perturbation, 20 s, identical page, the only
difference being a route-level abort of `…/demo/picker/visual/HeroBlob.vue`:

| arm | FCP | LCP | **TBT** | long tasks | **idle fps, t ≥ 10 s** |
|---|---:|---:|---:|---|---:|
| HeroBlob mounted, CPU 1× | 372 | 372 | **468 ms** | `[158,170] [1921,518]` | **40.1** |
| HeroBlob blocked, CPU 1× | 368 | 368 | **0 ms** | `[159,166]` | **112.8** |
| HeroBlob mounted, CPU 4× | 1704 | 1704 | **981 ms** | 10 tasks, incl. `[3802,537]` | **33.6** |
| HeroBlob blocked, CPU 4× | 1252 | 1252 | **373 ms** | 8 tasks | **112.3** |
| 3-rep median, CPU 4× | — | 928 / 1316 | **661 / 318 ms** | — | — |

The `t ≥ 10 s` window is **entirely post-park** (§5 proves the park completes at 7.0–8.1 s). A
parked blob still takes the page from **112.8 fps to 40.1 fps — a 64 % loss, forever, on an idle
untouched desktop page with no throttling.** At 4× it is 112.3 → 33.6.

`VISUAL-CONSTITUTION.md §6`: *"Paused, parked and offscreen mean no animation work."* Measured, the
park means **no visible change** (frame hashes freeze) while the work continues. The park is a
freeze-frame, not a suspension.

TBT median **661 ms vs 318 ms** at 4×: the ornament **doubles the picker's total blocking time**.
That is the honest Q14 number and it is the one a gate can hold.

**Proposed cure.** The park must terminate the loop, not the visible delta — that is a producer
conversation (`settled` + a real suspend), and it is the exact GAP-L5 row this component has been
carrying as an "interim" since 5.0.0. Consumer-side the cure is to stop owning a park at all
(see D-10) and to gate the mount on intersection + `settled`, so an ornament that nobody is looking
at holds zero budget.

---

## 5. MAJOR D-3 — motion terminates at 7.0–8.1 s, and there is no pause control: both branches of §6 fail

`VISUAL-CONSTITUTION.md §6`: *"Continuous Aurora/Blob ambient motion terminates within five seconds
**or** exposes one persistent keyboard-operable still/pause control whose state is announced and
remembered."*

Branch 1, measured (SHA-1 of the clipped anchor rect, one sample per second, untouched page):

```
t=4831 85b60ceebf6a   t=5913 4c7ad614cfbb   t=7000 62bf2fff88d4
t=8111 cf6d9faff0f2   t=9177 cf6d9faff0f2   … identical through t=18577
```

Last changing frame **7000 ms**, first frozen frame **8111 ms**. By construction:
`BLOB_IDLE_MS 2000 + SLEEPY_POSE_MS 3300 = 5300 ms` after the last activity
(`HeroBlob.vue:211–212`), and the `immediate: true` scrub watch (`:279`) starts that clock at mount
(~1.8 s). **5.3 s of latency against a 5.0 s ceiling — the source arithmetic alone breaches it, and
the rendered witness is 7.0–8.1 s.**

Branch 2: no control exists. The root is `aria-hidden="true"`, `pointer-events: none`, and
`:paused` is bound **one-way** (`HeroBlob.vue:17`). The producer's own prop doc
(`Blob.vue.d.ts:36–43`) says: *"Declarative WCAG 2.2.2 pause seam. `v-model:paused` … This is the
EXACT shape `<DockBackgroundToggle>` wears — wire its `@update:paused` to this `v-model` and the
blob's animation stops/starts for ALL users."* `DockBackgroundToggle` ships in
`glass-ui/dist/dock.js`. It is not wired.

Every return to the picker re-arms the whole cycle. In-app route swap `/#/` → `/#/browse` → `/#/`
(same document; `performance.now()` continuous at 11998 ms): **14 consecutive distinct frame
hashes over 4 s** — `onActivated` (`:246–250`) calls `noteBlobActivity()` *and* `resume()`, so a
KeepAlive return pays the full unpark tax again.

---

## 6. MAJOR D-4 — the "ramp ceiling tracks the picked C" mechanism is a measured no-op

`HeroBlob.vue:73–78` claims the W6-4 change cured a flat ceiling: *"the flat 0.16 ceiling literally
cannot show the advertised ink — a C 0.23 pick now derives a C 0.23 ramp."*

```
lab(92% 88.8 20)   seedC 0.272 | ceil 0.16 meanC 0.0366 | ceil seedC meanC 0.0366
oklch(0.6 0.2 250) seedC 0.200 | ceil 0.16 meanC 0.1382 | ceil seedC meanC 0.1490
#2b6cb0            seedC 0.126 | ceil 0.16 meanC 0.1214 | ceil seedC meanC 0.1214  (identical)
oklch(0.45 .15 140) seedC 0.150| ceil 0.16 meanC 0.1132 | ceil seedC meanC 0.1132  (identical)
```

For the tracked reference seed the change moves mean chroma by **0.0000**. Its best case across four
seeds is **+7.8 %**, and no seed derives anything close to "a C 0.23 ramp" (max mean C 0.149). The
knob is inert for exactly the class of colour the comment cites. Live code carrying a false
justification is legacy under edict 2, and `Math.max(0.16, seed.C)` at `:124` is dead arithmetic.

---

## 7. MAJOR D-6 — the error / absent state was never designed

`defineAsyncComponent(() => import("./visual/HeroBlob.vue"))` (`ColorPicker.vue:157`) has **no
`errorComponent`, no `loadingComponent`, no `onError`**. HeroBlob subscribes to **none** of the
producer's status channel: `RendererStatus { phase: "initializing" | "ready" | "error", engine:
"webgpu"|"webgl2"|"canvas2d"|"css", adapter, error? }` is emitted as `@rendererStatus`
(`rendererStatus.d.ts:1–8`, `Blob.vue.d.ts:68`) and exposed as a ref.

The consequence is on record, not hypothetical: **safari-desktop-light `/#/` — canvas 1, `WebGL:
context lost.`, settle 18905 ms** (vs 3515 ms in the sibling matrix). The seat renders empty while
its reservations stand. PROPORTION-AUDIT **PR-15** names this exact failure as non-satisfying:
*"Buffer-only alpha, **empty canvas**, card reserve, opacity/z-index cover and second Blob do not
satisfy it."*

Enumerated state coverage:

| state | handled? | evidence |
|---|---|---|
| loading (chunk in flight) | **no** — nothing renders, no reserved skeleton | `ColorPicker.vue:157` |
| chunk load failure | **no** — silent absence | no `errorComponent`/`onError` |
| renderer error / context lost | **no** — silent absence | REPORT.json desktop-light; `@rendererStatus` unheard |
| no-WebGL2 / `canvas2d` / `css` fallback engine | **no** — consumer never reads `engine` | `RendererEngine` union unused |
| populated / live | yes | — |
| parked | partially — freezes visually, keeps burning frames | §4 |
| KeepAlive re-activation | yes, and re-arms the full tax | `:246–250`; §5 |
| prefers-reduced-motion | **yes, correctly** | §11 |
| document hidden | **yes** — 3 rAF in 2 s | `HBD-base.json.hidden` |
| offscreen / scrolled out | **no** — no IntersectionObserver anywhere | grep |
| forced-colors | **no** | D-11 |
| RTL | physically-positioned | D-12 |
| 200 % zoom | reservation binds and worsens the void | D-8 |
| hover/focus/press/disabled/drag/select | N/A by design (`aria-hidden`, `pointer-events:none`) — correct under §5 law 9 | — |

---

## 8. MAJOR D-7 — one ornament, five different sizes, none of them the painted mass

Measured live (`HBD-geo.json`), 1440 desktop:

| quantity | value | source |
|---|---:|---|
| canvas element | **180.19 × 180.19** | producer 1.6× overscan |
| layout footprint (`--blob-fp`) | **112.63** | `seat.css:43` |
| title-row padding reservation | **93.12** | `seat.css:88` |
| title-row min-height reservation | **73.12** | `seat.css:89` |
| **rendered painted body ⌀** | **75.09** | connected-component measure, §12 |

The canvas overhangs the card by **33.78 px on every side** (`canvas.right 744.78` vs
`card.right 711`; `canvas.y 113.72` vs `card.y 147.5`) at `z-index: 20`. At 390 it overhangs the
**viewport** by **17.59 px** — which is precisely the tracked
`"bleeding": ["canvas.goo-blob-canvas"]` row in both mobile matrices of REPORT.json, reproduced in
Chromium. `overflowX` reads 0 only because an ancestor clips it; the ornament's box depends on
somebody else's `overflow: hidden` to avoid minting a scrollbar.

At 390 the footprint is **112 px of a 358 px card = 31.3 %**, and the padding reservation is
**93.12 px of a 327.38 px title row = 28.4 %**. PR-03: *"Blob reserves more than its painted
mass."* Confirmed: 112.63 reserved, 75.09 painted, 180.19 allocated.

---

## 9. MAJOR D-8 — the Blob-derived vertical minimum still exists, and binds at two of three arms

`VISUAL-CONSTITUTION.md §7 (Picker)`: *"no Blob-derived minimum block size enters it."*
PROPORTION-AUDIT §2: *"`seat.css:88` gives `.title-row` a Blob-derived minimum … Both vertical
reservations must die."*

`seat.css:89` at HEAD: `min-height: calc(0.76 * var(--blob-fp) - 0.75rem)` → **73.12 px**.

| arm | title-row height | min-height | label ink height | binding? |
|---|---:|---:|---:|---|
| 1440 | 84.97 | 73.12 | 79.92 | no |
| 720 @2× (200 % zoom) | **73.11** | 73.12 | 59.77 | **yes — 13.3 px pure ornament reservation** |
| 390 | **73.11** | 73.12 | ~59.8 | **yes** |

I will not over-charge the blob for the desktop void: at 1440 the 70.42 px label→headline gap is
*not* caused by the min-height (73.12 < 84.97). Its owner there is the readout box (measured 122.4 px
tall around a 67 px number — 55.4 px of intrinsic slack), i.e. PR-01's *second* named cause,
`readoutReservation.ts`. The blob owns the 390 and 200 %-zoom arms, and owns the
`padding-right: 93.12px` at **all** arms.

Also unimplemented: `--blob-seat: 0px` (`seat.css:47`) — PR-03's "move the footprint toward the
chassis center by exactly one settled P122 title-gap (±0.5 px)" has not happened. And
**`--instrument-title-gap` is defined on zero elements in the live picker** (probe walked every
node): the constitution's `G` — the whole basis of the `I_after ≤ φG` inequality — is not wired at
all, so the law currently has no live referent to measure against.

---

## 10. MAJOR D-9 — the emerge pose and the engine arm are sequenced backwards, and the repair costs 537 ms

The design (`overture.css:167–178`, `HeroBlob.vue:297–316`): mount the engine → animate its
container from `scale(0.35)` → the engine presizes its backing store from a *transformed* gBCR →
the transform never fires the leaf ResizeObserver → the park freezes a 0.35× frame → therefore fire
`pause(); resume()` at `animationend` to force a re-measure.

Three things are wrong with that as *design*:

1. **The order is inverted.** Nothing requires the engine to arm inside a pose that is actively
   lying about its box. Arm it when the seat is settled. That single inversion deletes
   `onEmergeEnd`, the name-filter, the park guard, the pause/resume pair, and the entire
   30-line comment — and it is what CARRY-LEDGER W54 already asks for: *"D-2 blob truthful
   lifecycle; arm-after-critical-paint 0px."*
2. **The repair uses a lifecycle seam as a resize API.** `resume()` is not a re-measure call; the
   comment concedes it (`"resume() re-measures via idempotent resize() on the was-suspended path"`).
   `defineExpose` offers `nudge, setMood, pulse, currentMood, pause, resume, settled, settledFrame,
   rendererStatus` — no resize. Depending on an undocumented side effect of a pause seam is
   contrivance under edict 3.
3. **It is expensive.** At 4× CPU the blob arm shows a **537 ms long task at t = 3802 ms**; the
   reduced-motion arm — where the pose is `no-preference`-wrapped and `onEmergeEnd` therefore never
   fires — shows **no late long task at all** (`[154,799] [1222,405] [1627,55] [1858,482] [2353,67]`,
   all ≤ 2.4 s). *Attribution labelled as strongly-supported inference, not a direct trace: the
   correlation is one arm deep.*

---

## 11. MAJOR D-10 — two idle state machines race, and the "interim" is two majors stale

The producer ships, in 7.0.0:

* `IDLE_SLEEP_MS = 6000` — *"Idle timeout (ms of no pointer) after which the blob drifts to
  `sleepy`"* (`constants.d.ts`)
* `REST_EPS = 0.001` — *"the at-rest epsilon … **the park gate**"*
* `settled` and `settledFrame` exposed refs (`Blob.vue.d.ts:63–64`)

HeroBlob re-implements all of it on the wall clock: `BLOB_IDLE_MS = 2000`, `SLEEPY_POSE_MS = 3300`,
two `setTimeout` handles, a manual `setMood("sleepy")`, and a cross-repo constant contract into
`e2e/smoke/fixtures/blob-timing.ts` ("a one-file edit with four call sites"). Two idle machines with
different constants (2000 vs 6000) both driving the same mood surface.

The file names this itself (`:206–210`): *"The idle-CPU cost of the longer live window is the demo
INTERIM; the producer `settled`/park-from-quiescence seam (GAP-L5, **booked at the 5.0.0 adopt**)
restores the tight park by consulting the engine's quiescence read instead of the wall clock."*
**glass-ui is at 7.0.0 and the seam is exposed.** The interim has outlived its condition by two
major versions, and it is the direct cause of D-3's 5.3 s breach.

Same shape, same file: `INK_FLOOR = 0.15` with *"The producer F9.R1 `lightnessFloor` knob replaces
this at the W7 adopt (BOOKED — the bracket is its sizing spec)"* (`:90–92`).
`BlobColor.lightnessFloor` ships, with the doc *"Bounded to `[0.12, 0.20]` OKLab L by
`LIGHTNESS_FLOOR_BRACKET` and `clampLightnessFloor`; default 0.15"* — the identical bracket and
default. **Three shipped producer seams, three consumer re-implementations, all self-documented as
temporary.** Edicts 2 and 4.

---

## 12. MAJOR D-11 — forced-colors is undesigned

`grep -rn "forced-colors" demo/picker/ demo/color-picker/composables/boot/` → **no matches.**

Captured live in Chromium with `forcedColors: "active"` (`HBD-forced-colors-full.png`; the tracked
`shots/forced-colors-desktop/picker.png` is not a valid witness — WebKit ignores the flag, which is
why that shot still shows full glass): every glass surface correctly flattens to white with black
1 px borders — and the **WebGL bead keeps its full pink 3-D shading, becoming the single most
chromatic and highest-weight object on an otherwise monochrome page.** Canvas content is exempt from
forced-colors by spec, so an ornament that opts into WebGL opts out of the user's palette. Nothing
in the seat says `@media (forced-colors: active) { … }`.

The irony sharpens D-1: forced-colors is the *only* mode where the bead reads chromatically —
because the plate's tint is gone. In every normal mode the plate eats it.

---

## 13. MINOR findings

**D-12 — RTL uses physical properties.** `seat.css:52–53` `top/right: var(--blob-seat)`; `:88`
`padding-right`. `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical
inline/block direction follows the document."* `shots/rtl-desktop/picker-postload.png`: the whole
scene mirrors, the bead does not — it becomes the *leading* element of the header band instead of
its terminal one. It currently looks acceptable only because *both* the anchor and the padding are
physical and happen to agree; fix one without the other and the label runs under the bead.
Correct forms: `inset-inline-end`, `padding-inline-end`.

**D-13 — the ink floor duplicates a shipped producer atom.** Covered in §11; filed separately
because it is a clean deletion independent of the park work.

**D-14 — the catch swallows every error class.** `HeroBlob.vue:118` comments `cssToOklch(css); //
throws iff un-parseable`. Proven false:

```
$ node -e "…cssToOklch('lab(92% 88.8 20 / 82.7%)')"
GlassColorError: cssToOklch: color_non_opaque   { code: 'color_non_opaque', alpha: 0.827 }
```

The bare `catch {}` at `:127` makes "stale ramp" indistinguishable from "correct ramp" and would
absorb a producer regression in complete silence — on the component's only source of colour truth.
(The current wiring is safe: `cssColorOpaque` is `withAlpha(color, 1)`,
`useColorPipeline.ts:104`. The defect is the undiscriminating catch and the wrong comment, not a
live break.)

**D-15 — a breakpoint band arm inside a seat whose law forbids them.** `quality: isLgViewport.value
? appBlobConfig.quality : "half"` (`:177`) via `useBreakpoint("(min-width: 1024px)")`, in a
component whose own sheet declares *"ONE cqi FORMULA at every viewport (no band arms)"*
(`seat.css:14`) and against §3.7's *"No desktop-tight/mobile-airy fork and no breakpoint pile."*
The footprint is container-scaled; the render quality is media-query-scaled. Pick one.

---

## 14. INFO

**D-16 — per-frame allocation inside the drag budget it claims to protect.** `heroConfig`
(`:152–178`) rebuilds four objects (root spread + `geometry` + `surface` + `color`) on every
`heroStops` write, i.e. once per rAF-coalesced colour frame during a scrub — inside the *"12ms drag
headroom (PI-3 — this runs in the exact rAF-coalesced fan-out drag-frame-budget)"* the ink-floor
comment invokes as the reason to avoid an iterative solve.

**D-17 — the file is a ledger, not a component.** 317 lines; ~180 of them comment; **six** distinct
machines (ramp derivation, ink floor, config overlay, idle/park timers, mood bindings, emerge
re-measure, KeepAlive wake) and five watchers/timers, cross-referenced to W6-4 / T-49c / boot-B /
§0.3 / PI-3 / GAP-L5 / D8 / WR-2. Three of those machines are self-declared interims whose
replacements have shipped. This is not a god *module* in the edict-1 sense — it is one component —
but the accumulated-interim shape is what edict 1 exists to prevent, and the cures in §3/§4/§10/§11
delete roughly half the file.

---

## 15. What I could NOT break — the negatives, stated positively

Credibility requires these.

1. **`b₀` is in band.** Composited connected-component measure on
   `safari-desktop-dark/picker.png` (the scheme where the bead separates cleanly), threshold on
   OKLab L, largest component containing the anchor centre, `d_eq = 2√(A/π)`:
   `th 0.60 → 0.6667 · th 0.70 → 0.6638 · th 0.80 → 0.6554` against the 112.63 px layout footprint.
   PR-03/W29's target is `0.66 ± 0.015 = [0.645, 0.675]`. **It passes.** *Caveat: this is a
   composited proxy on one engine; §2.4's protocol demands buffer premultiplied alpha at DPR 1 and 2
   in both WebGPU and WebGL2, and the `.26` baseline (tag `v-blob-b0-26-ref-w40`, `HeroBlob.vue:206`
   `bodyRadius: 0.26` → `bead = 0.52·fp`) grew to `0.325` → `0.65·fp` as a **nominal source knob**,
   which §2.4 explicitly says "cannot substitute for this result". The number is right; the
   provenance is still the forbidden one, and the file admits it at `:158–159`.*
2. **Semantics are correct.** `aria-hidden="true"`, `pointer-events: none` (computed), no
   `pressLabel`, no button, no focus target, no tooltip, no duplicate Copy ownership. Exactly
   PROPORTION-AUDIT §5 law 9 and §7's *"Blob is a noninteractive center-ward specimen."* The route's
   `namelessButtons: 1` is not this component.
3. **Reduced motion is honest.** `reducedMotion: "reduce"` at 4× CPU: **120 fps sustained**, one
   static frame, no emerge, no late long task. The comment at `:52–54` is true.
4. **Hidden documents suspend.** 3 rAF in 2000 ms after `visibilitychange`.
5. **Vue 3.5 and `verbatimModuleSyntax` are clean.** `useTemplateRef`, `shallowRef` for the stops,
   `onScopeDispose` for both timers, no props to destructure, and every type-only import
   (`BlobConfig`, `OklchStop`) is `import type`.
6. **Horizontal overflow is zero** in all four tracked matrices; the canvas bleed is clipped, not
   scrolled.
7. **The LCP framing is wrong, in the component's favour.** 3 reps at 4× CPU: LCP median **928 ms
   with** the blob, **1316 ms without**. CH-4's "p75 LCP ≤ 2.5 s — the ~5 s boot dies or V′ does not
   close" cannot fail on this component. Whatever produced Q14's 5141 ms, it is not reproducible
   against this code path on this substrate, and a wave born RED against LCP would be born
   un-actionable.

---

## 16. Born-RED gate numbers for the wave spec

Every one of these is a **currently-failing measured value**, not a promise. Reference seed
`lab(92% 88.8 20 / 82.7%)` at `/#/`, dev origin `:9000`, matrices as stated.

| # | Gate | Now (measured) | Must be |
|---|---|---|---|
| G1 | rendered \|ΔL(bead body, resting plate)\|, 1440 light | **0.0168** | ≥ 0.12 (bracket floor) |
| G2 | rendered bead mean OKLab C ÷ seed C, light / dark | **0.164 / 0.017** | ≥ 0.50 in both schemes |
| G3 | idle fps at t ≥ 10 s, 1440, CPU 1×, blob mounted vs blocked | **40.1 vs 112.8** | within 10 % of the blocked arm |
| G4 | TBT median of 3, CPU 4×, mounted vs blocked | **661 vs 318 ms** | Δ ≤ 100 ms |
| G5 | ms from last activity to *zero animation work* (not to a frozen frame) | **≥ 5300 by construction; 7000–8111 observed** | ≤ 5000, or a wired `v-model:paused` control |
| G6 | ornament present when `rendererStatus.phase === "error"` | **absent, seat empty** (safari-desktop-light) | a designed, reserved, non-empty state |
| G7 | canvas box overhang past the card / viewport, 390 | **33.6 / 17.59 px** | 0 px |
| G8 | Blob-derived `min-height` binding at 390 and 200 % zoom | **73.12 px, binding** | absent |
| G9 | `@media (forced-colors: active)` rules for the seat | **0** | ≥ 1, ornament suppressed or flattened |
| G10 | physical `right` / `padding-right` in the seat | **2** | 0 (logical) |

---

## 17. The one-paragraph gestalt

HeroBlob is a *consumer* that behaves like an *owner*. It owns a palette-derivation policy, a
photometric correction, an idle state machine, a park scheduler, a re-measure repair, and a
breakpoint quality fork — six policies, three of them self-documented as temporary, all of which
glass-ui 7.0.0 now owns properly (`bodyLightness`, `lightnessFloor`, `settled`/`settledFrame`,
`v-model:paused`, `rendererStatus`, `DockBackgroundToggle`). Every one of those consumer policies
is *open-loop*: it computes against a model of the renderer and never looks at the rendered pixel.
That is why the ink floor can be arithmetically correct and produce a **1.00 : 1** bead, why the
park can be logically correct and cost **64 % of the frame rate**, and why `chromaCeiling` can be
carefully tuned and change **nothing**. The cure is not a set of patches; it is a transposition:
**hand the six policies back to the producer, keep one line of intent per policy, and close every
remaining loop on `settledFrame` — the rendered frame, never the input.** The file that comes out
the other side is about 120 lines and says what the ornament is *for* instead of narrating what it
has survived.
