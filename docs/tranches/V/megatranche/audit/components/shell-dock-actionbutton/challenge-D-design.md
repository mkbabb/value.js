# CHALLENGE-D — `demo/shell/dock/ActionButton.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)** — the explicit tier declared for this
seat. Not an inherited or undeclared seat.

---

## Verdict

**DEFECTIVE.** Seventeen findings, two of them BLOCKER-grade, both proven by measurement on the
live tree rather than by reading.

The component's governing defect is a single **gestalt** one, and every other finding is a
symptom of it: `ActionButton` is a **hand-rolled parallel dock control**. It sits *inside the same
control row* as `glass-ui`'s `DockControl` — two of them, one on each side, separated only by a
`DockSeparator` — and it re-implements, worse and smaller, every register that primitive already
owns: seat geometry, hit-cell/paint-box separation, hover face, press feedback, selected state,
focus ring, disabled contract. The result is measurable visual incoherence in one 480 px strip of
chrome: **32 px controls abutting 40 px controls**, an **opaque near-black square focus ring next
to a soft accent capsule ring**, and — worst — **a hover colour that is pixel-identical to the
selected colour**.

The strongest single defect: **hover state and selected state render the same ink.** Measured, on
the picker route, in the same frame: the hovered `Copy color` icon strokes
`oklab(0.454082 0.129423 0.0747343)` and the *unhovered, selected* `Palettes` icon strokes
`oklch(0.454991 0.15 30)`. Converting the first: C = √(0.129423² + 0.0747343²) = 0.14945,
H = atan2(0.0747343, 0.129423) = 30.0°, L = 0.4541. **They are the same colour to three decimal
places.** A user cannot distinguish "my pointer is here" from "this one is on".

---

## What the component is, and where it renders

`ActionButton` is the icon-action seat of the dock's action-bar layer. Two consumers:

| Consumer | Instances | Route surface |
|---|---|---|
| `demo/shell/dock/ActionToolbar.vue:3,15,26,37,50` | 5 fixed (`Reset color`, `Copy color`, `Random color`, `Palettes`, `Extract palette`) | picker `/#/` |
| `demo/shell/dock/layers/GenericActionBar.vue:16` | `v-for` over `DockAction[]` | every workbench route (3 on `/#/gradient`) |

Both are mounted by `ActionBarLayer.vue:102` / `Dock.vue:157`, **behind the `Tools` disclosure**.

### D-0 (INFO, but it frames everything) — the tracked visual audit contains zero pixels of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.md` is 60 captures across 4 matrices × 15 routes.
Every one of them shows the dock in its **summary** layer. Confirmed by reading
`shots/safari-desktop-light/picker.png` and `shots/safari-desktop-dark/picker.png`: the dock reads
`Home ⌄ | Tools → | Login | @mbabb` in both schemes. The five `ActionButton`s are behind `Tools`.

Consequently **no finding below could have been produced by the tracked evidence base**; all of it
required driving the live server at `http://localhost:9000` and opening the layer by hand. That is
itself a design-process defect: the component that owns *Copy* — the product's terminal verb — has
never been photographed.

The rendered truth, captured live at 1440×900 (device scale, action-bar layer open, pointer on
`Copy color`):

```
← | ↺ ⧉ ⌗ ◉ ▣ | T          ← the row, left to right
      ^hovered  ^selected    ← both red, indistinguishably
```

---

## Evidence base

All measurements from `http://localhost:9000`, Chromium via Playwright, 1440×900 unless stated.
Repository at `tranche-u` / `c654824e`. Source read at `demo/shell/dock/ActionButton.vue` (137 lines).

Canon read: `docs/tranches/V/VISUAL-CONSTITUTION.md`, `docs/tranches/V/PROPORTION-AUDIT.md`,
`docs/tranches/V/PALETTE-CONTRACT.md`, `demo/DESIGN.md`, `demo/styles/focus-ring.css`,
`demo/color-session/ink.ts`, `demo/color-session/useContrastSafeColor.ts`,
`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts`.

**Master measurement — picker route, action bar open, at rest (pointer parked on the `←` control):**

```json
{"sizes":[32,32,32,32,32], "backSize":40, "pitch":[38,38,38,38], "gaps":[6,6,6,6],
 "restState":[{"l":"Reset color","sk":"rgb(28, 25, 23)","sw":"2px","ap":null,"dis":false},
              {"l":"Copy color","sk":"rgb(28, 25, 23)","sw":"2px","ap":null,"dis":false},
              {"l":"Random color","sk":"rgb(28, 25, 23)","sw":"2px","ap":null,"dis":false},
              {"l":"Palettes","sk":"oklch(0.454991 0.15 30)","sw":"2px","ap":null,"dis":false},
              {"l":"Extract palette","sk":"rgb(28, 25, 23)","sw":"2px","ap":null,"dis":false}]}
```

