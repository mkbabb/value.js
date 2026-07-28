# CHALLENGE-C (r2) — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)** — the model this
seat was explicitly spawned with. Declared, not inherited, not undeclared.

---

## Verdict: **DEFECTIVE** — 1 BLOCKER, 8 MAJOR, 3 MINOR, 3 INFO

An r1 pass of this seat exists; it is preserved verbatim at
`challenge-C-implementation.r1-prior.md`. This r2 was run **without reading r1 until every probe had
already been executed and every finding written down**, on a *different apparatus*, precisely so that
agreement would mean something. It does mean something: r1's BLOCKER and its six MAJORs reproduce
under an independent harness. Below, each r1 finding is marked **CONFIRMED-INDEPENDENTLY** with my
own pasted output; three findings are **NEW**; one is **CORRECTED** (r1 named the wrong mechanism for
a real symptom, and the correction changes the cure); and one candidate BLOCKER is **DISPROVED** and
recorded so no downstream seat files it.

The headline is unchanged and now doubly measured: **`data-mix-target` at
`MixResultDisplay.vue:69` does not exist in the shipped DOM.** glass-ui 7.0.0's `WatercolorDot`
declares `inheritAttrs: false` and forwards only `class` and `style`; every other attribute the
consumer writes is discarded. The whole documented purpose of this component — *"the anchor the
canvas convergence lands on"* (`MixResultDisplay.vue:14`) — is not wired to anything.

---

## Apparatus (and why it differs from r1)

