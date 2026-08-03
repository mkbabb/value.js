# CHALLENGE-C — `PaletteCardMenu.vue` implementation audit (pass 4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant. That
is the tier this seat was explicitly spawned with; it is **declared, not inherited**. No defect on
the receipt axis.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` (228 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`
- **HEAD is `e39da983`**, not the `c654824e` in the commission — the branch has now moved under four
  consecutive passes (pass 3 saw `c654824e`, the pass-3 L seat saw `9268f054`):
  ```
  $ git log --oneline -1
  e39da983 docs(V·mega): M-19 — glass execution HERALDED; O-19 consolidated manifest sent (…)
  ```
  `PaletteCardMenu.vue` is still 228 lines and byte-identical to pass 1's citations; every file:line
  below is against `e39da983`.
- Date: 2026-07-28
- Verdict: **DEFECTIVE** — 3 BLOCKER, 11 MAJOR, 8 MINOR, 6 INFO
- Prior passes preserved verbatim: `challenge-C-implementation.pass-1-2026-07-28.md`,
  `challenge-C-implementation.pass-2-2026-07-28.md`,
  `challenge-C-implementation.pass-3-2026-07-28.md` (md5 `37c74744375c53ea7221a18904c004cb`,
  identical to the file this pass replaced).
- Every finding below marked **NEW** is mine, measured this pass with fresh probes. Six probe scripts,
  six browser runs, **zero page errors** in all six.

---

## Executive summary

Pass 1 read the logic. Pass 2 followed the action string out of the file and found it landing
nowhere at three of five hosts. Pass 3 photographed what the component renders and found the
K-INV5 register never rendering. **Pass 4 went at the one thing none of them measured: what this
menu does to the page around it while it is open.**

The answer is that the menu is a loaded trap laid over its own neighbours.

> **With one palette card's menu open, the identical `⋯` triggers of the cards below it fall
> *inside* that open menu's item rows. The card two rows down has its trigger on `Delete`.
> Clicking it — the ordinary "I opened the wrong card's menu, let me click the right one" gesture —
> deletes the *first* palette. Measured 3 for 3: store `8 → 7 → 6 → 5`, each run removing the menu's
> owner, `dialogs: 0`, no undo affordance anywhere in the DOM.**

It is not an edge case. Across an 8-card list, **8 of 8 menu openings cover at least one
neighbouring trigger, and 4 of 8 put `Delete` on one.** The card *one* row down has its trigger on
`Publish`: clicking it fired a publish on the previous palette (`Failed to create session` rendered
in card 0's feedback strip — with a configured API that is a private palette made public by a click
aimed at a different card).

The geometry is exact and it is arithmetic, not luck: **card pitch 112 px, menu item pitch 44 px,
menu top 22.4 px below the trigger centre.** `112` lands 19.5 px into item 1; `224` lands 9.5 px
from the centre of the last item. The last item is `Delete`.

And the user gets no warning that their target moved: the covered `⋯` measures **7.85 : 1** contrast
against its card when the menu is closed and **1.72 : 1** at the same 36 × 36 rect with the menu
open — the glyph is gone, and what is drawn in its place is a `Delete` row the user is not looking
at because they are aiming at a button they saw a moment ago.

