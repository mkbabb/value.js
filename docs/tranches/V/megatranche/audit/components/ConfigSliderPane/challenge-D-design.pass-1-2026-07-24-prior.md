# CHALLENGE-D — `demo/scenes/ConfigSliderPane.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context arm. The seat
was spawned with an explicit Opus 5 declaration and the served tier agrees with the declaration; no
inherited or undeclared seat. Fable was not used at any point in this lane.

---

## 0. Seat, subject, and how the evidence was taken

| Field | Value |
|---|---|
| Subject | `demo/scenes/ConfigSliderPane.vue` (252 lines) |
| Consumers | `demo/scenes/atmosphere/AuroraPane.vue` (201 ln), `demo/scenes/blob/BlobPane.vue` (130 ln) |
| Routes | `/#/atmosphere` (3 rows), `/#/blob` (31 rows) |
| Repo state | branch `tranche-u`, HEAD `c654824e` |
| glass-ui | `@mkbabb/glass-ui@7.0.0` (`node_modules/@mkbabb/glass-ui/package.json`) |
| Tracked frames | `docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,safari-desktop-dark,safari-mobile-light,safari-mobile-dark,forced-colors-desktop,keyboard-focus-desktop,rtl-desktop,rtl-mobile,zoom-200-desktop,reduced-motion-desktop}/{atmosphere,blob}.png` |
| Tracked telemetry | `docs/tranches/V/megatranche/audit/visual/REPORT.md`, `REPORT.json` |
| Live probes (this lane) | `chD-csp-probe.mjs`, `chD-csp-probe2.mjs`, `chD-csp-probe3.mjs` in the session scratchpad; WebKit for render/geometry/contrast, Chromium for `forcedColors`/`reducedMotion` (WebKit does not honour Playwright's `forcedColors`, which is why the tracked `forced-colors-desktop` matrix renders identically to the ordinary light matrix and could not have caught D-1) |

Canon read and applied: `docs/tranches/V/VISUAL-CONSTITUTION.md`,
`docs/tranches/V/PROPORTION-AUDIT.md`, `docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md`,
`docs/tranches/V/PALETTE-CONTRACT.md` (the last contains no slider/ink clause — it is the API/export
contract; the ink and boundary law lives in the first three).

No source edits land from this seat. Nothing outside this directory was written.

---

## 1. Visual truth first — what the frames actually show

### 1.1 `/#/blob`, desktop, light and dark

`shots/safari-desktop-light/blob.png`, `shots/safari-desktop-dark/blob.png`

The route named "Blob" renders a **Picker on the left and a settings stack on the right**. There is
no blob. Measured at 1440×900 after a 3.5 s settle, the only `<canvas>` on the route is the
full-viewport atmosphere background:

```
blobCanvases: [{ cls: "atmosphere-canvas absolute inset-0 …", w: 1440, h: 900 }]
paneWidth: 512   vw: 1440      → the ConfigSliderPane inspector is 35.6% of the viewport
```

The only blob paint anywhere on the page is the ~90 px bead in the Picker card's top-right corner —
the Picker's inline seat. `VISUAL-CONSTITUTION.md:214` forbids exactly that substitution: *"The
dedicated Blob workbench owns a persistent container-scaled material preview filling P122's exact
`preview-dominant` 66.6666667% stage … **it does not reuse the Picker inline-seat diameter**."*
`OPTICAL-BENCH-COMPOSITIONS.md:47` states the same composition and names its regions
`preview; essentials; advanced/reset/compare`. What ships is `picker; flat 31-slider list; copy+reset`.

Inside the pane the dominant visual objects are **not the labels, not the section headings, and not
the values — they are the slider tracks**. Each is a 432×24 px solid charcoal slab in light mode and
a solid near-white slab in dark mode. Every one of them reads as a bar filled to 100%, with a small
hollow pill notched into it at an arbitrary position. `Body Radius 0.220` and `Satellites 3` are
visually indistinguishable bars.

### 1.2 `/#/atmosphere`, desktop light

`shots/safari-desktop-light/atmosphere.png`

The pane *is* the route: it occupies a 1042 px wrapper of a 1440 px viewport (**72.4 %**) with **zero
preview region**. `VISUAL-CONSTITUTION.md:31` law 3: *"Configuration panes show preview first,
controls second. Atmosphere/Blob preview area is larger than the form at every desktop size."*
`PROPORTION-AUDIT.md:54` PR-10 is the standing register row for it: *"Atmosphere/Blob form acreage
exceeds preview → **TIGHTEN** … Preview first/larger; compact essentials; confined disclosure."*
The pane is the mechanism by which PR-10 is still open, and 72.4 % also exceeds
`VISUAL-CONSTITUTION.md:27` law 1's outer protagonist bound (61.8–66.7 %).

Three full-bleed ~962×24 px charcoal bars run across a soft pink/cream glass composition. They are
the heaviest and second-most-contrasty objects in the frame. `0.760`, `0.500` and `6` produce three
bars that look identical.

Above them, four control rows (`HARMONY / ARRANGEMENT / MEDIUM / MOTION`) render in **Fira Code
uppercase at the same size as the section heading `FIELD`** — see §4 — and their select triggers
start at four different x-coordinates because the row is `justify-content: space-between`
(`AuroraPane.vue:187–191`). Four labelled rows, four ragged control edges, no column.

### 1.3 `/#/atmosphere`, mobile dark — the worst frame in the set

`shots/safari-mobile-dark/atmosphere.png`

At 390 px the four enum selects consume ~55 % of the vertical stage; the three numeric axes — the
actual subject of the pane — get ~20 % and are **amputated mid-row**: `Noise 0.500` is visible and
its control is not, cut off by a hard edge with no fade, no shadow, no scroll affordance.

The single visible track is a near-white slab measured at **8.3 : 1 against the well** — brighter
than the `Atmosphere` display title, the brightest object on the screen — with a black-outlined
transparent thumb sitting on it. Figure and ground are inverted: the inert background reads as the
filled value and the handle reads as a hole punched in it.

### 1.4 `forced-colors-desktop` — the pane's controls cease to exist

The tracked `shots/forced-colors-desktop/blob.png` is **not** a forced-colors render (WebKit ignores
the emulation; the frame is byte-comparable to the ordinary light frame). Re-taken under Chromium
with `forcedColors: "active"` — see `scratchpad/chD-csp-forced-focus.png`:

```
forcedActive: true
trackBg:  rgb(255,255,255)
wellBg:   rgb(255,255,255)
trackEqualsWell: true          → track/well contrast 1.00 : 1
trackBorderStyle: solid,  trackBorderWidth: 0px
rangeBg:  rgba(0,0,0,0)        rangeW 731 of trackW 962
```

The rendered result: `Colour Energy 0.760`, then a **blank white row containing one floating pill
outline**. No track, no extent, no fill. Three orphan outlines with nothing to slide along. The one
element that *does* survive forced colors is the section rule under `FIELD` — forced to CanvasText —
i.e. the boundary the canon forbids is the only thing that reads, while the control extent the canon
requires disappears. That is a precise inversion of the design priority.

### 1.5 `rtl-desktop`

`shots/rtl-desktop/blob.png`. The pane mirrors to the left, labels right-align, and the label/value
pair reverses to `0.220 Body Radius`. The **track does not mirror**: in both LTR and RTL the
`Body Radius` thumb sits at 38 % from the *visual left*, so in RTL the value reads 62 % from the
inline-start. `VISUAL-CONSTITUTION.md:124` rules that the numeric slider axis does not mirror its
sign, so the un-mirrored geometry is arguably intended — but the row's text pair *does* mirror, so
the row is half-mirrored and the reading order (`value → label → track that fills away from
inline-start`) is incoherent. Separately the action order flips, promoting the destructive **Reset**
to the leading action — an ordering that was never designed for either direction.

### 1.6 `zoom-200-desktop` and `keyboard-focus-desktop`

`zoom-200-desktop` is captured as a 720×450 CSS viewport at DPR 2
(`visual/states.mjs:21–22`), i.e. below the pane's breakpoint — the frame shows the mobile Dock with
a `Picker | Blob` toggle and **no configurator at all**. See D-2.
`keyboard-focus-desktop/blob.png` parks focus in the Dock and therefore says nothing about the
pane's own focus states; those were measured directly instead (D-1, §3).

---

## 2. Verdict

**DEFECTIVE.** Twenty-one findings, three of them BLOCKER. The component's controlling defect is a
single mechanism: **the slider's value is carried by nothing but a 12 px transparent thumb, while the
inert track is painted from a body-text ink token at 5.8–8.3 : 1.** Everything that reads loudest in
the pane is the part that carries no information, and the part that carries the information is the
faintest thing in the row. Around that centre sit a forbidden Card stack, eight forbidden dividing
lines, a type jurisdiction in which a group heading and a control label are computed-identical, a
"container-scaled rhythm" that is measurably inert, a required essentials/advanced disclosure the
prop shape cannot express, and — below 1024 px — the total absence of the component from the route
whose name it carries.

---

## 3. Findings

Severity key: **BLOCKER** = ships a broken or unusable state; **MAJOR** = violates a binding canon
clause or destroys designed information; **MINOR** = local; **INFO** = record.

---

### D-1 — BLOCKER — In forced-colors the control extent is 1.00 : 1 and the focus ring is gone

**Evidence.** Chromium, `forcedColors: "active"`, `/#/atmosphere`, 1440×900
(`scratchpad/chD-csp-probe2.mjs` → `forcedFocus`):

```
trackBg rgb(255,255,255) === wellBg rgb(255,255,255)   trackEqualsWell: true
trackBorderWidth 0px      rangeBg rgba(0,0,0,0)
outlineStyle: "none"   outlineWidth: "3px"   boxShadow: "none"   forcedColorAdjust: "auto"
```

Frame: `scratchpad/chD-csp-forced-focus.png`.

**Mechanism.** `ConfigSliderPane.vue:202` routes the track's *entire* visual definition through one
custom property consumed by `background`:

```css
--slider-track-bg: var(--ink-muted, var(--muted-foreground));
```

Forced-colors overrides `background-color` to `Canvas`. The producer recipe
(`glass-ui.css`, `.slider-track { background: var(--slider-track-bg, var(--muted-medium)) }`) has no
border and the `spectrum` variant's `.slider-range` paints nothing, so once the background is
overridden there is no second channel left. WCAG 1.4.11 requires ≥ 3 : 1 for the extent of a
user-interface component; measured 1.00 : 1.

The focus indicator fails by the same single-channel logic: `outline-style: none` with the ring
delivered as `box-shadow`, and forced-colors strips shadows. `VISUAL-CONSTITUTION.md:84`:
*"Focus remains visibly distinct from selection in both schemes, **forced colors** and reduced
transparency."* The component adds no `@media (forced-colors: active)` arm; `grep -rn "forced-colors"
demo/` returns zero hits under `demo/scenes/`.

The comment at `:190–201` asserts this override *is* the WCAG 1.4.11 cure ("`--ink-muted` … is ≥3:1
on the well **by construction**"). It is ≥3 : 1 only in the two schemes the census measures. In the
third rendering mode it is 1.00 : 1 — and the override is the cause, not a bystander: the producer
default `--muted-medium` would have failed identically, but the pane chose to solve the problem in
the one channel forced-colors owns.

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs` (Chromium arm), or Chrome →
`Rendering → Emulate CSS forced-colors: active` → `http://localhost:9000/#/atmosphere`.

**Cure.** Stop expressing the track through `background` alone. Consume the producer's neutral
`Slider` variant so `.slider-range` paints the value (D-3), and let the producer own a
forced-colors arm on the primitive: `border: 1px solid` on `.slider-track`, `.slider-range
{ background: Highlight; forced-color-adjust: none }`, and `outline` (not `box-shadow`) for
`:focus-visible`. That is a glass-ui `Slider` change, not a demo one — edict 4. Delete
`ConfigSliderPane.vue:202` and `:204–206` in the same cut.

---

### D-2 — BLOCKER — Below 1024 px the Blob configurator does not exist

**Evidence.** Breakpoint sweep on `/#/blob`, WebKit, `scratchpad/chD-csp-probe3.mjs`:

| viewport | `.config-console` | rows |
|---:|---|---:|
| 1440 | present | 31 |
| 1280 | present | 31 |
| 1100 | present | 31 |
| 1024 | present | 31 |
| **1000** | **absent** | **0** |
| 900 | absent | 0 |
| 768 | absent | 0 |
| 600 | absent | 0 |
| 390 | absent | 0 |

Corroborated by the tracked capture: `REPORT.json` `safari-mobile-light /#/blob` reports
`bodyTextLength: 69`, `allElements: 228`, and small-tap-target labels limited to
`L/A/B/ALPHA channel` — versus `713 / 642` and 31 slider labels on desktop. The screenshot
`shots/safari-mobile-light/blob.png` shows the Picker plus a Dock `Picker | Blob` segmented toggle
with **Picker** selected. `shots/zoom-200-desktop/blob.png` is the same state.

**Mechanism.** The pane has no narrow arm of its own; it inherits whatever the route shell does, and
below `lg` the shell substitutes a global pane toggle. That toggle is a *named live defect*:
`OPTICAL-BENCH-COMPOSITIONS.md:115` — *"A frame showing … **global pane toggle** … is a live defect
and returns to its named owner."* `VISUAL-CONSTITUTION.md:32` law 6 — *"no global pane selector,
left/right split state, or simultaneous two-stage miniature survives."*

The design consequence is the finding: the sole purpose of `/blob` is to tune the blob, and at
mobile widths and at 200 % zoom the tuning surface is not in the document. The pane's *other*
consumer — `/atmosphere` — renders fine at 390 px (`rowCount: 3`), so the two consumers of one
generic pane have divergent, unspecified narrow behaviour. A responsive state this asymmetric was
never designed; it fell out of the shell.

**Reproduction.** `http://localhost:9000/#/blob` at 1000 px wide, or at 1440 px with browser zoom
200 %.

**Cure.** The pane must own its narrow composition instead of inheriting a toggle. Per
`OPTICAL-BENCH-COMPOSITIONS.md:47` the mobile sequence is `preview; essentials; advanced/reset/
compare` in one document-scrolling stage. That means the pane exposes an `essentials` region that is
always rendered and an `advanced` disclosure — which is D-9 — and the shell's `Picker|Blob` toggle
dies. Owner: W29 (Blob body) with W19 (Dock) deleting the toggle.

---

### D-3 — BLOCKER — No slider in the pane shows its value; the track reads as 100 % filled

**Evidence.** `/#/atmosphere`, 1440×900, `Colour Energy` at 0.760 (range 0–1), WebKit:

```
.slider-track   width 962   height 24px   backgroundColor oklch(0.4469 0.0039 34.63)   backgroundImage none
.slider-range   width 731   backgroundColor rgba(0,0,0,0)   backgroundImage none   opacity 1
[role=slider]   w 12   h 24   backgroundColor rgba(0,0,0,0)   ::before border 0px
```

`.slider-range` is **correctly sized** (731 of 962 = 76.0 %, exactly the value) and **paints
nothing**. The value is therefore carried by a 12 × 24 px transparent span whose only visible
substance is a hairline outline. Identical in dark (`contrast-dark`) and at 390 px.

Measured contrast, sRGB round-trip through a 1×1 canvas (`chD-csp-probe2.mjs`):

| | light | dark |
|---|---:|---:|
| track vs well | **5.82 : 1** | **8.30 : 1** |
| live readout ink vs well | 5.82 : 1 | 8.30 : 1 |
| section heading vs well | 5.08 : 1 | 5.97 : 1 |
| row label vs well | 13.52 : 1 | 9.28 : 1 |

The track and the readout are the **same colour token**, so a 962 × 24 px inert surface and an
11 px live number carry identical emphasis. The result is what the frames show: an unfilled track
that looks full.

**Mechanism, two joined choices.**

1. `ConfigSliderPane.vue:146` sets `variant="spectrum"`. The `spectrum` variant is the producer's
   *chromatic rail* recipe: its `.slider-range` is transparent by design because a colour gradient
   supplies the value read. The component's own comment admits it (`:198–199`: *"the spectrum
   `.slider-range` is transparent by recipe so no filled/unfilled split reads either"*) and ships
   anyway. `VISUAL-CONSTITUTION.md:7` reserves that material: *"the **spectral meniscus**: a
   continuous liquid-color rail reserved for genuinely chromatic continuous domains — Picker and
   Gradient."* `Body Radius`, `Smooth K`, `Rim Power`, `Merge (ms)` are not chromatic domains.
2. `:202` then re-inks the now-information-free track with a body-ink token to satisfy a contrast
   census, which makes the empty channel the loudest one.

So the pane picked the wrong variant, lost the filled/unfilled split, and cured the *symptom*
(low-contrast track) in a way that amplified the *disease* (no value read).

**Reproduction.** Any arm. `http://localhost:9000/#/blob`, compare `Satellites 3` and
`Body Radius 0.220`: two visually identical bars.

**Cure — architectural, not a patch.** Drop `variant="spectrum"`; consume the producer's default
neutral `Slider` so `.slider-range` paints the filled extent from the producer's own tokens. Then
`--slider-track-bg` (`:202`) and the `:deep(.configurator-row .font-mono)` re-ink (`:204–206`) both
delete, because the contrast problem they were invented for stops existing: the *fill* becomes the
≥3 : 1 object and the track returns to being a quiet ≥3 : 1 groove. This is also the one cure that
fixes D-1, D-4 and D-14 — they are one mechanism family.

---

### D-4 — MAJOR — A text-ink token used as a 962 × 24 px area fill

**Evidence.** `:202` assigns `--ink-muted` — described in the repo's own canon as *"the certified
de-emphasis rung … the boot-stamped floor-clamped plate ink, ≥4.5 on the composited resting plate"*
(`demo/shared/ui/PaneHeader.vue`, `.pane-header-desc` comment) — to a background. Measured
consequence: the track is 5.82 : 1 (light) / 8.30 : 1 (dark) against the well; the row label is
13.52 : 1 / 9.28 : 1. The inert track therefore sits within one stop of the *label* in dark mode.

**Mechanism.** Text ink is specified for a few-hundred-square-pixel glyph mass at ≥ 4.5 : 1.
Applied to ~23 000 px² of continuous surface it is a completely different optical object: it does not
read as "a groove at adequate contrast", it reads as "a painted bar". `VISUAL-CONSTITUTION.md:14–16`
separates the tiers exactly here — *"Instrument veil … denser neutral veil"*, *"Specimen well …
opaque/quiet neutral stage"* — and `:21` adds *"Dark chrome uses the restrained neutral pole."*
A near-white 8.3 : 1 slab in dark mode is not the restrained pole.
`PROPORTION-AUDIT.md:73` law 8: *"Real rendered relation wins over token intent. Adjacent rungs,
measured rects and ink gaps appear in DELTA; **token presence alone cannot close a row**."* The
comment at `:190–201` closes its row on token presence.

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs`; read `contrast-light` / `contrast-dark`.

**Cure.** Fold into D-3. The track's material belongs to the producer's `Slider` neutral recipe at
its own graphics rung; if that rung is genuinely below 3 : 1 on `--well-bg`, the fix is a glass-ui
`--slider-track-*` token pair sized for area, not a consumer re-ink from the text ladder.

---

### D-5 — MAJOR — 31 sub-minimum targets on desktop; the hit-area cure is gated to touch only

**Evidence.** `REPORT.json`, `safari-desktop-light /#/blob`, `a11y.smallTapTargets` — 39 entries, of
which **31 are exactly `{w: 12, h: 24, tag: "span"}`** labelled `Body Radius, Satellites, Sat Radius,
Orbit Radius, Eccentricity, Smooth K, Warp, Noise Amp, Noise Freq, Noise Speed, Pulse Freq, Pulse
Amp, Hue Range, Saturation, Brightness, Noise Freq, Noise Speed, Specular, Shininess, Rim, Rim Power,
Iridescence, Sub-surface, Core Glow, Attraction, Strength, Stretch, Click Impulse, Merge (ms),
Emerge (ms), Speed` — i.e. every slider in `BlobPane.vue:54–115`. Identical count in
`safari-desktop-dark`.

Live confirmation: `thumb {w: 12, h: 24}` at 1440 and at 390.

**Mechanism.** `ConfigSliderPane.vue:218–230` supplies a `::before` hit extension, but inside
`@media (pointer: coarse)`. Desktop is `pointer: fine`, so the extension never applies there; the
mobile arm proves the cure works (`REPORT.json` `safari-mobile-light /#/blob` reports channel spans
at `h: 44`, and `/#/atmosphere` mobile rows measure `h 57.59` with the extension live). Two
consequences: the desktop path is uncovered, and on `/blob` the coarse arm is dead code because the
pane is not rendered at coarse-pointer widths at all (D-2).

WCAG 2.5.8 Target Size (Minimum) is 24 × 24 CSS px and is **not** pointer-type-conditional. 12 px on
the inline axis fails. `PROPORTION-AUDIT.md:72` law 7 is the canon's own framing: *"Visual glyph
size, operable target size and layout reservation are separate quantities. Accessibility floors do
not require bloated visible chrome"* — which is precisely the licence to extend the hit area at every
pointer type without growing the 12 px visual thumb.

**Reproduction.** `http://localhost:9000/#/blob` at 1440 px; inspect any `[role="slider"]` in
`.config-console`.

**Cure.** Delete the `pointer: coarse` guard — the extension is unconditional and belongs on the
glass-ui `Slider` thumb, not in a consumer `:deep()` block. `PROPORTION-AUDIT.md:56` PR-12 already
owns this family at W18.

---

### D-6 — MAJOR — Eight dividing lines where the binding inventory says `none`; the rule is scheme-asymmetric

**Evidence.** `/#/blob`, live: `sectionHeaders: 7`, `actionBars: 1` → **8 consumer-authored lines**.
Sources: `ConfigSliderPane.vue:232–235` (`.config-section-header { border-bottom: 1px solid … }`,
one per `SliderSection`) and `:245–251` (`.config-action-bar { border-top: 1px solid … }`).

`OPTICAL-BENCH-COMPOSITIONS.md:80–81`:

```
| Atmosphere | []  | none | none | preview material and confined inspector carry grouping |
| Blob       | []  | none | none | preview material and confined inspector carry grouping |
```

`:90` — *"**Any additional line**, automatic P122 divider, consumer-hidden producer line, terminal
row rule, caster stroke or corner rule **is a defect**."* `PROPORTION-AUDIT.md:49` PR-05 is the
register row (`REMOVE`), and `:69` law 4: *"A divider is retained only when grouping would be
ambiguous without it."* The pane already separates its sections with `gap-5` plus a distinct heading;
the rule is duplicative by the canon's own test.

Worse, the line renders differently by scheme. Measured against the well:

| | light | dark |
|---|---:|---:|
| `.config-section-header` border | **1.08 : 1** | **5.03 : 1** |

`color-mix(in srgb, var(--border) 50%, transparent)` over `--well-bg` is invisible in light and a
hard rule in dark — a 4.7× swing for one element. So the boundary is simultaneously *forbidden* and
*inconsistent*: in light mode it is a wasted 0.375 rem of padding-bottom buying nothing; in dark it
is a crisp rule the inventory prohibits. And under forced colors (D-1) it is the only surviving
element in the pane.

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs` → `contrast-light.dividerVsWell`,
`contrast-dark.dividerVsWell`.

**Cure.** Delete both rules. Grouping is carried by the heading plus interval, which is what the
inventory's `Grouping job` column already specifies. The action bar's separation is carried by the
material change at the well's edge plus the Dock pill's own geometry.

---

### D-7 — MAJOR — Group heading and control label are computed-identical; mono owns a section heading

**Evidence.** `/#/atmosphere`, 1440×900. `.config-section-title` (`ConfigSliderPane.vue:237–243`) vs
`.aurora-row-label` (`AuroraPane.vue:194–199`), all six computed properties compared:

```
fontFamily     "Fira Code", "Fira Code Fallback", "Fira Mono", monospace  ==  same   → true
fontSize       16.4px          ==  16.4px          → true
textTransform  uppercase       ==  uppercase       → true
letterSpacing  1.64px          ==  1.64px          → true
color          rgb(112,89,66)  ==  rgb(112,89,66)  → true
fontWeight     400             ==  400             → true
```

The two CSS blocks are byte-identical in five declarations and the same order:

```css
/* ConfigSliderPane.vue:237  — a SECTION HEADING  */   /* AuroraPane.vue:194 — a CONTROL LABEL */
font-family: var(--font-mono);                          font-family: var(--font-mono);
font-size: var(--type-small);                           font-size: var(--type-small);
text-transform: uppercase;                              text-transform: uppercase;
letter-spacing: var(--tracking-caps);                   letter-spacing: var(--tracking-caps);
color: var(--muted-foreground);                         color: var(--muted-foreground);
```

Consequence in the frame (`shots/safari-desktop-light/atmosphere.png`,
`shots/safari-mobile-dark/atmosphere.png`): `FIELD` (a heading) and `HARMONY` (a control label) are
pixel-identical. A reader cannot tell which text names a group and which names a control.

Second measurement, the hierarchy inside the well:

```
.config-section-title   fontSize 16.4px  (desktop) / 14px (390px)
.configurator-row label fontSize 16.4px  (desktop) / 14px (390px)
.configurator-row value fontSize 11px    (both)
```

**The section heading is exactly the same size as the row labels it groups, at every arm.** Only
family, case and tracking distinguish them — and family is the one axis the canon reserves for
something else.

`VISUAL-CONSTITUTION.md:66–78`, the type jurisdiction table, is *"closed across all eighteen
compositions"* with P019's Picker pair as the sole exception:

| role | required | rendered here |
|---|---|---|
| section heading | `text-heading`, **Plus Jakarta Sans** | Fira Code 16.4 px uppercase |
| control or label | `text-small`, Plus Jakarta Sans, non-bold | Fira Code 16.4 px caps (slot rows) / PJS 16.4 px **weight 500** (well rows) |
| value / code | `text-mono-small` or `mono-caption` | `text-micro` 11 px — neither token |

Three separate breaches of a closed matrix, plus mono used at 16.4 px for a *heading* while the
actual *value* it groups gets mono at 11 px — the provenance voice is louder as decoration than as
data.

Third: the label/value pair does not hold its proportion across the fluid arm. `16.4 / 11 = 1.49` at
1042 px container, `14 / 11 = 1.27` at 358 px, because the label rides a container-fluid producer
token and the value is pinned at 11 px. `PROPORTION-AUDIT.md:15` states the general form of the law
for paired sizes — *"both sizes resolve from that one clamp … rather than only at endpoints"* — and
`:73` law 8 makes rendered relation the test.

**Reproduction.** `node scratchpad/chD-csp-probe3.mjs` → `twoSpecies.identicalRecipe`,
`twoSpecies.secTitles`, `twoSpecies.rowLabels`.

**Cure.** One line of the type matrix per role. Section headings → `text-heading` (Plus Jakarta
Sans), which restores a real size step above the row label. The mono/caps/tracking recipe survives
in exactly one place — the value/provenance voice — and the duplicated `.aurora-row-label` block
dies with the slot (D-13). The value's size token moves to `text-mono-small` and rides the same
container clamp as the label so the pair holds its ratio.

---

### D-8 — MAJOR — A Card + inner well stack on two compositions whose binding rows say Card count 0

**Evidence.** `ConfigSliderPane.vue:17` imports `Card` (a straight re-export of glass-ui `Card` —
`demo/ui/card/index.ts` is one line) and `:99–101` makes it the pane root:

```html
<Card tier="resting" class="w-full min-w-0 h-full relative flex flex-col overflow-hidden">
```

`:122` then nests `.console-well` — an opaque sub-card with its own `1px solid var(--card-edge)` and
`var(--radius-panel)` (`demo/styles/foundation.css:350–354`). Live ancestor walk from
`.console-well` on `/#/blob`: `[{tag: "DIV", m: ["glass-resting"]}]`, `wells: 1`.

`OPTICAL-BENCH-COMPOSITIONS.md:67` — *"the other sixteen compositions have **Card count `0`**."*
Atmosphere and Blob are among the sixteen. `:46` — Atmosphere: *"Landmark-neutral chassis; **form
sections not Cards**."* `:47` — Blob: *"Landmark-neutral chassis; **no settings Card stack**."*
`VISUAL-CONSTITUTION.md:19` — *"One surface has one tier. An inner card is not automatically another
pane of glass."* `PROPORTION-AUDIT.md:66` law 1 — *"A Card houses one bounded object/specimen. A page
region, empty column, inner stage or mere **padding group** does not become a Card by default."*

A configuration form is a page region. It is housed in a Card, which houses a second bordered,
radiused, opaque panel, which houses the rows. That is the "settings Card stack" named and forbidden.
`foundation.css:339–348` concedes the point in its own comment: `.console-well` is an *"INTERIM demo
class — swaps onto the producer `.glass-well` rung when packet P3 ships"* — i.e. the demo re-minted a
producer primitive and booked the swap, which is edict 4 deferred rather than met.

**Reproduction.** `node scratchpad/chD-csp-probe3.mjs` → `blobCounts.paneAncestorGlassClasses`,
`.wells`.

**Cure.** The pane composes `InstrumentChassis`' inspector region directly and drops both shells.
`VISUAL-CONSTITUTION.md:38`: *"value.js composes regions with domain content; it does not clone a
local chassis recipe."* The rows' grouping then comes from the chassis' region interval, which is
also what kills D-6's dividers and D-13's dual indent.

---

### D-9 — MAJOR — The required essentials/advanced disclosure is foreclosed by the prop shape

**Evidence.** The pane's data model, `ConfigSliderPane.vue:27–39`:

```ts
export interface SliderDef  { key: string; label: string; min: number; max: number; step: number }
export interface SliderSection { title: string; defs: SliderDef[] }
```

There is no `essential | advanced` axis, no `collapsed`, no `compare`, no `disabled`, no `unit`, no
`format`. What ships on `/#/blob` is therefore a **flat 31-row list under 7 headings inside a 695 px
window**:

```
scrollHeight 2605   clientHeight 695   overflowing true   → 3.7 screens
maskImage "none"    webkitMaskImage "none"
scrollRegion bottom 799  ==  actionBar top 799            → hard abutment, zero fade
```

`OPTICAL-BENCH-COMPOSITIONS.md:46–47` names the required regions:
Atmosphere `preview; essentials; advanced`; Blob `preview; essentials; advanced/reset/compare`.
`VISUAL-CONSTITUTION.md:51–52` repeats it: *"compact atom essentials plus **scroll-confined advanced
disclosure**"* / *"compact morphology essentials plus scroll-confined advanced disclosure"*, and
`:214` adds *"advanced grouped disclosure, **reset/compare**"*. `PROPORTION-AUDIT.md:54` PR-10:
*"Preview first/larger; **compact essentials; confined disclosure**."*

None of the three regions exist, and no consumer can create them, because the prop shape has no
vocabulary for them. This is the difference between a missing feature and a design defect: the
component's API makes the canonical composition unrepresentable.

The `maskImage: none` measurement also falsifies the component's own comment at `:104–106` — *"The
scroll region owns the fade mask + overflow"* — and the class name `pane-scroll-fade`. That class
(`PaneHeader.vue`, unscoped block) sets only `contain` and `scroll-timeline: --pane-scroll`; there has
never been a fade. The visible result is the amputation in `shots/safari-mobile-dark/atmosphere.png`:
content is sliced at a hard edge with no affordance that more exists.

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs` → `scrollRegion`.
Visual: `http://localhost:9000/#/blob` at 1440×900, look at the bottom of the well.

**Cure.** `SliderSection` gains a disclosure disposition, e.g.
`{ title: string; rank: "essential" | "advanced"; defs: SliderDef[] }`, with `advanced` sections
composed into glass-ui's existing `configurator` disclosure surface (the producer already ships
`.configurator-layer-region` with a PRM-guarded `grid-template-rows` transition — `glass-ui.css`).
`compare` and a real `reset` land as the pane's action region per `OPTICAL-BENCH-COMPOSITIONS.md:47`.
Owner: W28 (Atmosphere) / W29 (Blob).

