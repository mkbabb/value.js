# CHALLENGE-D (round 2) — `ConsoleRail.vue` — the design is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, the 1M-context variant) — the tier this
hostile-challenger seat was spawned with. Declared, not inherited.

---

## 0. Why this file is `-r2`, and what it must do

`challenge-D-design.md` in this directory is **Codex report-authored** — its own receipt says so:

> `challenge-D-design.md:5` — *"Source-only tranche audit; runtime/Browser commands **0**."*

`audit/codex-provenance/axes-quality.md` places it in the 02:51 batch that never got the
correction pass, cites it by name at `:311`, and rules its whole-file `lines 1–329` citation
unusable at `:412-416`. Its closing paragraph is a **cross-product matrix argument** —
*"Spaces × 1–5 channels × selected/null/invalid × dark/light/forced-colors × keyboard/touch/pointer
× reduced-motion × phone portrait/landscape/desktop × short/long localized labels"* — the class the
owner retired under **FORMATION-LAWS.md L-19** (anti-contrivance presumption). That paragraph is
re-adjudicated in §6 by enumeration, not by rhetoric.

The canonical file is **untouched**. Promotion is the orchestrator's job.

| | |
|---|---|
| Subject | `demo/picker/controls/ComponentSliders/ConsoleRail.vue`, 329 lines, sha256 `a37d644bfda320772782c72ccb67e8433a04a691ad9101f36467abcfd5b6e279` |
| Read with it | `ComponentSliders.vue` (the parent), `demo/styles/animations.css`, `demo/styles/focus-ring.css`, `demo/color-session/ink.ts`, `demo/color-session/picker-color.ts` |
| Repo state | branch `tranche-u`, **HEAD `0b4566db`** |
| Route | `http://localhost:9000/#/` — the LIVE dev stack (demo :9000, API :3000, full data path) |
| Engines | Playwright **WebKit** (primary) + **Chromium** (cross-engine + `forcedColors` + `colorScheme:dark`) |
| Arms driven | 1440×900 @dsf2 and @dsf3 and @dsf4 · 390×844 @dsf3 `isMobile+hasTouch` · `prefers-reduced-motion: reduce` · `forced-colors: active` · dark · **14 colour spaces, each verified against the combobox's own label before recording** |
| Prior-round claims re-adjudicated | 6 findings + the "Required Kronecker cells" paragraph — all by name, §6 |
| Written by this seat | this file + `evidence-r2/` — **13 probe scripts, 12 JSON receipts, 46 PNG witnesses**. **No source edits.** |

**Every finding below carries a probe you can re-run.** All probes are read-only and live under
`docs/tranches/V/megatranche/audit/components/picker-componentsliders-consolerail/evidence-r2/`:

```
probe-00-recon.mjs                 probe-01-registers.mjs          probe-02-tokens-motion-focus.mjs
probe-03-focus-press-prm.mjs       probe-04-spaces-shots.mjs       probe-05-pixels-spaces-arms.mjs
probe-06-dot-focus-glyphs.mjs      probe-07-glyph-arms.mjs         probe-08-ictcp-verify.mjs
probe-09-spaces-verified.mjs       probe-10-effect-tooltip-prominence.mjs
probe-11-register-loudness.mjs     probe-12-touch-register.mjs
```

**Evidence hygiene (L-12).** Three artefacts in `evidence-r2/` are *superseded probe artefacts* and
must not be read as findings: `shot-G-ICtCp.png`, `shot-G-Jzazbz.png` and
`shot-S-ictcp-two-glyph.png` came from `probe-07`, whose `[role=option]` index shifted after each
pick, so those arms measured the **previous** space. `probe-08` and `probe-09` re-ran them with a
combobox-label verification gate and are the load-bearing arms. `shot-T-tooltip.png` is a 1×1 clip
of reka's visually-hidden aria copy — useless; the real tooltip witness is
`shot-V-ICtCp-verified.png`. I say so here rather than deleting them, because a probe that was
*blind* is not the same as a probe that was *wrong*.

---

## 1. Verdict

**DEFECTIVE.** 15 findings — **2 BLOCKER · 6 MAJOR · 5 MINOR · 2 INFO** — plus **5 proven
superlatives** (§5). None of the fifteen appears in the prior round.

The rail's design thesis is stated at `:2-11` and is a good one: *"the ACTIVE seat is the
WatercolorDot in the live color — the ONE live-color voice in the zone (ring says WHICH, dot-hue
says LIVE, enclosure says NAVIGATION, letters speak INK). The chassis persists across space
changes; only the letters re-key (N-2)."*

Measured against the running app, **four of those five clauses are false**:

| the file's claim | measured at HEAD `0b4566db` |
|---|---|
| "the ACTIVE seat is the WatercolorDot" | **there is no active seat at boot, and none after any of 14 space changes** — D2-01 |
| "ring says WHICH" | no ring exists on the dot; `T-28 ABROGATE` removed it (`:288-289`). The voice is named in the model and absent from the build — D2-14 |
| "the chassis persists across space changes" | the enclosure takes **8 distinct widths** across 14 spaces, a **+35.0 %** swing — D2-05 |
| "only the letters re-key" | the letters *and* the whole slider column translate, because the chassis width feeds the flex row — D2-05 |
| "letters speak INK" | **true, and well** — live-probed, per-scheme, measured 5.65:1 — S-5 |

---

## 2. The four registers, measured

The brief names *"state coverage at the four owner-marked registers."* The rail declares exactly
four interaction registers in its own stylesheet — rest `:244-262`, hover `:263-266`, press
`:267-270`, focus-visible `:271-275` — plus the selected register carried by the inline `:style`
at `:34` and the dot at `:52-62`. Here is what each one actually does, measured in **one crop from
one baseline** (`probe-11-register-loudness.mjs` → `probe-11-register-loudness.json`, 1440×900
@dsf3, WebKit):

| register | source | pointer | keyboard | touch | loudness (Δpx of the rail crop) |
|---|---|---|---|---|---|
| rest | `:244-262` | live | live | live | baseline |
| **hover** | `:263-266` | live | n/a | **unreachable** (`hover: none`) | **24.64 %**, maxΔ 103.9 |
| **press** `scale(.96)` | `:267-270` | **DEAD** | n/a | **DEAD** | **0** — transform never leaves identity |
| **focus-visible** | `:271-275` | n/a | live (light+dark) · **DEAD under forced-colors** | n/a | **21.84 %**, maxΔ 109 |
| **selected** (the dot) | `:34`, `:52-62` | live | live | live | **11.11 %**, maxΔ 147.2 |

