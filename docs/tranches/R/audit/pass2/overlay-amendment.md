# overlay-amendment — Pass-2 AMENDMENT PACKET for `docs/frontend-design/color-picker.md`

**AMENDED-AT-PASS-3** (2026-07-02, lane L3-doc-sweeps, discharging PASS2-VERDICT §3 M5 / CRIT-overlay-amendment.md mustFix 1): P8 extended with the `:140` MATHEMATICS-pillar REPLACE, the §7 ledger given its missing row, and the two non-blocking nits (P4→P6 numbering gap; `spectrumDotStyle` span) folded in as a footnote — same motion, per the critic's "optional." No prior content struck; this remains the pass-2 packet plus the pass-3 sweep.

**Lane:** Pass-2 seed 4 (overlay-amendment) · Fable DESIGN lane · 2026-07-02
**Descends from:** proto-gamut-overlay (88%, `scratchpad/pass1/proto-gamut-overlay.md`) + `docs/tranches/R/audit/pass1/CRIT-proto-gamut-overlay.md` (mustFix 1–4) + `PASS1-VERDICT.md` §4.3/§4.4, §5 P0#4 + P2#14.
**Deliverable:** directly-mergeable replacement passages for the treatment (`docs/frontend-design/color-picker.md`), plus the tabled default-target decision for R.W3 ratification. Treatment text is quoted exactly (old → new); every load-bearing claim carries a file:line cite.
**Independent verification done this pass:** `DEFAULT_COLOR_SPACE = "oklch"` (`demo/@/components/custom/color-picker/index.ts:37`) — the picker's *actual* default space is **unbounded**, i.e. outside the overlay's v1 wide-RGB scope entirely; luma logic + threshold at `SpectrumCanvas.vue:231-233` (`luma = v·(1−s·0.5)`, flip at `luma > 0.5`); matrix declaration lines `RGB_XYZ_MATRIX` at `src/units/color/conversions/xyz-extended.ts:46`, `DISPLAY_P3_XYZ_MATRIX` at `:88` (`XYZ_DISPLAY_P3_MATRIX:93`, `XYZ_D50_PROPHOTO_MATRIX:109` stand as the critic recorded).

---

## §0 — Disposition summary

| Beat | Disposition | Where it lands in the treatment |
|---|---|---|
| (a) `sRGB ⊣` snap-resist (:113/:126/:141/:150) | **RE-SPEC, not kill** — the haptic survives; the trigger and label change. New form: **threshold detent at the ΔE>JND contour**, label names the *instrument target* (`p3 ⊣`). | P6 (:113), P7 (:126/:128), P8 (:141), P9 (:150) |
| (b) Default target | **TABLED with position: display-p3 instrument default, retargeted by `selectedColorSpace` only when that space is wide-RGB.** R.W3 ratifies. | §2 table + P7 new clause |
| (c) Breathing-narrative hues | **REWRITTEN honestly** — red/magenta flood, yellow corner-balloons, blue clears the plate; the clear plate is captioned in-instrument. | P1 (:13), P7 (:126) |
| (d) Citation sweep | **F5: adopt threshold 0.5** (source parity — instrument coherence, argued §4); **F8.1 line cites → 46/88**. | P3 (:69-76), §4, P7 (:130) |

No beat is orphaned; every occurrence of the old semantics in the treatment is either replaced below or verified untouched-safe.

---

## §1 — Beat (a): the snap-resist beat, re-specified

### Why re-spec and not kill

The beat is one of the treatment's four folded signature refinements (`color-picker.md:141`) and the only *haptic* one — "the boundary becomes **felt**, not just seen" (:113) is the sentence that turns the overlay from a drawing into an instrument. What died under F1 is not the beat but its **physics**: on the sRGB-native square nothing can ever be "carried past the gamut edge" (`proto-gamut-overlay.md` F1 — the square is a bijection of the sRGB cube, confirmed algebraically by the critic against `SpectrumCanvas.vue:215-217`), so "resist… before clamping" describes an impossible event. The design value — a felt tick at the truth line — transfers intact to the corrected geometry. Killing it would drop the treatment's only tactile beat to cure a semantics bug; re-specifying costs one paragraph.

