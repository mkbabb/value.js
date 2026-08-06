claude-opus-5[1m]

# CHALLENGE · `StartingStyleTarget.vue` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/StartingStyleTarget.vue` (216 L)
**Repo state** keyframes.js `master` @ `8281638c`, glass-ui **7.0.0** installed
**Method** static + source-derived only (no browser; L-18 both directions). Contrast computed from the resolved token chain; the glass plate is modelled analytically and the model is stated so it can be falsified.

**Tally — defects 23 (BLOCKER 2 · MAJOR 8 · MINOR 13) · superlatives 5**

Two hypotheses were **killed by the tree before publication** and are recorded in §Killed rather than sold as findings. A false defect is worse than a missed one.

---

## Read set (whole)

| file | why |
|---|---|
| `demo/scenes/spring/StartingStyleTarget.vue` | target |
| `demo/scenes/spring/useSpringLinearStops.ts` (34 L) · `springKeys.ts` (10) · `springPresets.ts` (42) | direct imports |
| `demo/components/CopyButton.vue` (113 L) | direct import |
| `demo/scenes/spring/useSpringDemo.ts` (499 L) · `useCompiledEntry.ts` (84 L) | injected context + the artifact source |
| `demo/scenes/spring/SpringScene.vue` (204 L) | the mount + the ribbon twin |
| `demo/styles/style.css` · `design-idioms.css` · `playback-idiom.css` · `font-roles.json` · `demo/DESIGN.md` | the house law the component is judged against |
| `node_modules/@mkbabb/glass-ui/dist/{card,button,Surface}*.js`, `styles/typography/{semantic,utilities,scale}.css`, `styles/glass/ladder.css`, `styles/tokens/*`, `styles/utilities/a11y-overrides.css` | resolved rungs + tokens |
| `src/animation/compile/emit/entry.ts` | what the artifact actually emits |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md`: row `216 | spring/StartingStyleTarget.vue | G | Button, Card` (the target is census-clean at the shadow-component level, so nothing here contradicts it); **S-7** (CopyButton AMBER, 113 L) is extended below at D-5; **F-1** (glass-ui phantom dep) is the standing precondition — every token derivation here reads `node_modules/@mkbabb/glass-ui@7.0.0`, which is **not in `package.json` or the lock**, so every computed ratio in this file is reproducible only against the current `node_modules` state. That is F-1's blast radius reaching the design axis.

---

## BLOCKERS

### D-1 · BLOCKER · The card's primary verb is a duplicate of a control the scene declares PRIMARY elsewhere

`StartingStyleTarget.vue:40-47` renders

```
<Button emphasis="secondary" class="btn-playback btn-playback-accent shrink-0" @click="toggle">
    <span>{{ visible ? "Dismiss" : "Reveal" }}</span>
    <component :is="visible ? EyeOff : Eye" class="w-4 h-4" />
```

`SpringScene.vue:138-156` renders a semantically identical twin into the transport ribbon whenever this view is on stage — same `Button`, same `btn-playback btn-playback-accent`, same `Dismiss`/`Reveal` label swap, same `EyeOff`/`Eye`, same `demo.toggleDiscrete()` handler. The scene's own comment `SpringScene.vue:75-80` settles which one is authoritative:

> "the discrete view keeps Reveal/Dismiss (toggle the @starting-style card) … **its domain verb is the primary control for that face**."

So the ribbon copy is declared PRIMARY and the in-card copy is the redundant second. This is precisely the redundancy `StartingStyleTarget.vue:64-70` congratulates itself for retiring one element earlier:

> "the redundant 4-preset ROW is RETIRED (the same four presets were shown THREE times) … The ONE preset surface now lives in the SpringSidebar rail."

The component applied the one-surface law to the *presets* and left the identical violation standing for its *own primary verb*, four lines above the comment that states the law. Two live controls for one boolean, mutually unaware, with no shared pressed state (see D-6).

**Falsifier.** Show that `ribbonContent` is unreachable at some supported viewport without a gesture — then the in-card copy is a responsive fallback, not a duplicate. Desktop is decided against that reading: `SpringScene.vue:49-50` says the shell force-opens the rail at ≥1024 px, and `ribbonContent` is gated only on `selectedControl === "spring"`, which `SpringScene.vue:34-38` pins as the scene's sole surface. Mobile (sheet-at-peek, `SpringScene.vue:46-50`) is **UNPROVEN-NEEDS-LIVE** — if the ribbon is behind a peek gesture below `lg`, the correct repair is a breakpoint, not two permanent controls.

---

### D-2 · BLOCKER · The copy-pasteable CSS artifact is rendered UPPERCASE, corrupting case-sensitive selectors and idents

`StartingStyleTarget.vue:61`

```
<code class="artifact text-mono-caption tabular-nums text-muted-foreground block w-full max-h-32 overflow-auto whitespace-pre">{{ compiledEntryCss || springCss }}</code>
```

glass-ui `dist/styles/typography/utilities.css:1`:

```
@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
                             letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

