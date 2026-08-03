# CHALLENGE-C — TagEditPopover.vue · implementation

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. The seat was spawned with an explicit Opus 5 declaration and the served tier
matches it; nothing here is inherited or undeclared.

---

## Verdict: **DEFECTIVE** — the component has never once executed its own primary code path

Subject: `demo/palettes/browser/search/TagEditPopover.vue` (87 lines, area `palettes`).
Sole consumer: `demo/palettes/BrowsePane.vue:148-155`.
Repository at `tranche-u` / `c654824e`.

Two independent BLOCKERs sit on top of each other, and each one alone is sufficient to
make the feature dead:

1. the checkboxes are bound to a prop/event pair **that does not exist** on the
   `@mkbabb/glass-ui@7` `Checkbox` — so toggling a tag emits nothing and saves nothing;
2. the popover's `PopoverTrigger` slot is **never filled by its only consumer** — so the
   popper has no anchor and is rendered permanently **307px above the top of the
   viewport**.

Everything downstream of `onToggle` — including the elaborate `W5-13 · F-9` captured-ETag
work at lines 69-74 — is unreachable code that has never run in a browser.

---

## Evidence apparatus

Three probes, all read-only, all under this directory:

| probe | environment | file |
|---|---|---|
| jsdom mount + click | vitest 3.2.6 / jsdom | `probes/c1-checkbox-contract.test.ts` + `probes/vitest.config.ts` |
| **real Chromium** mount + click + geometry | live dev server `http://localhost:9000`, Playwright, viewport 1600×1000 | `probes/live-mount.ts` (`probe()`, `probeA11y()`, `probeEdges()`) |
| gate truth | `vue-tsc` demo program | pasted below |

The live probe imports through Vite's `/@fs/` rail so it resolves the **same** `vue` copy
as the running app; the component, glass-ui and reka-ui are the real installed ones.

Run commands:

```
npx vitest run --config docs/tranches/V/megatranche/audit/components/TagEditPopover/probes/vitest.config.ts
# then, in a page on http://localhost:9000 :
await (await import('/@fs/<repo>/docs/.../probes/live-mount.ts')).probe()
```

---

## C-1 · BLOCKER — the tag checkboxes are bound to a nonexistent prop/event; toggling a tag is a total no-op

**File:** `demo/palettes/browser/search/TagEditPopover.vue:27-31`

```vue
<Checkbox
    :checked="currentTags.includes(tag.name)"
    @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
    class="shrink-0"
/>
```

`Checkbox` resolves `demo/ui/checkbox/index.ts` → `export { Checkbox } from "@mkbabb/glass-ui";`.

**Measured contract of that component** (probe C-2, from the installed package):

```
[C-2] Checkbox prop names = ["modelValue","defaultValue","disabled","value","id","class","asChild","as","name","required"]
[C-2] Checkbox emits      = ["update:modelValue"]
[C-2] has `checked` prop  = false
[C-2] emits `update:checked` = false
```

Corroborated at source: `node_modules/@mkbabb/glass-ui/dist/glass-ui.js:427-451`
(`__name: "Checkbox"`, `props: { modelValue, defaultValue, disabled, value, id, class,
asChild, as, name, required }`, `emits: ["update:modelValue"]`), and
`node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js:20-50` (`modelValue`, no `checked`).

`checked` is therefore not a prop and `update:checked` is not an emit. Both fall through
as plain attrs onto the rendered `<button role="checkbox">`.

**Measured consequence — real Chromium, real component:**

```json
"boxes": [
  { "checkedAttr": "true",  "ariaChecked": "false", "dataState": "unchecked", "w": 16, "h": 16 },
  { "checkedAttr": "false", "ariaChecked": "false", "dataState": "unchecked", "w": 16, "h": 16 }
],
"afterClick": { "dataState": "checked", "ariaChecked": "true",
                "emitted": "[]", "saveTagsCalls": 0 }
```

Read that carefully. It says three things:

- **The palette's applied tags render UNCHECKED.** `currentTags = ["warm"]`, so row 0 is an
  applied tag; the component wrote `checked="true"` — as a *bogus DOM attribute on a
  `<button>`* — while the control's real state is `aria-checked="false"` /
  `data-state="unchecked"`. The user is shown the wrong tag set every time.
- **Clicking emits nothing.** `emitted: "[]"` — `update:tags` never fires, so BrowsePane's
  `onTagsUpdated` never runs.
- **Clicking saves nothing.** `saveTagsCalls: 0` — no `PATCH /palettes/:slug` is ever
  issued. `onToggle` (lines 64-78) is unreachable.

And the failure is **deceptive**: `data-state` flips to `checked` because, with
`modelValue` undefined, reka-ui runs the checkbox *uncontrolled* and toggles its own
internal state. The tick appears. Nothing happens. The user has no signal.

**Mechanism / history.** This is API drift that was wrong *at birth*, not a later
regression. The binding first appears in `a1060e5b` (2026-03-26, "Add TagEditPopover: user
tag CRUD via checkbox popover"). One day earlier, `c3e22169` had already replaced the local
shadcn checkbox with `export { Checkbox } from "@mkbabb/glass-ui"`, and even the local one
it deleted was typed `defineProps<CheckboxRootProps & …>` against `reka-ui: ^2.0.0`
(`git show a1060e5b:package.json`), where reka v2 had already renamed `checked` →
`modelValue`. **The tag-edit feature has never worked, in any commit, for four months.**

**Proposed cure (patch):**

```vue
<Checkbox
    :model-value="currentTags.includes(tag.name)"
    @update:model-value="(v) => onToggle(tag.name, v === true)"
/>
```

**Proposed cure (gestalt).** The patch fixes one of two sites and leaves the class of
defect intact. The real transposition: the demo consumes glass-ui primitives through
one-line barrels (`demo/ui/checkbox/index.ts`) that erase every type, and the template
compiler treats unknown component attrs as legal fallthrough — so *no gate in this repo can
see a mis-bound design-system control*. Either (a) type the barrel re-exports so the demo
program sees `CheckboxProps` (turning the mismatch into a vue-tsc error), or (b) hoist the
"checkbox + label + trailing category" row into a glass-ui primitive so no consumer
hand-maps the control's props at all. (b) is the owner-edict-aligned move: glass-ui is the
design system, and this row shape already exists twice in `search/`.

---

## C-2 · BLOCKER — the trigger slot is never filled; the popover has no anchor and renders 307px off the top of the viewport

**File:** `demo/palettes/browser/search/TagEditPopover.vue:2-5`

```vue
<Popover :open="open" @update:open="$emit('update:open', $event)">
    <PopoverTrigger as-child>
        <slot name="trigger" />
    </PopoverTrigger>
```

**The only consumer passes no such slot** — `demo/palettes/BrowsePane.vue:148-155`:

```vue
<TagEditPopover
    v-if="tagEditPalette"
    :open="tagEditOpen"
    :palette-slug="tagEditPalette.slug"
    :current-tags="tagEditPalette.tags ?? []"
    @update:open="tagEditOpen = $event"
    @update:tags="onTagsUpdated"
/>
```

It is opened *programmatically* from the palette-card menu
(`PaletteCardMenu.vue:83-90` → `BrowsePane.vue:307-310`), never from its own trigger. This
is also original: the same slot-less usage is in `git show a1060e5b:demo/@/components/custom/panes/BrowsePane.vue:84-91`.

**Measured — real Chromium:**

```json
"hostHTML": "<!--teleport start--><!--teleport end-->",
"wrapperStyle": "position: fixed; left: 0px; top: 0px; transform: translate(0px, -200%); min-width: max-content; --reka-popper-transform-origin: ; z-index: 130;",
"wrapperRect": { "x": 0, "y": -307.625, "width": 208, "height": 153.8125, "bottom": -153.8125 }
```

The component's entire non-teleported output is two teleport marker comments: the
`PopoverTrigger` renders **zero elements**, so no element carries the `id`,
`aria-haspopup="dialog"` or `aria-expanded` that `reka-ui/dist/Popover/PopoverTrigger.js:29-42`
would have applied, and `PopperAnchor` never registers a reference.

The mechanism is exact and environment-independent:

- `@floating-ui/vue/dist/floating-ui.vue.mjs:120-122` —
  `function update() { if (referenceElement.value == null || floatingElement.value == null) { return; } … }`
  → `isPositioned` (set only inside the `.then()` at line 141) stays `false`;
- `reka-ui/dist/Popper/PopperContent.js:238` —
  `transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)"`.

So the tag editor is painted at `y = -307.6` on a 1000px-tall viewport: **entirely above
the window, invisible, unclickable, at every viewport size**. A user who clicks "Edit Tags"
sees nothing happen.

**Collateral a11y defect from the same cause.** The content element gets
`role="dialog"` with `aria-labelledby="reka-popover-trigger-v-0"`, and:

```json
"dialogName": { "ariaLabelledby": "reka-popover-trigger-v-0",
                "labelledbyResolvesInDocument": false,
                "ariaLabel": null,
                "computedNameSource": "(no element with that id — name is EMPTY)" }
```

A dangling IDREF → the dialog's accessible name computes to empty. This is a nameless
dialog, of exactly the class the visual REPORT counts (18 `namelessButtons`) but never saw,
because it never opened it.

**Proposed cure (gestalt, not patch).** Do not add an anchor prop. The honest reading of
the usage is that this is **not a popover**: it is a programmatically-opened, palette-scoped
editing panel with no trigger of its own, portaled to `<body>`, sitting next to
`VersionHistoryDrawer` and `FlagReportDialog` in BrowsePane which are already
`Dialog`/`Sheet`. Transpose it to the glass-ui `Dialog` it already behaves like, delete the
dead `#trigger` slot, and it gains a real name, a focus trap, focus restoration and an
Escape contract for free — all of which C-6 shows it currently lacks. (If the owner wants
it visually tethered to the card, the reka way is `PopoverAnchor` bound to the card element
— but that requires BrowsePane to hand down an element ref, which it does not have.)

---

## C-3 · MAJOR — optimistic emit with no rollback; every save failure is swallowed in silence

**Files:** `TagEditPopover.vue:76-77`, `demo/palettes/useTagEdit.ts:60-64`,
`demo/palettes/BrowsePane.vue:312-320`

```ts
emit("update:tags", updated);
await tagEdit.saveTags(paletteSlug, updated, ifMatch);   // return value DISCARDED
```

```ts
// useTagEdit.ts:60-64
} catch (e) {
    console.warn("Failed to update tags:", e);
    return undefined;
}
```

The emit runs *first* and BrowsePane writes it straight into the browse list and the
dialog-backing palette (`BrowsePane.vue:314-319`). `saveTags` then swallows every failure —
412, 428, 5xx, offline — returns `undefined`, and the caller ignores it. There is no
rollback, no error surface, no toast, no `aria-live`, nothing in the popover at all.

Result: the tag reads as applied until the next page load, at which point it silently
vanishes. The user's mental model and the server disagree and nothing tells them.

**Reproduction: NONE — this is a latent defect.** It cannot fire today because C-1 makes
`onToggle` unreachable. It goes live the instant C-1 is cured. Labelled as a hypothesis
with a proven mechanism, not a measured failure.

**Proposed cure.** `saveTags` already returns the authoritative `Palette`. Stop guessing:
await the save, and emit/fold the **returned** palette. On `undefined`, surface the failure
in the popover and leave the checkbox where it was. Better still, move the whole
read-modify-write into `useTagEdit` (which owns the catalog and the commit) so the
component emits an intent and never owns the optimistic copy.

---

## C-4 · MAJOR — the PATCH response is dropped, so the locally-held If-Match validator goes stale

**Files:** `TagEditPopover.vue:69-77`, `demo/palettes/api/palettes.ts:172-178`,
`api/src/modules/palette/service/crud.ts:178`, `api/src/modules/palette/etag.ts:37-49`

The component captures the validator from the browse row it holds:

```ts
const source = pm.remotePalettes.value.find((p) => p.slug === paletteSlug);
const ifMatch = source ? paletteETag(source) : undefined;
```

`paletteETag` is `currentHash ?? updatedAt` (`palettes.ts:176`). The server's
`patchPalette` **always** bumps `updatedAt` (`crud.ts:178`, `const $set = { updatedAt: new
Date() }`) and only changes `currentHash` when *name or colors* change (`crud.ts:188-194`)
— a tags-only patch never does.

So for any palette whose `currentHash` is null — a case `paletteETag` explicitly exists to
handle ("the `updatedAt` timestamp when currentHash is null, e.g. pre-version palette",
`api/src/modules/palette/etag.ts:5-7`) — the *second* tag toggle in a session sends the
pre-first-toggle `updatedAt` as `If-Match`, `assertIfMatch` throws
`PreconditionFailedError` (`etag.ts:44-49` → 412), and C-3 swallows it. Silent lost update.

More generally: `saveTags` returns the fresh palette and the component throws it away, so
every other If-Match-guarded verb that reads from `pm.remotePalettes` (rename / publish /
unpublish, all of which take `paletteETag(palette)`) inherits a stale validator after any
tag edit.

**Reproduction: NONE (blocked behind C-1).** Mechanism proven by source; would reproduce as
"toggle two tags in a row on a pre-version palette → the second is silently dropped".

**Proposed cure.** Same as C-3: fold the returned `Palette` back into `pm.remotePalettes`.
The optimistic guess and the authoritative response are two sources of truth for one row;
delete the guess.

---

## C-5 · MAJOR — an object-shaped `/colors/tags` payload renders an EMPTY popover and skips the empty state

**File:** `TagEditPopover.vue:16` (`v-else-if="tagEdit.allTags.value.length === 0"`)

The repo's own record says this payload shape is real. `BrowsePane.vue:211-219`, the
sibling consumer of the *same* `pm.tagEdit.allTags`, carries the X9 note and defends:

```ts
// X9: coerce to an Array. `allTags` is typed `Tag[]` but the `/colors/tags`
// read can resolve an object-shaped payload; a non-array reaching the
// `availableTags: Tag[]` prop fires Vue's "Expected Array, got Object" prop warning.
const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
return Array.isArray(tags) ? tags : Object.values(tags);
```

`TagEditPopover` does not. `({}).length` is `undefined`, `undefined === 0` is `false`, so
the "No tags available." branch is skipped and control falls to the `v-for`, which over an
empty object yields zero rows.

**Measured — real Chromium, `allTags = ref({})`:**

```json
"objectPayload": { "renderedText": "Tags", "showsEmptyState": false }
```

The user gets a bare "Tags" heading over blank space. No spinner, no empty state, no error.

**Proposed cure.** Coerce **once**, in `useTagEdit` where the read lives — not in each
consumer. One consumer defending and the other not is the drift itself; and a per-consumer
`Array.isArray` guard is exactly the masking-fallback the standing edicts forbid. The
correct fix is to make `getTags()` return `Tag[]` or throw, so no consumer needs a guard.

---

## C-6 · MAJOR — accessibility: no live region, nameless dialog, focus never enters, nothing to restore to

**Measured — `probeA11y()`, real Chromium:**

```json
"loadingState": { "hasAriaLive": false, "hasAriaBusy": false, "hasRoleStatus": false },
"dialog":       { "ariaLabel": null, "ariaLabelledby": "reka-popover-trigger-v-0", "ariaDescribedby": null },
"focusOnOpen":  "tep-sentinel",
"focusBefore":  "tep-sentinel",
"focusAfterClose": "tep-sentinel",
"emptyStateHTML": "Tags No tags available."
```

Findings, in order of severity:

1. **The async catalog result is never announced.** `TagEditPopover.vue:11-18` swaps a
   spinner for a list (or for "No tags available.") with no `aria-live`, no `aria-busy`, no
   `role="status"` anywhere in the content subtree. A screen-reader user gets silence.
2. **Nameless dialog** — see C-2. `aria-labelledby` points at an id that is not in the
   document; the visible "Tags" heading at line 8 is a `<div class="section-label">`, not
   anything the dialog references. One line fixes it: give the heading an `id` and set
   `aria-labelledby` on `PopoverContent` — or let the Dialog transposition of C-2 do it.
3. **Focus never enters the panel on open** (`focusOnOpen` equals the pre-open element).
   Combined with C-2's missing trigger there is *no* keyboard path to the checkboxes and no
   element to restore focus to on close.
4. **Tap target.** The focusable control is **16×16 px** (measured). The `<label>` row it
   sits in is **150 × 31.52 px**, so pointer-target-size (WCAG 2.5.8, 24×24 minimum) is
   satisfied by the row — but the row is a `<label>` wrapping an interactive
   `<button role="checkbox">`, which is a labelable-content nesting the spec discourages and
   which gives the button the accessible name `"warm mood"` (tag + category concatenated,
   measured `accName: "warmmood"`). The category should be `aria-hidden` decoration or
   moved out of the label.

---

## C-7 · MAJOR (vacuous gate) — zero tests, and the HARD typecheck gate cannot see C-1

**Test truth — there are no tests at all:**

```
$ grep -rln "TagEdit\|Edit Tags\|editTags" test/ e2e/
$ echo $?
1
$ grep -rln "useTagEdit" test/ | wc -l
0
```

No unit test, no component test, no e2e spec touches this component, its composable, or the
"Edit Tags" menu item. There is no mutation that would turn a gate red, because there is no
gate: **deleting the entire `<script setup>` block keeps CI green.** That is the maximal
vacuous-gate finding — the component is not merely under-tested, it is untested.

**And the hard typecheck gate is blind to C-1:**

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
$ echo $?
0
$ npx vue-tsc -p tsconfig.demo.json --noEmit 2>&1 | grep -i TagEditPopover
$ echo $?           # no matches
1
```

Zero diagnostics, exit 0, while `:checked` and `@update:checked` are bound to a component
that declares neither — because unknown component attributes are legal fallthrough in Vue's
template type-checking. CI has been HARD on demo-typecheck since `ef57230b` and it has been
green over a dead feature the entire time. A green gate here is not evidence of anything.

**Proposed cure.** A component test that mounts with `currentTags: ["warm"]`, asserts the
first checkbox reports `aria-checked="true"`, clicks the second, and asserts one
`update:tags` emission and one `saveTags` call — i.e. exactly `probes/c1-checkbox-contract.test.ts`
(`C-1`/`C-3`) promoted from `docs/` into `test/`, with the `console.log`s turned into
`expect`s. It fails today on all three assertions.

---

## C-8 · MINOR — the identical dead binding in the sibling; this is a two-site mechanism family

```
$ grep -rn "update:checked\|:checked=" demo/ --include="*.vue"
demo/palettes/browser/search/SearchFilterBar.vue:52:  :checked="selectedTags.includes(tag.name)"
demo/palettes/browser/search/SearchFilterBar.vue:53:  @update:checked="toggleTag(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:28:   :checked="currentTags.includes(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:29:   @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
```

Two sites, both in `search/`. `SearchFilterBar`'s tag **filter** checkboxes are dead by the
same mechanism — and unlike this component they are reachable on `/#/browse` without
authentication, so the browse tag filter is publicly broken. Out of scope for this seat's
subject, but it is the same defect and must be cured in the same stroke.

---

## C-9 · MINOR — three load paths for one cached catalog, and the catalog never refreshes

- `BrowsePane.vue:222-224` — `onMounted(() => pm.tagEdit.loadAllTags())`
- `TagEditPopover.vue:80-82` — `watch(() => open, isOpen => { if (isOpen) tagEdit.loadAllTags(); })`
- `TagEditPopover.vue:84-86` — `onMounted(() => { if (open) tagEdit.loadAllTags(); })`

**Measured** (`probeEdges().openWatch`): `{ afterMountClosed: 0, afterOpen: 1, afterReopen: 2 }`
— the watch does fire (reactive props destructure is working), on every open.

All three are no-ops after the first because of `useTagEdit`'s `loaded` guard
(`useTagEdit.ts:33-35`). Two consequences:

1. two of the three paths are dead weight — a dual-path smell the standing edicts forbid;
   the `onMounted` variant exists only because BrowsePane sets `tagEditPalette` and
   `tagEditOpen = true` in the same synchronous handler, so the component mounts already
   open and the non-immediate watch misses the first open. `{ immediate: true }` on the
   watch collapses both into one;
2. because the guard is permanent and nothing calls `loadAllTags(true)`, **the tag catalog
   is fetched once per session and never refreshed** — a tag created in the admin tags pane
   is invisible to the tag editor until a full reload.

---

## C-10 · INFO — the visual audit never exercised this component

`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` shows
`/#/browse` in the API-unreachable state ("The commons is unreachable. / Failed to load
palettes / Retry") — no palette cards, therefore no card menu, therefore no "Edit Tags",
therefore no popover. `REPORT.md` rows for `/#/browse` read `text 280 / overflowX 0 /
pageErr 0 / consoleErr 0` in all four matrices, and `/#/browse` appears in **none** of the
18 `namelessButtons` rows. `STATES.json` contains no tag-popover state (its state set is
rtl / zoom-200 / forced-colors / reduced-motion / keyboard-focus only).

So the nameless dialog of C-2 and everything else here is **outside the visual audit's
reach** — this component contributes zero rows to REPORT.md not because it is clean but
because it was never opened. Any future state matrix must include an authenticated
owned-palette browse state.

---

## C-11 · INFO — no busy state, no disabled state, no error surface, no close affordance

`onToggle` is `async` and fires a PATCH with nothing marking the row in flight, nothing
disabling the control, and nothing to render a failure. Two quick toggles issue two
concurrent, unordered PATCHes against the same captured validator (C-4), last-write-wins.
The panel also offers no explicit Done/Close control — only outside-click / Escape, which
C-6 shows are not reachable by keyboard today. Latent behind C-1; must be designed in when
C-1/C-2 are cured, not bolted on after.

---

## Family grouping

| family | findings | one-line mechanism |
|---|---|---|
| **design-system API drift, invisible to every gate** | C-1, C-8, C-7 | untyped barrel re-exports + legal attr fallthrough ⇒ a mis-bound glass-ui control compiles clean and has no test |
| **wrong primitive for the interaction** | C-2, C-6, C-11 | a programmatically-opened panel modelled as a trigger-anchored Popover ⇒ no anchor, no name, no focus contract |
| **two sources of truth for one row** | C-3, C-4 | optimistic emit kept, authoritative PATCH response discarded ⇒ silent divergence + stale validator |
| **defensive coercion in the wrong layer** | C-5, C-9 | the port returns an untrusted shape and caches it forever; each consumer guards (or doesn't) on its own |

## The single strongest defect

**C-1.** Every tag checkbox in this popover is bound to `:checked` / `@update:checked`,
which `@mkbabb/glass-ui@7`'s `Checkbox` does not declare (it declares `modelValue` /
`update:modelValue`). Measured in real Chromium: applied tags render **unchecked**
(`checked="true"` leaked as a DOM attribute while `aria-checked="false"`), and a click
produces `emitted: []` and `saveTagsCalls: 0` while the tick visually appears. The tag CRUD
feature announced in `a1060e5b` has never worked in any commit — and C-2 guaranteed nobody
would ever see the panel to notice.

---

## Artifacts

- `docs/tranches/V/megatranche/audit/components/TagEditPopover/probes/vitest.config.ts`
- `docs/tranches/V/megatranche/audit/components/TagEditPopover/probes/c1-checkbox-contract.test.ts` — jsdom mount/click/contract, 5 probes
- `docs/tranches/V/megatranche/audit/components/TagEditPopover/probes/live-mount.ts` — real-browser `probe()` / `probeA11y()` / `probeEdges()`

No file outside this directory was modified. `vue-tsc -p tsconfig.demo.json --noEmit` still
exits 0 after these additions (`tsconfig.demo.json` includes only `demo/`).
