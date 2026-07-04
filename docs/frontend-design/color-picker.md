# Color Picker — frontend-design treatment

> **AMENDED — Tranche R.W0 (2026-07-03).** The pass-2 P1–P10 overlay-amendment packet (`docs/tranches/R/audit/pass2/overlay-amendment.md §5`, incl. the pass-3 P8 `:140` MATHEMATICS-pillar clause) is merged in editorially: the gamut overlay is re-specified from the vacuous "literal sRGB boundary over the square" to the honest **wide-gamut truth line** (display-p3 default lens, ΔE>JND contour), the breathing hues corrected to measurement (red/magenta flood, blue clears), the snap-resist beat re-specced as a **threshold detent** with a target-named `p3 ⊣` label, the render path settled to a 2D canvas consuming the engine-owned `sampleGamutBoundary`, and the ink/paper token pair minted. This merged treatment is the **R.W3 spec of record**.

> Target: the flagship perceptual color picker app (`demo/color-picker/`). The library underneath it is value.js — oklab/oklch, color-mix, 15 color spaces, perceptual ramps. This page is the showroom for that engine, so its design signature must be **perceptual color truth made visible**, not a generic color tool wearing the engine's logo.

---

## § Aesthetic direction

**The POV: a perceptual-color INSTRUMENT — a scientific specimen plate, not a paint app.**

Commit to one extreme: **editorial-instrument**. Think the plate of a color-science atlas (Munsell renotation charts, the CIE chromaticity horseshoe, an oscilloscope graticule) reissued by a magazine art department. Fraunces (already loaded) is the voice of a serious printed atlas; Fira Code is the voice of the measurement readout. The pop-art cartoon-offset shadow already in the system (`--shadow-cartoon: 8px 8px 0 0`, `style.css:114`) is the editorial swagger that keeps it from going cold and clinical. The two together — atlas-serif specimen + bold flat offset — is a register almost nothing else on the web occupies. Every competitor (coolors, Adobe, the hsl-wheel clones) is rounded, soft-shadowed, Inter-on-white. This page is **ink, grain, and a perceptually-uniform field that looks scientifically true.**

