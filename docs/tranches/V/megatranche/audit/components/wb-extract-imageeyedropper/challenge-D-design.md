# CHALLENGE-D — `ImageEyedropper.vue` — the design is flawed (round 3)

Seat: CHALLENGE-D (design), round 3. Subject
`demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue` (299 lines) plus
`ImageEyedropper/composables/{useImageSampler,useLoupeCanvas,useInertiaGesture}.ts` and
`constants.ts`. Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

Rounds 1 and 2 are preserved verbatim at `./challenge-D-design.r1.md` (22 defects) and
`./challenge-D-design.r2.md` (19 defects, 4 BLOCKER). I took every measurement in this file myself
before reading either; §8 reconciles. **This round is deliberately narrow: it reports what rounds
1–2 did not find.** Where I merely confirm a prior row I say so and add the harder number instead of
re-litigating it.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant). That is
the tier this seat was explicitly spawned with. Declared, not inherited.

## Verdict

**DEFECTIVE.** Sixteen defects this round, **two BLOCKER**, fourteen of them not present in either
prior register.

Rounds 1 and 2 both located the strongest defect in the component's *input law* (the hover/pin modal
collision). I think they stopped one layer short. The strongest defect is the component's **material
decision**, and it is stated as a deliberate choice in the source's own comment:

> `ImageEyedropper.vue:4-7` — "*T.W3-1 (D1 rung-3 CHROME, Q4-defaulted: "eyedropper overlay stays
> chrome"): a TRUE floating overlay over live image content — the producer floating rung replaces the
> hand-minted bg-card/75 glass*"

`VISUAL-CONSTITUTION.md:15` says that is the wrong rung, by name:

| Tier | Role | Rule |
|---|---|---|
| Structural glass | dock, header, primary plate | neutral Clear-Ice/Smoke family; real glass-ui resting/**floating** tiers |
| **Instrument veil** | **controls genuinely over live color** | **denser neutral veil with named alpha/clarity levers; no drop shadow** |
| Specimen well | image, curve, palette or code artifact | **opaque**/quiet neutral stage; the specimen supplies color |

An eyedropper is the canonical instance of "controls genuinely over live color". It took the
Structural-glass rung instead. Measured consequence (§2.1): the overlay resolves to
`background-color: oklab(… / 0.808)` — 19.2 % transparent — with
`backdrop-filter: blur(11px) **saturate(1.6)**` and a drop shadow. So a colour instrument paints a
**60 %-oversaturated, 11 px-blurred** rendition of whatever is behind it, and what is behind it is
*the same photograph it is sampling*. The letterbox bands around the stage therefore show a phantom,
falsely-saturated duplicate of the specimen (`shots/D-03-…png` — the ghost quadrants above the real
ones). That is a category error, not a polish item: the one surface in the product that must never
alter a colour is the one wearing a saturation filter.

Everything else in the register — the readout that measures **3.95 : 1** against an image-derived
ground, the pinned/unpinned states that collapse to identical pixels in forced colors, the
confirmation animation that fires exactly once per session — is downstream of the same habit: states
and materials chosen from the chrome vocabulary rather than from the instrument's job.

---

## 1. How the evidence was taken

Read-only drive of the live dev server `http://localhost:9000` with Playwright 1.60.0 (`node -e
"require('playwright/package.json').version"` → `1.60.0`), Chromium at `deviceScaleFactor: 2` and
WebKit under `devices["iPhone 13"]`. Fixture: a 64 × 64 PNG of four flat quadrants
(red / green / blue / white), `shots/D-00-fixture-quad64.png` — chosen because every source texel is
one of exactly four colours, so any fifth colour on screen is fabricated by the renderer.

Driver script preserved at `./probe-CHD-p2.mjs`. Route: `/#/extract` → `input[type=file]`
`setInputFiles` → click the preview `<img>` (the only opener) → the overlay mounts. Screenshots
copied to `./shots/`. Pixel arithmetic on the captured PNGs with Pillow. No source file was modified;
this seat writes only under its own directory.

Prior-art coverage check, repeated and confirmed: the mega-tranche visual audit has **no rendered
frame of this component in any state**. `/#/extract` appears in the four Safari route matrices only
empty, and is absent from all five state matrices —
`ls docs/tranches/V/megatranche/audit/visual/shots/zoom-200-desktop/` →
`adminusers.png blob.png browse.png gradient.png picker.png`. (r2 D-19; restated because this round's
findings D3-04/06/07 all live in exactly those uncaptured matrices.)

---

## 2. Visual truth

### 2.1 The material is the wrong tier — measured

Computed style of the overlay root (`ImageEyedropper.vue:8`), Chromium 1440 × 900 @2×, light:

```
OVERLAY: {"zIndex":"130",
 "bg":"oklab(0.936403 0.00557132 0.0133027 / 0.808)",
 "backdrop":"blur(11px) saturate(1.6)",
 "shadow":"oklab(0.999994 …/0.3) 0px 1px 0px 0px inset, oklab(…/0.18) -1px 0px 0px 0px inset, color(…",
 "border":"1px solid oklab(0.216128 0.00350075 0.00518669 / 0.05)","radius":"12px"}
```

