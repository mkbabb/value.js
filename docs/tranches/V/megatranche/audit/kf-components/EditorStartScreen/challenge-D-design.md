claude-opus-5[1m]

# CHALLENGE · `EditorStartScreen.vue` — axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/shell/EditorStartScreen.vue` (191 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Read whole:** the target + `AnimatedText.vue` (126) + `TypingDots.vue` (125) + `@lucide/vue` `List` (declaration only) + both mount sites (`app/App.vue:50`, `EditorShell.vue:60-66`) + the full token chain it consumes (`demo/styles/style.css`, `demo/styles/layout.css`, `node_modules/@mkbabb/glass-ui/dist/styles/{typography/scale.css,typography/semantic.css,tokens/color-radius.css,tokens/dark-arm.css,transitions.css}`) + the two components whose rules collide with it (`scenes/cube/CubeScene.vue`, `app/dock/ChromeDock.vue`) + `demo/app/index.html`.
**Hitherto folded:** `formation/keyframes/lane-frontend.md` — F-1 (glass-ui phantom dependency), §6.3 (zero `--kf-*`, flat global namespace), §6.5 (13 PRM sites), S-5 (`AnimatedText` → `TypewriterText`, AMBER with owner carve-out), S-8 (`TypingDots` JUSTIFIED BESPOKE). Cited inline; contradicted explicitly where the tree disagrees (see §7).

**Tally: 28 defects (2 BLOCKER · 6 MAJOR · 10 MINOR · 10 INFO) · 5 superlatives.**

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| D-1 | **BLOCKER** | The T.D9 φ-band re-seat and CubeScene's still-live `--start-hero-band: 34dvh` recede now stack **both** phone focal planes into the lower half; the top ~34dvh is dead. The "die upper ~45%, hero band under it" claim is inverted by a rule neither wave re-reconciled. |
| D-2 | **BLOCKER** | The band is absolutely positioned with **no bottom bound and no height budget**, inside a container that is `overflow: hidden` with no scroll path. On 1024–1300px-wide × <700–760px-tall viewports the hint line (and at the tail, the deck) is silently clipped and unreachable. |
| D-3 | MAJOR | The italic deck+hint have **no italic fallback face and no synthesis** (`font-synthesis: none`) and the ital@1 woff2 is **not preloaded** — they paint upright roman, then restyle. T.D11's "already loaded; zero new payload" is false in both halves. |
| D-4 | MAJOR | "from the list ☰ below" — the only scene list is a **collapsed `Select` in the TOP dock**, above the hero, presenting a Home icon, never a ☰. The copy points the wrong way at an affordance that is not rendered. |
| D-5 | MAJOR | `TypingDots`' rest floor is an **alpha** floor, not a **contrast** floor: 1.52:1 (light) / 1.64:1 (dark), and under `prefers-reduced-motion` that is the *permanent* state inside the LCP node. |
| D-6 | MAJOR | Two `<h2>` elements that are not headings; the hint ("or drag M. cubert 🙂‍↔️") enters the document heading map as a level-2 section heading. |
| D-7 | MAJOR | The "φ BAND" is not φ: `0.45` / `0.52` are bare decimal literals while `layout.css` already publishes the honest golden pair as named tokens. |
| D-8 | MAJOR | The deck→hint step is carried by ink alone, and that step is **2.06:1 in light but 1.49:1 in dark** — the named deviation's sole mechanism is 28% weaker in the theme nobody measured. |

---

## 1. What the component is, measured

Two focal spans and three type blocks, all ink, no chrome:

```
EditorStartScreen.vue:17-19   .hero-band   absolute · left-0 · w-screen · z-controls · pointer-events-none
              :27-30          h1.hero-display.text-display-mega   ← <AnimatedText> + <TypingDots>
              :40-44          h2.hero-deck        (deck: subtitle + ☰ + subtitleSuffix)
              :45-47          h2.hero-hint        (v-if — one of two mount paths supplies it)
```

Resolved token values (all sourced, not assumed):

| token | value | source |
|---|---|---|
| `--type-display-mega` | `clamp(5.382rem, 4rem + 9vw, 11.089rem)` = **86.1 → 177.4px** | `glass-ui/dist/styles/typography/scale.css:1` |
| `--type-display-4` | `clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` = **53.3 → 86.1px** | same |
| `--type-title` | `2.058rem` = **32.93px, FIXED (no clamp)** | same |
| `--font-display` | `"Instrument Serif", "Instrument Serif Fallback", Georgia, serif` | `style.css:55` |
| `--foreground` / `--background` | `hsl(24 10% 10%)` / `hsl(40 30% 98%)` (light) | `glass-ui/dist/styles/tokens/color-radius.css:1` |
| `--foreground` / `--background` | `hsl(30 14% 90%)` / `hsl(24 9% 4%)` (dark) | `glass-ui/dist/styles/tokens/dark-arm.css:1` |
| `--muted-foreground` | `--neutral-5` = `hsl(30 22% 40%)` light / `hsl(34 14% 62%)` dark | both, above |
| `--work-area-height` | `min(100dvh, clamp(44rem, 88dvh, 120rem))` desktop | `layout.css:51` |
| `--work-area-vertical-bias-top` | **`0.382` (1/φ²)** — a *named* token | `layout.css:73` |

The desktop `text-display-mega` weight-600 and negative tracking are overridden to `400` / `0` by `@layer demo-typography` (`style.css:265-275`); the scoped `line-height: 0.92` / `font-weight: 400` / `color` win over the layered utility because Vue scoped styles are unlayered. All three overrides land. No defect there.

---

