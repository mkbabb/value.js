# CHALLENGE-C — `demo/shell/dock/ActionButton.vue` — implementation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat was
explicitly spawned with. Declared, not inherited.

---

## Verdict: **DEFECTIVE**

Four MAJOR defects, five MINOR, four INFO. The headline is **C-1**: the component hand-rolls the
dock keep-open protocol that glass-ui 7.0.0 ships as a first-class prop, and the hand-rolled version
is unbalanced in *both* directions — it leaks tokens the dock never gets back, and it returns tokens
it never took. Measured live: the dock's `keepOpenCount` reads **2** with every popover closed and
the pointer parked off the dock, and separately drops **1 → 0** on a cycle in which this component
never called `keepOpen()`.

The component has **zero tests**. Nothing in `test/` or `e2e/` observes any behaviour of this file.

---

## Subject

- File: `/Users/mkbabb/Programming/value.js/demo/shell/dock/ActionButton.vue` (137 lines)
- Consumers (exhaustive — `grep -rn "ActionButton" demo test e2e`):
  - `/Users/mkbabb/Programming/value.js/demo/shell/dock/ActionToolbar.vue` (5 instances, the picker action bar)
  - `/Users/mkbabb/Programming/value.js/demo/shell/dock/layers/GenericActionBar.vue` (`v-for` over `DockAction[]`)
- Mounted at: every route with a dock action bar (`/#/`, `/#/gradient`, `/#/mix`, `/#/generate`, …)
- Last touched: `f2c8f565` (glass-ui 7.0.0 adoption); the `keepOpen`/`release` lines date from
  `a61094e3` (2026-07-17, W43b3 homing) — i.e. **they predate the glass 7 adoption that introduced
  the `keepDockOpen` prop, and were never migrated.**

Environment for every live measurement below: dev server `http://localhost:9000`, Chromium via
Playwright, viewport 1280×900 unless stated, `HEAD c654824e`, glass-ui `7.0.0`, reka-ui `2.9.9`.

---

## C-1 — MAJOR — the hand-rolled dock keep-open token is unbalanced in both directions

### The code

```
demo/shell/dock/ActionButton.vue:55   import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
demo/shell/dock/ActionButton.vue:57   const dock = useOptionalDockContext();
…
demo/shell/dock/ActionButton.vue:81   function onHoverOpenChange(v: boolean) {
demo/shell/dock/ActionButton.vue:82       emit("update:activeHover", v ? hoverKey : null);
demo/shell/dock/ActionButton.vue:83       if (v) {
demo/shell/dock/ActionButton.vue:84           dock?.keepOpen();
demo/shell/dock/ActionButton.vue:85       } else {
demo/shell/dock/ActionButton.vue:86           dock?.release();
demo/shell/dock/ActionButton.vue:87       }
demo/shell/dock/ActionButton.vue:88   }
```

There is **no `onUnmounted`, no `onScopeDispose`, and no local held-flag anywhere in the file.**

### The primitive it reimplements

glass-ui 7.0.0 already owns this. `node_modules/@mkbabb/glass-ui/dist/components/popover/Popover.vue.d.ts:16`:

```ts
    /** Hold an ancestor GlassDock open while this surface is visible. */
    keepDockOpen?: boolean;
```

and `node_modules/@mkbabb/glass-ui/dist/components/dock/composables/dockContext.d.ts` documents the
sanctioned composition verbatim:

> Hover-driven dock popovers compose `<Popover trigger="hover" keep-dock-open>`.

The producer implementation (from `dist/popover-BQGYXZyO.js`, deobfuscated):

```js
let dockCtx = useOptionalDockContext(), held = false;
function releaseIfHeld() { held &&= (dockCtx?.release(), false); }   // ← idempotency flag
watch([resolvedOpen, () => props.keepDockOpen], ([open, keep]) => {
  if (open && keep && dockCtx && !held) { dockCtx.keepOpen(); held = true; }
  else if (!open || !keep) releaseIfHeld();
}, { immediate: true });
onScopeDispose(releaseIfHeld);                                       // ← unmount release
```

