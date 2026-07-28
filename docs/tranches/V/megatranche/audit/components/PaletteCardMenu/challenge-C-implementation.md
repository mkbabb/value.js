# CHALLENGE-C — `PaletteCardMenu.vue` implementation audit (pass 2)

## Model receipt

I observe myself to be **Opus 5** — model id `claude-opus-5[1m]`, the 1M-context variant. That is the
tier this seat was explicitly spawned with; it is declared, not inherited.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Date: 2026-07-28
- Verdict: **DEFECTIVE** — 2 BLOCKER, 6 MAJOR, 6 MINOR, 2 INFO
- The prior seat's pass-1 report is preserved verbatim at
  `challenge-C-implementation.pass-1-2026-07-28.md`. Every pass-1 finding was independently
  re-tested here; two were **confirmed and strengthened**, one was **converted from hypothesis to
  live reproduction**, and one had its *consequence* measured for the first time. Eight findings
  below are new.

---

## Executive summary

The file is a 173-line template over a 53-line script. The script holds three lines of logic. The
pass-1 seat found two of the three wrong and one template modifier fatal on touch; all three hold
up under independent test. What pass 1 did **not** reach is the larger defect: **this menu's action
contract is a bare `string` emitted into a host that may or may not have bound a listener, and at
three of its five shipping host sites the majority of the items — including `Delete` — are wired to
nothing at all.** The user opens the menu, clicks Delete, and the palette is still there. No error,
no feedback, no console line.

| id | severity | one line | status |
|---|---|---|---|
| **C2-1** | **BLOCKER** | 22 menu-item instances across 3 of 5 host sites are inert — `Delete` on `/#/mix` leaves the store at 8/8 while the same click on `/#/palettes` takes it 8 → 7 | **NEW** |
| **C2-2** | **BLOCKER** | `@click.prevent` (`:108`) kills the whole Export submenu on pointer input; causality closed with an independent discriminator | confirms pass-1 C-1 |
| **C2-3** | MAJOR | the Export items write attacker-controlled markup to disk — a remote palette's `css` string broke out of `fill="…"` into `onload="alert(1)"` in a downloaded SVG; and a 0-colour palette's PNG export fails silently | **NEW** |
| **C2-4** | MAJOR | `apiOffline` misses `misconfigured`; measured consequence — Publish stays enabled and produces the wrong error, *"Failed to create session"* | upgrades pass-1 C-2 |
| **C2-5** | MAJOR | an `unlisted` palette renders **byte-identical** to a public one — live-reproduced, not derived | upgrades pass-1 C-3 |
| **C2-6** | MAJOR | choosing `Rename` gives the input focus for 212 ms, then reka's focus-restore takes it back to the trigger — measured frame-by-frame | **NEW** |
| **C2-7** | MAJOR | 30 × `<button>` inside `<button>` on `/#/mix` — the menu trigger is nested inside a selection control | **NEW** |
| **C2-8** | MAJOR | vacuous gate: the repo has **no component-test infrastructure at all** (`@vue/test-utils` is an unused devDependency; zero `mount(` calls in `test/` or `demo/test/`), and zero e2e coverage of Export or visibility | strengthens pass-1 C-4 |
| C2-9 | MINOR | the K-INV5 annotation folds into the accessible name — AT hears *"Make private PUBLIC"* and *"Publish OFFLINE"* | **NEW** |
| C2-10 | MINOR | the availability latch gates 2 of ~9 network-bound actions | **NEW** |
| C2-11 | MINOR | the same enum→boolean collapse occurs twice: `visibility` (3-state) and `tier` (3-state, `archived` mislabelled) | **NEW** |
| C2-12 | MINOR | `style="font-variant: small-caps"` inline, twice — the "K-INV5 register" is two copy-pasted per-instance overrides (edict 5) | **NEW** |
| C2-13 | MINOR | pressing the menu trigger squashes the whole card — measured `scale: 1.0079 0.9592` | **NEW** |
| C2-14 | MINOR | `Delete` is unconfirmed and irreversible on the owner path (12 → 11, no dialog) while the admin path *is* confirmed | **NEW** |
| C2-15 | INFO | the modal lock puts `overflow:hidden` on `<body>` while the real scroll container is an inner div — the page is pointer-inert yet still scrollable under an open menu | **NEW** |
| C2-16 | INFO | the 8-matrix Safari sweep captured **zero** PaletteCards; this component has no visual coverage | confirms pass-1 C-9 |

Pass-1 C-5 / C-6 / C-7 / C-8 were re-checked and stand; C-6 now has a measured consequence (see C2-6).

---

## C2-1 — BLOCKER: 22 menu-item instances are wired to nothing

### The mechanism

`PaletteCardMenu.vue:224-227` emits an untyped string:

```ts
defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
```

`PaletteCard.vue:315-316` converts that string into a *second* emit and swallows misses:

```ts
const fn = actions[action];
if (!fn) return;
```

Every one of the 17 actions then leaves `PaletteCard` as a **separate declared emit**
(`PaletteCard.vue:200-218`). Vue drops an emit with no listener silently. So whether a menu item
does anything is decided by a `@`-binding in a host file that neither `PaletteCardMenu` nor
`PaletteCard` can see, and nothing — not the type system, not a test, not a console warning —
reports a host that forgot one.

### The host matrix (enumerated from the tree, all five sites)