## 2. BLOCKERS

### D-1 · The phone composition collapsed: two focal planes in one half, 34dvh of dead space

**BLOCKER** · `EditorStartScreen.vue:117-127` (the 0.52 mobile band) × `scenes/cube/CubeScene.vue:258-286` × `styles/layout.css:26`

The file's own ruling text (`:112-116`) states the mobile intent:

> "The φ band also drops to 0.52 so the die keeps the upper ~45% (two focal planes, hero printing OVER the die's lower quadrant — overlap WELCOME per OD-4)."

The die does not keep the upper 45%. `CubeScene` is mounted as the home backdrop (`App.vue:283-296` — `if (isHome.value || … === "cube") return CubeScene` with `hideLoader: true`), which switches on `cube-stage--hero-recede` (`CubeScene.vue:11`), whose live rule below `lg` is:

```
CubeScene.vue:266-267   .cube-stage--hero-recede { padding-block-start: var(--start-hero-band); … }
layout.css:26           --start-hero-band: 34dvh;  /* "the hero owns above; the subject's centering starts below" */
```

So the die's centering region **starts at 34dvh** — a rule authored when the hero owned the *top* band. The hero no longer does. Arithmetic at 390×844 (the demo's own recorded probe viewport, `TransportDock.vue:264`), home ⇒ no TransportDock (`AnimationControlsGroup.vue:97-98`, `transportNames.length > 0`), so `--menubar-measured-h` = 0:

```
--dock-band-reserve        ≈ 2.75rem(44) + --dock-margin + safe-area-inset-bottom(34)   ≈ 90px
--work-area-height          = min(844, min(64rem, 844 − 90))                             = 754px
--work-area-top-offset      = 0.382 × (844 − 754)                                        = 34.4px
hero-band top (0.52 arm)    = 34.4 + 0.52 × 754                                          = 426.5px  (50.5dvh)
die centering region        = [34dvh = 287px , 844 − dock-bottom-anchor ≈ 781px]  → centre ≈ 534px (63dvh)
die extent (--side-size: min(40vh,40vw,16rem) = 156px, CubeScene.vue:283)                = [456, 612]
hero text block             ≈ [426, 630]   (2 lines × 0.92 × 55.6px + gaps + deck + hint, §2 D-2 method)
```