Two structural facts fall straight out of that table.

**The persistent, meaning-bearing register is the quietest thing in the rail.** Hover is **2.22×**
louder than selection; focus is **1.97×** louder. The one register that answers *"which channel am
I editing?"* moves fewer pixels than the two that answer *"where is my cursor right now?"*
(D2-07).

**On a touch device only two of the five registers exist.** `probe-12-touch-register.json`:
`{"anyHover": false, "hoverNone": true, "pointerCoarse": true}` at 390×844. Hover cannot fire;
press is dead; focus-visible needs a keyboard. The rail's entire state vocabulary on a phone is
*rest* and *dot* (D2-09).

---

## 3. Findings

### D2-01 · BLOCKER — the tablist boots with **no selected tab**, and every colour-space change wipes it again

`probe-00-recon.mjs`, first run, 2 s after the rail mounts:

```json
"items": [
  {"label":"l channel",    "text":"L","selected":"false","tabindex":"0", "seat":null,"dot":null},
  {"label":"a channel",    "text":"a","selected":"false","tabindex":"-1","seat":null,"dot":null},
  {"label":"b channel",    "text":"b","selected":"false","tabindex":"-1","seat":null,"dot":null},
  {"label":"alpha channel","text":"α","selected":"false","tabindex":"-1","seat":null,"dot":null}
]
```

Four `role="tab"` elements (`:28`), zero `aria-selected="true"`, zero `.rail-dot-seat` nodes. The
component's declared "ONE active indicator" (`:38-40`) is **not rendered in the state the user
first sees**. Witness: `shot-R0-default-NO-DOT.png`.

It is not a boot race. `probe-09-spaces-verified.json` walked **14 colour spaces**, each one gated
on the combobox's own label before recording, and every single arm came back `anySelected: false`:

```
Lab n=4 sel=false · LCh sel=false · OKLab sel=false · OKLCh sel=false · RGB sel=false
HSL sel=false · HSV sel=false · HWB sel=false · XYZ sel=false · Jzazbz sel=false
Kelvin n=2 sel=false · Hex sel=false · Rec. 2020 sel=false · Display P3 sel=false
```

Mechanism, in bytes: `ComponentSliders.vue:135` `const activeComponent = ref<string | null>(null)`
and `ComponentSliders.vue:138` `watch(currentColorSpace, () => { activeComponent.value = null; })`.
The rail is handed `:active="activeComponent"` (`ComponentSliders.vue:36`) and renders the seat
only under `v-if="active === component"` (`:53`).

**Why this is a D-axis BLOCKER and not a C-axis nit.** The rail's whole design argument is that the
dot is the *sole* indicator — the pill, the ring on the dot, and the `aria-selected` neutral fill
were all deliberately retired for it (`:38-51`, `:238-243`). Retiring every fallback and then
shipping a default state where the sole survivor is absent leaves the component with **no visual
answer at all** to the question it exists to answer. In `shot-R0-default-NO-DOT.png` the rail is
four identical grey letters in an empty capsule; nothing distinguishes any channel from any other,
and the four ramps beside it are all live.

**This is owner-marked and still open.** `registry/ROOT-FINDINGS.md:1665-1675`, MT-F042 arm 1,
owner verbatim: *"this color space component selector should **default to the first selected
component to have a water color dot**."* Witness `audit/visual/owner-marked/OM-17-component-selector-watercolor-loupe.png`.
The mark is dated 2026-07-28; HEAD is `0b4566db`; the defect is live.

Reproduce: `node evidence-r2/probe-00-recon.mjs` — or open `http://localhost:9000/#/` and look.

---

### D2-02 · BLOCKER — under `forced-colors: active` the rail has **zero focus indicator**, against this repo's own written focus-ring law

`probe-06-dot-focus-glyphs.mjs`, Chromium, `forcedColors: "active"`, real Tab traversal into the
rail:

```json
"forcedColorsFocus": {
  "onRail": true, "text": "L", "focusVisible": true,
  "boxShadow": "none", "outline": "3px none",
  "bg": "rgba(255, 255, 255, 0)", "color": "rgb(0, 0, 0)"
}
```

`:focus-visible` **matches**, and nothing paints. Witness:
`shot-F-forcedColors-FOCUSED-no-ring.png`.

The mechanism is two lines of this file:

```css
/* ConsoleRail.vue:271-275 */
.channel-rail-item:focus-visible {
    /* The accent-aware house focus register — never a bespoke gray outline. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}
```

`outline: none` removes the one property forced-colors preserves, and `box-shadow` is the one
property forced-colors strips. `grep -c "forced-colors" ConsoleRail.vue` → **0**.

This repo already wrote the law down. `demo/styles/focus-ring.css:31`, verbatim:

> *"Composed by every control as: `box-shadow: 0 0 0 1px var(--focus-ring-inner), …` **with a
> forced-colors `outline` fallback (box-shadow is stripped in WHCM).**"*

The rail composes the box-shadow half and omits the fallback the same repo documents as mandatory.
Confirmed cross-engine: probe-03's `chromium_forcedColors` arm returns `boxShadow: "none"` for
`focusAfterTab`, `focusAfterArrow` and `focusAfterArrow2` — every focus stop in the rail.

Compounding it, forced-colors also flattens the ink ladder: `probe-05-pixels-spaces-arms.json`
`forcedColors.items[*].color` is `rgb(0, 0, 0)` for **all four** letters, so rest and active are
typographically identical (`shot-F-forcedColors.png`). The *only* surviving state signal is the dot,
and it survives by **escaping** forced-color adjustment — `dotBg` still computes
`lab(92 88.8 20)`, an author colour in a mode whose contract is "system colours only". So the rail
fails WCAG 2.4.7 (Focus Visible) in WHCM while simultaneously being the one element in the zone
that ignores the WHCM palette.

---

### D2-03 · MAJOR — the press register never renders; the only user who sees it is the one who asked for **less** motion

The file spends six lines specifying this register (`:254-261`):

> *"T.W5-R5 (T-14 / D7): the only transform here is the `:active` press scale — a SPATIAL press
> leg, so it rides `--spring-press` at the spring's OWN clock (0.16s sub-200ms tap answer), never a
> bezier on a generic clock."*