| host | file:line | kind rendered | items shown | items bound | **dead** |
|---|---|---|---|---|---|
| `PalettesPane` | `demo/palettes/PalettesPane.vue:82` | `saved` | Publish, Rename, Export ×5, Delete | all | 0 |
| `BrowsePane` | `demo/palettes/BrowsePane.vue:92` | `remote` | all | all | 0 |
| **`ExtractWorkbench`** | `demo/workbenches/extract/ExtractWorkbench.vue:145` | `temporary` (`id: "__extracted__"`, `useExtractSession.ts:91`) | Save, Rename, Export ×5 | `save`, `rename` | **5** |
| **`AdminUsersPanel`** | `demo/palettes/browser/admin/AdminUsersPanel.vue:140` | `remote`, `is-admin`, `isOwned` unset | Save, Remix, Versions, Export ×5, Report, Feature, Delete(admin) | `feature`, `admin-delete` | **9** |
| **`MixSourceSelector`** | `demo/workbenches/mix/MixSourceSelector.vue:264` | `saved` | Publish, Rename, Export ×5, Delete | **none** | **8** |

`MixSourceSelector.vue:264-267` binds nothing at all:

```html
<PaletteCard
    :palette="palette"
    :css-color="''"
/>
```

### Reproduction — executed, live, with a control

Probe `evidence/pass-2/pcm-p2-f.mjs` against `http://localhost:9000`, 8 seeded local palettes.

**Subject — `/#/mix`, Palettes mode, click `Delete`:**

```
::mix_cards 8
::mix_storeBefore 8
::mix_menuItems ["Publish","Rename","Export","Delete"]
::mix_afterDelete {
 "storeN": 8,          ← unchanged
 "cards": 8,           ← unchanged
 "feedback": null,
 "dialog": null,
 "menusInDom": 0       ← the menu closed, so the user believes it worked
}
```

**Control — `/#/palettes`, same component, same item** (probe `pcm-p2-e.mjs`):

```
::E1_menuOpen  { menus: 1, articles: 8 }
::E2_afterDelete { articles: 7 }
::E2_storeN 7
```

8 → 7. The only difference between the two runs is whether the host wrote `@delete`.

**Export, same pair:**

```
::mix_downloads []                              (/#/mix — Export → JSON)
::palettes_downloads_CONTROL ["probe-palette-0.json"]   (/#/palettes — Export → JSON)
```

The submenu opens, the item is focusable, the click registers, the menu closes — and no file is
produced. `::mix_jsonItemPresent 1` confirms the item was really there and really clicked.

### Why this outranks everything else

It is a **destructive verb that silently does nothing** on a route the user can reach in two clicks.
It is also the general case of pass-1 C-5: that seat found the mirror-image symptom (a `copyAll`
handler no item emits) and rated it MINOR. The forward direction — items no handler receives — is
22 live instances, and the swallow at `PaletteCard.vue:316` is what makes both invisible.

### Cure

The architectural transposition, not a patch: **make the action set a type, and the dispatch table
total.**

```ts
// beside the menu, one declaration
export type PaletteCardAction =
    | "save" | "publish" | "makePublic" | "makePrivate" | "fork" | "rename"
    | "editTags" | "versions" | "delete" | "flag" | "feature" | "adminDelete"
    | "exportJSON" | "exportCSS" | "exportTailwind" | "exportSVG" | "exportPNG";

defineEmits<{ action: [action: PaletteCardAction]; … }>();
const actions: Record<PaletteCardAction, () => void> = { … };   // exhaustive; delete `if (!fn) return`
```

That kills the swallow and makes `copyAll` a compile error — but it does **not** by itself fix
C2-1, because the loss is at the *host* boundary. The second half is the real cure: the menu must
not offer an item its host cannot service. Derive the item list from a declared capability set the
host passes in (or, equivalently, from the handlers the host provides), so `MixSourceSelector` —
which wants a *selection card*, not an action surface — renders a card with no menu at all rather
than a menu of eight lies. Edict 3 (KISS) points the same way: a source-picker does not need a
16-item palette-management menu.

---

## C2-2 — BLOCKER: `@click.prevent` makes the Export submenu unreachable by pointer

Pass-1 C-1. Re-tested from scratch, and the causal chain closed with a **different** discriminator
than pass 1 used.

`PaletteCardMenu.vue:108`

```html
<DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
```

### Symptom — real CDP touch input (probe `pcm-p2-b.mjs`, `hasTouch: true`)

```
::subBeforeTouch    {"ariaExpanded":"false","dataState":"closed","menuCount":1}
::subAfterTouchTap  {"ariaExpanded":"false","dataState":"closed","menuCount":1}
::subItemsAfterTouch  ["Publish","Rename","Export","Delete"]

::subAfterMouseHover {"ariaExpanded":"true","dataState":"open","menuCount":2}
::subItemsAfterHover ["Publish","Rename","Export","Delete",
                      "JSON","CSS Custom Properties","Tailwind Config","SVG Swatch","PNG Swatch"]
```

Touch tap: 4 items, submenu closed. Mouse hover on the identical element: 9 items, submenu open.

### Discriminator — is `.prevent` the cause, or do reka sub-triggers just not open on click?

Probe `pcm-p2-j.mjs` dispatches the *same* `MouseEvent` twice; the only difference is that the
second one's `defaultPrevented` getter is pinned to `false`, which neutralises `.prevent` and
nothing else:

```
::J1_plainClick  {"defaultPreventedAfterDispatch": true}
::J1_after       {"ariaExpanded":"false","menuCount":1,"itemCount":4}

::J2_pinnedClick {"pinned": false}
::J2_after       {"ariaExpanded":"true","dataState":"open","menuCount":2,"itemCount":9}
::J2_items ["Publish","Rename","Export","Delete","JSON","CSS Custom Properties",
            "Tailwind Config","SVG Swatch","PNG Swatch"]
```

Hypothesis "reka sub-triggers never open on click" is **falsified**: the same click opens it once
`defaultPrevented` is false. `data-disabled` is `null` on the element in both runs, so
`event.defaultPrevented` is the only branch that can bail.

### The two source facts that produce it

