# CHALLENGE-C — `demo/workbenches/mix/MixSourceSelector.vue` — implementation

**Round r3** (independent adversary re-run). r1 is preserved at `challenge-C-implementation.r1-prior.md`;
**r2 is preserved verbatim at `challenge-C-implementation.r2-prior.md`.**

This round re-derived every finding from the tree and from live probes **before** reading r2, then
reconciled. The reconciliation is not a rubber stamp:

- **r2's BLOCKER (C-1) and its strongest MAJOR (C-15) are independently CONFIRMED** by different
  probe designs at a newer HEAD.
- **Two sub-claims inside r2's C-5 are FALSIFIED by measurement.** They are stated in r2 as fact and
  they are not true in Chromium. A downstream wave that acted on them would fix a defect that does
  not exist. Corrections in §R-1 and §R-2.
- **The shape of the RED gate has changed since r2** — the mix spec now dies *earlier*, at the dock,
  so the gate no longer names the defect it was written to name. §C-2′.
- **Four new findings** (C-17 … C-20), none of which r1 or r2 reached.

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M-context variant) — the tier
this seat was explicitly spawned with. Declared, not inherited.

Environment: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD **`f36f780c`**
(`docs(V·mega): STATE — three OM censuses complete, findings at MT-F043`). The brief cited
`c654824e`; the tree has advanced, none of it touching this component — `git log --format="%h %ad %s"
-5 -- demo/workbenches/mix/MixSourceSelector.vue` returns a single row, `a61094e3 2026-07-17`.
Live dev server `http://localhost:9000`. `@mkbabb/glass-ui@7.0.0`.

Evidence produced this round, runnable, under `evidence/r3/`:
`probe-r3a-addslot.mjs` · `probe-r3b-dropdown-and-nesting.mjs` ·
`probe-r3c-empty-palette-and-menu.mjs` · `probe-r3d-ariasnapshot.mjs` ·
`probe-r3e-c15-verify.mjs` · `r3-palettes-mode.png`.
Each is a standalone `node` script against the live server; all output pasted below is verbatim.

---

## Verdict

**DEFECTIVE — BLOCKER.** Unchanged from r2, and now doubly witnessed.

The Mix workbench's default mode is inert in the shipped app. Both `addColor` emitters render as
`<span aria-hidden="true" style="pointer-events:none">` with **no listener bound**, because glass-ui
7.0.0's `WatercolorDot` removed the `tag` prop, removed its `<slot/>`, and set `inheritAttrs: false`.
`selectedColors` can never leave `[]`; `canMix` (≥2) is unsatisfiable; the Mix button is permanently
disabled in colors mode.

---

## Part I — Reconciliation with r2

### R-1 · CORRECTION — the nested "Palette menu" does **not** toggle the mix selection

r2 C-5 asserts, without a pasted measurement:

> *"activating the nested 'Palette menu' bubbles into the wrapper's `togglePalette`, so opening the
> menu also toggles the mix selection."*

**Measured — it does not.** `evidence/r3/probe-r3c-empty-palette-and-menu.mjs`, two palettes selected,
then a real click on the nested `<button aria-label="Palette menu">`:

```
MIXSOURCES before/after menu-click 2 2
MENU-OPEN 1
```

The selection count is unchanged and the dropdown opens. reka-ui's `DropdownMenuTrigger` stops
propagation, so the bubble r2 predicted never reaches `:262 @click="togglePalette"`.

This does **not** retire r2 C-5 — the nesting is still invalid HTML and still contradicts
`PaletteCard.vue:1-4`'s written contract, both re-confirmed below. It retires the *consequence* r2
attached to it. A cure wave must not be sold on a double-fire that cannot be reproduced.

### R-2 · CORRECTION — the palette name and colour count **are** exposed inside the wrapper button

r2 C-5 further asserts:

> *"the `aria-label` at `:251` overrides all descendant text, so the palette's name, colour count and
> swatches are **never announced**"*

