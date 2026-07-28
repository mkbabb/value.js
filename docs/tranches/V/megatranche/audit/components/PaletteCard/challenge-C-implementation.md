# CHALLENGE-C — PaletteCard: implementation interrogation · **PASS 3**

> Passes 1 and 2 are preserved verbatim at `challenge-C-implementation.pass-1-2026-07-27.md`
> and `challenge-C-implementation.pass-2-2026-07-27.md`. This is an **independent re-run**:
> I ran my whole probe battery against the live server before opening either. Findings are
> marked **NEW** (neither prior pass reached it), **CONVERGE** (independently re-measured —
> two unrelated method paths agreeing is stronger than either alone), **UPGRADE** (a prior
> pass argued it; I measured it), or **CORRECTION**.
>
> **Pass 3's mandate adds an axis the prior passes predate:** owner marks **MT-F036**
> (witnesses `audit/visual/owner-marked/OM-11-palette-card-shadow-artifacts.png`,
> `OM-12-palette-card-shadow-artifact-closeup.png`) — the hard-edged faceted shadow slab, and
> the interactive container that ships **no hover state**. Neither pass 1 nor pass 2 addresses
> either. Both are diagnosed to mechanism below (C3-1, C3-2, C3-3) and both resolve to
> **marked BJ asks**, never local patches.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, spawned with
an explicit Opus 5 declaration. The seat is declared, not inherited, not downgraded.

---

## Verdict

**DEFECTIVE.** Pass 2's five blockers stand; I re-measured three of them independently and none
withdrew. This pass adds **four NEW findings and one UPGRADE**, and issues **one CORRECTION**
against my own first reading.

The headline of pass 3 is the owner-mark mechanism, and it is worse than "a missing hover":

> **The card's entire declared motion identity is fiction.** `PaletteCard.vue:7-15` spends nine
> lines describing a "producer CARTOON REGISTER" that owns "the hover/press choreography
> (translate/scale on `--ease-cartoon-punch` @ `--duration-normal`, shadow bezier md→lg,
> `:active` squash, 2px border) + the lagging `.cartoon-cast` child". Measured against the
> installed glass-ui 7.0.0: the utility is **three declarations with no transition and no
> `:hover`**; a real mouse hover changes **zero** computed properties; the `.cartoon-cast`
> element is a **0×0 styleless inline span** because its stylesheet is never loaded; and the
> press drive is wired to `--card-press-t` while the cast reads `--cartoon-press-t` — **a
> variable name nothing in the repository ever writes.** Four independent mechanisms, one
> comment block, zero shipped behaviour.

Environment: brief cites `c654824e`; the six component files are unmodified since 2026-07-17.
Live probes against `http://localhost:9000`, `/#/palettes`, 5 seeded local palettes.

---

## Evidence apparatus (pass 3)

Fourteen probes, all against the running app; every number below was read out of the page.

| # | Probe | Result |
|---|---|---|
| P1 | `probe("cartoon-surface")` — computed transition legs through the real cascade | `transitionProperty: "all"`, `transitionDuration: "0s"` |
| P2 | full computed snapshot → **real Playwright `.hover()`** → snapshot → diff | `isHovered: true`, **`diff: {}`** |
| P3 | live card root `box-shadow` | 3 × zero-blur layers `-3/3`, `-5/5`, `-7/7` at α 0.46/0.38/0.26 |
| P4 | live `.cartoon-cast` computed | `display:inline`, `position:static`, `boxShadow:none`, `borderRadius:0px`, rect 0×0 |
| P5 | walk all 53 loaded stylesheets for `.cartoon-cast` rules | only `.liquid-enter.is-cel > .cartoon-cast`; the standalone rule absent |
| P6 | `grep` for writers of `--cartoon-press-t` across `demo/ src/` | **zero**; card writes `--card-press-t` |
| P7 | `pointerdown` on the "Palette menu" button, read the card root's inline style | `scale: 1.0092 0.9512` — the whole 462 px card squashes |
| P8 | `showFeedback` twice, 1500 ms apart, poll the chip every 250 ms | 2nd message lived **1005 ms** of a promised 2500 ms |
| P9 | filter the list to zero rows, read the pane's `cardRefs` + `isUnmounted` | **5 refs / 0 DOM, all `isUnmounted:true`, `elInDoc:false`** |
| P10 | menu → Rename, sample `activeElement` at t+0/100/300/600/1000 ms | `input` → `input` → **`button "Palette menu"`** |
| P11 | real mouse hover on a swatch, read the panel's computed style + rect | `position: static`, rect `{x:-195, y:844, w:390}`, `visible:false` |
| P12 | expanded card — enumerate every interactive descendant | exactly **1** (`Palette menu`, 36×36); 5 swatches are `aria-hidden` spans |
| P13 | class-probe the four icon-button recipes through the live cascade | 16×16, 18×18, 47.2×**23.6**, 28×28 |
| P14 | `npx playwright test o16-computed-cascade.spec.ts --project=smoke` | **2 failed** — dies at R2, never reaches the R4 cartoon assertions |

Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. This report and the pass-2 archive copy are
the only files written.

