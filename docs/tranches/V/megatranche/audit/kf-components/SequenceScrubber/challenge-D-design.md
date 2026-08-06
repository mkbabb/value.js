claude-opus-5[1m]

# CHALLENGE — `SequenceScrubber.vue` · axis **D (DESIGN)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScrubber.vue` (162 L)
**Method** static, source-derived only. No browser tooling (SS-13 law). Contrast ratios computed by hand from the resolved token chain; the arithmetic is shown so it can be re-run and falsified.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries its own falsifier; four claims survived their falsifiers as **superlatives** (L-18 runs both ways). Findings I *hunted and cleared* are recorded in §6 — a false defect is worse than a missed one.

**Read whole (read-only):**
`SequenceScrubber.vue` · `sequenceKeys.ts` · `@composables/useDragScrub.ts` · `@mkbabb/value.js/math` (`clamp`) · consumed idiom sheets `demo/styles/design-idioms.css`, `demo/styles/style.css` · parent + siblings for registration truth: `SequenceTarget.vue`, `SequenceTarget.css`, `SequencePlayhead.vue`, `SequenceAxis.vue`, `useSequenceDemo.ts` · design-system authorities `@mkbabb/glass-ui/dist/styles/typography/{semantic,utilities,scale}.css`, `styles/tokens/{color-radius,dark-arm,light-dark,scale-paper}.css`, `styles/utilities/a11y-overrides.css`, `components/{metric,card,timeline}/*`.

**Corpus folded (not re-invented):** `formation/keyframes/lane-frontend.md` **S-4** (`SequenceScrubber` → `ScrubberTimeline`/`Slider`, AMBER, 162 L) and **F-1** (glass-ui phantom dep). This challenge does not restate S-4's line-count argument; it **converts S-4 from an economy argument into a defect argument** by naming what the shipped primitive already solves and this file does not (D-5, D-6, D-11). No contradiction of the census was found.

**Tally** — 12 defects · **1 BLOCKER** · 4 MAJOR · 5 MINOR · 2 INFO · 4 superlatives.

---

## 1. BLOCKER

### D-1 · The master playhead does not register with the axis it commands — and the two **cross sides** mid-travel

**Severity BLOCKER** · `SequenceScrubber.vue:7,18–36` · `SequenceTarget.css:36–45,37–39` · `SequencePlayhead.vue:23–36,46` · `SequenceTarget.vue:55,74,89–92`

The file's own opening comment (`:2–6`) declares what this widget *is*:

> "the storyboard's **editable CONTENT** (the playhead the user scrubs), **not transport chrome** (the bottom TransportDock IS the transport)".

So it must share an axis with the storyboard. It does not. Both axes are computable exactly from source. Let `C` = the Card's content-box left edge, `W` its width.

**The storyboard's time axis** (the axis the ruler names, the handles ride, and the phosphor playhead sweeps):
- `.seq-storyboard` = `px-4` → +16 px (`SequenceTarget.vue:55`)
- `.seq-stage` border 1 px + `padding: 0.75rem 1rem 1rem` (`SequenceTarget.css:45`) → padding box = `[C+17, C+W−17]`
- `--track-inset = --label-col + --col-gap = 3.25rem + 0.75rem = 4rem = 64 px` (`SequenceTarget.css:37–39`)
- `.seq-playhead-track { left: calc(1rem + var(--track-inset)); right: 1rem }` (`SequencePlayhead.vue:28–29`) → **`[C+97, C+W−33]`**, width `W−130`
- `.seq-track` is grid-column 2 of the same subgrid → identical span. Cross-checked; the storyboard is internally consistent.

**The master scrubber's axis:**
- wrapper `px-4` on a direct, padding-free Card child (`.card` sets only `--card-pad-*`; the padding lives on `.card-header/-content/-footer`, which this tree does not use — `components/card/styles.css`) → **`[C+16, C+W−16]`**, width `W−32`
- the ball is **centre-anchored**: `left: 0; margin-left: calc(var(--ball-size,36px) / −2)` then `translateX(p · 100cqw)` (`SequenceScrubber.vue:34`, `:159`), and `100cqw` resolves against `.seq-scrub` (`:121`). Centre `x(p) = C+16 + p·(W−32)`.

Therefore, for the *same* `demo.progress` value:

```
Δ(p) = x_scrubball(p) − x_playhead(p)
     = (16 − 97) + p·[(W−32) − (W−130)]
     = −81 + 98p          ← independent of W
```

