# CHALLENGE-C · `demo/palettes/BrowsePane.vue` — implementation · **PASS 2**

> Pass 1 is preserved verbatim at `challenge-C-implementation.pass-1-2026-07-27.md`.
> This is an **independent re-run**: I built and ran my whole probe battery — a unit harness
> against the real `useBrowsePalettes`, five live-browser probes against the running dev server —
> **before** opening pass 1, pass D or pass L. Findings are marked **NEW** (no prior pass on this
> component reached it), **CONVERGE** (independently re-derived by a different method path),
> **UPGRADE** (a prior pass argued or synthetically modelled it; I measured it in the running
> component), or **CORRECTION** (a prior claim I could not reproduce, or reproduced narrower).

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model ID `claude-opus-5[1m]`, spawned with
an explicit Opus 5 declaration. The seat is declared, not inherited, not downgraded.

---

## Verdict

**DEFECTIVE.**

Pass 1's eighteen findings stand; I re-derived nine of them from scratch and none withdrew. This
pass adds **one NEW BLOCKER, two NEW MAJORs, two UPGRADEs and two CORRECTIONs**.

The headline of pass 2 is a shipped menu action that has never worked:

> **"Edit Tags" is dead on the Browse wall, and it fails two different ways depending on how you
> press it.** `TagEditPopover` is an *anchored* surface — `<PopoverTrigger as-child><slot
> name="trigger"/></PopoverTrigger>` (`TagEditPopover.vue:3-5`). BrowsePane is its **only host in
> the tree** (`grep -rn TagEditPopover demo` → one usage, `BrowsePane.vue:148`) and it supplies
> **no `#trigger` slot**. So the popover has no reference element. Measured in the running app:
> with a **mouse**, `tagEditOpen` returns to `false` in the same interaction and zero popper
> wrappers exist; with the **keyboard**, it opens and Floating UI emits its
> no-reference placeholder — `transform: translate(0px, -200%)`, `--reka-popper-transform-origin:`
> *(empty)* — planting the fully-rendered tag editor at `y = −304 px`, three hundred pixels above
> the top of the window. Its text content is exactly `"TAGS warm MOOD cool MOOD"`. It is there. It
> is correct. Nobody can ever see it.

Environment: brief cites `c654824e`; `BrowsePane.vue` unmodified since 2026-07-17. Live probes
against the user's own dev server, reached over its LAN host `http://192.168.1.166:9000` to clear
the `detectDevMisconfig` latch (pass 1 recorded this; independently re-confirmed —
`availability.ts:107-115`, `isLoopbackHost` returns false for a LAN hostname), with
`https://api.color.babb.dev` intercepted.

---

## Evidence apparatus (pass 2)

All artefacts under `./probe-C2/`. Every number below was read out of a running process.

| # | Probe | Method | Result |
|---|---|---|---|
| P1 | `probe-c2-unit-browse.test.ts` | 3 unit probes against the **real** `useBrowsePalettes` module (`vi.mock` on `api/index.ts`, `useSession.ts`, `usePaletteStore.ts`) | 3 passed |
| P2 | `probe-c2-loadmore-strand-and-focus.mjs` | Chromium, stubbed commons, load-more raced against the search debounce | `stuckSkeletons: 2`, `moreButtons: 0`, still 2 / 0 at +10 s |
| P3 | same probe, focus leg | `.focus()` the load-more button → `Enter` → read `document.activeElement` | `"More from the commons"` → **`BODY`** |
| P4 | `probe-c2-stranded-ax.mjs` | CDP `Accessibility.getFullAXTree` in the stranded state | `generic "Loading more palettes"`, 2 × `status "Loading palette"`, `aria-live` count **0** |
| P5 | `probe-c2-cardrefs-live-growth.mjs` | walk `#app.__vue_app__._instance` → BrowsePane `setupState.cardRefs`, 8 reloads | **6 → 30 → 54** entries, visible cards constant at 6, stale `$el.isConnected === false` |
| P6 | `probe-c2-edit-tags-anchor.mjs` | open a card menu → "Edit Tags", mouse **and** keyboard, read popper wrapper inline style + rect | see BLOCKER N-1 |
| P7 | `probe-c2-shared-searchquery.mjs` | type into the **My Palettes** box on `/#/browse`, read both inputs | both read `"typed-into-MY-PALETTES-box"` |
| P8 | `curl` + source read | `/colors/tags` route → service → DTO | `Promise<TagDTO[]>`, raw array, always |

