# CHALLENGE-C — `demo/workbenches/extract/ExtractControls.vue` — implementation (pass 3)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. The seat is **declared, not inherited**.

---

## Pin verification

```
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28  demo/workbenches/extract/ExtractControls.vue
$ wc -l demo/workbenches/extract/ExtractControls.vue
     151 demo/workbenches/extract/ExtractControls.vue
```

**MATCHES** the glass BJ W4 hold pin byte-for-byte. Consumer edits are FORBIDDEN until Glass 8.
**No source edits land from this seat.** The blocked wave is authored in §*Blocked wave* with its
exact release condition.

**HEAD discrepancy, recorded:** the seat brief names HEAD `c654824e`. The actual repository HEAD at
audit time is `06377848` (`docs(V·mega): workbenches 5th deploy harvested …`). The pinned file's
hash is unchanged between them, so the audit stands; the brief's SHA is stale, not the subject.

## Relationship to passes 1 and 2

Both prior passes are preserved verbatim:

| pass | file | status |
|---|---|---|
| 1 | `challenge-C-implementation.pass-1-2026-07-28-prior.md` | superseded, nothing retracted |
| 2 | `challenge-C-implementation.pass-2-2026-07-28-prior.md` | **carried forward whole** — C2-1..C2-13 stand |

Pass 3 is **additive**. I independently re-measured pass 2's two load-bearing claims (the camera
leak, the double dispatch) and both reproduce — the numbers are re-pasted below under XC-3 and XC-7
as corroboration, not as new findings. The five findings **new to this pass** are XC-1, XC-2, XC-4,
XC-5 and XC-6. XC-1 is the strongest defect anywhere in this component's three-pass record and no
prior pass names it: the word `inset` on line 22.

## Verdict

**DEFECTIVE.** Thirteen findings this pass — three BLOCKER, four MAJOR — on top of pass 2's thirteen.

The governing observation: **this file's comments are a specification, and the code does not
implement it.** Lines 3–13 declare, at length, a certified identity edge that "survives OUTWARD as a
persistent hairline ring … in every state." Line 22 paints that ring `inset`. Measured, the ring is
invisible in *every* state — 1.000:1 pre-image (its colour is byte-identical to the fill it sits on)
and 1.002–2.673:1 developed in light, never once reaching the 3:1 floor its own comment cites. The
same pattern repeats: a `disabled` prop is received, destructured, documented by its parent's intent,
and then bound to exactly one of five controls.

---

## XC-1 · BLOCKER — the "certified identity edge" is invisible in every state: the ring is `inset`, and `inset` puts it on the gradient it was certified *against the plate* for

**NEW this pass.** Not named in pass 1 or pass 2.

**The claim under audit.** `ExtractControls.vue:3-13`:

> *"once an image develops, the opaque palette gradient rides above as a DATA layer (C3) and fully
> occludes that fill — so the certified ink survives **OUTWARD** as a persistent hairline ring (the
> ShadowPalette hairline idiom turned outward), giving the component **a certified identity edge
> independent of its gradient content in every state**."*

**The code.** `ExtractControls.vue:22`:

```html
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

`inset`. Not outward. Per CSS Backgrounds 3 §5.3, an inner shadow paints **above the element's
background** (colour *and* image) and below its content — so the ring is painted **on the palette
gradient**, while `trackInk` (`ExtractControls.vue:123-125`) is certified by `safeCss(cssColor,
GRAPHICS_CONTRAST_FLOOR)` against the **resting plate** — an entirely different ground. The
certification referent and the paint referent are different surfaces.

**Evidence — computed style, live (`evidence/pass-3/xc3-probe1.txt`):**

```
=== RAIL pre-image ===
 "backgroundColor": "oklch(0.545141 0.218024 9.834023)",
 "boxShadow":       "oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset",
 "boxShadowHasInset": true,
```

The ring colour and the fill colour are the **same string**. Pre-image the ring is drawn in the
exact colour of the surface it is drawn on: **contrast 1.000:1 by identity.** The ring does not
exist pre-image.

**Evidence — developed, both schemes, every column of the ring
(`evidence/pass-3/xc3-probe5.txt`):** an image is uploaded in-page, the live `background-image` is
read back, and the ring colour is compared against the ramp at 401 sample positions:

```
=== RING vs its own gradient — every column (light) ===
 "ringColor": "oklch(0.545141 0.218024 9.834023)",
 "RING_EQUALS_FILL_PREIMAGE": true,
 "MAX_contrast_anywhere_along_the_ring": 2.673,   "at_fraction": 1,
 "MIN_contrast": 1.002,                           "at_fraction_min": 0.438,
 "GRAPHICS_FLOOR": 3,
 "PASSES_ANYWHERE": false