### The corrected physics

- **Trigger:** the WatercolorDot crossing the **ΔE>JND contour** of the active wide target (field g = ΔE_OK(wide, gamutMapOKLab(wide)) − 0.02; `src/units/color/gamut.ts:55` JND, `:251` gamutMapOKLab — proto F2, critic-verified), outbound (faithful-side → visible-clip side).
- **Behavior:** a **detent, not a wall.** Every point of the square is a legitimate sRGB color, so the drag always completes. On crossing, the dot — *and the model value with it*, so the resistance is real, not a cosmetic lag — holds at the contour for ~6px of pointer travel, then releases and catches up. One detent per crossing; inbound crossings free.
- **Label:** a Fira Code micro-label at the cursor naming the **instrument target**, not sRGB: **`p3 ⊣`** (or `rec2020 ⊣` / `a98 ⊣` when retargeted, §2). The old `sRGB ⊣` claimed "sRGB ends here," which is false — sRGB is everywhere on this square. The new label reads "beyond this line, the color these coordinates name in display-p3 cannot be honestly shown in sRGB" — target-named, exactly the F1 semantics.
- **Degenerate state:** no contour ⇒ no detent (e.g. blue hues at display-p3, proto F3: 0.0% of the top edge). The absence of resistance is the same fact as the absence of the line — the instrument stays consistent.
- **Motion discipline:** the detent itself is drag physics tied to user input (state, not decoration — same ruling as the contour tracking hue under PRM, proto geometry-spec §"Update throttle"); the label's appear/fade animation sits inside `prefers-reduced-motion: no-preference`.
- **Geometry cost:** crossing detection is a per-column contour lookup against the same `sampleGamutBoundary` samples the render pass already computed — zero new geometry.

Mergeable text: P6, P7, P8, P9 below.

---

## §2 — Beat (b): the default-target decision, TABLED

**The question:** what wide target does the overlay stroke when the page loads?

| | **Option A — `selectedColorSpace`-keyed** | **Option B — display-p3 instrument default** |
|---|---|---|
| Wiring | Overlay target = `selectedColorSpace` when ∈ {display-p3, a98-rgb, rec2020}; otherwise **no overlay**. | The overlay is an instrument with its own lens, default **display-p3**, independent of the picked space; the plate caption always names it. |
| First-paint state | **Nothing.** The shipped default space is `oklch` (`demo/@/components/custom/color-picker/index.ts:37`) — *unbounded*, outside the overlay's v1 wide-RGB scope (proto F1 scoping). sRGB-family and hex states: also nothing. The contour renders only for visitors who already know what display-p3 is and select it. | **The signature, immediately.** F3 measurements (jnd, display-p3): red hue — **74.7%** of the square's top edge visibly clips; magenta — **82.7%**; yellow — 21.9%; blue — **0.0%** (plate clear). One hue turn swings the margin 0→83%: the breathing is dramatic on first contact. |
| Honesty | One space on the plate; zero hidden instrument state. | Two spaces implicated (picked vs. lens) — honest **only if captioned**; unnamed it would be deceptive, so the caption is mandatory, not optional. |
| Cost to the thesis | The treatment's §-one-unforgettable-moment (:122) claims "No other color picker on the web does this" (:128). **A claim that must be visible to be true.** Keyed to Option A, the one unforgettable thing becomes an easter egg behind a dropdown — for the actual default (`oklch`) it is not even reachable by accident. | None. The 2026 question the instrument answers is precisely "your display shows P3; sRGB is the web's contract — here is where they visibly disagree." |

### Position (this lane, in the treatment's voice)

**Option B, with a keyed override: default lens = display-p3; when the user selects a wide-RGB space, the lens follows it (and the caption re-names).** sRGB-family, hex, and unbounded spaces leave the lens at its default.

The argument: **instruments have default lenses, and plates name their conditions.** A Munsell plate states its illuminant; a scope states its volts-per-division. Defaulting the lens to display-p3 is not a deception — it is the instrument choosing the one comparison nearly every 2026 display makes physically real, and *saying so* in a Fira Code eyebrow on the plate (`GAMUT LENS — DISPLAY-P3 / SRGB`, sharing the catalog-caption register of :60). The keyed override preserves Option A's genuine virtue — selecting rec2020 visibly re-draws the contour, which hands A2's "space switch as a moment" (:28) a real geometry change for free — without Option A's fatal blindness in the default state.

