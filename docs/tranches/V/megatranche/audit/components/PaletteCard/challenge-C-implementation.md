# CHALLENGE-C — PaletteCard: implementation interrogation · **PASS 4**

> Passes 1–3 are preserved verbatim at `challenge-C-implementation.pass-1-2026-07-27.md`,
> `…pass-2-2026-07-27.md` and `…pass-3-2026-07-28.md`. This is an **independent re-run**: I
> built and ran my own probe battery against the live server *before* reading any prior pass,
> then read all three and marked every finding **NEW** (no prior pass reached it),
> **CONVERGE** (independently re-measured by a different method), **UPGRADE** (a prior pass
> argued it; I measured it) or **NEGATIVE** (a hypothesis of mine that measurement killed).
>
> Six probe scripts and six result JSONs ship beside this file. Every number below was read
> out of a running page; nothing here is inferred from a code read alone unless it is labelled
> **DERIVED** or **HYPOTHESIS**.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, spawned
with an explicit Opus 5 declaration. The seat is declared, not inherited, not downgraded.

---

## Verdict

**DEFECTIVE.**

Pass 3's blockers stand — I re-measured four of them by different routes and none withdrew.
Pass 4 adds **nine NEW findings**, one of which I judge the most severe defect any pass has
found in this component's *own* code:

> **On every machine with `prefers-reduced-motion: reduce`, PaletteCard's expand/collapse state
> machine never completes.** `useHeightTransition` waits for a `transitionend` whose
> `propertyName === "height"`. The producer's own accessibility policy
> (`@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`, imported at
> `demo/styles/foundation.css:56`) rewrites `transition-property` to
> `opacity, color, background-color, border-color, box-shadow !important` under PRM — **`height`
> is not in that list**, so the event never arrives, `done()` is never called, and Vue's
> `<Transition>` never finishes. Measured consequence: the swatch subtree is **never removed
> from the DOM**. Expanding and collapsing six cards leaves **6 zero-height panels, 144 orphan
> swatch nodes and +1021 DOM nodes (607 → 1628, +168 %)** that are never released. The same
> walk with motion enabled returns the document to **exactly its baseline (608 → 608)**.

The card is not merely missing a hover register (pass 3's MT-F036 diagnosis, which I confirm
byte-for-byte). It is a component whose two most basic obligations — *be operable* and *clean
up after yourself* — both fail on a measurable population of users, and whose ARIA container
contract (`role="list"` → zero `listitem`s) is broken for every screen-reader user.

Environment: branch `tranche-u`, HEAD `c654824e`; the six component files unmodified since
2026-07-17. Probes against `http://localhost:9000`, routes `/#/palettes` and `/#/mix`, seeded
via `localStorage["color-palettes"]`.

> **Fixture note that invalidates part of the prior apparatus.** The store's real shape is
> `{version:1, palettes:[…]}` with `PaletteColor.position` required
> (`demo/palettes/usePaletteStore.ts:6-37`, `demo/palettes/types.ts:1-11`); a bare array is
> **silently discarded** by the serializer's `typeof parsed.version !== "number"` guard
> (`usePaletteStore.ts:24-27`). `probe-D5.mjs` and my own first run seeded a bare array and
> measured a page with **zero cards**. Anything in this folder measured through that fixture
> should be re-read with suspicion. (The silent discard is itself an edict-2 masking fallback,
> but it is `usePaletteStore`'s defect, not this component's — filed here only as apparatus.)

---

## Evidence apparatus (pass 4)

