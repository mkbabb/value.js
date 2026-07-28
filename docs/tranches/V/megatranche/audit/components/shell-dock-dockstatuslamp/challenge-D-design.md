# CHALLENGE-D — `demo/shell/dock/DockStatusLamp.vue` · the design is flawed

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with, declared, not inherited.

---

## 0. Verdict

**DEFECTIVE.** The lamp is not a designed instrument; it is the `ApiOfflineChip` register
photocopied out of its substrate and pinned to the far corner of the dock band, where the substrate
it was designed against does not exist. Every consequence follows from that one transposition
error: measured **1.79:1** ink contrast in light and **1.38:1** in dark (AA floor for 11px text is
4.5:1); a chip surface that is **1.11:1** against the field it sits on, i.e. no surface at all; an
interval to its own protagonist that swings **56 → 429 px at one viewport** as the dock breathes;
and a `role="alert"` that is **literally empty** below 1024px.

The component's own doc-comments assert the opposite of what it does, four times over. That is the
tell: the design was reasoned in prose and never looked at.

**Strongest defect: D-1/D-2 (one mechanism).** The loud, dev-blocking `misconfigured` alert —
the one face that actually ships on every `npm run dev:web-only` session — renders at **1.79:1 /
1.38:1** and is, in the literal sense, invisible. See `frames/band-1440-light.png`.

---

## 1. Method and evidence base

| Source | What it gave |
|---|---|
| `docs/tranches/V/megatranche/audit/visual/REPORT.md` + `shots/**` (60 Safari captures, 4 matrices × 15 routes) | The lamp is **absent from every single one** (D-12) |
| `shots/forced-colors-desktop/picker.png`, `shots/rtl-desktop/picker.png` | Also absent |
| Live dev server `http://localhost:9000`, Playwright, 2026-07-27 | The lamp **is live right now** in the `misconfigured` variant — all geometry/computed-style/pixel numbers below |
| Own PNG decoder over element + band screenshots (`scratchpad/png3.mjs`, pure `zlib`) | Every contrast number below is measured from rendered pixels, not from tokens |
| `docs/tranches/V/{VISUAL-CONSTITUTION,PROPORTION-AUDIT}.md`, `coordination/INBOX.md` O-10 | The binding law + the already-relayed corroboration |

Live state at probe time (`getComputedStyle` / `getBoundingClientRect`, viewport 1440×900):

```
variant   = "misconfigured"      role = "alert"
color     = rgb(219, 36, 36)     background = oklab(0.574 0.192 0.100 / 0.12)   ← 12% ALPHA
border    = 1px solid oklab(0.574 0.192 0.100 / 0.55)
backdrop-filter = none           position = absolute      z-index = auto
font-size = 11px  font-variant-caps = small-caps  letter-spacing = 0.66px
dot       = 6.398px, animation "2.4s cubic-bezier(0.4,0,0.2,1) infinite lamp-dot-pulse-45530b34"
--type-mono-caption resolves to ""   ← the token does not exist
```

Frames written beside this file in `frames/`.

---

## 2. Findings

### D-1 · BLOCKER — the `misconfigured` face is illegible: measured 1.79:1 (light) / 1.38:1 (dark)

**Evidence.** Band screenshots at 1440×900, decoded pixel-wise over the glyph rows of the chip
(`frames/band-1440-light.png`, `frames/band-1440-dark.png`):

```
band-1440-light.png   glyph core L=0.1645   chip fill L=0.3333   CONTRAST = 1.79:1
band-1440-dark.png    glyph core L=0.2262   chip fill L=0.3315   CONTRAST = 1.38:1
```