Note what the producer watches: **`resolvedOpen`** — `computed(() => props.open ?? internal)`. It
therefore also fires on the *prop-driven* close path. ActionButton instead keys off the
`update:open` **emit**, which the producer only raises from reka's own state transitions:

```js
function onRekaUpdateOpen(v) { if (props.open === undefined) internal.value = v; emit("update:open", v); }
watch(() => props.open, (v) => { if (v !== undefined) internal.value = v; });   // ← no emit
```

So when `handleClick` (line 93) drives `activeHover → null`, `isOpen` → `false`, `:open` → `false`,
the popover closes **without any emit**, and `dock.release()` is never reached on that path.

Verify the divergence:

```
$ grep -rn "keep-dock-open\|keepDockOpen" demo/ | grep -v node_modules
(no output)
$ grep -rn "keepOpen()\|\.release()\|useOptionalDockContext" demo/ | grep -v node_modules
demo/shell/dock/Dock.vue:87:watch(shouldKeepOpen, (open) => { … });
demo/shell/dock/ActionButton.vue:55:import { useOptionalDockContext } from "@mkbabb/glass-ui/dock";
demo/shell/dock/ActionButton.vue:57:const dock = useOptionalDockContext();
demo/shell/dock/ActionButton.vue:84:        dock?.keepOpen();
demo/shell/dock/ActionButton.vue:86:        dock?.release();
```

Nothing in the demo uses the shipped prop. ActionButton is the only consumer that touches the raw
context, and it does so without either guard the producer has.

### Reproduction — direction 1: leaked tokens (never released)

I reached the dock context through Vue's provides table and read `keepOpenCount` non-destructively
(drain with `release()` until `held` is false, count, then restore with the same number of
`keepOpen()` calls):

```js
const el = document.querySelector('.glass-dock');
let inst = el.__vueParentComponent, ctx = null;
while (inst && !ctx) { const p = inst.provides || {};
  for (const s of Object.getOwnPropertySymbols(p))
    if (String(s) === 'Symbol(glass-ui:dock-context)') { ctx = p[s]; break; }
  inst = inst.parent; }
window.__count = () => { let n=0; while (ctx.held.value && n<200) { ctx.release(); n++; }
                         for (let i=0;i<n;i++) ctx.keepOpen(); return n; };
```

Steps: park the mouse at (2, 2); `goto /#/gradient`; hover an ActionButton until its popover opens;
`location.hash = '#/mix'` (this swaps `GenericActionBar`'s `actions` array, unmounting the hovered
button); move the mouse back to (2, 2); wait 2.5 s; read.

Pasted output:

```json
[["A baseline #/gradient",   {"count":0,"states":["Reset=closed","Copy CSS=closed","Seed from palette=closed"],"popovers":[]}],
 ["E hovered \"Reset\"",     {"count":1,"states":["Reset=open","Copy CSS=closed","Seed from palette=closed"],"popovers":["Reset"]}],
 ["F second unmount-while-hovered",
                             {"count":2,"states":["Reset=closed","Copy CSS=closed","Seed from palette=closed"],"popovers":[]}]]
```

At **F**: every trigger is `data-state=closed`, there is **no popover content in the DOM**, the
pointer has been parked off the dock for 2.5 s — and the dock's keep-open counter reads **2**. The
count is monotonic across cycles (0 → 1 → 2); nothing ever brings it back down.

Corroborating run (same shape, `data-held` attribute instead of the counter):

```json
["D mouse moved away +2500ms",
 {"held":true,"pop":[],"actionBtns":["Clear:closed","Mix:closed","Copy result:closed"],"url":"#/mix"}]
```

### Reproduction — direction 2: released tokens it never took

Immediately after the run above, with one leaked token outstanding:

```json
[["baseline count", 1],
 ["after focus",                     {"count":1,"state":"closed"}],
 ["after Enter (focus still on button)", {"count":1,"state":"closed","pops":[]}],
 ["after blur +1.5s",                {"count":0,"pops":[]}],
 ["+4s more",                        {"count":0}]]
```

