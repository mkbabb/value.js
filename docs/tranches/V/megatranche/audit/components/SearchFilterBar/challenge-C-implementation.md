# CHALLENGE-C — SearchFilterBar.vue · the implementation is defective (r2)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. This
seat was spawned with that declaration and I am serving it; nothing here is inherited or delegated.

---

**Subject** `demo/palettes/browser/search/SearchFilterBar.vue` (249 lines · area `palettes`)
**Repo** `/Users/mkbabb/Programming/value.js` · branch `tranche-u`
**HEAD at audit time** `32b4040e` (the brief cited `c654824e`; the branch advanced during the
mega-tranche. The **subject file is unchanged** since `a61094e3` — `git status --short
demo/palettes/browser/search/` is empty, so every measurement below is against the same bytes the
brief points at.)
**Sole consumer** `demo/palettes/BrowsePane.vue:15-26`
**Verdict** **DEFECTIVE** — three blockers, four majors. All seven reproduced live.

**Relationship to r1.** A previous C seat wrote to this path. This report supersedes it and states
explicitly what happened to each of its claims: **5 verified**, **1 promoted from HYPOTHESIS to
BLOCKER by reproduction**, **1 partially retracted**, **3 new defects found that r1 missed** (§3, §4,
and the escalated §6). r1's probe scripts and evidence are preserved untouched in `probes/` and
`evidence/`; mine are added alongside as `probe-C1..C5.mjs` and `C-r2-*`.

---

## 0. Method

Static read of the subject, `MiniColorPicker.vue`, `BrowsePane.vue`, the `demo/ui/*` barrels, and the
**published** glass-ui 7.0.0 surface (`node_modules/@mkbabb/glass-ui/dist/**` — both `.d.ts` and the
compiled `.js`, because the `.d.ts` is what the gate reads and the `.js` is what the user gets).

Then five live Playwright probe batches against the running dev server `http://localhost:9000/#/browse`
— real reka-ui, real glass-ui, real floating-ui. Two route interceptions were needed to reach the
component's populated state and are the only fixture in play:

1. `**/platform/transport/availability.ts*` — neuter `assertApiAttemptAllowed()` so the demo will
   talk to a mocked API from `localhost` (the dev server logs `value.js dev is MISCONFIGURED …
   CORS allow-list excludes localhost`).
2. `https://api.color.babb.dev/colors/tags` → `[{"name":"pastel"},{"name":"neon"},{"name":"earth"}]`.

**Why the tag fixture is legitimate and not a contrivance.** `v-if="availableTags.length > 0"`
(line 47) gates a third of this component. The production catalog is empty *today*, which is the
only reason two of the three blockers are not already user-visible. `e2e/smoke/admin/flows/`
contains a tag-create flow; an admin creating one tag is the trigger. Auditing the component only in
its degenerate zero-tag state is auditing the wrong component. Every finding below states whether it
needs the fixture.

Probes: `probes/probe-C1-buttonvariant.mjs` … `probe-C5.mjs`; raw output
`evidence/probeC1.json`, `probeC2.json`, `probeC4.json`, `probeC5.json`; screenshots
`evidence/C-r2-*.png`; type-gate output `evidence/C-r2-strictTemplates-SearchFilterBar.txt`.

---

## 1. BLOCKER — C-1: the tag checkboxes are bound to a prop and an event glass-ui 7 does not have. Selecting a tag filters nothing, and the control announces success anyway.

### Mechanism

`SearchFilterBar.vue:51-55`:

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

`Checkbox` resolves `demo/ui/checkbox/index.ts:1` → `export { Checkbox } from "@mkbabb/glass-ui"`.
The published contract, `node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}
// … emits: { "update:modelValue": (value: CheckedState) => any }
```

No `checked` prop. No `update:checked` emit. Therefore `:checked` degrades to a fallthrough DOM
attribute, `@update:checked` listens for an event nobody emits, and `modelValue` is `undefined` so
reka runs the checkbox **uncontrolled** — it keeps its own state and the parent never hears about it.

### Reproduction — live, with tags present (`probe-C2.mjs`)

```
$ node probes/probe-C2.mjs
"checkbox": {
  "before": { "n": 3, "states": ["unchecked","unchecked","unchecked"],
              "badge": "",  "checkedAttr": ["false","false","false"] },
  "afterSync": ["unchecked","unchecked","unchecked"] },
"checkboxAfter": {
  "states": ["unchecked","checked","unchecked"],
  "aria":   ["false","true","false"],
  "badgeText": "" },
"netAfterTagClick": [
  "GET https://api.color.babb.dev/colors/approved",
  "GET https://api.color.babb.dev/palettes?limit=50&sort=newest",
  "GET https://api.color.babb.dev/colors/tags" ]
```

Read the three lines together:

- `states[1]` → `"checked"` and `aria[1]` → `"true"`: the box fills in and **announces "checked"** to
  a screen reader.
- `badgeText` → `""` both before and after: `activeFilterCount` reads `selectedTags`, the prop that
  never changed, so the badge does not appear. **The component contradicts itself in the same frame.**
- `netAfterTagClick` is the *unchanged* boot triple — **not one request fired.** Nothing filtered.

