# CHALLENGE-C — `CurrentPaletteEditor.vue` is improperly implemented (pass 4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
That is the tier this seat was explicitly declared with, so the declaration is honoured: this is
not an inherited or undeclared seat.

---

## Subject, substrate, method

| | |
|---|---|
| Component | `demo/palettes/browser/card/CurrentPaletteEditor.vue` (312 lines, area `palettes`) |
| Composables read | `card/composables/useSwatchActions.ts` (116), `useHoverPopover.ts` (67), `useLeaveTimer.ts` (17) |
| Children read | `card/SwatchHoverMenu.vue` (93), `browser/status/ApiOfflineChip.vue` (91) |
| Parent chain read | `PalettesPane.vue:41-54` → `usePalettePorts.ts` → `usePaletteActions.ts` → `usePaletteStore.ts`; `color-picker/composables/usePaletteWiring.ts`; `color-session/useColorPipeline.ts`, `useColorPersistence.ts`, `useAtmosphereFrameCoalesce.ts`, `picker-color.ts` |
| Producer | `@mkbabb/glass-ui@7.0.0` — `dist/watercolor-dot.js` (4 560 bytes), `dist/components/watercolor-dot/WatercolorDot.vue.d.ts`, `dist/prng-2uS6J_A1.js` |
| Repo | branch `tranche-u`. Task cited HEAD `c654824e`; working HEAD is `f36f780c`. Docs-only delta — `git log --stat c654824e..f36f780c` touches no `demo/`, `src/`, `api/`, `test/`, `e2e/` file. |
| Live substrate | `http://localhost:9000` (dev server, HTTP 200) |

**Prior passes are preserved** at `challenge-C-implementation.2026-07-27-pass1.md`,
`…2026-07-28-pass2-prior.md`, `…2026-07-28-pass3-prior.md`. This pass is an **independent
re-derivation**: I read the component, its composables, its children, its parent chain and the
producer's shipped bundle *before* reading any prior. Every number below was measured by me in
this session. My probes live beside this report at `probe/probe-P4-{a,b,c,d,e}.mjs` +
`probe/p4-*.png`; each is re-runnable with `node <path>` and touches nothing but browser storage.

**What is new in pass 4.** Four measured defects no prior pass reports (C4-1 … C4-4), one
**correction of a pass-3 evidentiary claim** (C4-5), and independent re-measurement of the
standing blockers — including a single `localStorage` diff that reproduces the latch bug and the
metadata-destruction bug *in the same transaction*.

---

## Verdict

**DEFECTIVE — BLOCKER.**

The component's two reasons to exist are inert in the shipped tree: you cannot add the current
colour, and you cannot edit, copy or remove a colour already in the buffer — by mouse, by
keyboard, or by touch. The one surviving path (type a name → Enter → save) carries a latched
duplicate-target that I drove through the live UI into **overwriting a differently-named stored
palette, destroying its per-colour `name` and `weight` metadata, and discarding the name the user
typed**. Two class names in the component's own templates resolve to **zero CSS rules**.

Beyond the standing blockers, pass 4 establishes that the component's *visual* contract is false
as well: the "one shape source" the file's comments assert three times is **provably three
different shapes**, and the always-mounted add slot re-randomises its silhouette and its SVG
turbulence seed on **every** colour change — consuming the raw colour signal that the repo built
`useAtmosphereFrameCoalesce` specifically to stop consumers from consuming.

Every CI gate is green. There are zero tests for this component or any of its three composables.
CI runs no Playwright. The one e2e spec written for this exact flow is **RED on HEAD — I ran it.**

