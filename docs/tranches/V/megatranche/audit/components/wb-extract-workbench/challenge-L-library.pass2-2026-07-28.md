# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractWorkbench.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat was
explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/extract/ExtractWorkbench.vue` (294 lines incl. trailing newline; `wc -l` → 293).
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface.

**This is pass 2.** Pass 1 (2026-07-27) is preserved verbatim at
`challenge-L-library.pass1-2026-07-27.md`. It is a strong report and it found a **live BLOCKER I did
not reach** (the `<KeepAlive>` camera-stream leak). This file is the canonical record: it carries
pass 1's findings forward with re-verification status, adds six findings pass 1 did not reach, and
issues **one correction** to a pass-1 conclusion that my measurement contradicts.

**Verdict: DEFECTIVE.** 1 BLOCKER · 8 MAJOR · 8 MINOR.

---

## 0 · Pass-1 carry-forward

I independently re-verified four of pass 1's load-bearing claims. All four hold.

| pass-1 § | finding | re-verified this pass | status |
|---|---|---|---|
| L-1 | `onBeforeUnmount(stopCamera)` is dead under `<KeepAlive>`; the camera survives navigation | `demo/shell/PaneSlot.vue:120` `<KeepAlive :max="max">` · `demo/color-picker/App.vue:107` `:max="6"` · `grep -rn "onDeactivated" demo/` → **0 hits** (only 2 `onActivated`, both `HeroBlob.vue`) | **CONFIRMED — BLOCKER stands** |
| L-3 | `useExtractSession` bypasses `LIBRARY_PORT_KEY` into the raw store | `useExtractSession.ts:41` `usePaletteStore()` vs `MixPane.vue:43,45` / `GeneratePane.vue:19` all `pm.createPalette` | **CONFIRMED** |
| L-4 | `ShadowPalette` is owned by `palettes/browser` but has one consumer, in `workbenches/extract` | sole render site `ExtractWorkbench.vue:159`; exported at `palettes/browser/card/index.ts:7` + `palettes/browser/index.ts:22` | **CONFIRMED** |
| L-14 | extract is the only defaulted `CSS_COLOR_KEY` inject | 9 inject sites: 8 use `inject(CSS_COLOR_KEY)!`, only `ExtractWorkbench.vue:218` uses `inject(CSS_COLOR_KEY, undefined)` | **CONFIRMED** |

Pass-1 §L-2 (camera dual path), §L-5 (dead eslint law), §L-7 (`DisplayColorSpace` ×4), §L-8
(`dominantColor` surface), §L-9/L-10 (tsconfig `paths` drift + self-install), §L-11 (`.plate-ink` ×5),
§L-12 (`EmptyState` duplication), §L-13 (`PaletteCard` god component + forged entity), §L-15 (ref
idioms) I reached independently and concur with. Where this pass adds a **measurement** to a pass-1
assertion, it is called out below.

---

## 1 · NEW — findings pass 1 did not reach

### N-1 · MAJOR · The dead `split` arm has already killed a *foreign feature's public API*

Pass 1 (§L-6) correctly found `layout="split"` dead and prescribed "delete the prop; `PaletteCard`
gets `layout="default"` literally". It stopped one hop short. **That hop is the finding.**

**Provenance.** The `split` arm did not rot on its own — a legacy sweep orphaned it, 18 days ago:

```
$ git log --oneline -S 'layout="split"' -- demo/
95993197 refactor(T.W0 · lane t-legacy-sweep): W0-3 excisions — the dead named set + CC-6 orphan removed, code grep-zero
65ba2c65 feat(R.W4 Lane E · extract + input): T19 dominance surfaced end-to-end + T20 dup-shell collapse …
```

`95993197` (2026-07-10) deleted the only caller:

```
--- a/demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue
+++ /dev/null
-        <ExtractWorkbench
-            class="pb-4"
-            layout="split"
```

Its own commit body records the cascade it followed and where it stopped: *"Its child
ExtractWorkbench stays live via ExtractPane."* It verified its **own** deletions were grep-zero. It
did not re-derive reachability of the surviving producer's conditional arms.

**The cascade it missed.** `ExtractWorkbench.vue:148` is:

```vue
:layout="layout === 'split' && isWide ? 'aside' : 'default'"
```

```
$ grep -rn "<PaletteCard" -A 8 demo/ | grep "layout"
demo/workbenches/extract/ExtractWorkbench.vue-148-  :layout="layout === 'split' && isWide ? 'aside' : 'default'"
```

That is the **only** `layout` binding to `PaletteCard` in the entire demo, and `PaletteCard.vue:198`
defaults the prop to `"default"`. With `split` unreachable, the expression is a constant.

Therefore `PaletteCard`'s entire `aside` implementation — `PaletteCard.vue:20`, `:35`, `:36`, `:39`,
`:40`, and the prop declaration `:192-193` — is **dead public API on the `palettes/browser/card`
barrel seam**, kept nominally alive by a dead branch in a *different feature*.

**Live confirmation** (`http://localhost:9000`, Playwright `browser_evaluate`, three routes):