**Master measurement — same row, pointer on `Copy color`:**

```json
[{"l":"Reset color","st":"closed","tf":"none","sk":"rgb(28, 25, 23)"},
 {"l":"Copy color","st":"open","tf":"matrix(1.19924, 0, 0, 1.19924, 0, 0)","sk":"oklab(0.454082 0.129423 0.0747343)"},
 {"l":"Random color","st":"closed","tf":"none","sk":"rgb(28, 25, 23)"},
 {"l":"Palettes","st":"closed","tf":"none","sk":"oklch(0.454991 0.15 30)"},
 {"l":"Extract palette","st":"closed","tf":"none","sk":"rgb(28, 25, 23)"}]
```

---

# Findings

## Family A — state collision (the design never separated the state axes)

### D-1 · BLOCKER · Hover ink and selected ink are the same colour

**Evidence.** The two master measurements above, same frame, same row.
Hovered `Copy color` stroke `oklab(0.454082 0.129423 0.0747343)` ≡ `oklch(0.4541 0.1495 30.0°)`.
Selected, unhovered `Palettes` stroke `oklch(0.454991 0.15 30)`. Identical within rounding.

**Mechanism.** `ActionButton.vue:30` writes `--hover-color: cssColorOpaque` inline on the icon;
`ActionButton.vue:119` consumes it as `.action-icon:hover { stroke: var(--hover-color) }`.
`ActionToolbar.vue:46` writes the *selected* state as
`:active-style="paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2' } : {}"` — the **same
`cssColorOpaque`**. One colour, two orthogonal state axes.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Focus remains visibly distinct from selection in both
schemes, forced colors and reduced transparency." The same separation obligation applies a fortiori
to hover vs selection, which here are not merely confusable but *equal*.
`PROPORTION-AUDIT.md §5.5`: "A small icon/mark is either data, status, labeled action, drag
affordance, focus/selection register or removed." Here the mark tries to be two registers at once
with one channel.

**Reproduction.** `http://localhost:9000/#/` → click `Toggle action bar` → park the pointer on the
`Copy color` icon → read `getComputedStyle(svg).stroke` on `Copy color` and on `Palettes`.

**Cure (transposition, not patch).** Delete `activeStyle` entirely. Selection is `DockControl`'s
`active` prop, which the producer documents as stamping `aria-pressed` + `data-active` and reading
`--dock-control-active-bg` — "the 'selected reads as glass' tier — **never a saturated brand hue**"
(`DockControl.vue.d.ts`). Selection becomes a *seat* change; hover stays an *ink* change. Two
channels, two axes.

---

### D-2 · BLOCKER · The focus ring is a token-fallback accident, and it contradicts a ratified in-repo cure

**Evidence — three independent measurements.**

1. `:root` tokens, measured: `--ring` → `""`, `--color-ring` → `""`. **Both empty.**
2. `ActionButton` on genuine keyboard `:focus-visible` (real `Tab`, `matches(':focus-visible') === true`):
   ```
   outline:    "none 1px rgb(0, 95, 204)"        ← outline-style: none
   boxShadow:  "… rgb(28, 25, 23) 0px 0px 0px 2px …"   ← OPAQUE --foreground
   borderRadius: "4px"
   ```
3. The adjacent producer control (`.focus-ring`, `aria-label="Palette menu"`) on `:focus-visible`,
   same page, same instant:
   ```
   boxShadow: "color(srgb 0.665504 0.000101413 0.261748 / 0.3) 0px 0px 0px 2px,
               color(srgb 0.665504 0.000101413 0.261748 / 0.15) 0px 0px 8px …"
   ```
   i.e. `--focus-ring-shadow`, measured on `:root` as
   `0 0 0 2px color-mix(in srgb, <accent> 30%, transparent), 0 0 8px color-mix(in srgb, <accent> 15%, transparent)`.

So the authored intent at `ActionButton.vue:15` — `focus-visible:ring-2 focus-visible:ring-ring/40`
— **never ships**: `ring-ring/40` reaches an empty token, the `/40` alpha evaporates, and `ring-2`
falls back to `currentColor` = `--foreground` = opaque `rgb(28,25,23)`. Two different focus
registers, 40 px apart, in one control row: a hard opaque near-black 4 px-radius square vs a soft
accent capsule with an 8 px bloom.

**This exact defect was already adjudicated and cured — and this file did not adopt the cure.**
`demo/styles/focus-ring.css:9-15` (U.W-A11Y · U-F25):

> The U-F25 defect had TWO deaths: (1) an inline `boxShadow` on the control CLOBBERED Tailwind's
> `focus-visible:ring-2` box-shadow layer, and (2) the `--ring`/`--color-ring` token it reached
> resolved EMPTY — so even an un-clobbered ring painted nothing.

