claude-opus-5[1m]

# CHALLENGE · `StartingStyleTarget.vue` · axis C — CONSUMPTION

**Subject:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/StartingStyleTarget.vue` (216 lines)
**Axis:** how this component consumes **keyframes.js** (the library) and **glass-ui 7.0.0** (the design system) — subpath choice, shadow components (S-1..S-8), value.js transitive exposure (R1 class), props/emits contract, sibling seams.
**Method:** read-only. Component + every import read whole; every glass-ui prop claim checked against the *installed dist*, not the docs; two claims settled by executing `dist/keyframes.js` / `dist/engine/index.js` in node. No browser. Visual co-presence claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Prior corpus folded:** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; shadow census S-1..S-8; §6.5 PRM sites incl. `StartingStyleTarget.vue:211`; §3 census row `216 | spring/StartingStyleTarget.vue | G | Button, Card`), `lane-library.md` (§ `emit/entry.ts` 459L; § `spring/css/linear-stops.ts`).

**Tally:** 13 defects (2 BLOCKER · 2 MAJOR · 4 MINOR · 5 INFO) · 7 superlatives.

Paths below are relative to `/Users/mkbabb/Programming/keyframes.js` unless absolute.

---

## THE HEADLINE

The component is a **`@starting-style` demonstrator whose two exposed physics parameters are not both wired to it**, and it ships a **copy-paste artifact written in the inverse selector grammar of the card it labels itself as compiling**. Both are consumption defects in the strict sense: the library surfaces (`springLinearStops`, `compileToEntry`) are called correctly and their *companion contracts* — the time-scale that `response` lives in, and the open/closed polarity `compileToEntry` emits — are not consumed at all.

Everything else on this component is unusually good (see §Superlatives). That contrast is the finding.

---

## BLOCKERS

### C-1 · `response` is provably inert on the demonstrated card, while a live slider exposes it and the card's own readout prints it as the easing parameter — **BLOCKER**

**Provenance.**
- `demo/scenes/spring/StartingStyleTarget.vue:116-119` — `springCss = useSpringLinearStops(() => demo.response.value, () => demo.dampingFraction.value)`.
- `demo/scenes/spring/useSpringLinearStops.ts:28-33` — forwards both to `springLinearStops({response, dampingFraction})`.
- `src/animation/physics/spring/css/linear-stops.ts:49` — `const maxDuration = opts.maxDuration ?? opts.response * 4;` … `:56` `dt: maxDuration / (sampleCount + 1)`. **`response` enters the emitter through the sampling window and nowhere else.** Because the normalized spring is self-similar under time-scaling by `response`, sampling over exactly `4 × response` returns the same normalized shape for every `response`.
- `demo/scenes/spring/StartingStyleTarget.vue:173-176` — the card's transition duration is `var(--duration-slow, 500ms)`, a **constant**; nothing in the component derives a duration from `response`.
- `demo/scenes/spring/SpringPhysicsFacet.vue:27-36` — `response` is a **live `LabeledSlider`** (`tooltip="Spring response time (s) — higher = slower"`), mounted via `SpringScene.vue:67` `tabsContent = () => h(SpringPhysicsFacet, { demo })`, which is unconditional — it is on screen while the discrete view is on stage.
- `demo/scenes/spring/StartingStyleTarget.vue:74-76` — the card prints `({{ demo.response.value.toFixed(2) }} / {{ demo.dampingFraction.value.toFixed(2) }})` under the label `eased by` (`:72`), and `:18` labels the whole stage `eased by springLinearStops()`.

**Measurement (executed against `dist/keyframes.js`).** Stop values of `springLinearStops({response: r, dampingFraction: 0.86})` for `r ∈ {0.35, 0.5, 0.7, 1.0}`:

```
r=0.35  0.0000 0.2846 0.6523 0.8717 0.9675 0.9989 1.0050 1.0038 1.0019 1.0007 1.0002 1.0000 …
r=0.5   0.0000 0.2846 0.6523 0.8717 0.9675 0.9989 1.0050 1.0038 1.0019 1.0007 1.0002 1.0000 …
r=0.7   0.0000 0.2846 0.6523 0.8717 0.9675 0.9989 1.0050 1.0038 1.0019 1.0007 1.0002 1.0000 …
r=1.0   0.0000 0.2846 0.6523 0.8717 0.9675 0.9989 1.0050 1.0038 1.0019 1.0007 1.0002 1.0000 …