---

### D-10 — MAJOR — Two actions, zero result state, no confirmation, no way back

**Evidence.** `ConfigSliderPane.vue:88–94`:

```ts
async function copyAsJson() { await writeClipboard(JSON.stringify(config, null, 2)); }
function resetDefaults()   { Object.assign(config, structuredClone(defaults)); }
```

Live, `/#/blob`: `actions.btns` = `[{text:"Copy JSON", aria:null, disabled:false}, {text:"Reset",
aria:null, disabled:false}]`. `actions.liveRegions` finds four regions on the whole route and all
four are the Picker's channel meters at `aria-live="off"`. **The pane emits no status region at all.**

- **Copy JSON** has no success state, no failure state, no pending state. `writeClipboard` can reject
  (permissions, non-secure context, Safari user-gesture rules); `@click="copyAsJson"` on an `async`
  function means a rejection is an unhandled promise rejection with zero user-visible consequence.
  Every other clipboard call site in `demo/` at least marks intent with `void writeClipboard(...)`
  (`demo/picker/ColorPicker.vue:325`, `demo/shell/dock/ColorInput.vue:222`,
  `demo/palettes/usePaletteActions.ts:134`); this one does neither.
  `VISUAL-CONSTITUTION.md:101`: *"Persistent operation state stays with the entity/workspace. A
  transient flourish may celebrate success but **never carries the only truth**."* Here there is no
  truth at all. `PROPORTION-AUDIT.md:52` PR-08 is the standing register row (`ADD-AFFORDANCE`).
