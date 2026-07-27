# CHALLENGE-C · `demo/workbenches/generate/GenerateControls.vue` — implementation audit (r3)

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was spawned with an explicit declaration for. The declaration and the served tier agree. This is
not an inherited or undeclared seat.

**Run of record.** 2026-07-27, repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD
`041ca263` at probe time (the seat was briefed against `c654824e`; the intervening commits are
`docs/tranches/V/**` only — `git log --oneline -3` → `041ca263`, `6085965e`, `9bcd5d91` — and touch
nothing in this component's dependency cone). Dev server LIVE at `http://localhost:9000`.
`@mkbabb/glass-ui@7.0.0` (source also on disk at `/Users/mkbabb/Programming/glass-ui`, version
`7.0.0`, which I read to confirm the dist).

**Prior-pass policy.** Two earlier CHALLENGE-C passes existed at this path. I ran my own audit to
completion *before* reading either, then reconciled (§7). Both are preserved verbatim:
`challenge-C-implementation.2026-07-24-pass.md` and `challenge-C-implementation.r2-2026-07-27.md`.
Where I converge with r2 I say so and keep r2's finding ID so the DEFECT-LEDGER can merge rather than
double-count; where I go further I extend the same ID; **one r2 hypothesis (C-10) I REFUTE with a
type citation** (§6.2). New findings take fresh IDs C-13…C-18.

---

## 0 · Pin verification (coordination boundary)

CARRY-LEDGER §D — glass **BJ W4 / v8 Slider post-cut consumer hold** — pins this file at SHA-256
`4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6`.

```
$ shasum -a 256 demo/workbenches/generate/GenerateControls.vue
4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6  demo/workbenches/generate/GenerateControls.vue
```

**No drift. No coordination-boundary finding.** The hold forbids any consumer edit here until Glass 8
proves source-to-served identity, so **this seat lands no source edit**; every cure is authored in §8
as a wave item gated `BLOCKED-ON-GLASS-V8` with its exact release condition.

The only files this seat wrote are in this directory: this report, the preserved r2
(`challenge-C-implementation.r2-2026-07-27.md`), and three read-only browser probes —
`probe-C-impl-r3.mjs`, `probe-C-menu-r3.mjs`, `probe-C-save-r3.mjs`.

---

## 1 · Verdict

**DEFECTIVE.** The premise holds, and it holds at the highest severity.

The component ships **two interactive controls that do nothing** — the twelve per-swatch copy verbs
(the primitive they mount discards the listener, the label, and the tag, and then sets
`pointer-events: none` on itself) and the editable plate name (its own consumer drops the emitted
argument on the floor). Its entire output — the generated palette, the reason the workbench exists —
is `aria-hidden` end to end: **0 of 5 swatches reachable by assistive technology, 0 live regions**,
and an accessible text of `"5 Regenerate seed: 83d35f90"`.

Its single automated oracle is not merely red, it is **arithmetically impossible to pass**, and CI
never runs it. Every gate that *does* run — `lint`, both `vue-tsc` passes, `npm test` — is green over
all of the above, and I ran them to prove it.

Severity ladder: **BLOCKER** (a shipped control does not work) · **MAJOR** · **MINOR** · **INFO**.
Anything without a reproduction is labelled a hypothesis and says `REPRODUCTION: NONE`.

| id | severity | defect | status vs r2 |
|---|---|---|---|
| C-1 | BLOCKER | the per-swatch copy verb is not wired, not focusable, and not hit-testable | converge (+3 new measurements) |
| C-2 | BLOCKER | the editable plate name is discarded on save — now proven from storage | converge, **upgraded** MAJOR→BLOCKER |
| C-3 | MAJOR | the palette has zero accessible representation; no `aria-live` | converge |
| C-4 | MAJOR | the count-slider thumb is 12 px on the drag axis — under the 24 px floor, on both engines and all four matrices | converge |
| C-5 | MAJOR | the one oracle cannot pass by construction; CI never runs it; gates vacuous | converge |
| C-13 | MAJOR | **the preview strips LIE at count 8–12** — 12 stops stamped, 7 painted | **new** |
| C-14 | MAJOR | generated colours carry 12–15 significant decimals into the clipboard, into `localStorage`, and into the API | **new** |
| C-6 | MINOR | both clipboard sites discard the producer's `{ ok, reason }` result | converge |
| C-8 | MINOR | the plate chrome row wraps at desktop — a **sub-pixel** tie, not a width law | converge, mechanism refined |
| C-15 | MINOR | the handler's parameter type is imported from `reka-ui`, a seam Glass 7 no longer exposes | **new** (and it kills r2's C-10) |
| C-16 | MINOR | `aria-label="Color count"` lands on two nested elements; the outer has no role | **new** |
| C-17 | MINOR | `GeneratePane` boundary: unused injection, `ref()` not `useTemplateRef`, doubly-dead `save` | **new** |
| C-18 | INFO | `:seed` is read once at mount, so the "stable per (color,i)" claim decays after the first regenerate | **new** |
| C-10 | — | **REFUTED** — `null` cannot reach the cast | **refutation** |

---

## 2 · BLOCKER

### C-1 · The per-swatch copy verb is not wired, not focusable, and not hit-testable

`GenerateControls.vue:199–208` mounts twelve swatches as:

```vue
<WatercolorDot
    v-for="(css, i) in palette" :key="i"
    :color="css"
    tag="button"                                   ← discarded
    :seed="`gen-${css}-${i}`"
    class="generate-swatch w-9 h-9 sm:w-10 sm:h-10 … cursor-pointer active:scale-95 …"
    :aria-label="`Copy ${css}`"                    ← discarded
    @click="copyColor(css)"                        ← discarded
/>
```

**Mechanism — the primitive refuses every one of those bindings.** `WatercolorDot` at glass-ui 7.0.0
declares six props and **no emits** (`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`
→ `{ color, variant?, animate?, cycleDuration?, range?, seed? }`), and then:

```
/Users/mkbabb/Programming/glass-ui/src/components/watercolor-dot/WatercolorDot.vue
  6:   defineOptions({ inheritAttrs: false });      ← attrs & listeners are NOT forwarded
 99:   aria-hidden="true"                           ← hard-coded on the root
115:   pointerEvents: 'none',                       ← inline, on the root
```

Only `class` and `style` are re-attached by hand (`const attrs = useAttrs()` → `visualClass` /
`visualStyle`). `tag`, `aria-label`, and `onClick` are dropped, and because `inheritAttrs` is
`false`, **Vue emits no "extraneous non-emits event listeners" warning** — the failure is completely
silent. That is why every gate is green.

**Measured on the live app** (`probe-C-impl-r3.mjs` §1, §2b, §2c, Chromium 1440×900,
`http://localhost:9000/#/generate`):

```json
### 1-swatches
[ { "tagName": "SPAN",          ← not <button>; tag="button" evaporated
    "tagAttr": null,
    "ariaHidden": "true",
    "ariaLabel": null,          ← the consumer's aria-label is gone
    "tabIndex": -1,             ← unreachable by keyboard
    "pointerEvents": "none",    ← unreachable by pointer
    "cursor": "pointer",        ← the consumer's class DID apply: a false affordance
    "layoutBox": { "w": 40, "h": 40 },
    "elementAtCenter": null } ]

### 2b-writes-after-swatch-click     (a real MouseEvent dispatched straight at the element,
[]                                    bypassing hit-testing to test the LISTENER alone)

### 2c-playwright-actionability
{ "result": "TimeoutError: locator.click: Timeout 4000ms exceeded.", "writes": [] }

### 2d-after-copy-all                (control: the plate's Copy-all button, same page, same probe)
[ ["writeText", "oklch(57.075309213251% 0.165883022438 44.052828429267deg), oklch(71.53…"] ]
```

Three independent proofs, one conclusion: a **synthetic click on the element produces zero clipboard
writes** (no listener exists), Playwright can never make it actionable (`pointer-events: none`), and
the control button in the same page writes fine. `copyColor()` at `GenerateControls.vue:111–113` is
unreachable dead code.

**Reproduction.** `node docs/tranches/V/megatranche/audit/components/wb-generate-controls/probe-C-impl-r3.mjs`
with the dev server up; read blocks `1-swatches`, `2b`, `2c`, `2d`. By hand: open
`http://localhost:9000/#/generate`, click any swatch, paste — the clipboard is unchanged.

**Failure scenario.** A user sees twelve 40 px rounded swatches inside a plate whose sibling controls
are all live, styled `cursor-pointer` and `active:scale-95`, each documented in the source as "the
specimen face's one direct verb". Clicking any of them does nothing, produces no feedback, and cannot
even show the pointer cursor (`pointer-events: none` suppresses it). A keyboard or screen-reader user
never learns the swatches exist.

---

### C-2 · The editable plate name is discarded on save — proven from storage

`GenerateControls.vue:48–52, 102–104` emits the name as a first-class save argument:

```ts
const emit = defineEmits<{ save: [colors: string[], name: string] }>();
const paletteName = ref("Generated Palette");
function save() { emit("save", [...palette.value], paletteName.value); }
```

with a five-line comment above it (`:44–47`) asserting *"the save carries the plate's own name — the
bench title is provenance FOR the save, never display-only chrome… this emit is already truthful."*

The one and only listener throws the argument away:

```ts
// demo/workbenches/generate/GeneratePane.vue:14–20
function onSave(colors: string[]) {                       ← the `name` parameter is simply absent
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors); ← a string literal
}
```

TypeScript cannot catch this: a handler with fewer parameters is assignable. `vue-tsc` is green (§5).

**Measured end to end** (`probe-C-save-r3.mjs`; typed a distinctive name, clicked Save, read
`localStorage`):

```json
### 1-typed
"ZZ-PROBE-NAME-42"

### 2-storage-after-save
[ { "key": "color-palettes",
    "hasProbeName": false,                              ← the typed name never arrives
    "hasGenericName": true,
    "sample": "{\"version\":1,\"palettes\":[{\"id\":\"ba918b9b-…\",\"name\":\"Generated Palette\",
               \"slug\":\"generated-palette-d8de736b\",\"colors\":[{\"css\":\"oklch(79.838…" } ]
```

**Reproduction.** `/#/generate` → click the plate title → type anything → click *Save palette* →
`JSON.parse(localStorage["color-palettes"]).palettes.at(-1).name` is `"Generated Palette"`.

**Failure scenario.** A user names three palettes "Brand", "Autumn", "Dark mode", saves each, and
their library contains three rows all called *Generated Palette* with generated slugs
(`generated-palette-d8de736b`). The rename is not merely ignored — it is *silently* ignored, with no
error and a control that keeps showing the typed text until the pane remounts.

**Why BLOCKER, not MAJOR** (r2 filed this MAJOR): it is a second shipped control that does nothing,
identical in kind to C-1, and its failure is destructive of user data intent rather than merely
inert — the persisted record is wrong, not absent, and it propagates to the API through
`createPalette`.

---

## 3 · MAJOR

### C-3 · The workbench's entire output has no accessible representation

Both renderings of the palette are hidden from assistive technology:

- the plate face — `PaletteColorStrip` is `aria-hidden="true" role="presentation"`
  (`demo/palettes/browser/card/PaletteColorStrip.vue:4–5`, "color strip is a decorative visual");
- the swatch grid — every `WatercolorDot` root carries a hard-coded `aria-hidden="true"`
  (glass-ui `WatercolorDot.vue:99`), and the consumer's `:aria-label` never lands (C-1).

Measured (`probe-C-impl-r3.mjs` §3):

```json
{ "plateAriaLabel": "Generated palette",
  "stripAriaHidden": "true",
  "swatchCount": 5,
  "swatchesReachableByAT": 0,        ← every swatch is inside an aria-hidden subtree
  "liveRegionsInDocument": 0,
  "liveRegionsInPlate": 0,
  "plateAccessibleText": "5 Regenerate seed: 83d35f90",
  "focusablesInPlate": ["INPUT:Palette name","BUTTON:Regenerate","BUTTON:Save palette","BUTTON:Copy all colors"] }
```