```
$ npx vitest run --root /Users/mkbabb/Programming/value.js --config ./probe-C2/vitest.probe-c2.config.ts
  loadingMore after both settle = true
  hasMore = true  rows = 50
  after a further loadMore attempt, rows = 50 (no append: the guard is latched)
  browseError = "Failed to load palettes"
  rows still on the wall = 3
  BrowsePane error branch fires? -> false
  detail line shown to the user = "Failed to load palettes"
 ✓ probe-c2-unit-browse.test.ts (3 tests) 14ms
 Test Files  1 passed (1)   Tests  3 passed (3)
```

---

## BLOCKER

### N-1 · **NEW** — "Edit Tags" is inert on Browse: the popover has no anchor, because its only host never supplies one

`TagEditPopover` is built to hang off a trigger:

```vue
<!-- demo/palettes/browser/search/TagEditPopover.vue:2-6 -->
<Popover :open="open" @update:open="$emit('update:open', $event)">
    <PopoverTrigger as-child>
        <slot name="trigger" />          <!-- ← the anchor -->
    </PopoverTrigger>
    <PopoverContent align="start" class="w-52 p-0">
```

BrowsePane mounts it with **no `#trigger` slot**, opening it programmatically from a card-menu
action instead:

```vue
<!-- demo/palettes/BrowsePane.vue:148-155 -->
<TagEditPopover
    v-if="tagEditPalette"
    :open="tagEditOpen"
    :palette-slug="tagEditPalette.slug"
    :current-tags="tagEditPalette.tags ?? []"
    @update:open="tagEditOpen = $event"
    @update:tags="onTagsUpdated"
/>
```

`grep -rn "TagEditPopover" demo | grep -v node_modules` → **one host, `BrowsePane.vue:148`**
(plus the barrel re-exports). The `#trigger` slot serves a consumer that does not exist; the one
consumer that does exist is broken by its absence.

**Measured, mouse path** (`probe-c2-edit-tags-anchor.mjs`, click the menu item):

```json
"menuItems": ["Save","Make private\nPUBLIC","Remix","Rename","Edit Tags","Export","Delete"],
"afterClick": { "popperWrappers": 0, "anyPopoverContent": [], "bodyChildCount": 6 },
"paneState": [ { "tagEditOpen": false, "tagEditPaletteSlug": "wall-palette-6" } ]
```

The handler fired — `tagEditPalette` is set to `wall-palette-6` — and `tagEditOpen` is already
back to `false`. Nothing is portalled. Nothing renders. The menu closes and the user gets no
response whatsoever.

**Measured, keyboard path** (`ArrowDown` ×5 → `Enter`, which avoids the dismiss-layer pointerdown):

```json
"paneState": [ { "tagEditOpen": true, "tagEditPaletteSlug": "wall-palette-6" } ],
"popperDetail": { "wrappers": [
  { "text": "Wall Palette 6 Save Make private PUBLIC Remix Rena",
    "style": "position: fixed; left: 0px; top: 0px; transform: translate(480px, 449px);
              --reka-popper-transform-origin: 100% 386.078px; z-index: 130;",
    "r": { "x": 480, "y": 449, "width": 192, "height": 386.08 } },

  { "text": "TAGS warm MOOD cool MOOD",
    "style": "position: fixed; left: 0px; top: 0px; transform: translate(0px, -200%);
              --reka-popper-transform-origin: ; z-index: 130;",
    "r": { "x": 0, "y": -304.41, "width": 208, "height": 152.20, "bottom": -152.20 } }
]}
```

