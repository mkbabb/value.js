# CHALLENGE-C — `demo/workbenches/mix/MixSourceSelector.vue` — implementation

**Round r2** (independent re-run). The r1 report is preserved verbatim at
`challenge-C-implementation.r1-prior.md`. This round re-derived every finding from the tree without
reading r1 first, then reconciled: **r1's fourteen findings are independently CONFIRMED at a newer
HEAD with fresh measurements**, and **one new defect (C-15) is added** that r1 did not reach.

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

Environment: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD **`7775473b`**. The brief
cited `c654824e`; the tree has advanced 5 commits, none touching this component or its composable
(`git log --oneline -3 -- demo/workbenches/mix/` unchanged since `f2c8f565`). Live server
`http://localhost:9000`. `@mkbabb/glass-ui@7.0.0`.

Evidence produced this round, all under `evidence/`:
`probe-C0.mjs` (DOM census) ·
`probe-C1.mjs` (the first attempt — it **fails** at `locator.click: Timeout 30000ms exceeded ·
waiting for getByRole('button', { name: 'Add current color to the mix' })`, which was C-1's first
signal; superseded by C2/C3, retained as evidence) ·
`probe-C2.mjs` + `probe-C2.json` (reachability) ·
`probe-C3.mjs` + `probe-C3.json` + `probe-C3-palettes-mode.png` (seeded store, both modes, geometry) ·
`probe-C4-keychurn.mjs` + `probe-C4-keychurn.json` (deterministic key replay).

---

## Verdict

**DEFECTIVE — BLOCKER.**

The Mix workbench's **default mode is inert in the shipped app**. Every "add a colour" affordance in
this file is authored against the **retired Glass-5 `WatercolorDot` API** (`tag="button"` + default
slot + fallthrough `@click`/`aria-label`/`disabled`). Glass 7.0.0's `WatercolorDot` declares
`inheritAttrs: false`, forwards **only `class` and `style`**, hard-renders `<span aria-hidden="true">`
with inline `pointer-events: none`, and has **no slot**. Measured live: not clickable, not focusable,
not exposed to AT, listener never bound, `<Plus>` glyph never rendered. `selectedColors` can never
leave `[]`; `canMix` (≥2) is unsatisfiable; the **Mix button is permanently disabled** in colors mode.

The gate that catches this is RED and unwired; the gates that run cannot see it.

---

## The root mechanism

Glass 7.0.0 `WatercolorDot` — `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`, authoring source
`/Users/mkbabb/Programming/glass-ui/src/components/watercolor-dot/WatercolorDot.vue:96-120`:

```js
inheritAttrs: !1,
props: { color, variant, animate, cycleDuration, range, seed },     // no `tag`
setup(e) { let n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style);
  return () => o("span", {
      "aria-hidden": "true",
      class: l([c.value, "watercolor-swatch", …]),
      style: u([f.value, { …, pointerEvents: "none", … }])
  }, [ /* internal <svg> filter + optional ghost stroke — NO <slot/> */ ]); }
```

```
$ grep -c "<slot" /Users/mkbabb/Programming/glass-ui/src/components/watercolor-dot/WatercolorDot.vue
0
```

The prior major had exactly what this file uses —
`git show 9a8761f0:src/components/watercolor-dot/WatercolorDot.vue`:

```
52:  /** Host tag — `div` (decorative) or `button` (interactive). */
53:  tag?: "div" | "button";
64:  tag: "div",
115:      :is="tag"
214:      <slot />
```

`490cc46e feat(BI): land the Glass 7 component, motion, material, and public-surface cut` removed
`tag`, the `<component :is>` root and the slot. value.js's adoption commit
`f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface` migrated the
mix pane's two siblings and **skipped this file**:

```
$ git show --stat f2c8f565 -- demo/workbenches/mix/
 demo/workbenches/mix/MixPane.vue          |  4 ++--
 demo/workbenches/mix/MixResultDisplay.vue | 26 +++++++++++++-------------
```

Four call sites here (`:122`, `:148`, `:168`, `:215`) still speak Glass 5.

---

## Findings

Severity order. IDs continue r1's numbering where the finding is the same defect
(**CONFIRMED r2** = independently re-derived and re-measured this round); **NEW r2** marks C-15.

---

### C-1 · BLOCKER — colors mode cannot add a colour; the mode is inert · CONFIRMED r2

