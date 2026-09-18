# CHALLENGE-D — `demo/color-picker/ErrorBoundary.vue` — the design is flawed (round 2)

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the tier this seat was
explicitly spawned with. The declaration is named in my spawn prompt and matches the model I am;
nothing was inherited from a parent seat and no tier substitution occurred.

## Round note

A round-1 CHALLENGE-D report existed at this path (written 2026-07-28 11:37). I preserved it
verbatim at `challenge-D-design-r1.md` before writing — nothing is lost. This is an **independent
second audit** (EDICT E-1, twice-audit). It re-derives r1's central claim by a stronger,
**mutation-free** method, overturns one of r1's mechanism attributions, and adds five findings r1
did not reach — including the one I judge to be the root defect of the whole surface.

All my measurements are fresh, from my own probes:

| probe | what it settles |
|---|---|
| `r2-paint.mjs` → `evidence-r2/R2-paint.json` | does the ink paint **at all**, with zero mutation |
| `r2-probe.mjs` → `evidence-r2/R2-measurements.json` | contrast across **four user seeds**; mobile tap target; motion inventory; reduced-motion arm |
| `r2-retry.mjs` → `evidence-r2/R2-retry.json` | retry behaviour, focus, escape-hatch census, route discharge |

Frames: `evidence-r2/R2-shipped-desktop-1440-light.png`, `R2-lifted-desktop-1440-light.png`,
`R2-seed-{default,crimson,paper,ink}-lifted.png`, `R2-after-route-change-gradient.png`.

Reproduction for every finding (WebKit/Safari engine, live dev server at `:9000`):

```js
await page.route(/AboutPane\.vue/, (r) => r.abort("failed"));   // or /\/assets\/docs\/[a-z-]+\.md/
await page.goto("http://localhost:9000/#/");                     // desktop ≥1024w, aspect ≥1.1
// → the About pane's async chunk rejects → onErrorCaptured fires → the boundary paints
```

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component asserts its own thesis in its first three lines
(`ErrorBoundary.vue:2-3`): *"a focus-managed, SR-ANNOUNCED error boundary — **NEVER a silent
white-screen dead plate**."*

`R2-shipped-desktop-1440-light.png` is the shipped caught state at 1440×900 light, captured with
**zero page mutation**. It is a wordless glass pill floating in an empty pink field. The alert
glyph, the statement of failure and the machine truth are all in the DOM at `opacity: 1`,
`visibility: visible`, with real rects — and contribute **zero pixels**.

But the occlusion is the symptom, not the disease. The disease is that this plate was designed
as *prose* rather than as a *composition*: it is a nineteenth surface in a constitution that
declares its composition inventory closed at eighteen (§3.1/§4), and it therefore has no
protagonist, no region ratio, no Card decision, no material tier and no boundary/reserve
inventory. Everything below follows from that one absence — including the finding I consider
strongest, which no amount of CSS can fix: **on this surface, whether the user can read that
something has failed is a function of the colour the user happened to pick.**

---

## D2-1 · BLOCKER · The failure register's legibility is a free variable of user input

This is the strongest defect on the surface and it is new to this round. r1 measured contrast at
one seed in two schemes; the seed is the variable that matters.

The plate paints directly onto the ambient aurora field, whose colour derives from the user's
active colour. So the plate's **ink** is bound to the colour scheme, and its **ground** is bound
to the seed. These two are independent. There is no value of the ink that satisfies all values of
the ground.

**Measured** — `evidence-r2/R2-measurements.json → seeds`. The plate is lifted above the canvas
(otherwise nothing paints at all, D2-2), the ink is then hidden and each child's exact rect is
screenshot-clipped and averaged, so the backdrop is the **real composited pixels**, not a token:

| seed (`?space=hex&color=`) | `--accent-live` | statement ink | ground | statement CR | glyph ink | glyph CR |
|---|---|---|---|---:|---|---:|
| default (shipped) | `oklch(47.09% 0.188 9.83deg)` | `rgb(28,25,23)` | `rgb(242,92,163)` | 5.69 | `rgb(219,36,36)` | **1.60** |
| `#e11d48` crimson | `oklch(42.99% 0.172 17.58deg)` | `rgb(28,25,23)` | `rgb(229,22,117)` | 3.92 | `rgb(219,36,36)` | **1.10** |
| `#fafaf9` paper | `oklch(44.64% 0.0013 106.4deg)` | `rgb(28,25,23)` | `rgb(164,164,163)` | 7.01 | `rgb(219,36,36)` | **1.96** |
| `#0b1020` ink | `rgb(11 16 32)` | `rgb(28,25,23)` | `rgb(53,73,96)` | **1.89** | `rgb(219,36,36)` | **1.86** |