r1 mounted the SFC in isolation via `createApp(mod.default).mount(host)` through Vite's `/@fs/`
graph. **I drove the real application**: the live dev server at `http://localhost:9000`, the real
router at `/#/mix`, the real `MixPane` → `MixResultDisplay` tree, the real
`MixAnimationCanvas`/`useMixingAnimation` clock, the real stylesheet cascade and the real pane
`Card` ancestor. States that a user cannot reach today (see D-1's corollary) were forced by reaching
into the live `MixPane` instance's `setupState` — the component's own reactive source, not a stub:

```js
const app = document.querySelector("#app").__vue_app__;   // walk to the MixPane instance
window.__mix.setupState.addColor("oklch(0.7 0.15 30)", "probe");
window.__mix.setupState.startMix();                        // real startMix, real phase machine
```

Probe scripts: `scratchpad/wbmix-probe{2,3,4,5,6,7,8,9,10,11}.mjs`. Every block below is pasted tool
output, a `file:line`, or a measured number.

**One apparatus hazard, disclosed up front** — see *Disproved* at the end: headless Chromium
throttles `requestAnimationFrame` to **1 frame per ~1960 ms** on this page. Any measurement of the
mix choreography must force paints or it will manufacture a false "the phase machine is stranded"
BLOCKER. I nearly filed one.

---

## D-1 · BLOCKER — the convergence anchor `data-mix-target` never reaches the DOM

**CONFIRMED-INDEPENDENTLY.**

`MixResultDisplay.vue:64-73` writes `data-mix-target` on a `<WatercolorDot>`.
`mixStage.ts:121` reads it: `root.querySelector<HTMLElement>("[data-mix-target]")`.

Driven through the real pane — sampled inside the ghost window and again after settle:

```
=== GHOST WINDOW t+120ms ===
{ "plateExists": true,
  "plateClass": "mix-plate … mix-plate--ghost vj-morph-enter-from vj-morph-enter-active",
  "mixTargetCount": 0 }

=== SETTLED ===
{ "mixTargetCount": 0,
  "swatches": [ { "tag": "span", "variant": "ghost", "ariaHidden": "true",
                  "hasMixTarget": false, "title": null,
                  "attrs": ["data-v-292b9032","data-v-0f138735","aria-hidden",
                            "class","data-testid","data-variant","style"] } ] }
```

Seven attributes survive. `data-mix-target` is not among them, and neither is anything else the
consumer wrote. The mechanism is in the shipped bundle,
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, and the render function
reads `useAttrs()` for exactly two keys:

```js
setup(e) { let t = e, n = h(), c = i(() => n.class), f = i(() => n.style), …
  return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, …]),
      "data-testid": "watercolor-swatch", "data-variant": e.variant, style: u([f.value, …]) }, …
```

No `mergeProps($attrs)` anywhere. Source confirms it is deliberate:
`/Users/mkbabb/Programming/glass-ui/src/components/watercolor-dot/WatercolorDot.vue:6` —
`defineOptions({ inheritAttrs: false });`.

**Consequence, at `mixStage.ts:122-124`:**

```ts
const target = targetEl ? layoutCenter(targetEl, root)
                        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

The fallback is *silent*. The drops converge on a fraction of the scroll height, not on the well.
Measured on the live pane at the moment of arming: canvas `styleH: "681px"`, `w: 510`, so the
guessed landing point is `(255, 477)` in a 681 px-tall stage, while the actual plate sits wherever
the flow put it. Everything the docstring promises — *"the silhouette the pigment poured into is the
silhouette the result wears"* — is narration over a hard-coded guess.

**Corollary, and it is worse than the anchor.** The same drop kills the *only* way to reach this
component. `MixSourceSelector.vue:164-176` writes `tag="button"`, `aria-label`, `:disabled` and
`@click` on a `<WatercolorDot>` and puts a `<Plus>` in its default slot. Measured live:

```
=== .add-slot-ghost (MixSourceSelector) ===
{ "tag": "span",
  "attrs": ["data-v-292b9032","data-v-a3e86846","aria-hidden","class","data-testid",
            "data-variant","style"],
  "pointerEvents": "none" }
```

A `<span>`, `aria-hidden="true"`, `pointer-events: none`, no click handler, no accessible name — and
`WatercolorDot`'s render function contains no `renderSlot`, so the `<Plus>` glyph never renders
either. `getByRole("button", { name: "Add current color to the mix" })` → **count 0**. In colours
mode there is no other add affordance; the "From palettes" swatches at
`MixSourceSelector.vue:211-221` are the same dead pattern. **`/#/mix` cannot produce a mix at all
today.** That break belongs to the source-selector seat; it is recorded here because it is the same
root mechanism and because it is why every gate over this component is unreachable (D-11).

**Cure — architectural, not a patch.** Do not chase the attribute with a wrapper `<div
data-mix-target>` (that is contrivance, edict #3, and it re-breaks the moment the dot's box changes).
The handshake is a *component contract*, so make it one: glass-ui's `WatercolorDot` must expose the
anchor as a first-class API — `v-bind="$attrs"` on the root plus a documented `as`/`tag` prop and a
`<slot/>`, relayed to the glass-ui BH inbox as a standing fond (owner edict, mail law). Until glass
ships it, the *honest* local form is a `useTemplateRef` on the dot's root element handed to the
animation composable directly, so the anchor is a typed reference rather than a stringly-typed
`querySelector` that fails open. A `querySelector` handshake that silently degrades to a guess is the
defect *class*; the missing attribute is only this instance of it.

---

## D-15 · MAJOR · **NEW** — `<DockSeparator />` renders **1 px × 0 px**: an invisible element that still speaks to AT

`MixResultDisplay.vue:135` places `<DockSeparator />` between Save and Reset. Measured on the live
settled plate:

```
{ "sepExists": true,
  "sepRect": { "w": 1, "h": 0 },
  "sepHeightComputed": "0px",
  "sepVarResolved": "",
  "sepBg": "color(srgb 0.11 0.098 0.09 / 0.15) …",
  "sepRole": "separator" }
```

Mechanism: `glass-ui/dist/components/dock/styles/layer-group.css` —

```css
.dock-separator { @apply flex-shrink-0; width: 1px; height: var(--dock-separator-height);
                  margin: 0 0.375rem; background: var(--surface-tint-15); }
```

and `--dock-separator-height` is minted **only on `.glass-dock`**
(`dist/components/dock/styles/shell.css`: `--dock-separator-height: calc(var(--dock-h, var(--size-icon-btn)) * 0.5)`).
The result plate is a `Card`, not a dock, so the custom property is unset, `height` computes to
`0px`, and the element paints nothing. The screenshot confirms it: the gap between Save and Reset in
`scratchpad/wbmix-palette-settled.png` is pure margin, no rule.

So the row ships a **dead visual with a live semantic**: `role="separator"` is exposed to assistive
technology announcing a division that sighted users cannot see, and the intended grouping (destructive
Reset held apart from Copy/Save) is communicated by 12 px of whitespace alone.

This is edict #4 in the negative direction: a *dock* primitive deployed outside a dock. Its styling
contract is `.glass-dock`-scoped by construction — the same reason `DockControl compact`'s sizing
tokens fall back to `auto` here (D-12).

**Cure.** Either the separator belongs to the design system at a level that does not require a dock
ancestor — file it to glass-ui as `Separator`, the existing component-type name (`dist/separator.d.ts`
already exists), reused rather than re-minted — or the plate's action row drops the separator and
expresses the grouping with layout (a `gap` step or a flex spacer) that owes nothing to an absent
token. Do not paper over it with a per-instance `--dock-separator-height` on the plate: that is the
per-instance override edict #5 forbids, and it would make a card silently claim to be a dock.

---

## D-16 · MAJOR · **NEW** — an empty palette result makes the gradient strip paint the **previous** result's colours

This *sharpens r1's D-8 into a different and worse defect*. r1 mounted the plate fresh with
`colors: []` and measured `computedBgImage: "none"` — a blank. In the real pane the plate is **not**
freshly mounted (`MixPane.vue:111-119` keeps `MixResultDisplay` alive while `mixResult` is truthy),
so the strip already holds a valid gradient when the empty result arrives.

`MixResultDisplay.vue:109-116` builds the strip through an inline `:style` binding:

```
background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})`
```

With `colors: []` that string is `linear-gradient(to right, )` — invalid. **CSSOM rejects an invalid
assignment and leaves the previous value in place.** Measured on both shipping engines:

```
--- chromium ---  { "zero": { "inline": "", "computed": "none" },
                    "staleAfterInvalid": "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))" }
--- webkit   ---  { "zero": { "inline": "", "computed": "none" },
                    "staleAfterInvalid": "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 255))" }
```

And live, in the app, driving a 3-colour result and then an empty one:

```
3-colour palette:        { "rowChildren": 3,
                           "stripComputed": "linear-gradient(to right, rgb(255,0,0), rgb(0,255,0), rgb(0,0,255))" }
EMPTY palette (after 3): { "rowChildren": 0,
                           "stripComputed": "linear-gradient(to right, rgb(255,0,0), rgb(0,255,0), rgb(0,0,255))" }
```

The swatch dots correctly vanish; **the gradient strip keeps painting red→green→blue for a result
that contains no colours.** The plate is not blank — it *lies*. A blank state is a hole; a stale
state is a false statement, and the user's next act (Copy → `""`, which `useClipboard` reports as
*success*; Save → an empty palette persisted via `MixPane.vue:44-46`) is taken against a strip that
still shows three colours.

Reachability is r1's, and it holds: `mix.ts:123` `if (resultLength === 0) return []` fires whenever
the shortest selected palette is empty under the default `discard` strategy
(`useMixingState.ts:46`), and `useMixingState.ts:97` assigns `{ type: "palette", colors: [] }`
unconditionally.

*Checked and NOT a defect:* a **one**-colour result. I assumed `linear-gradient(to right, red)` was
invalid (< 2 stops) and it is not — both engines accept it:
`"one": { "computed": "linear-gradient(to right, rgb(255, 0, 0))" }`, Chromium and WebKit alike. r1's
parenthetical calling it "degenerate, cosmetic" is right; my prior hypothesis was wrong and is
retracted here rather than shipped.

**Cure.** The strip must not be a string concatenation whose failure mode is *retain the last truth*.
Two moves, both structural: (a) make the empty case unrepresentable — r1's D-9 discriminated union
(`colors: readonly [PaletteColor, ...PaletteColor[]]`) means `startMix` must decide at the one site
that knows what an empty mix *means*; and (b) while the type is still loose, gate the strip on
`result.colors.length > 1` rather than on the truthiness of an array, so an invalid declaration is
never assigned. `v-if="result.colors"` is truthy for `[]` — that guard is wrong twice, and this is the
second, sharper way it is wrong.

---

## D-10′ · MAJOR (r1 had MINOR) · **CORRECTED MECHANISM** — the `vj-enter` TransitionGroup never fires a single class

r1 attributes the dead stagger to `:key="i"` (index keys → Vue patches in place). The symptom is real;
the mechanism is not the key, and the difference changes the cure.

I armed a `MutationObserver` over `document.body` filtering `class` mutations, then ran the **real**
ghost→done flip with a 3-colour palette result and forced paints throughout:

```
total vj-* class mutations: 24
on watercolor swatches anywhere: []
```

**Zero.** Not one `vj-enter-*` class ever lands on a `WatercolorDot` — anywhere on the page, in the
plate or out of it. The 24 mutations are all `vj-morph-*` on the plate/content divs, plus
`vj-enter-*` on `MixSourceSelector`'s chip `div`s (whose TransitionGroup lives *across* updates, so
its transitions do work).

The operative cause is at `MixResultDisplay.vue:60` and `:76`:

```html
<Transition name="vj-morph" mode="out-in">
  <div v-if="ghost"  key="well"    …>
  <div v-else        key="content" …>   <!-- hosts the TransitionGroup -->
```

Every ghost→live flip **unmounts and remounts** the `key="content"` branch, so the `<TransitionGroup>`
and all its children are always an *initial render* — and `TransitionGroup` does not animate on
initial render without `appear`, which is not set (`:92-96`). The shipping flow has no other path:
`MixPane.vue:111` keeps the component mounted across a re-mix, `ghost` flips true then false, and the
group is born again each time. Fixing `:key` alone resurrects nothing.

Two collaterals follow:

* The shared `.swatch-row` recipe at `demo/styles/utils.css:174-179` — advertised in its own comment
  as *"shared by the three swatch TransitionGroups (CurrentPaletteEditor, MixSourceSelector,
  MixResultDisplay)"* — is **inert for this consumer**. A three-consumer utility that is dead in one
  of the three is a false claim in the design record.
* `.swatch-row > .vj-enter-leave-active { position: absolute }` (`utils.css:177-179`) assumes a
  positioned row. Measured: `"swatchRowPosition": "static"`. If the leave transition ever *did* fire
  here, a leaving dot would resolve against the nearest positioned ancestor — the pane `Card`
  (`MixPane.vue:62`, `class="relative …"`) — and fly to the card's top-left corner. **Two defects are
  masking each other**: the recipe is broken *and* unreachable. Filed as D-17 (MINOR, latent).

**Cure.** Decide what the swatch row's arrival *is*. If the dots should stagger in as the plate inks,
the honest form is `appear` on the TransitionGroup (the family's entrance is exactly what
`vj-enter` names) plus a colour-identity key so a re-mix animates the *changed* dots — not the index,
which couples a dot's silhouette seed (`:104`) to its slot rather than to what it is. If the plate's
`vj-morph` is meant to be the *only* motion (one surface, new content — the family law the docstring
cites at `:17`), then the `name="vj-enter"` and the `swatch-row` class must be **deleted**, and the
utility's comment corrected to two consumers. What must not survive is the present state: a named
animation, a shared recipe, and a positioning rule that all point at motion that never happens.
(Edict #6 is not violated by deleting an animation that provably never plays — it is violated by the
*record* claiming it does.)

---

## D-17 · MINOR · **NEW** — `.swatch-row` leave rule has no positioned ancestor

Detail and evidence in D-10′ above: `utils.css:177-179` absolutely-positions the leaving dot;
measured `.swatch-row` computed `position: static`; the nearest positioned ancestor is the pane
`Card`. Latent only because D-10′ prevents the class from ever being applied here. **Cure:**
`position: relative` on `.swatch-row` in the shared recipe (it is the recipe's own precondition, so it
belongs in the recipe — not per-instance, edict #5), fixed together with D-10′ or the rule deleted
with it.

---

## Findings confirmed independently from r1 (same conclusion, my own apparatus)

These are r1's; I reproduced each on the router-driven pane before reading r1. They are restated
compactly with my measurements so the ledger carries two independent witnesses.

**D-2 · MAJOR — dead `tag` props, dropped `:title`; palette results are unreadable.**
`tag="div"` at `:67`, `:81`, `:101` is not a `WatercolorDot` prop
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts` declares exactly
`color | variant | animate | cycleDuration | range | seed`) and is dropped; `:title="color.css"` at
`:103` is dropped. Measured, palette result: `"dots": [{ "title": null }, { "title": null },
{ "title": null }]`, and the plate's entire accessible text is `"innerText": "RESULT"` — the dots are
hard-coded `aria-hidden="true"` by the component, the gradient is `aria-hidden` at `:114`, and the
`title` that was the only remaining textual affordance never lands. **A palette mix result carries no
readable value by any means** — confirmed visually in `scratchpad/wbmix-palette-settled.png`: three
dots, one gradient bar, three unlabelled icons, no text.

**D-3 · MAJOR — the scoped `.mix-plate` transition deletes two thirds of `vj-morph`.**
Measured in the live cascade, sampled the instant the class lands:

```
"snapshotsDuringEnter": [ { "cls": "vj-morph-enter-from vj-morph-enter-active",
                            "property": "opacity", "duration": "0.2s" }, … ],
"family":               { "property": "opacity, transform, max-height",
                          "duration": "0.2s, 0.44s, 0.3s" }
```

`.mix-plate[data-v-…]` (0,2,0) beats `.vj-morph-enter-active` (0,1,0), and the `transition`
*shorthand* at `:153` resets `transition-property` to `opacity`. The 0.44 s `--spring-snappy`
transform and the 0.3 s height morph are gone on this element. Edicts #5 and #6 both.

**D-4 · MAJOR — async result silent to AT; three buttons named only by `title`.** Measured:

```
"btns": [ { "w":28,"h":28,"title":"Copy color","ariaLabel":null,"text":"","type":"button" },
          { "w":28,"h":28,"title":"Save to palettes","ariaLabel":null,"text":"" },
          { "w":28,"h":28,"title":"Reset","ariaLabel":null,"text":"" } ],
"liveRegions": 0, "role=status|alert": 0
```

The repo's own harness rule (`audit/visual/capture.mjs:102-105`) counts a button nameless without
`aria-label`/`aria-labelledby`/text, so this component contributes **3** the moment a result renders.
That rule's calibration is visible in `REPORT.md`: `/#/extract` = 3 nameless (matching
`ExtractControls.vue`'s three title-only `DockControl`s) and `/#/gradient` = 1 (matching
`GradientVisualizer.vue:254`). `/#/mix` reads 1 today only because the capture never triggers a mix —
`REPORT.json`'s mix row attributes all 8 small targets and the 1 nameless button to the dock
(`"Switch to slug"`, `"Generate new slug"`, `"Cancel"`, the four channel spans). **This component is
an audit blind spot, not a clean row.** The repo's own convention is `aria-label`
(`demo/shell/dock/Dock.vue:143-154`, `MixSourceSelector.vue:171/251`); the workbenches deviate.