`probe-02-tokens-motion-focus.json` → `pressSeries`, seven samples across a 220 ms hold, WebKit:

```
t=3657  matches:":active"=true  transform: matrix(1, 0, 0, 1, 0, 0)   bg: oklab(0 0 0 / 0)
t=3692  matches=true            transform: matrix(1, 0, 0, 1, 0, 0)   bg: …/0.005072
t=3757  matches=true            transform: matrix(1, 0, 0, 1, 0, 0)   bg: …/0.205177
t=3857  matches=true            transform: matrix(1, 0, 0, 1, 0, 0)   bg: …/0.596013
```

`:active` matches, the `background-color` leg animates correctly — and the **transform never leaves
identity**. Cross-engine, `probe-03-focus-press-prm.json`:

| arm | `matchesActive` | measured transform | rendered box width |
|---|---|---|---|
| webkit | `true` | `matrix(1, 0, 0, 1, 0, 0)` | 23.641 px |
| chromium | `true` | `matrix(1, 0, 0, 1, 0, 0)` | 23.641 px |
| chromium + forced-colors | `true` | `matrix(1, 0, 0, 1, 0, 0)` | 23.641 px |
| chromium + dark | `true` | `matrix(1, 0, 0, 1, 0, 0)` | 23.641 px |
| **webkit + `prefers-reduced-motion: reduce`** | `true` | **`matrix(0.96, 0, 0, 0.96, 0, 0)`** | **22.695 px** (= 23.641 × 0.96 ✓) |

**Root cause, in bytes.** The rail puts `stagger-children` on `.rail-letters` (`:21`), whose direct
children are the four buttons. `demo/styles/animations.css:44-46`:

```css
@media (prefers-reduced-motion: no-preference) {
    .stagger-children > * {
        animation: stagger-child-in var(--duration-normal) var(--ease-standard) both;
    }
}
```

`animation-fill-mode: both` + `@keyframes stagger-child-in { to { transform: translateY(0) } }`
(`animations.css:36`). Measured on the item:

```json
{"animationName":"stagger-child-in","fillMode":"both",
 "runningAnimations":[{"id":"stagger-child-in","playState":"finished","fill":"both"}],
 "transform":"matrix(1, 0, 0, 1, 0, 0)"}
```

A **finished** animation with `fill: both` keeps applying its final keyframe from the *animation
origin*, which outranks every author-origin declaration — including `:active { transform:
scale(0.96) }`. The suppression is permanent, and it re-arms on every space change because
`:key="animationKey"` (`:20`) re-fires the stagger.

Because the whole utility lives inside `(prefers-reduced-motion: no-preference)`, the animation
does not exist under `reduce` — so the press scale lands. **The tokenized spring press is a
reduced-motion-exclusive feature.** Witness: `shot-PRM-press-scale-VISIBLE.png` vs
`shot-R4-press-NO-SCALE.png`.

Two secondary truths fall out: the comment's *"0.16s"* is wrong — the measured token is
`--spring-press-duration: calc(0.12s * 1)`; and the app's primary tactile beat for its primary
navigation control is absent for essentially every user.

---

### D2-04 · MAJOR — the letters are not on the rows' rhythm: **39.80 px pitch against 43.50 px**, ±5.3 px misregistration

Every arm in `probe-09-spaces-verified.json`, 1440×900 @dsf3:

```
Lab    pitchRail=39.80  pitchRows=43.50  drift=[+4.97, +1.27, −2.43, −5.59]
LCh    pitchRail=39.80  pitchRows=43.50  drift=[+4.98, +1.27, −2.43, −5.59]
OKLCh  pitchRail=39.80  pitchRows=43.50  drift=[+4.97, +1.27, −2.43, −5.59]
RGB    pitchRail=39.80  pitchRows=43.50  drift=[+4.98, +1.27, −2.43, −5.59]
HWB    pitchRail=39.80  pitchRows=43.50  drift=[+4.98, +1.27, −2.43, −5.59]
Kelvin pitchRail=36.11  pitchRows=43.50  drift=[+3.14, −3.71]
```

`drift` is *(rail letter centre y) − (its own channel strip centre y)*. The two columns diverge
**monotonically**: the top letter sits 4.98 px below its ramp, the bottom letter 5.59 px above its
ramp — a **10.57 px spread** over four rows, against a glyph that is only 24 px tall. At 390×844
(`probe-05` → `mobile390`) it is `drift=[+4.5, +1.5, −1.5, −4.5]`, rail pitch 47 vs rows pitch 50.
At Kelvin it is worst in ratio: **36.11 vs 43.50 = 17.0 %**.

Visible in `shot-R0-default-NO-DOT.png` (the `L` rides low against the dark-red ramp, `α` rides
high against the checker) and unmistakably in `shot-M-mobile390.png`.

**Mechanism.** Two columns, two unrelated distribution laws:

- rows — `ComponentSliders.vue:328-333`: `.channel-strip { min-block-size: clamp(2rem, 7cqi, 2.625rem) }`
  + `.channel-rows { row-gap: clamp(0.375rem, 1.5cqi, 0.5rem) }` (measured `rowGap: 7.68px`);
- rail — `ConsoleRail.vue:21`: `h-full flex flex-col items-center justify-around`, **no gap at all**,
  items sized by `line-height: 1` + `padding: 0.125rem 0.375rem` (`:249-250`), distributed
  `space-around` over a content box that the rail's own `1px` border + `2px` padding (`:233-235`)
  shrink by 6 px relative to the rows' extent.

The parent declares, at `ComponentSliders.vue:318-327`, **"THE ONE-LAW RHYTHM REGIME (T.W8-WR-11 ·
T-59)"** — *"It is retired for ONE container-scaled law serving BOTH breakpoints … so the rhythm is
a smooth function of width, never two hand-tuned states."* The rail is the one element in the
console that is **not on that law**, and it is the element whose entire job is to name the rows.

---

### D2-05 · MAJOR — the "persistent chassis" takes **8 distinct widths** across 14 spaces, a **+35.0 %** swing

`:10-11` — *"The chassis persists across space changes; only the letters re-key (N-2)"* — and
`ComponentSliders.vue:19-24` — *"the console card and the rail ring are persistent chassis, never
re-mounted scenery."*

`probe-09-spaces-verified.json`, every arm label-verified:

| space | rail width | widest glyph |
|---|---|---|
| Lab / OKLab | **30.53 px** | `L a b α` |
| LCh / OKLCh | 31.31 px | `L C h α` |
| XYZ | 31.67 px | `X Y Z α` |
| RGB / Hex / Rec. 2020 / Display P3 | 32.67 px | `R G B α` |
| Kelvin | 33.03 px | `K α` |
| HSL / HSV | 34.38 px | `H S L α` |
| HWB | 38.08 px | `H W B α` |
| **Jzazbz** | **41.23 px** | `Jᴢ aᴢ bᴢ α` |

```
railW distinct: 30.53, 31.31, 31.67, 32.67, 33.03, 34.38, 38.08, 41.23
min→max swing: 10.70 px = 35.0%
```

The rail is a flex sibling of `.channel-rows` under `flex gap-x-2.5 items-stretch`
(`ComponentSliders.vue:32`), so this is not a private wobble: switching Lab → Jzazbz translates the
**entire slider column and every meter** 10.7 px to the right, and Lab → HWB 7.55 px. The enclosure
is sized by whichever letter happens to be widest — `W` at 32.08 px item width, `Jᴢ` at ~35 px —
which is a typographic accident, not a proportion.

The N-2 law it violates is not an outside standard; it is this file's own, stated twice.

---

### D2-06 · MAJOR — the live-colour dot **paints through the enclosure** — negative clearance on both sides, so the owner-marked "grows slightly larger" loupe has no room to grow

`probe-06-dot-focus-glyphs.mjs`, WebKit @dsf4 (≈3.94 real px per CSS px), scanning a 1-pixel row
through the centre of the `α` seat (the widest item):

```json
"dotVsRing": {
  "railBorderBox":  [234.47, 265.00],
  "railPaddingBox": [235.47, 264.00],
  "railContentBox": [237.47, 262.00],
  "seatBox":        [236.47, 263.00],
  "paintedDotSpanCss": [235.03, 265.70],
  "paintedDotWidthCss": 30.67,
  "ringStrokeLeftCss": 235.54, "ringStrokeRightCss": 264.94,
  "clearance_left_css": -0.51, "clearance_right_css": -0.76
}
```

Read it plainly: the rail's **border box is 30.53 px wide** and the **painted dot is 30.67 px
wide**. The dot's painted pixels start **0.51 px to the left of the left ring stroke** and end
**0.76 px past the right ring stroke** — it paints over, and slightly outside, the enclosure that
is supposed to contain it. Witness `shot-Z-dot-vs-ring-closeup.png`: the crimson ring stroke runs
straight behind the pink disc on both sides.

Three compounding causes, all in this file:

1. `:290-296` — `.rail-dot-seat { position: absolute; inset: -1px }` deliberately over-extends the
   seat past the button's padding box, consuming 1 px of the ring's 2 px of breathing room;
2. `:232-236` — the "die-rim recipe verbatim" gives the enclosure exactly `padding: 2px`, a value
   inherited from a *horizontal* dock trigger, never re-derived for a portrait rail carrying an
   organic blob;
3. the producer's `filter: url(#watercolor-filter-v-63)` displaces the silhouette outward — the
   painted 30.67 px against a 26.53 px seat box is **~2 px of filter bleed per side**, which the
   2 px padding cannot absorb.

**Why this blocks the owner mark.** MT-F042 (`ROOT-FINDINGS.md:1665-1675`) asks for the dot to
become *"a draggable loupe that **grows slightly larger on grab/select**, and then settles into
place therein … [and] animate and bounce (deftly) into the chosen color component."* A loupe with
**−0.51 px / −0.76 px clearance at rest** has negative headroom: any growth, and any bounce
overshoot, paints outside the rail entirely. The mark cannot be implemented on this enclosure — the
padding/seat/filter budget has to be re-derived first. Compare the owner's own witness
`OM-17-component-selector-watercolor-loupe.png`, where the dot sits *inside* the ring with visible
air on both sides: **the shipped geometry is already tighter than the state the owner marked.**

---

### D2-07 · MAJOR — loudness inversion: hover is **2.22×** and focus **1.97×** louder than selection, and hover and selection share one silhouette

From the single-baseline table in §2 (`probe-11-register-loudness.json`):

```json
"R_selected_dot": {"changedPx": 7037,  "pctOfRail": 11.11, "maxChannelDist": 147.2},
"R_hover_pill":   {"changedPx": 15611, "pctOfRail": 24.64, "maxChannelDist": 103.9},
"R_focus_ring":   {"changedPx": 13840, "pctOfRail": 21.84, "maxChannelDist": 109.0}
```

The hover fill is `--dock-control-hover-bg` (`:265`) = `color-mix(in srgb, light-dark(hsl(30 85% 96%),
…) 65%, transparent)` — a near-white 65 %-opaque plate on a pink veil. Against a **24 × 24 px**
item it is the loudest object in the rail. `shot-P-hover-pill-vs-dot.png` shows the two side by
side: `L` hovered is a bright white disc; `b` selected is a soft pink disc. **Same size, same
radius (`--radius-pill`, `:252`), same silhouette** — only the hue differs.

So the rail encodes *"my cursor is here"* and *"this is the channel you are editing"* in the same
shape at the same scale, and gives the transient one more contrast. A user glancing at the rail
cannot tell, from silhouette, which disc is the state and which is the cursor.

Two further consequences, both measured:

- **The selected item has no hover response.** `probe-01-registers.json` → `D_hoverSelected`: the
  selected button's `color` stays `oklch(0 0 0)` because the inline `:style` at `:34` outranks
  `:hover { color: var(--foreground) }` (`:264`); and its hover `background-color` is painted
  *behind* an opaque `lab(92 88.8 20)` dot that covers the button's entire padding box plus 1 px.
  Witness `shot-R3-hover-SELECTED-no-change.png`.
- **Focus can only ever land on the already-dotted item.** `railTabIndex()` (`:186-189`) gives
  `tabindex=0` to the selected item alone, and `onRailKeydown` (`:216-219`) emits `select` *before*
  `focus()`. Measured: `probe-11` → `"focusLandedOn": {"text":"L","selected":"true"}`; `probe-06`
  → `{"text":"α","selected":"true"}`. Focused-but-unselected is structurally unreachable — so the
  focus ring's only job is to say *"the rail has keyboard focus"*, and it says it by drawing a
  **pink halo around a pink dot** whenever the live colour is near `--accent-view`.

---

### D2-08 · MAJOR — the selection **does nothing to the instrument**: 0 changed pixels in the slider column, no scroll, no focus move — under a `role="tablist"` with no panel