`node_modules/reka-ui/dist/Menu/MenuSubTrigger.js` — the guard:

```js
onClick: async (event) => {
    if (props.disabled || event.defaultPrevented) return;
    …
    if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
}
```

`node_modules/reka-ui/dist/Primitive/Slot.js:16` — the merge order that puts the consumer first:

```js
const mergedProps = firstNonCommentChildren.props
    ? mergeProps(attrs, firstNonCommentChildren.props)
    : attrs;
```

and `node_modules/reka-ui/dist/Menu/utils.js` — why hover does not rescue touch:

```js
function isMouseEvent(event) { return event.pointerType === "mouse"; }
```

`handlePointerMove` early-returns for `pointerType: "touch"`, so touch has only the click path, and
the click path is dead.

### Corroborating datum

```
$ grep -rn "DropdownMenuSubTrigger" demo --include="*.vue"
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:108
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:111
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:188
```

This is the **only** sub-menu in the demo. There is no second instance to have caught the mistake by
comparison, and there is no test (C2-8).

### Cure

Delete the modifier. `preventDefault` on a `div[role=menuitem]` suppresses no browser default, and
"don't close the menu" is already the primitive's behaviour for a sub-trigger (it never emits
`ITEM_SELECT`). Removal is a strict simplification.

---

## C2-3 — MAJOR: the Export items write attacker-controlled markup to disk, and fail silently at the domain boundary

These paths are reachable **only** through this menu (`grep -rn "onExport" demo` → the card-menu
chain and nothing else), so the seat owns them even though the code sits in `demo/palettes/export.ts`.

### (a) Injection — measured

`demo/palettes/export.ts:63-80` interpolates both `c.css` and `palette.name` raw:

```ts
(c, i) => `  <rect x="${i * swatchW}" … fill="${c.css}" />`
…
`  <text … fill="#333">${palette.name}</text>`,
```

Probe `pcm-p2-i.mjs` seeded one palette named `Ampersand & <tag> "quote"` with a colour
`'#00ddaa" onload="alert(1)'`, then used the menu: **Export → SVG Swatch**. The downloaded file:

```
::HOSTILE_svg  downloads: ["ampersand-tag-quote.svg"]
body:
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="110" viewBox="0 0 120 110">
  <rect x="0" y="0" width="60" height="80" fill="#ff0055" />
  <rect x="60" y="0" width="60" height="80" fill="#00ddaa" onload="alert(1)" />
  <text … fill="#333">Ampersand & <tag> "quote"</text>
</svg>
```

The `css` string broke out of the `fill` attribute and injected an event handler; the name injected
an unescaped `&` and a `<tag>`, which also makes the document not well-formed XML.

**Reachability is end-to-end.** `api/src/modules/palette/schema.ts:28` validates a colour as
`css: z.string().min(1).max(200)` — no colour grammar, no escaping. The 25-character payload above
is accepted, persisted, and served to every user browsing the public wall. Any user who then uses
`Export → SVG Swatch` on that palette writes a file containing another user's markup and event
handler to their disk; opening it in a browser executes it.

### (b) The same malformation then kills PNG export

```
::HOSTILE_png  downloads: []
newWarnings: ["warning: Export failed: Error: Failed to load SVG for PNG conversion
               at img.onerror (…/demo/palettes/export.ts:89:11)"]
```

### (c) Zero-colour palette — silent failure and a corrupt artefact

A palette with no colours is documented as "a real, reachable state" at `PaletteCard.vue:220-222`.
Through the menu:

```
::EMPTY_png {"downloads": [],
  "newWarnings": ["warning: Export failed: Error: Failed to create PNG blob
                   at …/demo/palettes/export.ts:83:13"]}

::EMPTY_svg {"downloads": ["zero-color-palette.svg"],
  "body": "<svg … width=\"0\" height=\"110\" viewBox=\"0 0 0 110\">\n\n  <text x=\"0\" …>"}

::EMPTY_css {"downloads": ["zero-color-palette.css"], "body": ":root {\n\n}\n"}
```

PNG: nothing downloads, and the only trace is a `console.warn` — `usePaletteExport.ts:22-24`:

```ts
} catch (e) {
    console.warn("Export failed:", e);
}
```

The card owns an `ActionFeedback` channel and a `defineExpose({ showFeedback })`
(`PaletteCard.vue:244`) that the export path never uses. SVG: a 0-pixel-wide file downloads and
reads as success. That silent-catch is a masking fallback under edict 2.

### Cure

Escape at the boundary (`&`, `<`, `>`, `"` for both the text node and the attribute) — or, better,
build the SVG with `document.createElementNS` + `setAttribute`, which cannot be broken out of by
construction and is no more code. Guard `colors.length === 0` before offering the raster/vector
items at all, and route every `catch` in `usePaletteExport` into `showFeedback(msg, "error")` — the
channel already exists and is already wired.

---

## C2-4 — MAJOR: the availability latch is read with a partial equality; the measured consequence is a *wrong* error

Pass-1 C-2, with the user-visible consequence measured for the first time and a positive control
added.

`PaletteCardMenu.vue:216-217`

```ts
const { availability } = useApiClient();
const apiOffline = computed(() => availability.value === "unavailable");
```

`demo/platform/transport/availability.ts:40-44` — the latch is 4-state:

```ts
export type ApiAvailability = "unknown" | "available" | "unavailable" | "misconfigured";
```

`misconfigured` is the *harder* failure: `availability.ts` short-circuits every transport call in
that state with a synchronous `DevMisconfigError`.

### The state of the running dev server, and what the item does in it

`http://localhost:9000` is `misconfigured` right now — the loud console line is emitted only from
the `misconfigured` branch:

```
::consoleErrors ["[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no
  VITE_API_URL and is targeting the cross-origin production API (https://api.color.babb.dev) …"]
```

The AX tree for the same page (probe `pcm-p2-a.mjs`) shows the Publish item live:

```
::AX_menuItems [ … {"role":"menuitem","name":"Publish","disabled":null} … ]
::items        [ … {"text":"Publish","ariaDisabled":null,"dataDisabled":null,"pe":"auto"} … ]
```

Clicking it (probe `pcm-p2-b.mjs`) produces a **misleading** failure:

```
::afterPublishVisibleFeedback "Failed to create session"
```

Not "dev misconfigured", not "backend offline". The component's own header comment (`:24-26`)
states the contract it breaks:

> `K-INV5: a tripped availability latch disables the doomed action and NAMES the degraded state in-register`

### Positive control — the latch mechanism itself is fine

Probe `pcm-p2-h.mjs` serves the app from the LAN host (non-loopback, so `detectDevMisconfig` is
false) and aborts every API request, tripping the latch to `unavailable`:

```
::lampVariants [ … {"v":"unavailable","role":"status","text":"backend offline — saved locally"} … ]
::itemsUnderUnavailableLatch [
 {"text":"Publish offline","ariaDisabled":"true","dataDisabled":"","pe":"none"},
 {"text":"Rename",…}, {"text":"Export",…}, {"text":"Delete",…}]
::axNames [{"name":"Publish OFFLINE","disabled":true}, …]
```

So the disable + annotate machinery works. The defect is exactly and only that `misconfigured` is
not in the predicate.

### The repo has already codified the law this violates

`test/status-lamp.test.ts:88` is a passing unit test named

```
it("misconfigured ≠ unavailable — distinct variants AND distinct roles", …)
```

and `demo/palettes/browser/status/ApiOfflineChip.vue:35-37` — the sibling consumer of the same
injected seam, in the same feature area — derives both:

```ts
const offline = computed(() => availability.value === "unavailable");
const misconfigured = computed(() => availability.value === "misconfigured");
```

`PaletteCardMenu` is the only latch consumer that collapses four states into one equality.

### Cure

Do not add a fourth hand-rolled copy of the predicate. `useApiClient()` owns the latch — it should
expose the derived state once (`degraded`, plus the *reason* so the annotation can name it), and all
three consumers read it. That kills the drift class; the local `|| "misconfigured"` patch only kills
this instance of it.

---

## C2-5 — MAJOR: an `unlisted` palette renders byte-identical to a public one — **live-reproduced**

Pass-1 C-3 derived this truth table from source and honestly labelled it *not executed*. It is now
executed.

`PaletteCardMenu.vue:222`

```ts
const isPublic = computed(() => palette.visibility !== "private");
```

`demo/palettes/types.ts:39-40` — three states, not two:

```ts
/** I.W1 canonical visibility (3-state). */
visibility?: "public" | "unlisted" | "private";
```

### Reproduction (probe `evidence/pass-2/pcm-p2-g.mjs`)

Serving the app from the LAN host makes `detectDevMisconfig` false, so the transport actually issues
requests, which `page.route()` then fulfils with a stub browse feed of four owned remote palettes
(`userSlug` matched to a seeded `localStorage["palette-user-slug"]`). Rendered menus:

```
[Palette: PUBLIC palette]                -> Save | Make private public | Remix | Rename | Edit Tags | Versions 3 | Export | Delete
[Palette: UNLISTED palette]              -> Save | Make private public | Remix | Rename | Edit Tags | Versions 3 | Export | Delete
[Palette: PRIVATE palette]               -> Save | Publish private     | Remix | Rename | Edit Tags | Versions 3 | Export | Delete
[Palette: UNDEFINED-visibility palette]  -> Save | Make private public | Remix | Rename | Edit Tags | Versions 3 | Export | Delete
```

The `unlisted` row is **character-for-character identical** to the `public` row. The K-INV5
annotation — whose stated job (`:42-47`) is to name "the CURRENT state" — says `public` about a
palette that is not on the public wall, and the offered verb is `Make private`, which emits
`setVisibility(palette, "private")` and destroys the middle state with no UI path back. Both sides
of the wire promise the opposite:

- `demo/palettes/api/palettes.ts:128-130` — "The `unlisted` middle state is untouched"
- `api/src/modules/palette/service/visibility.ts:7-8` — "The `unlisted` middle state is preserved and never destroyed"
- `api/src/modules/palette/format.ts:86` — the canonical predicate is `rest.visibility === "public"`

The contract even names the lossy shape: `PaletteCard.vue:212` declares
`setVisibility: [palette: Palette, visibility: "public" | "private"]` — a two-valued emit for a
three-valued field.

### Cure

`=== "public"` is the one-token fix and repairs the `unlisted` label, but the idiomatic cure is to
stop modelling a ternary as a boolean: annotate the actual value and offer the transition that is
missing, so the control is *state display + transition* rather than a toggle that pretends the middle
state does not exist. The API treats all three as legal resting states
(`api/.../visibility.ts:41-59`); the UI is the only layer that flattened it.

---

## C2-6 — MAJOR: `Rename` gives the input focus for 212 ms and then takes it away

New. This is the measured consequence of pass-1 C-6's dead guard.

`PaletteRenameInput.vue:53-56` does the right thing:

```ts
onMounted(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
});
```

`PaletteCard.vue:291-292` claims the menu cooperates:

```ts
// `rename` opens an inline input — keep the menu open visually until the
// input takes focus; all other actions close the menu immediately.
…
if (action !== "rename") menuOpen.value = false;      // :317
```

The guard is dead — `actions.rename` is `() => startRenaming()` (`:298`), and `startRenaming`
(`:280-283`) sets `menuOpen.value = false` on its first line. So the menu closes in the same tick
the input mounts, and reka's close-time focus restoration lands **after** the input's `onMounted`.