and, at line 4, the standing law: "ONE token recipe reused by every keyboard-operable control …
**never a per-control literal**", plus line 31: "with a forced-colors `outline` fallback (box-shadow
is stripped in WHCM)". `ActionButton.vue:15` is a per-control literal reaching the exact token the
ruling names as empty.

**Forced colors, measured.** With `forcedColors: 'active'` and the button genuinely `:focus-visible`:
`boxShadow: "none"` — the ring is stripped, as the ruling predicted. Focus survives only because
Chromium's UA re-instates an outline (`outline: "solid 2px rgba(5, 0, 73, 0.8)"`) over the authored
`outline: none`. The component ships **no** forced-colors posture; the house has one and uses it
elsewhere (`@media (forced-colors: active) { .disclosure-trigger:focus-visible { box-shadow: none;
outline: highlight solid 2px } }`, present in the loaded sheets).

**Canon.** `VISUAL-CONSTITUTION.md §4.1`, and `PROPORTION-AUDIT.md §5.8`: "Real rendered relation
wins over token intent … token presence alone cannot close a row." A class name that resolves to an
empty variable is the purest case of token-presence-without-rendered-relation.

**Reproduction.** Open the action bar, `Tab` onto an action icon, read
`getComputedStyle(document.activeElement).boxShadow`. Compare with the neighbouring `.focus-ring`
control.

**Cure.** Delete the two Tailwind ring utilities and the `focus-visible:outline-none`. Focus belongs
to `DockControl`'s producer-owned register; if a bespoke seat must survive, it composes
`demo/styles/focus-ring.css`'s dual-contrast recipe verbatim with its forced-colors `outline` arm.

---

### D-3 · MAJOR · Selected state is colour-only, carries no `aria-pressed`, and its second channel is a measured no-op

**Evidence.** In the rest-state measurement, `Palettes` (the selected seat) reports
`sk: "oklch(0.454991 0.15 30)"`, `sw: "2px"`, `ap: null`. Every unselected sibling reports
`sw: "2px"`. `ActionToolbar.vue:46` authors `strokeWidth: '2'` as the selected state's *second*
channel — but lucide icons already ship `stroke-width="2"`. **The stroke-width delta is zero.**
Selection therefore ships as pure hue, on a 24 px glyph, with `aria-pressed === null`.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Selected, failed, pending, withdrawn and disabled states
are **never color-only**. Role, accessible name, state/value and associated error/status are
explicit." `PROPORTION-AUDIT.md §5.5` likewise.

**Reproduction.** Open the picker action bar with a palette active; read `strokeWidth` and
`aria-pressed` on the `Palettes` seat vs any sibling.

**Cure.** `DockControl :active="paletteActive"` — the producer stamps `aria-pressed` and a
seat-level `data-active` fill. The whole `activeStyle?: Record<string, string>` prop dies with it;
an untyped inline-style bag is not a state API.

---

### D-4 · MAJOR · The disabled arm is unreachable, unexplained, alpha-only, and lies with the cursor

`ActionButton.vue:17-18` sets **both** `aria-disabled` and the native `disabled` attribute; the only
visual is `ActionButton.vue:27` `disabled && 'opacity-50'` on the icon.

**Evidence (measured, disabled arm forced on a live seat exactly as `ActionToolbar.vue:44,57` does):**

```json
{"disabledLabel":"Reset","dataState":"closed","tabIndexReachable":false,
 "iconOpacity":"0.5","iconStroke":"rgb(28, 25, 23)","cursor":"pointer","openPopoverCount":0}
```

Four separate defects in one arm:

1. **The explanation is unreachable.** A natively `disabled` button dispatches no pointer events, so
   the hover `Popover` — the *only* place the `title`/`description` copy lives — can never open on
   the control the user needs it for. Measured: 1200 ms of pointer dwell, `data-state` stayed
   `"closed"`, zero popovers open. The user is told "no" and never told why.
2. **It leaves the tab order.** `tabIndexReachable: false`. A keyboard user cannot even land on it
   to discover its name.
3. **The state is alpha-only** — `opacity: 0.5` on `rgb(28,25,23)` over the measured light dock
   composite `rgb(240,194,190)` gives ≈ **2.97 : 1**, i.e. it drops *below* the 3:1 non-text floor
   (`GRAPHICS_CONTRAST_FLOOR = 3`, `demo/color-session/ink.ts:16`) while conveying state by alpha
   alone — the thing `§4.1` forbids.