---

## The owner marks — MT-F036, diagnosed to mechanism

### C3-1 · BLOCKER (NEW) — MT-F036(b): the interactive container ships no hover state, and the "CARTOON REGISTER" comment documents behaviour that does not exist

`PaletteCard.vue:6-19` applies `'group rounded-card cartoon-surface border-card-edge bg-well
cursor-pointer'` under nine lines of comment claiming `cartoon-surface`

> owns the hover/press choreography (translate/scale on `--ease-cartoon-punch` @
> `--duration-normal`, shadow bezier md→lg, `:active` squash, 2px border)

The shipped rule, in its entirety
(`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css`):

```css
@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }
```

Three declarations. Of the comment's five claims, only "2px border" is true. There is no
transition, no `:hover`, no `:active`, no `translate`, no `scale`, and no md→lg shadow leg.
Corroborating greps:

```
$ grep -rno "cartoon-surface:hover[^}]*}" --include="*.css" node_modules/@mkbabb/glass-ui/dist
(no output)
$ grep -rn "cartoon-surface" demo/styles/ demo/**/*.css
(no output)          # no local override either
```

**P2 — the decisive measurement.** Full computed snapshot of the live card root, then a real
Playwright mouse hover (not a synthetic event), then re-snapshot and diff:

```json
{ "isHovered": true, "diff": {} }
```

Zero computed-style change under `:hover`. Not subtle — none. And the surface could not animate
one if it acquired it (**P1**):

```json
{ "transitionProperty": "all", "transitionDuration": "0s", "transitionTimingFunction": "ease" }
```

The owner's mark is confirmed mechanically. `--shadow-cartoon-hover` exists as a producer token
(`-4px 4px 0px 0px var(--cartoon-ink-lead)`) and is **referenced by nothing**.

**Cure — marked BJ ask, per the owner's instruction.** The hover register is designed at the
glass/card root; `cartoon-surface` must grow its hover leg (the token is already sitting there
unused) and the transition legs the demo's own O-16 oracle already asserts it has. A `:hover`
rule in `PaletteCard.vue`'s scoped block would violate edicts 4 and 5 and fork the register into
the demo — exactly the failure mode C3-2 documents.

**Ancillary:** the comment must go with the fix. It is not merely stale; it is why three
subsequent audit passes and one e2e oracle all assumed the register existed.

### C3-2 · BLOCKER (NEW) — MT-F036(a): the faceted slab is a three-layer zero-blur shadow, and `.cartoon-cast` is inert markup wired to a variable nothing writes

Two independent mechanisms produce OM-11/OM-12.

**(i) The slab.** **P3**, live card root:

```
box-shadow: oklab(0.34 0.0115 0.0277 / 0.46) -3px 3px 0px 0px,
            oklab(0.34 0.0115 0.0277 / 0.38) -5px 5px 0px 0px,
            oklab(0.34 0.0115 0.0277 / 0.26) -7px 7px 0px 0px
border-radius: 16px
```