`checkedAttr: ["false","false","false"]` is the dead `:checked` binding, sitting on the DOM as an
inert attribute on a `<button role="checkbox">`.

This is the worst failure class an affordance has: it confirms an action it did not perform, to both
a sighted user and an AT user simultaneously.

r1 reached the same conclusion in jsdom and then discounted it because `curl .../colors/tags`
returned `[]`. **The live reproduction removes that comfort:** with one tag in the catalog the defect
is immediate, not latent.

### The family is 2 of 2 — every `<Checkbox>` in the demo

```
$ grep -rn "<Checkbox" demo/ | grep -v node_modules
demo/palettes/browser/search/TagEditPopover.vue:27
demo/palettes/browser/search/SearchFilterBar.vue:51

$ grep -rn "update:checked\|:checked=" demo/ | grep -v node_modules
demo/palettes/browser/search/SearchFilterBar.vue:52:  :checked="selectedTags.includes(tag.name)"
demo/palettes/browser/search/SearchFilterBar.vue:53:  @update:checked="toggleTag(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:28:   :checked="currentTags.includes(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:29:   @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
```

The demo's Checkbox integration has a **0% working rate**. The `checked`/`update:checked` pair is the
pre-7 shadcn-vue-era surface: this is unmigrated debris from the W44 whole-major glass-ui adoption,
and §7 is why no gate said a word.

### Cure

```vue
<Checkbox
    :model-value="selectedTags.includes(tag.name)"
    @update:model-value="() => toggleTag(tag.name)"
/>
```

`toggleTag` already derives the next array from `selectedTags`, so the `CheckedState` payload is
discardable here. At `TagEditPopover.vue:28-29` the payload *is* used, so
`(v) => onToggle(tag.name, v === true)`. The gestalt cure is §7 — turn on `strictTemplates` so the
class cannot recur.

---

## 2. BLOCKER — C-2: the colour field discards every input that is not an exact 6-digit hex, silently searches the swatch colour instead, and reports success.

### Mechanism

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

The ternary is a **masking fallback** — a direct violation of standing edict 2 (*no masking
fallbacks*). Every input outside `/^#[0-9a-f]{6}$/i` — 3-digit hex, 8-digit hex, `hsl()`, `oklch()`,
a named colour, whitespace, the empty string, outright garbage — is discarded without a word and
replaced by `pickerHex.value` (default `#4488cc`, line 170). Then `colorSearchActive = true` and the
emit fires, so the badge increments and the wall filters. The user is shown a *successful* search for
a colour they never asked for.

The placeholder advertises the capability it throws away: `placeholder="#hex, hsl(...)"` (line 92).

### Reproduction — live (`probe-C2.mjs`)

Typed `totally-not-a-color` into the field, clicked Search:

```
"garbageSearch": {
  "badgeText": "1",
  "fieldStillReads": "totally-not-a-color",
  "swatchLabel": "Open color picker, current color #4488cc",
  "errorTextPresent": false,
  "clearAllPresent": true }
```

The badge says one filter is active. The field still shows the garbage. No error anywhere in the
popover. The wall has been filtered against `#4488cc`. Nothing in the UI is capable of telling the
user that.

r1's jsdom table measured the payload identity behind this and it holds — `hsl(120 100% 50%)`,
`#f00`, `not-a-color` and `"   "` all emit the bit-identical triple
`[0.61358428709272, -0.04147814390571797, -0.11751090263911201]` = `oklab(#4488cc)`. Pure green,
pure red and literal garbage all search the default blue.

### The guard is not merely wrong — it is unnecessary

The function it guards already parses full CSS. `hexToOklab` (line 205) calls
`parseColorIn(hex, "oklab")` → `demo/color-session/color-utils.ts:11` → `parsePickerColor` →
`parseCssColor` (`demo/color-session/picker-color.ts:109-113`). That path handles every rejected
input correctly. The regex throws away a capability the stack already has, and substitutes a lie for
the error it should raise: `parsePickerColor` throws a typed `PickerColorError`
(`picker-color.ts:112`) — precisely the signal a "no such colour" affordance needs. It is discarded.

### Cure

Delete the regex; parse the text; surface the failure.

```ts
const text = colorText.value.trim();
if (!text) { parseError.value = "Enter a colour."; return; }
try {
    const { L, a, b } = cssToOklab(text);          // rename: it was never hex-only
    parseError.value = null;
    colorSearchActive.value = true;
    emit("colorSearch", L, a, b);
} catch (e) {
    parseError.value = e instanceof PickerColorError ? "Not a CSS colour." : "Search failed.";
}
```

with `parseError` rendered into the `aria-live` region C-8 also requires. One regex and one fallback
out, one honest branch in — a KISS deletion, not an addition.

---

## 3. BLOCKER — C-3 (NEW): the popover can neither shrink nor scroll. With tags present, "Clear all filters" is entirely off-screen and unreachable by pointer at every viewport tested.

r1 raised this as **C-11, explicitly labelled a HYPOTHESIS**, because it could not populate the tag
list. With the tag fixture it reproduces immediately, and it is worse than projected. **Promoted to
BLOCKER.**

### How I found it