**The ONE unforgettable thing:** the picker field is the **familiar HSL spectrum square — KEPT, because it is the gesture everyone's hand already knows — with a perceptual truth-overlay drawn on top of it.** Every pixel of that square is an sRGB color by construction; what the square cannot say on its own is where the *wider* world begins. So as you drag, value.js reads the square's coordinates through a wide-gamut lens — **display-p3 by default, the gamut nearly every modern display physically shows** — and strokes a hairline contour where the color those coordinates name in the wide space **visibly exceeds what sRGB can honestly show** (the ΔE > JND locus, the engine's own just-noticeable-difference threshold). Beyond the line, a quiet hatch marks the visibly-clipped margin, and the whole figure contracts and swells as you turn the hue. You are still picking a color the way you always have — but now you can also *read where your display's color outruns the web's*, drawn as a mathematical graticule on the plate, captioned with its lens like any honest instrument. No mainstream picker shows you the gamut frontier breathing; this page alone owns it, **without throwing away the square the world is fluent in** — because value.js alone can compute the contour cheaply per-frame.

The differentiator in one sentence: **the color picker whose square you already know how to use, onto which the gamut is drawn as a visible, living contour — and where every channel slider is a true perceptual ramp computed by the engine, not a faked HSL stripe.**

> **Design-verdict note (proportion):** an earlier draft of this treatment proposed *replacing* the HSL/HSV square with a bare OKLCH L×C plane. Reversed. The square is the universal hand-memory of color picking and stays the substrate; perception is added **as an overlay** (contour + hatch + readout), never as a substitution. See § Design verdict reconciliation.

---

## § Current-state audit

The bones are strong (the slider gradients are *already* perceptually true; the type pairing is already characterful; the HSL square is a hand-familiar asset worth keeping). The gaps are concentrated in three places where the page is silent on its own thesis — the chrome is generic, and the square, while welcome, has no perceptual truth drawn on it yet. The fix is to *amplify*, not replace.

| # | Site | What reads weak / AI-slop / off-thesis | The SOTA bar |
|---|------|----------------------------------------|--------------|
| **A1 — the headline square is honest furniture, but mute on the thesis** | `SpectrumCanvas.vue:215-218` — `spectrumStyle` paints `linear-gradient(to right, #fff, hsl(${h}deg 100% 50%))` over `linear-gradient(to top, #000, transparent)`. | The hero 2D field is the **familiar HSV/HSL square** — and that familiarity is an *asset*: every visitor's hand already knows how to drag it, so it stays. The gap is not that the square exists; it is that the square says **nothing perceptual**. It shows no gamut frontier (every pixel of the square is in-gamut sRGB by construction — the plate is mute about everything beyond itself), and it never reveals that equal pixel steps are unequal *color* steps. The square is the substrate; the thesis is simply not drawn on it yet. | **KEEP the HSL/HSV square** (drag-stable, hand-familiar, the WatercolorDot rides it unchanged) and **draw perception on top as an overlay**: trace the **wide-gamut truth line — where display-p3 visibly exceeds sRGB (the ΔE>JND contour) — as a visible hairline** via value.js, hatch the visibly-clipped margin beyond it, and (easter-egg) let a faint perceptual-isostep graticule register the non-uniformity. The square earns honesty without losing the gesture the world is fluent in — a refinement, not a replacement. |
| **A2 — the space switch is furniture, not a moment** | `ColorSpaceSelector.vue:13-39` — a stock `Select` dropdown; the 15 color spaces are list rows with a 2px dot (`:31-34`). | Switching color space is *the* signature capability (15 spaces!), and it is presented as the most generic component on the page — a shadcn select. The dropdown has no perceptual preview of what each space *is*. | The space switch should be the page's second showpiece: each option previews its own gamut/ramp; the active switch **morph-animates** the field + the sliders between spaces (a cross-fade of two perceptual plates), so you *see* oklch→hsl→lab as different geometries of the same point. |
| **A3 — slider thumbs are generic** | `ComponentSliders.vue:93` — `border-2 border-gray-200 bg-transparent`. | A hardcoded `gray-200` knob over channel tracks that are gorgeous true ramps. The thumb is the one place the eye rests and it's a default. (Also the literal `gray-200` violates the token contract — no `--color-*` reach.) | A knob that reads as an instrument needle: hairline ink ring, a notch, value-aware contrast (the logic already exists in `SpectrumCanvas` `spectrumDotStyle:226-243` — it's just not shared to the sliders). |
| **B1 — no orchestrated load** | App mounts and everything is simply *there*. The only entrance motion is `.stagger-children` (`animations.css:34-50`) on the slider rows, and it re-fires on space-change — but the **card, the field, the space title never make an entrance.** | A flagship deserves one orchestrated open: the specimen plate is *placed* (the cartoon shadow casts as it lands), the field paints in, the channels cascade (the stagger already exists — wire the plate above it into the same timeline). | A single 600–800ms staged reveal, `--ease-spring`/`--spring-snappy` already in the system, honoring `prefers-reduced-motion` (the guard at `animations.css:60` already neutralizes it). |
| **B2 — background is generic atmosphere, decoupled from the thesis** | `App.vue:4-10` + `:229-262` — a full-viewport WebGL aurora seeded by the picker color. It's pretty, but it's *glass-ui's* generic aurora; it could be on any app. | The atmosphere tracks the picker color (good) but says nothing about *perception*. | Keep the seed coupling; add a thesis-bearing background layer — a faint **graticule / chromaticity-grid grain** so the whole page reads as a measurement plate, and let the aurora live *behind* it as the "color volume" glow. |
| **B3 — the readout doesn't celebrate the numbers** | `ColorComponentDisplay.vue` renders `text-4xl` Fira Code (per DESIGN.md:25). Good font, but it's a flat value. | An instrument's readout has a *typographic rhythm* — the integer part heavy, the fractional/unit part light, the channel letter as a small-cap index. | Numeric readout with tabular figures, weighted integer/fraction split, unit in muted small-caps. Fraunces has the optical-size axis; Fira Code has tabular figures by default. |