Proportion audit (against the binding design verdict, :136-141): always-visible ≠ disproportionate. The overlay's ink is a 28%-alpha hairline and a 9%/12% hatch (:71-75 + P3) — a whisper on the plate until you look. What stays easter-egg-registered is the detent, the label, and the isostep graticule; the contour itself graduates from easter egg to **the instrument's reticle**, which is what the thesis ("perceptual color truth made visible," :3) demanded all along. The word "easter-egg" is removed from the moment's headline (P7) accordingly.

**For R.W3 ratification:** accept B-with-override (recommended), or strict B (lens permanently display-p3, no override). Option A is argued above as failing the treatment's own visibility premise; adopting it should require overruling this packet's position on the record.

---

## §3 — Beat (c): the breathing narrative, corrected

The old :126 hues ("yellow balloons, blue floods") were written for the abandoned OKLCH-plane framing and are **backwards** on the kept HSV square with a p3 lens (proto F3, measured): **red and magenta flood** (74.7% / 82.7% of the top edge visibly clips), **yellow balloons modestly at the corner** (21.9%), and **blue clears the plate entirely** (0.0% — sRGB holds every blue this square can name, relative to display-p3). The rewrite (P7) states the measured hues, and treats the clear plate as content: the caption slot renders the fact in-instrument (`p3 Δ < JND — plate clear`), so the emptiest state still *reads*. The rewrite also folds in proto F6: the on-plate datum is the contour's innermost point (a 9px ink crosshair), while the Ottosson cusp — which always projects to the square's (1,1) corner and is therefore vacuous as a position — lives as breathing numbers in the caption readout (`cusp L 0.968 C 0.211`).

---

## §4 — Beat (d): citation sweep

1. **F5 luma threshold — ADOPT 0.5 (source parity).** The source of truth is `spectrumDotStyle` (`SpectrumCanvas.vue:231-233`): `luma = v·(1−s·0.5)`, regime flip at `luma > 0.5`. The sandbox's 0.45 (`OverlayCanvas.vue:108`) was an unjustified divergence — nothing in the prototype's evidence argues for it. The decisive argument is **instrument coherence**: the overlay's per-segment ink regime must flip exactly where the dot's border regime flips, or a band of the field near the threshold shows a white-bordered dot over ink-regime hatch — two instruments disagreeing about the same luma. Implementation note for R.W3: *share the function, don't copy the constant* — MICRO 1 (:110) already mandates sharing `spectrumDotStyle`'s logic to the slider thumbs; the overlay joins the same shared helper.
2. **F8.1 line cites corrected:** `RGB_XYZ_MATRIX` → `src/units/color/conversions/xyz-extended.ts:46`; `DISPLAY_P3_XYZ_MATRIX` → `:88` (`XYZ_DISPLAY_P3_MATRIX:93`, `XYZ_D50_PROPHOTO_MATRIX:109` unchanged). The substance stands: all module-private, which is why the engine-owned `sampleGamutBoundary(hueDeg, target, {columns, mode})` (+ zero-alloc `Into` variant) is the right surface — specced by the **boundary-api lane** (PASS1-VERDICT §7 seed 5, recommended landing R.W1 with the 2.0.0 cut); this packet's P7/P9 write the treatment to *consume* it, deciding nothing that lane owns.

---

## §5 — THE MERGEABLE PACKET (canonical old → new, one replacement per passage)

Apply in order; line numbers refer to the current `docs/frontend-design/color-picker.md`.

---

### P1 — `:13` (§ Aesthetic direction, the one-unforgettable paragraph)

**REPLACE** the paragraph beginning `**The ONE unforgettable thing:**` **WITH:**

