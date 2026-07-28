# CHALLENGE-D — `demo/color-picker/ErrorBoundary.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the model this seat was explicitly
spawned with. The declaration is not inherited: it was named in the spawn prompt and matches the
model I am. No tier substitution occurred in this seat.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component's thesis is stated in its own first three lines:

> `ErrorBoundary.vue:2-3` — *"a focus-managed, SR-ANNOUNCED error boundary — **NEVER a silent
> white-screen dead plate**."*

The shipped render is a silent dead plate. In the live app, when this boundary catches, the
user sees **one unlabelled pill floating in an empty pink field**. The alert glyph, the Fraunces
statement of failure, and the machine-truth detail line are all in the DOM, with real non-zero
rects, `opacity: 1` and `visibility: visible` — and none of them paint. Then, whatever route the
user navigates to next, they get the same field and the same pill, forever.

Three independent proofs, one sibling seat's corroborating frame, and a one-property cure test
are below. Fifteen further findings follow, all measured.

---

## 0. The frames

| Frame | What it shows |
|---|---|
| `evidence/EB1-caught-desktop-1440-light.png` | **the shipped caught state**, 1440×900 light. Only "Try again" renders. |
| `evidence/EB2-caught-desktop-1440-dark.png` | same, dark. Same wordless pill. |
| `evidence/EB8-cure-test-position-relative.png` | the *only* delta is `style.position="relative"` on the boundary root. All three hidden children appear. |
| `evidence/EB12-cured-dark-1440.png` | the dark treatment made visible — pale ink on an undimmed hot-pink field. |
| `evidence/EB10-zoom200-long-detail-clip.png` | 200%-zoom-equivalent (720×450 CSS px) with a realistic stack trace as `detail`. |
| `evidence/EB11-caught-mobile-390-light.png` | mobile 390×844 caught state — identically wordless. |
| `../Markdown/evidence/E6-doc-load-failure-whole-route-collapse.png` | **independent corroboration**: the Markdown seat captured the same wordless plate before I ran anything. |

Measurements: `evidence/EB-measurements.json`, `evidence/EB-probe2.json`, `evidence/EB-probe3.json`.

Reproduction for every finding below (one command, WebKit/Safari engine):

```js
await page.route(/\/assets\/docs\/[a-z-]+\.md/, (r) => r.abort("failed"));
await page.goto("http://localhost:9000/#/");   // desktop ≥1024w, aspect ≥1.1
// → About's markdown module import fails during render → the boundary catches
```

---

## D-1 · BLOCKER · The boundary's ink is painted *under* the atmosphere canvas

The caught state renders four children. Three of them are invisible.

**Measured** (`EB-probe2.json → occlusion`):

```json
"canvasStyle":   { "position": "absolute", "zIndex": "auto" },
"canvasRect":    { "x": 0, "y": 0, "w": 1440, "h": 900 },
"canvasDomIndexInLayout": 0,
"boundaryStyle": { "position": "static", "zIndex": "auto" },
"mainStyle":     { "position": "static", "zIndex": "auto" },
"childStyles": {
  "svg":    { "position": "static"   },
  "msg":    { "position": "static"   },
  "detail": { "position": "static"   },
  "button": { "position": "relative" }     ←  the only one that paints
}
```

**Mechanism.** CSS 2.1 Appendix E painting order: in-flow inline content paints at step 5;
positioned descendants with `z-index: auto` paint at step 8, in tree order. `.atmosphere-canvas`
(`App.vue:9-17`) is `position: absolute`, tree index 0, and covers the full 1440×900 viewport with
an opaque aurora gradient. It therefore paints **over** every static child of the boundary. The
glass-ui `Button` is `position: relative` and later in tree order, so it alone survives.

**Why the panes don't suffer this.** The element ErrorBoundary *replaces* carries the stacking
contract the boundary does not:

- `demo/styles/shell.css:74` — `.pane-container { position: relative; }`
- `demo/styles/shell.css:94-96` — `.pane-wrapper--left { z-index: 1; }`