max |Δv| between r=0.35 and r=0.7 (a 2× period change) = 2.000e-5
```

`2e-5` is the `toFixed(5)` quantization floor of `linear-stops.ts:67`. The emitted curve is response-invariant to rounding noise. (The *strings* are not byte-identical — 3 distinct strings across 7 response values at ζ=0.86 — but the difference is entirely last-digit; I checked this specifically because the byte-comparison alone would have been a false positive.)

**The defect.** `--spring-ease` is a function of `dampingFraction` only; the duration is a constant. There is no third channel — the card's motion is fully specified by `{--spring-ease, --duration-slow}` (`:172-179`). Therefore dragging the `response` slider from 0.2 s to 1.0 s changes **nothing** on the discrete stage, while the stage's own result line updates to show the new number as the thing easing it. Meanwhile the solver rail (`SpringTarget`, driven by real `SpringProgress.tickDt` in `useSpringDemo.ts:214`) *does* re-time visibly. The scene's stated premise — "the Spring scene hosts TWO views of one spring curve" (`useSpringDemo.ts:54-58`) — is false on the `response` axis.

The correct consumption is one declaration: the library defines `maxDuration` as "the spring time that normalized `t = 1` maps to" (`src/animation/physics/spring/css/timing-function.ts:32-34`), so a `springLinearStops()` consumer must pair the curve with `transition-duration: calc(response * 4s)`. The component consumes the curve and discards its time-scale.

**Falsifier.** A live measurement showing the discrete card's settle time (or overshoot rate) changing when only `response` moves. Or a library statement that `springLinearStops()` is duration-free by design and the `× 4` window is incidental — in which case this drops to MINOR (the readout still asserts a causal role the emitter does not have). Either kills it.
`UNPROVEN-NEEDS-LIVE`: the *visual* inertness. The source proof is complete and does not need the browser.

---

### C-2 · the shipped `compileToEntry()` artifact is written in the **inverse** selector polarity of the card it claims to compile; no `.is-open` exists anywhere in the demo — **BLOCKER**

**Provenance.**
- `demo/scenes/spring/useCompiledEntry.ts:72-75` — `compileToEntry({ ".discrete-card": { enter: entryAnim } }, { openSelector: ".is-open", display: "flex" })`.
- `src/animation/compile/emit/entry.ts:429-447` — the three-rule grammar: `baseRule` = `<selector> { <exit endpoint> display:none … }`, `openRule` = `<selector><openSelector> { <enter endpoint> display:<d> … }`, `@starting-style { <selector><openSelector> { <enter first frame> } }`. **The base rule is the CLOSED state; the class turns it ON.**
- `demo/scenes/spring/StartingStyleTarget.vue:32` — `<div class="discrete-card" :class="{ 'is-hidden': !visible }">`. `:158-180` base `.discrete-card` = **open** (`opacity: 1; translate: 0 0; scale: 1`). `:192-197` `.discrete-card.is-hidden` = closed. **The class turns it OFF.**
- `grep -rn "is-open" demo/` → three hits total: `useCompiledEntry.ts:40`, `useCompiledEntry.ts:74`, and `StartingStyleTarget.vue:54` (a comment). **Zero markup bindings.** (The `LayerConfigPanel.vue:11` / `ChannelOptions.vue:96` hits are a `:is-open` *prop*, unrelated.)

**The emitted artifact** (executed via `dist/engine/index.js` with the component's own `ENTER_KEYFRAMES`, `linear()` elided):

```css
.discrete-card {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  display: none;
  transition: opacity 500ms linear(…), transform 500ms linear(…), display 500ms allow-discrete, overlay 500ms allow-discrete;
}
.discrete-card.is-open {
  opacity: 1;
  transform: translateY(0px) scale(1);
  display: flex;
  transition: opacity 500ms linear(…), transform 500ms linear(…), display 500ms allow-discrete, overlay 500ms allow-discrete;
}
@starting-style {
  .discrete-card.is-open { opacity: 0; transform: translateY(20px) scale(0.9); }
}
```

`{ eligible: true, refusals: 0 }` — the emitter is behaving correctly. The *consumer* is not.

**The defect.** The component labels this block `compileToEntry() artifact` (`:58`) and the comment above it states the paste contract explicitly: "A designer pastes it verbatim to reproduce the discrete transition: base(closed) + `.is-open` + `@starting-style`" (`:50-55`). But the card the designer is looking at is `base(OPEN) + .is-hidden`. A designer who does the obvious thing — paste the CSS, copy the markup they can see — gets `<div class="discrete-card">` matched by a base rule that says `display: none`, with no `.is-open` ever applied. The element is **permanently invisible**. The artifact is not a reproduction of the demonstrated card; it is a reproduction of a card the demo does not contain.

This is the S.F3 EN-d dogfood claim (`useCompiledEntry.ts:1-8` — "the demo surfaces the exact CSS a designer would paste to reproduce the transition") failing on its own terms.

**Falsifier.** Find any `.is-open` binding on `.discrete-card` in the tree, or a rendered caption telling the reader the artifact uses a different (canonical) polarity than the stage. Either kills it. Note the *page* is safe — Vue scoping makes the card's own `.discrete-card[data-v-…]` (0,2,0) outrank a pasted `.discrete-card` (0,1,0) — so this is not a self-break; it is an artifact-integrity break, which is the whole point of a dogfood surface.

---

## MAJOR

### C-3 · `useCompiledEntry` asserts three specific "match the card" facts; two are false — **MAJOR**

**Provenance.** `demo/scenes/spring/useCompiledEntry.ts:41` — "The 500ms duration + `.is-open` open selector + `display: flex` match the card StartingStyleTarget renders."

| asserted match | artifact | the card | verdict |
|---|---|---|---|
| duration `500ms` | `500ms` (`useCompiledEntry.ts:55`, formatted by `emit/css-text.ts:11-12`) | `var(--duration-slow, 500ms)` → **`0.45s`** (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css`, `--duration-slow: 0.45s`) | **FALSE** — 500 ≠ 450 |
| `.is-open` | `.discrete-card.is-open` | `.discrete-card.is-hidden` | **FALSE** (C-2) |
| `display: flex` | `display: flex` | `.discrete-card { display: flex }` (`:159`) | TRUE |

