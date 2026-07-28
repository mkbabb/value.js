# CHALLENGE-C — `demo/color-picker/ErrorBoundary.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this seat
was explicitly spawned with. Declared, not inherited.

Subject: `/Users/mkbabb/Programming/value.js/demo/color-picker/ErrorBoundary.vue` (87 lines).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Sole consumer: `demo/color-picker/App.vue:50–140` — ONE boundary wrapping the entire two-pane grid.

**Provenance note.** A `challenge-C-implementation.md` already existed at this path when this seat
opened (mtime 11:34, findings C-1…C-15). I did not adopt it. I re-ran every harness it cites myself
and reproduced each number independently; I then ran four probes it had not run. This file is the
merged result: **C-rows are prior findings I personally re-measured, V-rows are new to this pass, and
two prior claims are CORRECTED below** (§Corrections). Nothing here is repeated on trust.

---

## Verdict

**DEFECTIVE — three BLOCKERs.**

The file's own header comment (`ErrorBoundary.vue:2-14`) makes three claims. All three are false in the
shipping build, and I measured each:

| Claim (`:2-11`) | Measured reality |
|---|---|
| "NEVER a silent white-screen dead plate" | **V-1**: a lazy pane chunk that fails to fetch produces a bare pink field with one floating "Try again" button. Screenshot below. |
| "paints an announced fallback IN PLACE of the dead subtree" | **C-1**: the aurora canvas paints over the icon, headline and detail. Measured contrast of the darkest pixel in the headline box vs its own background: **1.12 : 1**. There are no glyph pixels in the text boxes at all. |
| "focus moves INTO the boundary so a keyboard / SR user LANDS on the recovery affordance" | **C-4/V-3**: focus is stolen out of the field the user is *actively typing in*, lands on a container (not the affordance), and on recovery is dropped to `<body>`. |

Composed, these are one defect: **any pane failure — including a plain network failure — replaces the
whole application with a permanently blank field carrying a single unlabelled-in-context button, for
the rest of the session.** That is precisely the white screen the component exists to prevent.

---

## Harnesses (all re-run by me, this session)

### A — deterministic unit probes (jsdom)

`probes/challenge-c-impl.test.ts` + `probes/vitest.challenge-c.config.ts`. Mounts the SHIPPING SFC
unmodified. My run:

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/vitest.challenge-c.config.ts
 ✓ docs/.../probes/challenge-c-impl.test.ts (7 tests) 91ms
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

### B — live probes against `http://localhost:9000`

`evidence/probe-live-latching.mjs`, `evidence/probe-live-pixels.mjs`, `evidence/probe-live-stacking.mjs`
(re-run), and **`probes/challenge-c-verify.mjs` (new — V-1…V-4)**. Client-side interception only; no
source file is touched by any probe.

---

## New findings this pass

### V-1 · BLOCKER — a plain network failure on a lazy pane chunk yields a bare button on an empty field

`usePaneRouter.ts:69-78` declares ten `defineAsyncComponent(() => import(...))` with **no
`errorComponent`, no `loadingComponent`, no `timeout`**. The chunk-fetch rejection therefore travels to
this boundary. No injected code is needed — I aborted one request:

```js
await page.route("**/BrowsePane.vue**", (r) => r.abort("failed"));
```

Measured (`probes/challenge-c-verify.mjs`, V-1):

```json
{ "hash": "#/browse",
  "paneContainer": false,
  "boundaryPresent": true,
  "boundaryText": "This panel hit an unexpected error.Failed to fetch dynamically imported module:
                   http://localhost:9000/@fs/Users/mkbabb/Programming/value.js/demo/palettes/Browse…" }
```

`evidence/V1-chunk-abort.png` — what the user actually sees:

> the dock, and 1408 × 804 px of empty gradient, with one "Try again" pill centred in it. No icon, no
> headline, no detail. Both panes gone.

This is the highest-probability real-world trigger in the whole component's blast radius (offline, a
flaky connection, a stale `index.html` pointing at evicted hashed chunks after a deploy) and it is
the one the prior pass did not exercise. Combined with **C-1** (nothing paints) and **C-2** (the latch
never re-arms) the outcome is terminal: the field stays blank across every subsequent route.