**D-5 · MAJOR — clipboard failure is completely silent.** Reproduced by replacing
`navigator.clipboard.writeText` with a `NotAllowedError` rejection — the exact shape of the
non-secure-context / denied-permission path the repo hits over LAN http (`vite.config.ts`
`server.host: true`):

```
[console.warning] [useClipboard] clipboard writeText rejected: NotAllowedError: denied
{ "before": { "title": "Copy color" },
  "after":  { "title": "Copy color", "plateText": "RESULT", "liveRegions": 0, "role": 0 } }
```

Nothing visible changes. `:32` collapses a four-state machine to `status === "success"`, and the
shipped `useClipboard` arms its reset timer *only* on the success branch, so `failure` never clears.

**D-6 · MAJOR — stale copy confirmation.** `invalidate()` is returned by `useClipboard` and never
destructured at `:31`; a re-mix changes `result` while the check mark still affirms the old value.

**D-7 · MAJOR — two divergent copy implementations for one action.**
`MixResultDisplay.vue:42-47` (glass-7 `useClipboard`, with confirmation) and `MixPane.vue:49-55`
(raw `writeClipboard`, no confirmation) duplicate the same derivation verbatim.
`demo/shell/usePaneRouter.ts:222` routes the dock's "Copy result" command to the *second* one, so
copying from the dock never flips the plate's icon. Edict #2 (no dual paths).