| p | Δ | reading |
|---|---|---|
| 0.00 | **−81 px** | the master ball sits 81 px LEFT of the playhead line |
| 0.25 | −56.5 px | |
| 0.50 | −32 px | |
| **0.827** | **0** | the only point where the master clock agrees with itself |
| 1.00 | **+17 px** | the master ball is now 17 px RIGHT of the line |

The error is not a constant offset (which a viewer could learn to discount) — it **changes sign at p≈0.83**. The thumb overtakes the playhead it is supposedly *driving*. On the shipped 3xl card (`max-w-3xl`, ≈700 px inner) that is 11.6 % of the rail at rest, and the widget's whole rhetorical claim — "the ONE master authority" (`:133–135`), "the DOMINANT ball that drives the whole storyboard (SEQ-12)" (`:152–154`) — is contradicted at the pixel level for 100 % of travel except one point.

This is the component's *primary* affordance failing its *stated* purpose, which is what makes it a blocker rather than a proportion complaint. The fix is one line of geometry (inset the scrub rail by `--track-inset` on the same subgrid, or span the scrubber into column 2), not a redesign.

**Falsifier.** Measure `getBoundingClientRect()` centres of `.scrub-ball` and `.seq-playhead` at `progress` 0 and 1. If the deltas are **equal** (a constant, learnable offset) or **zero**, this claim dies. It also dies if the Card or `.seq-storyboard` carries horizontal padding I missed such that both spans coincide — but note the delta is *W-independent*, so any symmetric outer padding cancels and cannot save it. It also dies if `--label-col` is zero at some breakpoint; it is not — the `max-width:1023px` query (`SequenceTarget.css:249–259`) touches only `padding-block`, `row-gap` and track `height`.

---

## 2. MAJOR

### D-2 · The "instrument-panel micro-cap" ships **italic Plus Jakarta Sans**, not Fira Code — a hand-rolled copy of an idiom the design system already owns

**Severity MAJOR** · `SequenceScrubber.vue:9–11, 124–129` · glass-ui `styles/typography/semantic.css` · `styles/typography/utilities.css` · `SequenceTarget.vue:39`

The comment asserts, twice, in prose the reader is meant to trust:

> `:9–10` "the instrument-panel micro-cap eyebrow (**Fira Code**, letter-spaced)"
> `:124–125` "the instrument-panel micro-cap label convention (**Fira Code**, uppercase, letter-spaced, dim)"

The class list is `seq-eyebrow text-caption font-medium text-muted-foreground` (`:11`). Resolving it:

```css
/* glass-ui typography/semantic.css */
@utility text-caption {
  font-family: var(--font-text);      /* Plus Jakarta Sans — NOT mono */
  font-size:   var(--type-caption);
  line-height: var(--type-leading-caption);
  font-style:  italic;                /* ← unopposed */
  font-weight: 400;
}
/* SequenceScrubber.vue :126–129 */
.seq-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; }
```

`.seq-eyebrow` sets no `font-family` and no `font-style`. The rendered eyebrow is therefore **UPPERCASE ITALIC Plus Jakarta Sans at 0.18 em tracking** — the textbook faux-small-caps failure: italic + wide tracking + all-caps is the one combination typography advice universally forbids, because the shear and the tracking fight each other and the caps have no lowercase to lean against.

Three separate defects compound here:

1. **False prose.** The tree says Jakarta italic; the comment says Fira Code, twice. A load-bearing rationale that is simply untrue about its own file.
2. **Bespoke-vs-glass.** The design system *ships this exact idiom*: `@utility text-admin-label { font-family: var(--font-mono); font-size: var(--type-admin-label); text-transform: uppercase; letter-spacing: var(--type-tracking-caps); font-weight: 500 }`. That is, verbatim, "Fira Code, uppercase, letter-spaced" — the thing the comment claims to be. **A sibling inside the same Card already uses it**: `SequenceTarget.vue:39` `class="status-badge text-admin-label …"`. One card, two micro-cap labels, one using the system idiom and one hand-rolling a broken imitation of it.
3. **Off-ladder token bypass.** `0.18em` is a raw literal. The ladder token is `--type-tracking-caps: 0.1em` (`styles/tokens/scheme-motion.css`). A repo-wide grep for hand-rolled micro-caps returns **exactly one hit — these two lines**:
   ```
   $ grep -rn "text-transform: uppercase" demo/ --include=*.css --include=*.vue
   demo/scenes/sequence/SequenceScrubber.vue:127
   ```
   Every other uppercase label in the demo goes through the system. This file is the sole outlier.

