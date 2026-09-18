# CHALLENGE-C · `demo/workbenches/generate/GeneratePane.vue` — implementation (r2, independent seat)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5 tier
this seat was spawned with. The declaration is explicit in my seat context, not inherited from a
parent. No seat-tier defect to report.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- Prompt named HEAD `c654824e`; the branch advanced under the running fleet to `e39da983` while I
  worked. Nothing under `demo/workbenches/generate/` moved between them — the fleet's commits are
  all `docs(V·mega)`.
- Writes confined to `docs/tranches/V/megatranche/audit/components/wb-generate-pane/`. **No source
  edits.** All browser probes drive the live dev server read-only and restore `localStorage` to its
  pre-probe bytes.

**This is r2.** A prior seat's report existed at this path (HEAD `9268f054`); I preserved it
verbatim as `challenge-C-implementation.seat-1-9268f054.md` and worked without reading its findings
until after my own probes had run. §Convergence at the end reconciles the two. Four of my findings
are new to this seat and one of them — C-7 — **upgrades the prior seat's most important call from a
hypothesis to a measured RED.**

---

## VERDICT — **DEFECTIVE**

Two blockers, seven majors. The strongest is not a bug in the 41-line pane; it is that the pane's
child renders 5–12 affordances whose verb **cannot fire**, whose accessible name is **dropped on
the floor**, and which are **`aria-hidden` from the accessibility tree** — because the glass-ui
6 → 7 upgrade contracted `WatercolorDot`'s API and no consumer was migrated. The generate plate is
one of thirteen sites in `demo/` still passing the retired `tag` prop.

Second: the palette name the user types is **destroyed** on every save. Third: the component's only
test is **deterministically failing** and Playwright **is not in CI at all**, so nothing here has
been guarded since the T-17 landing.

---

## The subject, whole

`GeneratePane.vue` is 41 lines and does four things: inject two ports, map `string[] → PaletteColor[]`,
call `createPalette`, and forward three verbs to its child. Three of those four are defective. The
audit therefore covers the pane, its child `GenerateControls.vue` (311 lines — where the pane's
verbs actually live), the composable `composables/useColorGeneration.ts`, and the pure core
`demo/color-session/generate-color.ts` that the composable wraps.

```
GeneratePane.vue (41)
├─ inject CSS_COLOR_KEY  ......................... dead (C-12)
├─ inject LIBRARY_PORT_KEY → pm.createPalette .... wrong port member (C-6), name dropped (C-1)
├─ ref="controlsRef" ............................. not the 3.5 idiom (C-13)
├─ defineExpose{regenerate,save,copyColors} ...... dead on mobile (C-4)
└─ GenerateControls.vue (311)
   ├─ useColorGeneration() ....................... clean
   ├─ WatercolorDot tag="button" @click .......... wholly inert (C-2)
   ├─ PaletteColorStrip .......................... aria-hidden (C-3)
   ├─ writeClipboard(...) result discarded ....... silent failure (C-5)
   ├─ value as PresetName ........................ unchecked cast → render throw (C-8)
   └─ Slider aria-label="Color count" ............ 12 px thumb (C-10), no capture recovery (C-14)
```

---

## C-1 · BLOCKER — the palette name the user types is destroyed on every save

`GenerateControls.vue:48-50` declares a two-argument emit and `:102-104` honours it:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
...
function save() { emit("save", [...palette.value], paletteName.value); }
```

`GeneratePane.vue:14-20` receives it with **arity 1** and hardcodes the name:

```ts
function onSave(colors: string[]) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors);   // ← line 19
}
```

The second emit argument is never bound. The plate's editable title
(`GenerateControls.vue:144-149`, `v-model="paletteName"`) is decoration.

### Reproduction (measured)

`probes/r2-a-dom-save-a11y.mjs` — type a distinct name, click the plate's Save, read the store:

```json
"typed": "AUDIT-PROBE-NAME-XYZ",
"savedPalettes": [ { "name": "Generated Palette", "slug": "generated-palette-56699fd5", "n": 5 } ]
```

### Why nothing catches it

TypeScript's function-parameter arity rule: a handler with *fewer* parameters is assignable to a
listener type with more. The repo's own gate agrees:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
EXIT:0
```

The `GenerateControls.vue:44-47` comment already booked this as owed — *"the save carries the
plate's own name … (The pane's `createPalette` name-wire is its owner's one-liner)"*. The one-liner
was never written; the comment has stood in for it since T.W6.

### Blast radius

`usePaletteStore.createPalette` (`usePaletteStore.ts:66-95`) derives `slug: createSlug(name)` from
the name and de-dupes on `(name.toLowerCase(), colorsMatch)`. A constant name means every generated
palette shares a slug stem and every save collides on the name half of the dedup key. The library
fills with rows distinguishable only by a hash suffix.

### Cure — transposition, not patch

Do not add `name` to `onSave`'s parameter list. Delete `onSave`. The port already owns this exact
operation: `usePaletteActions.ts:65-77` `onCurrentPaletteSaved(name, colors)` is on the library
port (`usePalettePorts.ts:151`) and is the path `PalettesPane.vue:49` already uses. Re-shape the
child's emit to that signature and the pane's handler becomes a wire:

```ts
// GenerateControls.vue — emit the port's own shape (stripColors already exists at :55-57)
const emit = defineEmits<{ save: [name: string, colors: PaletteColor[]] }>();
function save() { emit("save", paletteName.value, [...stripColors.value]); }
```
```vue
<!-- GeneratePane.vue -->
<GenerateControls ref="controlsRef" @save="pm.onCurrentPaletteSaved" />
```

That removes the duplicated `map`, removes the hardcoded name, and picks up the save feedback the
pane currently has none of (see C-6).

---

## C-2 · BLOCKER — every per-swatch copy verb is inert; the swatches are `aria-hidden`, unfocusable, non-hit-testable spans

`GenerateControls.vue:199-208`:

```vue
<WatercolorDot v-for="(css, i) in palette" :key="i" :color="css"
    tag="button" :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer active:scale-95 transition-transform focus-visible:outline-none"
    :aria-label="`Copy ${css}`" @click="copyColor(css)" />
```

The 8-line comment above it (`:188-197`) asserts *"the button stays the copy-verb seat
(`tag="button"`), the dot its organic face"*. **glass-ui 7.0.0's `WatercolorDot` has no `tag` prop.**

`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` declares
exactly `{ color, variant?, animate?, cycleDuration?, range?, seed? }`. The compiled component
(`dist/watercolor-dot.js`) sets `inheritAttrs: !1`, reads **only** `attrs.class` and `attrs.style`,
and returns a hardcoded root:

```js
inheritAttrs: !1,
setup(e) { let n = h(), c = i(() => n.class), f = i(() => n.style), …
  return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([c.value, "watercolor-swatch", …]),
    style: u([f.value, { backgroundColor: …, borderRadius: …, pointerEvents: "none", … }])
  }, …
```

So `tag`, `aria-label` and `onClick` are all discarded, `class` survives, and the component's own
`pointerEvents: "none"` is applied **after** the consumer's style so it always wins. There is also
no `renderSlot` anywhere in the file (`grep -c "renderSlot" dist/watercolor-dot.js` → `0`), so
default-slot children are dropped too.

### Reproduction (measured — `probes/r2-a-dom-save-a11y.mjs`)

```json
"swatchCount": 5,
"swatch": { "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null, "tagAttr": null,
            "role": null, "tabIndex": -1, "pointerEvents": "none", "cursor": "pointer",
            "attrs": ["data-v-292b9032","aria-hidden","class","data-testid","data-variant","style"],
            "rect": { "w": 40, "h": 40 } },
"swatchHitTest": "<DIV> px-3 pb-1 flex flex-wrap gap-1.5",
"swatchClickError": "TimeoutError: page.click: Timeout 2500ms exceeded. | waiting for locator('.generate-swatch') | locator resolved to 5 elements. Proceeding with the first one: <span … aria-hidden=\"true\" …>",
"tabOrder": ["INPUT:Palette name","BUTTON:Regenerate","BUTTON:Save palette","BUTTON:Copy all colors"]
```

- `elementFromPoint` at the swatch centre returns the **parent div**. The swatch is not hit-testable.
- A real Playwright click **times out** — the element never becomes actionable.
- The plate's tab order contains **zero** swatches.
- `cursor: pointer` and `active:scale-95` *do* apply (class survives). The component paints 5–12
  click affordances for a verb that cannot fire. That is a lie in the UI, not merely a gap.
- `copyColor()` (`GenerateControls.vue:110-113`) is unreachable dead code.

### Mechanism — a repo-wide glass 6 → 7 migration debt, not a local slip

`grep -rn "tag=" demo/` → 26 hits; the `WatercolorDot` share is 13 sites. Three carry interactive
intent and are therefore inert in the same way:

| site | passes | consequence |
|---|---|---|
| `demo/workbenches/generate/GenerateControls.vue:203` | `tag="button"` + `@click` + `aria-label` | this finding |
| `demo/workbenches/mix/MixSourceSelector.vue:168` | `tag="button"` (+ default slot, `:176` closes the tag) | same class; slot dropped too |
| `demo/workbenches/mix/MixSourceSelector.vue:215` | `tag="button"` | same class |

The remaining ten pass `tag="div"` and are harmless-but-dead (`Dock.vue:136,138,271`,
`EmptyState.vue:45-47`, `MixResultDisplay.vue:67,81,101`, `ImageEyedropper.vue:30`,
`ConsoleRail.vue:58`, `ColorSpaceSelector.vue:82`, `CurrentPaletteEditor.vue:62`).

### Cure — the seam belongs in glass-ui (edict 4), with a local unblock

Root: `WatercolorDot` is the ruled 9-consumer species and its consumers demonstrably need an
interactive seat. Ask glass-ui for a polymorphic root (`as`/`tag`) that, when it is not a `span`,
drops the internal `aria-hidden` and `pointer-events: none` and forwards attrs — i.e. restore the
seat the 7.0.0 contraction removed. Relay through the standing BH/BI inbox law.

Local, and correct even after the root lands (the dot is a *face*, not a *seat*): put the verb on a
real button and let the dot be its ornament.

