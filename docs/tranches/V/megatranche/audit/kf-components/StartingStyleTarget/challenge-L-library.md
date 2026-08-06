claude-opus-5[1m]

# CHALLENGE · `StartingStyleTarget.vue` · axis **L — LIBRARY**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/StartingStyleTarget.vue` (216 lines)
**Posture** assume-defective; every claim carries severity + `file:line` + its falsifier. Superlatives carry falsifiers too (L-18 runs both ways).
**Method** read-only source derivation + **one executed probe** against the repo's own `dist/` (`node`, no browser, no writes to any product tree). The probe is the load-bearing evidence for L-M1 and is transcribed verbatim in §Probe.
**Hitherto corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom-dep; §4 roster row 216; §6.5 PRM site list; S-7 CopyButton) and `lane-library.md`. One census claim is **contradicted** (§Contradiction).

**Tally — defects 13 · blockers 1 · superlatives 3**

| id | sev | one-line |
|---|---|---|
| L-B1 | BLOCKER | `@mkbabb/glass-ui` import is undeclared + unlocked — the file cannot build from a clean install |
| L-M1 | MAJOR | the "compileToEntry() artifact" **provably does not reproduce the card it renders** (4 divergences, executed) |
| L-M2 | MAJOR | the artifact's *input* is a hand-typed twin of the scoped CSS — the comment claims the opposite |
| L-M3 | MAJOR | the Reveal/Dismiss command is rendered **twice, simultaneously** — the file's own one-surface law, violated |
| L-M4 | MAJOR | the copy affordance reports success unconditionally and drops the rejection |
| L-mi1 | MINOR | preset-identity predicate duplicated verbatim across two files, magic `1e-6` in both |
| L-mi2 | MINOR | what you read ≠ what you copy in the fallback state |
| L-mi3 | MINOR | `eligible`/`refusals` discarded; recompile rejection discarded |
| L-mi4 | MINOR | dead references — `SpringSidebar` (×3) and `ToggleChip` (×1) name things the tree does not contain |
| L-mi5 | MINOR | header comment documents two props the template does not pass |
| L-mi6 | MINOR | one duration, three different numbers |
| L-i1 | INFO | `inject(KEY)!` — a `!` standing in for a provider contract (fleet idiom, 5 sites) |
| L-i2 | INFO | ref-access idiom split inside one 51-line script block |
| **L-S1** | SUPERLATIVE | `transition-behavior` ordering is correct *and* the reason is recorded |
| **L-S2** | SUPERLATIVE | the PRM block is a real degrade, not a decoration |
| **L-S3** | SUPERLATIVE | `--spring-ease` is a genuine zero-runtime dogfood — and it survives the glass boundary (verified, not assumed) |

---

## L-B1 · BLOCKER · the glass-ui import is unbuildable from a clean install

**Provenance** `StartingStyleTarget.vue:83`

```ts
import { Button, Card } from "@mkbabb/glass-ui";
```

**Claim.** This module specifier resolves today only because of the state of a working `node_modules`. It is declared **nowhere**:

```
$ grep -n "glass-ui" /Users/mkbabb/Programming/keyframes.js/package.json        → (no output)
$ grep -n "glass-ui" /Users/mkbabb/Programming/keyframes.js/package-lock.json   → (no output)
$ cat  node_modules/@mkbabb/glass-ui/package.json | head -3                     → "version": "7.0.0"
```

`npm ci` reconstructs `node_modules` strictly from the lockfile; with zero glass-ui entries, `Button`/`Card` have nothing to resolve against and this component fails at build. This is **census F-1** (`lane-frontend.md:15`, `:54–71`) — I do not re-derive it, I record where it **bites this file**: `Card` is this component's outermost element (`:9`) and the carrier of `--spring-ease` (`:12`), and `Button` is its only command (`:40`). There is no degraded mode; the component is one of the 42 exposed files and one of the ones that cannot render at all without it.

**Why BLOCKER and not inherited-INFO.** The task named the phantom-dep exposure "where it bites this component," and the bite here is total rather than cosmetic: 100% of this file's rendered output is inside a `<Card>` that would not exist.

