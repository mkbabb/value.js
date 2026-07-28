# CHALLENGE-C — `demo/color-picker/ErrorBoundary.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. Declared, not inherited.

Subject: `/Users/mkbabb/Programming/value.js/demo/color-picker/ErrorBoundary.vue` (87 lines).
Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Sole consumer: `demo/color-picker/App.vue:50–140` (one boundary wrapping the ENTIRE two-pane grid).

---

## Verdict

**DEFECTIVE — two BLOCKERs.**

The component's stated purpose (`ErrorBoundary.vue:2-3`) is: *"a focus-managed, SR-ANNOUNCED error
boundary — NEVER a silent white-screen dead plate."* Both halves of that sentence are false in the
shipping build, and I measured both:

1. **The announced message is never painted.** The decorative aurora canvas paints OVER the
   boundary's icon, headline, and detail. What a sighted user sees is a blank field with one
   floating "Try again" button. Measured contrast of the darkest pixel inside the headline's own
   box against its own background: **1.12 : 1** (headline) and **1.06 : 1** (detail) — i.e. the box
   contains nothing but the gradient.
2. **The boundary latches forever.** Once caught it never re-arms; navigating to two further,
   healthy routes leaves the identical dead plate on screen and the pane grid unmounted.

Combined: a single pane throw produces a permanently blank pane region for the rest of the session.
That is the white screen the component exists to prevent, with a button on it.

Every gate stays green: 1 e2e test, 0 unit tests, 0 visual captures of the error state.

---

## Reproductions

Two harnesses, both committed under this directory. Neither edits any source file.

### Harness A — deterministic unit probes (jsdom)

`probes/challenge-c-impl.test.ts` + `probes/vitest.challenge-c.config.ts` (mine; a concurrent seat
owns `probes/boundary.test.ts` / `probes/vitest.config.ts` — do not confuse them).

```
$ npx vitest run --config docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/vitest.challenge-c.config.ts
 ✓ docs/.../probes/challenge-c-impl.test.ts (7 tests) 97ms
 Test Files  1 passed (1)
      Tests  7 passed (7)
```

### Harness B — live induced error against `http://localhost:9000`

`evidence/probe-live-latching.mjs`, `evidence/probe-live-stacking.mjs`,
`evidence/probe-live-pixels.mjs`. Induction is faithful to the repo's own method (the e2e spec at
`e2e/smoke/admin/a11y-authed-admin.spec.ts:113` intercepts a response to force a render throw);
mine intercepts the lazily-imported pane module instead, so it works unauthenticated:

```js
await page.route("**/BrowsePane.vue**", r => r.fulfill({
  status: 200, contentType: "text/javascript",
  body: 'export default { setup(){ return () => { throw new Error("INDUCED-AUDIT-THROW"); }; } };',
}));
await page.goto("http://localhost:9000/#/browse");
```

---

## Findings

### C-1 · BLOCKER — the decorative aurora canvas occludes the error message; only the button paints

**Evidence — measured pixels** (`evidence/probe-live-pixels.mjs`, viewport 1440×900, dpr 1). The
screenshot is decoded in-browser and the headline's / detail's own bounding boxes are sampled:

```
SHIPPED (position: static)
  head:   distinctColours  86    darkestPixel [255,128,176]  contrastDarkestVsBg  1.12
  detail: distinctColours  42    darkestPixel [255,142,176]  contrastDarkestVsBg  1.06

RUNTIME-LIFTED (.vj-error-boundary { position: relative } applied via evaluate, no source edit)
  head:   distinctColours 1323   darkestPixel [ 28, 25, 23]  contrastDarkestVsBg  8.37
  detail: distinctColours  499   darkestPixel [ 86, 84, 83]  contrastDarkestVsBg  3.70
```

86 and 42 distinct colours are gradient banding. 1323 and 499 are antialiased glyphs. In the shipped
build **there are no glyph pixels inside the text boxes at all.**

