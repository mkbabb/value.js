# CHALLENGE-C — `demo/palettes/PalettesPane.vue` · implementation is defective (pass 3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. The seat was spawned with an explicit Opus 5 declaration and the served tier
matches it. No inheritance, no undeclared tier, no silent downgrade.

---

## Subject · substrate · method

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/palettes/PalettesPane.vue` (212 lines) |
| Branch / HEAD | `tranche-u` @ `9268f054` (the task named `c654824e`; HEAD advanced twice — **no source touched by this seat**) |
| Prior passes | `challenge-C-implementation.pass-1-prior.md`, `challenge-C-implementation.pass-2-prior.md` (both preserved verbatim; re-adjudicated in §"Prior-pass adjudication") |
| Read this pass | `usePalettePorts.ts`, `usePaletteStore.ts`, `usePaletteActions.ts`, `useFilteredList.ts`, `usePaletteExport.ts`, `shell/usePaneRouter.ts`, `types.ts`, `api/palettes.ts`, `useBrowsePalettes.ts`, `useExtractSession.ts`, `PaletteCardGrid.vue`, `PaletteCard.vue`, `PaletteCardSwatches.vue`, `SwatchHoverMenu.vue`, `ActionFeedback.vue`, `useHoverPopover.ts`, `PaneHeader.vue`, `demo/styles/animations.css`, `demo/ui/*/index.ts`, `@vueuse/integrations@14.3.0 useSortable`, `sortablejs@1.15.7`, `@mkbabb/glass-ui` `a11y-overrides.css` |
| Live probes | 5 headless-Chromium Playwright scripts, 26 fresh browser contexts, all against `http://localhost:9000`. Every number below is pasted stdout from my own run. Scripts: `pp3-A-malformed.mjs`, `pp3-B-blast.mjs`, `pp3-C-drag.mjs`, `pp3-D-prm-taps.mjs`, `pp3-E-final.mjs` / `pp3-E2-refs.mjs` (session scratchpad) |
| Images read | `audit/visual/shots/safari-desktop-light/palettes.png` + one first-hand capture (`pp3-nomatch.png`) |

**Verdict: DEFECTIVE.** One **new BLOCKER** neither prior pass verified — a store payload
that passes the deserializer's only check **whiteouts the entire application on every
route, permanently** — plus three new MAJORs, and independent first-hand re-verification
(my own numbers, my own contexts) of six prior findings. Four prior hypotheses are
**refuted** with measurements so no later seat re-runs them.

---

## P-1 · BLOCKER — a store payload that passes `read()` blanks the WHOLE APP on EVERY route, forever

Pass-1 filed this shape as D-3 and never ran it. Pass-2 explicitly declined: *"Not
re-run … Mechanism re-read and stands."* **It is far worse than the mechanism suggested,
and it is now measured.** The blast radius is not the pane. It is the application.

### Mechanism

`usePaletteStore.ts:19-37` — the deserializer's **entire** validation:

```ts
read(raw: string): PaletteStore {
    try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.version !== "number") { return defaultStore; }
        return parsed;                       // ← `palettes` never checked. cast, not parse.
    } catch { return defaultStore; }
}
```

`usePaletteStore.ts:51-55` then does `getStore().value.palettes.filter(...)` in a
**module-level computed**, and `demo/color-picker/App.vue:154` reads it **in App's own
template**:

```html
:count="paletteManager.library.savedPalettes.value.length"
```

App is the root. A render error in the root cannot be caught by `ErrorBoundary`, which is
its descendant. The whole tree fails to mount.

### Reproduction — 11 store shapes, one fresh context each (`pp3-A-malformed.mjs`)

```
label | grid | cards | badge | bodyLen | pageErr | cerr | err0
control_ok | true | 1 | My Palettes1 (1 saved) | 214 | 0 | 1 |
no_palettes_key | false | 0 | null | 0 | 2 | 1 | Cannot read properties of undefined (reading 'filter')
palettes_null | false | 0 | null | 0 | 2 | 1 | Cannot read properties of null (reading 'filter')
palettes_object | false | 0 | null | 0 | 2 | 1 | getStore(...).value.palettes.filter is not a function
palettes_string | false | 0 | null | 0 | 2 | 1 | getStore(...).value.palettes.filter is not a function
root_array | true | 0 | My Palettes | 274 | 0 | 1 |
not_json | true | 0 | My Palettes | 274 | 0 | 1 |
version_2_future | true | 1 | My Palettes1 (1 saved) | 213 | 0 | 1 |
local_no_id | true | 1 | My Palettes1 (1 saved) | 214 | 0 | 1 |
null_entry | false | 0 | null | 0 | 2 | 1 | Cannot read properties of null (reading 'isLocal')
colors_missing | false | 0 | null | 171 | 0 | 1 |
```

`bodyLen: 0` — the page renders **no text at all**. `localStorage["color-palettes"] =
'{"version":1}'` is enough.

### Blast radius — every route, not the pane (`pp3-B-blast.mjs` B1)

```
=== B1 blast radius (store = {"version":1}) ===
/#/              {"appHTMLLen":167,"bodyText":0,"canvases":0} pageErrors: 2 Cannot read properties of undefined (reading 'filter')
/#/palettes      {"appHTMLLen":167,"bodyText":0,"canvases":0} pageErrors: 2 Cannot read properties of undefined (reading 'filter')
/#/browse        {"appHTMLLen":167,"bodyText":0,"canvases":0} pageErrors: 2 Cannot read properties of undefined (reading 'filter')
/#/blob          {"appHTMLLen":167,"bodyText":0,"canvases":0} pageErrors: 2 Cannot read properties of undefined (reading 'filter')
/#/admin/users   {"appHTMLLen":167,"bodyText":0,"canvases":0} pageErrors: 2 Cannot read properties of undefined (reading 'filter')
```

`#app` retains 167 characters — the mount shell. `/#/blob` renders **zero canvases**. The
colour picker, the dock, the admin console: gone. A palette-store defect takes down the
WebGL blob route.

### It never repairs itself (`pp3-B-blast.mjs` B2)

```
=== B2 persistence across reloads (same context) ===
reload 1 {"bodyText":0,"stored":"{\"version\":1}"}
reload 2 {"bodyText":0,"stored":"{\"version\":1}"}
reload 3 {"bodyText":0,"stored":"{\"version\":1}"}
```

`useStorage` only writes when the app mutates the ref; the app never boots, so it never
writes. The bad payload is immortal. **The user's only recovery is DevTools.** This is a
persistent, self-inflicted denial of service on a public web app.

### The realistic ingress is the repo's own `version` field

`version_2_future` above: a `{"version": 2, …}` payload is **accepted verbatim**. The
field exists to gate a migration and gates nothing — `read()` checks only that it is a
`number`. Ship one build that renames or reshapes `palettes`, and every client still on
the old bundle (cached SW, open tab, stale CDN edge) is bricked by exactly the shape
measured above. That is not a synthetic hazard; that is the ordinary cost of a schema
change against a version field that is decorative. Add the `onSaveRemote` →
`addPublishedPalette` spread of an unvalidated server row (`usePaletteStore.ts:121-151`)
and the surface widens further.

### Cure (gestalt, not patch)

`read()` must **parse, not cast**. It is the single choke point for every store ingress and
it currently launders `unknown` into `PaletteStore` with one `typeof` check. Validate the
full shape there (array-ness, per-entry required fields), drop malformed entries, and
return `defaultStore` on total failure — then `PaletteStore` is a *type* rather than an
assertion, `savedPalettes` cannot throw, and P-3 below disappears with it. Second layer:
`savedPalettes`/`publishedPalettes` are module-level computeds evaluated inside the root
component's render; nothing downstream of a `localStorage` read belongs on the root's
render path un-guarded.

---

## P-2 · MAJOR — expand is keyboard-unreachable, and it gates every per-colour control in the pane

Pass-2's C-9 flagged the drag handle. It stopped one level short. **The card body itself is
the problem, and the cost is the whole swatch action set.**

`PalettesPane.vue:91` wires the pane's expand gesture onto a non-interactive element:

```html
@click="pm.toggleExpand(palette.id)"
```

`PaletteCard.vue:5-27` renders that element as `role="article"` with no `tabindex`, no
`keydown` handler, no button semantics (the file's own comment at `:2-4` says button
semantics are "omitted because inner interactive controls must be reachable" — but they
are not reachable either, measured below).

### Measured — 30-Tab walk of a populated pane (`pp3-C-drag.mjs` C4)

```
=== C4 keyboard walk (30 Tabs from document start) ===
focus sequence (pane-scoped entries only):
 13 <input> "" inCard=false
 14 <button> "Delete all saved palettes" inCard=false
 15 <button> "Palette menu" inCard=true
 16 <button> "Palette menu" inCard=true
 17 <button> "Palette menu" inCard=true
 18 <button> "Palette menu" inCard=true
stops inside a palette card: 4
card element: {"tabindex":null,"role":"article","hasKeyHandler":false}
```

Four palettes, four keyboard stops — **one per card, and it is the overflow menu**. The
card body, the title (whose `@click.stop` starts an inline rename), and the drag handle are
all skipped.

### The cascade

`PaletteCardSwatches` is rendered `v-if="expanded"` (`PaletteCard.vue:139-140`). Expand is
mouse-only. Therefore **every** control inside it is unreachable by keyboard:

| control | site | keyboard route |
|---|---|---|
| Edit colour (→ `pm.onEditColor`, `PalettesPane.vue:95`) | `PaletteCardSwatches.vue:47-52` | **none** |
| Copy colour | `PaletteCardSwatches.vue:54-59` | **none** |
| Add colour to current palette | `PaletteCardSwatches.vue:40-46` | **none** |
| Copy slug | `PaletteCardSwatches.vue:11-18` | **none** |
| Reorder (drag) | `PaletteCard.vue:47-50` | **none** |

The card menu offers no substitute — its action set is fixed at
`PaletteCard.vue:293-313` (`copyAll`, `publish`, `delete`, `save`, `rename`, `feature`,
`adminDelete`, `makePublic`, `makePrivate`, `fork`, `versions`, `flag`, `editTags`,
`export*`) and contains **no expand**. Live confirmation of what the menu actually offers a
local saved palette (`pp3-E2-refs.mjs` E4):

```
menu items: ["Publish","Rename","Export","Delete"]
```

Rename has a keyboard route through the menu. In-place colour editing — the feature
`usePaletteActions.onEditColor` exists to serve — has none. WCAG 2.2 **2.1.1 Keyboard (A)**.

**Cure.** The gesture belongs on an element that has the semantics the gesture implies. A
saved palette is a disclosure: give the card a `<button>` summary row (or `aria-expanded`
+ `tabindex="0"` + Enter/Space on the row) and let `role="listitem"` carry the collection
membership (see P-8). Adding `tabindex` to the `article` div would be the patch; making the
disclosure a disclosure is the transposition.

---

## P-3 · MAJOR — the orphan palette: stored, invisible, uncounted, and it SURVIVES "Delete all"

`usePaletteStore.ts:51-55` projects saved palettes as `p.isLocal && p.id != null`;
`:57-59` projects published as `!p.isLocal`. A stored entry with `isLocal: true` and **no
`id`** satisfies neither. It is in `localStorage`, it is in `store.value.palettes`, and it
is addressable by nothing in the UI.

### Measured (`pp3-B-blast.mjs` B3)

```
=== B3 orphan (isLocal:true, no id) ===
before delete-all: {"stored":["Visible","OrphanNoId"],"rendered":["Palette: Visible"],"badge":"My Palettes1 (1 saved)"}
after  delete-all: {"stored":["OrphanNoId"],"rendered":0}
```

Two palettes stored; the badge says **1 saved**; one card renders. The user then invokes
**"Delete all saved palettes"** — the pane's most destructive control, whose dialog promises
*"This will permanently delete 1 palette from local storage"* — and `OrphanNoId` **survives**.
`onDeleteAllSaved` (`usePaletteActions.ts:125-131`) iterates `savedPalettes`, which cannot
see it. There is no gesture anywhere in the application that removes it.

This is the same root as P-1 (`read()` casts instead of parses) surfacing as silent data
retention instead of a crash: it is undeletable content that the user believes they have
deleted. The type doc at `types.ts:24` states the invariant — *"`isLocal === true` ⟹ `id`
present"* — and nothing enforces it at the boundary where untrusted bytes enter.

**Cure.** Same choke point as P-1: `read()` must mint an `id` for, or drop, any `isLocal`
entry lacking one. A stated invariant that only lives in a doc comment is not an invariant.

---

## P-4 · MAJOR — the app's global reduced-motion guard is dead code, overruled by a later `!important`

`demo/styles/animations.css:177-192` declares itself the app-wide guard:

```
 * Global prefers-reduced-motion guard
 * Neutralises CSS keyframe animations and transitions app-wide …
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        transition-duration: 0.01ms !important;
```

It does not. `@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css` ships a **later**
`!important` rule of equal specificity and origin:

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) {
    transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important;
  }
}
```

Later source order wins. **Measured on a palette card** (`pp3-D-prm-taps.mjs` D1, Playwright
`reducedMotion: "reduce"`):

```
=== D1 PRM cascade on [role=article] ===
{
 "matchMedia": true,
 "computedTransitionDuration": "0.1s",
 "computedTransitionProperty": "opacity, color, background-color, border-color, box-shadow",
 "computedAnimationDuration": "1e-05s",
 "matchingTransitionRules": [
  { "sel": ":not([data-allow-motion])", "val": "0.1s",   "imp": "important", "ctxt": "@media (prefers-reduced-motion: reduce)" },
  { "sel": "*, ::before, ::after",      "val": "0.01ms", "imp": "important", "ctxt": "@media (prefers-reduced-motion: reduce)" }
 ]
}
```

`0.1s`, not `0.01ms` — a factor of 10 000 from what the file claims. Keyframes *are*
neutralised (`animationDuration: 1e-05s`), so the demo block's animation half is merely
redundant; its transition half is **inert**, and every consumer reading that comment
believes a guarantee the browser does not honour.

Two app-wide reduced-motion policies with different values, the losing one carrying the
authoritative-sounding comment, is precisely the **dual path** owner edict **2** forbids.
The producer's policy is the real one — the demo block should be deleted, not tuned. This
is a **BH/glass-ui relay item** as well: glass-ui's 100 ms floor is a deliberate product
decision that the demo has been silently overriding-in-name-only for the life of the file.

---

## P-5 · MINOR — `demo/ui/*` is an 18-of-19 pure alias layer, and this file uses both paths in one import block

`PalettesPane.vue:129-149` reaches the design system **two different ways, twenty lines
apart**:

```ts
import { Card } from "../ui/card";                    // ← alias
import { Button } from "../ui/button";                // ← alias
import { Badge } from "../ui/badge";                  // ← alias
…
import { Dialog, … } from "@mkbabb/glass-ui/dialog";  // ← direct
import { SearchBar } from "@mkbabb/glass-ui/search";  // ← direct
```

The aliases forward nothing:

```
$ cat demo/ui/card/index.ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
$ cat demo/ui/button/index.ts
export { Button } from "@mkbabb/glass-ui";
$ cat demo/ui/badge/index.ts
export { Badge, badgeVariants, type BadgeVariants } from "@mkbabb/glass-ui";

$ (count pure one-line glass-ui re-export barrels under demo/ui/)
demo/ui barrels: 19 ; pure glass-ui re-export barrels: 18
```

Eighteen of nineteen `demo/ui/*` barrels are a one-line forward. That is the migration
residue of the shadcn→glass-ui move — owner edict **2** (no aliases, no migration shims, no
dual paths) and edict **4** (glass-ui *is* the design system; reach it, do not wrap it). The
one-file-two-paths import block is the tell that the layer has no rule left governing it.

---

## P-6 · MINOR — `ActionFeedback` is not a live region, and its dismiss timer outlives the card

The pane's only feedback channel (`PalettesPane.vue:207` → `PaletteCard.vue:244` →
`ActionFeedback.vue`) renders a plain `<div>`:

```html
<div v-if="visible" :class="['feedback-chip flex items-center gap-2 …']">
```

No `role="status"`, no `aria-live`. **Measured** (`pp3-D-prm-taps.mjs` D2, populated pane,
one card expanded):

```
=== D2 desktop 1600x1000 (3 palettes, 1 expanded) ===
cards 3 expandedPanels 1 liveRegions 0 smallTapTargets 3 namelessButtons 0
```

`liveRegions 0` — the async, network-backed publish result is announced to nobody (WCAG 2.2
**4.1.3 Status Messages, AA**).

Rider, same file: the auto-dismiss timer (`ActionFeedback.vue:38-47`) is created in a
`watch` and cleared only by the *next* visibility change — never on unmount. A card
unmounted while its chip is up (filter, delete, reorder) leaves a live `setTimeout` that
fires `emit("update:visible", false)` into a disposed instance. `tryOnScopeDispose` /
`onScopeDispose` is the one-line idiom the repo already uses elsewhere.

---

## P-7 · MINOR — the populated pane's tap-target contribution is one violation per palette, and the visual matrix never saw it

The matrix records `smallTapTargets` for `/#/palettes` as 8 (desktop) / 4 (mobile)
(`REPORT.md:120,150`). Those are the **empty-library floor**. I read
`shots/safari-desktop-light/palettes.png`: the capture shows *"· EMPTY PLATE · / No saved
palettes yet."* — **zero cards, zero handles, zero swatches were ever measured.**

**Measured with a populated library** (`pp3-D-prm-taps.mjs` D2), three palettes, one
expanded, desktop *and* mobile:

```
=== D2 desktop 1600x1000 (3 palettes, 1 expanded) ===
cards 3 … smallTapTargets 3 namelessButtons 0
  SMALL {"tag":"svg","name":"(none)","w":16,"h":16}   ×3

=== D2 mobile iPhone-15 (3 palettes, 1 expanded) ===
cards 3 … smallTapTargets 3 namelessButtons 0
  SMALL {"tag":"svg","name":"(none)","w":16,"h":16}   ×3
```

One unnamed 16 × 16 `<svg>` drag handle per palette (`PaletteCard.vue:47-50`), **identical on
mobile** — no coarse-pointer enlargement, though glass-ui ships a `touch-hit-area` utility
for exactly this (`a11y-overrides.css`). WCAG 2.2 **2.5.8 Target Size Minimum (AA)** is 24
CSS px. The count is **linear in the user's library size and unbounded**; the audit
harness's number is a floor that can never move because the harness never seeds a palette.

**This is a harness finding as much as a component finding**: `audit/visual/capture.mjs`
must seed `localStorage["color-palettes"]` before capturing `/#/palettes`, or the route's
row is structurally blind.

---

## P-8 · INFO — the test gate is one placeholder assertion and one empty directory

```
$ grep -rn "reorderPalettes|filteredSaved|showFeedback|Delete all saved|Search your palettes|drag-handle|useSortable|PalettesPane" test/ e2e/ demo/test/
e2e/smoke/walk.spec.ts:63:                    .getByPlaceholder("Search your palettes...")
e2e/smoke/oracles/o14-preview-truth.spec.ts:18:  … (comment)
e2e/smoke/oracles/o9-shadow-palette.spec.ts:33:  … (comment)
e2e/smoke/flows/palette-save.spec.ts:7:         … (comment)

$ ls -la demo/test/palettes/api/
total 0
drwxr-xr-x  2 mkbabb  staff  64 Jul 28 14:13 .
drwxr-xr-x  3 mkbabb  staff  96 Jul 28 13:57 ..
```

Three of the four hits are prose in comments. The one executable assertion is a placeholder
visibility check. `demo/test/palettes/api/` is a **scaffolded test directory containing zero
test files** — the shape of a gate with none of the substance.

Mutations that keep the entire suite green (adding to pass-2's six): delete
`useSortable(...)` (`:183-197`); `pm.reorderPalettes(ids)` → `pm.reorderPalettes([])`;
`pm.filteredSaved.value` → `pm.savedPalettes.value` in the `v-for` (search becomes
decorative); delete `card.showFeedback(...)` (`:207`); delete the whole delete-all
`<Dialog>` (`:102-122`); delete the `:ref` callback (`:84`); **and now** — replace
`usePaletteStore.read()`'s body with `return JSON.parse(raw)` (P-1 becomes reachable from
a wider set of inputs); delete the `p.id != null` clause from `savedPalettes` (P-3's
invariant). **Eight deletions, eight silent survivals.**

---

## P-9 · INFO — three dead imports; both gates are configured not to see them (re-verified)

```
$ grep -n "watch|onMounted|nextTick" demo/palettes/PalettesPane.vue
128:import { inject, reactive, ref, computed, watch, onMounted, nextTick } from "vue";

$ npx eslint demo/palettes/PalettesPane.vue
eslint exit=0
```

Sole occurrence is the import line. eslint is clean because `no-unused-vars` is `off` at six
config sites and `noUnusedLocals` is absent from every `tsconfig`. Re-run and re-pasted
first-hand; pass-2's C-15 stands unchanged.

---

## Independent re-verification of prior findings (my own contexts, my own numbers)

I re-ran the load-bearing prior claims rather than inherit them.

### C-1 (pass 2) — first-drag scramble · **CONFIRMED**

`pp3-C-drag.mjs` C1, four palettes, real `mouse.down/move/up` on card 0's `.drag-handle`,
dropped on card 2, no search query:

```
store BEFORE : Alpha Beta Gamma Delta
store AFTER  : Gamma Delta Beta Alpha
EXPECTED     : Beta Gamma Alpha Delta
2nd drag (same gesture):
store AFTER 2: Delta Beta Gamma Alpha        ← correct relative to Gamma Delta Beta Alpha
pageErrors: 0
```

Identical to pass-2's measurement, produced independently. The heisenbug shape is real: the
first drag of each page load corrupts, every later drag is correct. Root cause as pass-2
derived it — `PalettesPane.vue:183` hands `useSortable` the computed's **live cached array**
(`pm.filteredSaved.value`), VueUse's default `onUpdate` splices it in place
(`useSortable.js:82-90`, `isRef(list) === false` ⇒ no copy), and SortableJS fires `update`
before `end`, so `onEnd` re-reads an n−1 list and splices by the original indices.

### C-4 — `searchQuery` is one app-global ref · **CONFIRMED**

`pp3-E-final.mjs` E1 — type `leaktest` into the Palettes pane, then navigate to `/#/browse`:

```
palettes route inputs: [{"ph":"enter slug or token...","v":""},{"ph":"Search your palettes...","v":"leaktest"}]
browse route inputs  : [{"ph":"enter slug or token...","v":""},{"ph":"Search the commons...","v":"leaktest"},{"ph":"Search your palettes...","v":"leaktest"}]
```

One `ref("")` at `usePalettePorts.ts:54` is handed to the library port (`:139`), the browse
port (`:183`), the admin port (`:224`) and the colour-name queue (`:69`). The in-file comment
at `PalettesPane.vue:28-32` claiming the field is "scoped — this one owns YOUR list" is
false.

### C-5 — the no-match empty state contradicts itself on screen · **CONFIRMED, and seen**

`pp3-E-final.mjs` E2, five palettes stored, `q = "zzzznomatch"`:

```
{ "heading": "My Palettes5 (5 saved)",
  "gridText": "· EMPTY PLATE · | No saved palettes yet. | Add colors above, then save the set.",
  "cards": 0, "deleteAllVisible": 1, "storedCount": 5 }
```

First-hand capture `pp3-nomatch.png`: the badge **5** sits four inches above **"No saved
palettes yet."**, with the delete-all trash trigger live between them. The dialog's count is
the only thing between that state and unintended bulk deletion.

### C-6/C-7 — `cardRefs` retains unmounted cards · **CONFIRMED, sharpened**

`pp3-E2-refs.mjs` E3 — five palettes, search churned between two filters, then all deleted:

```
initial   : {"cards":5,"refKeys":5,"keys":["id-Alpha","id-Beta","id-Gamma","id-Delta","id-Epsilon"]}
round 1  : {"cards":1,"refKeys":5}
…
round 5  : {"cards":1,"refKeys":5}
filter->0 : {"cards":0,"refKeys":5,"keys":["id-Alpha","id-Beta","id-Gamma","id-Delta","id-Epsilon"]}
after delete-all: {"cards":0,"refKeys":5,"keys":["id-Alpha","id-Beta","id-Gamma","id-Delta","id-Epsilon"]}
```

**Sharpening:** the map is keyed by palette `id`, so churn over a *fixed* id set does not
grow it (pass-2's 2→12 came from distinct palettes). The exact defect is **retention**:
5 `PaletteCard` instance proxies are still held after 0 cards render *and 0 palettes exist
in the store*. Growth is unbounded over *distinct ids ever rendered* — and since
`createPalette` mints a fresh `crypto.randomUUID()` per save (`usePaletteStore.ts:85`),
every save-then-delete cycle adds one permanent entry. `PalettesPane.vue:84`'s
`(el: any) => el && (cardRefs[palette.id] = el)` discards Vue's `null` unmount call, so
nothing is ever released; and because the map is never empty, `onPublish`'s `if (card)`
guard (`:206`) can never take its false branch — it always writes into a possibly-dead
instance.

### C-11 / C-9 — no live region; 16 × 16 unnamed handles · **CONFIRMED** (numbers in P-6, P-7)

---

## Refuted hypotheses (measured negatives — no later seat should re-run these)

- **Post-drag click leakage toggling expand.** Hypothesised: SortableJS lets the trailing
  `click` reach `PalettesPane.vue:91`'s `@click="pm.toggleExpand"`, so every reorder also
  expands a card. **REFUTED** (`pp3-C-drag.mjs` C1):
  `expanded swatch-panels before/after drag: 0 / 0`. SortableJS's `ignoreNextClick`
  capture-phase suppressor (`sortable.esm.js:1014-1023`) does its job.
- **Forced synchronous layout during drag scaling with card count.** Hypothesised:
  `AnimationStateManager.animate`'s `repaint(target) = target.offsetWidth`
  (`sortable.esm.js:665, 668`) thrashes layout once per animated card per dragover.
  **REFUTED** (`pp3-C-drag.mjs` C2, `HTMLElement.prototype.offsetWidth` getter instrumented):
  ```
  cards=  4  forced offsetWidth reads during drag = 9
  cards= 20  forced offsetWidth reads during drag = 9
  cards= 60  forced offsetWidth reads during drag = 9
  ```
  Constant, not linear. Not a performance defect.
- **Duplicate-`id` palette loss in `reorderPalettes`.** Hypothesised: `new Map(palettes.map(p => [p.id, p]))`
  (`usePaletteStore.ts:155`) collapses duplicate ids and the tail loop then skips them, silently
  destroying a palette. **REFUTED by enumeration**: every store ingress mints a fresh key —
  `createPalette` `crypto.randomUUID()` (`:85`), `addPublishedPalette` `palette.id ?? crypto.randomUUID()`
  (`:147`) over remote rows that carry **no** `id` by contract (`types.ts:16-26`). Duplicate real ids
  are unreachable. (Id-*less* entries are handled by the `p.id == null` tail clause — they are the
  P-3 orphans, not a loss path.)
- **The hover swatch popover mispositioned/clipped by `contain: layout style paint`.**
  Hypothesised: `.pane-scroll-fade` (`PaneHeader.vue`, unscoped block) makes the pane a
  containing block for fixed descendants, so `useHoverPopover`'s viewport-coordinate
  `top`/`left` (`useHoverPopover.ts:21-25`) land wrong. **REFUTED by construction**: the panel
  is inside `<Teleport to="body">` (`SwatchHoverMenu.vue:35-49`), outside the contained subtree.
- **`--palettes-ramp-title-*` never defined, so the certified per-site title ramp silently
  falls back.** **REFUTED**: written at runtime by
  `demo/color-picker/composables/boot/useViewAccents.ts:163`
  (`root.setProperty(\`--palettes-ramp-title-${i}\`, stop)`). `PalettesPane.vue:171-175`'s
  fallbacks are genuine belt-and-braces, not a dead alias.
- **Publish has no in-flight guard ⇒ double-submit creates two remote palettes.**
  **INCONCLUSIVE on this host, not refuted.** With the API stubbed at
  `https://api.color.babb.dev/**` and 1 200 ms latency, two publish invocations produced
  `API requests: []` — the `availability.ts` W0-1 latch short-circuits all API traffic on a
  loopback page with no `VITE_API_URL` (the **DEV MISCONFIGURED** banner is visible in my
  capture). The static concern stands and is **unproven**: `PalettesPane.onPublish`
  (`:199-209`) has no in-flight flag, and `createAndSavePalette` (`api/palettes.ts:75-81`)
  mints a **fresh** `crypto.randomUUID()` idempotency key per call — which cannot collapse a
  user double-submit, only a transport retry, contradicting its own comment at `:78-80`.
  Requires a seat with a reachable API to settle.
- **Pass-2's negatives I did not re-run and do not dispute**: `defineModel` staleness (none in
  file), `ValueUnit` nesting (none), `stableHue` (not in path), WebGL (none), reka-ui
  pointer-capture (no slider), double mount, horizontal overflow, `verbatimModuleSyntax`,
  confirm-dialog focus restoration.

---

## Prior-pass adjudication

| prior | verdict then | this pass |
|---|---|---|
| pass-1 D-3 / pass-2 "not re-run" — malformed store crashes at boot | asserted, never measured | **PROMOTED → P-1 BLOCKER.** Measured: 5 of 11 shapes; `bodyText: 0` on **all five routes tested**; survives 3 reloads; crash site `App.vue:154`; `version: 2` accepted verbatim. |
| pass-2 C-1 first-drag scramble | BLOCKER | **CONFIRMED**, independently reproduced (`Alpha Beta Gamma Delta` → `Gamma Delta Beta Alpha`). |
| pass-2 C-2 filtered drag hoists matches | BLOCKER | **Mechanism re-read, stands** (`usePaletteStore.ts:157-166` appends unnamed palettes at the tail). Not re-measured — pass-2's numbers are sound and the code is unchanged. |
| pass-2 C-3 dead `commitEdit`/`cancelEdit` | BLOCKER | **CONFIRMED by source**: `usePaneRouter.ts:153-158` still supplies `"onCommit-edit"` / `"onCancel-edit"`; `toHandlerKey(camelize("commitEdit")) === "onCommitEdit"` and the hyphenate fallback is `update:*`-only. |
| pass-2 C-4 global `searchQuery` | MAJOR | **CONFIRMED**, own numbers. |
| pass-2 C-5 false empty state | MAJOR | **CONFIRMED**, own numbers + own screenshot. |
| pass-2 C-6/C-7 `cardRefs` | MAJOR | **CONFIRMED and sharpened** — retention, not per-render growth; bound is distinct-ids-ever-rendered. |
| pass-2 C-8 malformed colour tears down the pane | MAJOR | Not re-run. Subsumed in blast-radius terms by P-1, which is strictly worse (whole app, not the pane). |
| pass-2 C-9 16 × 16 handle | MINOR | **CONFIRMED and WIDENED → P-2 MAJOR**: the whole expand-gated control set is keyboard-dead, not just the handle. Mobile measured too. |
| pass-2 C-11 no live region | MINOR | **CONFIRMED** (`liveRegions 0`), extended with the uncleared dismiss timer (P-6). |
| pass-2 C-15/C-16 dead imports, vacuous gate | MINOR/INFO | **CONFIRMED**, re-run; extended with the empty `demo/test/palettes/api/` directory and two more green-surviving mutations. |
| — | — | **NEW this pass**: P-1, P-2, P-3, P-4, P-5, P-6, P-7 (harness blindness), plus five measured refutations. |

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| **P-1** | **BLOCKER** | `{"version":1}` in `localStorage` whiteouts the **entire app on every route** (`bodyText: 0`), permanently — `read()` casts instead of parsing, and the crash lands in App's own template |
| *(carried)* C-1 | **BLOCKER** | first drag-reorder of each page load scrambles the persisted library — re-verified first-hand |
| *(carried)* C-2 | **BLOCKER** | drag under a search filter hoists every match to the head of the library |
| *(carried)* C-3 | **BLOCKER** | `commitEdit`/`cancelEdit` never reach a handler — kebab keys in a `Record<string, unknown>` prop bag |
| **P-2** | **MAJOR** | expand is keyboard-unreachable; edit-colour, copy-colour, add-colour, copy-slug and reorder therefore have **no** keyboard route (measured: 1 stop per card, the menu) |
| **P-3** | **MAJOR** | an `isLocal` palette without an `id` is invisible, uncounted, and **survives "Delete all saved palettes"** |
| **P-4** | **MAJOR** | the app's own global reduced-motion guard is inert — glass-ui's later `!important` wins; measured `0.1s`, not the declared `0.01ms` |
| *(carried)* C-4..C-7 | MAJOR | global `searchQuery`; false empty state; `cardRefs` retention; publish writes into a corpse |
| **P-5** | MINOR | `demo/ui/*` is 18-of-19 pure glass-ui re-exports; this file imports through both paths twenty lines apart |
| **P-6** | MINOR | `ActionFeedback` is not a live region (`liveRegions 0`) and its dismiss timer outlives the card |
| **P-7** | INFO | populated-pane tap-target violations are 1 per palette, unbounded — the visual matrix captured an **empty** library, so the route's row is structurally blind |
| **P-8** | INFO | one executable assertion; `demo/test/palettes/api/` is an empty directory; eight feature-deleting mutations stay green |
| **P-9** | INFO | three dead imports; eslint exit 0, `noUnusedLocals` absent |

**Strongest defect: P-1.** It is the only finding whose blast radius is the entire
application rather than one pane; it is triggered by a payload the deserializer's own
validation accepts; it is **permanent** — the app cannot boot to repair the storage it
poisoned; the realistic trigger is the ordinary act of shipping a schema change against a
`version` field that gates nothing; and it renders zero text on screen while producing only
two page errors that no automated observable in the audit harness collects, because the
harness only ever visits the app with a clean store.
