# CHALLENGE-C — PaneHeader.vue: implementation

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus-5 declaration. Seat declared, not inherited.

**Substrate drift (INFO):** the work order names HEAD `c654824e`. The tree's actual HEAD at the time
of this audit is `80fc5c40` (`docs(V·mega): shell band COMPLETE-TRUE 12/12 …`). No source file
touched by this report differs between those two commits (`demo/shared/ui/PaneHeader.vue` last
changed in T.W4); the measurements below are against `80fc5c40` + the live dev server on :9000.

**Verdict: DEFECTIVE.** Twelve findings, three of them cross-engine shipping breakage on Safari —
the engine this repo runs a dedicated `smoke-safari` project for, and the engine the mega-tranche
visual audit captured. Subject: `demo/shared/ui/PaneHeader.vue` (224 lines: 39 template+script,
185 style+prose), consumed by **nine** panes.

Reproductions are committed alongside this report:

| probe | what it decides |
|---|---|
| `probe-01-structure.mjs` | cross-engine × PRM × 4-route geometry, headings, hit-test |
| `probe-02-atan2.mjs` | first sighting of the ratio divergence |
| `probe-03-atan2-mechanism.mjs` | **isolates the mechanism to 6 s.f.** + proves the cure |
| `probe-04-mobile-inversion.mjs` | the iPhone-14 inversion + screenshot |
| `probe-05-deadband.mjs` | the dead band + hit-test column + screenshot |
| `probe-06-veil-alpha.mjs` | the veil's composited alpha at "swell complete" |
| `probe-07-misc.mjs` | duplicate headings, the `contain` fixed-position trap |
| `probe-08-taptarget-and-contain.mjs` | tap-target shrink + the `contain` control experiment |
| `probe-09-prm-mechanism.mjs` | MT-F023's true mechanism |

All run as `node docs/tranches/V/megatranche/audit/components/PaneHeader/<probe>` against
`http://localhost:9000`. **No source edits land from this seat.**

---

## C-1 · BLOCKER — the shrink ratio is built on a WebKit unit bug. On iOS Safari the title *grows* 1.62× and occludes live controls.

`PaneHeader.vue:140-142` derives the title's stuck scale as a "closed-form" CSS identity:

```css
--pane-title-shrink-ratio: calc(
    tan(atan2(var(--type-heading), var(--type-display-1)))
);
```

`tan(atan2(y, x)) === y / x` is the identity the file's comment (`:132-139`) rests on. **WebKit does
not implement it for font-relative lengths.** Isolated, on a bare `<div>`, root font-size 16px:

```
===== webkit =====
  tan(atan2(1rem, 1rem))          identity requires 1          -> matrix(1.619775, …)
  tan(atan2(2rem, 1rem))          identity requires 2          -> matrix(0.688691, …)
  tan(atan2(1.618rem, 2.618rem))  identity requires 0.618029   -> matrix(0.310808, …)
  tan(atan2(1em, 1em))            identity requires 1          -> matrix(1.619775, …)
  tan(atan2(10px, 10px))          identity requires 1          -> matrix(1, …)
===== chromium =====
  …all five correct: 1, 2, 0.618029, 1, 1
```
(`probe-03-atan2-mechanism.mjs`)

**Mechanism, exact.** WebKit hands `tan()` the *degree magnitude* of the angle `atan2()` produced and
`tan()` consumes it as **radians**. Predicted vs measured, three independent cases:

| expression | identity | WebKit measured | `tan(deg-magnitude as radians)` |
|---|---|---|---|
| `tan(atan2(1rem, 1rem))` | 1 | 1.619775 | 1.6197751905438615 |
| `tan(atan2(2rem, 1rem))` | 2 | 0.688691 | 0.6886911649460621 |
| `tan(atan2(1.618rem, 2.618rem))` | 0.618029 | 0.310808 | 0.310807581296239 |

Exact to every digit WebKit serialises. `px` operands are correct in both engines, so the fault is
confined to font-relative units inside `atan2()` — which is precisely what this declaration feeds it.

### The two shipping consequences