**Measured — in Chromium they are.** `evidence/r3/probe-r3d-ariasnapshot.mjs`
(`page.locator("main").ariaSnapshot()`):

```
- button "Select palette Sunrise":
  - 'article "Palette: Sunrise"':
    - text: Sunrise 2
    - button "Palette menu"
--- Palette menu role count: 1
```

The `article`, the name, the count and the nested control are all present in the tree, and
`getByRole("button", { name: "Palette menu" })` resolves. The honest statement is the *spec* one:
ARIA 1.2 gives `role=button` **presentational children**, and HTML forbids interactive content inside
`<button>`, so descendant exposure is **undefined and engine-dependent** — Chromium exposes it,
another engine need not. I did not drive VoiceOver/WebKit, so I cannot claim the Safari behaviour
either way. r2 stated the worst case as measured fact; it is not.

### R-3 · CONFIRMED, by a different probe — r2's C-1 blocker

I reached C-1 independently before reading r2, and killed it a different way. r2 used `el.click()`
(bypasses hit-testing). I used Playwright's `click({ force: true })` (bypasses actionability) and the
e2e suite's own role locator. `evidence/r3/probe-r3a-addslot.mjs`:

```
PROBE-1 {
 "addSlot": {
  "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null,
  "hasTagAttr": null, "disabledAttr": null,
  "innerHTMLHasSvgPlus": false, "childElementCount": 2,
  "pointerEvents": "none", "tabIndex": -1, "rect": { "w": 48, "h": 48 }
 },
 "mixSources": 0
}
CLICK-ERR TimeoutError: locator.click: Timeout 3000ms exceeded.
SOURCES-AFTER-NORMAL-CLICK 0
FORCE-ERR null
SOURCES-AFTER-FORCE-CLICK 0            ← forced past actionability; STILL nothing happens
ROLE-BUTTON-ADD-CURRENT-COUNT 0        ← the exact e2e locator resolves to zero elements
```

`FORCE-ERR null` with `SOURCES-AFTER-FORCE-CLICK 0` is the decisive pair: the click *was* dispatched
and nothing happened. `innerHTMLHasSvgPlus: false` is the discarded slot.

The second add path is dead by the same mechanism —
`evidence/r3/probe-r3b-dropdown-and-nesting.mjs`, store seeded so the Collapsible mounts:

```
PALETTE-SWATCH-PROBE [
 { "tagName": "SPAN", "ariaHidden": "true", "ariaLabel": null, "title": null,
   "pointerEvents": "none", "tabIndex": -1, "w": 32, "h": 32 },  × 3
]
SWATCH-CLICK-ERR TimeoutError: locator.click: Timeout 2500ms exceeded. | FORCE:…
SOURCES-AFTER-SWATCH-CLICK 0
ROLE-ADD-COLOR-BUTTONS 0
```

`"title": null` is worth isolating: it is the same drop that silently deletes the chip tooltip at
`:150` and, per r2's census, every `WatercolorDot` tooltip in the demo.

**Root cause re-verified at the upstream source of truth** —
`git -C /Users/mkbabb/Programming/glass-ui show 490cc46e -- src/components/watercolor-dot/WatercolorDot.vue`:

```
+defineOptions({ inheritAttrs: false });
-        /** Host tag — `div` (decorative) or `button` (interactive). */
-        tag?: "div" | "button";
-        tag: "div",
-        :is="tag"
-        :type="tag === 'button' ? 'button' : undefined"
+        aria-hidden="true"
-        <slot />
```

and in the shipped dist (`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`): `inheritAttrs: !1`,
props `{color, variant, animate, cycleDuration, range, seed}`, root `o("span", { "aria-hidden":
"true", … style: { …, pointerEvents: "none" } }, [ svg-filter, optional ghost-stroke ])`.

