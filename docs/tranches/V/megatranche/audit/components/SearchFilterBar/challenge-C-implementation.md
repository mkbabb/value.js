# CHALLENGE-C — SearchFilterBar.vue · the implementation is defective (r5)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was declared with and the tier that served every line below. Nothing was
inherited from an ambient default and nothing was delegated: every probe in this report was written,
run and read by this seat.

---

| | |
|---|---|
| **Subject** | `demo/palettes/browser/search/SearchFilterBar.vue` — 249 lines, area `palettes` |
| **Child** | `demo/palettes/browser/search/MiniColorPicker.vue` — 164 lines |
| **Sole consumer** | `demo/palettes/BrowsePane.vue:15-26` (slotted into glass-ui `SearchBar`), handlers at `:329-359` |
| **Repo** | `/Users/mkbabb/Programming/value.js` · branch `tranche-u` |
| **HEAD at audit time** | working tree `d19da6d3`. The brief cites `c654824e`; the branch advanced during the mega-tranche. The subject pair is unchanged since `a61094e3`, so every measurement is against the bytes the brief points at. |
| **Producer** | `@mkbabb/glass-ui@7.0.0` · `reka-ui@2.9.9` · `vue@3.5.35` · `@lucide/vue@1.17.0` |
| **Live probe** | `http://localhost:9000`, Playwright, 1440×900 and 390×844, no fixtures except one route stub that the availability latch rejected (§4.0) |
| **Verdict** | **DEFECTIVE** |

### Relationship to r2, r3 and r4

Three C seats have written to this path before me. All are preserved verbatim:

- `challenge-C-implementation-r2-32b4040e.md` — banked **C-1 … C-14**
- `challenge-C-implementation-r3-f36f780c.md` — banked **C-15 … C-22**
- `challenge-C-implementation-r4-9268f054.md` — banked **C-23 … C-32** (this was the canonical until r5)

Restating their arguments would be padding. This report does four things and nothing else:

1. **Overturns a banked negative proof.** r3 probed the lossy HSV↔hex write-back loop, measured that
   it converges, and **retracted it as a defect** ("Latent coupling only"). r4 accepted that
   disposition. The retraction is wrong, and I can show *why the probe that produced it could not
   have seen the failure*. **C-33.**
2. **Three new defects — C-33, C-34, C-35** — none of which appears in r2, r3 or r4.
3. **One escalation with new measurement**: r4's C-32 (mini-picker overlap, filed INFO) is a MAJOR.
4. **Independent re-confirmation** of the four load-bearing prior claims on instruments no prior seat
   used — a live component mount inside the running Vite graph, and the *shipped* typecheck rather
   than a bespoke `strictTemplates` probe config.

| prior claim | r5 disposition |
|---|---|
| r3 §4.2 "write-back loop converges, hue survives — **retracted as a defect**" | **OVERTURNED.** Deterministic annihilation of saturation, measured. See §1.1 — this is the largest single defect in the pair. |
| C-1 `:checked`/`@update:checked` drift | **CONFIRMED at runtime**, and **re-characterised**: it is not a dead control, it is a *lying* one. Mechanism named. §1.3 |
| C-4 `variant` is not a glass-ui 7 prop | **CONFIRMED from the live DOM** — the trigger ships `variant="ghost"` as an inert attribute *beside* `data-emphasis="secondary"` (the default). §3 |
| C-7 zero tests | **CONFIRMED, and the cure located**: the producer already ships the render-effect canary this bug class requires. §1.2 |
| C-32 mini-picker overlap (INFO) | **ESCALATED to MAJOR** — 47 % of the panel at desktop, 50 % at mobile, two complete filter groups swallowed. §1.4 |
| C-27 panel exceeds available height at 1440×900 | **Not contradicted — scoped.** My run measured the panel *fitting* (bottom 877 into a 900 viewport) because it had zero active filters; r4's had one, which mounts the Clear-all row. Both are right. §3 |
| C-23 pointercancel stuck drag | **CONFIRMED independently**, synthetic-event route rather than CDP touch. §3 |

---

## 1. New defects