```json
{ "splitGrid": 0, "asideCards": 0 }
```

`.sm\:grid-cols-2` inside the pane: 0. `.rounded-l-card` (the `aside` marker, `PaletteCard.vue:36`):
0 — on `/#/extract`, `/#/mix` and `/#/`.

**Mechanism.** Dead-branch cascade across a feature boundary. Dead code did not merely accumulate —
it *migrated* and became dead **API**, which is strictly worse: it is now surface a future consumer
could reasonably build on.

**Cure.** Pass 1's cure (delete the prop, `isWide`, `useBreakpoint`) **plus**: delete `PaletteCard`'s
`aside` arm and its prop declaration. The seam shrinks by one option.

---

### N-2 · MAJOR · Measured: 77% of the runtime module closure is foreign, and an offline quantizer reaches the HTTP transport client

Pass 1 §L-13 diagnosed the `PaletteCard` contract correctly (11 props / 17 emits, 4 bound, one a
no-op). Nobody measured what that contract *costs*.

**Measurement.** Runtime import closure rooted at `ExtractWorkbench.vue`, with `import type` /
inline-`type` edges excluded (they are erased under `verbatimModuleSyntax`, so counting them
overstates by 16 modules — my own first run made that error and is corrected here):

```
ExtractWorkbench RUNTIME demo-module closure: 47
  inside demo/workbenches/extract : 11
  outside                          : 36
```

Among the 36:

```
demo/platform/transport/useApiClient.ts        ← the HTTP client
demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue
demo/palettes/browser/card/CurrentPaletteEditor.vue
demo/palettes/browser/card/PaletteCardGrid.vue
demo/palettes/browser/card/SwatchHoverMenu.vue
demo/palettes/browser/status/ApiOfflineChip.vue
demo/shared/ui/EmptyState.vue
demo/ui/{badge,button,dropdown-menu,input,popover,skeleton,slider,tooltip}/index.ts
```

`demo/platform/transport/useApiClient.ts` is a **runtime** edge, entering at
`PaletteCardMenu.vue:179`. An image quantizer that never touches the network transitively loads the
API client because the card it borrows carries an owner/admin menu.

**The cost is the wrong component, not a coarse barrel.** Splitting it:

```
barrel closure (card/index.ts, 6 symbols): 34
the 3 symbols actually imported          : 25
modules pulled ONLY by the other 3       :  9
```

So barrel over-reach costs 9 modules; `PaletteCard` itself costs 25. This sharpens pass-1 §L-13's
cure: the repair is the `PaletteSpecimen` split it proposed, **not** a narrower barrel.

*Caveat, stated so no seat mistakes it for a bundle measurement.* This is the static runtime graph —
exactly what the Vite dev server loads. `card/index.ts:2-3` uses named re-exports specifically so
rolldown can tree-shake, so the production chunk may carry less. I could not verify: `dist/gh-pages/`
holds 2 JS assets and is stale. The **contract** half (17 emits, 3 used, 1 no-op, a forged entity) is
bundler-independent.

---

### N-3 · MAJOR · `demo/ui/` is 19 pure pass-through barrels, and this one feature uses both routes at once

Not covered by pass 1.