**Sites.** `MixSourceSelector.vue:164-176` (picker add-slot) and `:211-221` (palette-dropdown swatches).

```vue
<WatercolorDot key="__add__" :color="cssColorOpaque ?? 'var(--muted-foreground)'"
    variant="ghost" tag="button" seed="mix-add-slot"
    class="add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 …"
    aria-label="Add current color to the mix"
    :disabled="!canAddColor || undefined"
    @click="addCurrentColor">
    <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
</WatercolorDot>
```

`tag`, `aria-label`, `disabled`, `@click` and the `<Plus>` child are **all discarded**.

**Measured** — `node evidence/probe-C2.mjs` (Chromium 1440×900, live `:9000`), full output
`evidence/probe-C2.json`:

```json
"ghostAttrs": { "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null, "title": null,
                "disabled": null, "tabIndex": -1, "computedPointerEvents": "none",
                "childTags": ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"],
                "hasPlusIcon": false, "innerText": "" },
"chipsAfterRealClick": 0,
"elementFromPointAtGhostCentre": "DIV .swatch-row flex items-center gap-2.5 fle",
"chipsAfterForcedDomClick": 0,
"ghostKeyboardReachableWithin80Tabs": false,
"mixButton": { "count": 1, "disabled": true },
"sourceSelectorAxNames": { "interactiveDescendants": 0 }
```

Four independent kills, any one of which is sufficient:

1. `pointer-events: none` — a real mouse click at the dot's centre hits the parent row
   (`elementFromPointAtGhostCentre`), not the dot.
2. The listener was never bound — even `el.click()`, which bypasses hit-testing entirely, yields
   **0 chips**.
3. `tabIndex: -1` on a `<span>` — **80 `Tab` presses never reach it**.
4. `aria-hidden="true"` — it does not exist for assistive technology.

`interactiveDescendants: 0` inside `.dashed-well` is the summary: the "Selected" well contains no
control of any kind.

The palette-dropdown swatches are identical (`evidence/probe-C3.json`, store seeded with 3 palettes):

```json
"paletteDropdownSwatches": [ { "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null,
                               "title": null, "pointerEvents": "none" }, …×3 ],
"chipsAfterPaletteSwatchClick": 0
```

**There is no third add path.** `useMixingState.addColor` is invoked from nowhere else
(`MixPane.vue:86` is the only wiring). Therefore `selectedColors` is permanently `[]`, and the whole
chip row `:120-159` — 40 lines including the remove button and the `TransitionGroup` — is
**unreachable dead markup in the shipped app**.

**Already visible in this tranche's own audit.** `audit/visual/shots/safari-desktop-light/mix.png`:
the dashed ghost blob in the Selected well is **empty** — no `+` glyph. That is the dropped slot,
captured 60 times across the matrix and never read as a defect.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/evidence/probe-C2.mjs`

**Cure (gestalt).** Stop asking a decorative primitive to be a control. Glass 7's dot is
`aria-hidden` + `pointer-events:none` **by design** — it is a *face*, never a *seat*. The
transposition is a real `<button>` seat that contains the dot as its face:

```vue
<button type="button" class="add-slot-ghost … min-w-11 min-h-11"
        :disabled="!canAddColor" aria-label="Add current color to the mix"
        @click="addCurrentColor">
    <WatercolorDot :color="cssColorOpaque ?? 'var(--muted)'" variant="ghost" seed="mix-add-slot"
                   class="w-11 h-11 sm:w-12 sm:h-12" />
    <Plus class="w-5 h-5 text-primary/60" aria-hidden="true" />
