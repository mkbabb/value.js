# CHALLENGE-C (r3) — `demo/workbenches/mix/MixResultDisplay.vue` — implementation is defective

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]` (1M context)** — the model this
seat was explicitly spawned with. Declared, not inherited.

---

## Verdict: **DEFECTIVE** — 1 BLOCKER, 11 MAJOR, 4 MINOR, 4 INFO

Two prior passes of this seat exist, preserved verbatim at `challenge-C-implementation.r1-prior.md`
and `challenge-C-implementation.r2-prior.md`. **I ran every probe and wrote every finding before
opening either.** I discovered the priors only when the write refused an unread file — which is the
best possible accident for a third pass, because it means the overlap below is a third independent
witness and the disagreements are real disagreements.

The result: r2's BLOCKER and every one of its MAJORs reproduce under my apparatus. I add **six new
defects**, and I **correct r2's own correction** of r1 — with pasted output — on a point where r2
overreached and, in overreaching, prescribed a cure that would ship a bug.

Headline unchanged, now on a third witness: **`data-mix-target` at `MixResultDisplay.vue:69` does not
exist in the shipped DOM.** What r3 adds to it is that **fixing the attribute is not sufficient** —
N-1 below measures a second, independent 239 ms failure on the same anchor, on every re-mix, which
survives the obvious fix.

---

## Substrate and apparatus

- Branch `tranche-u`. **HEAD drift from the work order:** the order names `c654824e`;
  `git rev-parse HEAD` → `f36f780c5938390b8dc93cd87920418e82cdd81a`. `MixResultDisplay.vue` is
  untouched between them (last edit `f2c8f565`, the Glass 7.0.0 adoption), so every finding holds at
  both.
- Read whole: the SFC, `MixPane.vue`, `MixSourceSelector.vue`, `composables/useMixingState.ts`,
  `MixAnimationCanvas/composables/{useMixingAnimation,mixStage}.ts`, the glass-ui 7.0.0 dist for
  `WatercolorDot` / `DockControl` / `useClipboard`, both e2e specs, `o7-card-census.spec.ts`, and the
  visual REPORT + `shots/safari-desktop-light/mix.png`.
- Apparatus: 9 Playwright scripts against the live dev server, **Chromium and WebKit**, desktop
  1440×900 and mobile 390×844 (`hasTouch`, `isMobile`, dpr 3). Unreachable states (see D-1's
  corollary) were forced through the live `MixPane` instance's own `setupState` — its real reactive
  source, no stubs. Scripts: `scratchpad/WBMRD-probe{1..9}.mjs`; screenshots `WBMRD-plate-*.png`.
- Independently of r2 I hit the same headless-rAF trap it discloses, and worked around it the same
  way (driving `startMix` and sampling across real frames rather than trusting one window). r2's
  *Disproved* section is correct and I second it: **the phase machine does not strand.**

---

## The governing mechanism (three passes agree)

Glass 7's `WatercolorDot` is `inheritAttrs: false` and forwards **only** `class` and `style`:

```js
// node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
E = e(c({ inheritAttrs: !1, __name: "WatercolorDot",
  props: { color, variant, animate, cycleDuration, range, seed },
  setup(e) { let t = e, n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style); …
    return (t, n) => (d(), o("span", { "aria-hidden": "true", class: l([c.value, …]),
      "data-testid": "watercolor-swatch", "data-variant": e.variant,
      style: u([f.value, { …, pointerEvents: "none", … }]) }, [ … ]));
```

No `mergeProps($attrs)`, no `tag` prop, no `renderSlot`, root hardcoded `aria-hidden="true"` and
`pointer-events: none`. `MixResultDisplay` still calls it in the Glass-5 shape. Note the contrast one
file over: `MixSourceSelector.vue:127-132` stamps `data-mix-source` on the **wrapper div** and works;
`MixResultDisplay.vue:69` stamps the **component** and does not. That one-word difference is the
blocker.

---

# NEW IN r3

## N-1 · MAJOR · **NEW** — the anchor arrives **239 ms late on every re-mix**, and the obvious D-1 fix does not cure it

This is r3's most consequential finding, because it invalidates the cure both priors reach for.

`useMixingAnimation.ts:169-183` watches phase at `flush:"post"` with this comment:

> *"flush:'post' — the ghost well ([data-mix-target]) mounts in the same reactive flush that opens the
> mixing window; measure after the DOM patch."*

Measured on a **re-mix** (`done` → `mixing` — the second and every subsequent mix in a session),
sampling every `requestAnimationFrame` from the `startMix()` call:

```
=== (e) RE-MIX: when does the ghost well enter the DOM after startMix()? ===
[ { t:   3, ghostClass: true, innerFirstChildIsWell: false,
    innerCls: "flex flex-col gap-3 vj-morph-leave-from vj-morph-leave-active" },
  { t: 239, ghostClass: true, innerFirstChildIsWell: true,
    innerCls: "flex items-center gap-3 vj-morph-enter-from vj-morph-enter-active" } ]
```

At **t = 3 ms** — when `collectStage` runs — the plate's inner node is the *content* branch playing
its **leave**. The ghost well, which is the anchor's host, enters at **t = 239 ms**.

The cause is structural and one line up: `MixResultDisplay.vue:60` is
`<Transition name="vj-morph" mode="out-in">`. `out-in` **serialises** leave-then-enter by
construction, so on any `ghost` false→true flip the destination provably does not exist in the DOM at
`flush:"post"`. The docstring's claim is false, and it is false for a reason no amount of attribute
plumbing removes. `MIX_ARRIVE_MS` is 700 ms: the drops are a third of the way across before the
target element exists at all.

**Why this matters to D-1.** Both priors cure D-1 by getting the attribute onto something —
r1/my-own-first-instinct via the wrapper `div`, r2 via a `useTemplateRef` handed to the composable.
**Neither survives this measurement**, because both still resolve the anchor from inside the `out-in`
swap: the wrapper `div` *is* the branch that mounts at t=239, and a `useTemplateRef` on the dot is
`null` for the same 239 ms. The anchor's real defect is not *how* it is addressed but *where it
lives*.

**Cure.** The announced destination must be **persistent** — outside the branch that hides it. Hoist
the well container out of the `<Transition>` so both phases render into one stable box (that is also
what the component's own words demand: *"the plate stands as the announced destination"*, line 12-14
— a destination that unmounts for 239 ms is not announced), and stamp the anchor there. This
subsumes D-1's attribute fix and is the same move that fixes r2's D-10′ remount.

**Reproduction.** `node …/scratchpad/WBMRD-probe5.mjs`, section `(e)`.

---

## N-2 · quantification of D-1 — the miss is unbounded and worst on mobile

r2 measured the guessed landing point but not the error. I measured both, re-implementing
`mixStage.ts`'s `layoutCenter` in page context and comparing the fallback against the real well:

| viewport | operand chips | fallback used | real well | **miss** |
|---|---:|---|---|---:|
| 1440×900 | 2 | (720, 630) | (797, 634) | **77 px** |
| 1440×900 | 8 | (720, 630) | (797, 699) | **103 px** |
| 390×844 | 8 | (195, 590.8) | (76, 692) | **156 px** |

The well's radius is 28 px. On mobile the pool lands **156 px** from the plate — 119 px of it in x,
**30 % of the viewport width**. The error is unbounded by construction: `root.scrollHeight * 0.7` is a
fixed fraction while the plate's true y moves with chip count and palette rows.
(`WBMRD-probe7.mjs`, `WBMRD-probe8.mjs`.)

---

## N-3 · MAJOR · **NEW** — Reset destroys focus; r2's "focus order is clean" negative is incomplete

r2 records focus as a proved negative: *"Focus order is clean — measured focusables: [Copy, Save,
Reset], all tabIndex 0, DOM order = visual order."* That measures **static order**. It does not
measure **focus management**, and the component fails there. Measured — focus Reset, press Enter:

```
=== focus before reset === Reset
=== focus AFTER reset  === { "tag": "BODY", "title": null, "isBody": true, "plateStillThere": false }
```

`emit('reset')` → `MixPane.reset()` nulls `mixResult` → the `v-if` at `MixPane.vue:113` unmounts the
subtree containing the focused button → focus falls to `<body>`. A keyboard user is dumped to the top
of the document, silently (there is no live region to say what happened — D-4). WCAG 2.4.3.

**Cure.** The control that destroys a region owns where focus goes next: `MixPane`'s `reset` handler
moves focus to the Mix button, the control that re-creates the plate.

**Reproduction.** `node …/scratchpad/WBMRD-probe4.mjs`, focus section.

---

## N-4 · **CORRECTS r2's D-10′** — `vj-enter` *does* fire, on a path r2 did not exercise, and it animates the **wrong dot**

r2 corrected r1 by measuring **zero** `vj-*` class mutations on any swatch and concluding: *"Fixing
`:key` alone resurrects nothing."* The first half is right for the path r2 drove (the ghost→done
flip, where `mode="out-in"` remounts the group and `TransitionGroup` does not animate an initial
render without `appear`). **The conclusion is too strong**, and the overreach is load-bearing,
because r2's prescribed cure — add `appear` and/or stop the remount — is precisely what unmasks the
index-key bug it retracted.

Measured with a `MutationObserver` over `document.body` on the **settled-plate `colors` change**
path (plate already inked, `colors` array replaced, no ghost flip):

```
=== vj-* class mutations on swatches during a SETTLED-plate colors change ===
[ { bg: "oklch(0.65 0.13 160)", cls: "vj-enter-enter-active vj-enter-enter-to" },
  { bg: "oklch(0.65 0.13 160)", cls: "vj-enter-enter-active vj-enter-enter-to" } ]
```

The group animates. And it animates the **wrong element**: the colour that entered was blue at slot
0; the dot that got the enter classes is the one wearing `oklch(0.65 0.13 160)` — an *unchanged*
colour that merely shifted slots. Isolated cleanly by prepending to a two-colour result:

```
=== (d) PREPEND — which node carries the enter class? ===
[ { i: 0, bg: "rgb(0, 0, 255)",  entering: false, cls: "" },          ← the NEW colour
  { i: 1, bg: "rgb(255, 0, 0)",  entering: false, cls: "" },
  { i: 2, bg: "rgb(0, 255, 0)",  entering: true,
          cls: "vj-enter-enter-active vj-enter-enter-to" } ]          ← an OLD colour
```

That is exactly r1's index-key mechanism (`MixResultDisplay.vue:99`), alive and measured.

**The honest synthesis, which neither prior states:** there are **two** defects stacked on the same
row, each masking the other. r2's remount kills the animation on the shipping path; the index key
mis-attributes it on every other path. Fix either alone and you ship a bug — fix the remount (r2's
cure, and N-1's) and the group starts animating the wrong dot on every re-mix. **They must be fixed
together.**

**Reproduction.** `node …/scratchpad/WBMRD-probe9.mjs` (observer) and `WBMRD-probe5.mjs` §(d).

---

## N-5 · MAJOR · **NEW** — index-derived seeds re-shape *every* silhouette on any reorder, breaking the component's own stated law

`MixResultDisplay.vue:104` derives the shape `seed` from the slot index
(`:seed="i === 0 ? 'mix-result' : \`mix-result-${i}\`"`), and `WatercolorDot` hashes
`color + seed`. So a dot's silhouette is a function of *where it sits*, not *what it is*. Measured —
palette `[red, green]` → `[blue, red, green]`:

```
=== (d2) seeds/silhouettes before vs after prepend ===
before: ["63.3195% 69.2579% 73.6518% 53.4382% / …", "66.5203% 21.7646% 75.1577% 48.9561% / …"]
after:  ["71.7642% 59.0639% 39.7337% 53.6442% / …", "50.7344% 43.0638% 34.6464% 57.2503% / …",
         "66.2816% 21.6820% 35.1419% 40.4919% / …"]
```

Red and green are both still on the plate and **both wear entirely new shapes**. This contradicts the
docstring's own law, lines 16-17: *"the silhouette the pigment poured into is the silhouette the
result wears."* It is true only for slot 0.

**Cure (shared with N-4).** Key and seed from colour identity, not slot:
`:key="color.css + '@' + color.position"`, `:seed="i === 0 ? 'mix-result' : color.css"`. A dot then
keeps its silhouette across re-mixes and TransitionGroup's FLIP tracks the real moves.

---

## N-6 · deepens D-11 · **CI runs no Playwright at all**

r2 established both e2e specs are RED. It did not establish whether anything runs them. Nothing does:

```
$ grep -rln playwright .github/
(no matches)
$ ls .github/workflows/
ci.yml  deploy-pages.yml  release.yml
```

So the gate is not merely failing — it is **not executed**. The vacuous-mutation argument is
therefore stronger than r2 states: the mutant is behaviourally indistinguishable not just from the
shipped state but from *any* state, because no automated observer ever looks.

---

## N-7 · **NEW** — a third gate names this component and silently skips it

`e2e/smoke/oracles/o7-card-census.spec.ts:181` registers `mixPlate: fixture(".mix-plate")` — and line
299 is:

```ts
if (!fx) continue; // conditionally-mounted fixture absent here
```

The plate cannot mount in that run (D-1's corollary: the add-slot is inert), so the census skips it
every time, in both schemes, without a word. r2's grep (`"MixResultDisplay\|mix-result"`) could not
find this — the file says `.mix-plate`. Three gates now name this component; **all three are
vacuous**, by three different mechanisms: RED-before-reaching-the-assertion (`views/mix.spec.ts`),
never-executed (CI), and skip-if-absent (`o7`).

---

## N-8 · sharpens D-6 from a code-read to a measurement — the confirmation *lies*

r2 files the stale copy confirmation by reading that `invalidate()` is never destructured. I measured
the lie end-to-end, including the clipboard's actual contents:

```
=== copy-confirm right after click ===
{ "title": "Copied!", "icon": "lucide lucide-check-icon lucide-check w-5 h-5" }

=== copy-confirm AFTER result swapped (invalidate() never called) ===
{ "title": "Copied!", "icon": "lucide lucide-check-icon lucide-check w-5 h-5",
  "shownCss": "oklch(0.2 0.05 90)", "clipboardHolds": "oklch(0.6 0.12 200)" }
```

The plate displays `oklch(0.2 0.05 90)` under a green check reading "Copied!" while the clipboard
holds a **different colour**. This is not a missing confirmation; it is a false affirmative about a
value the user is about to paste. Severity holds at MAJOR but the character changes: silence would be
better than this. (`WBMRD-probe6.mjs`.)

---

## N-9 · sharpens D-12 — 28 px confirmed under a genuinely coarse pointer

Measured in **WebKit** at 390×844 with touch, where the density clamp is supposed to apply:

```
{ "pointerCoarse": true,
  "buttons": [ { title: "Copy color", w: 28, h: 28 },
               { title: "Save to palettes", w: 28, h: 28 },
               { title: "Reset", w: 28, h: 28 } ] }
```

`matchMedia("(pointer: coarse)")` is **true** and the controls are still 28 px, so `DockControl`'s
docstring guarantee — *"the HIT CELL stays the full `--dock-control-size` (≥44px on coarse via the
density clamp)"* — is not merely unmet on desktop; the clamp does not reach `compact` outside a dock
at all. Same absent-token family as D-15. Still above the repo's own 24 px bar
(`capture.mjs:98`) and WCAG 2.5.8; below 2.5.5 and the 44 pt platform floor — on a destructive
control (Reset) with no undo.

---

# CONFIRMED INDEPENDENTLY (r2's ledger, third witness)

Each of these I measured before reading r2. Restated compactly with **my** output.

**D-1 · BLOCKER — `data-mix-target` never reaches the DOM.**

```
=== T+50ms GHOST WINDOW ===
{ "phase": "mixing", "dataMixTargetCount": 0,
  "plateGhostClass": "mix-plate … mix-plate--ghost vj-morph-enter-active vj-morph-enter-to",
  "plateHTML": "…<span aria-hidden=\"true\" class=\"shrink-0 w-14 h-14 watercolor-swatch\"
                data-testid=\"watercolor-swatch\" data-variant=\"ghost\" style=\"…\">…" }
```

`mixStage.ts:121-124` then takes the silent fallback for every mix that ships. Quantified in N-2;
re-cured in N-1.

**Corollary — the flow is unreachable.** `MixSourceSelector.vue:164-176` passes `tag="button"`,
`aria-label`, `@click` and a `<Plus>` slot to `WatercolorDot`. Measured: it renders
`<span aria-hidden="true" class="add-slot-ghost … " style="…; pointer-events: none; …">`, and
`anyAriaLabelAdd: 0`. Not a button, not focusable, not clickable, no glyph. This is why
`shots/safari-desktop-light/mix.png` shows an empty "Selected" well with one dashed slot and a
disabled Mix button — **the plate appears in none of the 60 visual captures**, so the REPORT's
`/#/mix` rows are a coverage gap, not a clean bill.

**D-2 · MAJOR — dead props; a palette result has no readable value.**
Measured: `dotTagNames: ["SPAN","SPAN","SPAN"]` (`tag="div"` at :67/:81/:100 is not a prop);
`dotTitles: [null,null,null]` (`:title` at :103 dropped — and moot regardless, the dot is
`pointer-events: none`). AT-visible text of a 3-colour palette result, walking text nodes and
excluding `aria-hidden` subtrees:

```
{ "atVisibleText": ["Result"], "buttonNames": ["Copy color","Save to palettes","Reset"],
  "ariaHiddenChildren": 7 }
```

Note the internal contradiction r3 adds: the **single-colour** branch *does* expose its CSS string
(:85-87). Same component, two contradictory contracts. Screenshot `WBMRD-plate-palette.png`: five
dots, a gradient bar, three unlabelled icons, no text.

**D-3 · MAJOR — the scoped `.mix-plate` shorthand deletes two thirds of `vj-morph`.** Confirmed:

```
=== r2 D-3 · transition channels on .mix-plate ===
{ "plate":          { "prop": "opacity",                       "dur": "0.2s" },
  "vjMorphFamily":  { "prop": "opacity, transform, max-height","dur": "0.2s, 0.44s, 0.3s" } }
```

The `transition` *shorthand* at :153 resets `transition-property`; scoped `.mix-plate[data-v-…]`
outranks `.vj-morph-enter-active`. The 0.44 s transform and 0.3 s height channels are gone on this
element. Edicts 5 and 6.

**D-4 · MAJOR — async result silent to AT; buttons named only by `title`.** Measured live regions in
the entire document: the dock status lamp (`role=alert`) plus four `aria-live="off"` channel meters —
**nothing in or near the plate**. The result arrives ~900 ms after activation
(`MIX_CONVERGE_MS`) and is announced to nobody; the copy confirmation is a `title` swap, which no
screen reader announces. Three buttons, `aria-label: null`, text `""`. By the repo's own rule
(`capture.mjs:102-105`) this component contributes 3 nameless buttons the moment a result renders —
latent in REPORT only because the capture can never mix.

**D-5 · MAJOR — clipboard failure completely silent.** `copy()` never throws; it resolves
`{ok:false, reason}` and parks `status="failure"` (dist `useClipboard-D36OTaeT.js`). `:32` reads only
`success`; `:42-47` discards the `CopyResult`; `onCopyError` unset. Measured with
`navigator.clipboard` removed — the non-secure-context path the repo hits over LAN http
(`vite.config.ts` `server.host: true`, reason `"no-api"`):

```
=== copy button BEFORE (no clipboard API) === <button … title="Copy color" …><svg … lucide-copy …>
=== copy button AFTER  (no clipboard API) === <button … title="Copy color" …><svg … lucide-copy …>
=== changed? === IDENTICAL — zero feedback on failure
```

And the dist arms its reset timer on the success branch only, so `failure` is sticky forever.

**D-6 · MAJOR — stale confirmation.** Sharpened to a measured false affirmative in N-8.

**D-7 · MAJOR — two divergent copy implementations.** `MixResultDisplay.vue:43-46` and
`MixPane.vue:51-53` are the same expression character for character; the plate uses `useClipboard`
(confirmation), the pane's `copyResult` — exposed at `MixPane.vue:57` and routed from the dock — uses
`writeClipboard` (none). Edict 2.

**D-8 / D-16 · MAJOR — an empty palette result paints the *previous* result's gradient.** Confirmed,
and confirmed on both engines independently of r2. `:91` guards truthiness, not length, so `[]` is
truthy and `:112` assigns `linear-gradient(to right, )` — invalid; the CSSOM rejects the assignment
and **keeps the prior declaration**:

```
=== (a) STALE GRADIENT on empty palette ===
{ "afterStyle":    "background: linear-gradient(to right, rgb(255,0,0), rgb(0,255,0), rgb(0,0,255));",
  "afterComputed": "linear-gradient(to right, rgb(255,0,0), rgb(0,255,0), rgb(0,0,255))",
  "dotsLeft": 0, "plateText": "Result" }

=== (c2) WebKit: is a ONE-stop linear-gradient valid? ===
{ "oneStopAccepted": "linear-gradient(to right, oklch(0.7 0.15 30))",
  "zeroStopLeaves":  "linear-gradient(to right, oklch(0.7 0.15 30))" }
```

Zero swatches, full three-colour bar — see `WBMRD-plate-stale-gradient.png`. Sibling site, same
truthiness bug: `MixPane.vue:44` persists an **empty palette** via `pm.createPalette("Mixed Palette", [])`.
I also confirm r2's retraction: a one-stop gradient is accepted by both engines (though it remains
invalid per CSS Images 3 `<color-stop-list>`, so it survives on leniency, not on spec).

**D-9 · MINOR — `MixResult` permits blank states.** `useMixingState.ts:32-36` is non-discriminated
(`css?` / `colors?`). Measured `{type:"color"}` with no `css` → `{ plateText: "Result", dots: 0,
buttons: 3 }`: three live controls over nothing, and Copy writes `""` and reports success.

**D-11 · MAJOR (test truth) — vacuous gate.** Ran it:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --reporter=line
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', …).getByRole('button', { name: 'Add current color to the mix' })
    Error: element(s) not found
      > 42 |     await expect(addSlot).toBeVisible();
  1 failed
```

Dies at line **42**, so `views/mix.spec.ts:52`'s and `safari/mix-flow.spec.ts:40`'s `[data-mix-target]`
assertions have never been evaluated. No unit test exists
(`find test -name '*.ts' | xargs grep -l MixResult` → empty). Deepened by N-6 (CI runs none of it) and
N-7 (a third gate skips silently).

**D-15 · MAJOR — `<DockSeparator/>` is 1 × 0 px yet exposes `role="separator"`.** Confirmed exactly:

```
=== r2 D-15 · DockSeparator ===
{ "found": true, "tag": "DIV", "cls": "dock-separator", "role": "separator",
  "w": 1, "h": 0, "cssH": "0px", "cssW": "1px", "varH": "",
  "bg": "color(srgb 0.11 0.098 0.09 / 0.15)" }
```

`--dock-separator-height` resolves to `""` — it is minted on `.glass-dock` only, and the plate is a
`Card`. A dead visual with a live semantic: AT hears a division sighted users cannot see, and the
intended grouping (destructive Reset held apart) is carried by margin alone. Edict 4.

**D-17 · MINOR — `.swatch-row` leave rule has no positioned ancestor.** Confirmed:

```
=== r2 D-17 · .swatch-row position ===
{ "position": "static", "nearestPositionedAncestor": "DIV.glass-resting.card" }
```

`utils.css:177-179` absolutely-positions a leaving dot; it would resolve against the pane `Card` and
fly to its corner. **N-4 upgrades this from latent to live-on-fix**: the moment the group animates
(which r2's own D-10′ cure causes), the leave rule is reachable.

**D-12 / D-13 / D-14 · INFO.** 28 px targets (sharpened in N-9); `useClipboard({resetMs: 1500})` at
:31 restates the library default (`i.resetMs ?? 1500` in the dist); `TransitionGroup` imported at :4
while `Transition` at :60 is left to auto-resolution — both auto-resolve, so the import is dead and
the file contradicts itself. Plus r2's observation that `:123`'s `"Copy color"` is the wrong label in
palette mode, where `:44-45` copies N colours.

---

## Checks that came back clean (negatives, proved)

- **`verbatimModuleSyntax`** — compliant. `:7` is `import type { MixResult }`; all other imports are
  used values.
- **Vue 3.5 idiom** — reactive props destructure with default at `:20-23` compiles to `__props.result`
  accesses, so reads inside `computed` (:36-40) and the async handler (:42-47) are fresh. **No stale
  read.**
- **No `defineModel`** — the `WritableComputedRef` async-round-trip hazard has no site; the component
  is props-down / emits-up (:25-28).
- **No timers, listeners, observers or rAF owned here.** `useClipboard` registers `onScopeDispose`
  in the dist, so its 1500 ms timer cannot outlive the scope. **Zero PRM-RAF exposure.** The feature's
  one rAF is `useMixingAnimation.ts:88-114` via glass-ui `useRAFLoop` with `pauseWhenHidden: true`,
  an explicit `onBeforeUnmount` stop (:187), and a PRM fast-path that *completes* rather than pauses
  (:120-125) — correct, and its docstring reasoning is sound.
- **No `ValueUnit` wrapping, no oklch→HSV roundtrip, no `parseCssColor`.** The component consumes
  pre-formatted CSS strings; the `var(--muted-foreground)` fallback (:37/:39) reaches `WatercolorDot`
  only as a background / custom-property value and a hash input. Probed `{type:"color"}` with the
  `var()` fallback: no page error, no console error. The live `parseCssColor` crash class does not
  touch this file (it is upstream at `mixStage.ts:99-100`).
- **No WebGL.** `WatercolorDot` is CSS/SVG by design; the mix canvas is 2D.
- **No god module** — 158 lines, one job, one export.
- **The phase machine does not strand** — r2's *Disproved* section; I hit the same headless-rAF
  artifact and reach the same conclusion. Every early-return in `useMixingAnimation.ts:116-158` calls
  `onSettled()`, so stranding is impossible by construction. **Do not file.**
- **`/#/mix` route health** (`REPORT.md:123,138,153,168`): 0 page errors, 0 console errors, 0
  horizontal overflow, exactly 1 `main` across all four Safari matrices — but the plate contributes
  nothing to those numbers, because it never renders in any capture. A coverage gap, not health. The
  only console error I ever saw on the live pane was the dev-config `VITE_API_URL` notice.

---

## Ranked

| # | severity | status | defect |
|---|---|---|---|
| D-1 | **BLOCKER** | confirmed ×3 | `data-mix-target` dropped by glass-7 `inheritAttrs:false`; convergence lands on a silent guess (`mixStage.ts:124`). Miss measured 77 / 103 / **156 px** (N-2). Corollary: the same drop kills the add-slot, so `/#/mix` cannot mix at all |
| **N-1** | MAJOR | **NEW** | on a re-mix the anchor's host enters the DOM **239 ms** after `startMix()` (`mode="out-in"` vs `flush:"post"`); **both priors' cures for D-1 fail this test** |
| D-2 | MAJOR | confirmed | dead `tag`, dropped `:title`; a palette result's entire AT text is `"Result"` — while the colour branch does expose its value |
| D-3 | MAJOR | confirmed | scoped `.mix-plate` shorthand overrides `.vj-morph-enter-active`; transform + max-height channels deleted (edicts 5 & 6) |
| D-4 | MAJOR | confirmed | no `aria-live` on an async result; 3 buttons named only by `title` |
| D-5 | MAJOR | confirmed | clipboard `failure` never rendered, never reset — silent no-op on LAN-http mobile |
| D-6 | MAJOR | confirmed | copy confirmation **lies**: check mark + "Copied!" over a value the clipboard does not hold (N-8) |
| D-7 | MAJOR | confirmed | two divergent copy implementations; the dock routes to the one with no feedback (edict 2) |
| D-8/16 | MAJOR | confirmed | empty palette → invalid `linear-gradient(to right, )` → CSSOM retains the **previous** gradient; both engines |
| D-15 | MAJOR | confirmed | `<DockSeparator/>` measures 1 × **0** px yet exposes `role="separator"` — a dock primitive outside a dock (edict 4) |
| **N-3** | MAJOR | **NEW** | Reset unmounts the focused button → `activeElement === body`; r2's "focus order is clean" measured order, not management |
| **N-4** | MAJOR | **CORRECTS r2** | `vj-enter` *does* fire on the settled-plate path and animates the **wrong dot**; r2's remount and r1's index key are two stacked defects, each masking the other — fixing either alone ships a bug |
| **N-5** | MAJOR | **NEW** | index-derived seeds re-shape **every** silhouette on any reorder, contradicting the docstring's own "one shape" law (:16-17) |
| D-11 | MAJOR | confirmed | vacuous gate: 0 unit tests; both e2e specs RED at an earlier line; **CI runs no Playwright at all** (N-6); a third gate skips silently (N-7) |
| D-9 | MINOR | confirmed | `MixResult` permits blank states; the four masking `??` fallbacks are the symptom |
| D-17 | MINOR | confirmed | `.swatch-row > .vj-enter-leave-active { position: absolute }` over a `static` row — **live the moment N-4 is fixed** |
| D-12/13/14 | INFO | confirmed | 28 px targets under a *genuinely coarse* pointer (N-9) · redundant `resetMs` · inconsistent built-in import · `"Copy color"` mislabels the palette case |

---

## Family grouping (mechanisms, for the cure)

- **F-A · a declared thing the runtime silently declines to honour.** D-1, D-2, D-15, D-8/16, D-3 —
  an anchor, a `tag`, a separator, a gradient, a transition. Every one is *asserted* in source,
  comments and the design record while the runtime drops it, and **not one of them raises a
  diagnostic**: `vue-tsc` models unknown component attributes as fallthrough, invalid CSS assignments
  are no-ops, absent custom properties compute to nothing. This is the defect *class*; the missing
  attribute is one instance.
- **F-B · anchoring inside the thing that hides it.** N-1 — and it is why F-A's obvious fixes fail.
- **F-C · truthiness where length was meant.** D-8/16 (strip), D-9, `MixPane.vue:44` (persists an
  empty palette).
- **F-D · state the composable models and the component refuses to render.** D-5 (`failure`),
  D-6 (`invalidate`) — the primitive is strictly richer than the boolean projected off it.
- **F-E · identity by slot index.** N-4, N-5 — keys and seeds bound to position rather than to what a
  thing is.
- **F-F · the result is a live region that never says so.** D-4, N-3, and the `title`-only
  confirmation.
- **F-G · gates that cannot fail.** D-11 + N-6 + N-7 — three named gates, three different ways of
  observing nothing.

**The one sentence, r3's version:** a dependency major bump silently voided an attribute-forwarding
contract that nothing in this repository can observe, and two audit passes then converged on cures
that would not have worked — because the component's central anchor is not merely mis-addressed, it
is *absent from the DOM for 239 ms of every re-mix by the design of the transition that wraps it*.