=== RING vs its own gradient — every column (dark) ===
 "MAX_contrast_anywhere_along_the_ring": 6.992,   "at_fraction": 0.235,
 "MIN_contrast": 1.845,                           "at_fraction_min": 1,
 "PASSES_ANYWHERE": true
```

The four declared stops measure exactly (`xc3-probe1.txt`, light):

| stop position | stop colour | ring vs stop |
|---|---|---:|
| 0% | `oklch(0.578513 0.213789 27.172258)` | **1.168** |
| 33% | `oklch(0.471973 0.216301 267.259979)` | **1.294** |
| 67% | `oklch(0.701065 0.208852 144.531006)` | **2.273** |
| 100% | `oklch(0.767351 0.016744 73.637039)` | **2.673** |

**In light, the ring does not reach 3:1 at any point along its entire run**, and over the stretch
around fraction 0.438 it measures 1.002:1 — indistinguishable from the gradient. In dark it reaches
6.99:1 in one place and **1.845:1 at the right terminus** — it fails at one end and passes in the
middle. Either way the comment's operative claim, *"independent of its gradient content,"* is
falsified: the ring's legibility is a pure function of what the quantizer happened to return,
spanning a 2.7× range in light and a 3.8× range in dark, on the same image.

*Method note, stated honestly:* the four stop values are exact (canvas-resolved from the live
computed `background-image`); the 401-column sweep interpolates in sRGB between adjacent stops
rather than in oklch. The light-scheme "never passes" conclusion does not depend on the
interpolation — its maximum, 2.673, occurs **at** the 100% stop, an exact value.

**Visual corroboration.** `evidence/pass-3/xc3-rail-developed.png` (3× DPR clip of the live rail).
The crimson hairline is discernible over the blue/green midsection and vanishes into the red left
terminus. A sighted user with normal vision can find it; the WCAG 1.4.11 non-text floor — the floor
this file's own comment invokes, and the floor its own born-RED gate exists to hold — is not met.

**Failure scenario.** Upload any photograph whose dominant cluster is near the live pick's lightness
— the common case for the app's own brand-adjacent imagery. The rail loses its edge against the
resting plate entirely: an opaque gradient bar with no boundary, floating on a plate of similar
lightness. This is the *precise* defect class the T-44a remediation was opened to cure, reintroduced
one layer up.

**Mechanism.** Certification referent ≠ paint referent. `trackInk` is certified against `"resting"`
(`useSafeAccentFn("resting")`, line 118) which is correct for ink painted **on the plate**. `inset`
moves the paint onto the gradient. One keyword decouples the guarantee from the pixel.

**Proposed cure — architectural, one word.** Delete `inset`. The ring becomes what the comment
already specifies: an outward hairline seated on the resting plate, where `trackInk`'s ≥4.25:1
certification (3.0 floor + `CERTIFY_HEADROOM` 1.25, `ink.ts:17,137`) is *the correct guarantee for
that ground*. I verified the geometry admits it: `overflow:hidden` on the rail clips its children,
never its own box-shadow; the 1.5px spread lands in the parent `h-6` row (`ExtractControls.vue:18`)
and no ancestor between it and the plate sets `overflow` — so an outward ring paints. This is not a
patch; it is the transposition that makes the existing certification *mean* something.

---

## XC-2 · BLOCKER — `disabled` is received, destructured, and bound to one of five controls

**NEW as an isolated, measured finding.** Pass 2 noticed the unbound prop *inside* its camera finding
(C2-1) and folded it into that cure; it is a defect in its own right with its own blast radius.

**Evidence — every occurrence of `disabled` in the file:**

```
$ grep -n "disabled" demo/workbenches/extract/ExtractControls.vue
84:                :disabled="disabled || !hasImage"
103:const { k, chromaWeight, gradient, cssColor, disabled, hasImage } =
109:        disabled?: boolean | undefined;
```

One binding. `ExtractWorkbench.vue:70` passes `:disabled="session.isProcessing.value || cameraActive"`
— the parent's intent is explicit and covers two distinct conditions. The child applies it to the
Reset button only. The Upload control (`:40-46`), the Camera control (`:49-55`), the k `Slider`
(`:24-34`) and the kC `Slider` (`:68-77`) all ignore it. Both `DockControl` and glass-ui's `Slider`
expose a `disabled` prop (`glass-ui/dist/dock.js` → `disabled: { type: Boolean, default: !1 }`;
`slider-DzqeQmMu.js` → `disabled: { type: Boolean }`), so the capability exists and is simply not used.

**Reproduction (`evidence/pass-3/xc3-probe3.mjs`, output `xc3-probe3.txt`).** Upload a 1600×1600
image; sample the control states 30× at 100 ms through the whole decode→quantize→render window:

```
=== was ANY of upload/camera/kSlider/kcSlider ever disabled? ===
{ "upload": false, "camera": false, "k": false, "kc": false, "reset": false }
```

Not one control was ever disabled at any sample. Then, driving the k slider by keyboard inside that
window:

```
=== k moved during/after processing — worker dispatches ===
[ { "t": 7860, "k": 10, "cw": 0.5 } ]
```

The slider took focus (`tabindex="0"` throughout), accepted `ArrowRight`, and dispatched a fresh
worker job. The parent's guard is inert.

**Failure scenario, the sharp one.** `cameraActive` is one of the two conditions the parent folds
into `disabled`. With the viewfinder open the parent asserts `disabled=true`; the Camera button
remains fully enabled; pressing it re-enters `ExtractWorkbench.startCamera()`, which overwrites
`cameraStream` without stopping the previous one. That is XC-3, and its proximate cause is this
unbound prop.

**Mechanism.** A prop declared as a contract but honoured at one site. The type system cannot catch
it — an unused destructured binding is legal — and no gate reads it.

**Proposed cure.** Bind `:disabled="disabled"` on the Upload and Camera `DockControl`s and on both
`Slider`s; leave Reset's compound `disabled || !hasImage` (subject to XC-6). Four bindings. The
idiomatic form, and the one that makes the defect structurally impossible to reintroduce, is to stop
hand-threading it: the row is one logical control group, so the cure is a single `<fieldset
:disabled>`-equivalent at the group root — but the KISS reading, and the one this pinned file should
take, is the four explicit bindings.

---

## XC-3 · BLOCKER — camera streams are acquired and never released (corroborates pass-2 C2-1, with a second mechanism)

Pass 2 established this via `KeepAlive`. I reproduced it independently with a `getUserMedia` stub
that counts `track.stop()` calls, and found a **second, independent** path to the same leak.

**Reproduction (`evidence/pass-3/xc3-probe2.mjs`, output `xc3-probe2.txt`).** `navigator.mediaDevices`
is replaced before app boot with a counting fake. Press "Open camera" twice, then change route:

```
=== after 1st press ===
{ "gumCalls": 1, "stops": [], "liveTracks": ["live"],
  "cameraBtnDisabled": false, "uploadBtnDisabled": false, "resetBtnDisabled": true }