### Measurement (probe `pcm-p2-b.mjs`, capture-phase `focusin` log + per-frame `activeElement`)

```
::focusLog [
 {"t":6424,"tag":"DIV","cls":"dropdown-menu__item interactive-item gla"},   ← the Rename item
 {"t":6431,"tag":"INPUT","ph":"Palette name...","cls":"input-bar-field"},   ← input autofocuses
 {"t":6643,"tag":"BUTTON","label":"Palette menu"}                           ← +212 ms: stolen back
]
::activeElementByFrame [
 {"tag":"INPUT","ph":"Palette name...","firstFrame":0},
 {"tag":"BUTTON","label":"Palette menu","firstFrame":11}
]
::finalActiveElement {"tag":"BUTTON","label":"Palette menu"}
```

The caret appears in the rename field for eleven frames and then vanishes. Keyboard and AT users
land back on the trigger with an un-announced text field on screen; a sighted mouse user must click
the field. Nothing announces the state change either — the input has no accessible name at all:

```
::renameInputAxName {"placeholder":"Palette name...","ariaLabel":null,"id":"","labelled":false}
```

### Cure

Delete the dead guard (pass-1 C-6) and give reka the hook that exists for exactly this:
`@close-auto-focus.prevent` on `DropdownMenuContent` for the rename path, or move focus in the
`nextTick` **after** the menu's restoration rather than racing it. The current code's comment
describes the correct behaviour; only the mechanism is missing.

---

## C2-7 — MAJOR: the menu trigger is a `<button>` inside a `<button>`, 30 times

New. `demo/workbenches/mix/MixSourceSelector.vue:250-268`:

```html
<button
    v-for="palette in savedPalettes"
    type="button"
    :aria-pressed="isPaletteSelected(palette.slug)"
    :aria-label="`${…} palette ${palette.name}`"
    @click="togglePalette(palette)"
>
    <PaletteCard :palette="palette" :css-color="''" />
</button>
```

`PaletteCard` unconditionally renders `PaletteCardMenu`, whose trigger is a native `<button>`
(`PaletteCard.vue:96-104`), and whose card root is `role="article"` — both illegal inside a button's
content model.

### Measurement (probe `pcm-p2-c.mjs`, 30 seeded palettes, `/#/mix` Palettes mode)

```
::nestedInteractiveButtons  — 30 rows, each:
 {"outerLabel":"Select palette Probe Palette 00",
  "innerCount":1,
  "inner":[{"tag":"BUTTON","label":"Palette menu"}]}
::mixArticles 30
::AX_articleNodesOnMix 30
::AX_paletteMenuNodesOnMix — 30 × {"role":"button","name":"Palette menu","ignored":false}
```

Screenshot: `evidence/pass-2/mix-palettes-mode.png` — the `…` trigger is plainly visible on every
selection row.

This is a WCAG 4.1.2 / axe `nested-interactive` violation. The only thing keeping menu use from also
toggling mix selection is a `@click.stop` on a wrapper div in a **different component**
(`PaletteCard.vue:82`) — a cross-file coupling nothing declares or tests. And the menu it guards is
100% dead here anyway (C2-1).

### Cure

The same one C2-1 wants: the selection card must not carry an action menu. Whether the menu renders
should be the host's decision, not an unconditional child of `PaletteCard`.

---

## C2-8 — MAJOR (test truth): the vacuous gate is total — there is no component-test infrastructure at all

Pass 1 said "this file has no tests". The stronger true statement:

```
$ grep -rn "@vue/test-utils" test demo e2e
(no output)
$ grep -rln "mount(" test demo/test
(no output)
```

`@vue/test-utils@^2.4.10` is a declared devDependency that **nothing imports**. `vitest.config.ts`
includes `["test/**/*.ts", "demo/test/**/*.ts"]` under `environment: "jsdom"`, and not one file in
either tree mounts a Vue component. So no unit test could fail for any Vue component in this repo,
let alone this one.

e2e coverage of this menu (six specs open the trigger) asserts on exactly two of the seventeen items:

```
e2e/smoke/flows/palette-fork.spec.ts:48        getByRole("menuitem", { name: /Remix/ })
e2e/smoke/oracles/o10d-…census.spec.ts:328     getByRole("menuitem", { name: /Versions/ })
$ grep -rn "Export\b" e2e --include="*.ts"
(no output)
$ grep -rc "Make private\|makePrivate\|SVG Swatch\|PNG Swatch\|Tailwind Config" e2e -r --include="*.ts" | grep -v ":0"
(no output)
```

### The exact mutations that keep every gate green

1. **Delete lines 107-130** — the entire `<DropdownMenuSub>` export family. Nothing references it.
   All green. *(This is precisely why C2-2 shipped: the feature could vanish and no gate would
   notice; it merely became unreachable on touch, which is strictly harder to detect than absence.)*
2. `const isPublic = computed(() => true)` — C2-5's other branch is never rendered in any test.
3. `const apiOffline = computed(() => false)` — no test puts the latch in a degraded state.
4. Delete the `@delete` binding at `PalettesPane.vue:88` — the only currently-green Delete path
   becomes as dead as `/#/mix` (C2-1), and `e2e/smoke/flows/palette-delete.spec.ts` is the sole gate
   that could catch it.

### Cure

The obstacle is real: reka menu content does not render under jsdom (pass 1 measured this, and I
reproduced the absence of any mounting infrastructure at all). The architectural transposition is
therefore the right route — extract the item table (`kind × isOwned × isAdmin × availability ×
visibility → items[]` with `label`, `annotation`, `disabled`, `action`) into a pure function this
template consumes, and unit-test that table. It needs no DOM, and it makes C2-4, C2-5, C2-9, C2-10
and C2-11 all directly assertable. The e2e half then needs exactly one touch-emulated spec that taps
Export — which would have caught C2-2 on the day it landed.

