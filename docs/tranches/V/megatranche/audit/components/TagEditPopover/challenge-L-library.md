# CHALLENGE-L — library structure · `demo/palettes/browser/search/TagEditPopover.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this seat
was explicitly spawned with. Declared, not inherited. No seat-tier defect.

- Subject: `/Users/mkbabb/Programming/value.js/demo/palettes/browser/search/TagEditPopover.vue` (87 lines)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Area: `palettes` · sole consumer `demo/palettes/BrowsePane.vue:148-155`
- Date of audit: 2026-07-29

**Verdict: DEFECTIVE — two independent BLOCKERs, both proven by executed runtime probe.**
The component is 100% non-functional in the shipped app: it can neither display the palette's
current tags nor save a change, and its content node is pinned off-screen. Both defects are
library-structure defects in the exact sense this seat interrogates — a consumer written against a
**component API that does not exist** (radix-vue-era, dead since 2026-02-24) and a **component
whose declared public surface (`trigger` slot) its only consumer does not use**, with no gate in
the repo able to see either.

---

## 0. Method + evidence apparatus

Every number below is measured. The runtime probes were executed with a scratchpad-only vitest
config (no repo file was created or modified):

- config: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/chal-L-tep/vitest.config.ts`
- probes: `checkbox-probe.test.ts`, `tep-mount.test.ts`, `tep-anchor.test.ts` (same dir)
- all three mount the **real** `TagEditPopover.vue` / the **real** `@mkbabb/glass-ui@7.0.0`
  `Checkbox` against the repo's own `reka-ui` + `vue` (deduped exactly as `vite.config.ts:92-99`).

No source edit landed. Nothing outside this report directory was written in the repo.

**Visual-audit coverage of this component is ZERO.** `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png`
(read; image reproduced in the matrix) shows *"The commons is unreachable. / Failed to load
palettes"* — the API was down for the whole Safari matrix. `TagEditPopover` is gated behind
`v-if="tagEditPalette"` (BrowsePane.vue:149), which requires a browse card, which requires a
loaded commons. So the component never rendered in **any** of the 60 captures. The visual matrix
cannot be cited as evidence of health here, in either direction. That gap is itself finding L-9.

---

## 1. Import trace — every edge, with its home

`TagEditPopover.vue:42-47`, as **served by the live dev server** (`http://localhost:9000`,
`/@fs/…/TagEditPopover.vue`, verbatim):

| # | Source line | Resolves to | Verdict |
|---|---|---|---|
| 1 | `import { inject, onMounted, watch } from "vue"` | `.vite/deps/vue.js` | clean |
| 2 | `import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"` | `demo/ui/popover/index.ts` → `.vite/deps/@mkbabb_glass-ui.js` (**231,357 B root barrel**) | **L-4** |
| 3 | `import { Checkbox } from "../../../ui/checkbox"` | `demo/ui/checkbox/index.ts` → same 231 KB root barrel | **L-1, L-4** |
| 4 | `import { Loader2 } from "@lucide/vue"` | `.vite/deps/@lucide_vue.js` | **L-8** (design-system bypass) |
| 5 | `import { paletteETag } from "../../api"` | `demo/palettes/api/index.ts` — a **7-module barrel incl. all 4 admin API modules** | **L-5, L-6** |
| 6 | `import { BROWSE_PORT_KEY } from "../../usePalettePorts"` | the **32-member** browse port | **L-3** |

There is **no `@mkbabb/value.js` import at all** — so the published-subpath question is vacuous
here: this leaf makes zero contact with the library the demo exists to dogfood. Not a defect on
its own; recorded so the next seat does not re-derive it.

`verbatimModuleSyntax` (edict 8): **CLEAN.** All six imports are value imports; none is type-only.

Vue 3.5 idiom (edict 7): **CLEAN.** Reactive props destructure at line 49 with `watch(() => open, …)`
at line 80 — the compiler rewrites the getter to `__props.open`, which is the correct idiom.

---

## 2. Findings

### L-1 · BLOCKER — the `Checkbox` binding is a radix-vue-era API that has not existed since 2026-02-24. The component can neither show nor save a tag.

`TagEditPopover.vue:27-31`:

```vue
<Checkbox
    :checked="currentTags.includes(tag.name)"
    @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
    class="shrink-0"
/>
```

`@mkbabb/glass-ui@7.0.0` `Checkbox` (decompiled from `node_modules/@mkbabb/glass-ui/dist/glass-ui.js`,
`src/components/checkbox/Checkbox.vue` region):

```js
props: { modelValue, defaultValue, disabled, value, id, class, asChild, as, name, required },
emits: ["update:modelValue"],
```