| # | Probe | File | Result |
|---|---|---|---|
| A1 | ARIA list semantics, DOM + Playwright role engine | `probe-C4-pass4.mjs` | grid `role="list"`, 4 × `role="article"` children, **`listitem` = 0** |
| A2 | 36-press Tab walk, then `focus()` + synthetic Enter on the card root | `probe-C4-pass4.mjs` | `everFocusedCardRoot:false`; `tabIndex:-1`; Enter → swatches 0 → 0 |
| A3 | menu opened by keyboard, ArrowDown to Rename, Enter | `probe-C4-pass4.mjs` | `renameInputAfterEnter: 1` — **my hypothesis died** |
| A4 | every pointer/drag target in a card, measured | `probe-C4-pass4.mjs` | grip `svg` **16 × 16**; menu button 36 × 36 |
| A5 | the zero-colour palette | `probe-C4-pass4.mjs` | strip: **0 children, 40 px tall, `rgba(0,0,0,0)`**; card text `"Empty0"` |
| A6 | live regions inside the card | `probe-C4-pass4.mjs` | **0** in card, 5 elsewhere in the document |
| C1–C4 | expand / rewrap / collapse / re-expand × {motion, PRM}, precise panel selector | `probe-C4c-pass4.mjs` | PRM: inline style frozen at every sample, **panel present after collapse**. Motion: cleared, **panel gone** |
| D1 | `transitionrun`/`end`/`cancel` capture under PRM + computed transition legs | `probe-C4d-pass4.mjs` | events: **opacity only**; computed `transition-property` excludes `height` |
| D2 | the teleported `.floating-panel` | `probe-C4d-pass4.mjs` | `position:static`, rect `{x:-720, y:1000, w:1440}`, `inViewport:false`, **`declaredRules: []`** |
| D3 | full computed snapshot → real `.hover()` → snapshot → diff | `probe-C4d-pass4.mjs` | `isHovered:true`, **`diff: {}`** |
| D4 | card + `.cartoon-cast` shadow stack and press vars | `probe-C4d-pass4.mjs` | cast `display:inline`, `0×0`, `box-shadow:none`; `--cartoon-press-t:0` vs `--card-press-t:0.0000` |
| E | expand+collapse all 6 cards, count retained DOM | `probe-C4e-pass4.mjs` | motion **608 → 608**; PRM **607 → 1628**, 6 zero-height panels, 148 swatch nodes |
| F | remote-card legs via route mock | `probe-C4f-pass4.mjs` | **NOT REPRODUCED** — the browse mock needs the authed e2e fixture; recorded so pass 5 does not re-spend it |

Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`,
`scripts/dev/dev.sh` or any `INBOX.md` was modified. This report, the pass-3 archive copy and
the probe files under this folder are the only files written.

---

## NEW — the reduced-motion leg

### C4-1 · BLOCKER (NEW) — under `prefers-reduced-motion`, the expand/collapse transition never completes; the swatch subtree is never unmounted

**Mechanism.** `useHeightTransition` is a hand-rolled JS height morph that gates Vue's
transition `done()` on a DOM event:

```ts
// demo/palettes/browser/card/composables/useHeightTransition.ts:30-39
htmlEl.style.transition = `height ${expandDuration}ms ${EXPAND_EASING}, opacity …`;
void htmlEl.offsetHeight;                       // force reflow
htmlEl.style.height = `${targetHeight}px`;
htmlEl.addEventListener("transitionend", function handler(e) {
    if (e.propertyName !== "height") return;    // ← the gate
    htmlEl.removeEventListener("transitionend", handler);
    done();                                     // ← the ONLY call site
});
```

The identical shape governs the leave leg (`useHeightTransition.ts:59-71`). Both are wired to
the swatch panel at `PaletteCard.vue:131-158` / `:269-278`.

The producer's accessibility policy disarms exactly that gate:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css
   — imported by demo/styles/foundation.css:56 */
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) {
    transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important;
  }
}
```

`height` is not in the allow-list, so no height transition is ever created and no
`transitionend` with `propertyName === "height"` can ever fire.

**Measured (probe D1, PRM context).** Computed on the panel:
`transitionProperty: "opacity, color, background-color, border-color, box-shadow"`,
`transitionDuration: "0.1s"`. Captured transition events during an expand — the complete set
touching the panel:

```
["run","opacity","overflow-hidden v-enter-"]
["end","opacity","overflow-hidden v-enter-"]
```

No `height` event of any kind. Panel inline style 2 s later:
`height: 127px; opacity: 1; transition: height 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms;`

**Measured (probe C, sampled 2.5 s after each action, 24-colour card).**

| | motion | PRM |
|---|---|---|
| after expand — inline style | `""` (cleared by `onAfterEnter`) | `height: 182px; opacity: 1; transition: …350ms` |
| **after collapse — panel in DOM** | **`false`** | **`true`** — `height: 0px; opacity: 0`, `scrollHeight: 182`, 24 swatches |
| after re-expand | fresh node, inline cleared | the same retained node, inline re-frozen |

**Measured (probe E, the arithmetic).** Expand + collapse each of six 24-colour cards:

```
no-prm : baseline {swatchPanels:0, swatchNodes:4,   totalDomNodes:608}
         afterWalk{swatchPanels:0, swatchNodes:4,   totalDomNodes:608}
prm    : baseline {swatchPanels:0, swatchNodes:4,   totalDomNodes:607}
         afterWalk{swatchPanels:6, swatchNodes:148, totalDomNodes:1628, zeroHeightPanels:6}
```

**+1021 nodes retained, never released.** On the Browse wall (50-row page cap) the same walk
retains on the order of 8 500 nodes.

**Consequences, in order of severity.**

1. `v-if="expanded"` is a lie under PRM: the "collapsed" card still owns its whole subtree, and
   the subtree grows monotonically with the number of cards the user has ever opened.
2. `onAfterEnter`/`onAfterLeave` never run, so the inline `height`, `opacity` and `transition`
   are permanent — the panel is frozen at the pixel height it had at expand time. Any later
   content change (a colour added through the popover, a font swap, a wrap change) is clipped by
   the panel's own `overflow-hidden` (`PaletteCardSwatches.vue:2`).