**What is already SOTA and must be PRESERVED (do not "improve"):**
- **The HSL/HSV spectrum square itself** (`SpectrumCanvas.vue:208-224`) — the universal, hand-familiar picking gesture. KEEP it as the substrate; the perceptual work lands *on top* as an overlay, never as a swap.
- **The crayon primaries + the `--rainbow-*` / `--accent-red` token families** (glass-ui `scale-paper.css:137-151`, `color-radius.css:258`) and the demo's `.pastel-rainbow-text` signature (`utils.css:35-48`). These saturated, full-tilt oklch primaries are a **restrained, intentful accent** — the demo's pop voice. KEEP them; the only discipline is *proportion* (see § COLOR): they fire on the celebratory/identity surfaces (palette headings, the harmony presets), not as picker-chrome noise.
- `useSliderGradients.ts:26-43` — each channel track is built by **stepping the real color through `toCSSColorString` per space** (10 stops). These are *genuine perceptual ramps*, the engine dogfooded correctly. This is the model for the gamut overlay. **Touch nothing here except to raise STEPS for the hero field's overlay pass.**
- The Fraunces (display/atlas) + Fira Code (readout) pairing — exactly right for the instrument register. Never swap to a neutral sans. (This is the AUDACIOUS-TYPOGRAPHY pillar; § TYPOGRAPHY pushes it *bolder*, not away.)
- The cartoon-offset shadow language (`style.css:114-117`) — the editorial swagger. Keep it as the plate's signature.
- The `WatercolorDot` spectrum cursor (`SpectrumCanvas.vue:21-29`) — a beautiful, on-brand wet-edge cursor. Keep; it rides the **same KEPT square**, now with the gamut contour drawn beneath it.

---

## § Refinements

Each item is concrete, respects the existing token system, and extends rather than replaces.

### TYPOGRAPHY (the AUDACIOUS-TYPOGRAPHY pillar — push it bolder + more mathematical)
The faces are right; the *typesetting* is timid. The pillar wants Fraunces' display optical-size pushed to its bloom and Fira Code's tabular/`ss01` math glyphs made load-bearing in the readout — characterful and *measured*, not merely present.

1. **Readout rhythm** — `ColorComponentDisplay.vue`. Split the value into `<span class="fig-int">` / `<span class="fig-frac">` / `<span class="fig-unit">`. Add to that component's scoped style:
   ```css
   .fig-int  { font-feature-settings: "tnum" 1; font-weight: 600; }
   .fig-frac { font-weight: 300; opacity: 0.55; }
   .fig-unit { font-variant: small-caps; letter-spacing: 0.04em; opacity: 0.5;
               font-size: 0.55em; }
   ```
   Tabular figures (`tnum`) stop the readout from jittering as digits change during a drag — the single most "instrument-grade" detail available for free.

2. **Space title as a plate caption** — `ColorSpaceSelector.vue:17`. The trigger is already `italic text-title sm:text-display` Fraunces — perfect. Add an over-line: a Fira Code small-caps eyebrow `"COLOR SPACE — 03 / 15"` above it (the index of the active space among 15), so the switch reads as a catalog entry. Use `.section-label` (glass-ui) + `font-variant: small-caps`.

3. **Channel rail letters** — `ComponentSliders.vue:29` already sets `font-display text-subheading italic` in live channel color. Strengthen the active one with the optical-size axis: `font-variation-settings: "opsz" 144` on `[aria-selected="true"]` so the active channel letter visibly *blooms* (Fraunces 9–144 opsz is loaded, `index.html:14`). One-line addition to the existing `.channel-rail-item[aria-selected="true"]` rule (`ComponentSliders.vue:408`).