The die's **entire** 156px extent falls inside the hero's text block. The composition is not "two focal planes" — it is one superimposed pile occupying 50–75dvh, with the top **287px (34dvh) empty** but for the collapsed dock pill. The overlap the ruling welcomes ("a bit on top of the cube", the die's *lower quadrant*) has become total coverage of the die's *centre*.

That the two rules were never re-reconciled is provable, not inferred — `CubeScene.vue:259-260` still cites the class this component deleted:

> "The hero parks in the top band (EditorStartScreen `pt-[var(--dock-top-band-reserve)]`)"

`grep -n "dock-top-band-reserve" EditorStartScreen.vue` → **no match.** `CubeScene.vue:262` then asserts "the 390×844 hero/subject intersection is 0 by construction" — a guarantee whose construction T.D9 dismantled, in the same repo, against the same viewport.

**Falsifier:** a 390×844 render showing the die's visual centre **above** the hero's first baseline; or a rule (searched: none in `CubeScene.vue`, `CubeTarget.css`, `layout.css`) that re-centres the receded cube upward; or evidence that `--start-hero-band` is dead (it is not — `CubeScene.vue:267` is its single live consumer).
**Status:** source contradiction CONFIRMED; the pixel geometry is `UNPROVEN-NEEDS-LIVE` (the 2-line mobile poster estimate is the only soft term, and it only makes the pile *taller*).

---

### D-2 · An unbounded block in a clipped, unscrollable container — the hint is silently lost on common laptops

**BLOCKER** · `EditorStartScreen.vue:17-19, 88-94` × `EditorShell.vue:3, 60` × `style.css:217`

`.hero-band` declares `top` and nothing else vertical: no `bottom`, no `height`, no `max-block-size`, no overflow strategy. Its containing chain clips absolutely:

```
style.css:217           html, body { overflow: hidden; }          ← plus overscroll-behavior:none
EditorShell.vue:3       .editor-shell  h-dvh max-h-dvh w-dvw overflow-hidden
EditorShell.vue:60      <div v-if="showStartScreen" class="absolute inset-0 z-controls flex … pointer-events-none">
```

Anything past the viewport bottom is clipped with **no scroll path at all**. And the block's height is driven by a **width**-derived quantity (`--type-display-mega` = `4rem + 9vw`) against a **height** budget (`0.45 × --work-area-height`), with no feedback term between them. Concretely, using the file's own authored line count (`:103` — "the balanced **two-line** poster"):

```
h1        2 × 0.92 × 177.4                      = 326.4px      (mega capped for width ≥ 1260px)
gap       0.75rem                               =  12.0px      (:136)
deck      1 × 1.15 × 32.93                      =  37.9px
gap       0.35rem                               =   5.6px      (:147)
hint      1 × 1.15 × 32.93                      =  37.9px
                                        block   = 419.8px      ← invariant above lg: --type-title is fixed
top       V∈[704,800): 0.382(V−704) + 0.45·704  = 0.382V + 47.9
overflow  ⇔ 0.382V + 47.9 + 419.8 > V           ⇔ V < 756.6px
```

At the `lg` floor the poster is provably two lines, not estimated: at W=1024 the content measure is `1024 − 2×clamp(2rem, 5vw, 4.5rem)` = 921.6px and mega = 156.2px, so a single line demands an average advance ≤ `921.6/(19 × 156.2)` = **0.311em** across "Select an animation" — below the advance of Instrument Serif's *narrowest* lowercase (`i`,`l`,`t` ≈ 0.20–0.25em) once `m`(≈0.65em), `S`,`o`,`n`,`a`(≈0.40–0.45em) are averaged in. Two lines is forced for all W ≲ 1300px (the one-line crossover is `6.60em × mega ≤ 0.9W` ⇒ W ≳ 1301). So the failing band is:

| viewport | poster | block | seat top | block bottom | verdict |
|---|---|---|---|---|---|
| 1024 × 660 (1024×768 minus chrome) | 2 lines @156.2px | 380.7px | 297.0 | 677.7 | **hint clipped 17.7px** |
| 1280 × 720 (1280×800 minus chrome) | 2 lines @177.4px | 419.8px | 322.9 | 742.7 | **hint clipped 22.7px** |
| 1366 × 683 (1366×768 minus chrome) | 2 lines @177.4px | 419.8px | 307.4 | 727.2 | **hint clipped 44.2px — entirely** |
| 1024 × 620 (bookmarks bar + devtools dock) | 2 lines @156.2px | 380.7px | 279.0 | 659.7 | **hint gone + deck's lower 18px cut** |
| ≥1301 × any | 1 line | 256.6px | ≤0.442V+48 | — | safe |

Below V ≈ 630 the clip reaches the **deck** — the line carrying the screen's only instruction. The demo's single empty state loses its instruction on a 13″ laptop, irrecoverably, because the container that clips it cannot scroll.

**Falsifier:** a render at 1280×720 or 1366×683 showing the hint line fully visible (which would mean the poster resolved to one line there — my `6.60em` sum for "Select an animation" is the soft term, ±10% moves the crossover to 1180–1430px, but does **not** rescue W ≤ 1180); or an ancestor with `overflow: visible` + a page scroll (searched: `style.css:217` and `EditorShell.vue:3` both hard-clip, `overscroll-behavior: none` on top).
**Status:** clipping chain CONFIRMED from source; per-viewport line counts `UNPROVEN-NEEDS-LIVE` except W=1024, where the 0.311em bound settles it.

---

## 3. MAJORS

### D-3 · The italic deck and hint have no fallback face and no synthesis — they paint upright, then restyle

**MAJOR** · `EditorStartScreen.vue:135-154` × `style.css:81-88, 100` × `demo/app/index.html:35-75`

T.D11 moved the deck and hint to Instrument Serif **true italic** and justified it thus (`:31-33`):

> "the deck joins the poster's own voice: Instrument Serif TRUE italic 400 (**the ital@1 face is already loaded; zero new payload**)."

Both halves of that parenthesis are false against the tree.

*Not loaded:* Instrument Serif is Google-Fonts-hosted (`index.html:65-77`) behind a deliberately **non-render-blocking** `media="print"` + `onload="this.media='all'"` stylesheet — the `@font-face` rules are not even applied until after load. Exactly one face is preloaded (`index.html:55-61`), and its rationale explicitly excludes the one this component now needs:

> "ONE face only (the guide forbids over-preloading: **italic** + latin-ext are **not above the fold**)."  — `index.html:47-48`

The italic **is** above the fold now: it is lines 2 and 3 of the hero.

*Not zero payload:* before T.D11 no rule in the demo requested `font-style: italic` from `--font-display`, so the browser never fetched the ital@1 woff2 the `css2?family=Instrument+Serif:ital@0;1` sheet declares (fonts are fetched on use, not on declaration). T.D11 put two live consumers on it. That is one additional font fetch, discovered late, on the hero.

*And the fallback cannot cover it.* The metric-matched fallback family is declared **once**, style-normal:

```
style.css:81-88   @font-face { font-family: "Instrument Serif Fallback"; src: local("Georgia");
                    size-adjust: 105.9310%; ascent-override: 96.6667%; descent-override: 37.7604%; … }
style.css:100     :root { font-synthesis: none; }
```

`grep -n "Instrument Serif Fallback" demo/styles/*.css` → one `@font-face`, no `font-style: italic` sibling. Per CSS Fonts §5.2 style matching, `font-style: italic` against a family holding only a normal face resolves to that normal face; `font-synthesis: none` (which sets `font-synthesis-style: none`) then forbids the synthetic oblique. **The deck and hint therefore render upright roman at first paint**, in a fallback whose `size-adjust`/`ascent-override` were calibrated against the *upright* web face, and then restyle to italic — a change of both slant and advance widths on the two lines directly beneath the LCP node. The CLS story at `style.css:68-74` covers the h1 only and says so ("so the LCP `<h1>` … does not reflow"); nothing covers lines 2–3.

The component even names the mechanism it is standing on (`:23` — "the T.D2 root `font-synthesis: none` … make any other declaration a lie") without noticing that the same declaration is what strips its italic fallback.

**Falsifier:** an `@font-face` for `"Instrument Serif Fallback"` carrying `font-style: italic` (none exists); a `font-synthesis-style: auto` or `font-synthesis: style` override on `.hero-deck`/`.hero-hint` (none — the only three `font-synthesis` sites in `demo/` are `style.css:100` and two prose mentions plus `EditorStartScreen.vue:108`, all `none`); a second preload for the ital@1 woff2 in `index.html` (none); or a filmstrip showing italic at first paint.

### D-4 · "from the list ☰ below" points the wrong way, at a glyph the UI never draws

**MAJOR** · `EditorStartScreen.vue:40-44, 73-76, 165-170` × `app/dock/ChromeDock.vue:212-272`

The deck's default copy is `"from the list"` + `☰` + `"below, then press Play."` (`:73-75`), and the icon is documented as "an icon voiced as a word" (`:165`). Three independent problems, all decidable from the tree:

1. **Direction.** The only scene list in the application is the `Select` at `ChromeDock.vue:236-271`, inside a host that is `fixed … style="top: var(--dock-top-anchor)"` (`:216`) and `data-dock-tether="top"` (`:214`) — **unconditionally top-anchored**, with no media override anywhere in the file. `--dock-top-anchor` (`layout.css:113-119`) is capped at `4rem + --dock-margin/4` from the viewport top. The hero sits at `0.45–0.52 × --work-area-height` — 300–430px *below* it. The word "below" was true for the pre-T.D9 top-band seat and is inverted by the re-seat the same file celebrates.
2. **"the list" is not a list.** The host is `<GlassDock :collapse-delay="2500" :start-collapsed="true">` (`ChromeDock.vue:232`). At first paint the user sees a collapsed pill; the scenes exist only inside an unopened dropdown. Nothing list-shaped is on screen when the instruction is read.
3. **The ☰ is a fiction.** The trigger renders `currentIcon`, or `<Home>` when absent (`ChromeDock.vue:238-241`), plus `<SelectValue />`. On home that is a house glyph and the word "Home". A hamburger appears nowhere in the dock, the header ribbon (`EditorShell.vue:30-52`), or `MbabbMenu`. The deck depicts an affordance that is not rendered, which is worse than a plain wrong preposition: it sends the reader hunting for a specific shape.

There is also no list *below* to mistake it for: `homeScene` carries **no** `component` (`scenes.ts:128-134`), `derivedSurfaces` is `[]` on home (`App.vue:270-272`), so `hasControlSurfaces` is false and no `ControlsPaneWrapper` mounts (`AnimationControlsGroup.vue:19-23`), and `TransportDock` does not mount either (`:97-98`). Home is, by the tree's own word, "COMPASS ONLY" (`:93`).

**Falsifier:** any visible, list-shaped scene affordance rendered below the hero on home; or a bottom-anchored arrangement of `ChromeDock` at some breakpoint; or a ☰ glyph in the dock trigger.

### D-5 · The dots' rest floor is specified in alpha, not contrast — 1.52:1, and permanent under reduced motion

**MAJOR** · `TypingDots.vue:51-53, 92-96, 117-124` (composed at `EditorStartScreen.vue:29`)

```
TypingDots.vue:51-53   // Rest opacity NEVER 0 (the perceptual fix + proof:typing-dots (c)'s ≥0.15
                       //  floor): the dots dim to 0.2 and pulse to 1, never blanking out.
TypingDots.vue:123     .typing-dot { opacity: 0.2; }
TypingDots.vue:91      respectReducedMotion: true,   → PRM snaps to the 0%/100% frame = REST_OPACITY
```

The gate is a numeric **alpha** floor. Composited (sRGB, as browsers do) against the resolved tokens, the perceptual result is:

| state | composite | rel. luminance | contrast vs `--background` | WCAG |
|---|---|---|---|---|
| light, rest (0.2α) | rgb(207,205,203) | 0.6138 | **1.52 : 1** | fails 3:1 (large) and 4.5:1 |
| light, peak (1.0α) | `--foreground` | 0.0100 | 16.83 : 1 | pass |
| dark, rest (0.2α) | rgb(56,54,53) | 0.0371 | **1.64 : 1** | fails |
| dark, peak (1.0α) | `--foreground` | 0.7916 | 15.85 : 1 | pass |

`0.2α` on 98%-lightness paper is not "dimmed", it is 1.5:1. Under `prefers-reduced-motion` the engine rests at that frame **forever** — the file says so itself (`:120-124`: "under prefers-reduced-motion (the engine snaps to the resting frame, which the keyframe's 0%/100% sets to REST_OPACITY → readable)"). "Readable" is asserted, never measured. So a reduced-motion visitor's only ever view of the hero's ellipsis is three ghost marks at 1.5:1 inside the LCP node — closer to a rendering artifact than a designed glyph. The correct floor for a ≥0.15 gate is a *contrast* floor (≈0.28α reaches 3:1 in light, ≈0.31α in dark, by the same composite arithmetic).

Aurora perturbs this by at most its ceiling, `HERO_AURORA_OPACITY_CEILING = 0.1` (`HeroAurora.vue:46`) — an order too small to rescue 1.5:1.

**Falsifier:** a measurement showing ≥3:1 at rest; or evidence the engine's PRM resting frame is the `50%` keyframe (`opacity: 1`) rather than `0%`/`100%` — `TypingDots.vue:120-124` asserts the latter; the engine's `withReducedMotion` authority was not read on this axis and is a live check for the L lane; or a ruling that an `aria-hidden` decorative ellipsis is exempt from 1.4.3 (defensible in law, indefensible as design at a 177px rung).

### D-6 · Two `<h2>`s that are not headings

**MAJOR** · `EditorStartScreen.vue:40, 45`

```
:40   <h2 class="start-screen-prose start-screen-subtitle hero-deck w-full">   ← a deck
:45   <h2 v-if="hint" class="start-screen-prose hero-hint w-full">             ← "or drag M. cubert 🙂‍↔️"
```

Neither element heads a section; neither has content beneath it in the document structure. The hint especially — a playful discovery nudge — is announced as a level-2 section heading and appears in every AT heading list and rotor. The styling is entirely class-driven (`:135-154`), so `<p>` costs nothing and loses nothing. The component already demonstrates it knows the difference: the h1 carries a deliberate `sr-only`/`aria-hidden` split (`AnimatedText.vue:21-25`) so the *real* heading reads cleanly, and then the two decorative lines are given heading weight for free.

Adjacent, same site: the emoji `&#x1F642;&#x200D;&#x2194;&#xFE0F;` (`App.vue:50`) is U+1F642 ZWJ U+2194 FE0F, "head shaking horizontally" — Emoji 15.1 (2023). It is unlabelled inside that heading, so AT announces the CLDR name mid-sentence, and on any platform predating Emoji 15.1 the ZWJ sequence degrades to two glyphs (🙂↔️) — a two-token artifact where one gesture was intended.
**Falsifier:** an AT transcript in which either h2 genuinely reads as a section heading; or a design constraint requiring heading semantics for the deck (none in the T.D11 packet text quoted at `:31-39`).

### D-7 · The "φ BAND" is not φ, and the honest φ tokens are two lines away

**MAJOR** · `EditorStartScreen.vue:8-11, 88-94, 117-127` × `layout.css:70-75`

The file swears fidelity to a named rule and then breaks its spirit while satisfying its letter:

```
:8-10    "The re-seat is the φ BAND, derived from the work-area chain (the K.W3
          M4/C5 rule — never a raw vh/px offset)"
:82-87   "Derived ENTIRELY from the work-area chain … No raw vh/px magic number
          (the K.W3 M4/C5 ban holds …)"
:91      top: calc(var(--work-area-top-offset, 0px) + var(--work-area-height, 100dvh) * 0.45);
:121-122 top: calc(var(--work-area-top-offset, 0px) + var(--work-area-height, 100dvh) * 0.52);
```

`0.45` and `0.52` are magic numbers. They are not φ-derived: 1/φ = 0.618, 1/φ² = 0.382, φ−1 = 0.618, 2−φ = 0.382 — none is 0.45 or 0.52, and no intermediate in the chain produces them. Meanwhile the very chain being cited already publishes the honest pair **as named tokens** for exactly this purpose:

```
layout.css:73-74   --work-area-vertical-bias-top: 0.382;   /* 1/φ² — subject parks above optical centre */
                   --work-area-vertical-bias-bottom: 0.618; /* 1 − 1/φ² */
```

So the file consumes `--work-area-top-offset` (which *is* φ-derived) and then multiplies the work-area height by an untokenized decimal it calls φ. The ban it cites is on raw *lengths*; the drift it permits is raw *ratios* — the same class of defect, one level up, and undetectable by the grep the ban is enforced with. Two consequences beyond the naming: the shares cannot be tuned from the token layer (D-1 and D-2 both need exactly that lever), and no third party can discover that two different ratios govern the same seat at two breakpoints.

The secondary claim, "the H1 baseline lands ≈φ of the work area" (`:10-11`), is also unmet at scale: at V=900 the first baseline lands at ≈0.587 of the work area (within ~5% of 0.618, arguably "≈"), but the *block* bottom lands at 0.851 — and it is the block, not the first baseline, that the composition has to fit (D-2).

**Falsifier:** a derivation showing 0.45 or 0.52 as a φ expression; or a token (`--hero-band-share` or similar) defining either — `grep -rn "0\.45\|0\.52" demo/styles/` finds neither.

### D-8 · The named ink-only deviation is 28% weaker in dark mode, and unmeasured there

**MAJOR** · `EditorStartScreen.vue:34-38, 135-154`

The deck and hint share family, style, weight, size, and leading. The file names this and elects ink as the sole differentiator:

> "the hint rides the SAME title rung … ink strength carries the deck→hint step instead of size. A named deviation in the T.D11 packet." — `:36-39`

Measured, that step is not stable across the two themes the app ships (`DarkModeToggle` at `EditorShell.vue:44`, `.dark` arm at `tokens/dark-arm.css:1`):

| pair | light | dark |
|---|---|---|
| deck (`--foreground` @ 0.85α) vs `--background` | 10.73 : 1 | 11.46 : 1 |
| hint (`--muted-foreground`) vs `--background` | 5.21 : 1 | 7.70 : 1 |
| **deck vs hint (the hierarchy step itself)** | **2.06 : 1** | **1.49 : 1** |

Both lines are legible in both themes — no contrast failure here (and that is worth saying plainly). But the *deviation's mechanism* loses 28% of its strength in dark mode: a 1.49:1 luminance difference is the only signal distinguishing two adjacent 33px italic serif lines of identical everything else. The named deviation was accepted on the strength of an ink step that was measured in neither theme.

The cheap fix is inside the file's own constraint set — the T.D2 serif floor rules out a *size* step at the heading rung, but not tracking, not a small-caps or lining-figures shift, not a rule/indent, and not a `--muted-foreground-strong`-style token pair chosen for equal step in both arms.

**Falsifier:** a perceptual ruling that ≥1.4:1 suffices as a hierarchy step at 33px; or a dark-arm `--muted-foreground` override in the demo (searched `demo/styles/*.css` — none; the demo overrides `--accent-*`, `--axis-*`, never the neutral ink).

---

## 4. MINORS

**D-9 · Rung-blind margins — the exact lesson the sibling file records as fixed.** `:136` `margin-block-start: 0.75rem`, `:147` `0.35rem`. Absolute rem under a ramp that scales 156→177px (desktop) and 53→86px (mobile). `AnimatedText.vue:19` records the fix for precisely this: "Em-relative lift (−0.09em — the old −10px was rung-blind at 177px)". At 177px the h1→deck gap is 0.068em of the headline it separates; the deck→hint gap is 0.17em of the deck at desktop and 0.23em at the 24px phone floor, so the rhythm *ratio* changes with viewport while the file elsewhere insists rhythm be rung-relative. *Falsifier:* a ruling that the hero's gaps are intentionally viewport-absolute.

**D-10 · `line-height: 0.92` leaves no descender clearance for the component's own prop.** `:106`. With Instrument Serif's metrics as declared at `style.css:79-87` (ascent 1.024em, descent 0.400em), a 0.92 line box crops to **0.148em below baseline**; a typical serif descender reaches ≈0.21em, i.e. ~0.062em (11px at 177px) below the line box. The deck's own ascenders overflow its box top by (1.424−1.15)/2 = 0.137em (4.5px). Against a 12px gap that is ≈−3.5px — an overlap. The default `title` ("Select an animation") has no descenders, so the defect is *latent in the public prop*: any `title` containing g/y/p/q/j collides. `UNPROVEN-NEEDS-LIVE` (real descender depth vs the declared metric). *Falsifier:* a render of `title="Type a keyframe copy"` showing clearance.

**D-11 · `--type-title` is the ladder's only non-fluid rung, so the deck is viewport-invariant above lg.** `:140, 152` vs `typography/scale.css:1`. Every neighbouring rung (`--type-caption` … `--type-prose`, all `--type-display-*`) is a `clamp()`; `--type-title` is a bare `2.058rem`. The demo clamps *below* lg (`:182-189`) and not above, so the mega→title ratio drifts 4.75 (W=1024) → 5.39 (W≥1301) and freezes there: a 33px deck under a 177px poster on a 5K panel. The file calls this ladder "φ" (`:34-36`); φ steps are 1.618, and 5.39 ≈ φ^3.5 with five published rungs skipped. *Falsifier:* a `--type-title` clamp in a later glass-ui version, or a deliberate poster/fine-print register ruling.

**D-12 · Owned tokens are guarded; rented tokens are bare.** `:90-91, 120-122` supply fallbacks for demo-owned geometry (`var(--work-area-top-offset, 0px)`, `var(--work-area-height, 100dvh)`); `:126, 137, 140, 149, 152, 185, 188` supply none for glass-owned typography (`--type-display-4`, `--font-display`, `--type-title`). The asymmetry is backwards: glass-ui is a **phantom dependency** — absent from `package.json` *and* `package-lock.json`, present only as an unpinned 7.0.0 in `node_modules` (lane-frontend **F-1**). A rename on the rented side makes `font-size: var(--type-title)` invalid-at-computed-value-time, and the deck silently collapses to the inherited body rung. *Falsifier:* F-1 resolved with a pinned floor, which would make the guard genuinely unnecessary.

**D-13 · Three class prefixes on one element; one selector exists only inside a media query.** `:40` carries `start-screen-prose start-screen-subtitle hero-deck`. `.start-screen-subtitle` is defined **only** at `:183` (inside `@media (max-width: 1023px)`) — at desktop it is a class with no rule, present purely as a naming residue. `.hero-hint` is styled both globally (`:146`) and inside the same media block (`:187`), while its sibling's mobile arm hides behind the other prefix. Two naming eras coexist with no stated rule. Folds lane-frontend §6.3: 98 demo custom properties, **zero** `--kf-*`, a flat global namespace — the same discipline gap one layer up, in class names. *Falsifier:* a documented convention assigning `start-screen-*` and `hero-*` distinct roles.

**D-14 · `text-wrap` disagrees between two typographically identical lines.** `:173-175` puts `pretty` on both h2s; `:184` switches the deck alone to `balance` below lg; the hint keeps `pretty` at every width (`:187-189`). Two adjacent lines of identical face/size/style/leading, wrapped by two different algorithms. Separately, `pretty` is effectively inert on the 1–2-line runs here (it optimises last-line rag and orphans over longer paragraphs), so the F.W13.S1 rationale at `:172` buys nothing at this length. *Falsifier:* a render where the hint's rag visibly benefits from `pretty`.

**D-15 · The sentence is assembled by string surgery, so it cannot be reordered.** `:41-43, 73-75`. `subtitle` + `<List>` + `subtitleSuffix` hard-codes the glyph's position mid-clause. `subtitleSuffix` exists for no reason but the icon — a prop invented to paper over an interpolation the template cannot express. Any locale with different word order, or any copy edit that moves the referent, breaks the icon's placement. A single `subtitle` prop with an inline slot, or the literal `☰` character in the string, both survive reordering (and the latter deletes the `@lucide/vue` import at `:61` — one JS component for one static glyph). *Falsifier:* an i18n decision that the demo is English-only forever, which still leaves the copy-edit fragility.

**D-16 · No measure on the prose.** `.hero-band` (`:88-94`) sets only `padding-inline`; neither h2 has a `max-inline-size`. The default strings are short so nothing shows today, but `subtitle`/`hint` are public props (`:66-71`) with no cap: at 3840px a longer string runs 3696px gutter-to-gutter at 33px — roughly 115 characters per line, ~2.4× the 45–75ch readability band. The API invites copy the layout cannot set. *Falsifier:* a ruling that these props are private to the two in-repo mount sites.

**D-17 · The ☰ rides above the cap line it is "voiced as a word" within.** `:166-170` — `width/height: 0.8em` with `vertical-align: baseline`. Baseline alignment puts the box *bottom* on the baseline, so the glyph box top reaches 0.8em, above Instrument Serif's cap height (~0.70em) and far above the x-height (~0.51em per the Capsize figures at `style.css:83`) of the lowercase run it sits inside. The optical centre of a lucide 24×24 hamburger lands ≈0.40em above baseline against ≈0.26em for the surrounding lowercase. The idiomatic fix is `vertical-align: -0.125em` or matching to x-height. `UNPROVEN-NEEDS-LIVE`. *Falsifier:* a render showing the ☰ optically centred on the lowercase run.

**D-18 · The metric-matched fallback is macOS/Windows-only.** `style.css:83` — `src: local("Georgia")`, the sole source. Georgia is absent from stock Android and virtually all Linux distributions, so the `"Instrument Serif Fallback"` family has no available face there and matching falls through to `Georgia` (absent) → generic `serif` (Noto/DejaVu Serif) with none of the `size-adjust: 105.9310%` / `ascent-override` calibration. The CLS-stabilisation claim for the LCP h1 (`style.css:68-74`) therefore holds on two of three platform families. *Falsifier:* a Georgia-bearing Android/Linux target set, or a self-hosted metric-matched woff2.

---

## 5. INFO

**D-19 · Dead utilities, ×3.** `:27` `p-0` on the h1 — Tailwind v4 preflight (`tailwindcss ^4.3.0`, `package.json:101`) already zeroes padding on every element. `:40, 45` `w-full` on two block-level h2s inside a block container — already full width.

**D-20 · `w-screen` hard-codes the viewport inside an `inset-0` containing block.** `:18` `w-screen` = `width: 100vw`, while the containing block is `EditorShell.vue:60`'s `absolute inset-0`. The honest sizing is `inset-inline: 0` (follow the parent). It is harmless *today* only because `html, body { overflow: hidden }` (`style.css:217`) guarantees no scrollbar gutter, so 100vw happens to equal the shell's `w-dvw`. The coupling is latent, not correct.

**D-21 · The mount wrapper's centring context is now dead.** `EditorShell.vue:60` — `flex items-center justify-center` whose only child is `position: absolute`. No in-flow item exists for the flex context to centre; it is residue of the pre-T.D9 seat, left in place while the child moved to explicit `top`.

**D-22 · The whole hero is unselectable.** `:18` `pointer-events-none` (deliberate, and correct for gesture pass-through per `EditorShell.vue:54-57`) also disables mouse text selection, so no visitor can copy the copy. Cheap mitigation if wanted: `pointer-events: auto; user-select: text` on the type blocks only, `none` on the band.

**D-23 · `--start-hero-band`'s documentation is stale.** `layout.css:26` describes it as "the phone home hero/subject band split (**the hero owns above**; the subject's centering starts below) — clears the display-4 mobile hero on the 667/844 heights". This component no longer consumes it and no longer owns the top band. Its single live consumer is `CubeScene.vue:267` — see D-1.