3. **DERIVED (not reproduced — probe F could not raise a remote card):** on `/#/browse` the panel
   contains a real `<button aria-label="Copy slug …">` (`PaletteCardSwatches.vue:13-19`). A
   retained panel is `height:0; overflow:hidden` — not `display:none` — so that button stays in
   the tab order. A PRM keyboard user would tab into an invisible control inside a card that
   looks closed.
4. `onAfterEnter`'s `scrollIntoView({behavior:"smooth"})` (`useHeightTransition.ts:48`) never
   runs under PRM — accidentally the *correct* behaviour, arrived at by a bug. With motion
   enabled it fires unconditionally: measured
   `{"arg":"{\"behavior\":\"smooth\",\"block\":\"nearest\"}","cls":"overflow-hidden"}`
   (`probe-C4b-pass4-results.json`, `P1_no-prm.samples.500`).

**Why this is the component's defect and not the producer's.** `demo/styles/animations.css:60-80`
states the law in this repo's own words:

> "three named families; a fourth name is a defect (gate (a), R.W4 §Hard gate) … The global
> prefers-reduced-motion guard below neutralises all three."

`vj-morph` (`animations.css:103-135`) is a **CSS-declared height morph** — `max-height` driven,
parameterised by `--vj-morph-collapse` / `--vj-morph-expanded` — and PaletteCard **already uses
it**, twelve lines above the offending Transition, for the rename row
(`PaletteCard.vue:112-120` + the `.rename-morph` geometry block at `:358-363`). The swatch panel
is a hand-rolled fourth family expressed in JavaScript, and it is the one PRM silently disarms,
because a CSS family cannot be disarmed — the guard *is* its off-switch.

**Cure (transposition, not patch).** Delete `useHeightTransition.ts` and its wiring; render the
swatch panel as `<Transition name="vj-morph">` with `--vj-morph-collapse: 0px` /
`--vj-morph-expanded: <cap>` on the panel, exactly as the rename row does. Six JS hooks, two
`transitionend` listeners, two easing constants and two duration constants disappear; the PRM
behaviour becomes correct by construction rather than by accident; and the fourth-family defect
the repo's own animation law forbids is retired.

---

## NEW — semantics and operability

### C4-2 · MAJOR (NEW) — `role="list"` with zero `listitem`s: the grid announces an empty list

`PaletteCardGrid.vue:3` declares `role="list"`; `PaletteCard.vue:22` declares `role="article"`;
the cards are the list's direct children.

**Measured (probe A1).**

```json
{"gridRole":"list","gridChildRoles":["article","article","article","article"],
 "cardCount":4,"listitemCount":0}
{"list":1,"listitem":0,"article":4,"listitemsInsideGrid":0,"articlesInsideGrid":4}
```

ARIA 1.2 gives `list` the required owned element `listitem`. A `list` whose children are all
`article` owns nothing: assistive technology announces a list of zero items and item navigation
(NVDA `I`/`K`, the VoiceOver rotor) finds nothing. The comment at `PaletteCardGrid.vue:7-8`
asserts the opposite — "each child PaletteCard (`role="article"`) sits in a list landmark" —
prose describing semantics the tree does not have, the same disease pass 3 named at the motion
legs.

**Cure.** The card owns its own role: `role="listitem"` on the card root, with the palette name
as its accessible name. `article` buys nothing here — it is not a landmark, exposes no navigation
the list does not, and is the reason the list is empty. If the card is ever hosted outside a
list, the role belongs in a prop, not in two mutually contradictory comments.

### C4-3 · MAJOR (NEW) — the card's primary action is mouse-only

`PaletteCard.vue:5-27`: `role="article"`, `cursor-pointer` (`:19`), `@click="$emit('click')"`
(`:26`). No `tabindex`, no `@keydown`, no button semantics. Every consumer wires that click to
the expand toggle (`BrowsePane.vue:100`, `PalettesPane.vue:90`, `AdminUsersPanel.vue:147`);
`ExtractWorkbench.vue:152` wires it to `@click="() => {}"` — a no-op handler kept only to satisfy
a card that insists on emitting.

**Measured (probe A2).** 36 consecutive `Tab` presses on `/#/palettes`:

```json
{"everFocusedCardRoot": false,
 "stopsInsideCards": ["BUTTON:Palette menu","BUTTON:Palette menu","BUTTON:Palette menu",
                      "BUTTON:Palette menu","BUTTON:Palette menu"]}
{"cardTabIndex": -1, "focusableViaFocus": false, "swatchesBefore": 0, "swatchesAfterEnter": 0}
```

One reachable control per card — the overflow menu. The card root is never focused, cannot be
focused programmatically, and a synthetic `Enter` on it does nothing. The entire expanded surface
(swatches, per-colour actions, the slug and its copy button on Browse) has **no keyboard route at
all**.