| id | severity | one line | status |
|---|---|---|---|
| **P4-1** | **BLOCKER** | with a menu open, the next cards' `⋯` triggers sit inside its items — clicking card N+2's trigger **deletes card N's palette** (3/3, no confirm, no undo); 8/8 openings collide, 4/8 on `Delete` | **NEW** |
| **C2-1** | **BLOCKER** | 22 menu-item instances at 3 of 5 hosts are inert — `Delete` on `/#/mix` leaves the store at 5/5 | pass-2, re-reproduced pass-3 |
| **C2-2** | **BLOCKER** | `@click.prevent` (`:108`) kills the Export submenu on **pointer** input | pass-1/2/3 |
| **P4-2** | **MAJOR** | `<DropdownMenu>` (`:2`) never passes `:modal="false"` — one omitted prop produces five measured symptoms, including the `pointer-events: none` that stops the covered triggers absorbing their own clicks, and a scroll lock that **does not lock the scroller** | **NEW** |
| **P4-3** | **MAJOR** | two menu items ship the **identical label `Publish` and the identical `Globe` icon** and emit different actions into different host emits (`publish` → create-remote vs `makePublic` → visibility flip) | **NEW** |
| **P4-4** | **MAJOR** | **C2-14 escalates**: the unconfirmed owner `Delete` is no longer only reachable by deliberate choice — P4-1 supplies a routine cross-row gesture that reaches it, so "no confirm dialog" is now a data-loss primitive | **NEW (escalation)** |
| C3-1 | MAJOR | the K-INV5 small-caps register is **inert** — 55.266 px = 55.266 px | pass-3 |
| C3-2 | MAJOR | six identical trigger accessible names; the disambiguator sits in a `generic` | pass-3, **corroborated** |
| C3-3 | MAJOR | the submenu renders **italic** while its parent renders upright | pass-3 |
| C3-4 | MAJOR | at 390 px the Export submenu occludes its own trigger and `Delete` | pass-3 |
| C2-3 | MAJOR | Export writes attacker-controlled markup to disk | pass-2 |
| C2-4 | MAJOR | `apiOffline` misses `misconfigured` | pass-2, **re-observed live this pass** |
| C2-5 | MAJOR | an `unlisted` palette renders byte-identical to a public one | pass-2 |
| C2-6 | MAJOR | `Rename` holds focus 212 ms then loses it | pass-2 |
| C2-7 | MAJOR | `<button>` inside `<button>` at every `/#/mix` row | pass-2 |
| C2-8 | MAJOR | vacuous gate — no component-test infrastructure at all | pass-2/3 |
| **P4-5** | MINOR | `Tab` inside the open menu is a **no-op** — focus stays on the menu container 4/4 presses, contrary to the APG menu contract | **NEW** |
| C3-5 | MINOR | the correct `published` boolean is on the wire, typed, and has **zero** readers | pass-3 |
| C3-6 | MINOR | `.fira-code` is a dead demo-local fork of a glass-ui `@utility` | pass-3 |
| C2-9 | MINOR | the annotation folds into the accessible name (3 items) | pass-2/3 |
| C2-10 | MINOR | the latch gates 2 of ~9 network-bound actions | pass-2 |
| C2-11 | MINOR | enum→boolean collapse twice | pass-2 |
| C2-12 | MINOR | two copy-pasted per-instance overrides, and they are no-ops | pass-2/3 |
| C2-13 | MINOR | pressing the trigger squashes the whole card | pass-2 |
| **P4-6** | INFO | the repo **already owns** the `elementFromPoint` occlusion-oracle idiom (`o12`, `t31`) and has never pointed it at the destructive menu; the exact green-keeping mutation named | **NEW** |
| **P4-7** | INFO | keyboard users are **immune** to P4-1 — focus is trapped and `Escape` restores to the trigger; the defect is pointer-only, like C2-2 | **NEW** |
| C3-7 | INFO | correction: the submenu **is** keyboard-operable; C2-2 is pointer-only | pass-3 |
| C3-8 | INFO | correction: e2e asserts on 6 items; the a11y gate's name leg is non-empty-only | pass-3 |
| C2-15 | INFO | the modal lock is applied to `<body>` while the scroll container is an inner div | pass-2, **mechanism closed** → P4-2 |
| C2-16 | INFO | the Safari visual sweep captured zero PaletteCards | pass-2 |

---

## P4-1 — BLOCKER: the open menu lays `Delete` on the next cards' menu triggers

### The gesture

Open a palette's `⋯` menu. Decide you wanted a different card. Click that card's `⋯`.

That is the whole reproduction.

### The geometry, measured

Probe `evidence/pass-4/pcm-p4-c.mjs`, `/#/palettes`, 6 seeded local palettes, 1440 × 900.
Card 0's menu open:

```
::C1_collisionMap
 menuRect   { x 1010, y 516, w 192, h 240.1, bottom 756.1 }
 menuStyle  { background "oklab(0.936403 0.00557132 0.0133027 / 0.808)",
              backdropFilter "blur(11px) saturate(1.6)", zIndex "130" }
 cardPitch  112          ← the palette list's row pitch
 itemPitch  44           ← the menu's item pitch

 items      Publish  top 564.1  bottom 608.1
            Rename   top 608.1  bottom 652.1
            Export   top 661.1  bottom 705.1
            Delete   top 705.1  bottom 749.1

 trigs
  card 0  cx 1184  cy 493.6   insideMenuRect false  landsOnItem null      elementFromPoint "html"
  card 1  cx 1184  cy 605.6   insideMenuRect TRUE   landsOnItem "Publish" elementFromPoint "div{menuitem}"
  card 2  cx 1184  cy 717.6   insideMenuRect TRUE   landsOnItem "Delete"  elementFromPoint "div{menuitem}"
  card 3  cx 1184  cy 829.6   insideMenuRect false  landsOnItem null      elementFromPoint "html"
```

`elementFromPoint` at card 2's trigger centre resolves to a `menuitem`. The trigger is not merely
overlapped — it is **not the hit target at its own coordinates**.

### The destruction, executed

Same probe. Click at exactly `(1184, 717.6)` — the centre of card 2's `⋯` button:

```
::C3_deleteVictimTrigger { cardIndex 2, cardName "Palette: Probe Palette 2",
                           cx 1184, cy 717.6, landsOnItem "Delete" }
::C3_afterClickOnThatTrigger {
 "store": ["Probe Palette 1","Probe Palette 2","Probe Palette 3","Probe Palette 4","Probe Palette 5"],
 "cards": 5, "menus": 0, "dialogs": 0 }
```

`Probe Palette 0` is gone. The user's pointer was over `Probe Palette 2`'s menu button.

**Control, same coordinates, no menu open** (`::C4_control_afterClick`): store unchanged, `menus: 1`,
`openOwner "Probe Palette 3"` — the click opens that card's menu, as it should. The only difference
between destruction and correct behaviour is whether another card's menu happened to be open.

### Determinism — 3 for 3

Probe `pcm-p4-d.mjs`, 8 seeded palettes, the same click repeated:

```
::D2_determinism
 run 0  menuOwner "Probe Palette 0"  clickedTriggerIndex 2  at (1184, 717.6)
        storeBefore 8 → storeAfter 7   removed ["Probe Palette 0"]  dialogs 0
        undoAffordance { hasUndoText false, hasRestore false }
 run 1  menuOwner "Probe Palette 1"  clickedTriggerIndex 2  at (1184, 717.6)
        storeBefore 7 → storeAfter 6   removed ["Probe Palette 1"]  dialogs 0
 run 2  menuOwner "Probe Palette 2"  clickedTriggerIndex 2  at (1184, 717.6)
        storeBefore 6 → storeAfter 5   removed ["Probe Palette 2"]  dialogs 0
```

Three clicks at one screen coordinate, three palettes destroyed, no dialog, and the DOM contains
neither the word "undo" nor "restore" afterwards.

### The other collision is a *publish*, not a no-op

Probe `pcm-p4-f.mjs` clicks card 1's trigger centre instead:

```
::F1_clickPoint { cx 1184, cy 605.6, itemAtPoint "Publish" }
::F2_afterStrayClick [
 { i 0, name "Palette: Probe Palette 0", h 128, text "Probe Palette 0 2 Failed to create session" },
 { i 1, name "Palette: Probe Palette 1", h 100, text "Probe Palette 1 2" } ]
```

The card the user was *not* pointing at grew a feedback strip (100 → 128 px) reporting a failed
publish. On this dev server the API is `misconfigured` so the write dies at session creation
(C2-4's error string, re-observed). **With a configured API this gesture publishes a private
palette to the public wall.** The action is not idempotent and, per `PaletteCard.vue:295`, it is a
real remote write.

### It is the general case, not one alignment

Probe `pcm-p4-e.mjs` opens **every** card's menu in an 8-card list and maps the collisions:

```
::E1_summary { cards: 8,
               openingsWithACoveredTrigger: 8,     ← every single one
               openingsThatCoverDelete: 4,
               distinctCoveredItems: ["Publish","Delete","Export"] }
```

Per opening, with the floating side recorded:

```
 opened 0  side "bottom"  covered: trigger 1 → Publish (+19.5)   trigger 2 → Delete (−9.5)
 opened 1  side "bottom"  covered: trigger 2 → Publish (+20.0)   trigger 3 → Delete (−8.5)
 opened 2  side "top"     covered: trigger 1 → Export  (−16.5)
 opened 3  side "top"     covered: trigger 2 → Export  (−16.5)
 opened 4  side "bottom"  covered: trigger 5 → Publish (+20.0)   trigger 6 → Delete (−8.5)
 opened 5  side "bottom"  covered: trigger 6 → Publish (+19.5)   trigger 7 → Delete (−9.5)
 opened 6  side "top"     covered: trigger 5 → Export  (−16.5)
 opened 7  side "top"     covered: trigger 6 → Export  (−16.5)
```

(`offsetFromItemCentre` in px — `−9.5` means the trigger centre is 9.5 px above `Delete`'s centre,
i.e. 12.5 px inside a 44 px row on both sides. This is not a near-miss on an edge.)

Both flip directions collide. When the menu opens **downward** the collision is destructive;
when it opens **upward** it lands on `Export`, which is merely wrong rather than lossy.

**Mobile, iPhone 14, real `tap()`** (`::E2_summary`): `cards 8`,
`openingsWithACoveredTrigger 2`, `openingsThatCoverDelete 2`, `sides ["top","bottom"]`,
`cardPitch 130`. Rarer because the phone layout flips upward more often, but when it flips down the
same two rows are covered:

```
 opened 2  side "bottom"  covered: trigger 3 → Rename (−21.1)   trigger 4 → Delete (+11.9)
 opened 5  side "bottom"  covered: trigger 6 → Rename (−21.1)   trigger 7 → Delete (+11.9)
```

### The user is given no warning that the target moved

Probe `pcm-p4-d.mjs` screenshots the same 36 × 36 rect — card 2's trigger box, `{x 1166, y 700, w 36,
h 36}` — with the menu closed and with it open, and decodes both:

```
::D1_coveredTriggerVisibility
 closed          minLum  73.1  maxLum 239.4  meanLum 222.9  inRectContrast 7.85
 openUnderMenu   minLum 182.3  maxLum 236.4  meanLum 229.8  inRectContrast 1.72
 pixelsChangedGt8 366 / 1296     maxLumDelta 157.7