| id | sev | one line | status |
|---|---|---|---|
| C-1 | BLOCKER | the add-current-colour control is a decorative `<span>`; `tag` / `aria-label` / `@click` / default slot all silently discarded | re-measured |
| C-2 | BLOCKER | every swatch is `aria-hidden` + `pointer-events:none`; mouse, keyboard **and** touch action paths dead | re-measured |
| C-3 | BLOCKER | latched `duplicateTarget` → `Update` overwrites a *differently named* palette **and** destroys its per-colour `name`/`weight` | re-measured, single store diff |
| **C4-1** | **MAJOR** | **the `seed` props break the very "one shape source" invariant their comments assert — ghost preview ≠ the swatch it previews** | **NEW** |
| **C4-2** | **MAJOR** | **the add slot binds the *uncoalesced* live colour → per-colour-change silhouette re-randomisation + `feTurbulence` re-seed (SVG filter re-rasterisation)** | **NEW** |
| **C4-3** | **MAJOR** | **`hashString(color+seed) % 256` collides across the primary palette: R/G/B all → filter seed 173 (producer relay)** | **NEW** |
| **C4-4** | **MAJOR** | **one "add current colour" gesture, three identity predicates, two contradictory insertion orders** | **NEW** |
| C-4 | MAJOR | `.floating-panel` is a phantom class → hover menu renders `position:static`, unstyled, below the fold | re-measured |
| C-5 | MAJOR | `.btn-interactive` is a phantom class → hover/press/focus register deleted and moved nowhere | re-measured |
| C-6 | MAJOR | 3 focusable buttons inside an `aria-hidden="true"` container (`axe` `aria-hidden-focus`) | carried |
| C-7 | MAJOR | the Save button has no accessible name (measured 32×40, name `""`) | re-measured |
| C-8 | MAJOR | duplicate-name refusal is silent to AT — `liveAncestor: null`, no focus move | re-measured |
| C-9 | MAJOR | `swatchKeys` are index-derived → every key re-mints on any removal/reorder | re-derived |
| C-10 | MAJOR | `colorsFromStrings` drops `PaletteColor.name` / `.weight` | **measured** (folded into C-3's diff) |
| C-11 | MINOR | raw-string colour identity fails across a space change | carried (subsumed by C4-4) |
| C-12 | MINOR | `useLeaveTimer` has no `onScopeDispose` | re-verified by grep |
| C-13 | MINOR | 3 action buttons keep the strays the file declares retired, incl. `focus-visible:outline-none` | carried |
| C-14 | MINOR | redundant prop pair (`savedPaletteCount` ≡ `savedPalettes.length`) | carried |
| **C4-5** | **MINOR (gate)** | **pass-3 mis-attributed the visual REPORT's nameless button; the component's real a11y defects live in a state the matrix never captures** | **NEW / correction** |
| C-16 | BLOCKER (gate) | vacuous gate stack: 0 unit tests, `vue-tsc` blind by construction, CI runs no Playwright, `palette-save.spec.ts` RED | re-measured |

---

## Root mechanism (re-derived from the shipped bundle, not from the priors)

`WatercolorDot` in `@mkbabb/glass-ui@7.0.0` is a **decorative primitive by producer design**. Its
published props are exactly `{ color, variant?, animate?, cycleDuration?, range?, seed? }`
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`) and its `DefineComponent` slots
parameter is `{}`. The runtime, read directly:

```
$ node -e "…read dist/watercolor-dot.js…"
inheritAttrs: inheritAttrs: !1
renderSlot count: 0
```

Verbatim from the bundle: `inheritAttrs: !1`; the render function opens a hard-coded
`o("span", { "aria-hidden": "true", class: […c.value, "watercolor-swatch"…], style: u([f.value,
{ …, pointerEvents: "none", … }]) }, [svg, ghostStroke])`, where `c`/`f` are
`computed(() => attrs.class)` / `computed(() => attrs.style)`. **Class and style are the only
attrs re-applied.** There is no `renderSlot` call anywhere in the component.

`CurrentPaletteEditor.vue:95-105` and `SwatchHoverMenu.vue:14-20,29-36` consume it as an
interactive polymorphic element. Of the eight things they hand it, glass-ui 7 honours two.

`vue-tsc` cannot see this by construction: an unknown prop is a legal fall-through attr,
`aria-label` is a legal attr, `@click` is a legal listener, and default-slot content against a
`{}`-slots component is not an error.

---

## BLOCKER C-1 — the primary action is not a control (re-measured)

`CurrentPaletteEditor.vue:95-105` mounts the component's reason to exist as
`<WatercolorDot tag="button" :aria-label="…" @click="addCurrentColor"><Plus/></WatercolorDot>`.

**Live, `/#/palettes`, 1440×900** (`probe/probe-P4-a.mjs`, verbatim):

```json
"addSlot": { "found": true, "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null,
             "tabIndex": -1, "pointerEvents": "none", "hasPlusSvg": false,
             "childTags": ["svg.watercolor-filter-host", "SPAN.watercolor-ghost-stroke"] },
"addButtonsByRole": 0
```

`SPAN`. `aria-label` → `null`. `tabIndex: -1`. `pointer-events: none`. **No `<Plus>` child.**
Zero elements answer `getByRole("button", { name: /Add current color/ })`.

Visible in the shipped Safari capture:
`audit/visual/shots/safari-desktop-light/palettes.png` — the "Start a new palette" well contains a
bare dashed blob with **no `+` glyph**. My own populated screenshot
(`probe/p4-populated-editor.png`) shows the same: three solid swatches, then a dashed slot with
nothing in it.

**The repository's own e2e proves it, and it is RED right now:**

```
$ npx playwright test e2e/smoke/flows/palette-save.spec.ts --reporter=line --workers=1
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
    Test timeout of 30000ms exceeded.
    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('main', …).getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
    > 37 |         .click();
  1 failed
```

**Reproduction** — `node …/probe/probe-P4-a.mjs`, or the Playwright command above.

**Cure (transposition).** The interactive element owns semantics; the dot owns paint.

```vue
<button type="button" class="add-slot-ghost relative inline-flex items-center justify-center …"
        :aria-label="`Add current color ${cssColorOpaque} to palette`" @click="addCurrentColor">
    <WatercolorDot :color="cssColorOpaque" variant="ghost" class="absolute inset-0" />
    <Plus class="w-5 h-5 text-primary/60 relative" aria-hidden="true" />
</button>
```

No producer change required — glass-ui's contract is already correct and documented in its own
`.d.ts`. `tag="button"` must be deleted from **every** `WatercolorDot` site in the repo.

---

## BLOCKER C-2 — every swatch is inert (re-measured)

`SwatchHoverMenu.vue:14-20` (touch `PopoverTrigger as-child`) and `:29-36` (hover) both render the
swatch as `WatercolorDot tag="button" :aria-label @click`. Populated palette
(`probe/probe-P4-c.mjs`, 4 seeded colours):

```json
"swatches": { "count": 5, "detail": [
  { "tag": "SPAN", "variant": "solid", "ariaHidden": "true", "ariaLabel": null,
    "tabIndex": -1, "pointerEvents": "none", "bg": "rgb(255, 0, 0)" },     // ×4
  { "tag": "SPAN", "variant": "ghost", "ariaHidden": "true", "ariaLabel": null,
    "tabIndex": -1, "pointerEvents": "none" } ] }
```

**Keyboard reachability inside `.dashed-well` — exactly two stops, total:**

```json
"keyboard": [
  { "tag": "INPUT",  "ariaLabel": null, "title": null, "placeholder": "Palette 1", "w": 396, "h": 36 },
  { "tag": "BUTTON", "ariaLabel": null, "title": null, "text": "",                 "w": 32,  "h": 40 } ]
```

Zero swatches, zero of the twelve swatch-action buttons, zero add slot. A keyboard user can type
a name into a field whose only name is a placeholder, and press a button with no name. That is the
whole component.

The hover panel is dead too: hovering the add slot for 900 ms yields
`{"tooltipRoleNodes": 0, "textMentionsAddCurrent": false}` (`probe/probe-P4-b.mjs`) —
`TooltipTrigger as-child` merges its trigger props into attrs, `inheritAttrs:false` discards them,
and `pointer-events:none` means the element never receives the pointer in the first place. The
`TooltipContent` at `:107-109` can never render.

**Reproduction** — `node …/probe/probe-P4-b.mjs`, `node …/probe/probe-P4-c.mjs`.

---

## BLOCKER C-3 — the latch overwrites the wrong palette and destroys its metadata (one measured diff)

`CurrentPaletteEditor.vue:241` stores the collision in a `ref`; `:247-265` sets it; `:267-276` acts
on it; `:144-167` renders the banner. **Nothing watches `currentPaletteName`.** The latch clears
only on explicit `Cancel` or a completed save/update.

Store seeded with one local palette `Dup` carrying rich per-colour metadata; current buffer holds
three colours. Driven through the live UI (`probe/probe-P4-d.mjs`):

| step | observed |
|---|---|
| type `Dup`, Enter | `Current Palette \| 3 colors \| … \| "Dup" already exists. \| Update \| Cancel` |
| `storeBefore` | `colors: [{css:"#123456", position:0, name:"Deep Teal", weight:0.72}, {css:"#abcdef", position:1, name:"Pale Sky", weight:0.28}]` |
| rename field → `A Totally Different Name` | `inputValueNow: "A Totally Different Name"`; banner **unchanged**; `updateStillOffered: true` |
| click `Update` | `storeAfter`: `colors: [{css:"rgb(255 0 0)",position:0},{css:"rgb(0 255 0)",position:1},{css:"rgb(0 0 255)",position:2}]`, `name` still `"Dup"` |
| editor after | `"Start a new palette"` — the source buffer is cleared too |

Three distinct data losses in one click, with no confirmation and no undo:

1. **wrong target** — the user was naming a *new* palette; a *different*, still-differently-named
   palette was overwritten;
2. **metadata destruction (C-10)** — `Deep Teal` / `Pale Sky` and the weights `0.72` / `0.28` are
   gone. `colorsFromStrings` (`:243-245`) projects `string[] → {css, position}` and
   `usePaletteActions.ts:79-81` replaces the array wholesale. `demo/palettes/types.ts` documents
   `weight` as *the quantizer's population share … `PaletteColorStrip` sizes its segments from it*
   — so an extracted palette silently collapses to uniform segments;
3. **typed name discarded** — `currentPaletteName` is reset at `:273` and never used.

**Reproduction** — `node …/probe/probe-P4-d.mjs`; screenshot `probe/p4-latch.png`.

**Cure.** `duplicateTarget` is derived state pretending to be stored state:

```ts
const confirmingSave = ref(false);
const duplicate = computed(() => confirmingSave.value
    ? savedPalettes.find(p => p.name.toLowerCase() === effectiveName.value.toLowerCase()) ?? null
    : null);
watch(() => currentPaletteName.value, () => { confirmingSave.value = false; });
```

Staleness becomes structurally impossible. Separately, the update path must merge by position
against the target's existing `colors` (or the current buffer must be lifted to `PaletteColor[]`
end to end so the lossy projection disappears).