**Falsifier.** Any rule that reaches `.seq-eyebrow` or `.text-caption` with `font-family: var(--font-mono)` or `font-style: normal` kills claims 1 and the italic charge. I grepped `demo/styles/*.css` and `SequenceTarget.css` for `font-style` overrides on caption/eyebrow: none exist, and `.seq-eyebrow`'s own block declares neither property. `font-medium` can only contest `font-weight`, never `font-style` or `font-family`.

### D-3 · The master clock is rendered **three ways, in three units, at three rungs** — and the file's dominance claim is falsified by its own parent

**Severity MAJOR** · `SequenceScrubber.vue:12–16, 24, 131–136` · `SequenceTarget.vue:18–24` · glass-ui `components/metric/styles.css`

Inside one Card, the identical quantity `demo.progress` is published three times in three incompatible notations:

| # | site | expression | notation | type rung | computed size |
|---|---|---|---|---|---|
| 1 | `SequenceTarget.vue:18–24` | `(progress*100).toFixed(0)` + `unit="%"` | `47%` | `--type-display-3` | **41.9 – 67.8 px** |
| 2 | `SequenceScrubber.vue:16` | `progress.toFixed(3)` | `0.470` | `--type-caption` | **12 – 16 px** |
| 3 | `SequenceScrubber.vue:24` | `Math.round(progress*100)` | `47` (announced) | — | AT only |

Provenance for row 1's size: `<Metric size="xl">` and `.metric[data-size="xl"] .metric__value { font-size: var(--type-display-3) }` where `--type-display-3: clamp(2.618rem, 2rem + 3vw, 4.236rem)` (`styles/typography/scale.css`).

The scrubber's rationale states, twice, that its readout is the apex of the page's hierarchy:

> `:12–14` "the LIT phosphor timecode: **the master clock made the brightest number on the page**"
> `:131–132` "The master clock is **the brightest number on the page**"

Its own parent renders the same number **3.5× – 4.2× larger**, ~40 px above it, in the same accent family. The design intent is not merely unproven — it is defeated by a sibling in the same file tree. And the user is asked to reconcile `47%`, `0.470` and (via AT) `47` as one clock with no shared unit and no stated relationship.

**Falsifier.** If `Metric size="xl"` resolved *below* `--type-caption`, or rendered muted/`data-empty`, the dominance claim would stand. It does not: `--type-display-3` floors at 2.618 rem = 41.9 px against `--type-caption`'s 1 rem = 16 px ceiling — the ranges do not even overlap, so no viewport makes the timecode larger. The claim also dies if the header Metric is conditionally hidden; `SequenceTarget.vue:18` renders it unconditionally.

### D-4 · The thumb is clipped at **both** ends of travel — and the correct formula is already written in the sibling file

**Severity MAJOR** · `SequenceScrubber.vue:34, 155–161` · `design-idioms.css:177–187` · `SequenceTarget.css:187–199`