I did not go looking. `probe-C3.mjs` tried to click "Clear all filters" with a real Playwright click.
Playwright retried for 30 seconds and threw:

```
locator.click: Timeout 30000ms exceeded.
  - locator resolved to <button … variant="ghost" … data-emphasis="secondary"
        class="button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover
               h-7 w-full text-small text-muted-foreground">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport      <-- 62 retries, all identical
```

`visible, enabled and stable` — and `outside of the viewport`, with scrolling attempted and useless.
A control that is `visible` to the accessibility and layout engines while being unreachable to a
pointer is the exact shape of a defect no static read produces.

### Measurement across three viewports (`probe-C4.mjs`, one tag set, one active filter)

| viewport | content height | `max-height` | `overflow-y` | scrollable ancestor | `--reka-popper-available-height` | bottom overflow | "Clear all filters" |
|---|---|---|---|---|---|---|---|
| 1440×1000 | **670.8px** | `none` | `visible` | `null` | 569.01px | **101.8px** | top `1036.4` — **fully off-screen** |
| 1440×800 | **670.8px** | `none` | `visible` | `null` | 469.01px | **201.8px** | top `936.4` — **fully off-screen** |
| 390×664 | **630.4px** | `none` | `visible` | `null` | 371.02px | **259.4px** | top `858.1` — **fully off-screen** |

`scrollHeight === clientHeight` in all three (669/669, 669/669, 628/628): there is no clipped inner
content to scroll to, because there is no scroll container at all. `clearFullyOffscreen: true` in all
three rows.

Note the fourth-from-right column: **reka publishes the exact number needed to fix this.** The
component and the design system both ignore it.

### What the user actually sees

`evidence/C-r2-overflow-mobile-390x664.png` — at 390×664 the popover renders `SORT`, `TIER`, and the
bare word `TAGS`. That is all. The tag list, the **entire "Find by Color" section** (the reason this
component exists), and "Clear all filters" are all below the fold, with no scrollbar and no
affordance suggesting anything more exists.

`evidence/C-r2-overflow-desktop-1440x1000.png` — at desktop the "FIND BY COLOR" row is sliced
horizontally by the viewport edge mid-control; the Clear row is gone.

### Root cause, and why the cure is not in this file

glass-ui 7's `PopoverContent` root class list, from the compiled module
(`node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js`):

```
"popover-content z-popover w-72 glass-floating [--overlay-pad-inline:1rem]
 [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)]
 px-(--overlay-pad-inline) py-(--overlay-pad-block) glass-reveal"
```

```
$ grep -c "available-height" node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js
0
$ grep -oE "max-h-[^ \"'\`]*" node_modules/@mkbabb/glass-ui/dist/popover-BQGYXZyO.js
(no output)
```

No `max-height`, no `overflow-y`, no consumption of the available-height variable. And the asymmetry
is self-indicting — **the same design system already knows the idiom** and applies it to the
Combobox family (`node_modules/@mkbabb/glass-ui/dist/styles/components.css`):

```css
.max-h-\[min\(24rem\,var\(--reka-combobox-content-available-height\,60dvh\)\)\]{
  max-height:min(24rem, var(--reka-combobox-content-available-height,60dvh))}
```

Popover was left out of the pattern. Under edicts 4 and 5 (*glass-ui is the design system*;
*root-level styling, never per-instance overrides*) the cure belongs in glass-ui's `PopoverContent`
root:

```
max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto overscroll-contain
```

A demo-side `class="w-60 p-0 max-h-… overflow-y-auto"` would fix this instance and violate edict 5
while leaving every other glass Popover in the constellation broken. **This is a BH/BI relay item**
(standing formation invariant: every glass-ui-level finding goes to the active glass-ui inbox).

Secondary contributor, which *is* this file's: 5 radio rows consume `5 × 57 = 285px` of the 670.8px
because glass-ui's `RadioGroupItem` carries a 44×44 hit target inside a 31px `.filter-option` label
row (measured, `probe-C5.mjs`). Even with the tag section removed, the fixed content is ~530px
against mobile's 371px of available height. This popover was never sized for its own content.

---

## 4. MAJOR — C-4 (NEW): `variant="ghost"` is not a glass-ui 7 Button prop. Both buttons in this file render as filled glass capsules, and the attribute lands on the DOM as garbage.

r1 missed this entirely — it audited the Checkbox contract and stopped there.

### Mechanism

Lines 5 and 111-112 both pass `variant="ghost"`. `Button` resolves
`demo/ui/button/index.ts:1` → `export { Button } from "@mkbabb/glass-ui"`. The published contract
(`dist/components/button/types.d.ts`) is:

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    type?: ButtonHTMLAttributes["type"];
    disabled?: ButtonHTMLAttributes["disabled"];
    class?: HTMLAttributes["class"];
}
```

There is no `variant`. The compiled component (`dist/button-Bu9F4uU6.js`) makes the consequence exact:

```js
props: { emphasis: { default: "secondary" }, tone: { default: "neutral" }, … },
…
g = r(() => p.tone === "neutral" && (p.emphasis === "primary" || p.emphasis === "secondary")),
x = r(() => e("button tap-squish focus-ring",
              g.value && "glass-wash glass-capsule",
              _.value && "glass-capsule-hover", p.class));