The header comment (`PaletteCard.vue:2-4`) defends the choice — "button semantics on the card are
omitted because inner interactive controls must be reachable" — and the defence is sound as far
as it goes, but it stops one step short: the correct pattern for a clickable card is a focusable,
named control *inside* it that performs the card action, plus `aria-expanded` for the state.
Neither exists.

**Cure.** Make the disclosure explicit: the title becomes a `<button>` (or the card gains a ghost
chevron from the producer's Button atom) carrying `aria-expanded` and `aria-controls` pointing at
the swatch panel; the whole-card click stays a mouse-only convenience on top of it. This also
retires C4-6 and gives C4-2's `listitem` a proper item label.

### C4-4 · MAJOR (NEW) — at `/#/mix` the card's `<button>` is nested inside another `<button>`

`MixSourceSelector.vue:246-268` wraps `<PaletteCard>` in a native
`<button aria-pressed=… aria-label="Select palette …">`. PaletteCard renders an unconditional
`<Button aria-label="Palette menu">` (`PaletteCard.vue:96-104`) and, for remote palettes, a vote
`<button>` (`PaletteCardMeta.vue:43-54`).

**Measured (probe C, C6 — after opening the Mix "Palettes" source tab).**

```json
{"articles":2,"outerButtonsWrappingCards":2,"nestedButtonInButton":2,
 "sample":[{"outerRole":"BUTTON","outerLabel":"Select palette Twentyfour",
            "innerInteractive":["BUTTON:Palette menu"]},
           {"outerRole":"BUTTON","outerLabel":"Select palette Deep Ocean",
            "innerInteractive":["BUTTON:Palette menu"]}]}
```

`<button>`'s content model is phrasing content with **no interactive descendants**; ARIA further
makes a button's descendants presentational, so the card's `role="article"`, its name, its badges
and its menu are all stripped from the accessibility tree inside Mix. Two controls occupy one
gesture: the menu button's `@click.stop` wrapper (`PaletteCard.vue:82`) is what keeps the
selection from also firing — a stop-propagation standing in for a content model.

This is PaletteCard's defect, not Mix's: the component offers no way to render without its
interactive chrome, so any consumer that needs a selectable card must nest interactive content.

**Cure.** Not a `presentational` wrapper species (edict 3). The card should own the selection
affordance it is already asked for: `aria-pressed` + a `selected` register as first-class state
(the ring styling Mix hand-rolls at `:256-259` is already a per-instance override — edict 5), so
Mix binds `@click` / `:selected` instead of wrapping. One interactive root, one control.

### C4-5 · MAJOR (NEW) — every asynchronous verdict is unannounced

`ActionFeedback` is the card's async-result surface: `"Saved!"`, publish failures, delete errors
(`BrowsePane.vue:230,239,249,264`, `PalettesPane.vue:207`). It renders a `<div>` with an icon and
text (`ActionFeedback.vue:4-15`) and **no live region**.

**Measured (probe A6).** `{"liveRegionsInCard": 0, "liveRegionsInDocument": 5}` — the app knows
the idiom and uses it five times on the same page; the card is not one of them.

A screen-reader user who activates Save hears nothing, ever: no live region, no focus move, and
the chip auto-dismisses in 2 500 ms. Compounded by C4-3, this is a surface where sighted mouse
users get feedback and nobody else does.

**Cure.** The chip is a status, so it says so: `role="status"` (implicit `aria-live="polite"`) for
the success variant and `role="alert"` for the error variant, on the chip's own root, where the
variant is already branched (`ActionFeedback.vue:8-9`).

---

## NEW — smaller mechanisms, all measured

### C4-6 · MINOR (NEW) — the click-to-rename title is a `<span>` with no role, no name, no tab stop

`PaletteCard.vue:53-59`: `@click.stop="editableName && startRenaming()"` on a `<span>` styled
`cursor-text hover:underline decoration-dashed`.

**Measured (probe C4b, P3).**
`{"tag":"SPAN","role":null,"tabIndex":-1,"ariaLabel":null,"text":"Sunset Ridge"}`

A control only a mouse can find. The menu's Rename item is an equivalent path (measured working —
see the negatives), so this is a duplicated affordance rather than a lost one; but it is the
second control in this file implemented as an unfocusable span, and the first (C4-3) has no
alternative at all.

### C4-7 · MINOR (NEW) — the "designed empty-state swatch" never paints, and the constant is dead

`PaletteCard.vue:220-226` names `EMPTY_PALETTE_SWATCH = "#888"` and calls it, in prose, "the
designed empty-state swatch". It feeds only `firstColor` → `safeFirstColor` (`:226-230`), consumed
at exactly one site: the slug chip's ink and border (`PaletteCardSwatches.vue:10`), rendered under
`v-if="displaySlug"`. A local palette has no `userSlug`, and a remote palette with zero colours
does not exist — so the constant, `firstColor`, `safeFirstColor` and the `useSafeAccentFn("well")`
contrast probe (`:229`) are **dead for every local card**.