Blast radius re-counted this round by an independent parser (regex over `demo/**/*.vue`, counting
self-closing vs slotted separately):

```
tag="button" sites: 6
   demo/palettes/browser/card/SwatchHoverMenu.vue:14
   demo/palettes/browser/card/SwatchHoverMenu.vue:29
   demo/palettes/browser/card/CurrentPaletteEditor.vue:95
   demo/workbenches/mix/MixSourceSelector.vue:164
   demo/workbenches/mix/MixSourceSelector.vue:211
   demo/workbenches/generate/GenerateControls.vue:199
slot-children sites: 3
   demo/palettes/browser/card/CurrentPaletteEditor.vue:95  child='<Plus …>'
   demo/shell/dock/Dock.vue:271                            child='<Transition name="vj-morph" …>'
   demo/workbenches/mix/MixSourceSelector.vue:164          child='<Plus …>'
```

Matches r2's six. New detail r2 did not surface: **`Dock.vue:271` passes an entire `<Transition>`
subtree into a component with no slot** — the loudest sibling in the family, and worth naming in the
glass-ui BH relay.

### R-4 · CONFIRMED, independently — r2's C-15 (a deleted palette stays an invisible operand)

r2's newest and strongest MAJOR. I built a different probe (three palettes, select two, delete one,
then drive the real Mix button) — `evidence/r3/probe-r3e-c15-verify.mjs`:

```
SELECTED-SOURCES 2 MIX-DISABLED false
CARDS-AFTER-DELETE 2
RING-LIT-AFTER-DELETE 2          ← 1 palette card + the "Palettes" SegmentedTab, which also
                                   carries aria-pressed="true"; ring-lit CARDS = 1
MIX-SOURCES-AFTER-DELETE 1
MIX-DISABLED-AFTER-DELETE false  ← canMix needs >= 2; only ONE is visible
RESULT-TAIL RESULT
ERRS []
```

`MIX-SOURCES-AFTER-DELETE 1` **with** `MIX-DISABLED-AFTER-DELETE false` is the proof, and it is
arithmetic, not inference: `canMix` (`useMixingState.ts:50-53`) requires `selectedPalettes.length >= 2`,
so the deleted *Sunset* is demonstrably still an operand. Pressing Mix then produced a result with
zero page errors — the user silently mixes a palette they deleted. r2's C-15 stands, at MAJOR.

*(Reading note for whoever tallies `aria-pressed`: the mode strip's own buttons carry it too. r2's
`stillSelectedVisible: 1` and my `RING-LIT-AFTER-DELETE 2` are the same measurement under different
selectors — do not read the 2 as a contradiction.)*

### R-5 · CONFIRMED, replayed — r2's C-14 key churn

Replayed the `:81-98` algorithm verbatim, including `useMixingState.removeColor`'s filter and the
`:90-98` pruner:

```
$ node -e "<the :81-98 algorithm>"
start  red,blue,green => keys 0,1,2
rm[1]  red,green      => keys 0,3
rm[0]  green          => keys 4
set4   a,b,c,d        => keys 5,6,7,8
rm[0]  b,c,d          => keys 9,10,11   ← every survivor got a NEW key
```

One thing to add to r2's framing, because it sharpens the cure: the specific casualty is
**`.vj-enter-move`** (`demo/styles/animations.css:99`). FLIP move classes apply only to elements that
*persist across the patch*. After any non-tail removal nothing persists, so the move transition the
`<TransitionGroup>` exists for **can never run** — the mechanism whose comment reads *"Stable keys for
TransitionGroup"* is precisely what makes the TransitionGroup pointless.

### R-6 · Findings carried forward unchanged from r2

