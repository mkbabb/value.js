# CHALLENGE-C — SearchFilterBar.vue · implementation is defective

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat
was spawned with. Declared, not inherited.

---

**Subject** `demo/palettes/browser/search/SearchFilterBar.vue` (249 lines · area `palettes`)
**Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD at audit time `7cae8bd0`
(the brief cited `c654824e`; the branch advanced. Subject file last touched at `a61094e3`.)
**Sole consumer** `demo/palettes/BrowsePane.vue:15-26`
**Verdict** **DEFECTIVE** — two blocking defects, both reproduced by measurement, plus a
complete absence of any test that could have caught either.

---

## 0. Method + probe rig

Static read of the component, its sibling `MiniColorPicker.vue`, its parent `BrowsePane.vue`,
its composable `useDialogBrowseActions.ts`, and the **published** glass-ui 7.0.0 surface it binds
to (`node_modules/@mkbabb/glass-ui/dist/**`). Then three runtime probe batches:

- **jsdom mount probes** — `@vue/test-utils` mount of the real SFC with the Popover stubbed open,
  run through the repo's own toolchain (`npx vitest run --config <scratch>/probe.config.ts`,
  `@vitejs/plugin-vue`, `environment: "jsdom"`). Probes P1–P14. Scratch files live outside the
  repo; **no repo file was written outside this report's directory.**
- **Live Playwright probes** against the running dev server `http://localhost:9000/#/browse`
  (real DOM, real glass-ui, real reka popover): rect measurement, a11y-tree snapshot.
- **Live API probe** — `curl https://api.color.babb.dev/colors/tags` → `[]` (HTTP 200).

Everything below carries a pasted number or a file:line. Two items are labelled **HYPOTHESIS**;
they are not counted as defects.

---

## 1. BLOCKER — C-1: the tag-filter checkboxes are wired to an API glass-ui 7 does not have. Selecting a tag filters nothing, and the control *lies* about it.

### The mechanism

`SearchFilterBar.vue:51-55`:

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

`Checkbox` resolves through `demo/ui/checkbox/index.ts:1` → `export { Checkbox } from "@mkbabb/glass-ui"`.
Its **published** contract (`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts`):

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}
// emits: { "update:modelValue": (value: CheckedState) => any }
```

and the compiled component confirms it (`node_modules/@mkbabb/glass-ui/dist/glass-ui.js:451`):

```js
emits: ["update:modelValue"],
```

There is **no `checked` prop and no `update:checked` emit**. So:

- `:checked` degrades to a *fallthrough DOM attribute* landing inertly on reka's `<button role="checkbox">`;
- `@update:checked` becomes a listener for an event no one ever emits;
- the component runs **uncontrolled** — `modelValue` is `undefined`, so reka drives its own internal state.

### The reproduction (P1 · P10)

```
$ npx vitest run --config <scratch>/probe.config.ts

=== TAG ROW HTML ===
<label class="filter-option"><button data-slot="checkbox"
  class="checkbox control-surface glass-control-edge focus-ring tap-squish shrink-0"
  checked="false"          <-- the :checked binding, rendered as a dead DOM attribute
  role="checkbox" type="button" aria-checked="false" data-state="unchecked">…</button>
  <span>warm</span></label>
checkbox roots found: 2
emitted after click: ["click"]
update:selectedTags = undefined          <-- NEVER EMITTED
```

P10 measures the second, worse half — the control **reports success while doing nothing**:

```
before click  data-state: unchecked  aria-checked: false
after  click  data-state: checked    aria-checked: true
update:selectedTags emitted: undefined
```

and P8 measures the mirror failure — a tag that *is* selected renders as unchecked:

```
checkbox aria-checked (props selectedTags=[a,b]): [ 'false', 'false' ]
```

So the checkbox **fills in, turns `aria-checked="true"`, announces "checked" to a screen reader —
and the palette wall never filters.** Both a sighted user and an AT user are told the filter is on.
The badge count does not move either (`activeFilterCount` reads `selectedTags`, the prop that never
changes). This is the worst failure class available: an affordance that confirms an action it did
not perform.

### The family is complete — 2 of 2 sites

```
$ grep -rn "<Checkbox" demo/ | grep -v node_modules
demo/palettes/browser/search/TagEditPopover.vue:27:      <Checkbox
demo/palettes/browser/search/SearchFilterBar.vue:51:     <Checkbox

