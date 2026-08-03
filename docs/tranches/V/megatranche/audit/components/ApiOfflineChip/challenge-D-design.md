# CHALLENGE-D — `ApiOfflineChip.vue` — the design is flawed

Seat: CHALLENGE-D (design). Subject: `demo/palettes/browser/status/ApiOfflineChip.vue` (91 lines,
area `palettes`). Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Date 2026-07-29.

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the declared tier for this
seat. Declaration honoured; no inherited or undeclared seat.

## Verdict

**DEFECTIVE.** Fifteen findings, three of them BLOCKER. The strongest is not a matter of taste:
the component's louder register — the one it describes in its own source comment as "a
deliberate, attention-owning state" — renders text at a **measured 2.08:1 contrast in light and
2.38:1 in dark**, against a 4.5:1 floor. It is, by measurement, the least legible text on the
screen, and it is the one that says something is broken. The component also renders a surface the
owner has ordered dead (OM-5 / MT-F031), duplicates a sibling component's CSS declaration-for-
declaration, hand-rolls three primitives glass-ui already ships, and hangs its font size on a
custom property that **does not exist anywhere in the repo or in glass-ui**.

## 0. What the component actually is

91 lines. Two mutually exclusive `<span>` branches over one enum, plus 50 lines of scoped CSS.

| Branch | Line | Condition | Role | Text |
|---|---|---|---|---|
| misconfig | `ApiOfflineChip.vue:11–18` | `availability === "misconfigured"` | `alert` | ``dev misconfigured — run `npm run dev` `` |
| offline | `ApiOfflineChip.vue:19–26` | `availability === "unavailable"` | `status` | `backend offline — saved locally` |
| (nothing) | — | `unknown` \| `available` | — | — |

Sole consumer: `demo/palettes/browser/card/CurrentPaletteEditor.vue:116`
`<ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />`.

### Probe method and honest caveats

The dev server at `:9000` is `vite --port 9000 --strictPort` (`ps` output). Its resolved
`BASE_URL` measured **`http://localhost:3000`**, i.e. `VITE_API_URL` *is* set in this environment,
so `detectDevMisconfig` (`availability.ts:112–116`) is false and the latch never reaches
`misconfigured` on its own. I therefore drove the live module instance directly:

```js
const m = await import('/@fs/…/demo/platform/transport/availability.ts');
m.apiAvailability.value = 'misconfigured';   // and 'unavailable'
```

Three caveats, stated up front because they bound my claims:

1. An earlier reading of "2 `.api-offline-chip` elements" was **wrong**. The second lived inside
   `<div id="__probe__" style="position:fixed;left:20px;top:140px;z-index:99999">` — debris left in
   this long-lived tab by a previous audit session. I removed it, reloaded, and re-measured. The
   product count is **1 chip + 1 lamp**.
2. Forcing `dark` via `classList.add('dark')` does not re-derive the prepaint ambient ground, so
   in `evidence/desktop-1440-dark-misconfigured.png` the field behind the cards stays pink. The
   *card interior* — which is what I measure — is genuinely dark-scheme.
3. My probing added a colour to the local draft palette in that browser's `localStorage`. No repo
   file outside this seat's directory was touched; no source edit was made.

---

## 1. VISUAL TRUTH — what it actually looks like

### 1.1 The owner's own witness is the contrast proof

`audit/visual/owner-marked/OM-5-dev-misconfigured-banner.png`, measured with PIL:

```
$ python3 …  # sample OM-5, sRGB relative luminance, WCAG 2.x contrast
pill fill (mode of non-glyph pixels, mid-row):  (225, 144, 140)
glyph ink (darkest decile of red-ink pixels):   (201,  57,  48)
page field just outside the pill:               (230, 158, 153)

CR ink / pill-fill      = 2.08
CR ink / page-field     = 2.36
CR pill-fill / field    = 1.13
```

**2.08:1.** The floor for 11px text under WCAG 1.4.3 is 4.5:1. This is short by a factor of 2.16.

The mechanism is a hue-on-hue wash. `.api-misconfig-chip` sets `color: var(--destructive)` **and**
`background: color-mix(in oklab, var(--destructive) 12%, transparent)` (`ApiOfflineChip.vue:69,71`).
Ink and fill are the same hue, so the only separation available is lightness, and 12% of the
destructive over an already-light field supplies almost none of it. The pill is 1.13:1 against
the page — it barely exists — and the text inside it is 2.08:1. The louder register is quieter,
optically, than the quiet one.

### 1.2 Dark scheme — the surface disappears entirely

Live, `evidence/desktop-1440-dark-misconfigured.png`, sampled inside the card:

```
chip fill  (86, 57, 50)      card well bg (86, 57, 50)   →  CR fill/well = 1.00
glyph ink  brightest 2.5%  (215, 69, 68) → CR ink/fill = 2.38
           brightest pixel (235, 71, 71) → CR ink/fill = 2.73
```