=== after 2nd press — THE LEAK ===
{ "gumCalls": 2, "stops": [],
  "trackStates": [ {"id":"s1","track":"t1","state":"live"},
                   {"id":"s2","track":"t2","state":"live"} ] }

=== after unmount (route change) — orphaned tracks ===
{ "stops": [],
  "trackStates": [ {"id":"s1","track":"t1","state":"live"},
                   {"id":"s2","track":"t2","state":"live"} ] }
```

**Two acquisitions. Zero `stop()` calls. Both tracks still `live` after leaving the route.**

**Second mechanism, new this pass.** `ExtractWorkbench.vue:239-255`:

```js
async function startCamera() {
    try {
        cameraActive.value = true;
        cameraStream = await navigator.mediaDevices.getUserMedia({ … });
        await new Promise(requestAnimationFrame);
        if (videoRef.value) videoRef.value.srcObject = cameraStream;
    } catch (err) {
        session.quantizeError.value = `Camera access denied: ${err}`;
        cameraActive.value = false;
    }
}
```

The `catch` handles *acquisition* failure but is also the landing site for a throw that happens
**after** acquisition succeeds — the `srcObject` assignment. In that path the stream is live, the
reference is held, and `cameraActive` is set back to `false`, which unmounts the only UI that could
ever stop it. The camera indicator stays lit with no affordance to turn it off. The probe hit exactly
this path (`cameraVisible: false` with `gumCalls: 1`). The `if (videoRef.value)` guard produces the
same outcome by a different route: stream acquired, no `<video>` bound, `captureFrame` returns early
forever, `cameraActive` left `true`.

**Proposed cure.** The acquisition and its release belong to one owner. Make `startCamera`
idempotent (early-return while a stream is held — which XC-2's binding also enforces at the button),
release inside the `catch` (`cameraStream?.getTracks().forEach(t => t.stop())` before nulling), and
own the lifetime with `onScopeDispose` rather than `onBeforeUnmount` so a `KeepAlive`-cached pane
still releases. Workbench-side; the pinned file's contribution is XC-2's binding.

---

## XC-4 · MAJOR — this component is 100% of the `/#/extract` nameless-button count, in all four capture matrices