---

## MAJOR C4-1 — the `seed` props break the "one shape source" invariant their own comments assert ⟵ NEW

Three comments in this file assert a shape identity:

- `:92-94` — *"the add-slot is the shipped WatercolorDot ghost — **the seeded dashed silhouette the
  committed swatch will fill** — seeded by the LIVE color."*
- `:60-61` — *"The FROM slot reads as the shipped ghost variant — the seeded dashed silhouette."*
- `:280-283` — *"one shape source, producer-owned."*

The producer's contract is `hashString(color + seed)` → `mulberry32` → 8 border-radius percentages
(`dist/watercolor-dot.js`; `useWatercolorBlob`). **The add slot passes `seed="add-current-slot"`
(`:99`); the committed swatch is rendered by `SwatchHoverMenu.vue:14/29`, which passes no `seed` at
all → `seed: ""`.** Different seed, different hash, different silhouette. The edit overlay is
worse: FROM is `'edit-from-' + i` (`:62`), TO is `'edit-to-' + i` (`:64`), and the swatch underneath
is `""` — three different shapes for what the UI presents as one object changing colour.

**Computed offline from the producer's own exported PRNG** (deterministic, no browser):

```
$ node --input-type=module -e "import {hashString,mulberry32,randomRadii,radiiToCSS} from '…/glass-ui/dist/watercolor-dot.js'; …"
""                 -> 21.530% 20.417% 43.084% 41.624% / 52.372% 52.874% 53.123% 67.353%   feTurb seed=173
"add-current-slot" -> 59.941% 27.805% 35.634% 24.201% / 67.194% 73.655% 56.115% 32.292%   feTurb seed= 85
"edit-from-0"      -> 53.501% 76.657% 28.463% 53.812% / 77.908% 55.148% 34.823% 43.378%   feTurb seed=177
"edit-to-0"        -> 60.156% 73.690% 48.578% 35.161% / 67.154% 62.471% 55.539% 34.546%   feTurb seed=128
```