**Measured (probe A5) — what the empty state actually renders:**

```json
{"stripChildren":0,"stripHeightPx":40,"stripBackground":"rgba(0,0,0,0)","cardText":"Empty0"}
```

A 40 px transparent band and a badge reading `0`. `PaletteColorStrip.vue:50-52` returns `[]` for
`n === 0` and the strip's `h-10` keeps the band open.

**Cure.** Either the empty palette gets a real designed state (the `ShadowPalette` / dashed-well
grammar this repo already owns for undeveloped plates) and `EMPTY_PALETTE_SWATCH` is deleted, or
the constant is deleted with its comment. What must not survive is a named constant whose comment
describes a rendering no code performs.

### C4-8 · MINOR (NEW) — the drag handle is a 16 × 16 target and reordering has no keyboard route

`PaletteCard.vue:47-50` renders `GripVertical` at `w-4 h-4`; `PalettesPane.vue:183-184` binds it
as the sortable's `handle: ".drag-handle"`.

**Measured (probe A4).**
`{"tag":"svg","cls":"lucide lucide-grip-vertical-icon …","w":16,"h":16,"under24":true}`

16 × 16 is the smallest target in the card — below the 24 px floor the visual REPORT counts, and
it is a *drag* target, harder to acquire than a tap target. There is no keyboard reorder path
either (no arrow handling, no move-up/move-down menu items), so ordering is mouse-only.

Pass 3's target table queried `button`s only and could not see this row; it stands alongside their
copy-slug 16 × 16, rename 18 × 18 and vote 23.6 px rows.

### C4-9 · MINOR (NEW) — no timer in this folder is disposed

```
$ grep -rn "onUnmounted|onScopeDispose|onBeforeUnmount" \
      demo/palettes/browser/card/PaletteCard/*.vue \
      demo/palettes/browser/card/composables/*.ts
(no matches)
```

Two timers outlive their components: `ActionFeedback.vue:37-47` (the 2 500 ms auto-dismiss, which
fires `emit("update:visible", false)` after unmount and holds the instance's closure for the full
delay) and `useLeaveTimer.ts:1-17` via `useHoverPopover` (the 250 ms hover close). Neither is
catastrophic alone; both compound pass 3's C3-4 (`cardRefs` retention: 5 refs / 0 DOM, all
`isUnmounted:true`) — the pane keeps the instance, the instance keeps a pending timer.

**Cure.** `useLeaveTimer` gains `onScopeDispose(cancel)` — one line, inherited by every consumer.
`ActionFeedback`'s timer should not exist at all: see the decomposition note.

---

## CONVERGE — independently re-measured, all unchanged

### C4-10 (= C3-1, MT-F036 b) — the interactive container ships no hover state

Probe D3: real Playwright `.hover()`, full computed snapshot before and after —
`{"isHovered": true, "diff": {}}`. Not one computed property changes. The card's own transition
legs read `transitionProperty: "all"`, `transitionDuration: "0s"` — a transition declared over
everything, for zero time. `cursor: pointer` sits on a surface with no hover feedback and (C4-3)
no keyboard action.

Static confirmation: `@utility cartoon-surface` in glass-ui 7.0.0
(`dist/components/card/styles.css`) is **three declarations** — `position: relative`,
`border-width: 2px`, `box-shadow: var(--shadow-cartoon-md)`. No `:hover`, no transition. The token
`--shadow-cartoon-hover` exists and is consumed only by a `@utility shadow-cartoon-hover` that no
card uses. → **BJ ask**, per the owner's MT-F036 instruction.

### C4-11 (= C3-2, MT-F036 a) — the faceted slab, and a press drive wired to nothing

Probe D4, live (light scheme):

```json
"cardBoxShadow": "oklab(… / 0.32) -3px 3px 0px 0px, oklab(… / 0.26) -5px 5px 0px 0px,
                  oklab(… / 0.18) -7px 7px 0px 0px"
"cast": {"display":"inline","position":"static","boxShadow":"none","borderRadius":"0px",
         "rect":{"w":0,"h":0}}
"vars": {"cartoonPressT":"0","cardPressT":"0.0000","motionWeight":"0.618"}
```

Three zero-blur layers at 3/5/7 px — the stepped slab in `OM-11`/`OM-12`, which I read: the
artifact is the offset stack's stair-stepped corner, worst at the bottom-left where all three
facets separate against the pane wash. The `<span class="cartoon-cast">` the card hand-authors
(`PaletteCard.vue:30`) computes as a 0 × 0 styleless inline span, because
`dist/styles/glass/glass-atom.css` — the only sheet declaring `.cartoon-cast` — is not in the
demo's loaded cascade. That rule, if loaded, reads `var(--cartoon-press-t)`
(`@property … initial-value: 0`) while `useLiquidPress` is configured with
`pressVar: "--card-press-t"` (`PaletteCard.vue:263-267`). Repository-wide, `--card-press-t` has
**three occurrences, all inside this one file, two of them comments**. → **BJ ask** (token
faceting + cast distribution), plus a local deletion: a consumer must not hand-author a
producer's internal element.