Three independent breaches of the `VISUAL-CONSTITUTION.md:15` Instrument-veil row in one declaration:

1. **`alpha 0.808`** — the row demands a *denser* veil with *named alpha/clarity levers*. There is no
   lever; the alpha is inherited from `glass-floating`.
2. **`saturate(1.6)`** — the row demands a *neutral* veil. A 1.6× saturation multiplier is the
   opposite of neutral, and in a colour instrument it is actively adversarial.
3. **a drop shadow** — the row says *no drop shadow*. `glass-floating` ships `--shadow-glass-floating`
   and the loupe adds its own `box-shadow: 0 4px 16px …` (`ImageEyedropper.vue:266`).

And `VISUAL-CONSTITUTION.md:19`: "**One surface has one tier.**" This single `glass-floating` surface
is simultaneously the chrome bar (Instrument veil) and the image stage (Specimen well, which the
table requires to be **opaque**). Two tiers, one surface.

The bleed is not theoretical. Sampling `shots/D-02-desktop-pinned.png` (2880 × 1800, dpr 2) across the
chrome bar at device y = 442 — i.e. the strip directly behind the readout text:

```
cssx=280: (239,183,177)   cssx=340: (112,89,66)  <- the readout glyph itself
cssx=400: (244,187,181)   cssx=470: (195,236,181)
cssx=520: (195,236,181)   cssx=600: (195,236,181)
```

`(244,187,181)` and `(195,236,181)` are the fixture's own red and green top quadrants, seen through
the veil from the `ImageDropZone` `<img>` underneath. **The eyedropper's chrome bar is wearing a
picture.** Same story in the letterbox band above the canvas (device y = 560: `(244,187,181)` →
`(195,236,181)` at the same x positions) and below it (device y = 1690: `(237,225,217)`,
`(223,232,206)` — that one is the `ShadowPalette` ghost dots showing through).

**Contrast consequence.** The readout ink is `rgb(112,89,66)` at `16.4px` Fira Code (measured), i.e.
normal-size text. WCAG 2.x ratios against the grounds actually measured above:

| ground | measured | AA 4.5 : 1 |
|---|---:|---|
| bleed-red half of the bar `(244,187,181)` | **3.95 : 1** | **FAIL** |
| bleed-green half `(195,236,181)` | 5.00 : 1 | pass |
| the card surface with no image behind `(244,229,224)` | 5.36 : 1 | pass |

The *same glyph* passes or fails depending on what the user uploaded. `VISUAL-CONSTITUTION.md:82`:
"Text, focus, boundaries and state meet their **rendered** contrast on the actual material tier; a
token name is not evidence." A ground supplied by arbitrary user photography is not a material tier
at all. (r2's D-08 measured 4.07 : 1 on its own fixture and named it "unbounded ground"; I confirm
the family and add the tier law and the saturation mechanism, which is the *cause*.)

### 2.2 Mobile, one tap — `shots/D-03-mobile-first-tap-blank-loupe-ghost-image.png`

iPhone 13 / WebKit. This is the most damaging single frame in the set and I want to name what is in
it in design terms:

- **The specimen appears twice, stacked and misaligned.** The upper ~40 % of the overlay is the
  ghosted, `saturate(1.6)`d preview `<img>` seen through the veil; immediately below it the same
  image at full strength on the canvas. The instrument shows a phantom duplicate of its own subject.
  A user cannot know which one is authoritative. Nothing in the component's design distinguishes
  them, because the letterbox is not designed at all — it is whatever the veil lets through.
- **The loupe is an empty ring.** `loupeInk: 0` of `12100` pixels (§3.1). The magnifier — the entire
  reason a mobile eyedropper exists, since the finger occludes the target — paints nothing.
- **The loupe is centred on the tap point.** Measured `loupe: {x:217, y:378, w:110, h:110}` for a tap
  whose coordinate is the circle's exact centre. A 110 px circle centred under a fingertip is
  invisible by construction, and no offset/flip rule exists.
- **The readout is `lab(54.2905…`** — five significant digits of a twelve-decimal value, truncated
  with no `title` and no wrap (measured `readoutTitle: null` in every matrix). At 390 px the
  instrument's only output is unreadable.

### 2.3 The stage displays colours it cannot sample — measured ramp

`.eyedropper-canvas` computes `image-rendering: auto` (measured, all matrices including 200 % zoom),
while the canvas backing store is the source bitmap (`canvasAttrW/H: 64 / 64`) painted at
`scale(7.9375)`. The loupe, by contrast, sets `imageSmoothingEnabled = false`
(`useLoupeCanvas.ts:40`). The component therefore holds **two contradictory resampling laws for the
same pixels**, and the one the user aims with is the wrong one.

Horizontal scan of `shots/D-02-desktop-pinned.png` across the red|green boundary — one source texel
wide in the fixture, therefore a step function in truth:

```
devx=902 (cssx=451.0): (255,0,0)
devx=904 (cssx=452.0): (223,31,0)
devx=906 (cssx=453.0): (191,63,0)
devx=908 (cssx=454.0): (159,95,0)
devx=910 (cssx=455.0): (127,127,0)
devx=912 (cssx=456.0): (95,159,0)
devx=914 (cssx=457.0): (63,191,0)
devx=916 (cssx=458.0): (31,223,0)
devx=918 (cssx=459.0): (0,255,0)
```