</button>
```

The seat owns semantics, focus, `disabled` and the hit region; the dot owns paint. Where the pairing
recurs it belongs in **glass-ui** as a `WatercolorDotButton` — never as a new `demo/shared/` wrapper
(edict 3, edict 4).

**Repo blast radius** (`grep -rn 'tag="button"\|tag="div"' demo --include='*.vue'` → 25 sites, all
Glass-5 API). The **6 interactive ones are equally dead**:

```
demo/workbenches/mix/MixSourceSelector.vue:168, :215
demo/workbenches/generate/GenerateControls.vue:203
demo/palettes/browser/card/CurrentPaletteEditor.vue:98
demo/palettes/browser/card/SwatchHoverMenu.vue:17, :32
```

The 19 `tag="div"` sites degrade to a `span` *and silently drop their `:title`* — so every watercolor
swatch tooltip in the demo is gone (`Dock.vue:136,138,271`, `ColorSpaceSelector.vue:82`,
`ConsoleRail.vue:58`, `ImageEyedropper.vue:30`, `EmptyState.vue:45-47`, …). Relay to the
glass-ui BH inbox: a design-system major that deletes a prop should ship a codemod or a
build-time error, not silent attribute swallowing.

---

### C-2 · BLOCKER — the gate that catches C-1 is RED at HEAD; no CI job runs Playwright · CONFIRMED r2

`e2e/smoke/views/mix.spec.ts:39-45` drives exactly the affordance C-1 killed. Run this round at
HEAD `7775473b`:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Test timeout of 30000ms exceeded.
    Error: expect(locator).toBeVisible() failed
    Locator: getByRole('main', { name: 'Color tool panes' }).getByRole('button', { name: 'Add current color to the mix' })
    Expected: visible
    Error: element(s) not found
      42 |     await expect(addSlot).toBeVisible();
  1 failed
```

`e2e/smoke/safari/mix-flow.spec.ts:30-34` is the same assertion on WebKit — RED by construction.

The gate is **not vacuous**. It is a good gate that would have caught this the day `f2c8f565` landed.
It is simply **never executed**:

```
$ grep -rn "playwright\|e2e\|smoke" .github/workflows/
(no output)

$ grep -n "run:" .github/workflows/ci.yml
33: - run: npm ci                34: - run: npm run lint
35: - run: npx vue-tsc -p tsconfig.lib.json --noEmit
36: - run: npx vue-tsc -p tsconfig.demo.json --noEmit
37: - run: npm run build         38: - run: npm test        (vitest)
```

**The entire Playwright suite — 5 projects, every user-view census, every flow — is dark in CI.**
That is how a hard-broken workbench shipped through a close reported "FULLY GREEN". `playwright.config.ts`'s
own header promises *"E.W4 Lane B wires CI"*; the promise was never kept.

**Cure:** wire the five projects into `ci.yml` as hard steps. Until then the repo's behavioural truth
is unmeasured, and every "GREEN" in the tranche record means only "vitest + tsc".

---

### C-3 · MAJOR — the hard typecheck gate is structurally blind to removed props and slots · CONFIRMED r2

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "EXIT=$?"
EXIT=0
```

Green — while the file passes a **prop that does not exist** (`tag`), a `@click` to a component with
no `click` emit, a `disabled` to a component that cannot be disabled, and a **default slot to a
component with no slot**. Vue SFC type-checking treats undeclared attributes as legal `$attrs`
fallthrough, so a major-version prop removal is type-invisible.

**The exact mutation that keeps every currently-running gate green:** delete `tag="button"`,
`aria-label`, `:disabled` and the `<Plus>` child from `:164-176` — i.e. edit the source to *match the
broken runtime*. `lint`, both `vue-tsc` programs, `build` and `npm test` all stay green. That is a
vacuous-gate finding at **suite** level: no gate that runs in CI can observe whether this component
works.

**Cure:** C-2 is the real fix. A cheap second net: an ESLint rule banning unknown attributes on
`@mkbabb/glass-ui` components, or a producer-side `$attrs` guard type in glass-ui. Neither
substitutes for executing the behaviour.

---

### C-15 · MAJOR — **NEW r2** — a palette deleted from the library stays an invisible mix operand

`:230-268` renders selection state **exclusively** from `savedPalettes`, while the selection lives in
`useMixingState.selectedPalettes` (`useMixingState.ts:43`). Nothing reconciles them: no watcher, no
`computed` intersection, no prune anywhere in either file. `removePalette` can only be emitted from a
card *rendered from `savedPalettes`* (`:262 @click="togglePalette"`), so the moment a palette leaves
the library its entry in `selectedPalettes` becomes **unreachable and un-deselectable** — while
remaining counted by `canMix` (`useMixingState.ts:50-53`) and consumed by `mixPalettes` (`:92-96`).

**Measured** — `node evidence/probe-C3.mjs`, which seeds three local palettes into
`localStorage["color-palettes"]` (`usePaletteStore.ts:6` `STORAGE_KEY`), selects *Sunset* + *Forest*,
then deletes *Sunset* from the store and dispatches a `StorageEvent`:

```json
"selectedCount": 2,
"mixEnabledAfterTwoPalettes": true,
"afterDeletingASelectedPalette": {
    "renderedCards": 2, "stillSelectedVisible": 1, "mixStillEnabled": true }