```

7.85 : 1 → 1.72 : 1. The `⋯` glyph does not survive `backdrop-filter: blur(11px)` under an 80.8 %
opaque surface; 28 % of the rect's pixels move by more than 8 luminance units and the darkest pixel
lightens by 109. Frames: `evidence/pass-4/pass4-trigger-closed.png`,
`evidence/pass-4/pass4-trigger-under-menu.png`, and the wide shot
`evidence/pass-4/pass4-collision-zoom.png` (the menu sits over the card row; the covered `⋯` is
nowhere in it).

**I state the confounder plainly, because it bounds the severity:** what *is* drawn at that point is
a legible `Delete` row with a trash glyph. A user who reads before clicking is safe. The hazard is a
mis-aim hazard — the pointer goes where the control was, in a list whose rows are visually identical
and whose pitch happens to be a near-multiple of the menu's item pitch — and its cost is an
unconfirmed, un-undoable deletion of a *different* object than the one under the cursor. That is why
this is a BLOCKER and not a MAJOR: the failure is silent, destructive, off-target, and routine.

### Why the component owns this

Three levers are all in this file and its immediate parent, and none of them is set:

1. `PaletteCardMenu.vue:2` — `<DropdownMenu …>` takes reka's `modal` default of `true`
   (`node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js:26-30`: `modal: { type: Boolean,
   required: false, default: true }`). That is what makes the covered triggers
   `pointer-events: none` (measured: `::B0_hitTestUnderLock → triggerComputedPE "none",
   bodyPE "none", triggerIsTopMost false`) so they cannot absorb their own click. See P4-2.
2. `PaletteCardMenu.vue:7` — `<DropdownMenuContent align="end" class="w-48 text-small">` sets no
   `:side-offset`, no `:align-offset`, no `:collision-padding`. Same omission as C3-4.
3. `PaletteCardMenu.vue:133-140` — `Delete` is the last item, and per C2-14 it is unconfirmed.

### Cure — the gestalt one, not a nudge

Do **not** try to solve this by geometry. Any bottom-anchored menu in a repeated row list will cover
the rows beneath it; shifting the offset only moves which item lands on the trigger.

The idiomatic transposition is the one the platform already expects of a destructive item in a
repeated-row menu, and it collapses P4-1, P4-4 and C2-14 into a single change:

- **Destructive actions in a per-row menu are confirmed.** `Delete` and `Delete (admin)` emit into
  an `AlertDialog` — the primitive glass-ui already ships — naming the palette. The admin path is
  *already* confirmed (C2-14); the owner path is the outlier. A stray click then costs a dismissal,
  not a palette.
- **`:modal="false"` on `:2`**, so the neighbouring triggers stay hit-testable and reka's
  `onPointerDownOutside` dismisses on the way in — which is what turns the cross-row gesture into
  "close this menu, open that one" instead of "activate an item". This also kills P4-2, P4-5 and
  C2-15 (all four consumers should carry it; see P4-2).
- **`Publish` on a saved palette is a remote write and should confirm too**, or at minimum be
  undoable — `PaletteCard.vue:295` fires it with no guard at all.

---

## P4-2 — MAJOR: one omitted prop, five measured symptoms

`PaletteCardMenu.vue:2`

```html
<DropdownMenu :open="menuOpen" @update:open="$emit('updateOpen', $event)">
```

No `:modal`. reka defaults it to `true`
(`node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js:26-30`), and glass-ui forwards the prop
verbatim (`node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/DropdownMenu.vue.d.ts` —
`modal?: boolean` in `DropdownMenuBaseProps`, runtime default `modal: boolean`). The prop is
available, typed, documented *"Whether opening the menu makes outside content inert"*, and unused:

```
$ grep -rn ":modal" demo --include="*.vue"
(no output)
```

Four consumers, none of them setting it:

```
$ grep -rn "DropdownMenu" demo --include="*.vue" -l
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
demo/palettes/browser/search/UserSortMenu.vue
demo/shell/dock/menus/MobileMenuDropdown.vue
demo/shell/dock/menus/ProfileSection.vue
```

The other three are **singletons** in the dock and the filter bar — a document-wide inert layer
costs them nothing. This is the only menu rendered **once per row of a list**, and it is the only
one for which the default is wrong. The same default is harmless three times and load-bearing once.

Measured symptoms, all from probes `pcm-p4-a.mjs` / `pcm-p4-b.mjs`:

| # | symptom | measurement |
|---|---|---|
| 1 | the whole document goes pointer-inert | `::A1_afterOpenCard0 → bodyPointerEvents "none"` |
| 2 | the covered triggers cannot absorb their own click — **the mechanism of P4-1** | `::B0_hitTestUnderLock → triggerComputedPE "none", triggerIsTopMost false, topMost "div"` |
| 3 | a scroll lock is applied to `<body>` | `bodyOverflowInline "hidden"` |
| 4 | **and it does not lock the scroller** | `::B4_scrollUnderLock → window {before 0, after 0, moved false}`, `inner { before 0, after 200, moved TRUE, cls "glass-resting card rounded-card text-card-foreground scrollb…" }` — the real scroll container still scrolls 200 px under the lock (C2-15's observation, now with the cause named) |
| 5 | focus is trapped on the menu container; `Tab` is a no-op | P4-5 |

And one cross-card consequence worth its own line, because it is the *non-destructive* half of the
same gesture — probe `pcm-p4-b.mjs`, clicking card 1's trigger repeatedly with fresh geometry each
time:

```
::B2_crossCardSequence
 click 1  menuCount 0  lastClickTarget path ["div{menuitem}","div{menu}","div"]   ← hit card 0's menu
 click 2  menuCount 1  openMenuOwner ["Probe Palette 1"]                          ← finally opens
 click 3  menuCount 0  lastClickTarget path ["html"]                              ← toggles shut
 click 4  menuCount 1  openMenuOwner ["Probe Palette 1"]