```vue
<button v-for="(css, i) in palette" :key="i" type="button"
        class="generate-swatch focus-ring w-9 h-9 sm:w-10 sm:h-10 shrink-0 active:scale-95 transition-transform"
        :aria-label="`Copy ${css}`" @click="copyColor(css)">
    <WatercolorDot :color="css" :seed="`gen-${css}-${i}`" class="w-full h-full" />
</button>
```

Note this also restores the swatches to the visual audit's tap-target census, which they currently
escape (see C-10).

---

## C-3 · MAJOR — the pane's entire colour output is erased from the accessibility tree

Two `aria-hidden` layers stack:

- `demo/palettes/browser/card/PaletteColorStrip.vue:2-4` — `aria-hidden="true" role="presentation"`
  (annotated *"color strip is a decorative visual, hidden from AT"* — true for a card thumbnail,
  false when it is the plate's primary readout).
- Every `WatercolorDot` root carries `aria-hidden="true"` (C-2).

### Reproduction (measured — `probes/r2-c-clipboard-at-keyboard.mjs`)

Clone the plate, remove every `[aria-hidden=true]`, read what is left:

```json
"atView": { "visibleToAT": "5 Regenerate seed: 5ba89561" }
```

That is the whole accessible content of a component whose purpose is showing generated colours.
Not one colour is announced. `<section aria-label="Generated palette">` (`:129-132`) labels a
region with no content. Pressing Regenerate changes nothing a screen reader can perceive; the plate
has **zero** live regions (`"plate": { "liveRegions": 0 }`, same probe).

### Cure

The colour list is the plate's content, not its decoration. Give the swatch group a real accessible
structure once C-2 lands (a list of copy buttons, each named `Copy <css>`), and make the strip's
`aria-hidden` honestly redundant *because* the buttons below it carry the same information — which
is exactly the design the source comments describe and the runtime does not deliver.

---

## C-4 · MAJOR — the dock's Regenerate / Save palette / Copy colors are silent no-ops on mobile

`usePaneRouter.ts:196-198` dispatches the dock action bar onto the pane's exposed API:

```ts
{ key: "regenerate", …, handler: () => paneRefs.generate.value?.regenerate?.() },
{ key: "save",       …, handler: () => paneRefs.generate.value?.save?.() },
{ key: "copy",       …, handler: () => paneRefs.generate.value?.copyColors?.() },
```

`generatePaneRef` has exactly one writer — `App.vue:322-327 onDesktopLeftMount` — and that callback
is wired only to the **desktop** left `<PaneSlot>` (`App.vue:104 :on-mount="onDesktopLeftMount"`).
The **mobile** `<PaneSlot>` (`App.vue:83-92`) passes no `:on-mount` at all. On mobile
`paneRefs.generate.value` is permanently `null`, and the three `?.` chains swallow it.

### Reproduction (measured — `probes/r2-b-mobile-perf-boundary.mjs`, iPhone 14 context)

```json
"mobile": {
  "seedBefore":            "seed: 93eefeaa",
  "dockButtons":           ["Save edit","Cancel edit","Switch to slug","Generate new slug","Cancel",
                            "Back","Regenerate","Save palette","Copy colors","Select view",
                            "Toggle action bar","Generate","Palettes","Menu","Login","@mbabb"],
  "regenClick":            "clicked",
  "seedAfterDockRegen":    "seed: 93eefeaa",     ← unchanged
  "seedAfterPlateRegen":   "seed: 2d613b79"      ← the in-plate verb works
}
```

The dock offers all three verbs on mobile and all three do nothing. The in-plate control is the
control: it moved the seed on the same page, same load.

### Cure

The masking is the `?.` on the *method*. `paneRefs.generate.value?.regenerate()` (one optional chain
on the ref, none on the method) would have thrown the day the mobile slot shipped unwired. Fix the
wiring — pass `:on-mount` to the mobile slot with a handler that keys off `currentConfig.value`'s
mobile slot name — and drop the second `?.` everywhere in `usePaneRouter.ts:196-222` (the gradient
and mix rows have the identical shape and the identical exposure).

---

## C-5 · MAJOR — copy failures are swallowed; glass-ui 7 hands back a result the component throws away

glass-ui 7's `writeClipboard` is explicitly a *result*-returning primitive
(`dist/composables/dom/useClipboard.d.ts`):

> *"Stateless one-shot clipboard write — the honest primitive shared by `useClipboard` and by
> consumers that own their own feedback. Returns the discriminated result (`{ ok }` / `{ ok, reason }`)
> rather than a lossy boolean, for identical call ergonomics: `const { ok } = await writeClipboard(text)`."*

`GenerateControls.vue:106-113` discards it in both verbs:

```ts
async function copyColors() { await writeClipboard(palette.value.join(", ")); }
async function copyColor(css: string) { await writeClipboard(css); }
```

### Reproduction (measured — `probes/r2-c-clipboard-at-keyboard.mjs`)

`navigator.clipboard.writeText` monkey-patched to reject with `NotAllowedError` (the Safari /
insecure-context / permission-denied case), then the plate's **Copy all colors** clicked:

```json
"writeAttempts": 1,
"unhandledRejections": 0,
"ariaLiveBefore": ["dev misconfigured — run `npm run dev`", "· empty plate ·No saved palettes yet.…"],
"ariaLiveAfter":  ["dev misconfigured — run `npm run dev`", "· empty plate ·No saved palettes yet.…"]
```
```
console warning: [useClipboard] clipboard writeText rejected: NotAllowedError: denied
```

The library said "this failed" in two channels — a console warning **and** `{ok:false}` — and the
user was told nothing in either. The page's two live regions are byte-identical before and after and
neither belongs to this pane.

There is no success feedback either. A working copy is equally invisible.

### Cure

The app already owns the right shape: `App.vue:361` uses `useClipboard({ resetMs: 2000 })` and
derives `linkCopied` from `status`. Use the same composable for the plate's two copy verbs and let
the button carry its own confirmation state. Do not hand-roll a timer (that is the pattern Glass 7
retired).

---

## C-6 · MAJOR — Save reaches past the port's own action into the raw store, so the save is silent

`GeneratePane.vue:19` calls `pm.createPalette` — the **raw `usePaletteStore` writer** re-exported on
the library port (`usePalettePorts.ts:142`). The port also exposes the *action*
`onCurrentPaletteSaved` (`:151`), which is the same write plus one line that matters
(`usePaletteActions.ts:73-76`):

```ts
const palette = deps.createPalette(name, colors);
if (palette.id != null) expandedId.value = palette.id;   // ← the app's only save confirmation
```

Going around it means the Palettes pane does not expand the new row, and — with C-3's zero live
regions and C-5's zero copy feedback — **nothing at all happens on screen when the user saves.**
No announcement, no expansion, no state change visible in this pane.

This is also the edict-1 shape: two panes performing the same domain operation, one through the
action and one through the store. `PalettesPane.vue:49` does it correctly.

Cure: folded into C-1's transposition — `@save="pm.onCurrentPaletteSaved"`.

---

## C-7 · MAJOR — the component's only test is **deterministically failing**, and Playwright is not in CI

The prior seat called this gate vacuous. It is worse than vacuous: **it is red and nobody knows.**

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o20-generate-plate.spec.ts --reporter=line
  1 failed
    [smoke] › o20-generate-plate.spec.ts:63:5 › T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields
  1 passed
```

Two independent runs, two identical failures (different seeds, same shape):

```
- Expected (data-stops)                                          + Received (getComputedStyle)
- "oklch(91.103090821765% 0.046221964117 83.517225617543deg)"    + "oklch(0.911031 0.046222 83.5172)"
- "oklch(80.404966290109% 0.091578342426 221.024989667581deg)"   + "oklch(0.80405 0.0915783 221.025)"
```

The assertion (`o20-generate-plate.spec.ts:98-105`) compares the raw `generatePalette` output
stamped on `data-stops` against `getComputedStyle(el).backgroundColor`, which **re-serializes**.
The spec's own comment says *"byte-identical **rgb()** strings"* — `generatedCss`
(`generate-color.ts:235-243`) has not produced `rgb()`; it serializes in OKLCh. The oracle was
written against an earlier serialization and has been asserting across a serialization boundary
ever since.

### And it never surfaces

```
$ grep -n "run:" .github/workflows/ci.yml
33:  - run: npm run lint
34:  - run: npx vue-tsc -p tsconfig.lib.json --noEmit
35:  - run: npx vue-tsc -p tsconfig.demo.json --noEmit
36:  - run: npm run build
37:  - run: npm test                       # vitest
50:  - run: node scripts/ci/verify-packed-surface.mjs …
```

`npx playwright test` appears **nowhere** in `.github/workflows/`. The e2e suite is not gated.

### Vacuity of the leg that does pass

`grep -rln "GeneratePane\|GenerateControls\|useColorGeneration\|generatePalette" test/` → **no
matches.** There are zero unit tests. The only passing leg is o20 test #1, a locator-containment
assert. Mutations that keep the entire repo green (`npm run lint`, both `vue-tsc`, `npm test`, and
o20 test #1):

1. `GeneratePane.vue:19` → `pm.createPalette("literally anything", paletteColors)` — C-1 is already
   this mutation, shipped.
2. Delete `tag="button"`, `@click`, and `:aria-label` from `GenerateControls.vue:199-208` — they are
   already inert (C-2); the DOM is byte-identical.
3. Delete `GeneratePane.vue:10` (`cssColorOpaque`) — nothing reads it (C-12).
4. Delete `App.vue:104`'s `:on-mount` — desktop dock verbs join mobile's in silence (C-4); no test
   clicks a dock action verb for this pane.
5. Discard the `CopyResult` (C-5) — already the shipped code.

### Cure

Two separable repairs. (a) Make o20 test #2 compare *colours*, not strings — resolve both sides
through one serializer (the app's own `colorToCss`) or compare parsed components with a tolerance;
a string equality across `data-stops` ↔ computed style cannot be made true. (b) Add a
`smoke`-project step to `ci.yml` — an oracle that no runner executes is a comment.

Then add the vitest legs that would actually have caught C-1 and C-2: mount `GeneratePane`, emit
`save` with a name, assert `createPalette` saw it; mount `GenerateControls`, assert the swatch is a
`button` with an accessible name and that clicking it calls `writeClipboard`.

---

## C-8 · MAJOR — unchecked casts at the Select seam, whose failure mode is a render throw

`GenerateControls.vue:75-81`:

```ts
function onPresetChange(value: AcceptableValue)  { preset.value  = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

reka-ui's `AcceptableValue` is `string | number | boolean | Record<string, any> | null`. The `as`
erases the check entirely, and the value lands in a ref that the *render-critical* computed reads
(`useColorGeneration.ts:26-28`). `generatePalette` does not defend:

```ts
const p = GENERATION_PRESETS[preset];       // generate-color.ts:220 — undefined for a bad key
…
const l = p.l[0] + rng() * (p.l[1] - p.l[0]);
```

**Measured** (`probes/r2-b-mobile-perf-boundary.mjs`, boundary sweep):

```json
{ "label": "bad preset name", "ok": false,
  "err": "TypeError: Cannot read properties of undefined (reading 'l')" }
{ "label": "bad harmony name", "ok": true, "out": { "len": 0 } }
```

A bad preset throws **inside a computed consumed by render** → the pane unmounts into `ErrorBoundary`.
A bad harmony silently returns `[]` → an empty plate, no error.

**Reachability from the live Select is a HYPOTHESIS** — I did not reproduce a `null`/`""` emit from
reka-ui's `SelectRoot`. The defect I am asserting is the cast itself: a `PresetName`-typed ref that
is not a `PresetName`, guarding a function that dereferences the lookup unconditionally.

Cure: narrow at the seam, do not cast.

```ts
const isPreset = (v: unknown): v is PresetName => PRESET_NAMES.includes(v as PresetName);
function onPresetChange(value: AcceptableValue) { if (isPreset(value)) preset.value = value; }
```

---

## C-9 · MAJOR — generated colours are unrounded 15-significant-digit strings; they reach the clipboard and localStorage

`generate-color.ts:235-243` serializes with no rounding. Measured clipboard payload for a **count-5**
"Copy all colors" (`probes/r2-c-clipboard-at-keyboard.mjs`):

```
oklch(65.524221608648% 0.131932607486 230.90389332734deg), oklch(71.749844222795% 0.183381911378 8.411657377378deg), oklch(75.124292274704% 0.230062893947 145.919421427416deg), oklch(62.031143299537% 0.212577278715 283.427185477454deg), oklch(56.588953268947% 0.131517988107 60.934949527492deg)
```
```json
"payloadLen": 294
```

294 characters for five colours; ~700 at the slider's max of 12. Every `PaletteColor.css` written to
`localStorage["color-palettes"]` carries the same. The user is handed twelve significant digits of a
value whose input was a random number — the precision is noise, and it is the same noise that makes
C-7's oracle unfixable-as-written.

Cure: round in `generatedCss` before serializing (3 decimals on L%, 4 on C, 2 on H is well inside
1 JND), or pass a precision option through `serializeCssColor`. One site in the shared core, not a
per-consumer format.

---

## C-10 · MINOR — the count slider thumb is 12 CSS px wide; and the swatches escape the tap-target audit entirely

Measured (`probes/r2-a-dom-save-a11y.mjs`):

```json
"sliderThumb": { "tag": "SPAN", "w": 12, "h": 24, "aria": "Color count", "valuenow": "5" }
```

This is **exactly and only** this component's contribution to the visual audit. `REPORT.json` rows
for `/#/generate` list 5 `smallTapTargets` per matrix; four are the dock login capsule
(`Switch to slug` / `Generate new slug` / `Cancel`, 22×22) and its 160×23 unnamed slug input. The
fifth is ours:

```json
{ "w": 12, "h": 24, "tag": "span", "label": "Color count" }   // desktop-light and desktop-dark
{ "w": 12, "h": 44, "tag": "span", "label": "Color count" }   // mobile-light and mobile-dark
```

WCAG 2.5.8 (AA) requires 24×24. Width 12 fails on every matrix.

**The undercount matters more than the row.** The audit probe's interactive selector
(`visual/capture.mjs:89-91`) is
`a,button,input,select,textarea,[role="button"],[role="link"],[role="tab"],[role="switch"],[role="slider"],[tabindex]:not([tabindex="-1"])`.
The 5–12 swatches are `<span>`s with no role and `tabIndex: -1` (C-2), so the probe never sees them.
On mobile they measure **36×36** — they would pass — but the point stands: a component can hide its
affordances from this audit simply by failing to make them affordances. Worth carrying into the
audit harness as a cross-check, not just into this component's ledger.

Cure is root-level (edicts 4 + 5): the thumb's hit area belongs in glass-ui's `Slider`, expanded via
a pseudo-element so the visual 12 px rail is preserved. Not a per-instance class here — note
`GenerateControls.vue:305` already carries one per-instance override
(`:style="{ '--slider-track-bg': 'transparent' }"`) standing in for a glass-ui variant.

---

## C-11 · MINOR — the plate title's editability is hover-only, and its focus ring re-implements a root primitive

Measured (`probes/r2-d-title-affordance-slider.mjs`) on
`input[aria-label="Palette name"]` (`GenerateControls.vue:144-149`):

```json
"rest":    { "boxShadow": "none", "border": "0px", "bg": "rgba(0, 0, 0, 0)",
             "textDecoration": "none", "cursor": "text" },
"hovered": { "textDecoration": "underline" },
"focused": { "matchesFocusVisible": true,
             "boxShadow": "… rgb(28, 25, 23) 0px 0px 0px 2px …" }
```

At rest the field has no border, no background, no underline — it renders as a heading, which is
exactly how it reads in `shots/safari-desktop-light/generate.png` ("Generated Palette", display face,
no field chrome). The only affordance is `hover:underline`, which **touch never produces**. On
mobile — the matrix where the plate is the whole screen — the title is undiscoverable. (With C-1
live it is also inconsequential, which is presumably why nobody noticed.)

Two edict-5 violations in the same class attribute:
- The ring is hand-rolled (`focus-visible:ring-2 focus-visible:ring-ring/40`) where the sibling
  buttons use glass-ui's root class — measured on the Copy button:
  `class="button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover shrink-0"`.
- And the hand-rolled ring does not render as written: the measured colour is `rgb(28, 25, 23)` —
  fully opaque, not the requested `/40` alpha.

Cure: use the root `focus-ring`; give the field a rest-state affordance that survives no-hover
(a dotted underline at rest, or the card family's existing rename control).

---

## C-12 · MINOR — `cssColorOpaque` is a dead injection with a masking assertion

`GeneratePane.vue:7,10`:

```ts
import { CSS_COLOR_KEY } from "../../color-session/keys";
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
```

`grep -c cssColorOpaque demo/workbenches/generate/GeneratePane.vue` → **1**. Declared, never read,
in script or template. It survives `noUnusedLocals` because `<script setup>` bindings are
template-visible by construction.

Two costs: it declares a dependency on `CSS_COLOR_KEY` that the pane does not have (an untrue edge
in the provide/inject graph), and the `!` means that if the provider ever moves, the pane silently
binds `undefined` instead of failing. Delete both lines.

---

## C-13 · MINOR — not the Vue 3.5 idiom, and the masking `?.` that hid C-4

`GeneratePane.vue:12,22-26`:

```ts
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);
…
defineExpose({
    regenerate: () => controlsRef.value?.regenerate?.(),
    save:       () => controlsRef.value?.save?.(),
    copyColors: () => controlsRef.value?.copyColors?.(),
});
```

The house idiom is `useTemplateRef` — already used at `ImageDropZone.vue:78`,
`ExtractWorkbench.vue:223`, `App.vue:161`. (`GradientPane.vue:9` and `ExtractWorkbench.vue:222`
share this component's older shape; the family should move together.)

The second `?.` on each method is the substantive half. `GenerateControls` *does* expose all three
(`GenerateControls.vue:115`); the optional call can only ever mask a wiring break — which is
precisely the break C-4 documents, one level up in `usePaneRouter.ts`. Edict 2 (no masking
fallbacks) applies to `?.()` as much as to `|| default`.

---

## C-14 · INFO (HYPOTHESIS) — the count slider has no reka-ui pointer-capture recovery, and neither does the glass-ui root

The repo's record names reka-ui slider pointer-capture leaks as a live iOS Safari hazard and carries
a cure: `demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts`
(*"leak recovery (`pointercancel`/`lostpointercapture`)"*). `GenerateControls.vue:297-307` has none.

```
$ grep -c "pointercancel\|lostpointercapture" node_modules/@mkbabb/glass-ui/dist/slider.js
0
$ grep -c "pointercancel\|lostpointercapture" node_modules/@mkbabb/glass-ui/dist/glass-ui.js
0
$ grep -rn "lostpointercapture\|pointercancel" demo/ | grep -v node_modules | wc -l
8          # all in gradient / eyedropper / picker — none in workbenches/generate
```

**HYPOTHESIS — no reproduction.** I did not attempt a touch-capture leak on this slider. The finding
is the asymmetry: the cure exists per-consumer in the picker and is absent from both the glass-ui
root and this consumer. If the hazard is real it belongs in glass-ui's `Slider` (edict 4), and
`useSliderTouchGates` should dissolve into it.

---

## C-15 · INFO (HYPOTHESIS on reachability) — domain boundaries degrade silently

Measured sweep against the live module (`probes/r2-b-mobile-perf-boundary.mjs`):

| input | result |
|---|---|
| `count = 0` | `[]` — no throw |
| `count = -3` | `[]` |
| `count = NaN` | `[]` |
| `count = 1`, harmony `analogous` | 1 colour (the `count > 1 ? … : 0` guard at `generate-color.ts:110` holds) |
| `seed = NaN` | identical palette to `seed = 0` |
| `seed = 2**53` | identical palette to `seed = 0` |
| `seed = -1` | distinct palette |
| `seed = undefined` | `Math.random` path, non-reproducible |

The seed collapse is `mulberry32` (`demo/color-session/prng.ts:3` `seed |= 0`): `NaN|0 === 0` and
`2**53|0 === 0`. Harmless today — `useColorGeneration.ts:24,31` seeds from
`Math.floor(Math.random() * 0xffffffff)`, inside int32-coercible range — but it means the plate's
bench-note hex is only meaningful modulo 2³², and a future non-int seed would silently alias.

The empty-array cases are not reachable through the UI (`:min="1"` at `GenerateControls.vue:301`).
If they were, `stripColors`, `countSliderGradient` (`:65-73`, returns `var(--muted)`) and the swatch
`v-for` all degrade quietly rather than refusing. **Reachability is a hypothesis.**

---

## What is NOT defective — the negative proofs

These were hunted and cleared, so the positives above are load-bearing.

- **No ungated rAF.** The PRM-RAF epidemic does not touch this component. `useColorGeneration` has
  no loop. `WatercolorDot`'s `animate` defaults `false` and the compiled composable *returns before*
  constructing the rAF driver in that branch (`dist/watercolor-dot.js`: `if (…, !a) return …`), so
  no loop is ever started for these 5–12 dots. The one rAF in the render path is `PaneSlot.vue:95`
  and it is cancelled at `:89` and `:108` (`onBeforeUnmount`).
- **No WebGL, no network, no timers, no observers, no listeners** — nothing to leak. The pane and its
  child add zero teardown obligations.
- **None of the named local hazards apply.** No `defineModel` (the one two-way binding is a plain
  `v-model` on a native `<input>` over a local `ref` — the correct shape). No oklch→HSV roundtrip,
  so `stableHue` is not in play. No `ValueUnit` wrapping anywhere in the generate path. No parsing —
  the component *produces* CSS colour strings and never consumes one, so the live `parseCssColor`
  crash class cannot reach it.
- **`verbatimModuleSyntax` is satisfied.** All four type-only imports use `import type`:
  `GeneratePane.vue:8`, `GenerateControls.vue:21,32,33`.
- **The slider is keyboard-operable and the pipeline follows.** Measured
  (`probes/r2-d-title-affordance-slider.mjs`): focus `[role=slider]`, ArrowRight →
  `aria-valuenow` `5 → 6`, `.generate-swatch` count `5 → 6`. The `@update:model-value` guard at
  `GenerateControls.vue:306` is correct.
- **The preview-strip cost claim is essentially sound.** `GenerateControls.vue:87-93` claims
  "sub-millisecond" for a menu open. Measured on the live module:

  ```json
  "ms_one_generatePalette_count12":   0.179,   // 2000 iterations
  "ms_open_preset_menu_count5":       0.432,   // 10 presets × generatePalette(5,…), 200 iterations
  "ms_open_preset_menu_count12":      1.317    // 10 presets × generatePalette(12,…)
  ```

  1.3 ms at the slider's maximum, not sub-millisecond — but one menu open, well inside a frame.
  **Not a defect.** The seed-exactness the comment defends is real: `generatePalette` is pure and
  deterministic in `(count, preset, harmony, seed)`, so a row's strip and the palette selecting it
  yields are the same values. What is broken is the *oracle* that checks it (C-7), not the claim.
- **The hue clamp does not collapse the constrained presets.** 40 seeds × 12 colours each:
  `warm` 480 distinct, `cool` 480 distinct, `earth` 480 distinct. `clampHueToRanges`
  (`generate-color.ts:156-184`) maps out-of-range hues proportionally into the combined span and its
  two-range case (`warm`: `[[0,80],[330,360]]`) accumulates correctly.
- **`copyColors` (all-colours) works**; only the *per-swatch* verb is dead (C-2), and only its
  *feedback* is missing (C-5).
- **No console errors, page errors, or horizontal overflow attributable to this component** on any
  of the four Safari matrices. `REPORT.json` `/#/generate` rows: `consoleErrors: []`,
  `pageErrors: []`, `failedRequests: []`, `overflowX: 0`, `namelessButtons: 0`, `main: 1`,
  `hasDarkClass` correct in both dark matrices. The only console error in the whole 60-capture
  matrix is a WebGL context loss on `/#/`, which is not this route.
- **`GeneratePane` is not a god module** and adds to none. 41 lines, two injects, one handler.

---

## Defect table

| id | severity | anchor | defect |
|---|---|---|---|
| C-1 | **BLOCKER** | `GeneratePane.vue:14,19` | the typed palette name is discarded; every save is named "Generated Palette" (measured) |
| C-2 | **BLOCKER** | `GenerateControls.vue:199-208` | swatch copy verb wholly inert — `aria-hidden`, `pointer-events:none`, `tabIndex -1`, click times out; glass 7 dropped `tag`/attrs/slot; 13 consumer sites repo-wide |
| C-3 | MAJOR | `PaletteColorStrip.vue:2-4` + C-2 | the plate's entire colour output is erased from the a11y tree (`"5 Regenerate seed: 5ba89561"`) |
| C-4 | MAJOR | `App.vue:83-92` vs `:104` + `usePaneRouter.ts:196-198` | dock Regenerate/Save/Copy are silent no-ops on mobile (measured: seed unchanged) |
| C-5 | MAJOR | `GenerateControls.vue:106-113` | `CopyResult` discarded; a rejected clipboard write produces zero user-visible signal |
| C-6 | MAJOR | `GeneratePane.vue:19` | Save reaches past `onCurrentPaletteSaved` into the raw store → no expansion, no confirmation |
| C-7 | MAJOR | `o20-generate-plate.spec.ts:63` + `.github/workflows/ci.yml` | the only test is **deterministically RED**, compares across a serialization boundary, and Playwright is not in CI; zero unit tests |
| C-8 | MAJOR | `GenerateControls.vue:75-81` | unchecked `as PresetName` / `as HarmonyName`; a bad preset throws inside a render-critical computed (throw measured) |
| C-9 | MAJOR | `generate-color.ts:235-243` | 15-significant-digit colour strings reach the clipboard (294 chars for 5) and localStorage |
| C-10 | MINOR | `GenerateControls.vue:297-307` | 12 px slider thumb — the component's only `smallTapTargets` row; and the swatches escape that audit entirely |
| C-11 | MINOR | `GenerateControls.vue:144-149` | plate title has no rest affordance (none at all on touch); hand-rolled focus ring duplicating root `focus-ring`, rendering opaque not `/40` |
| C-12 | MINOR | `GeneratePane.vue:7,10` | `CSS_COLOR_KEY` injected with `!`, never read |
| C-13 | MINOR | `GeneratePane.vue:12,22-26` | `ref`+`InstanceType` where the house idiom is `useTemplateRef`; `?.()` on methods the child does expose = the mask that hid C-4 |
| C-14 | INFO (hyp.) | `GenerateControls.vue:297` | no reka-ui pointer-capture recovery here or in the glass-ui root, while the picker carries a per-consumer cure |
| C-15 | INFO (hyp.) | `generate-color.ts:213-233`, `prng.ts:3` | `count ≤ 0`/`NaN` → `[]` silently; `seed` NaN/0/2⁵³ alias under `\|= 0` |

Defect families (for the arbiter): **{C-1, C-6}** = the save path never joined the palette-actions
port. **{C-2, C-3, C-10-undercount}** = one mechanism, the un-migrated glass 6→7 `WatercolorDot`
contraction. **{C-4, C-13}** = optional-chaining used as wiring insurance. **{C-5, C-3, C-6}** = the
pane has no feedback channel of any kind. **{C-7, C-9}** = the oracle and the serializer disagree
and neither is exercised.

---

## Convergence with seat 1 (`challenge-C-implementation.seat-1-9268f054.md`)

Independent agreement on the substance, which raises confidence in the blockers:

| this seat | seat 1 | status |
|---|---|---|
| C-1 name drop | C-1 | **independently confirmed**, same reproduction shape |
| C-2 dead swatch verb | C-2 | **independently confirmed**; this seat adds the 13-site repo-wide `tag=` census, the missing-slot proof (`renderSlot` = 0), and the Playwright click timeout |
| C-4 mobile dock | C-3 | **independently confirmed**, same measurement (seed unchanged) |
| C-3 + C-5 + C-6 | C-4 (merged) | this seat separates announcement (C-3), clipboard result (C-5), and wrong-port save (C-6); adds the forced-rejection measurement |
| C-12 dead inject | C-5 | confirmed |
| C-13 idiom | C-6 | confirmed; this seat adds the `?.()` masking link to C-4 |
| C-10 slider thumb | C-7 | confirmed; this seat adds the swatch-undercount consequence |
| C-11 title affordance | C-8 | confirmed; this seat adds the focus-ring measurement and edict-5 read |
| **C-7 test truth** | C-9 (vacuous) | **UPGRADED** — seat 1 called the gate vacuous; it is vacuous *and deterministically red*, and Playwright is absent from CI |
| **C-8 unchecked casts** | — | **new** |
| **C-9 unrounded serialization** | — | **new** |
| C-14, C-15 | — | **new** (both labelled hypotheses) |

No contradiction between the two seats on any finding.

---

## Probes (banked, re-runnable, read-only)

All four restore `localStorage` and drive `http://localhost:9000` without writing to the repo.
`node <path>` from anywhere; each prints JSON.

- `probes/r2-a-dom-save-a11y.mjs` — swatch DOM truth, hit-test, click timeout, tab order, plate
  census, slider thumb, and the C-1 name-drop reproduction.
- `probes/r2-b-mobile-perf-boundary.mjs` — the mobile dock-action no-op (iPhone 14 context), the
  preview-strip timings, the domain-boundary sweep, and the hue-clamp distribution check.
- `probes/r2-c-clipboard-at-keyboard.mjs` — forced clipboard rejection, the AT-visible text of the
  plate, and the keyboard walk.
- `probes/r2-d-title-affordance-slider.mjs` — plate-title rest/hover/focus computed styles and
  slider keyboard operability.

Gate commands run:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit                                         → EXIT 0
$ npx playwright test --project=smoke e2e/smoke/oracles/o20-generate-plate.spec.ts   → 1 failed, 1 passed  (×2 runs)
$ grep -n "run:" .github/workflows/ci.yml                                            → no playwright step
$ grep -rln "GeneratePane|GenerateControls|useColorGeneration|generatePalette" test/  → no matches
```
