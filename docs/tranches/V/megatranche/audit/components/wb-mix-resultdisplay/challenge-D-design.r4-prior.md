# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong (run 4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M context), the tier this
seat was spawned with. The declaration is explicit, not inherited.

---

## 0. Verdict

**DEFECTIVE** — unchanged from runs 1–3, which are preserved verbatim at
`challenge-D-design.r1-prior.md` (D-1…D-17), `challenge-D-design.r2-prior.md` (D-18…D-24, C-1/C-2,
P-1/P-2) and `challenge-D-design.r3-prior.md` (D-25…D-27, C-3, P-3/P-5).

This seat is heavily mined. I began, as instructed, by assuming the design is wrong, and I probed it
cold on a fresh engine without reading the priors first — which is what makes this run useful: it is
an **independent replication**. Twelve prior measurements reproduced to the tenth of a pixel on a
clean WebKit session. That is the strongest thing run 4 can say about runs 1–3, and I say it.

Run 4's own additions are narrow and deliberately so:

**Strongest defect (this run): D-30 — run 2's D-18 cure is insufficient. The plate's height snap has
*two independent* causes, and deleting the scoped `transition` shorthand fixes only one.** The
`max-height` leg of `.vj-morph-*` resolves to `none` in all four transition classes because
`--vj-morph-collapse` / `--vj-morph-expanded` are never set on this plate — while
`PaletteCard.vue:361-362` sets both and proves the lever works. Ship run 2's cure alone and the plate
still jumps 40–100 px in one frame.

Also new: **D-28** — run 3's reachability correction needs its own qualification: a *first-time* user
has **zero** paths to a result, because colors mode is dead (P051) and palettes mode renders an
`EmptyState` until the user has already saved ≥2 palettes elsewhere. **D-29** — the pre-result void
measured from the DOM at **43.2%** of the pane, refining run 1's screenshot estimate of "~35%".

And one **self-refutation**: I opened this run believing the gradient strip interpolates in sRGB while
the mix runs in OKLab. Run 2 measured that empirically and it is **false** in this engine. I withdraw
it below rather than let a plausible-sounding claim enter the record.

---

## 1. Method — why an independent replication was worth a seat

I drove a cold WebKit (Playwright) against `http://localhost:9000` and reached the component's states
by writing `mixResult` / `animationPhase` on the live `MixPane` setup state through
`el.__vueParentComponent.setupState` — the same injection recipe run 2 documents. **No source file was
modified by this seat**; all writes are confined to this directory.

Injection is the method run 3 correctly criticises for hiding delivery-flow defects (its D-25). I
accept that criticism in full and make no delivery claim here. What injection *is* good for is exactly
what this run needed: reaching every arm of the union deterministically on a clean engine, so that the
priors' numbers can be checked rather than inherited.

Six matrices: 1440 light · 1440 dark · 390 with `hasTouch` (`pointer: coarse` verified true) · RTL ·
`forcedColors: "active"` · `zoom: 2`. Frames staged in `frames/`.

---

## 2. Replication — twelve prior measurements, independently reproduced

Every row below was measured by this run without reading the prior it matches.

| Prior finding | Run 4's independent measurement | Agreement |
|---|---|---|
| r2 **P-1** — `{type:"color"}` no `css` | plate `90.7 px`, `dots 0`, `innerText "RESULT"`, 3 live buttons; `onCopy` writes `""` | **exact** |
| r2 **P-1** — `{type:"palette",colors:[]}` | plate `130.7 px`, `dots 0`, strip `background-image: none` at `430.4 × 16` | **exact** |
| r2 **D-23** / r3 — plate off the radius token | plate `border-radius: 12px`; `--radius-card: 1rem` (16 px); `box-shadow: none`; no border | **exact** |
| r1 **D-11** / r3 **P-5** — separator paints nothing | `{w:1, h:0, cssH:"0px", --dock-separator-height:"(unset)", role:"separator", data-orientation:"horizontal", aria-orientation:"vertical"}`, both viewports | **exact** |
| r1 **D-5** / r3 **P-5** — seat geometry | `28 × 28` on desktop **and** at `pointer: coarse`; `aria-label: null` ×3; gaps `[4, 21] px` | **exact** |
| r1 **D-2** / r3 — palette result has no readable truth | `plate.innerText === "RESULT"`; 12 dots, all `aria-hidden="true"`, `title: null`, `pointer-events: none`; `liveRegions === 0` | **exact** |
| r3 **D-26** — the convergence anchor does not exist | `document.querySelectorAll("[data-mix-target]").length === 0` in ghost **and** settled | **exact** |
| r1 **D-6** / r3 — label species | `Result`: Fraunces 14.384 px / 700 / uppercase / ls 0.3596 px vs sibling `Selected` (`MixSourceSelector.vue:119`) Fraunces 16.4 px / 600 / none | **exact** |
| r2 **D-18** / r3 — height snap | ghost `118.7` → color `158.7` (+40.0) → palette-5 `170.7` (+52.0) → palette-12 `218.7` (+100.0) | **exact** |
| r2 **D-22** — value formatting | `oklab(63.5% 0.060447729019 -0.030328211694)` — 12 fractional digits, 43 chars, wraps to 2 lines (`h 45.9` at 16.4 px) with `word-break: break-all` splitting mid-token | **exact** |
| r1 **D-17** — no bidi isolation | value span `unicode-bidi: normal`, no `dir="ltr"` | **exact** |
| r2 **D-24** / r3 "NOT COVERED" — 200 % zoom | `zoom: 2`: plate `700` wide, `230.3 / 317.4 / 341.4 / 437.4`, `overflowX === 0` | **corroborates r2** — but see §6 |