```

`stillSelectedVisible: 1` **with** `mixStillEnabled: true` is the proof: `canMix` requires
`length >= 2`, so the deleted *Sunset* is demonstrably still an operand. `evidence/probe-C3-palettes-mode.png`
shows it — exactly **one** ring-lit card (Forest) above an **enabled** Mix button. Press it and you
mix a palette the user deleted, and the "Mixed Palette" saved by `MixPane.onSave` inherits colours
from a row that no longer exists.

This is the *palettes*-mode analogue of C-1's colors-mode break, and it is **live today**: palettes
mode is the one mode of this component that still functions, so this defect is reachable by a real
user right now.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/evidence/probe-C3.mjs`

**Cure (gestalt).** The selector must not hold a private copy of library rows. Key the selection by
slug and **derive** the operands:

```ts
const selectedSlugs = ref<Set<string>>(new Set());
const selectedPalettes = computed(() =>
    savedPalettes.value.filter((p) => selectedSlugs.value.has(p.slug)));
```

Deletion then removes the operand by construction — no reconciliation, no watcher, no possible skew.
A stale `Set` entry is inert and self-heals if the palette returns. (This also retires
`addPalette`'s hand-rolled dedupe at `useMixingState.ts:66`.)

---

### C-4 · MAJOR — the remove control: 16 px, nameless, invisible-but-tappable, `type=submit` · CONFIRMED r2

`:152-158`:

```vue
<button class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive … opacity-0 group-hover:opacity-100 …"
        :disabled="!canRemoveColor || undefined" @click="emit('removeColor', i)">
    <X class="w-2.5 h-2.5" />
</button>
```

**Measured** against the *shipped* stylesheet by injecting this exact class string into the live page
(`evidence/probe-C3.mjs` §3d — the chip row itself is unreachable per C-1, so the class string is
resolved in situ by the real CSS, Tailwind 4.3.0):

```json
"removeButtonGeometry": {
  "widthPx": 16, "heightPx": 16, "opacity": "0", "pointerEvents": "auto",
  "typeAttr": null, "defaultTypeProperty": "submit",
  "accessibleTextContent": "", "ariaLabel": null, "title": null,
  "hitTestableWhileInvisible": true, "wcag258Min": 24, "passesWcag258": false }
```

Four defects in eight lines:

1. **16×16 px** — fails WCAG 2.2 SC 2.5.8 (24×24 min) and this tranche's own tap-target threshold,
   the metric that scored **60** across the matrix (`audit/visual/REPORT.md:31`). Contributes *N*
   violations for *N* chips; it scores 0 today only because C-1 forces N = 0.
2. **No accessible name.** `accessibleTextContent: ""`, no `aria-label`, no `title`; `<X>` is a bare
   lucide `<svg>`. Same species as `namelessButtons — 18` (`REPORT.md:94`) — *N* chips ⇒ *N* buttons
   that announce as "button".
3. **`opacity-0` + `pointer-events: auto`** — `hitTestableWhileInvisible: true`. Opacity does not
   remove hit-testing. On touch, where `:hover` never fires, this is a **16 px invisible destructive
   control** pinned to each swatch's top-right corner: tap the edge of a swatch, silently lose it.
   `focus-visible:opacity-100` rescues keyboard only.
4. **`type` defaults to `submit`** — unlike the palettes-mode button at `:249`, which correctly sets
   `type="button"`. Inconsistent inside one file.

**Cure.** `type="button"`; `:aria-label="\`Remove ${sc.css}\`"`; a ≥24 px hit box; reveal with
`opacity-0 pointer-events-none` → `group-hover:opacity-100 group-hover:pointer-events-auto`, **plus**
an always-visible state under `@media (hover: none)`. A hover-only destructive affordance has no
touch story.

---

### C-5 · MAJOR — `<button>` wrapping `<PaletteCard>` nests interactive content, against the card's own documented contract · CONFIRMED r2

`:246-268` wraps `<PaletteCard>` in a native `<button aria-pressed>`. `PaletteCard.vue:1-4` states the
contract in its first three lines:

```
<!-- W5-a11y: role="article" provides a landmark for each palette; button semantics on the card
     are omitted because inner interactive controls must be reachable — using article + click is
     the correct pattern for a card container that also houses nested interactive elements. -->
```

The card **emits `click`** precisely so consumers take the interaction *without* wrapping it. This
file ignores both and re-introduces the nesting the card's author removed.

**Measured** (`evidence/probe-C3.json`, all three cards identical):

```json
{ "ariaPressed": "false", "ariaLabel": "Select palette Sunset",
  "nestedInteractive": 1, "nestedInteractiveTags": ["BUTTON[Palette menu]"],
  "rect": { "w": 462, "h": 100 } }
```

`<button>` has *interactive content* in its permitted-content model — a nested `<button>` is invalid
HTML. Parsers keep it; the consequences are real: the `aria-label` at `:251` overrides all descendant
text, so the palette's name, colour count and swatches are **never announced**; and activating the
nested "Palette menu" bubbles into the wrapper's `togglePalette`, so opening the menu also toggles
the mix selection. Visible in `evidence/probe-C3-palettes-mode.png` (the `···` control inside each
selected card).

**Cure.** Drop the wrapper. `<PaletteCard @click="togglePalette(palette)" :selected="…">` — selection
is a **card-level state prop** the producer renders (which is also the right home for the ring; see
C-12).

---

### C-6 · MAJOR — the guards are unenforceable; one add path has no cap at all · CONFIRMED r2

`MIN_COLORS`/`MAX_COLORS` (`:36-40`) guard exactly one surface: `:disabled` on the add-slot (`:172`)
— an attribute Glass 7 **discards** (`probe-C2.json` `ghostAttrs.disabled: null`). The second add
path, `:220`, emits `addColor` with **no cap check**. And the machine itself has none
(`useMixingState.ts:55-57`):

```ts
function addColor(css: string, source: string = "picker") {
    selectedColors.value = [...selectedColors.value, { css, source }];
}
```

So the "sensible upper bound" is dead code today and bypassable the instant C-1 is cured.
Symmetrically `canRemoveColor` guards only the X button; nothing in the machine enforces the floor.

**Reproduction:** NONE — latent behind C-1; source-established at all three sites.
**Cure:** move the invariant into the reducer (`addColor` returns early past the cap, `removeColor`
past the floor) and let the view read `canAddColor`/`canRemoveColor` off the machine. A guard in a
template is a suggestion; a guard in the reducer is a law.

---

### C-3′ / C-14 · MAJOR — the "stable keys" scheme re-keys every survivor; strictly worse than `:key="i"` · CONFIRMED r2

*(r1 numbered this C-3; renumbered here to keep C-3 for the type gate.)*

`:78-98`:

```ts
const swatchKeys = computed(() => selectedColors.map((sc, i) => {
    const mapKey = `${sc.css}::${i}`;                      // ← the index is IN the key
    if (!swatchKeyMap.has(mapKey)) swatchKeyMap.set(mapKey, swatchKeyCounter++);
    return swatchKeyMap.get(mapKey)!;
}));
```

Replayed byte-for-byte including `useMixingState.removeColor`'s filter and the `:90-98` pruner —
`node evidence/probe-C4-keychurn.mjs`, output `evidence/probe-C4-keychurn.json`:

```json
"keysBefore": [0, 1, 2],
"keysAfter":  [3, 4],
"B kept its key (patched in place)": false,
"C kept its key (patched in place)": false,
"verdict": "EVERY surviving chip is re-keyed => TransitionGroup unmounts + remounts all of them
            (full leave+enter churn). The mechanism is strictly WORSE than :key=\"i\", which
            patches survivors in place.",
"mapSizeAfter": 2, "counterAfter": 5
```

Remove the first of three chips and `<TransitionGroup name="vj-enter">` (`:120`) sees **zero**
matching keys: leave on all three, enter on two brand-new nodes. Every surviving `WatercolorDot`
unmounts and remounts — discarding and re-minting its `useId()`-namespaced `<filter>` and
re-rasterising the turbulence graph, the exact per-swatch cost the Glass 7 dot's own docblock exists
to avoid (*"rasterizes ONCE + caches … NEVER re-rasterizes per frame"*).

Twenty lines of state — a module-level `Map`, a mutable counter, a computed and a watcher — to
produce an outcome **worse than the two characters `:key="i"`**. Edict-3 contrivance with a negative
payoff.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/evidence/probe-C4-keychurn.mjs`
**Cure.** Delete `:78-98`. If identity-stable keys are genuinely wanted (they are, for a correct move
transition), mint the identity **where the datum is born** — a `uid: string` on `SelectedColor` in
`useMixingState.addColor`. Identity belongs to the datum, never to a render-time side table.

---

### C-7 · MINOR — the Selected region is silent to assistive technology · CONFIRMED r2

`:146-151` renders each chip as `<WatercolorDot tag="div" :title="…">`; under Glass 7 that is a
`<span aria-hidden="true">` with **`title` dropped** along with every other fallthrough attr
(`probe-C2.json` `ghostAttrs.title: null` for the identical construction). So even after C-1 is
cured, an AT user's entire experience of "which colours am I mixing?" is *N* unnamed buttons and
nothing else: no list semantics, no `aria-live` on add/remove, and the `"Selected"` label at `:119`
is a bare `<span>` bound to nothing.

The W5-7 comment at `:117-118` deleted the visible "N colors" counter for good design reasons — but
it took the only **programmatic** count with it.

**Reproduction:** hypothesis for the post-C1 state; the attribute-drop half is CONFIRMED.
**Cure:** `<ul role="list">` + `<li>` per chip; the remove button's name carries the colour; a
visually-hidden `aria-live="polite"` region announcing `"{{ n }} colors selected"`.

---

### C-8 · MINOR — the mode strip is an unnamed `role="group"` · CONFIRMED r2

`SegmentedTabs` declares an accessible-name prop that `:105-110` omits:

```
$ grep -n "ariaLabel\|update:modelValue" node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts
43:    ariaLabel?: string;
50:    ariaLabel?: string;
103:    "update:modelValue": (value: string) => any;
```

The two option buttons are named ("Colors", "Palettes" — `probe-C0` DOM census); the *group* is not.
**Cure:** `aria-label="Mix source"`.

---

### C-9 · MINOR — `onTabChange` defends against a signature that does not exist · CONFIRMED r2

`:47-53` types the handler `(value: string | string[])` and branches
`Array.isArray(value) ? value[0] : value`, with the comment *"Single-select tabs always emit a
string; guard the union honestly."* The producer's emit type (line 103 above) is
`(value: string) => any`. The array branch is unreachable; the comment concedes it. A defensive shim
against a non-existent producer shape is a masking fallback (edict 2), and it widens the handler so a
*real* future producer change is silently absorbed instead of failing the type gate.

**Cure:** `function onTabChange(next: "colors" | "palettes") { emit("update:mode", next); }`.

---

### C-10 · MINOR — the machine's own initial state is unreachable from the component · CONFIRMED r2

`MIN_COLORS = 1` / `canRemoveColor = selectedColors.length > 1` (`:37`, `:39`), but
`useMixingState.ts:42` boots at `ref([])` — zero is the boot state and a legal state. Once the user
reaches exactly one chip the component can never return there; the only escape is a differently
labelled control on another surface (`demo/shell/usePaneRouter.ts:220`,
`handler: () => paneRefs.mix.value?.clearSelection?.()`).

**Cure:** `MIN_COLORS = 0`. `canMix` already requires ≥2.

---

### C-11 · MINOR — `:css-color="''"` defeats PaletteCard's empty-palette fallback · CONFIRMED r2

`:266` passes `:css-color="''"`. `PaletteCard.vue:223-226`:

```ts
const EMPTY_PALETTE_SWATCH = "#888";
const firstColor = computed(() => props.palette.colors[0]?.css ?? props.cssColor ?? EMPTY_PALETTE_SWATCH);
```

`''` is not nullish, so `??` keeps it: for a zero-colour palette — which PaletteCard explicitly
supports — `firstColor` becomes `''` and the sentinel is never reached. Not a crash today
(`certifyAccentInk('')` → `parseOklch('')` → `null`), but an empty-string sentinel threaded into a
colour resolver is precisely the shape of the repo's live `parseCssColor` crash class, and it sits one
refactor away from `picker-color.ts:109-113`, which throws on `''`.

**Cure:** omit the prop; it is `cssColor?: string | undefined`.

---

### C-12 · MINOR — per-instance selection styling that belongs to the card · CONFIRMED r2

`:256-261` paints selection as a Tailwind override on the wrapper:
`'ring-2 ring-primary ring-offset-2 ring-offset-background'` vs `'opacity-75 hover:opacity-100'`.
Selection is a *state of the card*, not a decoration a consumer bolts on (edicts 4 + 5). The file
already carries the scar tissue: `:134-145` is an eleven-line comment recording that a previous
`ring-2 ring-primary/50` here was **cascade-dead** and had to be excised. `ring-offset-background` is
additionally wrong in a card-on-plate context — the offset reads the page background, not the surface
the card sits on (`evidence/probe-C3-palettes-mode.png`).

---

### C-13 · MINOR — `SelectedColor.source` is dead data; `data-mix-colors` re-serialises per render · CONFIRMED r2

`SelectedColor.source` (`useMixingState.ts:27`) reaches the DOM at exactly one place — the `:title`
at `:150` — which Glass 7 discards. It is written by both add paths and read by nobody.

Separately `:253-255` computes `JSON.stringify(palette.colors.slice(0,4).map(c => c.css))` inline in
the template, so it re-runs for every rendered palette on every re-render of the list — including
every selection toggle. Template expressions memoise nothing.

**Reproduction:** NONE (cost is small at 3 palettes; grows linearly with library size).

---

### C-16 · INFO — dead CSS and an archaeology comment corpus attached to non-functioning markup

- `.add-slot-ghost { display:inline-flex; align-items:center; justify-content:center }` (`:275-281`)
  centres a child Glass 7 cannot render. Confirmed dead: `probe-C2.json`
  `childTags: ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"]` — the dot's own
  internals, never `<Plus>`.
- 283 lines, of which **~55 are tranche-provenance comments** (`:134-145`, `:186-189`, `:231-238`,
  `:269-270`) narrating decisions about markup that does not execute. The upstream design system
  scrubbed this exact class of comment from its own tree
  (`glass-ui 2d1584a5 chore(demeta): … greenfield-no-meta at global zero`). Comments that outlive
  their subject become false documentation: a reader of `:134-145` would reasonably conclude the chip
  ring question is settled and working.

---

## Local-hazard sweep (the seat's mandated checklist)

| Hazard | Present? | Evidence |
|---|---|---|
| `defineModel()` stale async round-trip | **No** | no `defineModel`; `mode` is a plain prop + explicit `update:mode` emit (`:25-31`, `:47-53`) — correctly one-way |
| oklch→HSV hue drift / `stableHue` | **No** | the component never converts; CSS strings pass through untouched |
| `ValueUnit` nesting accumulation | **No** | no `ValueUnit` construction; `sc.css` is a string end to end |
| reka-ui slider pointer-capture leak | **No** | no slider; the only reka-derived control is glass-ui `Collapsible` |
| ungated `requestAnimationFrame` | **No** | zero rAF in the file. The dot's wobble rides glass-ui's single `useRAFLoop` (`pauseWhenHidden`, `respectReducedMotion`) and is off by default — this file never passes `animate` |
| WebGL context loss / eager boot | **No** | no drawing context; `WatercolorDot`'s docblock is explicit that it is the CSS/SVG counterexample. The `/#/mix` route's 3 canvases are the picker + MixAnimationCanvas, not this component (`REPORT.json` `counts.canvas: 3`) |
| `parseCssColor` crash class | **No** | `:166` passes `cssColorOpaque ?? 'var(--muted-foreground)'` into `WatercolorDot`, which paints it as a raw `background-color`/custom-property and **never parses** (`WatercolorDot.vue:112`). An unresolvable `var()` renders transparent, not throws. In the `ghost` register it is not even used as a background. **Adjacent risk: C-11.** |
| Unbounded growth | **Marginal** | `swatchKeyMap` is pruned each tick (`probe-C4` `mapSizeAfter: 2`); `swatchKeyCounter` grows monotonically but is a `number` — churn, not a leak (C-14) |
| Missing cleanup / leaked listeners | **No** | the file registers no listener, timer or observer; its single `watch` is component-scoped |
| Reactivity that will not fire | **No** | props destructure compiles to `__props.x` getters; `watch(() => selectedColors, …)` fires because `useMixingState` **replaces** the array on every mutation (`useMixingState.ts:56`, `:60`) instead of mutating in place — correct, and load-bearing |
| Empty collection / boundary inputs | **Partly** | palettes mode handles `savedPalettes.length === 0` honestly (`:239-244` EmptyState). Colors mode has no zero-state (moot under C-1). `C-11` is the boundary defect: `''` at a colour seam |

### Edict conformance

| Edict | Verdict |
|---|---|
| 1 · no god modules | **Pass** — 283 lines, one job |
| 2 · no legacy code | **FAIL** — C-1 (Glass-5 API retained past a major), C-9 (defensive shim), and the `?? []` masking fallback at `:34` against a port its own parent asserts with `!` (`MixPane.vue:16`; also `GeneratePane.vue:11`, `PalettesPane.vue:164`) |
| 3 · KISS, no contrivance | **FAIL** — C-14 |
| 4 · glass-ui is the design system | **FAIL** — C-5, C-12 hand-roll card selection in the consumer |
| 5 · root-level styling | **FAIL** — C-12 |
| 6 · animations never deleted | **Pass** — `animate-collapsible-down/up` resolve correctly; measured live `{"animationName":"collapsible-down","animationDuration":"0.2s","heightVarReka":"398.90625px"}` (`probe-C3.json`), with `tw-animate-css` imported at `demo/styles/foundation.css:2` and the height var supplied by `glass-ui/src/components/_shared/disclosure/disclosure.css:100`. `vj-enter` is present but degraded by C-14 |
| 7 · idiomatic Vue 3.5 | **Pass** — reactive props destructure used correctly; no `useTemplateRef`/`shallowRef` need arises |
| 8 · `verbatimModuleSyntax` | **Pass** — `import type { Palette }` (`:10`), `import type { SelectedColor }` (`:11`); all value imports are values |

---

## Family grouping

| Family | Findings | One cure |
|---|---|---|
| **Glass-5 API retained past a major** | C-1, C-7, C-13 (dead `source`), C-16 (dead CSS) | seat/face separation at all six interactive `tag=` sites; `tag="div"` sites drop `:title` too |
| **Selection state held as a private copy of library rows** | **C-15**, C-6 (guards outside the reducer), C-10 | derive operands from the store by slug; move invariants into the machine |
| **Consumer re-implements a producer's state** | C-5, C-12, C-8, C-11 | take the card's `@click`/`:selected` contract; pass the producer's `ariaLabel`; stop passing `''` |
| **The measurement apparatus does not run** | C-2, C-3 | wire Playwright into `ci.yml` as hard steps |
| **Contrivance with negative payoff** | C-14, C-9 | delete both; mint identity at birth, let `vue-tsc` be the guard |

## Negative proof (what is genuinely sound)

The **state machine** is well built and is not the defect: `useMixingState` owns no timers (the
ONE-CLOCK law holds — `startMix` computes synchronously and only `settleMix`, driven by the canvas's
`@settled`, advances the phase; `:83` is a real re-entry guard), it replaces arrays instead of
mutating them (which is exactly why the child's watcher fires at all), and `mixColorSequence` /
`mixPalettes` are pure. The reactive-props-destructure usage is idiomatic Vue 3.5 and correct. The
palettes-mode EmptyState is honest — it announces no loading species because the store is
synchronous. The collapsible animation genuinely resolves. And no local hazard from the repo's
record — `defineModel` staleness, hue drift, `ValueUnit` nesting, pointer-capture leak, ungated rAF,
eager WebGL, `parseCssColor` — is present in this file. The defects are concentrated at exactly two
seams: **the consumer/producer boundary with glass-ui**, and **the selector's private copy of library
state**.

## Strongest defect

**C-1.** The Mix workbench's default mode has been non-functional in `main` since `f2c8f565`
(2026-07-17) — no colour can be added by mouse, touch, keyboard or AT — because four call sites still
speak the Glass-5 `WatercolorDot` API that Glass 7 removed. It shipped because the one gate that
tests it is not wired into CI (C-2), and the gates that are wired cannot see prop or slot removal
(C-3). The cure is not a patch to the call sites: it is the **seat/face separation** — a real
`<button>` owning semantics, focus and hit region, with the decorative dot painted inside it — applied
at all six interactive `tag="button"` sites in `demo/`, plus making the Playwright suite a hard CI
gate so behavioural truth is measured rather than asserted.