and the tab order confirms it (`probe-C-menu-r3.mjs` §6): four focusables, none of them a colour.

A screen-reader user activates *Regenerate*, the five colours change, and **nothing is announced** —
no `aria-live`, and the only text that changed is an eight-hex-digit seed the region does not
announce. The component is a colour tool whose colours do not exist in the accessibility tree.
`grep -rn "aria-live\|role=\"status\"" demo/workbenches/generate/` → `NONE`.

**Failure scenario.** Non-visual user: Tab → "Palette name, edit text" → "Regenerate, button" →
activate → silence → activate again → silence. There is no way to learn what was generated, whether
it changed, or what will be saved.

---

### C-4 · The count-slider thumb is 12 CSS px on its drag axis — under the 24 px floor

`GenerateControls.vue:297–307` mounts the count `Slider`. Its thumb measures (probe §5, `offsetWidth`
/`offsetHeight`, so transform-immune):

| viewport | 1440 | 1280 | 768 | 390 |
|---|---|---|---|---|
| `.slider-thumb` | **12 × 24** | **12 × 24** | **12 × 24** | **12 × 24** |

The Safari matrix agrees on the failing axis, and attributes it to this component by name —
`REPORT.json`, `/#/generate`, all four matrices:

```
safari-desktop-light  [{"w":12,"h":24,"tag":"span","label":"Color count"}]  total=5
safari-desktop-dark   [{"w":12,"h":24,"tag":"span","label":"Color count"}]  total=5
safari-mobile-light   [{"w":12,"h":44,"tag":"span","label":"Color count"}]  total=5
safari-mobile-dark    [{"w":12,"h":44,"tag":"span","label":"Color count"}]  total=5
```

(mobile grows the thumb's *height* to 44 and leaves the width at 12 — the axis the control is
dragged along fails on every matrix.)

**This is this component's entire contribution to the route's `smallTapTargets: 5`.** The other four
(`input 160×23 label ""`, and three `22×22` buttons labelled *Switch to slug* / *Generate new slug* /
*Cancel*) belong to `PaletteSlugBar` in the adjacent pane. Attribution verified by label matching
against this component's own accessible names (§3).

WCAG 2.2 SC 2.5.8 *Target Size (Minimum)*: 24 × 24 CSS px. 12 px fails on the horizontal axis, and
the horizontal axis is the axis the control is dragged along. Everything else in the plate passes:
icon buttons 36 × 36, swatches 40 × 40 (≥ 640) / 36 × 36 (at 390) — though the swatches are not
targets at all (C-1).

---

### C-5 · The one oracle cannot pass by construction, and CI never runs it

`e2e/smoke/oracles/o20-generate-plate.spec.ts` is the sole automated coverage of this component
(`grep -rln "GenerateControls\|useColorGeneration\|generate-color\|generatePalette" test e2e demo`
returns exactly one file under `test/` or `e2e/`, and it is that spec). No vitest file references the
component, `useColorGeneration`, or `generatePalette`; `test/preview-chips.test.ts` covers the
*ramp* sampler only and contains zero occurrences of `generate` or `PreviewStrip`.