`--type-tracking-caps: 0.1em` (`tokens/scheme-motion.css:1`). So the artifact renders **uppercase at 0.1 em tracking, in a `whitespace-pre` monospace block** — a caps-label rung conscripted for a multi-line code specimen.

This is not a taste complaint. `src/animation/compile/emit/entry.ts:426-447` emits, per selector, `${selector} { … }`, `${selector}${openSelector} { … }`, and `@starting-style { ${selector}${openSelector} { … } }`. `useCompiledEntry.ts:72-75` passes `{ ".discrete-card": … }` with `openSelector: ".is-open"`, and `useCompiledEntry.ts:24-27` names the keyframes `kf-entry`. **CSS class selectors and custom-idents are case-sensitive in standards mode.** The rendered text therefore reads `.DISCRETE-CARD`, `.IS-OPEN`, `KF-ENTRY` — CSS that does not match anything. `StartingStyleTarget.vue:50-55` states the panel's entire purpose as "**A designer pastes it verbatim** to reproduce the discrete transition"; verbatim transcription of what is displayed produces dead CSS. The 0.1 em tracking additionally destroys the column alignment that is the only reason to set an artifact in mono at all.

The house already owns the counter-idiom and this file omits it: `normal-case` is applied to `text-mono-caption` at **five** sites — `demo/app/dock/MbabbMenu.vue:5`, `:64`, `demo/components/instrument/shell/SharePopover.vue:19`, `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:254`, `:265`. The same defect is present in the header caption at `StartingStyleTarget.vue:17-19`, where `text-mono-caption` renders the library identifier `springLinearStops()` as `SPRINGLINEARSTOPS()` — a camelCase API name displayed in a case the API does not have.

**Falsifier.** Any of: (a) `text-transform` is neutralised for `code` somewhere in the resolved cascade — grepped, nothing does (`demo/styles/*.css`, glass-ui `styles/**`); (b) `text-mono-caption` in 7.0.0 does not carry `text-transform: uppercase` — quoted verbatim above; (c) the panel is decorative rather than transcribable — refuted by `:50-55` and by the `CopyButton` at `:59`.

---

## MAJORS

### D-3 · MAJOR · What is displayed is not what is copied, and the panel's label lies in the fallback state

```
59:  <CopyButton class="shrink-0 w-4 h-4" :text="compiledEntryCss || copyableCss" />
61:  <code …>{{ compiledEntryCss || springCss }}</code>
```

Two different fallbacks behind one panel. When `compiledEntryCss` is empty the eye sees `springCss` — a bare `linear(0, …, 1)` — while the clipboard receives `copyableCss` (`StartingStyleTarget.vue:122-124`), the full `transition-timing-function: …;` declaration. Neither is a `compileToEntry` artifact, yet `:58` labels the block "**compileToEntry() artifact**".

The empty state is reachable, not theoretical. `useCompiledEntry.ts:47` seeds `css = ref("")` and `:65-77` fills it only after an `await loadAnimationEngine()` — so the panel is born in the mislabelled state on every mount and swaps under the reader. It is also reachable *permanently*: `compileToEntry` returns `{ css: "", eligible: false, refusals: [...] }` for any of nine named refusals (`entry.ts:77-89`, `:452-455`), and `useCompiledEntry.ts:76` writes `css.value = out.css` while **never reading `out.eligible` or `out.refusals`** — a refusal is indistinguishable from success at this call site.

**Falsifier.** Show the two expressions cannot diverge — they differ by construction (`springCss` vs `copyableCss`), so this dies only if `compiledEntryCss` is provably non-empty at first paint. It is not: it is `ref("")` until an async resolve. `iterationCount` was checked and does **not** refuse (`src/animation/constants/defaults.ts:82` = `1`), so the *permanent* refusal state is possible but not currently triggered by this spec — that portion is the weaker half of the claim.

### D-4 · MAJOR · The "MANDATORY PRM degrade" is inert — the declared mechanism does nothing

```
209:  /* MANDATORY PRM degrade: no transition under reduced motion — an instant,
210:     clean toggle … */
211:  @media (prefers-reduced-motion: reduce) { .discrete-card { transition: none; } }
```

glass-ui `dist/styles/utilities/a11y-overrides.css:1` already ships, unlayered and `!important`:

```
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; }
}
```

The component's declaration is normal-weight; the vendor's is `!important` on a universal selector. The vendor wins both longhands. Rendered PRM behaviour on `.discrete-card` is therefore **a 0.1 s `ease` opacity fade** — not "no transition", not "an instant, clean toggle". `translate`/`scale`/`display` fall out only because they are absent from the vendor whitelist, i.e. by the vendor's accident, not by the rule the file believes it wrote. The user-visible outcome is acceptable; the *honesty* is not, and the component's sole PRM guard is dead code carrying the word MANDATORY.