**(a) Desktop Safari: a 2× error.** At 1440×900, `--type-display-1` clamps to 41.888px and
`--type-heading` is 25.888px, so the designed stuck scale is 0.618029 ("the stuck title lands
EXACTLY on the retired heading rung", `:131-133`). Measured on `/#/`, scrolled 300px:

```
webkit    rm=no-preference #/  titleTf matrix(1,…) -> matrix(0.310808, …)   titleRectH 91.91 -> 28.57
chromium  rm=no-preference #/  titleTf matrix(1,…) -> matrix(0.618029, …)   titleRectH 91.94 -> 56.82
```
Safari lands the title at **31%**, not 62% — half the designed rung.

**(b) iOS Safari: the "self-neutralising no-op" is a 1.62× ENLARGEMENT.** The comment at `:136-138`
claims the ratio "degenerat[es] to exactly 1 on phones where display-1 floor-pins AT heading (the
shrink self-neutralizes; the floor-pinned no-op needs no band arm)". On a phone
`clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` does floor-pin at `1.618rem`, so the ratio *should* be
exactly 1 — and `tan(atan2(1rem,1rem))` is exactly the WebKit case that returns **1.619775**.
Measured, iPhone 14 (390×664), `/#/gradient`, scrolled 200px:

```
===== webkit(iPhone 14) =====
  REST : transform matrix(1, …)         titleRect {w:324,   h:27.2, right:357}   headerRect {w:356, h:69}
  STUCK: transform matrix(1.619775, …)  titleRect {w:524.8, h:44,   right:557.8} headerRect {w:356, h:69}
===== chromium(Pixel 7) =====
  REST : matrix(1, …)  STUCK: matrix(1, …)   ← the designed no-op, correctly
```
(`probe-04-mobile-inversion.mjs`)

The `<h3>` box grows 324→524.8px inside a 356px header in a 390px viewport, with
`transform-origin: left top` throwing the growth down-and-right over the pane's controls.
`shot-webkit-mobile-gradient-scrolled.png` (committed here) shows the outcome: **"Gradient" at 1.62×
paints straight through the TYPE / SPACE / HUE select row** — the Linear select reads "Lin" with
glyph strokes cut through it, the OKLCH select reads "OK" likewise, and the third select is
overprinted. Three live controls made unreadable, on the primary mobile browser, by scrolling.

The `@supports (animation-timeline: scroll())` gate the comment cites as protection (`:138-139`,
"atan2: Chromium 111+ ⊂ SDA engines") is not protection: this WebKit build satisfies that condition
— the animation demonstrably runs — while getting `atan2` wrong. The assumption "SDA support implies
correct atan2" is false by measurement.

**Cure (KISS; strictly less machinery than the defect).** CSS-values-4 permits `<length> / <length>`
→ `<number>` directly; no trigonometry, and it is correct in both engines:

```css
--pane-title-shrink-ratio: calc(var(--type-heading) / var(--type-display-1));
```
```
webkit   : CURE-A calc(1.618rem / 2.618rem) -> matrix(0.618029, …)    calc(1rem / 1rem) -> matrix(1, …)
chromium : CURE-A calc(1.618rem / 2.618rem) -> matrix(0.618029, …)    calc(1rem / 1rem) -> matrix(1, …)
```
This deletes the `tan`/`atan2` contrivance, deletes the `@supports`-implies-correct-`atan2` argument
in the comment, restores the phone no-op exactly, and preserves the fluid-clamp property the
closed-form was chosen for. It is a one-line replacement at `PaneHeader.vue:140-142`.

---

## C-2 · MAJOR — MT-F023 adopted; the root's *cure* is right, its *mechanism* is understated.

I adopt the root's disposition verbatim: **structure, not gate** — move the three declarations at
`PaneHeader.vue:177-194` inside `@media (prefers-reduced-motion: no-preference)`. I confirm the
observable independently (`probe-01`: under `reducedMotion: reduce`, WebKit still scrubs
1 → 0.310808 and the veil 0.52 → 1; Chromium still 1 → 0.618029 — identical to `no-preference` to
the last digit, on both engines).

I refine the mechanism, because the root's version is falsifiable and the truer one is stronger.
The root states the animations are "STRUCTURALLY unreachable by the global guard … because a
scroll-driven animation has `animation-duration: auto` and the guard only overrides
`animation-duration`". The first clause is wrong: **the guard reaches the property fine.**

```
webkit    rm=no-preference  title {"duration":"auto",      "timeline":"--pane-scroll", …}
webkit    rm=reduce         title {"duration":"0.00001s",  "timeline":"--pane-scroll", …}
chromium  rm=no-preference  title {"duration":"auto",      "timeline":"--pane-scroll", …}
chromium  rm=reduce         title {"duration":"1e-05s",    "timeline":"--pane-scroll", …}
```
(`probe-09-prm-mechanism.mjs`; `animations.css:186` computes onto the element in both engines)

The guard sets `animation-duration: 0.01ms` successfully — and **both engines ignore a time-valued
`animation-duration` when `animation-timeline` names a progress-based timeline**, because the
effect's progress is derived from the timeline, not from elapsed time. So the defect is not that the
guard's reach is *too narrow*; it is that duration-based neutralisation is **categorically incapable**
of reaching any scroll- or view-driven animation. No widening of `animations.css:184-192` can ever
fix this class. That makes the root's "STRUCTURE not gate" ruling not merely preferable but the only
available cure — a strictly stronger argument than the one it was issued with.