**D-8 · MAJOR — empty palette result renders live actions over nothing.** Confirmed; superseded in
sharpness by D-16.

**D-9 · MINOR — `MixResult` permits blank states.** `useMixingState.ts:32-36` is a non-discriminated
interface with `css?`/`colors?`; measured `{ type: "color" }` with no `css` → `"dots": []`,
`"innerText": "RESULT"`, three live buttons. It is what forces the four masking `??` fallbacks at
`:37-39` and `:44-45`.

**D-11 · MAJOR (test truth) — the gate is vacuous.** No unit test mounts this component
(`grep -rln "MixResultDisplay\|mix-result" test demo e2e` → only the two source files and
`demo/styles/utils.css`). `npx vue-tsc -p tsconfig.demo.json --noEmit` → clean, exit 0: Vue models
unknown component attributes as fallthrough, so "forwarded into a black hole" has no diagnostic. And
the two e2e specs that *do* assert the anchor die earlier — run on this tree at HEAD:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', …).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Timeout: 8000ms
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

Line 42, not line 52 — **`e2e/smoke/views/mix.spec.ts:52`'s `[data-mix-target]` assertion has never
been evaluated**, nor has `e2e/smoke/safari/mix-flow.spec.ts:40`'s. The vacuous mutation is exact:
*delete `data-mix-target` from `MixResultDisplay.vue:69`.* Typecheck stays green (verified), the unit
suite stays green (there is none), and both e2e specs fail identically because they already fail
earlier — the mutant is **behaviourally indistinguishable from what ships**.