```
$ for d in demo/ui/*/; do cat $d/index.ts; done
demo/ui/slider/index.ts    export { Slider } from "@mkbabb/glass-ui";
demo/ui/card/index.ts      export { Card, CardHeader, … } from "@mkbabb/glass-ui";
demo/ui/button/index.ts    export { Button } from "@mkbabb/glass-ui";
demo/ui/input/index.ts     export { Input } from "@mkbabb/glass-ui/forms";
…19 directories, every one a pass-through
```

This three-file feature uses **both** routes simultaneously:

```
ExtractWorkbench.vue:187   import { DockControl }   from "@mkbabb/glass-ui/dock";   ← direct, narrow subpath
ExtractWorkbench.vue:188   import { useBreakpoint } from "@mkbabb/glass-ui/dom";    ← direct, narrow subpath
ExtractControls.vue:99     import { Slider }        from "../../ui/slider";         ← alias hop → root barrel
ExtractPane.vue:24         import { Card }          from "../../ui/card";           ← alias hop → root barrel
```

The hop also *widens* the specifier: `demo/ui/*` reaches `@mkbabb/glass-ui` (the **root** barrel)
while glass-ui 7.0.0 publishes narrow subpaths — `./slider`, `./card`, `./badge`, `./button`,
`./tooltip` all exist (73 export keys, read from `node_modules/@mkbabb/glass-ui/package.json`).

Edict 2 (no aliases / dual paths) and edict 3 (KISS — no wrapper indirection). **The precedent for
the cure is already in this repo's history** — the same commit as N-1, `95993197` F3:

> *"`dark-mode-toggle/` — a 2-line re-export folder. **DISSOLVED**: the 4 consumers repoint DIRECTLY
> at `@mkbabb/glass-ui/controls` … Folder deleted."*

The rule was applied to one folder and not to the other nineteen.

**Cure.** Dissolve `demo/ui/`; repoint consumers at glass-ui subpaths. `demo/ui/alert/index.ts`
carries real historical prose (the B.W2 de-duplication record) — preserve it in `demo/DESIGN.md`, not
as a folder.

---

### N-4 · MINOR · Dead scoped CSS, forked from a rule another feature deliberately owns unscoped

Not covered by pass 1.

```
demo/workbenches/extract/ExtractControls.vue:139-142
    /* Touch gate styling for extract sliders */
    .touch-gate-target { border-radius: var(--radius-pill); }
```

`touch-gate-target` appears **nowhere** in `ExtractControls.vue`'s template. Its real consumers are
in another feature:

```
demo/picker/controls/ComponentSliders/ComponentSliders.vue:58   'touch-gate-target flex-1 min-w-0'
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:11       '… touch-gate-target'
demo/picker/controls/ComponentSliders/ComponentSliders.vue:253  .touch-gate-target { … }   ← UNSCOPED, deliberately
```

`ComponentSliders.vue:245-253` documents *why* its block is unscoped. A `<style scoped>` block cannot
reach another component's subtree, so the extract copy styles nothing. It is a stranded fork of a
rule that already has a considered home.

**Cure.** Delete `ExtractControls.vue:139-142`.

---

### N-5 · MINOR · `ExtractPane` should not exist

The pane/workbench split exists solely because there were once two shells — `useExtractSession.ts:4-6`
says so: *"The former ExtractPane ↔ ImagePaletteExtractor twins … **both shells** now consume this
session through ExtractWorkbench."* `95993197` deleted the second shell (N-1).

What remains is `ExtractPane.vue` — 37 lines that mount a `Card`, a `PaneHeader`, and forward two
events — plus a redundant local `DisplayColorSpace` (`:30`) and a redundant `colorSpace` prop hop.
Two files, one screen, one consumer each.

This compounds pass-1 §L-14: the pane injects `COLOR_TARGET_PORT_KEY` while the workbench injects
`CSS_COLOR_KEY` at the leaf — two levels of a two-file feature reaching two different injection
surfaces, because there are two levels for no reason.

**Cure.** Fold `ExtractPane.vue` into `ExtractWorkbench.vue`. One file, one injection site, and
pass-1 §L-14's cure (`inject(CSS_COLOR_KEY)!`, matching Mix/Generate/Gradient) applies at that one
site.

