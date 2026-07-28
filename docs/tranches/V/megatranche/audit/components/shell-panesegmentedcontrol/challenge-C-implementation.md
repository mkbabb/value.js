# CHALLENGE-C — `demo/shell/PaneSegmentedControl.vue` — implementation interrogation

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat
was spawned with. The declaration is explicit, not inherited.

- Axis: **implementation** (assume defective; find the bug)
- Subject: `/Users/mkbabb/Programming/value.js/demo/shell/PaneSegmentedControl.vue` (52 lines)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Verdict: **DEFECTIVE**

---

## 0. The W47 gate — usage census (the question the ledger asked)

`CARRY-LEDGER.md:22` (W47 row): *"`PaneSegmentedControl` 1→0 (it lives ALIVE at `demo/shell/` for
exactly this gate)"*.

```
$ grep -rn "PaneSegmentedControl" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist
demo/shell/dock/Dock.vue:15:import PaneSegmentedControl from "../PaneSegmentedControl.vue";
demo/shell/dock/Dock.vue:192:  <!-- Mobile pane toggle — Ae-5: PaneSegmentedControl owns this control (one owner). -->
demo/shell/dock/Dock.vue:198:      <PaneSegmentedControl
demo/styles/shell.css:119: /* The mobile pane switcher (Dock.vue's PaneSegmentedControl) ... */
… (all remaining hits are docs/ prose and e2e comments)
```

**ACTUAL USAGE COUNT = 1. The W47 gate is NOT vacuous.** The single consumer is
`demo/shell/dock/Dock.vue:198-203`:

```vue
<div v-if="viewManager.currentConfig.value.right !== null" class="dock-mobile-panes">
    <PaneSegmentedControl
        :model-value="viewManager.mobilePaneIndex.value"
        :left-label="viewManager.currentConfig.value.leftLabel ?? ''"
        :right-label="viewManager.currentConfig.value.rightLabel ?? ''"
        @update:model-value="(v) => viewManager.mobilePaneIndex.value = v"
    />
</div>
```

**The exact replacement** is an inline `<SegmentedTabs>` at that site — the same call shape the two
sibling consumers already use without a wrapper SFC (`demo/workbenches/mix/MixSourceSelector.vue:105`,
`demo/palettes/browser/admin/AdminNamesPanel.vue:14`). See C-1. **Caveat for the wave author:**
inlining alone MOVES defects C-2, C-3, C-4 and C-7 to the new site rather than curing them; the W47
gate must carry the `aria-label` / `semantics` / `controls` / density fixes with it or it is a
cosmetic 1→0.

---

## The subject, in full (52 lines)

```vue
<template>
    <div v-if="leftLabel && rightLabel" class="pane-segmented-control flex items-center justify-center">
        <SegmentedTabs variant="pill" :options="tabOptions" :model-value="String(modelValue)"
            class="font-display"
            @update:model-value="(v) => emit('update:modelValue', Number(v) as 0 | 1)" />
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
const { modelValue, leftLabel, rightLabel } = defineProps<{
    modelValue: 0 | 1; leftLabel: string | null; rightLabel: string | null; }>();
const emit = defineEmits<{ "update:modelValue": [value: 0 | 1] }>();
const tabOptions = computed(() => [
    { label: leftLabel ?? "", value: "0" }, { label: rightLabel ?? "", value: "1" }]);
</script>
<style scoped>
@media (max-width: 639px) {
    .pane-segmented-control :deep(.segmented-tab) {
        padding: 0.25rem 0.375rem; font-size: var(--type-caption); } }
</style>
```

---

## Live measurement (the evidence base)

Playwright against `http://localhost:9000`, viewport **390×844**, route `/#/palettes`, dock expanded.
Single `page.evaluate` over `.pane-segmented-control`:

```json
{
  "typeCaptionToken": "clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )",
  "groupAttrs": { "role": "group", "ariaLabel": null, "ariaOrientation": null,
                  "dataMotion": null,
                  "cls": "segmented-tabs segmented-tabs--pill glass-capsule-track font-display" },
  "tabs": [
    { "text": "Picker",   "rect": {"w":57.51,"h":26.27}, "role": null,
      "ariaPressed":"false", "ariaSelected": null, "ariaControls": null, "tabindex":"-1",
      "pointerEvents":"auto",
      "style": {"fontSize":"12.179px","lineHeight":"18.2685px","padding":"4px 6px",
                "fontFamily":"Fraunces, \"Fraunces Fallback\", serif","minHeight":"auto"} },
    { "text": "Palettes", "rect": {"w":57.51,"h":26.27}, "role": null,
      "ariaPressed":"true",  "ariaSelected": null, "ariaControls": null, "tabindex":"0",
      "pointerEvents":"none",     ← the ACTIVE tab is pointer-dead
      "style": {"fontSize":"12.179px","lineHeight":"18.2685px","padding":"4px 6px", … } }
  ],
  "indicator": { "cls": "segmented-indicator segmented-indicator--js glass-capsule glass-lens glass-drag-grabbable",
                 "touchAction": "none", "rect": {"w":57.51,"h":26.27} },
  "trackRect": { "w": 121.02, "h": 32.27 },
  "dockLayout": "mobile"
}
```

Producer ground truth (read, not assumed):
- `node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts` — the prop surface.
- `node_modules/@mkbabb/glass-ui/dist/tabs.js` — compiled defaults:
  `variant:"pill"`, `activation:{default:"automatic"}`, `orientation:"horizontal"`,
  `responsive:{default:!1}`, `ariaLabel:{}` (no default), `semantics:{}` (no default),
  `motion:{}` (no default). Render: `role: W.value ? "tablist" : "group"`, `"aria-label": p.ariaLabel`,
  and per-button `W.value ? {aria-selected, aria-controls} : {"aria-pressed": …}`.
- `node_modules/@mkbabb/glass-ui/dist/components/tabs/styles/segmented.css` —
  `.segmented-tab { padding: 0.25rem 0.625rem; font-size: 0.8125rem }` and
  `@media (min-width:640px) .segmented-tab { padding: 0.3125rem 0.75rem; font-size: 0.875rem }`.
- `node_modules/@mkbabb/glass-ui/dist/components/tabs/styles/drag.css` —
  `.segmented-tabs:not(.segmented-tabs--underline):has(.segmented-indicator.glass-drag-grabbable) .segmented-tab[aria-pressed="true"] { pointer-events: none; }`
- `node_modules/@mkbabb/glass-ui/dist/useTabRovingFocus-YnWh-Ytr.js` —
  `m(e) { … a.value === "automatic" && l(n.value, e) }` (arrow-key focus move COMMITS the selection).

---

## Defects

### C-1 — MAJOR — the SFC is a pure passthrough wrapper; its entire net contribution is 8px of horizontal padding

**Evidence.** Strip the wrapper and the control is `<SegmentedTabs variant="pill" …>` — `variant="pill"`
is itself the producer default (`tabs.js: variant:{default:"pill"}`), so that prop is a no-op too.
What remains that is genuinely this SFC's:

1. `0|1` ↔ `"0"|"1"` coercion (two casts, one of them unchecked — C-6);
2. a `v-if` that can never be false (C-5);
3. a `:deep()` override that changes vertical padding by **0px** and horizontal padding by
   **10px → 6px** (C-4).

The two sibling `SegmentedTabs` consumers do the identical job inline, with the identical
`flex items-center justify-center` wrapper div and (in one case) the identical `font-display` class,
and neither needed an SFC:

```
demo/workbenches/mix/MixSourceSelector.vue:103   <div class="flex items-center justify-center pb-1">
demo/workbenches/mix/MixSourceSelector.vue:105       <SegmentedTabs variant="pill" :options="tabOptions" …/>
demo/palettes/browser/admin/AdminNamesPanel.vue:14   <SegmentedTabs v-model="namesTab" variant="pill" class="w-full font-display" …/>
```

**Owner-edict violations.** Edict 3 (KISS, no contrivance — "no wrapper components that do not
already exist"): 1 of 3 call sites got a bespoke wrapper. Edict 1 (no god modules / focused modules
with *real* encapsulation): this module encapsulates nothing — it forwards one prop pair and one
event, and leaks the producer's internals back out through `:deep()`.

