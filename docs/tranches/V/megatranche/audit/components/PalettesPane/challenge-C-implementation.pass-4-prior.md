# CHALLENGE-C — `demo/palettes/PalettesPane.vue` · implementation is defective (pass 4)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context variant.
The seat was spawned with an explicit Opus 5 declaration and the served tier matches it. No
inheritance, no undeclared tier, no silent downgrade.

---

## Subject · substrate · method

| | |
|---|---|
| Component | `/Users/mkbabb/Programming/value.js/demo/palettes/PalettesPane.vue` (212 lines) |
| Branch / HEAD | `tranche-u` @ `9268f054` (the task named `c654824e`; HEAD advanced under the formation — **no source touched by this seat**) |
| Prior passes | `challenge-C-implementation.pass-{1,2,3}-prior.md`, all preserved verbatim |
| Live probes | 9 headless-Chromium Playwright scripts + 1 `vite-node` offline harness, all written this pass, all beside this report. Every number below is pasted stdout from **my own** run. |
| Gates run first-hand | `npx vue-tsc -p tsconfig.demo.json --noEmit` (exit 0) · `npx vitest run` (26 files / 348 tests / green / 6.93 s) |
| Images read | `shots/safari-desktop-light/palettes.png`, `shots/safari-desktop-dark/palettes.png`, `shots/safari-mobile-dark/palettes.png` |

**Verdict: DEFECTIVE.** Two **new MAJORs** no prior pass found — the owner-RULED rainbow title
is **not rainbow in dark scheme** (measured, and visible in the dark screenshots the matrix
already holds), and the delete-all trigger's `variant="ghost"` is a **dead prop under Glass 7**
that the *hard* demo-typecheck gate structurally cannot see. Plus: pass-3's two standing BLOCKERs
independently re-confirmed with my own contexts, pass-2's C-2 **measured live for the first time**
(pass 3 declined to re-run it), and pass-3's "publish writes into a corpse" **upgraded from
inference to measurement**.

---

## N-1 · MAJOR (NEW) — the owner-RULED "Palettes is rainbow" title is **not rainbow in dark scheme**

`PalettesPane.vue:15` carries one of exactly two owner-sanctioned ramp sites — Q5 RULED
2026-07-09, owner-verbatim *"Only palettes should be rainbow"*, T-43 owner-CONFIRMS 2026-07-11.
It is satisfied in light and **unmet in dark**, on desktop *and* mobile.

**Open the images the matrix already holds.** `shots/safari-desktop-dark/palettes.png` and
`shots/safari-mobile-dark/palettes.png`: "My Palettes" is **flat white ink**. Compare
`shots/safari-desktop-light/palettes.png`: magenta → purple. The ruled Q4-record moment survives
in one scheme only. No prior pass read the dark shots.

**Measured** (`repro-C8-ramp.mjs` — same page, same tokens, `colorScheme` flipped):

| scheme | resolved gradient stops | chroma |
|---|---|---|
| light | `oklch(0.471 0.188 330)`, `oklch(0.471 0.188 10)`, `oklch(0.471 0.125 50)` | 0.125 – 0.188 |
| dark | `oklch(0.958 0.0337 330)`, `oklch(0.958 0.0211 10)`, `oklch(0.958 0.0231 50)` | **0.021 – 0.034** |

A **5.6× – 8.9× chroma collapse**. Across the full 80° analogous fan the dark stops differ by
≲0.03 in Oklab a/b — at or below the JND for letterform strokes, which is exactly why three
"distinct" stops paint as one white.

This **sharpens pass-3's refutation rather than contradicting it.** Pass 3 correctly refuted
*"`--palettes-ramp-title-*` is never defined"* — the tokens **are** written by
`useViewAccents.ts:163`, and my probe confirms it (`--palettes-ramp-title-0:
oklch(95.83% 0.0337 329.8deg)` present on `:root` in dark). The defect is not a missing token; it
is **what the resolver writes into it**. The recipe, the inline aliases and the `background-clip`
are all sound:

```json
"inlineStyle": "--palettes-ramp-0: var(--palettes-ramp-title-0, oklch(0.632 0.214 333.5)); …",
"backgroundClip": "text", "color": "rgba(0, 0, 0, 0)"
```

`demo/color-session/palettes-ramp.ts:16-42` documents this exact failure class as *already cured*
— *"shipped three near-identical near-blacks"* — and promises *"pastel in dark (light ink on the
dark card)"*. L 0.958 at C 0.02 is not a pastel; it is white. The cure inverted the wreck instead
of removing it. **Mechanism (hypothesis, labelled):** the `certifyAccentInk` cusp walk overshoots
the 3:1 large-text floor it aims at, and at L 0.958 the sRGB gamut cusp leaves almost no chroma to
hold. Hue 330 at L≈0.80 — still comfortably ≥3:1 on the dark card — supports C≈0.15.

**Cure.** Stop the walk **at** the floor, or better invert the objective: maximise chroma *subject
to* the contrast floor rather than walking lightness and accepting whatever chroma survives. The
ruling is about colour; the guard currently optimises the one axis that destroys it.

---

## N-2 · MAJOR (NEW) — `<Button variant="ghost">` is a dead prop under Glass 7; the ruled demotion never landed, and the hard typecheck gate cannot see it

`PalettesPane.vue:56-72` states the design: *"the delete-all trigger is DEMOTED from an
always-red beacon … to a quiet ghost — red on hover/focus."*

Glass 7.0.0's `Button` has **no `variant` prop**
(`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts`):

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary"|"secondary"|"quiet"|"text"
    tone?: Tone; size?: ButtonSize; iconOnly?: boolean; loading?: boolean; type?; disabled?; class?;
}
```

`dist/button-Bu9F4uU6.js` → `emphasis: { default: "secondary" }`. So `variant="ghost"` falls
through as an inert HTML attribute and the button renders at the **default** emphasis.

**Measured on the live page** (`repro-C7-ghost.mjs`):

```json
{
  "strayVariantAttr": "ghost",
  "dataEmphasis": "secondary",
  "backgroundColor": "oklab(0.915626 0.00551148 0.0130686 / 0.52)",
  "boxShadow": "rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, …",
  "outerHTML": "<button data-slot=\"button\" data-emphasis=\"secondary\" data-tone=\"neutral\" data-size=\"xs\" … class=\"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover cursor-pointer text-muted-foreground …\" variant=\"ghost\">"
}
```

A **filled secondary glass capsule with an inset highlight** — not a ghost. The ruled demotion
survives only in the comment. `variant="ghost"` is additionally emitted into the DOM as a
non-standard attribute.

Compounding it, the same element hand-rolls the destructive-ghost register in five per-instance
utilities (`cursor-pointer text-muted-foreground hover:text-destructive focus-visible:text-destructive
hover:bg-destructive/10`) while **the same file uses the root-level API 52 lines later** —
`PalettesPane.vue:116`, `<Button tone="destructive">`. Owner edict **5** (style at the root
component level, never per-instance overrides) violated against in-file precedent; edict **4**
(variants belong in glass-ui) violated by hand-rolling a register the producer already axes. The
correct expression is `emphasis="quiet" tone="destructive"`.

### The gate cannot fail here — measured

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
vue-tsc exit=0
```

Zero errors. Vue's fallthrough-attribute typing accepts **any** undeclared attribute on a
component, so the *hard* demo-typecheck step (D48/D56) is structurally blind to dead props. This
is not a lint gap that tightening `tsconfig` fixes — it is a hole in the type system's shape.

**Blast radius beyond this file:**

```
$ grep -rn "variant=" demo --include="*.vue" | grep -i button   →  16 usages
$ grep -rln "Button[^>]*variant=" demo --include="*.vue"        →   9 files
```

including this pane's own subtree: `PaletteCard.vue:98`, `CurrentPaletteEditor.vue:97,135,152,160`.
Every one of them is unverified by construction. This is Glass-7-adoption residue that W44's
"ADOPTED WHOLE" close did not catch, and it needs a **grep-gate or an ESLint rule**, since the
typechecker will never help.

---