Two further divergences the comment does not claim but the label "the REAL `compileToEntry` output for THIS card" (`:50-51`) implies:

- **Animated property set.** The artifact transitions `opacity, transform` (from `ENTER_KEYFRAMES`, `useCompiledEntry.ts:24-27`). The card transitions `opacity, translate, scale` (`:172-176`) — the *independent* transform properties, not `transform`. These do not compose the same way (independent `translate`/`scale` are separate animatable longhands and interleave differently with any inherited `transform`).
- **`overlay`.** `entry.ts:343` emits `overlay <dur> allow-discrete` unconditionally (`opts.overlay ?? true`, `:369`); `useCompiledEntry` never passes `overlay: false`. The card's own transition list (`:172-176`) has no `overlay` entry.

**The defect.** The one thing a dogfood surface must not do is *assert* fidelity it does not have. A reader who trusts `:41` will conclude the emitter round-trips the card; it does not, on 4 of 5 comparable dimensions.

**Falsifier.** Show `--duration-slow` resolving to `500ms` in this cascade (I searched `demo/styles/` and the whole of `node_modules/@mkbabb/glass-ui/` — the only definition is `0.45s`), or show the card's `translate`/`scale` and the artifact's `transform` producing identical computed geometry through the whole transition. Either kills the corresponding row.

---

### C-4 · the Reveal/Dismiss verb is rendered **twice**, through two different glass-ui API dialects, one of which is not a `Button` prop — **MAJOR**