---

## INFO

* **D-12 — tap targets 28 × 28.** Measured on all three controls. `DockControl compact` resolves to
  `width/height: var(--dock-compact-control-size, auto)` + `padding: 0.25rem`
  (`dist/components/dock/styles/controls/icon-button.css`) with a `1.25rem` forced glyph → 28 px,
  because `--dock-compact-control-size` is a `.glass-dock` token that is unset outside a dock (the
  same absent-token family as D-15). Passes the harness's 24 px bar and WCAG 2.5.8; below 2.5.5's
  44 px. Not filed as a defect at the stated bar.
* **D-13 — redundant config.** `useClipboard({ resetMs: 1500 })` at `:31` restates the library
  default (`i.resetMs ?? 1500` in the dist).
* **D-14 — inconsistent built-in import.** `:4` imports `TransitionGroup` from `vue` while
  `Transition` (`:60`) is left to auto-resolution; both auto-resolve in `<script setup>`.
* **The copy button's label is wrong in palette mode.** `:123` reads `"Copy color"` while `:44-45`
  copies a comma-joined list of N colours. Cosmetic, but it is the label a screen-reader user would
  hear if D-4 were fixed by promoting `title` to `aria-label` — fix them together.

---

## Disproved — recorded so no downstream seat files it

**Candidate BLOCKER: "the phase machine strands in `mixing`; the plate never inks in."**
Observed, and it looked airtight — the plate held `mix-plate--ghost` and `plateText: "RESULT"` with
zero action buttons for the full sample window:

```
t+126ms  {"phase":"mixing","ghostClass":true,"plateText":"RESULT"}
…
t+4004ms {"phase":"mixing","ghostClass":true,"plateText":"RESULT"}
```

It is a **harness artifact**. Measured rAF liveness on this page under headless Chromium:

```
rAF liveness: {"frames":1,"ms":1960}
```

One frame per ~2 s. `useMixingAnimation`'s clock rides glass-ui's `useRAFLoop`, so `elapsed` never
crossed `MIX_CONVERGE_MS = 900` within the window. Forcing paints (screenshot/`getImageData` per
tick) settles it normally:

```
sample {"phase":"mixing","inkedSamples":0}
sample {"phase":"mixing","inkedSamples":19}   ← the canvas is genuinely painting the pool
sample {"phase":"done","inkedSamples":0}      ← settled, canvas cleared
```

`arm()` is also proved to have run past its guards in the real pane (`canvas.style.height = "681px"`,
`canvas.width = 510`), and every early-return path in `useMixingAnimation.ts:116-158` calls
`onSettled()`, so the phase machine cannot strand by construction. **No product defect. Do not file.**

Also disproved: my own hypothesis that a single-stop `linear-gradient` is invalid CSS — both engines
accept it (D-16).

---

## Checks that came back clean (the negatives, proved)

* **`verbatimModuleSyntax`** — compliant. `:7` is `import type { MixResult }`; every other import is
  a used value.
* **Vue 3.5 idiom** — reactive props destructure with a default at `:20-23` is correct; `result` is
  read inside `computed` (`:36-40`) and inside the async handler (`:42-47`), so the compiler emits
  `props.result` and the read is fresh at call time, not captured. No stale-read.
* **No `defineModel`** — the `WritableComputedRef` async-round-trip hazard does not apply; the
  component is props-down/emits-up (`:25-28`).
* **No timers, no listeners, no observers, no rAF owned here.** `useClipboard` registers
  `onScopeDispose(() => { alive = false; seq++; clearTimeout(…) })` in the shipped dist, so the
  1500 ms reset timer cannot outlive the scope. Zero PRM-RAF exposure. The feature's one rAF lives in
  `useMixingAnimation.ts:88-114` with `pauseWhenHidden`, an explicit `onBeforeUnmount` stop (`:187`),
  and a PRM fast-path that *completes* rather than pauses (`:120-125`) — correct, and the reasoning
  in its docstring is sound.