**Rider (information disclosure, latent).** The detail line renders the module's **absolute developer
filesystem path**, including the OS username: `/@fs/Users/mkbabb/Programming/value.js/demo/palettes/…`.
It is present in `textContent` (measured above) and is invisible on screen *only because of C-1* — curing
C-1 without curing this publishes it. Booked separately as **V-6**.

**Cure:** async-component failure is not an exceptional condition, it is an expected state. Give
`usePaneRouter`'s ten declarations a real `errorComponent` (an `EmptyState variant="error"` with a
retry that re-triggers the import) and a `loadingComponent`, so a chunk failure is pane-local and
retryable and never reaches a boundary whose only move is to unmount the application.

---

### V-2 · MINOR — a non-`Error` throw renders the literal string `[object Object]`

`ErrorBoundary.vue:61` — `detail.value = err instanceof Error ? err.message : String(err);`

Measured live (V-2 probe, child throws `{ code: "color_progress_out_of_range", at: 7 }`):

```
boundaryText: "This panel hit an unexpected error.[object Object] Try again"
```

`String(obj)` is `"[object Object]"`. Because **C-3** has already destroyed every other diagnostic
channel, this line is the *only* surviving evidence of the failure — and for this class of throw it
carries zero bits. The header comment's "the machine truth in Fira" (`:13`) is falsified.

*Reachability of a non-`Error` throw from in-repo code is a **hypothesis** — I did not enumerate one;
the failed dynamic import in V-1 throws a real `TypeError`. The rendering behaviour is measured.*

---

### V-3 · MAJOR — focus and the caret are stolen out of a text field the user is still typing in

The repo's own record has a throw riding the gradient CSS box's 500 ms debounce
(`GradientCodeEditor.vue:55-57` `debouncedParse` → `emit("parse", text)`; Vue routes component-event
handlers through `callWithAsyncErrorHandling`, so it lands here). **No injection** — I typed into the
real control:

```
focus, Ctrl+A, type "linear-gradient(90deg, oklch() 0%, red 100%)"
```

Measured (V-3 probe):

```json
"focusBefore": { "tag": "DIV", "label": "Gradient CSS" },
"focusAfter":  { "tag": "DIV", "role": "alert", "focusVisible": true,
                 "outline": "auto 1px", "selectionCollapsedInBoundary": true },
"state": { "paneContainer": false,
           "boundaryText": "This panel hit an unexpected error.Cannot read properties of undefined (reading 'replace') Try again" }
```

`selectionCollapsedInBoundary: true` — the *text selection itself* was relocated into the error plate.
The user was mid-word; the next keystroke goes nowhere, the editor is unmounted, and the authored text
is destroyed. `ErrorBoundary.vue:64` performs this unconditionally: it never asks where focus was.

This also independently reproduces the repo's known gradient crash through a pure keyboard path.

**Cure:** capture `document.activeElement` at catch time; move focus only if the previously focused
node has actually been removed from the document; restore it on `reset()` if it survives.

---

### V-4 · MAJOR — the plate that owns the entire `<main>` contains zero headings

Measured (V-4 probe, boundary caught, whole grid replaced):

```json
"headingCount": 0, "headingsInBoundary": 0
```

The Fraunces statement is a `<p>` (`ErrorBoundary.vue:24`). When the boundary is up it *is* the whole
`main` landmark — so the document has **no heading at all**. Heading navigation is the primary
screen-reader traversal mode; a user who lands here by any route other than the (single, transient)
live-region announcement finds an unstructured region with one button in it.

The e2e spec's own comment asserts the opposite: *"It is ANNOUNCED (assertive live region) and NAMED (a
heading a screen reader reads, not an anonymous plate)"* (`e2e/smoke/admin/a11y-authed-admin.spec.ts:138-139`).
The spec text claims a heading; the implementation has none; **the assertion under that comment checks
`textContent.length > 0`**, so the divergence is invisible to the gate.

---