**Provenance.**
- `demo/scenes/spring/StartingStyleTarget.vue:40-47` — `<Button emphasis="secondary" class="btn-playback btn-playback-accent shrink-0" @click="toggle">` + `{{ visible ? "Dismiss" : "Reveal" }}` + `<component :is="visible ? EyeOff : Eye" …>`.
- `demo/scenes/spring/SpringScene.vue:138-156` — in `ribbonContent`, when `demo.view.value === "discrete"`: `h(Button, { variant: "outline", class: "btn-playback btn-playback-accent", onClick: () => demo.toggleDiscrete() }, …)` with the *same* Dismiss/Reveal label and the *same* EyeOff/Eye pair.
- `demo/app/App.vue:65-71` — `#ribbon-content` renders `sceneRef?.ribbonContent` whenever the scene exposes it; `SpringScene.vue:199` always exposes it. Both renderers are live simultaneously in the discrete view.
- `SpringScene.vue:78-80` calls the ribbon copy "the primary control for that face" — so neither is documented as the redundant one.

**The API divergence, verified against the installed dist.** `node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts` declares `ButtonProps` = `{ emphasis?, tone?, size?, iconOnly?, loading?, type?, disabled?, class? }` extending `PrimitiveProps`. There is **no `variant`**. Confirmed at runtime: `grep -c "variant" dist/button-B7c944jy.js` → **0**; the runtime props block is `{ emphasis, tone, size, iconOnly, loading, type, disabled, class, asChild, as }`. So `variant: "outline"` is not a prop — it falls through as a literal `variant="outline"` DOM attribute on `<button>` and styles nothing. The ribbon copy therefore renders at the *default* `emphasis` (`dist/button-B7c944jy.js`: `emphasis: { default: "secondary" }`), which happens to coincide with the card copy's explicit `emphasis="secondary"` — the two agree **by accident**, not by contract.

**The defect.** This is exactly the shape the component itself retired at `:64-70` ("the same four presets were shown THREE times… the ONE preset surface now lives in the… rail"). The elision law was applied to the preset picker and not to the verb it sits beside. And the surviving duplicate is configured through a dead prop, so any future glass-ui emphasis change silently desynchronises the two.

Secondary a11y consequence: two `<button>`s with identical accessible names ("Dismiss"/"Reveal") and no `aria-controls`/`aria-expanded` on either, both operating one target. `UNPROVEN-NEEDS-LIVE` for the AT experience; the duplication itself is source-proven.

**Falsifier.** Show the ribbon slot suppressed while the discrete stage is mounted (I found no such gate — `App.vue:65-71` is unconditional on `ribbonContent` existing, and `SpringScene.vue:135-157` returns the button whenever `selectedControl === "spring"`), or show `variant` accepted by `Button` in the installed 7.0.0. Either kills the corresponding half.

---

## MINOR

### C-5 · the copy payload and the displayed payload diverge during the async compile window — **MINOR**

`:59` `<CopyButton :text="compiledEntryCss || copyableCss" />` vs `:61` `{{ compiledEntryCss || springCss }}`. Two *different* fallbacks: the clipboard falls back to `copyableCss` (`transition-timing-function: linear(…);`, `:122-124`), the screen falls back to bare `springCss` (`linear(…)`). `compiledEntryCss` starts `""` (`useCompiledEntry.ts:47`) and is filled by an `await loadAnimationEngine()` round-trip (`:65-77`), so there is a real window — and a persistent divergence if `compileToEntry` ever refuses (`entry.ts:453-455` returns `css: ""` when every selector refuses, which `useCompiledEntry` does not check: it ignores `out.eligible` and `out.refusals` entirely).

**Falsifier.** Show `compiledEntryCss` non-empty before first paint (it cannot be — the `watch` is `immediate` but the body is `async`), or show the two fallbacks producing the same string (they do not: one carries the `transition-timing-function:` prefix and a trailing `;`).

### C-6 · three token fallbacks that disagree with the resolved tokens, under F-1's unreproducible install — **MINOR**