---

## C2-9 — MINOR: the K-INV5 annotation folds into the item's accessible name

New. The annotation spans (`:35-39`, `:56-59`) are children of the `menuitem`, so they concatenate
into its computed name. Measured (CDP `Accessibility.getFullAXTree`):

| state | AX name announced |
|---|---|
| owned remote, `public` or `unlisted` | `"Make private PUBLIC"` (probe `pcm-p2-g.mjs`) |
| owned remote, `private` | `"Publish private"` |
| saved, latch `unavailable` | `"Publish OFFLINE"` (probe `pcm-p2-h.mjs`) |

A screen-reader user hears "Make private public, menu item" — the name contradicts itself, and the
verb the user must reason about is buried in the middle. The visual register is well designed; the
accessible name was never separated from it.

**Cure:** give the item an explicit `aria-label` that is the verb alone (`"Make private"`) and mark
the annotation `aria-hidden="true"`, or move the state out of the item's subtree into a
`DropdownMenuLabel`. Do it once, in the glass-ui item primitive, so the register carries the
semantics with the styling — not per-instance here.

---

## C2-10 — MINOR: the latch gates 2 of ~9 network-bound actions

`:disabled="apiOffline"` appears exactly twice — `:30` (Publish) and `:51` (visibility flip). Every
other network-bound item is ungated:

| item | handler | network? | gated? |
|---|---|---|---|
| Publish (saved) | `onPublish` | yes | **yes** |
| Make public/private | `pm.onSetVisibility` | yes | **yes** |
| Delete (remote owned) | `pm.onDeleteOwned` → `deletePaletteUser` | yes | no |
| Remix | `useDialogBrowseActions.onFork` | yes | no |
| Versions | `pm.versions` drawer → fetch | yes | no |
| Report | `pm.flagged.report` | yes | no |
| Edit Tags | `pm.tagEdit` | yes | no |
| Feature / Unfeature | `useAdminUsers.onFeaturePalette` → `setPaletteFeatured` | yes | no |
| Delete (admin) | `onAdminDeletePalette` | yes | no |

Probe `pcm-p2-h.mjs` under a tripped `unavailable` latch shows only Publish disabled; Rename, Export
and Delete all report `ariaDisabled: null, pe: "auto"`. K-INV5 is applied as a decoration on two
items rather than as a property of the doomed-action class. (The same fix as C2-4 — a derived
`degraded` on the seam plus a declarative per-item `needsNetwork` flag in the extracted item table —
closes this by construction.)

---

## C2-11 — MINOR: the enum→boolean collapse happens twice in this file

C2-5 is `visibility` (3-state → boolean). The identical mechanism recurs at `:159-161` for `tier`:

```html
<Star v-if="palette.tier !== 'featured'" class="h-4 w-4" />
<StarOff v-else class="h-4 w-4" />
{{ palette.tier === 'featured' ? 'Unfeature' : 'Feature' }}
```

`types.ts:42` — `tier?: "standard" | "featured" | "archived"`. An `archived` palette is labelled
"Feature", and taking that action calls `setPaletteFeatured(token, slug, true)`
(`useAdminUsers.ts:82-90`), silently un-archiving it. **Verified NOT a toggle bug**: the handler does
compute `palette.tier !== "featured"`, so featured↔standard round-trips correctly — the defect is
only the third state's mislabelling. Recording it because it is the *same defect mechanism* as C2-5
in the same 228-line file, which makes the family, not the instance, the thing to cure.

---

## C2-12 — MINOR: the "K-INV5 register" is two copy-pasted per-instance overrides

`:35-39` and `:56-59`:

```html
<span class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide"
      style="font-variant: small-caps">offline</span>
```

Two inline `style=` attributes and a five-class recipe duplicated verbatim. Edict 5 says style at the
root component level, never per-instance; edict 4 says the register belongs in glass-ui. The comment
at `:24-26` calls this "the K-INV5 small-caps register" — a register is a named thing you reach for,
and this one has no name. Adjacent: `class="w-48 text-small"` on the content (`:7`) and the arbitrary
value `max-w-[180px]` on the label (`:9`) are also per-instance sizing of a glass-ui primitive.

**Cure:** one glass-ui item-annotation variant (`<DropdownMenuItemAnnotation>` or a `data-annotation`
slot on the existing item), consumed twice here and available to every future degraded-state
affordance. That is also where C2-9's `aria-hidden` belongs.

---

## C2-13 — MINOR: pressing the menu trigger squashes the whole card

New, measured. `PaletteCard.vue:24` binds the card-level press spring to the root:

```html
v-bind="press.handlers"
:style="press.pressStyle.value"
```

`useLiquidPress`'s handler set (`node_modules/@mkbabb/glass-ui/dist/useLiquidPress-BOxuDkKa.js`) is
`onPointerdown / onPointerup / onPointercancel / onPointerleave / onPointerenter / onKeydown /
onKeyup / onBlur`. The wrapper at `PaletteCard.vue:82` stops **`click`** only — `@click.stop` — so
`pointerdown` on the menu trigger bubbles to the card root and drives the card's press animation.

Probe `pcm-p2-a.mjs`, mouse down on the trigger, held 80 ms:

```
::A0_beforeAnyInteraction {"pressT":"0.0000","scale":"none"}
::A1_pointerDownOnTrigger {"inlineStyle":"--card-press-t: 0.8360; --flex-vel: 0.8360; scale: 1.0079 0.9592;",
                           "pressT":"0.8360","scale":"1.0079 0.9592"}
```