---

### N-6 · MINOR · The import-boundary law's coverage, quantified

Pass 1 §L-5 established that `no-restricted-imports` is off for this file. The scale is worth
recording, because it determines how much of the demo a repair must cover:

```
$ npx eslint --print-config demo/workbenches/extract/ExtractWorkbench.vue   → no-restricted-imports: undefined
$ npx eslint --print-config demo/palettes/usePaletteStore.ts               → no-restricted-imports: undefined
$ npx eslint --print-config demo/color-picker/App.vue                      → [2,{patterns:[{group:["@components/custom/palette-browser/**/*.vue"]…}]}]
$ npx eslint --print-config src/color/model.ts                             → [2,{patterns:[{group:["@mkbabb/glass-ui","@mkbabb/glass-ui/*"]…}]}]

$ find demo/color-picker -name '*.ts' -o -name '*.vue' | wc -l   →   16
$ find demo -name '*.ts' -o -name '*.vue' | wc -l                →  250
$ find demo -path 'demo/@*' | wc -l                              →    0
```

- G-DEMO-1 + G-DEMO-3a (`eslint.config.js:258-303`) are globbed at `demo/@/composables/**` — they
  match **zero files**. The whole object is inert.
- G-DEMO-3b covers **16 of 250** demo files (6.4%), and its ban pattern
  `@components/custom/palette-browser/**/*.vue` targets an alias killed at W43/RF-15
  (`vite.config.ts:70-77`, `tsconfig.demo.json:33-35`). No specifier in the tree can match it. The
  rule is unfalsifiable even over the 16 files it does reach.
- `inv-K-1` over `src/**` is the only structural boundary in this repo that actually fires.

`demo/workbenches/**` — where the subject lives — has never been governed by an import boundary at
all. This makes pass-1 §L-5's "highest-leverage repair" assessment correct and gives it a number.

---

## 2 · Measurement added to a pass-1 assertion

### M-1 · `dominantColor` (pass-1 §L-8) — the claim is right; here is the quantity

Pass 1 asserted that because `src/quantize.ts:127` already sorts population-descending, the demo's
22-line re-derivation (`useExtractSession.ts:120-141`) has *"only the chroma tiebreak"* as live
behaviour. I measured it rather than reasoning about it.

`scratchpad/dom.mjs` — 400 synthetic 24×24 images against the **built** `dist/subpaths/quantize.js`,
k ∈ [1,16], chromaWeight ∈ [0,1.5], running the demo's dominance loop verbatim beside `value[0]`:

```
trials=400  first-place ties=9  demoDominant !== value[0] : 4
```

The sorted-descending invariant held in 400/400. So:

- pass 1 is **correct**: the `population >` branch is unreachable; only the tiebreak is live.
- the tiebreak changes the answer in **4 of 400** trials (1%), and only on **exact integer population
  ties** — 9 of 400 here on 576-pixel synthetic noise, and rarer still on real photographs.

Twenty-two lines of duplicated ordering logic exist to alter a measure-near-zero case, while the
concept "the dominant color" has **three** homes: `src/quantize.ts:127` (the sort),
`src/quantize.ts:132-139` (`dominantColor`, hardcoded `k: 5`, zero production consumers), and the
demo loop. This strengthens rather than softens pass-1 §L-8's cure — move the tiebreak into the
library comparator and the demo loop collapses to `palette[0]`.

---

## 3 · Correction to pass 1

### C-1 · The `/#/extract` nameless buttons are a **local divergence**, not a glass-ui root defect

Pass 1's appendix concluded:

> *"the structural half is that `DockControl` carries only `title=` at all four extract call sites,
> and the accessible-name default belongs in glass-ui's `DockControl` root (edict 4/5), not as four
> per-instance `aria-label` patches."*

**That prescription is wrong, and the measurement says so.** Live, `http://localhost:9000`:

`/#/extract` — the three nameless buttons, all `.dock-icon-button`, all 41×41:

```json
[ { "title": "Upload image", "ariaLabel": null },
  { "title": "Open camera",  "ariaLabel": null },
  { "title": "Reset",        "ariaLabel": null } ]
```

`/#/mix` and `/#/` — every `DockControl` in the app:

```json
[ {"title":null,"ariaLabel":"Save edit"},        {"title":null,"ariaLabel":"Cancel edit"},
  {"title":null,"ariaLabel":"Switch to slug"},   {"title":null,"ariaLabel":"Generate new slug"},
  {"title":null,"ariaLabel":"Cancel"},           {"title":null,"ariaLabel":"Back"},
  {"title":null,"ariaLabel":"Open color input"}, {"title":null,"ariaLabel":"Toggle action bar"} ]
```

**Every other `DockControl` in the application carries `aria-label` and none carries `title`.**
`ExtractControls.vue:41`, `:50`, `:85` are the sole divergence from an idiom the rest of the app
already follows — and the same file uses `aria-label` correctly on both its `Slider`s (`:25`, `:69`).

glass-ui is behaving correctly: it forwards whatever attribute the consumer supplies. Pushing a
`title`→`aria-label` fallback into `DockControl` would install a **masking fallback** in the design
system (edict 2) to accommodate one file's deviation, and would silently paper over the same mistake
everywhere in the constellation.

**Corrected cure.** Add `aria-label` to the three `DockControl`s in `ExtractControls.vue`; keep
`title` as the tooltip. No glass-ui change. No BH relay needed for this item.

*(Pass 1 also reported 4 nameless buttons including "Capture frame". That one is inside
`v-if="cameraActive"` (`ExtractWorkbench.vue:34-59`) and is not in the DOM at rest — which is why
`REPORT.json` records 3, not 4, in all four Safari matrices. Pass 1's own parenthetical noted the
discrepancy; this resolves it.)*

---

## 4 · The public surface — stated plainly, because it is the one thing that is right

Every value.js reach in the extract subtree goes through a published subpath:

```
ExtractWorkbench.vue:189                      @mkbabb/value.js/color      (import type SpaceId)
composables/useExtractSession.ts:14,15        @mkbabb/value.js/quantize, /css
composables/useImageQuantize.ts:9             @mkbabb/value.js/quantize
quantize-worker.ts:6,7                        @mkbabb/value.js/quantize
ImageEyedropper/composables/useImageSampler.ts:12,13   /color, /css
```

Zero `@src/*`, zero `../../src/*`, zero `dist/*`. `/color`, `/css` and `/quantize` are all real keys
in `package.json#exports`. **A real consumer could write every one of these lines.** The T.W1
dogfood keystone holds in this subtree.

The rot is in the machinery *around* the surface, not the surface: pass-1 §L-9 (`tsconfig.demo.json`
`paths` naming `parsing`/`units`, which do not exist, while omitting `css`/`value`, which do) and
§L-10 (a real installed `node_modules/@mkbabb/value.js@4.0.0`). I re-verified both:

```
dist/index.d.ts             MISSING      dist/subpaths/css.d.ts     EXISTS
dist/subpaths/parsing.d.ts  MISSING      dist/subpaths/value.d.ts   EXISTS
dist/subpaths/units.d.ts    MISSING
```

and traced resolution with the demo's exact `paths` on an in-package probe:

```
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

— i.e. by **package self-reference through `package.json#exports`**, not through `paths`. Pass 1's
cure (delete the seven `@mkbabb/value.js*` `paths` entries and let self-reference do it) is right.

One refinement to pass-1 §L-10's severity: I compared the two copies' *exported symbol sets*, not
just their bytes. `css.d.ts` differs in size (12490 vs 10910) but the difference is a `rollupTypes`
`_2`-suffix dedup artifact — **the exported symbol sets are identical**, and `quantize.js` is
byte-identical. So the stale self-install is a **latent** hazard with a confirmed mechanism, not a
live divergence. It should still be removed; it is not currently breaking anything.

---

## 5 · Consolidated findings table