`probe-10-effect-tooltip-prominence.json`, desktop 1440×900, clicking rail item `b`:

```json
"beforeSelect": {"scrollY":0, "consoleScrollTop":0, "rowsScrollTop":0, "activeEl":"BODY.relative"},
"afterSelect":  {"scrollY":0, "consoleScrollTop":0, "rowsScrollTop":0,
                 "activeEl":"BUTTON.channel-rail-item…", "activeIsSlider": false},
"selectionEffect": {
  "consoleDelta": {"changedPx": 68283, "pct": 8.51},
  "rowsDelta_theSlidersThemselves": {"changedPx": 0, "pct": 0, "max": 4.2}
}
```

**Zero pixels change in `.channel-rows`.** The page does not scroll. Focus does not move to the
slider. The 8.51 % console delta is entirely the rail's own dot and hover fill.

The handler is `ComponentSliders.vue:210-214`:

```ts
function scrollToSlider(component: string) {
    activeComponent.value = component;
    const el = sliderWrapperEls.value[component];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
```

With all four rows already in view, `block: "nearest"` is a no-op by definition. So the rail's
click contract, at desktop, is: *move my own dot, and take focus off whatever you were using.*

Now put that next to the ARIA the component asserts — `role="tablist"` (`:13`), `role="tab"`
(`:28`), `aria-selected` (`:30`). `grep -c "aria-controls" ConsoleRail.vue` → **0**; there is no
`tabpanel` anywhere in `demo/picker/`. A tablist promises *"activating me swaps the panel."* This
one swaps nothing. Every one of its four "panels" is permanently visible, permanently interactive,
and completely unaffected.

This is the design defect the prior round gestured at and mis-stated (§6, claim 1): it assumed
selection *"merely scrolls a slider row."* Measured, it does **less** than that.

---

### D2-09 · MINOR — on touch, the anatomy tooltip — the rail's only channel explanation — does not answer a tap

`probe-12-touch-register.json`, WebKit 390×844 `isMobile + hasTouch`:

```json
"arms": {
  "tap":       {"tooltips": [], "selected": ["false","true","false","false"]},
  "longPress": {"tooltips": [{"text":"a* (Green-Red)(-125 - 125)…","w":122.6,"h":62.2}]}
},
"coarseHoverSupport": {"anyHover": false, "hoverNone": true, "pointerCoarse": true}
```

A normal tap selects the channel and shows **no** tooltip. A sustained touch does open it — so the
anatomy is reachable, but only through a long-press with **no affordance anywhere on the rail
advertising that it exists**. The file itself designates this tooltip as *"the static range's
retirement home #1 (W4-3)"* (`:69-72`): the ranges were deliberately removed from the visible strip
and moved here. On touch, that retirement home has an undiscoverable door.

`shot-TCH-touch-tap-no-tooltip.png` is the tapped state.

---

### D2-10 · MINOR — the touch rung is **31.67 × 44 px**, not the "≥44px hits" the file claims

`:321-328`:

```css
/* THE TOUCH RUNG (t-mobile F-5) — ≥44px hits <lg via the producer's own
 * --dock-touch-target; hit areas grow, glyphs do NOT. */
@media (max-width: 1023px) {
    .channel-rail-item {
        min-height: var(--dock-touch-target, 2.75rem);
        min-width: calc(var(--dock-touch-target, 2.75rem) * 0.72);
    }
}
```

Measured at 390×844 (`probe-05` → `mobile390`): every item is `{"w": 31.67, "h": 44,
"minH": "44px", "minW": "31.68px"}`. The `* 0.72` factor is deliberate and undocumented in the
comment above it, so the shipped hit box is **28 % narrower** than the rung the comment asserts.
It clears WCAG 2.2 SC 2.5.8 (24 × 24) but not the 44 × 44 the comment names, and it is the sole
axis on which a portrait rail's targets are *tight* — the axis where a thumb arriving from the
side is least accurate.

Also gated on `max-width: 1023px`, i.e. **viewport**, not input device — while the sibling
touch-rung in the same console is correctly gated on `@media (pointer: coarse)`
(`ComponentSliders.vue:345`, whose comment says *"Gated on `pointer: coarse` (the input device),
never viewport width — the discontinuity was the width-keyed switch"*). Two touch rungs, one
console, opposite doctrines. `design/layout-gestalt-worker-o.md:537` already booked
`ConsoleRail.vue:323` as *"the 7th viewport media rule"*.

---

### D2-11 · MINOR — the light/dark weight hierarchy inverts: in dark, the enclosure outshines the letters

Measured borders and inks (`probe-05-pixels-spaces-arms.json`):

| scheme | ring (`--accent-view` @ 60 %, `:233`) | rest letters (`--console-rest-ink`, `:134-143`) |
|---|---|---|
| light | `oklab(0.470927 …/0.6)` — **L ≈ 0.471** | `oklch(0.4472 …)` — **L ≈ 0.447** |
| dark | `oklab(0.958322 …/0.6)` — **L ≈ 0.958** | `oklch(0.8776 …)` — **L ≈ 0.878** |

In light the ring and the letters carry near-equal weight (ΔL ≈ 0.024) and the intended hierarchy —
*"enclosure says NAVIGATION, letters speak INK"* — holds. In dark the ring jumps **0.08 above** the
letters and becomes the brightest thing in the rail; `shot-D-dark.png` shows a near-white capsule
outline dominating four dimmer glyphs. The enclosure out-shouts its own contents.

The asymmetry is structural: the letters are live-probed and WCAG-certified per scheme
(`:134-143`, `resolveMutedInk` → `ink.ts:146-155`), while the ring is a flat
`color-mix(… var(--accent-view) 60%, transparent)` with **no per-scheme weight calibration at all**.
The component applies rigour to the ink it owns and none to the enclosure it copied.

---

### D2-12 · MINOR — two typographic irregularities inside the glyph system

**(a) The α item is taller than its siblings.** `probe-01-registers.json` → `A_default`: `L/a/b`
are `h: 24.52`, `α` is `h: 25.62` — a 1.1 px (4.5 %) step, because `.rail-glyph--alpha`
(`:316-319`) swaps to Fira Code with different metrics while the button's `line-height: 1`
(`:248`) lets the taller face push the box. The rail's item rhythm is uniform for three rows and
then steps at the fourth, in every space.

**(b) The `ᴢ` small-cap does not render small.** `probe-09` code points:
`Jᴢ(U+4A+U+1D22) aᴢ(U+61+U+1D22) bᴢ(U+62+U+1D22)` vs, from `probe-08-ictcp-verify.json`,
`I / Cᴛ / Cᴘ` (U+1D1B, U+1D18). Compare `shot-V-ICtCp-verified.png`, where `Cᴛ` and `Cᴘ` show
genuinely small second glyphs, against `shot-A-Jzazbz.png`, where `Jᴢ aᴢ bᴢ` read as full-size
two-letter words. Consequence: Jzazbz is the **widest rail of all fourteen spaces** (41.23 px vs
ICtCp's 31.31 px), which is the single largest contributor to D2-05's 35 % swing. The registry at
`:156-164` treats U+1D22 as interchangeable with U+1D1B/U+1D18; Fraunces italic does not.

---

### D2-13 · MINOR — the tooltip's range caption uses `opacity-60`, the exact idiom its sibling declares a legibility defect

`:75`:

```html
<p class="fira-code text-mono-caption opacity-60 mt-0.5">{{ currentColorRanges[component] }}</p>
```

`ComponentSliders.vue:305-308`, forty lines away in the same folder:

> *"House mono voice, tabular by construction; full certified ink on the well (**never italic,
> never opacity** — the t-2000-41 legibility class)."*

Visible in `shot-V-ICtCp-verified.png`: `(-0.5 - 0.5)` sits noticeably washed against the glass
card. The same caption is separately booked by `audit/om-14-formatting/FORMAT-AUDIT.md:165`
(row `D-f`) as `INCONSIST — duplicate derivation`, so the line already carries a formatting
finding; this adds the legibility half.

---

### D2-14 · INFO — the design record names a voice the build removed

`:8-9` states the four-voice model: *"(ring says WHICH, dot-hue says LIVE, enclosure says
NAVIGATION, letters speak INK)"*. There is no ring on the dot — `:286-289` records that
**`T-28`'s ABROGATE law holds — no geometric ring anywhere on the organic silhouette**, and the
computed styles confirm it (`.rail-dot` carries only `width/height`, `:297-300`). Either "ring"
and "enclosure" are two names for one object — in which case the model has three voices, not four —
or the WHICH voice was deleted and the model never updated. A future reader implementing MT-F042
inherits a four-voice contract with a dead slot.