Two poppers, same frame, same engine, same tick — a controlled comparison:

| popper | has a trigger | `--reka-popper-transform-origin` | transform | rect |
|---|---|---|---|---|
| card menu | yes (`button[aria-haspopup]`, measured at `x:641 y:177 32×40`) | `100% 386.078px` | `translate(480px, 449px)` | on screen |
| **tag editor** | **no** | **empty** | **`translate(0px, -200%)`** | **`y −304 … −152`** |

`translate(0px, -200%)` with an empty transform-origin is Floating UI's "reference not resolved"
placeholder. The tag editor is fully rendered, correctly populated with the live catalog
(`warm`/`cool`), and parked entirely above the viewport. Frame: `./probe-C2/c2-edit-tags-offscreen.png`.

- **Severity** BLOCKER — a shipped, discoverable menu action on the community wall does nothing,
  in both input modalities, with no error and no feedback. Tag editing is unreachable on Browse.
- **Reproduction** `node docs/tranches/V/megatranche/audit/components/BrowsePane/probe-C2/probe-c2-edit-tags-anchor.mjs`
  (requires the dev server on `:9000`; the probe reaches it over the LAN host and stubs the commons).
- **Cure — architectural, not a patch.** The tag editor is not a popover in this host's grammar: it is
  invoked from a menu item that has already closed, with no surviving anchor. Either (a) render it as
  the **anchorless surface it actually is** — the same `Sheet`/`Dialog` treatment `VersionHistoryDrawer`
  and `FlagReportDialog` already use two lines below, which self-position and need no reference — or
  (b) move the popover **into the card**, where the tag chip that owns it can fill `#trigger`. (a) is
  KISS and reuses a component type already in the file; (b) is right if tag editing is meant to feel
  attached to the swatch row. Either way the `#trigger` slot, which no host fills, is deleted.

---

## MAJOR

### N-2 · **NEW** — activating "More from the commons" destroys focus; the keyboard user is ejected to `<body>` and has nothing to return to

The load-more affordance and its loading state are `v-if`/`v-else-if` **siblings**
(`BrowsePane.vue:125-144`): pressing the button unmounts the button. Measured:

```
focusBefore        : "More from the commons"
focusAfterActivate : { "tag": "BODY", "text": "→BrowseToolsBrowsePalettes Login  @mbabb" }
```

There is no `nextTick` focus hand-off, no `aria-live` on the appended region, and no focus target
in the two skeleton plates that replace the button. A keyboard or screen-reader user presses
Enter, is silently dumped to the document root, and must Tab from the top of the shell back
through the dock and the whole wall to reach whatever arrived.

This composes with C-2/pass-1 into something worse than either part: when the strand fires the
button **never comes back**, so there is not even a delayed restoration target. `WCAG 2.4.3` (Focus
Order) and `3.2.2` (On Input) are both in play, but the plain implementation defect is enough:
a control that deletes itself on activation must move focus deliberately.

- **Reproduction** `node ./probe-C2/probe-c2-loadmore-strand-and-focus.mjs` — the `focusBefore` /
  `focusAfterActivate` pair is printed unconditionally.
- **Cure** the pagination trigger is one persistent node whose *label* changes
  (`"More from the commons"` → `"Loading…"`, `aria-busy="true"`, `disabled`), not two nodes that
  swap. Focus then never moves, and the appended rows are announced by the same status node N-4
  calls for. This also deletes the `v-if`/`v-else-if` pair and the second skeleton block.

### N-3 · **NEW / CORRECTION of pass-1 C-16** — a failed abuse report closes the dialog as if it succeeded