| site | written fallback | resolved token |
|---|---|---|
| `:173-176` | `--duration-slow, 500ms` | `0.45s` (glass-ui `scheme-motion.css`) |
| `:164` | `--radius-lg, 1rem` | `0.5rem` (glass-ui) |
| `:205` | `--radius-md, 0.5rem` | `6px` (glass-ui) |

Dead today (all three tokens resolve), but each is **2× / 1.33× off** the real value, so a reader models the card's geometry and timing wrongly from the source. This stops being cosmetic under **F-1** (`lane-frontend.md:15,54` — glass-ui absent from `package.json` *and* `package-lock.json`; I re-confirmed: `grep -n "glass-ui" package.json package-lock.json` → no output): on a clean `npm ci` the `@import "@mkbabb/glass-ui/styles"` at `demo/styles/style.css:3` cannot resolve, every fallback fires, and this card renders at a materially different duration and radius than the developed one.

**Falsifier.** Show `--duration-slow`/`--radius-lg`/`--radius-md` defined demo-side at the written values (I grepped `demo/styles/` and the whole glass-ui package — the only definitions are the glass-ui ones above).

### C-7 · the canonical-preset match predicate is duplicated verbatim with the sibling facet — **MINOR**

`StartingStyleTarget.vue:104-108`:
```js
Math.abs(demo.response.value - p.response) < 1e-6 &&
Math.abs(demo.dampingFraction.value - p.dampingFraction) < 1e-6
```
`SpringPhysicsFacet.vue:166-167` — the identical epsilon-match, same `1e-6`, same two params, same folder, both reading `SPRING_PRESETS`. Two copies of one seam; a change to the preset-identity rule (e.g. `response` becoming irrelevant per C-1) has to land twice.

**Falsifier.** Show the two predicates answering different questions (they do not — both answer "which canonical preset are the shared params currently sitting on"), or show one of them shipping a different tolerance.

### C-8 · consumes the glass-ui `Card` shell but hand-rolls the header/content structure glass-ui ships — **MINOR**

`node_modules/@mkbabb/glass-ui/dist/components/card/index.d.ts` exports `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction`. This component uses `Card` only and builds its header as `<div class="flex w-full max-w-3xl items-center justify-between gap-3 shrink-0">` (`:15-20`). The sibling in the same folder does consume the family — `SpringPhysicsFacet.vue:22` `<CardContent class="panel-content …">`, `:129` `import { Card, CardContent }`. The census row for this component (`lane-frontend.md:246`) records `Button, Card` against `SpringPhysicsFacet`'s `Card*`.

This is the weakest of the four MINORs and may be justified: `CardHeader` carries a `shrink` prop with a `.card-scroll-host` precondition, and the stage is a flex-centred full-height layout that the family's padding grid could fight.

**Falsifier.** Mount `CardHeader`/`CardContent` here and show the stage layout breaking — that justifies the fork and drops this to INFO. Conversely, `feedback_glass_ui_first_class` ("Glass-ui is the design system; add variants/primitives there, not in demo/ui/") argues the fork should have been pushed up as a Card variant, not hand-rolled at the call site.

---

## INFO

### C-9 · barrel import where granular subpaths exist — **INFO, house-consistent**

`:83` `import { Button, Card } from "@mkbabb/glass-ui"`. glass-ui 7.0.0 ships `./button` and `./card` in its exports map (68 subpaths total). But the demo-wide census is 31 barrel imports vs ~40 subpath imports, and the *sibling* mixes both deliberately (`SpringPhysicsFacet.vue:129` barrel for `Card, CardContent`; `:130-131` subpaths for `LabeledSlider`, `Chip`). So this is house convention — multi-component families from the barrel, specialty singletons from subpaths — not a deviation. Recorded because it forfeits the granular map the package deliberately ships, and because F-1 makes the resolution question moot anyway.
**Falsifier.** A bundle diff showing the barrel dragging non-tree-shaken weight into the initial chunk would upgrade this to MINOR. Not measured (no build run).

### C-10 · `emphasis="secondary"` restates the glass-ui default — **INFO**