> **The ONE unforgettable thing:** the picker field is the **familiar HSL spectrum square — KEPT, because it is the gesture everyone's hand already knows — with a perceptual truth-overlay drawn on top of it.** Every pixel of that square is an sRGB color by construction; what the square cannot say on its own is where the *wider* world begins. So as you drag, value.js reads the square's coordinates through a wide-gamut lens — **display-p3 by default, the gamut nearly every modern display physically shows** — and strokes a hairline contour where the color those coordinates name in the wide space **visibly exceeds what sRGB can honestly show** (the ΔE > JND locus, the engine's own just-noticeable-difference threshold). Beyond the line, a quiet hatch marks the visibly-clipped margin, and the whole figure contracts and swells as you turn the hue. You are still picking a color the way you always have — but now you can also *read where your display's color outruns the web's*, drawn as a mathematical graticule on the plate, captioned with its lens like any honest instrument. No mainstream picker shows you the gamut frontier breathing; this page alone owns it, **without throwing away the square the world is fluent in** — because value.js alone can compute the contour cheaply per-frame.

---

### P2 — `:27` (A1 row, both cells' contour clauses)

**In the "What reads weak" cell, REPLACE** `It shows no gamut boundary (the corner is just clipped sRGB)` **WITH:**

> It shows no gamut frontier (every pixel of the square is in-gamut sRGB by construction — the plate is mute about everything beyond itself)

**In the "SOTA bar" cell, REPLACE** `trace the **sRGB gamut edge as a visible contour** via value.js, hatch the unreachable margin` **WITH:**

> trace the **wide-gamut truth line — where display-p3 visibly exceeds sRGB (the ΔE>JND contour) — as a visible hairline** via value.js, hatch the visibly-clipped margin beyond it

---

### P3 — `:69-76` (§ COLOR clause 1, the token block)

**REPLACE** clause 1 in full **WITH:**

> 1. **Out-of-gamut as a designed state** — define four project tokens in `style.css :root` (the sanctioned home, DESIGN.md:11): an ink pair and a paper pair, because the contour must stay legible over *every* (s,v) region of the field — single-ink hatch disappears on dark/saturated substrate (proven in prototype):
>    ```css
>    --gamut-edge:        color-mix(in oklab, var(--foreground) 28%, transparent);
>    --gamut-hatch:       repeating-linear-gradient(45deg,
>                           transparent 0 5px,
>                           color-mix(in oklab, var(--foreground) 9%, transparent) 5px 6px);
>    --gamut-edge-paper:  color-mix(in oklab, var(--background) 50%, transparent);
>    --gamut-hatch-paper: repeating-linear-gradient(45deg,
>                           transparent 0 5px,
>                           color-mix(in oklab, var(--background) 12%, transparent) 5px 6px);
>    ```
>    The overlay's canvas resolves all four via a computed-style probe and applies them **per contour segment by the field's own luma** — the exact `spectrumDotStyle` logic (`SpectrumCanvas.vue:231-233`: luma = v·(1−s/2), flip at 0.5 — one shared helper, one threshold, so the contour's ink regime and the dot's border regime never disagree about the same region): ink pair over light field, paper pair over dark; the hatch is drawn twice, registered. This is the visual vocabulary of the signature moment.

---

> **Footnote (pass-3, non-blocking nit, CRIT-overlay-amendment.md gap 2):** this packet's passage numbering runs P1–P4, P6–P10 — **P5 is intentionally absent**, not a dropped passage. F5 (the luma-threshold decision, §4 point 1) and F8.1 (the matrix-cite correction, §4 point 2) are citation-sweep beats folded into §4 prose and P3/P7's cites rather than standalone mergeable passages; no treatment occurrence goes unaccounted (§0, §7 ledger). Left un-renumbered per the critic's "renumber or footnote" either/or, to avoid touching the P6–P10 cross-references this packet, §6, and §7 already carry.

### P4 — `:105` (§ SPATIAL clause 1, final two sentences)

**REPLACE** `the out-of-gamut contour + hatch overlay it so the in-gamut region reads as an organic specimen shape and the corners read as unreachable margin.` **WITH:**

> the truth-line contour + hatch overlay it so the sRGB-faithful region reads as an organic specimen shape and the margin beyond the line reads as the wider target's visibly-clipped territory — flooding in from the top edge at red and magenta hues, vanishing entirely at blue.

---

### P6 — `:113` (§ MICRO-INTERACTIONS clause 4)

**REPLACE** clause 4 in full **WITH:**

> 4. **Threshold detent at the truth line** — when a drag carries the `WatercolorDot` outward across the JND contour, the dot — and the model value with it, so the resistance is real — holds at the contour for ~6px of pointer travel, then releases and catches up; a Fira Code micro-label naming the **instrument's lens** — `p3 ⊣` (or `rec2020 ⊣` / `a98 ⊣` when retargeted) — surfaces at the cursor for the detent's duration. A detent, **not a wall**: every point of the square is a legitimate sRGB color, so the drag always completes — what you feel is the threshold where the wide target's color visibly exceeds what sRGB shows. One detent per crossing; inbound crossings free; no contour (blue hues at display-p3) ⇒ no detent — the absence of resistance is the same fact as the absence of the line. The label's appear/fade honors `prefers-reduced-motion`; the detent itself is drag physics tied to user input. The boundary becomes *felt*, not just seen.

---

### P7 — `:122-131` (§ The one unforgettable moment, replaced in full)

**REPLACE** the section body (headline + both paragraphs + implementation core) **WITH:**

> **The breathing gamut — a quiet truth line drawn over the square you already know.**
>
> Drag across the hero field — the *same familiar HSL square*, unchanged in feel — and watch the **display-p3 truth line contract and swell as the hue turns.** At red, the hatched margin floods in from the top edge — three-quarters of the square's most saturated colors name a P3 color that sRGB visibly cannot show (measured: 74.7% of the top edge). At magenta the flood peaks (82.7%). Sweep toward yellow and the margin retreats to a corner balloon (21.9%). Turn to blue and **the plate goes clear — no contour at all — because sRGB holds every blue this square can name**; the caption states the fact in-instrument (`p3 Δ < JND — plate clear`), so the emptiest state still reads as a measurement, not a malfunction. One full hue turn swings the visible-clip margin from nothing to four-fifths of the top edge: the breathing is the drama. The `WatercolorDot`, dragged outward across the line where it exists, **detents for a few pixels and surfaces a `p3 ⊣` tick** before continuing — a threshold you feel, never a wall.
>
> **The instrument's lens.** The overlay reads the square through a wide-gamut target — **default: display-p3**, the comparison nearly every modern display makes physically real — and *names it on the plate*: a Fira Code small-caps eyebrow in the plate caption, `GAMUT LENS — DISPLAY-P3 / SRGB`, sharing the catalog register of the space title. When the picked color space is itself a wide RGB space (display-p3, a98-rgb, rec2020), the lens follows it and the caption re-names — so the space switch redraws the contour, a real geometry change riding the A2 morph. For sRGB-family, hex, and unbounded spaces (oklch, lab), the lens stays at its default: the signature is **always on**, never an easter egg behind a dropdown — an instrument with a stated default lens, like a plate that names its illuminant. *(Default-lens policy tabled for R.W3 ratification: B-with-override, recommended, vs. strict display-p3.)* The caption also carries the breathing numbers — the hue's sRGB cusp readout (`cusp L 0.968 C 0.211`) — while the on-plate datum is the contour's **innermost point**, a 9px ink crosshair (the cusp itself always projects to the square's top-right corner, so it lives in the readout, not on the plate).
>
> The proportion is the whole point: a 28%-alpha hairline and a 9% hatch — a whisper drawn over the universal picking gesture, not a re-theme of it. Your hand still does what it always did; the page just quietly shows you the truth underneath. No other color picker on the web does this. Adobe's clamps silently; coolors doesn't model it at all. Here the *frontier of color itself* is surfaced as a living contour — and value.js is the only library in the demo that can compute the boundary cheaply enough to animate it live (proven: ≈0.3 ms/frame total unthrottled, ~7× inside the <2 ms budget; zero dropped frames at 120 Hz, held under 4× CPU throttle). It is the page's thesis (perceptual truth) folded into the existing gesture: **you can feel where your display's color outruns the web's, on the square you've used your whole life.**
>
> Implementation core: **keep** the HSL `spectrumStyle` (`SpectrumCanvas.vue:208-224`) as the base layer; **add** a stacked **2D-canvas** overlay (`position:absolute; inset:0; pointer-events:none; border-radius:inherit`, device-pixel backing dpr-capped at 2 — the render path settled by prototype: canvas is the only path supporting luma-adaptive dual-ink; clip-path survives as the no-canvas fallback; WebGL rejected as a wrong-truth approximation). Per the current hue and lens, the overlay (a) samples the truth field **g(s,v) = ΔE_OK(wide(s,v,h), gamutMapOKLab(·)) − JND** via the engine-owned `sampleGamutBoundary(hueDeg, target, {columns, mode})` (`src/units/color/`, beside `gamut.ts` — specced by the boundary-api lane, landing with the R.W1 cut; the demo consumes engine geometry, never re-derives matrices), (b) strokes the JND contour as a device-pixel hairline in `--gamut-edge`/`--gamut-edge-paper` per segment luma (threshold 0.5, shared with `spectrumDotStyle`), (c) fills the visibly-clipped margin with the registered dual `--gamut-hatch`/`--gamut-hatch-paper` tiles — hatch phase drifting with hue (the breathing; frozen under `prefers-reduced-motion: reduce`, while the contour position still tracks hue, since it is user-driven state, not decoration), and (d) renders clear + caption when the field is everywhere faithful. The HSL square renders underneath unchanged (drag math, WatercolorDot, hand-memory all preserved). Recompute on hue/lens change inside the existing rAF gate (`SpectrumCanvas.vue:94-105`) — 96-column bisection, 0.2–0.5 ms worst case.