```ts
// BrowsePane.vue:296-300
async function onFlagSubmit(reason: string, detail: string | undefined) {
    if (!flagPalette.value) return;
    await pm.flagged.report(flagPalette.value.slug, reason, detail);
    flagDialogOpen.value = false;                       // ← unconditional
}
```

Pass 1 C-16 reads this as *"no `try` — a rejection leaves the dialog open and raises an unhandled
rejection."* **That is not what happens.** `report` owns its own boundary:

```ts
// demo/palettes/useAdminFlagged.ts:120-131
    async function report(paletteSlug, reason, detail): Promise<{ flagged: boolean } | undefined> {
        try { return await flagPalette(paletteSlug, reason, detail); }
        catch (e) { console.warn("Failed to flag palette:", e); return undefined; }
    }
```

It never rejects. It returns `undefined`. So the awaited call *cannot* leave the dialog open and
*cannot* raise an unhandled rejection — the defect is the mirror image: the dialog **closes on
failure**, indistinguishably from success. A user reports abusive content, the network drops it,
and the UI confirms. The return value is discarded at the call site; the pane has a feedback rail
(`cardRefs[...].showFeedback`) it declines to use here.

The same shape, same file, one line class apart:

```ts
// BrowsePane.vue:277-284 — a failed revert is a silent no-op
const updated = await pm.versions.revert(versionPalette.value.slug, hash);
if (!updated) return;              // useVersionHistory.ts:88-92 catches → undefined
```

- **Cure** `report` and `revert` return a verdict (`{ ok } | ApiProblem`), the pane renders it.
  Do not close a dialog on an unexamined result.

---

## UPGRADE — pass-1 findings I measured in the running component

### N-4 · **UPGRADE of C-5** — `cardRefs` growth, measured live at 6 → 30 → 54 while the wall shows 6

Pass 1 proved the leak against a synthetic re-implementation of the idiom. I read the **real
component's** `setupState.cardRefs` out of the running app after each reload
(`probe-c2-cardrefs-live-growth.mjs` walks `#app.__vue_app__._instance`):

```
after initial load  | visible cards = 6 | cardRefs entries = [6,6]   | DETACHED = sample connected:true
after 4 reloads     | visible cards = 6 | cardRefs entries = [30,30] | sample connected:false
after 8 reloads     | visible cards = 6 | cardRefs entries = [54,54] | sample connected:false
```

`[30,30]` is two numbers because `/#/browse` mounts the pane in **both** responsive slots — the leak
is doubled. `+6 per reload, forever`, with the visible card count pinned at 6. The retained values
are the components' expose proxies (`ownKeys: ["showFeedback"]`) and their `$el` reports
`isConnected: false` from reload 4 onward: every entry is a handle on a component whose DOM has
been detached. The pane is `KeepAlive`d, so nothing ever clears it.

The mechanism is the guard, exactly as pass 1 named it — `BrowsePane.vue:94`
`:ref="(el: any) => el && (cardRefs[palette.slug] = el)"` swallows Vue's unmount `null` call. Pass 2
adds the live magnitude and the detachment proof.

### N-5 · **UPGRADE of C-11** — in the stranded state the pane's *only* live regions are a permanent lie

Measured on the loaded wall and again in the stranded state (P4, CDP full AX tree):

```json
loaded wall  : { "ariaLiveCount": 0, "roleStatusCount": 1 }
stranded     : { "skeletons": 2, "roleStatus": 3, "ariaLive": 0, "moreBtn": 0 }
AX tree      : [ { "role": "generic", "name": "Loading more palettes", "ignored": false },
                 { "role": "status",  "name": "Loading palette", "ignored": false },
                 { "role": "status",  "name": "Loading palette", "ignored": false } ]
```