Screenshots: `evidence/01-shipped-full-viewport.png`, `evidence/02-shipped-crop-only-button-paints.png`
(crop x400–1040, y380–640, which fully contains the icon at (706,409,28,28), the headline at
(498,449,445,36) and the detail at (624,496,192,23) — only "Try again" is visible), and
`evidence/03-runtime-position-relative-restores-text.png` (same crop, one runtime property changed,
all three appear).

**Mechanism — measured stacking** (`evidence/probe-live-stacking.mjs`):

```
canvas .atmosphere-canvas   position: absolute  z-index: auto  rect 0,0,1440x900
div    .vj-error-boundary   position: static    z-index: auto  rect 16,88,1408x804
p      headline             position: static    z-index: auto
button (glass-ui)           position: relative  backdrop-filter: blur(7px) saturate(1.4)
canvasCoversHeadline: true
domOrder: [CANVAS.atmosphere-canvas, NAV.dock-band, MAIN.pane-main]

HEALTHY PANE:  .pane-wrapper  position: relative  z-index: 1
```

CSS 2.1 Appendix E painting order: in-flow inline content of non-positioned descendants paints in
step 7; positioned descendants with `z-index: auto` paint in step 8. `.atmosphere-canvas`
(`App.vue:9-17`, `aria-hidden="true"`, purely decorative) is absolutely positioned and full-viewport,
so it paints **after** — and therefore over — the boundary's static text.

Healthy panes escape this because `.pane-wrapper` carries `position: relative; z-index: 1`. The
boundary is mounted at `App.vue:50`, **outside** `.pane-container` — it *replaces* the very element
whose children carry the z-lift. It inherits none of it. The recovery `<Button>` survives only by
accident: glass-ui gives it `position: relative` + `backdrop-filter`, promoting it into step 8 after
the canvas.

Universal, not route-specific: the canvas is a full-viewport absolute sibling in `.app-layout` for
every route and both breakpoints.

**Cure (gestalt, not patch):** the boundary must speak from the same rung as the panes it replaces.
It should not hand-roll a second error plate at all — `demo/shared/ui/EmptyState.vue:14-27` already
IS the error plate (`variant="error"`, same `CircleAlert`, same Fraunces statement, same
`plate-ink` detail, same action slot), and `ErrorBoundary.vue:12-14` admits it is a copy of it.
Render `<EmptyState variant="error">` inside the existing pane shell so the fallback lands ON the
plate the rest of the app lands on. That kills C-1, C-6 and C-12 in one move and deletes ~20 lines
of duplicated template.

---

### C-2 · BLOCKER — the boundary latches for the rest of the session; navigation is dead

`caught` is component-local state with no key, no watcher, and no route coupling. `App.vue:50`
wraps the whole two-pane grid in ONE boundary, so `v-else` withholds the entire grid — not the
failing pane — until someone clicks the button.

**Evidence — live** (`evidence/probe-live-latching.mjs`, `main.pane-main` text and
`.pane-container` presence sampled after each hash change):

```
state1  hash "#/browse"  paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
state2  hash "#/"        paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
state3  hash "#/mix"     paneContainer false  main "This panel hit an unexpected error.INDUCED-AUDIT-THROW Try again"
```

The dock is outside the boundary and stays fully operable, so the user clicks Picker, Mix, Gradient…
and the pane region never changes. The URL changes; the app does not.

**Evidence — unit** (probe `C-E`): the slot content is swapped for a healthy component; the error
plate stays and the healthy pane never mounts.

```
[C-E] after navigating to a HEALTHY pane:
[C-E]   error plate still rendered: true
[C-E]   healthy pane mounted: false
```

**Cure:** scope + key. One boundary per pane slot, inside `PaneSlot`, keyed on the pane key — a new
route is a new boundary instance, born un-caught, and one pane's failure cannot take out its sibling
or its successor. (Probe `C-A`, run by the concurrent seat as P1, also shows a healthy sibling being
destroyed by an unrelated sibling's throw — same root cause: the boundary's granularity is the whole
grid.)