### C4-12 (= C3-5) — `.floating-panel` is declared in no stylesheet; the hover panel renders off-screen

Probe D2, after a real mouse hover on a swatch:

```json
{"present":true,
 "inlineStyle":"top: 587.625px; left: 788px; transform: translateX(-50%);",
 "computed":{"position":"static","top":"587.625px","left":"788px","background":"rgba(0,0,0,0)"},
 "rect":{"x":-720,"y":1000,"w":1440,"h":40},"inViewport":false,
 "declaredRules":[],"ariaHidden":"true","buttonsInside":2}
```

`declaredRules: []` is a walk of every loaded stylesheet for any selector containing
`floating-panel` — there is none, so `position` stays `static`, the inline `top`/`left` are inert,
and the teleported panel lands as a full-width transparent 40 px strip at `y = 1000` (below a
1000 px viewport), carrying the two per-swatch action buttons. On a hover-capable device this is
the **only** route to Edit/Copy for a card's colours, and it is unreachable by anyone.

### C4-13 (= C3-6) — the swatch is not a control

Probe C, C4: the panel's swatch wrappers contain
`{"tag":"SPAN","cls":"w-9 h-9 … cursor-pointer watercolor-swatch","ariaLabel":null,
"ariaHidden":"true","tabIndex":-1,"pointerEvents":"none","w":40,"h":40}`, and
`interactiveInPanel: 0`. `SwatchHoverMenu.vue:14-20,29-36` asks for `tag="button"` and
`:aria-label="\`Color swatch ${color}\`"`; `WatercolorDot` drops both. `cursor-pointer` on an
element with `pointer-events: none` is the visible half of the lie.

---

## NEGATIVE — hypotheses of mine that measurement killed

Recorded so pass 5 does not re-spend the probes.

- **`@click` on `DropdownMenuItem` is NOT keyboard-dead.** I expected the thirteen items wired
  with `@click` (`PaletteCardMenu.vue:18,31,52,66,76,86,96,136,146,158,165`) to be unreachable by
  keyboard while the five export items wired with `@select` (`:113-127`) worked. Measured: menu
  opened with `Enter`, arrowed to Rename, `Enter` →
  `{"focusedBefore":"Rename","renameInputAfterEnter":1}`; the mouse control gives
  `{"renameInputAfterClick":1}`. reka-ui synthesises the click on keyboard activation. **Not a
  finding.** The `@click`/`@select` split is an inconsistency, not a defect.
- **The non-PRM expand/collapse is sound.** Pass 3's negative re-confirmed by a second method:
  motion-enabled, the panel clears its inline style, unmounts on collapse, and the six-card walk
  returns the document to its exact baseline (608 → 608). The corruption is PRM-only — which is
  precisely why three passes and every gate missed it.
- **`verbatimModuleSyntax`: PASS.** All type-only imports are `import type` or inline `type`
  specifiers across the six files (`PaletteCard.vue:168-169` is the only mixed-form import and it
  uses the inline `type` specifier correctly).
- **Standing hazard sweep:** no `defineModel` (stale-read hazard N/A), no HSV/`stableHue` path, no
  `ValueUnit` construction, no reka slider, no WebGL, no `requestAnimationFrame` in the nine
  files. `useLiquidPress`'s spring registers `onScopeDispose` and respects PRM.

**HYPOTHESIS (labelled, not measured).** `PaletteCard.vue:147` passes
`:floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"` — a fresh object identity
per parent render, spread over a `reactive({top,left})` that mutates on every hover. Every hover
of any swatch should therefore re-render all N `SwatchHoverMenu` children. I could not measure it:
`app.config.performance = true` through the `__vue_app__` handle produced zero `measure` entries
on this build (`probe-C4c-pass4-results.json`, `C5_hoverFanout.totalMeasures: 0`). Stated as a
hypothesis only.

---

## Test truth — what the gates can and cannot see

1. **No suite runs under reduced motion.** `grep -rn "reducedMotion" playwright.config.ts e2e/`
   returns two hits, both inside single oracles that emulate PRM for their own assertion
   (`o11-header-gates.spec.ts:297`, `o9-shadow-palette.spec.ts:163`), and neither touches
   PaletteCard. **C4-1 is invisible to every gate in the repository** — and would stay invisible
   after a fix, because nothing would notice the regression.
