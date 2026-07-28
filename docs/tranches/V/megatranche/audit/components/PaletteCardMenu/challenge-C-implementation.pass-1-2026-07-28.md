# CHALLENGE-C — `PaletteCardMenu.vue` implementation audit

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was explicitly spawned with. Not inherited, not undeclared.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Date: 2026-07-28
- Verdict: **DEFECTIVE** — 1 BLOCKER (live-reproduced, touch-fatal), 3 MAJOR, 4 MINOR, 1 INFO.

---

## Executive summary

The component is a 173-line template with a 53-line script. The script is three lines of real
logic: an injected availability latch, a derived `apiOffline` boolean, and a derived `isPublic`
boolean. **Two of those three lines are wrong**, and one template attribute silently amputates an
entire submenu on every touch device.

| id | severity | one line |
|---|---|---|
| C-1 | **BLOCKER** | `@click.prevent` on the sub-trigger (`:108`) makes the whole Export submenu unreachable by touch/pen — live-reproduced with a real CDP touchscreen tap plus an isolating counter-proof |
| C-2 | **MAJOR** | `apiOffline` reads `=== "unavailable"` against a 4-state latch — the `misconfigured` state (live on the running dev server right now) leaves Publish enabled and un-annotated |
| C-3 | **MAJOR** | `isPublic = visibility !== "private"` collapses a 3-state enum — an `unlisted` palette is labelled `public` and offered "Make private", destroying the state the API deliberately preserves |
| C-4 | **MAJOR** | vacuous gate — zero tests cover this file; deleting lines 107–130 outright keeps every existing test green |
| C-5 | MINOR | stringly-typed `action: [action: string]` emit + `if (!fn) return` swallow; the proof is the dead `copyAll` handler no menu item can ever emit |
| C-6 | MINOR | the `rename` special case in the parent dispatcher is dead code that contradicts its own comment |
| C-7 | MINOR | two parallel kind vocabularies in one 228-line file (`paletteKind` for 8 items, raw `!palette.isLocal` for one) |
| C-8 | MINOR | two activation idioms in one menu (11 × `@click`, 5 × `@select`); `@click` is not the primitive's contract event |
| C-9 | INFO | the 8-matrix visual audit captured **zero** PaletteCards, so this component has no visual coverage at all |

---

## C-1 — BLOCKER: `@click.prevent` kills the Export submenu on every touch device

### The defect

`PaletteCardMenu.vue:108`

```html
<DropdownMenuSubTrigger class="gap-2 cursor-pointer" @click.prevent>
```

`@click.prevent` compiles to a fallthrough `onClick` listener that calls `event.preventDefault()`.
Because of reka-ui's `asChild` merge order, that listener runs **before** the primitive's own
click handler, and the primitive's handler is guarded on `defaultPrevented`.

`node_modules/reka-ui/dist/Menu/MenuSubTrigger.js` (the guard):

```js
onClick: async (event) => {
    if (props.disabled || event.defaultPrevented) return;
    event.currentTarget?.focus();
    if (!menuContext.open.value) menuContext.onOpenChange(true);
},
```

The ordering comes from `node_modules/reka-ui/dist/Primitive/Slot.js`:

```js
const mergedProps = firstNonCommentChildren.props
    ? mergeProps(attrs, firstNonCommentChildren.props)
    : attrs;
```