Floors: the statement measures Fraunces **25.888px / w700** (`R2-paint.json → meta.fonts.msg`),
which is large text → 3.0:1. The `CircleAlert` is a graphical object → 3.0:1.

- The statement **fails at the `ink` seed: 1.89:1 against a 3.0 floor.** A user who is working on
  a dark navy cannot read the sentence telling them the app broke.
- The destructive glyph — the *only* non-textual failure register on the surface — **fails at all
  four seeds**, worst 1.10:1.
- The crimson case is the design in miniature: `evidence-r2/R2-seed-crimson-lifted.png`. The
  semantic failure colour and the user's chosen colour are in the same hue family, so the alert
  glyph dissolves into the field. **The register that means "something is wrong" is erased by the
  thing the product exists to let you choose.**
- The `ink` case, `evidence-r2/R2-seed-ink-lifted.png`: near-black Fraunces on a dark blue-grey
  field; the Fira detail line is effectively gone.

**Against canon, verbatim.**

- `VISUAL-CONSTITUTION.md §2`: *"One surface has one tier."* — This surface has none.
- `VISUAL-CONSTITUTION.md §2`: *"Seed tint is forbidden outside the ambient field, active accent,
  WatercolorDot/specimen, and pastel Palettes lanes."* — The plate's ground **is** the ambient
  field, so every glyph and every word on it is read against seed tint.
- `VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast
  **on the actual material tier**; a token name is not evidence."* — `ErrorBoundary.vue:12-14` and
  `:79-86` are 22 lines offering token names as evidence: *"the certified `--ink-muted`
  de-emphasis rung"*, *"this new surface adds NO sub-floor contrast debt"*. The certification for
  that rung is against *"the live **resting plate**"* — a referent that does not exist here.
- `VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are
  never colour-only."* — Satisfied only in the a11y tree (`role="alert"`); visually the failed
  state is colour-only, and the colour is uncertifiable.

**Proposed cure — architectural, not a patch.** No token, no alpha and no `@media` arm can close a
contrast whose ground is unbounded user input. The plate must acquire a **tier**: seat the
fallback on a real producer material so its ground is the neutral Structural-glass/Specimen-well
family the constitution already defines (`@mkbabb/glass-ui@7.0.0` exports `./surface` and `./card`
— confirmed in its `package.json` `exports`). D2-7's cure supplies this for free.

---

## D2-2 · BLOCKER · The plate's ink paints under the atmosphere canvas — proven without touching the page

r1 reached this conclusion via a runtime `style.position = "relative"` cure test. That is a
mutation, and a single intervention. I settled it three ways, the first of which changes nothing:

**Method.** For a given child's exact rect, screenshot-clip it and count pixels within Euclidean
RGB distance 60 of that child's own computed ink colour, and record the darkest luma present.
Dark ink `rgb(28,25,23)` on a hot-pink field is unmistakable if it paints.

`evidence-r2/R2-paint.json`:

| intervention | statement rect (16,020 px) | glyph rect (784 px) | button rect (4,464 px) |
|---|---:|---:|---:|
| **shipped — no mutation at all** | **0 near-ink px (0.000%), min luma 128.0** | **0 near-ink px (0.000%), min luma 128.7** | 237 px (5.309%), min luma 25.5 |
| boundary `position: relative` | 3,089 px (19.282%), min luma 25.5 | 154 px (19.643%) | 237 px (5.309%) — unchanged |
| canvas `display: none`, boundary left `static` | 3,016 px (18.826%), min luma 25.5 | 124 px (15.816%) | — |

The darkest pixel anywhere in the shipped statement rect has luma 128 — mid-pink. Not one pixel of
that sentence reaches the page. Two **mutually exclusive** interventions each restore it: lift the
plate, *or* remove the canvas. That is a controlled identification of the occluder, not an
inference.

**Mechanism.** CSS 2.1 Appendix E painting order: non-positioned in-flow inline content paints at
step 5; positioned descendants with `z-index: auto` paint at step 8. From `R2-paint.json → meta`:

```json
"boundary": { "position": "static",   "zIndex": "auto", "opacity": "1", "visibility": "visible" },
"msg":      { "position": "static",   "zIndex": "auto" },
"svg":      { "position": "static",   "zIndex": "auto" },
"btn":      { "position": "relative", "zIndex": "auto", "contain": "paint" },
"canvas":   { "position": "absolute", "zIndex": "auto" },
"canvasRect": { "x": 0, "y": 0, "width": 1440, "height": 900 }
```