### V-5 · MINOR — a divergent hand-rolled copy of `EmptyState variant="error"` (edict 3)

`ErrorBoundary.vue:12-14` admits it "mirrors EmptyState's `error` variant". Diffed against
`demo/shared/ui/EmptyState.vue:14-27`, the copy is structurally identical (same `role="alert"`, same
`CircleAlert` + `aria-hidden`, same `font-display text-heading text-foreground … text-balance
leading-snug` statement `<p>`, same `text-mono-small plate-ink … break-words` detail `<p>`, same action
slot) and **numerically drifted** on every dimension:

| | EmptyState error | ErrorBoundary |
|---|---|---|
| glyph | `w-6 h-6` | `w-7 h-7` |
| gap | `gap-2.5` | `gap-3` |
| pad | `py-8` | `py-10 px-6` |
| statement measure | `max-w-[26ch]` | `max-w-[28ch]` |
| detail measure | `max-w-[44ch]` | `max-w-[46ch]` |

A copy that drifts is worse than a copy: the ratified plate and the boundary plate now disagree about
the house's error register, and neither is the source of truth. Rendering `<EmptyState variant="error">`
inside a pane shell deletes ~20 template lines and kills **C-1, C-6, C-12 and V-5** at once.

---

### V-6 · MINOR — the detail line publishes absolute developer filesystem paths

Rider of V-1, booked separately because its cure is different. `err.message` is rendered verbatim
(`ErrorBoundary.vue:28`) with no redaction and no `import.meta.env.DEV` gate. In the V-1 capture the
rendered string contains `/Users/mkbabb/Programming/value.js/…`. Latent today (C-1 hides it), live the
moment C-1 is cured.

---

## Prior findings — independently re-measured and CONFIRMED

### C-1 · BLOCKER — the decorative aurora canvas occludes the message; only the button paints

My run of `evidence/probe-live-pixels.mjs` (1440×900, dpr 1) — the headline's and detail's own bounding
boxes decoded from a screenshot in-page:

```
SHIPPED (position: static)
  head:   distinctColours   86   darkestPixel [255,128,176]   contrastDarkestVsBg  1.12
  detail: distinctColours   42   darkestPixel [255,142,176]   contrastDarkestVsBg  1.06

RUNTIME-LIFTED (.vj-error-boundary { position: relative } via evaluate — no source edit)
  head:   distinctColours 1323   darkestPixel [ 28, 25, 23]   contrastDarkestVsBg  8.37
  detail: distinctColours  499   darkestPixel [ 86, 84, 83]   contrastDarkestVsBg  3.70
```

86 / 42 distinct colours is gradient banding. 1323 / 499 is antialiased type. In the shipped build the
text boxes contain **no glyph pixels**. Confirmed by eye:
`evidence/02-shipped-crop-only-button-paints.png` (only "Try again") vs
`evidence/03-runtime-position-relative-restores-text.png` (icon + headline + detail all present) —
same crop, one runtime property changed.

Mechanism, my V-4 measurement:

```json
"boundaryPosition": "static", "boundaryZ": "auto",
"boundaryRect": { "x": 16, "y": 88, "w": 1408, "h": 804 },
"canvasPosition": "absolute", "canvasZ": "auto"
```