2. **`walk.spec.ts:71-72` asserts the vacuity.** It asserts `main.getByRole("list").last()` is
   visible — true of a list with zero items. **Mutation that keeps it green:** never give any card
   `role="listitem"` (i.e. today's code). The assertion cannot fail on C4-2; a `role="list"` check
   without a `listitem` count has that ceiling by construction.
3. **`o7-card-census.spec.ts:183,297-309`** asserts the card's `background-color` equals the
   page-resolved `--well-bg` and `backdrop-filter: none`. **Mutation that keeps it green:** replace
   the entire card body — strip, title, badges, menu, rename row, feedback chip, swatch panel —
   with an empty `<div role="article" class="bg-well">`. The census measures the material and
   nothing else.
4. **No unit test exists for any of the six components or three composables.** `test/demo/`
   contains one file (`palettes/api/admin-palettes.test.ts`). The only behavioural coverage is two
   e2e flows (`flows/vote-toggle.spec.ts`, `flows/palette-delete.spec.ts`) that drive the menu to
   assert a network call fires; they survive every finding in this report except a broken menu.
5. **The dispatch table has no gate at all.** `PaletteCard.vue:290-319` rebuilds an 18-entry
   `Record<string, () => void>` on every menu action and ends with `if (!fn) return` — an unknown
   verb is silently swallowed (edict 2, masking fallback). **Mutation that keeps every gate
   green:** rename `exportCSS` → `exportCss` at `PaletteCardMenu.vue:116`. The item stops working;
   nothing throws, nothing logs, no test fails. The emit is typed `action: [action: string]`
   (`PaletteCardMenu.vue:225`), so the compiler cannot see it either.

---

## Decomposition — judged

Six files, 876 lines, **59 prop/emit declarations** (29 props + 30 emits) to render one card:

| file | lines | props | emits | verdict |
|---|---|---|---|---|
| `PaletteCard.vue` | 364 | 10 | 16 | the god module, undissolved |
| `PaletteCardMenu.vue` | 228 | 5 | 2 | **earns it** — real kind gating + the offline latch |
| `PaletteCardSwatches.vue` | 96 | 8 | 8 | **earns nothing** — 16 declarations, zero state, verbatim forwarding |
| `PaletteRenameInput.vue` | 66 | 1 | 2 | **earns it** — owns focus, local draft, submit policy |
| `PaletteCardMeta.vue` | 64 | 1 | 1 | a multi-root **fragment**: a template partial, not a component |
| `ActionFeedback.vue` | 58 | 4 | 1 | **split-brain** (below) |

I converge with passes 2 and 3 on `PaletteCardSwatches` (a pass-through wrapper; the cure is to
move `useHoverPopover()` into it, taking 8 props → 4 and 8 emits → 3) and on `PaletteCardMeta` (a
fragment that cannot be styled or positioned as a unit).

**The delta I add is `ActionFeedback`, and it is a seam error, not a size error.** The *state*
lives in the parent (`feedbackVisible`, `feedbackMessage`, `feedbackVariant` —
`PaletteCard.vue:233-244`); the *dismissal policy* lives in the child
(`ActionFeedback.vue:37-47`) and reaches back through `update:visible`. Two owners for one state
machine, synchronised by an event — which is exactly why the truncation bug (pass 2 C-6 / pass 3
C3-7: a second verdict inherits the first's deadline) exists at all. It is not fixable inside
either file: the watcher cannot know that `visible` was already `true` when only the message
changed.

**Cure (one owner):** a `useActionFeedback()` composable holding `{message, variant, visible}`
*and* the timer, exposing `show(message, variant)` that resets the deadline by construction and
disposes on scope teardown (retiring half of C4-9). `ActionFeedback.vue` becomes a pure presenter
— props in, no watch, no timer, no emit — and `PaletteCard`'s `showFeedback` + `defineExpose`
(`:238-244`) becomes a one-line re-export of the composable's `show`.

The centre-of-gravity finding stands: the split moved markup, not state. `PaletteCard.vue`'s
script still holds 10 props, 16 emits, 4 refs, 4 composables and the 18-verb string dispatch, and
the wire between a child that knows 18 verbs and a parent that declares 16 typed emits is
`string`.

---

## Marked BJ asks — glass-ui `@mkbabb/glass-ui@^7.0.0`

Per edict 4 and the owner's MT-F036 instruction (a missing glass variant is a marked ask, never a
local patch). Items 1–4 converge with pass 3; item 5 is new.

1. **`cartoon-surface` hover register** — three declarations, no `:hover`, no transition;
   `--shadow-cartoon-hover` ships and is consumed by nothing. Measured `diff: {}` (C4-10).
2. **`--shadow-cartoon-*` faceting** — three zero-blur layers at 3/5/7 px produce the stepped slab
   the owner marked (C4-11). The cure is the token's, at root.
3. **`.cartoon-cast` distribution + drive name** — the rule ships in a sheet consumers do not
   receive, and reads `--cartoon-press-t` while no producer composable writes that name. The cast
   must ship *with* the `Card surface="cartoon"` that emits it.
4. **`WatercolorDot` interactivity** — cannot be a button; swallows `tag`, `aria-label` and every
   listener; hardcodes `aria-hidden` and `pointer-events: none` (C4-13).
5. **NEW — the reduced-motion policy needs a height-morph story, or the producer must own the
   height morph.** `a11y-overrides.css` rewrites `transition-property` to a five-property
   allow-list for every element without `data-allow-motion`. Any consumer driving a JS transition
   on a property outside that list — `height`, `max-height`, `grid-template-rows`, `transform` —
   has its `transitionend` silently suppressed and its state machine hangs (C4-1). That is a
   foot-gun aimed at every consumer, not just this card. Ask: a producer-owned disclosure /
   height-morph primitive whose PRM behaviour is declared once, correctly, in CSS.

---

## Delta ledger vs pass 3

| pass-4 | severity | status |
|---|---|---|
| C4-1 PRM: transition never completes; subtree never unmounts; +1021 nodes / 6 cards | BLOCKER | **NEW** |
| C4-2 `role="list"` with zero `listitem`s | MAJOR | **NEW** |
| C4-3 card action mouse-only (36-Tab walk, `tabIndex:-1`, Enter inert) | MAJOR | **NEW** |
| C4-4 `/#/mix` nests the card's button inside a button | MAJOR | **NEW** |
| C4-5 no live region for any async verdict | MAJOR | **NEW** |
| C4-6 click-to-rename title is an unfocusable `<span>` | MINOR | **NEW** |
| C4-7 `EMPTY_PALETTE_SWATCH` dead; the real empty state is a 40 px transparent band | MINOR | **NEW** |
| C4-8 16 × 16 drag handle; no keyboard reorder | MINOR | **NEW** |
| C4-9 no timer disposal anywhere in the folder | MINOR | **NEW** |
| C4-10 no hover state (MT-F036 b) | BLOCKER | CONVERGE (C3-1) — re-measured, `diff: {}` |
| C4-11 faceted slab + inert cast + press-var mismatch (MT-F036 a) | BLOCKER | CONVERGE (C3-2) — re-measured live |
| C4-12 `.floating-panel` declared nowhere; panel off-screen | BLOCKER | CONVERGE (C3-5) — `declaredRules: []` stylesheet walk |
| C4-13 the swatch is not a control | BLOCKER | CONVERGE (C3-6) — re-measured, `interactiveInPanel: 0` |
| `ActionFeedback` split-brain seam | MAJOR | **UPGRADE** of C3-7 — the bug diagnosed to its seam, with the one-owner cure |
| menu `@click` items are keyboard-dead | — | **NEGATIVE** — my hypothesis; Enter on Rename works |
| non-PRM interrupted transition | — | **NEGATIVE** — pass 3's negative re-confirmed by a second method |
| bare-array store fixture | — | **APPARATUS CORRECTION** — silently discarded; probes using it measured an empty page |

No pass-1, pass-2 or pass-3 finding is withdrawn. Pass 2's C-3 (the `parseCssColor` throw taking
the Browse pane down) remains the most severe finding in the folder overall; I could not re-reach
it (probe F could not raise a remote card without the authed e2e fixture) and I neither confirm
nor dispute it.

