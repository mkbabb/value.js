# CHALLENGE-C — `demo/palettes/PalettesPane.vue` · implementation is defective (pass 5)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
The seat was spawned with an explicit Opus 5 declaration and the served tier matches it. No
inheritance, no undeclared tier, no silent downgrade.

---

## Subject · substrate · method

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/palettes/PalettesPane.vue` (212 lines) |
| Branch / HEAD | `tranche-u` @ `d19da6d3` (the task named `c654824e`; HEAD advanced under the formation — **no source touched by this seat**) |
| Prior passes | `challenge-C-implementation.pass-{1,2,3,4}-prior.md`, all preserved verbatim |
| Live probes | 8 new headless-Chromium Playwright scripts written this pass, beside this report (`repro-C10`…`repro-C17`). Every number below is pasted stdout from **my own** run. |
| Gates run first-hand | `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0** · `npx playwright test --project=smoke e2e/smoke/flows/palette-save.spec.ts` → **1 failed** |
| Images read | `shots/safari-desktop-dark/palettes.png` |

**Verdict: DEFECTIVE.** This pass opens a defect axis no prior pass touched — **operability**. Two
new BLOCKERs: the pane's *only* "add a colour" affordance and *every* current-palette swatch are
structurally dead controls (not a button, no accessible name, `aria-hidden="true"`,
`pointer-events: none`, **no click handler attached at all**), and one save click on the LAN origin
the repo's own vite config publishes **destroys the user's colours and tears the pane out of the
DOM**. Plus a five-defect family in the shipping export path — including two live **SVG-injection**
vectors — and an ARIA `list` that owns zero `listitem`s. The formation's *one* e2e flow covering
this pane is **RED right now**, and `.github/workflows/` contains **zero** references to
playwright or e2e.

---

## N-5 · BLOCKER (NEW) — the pane's primary gesture is a dead control: glass-ui 7's `WatercolorDot` discards every attribute and listener the consumer binds

### The ask

`PalettesPane.vue:41-54` renders `CurrentPaletteEditor`, whose only "add the current colour"
affordance is `CurrentPaletteEditor.vue:95-105`:

```vue
<WatercolorDot
    :color="cssColorOpaque"
    variant="ghost"
    tag="button"
    seed="add-current-slot"
    class="add-slot-ghost btn-interactive w-11 h-11 …"
    :aria-label="`Add current color ${cssColorOpaque} to palette`"
    @click="addCurrentColor"
>
```

### What glass-ui 7.0.0 does with it — by construction