---

### D2-15 · INFO — two focus-ring doctrines coexist in the demo, and the rail is on the one the doctrine file doesn't describe

`demo/styles/focus-ring.css:3-6` declares itself *"**ONE token recipe reused by every
keyboard-operable control** … never a per-control literal"* and defines `--focus-ring-inner` /
`--focus-ring-outer` as a dual-contrast 1 px-dark-under-3 px-light pair. The rail (`:274`) — and
`ColorSpaceSelector.vue:278`, `ColorComponentDisplay.vue:181`, `GradientEasingEditor.vue:230,287`
— instead consume glass-ui's `--focus-ring-shadow`, a 30 %/15 % accent halo
(`foundation.css:257-264`). Measured on the rail: `0 0 0 2px color-mix(… accent 30%), 0 0 8px
color-mix(… accent 15%)`.

Not a rail defect on its own — the rail is with the majority — but the file asserting the singular
law is the one describing the *minority* recipe, and its forced-colors clause (the law D2-02 turns
on) therefore never reaches the five controls that need it.

---

## 4. What is measurably wrong, ranked by user cost

| # | severity | one line | proof |
|---|---|---|---|
| D2-01 | BLOCKER | no selected tab at boot or after any of 14 space changes | `probe-00`, `probe-09` |
| D2-02 | BLOCKER | zero focus indicator under forced-colors | `probe-03`, `probe-06` |
| D2-03 | MAJOR | press register dead except under reduced motion | `probe-02`, `probe-03` |
| D2-04 | MAJOR | 39.80 vs 43.50 px pitch; ±5.3 px letter/row misregistration | `probe-09`, `probe-05` |
| D2-05 | MAJOR | "persistent chassis": 8 widths, +35.0 % swing | `probe-09` |
| D2-06 | MAJOR | dot paints through the ring; −0.51/−0.76 px clearance | `probe-06` |
| D2-07 | MAJOR | hover 2.22× / focus 1.97× louder than selection; shared silhouette | `probe-11`, `probe-01` |
| D2-08 | MAJOR | selection changes 0 px in the slider column under `role=tablist` | `probe-10` |
| D2-09 | MINOR | tap yields no tooltip; hover register unreachable on touch | `probe-12` |
| D2-10 | MINOR | touch rung 31.67 × 44, not "≥44px"; viewport-gated | `probe-05` |
| D2-11 | MINOR | dark ring (L .958) outshines dark letters (L .878) | `probe-05` |
| D2-12 | MINOR | α item 1.1 px taller; `ᴢ` renders full-size where `ᴛ`/`ᴘ` do not | `probe-01`, `probe-08`, `probe-09` |
| D2-13 | MINOR | tooltip caption on `opacity-60` against the sibling's stated law | source + `shot-V-ICtCp-verified.png` |
| D2-14 | INFO | the four-voice model names a removed voice | source |
| D2-15 | INFO | two focus-ring doctrines | source |

---

## 5. Superlatives — what is implemented WELL, with proof

**S-1 · The active glyph's ink is derived from the fill, and it measures 10.02:1.**
`:147-149` computes `contrastInkFor(cssColorOpaque)` rather than stamping a fixed foreground.
`probe-06` pixel-samples the rendered composite of the α glyph sitting on the live dot:
`{"darkestGlyphPx":[0,0,0], "modalFillPx":[255,143,200], "ratio": 10.02}`. Not a modelled number —
that is the ratio of actual painted pixels. The F-3 dependent-guard reasoning at `:144-146` is
honoured in the build.

**S-2 · The space-correct glyph registry is real, and it works.**
`:156-164` claims each space speaks its own notation. Verified live, with the combobox label gating
each arm: `Lab → L a b α` · `LCh/OKLCh → L C h α` · `RGB → R G B α` · `HWB → H W B α` ·
`XYZ → X Y Z α` · `Kelvin → K α` · `ICtCp → I Cᴛ Cᴘ α` (`probe-08`) · `Jzazbz → Jᴢ aᴢ bᴢ α`
(`probe-09`). Fourteen arms, fourteen correct notations. The `N-1` A-collision the comment
describes is genuinely dead.