`PaletteCardSkeleton` carries `role="status" aria-label="Loading palette"` on its own root
(`PaletteCardSkeleton.vue:44-47`). BrowsePane renders `SKELETON_COUNT = 4` of them on entry
(`:50`) and 2 more for load-more (`:130`). So the pane never announces *its* result — `aria-live`
count is **0** on a wall of six cards — but it does stand up four simultaneous polite live regions
that each say "Loading palette", and after the strand it leaves **two of them asserting "loading"
forever while nothing is loading**. The one honest announcement the pane owns, `EmptyState`'s
`role="alert"` (`EmptyState.vue:18`), is precisely the one C-4 makes unreachable.

---

## CORRECTION

### N-6 · **CORRECTION of pass-1 C-11** — "the label is discarded by AT" is a spec inference, not a measurement, and Chromium contradicts it

Pass 1: *"ARIA in HTML forbids naming `role="generic"` — the label is discarded by AT, so the two
loading states are nameless and silent."* The **spec half is right**: `BrowsePane.vue:47` and
`:128` put `aria-label` on a bare `<div>`, which maps to `role="generic"`, and ARIA 1.2 lists
`generic` under *name prohibited*. The **consequence half did not reproduce**. Chromium's full AX
tree exposes the name and does not ignore the node:

```json
{ "role": "generic", "name": "Loading more palettes", "ignored": false }
```

Per **MT-F022** a claim about assistive-technology behaviour needs a two-engine proof; this seat ran
one engine, so the narrow, provable statement is: *the markup violates the ARIA-in-HTML naming
prohibition, and whether the name survives is engine-dependent and unverified here.* The cure is
unchanged (`role="status"` on a stable node instead of a label on a `generic`), and it is now
justified by N-5's measured `ariaLive: 0` rather than by an unproven AT claim. Severity of the
naming point alone: **MINOR**, not MAJOR.

### N-7 · **CORRECTION of pass-1 C-13** — the wire shape the coercion defends against does not exist

`BrowsePane.vue:215-220` coerces `pm.tagEdit.allTags` through
`Array.isArray(tags) ? tags : Object.values(tags)`, justified in-comment by *"the `/colors/tags`
read **can** resolve an object-shaped payload at runtime."* Pass 1 correctly calls this a masking
fallback in the wrong layer. It is worse than that: **the payload it defends against is not
producible.** The full chain is typed and total —

```
demo/palettes/api/colors.ts:14   export function getTags(): Promise<Tag[]>
api/src/modules/color/routes.ts:64-68   "// raw array — no envelope wrapping"  →  c.json(result)
api/src/modules/color/service/queries.ts:106-110   listColorTags(): Promise<TagDTO[]>  →  rows.map(formatTag)
```

— and `request()` throws on non-2xx before any body reaches the caller. So the branch is dead code
guarding a phantom, and the comment asserting otherwise is a false claim in the source. This
strengthens pass 1's finding from "wrong layer" to "**delete it**": there is nothing to narrow at
`getTags`, only a shim to remove.

---

## CONVERGE — independently re-derived, by different method paths

Each of these I reached before reading pass 1; the corroboration is worth more than the restatement,
so I record the independent measurement and defer to pass 1's write-up.

