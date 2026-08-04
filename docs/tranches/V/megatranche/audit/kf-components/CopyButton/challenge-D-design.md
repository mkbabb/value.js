claude-opus-5[1m]

# CHALLENGE · `CopyButton.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/CopyButton.vue` (113 lines)
**Mode:** static, read-only. No writes to any product tree; no dev server, no browser, no installs. Two read-only `node --input-type=module` probes of the **installed** `@mkbabb/value.js` dist were run to decide a name-resolution question (the lane-frontend precedent, `lane-frontend.md §3.1`); they mutate nothing.
**Posture:** DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier; a claim that its falsifier kills is withdrawn, not softened.
**Corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` — **S-7** (CopyButton → glass `Button`, "partial shadow"), **F-1** (glass-ui phantom dep), **§6.4** (the two runtime-JS `@keyframes` strings), **§6.5** (13 PRM enforcement sites — CopyButton is **not** one).

## Files read whole

| file | why |
|---|---|
| `demo/components/CopyButton.vue` | the target |
| `demo/utils/clipboard.ts` | its only non-vendor import (`copyText`) |
| `node_modules/@lucide/vue/dist/esm/icons/clipboard.mjs`, `clipboard-check.mjs`, `createLucideIcon.mjs`, `Icon.mjs`, `defaultAttributes.mjs` | the two rendered glyphs + their component shape (functional vs stateful — decides the template-ref question) |
| `src/animation/engine/animation.ts` (ctor 173–202), `engine/option-setters.ts`, `engine/options.ts`, `compile/easing/easing-option.ts`, `compile/easing/easing-registry.ts`, `engine/css/css-animation.ts` | the `InputAnimationOptions` → easing resolution path |
| `src/animation/constants/types.ts:140–205`, `src/animation/group/group.ts:55–57` | the `respectReducedMotion` contract |
| the 4 call sites: `scenes/easing/EasingTarget.vue:35`, `scenes/spring/StartingStyleTarget.vue:59`, `components/instrument/keyframes/KeyframesEditor.vue:82`, `components/instrument/keyframes/KeyframeCard.vue:26` (+ `scenes/easing/EasingTarget.css:55–79`) | sizing / colour / focus context |
| `demo/styles/design-idioms.css:30–100`, `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`, `.../styles/accessibility.css` | the demo's own focus / tap-floor / icon-size idioms and glass's a11y layer |

**Tally: 16 defects · 2 BLOCKER · 3 superlatives.** (`defects` counts every claim below, blockers included.)

---

## 0. Headline

The component is **accessible-only**. On click, a screen-reader user is correctly told "Copied to clipboard"; a **sighted user sees nothing change at all**, because the animation that was supposed to be the visual confirmation never constructs — its `timingFunction` names a curve that does not exist in the registry, and the engine is documented fail-explicit ("there is no silent fallback to a default curve"). The second channel, `isCopied`, is computed and then rendered nowhere except an `aria-label` that never resets. The two feedback channels have **exactly inverted lifetimes**: the visual one lasts 0 ms, the accessible one lasts forever.

| id | severity | one-line |
|---|---|---|
| D-1 | **BLOCKER** | `timingFunction: "bounceInEase"` is not a resolvable name → the ctor throws in `onMounted` → `group` stays `null` → zero sighted feedback at all 4 call sites |
| D-2 | **BLOCKER** | `isCopied` never resets → the accessible name is permanently "Copied to clipboard"; the `label` prop is destroyed after the first click |
| D-3 | MAJOR | a failed copy announces success (unawaited, uncaught promise; state set unconditionally) |
| D-4 | MAJOR | `prefers-reduced-motion` honoured by neither gate (engine opt-in unset; glass's CSS override cannot reach rAF inline writes) |
| D-5 | MAJOR | no intrinsic box — the component collapses to 0×0 unless every consumer sizes it; confessed in consumer CSS |
| D-6 | MAJOR | 16×16 CSS-px targets at 2 of 4 sites, below WCAG 2.2 SC 2.5.8's 24px floor; the demo's own `.tap-floor` has zero adopters |
| D-7 | MAJOR | opts out of the demo's declared single `:focus-visible` contract; a third focus idiom sits in the same toolbar row |
| D-8 | MAJOR | glass-ui shell rejected (folds S-7): no `Button`, no `Tooltip`, no hover/active/disabled — hover is improvised per call site |
| D-9 | MINOR | the `fade-out` keyframe fades nothing; the "icon swap" the comment claims is not implemented |
| D-10 | MINOR | confirmation persistence ≈ 200 ms peak-at-100 ms with no hold; `isCopied` renders nothing |
| D-11 | MINOR | decorative glyphs carry no `aria-hidden`, against the demo's own established idiom |
| D-12 | MINOR | no empty-`text` guard — an empty copy announces success |
| D-13 | MINOR | colour duel: component `text-foreground` vs consumer `--muted-foreground`; exactly one is dead |
| D-14 | INFO | physical `bottom`/`left` where `inset: 0` says it once (RTL checked — clean) |
| D-15 | INFO | forced-colors: glass's contrast layer keys on state attributes this component never emits |
| D-16 | INFO | rAF-gated announcement + simultaneous name change (hidden-tab stall; possible double announce) |
| SUP-1..3 | **superlative** | the live-region re-arm · the lazy-engine guard · the overridable-label API shape |

---

## D-1 — **BLOCKER** · the motion is dead: `bounceInEase` is not a registry curve

**Provenance:** `demo/components/CopyButton.vue:40–43`

```ts
const options: Partial<InputAnimationOptions> = {
    duration: 200,
    timingFunction: "bounceInEase",
};
```

That options bag is handed to `new CSSKeyframesAnimation(options)` twice (`:69`, `:82`). The construction path is unconditional:

- `engine/css/css-animation.ts:56–63` — `constructor(options?, ...targets) { super(options, targets); … }`
- `engine/animation.ts:196` — `this.setOptions({ ...defaultOptions, ...this._ctorOptions })`
- `engine/option-setters.ts:149` — `applyOptions` → `applyTimingFunction` **first**
- `engine/options.ts:41–47` — `normalizeTimingFunction` → `resolveEasingOption("timingFunction", input)`
- `compile/easing/easing-option.ts:18–21` — the module's own contract: *"Fail-explicit: unresolvable input **throws**; there is **no silent fallback** to a default curve."* `:44–57` wraps the throw as `AnimationOptionError(… "UNKNOWN_TIMING_FN")` and rethrows.
- `compile/easing/easing-registry.ts:126–135` — `resolveTimingFunction`: try `parseTimingFunction` (CSS literal), else the registry `Map`, else `throw new TypeError('Unknown timing function "…"')`.

The registry's membership is closed and enumerable (`easing-registry.ts:18–34`): `Object.keys(bezierPresets)` ∪ `"ease-in-bounce"` ∪ `DIRECT_NAMES`. Probed against the installed `@mkbabb/value.js`:

```
$ node --input-type=module -e 'import {bezierPresets,easing} from "./node_modules/@mkbabb/value.js/dist/subpaths/easing.js"; …'
bezierPresets keys: linear, ease, ease-in, ease-out, ease-in-out, smooth-step-3,
  ease-in-sine … ease-in-back, ease-out-back, ease-in-out-back      (30, all kebab-case)