## N-3 · pass-2's C-2 **measured live for the first time** — reorder under a search filter relocates palettes the user cannot see

Pass 3 explicitly declined to re-run this (*"Not re-measured — pass-2's numbers are sound"*). I ran
it, both offline against the real modules and live against the dev server. It is real.

`onEnd` (`PalettesPane.vue:190`) builds `ids` from the **filtered projection**;
`reorderPalettes` (`usePaletteStore.ts:153-167`) rebuilds the array from `orderedIds` first and
appends everything else at the tail.

**Live** (`repro-C2-live.mjs`):

```
start store        : Alpha Bravo Charlie Delta
filtered DOM ('l') : Alpha Charlie Delta  (Bravo is filtered OUT)
after filtered drag: DOM Charlie Alpha Delta
full store order   : Charlie Alpha Delta Bravo
EXPECTED           : Bravo must still sit at index 1 (it was never dragged)
```

**Offline, same result** (`repro-C1-sortable.ts` §C-2, real `useFilteredList` + real
`reorderPalettes`): `Charlie Alpha Delta Bravo`. The user reordered two visible cards; a third
palette they could not see moved two positions.

**Cure.** A projection cannot express a total order. Either map filtered indices back onto the
full order before writing, or — the KISS reading, and what every list app does — **disable the
sortable while a query is active**.

---

## N-4 · pass-3's "publish writes into a corpse" upgraded from inference to measurement

Pass 3 established that `cardRefs` retains entries after their cards unmount (counts). It inferred
that `onPublish`'s `if (card)` guard can therefore never take its false branch. I measured what
the retained objects **are** (`repro-C4-refs-dialog.mjs`, six palettes seeded, search narrowed to
one):

```
{"id":"id-Alpha","isUnmounted":false,"stillInDom":true}
{"id":"id-Bravo","isUnmounted":true,"stillInDom":false}
{"id":"id-Charlie","isUnmounted":true,"stillInDom":false}
```

and the retention across the full churn cycle (`repro-C3-a11y-refs.mjs`):

```
after mount (6 cards)   : {"keys":6,…}
DOM cards while filtered: 1
while filtered to 1 card: {"keys":6,…}
after clearing the filter: {"keys":6,…}
```

`isUnmounted: true, stillInDom: false` is the proof: `PalettesPane.vue:199-208` awaits a network
round-trip and then calls `cardRefs[id].showFeedback(...)`. If the palette was filtered out or
deleted during the await, the lookup **succeeds** against a disposed instance and the
success/failure message is written into a corpse — silently swallowed, with no error and no
fallback surface. `PalettesPane.vue:84`'s `(el: any) => el && (cardRefs[palette.id] = el)` discards
Vue's `null` unmount call, which is the whole mechanism.

**Cure.** Delete the ref map. The feedback message is *state* (`{ id, message, variant }` on the
library port, bound as a prop); the imperative `defineExpose({ showFeedback })` handle is the only
reason the map exists, and it is what makes the leak load-bearing.

---

## Independent re-verification of the standing BLOCKERs (my contexts, my numbers)

I re-ran both of pass-3's top findings rather than inherit them. Both stand.

### P-1 (pass 3) — a store payload that passes `read()` whiteouts the whole app · **CONFIRMED**

`repro-C9-adjudicate.mjs`, fresh context per cell:

```
P-1 control       /#/           bodyText=2060 appHTML=140022 canvas=2 pageErrors=0
P-1 control       /#/palettes   bodyText= 274 appHTML= 81570 canvas=2 pageErrors=0
P-1 control       /#/blob       bodyText= 750 appHTML=126745 canvas=2 pageErrors=0
P-1 version-only  /#/           bodyText=   0 appHTML=   167 canvas=0 pageErrors=2 Cannot read properties of undefined (reading 'filter')
P-1 version-only  /#/palettes   bodyText=   0 appHTML=   167 canvas=0 pageErrors=2 Cannot read properties of undefined (reading 'filter')
P-1 version-only  /#/blob       bodyText=   0 appHTML=   167 canvas=0 pageErrors=2 Cannot read properties of undefined (reading 'filter')
```