**Falsifier.** A `"@mkbabb/glass-ui"` entry appearing in `package.json` dependencies/devDependencies **or** a `node_modules/@mkbabb/glass-ui` entry in `package-lock.json`. Either kills this finding outright. (A `.npmrc`, a workspace link, or a postinstall script that fetches glass-ui would also kill it — I checked `.npmrc` (`legacy-peer-deps=true`, single line), `package.json` `scripts` (no `postinstall`), and `.gitmodules` (only `docs/precepts`); none supply it.)

---

## L-M1 · MAJOR · the artifact does not reproduce the card — proven by execution

**Provenance** `StartingStyleTarget.vue:50–62` (the claim), `:158–197` (the actual card), `useCompiledEntry.ts:24–27, :72–75` (the compiled input), probe output below.

The panel is labelled **"compileToEntry() artifact"** (`:58`) and its comment states the contract explicitly (`:50–55`):

> "the copy-pasteable artifact is the REAL `compileToEntry` output for **THIS card's** entry/exit … A designer pastes it **verbatim to reproduce** the discrete transition"

I ran the exact spec `useCompiledEntry.ts:72–75` submits, against the repo's own `dist/engine`. The emitted CSS diverges from the rendered card in **four** independent ways:

| # | the artifact emits | the card actually is | consequence of pasting verbatim |
|---|---|---|---|
| 1 | `.discrete-card { … display: none; }` — base is **CLOSED** | `.discrete-card { opacity:1; translate:0 0; scale:1 }` (`:158–180`) — base is **OPEN** | **the pasted card is invisible by default** |
| 2 | open state = `.discrete-card.is-open` | closed state = `.discrete-card.is-hidden` (`:32`, `:192`) | the state class is both **renamed and inverted**; a designer wiring `is-hidden` gets nothing |
| 3 | `transform: translateY(20px) scale(0.9)` | `translate: 0 1.25rem; scale: 0.9` (`:169–170`, `:194–196`) | different property model — different composition against any other transform source |
| 4 | `500ms` on every entry | `var(--duration-slow, 500ms)` → **450ms** (see L-mi6) | the artifact is 11% slower than the motion on screen |

Divergence 1 is the severe one: the *first* rule of the pasted stylesheet is `display: none`, and the open rule requires a class the demo never applies. A consumer who does exactly what the label invites — copy, paste, reload — sees an empty page. The panel is not a readout of the card; it is a readout of a *different, hypothetical* card.

Note the comment at `:53–55` is internally aware of the `.is-open` shape ("base(closed) + `.is-open` + `@starting-style`") — that awareness is what makes the "**THIS card's**" clause false rather than merely loose. The file documents the artifact's grammar and the card's grammar in adjacent comments and never notices they are inverses.

**Falsifier.** Any of: (a) the template applying `.is-open` on the visible side instead of `.is-hidden` on the hidden side; (b) `useCompiledEntry` passing `{ openSelector: ".is-hidden" }` with a reversed spec; (c) `compileToEntry` emitting an open-base grammar under some option this call does not pass — I read the whole emitter (`src/animation/compile/emit/entry.ts:363–459`); the three-rule shape `base(closed) / open / @starting-style` is unconditional, options only pick the *suffix* and the open `display` value. Any of the three observations kills this claim.

---

## L-M2 · MAJOR · the "dogfood" input is a hand-typed twin of the card

**Provenance** `useCompiledEntry.ts:24–27` vs `StartingStyleTarget.vue:158–197`; the contradicted claim at `StartingStyleTarget.vue:126–128` and `useCompiledEntry.ts:5–8`.

```ts
// useCompiledEntry.ts:24
const ENTER_KEYFRAMES = `@keyframes kf-entry {
    from { opacity: 0; transform: translateY(20px) scale(0.9) }
    to   { opacity: 1; transform: translateY(0px) scale(1) }
}`;
```