**NEW this pass.** The repo's own visual audit measured it; nobody attributed it.

`docs/tranches/V/megatranche/audit/visual/REPORT.md:97-115` — `namelessButtons`, 18 total across 60
captures. Every route reports 1 except one:

```
- safari-desktop-light /#/extract: 3
- safari-desktop-dark  /#/extract: 3
- safari-mobile-light  /#/extract: 3
- safari-mobile-dark   /#/extract: 3
```

`/#/extract` is the worst route in the application and the only route above 1.

**Attribution, measured (`evidence/pass-3/xc3-probe1.txt`).** Enumerating every visible
`button,[role="button"]` on the route under the capture script's own rule
(`visual/capture.mjs:102-105`):

| control | `aria-label` | `title` | text | nameless by the capture rule |
|---|---|---|---|---|
| Save edit | ✓ | — | — | no |
| Cancel edit | ✓ | — | — | no |
| Switch to slug | ✓ | — | — | no |
| Generate new slug | ✓ | — | — | no |
| Cancel | ✓ | — | — | no |
| Select view | ✓ | — | "Extract" | no |
| Toggle action bar | ✓ | — | "Tools" | no |
| Login / @mbabb | — | — | ✓ | no |
| ImageDropZone | ✓ | — | ✓ | no |
| **Upload** (`:41`) | **null** | `"Upload image"` | — | **YES** |
| **Camera** (`:50`) | **null** | `"Open camera"` | — | **YES** |
| **Reset** (`:85`) | **null** | `"Reset"` | — | **YES** |

Exactly three, all in this file, in all four matrices. **Every other button on the route carries an
`aria-label`.** This component is the sole departure from the app's own idiom.

**The nuance, stated fairly.** `title` *does* resolve as a last-resort accessible name — I verified
Playwright's accname finds all three (`playwright accname role=button name="Upload image" -> 1 match`).
So they are not literally nameless to every AT. But:

1. `title` is the accname algorithm's final fallback and is inconsistently announced across AT;
2. `title` has **no touch affordance at all** — on `safari-mobile-*`, which the report captures and
   which is the route's own camera-capture use case, three unlabelled glyphs is the whole story;
3. glass-ui's own `DockControl` consumer, `DockBackgroundToggle`, passes **both**:
   `aria-label: i.value, title: i.value` (`glass-ui/dist/dock.js`). The design system demonstrates
   the idiom this component declines.

**Reproduction.** `docs/.../visual/REPORT.json` → any `/#/extract` result → `probe.a11y.namelessButtons === 3`;
`evidence/pass-3/xc3-probe1.txt` §BUTTONS for the attribution.

**Proposed cure.** `aria-label` alongside `title` on all three, matching `DockBackgroundToggle`
verbatim. Three attributes; the route's count goes 3 → 0 and the application's total 18 → 6.

---

## XC-5 · MAJOR — vacuous gate: the O-18 graphics leg cannot see the ring, and never visits the developed state

**NEW this pass** (pass-2's C2-13 mutation table is correct and complementary; these two mutations
are not in it).

The file's comment apparatus cites the O-18 census as its authority ("the O-18 graphics leg is its
born-RED gate", `:63-64`). That gate measures one property:

```
e2e/smoke/oracles/o18-contrast-census.spec.ts:293
    const rawBg = getComputedStyle(el).backgroundColor;
```

`backgroundColor` only. Never `backgroundImage`. Never `boxShadow`:

```
$ grep -in "boxShadow\|box-shadow" e2e/smoke/oracles/o18-contrast-census.spec.ts
   (no output)
```

And the extract graphics leg (`:1080-1140`) navigates to `/#/extract?space=lab&color=…`, waits for
`--accent-live`, and samples `[data-o18="extract-kc"] .slider-track` and `[data-o18="extract-k-rail"]`.
**It never uploads an image.** So it measures a `backgroundColor` that, in the only state a user
actually reads the instrument in, is 100% occluded by an opaque four-stop gradient spanning 0%–100%
(measured, `xc3-probe1.txt` §RAIL developed).

**Killing mutations that keep every gate green** — the exact answer this seat owes:

| # | mutation to `ExtractControls.vue:22` | why every gate survives |
|---|---|---|
| **g** | delete `boxShadow` from the style object entirely | no spec reads `box-shadow`; the census reads `backgroundColor` |
| **h** | `inset 0 0 0 1.5px` → `inset 0 0 0 0px` | same |
| **i** | flip `inset` → outward (**the correct fix**) | same — the gate cannot tell the bug from the cure |

Mutation (i) is the indictment: **the gate is equally blind to the defect and to its repair.** The
single mechanism the file's comment claims carries its certified identity through the developed
state is under no test of any kind, in either direction.