### COLOR
The palette is already token-correct; the move is to make **perception the visible subject** — while keeping the crayon/rainbow voice intact and *proportioned*.

0. **KEEP the crayons; proportion them** — the saturated `--rainbow-*` primaries and `--accent-red` (glass-ui `scale-paper.css`) and the demo's `.pastel-rainbow-text` are a *signature*, not a smell. The discipline is **placement, not removal**: let them fire where the page is being celebratory/identity-bearing (the palette heading, the harmony-preset chips in `useColorGeneration.ts`, the active-space catalog index), and stay *out* of the measurement chrome (the gamut overlay, the readout, the slider thumbs — those read in ink + the live color). Restraint = the crayons are an accent that *lands*, not a wash. This is the "refine the USE" of the primaries the system already owns.

1. **Out-of-gamut as a designed state** — define four project tokens in `style.css :root` (the sanctioned home, DESIGN.md:11): an ink pair and a paper pair, because the contour must stay legible over *every* (s,v) region of the field — single-ink hatch disappears on dark/saturated substrate (proven in prototype):
   ```css
   --gamut-edge:        color-mix(in oklab, var(--foreground) 28%, transparent);
   --gamut-hatch:       repeating-linear-gradient(45deg,
                          transparent 0 5px,
                          color-mix(in oklab, var(--foreground) 9%, transparent) 5px 6px);
   --gamut-edge-paper:  color-mix(in oklab, var(--background) 50%, transparent);
   --gamut-hatch-paper: repeating-linear-gradient(45deg,
                          transparent 0 5px,
                          color-mix(in oklab, var(--background) 12%, transparent) 5px 6px);
   ```
   The overlay's canvas resolves all four via a computed-style probe and applies them **per contour segment by the field's own luma** — the exact `spectrumDotStyle` logic (`SpectrumCanvas.vue:231-233`: luma = v·(1−s/2), flip at 0.5 — one shared helper, one threshold, so the contour's ink regime and the dot's border regime never disagree about the same region): ink pair over light field, paper pair over dark; the hatch is drawn twice, registered. This is the visual vocabulary of the signature moment.

2. **Keep `--color-gold` (`style.css:68`) reserved for admin** — do NOT let the gold leak into the *measurement* chrome (overlay/readout/thumbs). The picker's working accent there is the live color itself (`cssColorOpaque`), already threaded through `SAFE_ACCENT_KEY`. (Note: this is a discipline on the *chrome*, distinct from clause 0 — the crayon/rainbow primaries are explicitly welcome on the celebratory/identity surfaces; only the instrument readout stays monochrome-plus-live-color so the numbers read true.)

3. **Kill the literal `gray-200`** at `ComponentSliders.vue:93` — replace with `border-[var(--gamut-edge)]` (the hairline-ink ring), closing a real token-contract violation while serving the aesthetic.

### MOTION
One orchestrated open; everything else is micro.

1. **The plate placement (load)** — wrap the `Card tier="resting"` (`ColorPicker.vue:3`) in a one-shot entrance. New scoped keyframe in `ColorPicker.vue`:
   ```css
   @media (prefers-reduced-motion: no-preference) {
     @keyframes plate-land {
       from { opacity: 0; transform: translateY(-12px) rotate(-0.6deg);
              box-shadow: 0 0 0 0 transparent; }
       to   { opacity: 1; transform: none; box-shadow: var(--shadow-cartoon); }
     }
     .pane-shell > :first-child { animation: plate-land 560ms var(--spring-snappy) both; }
   }
   ```
   The shadow *casting in* as the plate settles is the editorial signature in motion. Reuses `--spring-snappy` + `--shadow-cartoon` — no new tokens.

2. **Stage the field after the plate** — give `SpectrumCanvas` a `paint-in` (opacity + a 1.2→1 scale on its background) at ~180ms delay, so the sequence is *plate → field → channels cascade* (the `.stagger-children` at `animations.css:40` already owns the third beat). Three beats, one breath.