CSS 2.1 Appendix E: in-flow inline content of non-positioned descendants paints in step 7; positioned
descendants with `z-index: auto` paint in step 8. `.atmosphere-canvas` (`App.vue:9-17`,
`aria-hidden="true"`, decorative) is absolutely positioned and full-viewport → it paints over the
boundary's static text. Healthy panes escape because `.pane-wrapper` carries `position: relative;
z-index: 1` — and the boundary is mounted at `App.vue:50`, **outside** `.pane-container`, replacing the
very element whose children carry that lift. The recovery `<Button>` survives only by accident: glass-ui
gives it `position: relative` + `backdrop-filter`, promoting it into step 8.

Universal, not route-specific: the canvas is a full-viewport absolute sibling in `.app-layout` on every
route and both breakpoints.

### C-2 · BLOCKER — the boundary latches for the session; navigation is dead

`caught` is component-local, with no key, no watcher, no route coupling; `App.vue:50` wraps the whole
grid, so `v-else` withholds *both* panes. My run of `evidence/probe-live-latching.mjs`:

```
state1  hash "#/browse"  paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
state2  hash "#/"        paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
state3  hash "#/mix"     paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
```

The dock sits outside the boundary and stays fully operable — the user clicks Picker, Mix, Gradient, the
URL changes, and the pane region never does. Unit probe `C-E` shows the same with the slot swapped for a
healthy component: `error plate still rendered: true / healthy pane mounted: false`.

**Cure:** one boundary per `PaneSlot`, keyed on the pane key — a new route is a new instance, born
un-caught, and one pane cannot take out its sibling or its successor.

### C-3 · MAJOR — total diagnostic blackout

`ErrorBoundary.vue:68` returns `false`; Vue's `handleError` returns early on a `false` hook result,
before `app.config.errorHandler` and before `logError`. Unit probe `C-B`, my run:

```
[C-B] boundary painted: true
[C-B] console.error mentioning the throw: false
[C-B] console.warn  mentioning the throw: false
[C-B] app.config.errorHandler invocations: 0
[C-B] component emissions on catch: {}
```

Live: with `INDUCED-AUDIT-THROW` caught, the whole session's console+pageerror capture contains zero
mention of it (only the unrelated dev-misconfig and WebGL lines).

Two compounding code facts I add to this row:
- **the hook signature drops its own diagnostics.** `onErrorCaptured((err) => {…})` (`:59`) ignores
  Vue's `instance` and `info` arguments — so even a future `console.error` here could not say *which*
  component or *which* lifecycle phase failed.
- **there is no global net.** `grep -rn "errorHandler\|unhandledrejection\|window.onerror" demo/` returns
  only `ErrorBoundary.vue:67`'s own comment; `demo/color-picker/index.html:210` calls `createApp(App)`
  with no `config.errorHandler`. Suppressing propagation here suppresses *everything*.

This contradicts the honesty contract `App.vue:144-149` is at pains to preserve elsewhere.

**Cure:** `console.error("[ErrorBoundary]", err, info)` immediately above `return false`. Suppressing
propagation and suppressing observability are two decisions; this file conflates them.

### C-4 · MAJOR — focus is captured but never restored

Unit probe `C-D`, my run:

```
[C-D] activeElement after catch:  DIV alert
[C-D] activeElement before reset: BUTTON
[C-D] error plate gone: true
[C-D] healthy child mounted: true
[C-D] activeElement AFTER reset: BODY (=== document.body)
```

Live `state4` after pressing Try again: `"activeEl": "BODY[]"`. `reset()` (`:71-75`) destroys the focused
Button and never restores; the keyboard user is teleported to the top of the document. The catch-side
half is V-3. Note the target is the **container**, not the Button the comment promises (`:9-10`); WAI-ARIA
APG for `alert` says moving focus to an alert is neither necessary nor recommended, and doing so makes
NVDA/JAWS announce twice (live-region insertion + focus).

### C-5 · MAJOR — "Try again" is a loop, and the `reset` emit has no listener

Unit probe `C-C`: `after Try again, error plate still present: true` (the identical subtree is remounted
with identical inputs; a deterministic cause re-throws immediately). And:

```
$ grep -n "@reset\|onReset\|:reset" demo/color-picker/App.vue
(no matches)
```

`defineEmits<{ reset: [] }>()` (`:53`) and `emit("reset")` (`:74`) are dead API surface — edict 2.
Either the parent handles `@reset` (invalidate the pane cache / bump a remount key / re-run the failed
fetch) or the emit is deleted and `reset` bumps a local key. Not both, not neither.

### C-6 · MAJOR — the `--ink-muted` certification does not transfer to this surface

`ErrorBoundary.vue:79-86` asserts the detail line "adds NO sub-floor contrast debt". `--ink-muted` is
stamped by `useAtmosphereBoot.ts:100-106` from `useContrastSafeColor.ts:324-330`, which certifies against
`surfaceLightnessNow("resting", …)` — the resting glass **plate**, documented at
`useContrastSafeColor.ts:283-285` ("the referent is the SURFACE RUNG, never the bare page ambient"). The
boundary puts that ink on the bare aurora field; the certification is void. Measured with C-1's occlusion
lifted so the glyphs paint: **3.70 : 1** at 16.4 px (`text-mono-small`, Fira Code) against a WCAG 2.2
SC 1.4.3 floor of 4.5 : 1. The headline (`text-foreground`) measures 8.37 : 1 and is fine.

### C-7 · MAJOR — vacuous gate (restated precisely; see §Corrections)

Zero unit tests. One e2e test: `e2e/smoke/admin/a11y-authed-admin.spec.ts:108-156`.
`grep -rn "ErrorBoundary" demo/ src/ test/ e2e/` → `App.vue:50`, `App.vue:180`, and two *comments* in
that spec. `@vue/test-utils@2.4.10` is a declared devDependency with **zero importers** under `test/` or
`demo/test/` (vitest's include is `["test/**/*.ts", "demo/test/**/*.ts"]`, `vitest.config.ts:21`); the
only importers in the tree are this mega-tranche's audit probes.

What the one spec *does* cover: `aria-live` present and `assertive|polite`; focus inside the alert; a
visible button inside the alert; `textContent.length > 0`.

Mutations that keep `vitest` + `playwright` + `vue-tsc` + `eslint` **green**:

| # | Mutation | Why still green |
|---|---|---|
| M1 | `return false` → `return;` (`:68`) | the boundary still paints; nothing asserts suppression |
| M2 | `function reset() {}` — empty body | no test clicks the button; only its visibility is asserted (`:152-155`) |
| M3 | delete `defineEmits` + `emit("reset")` | no listener exists anywhere |
| M4 | delete the `vj-error-boundary` token | matched by no CSS rule and no selector (C-8) |
| M5 | any other `message` default | only `length > 0` is asserted, and `App.vue:50` passes its own copy |
| M6 | delete the `<p v-if="detail">` entirely | `alertText` stays non-empty from the headline |
| M7 | focus the Button instead of the container | the spec accepts `el.contains(activeElement)` |

**Why it cannot catch C-1.** Its strongest content assertion is `expect(alertText.length).toBeGreaterThan(0)`
(`:142-143`) — `textContent`, fully present while the glyphs are 100 % occluded. Its
`.filter({ visible: true })` is Playwright visibility = non-empty box and not `visibility:hidden`/
`display:none`. **Occlusion by another element is not un-visibility.** Green on a plate that shows nothing.

Blind to: paint (C-1), latch (C-2), diagnostics (C-3), focus restoration (C-4a), focus theft (V-3),
retry efficacy (C-5), detail content (V-2), heading absence (V-4), chunk failure (V-1).

**Cure:** assert *painted* truth (the pixel-sampling method used here) plus a unit suite for the state
machine — latch, re-arm, focus restore, emit.

### C-8 · MINOR — `vj-error-boundary` is a dead hook class

```
$ grep -rn "vj-error-boundary" demo/ src/ e2e/ test/
demo/color-picker/ErrorBoundary.vue:18   (the only occurrence)
```

No CSS rule in `demo/styles/`, none in the SFC's own scoped block, no test selector. Edict 2.
*(It is, ironically, the selector every audit probe in this directory depends on.)*

### C-9 · MINOR — the live region is created in the same commit as its content

Unit probe `C-F`, my run: `pre-error [aria-live] count: 0`, `pre-error [role=alert] count: 0` — before the
error the component renders nothing but its HTML comment and the slot. A live region inserted together
with its text is unreliably announced, most notably in Safari/VoiceOver — the exact engine this
mega-tranche's visual matrix audits. The announcement that *does* occur comes from the focus move (C-4),
a different mechanism than the WCAG 4.1.3 Status Messages one `:6-7` claims. `aria-live="assertive"`
(`:20`) is also redundant: `role="alert"` already implies it.

### C-10 · MINOR — the machine-truth detail is unbounded

Unit probe `C-G`, my run: a 4000-character message renders in full —
`detail classes: text-mono-small plate-ink max-w-[46ch] break-words`. `max-w-[46ch]` bounds width; nothing
bounds height. Inside a `h-full … justify-center` flex column with `overflow: visible` (measured, V-4) a
long message pushes the recovery Button — the only affordance — out of the box.

### C-11 · MINOR — two visible `role="alert"` nodes; the e2e binds `.first()`

Measured (V-4 probe), boundary caught:

```json
"alertsInDocOrder": [
  { "text": "dev misconfigured — run `npm run dev`",        "visible": true },
  { "text": "This panel hit an unexpected error.GEO Try aga","visible": true } ]