- **Reset** is destructive, unconfirmed, and irreversible. It overwrites 31 live atoms with no
  confirmation, no undo, and no `compare` — which
  `OPTICAL-BENCH-COMPOSITIONS.md:47` names as a required region. The whole interaction grammar
  (`VISUAL-CONSTITUTION.md:96`) is *select → tune → **commit***; this pane has no commit stage: every
  drag writes straight into the injected config (`:81`), and Reset is the only exit.
- Both buttons are unlabelled beyond their text (`aria: null`) and neither announces its effect.

**Reproduction.** `http://localhost:9000/#/blob` → click Copy JSON with clipboard permission denied:
nothing happens, no error surfaces. Click Reset: 31 values change with no announcement and no undo.

**Cure.** One durable status region in the action bar owned by the pane, per
`VISUAL-CONSTITUTION.md:101`; `Reset` becomes `Reset` + `Compare` with the confirmation grammar the
canon already specifies for destructive actions; `copyAsJson` gains explicit success/failure arms.

---

### D-11 — MAJOR — The live readout has neither tabular figures nor reserved width

**Evidence.** `/#/blob`, 1440×900:

```
.font-mono readout   fontVariantNumeric: "normal"      ← no tabular-nums
"3"     (Satellites, step 1)      width  6.8 px
"0.220" (Body Radius, step 0.005) width 33.9 px
"0.038" (Noise Amp)               width 33.9 px
in-place text swap "0.220" → "-0.0005"                width 32.1 → 43.7 px   (Δ +11.6 px)
```