**Confirmed live, same colour in both slots** (`probe/probe-P4-c.mjs`, `rgb(255 0 0)` saved *and*
live):

```json
"silhouette": {
  "liveColorVar": "rgb(255 0 0)", "firstSwatchColorVar": "rgb(255 0 0)", "sameColour": true,
  "ghostRadius":       "59.9408% 27.8051% 35.6339% 24.2009% / 67.1938% 73.6552% 56.115% 32.2925%",
  "firstSwatchRadius": "21.5301% 20.4166% 43.0843% 41.6235% / 52.3722% 52.8745% 53.1235% 67.3533%",
  "identicalSilhouette": false,
  "ghostTurbSeed": "85", "swatchTurbSeed": "173" }
```

The live values match the offline computation digit for digit. The ghost is not a preview of
anything: the user sees one outline, commits, and a different outline appears. Visible in
`probe/p4-populated-editor.png` — the dashed slot is a taller, rounder lozenge than any of the
three swatches beside it.

**Cure.** The seed *is* the identity. Either (a) delete every `seed` prop at these four sites so
preview and result share the producer default, or (b) key the seed to the **colour's identity**
rather than the slot's role, and pass the same seed to the swatch that lands. What must not stand
is a comment asserting an invariant the code's own arguments break.

---

## MAJOR C4-2 — the add slot binds the *uncoalesced* live colour, re-randomising shape and re-seeding the SVG filter on every colour change ⟵ NEW

`:96` binds `:color="cssColorOpaque"` on an **always-mounted** dot (it renders whenever the pane
does). Two consequences follow from the producer bundle:

1. `useWatercolorBlob` with `animate: false` installs
   `watch(colorSource, c => { borderRadius.value = radiiToCSS(randomRadii(mulberry32(hashString(c + seed)), lo, hi)) })`
   — **the silhouette is recomputed from scratch on every colour change.**
2. `WatercolorDot`'s setup computes `seed = hashString(color + seed) % 256` and binds it to
   `<feTurbulence seed>`. Changing a `feTurbulence` seed invalidates the filter's cached noise:
   the browser must regenerate a `numOctaves="5"` `fractalNoise` and re-run `feDisplacementMap`.

The producer's own header states the opposite is the design: *"the SVG `<filter>` rasterizes ONCE +
caches (the HandMark `texture.ts` idiom) and **NEVER re-rasterizes per frame**."* Binding a live
colour defeats it.

**Measured** — one synthetic drag of the first picker slider (60 discrete moves), MutationObserver
on the add slot's `style` and on its `feTurbulence@seed` (`probe/probe-P4-a.mjs`):

```json
"churn": { "styleMutations": 34, "turbSeedMutations": 17,
           "distinctBorderRadii": 7, "distinctTurbSeeds": 11,
           "sampleRadii": [ "28.1208% 33.6845% 57.986% 49.3693% / …",
                            "27.7174% 34.5827% 58.0626% 50.8601% / …",
                            "33.8885% 39.5765% 58.8485% 50.2566% / …" ] }
```

Fleet-wide over the same gesture (`probe/probe-P4-b.mjs`, 7 mounted dots, `dragMs: 5613`):
`{"styleMutations": 267, "seedMutations": 68}`. The cadence is one per colour change — the
synthetic drag, not the app, is the limiter; a real 60 fps drag issues 60/s.

**This is the exact hazard the repo already solved and then routed around.**
`demo/color-session/useAtmosphereFrameCoalesce.ts:1-30` exists verbatim because *"three heavy
derives … would otherwise fire SYNCHRONOUSLY on EVERY `cssColorOpaque` change, i.e. 60×/s under a
slider drag → the ~20fps / 31-of-44-janked collapse"*, and instructs that *"the atmosphere
consumers read the RETURNED signal (never the synchronous `cssColorOpaque`)"*. But
`demo/color-picker/App.vue:271` is `provide(CSS_COLOR_KEY, cssColorOpaque)` — the **raw** signal —
and this component injects it (`PalettesPane.vue:163` → prop `cssColorOpaque`). A per-frame SVG
filter re-rasterisation is precisely an "atmosphere-class" derive, and it is on the raw wire.

**Reproduction** — `node …/probe/probe-P4-a.mjs` (add-slot only), `node …/probe/probe-P4-b.mjs`
(fleet).