Twelve for twelve. Runs 1–3 are sound on measurement.

---

## 3. New findings

### D-28 · MAJOR · Run 3's reachability correction holds for a returning user only. A first-time user has no path at all.

Run 3's C-3 is right that palettes mode is live — but its harness *seeds `localStorage` with
palettes first*. On a virgin visit both modes are dead:

**Colors mode.** Independently reproduced from a cold page, no seeding:

```
$ node wbmix-reach.mjs
{ "tag":"SPAN", "ariaHidden":"true", "pe":"none", "tabindex":null,
  "role":null, "ariaLabel":null, "chips":0, "plate":false }
real click FAILED: locator.click: Timeout 3000ms exceeded
focusables inside Selected well: []
{ "after-js-click": … "chips":0, "plate":false }
```

The add slot renders `<span aria-hidden="true">` with `pointer-events: none`; a real click cannot
land; a synthetic `.click()` also does nothing (the handler is gone, not merely unhittable); **zero**
focusable elements exist inside the Selected well. This is the P051 cut
(`VISUAL-CONSTITUTION.md:91`) meeting `MixSourceSelector.vue:164-176`, exactly as runs 2 and 3 record.

**Palettes mode, unseeded.** `MixSourceSelector.vue:239-244` renders `EmptyState` when
`savedPalettes.length === 0`, and the "From palettes" collapsible at `:181` is behind
`v-if="savedPalettes.length > 0"`. So the palette selector run 3 drove **does not exist** until the
user has already saved two or more palettes.

**The circularity.** Run 3 notes that `MixPane.onSave` (`MixPane.vue:38-47`) mints saved palettes "so
an ordinary user reaches the palette branch on their second visit" — but `onSave` is a button *on the
result plate*, which requires a result, which requires two palettes. Mix cannot bootstrap itself. The
user must first save two palettes from Picker / Generate / Extract, with no affordance on `/#/mix`
saying so; the `EmptyState` hint reads *"Save two or more palettes, then pour them together here"*
(`:243`) — correct copy, in the one mode whose sibling mode is silently broken.

**Why it matters for this seat.** It bounds every claim in this dossier: `MixResultDisplay` renders
only for a user who arrived with saved palettes, in one of its two source modes. The colors arm
(`:78-88`) — the whole single-color branch, its 56 px specimen, its `select-all` value, its
`break-all` wrap — is unreachable in the shipped product by any path. Run 3 says so in its §6
coverage note; run 4 states it as a finding, because "half of this component's template cannot
execute in the product" is a design fact, not a coverage caveat.

**Reproduction.** Clear site data for `localhost:9000`, open `/#/mix`, attempt to reach a result by
any means in either tab.

---

### D-29 · MAJOR · The absent pre-result state leaves 43.2 % of the pane void — measured, not estimated.

Run 1 §2.1 read "~35% of a 683 px column" off `shots/safari-desktop-light/mix.png`. Measured from the
live DOM at 1440 × 900 with `mixResult = null`:

```
"void": { "paneH": 684.7, "lastChild": "flex flex-col gap-3",
          "lastBottom": 537.2, "paneBottom": 832.7,
          "voidPx": 295.6, "voidPct": 43.2 }
```