**Falsifier.** Show `a11y-overrides.css` is inside a cascade layer while `StartingStyleTarget`'s scoped block is not — checked: `styles/utilities.css` imports it with no `@layer` wrapper, and Vue scoped CSS is unlayered, so both are unlayered and `!important` decides. Alternatively show the demo does not import it: `style.css:3` imports `@mkbabb/glass-ui/styles`, whose `index.css` imports `./utilities.css`.

### D-5 · MAJOR · `CopyButton`'s copy-feedback animation has no reduced-motion gate at all — and no CSS rule can add one

`CopyButton.vue:62` fires `void group.value?.play()` unconditionally. The group is a keyframes.js `AnimationGroup` (`:65-102`) built from `transform: scale(1.25)` keyframes (`:70-93`) that the engine writes as **inline styles**. Nothing in the 113-line file consults `prefers-reduced-motion`; nothing can be added in CSS, because glass-ui's PRM sheet governs `transition-*`/`animation-*` only and cannot reach engine-driven inline writes. Every copy therefore produces a 25 % scale punch under `prefers-reduced-motion: reduce`, on a control this card places at `:59`.

`lane-frontend.md` S-7 flags this file's runtime `@keyframes` string injection as "its own defect regardless of the glass question"; **this is a second, independent defect in the same file that S-7 does not name** — the injection is a cascade-hygiene problem, this is a PRM-honesty problem.

**Falsifier.** Find a PRM guard in `CopyButton.vue`, in `@utils/clipboard`, or inside `loadAnimationEngine()`/`AnimationGroup.play()` that suppresses playback under reduced motion. `demo/composables/` was grepped for `useReducedMotion` reaching this path; `lane-frontend.md:487` independently characterises the demo's PRM coverage as "conscientious but **inconsistent in mechanism**".

### D-6 · MAJOR · The toggle carries no ARIA state, and the idiom's state style it opts into is consequently dead

`:40-47` is a two-state disclosure with no `aria-expanded`, no `aria-pressed`, no `aria-controls`. The only state signal is the visible label swap — invisible to any AT consumer reading the button out of flow, and unavailable to the discrete card at `:32` which has no `id` to be controlled.

Sharper: `playback-idiom.css:84-87` ships

```
.btn-playback[aria-pressed="true"] { background: color-mix(in srgb, var(--primary) 15%, transparent);
                                     border-color: color-mix(in srgb, var(--primary) 30%, var(--border)); }
```

The component opts into `.btn-playback` (`:42`) and then withholds the attribute that drives its pressed state. The control has **no persistent visual on-state** — the idiom offers one and the call-site declines it. With D-1's twin in the ribbon also lacking it (`SpringScene.vue:141-146`), neither copy shows which way the boolean sits.

**Falsifier.** Show glass-ui `Button` synthesises `aria-pressed` — it does not; its prop surface is `emphasis/tone/size/iconOnly/loading/type/disabled/class/asChild/as` (`dist/button-B7c944jy.js`, `__name: "Button"`), and it emits `data-emphasis`/`data-tone`/`data-size` only.

### D-7 · MAJOR · Conscripting the transport grammar imports a 48 rem-wide button and a forced-colors focus regression

`DESIGN.md:110-119` (§5) is explicit: "`btn-playback` and `btn-playback-accent` are the **transport grammar**." `font-roles.json:11-15` binds the role `transport-button` to selector `.btn-playback`. Reveal/Dismiss is a content-disclosure verb, not transport — the scene's own transport is `PlaybackRibbon` (`SpringScene.vue:69-73`). Two concrete consequences, not just a taxonomy complaint:

1. **Proportion.** `playback-idiom.css:16-18` sets `.btn-playback { height: 2rem; width: 100%; }` — sized for the ribbon's equal-width grid cells. The call-site drops it into `:25`'s `flex-col items-center` column whose width is `max-w-3xl`. An explicit `width: 100%` overrides the shrink-to-fit that `items-center` would otherwise give, so a two-word toggle plus a 16 px eye renders **48 rem / 768 px wide**, centred in a sea of its own plate. `shrink-0` at `:42` cannot help — it governs flex shrinking, not the declared width.
2. **Forced colors.** `playback-idiom.css:72-75` sets `.btn-playback:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }`. Under `forced-colors: active`, `box-shadow` is forced off, so the ring is the `outline` — which this rule removes. glass-ui *does* restore it (`a11y-overrides.css:1`, `@media (forced-colors: active) { .focus-ring:focus-visible { outline: 2px solid Highlight; outline-offset: 2px } }`, and `Button` does carry `focus-ring`), but both sheets are unlayered at equal specificity `(0,2,0)` and the demo's is imported *after* glass-ui (`style.css:3` then `:14` → `design-idioms.css:6` → `playback-idiom.css`). Source order decides for the demo. **The card's only primary control has no visible focus indicator in forced-colors mode** — WCAG 2.4.7 (AA).