Seven fabricated colours across an 8-CSS-px ramp, **none of which exist in the source image**. Same
ramp vertically across red|blue (`(223,0,31) … (31,0,223)`).

The design consequence: at `cssx = 455` the user sees olive `(127,127,0)`, aims at it, clicks, and
`viewportToImage` returns `floor((455−201)/7.9375) = 32` → the *green* texel → `#00ff00`. **The
display advertises a colour the instrument is physically incapable of returning, and the discrepancy
grows linearly with zoom** (10× max ⇒ a 10 px lie band around every edge in the photograph). An
eyedropper whose stage cannot be aimed at is not an eyedropper. (r2 D-13 asserted this mechanism; the
ramp is my contribution — it converts a code reading into a measured lie.)

### 2.4 200 % zoom + forced colors — `shots/D-04-zoom200-forced-colors.png`

Chromium 720 × 450 @2× (= a 1440 × 900 window at 200 % page zoom), `forcedColors: active`,
`reducedMotion: reduce`. Measured stage: `viewport box {x:106, y:236.98, w:508, h:238}`, transform
`translate(135px, 0px) scale(3.71875)` ⇒ the image renders 238 × 238 inside a 508 × 238 stage.

- **53 % of the stage is empty.** `1 − (238·238)/(508·238) = 0.531`. The instrument has one layout —
  a full-width top bar over a full-bleed stage — and no response to a short-wide stage. At 200 % zoom
  the protagonist occupies under half of its own well. `PROPORTION-AUDIT.md §5.3` ("Renderer, icon or
  touch footprints may reserve collision space only on the axis where collision exists") and PR-10
  ("form acreage exceeds preview") both bite.
- **The loupe does not scale with the stage.** `LOUPE_SIZE = 110` is a hard CSS-px constant
  (`constants.ts:8`). At 238 px stage height that is **46.2 % of the stage** — visible in the frame as
  a giant flat red ball that occludes the very region it claims to magnify, with no seam and no
  reticle to distinguish loupe content from image content. `PROPORTION-AUDIT.md §5.8`: "Real rendered
  relation wins over token intent." A fixed-px ornament inside a container-scaled stage has no
  relation at all.
- **Forced colors erases the state distinction** (§3.4). It also leaves the three actions as bare
  black glyphs with no seat, border or focus ring — the only controls on the frame with no visible
  affordance boundary, next to a Dock tab that renders a proper box.
- Honest negatives from this matrix: `docOverflowX: 0`; the panel goes properly opaque white with a
  1 px system border; `canvasTransition` is neutralised by the global PRM guard.

---

## 3. State coverage

Enumerated states and their status. Rows marked **NEW** are absent from both prior registers.

| state | handled? | evidence |
|---|---|---|
| loading (image decoding) | **NO** | `loadAndFit()` awaits with no pending UI; overlay mounts empty (r2 D-15) |
| decode error | **NO** | `img.onerror = reject` (`useImageSampler.ts:74`), `loadAndFit` has no `catch` → unhandled rejection + a permanently blank stage (r2 D-15) |
| empty / not-yet-sampled | yes | ghost `WatercolorDot` + "Tap to sample" |
| populated | partial | readout truncates always (r2 D-07) |
| **first sample (loupe)** | **NO** | `loupeInk: 0` — §3.1 |
| **repeat commit (Add / Apply)** | **NO — NEW** | §3.2, the pulse fires once per session and never again |
| **pinned, then transform changed** | **NO — NEW** | §3.3, the readout and loupe go stale and lie |
| **pinned vs unpinned in forced colors** | **NO — NEW** | §3.4, pixel-identical |
| hover | desktop only | no hover exists on touch; the opener's "sample" hint is `opacity-0 group-hover:` (`ImageDropZone.vue:57`) — a hover-only affordance, PR-07 |
| focus / focus-visible | **NO** | nothing in the overlay is reachable except the close button; §3.5 |
| disabled | n/a | no disabled path exists |
| dragging (pan) | yes | but it poisons the next tap — §3.3 |
| overflow / truncation | **NO** | §2.2 |
| RTL | **NO** | r2 D-05 (444 px displacement) — not re-tested here, accepted |
| reduced motion | yes (motion), **NO (state)** | §3.2 corrects r2's N-4 |
| forced colors | **NO** | §3.4 |
| 200 % zoom | **NO** | §2.4 |

### 3.1 The loupe's first paint is always empty; on touch, every paint is empty

`useLoupeCanvas.ts:55-60` sets `loupeVisible.value = true` and then calls `drawLoupe(rx, ry)`
**synchronously**, but the loupe canvas is behind `v-if="loupe.loupeVisible.value"`
(`ImageEyedropper.vue:79`). Vue has not flushed; `loupeCanvasRef.value` is `null`; line 30 returns.
Desktop recovers on the next `pointermove`. Touch produces no `pointermove` without a button, and
`onHover` bails while pinned (`ImageEyedropper.vue:165`), so touch never gets a second draw — and
`hideLoupe()` unmounts the canvas again on every unpin, so the race re-arms.

Measured, counting non-transparent pixels in the loupe canvas:

```
A| hover RED (.30,.35)  => {"loupeVisible":true,"loupeInk":0,   …}
A| hover RED nudge      => {"loupeVisible":true,"loupeInk":9683,…}

B| after FIRST touch tap => {"pinned":true,"loupeVisible":true,"loupeInk":0,…}
B| 3rd tap               => {"pinned":true,"loupeVisible":true,"loupeInk":0,…}
```

Confirms r1 D-3 / r2 D-01. Added: the ink counts for both the desktop first-frame and the touch
steady state, and the `hideLoupe` re-arm that makes it permanent rather than first-time-only.

### 3.2 NEW · the confirmation animation fires exactly once per session

`ImageEyedropper.vue:18-23` binds `@animationend="swatchPulse = false"` to `<WatercolorDot>`.
glass-ui 7.0.0's `WatercolorDot` declares `inheritAttrs: !1` and consumes **only** `class` and
`style` from `useAttrs`:

```
node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js:82  inheritAttrs: !1,
…  setup(e) { let t = e, n = h(), c = i(() => n.class), f = i(() => n.style), …
```

With `inheritAttrs: false` and no `v-bind="$attrs"`, the `onAnimationend` listener is never attached
to any element. `swatchPulse` is set to `true` and can never return to `false`. Measured:

```
A| ADD#1              => "swatchClass":"shrink-0 transition-transform swatch-pulse watercolor-swatch"
A| 1.65s after ADD#1  => "swatchClass":"shrink-0 transition-transform swatch-pulse watercolor-swatch"
A| ADD#2              => "swatchClass":"shrink-0 transition-transform swatch-pulse watercolor-swatch"
```

The animation is `0.65s … forwards` (`ImageEyedropper.vue:288`), so 1.65 s later it is long finished
and the class is still on. Design consequences:

- The **only** feedback for the component's **only** two commit actions (Add to palette, Apply as
  current colour) is one-shot. Every subsequent commit in the session is silent. Neither action
  closes the overlay, changes the readout, or alters anything else — so after the first add the user
  has no way to tell whether a click registered.