```

`demo/shell/dock/status-lamp.ts:39,53` gives `DockStatusLamp` `role: "alert"`; the lamp is in `nav`, which
precedes `main`, so it wins `.first()`. The spec binds
`page.getByRole("alert").filter({ visible: true }).first()` (`:136`) and then asserts `aria-live` and
focus-containment on whatever it got. `playwright.config.ts:121` sets `VITE_API_URL: E2E_ORIGIN`, so the
lamp is absent on the e2e origin — **so this is fragility, not an observed e2e failure; that half is a
hypothesis. The duplicate-role fact and the ordering are measured.** Note it produces a false RED, not a
false GREEN.

**Cure:** the spec should bind the boundary by a stable test id, not by role-and-hope.

### C-12 · MINOR — `.plate-ink` is copy-pasted into five scoped blocks (corrected count)

```
$ grep -rn "plate-ink" demo/ --include='*.vue' --include='*.css' | grep -v "class="
demo/workbenches/extract/ExtractWorkbench.vue:290   demo/workbenches/extract/ImageDropZone.vue:109
demo/workbenches/extract/ExtractControls.vue:148    demo/shared/ui/EmptyState.vue:102
demo/color-picker/ErrorBoundary.vue:84
```

All five bodies are `color: var(--ink-muted, var(--muted-foreground));`. Edicts 5 and 3: one
`@utility plate-ink` in `demo/styles/utils.css` (which already homes `.fraunces`, `.fira-code`,
`.section-subtitle`) replaces all five. The `var(--ink-muted, …)` fallback arm is additionally a masking
fallback (edict 2): `--ink-muted` is stamped by a `watch(…, { immediate: true })` during App setup, before
any pane renders, so the arm is unreachable and can only hide a boot regression.
*(Inherited idiom; ErrorBoundary is the fifth copy, not the first.)*

### C-13 · INFO — the boundary cannot catch this app's most common failure shape

`onErrorCaptured` catches render / lifecycle / watcher / handler throws, not bare promise rejections. In
the same live session a genuine app failure was logged and never reached the boundary:

```
warning: Failed to load remote palettes: DevMisconfigError: value.js dev is MISCONFIGURED: …
```

Not a defect in the code as written — a scope claim in the header (`:4`, "during render / lifecycle")
narrower than the surrounding prose ("NEVER a silent white-screen dead plate") implies. *(V-1 shows the
async-component rejection **does** arrive, because Vue funnels it through the component's own setup — so
the boundary's async coverage is partial and undocumented, which is its own hazard.)*

### C-14 · INFO (HYPOTHESIS — no exhaustion repro run) — reset churns the WebGL2 context

`reset()` remounts the whole pane tree, including `KeepAlive`'s cache and the GooBlob WebGL2 context.
`grep -rn "loseContext\|WEBGL_lose_context" demo/` → no matches; no explicit release anywhere. The visual
report already records `safari-desktop-light /#/: WebGL: context lost.` as the single console error across
60 captures. Repeated resets — which C-5 makes *likely* — churn contexts against a ~16 cap. Unmeasured.