```

`variant` falls through as an attribute; `emphasis` defaults to `"secondary"`; `tone` defaults to
`"neutral"`; so `g === true` and the button is painted `glass-wash glass-capsule`. The author asked
for a transparent ghost button and got a washed capsule.

### Reproduction (`probe-C1-buttonvariant.mjs`, `probe-C2.mjs`)

Trigger button, line 5:

```
"A_trigger": {
 "outerHTMLhead": "<button data-v-ace91ae4 data-slot=\"button\" data-emphasis=\"secondary\"
                    data-tone=\"neutral\" data-size=\"md\" data-icon-only=\"true\" …",
 "attr_variant": "ghost",                       <-- rendered onto the DOM, inert
 "data_emphasis": "secondary",                  <-- what actually applied
 "classList": "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover relative h-8 w-8",
 "backgroundColor": "oklab(0.915626 0.00551148 0.0130686 / 0.52)" }
```

Clear-all button, line 111:

```
"clearAll": { "variantAttr": "ghost", "dataEmphasis": "secondary",
              "bg": "oklab(0.721321 0.00495294 0.0108792 / 0.6)",
              "cls": "button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover h-7 w-full …" }
```

A **52%-** and a **60%-opaque** background where the source says `ghost`. This is not a cosmetic
quibble: it is visible in `evidence/C-r2-overflow-mobile-390x664.png` as the filled pill sitting on
the search bar, and it is why the component's two "quiet" commands read as primary chrome.

### The family is 51 sites

```
$ node -e '…walk demo/**/*.vue, match /<Button\b[\s\S]*?>/ containing variant=…'
<Button ...variant=> sites: 51
{ outline: 28, ghost: 19, destructive: 1, default: 1, 'primary-audacious': 2 }
```

`outline` / `ghost` / `destructive` / `default` is the shadcn-vue Button variant vocabulary verbatim —
**51 unmigrated call sites** from the pre-7 era, none of which glass-ui 7 understands. In this
component's own directory: `SearchFilterBar.vue:5`, `:111`, `UserSortMenu.vue:6`,
`MiniColorPicker.vue:47`. For the record, `variant` *is* real on 12 other glass-ui components
(Badge, Card, ToggleGroup, SelectTrigger, …) — which is exactly why the mistake is invisible to a
reader and needs a compiler.

**Cure**: `emphasis="quiet"` (line 5) and `emphasis="quiet" size="sm"` (line 111). Repo-wide the
mapping is `ghost→quiet`, `outline→secondary`, `default→primary`, `destructive→tone="destructive"`.
Same BH/BI relay: 51 sites is a migration note glass-ui's 7.0.0 adoption owed its consumers.

---

## 5. MAJOR — C-5: the loading state is dead code. `applyColorSearch` is `async` with nothing to await.

`applyColorSearch` (line 213) is declared `async` and its body contains **no `await`**. It runs to
completion synchronously — `searching.value` goes `true` then `false` inside one call, before Vue's
scheduler gets a turn. Therefore:

- `<Loader2 v-if="searching" class="animate-spin"/>` (line 102) can never mount;
- `:disabled="searching"` (line 98) can never apply;
- `if (searching.value) return` (line 214) guards against a reentrancy that a synchronous function
  cannot have.

Measured live (`probe-C4.mjs`) — five Search activations back to back, polling for `.animate-spin`
after each:

```
"T3_reentrancy": { "fiveClicksMs": 43, "spinnerEverSeen": false }
```

Five full searches in 43ms and the spinner never existed. Corroborated in the DOM: `probe-C2.mjs`
reports `"btnDisabledAttr": null` on an idle button that is never anything but idle.

An `async` keyword, a `ref`, a `try/finally`, a `:disabled` binding and the `Loader2` import
(line 142) — five pieces of machinery that transact nothing.

**Cure**: the search *is* synchronous. `BrowsePane.vue:339-349` runs the OKLab distance filter inside
a `computed`, client-side. Delete `searching`, the `async`, the `finally`, the guard, the `:disabled`
and the `Loader2` import. If the server-side colour query is later adopted (`BrowsePane.vue:354`
notes the API supports `colorL/colorA/colorB`), reintroduce the state around a real `await`.

---

## 6. MAJOR — C-6: "Clear all filters" unmounts itself while focused — focus falls to `<body>` *and the whole popover dismisses*.

`SearchFilterBar.vue:110-120` wraps the Clear row in `v-if="activeFilterCount > 0"`. Activating it
emits `clearFilters`; `BrowsePane.onClearFilters` (`BrowsePane.vue:329-332`) zeroes the filters; the
props come back `""`/`[]`; `activeFilterCount` falls to 0; **the focused button is removed from the
DOM mid-activation.**

r1 measured this in jsdom and reported `focus after: BODY`. Live, the cascade goes one step further
(`probe-C2.mjs`, focus set on the button, then activated — which is exactly what keyboard activation
does):

```
"clearAll":      { "active": "Clear all filters", … }
"clearAllAfter": { "activeTag": "BODY",
                   "activeText": "→BrowseToolsBrowsePalettes Login  @mbabb",
                   "clearStillPresent": null,        <-- no popover content in the DOM at all
                   "badgeText": "" }