| id | severity | finding | source |
|---|---|---|---|
| **B-1** | **BLOCKER** | camera `MediaStream` outlives the view — `onBeforeUnmount` never fires under `<KeepAlive>`; worker + debounce timer bind to the same dead hook | pass 1 §L-1, re-verified |
| N-1 | MAJOR | dead `split` arm has killed `PaletteCard`'s `aside` layout — dead API on a foreign seam | **new** |
| N-2 | MAJOR | 36 of 47 runtime modules foreign; `useApiClient` reached by an offline quantizer | **new (measured)** |
| N-3 | MAJOR | `demo/ui/` = 19 pass-through barrels; both routes to glass-ui alive in one feature | **new** |
| — | MAJOR | camera implemented twice; the complete composable copy is dead | pass 1 §L-2 |
| — | MAJOR | `useExtractSession` bypasses `LIBRARY_PORT_KEY` into the raw store | pass 1 §L-3, re-verified |
| — | MAJOR | `ShadowPalette` owned by the wrong feature (1 consumer, foreign) | pass 1 §L-4, re-verified |
| — | MAJOR | demo import-boundary law dead — quantified at 16/250 files, unmatchable pattern | pass 1 §L-5 + **N-6** |
| — | MAJOR | published `./quantize` surface wrong: `dominantColor` zero-consumer, sort invariant untyped | pass 1 §L-8 + **M-1** |
| N-4 | MINOR | dead scoped `.touch-gate-target`, forked from `ComponentSliders`' unscoped rule | **new** |
| N-5 | MINOR | `ExtractPane` is a 37-line shell for a component with one consumer | **new** |
| — | MINOR | `DisplayColorSpace` ×4; canonical home unused by this subtree | pass 1 §L-7 |
| — | MINOR | `tsconfig.demo.json#paths` drifted; 3 phantom keys, 2 real subpaths omitted | pass 1 §L-9 |
| — | MINOR | repo installs a stale copy of itself (latent, not live — see §4) | pass 1 §L-10 |
| — | MINOR | `.plate-ink` copy-pasted into 5 scoped stylesheets, 3 in this subtree | pass 1 §L-11 |
| — | MINOR | empty caption re-implements `EmptyState`, whose `dots={false}` was built for it | pass 1 §L-12 |
| — | MINOR | `PaletteCard` god component; a persistence record forged to feed it | pass 1 §L-13 + **N-2** |
| — | MINOR | only defaulted `CSS_COLOR_KEY` inject + `?? ''` mask degrading certified ink | pass 1 §L-14, re-verified |
| — | MINOR | two template-ref idioms on adjacent lines (`:222` / `:223`) | pass 1 §L-15 |
| **C-1** | correction | nameless buttons are a local divergence, **not** a glass-ui root defect | **corrects pass 1** |

---

## 6 · The lattice, greenfield

Pass 1's lattice is sound. Three amendments from this pass:

```
demo/platform/media/                    ← NEW sibling of auth/ storage/ transport/
    useCameraCapture.ts                   open · close · captureFrame(video) → File   (pass1 L-2)
    imageToPixels.ts

demo/shell/usePaneLifecycle.ts          ← onPaneRelease = onDeactivated + onBeforeUnmount  (pass1 L-1)

demo/imaging/                           ← clean lower layer, pixel domain, zero feature deps
    quantize/{worker.ts, useImageQuantize.ts}     camera + canvas variants DELETED
    sample/{useImageSampler.ts, useLoupeCanvas.ts}
    (useInertiaGesture → glass-ui/dom, beside useDragVelocity — edict 4)

demo/palettes/
    index.ts                            ← NEW top-level seam (today only browser/ has one)
    browser/card/
        PaletteSpecimen.vue             ← NEW: { colors: readonly PaletteColor[], name? }.  (pass1 L-13)
                                          No id, no slug, no timestamps, no menu, no transport.
        PaletteCard.vue                 ← composes PaletteSpecimen + identity + menu + transport.
                                          `aside` layout DELETED.                          (AMENDMENT — N-1)
        ShadowPalette.vue               → MOVED OUT to workbenches/extract/                (pass1 L-4)

demo/workbenches/extract/               ← thin UI. No device APIs, no persistence, no forged entities.
    ExtractWorkbench.vue                  ~150 lines. ExtractPane FOLDED IN.                (AMENDMENT — N-5)
                                          One layout. No <style>. Injects CSS_COLOR_KEY + ports here.
    ExtractControls.vue                   aria-label ×3; Slider from @mkbabb/glass-ui/slider;
                                          dead .touch-gate-target deleted.        (AMENDMENTS — C-1, N-3, N-4)
    ImageDropZone.vue                     owns its own <input type=file>; no defineExpose handshake
    ShadowPalette.vue                     ← moved home
    ImageEyedropper/
    composables/useExtractSession.ts      persistence INJECTED, not imported;    (pass1 L-3)
                                          dominant = palette[0]                  (M-1)

src/quantize.ts                         ← chroma tiebreak moves INTO the sort comparator;
                                          dominantColor retired or given QuantizeOptions   (pass1 L-8 + M-1)

eslint.config.js                        ← boundary globs re-aimed at the physical tree      (pass1 L-5, N-6)
tsconfig.demo.json                      ← the 7 @mkbabb/value.js* paths entries DELETED     (pass1 L-9)
demo/ui/                                ← DELETED — 19 pass-through barrels                 (N-3)
```