`localStorage["color-palettes"] = '{"version":1}'` — a payload the deserializer's only check
(`usePaletteStore.ts:25`, `typeof parsed.version !== "number"`) **accepts** — renders zero text and
zero canvases on every route. Independently reproduced. Pass-3's severity and cure stand: `read()`
must **parse, not cast**.

### C-3 (pass 2/3) — `commitEdit` / `cancelEdit` never reach a handler · **CONFIRMED, two ways**

Measured — the actual vnode prop bag Vue hands PalettesPane (`repro-C9-adjudicate.mjs`):

```json
{ "propKeysPassedToPalettesPane": ["key","ref","savedColorStrings","onCommit-edit","onCancel-edit"],
  "hasOnCommitEdit": false, "hasKebabOnCommitEdit": true }
```

Confirmed by construction in Vue's own source
(`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:4388, 4417-4418`):

```js
const isModelListener = event.startsWith("update:");
…
if (!handler && isModelListener) { handler = props[toHandlerKey(hyphenate(event))]; }
```

The kebab-case fallback is gated on `isModelListener`. `emit("commitEdit")` resolves only
`onCommitEdit` — which is **not in the prop bag**. `usePaneRouter.ts:155-157` supplies
`"onCommit-edit"`. The handler never fires. Dead by measurement and by construction.

### C-1 — first-drag scramble · **CONFIRMED, third independent reproduction**

`repro-C1-live.mjs` (live, real SortableJS drag) and `repro-C1-sortable.ts` (offline, real modules):

```
seeded store order : Alpha Bravo Charlie Delta
drag Alpha(0) -> row index 2
EXPECTED           : Bravo Charlie Alpha Delta
ACTUAL store order : Charlie Delta Bravo Alpha
```

with the identity that makes it possible printed directly by the offline harness:

```
identity(list === filteredSaved.value): true
```

`PalettesPane.vue:183` hands `useSortable` the computed's **live cached array**; vueuse's default
`onUpdate` (`useSortable.js`, `isRef(list) === false` ⇒ **no copy**) splices it in place; SortableJS
fires `update` before `end` (`sortablejs/modular/sortable.esm.js:2002` → `:2023`), so `onEnd` reads
an n−1 list. Drag #2 is clean (`repro-C2-live.mjs`), confirming the arm-once-per-mount shape. The
pane is `KeepAlive`-cached (`demo/shell/PaneSlot.vue:120`), so it re-arms per page load and per
cache eviction.

---

## Carried forward from pass 3 — mechanism re-read, unchanged, not re-measured

Listed so nothing is lost, and so no later seat re-runs what is settled. Full evidence in
`challenge-C-implementation.pass-3-prior.md`.

| id | severity | one line |
|---|---|---|
| P-2 | MAJOR | expand is keyboard-unreachable, so edit-colour / copy-colour / add-colour / copy-slug / reorder have **no** keyboard route |
| P-3 | MAJOR | an `isLocal` palette with no `id` is invisible, uncounted, and **survives "Delete all saved palettes"** |
| P-4 | MAJOR | the demo's global reduced-motion guard is inert — glass-ui's later `!important` wins (`0.1s`, not `0.01ms`); a dual path, edict 2 |
| C-4 | MAJOR | `searchQuery` is one app-global `ref` shared by four ports; the in-file "scoped" comment (`:28-32`) is false |
| C-5 | MAJOR | the no-match empty state says "No saved palettes yet." with N palettes stored |
| P-5 | MINOR | `demo/ui/*` is 18-of-19 pure glass-ui re-exports; this file imports through both paths twenty lines apart |
| P-6 | MINOR | `ActionFeedback` is not a live region; its dismiss timer outlives the card |
| P-9 | INFO | three dead imports (`watch`, `onMounted`, `nextTick`, `:128`); eslint exit 0, `noUnusedLocals` absent |

I re-confirmed two of these in passing this pass, with my own numbers:

- **P-2 / C-9** — `repro-C5-keyboard.mjs`: the grid's only focusables are the per-card menu
  buttons (`['button "Palette menu"', 'button "Palette menu"']`); the card is `tabIndex: -1` with
  no keydown; the menu offers `["Publish","Rename","Export","Delete"]` — no expand, no reorder. The
  drag handle measures `{ tag: 'svg', role: null, ariaHidden: null, focusable: false }` at **16×16**,
  one per card. `repro-C6-expand.mjs` confirms expansion *works*, by pointer only (120→140 px,
  22→38 nodes). WCAG 2.2 **2.1.1 (A)**, **2.5.7 (AA)**, **2.5.8 (AA)**.
- **C-5** — `repro-C3-a11y-refs.mjs`: `saved palettes in store: 6` while the grid reads
  `· EMPTY PLATE · | No saved palettes yet. | Add colors above, then save the set.`

---

## Test truth — the gate, measured first-hand

```
$ npx vitest run
Test Files  26 passed (26)      Tests  348 passed (348)      Duration 6.93s
```

No test file imports `PalettesPane.vue`, `usePaletteStore`, `useFilteredList`, `usePaletteActions`
or `usePalettePorts`. `demo/test/` holds three files (two aurora, one export byte-exactness);
`test/demo/palettes/api/` tests the API client only.

Mutations that keep vitest, eslint and `vue-tsc` **green** (extending pass-3's eight with the two
this pass earns):

9. `variant="ghost"` → any string, or delete it — **already proven inert** (N-2). No gate can see it.
10. Invert `evt.oldIndex` / `evt.newIndex` at `:191`/`:193` — reorder becomes a mirror; nothing fails.

The visual matrix is blind here too: `REPORT.json` shows all four `/#/palettes` captures ran with
an **empty** library (`bodyTextLength` 237 desktop / 169 mobile, zero cards), so the delete-all
trigger — and its `aria-label` — were never in the DOM to be checked either.

---

## Negative proof — what I checked this pass and found sound

Stated so DEFECTIVE is not read wider than it is. These are **my** measurements, not inherited.

- **The confirm dialog is well-behaved.** `repro-C4-refs-dialog.mjs`: trigger box **28×28** (above
  the 24 px floor); on open focus moves to `Cancel` (the safe default); `role="dialog"` with
  `aria-labelledby` **and** `aria-describedby` present; **Escape closes it**; and **focus is
  restored to the trigger**. Only `aria-modal` is absent — a glass-ui `DialogContent` matter, and
  `role="alertdialog"` would suit a destructive confirm better. Neither is this pane's to fix.
- **The one nameless button on `/#/palettes` is NOT this pane's.** Measured and attributed:
  `[chrome/dock] <button class="send-btn btn-interactive">`. With six palettes seeded the pane
  subtree contains **0** nameless buttons and 7 buttons total. The matrix's
  `namelessButtons: 1` must not be charged to PalettesPane.
- **The header count badge is correct** — `aria-hidden` on the visual badge plus an `sr-only`
  companion (`:19-25`), so AT never announces "My Palettes2". This is the pane doing a11y right.
- **PRM-RAF epidemic: zero contribution.** `grep -rn "requestAnimationFrame" demo/palettes/` → 0 hits.
- **`defineModel` staleness: not applicable.** No `defineModel` in the file; both `v-model`s
  (`:34`, `:102`) write straight to injected refs — synchronous, no parent round-trip.
- **`ValueUnit` nesting: none. WebGL: none. `parseCssColor`: never called from this pane.**
- **`verbatimModuleSyntax` honoured** — `import type { Palette }` (`:151`).
- **Vue 3.5 reactive props destructure used correctly** (`:154`; vue 3.5.35, stable and default-on).
- **Console / page errors on `/#/palettes`: clean** in all four matrices (`consoleErrors: []`,
  `pageErrors: []`, `failedRequests: []`, `overflowX: 0`, `main: 1`) and in every one of my own
  contexts with a well-formed store.
- **`Badge variant=` is legitimate** — unlike `Button`, glass-ui's `Badge` **does** declare
  `variant` (`dist/components/badge/index.d.ts`). `:21` and `PaletteCard.vue:64,72` are correct;
  do not sweep them with N-2.