```

`clearStillPresent: null` means the popper content wrapper was gone: focus landing on `<body>` trips
reka's dismissable-layer focus-outside handling, so **the entire filter panel closes as a side effect
of clearing filters.** The user's next interaction starts from a collapsed popover with focus at the
top of the document.

And it compounds with C-3: because the Clear row is off-screen at every tested viewport, the *only*
reachable activation path is the keyboard — which means a keyboard user must Tab to a control they
cannot see (WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured), activate it blind, and then have
focus dumped to `<body>` (2.4.3 Focus Order).

**Cure**: keep the row mounted and disable it — `:disabled="activeFilterCount === 0"`. KISS, and it
also stops the popover resizing under the pointer. If the row must stay conditional, move focus to
the popover content root *before* the state change.

---

## 7. MAJOR — C-7: zero tests, and the type gate is switched off in exactly the way that hides C-1 and C-4.

### No test exists

```
$ grep -rn -E "SearchFilterBar|Find by Color|Search by CSS color|Clear all filters|aria-label=\"Filters\"|Most Forked" \
      e2e test demo --include='*.ts' | grep -vE '\.vue:'
demo/palettes/browser/index.ts:35:export { SearchFilterBar, UserSortMenu, TagEditPopover } from "./search";
demo/palettes/browser/search/index.ts:3:export { default as SearchFilterBar } from "./SearchFilterBar.vue";
```

Two barrel re-exports. Across **71 `.spec.ts` files** and the entire vitest tree there is not one
assertion. `e2e/smoke/views/browse-loading.spec.ts` and `browse-pagination.spec.ts` exist; neither
opens the popover.

**The vacuous mutation.** There is no mutation that turns the suite red. Delete the whole
`<PopoverContent>` subtree (lines 16-122) and reduce `<script setup>` to
`const emit = defineEmits<{}>()`: `npm test` and `npm run test:e2e` both stay green. That is the
maximal vacuity statement and it is literally true, because coverage is zero rather than thin.

The visual gate is blind here too, and measurably so. `audit/visual/REPORT.json` for
`safari-desktop-light /#/browse` records `"dialog": 0` and four small tap targets — `input 160×23`
and three 22×22 buttons `"Switch to slug"` / `"Generate new slug"` / `"Cancel"`, all of which belong
to `PaletteSlugBar`. The capture never opens the popover, so **12 of this component's 13 controls,
the off-viewport Clear row, and all three blockers are outside the visual gate's reach.** This
component's contribution to the REPORT's counts is zero *because it was never looked at*, which is
not the same as clean.

### The type gate cannot see C-1 or C-4 — and I measured exactly what it would say if it could

```
$ grep -rn "vueCompilerOptions\|strictTemplates" tsconfig.base.json tsconfig.json tsconfig.demo.json tsconfig.lib.json
(no output)
```

No `vueCompilerOptions` anywhere, so `strictTemplates` takes vue-tsc's default of **false**, under
which unknown component props and unknown `on*` handlers are accepted as fallthrough attrs instead of
errors. Baseline:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
(no output — clean)
$ npx eslint demo/palettes/browser/search/SearchFilterBar.vue
(no output — clean; exit 0)
```

Now the same program with one line added — `"vueCompilerOptions": { "strictTemplates": true }`
(`probes/tsconfig.strictTemplates-probe.json`):

```
$ npx vue-tsc -p probes/tsconfig.strictTemplates-probe.json --noEmit
… 271 error TS lines demo-wide; 8 on the subject:

SearchFilterBar.vue(5,25):   TS2353 'variant' does not exist in type '{ emphasis?: ButtonEmphasis; tone?: …
SearchFilterBar.vue(52,38):  TS2353 'checked' does not exist in type '{ modelValue?: CheckedState | null; …
SearchFilterBar.vue(53,38):  TS2353 ''onUpdate:checked'' does not exist in type 'NonNullable<{ modelValue? …
SearchFilterBar.vue(89,46):  TS2322 Type 'string | number' is not assignable to type 'string'.
SearchFilterBar.vue(93,37):  TS2353 ''aria-label'' does not exist in type '{ autocomplete?: string; … }'
SearchFilterBar.vue(95,38):  TS2353 'onKeydown' does not exist in type 'NonNullable<{ autocomplete?: string; …
SearchFilterBar.vue(112,29): TS2353 'variant' does not exist in type '{ emphasis?: ButtonEmphasis; …
SearchFilterBar.vue(115,30): TS2353 'onClick' does not exist in type 'NonNullable<{ emphasis?: ButtonEmphasis; …
```

(full text: `evidence/C-r2-strictTemplates-SearchFilterBar.txt`)

**Three gates, three greens, three blockers.** And I will read those 8 errors honestly, because
turning the flag on is not free:

- **4 are the real defects** — lines 5, 52, 53, 112: exactly C-1 and C-4, caught at compile time.
- **1 is genuine type unsoundness, runtime-benign** — line 89: `v-model="colorText"` where
  `colorText` is `Ref<string>` and glass-ui's Input emits `string | number`. With `type="text"` the
  runtime value is always a string; the declaration is still wrong.
- **3 are glass-ui declaration gaps, not demo defects** — lines 93/95 (`aria-label`, `onKeydown` on
  Input) and 115 (`onClick` on Button). Those attributes **do** reach the DOM, measured: Input sets
  `inheritAttrs: false` and spreads `forwardedAttrs` onto its `<input>` root, and the a11y tree
  reports `textbox "Search by CSS color"`; the Clear button's click demonstrably fired in §6. glass-ui
  simply does not declare native attrs/emits on `InputProps`/`ButtonProps`.

So the cure has a prerequisite: **glass-ui must declare its native attribute surfaces before
`strictTemplates` can be turned on cleanly across 271 demo errors.** That prerequisite is itself a
BH/BI relay item, and it is the single highest-leverage repair in this report — it converts the whole
prop/emit-drift class (2 Checkbox sites + 51 Button sites + whatever the other 271 contain) from
silent runtime breakage into a compile error, which is exactly the gate a whole-major design-system
swap owed itself.

---

## 8. MINOR (a11y) — C-8: the filter state is invisible to assistive technology.

| defect | evidence |
|---|---|
| **Badge count is not in the accessible name.** The trigger carries `aria-label="Filters"` (line 5) plus a visible count span (lines 7-12). `aria-label` overrides subtree text, so the accessible name stays `"Filters"` while the visible name is `"Filters 3"`. | `evidence/measure-5-accessible-names.json`: `{ role: "button", name: "Filters" }`; `probe-C2.mjs` badge text `"1"` |
| **Both radiogroups are unnamed.** "Sort" and "Tier" are plain `<div class="section-label">` (lines 20, 32) with no `id`/`aria-labelledby`. | r1 live a11y tree: `generic: Sort` then `radiogroup [no name]`; `measure-1-matrices.json` `radiogroups: [{name: null},{name: null}]` |
| **No `aria-live`.** The colour search mutates the palette wall silently; nothing announces the result count — and after C-2's cure there will be a parse error with nowhere to go. | r1 live probe `ariaLive: 0` |
| **No headings.** Four sections, zero heading semantics. | r1 live probe `headings: 0` |

**Cure**: `:aria-label="activeFilterCount > 0 ? \`Filters, ${activeFilterCount} active\` : 'Filters'"`;
give each `.section-label` an `id` and point its `RadioGroup` at it with `aria-labelledby`
(`RadioGroupProps extends PrimitiveProps`, so the attribute falls through to the `role="radiogroup"`
root); add one polite live region carrying both the result count and C-2's parse error. All
root-level; no per-instance style overrides.

---

## 9. The remainder

**C-9 · asymmetric hit boxes: 16×16 checkboxes beside 44×44 radios.** Measured (`probe-C5.mjs`) in
the same `.filter-option` label row:

```
radio "Newest"  label 121.4x31 | control 44x44      checkbox "pastel" label 182x31 | control 16x16
radio "All"     label  61.1x31 | control 44x44      checkbox "neon"   label 182x31 | control 16x16
radio "Featured" label 132.9x31 | control 44x44     checkbox "earth"  label 182x31 | control 16x16
radio label pitch 57px  →  44px controls, 13px clear (no overlap)
tag  label pitch 33px
```

Two consequences. (a) glass-ui's `RadioGroupItem` ships a 44px target and its `Checkbox` ships 16px —
an internal inconsistency in the design system, and the 44px target is what makes the popover 670px
tall (§3). (b) **This is not a WCAG 2.5.8 failure**, and I checked rather than assumed: the effective
target is the 182×31 `<label>`, `label.control` resolves to the `BUTTON/checkbox`, and clicking the
row's text fires exactly one click and one state change — `{"clicksOnControl": 1, "stateChanges":
["checked"]}`, no double-fire. So r1's "every tap target ≥24×24" verdict survives *on the effective
target* while being wrong about the control box. Recorded as INFO + a BH/BI relay note, not a defect.

**C-10 · `colorSearchActive` duplicates parent state.** Line 171 is a private `ref` feeding the
public `activeFilterCount` (line 193), while `BrowsePane` already holds the authoritative value in
`colorSearchParams` (`BrowsePane.vue:336`). Today the only reset path is `onClearAll`, so a live
desync is a **HYPOTHESIS**; the ownership defect is structural and confirmed. Cure: lift it to a prop
(`colorFilter: {L,a,b} | null`) and delete the local ref.

**C-11 · double clear.** `onClearAll` (lines 227-232) emits `clearColorSearch` *and* `clearFilters`;
`BrowsePane.onClearFilters` (lines 329-332) clears `colorSearchParams` a second time. Harmless,
redundant; collapses into one emit under C-10's cure.

**C-12 · no idempotence.** Five identical Search activations → five `colorSearch` emissions
(measured in §5: 43ms), each re-running `displayedBrowse`'s `Math.hypot` scan over every palette ×
every colour (`BrowsePane.vue:344-348`). Cheap today; the wrong shape for a bigger wall.

**C-13 · `hexToOklab` is misnamed, and its guard is unreachable.** Line 205 throws on `"none"`
channels, but every reachable argument is either a regex-validated 6-hex or `pickerHex`, which
`MiniColorPicker`'s `currentHex` computed (`MiniColorPicker.vue:85-105`) can only produce as a 6-hex.
The name lies in the direction that matters: the function is a general CSS-colour → OKLab, and C-2 is
the act of discarding that generality. Rename `cssToOklab`, delete the branch, let `PickerColorError`
reach the surface C-2's cure adds.

**C-14 · inert wrapper, dead directive, mixed emit idiom.** The root `<div class="flex items-center
gap-1.5">` (line 2) wraps exactly one child, so `gap` and `items-center` do nothing. The scoped block
opens with `@reference "../../../styles/foundation.css"` (line 236) but uses no `@apply`/`theme()` —
only `var(--…)` — so the directive buys nothing. The template calls `$emit(...)` (lines 21, 33) while
the script holds a typed `emit` (line 154) used everywhere else, and `String(v)` coerces a
`SelectionValue` (`= string | number`) that is always a string here.

