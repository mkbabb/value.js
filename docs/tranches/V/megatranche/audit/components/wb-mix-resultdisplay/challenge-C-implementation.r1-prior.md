# CHALLENGE-C — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the model declared for this
seat. Not inherited, not undeclared.

---

## Verdict: **DEFECTIVE** — 1 BLOCKER, 6 MAJOR, 3 MINOR, 3 INFO

The component's single most load-bearing line — `data-mix-target` at `MixResultDisplay.vue:69`,
the anchor the entire mix convergence animation aims at — **does not exist in the shipped DOM**.
The attribute is written on a `<WatercolorDot>`, and glass-ui **7.0.0**'s `WatercolorDot` declares
`inheritAttrs: false` and forwards only `class` + `style`. Every non-prop attribute the consumer
writes on that element is silently discarded. The convergence therefore lands on a hard-coded
guess (`mixStage.ts:124`) roughly **180–220 px above the well it is documented to land in**.

This is not a hypothesis. I mounted the component through the live Vite dev server and counted
zero `[data-mix-target]` nodes.

The defect is invisible to every gate: `vue-tsc -p tsconfig.demo.json --noEmit` exits clean
(Vue models unknown component attributes as fallthrough attrs — no diagnostic exists for
"forwarded into a black hole"); the component has **zero unit tests**; and the two e2e specs that
*do* assert `[data-mix-target]` both die at an *earlier* line, so that assertion has never been
evaluated.

---

## Method / evidence apparatus

Probes were run against the live dev server at `http://localhost:9000` by importing the real SFC
through Vite's `/@fs/` module graph and mounting it with real props — i.e. the *shipped* component,
real glass-ui 7.0.0, real stylesheet cascade. Every number below is pasted tool output.

```js
const vue = await import('/@id/vue');
const mod = await import('/@fs/Users/mkbabb/Programming/value.js/demo/workbenches/mix/MixResultDisplay.vue');
vue.createApp(mod.default, { result: {...}, ghost: ... }).mount(host);
```

---

## D-1 · BLOCKER — the convergence anchor `data-mix-target` never reaches the DOM

### The claim

`MixResultDisplay.vue:69` writes `data-mix-target` on `<WatercolorDot>`. It is dropped. The mix
animation's landing point falls back to a hard-coded guess.

### Reproduction (run, output pasted)

Mount the component in its ghost (in-flight) state — the exact state `MixPane.vue:115` renders
while `animationPhase === 'mixing'`:

```
{
 "path": "/@fs/Users/mkbabb/Programming/value.js/demo/workbenches/mix/MixResultDisplay.vue",
 "mixTargetsInProbe": 0,
 "dotTag": "SPAN",
 "dotAttrs": [
  "data-v-292b9032", "data-v-0f138735", "aria-hidden",
  "class", "data-testid", "data-variant", "style"
 ],
 "html": "<div class=\"mix-plate … mix-plate--ghost\"><span …>Result</span><div class=\"flex items-center gap-3\"><span data-v-292b9032 data-v-0f138735 aria-hidden=\"true\" class=\"shrink-0 w-14 h-14 watercolor-swatch\" data-testid=\"watercolor-swatch\" data-variant=\"ghost\" style=\"border-radius: …; pointer-events: none; --watercolor-color: oklab(0.6 0.1 0.05); …\"><SVG/>…"
}
```

`mixTargetsInProbe: 0`. `data-mix-target` is absent from the rendered attribute list. The `tag`
attribute is absent too (see D-2).

### Mechanism

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — the shipped 7.0.0 build:

```js
E = e(c({
  inheritAttrs: !1,              // ← every fallthrough attr is discarded
  __name: "WatercolorDot",
  props: { color, variant, animate, cycleDuration, range, seed },
  setup(e) {
    let n = h(),                 // useAttrs()
        c = i(() => n.class),    // ← ONLY class
        f = i(() => n.style);    // ← ONLY style
    return (…) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, …]), … }))
```

The root is always a `<span>`; only `attrs.class` and `attrs.style` are re-bound. `data-*`,
`aria-*`, `title`, `id`, and event listeners are all discarded with no warning.

### Downstream consequence — the animation aims at nothing

`demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

`targetEl` is *always* `null`, so the pool always lands at the `else` guess. Measured on the live
`/#/mix` pane (the canvas's real `parentElement`):