- `:class="[… swatchPulse ? 'swatch-pulse' : 'w-7 h-7']"` means the swatch permanently sizes from
  `.swatch-pulse { width: 1.75rem; height: 1.75rem }` instead of the utility. Two sources of truth for
  one dimension (r2 D-16), now permanently resolved to the wrong one.
- This **narrows r2's N-4**. PRM is honoured for the *motion* (`swatch-pop` measured at `0.00001s`
  under `reducedMotion: reduce`), but the state machine that owns the motion is broken independently
  of PRM. "No motion defect here" was right; "no defect here" would not have been.

`PROPORTION-AUDIT.md §5.6`: "Add affordance when the surviving action/state is otherwise
undiscoverable." A commit whose result is invisible after the first use is exactly that.

### 3.3 NEW · a pinned sample lies as soon as the transform moves

`drawLoupe` is called only from `showLoupeAt`, which is called only from `onTap` / `onHover`
(`ImageEyedropper.vue:160, 170`). There is **no watcher on `panX` / `panY` / `zoom`**. So while
pinned, wheel and trackpad zoom — which never emit `pointerdown` and therefore never trip the unpin
handler at line 178 — move the image underneath a stationary reticle while the reticle's content and
the readout stay frozen. Measured:

```
A| TAP GREEN again           => {"readout":"lab(87.818534365028% -79.27106","pinned":true,
                                 "loupeInk":9683,"transform":"translate(65px, 0px) scale(5.90625)"}
A| WHEEL ctrl-zoom while pinned
                             => {"readout":"lab(87.818534365028% -79.27106","pinned":true,
                                 "loupeInk":9683,"transform":"translate(53.66px, -10.0088px) scale(6.26063)"}
```

Same reticle position, same reported value, **different transform**. Source pixel under the reticle
centre before: `floor((381−65)/5.90625) = 53`. After: `floor((381−53.66)/6.26063) = 52`. The
instrument now points at texel 52 and reports texel 53. On the flat fixture those happen to share a
colour; on a photograph they do not. The pinned state is presented as a *commitment* — it grows two
commit buttons — and it is the state in which the component is least truthful.

Related, same family, sharper than r2's D-02: the unpin flag survives a pan. `justUnpinned` is set on
every `pointerdown` while pinned (line 182) but consumed only inside `onTap` (line 152). A drag never
reaches `onTap` (`didMove` is true), so the flag is left `true` and **swallows the next clean tap**:

```
A| DRAG-pan while pinned          => {"pinned":false,"actionBtns":1,…}
A| TAP GREEN (.75,.35) after pan  => {"pinned":false,"actionBtns":1,…}   <- swallowed
A| TAP GREEN again                => {"pinned":true, "actionBtns":3,…}
```

The readout *does* update on the swallowed tap (hover already moved it), so the user gets partial
feedback that implies success while the commit affordances never appear. That is worse than a dead
click.

### 3.4 NEW · pinned and unpinned are pixel-identical under forced colors

The only differentiators between "tracking" and "pinned/committed" are `border-color: var(--primary)`
and a `box-shadow` ring (`ImageEyedropper.vue:273-276`). Both are erased by forced colors. Measured,
both states in one run:

```
FORCED-COLORS unpinned loupe: {"pinnedClass":false,"borderColor":"rgb(0, 0, 0)","borderWidth":"2px","boxShadow":"none","outline":"none rgb(0, 0, 0)"}
FORCED-COLORS   pinned loupe: {"pinnedClass":true, "borderColor":"rgb(0, 0, 0)","borderWidth":"2px","boxShadow":"none","outline":"none rgb(0, 0, 0)"}
```

Identical in every property. `VISUAL-CONSTITUTION.md:83`: "Selected, failed, pending, withdrawn and
disabled states are **never color-only**." And `:84`: "Focus remains visibly distinct from selection
in both schemes, **forced colors** and reduced transparency." Pinned is colour-only, and it vanishes.

Even in normal colour the state is unsafe: `--primary` renders as a dark olive-green ring
(`shots/D-02-desktop-pinned.png`), which computes to **1.52 : 1** against the red field it sits on;
the unpinned ring — `2px solid color(srgb 0.11 0.098 0.09 / 0.5)` (measured) — is **1.73 : 1** against
a blue field. Both are far below the 3 : 1 floor for a non-text boundary, and both are computed
against *user photography*, so neither can be guaranteed at all. A brand hue is the one colour a
colour instrument must not use as a state marker: sample a green pixel and the pinned ring disappears
into its own reading.

### 3.5 Keyboard: the capability is unreachable end to end

r1/r2 established that there is no keyboard *sampling* path. I add the entry and the exit, which are
dead by explicit construction:

- **Entry.** The eyedropper's only opener is `@click` on `<ImageDropZone>`
  (`ExtractWorkbench.vue:25`). `ImageDropZone.vue:19-22` sets
  `:tabindex="disableClick ? -1 : 0"` and gates
  `@keydown.enter.space.prevent="!disableClick && openFilePicker()"`. `disableClick` is
  `!!session.previewDataUrl` (`ExtractWorkbench.vue:22`) — i.e. **exactly when the eyedropper becomes
  openable, the control leaves the tab order and loses its key handler.** There is no keyboard path
  to open this component at all. `aria-label` still promises "Image preview area, tap to sample
  colors" to a control that cannot be focused.
- **Occupancy.** Measured with the overlay open: `{"total":20,"inOverlay":1,"behindOverlay":[…19
  controls…]}` — "Number of colors", "Upload image", "Open camera", "Chroma weight", "Reset",
  "Palette menu", the dock, the search field. The overlay has `role: null`, `aria-modal: null`, no
  title, no description, takes no focus on open and restores none on close. `VISUAL-CONSTITUTION.md
  §5.1` names the contract it breaks verbatim: "Dialog/Drawer/Popover open and close | producer
  initial-focus rule on open; **exact connected opener on close** … | overlay title/description/state
  on open". (Confirms r2 D-04; the opener half is new, and it is worse — there *is* no connected
  opener to restore to.) The `Escape` handler is a bare `window` listener
  (`ImageEyedropper.vue:239`), so it also fires from any focused control behind the overlay.
- **Canon.** `VISUAL-CONSTITUTION.md:198` — "Extract … **Eyedropper and sampler have
  keyboard/numeric alternatives.**" And `:126`, the §5.2 axis table, legislates an eyedropper this
  component does not have:

  > *image sampler coordinates* | Right/Left increase/decrease source-image `x`; Down/Up …
  > | **named x/y controls own Home=min and End=max; reticle, loupe and numeric value remain one
  > model**

  Zero of it exists: no named axes, no Home/End, **no reticle at all** (`useLoupeCanvas.ts:27-53`
  draws the magnified region and nothing else — no crosshair, no centre cell, no marker). The canon
  presumes a reticle; §2.4 shows what its absence costs. `PROPORTION-AUDIT.md §5.5` — "A small
  icon/mark is either data, status, labeled action, drag affordance, focus/selection register or
  removed" — the loupe is currently none of those: an unlabelled ring that magnifies without saying
  where.

---

## 4. Motion

Sound, with one correction and one gap:

- **Sound.** The tracked-canvas transition `transform var(--duration-fast) var(--ease-decelerate)`
  (`ImageEyedropper.vue:255`) is a tokenized transform — compositor-only, no layout property — and is
  the row `demo/DESIGN.md:255` explicitly rules `KEEP, do not retime`. The global PRM guard reaches
  it: measured `canvasTransition` under `reducedMotion: reduce` becomes
  `"opacity, color, background-color, border-color, box-shadow 0.1s"`, i.e. `transform` is dropped.
  `swatch-pop`'s bespoke `0.65s` literal is registered at `demo/DESIGN.md:265`. `useInertiaGesture`
  owns an explicit PRM branch (`useInertiaGesture.ts:131-142`) and rides glass-ui `useRAFLoop` with
  `pauseWhenHidden`. No animation was deleted; the scoped keyframe correctly stays scoped.