**S-3 · The α typographic rung genuinely separates alpha from CIELAB `a*`.**
`:306-319` argues that U+03B1 in Fraunces falls back to a near-twin of the italic `a`. Measured:
the three colour axes render `Fraunces` `italic`, and α renders `"Fira Code"` `normal`
(`probe-09`, every arm). In `shot-R0-default-NO-DOT.png` the `a` and the `α` are unmistakably
different species. The stated cure landed exactly as written.

**S-4 · The `T.W8-P1-R1` seat fix holds, and the focus ring composes correctly over the dot.**
The comment at `:41-51` records the dot once rendering `11.6 × 0px` and painting nothing. Measured
today: the seat is `25.84 × 26.34` and the dot fills it, `bg: lab(92 88.8 20)`,
`filter: url(#watercolor-filter-v-59)` (`probe-01`). And the focus ring paints *around* the dot
rather than under it — `probe-06` → `focusRingVsDot: {"hasDot": true, "boxShadow": "…2px…, …8px…",
"zIndexSeat": "0"}`, a 21.84 % measured delta. The specificity cure and the z-order are both sound.

**S-5 · Rest ink is live-probed per surface and certifies on the real composite.**
`:127-143` registers `bumpProbeEpochOnMount()` and derives `--console-rest-ink` from
`resolveSurfaceLightnessLive("veil", …)` rather than a static model — a genuinely careful piece of
engineering, and rare. Pixel-sampled on the running app (`probe-02`): darkest glyph pixel
`[86,84,83]` against modal ground `[242,218,212]` → **5.65:1**, comfortably over the 4.5 floor and
within 2 % of the `TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM` = 5.75 target the ink system aims at
(`ink.ts:15,17`). The reasoning survives contact with the compositor.

---

## 6. Re-adjudication of the prior (Codex, report-authored) round

Six numbered findings plus the closing "Required Kronecker cells" paragraph. Every ruling below is
made against live bytes; a REFUTED needs the same standard as a defect.

### Claim 1 — *"`role=tablist`/`role=tab` implies associated tabpanels, but no `aria-controls` or panel relationship exists. If selection merely scrolls a slider row, a radio/listbox or toolbar pattern may be more honest."*

**CONFIRMED — and the premise understates it.** Bytes: `role="tablist"` `:13`, `role="tab"` `:28`,
`grep -c "aria-controls" ConsoleRail.vue` → 0, no `tabpanel` in `demo/picker/`. The semantic
mismatch is real. But the conditional *"if selection merely scrolls"* is false in the direction that
makes it worse: `probe-10` measures **0 changed pixels** in `.channel-rows`, `scrollY` 0 → 0,
`activeIsSlider: false`. `scrollIntoView({block:"nearest"})` is a no-op with all rows visible. The
tablist does not scroll; it does nothing. Re-filed with measurement as **D2-08**.

### Claim 2 — *"Single glyphs such as `C`, `h`, `a`, `b`, and `α` require tooltip discovery. The visible rail alone does not communicate units, ranges, or which color space is active."*

**UNPROVEN.** The rail is not the only surface in the zone. `probe-04` finds a
`[role=combobox][aria-label="Select color space"]` with visible text `"Lab"` in the same card
region — the active space *is* stated adjacently; and each row carries `aria-label="L channel"`
(`ComponentSliders.vue:66`) plus a persistent live meter (`:84-86`, `.channel-meter`). So two of
the three things the claim says are missing are present within centimetres. "Units and ranges are
not on the rail" is true and *by design* — `:69-72` records the deliberate retirement of the static
range captions to the tooltip and the About card. A challenge that does not engage the stated design
decision has not established a defect. The genuine, measured gap in this area is that the tooltip is
tap-unreachable on touch — see **D2-09**, which the prior round did not test.

### Claim 3 — *"When `active` is invalid rather than null, no tab receives `tabindex=0`; keyboard entry into the rail becomes uncertain."*

**UNPROVEN, and mis-axed.** It is a restatement of this component's own `challenge-C-implementation.md`
finding 1 filed on the design axis. On reachability: `activeComponent` is assigned only from
`componentEntries` members (`ComponentSliders.vue:79`, `:211`) and reset to `null` on space change
(`:138`), so a non-null invalid `active` has no producer in the shipped parent. On the behaviour it
predicts: measured `probe-00` at boot — `L` has `tabindex="0"`, the other three `-1`; `probe-03`
reaches the rail by real Tab in 4 keystrokes (WebKit) / 9 (Chromium) and arrow-navigates it in both
engines. **Keyboard entry is not uncertain.** The *reachable* null-state defect — the one that
actually ships, on every boot and every space change — is the missing dot, which the prior round
never mentions (**D2-01**).

### Claim 4 — *"The live-color dot can become visually dominant or noisy across rapid color changes; no reduced-motion/high-contrast/forced-colors design is stated."*

**REFUTED as stated**, with one clause salvaged and escalated.

- *"Visually dominant"* — measured backwards. `probe-11`, one crop, one baseline: the dot moves
  **11.11 %** of the rail; the hover pill moves **24.64 %**; the focus ring **21.84 %**. The dot is
  the **quietest** register in the component (**D2-07**).
- *"Reduced-motion"* — measured backwards. The rail has no PRM rule of its own
  (`grep -c "prefers-reduced-motion"` → 0), but the global utility it consumes lives *inside*
  `(prefers-reduced-motion: no-preference)` (`animations.css:43`), which means reduced motion is the
  **only** mode where the press register renders at all (**D2-03**). The prior round asserted an
  unstated gap; the truth is an inverted one.
- *"Forced-colors"* — **the one salvageable clause, and far worse than stated.** Not merely
  "not stated": measured, the focus indicator is **entirely absent** in WHCM while `:focus-visible`
  matches, against this repo's own written warning at `focus-ring.css:31`. Escalated to BLOCKER as
  **D2-02**, with bytes and a witness. The prior round's own file could not have known this — it ran
  zero browser commands.

### Claim 5 — *"Tooltips remain the primary explanation. Touch users do not have a persistent anatomy legend, and long localized descriptions are constrained to `max-w-56`."*