`.scrub-ball` inherits `--ball-size` default **36 px** (`design-idioms.css:180`; nothing in the sequence tree overrides it for the master ball — `.seq-ball`'s `--ball-size: 1.6rem` at `SequenceTarget.css:188` is scoped to the row travellers alone). It is centre-anchored (`margin-left: −18px`) and travels the **full** `100cqw` (`:34`). The rail's container is inset only `px-4` = **16 px** from the Card edge, and both `.seq-root` and the Card carry `overflow-hidden` (`SequenceTarget.vue:2, 8`).

- at `p = 0`: ball spans `[rail_left − 18, rail_left + 18]` → **2 px past the padding edge**, clipped
- at `p = 1`: ball spans `[rail_right − 18, rail_right + 18]` → **2 px past**, clipped
- the idiom's `box-shadow: 0 2px 10px …` (`design-idioms.css:185`) extends a further 10 px — the entire outboard half of the glow is amputated at rest and at completion, i.e. at the two states the widget spends most of its life in.

The scene **already knows the fix and wrote it down**, one file over:

```css
/* SequenceTarget.css:189–199 — the row traveller */
/* "usable = full rail (100cqw) minus the ball's width" */
transform: translateX(calc( … * (100cqw - var(--ball-size)) ));
```

The master scrubber uses bare `100cqw`. Two balls, two positioning models, one scene — and the dominant one uses the model its own sibling documents as wrong. (Note the interaction with D-1: the two anchoring models are *also* why the master ball and the row travellers report the same progress at different x.)

**Falsifier.** Compute `getComputedStyle(scrubBall).width`. If it resolves below 32 px (i.e. something overrides `--ball-size` for `.scrub-ball`), the 16 px inset absorbs the half-width and the clip disappears. I grepped the whole sequence tree plus `design-idioms.css` and `layout.css` for `--ball-size`: the only assignments are the idiom's `36px` fallbacks and `.seq-ball { --ball-size: 1.6rem }`. Custom properties do not inherit from a sibling. The claim also dies if the Card's `overflow-hidden` is overridden downstream — it is not.

### D-5 · No `touch-action` on the drag surface — the only drag surface in the demo without one, including the *lesser* slider in the same scene

**Severity MAJOR** · `SequenceScrubber.vue:18–30` · `SequenceTarget.css:117–134` · `useDragScrub.ts:112–147`

`.seq-scrub` declares `cursor`, `select-none` and `container-type` — and no `touch-action`. Every other pointer-drag surface in this demo declares one, with rationale:

```
demo/scenes/square/SquareScene.css:64        touch-action: none;
demo/scenes/cube/CubeScene.vue:12            touch-action: none
demo/scenes/cube/CubeTarget.vue:4            touch-action: none
demo/scenes/cube/orbital-drag/OrbitalDrag.vue:350   touch-action: none;
demo/scenes/amiga/AmigaScene.vue:254         touch-action: none;
demo/scenes/sequence/SequenceTarget.css:134  touch-action: none;   ← .seq-handle, SAME SCENE
```

The row start-handle — the *secondary* control, five of them, in the same card — gets the declaration with a written justification (`SequenceTarget.css:123–127`). The **master** scrubber does not. The global `touch-action: manipulation` on `html, body` (`style.css:219`) does not rescue it: `manipulation` suppresses double-tap zoom only and still permits `pan-x`/`pan-y`, and `touch-action` is not inherited — the effective behaviour is the intersection along the ancestor chain, which leaves panning live at the scrub element.

`useDragScrub` wires `pointercancel` to the *end* path (`:144–147`), so a browser gesture takeover does not corrupt state — it silently **aborts the scrub mid-drag**, which is worse UX than a hard failure because it is intermittent.

Either the five row handles carry a superfluous declaration or the master rail has a hole. Both cannot be true; the asymmetry is source-decidable and is the defect, independent of how often it fires.

**Falsifier (partly UNPROVEN-NEEDS-LIVE).** The *asymmetry* is proven from source. The *consequence* is not: if no ancestor of `.seq-scrub` is scrollable on a touch viewport, the browser has nothing to pan to and the omission is inert. `body { overflow: hidden; overscroll-behavior: none }` (`style.css:212–214`) argues for inertness on desktop-class engines; iOS Safari visual-viewport panning and the mobile peek-band sheet referenced at `SequenceTarget.css:245–248` argue against. A live touch trace on the sequence scene at 375×667 settles it. Kill the whole finding by showing `.seq-handle`'s own `touch-action: none` is likewise inert — but then that line should be deleted, and the scene is still internally inconsistent.

---

## 3. MINOR

### D-6 · The master `role="slider"` has no design-system focus affordance — the row slider in the same scene does

**Severity MINOR** · `SequenceScrubber.vue:18–30` · `design-idioms.css:73–79` · `SequenceTarget.css:160–167` · glass-ui `styles/utilities/a11y-overrides.css`

The demo declares one focus contract, in prose, as a singular:

> `design-idioms.css:73–75` "The demo-owned `:focus-visible` contract — **the SINGLE keyboard-focus affordance**: `.focus-ring` paints glass-ui's `--focus-ring-shadow` on `:focus-visible`".

`.seq-scrub` is `tabindex="0" role="slider"` (`:27, :22`) and carries neither `.focus-ring` nor a scoped `:focus-visible` rule. It falls back to the UA default ring. The row handle — again the *lesser* control — opts in explicitly and explains why:

```css
/* SequenceTarget.css:160–167 */
.seq-handle:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); border-radius: …; }
```

Consequence beyond aesthetics: glass-ui's forced-colors focus block **enumerates class names** — `.focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button:focus-visible, …` (`styles/utilities/a11y-overrides.css`). `.seq-scrub` matches none, so under `forced-colors: active` it is outside the design system's `outline: 2px solid Highlight` guarantee.

**Falsifier.** A global `*:focus-visible` outline rule would make the omission cosmetic. I grepped `styles/accessibility.css`, `glass/a11y-fallback.css` and `utilities/a11y-overrides.css`: the only focus rules are the enumerated forced-colors list. Tailwind Preflight does not reset `outline` (the sole outline rule is `:-moz-focusring { outline: auto }`, `preflight.css:174`), so the UA ring *does* paint — this is an inconsistency claim, not an invisible-focus claim, and I am not making the stronger one.

### D-7 · A dark-substrate phosphor glow shipped ungated into a **light-first** theme, over text at 4.63:1

**Severity MINOR** · `SequenceScrubber.vue:137–141` · `style.css:96, 163, 130` · glass-ui `tokens/color-radius.css`

```css
.seq-timecode { text-shadow: 0 0 8px color-mix(in srgb, var(--ball-tone, var(--color-progress)) 40%, transparent); }
```

No `@media (prefers-color-scheme)`, no `.dark` gate, no `prefers-contrast` gate. The demo's default is **light** (`style.css:96 color-scheme: light`; `.dark` is an opt-in class). A CRT-phosphor bloom is a dark-substrate idiom; on the near-white card it does not read as light emission — it puts an 8 px violet blur around 12–16 px glyphs, softening exactly the edges small tabular figures need.

Computed contrast for that text, resolving `--ball-tone → --color-progress → --accent-kf` (`SequenceTarget.css:8` → `style.css:163` → `style.css:130`) against `--card`:

| theme | fg | bg | Y_fg | Y_bg | ratio | AA (4.5:1) |
|---|---|---|---|---|---|---|
| light | `oklch(0.56 0.17 295)` | `hsl(30 85% 96%)` | 0.1602 | 0.9222 | **4.63:1** | pass, **+0.13 margin** |
| dark | `oklch(0.74 0.13 305)` | `hsl(26 22% 17%)` | 0.3845 | 0.0244 | **5.84:1** | pass |

(OKLab→linear-sRGB→WCAG-Y by hand; `--type-caption` maxes at 1 rem regular, so the 4.5:1 normal-text threshold applies, not 3:1.)

Light mode passes on **3 % of headroom**: the critical background is `Y_bg ≥ 0.8959`, and `--card` sits at 0.9222. Any darkening of the plate — and this Card *is* glass, with `style.css` carrying a whole block about reclaiming translucency against glass-ui's unconditional ink-darken — walks it under AA. The glow then compounds a margin that is already thin.

**Falsifier.** Light theme unreachable (a forced `.dark`) kills the theme half; I find `:root { color-scheme: light }` and a `.dark` opt-in, so light is the default. The contrast half dies if the effective plate is *lighter* than `--card` — it is: the page sits on `--neutral-0` `hsl(40 30% 98%)` (Y ≈ 0.955), so glass blending moves the ratio **up**, not down. That is why this is MINOR and not MAJOR: the number passes today. The glow-over-small-text critique stands independently and is the part I would not drop.

### D-8 · The scrubbing state is signalled **only** by box-shadow strength — nulled by forced-colors, and it steps rather than blooms

**Severity MINOR** · `SequenceScrubber.vue:143–150, 21, 62, 84–92`

`.is-scrubbing` produces exactly one local visual change: `--ball-glow: 35% → 60%`, consumed by the idiom's `box-shadow` (`design-idioms.css:185`). Two consequences:

1. **forced-colors.** `box-shadow` is forced to `none` under `forced-colors: active`. The scrubber declares no `@media (forced-colors: active)` fallback (nor does the idiom). In high-contrast mode the widget offers **no indication that a drag is live** — no border, no size change, no fill change. Geometry still communicates *position*, so this is MINOR, not a blocker.
2. **Prose vs. tree.** The comment says the ball "**blooms** as you conduct" and the bloom "lifts **a hair**" (`:143–147, 135–136`). There is no transition on the property (none in the scoped block, none on `.progress-ball`), so it is an instantaneous 35→60 step — a pop, not a bloom — and 35→60 is a **+71 %** lift, not "a hair".

**Falsifier.** Any `transition` reaching `.progress-ball`'s `box-shadow` makes the bloom real. `design-idioms.css:177–187` declares none; the scoped block declares none. Note glass-ui's PRM override *adds* `transition-duration: 0.1s` for `box-shadow` under reduced-motion (`a11y-overrides.css`) — which would give reduced-motion users a *smoother* transition than everyone else, a small honesty inversion, but it cannot manufacture a transition where no `transition-property` was authored.

### D-9 · Cursor semantics contradict the affordance — and, again, contradict the same scene's other slider

**Severity MINOR** · `SequenceScrubber.vue:20` · `SequenceTarget.css:133, 168–170`

`.seq-scrub` is `cursor-pointer` with no `:active` state. `pointer` announces *click*; this is a **drag** surface (`useDragScrub`, pointer capture, window `pointermove`). The row handle in the same scene gets it right:

```css
.seq-handle { cursor: grab; }
.seq-handle:active { cursor: grabbing; }
```

Cheap to fix, and the inconsistency teaches the user that the two rails behave differently when they do not.

**Falsifier.** A hover/active cursor rule reaching `.seq-scrub` or `.scrub-ball` from an ancestor. Grepped `SequenceTarget.css`, `design-idioms.css`, `layout.css`: none. Weakening argument acknowledged: click-to-seek is a legitimate secondary gesture on a rail, and `pointer` is not *wrong* for it — but the primary gesture is the drag, and `grab` is the standard.

### D-10 · Stale provenance in a comment that exists specifically to be trusted

**Severity MINOR** · `SequenceScrubber.vue:145–147`

> "CONSUME the promoted `.progress-ball` idiom's `--ball-glow` parameter (**design-idioms.css:584**)"

`design-idioms.css` is **300 lines**. The rule is at **:185**. This comment's entire job is to point a future reader at the authority so they do not re-author the box-shadow (the design instinct behind it is correct — see S+1). A citation off by 399 lines into a file that does not have 399 lines routes that reader nowhere, and quietly signals that line-cited rationale in this tree may not have been re-verified after edits.

**Falsifier.** `wc -l demo/styles/design-idioms.css` → 300; `grep -n ball-glow` → 185. Dies only if a *different* `design-idioms.css` (a glass-ui copy) has 584+ lines and the same rule; glass-ui ships no file by that name.

---

## 4. INFO

### D-11 · What you see (`0.470`) is not what you hear (`47`); no `aria-valuetext`

**Severity INFO** · `SequenceScrubber.vue:16, 24`

The visible timecode is a 0–1 decimal to three places; `aria-valuenow` is a rounded 0–100 integer. Not a WCAG failure (2.5.3 Label-in-Name governs the *name*, not the *value*, and min=0/max=100 lets AT announce a sensible number). But a screen-reader user and a sighted user cannot describe the same state to each other, and a single `:aria-valuetext="demo.progress.value.toFixed(3)"` would close it. The shipped primitive already normalises this: `ScrubberTimeline`'s doc header records "the `aria-valuenow` binding coerces `Number(modelValue ?? 0)` so a numeric attribute always renders (axe `aria-required-attr` regression)" — the class of problem someone already paid for centrally (folds into **S-4**).

**Falsifier.** An AT trace announcing "0.470" would kill it — impossible without `aria-valuetext`, which is absent.

### D-12 · Two competing tabular-figure mechanisms, low-level overriding high-level

**Severity INFO** · `SequenceScrubber.vue:16, 137–138`

The element carries `tabular-nums` (glass-ui: `font-variant-numeric: tabular-nums lining-nums`, `typography/utilities.css`) **and** `.seq-timecode { font-feature-settings: "tnum" 1 }`. `font-feature-settings` is the low-level escape hatch and wins for `tnum`, so the class is inert here — and the hand-written property silently drops `lnum` (lining figures), which the class was also supplying. Harmless in Fira Code (no oldstyle default), but it is a redundancy that will mislead the next editor.

**Falsifier.** Removing the `tabular-nums` class with no rendered change proves the redundancy; removing `font-feature-settings` with no change proves it the other way. Either way one of the two is dead code. Not a defect in output today — recorded as INFO only.

---

## 5. Superlatives (L-18, both ways)

### S+1 · Parameter consumption instead of idiom re-authoring — exemplary, and rare

`SequenceScrubber.vue:143–150` changes the scrub-state glow by setting **one custom property**, `--ball-glow: 60%`, and lets the promoted idiom own the shadow *shape*:

```css
/* design-idioms.css:185 — the idiom keeps authority over 0 2px 10px */
box-shadow: 0 2px 10px color-mix(in srgb, var(--ball-tone, …) var(--ball-glow, 35%), transparent);
```

The obvious, common, wrong move is to re-declare the whole `box-shadow` in the scene and fork the idiom's geometry forever. This file declined, and wrote down *why*. Verified: the idiom does expose `--ball-glow` with a `35%` fallback at exactly that line.
**Falsifier.** If `.progress-ball` hardcoded its shadow with no `--ball-glow` var, the scene's declaration would be inert decoration. It does not.

### S+2 · Zero hardcoded colour — and the inheritance claim survives audit

`:140` reads `var(--ball-tone, var(--color-progress))` and the comment asserts "`--ball-tone` resolves to `--color-progress` here — the one master authority". This is the kind of claim that is usually wrong. It is **right**: `.seq-target { --ball-tone: var(--color-progress) }` (`SequenceTarget.css:8`) is the Card itself, so the scrubber inherits the master tone; the per-row overrides are set on `.seq-row` (`SequenceTarget.vue:80`), which is a *sibling subtree*, so they cannot leak into the scrubber. The full chain `--ball-tone → --color-progress → --accent-kf` resolves cleanly (`style.css:163, 130`). The component contains **no literal colour of any kind**.
**Falsifier.** An ancestor between `.seq-target` and `.seq-scrub` setting `--ball-tone` would break it. The chain is `Card.seq-target → div.px-4.py-3 → .seq-scrub`; neither intermediate sets it.

### S+3 · Compositor-only travel, consistently applied across the whole sequence family

`:34` + `:117–122` + `:155–161`: position rides `translateX(<cqw>)` against a `container-type: inline-size` rail, never a per-frame `left` write. The identical discipline appears in `SequencePlayhead.vue:32–46` and `SequenceTarget.css:189–199` — three sub-units, one rule (T.G4), no exception. This is a genuine, deliberate perf posture, not an accident. (It is also what makes D-1 and D-4 pure *arithmetic* bugs rather than architectural ones — the mechanism is right; only the formula's inset and origin are wrong.)
**Falsifier.** A `left: …%` or `style.left` write anywhere on the master ball path. None exists.

### S+4 · The uppercase micro-cap is done in **CSS**, not shouted into the DOM

`:11` ships the DOM text as `master playhead`; `.seq-eyebrow` uppercases it presentationally (`:127`). Screen readers therefore receive natural casing instead of a per-letter spell-out of `MASTER PLAYHEAD`, and copy-paste yields readable text. This is the correct call and is missed constantly. It survives D-2 independently: D-2 indicts the *font and tracking* of that rule, not its `text-transform`, which is the right mechanism in the right place.
**Falsifier.** Source text already uppercase in the template — it is not.

---

## 6. Hunted and cleared (recorded so the absence is auditable)

- **prefers-reduced-motion — NOT a defect.** The scoped block declares zero `@keyframes`, zero `animation`, zero `transition`. There is nothing for PRM to gate. The scene's decorative power-on boot *is* correctly gated (`SequenceTarget.css:237–243`), and `.is-scrubbing` glow is gesture-synchronous (a direct response to the user's own pointer), which PRM does not target. **PRM honesty here is clean.**
- **RTL — NOT a component defect.** `.scrub-ball` uses physical `left`/`margin-left`; `project()` uses `clientX − rect.left`; ArrowRight increments (ARIA APG wants it to *decrement* under RTL). All three would break a mirrored layout. But `demo/app/index.html` ships `<html lang="en">` with **no `dir`**, and `grep -rln "rtl\|\[dir="` over `demo/` returns **nothing** — the demo has no RTL surface at all, and every sibling (`.seq-handle`, `.seq-axis-tick`, `.seq-playhead`) is equally physical. Charging this file would be a false positive: it is a system-level gap, not a component defect.
- **Empty / loading / error state — correctly absent.** `progress` is a non-nullable `ref(0)` clamped on every write (`useSequenceDemo.ts:171, 180, 281`), so there is no undefined/NaN path to render. A `NaN` would require `sequence.duration === 0`, unreachable given the fixed 5-row construction. No placeholder state is *needed*, and adding one would be contrivance.
- **Keyboard coverage — adequate.** Arrows (both axes) + Home + End with `preventDefault`, and `demo.scrub` clamps internally (`useSequenceDemo.ts:281`) so the un-clamped `progress + 0.05` at `:99` cannot escape [0,1]. PageUp/PageDown and a shift-fine-step are *optional* in the ARIA APG slider pattern; their absence is not a defect (though `ScrubberTimeline` ships shift-step for free — S-4).
- **Contrast of the eyebrow — passes.** `--muted-foreground` (`--neutral-5`) on `--card`: **5.01:1** light (`hsl(30 22% 40%)`, Y 0.1440 vs Y 0.9222), **5.49:1** dark (`hsl(34 14% 62%)`, Y 0.3588 vs Y 0.0244). Both clear AA for normal text. No finding.
- **Injection / props hygiene — clean.** `inject(SEQUENCE_DEMO_KEY)!` with zero props (`:47`); the file honours the J.WZ split contract in its header (`:4–6`) — it injects only `demo` and touches no Target-private state. Verified against `SequenceTarget.vue`: no state crosses the seam.

---

## 7. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| **S-4** (`SequenceScrubber` → `ScrubberTimeline`/`Slider`, AMBER, 162 L) | **Reinforced and escalated.** The census argued economy (162 bespoke lines against a shipped primitive). D-1, D-4, D-5, D-6, D-11 are the *cost* of that bespokeness, and `ScrubberTimeline`'s own doc header names four of them as already-solved: "keyboard a11y (role=slider + arrow-key step + **shift-step**)", "the **44px touch target** is an invisible `::before` halo, **decoupled from the visible bead**" (D-4's clipping and the tap-floor question both dissolve), "`aria-valuenow` … always renders" (D-11), and `translateX()` travel "NEVER `style.left`". S-4 should move **AMBER → RED** on defect grounds, not line-count grounds. |
| **F-1** (glass-ui phantom dependency) | **Unchanged and blocking.** Every remedy above resolves against `@mkbabb/glass-ui@7.0.0` tokens (`--type-tracking-caps`, `text-admin-label`, `--focus-ring-shadow`) or components (`ScrubberTimeline`). None is reproducible until F-1 lands. The census's sequencing ("F-1 first") holds. |
| `lane-frontend.md:249` (census row 162, `SequenceScrubber.vue`, "master scrubber, rail/ball idiom") | Confirmed; no contradiction found anywhere in the tree. |
| `lane-frontend.md:264` **S-1** / `:325` **S-3** | Not touched by this axis. Noted only that **S-3**'s complaint about bespoke percent-positioning arithmetic (`TimelineCaret.vue:4 left: ${position}%`) is the *same defect family* as D-1/D-4 — hand-rolled rail geometry that the shipped `timeline/geometry` module exists to own. A combined S-3 + S-4 geometry wave is better value than two mechanical swaps. |

---

## 8. Repair order (dependency-sorted, smallest edit first)

1. **D-1** — register the scrub rail on the storyboard axis (span it into subgrid column 2, or inset by `--track-inset`). One declaration; kills the blocker.
2. **D-4** — adopt the sibling's formula: `translateX(calc(p * (100cqw - var(--ball-size))))` with left-edge anchoring, matching `SequenceTarget.css:194–199`. Fixes the clip and removes one of the two anchoring models.
3. **D-2** — `class="text-admin-label text-muted-foreground"`, delete `.seq-eyebrow` entirely, delete both "Fira Code" comments. Net **−6 lines**, and the last hand-rolled uppercase rule in the demo disappears.
4. **D-5, D-6, D-9** — three declarations on `.seq-scrub`: `touch-action: none`, the `.focus-ring` class (or `:focus-visible { box-shadow: var(--focus-ring-shadow) }`, mirroring `SequenceTarget.css:163`), and `cursor: grab` / `:active { cursor: grabbing }`.
5. **D-3** — a ruling, not a patch: pick **one** canonical notation for the master clock and demote or delete the other two readouts. The scrubber's own comment says it should win; the tree says the header Metric wins. Resolve before restyling either.
6. **D-7, D-8, D-10, D-11, D-12** — gate the phosphor on `.dark`, add a forced-colors scrub affordance, fix the `:584` citation, add `aria-valuetext`, drop one figure mechanism.
7. **S-4 (census)** — with 1–6 landed, re-ask whether 162 lines still earn their keep against `ScrubberTimeline`. Most of the repair list above is the primitive's shipped behaviour.

**Preserve through any repair:** S+1 (parameter consumption over idiom forking), S+2 (zero literal colour), S+3 (`cqw` compositor travel), S+4 (CSS `text-transform`, not shouted DOM text).