- **Correction to r2 N-4** — §3.2. The motion is gated; the state that owns it is not.
- **NEW gap.** `gestureActive` is set only by `pointerdown`/`pointerup`
  (`useInertiaGesture.ts:175, 271`). Wheel and trackpad zoom never set it, so `.no-transition`
  (`ImageEyedropper.vue:72`) is not applied and **every wheel tick animates the transform over 200 ms**
  — a continuous trackpad scroll therefore chases a moving target, and the pixel under the cursor is
  in flight while `sampleAt` reads the committed transform. The one input path where the gesture is
  continuous and unbuffered is the one path the gesture gate does not cover.

---

## 5. The design-system boundary

- **NEW · `DockSeparator` renders 1 × 0 px.** Measured with the overlay open:
  `"sepPresent":true,"sepTag":"DIV","sepClass":"dock-separator","sepRect":{"x":267,"y":221.69,"width":1,"height":0}`.
  It is a dock-scoped primitive (`@mkbabb/glass-ui/dock`) drawing its height from a dock row context
  that does not exist here, so it collapses to nothing. Dead chrome in the DOM.
  `PROPORTION-AUDIT.md` PR-05 (`REMOVE`) and `OPTICAL-BENCH-COMPOSITIONS.md §5` (boundaries `[]`) both
  say a divider here is wrong even if it *did* render; that it renders as a zero-height ghost is the
  design system quietly telling the consumer it is out of scope.
- **`DockControl` outside the dock — partially innocent, and I want that on the record.** Measured
  `getPropertyValue("--dock-control-size")` → `""` (undefined) at this site, so the dock density
  contract is not in force. But the hit cells still land correctly: 40 × 40 on fine pointers and
  **44 × 44 × 3 on coarse** (`{"pointerCoarse":true,"btns":[{"Close eyedropper",44,44},{"Add to
  palette",44,44},{"Apply as current color",44,44}]}`). The tap-target floor is met. The vocabulary
  borrowing is a smell, not a defect.
- **Per-instance override.** `.eyedropper-action-btn:hover:not(:disabled) svg { color:
  var(--hover-color …); transform: scale(1.2) }` (`ImageEyedropper.vue:279-282`) reaches inside a
  producer control to restyle its glyph (confirms r2 D-09). Design point r2 did not make: the tint is
  applied to **all** controls in the bar including **Close** — an action that has nothing to do with
  the sampled colour wears the sampled colour — and the value is arbitrary user photography with no
  legibility floor, so hovering Close after sampling a near-white pixel makes the `×` vanish.
- **Inline token pin.** `style="--vj-enter-y: 0px"` (`ImageEyedropper.vue:8`) is a raw per-instance
  style attribute for something the codebase already expresses as a named recipe —
  `demo/styles/utils.css:174` (`.swatch-row { --vj-enter-y: 0px }`) and
  `CurrentPaletteEditor.vue:297` both do it in CSS. Root-level-styling edict, minor.
- **Dead prop.** `tag="div"` on the ghost `WatercolorDot` (`ImageEyedropper.vue:29`): glass-ui 7.0.0's
  `WatercolorDot.vue.d.ts` has no `tag` prop, and `inheritAttrs: !1` means it is not even emitted as
  an attribute — measured `dotHasTagAttr: false`. Confirms r2 D-14. Canon addendum r2 did not cite:
  `DECISIONS.md` B-25 and `VISUAL-CONSTITUTION.md:91` name **eyedropper** as one of the execution
  sites where the `tag=` branch dies. The call site still speaks the retired API.
- **Dead export.** `useLoupeCanvas` returns `drawLoupe` (line 71); no consumer references it. It is
  the exact hook §3.3's missing transform-watcher would use, exposed and unused.

---

## 6. Proportion and seat law

Judged against `PROPORTION-AUDIT.md` and `VISUAL-CONSTITUTION.md`:

| law | verdict |
|---|---|
| VC §2 material hierarchy (`:15`) | **FAIL ×3** — §2.1 |
| VC §2 "one surface has one tier" (`:19`) | **FAIL** — chrome bar + specimen well on one `glass-floating` root |
| VC §4.1 rendered contrast (`:82`) | **FAIL** — 3.95 : 1 readout; 1.52 : 1 and 1.73 : 1 loupe boundaries |
| VC §4.1 states never colour-only (`:83`) | **FAIL** — §3.4 |
| VC §4.1 focus distinct in forced colors (`:84`) | **FAIL** — no focus state exists |
| VC §5.1 overlay focus/name contract | **FAIL** — §3.5 |
| VC §5.2 image-sampler axes (`:126`) | **FAIL** — no axes, no Home/End, no reticle |
| VC §198 "Eyedropper … keyboard/numeric alternatives" | **FAIL** — §3.5 |
| PR-05 dividers `REMOVE` | **FAIL** — a 1 × 0 px `DockSeparator`; plus three nested boundaries (card radius, panel radius, hard canvas rect) |
| PR-07 hover-only / unlabelled controls | **FAIL** — hover-only sampling *and* a hover-only `opacity-0` "sample" hint on the opener |
| PR-10 form acreage exceeds preview | **FAIL** — 53 % empty stage at 200 % |
| PA §5.5 every small mark has a job | **FAIL** — the loupe is an unlabelled ring; the reticle it needs is absent |
| PA §5.8 real rendered relation > token intent | **FAIL** — `LOUPE_SIZE = 110` fixed px = 46 % of a container-scaled stage |
| PA §5.13 type role matrix | **pass** — `text-mono-small` Fira for a value readout is the correct role |
| PA §5.7 target floor without bloated chrome | **pass** — 44 × 44 on coarse, 16 px glyphs |