::B3_clicksToMoveMenu { opened: true, clicksNeeded: 3 }
```

Moving the menu from one card to the next costs **three** clicks, and the first of them activates an
item on the card you are leaving.

**Cure:** `:modal="false"` on `:2`. If a modal barrier is genuinely wanted for the dock singletons,
it belongs as a glass-ui `DropdownMenu` default that per-row consumers override — but the shipped
truth is that no consumer has ever made the choice deliberately, because none of them names the prop.

---

## P4-3 — MAJOR: two items, one label, one icon, two different actions

`PaletteCardMenu.vue:27-40` — the **saved** branch:

```html
<DropdownMenuItem v-if="paletteKind === 'saved'" … @click="$emit('action', 'publish')">
    <Globe class="h-4 w-4" />
    Publish
```

`PaletteCardMenu.vue:48-60` — the **remote + owned** branch:

```html
<DropdownMenuItem v-if="paletteKind === 'remote' && isOwned" …
                  @click="$emit('action', isPublic ? 'makePrivate' : 'makePublic')">
    <component :is="isPublic ? EyeOff : Globe" class="h-4 w-4" />
    {{ isPublic ? "Make private" : "Publish" }}
```

When `isPublic` is false the second item renders **`Globe` + the string `Publish`** — glyph for
glyph and character for character identical to the first. They are not the same operation:

```
PaletteCard.vue:295   publish:    () => emit("publish", props.palette),
PaletteCard.vue:302   makePublic: () => emit("setVisibility", props.palette, "public"),
```

`publish` mints a **new remote palette** from a local one. `makePublic` flips an **existing**
remote's visibility. Different host emits, different API calls, different consequences,
one word.

Three concrete costs, not aesthetic ones:

1. **Accessible name.** C3-2 already established the menu inherits the trigger's name
   (`"Palette menu"`, six times). The item name is now the *only* discriminator AT has, and for
   these two it is the same string. A screen-reader user cannot tell "publish this to the server"
   from "make this public".
2. **Test locators.** The repo's e2e idiom is `getByRole("menuitem", { name: … })`
   (six specs, C3-8). A `name: /Publish/` locator matches either item depending on
   `paletteKind` — and neither branch is covered today, so nothing has failed yet
   (`e2e/smoke/flows/palette-delete.spec.ts:48` uses the anchored `/^Delete$/` precisely because
   this menu has ambiguous names).
3. **The reader.** Two `v-if` branches four lines apart emit different strings under one word; the
   `if (!fn) return` dispatcher (`PaletteCard.vue:316`) will silently swallow whichever one a future
   host forgets. That is C2-1's failure mode with an extra way to reach it.

**Cure:** name the operations for what they do — the saved item is `Publish to the commons…`, the
remote flip is `Make public` / `Make private` (which is what `isPublic ? EyeOff : Globe` already
implies). Then the label is the state transition and the K-INV5 annotation (`:56-59`) is the current
state, which is exactly the "state display + transition" shape C2-5 and C3-5 both converge on.

---

## P4-4 — MAJOR (escalation of C2-14): "unconfirmed delete" is now a data-loss primitive

C2-14 filed the missing confirmation as MINOR, on the reading that a user who chooses `Delete` from
a menu they deliberately opened has expressed intent. Pass 2 was right about that reading and it is
now obsolete: **P4-1 supplies a routine gesture that reaches `Delete` without the user opening that
palette's menu at all.**

Re-measured this pass alongside P4-1 (`::D2_determinism`): `dialogs: 0` on all three runs,
`undoAffordance { hasUndoText: false, hasRestore: false }`, store monotonically decreasing.
The admin path *is* confirmed (`PaletteCard.vue:301` → the admin dialog, pass 2's measurement
stands), so the owner path is not a missing convention — it is an inconsistency with the
component's own sibling branch.

The severity of a missing confirmation is a function of how easy the action is to reach by accident.
Pass 2 measured the dialog count. Pass 4 measured the accident. **C2-14 should be re-scored MAJOR
and scheduled with P4-1 as one work item.**

---

## P4-5 — MINOR: `Tab` inside the open menu does nothing

Probe `pcm-p4-a.mjs`, menu open, four consecutive `Tab` presses:

```
::A9_tabWalkWithMenuOpen [
 { el "DIV:menu", text "Probe Palette 0 Publish  Ren", inMenu true, menus 1 },
 { el "DIV:menu", text "Probe Palette 0 Publish  Ren", inMenu true, menus 1 },
 { el "DIV:menu", text "Probe Palette 0 Publish  Ren", inMenu true, menus 1 },
 { el "DIV:menu", text "Probe Palette 0 Publish  Ren", inMenu true, menus 1 } ]