Three stacked copies of the border box at 3/5/7 px, **blur 0**, spread 0, alpha 0.46 → 0.38 →
0.26. Zero blur plus three discrete offsets is a staircase by construction: at every corner the
16 px radius is traced three times, 2 px apart, with a visible alpha step between each — the
stepped grey terrace under both cards in OM-11 and, at 4× zoom, the three distinct facet bands
along the bottom edge in OM-12. This is MT-F027's mechanism class exactly. The value is
`--shadow-cartoon-md`, glass-ui-owned; the demo names no shadow of its own.

**(ii) `.cartoon-cast` is dead.** `PaletteCard.vue:28-30` emits

```html
<!-- the producer's inert cel cast (the exact child Card emits for surface=cartoon);
     rides --card-press-t, PRM-zeroed. -->
<span class="cartoon-cast" aria-hidden="true" />
```

**P4** — the live span:

```json
{ "tag": "SPAN", "display": "inline", "position": "static", "boxShadow": "none",
  "zIndex": "auto", "borderRadius": "0px", "translate": "none", "scale": "none",
  "rect": { "width": 0, "height": 0 } }
```

Every declaration the rule would apply is absent. **P5** — walking all 53 loaded stylesheets, the
only `.cartoon-cast` rules present are `liquid-enter.css`'s three
`.liquid-enter.is-cel > .cartoon-cast` variants; the card root carries no `.liquid-enter.is-cel`.
The standalone rule lives in `dist/styles/glass/glass-atom.css`, which **the demo never imports**.
The span is a 0×0 styleless inline node — pure dead markup.

**(iii) And it could not move even if the sheet loaded.** The rule reads

```css
.cartoon-cast { --cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t)); … }
```

`--cartoon-press-t` is a registered `@property` with `initial-value: 0`. **P6:**

```
$ grep -rn "card-press-t\|cartoon-press-t" demo/ src/
demo/…/PaletteCard.vue:29:      …rides --card-press-t, PRM-zeroed. -->
demo/…/PaletteCard.vue:260:     // …writing --card-press-t for
demo/…/PaletteCard.vue:264:         pressVar: "--card-press-t",
```

`useLiquidPress({ pressVar: "--card-press-t" })` writes `--card-press-t`; the cast reads
`--cartoon-press-t`. **A name mismatch: the press drive is connected to nothing.** Confirmed on
the live element — root inline style `--card-press-t: 0.0000; --flex-vel: 0.0000;`, cast
`--cast-travel: 0px`, `--cast-spread: 1`, permanently. Every other producer consumer passes a
name its own CSS reads (`--glass-btn-press-t`, `--dock-press-t`, `--timeline-press-t`); this call
site invented a fourth name and no rule to consume it.

**Cure.** Delete the `<span class="cartoon-cast">` and the `pressVar` override — they are demo
markup guessing at a producer contract, which is how the name drifted in the first place.
The slab is a **marked BJ ask**: `--shadow-cartoon-*`'s zero-blur triple-stack is the artifact
the owner marked, and if the cast/press choreography is wanted it must arrive whole from
`Card surface=cartoon` — emitting its own child, under its own variable name, with its own
distribution. A consumer must never hand-author a producer's internal element.

### C3-3 · MAJOR (NEW) — the press choreography fires for every pointerdown *inside* the card

`v-bind="press.handlers"` on the root (`PaletteCard.vue:24`) with
`:style="press.pressStyle.value"` (`:25`). Pointer events bubble, so any descendant press drives
the card's spring. **P7**, dispatching `pointerdown` on the "Palette menu" button of a 462×100
card:

```
at rest                        --card-press-t: 0.0000; --flex-vel: 0.0000;
menu-button pointerdown  +60ms --card-press-t: 0.7103; scale: 1.0068 0.9652;
menu-button pointerdown +180ms --card-press-t: 1.0120; scale: 1.0092 0.9512;   ← 4.9% squash
swatch pointerdown       +80ms --card-press-t: 0.8379; scale: 1.008  0.9591;
```

Opening the dropdown squashes the entire card by 4.9 % vertically. So does touching a swatch, the
drag handle, or the rename field. The gesture the press expresses — "I am pressing this card" — is
not the gesture that triggers it. Note the irony against C3-1: the card has *only* the motion it
did not intend, and *none* of the motion its comment describes.

Folds into pass 2's C-4 cure: once the disclosure is a real focusable button, `press.handlers`
belong on *that*, and the inner controls carry their own (glass-ui `Button` already does).