4. **`cursor: pointer` persists.** `ActionButton.vue:111` sets `cursor: pointer` with no `:disabled`
   arm. The hand cursor promises an action the control refuses. Measured above.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`; and `DockControl.vue.d.ts` names the contract this arm
should implement: "Disabled state (**the four-state contract**). A boundary nav control stays
PRESENT but disabled so the row geometry holds, never DOM-absent."

**Cure.** `aria-disabled` **without** the native attribute, so the seat keeps pointer + tab reach and
can still explain itself; state carried by the producer's disabled register, not by opacity; the
tooltip content promoted out of hover-only reach (see D-6).

---

## Family B — the design-system boundary was crossed and the primitive re-implemented

### D-5 · MAJOR · A hand-rolled `<button>` where `DockControl` is the design system's answer — with the counterexample in the same file's sibling

**Evidence.** `ActionButton.vue:13-33` is a bare `<button class="action-button-wrapper">` with a
9-declaration local box model (`ActionButton.vue:105-116`). Its own parent,
`ActionBarLayer.vue:129`, renders `<DockControl>` for the toggle sitting immediately to its right;
`Dock.vue:143,144,154` renders `<DockControl>` for Save/Cancel/Back. So `ActionButton` and
`DockControl` are **adjacent siblings in one row**, separated by `DockSeparator`
(`ActionBarLayer.vue:124`).

Measured geometry in that one row, 1440×900:

| Seat | Hit cell | Paint (glyph) | Hit ≠ paint? | Hover face | Press register |
|---|---|---|---|---|---|
| `DockControl` (`←` back) | **40 × 40** | inset via `--dock-control-safe-inset` | yes, by producer contract | `.glass-capsule-hover` + specular gleam | interruptible spring |
| `ActionButton` × 5 | **32 × 32** | 24 × 24 | **no — the button *is* the paint box** | none | none |

`DockControl.vue.d.ts` states the contract `ActionButton` violates verbatim:

> the painted plate insets via the dock-scoped `--dock-control-safe-inset` fold, while the **HIT CELL
> stays the full `--dock-control-size` (≥44px on coarse via the density clamp) — hit box ≠ paint
> box**.

`ActionButton.vue:109-110` hardcodes `width: 2rem; height: 2rem` with no coarse-pointer arm at all.
On a touch device the producer's controls clamp to ≥44 px and these stay 32 px.

**Canon.** Owner edict 4 (glass-ui is the design system; reuse existing component-type names).
`PROPORTION-AUDIT.md §5.7`: "**Visual glyph size, operable target size and layout reservation are
separate quantities.** Accessibility floors do not require bloated visible chrome." — the exact law
`DockControl` implements and `ActionButton` collapses into one number. `PR-12` in the register
("Touch padding bloats/misaligns visual glyphs → TIGHTEN; **invisible/seat geometry preserves target
floor while optics follow rung**") is unclosed here.

Corroborated by `REPORT.md`'s `smallTapTargets` row: 8 on `/#/` desktop and mobile, in both schemes,
on a route whose dock is *closed* — i.e. before these five ever appear.

**Reproduction.** Open the action bar; `document.querySelectorAll('.action-button-wrapper')` →
`getBoundingClientRect()` → 32 × 32 each; `document.querySelectorAll('.dock-icon-button')[0]` → 40 × 40.

**Cure.** The whole `<style scoped>` box model and the bare `<button>` die; the seat becomes
`<DockControl :active :disabled>`. This is the one change that dissolves D-1 through D-5 together.

---

### D-6 · MAJOR · A `Popover` impersonating a `Tooltip`, with the help text orphaned from every non-pointer user

**Evidence (measured on every instance).**

```
aria-describedby: null      aria-expanded: null      data-state: "closed"|"open"
```

The `PopoverContent` (`ActionButton.vue:35-44`) carries the only copy of `title` **and** the only
copy of `description`. It opens on `trigger="hover"` alone. Nothing associates it with the button.
Therefore:

- the **description is never announced** — `aria-label` (line 16) duplicates only `title`;
- the description is **unreachable by keyboard**, since focus does not open the popover;
- the description is **unreachable on touch** (no hover);
- the description is **unreachable on the disabled seats that need it most** (D-4).

Meanwhile glass-ui ships the correct primitive — `node_modules/@mkbabb/glass-ui/dist/components/tooltip/`
exports `Tooltip`, `TooltipTrigger`, `TooltipContent`, **`TooltipProvider`** — and the component
imports `Popover*` instead.

**Worse: the component hand-rolls what `TooltipProvider` exists to do.** `hoverKey` +
`activeHover: string | null` + `emit("update:activeHover")` (`ActionButton.vue:59-88`) is a
prop-drilled single-open-at-a-time protocol, duplicated in both consumers
(`ActionToolbar.vue:85`, `GenericActionBar.vue:11`) and re-bound on **every** instance
(`ActionToolbar.vue:13,24,35,48,60`). `TooltipProvider`'s `delayDuration`/`skipDelayDuration` is
precisely this machine, owned by the producer. The magic numbers `:close-delay="0"` and
`:open-delay="300"` (`ActionButton.vue:7-8`) are the same reinvention at the timing layer.