**Ordering by leverage** (amending pass 1's): **pass-1 §L-5 / N-6 first** — turn the boundary law
back on; it is what prevents every other finding from recurring, and N-1 is the proof that an
unenforced boundary lets dead code migrate into a neighbour's public API. Then **B-1 + pass-1 §L-2**
(the confirmed leak and its structural cause). Then **N-1 + N-2** (both are seam damage that grows
while unaddressed). Then **pass-1 §L-8 + M-1**, which changes a *shipped* API and wants its own
major-version wave. The remainder is mechanical.

---

## 7 · What I could not measure

- **Production chunk composition.** N-2's 47/36 is the static runtime graph — what the dev server
  loads. `dist/gh-pages/assets/` holds 2 JS files and is stale; I did not run `npm run gh-pages`.
  The contract half of N-2 is bundler-independent.
- **Whether the frozen `node_modules/@mkbabb/value.js@4.0.0` ever wins a resolution.** I proved
  `/css` and `/quantize` land on the repo's `dist/` and that both copies export identical symbol
  sets. That some nested specifier reaches the frozen copy is **a hypothesis, not a finding**.
- **A `?probe=1` self-navigation.** During browser probing the app twice navigated itself from
  `/#/extract` to `/#/`, and once to `http://localhost:9000/?probe=1#/`, destroying the JS context
  mid-evaluate. That is boot / ink-probe behaviour outside this component and outside this seat's
  axis; flagged for whichever seat owns boot.

---

## 8 · Reproduction index (this pass)

```
git log --oneline -S 'layout="split"' -- demo/                    → 95993197 deleted the only caller (N-1)
grep -rn "<PaletteCard" -A 8 demo/ | grep layout                  → ExtractWorkbench.vue:148 is the ONLY binding (N-1)
live: {"splitGrid":0,"asideCards":0} on /#/extract,/#/mix,/#/     → aside never renders (N-1)
node scratchpad/c3.mjs   (runtime closure, import-type excluded)  → 47 / 11 / 36; barrel 34, used-3 25 (N-2)
for d in demo/ui/*/; do cat $d/index.ts; done                     → 19 pass-through barrels (N-3)
grep -rn "touch-gate-target" demo/                                → ExtractControls has the rule, never the class (N-4)
npx eslint --print-config demo/workbenches/extract/…              → undefined; 16/250 files covered (N-6)
node scratchpad/dom.mjs                                           → trials=400 ties=9 disagreements=4 (M-1)
live DockControl audit on /#/extract vs /#/mix, /#/               → 3 title-only here, 8 aria-label there (C-1)
grep -rn "onDeactivated" demo/                                    → 0 hits (B-1 re-verify)
grep -n "KeepAlive" demo/shell/PaneSlot.vue                       → :120  ·  App.vue:107 :max="6" (B-1 re-verify)
grep -rn "createPalette" demo/                                    → extract = sole raw-store caller (pass1 L-3 re-verify)
grep -rn "\bShadowPalette\b" demo/                                → 1 render consumer, foreign (pass1 L-4 re-verify)
grep -rn "inject(CSS_COLOR_KEY" demo/                             → 8 asserted, 1 defaulted (pass1 L-14 re-verify)
```

Scratchpad probes:
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/{dom.mjs,c3.mjs}`