`CR 1.00`. In dark mode the pill's background is **pixel-identical to the card behind it**. The
12%-destructive wash composites to nothing. Only the hairline border and the ink survive, and the
ink is 2.38:1. There is no chip; there is a red sentence with a faint outline around it.

### 1.3 The quiet register is not much better

Live light, `evidence/desktop-1440-light-unavailable.png`, chip inside the Current Palette well:

```
chip fill (243, 239, 235)   well bg (233, 225, 217)  →  CR fill/well = 1.13
glyph ink: darkest pixel      (88,  85,  82) → 6.47:1
           darkest 1% mean   (112, 109, 106) → ~4.6:1
           darkest 2.5% mean (128, 125, 122) → 3.58:1
```

At 11px small-caps Fira Code with `0.06em` tracking almost every glyph pixel is partial coverage,
so 3.58:1 is the honest read of the perceived stroke body; only stroke cores reach AA. The cause
is deliberate: `color: color-mix(in oklab, var(--foreground) 72%, transparent)`
(`ApiOfflineChip.vue:52`) removes 28% of the body ink from a message about data not reaching the
server.

### 1.4 The composition, read as a picture

`evidence/desktop-1440-light-unavailable.png` (1440×900, palettes route, `unavailable` latched):

- **Two identical sentences on one screen.** The dock lamp floats at the top-right over bare
  ambient gradient; the chip sits inside the Current Palette well. Same words, same font, same
  pill, same pulse, 1000px apart. Measured live after a clean reload with the stale probe removed:
  `chipCount: 1, lampCount: 1, statusTexts: ["backend offline — saved locally", "backend offline —
  saved locally"]` — **two `role="status"` live regions carrying one fact.**
- **The dock lamp is unhoused.** `dockRect` measured `{x:16, y:8, w:1408, h:72}`; the lamp sits at
  `x:1177`, the dock *pill* is centred near `x:660`. The lamp's source calls itself "band chrome …
  etched into the chrome" (`DockStatusLamp.vue:38–42`) but it is painted on raw page gradient with
  a 1.13:1 surface. It reads as a watermark someone forgot to delete — which is precisely the
  reading OM-5 records.
- **Hierarchy is inverted inside the well.** In the light shot the chip is the smallest,
  faintest, lowest-contrast element in its container — quieter than the decorative "3 colors"
  count beside it, quieter than the placeholder text in the name input below it. Subordinating a
  status is a legitimate choice; subordinating it *below the decoration* is not.
- **Mobile 390** (`evidence/mobile-390-misconfigured-lamp-only.png`): the only indication that
  anything is wrong is a **26×18px unlabelled red dot** at the dock's inline end. See D-9 — it has
  no accessible name either.

### 1.5 What the route captures show

`audit/visual/REPORT.md:120,135,150,165` — `/#/palettes` in all four Safari matrices: 0 page
errors, 0 horizontal overflow, 8 small tap targets (desktop) / 4 (mobile), 1 nameless button.
**None of those rows involve this component, because this component does not render in any of the
60 captures.** Its two states were never photographed. That is itself the finding of §2: a
component whose entire visible surface is off-matrix has never been design-reviewed against a
frame.

---

## 2. STATE COVERAGE — every state, and which were never designed

| State | Handled? | Evidence |
|---|---|---|
| `unknown` / `available` (empty) | ✅ self-gating, renders nothing | `ApiOfflineChip.vue:12,20` |
| `unavailable` (populated) | ⚠️ renders, 3.58:1 stroke body, 1.13:1 surface | §1.3 |
| `misconfigured` (populated) | ❌ 2.08:1 light / 2.38:1 dark; **and owner-ordered dead** | §1.1–1.2, D-1 |
| loading / in-flight | ❌ never designed — the latch has no pending arm | `availability.ts:40–44` (4-value union, no `probing`) |
| **recovery / reconnected** | ❌ never designed — the chip vanishes silently | D-7 |
| error (save actually failed) | ❌ conflated into "saved locally" | D-7 |
| disabled / focused / hovered / active / pressed / selected / dragging | n/a (non-interactive) — but no `pointer-events:none` either, unlike its sibling (`DockStatusLamp.vue:51`), so it is a hover/selection target with no affordance | `ApiOfflineChip.vue:41–55` |
| **overflowing / truncated** | ❌ `white-space: nowrap`, `max-width: none`, no compaction, no wrap. Measured intrinsic 212px (offline) / 252px (misconfig) | D-10 |
| **narrow viewport** | ❌ no responsive arm at all; sibling compacts to a 26px dot below 1024px, chip does not | D-10 |
| **RTL** | ❌ shell command emitted as a bare text node, no LTR isolation | D-12 |
| reduced-motion | ✅ correctly gated | `ApiOfflineChip.vue:81` |
| **forced-colors** | ❌ register distinction is colour-only; both dots collapse | D-13 |
| zoom 200% | ⚠️ scales (rem-based) but never rejoins the fluid caption ladder | D-3 |

