SERVED MODEL: claude-opus-5[1m]

# X-W1 · THE INSTRUMENT-CAVEAT REGISTER (NG-12 · R37)

**Unit**: X.W1.b · **Date**: 2026-09-17 · **Substrate**: `tranche-u` @ `f62bf82b`

NG-12, verbatim: *"The instrument-caveat register is committed and **every gate
consuming a corpus measurement cites its caveat or states none applies**."* Its
falsifier: *"A gate citing a dev-server typography figure with no font caveat."*

R37's CURE-SHAPE LOCK: *"the register is a committed artifact under
`docs/tranches/X/evidence/w1/`, and every gate that consumes a corpus
measurement cites its caveat or states none applies."*

Two kinds of row live here and they are not mixed:

- **IC-1..IC-4** are R37's four INHERITED caveats — measured defects in other
  people's instruments that qualify measurements X-W1's gates will consume. Each
  is re-verified at this seat's own clock before being republished; a caveat
  carried on faith is not a caveat.
- **IC-5..IC-10** are this unit's OWN caveats — what the visual matrix does not
  see, and why. A suite that lists only other people's blind spots is not a
  register, it is an accusation.

Every row says what it QUALIFIES, so a downstream gate can cite it by id.

---

## IC-1 · Dev never loads the production font corpus — CONFIRMED at this clock

**Source**: R37 ⟨Katex R26⟩ — *"`vite-defer-glass-fonts.ts:72` guards on the dead
`demo/@/styles/style.css` (the marker is actually at `foundation.css:75`), so
**the transform can never fire** … dev serves metric-compat fallback faces
forever, so **every dev-server typography measurement in this challenge corpus
was taken without the production font corpus** — an instrument caveat X-W1 must
inherit."*

**Re-verified here, by command:**

- ⟨`sed -n '72p' plugins/vite-defer-glass-fonts.ts`⟩ →
  `if (!id.includes("demo/@/styles/style.css") || !code.includes(MARKER)) {`
- ⟨`ls -d demo/@/styles/style.css`⟩ → `No such file or directory`
- ⟨`grep -n 'MARKER' plugins/vite-defer-glass-fonts.ts`⟩ → `:46 const MARKER = "/*__GLASS_FONTS_DEFERRED__*/"`
- ⟨`grep -n '__GLASS_FONTS_DEFERRED__' demo/styles/foundation.css`⟩ → `:75`

The guard names a path that does not exist; the marker it looks for lives in a
file the guard can never match. **The transform is unreachable.** In dev the
`@import "@mkbabb/glass-ui/styles/fonts"` replacement is therefore never
injected, and the dev server renders in metric-compat fallback faces.

**QUALIFIES**: every typography reading taken against the dev server — including
**every golden this unit mints**, because `visual.config.ts` serves the dev
server. The goldens are correct for what the dev server renders; they are NOT a
statement about production typography, and a diff between a golden and a
production build that shows only glyph rasterisation is IC-1, not a regression.

**OWNER**: the fix is **X-W8**'s (`plugins/vite-defer-glass-fonts.ts` is in W1's
explicit must-NOT-add list, fold §3). W1 inherits the caveat only.

**DISCHARGED WHEN**: the guard matches the live marker path and a dev boot shows
the production faces. Re-run the four commands above.

---

## IC-2 · `content-visibility: auto` makes `scrollWidth` report the placeholder

**Source**: R37 ⟨Katex, C's measurement trap, `challenge-C:149-154`, mechanism
verified from `Markdown.vue:104-109`⟩ — *"`content-visibility:auto` makes
`scrollWidth` report the `contain-intrinsic-size` placeholder; the seat caught
its own probes' false green and wrote the rule."* Routed with R20 to X-W1 as
**gate-design canon**, not merely a ledger row.

**QUALIFIES**: any overflow, reflow or width oracle that reads `scrollWidth` /
`clientWidth` on or inside a `content-visibility: auto` subtree — including the
`overflowX` figure the shipped `capture.mjs` probe emits
(`de.scrollWidth - de.clientWidth`), which this unit read as INPUT and does not
re-publish.

**HOW THIS SUITE AVOIDS IT**: the visual matrix measures PIXELS, not geometry
properties. It takes no `scrollWidth` reading, so IC-2 does not qualify any
golden. It is recorded because the zoom-200 arm exists to witness WCAG 1.4.4
reflow, and the *next* seat that wants a number rather than a frame for that arm
must read this row first.

---

## IC-3 · `smallTapTargets` measures the PAINT, not the SC 2.5.8 target