Re-derived this round and in agreement; not re-argued here — read r2 for the full text:
**C-4** (16 px nameless hover-only remove button, `type` defaulting to `submit`; my measurement
`ROOT-FONT-SIZE 16px` / `REM16-PROBE {w:16,h:16}` confirms `w-4 h-4` = 16 px against the live
stylesheet) · **C-6** (guards outside the reducer; `:220` uncapped) · **C-7** (the Selected region is
silent to AT; no `aria-live` — `grep -rn "aria-live\|role=\"status\"" demo/workbenches/mix/` → no
output) · **C-8** (`SegmentedTabs` `ariaLabel` omitted) · **C-9** (`onTabChange`'s unreachable array
branch) · **C-10** (`MIN_COLORS = 1` vs a `[]` boot state) · **C-11** (`:css-color="''"` defeating
`EMPTY_PALETTE_SWATCH`) · **C-12** (per-instance ring) · **C-13** (dead `SelectedColor.source`) ·
**C-16** (dead `.add-slot-ghost` CSS + ~55 lines of provenance comment on non-executing markup).

On C-11 I add the negative result r2 hedged toward: I drove the boundary and **it did not throw**.
`evidence/r3/probe-r3c-empty-palette-and-menu.mjs` seeds a zero-colour palette and mixes it:

```
CARDS 2
MIX-DISABLED false
RESULT-TEXT … | Empty One | 0 | Sunrise | 2 | … | SIZE MISMATCH | Discard extras | Mix | RESULT
ERRS [ "CONSOLE [value.js] value.js dev is MISCONFIGURED: … VITE_API_URL …" ]   ← no pageerror
```

C-11 is a **contract violation, not a live crash**. Do not report it as one.

---

## Part II — New findings this round

### C-2′ · MAJOR — **NEW r3** — the RED gate has moved: the mix spec now dies at the dock, before it can name C-1

r2 pasted a run in which `e2e/smoke/views/mix.spec.ts` failed exactly where it should — at
`expect(addSlot).toBeVisible()`, "element(s) not found". **That is no longer the failure.** Run at
HEAD `f36f780c`:

```
$ npx playwright test e2e/smoke/views/mix.spec.ts --project=smoke --reporter=line
Running 1 test using 1 worker
  1) [smoke] › e2e/smoke/views/mix.spec.ts:28:1 › mix flow: convergence lands at the result plate within budget

    Test timeout of 30000ms exceeded.
    Error: locator.click: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByRole('combobox', { name: 'Select view' })
        - locator resolved to <button … aria-label="Select view" …>
        - attempting click action
          - waiting for element to be visible, enabled and stable
       at smoke/fixtures/dock.ts:64
        at openView (/Users/mkbabb/Programming/value.js/e2e/smoke/fixtures/dock.ts:64:22)
        at /Users/mkbabb/Programming/value.js/e2e/smoke/views/mix.spec.ts:34:5
  1 failed
```