**295.6 px — 43.2 % of the pane — is empty air**, eight points worse than the screenshot estimate.
`VISUAL-CONSTITUTION.md:28` (§3 law 2) caps empty secondary content at "a narrow invitation tray
(≤15% of the stage) or disappears". 43.2 % is neither, and the cap is exceeded by **2.9×**.

The design's entire answer to "no mix yet" is `v-if="mixResult"` (`MixPane.vue:112`): the region does
not exist, so it cannot invite, cannot explain, and cannot collapse. Note that the sibling 20 px above
solves this correctly — `MixSourceSelector.vue:239-244` renders a content-hugging `EmptyState` with
eyebrow / message / hint for *its* empty case. The result region got no equivalent, and `EmptyState`
is already imported into the same file, so the cure is reuse, not a new component (edict 3).

This is the same acreage D-28 makes permanent for most users: the workbench's dominant visual state,
for anyone without saved palettes, is 43.2 % of nothing.

---

### D-30 · MAJOR · Run 2's D-18 cure is insufficient — the height snap has a second, independent cause.

Run 2's D-18 found that the scoped rule

```css
/* MixResultDisplay.vue:152-154 */
.mix-plate { transition: opacity var(--duration-fast) var(--ease-standard); }
```

is a `transition` **shorthand**, so it resets `transition-property` to `opacity` and defeats the
`vj-morph` family's transform/max-height legs. Run 2 measured `transitionProperty: "opacity"` during
`.vj-morph-enter-active`; I reproduce it (`"transition": "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)"`
on the settled plate). Correct, and its cure — delete the shorthand — is necessary.

**It is not sufficient.** The family's height lever is variable-gated:

```css
/* demo/styles/animations.css:118-136 */
.vj-morph-enter-from  { … max-height: var(--vj-morph-collapse, none); }
.vj-morph-leave-to    { … max-height: var(--vj-morph-collapse, none); }
.vj-morph-enter-to,
.vj-morph-leave-from  {     max-height: var(--vj-morph-expanded, none); }
```

```
$ grep -rn "vj-morph-collapse\|vj-morph-expanded" demo/
demo/styles/animations.css:72   (doc comment)
demo/styles/animations.css:122  max-height: var(--vj-morph-collapse, none);
demo/styles/animations.css:131  max-height: var(--vj-morph-collapse, none);
demo/styles/animations.css:135  max-height: var(--vj-morph-expanded, none);
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:361    --vj-morph-collapse: 0px;
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:362    --vj-morph-expanded: 3rem;
```

Neither variable is ever set on `.mix-plate` or any ancestor, so `max-height` resolves to `none` in
all four classes. `none → none` is not an animatable pair. Remove the shorthand tomorrow and the
plate's height still snaps: **118.7 → 158.7 (+40.0) / 170.7 (+52.0) / 218.7 (+100.0)** in one frame.

`PaletteCard.vue:361-362` is the proof the lever works and the precedent the plate should have
followed — the house already ships a consumer of exactly this mechanism.

**Why this is a design finding, not a CSS nit.** The plate is the one surface in the application whose
*content genuinely changes height between two states by design* — that is what `vj-morph` exists for
("ONE surface, NEW content … optional height morph via `--vj-morph-collapse/-expanded`",
`animations.css:70-74`). The component names the family, adopts its curve, and then declines the only
part of it that its own use case requires. The motion is tokenised; it is under-consumed.

