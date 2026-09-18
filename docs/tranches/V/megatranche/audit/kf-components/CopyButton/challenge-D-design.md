claude-opus-5[1m]

# CHALLENGE · `CopyButton.vue` · axis **D — DESIGN**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/CopyButton.vue` (113 lines)
**Mode:** static, read-only. No writes to any product tree; no dev server, no browser, no installs. Three read-only `node --input-type=module` probes of the **installed** `@mkbabb/value.js@4.0.0` dist were run to settle a name-resolution question; they import and print, and mutate nothing.
**Posture:** DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier. **Three candidate defects were killed by their own falsifiers during verification and are recorded in §7 rather than filed** — including one that would have made this challenge's headline claim materially wrong.
**Corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` — **S-7** (CopyButton → glass `Button`, "partial shadow"), **F-1** (glass-ui phantom dep), **§6.3** (98 unprefixed tokens / 0 `--kf-*`), **§6.4** (the two runtime-JS `@keyframes` strings), **§6.5** (13 PRM enforcement sites — CopyButton is not one). §6 below **contradicts** §6.4's stated mechanism.

## Files read whole

| file | why |
|---|---|
| `demo/components/CopyButton.vue` | the target |
| `demo/utils/clipboard.ts` | its only non-vendor import (`copyText`) |
| `node_modules/@lucide/vue/dist/esm/{createLucideIcon,Icon,defaultAttributes}.mjs` + `shared/src/utils/mergeClasses.mjs` | the two glyphs' component shape — decides the class-merge and template-ref questions (§7) |
| `src/animation/engine/option-setters.ts:32-36,145-156`, `engine/options.ts:41-47`, `compile/easing/easing-option.ts:18-64`, `compile/easing/easing-registry.ts:18-34,120-135` | the `timingFunction` resolution path — **D-1** |
| `src/animation/constants/defaults.ts:82,84`, `constants/types.ts:146-152,201`, `group/group.ts:50-57` | `iterationCount` / `fillMode` / `respectReducedMotion` contracts — **D-6, D-10** |
| `src/animation/engine/css/css-animation.ts:169-200`, `waapi/eligibility.ts:160-180`, `easing.ts:44` | what `fromString` actually does (§6); why the curve could never reach the compositor |
| `src/animation/load-engine.ts:114-129`, `demo/kf-engine.ts`, `demo/app/main.ts:30,50-52` | the resolve timing the comment at `:45-48` asserts |
| `demo/styles/design-idioms.css:30-135` | the demo's own `.focus-ring` / `.tap-floor` / `icon-*` / `--scale-hover` idioms |
| `glass-ui/dist/styles/tokens/{color-radius,dark-arm}.css`, `utilities/base.css`, `accessibility.css`, `components.css` | token values for the computed contrast table (**S+2**); global focus & forced-colors resets |
| `node_modules/tailwindcss/{index,preflight}.css` | the cascade-layer order (**D-12**) and which root utilities are no-ops (**D-14**) |
| all 4 call sites — `EasingTarget.vue:35-39` + `EasingTarget.css:55-79`, `StartingStyleTarget.vue:59`, `KeyframesEditor.vue:82-84`, `KeyframeCard.vue:26` | the sizing / colour / hover contract |
| `demo/components/instrument/shell/SharePopover.vue` | **the in-tree reference implementation of the same affordance** — **D-9** |

**Tally: 19 defects · 2 BLOCKER · 7 MAJOR · 8 MINOR · 2 INFO · 3 superlatives.** (`defects` counts every severity-bearing row, blockers included.)

---

## 0. Headline

The component ships **two feedback channels with exactly inverted lifetimes, and one of them is dead code.**

- **Sighted feedback lasts 0 ms — permanently.** The options bag names a timing function, `"bounceInEase"`, that is not a member of the engine's closed easing registry. The resolver's own contract is *"unresolvable input throws; there is no silent fallback"*. The throw lands on the first statement after the `await` inside `onMounted`, so `group` is never assigned and `group.value?.play()` is a no-op at every click, at all four call sites, forever. Clicking the copy button changes **nothing** on screen (**D-1, BLOCKER**).
- **Accessible feedback lasts forever.** `isCopied` is set at `:54` and reset nowhere in the file, so the button's accessible name latches to the past-tense `"Copied to clipboard"` for the life of the mount, destroying both the actionable name and the per-instance `label` prop (**D-2, BLOCKER**).

And a compounding fact that matters for the repair: **fixing D-1 alone would not produce a copy confirmation.** Both keyframe strings return to their 0 % values at 100 %, and the engine defaults are `iterationCount: 1` / `fillMode: "forwards"` — so the terminal frame is byte-identical to the pre-click frame. The "icon swap" that two comments promise is not merely broken; it was never written (**D-10**).

Everything below the blockers is downstream of one structural choice: **CopyButton hand-rolls a shell that this same demo already builds correctly 30 lines away.** `SharePopover.vue:31-39` is the identical clipboard affordance as a glass-ui `<Button size="sm" emphasis="quiet" class="h-8 w-8 p-0">` wrapping `<Clipboard class="icon-md" />` with a `title` — a 32 px target, a 20 px glyph, the house focus ring, hover/active, and a visible tooltip, all free (**D-9**).

| id | severity | one-line |
|---|---|---|
| D-1 | **BLOCKER** | `timingFunction: "bounceInEase"` is not a resolvable name → ctor throws in `onMounted` → `group` stays `null` → zero sighted feedback at all 4 call sites, permanently |
| D-2 | **BLOCKER** | `isCopied` never resets → the accessible name is permanently "Copied to clipboard"; the `label` prop is destroyed after the first click |
| D-3 | MAJOR | a failed copy is announced as a success — unawaited, uncaught promise; state set unconditionally |
| D-4 | MAJOR | no intrinsic box — collapses to 0×0 unless every consumer sizes it; **confessed in consumer CSS** |
| D-5 | MAJOR | 16×16 CSS-px targets at 2 of 4 sites; the demo's own `.tap-floor` has 1 adopter and it isn't this |
| D-6 | MAJOR | `prefers-reduced-motion` honoured by neither gate — engine opt-in unset, and CSS cannot reach rAF inline writes |
| D-7 | MAJOR | opts out of the demo's declared **single** `:focus-visible` contract; a third focus idiom sits in the same toolbar row |
| D-8 | MAJOR | no hover/active/disabled — hover is improvised per call site in three different dialects, absent at two |
| D-9 | MAJOR | bespoke shell where the demo's own correct implementation of the same affordance ships in a sibling file (sharpens **S-7**) |
| D-10 | MINOR | even with D-1 fixed there is no swap: `fillMode:forwards` + `iterationCount:1` land on a frame identical to the start; `fade-out` fades nothing |
| D-11 | MINOR | decorative glyphs carry no `aria-hidden`, against a 27-site demo idiom |
| D-12 | MINOR | colour duel — `text-foreground` is dead at 2 of 4 sites by cascade-layer order; exactly one declaration wins per site |
| D-13 | MINOR | no empty-`text` guard — copying `""` clobbers the clipboard and announces success |
| D-14 | MINOR | 4 of the 8 root utilities are no-ops against Tailwind preflight |
| D-15 | MINOR | no `onUnmounted` teardown of the group or its DOM targets |
| D-16 | MINOR | two compile-time-constant keyframe strings re-parsed through the full grammar per instance |
| D-17 | MINOR | icon-only with no visible label or tooltip — and, per D-1/D-2, no post-click confirmation either |
| D-18 | INFO | physical `bottom`/`left` where `inset: 0` says it once (RTL behaviour checked — clean) |
| D-19 | INFO | forced-colors: glass's contrast layer keys on state attributes this component never emits |
| S+1..3 | **superlative** | the live-region sink's construction order · contrast computed clean in all 4 theme × path combos · zero token footprint |

---

## 1. BLOCKERS

### D-1 — the motion is dead: `bounceInEase` is not a registry curve · **BLOCKER**

**Provenance:** `CopyButton.vue:40-43`

```ts
const options: Partial<InputAnimationOptions> = {
    duration: 200,
    timingFunction: "bounceInEase",
};
```

That bag is handed to `new CSSKeyframesAnimation(options)` twice (`:69`, `:82`). The construction path is unconditional and fail-explicit:

- `engine/option-setters.ts:145-156` — `applyOptions` calls `applyTimingFunction` **first**, before duration/fill/anything else.
- `engine/option-setters.ts:32-36` — `anim.options.timingFunction = normalizeTimingFunction(timingFunction)`.
- `engine/options.ts:41-47` — non-null input → `resolveEasingOption("timingFunction", timingFunction)`.
- `compile/easing/easing-option.ts:18-21` — the module's own docblock: *"Fail-explicit: unresolvable input **throws**; there is **no silent fallback** to a default curve."* `:44-57` catches the inner `TypeError` and rethrows it as `AnimationOptionError(…, "UNKNOWN_TIMING_FN")`.
- `compile/easing/easing-registry.ts:120-135` — `resolveTimingFunction`: try `parseTimingFunction` (a CSS literal), else the registry `Map`, else `throw new TypeError('Unknown timing function "…"')`.

The registry's membership is **closed and enumerable** (`easing-registry.ts:18-34`): `Object.keys(bezierPresets)` ∪ `"ease-in-bounce"` ∪ `DIRECT_NAMES`. Probed against the installed dist the demo actually loads:

```
$ node --input-type=module -e 'import {bezierPresets,easing} from "./easing.js"; …'
   (cwd: node_modules/@mkbabb/value.js/dist/subpaths)