**Source**: R37 ⟨EC-47 / L-10⟩ — the repo's probe measures the **paint** (a 12×24
thumb), not the **target**: `SliderImpl.js:46-53` shows pointerdown on any
non-thumb target captures and emits `slideStart`, so the real target is full
inline-size × 24. *"An instrument defect of the same species as the
`namelessButtons` accname miss (L-5)."*

**NOT RE-BOOKED**: the 12×24 row itself is **INFO · GLASS-OWNED · already
relayed**, and R37 says so explicitly. This register records the INSTRUMENT
defect, not the finding.

**QUALIFIES**: every `a11y.smallTapTargets` figure in
`docs/tranches/V/megatranche/audit/visual/REPORT.json` — which this unit read as
denominator evidence and does not re-publish as a measurement. No gate of this
unit consumes a tap-target figure.

---

## IC-4 · `.font-display` paint-time family is a cascade question, not a token one

**Source**: R37 ⟨Katex residue 9 / D-4⟩ — *"does `.font-display` paint Fraunces at
these five sites — token sizes proven; paint-time family is a cascade question.
**Ride the X-W1 matrix with the parameterised space/color sweep.**"*

**RIDDEN, and the result is conditioned on IC-1**: the `param-sweep` arm in
`e2e/visual/states.visual.spec.ts` captures `#/?space=…&color=…` at three spaces,
so paint-time typography is now photographed rather than inferred. But those
frames are dev-server frames, so under IC-1 they show the FALLBACK face. **The
frames answer "does the cascade reach `.font-display` consistently"; they do not
answer "is the painted family Fraunces."** The second half stays open until IC-1
is discharged at X-W8, and it is carried as such in
`docs/tranches/X/evidence/w1/visual/R54-RESIDUE-WITNESS.md`.

---

## IC-5 · The matrix does not witness aurora or blob APPEARANCE

**This unit's own.** `e2e/visual/capture.css` sets `visibility: hidden` on
`canvas.atmosphere-canvas` and `canvas.goo-blob-canvas` at screenshot time.

**Why**: both are created `preserveDrawingBuffer: false` and both run a
continuous rAF loop — measured and written down long before this wave at
`e2e/smoke/fixtures/webgl-appearance.ts` (*"after the browser composites a frame
the drawing buffer is cleared; a read landing between draws sees an empty
buffer"*). Two consecutive frames of a live aurora are never equal, so
`toHaveScreenshot`'s stabilisation loop cannot converge.

**Measured cost of NOT doing it** — run-to-run differing pixels at 3440×1440,
`/#/`, light, three cold captures: **135,255** with the canvases live versus
**48,923** with them quiesced under the same fixed settle, and **≤139** once the
quiescence predicate of IC-7 is also applied.

**What is preserved**: `visibility: hidden`, not `display: none` — the element's
box stays in flow, so a regression that MOVES, RESIZES or DROPS either surface
still reds. Only the animated interior is withheld.

**QUALIFIES**: no golden of this suite is evidence about aurora or blob
appearance. Those have their own live oracles and are not orphaned by this
choice: `e2e/smoke/webgl-atmosphere.spec.ts`, `e2e/smoke/webgl-blob.spec.ts`
(draw-count liveness), `e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts`
(pixel-read perceptibility), `e2e/smoke/atmosphere-cold-load.spec.ts`.

---

## IC-6 · Two modality arms are EMULATED and discharge no real-modality obligation

**This unit's own, under R36's law**: *"an EMULATED modality is labelled emulation
and does not discharge a real-modality obligation (real WHCM ≠ WebKit-emulated
forced colors)."* The ten-cell roster in `capture.mjs` / `states.mjs` makes the
same rule mechanical — *"a chromium emulation labelled as WHC is the I-20 failure
by name."*

| arm | fidelity | what it is | what it is NOT |
|---|---|---|---|
| `forced-colors-desktop` | **emulated** | `chromium/emulated-forced-colors` via Playwright's `forcedColors: "active"` | `windows/real-HCM`. EC-8 residue 8's ask — *"a real forced-colors cell belongs in X-W1's golden matrix"* — is **NOT discharged** |
| `zoom-200-desktop` | **emulated** | a half viewport at 2× DPR, the mechanism `states.mjs` names | real browser zoom, which is a different transform |

The label is not a note in this file: it is a field in every golden's own
filename (`…-emulated-…` / `…-real-…`), minted by `e2e/visual/fixtures.ts`, so a
cell cannot be quoted without it.

**WHAT IS DISCHARGED**: the ROUTE-CENSUS half. Both arms now run all 14 routes
instead of the shipped five, so EC-8's and MX-17's roster mis-aims are visible on
every surface that carries them (R34). The real-WHCM witness is not.

---

## IC-7 · `getAnimations()` never empties on `/#/` — a registered transition with a frozen clock

**This unit's own, and it is gate-design canon for anyone else who waits on
animations.** Measured at this clock, polling after `networkidle` + `role=main`
visible, waiting for zero running finite animations:

| viewport | `/#/browse` | `/#/gradient` | `/#/` |
|---|---|---|---|
| 390 | 3667 ms | 5819 ms | **never (20 s cap)** |
| 1024 | 2422 ms | 2424 ms | **never (20 s cap)** |
| 3440 | 2122 ms | 2730 ms | **never (20 s cap)** |

The cell that never clears is a 200 ms `transform` transition whose `playState`
reads `running` while its `currentTime` stays pinned at **0**, indefinitely. A
registered transition that never advances is not motion; it is an entry in
`getAnimations()`.

**QUALIFIES**: any gate, in this repo or a sibling, that waits for
`document.getAnimations()` to go EMPTY will hang on this app's home route. This
unit's `waitForQuiescence` therefore compares a SIGNATURE of the animation set
*including each entry's `currentTime`* across consecutive polls — "nothing is
moving", not "nothing is registered". Cost of getting it wrong, measured: 25 s
per cell against 6 s, a ~4× suite-wide penalty for no added signal.

**ROUTED ON**: the frozen-clock transition is a product observation, not a
harness one. It is not this unit's to cure (`demo/` is W1's Do-NOT-touch) and is
handed to the wave log for routing.