**The cure is the design system's own idiom, not an invention.** glass-ui 7.0.0 wraps every one of
its scroll-driven animations in exactly the nesting the root prescribes — PRM outside, `@supports`
inside — at four sites:

- `dist/styles/scroll-driven.css`: `@media (prefers-reduced-motion: no-preference) { @supports (animation-timeline: scroll()) { … .scroll-progress … } }`
- `dist/styles/scroll-driven.css`: same nesting around `[data-scroll-reveal] > *`
- `dist/styles/scroll-choreography.css`: same nesting around `.scroll-cascade > *`
- `dist/styles/scroll-choreography.css`: `@media (prefers-reduced-motion: no-preference) { .scroll-pin-stage .scroll-pin-phase-* … }`

PaneHeader has the `@supports` half and, at `:148-151`, an argument for omitting the PRM half ("A
scroll SCRUB is position-mapped, not time-based motion, so it needs no PRM gate"). The design system
it consumes contradicts that argument in code, four times. Under edict 4 the producer idiom governs.
Adopting it also puts the base state on the reduce path unchanged — `from`-state = base-state is
already true here (verified in C-negatives below), so the cure costs nothing at rest.

I do **not** weaken this into another override stacked on the blunt guard.

---

## C-3 · MAJOR — the collapse reclaims ZERO scrollport, and leaves a 92px pointer-opaque dead band.

The choreography is compositor-only by design (`:145-157`, the F3 layout fork "is RETIRED"). The
consequence is not stated anywhere in the file: `transform` and `opacity` do not affect layout, so
**the sticky header's reserved height never changes.** Measured on `/#/`, WebKit, 1440×900:

```
[0] headerH 136.59 -> 136.59   titleRectH 91.91 -> 28.57   descOp 1 -> 0   descRectH 18.69 -> 18.69
```
(`probe-01`; Chromium identically `136.64 -> 136.64`)

So after the full 120px scrub the header still eats 136.6px of a 900px scrollport while displaying
28.6px of title and a fully transparent description that still occupies its 18.7px box:

```
{ "headerH": 136.6, "viewportH": 900, "titleBottom": 148.6,
  "descWrap": { "top": 213.9, "h": 18.7 },
  "deadBandPx": 92, "deadBandPctOfViewport": 10.2 }
```
(`probe-05-deadband.mjs`) — 65.3px of pure void between the shrunken title and the invisible
description, then 18.7px of invisible description. **92px = 10.2% of the viewport**, permanently.
Chromium: 63.8px / 7.1%.

And the band is not inert. Sampling `elementFromPoint` down the header's centre column, every point
from the title's underside to the header's bottom edge returns the header:

```
y=151 DIV.pane-header   y=163 DIV.pane-header   y=175 DIV.pane-header   y=187 DIV.pane-header
y=199 DIV.pane-header   y=211 P.pane-header-desc  y=223 P.pane-header-desc  y=235 DIV.pane-header
```
`inHeader: true` at all eight sample points. The user sees pane content through a translucent band
(C-4) and cannot click any of it — including through the *invisible* `<p>` at `opacity: 0`, which is
still the hit-test winner at y=211 and y=223.

A "shrink" whose entire purpose is to give scrollport back gives back nothing and takes 92px of
click surface. **Cure:** the choreography needs one layout channel to be honest. The KISS form that
keeps the compositor arm is to animate the header's own reserved space via a single
`grid-template-rows` or `padding-block-end` channel on the *header* (one box, one property, not the
retired three-channel per-frame fork on title font-size), or — better and cheaper — collapse the
description's *box* instead of only its opacity by animating `.pane-header-desc-wrap`'s
`grid-template-rows: 1fr → 0fr`, and let the title's scale ride a matching `margin-block-end`
reduction. Either way the gate that currently blesses the state (O-11 gate 4, "the layout track is
FLAT") must be reformed to bound layout *per scrub* rather than forbid it, or it will veto the cure.

---

## C-4 · MAJOR — O-11 gate 3's "double-exposure cure" is measured on the wrong quantity.

`o11-header-gates.spec.ts:154` asserts `at64.opacity === 1` and calls that the F2 double-exposure
cure. `opacity: 1` of a 65%-alpha fill is not opacity. At the "swell complete" state the veil's
composited material is:

```
light {"animOpacity":"1","bg":"color(srgb 0.994 0.96 0.926 / 0.65)","backdrop":"blur(7px) saturate(1.4)"}
dark  {"animOpacity":"1","bg":"color(srgb 0.2074 0.165013 0.1326 / 0.72)","backdrop":"blur(7px) saturate(1.3) brightness(1.14)"}
```
(`probe-06-veil-alpha.mjs`) — **35% (light) / 28% (dark) of the scrolled content transmits through**,
behind only a 7px blur. `shot-webkit-desktop-about-scrolled300.png` (committed) is the outcome on
About at scroll 300: inside the 136.6px band, the `<h2>` "Basic Information" and the rows
"Dependency: Device-independent" and "White Point: Variable (typically D50 or D65)" are plainly
legible, and the 0.311× title "About the color spaces, Lab" is overprinted directly across them.
Two type layers, one band — the double exposure the gate certifies as cured.

Gate 3 is therefore green on a quantity (the animation's `opacity` sub-property) that is not the
quantity the gate exists to bound (perceptual occlusion of underlying ink). **Cure:** the gate must
read the *composited* result — a pixel sample of a known glyph inside the band versus the same glyph
outside it — not `getComputedStyle(el,"::before").opacity`. The design cure is orthogonal: the band
either needs opaque material where ink collides (raising `--glass-bg-resting`'s alpha only under the
stuck state is a per-instance override and forbidden by edict 5), or it needs C-3's real collapse so
there is no 92px band for content to sit inside.

---

## C-5 · MAJOR — `contain: layout style paint` is imposed on nine sibling pane roots, for a stated reason that is not how the feature works, and it traps `position: fixed`.

`PaneHeader.vue:54-57` emits a **global, unscoped** rule onto a class it does not own —
`.pane-scroll-fade` lives on the root of nine sibling pane Cards (BrowsePane, PalettesPane,
AdminPane, AboutPane, MixPane, GradientPane, GeneratePane, ExtractPane, ConfigSliderPane):

```css
.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }
```

The comment at `:50-53` justifies the containment: *"`contain: layout style paint` isolates the named
scroll-timeline so PaneHeader animations respond to THIS pane's scroll only, not portal-triggered
layout shifts in ancestor containers."* That is not what `contain` does. Named scroll-timeline
lookup resolves to the nearest ancestor that *declares* the name; the property that scopes timeline
names is `timeline-scope`, and `contain` has no role in it.

**Control experiment.** Strip containment at runtime and re-measure the animation:

```
webkit   (B) contain:none  REST  {"contain":"none","titleTf":"matrix(1, 0, 0, 1, 0, 0)","veil":"0.52"}
webkit   (B) contain:none  STUCK [{"titleTf":"matrix(0.310808, …)","veil":"1"}]  fixed-at-0,0 lands at {"fixedTop":0,"fixedLeft":0}
chromium (B) contain:none  STUCK [{"titleTf":"matrix(0.618029, …)","veil":"1"}]  fixed-at-0,0 lands at {"fixedTop":0,"fixedLeft":0}
```
(`probe-08-taptarget-and-contain.mjs`) — the veil and the shrink land on **byte-identical values**
with containment removed. The declaration is not load-bearing for its stated purpose.

**What it does do** is make every pane a containing block for `position: fixed` descendants. A
probe element with `position:fixed; top:0; left:0` appended inside a live pane:

```
#/admin/users  fixedTrap {"fixedTop":234,"fixedLeft":200,"hostTop":233,"hostLeft":199,"contain":"content"}
#/             fixedTrap {"fixedTop":104,"fixedLeft":730,"hostTop":103,"hostLeft":729,"contain":"content"}
```
(`probe-07-misc.mjs`) — the fixed element lands on the host's content-box origin (host + 1px border),
not the viewport. Any `position: fixed` descendant of any pane — a non-teleported dialog, a
floating-panel fallback, a fixed tooltip — is silently mispositioned by the pane's page offset **and**
clipped by `contain: paint`. It is a latent trap on nine surfaces, planted by a leaf component, on a
false rationale. `getComputedStyle` serialises the shorthand as `contain: "content"`, confirming all
three of `layout style paint` are in force.

Producer precedent for the right shape: glass-ui's own sticky scroll stage takes
`.scroll-pin-stage { position: sticky; inset-block-start: 0; contain: layout paint; }`
(`scroll-choreography.css`) — narrower (`no style`), and on a stage the producer owns, not on nine
consumers' roots.

**Cure:** delete `contain` from `:55` (measured non-load-bearing); the `overflow-y:auto /
overflow-x-hidden` already on all nine consumers provides the paint clip they actually rely on. If
timeline *scoping* is genuinely wanted, `timeline-scope` is the property that provides it. The
remaining single-declaration `scroll-timeline` rule is a producer-shaped concern and belongs in
glass-ui beside `scroll-driven.css` under edict 4, not in an unscoped `<style>` block inside a leaf
consumer component.

---

## C-6 · MAJOR — a11y: the pane's primary title is a hardcoded `<h3>`; the app has ZERO `<h1>`, and on About the `<h3>` precedes its own `<h2>` children.

`PaneHeader.vue:21` is `<h3 class="pane-header-title font-display"><slot /></h3>` — the level is a
literal, with no prop, on the component that renders **the largest text on every pane** (the file's
own comment at `:12-14`: "the pane title speaks the DISPLAY voice — the ONE site; all 9 panes
inherit").

The mega-tranche visual audit already measured the first half: the `h1` column is **0 in all 60
captures** (`visual/REPORT.md:119-178`) — four matrices × fifteen routes, not one `<h1>` anywhere. I
confirm live and add the outline. `/#/`, document order (`*` = PaneHeader's):

```
H3  H3*  H2 H2 H2 H2 H2 H2  H3 H3  H2  H3 H3 H3  H2  H3 H3  H2  H3 H3  H2
```
(`probe-01`) — the pane's own title, `H3* "About the color spaces, Lab"`, is followed by its own
section headings at `H2`. **The pane title is a lower level than its children.** The outline is
inverted, and there is no `h1` or `h2` above it to be a child of. That is `heading-order` +
`page-has-heading-one` (WCAG 1.3.1) with PaneHeader as the proximate cause on all nine panes.

Secondary, same site: consumers slot **non-title content into the heading**.

```
#/            "About the color spaces, Lab"  childEls: ["BUTTON.bg-transparent"]
#/admin/users "Users 0"                      childEls: ["DIV.badge-atom"]
```
(`probe-07-misc.mjs`) — an interactive `<button>` nested inside an `<h3>` (see C-7 for its geometric
consequence), and a live count `<Badge>` folded into the heading's accessible name, so the name
mutates on every data refresh. `e2e/smoke/admin/admin-walk.spec.ts:73-77` already carries a
`.first()` workaround for heading ambiguity on these routes — the test suite is compensating for the
component's shape.

**Cure:** give PaneHeader a `level` prop resolving to a dynamic tag (`<component :is="\`h${level}\`">`),
default `1` for a pane's primary title, and give it a dedicated named slot for adornments
(`#adornment`) rendered as a *sibling* of the heading, not a child, so the accessible name is the
title alone. Both are two-line changes inside the component; neither adds a wrapper component or a
shared directory (edict 3).

---

## C-7 · MAJOR — the shrink scales slotted interactive content: the About color-space control drops to 27.6 × 14.9 px on Safari.

`pane-title-shrink` applies `transform: scale()` to the `<h3>`, so everything a consumer slots into
the title scales with it — including AboutPane's color-space `<button>` (C-6). Measured on `/#/`,
1440×900, rest → scroll 300:

```
===== webkit =====
  REST : {"name":"Lab","w":88.6,"h":47.9,"wcag258_24px":true,  "titleTf":"matrix(1, …)"}
  STUCK: {"name":"Lab","w":27.6,"h":14.9,"wcag258_24px":false, "titleTf":"matrix(0.310808, …)"}
===== chromium =====
  REST : {"name":"Lab","w":88.6,"h":48,  "wcag258_24px":true,  "titleTf":"matrix(1, …)"}
  STUCK: {"name":"Lab","w":54.8,"h":29.6,"wcag258_24px":true,  "titleTf":"matrix(0.618029, …)"}
```
(`probe-08-taptarget-and-contain.mjs`)

On Safari a live control shrinks to **14.9px tall** — under the 24×24 minimum on both axes (WCAG 2.5.8
Target Size (Minimum), AA). This is **PaneHeader's contribution to the audit's smallTapTargets
count, and the static capture cannot see it**: `REPORT.md:33` records `/#/: 8` small targets measured
at scrollTop 0, where this button is a compliant 88.6 × 47.9. Scroll the pane and it becomes 9. The
count is understated on every scrollable route by exactly the controls consumers slot into the title.
Note the compounding: C-1's 0.311 makes this a failure; the designed 0.618 (Chromium) does not fail —
so fixing C-1 also lifts this back over the bar, but only by 5.6px of margin, which the next type-rung
change can spend.

**Cure:** the scale must not reach interactive descendants. Moving the shrink off the `<h3>` box onto
a text-only inner span, or driving the collapse with `font-size` on a `@property`-registered scalar
rather than a box `transform`, both keep the control at its rest geometry. The C-6 adornment slot
(sibling, not child) removes the AboutPane and AdminPane cases structurally.

---

## C-8 · MAJOR (vacuous gate) — O-11 gate 5 passes identically under the defect and under the cure; nothing anywhere asserts the shrink ratio; the oracle never runs on WebKit.

`e2e/smoke/oracles/o11-header-gates.spec.ts:278-348` is titled *"engine/PRM coherence: rest state
identical under PRM"*. What it does:

1. read the veil at `scrollTop 0` (`readVeils`, `:40-55` — no scroll);
2. `emulateMedia({ reducedMotion: "reduce" })`, reload, read the veil at `scrollTop 0` again;
3. assert the two rest opacities are equal (`:306-308`);
4. walk stylesheets asserting every `--pane-scroll` binding sits inside `@supports` (`:315-347`).

`scrubTo` exists in the file (`:59-73`) and is used by gate 3 — **gate 5 never calls it.** The PRM
branch is never scrubbed. Consequence:

- **Mutation that keeps it green: the shipped state.** No PRM handling exists; the animation runs at
  full amplitude under `reduce` (C-2); gate 5 is green.
- **Mutation that also keeps it green: the cure.** Wrap `:177-194` in
  `@media (prefers-reduced-motion: no-preference)` and step 3 still compares 0.52 to 0.52 (the base
  state is the `from` state), and step 4's walk still finds every binding `@supports`-gated. Green.

A gate that returns the same verdict for the defect and its fix decides nothing. It is not a weak
gate; it is a tautology wearing the name of the property it fails to test.

Compounding coverage holes, all verified:

- **No gate asserts the title scale, the shrink ratio, or the header's height.** Grep across `e2e/`
  and `test/` for `pane-title-shrink|shrink-ratio|pane-desc-shrink|pane-header-veil` returns **zero
  hits**; `.pane-header-title` appears only in `o14-preview-truth.spec.ts:220,311,316` (ramp text)
  and `o10-type-locks.spec.ts:67` (About title font metrics). Mutation that keeps every gate green:
  set `--pane-title-shrink-ratio: 0.05`. O-11 gate 4 inspects only the *property names* inside the
  `pane-*` keyframes (`:176,184` — `new Set(["transform","opacity"])`), never their values.
- **The oracle is Chromium-only.** `o11-header-gates.spec.ts` lives in `e2e/smoke/oracles/`, which is
  the `smoke` project — `browserName: "chromium"` (`playwright.config.ts:143-160`). The WebKit
  project `smoke-safari` has `testDir: "./e2e/smoke/safari"` (`:252-256`), a different subtree. **The
  entire C-1 divergence class is structurally unreachable by the suite as configured**, on the very
  engine the config's own comment (`:240-247`) says the project exists to catch ("iOS-Safari class
  bugs … WebKit shader-compile divergence").
- **Zero unit coverage.** `grep -rln "pane-header\|PaneHeader" test/` → no files.

**Cure:** gate 5 must scrub under `reduce` and assert the stuck state equals the rest state (that is
the property its title claims). Add a gate asserting `--pane-title-shrink-ratio` resolves to
`--type-heading / --type-display-1` within 1e-4 **and** that the stuck title's rendered box is never
larger than its rest box — one assertion that would have caught C-1 on both engines. And the header
oracle needs a WebKit arm: either widen `smoke-safari`'s `testDir` to include `oracles/`, or add a
`smoke-safari-oracles` project. Without the WebKit arm the new ratio gate would still have missed
C-1 entirely.

---

## C-9 · MINOR — the faded description stays in the accessibility tree, keeps its box, and wins the hit test.

`pane-desc-shrink` (`:214-223`) drives `opacity: 1 → 0`. `opacity: 0` removes nothing from the
accessibility tree and nothing from hit testing. Measured stuck: `descOp "0"`, `descRectH 18.69`
unchanged (`probe-01`), and `elementFromPoint` returns `P.pane-header-desc` at y=211 and y=223
(`probe-05`). A screen reader still announces "The math, the science, the art, the beauty of color
spaces." while it is invisible; a pointer still hits it; text selection still grabs it.

**Cure:** the C-3 box collapse (`grid-template-rows: 1fr → 0fr` on `.pane-header-desc-wrap`) fixes
all three at once — it removes the box, the hit target, and the a11y-tree entry together, and
replaces the opacity keyframe rather than adding to it.

---

## C-10 · MINOR — three load-bearing rationale comments are false, and the shorthand omits the duration the producer writes explicitly.

The file is 185 of 224 lines comment and CSS prose. Prose that asserts verified-sounding falsehoods
is worse than no prose, because it is what the next reader audits against instead of the engine.
Three are measurably false:

| line | claim | measured |
|---|---|---|
| `:50-53` | `contain` "isolates the named scroll-timeline" | non-load-bearing; identical animation values with `contain:none` (C-5) |
| `:136-138` | on phones the ratio "degenerat[es] to exactly 1 … the shrink self-neutralizes" | iOS Safari: **1.619775**, a 62% enlargement (C-1b) |
| `:148-151` | "A scroll SCRUB … needs no PRM gate … under PRM the rest state is byte-identical" | the *stuck* state is byte-identical too — the animation runs at full amplitude under `reduce` (C-2); glass-ui gates all four of its own (C-2) |

Also `:179, :185, :190` write `animation: <name> linear both` with the duration omitted, relying on
`animation-duration`'s initial `auto`. The producer writes it explicitly —
`animation: gl-scroll-grow auto linear` (`scroll-driven.css`) — and `auto` is precisely the value
the global guard overwrites (C-2), so leaving it implicit hides the interaction. Match the producer.

---

## C-11 · INFO — the prop contract leaks contrivance into a consumer.

`demo/scenes/ConfigSliderPane.vue:107`:

```vue
<PaneHeader v-bind="description !== undefined ? { description } : {}">{{ title }}</PaneHeader>
```

For an optional prop, `:description="undefined"` and omitting the attribute are identical in Vue —
the ternary is a no-op guarding nothing, and it is the only consumer of nine that does this. It reads
as a defensive reflex against `PaneHeader.vue:22`'s `v-if="description"`, which is itself loose:
`description=""` renders nothing (fine) but `description=" "` renders an empty caption `<p>`.
`<slot />` at `:21` likewise has no fallback, so a consumer passing an empty title yields
`<h3></h3>` — an `empty-heading` violation. `ConfigSliderPane`'s `title: string` is required so it
cannot reach that state today; nothing in PaneHeader prevents it.

**Cure:** tighten the guard to `v-if="description?.trim()"` and the consumer's ternary collapses to
`:description="description"`. (Consumer file — noted for the wave that owns it, not editable here.)

---

## Negative proof — what I attacked and could not break

The challenge premise directed me at a specific hazard list. Most of it is **structurally
inapplicable** to this component, and I record that as measured, not assumed. The entire
`<script setup>` is three lines (`:34-38`): one `defineProps<{ description?: string }>()`. There is
no `defineModel` (so no `WritableComputedRef` stale-read hazard and no `shallowRef` cache needed),
no `ref`/`watch`/`computed`, no lifecycle hook, no `addEventListener`, no `requestAnimationFrame`
(so no PRM-RAF site — the constellation epidemic does not reach here), no `ResizeObserver` /
`IntersectionObserver` / `MutationObserver`, no timer, no async, no `fetch`, no WebGL, no
`parseCssColor` or any parse, no `ValueUnit` construction, no reka-ui primitive and therefore no
pointer-capture leak. There is nothing to leak, nothing to grow unboundedly, and no error path to
drive — I read the whole file to confirm. `verbatimModuleSyntax` is trivially satisfied: zero imports.

Four substantive properties I tried to falsify and could not:

1. **The rest state really is engine- and PRM-invariant.** Veil `0.52` and title `matrix(1,0,0,1,0,0)`
   at `scrollTop 0` across all eight cells of {webkit, chromium} × {reduce, no-preference} × routes
   (`probe-01`). O-11 gate 1's floor claim holds by measurement: `0.52 ∈ [0.45, 0.65]` on every pane
   probed, both schemes (`probe-06`).
2. **The inactive-timeline fallback is correct.** On hosts that do not overflow (`#/mix`,
   `#/admin/users`, and the second header on `#/gradient`) the animation is inactive and the element
   paints the base state — `transform: none`, veil `0.52`, desc `opacity 1` — not a half-applied
   `fill: both` frame. The `from`-state = base-state construction the file rests on is real, which is
   exactly why C-2's cure is free at rest.
3. **The keyframes really are compositor-only.** `:196-223` declare only `opacity` and `transform`.
   The retired F3 layout fork is genuinely dead; O-11 gate 4's structural half is sound (its live
   half's ≤5-Layout bar is what C-3's cure must renegotiate, not evade).
4. **Vue's scoped-CSS keyframe mangling works.** Computed `animation-name` is
   `pane-title-shrink-19daabcf` (`probe-09`) — the scoped `@keyframes` and the scoped
   `animation-name` reference are rewritten consistently, and `--pane-veil-rest` / 
   `--pane-title-shrink-ratio` inherit into `::before` and the title correctly. No cross-pane bleed.

Two REPORT rows I checked and will **not** charge to this component:

- `consoleErrors — 1` (`REPORT.md:17`, `safari-desktop-light /#/: WebGL: context lost`) is GooBlob's,
  not PaneHeader's. `pageErrors — 0`, `blankOrNearBlank — 0`, `darkClassMissing — 0`,
  `mainCountNotOne — 0` — clean, and PaneHeader contributes zero `namelessButtons` of its own (the
  one `<button>` inside its slot is named "Lab").
- `horizontalOverflow — 0` (`REPORT.md:19`) is a **masked** pass, not a clean one. C-1b overgrows the
  title's box to 524.8px inside a 356px header; it produces no document overflow only because every
  consumer carries `overflow-x-hidden` and C-5's `contain: paint` clips it. Remove either and the row
  turns red. Recording this so the next seat does not read that zero as evidence of soundness.

---

## Family grouping

Ten of the twelve findings reduce to **three** mechanisms, which is how the cures should be waved:

- **M-A · a scroll-driven choreography built on unverified engine behaviour** — C-1 (WebKit `atan2`),
  C-2 (PRM unreachable by duration), C-10 (the comments that asserted both were safe). One root
  cause: the design reasoned from spec text and from Chromium, and never measured WebKit or `reduce`.
  Cured together by the producer idiom (PRM-outside-`@supports`) plus the length-ratio `calc`.
- **M-B · a transform-only collapse asked to do a layout job** — C-3 (zero scrollport reclaimed, 92px
  dead band), C-4 (the band is translucent so content shows through it), C-7 (the scale reaches
  interactive descendants), C-9 (the box and a11y entry survive `opacity: 0`). One root cause: the F3
  retirement removed the layout channel without replacing what it did. Cured by one honest box
  collapse plus taking the scale off the interactive box.
- **M-C · a leaf component legislating for surfaces it does not own** — C-5 (`contain` on nine
  sibling roots via an unscoped block, on a false rationale), C-6 (a literal `<h3>` and an
  adornment-bearing heading slot forced on nine panes), C-11 (the prop contract producing consumer
  contrivance). Cured by narrowing the component's writ: a `level` prop, a sibling adornment slot,
  delete `contain`, and relocate the `scroll-timeline` producer concern to glass-ui (edict 4).

C-8 sits across all three: it is the reason none of the ten was caught.

---

## Disposition summary

| id | severity | one line | cure shape |
|---|---|---|---|
| C-1 | **BLOCKER** | WebKit `tan(atan2(<rem>,<rem>))` deg→rad bug; iOS title *grows* 1.62× over live controls | `calc(var(--type-heading) / var(--type-display-1))` — verified both engines |
| C-2 | MAJOR | MT-F023 adopted; guard is *categorically* incapable, not merely narrow | wrap `:177-194` in `@media (prefers-reduced-motion: no-preference)` — glass-ui's own idiom, ×4 |
| C-3 | MAJOR | collapse reclaims 0px; 92px pointer-opaque dead band (10.2% of viewport) | one honest box channel; renegotiate O-11 gate 4's bar |
| C-4 | MAJOR | "double-exposure cured" measured on `opacity`, not composited alpha (0.65/0.72) | gate on pixels; C-3 removes the band |
| C-5 | MAJOR | `contain` on 9 sibling roots, false rationale, traps `position: fixed` | delete it (measured non-load-bearing); `timeline-scope` if scoping wanted |
| C-6 | MAJOR | literal `<h3>`, zero `<h1>` in 60/60 captures, inverted outline on About | `level` prop + sibling `#adornment` slot |
| C-7 | MAJOR | slotted `<button>` scales to 27.6×14.9 on Safari (WCAG 2.5.8 fail) | scale text only, not the box |
| C-8 | MAJOR | gate 5 green under both defect and cure; ratio unasserted; oracle Chromium-only | scrub under `reduce`; assert the ratio; give the oracle a WebKit arm |
| C-9 | MINOR | `opacity: 0` desc keeps box, hit target, a11y entry | folded into C-3's collapse |
| C-10 | MINOR | 3 false rationale comments; implicit `auto` duration | correct the prose; write `auto` like the producer |
| C-11 | INFO | consumer no-op ternary; loose `v-if`; no slot fallback | `v-if="description?.trim()"` |
| C-12 | INFO | work-order HEAD `c654824e` ≠ actual `80fc5c40` | record the substrate |

**Strongest defect: C-1.** It is a shipping, user-visible, cross-engine failure on the primary mobile
browser — three controls made unreadable by scrolling — caused by a contrivance whose replacement is
shorter, simpler, and measured correct in both engines. It is also the cleanest indictment of C-8:
one assertion on a single computed custom property, run once on WebKit, would have caught it at
T.W4-1 and never let it ship.