The comment above it (`:5–8`) and the one in the target (`:126–128`) both assert the demo "surfaces the exact CSS a designer would paste … **dogfooding the emitter, not re-typing its output by hand**." The *output* is indeed real. The **input** is a hand-typed second copy of the card's endpoints, living in a different file, in a different property model, with a different duration literal, and with no shared constant, token, or derivation binding the two.

This is the mechanism behind all four L-M1 divergences and, more importantly, it is the **standing drift vector**: edit `translate: 0 1.25rem` → `1.5rem` in the scoped block and the "artifact" keeps confidently printing `translateY(20px)`. Nothing — no type, no test, no gate — couples them. The honest description of the current design is *"a compiled artifact for a hand-written twin of this card"*, which is a strictly weaker claim than the one shipped in the comment.

**Falsifier.** A shared source of truth I missed — e.g. the scoped CSS being generated from `ENTER_KEYFRAMES`, a CSS custom property or JS constant consumed by both, or a test asserting equivalence. I grepped: `ENTER_KEYFRAMES` occurs once in the tree (`useCompiledEntry.ts:24`); `.discrete-card` occurs only in `StartingStyleTarget.vue` (`:32,158,183,192,211`) and as the spec key at `useCompiledEntry.ts:73`. No coupling exists. Produce one and this dies.

---

## L-M3 · MAJOR · the Reveal/Dismiss command is rendered twice at once

**Provenance** `StartingStyleTarget.vue:40–47` and `SpringScene.vue:138–156`; render path `App.vue:65–71`.

The target renders the toggle inside the stage card:

```vue
<!-- StartingStyleTarget.vue:40 -->
<Button emphasis="secondary" class="btn-playback btn-playback-accent shrink-0" @click="toggle">
    <span>{{ visible ? "Dismiss" : "Reveal" }}</span>
    <component :is="visible ? EyeOff : Eye" class="w-4 h-4" />
</Button>
```

`SpringScene.vue:138–156` renders the **same command** — same labels, same icons, same `btn-playback btn-playback-accent` class, same `demo.toggleDiscrete()` handler — into the ribbon, gated on exactly the state that mounts this component (`demo.view.value === "discrete"`). `App.vue:65–71` renders `sceneRef.ribbonContent` unconditionally when present. Both are on screen together, always, in the only view where this component exists.

Two aggravations:

1. **The file itself legislates against this.** `:64–70` retires the 4-preset row with the reasoning "*the same four presets were shown THREE times … The ONE preset surface now lives in …*". The component enforced one-surface for presets and shipped two surfaces for its own primary verb.
2. **The twins are not even visually identical.** `SpringScene.vue:142` passes `variant: "outline"`, which is **not a prop of glass-ui 7.0.0 `Button`** (`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6–19` — the axis is `emphasis`, plus `tone|size|iconOnly|loading|type|disabled|class` and reka `PrimitiveProps`). `variant` falls through as a raw DOM attribute and the button renders at the **default** `emphasis: "primary"`, while the target's renders at `"secondary"`. So the duplicate pair reads as two *different-weight* commands doing one thing. (That prop defect belongs to `SpringScene.vue`, cited here only as corroboration that the two were never reconciled.)

`SpringScene.vue:76–80` names the ribbon copy "the primary control for that face" — which makes `StartingStyleTarget.vue:40–47` the redundant one.