---

## IC-8 · The goldens are darwin goldens

**This unit's own.** Text rasterisation is an OS property; the renderer slug in
each filename pins the GL stack and says nothing about CoreText versus FreeType.
The golden path therefore carries `{platform}` (`e2e/visual/goldens/darwin/…`),
so a linux run finds NO golden and reports a missing one rather than diffing
against a baseline minted by a different text engine.

**QUALIFIES**: the CI job contract in `e2e/visual/visual.project.ts` names
`runs-on: macos-15`. Changing it to `ubuntu-latest` without minting a linux
golden set is a **G-10 failure**, not a cost saving.

---

## IC-9 · The boot choreography runs for ~13 seconds, and a fixed settle is bistable

**This unit's own.** Polling `document.getAnimations()` once a second at
3440×1440 on `/#/` after `networkidle` + `role=main` visible:

```
t+1s   31 finite animations running   (--saved-bg-0..3, four border radii ×2,
                                       plate-land, field-paint-in, 8× stagger-child-in,
                                       colour + background-colour transitions)
t+3s    3   (transform ×2, overture-plate-land)
t+5s    3   (opacity 900ms, transform ×2)
t+9s    2
t+11s   2   (grid-template-columns 300ms, opacity 300ms)
t+13s   0 finite
```

The app is still MINTING NEW finite animations at eleven seconds. A 6-second
settle photographs a mid-choreography frame, and which frame depends on host
scheduling: the same cell was measured alternating between two settled states
**10,717 differing pixels apart**.

**QUALIFIES**: any gate that photographs, measures geometry, or reads computed
style after a fixed settle window on this app. At 3440 those 10,717 pixels are
**27× G-9's 20-px injection unit** — a tolerance sized to absorb them would
absorb the injection too, and the gate would be decorative. No tolerance in this
suite is sized against a pre-quiescence figure.

---

## IC-11 · A half-pixel LAYOUT TIE at 3440 rasterises two ways for identical inputs

**This unit's own, and the most consequential measurement it took.**

The ancestor chain of the picker card at 3440×1440 on `/#/`, read six times with
every input identical:

```
main.pane-main             y = 91        h = 1341
div.pane-container--dual   y = 457.5     h = 608     ← exactly .5, ALL SIX RUNS
div.pane-wrapper--left     y = 457.016  OR  457.984  ← 4 runs / 2 runs
div.glass-resting.card     y = 457.016  OR  457.984
```

`main` is 1341 tall and the card 608, so the vertical centring leftover is **733
— odd** — and the container lands on exactly `x.5`. Chrome must then break a
LayoutUnit tie to snap the child, and it breaks it **±0.484 px
non-deterministically**. The whole 512×608 card moves one device pixel:
**10,719 differing pixels**, which is **27× G-9's 20-px injection unit**.

