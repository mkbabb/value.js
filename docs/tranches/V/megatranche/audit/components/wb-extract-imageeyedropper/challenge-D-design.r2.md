# CHALLENGE-D — `ImageEyedropper.vue` — the design is flawed (round 2)

Seat: CHALLENGE-D (design), round 2. Subject:
`demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue` (299 lines) and its three
composables + `constants.ts`. Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`,
HEAD `c654824e`.

Round 1 of this seat is preserved verbatim at `./challenge-D-design.r1.md` (22 defects). I did not
read it until after my own probes were complete and my numbers were in hand; §8 below reconciles the
two rounds and records where I **diverge** from r1. Every measurement in this file is my own.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M-context variant). That is
the tier this seat was explicitly spawned with; declared, not inherited.

## Verdict

**DEFECTIVE.** Nineteen defects, four BLOCKER.

The strongest single defect is not a rendering flaw, it is a **modal defect**: the component has two
mutually-exclusive input laws (hover-samples vs pin-freezes) mediated by a capture-phase listener and
a plain `let justUnpinned` flag, and the two laws destroy each other. Measured consequence: **after
the first sample, every subsequent sample costs two clicks, and the discarded first click deletes the
only commit affordance the component has** — the user clicks a new pixel and gets no new colour plus
the loss of *Add to palette* and *Apply*. On touch, where the component's own copy says "Tap to
sample", the same law means the magnifier loupe **never paints a single pixel for the entire session**
(measured `0` of `12100` non-transparent pixels).

Three of the four suspects the brief handed me are **innocent**, and I say so with evidence in §7:
there is no object-URL leak, no tainted-canvas exposure, and the interior pointer→pixel mapping is
numerically exact. The DPR suspect is guilty, but of the loupe's backing store, not the sampler.

The mega-tranche visual audit contains **zero rendered evidence of this component**. `/#/extract` is
captured in four Safari matrices only in its *empty* state, and the `rtl-desktop`,
`zoom-200-desktop`, `forced-colors-desktop`, `reduced-motion-desktop` and `keyboard-focus-desktop`
matrices cover five routes that exclude `/#/extract` entirely
(`ls docs/tranches/V/megatranche/audit/visual/shots/zoom-200-desktop/` → `adminusers.png blob.png
browse.png gradient.png picker.png`). That coverage gap is finding **D-19**.

---

## 1. How the evidence was taken

Read-only drive of the live dev server at `http://localhost:9000` with WebKit (the Safari engine the
audit matrix uses), `deviceScaleFactor: 2` desktop / `3` mobile. Scripts and raw JSON are in
`./evidence/`:

| file | what it establishes |
|---|---|
| `evidence/probe-A.mjs` → `probe-A-matrices.json` | five matrices (desktop light/dark, mobile dark, forced-colors+PRM, RTL): geometry, loupe pixel census, tab walk, focus, Escape |
| `evidence/probe-B.mjs` → `probe-B-behaviour.json` | sampling accuracy against a known bitmap, readout truncation, the click cycle, 200 % zoom, reduced-motion computed values |
| `evidence/E1…E5*.png` | the rendered frames the findings below name |