```
{ "rootClientWidth": 356, "rootScrollHeight": 785,
  "fallbackLanding": { "x": 178, "y": 549.5, "r": 28 },
  "approxPlateTopY": 769, "deltaY": -219 }
```

The pool settles at y ≈ 550 in a pane where the plate begins at y ≈ 769 — roughly **219 px of
empty pane above the well**. (With the plate mounted, `scrollHeight` grows ≈140 px, moving the
fallback to y ≈ 637 against a dot centre near y ≈ 813 — a ≈176 px miss. Either way the pigment
pools in blank space and the plate inks in somewhere else entirely.) The exact pixel figure is a
derived estimate; the *fallback being taken* is CONFIRMED.

Every word of the component's own docstring (`MixResultDisplay.vue:9-19`) is therefore false in
the shipped build:

> "holding the awaiting well — a seeded WatercolorDot GHOST (`[data-mix-target]`, the anchor the
> canvas convergence lands on) … the silhouette the pigment poured into is the silhouette the
> result wears."

And `mixStage.ts:1-13`'s "the ghost well is the sea" is a comment describing code that cannot run.

### Regression origin — an unaudited major bump

The attribute drop is a **Glass 7 behaviour change the value.js adoption never audited.**

`/Users/mkbabb/Programming/glass-ui`, `git log -S inheritAttrs -- src/components/watercolor-dot/WatercolorDot.vue`:

```
490cc46e feat(BI): land the Glass 7 component, motion, material, and public-surface cut   (2026-07-16)
```

The pre-7 component (`git show 490cc46e^:src/components/watercolor-dot/WatercolorDot.vue`):

```
53:        tag?: "div" | "button";
64:        tag: "div",
113: <template>
114:    <component            ← polymorphic host, attrs INHERITED (no inheritAttrs:false)
215:        <slot />
```

So before Glass 7, `data-mix-target` landed on the root element and the whole choreography worked.
value.js's adoption commit `f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo
consumer surface` migrated *renamed symbols* (`DockIconButton`→`DockControl`,
`copyToClipboard`→`useClipboard`) but did not touch a single `<WatercolorDot>` call site —
`git show f2c8f565 -- demo/workbenches/mix/MixResultDisplay.vue` shows the template diff touching
only the dock buttons. A silent semantic break rode in under a green typecheck.

### Proposed cure — architectural, not a patch

Do **not** re-stamp the attribute somewhere else and move on. Two structural moves:

1. **Anchor on markup the component owns.** The ghost branch already has a wrapper the component
   fully controls — `MixResultDisplay.vue:63`, `<div v-if="ghost" key="well" class="flex items-center gap-3">`.
   Move `data-mix-target` there and size the wrapper to the dot
   (`:class="result.type === 'color' ? 'w-14 h-14' : 'w-10 h-10'"`), so `layoutCenter`'s
   `offsetWidth/offsetHeight` read the dot's true box. Anchors belong on host DOM, never on a
   third-party component's attribute-forwarding contract.
2. **Make the missing anchor loud.** `mixStage.ts:121-124`'s silent geometric fallback is what let
   a total breakage ship looking plausible. The `else` branch should `import.meta.env.DEV &&
   console.warn(...)` (or return `null`, which the caller already handles honestly at
   `useMixingAnimation.ts:149-154` by settling the phase machine). A fallback that manufactures a
   wrong-but-pretty result is worse than none.

Repo-wide corollary: `demo/workbenches/mix/MixSourceSelector.vue:160-174` has the same disease and
is worse — its add-slot `<WatercolorDot tag="button" aria-label=… :disabled=… @click=…>` renders a
`<span aria-hidden="true" style="pointer-events:none">` with **no slot content, no label, no click
handler**. Verified live on `/#/mix`:

```
{ "addSlotFound": true, "tagName": "SPAN", "role": null, "ariaLabel": null,
  "pointerEvents": "none",
  "attrs": ["data-v-292b9032","data-v-a3e86846","aria-hidden","class","data-testid","data-variant","style"] }
```

That is the `wb-mix-sourceselector` seat's finding, but it is the reason **the colours-mode mix
flow cannot be driven at all today**, which is in turn why my component's e2e gate never fires
(see D-13).