---

## UPGRADE — a pass-2 argument, now measured

### C3-4 · MAJOR (UPGRADE of pass 2 C-8 / pass 1 C-7) — the `cardRefs` retention is measured, not merely argued

Pass 2 filed this honestly as *"a retention argument, not a heap measurement — absence of
collection cannot be photographed."* It can be photographed, from the map itself. **P9**: filter
`/#/palettes` to zero rows, then read the pane's `cardRefs` and each entry's `isUnmounted` flag:

```json
{ "before": { "refs": 5, "dom": 5 },
  "after":  { "refs": 5, "dom": 0 },
  "retainedWhileFiltered": [
    { "k":"4320fe5d", "isUnmounted": true, "elInDoc": false },
    { "k":"10e237b7", "isUnmounted": true, "elInDoc": false },
    { "k":"88fd683f", "isUnmounted": true, "elInDoc": false },
    { "k":"96522800", "isUnmounted": true, "elInDoc": false },
    { "k":"191eb519", "isUnmounted": true, "elInDoc": false } ],
  "restored": { "refs": 5, "dom": 5 } }
```

Five **fully-unmounted** component instances, each still pinning its detached DOM subtree, held in
a `reactive` map with zero cards on screen. Vue does call the function ref with `null` on unmount;
`:ref="(el: any) => el && (cardRefs[k] = el)"` (`BrowsePane.vue:94`, `PalettesPane.vue:84`) makes
that call a no-op. The map is monotone in total rows ever rendered, and on `/#/browse` the wall
pages 50 at a time behind a load-more button.

Second, sharper consequence, which pass 2 did not draw:
`cardRefs[slug]?.showFeedback(...)` dispatched at a **retained-but-unmounted** instance writes a
ref on a destroyed component. It never renders. The optional-chain and the `if (card)` guards at
`BrowsePane.vue:229/238` see a truthy object and report success. **The user gets no verdict, and
no error.** This is the failure mode that makes pass 2's cure (make feedback *data*, delete
`defineExpose` and both maps) load-bearing rather than cosmetic.

---

## CONVERGE — independently re-measured, unchanged

Re-run from scratch; all three reproduce, with second measurements from different method paths.

### C3-5 · BLOCKER (CONVERGE, pass 2 C-2) — `.floating-panel` is declared nowhere; the hover panel renders off-screen

**P11**, after a **real Playwright mouse hover** on the first swatch of an expanded card at
viewport 390×844 (pass 2 measured 1440×900 — the break is viewport-independent, as
`position: static` must be):

```json
{ "inlineStyle": "top: 493.867px; left: 65px; transform: translateX(-50%);",
  "computedPosition": "static",
  "rect":       { "x": -195, "y": 844, "w": 390, "h": 40 },
  "swatchRect": { "x":   47, "y": 535.9, "width": 36, "height": 41.5 },
  "visible": false }
```

`positionPanel` computes the *correct* anchor (top = swatch top − 42; left = swatch centre) and
the value is inert. The panel becomes a normal-flow block at the end of `<body>`: full body width,
`y: 844` (exactly the viewport floor), dragged to `x: -195` by the `translateX(-50%)`. I confirm
zero rule declarations independently:

```
$ grep -rn "floating-panel" --include="*.css" . --exclude-dir=node_modules --exclude-dir=dist
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)   ← prose
$ grep -rn "floating-panel" node_modules/@mkbabb/glass-ui/dist/
(no output)
```

I also re-confirm the `aria-hidden`-with-tabbables defect on the same node in one read:
`{ "ariaHidden": "true", "focusableInside": 2 }` (2 rather than 3 because `Add` is
`v-if="!isLocal"` on this route).

### C3-6 · BLOCKER (CONVERGE, pass 2 C-1) — `WatercolorDot` drops `tag`, `aria-label` and every listener

Re-derived from the built producer (`dist/watercolor-dot.js`): `inheritAttrs: !1`; props are
`{color, variant, animate, cycleDuration, range, seed}` — **no `tag`**; the setup reads only
`n.class` and `n.style` from `useAttrs()`; the render root is
`o("span", { "aria-hidden": "true", …, style: { …, pointerEvents: "none" } })`.