**Falsifier.** (1) dies if glass-ui `Button` declares a width that out-specifies `.btn-playback` — it does not (`x = cn("button tap-squish focus-ring", …)`, no width). (2) dies if either sheet is layered — neither is (`glass-ui/dist/styles/utilities.css` is a bare `@import` list; Vue scoped CSS is unlayered), or if the demo re-restores the outline — grepped, it does not. Both are **UNPROVEN-NEEDS-LIVE** as *rendered* claims; both are decided as *cascade* claims.

### D-8 · MAJOR · `min-h-0` at `:26` is dead, and with every sibling `shrink-0` the card has a hard height floor it silently clips against

`:26` `<div class="stage-viewport relative w-full flex-1 min-h-0 …">` versus `:135-137` `.stage-viewport { min-height: 7rem; }`.

Tailwind v4 emits utilities into `@layer utilities`; Vue scoped CSS is unlayered and compiles to `.stage-viewport[data-v-…]` — specificity `(0,2,0)`. **Unlayered normal declarations beat layered ones outright**, so `min-height: 7rem` wins and `min-h-0` is dead. The author wrote both, which means one of the two intents is not the shipped one.

The consequence is structural. Of the `Card`'s four children (`:15`, `:25`, `:56`, `:71`), three carry `shrink-0`; the fourth is the stage column whose only flexible member is the viewport whose shrink is now floored at 7 rem. **Nothing in the card can compress.** `Card` at `:11` is `h-full … overflow-hidden`. Summing the incompressible minimum: header `~1.94rem` (`--type-heading` 1.618 × leading 1.2) + 3 × `gap-6` = `4.5rem` + viewport `7rem` + `gap-5` `1.25rem` + button `2rem` + artifact label `~1.23rem` + `mb-1.5` `0.375rem` + `max-h-32` `8rem` + preset line `~1.23rem` ≈ **27.5 rem ≈ 440 px** of hard floor. Below that the bottom rows are clipped with no scroll affordance, because `overflow-hidden` is on the plate. Note also that `Card` is given raw children rather than `CardHeader`/`CardContent`, so glass-ui's `--card-pad-block` is never consumed (`glass-ui/dist/components/card/styles.css`, `.card` declares the pad *tokens* only) — nothing absorbs the overflow.

**Falsifier.** Show the work area is guaranteed ≥ ~440 px + chrome at every supported viewport. `style.css:289` (`@media (max-width: 1023px)` dock-label step) and `SpringScene.vue:8` (`px-6 lg:px-8`) both prove sub-`lg` is a supported target; whether the work area drops under the floor there is **UNPROVEN-NEEDS-LIVE**. The dead-utility half of the claim is decided regardless.

### D-9 · MAJOR · Hierarchy inversion in the header: the decorative caption is nowrap-protected and truncates the card's own title

```
15:  <div class="flex w-full max-w-3xl items-center justify-between gap-3 shrink-0">
16:      <span class="text-heading text-foreground truncate">@starting-style</span>
17:      <span class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">
18:          eased by springLinearStops()
```

The subordinate right-hand caption is `whitespace-nowrap` with no `shrink-0`; because a flex item's `min-width: auto` resolves to min-content and its min-content is now the whole string, it cannot shrink. The protagonist — the card's own title, at `--type-heading` 1.618 rem / weight 700 — carries `truncate` and gives way. The proportion law is inverted: the loudest rung yields to the quietest.

Budget at 390 px: `SpringScene.vue:8` `px-6` (48 px) + `StartingStyleTarget.vue:11` `px-6` (48 px) leaves ~294 px. The caption at `--type-caption` floor 0.75 rem, uppercase (D-2), Fira Code ~0.6 em advance, +0.1 em tracking ≈ 27 chars × 12 px × 0.6 + 27 × 1.2 ≈ **226 px**, plus `gap-3` (12 px) → the title receives ~56 px against the ~195 px it wants. `@starting-style` truncates to roughly `@st…`.

**Falsifier.** Add `shrink-0` to the title / drop `whitespace-nowrap` and the inversion is gone — so the claim dies if some ancestor already caps the caption's width, or if the scene is never rendered below `lg`. Neither holds: no width cap exists on `:17`, and sub-`lg` is a supported breakpoint. Exact glyph advance is **UNPROVEN-NEEDS-LIVE**; the ordering conclusion (caption wins, title truncates) is decided by the flex rules alone and is independent of the measurement.

### D-10 · MAJOR · The card that `@starting-style` is demonstrating is not visibly a card