---

## D-2 · MAJOR — three dead `tag="div"` props and a dropped `:title`; palette swatches are unreadable

`MixResultDisplay.vue:67`, `:81`, `:100` all pass `tag="div"`. `tag` was a **real prop** pre-Glass-7
(`490cc46e^:…:53 tag?: "div" | "button"`, default `"div"`); Glass 7 deleted it. The three sites are
now pure noise that reads as intent — a maintainer will believe the dot's element type is under
consumer control. It is not; it is always `<span>`.

Worse, `MixResultDisplay.vue:103` `:title="color.css"` is **dropped**. Consequence for a palette
result: each swatch is `<span aria-hidden="true" style="pointer-events:none">` with no title, no
text, no label. The gradient strip beneath it (`:109-116`) is explicitly `aria-hidden="true"
role="presentation"`. **A palette result therefore exposes not one readable colour value** — not by
tooltip, not by screen reader, not by selection. The single-colour branch at `:85-87` prints its
`result.css` as text; the palette branch prints nothing at all.

Evidence: the rendered attribute list in D-1 (`title` absent); `dist/watercolor-dot.js`
`inheritAttrs: !1`.

**Cure.** Delete all three `tag="div"`. Render the per-swatch value as real text (the plate already
has the idiom at `:85-87`) or wrap each dot in an owned `<span :title>` — but the honest fix is a
readable list, since a tooltip is not reachable by touch or keyboard either way. If glass-ui should
carry a titled/labelled swatch register, that variant belongs in glass-ui (edict 4), relayed to the
active glass-ui inbox, not re-minted in `demo/`.

---

## D-3 · MAJOR — the scoped `.mix-plate` transition silently deletes the `vj-morph` transform channel

`MixResultDisplay.vue:149-157`:

```css
.mix-plate { transition: opacity var(--duration-fast) var(--ease-standard); }
.mix-plate--ghost { opacity: 0.55; }
```

`.mix-plate` is the component root, and `MixPane.vue:111` wraps that root in
`<Transition name="vj-morph" mode="out-in">`. Vue applies `.vj-morph-enter-active` to the *same*
element. Scoped CSS compiles to `.mix-plate[data-v-0f138735]` — specificity (0,2,0) — which beats
the design-system `.vj-morph-enter-active` (0,1,0). The `transition` **shorthand** then resets
`transition-property` to `opacity` alone.

Measured live (both rules present in the real cascade):

```
{ "scopedPlate":     { "transitionProperty": "opacity",
                       "transitionDuration": "0.2s",
                       "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)" },
  "unscopedControl": { "transitionProperty": "opacity, transform, max-height",
                       "transitionDuration": "0.2s, 0.44s, 0.3s" } }
```

`demo/styles/animations.css:104-109` declares the morph as `opacity` + `transform` (0.44 s
`--spring-snappy`) + `max-height` (0.3 s). On this element the transform spring and the height
morph are **gone** — the result plate hard-cuts its scale/translate and fades opacity only. The
same override kills `.vj-morph-leave-active:111-116`.

Two owner edicts violated at once: **#5** (style at the root/design-system level, never per-instance
overrides) and **#6** (animations are never deleted, only moved or tokenized) — this deletes two
thirds of a design-system animation as a side effect of a one-line local override.

**Cure.** The ghost-dimming is a *family* behaviour, not a plate quirk. Move it into the
`vj-morph`/ghost family in `demo/styles/animations.css` as a token-driven modifier so exactly one
`transition` declaration governs the element, and delete the `<style scoped>` block. If a local
rule must stay, it must use the longhand `transition-property`-safe form or live on an inner
element that Vue is not transitioning.

---

## D-4 · MAJOR — the async result is silent to assistive tech; three buttons named only by `title`

Measured on a mounted colour result:

```
"D_actions": [
 { "text": "", "title": "Copy color",       "ariaLabel": null, "w": 28, "h": 28 },
 { "text": "", "title": "Save to palettes", "ariaLabel": null, "w": 28, "h": 28 },
 { "text": "", "title": "Reset",            "ariaLabel": null, "w": 28, "h": 28 }
],
"D_ariaLive": 0,
"namelessByHarnessRule": 3
```