**Why this is the register's most important row**: a suite that met this and
reached for a bigger tolerance would have written a bar that absorbs the
injection G-9 validates it with — a decorative gate, arrived at honestly, one
measurement at a time. The bar is NOT sized against this figure. Instead
`ensureOffLayoutTie` in `e2e/visual/capture.ts` detects the condition on the
CONTAINER (whose position IS deterministic) and moves the capture viewport one
CSS pixel taller, which changes the parity of the centring leftover and leaves
Chrome no tie to break. One pixel of viewport height crosses no media query in
this app and alters no element; it is a capture geometry choice, and there is no
defect under it to mask — a half-pixel centre is ordinary CSS and the
bistability belongs to the rasteriser.

Also measured, same family: `finish()`-ing every finite animation does NOT
converge the value — it TOGGLES it (before `457.984` → after `457.015`, and the
reverse), which is what identified the cause as layout-snap rather than an
animation still in flight.

**QUALIFIES**: any pixel gate, geometry oracle or screenshot comparison on this
app at a viewport where a centred container lands on a half pixel. The condition
is content-dependent — the card height varies per route — so it is not a property
of one viewport and cannot be retired by choosing one lucky height.

**ROUTED ON**: the tie itself is a product-layout property, not a harness one,
and `demo/` is W1's Do-NOT-touch. Handed to the wave log for routing; this unit
photographs around it and says so.

---

## IC-10 · Two R35 cells are unreachable under this harness and are carried OPEN

**This unit's own.** Named here so silence is never read as coverage.

1. **A-32's FlagReportDialog overlay** is double-gated on an authenticated
   session AND a moderation action against a real palette. The `overlay` arm
   captures the dock view-select overlay — the reachable member of the
   overlay-state class — not this dialog.
2. **DSL-2's `misconfigured` lamp face** fires only when `VITE_API_URL` is UNSET
   on a loopback origin with a cross-origin resolved BASE_URL
   (`demo/platform/transport/availability.ts`). `visual.config.ts` SETS
   `VITE_API_URL` precisely so no cross-origin production fetch perturbs a golden
   (inv-K-5), which forecloses the state by construction. The `forced-state` arm
   captures the `unavailable` latch, which is a different face and is named as
   such.

Both are carried in `docs/tranches/X/evidence/w1/visual/R54-RESIDUE-WITNESS.md`
under R54's rule: a residue-witness cell is discharged by a captured frame with
its modality labelled, *"or it is carried forward still open. **Silence at close
is not discharge.**"*

---

## IC-12 · `devicePixelRatio` is a CELL property, and a renderer record that carried it was nondeterministic — CURED

**This unit's own, found by reading the artefact it had just written.**

`RENDERER.json` is the record of *what rendered the goldens*, and the first draft
wrote it from `readRenderer()`'s full return, which included `devicePixelRatio`.
Read back from the settled bytes mid-mint:

⟨`cat e2e/visual/goldens/darwin/RENDERER.json`⟩ → `"devicePixelRatio": 2` and a
header line ending `… | dpr=2 | slug=…`

**That is wrong, and it is wrong in the way this register exists to catch: the
value is real, and it measures something other than what its name claims.** The
project's `deviceScaleFactor` is 1; the only cells at DPR 2 are the
`zoom-200-desktop` arm, which emulates 200% zoom as a half viewport at 2× DPR.
The record is written once, by whichever cell first calls `identify()` — and
Playwright restarts the worker after a failing test, which clears the per-worker
cache, so a `golden-integrity` red mid-run handed the next writer to the zoom
arm. The committed record's `dpr` therefore depended on **which cells had failed
earlier in the run**. Two clean runs of the same suite could commit two different
renderer records while the renderer had not changed at all.

A DPR is a property of the CELL — it is already in the zoom arm's viewport id, in
each of those goldens' own filenames (`…-720x450-2-…`). It is not a property of
the GL stack, and a renderer record is a record of the GL stack.

**CURED at the root, not annotated**: `devicePixelRatio` is removed from
`RendererIdentity`, from `readRenderer()`, and from `rendererHeaderLine()`. The
record now contains only browser/GL identity, which is invariant across cells.

**A second determinism defect fell out of the same reading.** The write was
unconditional, so a *verification* run — a run that asserts and mints nothing —
rewrote `RENDERER.json` with a fresh `readAt`, dirtied `e2e/visual/`, and would
then have made `scripts/visual/regenerate-goldens.mjs` refuse on its own gate's
output. `identify()` now compares everything but `readAt` against what is on disk
and writes only on a real difference, so verifying is read-only and re-dating
happens when the identity or the bar actually changes.