`:158-166` gives `.discrete-card` a background of `color-mix(in srgb, var(--color-progress) 14%, transparent)`, a soft `0 8px 32px` violet glow, and **no border and no outline**.

Resolved chain: `--color-progress` → `--accent-kf` (`style.css:163`, `:130`) = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))`. Plate: `Surface` maps `material:"elevated"` → `tier:"resting"` (`dist/Surface-DOHf5u2R.js`, `g = { content:"quiet", elevated:"resting", … }`) and applies `resolveSurfaceClass` → class `.glass-resting`, whose background is `--glass-bg-resting` = `color-mix(in srgb, var(--card) 65%, transparent)` light / 72 % dark (`tokens/glass.css`, `tokens/dark-arm.css`) plus a `--glass-tint-strength` ink mix which the demo pins to the floor (4 % light / 12 % dark) by zeroing `--glass-tint-strength-aa` at `style.css:203-208`.

Modelling the plate over `--background` (backdrop blur preserves mean luminance over a uniform substrate):

| arm | plate | `.discrete-card` wash | **wash / plate** |
|---|---|---|---|
| light | `rgb(244,238,232)` | `rgb(227,217,228)` | **1.19 : 1** |
| dark | `rgb(64,57,51)` | `rgb(82,70,77)` | **1.26 : 1** |

At 1.19–1.26 : 1 the plate edge is essentially unresolvable; what the viewer perceives entering and exiting is *floating text with a faint violet haze*, not a card. The scene's whole subject is a discrete element appearing and disappearing, and `scale(0.9) → 1` reads only if there is an edge to scale. Under `forced-colors: active` it is worse and decidable: backgrounds and box-shadows are both forced, and with no border or outline declared the element loses **every** visual boundary. There is no `@media (forced-colors: active)` block anywhere in the file. (Contrast the sibling at `:144-151`, which uses `outline: 1px dashed` — outlines survive forced colors. The right instinct is present in the file, applied to the wrong element.)

**Falsifier.** Show the plate is not `.glass-resting`, or that a border arrives from elsewhere — `Card`'s own `.card` class contributes `rounded-card text-card-foreground scrollbar-hidden` only, and `.glass-resting`'s `border: 1px solid var(--glass-border-accent)` lands on the **plate**, never on `.discrete-card`. The precise wash-vs-plate delta is model-dependent (`--glass-level` was not located in the token sheets and is assumed `1`) and is **UNPROVEN-NEEDS-LIVE**; the "no border / no outline / no forced-colors block" half is decided by reading `:158-197`.

---

## MINORS

### D-11 · MINOR · The wash's AA compliance is 0.17 above the floor and rests on a vendor repoint the component never references
`:34-36` sets `text-small text-muted-foreground` on the 14 % violet wash. `--type-small` floor is `0.875rem` = 14 px at weight 400 — normal text, 4.5 : 1 required across its whole clamp (top of clamp is 20 px, still < 24 px). Computed against the modelled plate: **light 4.77 : 1, dark 4.67 : 1 — PASSING**, but only because glass-ui `glass/ladder.css` repoints `--muted-foreground: var(--on-glass-muted)` inside `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)`. Without that zero-specificity vendor rule the same markup computes **3.95 (light) / 3.51 (dark) — failing**. The component authored a bare `14%` with no contrast reasoning and no reference to the repoint; any retune of the wash, of `--accent-kf`, or of the tier mapping reds it. Recorded as a fragility, **not** as a violation.
**Falsifier.** The failing-counterfactual figures are the falsifier's own output — if the repoint is removed or out-ordered, this becomes a BLOCKER; while it stands, calling it a failure would be the false defect.

### D-12 · MINOR · The T.D4 mono contract is satisfied by a class that renders nothing
`font-roles.json:82` (RULED): a mono leaf must be "(b) a tabular **numeric** readout (`tabular-nums`)"; "a new demo-authored mono UI label reds the census." `:17-19` is a mono UI label containing **zero digits**, and it carries `tabular-nums` — which matches `monoAllowedSelectors` `[class*='tabular-nums']` (`font-roles.json:71`) and is a no-op on a digit-free string. The class is load-bearing for the gate and inert for the render. Compare `:74-76`, where `tabular-nums` on `({{ response }} / {{ damping }})` is legitimate — the file contains both the honest and the dishonest use of the same token.
**Falsifier.** If `proof:font-census` reads the `_monoContract` prose rather than only `monoAllowedSelectors`, the census would already be red and this is a duplicate; if the owner rules prose labels in mono acceptable, it dies outright.

### D-13 · MINOR · Stale rationale contradicting the ratified color authority
`:141-143` — "the `--color-progress` token, **repointed red by Lane B**, as a dashed outline". `DESIGN.md:43-44` (§2): "**Red is destructive only** … It must not return to progress or ordinary chrome"; `style.css:155-163` states the violet repoint "so **red exits the chrome entirely**". `playback-idiom.css:38-43` records the same correction for its own comment ("The K-era comment bound this hover to the red-dashed family; VERDICT #16 killed the latent-red theme"). This file was not swept.
**Falsifier.** Show a Lane B ruling that re-reds `--color-progress` after VERDICT #16.

### D-14 · MINOR · Tombstone comment for a component that is not here
`:199-201` describes "the consumed **ToggleChip**'s `data-state="on"` seam" as the live affordance. There is no `ToggleChip` in this file — imports are `Button`, `Card`, `Eye`, `EyeOff`, `CopyButton` (`:83-87`) — and the picker it belonged to was retired at K.W4 S5 (`:64-70`). A deletion note that outlived both the rule and the component it named.
**Falsifier.** Find a `ToggleChip` render or import in the resolved tree of this component.

### D-15 · MINOR · ~30 % of the file is rationale prose, against the codex's own ownership rule
`DESIGN.md:140-141` (§6): "**Rationale prose is owned here.** Comments may point to a section; they do not mint a competing authority." Roughly 64 of 216 lines are multi-line rationale blocks (`:2-8`, `:22-24`, `:27-31`, `:50-55`, `:64-70`, `:92-95`, `:100-102`, `:112-115`, `:126-130`, `:139-143`, `:153-157`, `:177-178`, `:199-201`, `:209-210`). Two of them are provably wrong (D-13, D-14) and one is provably inert (D-4) — the concrete cost of minting authority at the call-site instead of pointing at a section.
**Falsifier.** Show §6 governs only token-home prose, not component comments — the sentence quoted is unqualified.

### D-16 · MINOR · Two spacing systems in 216 lines; the chip's vertical padding is sub-pixel
Template rides Tailwind's 0.25 rem scale (`gap-6`, `gap-5`, `mb-1.5`, `px-6 lg:px-8`); scoped CSS rides raw off-grid rems — `:137` `7rem`, `:146` `0.05rem 0.5rem`, `:163` `1.5rem 2.5rem`, `:204` `0.4rem 0.6rem`, `:170`/`:186`/`:195` `1.25rem`. `DESIGN.md:236` (R4) rules "Utilities belong in templates; scoped CSS is **token-plain**" — these are neither utilities nor tokens. `0.05rem` = **0.8 px** of vertical padding on a `--radius-pill` chip whose text is `--type-small` (14–20 px): the pill is crushed onto its own glyphs, so the rounded geometry the token buys is never expressed.
**Falsifier.** Show `0.05rem` is an optical correction against a specific ascent — no such rationale exists at `:139-143`, which discusses color only.

### D-17 · MINOR · The plate has inline padding and zero block padding
`:11` gives the `Card` `px-6 lg:px-8` and nothing on the block axis. Because raw children are passed instead of `CardHeader`/`CardContent`, glass-ui's `--card-pad-block` (= `--card-pad-inline × 1.272`, `components/card/styles.css`) is defined and never consumed. The header row (`:15`) and the preset line (`:71`) therefore sit flush against a `rounded-card` edge whose corner radius cuts into them, while the sides get 24–32 px. The φ-derived block/inline ratio glass-ui ships is discarded for an asymmetry of 24 : 0.
**Falsifier.** Show a block padding source in the resolved cascade for `.card` with raw children — `.card` declares the pad tokens only.

### D-18 · MINOR · The code artifact has no `dir="ltr"`
`:61` renders LTR CSS inside a `<code>` that inherits paragraph direction. Under an RTL document the bidi algorithm reorders the neutral runs — trailing `;`, `{`, `}`, `()` migrate — so the artifact displays mis-ordered even before D-2's uppercasing. The rest of the file is RTL-clean (see S-2), which makes this the single directional gap.
**Falsifier.** Show the demo cannot be rendered RTL — no `dir` handling was found either way, so this is a latent rather than an active defect.

### D-19 · MINOR · The comment asserts props the template does not pass
`:3-5` — "`tier="resting" surface="glass"`". `:9-13` passes only `:shadow="false"`. The register is in fact reached, but by an **undeclared vendor default chain**: `material` defaults to `"elevated"` and `Surface`'s private map `{ elevated: "resting" }` derives the tier (`dist/Surface-DOHf5u2R.js`). `DESIGN.md:69-71` (§3) mandates the stage plate be glass `tier="resting"` with `:shadow="false"`, and `style.css:203-208` keys its tint reclaim on `[data-tier="resting"]` — both hang off a mapping this component neither writes nor cites. A glass-ui minor bump that retunes the map silently drops the plate off both.
**Falsifier.** The map was read and currently resolves correctly — this is a fragility and a comment/code divergence, not a live breakage. It dies if glass-ui documents the material→tier map as a stable public contract.

### D-20 · MINOR · No loading, error, or refusal state for the async artifact
`useCompiledEntry.ts:47` seeds `""`; `:65-77` fills it after `await loadAnimationEngine()`; `:76` writes only `out.css`. The panel therefore has three states and one presentation: pre-resolve (shows `springCss` under a `compileToEntry()` label), success, and refusal (`entry.ts:452-455` returns `css: ""`, indistinguishable from pre-resolve). No skeleton, no `aria-busy`, no refusal surface — even though `entry.ts:99-107` returns a fully structured `{ eligible, refusals[] }` designed to be shown. A demo whose thesis is "the emitter refuses honestly with a **named reason**" (`entry.ts:26-32`) discards the names.
**Falsifier.** Show a consumer of `out.refusals` anywhere in the demo — `useCompiledEntry.ts` is the sole call site.

### D-21 · MINOR · Prose: one phrase twice, one cliché, one non-decision
`:18` "eased by springLinearStops()" and `:72` "eased by" — the same lead-in twice inside one plate, once as a header caption and once as a footer label, describing two different things (`springLinearStops` output vs the preset name). `:33` "Hello, spring." is the hello-world riff. `:41` `emphasis="secondary"` is glass-ui `Button`'s **default** (`dist/button-B7c944jy.js`, `emphasis: { default: "secondary" }`) — a prop that asserts a non-decision and reads as a considered choice.
**Falsifier.** Taste is arguable for `:33`; `:18`/`:72` and the redundant prop are mechanical.

### D-22 · MINOR · Decorative icons are not hidden from AT
`:46` `<component :is="visible ? EyeOff : Eye" class="w-4 h-4" />` and `CopyButton.vue:8-12` render lucide SVGs with no `aria-hidden="true"`. The label text at `:45` already carries the meaning, so the icon is decorative and should be removed from the a11y tree.
**Falsifier.** Show `@lucide/vue` emits `aria-hidden` by default — the `.d.ts` surface does not indicate it; **UNPROVEN-NEEDS-LIVE** against a rendered tree.

### D-23 · MINOR · The copy control is a 16 × 16 px target with zero padding
`:59` sizes `CopyButton` `w-4 h-4`; `CopyButton.vue:5` declares `p-0 m-0` and both icons are `position: absolute` (`:105-112`), so the button has no intrinsic box — 16 × 16 CSS px total, on a demo that supports touch (`style.css:219` `touch-action: manipulation`). glass-ui ships `@utility touch-hit-area` with a `--touch-target: 2.75rem` coarse-pointer expander (`a11y-overrides.css:1`) and it is not used.
**Falsifier.** WCAG 2.2 SC 2.5.8 is very likely **met** here via the spacing exception — the button is alone in its row (`:57`), so no other target's 24 px circle intersects. This is therefore an **ergonomics** claim, not a conformance claim, and it dies if 16 px is ruled acceptable for a secondary affordance.

---

## SUPERLATIVES (L-18, the other direction)

### S-1 · The `transition-behavior` split is genuinely correct craft
`:172-179` writes the shorthand list and then `transition-behavior: allow-discrete` as a **separate** declaration, with the reason stated: "a non-supporting engine still honors the opacity/translate/scale list." This is exactly right — an engine that does not know `transition-behavior` would discard the whole shorthand had it been folded in, silently killing the eased opacity/translate/scale. Most implementations of this pattern fold it and lose the fallback.
**Falsifier (runs both ways).** Show a target engine that parses `transition-behavior` inside the shorthand but not standalone — no such split exists in the CSS Transitions L2 grammar.

### S-2 · The entry/exit choreography is RTL-clean by construction
`:169`/`:185`/`:194` move on the block axis only (`translate: 0 1.25rem`), and every scoped padding is symmetric (`:146`, `:163`, `:204`). No `left`/`right`, no inline-axis translate, no directional shadow. The whole motion design survives a `dir="rtl"` flip with zero logical-property rewriting — which is more than most translate-based entrances manage.
**Falsifier.** Find an inline-axis or physical-side declaration in `:134-215` — there is none. (D-18 is a bidi *text* gap, not a geometry gap; the geometry is clean.)

### S-3 · Independent `translate`/`scale` rather than a `transform` list
`:169-170`, `:186-187`, `:195-196` animate the standalone `translate` and `scale` properties instead of packing them into `transform`. Each therefore carries the spring `linear()` on its own timeline with no transform-list matching or interpolation artifacts, and each is independently overridable. This is the modern correct choice and the file makes it consistently across all three states (base, `@starting-style`, `.is-hidden`).
**Falsifier.** Show a target engine in scope that supports `@starting-style` but not independent transform properties — the support sets are effectively co-extensive (both Chromium 117+/Safari 26 era, per `entry.ts:5-7`).

### S-4 · The K.W4 S5 de-duplication is the right call, correctly reasoned
`:64-77` retires a 4-preset picker that was rendered three times across the scene and replaces it with one quiet result line naming the active preset, with a `"custom"` fallback (`:103-110`) so the readout stays truthful when the shared params match nothing canonical. Identifying triple-surfacing, killing the redundant copies, and demoting rather than deleting the information is a textbook elision. It is cited here in full knowledge that D-1 is the same defect left standing four lines above — the instinct is present and correct, it was simply not turned on the component's own primary verb.
**Falsifier.** Show the retired picker had an affordance the result line does not carry — the `1e-6` epsilon match plus the `custom` fallback preserves the read; only the *write* moved to the rail, which is where the law puts it.

### S-5 · `CopyButton`'s AT announcement pattern is more careful than the norm
`CopyButton.vue:13-15` places one `sr-only` `role="status" aria-live="polite"` sink so the copy is announced without any visual duplication, `:4` swaps the `aria-label` to "Copied to clipboard", and `:57-60` clears then re-sets the message inside a `requestAnimationFrame` so a **repeat** copy of identical text re-announces instead of going silent on an unchanged text node. That last detail is the one most implementations miss.
**Falsifier.** Show the rAF re-arm is unnecessary — a live region whose text content does not change is not guaranteed to re-announce, which is the bug this defends against. (This praise is orthogonal to D-5: the same file's PRM gap stands.)

---

## KILLED HYPOTHESES (recorded so they are not re-litigated)

**K-1 — "the plate never reaches `tier="resting"`, so §3 and the `style.css:203` tint reclaim both miss."** Hypothesised from `:3-5` naming props the template does not pass and glass-ui `Card` declaring `tier: {}` with no default. **Killed** by `dist/Surface-DOHf5u2R.js`: `v = deep ? "floating" : (tier ?? { content:"quiet", elevated:"resting", functional:"floating", overlay:"overlay" }[material])`, with `material` defaulting to `"elevated"` → `data-tier="resting"`, plus `resolveSurfaceClass` → `.glass-resting`. The register **is** reached. Survives only as the much weaker D-19.

**K-2 — "`text-small text-muted-foreground` on the 14 % wash fails WCAG 1.4.3 AA in both arms (4.20–4.35 : 1)."** Computed first against `--muted-foreground: var(--neutral-5)` from `tokens/color-radius.css`. **Killed** by `glass/ladder.css`, which repoints `--muted-foreground: var(--on-glass-muted)` on `:where(.glass-resting, …)` — `hsl(30 26% 35%)` light / `hsl(34 16% 72%)` dark. Recomputed against the modelled plate: **4.77 / 4.67 : 1 — passing.** Demoted to D-11 (thin margin, unreferenced dependency), with the failing counterfactual (3.95 / 3.51) recorded as the reason the margin matters. This was to have been the third BLOCKER; the tree said no.

---

## Provenance of the derived numbers

`--accent-kf` `style.css:130` · `--color-progress` `style.css:163` · `--foreground` / `--muted` / `--neutral-*` `glass-ui tokens/color-radius.css` + `tokens/dark-arm.css` · `--on-glass-muted` `tokens/on-glass-fg.css` + `tokens/dark-arm.css` · `--glass-bg-resting` / `--glass-opacity-resting` `tokens/glass.css` · `--glass-tint-strength-{floor,aa}` `tokens/glass-fx.css` + `tokens/dark-arm.css`, with `aa` pinned to `0%` by `style.css:203-208` (so the `clamp()` returns its `floor`) · `--type-*` `typography/scale.css` · `text-{heading,title,small,caption}` `typography/semantic.css` · `text-mono-{caption,small}` `typography/utilities.css` · `--duration-slow` / `--type-tracking-caps` / `--z-*` `tokens/scheme-motion.css` · `--radius-{pill,lg,md}` `theme/radius.css` + `components.css`.

**Model assumptions, stated so they can be attacked.** (i) `--glass-level` was not found in the token sheets and is taken as `1`; (ii) `backdrop-filter: blur()` is treated as luminance-preserving over a uniform substrate, which holds for the flat `--background` and not for the graph-paper stage field (`DESIGN.md:80-85`); (iii) `color-mix(in oklab, …)` for the plate tint is approximated in sRGB, a sub-1 % luminance effect at 4–12 % strength; (iv) the `@container style(--glass-backdrop: light)` branch of `glass/ladder.css` is taken as **not** matching, since `tokens/glass-fx.css` sets `--glass-backdrop: dark` at `:root` and `.glass-resting` — unlike `.glass-floating`/`.glass-overlay` — does not re-declare it. If (iv) is wrong, `--muted-foreground` resolves to `var(--foreground)` and every muted ratio improves, strengthening K-2's dismissal and D-11's demotion.