`:41`. `dist/button-B7c944jy.js` props: `emphasis: { default: "secondary" }`. No behavioural effect. Noted only because its twin at `SpringScene.vue:142` passes a *nonexistent* prop for the same intent (C-4) — together they show the seam is being configured by guess rather than by the type.
**Falsifier.** A glass-ui version in the resolution graph whose `Button` defaults to something else.

### C-11 · three rationale comments anchor this component's shape to a component that no longer exists — **INFO**

`:65`, `:67`, `:101` all justify the retired preset picker by pointing at "the SpringSidebar rail" as the ONE surviving preset surface. `SpringSidebar.vue` **does not exist** — `find demo -iname "*Sidebar*"` returns only `easing/EasingSidebar.vue`, and `SpringPhysicsFacet.vue:2` records "the SpringSidebar dissolution". The real preset surface is now `SpringPhysicsFacet.vue:79,170-171`. Compounding: the component's own library seam, `useSpringLinearStops.ts:9-11`, justifies its existence by citing two call-sites — `SpringSidebar.vue:130` (deleted file) and `StartingStyleTarget.vue:95` (wrong line; the actual call is `:116`). Both provenance citations for the DRY-fold are stale.
*(The composable itself is fine — it does have exactly two live consumers today: this file and `SpringTrace.vue:42`. The rationale, not the fold, is what rotted.)*
**Falsifier.** Locate `SpringSidebar.vue` anywhere in the tree.

### C-12 · no props, no emits: the whole contract is one bare-`!` injection typed as the entire scene facility — **INFO**

`:96` `const demo = inject(SPRING_DEMO_KEY)!` — no runtime guard; mounting outside `SpringScene` throws at `:97` (`demo.visible`). House-consistent (`SpringTarget.vue:169` is identical) and the only mount site is `SpringScene.vue:11`, so unreachable today. Worth recording because `springKeys.ts:4` types the key as `ReturnType<typeof useSpringDemo>` — **~30 members** — while this component reads exactly **5** (`visible`, `toggleDiscrete`, `response`, `dampingFraction`, `compiledEntryCss`). The component is type-coupled to the entire 500-line composable for a 5-member need, which is why the C-1 fix (a duration derived from `response`) has no obvious home: there is no narrow seam to widen.
**Falsifier.** A second mount site, or a test that mounts it standalone, would upgrade the bare `!` to MINOR.

### C-13 · the R1 parser-crash class is **NOT** reachable on this component's paths — **INFO (negative finding)**

R1 = the live `parseCssColor("oklch()")` shipping crash. The value.js edge in this component's reachable set is `src/animation/compile/emit/entry.ts:38` `import { convertColor } from "@mkbabb/value.js/color"`, invoked from `canonicalizeColors` (`:122-148`) via `frameDecls` (`:166`). It fires **only on colour leaves** — `hasColor` (`:116-120`) gates the refusal path, and `canonicalizeColors` early-returns for any non-colour scalar.

This component's compiled spec is `ENTER_KEYFRAMES` (`useCompiledEntry.ts:24-27`) = `opacity` + `transform` only. **Zero colour leaves.** `compileToEntry` returned `eligible: true, refusals: []` when I executed it. The other keyframes.js consumption on this component's tree — `CopyButton.vue:70-93` — is likewise `transform`/`opacity` only. R1 is unreachable here.

Where it *becomes* reachable: the card's own scoped CSS is colour-heavy (`:145,148,150,165,166,206` — six `color-mix(in srgb, var(--color-progress) …)` expressions). The moment anyone moves a colour endpoint into `ENTER_KEYFRAMES` to make the artifact fuller, `canonicalizeColors` engages `convertColor(…, "oklab")` on it, and `entry.ts:126-130` **throws a bare `TypeError`** on failure — `useCompiledEntry.recompile()` has no `try`/`catch` and is called as `void recompile()` (`:79`), so the rejection is an unhandled promise rejection, not a rendered refusal. That is the pre-positioned failure, one keyframe away.
**Falsifier.** Find a colour leaf reachable into `compileToEntry` from this component (I found none), or show `recompile()` guarded.

---

## SUPERLATIVES (L-18, both ways — each with its falsifier)