bounceInEase   -> {"code":"easing_name_unknown"}
easeInBounce   -> OK
ease-in-bounce -> OK

$ node --input-type=module -e 'import {parseTimingFunction} from ".../subpaths/css.js"; …'
"bounceInEase"          -> FAIL
"cubic-bezier(0,0,1,1)" -> OK
```

`DIRECT_NAMES` (`easing-registry.ts:19–29`) contains `easeInBounce` — **not** `bounceInEase`. The name at `:42` is a **transposition of a real curve**, and it is a repo-wide phantom: it appears in exactly three other places, all prose, and one of them asserts the opposite of the truth —

```
src/animation/easing.ts:44                    (comment)
src/animation/waapi/eligibility.ts:169        (comment)
test/orchestration/orchestration-api.test.ts:143-146
  // `easeOutCubic` / `bounceInEase` are real registry curves but map to NO CSS keyword
  expect(cssTwinFor("bounceInEase")).toBeUndefined();
```

The test passes **vacuously** — an unknown name has no CSS twin either — so the suite green-lights the phantom. `CopyButton.vue:42` is the only place in the repo where the name is ever *executed*.

**Consequence, deduced not run:** `new CSSKeyframesAnimation(options)` at `:69` throws inside the `async` `onMounted` body (`:65–102`), which has no `try`/`catch`. The returned promise rejects → an unhandled rejection at **every mount of every CopyButton** → `group.value` (`:49`) is never assigned → `void group.value?.play()` (`:62`) is a permanent no-op → `clipboardChecked` keeps its static `opacity-0` (`:10`) forever. `isCopied` drives no visual (D-2/D-10). The button has no `:active`, no hover, no background, no border (`:5`).

**Net design outcome: clicking the copy button produces no visible change of any kind.** The affordance's entire sighted feedback loop is absent from the shipping tree, at all four call sites (`EasingTarget.vue:35`, `StartingStyleTarget.vue:59`, `KeyframesEditor.vue:82`, `KeyframeCard.vue:26`).

**Falsifier.** Any one of these kills the claim: (a) `"bounceInEase"` resolves — refuted twice above, against the installed dist the demo actually loads; (b) the demo resolves `@mkbabb/keyframes.js` to some other build carrying a legacy alias — refuted by `vite.config.ts:37–60`, the self-alias to `src/animation/index.ts`, which is the exact tree cited (per `lane-frontend.md §8`); (c) the throw is caught somewhere upstream and a fallback group is installed — there is no `catch`, no `errorCaptured`, and `group` is assigned only at `:101`; (d) `applyTimingFunction` is not reached because `defaultOptions` shadows the ctor value — refuted by `option-setters.ts:145–156` spread order (`{...defaultOptions, ...this._ctorOptions}`, ctor last) . **Live check that would settle it in one second:** open any scene, click a CopyButton, and read the console for `AnimationOptionError: UNKNOWN_TIMING_FN`. Marked **UNPROVEN-NEEDS-LIVE only for the console string**; the resolution failure itself is proven statically.

---

## D-2 — **BLOCKER** · the accessible name is permanently wrong after one click

**Provenance:** `CopyButton.vue:4`, `:32`, `:54`

```
 4  :aria-label="isCopied ? 'Copied to clipboard' : label"