**D-24 · `index.html`'s LCP premise names a class the tree does not ship.** `index.html:38` — "the hero `<h1 class="text-display-4">` (EditorStartScreen.vue) is the LCP element". The tree ships `text-display-mega` (`:27`); `text-display-4` survives only as the *mobile* override (`:125-126`). The preload rationale that D-3 rests on descends from that stale premise.

**D-25 · Redundant `font-synthesis` at the rung.** `:108` re-declares `font-synthesis: none` on `h1.hero-display`. The property is inherited and already `none` at `:root` (`style.css:100`). The comment calls it "belt-and-braces" (`:99-100`), accurately — but the same file's `:23` argues that the root declaration "make[s] any other declaration a lie", which is an argument against its own line 108.

**D-26 · Dev/prod root-arity divergence.** The template is a fragment in development (element at `:17-48` plus the trailing comment block at `:49-57`) and a single root in production (comments stripped). Class/attr fallthrough behaves differently between the two builds. No consumer passes a class today (`App.vue:50` passes `hint`; `EditorShell.vue:62` passes nothing), so this is latent.

**D-27 · Two live variants, one of which loses the discovery affordance.** `App.vue:50` supplies `hint="or drag M. cubert …"`; `EditorShell.vue:62`'s default fallback supplies none, and `:45`'s `v-if="hint"` drops the line entirely. The drag affordance is discoverable on one mount path only.