---

### C-3 · MAJOR — total diagnostic blackout: the error reaches no channel at all

`ErrorBoundary.vue:68` returns `false`. Vue's `handleError` returns *early* on a `false` hook result
— before `app.config.errorHandler` and before `logError`. The component logs nothing itself and
emits nothing on catch. The stack is destroyed.

**Evidence — unit** (probe `C-B`):

```
[C-B] boundary painted: true
[C-B] console.error mentioning the throw: false
[C-B] console.warn  mentioning the throw: false
[C-B] app.config.errorHandler invocations: 0
[C-B] component emissions on catch: {}
```

**Evidence — live**: with `INDUCED-AUDIT-THROW` thrown and caught, the full console/pageerror capture
for the session contains zero mention of it. The only entries are the unrelated dev-misconfig and
WebGL messages:

```
error:   [value.js] value.js dev is MISCONFIGURED: …
warning: No available adapters.
warning: [.WebGL-…] GPU stall due to ReadPixels
warning: Failed to load remote palettes: DevMisconfigError: …
```

This directly contradicts the repo's own honesty contract, which `App.vue:144-149` is at pains to
preserve elsewhere ("the W0-1 honesty contract (availability.ts + the loud console.error) is
byte-preserved"). The boundary is the one surface that silences a real failure.

**Cure:** log before suppressing. `console.error("[ErrorBoundary]", err, info)` immediately above
the `return false`. Suppressing propagation and suppressing observability are two different
decisions and this file conflates them.

---

### C-4 · MAJOR — focus is captured but never restored; and it lands on the wrong node

Two distinct half-implementations of the "focus-managed" claim at `ErrorBoundary.vue:8-10`.

**(a) Never restored.** `reset()` (`:71-75`) unmounts the fallback, destroying the focused Button.
Focus falls to `<body>`; the keyboard user is teleported to the top of the document.

Unit (probe `C-D`):
```
[C-D] activeElement after catch:  DIV alert
[C-D] activeElement before reset: BUTTON
[C-D] error plate gone: true
[C-D] healthy child mounted: true
[C-D] activeElement AFTER reset: BODY (=== document.body)
```
Live (`state4`, after pressing Try again): `"activeEl": "BODY[]"`.

**(b) Wrong target.** The comment promises the user "LANDS on the recovery affordance". The code
focuses the **container** (`alertRef`), not the Button — probe C-D line 1. WAI-ARIA APG for `alert`
states it is not necessary and not recommended to move focus to an alert; doing so makes NVDA/JAWS
announce the region twice (live-region insertion + focus event). And the container is a
`tabindex="-1"` div with no focus style, so a *sighted* keyboard user gets no visible indication of
where focus went — which, compounded with C-1, means nothing on screen has changed at all except a
button appearing.

**Cure:** capture `document.activeElement` at catch time; move focus to the recovery Button (a real
focus-visible control, announced by name); on reset, restore the captured element if it is still in
the document, else the pane's first heading. Let the live region do the announcing.

---

### C-5 · MAJOR — "Try again" is a loop; the `reset` emit has no listener anywhere

`reset()` only flips local state. It re-mounts the identical subtree with identical inputs. When the
cause is deterministic — which is exactly the failure the repo's own e2e induces (a
contract-violating `/admin/users` payload that the panel refetches on mount) — the user gets a
flash and the same plate.

Unit (probe `C-C`):
```
[C-C] after Try again, error plate still present: true
```

And the escape hatch that would let the parent do something about it is unwired:

```
$ grep -n "@reset\|onReset" demo/color-picker/App.vue
(no matches)
```

`defineEmits<{ reset: [] }>()` (`:53`) and `emit("reset")` (`:74`) are dead API surface. Under owner
edict 2 (no dead paths) this is a finding on its own; under KISS it is a contrivance that *looks*
like a recovery seam and is not one.