---

## 7. Negative proofs — what this round verified as sound

- **N-1 · Tap targets on coarse pointers — SOUND.** 44 × 44 × 3, measured (§5).
- **N-2 · `prefers-reduced-motion` for motion — SOUND.** `transform` dropped from the canvas
  transition under PRM (measured); `swatch-pop` neutralised; `useInertiaGesture` owns an explicit PRM
  branch. Scope narrowed by §3.2, not overturned.
- **N-3 · Horizontal overflow — CLEAN.** `docOverflowX: 0` at 100 % and at 200 % zoom. No page errors
  in any run; the only console error is the known dev-config `MISCONFIGURED` banner (owner mark OM-5).
- **N-4 · `--z-controls` — DEFINED, not a dangling token.** I suspected a dead custom property at
  `ImageEyedropper.vue:268`; it resolves —
  `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css` ships `--z-controls: 20`, and
  `demo/DESIGN.md:302` documents the idiom. Hypothesis withdrawn.
- **N-5 · The swatch's AT semantics — CORRECT.** glass-ui 7 renders the dot as
  `<span aria-hidden="true" … pointer-events:none>` with `forced-color-adjust: none` (measured
  `swatchForcedAdjust: "none"`, `swatchBg: rgb(255,0,0)`), so the specimen survives forced colors
  while the text carries the value. That is exactly `DECISIONS.md` B-25.
- **N-6 · Module hygiene — SOUND.** Not a god module: 299 lines, three focused composables with real
  dependency injection. `verbatimModuleSyntax` respected (`import { useImageSampler, type
  DisplayColorSpace }`, `import type { SpaceId }`). No back-compat shims, no wrapper dirs, no new
  `shared/`. `useTemplateRef` used idiomatically; reactive props destructure used at line 103.
- **N-7 · Object URLs and canvas taint — INNOCENT**, as r2's N-1/N-2 established; re-confirmed
  `grep -rn "createObjectURL" demo` → only `palettes/export.ts:88,126`, each revoked. Measured canvas
  footprint on this fixture is trivial (`[{300,150},{64,64},{110,110}]` ≈ 0.24 MB) — the
  full-resolution-duplicate concern is a real *hypothesis* for large photographs (§9 D3-16) but I did
  not reproduce it and label it as such.

---

## 8. Reconciliation with rounds 1 and 2

**Confirmed, with harder numbers:** r2 D-01 (blank loupe — §3.1 ink counts + the `hideLoupe` re-arm),
D-03 (no keyboard — §3.5 adds the dead opener), D-04 (non-modal — measured 19 focusables behind),
D-07 (truncated readout), D-08 (contrast — §2.1 supplies the *cause* and the tier law), D-09
(per-instance override — adds the Close-button semantics), D-12 (loupe DPR / no reticle — §2.4 adds
the proportion arm), D-13 (`image-rendering` — §2.3 supplies the measured ramp), D-14 (`tag` prop —
adds the B-25 citation), D-15 (absent states), D-16 (duplicated constants — §3.2 shows the duplicate
now wins permanently), D-19 (evidence gap).

**Sharpened:** r2 D-02 (two-click sampling). §3.3 isolates a *distinct* mechanism inside that family
— the drag path leaves `justUnpinned` set — with a transcript.

**Narrowed:** r2 N-4 ("PRM honoured, no motion defect here") is correct about motion and incomplete
about state (§3.2).

**Not re-tested, accepted from r2:** D-05 (RTL 444 px displacement), D-06 (stage off-fold), D-10
(occludes the golden Extract composition), D-11 (commits bound to pin mode), D-17 (`title`-only
names), D-18 (`will-change`).

**New this round:** D3-01 … D3-15 below, minus the two rows explicitly marked as sharpenings.

---

## 9. Defect register