`.atmosphere-canvas` (`App.vue:9-17`) is absolutely positioned and covers the whole viewport with
an opaque aurora gradient, so it paints over every static child of the boundary. The glass-ui
`Button` is `position: relative`, so it alone survives — which is precisely why the shipped frame
is *one pill and nothing else*.

**Why the panes never had this problem.** The element the boundary displaces carries a stacking
contract the boundary does not: `demo/styles/shell.css:74` `.pane-container { position: relative; }`
and `:94-96` `.pane-wrapper--left { z-index: 1; }` — the latter's own comment explains that DOM
order alone was already burying content and that *"the slot assigns the layer"*. `App.vue:50`
wraps `.pane-container`; on catch, `v-if`/`v-else` swaps that positioned element for a bare static
div. **The boundary inherited the seat's obligations without inheriting the seat's contract.**

**Why every automated check says this is fine.** `getBoundingClientRect`, `getComputedStyle`,
`elementFromPoint`, `textContent` and the accessibility tree all report a healthy plate. The
canvas is `pointer-events: none` (`App.vue:11`) so it is transparent to hit-testing but not to
painting. Only pixels disagree — and no gate in the repo looks at pixels here (D2-9).

**Proposed cure.** Not `position: relative` on the div — that patches the symptom and leaves the
plate tierless. See D2-7.

---

## D2-3 · BLOCKER · The boundary hand-rolls, at the wrong altitude and worse, a primitive Vue already ships per-pane

New this round, and the reason F2 ("the recovery affordance is decorative") exists at all.

Every scene in the app is an async component:

```
demo/shell/usePaneRouter.ts:69-78
const AboutPane   = defineAsyncComponent(() => import("../scenes/about/AboutPane.vue"));
const PalettesPane= defineAsyncComponent(() => import("../palettes/PalettesPane.vue"));
… 10 panes, every one a bare loader function.
```

Vue 3.5's `defineAsyncComponent` accepts an options object —
`{ loader, loadingComponent, errorComponent, delay, timeout, onError(err, retry, fail, attempts) }`
— which supplies, **per pane and by construction**, exactly the four things this surface is missing:

| what the boundary lacks | what the bypassed primitive provides |
|---|---|
| a retry that retries | `onError`'s `retry()` — re-invokes the loader with a fresh attempt counter |
| per-pane blast radius | the fallback replaces *that* pane, inside its own `PaneSlot` seat |
| a loading state | `loadingComponent` + `delay` |
| a failure state for a chunk that never resolves | `timeout` |

None of the ten call sites passes any of them. So the app hand-rolled a **global** boundary at the
`<main>` altitude which has no `retry()` to call, no attempt count, and no timeout — and the one
verb it offers is the one the framework would have supplied working.

The consequence of the missing `timeout` is a state no one designed: **a chunk request that hangs
rather than rejects produces no error, so the boundary never fires and the user sits in front of a
permanently empty pane band.** The boundary's existence conceals that this state is unhandled.

Owner edict 3 (KISS, no contrivance) and edict 4 (reuse the system's own primitive rather than
re-implementing it locally) — here the "design system" whose boundary is crossed is Vue itself.

**Proposed cure.** Move failure handling to the seam that owns the failure: give `usePaneRouter`'s
ten async panes the options form, with one shared `errorComponent` and `loadingComponent`, and let
`onError`'s `retry` back the retry verb. `ErrorBoundary` then either dies, or shrinks to the
last-resort root boundary it should have been (see D2-7).

---

## D2-4 · MAJOR · A caught error is a terminal state: zero exits, and the shell lies about it

`evidence-r2/R2-retry.json`, all measured in one session:

```json
"beforeRetry": { "boundaryUp": true, "paneContainerPresent": false,
                 "activeElement": "DIV.vj-error-boundary",
                 "dockPressed": ["Home=closed","Tools=false","Picker=true","About=false", …] },
"afterRetry":  { "boundaryUp": true, "paneContainerPresent": false,
                 "activeElement": "DIV.vj-error-boundary", "activeIsButton": false },
"escape":      { "tabbablesInsideBoundary": ["BUTTON:Try again"],
                 "linksOut": 0, "anyReloadAffordance": false },
"afterRouteChange": { "hash": "#/gradient", "boundaryUp": true, "paneContainerPresent": false }
```

Four measured facts, each its own defect:

**(a) The retry does not recover, and it steals focus back.** After clicking the sole affordance
the boundary is still up and `document.activeElement` is the container again, not the button
(`activeIsButton: false`). `reset()` (`ErrorBoundary.vue:71-75`) clears `caught`, the `v-else`
slot re-mounts with byte-identical props, the same failure re-throws, `onErrorCaptured` re-fires,
and `nextTick(… focus())` (line 64) drags focus off the verb the user just pressed — re-firing the
assertive alert. `VISUAL-CONSTITUTION.md §5.1` gives the focus-restoration contract as *"exact
connected opener… otherwise the nearest surviving owning action"*; this does the opposite.

**(b) `linksOut: 0`.** There is not one `<a href>` in the entire document in the caught state.
The only tabbable element inside the boundary is the dead button. A keyboard user has literally
nowhere to go.

**(c) Navigation does not discharge it.** `#/gradient` — hash updated, `boundaryUp: true`,
`paneContainerPresent: false`. Frame: `evidence-r2/R2-after-route-change-gradient.png`. `caught`
(`ErrorBoundary.vue:55`) is written on catch and cleared only in `reset()`; nothing watches the
route, and because the slot sits in the `v-else` arm (line 35) a route change re-renders nothing.

**(d) The shell reports a state it is not in.** The dock still renders `Picker=true` while
`.pane-container` does not exist. The dock accepts navigation, updates the hash, moves its
selected indicator — and the scene never changes. `PROPORTION-AUDIT.md` PR-08 dispositions this
class as **ADD-AFFORDANCE — "Persistent entity status/recovery"**; `VISUAL-CONSTITUTION.md §5`:
*"Persistent operation state stays with the entity/workspace. A transient flourish may celebrate
success but never carries the only truth."* Here the *dock* carries a truth that is false.

*(Correction to r1: r1's D-3 attributed the failed retry to "a deterministic failure re-throwing
in the same tick". My network trace shows the loader **is** re-invoked, so the honest mechanism is
simply that `reset()` changes no input — same specifier, same props, same state — and therefore
cannot change the outcome. r1's stronger claim about module-map caching is not supported by my
trace and should not be carried forward.)*

---

## D2-5 · MAJOR · The copy is wrong for the failure that actually occurs

`R2-paint.json → meta.boundaryText`, live:

> "This panel hit an unexpected error." · "Importing a module script failed." · "Try again"

Three sentences, three faults:

1. **"This panel" is false.** Both panes and the whole route died — measured
   `paneContainerPresent: false`. The copy scopes the damage to a panel while the boundary sits at
   `App.vue:50` around the entire grid. The user is told something smaller than what happened.
2. **The machine truth is a developer sentence, not a user's.** *"Importing a module script
   failed"* is the single most likely real production failure (a stale chunk after a deploy) and it
   is rendered verbatim, centre-set, in Fira Code, with no interpretation. `ErrorBoundary.vue:61`
   — `err instanceof Error ? err.message : String(err)` — is unbounded and unfiltered, so at other
   failure sites this same slot ships a raw stack trace as centred body copy with no clamp, no
   disclosure, no LTR isolation (`VISUAL-CONSTITUTION.md §6.1` requires provenance in
   LTR-isolated spans) and no copy affordance for the one genuinely useful artefact on screen.
3. **"Try again" names an action that does not exist.** For a failed module import the recovery is
   a reload; `anyReloadAffordance: false`. The verb is not merely broken (D2-4a) — it is the
   *wrong verb* for the failure it is most often shown for.

`VISUAL-CONSTITUTION.md §3.1` names *"unsupported/corrupt storage recovery"* as a composition
requiring its own ratified frames — the product's canon does treat recovery copy as designed
matter. This copy was not designed; it was defaulted.

---

## D2-6 · MAJOR · The Fraunces retry verb is a seven-site family, not a one-off

```
$ grep -rn 'variant="outline" size="sm" class="font-display' demo/ --include='*.vue'
demo/color-picker/ErrorBoundary.vue:30
demo/palettes/browser/admin/AdminAuditPanel.vue:49
demo/palettes/browser/admin/AdminUsersPanel.vue:58
demo/palettes/browser/admin/AdminTagsPanel.vue:75
demo/palettes/browser/admin/AdminNamesPanel.vue:37
demo/palettes/browser/admin/AdminNamesPanel.vue:87
demo/palettes/browser/admin/AdminFlaggedPanel.vue:29
```

Measured consequence (`R2-paint.json → meta.fonts.btn`): the button label renders
**Fraunces 16.4px w500**. `VISUAL-CONSTITUTION.md §4` assigns *"control or label, including
dropdown options → `text-small` → Plus Jakarta Sans, non-bold"*, and states the matrix *"is closed
across all eighteen compositions"* with P019's Picker pair as the sole exception. Seven controls
are outside it, by the same three words pasted seven times onto a glass-ui root.