* **No `ValueUnit` wrapping, no oklch→HSV roundtrip, no `parseCssColor`** in this component; it
  consumes pre-formatted CSS strings. The `var(--muted-foreground)` fallback at `:37`/`:39` reaches
  `WatercolorDot` only as a background/custom-property value and a hash input — no parser is invoked,
  so the live `parseCssColor` crash class does not touch this file. (It is upstream, at
  `mixStage.ts:99-100`.)
* **No WebGL.** `WatercolorDot` is a CSS/SVG primitive by design; the mix canvas is 2D.
* **No god module** — 159 lines, one job, one export.
* **Focus order is clean** — measured `focusables: [Copy, Save, Reset]`, all `tabIndex: 0`, DOM order
  = visual order, no positive tabindex, no focus trap.
* **`/#/mix` route health** (`REPORT.md:123,138,153,168`): 0 page errors, 0 console errors, 0
  horizontal overflow, exactly 1 `main` across all four Safari matrices. The plate contributes
  nothing to those numbers because `v-if="mixResult"` keeps it out of every capture — recorded as a
  **coverage gap in the visual audit**, not as evidence of health. The only console error I saw on
  the live pane was the dev-config `VITE_API_URL` warning, unrelated to this component.

---

## Ranked

| # | severity | status | defect |
|---|---|---|---|
| D-1 | **BLOCKER** | confirmed | `data-mix-target` dropped by glass-7 `inheritAttrs:false`; convergence lands on a silent hard-coded guess (`mixStage.ts:124`). Corollary: the same drop kills `MixSourceSelector`'s add-slot, so the mix flow is unreachable end-to-end |
| D-2 | MAJOR | confirmed | three dead `tag="div"` + dropped `:title`; a palette result has **no** readable value (`innerText: "RESULT"`) |
| D-3 | MAJOR | confirmed | scoped `.mix-plate` shorthand overrides `.vj-morph-enter-active`, deleting the transform + max-height channels (edicts 5 & 6) |
| D-4 | MAJOR | confirmed | no `aria-live` on an async result; 3 buttons named only by `title` (3 nameless by the repo's own rule; latent in REPORT because the capture never mixes) |
| D-5 | MAJOR | confirmed | clipboard `failure` never rendered, never reset, no `onCopyError` — silent no-op on LAN-http mobile |
| D-6 | MAJOR | confirmed | copy confirmation stale across a re-mix; `invalidate()` exists, never called |
| D-7 | MAJOR | confirmed | two divergent copy implementations for one action; the dock routes to the one with no feedback (edict 2) |
| **D-15** | MAJOR | **NEW** | `<DockSeparator/>` measures 1 × **0** px — invisible, yet exposes `role="separator"`; a dock primitive outside a dock (edict 4) |
| **D-16** | MAJOR | **NEW** | empty palette result → invalid `linear-gradient(to right, )` → CSSOM retains the **previous** result's gradient; the strip paints colours that are not in the result (both engines) |
| **D-10′** | MAJOR | **CORRECTED** | the `vj-enter` TransitionGroup fires **zero** classes — cause is the `mode="out-in"` remount + no `appear`, not the index key; the shared `.swatch-row` recipe is inert for 1 of its 3 claimed consumers |
| D-8 | MAJOR | confirmed | empty palette result renders live Copy/Save over nothing; reachable via `mix.ts:123` |
| D-9 | MINOR | confirmed | `MixResult` permits blank states; four masking `??` fallbacks are the symptom |
| **D-17** | MINOR | **NEW** | `.swatch-row > .vj-enter-leave-active { position: absolute }` with a `static` row — a leaving dot would fly to the pane `Card`'s corner; latent behind D-10′ |
| D-11 | MAJOR | confirmed | vacuous gate: 0 unit tests, both e2e specs RED at an earlier line (run + pasted), typecheck structurally blind; the vacuous mutation *is* the shipped state |
| D-12/13/14 | INFO | confirmed | 28 px targets (absent dock token) · redundant `resetMs` · inconsistent built-in import |

**The one sentence:** a dependency major bump changed an attribute-forwarding contract that no gate in
this repository can observe, and the component's single most important line has been decorative ever
since — and the three findings this pass adds are all the same shape, a *declared* thing (an anchor, a
separator, an animation, a gradient) that the runtime silently declines to honour while the source,
the comments and the design record all go on asserting it.