**D-28 · Forced-colors: no handling needed for the type, unresolved for the backdrop.** No `@media (forced-colors: active)` block exists, and none is required for the text — computed, `opacity: 0.85` on `CanvasText` yields ≈15:1 in both HCM polarities (0.85 white on black → 14.8:1; 0.85 black on white → 15.1:1), and `--muted-foreground` is force-overridden to `CanvasText` anyway. What is unresolved is the Aurora backdrop: gradient `background-image` is not suppressed by forced-colors, and `forced-color-adjust` appears nowhere in `HeroAurora.vue`. That is glass-ui's `/aurora` surface, filed here as a pointer only.

---

## 6. Superlatives (L-18 runs both ways)

**S-1 · The per-char a11y architecture is exactly right, and the whitespace hazard is solved without a hack.** `AnimatedText.vue:21-25` — one `sr-only` span carries the whole phrase; the animated layer is `aria-hidden`. AT never hears "S…e…l…e…c…t", and the h1's accessible name is the clean string. The Vue `whitespace: 'condense'` trap (whitespace-only text nodes between sibling *elements* containing a newline are deleted) is defeated structurally, by a per-word `margin-inline-end: 0.25em` instead of a rendered space (`:29-32`), with the failure mode it prevents named in the comment ("Selectananimation", `:13`). Both the fix and its rationale are durable. *Falsifier:* an AT transcript reading the glyph stream, or a render showing words fused.