3. **Space-switch as a cross-fade morph** — when `currentColorSpace` changes (`ComponentSliders.vue:156`, `SpectrumCanvas`), the field should cross-fade between the old and new perceptual plate rather than hard-swap. A 240ms (`--duration-normal`) opacity cross-fade of two stacked field layers; the slider stagger already re-fires via `animationKey` (`ComponentSliders.vue:159-160`). This makes "15 color spaces" *feel* like 15 geometries.

### SPATIAL
The two-pane grid (`style.css:189-209`) is sound. The refinement is *within* the plate.

1. **Asymmetry in the field (over the KEPT square)** — the hero field is a plain rectangle (`SpectrumCanvas.vue:9`, `h-[20dvh] … lg:h-[14rem]`) holding the HSL square. Let the gamut hatch break the *content* without touching the *gesture*: the square stays the draggable substrate; the truth-line contour + hatch overlay it so the sRGB-faithful region reads as an organic specimen shape and the margin beyond the line reads as the wider target's visibly-clipped territory — flooding in from the top edge at red and magenta hues, vanishing entirely at blue. The *rectangle and the square both stay* (layout-stable, hand-familiar) — the boundary is the only thing newly drawn.

2. **Graticule registration (PAPER × MATHEMATICS pillar)** — overlay a faint 1px grid (CSS `background-image` linear-gradient grid at ~16px) on the field at `--gamut-edge` × 0.3, like an instrument graticule on drafting paper. This is the PAPER substrate and the MATHEMATICS-made-visible pillars meeting on the plate; it anchors the "measurement plate" read without competing with the GLASS card it sits inside.

### MICRO-INTERACTIONS
1. **Slider thumb = instrument needle** — share `SpectrumCanvas`'s value-aware border logic (`spectrumDotStyle:319-337`, the `luma`-driven black/white contrast — the shared `spectrumLuma.ts` helper since R.W3 Lane B) to the slider thumb so the knob always reads against its ramp. Add a center notch (`::after`, 1px ink line). `ComponentSliders.vue:93` + scoped `.slider-thumb`.
2. **Channel-letter bloom on hover** — already scales 1.08 (`ComponentSliders.vue:404`); add a subtle `opsz` bump alongside the scale so the letter *grows in weight*, not just size.
3. **Field cursor halo** — on `pointerdown`, ring the `WatercolorDot` with a momentary `--gamut-edge` pulse (a 1-shot scale ring) so the grab registers physically. Tie to the existing `isDragging` ref (`SpectrumCanvas.vue:46`).
4. **Threshold detent at the truth line** — when a drag carries the `WatercolorDot` outward across the JND contour, the dot — and the model value with it, so the resistance is real — holds at the contour for ~6px of pointer travel, then releases and catches up; a Fira Code micro-label naming the **instrument's lens** — `p3 ⊣` (or `rec2020 ⊣` / `a98 ⊣` when retargeted) — surfaces at the cursor for the detent's duration. A detent, **not a wall**: every point of the square is a legitimate sRGB color, so the drag always completes — what you feel is the threshold where the wide target's color visibly exceeds what sRGB shows. One detent per crossing; inbound crossings free; no contour (blue hues at display-p3) ⇒ no detent — the absence of resistance is the same fact as the absence of the line. The label's appear/fade honors `prefers-reduced-motion`; the detent itself is drag physics tied to user input. The boundary becomes *felt*, not just seen.