---

## 10. Negative proof — what I probed and found sound

Recorded so the next seat does not re-spend the probes. Four of these are hypotheses I formed and then
killed by measurement, which is the point of writing them down.

- **`pr-16` survives `field-control`.** I expected glass-ui's `.field-control` padding to override the
  Tailwind utility and let the value run under the Search button. It does not:
  `paddingRight: "64px"`, text lane right edge `580.0`, Search button left edge `587.4` →
  **7.4px clearance, `overlapPx: -7.4`**. The `class` prop merges onto the `<input>` itself (Input
  renders a single `<input>` root — `dist/Input-9BlLluik.js`), so there is no wrapper mis-targeting
  either. **Sound.**
- **No colour-text autofill on open.** I reasoned that `MiniColorPicker`'s `watch(currentHex)` plus
  its `{immediate:true}` hex watcher would emit `update:hex` at mount and stamp `#4488cc` into the
  field before the user typed anything. Measured on a fresh open:
  `{"inputValue": "", "placeholderShown": true}`. **Retracted.**
- **Typed text survives close/reopen.** Typed `rebeccapurple`, Escape, reopened:
  `D_typed: "rebeccapurple"` → `D_afterReopen: "rebeccapurple"`. `colorText` lives in
  `SearchFilterBar`, which stays mounted. **Sound.**
- **`miniPickerOpen` does not leak.** I expected the inner popover's open state to survive the outer
  popover's unmount and re-pop on reopen. Measured: open mini (`wrappers: 2, sv: 1`) → click far
  outside (`wrappers: 0, sv: 0`) → reopen (`wrappers: 1, sv: 0, miniAutoOpened: false`). Reka
  dismisses both layers and `@update:open` resets the flag. **Retracted.**
- **The nested popover does not dismiss its parent.** Opening `MiniColorPicker` inside the filter
  popover keeps both alive (`popperWrappers: 2, outerStillOpen: true`), and a 12-move pointer drag
  across the SV canvas does not dismiss the outer layer (`E_afterDrag.outerStillOpen: true`). The
  drag drives the text field live (`#dbe2e8 → #3a5f84`, 12 monotone updates), which is the intended
  coupling. **Sound.**
- **No `<label>` double-fire.** `<label>` wrapping a reka `<button role="checkbox">` makes the button
  a labelable control, so I checked for a synthetic-click double toggle: `{"clicksOnControl": 1,
  "stateChanges": ["checked"]}`. **Sound** — and this same wrapping is what gives the radios their
  accessible names (`radio "Newest"`, `radio "Most Forked"`, …), so it must not be removed.
- **Radio wiring is correct** — the control that makes C-1 an asymmetry rather than a harness
  artifact. `RadioGroup`'s `modelValue`/`update:modelValue` match
  `dist/components/radio-group/RadioGroup.vue.d.ts`, `value=""` for "All" round-trips
  (`update:tier: [[""]]`), and the live a11y tree shows the correct checked radio in both groups.
- **No radio hit-box overlap** — pitch 57px against 44px controls, 13px clear (§9).
- **The popover names itself correctly** — `dialog "Filters"`, `aria-haspopup="dialog"`,
  `aria-expanded` toggling, all via reka.
- **No local hazards from the repo's record.** No `requestAnimationFrame` (PRM-RAF clean), no WebGL,
  no `ValueUnit` wrapping, no `defineModel` (so the async-round-trip stale-read hazard does not
  apply — `colorText`/`pickerHex` are plain local refs), no timers, no listeners, no observers, no
  `onUnmounted` cleanup owed, no unbounded growth. The only pointer-capture surface is
  `MiniColorPicker.vue:129/144`, outside this seat's subject.
- **`verbatimModuleSyntax` compliant** — `import type { Tag }` (line 144) is the only type-only
  import and it is correct. Vue 3.5 reactive props destructure (line 147) used correctly.
- **`.section-label` and `scrollbar-thin` are real utilities**, not dead classes —
  `demo/styles/utils.css:13` and `glass-ui/dist/styles/components.css`. The scoped block adds layout
  only; no shadcn-root override. Edicts 1 (no god modules), 3 (KISS), 6 (animations preserved) clean.
- **eslint clean**, exit 0.