`VISUAL-CONSTITUTION.md:78`: *"Live numbers use **tabular figures** and **reserve their widest legal
representation** so value changes never reflow the settled chassis."* Both halves fail.

**Mechanism.** `ConfigSliderPane.vue:84–86`:

```ts
function fmt(v: number): string { return Number.isInteger(v) ? String(v) : v.toFixed(3); }
```

Precision is inferred from the *value* rather than declared from the *step*, which is statically
known on every `SliderDef`. Consequences:

- Any slider whose range contains an integer flips between a 5-char and a 1-char readout **mid-drag**.
  Enumerating `BlobPane.vue:54–115`: `warpAmp` 0–1, `eccentricity` 0–0.5, `noiseAmp` 0–0.10,
  `noiseFreq` 0.5–10.0 step 0.1, `pulseFreq` 0–2, `specStrength` 0–2 step 0.02, `rimStrength` 0–2,
  `rimPower` 1–5 step 0.05, `iridescence`/`sssScale`/`coreGlow` 0–1, `pointerAttraction` −1…1
  step 0.05, `stretch` 0–1.5 step 0.05, `tempo` 0.25–2.5 step 0.05 … essentially every slider. A
  27 px live width jitter on a 33.9 px element is a ~80 % swing.
- `noiseFreq` has step 0.1 and renders `0.500` — three decimals for a one-decimal control, i.e. two
  digits of false precision on 8 of 31 rows.