`App.vue:50` wraps `.pane-container`; on catch, `v-if`/`v-else` swaps that positioned element out
for a bare `position: static` div. The boundary inherited the slot's *obligations* without
inheriting its *contract*.

**Why every DOM-level audit says this is fine.** The canvas is `pointer-events: none`
(`App.vue:11`), so it is transparent to hit-testing but not to painting. Hit-testing the centre of
each invisible child returns the child itself:

```json
"hitTest": { "svg": "line.", "msg": "p.font-display.text-heading",
             "detail": "p.text-mono-small.plate-ink", "button": "button.button.tap-squish" }
```

`getBoundingClientRect`, `getComputedStyle`, `elementFromPoint`, `textContent` and the a11y tree
**all report a healthy plate**. Only pixels disagree. `REPORT.md`'s 60-capture matrix reports
`blankOrNearBlank: 0` and `pageErrors: 0` for exactly this reason — it never rendered the caught
state, and if it had, its DOM assertions would have passed.

**Cure test** (`EB8-cure-test-position-relative.png`). One property changed at runtime, nothing
else: `document.querySelector(".vj-error-boundary").style.position = "relative"`. All three
children appear. The mechanism is confirmed, not inferred.

**Proposed cure — architectural, not a patch.** Do not add `position: relative` to the div. The
defect is that the fallback replaces the *stage* instead of occupying a *seat*. Move the boundary
inside `PaneSlot`, so the failing pane's own wrapper — which already owns the material, the
stacking layer, the `cqi` container and the `vj-enter` grammar — renders the fallback in place of
its child. The stacking bug then cannot recur, because the fallback never leaves the seat that
defines its paint order.

---

## D-2 · BLOCKER · One caught error bricks the whole application, permanently

After a single throw in one pane, **every route in the app is unreachable**. Measured
(`EB-probe2.json → brick`), hash updated correctly each time:

| route | `boundaryStillUp` | `.pane-container` |
|---|---|---|
| `#/palettes` | `true` | `false` |
| `#/browse` | `true` | `false` |
| `#/extract` | `true` | `false` |
| `#/mix` | `true` | `false` |
| `#/generate` | `true` | `false` |
| `#/gradient` | `true` | `false` |
| `#/atmosphere` | `true` | `false` |
| `#/blob` | `true` | `false` |
| `#/admin/users` | `true` | `false` |

Also `EB-measurements.json → EB5.post`: `afterRouteHash: "#/gradient"`,
`afterRouteBoundary: true`, `afterRouteText: "This panel hit an unexpected error.…"`.

**Mechanism.** Two design decisions compound:

1. **Wrong granularity.** `App.vue:50 → 140` places one boundary around the *entire* two-pane
   grid. A throw in the right pane (About) destroys the left pane (Picker), which was fine.
2. **No discharge.** `caught` (`ErrorBoundary.vue:55`) is written in `onErrorCaptured` and cleared
   only inside `reset()` (line 71). Nothing watches the route. Because the slot lives in the
   `v-else` arm (line 35), a route change re-renders nothing.

The dock stays alive and keeps *accepting* navigation — it updates the hash, it highlights the
destination — while the scene never changes. The app lies about its own state.

**Against canon.** `PROPORTION-AUDIT.md` PR-08 dispositions failure/recovery truth as
**ADD-AFFORDANCE — "Persistent entity status/recovery"**: recovery belongs to the entity, not the
application. `VISUAL-CONSTITUTION.md §5`: "Persistent operation state stays with the
entity/workspace."