Two supporting commands, run at HEAD:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "exit=$?"
exit=0                                    # zero output — see D-14
$ grep -rn "createObjectURL" demo/workbenches/ | wc -l
0                                         # see §7 negative proof N-1
```

The bitmap under test resolved to a 64×64 specimen whose interior obeys `r = 4·x`, `g = 4·y` exactly
(measured from the visible canvas: `(16,16)→64,64,0`, `(48,16)→192,64,0`, `(16,48)→64,192,0`,
`(48,48)→192,192,0`). That makes every sample falsifiable from its coordinates alone.

---

## 2. Visual truth

### 2.1 Desktop dark — `evidence/E1-desktop-dark-loupe-hollow.png`

The magnifier is **a hollow ring**. At the cursor there is a 110 px circle with a 2 px border and
nothing inside it: you see the un-magnified stage straight through the hole. Measured on that exact
frame: `loupeEmpty = {nonAlphaPx: 0, totalPx: 12100}`, `loupeCenter = [0,0,0,0]`. The instrument's
one specialised organ is transparent.

Above it, the chrome bar is not a bar. Computed: `backgroundColor: rgba(0,0,0,0)`,
`border-bottom-width: 0px`. It has no ground and no boundary of its own; it is a row of glyphs
floating on the overlay's `oklab(0.936408 0.005529 0.013284 / 0.808)` + `blur(11px) saturate(1.6)`.
Because the overlay sits directly on top of the `ImageDropZone` preview of *the same photograph*, the
band under the readout is a blurred second copy of the specimen, and the sharp copy starts at a hard
seam 60 px below it. Two images, two scales, two blurs, one hard edge. That is not an instrument
veil; it is a leak.

Below, the specimen is **clipped by the fold**. Overlay `y = 186.4, h = 685.6` → bottom `872.0`
against `innerHeight = 806`; the sampler region's bottom is `870.9`; the canvas bottom is `811.1`.
Roughly 65 px of the stage is off-screen and, because the sampler carries `touch-action: none`
(`ImageEyedropper.vue:66`), it cannot be scrolled to.

### 2.2 Mobile dark, after one tap — `evidence/E2-mobile-dark-tap-loupe-blank.png`

This is the platform the copy names, and it is the worst frame.

- The pinned loupe is again **completely empty** — `{nonAlphaPx: 0, totalPx: 12100}` — now
  permanently, because pinning suppresses the hover redraw that rescues it on desktop. A pale ring is
  drawn around nothing.
- The readout reads `lab(52.1495…`. The full value is
  `lab(52.149527332% -9.447862249415 56.024088496729)` — 50 characters, of which roughly a dozen
  survive. There is no `title`, no tooltip, no expansion.
- The `×` glyph is **tinted the sampled colour and visibly larger** than the `+` and `✓` beside it.
  That is `.eyedropper-action-btn:hover:not(:disabled) svg { color: var(--hover-color…);
  transform: scale(1.2) }` (lines 279-282) with no `@media (hover: hover)` guard, latched by the
  touch that opened the overlay. Sticky hover, permanent, on the one control the user needs to leave.
- The overlay's own bottom is at `857.6` against `innerHeight 844`, and the extracted-palette card
  ghosts through the glass below the specimen.

### 2.3 RTL — `evidence/E3-rtl-canvas-444px-off.png`

Catastrophic and unambiguous. The specimen collapses to a narrow vertical sliver pinned to the far
right, overhanging the Extract card's rounded edge.

| | LTR | RTL |
|---|---|---|
| sampler region `x` | 236.5 | 767.5 |
| canvas `x` | 236.5 | **1211.5** |
| `canvas.x − viewport.x` | **0** | **+444.0** |
| `panX` (model) | 0 | 0 |

The model says the pan is zero; the render puts the specimen 444 px outside its own stage. Only ~8
of 64 image columns remain inside the sampler. Since `sampleAt` computes `ix = floor((rx − panX)/zoom)`
from the *model* pan, every RTL sample addresses a pixel that is not the one under the pointer.

### 2.4 200 % zoom — `evidence/E4-zoom200-stage-off-fold.png`

| quantity | value |
|---|---|
| `innerHeight` | 806 |
| overlay bottom | 1743.9 |
| sampler-region bottom | 1741.9 |
| canvas bottom | **2381.9** |
| readout clipped | **378 px** |
| document horizontal overflow | 0 |

Two-thirds of the specimen is below the fold and unreachable. The readout shows
`lab(75.7713135…`. Horizontal overflow is clean — that part is fine.

### 2.5 Forced colors — `evidence/E5-forced-colors-readout-clipped.png`

WebKit's `forcedColors` emulation is partial, so I weight this arm low. What it does show honestly:
the bar goes opaque white, the readout still truncates with an ellipsis and still has no `title`, the
loupe is still hollow, and the ~60 px letterbox band between the bar and the specimen becomes a plain
empty white void — dead acreage inside a 685 px plate.

---

## 3. State coverage

Every state the component can occupy, and its disposition:

| state | handled? | evidence |
|---|---|---|
| empty (no image) | **n/a by construction** — `v-if="eyedropperActive && session.previewDataUrl"` (`ExtractWorkbench.vue:174`) | — |
| loading / decoding | **absent** | `loadAndFit()` awaits `sampler.loadImage`; nothing renders a pending state; `imageLoaded` gates only `onTransitionEnd` |
| image decode error | **absent, and unhandled** | `useImageSampler.ts:72-75` `img.onerror = reject`; `loadAndFit` (line 200) has no `catch` and is fired from `onMounted` — an unhandled rejection, overlay stays blank forever · **D-15** |
| populated, unsampled | handled | ghost `WatercolorDot` + "Tap to sample" |
| hovered (desktop) | handled, but firehose: readout mutates on every `pointermove`, and it carries `select-all` you can never actually select |
| first sample | **broken** — loupe blank · **D-01** |
| pinned | handled but transient · **D-11** |
| tap while pinned | **broken** — dead click · **D-02** |
| focused | **no focus enters the overlay**; 21 of 22 document focusables sit behind it · **D-04** |
| disabled | not expressible; `:not(:disabled)` in the stylesheet guards a state no control can reach — dead selector |
| dragging / panning | handled (inertia composable) — the one genuinely good part |
| overflowing / truncated | **broken** — 139 px clipped at desktop, 378 px at 200 %, no `title` · **D-07** |
| RTL | **broken** — 444 px displacement · **D-05** |
| reduced motion | **sound** — see negative proof N-4 |
| forced colors | weak: the pinned/unpinned distinction is carried only by `border-color: var(--primary)` + a `box-shadow` ring, both author colours; state is colour-only, which §4.1 forbids |
| zoomed to 200 % | **broken** — stage off-fold, unscrollable · **D-06** |
| keyboard sampling | **does not exist** · **D-03** |

Eight unhandled or broken states. A state that was never designed is a design defect; there are eight
of them.

---

## 4. Motion

Honest finding: **motion is the healthiest part of this component, and I will not manufacture a
defect here.**

- `.eyedropper-canvas` transitions `transform` at `var(--duration-fast)` / `var(--ease-decelerate)`
  — tokenised. Measured normal-motion computed values: `transition-property: transform`,
  `transition-duration: 0.2s`, matched by exactly one rule
  (`.eyedropper-canvas[data-v-5659b98f]`). `transform` is compositor-only; it does not force layout.
- Under `prefers-reduced-motion: reduce` the global guard at `demo/styles/animations.css:184-193`
  does reach it: measured `swatch-pop` `animation-duration: 0.00001s`. The claim "the pulse ignores
  reduced motion" would be **false** and I do not make it.
- `useInertiaGesture` owns its own PRM decision explicitly (`useInertiaGesture.ts:131-142`) and rides
  glass-ui's `useRAFLoop` with `pauseWhenHidden`. This is exemplary.

Two small motion defects survive:

- `swatch-pop`'s `0.65s` (line 288) is a raw literal where every neighbouring duration is a token.
- `.swatch-pulse` re-declares `width/height: 1.75rem` (lines 285-289) because applying the class
  *removes* the `w-7 h-7` utilities it replaces (line 21). Measured: `28px × 28px`. Two sources of
  truth for one dimension · **D-16**.

---

## 5. The design-system boundary

- **Consumer CSS reaches inside a producer control.**
  `.eyedropper-action-btn:hover:not(:disabled) svg { color: …; transform: scale(1.2) }` (279-282)
  restyles the `<svg>` glyph *inside* glass-ui's `DockControl`, driven by an ad-hoc `--hover-color`
  set inline on the row (line 10). glass-ui 7.0.0 already publishes the seams for exactly this —
  `--dock-control-hover-bg`, `--dock-active-color`, `--glass-accent`,
  `--dock-control-glyph-size` (`node_modules/@mkbabb/glass-ui/dist/styles/**`). This is a
  per-instance override of a root that should have been styled at the root · **D-09**.
- **A dead prop from an abrogated API.** Line 29 passes `tag="div"` to `WatercolorDot`. glass-ui
  7.0.0's `WatercolorDot` declares
  `props: { color, variant, animate, cycleDuration, range, seed }` — **no `tag`**
  (`dist/watercolor-dot.js`), because `VISUAL-CONSTITUTION.md §4.2` / `OPTICAL-BENCH-COMPOSITIONS.md`
  P051 removed it. The attribute is silently swallowed (measured `document.querySelectorAll("[tag]").length
  === 0`) and `vue-tsc -p tsconfig.demo.json --noEmit` **exits 0 with no output**. Dead legacy that
  the gate does not see · **D-14**.
- **A hand-rolled dialog where a producer primitive exists.** The overlay is a bare
  `<div class="absolute inset-0 z-popover …">` with no `role`, no `aria-modal`, no accessible name,
  no focus management, and a `window`-level keydown listener (line 239) · **D-04**.
- **Correctly inside the boundary**, and worth recording: the WatercolorDots are producer-supplied and
  already `aria-hidden="true"` from glass-ui's own root (measured); the floating tier is the real
  `glass-floating` rung, not a hand-minted `bg-card/75`; `DockControl`/`DockSeparator` are producer
  components. The component did not invent a `shared/` directory or a wrapper.

---

## 6. Proportion and seat law

Judged against `OPTICAL-BENCH-COMPOSITIONS.md`, `VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`.

1. **The binding Extract composition is contradicted outright.**
   `OPTICAL-BENCH-COMPOSITIONS.md:42` binds Extract to P122 `golden`: *"source/sampler 61.8033989%;
   result controls 38.1966011%"* and *"image well is specimen, not Card"*. The shipped eyedropper is
   `absolute inset-0` over the entire workbench: it occludes **100 %** of the composition — the
   result plate, the k slider, the chroma slider, the dominance readout, the reset control. Measured
   overlay `510 × 685.6` against a workbench of the same box. The sampler is not a region of the
   chassis; it is a plate-wide takeover · **D-10**.
2. **The specimen well is glass, not a well.** `VISUAL-CONSTITUTION.md §2`: *"Specimen well … opaque/quiet
   neutral stage"*, and *"Glass earns its blur by revealing live content; otherwise it is a neutral
   well."* Measured `backdrop-filter: blur(11px) saturate(1.6)` at 80.8 % opacity, revealing a
   duplicate of the same photograph. It reveals nothing new; it earns no blur · **D-08**.
3. **Text does not meet its rendered contrast on the actual material tier** (`§4.1`: *"a token name is
   not evidence"*). I decoded the rendered readout crop and computed WCAG relative luminance:
   **4.07 : 1** ink-to-paper, against the 4.5 : 1 AA floor for `text-mono-small`. The token in use is
   the raw static `text-muted-foreground` (line 35) — **the exact token that both siblings on this
   route already retired**: `ImageDropZone.vue:104-111` and `ExtractWorkbench.vue:285-292` each carry
   the E1-R1 / T.W8 comment *"instead of the STATIC `text-muted-foreground` that failed the text floor
   over the live-ambient plate in light"* and use `--ink-muted`. The eyedropper never received that
   remediation · **D-08**.
4. **`§5.2` "image sampler coordinates" is unimplemented.** The row is explicit: *Right/Left
   increase/decrease source-image `x`; Down/Up increase/decrease source-image `y`; named x/y controls
   own Home=min and End=max; reticle, loupe and numeric value remain one model.* Zero of this exists;
   the only key bound anywhere is `Escape`. `§7 Extract` repeats it: *"Eyedropper and sampler have
   keyboard/numeric alternatives."* `§5`: *"every spatial action has a keyboard/numeric equivalent."*
   Three separate clauses, all unmet · **D-03**.
5. **`§5` commit law violated.** *"Persistent operation state stays with the entity/workspace. A
   transient flourish may celebrate success but never carries the only truth."* Add/Apply exist only
   inside `pinned`; a stray `pointerdown` removes them while the sample survives · **D-11**, and
   `PROPORTION-AUDIT.md` PR-07 (*"every surviving action/drag seat has a name/state"*) is missed too:
   all three controls are `title`-only with `aria-label: null`, against an app where every other
   probed button carries `aria-label`.
6. **`§4` readout law violated.** *"Live numbers … reserve their widest legal representation so value
   changes never reflow the settled chassis."* Measured reflow: the readout box is 275 px wide
   unpinned and 371 px pinned — a 96 px jump from a state change, on top of the 139 px clip.

---

## 7. Negative proofs — the suspects that are innocent

A challenge seat that only accuses is not doing the work. Three of the four suspects the brief named
are clean, and one canon-adjacent worry is clean:

- **N-1 · Object-URL cleanup — NOT A DEFECT.** `grep -rn "createObjectURL" demo/workbenches/` → 0
  hits. The image path is `FileReader.readAsDataURL` (`useExtractSession.ts:29-36`); the only
  `createObjectURL` in `demo/` is `palettes/export.ts:88,126`, each with a matching
  `revokeObjectURL` (lines 99, 114, 131). There is no object URL to leak here.
- **N-2 · Tainted canvas / CORS `getImageData` — NOT REACHABLE.** Every `imageUrl` this component can
  receive is a `data:` URL minted in-process (`useExtractSession.ts:164-168`, and the camera path via
  `canvas.toBlob` → `File` → same reader). `data:` URLs are same-origin; `getImageData`
  (`useImageSampler.ts:116`) cannot throw `SecurityError` on this path. `img.crossOrigin =
  "anonymous"` (line 70) is inert on a `data:` URL — harmless, if slightly ornamental.
- **N-3 · Pointer→pixel mapping in the interior — EXACT.** Against the `r = 4·x, g = 4·y` specimen,
  hovering the geometric centre of image pixel `(ix,iy)` produced the swatch colours
  `(16,16)→rgb(64,64,0)`, `(48,16)→rgb(192,64,0)`, `(16,48)→rgb(64,192,0)`,
  `(48,48)→rgb(192,192,0)`. Four for four, zero error. `viewportToImage`'s
  `floor((rx − panX)/zoom)` is correct in LTR. The mapping *fails* only where the geometry fails
  (RTL · D-05) or where the stage is off-fold and unreachable (D-06) — not from arithmetic.
- **N-4 · `prefers-reduced-motion` — HONOURED.** Measured `swatch-pop` animation duration
  `0.00001s` under `reducedMotion: "reduce"`; the global guard reaches the scoped keyframes. And
  `useInertiaGesture` owns its own PRM branch explicitly. No motion defect here.
- **N-5 · devicePixelRatio in the *sampler* — SOUND.** The sample is read from an offscreen canvas
  sized to `naturalWidth/Height` (`useImageSampler.ts:80-84`), so DPR cannot corrupt the value. DPR
  *is* guilty in the loupe's display buffer (D-12) — a different organ.
- **N-6 · Horizontal overflow — CLEAN** at 100 % and 200 % (`docOverflowX: 0`).

---

## 8. Reconciliation with round 1

I confirm r1's D-2 (dead tap), D-3 (blank touch loupe), D-4 (unrecoverable truncation), D-5 (RTL
displacement), D-6/D-7 (no keyboard, modal in geometry only), D-8, D-13, D-14, D-18 (loupe optics),
D-19, D-21, D-22 by independent measurement.

Two corrections and one addition:

- **r1 D-5 states 692 px of RTL displacement; I measure 444.0 px** at `1512×806` with a 508 px-wide
  sampler region (`canvas.x 1211.5` vs `viewport.x 767.5`). The magnitude is
  viewport-width-dependent — it is `viewportWidth − canvasLayoutWidth` — so both numbers can be
  right at their own geometry. The defect is identical; the *number* must always be quoted with its
  frame. I quote mine with its frame above.
- **r1 D-1 frames the WYSIWYG divergence as the instrument disagreeing about "what is on the
  screen."** My N-3 shows the *sampler arithmetic is exact*, which sharpens rather than weakens r1:
  the divergence is entirely **display-side**. The stage has no `image-rendering` declaration
  (computed `auto`) and paints a bilinear blend at scale 7.94×, while the loupe sets
  `imageSmoothingEnabled = false` and the sampler takes one integer texel. On r1's 1-px checker at
  ≈1.3× that blend is precisely `rgb(127,0,128)` — the average of `#ff0000` and `#0000ff` — which is
  a *confirmation* of the mechanism, not a sampling bug. The cure must therefore be applied to the
  render law, not to `sampleAt` · **D-13**.
- **New in r2, not in r1:** the `tag="div"` dead prop against glass-ui 7.0.0's actual prop list plus
  the `vue-tsc exit=0` gate gap (**D-14**); the `text-muted-foreground` E1-R1 token regression named
  against its two sibling files' own comments, with the measured 4.07 : 1 (**D-08**); the missing
  `title` named against `ExtractWorkbench.vue:136-140`'s explicit *"never a lying readout"* comment
  (**D-07**); and the negative-proof set §7.

---

## 9. Defect register

Severity: BLOCKER = the instrument does not do its job · MAJOR = a law in the tranche canon or an
owner edict is violated · MINOR = real but local · INFO = record.

| ID | severity | defect | mechanism family |
|---|---|---|---|
| D-01 | BLOCKER | the loupe paints nothing on the first sample, and never at all on touch | draw-before-mount |
| D-02 | BLOCKER | every sample after the first costs two clicks; the discarded click deletes the commit affordance | two-law modal collision |
| D-03 | BLOCKER | no keyboard or numeric sampling path exists at all | missing model surface |
| D-05 | BLOCKER | RTL renders the specimen 444 px outside its own stage; samples address the wrong pixel | direction-unaware geometry |
| D-04 | MAJOR | non-modal overlay: no role/name/`aria-modal`, no focus in or out, 21 of 22 focusables live behind it, global `window` keydown | hand-rolled dialog |
| D-06 | MAJOR | stage overflows the fold (bottom 870.9 vs 806; 2381.9 vs 806 at 200 %) and `touch-action: none` makes it unreachable | content-sized overlay geometry |
| D-07 | MAJOR | readout truncates 139 px / 378 px / ~75 % with no `title`, in a file whose sibling documents the opposite rule | lying readout |
| D-08 | MAJOR | readout ink is the retired static `text-muted-foreground` over live glass; measured 4.07 : 1 | token regression + unbounded ground |
| D-09 | MAJOR | consumer CSS restyles the glyph inside a producer control, with unguarded `:hover` → sticky tinted, enlarged `×` on touch | per-instance override |
| D-10 | MAJOR | occludes 100 % of the binding `golden` Extract composition | overlay-instead-of-region |
| D-11 | MAJOR | commit actions bound to a transient pin mode, not to "a sample exists" | two-law modal collision |
| D-12 | MAJOR | loupe backing store is 110×110 for a 110 CSS-px box → 0.5×/0.33× device resolution, then bilinearly upscaled; and no reticle marks which of the 11×11 cells was sampled | DPR-unaware buffer |
| D-13 | MAJOR | stage paints `image-rendering: auto` at up to 10×, so the displayed colour is a blend while the sample is one texel | three resampling laws |
| D-14 | MINOR | dead `tag="div"` prop on `WatercolorDot`; glass-ui 7.0.0 has no such prop; `vue-tsc` exits 0 | legacy residue + gate gap |
| D-15 | MINOR | no loading, decode-error, or out-of-bounds state; `loadImage`'s rejection is unhandled | absent states |
| D-16 | MINOR | two sources of truth for the loupe diameter (`LOUPE_SIZE` vs the literal `width="110"` at line 85) and the swatch size (`w-7 h-7` vs `.swatch-pulse{width:1.75rem}`) | duplicated constant |
| D-17 | MINOR | all three controls are `title`-only, `aria-label: null`, against app convention and the audit harness's own nameless-button rule | naming |
| D-18 | MINOR | permanent `will-change: transform` on a full-resolution image canvas | unconditional layer promotion |
| D-19 | INFO | this component has no rendered coverage anywhere in the mega-tranche visual audit | evidence gap |

---

## 10. The gestalt cure

Nine of these nineteen defects (D-01, D-02, D-03, D-11, D-12, D-13, and the reticle/loupe/readout
disagreements inside them) are one defect wearing nine costumes: **there is no sample model.** State
is scattered across `sampledColor`, `formattedColor`, `pinned`, a non-reactive `justUnpinned`, and
three imperative draw calls, and each surface — stage, loupe, swatch, readout — reads a different
subset with a different resampling law and a different lifecycle.

The transposition, not the patch:

1. **One model.** `sample: { ix, iy, rgb, css } | null` and `frozen: boolean`, derived reactively.
   A pointer position maps to a sample; a sample renders the reticle, the loupe, the swatch and the
   readout. Delete `justUnpinned` and the capture-phase listener entirely: a tap always sets a new
   sample and freezes it; there is no "unpin, discard, retry" intermediate to produce a dead click.
   D-01, D-02, D-11 die together.
2. **One resampling law.** `image-rendering: pixelated` on the stage above 1×, so a texel is a
   visible square and the loupe becomes a true magnification of the same law rather than a second
   opinion. Size the loupe backing store to `LOUPE_SIZE * devicePixelRatio` and stroke the sampled
   cell. Render the loupe unconditionally with `opacity`/`visibility` driven by the model, never
   `v-if`, so no draw can ever precede its own canvas. D-12, D-13, and the redraw race die together.
3. **The sampler is a region, not an overlay.** It belongs inside the `golden` source/sampler stage
   that `OPTICAL-BENCH-COMPOSITIONS.md:42` already binds, as a *mode of the stage*, with the result
   and controls still visible at 38.2 %. That alone retires D-06, D-08 and D-10, and makes the glass
   tier honest because the sampler stops floating over a copy of itself.
4. **Named x/y axes over the existing `Slider` composition** (`§5`'s domain-neutral axis composition,
   the one Picker/Generate/Gradient/Atmosphere/Blob already adopt) sharing the same sample model, with
   `Home`/`End` = min/max. That is D-03, and it is also the honest fix for D-06: a keyboard-reachable
   coordinate cannot be off the fold.
5. **Use the producer Dialog** instead of `absolute inset-0` + `window.addEventListener("keydown")`.
   Role, name, `aria-modal`, initial focus, focus restoration and background inerting all arrive with
   it. D-04 and half of D-17.
6. **Thread `--ink-muted` and the producer hover seams** (`--dock-active-color` / `--glass-accent`),
   delete the descendant `svg` override and the `tag="div"` residue, hoist `0.65s` to a token, and
   let `LOUPE_SIZE` be the only place 110 is written. D-08, D-09, D-14, D-16.

Nothing above is a new abstraction, a new `shared/` directory or a new wrapper component: every
mechanism it asks for — `InstrumentChassis` stage regions, the axis `Slider` composition, the Dialog
primitive, `--ink-muted`, the dock control seams — already ships.