**P12**, live, on an expanded card:

```json
{ "dotCount": 5, "dotAriaLabel": null, "dotAriaHidden": "true", "dotPointerEvents": "none",
  "firstDotOuter": "<span aria-hidden=\"true\" class=\"w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer watercolor-swatch\" … style=\"…; pointer-events: none; …\">",
  "interactive-under-the-expanded-card": [ { "tag":"BUTTON","name":"Palette menu","w":36,"h":36 } ] }
```

**The entire expanded card exposes exactly one interactive element.** Note `cursor-pointer` sitting
on a `pointer-events: none` span: the affordance is a lie at the CSS level, before any a11y
question. Pass 2's touch-path measurement (`rekaPopover: 0`) is the other half and I do not
re-litigate it.

### C3-7 · MAJOR (CONVERGE, pass 2 C-6) — `ActionFeedback` truncates the second verdict

Third independent reproduction, third different timing (pass 1: vitest harness; pass 2: 2250 ms
offset → 613 ms; pass 3: 1500 ms offset). **P8**, calling the exposed `showFeedback` twice:

```
t=  51ms  "FIRST"
t=1502ms  "FIRST"      ← SECOND issued at ~1500ms
t=1752ms  "SECOND"
t=2504ms  "SECOND"
t=2755ms  null
```

`SECOND` lived ≈ **1005 ms** of a promised 2500 ms — it died at the FIRST message's deadline. The
three measurements are consistent with one law: *the second message inherits the first's remaining
countdown*, i.e. `2500 − offset`. (2250 → 613 has ~360 ms of transition/poll latency; 1500 → 1005
has ~5 ms. Same mechanism, `watch(() => props.visible)` never fires on a no-op write.)

### C3-8 · MAJOR (CONVERGE, pass 2 C-5) — "Rename" opens an input that is focus-stolen

**P10**, finer sampling than pass 2 (five points instead of two), which pins the steal to the
100–300 ms window:

```
t+0     INPUT.input-bar-field            ← rename input focused by onMounted
t+100   INPUT.input-bar-field
t+300   BUTTON[aria-label=Palette menu]  ← reka's focus-restore-on-close wins
t+600   BUTTON[aria-label=Palette menu]
t+1000  BUTTON[aria-label=Palette menu]
inputFocused: false ; menuStillOpen: false
```