### 1.1 · C-33 · MAJOR — the write-back loop annihilates saturation. r3's retraction is an artifact of its probe design.

**This overturns a banked negative proof, so I lead with the counter-example.**

`SearchFilterBar.vue:66-71` and `:175-178` close a cycle with `MiniColorPicker.vue:107-125`:

```
MiniColorPicker   watch(currentHex) ──emit("update:hex")──►
SearchFilterBar   onPickerHexUpdate → pickerHex.value = hex
MiniColorPicker   :hex prop → watch(() => hex) → rewrites hue/sat/val FROM the 8-bit hex
```

The inbound leg (`MiniColorPicker.vue:117-118`) is lossy by construction:

```ts
val.value = max;
sat.value = max === 0 ? 0 : d / max;
```

**The measurement.** Pointer placed at x = 80 % of the SV canvas, then dragged **straight down** —
x never changes — with the terminal pointer event being the one that pushes value to 0:

```json
{"T1_before":                     {"left":"80%","top":"20%", "bg":"rgb(204, 188, 41)"},
 "T1_after_pointer_still_at_x80": {"left":"0%", "top":"100%","bg":"rgb(0, 0, 0)"}}
```

The thumb **teleports from x = 80 % to x = 0 %** while the pointer is stationary in x. The user's
saturation is gone, and there is no source of truth to restore it from, because in this component
the 8-bit hex string *is* the state — and hex cannot represent HSV.

**Why r3's probe could not see it.** r3 drove five drags and reported convergence. I reproduced that
result and then explained it. `updateCanvas` rewrites *both* `sat` and `val` from the pointer on
every move. So the corruption written by move *k*'s flush is overwritten by move *k+1*'s pointer
read — **unless move *k* is the last one.** A trace makes it exact:

- move *k*: `sat = 0.8, val = 0` → `currentHex` changes to `#000000` → watcher emits → parent writes
  `pickerHex` → inbound watcher fires → `max === 0` → **`sat := 0`**
- move *k+1*: `sat = 0.8, val = 0` again → `currentHex` is *still* `#000000` → **no change, no emit,
  no write-back** → `sat` stays `0.8`

I verified both branches on the live page: with `steps: 6` the final read was `left: 80%` (the
corruption had been undone by the trailing move); with the drag terminating on the hex-changing
move, the final read was `left: 0%`. **A multi-drag probe that always ends with a settling move will
report convergence every time.** That is what happened to r3. The loop does not converge — it
oscillates, and the oscillation lands on whichever side the last event chose.

**Two further losses, neither previously measured.** Faithful port of `currentHex` and the inbound
watcher, run offline (`scratchpad/hsv.mjs`):

```
A: drag val->0 at hue=210 sat=0.67
    #000000 h=210.00 s=0.6667 v=0.0000
    #000000 h=210.00 s=0.0000 v=0.0000      <-- saturation gone, unrecoverable

D: representable sat at val=0.02 (max = 5/255):
   distinct sat values after round-trip: 0.0000, 0.2000, 0.4000, 0.6000, 0.8000, 1.0000

E: hue drift at sat=0.02, val=0.5:
    #7d7e80  h=210.000  s=0.0200
    #7d7e80  h=220.000  s=0.0234             <-- 10° of hue per round-trip
```

Across the bottom of the canvas, saturation collapses to **six representable positions** — the thumb
snaps to a 6-column grid over a 174 px control. Near-grey colours **drift 10° of hue per round-trip**.

This is, precisely, the hazard this repository has already diagnosed and cured once. From the project
record: *"oklch→HSV roundtrip loses hue at low chroma (`Math.atan2(0,0)=0`); `stableHue` ref in
`useColorModel` is the source of truth, only updated explicitly by callers that change hue."*
`MiniColorPicker` re-derives from a lossy serialisation on every tick and has no such cell.
r3 noticed the shape of the cure (its §4.2 cites `saturation * value > 0.01`) and then declined to
file it because its instrument said the loop was benign.

**Cure — architectural, not a guard.** `(hue, sat, val)` is the state; the hex is a *derived output*
and must never be an input to itself. One line kills the cycle at the boundary:

```ts
watch(() => hex, (incoming) => {
    if (!incoming || incoming === currentHex.value) return;   // ← ignore our own echo
    …
});
```

That is the same discipline `useColorModel` already applies, expressed at the prop seam rather than
with a magnitude threshold. It also removes the per-frame `pickerHex`/`colorText` write storm that
r4 measured as C-30 (41 accessible-name mutations per drag) — the echo *is* the storm.

---

### 1.2 · C-34 · MAJOR — the producer ships the exact canary for C-1/C-4, and the consumer never adopted it.

r2 found C-1 and C-4. r4 re-verified both and correctly concluded (its relay item 5) that
`strictTemplates` is unusable today because glass-ui's declarations lack native attr/emit surfaces,
so real defects drown in false positives. That analysis stops one step short of the cure, and the
cure is already written — **by the producer, for this exact failure mode.**

`.claude/worktrees/glass-ui-pinned/tests/components/ui/reka-binding-idiom.test.ts:1-10`:

> ```
> // AW.W26 — the binding-correctness render-effect canary (proof:reka-binding-idiom).
> //
> // The standing `feedback_glass_ui_binding_verification` memory note: stale reka
> // prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=`) silently no-op
> // — vue-tsc + units MISS them; only a render-effect probe catches them. This
> // spec mounts the at-risk model bindings (Toggle / Combobox / TagsInput /
> // Switch / Checkbox) and asserts the RENDERED EFFECT each binding drives (the
> // `data-state` / `aria-pressed` / rendered value), NOT the type.
> ```

Its Checkbox case (`:91-94`) is three lines:

```ts
const checked   = mount(Checkbox, { props: { modelValue: true } });
const unchecked = mount(Checkbox, { props: { modelValue: false } });
expect(checked.get("[data-slot=checkbox]").attributes("data-state")).toBe("checked");
```

The producer wrote down, in a comment, the *precise* epistemic claim that C-1 proves — "vue-tsc +
units MISS them" — built the render-effect probe that catches it, and shipped it. The consumer never
adopted the idiom. The word `reka-binding-idiom` appears in **zero** of r2, r3, r4 and zero of
`test/`, `demo/test/`, `e2e/`.

Confirmed against the **shipped** gate, not a bespoke probe config:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
$ # exit 0, zero diagnostics
$ grep -c "SearchFilterBar\|TagEditPopover" <captured output>
0
```