- No `unit` field exists, so `Merge (ms)` smuggles its unit into the label while `Hue Range` (degrees)
  has none. `VISUAL-CONSTITUTION.md:124` requires the axis to *"announce label, value, **unit**"*.

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs` → `truncation.readoutWidthShift`;
`chD-csp-probe.mjs` → `reflow`. Visually: drag `Warp` on `/#/blob` through 1.00.

**Cure.** `SliderDef` declares `precision` (or derives it once from `step`) and `unit`; the readout
gets `font-variant-numeric: tabular-nums` and a `min-inline-size` reserved from the widest legal
string for that def. Both belong on the glass-ui `ConfiguratorRow` value slot, not in the consumer —
`VISUAL-CONSTITUTION.md:104` already assigns the axis composition to the producer: *"The
domain-neutral axis composition sits over BI `Slider`: label, unit, **reserved live value**, optional
numeric entry …"*.

---

### D-12 — MAJOR — The "ONE RHYTHM SOURCE" clamp is measurably inert

**Evidence.** `ConfigSliderPane.vue:208–217` claims a container-scaled row rhythm:

```css
/* THE ONE RHYTHM SOURCE … The row block-size rides a clamp() of the pane container */
.config-console :deep(.configurator-row) { min-block-size: clamp(2rem, 7cqi, 2.625rem); }
```

