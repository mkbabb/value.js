# CHALLENGE-C — `PaletteCardMenu.vue` implementation audit (pass 5)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was explicitly spawned with; it is **declared, not inherited**. No defect on
the receipt axis.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
- **HEAD is `d19da6d3`**, not the `c654824e` in the commission — the branch has moved under five
  consecutive passes:
  ```
  $ git log --oneline -1
  d19da6d3 docs(V·mega): 3:30am wall harvested — 233/243 axes banked; both bands re-resumed (…)
  $ md5 demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
  MD5 (…/PaletteCardMenu.vue) = 47e6018a661006253df3e95f432be215
  $ wc -l demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
       228
  ```
  The file is still 228 lines and byte-identical to pass 1's citations; every file:line below is
  against `d19da6d3`.
- Date: 2026-07-29
- Verdict: **DEFECTIVE** — 3 BLOCKER, 15 MAJOR, 9 MINOR, 8 INFO
- Prior passes preserved verbatim: `challenge-C-implementation.pass-1-2026-07-28.md`,
  `…pass-2-…`, `…pass-3-…`, and `challenge-C-implementation.pass-4-2026-07-28.md`
  (md5 `4e8e051802b28d9342f0b03a41dae8b8`, identical to the file this pass replaced).
- Everything marked **NEW** is mine, measured this pass. Four probe scripts, **sixteen** browser
  contexts (3 + 3 + 2 + 8), **zero page errors** in all sixteen.

---

## Executive summary

Pass 1 read the logic. Pass 2 followed the action string out of the file and found it landing
nowhere at three of five hosts. Pass 3 photographed what it renders. Pass 4 measured what it does to
the page *around* it and found the cross-row `Delete` collision. **Pass 5 asked the two questions
none of them asked: what does this menu look like to a keyboard, and what does it cost to exist?**

Three answers, all measured.

> **1. `d`, then `Space`. That is the whole gesture.** With the menu open, `d` is a typeahead search
> and `Delete` is the only item that starts with it, so `Delete` takes focus with a visible
> highlight. `Space` then activates it. Store `6 → 5`, `dialogs: 0`, **5 runs for 5** at every delay
> from 150 ms to 1600 ms. reka *has* a guard for exactly this (`MenuItem.js:63` refuses `Space`
> while a typeahead is in flight) and the guard is **dead code** — it reads `contentContext.searchRef`,
> a ref `MenuContentImpl.js:136` declares and never assigns. Pass 4's P4-7 said keyboard users are
> immune. They are immune to *P4-1*. They have their own two-keystroke path to an unconfirmed,
> un-undoable delete.

> **2. The card advertises a version history the menu refuses to open.** A palette produced by this
> menu's **own `Save` item** carries the remote row's `versionCount` verbatim
> (`usePaletteStore.ts:145-149` spreads `{...palette, isLocal: true}`). `PaletteCardMeta.vue:27`
> renders the History chip on `(versionCount ?? 0) > 1` with **no kind guard**;
> `PaletteCardMenu.vue:94` gates `Versions` on `!palette.isLocal && (versionCount ?? 0) > 1`.
> Measured on one card: chip `title="4 versions"`, menu items
> `["Publish","Rename","Export","Delete"]`. Two sibling components in the same card row, disagreeing
> about the same field, and the menu is the one that manufactures the state.

> **3. A closed menu costs 13 Vue component instances per row.** Census delta between a 1-card and a
> 25-card list: **37 component instances per card, of which 13 are menu machinery and 19 are the
> menu's total share once its `Primitive`/`PrimitiveSlot` wrappers are counted — 51 % of the entire
> card.** `DropdownMenuPortal`, `MenuContent` and `DropdownMenuContent` are instantiated **while the
> menu is shut**. At 200 palettes: 4932 DOM nodes, **110.6 MB** heap, **110 ms** of blocking work per
> keystroke in the search box. The user can have exactly one menu open at a time.