**Falsifier.** Evidence that `ribbonContent` is not rendered for this scene/view: `slotProps.selectedControl !== "spring"` at runtime (the scene's own comment `SpringScene.vue:34–38` states `CONTROL_SURFACES.spring = ['spring']`, i.e. it is always `"spring"`), or an `App.vue` gate suppressing the ribbon in discrete view (none at `:65–71`), or a media query hiding one copy (searched `demo/styles/playback-idiom.css` and the scoped blocks — none). Any of these kills the claim. **UNPROVEN-NEEDS-LIVE:** the *visual* severity (whether the two read as an obvious double) is for the SS-13 pass; the *structural* duplication is proven statically.

---

## L-M4 · MAJOR · the copy surface announces success it did not verify

**Provenance** `StartingStyleTarget.vue:59` → `CopyButton.vue:51–63` → `demo/utils/clipboard.ts:3–8`.

```ts
// demo/utils/clipboard.ts:3
export async function copyText(text: string, successMessage?: string): Promise<void> {
    await navigator.clipboard.writeText(text);   // ← can reject
    ...
}

// CopyButton.vue:52
copyText(text);                 // ← not awaited, not caught
isCopied.value = true;          // ← success asserted anyway
liveStatus.value = "";
requestAnimationFrame(() => { liveStatus.value = "Copied to clipboard"; });  // ← announced to AT
```

`navigator.clipboard.writeText` rejects on a non-secure context, a denied permission, or a document without focus. On rejection: (a) an **unhandled promise rejection** escapes; (b) the icon still swaps to the check; (c) the `role="status" aria-live="polite"` sink (`CopyButton.vue:15`) still announces *"Copied to clipboard"* to a screen reader. The user is told, twice, that a copy happened that did not.

This is an outlier, not the house idiom — **every other caller awaits**:

```
useShareState.ts:31            await copyText(url, "Link copied to clipboard!");
KeyframesStringControls.vue:137/144/175   await copyText(...)
CopyButton.vue:52              copyText(text);       ← the only fire-and-forget
```

It bites this component specifically because the copy affordance *is* the panel's deliverable (`:56–62`) — the whole point of L-M1's artifact is that it gets copied.

**Falsifier.** A global `unhandledrejection` handler that surfaces the failure (grepped `demo/app/main.ts`, `App.vue` — none), or the demo shipping exclusively to secure contexts where `writeText` cannot reject. The second would reduce exposure but not the false AT announcement, which is unconditional on the code path.

---

## L-mi1 · MINOR · the preset-identity predicate is duplicated verbatim

**Provenance** `StartingStyleTarget.vue:103–110` vs `SpringPhysicsFacet.vue:165–167`.

```ts
// StartingStyleTarget.vue:104
const match = SPRING_PRESETS.find((p) =>
    Math.abs(demo.response.value - p.response) < 1e-6 &&
    Math.abs(demo.dampingFraction.value - p.dampingFraction) < 1e-6);

// SpringPhysicsFacet.vue:165
const isActivePreset = (t: SpringTrack) =>
    Math.abs(demo.response.value - t.preset.response) < 1e-6 &&
    Math.abs(demo.dampingFraction.value - t.preset.dampingFraction) < 1e-6;
```

Same notion ("are the live params *this* preset?"), same magic tolerance, two files, no shared home — while `springPresets.ts` (which already owns the `SpringPreset` interface and the four rows) is the obvious one, and `useSpringDemo` is the precedent for hoisting a derived readout (it already owns `compiledEntryCss`, `useSpringDemo.ts:395`). One is a *name* lookup and one is a *boolean* test, but both are the same predicate with different projections; they drift the moment the tolerance or the parameter set changes.

**Falsifier.** A shared helper I missed (grepped `1e-6` across `demo/` — exactly these two sites), or a reason the two must diverge (none stated in either file).

---

## L-mi2 · MINOR · what you read is not what you copy

**Provenance** `StartingStyleTarget.vue:59` and `:61`.

```vue
<CopyButton ... :text="compiledEntryCss || copyableCss" />       <!-- :59 -->
<code ...>{{ compiledEntryCss || springCss }}</code>             <!-- :61 -->
```

The two fall back to **different strings**: the rendered text degrades to a bare `linear(0, …, 1)` (`springCss`, `:116`), the clipboard degrades to `transition-timing-function: linear(…);` (`copyableCss`, `:122–124`). Whenever `compiledEntryCss` is empty the panel shows one thing and hands over another, under a label (`:58`) that describes neither. Two expressions, one intent, no shared binding.

**Falsifier.** `compiledEntryCss` being provably non-empty at every paint (it is `ref("")` at `useCompiledEntry.ts:47` and first assigned inside an `async` recompile at `:76`, so at minimum the first render frame takes the fallback; L-mi3 covers the durable paths). Or a deliberate rationale for the asymmetry — none is stated.

---

## L-mi3 · MINOR · the compile's own error channel is discarded

**Provenance** `useCompiledEntry.ts:72–81`.

```ts
const out = await compileToEntry({ ".discrete-card": { enter: entryAnim } }, {...});
css.value = out.css;                                 // :76 — `eligible` and `refusals` dropped
...
watch([response, dampingFraction], () => void recompile(), { immediate: true });   // :79
```

`compileToEntry` returns `{ css, eligible, refusals }` (`src/animation/compile/emit/entry.ts:99–107`) and, on refusal, returns **`css: ""`** with a typed reason (`:452–455`). This composable reads only `css`, so a refusal degrades to the empty string, which the target's `||` turns into a bare `linear()` mislabelled "compileToEntry() artifact" — silently and permanently. Separately, `void recompile()` discards the promise: a `loadAnimationEngine()` rejection (chunk 404, offline) produces an unhandled rejection and the same silent mislabelled fallback.

**Honest scoping:** the *refusal* path is **latent, not live**. I executed the actual spec — `eligible: true, refusals: []` (see §Probe) — and the spec is a fixed 2-stop literal with default options, so none of the nine refusal reasons can currently fire. The reachable path today is the dynamic-import rejection. I rate this MINOR for that reason; it would be MAJOR if the spec were user-shaped.

**Falsifier.** A caller-side surface for `eligible`/`refusals` elsewhere (grepped `refusals` across `demo/` — only `KeyframesStringControls.vue` handles a *different* compile's partial result), or a global rejection handler (none).

---

## L-mi4 · MINOR · four dead references to things the tree does not contain

**Provenance** `StartingStyleTarget.vue:65`, `:67`, `:101`, `:200`.

- `:65,:67,:101` — "the SpringSidebar cells", "the ONE preset surface now lives in **the SpringSidebar rail**". `find demo -name "SpringSidebar*"` → **no output**. The file was dissolved at T.B7; `SpringPhysicsFacet.vue:2–20` documents the dissolution and `:60–89` holds the surviving preset surface (glass `Chip` cells). Three comments point a reader at a deleted module.
- `:200` — "the active affordance hangs off **the consumed ToggleChip's** `data-state="on"` seam". This component consumes no `ToggleChip`; nothing in the tree does (`grep -rn ToggleChip demo/` → two *comments*, `EasingTarget.vue:70` and this line). The real consumed primitive is `Chip` (`SpringPhysicsFacet.vue:67`, whose `data-state="on"` rule is at `:220`).

The same staleness is in an imported file: `useSpringLinearStops.ts:8–14` cites "exactly 2 call-sites — `SpringSidebar.vue:130` … and `StartingStyleTarget.vue:95`". The real two are `SpringTrace.vue:42` and `StartingStyleTarget.vue:**116**`; `SpringSidebar.vue` does not exist. A docstring whose whole purpose is to justify a 2→1 collapse cites two wrong locations.

**Falsifier.** `SpringSidebar.vue` existing anywhere outside `.claude/worktrees/` (checked: `find demo -name "SpringSidebar*"` empty), or a `ToggleChip` export being consumed by this file (it imports only `Button, Card` at `:83`).

---

## L-mi5 · MINOR · the header comment documents props the template does not pass

**Provenance** `StartingStyleTarget.vue:4–5` vs `:9–13`.

The comment: *"A standard, NON-cartoon glass `<Card>` … (`tier="resting" surface="glass"`, rounded-card by construction)"*. The template passes **neither**:

```vue
<Card :shadow="false" class="…" :style="{ '--spring-ease': springCss }">
```

Against glass-ui 7.0.0 (`card-Da665R8v.js:10–51`): `surface` defaults to `"glass"` — so that half is accidentally true — but `tier: {}` has **no default**, so `tier="resting"` is simply not in effect. A comment that names a prop configuration is a contract a reader will trust; half of this one is fiction.

**Falsifier.** A `tier` default arriving from `SurfaceProps` further down the chain (the compiled Card declares `tier: {}` with no `default` and forwards it verbatim to `Surface` at `card-Da665R8v.js:65`), or a wrapper supplying it (none — `SpringScene.vue:11` mounts `<StartingStyleTarget />` bare).

---

## L-mi6 · MINOR · one duration, three numbers

**Provenance** `StartingStyleTarget.vue:173–176`, `useCompiledEntry.ts:50`, `SquareScene.css:114–115`.

```css
transition:
    opacity  var(--duration-slow, 500ms) var(--spring-ease, ease),
    translate var(--duration-slow, 500ms) var(--spring-ease, ease),
    scale    var(--duration-slow, 500ms) var(--spring-ease, ease),
    display  var(--duration-slow, 500ms);
```

Resolution chain, verified end to end: `demo/styles/style.css:3` → `@mkbabb/glass-ui/styles` → `dist/styles/index.css` → `./tokens.css` → `./tokens/scheme-motion.css` → `:root { … --duration-slow: 0.45s; … }`. No demo override exists (`grep -rn -- "--duration-slow:" demo/` → no output).

So: the token is **450ms**; this file's fallback literal says **500ms** (dead, and wrong if it ever fired); the sibling `SquareScene.css:114` writes the fallback as **420ms** (also dead, also wrong, and inconsistent with this file); and `useCompiledEntry.ts:50` hardcodes **500** into the artifact, which is what makes L-M1 divergence #4. Four sites, three numbers, one real value.

**Falsifier.** A cascade layer redefining `--duration-slow` after the glass-ui import — searched the whole demo CSS surface, none. Or a `@property` registration changing the fallback semantics — none for this name.

---

## L-i1 · INFO · `inject(KEY)!` as a provider contract

**Provenance** `StartingStyleTarget.vue:96–98`.

```ts
const demo = inject(SPRING_DEMO_KEY)!;
const visible = demo.visible;      // :97 — throws "Cannot read properties of undefined" if unprovided
```

The `!` converts a missing `provide` into an unattributed `TypeError` on the next line rather than a named error. Rated INFO, not MINOR, for two honest reasons: the mount is structurally guaranteed (`SpringScene.vue:31–32` provides, `:11` mounts), and it is the **fleet idiom**, not this file's invention — `EasingTarget.vue:152`, `SequenceTarget.vue:150`, `SequenceScrubber.vue:47`, `SpringTarget.vue:169` are identical. Any remedy belongs to a fleet wave, not to this component.

**Falsifier.** A path that renders `StartingStyleTarget` outside `SpringScene` (none — it is imported exactly once, `SpringScene.vue:24`).

---

## L-i2 · INFO · two ref-access idioms in one 51-line script

`visible` is aliased to a local binding and read auto-unwrapped in the template (`:97`, used at `:32`/`:45`), while sibling refs on the same injected object are read through `.value` in the template (`:75`, `demo.response.value.toFixed(2)`). Both are correct Vue; the split is a legibility cost inside a very short script block, and it is the kind of thing that invites a wrong `.value` on the next edit.

**Falsifier.** A reason the two must differ — `visible` is aliased because it is used twice and `demo.response` once, which is a defensible if unstated economy.

---

# Superlatives (L-18, the other direction)

## L-S1 · the `transition-behavior` ordering is correct *and* justified in place

**Provenance** `StartingStyleTarget.vue:172–179`.

```css
transition: opacity …, translate …, scale …, display var(--duration-slow, 500ms);
/* MANDATORY for the display discrete transition — a separate declaration so
   a non-supporting engine still honors the opacity/translate/scale list. */
transition-behavior: allow-discrete;
```

The `transition` shorthand **resets** `transition-behavior` to `normal`, so the longhand must come after — it does. And the stated reason is the *right* reason (graceful degradation on engines that drop the unknown longhand while keeping the shorthand list). This is a subtle cascade ordering that is routinely written backwards; here it is both correct and self-documenting, so a future editor reordering the block will see why not to.

**Falsifier (this superlative's).** A build step that reorders or merges declarations within a rule (Vue's scoped transform rewrites *selectors*, not declaration order — `@vue/compiler-sfc` `scopedPlugin`, `compiler-sfc.cjs.js:8054+`; Tailwind v4 does not touch authored `<style scoped>` bodies). If some minifier collapsed longhand-after-shorthand, the praise would invert into a defect.

## L-S2 · the PRM block is a real degrade

**Provenance** `StartingStyleTarget.vue:210–215`; census `lane-frontend.md §6.5` lists this exact line (`:211`) among the 10 CSS PRM sites.

```css
@media (prefers-reduced-motion: reduce) { .discrete-card { transition: none; } }
```

This is the correct shape for a discrete transition: `transition: none` removes the motion *and* (by shorthand reset) the `allow-discrete` behavior, so `display:none` applies instantly and the toggle stays fully functional — not a version of the feature with the motion secretly still running, and not a version where the element gets stuck painted. The comment (`:210–211`) states exactly that outcome. Specificity and source order both favor the media block, so it actually wins.

**Falsifier.** A later rule of equal-or-higher specificity re-adding a transition to `.discrete-card` (none in the file; `:192–197` is `.discrete-card.is-hidden`, higher specificity, but declares no `transition`), which would make the degrade partial.

## L-S3 · `--spring-ease` is a true zero-runtime dogfood — verified through the glass boundary

**Provenance** `StartingStyleTarget.vue:12`, `:116–119`, `:173–176`; `useSpringLinearStops.ts:24–34`; `springLinearStops` at `src/animation/physics/spring/css/linear-stops.ts:46`; glass Card forwarding at `card-Da665R8v.js:8, 55, 60, 77`.

A library-computed `linear()` is piped into a **native CSS transition** — no rAF, no per-frame JS, no engine instance retained for this card. That is the strongest form of the "the demo IS the library" claim in this scene: the motion on screen is literally the published emitter's output being interpreted by the browser's own transition machinery. The composable is a clean `MaybeRefOrGetter` contract that re-samples on any param change and nothing else (no side effects, no teardown obligation, nothing to leak).

I did not take the boundary on faith. `<Card>` sets `inheritAttrs: false` (`card-Da665R8v.js:8`), which normally *drops* a fallthrough `:style` — the entire dogfood would silently die and the transition would fall back to `ease`. It does not, because Card explicitly re-forwards it:

```js
o = useAttrs(), … u = computed(() => [o.style, c.value])      // :55,:60
… mergeProps(r.$attrs, { …, style: u.value, … })              // :62,:77
```

so `--spring-ease` lands on the rendered element and inherits down to `.discrete-card`. Worth recording precisely because it is the kind of thing a glass-ui minor version could break without a type error anywhere.

**Falsifier (this superlative's).** A future glass-ui `Card` dropping the `attrs.style` re-forward, or `Surface` setting `inheritAttrs: false` without forwarding (it does not — `Surface-DOHf5u2R.js` contains no `inheritAttrs`). Either would make `--spring-ease` unresolved and the praise would become a BLOCKER-class silent failure. **UNPROVEN-NEEDS-LIVE:** that the resulting motion *looks* like the intended spring is for SS-13; that the value reaches the element is proven statically.

---

# Contradiction of the hitherto corpus

**`lane-frontend.md` §5 S-7 is wrong on its independent claim.** It states:

> "`CopyButton.vue:70` and `:83` build `@keyframes fade-in` / `fade-out` as **runtime JS template strings** and inject them — style-injection from script, bypassing the cascade entirely. That is its own defect regardless of the glass question."

There is no injection. `CSSKeyframesAnimation.fromString()` (`src/animation/engine/css/css-animation.ts:169–200`) **parses** the CSS text into the animation model (`resolveKeyframes` → `propertyRegistry`, `scrollOptions`, `diagnostics`, option base) and the engine then drives targets by direct style writes. Nothing in `src/animation/` calls `insertRule`, creates a `<style>`, or touches `adoptedStyleSheets` for output — the only `adoptedStyleSheets` reference is an **ingest** read (`src/animation/ingest/cssom.ts:351`).

Authoring keyframes as a CSS string is the package's *declared* API and tagline ("specify your keyframes in standards-complaint CSS"), and it is the same idiom `useCompiledEntry.ts:24` and every preset in `src/animation/presets/catalog.ts:316` use. S-7's shell-should-be-glass-`Button` half stands; the "style-injection … bypassing the cascade" half should be struck. My L-M4 is a **different** CopyButton defect (unawaited rejection + unconditional success announcement) and does not depend on S-7 either way.

Where I **fold** rather than contradict: F-1 (`lane-frontend.md:15`, `:54–71`) is the source of L-B1 — I add only the local bite. §6.5's PRM inventory is the source of the L-S2 cross-check. Roster row 216 (`lane-frontend.md:246`, "`@starting-style` demo — `Button`, `Card`") matches the tree exactly.

---

# Probe (the executed evidence for L-M1)

Script written to scratchpad only; **no product tree was written**. It imports the repo's own built `dist/` and reproduces `useCompiledEntry.ts:52–75` exactly (same keyframes literal, same 500ms, same `openSelector: ".is-open"`, same `display: "flex"`, params = the boot defaults 0.5 / 0.86 from `useSpringDemo.ts:83–84`).

```
$ node scratchpad/probe.mjs
=== eligible: true refusals: []
.discrete-card {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  display: none;
  transition: opacity 500ms linear(0, 0.28457 4.000%, …, 1), transform 500ms linear(…),
              display 500ms allow-discrete, overlay 500ms allow-discrete;
}

.discrete-card.is-open {
  opacity: 1;
  transform: translateY(0px) scale(1);
  display: flex;
  transition: opacity 500ms linear(…), transform 500ms linear(…),
              display 500ms allow-discrete, overlay 500ms allow-discrete;
}

@starting-style {
  .discrete-card.is-open {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
}
```

(`linear()` bodies elided at `…` for width; they are 26-stop strings, emitted four times, ~700 chars each — the panel's `max-h-32` scroller at `:61` holds ~3 KB.)

Read against `StartingStyleTarget.vue:158–197`, this is the whole of L-M1: base closed vs base open, `.is-open` vs `.is-hidden`, `transform` vs `translate`+`scale`, `500ms` vs the 450ms token. `eligible: true` is what scopes L-mi3 down to MINOR.

---

# Not claimed (checked, and the tree acquitted the component)

Recorded so a later pass does not re-spend the probes:

- **Scoped `@starting-style`.** `@vue/compiler-sfc`'s `scopedPlugin` skips only `*keyframes` at-rules (`compiler-sfc.cjs.js:8092`) and recurses into all others, so `.discrete-card` inside `@starting-style` (`:183–189`) **does** receive `[data-v-…]`. No scope leak. Not a defect.
- **`--color-progress` undefined.** It is defined — `demo/styles/style.css:163` (`--color-progress: var(--accent-kf)`). The five `color-mix()` uses (`:145,148,150,165,166`) resolve. Not a defect.
- **Leaks / teardown.** The component registers no listener, timer, observer, painter, or engine instance; it holds two computeds and two aliases. There is nothing to tear down and nothing is left undone. Correct by construction.
- **`emphasis="secondary"`** (`:42`) is a valid glass-ui 7.0.0 `Button` prop (`Button.vue.d.ts:4,8`). Unlike its twin in `SpringScene.vue:142`, this call site is right.
- **Module size.** 216 lines / 78 template / 51 script / 82 style — Goldilocks-compliant for a scene target; the script block does exactly one thing (read the injected demo, derive two strings). The pressure in this file is comment *staleness* (L-mi4/L-mi5), not size.
- **`springLinearStops` terminal stop.** I checked whether pinning the final stop to `1` snaps an under-settled tail — for the slowest preset (ζ=1.0, response=0.7) the sampled envelope reaches `1.00000` by the 48% stop, so there is no terminal discontinuity. Not a defect.