Six states unhandled, two more mis-handled. **A state that was never designed is a design
defect**; recovery and overflow are the two that hurt.

---

## 3. FINDINGS

### D-1 · BLOCKER · The misconfigured surface is owner-ordered DEAD, and this file is its second copy

Owner mark **MT-F031** (2026-07-27), witness `OM-5-dev-misconfigured-banner.png`: *"this nonsense
needs to be removed."* The surface dies — not restyled, not gated.

The repo already believed it had died. Its own barrel says so:

> `demo/palettes/browser/status/index.ts:2–6`
> "`DevMisconfigBanner` DIED at T.W6 · W6-6 (T-9, owner order): the misconfigured-state affordance
> **re-homed** as the dock status lamp (`DockStatusLamp.vue`)"

"Re-homed" means moved. It was **copied**. `ApiOfflineChip.vue:11–18` still carries the
misconfigured branch verbatim, with the same label string that `status-lamp.ts:54` also holds.
Two components, two hard-coded copies of one sentence, one of which the owner has now ordered
killed twice.

- **Reproduction:** live, palettes route, latch = `misconfigured` → `.api-offline-chip` count 1
  **and** `.dock-status-lamp` count 1, both reading ``dev misconfigured — run `npm run dev` ``;
  both `role="alert"`.
- **Cure:** delete lines 11–18 and `.api-misconfig-chip` / `.misconfig-dot` (66–79). Per the owner
  ruling the lamp's misconfig face dies with it; the diagnosis belongs in the console, where
  `availability.ts:163` already emits it (`console.error("[value.js] …")`) with far more detail
  than the chip's seven words.

### D-2 · BLOCKER · The alert register fails AA contrast in both schemes by ≈2×

Measured (§1.1, §1.2): **2.08:1** light (owner's own witness), **2.38:1** dark (live, brightest
2.5% of ink), **2.73:1** dark peak. Floor 4.5:1 at 11px.

- **Mechanism:** hue-on-hue. `color: var(--destructive)` over
  `background: color-mix(in oklab, var(--destructive) 12%, transparent)`
  (`ApiOfflineChip.vue:69,71`; cloned at `DockStatusLamp.vue:92,98–102`). A tint of the ink can
  never be a ground for that ink.
- **Reproduction:** the PIL sampling in §1.1/§1.2, run against
  `audit/visual/owner-marked/OM-5-dev-misconfigured-banner.png` and
  `evidence/desktop-1440-dark-misconfigured.png`.
- **Cure:** subsumed by D-1 — the surface dies. If any destructive chip is ever reinstated, the
  ground must come from the neutral surface ladder (`--surface-tint-*`), never from the ink's own
  hue, and the ink must be `--destructive-foreground` on a `--destructive` ground or vice versa.

### D-3 · BLOCKER · `--type-mono-caption` does not exist; the size is a literal wearing a token's coat

```
live:  getComputedStyle(document.documentElement).getPropertyValue('--type-mono-caption')  →  ""
live:  getComputedStyle(chip).fontSize                                                     →  "11px"
grep --include=*.css --include=*.vue -rn -- "--type-mono-caption:" demo/ src/ node_modules/@mkbabb/glass-ui/dist/
       →  (no matches: 0 declaration sites, 3 consumption sites)
```

`font-size: var(--type-mono-caption, 0.6875rem)` (`ApiOfflineChip.vue:47`) therefore *always*
resolves to the hard-coded `0.6875rem` = 11px. Three consequences:

1. **It is below the floor of the type scale.** glass-ui's caption rung is
   `--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` = 12→16px
   (`node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css`). 11px < 12px. The chip is
   smaller than the smallest thing the design system admits.
2. **It never participates in the fluid ladder.** Every other caption grows with the viewport's
   `0.21vw` arm; this one is frozen at 11px from 320px to 4K.
3. **The dead token has forked fallbacks.** `ComponentSliders.vue:310` falls back to
   `var(--type-caption)`; `ApiOfflineChip.vue:47` and `DockStatusLamp.vue:54` fall back to
   `0.6875rem`. Same phantom token, two different realities — captions in the app silently
   disagree by up to 5px.

This is a **masking fallback** (owner edict 2, "no masking fallbacks") and a breach of
`VISUAL-CONSTITUTION.md §4`: *"This matrix is closed across all eighteen compositions"* — the
mono/caption role is `text-mono-small` or the established `mono-caption`, both of which exist as
utilities the file declines to use in favour of a raw `font-size` plus `.fira-code`
(`demo/styles/utils.css:9`).

- **Cure:** consume the role, not a number. Either the `text-mono-small` utility
  (`foundation.css:88,586` registers it) or glass-ui `Chip size="sm"`, whose own size map is
  `gap-1 px-2.5 py-1 text-caption`. Delete the phantom token from all three sites in the same cut.