bezierPresets keys: linear, ease, ease-in, ease-out, ease-in-out, smooth-step-3,
  ease-in-sine … ease-in-back, ease-out-back, ease-in-out-back      (30, all kebab-case)
bounceInEase   -> FAIL {"code":"easing_name_unknown"}
easeInBounce   -> OK
ease-in-bounce -> OK
easeOutCubic   -> OK

$ node --input-type=module -e 'import {parseTimingFunction} from "./css.js"; …'
parseTimingFunction("bounceInEase") -> {"ok":false,"diagnostics":[{"code":"css_syntax",
  "start":0,"end":12,"expected":["timing function"],"actual":"bounceInEase"}]}
```

`DIRECT_NAMES` (`easing-registry.ts:18-28`) contains **`easeInBounce`** — not `bounceInEase`. The name at `:42` is a transposition of a real curve. Both resolution arms therefore miss: the CSS-literal parse fails, and the `Map` lookup returns `undefined`.

It is a repo-wide phantom, and the tree's own prose vouches for it falsely — `src/animation/easing.ts:44` and `src/animation/waapi/eligibility.ts:169` both name `bounceInEase` in comments as though it were a real bespoke curve. `CopyButton.vue:42` is the only place in the repo where the name is ever **executed**.

**Consequence, deduced not run.** `new CSSKeyframesAnimation(options)` at `:69` throws inside the `async` `onMounted` body (`:65-102`), which has no `try`/`catch`. The returned promise rejects (an unhandled rejection at every mount of every CopyButton); lines `:82-101` never run; `group` (`:49`) is never assigned; `void group.value?.play()` (`:62`) is a permanent no-op; `clipboardChecked` keeps its static `opacity-0` (`:10`) forever. Combined with D-2 (`isCopied` renders nothing but an `aria-label`) and the absence of any `:hover`/`:active`/background/border (`:5`):

> **Clicking the copy button produces no visible change of any kind, at any of the four call sites** — `EasingTarget.vue:35`, `StartingStyleTarget.vue:59`, `KeyframesEditor.vue:82`, `KeyframeCard.vue:26`.

The component is **accessible-only**: a screen-reader user is told the copy happened; a sighted user is told nothing.

**Falsifier.** Any one of these kills the claim: (a) `"bounceInEase"` resolves — refuted twice above against the installed dist; (b) the demo resolves `@mkbabb/keyframes.js` to a different build carrying a legacy alias — refuted by `vite.config.ts:38-42`, the self-alias onto `src/animation/index.ts`, the exact tree cited (`lane-frontend.md §8`); (c) the throw is caught upstream and a fallback group installed — there is no `catch`, no `errorCaptured` in the parent chain, and `group` is assigned only at `:101`; (d) `defaultOptions` shadows the ctor value so the bad name is never resolved — refuted by the ctor spread order `{...defaultOptions, ...this._ctorOptions}` (ctor last) feeding `applyOptions`. **UNPROVEN-NEEDS-LIVE only for the console string** (`AnimationOptionError: UNKNOWN_TIMING_FN`) — the resolution failure itself is proven statically. One click in any scene with the console open settles it.

---

### D-2 — the accessible name is permanently wrong after one click · **BLOCKER**

**Provenance:** `CopyButton.vue:4`, `:32`, `:54`

```html
:aria-label="isCopied ? 'Copied to clipboard' : label"
```

`isCopied` is declared at `:32`, set `true` at `:54`, and **assigned nowhere else** — no timer, no `watch`, no animation completion hook, no reset. Consequences, all decidable from source:

1. After the first click the accessible name is permanently `"Copied to clipboard"` — a **past-tense state description occupying the name slot of an actionable control**. WCAG 4.1.2 requires the name to identify the control; 2.4.6/2.5.3 expect it to describe the action. A user who tabs back later hears a control named after something that already happened.
2. **The `label` prop is destroyed.** `EasingTarget.vue:38` passes `label="Copy easing literal"` — the prop's entire differentiating value is spent on the first click, after which that button is indistinguishable from the three unlabeled ones.
3. It inverts against **D-1**: the name says "Copied" while the pixels say nothing at all, forever, in opposite directions.

The two ternary branches differ by a single tense (`"Copy to clipboard"` default at `:27-30` vs `"Copied to clipboard"`), which is exactly what makes this read as a latched state rather than a designed one. `isCopied` is also the component's *only* state variable and it drives **no visual whatsoever** — with D-1 dead, it is a boolean whose sole observable effect is corrupting an accessible name.

**Falsifier.** Show a reset of `isCopied` anywhere; or a consumer that remounts the button per copy (all four sites are stable — `v-for` keyed on frame identity at `KeyframeCard`, static elsewhere); or an AT behaviour in which a changed `aria-label` is never re-read on subsequent focus. Any kills or downgrades the row.

---

## 2. MAJOR

### D-3 — a failed copy is animated and announced as a success · MAJOR

`:52` — `copyText(text);` — no `await`, no `.catch()`, no `void`. `demo/utils/clipboard.ts:4` is `await navigator.clipboard.writeText(text)`, which rejects on `NotAllowedError` (document not focused, permission denied, Safari's gesture-proximity heuristics). On rejection the promise is **unhandled**, and `:54-62` run unconditionally regardless: `isCopied` flips, the live region announces `"Copied to clipboard"`, the (dead) pulse is requested.

The component has **no error state and no error surface**. `copyText` even accepts an optional `successMessage` toast (`clipboard.ts:3`) that CopyButton declines to pass, so there is no fallback channel either. A blind user is told the copy succeeded when it did not.

**Falsifier.** Show `navigator.clipboard.writeText` cannot reject in any targeted environment. I explicitly **do not** claim the insecure-context path: `grep -n "server" vite.config.ts` → no `server` block, so keyframes.js has no LAN-http workflow analogous to value.js's `server.host: true`, and gh-pages is https. The row rests on the rejection path only.

### D-4 — no intrinsic box: a shared primitive that cannot render itself · MAJOR

The root is `relative inline-block p-0` (`:5`). Its only children are two **absolutely positioned** icons (`:105-112`) and an `sr-only` span — also `position: absolute` (`glass-ui/dist/styles/components.css`: `.sr-only{…width:1px;height:1px;position:absolute…}`). **Nothing is in flow.** An inline-block with no in-flow content shrink-to-fits to 0 × 0: invisible and unclickable unless every consumer supplies a box.

The tree confesses this in a consumer's own CSS — `EasingTarget.css:68-74`:

```css
.literal-copy {
    /* CopyButton's icons are absolutely-positioned at 100% — the button needs
       an intrinsic box here (the sidebar mount sizes it externally). */
    width: 1rem;
    height: 1rem;
```

A shared component whose consumers must write a comment explaining why they are patching it is a fragment, not a component. All four sites carry sizing, each in a different dialect — `w-6 h-6 scale-on-hover`, `h-6 w-6`, `shrink-0 w-4 h-4`, a CSS class. A fifth consumer that forgets ships a zero-pixel button and nothing catches it.

The Aristotelian failure is structural: fusing the glyph box to the target box makes the **mean unreachable**. The component can express "24 px glyph in a 24 px target" or "16 px in 16 px", never "16 px glyph in a 32 px target" — which is the correct proportion, and exactly what `SharePopover.vue:34-38` achieves (`h-8 w-8 p-0` + `icon-md`).

**Falsifier.** Produce a rule granting the root an intrinsic box — a `:where()` default, an `@utility`, an inherited size. `grep -rn "CopyButton" demo/ --include="*.css"` → no hits; the scoped block (`:104-113`) styles only `.clipboard`.

### D-5 — 16 px pointer targets at half the call sites; `.tap-floor` unused · MAJOR

| call site | box | glyph |
|---|---|---|
| `KeyframesEditor.vue:83` | 24 px (`w-6 h-6`) | 24 px |
| `KeyframeCard.vue:26` | 24 px (`h-6 w-6`) | 24 px |
| `StartingStyleTarget.vue:59` | **16 px** (`w-4 h-4`) | 16 px |
| `EasingTarget.css:70-71` | **16 px** (`1rem`) | 16 px |

`design-idioms.css:81-85` defines the demo's own floor and names the criterion — `/* .tap-floor — the WCAG 2.5.5 44px minimum touch-target floor (box only). */`. `grep -rn "tap-floor" demo/` → **2** occurrences: the definition and a single adopter. CopyButton is not it. Against WCAG 2.2 **2.5.8 Target Size (Minimum)** (AA, 24 × 24 CSS px) the two 16 px sites fail on their own dimensions; the two 24 px sites clear it by exactly zero margin.

**Honest qualification, which is why this is MAJOR and not BLOCKER:** 2.5.8's *spacing* exception rescues an undersized target when a 24 px circle centred on it intersects no other target's circle. At `EasingTarget` the neighbour across `gap: 0.45rem` (`EasingTarget.css:60`) is a `<code>` — not a target; at `StartingStyleTarget` the neighbour across `justify-between` is a `<span>` label — not a target. **Both 16 px sites are plausibly conformant by exception.** The row stands as a design-quality claim: a 16 px copy target on touch, adjacent to selectable code text, is a poor affordance whichever exception saves it — and the demo's in-tree practice (`SharePopover.vue:34`, 32 px) and in-tree utility (`.tap-floor`, 44 px) both agree.

**Falsifier.** A `min-width`/`min-height` or padding source lifting these above 24 px; or a project ruling that 16 px is the accepted icon-affordance size (the existence of `.tap-floor` argues the opposite).

### D-6 — `prefers-reduced-motion` honoured by neither available gate · MAJOR

The library ships exactly one PRM lever and it is **opt-in**:

- `constants/types.ts:146-152` — *"When true, honor `prefers-reduced-motion: reduce` by snapping … **Default false (consumers opt in).**"*
- `constants/types.ts:201`, `group/group.ts:55-57` — `respectReducedMotion = false;`

CopyButton sets it on neither surface: `options` (`:40-43`) is `{ duration, timingFunction }`; the group (`:95-96`) sets only `g.singleTarget = false`. Nor is the motion reachable from CSS — it is driven by per-frame **inline styles** (§6), so no `@media (prefers-reduced-motion: reduce)` block anywhere in the cascade can suppress it. Both gates are open.

The component is correctly absent from the 13 PRM enforcement sites enumerated in **`lane-frontend.md:462-489`** — this row explains why that absence is a defect rather than an omission in the census.

**Stated honestly:** with **D-1** live, no motion actually plays, so the *observable* PRM behaviour today is accidentally correct. This row is filed because the repair of D-1 immediately un-guards a `scale(1) → 1.25 → 1` pulse on the rAF path. The fix is one token — `respectReducedMotion: true` in `options` — with **zero visual regression**, because the PRM snap targets the final frame and the final frame is the resting frame (D-10).

**Falsifier.** Find a global PRM forcing switch overriding the per-animation default (`grep -rn "prefers-reduced-motion" src/` → 20 sites, all documenting the opt-in or unrelated subsystems; none global), or a demo-level wrapper setting the flag on every animation.

### D-7 — opts out of the demo's declared single focus contract · MAJOR

`design-idioms.css:73-79`:

```css
/* The demo-owned :focus-visible contract — the SINGLE keyboard-focus affordance:
   `.focus-ring` paints glass-ui's --focus-ring-shadow on :focus-visible … */
.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }
```

`grep -rn "focus-ring" demo/` → **11** sites. CopyButton's class list (`:5`) has no `focus-ring`, no `focus-visible:*` utility, and no `:focus-visible` rule in its scoped block. glass-ui ships the same class independently (`dist/styles/utilities/base.css`), so the contract is doubly available and doubly declined.

This is **not** a "no focus indicator" claim — I checked for global suppression and found none: `grep -o "outline: *none"` over glass-ui's base/accessibility CSS returns 3 hits, all scoped (`.popover-content`, `.focus-ring:focus-visible`, `.interactive-item:focus-visible`), and Tailwind preflight does not reset `outline`. The UA default `:focus-visible` ring survives. The defect is **conformance and legibility**: a browser-default hairline ring around a transparent 16 px box, in a suite where 11 controls paint the house ring.

Sharper: the sibling control in the *same toolbar row*, `KeyframesEditor.vue:88-94`, hand-rolls a third dialect — `focus-visible:ring-2 focus-visible:ring-accent`. Three focus languages in one strip. *(Aside, relayed not filed: `--accent` = `--neutral-3` = `hsl(33 30% 82%)`, relative luminance **0.6595**, giving **1.37:1** against `--card` (0.9222) — that bespoke ring is itself a failing indicator under WCAG 1.4.11/2.4.11. `.focus-ring` is the right answer for both controls, since `--focus-ring-color` is `hsl(24 10% 10%)` = `--foreground`.)*

**Falsifier.** A `:where(button)` or reset-layer rule granting the house ring to bare buttons; or a ruling that the UA ring is the accepted default.

### D-8 — no hover/active state; three dialects across four consumers · MAJOR

The component defines **no** `:hover`, `:active`, `:disabled`, or transition — the scoped block (`:104-113`) sets position and size only; the class list carries `cursor-pointer` and nothing else. The demo owns an idiom for exactly this: `--scale-hover: 1.08` (`design-idioms.css:40-41`, *"mirrors glass-ui's `--scale-hover`"*) driving `.scale-on-hover`, at **13** `.vue` sites.

| site | hover |
|---|---|
| `KeyframesEditor.vue:83` | `scale-on-hover` |
| `EasingTarget.css:76-78` | `:hover { color: var(--foreground) }` — a **second**, colour-based dialect |
| `KeyframeCard.vue:26` | **none** |
| `StartingStyleTarget.vue:59` | **none** |

One shared control, two hover behaviours plus absence, split evenly. Half the mounts give a mouse user no pre-click affordance beyond the cursor — and per **D-1** no post-click one either. A primitive that delegates its own interaction language to its call sites, and whose call sites then disagree, has failed as a primitive.

**Falsifier.** A global `button:hover` rule in the demo or glass cascade supplying a default lift. `grep -rn ":hover" demo/styles/*.css` shows only class-scoped idioms.

### D-9 — a bespoke shell where the demo's own correct implementation sits in a sibling file · MAJOR *(sharpens census S-7)*

`SharePopover.vue:31-39` — the demo's other clipboard-copy control:

```html
<Button size="sm" emphasis="quiet" class="h-8 w-8 p-0 shrink-0"
        @click="shareState" title="Copy share link">
    <Clipboard class="icon-md" />
</Button>
```

D-4, D-5, D-7, D-8 and D-17 are all solved there, for free, by the glass primitive: a 32 px target holding a 20 px glyph (the wrapper/glyph separation D-4 structurally cannot express), the glass focus ring, glass hover/active/disabled, and a visible `title`. It uses `icon-md` — one of **46** `icon-{xs,sm,md,lg}` call sites — whose defining comment (`design-idioms.css:95-99`) records that *"61 call-sites used to resolve to nothing, all computing at Lucide's default 24px"*. CopyButton instead sizes its glyph by stretching it to `100%` of an externally supplied box, i.e. hand-reconstructs the exact bug that utility family was authored to kill.

Census **S-7** (`lane-frontend.md:383-385`) rated this AMBER/"evaluate — the shell should be glass `Button`, the copy logic stays local". I **strengthen it to a decided case**: the evaluation is unnecessary because the target shape already ships in this repo, in a sibling directory, for the identical affordance. These should not be two controls.

**Blocked on census F-1** (`lane-frontend.md:54-69`, `:612`): `@mkbabb/glass-ui` is undeclared and unlocked; the swap cannot land until that is fixed.

**Falsifier.** Show glass `Button` cannot host an absolutely-positioned two-icon stack, or that `emphasis="quiet"` carries chrome unacceptable at `KeyframeCard` density — weak, since `SharePopover.vue:22-39` already nests two such buttons at `h-8 w-8` inside a 288 px popover.

---

## 3. MINOR

### D-10 — even repaired, the swap could never swap · MINOR

Two comments state the sighted contract — `:13-14` *"…without a visual change (**the icon swap is the sighted feedback**)"* and `:33-34` *"**The sighted feedback is the icon swap**."* Assume D-1 fixed. Then:

```
:70-79  fade-in  { 0%,100% { transform: scale(1); opacity: 0 }  50% { transform: scale(1.25); opacity: 1 } }
:82-92  fade-out { 0%,100% { transform: scale(1) }              50% { transform: scale(1.25) } }
```

with `iterationCount: 1`, `fillMode: "forwards"` (`constants/defaults.ts:82,84`, unset in `options`). `forwards` holds the **100 %** frame — `scale(1) / opacity: 0` for the check, `scale(1)` for the clipboard. **The resting state after the animation is pixel-identical to the resting state before it**, and identically so under `fillMode: "none"`. There is a 200 ms pulse and then amnesia; no state persists.

Three sub-failures inside those 22 lines:
1. **`fade-out` never fades** — it declares no `opacity` channel at all. The name is a lie and the crossfade never crosses.
2. **The glyphs superimpose at peak.** At t≈100 ms the clipboard sits at `opacity: 1` (unanimated) and the check at `opacity: 1`, both `scale(1.25)`, both at `left:0; bottom:0; width:100%; height:100%` (`:105-112`) — co-located, same 24-unit viewBox, same `stroke: currentColor`. Two clipboard outlines composite at double stroke alpha; only the tick is unique. The intended "clipboard → check" read never occurs.
3. `:86` and `:89` are **empty lines inside the `fade-out` blocks** where an `opacity` declaration was plainly removed. This is a half-finished crossfade, not a designed pulse.

**Falsifier.** Show `fillMode` resolving to something landing on a non-initial frame (both `forwards` and `none` land on the same resting frame here, so neither rescues it); or a consumer applying persistent copied-state styling — `grep -rn "literal-copy\|CopyButton" demo/**/*.css` returns only the sizing block at `EasingTarget.css:68-78`.

### D-11 — decorative glyphs carry no `aria-hidden` · MINOR

`:8` and `:9-12` render two SVGs with no `aria-hidden="true"`. Lucide's `defaultAttributes.mjs` adds none (`xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin`). The demo has an established idiom to the contrary: `grep -rn "aria-hidden" demo/ --include="*.vue"` → **27 uses across 17 files**. Both glyphs are purely decorative — the name comes from `aria-label` — so they should be hidden from the tree.

**Falsifier.** Show that a `<button>` with `aria-label` universally prunes SVG descendants from the accessibility tree in the targeted AT (name computation is overridden, but child exposure is not uniformly suppressed). Marked **UNPROVEN-NEEDS-LIVE** for the announcement effect; the idiom deviation is source-decidable.

### D-12 — colour duel: `text-foreground` is dead at 2 of 4 sites · MINOR

`:5` sets `text-foreground` on the root. `EasingTarget.css:68-78` sets `color: var(--muted-foreground)` (and `:hover { color: var(--foreground) }`) on the same element. Tailwind v4 declares `@layer theme, base, components, utilities;` (`node_modules/tailwindcss/index.css:1`), so `text-foreground` lives in the **`utilities` layer**; `EasingTarget.css` arrives via `<style scoped src="./EasingTarget.css">` (`EasingTarget.vue:335`) as **unlayered** author CSS. Unlayered beats layered irrespective of specificity — so at `EasingTarget` the component's own colour declaration is inert, and at the other three sites the consumer sets no colour so `text-foreground` wins. Exactly one of the two is dead at every site, and which one flips per consumer. Preflight already grants buttons `color: inherit`, so the utility is close to redundant in either case.

**Falsifier.** Show `EasingTarget.css` landing inside `@layer utilities` or later within it, or a `!important`.

### D-13 — empty-`text` state uncovered · MINOR

`text` is a required `string` (`:27-29`) with no guard, no `disabled` binding, no empty branch. `StartingStyleTarget.vue:59` passes `compiledEntryCss || copyableCss` — both `""` before the compile resolves. On an empty string the button is fully enabled, writes `""` to the clipboard (destroying whatever the user had), and announces `"Copied to clipboard"`.

**Falsifier.** Show all four bindings non-empty for the whole mounted lifetime.

### D-14 — half the root utilities are no-ops · MINOR

`:5` — `cursor-pointer relative inline-block text-foreground p-0 m-0 bg-transparent border-0`. `node_modules/tailwindcss/preflight.css` already grants every element `margin: 0; padding: 0; border: 0 solid` and every `button` `background-color: transparent`. So `p-0`, `m-0`, `bg-transparent`, `border-0` are all inert — 50 % of the class list is noise implying a reset the framework already performed (and, with D-12, `text-foreground` is inert at two more sites).

**Falsifier.** A layer or reset in the demo cascade re-introducing button padding/margin/border/background after preflight.

### D-15 — no teardown · MINOR

`onMounted` (`:65-102`) constructs two `CSSKeyframesAnimation` instances and an `AnimationGroup` holding DOM targets (`:98-99`). There is no `onUnmounted`, no `group.value = null`, no cancel. `KeyframeCard.vue:26` mounts one CopyButton per keyframe card, so the churn is real. Principally an axis-C concern; recorded here because it is motion-owned state.

**Falsifier.** Show the engine self-releases targets on element disconnect (a `WeakRef`/`MutationObserver` teardown in the group lifecycle).

### D-16 — two constant keyframe strings re-parsed per instance · MINOR

`:69` and `:82` call `.fromString()`, and `engine/css/css-animation.ts:169-200` shows `fromString` running the full value.js grammar (`resolveKeyframes`), scroll-metadata recovery, a fresh diagnostics array, and animation-shorthand recovery — **per call**. Both strings are compile-time constants identical across every instance. One CopyButton per keyframe card means N cards pay 2N full CSS parses at mount.

**Falsifier.** A memo inside `resolveKeyframes` keyed on the source string.

### D-17 — no visible label or tooltip · MINOR

Icon-only with `aria-label` (`:4`), no `title`, no `Tooltip`, no visible text. Six demo files wrap controls in `TooltipTrigger`; the sibling copy control uses `title="Copy share link"` (`SharePopover.vue:36`). A sighted mouse user gets no confirmation of what the glyph does before clicking — which matters more than usual here, because per D-1/D-2 they get none after clicking either. MINOR because the clipboard glyph is a strong convention and the AT path is labelled.

**Falsifier.** A consumer wrapping `<CopyButton>` in a tooltip — none of the four does.

---

## 4. INFO

### D-18 — physical inset properties · INFO

`:106-111` uses `bottom: 0; left: 0; height: 100%; width: 100%`. Because the overlay is full-size, RTL behaviour is identical to `inset: 0` — so this is **not** an RTL defect and I decline to file it as one. Recorded only as idiom: `inset: 0` says it in one declaration with no direction assumption.

### D-19 — forced-colors: the glass layer keys on attributes this component never emits · INFO

`grep -rn "forced-colors\|prefers-contrast" demo/` → **0 hits**; the demo delegates entirely to `glass-ui/dist/styles/accessibility.css`, whose `@media (forced-colors: active)` and `(prefers-contrast: more)` blocks key on `[aria-current] / [aria-selected] / [aria-pressed] / [aria-checked] / [data-state]`. CopyButton emits **none** of these — notably not `aria-pressed`, which is the natural encoding of a latched copied state and would have brought the forced-colors border for free. No defect is filed for rendering, because the glyphs are `stroke: currentColor` and resolve to the forced text colour correctly; the row records the missed hook.

---

## 5. SUPERLATIVES (L-18, running the other way)

### S+1 — the live-region sink is built in the correct order

`:13-15`, `:33-35`, `:57-60`. The `<span class="sr-only" role="status" aria-live="polite">` is rendered **at mount with empty content**, not injected on click — the order that actually works, because AT must observe a live region *before* the mutation to announce it. The re-arm (`liveStatus = ""` → `requestAnimationFrame(() => liveStatus = "Copied…")`) is the standard fix for repeat announcements of unchanged text, and the rAF placement is correct against Vue's scheduler: Vue flushes on a microtask, so the DOM reaches `""` before the rAF callback queues the second flush — two distinct mutations, as intended. Most icon-copy buttons in the wild ship no live region at all; this one ships a documented, single, non-visual sink, and it is the only channel of the component that works today.

I explicitly **decline to file** the `role="status"` + `aria-live="polite"` redundancy as a defect: `role=status` does carry an implicit polite live value, but the explicit attribute is long-standing defensive practice for older JAWS/NVDA builds, so calling it noise would be a false defect.

**Falsifier / caveat.** **UNPROVEN-NEEDS-LIVE**: a capture showing a single rAF is too tight for a repeat announcement (some SR buffers coalesce sub-frame mutations), or a background-tab stall where rAF never fires and the announcement is dropped, would demote this to a MINOR timing note. The *structure* — present-at-mount, non-visual, single sink — survives either way.

### S+2 — contrast passes in all four theme × colour-path combinations, computed from tokens

Computed from `glass-ui/dist/styles/tokens/color-radius.css` (light) and `tokens/dark-arm.css` (dark); sRGB relative luminance per WCAG:

| path | fg | bg | L(fg) | L(bg) | ratio | 1.4.11 (3:1) |
|---|---|---|---|---|---|---|
| default, light | `--foreground` `hsl(24 10% 10%)` | `--card` `hsl(30 85% 96%)` | 0.0100 | 0.9222 | **16.19:1** | pass |
| default, dark | `--foreground` `hsl(30 14% 90%)` | `--card` `hsl(26 22% 17%)` | 0.7914 | 0.0253 | **11.18:1** | pass |
| `.literal-copy`, light | `--muted-foreground` = `--neutral-5` `hsl(30 22% 40%)` | `--card` | 0.1440 | 0.9222 | **5.01:1** | pass (also clears 4.5:1) |
| `.literal-copy`, dark | `--neutral-5` `hsl(34 14% 62%)` | `--card` | 0.3588 | 0.0253 | **5.43:1** | pass (also clears 4.5:1) |

The quietest path — a muted icon on a card, the one most likely to fail — clears the graphical-object threshold by 1.7× and even clears the *text* threshold. This is the payoff of taking colour from `currentColor` and tokens rather than hard-coding it, and it is the component's strongest single decision. It also stands in direct contrast to the sibling's bespoke `ring-accent` at **1.37:1** (§D-7).

**Falsifier.** A consumer mounting CopyButton over a non-`--card`/`--background` surface (an aurora wash, a glass plate over imagery). None of the four does — all sit inside `Card` or the plain page surface — but a fifth could, and the component carries no contrast floor of its own.

### S+3 — zero token footprint against a namespace the census flagged as a hazard

`lane-frontend.md:439-441` records **98** demo-owned custom properties sharing a flat, unprefixed global namespace with glass-ui's, and **0** `--kf-*` namespaced tokens — *"a collision surface worth a lane of its own"*. CopyButton declares **no** custom properties, no magic colour literals, and no hard-coded pixel values; its scoped block (`:104-113`) contains four geometry declarations and nothing else. Its entire visual contract is `currentColor` plus a consumer-supplied box. Whatever the `--kf-*` namespace lane decides, this file needs no migration.

**Falsifier.** Trivially — exhibit a custom property or raw colour in `:104-113`. There is none.

---

## 6. Corpus reconciliation — where I contradict the hitherto lanes

### Contradiction: census §6.4 / S-7's *mechanism* claim is wrong (its conclusion is right)

`lane-frontend.md:385` (and the §6.4 table rows for `CopyButton.vue:70` / `:83`) states:

> `CopyButton.vue:70` and `:83` build `@keyframes fade-in` / `fade-out` as **runtime JS template strings** and inject them — **style-injection from script, bypassing the cascade entirely**.

The first half is right; **"inject them" / "style-injection" is wrong.** `CSSKeyframesAnimation.fromString()` (`src/animation/engine/css/css-animation.ts:169-200`) *parses* the text into an in-memory keyframe model via `resolveKeyframes`, storing `propertyRegistry`, `scrollOptions` and `diagnostics`. There is no `insertRule`, no `<style>` element, no `adoptedStyleSheets`, no `@keyframes` at-rule ever reaching the document. The engine subsequently writes **inline styles per rAF frame** on the targets set at `:98-99`.

The distinction is load-bearing for this axis:

- an injected `@keyframes` **would** sit in the cascade and **would** be overridable by `@media (prefers-reduced-motion: reduce)` — so if the census were right, the PRM story would be salvageable from CSS;
- because the motion is inline-style rAF, **nothing in CSS can reach it**, and the only lever is `respectReducedMotion`. That is why **D-6** is the sharp form of what §6.4 was gesturing at, and why the repair is a one-token opt-in rather than a stylesheet change.

The census's *conclusion* — "that is its own defect regardless of the glass question" — is upheld and made precise.

### Agreements folded, not re-derived

- **S-7** (`:383-385`) — glass shell, local copy logic. Upheld and **escalated from "evaluate" to "decided"** by D-9: the reference implementation already ships at `SharePopover.vue:31-39`.
- **§6.5** (`:462-489`) — CopyButton is correctly absent from the 13 PRM sites; D-6 explains why the absence is a defect.
- **§6.3** (`:439-441`) — the 98-token flat namespace / zero `--kf-*`; CopyButton contributes nothing to it (S+3).
- **F-1** (`:54-69`, `:612`) — glass-ui phantom dependency. Gates D-9: no glass-`Button` swap can land until `@mkbabb/glass-ui@7.0.0` is declared and locked.

---

## 7. Killed candidates — defects I declined to file

Recorded so a later pass does not re-raise them, and because one of them would have made this challenge's headline wrong.

| candidate | why killed |
|---|---|
| **"the animation plays a 200 ms pulse and reverts"** *(my own first-pass headline)* | Wrong. It assumed the group constructs. `resolveEasingOption` throws on `"bounceInEase"` before any of that — verified by two `node` probes and the full `applyOptions → normalizeTimingFunction → resolveTimingFunction` chain. The correct claim is **D-1: no motion at all, ever.** The revert analysis survives only as **D-10**, a *conditional* second-order finding ("even repaired, it would not swap"). This is why D-1 carries four independent falsifier arms. |
| *"`class="clipboard"` is swallowed by Lucide, so the scoped positioning never applies"* | `Icon.mjs:51-55` **does** place `class: mergeClasses(...)` after `...props`, and `mergeClasses.mjs` does **not** include the consumer's class — the class is genuinely overwritten inside the render. But both `createLucideIcon`'s return (`createLucideIcon.mjs:11`) and `Icon` (`Icon.mjs:16`) are **functional** components with no declared `props`, so Vue's `getFunctionalFallthrough` extracts `class`/`style`/`on*` and `cloneVNode` **merges** it onto the root. Final `<svg>` class is `lucide lucide-clipboard-icon lucide-clipboard clipboard`; the scope id lands via `setScopeId`. **No defect.** |
| *"`useTemplateRef<HTMLElement>` on a component yields an instance, not an element, so `setTargets` receives a proxy"* | Both components are functional, so `ShapeFlags.STATEFUL_COMPONENT` is unset and Vue's `setRef` resolves to `vnode.el` — the `<svg>`. The `HTMLElement` cast at `:37-38` is accurate. **No defect.** |
| *"insecure-context clipboard crash on LAN device testing"* | `grep -n "server" vite.config.ts` → no `server` block. keyframes.js has no `server.host: true` LAN workflow (unlike value.js). Would have been a false defect imported from the sibling repo's memory. **Not filed**; D-3 rests on the rejection path only. |

---

## 8. Repair order — one wave, no new abstractions

1. **D-1 first, and alone it is not enough.** Change `:42` to a resolvable name — `easeInBounce` is the intended curve and is in `DIRECT_NAMES`; `ease-in-bounce` also resolves. Then fix the **phantom in the source prose** (`easing.ts:44`, `waapi/eligibility.ts:169`) and the vacuously-passing assertion in `test/orchestration/orchestration-api.test.ts` that green-lights the name, or the next author repeats this exactly.
2. **D-2 + D-10 together** — they are one bug wearing two masks. Give the component a real copied state: set on success, clear on a ~1.5 s timeout (cleared on unmount, D-15), driving *both* the `aria-label` **and** a persistent check glyph (and `aria-pressed`, which buys the forced-colors hook of D-19 for free). Restore the removed `opacity` declarations at `:86`/`:89` so the crossfade crosses. The animation becomes the transition *into* the state, not the state itself.
3. **D-3** — `await`/`catch` the copy; set state only on resolve; announce failure on reject.
4. **D-6** — add `respectReducedMotion: true` to `options`. One token, zero visual regression.
5. **D-9 collapses D-4 / D-5 / D-7 / D-8 / D-14 / D-17** — rebuild the shell in the shape `SharePopover.vue:31-39` already ships: glass `Button`, a padded wrapper ≥32 px holding an `icon-sm`/`icon-md` glyph, house focus ring and hover included, `title` or `Tooltip`. Then delete the four divergent consumer sizing dialects, the `EasingTarget.css:68-74` workaround comment, and the D-12 colour duel with it. *Blocked on census F-1 — declare and lock `@mkbabb/glass-ui@7.0.0` first.*
6. **D-11 / D-13 / D-16** — `aria-hidden="true"` on both glyphs; an empty-`text` guard; hoist the two constant keyframe strings to module scope.

Nothing above requires a new component, a new token, or a new abstraction. The end state is smaller than the 113 lines it starts at.