**Cure.** The ghost slot does not need frame-accurate colour: bind `cssColorOpaqueFrame` (already
built, already exported from the pipeline, already provided to the atmosphere) — or, better, make
the *seed* independent of colour (C4-1's cure) so the silhouette and filter stop being a function
of a 60 Hz signal at all. Only the swatch background needs to track the live colour, and a
background-colour change is a compositor operation, not a filter rebuild.

---

## MAJOR C4-3 — `hashString(…) % 256` collides across exactly the palette a colour tool contains (producer relay) ⟵ NEW

glass-ui's header promises: *"The filter `seed` is per-instance off `hashString(color + seed)` so
each dot's wet edge is uniquely displaced (**no twelve-clones**)."* The implementation
(`dist/prng-2uS6J_A1.js`) is djb2 —

```js
function t(e){ let t = 5381; for (let n = 0; n < e.length; n++) t = (t<<5)+t+e.charCodeAt(n)|0; return t>>>0; }
```

— and `WatercolorDot` truncates it with `% 256`. Because `33^8 ≡ 1 (mod 256)`, the low byte
depends only on character values weighted by position mod 8, so channel-permuted colour strings
collapse to one value:

```
rgb(255 0 0)     527826861    %256 = 173
rgb(0 255 0)     4041908397   %256 = 173
rgb(0 0 255)     3938648493   %256 = 173
rgb(255 255 0)   3676147897   %256 = 185
rgb(0 255 255)   3591819961   %256 = 185
rgb(255 0 255)   3572887993   %256 = 185
#ff0000          2134180884   %256 =  20
#00ff00          4253796628   %256 =  20
```

**Observed live in one rendered row** (`probe/probe-P4-c.mjs`, four saved colours):
`turbSeed` = `173`, `173`, `173`, `185` for red / green / blue / yellow. Three swatches, one
displacement field — the twelve-clones failure the doc names, on the most ordinary palette a
colour tool will ever hold. (The `borderRadius` values still differ, because those consume the
full 32-bit hash; only the filter seed is truncated.)

This is a **producer defect surfaced by this consumer** and therefore a BH-inbox relay under the
standing glass-ui relay edict — not a demo-side patch. **Cure**: seed the filter with
`hashString(...) >>> 0` mixed down by a bit-mixer (e.g. `(h ^ (h>>>16)) & 0xff`), or widen the
attribute domain. Do not fix it in `demo/`.

---

## MAJOR C4-4 — one gesture, three identity predicates, two contradictory insertion orders ⟵ NEW

Pressing "add current colour" traverses three functions that each decide *"is this colour already
here?"* differently and *"where does it go?"* differently:

| # | site | identity predicate | placement |
|---|---|---|---|
| 1 | `useSwatchActions.ts:63-73` | `savedColorStrings.indexOf(cssColorOpaque)` — raw display-string equality | hit & `length>1` → **move to END**; hit & `length===1` → **silent no-op**; miss → `emit("addColor")` |
| 2 | `usePaletteWiring.ts:84-100` | `serializePickerColor(c) === serializePickerColor(parsePickerColor(css))` | hit → **move to FRONT** (`unshift`); miss → **`unshift` to FRONT** |
| 3 | `useColorPipeline.ts:212-224` (fallback via `whenColorPickerReady`) | `toCSSColorString(c) === toCSSColorString(model.value.color)` | miss → **`push` to END** |

Consequences, all readable from the source:

- **Contradictory ordering for one gesture.** A colour not yet present lands at the **front**
  (site 2). The *same* colour, added again, is moved to the **back** (site 1). The row therefore
  jumps in opposite directions on two consecutive identical clicks.
- **Site 1's whole existence branch is dead in practice.** `savedColorStrings` serialises each
  saved colour *in its own space* (`useColorPipeline.ts:166-168`); `cssColorOpaque` serialises the
  live colour in the *current* space (`:104`). After any space switch the strings differ for the
  same physical colour, `indexOf` returns `-1`, and control always falls through to `emit`.
- **Site 3 tests the wrong value.** `alreadyExists` compares saved colours against
  `model.value.color` — the **live** colour — not against its own `cssColor` argument. Calling
  `onPaletteAddColor(X)` while the live colour is already saved refuses to add `X`.
- **Site 1's `length === 1` branch is a silent no-op** with no feedback of any kind.

**Reproduction — NONE for the ordering flip end-to-end** (C-1 makes the control unclickable, so the
gesture cannot be issued through the UI at all). This is a **source-derived finding**, verified by
reading all three sites; it becomes live the moment C-1 is cured. The dead-branch and wrong-value
legs are pure code facts at the cited lines.

**Cure.** One canonical colour identity exported from the pipeline, used by all three; one
insertion policy stated once. Sites 1 and 3 should not exist — the component should emit intent
and the pipeline should own the set semantics.

---

## MAJOR C-4 / C-5 — two phantom classes (re-measured)

Walking every rule of every live `document.styleSheets` (`probe/probe-P4-a.mjs`):

```json
"rulesFor": { "btn-interactive": { "count": 0, "sample": [] },
              "floating-panel":  { "count": 0, "sample": [] },
              "add-slot-ghost":  { "count": 1, "sample": [".add-slot-ghost[data-v-0ce6f2b0]"] },
              "edit-overlay":    { "count": 1 }, "dashed-well": { "count": 1 },
              "swatch-row":      { "count": 4 } }
```

```
$ grep -rn "btn-interactive\|floating-panel" --include="*.css" demo/ node_modules/@mkbabb/glass-ui/
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)   ← a comment
```

- **C-4** `SwatchHoverMenu.vue:42` teleports the action panel to `body` with `class="floating-panel"`
  and inline `top`/`left`. With no `position` rule the inline offsets are inert: the panel lays out
  in normal flow at the end of `<body>`, transparent and unlayered. `useHoverPopover.ts:20-24`
  additionally computes those coordinates **once**, with no `scroll`/`resize` listener and no
  viewport clamp, so even a restored `position: fixed` would detach on the first scroll of
  `.pane-scroll-fade`.
- **C-5** `CurrentPaletteEditor.vue:68-74` narrates retiring per-site hover/press utilities onto
  *"the producer's `btn-interactive` atom … press/hover magnitudes **+ the house focus register**
  come with it."* The class resolves to zero rules at eight `.vue` sites. `demo/DESIGN.md:247`
  records the row as **"landed"**. The net effect is standing-edict 6 (*animations are never
  deleted, only moved*) executed as a move to nowhere, and three buttons — Save edit, Cancel edit,
  the add slot — left with no hover, no press and **no focus ring**.

**Cure — one decision, not eight patches.** Either glass-ui ships `.btn-interactive` (a producer
relay, consumer already correct) or the class is retired from all eight demo sites. Ship the
20-line "every template class resolves to ≥1 CSS rule" walk from `probe-P4-a.mjs` as a gate; it
kills C-4 and C-5 as a family and would have caught the `.dashed-well` `inv-N-7` ancestor
`demo/styles/utils.css:86` records having already been fixed once.

---

## MAJOR C-7 / C-8 — nameless Save button, silent refusal (re-measured)

`CurrentPaletteEditor.vue:134-142` — `<Button variant="outline" icon-only …><Check/></Button>`: no
`aria-label`, no `title`, no text, while **every other** icon-only button in the file has one
(`:46`, `:49`, `:52`, `:75`, `:78`, `:101`). Measured in the populated state
(`probe/probe-P4-e.mjs`):

```json
"nameless": [ { "path": "div.grid.gap-3 > div.dashed-well > div.flex.items-center > button.button.tap-squish",
                "w": 32, "h": 40 } ]
```

The repo already knows: `e2e/smoke/flows/palette-save.spec.ts:40-41` documents *"the icon-only Save
button next to the Input lacks an aria-label"* — and routes **around** it rather than failing on
it. A spec that narrates a defect in prose has stopped being a gate.

The adjacent `<Input>` is nameless in the meaningful sense too: `ariaLabel: null, title: null`, its
only accessible name coming from `placeholder: "Palette 1"` — which is a *value suggestion*, not a
label, and disappears the moment the user types (WCAG 3.3.2).

**C-8**: the duplicate refusal is invisible to AT — measured `{"bannerFound": true,
"liveAncestor": null, "focused": "BODY"}` (`probe/probe-P4-d.mjs`). Walking from the "already
exists" message to `<body>` finds no `aria-live`, no `role="status"`, no `role="alert"`, and focus
does not move to the `Update` decision. To a screen-reader user, pressing Save does nothing.
(The one live region in the well is `ApiOfflineChip`'s `role="alert"` — unrelated, and mounted
under `v-if="savedColorStrings.length > 0"`, so it re-announces assertively the first time a colour
is added.)

**Cure** — `aria-label="Save current palette"`; a real `<label>`/`aria-label` on the field;
`role="status"` on the confirmation row plus focus to `Update`.

---

## MAJOR C-9 — `swatchKeys` are index-derived (re-derived)

`useSwatchActions.ts:43-59`: the map key is `` `${color}::${i}` `` — **the index is inside the
identity**, so the memo can never survive a shift. Faithful re-execution of exactly those lines:

```
$ node -e '<verbatim re-implementation of useSwatchActions.ts:43-59>'
initial       ["#f00","#0f0","#00f","#ff0"] -> [ 0, 1, 2, 3 ]
after remove0 ["#0f0","#00f","#ff0"]        -> [ 4, 5, 6 ]
initial       ["#f00","#0f0","#00f"]        -> [ 0, 1, 2 ]
after moveEnd ["#0f0","#00f","#f00"]        -> [ 3, 4, 5 ]
```

Removing the first of four re-mints **all three** survivors; the move-to-end reorder
(`:64-68`) re-mints **all three**. `<TransitionGroup name="vj-enter">` therefore never observes a
*move* — it observes a total teardown and remount, so the `.swatch-row > *` FLIP transitions never
play and every survivor replays the enter animation. Each remount also re-seeds `mulberry32` and
mints a fresh namespaced `feTurbulence numOctaves="5"` filter (C4-2's cost, N× per single edit).
The pre-flush prune at `:54-59` cannot save it: it deletes precisely the entries whose index moved.

Secondary: `swatchKeys` is a `computed` that **mutates** a non-reactive `Map` and increments a
module-scoped counter — a side-effecting computed, which Vue makes no ordering guarantees about.

**Cure** — identity must not contain position. Mint an id where saved colours are inserted
(`useColorPipeline.ts:212-224`) and key the `v-for` on it. That deletes `swatchKeys`, the `Map`,
the counter and the prune watcher.

---

## MINOR C-12 — `useLeaveTimer` leaks its pending timeout across unmount

```
$ grep -rn "onScopeDispose\|onUnmounted" demo/palettes/browser/card/composables/
(no output)
```

`useLeaveTimer.ts:1-17` holds a closure-local `setTimeout` handle with no disposal;
`useHoverPopover.ts:33-36` schedules a 250 ms close on `onLeave`. Navigating away inside that
window fires the callback against a disposed scope.

**Reproduction — NONE. Hypothesis by inspection**; the callback writes a ref nobody reads after
teardown, so there is no observable symptom. It is still an unowned timer in a composable that
advertises itself as shared. **Cure** — `onScopeDispose(cancel)`, or delete the composable under
C-4's collapse onto `Popover`.

---

## MINOR C4-5 — correction: pass 3 mis-attributed the visual REPORT's nameless button, and the audit never reaches this component's defective state ⟵ NEW

Pass 3 (§C-7) asserts the component *"is the component's contribution to
`audit/visual/REPORT.md:97` (`safari-desktop-light /#/palettes: 1` nameless button)."* **That is
not supportable, and I measured why.** The Save row is `v-if="savedColorStrings.length > 0"`
(`:117-118`); the visual matrix boots cold with an empty buffer, so the Save button is not in the
DOM at capture time. Measured, both states, same route, same viewport (`probe/probe-P4-e.mjs`):

```json
"coldBoot":  { "buttonsVisible": 21, "nameless": [], "smallInEditor": [],
               "wellText": "Start a new palette" },
"populated": { "buttonsVisible": 22,
               "nameless": [ { "path": "…div.dashed-well > div.flex.items-center > button.button.tap-squish",
                               "w": 32, "h": 40 } ],
               "wellText": "Current Palette | 3 colors | …" }
```

Corroborating from the audit's own data: `REPORT.json`'s `/#/palettes` `smallTapTargets` are the
slug bar (`Switch to slug`, `Generate new slug`, `Cancel`, 22×22) and four channel-rail spans
(12×24) — **none from this component** — and its single nameless button belongs to a control that
is present at cold boot. `STATES.json` / `states.mjs` contain no `savedColors`, `dashed-well` or
`CurrentPalette` seeding.

**The finding is the coverage gap, not the count.** This component's a11y surface —
1 nameless Save button, 12 unlabelled-in-practice swatch action buttons, the nameless name field,
the `aria-hidden`-wrapped focusables — exists **only** in a populated state that the 60-capture
matrix never enters, so a green a11y row on `/#/palettes` is uninformative about it.

**Cure** — add a `color-picker`-seeded variant of `/#/palettes` (three saved colours) to the
capture matrix. One `addInitScript` line; it converts four of this component's findings from
"invisible" to "measured on every run".

---

## BLOCKER C-16 (gate) — test truth, re-measured

| gate | status at HEAD | why it cannot see C-1 … C4-4 |
|---|---|---|
| `vitest` | GREEN | `vitest.config.ts:21` includes `["test/**/*.ts","demo/test/**/*.ts"]`. `grep -rln "CurrentPaletteEditor\|useSwatchActions\|swatchKeys\|duplicateTarget\|saveCurrentPalette\|useHoverPopover\|useLeaveTimer" demo/test test` → **0 files**. No test of this component or any of its three composables exists. |
| `vue-tsc` | exit 0 | Unknown props (`tag`), extra attrs (`aria-label`) and listeners (`@click`) are legal fall-through; default-slot content against a `{}`-slots component is not an error. The C-1/C-2 family is invisible **by construction**. |
| `.github/workflows/*.yml` | GREEN | `grep -rn "playwright\|e2e" .github/workflows/*.yml` → **no hits**. Playwright is never invoked in CI. |
| `e2e/…/palette-save.spec.ts` | **RED** (run above) | fails at `:37` on C-1 — and nothing runs it. |

**The exact mutation that keeps every gate green is: the shipped code.** That is the definition of
a vacuous gate.

**Cure.** (1) Wire the existing smoke suite into `ci.yml` as a **hard** step — it catches C-1 today
with zero new assertions. (2) Add a mount-level vitest asserting the three role queries this flow
depends on (`Add current color…`, `Save current palette`, per-swatch `Color swatch…`); each fails
on HEAD. (3) Ship the stylesheet-resolution walk (kills C-4 + C-5 as a family). (4) Add the
populated `/#/palettes` matrix row (C4-5). (5) Assert `ghostRadius === swatchRadius` for a colour
present in both slots — a two-line test that kills C4-1 permanently.

---

## Checked and clean (the negative, proved)

- **`defineModel` stale-read hazard** — absent. `defineProps` + `defineEmits` only; `defineModel`
  appears nowhere in the file. `currentPaletteName` is a plain local `ref` (`:240`). The Vue 3.5
  reactive props destructure (`:196-202`) and the two `toRef(() => …)` getters (`:234-235`) are
  correct and preserve reactivity into the composable.
- **PRM-RAF epidemic** — no `requestAnimationFrame` in the component or its three composables.
  `WatercolorDot` is mounted **without** `animate` at all four sites, so the producer's
  `useRAFLoop` branch is never taken (verified in `dist/watercolor-dot.js`: the rAF path is behind
  `if (!animate) return` and carries `pauseWhenHidden: true, respectReducedMotion: true`). C4-2's
  cost is a `watch`, not a rAF loop.
- **`ValueUnit` nesting accumulation** — the component never touches `ValueUnit`; it handles
  pre-serialised CSS strings only.
- **oklch→HSV hue drift / `stableHue`** — no hue math on this path.
- **reka-ui slider pointer-capture leak** — no sliders in this subtree.
- **WebGL / context loss** — none here. The one console error in the whole matrix
  (`REPORT.md:17`, `safari-desktop-light /#/`: *WebGL: context lost*) is on the picker route.
- **`parseCssColor` crash class** — the component performs **no parsing**. Colours arrive as
  strings and are interpolated into `aria-label` and `background-color` only. The empty collection
  (`:248`), the whitespace-only name (`:249-250`, `.trim() ||` default) and `id == null`
  (`:270-271`) are all guarded. `/#/palettes` reports `pageErr 0, consoleErr 0` in all four Safari
  matrices (`REPORT.md:120,135,150,165`); the only error in my probes is the environmental
  `VITE_API_URL` dev-config notice.
- **`e.currentTarget` inside `nextTick`** (`useHoverPopover.ts:30`) — a plausible null-deref, but
  **not a defect in practice**: `nextTick` resolves on a microtask inside the same dispatch, and the
  panel's inline style measured non-zero (`top: 336.719px; left: 791px` in the pass-3 record;
  `positionPanel` ran without throwing and produced no console error in any of my five probes).
  Reported as clean.
- **Horizontal overflow** — `overflowX = 0` on `/#/palettes` in all four matrices; the `flex-wrap`
  swatch row is correct.
- **`verbatimModuleSyntax`** — satisfied. `:190` correctly uses `import type` for
  `Palette`/`PaletteColor`; no other type-only import exists. (`:172`'s `TransitionGroup` import is
  needless — built-ins are resolved by the SFC compiler — and asymmetric, since `Transition` at
  `:57` is not imported. INFO only.)
- **`useBreakpoint` subscription** — glass-ui `dist/dom.js` registers `onScopeDispose`; not leaked.
- **`useLeaveTimer.schedule` cancels before re-arming** (`:5`), so rapid hover in/out cannot stack
  timers; only the unmount case (C-12) is unhandled.
- **Mobile edit-commit is not a hole.** `.edit-overlay`'s `hidden lg:flex` (`:58`) looked like a
  missing affordance below 1024 px, but `demo/shell/dock/Dock.vue` provides labelled
  `Save edit` / `Cancel edit` dock controls on the same emits. Duplicated affordance, not a gap.
- **The store layer is honest.** `usePaletteStore.ts` is one lazy module singleton with a defensive
  `serializer.read` (try / `JSON.parse` / version check) and a type-predicate narrowing of `id`.
  Every corruption in C-3/C-10 originates above it.
- **`writeClipboard` is correctly `void`-ed** (`useSwatchActions.ts:87`); no unhandled rejection.

---

## Defect families (for the ledger)

| family | findings | one cure |
|---|---|---|
| **F-a · producer-API drift, typecheck-invisible** | C-1, C-2 | the interactive element owns semantics, `WatercolorDot` owns paint; role-query assertions so it cannot recur silently |
| **F-b · phantom CSS class** | C-4, C-5 | "every template class resolves to ≥1 rule" walk (20 lines, written) |
| **F-c · latched state that outlives its premise** | C-3 | derive, do not latch |
| **F-d · lossy / positional projection at a layer boundary** | C-9, C-10 | carry identity + metadata on the model; never re-derive from position or a display string |
| **F-e · duplicated interaction paths** | C-2, C-4, C-6 | one `Popover`; delete `useHoverPopover` + `useLeaveTimer` + the `canHover` fork |
| **F-f · per-instance override of a root register** | C-5, C-13 | design-system `Button`; never `focus-visible:outline-none` |
| **F-g · NEW · a comment asserting an invariant the arguments break** | **C4-1** | the seed *is* the identity — one seed per colour, or none |
| **F-h · NEW · hot-signal consumption bypassing the repo's own coalescer** | **C4-2** | consume `cssColorOpaqueFrame`; never make a filter graph a function of a 60 Hz signal |
| **F-i · NEW · truncated hash defeats a per-instance-uniqueness promise** | **C4-3** | producer relay to glass-ui BH; mix before truncating |
| **F-j · NEW · N predicates + M orders for one gesture** | **C4-4** | one canonical identity + one insertion policy, owned by the pipeline |
| **F-k · NEW · the audit never enters the state that contains the defects** | **C4-5** | seed the capture matrix |

## Convergence + delta against the prior passes

| prior finding | this pass |
|---|---|
| pass-1/2/3 C-1 (add control inert) | **independently reproduced** — my own DOM dump, `addButtonsByRole: 0`, plus my own RED Playwright run |
| pass-1/2/3 C-2 (swatches inert) | **independently reproduced**; extended with the measured dead `TooltipTrigger` (`tooltipRoleNodes: 0`) |
| pass-2/3 (phantom `.floating-panel`, `.btn-interactive`) | **independently reproduced** via my own stylesheet walk (`count: 0` both) |
| pass-2 (Update writes `colors: []`) / pass-3 C-3 (wrong-target overwrite) | **reproduced, and unified with C-10** — one store diff shows the wrong target, the destroyed `name`/`weight`, and the discarded typed name together |
| pass-2/3 C-9 (`swatchKeys`) | reproduced by deterministic re-execution |
| pass-2/3 (nameless save, silent refusal) | reproduced with fresh DOM measurements |
| pass-3 C-16 (vacuous gates) | reproduced with my own greps + my own RED run |
| pass-3 C-7's REPORT attribution | **CORRECTED — see C4-5.** The nameless button counted on `/#/palettes` is not this component's; the component's is invisible to the matrix |
| — | **NEW C4-1** silhouette identity broken by the `seed` props (offline PRNG + live DOM agree digit-for-digit) |
| — | **NEW C4-2** per-colour-change silhouette + `feTurbulence` re-seed on the uncoalesced signal (34 / 17 / 7 / 11 measured) |
| — | **NEW C4-3** `hashString % 256` collides R/G/B → seed 173 (producer relay) |
| — | **NEW C4-4** three identity predicates, two insertion orders, one gesture |
| pass-2 C-5 (stale `colorIndex` phantom duplicate), C-7 (default-name collision), C-12 (202 mutation records), C-13 (`role=alert` re-announce) | **not re-tested this pass**; carried forward from the preserved priors. I neither confirm nor dispute them here. |

## Strongest single defect

**C-1.** One command reproduces it, it is the entire reason the component exists, and it has
already turned the repository's own `palette-save` smoke spec **red on HEAD** without anyone
noticing — because CI runs no Playwright. Everything else in this report is a defect in a feature;
C-1 is the absence of the feature.