The run never reaches line 38. The dock's view combobox resolves but never satisfies Playwright's
**"stable"** predicate — something keeps moving it past the actionability window. That is a second,
separate defect (another seat's subject), but it has a consequence that belongs in *this* report:

**Even if the Playwright suite were wired into CI tomorrow, the mix gate would report the wrong
cause.** It would print a dock timeout, and C-1 — a hard-broken workbench — would remain invisible
behind it. A gate that fails for the wrong reason is only marginally better than a gate that does not
run.

This does not soften r2's C-2. The CI facts are unchanged and re-verified:

```
$ grep -n "playwright" .github/workflows/*.yml
(no matches; workflows present are ci.yml, deploy-pages.yml, release.yml)

$ grep -n "run:" .github/workflows/ci.yml
33: npm ci   34: npm run lint
35: npx vue-tsc -p tsconfig.lib.json --noEmit
36: npx vue-tsc -p tsconfig.demo.json --noEmit
37: npm run build   38: npm test   (vitest)
```

and the type gate's blindness is re-measured:

```
$ time npx vue-tsc -p tsconfig.demo.json --noEmit
npx vue-tsc … 10.66s user 1.04s system 136% cpu 8.591 total     (zero diagnostics)
```

Clean in 8.6 s while `tag`, `@click`, `aria-label`, `:disabled`, `:title` are all no-ops and `<Plus>`
is discarded. Vue types undeclared attributes as `$attrs` fallthrough, so a major-version prop
removal is type-invisible **by construction**.

**Cure, sequenced.** (1) Fix the dock stability defect *first*, or the mix gate cannot speak.
(2) Wire the five Playwright projects into `ci.yml` as hard steps. (3) Add the cheap net the suite
cannot give: **one Vitest component test** that mounts `MixSourceSelector` with a stubbed
`LIBRARY_PORT_KEY`, asserts `getByRole("button", { name: /Add current color/ })` exists, and asserts
that clicking it emits `addColor`. `grep -rln "mount(" test/` returns **nothing** — there is no
component-mount test anywhere in this repo, so the entire consumer/producer boundary with glass-ui is
ungated at the lane CI actually runs. That single test would have failed on `f2c8f565`.

### C-17 · MINOR — **NEW r3** — a zero-colour palette is a legal, selectable, ring-lit, mixable operand

`isPaletteSelected` / `togglePalette` (`:57-67`) and the palettes-mode `v-for` (`:246-268`) apply no
colours-length guard, and neither does `useMixingState.addPalette` (`:65-68`). Measured
(`probe-r3c`, store seeded with an `Empty One` palette carrying `colors: []`):

```
CARDS 2
MIX-DISABLED false
RESULT-TEXT … | Empty One | 0 | Sunrise | 2 | … | SIZE MISMATCH | Discard extras | Mix | RESULT
```

The card renders, selects, ring-lights, satisfies `canMix`, and mixes — contributing nothing. With
`leftoverStrategy: "discard"` the result is silently degenerate. The `SIZE MISMATCH / Discard extras`
control is *visible in the same frame*, which makes the outcome doubly confusing: the UI offers a
policy for mismatched lengths while one operand has length zero.

**Reproduction:** `node docs/tranches/V/megatranche/audit/components/wb-mix-sourceselector/evidence/r3/probe-r3c-empty-palette-and-menu.mjs`

**Cure.** Guard where the operand is admitted, not in the view: `addPalette` rejects
`palette.colors.length === 0`, and the card renders disabled with an honest reason. Same principle as
r2's C-6 — an invariant in a template is a suggestion; in the reducer it is a law.

### C-18 · MINOR — **NEW r3** — `demo/ui/collapsible` is a bare alias shim, and this file is inconsistent inside its own import block

`:5` imports through a demo-local path:

```
$ cat demo/ui/collapsible/index.ts
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui";
```

No added behaviour, no local component — the exact shape edict 2 names ("no aliases, migration
shims"). glass-ui 7.0.0 publishes the subpath directly:

```
$ node -e "console.log(Object.keys(require('.../glass-ui/package.json').exports).join('\n'))" | grep -i "collaps\|tabs\|chip"
./chip
./collapsible
./tabs
```

And the same SFC already imports `SegmentedTabs` from `@mkbabb/glass-ui/tabs` (`:4`) and
`WatercolorDot` from `@mkbabb/glass-ui/watercolor-dot` (`:7`). So one line of the import block routes
through an alias while its neighbours do not — and it costs the bundler the per-consumer tree-shake
that the sibling `demo/palettes/browser/card/index.ts` header (PI-6) explicitly protects by banning
star re-exports for exactly this reason.

**Cure.** `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@mkbabb/glass-ui/collapsible";`
and retire `demo/ui/collapsible/` when its last consumer leaves.

### C-19 · INFO — **NEW r3** — `isPaletteSelected` is called five times per palette per render

`:250-262` invokes `isPaletteSelected(palette.slug)` — an `Array.prototype.some` over
`selectedPalettes` — in `aria-pressed`, `aria-label`, `data-mix-source`, `data-mix-colors` and
`:class`. Five O(m) scans per palette per render, i.e. **O(5·n·m) per tick**, plus r2's C-13
`JSON.stringify`. Negligible at today's counts; listed because `audit/om-16-palette-scalability` is
the row that will care, and because the cure is free.

**Cure.** `selectedSlugs = computed(() => new Set(selectedPalettes.map(p => p.slug)))` on the
machine — which is the *same* `Set` r2's C-15 cure introduces. One change, two findings.

### C-20 · INFO — **NEW r3** — the visual REPORT's `/#/mix` counters do not belong to this component, and the reason is damning

`REPORT.md:37,99,123` records `/#/mix`: **8** small tap targets and **1** nameless button on desktop
(light and dark). It is tempting to bill those to the 16 px nameless remove button (r2 C-4). **They
are not this component's.** Measured on the live route:

```
NAMELESS []                                        (main, empty state)
SMALL-TAP-TARGETS [ {"n":"l channel","w":23.8,"h":24.4},
                    {"n":"a channel","w":23.7,"h":24.4},
                    {"n":"b channel","w":23.6,"h":24.4} ]   ← the picker pane's ConsoleRail
```

MixSourceSelector's *measured* contribution to both counters today is **zero** — because C-1 forces
the chip count to zero, so the offending controls can never render. **The component scores clean on
the accessibility harness by being unusable.** That is the ugliest reading of the numbers, and it is
the correct one. Any future scorecard that reads `/#/mix` a11y counts as evidence of this
component's health is reading an artifact of the blocker.

---

## Local-hazard sweep (negative proofs — measured, not assumed)

| Hazard from the brief | Present? | Evidence |
|---|---|---|
| `defineModel()` stale async round-trip | **No** | no `defineModel` in the file; `mode` is a one-way prop + explicit `update:mode` emit (`:18-31`, `:47-53`). The hazard's cure (a local `shallowRef` cache) is not needed because the hazard's cause is absent. |
| oklch→HSV hue drift / `stableHue` | **No** | the component performs no conversion; `sc.css` is a CSS string passed through untouched from emit to render. |
| `ValueUnit` nesting accumulation | **No** | no `ValueUnit` construction and no `colorUnit2` reach; nothing here wraps a possibly-wrapped value. |
| reka-ui slider pointer-capture leak | **No** | no slider. The only reka-derived surface is glass-ui `Collapsible`, and its trigger is a real button. |
| Ungated `requestAnimationFrame` (PRM-RAF) | **No** | zero rAF in the file. The dot's wobble is off by default (`animate: !1` in the shipped props) and, when on, rides glass-ui's single loop `t(…, { pauseWhenHidden: !0, respectReducedMotion: !0 })` — gated on both axes. This file never passes `animate`. |
| WebGL context loss / eager GL boot | **No** | no drawing context of any kind; `WatercolorDot`'s own docblock names it the suite's deliberate CSS/SVG counterexample. The 3 canvases `REPORT` counts on `/#/mix` are the picker + `MixAnimationCanvas`. |
| Leaked listeners / observers / timers | **No** | the file registers no `addEventListener`, no observer, no interval; its single `watch` (`:90-98`) is setup-scoped and auto-disposed. |
| Unbounded growth | **No** (fragile) | `swatchKeyMap` is pruned to the live set each tick; `swatchKeyCounter` is a monotonically growing `number` — churn, not a leak. The fragility is that the pruner compares by **reference**, so it silently stops the day anyone mutates the array in place; today `useMixingState` replaces (`:56`, `:60`), so it fires. |
| Reactivity that will not fire | **No** | props destructure compiles to `__props.x` getters; the array-replacement discipline in the machine is what makes `watch(() => selectedColors, …)` fire at all — correct, and load-bearing. |
| `parseCssColor` crash class | **Probed; did not fire** | `:166` passes `cssColorOpaque ?? 'var(--muted-foreground)'` into a component that paints it as a raw `background-color` / custom property and never parses it. The adjacent risk is C-11's `''`, and I drove that boundary: zero `pageerror` (§R-6). |
| Console / page errors on `/#/mix` | **Zero product errors** | the only console line across five probe runs is the dev-config `VITE_API_URL` notice; `REPORT.md:123/138/153/168` records `pageErr 0`, `consoleErr 0` for all four `/#/mix` captures. |
| `verbatimModuleSyntax` (edict 8) | **Clean** | `:10-11` both `import type`; `TransitionGroup` (`:2`) is a runtime value correctly imported as one. |
| Idiomatic Vue 3.5 (edict 7) | **Clean** | reactive props destructure used correctly at `:13-23`; no `useTemplateRef`/`shallowRef` need arises. |
| Animations deleted (edict 6) | **Clean** | nothing removed; `vj-enter` is consumed from `demo/styles/animations.css` and `animate-collapsible-*` resolves. (C-14 is a transition *defeated at runtime*, which is not a deletion.) |
| God module (edict 1) | **Clean** | 282 lines, one job, five emits, one injected read port. |

**What is genuinely sound.** The state machine is not the defect. `useMixingState` honours the
ONE-CLOCK law (`startMix` computes synchronously; only `settleMix`, driven by the canvas `@settled`,
advances the phase; `:83` is a real re-entry guard), replaces arrays rather than mutating them, and
delegates to pure functions. The palettes-mode `EmptyState` is honest — it announces no loading
species because the store is synchronous. Every defect in this file sits at exactly two seams: **the
consumer/producer boundary with glass-ui**, and **the selector's private copy of library state**.

---

## Family grouping (r3 consolidation)

| Family | Findings | One cure |
|---|---|---|
| **Glass-5 API retained past a major** | C-1, C-7, C-13, C-16 | *seat/face separation*: a real `<button>` owns semantics, focus, `disabled` and the hit region; the decorative dot is painted inside it. Applied at all six interactive `tag=` sites and all three slot sites, with `tag=` swept to zero demo-wide in one commit. If the pairing recurs, it belongs in **glass-ui** as a `WatercolorDotButton` — never a new `demo/shared/` wrapper (edicts 3, 4). |
| **Selection state held as a private copy of library rows** | C-15, C-6, C-10, C-17, C-19 | key selection by slug in a `Set`; **derive** operands `computed(() => savedPalettes.filter(p => set.has(p.slug)))`; move the bounds and the non-empty guard into the reducer. |
| **Consumer re-implements a producer's state** | C-5 (as corrected by R-1/R-2), C-8, C-11, C-12, C-18 | take `PaletteCard`'s existing `@click` + a first-class `:selected` prop; pass `SegmentedTabs`' `ariaLabel`; drop `:css-color`; import glass-ui by subpath. |
| **The measurement apparatus does not run — and now misreports** | C-2, C-2′, C-3 | fix the dock stability defect, wire the five Playwright projects into `ci.yml` as hard steps, and add the repo's first component-mount Vitest test. |
| **Contrivance with negative payoff** | C-14, C-9 | delete both; mint identity at birth on `SelectedColor`. |

---

## Strongest defect

**C-1.** The Mix workbench's default mode has been non-functional on `main` since `f2c8f565`
(2026-07-17): no colour can be added by mouse, touch, keyboard or assistive technology, because both
`addColor` emitters still speak the Glass-5 `WatercolorDot` API that Glass 7 removed — proven this
round by a *forced* click that changed nothing (`SOURCES-AFTER-FORCE-CLICK 0`), by the e2e suite's own
locator resolving to zero, and by the shipped Safari capture's `+`-less ghost slot. It shipped because
the one gate that tests it is not wired into CI, and the gates that are wired cannot see a prop or
slot removal. **New this round:** that gate no longer even names the defect — it now dies earlier, at
the dock (C-2′) — so wiring CI without first curing the dock would substitute one silence for another.