There is **no `checked` prop and no `update:checked` emit**. Same for the underlying
`reka-ui` `CheckboxRoot` — `node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js:71`:
`emits: ["update:modelValue"]`.

**Reproduction (executed).** `checkbox-probe.test.ts` — mount the real glass-ui `Checkbox` with
`:checked="true"`:

```
HTML: <button data-slot="checkbox" class="checkbox control-surface glass-control-edge focus-ring tap-squish"
        checked="true" role="checkbox" type="button" aria-checked="false"
        aria-required="false" data-state="unchecked">…</button>
aria-checked BEFORE click: false
data-state  BEFORE click: unchecked
EMITTED EVENT NAMES: ["click","update:modelValue"]
```

vs. the correct binding in the same file:

```
[modelValue] aria-checked BEFORE: true
[modelValue] EMITTED: ["update:modelValue","click"]
[modelValue] payload: [[false]]
```

`checked="true"` leaks through Vue attr-fallthrough as a **raw DOM attribute on a `<button>`**
(`checked` is an `<input>` attribute; on `<button>` it is inert). `aria-checked` stays `false`.

**Reproduction at the component level (executed).** `tep-mount.test.ts` mounts the real
`TagEditPopover` with `currentTags: ["warm"]` and catalog `[warm, cool]`:

```
checkbox count: 2
states: [
  { aria: 'false', state: 'unchecked', rawCheckedAttr: 'true'  },   ← "warm" IS a current tag
  { aria: 'false', state: 'unchecked', rawCheckedAttr: 'false' }
]
body text: Tagswarmmoodcoolmood
--- click the first checkbox ---
saveTags calls after click: 0
emitted update:tags: null
```

So: (a) a tag that **is** on the palette renders unchecked; (b) clicking it calls `onToggle`
**zero** times, emits `update:tags` **zero** times, and issues **no PATCH**. The component's entire
purpose does not execute.

**Age.** `git log -S'update:checked'` → the binding was authored in `a1060e5b`
(*"fix(demo): browse crash, mini color picker, tag CRUD, typography"*, **2026-03-26**). The
radix-vue → reka-ui migration landed `8dc5d31c` **2026-02-24**. The code was therefore written
**one month after** the API it targets was deleted — **born dead, dead for 124 days**, carried
verbatim through two subsequent restructures (`8fbd45f1` T.W1, `a61094e3` V.W43b3).

**Family — this is not a singleton.** `demo/palettes/browser/search/SearchFilterBar.vue:51-55`
carries the identical dead binding:

```vue
<Checkbox :checked="selectedTags.includes(tag.name)" @update:checked="toggleTag(tag.name)" class="shrink-0" />
```

Those two are the **only** two `<Checkbox>` usages in the entire demo tree
(`grep -rn -A4 '<Checkbox' demo/`), so the defect rate for this primitive is **2 of 2 — 100%**.

**Gate blindness (compounding).** `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0, zero
errors** (run to completion, timed). The repo's strictest gate cannot see this: Vue treats an
undeclared `:checked` and an unhandled `@update:checked` as fallthrough attrs, which are always
legal. The type gate is structurally incapable of catching component-API drift for any
glass-ui primitive. That is why a dead API survived four months and three refactors.

**Cure (gestalt, not patch).** Not "rename to `modelValue`" at two call sites. The right move is
to make the binding unwritable-wrong: extract the tag checklist into a single owned component
(§4, `TagChecklist.vue`) so exactly **one** file in the repo touches `<Checkbox>`, and let that
component take `v-model` on a `string[]`. Two hand-copied checkbox loops collapse to one; the
API can then only be wrong in one place, and that place is unit-testable. Separately: glass-ui
should ship this as a real primitive — a checkbox **list** bound to a value set is a design-system
concern, not a demo concern (edict 4).

---

### L-2 · BLOCKER — the popover has no anchor. Its `trigger` slot is part of the public API and its only consumer leaves it empty; the content is pinned off-screen at `translate(0, -200%)`.

`TagEditPopover.vue:3-5` declares an anchored (uncontrolled-style) surface:

```vue
<PopoverTrigger as-child>
    <slot name="trigger" />