**Proposed cure.** Boundary per pane (D-1's cure gives this for free), keyed on the route so a
navigation naturally discharges the caught state. A failure in About must leave Picker standing.

---

## D-3 · BLOCKER · "Try again" cannot try again

`EB-measurements.json → EB5.post`:

```json
"beforeBoundary":     true,
"afterRetryBoundary": true,
"afterRetryActive":   { "tag": "div", "cls": "vj-error-boundary flex flex-col …" }
```

Clicking the sole recovery affordance leaves the boundary up **and steals focus back** off the
button onto the container.

**Mechanism.** `reset()` (line 71-75) flips `caught` to `false` and clears `detail`. The `v-else`
slot re-mounts with byte-identical props and state, so a deterministic failure re-throws inside
the same tick; `onErrorCaptured` re-fires, `caught` returns to `true`, and `nextTick(… focus())`
(line 64) drags focus back to the container — re-triggering the assertive alert.

There is no remount key, no attempt counter, no escalated copy after a failed retry, and no
alternative exit. `VISUAL-CONSTITUTION.md §3.1` calls a recovery article's obligation
"diagnosis, preservation/export, then separately confirmed reset". This offers one verb that
provably does nothing.

**Proposed cure.** A retry must change an input — bump a remount key, refetch, or hand the user
an escape (a named route out). If the first retry fails, the plate must say so and offer the
escape instead of re-arming the same dead verb.

---

## D-4 · MAJOR · The plate has no material tier, so in dark scheme every element fails its floor

Contrast measured against the **actual composited backdrop**: I hid the ink, screenshot-clipped
each child's exact rect, and averaged the pixels (`EB-probe3.json`).

| scheme | element | ink | backdrop | measured | floor | |
|---|---|---|---|---:|---:|---|
| light | statement | `rgb(28,25,23)` | `rgb(242,93,163)` | **5.72:1** | 4.5 | pass |
| light | detail (16.4px) | `rgb(86,84,83)` | `rgb(242,93,163)` | **2.46:1** | 4.5 | **FAIL** |
| light | destructive glyph | `rgb(219,36,36)` | `rgb(242,93,163)` | **1.60:1** | 3.0 | **FAIL** |
| dark | statement | `rgb(233,230,226)` | `rgb(242,93,163)` | **2.46:1** | 4.5 | **FAIL** |
| dark | detail (16.4px) | `rgb(221,218,216)` | `rgb(242,93,163)` | **2.20:1** | 4.5 | **FAIL** |
| dark | destructive glyph | `rgb(235,71,71)` | `rgb(242,93,163)` | **1.24:1** | 3.0 | **FAIL** |

Note the backdrop is `rgb(242,93,163)` in **both** schemes — the ambient field derives from the
seed colour and does not darken (visible in `EB12-cured-dark-1440.png`: the dock goes dark brown,
the field stays hot pink). So the dark treatment is near-white text on hot pink. Five of six
measurements fail; the destructive glyph — the *only* non-textual failure register — fails by 2.4×.

**Mechanism.** The plate paints **directly onto the ambient field**. It has no glass, no well, no
surface. Every other content surface in the app sits inside a pane Card; this one replaced the
grid that held the Cards.

`--ink-muted` is certified *"floor-clamped against the live **resting plate**"*
(`useAtmosphereBoot.ts:85`; `EmptyState.vue:50-53` records the static token it replaced measuring
3.84:1 over the My Palettes plate). **That referent does not exist on this surface.** The
certification's guarantee is void here, and the component's own comments offer the token name as
the evidence:

- `ErrorBoundary.vue:12-14` — *"the machine truth in Fira on the certified `--ink-muted`
  de-emphasis rung — no new sub-floor detail"*
- `ErrorBoundary.vue:79-86` — *"so this new surface adds NO sub-floor contrast debt"*

Against `VISUAL-CONSTITUTION.md §4.1`, verbatim: *"Text, focus, boundaries and state meet their
rendered contrast **on the actual material tier**; a token name is not evidence."* And §2:
*"One surface has one tier."* This surface has none.

**Proposed cure.** Seat the fallback on a real producer material. glass-ui 7.0.0 exports both
`./surface` and `./card` (`node_modules/@mkbabb/glass-ui/package.json` subpath list). D-1's cure —
rendering inside the pane seat — supplies the tier automatically and needs no new token.

---

## D-5 · MAJOR · A duplicate of `EmptyState`'s `error` variant with five drifted magnitudes

`ErrorBoundary.vue:12` declares the composition *"mirrors EmptyState's `error` variant"*. It is a
copy, and every magnitude drifted:

| quantity | `EmptyState.vue` (error arm) | `ErrorBoundary.vue` | Δ |
|---|---|---|---|
| flex gap | `gap-2.5` (10px) — line 16 | `gap-3` (12px) — line 18 | +2px |
| block padding | `py-8` (32px) — line 16 | `py-10` (40px) — line 18 | +8px |
| glyph | `w-6 h-6` (24px) — line 19 | `w-7 h-7` (28px) — line 23 | +4px |
| statement measure | `max-w-[26ch]` — line 20 | `max-w-[28ch]` — line 24 | +2ch |
| detail measure | `max-w-[44ch]` — line 23 | `max-w-[46ch]` — line 27 | +2ch |
| `.plate-ink` rule | lines 102-104 | lines 84-86 | **byte-identical** |

Five unmotivated magnitudes and one verbatim CSS clone. No rationale appears in either file for
any of the five.

`EmptyState` is declared *"the ONE shared empty atom (8 consumers incl. the admin walls), so every
consumer inherits the cure"* (`EmptyState.vue:98-100`). It already accepts exactly the four things
this component needs: `variant="error"`, `message`, `detail`, and an `#action` slot
(`EmptyState.vue:72-91`). Instead of becoming the 9th consumer, ErrorBoundary forked it — so the
next contrast or type cure to the shared atom will silently miss the one surface that appears
when everything has gone wrong.

Violates owner edict 3 (KISS, no contrivance) and `PROPORTION-AUDIT.md §3`: *"Multiple instances
sharing one cause share one family row plus an exhaustive site list."*

**Proposed cure.**

```vue
<EmptyState v-if="caught" variant="error" :message :detail>
    <template #action><Button …>{{ retryLabel }}</Button></template>
</EmptyState>
```

Zero new magnitudes; the fork and the cloned `.plate-ink` block both die.

---

## D-6 · MAJOR · Type jurisdiction — Fraunces on two roles the closed matrix gives to Plus Jakarta Sans

Computed styles, not class names (`EB-measurements.json → EB1.state.children`):

| element | measured | `VISUAL-CONSTITUTION.md §4` requires |
|---|---|---|
| statement `<p class="font-display text-heading">` (line 24) | **Fraunces 25.888px / 35.596 lh / w700** | `section heading → text-heading → Plus Jakarta Sans` |
| button label (line 30) | **Fraunces 16.4px / w500** | `control or label → text-small → Plus Jakarta Sans, non-bold` |
| detail `<p class="text-mono-small">` (line 27) | Fira Code 16.4px / w400 | `value/code/provenance → text-mono-small → Fira Code` ✓ |

§4 states the matrix *"is closed across all eighteen compositions"* with P019's Picker
identity/headline pair as **the sole exception**. Two of three type roles here are outside it.

The button's family is caused by a **per-instance override on a glass-ui root**:

```vue
ErrorBoundary.vue:30
<Button variant="outline" size="sm" class="font-display mt-1" @click="reset">
```

This is owner edict 5 (root-level styling; never per-instance overrides) with a measured
typographic consequence — and the design-system boundary violation of edict 4: if a Fraunces
button is wanted, that is a glass-ui Button variant, not a class bolted onto one call site.

`mt-1` on the same line is a **second** per-instance override with its own measured consequence.
Child rects from `EB1`: svg bottom 436.7 → msg top 448.7 = **12.0px**; msg bottom 484.3 → detail
top 496.3 = **12.0px**; detail bottom 519.2 → button top 535.3 = **16.1px**. The plate's own
`gap-3` rhythm is broken at exactly one interval, for no stated reason.

---

## D-7 · MAJOR · Focus is thrown to a 1408×804 unnamed container, and its ring is occluded too

`EB-measurements.json → EB1.state.activeElement`:

```json
{ "tag": "div", "cls": "vj-error-boundary flex flex-col items-center justify-center ",
  "outline": "auto 3px rgb(28, 25, 23)", "boxShadow": "none" }
```

boundary rect: `{ w: 1408, h: 804 }`.

`EB-probe3.json → mobile.a11y`:

```json
{ "role": "alert", "ariaLive": "assertive", "ariaLabel": null, "ariaLabelledby": null,
  "tabindex": "-1", "headingsInside": 0, "isActive": true, "tabbables": ["button:Try again"] }
```

Four compounding faults:

**(a) The focus target is the whole scene band.** `EB8` / `EB12` / `EB10` show the resulting ring
as a rectangle enclosing 87% of the viewport. A focus indicator the size of the stage is not an
indicator. `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency."*

**(b) In the shipped state the ring does not paint at all** — it is drawn on the `position: static`
div and is occluded by D-1's canvas. The sighted keyboard user's focus simply disappears.

**(c) Announce-and-move race.** `role="alert"` already implies `aria-live="assertive"` and
`aria-atomic="true"`; the explicit `aria-live="assertive"` (line 20) is redundant. The real defect
is doing **both**: firing an assertive alert *and* moving focus into that same region
(lines 62-64). The two announcements race — the standard resolution is announce **or** move, not
both. Under D-3, this fires again on every failed retry.

**(d) No name, no heading.** The container has neither `aria-label` nor `aria-labelledby`, and
contains zero headings. `EB1` measures `headingCount: 0` in the caught document where the healthy
document measures 1 (`EB6`). The failure statement is a `<p>`, so there is no heading-level entry
point to the failure. (`REPORT.md`'s `h1` column is `0` across all 60 captures — the app-wide
missing H1 is a shell defect outside this seat, but it means the boundary cannot lean on a route
heading either.)

**Proposed cure.** Announce through the `role="alert"` region; move focus to the **named recovery
button**, which carries its own accessible name and its own producer-owned `focus-ring`. Drop
`aria-live`, drop `tabindex="-1"`, drop the container `focus()`.

---

## D-8 · MAJOR · A raw JS stack trace ships to the end user as centred body copy

`ErrorBoundary.vue:61` — `detail.value = err instanceof Error ? err.message : String(err)` —
unbounded, unfiltered, rendered at line 27 into a `text-center` column.

`EB10-zoom200-long-detail-clip.png` shows the result with a realistic message: six ragged,
centre-set lines of

> `TypeError: Cannot read properties of undefined (reading 'toFixed') at readoutReservation
> (readoutReservation.ts:118:24) at renderComponentRoot (vue.js:6521:16) at
> ReactiveEffect.componentUpdateFn (vue.js:7663:46)`

Design faults, in order of severity:

1. **Centre-aligned machine provenance.** Code with ragged left *and* right edges is unreadable.
   The plate inherits `text-center` from line 18 and never opts the mono line out.
2. **No bound and no disclosure.** No clamp, no `<details>`, no truncation. The plate's height is
   whatever the runtime hands it.
3. **Not LTR-isolated.** `VISUAL-CONSTITUTION.md §6.1` requires *"CSS strings, hex, slugs, IDs and
   provenance render in LTR-isolated spans inside RTL prose."* There is no `dir="ltr"` and no
   `unicode-bidi: isolate`.
4. **No copy affordance.** The single genuinely useful artefact on the screen cannot be captured.
   `PROPORTION-AUDIT.md §5.6`: *"Add affordance when the surviving action/state is otherwise
   undiscoverable."*

Also: the `v-if="detail"` guard on line 27 is effectively dead — an `Error` always yields a
non-empty `message`, and `String(err)` is never `""` for a thrown value.

---

## D-9 · MAJOR · The plate has no proportion; it inherits the band

`ErrorBoundary.vue:18` — `… h-full w-full min-h-0`.

Measured at 1440×900 (`EB1`):

- boundary rect: **1408 × 804 = 1,132,032 px²**
- ink bounding box (svg top 408.7 → button bottom 571.3; widest child 444.9): **444.9 × 162.6 = 72,341 px²**
- **ink density = 6.39%. 93.6% of the stage is empty.**

Measured at 720×450 (`EB10`, the 200%-browser-zoom equivalent): boundary 688 × 338, content nearly
filling it. So the plate swings from 6% ink to ~85% ink across two supported sizes with **no
governing rhythm** — because it has no intrinsic proportion at all. It is whatever the band is.

The species it copies is a content-hug: `EmptyState.vue:16` is `py-8` with no `h-full`.

Against canon:

- `VISUAL-CONSTITUTION.md §3.2`: *"Empty secondary content occupies at most a narrow invitation
  tray (≤15% of the stage) or disappears. It never receives half the viewport."*
- `VISUAL-CONSTITUTION.md §7` (Palette library and Browse): *"A true empty invitation content-hugs
  its text/action."*
- `PROPORTION-AUDIT.md §5.1`: *"A Card houses one bounded object/specimen. A page region, empty
  column, inner stage or mere padding group does not become a Card by default."* Inverted here —
  a bounded plate was stretched into a page region by two utility classes.

**Proposed cure.** Delete `h-full w-full`; let it content-hug inside the pane seat, exactly as its
sibling species does.

---

## D-10 · MINOR · RTL — physical `mr-1.5` collapses the icon gap to zero

`ErrorBoundary.vue:31` — `<RotateCcw class="w-3.5 h-3.5 mr-1.5" …>`. Physical, not logical.

Measured (`EB-probe2.json`, same page, `dir` toggled):

| dir | button.x | button.w | svg.x | `margin-right` | icon→label gap | dead space at inner edge |
|---|---:|---:|---:|---|---:|---:|
| ltr | 658.0 | 123.9 | 670.0 | `6px` | **6px** (correct) | 0 |
| rtl | 658.0 | 123.9 | **750.0** | `6px` | **0px** | **6px** |

In RTL the flex row reverses; the icon sits at the capsule's right. Icon right edge = 764.0,
button right edge = 781.9 → 17.9px = 12px padding + the stray 6px. The 6px that should separate
icon from label lands on the *outside* of the icon instead, and the icon jams against the label.

`VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout | logical inline/block direction
follows the document."*

**Cure.** `me-1.5`. (Better: let the glass-ui Button own its icon slot gap at the root, per edict 5.)

---

## D-11 · MINOR · `var(--ink-muted, var(--muted-foreground))` is a masking fallback, replicated ×5

`ErrorBoundary.vue:85`. Owner edict 2 forbids masking fallbacks.

`--ink-muted` is stamped on `documentElement` unconditionally at App setup with `immediate: true`
(`useAtmosphereBoot.ts:100-106`), so on the ready path the fallback arm is unreachable dead code.
Where it *is* reachable — a boot failure — it silently restores the exact static token that
`EmptyState.vue:50-53` records as measuring **3.84:1**, below the 4.5:1 small-text floor. The
fallback re-admits the precise defect the certified rung exists to cure, without any signal.

The identical declaration appears in **eleven** places across **seven** SFCs:
`EmptyState.vue:103`, `ErrorBoundary.vue:85`, `ExtractWorkbench.vue:291`, `ExtractControls.vue:149`,
`ImageDropZone.vue:110`, `ConfigSliderPane.vue:205`, `ColorComponentDisplay.vue:200,205,211`,
`PaneHeader.vue:123`, `ColorSpaceSelector.vue:309`.

**Cure.** One root `@utility plate-ink` in `demo/styles/`, referencing `var(--ink-muted)` with no
fallback arm. If the rung is missing, that is a boot failure and must read as one.

---

## D-12 · MINOR · `.vj-error-boundary` is a dead class hook

```
$ grep -rn "vj-error-boundary" demo/ src/ e2e/ test/
demo/color-picker/ErrorBoundary.vue:18:        class="vj-error-boundary flex flex-col …"
```

One hit — its own declaration. No stylesheet in the repo targets it. Its only other uses are audit
probe selectors (`../Markdown/probe-C6.mjs:34-35`, and my own probes). A named hook that nothing
styles is either an unbuilt intention or noise; here it is the ghost of the material tier D-4 says
is missing.

---

## D-13 · MINOR · Motion — an unmanaged jump-cut in an app where every scene change is choreographed

Every `PaneSlot` arrives through `transition-name="vj-enter"` plus the `appear` plate-land grammar
(`App.vue:87, 106, 132`; `composables/boot/overture.css`). The boundary neither adopts that grammar
nor deliberately declines it: the entire two-pane scene vanishes and a plate appears in the same
frame, with no entry, no exit on `reset()`, and no tokenized curve.

`VISUAL-CONSTITUTION.md §6`: *"A scene swap preserves the specimen and changes the surrounding
instrument. **No full-slab remount hole**, rAF-delayed blank, or dock collapse."* This is precisely
a full-slab remount hole.

Not a `prefers-reduced-motion` defect — there is no motion to reduce. The *absence* is the defect:
the one transition in the product that most needs to be legible is the only one nobody designed.
Owner edict 6 (animations are never deleted, only moved or tokenized) is not violated, because
none was ever authored.

---

## D-14 · MINOR · Speculative API — two of three public members are unused, the third is passed its own default

```vue
App.vue:50   <ErrorBoundary message="This panel hit an unexpected error.">
```

The sole consumer:

- passes `message` — **byte-identical to the prop's own default** at `ErrorBoundary.vue:44`;
- never passes `retryLabel` (line 45/50);
- never listens for `@reset`, so `defineEmits<{ reset: [] }>()` (line 53) and the `emit("reset")`
  at line 74 are dead.

Owner edict 3 (KISS, no contrivance): the entire public surface is inert. Either the boundary is
per-pane and these props carry pane-specific copy (D-2's cure makes them live), or they are
deleted.

---

## D-15 · INFO · State coverage — 2 of ~14 states designed

Designed: pass-through; caught-once. Undesigned, unstyled, or structurally unreachable:

| state | status |
|---|---|
| async / unhandled rejection | **not caught.** `onErrorCaptured` does not receive floating promise rejections; no `window.onunhandledrejection` wire exists. The API-bound failures in Browse / Library / Admin — the most likely real failures — never reach this boundary. Its stated job is not its actual coverage. |
| repeat failure | none — see D-3 |
| error during reset | none |
| empty / missing `detail` | `v-if` at line 27 is effectively dead (D-8) |
| overflowing `detail` | `overflow: visible`, and `pageCanScroll: false` measured at 720×450 (`EB-probe3.json → zoom200`). Content longer than the band escapes with no scroll and no clip indication. |
| RTL | broken — D-10 |
| forced-colors | no non-colour failure register beyond the prose; the glyph is `aria-hidden` |
| 200% zoom | no proportion — D-9, `EB10` |
| dark | fails all three contrast floors — D-4 |
| focused | invisible — D-7(b) |
| hovered / pressed / disabled | delegated to the glass-ui Button — the one clean axis |

---

## D-16 · INFO · Zero tracked frames — this component has never been in the visual register

`VISUAL-CONSTITUTION.md §8`: *"A visual claim without a tracked frame pair and a named
geometry/color/timing/interaction delta is incomplete."*

`REPORT.md` covers 15 routes × 4 matrices = 60 captures, plus `rtl-*`, `forced-colors-*`,
`reduced-motion-*`, `keyboard-focus-*`, `zoom-200-*` — **ten matrices, and the caught state appears
in none of them** (`blankOrNearBlank: 0`, `pageErrors: 0`). The only pre-existing frame of this
component in the whole tranche is filed under a different component
(`../Markdown/evidence/E6-doc-load-failure-whole-route-collapse.png`), where it was captured as a
side effect of auditing something else — and it shows the D-1 defect plainly, unremarked.

A surface carrying this much design prose (lines 2-14 and 79-86 are 22 lines of rationale for an
87-line file) and **zero** rendered frames is how D-1 shipped. The prose was the evidence.

---

## What is *not* defective

Stated as positive evidence, not as absence of a finding:

- **Vue 3.5 idioms (edict 7)** — `useTemplateRef<HTMLElement>("alertRef")` at line 57 (not the
  legacy `ref` + string), reactive props destructure with defaults at lines 43-51 (not
  `withDefaults`), type-only `defineProps`/`defineEmits`. Correct on all three counts.
- **`verbatimModuleSyntax` (edict 8)** — the file has no type-only imports to mark; lines 39-41
  import only runtime values (`ref`, `nextTick`, `onErrorCaptured`, `useTemplateRef`,
  `CircleAlert`, `RotateCcw`, `Button`). Nothing to violate.
- **`Button` provenance** — `../ui/button` is a one-line re-export of the producer
  (`demo/ui/button/index.ts`: `export { Button } from "@mkbabb/glass-ui";`), so the *component*
  boundary is respected. Only its *styling* is overridden per-instance (D-6).
- **No god module, no legacy shim** — the file is 87 lines, single-purpose, with no aliases,
  dual paths or back-compat arms. Edicts 1 and 2 are clean except for the `--ink-muted` fallback
  (D-11).
- **`return false` in `onErrorCaptured`** (line 68) correctly halts propagation to
  `app.config.errorHandler`, which is what a boundary that owns the failure should do.

---

## Family grouping — the defects are four mechanisms, not sixteen

| family | mechanism | findings |
|---|---|---|
| **F1 — the boundary replaced a stage instead of occupying a seat** | it displaces `.pane-container`, inheriting its obligations but none of its contract: no stacking layer, no material tier, no proportion, no transition grammar | D-1, D-2, D-4, D-9, D-13 |
| **F2 — the recovery affordance is decorative** | `reset()` changes no input; focus and announcement are aimed at the container rather than the verb | D-3, D-7, D-14 |
| **F3 — the plate is a fork of `EmptyState`, not a use of it** | copied composition, drifted magnitudes, cloned CSS, per-instance overrides where the root should own the style | D-5, D-6, D-10, D-11, D-12 |
| **F4 — the design was written, not rendered** | token names and prose stood in for measured pixels; ten visual matrices contain zero frames of this surface | D-8, D-15, D-16 |

**One cure closes F1 whole:** move the boundary inside `PaneSlot` so the failing pane's own seat
renders the fallback. That single transposition supplies the stacking layer (D-1), scopes the
blast radius and lets a route discharge the state (D-2), supplies the glass material and therefore
the certified contrast referent (D-4), restores the content-hug (D-9), and inherits the `vj-enter`
grammar (D-13). **A second cure closes F3 whole:** render `EmptyState variant="error"` instead of
mirroring it.

---

## Ranked

| # | ID | Severity | One line |
|---|---|---|---|
| 1 | D-1 | BLOCKER | the plate's ink paints under the atmosphere canvas — the shipped caught state is a wordless button |
| 2 | D-2 | BLOCKER | one throw bricks all 15 routes permanently; the dock keeps accepting navigation that does nothing |
| 3 | D-3 | BLOCKER | "Try again" re-throws on the same tick and re-steals focus |
| 4 | D-4 | MAJOR | no material tier → 5 of 6 measured contrasts fail; all three fail in dark |
| 5 | D-6 | MAJOR | Fraunces on two Plus-Jakarta roles, caused by a per-instance class on a glass-ui root |
| 6 | D-7 | MAJOR | focus thrown to an unnamed 1408×804 container whose ring is itself occluded |
| 7 | D-5 | MAJOR | a fork of `EmptyState`'s error variant with five drifted magnitudes and cloned CSS |
| 8 | D-9 | MAJOR | `h-full w-full` gives a content-hug plate 93.6% empty acreage at 1440×900 |
| 9 | D-8 | MAJOR | raw stack traces shipped as centre-set, unbounded, non-isolated body copy |
| 10 | D-10 | MINOR | physical `mr-1.5` collapses the RTL icon gap to 0px |
| 11 | D-11 | MINOR | `--ink-muted` masking fallback re-admits the 3.84:1 defect, ×11 sites |
| 12 | D-13 | MINOR | an unmanaged full-slab jump-cut in a fully choreographed app |
| 13 | D-14 | MINOR | the whole public API is inert at the sole call site |
| 14 | D-12 | MINOR | `.vj-error-boundary` is a dead class hook |
| 15 | D-15 | INFO | 2 of ~14 states designed; async failures never reach the boundary at all |
| 16 | D-16 | INFO | zero tracked frames across ten visual matrices |

---

## Seat compliance

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/**`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. All writes are confined to
`docs/tranches/V/megatranche/audit/components/ErrorBoundary/`. Browser probes were read-only
against the live dev server; the two runtime `style.position` mutations (D-1 cure test, and the
lift applied before contrast sampling) were in-page, per-navigation, and reverted or discarded
with the browser context.