**(a) The seed-exact assertion compares two different serializations of the same colour.** The spec
asserts (`:96–107`) `expect(live).toEqual(stamped)` where `live` is
`getComputedStyle(el).backgroundColor` and `stamped` is the chip's `data-stops`
(= `stampStops(generatePalette(...))` = the library's raw strings). Both sides, read out of the same
page state (`probe-C-menu-r3.mjs` §3):

```json
{ "stamped_first": "oklch(55.373499433044% 0.134321687222 305.139642180875deg)",
  "live_first":    "oklch(0.553735 0.134322 305.14)",
  "equal": false }
```

Numerically identical (55.3735 % ≡ 0.553735; 305.139642…deg ≡ 305.14), textually never equal. The
spec's own comment says *"the same rgb() strings"* — it was written when `serializeCssColor` emitted
`rgb()`. The serialization moved; the oracle did not. It is a **serialization-form assertion wearing
a byte-identity law's clothes**, and it can only ever be red.

**(b) It is red right now.** Run at HEAD:

```
$ npx playwright test e2e/smoke/oracles/o20-generate-plate.spec.ts --project=smoke --reporter=list
  ✘  1 … verb, actions, and bench-note seed live INSIDE the plate (30.5s)
  ✘  2 … T-17 seed-exact strips: a preset row's stamped stops ≡ the palette selecting it yields (30.4s)
  2 failed
```
(this run reddened earlier than the assertion — `page.goto` timed out on a cold `:8090`, and test 2
died on `openView`'s dock click, `element is not stable`. r2 got further and captured the assertion
diff itself. Either way: red.)

**(c) CI never runs it.** The complete step list:

```
$ grep -n "run:" .github/workflows/ci.yml
32: npm ci      33: npm run lint      34: npx vue-tsc -p tsconfig.lib.json --noEmit
35: npx vue-tsc -p tsconfig.demo.json --noEmit      36: npm run build      37: npm test  ← vitest only
50: node scripts/ci/verify-packed-surface.mjs …
$ grep -n "playwright\|e2e" .github/workflows/*.yml
(no output)
```

**(d) Every gate that does run is green over every finding above.** I ran them:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo VUE_TSC_EXIT=$?
VUE_TSC_EXIT=0
$ npx eslint demo/workbenches/generate/ ; echo ESLINT_EXIT=$?
ESLINT_EXIT=0
```

**The vacuous-gate mutation, named.** Delete lines 199–209 of `GenerateControls.vue` — the entire
swatch grid, `copyColor`, and its import — and: `lint` green, both `vue-tsc` green, **`npm test`
green (no vitest file references this component, `useColorGeneration`, or `generatePalette` — the
grep above)**, `npm run build` green, the visual capture's `namelessButtons: 0` unchanged, `smallTapTargets`
unchanged (the swatches are not counted — they have no accessible name to be nameless with). Only
o20's `.generate-swatch` locator would notice, and o20 is red before it gets there and is not run in
CI. **The component's most prominent visual element can be deleted without reddening any gate the
project executes.**

---

### C-13 · The preview strips LIE at count 8–12 — 12 stops stamped, 7 painted *(new)*

`GenerateControls.vue:86–96` states the law this component's dropdowns are built on:

> *"the F5 TRUTH LAW (seed-exact strips): each option row previews the **EXACT** palette selecting it
> yields… A preview that lies (random per open, or a canned swatch) is worse than none."*

The *function* half is true — `presetStops`/`harmonyStops` call `generatePalette` with exactly the
arguments selecting the row would install, and it is pure and mulberry32-seeded. The **paint** half
is false above count 7. `PreviewStrip` caps at 7 segments by design
(`demo/color-session/color-chips/PreviewStrip.vue:25` `STRIP_SEGMENT_CAP = 7`, with a mask fade on
the last), and this component's slider permits 1–12.

Measured with the count driven to 12 and the harmony menu open (`probe-C-menu-r3.mjs` §5):

```json
{ "count": "12",
  "options": 6,
  "stopsPerChip":    [12,12,12,12,12,12],   ← data-stops (the oracle's contract surface)
  "segmentsPerChip": [ 7, 7, 7, 7, 7, 7] }  ← what the user actually sees
```

At count 5 the two agree (`§2-menu-open`: `stopsPerChip` 5, `segmentsPerChip` 5) — which is why the
defect is invisible at the default and invisible to any oracle written at the default.

**Failure scenario.** A user sets count 12 (the slider's own maximum, one keystroke reachable), opens
*Harmony*, and compares six rows. Each row shows 7 of the 12 colours it will actually produce, with
the seventh faded — so rows whose first seven colours coincide (all six harmonies share `seedHue` and
the same preset L/C draws) read as near-identical, and the row that differs *only* in its tail reads
as identical to its neighbour. The user selects on evidence that is 42 % missing. This is precisely
the "preview that lies" the comment forbids, arrived at from the other direction.

Note this also splits the O-14 chain the module documents (`sample.ts:15–20`: *"the O-14 e2e leg holds
the painted gradient to the stamped stops in the live DOM"*): stamped ≠ painted at count > 7.

---

### C-14 · Generated colours carry 12–15 significant decimals into the clipboard, into `localStorage`, and into the API *(new)*

`generatedCss` (`demo/color-session/generate-color.ts:235–243`) serializes with no rounding. What the
user actually receives:

```json
// clipboard, from the plate's Copy-all button (probe §2d — a real writeText intercept)
"oklch(57.075309213251% 0.165883022438 44.052828429267deg), oklch(71.53…"

// localStorage `color-palettes`, from the Save button (probe-save.mjs §2)
"colors":[{"css":"oklch(79.838149605785% 0.170167350601 150.3761107…
```

Fifteen significant figures on lightness, twelve on chroma and hue. The browser's own serialization
of the identical colour is `oklch(0.570753 0.165883 44.0528)` (probe §1
`computedBackgroundColor`) — six figures, which is already beyond display precision for an 8-bit
channel.

This is the component's product: *Copy all colors* is one of its three plate verbs, and *Save* is
another. The payload is what a user pastes into a stylesheet and what `pm.createPalette` persists and
ships to the API. It is valid CSS, and it is unusable.

**Failure scenario.** A designer copies a five-colour palette to paste into a theme file and gets a
~293-character single line (5 × 57 chars + separators, measured off the intercepted `writeText`
payload). Two palettes differing in the eleventh decimal — visually and numerically the
same colour — are stored as distinct strings, so any equality, dedupe, or diff over stored palette
colours (`api/` atom-diff, `remixPalette`) treats them as different colours.

*Scope note:* the serialization lives one layer down in `generate-color.ts`, not in the pinned file.
The wave item is therefore filed against the shared layer and is **not** blocked by the glass hold
(§8, W-3).

---

## 4 · MINOR

### C-6 · Both clipboard sites discard a result the producer designed to be read

```ts
// GenerateControls.vue:106–113
async function copyColors() { await writeClipboard(palette.value.join(", ")); }
async function copyColor(css: string) { await writeClipboard(css); }
```

`writeClipboard` returns a discriminated result, and glass-ui says why in as many words
(`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts:31–37`):

> *"Returns the discriminated result (`{ ok }` / `{ ok, reason }`) **rather than a lossy boolean**,
> for identical call ergonomics: `const { ok } = await writeClipboard(text)`."*

Both call sites `await` it and drop it. `CopyFailureReason` is `"clipboard-api" | "no-api"` — a
non-secure origin, a denied permission, or an unfocused document all land there. The user gets
nothing on failure and nothing on success: there is no toast (vue-sonner was removed repo-wide), no
`aria-live` (§3), and no icon state. glass-ui also ships `useClipboard({ resetMs })` whose `status`
ref exists exactly for the confirmation UI this component does not have.

Not a BLOCKER because the happy path works (probe §2d), and not silent-crash because
`writeClipboard` never rejects — but it is an explicitly-designed error channel, deliberately
widened by the producer at the Glass 7 cut, thrown away by the consumer in the same commit that
adopted it (`git show f2c8f565 -- demo/workbenches/generate/GenerateControls.vue`: the *only* change
to this file in the whole Glass 5→7 adoption was `copyToClipboard` → `writeClipboard`, name-swapped,
result still discarded).

### C-8 · The plate chrome row wraps at desktop — and it is a sub-pixel tie

`GenerateControls.vue:139–142` documents the row as single-line with a graceful 390 fallback: *"the
name+count lead, the verb cluster rides `ml-auto` right — at 390 the verbs settle onto their own
right-aligned line, never a clipped title."*

Measured with `offsetTop`/`offsetHeight` centres, so `items-center` cannot fake a wrap (probe §5):

| viewport | name-input centre | Regenerate centre | one line? |
|---|---|---|---|
| 1440 | 50 + 31/2 = 65.5 | 87 + 40/2 = 107 | **no — wrapped** |
| 1280 | 65.5 | 107 | **no — wrapped** |
| 768 | 55 + 31/2 = 70.5 | 50 + 40/2 = 70 | yes |
| 390 | 65.5 | 107 | no (as documented) |

The Safari desktop capture agrees independently —
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/generate.png` shows *Generated
Palette · 5* alone on the title line with the verb cluster dropped beneath it.

**The refinement r2 did not have:** it is not a monotone width failure. The parts, measured at 430
(`probe-C-menu-r3.mjs` §1) and at 1440 (probe §5):

```
430:  content 338   input basis 160  + gap 8 + badge 29 + gap 8 + cluster 220  = 425  → wraps
1440: content 438   input basis 160  + gap 8 + badge 29 + gap 8 + cluster 233  = 438  → wraps
768:  content 438   input basis 160  + gap 8 + badge 29 + gap 8 + cluster 224  = 429  → fits
```
(the badge width 29 and the 8 px column gap are measured at 430 — `probe-C-menu-r3.mjs` §1 reports the
row's `columnGap: "8px"` and `kids[1].w: 29`; the cluster widths are `regenW + 8 + 36 + 8 + 36` from
probe §5 at each viewport, and the 430 cluster is measured directly as `kids[2].w: 220`.)

At 1440 the demand *equals* the available width to the pixel and loses on the sub-pixel residue —
the cluster is 9 px wider than at 768 purely because the `Button` type-scale token steps up. The
composition is not "designed for one line and wrapping only at 390"; it is a coin flip that is
currently losing on every desktop engine measured.

### C-15 · The handler's parameter type is imported from `reka-ui`, a seam Glass 7 no longer exposes *(new)*

```ts
// GenerateControls.vue:33
import type { AcceptableValue } from "reka-ui";
// :75–81
function onPresetChange(value: AcceptableValue)  { preset.value  = value as PresetName; }
function onHarmonyChange(value: AcceptableValue) { harmony.value = value as HarmonyName; }
```

The component consumes glass-ui's `Select`, and glass-ui 7.0.0 emits its **own** scalar type:

```
node_modules/@mkbabb/glass-ui/dist/components/select/Select.vue.d.ts
    export interface SelectEmits { "update:modelValue": [value: SelectionValue]; … }
node_modules/@mkbabb/glass-ui/dist/components/_shared/selection.d.ts:2
    export type SelectionValue = string | number;
```

`reka-ui`'s `AcceptableValue` is `string | number | bigint | Record<string, any> | null`
(`node_modules/reka-ui/dist/index3.d.ts:231`) — a *strictly wider* type, which is why the assignment
typechecks and `vue-tsc` stays green. The import is a pre-Glass-7 remnant: the demo reaches past its
own declared design system into the design system's transitive dependency for a type the design
system exports itself. This is the "no legacy / no dual paths" edict (2) and the "glass-ui is the
design system" edict (4) in one line. It is also load-bearing for the refutation in §6.2.

### C-16 · `aria-label="Color count"` lands on two nested elements *(new)*

The single `aria-label` at `GenerateControls.vue:298` produces two named nodes — Playwright's own
strict-mode error is the cleanest possible evidence:

```
strict mode violation: locator("span[aria-label='Color count']") resolved to 2 elements:
  1) <span … data-slot="slider" data-slider-impl="" … aria-label="Color count" class="glass-slider relative w-full">
  2) <span tabindex="0" role="slider" aria-valuemin="1" aria-valuenow="5" aria-valuemax="12" aria-label="Color count" class="slider-thumb …">
```

Element (1) has no `role`, so it is `role=generic`, on which ARIA 1.2 prohibits `aria-label` —
browsers may expose or drop it inconsistently, and a name-based locator or an AT rotor sees two
"Color count" entries for one control. The forwarding decision is glass-ui's (a fall-through onto
the root *plus* an explicit binding onto the thumb), so the cure belongs upstream — it is filed to
the BJ relay in §8, not proposed as a consumer edit.

### C-17 · `GeneratePane` boundary defects *(new)*

`demo/workbenches/generate/GeneratePane.vue`, the component's only consumer:

- **`:10` — a dead injection.** `const cssColorOpaque = inject(CSS_COLOR_KEY)!;` is never referenced
  anywhere in the file. It carries a non-null assertion, so removing the provider would fail at a
  distance rather than here.
- **`:12` — not idiomatic Vue 3.5** (edict 7). `const controlsRef = ref<InstanceType<typeof
  GenerateControls> | null>(null)` where `useTemplateRef("controlsRef")` is the 3.5 form used
  elsewhere in this tree.
- **`:24` — `save` is exposed twice and called by nobody.** `GenerateControls` exposes `save`
  (`:115`), `GeneratePane` re-exposes it (`:24`), and `demo/shell/usePaneRouter.ts:196,198` wires only
  `regenerate` and `copy`. `grep -rn "copyColors" demo/ | grep -v workbenches/generate` returns one
  line; there is no `\.save\(\)` caller. A dead two-level export path.
- **`:23–25` — optional-call shims.** `controlsRef.value?.regenerate?.()` optional-chains a method
  the type system guarantees when the ref is non-null. `?.()` on a `defineExpose`d member is a
  masking fallback (edict 2): if the expose is ever renamed, the call silently no-ops instead of
  throwing.

---

## 5 · INFO / hypotheses

### C-18 · `:seed` is read once at mount, so "seeded stable per (color,i)" decays after the first regenerate

`GenerateControls.vue:196` claims the dot is *"seeded stable per (color,i)"* via
`:seed="`gen-${css}-${i}`"`. The primitive reads `seed` **once**, at setup
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`):

```js
const { …, seed: c = "" } = i;                       // destructured once from the options object
if (l.value = y(v(d, s[0], s[1])), !a)
    return typeof e != "function" && _(e, (e) => {   // watches COLOR only
        let t = n(r(e + c));                         // …and re-mixes the MOUNT-TIME seed `c`
        l.value = y(v(t, s[0], s[1]));
    });
```

The call site passes `seed: t.seed` by value, so after the first `regenerate()` the silhouette is
`hash(newColor + oldSeedString)` while the wet-edge filter seed (a `computed` on `color + seed`) does
track both. The two halves of one dot disagree about their seed. Cosmetic only, and the consumer's
choice of a colour-derived seed string is a category error given that contract — passing a stable
`` `gen-${i}` `` would be equivalent and honest. **Severity INFO; REPRODUCTION: NONE** (I did not
capture a before/after silhouette diff — the dots are unreachable for interaction anyway, and the
`key="i"` reuse that makes it observable is correct as written).

### Boundary observation · the Generate pane never completes its enter transition under Chromium

Not a GenerateControls defect, but it materially governs this component's testability and I measured
it, so it is recorded (probe §A):

```json
{ "classes": "relative w-full mx-auto h-full min-w-0 vj-enter-enter-from vj-enter-enter-active",
  "transform": "matrix(0.999391, -0.0348995, 0.0348995, 0.999391, -563.2, 0)",
  "rectX": -373 }
```

Four seconds after `load`, on a direct hash navigation to `/#/generate`, the pane wrapper still
carries **both** `vj-enter-enter-from` and `vj-enter-enter-active` — Vue's next-frame class swap
never happened — leaving it `rotate(-2deg) translateX(-563px)`, i.e. off-viewport. Identical under
`reducedMotion: "reduce"` and `"no-preference"`. `app-layout` reports `scrollWidth 1813` vs
`clientWidth 1440`. The Safari matrix shows the pane correctly placed with `overflowX: 0`, so this is
engine- or timing-specific.

Consequences that *are* this seat's business: every rect-based e2e assertion against this pane is
measuring a transformed element; Playwright actionability fails on anything inside it; and it is a
second, independent reason the O-20 oracle cannot reach the component. All geometry in this report
therefore uses `offsetLeft/offsetTop/offsetWidth/offsetHeight`, which are layout-space and immune to
the ancestor transform. **Owner: shell (`PaneSlot` / `usePaneRouter` / `animations.css:83–97`), not
this component.** Filed as a relay item, not a finding here.

---

## 6 · The negative proof — what is sound, and what I refuted

### 6.1 · Sound, with the positive evidence

1. **The generation core is pure and its truth law holds at the function level.**
   `generatePalette(count, preset, harmony, seed)` (`generate-color.ts:213–233`) takes a fresh
   `mulberry32(seed)` per call and touches no module state; `presetStops(p)` /`harmonyStops(h)`
   (`:94–100`) pass exactly the arguments selecting the row installs. Same args, same bytes. The
   defect in C-13 is in the *painting*, not the derivation.

2. **Both domain boundaries are safe.** Driven to each end with the keyboard (probe §7):
   `count = 1` → 1 swatch, 1 strip segment, gradient
   `linear-gradient(to right, oklch(0.666617 0.190188 133.655) 50%)` (a single stop paints a solid
   track — correct, not a NaN); `count = 12` → 12 swatches, 12 segments. No throw, no `NaN`, no empty
   render. `countSliderGradient` (`:65–73`) guards `colors.length === 0 → var(--muted)` and
   `length === 1 → 50%`, both reachable and both correct.

3. **No `requestAnimationFrame` in the component or its composable, and none induced.** `animate`
   defaults `false` on `WatercolorDot`, so `useRAFLoop` is never entered (dist: the loop is behind
   `if (… !a) return …`). Zero PRM-RAF exposure. `PerformanceObserver({entryTypes:["longtask"]})`
   over ten consecutive *Regenerate* clicks: `longTasksMs: []` (probe §9). Regeneration is cheap.

4. **The gradient overlay does not steal the slider's pointer events** — a hypothesis I formed from
   the source (`:293–296`, an `absolute inset-0` sibling with default `pointer-events`) and then
   killed by measurement (probe §6):
   ```
   "gradientPointerEvents": "auto",
   "y=mid x=0.02": "SPAN.slider-range glass-liquid-fill",
   "y=mid x=0.5":  "SPAN.slider-track",
   "y=mid x=0.98": "SPAN.slider-track"
   ```
   The Slider is later in DOM order and positioned, so it wins hit-testing across the whole track
   mid-line. Only the top/bottom ~1 px rows fall through to the container, and those are outside the
   `rounded-full` pill anyway. **No defect.**

5. **None of the repo's known local hazards are present.** No `defineModel` anywhere in the file (the
   stale-read hazard needs one); no oklch→HSV roundtrip and no `stableHue` dependency; no
   `new ValueUnit(...)` and no value re-wrapping; no WebGL and no drawing context of any kind
   (`WatercolorDot` is explicitly the CSS/SVG counterexample); no reka-ui pointer-capture surface
   beyond the glass `Slider`, whose `pointercancel` recovery is the producer's.

6. **`verbatimModuleSyntax` is honoured.** All three type-only imports use `import type`
   (`:21`, `:32`, `:33`). `vue-tsc -p tsconfig.demo.json --noEmit` exits 0.

7. **The `SelectContent` really does unmount when closed**, so `presetStops`/`harmonyStops` cost
   nothing at rest — the one load-bearing half of the `:86–96` comment that survives audit. Verified
   by the `[data-stops]` count being 0 with both menus closed and 10 with the preset menu open
   (probe §8 vs `probe-C-menu-r3.mjs` §2).

8. **No page errors, no component console errors.** Probe §11: `pageErrors: []`, `consoleWarns: []`.
   The single console error is the dev-server env notice
   (`[value.js] … http://localhost:9000 has no VITE_API_URL …`), unrelated to this component; the
   Safari matrix records `consoleErr: 0` / `pageErr: 0` for `/#/generate` on all four captures.

### 6.2 · REFUTED — r2's C-10 (`null` laundering through `as PresetName`)

r2 filed a hypothesis that `AcceptableValue` includes `null`, so `preset.value = value as PresetName`
could make `GENERATION_PRESETS[preset]` `undefined` and `p.l[0]` a render-time `TypeError`.

**The emitted type is not `AcceptableValue`.** The component consumes glass-ui's `Select`, whose emit
is typed `SelectionValue` — `node_modules/@mkbabb/glass-ui/dist/components/_shared/selection.d.ts:2`:

```ts
/** Stable scalar identity used by Glass selection controls. */
export type SelectionValue = string | number;
```

`null`, `bigint`, and object values are outside the producer's contract; glass-ui even ships
`isSelectionValue()` as its own runtime narrowing. `AcceptableValue` appears in this file only
because of the stale `reka-ui` import (C-15), and it is *wider* than what can arrive — the handler
advertises a contract its producer never emits. The crash path is closed at the type level, and
r2's C-10 should be **withdrawn from the ledger and replaced by C-15**, which is certain, is an
owner-edict violation, and whose cure (import `SelectionValue` from glass-ui and narrow with a
`PRESET_NAMES.includes` membership test rather than a cast) subsumes it.

---

## 7 · Reconciliation with the earlier passes

| r2 finding | this pass |
|---|---|
| C-1 dead swatch verb | **converge.** Independent: synthetic-click listener test (0 writes), Playwright actionability timeout, `pointer-events: none` + `tabIndex -1` + `aria-label: null` read off the live DOM, and the glass-ui **source** lines 6/99/115 rather than the dist alone. |
| C-2 name discarded | **converge, upgraded to BLOCKER** on a live `localStorage` round-trip (typed → persisted) rather than a code read. |
| C-3 no a11y representation | **converge.** Adds `swatchesReachableByAT: 0/5`, the four-item tab order, and `grep aria-live → NONE`. |
| C-4 12 px thumb | **converge.** Adds the four-viewport Chromium measurement and the explicit attribution of the other 4 of the route's 5 `smallTapTargets` to `PaletteSlugBar`. |
| C-5 vacuous gates / red unrun oracle | **converge**, same mechanism, reached independently: r2 pasted the assertion diff from a completed run; I measured both sides in one page state (`equal: false`) and separately re-ran the spec (2 failed). Adds the executed `vue-tsc`/`eslint` exit codes. |
| C-6 discarded `CopyResult` | **converge.** Adds the `git show f2c8f565` provenance: the Glass 7 adoption commit touched *only* that line in this file and preserved the discard. |
| C-7 dropdown cost 1.3–3.6 ms | **accepted as measured by r2**; I did not re-measure the module directly. My `longTasksMs: []` over 10 regenerations is consistent with it (3.6 ms is well under the 50 ms long-task threshold). No independent claim. |
| C-8 desktop wrap | **converge, mechanism refined** — measured non-wrap at 768 shows it is a sub-pixel tie, not a width law. |
| C-9 hover-only rename affordance | **not re-derived** (design-adjacent; CHALLENGE-D's seat). No dispute. |
| C-10 `null` laundering | **REFUTED** — §6.2. |
| C-11 count-domain, C-12 duplicate saves | **not disputed**; C-11's premise is confirmed sound by my §6.1(2). |
| — | **new:** C-13 (strips lie at count > 7), C-14 (15-figure colour payload), C-15 (`reka-ui` type seam), C-16 (duplicate `aria-label`), C-17 (`GeneratePane` boundary), C-18 (mount-time seed), and the stuck-pane-transition boundary observation. |

---

## 8 · The wave — **BLOCKED-ON-GLASS-V8**

The CARRY-LEDGER §D hold forbids any edit to the pinned file until Glass 8 proves source-to-served
identity. Nothing below is applied.

**Release condition (exact).** All three must hold before W-1/W-2 may land:

1. `@mkbabb/glass-ui@8.x` is published and installed, and
   `node scripts/ci/verify-packed-surface.mjs` (or the BJ W4 source-to-served witness) passes for the
   `watercolor-dot` and `slider` subpaths — i.e. the shipped dist for those two components is proven
   byte-derived from the reviewed source;
2. Glass 8's `WatercolorDot` exposes an **interactive register** — the accepted shape is a
   `tag`/`as` prop *plus* `inheritAttrs` forwarding of listeners and `aria-*`, with `aria-hidden`
   and `pointer-events: none` applied to the decorative blob layer only, not to an interactive root
   (BJ relay item R-1);
3. Glass 8's `Slider` thumb satisfies a ≥ 24 × 24 CSS px hit area at `data-size="md"` — either a
   larger thumb or a transparent expanded target — and emits `aria-label` on the `role="slider"`
   thumb **only** (BJ relay item R-2).

| id | item | gate | blocked? |
|---|---|---|---|
| **W-1** | Make the swatch a real verb: mount the copy button as the interactive element and the `WatercolorDot` as its face. Cures C-1 and, with the label on the button, C-3's swatch half. | new e2e: click swatch *n* ⇒ `navigator.clipboard.writeText` receives `palette[n]`; and a keyboard leg (Tab reaches each swatch, Enter copies) | **yes** — needs release condition 2 |
| **W-2** | Take Glass 8's ≥24 px slider thumb; drop the `aria-label` duplication. Cures C-4, C-16. | visual-matrix `smallTapTargets` for `/#/generate` drops 5 → 4; `getByRole("slider", {name:"Color count"})` resolves to exactly 1 node | **yes** — condition 3 |
| **W-3** | Round `generatedCss` output to display precision in `generate-color.ts` (4 dp on L%, 4 on C, 2 on H). Cures C-14. | vitest: every `generatePalette` string matches `/^oklch\(\d+\.\d{1,4}% \d\.\d{1,4} \d+(\.\d{1,2})?deg\)$/`; a round-trip parse stays within 1/255 per sRGB channel | **no** — shared layer, not pinned |
| **W-4** | Honour the emitted name in `GeneratePane.onSave(colors, name)`. Cures C-2. | e2e: type a name → Save → the persisted palette carries it | **no** — `GeneratePane.vue` is not pinned |
| **W-5** | Rewrite O-20 test 2 to compare *parsed colours*, not strings — `parseCssColor` both sides and assert per-channel equality within 1e-9 — and add the count-12 leg that C-13 exposes. Cures C-5(a) and guards C-13. | the spec passes at count 5 **and** count 12 | **no** — `e2e/` is not pinned |
| **W-6** | Add `e2e` to `.github/workflows/ci.yml` (at minimum the `smoke` project) so W-5 is load-bearing. Cures C-5(c). | CI red when o20 is red | **no** |
| **W-7** | Lift `PreviewStrip`'s 7-segment cap to 12, or narrow the count slider's domain to 7. Cures C-13. | `stopsPerChip === segmentsPerChip` for every chip at every reachable count | **no** — `PreviewStrip.vue` is not pinned |
| **W-8** | An `aria-live="polite"` summary of the palette (e.g. *"5 colours: …"*) inside the plate. Cures C-3's announcement half. | axe: the plate exposes its colours; regenerate announces | **partly** — the swatch labels need W-1 |
| **W-9** | Replace `import type { AcceptableValue } from "reka-ui"` with glass-ui's `SelectionValue` and narrow by membership instead of casting. Cures C-15, subsumes r2's C-10. | `grep -rn 'from "reka-ui"' demo/workbenches/generate/` → 0 | **yes** — pinned file |
| **W-10** | `GeneratePane` hygiene: drop the dead `CSS_COLOR_KEY` injection, `useTemplateRef`, drop the dead `save` expose and the `?.()` shims. Cures C-17. | `vue-tsc` green; `grep` shows no unused inject | **no** |

**Relays (E13 / the standing glass-ui BH-BI fond).** Two items for the active glass-ui inbox:
**R-1** `WatercolorDot` has no interactive register and silently swallows `@click`/`aria-label`/`tag`
from consumers because of `inheritAttrs: false` — at minimum it should warn, ideally it should
forward; **R-2** `Slider` emits `aria-label` onto both the `role=generic` root and the
`role=slider` thumb, and the `md` thumb is 12 px on the drag axis. Plus one shell item for the value
side: the `vj-enter` pane transition can strand `-enter-from` + `-enter-active` together under
Chromium (§5), leaving a routed pane off-viewport.

---

## 9 · Evidence index

| # | evidence | where |
|---|---|---|
| E1 | pin hash re-verified, no drift | `shasum -a 256` §0 |
| E2 | `WatercolorDot` live DOM: SPAN / `tagAttr null` / `aria-hidden true` / `aria-label null` / `tabIndex -1` / `pointer-events none` | probe §1 |
| E3 | synthetic click → 0 clipboard writes; Playwright click → timeout; Copy-all → 1 write | probe §2b, §2c, §2d |
| E4 | glass-ui 7.0.0 source `inheritAttrs:false` (6), `aria-hidden` (99), `pointerEvents:'none'` (115) | `/Users/mkbabb/Programming/glass-ui/src/components/watercolor-dot/WatercolorDot.vue` |
| E5 | typed name `ZZ-PROBE-NAME-42` → persisted `"Generated Palette"` | `probe-C-save-r3.mjs` §1–2 |
| E6 | `swatchesReachableByAT: 0/5`, `liveRegions* : 0`, accessible text `"5 Regenerate seed: 83d35f90"`, 4 focusables | probe §3, `probe-C-menu-r3.mjs` §6 |
| E7 | thumb 12 × 24 at 1440/1280/768/390 (Chromium) | probe §5 |
| E8 | thumb 12 × 24 `label "Color count"` in all four Safari matrices | `audit/visual/REPORT.json` `/#/generate` |
| E9 | `stamped_first` ≠ `live_first`, `equal: false` | `probe-C-menu-r3.mjs` §3 |
| E10 | o20 spec: 2 failed | `npx playwright test … --project=smoke` |
| E11 | CI step list; `grep playwright\|e2e .github/workflows/*.yml` → empty | `.github/workflows/ci.yml` |
| E12 | `VUE_TSC_EXIT=0`, `ESLINT_EXIT=0` | §5(d) |
| E13 | `stopsPerChip [12×6]` vs `segmentsPerChip [7×6]` at count 12 | `probe-C-menu-r3.mjs` §5 |
| E14 | 15-figure oklch in clipboard and in `localStorage` | probe §2d, `probe-C-save-r3.mjs` §2 |
| E15 | `SelectionValue = string \| number` vs `AcceptableValue … \| null` | glass-ui `_shared/selection.d.ts:2`; `reka-ui/dist/index3.d.ts:231` |
| E16 | two elements named "Color count" | Playwright strict-mode violation, §C-16 |
| E17 | wrap parts: 338/425 at 430, 438/438 at 1440, 438/429 at 768 | `probe-C-menu-r3.mjs` §1, probe §5 |
| E18 | gradient overlay does not intercept (`SPAN.slider-track` at mid) | probe §6 |
| E19 | count 1 and count 12 both render correctly; no long tasks over 10 regenerations | probe §7, §9 |
| E20 | pane stuck in `vj-enter-enter-from` + `-enter-active`, `translateX(-563.2px)` | probe §A |
| E21 | Glass 7 adoption changed only the `writeClipboard` line in this file | `git show f2c8f565 -- …/GenerateControls.vue` |
| E22 | desktop wrap visible independently in Safari | `audit/visual/shots/safari-desktop-light/generate.png` |

**Reproduce every measured block:**

```
$ npx vite --port 9000            # if not already up
$ cd /Users/mkbabb/Programming/value.js
$ node docs/tranches/V/megatranche/audit/components/wb-generate-controls/probe-C-impl-r3.mjs  # E2,E3,E6,E7,E14,E18,E19,E20
$ node docs/tranches/V/megatranche/audit/components/wb-generate-controls/probe-C-menu-r3.mjs  # E9,E13,E17 + the tab order
$ node docs/tranches/V/megatranche/audit/components/wb-generate-controls/probe-C-save-r3.mjs  # E5,E14
```

`probe-C-save-r3.mjs` writes to the page's own `localStorage` in a throwaway browser context (it
clicks *Save palette*); the other two are pure reads. All three are read-only against the repo.

The main probe is read-only against the server; its single page mutation (neutralising the stranded
`vj-enter` transform so hit-testing is meaningful) is disclosed in its header, and every geometry
number it reports uses `offset*`, which is unaffected by that mutation either way.