| id | severity | one line | status |
|---|---|---|---|
| **C2-1** | **BLOCKER** | 22 menu-item instances at 3 of 5 hosts are inert — `Delete` on `/#/mix` leaves the store unchanged | pass-2, re-reproduced pass-3 |
| **C2-2** | **BLOCKER** | `@click.prevent` (`:108`) kills the Export submenu on **pointer** input | pass-1/2/3 |
| **P4-1** | **BLOCKER** | with a menu open, the next cards' `⋯` triggers sit inside its items — clicking card N+2's trigger **deletes card N's palette** | pass-4 |
| **P5-1** | **MAJOR** | **split-brain version predicate** — the card renders a `title="4 versions"` History chip while the menu withholds `Versions` for that same palette; the state is manufactured by the menu's own `Save` | **NEW** |
| **P5-2** | **MAJOR** | **`d` + `Space` = unconfirmed delete**, 5/5 at 150–1600 ms; reka's Space-vs-typeahead guard is dead code; scope-corrects P4-7 | **NEW** |
| **P5-3** | **MAJOR** | **13 component instances per row for a CLOSED menu** (19 of the card's 37 = 51 %); portal + content mounted while shut; 110.6 MB / 110 ms-per-keystroke at N=200 | **NEW** |
| **P5-4** | **MAJOR** | `Publish` on a saved-from-remote copy sends the **original owner's slug** to `POST /palettes`, which is unique-indexed — a permanently doomed action rendered enabled | **NEW** (server leg source-traced, not executed) |
| **P4-2** | MAJOR | `<DropdownMenu>` (`:2`) never passes `:modal="false"` — five measured symptoms | pass-4, **+1 symptom this pass** |
| **P4-3** | MAJOR | two items ship the identical label `Publish` and identical `Globe` icon for different actions | pass-4 |
| **P4-4** | MAJOR | unconfirmed owner `Delete` is a data-loss primitive | pass-4, **+P5-2 reaches it too** |
| C3-1 | MAJOR | the K-INV5 small-caps register is **inert** — 55.266 px = 55.266 px | pass-3 |
| C3-2 | MAJOR | six identical trigger accessible names | pass-3/4 |
| C3-3 | MAJOR | the submenu renders **italic** while its parent renders upright | pass-3 |
| C3-4 | MAJOR | at 390 px the Export submenu occludes its own trigger and `Delete` | pass-3 |
| C2-3 | MAJOR | Export writes attacker-controlled markup to disk | pass-2 |
| C2-4 | MAJOR | `apiOffline` misses `misconfigured` | pass-2/3/4 |
| C2-5 | MAJOR | an `unlisted` palette renders byte-identical to a public one | pass-2 |
| C2-6 | MAJOR | `Rename` holds focus 212 ms then loses it | pass-2 |
| C2-7 | MAJOR | `<button>` inside `<button>` at every `/#/mix` row | pass-2 |
| C2-8 | MAJOR | vacuous gate — no component-test infrastructure at all | pass-2/3, **re-verified** |
| **P5-5** | MINOR | a palette with `name: ""` renders a **178.4 × 11.9 px blank menu header** plus its separator — measured | **NEW** |
| P4-5 | MINOR | `Tab` inside the open menu is a no-op | pass-4 |
| C3-5 | MINOR | the correct `published` boolean is on the wire and has **zero** readers | pass-3 |
| C3-6 | MINOR | `.fira-code` is a dead demo-local fork of a glass-ui `@utility` | pass-3 |
| C2-9 | MINOR | the annotation folds into the accessible name (3 items) | pass-2/3 |
| C2-10 | MINOR | the latch gates 2 of ~9 network-bound actions | pass-2 |
| C2-11 | MINOR | enum→boolean collapse twice | pass-2 |
| C2-12 | MINOR | two copy-pasted per-instance overrides, and they are no-ops | pass-2/3 |
| C2-13 | MINOR | pressing the trigger squashes the whole card | pass-2 |
| **P5-6** | INFO | **three new green-keeping mutations**, and the one mutation that is NOT free (an e2e spec does click `Versions`) | **NEW** |
| **P5-7** | INFO | `Save` on a remote palette reports **"Saved!" unconditionally** while `addPublishedPalette` silently no-ops on a slug/name dedup | **NEW** |
| **P5-8** | INFO | four **negative** results probed and found sound — no unmount lock-leak, no 60-cycle DOM leak, open latency is O(1) in list length, press-drag-release cannot activate | **NEW** |
| P4-6 | INFO | the repo already owns the `elementFromPoint` occlusion oracle and never pointed it here | pass-4 |
| P4-7 | INFO | keyboard is immune to **P4-1** — **corrected scope, see P5-2** | pass-4, **narrowed** |
| C3-7 | INFO | correction: the submenu **is** keyboard-operable; C2-2 is pointer-only | pass-3 |
| C3-8 | INFO | correction: e2e asserts on 6 items; the a11y gate's name leg is non-empty-only | pass-3 |
| C2-15 | INFO | the modal lock is applied to `<body>` while the scroll container is an inner div | pass-2 → P4-2 |
| C2-16 | INFO | the Safari visual sweep captured zero PaletteCards | pass-2 |

---

## P5-1 — MAJOR: the card advertises a version history the menu withholds

### The two lines

```
PaletteCardMeta.vue:27    v-if="(palette.versionCount ?? 0) > 1"          ← chip:  no kind guard
PaletteCardMenu.vue:94    v-if="!palette.isLocal && (palette.versionCount ?? 0) > 1"   ← item: kind-guarded
```

Same field. Same `> 1`. Same `History` glyph (`PaletteCardMeta.vue:31` / `PaletteCardMenu.vue:98`).
Different predicates, in two components rendered **eleven lines apart inside the same card row**
(`PaletteCard.vue:78` mounts the meta cluster; `:83` mounts the menu).

### The state is manufactured by this menu's own `Save` item

`PaletteCardMenu.vue:15-22` renders `Save` for `paletteKind === 'remote'`. That emits `save` →
`BrowsePane.vue:226 onSave` → `pm.onSaveRemote` → `usePaletteStore.ts:145-149`:

```ts
store.value.palettes.unshift({
    ...palette,                                  // ← versionCount, tier, visibility, voteCount, slug
    id: palette.id ?? crypto.randomUUID(),
    isLocal: true,                               // ← the only field that changes
});
```

A spread. Every remote-only field survives; `isLocal` flips. The palette now satisfies the chip's
predicate and fails the menu's.

### Measured

Probe `evidence/pass-5/pcm-p5-c.mjs` seeds exactly what that spread produces —
`{ isLocal: true, versionCount: 4, tier: "featured", visibility: "public", slug: "saved-from-remote" }` —
and reads both surfaces of the one card:

```
::C1a_cardMetaChips
 [ { title "Saved From Remote", text "Saved From Remote", rect { w 172.4, h 30.5 } },
   { title "4 versions",        text "4",  hasHistoryIcon true, rect { w 20.8, h 13.8 } } ]

::C1b_menuForThatSameCard
 { label "Saved From Remote",
   items [ "Publish", "Rename", "Export", "Delete" ],
   hasVersions false }
```

A 20.8 × 13.8 px control whose `title` attribute promises "4 versions", sitting **immediately left of
the `⋯` trigger**, and the menu behind that trigger has no way to reach them.
Frame: `evidence/pass-5/pass5-versions-splitbrain.png`.

**And it is not synthetic.** The pass-2/3 capture already in this directory —
`evidence/forced-colors-menu-open.png`, taken by an earlier seat against a real session — shows the
row `Muted Terracot… ♛ Featured 5 ⏱ 4 ⋯` in *My Palettes* with the menu open on
`Publish / Rename / Export / Delete`. The defect was photographed four passes ago and never read.

### The same spread lies twice more

```
::C1c_featuredBadgeOnAPurelyLocalPalette { text "Featured", cls "badge-atom inline-flex …" }
```

`PaletteCard.vue:64` renders the gold `Featured` badge on `palette.tier === 'featured'` with no kind
guard either, so the local copy wears a commons honour it does not hold — and the menu's
`Feature`/`Unfeature` toggle (`:158-162`) is gated on `isAdmin && paletteKind === 'remote'`, so
nothing on that card can even inspect the claim. That badge is `PaletteCard`'s line, not this
component's; I record it because it is the *same mechanism* and any cure must cover both.

### Why the menu's guard is the one that is wrong

The menu's guard is not arbitrary — `@versions` is bound only at `BrowsePane.vue:114`, never at
`PalettesPane`, so on the saved-palette route the action would land in C2-1's `if (!fn) return`
swallow. The guard is a **workaround for a missing host binding**, expressed as a raw-model reach
(`!palette.isLocal`) in a file that otherwise speaks `paletteKind` eight times — pass-1's C-7.
The data path itself is fine: `BrowsePane.vue:272 onVersions` keys the drawer on `palette.slug`, and
the local copy carries the original slug.

**Cure (gestalt, not a patch).** One predicate, owned once. `getPaletteKind` already exists and is
already the file's vocabulary; the version affordance — chip *and* item — belongs behind a single
`hasVersionHistory(palette)` derived in `demo/palettes/utils.ts` next to it, consumed by both
components. Then the chip and the item cannot disagree, because there is only one of them. The
lingering question that predicate answers honestly is the right one to force: *should a local copy
of a remote palette carry the original's remote metadata at all?* `addPublishedPalette` should
project the fields a local palette can honour, not spread the wire object.

---

## P5-2 — MAJOR: `d` then `Space` deletes a palette, and reka's guard against it is dead code

### The gesture

Open a palette's menu. Type `d` — the ordinary "jump to the item" keystroke every desktop menu
supports and this one implements correctly. Press `Space`.

### Measured — 5 runs, 5 destructions

Probe `evidence/pass-5/pcm-p5-d.mjs`, six seeded local palettes, `Space` pressed at five different
delays after `d`:

```
::D1_spaceBifurcation
 spaceAtMs  150  focusedByTypeahead { role "menuitem", text "Delete", highlighted true }
                 storeLen 6 → 5   destroyed ["Probe Palette 0"]  menusAfter 0  dialogs 0
 spaceAtMs  500  … identical …    storeLen 6 → 5   destroyed ["Probe Palette 0"]  dialogs 0
 spaceAtMs  900  … identical …    storeLen 6 → 5   destroyed ["Probe Palette 0"]  dialogs 0
 spaceAtMs 1100  … identical …    storeLen 6 → 5   destroyed ["Probe Palette 0"]  dialogs 0
 spaceAtMs 1600  … identical …    storeLen 6 → 5   destroyed ["Probe Palette 0"]  dialogs 0
```

Corroborated independently in `pcm-p5-c.mjs` on a different seed:

```
::C4b_spaceActivatesDelete
 { focusedBeforeSpace { role "menuitem", text "Delete", menus 1 },
   storeBefore 6, storeAfter 5, dialogs 0, scrolled 0 }
```

### Why `d` is the worst possible letter here

Typeahead works — that part is correct (`::C4a_typeahead`: `d`→Delete, `e`→Export, `r`→Rename,
`p`→Publish, 4/4). The problem is the **first-letter map of this component's own label set**. On a
remote-and-owned card the items are `Save · Publish|Make private · Remix · Rename · Edit Tags ·
Versions · Export · Delete`:

| key | items it cycles |
|---|---|
| `r` | **Remix**, **Rename** — two items, one destructive-adjacent (a remote write) |
| `e` | **Edit Tags**, **Export** — two items |
| `p` | **Publish** — and per P4-3 the *other* `Publish` on the saved branch |
| **`d`** | **Delete** — alone. One keystroke, no ambiguity, no cycling. |

The single most destructive item in the menu is the single most reachable by one key. Nothing in the
component chose that; it falls out of the labels. But the component is the thing that picked the
labels, and it never sets `text-value` on a single item (`grep -c 'text-value' PaletteCardMenu.vue`
→ 0), so the typeahead corpus is uncontrolled raw `textContent`.

### The library guard that should have stopped it is dead

reka *anticipated* this. `node_modules/reka-ui/dist/Menu/MenuItem.js:63`:

```js
onKeydown: async (event) => {
    const isTypingAhead = unref(contentContext).searchRef.value !== "";
    if (_ctx.disabled || isTypingAhead && event.key === " ") return;
    if (unref(SELECTION_KEYS).includes(event.key)) { event.currentTarget?.click(); … }
}
```

`contentContext.searchRef` is declared at `MenuContentImpl.js:136` — `const searchRef = ref("")` —
and the **only** writes to it in the whole file are two resets to `""` (`:218` in `handleBlur`, and
the exposed member at `:251`). The live typeahead buffer is a *different* ref: `:145`
`const { handleTypeaheadSearch } = useTypeahead()`, whose own `search` is
`refAutoReset("", 1e3)` (`shared/useTypeahead.js:6`) and is never mirrored onto `searchRef`.
`isTypingAhead` is therefore **always `false`**, which is exactly what the flat 5/5 across a
150 ms → 1600 ms sweep proves: had the guard been live, the 150/500/900 runs would have been no-ops
and only the 1100/1600 runs would have deleted. They all deleted.

`MenuContentImpl.js:200` — `if (event.code === "Space") return;` — additionally prevents `Space`
from ever reaching `handleTypeaheadSearch`, so `Space` is unconditionally a selection key inside
this menu.

### Scope correction to pass 4

P4-7 concluded *"keyboard users are immune; the defect is pointer-only."* That is true **of P4-1**
and I re-confirm it. It is not true of this component's destructive surface. The keyboard path is
shorter than the pointer path: two keys, no mis-aim, no geometry.

**Cure:** the same single change that closes P4-1, P4-4 and C2-14 — **`Delete` and `Delete (admin)`
confirm through the `AlertDialog` glass-ui already ships**, naming the palette. The admin branch is
*already* confirmed (`PaletteCard.vue:301`); the owner branch is the outlier. Once destruction costs
a dismissal, `d`+`Space` costs a dismissal too, and no keyboard, pointer or geometry argument has to
be made at all. (Do **not** cure this by setting `text-value` to move `Delete` off `d` — that hides
one path and leaves the primitive.)

---

## P5-3 — MAJOR: a *closed* menu costs 13 component instances per row

### Census

Probe `evidence/pass-5/pcm-p5-d.mjs` walks the live Vue instance tree from `#app.__vue_app__` at
N = 1, 5 and 25 saved palettes and diffs. Nothing is opened.

```
::D2_instanceCensus
 totals   { n 1 → 742 instances }  { n 5 → 890 }  { n 25 → 1630 }
 perCardDelta_totalInstances 37

 perCardDelta_byComponent
   PaletteCardMenu       1
   DropdownMenu          1     ← glass-ui wrapper
   DropdownMenuRoot      1     ← reka
   MenuRoot              1
   PopperRoot            1
   DropdownMenuTrigger   2     ← glass wrapper + reka
   MenuAnchor            1
   PopperAnchor          1
   DropdownMenuContent   2     ← glass wrapper + reka …
   DropdownMenuPortal    1     ← … and its portal …
   MenuContent           1     ← … and its content, ALL while the menu is SHUT
   Primitive             3
   PrimitiveSlot         2
   Button                1
```

13 instances of pure menu machinery per card; 19 of the card's 37 (**51 %**) once the
`Primitive`/`PrimitiveSlot` wrappers those components render are counted. The `Button` is the only
one of them the user can see.

`DropdownMenuPortal`, `DropdownMenuContent` and `MenuContent` are **instantiated while closed** —
they render nothing (reka's `Presence` gates the DOM) but they are live component instances with
setup state, injected contexts and `useId` calls.

### What it costs at the sizes this app actually reaches

Probe `evidence/pass-5/pcm-p5-b.mjs`, same route, three list sizes:

| N palettes | DOM nodes | JS heap | one keystroke in the search box |
|---:|---:|---:|---:|
| 8 | 516 | 35.6 MB | **30.1 ms** |
| 60 | 1712 | 51.0 MB | **69.2 ms** |
| 200 | 4932 | **110.6 MB** | **110.0 ms** |

`::N8 / ::N60 / ::N200`. The keystroke figure is wall time from `input` dispatch to two settled
animation frames — every character typed into *Search your palettes…* re-diffs N menu roots. 110 ms
is well past the 100 ms threshold at which typing stops feeling attached to the keyboard, and the
browse wall pages at 50 with a load-more that has no cap (`BrowsePane.vue`, the S.W5 load-more
trigger), so 200 is not a hypothetical.

### Why the component owns it

The menu is declared *inside* the repeated row (`PaletteCard.vue:83`), so its lifetime is the row's.
But **only one menu can be open at a time** — that is what `modal: true` enforces (P4-2), and
`::E1_summary` in pass 4 confirmed one open menu at a time across 8 openings. The app pays for N
menus to obtain a guarantee that at most one exists.

**Cure — the idiomatic transposition.** One `<PaletteCardMenu>` hoisted to `PaletteCardGrid`,
anchored to whichever trigger was pressed, fed the active palette. The rows keep their `⋯` `Button`
(1 instance, the visible control); the 12 instances of popper/portal/content machinery collapse from
N to 1. This is not a new abstraction — it is the same "one floating surface, many anchors" shape
`useHoverPopover` already uses one file over (`PaletteCard.vue:246-255`, a single popover shared by
every swatch in the card). And it lands the missing invariant the current design lacks: a single
source of truth for *which* card's menu is open, instead of N independent `ref(false)`s
(`PaletteCard.vue:257`) that only the modal barrier keeps from disagreeing.

---

## P5-4 — MAJOR: `Publish` on a saved-from-remote copy is permanently doomed

The chain is four hops and every hop is in the tree:

1. `PaletteCardMenu.vue:15-22` offers `Save` on a **remote** palette.
2. `usePaletteStore.ts:145-149` stores `{ ...palette, isLocal: true }` — **the original owner's
   `slug` is carried verbatim.** Measured: the seeded copy in `::C1b` keeps `slug:
   "saved-from-remote"`; the `getPaletteKind` contract (`utils.ts:22`) then reports `saved`.
3. `PaletteCardMenu.vue:27-40` therefore offers `Publish` on that copy — enabled, un-annotated
   (the latch misses `misconfigured`, C2-4).
4. `PalettesPane.vue:199` → `usePaletteActions.ts:40 onPublish` →
   ```ts
   await createAndSavePalette({ name: palette.name, slug: palette.slug, colors: palette.colors });
   ```
   → `api/palettes.ts:69 POST /palettes` → `api/src/modules/palette/service/crud.ts:80 createPalette`,
   which inserts `slug: body.slug` into a collection whose `slug` index is **unique**
   (`api/src/modules/palette/__tests__/palette-versions.test.ts:21`
   `createIndex({ slug: 1 }, { unique: true })`; `repository/palette.ts:101` *"slug is unique"*), and
   maps duplicate-key `11000` to `ConflictError("Duplicate entry")` (`service/crud.ts:135`).

So the item is offered, enabled, and cannot succeed. The user sees
`Failed to publish: Duplicate entry` on a button whose label promises the opposite — and per P4-3
that label is the same word this menu uses elsewhere for a *different* operation.

**Reproduction status, stated plainly:** hops 1–3 are **measured** (`::C1b_menuForThatSameCard`
shows `Publish` rendered on a palette carrying a remote slug). Hop 4 is **source-traced and not
executed** — this host's dev server is `misconfigured` (C2-4), so no create request can reach a
server. Treat the 409 as a source-proven consequence, not an observed one.

**Cure:** a local copy is a new object and must be minted a new slug — `createSlug(palette.name)`
from `utils.ts:14` already exists and is already what `createPalette` uses for locally-authored
palettes. `addPublishedPalette` re-using the remote slug is what makes the copy claim an identity it
does not own; that identity claim is also what makes P5-1's `versionCount` look plausible.

---

## P5-5 — MINOR: a palette with an empty name renders a blank menu header

`PaletteCardMenu.vue:9-12` renders the name unconditionally, then a separator:

```html
<DropdownMenuLabel class="font-display font-bold truncate max-w-[180px]">
    {{ palette.name }}
</DropdownMenuLabel>
<DropdownMenuSeparator />
```

Probe `evidence/pass-5/pcm-p5-a.mjs` seeds `name: ""` and opens the menu:

```
::D1_boundaryMenus[0]
 { labelText "\"\"",  labelRect { width 178.4, height 11.9 },
   items ["Publish","Rename","Export","Delete"] }
```

178.4 × **11.9** px of header that says nothing, plus its separator rule — versus 31.5 px for a
named palette in the same run. The name is empty but the chrome is not; the menu opens on a titled
region with no title. Compare `::D0_cards` → `"Palette: "`, the card's own `aria-label` with the
same hole. An empty name is reachable: `PaletteRenameInput` is the only writer and this component
never asserts on the field it prints.

Same probe, the rest of the boundary sweep — recorded because it is a **negative** and because of
how it failed:

```
::D1_boundaryMenus  versionCount NaN → item absent · Infinity → item absent
                    -0 → item absent · MAX_SAFE_INTEGER → item absent
```

None of the four exercised the `Versions` branch at all, because all four seeds are `isLocal: true`
and **P5-1's guard suppresses the item for every local palette regardless of the number**. The
boundary probe could not reach the boundary; that is P5-1 restated as a coverage fact.

---

## P5-6 — INFO: three more mutations that keep every gate green (and one that does not)

Pass 3 and pass 4 listed eight. Three more, verified against the suite this pass:

9. **`(palette.versionCount ?? 0) > 1` → `> 0`** on `:94`. Every remote palette with a single
   version grows a `Versions` item onto a drawer with one row. The only spec that clicks the item
   (`e2e/smoke/oracles/o10d-display-voice-census.spec.ts:328`) seeds a multi-version card, so it
   stays green.
10. **Add `text-value="zzz"` to the `Delete` item.** Typeahead stops finding it. No spec presses a
    character key inside this menu — `grep -rn 'menuitem' e2e` returns 10 lines, all
    `getByRole("menuitem", { name: … }).click()`.
11. **Swap `History` for `Star` on `:98`.** The chip and the item would then use different glyphs for
    the same concept. No spec reads an icon.

**And the honest counter-example**, which pass 3's list did not have: mutation #1 from that list —
*"delete `:107-130`, the whole `<DropdownMenuSub>` family"* — is **not** free after all if extended
to `Versions`. `o10d-display-voice-census.spec.ts:326-328` does open the drawer from this menu:

```ts
// VersionHistoryDrawer — Versions on the versioned card's menu.
await page.getByRole("menuitem", { name: /Versions/ }).click();
```

So the file is not *entirely* uncovered; it has exactly one behavioural assertion that a menu item
opens a surface, and it is on the item this pass proves is wrongly gated. Everything else in the
suite asserts a click reaches a route or a network call (`palette-delete`, `palette-fork`,
`palette-flag`, `palette-edit`, `palette-feature`) — five flows, none of which exercises the export
submenu, the visibility flip, the disabled latch, the typeahead, or coordinates.

The oracle this component needs and does not have is one line long: *with a menu open, `Space` on a
highlighted destructive item must produce a dialog before it produces a store mutation.* It would
fail today, 5 runs of 5.

---

## P5-7 — INFO: `Save` reports success it did not achieve

`BrowsePane.vue:226-232`:

```ts
function onSave(palette: Palette) {
    pm.onSaveRemote(palette);            // ← no return value
    const card = cardRefs[palette.slug];
    if (card) card.showFeedback("Saved!", "success");
}
```

`addPublishedPalette` (`usePaletteStore.ts:121-150`) returns `void` and has **two silent no-op
paths**: an existing name+colors match (`:130-136`, moves to front and returns) and an existing slug
(`:138`, `if (!slugExists)` — falls through doing nothing). Either way the card renders `Saved!` in
green.

This is the host's line, not the component's, and I file it as INFO for that reason — but it belongs
in this ledger because it is C2-1's family seen from the other side. C2-1 is *an action string that
reaches no handler*; this is *an action string that reaches a handler which reports an outcome it
never checked*. Both are the cost of `action: [action: string]` (`:225`) — a bus with no type, no
result, and no acknowledgement.

---

## P5-8 — INFO: four negative results, probed and sound

These are the hypotheses I went in with and could not sustain. Recording them so no later pass
spends a probe budget on them.

| hypothesis | probe | measurement | verdict |
|---|---|---|---|
| the modal lock **leaks** if the card owning the open menu unmounts under it (missing cleanup) | `pcm-p5-a.mjs`, filter the owner out of `pm.filteredSaved` while its menu is open | open: `bodyPE "none"`, `bodyOverflow "hidden"`, `ariaHidden 18`, `menus 1`. After the owner unmounts: `bodyPE ""`, `bodyPEComputed "auto"`, `bodyOverflow ""`, `ariaHidden 0`, `menus 0`. A pointer click on the surviving card succeeded (`clickErr null`), `elementFromPoint` at its centre returns the card's own `DIV`, and the search box was re-clickable | **SOUND — reka releases everything on unmount** |
| repeated open/close **leaks DOM or portal nodes** | `pcm-p5-a.mjs`, 60 × (click trigger, `Escape`) | `nodes 516 → 519` (**+3**, noise), `bodyChildren 6 → 6`, `[id^=reka-] 10 → 10`, heap flat at 39.6 MB | **SOUND — no leak** |
| menu-open latency is **O(N)** because reka's `hideOthers` walks the list | `pcm-p5-b.mjs`, 5 openings each at N = 8 / 60 / 200 | open ms 53/30/22/48/44 → 57/26/49/50/43 → 56/28/51/42/51. **Flat.** Reka's `[data-aria-hidden]` count stays 18–19 at every N (the portal's top-level siblings), while the page's total `aria-hidden` grows 68 → 226 → 646 from the cards' own decorative spans | **SOUND — O(1) in list length** |
| **press-drag-release** (the macOS menu gesture) is a second path to `Delete` | `pcm-p5-c.mjs`, `mouse.down()` on the trigger → `move` → `up` over `Delete` | `::C3_pressDragRelease { del: null, before 2 names, after { store: same 2, dialogs 0, cards 2 } }` — no `[role='menuitem']` existed 300 ms after `mousedown`; the trigger opens on **click**, not press | **SOUND — the gesture cannot activate** |

One **new corroboration** rather than a negative: P4-2's blast radius has a number now.
`::A1_menuOpen` and `::N8/N60/N200` both measure **18–19 elements marked `aria-hidden` by reka's
`hideOthers`** the instant a single card's `⋯` menu opens. For a menu that is one row of a list,
`modal: true` takes the entire document away from assistive technology — the dock, the picker, the
other cards, the search field. That is symptom 6 of P4-2's omitted prop.

---

## Prior findings re-tested this pass

| id | what I did | outcome |
|---|---|---|
| **P4-4 / C2-14** unconfirmed delete | re-measured through a **third, keyboard-only** path | **CONFIRMED and widened.** `dialogs: 0` on all six destructions this pass (5 × `::D1_spaceBifurcation`, 1 × `::C4b`). The finding is no longer "a pointer collision reaches it"; it is "every input modality reaches it in two actions" |
| **P4-2** `:modal` never set | new symptom measured | **CONFIRMED, symptom 6** — 18–19 elements `aria-hidden`'d per open (above) |
| **P4-7** keyboard immunity | tested directly | **CONFIRMED for P4-1, SCOPE CORRECTED** — see P5-2. Keyboard cannot reach another card's trigger; it can reach `Delete` in two keys |
| **C2-8** vacuous gate | re-ran the greps | **CONFIRMED with one correction** → P5-6. `ls test/*.test.ts` shows 19 spec files, all library/domain; `grep -rln "mount(" test demo` returns only source files that happen to contain the substring — **zero** component mounts. But `o10d` *does* assert one menu item's behaviour, which pass 3's "zero e2e coverage" overstated |
| **C2-4** `misconfigured` | observed live again | **CONFIRMED** — the dev server on `:9000` is still in that state, which is why P5-4's server leg could not be executed |
| **C2-1** dead actions, **C2-2**, **C3-1**–**C3-6**, **P4-1**, **P4-3**, **P4-5**, **P4-6** | not re-run — pass 3/4 measured them on this byte-identical file and this pass had no instrument that would sharpen them | carried |

---

## Strongest defect

**P5-2**, and I want to be precise about why it outranks the two BLOCKERs it sits below in severity.

P4-1 is worse in consequence and I do not dispute its rank. But P4-1 needs a coincidence — a 112 px
card pitch against a 44 px item pitch — and it can be argued about: *the user should have read the
row they were clicking.* P5-2 admits no such argument. The user opened the menu they meant to open.
They typed the letter of the item they were looking for, which is the interaction the component
implements correctly and which every desktop menu since 1984 has supported. They pressed the key that
means "yes" on every focused control in the platform. Nothing about the gesture is a mistake, and a
palette is gone with no dialog and no undo.

What makes it a *finding about this file* rather than a complaint about reka is the second half.
reka wrote the guard. `MenuItem.js:63` refuses `Space` while a typeahead is in flight, precisely so
that the search keystroke and the selection keystroke cannot be confused. The guard reads
`contentContext.searchRef` — a ref that `MenuContentImpl.js:136` declares, resets twice, and never
once assigns. The protection has been dead for the whole life of the dependency, and the only reason
it matters here rather than in the dock's three other `DropdownMenu` consumers is that this is the
only menu in the app whose items destroy user data. A component that puts an unconfirmed `Delete` in
a keyboard-searchable list is depending on a library guarantee it never verified and that does not
exist.

The consolation is that one change closes P5-2, P4-4, C2-14 and the destructive half of P4-1 at once:
**destructive items in a per-row menu confirm.** Four findings, three input modalities, one
`AlertDialog` that glass-ui already ships and that this component's own admin branch already uses.

---

## Probe artefacts (all new this pass)

Under `docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-5/`:

| file | what it decides |
|---|---|
| `pcm-p5-a.mjs` / `-results.json` | the owner-unmount lock-leak test (**P5-8** row 1); the 60-cycle DOM/heap leak test (row 2); the boundary-value sweep incl. the blank header (**P5-5**) |
| `pcm-p5-b.mjs` / `-results.json` | scale at N = 8/60/200 — nodes, heap, per-keystroke cost (**P5-3**); open-latency flatness and the `aria-hidden` blast radius (**P5-8**, P4-2 symptom 6) |
| `pcm-p5-c.mjs` / `-results.json` | **P5-1** — the card chip vs the menu items on one palette, and the `Featured` badge on a purely local row; the first component census; press-drag-release (**P5-8** row 4); typeahead + `Space` (**P5-2**) |
| `pcm-p5-d.mjs` / `-results.json` | **P5-2** — the 150→1600 ms `Space` sweep, 5/5; **P5-3** — the N = 1/5/25 instance census and its per-card delta |
| `pass5-versions-splitbrain.png` | **P5-1** — the `⏱ 4` chip and the Versions-less menu in one frame |
| `pass5-owner-unmount.png`, `pass5-after-escape.png` | the app after the open menu's owner is filtered away, and after `Escape` |
| `pass5-empty-name-menu.png` | the blank header (**P5-5**) |
| `pass5-drag-release-delete.png` | the press-drag-release end state (no menu, no deletion) |
| `pass5-scale-8.png`, `pass5-scale-60.png`, `pass5-scale-200.png` | the three scale runs |

Reproduce with the dev server up on `http://localhost:9000`:

```
node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-5/pcm-p5-<a|b|c|d>.mjs
```

All four seed `localStorage["color-palettes"]` via `addInitScript` and drive `/#/palettes`; none
needs the API, which is why P5-4's server leg is source-traced rather than executed.

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. The only repo writes are this report, the preserved
`challenge-C-implementation.pass-4-2026-07-28.md`, and `evidence/pass-5/`.