**Canon.** Owner edicts 3 (KISS, no contrivance) and 4 (glass-ui is the design system).
`PROPORTION-AUDIT.md §5.6`: "**Subtraction precedes explanation**"; `PR-16`: "no tooltip
proliferation"; `PR-07` "Hover-only/unlabeled controls … ADD-AFFORDANCE".

**Cure.** `Tooltip`/`TooltipTrigger`/`TooltipContent` under one `TooltipProvider` hoisted to the
action bar. The `hoverKey`, `activeHover` props and the `update:activeHover` emit — **three of the
component's eleven props/emits** — delete outright.

---

### D-7 · MINOR · Two import paths to one producer

`ActionButton.vue:50-55` imports `Popover*` from `"../../ui/popover"`, whose entire content is
`export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";` — a pure passthrough
barrel. Line 55 then imports `useOptionalDockContext` **directly** from `"@mkbabb/glass-ui/dock"`.
Two conventions for one dependency inside one 137-line file. The barrel is exactly the kind of
indirection owner edict 2 (no aliases/dual paths) and edict 3 (no wrapper that need not exist)
forbid.

---

## Family C — motion and feedback

### D-8 · MAJOR · The success flash is the only truth of `Copy`, it fires before the result is known, and reduced motion annihilates it

**Evidence — source.** `demo/picker/ColorPicker.vue:323-326`:

```js
copy: () => {
    updateModel({ inputColor: formattedCurrentColor.value });
    void writeClipboard(formattedCurrentColor.value);
},
```

`void` on the promise: no `await`, no `.catch`, no status, no error surface. And
`ActionButton.vue:92-99`:

```js
function handleClick() {
    emit("update:activeHover", null);
    isClicked.value = true;          // ← the "success" flash starts HERE
    setTimeout(() => { isClicked.value = false; }, 400);
    emit("action");                  // ← the action has not run yet
}
```

The flash is set **before** the action is emitted and is never conditioned on its outcome. A
rejected clipboard write (denied permission, insecure context, Safari user-gesture loss) produces an
identical celebration. The flash is also the only feedback that exists — nothing else in the tree
reports the copy.

**Evidence — reduced motion, measured.** With `reducedMotion: 'reduce'`:

```json
{"prm":true,"animationDuration":"1e-05s","hasFlashClass":true,
 "afterClickAnimations":[{"n":"action-pulse-29f59cb1","dur":0.01}]}
```

The global guard (`demo/styles/animations.css:184-193`) collapses `action-pulse` to 0.01 ms with
`forwards`, so it lands instantly on its 100 % frame (`stroke: currentColor; stroke-width: 2;
transform: scale(1)`) — the resting state. **A reduced-motion user pressing `Copy` receives
literally zero feedback that anything happened.**

**Canon.** `VISUAL-CONSTITUTION.md §5`: "A transient flourish may celebrate success but **never
carries the only truth**." `§4.1`: "Selected, **failed**, pending, withdrawn and disabled states are
never color-only." `PR-08`: "Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**
… Persistent entity status/recovery."

**Reproduction.** Emulate `prefers-reduced-motion: reduce`, open the action bar, click `Copy color`;
observe no state change anywhere. Independently: block clipboard permission and click; observe the
same flash as on success.