`attrs` (the consumer's `.prevent`) is merged **first**, the child's own props (the primitive's
handler) second — so `mergeProps` produces `onClick: [consumerPrevent, rekaOpenHandler]` and the
consumer wins the race. The full hop chain is
`glass-ui DropdownMenuSubTrigger` → `reka MenuSubTrigger` ($attrs) → `MenuAnchor` → `PopperAnchor`
→ `Primitive asChild` → `Slot` → `MenuItemImpl`.

The pointer-hover path that normally rescues a desktop mouse is explicitly disabled for touch —
`node_modules/reka-ui/dist/Menu/utils.js:63`:

```js
function isMouseEvent(event) { return event.pointerType === "mouse"; }
```

`handlePointerMove` returns immediately for `pointerType: "touch"`. So on touch there is **only**
the click path, and the click path is dead.

### Reproduction (executed, live, against http://localhost:9000)

Probe: `/private/tmp/claude-504/.../scratchpad/pcm-challC-probe.mjs` — seeds one local palette into
`localStorage["color-palettes"]`, opens the card menu, then taps the Export sub-trigger through
Playwright's CDP touchscreen (a genuine trusted touch input, `hasTouch: true`).

```
TRIGGER box: {"x":1067,"y":537.28125,"width":54,"height":54}
SUBMENU touch-click: {
 "before": {"ariaExpanded":"false","dataState":"closed","subContentInDom":false},
 "after":  {"ariaExpanded":"false","dataState":"closed","subContentInDom":false},
 "clickDefaultPrevented": true
}
SUBMENU real-touch-tap: {"ariaExpanded":"false","subContentInDom":false,"menuStillOpen":true}
SUBMENU mouse-hover:    {"ariaExpanded":"true","subContentInDom":true}
```

The real touch tap leaves `aria-expanded="false"` and no sub-content in the DOM; the menu stays
open, so the user taps "Export" and *nothing happens*. A mouse hover on the identical element
opens it — which is exactly why this has survived: it is invisible on a desktop dev machine.

### Counter-proof (isolates `.prevent` as the sole cause)

Probe: `pcm-challC-probe2.mjs`. Same click, same listeners, one change — the event's
`defaultPrevented` getter is forced to `false`, neutralising **only** the `.prevent` effect:

```
COUNTER-PROOF (defaultPrevented forced false): {
 "before": {"ariaExpanded":"false","subContentInDom":false},
 "after":  {"ariaExpanded":"true","subContentInDom":true}
}
```

The submenu opens. `props.disabled` is `false` on this element (measured: `aria-disabled: null`,
`data-disabled: null`), so `event.defaultPrevented` is the only branch that can bail. Causality is
closed.

### Blast radius

The entire export surface — JSON, CSS Custom Properties, Tailwind Config, SVG Swatch, PNG Swatch
(`:113`–`:128`) — is unreachable from a phone or tablet. Confirmed present and correct on the
keyboard path (`pcm-challC-probe3.mjs`), which proves the items themselves are fine:

```
KEYBOARD Enter on Export sub-trigger: {"subExpanded":"true","subContentInDom":true,
  "subItems":["JSON","CSS Custom Properties","Tailwind Config","SVG Swatch","PNG Swatch"]}
```

reka routes keyboard through `handleKeyDown` → `menuContext.onOpenChange(true)` directly, never
through the click guard — so keyboard escapes the bug and pointer does not.

### Cure

Delete the modifier. `@click.prevent` on a menu sub-trigger has no defensible purpose: the
primitive already owns click, and `preventDefault` on a `div[role=menuitem]` suppresses no default
browser action. The one-character-class fix is:

```html
<DropdownMenuSubTrigger class="gap-2 cursor-pointer">
```

The gestalt cure, if the author's intent was "don't let this item close the menu": that intent is
already satisfied by the primitive (a sub-trigger never emits `ITEM_SELECT`), so the modifier is
pure cargo-cult and its removal is a strict simplification, not a trade.

---

## C-2 — MAJOR: the K-INV5 availability latch is read with a partial equality test

### The defect

`PaletteCardMenu.vue:216-217`

```ts
const { availability } = useApiClient();
const apiOffline = computed(() => availability.value === "unavailable");
```

The latch is not a boolean. `demo/platform/transport/availability.ts:40-44`:

```ts
export type ApiAvailability =
    | "unknown"
    | "available"
    | "unavailable"
    | "misconfigured";
```

`misconfigured` is a **harder** failure than `unavailable`, not a softer one:
`availability.ts:189-190` short-circuits every transport call in that state —

```ts
if (apiAvailability.value === "misconfigured") {
    throw new DevMisconfigError();
}
```

So in `misconfigured`, `apiOffline` is `false`, `:disabled="apiOffline"` (`:30`, `:51`) does not
trip, no `offline` annotation renders (`:35-39`), and the Publish item is a live, focusable,
clickable control wired to an action that is **guaranteed** to throw before a request is even
issued. The component's own header comment (`:24-26`) states the contract it fails:

> `K-INV5: a tripped availability latch disables the doomed action and NAMES the degraded state in-register`

### Reproduction (executed — this is the state of the running dev server)

From `pcm-challC-probe.mjs` against http://localhost:9000, same run, same page:

```
CONSOLE ERRORS: [
 "[value.js] value.js dev is MISCONFIGURED: http://localhost:9000 has no VITE_API_URL and is
  targeting the cross-origin production API (https://api.color.babb.dev) ... This is a
  dev-config error, NOT \"backend offline\"."
]
ITEMS: [
 {"slot":"dropdown-menu-item","text":"Publish","w":178,"h":46,"role":"menuitem",
  "ariaDisabled":null,"dataDisabled":null,"pointerEvents":"auto"}, ...
]
```

The latch is `misconfigured` (the loud `console.error` is emitted only from
`availability.ts:161-163`, immediately after `apiAvailability.value = "misconfigured"`), and the
Publish item is measured **enabled**: `aria-disabled: null`, `data-disabled: null`,
`pointer-events: auto`.

### The sibling proves it is a defect, not a design choice

`demo/palettes/browser/status/ApiOfflineChip.vue:36-37` — the *other* consumer of the same injected
seam, in the same feature area, written in the same wave:

```ts
const offline = computed(() => availability.value === "unavailable");
const misconfigured = computed(() => availability.value === "misconfigured");
```

and it renders two distinct registers (`:12-17` `role="alert"` dev-misconfig, `:19-25`
`role="status"` offline). `demo/shell/dock/DockStatusLamp.vue:88-104` carries a third
`data-variant="misconfigured"` face. `PaletteCardMenu` is the **only** latch consumer in the demo
that collapses the 4-state latch to one equality.

### Cure

Do not spread a fourth copy of the equality. Move the predicate to the seam that owns the latch —
`useApiClient()` should expose the derived state (`degraded` / `misconfigured` / `reason`) once, and
every affordance reads it. That kills the drift class rather than this instance of it: three
consumers currently re-derive the same booleans by hand, and the newest one got it wrong. Minimum
correct local form, if the seam change is deferred:

```ts
const apiDegraded = computed(() => availability.value === "unavailable" || availability.value === "misconfigured");
```

…with the annotation naming which degradation it is, since the whole point of the K-INV5 register
is that it *names* the state.

---

## C-3 — MAJOR: `isPublic` collapses a 3-state visibility enum into a binary

### The defect

`PaletteCardMenu.vue:222`

```ts
const isPublic = computed(() => palette.visibility !== "private");
```

`demo/palettes/types.ts:39-40`

```ts
/** I.W1 canonical visibility (3-state). */
visibility?: "public" | "unlisted" | "private";
```

The canonical predicate exists on both sides of the wire and neither is `!== "private"`:

- `api/src/modules/palette/format.ts:86` — `published: rest.visibility === "public"` (and the demo
  type already carries this field: `types.ts` `published?: boolean`, doc'd "true ⟺ `visibility === "public"`").
- `api/src/modules/palette/service/visibility.ts:28-37` — `isActivePublic()` = `visibility === "public" && !deletedAt`,
  documented "`unlisted`/`private` and trashed rows are NOT active-public."

### Truth table (derived from the quoted source; the middle row is the defect)

| `palette.visibility` | `isPublic` | rendered verb (`:55`) | rendered state annotation (`:59`) | emitted action (`:52`) | truth |
|---|---|---|---|---|---|
| `"public"` | true | Make private | `public` | `makePrivate` | correct |
| **`"unlisted"`** | **true** | **Make private** | **`public`** | **`makePrivate`** | **wrong on all three** |
| `"private"` | false | Publish | `private` | `makePublic` | correct |
| `undefined` | true | Make private | `public` | `makePrivate` | acceptable (`:219-221` justifies it) |

For an `unlisted` palette the K-INV5 register — whose stated job (`:42-47`) is to name "the CURRENT
state" — **names it wrong**: the palette is not on the public wall, and the menu says `public`. The
offered verb is also wrong (it should be the one that makes it public), and taking it emits
`setVisibility(palette, "private")` → `unpublishPalette` → the `unlisted` state is destroyed with
**no UI path back**, in direct contradiction of the API's explicit guarantee
(`demo/palettes/api/palettes.ts:128-130`, "The `unlisted` middle state is untouched";
`api/.../visibility.ts:7-8`, "The `unlisted` middle state is preserved and never destroyed").

### Reachability (not a theoretical state)

`api/src/modules/palette/service/crud-list.ts:111-118`:

```ts
const viewingOwn = query.userSlug !== undefined && query.userSlug === currentUserSlug;
if (viewingOwn) {
    if (query.visibility) f.visibility = query.visibility;
} else {
    f.visibility = "public";
}
```

An owner listing their own rows receives **every** visibility, `unlisted` included — and
`unlisted` + `isOwned` is exactly the guard on the mislabelled item (`:49`). The state is also a
hard DB invariant: `api/src/platform/migrations/check.ts:53-60` asserts every palette doc carries
one of the three, so legacy `unlisted` rows are expected to exist.

### Reproduction status — **NOT EXECUTED** (recipe, honestly labelled)

The truth table above is derived from source, not from a live run. A live end-to-end repro needs an
owned `unlisted` row served to an authenticated session, which the current dev server cannot
produce: it is `dev:web-only` with no `VITE_API_URL`, so the latch short-circuits every request
before it leaves the page (see C-2 evidence). The exact recipe:

1. `npm run dev` (full local stack via `scripts/dev.sh up`), sign in.
2. Create a palette, then `PATCH /palettes/:slug` with `{"visibility":"unlisted"}`
   (`api/src/modules/palette/schema.ts` accepts the enum).
3. Open `/#/browse` filtered to your own `userSlug`, open that card's menu.
4. Observe the item reads **"Make private"** with the small-caps annotation **`public`**.

I also attempted an isolated `@vue/test-utils` mount (`pcm-mount.test.ts` + `pcm.vitest.config.ts`
in the scratchpad, run via `npx vitest run --config …`): the component mounts and the suite runs,
but reka's `DropdownMenuPortal`/`Presence` renders nothing under jsdom even with
`ResizeObserver`/`DOMRect`/`matchMedia` polyfills, so `document.body.textContent` is empty for every
case. That negative is itself worth recording — see C-4: **this component is not mountable under
the repo's current test environment**, which is why it has no tests.

### Cure

Read the canonical predicate instead of hand-rolling its negation:

```ts
const isPublic = computed(() => palette.visibility === "public");
```

That alone fixes the annotation and the verb for `unlisted` (it becomes "Publish" / `private`…
which is still a small lie). The idiomatic cure is to stop modelling a ternary as a boolean:
annotate the actual value (`public` / `unlisted` / `private`) and offer the transition that is
missing, so the control is a *state display + transition* rather than a toggle pretending the
middle state does not exist. The API already treats all three as legal resting states
(`api/.../visibility.ts:41-59`, "all 9 `(visibility, tier)` tuples are valid resting states") — the
UI is the only layer that flattened it.

---

## C-4 — MAJOR (test truth): a vacuous gate — this file has no tests at all

`test/` contains no component tests; `demo/test/` contains export/glass suites only. Nothing
anywhere mounts `PaletteCardMenu`:

```
$ grep -rn "PaletteCardMenu" --include="*.ts" --include="*.vue" . --exclude-dir=node_modules --exclude-dir=.git
demo/platform/transport/useApiClient.ts:9:   (a doc comment)
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:83,106,176
docs/... (25 further doc-only hits)
```

The e2e smoke suite opens the trigger in six specs
(`e2e/smoke/{admin/flows/palette-feature,flows/palette-flag,flows/palette-fork,flows/palette-delete,flows/palette-edit}.spec.ts:47`,
`oracles/o10d-display-voice-census.spec.ts:311`) but asserts on only **two** of the sixteen menu
items:

```
e2e/smoke/flows/palette-fork.spec.ts:48:  await page.getByRole("menuitem", { name: /Remix/ }).click();
e2e/smoke/oracles/o10d-display-voice-census.spec.ts:328: await page.getByRole("menuitem", { name: /Versions/ }).click();
```

`grep -rn "Export\|Make private" e2e` returns **nothing**.

### The exact mutations that keep every gate green

1. **Delete lines 107–130 entirely** — the whole `<DropdownMenuSub>` export family. No unit test,
   no e2e spec, no typecheck rule references it. All green. *(This is why C-1 shipped: the feature
   could vanish completely and nothing would notice; it merely became unreachable on touch, which
   is strictly harder to detect than absence.)*
2. `const isPublic = computed(() => true)` — C-3's item never renders its other branch in any test.
   All green.
3. `const apiOffline = computed(() => false)` — no test ever puts the latch in a degraded state.
   All green.

Three one-line mutations that break three separate user-facing behaviours, zero failing gates.

### Cure

The blocking obstacle is real and must be cured first: **reka-ui menu content does not render under
this repo's jsdom vitest environment**, so component tests for any menu are currently impossible
(measured above). Two honest routes: (a) render-level tests against the *item model* rather than the
DOM — extract the item list (kind → items, with `disabled`/`annotation`/`action`) into a pure
function this file consumes, and unit-test that table (this also kills C-3 and C-2 by making them
assertable); or (b) put the coverage in e2e where the primitives actually work — one spec that taps
Export on a touch-emulated project would have caught C-1 on the day it landed. (a) is the
architectural transposition and is preferred: the defects here are all in derived state, and derived
state should not require a browser to test.

---

## C-5 — MINOR: stringly-typed action contract with a silent swallow

`PaletteCardMenu.vue:224-227`

```ts
defineEmits<{
    action: [action: string];
    updateOpen: [value: boolean];
}>();
```

`string`, not a union. The receiving dispatcher, `PaletteCard.vue:315-316`:

```ts
const fn = actions[action];
if (!fn) return;
```

A typo in either half is a silent no-op — an unnamed masking fallback, against standing edict 2.
The proof that the gap is already load-bearing is a dead handler on the other side:

`PaletteCard.vue:294`

```ts
copyAll: () => void writeClipboard(props.palette.colors.map((c) => c.css).join(", ")),
```

```
$ grep -rn "copyAll" demo --include="*.vue" --include="*.ts"
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294
```

Exactly one hit. **No menu item emits `copyAll`** — the handler is unreachable code that the type
system cannot see, and it has survived because `action` is `string`. The same weakness continues
downstream: `demo/palettes/usePaletteExport.ts` switches on a `format: string` with **no `default:`
case** and wraps everything in `catch (e) { console.warn("Export failed:", e); }` — an unknown
format and a real failure are both indistinguishable silence, even though the card owns an
`ActionFeedback` channel and a `defineExpose({ showFeedback })` it never uses for export.

**Cure:** `export type PaletteCardAction = "save" | "publish" | … ;` declared once beside the menu,
`action: [action: PaletteCardAction]`, and `Record<PaletteCardAction, () => void>` on the parent —
which makes the map exhaustive, deletes `if (!fn) return`, and makes `copyAll` a compile error.

---

## C-6 — MINOR: the `rename` special case is dead code contradicting its own comment

`PaletteCard.vue:291-292, 317`

```ts
// `rename` opens an inline input — keep the menu open visually until the
// input takes focus; all other actions close the menu immediately.
…
if (action !== "rename") menuOpen.value = false;
```

`PaletteCard.vue:280-283`

```ts
function startRenaming() {
    menuOpen.value = false;
    renaming.value = true;
}
```

`actions.rename` is `() => startRenaming()` (`:298`), so `menuOpen` is set to `false` on the very
next statement regardless. The guard has no effect and the comment describes behaviour the code does
not implement. **Cure:** delete the guard; unconditional `menuOpen.value = false` before dispatch.

---

## C-7 — MINOR: two kind vocabularies in one 228-line file

Eight items branch on the `paletteKind` seam (`:16, :28, :49, :64, :74, :84, :134, :144, :153`).
One does not — `:94`:

```html
v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"
```

`demo/palettes/utils.ts:22-23` defines `getPaletteKind` as `if (!palette.isLocal) return "remote";`
— so `!palette.isLocal` **is** `paletteKind === "remote"`, spelled a second way. Two vocabularies
for one concept in one file is the seam leaking; a future change to `getPaletteKind` (e.g. a
fourth kind) silently desynchronises this row. **Cure:** `paletteKind === 'remote' && (palette.versionCount ?? 0) > 1`.

---

## C-8 — MINOR: two activation idioms in one menu; `@click` is not the primitive's contract event

Eleven items activate on `@click` (`:18, :31, :52, :66, :76, :86, :96, :136, :146, :158, :165`);
five on `@select` (`:113, :116, :119, :123, :126`). They are not equivalent:
`node_modules/reka-ui/dist/Menu/MenuItem.js` emits a **cancelable** `ITEM_SELECT` and honours
`preventDefault()` to keep the menu open —

```js
emits("select", itemSelectEvent);
await nextTick();
if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
else rootContext.onClose();
```

An `@click` item can never use that affordance, and it fires from a listener merged *after*
`handleSelect`, so the parent's `menuOpen.value = false` and reka's own `onClose()` race to close
the same menu (harmless today, precisely because the parent's guard is dead — see C-6). Mixing both
idioms in one 173-line template is the KISS violation (edict 3): one menu, one activation contract.

**Cure:** `@select` throughout — it is the primitive's contract, it is what the export half already
uses, and it is the only one that composes with `preventDefault`.

**Verified NOT a defect:** keyboard activation still works for `@click` items — reka synthesises a
native click on `Enter`/`Space` (`MenuItem.js` `onKeydown` → `event.currentTarget?.click()`), and
disabled items are inert on both paths (`.dropdown-menu__item[data-disabled]{pointer-events:none}`
in `node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, plus the `_ctx.disabled` early return in
`onKeydown`).

---

## C-9 — INFO: the visual audit has zero coverage of this component

`docs/tranches/V/megatranche/audit/visual/REPORT.json` — both routes that host a `PaletteCard` were
captured with **no cards on screen**:

- `/#/palettes`, all 4 matrices: `bodyTextLength` 237 (desktop) / 169 (mobile); `button` count 25;
  `smallTapTargets` are all `PaletteSlugBar` + `ComponentSliders` rows — no `Palette menu` button in
  any capture.
- `/#/browse`: `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/browse.png`
  (read) shows the specimen-plate empty state — *"The commons is unreachable. / Failed to load
  palettes / Retry"*.

So the 60 `smallTapTargets` and 18 `namelessButtons` in `REPORT.md` contain **zero** contributions
from this component, and the 8-matrix Safari sweep proves nothing about it either way. Recorded so
the mega-tranche does not read that silence as a pass.

Side note corroborating C-2: the browse empty state says *"unreachable"* while the actual latch
state was `misconfigured`. The misconfigured-vs-unavailable conflation is not unique to this file —
but this file is the one whose header comment promises to name the state correctly.

---

## Negative results (probed, found sound — do not re-litigate)

These were interrogated with the same effort as the findings and came back clean. Evidence from
`pcm-challC-probe.mjs` / `probe2.mjs` / `probe3.mjs` against the live server.

| claim | measurement | verdict |
|---|---|---|
| Tap targets ≥24px | trigger `54×54`; menu items `178×46`; submenu items `326×44` | **PASS**, with margin |
| Menu has an accessible name | content `role="menu"`, `aria-labelledby="reka-dropdown-menu-trigger-v-1-2"` → the `aria-label="Palette menu"` button | PASS |
| Trigger state exposed | `aria-expanded="true"`, `aria-haspopup="menu"`, `aria-controls=…` | PASS |
| Focus restoration on dismiss | after `Escape`: `menuOpen:false`, `activeElement` = `BUTTON[aria-label="Palette menu"]` | PASS |
| Keyboard operability of `@click` items | reka synthesises `.click()` on `Enter`/`Space`; submenu opens on `Enter` (`subExpanded:"true"`, 5 items enumerated) | PASS |
| Disabled items inert | `pointer-events:none` via `.dropdown-menu__item[data-disabled]` + `onKeydown` early return | PASS |
| `verbatimModuleSyntax` (edict 8) | `import type { Palette }` `:177`, `import type { PaletteKind }` `:178` — every type-only import is `import type` | PASS |
| Glass-ui first (edict 4) | all 9 menu primitives re-exported from `@mkbabb/glass-ui` via `demo/ui/dropdown-menu/index.ts`; zero local forks | PASS |
| No god module (edict 1) | 228 lines, one job, no local state beyond two computeds | PASS |
| Leaks: rAF / listeners / observers / timers | none — the script has no `requestAnimationFrame`, no `addEventListener`, no `onUnmounted`, no timers; sub-trigger timers are the primitive's and it clears them (`MenuSubTrigger.js` `onUnmounted → clearOpenTimer`) | PASS — no PRM-RAF contribution |
| Local hazard sweep | no `defineModel` (open state is prop + emit), no oklch/HSV conversion, no `ValueUnit` wrapping, no slider/pointer-capture, no WebGL, no parsing → **none of the six known local hazards are present in this file** | PASS |
| Console/page errors attributable to this component | 0 in every probe run (the 2 console errors are the dev-misconfig banner, emitted at client init) | PASS |
| Menu content mount cost | `DropdownMenuContent` is portalled and presence-gated — the 16 items do **not** mount per card while closed (measured: `[data-slot=dropdown-menu-item]` count is 0 until the trigger is clicked) | PASS |

Also examined and found *stylistically* inconsistent but not defective: `const { palette } = defineProps<…>()` (`:206`) destructures 1 of 5 props while the template reads the other four off the
props proxy — legal under Vue 3.5 reactive-props-destructure, no stale-read hazard, but it reads as
an unfinished migration. `ActionFeedback.vue` (the channel these actions report into) carries no
`role` and no `aria-live` in 58 lines, so no menu action's outcome is announced — a real a11y gap,
but it belongs to that file's seat, not this one.

---

## Strongest defect

**C-1.** Every other finding is a wrong label or an untested branch; C-1 is a *whole feature that
does not exist on mobile*. It is caused by a nine-character template modifier, it is invisible to
every gate the repo owns, it is invisible to desktop manual QA because the hover path masks it, and
it was reproduced here with a real touch input and isolated with a counter-proof that changes
nothing but the one bit `.prevent` sets.

## Probe artefacts

- `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/pcm-challC-probe.mjs` — touch tap vs mouse hover; item geometry; latch state
- `…/scratchpad/pcm-challC-probe2.mjs` — `defaultPrevented` counter-proof; a11y attributes; focus restoration
- `…/scratchpad/pcm-challC-probe3.mjs` — keyboard sub-open path; submenu item geometry
- `…/scratchpad/pcm-mount.test.ts` + `pcm.vitest.config.ts` — the jsdom mount attempt (records the
  negative: reka menu content does not render under this repo's vitest environment)

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. The only repo write is this report.