```

Focus never leaves the menu **container**, never reaches a `menuitem`, and the menu never closes.
Probe `pcm-p4-e.mjs` confirms `Shift+Tab` is equally inert and that the roving focus is fine once you
use the right key:

```
::E3_keyboardWhileOpen
 { key "Tab",        menus 1, active "DIV{menu}",     insideMenu true }
 { key "Shift+Tab",  menus 1, active "DIV{menu}",     insideMenu true }
 { key "ArrowDown",  menus 1, active "DIV{menuitem}", activeText "Publish", insideMenu true }
 { key "Escape",     menus 0, active "BUTTON",        activeText "Palette menu", insideMenu false }
```

WAI-ARIA APG, Menu Button pattern: *"`Tab`: Moves focus to the next element in the tab sequence, and
if the menu is open, closes the menu."* Here it is a dead key. `Escape` works and restores focus
correctly, so this is escapable and therefore not a WCAG 2.1.2 trap — but a keyboard user who
reaches for `Tab` gets no response at all, with no indication that `Escape` is the way out.

Cause and cure are P4-2's: the focus trap is reka's modal `FocusScope`, and `:modal="false"` gives
the APG behaviour for free.

---

## P4-6 — INFO: the repo already owns the oracle that would have caught P4-1

The gate story is worse than "no test covers this". The repo has a **house idiom for exactly this
class of defect** — `elementFromPoint` occlusion oracles — and it is pointed at the decorations:

```
$ grep -rn "elementFromPoint" e2e
e2e/smoke/oracles/t31-dock-band.spec.ts:33    const el = document.elementFromPoint(x, y);
e2e/smoke/oracles/o12-blob-seat.spec.ts:124   const el = document.elementFromPoint(px!, py!);
```

`o12` asserts the WebGL bead's arc never occludes the dock. `t31` asserts the dock band is not
overlapped. Neither the bead nor the dock can delete anything. **The one surface in the app where an
occluded control means a destroyed palette has no such oracle.**

What the delete spec actually does (`e2e/smoke/flows/palette-delete.spec.ts:46-48`):

```ts
await main.getByRole("button", { name: "Palette menu" }).first().click();
await page.getByRole("menuitem", { name: /^Delete$/ }).click();
```

A Playwright locator click auto-scrolls the item into view and clicks *its* centre. It can never
click at another card's trigger coordinates, so it is structurally incapable of observing P4-1.

**Exact mutations that keep every gate green** (pass-3's list, plus three from this pass):

1. Delete `:107-130`, the entire `<DropdownMenuSub>` family. (pass 3)
2. `const isPublic = computed(() => true)`. (pass 3)
3. `const apiOffline = computed(() => false)`. (pass 3)
4. Delete both `style="font-variant: small-caps"` attributes. (pass 3)
5. Make `:9`'s `DropdownMenuLabel` render nothing. (pass 3)
6. **Change `align="end"` to `align="start"` on `:7`** — moves the menu 178 px left, changes which
   controls it covers, changes nothing any test observes.
7. **Add `:side-offset="200"`** — pushes the menu two rows further down the list, relocating the
   destructive collision to different cards. Invisible to the suite.
8. **Change `Publish` (`:33`) to emit `'makePublic'`** — collapses P4-3's two actions into one wrong
   one. No spec asserts either.

The oracle this component needs is four lines and the repo has written it twice already: *with any
card's menu open, no other card's interactive control may resolve to a `menuitem` under
`elementFromPoint`.* That single assertion is a born-RED gate for P4-1 and it would have failed on
8 of 8 openings.

---

## P4-7 — INFO: keyboard is immune; P4-1 is pointer-only

Stated so the cure is not over-scoped. With a menu open the focus scope is trapped (P4-5), so a
keyboard user has **no path** to another card's trigger without first pressing `Escape`, which
restores focus to the owning trigger (`::E3_keyboardWhileOpen`, last row). Arrow keys move within
the menu only. P4-1 is reachable by mouse and by touch, and not otherwise — the same shape as C2-2,
and the same lesson: this component's defects live on the pointer path, which is the path no gate
in this repo exercises at coordinates.

---

## Prior findings re-tested this pass

| id | what I did | outcome |
|---|---|---|
| C2-4 `misconfigured` | observed the live consequence through a *different* route than pass 2 — the stray-Publish of P4-1 | **CONFIRMED** — `::F2_afterStrayClick` card 0 renders `"Failed to create session"`; the latch is still not tripped, so `Publish` is enabled and the failure surfaces as a session error |
| C2-14 unconfirmed delete | re-measured 3× under P4-1's gesture | **CONFIRMED and escalated** → P4-4. `dialogs: 0`, no undo/restore text, 3/3 destructions |
| C2-15 body lock vs inner scroller | re-measured with the cause isolated | **CONFIRMED, mechanism closed** → P4-2 symptom 4: `window.moved false` / `inner.moved true` (0 → 200) while `body.style.overflow === "hidden"` |
| C3-2 six identical names | independently re-counted on a fresh seed | **CONFIRMED** — `::A1_afterOpenCard0 → triggerExpanded` is a 6-element array over 6 buttons all named `"Palette menu"`; and P4-3 removes the last discriminator for two of the items |
| C2-1 dead actions | not re-run (pass 3 reproduced it independently with a matched control); source re-read | `PaletteCard.vue:316` `if (!fn) return` unchanged at HEAD `e39da983` |
| C2-2 / C3-1 / C3-3 / C3-4 | not re-run — pass 3's measurements are recent, on the same byte-identical file, and this pass had no instrument that would sharpen them | carried |

---

## Negative results this pass (probed, found sound — do not re-litigate)

| claim | measurement | verdict |
|---|---|---|
| `isOwned?: boolean \| undefined` / `isAdmin?: …` (`:210-211`) are a redundant union | `tsconfig.base.json:11` `"exactOptionalPropertyTypes": true` — under that flag `?: boolean` alone **forbids** an explicit `undefined`, which four of the five hosts pass. The union is required, not redundant | **CORRECT AS WRITTEN** |
| `useApiClient()` at `:216` costs something per card (N cards → N subscriptions/listeners) | `demo/platform/transport/useApiClient.ts:53-62` — the whole function is `inject(API_CLIENT_KEY)` plus a throw; `createApiClient()` runs **once**, at App root, over module-level refs. No timer, no listener, no allocation per card | **no per-card cost** |
| the portalled content lands inside the card, so menu interaction drives the card's `useLiquidPress` | `::A0_portal → chain ["div#reka-dropdown-menu-content-v-1-8…","div","body#app.relative"], insideArticle false` | **portalled to body; no press bleed** |
| the `menuOpen` controlled-prop round trip can desync (the `defineModel` stale-read hazard) | there is no `defineModel` here; `PaletteCard.vue:257` holds a plain `ref(false)`, `:89` writes it from `@update-open`, and `:317` writes it before dispatch. Round trip measured clean across 30+ open/close cycles in five probes — `triggerExpanded` and `menuCount` never disagreed once | **sound** |
| double-clicking the trigger desyncs the controlled state | `::A11_afterDoubleClick → menuCount 0, triggerExpanded all "false", bodyPE "", bodyOverflow ""` — a clean open-then-close toggle, locks released | **sound** |
| a modal layer / body lock leaks after the cross-card dismiss | `::B2_crossCardSequence` — every closed step reports `bodyPE "auto"`, `bodyOverflowInline ""` | **no leak** |
| `save` on a remote palette corrupts the local store (kind confusion) | `demo/palettes/usePaletteStore.ts:145-149` — `addPublishedPalette` unshifts `{ ...palette, id: palette.id ?? crypto.randomUUID(), isLocal: true }`, with name+colors and slug dedup above it | **sound** (the *presence* of both `Save` and `Remix` on a remote card is D pass-1 `:709`'s finding, not an implementation defect) |
| the long-name menu header loses the name entirely | `::A10_longNameLabel → clientWidth 178, scrollWidth 740, clipped true, visibleChars "Extremely Long Palette N"`, `title null` | **real, but already filed** — D pass-1 D-10 / D pass-2 P2-10 own it; recorded here only as independent corroboration |
| page errors attributable to this component | `::pageErrors []` in all six pass-4 browser runs (`p4-a`, `p4-b` ×2 contexts, `p4-c`, `p4-d` ×2, `p4-e` ×2, `p4-f`) | **PASS** |
| the six known local hazards | no `defineModel`, no oklch/HSV roundtrip, no `ValueUnit` wrapping, no slider pointer-capture, no `requestAnimationFrame`, no WebGL, no parsing in this file | **none present** |
| `verbatimModuleSyntax` (edict 8) | `:177` `import type { Palette }`, `:178` `import type { PaletteKind }`; all others are value imports | **PASS** |
| god module (edict 1) | 228 lines, 2 computeds, no local state | **PASS** |

---

## Strongest defect

**P4-1.** Pass 2's C2-1 is a menu item that does nothing; pass 4's P4-1 is a menu item that does
something to the wrong object. Of the two, the second is the one that costs a user their work.

The reason I would put it in front of the owner ahead of everything else in this file's four-pass
record is that it needs no unusual state to fire. No `misconfigured` latch, no `unlisted`
visibility, no touch device, no admin seat, no 320 px viewport, no screen reader. Six ordinary
palettes, a mouse, and the most ordinary mistake in any list UI — opening the wrong row's menu —
and the palette you opened first is gone. `8 → 7 → 6 → 5`, three clicks at one coordinate, no
dialog, no undo, and the store on disk is already rewritten before the animation finishes.

The arithmetic is what makes it feel less like a bug and more like a fact about the design: the card
list has a 112 px pitch, the menu has a 44 px pitch, and `224` lands 9.5 px from the centre of the
last item. Nobody chose that. Nobody could have seen it by reading the file, because neither number
is in the file. It only exists when the component is rendered next to five copies of itself, which
is the only way it is ever rendered — and which is precisely the configuration the visual matrix
never captured (C2-16), the e2e suite never clicks at coordinates in (P4-6), and no component test
exists to construct (C2-8).

---

## Probe artefacts (all new this pass)

Under `docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-4/`:

| file | what it decides |
|---|---|
| `pcm-p4-a.mjs` / `-results.json` | portal target; the cross-card click trace; body/html lock state per step; `Tab` walk with the menu open (**P4-5**); the long-name label; double-click end state |
| `pcm-p4-b.mjs` / `-results.json` | hit-testing under the modal lock (**P4-2 symptom 2**); the 3-click cross-card sequence with fresh geometry; scroll-under-lock (**P4-2 symptom 4**); the mobile arm |
| `pcm-p4-c.mjs` / `-results.json` | **P4-1** — the collision map (menu rect, item rects, every trigger centre, `elementFromPoint`), the executed destruction, and the no-menu-open control |
| `pcm-p4-d.mjs` / `-results.json` | **P4-1** — 3-run determinism with store deltas and undo-affordance scan; the covered-trigger contrast decode (7.85 → 1.72) |
| `pcm-p4-e.mjs` / `-results.json` | **P4-1 generality** — all 8 openings × both flip sides, desktop and iPhone 14; the keyboard immunity control (**P4-7**) |
| `pcm-p4-f.mjs` / `-results.json` | **P4-1** — the `Publish` half of the collision: what fires, what the wrong card renders, network/console |
| `pass4-collision-open.png`, `pass4-collision-zoom.png` | the open menu over the card row |
| `pass4-trigger-closed.png`, `pass4-trigger-under-menu.png` | the same 36 × 36 rect, glyph present vs erased |
| `pass4-after-stray-delete.png`, `pass4-stray-publish.png` | the app immediately after each stray activation |
| `pass4-mobile-collision.png`, `pass4-mobile-crosscard-end.png`, `pass4-crosscard-end.png`, `pass4-longname-label.png` | supporting frames |

Reproduce with the dev server up on `http://localhost:9000`:

```
node docs/tranches/V/megatranche/audit/components/PaletteCardMenu/evidence/pass-4/pcm-p4-<a|b|c|d|e|f>.mjs
```

All six seed `localStorage["color-palettes"]` via `addInitScript` and drive `/#/palettes`; none needs
the LAN host (unlike pass 3's `pcm-p3-b.mjs`), because the local-palette route does not touch the
`misconfigured` transport.

No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/`, `scripts/dev/dev.sh`
or any `INBOX.md` was modified. The only repo writes are this report, the preserved
`challenge-C-implementation.pass-3-2026-07-28.md`, and `evidence/pass-4/`.