**Cure.** The action returns a result; the seat renders a durable, announced status
(`FeedbackMark` exists in glass-ui's dist). The flash becomes decoration on top of a truth that
survives without it.

---

### D-9 · MINOR · A repeat press produces no feedback (measured), and the timer duplicates the CSS clock

**Evidence.** Click at t=0, click again at t≈80 ms, sampling the icon's running animations:

```json
[{"t":80,  "names":["action-pulse-29f59cb1"], "classes":true},
 {"t":140, "names":[{"n":"action-pulse-29f59cb1","ct":133}], "classes":true},
 {"t":540, "names":[], "classes":false}]
```

At t=140 the animation's `currentTime` is **133 ms** — it is the *first* animation still running.
The second press set `isClicked = true` on an already-true ref, so the class never left the element,
so the CSS animation never restarted. **The second press is silent.**

Two more defects in the same nine lines: the `400` in `setTimeout` (`ActionButton.vue:95-97`)
duplicates the `0.4s` authored three times in CSS (`ActionButton.vue:122,125,126`) — two clocks that
can drift; and the timer is never cleared, so an unmount mid-flash writes to a dead component's ref.

**Cure.** Drive the beat off `animationend`, or off `DockControl`'s producer press register, which
is documented as "interruptible" — the property this hand-roll lacks by construction.

---

### D-10 · MINOR · The motion is un-tokenised at every layer, and one hover affordance is very likely dead

`demo/DESIGN.md:266` books the `0.4s` literals as a deliberate "bespoke" keep. Accepted for the
*keyframe durations*. The rest is not booked and not tokenised:

- `:open-delay="300"` / `:close-delay="0"` (`ActionButton.vue:7-8`) — bare numbers, no token.
- The icon transition resolves to **`0.2s`** on `GenericActionBar` seats (measured) — the bare-utility
  default, not `--duration-normal` (0.3 s). `demo/DESIGN.md` books this as row R1, "DEAD until PKT-1
  clears the dist `:root` 150ms clobber"; it is live here at 200 ms.
- `.action-icon:hover { transform: scale(1.2) }` (`ActionButton.vue:118`) has **no reduced-motion
  arm**. The global guard only *shortens* it (measured `transitionDuration: "0.1s"` under
  `prefers-reduced-motion: reduce`) — the 1.2× geometry jump still happens, as a jump-cut.
  `VISUAL-CONSTITUTION.md §6`: "Reduced motion resolves directly to the final geometry and stable
  chromatic state."
- **PLAUSIBLE (labelled hypothesis, not confirmed):** the Reset seat's distinguishing hover
  affordance may not animate. Measured on the live element: class list
  `"… action-icon w-6 h-6 stroke-foreground transition-[transform,stroke] hover:-rotate-180
  duration-normal"`, computed `transitionProperty: "transform, stroke"`, `transitionDuration: "0.3s"`.
  Tailwind v4 compiles `rotate-*` to the standalone CSS `rotate` property, which is **not** in that
  transition list — so the 180° hover rotation would snap rather than sweep. I did not land a clean
  live hover on that seat (the dock's crossfade repeatedly re-took the pointer), so this is a
  hypothesis with an exact one-line check: hover the Reset icon and sample `getComputedStyle(svg).rotate`
  at 50 ms and 250 ms; equal non-`none` values confirm the snap.

Note (INFO): my CSSOM rule-scan could not see the Tailwind utility layer at all — `stroke-foreground`,
which demonstrably applies, returned 0 rules across 45 sheets. **No finding in this report rests on
that scan**; every claim above is a computed-style measurement on a live element. Recorded so a
later seat does not repeat the dead end.

---

## Family D — chromatic law

### D-11 · MAJOR · The accent ink is certified against the wrong material rung, and against the text floor instead of the graphics floor

**Evidence — source chain.** `ActionButton` consumes `cssColorOpaque`, which is `SAFE_ACCENT_KEY`
(`ActionBarLayer.vue:24,105`; `Dock.vue:35,157`). `SAFE_ACCENT_KEY` is provided at
`demo/color-picker/composables/boot/useAtmosphereBoot.ts:87-91` as
`useContrastSafeColor(atmosphereColor, derivedLightness).safeAccentCss`, whose body
(`demo/color-session/useContrastSafeColor.ts:302-310`) is:

```js
certifyAccentInk(cssColorOpaque.value,
                 surfaceLightnessNow("resting", ambientLightness.value, isDark.value))
```

— the **`"resting"`** rung, at the **default 4.5 text floor** (`ink.ts:133`).

The house law for this exact case is written two functions below, at
`useContrastSafeColor.ts:338-352`:

> pass the D1 rung — **`"floating"` for menu/dock chrome**, `"resting"` for plate-seated ink …
> `@param floor` optional WCAG floor override — pass **`GRAPHICS_CONTRAST_FLOOR` (3) for non-text
> ink** (WCAG 1.4.11: slider tracks, rails)

`ActionButton` paints that resting-certified ink as an **icon stroke on the dock chrome tier**, and
never injects `useSafeAccentFn`. The correct idiom exists in-repo:
`demo/workbenches/extract/ExtractControls.vue:124` → `safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR)`.

**Evidence — measured consequence.** `oklch(0.454991 0.15 30)` → `rgb(153, 41, 29)` (canvas
round-trip). Dock plate measured `color(srgb 0.931227 0.845921 0.816039 / 0.5392)` (light) and
`color(srgb 0.376885 0.293161 0.253837 / 0.5776)` (dark).

| | composited dock backdrop | accent icon contrast | resting ink contrast |
|---|---|---:|---:|
| light | `rgb(240,194,190)` | **4.90 : 1** ✓ | 10.96 : 1 |
| dark | `rgb(85,62,57)` | **1.26 : 1** ✗ | 7.91 : 1 |

*Stated assumption:* the ambient ground under the translucent plate was sampled as `[244,168,168]`
light / `[70,45,45]` dark from the captured frames; the dark row is therefore an **estimate**, and
`--accent-live` may re-certify on a genuine scheme load in a way my class-flip did not trigger. The
*mechanism* — wrong rung, wrong floor, no `useSafeAccentFn` injection — is confirmed from source and
does not depend on the estimate.

**Canon.** `VISUAL-CONSTITUTION.md §4.1`: "Text, focus, boundaries and state meet their rendered
contrast **on the actual material tier**; a token name is not evidence." That sentence is this
finding.

---

### D-12 · MINOR · Two custom properties carrying one value, written inline on every icon

`ActionButton.vue:30`:

```js
:style="{ ...activeStyle,
          '--flash-color': cssColorOpaque ?? 'currentColor',
          '--hover-color': cssColorOpaque ?? 'currentColor' }"
```

Measured on every live seat: `"--flash-color: oklch(…); --hover-color: oklch(…);"` — **identical
values**, on all five nodes, re-serialised on every colour change. Two token names, one meaning,
zero abstraction earned; and they are per-instance inline styles on a property that should be set
once at the row root.

**Canon.** Owner edict 5 (style at the root component level, never per-instance overrides).

**Cure.** One `--dock-action-accent` set once on the action-bar root; both consumers inherit it.
`cssColorOpaque` leaves the prop list.

---

## Family E — dead surface and undesigned states

### D-13 · MINOR · Two props are dead, and one of them has an unstyled class

Verified by grep across both and only consumers (`ActionToolbar.vue`, `GenericActionBar.vue`) and
against the `DockAction` interface (`demo/shell/usePaneRouter.ts:38-47`, which has no `label`,
`hidden`, `activeStyle`, or `cssColorOpaque` member):

- **`label?: string`** (`ActionButton.vue:65`) — **never passed by any consumer.** It renders
  `<span v-if="label" class="action-label">` (line 32), and **`.action-label` has no rule anywhere in
  the scoped block** (lines 102-137 define only `.action-button-wrapper`, `.action-icon:hover`,
  `.action-flash`, `.action-rotate` and the two `@keyframes`). Dead prop, unstyled class, and — were
  it ever used — it would inject text into a `2rem × 2rem` `flex-shrink: 0` box (lines 109-112) that
  cannot hold it. **A state that was never designed.**
- **`hidden?: boolean`** (`ActionButton.vue:69`) — **never passed**, and it drives `v-if` on the
  root (line 3): a prop whose entire job is to remove the control from the DOM. That is the exact
  pattern `DockControl.vue.d.ts` forbids: "A boundary nav control stays PRESENT but disabled so the
  **row geometry holds, never DOM-absent**."

**Canon.** Owner edicts 2 (no legacy/dual paths) and 3 (KISS). Delete both.

---

### D-14 · MINOR · The tooltip title takes the palette-identity type role

`ActionButton.vue:41`: `<p class="font-display font-medium text-subheading">{{ title }}</p>`.

`VISUAL-CONSTITUTION.md §4` closes the type matrix across all eighteen compositions:
`--type-subheading` is **palette identity**, Fraunces; "control or label, including dropdown options"
is `text-small`, **Plus Jakarta Sans, non-bold**. Tooltip help copy for an icon action is a label,
not a palette identity. The comment at lines 37-40 records a prior T.W4-6 fix to this same line for
a *different* reason — the role assignment itself was never re-examined.

---

### D-15 · MINOR · Adjacent-target gutter measured at 0 px, and two control diameters in one row

Two measured configurations:

| Route | Instances | Button | Pitch | **Gap** |
|---|---|---|---|---|
| `/#/gradient` (`GenericActionBar`, 3 actions) | 3 | 32 px | 32 px | **0 px, 0 px** |
| `/#/` (`ActionToolbar`, 5 actions) | 5 | 32 px | 38 px | 6 px, ×4 |

`justify-around` on a `flex-1` that has collapsed to content width distributes nothing; on the
narrower gradient dock the three targets **abut with zero separation**, `Reset` flush against `Copy`.
Three destructive-adjacent-to-benign targets at 32 px with no gutter is a mis-tap generator. In the
same row the neighbouring `DockControl` measures **40 px** — a 1.25× diameter mismatch between two
seats 6 px apart.

Visible in the captured frame: the five glyphs read as one crowded cluster at 24-in-32 (75 % fill),
against the back-arrow's inset paint in a 40 px cell.

**Canon.** `VISUAL-CONSTITUTION.md §3.7`: "Spacing is container-scaled from glass-ui tokens."
`PROPORTION-AUDIT.md §5.7` and `PR-12`.

---

### D-16 · INFO (hypothesis) · The dock keep-open refcount can leak on unmount

`ActionButton.vue:81-88` calls `dock?.keepOpen()` / `dock?.release()` from the popover's open-change
handler. `dockContext.d.ts:27-30` documents these as refcounted ("Reactive `keepOpenCount > 0` flag").
There is no `onUnmounted` release. If the seat unmounts while its popover is open — the action-bar
layer swaps, the route changes, `GenericActionBar`'s `v-for` list mutates — the close handler never
fires and the count is incremented forever, pinning the dock expanded.

**Reproduction: NONE.** I did not exercise it. Mechanism stated exactly; a `watchEffect`/`onScopeDispose`
release would close it regardless.

---

### D-17 · INFO · Partial reactive-props destructure

`ActionButton.vue:59` destructures only `{ hoverKey, activeHover }` from an eleven-member prop list;
the other nine are read off the implicit props object in the template. Both work under Vue 3.5's
reactive-props-destructure, but the file states two conventions for one thing. Cosmetic; noted for
completeness under owner edict 7.

`verbatimModuleSyntax` (edict 8) is **satisfied**: `ActionButton.vue:49` uses the inline
`type Component` modifier correctly.

---

## Judgment against the proportion register and seat law

| Register row | Status here |
|---|---|
| `PR-07` — hover-only/unlabeled controls, invisible drag state → ADD-AFFORDANCE | **OPEN.** Every description in this component is hover-only (D-6); the disabled seats cannot show theirs at all (D-4). |
| `PR-08` — pending/failure truth only transient → ADD-AFFORDANCE | **OPEN.** `Copy` has no truth but a 0.4 s flash that fires before the result and vanishes under reduced motion (D-8). |
| `PR-12` — touch padding bloats/misaligns visual glyphs → TIGHTEN; "invisible/seat geometry preserves target floor while optics follow rung" | **OPEN and inverted.** The seat *is* the glyph box at 32 px with no coarse arm; the producer primitive next to it holds ≥44 on coarse (D-5). |
| `PR-16` — dock marks need explicit purpose/state law, "no tooltip proliferation", "labels remain perceptible in both schemes" | **OPEN.** Five hover-tooltip triggers in one 200 px strip; the selected mark's state law is one hue that equals the hover hue (D-1, D-3). |
| `§5.5` — a small icon/mark is data, status, labeled action, drag affordance, focus/selection register, **or removed** | **VIOLATED.** These marks are simultaneously action, hover register and selection register on one channel. |
| `§5.7` — glyph size, operable target size and layout reservation are separate quantities | **VIOLATED.** All three are `2rem`. |
| `§5.8` — real rendered relation wins over token intent | **VIOLATED.** `ring-ring/40` is token intent against an empty token; the rendered relation is opaque black (D-2). |
| `VISUAL-CONSTITUTION §4.1` — states never colour-only; focus distinct from selection; contrast met on the actual material tier | **VIOLATED three ways** (D-1, D-3, D-4, D-11). |
| `VISUAL-CONSTITUTION §2` — "Seed tint is forbidden outside the ambient field, active accent, WatercolorDot/specimen, and pastel Palettes lanes" | **Arguable at best.** Hover is not "active accent"; the seed tint here decorates a transient pointer state (D-1). |

---

## What is actually right (stated so the report is honest)

- The `<button type="button">` host with `aria-label` (`ActionButton.vue:12-16`) is the correct
  element — the W5-a11y comment's stated goal is met: keyboard reach and Enter/Space activation
  work, verified by real `Tab` landing on `Reset` with `matches(':focus-visible') === true`.
- `aria-hidden="true"` on the icon (line 23) is correct — the name lives on the button.
- Focus is **not** lost in forced colors; Chromium's UA rescues the authored `outline: none`.
- `verbatimModuleSyntax` is satisfied; reactive props destructure is used (partially).
- The `0.4s` keyframe literals are pre-booked in `demo/DESIGN.md:266` as a deliberate bespoke keep,
  and owner edict 6 (animations are never deleted, only moved or tokenised) is respected by the
  cures proposed here — `action-pulse`/`action-spin` move to the seat, they do not die.
- `REPORT.md` records **0** page errors, **0** horizontal overflow, **0** `darkClassMissing`,
  **0** `mainCountNotOne` across all 60 captures. Nothing in this component breaks the page.

---

## The one cure

Everything above is one architectural transposition, not seventeen patches:

```
<Popover trigger="hover">          →  <Tooltip> under one hoisted <TooltipProvider>
  <PopoverTrigger as-child>
    <button class="action-button-wrapper" …>   →  <DockControl :active :disabled>
      <component :is="icon" :style="{--hover-color, --flash-color, ...activeStyle}" />
      <span v-if="label" class="action-label"/>  →  (deleted)
```

That single move deletes: the local box model (D-5), the focus-ring literal (D-2), `activeStyle`
(D-1, D-3), the native-`disabled` arm (D-4), `hoverKey`/`activeHover`/`update:activeHover` (D-6),
the duplicated inline custom properties (D-12), and the dead `label`/`hidden` props (D-13) — and it
inherits, for free, the hit-box ≠ paint-box contract, the ≥44 px coarse clamp, `aria-pressed`, the
glass hover face, the interruptible spring press and the producer focus register.

Props after: `icon`, `title`, `description`, `active`, `disabled`, `rotateOnClick` — six, from eleven.

**No source edits land from this formation.** This report is the finding, not the fix.