**Reproduction.** `grep` census above; read the three call sites.
**Mechanism.** Wrapper-by-accretion: an SFC created to hold a two-line CSS tweak, kept alive after
the tweak shrank to a padding delta.
**Cure.** W47 as written: inline `<SegmentedTabs>` at `Dock.vue:198`, delete the SFC, and move the
compact rung into glass-ui as a density prop (C-4). Carry C-2/C-3/C-7 to the inline site.

---

### C-2 — MAJOR — `role="group"` ships with **no accessible name**; the producer's `ariaLabel` prop is never passed

**Evidence (measured).** `groupAttrs.ariaLabel: null`, `groupAttrs.role: "group"`.
Producer d.ts: `ariaLabel?: string; /** Accessible name shared by the desktop strip and responsive Select. */`
Producer render: `"aria-label": p.ariaLabel` — undefined ⇒ attribute omitted.

**Consequence.** On every mobile route, the pane switcher is announced as a bare "group". A screen
reader user hears two toggle buttons ("Picker", "Palettes") inside an anonymous group with no
statement of what the group governs. The buttons themselves *are* named (this is why the control
does **not** appear in `REPORT.json`'s `namelessButtons` — see §Negative proof), so this is an
under-labelled container, not a nameless control.

**Reproduction.** Load `http://localhost:9000/#/palettes` at 390×844, expand the dock, evaluate
`document.querySelector('.pane-segmented-control .segmented-tabs').getAttribute('aria-label')` → `null`.
**Mechanism.** Producer affordance left undeclared by the consumer.
**Cure.** `:aria-label="'Pane'"` — better, `aria-label="Switch pane"` — at the call site. One line.
Systemic: all three `SegmentedTabs` consumers omit it; the fix belongs in the W47 sweep for all three.

---

### C-3 — MAJOR — toggle SEMANTICS + tab ACTIVATION + zero panel linkage: the sharpest implementation defect

Three producer knobs are all left at their defaults, and the defaults **disagree with each other**
for this control's actual shape.

**(a) `semantics` not passed** ⇒ `pill → toggle` ⇒ `role="group"` and per-button `aria-pressed`
(measured: `role: null` on the buttons, `ariaPressed: "false"/"true"`, `ariaSelected: null`).

**(b) `activation` not passed** ⇒ producer default `"automatic"` (`tabs.js: activation:{default:"automatic"}`)
⇒ moving focus **commits the selection**:

```js
// useTabRovingFocus-YnWh-Ytr.js
function m(e) { let n = t.value[e];
  !n || n.disabled || (d.value = e, o.value[e]?.focus(),
                       a.value === "automatic" && l(n.value, e)); }   // ← l = select()
```

and roving tabindex is live (measured `tabindex: "-1"` / `"0"`). With exactly **two** options the
index arithmetic wraps — `(e + n*i + r*i) % r` with `r = 2` — so *either* arrow key flips the pane
on *every* press, and each press drives a full pane swap through `PaneSlot.vue:86-97`
(rAF-deferred `commit()` + `KeepAlive` activate + `Transition`).

**(c) `controls` never populated.** The producer's `SegmentedTabOption.controls` exists precisely to
emit `aria-controls` and "complete the APG tablist↔tabpanel linkage for consumers that own a panel".
Measured: `ariaControls: null` on both buttons. And the panel this control governs —
`demo/color-picker/App.vue:77-91`, `.pane-slot-mobile` — has **no `id`, no `role="tabpanel"`, no
`aria-live`**. So the entire main content region swaps with zero programmatic linkage and zero
announcement.

**The mismatch.** ARIA APG: a *toggle-button group* is operated with Tab-to-each-button and
Space/Enter to activate; *selection-follows-focus* is a `tablist` idiom. This control has taken the
`group` role from (a) and the `tablist` keyboard contract from (b). A keyboard user arrowing through
what is announced as a group of pressed buttons silently destroys and rebuilds the page's main
content on each keypress.

**Reproduction.** Measured attribute set above (`role="group"` + `aria-pressed` + roving
`tabindex` 0/-1 + `aria-controls: null`), plus the producer source line that commits on focus move.
Keyboard-path consequence is DERIVED from that source, not separately executed — label the *user
journey* a hypothesis; the attribute state and the producer branch are measured facts.
**Mechanism.** Three independent producer defaults adopted by omission, without checking that their
combination describes this control.
**Cure.** Declare the shape once, at the call site:
`semantics="tabs"`, `:options="[{label, value:'0', controls:'pane-slot-mobile'}, …]"`,
`aria-label="Pane"`, and give `.pane-slot-mobile` `id="pane-slot-mobile"` + `role="tabpanel"`.
Keep `activation` at automatic — under `tabs` semantics it is then correct and idiomatic.

---

### C-4 — MINOR — the `:deep(.segmented-tab)` block is a per-instance override of a producer internal, it buys 8px, and it introduces a second breakpoint authority

**Evidence (measured at 390px).** `padding: "4px 6px"`, `fontSize: "12.179px"`, tab box
**57.51 × 26.27**, track **121.02 × 32.27**.

Producer base for the same viewport (`segmented.css`): `padding: 0.25rem 0.625rem` = **4px 10px**,
`font-size: 0.8125rem` = **13px**. So the override:
- changes **vertical** padding by **0px** (0.25rem in both) — it cannot have been a height fix;
- changes **horizontal** padding by **4px per side = 8px per tab = 16px across the pill**;
- shrinks font 13px → 12.179px (`--type-caption` = `clamp(.75rem, .71rem + .21vw, 1rem)`, defined at
  `node_modules/@mkbabb/glass-ui/dist/styles/typography/scale.css`, ⇒ 12.179px at 390w).

The SFC's own header comment attributes the aperture win to deleting the wrapper's `px-4 pb-2`
("32px of dead horizontal padding") — that deletion already landed and is not this block. What
survives is a 16px residue purchased with a producer-internal selector.

**Second authority.** Visibility is governed by `demo/styles/shell.css:123-125`:
`[data-layout="desktop"] .dock-mobile-panes { display: none }` — and `data-layout` is *width ≥ 1024
**and** aspect ≥ 1.1* (shell.css:100-110). The compact rung is governed by `@media (max-width: 639px)`.
In the 640–1023px band, and on portrait ≥1024 (the 1024×1366 case that rule exists for), the control
is SHOWN in mobile grammar while rendering at the producer's ≥640px desktop metrics
(`0.3125rem 0.75rem / 0.875rem`). One control, two disagreeing breakpoint authorities.

**Owner-edict violations.** Edict 5 ("style at the shadcn/glass root component level, never
per-instance overrides") — `.pane-segmented-control :deep(.segmented-tab)` is a consumer reaching
through the producer's encapsulation boundary; the SFC comment's claim that this is "ROOT-LEVEL"
is true only of the *consumer's* root, which is exactly the per-instance case the edict names.
Edict 4 ("variants/primitives belong in glass-ui") — a compact density rung is a glass-ui `size`/
`density` prop, not a consumer media query.

**Reproduction.** The measurement above; diff against `segmented.css`.
**Mechanism.** A density variant implemented as a consumer-side `:deep()` patch instead of a
producer prop.
**Cure.** Relay to glass-ui (BI/BJ inbox, per the standing relay edict): add `density="compact"`
(or `size="sm"`) to `SegmentedTabs`; delete the `<style scoped>` block; pass the prop at the call
site. Then C-1's inlining becomes lossless.

---

### C-5 — MINOR — `v-if="leftLabel && rightLabel"` is a dead masking guard, and the `string | null` prop type is unreachable

**Evidence.**
- `Dock.vue:200-201` passes `… ?? ''` — `null` can never reach the props. The `?? ""` inside
  `tabOptions` (`PaneSegmentedControl.vue:31-32`) is therefore also dead.
- `Dock.vue:197` already gates on `currentConfig.value.right !== null`, so the only config with a
  null right pane (`atmosphere`, `viewSchema.ts:170-178`) never reaches the component at all.
- `viewSchema.ts:104-233` — **every** `VIEW_MAP` entry with `right !== null` has a non-empty
  `leftLabel` and a non-empty `rightLabel` (14 entries checked, one by one).
- `PaneConfig.leftLabel` is typed `string` (non-nullable, `viewSchema.ts:73`); the component widens
  it to `string | null`. That is a type lie in the safe direction, which is still a lie.

**Consequence.** The guard cannot fire today. If it ever did — a future view added with
`rightLabel: ""` — the mobile pane switcher would **vanish silently** and the right pane would become
**unreachable on mobile**, with no console error and no test failure. That is precisely the
"masking fallback" Edict 2 forbids.

**Reproduction.** Read the 14 `VIEW_MAP` rows + `Dock.vue:197-201`. NONE — dead code, by enumeration.
**Mechanism.** Defensive `v-if` retained after its callers were tightened.
**Cure.** Delete the guard and narrow the prop type to `leftLabel: string; rightLabel: string`
(or, post-C-1, drop the props entirely and build `options` from `currentConfig` at the Dock).

---

### C-6 — MINOR — `Number(v) as 0 | 1` launders the producer's `string` contract through an unchecked cast

**Evidence.** Producer emit signature (`SegmentedTabs.vue.d.ts`):
`"update:modelValue": (value: string) => any`. Consumer (`PaneSegmentedControl.vue:11`):
`(v) => emit('update:modelValue', Number(v) as 0 | 1)`. The value lands in
`useViewManager.ts:67-69`: `set: (v) => { paneOverride.value = { view: currentView.value, index: v } }`.

**Failure mode (HYPOTHESIS — no live reproduction; `tabOptions` currently hardcodes `"0"`/`"1"`).**
Any emitted string outside `{"0","1"}` yields `NaN`, the cast asserts it is `0|1`, and it is stored.
On the next render `String(modelValue)` becomes `"NaN"`; the producer's
`activeValues = ["NaN"]` matches no option, so `useSelectionIndicator`'s
`if (e < 0) { opacity: "0" }` branch fires (`useTabRovingFocus-YnWh-Ytr.js`) and **neither button
carries `aria-pressed="true"`** — a selection-less control with an invisible indicator, and
`usePaneRouter.ts:180`'s `mobilePaneIndex.value === 1` test silently resolves to the left pane.

**Mechanism.** `as` used as a boundary crossing instead of a narrowing predicate — the repo's own
banned "masking" idiom in type clothing.
**Cure.** `(v) => emit('update:modelValue', v === "1" ? 1 : 0)` — total, no cast. Post-C-1 the whole
string↔number seam disappears if the Dock stores the pane as the option `value` directly.

---

### C-7 — MINOR — `class="font-display"` is a per-instance typographic override, applied inconsistently across the three consumers

**Evidence (measured).** `fontFamily: "Fraunces, \"Fraunces Fallback\", serif"` on `.segmented-tab`,
sourced from the consumer's `class="font-display"` (`PaneSegmentedControl.vue:10`) merged onto the
producer root. The producer's `.segmented-tab` deliberately declares `font: inherit`.

Consumer survey:
| consumer | `font-display`? |
|---|---|
| `demo/shell/PaneSegmentedControl.vue:10` | yes |
| `demo/palettes/browser/admin/AdminNamesPanel.vue:16` | yes |
| `demo/workbenches/mix/MixSourceSelector.vue:105` | **no** |

Two different `SegmentedTabs` typographic voices ship in one application. Visible in
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/picker.png` — the dock pill reads
"Picker | About" in the Fraunces serif.

**Reproduction.** The measured `fontFamily` + the three-row survey.
**Mechanism.** A design decision expressed as a utility class at 2-of-3 call sites instead of as a
producer variant.
**Cure.** Decide once. If the display face is right for segmented tabs, it belongs in glass-ui
(a `type` variant, per Edict 4); if it is right only for chrome, `MixSourceSelector` is the bug.
Either way, not three independent class strings.

---

### C-8 — INFO — the drag-morph indicator is armed by omission, and it makes the ACTIVE half of a 121px control pointer-dead

**Evidence (measured).** `motion` is never passed; the producer has no default in `props` and
resolves it through `useMotionAxis`, which armed the drag: the indicator carries
`glass-drag-grabbable` and `touch-action: none`. `drag.css` therefore matches, and the measurement
confirms `pointerEvents: "none"` on the `aria-pressed="true"` button.

**Consequence.** Inside a **121.02px-wide** dock aperture, the entire active half (57.51 × 26.27) is
pointer-dead; its hit area belongs to a velocity-squash drag indicator with `touch-action: none`
(so a touch starting there is fully captured). Nothing is *broken* — the active tab is already
selected, so there is no lost action — but a 2-state pane toggle in a 121px aperture is not the
control a deformable drag indicator was designed for, and the producer's `motion="reduced"` is one
prop away. Note also `data-motion: null` on the group despite the drag being armed, which is a
producer inconsistency worth a relay line, not a consumer defect.

**Reproduction.** The measured `pointerEvents` / `touchAction` / class list above.
**Cure.** Pass `motion="reduced"` at the call site (click-only strip, roving focus preserved), or
justify the drag deliberately.

---

### C-9 — MAJOR (test truth) — the ONLY code this SFC contributes beyond a passthrough has no gate

**What exists.**
```
$ grep -rn "pane-segmented\|segmented-tab\|PaneSegmented\|mobilePaneIndex\|dock-mobile" e2e/ test/
e2e/smoke/mobile/page-load-mobile.spec.ts:6:  * … the PaneSegmentedControl        ← prose
e2e/smoke/mobile/walk.spec.ts:16,91,92,130,134                                    ← prose
```
No unit test anywhere (`test/` holds 21 library specs, none touching demo components; `demo/test/`
holds only `export/` and `glass/`). One real behavioural spec: `e2e/smoke/mobile/walk.spec.ts:86-149`
clicks `aboutTab`, asserts `aria-pressed` flips on both buttons, asserts the right pane's
"Detailed Guide" heading becomes visible, toggles back, then re-routes to Mix and asserts the labels
re-derive. **That part is genuine and would catch a swapped-label or broken-emit regression.**

**The vacuous-gate finding — mutations that keep the suite GREEN:**

| # | Mutation | Green? | Why |
|---|---|---|---|
| 1 | **Delete the entire `<style scoped>` block (lines 36-52)** | **GREEN** | every assertion is `aria-pressed` / `toBeVisible` / `toHaveCount`; nothing reads geometry, padding, font-size, or the 24px tap floor |
| 2 | Delete `class="font-display"` (line 10) | GREEN | no typographic assertion exists |
| 3 | `v-if="leftLabel && rightLabel"` → `v-if="true"` | GREEN | the guard is unreachable (C-5) |
| 4 | Delete `variant="pill"` | GREEN | `pill` is the producer default — the DOM is byte-identical |
| 5 | `Number(v) as 0\|1` → `v === "1" ? 1 : 0` | GREEN | behaviourally identical on the reachable domain |
| — | *swap `leftLabel`/`rightLabel` in `tabOptions`* | **RED** | walk.spec.ts:95 asserts `pickerTab` is pressed at index 0 |

Mutation **#1** is the finding. The compact media query is the *sole reason this SFC exists rather
than an inline `<SegmentedTabs>`*, and it is the one thing no gate observes. A wave that deletes the
component would show a fully green suite while silently changing the dock's mobile metrics — which
is exactly the risk W47 is walking into.

**Cure.** Either give the compact rung a gate (a 390w Playwright assertion on
`.segmented-tab` box width — 57.51px today vs 65.5px at producer metrics), or, preferred, execute
C-4: move the rung into glass-ui where the producer's own visual suite gates it, and delete the
untestable consumer CSS.

---

## Negative proof — what is NOT wrong (checked, and clean)

Evidence discipline: each of these was tested and *passed*; none is a finding.

1. **Tap targets pass the 24px floor.** MEASURED at 390w: **57.51 × 26.27px** per tab.
   26.27 ≥ 24, which is why the control does **not** appear in `REPORT.json`'s
   `smallTapTargets` for `safari-mobile-light /#/` (8 entries: one `input` 160×20, three 23×23 slug
   buttons, four 12×44 channel spans) or `/#/palettes` (4 entries, same set minus the channel spans).
   **This component contributes 0 of the measured 60 small-tap-target defects and 0 of the 18
   nameless buttons.** It is below the 44px HIG/AAA target, but that is not this audit's threshold.
2. **No `defineModel()`** — the component takes an explicit prop + explicit emit, so the known
   `WritableComputedRef` stale-read hazard does not apply. No local `shallowRef` cache is needed.
3. **No colour code** — no oklch→HSV roundtrip, no `stableHue`, no `ValueUnit` wrapping, no
   `parseCssColor`. The repo's colour hazard classes are all absent here.
4. **No `requestAnimationFrame`, no listeners, no observers, no timers, no async.** Zero cleanup
   surface, so zero leak surface. (The rAF and the `ResizeObserver` live in the producer's
   `useSelectionIndicator`, which disconnects in `onUnmounted` — read and verified in
   `useTabRovingFocus-YnWh-Ytr.js`.)
5. **No unbounded growth.** `tabOptions` is a 2-element `computed` over two scalars.
6. **Vue 3.5 idiom is correct.** Reactive props destructure (`const { … } = defineProps<…>()`) is the
   3.5 stable form and the `computed` closes over the destructured bindings correctly — verified live:
   re-routing `/#/palettes` → `/#/mix` re-labels the tabs (walk.spec.ts:141-149 asserts this, and the
   live probe read `activeText: "Mix"` after navigation).
7. **`verbatimModuleSyntax` is satisfied** — the file has no type-only imports to mis-declare.
8. **Animations preserved** — nothing deleted; the indicator/squash animations are producer-owned and
   untouched. The scoped block adds no keyframes, so Edict 6 is not engaged.
9. **Keyboard operability is not broken.** `Enter`/`Space` fall through to the native
   `<button type="button">` click handler even in `automatic` mode (the roving-focus handler
   `break`s out of its Enter/Space case when activation ≠ manual) — so activation by keyboard works.
   C-3 is about *semantics and unintended commits*, not about a dead key path.
10. **Zero console/page errors attributable to this component** across all 60 captures in
    `REPORT.json` (the sole console error in the whole matrix is
    `safari-desktop-light /#/: "WebGL: context lost."`, which is HeroBlob's).
11. **Zero horizontal overflow** on every mobile capture (`overflowX: 0`), and the 121.02px track
    fits the 312px aperture with room — the S.W7-2 fit objective is met.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| C-3 | MAJOR | toggle semantics + tab activation + no panel linkage; arrows commit destructive pane remounts inside an unnamed `group` |
| C-1 | MAJOR | pure passthrough wrapper; net contribution = 8px of padding; 1 of 3 call sites got a bespoke SFC |
| C-2 | MAJOR | `role="group"` with `aria-label: null`; the producer's `ariaLabel` prop is never passed |
| C-9 | MAJOR | the one thing this SFC adds (the compact CSS) is the one thing no test observes — deleting `<style scoped>` keeps the suite green |
| C-4 | MINOR | `:deep()` per-instance override of a producer internal; second, disagreeing breakpoint authority |
| C-5 | MINOR | dead masking `v-if` + unreachable `string \| null` prop type |
| C-6 | MINOR | `Number(v) as 0 \| 1` unchecked cast across the producer's `string` contract |
| C-7 | MINOR | `font-display` per-instance typographic override, applied at 2 of 3 consumers |
| C-8 | INFO | drag-morph armed by omission; active half of a 121px control is pointer-dead |

**Strongest defect: C-3.** It is measured, it has a named one-line cure, and it is the only finding
whose consequence reaches a real user with no other trigger than a keypress. It also survives the
W47 cure: inlining `<SegmentedTabs>` at `Dock.vue:198` moves C-2/C-3/C-4/C-7 rather than killing
them, so the wave must carry them.

**Verdict: DEFECTIVE.**