32  const isCopied = ref(false);
54  isCopied.value = true;
```

`isCopied` is written in exactly one place and **never reset** — no timeout, no `watch`, no animation-end hook. From the first click until unmount, the button's accessible name is the past-tense sentence "Copied to clipboard".

Consequences, all decidable from the tree:

1. **WCAG 4.1.2 (Name, Role, Value).** A control's name must describe its purpose. After one use the name describes a completed event, not the action the control still performs.
2. **The `label` prop is destroyed.** `EasingTarget.vue:35–39` deliberately supplies `label="Copy easing literal"` — the only site that distinguishes *which* thing is copied. After the first click that distinction is gone, and the page's four copy buttons become four identically-named controls.
3. **Speech input breaks (WCAG 2.5.3 territory).** "Click Copy easing literal" stops matching. The user must say "Click Copied to clipboard" — an instruction that reads as a statement, on a control whose visible label is nothing at all.
4. **Combined with D-1**, the aria state is now the *only* mutation the click produces, and it is the wrong one.

Compare the sibling control eight lines away in the same toolbar, which models a persistent boolean correctly with a *state* attribute rather than by rewriting its name: `KeyframesEditor.vue:87–89`, `aria-label="Apply CSS keyframes to the target"` + `:aria-pressed="cssApplied"`.

**Falsifier.** Show any reset of `isCopied` (a `setTimeout`, a `watch`, an `onfinish`), or show that a permanent past-tense name is the intended contract. `grep -n "isCopied" CopyButton.vue` → `4, 32, 54`. Nothing else touches it. Also falsified if the component is always unmounted between copies — refuted: all four hosts are persistent panels (`KeyframeCard.vue:26` inside a card list, `KeyframesEditor.vue:82` inside a `role="toolbar"`).

---

## D-3 — MAJOR · a failed copy announces success (the error state is uncovered)

**Provenance:** `CopyButton.vue:51–63` + `demo/utils/clipboard.ts:3–8`

```ts
// CopyButton.vue
const handleClick = () => {
    copyText(text);              // ← not awaited, not caught
    isCopied.value = true;       // ← unconditional
    liveStatus.value = "";
    requestAnimationFrame(() => { liveStatus.value = "Copied to clipboard"; });
```
```ts
// utils/clipboard.ts
export async function copyText(text: string, successMessage?: string): Promise<void> {
    await navigator.clipboard.writeText(text);   // ← may reject; may not exist
```

`navigator.clipboard.writeText` rejects on permission denial and on a document that is not focused, and `navigator.clipboard` is **undefined entirely in a non-secure context** — in which case `copyText` throws a `TypeError` synchronously inside its async body and returns a rejected promise. The floating call means: unhandled rejection, **and** the `role="status"` live region unconditionally announces "Copied to clipboard" to a user whose clipboard was not written. A screen-reader user is told a falsehood at exactly the moment they have no other channel to check (D-1 removed the visual one).

The dev path makes this routine rather than exotic: any `http://` LAN origin (the standard mobile-device test path) has no `navigator.clipboard` at all.

The design axis reads this as a missing **error state**: the component has one state (`isCopied`) and it encodes optimism, not outcome. The correct shape is three states — idle / copied / failed — with the failure surfaced (`ClipboardX` exists in the installed lucide set: `node_modules/@lucide/vue/dist/esm/icons/clipboard-x.mjs`).

**Falsifier.** Show a rejection path that suppresses the announcement, or show that `writeText` cannot reject in every context the demo ships to. Neither exists: `clipboard.ts` has no `catch`, `handleClick` has no `catch`, and there is no `unhandledrejection` handler anywhere in `demo/` (`grep -rn "unhandledrejection" demo/` → no output). Also falsified if `successMessage`'s toast path were used to signal failure — it is not: no call site passes a second argument.

---

## D-4 — MAJOR · `prefers-reduced-motion` is honoured by neither available gate

The component has no PRM handling of any kind: no `@media (prefers-reduced-motion: reduce)` in its `<style scoped>` (`:104–113`), no `matchMedia` in its script. `lane-frontend.md §6.5` enumerates the demo's 13 PRM enforcement sites — CopyButton is absent from that list, and the census is correct.

Two gates exist and **both** miss:

1. **The engine's own opt-in is unset.** `src/animation/constants/types.ts:147–152, 201` — `respectReducedMotion`: *"Default false (consumers opt in)."* `src/animation/group/group.ts:55–57` repeats it for `AnimationGroup`. `CopyButton.vue:40–43` does not set it, and neither does `:95–96` on the group.
2. **The cascade-level override cannot reach this animation.** `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css` ships the blanket rule `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: 0.01ms !important; … transition-duration: 0.1s !important } }`. That rule governs **CSS** animations and transitions. The keyframes.js engine writes interpolated **inline style properties** frame-by-frame on the rAF loop (`transformTargetsStyle`, `engine/animation.ts:159`) — no CSS animation is ever declared, so there is nothing for `animation-duration` to shorten. The demo's cascade therefore *looks* blanket-covered while a `scale(1) → 1.25 → 1` pulse runs at full amplitude.

This one is **latent behind D-1** — today the animation never runs at all, so no motion reaches a PRM user. The moment D-1 is repaired, the defect becomes live. It must be fixed in the same change, not after it.

**Falsifier.** Show that `respectReducedMotion` defaults true (refuted verbatim at `types.ts:201`), or that the engine consults the shared gate (`src/animation/internal/reduced-motion.ts`) unconditionally rather than behind the flag — `play-lifecycle.ts:208` and `group/lifecycle.ts:100` both site the consultation inside the opt-in branch. Or show the engine emits a real CSS `animation` for this path — `fromString` here is a *parser* of an authored `@keyframes` block into engine frames (`:69`, `:82`), not a stylesheet emitter.

---

## D-5 — MAJOR · the component has no intrinsic box; the size contract is implicit

**Provenance:** `CopyButton.vue:2–16` + `:104–113`

Every one of the button's three children is out of flow — `Clipboard` and `ClipboardCheck` are `position: absolute` (`:111`), and the status `<span>` is `.sr-only`, which is `position:absolute; width:1px; height:1px` (`glass-ui/dist/styles/components.css`). The button itself is `inline-block p-0 m-0 border-0` (`:5`). **Content box: 0 × 0.** With no consumer-supplied size the button renders invisible and effectively unclickable, and the `height:100% / width:100%` on the glyphs (`:108–109`) resolve against nothing.

The tree confesses this in the consumer, not the component — `scenes/easing/EasingTarget.css:68–73`:

```css
.literal-copy {
    /* CopyButton's icons are absolutely-positioned at 100% — the button needs
       an intrinsic box here (the sidebar mount sizes it externally). */
    width: 1rem;  height: 1rem;  flex: none;  color: var(--muted-foreground);
}
```

An invariant documented in one of four consumers is not an invariant; it is a trap for the fifth. And the four consumers do not agree on the proportion:

| call site | size supplied | px |
|---|---|---|
| `EasingTarget.vue:36` → `.literal-copy` | `1rem` | 16 |
| `StartingStyleTarget.vue:59` | `w-4 h-4` | 16 |
| `KeyframesEditor.vue:83` | `w-6 h-6` | 24 |
| `KeyframeCard.vue:26` | `h-6 w-6` | 24 |

Three spellings, two sizes, zero tokens — while the demo owns a documented icon-sizing family precisely for this (`design-idioms.css:92–100`: `@utility icon-xs/sm/md/lg`, whose comment records that "61 call-sites used to resolve to nothing"; 46 uses live in `.vue` today). CopyButton reaches none of it. On the Aristotelian reading this is the defect of *the mean by omission*: the component declines to state its own proportion, so proportion is re-litigated at every mount.

**Falsifier.** Show a default size on the root, or a `:has()`/`@container` fallback, or a documented prop. `:5` is the complete class list — no `size-*`, no `min-w`, no `w-`. Or show that the 0×0 case is unreachable because all consumers are enumerated and correct — true *today* (4/4 supply a box) which is exactly why this is MAJOR and not BLOCKER; the claim is about the contract, not a present-tense broken render.

---

## D-6 — MAJOR · 16 × 16 targets, under the WCAG 2.2 SC 2.5.8 floor

Two of the four instantiations render a 16 × 16 CSS-px pointer target: `StartingStyleTarget.vue:59` (`w-4 h-4`) and `EasingTarget.vue:36` → `.literal-copy` (`width/height: 1rem`, `EasingTarget.css:70–71`). SC 2.5.8 *Target Size (Minimum)*, Level **AA** in WCAG 2.2, requires 24 × 24 CSS px.

Honest accounting of the exceptions: **Spacing** can rescue an undersized target if a 24px-diameter circle centred on it intersects no other target's circle. At `EasingTarget.vue:35` the neighbour is a `<code>` literal (not a target) at `gap: 0.45rem` ≈ 7.2px, so the spacing exception plausibly holds there; at `StartingStyleTarget.vue:57–59` the neighbour is a `<span>` label, likewise. **Inline** does not apply — the button is a flex item, not inline text flow. So the finding is precisely: *the component ships no floor of its own and delegates the SC entirely to the geometry of whatever sits beside it.* Any future mount that places two of these side by side fails 2.5.8 outright, and no guard in the component or the call sites would catch it.

Sharpening it: the demo **already owns the floor utility** and nobody uses it — `design-idioms.css:81–85`:

```css
/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */
.tap-floor { min-height: 44px; min-width: 44px; }
```
```
$ grep -rn "tap-floor" demo/ --include="*.vue" --include="*.css"
demo/styles/design-idioms.css:81   (the comment)
demo/styles/design-idioms.css:82   (the rule)
→ zero adopters
```

(glass-ui's `@utility touch-hit-area` in `a11y-overrides.css` is **not** the fix here and I am not citing it as one: its coarse-pointer `::before` carries `pointer-events: none`, so it expands nothing.)

**Falsifier.** Measure a 24px circle at each of the two sites and show no intersection with another target → the two instances survive on the spacing exception and this drops to MINOR (the contract claim survives regardless). Marked **UNPROVEN-NEEDS-LIVE** for the circle test; the 16px measurement itself is proven from `w-4` / `1rem`.

---

## D-7 — MAJOR · opts out of the demo's single declared focus contract

`demo/styles/design-idioms.css:73–79` declares the law in its own comment:

```css
/* The demo-owned :focus-visible contract — the SINGLE keyboard-focus affordance:
   `.focus-ring` paints glass-ui's --focus-ring-shadow on :focus-visible … */
.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }
```

`CopyButton.vue:5` carries no `.focus-ring`, no `focus-visible:` utility, and no `outline` handling. It is a focusable control (a native `<button>`) that falls back to the UA ring — so focus is *visible*, but it is the **third** idiom in a repo that declared there would be one, and two of the three live in the same `role="toolbar"` row:

| control | focus idiom | provenance |
|---|---|---|
| CopyButton | UA default ring | `CopyButton.vue:5` (nothing) |
| Apply-CSS button (same toolbar) | `outline-none focus-visible:ring-2 focus-visible:ring-accent` | `KeyframesEditor.vue:88` |
| the declared contract | `.focus-ring` | `design-idioms.css:76`; 4 adopters (`SquareScene.vue:46`, `SpringTarget.vue:63`, `SpringHeatmap.vue:30`, `KeyframeCard.vue:45`) |

Two of the three CopyButton call sites put it inside a roving-tabindex composite (`KeyframesEditor.vue:63–68`, `role="toolbar" aria-label="Keyframe actions"` + `useToolbarKeyboard`), where the focus ring **is** the sole indication of which action is armed — so the inconsistency lands on the highest-traffic keyboard path in the instrument.

Secondary: glass-ui's forced-colors guarantee is class-keyed — `a11y-overrides.css` `@media (forced-colors: active) { .focus-ring:focus-visible, .interactive-item:focus-visible, .dock-icon-button:focus-visible, … { outline: 2px solid Highlight; outline-offset: 2px } }`. CopyButton carries none of those hooks, so in forced-colors it is outside the design system's guaranteed-ring set and rides the UA's mapping instead.

**Falsifier.** Show a global `button:focus-visible` rule in the demo or glass cascade that supplies the contract ring without the class. I grepped every glass `styles/*.css` for element-level `:focus-visible` selectors: the only hits are `.easing-curve` SVG stroke rules and `:user-invalid`/`[aria-invalid]` shadows — none is a bare `button`/`*` selector. Demo-side, `grep -rn "focus-visible" demo/styles/*.css` → `design-idioms.css:73–78` (class-scoped) and `playback-idiom.css:72` (`.btn-playback`). Claim stands.

---

## D-8 — MAJOR · the glass-ui shell is rejected; state is improvised per call site (folds S-7)

`lane-frontend.md §5 S-7` rules this a **partial** shadow: no copy-specific primitive exists in glass-ui, so the copy *logic* stays local, but "the shell should be glass `Button`". The tree agrees and goes further — the component is one of the 21 `.vue` files with **zero** glass-ui imports (`lane-frontend.md §9`), and what it loses by hand-rolling is not styling but **states**:

| state | glass `Button` (installed 7.0.0) | CopyButton |
|---|---|---|
| hover | tokenised | **none in the component**; improvised at 2 of 4 sites (`KeyframesEditor.vue:83` `scale-on-hover`; `EasingTarget.css:76` `:hover { color: var(--foreground) }`) and **absent** at `KeyframeCard.vue:26` and `StartingStyleTarget.vue:59` |
| focus-visible | tokenised ring | UA default (D-7) |
| active/pressed | tokenised | none |
| disabled | `disabled:` variants | none — the button is always enabled (D-12) |
| touch floor | `size="icon"` box | none (D-5, D-6) |

So the same affordance is a scaling icon in the toolbar, a colour-shifting icon in the easing header, and an inert icon in the keyframe card and the spring artifact row. That is four different micro-interactions for one action, which is a design-system failure independent of whether glass ships a `CopyButton`.

Discoverability compounds it: the control has **no visible label and no tooltip**, while `@mkbabb/glass-ui/tooltip` is already consumed at 6 sites (`lane-frontend.md §3.1`) and `TooltipProvider` is mounted app-wide (`App.vue:145`). A bare 16px glyph beside a code literal is the exact case a tooltip exists for, and the infrastructure is already paid for.

**Falsifier.** Show glass 7.0.0 lacks an icon-shaped `Button` (it does not — `Button` is root-barrel exported and consumed at 8+ demo sites), or show a demo-wide rule forbidding glass `Button` in this position. Also falsified if the four hover treatments are intentional per-context variants — but no comment at any of the four sites says so, and `KeyframeCard.vue:26` / `StartingStyleTarget.vue:59` supply no hover at all, which is absence, not variation.

---

## D-9 — MINOR · `fade-out` fades nothing; the "icon swap" is not implemented

**Provenance:** `CopyButton.vue:13–14` (the claim) vs `:82–93` (the implementation)

```
13  <!-- One AT-only status sink: … without a visual change (the icon swap is
14       the sighted feedback). -->
```
```css
82  const clipboardAnim = new CSSKeyframesAnimation(options).fromString(
83      /*css*/ `@keyframes fade-out {
84          0%, 100% { transform: scale(1);    }
88          50%      { transform: scale(1.25); }
```

The animation **named** `fade-out` contains no `opacity` channel at either stop — the two blank lines at `:86` and `:90` are where the property was meant to be. The base `Clipboard` therefore never fades; it stays at full opacity for the whole 200 ms while `ClipboardCheck` pulses in on top of it. There is no swap, only an additive overlay.

Checked whether the overlay is legible anyway, because a false defect is worse than a missed one — and it partly is. The two glyphs are byte-identical apart from one path:

```
clipboard.mjs        rect(8,4,x8,y2) + path "M16 4h2a2 2 0 0 1 2 2v14…"
clipboard-check.mjs  rect(8,4,x8,y2) + path "M16 4h2a2 2 0 0 1 2 2v14…" + path "m9 14 2 2 4-4"
```

Both fill the same absolutely-positioned box (`:105–112`) with the same `viewBox="0 0 24 24"`, so the boards register **exactly**; the visible delta is only the check mark appearing. So the intended effect would read acceptably even unfixed — the defect is that the comment describes a mechanism (`swap`) the code does not contain, the keyframe's name describes a channel it does not animate, and the resulting double-drawn stroke is dead paint. Prose and tree disagree, and the prose is load-bearing: it is the stated justification for the live region being AT-only (`:13–15`, `:33–34`).

**Falsifier.** Point to an `opacity` declaration in the `fade-out` block, or to a `.clipboard` rule that fades the base glyph — `:104–113` is the complete scoped stylesheet and contains five declarations, none of them `opacity`. Or show the two glyph paths differ enough that "swap" is the right word — refuted by the exact-match above.

---

## D-10 — MINOR · the confirmation has no persistence, and `isCopied` renders nothing

Even with D-1 repaired, the total confirmation window is `duration: 200` ms with peak visibility at the 50 % stop (`:75–78`), after which the check returns to `opacity: 0` and every trace is gone. The established idiom for a copy affordance holds the confirmed state ~1–2 s, precisely because the user's eyes are usually on the *copied text*, not on the button.

The component has the state to do this and does not use it: `isCopied` (`:32`) is bound to nothing but `aria-label`. One `:class="{ 'is-copied': isCopied }"` and a reset would give the sighted channel the persistence the AT channel already has. As shipped the lifetimes are inverted — visual 0 ms (D-1) / 200 ms (repaired), accessible ∞ (D-2).

Secondary, and honestly small: `bounceInEase` was reaching for a bounce curve, and a bounce ease applied to an **opacity** channel (`:73–78`, opacity 0→1→0) oscillates the alpha rather than the geometry — a flicker where a pulse was intended. Bounce belongs on `transform`. This is **not** a WCAG 2.3.1 flash claim: the area is ~24px and the window ~200ms, far under the three-flashes-per-second/large-area threshold. I raise it only as motion-design intent.

**Falsifier.** Show a hold — a `setTimeout`, a `fillMode: "forwards"` with a visible terminal frame (the terminal frame is `opacity: 0`, `:71–74`), or a class binding on `isCopied`. `grep -n "isCopied" CopyButton.vue` → `4, 32, 54`.

---

## D-11 — MINOR · decorative glyphs carry no `aria-hidden`, against the demo's own idiom

`CopyButton.vue:8–12` renders two `<svg>` elements with no `aria-hidden`, no `role`, no `focusable="false"`. Lucide supplies none by default — `node_modules/@lucide/vue/dist/esm/defaultAttributes.mjs` is `{xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin}`.

The accessible **name** is safe (`aria-label` on the button wins the name computation outright), which is why this is MINOR and not MAJOR. What is lost is idiom conformance and AT quiet: the demo established the pattern eight lines from one of the call sites, with a comment explaining it — `KeyframesEditor.vue:71–73`:

```
<!-- Decorative lead flourish — was a focusable no-op trigger; now
     a pure indicator (aria-hidden), excluded from the roving set. -->
<WandSparkles aria-hidden="true" class="shrink-0 opacity-70" />
```

**Falsifier.** Show that the svgs are already hidden from AT — they are not, per `defaultAttributes.mjs` and the `Icon.mjs` render (`h("svg", {...defaultAttributes, ...props, …})`, no aria keys). Or show the button's name is polluted by them — it is not; `aria-label` overrides content. Claim is scoped to idiom + AT-tree noise only.

---

## D-12 — MINOR · no empty-`text` guard; an empty copy announces success

`text` is a required `string` (`:27–30`) with no emptiness check anywhere in `handleClick` (`:51–63`). One call site routinely passes a possibly-empty expression — `StartingStyleTarget.vue:59`, `:text="compiledEntryCss || copyableCss"` — where both operands are derived and can be empty before the spring compiles. Clicking then writes `""` to the clipboard and announces "Copied to clipboard".

The design-axis reading is the **empty state**: the component recognises exactly one state (optimistic success) and therefore cannot render *nothing-to-copy*. The correct affordance is `disabled` on empty (`:disabled="!text"`), which also earns a disabled visual — which the bespoke shell does not have (D-8).

**Falsifier.** Show a guard, or show `text` is non-empty at every call site by construction. `KeyframesEditor.vue:84` `:text="cssKeyframesString"` and `KeyframeCard.vue:26` `:text="frameString"` are also derived strings with no non-empty proof at the binding.

---

## D-13 — MINOR · the colour duel: exactly one of two declarations is dead

`CopyButton.vue:5` hard-codes `text-foreground` on the root. `EasingTarget.css:68–77` sets `color: var(--muted-foreground)` on the same element via `.literal-copy`, plus a `:hover` to `--foreground`. Both are single-class selectors (specificity 0,1,0), so **cascade layer order alone** decides — Tailwind v4 emits its utilities inside `@layer utilities` (`style.css:1`, `@import "tailwindcss"`), and `EasingTarget.css` arrives unlayered through `<style scoped src="./EasingTarget.css">` (`EasingTarget.vue:335`); unlayered declarations outrank layered ones, so the consumer should win — and `text-foreground` is dead there.

Either way the defect is proven: two authors specify the same property on the same element from two files, and one of them is writing into the void. If the consumer wins, the component's colour choice is a lie at that site; if the component wins, the consumer's deliberate quiet-register intent (and its `:hover`) silently does nothing.

Compounding it, `--muted-foreground` is **context-rebound five ways** in the installed glass cascade:

```
$ grep -rho "\-\-muted-foreground: *[^;]*;" node_modules/@mkbabb/glass-ui/dist/styles/ | sort -u
--muted-foreground: contrast-color(var(--card));
--muted-foreground: var(--foreground);
--muted-foreground: var(--neutral-5);
--muted-foreground: var(--on-glass-muted);
--muted-foreground: var(--on-glass-muted-strong);
```

so the icon's stroke colour depends on which glass surface it lands on. A **WCAG 1.4.11 (Non-text Contrast, 3:1)** ratio for the glyph is therefore **not decidable from tokens** — the value is resolved by ancestry, not by declaration. Marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit: read the computed `color` of `.literal-copy` and of the `KeyframeCard` instance against their actual backdrops, light and dark, and check ≥ 3:1. This is the one contrast question on this component and I decline to invent a number for it.

**Falsifier.** A computed-style read showing one of the two declarations applied. Whichever it is, the other is dead — the claim survives both outcomes; only its direction is open.

---

## D-14 — INFO · physical insets where `inset: 0` says it once (RTL checked, clean)

`CopyButton.vue:105–112` spends five declarations (`bottom/left/height/width/position`) on what `position:absolute; inset:0` states in two. I checked RTL specifically rather than asserting it: `left: 0` + `width: 100%` fills the containing block on both axes regardless of writing direction, and neither glyph nor the sr-only span is direction-sensitive, so **there is no RTL rendering bug here** — the point is idiom only, and I am recording the clean result as explicitly as the defect.

Related and equally small: `scale(1.25)` on a box that exactly fills its parent overflows it by 12.5 % per side. I checked whether any host clips it and found the nearest risk is safe: `KeyframesEditor.vue:68` is `h-10 … p-1 overflow-x-scroll` (content box 32px) around a 24px button scaled to 30px — 1px of slack per side. **No clipping claim is made**; the overflow is noted only as an unstated dependency on host padding.

**Falsifier.** For the RTL half — none needed; it is a negative result. For the overflow half — a host with tighter padding or `overflow: hidden` would clip; none of the four current hosts does.

---

## D-15 — INFO · forced-colors: the design system's contrast layer cannot see this component

`glass-ui/dist/styles/accessibility.css` implements both `@media (prefers-contrast: more)` and `@media (forced-colors: active)` by keying on **state attributes**: `[aria-current]`, `[aria-selected="true"]`, `[aria-pressed="true"]`, `[aria-checked="true"]`, `[data-state="checked"]`, `[data-state="on"]`, `[aria-invalid="true"]`. CopyButton emits none of them (`:2–7`), so both blocks are inert here.

I am **not** claiming the component should carry `aria-pressed` — a copy action is not a toggle, and forcing it would be a worse defect than the one it fixes. The honest finding is narrower: because the component's only confirmation channel is a transient opacity pulse of a glyph that is byte-identical to its resting glyph plus one stroke (D-9), forced-colors mode collapses both layers to the same system colour and the confirmation is carried entirely by that one check-mark path, over-painted on an identical board. It works, thinly, by accident rather than by design, and no `@media (forced-colors: active)` block anywhere in the component or its consumers considers the case.

**Falsifier.** Show a forced-colors rule that reaches this button (grepped: glass's forced-colors focus rule is class-keyed and CopyButton carries none of those classes; the demo's own CSS has zero `forced-colors` blocks — `grep -rn "forced-colors" demo/` → no output).

---

## D-16 — INFO · the rAF re-arm has two small edges

**Provenance:** `CopyButton.vue:57–60`

1. **Hidden-tab stall.** `requestAnimationFrame` is throttled or suspended in a background/hidden tab, so a copy triggered while the document is hidden (a keyboard shortcut path, or a copy fired by an automation) sets `liveStatus` to `""` and never restores it — the announcement is silently dropped. A microtask (`nextTick`) or a `setTimeout(…, 0)` has no such dependence on paint.
2. **Possible double announcement.** The live region lives *inside* the button (`:15`), and the button's `aria-label` mutates in the same tick (`:4`, `:54`). Some AT announce an accessible-name change on a focused control **and** the polite live update — the same sentence twice. Keyboard users (who are focused on the button when they activate it) are the affected population; mouse users typically are not.

Both are marked INFO because the mechanism is otherwise right (see SUP-1) and the failure modes are conditional. Rapid double-clicks were checked and are **fine**: two clicks within one frame schedule two callbacks, the first transitions `"" → "Copied to clipboard"` (announces) and the second is a no-op write of the same value — one announcement for two clicks, which is the desirable behaviour.

**Falsifier.** (1) is killed if the demo never copies from a hidden document — plausible but unprovable from source; hence INFO. (2) is **UNPROVEN-NEEDS-LIVE**: NVDA/VoiceOver testing showing a single announcement kills it outright.

---

## Superlatives (L-18, running the other way)

### SUP-1 — the live-region **re-arm** is genuinely correct, and rare

**Provenance:** `CopyButton.vue:13–15`, `:33–35`, `:55–60`

```ts
liveStatus.value = "";
requestAnimationFrame(() => { liveStatus.value = "Copied to clipboard"; });
```

A polite live region does not re-announce when its text is rewritten to the *same* string — the single most common defect in copy-button implementations, and the reason "copy, copy again, hear nothing" is a familiar AT complaint. This component knows that, clears the node first so the second write is a genuine mutation, and **says why in the comment** (`:33–34`). It also correctly keeps the region AT-only rather than duplicating a visual it already has, and correctly scopes it to `role="status" aria-live="polite"` rather than `alert`/`assertive` for a non-urgent confirmation.

Note the irony without softening the praise: the mechanism is right even though the premise cited beside it ("the icon swap is the sighted feedback") is false (D-9) and the swap itself never runs (D-1). The accessible channel is the only part of this component that works, and it works because someone thought about it carefully.

**Falsifier (superlatives run both ways).** If Vue's flush ordering meant the `""` never reached the DOM before the rAF write, the re-arm would be theatre. It does reach: reactivity flushes on the microtask queue, which drains before the next animation frame, so the empty string is committed first. Also falsified if a simpler `key`-based remount would be idiomatic here — it would not; remounting a live region is the anti-pattern this avoids.

### SUP-2 — the lazy-engine boundary is honest about its own race

**Provenance:** `CopyButton.vue:45–49`, `:62`, `:65–67`

```ts
// The copy-feedback group is HEAVY (CSSKeyframesAnimation/AnimationGroup), so it
// is constructed through loadAnimationEngine() at mount rather than a deep @src
// import. The engine resolves within microtasks of mount — well before a user
// can click — and `group` is null-guarded until it is in hand.
const group = shallowRef<AnimationGroup<any> | null>(null);
…
void group.value?.play();
```

Three correct decisions in four lines: the heavy surface rides the documented `loadAnimationEngine()` seam instead of a deep `@src` import (keeping it out of the initial chunk); `shallowRef` is the right container for a non-reactive engine object; and the optional-call guard means the pre-resolution click degrades to nothing rather than throwing. The comment states the race *and* the reason it is acceptable rather than pretending there isn't one. This is exactly the posture the rest of this challenge is asking for elsewhere — and it is what makes D-1 survivable rather than a white screen.

**Falsifier.** If `loadAnimationEngine` were synchronous or already resolved at this point, the ceremony would be over-engineering. It is not — `src/animation/load-engine.ts:123` is `(): Promise<AnimationEngine> => import("./engine")`. Also falsified if `shallowRef` broke reactivity for a consumer — nothing reads `group` reactively; `:62` is an imperative read.

### SUP-3 — the label API has the right shape, and one call site proves the need

**Provenance:** `CopyButton.vue:27–30` + `EasingTarget.vue:35–39`

```ts
const { text, label = "Copy to clipboard" } = defineProps<{ text: string; label?: string }>();
```

An overridable accessible name with a sensible default is the correct API for a repeated icon-only control: four identically-named "Copy to clipboard" buttons on one page is a real navigation problem for AT users, and the prop is the fix. `EasingTarget.vue:38` actually exercises it (`label="Copy easing literal"`) rather than leaving the affordance theoretical. Vue 3.5 reactive-props destructure with a default is the current idiom, correctly used.

The shape deserves the credit even though D-2 destroys the value after one click — the API is right and the state machine behind it is wrong, which is the easier of the two problems to have.

**Falsifier.** If three of four sites had passed a label and only one had not, this would be an inconsistency finding rather than a superlative. The distribution is the reverse: the default carries three sites where the context already disambiguates (inside a keyframe card, inside a labelled toolbar, beside a labelled artifact row), and the override is spent on the one site where it does not.

---

## Repair order (design axis only; no code written)

1. **D-1** — `timingFunction: "easeInBounce"` (the real registry name; `easing-registry.ts:28`) or a `cubic-bezier()` literal, **and** a `try/catch` around the `onMounted` body so a future name typo degrades instead of killing the group. Land **D-4** (`respectReducedMotion: true` on both animations and the group) in the same change — the moment D-1 works, the PRM gap goes live.
2. **D-2 + D-10 + D-3** — one state machine: `idle | copied | failed`, `await copyText(...)` in a `try/catch`, a ~1.2 s reset, `isCopied` bound to a visual class, `ClipboardX` on failure with the live region announcing the truth.
3. **D-9** — give `fade-out` its `opacity` channel or rename it; reconcile the `:13–14` comment with whichever the implementation becomes.
4. **D-5 + D-6 + D-8** — take the glass `Button` shell (S-7's ruling), size it from the `icon-*` family with a real default, and let the four call sites stop inventing geometry. This retires the hover/focus/disabled improvisation with it.
5. **D-7 + D-11 + D-12** — `.focus-ring` on the root, `aria-hidden="true"` on both glyphs, `:disabled="!text"`.
6. **D-13** — decide who owns the colour; delete the loser. Feed the ratio question to the SS-13 live visual audit.

## Provenance note

Every claim above is sourced from `/Users/mkbabb/Programming/keyframes.js` (working tree, `demo/components/CopyButton.vue` last touched at `969990f6`) and from its **installed** `node_modules` — the same copies the demo builds against, so no upgrade is presupposed by any finding. Nothing in keyframes.js, glass-ui, or value.js was written, mutated, installed, or served. The only writes in this task are to this file.