### D-4 · MAJOR · glass-ui already ships this component. Three times.

```
$ python3 -c "import json;d=json.load(open('node_modules/@mkbabb/glass-ui/package.json'));
              print([k for k in d['exports'] if any(t in k for t in ['badge','chip','status'])])"
['./badge', './chip', './status-dot']
```

- **`Chip`** — `ChipMode = "static" | "selectable" | "action" | "removable"`; `SIZE.sm =
  "gap-1 px-2.5 py-1 text-caption"`; `SHAPE.pill`; `tone`; `surface`
  (`dist/components/chip/types.d.ts`, `chipVariants.d.ts`). That is a static pill chip with a
  tone, at the caption rung, on the spacing ladder. Exactly this component's geometry.
- **`StatusDot`** — `{ state?: "online"|"warning"|"error"|"unknown"; size?: FeedbackSize; label?:
  string }` (`dist/components/status-dot/StatusDot.vue.d.ts`), with the docstring *"Accessible
  identity. Omit when adjacent text already names the state."* That is exactly the offline-ring /
  misconfig-lamp pair, with the a11y question already answered.
- **`Badge`.**

The demo **already consumes** the producer chip: `demo/workbenches/gradient/GradientVisualizer/
easing/EasingSpecimenStrip.vue:14` → `import { Chip } from "@mkbabb/glass-ui/chip"`. So this is
not "the primitive didn't exist yet"; it is a leaf that forked the design system while a sibling
route consumed it correctly.

Violates owner edict 4 (*glass-ui is the design system; reuse existing component-type names*) and
edict 3 (*KISS, no contrivance*). It is also the mechanism behind D-3, D-8 and D-11: every
off-ladder number in this file (`0.3rem 0.7rem` padding, `0.4rem` gap, `0.4rem` dot, `1.5px` ring,
`2.4s`) exists only because the producer's ladders were bypassed.

### D-5 · MAJOR · The whole recipe is copy-pasted into `DockStatusLamp.vue`

Measured overlap of CSS `(property, value)` pairs between `ApiOfflineChip.vue:41–90` and
`DockStatusLamp.vue:43–122`:

```
ApiOfflineChip declarations: 28   DockStatusLamp declarations: 34
IDENTICAL (property,value) pairs shared: 17
  align-items:center · background:color-mix(in oklab, var(--background) 55%, transparent)
  background:currentColor · background:transparent · border:1px solid var(--card-edge)
  border-radius:var(--radius-pill) · color:color-mix(in oklab, var(--foreground) 72%, transparent)
  display:inline-flex · font-size:var(--type-mono-caption, 0.6875rem) · font-variant:small-caps
  gap:0.4rem · height:0.4rem · letter-spacing:0.06em · line-height:1 · opacity:0.35
  white-space:nowrap · width:0.4rem
```

A further four differ only by whitespace (`color-mix( in oklab, …)` vs `color-mix(in oklab, …)`,
`border: 1.5px solid currentColor`), so ~21 of 28 declarations are byte-equal modulo formatting.
The pulse keyframes are the *same body* under two names — `offline-dot-pulse`
(`ApiOfflineChip.vue:82`) and `lamp-dot-pulse` (`DockStatusLamp.vue:110`), both `0%,100%
{opacity:1} 50% {opacity:0.35}`, both `2.4s var(--ease-standard) infinite`.

Owner edict 6: *"Global keyframes live in `demo/styles/`; scoped keyframes may remain in
components."* A keyframe consumed by two components is global by definition; `animations.css`
already exists and hosts exactly this class of shared motion (`edit-drawer-in`,
`stagger-child-in`, `vj-settle`). Two scoped copies is the wrong home.

### D-6 · MAJOR · The transport truth is gated on the swatch count

`CurrentPaletteEditor.vue:116`:

```vue
<ApiOfflineChip v-if="savedColorStrings.length > 0" class="self-start" />
```

The backend's reachability is conditioned on how many colours the user has picked.

- **Reproduction (measured, live):** with the latch at `unavailable` and the draft palette empty
  (390px, `evidence/mobile-390-misconfigured-lamp-only.png`), `.api-offline-chip` count = **0**
  while the backend is down. Add one swatch → the chip appears. Delete the last swatch → it
  disappears, backend still down.
- **Consequence:** a user who opens `/palettes` while the API is down, sees a healthy-looking
  empty library, and starts working gets *no* warning until the moment they add a colour — at
  which point a warning materialises as an apparent side effect of adding a colour.