A fourth, orthogonal to the ring: the rail's `background` shorthand precedes `backgroundColor` in the
style object (XC-11); swapping the two keys resurrects the born-RED `var(--muted)` rail — that one
*is* caught, because the census reads exactly the property it changes. The gate holds the property it
looks at and nothing else.

**Proposed cure.** Extend the extract graphics leg with a **developed** state: upload a fixture
image, then assert (a) the rail's ring colour against the sampled gradient at its own extrema ≥3:1,
and (b) that a rail with a `box-shadow` of `none` fails. `e2e/` is not under the glass pin — this
lands now, ahead of the consumer wave, and turns XC-1 into a born-RED gate instead of a claim.

---

## XC-6 · MAJOR — Reset is disabled in exactly the state where it is the only way out

**NEW this pass.**

`ExtractControls.vue:84` — `:disabled="disabled || !hasImage"`. But the state Reset restores is fully
mutable *without* an image. `useExtractSession.ts:180-184`:

```js
function onReset() {
    colorCount.value = 5;
    chromaWeight.value = 0.5;
    if (lastFile.value) runQuantize();
}
```

It resets two refs and only re-quantizes **if a file exists** — the function is already safe with no
image. Meanwhile both sliders are live pre-image by design: `e2e/smoke/oracles/o9-shadow-palette.spec.ts:147-155`
asserts the ShadowPalette re-segments 5 → 6 → 5 under the k slider with no image loaded, and
`ExtractWorkbench.vue:159` binds `:count="session.colorCount.value"` to prove it. The instrument
*advertises* that k is meaningful before development.

**Reproduction (`evidence/pass-3/xc3-probe1.txt`).** Load `/#/extract`, focus the k slider, press
`End` (k → 16, no image), then read the Reset control:

```
=== RESET pre-image, k=16 ===
{ "disabled": true, "ariaDisabled": "true" }
```

The user has moved k from 5 to 16, the ghost has re-segmented to prove it took effect, and the
control whose entire job is to put it back is greyed out. The only route to k=5 is dragging back by
hand — and `chromaWeight`, which has no ghost feedback at all, is likewise stranded at whatever the
user left it.

**Mechanism.** The gate condition (`!hasImage`) was written for the *re-quantize* side effect, not
for the state the action owns. The composable already separates them; the template does not.

**Proposed cure.** `:disabled="disabled || (k === 5 && chromaWeight === 0.5)"` — disable Reset when
there is nothing to reset, which is the true predicate, and which is *also* correct post-image.
`hasImage` then has no consumer in this file and the prop dies with it (one fewer prop, edict 3).

---

## XC-7 · MAJOR — Reset does not cancel the pending debounce: one intent, two identical worker jobs (corroborates pass-2 C2-3)