$ grep -rn "update:checked\|:checked=" demo/ | grep -v node_modules
demo/palettes/browser/search/SearchFilterBar.vue:52:   :checked="selectedTags.includes(tag.name)"
demo/palettes/browser/search/SearchFilterBar.vue:53:   @update:checked="toggleTag(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:28:    :checked="currentTags.includes(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:29:    @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
```

**Every `<Checkbox>` in the demo is miswired the same way.** The demo's Checkbox integration has a
0% working rate. This is the signature of the W44 glass-ui 7.0.0 whole-major adoption: the props
were written against a pre-7 (shadcn-vue-era) `checked`/`update:checked` surface and never
re-pointed. §5 explains why all three gates stayed green through the swap.

### Why it looks fine in production today (and why that is not a mitigation)

```
$ curl -s https://api.color.babb.dev/colors/tags
[]
```

The live tag catalog is empty, so `v-if="availableTags.length > 0"` (line 47) hides the whole
section — confirmed in the live a11y snapshot of the open popover (§3), which shows **Sort, Tier,
Find by Color and no Tags block**. The defect is therefore *latent-but-certain*: it goes live the
first moment an admin creates a tag, which `e2e/smoke/admin/flows/tag-create.spec.ts` does on
every run.

### Cure (idiomatic, not a patch)

`v-model` against the real contract, with the array owned by the parent as it already is:

```vue
<Checkbox
    :model-value="selectedTags.includes(tag.name)"
    @update:model-value="() => toggleTag(tag.name)"
/>
```

`CheckedState` is `boolean | "indeterminate"`; `toggleTag` already computes the next array from
`selectedTags`, so the payload is discardable. Apply identically at `TagEditPopover.vue:28-29`
(where the payload *is* used — `(checked) => onToggle(tag.name, checked === true)`).

The gestalt cure is §5: turn on `strictTemplates` so this class cannot recur silently.

---

## 2. BLOCKER — C-2: the "Find by Color" text field is decorative. Anything that is not an exact 6-digit hex silently searches the swatch colour instead, and reports success.

### The mechanism

`SearchFilterBar.vue:213-225`:

```ts
async function applyColorSearch() {
    if (searching.value) return;
    searching.value = true;
    try {
        const text = colorText.value.trim();
        const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;
        const lab = hexToOklab(hex);
        colorSearchActive.value = true;
        emit("colorSearch", lab.L, lab.a, lab.b);
    } finally { searching.value = false; }
}
```

The ternary is a **masking fallback**. Every input outside `/^#[0-9a-f]{6}$/i` — a 3-digit hex, an
8-digit hex, `hsl()`, `oklch()`, a named colour, whitespace, or outright garbage — is *discarded
without a word* and replaced by `pickerHex.value`, whose default is `#4488cc` (line 170). The
component then sets `colorSearchActive = true` and emits, so the badge increments and the wall
filters. The user is shown a successful search for a colour they did not ask for.

The placeholder actively advertises the capability it drops: `placeholder="#hex, hsl(...)"` (line 92).

### The reproduction (P2 · P3 · P4 · P5 · P14) — all pasted verbatim

| typed into the field | `colorSearch` payload emitted | correct OKLab for that input |
|---|---|---|
| `hsl(120 100% 50%)` | `[0.61358, -0.04148, -0.11751]` | `[0.86644, -0.23389, 0.17950]` |
| `#f00` | `[0.61358, -0.04148, -0.11751]` | `[0.62796, 0.22486, 0.12585]` |
| `not-a-color` | `[0.61358, -0.04148, -0.11751]` | *(should refuse)* |
| `"   "` (whitespace) | `[0.61358, -0.04148, -0.11751]` | *(should refuse)* |
| `#ff0000` *(control)* | `[0.62796, 0.22486, 0.12585]` | `[0.62796, 0.22486, 0.12585]` ✓ |

and the identity of that repeated triple:

```
oklab(#4488cc) = [0.61358428709272,-0.04147814390571797,-0.11751090263911201]
```

Bit-identical. **Pure green, pure red, and literal garbage all search the default blue swatch.**

### The guard is not merely wrong, it is unnecessary

The very function it guards already parses full CSS. `hexToOklab` (line 205) calls
`parseColorIn(hex, "oklab")` → `demo/color-session/color-utils.ts:11` → `parsePickerColor` →
`parseCssColor` (`demo/color-session/picker-color.ts:109-113`), which **handled every one of the
rejected inputs correctly in the table above** (right-hand column, measured through that same
function). The regex throws away a capability the stack already has, and substitutes a lie for the
error it should raise.

`parsePickerColor` throws a typed `PickerColorError` on genuine failure (`picker-color.ts:112`) —
the exact signal a "no such colour" affordance needs. It is discarded.

### Cure

Delete the regex. Parse the text; on `PickerColorError` show the error rather than inventing a
result — the component has no error surface today, which is the second half of the cure:

```ts
const text = colorText.value.trim();
if (!text) { parseError.value = "Enter a colour."; return; }
try {
    const { L, a, b } = cssToOklab(text);           // rename: it was never hex-only
    parseError.value = null;
    colorSearchActive.value = true;
    emit("colorSearch", L, a, b);
} catch (e) {
    parseError.value = e instanceof PickerColorError ? "Not a CSS colour." : "Search failed.";
}
```

with `parseError` rendered into the `aria-live` region C-6 also requires. This is a KISS deletion,
not an addition: one regex and one fallback out, one honest branch in.

---

## 3. MAJOR — C-3: the loading state is dead code. `applyColorSearch` is `async` with nothing to await, so the spinner and the disabled state can never render.

`applyColorSearch` (line 213) is declared `async`, but its body contains **no `await`**. It runs to
completion synchronously: `searching.value` goes `true` → `false` inside a single call, before Vue's
scheduler ever gets a turn. Therefore:

- `<Loader2 v-if="searching" class="animate-spin"/>` (line 102) can never mount;
- `:disabled="searching"` (line 98) can never apply;
- `if (searching.value) return` (line 214) is a reentrancy guard against reentrancy that is
  impossible in a synchronous function.

Measured (P6):

```
Search btn found: true   disabled attr: undefined
[sync after dispatch] spinner present: false
[after nextTick]      spinner present: false
[after nextTick]      Search label present: true
```

Three pieces of machinery — an `async` keyword, a `ref`, a spinner import, a `finally` — that
transact nothing. `Loader2` is imported (line 142) purely to render never.

**Cure**: the search *is* synchronous — the OKLab distance filter runs client-side in
`BrowsePane.vue:339-349` inside a `computed`. Delete `searching`, the `async`, the `finally`, the
guard, the `Loader2` import and the `:disabled`. If a server-side colour query is later adopted
(`BrowsePane.vue:354` notes the API supports `colorL/colorA/colorB`), reintroduce the state around
a real `await`.

---

## 4. MAJOR — C-4: "Clear all filters" unmounts itself while focused, destroying focus.

`SearchFilterBar.vue:110-120` wraps the Clear button in `v-if="activeFilterCount > 0"`. Clicking it
emits `clearFilters`; the parent zeroes `tierFilter`/`selectedTags`
(`useDialogBrowseActions.ts` `onClearFilters`); the props return as `""`/`[]`; `activeFilterCount`
falls to 0; **the focused button is removed from the DOM.**

Measured (P11), `attachTo: document.body`, real focus:

```
focus before: BUTTON "Clear all filters"
Clear-all still in DOM: false
focus after : BODY
```

Focus lands on `<body>` inside an open reka popover. The keyboard user's next `Tab` restarts from
the top of the document, and the popover's focus-scope has nothing to return focus to on close —
WCAG 2.4.3 (Focus Order) and 2.4.11 (Focus Not Obscured) both bite.

**Cure**: keep the row mounted and disable it (`:disabled="activeFilterCount === 0"`), or move
focus explicitly to the popover content root before the state change. Disabling is the KISS
choice — it also stops the popover from resizing under the pointer.

---

## 5. MAJOR — C-5: zero test coverage, and all three automated gates are structurally blind to C-1.

### No test exists

```
$ grep -rn "SearchFilterBar|Find by Color|Search by CSS color|Clear all filters|aria-label=\"Filters\"" e2e/ test/ demo/test/
(no output)
$ grep -rn "selectedTags|tierFilter|colorSearch|Most Forked|Featured" e2e/ test/
(no output)
$ grep -rn "Filters|EllipsisVertical|filter-option|filter-section" e2e/ demo/test/ test/
(no output)
```

Across 240 `.spec.ts` files and the whole vitest tree, **not one reference**. There are
`e2e/smoke/views/browse-loading.spec.ts` and `browse-pagination.spec.ts`, but neither opens the
popover.

**The vacuous mutation**: there is no mutation that turns the suite red. Delete the entire
`<PopoverContent>` subtree (lines 16-122) and replace the whole `<script setup>` with
`const emit = defineEmits<{}>()` — `npm test` and `npm run test:e2e` stay green. That is the
maximal vacuity statement, and it is literally true because the coverage is zero, not thin.

### The type gate cannot see C-1

```
$ grep -n "vueCompilerOptions|strictTemplates" tsconfig.base.json tsconfig.demo.json tsconfig.lib.json
(no output)
```

No `vueCompilerOptions` anywhere in the repo, so `strictTemplates` takes vue-tsc's default of
**false**. Under that default, unknown component props and unknown `on*` handlers are accepted as
fallthrough attrs rather than errors. `npm run typecheck`
(`vue-tsc -p tsconfig.demo.json --noEmit`, `package.json:65`) is therefore **structurally incapable**
of catching `:checked`/`@update:checked` against a component whose surface is
`modelValue`/`update:modelValue`. The tsconfig prose celebrates the `dist/` trust boundary at
length — the `.d.ts` that proves C-1 is *right there*, resolved, and skipped over because the
template checker is not asked to look.

### The lint gate is silent too

```
$ npx eslint demo/palettes/browser/search/SearchFilterBar.vue
(no output — clean)
```

Three gates, three greens, two blockers. **Cure**: set `"vueCompilerOptions": { "strictTemplates": true }`
in `tsconfig.base.json`. This is the single highest-leverage repair in this report — it converts
the entire prop/emit-drift class (of which C-1 is one instance and its sibling file is another)
from silent runtime breakage into a compile error, and it is exactly the gate a whole-major
design-system swap needs.

---

## 6. MINOR (a11y) — C-6: the filter state is invisible to assistive tech.

Measured live against `http://localhost:9000/#/browse` (real reka popover, Chromium a11y tree) and
in jsdom (P8):

| defect | evidence |
|---|---|
| **Badge count not announced.** The trigger carries `aria-label="Filters"` (line 5) and a visible count span (lines 7-12). `aria-label` **overrides** subtree text, so the accessible name stays `"Filters"` while the visible name is `"Filters 3"`. | P8: `trigger aria-label: Filters` / `trigger text (badge): "3"` |
| **Both radio groups are unnamed.** "Sort" and "Tier" are plain `<div class="section-label">` (lines 20, 32) with no `id`/`aria-labelledby`. | live a11y tree: `- generic: Sort` then `- radiogroup [no name]`; same for Tier. Live rect probe: `radiogroups: [{name: null}, {name: null}]` |
| **No `aria-live`.** The colour search silently mutates the palette wall; nothing announces "N palettes". | live probe `ariaLive: 0`; P8 `aria-live regions: 0` |
| **No headings.** The popover has four sections and zero heading semantics. | live probe `headings: 0` |

**Cure**: `:aria-label="activeFilterCount > 0 ? \`Filters, ${activeFilterCount} active\` : 'Filters'"`;
give each `.section-label` an `id` and point the matching `RadioGroup` at it with `aria-labelledby`
(glass-ui `RadioGroupProps` extends `PrimitiveProps`, so the attr falls through to the
`role="radiogroup"` root); add one polite live region for the result count. All root-level, no
per-instance overrides.

---

## 7. MINOR / INFO — the remainder

**C-7 · dead defensive branch + a misnamed function.** `hexToOklab` (line 205) throws on `"none"`
channels, but every reachable argument is either a regex-validated 6-hex or `pickerHex`, which
`MiniColorPicker`'s `currentHex` computed (`MiniColorPicker.vue:85-105`) can only ever produce as a
6-hex. The branch is unreachable. The name is also a lie in the direction that matters: the
function is a general CSS-colour → OKLab, and C-2 is precisely the act of throwing that generality
away. Rename to `cssToOklab`, delete the branch, let `PickerColorError` propagate to the surface
C-2's cure adds.

**C-8 · unowned local filter state.** `colorSearchActive` (line 171) is a private `ref` that feeds
the public `activeFilterCount` (line 193). Measured desync (P12): after a colour search, a
prop-side reset of `tier`/`selectedTags` leaves the badge reading `"1"` with no colour filter the
parent can see or clear. Today the only reset path runs through `onClearAll`, so reachability in
the current wiring is a **HYPOTHESIS**; the ownership defect is confirmed. Cure: lift the colour
filter to the parent as a prop (`colorFilter: {L,a,b} | null`) — `BrowsePane` already holds exactly
that in `colorSearchParams` (`BrowsePane.vue:336`). The component is duplicating parent state.

**C-9 · double clear.** `onClearAll` (lines 227-232) emits `clearColorSearch` *and* `clearFilters`;
`BrowsePane.onClearFilters` (lines 329-332) then clears `colorSearchParams` a second time.
Measured (P9): `emitted on clear: ["clearColorSearch","clearFilters","click"]`. Harmless, redundant.
With C-8's cure both emits collapse into one.

**C-10 · no idempotence.** Measured (P13): 5 identical Search clicks → **5** `colorSearch`
emissions, each re-running `displayedBrowse`'s `Math.hypot` scan over every palette × every colour
(`BrowsePane.vue:344-348`). Small today; it is the shape that does not survive a bigger wall.

**C-11 · popover cannot shrink or scroll — HYPOTHESIS.** Measured live at 390×664 with the tag
section absent: content height **441.5px**, and on the popover root `max-height: none`,
`overflow-y: visible`, `scrollHeight === clientHeight` (no inner scroll, no floating-ui `size`
middleware). A populated tag list adds `max-h-28` = 112px plus its label and padding (~43px), and
an active filter adds the Clear row (~44px) → **~640px on a 664px viewport**. Since it can neither
shrink nor scroll, it would clip. **Labelled a hypothesis: not reproduced** — the live tag catalog
is `[]`. *(I did observe one transient 81.5px bottom overflow before floating-ui's collision shift
settled it; a controlled retest showed the settled position fits. Not reported as a defect.)*

**C-12 · inert wrapper + dead directive.** The root `<div class="flex items-center gap-1.5">`
(line 2) wraps exactly one child — `gap` and `items-center` do nothing. The scoped block opens with
`@reference "../../../styles/foundation.css"` (line 236) but uses no `@apply`/`theme()`, only
`var(--…)`; the directive buys nothing.

**C-13 · mixed emit idiom.** The template calls `$emit(...)` (lines 21, 33) while the script holds a
typed `emit` (line 154) used everywhere else. `String(v)` coerces a `SelectionValue`
(`= string | number`, per `dist/components/_shared/selection.d.ts`) that is always a string here.

---

## 8. What I checked and found SOUND (negative proof)

Recorded so the next seat does not re-spend the probes, and because two of these are corrections to
claims I initially formed and then disproved:

- **Radio buttons DO have accessible names.** My first raw-attribute heuristic reported `name: ""`
  for all five. The Chromium a11y tree disproves it — implicit `<label>` wrapping resolves for
  `role="radio"` buttons: `radio "Newest" [checked]`, `radio "Most Popular"`, `radio "Most Forked"`,
  `radio "All" [checked]`, `radio "Featured"`. **Retracted.**
- **No radio hit-box overlap.** Live rects: radios are 44×44 at y `422-466`, `479-523`, `536-580` —
  13px clear between each. **Retracted.**
- **Every tap target ≥24×24.** Live: trigger 32×40, radios 44×44, swatch 28×28, input 148×36,
  Search button 52.6×**24** (at the WCAG 2.2 AA 2.5.8 bound, passing). This component contributes
  **zero** rows to the visual REPORT's 60 small-tap-targets — the 4 counted on `/#/browse`
  (`REPORT.json`: `input 160×23`, and three 22×22 buttons "Switch to slug" / "Generate new slug" /
  "Cancel") are `PaletteSlugBar`'s.
- **Popover names itself correctly** — `dialog "Filters"`, `aria-haspopup="dialog"`,
  `aria-expanded="false"→"true"`, via reka.
- **Radio wiring is correct** (the control that makes C-1 an asymmetry, not a harness artifact).
  P7: `update:tier: [[""]]` emitted on click. `RadioGroup`'s `modelValue`/`update:modelValue` match
  `dist/components/radio-group/RadioGroup.vue.d.ts` exactly.
- **`verbatimModuleSyntax` compliant** — `import type { Tag }` (line 144) is the only type-only
  import and it is correct.
- **Vue 3.5 idioms** — reactive props destructure (line 147) used correctly; no `defineModel`, so
  the async-round-trip stale-read hazard does not apply; `colorText` is a plain local `ref`.
- **No local hazards present** — no `requestAnimationFrame` (PRM-RAF clean), no WebGL, no
  `ValueUnit` wrapping, no timers, no listeners, no observers, no `onUnmounted` cleanup owed, no
  unbounded growth. The one pointer-capture surface is `MiniColorPicker`, out of this seat's scope.
- **`.section-label` and `scrollbar-thin` are real glass-ui utilities**, not dead classes —
  `demo/styles/utils.css:13`, `glass-ui/dist/styles/utilities/base.css`. Styling is root-level;
  no shadcn-root override; the scoped block adds only layout. Edicts 1, 3, 4, 5, 6 clean.
- **eslint clean** on the file.

## 9. Out-of-scope observation for another seat

While probing, the app **self-navigated from `#/browse` to `#/gradient` roughly 1s after load**,
reproduced 3× in this session (`location.hash` read as `"#/gradient"` after `page.goto(".../#/browse")`
resolved and reported `Page URL: http://localhost:9000/#/browse`). It repeatedly destroyed
Playwright probes. Not attributable to this component — filed here so it is not lost.

---

## 10. Defect ledger

| id | severity | defect | reproduced |
|---|---|---|---|
| C-1 | **BLOCKER** | Tag checkboxes bound to `:checked`/`@update:checked`; glass-ui 7 exposes `modelValue`/`update:modelValue`. Filtering never fires; the control visibly + programmatically reports "checked". 2 of 2 demo sites. | yes (P1, P8, P10) |
| C-2 | **BLOCKER** | Colour-search field discards every input but `/^#[0-9a-f]{6}$/i` and silently searches `pickerHex`, reporting success. | yes (P2–P5, P14) |
| C-3 | MAJOR | `async` with no `await` → `searching` never observable; spinner + `:disabled` + reentrancy guard all dead. | yes (P6) |
| C-4 | MAJOR | "Clear all filters" unmounts itself while focused → focus falls to `<body>`. | yes (P11) |
| C-5 | MAJOR | Zero tests; `strictTemplates` unset so vue-tsc cannot see C-1; eslint clean. Any mutation is vacuous. | yes (greps, config) |
| C-6 | MINOR | Badge count not in accessible name; 2 unnamed radiogroups; no `aria-live`; no headings. | yes (live a11y tree, P8) |
| C-7 | MINOR | Unreachable throw branch; `hexToOklab` misnamed for a general CSS parser. | yes (static) |
| C-8 | MINOR | `colorSearchActive` duplicates parent state and can desync. | mechanism yes (P12); reachability HYPOTHESIS |
| C-9 | INFO | Double clear of `colorSearchParams`. | yes (P9) |
| C-10 | INFO | No idempotence: 5 identical clicks → 5 full wall rescans. | yes (P13) |
| C-11 | INFO | Popover `max-height: none` / `overflow-y: visible` / no `size` middleware; ~640px projected vs 664px viewport when populated. | **HYPOTHESIS** (live catalog is `[]`) |
| C-12 | INFO | Inert single-child flex wrapper; dead `@reference`. | yes (static) |
| C-13 | INFO | Mixed `$emit`/`emit`; needless `String(v)`. | yes (static) |

**Strongest defect: C-1.** It is the only one where the component actively confirms an action it
did not perform, it is 100% of the demo's Checkbox integration, and §5 explains why nothing in the
repo would ever have told anyone.