WCAG 2.2 SC 1.4.3 floor for 11px text is **4.5:1**. Light misses by 2.5×; dark by 3.3×.
Element-only crops agree (`frames/lamp-1440-{light,dark}.png`, 1.19:1 / 1.17:1 — lower still,
because the crop excludes the pill's brightest fill).

**Mechanism.** `DockStatusLamp.vue:92` sets ink to `var(--destructive)` = `hsl(0 72% 50%)` and
`:98-102` sets the fill to **12% destructive over nothing**. The lamp has `backdrop-filter: none`
and no opaque backing, so the composite substrate is the ambient aurora field — which
`VISUAL-CONSTITUTION.md §2` defines as *"low-frequency active-color atmosphere · chromatic from
frame zero"*, i.e. **the user's own color**. The default seed is warm; red ink on a red-shifted
field is self-camouflage. There is no contrast floor anywhere in the design, and none is
computable, because the substrate is user data.

**Law breached.** `VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their
rendered contrast on the actual material tier; a token name is not evidence."* The lamp is the
purest instance of the failure that sentence was written against.

**Cure.** §4 below (the transposition). Not a color tweak: any red survives only against a known
neutral substrate, which this seat does not have.

---

### D-2 · BLOCKER — the chip has no material presence: 1.11:1 (light) / 1.06:1 (dark) against the field behind it

**Evidence.** Same frames, chip interior vs. ambient field 30–100px to its left:

```
light:  chip interior median rgb(240,123,84) L=0.3333   field median rgb(244,136,92) L=0.3761
        chip-fill vs adjacent field CONTRAST = 1.112:1
dark:   chip interior median rgb(241,121,92) L=0.3315   field median rgb(242,129,95) L=0.3540
        chip-fill vs adjacent field CONTRAST = 1.059:1
```

**Mechanism — the root of this whole report.** `ApiOfflineChip.vue` lives *inside* a palette
card: an opaque **specimen well** (`VISUAL-CONSTITUTION §2` tier 4). There, a
`color-mix(--background 55%, transparent)` film sits on a known neutral card and reads as a real
chip. `DockStatusLamp.vue:60` copies that exact declaration onto the **ambient field** (tier 1).
The register was transposed; its substrate was not. What is left is a 1px hairline with a
1.11:1 tint inside it — an outline drawn on the sky.

`VISUAL-CONSTITUTION §2` also states *"Dark chrome uses the restrained neutral pole."* In dark the
lamp is a red hairline on a salmon field (`frames/band-1440-dark.png`); the scheme switch changes
`--background`/`--foreground`/`--destructive`, none of which describe the thing actually behind the
chip. **The component's dark-mode treatment is inert by construction.**

---

### D-3 · BLOCKER — below 1024px the lamp is a `role="alert"` with an empty accessible name; the comment claiming otherwise is false

**Evidence.** Live, viewport 390×844:

```
role              = "alert"
aria-label        = null
textContent       = "dev misconfigured — run `npm run dev`"
innerText         = ""            ← rendered text: NONE
labelDisplay      = "none"
lampRect          = [348, 43, 26, 18]   (26 × 18 CSS px)
```

`DockStatusLamp.vue:64-69` — the CSS is `.lamp-label { display: none }`. The comment three lines
above it reads:

> *"The role + label stay in the accessibility tree (visually-hidden, not v-if'd)."*

`display: none` removes a subtree from the accessibility tree. It is not visually-hidden. The
accname computation excludes non-rendered nodes, the dot is `aria-hidden="true"`, and there is no
`aria-label` — so the mobile lamp is an **assertive live region whose entire content is nothing**.
On every viewport under 1024px the user is shown a 6.4px coloured dot and told nothing, by any
channel.

`VISUAL-CONSTITUTION §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
color-only. Role, accessible name, state/value and associated error/status are explicit."*
Under 1024px this state is **color-only and nameless** — both halves of that sentence, breached.

Visual proof: `frames/band-390.png` — the lamp is a red crescent hugging the viewport edge, 11.9px
from the always-expanded pill, reading as a clipping artifact.

---

### D-4 · MAJOR — the component is a fork of `ApiOfflineChip.vue`, copy string included, and both render at once

**Evidence.** Declaration-level diff of the two scoped style blocks:

```
$ chip decls: 26   lamp decls: 34   byte-identical: 17
align-items / background(×3) / border(×2) / color(×2) / display / font-size
font-variant / gap / height / letter-spacing / line-height / white-space / width
```

Plus, not counted above because only the formatting differs: the two `misconfigured`
`color-mix(... --destructive 55%/12% ...)` rules, and the keyframe itself — `offline-dot-pulse` and
`lamp-dot-pulse` are the same two stops at the same `2.4s var(--ease-standard) infinite`.

And the copy is forked verbatim:

```
demo/shell/dock/status-lamp.ts:54          label: "dev misconfigured — run `npm run dev`",
demo/palettes/browser/status/ApiOfflineChip.vue:17    dev misconfigured — run `npm run dev`
demo/shell/dock/status-lamp.ts:60          label: "backend offline — saved locally",
demo/palettes/browser/status/ApiOfflineChip.vue:25    backend offline — saved locally
```

Both read the same `useApiClient().availability` latch. **On `/palettes` with the backend down, the
user is told the identical sentence twice on one screen** — once in the dock band, once in the
palette surface. `status-lamp.ts:8` calls this *"the instrument register the per-surface
`ApiOfflineChip` already speaks"* and `DockStatusLamp.vue:42` calls it *"one status language, two
seats."* There is no shared source: it is one language written down twice, which drifts on the
first edit and duplicates on every render.

**Edicts breached.** #3 KISS/no contrivance (a second implementation where one existed), #4
glass-ui is the design system (a status-chip register hand-rolled twice in `demo/`), #5 root-level
styling. `PROPORTION-AUDIT §5.6`: *"Subtraction precedes explanation."* Register row **PR-06**
(*duplicated action/selection species → **REMOVE***) is exactly this family.

The tranche already knew: T-9 relayed *"the dock status-lamp primitive"* to glass-ui as a Q16
candidate — `docs/tranches/T/letters/GLASSUI-T-COMMUNIQUE-2026-07-11.md:60` and
`GLASSUI-T-ASKS.md:104`. It was never answered, and the demo shipped the fork anyway.

---

### D-5 · MAJOR — the annotation is orphaned: its interval to its own protagonist swings 56 → 429 px at one viewport

**Evidence.** Live at 1440×900, `.glass-dock` rect vs. lamp rect, same page, same second:

| dock state | pill rect | lamp rect | gap pill→lamp |
|---|---|---|---|
| resting (collapsed, the 5s steady state) | `[689.2, 750.8]` w=61.6 | `[1177, 1424]` | **426.2 px** |
| expanded (hover) | `[493.6, 946.4]` w=452.8 | `[1177, 1424]` | **230.6 px** |
| expanded, nav layer, first probe | `[692, 1120.8]` w=428.8 | `[1177, 1424]` | **56.2 px** |

The lamp never moves; the dock does. The relation between annotation and annotated is therefore
**pure residue** — `viewportWidth − dockWidth`, oscillating by 195.6px on every collapse↔expand
morph. Look at `frames/band-1440-light.png`: 426px of empty aurora between the pill and the chip.
Nothing else occupies the right 17.5% of the band. It does not read as dock chrome; it reads as a
second, unrelated widget that happened to land in the same row.

`DockStatusLamp.vue:38-42` claims it *"parks at the band's inline-end … It reads as an instrument
annotation etched into the chrome."* There is no chrome at the band's inline-end to etch into —
the band is a bare grid row over the ambient field. The claim describes a surface that does not
exist at that coordinate.

`PROPORTION-AUDIT §1`: *"Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist."* This element's interval is an accident and its material is
absent. `§5.8`: *"Real rendered relation wins over token intent."*

**Sub-finding (collision, no reservation).** `position: absolute` means the lamp reserves nothing.
The collision threshold is computable and was measured at 1024×768: band width 992, lamp width 247,
so **any dock layer wider than 498.1px overlaps the pill** — measured `collisionPillWidthThreshold
= 498.1`, with the signed-out nav layer at 309px leaving 94.5px of clearance. The dock's expanded
width is content-dependent (measured 258.7 / 282.1 / 309 / 423.7 / 452.8 px across states and
viewports in this one session) and the action-bar/slug-edit layers are wider still. `Dock.vue:124`
asserts the T-31 law makes occlusion *"impossible by construction — grid rows do not overlap"*;
that reasoning covers cards below the band and does not cover an absolutely-positioned child
**inside** row 1. Reproduction for a real overlap requires a wide dock layer at ≤1100px and is
therefore filed as **hypothesis** — but the zero-reservation design is the defect, and it is not.

---

### D-6 · MAJOR — the compaction decision asks the wrong question (viewport width, not available band space)

**Evidence.** `DockStatusLamp.vue:70-74`:

```css
@media (min-width: 1024px) { .lamp-label { display: inline; } }
```

Measured consequence: the lamp is **26.0px** wide at 1023px and **247.0px** wide at 1024px — a
**9.5× step** triggered by a number that describes the window, not the band. At 1024 the lamp then
eats 247 of the 341.5px free to the right of the pill (**72.3%** of all free space on that side);
one pixel narrower it eats 26.

The band's actual constraint is *"is there room beside the pill"*, which depends on the dock's
content width — a quantity the media query cannot see. This is corroborated by the tranche's own
outbound mail, `docs/tranches/V/coordination/INBOX.md:72` (O-10 §A, sent 2026-07-27):

> *"glass's `@container dock` rules in `dock/styles/density.css` are DEAD CODE in any consumer not
> setting `container-name: dock` — verified dead in our tree (count 0; **DockStatusLamp carries a
> wrong-question viewport fallback instead**)."*

`VISUAL-CONSTITUTION §3.7`: *"Spacing is container-scaled from glass-ui tokens. No
desktop-tight/mobile-airy fork and no breakpoint pile."* `.dock-band` (`demo/styles/shell.css:39`)
has no `container-type`, so a container query is not even available today — the cure is structural,
not a query rewrite.

---

### D-7 · MAJOR — an infinite blink with no stop control

**Evidence.** Computed: `animation: 2.4s cubic-bezier(0.4,0,0.2,1) infinite lamp-dot-pulse`, opacity
`1 → 0.35 → 1` (`DockStatusLamp.vue:109-122`). It never terminates and has no pause affordance.

WCAG 2.2 SC **2.2.2 Pause, Stop, Hide**: blinking content that starts automatically, lasts more
than five seconds and is presented in parallel with other content must offer a pause/stop/hide
mechanism. This blinks for the entire session.

`VISUAL-CONSTITUTION §6`: *"Continuous … motion terminates within five seconds or exposes one
persistent keyboard-operable still/pause control whose state is announced and remembered. Paused,
parked and offscreen mean no animation work."* Neither arm is satisfied.

(No flash risk: 0.42Hz, far under the 3Hz threshold. And the `prefers-reduced-motion: no-preference`
gate is correctly authored — that arm is sound, see §3.)

**Sub-finding.** `2.4s` is a raw literal; `var(--ease-standard)` is the only tokenized half. Owner
law #6 requires motion be tokenized, not deleted — this is half-tokenized.

---

### D-8 · MAJOR — `role="alert"` is the wrong register and, in the state it was designed for, announces nothing

**Evidence.** `demo/platform/transport/availability.ts:159-166` — `initApiEnvironment()` sets
`apiAvailability.value = "misconfigured"` **synchronously at client init, before any fetch**. So the
lamp's whole design goal (`DockStatusLamp.vue:3-6`: *"the `misconfigured` state is guaranteed
visible the moment the shell paints"*) means the `role="alert"` node exists in the **initial**
render.

ARIA live regions announce *mutations observed after the region is registered*; a live region
present at first paint is not announced by AT. The lamp therefore delivers, to a screen reader,
exactly nothing in the one scenario it exists for — and below 1024px it would have nothing to
announce anyway (D-3).

Register, separately: `alert` is assertive and interrupting. This state is **permanent,
non-dismissible, never-updating, and dev-only**. `VISUAL-CONSTITUTION §7 (Picker)` states the
house rule for exactly this shape — *"never a routine live region: ordinary text uses
`aria-live="off"`"* — and `§5.1` forbids duplicate live-region echo, which D-4's double render
produces (two live regions, same sentence).

---

### D-9 · MAJOR — small-caps mangles a case-sensitive shell command, and the backticks render as literal glyphs

**Evidence.** `frames/lamp-1440-light.png` / `frames/band-1440-light.png` render:

> ` ● DEV MISCONFIGURED — RUN ˋNPM RUN DEVˋ `

Source string, `status-lamp.ts:54`: `` "dev misconfigured — run `npm run dev`" ``.

Two independent defects in one line:

1. `font-variant: small-caps` (`DockStatusLamp.vue:52`) is applied to the **whole** label,
   including the command. Fira Code has no `smcp` table for this rendering path, so the engine
   synthesizes small caps by scaling capitals: the user is instructed to run **`NPM RUN DEV`**.
   The instruction is case-sensitive; the rendering is wrong; the message's entire job is to be
   actionable.
2. The Markdown backticks are interpolated as text (`{{ lamp.label }}`, line 19) and paint as two
   stray ˋ glyphs. Code is being marked up in a medium that has no markup.

`VISUAL-CONSTITUTION §4` type jurisdiction: *"value, code, or provenance → `text-mono-small` … Fira
Code."* Code inside a caption needs its own run with its own casing, not a caption-wide
`font-variant` sledgehammer.

---

### D-10 · MAJOR — the `unavailable` face fails AA in dark too (computed 4.33:1), and its floor is user data

**Evidence.** The `unavailable` variant could not be forced live (the latch is `misconfigured` on
this host), so this is arithmetic over **measured** inputs — measured tokens from
`getComputedStyle`, measured field pixels from `frames/band-1440-*.png`:

```
light: fill = 0.55·rgb(253,250,244) + 0.45·rgb(244,136,92) = rgb(249,199,176)  L=0.6396
       ink  = 0.72·rgb(28,26,25)   + 0.28·fill            = rgb(90,74,67)     L=0.0752
       CONTRAST = 5.51:1   ·  fill-vs-field = 1.62:1
dark:  fill = 0.55·rgb(11,10,9)    + 0.45·rgb(242,129,95)  = rgb(115,64,48)    L=0.0747
       ink  = 0.72·rgb(233,229,222)+ 0.28·fill             = rgb(200,183,173)  L=0.4903
       CONTRAST = 4.33:1   ·  fill-vs-field = 3.24:1
```

**Dark = 4.33:1, below the 4.5:1 floor for 11px text.** Light passes today only because the
default seed happens to be light; both numbers are functions of the user's color, so the design
has no floor at all — which is the same mechanism as D-1/D-2 wearing a quieter coat.

---

### D-11 · MAJOR — zero rendered witnesses: the component appears in none of the tranche's 60 captures, and its shipping face cannot be rendered by its own gate

**Evidence.**

- `docs/tranches/V/megatranche/audit/visual/REPORT.md` — 60 Safari captures (4 matrices × 15
  routes). The lamp is in none of them; I checked `safari-desktop-{light,dark}/picker.png`,
  `forced-colors-desktop/picker.png`, `rtl-desktop/picker.png` directly. Yet it renders live on
  the same origin the capture used (`http://localhost:9000`).
- `e2e/smoke/oracles/o22-status-lamp.spec.ts`, its own header:
  > *"HARNESS BOUND (recorded, not fudged): the `misconfigured` variant **CANNOT** fire under this
  > suite — the e2e webServer sets `VITE_API_URL` (the triad's first leg disarms it by design)."*
- The closed-form half, `test/status-lamp.test.ts`, asserts only `variant`/`role`/`label` strings
  and the transport contract (grep of all 18 `expect(` calls). **No geometry, no contrast, no
  accessible name, no viewport arm.**

So the face that ships on every `dev:web-only` session has been rendered under **no** gate and
photographed in **no** frame, and the O-22 GREEN seal carries no information about anything in this
report. `VISUAL-CONSTITUTION §8`: *"A visual claim without a tracked frame pair and a named
geometry/color/timing/interaction delta is incomplete."* `PROPORTION-AUDIT §3` requires a
`current witness` — *"real frame and, where causal, source coordinate"* — for every status species.
There is none. This is precisely how D-1 through D-9 survived four tranches.

---

### D-12 · MINOR — `--type-mono-caption` does not exist; three masking fallbacks carry the real values

**Evidence.**

```
$ grep -rn -- "--type-mono-caption *:" demo/ src/ node_modules/@mkbabb/glass-ui/dist/ | wc -l
0
$ grep -rn -- "var(--type-mono-caption" demo/ | wc -l
3
live: getComputedStyle(documentElement).getPropertyValue('--type-mono-caption') === ""
      getComputedStyle(lamp).fontSize === "11px"     ← the 0.6875rem fallback, always
```

Three consumers, zero definitions. The lamp's type size is therefore an **untracked literal wearing
a token's name** — it will never move when the type ladder moves, and `VISUAL-CONSTITUTION §4`'s
role matrix (which names `mono-caption` as an established role) does not in fact reach it.

Two further masking fallbacks in the same file: `var(--radius-pill, 9999px)` (`:57,83`) and
`var(--destructive, oklch(0.58 0.19 25))` (`:92,95,100`) — both tokens *do* resolve
(`9999px`, `light-dark(hsl(0 72% 50%), hsl(0 80% 60%))`), so those fallbacks are dead branches that
would silently substitute a **different, hardcoded red** if the token ever moved. Owner edict #2:
no masking fallbacks. (Note the sibling is inconsistent even here: `ApiOfflineChip.vue:50` writes
bare `var(--radius-pill)` — the fork has already begun to drift.)

---

### D-13 · MINOR — the box is built from raw literals, on no ladder

**Evidence.** `DockStatusLamp.vue`: `gap: 0.4rem` (:51), `letter-spacing: 0.06em` (:53),
`padding: 0.3rem 0.55rem` (:56 → computed `4.8px 8.8px`), dot `0.4rem` square (:81-82),
`border: 1.5px` (:84), `animation … 2.4s` (:120). Not one of these derives from the spacing,
sizing, or motion ladders. `PROPORTION-AUDIT §5.7` separates glyph size, target size and
reservation as three quantities; here they are three magic numbers. The 8.8px inline padding is
also a silent divergence from the chip it forked (`0.7rem` → 11.2px), i.e. the two seats already
render at different densities.

---

### D-14 · MINOR — no `forced-colors` arm

**Evidence.** No `@media (forced-colors: active)` in the file. Under forced colors the UA replaces
`background` and `border-color` with system colours; what survives is the open-ring vs. filled-dot
distinction — a **6.4px** shape difference. Below 1024px, where the label is `display:none` (D-3),
that 6.4px shape is the *only* remaining channel distinguishing a dev-config error from an offline
backend. `VISUAL-CONSTITUTION §4.1` requires state to survive forced colours with an explicit
name/state; it does not. Filed MINOR only because the tranche's `forced-colors-desktop` matrix
shows no lamp to measure (D-11) — **reproduction: NONE, hypothesis.**

---

## 3. The negative column — what is actually sound

Recorded so the cure does not destroy it:

- **`status-lamp.ts` is a good module.** Pure, total, `isDev` threaded as an argument rather than
  read from `import.meta`, closed-form testable. The variant matrix is correct: `misconfigured ≠
  unavailable` is a real distinction and it is preserved. Keep this file.
- **The transport seam is right.** `useApiClient()` injection, never a module-singleton import
  (`DockStatusLamp.vue:30`). No `availability.ts` re-derivation.
- **`verbatimModuleSyntax` clean.** `status-lamp.ts:31` is `import type { ApiAvailability }`;
  the SFC imports only values. Edict #8 satisfied.
- **Vue 3.5 idiom clean.** No props, no `defineModel`, no stale-read hazard; nothing to fix. Edict #7
  satisfied.
- **The reduced-motion gate is correctly authored** — the keyframe *and* the animation both live
  inside `@media (prefers-reduced-motion: no-preference)`, so `reduce` resolves to the static
  final state with no `animation: none` override needed. Edict #6 satisfied (scoped keyframe, in
  the component, permitted).
- **The animated property is `opacity`** — compositor-only, no layout or paint invalidation. No
  motion-performance finding.
- **`inset-inline-end` is logical, and RTL was checked, not assumed.** At `dir="rtl"` / 1440 the
  lamp correctly mirrors to `[16, 263]`. I also rendered the label under RTL
  (`frames/lamp-rtl-1440.png`): the string is all strong-LTR Latin with neutral `—`/`` ` ``
  between LTR runs, so the bidi algorithm leaves the order intact. **The LTR-isolation concern
  from `VISUAL-CONSTITUTION §6.1` does not manifest for this string — no finding.**
- **`pointer-events: none` + `tabIndex -1`** — correct; the lamp is not an operable target and does
  not steal hits from the dock. Its 26×18px mobile box is therefore *not* a tap-target defect.
- **Not a god module.** 123 lines, one job, colocated resolver. Edict #1 satisfied.

---

## 4. Proposed cure — transposition, not patch

Colour-tweaking D-1 or adding a `@media (forced-colors)` arm treats the symptoms of one root: **a
chip designed for an opaque specimen well was mounted on the ambient field, and a second copy of it
was authored to do it.** The idiomatic cure is a deletion.

**C-1 (primary) — the lamp becomes a seat inside the dock pill, owned by glass-ui.**
Retire `DockStatusLamp.vue`'s markup and its entire style block. `status-lamp.ts` survives
unchanged as the resolver. The lamp renders as a status seat *within* `GlassDock` — the T-9
*"dock status-lamp primitive"* already relayed at `GLASSUI-T-COMMUNIQUE-2026-07-11.md:60` and
re-raised in the live O-10 letter. Every finding above dissolves as a consequence, not as a
separate fix:

| dissolved | because |
|---|---|
| D-1, D-2, D-10 | inside the pill the substrate is **structural glass** with the producer's own plate + blur — a known, bounded, scheme-correct backdrop. Contrast becomes computable and fixable. |
| D-5 | interval to protagonist becomes zero: it **is** the protagonist's chrome. No residue, no oscillation, no absolute positioning, no unreserved overlap. |
| D-6 | compaction becomes the dock's own overflow/`@container dock` logic — which glass-ui **already ships** (`dock/styles/density.css`) and which O-10 §A reports we consume at 0 sites. The wrong question stops being asked. |
| D-4 | one producer primitive, two seats, one source of copy — the sentence `status-lamp.ts:8` claims is true becomes true. `ApiOfflineChip` consumes the same primitive; PR-06 closes. |
| D-13 | box geometry comes from the producer's density ladder, not six literals. |

**C-2 (the floor, if the producer seat cannot land this tranche)** — degraded but honest, and each
item is independently mandatory:

1. **One component, one copy.** `ApiOfflineChip` and the lamp collapse into a single
   `demo/` status-chip that takes a `LampState`; the label strings live once, in `status-lamp.ts`.
   No second implementation lands under any circumstance.
2. **Give it a substrate.** Replace the 12%-alpha film with an opaque well (or the producer's
   resting-glass rung + blur). Then assert a measured floor: **≥4.5:1 ink-vs-fill and ≥3:1
   fill-vs-field, at both schemes, across the seed extremes** — as a π row, not a token claim.
3. **`display:none` → visually-hidden.** `clip-path: inset(50%)` + `position:absolute` so the label
   stays in the accessibility tree at every viewport. D-3 is not negotiable.
4. **Retire `role="alert"`.** A permanent, non-updating, non-dismissible dev state is `role="status"`
   at most — or plain text with `aria-live="off"`, per the §7 house rule. One region, never two.
5. **Split the code run.** The command gets its own `<code>` span with `font-variant: normal`; the
   backticks come out of the string. The instruction must be typable.
6. **Terminate or stop the pulse.** Five seconds, or a keyboard-operable stop whose state persists.
7. **`container-type: inline-size` on `.dock-band`** and drive compaction from the band's own free
   space, never `min-width: 1024px`.
8. **Delete the three masking fallbacks**; define `--type-mono-caption` in the ladder or consume
   `--type-caption` — its two other consumers are broken the same way.
9. **Get a frame.** A capture matrix arm with the latch forced to each variant, in both schemes at
   1440/390, so this component stops being invisible to its own audit (D-11).

---

## 5. Frames

| file | what it shows |
|---|---|
| `frames/band-1440-light.png` | 1440 light, whole band — the 426px orphan gap, the 1.11:1 chip, the illegible ink |
| `frames/band-1440-dark.png` | 1440 dark — 1.06:1 chip, 1.38:1 ink, red hairline on a salmon field |
| `frames/band-390.png` | 390 — the nameless 26×18 crescent, 11.9px from the pill |
| `frames/band-1280.png` | 1280 collapsed — the lamp alone in an otherwise empty band |
| `frames/lamp-1440-light.png`, `frames/lamp-1440-dark.png` | element crops used for the ink/fill percentile measurements |
| `frames/lamp-rtl-1440.png` | `dir="rtl"` at 1440 — mirror correct, bidi intact (negative evidence) |

Decoder used for every contrast number: `scratchpad/png2.mjs`, `scratchpad/png3.mjs` (pure
`node:zlib` PNG inflate + WCAG relative luminance; no dependencies, no sampling library).

---

*No source files were edited by this seat. Writes confined to
`docs/tranches/V/megatranche/audit/components/shell-dock-dockstatuslamp/`.*