**S-2 · `prefers-reduced-motion` is honoured on all three motion sources with zero duplicate guards in this file.** The hero has three moving parts and this component declares no PRM block at all — correctly, because each source owns its own: CSS `animation: none` on the char wave (`AnimatedText.vue:121-125`), the engine's `respectReducedMotion: true` on the dots (`TypingDots.vue:91`, replacing a previously hand-mirrored `@media` block per its own note at `:83-85`), and glass-ui's PRM arm collapsing the mount `.fade` to 0.1s `!important` (`glass-ui/dist/styles/transitions.css`, PRM block present). No mechanism is duplicated, no source is orphaned. Against lane-frontend §6.5's finding that the demo's 13 PRM sites are "conscientious but inconsistent in mechanism", this composition is the consistent corner. *Falsifier:* any of the three failing to rest — note D-5 attacks the *value* the dots rest at, not the fact that they rest.

**S-3 · The type ramp is RTL-clean by construction.** `padding-inline` (`:93`), `margin-block-start` (`:136, 147`), `margin-inline-end` (`AnimatedText.vue:30-32`) — logical properties throughout, no physical margin anywhere in the ramp. The lone physical property is `left-0` (`:18`), which is symmetric with the full-width band and therefore inert. Adjacent-and-also-right: the `<List>` glyph is `aria-hidden` (`:42`) while the surrounding interpolations flank it, so the accessible sentence reads "from the list below, then press Play." with correct spacing in both directions. *Falsifier:* an RTL render with the gutter on the wrong side.