`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```js
:80   inheritAttrs: !1,                       // inheritAttrs: false
:82-92  props: { color, variant, animate, cycleDuration, range, seed }   // NO `tag`
:95   setup(e) { let n = h() /* useAttrs */, c = i(() => n.class), f = i(() => n.style) …
:99   return () => o("span", {
:101      "aria-hidden": "true",
:102      class: [c.value, "watercolor-swatch", …],   // attrs.class only
:112      style: [f.value, { …, pointerEvents: "none", … }]
```

It forwards **only `$attrs.class` and `$attrs.style`**. `tag` is not a declared prop. `aria-label`,
`role`, `tabindex`, **`onClick`**, and every reka-ui `as-child` trigger prop land in `$attrs` and
are **discarded**. The root is a `<span>` with a hard-coded `aria-hidden="true"` and a hard-coded
`pointer-events: none`.

### Measured on the live page — `repro-C12-add-slot-dead.mjs`

```json
{ "found": true, "tagName": "SPAN", "role": null,
  "ariaHidden": "true", "ariaLabel": null, "tabIndex": -1,
  "computedPointerEvents": "none", "inlinePointerEvents": "none",
  "box": { "w": 48, "h": 48, "x": 767, "y": 398 },
  "elementAtCentre": "DIV." }
```

```
AX nodes named 'Add current color': []          ← Chrome's own AX tree (CDP getFullAXTree)
swatches before click      : 0
swatches after REAL mouse  : 0                  ← page.mouse.click at the element's centre
focusables inside the well : []                 ← the whole .dashed-well has ZERO focusables
swatches after FORCED click: 0                  ← dispatchEvent(new MouseEvent("click"))
```

The forced synthetic dispatch is the clincher: it is not merely un-hittable, **there is no click
handler bound to it**. Six independent ways of failing on one control.

### The same defect eats every current-palette swatch — including the whole touch path

`SwatchHoverMenu.vue:12-24` (`!canHover`) wraps the swatch in `<PopoverTrigger as-child>` around a
`WatercolorDot tag="button" :aria-label`; `:29-35` (`canHover`) adds `@click.stop="$emit('click')"`.
Both are discarded. Measured on an iPhone-15 context (`repro-C17-touch-swatches.mjs`):

| | TOUCH (`hover:none`, `pointer:coarse`) | DESKTOP (mouse) |
|---|---|---|
| swatch element | `SPAN`, `aria-hidden:"true"`, `ariaLabel:null`, `tabIndex:-1`, `pointerEvents:"none"` | identical |
| `aria-haspopup` / `aria-expanded` / trigger `id` | `null` / `null` / `null` | identical |
| `focusablesInRow` | **0** | **0** |
| after tap/click | `{"popoverOpen":false,"editButtons":0,"removeButtons":0}` | `{"popoverOpen":true,"editButtons":1,"removeButtons":1}` |

Desktop survives **only** because the pointer listeners sit on the wrapper `<div>`
(`SwatchHoverMenu.vue:2-6`), not on the dot. So: **on touch the current palette is read-only** — no
add, no edit, no copy, no remove — on the exact iOS-Safari path this repo maintains dedicated
debugging infrastructure for. On desktop it is mouse-hover-only, and the panel that opens is
`aria-hidden="true"` by design (`SwatchHoverMenu.vue:44`), so it never reaches AT either.

### The screenshot the matrix already holds shows the consequence

`shots/safari-desktop-dark/palettes.png`: the "Start a new palette" well renders one dashed ghost
blob (the dead add-slot), and the empty plate below reads **"Add colors above, then save the set."**
The pane instructs the user to perform a gesture its own markup makes impossible.

### Blast radius — measured, not guessed

```
$ # WatercolorDot instances given tag= / aria-label= / @click= / :disabled= / role=
demo/workbenches/mix/MixSourceSelector.vue: 3      demo/shell/dock/Dock.vue: 3
demo/workbenches/mix/MixResultDisplay.vue: 3       demo/shared/ui/EmptyState.vue: 3
demo/workbenches/generate/GenerateControls.vue: 1  demo/color-session/ColorSpaceSelector.vue: 1
demo/workbenches/extract/…/ImageEyedropper.vue: 1  demo/palettes/browser/card/SwatchHoverMenu.vue: 2
demo/picker/controls/…/ConsoleRail.vue: 1          demo/palettes/browser/card/CurrentPaletteEditor.vue: 3
$ grep -r '<WatercolorDot' demo --include=*.vue -A8 | grep -c 'tag="'   →  21
```

**21 instances across 10 files.** `MixSourceSelector.vue:164-176` is the identical
`tag="button" aria-label @click :disabled` add-slot — the Mix workbench's add gesture is dead by the
same mechanism.

### Why no gate can see it

`vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0**. Vue's fallthrough-attribute typing accepts any
undeclared attribute on a component, and `inheritAttrs: false` is invisible to the consumer's types.
This is pass-4's N-2 (`Button variant="ghost"`) generalised: N-2 was a prop that did nothing
*cosmetically*; N-5 is the same class making a **control** do nothing.

**Cure.** `WatercolorDot` is a *decoration*, and its producer correctly says so (`aria-hidden`,
`pointer-events: none`). Stop asking a decoration to be a control: wrap it in a real
`<button>`/glass-ui `Button` that owns the name, the focus ring, the tap target and the handler, and
put the dot inside as the visual. That is one change at each of the 21 sites and needs no producer
work. Separately, relay to glass-ui (standing BH/BI edict): a component that silently swallows
`$attrs` while its consumers pass a `tag` prop it never declared should either forward `$attrs` or
fail loudly.

---

## N-6 · BLOCKER (NEW) — one save click on the LAN origin the repo publishes destroys the user's colours and unmounts the pane

### The unguarded call

`usePaletteStore.ts:85` — `id: crypto.randomUUID()`, on the save path, with no guard.
`Crypto.randomUUID()` is a **secure-context-only** API. `vite.config.ts:285` sets
`server.host: true`, and the server is bound `*:9000` (`lsof -nP -iTCP:9000 -sTCP:LISTEN` →
`TCP *:9000 (LISTEN)`), so the dev server publishes `http://<lan-ip>:9000` — the documented
mobile/iOS-Safari testing path — which is **not** a secure context.

### Measured — `repro-C10-insecure-uuid.mjs`, both origins, real modules through Vite's `/@fs/` graph

```
===== CONTROL  http://localhost:9000 =====
context      : {"isSecureContext":true,"hasCrypto":true,"hasGetRandomValues":true,"typeofRandomUUID":"function"}
createPalette: {"threw":null,"before":0,"after":1}
createSlug   : {"threw":null,"slug":"probe-palette-f030bb09"}

===== LAN      http://10.152.11.41:9000 =====
context      : {"isSecureContext":false,"hasCrypto":true,"hasGetRandomValues":true,"typeofRandomUUID":"undefined"}
createPalette: {"threw":"TypeError: crypto.randomUUID is not a function"}
createSlug   : {"threw":"TypeError: crypto.randomUUID is not a function"}
idempotency  : {"threw":"TypeError: crypto.randomUUID is not a function"}
```

Three unguarded call sites in this pane's dependency cone: `usePaletteStore.ts:85`,
`usePaletteStore.ts:147`, `utils.ts:15` (plus `api/palettes.ts:80,145,161`).

### The end-to-end user gesture — `repro-C13-lan-save-detail.mjs`

Seeded a three-colour current palette and an empty library, then clicked the save control once at
`http://10.152.11.41:9000/#/palettes`:

```
BEFORE: { "secure": false, "hasWell": true,  "hasGrid": true,  "hasSaveBtn": true,
          "storedPalettes": 0, "currentColorsInPickerStore": 3,
          "appHtmlLen": 87163, "panesOnScreen": 1,
          "paneText": "Current Palette | 3 colors | backend offline — saved locally" }

AFTER : { "secure": false, "hasWell": false, "hasGrid": false, "hasSaveBtn": false,
          "storedPalettes": 0, "currentColorsInPickerStore": 0,
          "appHtmlLen": 24984, "panesOnScreen": 0,
          "bodyTail": "…| This panel hit an unexpected error. | crypto.randomUUID is not a function | Try again" }
```

Three facts, in order of severity:

1. **`currentColorsInPickerStore: 3 → 0`.** The user's three colours are **destroyed**, in
   `localStorage`, permanently. `saveCurrentPalette` (`CurrentPaletteEditor.vue:261-264`) emits
   `saved` and then unconditionally emits `clearCurrent`; Vue's `emit` routes the handler throw
   through `callWithErrorHandling`, so line 261 does not abort line 264. The wipe lands.
2. **`storedPalettes: 0 → 0`.** Nothing was saved. `crypto.randomUUID()` is evaluated while building
   the object literal at `usePaletteStore.ts:84-92`, before the `unshift` at `:93` — so the write
   never happens. Source destroyed, destination empty.
3. **`appHtmlLen 87163 → 24984`, `panesOnScreen 1 → 0`.** The error boundary tears the entire pane
   out and offers **"Try again"** — which cannot restore three deleted colours.

### This is the exact defect `usePaletteActions.ts:65-72` claims to have cured

> *"save-P0 (local-first inversion): a save is a local, destructive gesture — `createPalette` must
> run UNCONDITIONALLY so a save with the backend down loses zero data … The prior `await
> ensureUser()` here inverted the contract: on an unreachable backend it threw before
> `createPalette` ran and the palette was silently destroyed."*

The cure removed the **network** throw and left an unguarded **platform-API** throw in the identical
position, producing the identical outcome. The invariant the comment names — *a save loses zero
data* — is still false; only its trigger moved.

**Cure.** Two independent, both required. (a) Make the id minter total:
`crypto.randomUUID?.() ?? <getRandomValues-based v4>` in one place — `crypto.getRandomValues` **is**
available in insecure contexts (`hasGetRandomValues: true`, measured above), so this is four lines,
not a polyfill dependency. (b) Make the clear conditional on the save having happened:
`onCurrentPaletteSaved` must return the palette (or throw a typed failure) and
`saveCurrentPalette` must only `emit("clearCurrent")` on success. A destructive gesture may not be
sequenced before its own confirmation.

---

## N-7 · MAJOR (NEW) — the shipping export path: two live injection vectors, a rejecting empty case, collapsed filenames, and every failure UI-silent

`PalettesPane.vue:96` wires `@export="(p, fmt) => onExport(p, fmt)"` → `usePaletteExport.ts:12-24`
→ `demo/palettes/export.ts`. The palette **name** is user-authored (inline rename,
`PaletteCard.vue:285-288`) **and** arrives from the network — `addPublishedPalette`
(`usePaletteStore.ts:121-151`) copies a remote palette's name straight into the local store. The
colour strings are raw CSS. No prior C-pass examined this path at all.

Measured with the REAL modules in a real browser — `repro-C14-export-hostile.mjs`:

```json
{
  "ampersandName": { "xml": "PARSE ERROR: … error on line 3 at column 114: xmlParseEntityRef: " },
  "ampersandPng":  "REJECTED: Failed to load SVG for PNG conversion",

  "markupName":    { "xml": "well-formed", "containsRawScriptTag": true,
                     "filename": "text-script-alert-1-script-text.svg" },

  "quotedColor":   { "xml": "well-formed",
                     "rect": "<rect x=\"0\" y=\"0\" width=\"60\" height=\"80\" fill=\"red\" onload=\"alert(1)\" />" },

  "emptySvg":      { "width": "0" },
  "emptyPng":      "REJECTED: Failed to create PNG blob",

  "emojiFilenames":{ "json": ".json", "css": ".css", "svg": ".svg",
                     "cssBody": ":root {\n  --palette--0: #f00;\n}" },

  "wide":          { "colors": 80, "svgWidth": 4800, "pngCanvasWidth": 9600 },

  "downloadTiming":{ "createdCount": 1, "revokedCount": 1, "sameTick": true,
                     "msBetweenCreateAndRevoke": 0.3, "anchorWasInDocumentAtClick": false },

  "onExportReturn":{ "isUndefined": true }, "onExportUnknownFormat": true
}
```

| id | defect | mechanism |
|---|---|---|
| **X-1** | a palette named `Reds & Blues` exports a **malformed** `.svg` no viewer opens, and its PNG export **rejects** | `export.ts:74` interpolates `palette.name` into XML text content unescaped; `&` is a fatal XML parse error |
| **X-2** | a palette named `</text><script>alert(1)</script><text>` exports a **well-formed SVG containing a live `<script>`** — `containsRawScriptTag: true` | same line; an SVG opened directly in a browser executes its scripts, and names arrive from the network via `addPublishedPalette` |
| **X-3** | a colour string containing `"` yields `<rect fill="red" onload="alert(1)" />` | `export.ts:68` interpolates `c.css` into an **attribute** unescaped |
| **X-4** | PNG export of a zero-colour palette **rejects** | `export.ts:64` → `width=0` → `<svg width="0">` → 0-px canvas → `toBlob` returns `null` per HTML spec. `PaletteCard.vue:220-223` calls a zero-colour palette *"a real, reachable state"* |
| **X-5** | a name with no `[a-z0-9]` (emoji, CJK, Cyrillic, pure punctuation) downloads as `.json` / `.css` / `.svg` — a **dotfile with no stem** — and every such palette emits the colliding token `--palette--0` | `export.ts:9-11` `slugify` returns `""` and nothing guards it |
| **X-6** | the object URL is revoked **0.3 ms** after `a.click()`, on an anchor never inserted into the document | `export.ts:126-131`. The repo's own certification matrix is **Safari** desktop + mobile — the engine where this pattern historically drops the download |
| **X-7** | **every** failure above is UI-silent | `usePaletteExport.ts:21-23` `console.warn`s; `onExport` returns `undefined` on success, on rejection **and on an unknown format** (`onExportUnknownFormat: true` — the `switch` has no `default`); `PalettesPane.vue:96` discards it |

X-7 is the compounding one: the same file **does** have a feedback channel and uses it for publish
(`PalettesPane.vue:199-209` → `card.showFeedback(...)`). Export was wired past it. A failed export
is indistinguishable from a successful one.

**Cure.** The repo already owns the fix and ships it on the dead path: `export/serializers.ts`
exports `xmlEscape`, and `demo/test/export/byte-exact.test.ts:112-115,187-195` asserts exactly this
escaping — against a serializer no user can reach (see challenge-L's L-2). Land the escaping and a
`""`-slug guard on the *live* path today, independent of the D57 one-or-the-other decision; give
`onExport` a `Result` return and route it through `showFeedback` exactly as publish is; drop the
same-tick revoke to a `setTimeout(…, 0)` after appending the anchor.

---

## N-8 · MAJOR (NEW) — the saved-palette grid is an ARIA `list` that owns zero `listitem`s

`PalettesPane.vue:75-98` places `<PaletteCard>` children — root `role="article"`
(`PaletteCard.vue:22`) — inside `<PaletteCardGrid>` whose root is `role="list"`
(`PaletteCardGrid.vue:3`). ARIA 1.2 makes `listitem` a **required owned element** of `list`.

Measured from Chrome's own AX tree — `repro-C15-list-semantics.mjs`, three seeded palettes:

```
AX lists on /#/palettes  : [ { "name": "", "childRoles": ["article","article","article"],
                               "listitemChildren": 0, "setsize": null } ]
AX listitem nodes anywhere: 0
AX article nodes          : [ {name:'Palette: Alpha'}, {name:'Palette: Bravo'}, {name:'Palette: Charlie'} ]
DOM cross-check          : { "gridRole": "list", "elementChildRoles": ["article","article","article"],
                             "cardsWithListitem": 0 }
```

Consequence: the library announces as an **empty list**. No set size, no position-in-set, and
VoiceOver's/NVDA's list navigation finds nothing to step through. The palettes are individually
labelled (`Palette: Alpha`) and individually fine — they are simply not *enumerable*, which is the
entire reason `role="list"` was written.

The same probe re-confirms pass-3's P-2 with my own numbers: `cardTabIndex: [-1,-1,-1]`,
`gridFocusables: ["BUTTON[Palette menu]" ×3]`, and 16×16 `svg.drag-handle` targets (WCAG 2.5.8
floor is 24×24).

**Cure.** Either give each card `role="listitem"` (keeping `article` on an inner wrapper if the
landmark is wanted), or drop `role="list"` and let the cards be plain articles. The one thing that
cannot stand is a list that claims a structure it does not have.

---

## N-9 · MINOR (NEW) — component instances are held in a **deep** `reactive()` Record

`PalettesPane.vue:177`:

```ts
const cardRefs = reactive<Record<string, InstanceType<typeof PaletteCard>>>({});
```

Measured against the exact Vue build the app runs — `repro-C16-reactive-refs.mjs`:

```json
{ "vueVersion": "3.5.35", "storedIsProxied": true, "identityPreserved": false,
  "toRawRecoversIt": true, "nestedAlsoProxied": true }
```

`cardRefs[id]` never returns the instance — it returns a reactive **Proxy** of it
(`identityPreserved: false`), and deep tracking walks into `instance.$`, the
`ComponentInternalInstance` (`nestedAlsoProxied: true`), proxying vnodes, the render effect and the
subtree on demand. This is the case Vue's own guidance names as the reason to reach for
`shallowRef`/`markRaw`, and owner edict **7** (idiomatic Vue 3.5, `shallowRef` where deep reactivity
is wrong) is violated by construction. It compounds pass-4's N-4: the map is *also* never pruned, so
every proxy and every disposed instance it wraps is retained for the pane's lifetime.

**Cure.** The map should not exist. Pass-4's N-4 already argues it: feedback is *state*
(`{ id, message, variant }` on the library port, bound as a prop), and the imperative
`defineExpose({ showFeedback })` handle at `PaletteCard.vue:244` is the only thing keeping it alive.
Deleting the handle deletes the map, the proxies, the leak and the write-into-a-corpse in one move.

---

## Test truth — measured first-hand, and worse than pass 4 recorded

Pass 4 established that no vitest file imports this pane's surface. That still holds. What it did
not check is the **e2e** layer, and that is where the real finding is.

**`e2e/smoke/flows/palette-save.spec.ts` is the one automated test that exercises this pane's core
gesture. I ran it. It is RED:**

```
$ npx playwright test --project=smoke e2e/smoke/flows/palette-save.spec.ts --reporter=line
  1) [smoke] › e2e/smoke/flows/palette-save.spec.ts:20:1 › save current palette persists to localStorage 'color-palettes'
     Test timeout of 30000ms exceeded.
     Error: locator.click: Test timeout of 30000ms exceeded.
     Call log:
       - waiting for getByRole('main', { name: 'Color tool panes' })
           .getByRole('button', { name: /Add current color .* to palette/ }).filter({ visible: true })
     > 37 |         .click();
  1 failed
```

It fails on **exactly** the element N-5 proves is dead — `getByRole("button", …)` against a
`<span aria-hidden="true">`. The spec's own comment (`:29-31`) still describes the working world:
*"The button is icon-only with accessible label 'Add current color … to palette'."* The Glass 7
adoption (W44, "ADOPTED WHOLE") broke it, and nothing observed the break, because:

```
$ ls .github/workflows/            →  ci.yml  deploy-pages.yml  release.yml
$ grep -rln "playwright\|e2e" .github/   →  (no output)
```

**e2e is not wired into CI at any point.** `demo-typecheck` and `test` were flipped hard at D48/D56;
the layer that would have caught a dead control was left ungated. That is the structural reason a
BLOCKER-severity regression shipped through a close that called itself GREEN.

### Mutations that keep every configured gate green

Extending pass-4's ten:

11. Delete `tag="button"`, `aria-label` and `@click` from any of the 21 `WatercolorDot` sites —
    **already proven inert** (N-5). `vue-tsc` exit 0, vitest untouched, e2e not run.
12. Delete `xmlEscape` from `export/serializers.ts`'s public surface — the shipping path never
    calls it, and the 78 byte-exactness assertions test the dead path (challenge-L L-2).
13. Change `role="list"` to `role="grid"` on `PaletteCardGrid` — no assertion anywhere reads it.

---

## Independent re-verification of the standing BLOCKERs

I did **not** re-run pass 4's four (P-1 store whiteout, C-1 first-drag scramble, C-2 filtered
reorder, C-3 kebab-case emit keys). Pass 4 measured each of them twice, offline and live, with
pasted output; re-running them would consume budget without moving the record. They stand as
written in `challenge-C-implementation.pass-4-prior.md`. Two of them are *strengthened* by this
pass:

- **C-3** (`commitEdit`/`cancelEdit` never reach a handler) now has a visible consequence: the edit
  overlay's Save/Cancel buttons (`CurrentPaletteEditor.vue:75-80`) are the one part of the current-
  palette surface that *is* a real `<button>` with a real `aria-label` — and their emits are dead.
- **P-1** (`{"version":1}` whiteouts the app) shares a mechanism family with N-6: both are a
  boundary input the code assumes cannot occur — an untrusted payload, an unavailable platform API.

---

## Negative proof — what I checked this pass and found sound

Stated so DEFECTIVE is not read wider than it is. These are **my** measurements.

- **The confirm-dialog surface is genuinely good.** Re-read at `PalettesPane.vue:102-122`: single
  `v-model:open`, `DialogTitle` + `DialogDescription` both present, a `Cancel` that is the safe
  default, `tone="destructive"` used correctly on the destructive arm. Pass 4 measured focus move,
  Escape, and focus restoration — I found no reason to disturb that result.
- **`surface`, `showClose`, `tier`, `size`, `emphasis`, `tone`, `iconOnly`, `variant` (on `Badge`),
  and `SearchBar`'s `modelValue`/`placeholder` are all REAL props**, verified against
  `dist/components/{surface,dialog,search,badge}/…d.ts`. `Card tier="resting"` in particular is
  legitimate — `SurfaceProps.tier?: SurfaceTier` and `SURFACE_TIERS` includes `"resting"`
  (`_shared/axes.d.ts:5`). Do not sweep these with N-5 or pass-4's N-2.
- **`useFilteredList` is correct** (`useFilteredList.ts:8-12`) — an empty query returns the source
  array by identity, which is what makes pass-4's C-1 possible, but the composable itself is right.
- **`usePaletteActions.onDeleteAllSaved` iterates a copy** (`:126`), so it cannot skip entries
  mid-splice. `commitColorEdit`'s `oldCss === newCss` short-circuit (`:102`, `:118`) correctly
  avoids a no-op store write.
- **The store singleton's lifecycle is sound** — lazy `getStore()`, one `useStorage` binding,
  `try/catch` serializer. Its defects are validation (P-1) and the unguarded id minter (N-6), not
  its shape.
- **PRM-RAF epidemic: zero contribution.** `grep -rn "requestAnimationFrame" demo/palettes/` → 0.
- **`defineModel` staleness: not applicable** — no `defineModel` in the file; both `v-model`s
  (`:34`, `:102`) write straight to injected refs.
- **`ValueUnit` nesting: none. WebGL: none. `parseCssColor`: never called from this pane.**
- **`verbatimModuleSyntax` honoured** — `import type { Palette }` (`:151`); `usePalettePorts.ts:2`
  and `useFilteredList.ts:1` likewise.
- **Console / page errors on `/#/palettes` are clean** with a well-formed store, in all four matrix
  cells (`consoleErrors: []`, `pageErrors: []`, `overflowX: 0`, `main: 1`) and in my own contexts.
  The only errors I observed were CORS failures against an unreachable API, and one *correct*
  boundary message (N-6).
- **`namelessButtons: 0` on all four `/#/palettes` rows** of `REPORT.json` — pass 4 reported the
  matrix showing 1 and attributed it elsewhere; the current REPORT.json shows 0 on every cell, so
  there is nothing to attribute. The matrix's blindness stands for a different reason: all four
  captures ran with an **empty** library *and* an empty current palette
  (`bodyTextLength` 280 desktop / 169 mobile), so the add-slot, the save control, the delete-all
  trigger and every card were absent from the DOM.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| **N-5** | **BLOCKER (new)** | the pane's only add-colour affordance and every current-palette swatch are dead controls — `<span aria-hidden="true">`, `pointer-events:none`, **no handler bound**; touch is fully read-only; 21 instances / 10 files; the covering e2e test is RED |
| **N-6** | **BLOCKER (new)** | one save click on the LAN origin `server.host:true` publishes **destroys** the user's colours (3→0), stores nothing, and unmounts the pane — the exact class `usePaletteActions.ts:65-72` claims cured |
| P-1 *(carried, pass 4)* | BLOCKER | `{"version":1}` in `localStorage` whiteouts the entire app on every route — `read()` casts instead of parsing |
| C-1 *(carried, pass 4)* | BLOCKER | the first drag-reorder of each page load scrambles and persists the library order |
| C-2 *(carried, pass 4)* | BLOCKER | a drag under a search filter relocates palettes the user cannot see |
| C-3 *(carried, pass 4)* | BLOCKER | `commitEdit`/`cancelEdit` never reach a handler — kebab keys in the prop bag, Vue's fallback is `update:*`-only |
| **N-7** | **MAJOR (new)** | shipping export: SVG **script injection** + attribute injection + malformed-on-`&` + empty-palette PNG rejection + collapsed filenames + same-tick URL revoke + **every** failure UI-silent |
| **N-8** | **MAJOR (new)** | the grid is `role="list"` with `listitemChildren: 0` and **0** `listitem` nodes anywhere — the library announces as an empty list |
| N-1, N-2, N-4 *(carried, pass 4)* | MAJOR | dark-scheme ramp collapse; `Button variant=` dead prop; `cardRefs` retains unmounted instances |
| P-2, P-3, P-4, C-4, C-5 *(carried, pass 3)* | MAJOR | keyboard-dead expand; undeletable orphan; inert PRM guard; app-global `searchQuery`; false empty state |
| **N-9** | **MINOR (new)** | component instances held in a **deep** `reactive()` Record — proxied, identity-broken, internals tracked |
| P-5, P-6, P-9 *(carried)* | MINOR/INFO | `demo/ui` alias layer; no live region + leaked dismiss timer; three dead imports |

**Strongest defect: N-5.** P-1's blast radius is wider, but N-5 is the one that makes the component
*not do its job at all*: the pane exists to let a user assemble and save a palette, and the gesture
that starts that is inoperable by mouse on touch devices, by keyboard everywhere, and by assistive
technology everywhere — while the pane's own empty state instructs the user to perform it. It is
also the one with a **failing test already on disk**, unobserved only because e2e is absent from CI.

**Strongest NEW defect after N-5: N-6**, for what it says about the repair record — a cure comment
that names the exact invariant (*"a save … loses zero data"*) sitting directly above code that
still violates it, because the fix addressed a trigger rather than the sequencing.

## Artifacts (all read-only probes, all beside this report)

`repro-C10-insecure-uuid.mjs` · `repro-C11-save-destroys.mjs` · `repro-C12-add-slot-dead.mjs` ·
`repro-C13-lan-save-detail.mjs` · `repro-C14-export-hostile.mjs` · `repro-C15-list-semantics.mjs` ·
`repro-C16-reactive-refs.mjs` · `repro-C17-touch-swatches.mjs`
(pass 1–4 probes `repro-C1`…`repro-C9` retained unchanged)