**And the tolerance block was trimmed to the one number that is a constant.** It
recorded `effectiveMaxDiffPixels` alongside `authoredMaxDiffPixels`; the
effective value moves with `VJS_VISUAL_MAX_DIFF_PIXELS`, so a re-measurement run
at `0` rewrote the committed record too. Only the AUTHORED bar is recorded, which
is the number the gate is made of; the runtime override can only tighten
(`tolerance.ts`) and is deliberately not written into the record of the bar.

**CONSEQUENCE FOR READERS**: no golden moved. `rendererSlug()` digests
`unmaskedRenderer` alone, so no filename, no comparison and no pixel depends on
any of this — verified by re-deriving the manifest and re-running the suite after
the cure.

---

## IC-13 · The matrix's first full mint photographed a MISCONFIGURED app, and the run was green — CURED

**This unit's own, and the sharpest thing it found.**

The first full mint produced **205 goldens** — 210 tests passed, two expected
reds, nothing anomalous in the reporter. Every one of those goldens was of an
application in the `misconfigured` state. Read from the failing cell's own page
snapshot:

⟨`test-results/…browse-mid-fetch…/error-context.md`⟩
```
- navigation "Application navigation":
  - alert: "dev misconfigured — run `npm run dev`"
- main "Color tool panes":
  - alert:
    - paragraph: The commons is unreachable.
    - paragraph: Failed to load palettes
```

The lamp sits in the GLOBAL dock (`demo/shell/dock/DockStatusLamp.vue`), so it
is in every cell of every arm, at every viewport, in both schemes.

### The mechanism, read out of Playwright's own source

`visual.config.ts` sets `env: { VITE_API_URL: ORIGIN }` on its `webServer` for
inv-K-5. It also had `reuseExistingServer: !process.env.CI`. In
`node_modules/playwright/lib/runner/index.js`:

```js
const isAlreadyAvailable = await this._isAvailableCallback?.();
if (isAlreadyAvailable) {
    if (this._options.reuseExistingServer) return;   // ← returns BEFORE launchProcess
    …
}
const { launchedProcess } = await launchProcess({
    command: this._options.command,
    env: { ...DEFAULT_ENVIRONMENT_VARIABLES, ...process.env, ...this._options.env },
```

**`env` is only ever applied to a server Playwright LAUNCHES.** A dev server left
on the port by any other invocation is adopted with whatever environment it was
born with. ⟨`ps -o lstart=,command= -p 46403`⟩ → `Thu Sep 17 18:12:09 2026  node
…/vite --port 8190` — a leftover, adopted silently.

Unset `VITE_API_URL` on a loopback page with a cross-origin resolved BASE_URL is
exactly `detectDevMisconfig()`'s triad (`demo/platform/transport/availability.ts`),
so the latch entered `misconfigured` — which short-circuits transport calls
*before a request is issued*. That is also why the `seeded-fixture` arm failed:
its delayed-route fixture had nothing to intercept, because the app never asked.

### Differential, measured

| substrate | `dev misconfigured` alert | cross-origin requests |
|---|---|---|
| server started WITHOUT `VITE_API_URL` (the adopted leftover) | **present** | — (calls short-circuited) |
| server started WITH `VITE_API_URL` | **absent** | **0** |

⟨probe: boot `/#/browse` and `/#/`, collect `[role=alert]` and every request
origin⟩ → `{"foreign": [], "lamp": []}` on the configured substrate.

### The cure, and why it is the config and not a retry