---

### P8 — `:140`/`:141` (§ Design verdict reconciliation, TEMPERED bullet + FOLDED bullet) + one appended bullet

**[pass-3] In the TEMPERED bullet (`:140`), REPLACE** the parenthetical `MATHEMATICS (the sRGB gamut boundary + perceptual isostep graticule made beautifully visible)` **WITH:**

> MATHEMATICS (the wide-gamut truth line — display-p3 vs sRGB, ΔE>JND — + perceptual isostep graticule made beautifully visible)

This is the residual old-semantics phrase CRIT-overlay-amendment.md gap 1 caught: "the sRGB gamut boundary" is the exact F1-vacuous framing this packet's own P1/P6/P7 replace everywhere else (the HSV square is a bijection of the sRGB cube — there is no sRGB boundary on it to draw); left unswept, it falsified this packet's §0 "no orphaned occurrence" claim. The replacement names the corrected instrument (the wide-target ΔE>JND contour) in the same register as the pillar clause's other three parentheticals.

**In the "FOLDED as easter-eggs" bullet (`:141`), REPLACE** `The `sRGB ⊣` snap-resist tick, the cursor halo, and the perceptual-isostep graticule are tasteful, proportionate signature refinements` **WITH:**

> The target-named `p3 ⊣` detent tick, the cursor halo, and the perceptual-isostep graticule are tasteful, proportionate signature refinements