---

## Strongest defect (pass 4's own contribution)

**C4-1.** Everything else in this folder is a defect the component *has*; C4-1 is a defect the
component *causes* — silently, on every reduced-motion machine, in a way no gate in this
repository can observe. Its shape is the general disease pass 3 named, inverted: not prose
describing behaviour the code lacks, but **code depending on behaviour the app's own
accessibility policy guarantees will not happen**. The card hand-rolled a fourth transition family
in JavaScript twelve lines below a correct, CSS-declared, PRM-safe height morph it already uses —
and the guard that makes the CSS family safe is exactly what breaks the JS one.

---

## Files

- Report: `docs/tranches/V/megatranche/audit/components/PaletteCard/challenge-C-implementation.md`
- Pass 3 preserved: `…/challenge-C-implementation.pass-3-2026-07-28.md`
- Probes: `probe-C4-pass4.mjs`, `probe-C4b-pass4.mjs`, `probe-C4c-pass4.mjs`,
  `probe-C4d-pass4.mjs`, `probe-C4e-pass4.mjs`, `probe-C4f-pass4.mjs` (+ a `-results.json` each)
- Subject: `demo/palettes/browser/card/PaletteCard/{PaletteCard,PaletteCardMenu,PaletteCardMeta,PaletteCardSwatches,PaletteRenameInput,ActionFeedback}.vue`
- Implicated: `demo/palettes/browser/card/composables/{useHeightTransition,useHoverPopover,useLeaveTimer}.ts`,
  `demo/palettes/browser/card/{PaletteCardGrid,PaletteColorStrip,SwatchHoverMenu}.vue`,
  `demo/workbenches/mix/MixSourceSelector.vue:246-268`, `demo/styles/animations.css:60-135`,
  `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`