### S★1 · `:shadow="false"` is a **real** fork, not a restated default — verified against the dist

`:10`. `Surface`'s default is `false` (`dist/Surface-DOHf5u2R.js` → `shadow: { type: Boolean, default: !1 }`) — but **`Card` overrides it to `true`** (`dist/card-Da665R8v.js` → `shadow: { type: Boolean, default: !0 }`). The header comment brands it "FORK I5-shadow" (`:6-7`) and it genuinely forks. I expected this to be redundant-default noise and it is not.
*Falsifier: a glass-ui build where `Card` inherits Surface's `false`.*

### S★2 · the `--spring-ease` style seam survives `Card`'s `inheritAttrs: false`

`:12` sets `--spring-ease` via `:style` on a glass-ui `<Card>`. `Card` is `inheritAttrs: false` (`dist/card-Da665R8v.js`) — the usual outcome is a silently dropped `style`. It survives because Card explicitly re-merges it: `let o = m() /* useAttrs */, u = r(() => [o.style, c.value])` then `style: u.value` on the forwarded `Surface`. The custom property lands on the DOM and inherits down to `.discrete-card`. Had it not, the whole demo would silently fall back to `var(--spring-ease, ease)` — a plain `ease` curve — and *look* fine. The component is riding a genuinely fragile seam correctly.
*Falsifier: a glass-ui `Card` that drops `$attrs.style`; the demo would then show `ease`, indistinguishable without inspection.*

### S★3 · the artifact's easing string is **byte-identical** to the card's `--spring-ease`

`serializeEasing` returns `easing.css` verbatim when present (`src/animation/compile/emit/easing-serialize.ts:79`). `springTimingFunction` pairs its callable with `springLinearStops(stopOpts)` where `stopOpts` carries only `{response, dampingFraction}` unless explicitly overridden (`timing-function.ts:108-115`). Executed: `springTimingFunction({r,ζ}).css === springLinearStops({r,ζ})` → **true**. So the "ONE springLinearStops surface" claim (`useSpringLinearStops.ts:6-14`) holds *exactly* on the easing axis — the copy-paste artifact and the live `--spring-ease` are the same string. I went looking for a 24-vs-64 sample-count divergence (the docstring at `timing-function.ts:21` invites the suspicion) and there isn't one.
*Falsifier: pass `sampleCount` at either call site and the identity breaks.*

### S★4 · `transition-behavior: allow-discrete` split into its own declaration, for the stated reason

`:177-179`. The rationale in-source: "a separate declaration so a non-supporting engine still honors the opacity/translate/scale list." That is the correct progressive-enhancement shape for a 2023-era property, and it is the shape almost nobody writes (the common form folds `allow-discrete` into the `transition` shorthand, where an unsupporting parser drops the whole list).
*Falsifier: an engine that drops the entire rule on an unknown longhand — none does; unknown declarations are discarded individually per CSS error handling.*

### S★5 · PRM degrade present, correctly scoped, and correctly *incomplete*

`:209-215` — `transition: none` under `prefers-reduced-motion: reduce`, with the comment noting "the discrete display change still applies, just without motion." That is the right degrade: killing the transition entirely would also kill `allow-discrete`'s hold on `display`, and the author knew it. This file is one of only 10 CSS PRM blocks in the demo (`lane-frontend.md:474` lists `StartingStyleTarget.vue:211`).
*Falsifier: show `transition: none` breaking the `display:none` toggle — it does not; the discrete change becomes instantaneous, which is the intent.*

### S★6 · every "phantom token" I suspected turned out to be real

I tested each custom property this component depends on against the C-tranche precedent (`docs/tranches/C/audit/design-findings.txt:154` — `--spring-snappy`/`--spring-smooth`/`--spring-bouncy` "resolve to **nothing**, verified dangling in both demo source and glass-ui dist"). Result: `--color-progress` is live (`demo/styles/style.css:163` — `--color-progress: var(--accent-kf)`), `--radius-pill` is live (`--radius-pill: 9999px`, and this is the one use *without* a fallback, `:147`), `--radius-lg`/`--radius-md`/`--muted`/`--foreground`/`--duration-slow` all resolve. And `data-register="code"` (`:73`) is a **real registered seam**, not a decorative attribute — `demo/styles/font-roles.json:72-73` maps `[data-register='code']` and `[data-register='code'] *`. Four candidate defects that the tree refuted.
*Falsifier: the C-tranche `--spring-*` class of dangling reference recurring here — it does not.*