- **Canon:** `PROPORTION-AUDIT.md §4 PR-08` — *"Pending/failure/export/recovery truth only
  transient → **ADD-AFFORDANCE** … Persistent entity status/recovery."* This is the named family.
  `VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace."*
- **Cure:** the status belongs to the workspace, not to a non-empty swatch strip. Hoist it out of
  the `v-if` and out of `CurrentPaletteEditor` entirely.

### D-7 · MAJOR · No recovery arm; and the live region flaps every 30 s

Two halves of one mechanism.

**(a) No recovery.** When the latch flips back to `available` (`availability.ts:175–179`) the
chip is `v-if`'d out of existence. The user is never told the backend returned, never told the
locally-saved palettes reached the server, never told which of them did not. "saved locally" is
stated; "synced" is never stated. `VISUAL-CONSTITUTION.md §5`: *"A transient flourish may
celebrate success but never carries the only truth"* — here there is not even a flourish.

**(b) Flapping.** `availability.ts:59` `RETRY_COOLDOWN_MS = 30_000`; `assertApiAttemptAllowed`
(188–195) admits one probe past the cooldown. On a genuinely offline session the latch therefore
oscillates `unavailable → (probe) → unavailable` roughly every 30 s, and each transition
unmounts/remounts a `role="status"` node — **twice**, chip and lamp. Screen-reader users get the
same sentence announced twice, every half minute, indefinitely. A live region whose contents are
*static* should not be mounted by `v-if`; it should be a persistent region whose *text* changes.

- **Reproduction:** NONE run end-to-end (I did not sit through a 30s cooldown cycle). Mechanism
  quoted from source; labelled a hypothesis on the timing, confirmed on the duplication (two
  `role="status"` nodes measured live).

### D-8 · MAJOR · The chip has no material tier — its surface is null

Measured (§1.2, §1.3): chip fill vs its own container = **1.13:1 light, 1.00:1 dark**.

`background: color-mix(in oklab, var(--background) 55%, transparent)` (`ApiOfflineChip.vue:53`)
paints 55% of the page background on top of a card well that is *already* derived from the page
background. The composite is a no-op. In dark mode the sampled fill and the sampled well are the
same three bytes.

`VISUAL-CONSTITUTION.md §2`: *"One surface has one tier. An inner card is not automatically
another pane of glass. Glass earns its blur by revealing live content; otherwise it is a neutral
well."* This chip claims a surface (fill + hairline + pill radius) and delivers none. Either it is
a bare annotation — drop the fill and the border, keep the dot and the text — or it is a real
chip on a real tier from the producer's ladder. It is currently neither: it pays the geometric
cost of a chip for zero optical return.

### D-9 · MAJOR · Below 1024px the sibling lamp's `role="alert"` has an empty accessible name

Not this file, but the same status language and the same 17 shared declarations — and it is the
*only* surviving affordance on mobile once D-6 suppresses the chip.

```
live @ 390px:
  lamp.getAttribute('role')                     → "alert"
  getComputedStyle('.lamp-label').display       → "none"
  lamp.innerText                                → ""            ← a11y-visible text
  lamp.textContent                              → "dev misconfigured — run `npm run dev`"
  lamp.querySelector('.lamp-dot').ariaHidden    → "true"
  lamp rect                                     → 26 × 18 px
```

`display: none` (`DockStatusLamp.vue:67–69`) removes the node from the accessibility tree. The
source comment two lines above says the opposite:

> `DockStatusLamp.vue:66–68` — *"The role + label stay in the accessibility tree (visually-hidden,
> not `v-if`'d)."*

That is false as written. `visually-hidden` is a clip-rect technique; `display:none` is not it. So
below 1024px the app renders an assertive live region with **no name**, containing one
`aria-hidden` dot. It announces nothing and it is a 26×18px unlabelled red mote
(`evidence/mobile-390-misconfigured-lamp-only.png`, top-right).

`PROPORTION-AUDIT.md §5.5`: *"A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed."* An unnamed mark is none of those.
`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are
never colour-only. Role, accessible name, state/value … are explicit."*

- **Cure:** swap `display:none` for the producer's visually-hidden utility, or give the compacted
  lamp an `aria-label`. Moot if D-1's ruling kills the misconfig face — but the `unavailable` face
  has the identical bug.

### D-10 · MAJOR · No narrow-viewport behaviour whatsoever

`white-space: nowrap` (`ApiOfflineChip.vue:54`), `max-width` computed `none`, no `text-overflow`,
no `@media` arm, no compaction. Measured intrinsic widths at 11px: **212px** (offline), **252px**
(misconfigured). Its own sibling — same recipe, same wave — compacts to a 26px dot below 1024px
(`DockStatusLamp.vue:67–74`, measured `w: 26` at 390px). This file received none of that.

- **Reproduction:** I could not photograph the overflow, because at 390px the draft palette was
  empty and D-6's gate suppressed the chip. The nowrap + `max-width:none` + 252px intrinsic width
  against a 320px-viewport card content box is arithmetic, not observation — labelled **hypothesis
  on the exact clip, confirmed on the missing responsive arm**.
- **Cure:** glass-ui `Chip` carries the producer's size ladder and wrap behaviour. Hand-rolled
  `nowrap` with no ceiling is the anti-pattern.