### C-15 · INFO — the consumer re-passes the component's own default verbatim

`App.vue:50` `message="This panel hit an unexpected error."` is byte-identical to the default at
`ErrorBoundary.vue:44`. One of the two is dead; the default is untested by the only consumer.

---

## Corrections to the prior pass

1. **`.plate-ink` copy count: 5, not 7.** The prior file listed `ConfigSliderPane.vue:205` and
   `ColorComponentDisplay.vue:200/205/211` as additional definition sites. My grep for the declaration
   (`grep -rn "plate-ink" demo/ | grep -v "class="`, output pasted at C-12) returns exactly five files.
   The finding stands; the number was inflated.
2. **The focused container is NOT unstyled.** The prior file asserted a *sighted* keyboard user "gets no
   visible indication of where focus went". Measured (V-3): `outline: "auto 1px"`,
   `matches(":focus-visible") === true` — the UA default focus ring **does** apply. The accurate finding
   is narrower and different in kind: the boundary receives the **user-agent** ring, not the house
   `--focus-ring-inner` / `--focus-ring-outer` recipe (`demo/styles/focus-ring.css:28-35`, which carries no
   `[tabindex="-1"]` rule) — a design-system inconsistency on a 1408 × 804 px element whose ring sits at
   the viewport edge, not a total absence.