| pass-1 finding | my independent path | agreement |
|---|---|---|
| **C-2** `loadingMore` stranded | unit probe: `mockReturnValueOnce(deferred)` on load-more, then `loadRemotePalettes(true)` mid-flight → `loadingMore = true` after both settle, next `loadMore` appends nothing; live: `stuckSkeletons: 2 / moreButtons: 0` at +10 s | full |
| **C-4** error plate can never fire on a non-empty wall | unit probe computes the template predicate directly: `browseError = "Failed to load palettes"`, `filteredBrowse.length = 3`, `errorBranchFires → false`; live: a 500 on a search reload leaves 6 stale cards and `showsAnyError: false` | full |
| **C-5** `cardRefs` write-only registry | → upgraded at N-4 | full |
| **C-6** colour search is a second copy, client-only | `grep -rn "colorL" demo` → the only hits are `api/palettes.ts:27,50` (the wrapper) and `BrowsePane.vue:354` (a comment). `listPalettes` ships `colorL/colorA/colorB/colorRadius` and **nothing ever passes them** | full |
| **C-7** zero-result search renders the true-empty invitation | live, pre-debounce so the filter is purely client-side: `cards: 0`, copy = `"· THE COMMONS · No published palettes here yet. Publish one from My Palettes and start the wall. More from the commons"` | full |
| **C-8** one `searchQuery` for two visible panes | typed into **My Palettes'** box on `/#/browse`: `[{"placeholder":"Search the commons...","value":"typed-into-MY-PALETTES-box"},{"placeholder":"Search your palettes...","value":"typed-into-MY-PALETTES-box"}]` — the coupling runs both directions. Also visible in `./probe-C2/c2-stranded-loadmore.png`: `"Wall"`, typed into the commons box, sitting in the right pane's field | full (both directions) |
| **C-14** gratuitous `any` | `(p: any)` at `:344` and `(el: any)` at `:94`; `oklabColors` is declared at `types.ts:32` so the cast buys nothing | full |
| **C-16** silent-failure paths | re-derived the load-more swallow (`useBrowsePalettes.ts:109-111`) and the `loadAllTags` swallow (`useTagEdit.ts:44-47`); **corrected** the `onFlagSubmit` bullet at N-3 and **added** the `onRevert` bullet | partial + correction |
| **C-17** vacuous gates | independently reached the same mutation: deleting `useBrowsePalettes.ts:112` keeps `browse-pagination.spec.ts` green, because `await expect(more).toHaveCount(0)` cannot tell "retired" from "hidden behind a stranded `v-if`", and `expect(cards).toHaveCount(PAGE1+PAGE2)` passes since the append precedes the `finally` | full |

**One further vacuous-gate result of my own:** `grep -rln "commons is unreachable\|Retry" e2e/ test/ demo/test/` returns **one file**, `e2e/smoke/oracles/o9-shadow-palette.spec.ts`, which is about a different component. **No test in the repository ever renders BrowsePane's error branch**, and none exercises Edit Tags, load-more focus, or the failed-reload path. N-1, N-2, N-3 and C-4 are all in territory no gate visits.

---

## Also observed (MINOR)

- **The error detail line is a tautology, and the file's own comment says it should not be.**
  `BrowsePane.vue:56-60` documents *"The raw machine string moves to the Fira detail line."* It
  does not: `useBrowsePalettes.ts:79` discards `e` and assigns the constant `"Failed to load
  palettes"`, which the template then passes as **both** the headline's cause and `:detail`
  (`:66`). Measured against a thrown `Error("HTTP 503 upstream mongo timeout")`: `detail line
  shown to the user = "Failed to load palettes"`. Visible in the shipped capture —
  `audit/visual/shots/safari-desktop-light/browse.png` reads *"The commons is unreachable. /
  Failed to load palettes"* while the console holds the real cause. (Pass 1 C-1 owns the transport
  half of this; the *documented-intent-vs-implementation* mismatch is the part I add.)
- **The three portalled hosts never release their palette.** `versionPalette`, `flagPalette` and
  `tagEditPalette` (`:270, :289, :305`) are set on open and never reset on close, so each `v-if`
  latches true for the session and its dialog stays mounted with stale props. Harmless today only
  because `useTagEdit.loadAllTags` is `loaded`-guarded.
- **Optimistic tag write with a swallowed save — latent behind N-1.** `TagEditPopover.vue:76-77`
  emits `update:tags` **before** awaiting `saveTags`, and `useTagEdit.saveTags` catches and returns
  `undefined` (`:63-67`). `onTagsUpdated` (`BrowsePane.vue:312-320`) then writes the tags into
  `pm.remotePalettes` with no rollback path. A rejected `PATCH` (428/412/offline) leaves the wall
  displaying tags the server refused, until reload. Unreachable today because N-1 makes the editor
  unusable; **fixing N-1 exposes this**, so the two must be cured together.