The trigger's `data-state` never left `"closed"` in this cycle — this instance never called
`keepOpen()`. Yet its `blur` produced an `update:open(false)` emit and line 86 fired `release()`,
decrementing a counter it had not incremented. It happened to drain a leak here; in the general case
it steals a hold belonging to another surface (ColorInput's hover card, a dock dropdown), collapsing
the dock out from under it. `release()` clamps at zero (`g.value = Math.max(0, g.value - 1)` in
`dist/dock.js`), so the arithmetic never goes negative — it silently corrupts instead.

### Consequence

From `node_modules/@mkbabb/glass-ui/dist/dock.js` (the dock's hover-state machine), every collapse
path early-returns while the counter is non-zero:

```js
function scheduleCollapse() { if (isManual() || keepOpenCount.value > 0) return; … }        // k()
function onMouseLeave(e)   { if (!isManual() && (…, state.value === "hover")) {
                                if (keepOpenCount.value > 0) return; … } }                  // N()
function onDocumentPointerDown(e) { if (isManual() || keepOpenCount.value > 0 || …) return; } // R()
```

One leaked token therefore **permanently disables auto-collapse and outside-click dismissal for the
rest of the session**. `demo/shell/dock/Dock.vue:132` sets `:always-expanded="!isDesktop"`, so the
effect is masked on narrow viewports and bites exactly on desktop, where the dock is supposed to
collapse. Control measurement at 1600×1000 (where `always-expanded` is off) confirms the mechanism
is live:

```json
[["A baseline @1600",  {"count":0,"dock":"expanded"}],
 ["B dock hovered",    {"count":0,"dock":"expanded"}],
 ["C CONTROL: mouse away 7.5s (collapse-delay 5000)", {"count":0,"dock":"collapsed"}]]
```

The dock collapses on schedule at count 0. With a leaked token it cannot.

Secondary consequence: `data-held` stays on `.glass-dock` forever, so every glass-ui `[data-held]`
style rule is permanently applied.

### Cure (gestalt, not patch)

Delete lines 55, 57 and 81–88's dock branches entirely. Declare the intent on the primitive:

```vue
<Popover trigger="hover" keep-dock-open :open="isOpen" @update:open="onHoverOpenChange"
         :close-delay="0" :open-delay="300">
```

with `onHoverOpenChange` reduced to the single line it should always have been:

```ts
const onHoverOpenChange = (v: boolean) => emit("update:activeHover", v ? hoverKey : null);
```

The producer then owns acquisition, idempotency, prop-driven closes, and scope disposal. This is
edict 4 (glass-ui is the design system) enforcing edict 1 (no god modules) — the hold protocol does
not belong in a leaf button.

---

## C-2 — MAJOR — the click-feedback animation cannot restart, and a stale timer truncates it

### The code

```
demo/shell/dock/ActionButton.vue:90   const isClicked = ref(false);
demo/shell/dock/ActionButton.vue:92   function handleClick() {
demo/shell/dock/ActionButton.vue:93       emit("update:activeHover", null);
demo/shell/dock/ActionButton.vue:94       isClicked.value = true;
demo/shell/dock/ActionButton.vue:95       setTimeout(() => {
demo/shell/dock/ActionButton.vue:96           isClicked.value = false;
demo/shell/dock/ActionButton.vue:97       }, 400);
demo/shell/dock/ActionButton.vue:98       emit("action");
demo/shell/dock/ActionButton.vue:99   }
```

Line 28 gates the animation class on that boolean:
`isClicked && (rotateOnClick ? 'action-rotate' : 'action-flash')`.

Two defects in four lines:
1. A second click while `isClicked === true` writes `true` over `true`. No reactive change → no DOM
   class mutation → **the CSS animation does not restart.** The user gets no feedback for the second
   press.
2. The first click's timer is not owned. It fires 400 ms after click #1 and clears the flag
   mid-way through click #2's animation. The timer is also never cleared on unmount (there is no
   lifecycle hook of any kind in this file).

### Reproduction

Instrumented a live `Reset` button with a capture-phase click counter and a `MutationObserver` on
the icon's `class`, then issued two real mouse clicks 173 ms apart:

```json
["event log",
 [["CLICK", 686],
  ["CLASS:action-rotate", 693, "anims=[\"action-pulse-29f59cb1\",\"action-spin-29f59cb1\"]"],
  ["CLICK", 859],
  ["CLASS:NO-ANIM-CLASS", 1087, "anims=[]"]]]
```

Read it directly:

- **Two clicks, one `CLASS:action-rotate` mutation.** Click #2 at t=859 produced **no** class change
  and **no** new animation. Confirmed by sampling `getAnimations()` 100 ms after click #2 — the
  running animation's `currentTime` was **275 ms**, i.e. still click #1's animation, not a fresh one.
- **The animation is truncated to 57 %.** The class is removed at t=1087 (= 693 + 394, click #1's
  timer). That is 1087 − 859 = **228 ms** after click #2, out of the authored 400 ms. Sampled at
  t=300 ms after click #2, `getAnimations()` already returned `[]`.

### Cure

The idiomatic Vue 3.5 shape is to stop expressing a one-shot animation as a boolean with a bare
timer. Either:

- `useTemplateRef` the icon and drive the flash through the Web Animations API
  (`anim?.cancel(); anim = el.animate(flashKeyframes, 400)`), which restarts by construction and
  disposes with the element; or
- keep the class approach but key it off a monotonically increasing press id so the class string
  actually changes, and hold the timeout in a single owned handle cleared in `onScopeDispose`.

Better still per edict 4: this is a press-flash, a design-system concern. glass-ui already ships the
press family (`tap-squish`, `DockIconButton`, `data-press-armed` — visible on the sibling dock
buttons in the live DOM). The flash belongs there as a variant, not re-authored in a leaf.

---

## C-3 — MAJOR — `class="pointer-events-auto"` on `<Popover>` is silently dropped

```
demo/shell/dock/ActionButton.vue:9        class="pointer-events-auto"
```

`Popover` declares no `class` prop — `PopoverProps` is exactly
`{open, defaultOpen, trigger, openDelay, closeDelay, keepDockOpen}`
(`dist/components/popover/Popover.vue.d.ts`) — so `class` lands in `$attrs`; and the component is
`inheritAttrs: false` and never binds `$attrs` in its render (`dist/popover-BQGYXZyO.js`:
`name:"Popover", inheritAttrs:!1`, render passes only `data-slot`, `open`, `open-delay`,
`close-delay`, `onUpdate:open`).

Measured on the live page with three ActionButtons mounted:

```json
{"pointerEventsAutoCount": 0, "totalActionBtns": 3}
```

`document.querySelectorAll('.pointer-events-auto').length === 0`. The class never reaches the DOM.

This matters because the dock genuinely does turn pointer events off on non-active faces. Measured
computed `pointer-events` walking up from an ActionButton while its face was mid-crossfade:

```json
"buttonPointerEventsChain": [
  "BUTTON.action-button-wrapper … => pe:none",
  "DIV.flex items-center justify-around flex-1 => pe:none",
  "DIV.dock-face-content => pe:none",
  "DIV.dock-face => pe:none",
  "DIV.dock-crossfade => pe:auto", …]
```

The author wrote a guard against exactly this and the guard is inert. It survives because the
*active* face is `pe:auto` anyway — a dead guard believed to be load-bearing is worse than no guard,
because the next person to make a face inactive will trust it. (`PopoverContent`'s
`class="pointer-events-auto"` at line 35 *does* land — `PopoverContentProps` declares `class`.)

**Cure:** delete line 9. If a pointer-events escape is genuinely needed, it belongs on the trigger
button's own class list (line 15), which is a real DOM node.

---

## C-4 — MAJOR — the `description` prop never reaches assistive technology

Every consumer supplies a `description` — "Click to reset to the default color.", "Save, browse, and
publish color palettes.", "Open image palette extraction from a photo or camera." — and none of it
is reachable by a screen reader.

Measured, with the trigger focused and its popover open:

```json
{"focused": true, "dataState": "open",
 "ariaDescribedby": null, "ariaExpanded": null, "ariaHaspopup": null,
 "allAttrs": ["data-v-29f59cb1=", "class=action-button-wrapper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm",
              "data-state=open", "data-grace-area-trigger=", "type=button", "aria-label=Reset"],
 "popoverTitles": ["Reset"]}
```

No `aria-describedby`, no `aria-expanded`, no `aria-haspopup`. reka's HoverCard is deliberately not
exposed to AT (WAI-ARIA APG: hover-card content is supplementary and not announced). The accessible
name is the terse `title` alone — "Reset", "Copy CSS", "Palettes". A screen-reader user gets
"Palettes, button" where a sighted mouse user gets "Save, browse, and publish color palettes."

What *does* pass, measured, so the finding is not overstated:

- focusable and in tab order: `["Reset tabindex=(default)","Copy CSS tabindex=(default)","Seed from palette tabindex=(default)"]`
- `Enter` fires exactly one click; `Space` fires exactly one click (counter 0 → 1 → 2)
- the popover opens on focus as well as hover (`dataState: "open"` after `.focus()`)
- accessible name present on all three; hit box **32 × 32 px** (`btn: [727,25,32,32]`) — clears the
  24 px minimum

**Cure:** bind the content's id into `aria-describedby` on the trigger, or — the KISS route, and the
one edict 4 points at — retire the bespoke hover card for glass-ui's `Tooltip` primitive
(`dist/tooltip.d.ts`), which owns the description wiring, and pass `description` as its body.

---

## C-5 — MINOR — dead prop, dead markup, dead style hook (`label` / `.action-label` / `hidden`)

```
demo/shell/dock/ActionButton.vue:32       <span v-if="label" class="action-label">{{ label }}</span>
demo/shell/dock/ActionButton.vue:65       label?: string | undefined;
demo/shell/dock/ActionButton.vue:69       hidden?: boolean | undefined;
demo/shell/dock/ActionButton.vue:3    <Popover v-if="!hidden" …>
```

- No consumer passes `label` or `hidden` (full read of `ActionToolbar.vue` and `GenericActionBar.vue`),
  and `DockAction` (`demo/shell/usePaneRouter.ts:38-47`) declares neither — `GenericActionBar`
  structurally *cannot* pass them.
- `.action-label` has no rule anywhere:
  `grep -rn "action-label" demo/` → exactly one hit, the template line itself. So even if `label`
  were passed, the span would render unstyled.

Edict 2 (no legacy/dead paths) and edict 3 (KISS). `hidden` is additionally hazardous: it is the one
path that would destroy the `<Popover>` subtree while a keep-open token is outstanding (C-1), with
no dispose hook to release it.

**Cure:** delete lines 32, 65, 69 and the `v-if="!hidden"` on line 3.

---

## C-6 — MINOR — `activeStyle`'s inline `stroke` kills the hover feedback for the Palettes button

```
demo/shell/dock/ActionToolbar.vue:46   :active-style="paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2' } : {}"
demo/shell/dock/ActionButton.vue:30    :style="{ ...activeStyle, '--flash-color': …, '--hover-color': … }"
demo/shell/dock/ActionButton.vue:117   .action-icon:hover { transform: scale(1.2); stroke: var(--hover-color); }
```

Per CSS Cascade 4 §6.4.1 (Cascade Sorting Order), a style-attribute declaration outranks every
normal author rule. So while `paletteActive` is true, the inline `stroke` wins and
`.action-icon:hover { stroke: … }` never applies — the Palettes button loses its hover stroke change
exactly in the state where it is most likely to be used. (The flash still works: animation
declarations *do* outrank the style attribute in the same ordering.)

The spread order compounds it: `{ ...activeStyle, '--flash-color': …, '--hover-color': … }` places
the component's own custom properties *after* the caller's, so a caller can never override the flash
or hover color while the caller *can* clobber `stroke`. The API is asymmetric with no stated reason.

Reproduction: **NONE** — reaching `paletteActive` requires an open palette; this is a
spec-derived mechanism finding, labelled as such.

**Cure:** express the active state as a data attribute (`:data-active="paletteActive"`) styled in the
scoped block, per edict 5 (style at the root component level, not per-instance inline overrides).
Drop `activeStyle` entirely — it is one caller's single boolean smuggled in as arbitrary CSS.

---

## C-7 — MINOR — the hover affordance covers 24 × 24 of the 32 × 32 hit area

`.action-icon:hover` (line 117) is scoped to the icon, not the button. Measured geometry:

```json
{"btn": [727, 25, 32, 32], "icon": [731, 29, 24, 24]}
```

A 4 px ring on all four sides is clickable (the `<button>` is 32 × 32, `width/height: 2rem` at lines
109–110) but produces no hover response. The selector should be
`.action-button-wrapper:hover .action-icon`.

---

## C-8 — MINOR — `action-rotate` composes two `forwards` animations that fight over `transform`

```
demo/shell/dock/ActionButton.vue:124  .action-rotate {
demo/shell/dock/ActionButton.vue:125      animation: action-pulse 0.4s var(--ease-standard) forwards,
demo/shell/dock/ActionButton.vue:126                 action-spin  0.4s var(--ease-standard) forwards;
```

`action-pulse` (lines 128–132) animates `transform: scale(1.3) → 1.15 → 1`; `action-spin`
(lines 133–136) animates `transform: rotate(0) scale(1.3) → rotate(-360deg) scale(1)`. Per CSS
Animations 1 §3, when two animations set the same property the one later in the `animation-name`
list wins. **`action-pulse`'s transform track is entirely discarded for every `rotateOnClick`
button** — the authored three-stop scale curve is replaced by the spin's two-stop linear one. Only
the pulse's `stroke` / `stroke-width` survive.

Confirmed present at runtime: `anims=["action-pulse-29f59cb1","action-spin-29f59cb1"]` (both
running, both scoped-hashed). The defect is that one of them is doing nothing it was written to do.

**Cure:** fold the rotation into a single `action-rotate` keyframe set that carries scale, stroke and
rotation together — one animation, one authored curve. Edict 6 is satisfied: nothing is deleted, the
motion is moved into one place.

---

## C-9 — MINOR — `:disabled` + `aria-disabled` is a dual path, and disabling hides the explanation

```
demo/shell/dock/ActionButton.vue:17       :aria-disabled="disabled || undefined"
demo/shell/dock/ActionButton.vue:18       :disabled="disabled || undefined"
```

Native `disabled` on a `<button>` already exposes the disabled state to AT, removes the control from
the tab order, and suppresses activation events. `aria-disabled` alongside it is redundant — the two
patterns are alternatives, and shipping both is precisely the dual-path shape edict 2 forbids.

The user-facing consequence is worse than the redundancy: a disabled `<button>` dispatches no
pointer events (HTML §4.10.19: disabled form controls are "barred from constraint validation",
non-focusable, and do not fire activation behaviour; UAs suppress pointer dispatch on them). reka's
hover trigger therefore never fires, so **the hover card that explains why the control is
unavailable cannot open in the disabled state**. `ActionToolbar.vue:44` and `:57` disable Palettes
and Extract on `isEditing` — the two buttons that most need to say why.

Reproduction: **NONE** — I could not drive `isEditing` true from the live shell without mutating
state. Mechanism is spec-derived; labelled a hypothesis.

**Cure:** pick one. Keep `aria-disabled` + a click-guard (`if (disabled) return`) so the control
stays focusable and its explanation stays reachable — the standard pattern for a control whose
disabled reason is non-obvious.

---

## C-10 — INFO — **there are no tests, and the gate is vacuous**

```
$ grep -rln "ActionButton\|action-button\|ActionToolbar" test/ e2e/
test/picker-blob-config.test.ts
e2e/smoke/oracles/o10d-display-voice-census.spec.ts
e2e/smoke/views/browse-loading.spec.ts
```

All three are misses:

- `test/picker-blob-config.test.ts:16` reads **`ActionToolbar.vue` as a string** and regex-matches
  source text: `expect(actions.match(/:icon="Copy"/g)).toHaveLength(1)`. It never mounts anything.
- `e2e/.../o10d-display-voice-census.spec.ts:356` does `.hover()` on "Copy color" and asserts the
  popover title's `font-family` and `font-weight`. It asserts typography, not behaviour.
- `e2e/smoke/views/browse-loading.spec.ts:34` mentions "action-button spinners" only in a comment.

**Exact mutations that keep the entire suite green:**

| Mutation | What it breaks | Test that fails |
|---|---|---|
| Delete lines 83–87 (`dock?.keepOpen()` / `dock?.release()`) | the dock never holds open under a hover card | none |
| Delete lines 94–97 (the whole flash mechanism) | no click feedback ever | none |
| Replace `handleClick` with `emit("action")` alone | activeHover never clears on click | none |
| Delete line 32 (`<span v-if="label">`) | (already dead — C-5) | none |
| Change `:aria-label="title"` to a literal | every action button gets the same name | none — the o10d spec matches the popover **text node**, not the button name |

That last row is the sharpest: the one e2e that touches this component locates the hover title by
`getByText("Copy color")`, so the accessible name of the button it just hovered could be deleted
outright and the assertion would still pass.

---

## C-11 — INFO — the visual audit matrix never captures this component

All 60 `REPORT.json` captures are taken with the dock's action-bar face inactive.
`shots/keyboard-focus-desktop/gradient.png` (read) shows the collapsed pill: `Gradient ⌄ | Tools → |
Login | @mbabb`. No ActionButton is visible in any matrix shot.

Therefore ActionButton contributes **zero** rows to the report's 60 `smallTapTargets` and 18
`namelessButtons`. Independently measured live, this component **passes** both: 32 × 32 hit box
(≥ 24 px) and a non-empty `aria-label` on all instances. The `/#/` small-tap-target rows
(`22×22 "Switch to slug"`, `22×22 "Generate new slug"`, `22×22 "Cancel"`, four `12×24 "… channel"`
spans) belong to `SlugEditLayer` and the channel rail, not here.

This is a harness gap, not a component defect — but it means the component is currently **unaudited
by the matrix**, and the matrix should grow a dock-expanded state.

---

## C-12 — INFO — partial reactive-props destructure

```
demo/shell/dock/ActionButton.vue:59   const { hoverKey, activeHover } = defineProps<{ … 12 members … }>();
```

Two of twelve props are destructured; the other ten (`icon`, `title`, `description`, `label`,
`iconClass`, `activeStyle`, `disabled`, `hidden`, `cssColorOpaque`, `rotateOnClick`) are resolved
implicitly in the template. It works, but the file reads as though `title` and `disabled` were not
props, which is exactly the confusion reactive destructure exists to remove. Either destructure all
or none. (`verbatimModuleSyntax` compliance is clean — line 49's `type Component` uses the inline
type modifier; `exactOptionalPropertyTypes: true` in `tsconfig.base.json:11` makes the
`?: T | undefined` members correct, not redundant.)

---

## C-13 — INFO — `demo/ui/popover` is a pure re-export barrel

```
$ cat demo/ui/popover/index.ts
export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
```

Line 50–54 imports through it. The barrel adds nothing — no variant, no default, no local wrapper —
and is the "wrapper component that does not need to exist" shape edict 3 names. Importing from
`@mkbabb/glass-ui` directly removes a hop. Pre-existing and repo-wide, so INFO rather than a finding
against this file alone.

---

## Hazard checklist (the repo's known local failure modes)

| Hazard | Present? | Evidence |
|---|---|---|
| `defineModel()` stale round-trip | **No** | the file uses `defineProps`/`defineEmits`, no `defineModel`; `activeHover` is a plain one-way prop with an explicit `update:` event |
| oklch→HSV hue drift / `stableHue` | **No** | no color math; `cssColorOpaque` is passed through as an opaque string into two custom properties |
| `ValueUnit` nesting accumulation | **No** | no `ValueUnit` construction anywhere in the file |
| reka slider pointer-capture leak | **N/A** | no slider; no pointer capture |
| ungated `requestAnimationFrame` | **No** | zero rAF; the only timer is the `setTimeout` at line 95 (which is defective for other reasons — C-2) |
| WebGL context loss / eager boot | **No** | no WebGL. (The `/#/` `WebGL: context lost.` console error in `REPORT.json` belongs to `HeroBlob`, not here) |
| unbounded growth | **Yes** | C-1 — `keepOpenCount` grows monotonically and is never drained |
| missing cleanup | **Yes** | C-1 (no scope-dispose release) and C-2 (no `clearTimeout`); the file has **no lifecycle hook at all** |
| reactivity that will not fire | **Yes** | C-2 — `isClicked.value = true` over `true` produces no DOM mutation |
| per-frame / per-tick waste | **No** | the only per-render cost is the `:style` object literal at line 30 being re-created each patch — trivial |

### Domain-boundary probing

There is nothing to parse here — no `parseCssColor` call, no numeric domain. `cssColorOpaque` is
interpolated verbatim into `--flash-color` / `--hover-color`; an invalid value makes the custom
property invalid-at-computed-value-time and `stroke: var(--hover-color)` falls back to the inherited
`stroke`, degrading silently rather than throwing. The `?? 'currentColor'` at line 30 covers
`undefined`/`null` but not `""` — an empty-string accent yields `--flash-color: ;` (an empty
declaration value, which is valid custom-property syntax and resolves as the guaranteed-invalid
value). No crash path. Live value observed:
`--flash-color: oklch(45.499144080095% 0.15 30deg); --hover-color: oklch(45.499144080095% 0.15 30deg);`
— note the 15-significant-digit lightness, an upstream `safeAccent` formatting artefact, and that
one value is written into two properties on every icon on every patch.

---

## Ranked summary

| # | Sev | Defect | Reproduced? |
|---|---|---|---|
| C-1 | MAJOR | dock keep-open token leaked on unmount/prop-close **and** released without acquisition; reimplements `keepDockOpen` | **yes** — counter 0→1→2 with all popovers closed; 1→0 on a cycle with no `keepOpen` |
| C-2 | MAJOR | flash animation cannot restart; stale timer truncates it to 57 % | **yes** — 2 clicks, 1 class mutation; cut at 228 ms of 400 ms |
| C-3 | MAJOR | `class="pointer-events-auto"` on `<Popover>` silently dropped (`inheritAttrs:false`, no `$attrs`) | **yes** — 0 elements carry the class |
| C-4 | MAJOR | `description` never reaches AT; no `aria-describedby` | **yes** — full attribute dump |
| C-5 | MINOR | dead `label` prop + unstyled `.action-label` span + dead `hidden` prop | **yes** — grep |
| C-6 | MINOR | inline `stroke` from `activeStyle` outranks the `:hover` rule | no (spec-derived) |
| C-7 | MINOR | hover affordance covers 24×24 of a 32×32 target | **yes** — measured rects |
| C-8 | MINOR | two `forwards` animations fight over `transform`; the pulse's curve is discarded | **yes** — both running, spec-derived precedence |
| C-9 | MINOR | `disabled` + `aria-disabled` dual path; disabled state suppresses its own explanation | no (spec-derived) |
| C-10 | INFO | zero behavioural tests; five green-preserving mutations named | **yes** — grep + spec read |
| C-11 | INFO | visual matrix never captures the component | **yes** — image read |
| C-12 | INFO | partial reactive-props destructure | **yes** |
| C-13 | INFO | `demo/ui/popover` is a no-op barrel | **yes** |

## The single change that fixes the most

Replace the hand-rolled hold with `keep-dock-open` (C-1) and delete lines 55, 57, 83–87 and 9 (C-3).
That removes 8 lines, kills the unbounded leak, kills the unmatched release, kills a dead guard, and
returns the hold protocol to the design system that already owns it — one architectural transposition
covering two MAJOR findings and one edict-4 violation.