The card visibly compresses when the user is opening a menu, which is an affordance lie: the press
register means "you are activating the card", and the user is not.

**Probed and found sound — the press does *not* stick.** `A2_afterMouseUp_menuOpen` reads
`pressT: "0.0000"`, `scale: "none"`, so the modal's `body { pointer-events: none }` does not orphan
the release. No stuck-press leak.

**Cure:** `@pointerdown.stop` alongside the existing `@click.stop`, or — better — scope the press
handlers so nested controls are excluded, since this wrapper is already a hand-rolled fence around
one specific event.

---

## C2-14 — MINOR: owner-facing `Delete` is unconfirmed and irreversible; the admin one is confirmed

Probe `pcm-p2-e.mjs`, `/#/palettes`:

```
::E1_menuOpen  {menus: 1, articles: 8}
::E2_afterDelete {articles: 7, ...}   ← no dialog appeared at any point
::E2_storeN 7
```

One click on a `text-destructive` menu item permanently removes a palette from `localStorage`. There
is no confirmation, no undo, and `ActionFeedback` is not shown. The admin counterpart *is* gated —
`AdminUsersPanel.vue:158-165` mounts a `ConfirmDialog`/`Dialog` for `adminDelete`. Same destructive
verb, same menu, two different standards of care, with the *irreversible* one unguarded.

---

## C2-15 — INFO: the modal lock is applied to the wrong element

Measured (probes `pcm-p2-a/c/f.mjs`). Opening any card menu sets:

```
::A2_afterMouseUp_menuOpen {"bodyPE":"none","bodyInlinePE":"none","bodyOverflow":"hidden","ariaHidden":"true"}
::E1_menuOpen elementAtCardMenuCorner: {"tag":"HTML"}    ← the whole app is pointer-inert
```

but the app's actual scroll container is an inner div, not `<body>`:

```
::scrollInfo {"docHasVScroll": false,
  "candidates":[{"tag":"DIV","cls":"glass-resting card rounded-card …","scrollH":3680,"clientH":686,"overflowY":"auto"}]}
```

so the lock is a no-op and the list scrolls freely under an open menu:

```
::scrollAttempt      {"before":0,"after":320,"moved":true}
::anchor_beforeScroll {"triggerTop":587.6,"menuTop":628,"delta":40.4}
::anchor_afterScroll  {"triggerTop":267.6,"menuTop":308,"delta":40.4}
```

Floating-ui keeps the menu anchored (delta constant at 40.4 px), so there is no visual detach and
**no layout shift** (`::SHIFT {cardLeftDelta:0, cardWidthDelta:0, clientWDelta:0, scrollYDelta:0}`).
Recorded as INFO because the intent (freeze the surface behind a modal menu) is not achieved while
the costs (app-wide `aria-hidden`, app-wide pointer-inertness) are all paid. `modal` is reka's
default and this component never considers it; a dropdown on a card in a scrolling list is a strong
candidate for `:modal="false"`.

---

## C2-16 — INFO: the visual audit has zero coverage of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.json`, all 8 matrices × both hosting routes:

| route | matrix | `bodyTextLength` | `button` | `namelessButtons` | `smallTapTargets` |
|---|---|---|---|---|---|
| `/#/palettes` | safari-desktop-light/dark | 237 | 25 | 1 | slug bar ×3 + channel spans ×4 + input |
| `/#/palettes` | safari-mobile-light/dark | 169 | 12 | 0 | slug bar ×3 + input |
| `/#/browse` | all 4 | 280 / 124 | 14 | 0 | slug bar ×3 + input |

Not one `Palette menu` button appears in any capture, and every `/#/browse` row carries
`"Failed to load remote palettes: SyntaxError: The string did not match the expected pattern."` —
the empty/failed state. So this component contributes **zero** rows to the 60 small-tap-targets and
18 nameless-buttons in `REPORT.md`, and the sweep proves nothing about it either way. Recorded so
the mega-tranche does not read that silence as a pass.

My own measurements fill the gap: trigger `36 × 36` (desktop 1280) / `54 × 54` (pass-1 mobile);
menu items `178 × 44`; submenu items ~`326 × 44`; all ≥ 24 px. The trigger has
`aria-label="Palette menu"`; the menu content is `role="menu"` with
`aria-labelledby` → that button. No nameless-button contribution on the routes that bind the menu
properly — the a11y defects this component does own are C2-7 (nested interactive), C2-9 (name
concatenation) and C2-6 (focus).

---

## Pass-1 findings re-tested

| pass-1 id | status after independent re-test |
|---|---|
| C-1 `@click.prevent` | **CONFIRMED**, causality re-closed with a different discriminator → C2-2 |
| C-2 `misconfigured` | **CONFIRMED and upgraded** — consequence measured ("Failed to create session") + positive control added → C2-4 |
| C-3 `unlisted` | **CONFIRMED and upgraded** — hypothesis → live reproduction → C2-5 |
| C-4 vacuous gate | **CONFIRMED and strengthened** — no component-test infrastructure exists at all → C2-8 |
| C-5 stringly-typed action | **CONFIRMED**, and it is the mechanism behind C2-1; severity should rise from MINOR |
| C-6 dead `rename` guard | **CONFIRMED**, and its consequence is now measured → C2-6 |
| C-7 two kind vocabularies (`:94` `!palette.isLocal`) | **CONFIRMED** — `demo/palettes/utils.ts:22-23` defines `!isLocal ⟺ "remote"` |
| C-8 mixed `@click` / `@select` | **CONFIRMED** — 11 vs 5; keyboard still works (reka synthesises `.click()`), so this is a consistency defect, not a functional one |
| C-9 no visual coverage | **CONFIRMED** → C2-16 |

---