**S-4 · The seat reads the work-area chain rather than the viewport — a real discipline win, independent of D-7.** `:89-92, 119-123` consume `--work-area-top-offset` and `--work-area-height`, so the hero tracks the clamped content card (including the mobile `--dock-band-reserve` subtraction at `layout.css:184-186`) instead of raw `dvh`. That is the harder and correct choice, and it is what makes D-7's remedy cheap: only the two shares need tokenising, not the seat.

**S-5 · Zero bespoke-vs-glass shadow at this site.** The component adds no local primitive, no vendored `ui/` copy, no `cva`/`clsx`, no direct `reka-ui` reach — consistent with lane-frontend **F-6** and in deliberate contrast to **S-1/S-3/S-4/S-6/S-7** elsewhere in the demo. Its zero glass-ui import is correct rather than negligent: nothing here is a primitive. Two qualifications, stated to keep the superlative honest — (a) lane-frontend **S-5** flags `AnimatedText` → `/typewriter`'s `TypewriterText` as AMBER, and the lane itself records the owner carve-out ("should uplift each individual char", `AnimatedText.vue:3`) that must be verified against `TypewriterText`'s granularity before any swap; (b) lane-frontend **S-8** rules `TypingDots` JUSTIFIED BESPOKE (it is the inv-ζ engine dogfood seam) — D-5 attacks its rest *value*, and explicitly does **not** argue for replacing it with glass-ui `Pulse`, which would delete library coverage.