1. **No live region.** The plate is the *destination of an async operation* — it materialises
   ~900 ms after the user presses Mix (`mixStage.ts:24 MIX_CONVERGE_MS = 900`), through
   `MixPane.vue:111-119`'s `Transition`, with no focus move and no `aria-live`. A screen-reader
   user presses Mix and nothing is announced, ever. The result text at `:85-87` is the *only*
   output and it arrives silently.
2. **Three buttons named only by `title`.** `MixResultDisplay.vue:123/130/138` pass `title` to
   `DockControl`; `title` is not in `DockControl`'s prop list, so it lands as an HTML `title`.
   The repo's **own** visual-audit rule (`docs/tranches/V/megatranche/audit/visual/capture.mjs:102-105`)
   counts a button nameless unless it has `aria-label`/`aria-labelledby`/text — by that rule this
   component contributes **3 nameless buttons** the moment a result renders. (The REPORT's
   `/#/mix` row shows only 1 because the capture never triggers a mix, so the plate is never in the
   DOM. This is latent, not absent.) `title` is also not surfaced on touch. The sibling
   `MixSourceSelector.vue:169` and `:251` correctly use `aria-label` — this component is
   inconsistent with its own neighbour.
3. **The "Copied!" confirmation is unannounceable.** `:123` swaps the `title` of an
   already-focused button. A `title` mutation is not a reliable AT announcement; there is no
   `role="status"`.

Tap targets measure 28 × 28 — above the repo harness's 24 px bar (`capture.mjs:98`), below
WCAG 2.5.5's 44 px. Logged as INFO (D-12), not a defect at the stated bar.