This is owner edict 5 (root-level styling; never per-instance overrides) and
`PROPORTION-AUDIT.md §3` (*"Multiple instances sharing one cause share one family row plus an
exhaustive site list"*) — so it must be dispositioned once, for all seven, not fixed here.

*(Correction to r1: r1 filed this as ErrorBoundary's own invention. It is not — it is the seventh
copy of a house idiom. The correct disposition is a glass-ui Button variant or one root rule, and
the exhaustive site list above.)*

`ErrorBoundary.vue:30` carries a **second** per-instance override on the same element, `mt-1`, with
its own measured consequence. Child rects from `R2-paint.json → meta.rects`: glyph bottom 437 →
statement top 449 = **12px**; statement bottom 485 → detail top 496 = **11px**; detail bottom 519 →
button top 535 = **16px**. The plate's own `gap-3` rhythm is broken at exactly one interval, with
no rationale anywhere in the file.

---

## D2-7 · MAJOR · This is a nineteenth composition in an inventory the constitution closed at eighteen

This is the root. Every other finding is downstream of it.

`VISUAL-CONSTITUTION.md §3.1` requires that `OPTICAL-BENCH-COMPOSITIONS.md` ratify *"one
low-fidelity and one real-rendered composition for **each of these eleven members plus Users,
Names, Audit, Flagged, Tags, Account and unsupported/corrupt storage recovery** before feature
styling proceeds"* — and specifies that a composition counts only when it has *"a separately named
frame and separately measured protagonist, region ratio, collapse behavior, mobile sequence, Card
decision, exact boundary/reserve inventory and main-landmark count."* §4 then closes the type
matrix *"across all eighteen compositions."*

The caught-error plate is a full-viewport surface that can replace **any** of those eighteen, and
it is in the inventory of none. It consequently has:

- **no protagonist** — `PROPORTION-AUDIT.md §5.2` requires one per surface;
- **no region ratio** — it is `h-full w-full` (`ErrorBoundary.vue:18`), so it is whatever the band
  is. Measured at 1440×900: boundary `1408 × 804 = 1,132,032 px²` = **87.3% of the viewport**,
  carrying an ink hull of `445 × 162 = 72,090 px²` = **6.4% ink density**
  (`R2-paint.json → meta.rects`, `meta.boundaryRect`). `VISUAL-CONSTITUTION.md §3.2`: *"Empty
  secondary content occupies at most a narrow invitation tray (≤15% of the stage) or disappears.
  It never receives half the viewport."* The species it copies is a content-hug — `EmptyState.vue:16`
  is `py-8` with no `h-full`;
- **no Card decision and no material tier** — hence D2-1;
- **no boundary/reserve inventory** — hence the `.vj-error-boundary` class hook that no stylesheet
  in the repo targets (`grep -rn "vj-error-boundary" demo/ src/ e2e/ test/` → one hit, its own
  declaration): the ghost of a material that was never specified;
- **no main-landmark or heading decision** — the plate contains zero headings, and `REPORT.md`'s
  per-capture table measures `h1 = 0` on all 60 captures, so the failure statement has no
  heading-level entry point and cannot borrow one from the route either.

Instead of a composition, the file carries 22 lines of design prose (`:2-14`, `:79-86`) in an
87-line file — 25% of the source is rationale. `VISUAL-CONSTITUTION.md §8`: *"A visual claim
without a tracked frame pair and a named geometry/color/timing/interaction delta is incomplete."*

**Proposed cure — one transposition closes most of this file.** Render the fallback **inside the
pane seat**, not in place of it: move failure handling into `PaneSlot`/`usePaneRouter` (D2-3's
cure gives the plumbing), and render `EmptyState variant="error"` as its body. The seat supplies
the stacking layer (D2-2), the glass material and therefore a certifiable contrast referent
(D2-1), the `cqi` container, the content-hug proportion, and the `vj-enter` grammar (D2-9); the
shared atom supplies the composition. `ErrorBoundary` then reduces to a last-resort root boundary
around `<App/>` at the mount — which is where a *global* boundary actually belongs, and which is
independently argued in `../picker-componentsliders/challenge-L-library.md:117`.

---

## D2-8 · MINOR · The fork of `EmptyState`, re-measured

`ErrorBoundary.vue:12` declares the composition *"mirrors EmptyState's `error` variant"*. It is a
copy with drift on every magnitude:

| quantity | `EmptyState.vue` error arm | `ErrorBoundary.vue` | Δ |
|---|---|---|---|
| flex gap | `gap-2.5` (10px) — line 16 | `gap-3` (12px) — line 18 | +2px |
| block padding | `py-8` (32px) — line 16 | `py-10` (40px) — line 18 | +8px |
| glyph | `w-6 h-6` — line 19 | `w-7 h-7` — line 23 | +4px |
| statement measure | `max-w-[26ch]` — line 20 | `max-w-[28ch]` — line 24 | +2ch |
| detail measure | `max-w-[44ch]` — line 23 | `max-w-[46ch]` — line 27 | +2ch |
| block sizing | none (content-hug) | `h-full w-full min-h-0` — line 18 | the D2-7 defect |
| `.plate-ink` rule | lines 102-104 | lines 84-86 | **byte-identical clone** |
| props idiom | `withDefaults` — line 72 | reactive destructure — line 43 | two idioms for one species |

No rationale for any of the five magnitudes appears in either file. `EmptyState` is declared *"the
ONE shared empty atom (8 consumers incl. the admin walls), so every consumer inherits the cure"*
(`EmptyState.vue:98-100`), and it already accepts everything this needs: `variant="error"`,
`message`, `detail`, `#action` (`EmptyState.vue:14-27`). Forking it means the next contrast or
type cure to the shared atom will silently miss the one surface that appears when everything has
gone wrong. Owner edict 3.

Related, and also inherited rather than invented: `var(--ink-muted, var(--muted-foreground))`
(`ErrorBoundary.vue:85`) is a masking fallback (edict 2) whose fallback arm restores the exact
static token `EmptyState.vue:50-53` records as measuring **3.84:1**, below the 4.5:1 floor — i.e.
it silently re-admits the defect the certified rung exists to cure. It appears at eleven
declarations across seven SFCs; the disposition is one root `@utility` in `demo/styles/` with no
fallback arm, so a missing rung reads as the boot failure it is.

---

## D2-9 · MINOR · Motion — measured, and the absence is total

Measured (`R2-measurements.json → motion`, mobile 390×844, caught):

```json
"boundary": { "animationName": "none", "transition": "all 0s", "running": [] },
"button":   { "animationName": "none",
              "transitionProperty": "background-color, border-color, box-shadow, color, opacity, scale",
              "transitionDuration": "0.2s ×6", "running": [] }
```

Reduced-motion arm (`reducedMotion: "reduce"`, desktop, caught): `boundaryAnimations: 0`,
`document.getAnimations()` → `[]`.

Read together:

- **The plate has no motion at all.** Not tokenized, not ad hoc — absent. Every `PaneSlot` arrives
  through `transition-name="vj-enter"` plus the `appear` plate-land grammar (`App.vue:87,106,132`;
  `composables/boot/overture.css`); the boundary neither adopts that grammar nor deliberately
  declines it. The entire two-pane scene vanishes and a plate appears in the same frame, with no
  entry and no exit on `reset()`. `VISUAL-CONSTITUTION.md §6`: *"A scene swap preserves the
  specimen and changes the surrounding instrument. **No full-slab remount hole**, rAF-delayed
  blank, or dock collapse."* This is exactly a full-slab remount hole — the one transition in the
  product that most needs to be legible is the only one nobody designed.
- **`prefers-reduced-motion` is satisfied vacuously**, not by design. Zero animations means
  nothing to reduce. This is a true statement about the current file and must not be read as
  compliance: the moment D2-7's cure gives the plate the `vj-enter` grammar, PRM becomes a real
  obligation, and `demo/styles/animations.css:184`'s blunt duration-override guard is already
  known to be structurally unreachable for scroll-driven declarations (MT-F023).
- **Positive finding:** the only motion in the caught state is the glass-ui Button's own transition
  set, and every property in it (`background-color, border-color, box-shadow, color, opacity,
  scale`) is paint/composite-only. **No layout-forcing property animates.** Owner edict 6 is not
  violated: no animation was deleted, none was ever authored.

---

## D2-10 · MINOR · Focus is thrown to an 1408×804 unnamed container whose ring does not paint

Measured (`R2-retry.json`, `R2-paint.json → meta.boundaryRect`): `activeElement` is
`DIV.vj-error-boundary`, rect `1408 × 804`.

- **The focus target is the whole scene band.** `R2-seed-crimson-lifted.png` and
  `R2-seed-ink-lifted.png` show the resulting WebKit ring as a blue rectangle enclosing 87% of the
  viewport. A focus indicator the size of the stage is not an indicator.
- **In the shipped state it does not paint at all** — it is drawn on the `position: static` div and
  is occluded exactly as the ink is (D2-2). The sighted keyboard user's focus simply disappears.
  `VISUAL-CONSTITUTION.md §4.1`: *"Focus remains visibly distinct from selection in both schemes,
  forced colors and reduced transparency."*
- **Announce-and-move race.** `role="alert"` already implies `aria-live="assertive"` and
  `aria-atomic="true"`, so the explicit `aria-live="assertive"` (line 20) is redundant; the defect
  is doing both — firing an assertive alert *and* moving focus into that same region (lines 62-64).
  Under D2-4a this repeats on every failed retry.
- **No name, no heading.** `aria-label: null`, `aria-labelledby: null`, `headingsInside: 0`.

**Cure.** Announce through the `role="alert"` region; move focus to the **named recovery control**,
which carries its own accessible name and the producer's `focus-ring`. Drop `aria-live`, drop
`tabindex="-1"`, drop the container `focus()`.

---

## D2-11 · MINOR · Shell-level concern filed under a route directory

`ErrorBoundary.vue` lives in `demo/color-picker/` — the directory that holds `App.vue`,
`index.html`, the router and the favicon. The shared plate species lives in `demo/shared/ui/`
(`EmptyState.vue`, `PaneHeader.vue`); the slot, router and view schema live in `demo/shell/`
(`PaneSlot.vue`, `usePaneRouter.ts`, `useViewManager.ts`). The boundary wraps the shell's `<main>`
grid, is consumed only by the shell, and is a peer of `PaneSlot` in every respect. Filing a
shell-level failure composition under a *route* directory is the organisational shadow of D2-7:
it was never treated as a composition, so it was never given a home among the compositions.

---

## State coverage — 3 of ~16 designed, measured

| state | status | evidence |
|---|---|---|
| pass-through (no error) | designed | `ErrorBoundary.vue:35` |
| caught, first time | **designed but does not paint** | D2-2 |
| hovered / pressed / disabled on the verb | **designed** — delegated wholly to the glass-ui Button | `R2-measurements.json → motion.button` |
| loading (async chunk in flight) | **not designed** — no `loadingComponent`, no `delay` | `usePaneRouter.ts:69-78` |
| chunk hangs, never rejects | **structurally unreachable** — no `timeout`; boundary never fires | D2-3 |
| async / unhandled rejection | **not caught.** `onErrorCaptured` does not receive floating promise rejections and no `window.onunhandledrejection` wire exists — so the API-bound failures in Browse / Library / Admin, the most likely real failures, never reach this boundary | `ErrorBoundary.vue:59-69` |
| repeat failure | **not designed** — same copy, same dead verb, focus re-stolen | D2-4a |
| error thrown during `reset()` | **not designed** | — |
| route change while caught | **broken** — state does not discharge | D2-4c |
| overflowing `detail` | **not designed** — no clamp, no disclosure, no truncation | D2-5 |
| empty `detail` | the `v-if` at line 27 is effectively dead: an `Error` always yields a non-empty `message`, and `String(err)` is never `""` | `ErrorBoundary.vue:27,61` |
| dark scheme | fails — the ground does not darken with the scheme | D2-1 |
| **arbitrary user seed** | **fails — the register is a free variable** | **D2-1** |
| focused | ring does not paint; target is the stage | D2-10 |
| RTL | `mr-1.5` (`ErrorBoundary.vue:31`) is physical, not logical — in RTL the 6px lands outside the icon and the icon jams the label. `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout \| logical inline/block direction follows the document."* Cure `me-1.5`, better still a producer-owned icon-slot gap | — |
| reduced-motion | vacuously satisfied — zero animations | D2-9 |
| forced-colors | no non-colour failure register beyond the prose; the glyph is `aria-hidden` | D2-1 |
| 200% zoom | no intrinsic proportion; the plate is whatever the band is | D2-7 |
| mobile tap target | **PASS** — the sole recovery control measures 159.2 × 54 CSS px at 390×844, above the 44px floor, with accessible name "Try again" | `R2-measurements.json → mobileTap` |

---

## What is *not* defective — stated as positive evidence

- **Mobile tap target.** 159.2 × 54 px, `meets44: true`, accessible name present. Notable because
  `REPORT.md` reports `smallTapTargets` on **all 60** captures elsewhere in the app; this control
  is not among them.
- **Motion hygiene.** The only animated properties in the caught state are
  `background-color, border-color, box-shadow, color, opacity, scale` at 0.2s — all paint/composite,
  none layout-forcing.
- **Vue 3.5 idioms (edict 7).** `useTemplateRef<HTMLElement>("alertRef")` (line 57), reactive props
  destructure with defaults (lines 43-51), type-only `defineProps`/`defineEmits`. Correct on all
  three counts — and *more* current than the `withDefaults` in the atom it copies.
- **`verbatimModuleSyntax` (edict 8).** Lines 39-41 import only runtime values; there is no
  type-only import to mark. Nothing to violate.
- **Producer provenance.** `../ui/button` is `export { Button } from "@mkbabb/glass-ui";`
  (`demo/ui/button/index.ts`, one line). The *component* boundary is respected; only its *styling*
  is overridden per-instance (D2-6).
- **No god module, no legacy shim.** 87 lines, single purpose, no aliases, no dual paths, no
  back-compat arms. Edicts 1 and 2 are clean except the `--ink-muted` masking fallback (D2-8).
- **`return false` in `onErrorCaptured`** (line 68) correctly halts propagation to
  `app.config.errorHandler` — the right call for a boundary that owns the failure.

---

## Family grouping — four mechanisms

| family | mechanism | findings |
|---|---|---|
| **F1 — an unratified composition** | the surface entered the product as prose, never as a composition: no protagonist, no region ratio, no Card decision, no material tier, no boundary/reserve inventory, no tracked frame | **D2-1**, D2-2, D2-7, D2-8, D2-9, D2-11 |
| **F2 — failure handled at the wrong altitude** | a global hand-rolled boundary replaced a per-pane primitive Vue already ships, so the blast radius is the app, the retry has nothing to retry, and loading/timeout states do not exist | **D2-3**, D2-4 |
| **F3 — the recovery article is decorative** | one verb that cannot recover, one focus target that is the stage, zero links out, and a shell that keeps reporting a state it is not in | D2-4, D2-10 |
| **F4 — copy and type defaulted rather than designed** | scope-false statement, untranslated machine prose, a wrong verb, and a Fraunces control label pasted across seven sites | D2-5, D2-6 |

**Two cures close nearly all of it.** (1) Move failure handling into the pane seam — options-form
`defineAsyncComponent` plus a fallback rendered *inside* `PaneSlot` — which supplies stacking
(D2-2), a material tier and therefore a certifiable contrast referent (D2-1), a real `retry()`
(D2-4a), a bounded blast radius and natural route discharge (D2-4c), content-hug proportion (D2-7)
and the `vj-enter` grammar (D2-9). (2) Render `EmptyState variant="error"` as that fallback's body
instead of mirroring it, which kills the fork, the drifted magnitudes and the cloned CSS (D2-8).
What remains after both is a genuine last-resort boundary above `<App/>` — small, honest, and in
`demo/shell/`.

---

## Ranked

| # | ID | Severity | One line |
|---|---|---|---|
| 1 | D2-1 | BLOCKER | the failure register's legibility is a free variable of the user's seed — statement 1.89:1 on a dark seed, glyph 1.10–1.96:1 at every seed |
| 2 | D2-2 | BLOCKER | zero of 16,020 statement pixels reach the page; the plate's ink paints under the atmosphere canvas |
| 3 | D2-3 | BLOCKER | a global hand-rolled boundary replaces a per-pane Vue primitive that would have given retry, loading and timeout for free |
| 4 | D2-4 | MAJOR | terminal state: retry does not recover, focus is re-stolen, `linksOut: 0`, routes do not discharge, the dock reports a scene that is not there |
| 5 | D2-7 | MAJOR | a nineteenth composition in an inventory the constitution closed at eighteen — 87.3% of the viewport carrying 6.4% ink |
| 6 | D2-5 | MAJOR | "This panel" is false, the machine truth is untranslated developer prose, and "Try again" is the wrong verb for the failure it is usually shown for |
| 7 | D2-6 | MAJOR | Fraunces on a control label, seven sites, by three pasted words on a glass-ui root |
| 8 | D2-8 | MINOR | a fork of `EmptyState`'s error variant: five drifted magnitudes, a byte-identical CSS clone, two prop idioms for one species |
| 9 | D2-9 | MINOR | an unmanaged full-slab jump-cut in a fully choreographed app; PRM satisfied only vacuously |
| 10 | D2-10 | MINOR | focus thrown to an unnamed 1408×804 container whose ring is itself occluded; announce-and-move race |
| 11 | D2-11 | MINOR | a shell-level failure composition filed under a route directory |

---

## Seat compliance

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/**`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. All writes are confined to
`docs/tranches/V/megatranche/audit/components/ErrorBoundary/` — this report, the preserved
`challenge-D-design-r1.md`, the three `r2-*.mjs` probes and `evidence-r2/`. Browser probes ran
read-only against the live dev server; the in-page `style.position` / `display:none` mutations
used in D2-2's control arms are per-navigation and discarded with the browser context, and the
shipped-state measurement that carries the finding used **no mutation at all**.