## Negative results (probed, found sound — do not re-litigate)

| claim | measurement | verdict |
|---|---|---|
| the card press sticks while the menu is open | `A2_afterMouseUp_menuOpen` → `pressT 0.0000`, `scale none` | **no leak** |
| a modal layer / scrim leaks after `Delete` unmounts the open menu's owner | `E2_afterDelete` → `overlays: []`, `bodyPE: ""`, `bodyOverflow: ""`; trigger clickable again (`E3` = `"yes"`) | **no leak** |
| the same after Escape, after Rename, after a route change | `E4`, `E5`, `E6` all → `overlays: []`, body styles restored | **no leak** |
| modal lock causes a scrollbar-removal content jump | `SHIFT` → all deltas `0`; `bodyPadRight 0px`; no document scrollbar at test viewport | **no shift** |
| closed menus cost DOM per card | 30 cards → `totalNodes 1058`, `menuItemsInDom 0`, `menusInDom 0` (portalled + presence-gated) | **cheap** |
| Feature/Unfeature is a broken one-way action | `useAdminUsers.ts:82-90` sends `palette.tier !== "featured"` — a real toggle | **correct** (except `archived`, C2-11) |
| `useApiClient()` throws with no provider | it does (`useApiClient.ts:56-60`), but `provideApiClient()` is called at `App.vue:219`, above every one of the five host sites | **sound in app** (it is why the component cannot be mounted in isolation — see C2-8) |
| rAF / listeners / observers / timers leaked by this file | the script has none; the sub-trigger's timer is reka's and is cleared in its own `onUnmounted` | **no PRM-RAF contribution** |
| the six known local hazards | no `defineModel`, no oklch/HSV, no `ValueUnit` wrapping, no slider pointer-capture, no WebGL, no parsing | **none present** |
| `verbatimModuleSyntax` (edict 8) | `import type { Palette }` `:177`, `import type { PaletteKind }` `:178` — both type-only imports are `import type` | **PASS** |
| glass-ui first (edict 4) | `demo/ui/dropdown-menu/index.ts` re-exports all 14 primitives from `@mkbabb/glass-ui`; zero local forks | **PASS** (but see C2-12 for the styling half) |
| god module (edict 1) | 228 lines, one job, two computeds, no local state | **PASS** |
| page errors attributable to this component | `0` across every probe run (A, B, C, E, F, G, H, I, J) | **PASS** |
| disabled items inert | under `unavailable`: `aria-disabled="true"`, `data-disabled=""`, `pointer-events: none` | **PASS** |
| focus restoration on dismiss | after Escape, `activeElement` = `BUTTON[aria-label="Palette menu"]` | **PASS** (and it is exactly this correct behaviour that causes C2-6) |

---

## Strongest defect

**C2-1.** C2-2 is one dead feature on one input modality; C2-1 is a *destructive verb that silently
does nothing*, reproduced with a matched control on the same build in the same run — `Delete` on
`/#/mix` leaves 8 palettes at 8, `Delete` on `/#/palettes` takes 8 to 7. It is not a slip in this
file's logic but a hole in its contract: `action: [action: string]` plus `if (!fn) return` plus
seventeen separate host-side `@`-bindings means correctness is a property of files this component
never sees, checked by nothing. Twenty-two item instances are currently on the wrong side of it, and
the two gates that could notice — a typed exhaustive dispatch, or one e2e assertion per item —
neither exists.

---

## Probe artefacts

All under `docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-2/`:

| file | what it decides |
|---|---|
| `pcm-p2-a.mjs` / `-results.json` | card press-spring across open/close; body pointer-events; AX names; item geometry; the live `misconfigured` latch |
| `pcm-p2-b.mjs` / `-results.json` | focus trace across menu→Rename (C2-6); touch tap vs mouse hover on the sub-trigger (C2-2); Publish under `misconfigured` (C2-4) |
| `pcm-p2-c.mjs` / `-results.json` | 30-card scroll-lock/shift census; DOM cost; `/#/mix` nested-interactive census (C2-7) |
| `pcm-p2-d.mjs` | superseded by E + F (its `confirmBtn` step opened an unrelated sheet; discarded rather than reported) |
| `pcm-p2-e.mjs` / `-results.json` | overlay-leak isolation across Delete / Escape / Rename / route change — the **control** for C2-1 |
| `pcm-p2-f.mjs` / `-results.json` | the C2-1 dead-action reproduction with matched control; scroll under an open modal menu |
| `pcm-p2-g.mjs` / `-results.json` | the live 3-state visibility truth table (C2-5) via LAN-host + stubbed feed |
| `pcm-p2-h.mjs` / `-results.json` | positive control: the latch under a real `unavailable` (C2-4) |
| `pcm-p2-i.mjs` / `-results.json` | export domain boundaries — 0-colour palette, hostile name/css (C2-3) |
| `pcm-p2-j.mjs` / `-results.json` | the `defaultPrevented` discriminator that closes C2-2's causality |
| `mix-palettes-mode.png` | `/#/mix` Palettes mode — the `…` trigger on every selection row |

**Technique worth reusing:** the dev server is `misconfigured` on `localhost` (no `VITE_API_URL`,
cross-origin prod target), which short-circuits the transport before any request is issued and makes
network stubbing impossible. Serving the *same* dev server over the LAN host
(`http://192.168.1.166:9000`) makes `isLoopbackHost` false, so `detectDevMisconfig`
(`availability.ts:106-110`) returns false, requests are actually issued, and `page.route()` can then
fulfil or abort them. That is what unlocked C2-5 and the C2-4 positive control, both of which pass 1
had to leave as recipes.

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. The only repo writes are this report, the preserved
`challenge-C-implementation.pass-1-2026-07-28.md`, and `evidence/pass-2/`.