Reproduced independently by instrumenting `Worker.prototype.postMessage`
(`evidence/pass-3/xc3-probe3.mjs`). Press `ArrowLeft` on the k slider (arms
`debouncedReQuantize`'s 300 ms timer, `useExtractSession.ts:159-162`), then click Reset 60 ms later
(`onReset` calls `runQuantize()` directly, never clearing `debounceTimer`):

```
=== ArrowLeft then Reset within the debounce window — dispatches ===
[ { "t": 9165.000000000002, "k": 5, "cw": 0.5 },
  { "t": 9307,             "k": 5, "cw": 0.5 } ]
```

**Two dispatches, 142 ms apart, byte-identical payloads.** On the 1600×1600 fixture that is a
complete redundant k-means pass over 2.56 M pixels.

The compounding harm, which pass 2 files as C2-4: `useImageQuantize.ts:51-52` holds a **single**
`pendingResolve`/`pendingReject` slot, overwritten at `:90-91` on every dispatch. The second job
orphans the first — its promise never settles, in either direction, for the lifetime of the page.
One user gesture leaks one permanently-pending promise.

**Proposed cure.** One scheduler owns the timer: `requestQuantize({ immediate })`, with
`onReset`/`onFile` taking the immediate path *through* it so the pending timer is cleared by
construction rather than by remembering to. Composable-side, unpinned, lands now.

---

## XC-8 · MINOR — the accessible name lands on two nodes, one of them a roleless generic

`glass-ui`'s `Slider` reads `$attrs["aria-label"]` and forwards it to the thumb — but the component
does not declare `inheritAttrs: false` (`slider-DzqeQmMu.js`: the definition carries only
`[["__scopeId", …]]`), so the same attribute *also* falls through to `SliderRoot`.

**Measured (`evidence/pass-3/xc3-probe2.txt`):**

```
{ "label": "Number of colors", "tag": "span", "cls": "glass-slider.relative",
  "role": null, "valuenow": null, "tabindex": null, "w": 434, "h": 24 },
{ "label": "Number of colors", "tag": "span", "cls": "slider-thumb.glass-specular-track",
  "role": "slider", "valuenow": "5", "valuemin": "1", "valuemax": "16", "tabindex": "0",
  "w": 12, "h": 24 },
```

Both sliders, both schemes. ARIA 1.2 §5.2.8 prohibits `aria-label` on `role="generic"`; the
434×24 root span is exactly that. **This is a glass-ui defect, not a consumer one** — the consumer's
`aria-label` is the documented input — but it changes what the consumer's attribute does and belongs
in the Glass 8 relay.

The 12×24 thumbs are the two `smallTapTargets` this component contributes to the route
(`REPORT.json`: `{"w":12,"h":24,"tag":"span","label":"Number of colors"}` desktop, `{"w":12,"h":44}`
mobile). Also a glass-ui recipe (`.glass-slider[data-variant=spectrum] .slider-thumb { width:
calc(var(--slider-thumb-size,1rem) * .75) }`), not this file's markup — the full 24px-tall track is
click-to-position, so the *effective* target is larger than the measurement, but the measurement is
what the census reports and it is glass-ui's to answer.

---

## XC-9 · MINOR — two `<label>` elements that label nothing

**Measured (`evidence/pass-3/xc3-probe1.txt`):**

```
=== ORPHAN LABELS ===
[ { "text": "16", "htmlFor": null, "controlInside": false, "title": null },
  { "text": "kC", "htmlFor": null, "controlInside": false, "title": "Chroma weight" } ]
```

`ExtractControls.vue:15-17` marks the k **readout** as a `<label>` with no `for` and no nested
control — it is a value display wearing a labelling element, contributing a stray "16" to the
accessibility tree that names nothing. `:66` does the same for `kC`, and puts the only expansion of
that abbreviation in `title` — invisible on touch, exactly as XC-4.

**Cure.** `<span>` for the k readout (it is a readout); `<abbr title="Chroma weight">kC</abbr>` or a
visible `aria-hidden` glyph paired with the slider's existing `aria-label`, which already carries the
full phrase.

---

## XC-10 · MINOR — three identical per-instance style overrides (edict 5)

`:42`, `:51`, `:86` each carry `:style="{ '--btn-hover-color': cssColor }"` — the same custom
property, the same value, pinned three times on three sibling instances. Owner edict 5: *"Style
changes at shadcn root component level, not per-instance overrides."* Custom properties inherit; one
declaration on the controls row (`:39`) reaches all three and any control added later. Three object
literals also become one, which matters because `cssColor` is the live pick and each render allocates
all three afresh.

---

## XC-11 · MINOR — a load-bearing, undocumented style-object key ordering keeps a born-RED value alive

`:22` sets `background` (shorthand) **then** `backgroundColor` (longhand). Vue's `patchStyle`
iterates the object in insertion order, so the longhand wins — which is the only reason the
pre-image rail is not painted `var(--muted)`.

**Measured (`xc3-probe1.txt`, pre-image):** `"backgroundImage": "none"`, `"backgroundColor":
"oklch(0.545141 …)"`. The `background` shorthand received the literal string `var(--muted)`
(`useExtractSession.ts:103`), reset `background-image` to `none`, and was then overwritten.

So `kSliderGradient`'s degenerate branch is **dead code that can never render** — and the value it
returns is `var(--muted)`, the *exact* material the T-44a remediation was opened to kill (this file's
own born-RED record, `:119-122`: 1.88:1 light / 1.85:1 dark). It survives in the composable, held
harmless only by an implicit ordering with no comment and no test. Reversing two keys in a style
object is a plausible tidy-up; it reinstates the owner's "un-readable" sliders.

**Cure.** The degenerate should be a *state*, not a colour string: return `null` and branch the
template, or return `"none"` and let `backgroundColor` be the sole colour authority. Composable-side,
unpinned.

---

## XC-12 · INFO — a guard that does not guard

`:33` and `:76`: `(v: number[] | undefined) => v && $emit('update:k', v[0]!)`. An empty array is
truthy, so the guard rejects only `undefined`; for `[]` it passes and `v[0]!` asserts a value that is
`undefined`, emitting `update:k: undefined` → `colorCount.value = undefined` → `ShadowPalette
:count="undefined"`. **HYPOTHESIS — not reproduced.** reka-ui's `SliderRoot` is not observed to emit
`[]`. The finding is that the defence is written as if it could, and the non-null assertion is a lie
in precisely the case the guard was written for.

---

## XC-13 · INFO — no `aria-valuetext` (corroborates pass-2 C2-7)

Measured: `"valuetext": null` on both thumbs, all schemes (`xc3-probe2.txt`). A screen reader
announces "Chroma weight, 0.5" for a control ranging 0–1.5 with no unit and no meaning. Pass 2 files
this as MAJOR against a ratified repo law; I record only my independent measurement.

---

## Local hazards and prior-pass claims — checked, NEGATIVE

Findings I looked for, tested, and did **not** find. Each is a positive measurement, not an absence
of effort.

| hazard | result | evidence |
|---|---|---|
| `defineModel` stale-read | **absent by design.** The component emits `update:k` / `update:chromaWeight` and holds no local state — the async round-trip hazard cannot arise. The safer pattern, deliberately. | `:33`, `:76`, `:127-133` |
| `w-5` clipping the k readout at "16" | **FALSE.** `clientW: 20, scrollW: 20, OVERFLOWS: false` at k=16. | `xc3-probe1.txt` §LABELS @ k=16 |
| `w-5` clipping the kC readout at "1.5" | **FALSE.** `clientW: 20, scrollW: 20` at every step 0.0–1.5. | `xc3-probe2.txt` §kC walk |
| float accumulation on the 0.1-step kC slider | **FALSE.** `aria-valuenow` walks `0, 0.1 … 1.4, 1.5` exactly across 16 keypresses; no `0.30000000000000004`. | `xc3-probe2.txt` |
| `parseCssColor` crash class (R1) reaching `trackInk` | **not a bug here.** `certifyAccentInk` returns the input unchanged on parse failure — and that passthrough is *tested intent*: `test/ink.test.ts:199` `expect(certifyAccentInk("not-a-color", 0.5)).toBe("not-a-color")`. (Pass-2 C2-8 raises the *throwing* paths separately; that finding stands and is not re-litigated here.) | `ink.ts:135`, `test/ink.test.ts:199` |
| Reset lacks a disabled affordance | **FALSE.** `disabled: true`, `aria-disabled: "true"`, `opacity: 0.5`, `cursor: default` when gated. | `xc3-probe4.txt` |
| DockControl tap targets < 24px | **FALSE.** All three measure **40×40**. | `xc3-probe4.txt` |
| ungated rAF loop (PRM-RAF epidemic) | **absent.** No `requestAnimationFrame`, no timer, no observer, no listener in the file. It is purely presentational. | whole-file read |
| leaked listeners / missing cleanup | **absent.** Nothing to clean up; no `onMounted`/`onBeforeUnmount` in the file. | whole-file read |
| WebGL / eager boot on the critical path | **absent.** Zero canvas or GL. Route console errors: **0**; page errors: **0**. | `REPORT.md:122,137,152,167`; `xc3-probe1.txt` |
| `ValueUnit` nesting accumulation | **absent.** No `ValueUnit` construction anywhere in the reachable graph. | whole-file read |
| reka-ui pointer-capture leak needing `pointercancel` recovery | **not this component's.** glass-ui's `Slider` installs `pointerup`/`pointercancel`/`blur` teardown in `useDockHold` and removes them in `onBeforeUnmount`. | `slider-DzqeQmMu.js` |
| gradient stop collision at k=16 (`pct.toFixed(0)`) | **FALSE.** 0,7,13,20,27,33,40,47,53,60,67,73,80,87,93,100 — strictly monotonic, no duplicates. | `useExtractSession.ts:105-110` |
| horizontal overflow on the route | **0** in all four matrices. | `REPORT.md:122,137,152,167` |

---

## Edict scorecard

| # | edict | verdict |
|---|---|---|
| 1 | no god modules | **PASS** — 151 lines, one job, no god module touched |
| 2 | no legacy code | **NEAR-PASS** — no shims; but XC-11's dead `var(--muted)` degenerate is a survival of the pre-cure material |
| 3 | KISS, no contrivance | **NEAR-PASS** — no new dirs/wrappers; `hasImage` becomes a redundant prop under XC-6's cure |
| 4 | glass-ui is the design system | **PASS** — `DockControl`/`DockSeparator`/`Slider` consumed from glass-ui; `demo/ui/slider/index.ts` is a one-line re-export, not a fork. XC-1's hand-rolled rail div is a *near*-miss (pass-2 C2-9 files it) |
| 5 | root-level styling | **FAIL** — XC-10, three identical per-instance overrides |
| 6 | animations never deleted | **PASS** — no keyframes touched; the file adds none |
| 7 | idiomatic Vue 3.5 | **PASS** — reactive props destructure (`:103`), no `useTemplateRef` needed, `defineModel` correctly avoided |
| 8 | `verbatimModuleSyntax` | **PASS** — all six imports are value imports (`computed`, three icons, two components, one composable, one const); no type-only import is miswritten |

---

## Blocked wave — `W·XC3-EXTRACT-CONTROLS`

The subject is PINNED at SHA-256 `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28`
(verified above). **No source edits land from this formation.**

### Exact release condition

The wave opens when **all four** hold:

1. `@mkbabb/glass-ui@8.0.0` is published and the value.js dependency range admits it;
2. the glass **BJ W4 hold** is lifted by its owner (the pin is BJ's, not this tranche's);
3. `shasum -a 256 demo/workbenches/extract/ExtractControls.vue` **still equals**
   `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` at wave open — any drift means
   the file changed under the hold and the wave **re-audits before it executes**;
4. XC3-0 (below) is GREEN — the gate lands *before* the cure, so XC-1 is born-RED, not
   born-asserted.

### Steps, ordered by what the pin actually blocks

| # | cures | change | pinned-file edits | blocked by |
|---|---|---|---|---|
| **XC3-0** | XC-5 | extend the o18 extract graphics leg to a **developed** state: upload a fixture, sample the rail's ring against its own gradient extrema, assert ≥3:1; add killing-mutation coverage for (g)(h)(i) | **none** — `e2e/` is unpinned | **nothing — lands now** |
| **XC3-1** | XC-1 | delete the keyword `inset` from `:22` | 1 word | pin only |
| **XC3-2** | XC-2, XC-3 | bind `:disabled="disabled"` on Upload, Camera, and both Sliders | 4 attributes | pin only |
| **XC3-3** | XC-4 | add `aria-label` beside `title` on all three DockControls, matching `DockBackgroundToggle` | 3 attributes | pin only |
| **XC3-4** | XC-6 | `:disabled="disabled || (k === 5 && chromaWeight === 0.5)"`; retire the `hasImage` prop and its parent binding | 1 binding + 1 prop | pin only |
| **XC3-5** | XC-9 | k readout `<label>` → `<span>`; `kC` `<label>` → `<abbr>` | 2 elements | pin only |
| **XC3-6** | XC-10 | hoist `--btn-hover-color` to the controls row; delete 3 per-instance `:style` | 4 lines | pin only |
| **XC3-7** | XC-3 (workbench half) | idempotent `startCamera`, release-in-`catch`, `onScopeDispose` ownership | **none** — `ExtractWorkbench.vue` is not pinned | pin does not block; sequenced after XC3-2 so the two halves land together |
| **XC3-8** | XC-7, XC-11 | one `requestQuantize({ immediate })` scheduler; `kSliderGradient` degenerate → explicit state | **none** — composables unpinned | nothing |
| **XC3-9** | XC-8, XC-13 | consume Glass 8's `inheritAttrs:false` Slider + `aria-valuetext` prop; re-measure the 12px thumb | 1 (attr only) | **genuinely requires Glass 8** |

**The distinction that matters for scheduling:** only **XC3-9** needs a glass-ui *release*. XC3-1
through XC3-6 need nothing from glass-ui at all — they are eleven attributes and one deleted keyword
in a file that is frozen for reasons unrelated to any of them. XC3-0, XC3-7 and XC3-8 are unblocked
entirely and should land ahead of the hold, which puts a born-RED gate under XC-1 and closes the
camera leak before the pin ever lifts.

**Relay to glass-ui BJ (standing formation invariant).** XC-8 (`inheritAttrs:false` on `Slider` —
`aria-label` currently duplicates onto a roleless generic, ARIA 1.2 §5.2.8), XC-13 (`aria-valuetext`
pass-through), the 12×24 spectrum thumb versus the 24×24 target floor, and a note that
`DockBackgroundToggle`'s `aria-label` + `title` pairing should be the documented `DockControl`
contract rather than an internal habit.

---

## Strongest defect

**XC-1.** The component's longest comment specifies a certified identity edge that "survives OUTWARD
… in every state"; line 22 writes `inset`, which paints that edge onto the palette gradient while
its certification was computed against the resting plate. Measured: **1.000:1 pre-image** (ring
colour byte-identical to the fill it sits on) and **max 2.673:1 anywhere along its run in light**,
never reaching the 3:1 floor the comment itself invokes — with a **1.002:1** stretch where it is
simply not there. The gate the comment cites as its authority reads `backgroundColor` and nothing
else, so it cannot distinguish the defect from its one-word repair.

The cure is to delete four characters, and the reason that is the *right* cure rather than a patch is
that it does not add a guarantee — it moves the ring back onto the surface the guarantee was already
computed for.