**Cure:** either the parent handles `@reset` (invalidate the pane's cache / bump a remount key /
re-run the failed fetch), or the emit is deleted and `reset` bumps a local `key` on the slot. Not
both, not neither.

---

### C-6 · MAJOR — the `--ink-muted` rung is certified against a plate the boundary does not have

`ErrorBoundary.vue:79-86` asserts the detail line "threads the certified de-emphasis rung… so this
new surface adds NO sub-floor contrast debt." Measurably false.

`--ink-muted` is stamped by `useAtmosphereBoot.ts:100-106` from
`useContrastSafeColor.ts:324-330`, which certifies against `surfaceLightnessNow("resting", …)` —
**the resting glass PLATE**, documented at `useContrastSafeColor.ts:283-285` ("the referent is the
SURFACE RUNG, never the bare page ambient"). The ErrorBoundary puts that ink on the bare aurora
field. The certification does not transfer.

Measured, once C-1's occlusion is lifted so the glyphs actually paint: **3.70 : 1** at 16.4 px
(`text-mono-small`, Fira Code). WCAG 2.2 SC 1.4.3 floor for text under 18.66 px bold / 24 px is
4.5 : 1. The headline, which rides `text-foreground`, measures 8.37 : 1 and is fine.

**Cure:** C-1's cure. Put the plate back under the ink and the rung becomes true again.

---

### C-7 · MAJOR — vacuous gate: the one test cannot fail for any of the above

The component has **zero unit tests** and **one** e2e test,
`e2e/smoke/admin/a11y-authed-admin.spec.ts:108-156`.

```
$ grep -rn "ErrorBoundary" --include='*.vue' --include='*.ts' demo/ src/ test/ e2e/
demo/color-picker/App.vue:50 …  demo/color-picker/App.vue:180 …
e2e/smoke/admin/a11y-authed-admin.spec.ts:19 (comment)   :105 (comment)
```

`@vue/test-utils@2.4.11` is a declared devDependency with **zero importers** under `test/` or
`demo/test/` (the only importers in the tree are audit probes written by this mega-tranche's own
seats). vitest's include is `["test/**/*.ts", "demo/test/**/*.ts"]` (`vitest.config.ts:21`).

**Why the e2e cannot catch C-1.** Its strongest content assertion is
`expect(alertText.length).toBeGreaterThan(0)` (spec `:142-143`) — `textContent`, which is fully
present while the glyphs are 100 % occluded. Its locator filter `.filter({ visible: true })` is
Playwright visibility = non-empty bounding box and not `visibility:hidden`/`display:none`.
**Occlusion by another element is not un-visibility.** The test is green on a plate that shows
nothing.

**Named mutations that keep `vitest` + `playwright` + `vue-tsc` + `eslint` green:**

| # | Mutation | Why still green |
|---|---|---|
| M1 | `return false` → `return;` (line 68) | the boundary still paints; the anti-white-screen claim is simply never asserted |
| M2 | `function reset() {}` — empty body | no test ever clicks the button; the spec only asserts it is *visible* (`:152-155`) |
| M3 | delete `defineEmits` + `emit("reset")` | no listener exists anywhere |
| M4 | delete the `vj-error-boundary` token from the class list | matched by no CSS rule and no selector (see C-8) |
| M5 | `message = ""` default / any other string | no assertion on message content, only `length > 0`, and `App.vue:50` passes its own copy |
| M6 | delete `<p v-if="detail">` entirely | `alertText` still non-empty from the headline |

**Cure:** the gate must assert *painted* truth, not DOM truth — the same pixel-sampling method used
in this report, plus a unit suite for the state machine (latch, re-arm, focus restore, emit).

---

### C-8 · MINOR — `vj-error-boundary` is a dead hook class

```
$ grep -rn "vj-error-boundary" demo/ src/ e2e/
demo/color-picker/ErrorBoundary.vue:18   (the only occurrence)
```

It matches no CSS rule in `demo/styles/`, none in the SFC's own scoped block, and no test selector.
Owner edict 2 (no dead paths).

---

### C-9 · MINOR — the live region is created in the same commit as its content (Safari/VoiceOver)

Probe `C-F` — before the error, the boundary renders nothing but an HTML comment and the slot:

```
[C-F] pre-error [aria-live] count: 0
[C-F] pre-error [role=alert] count: 0
```

A live region inserted into the DOM together with its text is unreliably announced — most notably in
Safari/VoiceOver, which is precisely the engine the mega-tranche's visual matrix audits. The
announcement that does happen here comes from the focus move (C-4b), a *different* mechanism than
the WCAG 4.1.3 Status Messages one the header comment (`:6-7`) claims. Also `aria-live="assertive"`
(`:20`) is redundant: `role="alert"` already implies it.

**Cure:** keep an always-mounted empty live region and write into it, or (preferred, with C-1's cure)
let `EmptyState`'s `role="alert"` do it and stop double-declaring.

---

### C-10 · MINOR — the machine-truth detail is unbounded and unclamped

Probe `C-G` throws a 4000-character message:

```
[C-G] rendered detail length: 4000
[C-G] detail classes: text-mono-small plate-ink max-w-[46ch] break-words
```

`max-w-[46ch]` bounds the width, nothing bounds the height. Inside a `h-full … justify-center` flex
column with no `overflow`, a long message pushes the recovery Button out of the box — the only
affordance on the plate. Secondarily, raw internal error text (`Cannot read properties of null
(reading 'length')`) is shown verbatim to end users in production.

**Cure:** clamp (`line-clamp-3` + a details disclosure), or gate the raw text behind `import.meta.env.DEV`.

---

### C-11 · MINOR — a second `role="alert"` exists in the same document; the e2e locator is `.first()`

`demo/shell/dock/status-lamp.ts:39,53` gives `DockStatusLamp` `role: "alert"` for the dev-misconfig
variant. Measured live, with the boundary mounted and caught:

```
document.querySelector('[role="alert"]').textContent === "dev misconfigured — run `npm run dev`"
```

The lamp is in `nav`, which precedes `main` in DOM order, so it wins `.first()`. The U-F58 spec
binds `page.getByRole("alert").filter({ visible: true }).first()` (`:136`) and then asserts
`aria-live` and focus-containment on whatever it got. On the e2e origin the lamp is presumably
absent (VITE_API_URL is set), so this is fragility rather than an observed e2e failure —
**labelled a hypothesis for the e2e environment; the duplicate-role fact itself is measured.**

**Cure:** the spec should bind the boundary by a stable test id, not by role-and-hope.

---

### C-12 · MINOR — `.plate-ink` is copy-pasted into seven scoped blocks

Identical declaration `color: var(--ink-muted, var(--muted-foreground));` at:
`EmptyState.vue:102`, `ExtractWorkbench.vue:290`, `ImageDropZone.vue:109`, `ExtractControls.vue:148`,
`ConfigSliderPane.vue:205`, `ColorComponentDisplay.vue:200/205/211`, and now `ErrorBoundary.vue:84`.

Owner edict 5 (style at the root level, never per-instance) and edict 3 (KISS / no contrivance). One
`@utility plate-ink` in `demo/styles/foundation.css` replaces seven scoped blocks. The
`var(--ink-muted, …)` fallback is additionally a masking fallback (edict 2): `--ink-muted` is stamped
by a `watch(..., { immediate: true })` during App setup, before any pane can render, so the fallback
arm is unreachable — it can only hide a boot regression.

*(Inherited idiom, not this component's invention; ErrorBoundary is the seventh copy, not the first.)*

---

### C-13 · INFO — the boundary structurally cannot catch this app's actual failure mode

`onErrorCaptured` catches render / lifecycle / watcher / handler throws. It does not catch rejected
promises. Every real failure surface here is async. In the same live session that produced the
findings above, a genuine app failure was logged and *never reached the boundary*:

```
warning: Failed to load remote palettes: DevMisconfigError: value.js dev is MISCONFIGURED: …
```

The repo's only induced-error test therefore exercises the one failure class the app doesn't
actually have. Not a defect in the code as written — a scope claim in the header comment ("When any
descendant pane throws during render / lifecycle") that is narrower than the surrounding prose
("NEVER a silent white-screen dead plate") implies.

---

### C-14 · INFO (HYPOTHESIS — no exhaustion repro run) — reset churns the WebGL2 context

`reset()` remounts the whole pane tree, including `KeepAlive`'s cache and the GooBlob WebGL2 context.

```
$ grep -rn "loseContext\|WEBGL_lose_context" demo/
(no matches)
```

No explicit context release anywhere in `demo/`. The mega-tranche's own visual report already
records `safari-desktop-light /#/: WebGL: context lost.` as the single console error across 60
captures (`docs/tranches/V/megatranche/audit/visual/REPORT.md`). Repeated boundary resets — which
C-5 makes *likely*, since the button loops — churn contexts against a browser cap of ~16.
Unmeasured; a hypothesis, flagged for the WebGL lane rather than this one.

---

### C-15 · INFO — the consumer re-passes the component's own default verbatim

`App.vue:50` `message="This panel hit an unexpected error."` is byte-identical to the default at
`ErrorBoundary.vue:44`. One of the two is dead. Trivial, but it is exactly the duplication edict 3
forbids and it means the default is untested by the only consumer.

---

## Edict compliance summary

| Edict | Status |
|---|---|
| 1 · no god modules | PASS — 87 lines, one concern |
| 2 · no legacy / dead paths / masking fallbacks | **FAIL** — C-5 (dead emit), C-8 (dead class), C-12 (masking `var()` fallback) |
| 3 · KISS, no contrivance | **FAIL** — C-1 cure note: a hand-rolled second copy of `EmptyState variant="error"`; C-15 |
| 4 · glass-ui is the design system | PASS — `../ui/button` re-exports `@mkbabb/glass-ui`'s `Button` (`demo/ui/button/index.ts`) |
| 5 · root-level styling | **FAIL** — C-12, the seventh copy of `.plate-ink` |
| 6 · animations never deleted | PASS — none present |
| 7 · idiomatic Vue 3.5 | PASS — `useTemplateRef`, reactive props destructure, no `defineModel` round-trip |
| 8 · `verbatimModuleSyntax` | PASS — no type-only imports in the file |

## Non-findings (checked, clean)

- No `defineModel` → the stale-read hazard does not apply.
- No colour maths, no `ValueUnit` wrapping, no `stableHue` → those hazards do not apply.
- No `requestAnimationFrame`, no timers, no listeners, no observers → nothing to leak; the single
  `nextTick` callback is `?.`-guarded and self-terminating.
- No parsing → the `parseCssColor` crash class does not apply.
- Recovery button measures 124 × 36 px — above the 24 px tap floor — and has the accessible name
  "Try again"; it contributes nothing to the visual report's nameless-button or small-target counts.
- No per-frame or per-keystroke work; the component is inert until it catches.

## Artifacts

- `probes/challenge-c-impl.test.ts`, `probes/vitest.challenge-c.config.ts` — 7 unit probes, all green
- `evidence/probe-live-latching.mjs` — C-2, C-3, C-4a live
- `evidence/probe-live-stacking.mjs` — C-1 mechanism + runtime cure proof
- `evidence/probe-live-pixels.mjs` — C-1 / C-6 measured contrast
- `evidence/01-shipped-full-viewport.png`, `evidence/02-shipped-crop-only-button-paints.png`,
  `evidence/03-runtime-position-relative-restores-text.png`