---

## Edict compliance

| Edict | Status |
|---|---|
| 1 · no god modules | PASS — 87 lines, one concern |
| 2 · no legacy / dead paths / masking fallbacks | **FAIL** — C-5 (dead emit), C-8 (dead class), C-12 (masking `var()` fallback) |
| 3 · KISS, no contrivance | **FAIL** — V-5 (divergent hand-rolled copy of a ratified primitive), C-15 |
| 4 · glass-ui is the design system | PASS — `../ui/button` re-exports `@mkbabb/glass-ui`'s `Button` (`demo/ui/button/index.ts`) |
| 5 · root-level styling | **FAIL** — C-12, the fifth copy of `.plate-ink` |
| 6 · animations never deleted | PASS — none present |
| 7 · idiomatic Vue 3.5 | PASS — `useTemplateRef`, reactive props destructure, no `defineModel` round-trip |
| 8 · `verbatimModuleSyntax` | PASS — no type-only imports in the file |

## Non-findings (checked, clean — the negative is proved, not assumed)

- **No `defineModel`** → the `WritableComputedRef` stale-read hazard does not apply. The two pieces of
  state are plain `ref`s read only by this component's own template.
- **No colour maths, no `ValueUnit` wrapping, no `stableHue`, no parsing** → those four local hazards and
  the `parseCssColor` crash class do not apply. The file imports nothing from `src/`.
- **No `requestAnimationFrame`, no timers, no listeners, no observers, no WebGL** → nothing to leak; the
  PRM-RAF epidemic does not touch this file. The single `nextTick` callback is `?.`-guarded and
  self-terminating.
- **No unbounded growth** → `detail` is one string, overwritten not appended; `caught` is a boolean.
- **No per-frame / per-keystroke / per-tick work** → the component is completely inert until it catches;
  in the healthy path it renders `<slot/>` and one HTML comment (probe `C-F` output).
- **Tap target and accessible name are fine** — measured 124 × 36 px (V-4), above the 24 px floor, with
  the accessible name "Try again". The component contributes **nothing** to the visual REPORT's
  `smallTapTargets` (60) or nameless-button counts — because, as
  `grep -in "Try again" docs/tranches/V/megatranche/audit/visual/REPORT.md` returns nothing, **the visual
  audit never captured the error state at all.** That blindness is C-7's live-matrix half.

## Artifacts (all under this directory)

- `probes/challenge-c-verify.mjs` — **new**: V-1 chunk-abort, V-2 non-`Error`, V-3 focus theft, V-4 geometry
- `probes/challenge-c-impl.test.ts`, `probes/vitest.challenge-c.config.ts` — 7 unit probes, re-run green
- `evidence/V1-chunk-abort.png` — the bare-button field after a network failure
- `evidence/V2-non-error-throw.png`, `evidence/V3-focus-theft.png`
- `evidence/probe-live-latching.mjs`, `probe-live-pixels.mjs`, `probe-live-stacking.mjs` — re-run
- `evidence/01-shipped-full-viewport.png`, `02-shipped-crop-only-button-paints.png`,
  `03-runtime-position-relative-restores-text.png`