**Edict ledger.** Violated: **2** (C-2 is a masking fallback), **5** (C-3's only demo-side fix is a
per-instance override, which is why the cure must go to glass-ui), **7** (C-5's dead `async`),
**8** (line 89's `string | number` mismatch — declaration-level). Clean: 1, 3, 4, 6.

---

## 11. Defect ledger

| id | severity | defect | reproduced | r1 status |
|---|---|---|---|---|
| C-1 | **BLOCKER** | Tag checkboxes bound to `:checked`/`@update:checked`; glass-ui 7 exposes `modelValue`/`update:modelValue`. Filtering never fires; the control reports "checked" visibly *and* via `aria-checked`; zero network requests. 2 of 2 demo sites. | **yes — live, tags present** (`probeC2.json`) | verified; mitigation removed |
| C-2 | **BLOCKER** | Colour field discards every input but `/^#[0-9a-f]{6}$/i` and silently searches `pickerHex`, reporting success. Edict-2 masking fallback. | **yes — live** (`probeC2.json` `garbageSearch`) | verified |
| C-3 | **BLOCKER** | Popover `max-height:none` / `overflow-y:visible` / no scroll container / ignores `--reka-popper-available-height`. Content 670.8px; "Clear all filters" **fully off-screen at 1440×1000, 1440×800, 390×664**; real pointer click fails "element is outside of the viewport". Root cause in glass-ui `PopoverContent`. | **yes — live ×3 viewports** (`probeC4.json`, 3 screenshots, Playwright timeout log) | **promoted from HYPOTHESIS** |
| C-4 | MAJOR | `variant="ghost"` is not a glass-ui 7 Button prop; renders as an inert DOM attribute while `emphasis` defaults to `"secondary"` → `glass-wash glass-capsule`, measured bg 52% / 60% opaque. 51 `<Button variant>` sites demo-wide. | **yes — live** (`probeC1.json` `A_trigger`, `probeC2.json` `clearAll`) | **NEW** |
| C-5 | MAJOR | `async` with no `await` → `searching` never observable; spinner, `:disabled` and reentrancy guard all dead. | **yes — live** (5 clicks/43ms, spinner never present) | verified |
| C-6 | MAJOR | Clear-all unmounts itself while focused → focus to `<body>` **and the whole popover dismisses**; only reachable path is keyboard onto an off-screen control. | **yes — live** (`probeC2.json` `clearAllAfter`) | verified + **escalated** |
| C-7 | MAJOR | Zero tests (71 spec files, 0 references); visual gate never opens the popover; `strictTemplates` unset → baseline vue-tsc clean while 8 errors (4 real) wait behind one config line; eslint clean. | **yes — measured both gate states** | verified + quantified |
| C-8 | MINOR | Badge count absent from the accessible name; 2 unnamed radiogroups; no `aria-live`; no headings. | yes (live a11y tree) | verified |
| C-9 | INFO | Checkbox control 16×16 vs radio 44×44 in the same 31px row; a glass-ui inconsistency and the cause of the 670px height. Passes 2.5.8 via the 182×31 label; no double-fire. | yes (`probeC5.json`) | **partially retracts** r1's blanket "all ≥24×24" |
| C-10 | INFO | `colorSearchActive` duplicates `BrowsePane.colorSearchParams`. | mechanism yes; reachability HYPOTHESIS | verified |
| C-11 | INFO | Double clear of `colorSearchParams`. | yes | verified |
| C-12 | INFO | No idempotence: N clicks → N full wall rescans. | yes | verified |
| C-13 | INFO | `hexToOklab` misnamed; unreachable throw branch. | yes (static) | verified |
| C-14 | INFO | Inert single-child flex wrapper; dead `@reference`; mixed `$emit`/`emit`; needless `String(v)`. | yes (static) | verified |

**Strongest defect: C-3.** C-1 is the more shocking mechanism — a control that confirms an action it
did not perform — but C-3 is strictly worse in effect and reach: it takes the *entire* "Find by Color"
section and the *only* escape hatch from a bad filter state off the screen at every viewport I tested
including a full-size desktop, it defeats a real pointer click for 30 seconds of retries, its root
cause sits in a design-system primitive that every glass Popover in the constellation shares, and the
same design system already ships the correct idiom one component over. It also explains why C-1 and
C-2 could live this long: the surface that would have exposed them is the part that falls off the
bottom of the screen.

## 12. Relay obligations created by this report

Per the standing BH/BI edict, three items are glass-ui-level and must reach the active glass-ui inbox
rather than being patched in `demo/`:

1. **`PopoverContent` has no height contract** — add
   `max-h-[min(var(--reka-popover-content-available-height,80dvh),80dvh)] overflow-y-auto
   overscroll-contain` to the root class list; the Combobox family already does exactly this.
2. **7.0.0 shipped no `variant`→`emphasis` migration note** — 51 consumer sites in this repo alone
   still speak the shadcn-vue vocabulary and fail silently.
3. **`InputProps`/`ButtonProps` do not declare their native attribute surfaces**, so
   `strictTemplates: true` reports 3 false positives on this file alone. Declaring them is the
   prerequisite for the repo turning the gate on — and `Checkbox`'s 16px control against
   `RadioGroupItem`'s 44px belongs in the same note.

**No source edits land from this seat.** Everything written by this seat lives under
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/`.