### BACKGROUND
1. **Keep** the picker-seeded aurora (`App.vue:247-262`) — the live-color coupling is genuinely good and on-thesis (atmosphere = the chosen color's volume).
2. **Add a graticule grain layer (the PAPER pillar, amplified)** between aurora and content: a fixed, `aria-hidden` div with a faint chromaticity-grid `background-image` + a noise mask, at very low opacity. This is the drafting-table / graph-paper substrate the design language already prizes, pulled up to page scale — it unifies the whole page into "an instrument plate on drafting paper" rather than "a card floating on a gradient," and lets the GLASS card and the aurora-as-color-volume read as the floating instrument above it. Honor `prefers-reduced-motion` by freezing any drift.
3. The CSS-fallback gradient (`App.vue:258-262`) already exists for low-power devices — extend the graticule as a static layer there too, so the thesis survives even without WebGL.

---

## § The one unforgettable moment

**The breathing gamut — a quiet truth line drawn over the square you already know.**

Drag across the hero field — the *same familiar HSL square*, unchanged in feel — and watch the **display-p3 truth line contract and swell as the hue turns.** At red, the hatched margin floods in from the top edge — three-quarters of the square's most saturated colors name a P3 color that sRGB visibly cannot show (measured: 74.7% of the top edge). At magenta the flood peaks (82.7%). Sweep toward yellow and the margin retreats to a corner balloon (21.9%). Turn to blue and **the plate goes clear — no contour at all — because sRGB holds every blue this square can name**; the caption states the fact in-instrument (`p3 Δ < JND — plate clear`), so the emptiest state still reads as a measurement, not a malfunction. One full hue turn swings the visible-clip margin from nothing to four-fifths of the top edge: the breathing is the drama. The `WatercolorDot`, dragged outward across the line where it exists, **detents for a few pixels and surfaces a `p3 ⊣` tick** before continuing — a threshold you feel, never a wall.

**The instrument's lens.** The overlay reads the square through a wide-gamut target — **default: display-p3**, the comparison nearly every modern display makes physically real — and *names it on the plate*: a Fira Code small-caps eyebrow in the plate caption, `GAMUT LENS — DISPLAY-P3 / SRGB`, sharing the catalog register of the space title. When the picked color space is itself a wide RGB space (display-p3, a98-rgb, rec2020), the lens follows it and the caption re-names — so the space switch redraws the contour, a real geometry change riding the A2 morph. For sRGB-family, hex, and unbounded spaces (oklch, lab), the lens stays at its default: the signature is **always on**, never an easter egg behind a dropdown — an instrument with a stated default lens, like a plate that names its illuminant. *(Default-lens policy tabled for R.W3 ratification: B-with-override, recommended, vs. strict display-p3.)* The caption also carries the breathing numbers — the hue's sRGB cusp readout (`cusp L 0.968 C 0.211`) — while the on-plate datum is the contour's **innermost point**, a 9px ink crosshair (the cusp itself always projects to the square's top-right corner, so it lives in the readout, not on the plate).

The proportion is the whole point: a 28%-alpha hairline and a 9% hatch — a whisper drawn over the universal picking gesture, not a re-theme of it. Your hand still does what it always did; the page just quietly shows you the truth underneath. No other color picker on the web does this. Adobe's clamps silently; coolors doesn't model it at all. Here the *frontier of color itself* is surfaced as a living contour — and value.js is the only library in the demo that can compute the boundary cheaply enough to animate it live (proven: ≈0.3 ms/frame total unthrottled, ~7× inside the <2 ms budget; zero dropped frames at 120 Hz, held under 4× CPU throttle). It is the page's thesis (perceptual truth) folded into the existing gesture: **you can feel where your display's color outruns the web's, on the square you've used your whole life.**