**Cure.** `aria-label` on all three controls (matching the sibling's convention); a single
`role="status" aria-live="polite"` region in the plate that carries both the settled result value
and the copy outcome. That one region discharges (1) and (3) together.

---

## D-5 · MAJOR — clipboard failure is completely silent, permanently

`MixResultDisplay.vue:31-32` takes only `{ status, copy }` and derives
`copied = status === "success"`. `status === "failure"` renders **identically to idle**.

From the shipped `dist/useClipboard-D36OTaeT.js`: the reset timer is scheduled *only* on the
success branch —

```js
n.ok ? (a.value = "success", l = setTimeout(() => { … a.value = "idle" }, i.resetMs ?? 1500), n)
     : (a.value = "failure", i.onCopyError?.(n.reason), n)
```

— so `failure` never self-clears, and `onCopyError` is never supplied by this component.

**Reproduction.** The repo configures `server.host: true` for LAN device testing (per project
memory), i.e. mobile Safari over plain `http://<lan-ip>:9000` — a **non-secure context**, where
`navigator.clipboard` is `undefined` and `useClipboard` returns `{ ok:false, reason:"no-api" }`.
Simulated exactly, on the mounted component:

```
"onNoClipboardApi": {
  "titleBefore": "Copy color",
  "titleAfter":  "Copy color",
  "anyErrorTextInPlate": false,
  "liveRegions": 0
}
```

Nothing changes. No icon flip, no message, no console signal to the user. The user believes the
colour is on their clipboard; it is not. This is precisely the LAN-http path the repo uses for its
iOS Safari work.

**Cure.** Render the third state. `status` is a 4-state machine (`idle|pending|failure|success`) and
the component collapses it to a boolean at `:32` — that collapse *is* the defect. Drive the icon
and the (new, D-4) live region off `status` directly, and pass `onCopyError` so the failure reason
is reportable.

---

## D-6 · MAJOR — the copy confirmation goes stale across a re-mix and affirms the wrong value

`useClipboard`'s confirmation is scope-lived (1500 ms), but the mix choreography is shorter:
`MIX_CONVERGE_MS = 900` (`mixStage.ts:24`) + `vj-morph` at `--duration-fast` ≈ 200 ms ≈ **1100 ms**.
The component instance is *not* remounted across a re-mix (`MixPane.vue:113 v-if="mixResult"` stays
truthy), so the confirmation survives into a result it never copied.

**Reproduction** (mounted component; copy result A, then drive ghost→settle with a new result B):

```
{ "step0_beforeCopy":         { "title": "Copy color", "iconClass": "… lucide-copy …" },
  "step1_afterCopy":          { "title": "Copied!",    "iconClass": "… lucide-check …" },
  "step2_afterReMix_1270ms":  { "title": "Copied!",    "iconClass": "… lucide-check …" },
  "step2_plateText":          "RESULT oklab(0.3 -0.05 0.09)",
  "step3_after_resetMs":      { "title": "Copy color", "iconClass": "… lucide-copy …" } }
```

At t ≈ 1270 ms the plate reads `oklab(0.3 -0.05 0.09)` while the button still says **"Copied!"**
with a check mark. The clipboard holds the *previous* colour. The affirmation is a lie for ~400 ms
of every re-mix.

`useClipboard` exports `invalidate()` for exactly this — the dist source's `d()` bumps the
generation counter, clears the timer, and returns `status` to `idle`. The component destructures
`{ status, copy }` at `:31` and never calls it.

**Cure.** `const { status, copy, invalidate } = useClipboard()` plus
`watch(() => result, invalidate)`. The identity that must invalidate the confirmation is the result
itself — bind it, do not race it against a timer.

---

## D-7 · MAJOR — two divergent copy implementations for one user-visible action (edict #2)

| path | code | primitive | confirmation |
|---|---|---|---|
| plate Copy button | `MixResultDisplay.vue:42-47` | `useClipboard` | yes (check icon) |
| dock "Copy result" | `MixPane.vue:49-55`, wired at `demo/shell/usePaneRouter.ts:222` | `writeClipboard` | **none** |

`usePaneRouter.ts:222`:

```ts
{ key: "copy", icon: Copy, title: "Copy result", …, handler: () => paneRefs.mix.value?.copyResult?.() }
```

The text-derivation expression is duplicated verbatim:

```ts
// MixResultDisplay.vue:43-46
result.type === "color" ? result.css ?? "" : result.colors?.map((c) => c.css).join(", ") ?? ""
// MixPane.vue:51-53
mixResult.value.type === "color" ? mixResult.value.css ?? "" : mixResult.value.colors?.map((c) => c.css).join(", ") ?? ""
```

Two copies of one rule, drifting apart the moment the result shape changes; two clipboard
primitives with different failure semantics; and the dock path produces **no confirmation at all**
in the plate. Owner edict #2 ("no dual paths"). The `?.()` optional call on `copyResult` is a
masking fallback on a method the component statically exposes at `MixPane.vue:57`.

**Cure.** One derivation, one primitive. Put `resultToClipboardText(result)` next to `MixResult` in
`composables/useMixingState.ts` (it is result-shape knowledge, and that module owns the shape) and
have the plate own the clipboard scope; the dock action should route to the plate's handler rather
than mint a second one — or `MixPane` should own the `useClipboard` scope and pass `copy`/`status`
down. Either is fine; two are not.

---

## D-8 · MAJOR — an empty palette result renders a plate that says "Result" and shows nothing

**Reachable.** `demo/palettes/mix.ts:117` `if (palettes.length === 0) return []` and `:120`
`if (resultLength === 0) return []` — the latter fires whenever the shortest selected palette is
empty under the **default** `discard` strategy (`useMixingState.ts:46`). `useMixingState.ts:97`
then sets `mixResult = { type: "palette", colors: [] }` unconditionally.

`MixResultDisplay.vue:91` guards with `result.colors` — an empty array is truthy, so the branch
renders. Measured:

```
"B_emptyPalette": {
  "renderedStripPresent": true,
  "inlineBg": null,
  "computedBgImage": "none",
  "swatchCount": 0,
  "text": "RESULT"
}
```

`MixResultDisplay.vue:112` builds `linear-gradient(to right, )` — invalid, dropped by the parser
(`computedBgImage: "none"`), leaving a 16 px transparent void. Zero swatches. Zero explanatory
text. Three live buttons: **Copy** copies `""` (and, per `useClipboard`, reports **success** — the
check mark appears for an empty clipboard write), **Save** persists an empty palette via
`MixPane.vue:44-46`.

A 1-colour result is the same class, one degree milder: `"background: linear-gradient(to right, red)"`
→ a degenerate flat band, not a gradient. Cosmetic; noted, not separately filed.

**Cure.** The guard is wrong twice over. `result.colors` must be `result.colors.length > 0`, and
the truly empty result deserves the repo's existing empty-state grammar — `MixSourceSelector.vue:240-244`
already mounts an eyebrow/message/hint empty component for "nothing to mix". Reuse it; do not
invent a new one (edict #3). Actions must be disabled when there is nothing to act on.

---

## D-9 · MINOR — the `MixResult` type permits states the plate renders as blank

`useMixingState.ts:32-36` declares `css?: string` and `colors?: PaletteColor[]` on a single
non-discriminated interface, so `{ type: "color" }` with no `css` is type-legal. Mounted:

```
"C_colorNoCss": { "swatchCount": 0, "text": "RESULT", … }
```

— the same blank plate as D-8. Not reachable through `startMix` today (`:90` always sets `css`),
so this is the *type* being looser than the invariant rather than a live crash — which is exactly
what forces the four masking `?? ""` / `?? "var(--muted-foreground)"` fallbacks at
`MixResultDisplay.vue:37-39` and `:44-45`, each of which converts a should-be-impossible state
into a silently wrong render.

**Cure.** A real discriminated union makes the blank plate unrepresentable and deletes all four
fallbacks:

```ts
export type MixResult =
    | { type: "color"; css: string }
    | { type: "palette"; colors: readonly [PaletteColor, ...PaletteColor[]] };
```

`startMix` then has to decide what an empty palette mix *means* (D-8) at the one place that knows.

---

## D-10 · MINOR — `TransitionGroup :key="i"` defeats the `vj-enter` stagger it exists for

`MixResultDisplay.vue:92-105` keys swatches by array index. Under `TransitionGroup`, index keys
mean Vue patches existing nodes in place and only the *length delta* enters or leaves — so
re-mixing 5 colours into 5 different colours plays **no** enter animation, while the `vj-enter`
name and the `swatch-row` class advertise one. The colour is the identity, not the slot. The same
index also drives `seed` at `:104`, coupling a dot's silhouette to its position rather than to what
it is.

Compare the sibling, which keys correctly: `MixSourceSelector.vue:129 :key="swatchKeys[i]"`.

**Cure.** Key on a stable colour identity (`` `${i}-${color.css}` `` at minimum, a real id
preferably) and seed from the same identity.

---

## D-11 · MAJOR (test truth) — the gate is vacuous, and the vacuous mutation is the shipped state

* **Unit tests: none.** `test/` contains no component tests at all; `test/mix-v4.test.ts` exercises
  the library mixer, not this component. No file in `test/` or `e2e/` matches `MixResult`, `MixPane`,
  or `mix-plate` (`grep -rln` → only `e2e/smoke/oracles/o7-card-census.spec.ts`, unrelated).
* **The two e2e specs that assert the anchor are RED before reaching it.**
  `e2e/smoke/views/mix.spec.ts:52` and `e2e/smoke/safari/mix-flow.spec.ts:40` both assert
  `main.locator("[data-mix-target]")` is visible. Run:

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

  It dies at **line 42** — the dead add-slot from D-1's corollary — so the `[data-mix-target]`
  assertion at **line 52** has never once been evaluated.
* **Typecheck cannot see it.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → clean, no output,
  exit 0. Vue treats unknown component attributes as fallthrough attrs; `inheritAttrs: false`
  swallowing them is not a type error.

**The vacuous mutation:** *delete `data-mix-target` from `MixResultDisplay.vue:69` entirely.*
Typecheck stays green (verified), the unit suite stays green (there is none), and the e2e specs are
unchanged because they already fail earlier. That mutation is behaviourally **identical to what
ships today** — which is the whole proof that no gate covers this component's central contract.

**Cure.** A component test that mounts `MixResultDisplay` with `ghost: true` and asserts
`wrapper.find('[data-mix-target]').exists()` — i.e. a test on the *rendered DOM contract*, not on
the source text. Repo-wide, any `data-*` handshake that crosses a component boundary needs exactly
this kind of rendered-DOM assertion, because the type system provably cannot supply one. And the e2e
suite needs the source-selector break (D-1 corollary) fixed so the mix specs stop masking every
downstream assertion behind one early failure.

---

## INFO

* **D-12 — tap targets 28 × 28.** All three `DockControl compact` buttons measure `28x28`. Passes
  the repo harness's 24 px bar (`capture.mjs:98`) and WCAG 2.5.8; fails 2.5.5 (44 px). `compact`
  opts out of `DockControl`'s documented "≥44 px on coarse via the density clamp". Worth a ruling
  on whether `compact` is legitimate on a touch surface; not filed as a defect at the stated bar.
* **D-13 — redundant config.** `useClipboard({ resetMs: 1500 })` at `:31` restates the library
  default (`i.resetMs ?? 1500` in the dist). Configuration that says nothing.
* **D-14 — inconsistent built-in import.** `:4` imports `TransitionGroup` from `vue` while
  `Transition` (used at `:60`) is left to auto-resolution. Both are auto-resolved in
  `<script setup>`; the explicit import is noise.

## Checks that came back clean (the negatives, proved)

* **`verbatimModuleSyntax`** — compliant. `:7` is `import type { MixResult }`; every other import
  is a used value (`Copy/Check/Save/RotateCcw`, `DockControl/DockSeparator`,
  `computed/TransitionGroup`, `useClipboard`, `WatercolorDot`).
* **Vue 3.5 idiom** — `:20-23` uses reactive props destructure with a default
  (`ghost = false`) correctly; `result` is read inside `computed`/handlers, so the compiler emits
  `props.result` and reactivity is preserved.
* **No `defineModel` here** — the known stale-read hazard does not apply; the component is
  props-down/emits-up (`:25-28`).
* **No rAF, no listeners, no observers, no timers** owned by this component — no PRM-RAF exposure,
  no leak surface. The one rAF in the mix feature lives in `useMixingAnimation.ts:88-114` on
  glass-ui's `useRAFLoop` with `pauseWhenHidden`, an explicit `onBeforeUnmount` stop (`:187`), and
  a documented PRM fast-path (`:120-125`) that completes rather than pauses.
* **No `ValueUnit` wrapping, no oklch→HSV roundtrip, no `parseCssColor` call** in this component —
  it consumes pre-formatted CSS strings. The parse crash class lives upstream in
  `mixStage.ts:99-100`/`mix.ts`, not here.
* **No WebGL** — `WatercolorDot` is explicitly a CSS/SVG primitive.
* **No god module** — 159 lines, one job.
* **`/#/mix` route health** (`REPORT.md:123,138,153,168`): 0 page errors, 0 console errors,
  0 horizontal overflow, exactly 1 `main`, across all four Safari matrices. The plate itself never
  appears in those captures (`v-if="mixResult"`), so it contributes nothing to the measured
  numbers — its D-4 contribution is latent, and its D-1/D-3 defects are invisible to a static
  route capture by construction.

---

## Ranked

| # | severity | defect |
|---|---|---|
| D-1 | **BLOCKER** | `data-mix-target` dropped by glass-7 `inheritAttrs:false` → convergence lands ~180–220 px off target; the component's entire documented purpose is non-functional |
| D-2 | MAJOR | three dead `tag="div"` + dropped `:title` → palette swatch values unreadable by any means |
| D-3 | MAJOR | scoped `.mix-plate` transition overrides `.vj-morph-enter-active`, deleting the transform + max-height channels (edicts 5 & 6) |
| D-4 | MAJOR | no `aria-live` on an async result; 3 buttons named only by `title` (3 nameless by the repo's own rule) |
| D-5 | MAJOR | clipboard `failure` never rendered, never reset, no `onCopyError` → silent no-op on LAN-http mobile |
| D-6 | MAJOR | copy confirmation stale across a re-mix; `invalidate()` exists and is never called |
| D-7 | MAJOR | two divergent copy implementations for one action, duplicated derivation (edict 2) |
| D-8 | MAJOR | empty palette result renders a blank plate with live Copy/Save; reachable via `mix.ts:120` |
| D-9 | MINOR | `MixResult` permits blank states; four masking `??` fallbacks are the symptom |
| D-10 | MINOR | `TransitionGroup :key="i"` defeats the `vj-enter` stagger; seed coupled to position |
| D-11 | MAJOR | vacuous gate: 0 unit tests, both e2e specs RED before the anchor assertion, typecheck structurally blind |
| D-12/13/14 | INFO | 28 px targets · redundant `resetMs` · inconsistent built-in import |

**The one sentence:** a dependency major bump changed an attribute-forwarding contract, no gate in
this repo can observe that class of change, and the component's single most important line has been
dead since 2026-07-17 while its docstring still describes what it used to do.