---

## INFO — negative proof (what this seat could not break)

- **The hazard list from the brief is genuinely absent.** `grep` over `BrowsePane.vue`: no
  `defineModel`, no `requestAnimationFrame`, no `ValueUnit`, no WebGL, no `IntersectionObserver`/
  `ResizeObserver`, no `setTimeout`/`setInterval`, no `addEventListener`, no slider. The
  stale-`defineModel` / PRM-RAF / ValueUnit-nesting / pointer-capture / context-loss classes do not
  apply. `verbatimModuleSyntax` is honoured (`import type { Palette, Tag }`, `:197`).
- **Tap-target and accessible-name geometry: zero contribution.** On a fully-loaded six-card wall
  in Chromium at 1440×900 I measured `smallTargets: []` and `namelessButtons: 0` scoped to `main`.
  The `{"w":160,"h":23,"tag":"input","label":""}` row in `REPORT.json` for `/#/browse` is **not**
  BrowsePane's — the pane's own search field measures `375 × 38`, and the same four small targets
  appear on every one of the fifteen routes (the dock's slug widget). Consistent with pass 1 C-18
  and with the brief's corrected matrix.
- **Keyboard reachability was not born-RED, per MT-F022.** The route's 7/12 Chromium gap is
  roving-tabindex-shaped and this seat ran one engine. The focus finding I *do* file (N-2) is not
  reachability: it is a measured focus **destruction** on activation, `"More from the commons"` →
  `BODY`, which no roving-tabindex design produces.
- **The `Transition` state machine is sound.** Three mutually exclusive branches, correctly keyed
  (`developing`/`error`/`wall`), `mode="out-in"` legal with a single child at a time; the load-more
  block correctly sits outside it.
- **The generation guard on the fetch itself is correct.** `loadRemotePalettes` discards stale
  responses (`useBrowsePalettes.ts:73, 78, 84`) and my racing probes never produced an
  out-of-order `remotePalettes` write. The bug is scope, not absence: the guard was extended to a
  flag it does not own (C-2).

---

## Family view — pass 2's additions fold into pass 1's three mechanisms, and add a fourth

| mechanism | pass-1 findings | pass-2 additions |
|---|---|---|
| Typed failure collapsed to a constant / swallowed | C-1, C-4, C-12, C-15, C-16 | **N-3** (false success on flag; silent revert), the tautological detail line, the optimistic tag write |
| Lifecycle state guarded by the wrong variable, or never released | C-2, C-3, C-5, C-10 | **N-4** (live magnitude), the never-reset dialog palettes |
| App-scoped singletons standing in for pane-scoped state | C-8, C-9 (+C-6, C-7) | — |
| **A component invoked outside the contract it was built for** | — | **N-1** (anchored popover with no anchor), **N-2** (a control that deletes itself on activation) |

The fourth mechanism is the one pass 1 could not see, because it only appears when you *drive* the
menu rather than the wall. Both instances share a shape: **a surface whose lifetime is bound to the
thing that summoned it, summoned by something that has already gone away.** The card menu closes
before the popover can anchor to it; the load-more button unmounts before focus can return to it.
The idiomatic transposition is the same in both cases — *stop binding a transient surface to a
transient trigger*: give the tag editor the anchorless dialog treatment its two siblings in the
same template already use, and give pagination one persistent node that changes label instead of
two nodes that swap.

Combined with pass 1's prescription (`useBrowsePalettes` owning one `usePagedResource`-shaped state
machine with a typed error and its own `searchQuery`), the whole ledger collapses to four moves:
**one state machine, one search scope, one persistent pagination node, one anchorless tag surface.**

---

*Seat: CHALLENGE-C · implementation · pass 2. No source edits. No files written outside
`docs/tranches/V/megatranche/audit/components/BrowsePane/`. Pass 1 preserved verbatim at
`challenge-C-implementation.pass-1-2026-07-27.md`.*