</PopoverTrigger>
```

`BrowsePane.vue:148-155` — the **only** consumer in the repo (`grep -rn 'TagEditPopover' demo/`) —
uses it as a fully-controlled *detached* dialog and passes **no `trigger` slot content**:

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

**Mechanism, from vendor source.** `reka-ui/dist/Primitive/Slot.js` — with an empty slot the
children are all `Comment` nodes, `firstNonCommentChildrenIndex === -1`, and it returns the comments:
**no element is produced**. `PopoverTrigger.js` wraps that in `PopperAnchor as-child`, so
`rootContext.anchor` never receives a node. `PopperContent.js:196` computes
`reference = props.reference ?? rootContext.anchor.value` → `undefined`; `@floating-ui/vue`'s
`useFloating` only flips `isPositioned` after a successful `computePosition`, which requires a
reference. `PopperContent.js:238`:

```js
transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)"
```

With no reference, `isPositioned` is **permanently false** and the transform never leaves its
pre-measure hiding position — **200% above the viewport top**, in a real browser as much as in
jsdom.

**Reproduction (executed).** `tep-anchor.test.ts`:

```
                     TRIGGER ELEMENTS (aria-haspopup=dialog): 0
                     CONTENT PRESENT: true
                     POPPER WRAPPER STYLE: position: fixed; left: 0px; top: 0px;
                                           transform: translate(0, -200%); min-width: max-content;