**Split: half CONFIRMED-and-measured, half UNPROVEN.**
The touch half is real and I have promoted it to a measured finding — `probe-12`: a tap yields
`"tooltips": []`; only a sustained touch opens it; `any-hover: false` at 390 (**D2-09**). The
`max-w-56` half is not established: `:73` does carry `class="max-w-56"`, but *"long localized
descriptions"* presupposes localisation the tree does not have — descriptions come from
`colorSpaceInfo`'s English literals via `componentDescription()` (`:172-181`), and there is no i18n
layer in `demo/`. Measured, the longest live tooltip renders at `w: 122.6 px` inside a 224 px cap
(`probe-12`), i.e. **55 % of the budget**. No overflow exists to find.

### Claim 6 — *"The vertical chassis assumes enough height to distribute every channel. Dense spaces, landscape phones, and large text can compress or overflow it."*

**REFUTED by enumeration.** `PICKER_CHANNELS` (`demo/color-session/picker-color.ts:52-70`) has
**17 entries; sixteen have exactly 3 channels, one (`kelvin`) has 1** — plus alpha, giving the rail
exactly **n = 4 or n = 2**. There is no dense space; the maximum row count in this application is
four. Measured across 14 verified arms (`probe-09`): `railH` is `166.33` for every 4-channel space
and `79.33` for Kelvin — a constant, with **no compression and no overflow anywhere**, including at
390 × 844 where items sit at their 44 px floor inside a 194 px rail.

The real proportion defect runs the other way, and the prior round missed it: at **n = 2** the rail
becomes a 33 × 79 px capsule holding two letters, and its rhythm error against the rows is at its
**worst** — 36.11 px pitch against 43.50, a **17.0 %** mismatch (`shot-S-kelvin-2-channel.png`).
Low N, not high N, is where this enclosure breaks.

### The "Required Kronecker cells" paragraph

> *"Spaces × 1–5 channels × selected/null/invalid × dark/light/forced-colors × keyboard/touch/pointer
> × reduced-motion × phone portrait/landscape/desktop × short/long localized labels."*

**REFUTED as a plan — three of its eight factors do not exist in this tree**, which is precisely the
L-19 failure mode: a cross-product written from the file's surface rather than from the program's
actual state space.

| factor | status |
|---|---|
| `1–5 channels` | **fictional.** The domain is `{2, 4}` — `picker-color.ts:52-70`, enumerated above |
| `invalid` (active) | **fictional.** No producer in the shipped parent; `ComponentSliders.vue:79/138/211` |
| `short/long localized labels` | **fictional.** No i18n layer in `demo/`; descriptions are English literals in `colorSpaceInfo` |
| `spaces` | real — 14 arms driven and verified |
| `selected/null` | real — and the *null* cell is where the BLOCKER lives (D2-01), unflagged by the prior round |
| `dark/light/forced-colors` | real — all three driven; forced-colors yields the second BLOCKER (D2-02) |
| `keyboard/touch/pointer` | real — all three driven; touch yields D2-09 |
| `reduced-motion` | real — and it inverts the prior round's assumption (D2-03) |

The cells that mattered were reachable in a single afternoon on a stack that was already running.
The five factors that *were* real produced both BLOCKERs and four MAJORs. Enumerating the state
space would have cost less than writing the product of it.

---

## 7. Ledger against round 1

| round-1 finding | ruling | where it went |
|---|---|---|
| D#1 tablist without panels | **CONFIRMED** (premise understated) | D2-08, with 0-pixel measurement |
| D#2 glyphs need tooltip discovery | **UNPROVEN** | context refutes 2 of 3 clauses; real gap re-filed as D2-09 |
| D#3 invalid `active` breaks keyboard entry | **UNPROVEN** (mis-axed, unreachable) | reachable null-state defect is D2-01 |
| D#4 dot dominant / no PRM / no forced-colors | **REFUTED** (2 clauses inverted) | forced-colors clause escalated to D2-02 |
| D#5 tooltip-only + `max-w-56` overflow | **CONFIRMED in half** | touch half → D2-09; `max-w-56` half unproven (55 % of budget) |
| D#6 dense spaces overflow the chassis | **REFUTED by enumeration** | inverse defect at n = 2 → D2-04 |
| "Required Kronecker cells" | **REFUTED** (3 of 8 factors fictional) | §6 |

**New in round 2:** 15 findings, 5 superlatives, 46 witnesses, 12 JSON receipts, 13 re-runnable
probes. Round 1 produced 0 probes and 0 pixels.

---

## 8. Routing

- **D2-01** is owner-marked (**MT-F042** arm 1, `ROOT-FINDINGS.md:1665-1675`) and is the cheapest
  fix here: seed `activeComponent` to `componentEntries[0][0]` instead of `null`, at mount and in
  the space-change watcher (`ComponentSliders.vue:135`, `:138`). One-line-class, unblocks the mark's
  first arm.
- **D2-06** gates **MT-F042** arms 2–3: the loupe cannot "grow slightly larger on grab/select" from
  −0.51 px clearance. The enclosure's padding/seat/filter budget must be re-derived **before** the
  glass-forward toggle-indicator ask is authored, or the producer primitive inherits an impossible
  geometry. This belongs in the same relay letter, as a constraint on the ask.
- **D2-03** is not rail-local: `.stagger-children`'s `fill: both` (`animations.css:45`) suppresses
  `:active` transforms on **every** consumer, and the sibling `.channel-rows` carries the same class
  (`ComponentSliders.vue:48`). Route as a demo-wide motion finding, not a component patch.
- **D2-02** binds with `demo/styles/focus-ring.css` and the four sibling `--focus-ring-shadow`
  consumers (`ColorSpaceSelector.vue:278`, `ColorComponentDisplay.vue:181`,
  `GradientEasingEditor.vue:230,287`) — one forced-colors `outline` fallback in the shared register
  closes all five. Glass-forward if `--focus-ring-shadow` is the producer's token to fix
  (`foundation.css:257`).
- **D2-04 / D2-05** are proportion findings that belong to the Phase E rhythm/derivation row already
  scoped by `excavation/DESIGN-CANON-BRIEF.md:112` ("vertical rhythm from the type scale; the
  shared-row track-start contract"). The rail is the missing consumer of
  `ComponentSliders.vue`'s own T-59 one-law regime.
- **D2-10** joins `design/layout-gestalt-worker-o.md:537`'s `G-4` row, which already books
  `ConsoleRail.vue:323` as a viewport-keyed capability query.
- **D2-13** joins `audit/om-14-formatting/FORMAT-AUDIT.md:165` (row `D-f`) — same line, second
  finding.