Measured rendered row heights:

| arm | container (`.pane-wrapper`) | resolved `min-block-size` | **rendered row height** |
|---|---:|---:|---:|
| `/atmosphere` 1440 | 1042 px | 42 px | **60.94 px** |
| `/blob` 1440 | 512 px | 35.84 px | **60.94 px** |
| `/atmosphere` 390 | 358 px | 32 px | **57.59 px** |

`distinctRowHeights` is `[60.9]` on both desktop arms — a single value. The row's content box (label
line + `gap-1.5` + 24 px track + `py-1`) always exceeds the clamp, so **the clamp never binds**. At
container widths differing by 2.03× the rendered rhythm is byte-identical, which is the exact opposite
of the claim. The one arm where it *does* bind (390 px, 32 px floor vs 57.59 px rendered) still
doesn't bind.

`VISUAL-CONSTITUTION.md:33` law 7 — *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile."* The pane declares compliance and delivers a
fixed rhythm. `PROPORTION-AUDIT.md:73` law 8 again: token presence cannot close the row.

Compounding it: the row's actual spacing comes from `class="gap-1.5 py-1"` at `:142` — Tailwind
utilities — while the producer ships a real sizing API. From `glass-ui.css`:

```
.configurator-row[data-size=sm|md|lg] { gap: var(--configurator-row-gap-{compact|comfortable|spacious});
                                        padding-block: var(--configurator-row-py-…) }
@container style(--configurator-size: sm|md|lg) { … }
```

Live: `dataSize: null` on every row. The `size` prop is never set, the producer's `--configurator-size`
container-style seam is never used, and the ladder is replaced by two utility classes plus a `:deep()`
correction. `VISUAL-CONSTITUTION.md:89` mandates the opposite direction of travel: *"W17 **deletes
descendant corrections**."*

**Reproduction.** `node scratchpad/chD-csp-probe.mjs` → compare
`desktop-atmosphere.row0` / `desktop-blob.row0` / `mobile-atmosphere.row0`.

**Cure.** Delete `:215–217` and `:142`. Pass the producer's `size` (or set `--configurator-size` on
`.config-console` once) and let the producer's gap/padding ladder own the rhythm. If the rhythm must
be container-scaled, that clamp belongs in the producer's `--configurator-row-py-*` tokens so all
consumers inherit one law — which is what "ONE RHYTHM SOURCE" was supposed to mean.

---

### D-13 — MAJOR — The bare `<slot />` licenses a second, misaligned control-row species

**Evidence.** `ConfigSliderPane.vue:110` is an unnamed, unstyled, ungridded slot between the header
and the console. `AuroraPane.vue:118–181` fills it with a hand-rolled row species. Measured on
`/#/atmosphere` at 1440×900:

| | slot rows (`.aurora-row`) | well rows (`.configurator-row`) |
|---|---|---|
| left edge | **224 px** | **239 px** |
| right edge | **1216 px** | **1201 px** |
| height | **36 px** | **60.9 px** |
| label family / weight | Fira Code 400, uppercase, 1.64 px tracking | Plus Jakarta Sans **500**, none, normal |
| label colour | `rgb(112,89,66)` | `rgb(28,25,23)` |
| material | on the Card | inside `.console-well` |
| control alignment | `space-between` → ragged left edges | full-width track |

So one pane presents two populations of "a labelled control", **indented 15 px differently, 1.69×
different in height, in two different type families at two different weights and two different
colours, on two different material tiers**, with the slot population's controls forming no column at
all. In `shots/safari-desktop-light/atmosphere.png` and `shots/safari-mobile-dark/atmosphere.png`
this is the first thing the eye catches after the tracks.

`.aurora-row-label` is also a byte-copy of `.config-section-title` (D-7) — the duplication is the
tell: the pane owns a row grammar and a heading grammar, exposes neither to the slot, and the
consumer re-minted the nearest recipe it could see. `VISUAL-CONSTITUTION.md:33` law 7 forbids the
fork; `:104` assigns the axis composition to one producer surface; edict 4 (glass-ui is the design
system) forbids re-minting a row.

Note also that `:3`'s header comment names a prop that does not exist — *"parameterised by
{ …, extraControls? }"* — while the actual mechanism is the anonymous slot. The API drifted from its
own documentation.

**Reproduction.** `node scratchpad/chD-csp-probe3.mjs` → `twoSpecies.auroraRows` vs
`twoSpecies.cwRows`, `twoSpecies.auroraLabels` vs `twoSpecies.rowLabels`.

**Cure.** The slot must not be a blank surface. The pane exposes *rows*, not a region: a
`sections` entry accepts an enum/select def alongside slider defs so every control in the pane is one
`ConfiguratorRow` in one grid, in one material tier, at one indent. `AuroraPane.vue:118–181` and its
whole `<style>` block delete; `.aurora-row`/`.aurora-row-label` vanish with them. This is a real
subtraction, not a wrapper: no new directory, no new component (edict 3).

---

### D-14 — MAJOR — The reserved chromatic material applied to non-chromatic domains

**Evidence.** `ConfigSliderPane.vue:146`: `variant="spectrum"`, unconditionally, for all 31 blob
defs and all 3 aurora defs. Live: `data-variant="spectrum"` on every `.glass-slider` in
`.config-console`.

`VISUAL-CONSTITUTION.md:7`: *"The signature risk is the **spectral meniscus**: a continuous
liquid-color rail **reserved for genuinely chromatic continuous domains — Picker and Gradient**.
Easing uses a neutral temporal rail … Everything structural stays calm enough for those two ideas to
read."* `:21`: *"Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes."*