The same run falsifies the comment at `PaletteCard.vue:291-292` ("keep the menu open visually
until the input takes focus"): `menuStillOpen: false`, because `startRenaming()` closes the menu on
its first line — so the `if (action !== "rename")` guard at `:317` is dead code guarding nothing,
exactly as pass 2 C-5 states.

### C3-9 · MAJOR (CONVERGE, pass 2 C-10/C-11) — sub-24 px targets, measured by cascade probe

**P13** — rendering each control's exact class string through the live cascade and measuring:

| control | file:line | measured |
|---|---|---|
| copy-slug button | `PaletteCardSwatches.vue:13-19` | **16.0 × 16.0** |
| rename submit / cancel | `PaletteRenameInput.vue:18-30` | **18.0 × 18.0** |
| vote (heart) button | `PaletteCardMeta.vue:43-54` | 47.2 × **23.6** |
| popover action buttons | `PaletteCardSwatches.vue:41-62` | 28 × 28 — OK |
| palette menu button | `PaletteCard.vue:96-104` | 36 × 36 — OK |

Agrees with pass 2's 16×16 and its 17.5 px (my 18.0 is the same box at a different DPR rounding).
**The vote button at 23.6 px is NEW** — it fails 2.5.8 by 0.4 px, which is precisely the kind of
miss a human eye passes and a measurement does not. Cure is the same S.W5-4 lift
`PaletteCard.vue:93-95` already performed once for the menu button and never propagated.

---

## Test truth — a second vacuous gate, run

### C3-10 · MAJOR (NEW) — O-16's cartoon-register oracle is aimed at this component, is RED, and its live-card leg is logged and never asserted

Pass 2 established that the a11y battery (`a11y-authed-user.spec.ts`) passes green because it never
enters the states where the defects live. There is a **second** gate aimed here, and it fails in a
different way: `e2e/smoke/oracles/o16-computed-cascade.spec.ts:234-244`, "R4 — the producer cartoon
register (PaletteCard's root class set)". **P14** — I ran it:

```
$ npx playwright test e2e/smoke/oracles/o16-computed-cascade.spec.ts --project=smoke --reporter=line
  2 failed
    o16:29  › O-16 computed-cascade — the dist :root 150ms transition-default clobber is not live
             Expected to fail, but passed.
    o16:106 › O-16 W5 census — every owned row's computed duration/curve ≡ its liquid target
             Error: expect(received).toBe(expected)
             Expected: "0.4s"   Received: "0.44s"
                at e2e/smoke/oracles/o16-computed-cascade.spec.ts:216
```

Three things follow.

1. **It is RED**, and it dies at **R2 (line 216)** — an unrelated 0.4 s/0.44 s drift on the pane
   transition. The R4 cartoon assertions at lines 237–243 are **never evaluated**. The one gate
   that names this component's motion register cannot reach it.
2. **Even reaching it, R4 could not fail correctly on the live card.** Line 244 is
   `log("R4 live cards", census.liveCards.length)` — the live-card measurement (`readLegs` over
   every `[role='article'].cartoon-surface`) is **printed and never asserted**.
   `census.liveCards.length === 0` passes. That is the vacuous gate, verbatim.
3. **And the class probe itself would fail, for the reason C3-1 documents.** My **P1** run of the
   same `probe("cartoon-surface")` returns `{transitionProperty:"all", transitionDuration:"0s"}`,
   so `census.cartoon["translate"]` is `undefined` and `expect(undefined).toBe("0.3s")` must throw
   — the oracle was written against a glass-ui that had the register, and the glass 7.0.0 adoption
   removed it without the oracle noticing, because an earlier assertion shadows it.

Sibling test-truth facts I re-verified independently: `grep -rln` for any of the six components or
three composables across `test/` and `demo/test/` returns **nothing** — zero unit tests. The three
flow specs (`vote-toggle`, `palette-delete`, `palette-feature`) assert only that a network call
fired; `vote-toggle.spec.ts:44-46` clicks the heart and polls `voteCalled`.

**The exact mutation that keeps every gate green:** delete `.cartoon-cast`, delete the `press`
wiring, ship the ActionFeedback truncation, double every shadow layer, and leak the whole
`cardRefs` map. Every finding in this pass except C3-9 survives the suite untouched.

---

## Decomposition — judged, converging with pass 2 C-13

I reached the same verdict from a different measure, so I record only the delta.

`PaletteCardSwatches.vue` is a **wrapper that earns nothing**: 96 lines, 8 props in, 8 emits out,
zero state, zero logic — every prop forwarded verbatim to `SwatchHoverMenu`, every emit re-emitted
verbatim to `PaletteCard`. Sixteen declarations to move data between a composable
(`useHoverPopover`, destructured at `PaletteCard.vue:246-255`) and a consumer one component apart.
That is the shape `feedback_kiss_no_contrivance` forbids. Pass 2's cure is right and I second it:
move `useHoverPopover()` **into** the swatch row (its state is entirely local to that row), which
takes 8 props → 4 and 8 emits → 3 and makes the file a component.

The delta I add is a count of what the split did *not* move. `PaletteCard.vue`'s script is 172
lines holding **10 props, 16 emit variants, 4 refs, 4 composables and an 18-entry string-keyed
dispatch table** — the state for all six files. The split relocated markup; the centre of gravity
never moved. Both prior passes name the untyped `action: string` seam and the
`if (!fn) return` silent swallow (a masking fallback, edict 2); I confirm both and note the arithmetic
that makes the seam absurd: the child knows 18 verbs, the parent declares 16 typed emits, and the
wire between them is `string`.

Two further structural notes not in prior passes:

- `PaletteCardMenu` renders **two** items both labelled "Publish" — `:27-40` for
  `paletteKind === 'saved'`, and `:48-60` for `remote && isOwned && !isPublic`. Two code paths, one
  verb, different emits (`publish` vs `makePublic`). Edict 2's dual-path smell, inside one file.
- `PaletteCardMeta` is a multi-root **fragment** (four sibling roots into the parent's flex row).
  It cannot be styled or positioned as a unit and any future `class` on it triggers Vue's
  extraneous-attrs warning. It is a template partial, not a component.

---

## CORRECTION — against my own first reading

**My initial static read of `certifyAccentInk` was wrong, and pass 2's C-3 is right.**

I read `demo/color-session/ink.ts:135-136` —

```ts
const accent = parseOklch(css);
if (!accent) return css;
```

— and recorded a negative result: "no `parseCssColor` crash class here; a malformed colour degrades
to uncertified ink." That inference is valid only for input that `parseOklch` *returns falsy for*.
Pass 2 reproduced, end-to-end through the remote browse feed, that the empty-argument colour-function
class (`"oklch()"`) makes `parseCssColor` **throw**, which bypasses the `!accent` degenerate
entirely and takes the whole Browse pane down through the error boundary (2 cards → 0, neighbour
palette destroyed, `pageErrors` empty because the boundary absorbs it). The guard is correct; the
function beneath it is partial where a total one is advertised.

I did not re-reproduce it (my environment's API is unreachable, so no remote wall was available),
and I withdraw my negative in favour of pass 2's positive measurement. This is the π-gate R1 crash
class, live and reachable from the public wall — it remains the single most severe finding in the
folder across all three passes, and nothing in pass 3 displaces it.

---

## Negative results — checked and found sound

Recorded so a fourth pass does not re-spend the probes.

- **Interrupted expand/collapse does not corrupt state.** This bounds pass 2's C-18 hypothesis
  ("if the transition never fires, `onAfterEnter` never clears the inline `height: 0`"). Measured:
  clean expand → `inline: ""`, panel 66.5 px, 3 dots, card 191.5 px; then collapse and re-expand
  80 ms into the 250 ms collapse → `inline: ""`, 66.5 px, 3 dots, 191.5 px. Byte-identical. Vue's
  `v-if` remount recovers; the missing `@enter-cancelled`/`@leave-cancelled` hooks cost nothing
  observable on this path. The `transitionend` listener also dies with the removed node, so the
  listener-leak half is moot. **Not a finding** — pass 2 correctly labelled it a hypothesis, and it
  does not survive measurement.
- **The press spring is PRM-correct and disposes.** `useSpring`
  (`dist/useSpring-9u2_shxV.js`) defaults `respectReducedMotion: u.respectReducedMotion !== !1` and
  registers `onScopeDispose`. No ungated rAF originates in this component. (Pass 2's C-7 PRM finding
  is about `useHeightTransition`'s inline `transition` string and `scrollIntoView`, which is a
  different mechanism and stands.)
- **`verbatimModuleSyntax`: PASS**, re-verified file by file across all six components and three
  composables.
- **`useTemplateRef` is used correctly** where a template ref exists (`PaletteRenameInput.vue:48`).
- **Brief hazard sweep:** no `defineModel` (stale-read hazard N/A), no HSV roundtrip (`stableHue`
  N/A), no `ValueUnit` construction, no reka slider, no WebGL, no rAF loop in the nine files.

---

## Marked BJ asks — glass-ui `@mkbabb/glass-ui@^7.0.0`

Per edict 4 and the owner's MT-F036 instruction that a missing glass variant becomes a marked ask
and never a local patch:

1. **`cartoon-surface` hover register** (C3-1). Three declarations, no `:hover`, no transition;
   `--shadow-cartoon-hover` ships as a token and is referenced by nothing. An interactive container
   with zero hover affordance, measured `diff: {}`.
2. **`--shadow-cartoon-*` faceting** (C3-2·i). Three zero-blur offset layers at 3/5/7 px produce the
   stepped slab the owner marked in OM-11/OM-12. MT-F027's mechanism class. The fix is the token's,
   at root.
3. **`.cartoon-cast` distribution and drive name** (C3-2·ii). The rule ships in
   `dist/styles/glass/glass-atom.css`, which consumers do not receive via the card entrypoint, and it
   reads `--cartoon-press-t` while no producer composable writes that name. The cast must ship with
   the `Card surface=cartoon` that emits it — a consumer must never hand-author a producer's
   internal element, which is how the demo ended up writing `--card-press-t` into the void.
4. **`WatercolorDot` interactivity** (C3-6). `inheritAttrs: false` consuming only `class`/`style`,
   plus hardcoded `aria-hidden="true"` and `pointer-events: none`, plus no `tag`/`as` prop — the dot
   cannot be a button and silently swallows `aria-label` and every listener, including the ones
   reka's `as-child` grafts on.
5. **An anchored hover/press action panel** (C3-5). Three demo sites hand-roll
   `Teleport` + `getBoundingClientRect` + inline `top/left`; one lost its stylesheet four months ago
   and no gate noticed.

---

## Delta ledger vs pass 2

| pass-3 | severity | status |
|---|---|---|
| C3-1 no hover state; the CARTOON REGISTER comment is fiction | BLOCKER | **NEW** — owner mark MT-F036(b), diagnosed to mechanism |
| C3-2 faceted slab + inert `.cartoon-cast` + `--card-press-t` wired to nothing | BLOCKER | **NEW** — owner mark MT-F036(a), three sub-mechanisms |
| C3-3 press fires for every inner pointerdown (4.9 % squash from the menu button) | MAJOR | **NEW** |
| C3-4 `cardRefs` retention | MAJOR | **UPGRADE** of pass 2 C-8 — argued → measured (5 refs / 0 DOM, `isUnmounted:true`) + the silent-no-verdict consequence |
| C3-5 `.floating-panel` undeclared, panel off-screen | BLOCKER | CONVERGE (pass 2 C-2) + second viewport, real-hover measurement |
| C3-6 `WatercolorDot` drops `tag`/`aria-label`/listeners | BLOCKER | CONVERGE (pass 2 C-1) + "one interactive element in the whole expanded card" |
| C3-7 `ActionFeedback` truncation | MAJOR | CONVERGE (pass 2 C-6) + third timing, law identified (`2500 − offset`) |
| C3-8 rename focus stolen | MAJOR | CONVERGE (pass 2 C-5) + five-point sampling pins the 100–300 ms window |
| C3-9 sub-24 px targets | MAJOR | CONVERGE (pass 2 C-10/C-11) + **vote button 23.6 px is new** |
| C3-10 O-16 oracle is RED, R4 unreached, live-card leg unasserted | MAJOR | **NEW** — a second vacuous gate, run receipt pasted |
| decomposition: `PaletteCardSwatches` earns nothing | MAJOR | CONVERGE (pass 2 C-13) + duplicate "Publish" item, fragment note |
| `certifyAccentInk` is safe | — | **CORRECTION** — my negative withdrawn; pass 2 C-3 stands, the throw bypasses the guard |
| interrupted transition corrupts state | — | **NEGATIVE** — pass 2 C-18's hypothesis measured and does not survive |

No pass-1 or pass-2 finding is withdrawn. One of my own is.

---

## Strongest defect (pass 3's own contribution)

**C3-2** — the card hand-authors a producer internal (`<span class="cartoon-cast">`) whose
stylesheet the demo never loads, and drives it through `pressVar: "--card-press-t"` while the rule
that would consume it reads `--cartoon-press-t`. Four mechanisms — an unloaded sheet, a wrong
variable name, a shadow token that facets, and a comment block asserting all of it works — compound
into the artifact the owner marked. It is the clearest instance in this folder of the general
disease: **the demo describing producer behaviour it does not have, in prose, where no gate can
read it.** C3-1's `diff: {}` is the same disease at the hover leg; C3-10 is the gate that should
have caught both and cannot reach its own assertion.

Across all three passes the single most severe finding remains **pass 2's C-3** — one malformed
colour string on the public wall destroys the Browse pane for every visitor — which pass 3 does not
displace and, on re-reading, corrects itself in favour of.

---

## Files

- This report (pass 3): `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.md`
- Pass 2, preserved: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.pass-2-2026-07-27.md`
- Pass 1, preserved: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.pass-1-2026-07-27.md`
- Owner-mark witnesses: `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/visual/owner-marked/OM-11-palette-card-shadow-artifacts.png`, `.../OM-12-palette-card-shadow-artifact-closeup.png`