### D-11 · MAJOR · Motion: untokenized, mis-eased, unpausable

`animation: offline-dot-pulse 2.4s var(--ease-standard) infinite` (`ApiOfflineChip.vue:88`).

1. **Untokenized duration.** `2.4s` is a raw literal, duplicated verbatim in `DockStatusLamp.vue:120`.
   glass-ui exposes a full duration ladder (`--duration-instant/fast/normal/slow/panel/xl/xxl`,
   `--spring-*-duration`, `bridges.css`). None is consumed. Owner edict 6 wants animations moved or
   **tokenized**; this is neither.
2. **Wrong curve for the job.** `--ease-standard` resolves to `cubic-bezier(0.4, 0, 0.2, 1)` — an
   accelerate-then-decelerate curve designed for one-shot A→B transitions. Applied between the two
   stops of a symmetric loop it produces an asymmetric tick (slow-out on the way down, snap on the
   way back), not a breath. A pulse wants a symmetric ease-in-out or a sine. This is a
   token-shaped choice that is nonetheless the wrong token.
3. **`infinite`, no pause.** Automatically-starting motion that runs past 5 s with no mechanism to
   pause is WCAG 2.2.2 (Pause, Stop, Hide). `VISUAL-CONSTITUTION.md §6` holds the same line for
   ambient motion (*"terminates within five seconds or exposes one persistent keyboard-operable
   still/pause control"*). This pulse runs for as long as the backend is down — potentially the
   whole session — beside text the user is trying to read at 3.58:1.

**Credit where due:** `prefers-reduced-motion: no-preference` gating is correct
(`ApiOfflineChip.vue:81`), and the animated property is `opacity` — compositor-only, no layout,
no paint. Those two are right.

### D-12 · MINOR · The shell command is not LTR-isolated

`ApiOfflineChip.vue:17` emits ``dev misconfigured — run `npm run dev` `` as a bare text node.
`VISUAL-CONSTITUTION.md §6.1`: *"CSS strings, hex, slugs, IDs and provenance render in
LTR-isolated spans inside RTL prose."* A shell command is provenance. Under `dir="rtl"` the
backtick pair and the em-dash reorder around the Latin run.

- **Reproduction:** NONE — **hypothesis**. `audit/visual/shots/rtl-desktop/` and `rtl-mobile/`
  contain no capture with this component rendered (it renders in zero of the 60 captures, §1.5).
  Mechanism is the absent `<bdi>` / `dir="ltr"`.

### D-13 · MINOR · Under forced-colors the two registers collapse to one glyph

`.offline-dot` = open ring (`border: 1.5px solid currentColor; background: transparent`,
`:62–63`); `.misconfig-dot` = filled (`background: currentColor`, `:78`). Under
`forced-colors: active` the UA overrides `background-color` and `border-color` with system colors,
so the filled lamp loses its distinguishing fill and both variants resolve to the same mark; the
ink difference (`--destructive` vs muted `--foreground`) is forced away at the same time. The
"distinct by construction" claim in the source comment (`:66–67`, and `DockStatusLamp.vue:88–90`)
holds only while author colors are honoured.

The label text still differs, so this is degradation, not total loss —but
`VISUAL-CONSTITUTION.md §4.1` requires the *state* to be non-colour-only, and here the entire
designed register split is colour + fill.

- **Reproduction:** NONE — **hypothesis**. `audit/visual/shots/forced-colors-desktop/` has no
  capture with this component rendered.

### D-14 · MINOR · Role register error, and the chip has no dev gate its sibling has

`role="alert"` is assertive: it interrupts whatever the screen reader is saying. It is used here
for a **developer-facing instruction** (``run `npm run dev` ``) that is shown to whoever loads the
page, and it fires twice on one view (chip + lamp).

Worse, the two are asymmetrically gated:

```ts
// status-lamp.ts:48
if (!isDev) return null;        // the lamp ships dark in production
```

`ApiOfflineChip.vue:12` has no equivalent. `detectDevMisconfig` (`availability.ts:112–116`)
requires a loopback host but **not** `import.meta.env.DEV`. So under `vite preview` on localhost
with `VITE_API_URL` unset — a production *build*, `DEV === false`, loopback origin, cross-origin
`DEFAULT_REMOTE_API_URL` (`client.ts:36`) — the lamp goes dark and **the chip alone tells the
viewer to run a dev command**.

- **Reproduction:** NONE — **hypothesis by construction**. The two code paths are quoted; I did
  not build and serve a preview.

### D-15 · INFO · Hierarchy inversion, stated as a design judgment

Collecting the measurements: the one message on the screen about work not reaching the server is
rendered at the smallest size in the app (11px, below the scale floor), the lowest ink opacity
(72% of `--foreground`), the lowest surface contrast (1.13:1 / 1.00:1), and the lowest text
contrast (3.58:1 offline, 2.08:1 alert). Everything decorative around it — the "3 colors" count,
the palette name placeholder, the swatch strip — is louder.

The source comment claims the design intent is *"a DESIGNED state in the instrument's own register
… never an apologetic toast."* The intent is right and the tranche canon supports it. The
execution inverted it: this is not restraint, it is inaudibility. Restraint would be full-strength
ink at the caption rung on a real surface, small and calm. What shipped is a whisper about data
loss.

---

## 4. Judgment against the tranche canon

| Authority | Clause | Verdict |
|---|---|---|
| `PROPORTION-AUDIT.md §4` | **PR-08** pending/failure/recovery truth only transient → ADD-AFFORDANCE | **FAIL** — D-6, D-7. This component *is* the PR-08 exemplar and has not been closed. |
| `PROPORTION-AUDIT.md §5.5` | small mark is data/status/labeled/… or removed | **FAIL** — D-9 (26px unnamed mote at ≤1024px). |
| `PROPORTION-AUDIT.md §5.8` | *"Real rendered relation wins over token intent … token presence alone cannot close a row"* | **FAIL** — D-3. `var(--type-mono-caption, …)` is token *appearance* with no token behind it. |
| `PROPORTION-AUDIT.md §5.13` | type role matrix; value/code/provenance = `text-mono-small` or `mono-caption` | **FAIL** — D-3, raw `font-size` + `.fira-code` instead of the role. |
| `VISUAL-CONSTITUTION.md §2` | one surface, one tier; glass earns its blur | **FAIL** — D-8, null surface (1.13:1 / 1.00:1). |
| `VISUAL-CONSTITUTION.md §3.7` | spacing container-scaled from glass-ui tokens | **FAIL** — `0.3rem 0.7rem`, `0.4rem`, `1.5px` are off-ladder (producer `sm` = `gap-1 px-2.5 py-1`). |
| `VISUAL-CONSTITUTION.md §4` | closed type matrix across all eighteen compositions | **FAIL** — D-3, 11px is below the 12px floor and outside the fluid arm. |
| `VISUAL-CONSTITUTION.md §4.1` | rendered contrast on the actual tier; states never colour-only | **FAIL** — D-2 (2.08:1), D-13. |
| `VISUAL-CONSTITUTION.md §5` | persistent operation state stays with the entity/workspace | **FAIL** — D-6, D-7. |
| `VISUAL-CONSTITUTION.md §6` | continuous ambient motion terminates ≤5s or exposes a pause control | **FAIL** — D-11, `infinite`. |
| `VISUAL-CONSTITUTION.md §6.1` | CSS strings / provenance in LTR-isolated spans | **FAIL (hypothesis)** — D-12. |
| `VISUAL-CONSTITUTION.md §6` | reduced motion resolves to final geometry | **PASS** — `:81`. |
| Owner edict 2 | no masking fallbacks | **FAIL** — D-3 (`--type-mono-caption`), plus `var(--destructive, oklch(0.58 0.19 25))` ×4 duplicating a token that is defined (`foundation.css`). |
| Owner edict 3 | KISS, no contrivance | **FAIL** — D-4, hand-rolled chip + dot + badge. |
| Owner edict 4 | glass-ui is the design system | **FAIL** — D-4, `./chip` + `./status-dot` + `./badge` all shipped and all bypassed, while `EasingSpecimenStrip.vue:14` consumes the producer chip correctly. |
| Owner edict 5 | style at the root component level | **FAIL** — D-5, the "root" here is a 50-line private CSS block cloned into a second file. |
| Owner edict 6 | keyframes: global in `demo/styles/`, scoped may stay local | **FAIL** — D-5, one keyframe body, two scoped copies, two names. |
| Owner edict 7 | idiomatic Vue 3.5 | **PASS** — no props/refs needed; two `computed` over one enum is slightly redundant but not a defect. |
| Owner edict 8 | `verbatimModuleSyntax` / `import type` | **PASS** — both imports (`computed`, `useApiClient`) are value imports. Correct. |
| Owner edict 1 | no god modules | **PASS** — 91 lines, one job. |

---

## 5. The cure — architectural transposition, not a patch

Patching the contrast would leave twelve findings standing. The gestalt cure is three moves.

**Move 1 — kill the misconfig surface (OM-5 / MT-F031).**
Delete `ApiOfflineChip.vue:11–18`, `:66–79`; delete the `misconfigured` arm of
`status-lamp.ts:50–55` and `DockStatusLamp.vue:91–107`. The dev-config diagnosis already lives in
the console at full fidelity (`availability.ts:163`, a `console.error` naming the page origin, the
resolved base URL and the exact fix) — which is where a dev-environment diagnosis belongs. The
`misconfigured` **latch** stays: it is load-bearing (`assertApiAttemptAllowed:189–191` throws
`DevMisconfigError` synchronously, and `markApiUnreachable:169` refuses to relabel it). Only the
*visible surface* dies. Removes D-1, D-2, and half of D-13/D-14.

**Move 2 — one status seat, from the producer, at the workspace level.**
Both remaining faces are the same object: *the palette workspace is degraded.* That is one seat,
not two components and not a per-card annotation.

```vue
<!-- palettes workspace status region — persistent, one instance, producer primitives -->
<Chip mode="static" size="sm" shape="pill" :tone="tone" surface="quiet">
  <StatusDot :state="dotState" />
  {{ message }}
</Chip>
```

`Chip` supplies the pill geometry, the caption rung and the spacing ladder (killing D-3, D-4, D-8
and the off-ladder numbers). `StatusDot` supplies the mark and its accessible identity (killing
D-9's class of bug and D-13). Delete `DockStatusLamp.vue`'s cloned CSS and `status-lamp.ts`'s
duplicate label strings; if the dock still wants a compact indicator it renders the *same*
`StatusDot` with no label, named by `StatusDot`'s own `label` prop rather than by a
`display:none` span. Kills D-5.

**Move 3 — make the region persistent and give it a recovery arm.**
Mount one live region in the workspace, not inside `CurrentPaletteEditor`'s
`v-if="savedColorStrings.length > 0"`. Its *text* changes; the node does not mount and unmount.
Three messages instead of two:

| latch | tone / dot | message |
|---|---|---|
| `unavailable` | `warning` | `backend offline — N palettes held locally` |
| `available` **after** `unavailable` | `online` | `reconnected — N synced` (then settles to absent) |
| otherwise | — | region present, empty |

That closes PR-08 properly (persistent entity status **and** recovery), stops the 30-second
re-announcement flap, and stops a transport fact from being conditioned on a swatch count. Kills
D-6, D-7, D-10 (the producer chip carries the wrap/compaction behaviour), and D-15 — because a
persistent workspace-level status can afford full-strength ink at the caption rung without
shouting.

**Move 4 (bookkeeping, same cut).** Delete `--type-mono-caption` from all three consumption sites
(`ApiOfflineChip.vue:47`, `DockStatusLamp.vue:54`, `ComponentSliders.vue:310`) — a token with zero
declarations and two divergent fallbacks is worse than no token. Move any surviving pulse keyframe
to `demo/styles/animations.css` with a `--duration-*` token and a symmetric curve, and either cap
it at ≤5s or drop it: a status that must pulse forever to be noticed is a status that is styled
too quietly, which is D-15 restated.

---

## 6. Negative proof — what is genuinely sound

Recorded so this report is not read as indiscriminate:

- **Self-gating is correct.** `unknown` and `available` render nothing. No empty shell, no
  skeleton, no zero-height node. Measured: `chipCount: 0` at `availability === "available"`.
- **`prefers-reduced-motion` is respected**, and correctly — the `@keyframes` and the `animation`
  declaration both live inside `@media (prefers-reduced-motion: no-preference)`
  (`ApiOfflineChip.vue:81–90`), so reduced-motion users get the final geometry with no override
  fight. This is better than the common `animation: none` counter-patch.
- **The animated property is `opacity`** — compositor-only. No layout, no paint, no jank. Zero
  forced-reflow properties anywhere in the file.
- **The DI seam is right.** `useApiClient()` (`:35`) rather than a hard module-singleton import,
  as `useApiClient.ts:9` intends.
- **`verbatimModuleSyntax` clean** — both imports are genuine value imports; no `import type`
  needed and none wrongly omitted.
- **Not a god module** — 91 lines, one responsibility.
- **`misconfigured ≠ unavailable` is a genuinely good distinction** at the *latch* level
  (`availability.ts:169`, `189–191`). The honesty contract is real engineering. My objection is
  only that it was given two visible surfaces where it needed zero.

---

## 7. Evidence index

| Path | What |
|---|---|
| `evidence/desktop-1440-light-unavailable.png` | live 1440×900, light, `unavailable` latched — two identical chips, one screen |
| `evidence/desktop-1440-dark-misconfigured.png` | live 1440×900, forced dark, `misconfigured` — chip fill == card bg (CR 1.00) |
| `evidence/mobile-390-misconfigured-lamp-only.png` | live 390×844 — only indication is a 26×18px unnamed dot |
| `../../visual/owner-marked/OM-5-dev-misconfigured-banner.png` | owner's witness; source of the 2.08:1 measurement |
| `../../visual/REPORT.md:120,135,150,165` | `/#/palettes` rows — component absent from all 60 captures |

Commands whose output is pasted in this report: the `grep` for `--type-mono-caption:` declaration
sites (0 hits), the `python3` package-exports probe (`['./badge','./chip','./status-dot']`), the
PIL contrast sampling of OM-5 and of both live screenshots, the CSS declaration-overlap diff (17
identical pairs), and the live `browser_evaluate` readouts quoted inline.