### S★7 · `@starting-style` survives the Vue scoped-CSS transform

`:183-189` puts the entry FROM-state inside `@starting-style` in a `<style scoped>` block. `@vue/compiler-sfc` 3.5.35's scoped plugin skips only `keyframesRE = /^(?:-\w+-)?keyframes$/` at-rules (`dist/compiler-sfc.cjs.js:8053`); every other at-rule's child rules are walked and attributed. So `.discrete-card` inside `@starting-style` receives `[data-v-…]` and stays scoped. A newer at-rule inside `scoped` is exactly where silent global leakage happens; it doesn't here.
*Falsifier: a compiler-sfc version that adds `@starting-style` to the skip list, or an emitted stylesheet showing an unattributed `.discrete-card` inside `@starting-style`.*

---

## SUMMARY

| id | severity | claim | anchor |
|---|---|---|---|
| C-1 | **BLOCKER** | `response` provably inert on the card (max Δ = 2e-5) while a live slider exposes it and the readout prints it | `:74-76,116-119,173-176` · `linear-stops.ts:49` |
| C-2 | **BLOCKER** | artifact polarity (`.is-open`, base=closed) is the inverse of the card's (`.is-hidden`, base=open); no `.is-open` in the tree | `:32,50-58,158-197` · `useCompiledEntry.ts:74` · `entry.ts:429-447` |
| C-3 | MAJOR | 2 of 3 asserted artifact/card "matches" are false; + property-set and `overlay` divergence | `useCompiledEntry.ts:41,55` · `scheme-motion.css` |
| C-4 | MAJOR | Reveal/Dismiss rendered twice, two API dialects, one prop (`variant`) nonexistent on glass-ui `Button` | `:40-47` · `SpringScene.vue:138-156` · `Button.vue.d.ts` |
| C-5 | MINOR | copy payload ≠ displayed payload in the async window; `eligible`/`refusals` never checked | `:59,61,122-124` · `useCompiledEntry.ts:47,76` |
| C-6 | MINOR | 3 dead token fallbacks, each off by 1.33–2×, live under F-1 | `:164,173-176,205` |
| C-7 | MINOR | preset-match predicate duplicated verbatim with the sibling facet | `:104-108` · `SpringPhysicsFacet.vue:166-167` |
| C-8 | MINOR | hand-rolled card header where glass-ui ships `CardHeader`/`CardTitle` and the sibling uses `CardContent` | `:15-20` · `SpringPhysicsFacet.vue:22,129` |
| C-9 | INFO | barrel import where `./button`/`./card` subpaths exist (house-consistent) | `:83` |
| C-10 | INFO | `emphasis="secondary"` restates the glass-ui default | `:41` |
| C-11 | INFO | 3 rationale comments + the composable's docstring anchor to the deleted `SpringSidebar.vue` | `:65,67,101` · `useSpringLinearStops.ts:9-11` |
| C-12 | INFO | no props/emits; bare-`!` injection typed as the whole ~30-member facility for a 5-member need | `:96` · `springKeys.ts:4` |
| C-13 | INFO | R1 **not reachable** here (no colour leaves); the pre-positioned failure is the unguarded `void recompile()` | `entry.ts:116-130` · `useCompiledEntry.ts:79` |

**13 defects · 2 blockers · 7 superlatives.**

The two blockers share one root: this component consumes each library surface's *value* and drops its *companion contract* — `springLinearStops`' time-scale, and `compileToEntry`'s open-state polarity. Both are one-declaration fixes at the call site. Nothing here is a library defect: `springLinearStops`, `springTimingFunction`, `serializeEasing` and `compileToEntry` all behaved exactly as documented under execution.