[same component, trigger slot filled] TRIGGER ELEMENTS: 1
```

Zero anchor elements under the shipped usage; one when the slot is filled. The content *mounts*
(its text is in the DOM — which is why an a11y crawler would report it as present) and is
positioned off-screen.

Secondary consequence from the same root: `PopoverTrigger.js` sets
`rootContext.triggerElement.value = triggerElement.value` on mount → `undefined`, so reka's
focus-return-on-close has no element to return focus to. Keyboard focus is lost on dismiss.

**This is a library-structure defect, not a styling bug.** The component publishes a *two-mode*
API — anchored-with-trigger **and** detached-controlled — and ships only the mode it does not
support. That is a dual path (edict 2) with the live branch broken and the dead branch untested.

**Cure (architectural transposition).** Delete the popover shell entirely. The tag editor is
opened from `PaletteCardMenu.vue:86` (`@click="$emit('action','editTags')"`), which is *already
inside a `DropdownMenu`*. glass-ui 7.0.0 exports `DropdownMenuSub` / `DropdownMenuSubTrigger` /
`DropdownMenuSubContent` (`demo/ui/dropdown-menu/index.ts:1`). Render the tag checklist as a
**submenu of the menu that already opens it**. One move deletes: the `trigger` slot, the anchor
problem, the focus-return problem, `BrowsePane`'s `tagEditOpen` + `tagEditPalette` + `onEditTags`
+ `onTagsUpdated` (BrowsePane.vue:304-320), and the `v-if` mount/unmount churn — and it is
positioned correctly by construction because the parent menu owns the anchor.

---

### L-3 · MAJOR — the leaf injects a 32-member god port to use 2 of them, and uses one of those to re-find an object its parent already holds.

`TagEditPopover.vue:61-62`:

```ts
const pm = inject(BROWSE_PORT_KEY)!;
const tagEdit = pm.tagEdit;
```

`browsePort` (`demo/palettes/usePalettePorts.ts:150-192`) has **32 members** (enumerated
programmatically):

```
remotePalettes, browsing, browseError, hasMore, loadingMore, loadRemotePalettes,
loadMoreRemotePalettes, filteredBrowse, sortMode, sortLoading, onSortChange, tierFilter,
selectedTags, onSaveRemote, onSetVisibility, onVote, onRename, onDeleteOwned, expandedId,
toggleExpand, onEditColor, onSwatchAddColor, onFeaturePalette, onAdminDeletePalette,
searchQuery, isAdminAuthenticated, userSlug, ensureUser, ensureSession, versions, tagEdit, flagged
```

`TagEditPopover` uses **2** — `tagEdit` and `remotePalettes`. **6.25% utilisation.** Included in
the 30 it does not use: `onAdminDeletePalette`, `onFeaturePalette`, `onSetVisibility`,
`isAdminAuthenticated` — a tag-checkbox list is one keystroke from admin destructive operations.

The file header at `usePalettePorts.ts:22-31` states the intent — *"the RF-15 §b 6 dissolution of
the old `usePaletteManager` god facade … into FIVE narrow, feature-owned ports … no consumer
injects a member outside the port it named"*. The dissolution went from one 153-member facade to
five facades of which the largest is 32. Measured against its own stated invariant this port is
still a god module (edict 1); this component is the proof, because its true dependency is
**one composable and one string**.

Worse — the second member is used for a lookup the parent already performed. `TagEditPopover.vue:73`:

```ts
const source = pm.remotePalettes.value.find((p) => p.slug === paletteSlug);
```

`BrowsePane.vue:305-309` holds `tagEditPalette = ref<Palette | null>(null)` — **the whole object** —
and at line 151-152 destructures it into two scalars (`:palette-slug`, `:current-tags`) for the
child; the child then does an **O(n) linear scan of the global browse list to reconstitute the
object the parent had in hand.** With the 50-row page cap plus load-more, that is a scan of up to
the full loaded commons on every checkbox toggle.

**Cure.** Pass the palette. `:palette="tagEditPalette"` deletes the `remotePalettes` dependency,
deletes the scan, deletes the `undefined` branch of L-6, and drops the injection to a single
member — at which point the inject should be a prop too, and the component becomes pure (§4).

---

### L-4 · MAJOR — `demo/ui/` is a 19-module pure re-export shim over glass-ui, and it is the only thing in the demo pulling glass-ui's 231 KB root barrel instead of a subpath.

Every module in `demo/ui/` is a one-line re-export. Measured:

```
alert(11 lines) avatar badge button card checkbox collapsible dialog dropdown-menu input label
popover radio-group select separator skeleton slider switch tooltip   — 18 of 19 are ONE line
```

```
demo/ui/popover/index.ts:1   export { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui";
demo/ui/checkbox/index.ts:1  export { Checkbox } from "@mkbabb/glass-ui";
```

That is an alias layer — a second name for a thing that already has a name — which edict 2
prohibits ("no aliases, migration shims, dual paths"). It buys nothing: no wrapping, no defaults,
no variant, no token. It is a rename.

**It also costs, measurably.** glass-ui 7.0.0 ships per-component subpaths
(`node_modules/@mkbabb/glass-ui/package.json#exports` includes `"./popover"`), but the shim
re-exports from the **root**. Transitive closure of each dist entry (measured by script over the
real `dist/`):

| entry | files | bytes |
|---|---:|---:|
| `glass-ui.js` (root barrel) | 66 | **224,193** |
| `popover.js` (subpath) | 7 | **13,960** |
| `search.js` (subpath) | 22 | 61,407 |

**16.1× bytes, 9.4× files.** And the live dev server confirms the root barrel is what actually
gets served — verbatim from `curl http://localhost:9000/@fs/…/demo/ui/popover/index.ts`:

```js
export { Popover, PopoverTrigger, PopoverContent }
  from "/@fs/Users/mkbabb/Programming/value.js/node_modules/.vite/deps/@mkbabb_glass-ui.js?v=fb04632a";
```

`ls node_modules/.vite/deps/` → `@mkbabb_glass-ui.js` = **231,357 B**. There is **no**
`@mkbabb_glass-ui_popover.js` in `.vite/deps` — because nothing in the demo imports the popover
subpath; all five popover consumers route through the shim.

**The inconsistency is inside this component's own parent.** `BrowsePane.vue:196` imports
`SearchBar` from `"@mkbabb/glass-ui/search"` — the subpath idiom — and `.vite/deps` duly contains
`@mkbabb_glass-ui_search.js` (15,893 B). So the same file demonstrates both idioms: subpath for
`SearchBar`, 231 KB root barrel (via shim) for the `Popover` and `Checkbox` its child renders.

Census of the whole demo tree confirms the shim is the sole offender: of the 18 direct
`from "@mkbabb/glass-ui"` root imports outside `demo/ui/`, **all 18 are composables**
(`writeClipboard`, `useClipboard`, `useTouchGate`) for which glass-ui publishes no subpath. Every
glass-ui *component* the demo consumes goes through a subpath (`/dock` ×15, `/search` ×4,
`/tabs` ×3, `/dialog` ×2, `/chip` ×1) **or** through `demo/ui/*` → root barrel. The shim is the
one and only structural reason the root barrel is in the graph.

**Cure.** Delete `demo/ui/` (19 directories, 19 files, ~0 logic). Rewrite the 5 popover consumers
and 2 checkbox consumers to `@mkbabb/glass-ui/popover`. Where glass-ui lacks a subpath —
**`./checkbox` is absent from the exports map** (verified against the 70-entry list) — that is a
glass-ui gap to relay through the standing BH/BI inbox fond, not a reason to keep the shim.
Adding `./checkbox` (and `./avatar`, `./radio-group`, `./skeleton`) upstream is the correct home
for the fix (edict 4).

---

### L-5 · MAJOR — `paletteETag` is implemented twice, and the demo's copy lives in the leaf's import path. There is no single home for the wire contract.

`TagEditPopover.vue:46,74`:

```ts
import { paletteETag } from "../../api";
const ifMatch = source ? paletteETag(source) : undefined;
```

`demo/palettes/api/palettes.ts:167-179`:

```ts
/** Derive the strong ETag for a palette from its at-rest fields, mirroring the
 *  API's `paletteETag()` (`api/src/middleware/etag.ts`) … */
export function paletteETag(palette: { currentHash?: string; updatedAt: string }): string {
    const value = palette.currentHash ?? palette.updatedAt;
    return `"${value}"`;
}
```

`api/src/modules/palette/etag.ts:23-26`:

```ts
export function paletteETag(p: Pick<Palette, "currentHash" | "updatedAt">): string {
    const value = p.currentHash ?? p.updatedAt.toISOString();
    return `"${value}"`;
}
```

Two implementations of one concept, hand-mirrored — the docstring **says so out loud** — with a
type gap (`string | null` + `Date` server-side vs `string | undefined` + `string` client-side) and
a **stale path reference**: the comment cites `api/src/middleware/etag.ts`, which does not exist;
the real home is `api/src/modules/palette/etag.ts`. The mirror has already drifted in its own
documentation.

The same duplication runs one level up: `api/src/modules/palette/format.ts:14-48`
(`FormattedPalette`) and `demo/palettes/types.ts:14-63` (`Palette`) are two hand-written
descriptions of one wire object, and they disagree — `updatedAt: Date` vs `string`,
`currentHash: string | null` vs `string | undefined`, `tags: string[]` vs `tags?: string[]`,
`voteCount: number` vs `voteCount?: number`. `api/src/meta/` contains no generator, and
`grep -n openapi package.json api/package.json` is empty: **nothing derives the client contract
from the server contract.**

That optionality drift is visible in this component's own call site: `BrowsePane.vue:152` must
write `:current-tags="tagEditPalette.tags ?? []"` because the demo type made `tags` optional,
even though `formatPalette` always emits it.

**Cure.** One home for the wire shape and its derived validators. Either generate the demo's
`Palette` + `paletteETag` from the API module (the OpenAPI registry `api/src/meta/route-table.ts`
already exists as the mounted-route source of truth), or extract a tiny shared contract module
consumed by both sides. Unique semantic ownership is the invariant; today the concept has two
homes and they are already out of sync in prose.

---

### L-6 · MAJOR — a leaf UI component owns optimistic-concurrency policy, applies a silent `undefined → "*"` downgrade, and throws away the fresh validator the server hands back.

`TagEditPopover.vue:64-78` — the whole of `onToggle`:

```ts
const source = pm.remotePalettes.value.find((p) => p.slug === paletteSlug);
const ifMatch = source ? paletteETag(source) : undefined;

emit("update:tags", updated);
await tagEdit.saveTags(paletteSlug, updated, ifMatch);
```

Four distinct ownership defects in five lines:

1. **Wrong home for If-Match.** `useBrowsePalettes.ts:164,192` already derives the validator
   internally for its own mutations, because it owns the list. Here a *presentational popover*
   derives it. Two homes for one policy — and the second one is the leaf.
2. **Silent downgrade (edict 2, masking fallback).** `undefined` is passed to
   `saveTags(slug, tags, ifMatch = "*")` (`useTagEdit.ts:51-55`), so a miss in the list becomes
   RFC 7232 **match-any**. `api/src/modules/palette/etag.ts:44` — `if (ifMatch.trim() === "*") return;`
   — the concurrency check is skipped entirely. The comment at `TagEditPopover.vue:69-72` calls
   this "falls back to the `"*"` match-any"; it is a fallback that disables the very guarantee the
   surrounding comment claims to establish, with no signal at any layer.
3. **The response is discarded.** `saveTags` returns `Promise<Palette | undefined>` — the freshly
   PATCHed palette, carrying the new `updatedAt` (and the `ETag` response header set at
   `api/src/modules/palette/routes/crud.ts:139-142`). `await tagEdit.saveTags(...)` drops it on
   the floor. Nothing in the system ever refreshes the validator.
4. **The stale validator is actively re-cached.** `BrowsePane.vue:312-320` (`onTagsUpdated`)
   writes `{ ...target, tags }` back into `remotePalettes` — carrying the **old** `updatedAt`
   forward verbatim.

**Mechanism of the resulting lost update.** `patchPalette` (`api/src/modules/palette/service/crud.ts:178-193`)
always sets `updatedAt: new Date()`, but only bumps `currentHash` when
`computeContentHash(name, colors)` changes — which a tags-only patch never does. So for any
palette whose `currentHash` is null (`etag.ts:5-7` names these explicitly: *"the `updatedAt`
timestamp (when currentHash is null, e.g. pre-version palette)"*), the ETag **is** `updatedAt` and
**flips on every tags patch**. The second toggle in the same popover session therefore sends a
stale validator → `assertIfMatch` throws `PreconditionFailedError` (412) → `useTagEdit.ts:64-67`
swallows it (`catch { console.warn }`) → `emit("update:tags")` already fired at line 76, so the UI
shows the new tags. **Silent lost update.**

*Reproduction status:* the mechanism is CONFIRMED from source on all four legs. The end-to-end
repro is a **HYPOTHESIS** — it requires a row with `currentHash === null`, and
`createPalette` (`service/crud.ts:101-102`) always sets one, so on freshly-seeded data the arm is
unreachable and only legacy rows expose it. I did not have a live commons to seed against (the
API was unreachable, §0). It is labelled a hypothesis and must not be reported as observed.
Defects 1–4 above are each confirmed by file:line regardless.

**Cure.** The component should own **none** of this. `useTagEdit.saveTags` becomes
`assignTags(palette: Palette, tags: string[]): Promise<Palette>` — it derives the validator from
the palette it is given (no `undefined`, no `"*"`, no default parameter), **consumes the returned
palette**, and republishes it into the browse list so the next validator is fresh. Remove the
`catch`-and-warn: a failed save must surface, and the optimistic emit must roll back. The popover
then emits one intent (`toggle(tagName)`) and knows nothing about HTTP.

---

### L-7 · MAJOR — `getTags()` is a type-lie, and the compensating coercion lives in one of its two consumers.

`demo/palettes/api/colors.ts:14` declares `getTags(): Promise<Tag[]>`.
`BrowsePane.vue:210-220` says otherwise, in the same file that renders this component:

```ts
// X9: coerce to an Array. `allTags` is typed `Tag[]` but the `/colors/tags`
// read can resolve an object-shaped payload; a non-array reaching the
// `availableTags: Tag[]` prop fires Vue's "Expected Array, got Object" prop
// warning (the repeated tags-warn). This computed guarantees an array.
const availableTags = computed<Tag[]>(() => {
    const tags = pm.tagEdit.allTags.value as Tag[] | Record<string, Tag>;
    return Array.isArray(tags) ? tags : Object.values(tags);
});
```

`TagEditPopover.vue:16,23` reads the **same** `allTags` **raw**:

```vue
<div v-else-if="tagEdit.allTags.value.length === 0" …>No tags available.</div>
<label v-for="tag in tagEdit.allTags.value" :key="tag.name" …>
```

On an object payload `{}`, `.length` is `undefined`, `undefined === 0` is false → the "No tags
available." branch is **dead**, and the component renders an empty box with no explanation.

This is the diagnostic pattern for misplaced ownership: **the workaround exists at one of two
consumers.** A guard that must be applied by every reader belongs to the producer. The producer
here is `useTagEdit.loadAllTags` (`useTagEdit.ts:36-49`), which is the single shared owner of the
catalog — it is the one place the normalisation can be written once and be true for everyone.
(Whichever way the ambiguity resolves, there is a finding: either the child is missing a needed
guard, or the parent carries a contrivance that must be deleted (edict 3). The asymmetry is the
defect.)

Related, same family: the load lifecycle is also doubly owned. `BrowsePane.vue:222-224` calls
`pm.tagEdit.loadAllTags()` on mount; `TagEditPopover.vue:80-86` calls it again on both `watch(open)`
and `onMounted`. Three call sites, one idempotent concern, two mechanisms in one component where
`watch(..., { immediate: true })` is one.

---

### L-8 · MINOR — the loading affordance is a second loading vocabulary, and it is the one the project already retired.

`TagEditPopover.vue:11-13`:

```vue
<div v-if="tagEdit.loading.value" class="flex items-center justify-center py-4">
    <Loader2 class="h-4 w-4 animate-spin text-muted-foreground" />
</div>
```

`demo/styles/utils.css:36-40` states the standing rule:

> *"The ONE loading-ink recipe (S.W5 Lane A / W5-1 …): **every** skeleton surface in the app reads
> this single muted-ink family through glass-ui's `--skeleton-glass-bg` seam"*

and `demo/palettes/browser/admin/AdminListSkeleton.vue:1-6` records the direction of travel
explicitly:

> *"the SAME muted-ink loading register as PaletteCardSkeleton (one recipe, both schemes) …
> **Replaces the generic centered `Loader2` spinner in every admin panel.**"*

A `justify-center py-4` block containing a centered `Loader2` is precisely the idiom that
migration retired. Eight demo files still carry `Loader2` (`grep -rn 'Loader2\|animate-spin' demo/`),
but the other seven are **inline button-state** spinners (`w-3 h-3`, next to a label, gated on
`pruning`/`submitting`/`slugSwitching`) — a legitimately different affordance. Only
`TagEditPopover.vue:11` and `VersionHistoryDrawer.vue:18` use the retired **centred panel-fill**
form. This one also imports `@lucide/vue` directly (line 45) for a design-system-owned concern,
where glass-ui already ships `Skeleton` and owns the ink token (edict 4).

**Cure.** Two or three `Skeleton` rows in the `skeleton-ink-register`, matching the checklist row
grammar exactly as `AdminListSkeleton` does for admin rows. Drops the `@lucide/vue` import and the
second vocabulary in one edit. (Edict 6 is satisfied: nothing is deleted — `animate-spin` is
glass-ui's `--animate-spin`/`spin` keyframe, `components.css:1`, and remains available to the
seven inline consumers.)

---

### L-9 · MINOR — the component has zero test coverage and zero visual coverage; the visual matrix cannot certify it.

- `grep -rn 'TagEditPopover' e2e/ test/` → **no matches.** `e2e/` contains only `smoke/`.
- `grep -rn 'onEditTags\|editTags' demo/` → the trigger path exists
  (`PaletteCardMenu.vue:86` → `PaletteCard.vue:216,307` → `BrowsePane.vue:116` → `:307`), so the
  component is reachable in principle — but nothing exercises it.
- Every one of the 60 Safari captures shows *"The commons is unreachable"* on `/#/browse`
  (`REPORT.md:121,136,151,166` — all report `pageErr 0 / consoleErr 0`, i.e. the matrix records a
  clean page while the entire browse feature was un-exercised). `v-if="tagEditPalette"` means this
  component never mounted in any capture.

That is how two blockers stayed invisible: the type gate cannot see prop/emit drift (L-1), unit
tests do not exist, and the visual matrix was blind to the whole route. The three probes in §0 are
~40 lines total and catch both blockers — that is the coverage shape this component needs.

---

### L-10 · INFO — `../../api` is a 7-module barrel that drags every admin endpoint (and a side-effecting transport module) into a leaf's graph for one 2-line pure function.

`demo/palettes/api/index.ts` re-exports 7 sibling modules. As served by the live dev server:

```
admin-audit.ts  admin-colors.ts  admin-palettes.ts  admin-users.ts  colors.ts  palettes.ts  versions.ts
```

So `import { paletteETag } from "../../api"` gives a tag-checkbox list transitive module-graph
access to `deleteUser`, `impersonateUser`, `pruneEmptyUsers`, `deletePaletteAdmin`. It also pulls
`platform/transport/client` → `availability.ts`, which runs an **import-time side effect**. That
side effect is observable in my probe's stderr — it fired inside a unit test that never made a
network call:

```
[value.js] value.js dev is MISCONFIGURED: http://localhost:3000 has no VITE_API_URL …
```

(`demo/platform/transport/availability.ts:123`.) A pure string-formatting helper should not be
reachable only through a door that boots the transport layer.

**Cure.** `paletteETag` is not an API call — it is a derivation over the wire type. It belongs
beside the type (L-5's shared contract home), imported directly, with no barrel between. Deep,
specific imports for leaves; barrels only where a genuine capsule boundary exists.

---

### L-11 · INFO — two in-memory tag catalogs.

`useTagEdit.ts` (public `getTags`, `allTags`) and `useAdminTags.ts:32` (`getAdminTags`, `tags`)
each own a `Tag[]` + `loading` pair. Different endpoints and different auth, so this is defensible
as-is — recorded so the §4 lattice does not accidentally merge them, and so a future seat does not
re-raise it as a duplicate. If the admin listing is a superset of the public one, they should share
a normaliser even if not the state.

---

## 3. Edict compliance table

| # | Edict | Verdict | Anchor |
|---|---|---|---|
| 1 | No god modules | **VIOLATED** | 32-member `browsePort`, 2 used (L-3) |
| 2 | No legacy / aliases / dual paths / masking fallbacks | **VIOLATED ×4** | dead radix API (L-1); `demo/ui/` alias layer (L-4); `undefined→"*"` (L-6); two-mode popover API with the live mode broken (L-2) |
| 3 | KISS, no contrivance | **VIOLATED** | list-scan to re-find the parent's own object (L-3); `availableTags` coercion at one of two consumers (L-7) |
| 4 | glass-ui is the design system | **VIOLATED** | root-barrel shim instead of `./popover` (L-4); direct `@lucide/vue` for a loading affordance glass-ui owns (L-8); the checkbox-list pattern is a design-system primitive living in demo (L-1 cure) |
| 5 | Root-level styling | **CLEAN (noted)** | `class="w-52 p-0"` (line 6) is per-instance sizing, but all 8 `PopoverContent` sites size individually — this is a legitimate layout prop, not a token override |
| 6 | Animations never deleted | **CLEAN** | no keyframe touched; `animate-spin` is glass-ui's (`components.css:1`) |
| 7 | Idiomatic Vue 3.5 | **CLEAN** | reactive props destructure + `watch(() => open)` correct |
| 8 | `verbatimModuleSyntax` | **CLEAN** | all six imports are value imports |

---

## 4. The greenfield lattice — what I would build today, concretely

The tag feature is currently smeared across **8 files in 4 directories** with no owner:
`useTagEdit.ts` (catalog + save), `api/colors.ts` (fetch), `api/palettes.ts` (`paletteETag`),
`usePalettePorts.ts` (wiring), `BrowsePane.vue` (coercion + open/close + list write-back),
`TagEditPopover.vue` (checklist + etag + save), `SearchFilterBar.vue` (a second copy of the
checklist), `PaletteCardMenu.vue` (the trigger).

Greenfield, one domain, one home each:

```
demo/palettes/tags/
├── api.ts               getTags(): Promise<Tag[]>  — TOTAL: normalises the payload here, once.
│                        No consumer ever coerces again. (kills L-7)
├── useTagCatalog.ts     THE shared catalog. ref<Tag[]> + loading + one idempotent load.
│                        Provided once at the palettes root; no `loaded` flag leakage. (kills L-7 tail)
├── useTagAssignment.ts  assign(palette, tags): Promise<Palette>.
│                        Owns the ENTIRE If-Match lifecycle: derives the validator from the
│                        palette it is HANDED (never from a global list, never `undefined`,
│                        no `"*"` default), CONSUMES the PATCH response, and republishes the
│                        fresh palette into the browse list so the next validator is current.
│                        Throws on failure — no catch-and-warn. (kills L-5, L-6)
├── TagChecklist.vue     PURE presentational. props: { catalog: Tag[]; modelValue: string[] }
│                        emits: update:modelValue. Zero inject, zero api, zero etag, zero HTTP.
│                        THE ONLY <Checkbox> in the repo → the glass-ui API can only be wrong
│                        in one place, and that place has a mount test. (kills L-1)
└── index.ts             named exports only
```

Consumption after the transposition:

- **`SearchFilterBar`** renders `<TagChecklist :catalog v-model="selectedTags" />` — filter mode.
- **`PaletteCardMenu`** renders `<TagChecklist :catalog v-model="palette.tags" />` inside a
  `DropdownMenuSub` (glass-ui exports the three sub primitives). `TagEditPopover.vue` is
  **deleted**, and with it the trigger slot, the anchor bug, the focus-return bug, and BrowsePane's
  `tagEditOpen`/`tagEditPalette`/`onEditTags`/`onTagsUpdated` quartet. (kills L-2, L-3)
- **`usePalettePorts`** stops carrying `tagEdit`; the tag domain provides its own narrow key.
  `browsePort` drops from 32 to 31 and the precedent is set for the rest. (attacks L-3 at the root)
- **`demo/ui/` is deleted.** Consumers import `@mkbabb/glass-ui/popover`, `/dropdown-menu`,
  `/checkbox`. Missing subpaths (`./checkbox`, `./avatar`, `./radio-group`, `./skeleton`) are
  relayed to glass-ui as a real gap. (kills L-4; measured 16.1× byte reduction on the popover edge)
- **`paletteETag` + `Palette`** move to one contract home derived from the API, not hand-mirrored.
  (kills L-5, L-10)

Net: **8 scattered files → 5 owned ones**, two hand-copied checkbox loops → one component, two
ETag implementations → one, two loading vocabularies → one, 32-member injection → a prop.

**Gate to make the cure stick.** `vue-tsc` proved blind (§L-1, exit 0). The structural guarantee is
not a stricter tsconfig — it is that `<Checkbox>` appears exactly once in the tree, under a mount
test that asserts `aria-checked` tracks the model. Encapsulation, verified by a test, not by grep.

---

## 5. Strongest defect

**L-1.** The component's central control is bound to a component API that has not existed since
2026-02-24 — proven by executed runtime probe (`aria-checked: false` for a tag that IS present;
`saveTags` calls after click: **0**; `emitted update:tags`: **null**). It was authored a month
after that API was deleted, has been dead for 124 days, survived three refactors and the repo's
strictest gate (`vue-tsc -p tsconfig.demo.json --noEmit` → exit 0), and is replicated at 2 of the
2 `<Checkbox>` sites in the demo. It is a library-structure defect end to end: a consumer written
against a remembered surface, reached through an alias layer that adds nothing, guarded by a gate
that cannot see it, in a component no test and no screenshot ever exercised.