**APPEND a new bullet to the section:**

> - **AMENDED (Tranche R, pass 2) — the overlay's geometry corrected by prototype evidence, the register unchanged.** The literal "sRGB boundary over the square" was vacuous — the HSV square is a bijection of the sRGB cube, so the honest instrument strokes where a **wide target** (display-p3 default, captioned as the lens) exceeds sRGB by more than the engine's JND (`gamut.ts:55`), not raw membership. The narrative hues were backwards and now match measurement (red/magenta flood, blue clears — the clear plate is captioned content). The snap-resist beat survives as a **threshold detent** with a target-named label. Render path fixed: 2D canvas (dual-ink luma-adaptive, threshold 0.5 shared with `spectrumDotStyle`); geometry consumed from the engine-owned `sampleGamutBoundary`. Proportion holds: the always-on contour is a 28%-alpha hairline — the instrument's reticle, not a re-theme. (Verdict clauses 1–4 all still honored; `proto-gamut-overlay.md` F1–F6 + `CRIT-proto-gamut-overlay.md` mustFix 1–4.)

---

### P9 — `:149-150` (§ Implementation plan, items 1–2)

**REPLACE** items 1 and 2 **WITH:**

> 1. **`SpectrumCanvas.vue` — the headline.** **KEEP** the HSL `spectrumStyle` (`:208-224`) as the base square; **ADD** the stacked 2D-canvas overlay that strokes the wide-target JND contour + dual-ink hatched margin over it (clip-path as the no-canvas fallback). Add the four `--gamut-edge`/`--gamut-hatch` ink+paper tokens to `style.css :root`. Consume geometry from the engine-owned `sampleGamutBoundary(hueDeg, target, {columns, mode})` (boundary-api lane, R.W1) — the demo owns paint, never math. Default lens display-p3, captioned on the plate; retarget on wide-RGB space selection (pending the R.W3 lens ratification). This single file delivers ~70% of the redesign's impact and is the thesis made real — *as an overlay on the kept gesture, never a replacement of it.* *(Largest effort; do first.)*
> 2. **`SpectrumCanvas.vue` — the felt boundary.** Add the cursor halo on `isDragging` + the **threshold detent at the JND contour** with the target-named `p3 ⊣` micro-label (detent = dot+model hold ~6px then release; outbound crossings only; no contour ⇒ no detent). Crossing detection reuses the render pass's boundary samples — zero new geometry. Completes the signature moment.