---

## 7. Where I contradict the hitherto corpus

- **lane-frontend §6.5 "Gaps"** records `TypingDots.vue:121` as PRM-by-prose-only, deferring to the engine, "correct if the delegation holds, unverified statically". I confirm the delegation is real and wired (`respectReducedMotion: true`, `TypingDots.vue:91`) — so that gap closes — but D-5 opens a sharper one in its place: the delegation is honest and the *frame it rests at* is not readable (1.52:1 / 1.64:1). The PRM defect is not a missing guard; it is a guard that rests on an unmeasured value.
- **lane-frontend §4** lists `EditorStartScreen.vue` as `b` (no glass-ui import) alongside 20 other bespoke `.vue` files. That classification is accurate at the import boundary but understates the coupling: this file consumes **six** glass-ui-owned custom properties (`--type-display-4`, `--type-title` ×2, `--font-display` ×2, `--foreground`, `--muted-foreground`) plus one glass utility class (`text-display-mega`) and one z-rung utility (`z-controls`), all unguarded (D-12). Import-boundary cleanliness is not dependency-freedom, and under F-1 the distinction is load-bearing.
- **lane-frontend §6.3** reports zero `--kf-*` tokens and a flat namespace as a token-layer hazard. I extend the same finding one layer up: the class layer is flat and multi-era too (D-13), and the ratio layer is untokenized entirely (D-7). A namespace lane that only audits custom properties will miss both.

---

## 8. Method, and what this challenge cannot decide

Contrast figures are WCAG 2.x relative luminance, computed from the resolved HSL tokens in §1, with `opacity` composited in sRGB (browser default) before linearisation. Type geometry uses the declared font metrics at `style.css:79-87` (Instrument Serif upm 1000, ascent 1024, descent 400, x-height 510). Line-count arguments state their advance-width bound explicitly and are load-bearing only where the bound is decisive (W=1024, where one line would require a 0.311em average advance).

Not decidable statically, deferred to SS-13: the real rendered line count at 1280–1440px (D-2's soft term); the die/hero pixel overlap at 390×844 (D-1's soft term — the *rule* contradiction is confirmed from source); the ☰ optical seat (D-17); descender clearance under a descender-bearing `title` (D-10); and whether Aurora's WebGL arm perturbs the ink contrast beyond its declared 0.1 ceiling. The engine's `withReducedMotion` resting-frame semantics (D-5's falsifier) is a library-lane read, not a design-lane one. Dark-arm figures use `tokens/dark-arm.css`; the demo overrides no neutral ink token, verified by grep over `demo/styles/*.css`.

No file in `keyframes.js`, `glass-ui`, or `value.js` product source was written, mutated, or executed. No installs, no dev server, no browser. This document is the single write.