`reuseExistingServer: false`. The matrix controls its own substrate or it is not
a matrix. The cost is that an orphaned server now fails the run loudly (*"is
already used"*), which is the correct trade: this defect's entire danger was that
it was SILENT. `port: PORT` also became `url: ORIGIN` — a listening socket is not
a ready Vite, and the first request into the dependency-optimisation window
returns `net::ERR_HTTP_RESPONSE_CODE_FAILURE`, measured on a cold start.

**And the condition is now asserted, not trusted.** `substrate-integrity.spec.ts`
reds if the misconfig lamp is lit or if any request leaves the page origin. A
config line can be edited back; a gate cannot be edited back without turning red.

**All 205 goldens were discarded and the matrix re-minted from zero.** No cell was
kept, and no tolerance was widened to accommodate the difference.

**WHAT THIS CAVEAT IS FOR**: any figure in this unit's evidence that was measured
before the re-mint carries the contaminated substrate. The tolerance stages in
`visual/TOLERANCE.md` were re-measured on the clean substrate and say so; nothing
else in this register depends on a capture.

---

## IC-14 · The at-rest arm photographs the app with NO palette backend

**This unit's own. Deliberate, and stated so it is never mistaken for coverage of
a populated wall.**

inv-K-5 (K.W2b) points `VITE_API_URL` at the same-origin dev server, so that no
cross-origin `api.color.babb.dev` fetch — and no CORS failure — can perturb a
golden. The dev server serves the SPA, not the API, so `GET /palettes` returns
`index.html` and the client reports:

⟨run console⟩ `[vite] [console.warn] Failed to load remote palettes: SyntaxError:
Unexpected token '<', "<!doctype "... is not valid JSON`

The at-rest goldens for the commons-backed surfaces therefore photograph the
**empty-commons** face, not a populated wall.

**Why this is the right baseline and not a defect**: a golden that depends on a
live backend is a golden that reds when the backend moves, and the first thing a
team does with a gate like that is turn it off — this wave's Archaeology in one
sentence. The state captured here is deterministic, is reached by real users when
the API is down, and is exactly the state the at-rest arm claims to hold.

**What it does NOT witness**, and where that is witnessed instead:

| not in the at-rest arm | witnessed by |
|---|---|
| a populated public wall | `seeded-fixture` (`routeBrowsePalettesDelayed`) |
| a populated local palette list | `seeded-storage` (`color-palettes` envelope) |
| populated admin tables | `seeded-admin` (`adminPopulatedTest`) |

Distinct from IC-13: there the app was MISCONFIGURED and said so in the global
dock — a broken app, silently made the baseline. Here the app is correctly
configured and the commons is simply empty, which is a state of the product and
is labelled as one.

---

## IC-15 · The generate workbench is RANDOMISED at mount; the matrix pins the entropy

**This unit's own, found by the first verification pass and cured at the capture.**

`demo/workbenches/generate/composables/useColorGeneration.ts:24` reads

```ts
const seed = ref(Math.floor(Math.random() * 0xffffffff));
```

at composable construction — once per mount of the generate workbench — and
`palette` is a computed over it. `GenerateControls.vue:59` prints that seed as a
fixed-width hex bench-note. So **every mount of `/#/generate` paints five
different swatches under a different label**, and the surface cannot be
photographed at all without a capture input.

**Measured** — first verification pass of this matrix over its own first mint
(2026-09-17, 216 cells, `VJS_VISUAL_MAX_DIFF_PIXELS` unset):

| cells | reading |
|---|---|
| **12 of 28 failures were `generate` cells** | every at-rest generate-pane cell (390 light/dark, 1024 light/dark, 3440 light/dark) and all six modality arms |
| differing pixels | **33,909 … 46,184**, every bounding box confined to the generated plate |
| `generate` cells that passed | **0 of 12** |

46,184 px is **115× G-9's own 20-px unit**. A bar raised to absorb it would be
the D.W4 failure by name, so the randomness is removed at the capture instead:
`capture.ts`'s `pinEntropy()` replaces `Math.random` in an init script with
**mulberry32** — the generator `demo/color-session/generate-color.ts:219` already
uses for its own seeded path — at a fixed seed, installed on the shared
`VISUAL_FIXTURE` context override so no arm can forget it.

**WHAT THIS COSTS**: the generate cells witness the workbench's **layout,
typography and affordance** under one pinned seed. They do **not** witness the
distribution of generated colour, and a regression that changed only which
colours a preset produces passes them. That is `generate-color.ts`'s unit-test
surface, not a pixel matrix's, and this register is where the boundary is
recorded rather than discovered later.

**Scope of the pin, measured** — ⟨`grep -rn 'Math.random' demo/ --include='*.ts'
--include='*.vue'`⟩ → **5 rows**: the two in `useColorGeneration.ts`, one in
`SpectrumCanvas.vue:163` gated on `debug.state.enabled` (off in every cell), and
two default parameters inside the pure generator. Nothing else in the product
reads the global at render time.

---

## IC-16 · Two readiness holes the first mint fell into, and the two guards that close them

**This unit's own. Both were found by running the first mint's goldens as a
verification pass — which is the act that must never be skipped, because a mint
run cannot fail against a golden that does not exist yet.**

### (a) The shell mounts BEFORE its lazy graph lands

Every pane is a `defineAsyncComponent` (`demo/shell/usePaneRouter.ts:73`) and
every dock icon a separate module, so those requests are issued **after** mount
and are not covered by `goto`'s own `networkidle`.

Measured in the first mint's committed bytes: the golden for
`at-rest · 390 · picker · about · dark` **carries a dock with no leading home
icon** — 6,230 differing pixels in a 220×41 box over the dock control, against a
correct page. Downstream of the same absence, three `keyboard-focus` cells red at
**30,277 / 33,591 / 46,416** px: one fewer focusable element in the dock moves
where 12 Tab presses land.

**Guard**: `gotoRoute()` and `showPane()` now await a second
`waitForLoadState("networkidle")` after the `role=main` landmark is visible. It
is also the right layer — module fetch is instrument latency, and absorbing it
there keeps `waitForQuiescence`'s 12 s cap a measure of the product's own boot
choreography.

### (b) A cell that never stilled was photographed anyway

`waitForQuiescence` returned `{quiescent:false}` at its cap and every caller
discarded the flag. Its own docstring reasoned that such a cell *"is photographed
anyway — and then fails loudly against its golden"*. **That is true on a
verification run and false on a mint run**: at mint there is no golden to fail
against, so the unsettled frame becomes the baseline silently.

Measured in the first mint's committed bytes — two goldens are a **single flat
colour**, the pre-mount ground gradient, ratified as the product's appearance:

```
at-rest-gradient-gradient-390-dark-…            1 distinct colour
at-rest-admin-admin-tags-palettes-390-dark-…    1 distinct colour
every other cell of the 207                  ≥ 401 distinct colours
```

(8-px sampling grid, counter capped at 401. The population has nothing between
1 and 401.)

**Guards, two, at two layers.** `requireQuiescence()` refuses to take the
photograph when the page never stilled; `assertRendered()` refuses when the shell
has not rendered (floors **12 descendants / 24 chars**, measured against the real
minima — 1024: 81 descendants / 185 chars; 390: 26 / 68 — so no real cell can
approach them). And because both are DOM predicates,
`golden-integrity.spec.ts`'s **flat-frame assertion** reads the committed BYTES
and reds on any golden under 16 distinct colours. One instrument refuses to take
the picture; the other refuses to keep it.

### (c) The blank frame also arrives from HOST LOAD, and that arm is honest-RED, not cured

During the first verification pass this seat ran two CPU-heavy PNG decode sweeps
**concurrently with the matrix**. Four consecutive 1024 cells (`palettes`,
`browse`, `extract`, `atmosphere`) then failed with a blank ACTUAL frame while
their Playwright page snapshots show a **complete DOM** — i.e. SwiftShader
composited nothing under contention. Attempted reproduction on a quiet host:
⟨20 cold loads of `/#/atmosphere` at 1024⟩ → **0 blank**; ⟨the same under 12×
CPU throttle, 24 samples⟩ → **0 blank**, and at the veiled `t0` sample
Playwright's own `animations:"disabled"` had already fast-forwarded the plate
landing, so the overture is **not** the mechanism.

**Consequence, stated rather than cured**: this suite is sensitive to host load,
and four tranche-X tracks share one machine. A loaded host produces **false REDs**
(never false greens: a blank actual fails the comparison and, at mint, is refused
by (b)'s guards and by the byte-level flat-frame test). The operational rule that
follows — *mint and verify with nothing else heavy running* — is recorded here
because it is an instrument property, not a product one, and no gate can assert
it from inside.

**THE RATE, measured over four full runs of the cured suite, and the one time the
guard caught it in the act.**

| run | conditions | blank-shell events |
|---|---|---|
| first verification pass (pre-cure) | this seat running two concurrent PNG decode sweeps | **8 of 216** |
| re-mint | quiet host | **0 of 217** |
| verification A | quiet host | **0 of 217** |
| verification B | quiet host | **1 of 217** |
| targeted re-run of B's cell | quiet host | **0 of 6** (3 consecutive passes) |

Verification B's single failure is the whole mechanism, printed by the guard
itself rather than inferred:

```
PROOF OF LIFE FAILED at at-rest__browse__both__1024__dark__real__… :
  main present=false, descendants=0 (floor 12), body text=0 chars (floor 24).
```

`main present=false` — the landmark that `gotoRoute` had already WAITED FOR and
seen visible was gone by the time the shutter was due. The error context carries
no page snapshot at all, because there was no accessible content to snapshot.
The same cell then passed three consecutive re-runs, so **the golden is correct
and the event is transient**.

This is the honest end state of the class: it is not cured, it is **caught**. Its
cost is a rare false RED (≈ 1 in 217 on a quiet host, ≈ 1 in 27 on a loaded one)
and its benefit is that the alternative — the same event at MINT time, silently
ratified — is now structurally impossible. A gate that occasionally reds for a
named, measured, host-level reason is a gate; a gate that silently mints the boot
screen as the baseline is not.

---

## IC-17 · The picker's watercolour dot NEVER settles, and the matrix does not witness its wobble

**This unit's own. Found by the verification pass of the CURED matrix — i.e. by the second run, not
the first — and cured at the capture, with the bar untouched.**

`.spectrum-dot` is glass-ui's `<WatercolorDot animate :cycle-duration="2000">`
(`demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:24-29`): a producer component whose entire
purpose is a living wet edge.

**Measured — it is still moving at six seconds, and it always will be.** Eight cold loads of one
cell, `getComputedStyle(dot).transform` read after `networkidle` + 3 s:

```
matrix(0.959938,  0.0205965, -0.00767353, 0.979184, 0, 0)
matrix(1.00828,  -0.0119702,  0.0127257,  0.998856, 0, 0)
matrix(0.986711, -0.021197,   0.0138283,  1.03384,  0, 0)
…
```

and **within one page**, at t+0 / t+2 s / t+6 s, three further different matrices with
`document.getAnimations()` reporting **4–5 running** throughout. Its `left`/`top` never move
(`424.828px` / `32.4688px` in every load) — only the ±3 % scale/skew wobble does.

**Why no wait can cure it.** `waitForQuiescence` excludes infinite animations from its signature
(correctly — they never end), and Playwright's `animations: "disabled"` does not still this one
either. There is no settled value, so there is nothing a pixel gate can assert.

**What it cost, and the number that forced the issue.** The `.spectrum-dot` residue is the only
residue `TOLERANCE.md`'s Stage 4 strict run left standing (4…58 px). On
`param-sweep · hsl · 1024 · light` — where the dot sits over a high-contrast blue field, so more of
its antialiased edge clears the YIQ threshold — it measured **147 differing pixels against a 120-px
bar**: the single failure of the cured matrix's first verification pass. **A residue whose tail
crosses the bar makes the gate flaky, and a flaky gate is a gate someone turns off.**

**The cure, at the capture, two properties and no others** — `capture.css` Rule 2:

```css
.spectrum-dot { transform: none !important; filter: none !important; }
```

Measured after, same three cells, `VJS_VISUAL_MAX_DIFF_PIXELS=0`, double-run: **65 / 53 / 62** px,
identical both times — i.e. back to the ordinary antialiasing floor, from 147.

**WHAT THIS COSTS**: the matrix witnesses the dot's **position**, **size** and **colour** — all
three are layout and product state, and all three still red on a regression. It does **not** witness
the watercolour wet-edge animation or the wobble. Those have no settled value to assert, and their
own oracles are elsewhere (`e2e/smoke/oracles/o26-aurora-perceptibility.spec.ts` for the perceptual
family; the producer's own suite for the component).

**glass-ui is READ-ONLY always.** The producer's animation is not touched, not configured away, and
not relayed as a defect — it is correct behaviour for a living dot. Only the darkroom is changed.

---

## Citation index — what each of this unit's gates consumes, and its caveat

| gate | corpus measurement consumed | caveat cited |
|---|---|---|
| **G-8** (goldens exist, census × viewports × schemes) | the 5-route sample denominator, read from `shots/` PNG counts | none applies to the denominator — it is re-measured at the bytes in `census.ts`, and `census-parity.spec.ts` derives the census from product source, not from the corpus. **IC-13** governs what the goldens are OF; **IC-15** what the `generate` cells do and do not witness; **IC-16** the two readiness holes the first mint fell into and the guards that close them |
| **G-9** (tolerance numeric, validated by injection) | none — every drift figure is this unit's own, measured at this clock | **IC-5**, **IC-7**, **IC-9** qualify the floor the bar sits above; **IC-17** is the one residue whose tail crossed the bar, and it was cured at the capture rather than absorbed; no corpus figure is used as tolerance rationale, which is R37's explicit restriction |
| **G-10** (renderer read from the live browser, every push) | none — the renderer string is read in-page by `e2e/visual/renderer.ts` | **IC-6** (two arms emulated), **IC-8** (darwin-scoped), **IC-12** (what the renderer record may and may not contain) |
| **NG-11** (census + non-route arms) | R34's six-arm/five-route measurement | none applies — re-measured at the bytes here; **IC-10** names the two cells still open |
| **NG-12** (this register) | R37's four rows | **IC-1** re-verified CONFIRMED; **IC-2**, **IC-3** recorded and not consumed by any gate here; **IC-4** ridden and conditioned on IC-1 |