Implementation core: **keep** the HSL `spectrumStyle` (`SpectrumCanvas.vue:208-224`) as the base layer; **add** a stacked **2D-canvas** overlay (`position:absolute; inset:0; pointer-events:none; border-radius:inherit`, device-pixel backing dpr-capped at 2 — the render path settled by prototype: canvas is the only path supporting luma-adaptive dual-ink; clip-path survives as the no-canvas fallback; WebGL rejected as a wrong-truth approximation). Per the current hue and lens, the overlay (a) samples the truth field **g(s,v) = ΔE_OK(wide(s,v,h), gamutMapOKLab(·)) − JND** via the engine-owned `sampleGamutBoundary(hueDeg, target, {columns, mode})` (`src/units/color/`, beside `gamut.ts` — specced by the boundary-api lane, landing with the R.W1 cut; the demo consumes engine geometry, never re-derives matrices), (b) strokes the JND contour as a device-pixel hairline in `--gamut-edge`/`--gamut-edge-paper` per segment luma (threshold 0.5, shared with `spectrumDotStyle`), (c) fills the visibly-clipped margin with the registered dual `--gamut-hatch`/`--gamut-hatch-paper` tiles — hatch phase drifting with hue (the breathing; frozen under `prefers-reduced-motion: reduce`, while the contour position still tracks hue, since it is user-driven state, not decoration), and (d) renders clear + caption when the field is everywhere faithful. The HSL square renders underneath unchanged (drag math, WatercolorDot, hand-memory all preserved). Recompute on hue/lens change inside the existing rAF gate (`SpectrumCanvas.vue:94-105`) — 96-column bisection, 0.2–0.5 ms worst case.

---

## § Design verdict reconciliation

This treatment was revised to honor the binding design verdict on the demo fleet. What was **reversed or tempered**, and why:

- **REVERSED — "replace the HSL spectrum square" → KEEP it, draw perception over it.** The original A1 row and the "one unforgettable thing" proposed swapping the familiar HSV/HSL square for a bare OKLCH L×C plane and called the square a "headline betrayal." That abrogates the gesture the entire world is fluent in. The square is now the *kept substrate* (`SpectrumCanvas.vue:208-224`, drag math + `WatercolorDot` untouched); the gamut contour, hatch, and isostep graticule are an **overlay** drawn on top. Perception is *added*, never substituted. (Verdict clause 1 + 2.)
- **REVERSED — the crayon-kill instinct → KEEP the crayons, proportion their use.** Added § COLOR clause 0 and a PRESERVE-list entry affirming the saturated `--rainbow-*` / `--accent-red` primaries (glass-ui `scale-paper.css:137-151`, `color-radius.css:258`) and the demo's `.pastel-rainbow-text` signature (`utils.css:35-48`). They are an intentful accent the user explicitly likes; the only discipline is *placement* — they fire on celebratory/identity surfaces (palette headings, harmony presets, the catalog index), not in the measurement chrome. The `--color-gold` clause was rewritten to scope its "no leak" rule to the *readout/overlay/thumbs only*, so it no longer reads as a blanket ban on the demo's color voice. (Verdict clause 1.)
- **TEMPERED — wholesale-replacement language → refine-not-abrogate the four pillars.** Implementation-plan items 1 and 2 now read "KEEP … ADD" rather than "Replace." The four pillars are named and amplified in place: GLASS (the resting Card plate the overlay sits inside), PAPER (the graticule grain pulled to page scale as drafting-table substrate), AUDACIOUS TYPOGRAPHY (Fraunces opsz bloom + Fira Code tabular/`ss01` math glyphs pushed bolder, not swapped), MATHEMATICS (the wide-gamut truth line — display-p3 vs sRGB, ΔE>JND — + perceptual isostep graticule made beautifully visible). (Verdict clause 2.)
- **FOLDED as easter-eggs (proportionate, not dominant) — the signature moments.** The breathing sRGB gamut boundary is reframed as a *delight drawn over* the kept square — a signature contour, your hand still does what it always did. The target-named `p3 ⊣` detent tick, the cursor halo, and the perceptual-isostep graticule are tasteful, proportionate signature refinements, never re-themes. (Verdict clause 3 + 4.)