| id | sev | defect | mechanism |
|---|---|---|---|
| D3-01 | BLOCKER | the colour instrument wears a `saturate(1.6)` / `alpha 0.808` / drop-shadowed veil from the wrong material tier; the specimen bleeds through as an oversaturated phantom duplicate and the readout ground becomes user photography (3.95 : 1) | wrong material tier |
| D3-02 | BLOCKER | the only feedback for the only two commit actions fires exactly once per session and never resets | listener dropped under `inheritAttrs:false` |
| D3-03 | MAJOR | a pinned sample keeps reporting its old value and old magnification after wheel/trackpad zoom moves the image under the reticle | no transform watcher |
| D3-04 | MAJOR | pinned and unpinned are pixel-identical under forced colors | colour-only state |
| D3-05 | MAJOR | the loupe's own boundary measures 1.52 : 1 and 1.73 : 1 against the image; a brand hue marks state over arbitrary photography | unbounded ground for a boundary |
| D3-06 | MAJOR | `LOUPE_SIZE = 110` fixed px occupies 46 % of the stage at 200 % zoom and does not scale with it | fixed-px ornament in a scaled stage |
| D3-07 | MAJOR | 53 % of the stage is empty at 200 % zoom; one layout, no short-wide response | single-layout stage |
| D3-08 | MAJOR | the drag path leaves `justUnpinned` set, swallowing the next clean tap while the readout still updates (sharpens r2 D-02) | flag consumed on one exit path only |
| D3-09 | MAJOR | the opener leaves the tab order and loses its key handler exactly when the eyedropper becomes openable (sharpens r2 D-03) | `tabindex="-1"` + gated keydown on the same condition |
| D3-10 | MINOR | wheel/trackpad zoom is outside the `gestureActive` gate, so every tick animates the transform for 200 ms under a live cursor | gate keyed to pointer events only |
| D3-11 | MINOR | `DockSeparator` renders 1 × 0 px — a dock-scoped primitive with no dock | primitive out of scope |
| D3-12 | MINOR | `--hover-color` tints the Close glyph with the sampled colour, with no legibility floor | tint applied to the whole control class |
| D3-13 | MINOR | the loupe is centred on the pointer, so on touch it sits entirely under the finger; and it is clipped to a crescent at stage edges by the parent `overflow-hidden` | no offset/flip rule |
| D3-14 | MINOR | `style="--vj-enter-y: 0px"` inline where the codebase has a named CSS recipe | per-instance token pin |
| D3-15 | MINOR | `drawLoupe` exported and never called — the exact hook D3-03 needs | dead public surface |
| D3-16 | INFO | **hypothesis, not reproduced**: two full-resolution canvases plus a base64 data URL are retained per image, and `dispose()` does not zero `canvas.width`; a 12 MP photo would hold ~96 MB of canvas memory on a path that must also run on iOS Safari | unbounded source-resolution buffers |

---

## 10. The gestalt cure

Not sixteen patches. Three transpositions, in this order.

**1 · Move the instrument off the glass and onto its own well.** The overlay stops being a
`glass-floating` chrome plate over live content and becomes what the material table already names: an
**opaque Specimen well** for the stage, with a single **Instrument-veil** strip for the controls,
carrying named alpha/clarity levers and no drop shadow. That one move deletes D3-01 whole and takes
the readout-contrast and phantom-duplicate defects with it, because the ground behind the readout
becomes a designed surface instead of an upload. It also deletes the letterbox problem: an opaque
well has a designed letterbox, not a leak. Non-negotiable corollary: `image-rendering: pixelated` on
the stage, so the stage and the loupe finally obey one resampling law and the display stops
advertising colours the sampler cannot return (§2.3).

**2 · Make the sample a value, not a mode.** Today three flags — `pinned`, `justUnpinned`,
`swatchPulse` — encode a mode, are mutated from four places including a raw capture-phase DOM
listener, and each has a state the design never drew. Replace them with one `sample: {ix, iy} | null`
in the sampler and derive *everything* from it: the readout, the swatch, the loupe position, the
loupe content, and whether the commit actions exist. `drawLoupe` then becomes a `watchEffect` on
`(sample, panX, panY, zoom)` and D3-03, D3-08, D3-15 and r2's D-01/D-02/D-11 become unrepresentable
rather than fixed. Feedback for a commit stops being a class that must be taken off again (D3-02) and
becomes a rendered fact — a durable "added" mark derived from the palette, not a one-shot animation
whose reset depends on an event glass-ui does not forward.

**3 · Give the sample a coordinate model, and the canon's reticle.** `VISUAL-CONSTITUTION.md:126`
already specifies it: named x/y controls with Home/End, a reticle, a loupe and a numeric value that
are **one model**. Two numeric fields bound to `sample` cost less than the `justUnpinned` flag they
replace, and they open the capability to the keyboard end to end — including the entry, which today
is a `tabindex="-1"` div (D3-09). The reticle is the mark the loupe has always been missing: it is
what makes a magnifier an instrument rather than the flat coloured ball in
`shots/D-04-zoom200-forced-colors.png`, and it is the state marker that can be drawn in the loupe's
own canvas with a contrast-safe double stroke instead of a brand hue that vanishes into its own
reading (D3-04, D3-05). Size it from the stage, not from `LOUPE_SIZE` (D3-06), and offset it from the
pointer (D3-13).

What survives untouched: the three-composable decomposition, the inertia gesture and its PRM branch,
the tokenized tracked-canvas transition, `WatercolorDot` as an `aria-hidden` specimen face, and the
`text-mono-small` Fira readout role. The bones are right. The material, the state model and the
coordinate model are the three things this component never actually designed.

---

### Artefacts

- `./shots/D-00-fixture-quad64.png` — the 64 × 64 four-quadrant fixture
- `./shots/D-01-desktop-first-hover-blank-loupe.png` — desktop light, first hover, `loupeInk: 0`
- `./shots/D-02-desktop-pinned.png` — desktop light, pinned; source of the ramp and bleed measurements
- `./shots/D-03-mobile-first-tap-blank-loupe-ghost-image.png` — iPhone 13 / WebKit, one tap
- `./shots/D-04-zoom200-forced-colors.png` — 200 % zoom + forced colors + reduced motion
- `./probe-CHD-p2.mjs` — the driver script (read-only; A = desktop sequence, B = touch, C = zoom/forced, D = error path)