`Body Radius`, `Smooth K`, `Rim Power`, `Shininess`, `Merge (ms)`, `Zones` are geometry, material and
time. Applying the reserved signature form to them devalues the signature *and* — because the variant
blanks `.slider-range` by recipe — destroys the value read (D-3). This is the design-level root of
the mechanism family; the historical record shows it was diagnosed twice and cured neither time:
`docs/tranches/N/audit/lanes2/U-CONTROLS.md:54` (*"`variant="spectrum"` … **NO `--slider-track-bg`**
⇒ flat `var(--secondary)`"*) and `docs/tranches/N/waves/N.W13.md:28` (*"a spectrum slider with no
spectrum"*). The T.W8 cure at `:190–202` fed the variant an ink instead of retiring the variant.

**Reproduction.** `http://localhost:9000/#/blob`; inspect `data-variant` on any
`.config-console .glass-slider`.

**Cure.** Retire `variant="spectrum"` from this pane. See D-3.

---

### D-15 — MAJOR — Dependent-control state was never designed: five live sliders that do nothing

**Evidence.** `BlobPane.vue:59–62` and `:111–112`:

```ts
s("geometry.satelliteCount",  "Satellites",     0, 4, 1)
s("geometry.satelliteRadius", "Sat Radius",  0.02, 0.20, 0.005)
s("geometry.orbitRadius",     "Orbit Radius",0.15, 0.48, 0.005)
s("geometry.eccentricity",    "Eccentricity", 0.0, 0.5,  0.01)
s("satellites.mergeDuration", "Merge (ms)",   500, 5000, 100)
s("satellites.emergeDuration","Emerge (ms)",  500, 5000, 100)
```

`satelliteCount` has minimum **0**. At `satelliteCount = 0` the five satellite-dependent sliders
control nothing. `SliderDef` (`ConfigSliderPane.vue:27–33`) has no `disabled` field and the pane
renders no disabled state, so all five remain fully enabled, fully focusable, fully draggable, with a
live readout that changes and a preview that does not.

`VISUAL-CONSTITUTION.md:83`: *"Selected, failed, pending, withdrawn and **disabled** states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."* There is
no disabled state to be color-only *with*. Live probe confirms `aria-disabled: null` on every thumb.

**Reproduction.** `http://localhost:9000/#/blob` at ≥1024 px → drag `Satellites` to 0 → drag
`Sat Radius`, `Orbit Radius`, `Eccentricity`, `Merge (ms)`, `Emerge (ms)`: readouts change, nothing
else does, no control indicates it is inert.

**Cure.** `SliderDef` gains `enabledWhen?: (config) => boolean` (or a declarative `dependsOn` path)
and the row renders the producer's disabled state with `aria-disabled` plus the explicit reason.
Consumed once by the producer `ConfiguratorRow`, not hand-rolled per consumer.

---

### D-16 — MAJOR — The prop contract erases types; both consumers launder through `as unknown as`

**Evidence.** `ConfigSliderPane.vue:41–52` types the two central props as
`Record<string, unknown>`. Both consumers must double-cast:

```
AuroraPane.vue:111  :config="(atoms as unknown) as Record<string, unknown>"
AuroraPane.vue:113  :defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
BlobPane.vue:124    :config="(cfg as unknown) as Record<string, unknown>"
BlobPane.vue:126    :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
```

Four `as unknown as` casts across two files to satisfy one component's API. `BlobPane.vue:36–48`
then spends a 13-line recursive mapped type (`NumericAtomPath`, with a 24-line comment explaining
two levels of `-?` modifier stripping) reconstructing the key safety the pane threw away.

**Mechanism.** The pane is generic over *"any object, addressed by any dot-path string"* — the least
typeable contract available. Every consumer pays for that generality: two casts plus, for the nested
consumer, a mapped type. `PROPORTION-AUDIT.md`-adjacent edict 3 (KISS, no contrivance) and edict 1
(no god modules) both bite: a 252-line component that is simultaneously a Card shell, a scroll host,
a dot-path resolver, a number formatter, a clipboard exporter, a reset engine and a slot host has
seven jobs and no encapsulation of any of them, and its widest prop type is the symptom.

Note in mitigation: `verbatimModuleSyntax` is honoured — every type-only import in the pane and in
both consumers is `import type` (`BlobPane.vue:15,16`; `AuroraPane.vue:26,28,34`), and the pane's own
`:16–23` are all genuine value imports (edict 8 met). Vue 3.5 reactive props destructure is used
correctly at `:41` (edict 7 met on that axis).

**Reproduction.** `grep -n "as unknown" demo/scenes/atmosphere/AuroraPane.vue demo/scenes/blob/BlobPane.vue`.

**Cure.** Make the pane generic over its config: `defineProps<{ config: T; sections: SliderSection<T>[];
defaults: T }>()` with `SliderDef<T>["key"]` a keyof-derived dot-path union. The `NumericAtomPath`
machinery in `BlobPane.vue:36–48` then deletes, along with all four casts — one net subtraction of
~30 lines. Alternatively split the pane per D-8/D-9 so the "generic over any object" requirement
disappears.

---

### D-17 — MINOR — No motion, and a class that promises one

**Evidence.** `grep -n "transition\|animation\|@keyframes" demo/scenes/ConfigSliderPane.vue` → zero
hits. `v-if="sections.length > 0"` at `:119` and `:163` swap the console and the action bar with no
transition. The only motion touching the pane is inherited: `PaneHeader.vue`'s scroll-scrubbed veil
and title `scale`, and the producer's `.slider-track { transition: background … }`.

Under `reducedMotion: "reduce"` (Chromium, live) nothing in the pane changes and nothing needs to —
`trackTransition` is a colour transition, not motion; there is no layout-animating property. So edict
6 is *not* violated (nothing was deleted) and PRM is *not* violated (there is nothing to gate). What
is wrong is smaller and specific:

`:106` applies `pane-scroll-fade` and `:104–105` claims *"The scroll region owns the **fade mask** +
overflow"*. Measured: `maskImage: "none"`, `webkitMaskImage: "none"`. The class
(`PaneHeader.vue` unscoped block) sets only `contain: layout style paint` and
`scroll-timeline: --pane-scroll`. There is no mask and never was; the name and the comment both
mislead, and the missing fade is exactly the amputation visible in
`shots/safari-mobile-dark/atmosphere.png` (see D-9).

**Reproduction.** `node scratchpad/chD-csp-probe2.mjs` → `scrollRegion.maskImage`.

**Cure.** Either add the fade the name promises (a `mask-image` on the scroll host, purely
compositor-side) or rename the class to what it is (`pane-scroll-host`) and correct `:104–105`.
Given D-9's disclosure cure, the fade becomes the right answer: a scroll edge with no affordance is a
defect regardless of the class name.

---

### D-18 — MINOR — RTL: half-mirrored rows and a promoted destructive action

**Evidence.** `shots/rtl-desktop/blob.png`. The row's label/value pair mirrors (`0.220 Body Radius`),
the track does not (thumb at 38 % from visual left in both directions). The action bar's children
reverse, so `Reset` leads and `Copy JSON` follows. The `description` prose also breaks its terminal
period onto the next line (`…and satellite` / `.behavior`) — a bidi isolation gap in the
`PaneHeader` description path the pane feeds at `:107`.

`VISUAL-CONSTITUTION.md:124` says the numeric axis sign never mirrors, so the un-mirrored track may
be intended; `:154` requires *"CSS strings, hex, slugs, IDs and provenance render in LTR-isolated
spans inside RTL prose"*, which the readout does not do. The un-designed part is the combination:
a row whose text reads right-to-left above a track that fills left-to-right, and an action order in
which the destructive verb becomes primary.

**Reproduction.** `http://localhost:9000/#/blob` at 1440 px, then
`document.documentElement.setAttribute("dir","rtl")`.

**Cure.** Decide the axis direction explicitly at the producer (`data-inverted` already exists on
`.glass-slider` and flips `--slider-range-origin` — `glass-ui.css`), wrap the readout in an
LTR-isolated span, and pin the action order by DOM role rather than letting flex direction decide
which verb leads.

---

### D-19 — MINOR — A truncated label has no fallback

**Evidence.** Live, `/#/blob`: the producer label carries `truncate` (`text-overflow: ellipsis`).
Substituting a longer string in place:

```
"Sub-surface Scattering Falloff Coefficient (normalised)"
clientWidth 392   scrollWidth 413   clipped: true   title: null
```

The visible text is silently cut with no `title`, no tooltip and no expansion. The full string
survives only in the slider's `aria-label` (`:145`), so sighted mouse users lose information that
screen-reader users keep. `PROPORTION-AUDIT.md:71` law 6 (*"Add affordance when the surviving
action/state is otherwise undiscoverable"*) applies.

Today's longest blob label is `Click Impulse` (13 chars) so the state does not fire in the shipped
data — **this is a latent state, reproduced by substitution, not by shipped content.**

**Cure.** Either guarantee the measure (declare a label budget in `SliderDef` and enforce it in the
producer row) or supply the fallback (`title` on truncation). Choose one; do not ship both a
truncating label and no fallback.

---

### D-20 — MINOR — A documented empty state that does not exist, and a documented prop that does not exist

**Evidence.** `ConfigSliderPane.vue:44`:

```ts
/** Slider sections to render. Pass empty array to show empty state. */
sections: SliderSection[];
```

The template has `v-if="sections.length > 0"` at `:119` (console) and `:163` (action bar) and **no
`v-else` anywhere**. With `sections: []` the pane renders header + slot and nothing else — and loses
Copy JSON and Reset too, so an empty pane can neither say it is empty nor export or reset. The
promised state is provably absent from the render tree.

`:3` likewise documents a prop `extraControls?` that `:41–52` does not declare.

Neither consumer passes `[]` today, so **this is a latent state proven from the template, not
reproduced at runtime.** It is still a design defect by the seat's own rule: a state that was named
and never designed.

**Cure.** Either implement the empty state (a content-hug invitation, per
`VISUAL-CONSTITUTION.md:28` law 2) or delete the promise from the JSDoc. Delete the `extraControls`
line, which describes an API that never shipped (edict 2: no stale dual paths).

---

### D-21 — INFO — Dead declarations

`:98` — `<div class="relative w-full mx-auto h-full min-w-0">` carries `relative` with no
absolutely-positioned descendant, and `mx-auto` on a `w-full` element. `:101` repeats `relative` on
the `Card`, again with no positioned child inside the pane's own tree. Cosmetic, but they are the
residue of an earlier floating action bar (`:159–162` records the migration) and should have gone
with it (edict 2).

---

## 4. Mechanism families and the shape of the cure

The twenty-one findings collapse into six mechanisms. Ordered by what they buy:

| Family | Findings | The one cure |
|---|---|---|
| **F1 — single-channel track semantics** | D-1, D-3, D-4, D-14 | Retire `variant="spectrum"`; consume the producer's neutral `Slider` so `.slider-range` paints the value; delete `:202` and `:204–206`; the producer owns a forced-colors arm (border + `Highlight` fill + `outline` focus) |
| **F2 — the pane is not a chassis region** | D-6, D-8, D-13, D-17 | Compose `InstrumentChassis`' inspector region; drop `Card` + `.console-well`; interval replaces 8 dividers; the slot becomes rows in the one grid |
| **F3 — the API cannot express the canon** | D-9, D-11, D-15, D-16, D-20 | `SliderSection<T>` / `SliderDef<T>` gain `rank`, `unit`, `precision`, `enabledWhen`; the pane becomes generic over its config; ~30 lines of consumer type machinery and four casts delete |
| **F4 — producer sizing bypassed** | D-5, D-12 | Pass `size` / set `--configurator-size` once; delete the `:deep()` corrections and `gap-1.5 py-1`; hit extension unconditional, in the producer |
| **F5 — the route has no preview and no narrow arm** | D-2, and the §1.1/§1.2 proportion findings | W29/W28 build the `preview-dominant` stage; W19 deletes the global `Picker\|Blob` toggle; the pane owns its narrow sequence |
| **F6 — no operation truth** | D-10, D-18, D-19 | One durable status region; `Reset` + `Compare` with confirmation; explicit action order; label measure decided |

F1 is the highest-value cut: it is four findings including two BLOCKERs, it is a **deletion** of two
CSS declarations and one prop value, and it moves the remaining contrast obligation to the producer
where every other consumer inherits it. F3 is the highest-value *architectural* cut: it is the only
one that makes the canon's required Atmosphere/Blob composition representable at all.

None of the cures adds a directory, a wrapper component or a shim (edicts 2, 3). Four of the six are
net subtractions from `demo/`, with the transposed behaviour landing in `@mkbabb/glass-ui`'s
`Slider` / `ConfiguratorRow` — which is edict 4 satisfied rather than deferred.

---

## 5. What is not a defect (recorded so it is not re-litigated)

- **`verbatimModuleSyntax`** — met. Every type-only import in the pane and both consumers is
  `import type`; the pane's `:16–23` are all value imports.
- **Vue 3.5 reactive props destructure** — met at `:41`. `useTemplateRef`/`shallowRef` are not
  applicable: the component holds no template refs and no `defineModel`.
- **Deleted animations (edict 6)** — no animation was removed; the pane never had one. The
  `PaneHeader` scroll choreography it inherits is compositor-only and its rest state is
  engine-invariant.
- **`prefers-reduced-motion`** — nothing in the pane animates geometry, so there is nothing to gate.
  Measured under `reducedMotion: "reduce"`: no layout-animating property, `trackTransition` is colour
  only.
- **Keyboard operation of the axis** — works. `ArrowRight` on a focused thumb moved `aria-valuenow`
  `0.22 → 0.225` (one `step`) and the readout followed. `Home`/`End` and the roving-focus law
  (`VISUAL-CONSTITUTION.md:124`) are producer-owned and were not contradicted.
- **`horizontalOverflow`, `pageErrors`, `blankOrNearBlank`, `mainCountNotOne`, `darkClassMissing`** —
  all `0` for `/atmosphere` and `/blob` in all four tracked matrices (`REPORT.md:7–29`). The pane
  causes none of the shell-level defects.
- **`namelessButtons`** — the one nameless button reported on `/#/blob`
  (`REPORT.md:101,108`) is not in this pane: `actions.btns` shows both pane buttons carry visible
  text, and the pane's sliders all carry `aria-label` (`:145`).

---

## 6. Register mapping

For the formation's register, these findings join existing families rather than opening new
mechanisms:

| Finding | `PROPORTION-AUDIT.md` family | Named owner |
|---|---|---|
| D-1, D-3, D-4, D-14 | new mechanism — *reserved-material misapplication + single-channel control extent* | producer `Slider`; site W28/W29 |
| D-2, §1.1/§1.2 proportion | PR-10 (`:54`) + `OPTICAL-BENCH-COMPOSITIONS.md:115` global-pane-toggle | W28 / W29, Dock W19 |
| D-5 | PR-12 (`:56`) | W18, audit W30 |
| D-6 | PR-05 (`:49`) | W18, producer P122 |
| D-7 | PR-02 (`:46`) type-jurisdiction family | W28/W29, producer P019 |
| D-8 | PR-04 (`:48`) nested housing | W18 |
| D-9 | PR-10 (`:54`) confined disclosure | W28 / W29 |
| D-10 | PR-08 (`:52`) + PR-07 (`:51`) | W23 |
| D-11 | PR-01/PR-02 reservation family (`:45–46`) | producer `ConfiguratorRow` |
| D-15 | PR-07 (`:51`) `ADD-AFFORDANCE` | W23 |
| D-13, D-16, D-17, D-19, D-20, D-21 | PR-05 / PR-14 subtraction family | W18 |

`PROPORTION-AUDIT.md:39` forbids a `CONSIDER`/`POLISH`/`LATER` disposition, and `:83` requires every
row to carry a terminal verb before W18 completes. Every finding above is stated with a terminal
cure for that reason.