- **The store singleton is sound** (`usePaletteStore.ts:18-45`): lazy, module-level, one
  localStorage binding, `try/catch` serializer. Its defect is insufficient validation (P-1), not
  its lifecycle.
- **No god module.** `usePalettePorts` is a genuine five-port decomposition; the pane injects only
  the two ports it uses.
- **`onCurrentPaletteSaved` is correctly local-first** (`usePaletteActions.ts:65-77`) — the store
  write is unconditional, so a save with the backend down loses nothing.

### Refuted / settled by pass 3 — do not re-run

Post-drag click leakage (0/0 expanded panels); forced-layout scaling during drag (constant 9
`offsetWidth` reads at 4/20/60 cards); duplicate-`id` loss in `reorderPalettes` (unreachable by
enumeration); hover-popover clipping under `contain` (Teleported to body);
`--palettes-ramp-title-*` undefined (**they are written** — see N-1, which is a different defect in
the same neighbourhood). Publish double-submit remains **INCONCLUSIVE** on a loopback host with no
reachable API.

---

## Severity roll-up

| id | severity | one line |
|---|---|---|
| **P-1** *(carried, re-confirmed)* | **BLOCKER** | `{"version":1}` in `localStorage` whiteouts the **entire app on every route** (`bodyText 0`, `canvas 0`), permanently — `read()` casts instead of parsing |
| **C-1** *(carried, re-confirmed)* | **BLOCKER** | the first drag-reorder of each page load scrambles and persists the library order |
| **C-2** *(carried, NOW MEASURED)* | **BLOCKER** | a drag under a search filter relocates palettes the user cannot see |
| **C-3** *(carried, re-confirmed 2 ways)* | **BLOCKER** | `commitEdit`/`cancelEdit` never reach a handler — kebab keys in a `Record<string, unknown>` prop bag, and Vue's kebab fallback is `update:*`-only |
| **N-1** | **MAJOR (new)** | the owner-RULED rainbow title is **flat white in dark scheme** — chroma 0.021–0.034 vs 0.125–0.188 in light |
| **N-2** | **MAJOR (new)** | `<Button variant="ghost">` is a dead prop under Glass 7 (renders `data-emphasis="secondary"`); the hard `vue-tsc` gate exits 0 on it; 16 usages across 9 files |
| **N-4** | **MAJOR** | `cardRefs` retains **unmounted** instances (`isUnmounted: true`), so `onPublish` writes the publish result into a corpse |
| P-2, P-3, P-4, C-4, C-5 | MAJOR | carried from pass 3 (keyboard-dead expand; undeletable orphan; inert PRM guard; global `searchQuery`; false empty state) |
| P-5, P-6 | MINOR | carried (`demo/ui` alias layer; no live region + leaked dismiss timer) |
| P-9 | INFO | carried (three dead imports; both gates configured not to see them) |

**Strongest defect: P-1** — the only finding whose blast radius is the entire application rather
than one pane, triggered by a payload the deserializer's own validation accepts, **permanent**
(the app cannot boot to repair the storage it poisoned), and invisible to the audit harness, which
only ever visits with a clean store. Re-confirmed this pass with my own contexts.

**Strongest NEW defect: N-2** — not for its blast radius but for what it proves about the gates.
A prop that does nothing, on the pane's most destructive control, contradicting a written ruling,
in a repo whose CI typecheck is *hard* — and the typecheck exits 0. Where N-1 is one wrong number
in one resolver, N-2 is a class of defect the toolchain cannot detect at all, with 15 more
instances already shipped.

## Artifacts (all read-only probes, all beside this report)

`repro-C1-sortable.ts` (offline, `vite-node`) · `repro-C1-live.mjs` · `repro-C2-live.mjs` ·
`repro-C3-a11y-refs.mjs` · `repro-C4-refs-dialog.mjs` · `repro-C5-keyboard.mjs` ·
`repro-C6-expand.mjs` · `repro-C7-ghost.mjs` · `repro-C8-ramp.mjs` · `repro-C9-adjudicate.mjs`