- **AMENDED (Tranche R, pass 2) — the overlay's geometry corrected by prototype evidence, the register unchanged.** The literal "sRGB boundary over the square" was vacuous — the HSV square is a bijection of the sRGB cube, so the honest instrument strokes where a **wide target** (display-p3 default, captioned as the lens) exceeds sRGB by more than the engine's JND (`gamut.ts:55`), not raw membership. The narrative hues were backwards and now match measurement (red/magenta flood, blue clears — the clear plate is captioned content). The snap-resist beat survives as a **threshold detent** with a target-named label. Render path fixed: 2D canvas (dual-ink luma-adaptive, threshold 0.5 shared with `spectrumDotStyle`); geometry consumed from the engine-owned `sampleGamutBoundary`. Proportion holds: the always-on contour is a 28%-alpha hairline — the instrument's reticle, not a re-theme. (Verdict clauses 1–4 all still honored; `proto-gamut-overlay.md` F1–F6 + `CRIT-proto-gamut-overlay.md` mustFix 1–4.)

Everything else in the treatment — the orchestrated plate-land load, the readout rhythm, the catalog caption, the slider-thumb needle, the aurora-as-color-volume coupling — was already a refinement-in-place of the extant token system and is preserved as written.

---

## § Implementation plan (priority order)

1. **`SpectrumCanvas.vue` — the headline.** **KEEP** the HSL `spectrumStyle` (`:208-224`) as the base square; **ADD** the stacked 2D-canvas overlay that strokes the wide-target JND contour + dual-ink hatched margin over it (clip-path as the no-canvas fallback). Add the four `--gamut-edge`/`--gamut-hatch` ink+paper tokens to `style.css :root`. Consume geometry from the engine-owned `sampleGamutBoundary(hueDeg, target, {columns, mode})` (boundary-api lane, R.W1) — the demo owns paint, never math. Default lens display-p3, captioned on the plate; retarget on wide-RGB space selection (pending the R.W3 lens ratification). This single file delivers ~70% of the redesign's impact and is the thesis made real — *as an overlay on the kept gesture, never a replacement of it.* *(Largest effort; do first.)*
2. **`SpectrumCanvas.vue` — the felt boundary.** Add the cursor halo on `isDragging` + the **threshold detent at the JND contour** with the target-named `p3 ⊣` micro-label (detent = dot+model hold ~6px then release; outbound crossings only; no contour ⇒ no detent). Crossing detection reuses the render pass's boundary samples — zero new geometry. Completes the signature moment.
3. **`ComponentSliders.vue` — thumb + channel bloom.** Replace `gray-200` (`:93`) with `--gamut-edge` hairline + value-aware contrast (share `spectrumDotStyle` logic); add the notch; add `opsz` bloom to the active channel letter (`:408`). Token-contract fix + instrument feel.
4. **`ColorPicker.vue` — orchestrated load.** Add `plate-land` keyframe (cartoon shadow casting in) on `.pane-shell > :first-child`; stage `SpectrumCanvas` paint-in at +180ms so the existing `.stagger-children` becomes beat three.
5. **`ColorComponentDisplay.vue` — readout rhythm.** Split int/frac/unit spans, tabular figures, small-caps unit. Cheap, high polish-per-line.
6. **`ColorSpaceSelector.vue` — catalog caption.** Add the `"COLOR SPACE — 03 / 15"` small-caps eyebrow; per-option gamut preview swatch in the dropdown (`:23-36`); cross-fade the field on switch.
7. **`App.vue` / `style.css` — graticule grain.** Add the measurement-plate grid layer between aurora and content (`App.vue:4-10` region), low opacity, reduced-motion-frozen, CSS-fallback-aware (`:258-262`).

**Guardrails (per the project's own gate-blindspot lessons):** every change rides existing tokens (`--duration-*`, `--spring-snappy`, `--shadow-cartoon`, `--ease-standard`); new tokens (`--gamut-edge`, `--gamut-hatch`, `--gamut-edge-paper`, `--gamut-hatch-paper`) land in `style.css :root` with a rationale comment per DESIGN.md:11 — never a parallel CSS file. All motion sits inside `prefers-reduced-motion: no-preference` (the `animations.css:60` guard already neutralizes transitions). No `:deep()` into reka-ui; no numeric `z-[NN]`; no `100vh`. The redesign *extends* the editorial-instrument system already present — it is not a wholesale swap.