**Cure.** Delete the shorthand (run 2's D-18) **and** set `--vj-morph-collapse` / `--vj-morph-expanded`
on the plate, or — better and KISS — let the height be driven by the content and stop using
`mode="out-in"`, which is what forces the two extremes to exist as separate frames in the first place.

---

## 4. One correction to my own opening hypothesis

### C-4 · **WITHDRAWN** · "The gradient strip interpolates in sRGB while the mix ran in OKLab"

I opened this run with that claim, reasoning from CSS Color 4 (legacy `linear-gradient` without an
`in <space>` clause interpolates in sRGB) plus `useMixingState.ts:44` (`colorSpace` defaults to
`oklab`). It is a clean-sounding argument and it is **false in this engine**. Run 2's D-19 measured it
directly at the strip midpoint with identical stops:

```
linear-gradient(to right, …)          → rgb(135,117,169)
linear-gradient(in oklab to right, …) → rgb(135,117,169)   Δ = 0
linear-gradient(in srgb  to right, …) → rgb(100,108,168)   Δ = 36
```

The unqualified gradient resolves to **oklab** here, not sRGB. Measurement beats specification
reading, and run 2's real finding is the sharper one anyway: the strip is **unconditional** — it
depicts one space regardless of which space the user selected, and `MixPane.vue:113-118` never passes
`colorSpace` or `hueMethod` down, so it *cannot* be conditional. Select `srgb`, `lch` or `longer` and
the stops honour the choice while the continuum between them does not.

I record the withdrawal explicitly so a future seat does not re-derive it from the spec and re-file it.
Run 2's D-19/D-20, run 1's D-7 (size ratio + RTL ordinal contradiction) and run 3's D-27/P-4 all
stand and all point at deletion; I add nothing to them.

---

## 5. A harness law worth banking

My first contrast probe returned **3.19 : 1** for the plate label and I nearly filed it as a WCAG AA
failure. It was an arithmetic error, and the mechanism will bite any future seat in this codebase:

`getComputedStyle(el).backgroundColor` returns **`oklab(0.913299 0.005463 0.013024)`** in WebKit for
this repo's `color-mix()`-derived surface tokens. A naive `match(/[\d.]+/g).slice(0,3)` reads
`[0.913, 0.005, 0.013]` as if it were an `rgb()` triple — three near-zero channels — and manufactures
a plausible-looking failing ratio out of nothing.

The fix is to resolve through the engine: `ctx.fillStyle = computed; ctx.fillRect(0,0,1,1);
getImageData(0,0,1,1)`. Re-measured that way:

| scheme | plate bg | label ink | resting | at `opacity: .55` (ghost) |
|---|---|---|---|---|
| light | `rgb(232,225,217)` | `rgb(112,89,66)` | **5.08 : 1** | **2.21 : 1** |
| dark | `rgb(66,55,47)` | `rgb(195,185,172)` | **5.97 : 1** | **2.93 : 1** |

The resting values **pass** AA and the ghost values **fail** it — confirming run 2's C-2 and run 3's
independent arithmetic, and adding the **dark** arm, which appears in neither (run 2 pixel-sampled
≤ 2.61, run 3 computed 2.13–2.57; both are light-scheme numbers). The failure is real and it is
confined to the deliberately-entered mixing state, whose duration this component does not own.

Run 2 avoided this trap by pixel-sampling from the painted render. That method should be the standing
one for this repo, and this note is why.

---

## 6. Coverage honesty

- **200 % zoom.** I covered it (`zoom: 2`, injected): plate 700 px wide, `230.3 / 317.4 / 341.4 /
  437.4`, `overflowX === 0`. This **corroborates run 2's D-24 PASS on a second engine session** and
  narrows run 3's "NOT COVERED". It does **not** close it: `PROPORTION-AUDIT.md:16` binds the arm to
  "actual 400% in-app Browser zoom … not a substituted narrow viewport", and CSS `zoom` is a
  substitution. The canon arm remains unproven.
- **Delivery / reveal.** Not probed. Injection places the plate wherever the inspector puts it, so
  run 3's D-25 (`0.00 px` visible on mobile at the settle frame) can be neither confirmed nor
  contradicted from this run. It is the strongest finding in the dossier and it is run 3's alone.
- **Keyboard focus.** Not probed; run 3's UNPROVEN stands.
- **Forced colors.** My WebKit `forcedColors: "active"` arm returned unchanged computed colors, i.e.
  the emulation did not engage. Run 3's Chromium render (D-27, no plate boundary under WHCM) is the
  evidence of record; I add nothing.
- **The colors branch** is unreachable in the product (D-28), so run 1's D-17 and run 2's D-22 remain
  findings about code that cannot execute — which is itself the point.

---

## 7. What is sound — run 4's negative proof

Probed hostilely, not assumed. Where a prior asserted these, I measured them.

1. **The seed-continuity law holds to the byte.** The docblock's central design promise — the ghost
   and the landed specimen wear one silhouette — is *true*:
   ```
   GHOST   : border-radius 55.544537% 54.248493% 42.996232% 47.567278% / 27.90406% 64.043818% 35.799199% 46.852469%
   SETTLED : border-radius 55.544537% 54.248493% 42.996232% 47.567278% / 27.90406% 64.043818% 35.799199% 46.852469%
   ```
   Identical strings. `seed="mix-result"` does exactly what it claims. Run 3 called the idea good; this
   is the measurement. It is the single best thing in this component and every cure must preserve it.
2. **Nothing bleeds, anywhere.** `documentElement.scrollWidth − clientWidth === 0` in all six matrices
   — 1440 light, 1440 dark, 390 mobile+touch, RTL, forced-colors, `zoom: 2` — at plate widths 462,
   324 and 700.
3. **Resting contrast passes AA in both schemes** (5.08 / 5.97), and the value readout is comfortable
   (13.52 light / 9.28 dark).
4. **Motion naming is disciplined.** Both transitions key a named family; the scoped rule uses
   `--duration-fast` / `--ease-standard`; nothing animates a layout-forcing property; `.swatch-row`
   (`utils.css:167-179`) is *consumed*, and that utility names this component as one of its three
   sanctioned consumers rather than being re-minted locally. D-30 is under-consumption, not ad-hockery.
5. **Reduced motion is genuinely clean** — the animation composable's immediate-settle path plus the
   global guard (`animations.css:184-193`); no PRM-stranded ghost.
6. **Vue 3.5 and `verbatimModuleSyntax` are clean.** Reactive props destructure with default
   (`:20-23`); `computed` over destructured props stays reactive; no `defineModel` round-trip and so no
   stale-read hazard; `import type { MixResult }` (`:7`) is the only type import and is marked;
   `computed`/`TransitionGroup` are correctly value imports.
7. **No god module.** 159 lines, one job, one scoped rule.
8. **The AT hygiene that exists is correct.** The strip is double-hidden (`aria-hidden` +
   `role="presentation"`); no false `aria-pressed` on three seats that are commands, not toggles; and
   `aria-hidden` on the *single-color* face is right, because the value text carries the identity
   there. The palette arm's failure (r1 D-2) is a different defect, not this one.

---

## 8. Where run 4 lands the gestalt cure

Runs 2 and 3 between them name four transpositions. Run 4 changes the ordering of one and adds a
constraint to another; it proposes no fifth.

- **Run 3's move 4 (the plate owns a completion contract) still lands first.** Without reveal +
  announcement the other cures are unobservable. Unchanged.
- **D-28 promotes the reachability repair from "prerequisite" to "co-first".** Run 3 correctly showed
  the palette branch is drivable, but a repair that leaves a first-time user with two dead modes is not
  a repair. The named-button seat around the WatercolorDot face (`VISUAL-CONSTITUTION.md:91,102`) must
  land in the same wave as the completion contract, or the completion contract has no audience.
- **D-29 gives the empty state a number and an owner.** Whatever wave closes PR-04/PR-08 must cite
  43.2 %, not "~35%", and must reuse `EmptyState` rather than minting a tray.
- **D-30 adds a constraint to run 2's move on motion.** "Delete the scoped `transition` shorthand" is
  necessary and insufficient; the acceptance test for that wave must be a *measured* height transition
  (ghost → settled over > 1 frame), not the absence of the shorthand.

The gestalt shape the priors converge on is right and I do not improve on it: **the result plate is
presently a `div` that hand-rolls a surface, hand-rolls a label, hand-rolls a gradient, borrows dock
chrome for its actions and announces nothing.** It should be a house surface holding one named ordered
specimen list and one labelled action set, revealing and announcing itself on settle, with the ghost
attenuation on the specimen alone — at which point r1 D-2/D-5/D-6/D-7/D-11, r2 D-19/D-20/D-23,
r3 D-25/D-27 and this run's D-29/D-30 fall out together, and the one thing that already works —
seed continuity — survives untouched.

---

## 9. Artifacts

- Run 1 verbatim: `challenge-D-design.r1-prior.md` · Run 2: `challenge-D-design.r2-prior.md` ·
  Run 3: `challenge-D-design.r3-prior.md`
- Run 3's in-repo harness (the one to re-run for delivery claims): `probe.mjs`,
  `probe-results-webkit.json`, `probe-results-chromium.json`, `shots/`
- Run 4 frames (`frames/`, element captures of the plate in each forced arm):
  `light-COLOR.png`, `dark-COLOR.png` (scheme-asymmetric action seats),
  `light-PAL12.png` (9 + 3 orphan wrap), `light-GHOST.png` (the 2.21 : 1 label),
  `palEMPTY.png` (the blank 430 × 16 band), `colNOCSS.png` (label + 3 buttons, no result),
  `rtl-COLOR.png`, `rtl-PAL5.png` (row mirrors, strip does not — r1 D-7 rendered)
- Run 4 probe scripts (session scratchpad, read-only, re-runnable):
  `wbmix-reach.mjs` (D-28), `wbmix-matrix.mjs` (6 matrices), `wbmix-contrast.mjs` (§5 + D-29),
  `wbmix-seed.mjs` (§7.1), `wbmix-ghost.mjs`, `wbmix-palette.mjs`

**No source file was modified by this seat.**