`tsconfig.demo.json` resolves glass-ui through its published `dist/` under `skipLibCheck`
(documented in the file's own header: *"the demo typecheck sees ZERO foreign errors"*). That trust
boundary is what makes the gate quiet, and it is exactly the boundary a render-effect probe crosses
and a type-check cannot.

**Cure.** One consumer spec under `demo/test/palettes/`, mounting `SearchFilterBar` with
`selectedTags: ["x"]` and asserting (a) the rendered checkbox reports `data-state="checked"`, and
(b) a click emits `update:selectedTags`. It fails today, on the line it was written for, and it is
the only gate in this repo's arsenal that *can* fail on C-1. This is C-7's cure, named and located —
not "add tests", but "adopt the producer's canary, which already exists".

---

### 1.3 · C-35 · MAJOR (re-characterises C-1) — the tag checkbox is not a dead control, it is a lying one.

r2 and r4 established that `:checked` / `@update:checked` (`SearchFilterBar.vue:52-53`, and
`TagEditPopover.vue:28-29`) target props and emits glass-ui 7 does not have, and that `toggleTag` is
therefore unreachable. Both proved it by compilation. Neither mounted the component, and the
mechanism of what the user actually experiences was not established. It matters, because it inverts
the severity argument.

**Runtime receipt.** The real glass-ui `Checkbox`, pulled from the running Vite graph and mounted in
the live page with the *exact* binding shape from `:51-55`:

```json
{
  "steps": ["vue 3.5.35", "glass Checkbox=true"],
  "renderedOuter": "<button data-slot=\"checkbox\" class=\"checkbox control-surface glass-control-edge focus-ring tap-squish shrink-0\" checked=\"true\" id=\"probe-cb\" role=\"checkbox\" type=\"button\" aria-checked=\"false\" aria-required=\"false\" data-state=\"unchecked\">…</button>",
  "ariaCheckedBefore": "false",  "dataStateBefore": "unchecked",
  "ariaCheckedAfter":  "true",   "dataStateAfter":  "checked",
  "eventsFired": ["update:modelValue=true"],
  "rect": { "w": 16, "h": 16 }
}
```

Read the rendered DOM. `checked="true"` ships as an **inert HTML attribute on a `<button>`**
(`checked` is meaningful only on `<input>`) *beside* `aria-checked="false"`. The element's markup
contradicts itself on first paint.

And then it moves. `ariaCheckedAfter: "true"`. **The box ticks.**

The mechanism, which no prior seat named: because `modelValue` is never passed, reka's
`CheckboxRoot` takes its passive branch —

```js
// node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
const modelValue = useVModel(props, "modelValue", emits, {
    defaultValue: props.defaultValue ?? props.falseValue,
    passive: props.modelValue === void 0,
});
```

— and keeps **private local state**. So the control renders the tick, announces `aria-checked="true"`,
and emits `update:modelValue`, which nobody is listening for. `emit("update:selectedTags", …)` never
fires; `pm.selectedTags` never changes; `pm.loadRemotePalettes(true)` never runs.

Three consequences that a "dead control" reading misses:

1. **A user cannot detect the failure from the control.** It ticks. Only the unchanged wall behind a
   closed-over popover betrays it — and on a first-time filter that wall may legitimately be empty.
2. **`PopoverContent` unmounts on close**, so the private state is destroyed every time the panel
   closes. Reopen it and every tick is gone, while `activeFilterCount` (`:189-195`) still adds
   `selectedTags.length`. The badge, the boxes and the wall can hold three different opinions.
3. **AT is told the filter applied.** `aria-checked="true"` is a promise the component cannot keep.
   That is worse than an inert control, which at least fails honestly.

**Cure.** Both sites — they are the only two `:checked` bindings in `demo/` —

```
$ grep -rn "update:checked\|:checked=" demo/
demo/palettes/browser/search/SearchFilterBar.vue:52,53
demo/palettes/browser/search/TagEditPopover.vue:28,29
```

transpose to the producer's one idiom, `:model-value` / `@update:model-value`. Do **not** add a
`checked` alias to glass-ui — that is the no-legacy-shim edict. Land C-34's canary in the same wave
so the transposition cannot silently rot again.

---

### 1.4 · C-36 · MAJOR (escalates r4's C-32 from INFO) — the mini-picker eats half of its own parent panel, at both viewports.

r4 measured the overlap as 45,487 px² and filed it INFO on the ground that "the field it feeds stays
visible". Two viewports and the screenshots change that reading: what is hidden is not decoration,
it is **two complete filter groups**.

`MiniColorPicker.vue:6` opens `side="top" align="start"` — upward, over the panel it lives inside.
Both layers compute `z-index: 130`; the child wins on DOM order.

Desktop 1440×900:

| layer | x | y | w | h | side | align | z |
|---|---:|---:|---:|---:|---|---|---:|
| Filters panel | 433 | 409 | 240 | 468 | bottom | end | 130 |
| Mini picker | 462 | 588 | 208 | 219 | top | start | 130 |

219 of the parent's 468 px — **47 %**. Occluded: the third Sort option ("Most Forked"), the *entire*
Tier group (All / Featured), the "Find by Color" section label, and the swatch trigger the picker is
anchored to. `probe-open-popover.png` in this directory shows the Tier group fully swallowed.

Mobile 390×844:

| layer | x | y | w | h |
|---|---:|---:|---:|---:|
| Filters panel | 0 | 4 | 240 | 441 |
| Mini picker | 29 | 156 | 208 | 219 |

219 / 441 = **50 %**, and the parent is collision-pinned flush to the viewport's left edge (x = 0).
`probe-mobile-390.png`.

A user opening the colour picker to *refine* a filter loses the ability to see or reach two of the
three filter groups they came for, and cannot tell that Tier is still set to whatever it was. That
is a MAJOR interaction defect, not an INFO-grade cosmetic overlap.

**Cure.** The colour picker is not a nested layer; it is a *section of this panel*. Inline it into
the "Find by Color" block, or give the panel a disclosure register. If it must remain a layer it
needs an anchor outside the parent's rect (`side="right"` with collision padding) — and it then
collides with r4's C-15/C-27 height contract, so the two should be cured in one pass.

---

## 2. Confirmations on new instruments

| id | prior seat | r5 instrument | result |
|---|---|---|---|
| C-1 | r2 compile, r4 `strictTemplates` probe | live component mount + shipped `vue-tsc -p tsconfig.demo.json` | **CONFIRMED**; gate green (0 diagnostics); glass-ui dist contains `update:checked` **0 times** (`grep -ro … \| wc -l → 0`); reka `CheckboxRoot` emits `["update:modelValue"]` only |
| C-2 | r2, enumerated by r4 | live typing into the real field | **CONFIRMED**: `hsl(200 100% 50%)` *(the placeholder's own example)*, `not-a-color-at-all` and `#fff` all set the badge to `1` and mount Clear-all while the swatch reports the **picker's** colour `#1a1917`. Filter applied, wrong colour, no error. |
| C-4 | r2 compile, r4 class list | live DOM attribute capture | **CONFIRMED**: the trigger renders `variant="ghost"` as a raw fall-through attribute *and* `data-emphasis="secondary"`. `ButtonProps` (`dist/components/button/Button.vue.d.ts`) declares `emphasis`, `tone`, `size`, `iconOnly`, `loading`, `type`, `disabled`, `class` — no `variant`. |
| C-5 | r2 (5 clicks / 43 ms) | `MutationObserver` on the Search button, `attributes` + `childList` + `subtree`, across a complete click | **CONFIRMED, tightened**: `{"searchButtonMutations": []}` — zero mutations. `disabled` never appeared; `<span>Search</span>` was never swapped for `Loader2`. `applyColorSearch` is `async` with zero `await` and the consumer handler (`BrowsePane.vue:351-354`) is synchronous. |
| C-7 | r2, re-counted r4 | fresh grep across all three suites | **CONFIRMED**: `grep -rln "SearchFilterBar\|MiniColorPicker\|toggleTag\|applyColorSearch\|colorSearch" test demo/test e2e` → **no output**. `vitest.config.ts:21` includes `["test/**/*.ts","demo/test/**/*.ts"]`; `demo/test/` holds only `glass/` (2 aurora specs) and an empty `palettes/api/`. |
| C-8 | r2, CDP-verified r4 | Playwright a11y snapshot | **CONFIRMED**: trigger accessible name is `"Filters"` while its `textContent` is `"1"` — `aria-label` overrides descendant content per accname, so the count is never announced. Two `role="radiogroup"`s in one dialog, both nameless; "Sort"/"Tier" are unassociated `<div class="section-label">`. |
| C-23 | r4, CDP touch | synthetic `pointercancel` with **no** `pointerup`, then a `pointermove` | **CONFIRMED**: thumb `left: 80% → 11.5385%`, `dragSurvivedCancel: true`. `MiniColorPicker.vue:127-154` clears the flags on `pointerup` only; no `@pointercancel`, no `@lostpointercapture`. `setPointerCapture` at `:129`/`:144` is also unguarded (throws `NotFoundError` on a stale pointerId). |
| C-22 / tap targets | r3, r4 | live rect measurement, panel open | **CONFIRMED and extended**: hue strip **174 × 12** (a *drag* control at half the WCAG 2.5.8 floor); Search button 53 × 24 (exactly the floor); glass-ui `Checkbox` hit box **16 × 16**; swatch 28 × 28 and trigger 32 × 40 both pass. |

**One correction, offered as scope rather than contradiction.** r4's C-27 measured the panel at
521.3 px against `--reka-popper-available-height: 519.3125px` at 1440×900. My run measured
`h: 468`, `bottom: 877` into a 900 viewport — it fits. The difference is the Clear-all row
(`v-if="activeFilterCount > 0"`, `:110-120`): r4's capture had one active filter, mine had none.
Both measurements are correct; C-27's threshold is crossed by the *first* applied filter, which
strengthens rather than weakens it.

---

## 3. Accessibility — the finding no code read produces

The colour-selection surface is **absent from the accessibility tree**. Playwright a11y snapshot of
the open mini-picker dialog, complete:

```yaml
- 'dialog "Open color picker, current color #4488cc" [box=462,588,208,219]':
  - generic [box=479,749,174,36]:
    - generic [box=509,758,85,19]: "#4488cc"
    - button "Search" [box=600,749,53,36]
```

The 174 × 112 SV canvas and the 174 × 12 hue strip do not appear. `MiniColorPicker.vue:8-36` renders
them as bare `<div>`s with `@pointerdown`/`@pointermove`/`@pointerup` and nothing else — no `role`,
no `tabindex`, no `aria-label`, no `aria-valuenow`, no key handling.
`document.querySelector('.sv-canvas').getAttribute('tabindex')` is `null`.

Measured tab order inside the Filters panel over 8 presses:

```
radio → swatch trigger → text input → Search → radio → radio → swatch trigger → text input
```

It never reaches either control. A keyboard or screen-reader user can open the picker and press
"Search", but can only ever search the hard-coded default `#4488cc` — and per C-2, typing a colour
into the text field does not rescue them either. WCAG 2.1 **2.1.1 Keyboard** (A) and **4.1.2 Name,
Role, Value** (A).

The repo solves this correctly twice elsewhere: `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue`
(which r4 identified as the cure source for C-23) and
`demo/@/components/custom/color-picker/controls/ComponentSliders.vue`. `MiniColorPicker` is a third,
hand-rolled implementation with both the pointer recovery *and* the a11y surface absent.

**Focus management, by contrast, is clean** — measured, not assumed: focus lands on the first radio
on open and `Escape` restores it to the `Filters` trigger (`{"tag":"button","label":"Filters"}`).
reka's `Popover` earns that; the component neither helps nor hinders.

---

## 4. Negative proof

The premise says the implementation is defective, and it is. These hazards, however, are **not**
among its defects. Each was probed, not assumed.

| hazard from the brief | result | evidence |
|---|---|---|
| `defineModel` async round-trip → stale reads | **clean** | The component uses plain local `ref`s. glass-ui `Input` uses `useVModel(…, { passive: true })`, which emits synchronously on `input` (`dist/Input-9BlLluik.js`), so `colorText.value` is fresh when `applyColorSearch` reads it at `:217`. No `shallowRef` cache is needed here. |
| `ValueUnit` nesting accumulation | **clean** | 0 occurrences of `new ValueUnit` in either file; `parseColorIn` returns a `CssColor`, nothing in this path wraps. |
| ungated rAF (the PRM-RAF epidemic) | **clean** | `grep -n "requestAnimationFrame\|setInterval\|setTimeout\|addEventListener\|new ValueUnit\|WebGL"` over both files → **exit 1, zero hits**. No loops, no timers, no manually-added listeners — therefore no missing cleanup and no leak. |
| WebGL context loss / eager boot | **clean** | No WebGL in either file. |
| `verbatimModuleSyntax` | **compliant** | `:144` `import type { Tag }`; every other import is a value import. |
| dead or renamed lucide icons | **clean** | `EllipsisVertical, Clock, TrendingUp, GitFork, Award, Loader2, X` all export from `@lucide/vue@1.17.0` (verified against `dist/lucide-vue.d.ts`). |
| horizontal overflow | **clean** | 390 px viewport: `document.documentElement.scrollWidth === 390`. Matches `REPORT.json` `overflowX: 0` for `/#/browse`. |
| console / page errors | **clean** | Zero console errors and zero page errors across the entire probe session; matches `REPORT.json` for `/#/browse` (`consoleErrors: []`, `pageErrors: []`). |
| god module | **clean** | 249 lines, one concern, the picker properly extracted to a child. |
| animations deleted | **clean** | `.filter-option`'s transition is tokenised (`--duration-fast`, `--ease-standard`); nothing removed or hard-coded. |

### 4.0 · An instrument I could not make work, stated rather than hidden

The Tags block is `v-if="availableTags.length > 0"` (`:47`) and the API is unreachable from this
host, so the block does not mount on the live page. I attempted to stub `https://api.color.babb.dev`
via `page.route`. **It did not work, and I am not claiming it did**: `initApiEnvironment(BASE_URL)`
(`demo/platform/transport/client.ts:44`) trips the availability latch for a loopback origin pointed
at the prod API, and `assertApiAttemptAllowed()` then throws *before* `fetch` is called, so no
request ever reaches the interceptor. That is why C-35's proof is a component mount rather than an
in-situ click: the binding defect is independent of the tag payload, and the mount proves it without
needing one.

### 4.1 · Two hypotheses I formed and could not reproduce — labelled as hypotheses

**H-1 · `String(v)` nullish coercion.** `:21` and `:33` do
`@update:model-value="(v) => $emit('update:tier', String(v))"`. A nullish `SelectionValue` would
become the literal string `"null"` / `"undefined"` and be written into `pm.tierFilter` and then the
API query. **Reproduction: NONE.** reka's `RadioGroupRoot` does not emit nullish on this path, and
glass-ui's wrapper throws `TypeError("[glass-ui] RadioGroup received a non-scalar value.")` for
non-scalars first. Filed as brittleness, not a defect.

**H-2 · `NaN` hex → uncaught `PickerColorError`.** `MiniColorPicker.vue:138-139` divides by
`rect.width`/`rect.height`. A zero-width rect with `e.clientX === rect.left` gives `0/0 = NaN`;
`Math.max(0, Math.min(1, NaN))` is `NaN`; `toHex` then yields
`Math.round(NaN).toString(16).padStart(2,"0") === "NaN"`, i.e. `"#NaNNaNNaN"`. That string reaches
`pickerHex`, and C-2's fallback branch feeds it to `parseColorIn`, which **throws**
`PickerColorError("Invalid CSS color")` (`demo/color-session/picker-color.ts:104-108`) inside a click
handler whose `try` has a `finally` and no `catch` (`:216-224`) — the live `parseCssColor` crash
class. **Reproduction: NONE.** I could not force a zero-width rect; reka's popover reveal animates
opacity and scale, not width. The structural gap is real regardless, and is r4's C-28 seen from the
other end: `applyColorSearchFromPicker` (`:180-187`) calls `hexToOklab` with **no error handling at
all**, and `hexToOklab` (`:205-211`) throws by design on `"none"` channels.

---

## 5. Defect ledger — r5 additions

| id | sev | defect | reproduction | origin |
|---|---|---|---|---|
| **C-33** | **MAJOR** | The HSV↔hex write-back annihilates saturation: pointer stationary in x, thumb jumps `left: 80% → 0%`. Saturation collapses to 6 representable values at low `val`; hue drifts 10° per round-trip near grey. **Overturns r3 §4.2's retraction**, whose convergence result is an artifact of always ending a drag on a settling move. | live thumb-style read, deterministic; offline port for the quantisation and drift tables | **NEW (r5)** |
| **C-34** | **MAJOR** | glass-ui ships `tests/components/ui/reka-binding-idiom.test.ts` — a render-effect canary written for exactly the C-1/C-4 class, whose own comment states "vue-tsc + units MISS them". The consumer never adopted it. The shipped `vue-tsc -p tsconfig.demo.json` is green over C-1. | producer source + `vue-tsc` run with 0 diagnostics | **NEW (r5)** |
| **C-35** | **MAJOR** | The tag checkbox is a *lying* control, not a dead one: reka goes `passive` because `modelValue` is never passed, so the box ticks and announces `aria-checked="true"` while emitting only `update:modelValue`, which nobody hears; `checked="true"` ships as an inert attribute beside `aria-checked="false"` on first paint; the private state is destroyed on every popover unmount. | live component mount, rendered DOM + emit log | **NEW (r5)**, re-characterises C-1 |
| **C-36** | **MAJOR** | Mini-picker occludes 47 % of the parent panel at 1440×900 and 50 % at 390×844, swallowing the third Sort option and the *entire* Tier group. | measured geometry both viewports; `probe-open-popover.png`, `probe-mobile-390.png` | r4 C-32 (INFO), **escalated (r5)** |
| H-1, H-2 | INFO | Nullish `String(v)` coercion; `NaN` hex → uncaught `PickerColorError`. **Hypotheses — no reproduction.** | — | **NEW (r5), filed as hypotheses** |

Carried unchanged from r2/r3/r4: C-1 … C-32. **Running totals: 5 BLOCKER · 16 MAJOR · 6 MINOR ·
5 INFO**, of which four defects and two hypotheses are new in r5, and one banked negative proof is
overturned.

---

## 6. Strongest defect

**C-33 — the write-back loop — and not because it is the most expensive.**

C-15/C-27 costs the most (on a phone the feature is not on the device). C-2 is the most embarrassing
(a component that imports a total CSS parser, guards it with a six-digit-hex regex, and gets the
wrong answer eleven times in thirteen). C-23 breaks causality most vividly. Those verdicts stand.

C-33 is the strongest defect *this seat* contributes, on one ground that outweighs its severity:
**it was already looked at, measured, and cleared.** A prior auditor built a probe, ran it five
times, got a clean answer, and wrote the finding off as "latent coupling only". The next auditor
accepted the disposition. The defect survived two adversarial passes not because it was hidden but
because the instrument that examined it could only ever return one answer — a drag that ends on a
settling move always converges.

That is the failure mode this whole formation exists to catch, and it is worth stating plainly:
**a negative result is only as strong as the probe's ability to have produced a positive one.**
r3's probe could not. Mine had to be constructed backwards from the mechanism — terminate the drag
on the hex-changing event — before the failure would show itself at all.

The three findings compound in the same direction. C-33 says the picker's state is derived from a
serialisation that cannot hold it. C-35 says the tag control reports a state it does not have.
C-34 says the one gate in this ecosystem capable of catching either was written by the producer,
for this exact reason, and never adopted here. **Land C-34's canary and C-1, C-4 and C-35 cannot
recur. Land C-33's echo guard and C-30's 41-mutation drag storm goes with it.**

---

## 7. Relay obligations

r4's five glass-ui-level relay items stand unchanged and are not restated. r5 adds one:

6. **Ship the `reka-binding-idiom` canary as a consumer-facing contract, not a producer-internal
   test** (C-34, NEW). glass-ui already owns the only instrument that catches silent prop/emit
   drift across its own major versions, and its comment says so explicitly. Every consumer repo is
   currently re-discovering that gap by shipping broken controls. Either publish the canary's
   assertions as a documented per-component "render-effect contract" (`data-state`, `aria-checked`,
   the emit name) in the 7.x migration notes, or export a test helper consumers can mount against.
   The concrete evidence to attach: two live `:checked` sites in value.js's demo, one of which
   silently broke tag *filtering* and the other tag *saving*, with the shipped `vue-tsc` green over
   both.

---

## Provenance

| | |
|---|---|
| Report | `docs/tranches/V/megatranche/audit/components/SearchFilterBar/challenge-C-implementation.md` (r5) |
| Images | `probe-open-popover.png` (1440×900, C-36), `probe-mobile-390.png` (390×844, C-36), `probe-filters-only.png` (panel alone) |
| Superseded, all preserved verbatim | `challenge-C-implementation-r2-32b4040e.md`, `challenge-C-implementation-r3-f36f780c.md`, `challenge-C-implementation-r4-9268f054.md` (banked by this seat before writing) |
| Probes | Playwright against the live dev server at `http://localhost:9000`; one offline port of `currentHex` + the inbound hex watcher for the quantisation and drift tables |
| Source edits | **none.** This seat wrote only under `docs/tranches/V/megatranche/audit/components/SearchFilterBar/`. |