---

### P10 — `:157` (§ Guardrails, token clause)

**REPLACE** `new tokens (`--gamut-edge`, `--gamut-hatch`) land in `style.css :root`` **WITH:**

> new tokens (`--gamut-edge`, `--gamut-hatch`, `--gamut-edge-paper`, `--gamut-hatch-paper`) land in `style.css :root`

---

## §6 — What this packet does NOT decide (owner map)

- **`sampleGamutBoundary` exact signature/return shape/`Into` variant** — boundary-api lane (PASS1-VERDICT §7 seed 5); this packet only writes the treatment to consume it and records the recommended R.W1 landing.
- **The lens ratification** — R.W3 ratifies B-with-override vs. strict B (§2); the treatment text (P7) carries the tabled flag verbatim so the open question is visible in the merged doc.
- **oklch/lab chroma-extension lenses** — deferred with trigger, per proto F1 v1 scoping (wide-RGB only); unchanged here.
- **Empty-state caption copy** (`p3 Δ < JND — plate clear`) — placeholder register, final copy at R.W3 implementation alongside the caption eyebrow.

## §7 — Zero-drop ledger (this packet)

| Old treatment element | Disposition |
|---|---|
| `sRGB ⊣` snap-resist (:113/:126/:141/:150) | RE-SPECCED (P6/P7/P8/P9) — detent at JND contour, target-named label |
| "the sRGB gamut boundary" — MATHEMATICS pillar clause (:140) | **[pass-3]** REPLACED with the wide-target JND-contour framing (P8) — the row this ledger omitted at pass 2 (CRIT-overlay-amendment.md gap 1); restores the §0 "no orphaned occurrence" claim to truth |
| "yellow balloons, blue floods" (:126) | REPLACED with measured hues (P7) |
| "region the engine can't honestly reach" framing (:13) | REPLACED with wide-lens framing (P1) |
| "small canvas/WebGL layer (or … color-mix mask)" (:130) | RESOLVED to 2D canvas + clip-path fallback; WebGL recorded rejected (P7) |
| "easter-egg overlay" headline framing (:124) | GRADUATED to always-on reticle with proportion audit (§2, P7, P8) — detent/graticule stay easter-egg-registered |
| Cursor halo, graticule, plate-land, readout rhythm, catalog caption | UNTOUCHED — no dependency on the corrected semantics |

**Optional pass-3 nit (CRIT-overlay-amendment.md gap 3, non-blocking — R.W3 merge-pass candidate, not swept here):** the treatment's own pre-existing `spectrumDotStyle` line-cites are inconsistent against the live `SpectrumCanvas.vue` (verified this pass: the computed property spans `:226-243`, `luma` at `:231`, the `borderAlpha`/`borderColor` flip at `:232-233`). `color-picker.md:29` already cites it correctly as `spectrumDotStyle:226-243`; `color-picker.md:110` still reads `spectrumDotStyle:230-235` (stale). Out of this packet's F5/F8.1 charter — flagged for the R.W3 merge pass, not fixed here.
