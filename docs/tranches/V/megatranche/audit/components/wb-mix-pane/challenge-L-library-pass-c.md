# CHALLENGE-L — library structure under `demo/workbenches/mix/MixPane.vue`

> **This file is the consolidated CHALLENGE-L record (pass C).**
> Two prior CHALLENGE-L seats ran this component. Both are **preserved verbatim, byte-identical**:
> - pass A — `challenge-L-library-pass-a.md` (sha1 `7e422be6…`, 39 471 bytes; read at `32b4040e`; F-1…F-17)
> - pass B — `challenge-L-library-pass-b.md` (sha1 `aee5d9d2…`, 30 860 bytes; read at `c654824e`; B-1…B-5)
>
> Nothing in either was altered or discarded. This file carries **pass C**: an independent third
> audit at `c654824e` under standing edict E-1, recording only what A and B did not have. Pass C
> contributes **one BLOCKER neither pass found**, a hard upgrade of pass B's B-1 from latent to
> always-taken, one new MAJOR, two MINORs, one correction to a pass-A factual claim, one correction
> to pass B's N-B5, and new artifact evidence that settles pass B's N-B1.
>
> Read pass A for F-1…F-17, pass B for B-1…B-5, this file for C-1…C-6 and the merged index.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
explicitly declared at spawn. The seat is declared, not inherited.

## Scope + method

Subject: `demo/workbenches/mix/MixPane.vue` (123 lines, `wc -l`) and the module lattice beneath it.
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.

Method, deliberately disjoint from A and B: both prior passes audited the **source**. Pass C audited
the **rendered artifact** — I drove the live dev server on :9000 read-only with Playwright (9
evaluations, 1 real click attempt), read the Vue vnode props of the elements this component renders,
and compared the demo's call sites against glass-ui 7.0.0's **published `.d.ts` prop declarations**.
That is the one boundary neither prior pass crossed, and it is where the blocker was. Supporting
work: byte diffs of `dist/` against the installed tarball, a transitive ESM module-graph
measurement, a grep census of the shipped `dist/gh-pages` bundle, and a test-home census.

**No source was edited. No file outside `…/wb-mix-pane/` was written.**

---

## Verdict

**DEFECTIVE — and the severity ceiling rises.** Passes A and B both topped out at MAJOR. Pass C
finds a **BLOCKER**: the Mix workbench's colors mode has **no working way to add a color**, on the
live dev server, at every viewport, and has not had one since glass-ui 7.0.0 was adopted. Both
prior passes read the same screenshot and certified the render correct — because a dead control that
looks right passes every gate this repository owns, including a careful human-grade read of a
screenshot.

---

# Pass C findings — the delta

## C-1 · BLOCKER · NEW — the demo speaks a `WatercolorDot` prop contract glass-ui 7.0.0 does not implement; both colors-mode add paths are dead

**The published API.** `node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`
declares exactly six props:

```ts
type __VLS_Props = {
    color: string;
    variant?: "solid" | "ghost";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
};
```

No `tag`. The component's own doc comment describes it as *"an organic pastel blob swatch"* — a
**decorative** primitive.

**The demo's call site.** `demo/workbenches/mix/MixSourceSelector.vue:163-176`:

```html
<WatercolorDot
    key="__add__"
    :color="cssColorOpaque ?? 'var(--muted-foreground)'"
    variant="ghost"
    tag="button"                                   ← not a prop
    seed="mix-add-slot"
    class="add-slot-ghost w-11 h-11 …"
    aria-label="Add current color to the mix"      ← discarded
    :disabled="!canAddColor || undefined"          ← discarded
    @click="addCurrentColor"                       ← discarded
>
```

**The live DOM.** `http://localhost:9000/#/mix`, viewport 390×844, `document.querySelector('.add-slot-ghost')`:

```json
{ "vnodeProps": ["aria-hidden","class","data-testid","data-variant","style"],
  "hasOnClickProp": false,
  "tag": "SPAN", "aria": null, "role": null,
  "pointerEventsSelf": "none" }
```

document-wide:

```json
{ "ariaLabelAnywhere": 0, "elementsWithTagAttr": 0 }
```

rendered markup:

```html
<div class="swatch-row flex items-center gap-2.5 flex-wrap">
  <span aria-hidden="true" class="add-slot-ghost … watercolor-swatch"
        data-testid="watercolor-swatch" data-variant="ghost"
        style="border-radius:…; pointer-events: none; --watercolor-color: oklch(56.84% 0.0657 28.61deg);">
    <svg class="watercolor-filter-host" aria-hidden="true" focusable="false">…</svg>
  </span>
</div>
```

Every consumer attribute and listener is gone. `pointer-events: none` and `aria-hidden="true"` are
set by **glass-ui**, inline. The `--watercolor-color` custom property proves the `color` prop *did*
arrive, so `addCurrentColor`'s `if (cssColorOpaque)` guard (`MixSourceSelector.vue:69-73`) is **not**
the cause.

**Reproduction (three independent confirmations).**

1. Real Playwright click on `.add-slot-ghost` → **TimeoutError after 5 s**, log:
   `<div class="swatch-row …"> intercepts pointer events`, retried 14×. Not hit-testable at its own
   centre, because glass-ui set `pointer-events: none` on it.
2. Two programmatic `el.click()` calls — which bypass hit-testing entirely — plus 450 ms settle →
   `document.querySelectorAll('[data-mix-source]').length === 0`. No color added. The listener was
   never attached (`hasOnClickProp: false` on the vnode).
3. `document.querySelectorAll('[aria-label="Add current color to the mix"]').length === 0`
   document-wide. There is no such control in the accessibility tree at all.

**Blast radius inside this component.** The *other* colors-mode add path is the identical pattern —
`MixSourceSelector.vue:211-221`, `<WatercolorDot … tag="button" :aria-label="\`Add color …\`"
@click="emit('addColor', …)" />`. Both are dead, so **colors mode cannot be used**. Palettes mode
survives because `MixSourceSelector.vue:245-263` uses a real
`<button type="button" :aria-pressed … @click="togglePalette">` — the one place the file's own
a11y comment (*"native `<button>` for keyboard reach"*) was actually honoured. That surviving line
is also the correct idiom and the cure.

**Blast radius repo-wide** — 12 files, ~25 `tag=` sites:

```
$ grep -rc 'tag="' $(grep -rl "WatercolorDot" demo --include='*.vue')
MixSourceSelector.vue:4  MixResultDisplay.vue:4  CurrentPaletteEditor.vue:4  EmptyState.vue:3
Dock.vue:3  GenerateControls.vue:2  SwatchHoverMenu.vue:2  ConsoleRail.vue:1
ImageEyedropper.vue:1  ColorSpaceSelector.vue:1  ComponentSliders.vue:0  SpectrumCanvas.vue:0
```

`tag="button"` also appears in `SwatchHoverMenu.vue` (×2), `GenerateControls.vue`, and
`CurrentPaletteEditor.vue` — four more presumed-dead controls outside this component, which the
per-component seats for those files should verify by the same method.

**Why every gate missed it.** Vue routes unknown props to fallthrough attrs and `vue-tsc` does not
reject extra attributes on a component tag. `npx eslint` over the four Mix SFCs: **0 problems**. No
unit test names any Mix component (`grep -rln "useMixingState\|MixPane\|MixResultDisplay\|
MixSourceSelector\|MixConfigBar" test/ demo/test/` → no matches). The one e2e that touches it,
`e2e/smoke/oracles/o15-dock-register.spec.ts:53`, selects
`getByRole("button", { name: "Add current color to the mix" })` — a role/name pair with **zero DOM
matches**, so that oracle can only be failing or unrun.

**Correction to pass B's N-B5.** Pass B read
`shots/safari-desktop-light/mix.png` and certified: *"the 'Selected' well showing its dashed ghost
drop target… and a correctly-disabled Mix button at zero selection."* The dashed ghost is not a
drop-target affordance rendering correctly at rest — it is the **dead add-button**, and the Mix
button is disabled at zero selection because zero selection is the only state reachable. The
screenshot is evidence of the defect, read as evidence of health. I record this as the general
lesson for the visual-audit lane: a screenshot proves layout, never reachability.

**Mechanism.** Wrong direction of dependency at a package boundary. The demo needed an *interactive*
swatch and invented one by prop-guessing against a *decorative* primitive, rather than asking the
design system for the affordance (edict 4). This is unswept W44 "Glass 7.0.0 adopted whole" fallout:
that adoption swept imports, not prop contracts.

**Cure — two moves, in order.**

1. **Demo-side, now, with no new wrapper component (edict 3):** make the host the control and the dot
   the face — the idiom this very file already uses correctly at `:245-263` and at `:132-158` (the
   chip's remove `<button>` is a real sibling of the dot):

   ```html
   <button type="button" class="add-slot-ghost …" aria-label="Add current color to the mix"
           :disabled="!canAddColor" @click="addCurrentColor">
       <WatercolorDot :color="cssColorOpaque ?? 'var(--muted-foreground)'"
                      variant="ghost" seed="mix-add-slot" class="pointer-events-none" />
   </button>
   ```

2. **Relay to the glass-ui BH inbox (standing fond):** either declare `tag`/`as` on `WatercolorDot`
   as a real polymorphic root with attr + listener pass-through, or publish a
   `WatercolorSwatchButton`. Until glass-ui answers, (1) is the shipping shape. No demo-side wrapper.

3. **Structural gate so it cannot recur:** an eslint rule (or a `demo/test/` DOM test) asserting that
   every `@click` / `aria-label` in the demo lands on an element that exists in the rendered
   accessibility tree. The class of bug — *a prop contract that silently evaporates* — is invisible
   to `vue-tsc` by design and needs a runtime gate.

---

## C-2 · MAJOR · NEW — pass B's B-1 invented-geometry fallback is not latent; it is the **only** branch ever taken

Pass B's B-1 correctly identified `mixStage.ts:122-124` as a masking fallback:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

and filed it as a risk *"rather than returning null"*. Pass C measures that the guarded branch is
**unreachable**. `data-mix-target` is stamped as a fallthrough attribute on a `WatercolorDot` —
`MixResultDisplay.vue:64-72`:

```html
<WatercolorDot :color="wellColor" variant="ghost" tag="div" seed="mix-result"
               data-mix-target class="shrink-0" … />
```

and fallthrough attributes on `WatercolorDot` are discarded (C-1's vnode-props measurement: only
`aria-hidden, class, data-testid, data-variant, style` survive). Live:
`document.querySelectorAll('[data-mix-target]').length === 0`.

So `targetEl` is **always `null`**, and the convergence has always landed on invented coordinates —
`clientWidth/2`, `scrollHeight*0.7`, `r: 28` — not on the well. `MixPane.vue:63-66` states the
contract in prose (*"drops from the selected chips arc to the result plate's awaiting well"*) and
`MixResultDisplay.vue`'s header states it again (*"the silhouette the pigment poured into is the
silhouette the result wears"*). Structurally, the pigment has never poured into that silhouette.

The sources survive by luck and by inconsistency: `data-mix-source` sits on a plain wrapper `<div>`
for color chips (`MixSourceSelector.vue:127-133`) and on a real `<button>` for palette cards
(`:245-263`) — neither is a `WatercolorDot`. So B-1's JSON-through-the-DOM path is real, while the
*target* half of the same anchor system is simply absent. One anchor system, two homes, one of them
non-functional.

**Evidence:** `MixResultDisplay.vue:64-72`; `mixStage.ts:121-123`; live
`[data-mix-target].length === 0` with a Mix pane mounted; C-1's vnode-props measurement.
**Reproduction:** the DOM measurement above is the reproduction of the mechanism. The visual
consequence (drops landing on a guessed point) is downstream of C-1's cure and is a **HYPOTHESIS**
until colors mode can be populated again.

**Cure.** Upgrades pass B's B-1 cure rather than replacing it: move `data-mix-target` off the
`WatercolorDot` onto the well's own wrapper element (matching how `data-mix-source` is already
stamped), **and delete the `else` branch** — a missing anchor must make `collectStage` return `null`
and skip the narration. B-1's stronger transposition (pigment and element arrive as arguments;
geometry alone is measured) subsumes both and should be the landing shape.

---

## C-3 · MAJOR · NEW — the shell's pane-action channel is never bound in the mobile layout, so the Mix dock actions are structurally unreachable there

Pass A's F-9 and pass B's C-4 establish the `Ref<any>` + `?.()` masking on
`usePaneRouter.ts:107-111,219-222`. Neither pass traced the **binding site**. It is layout-conditional
and the mobile branch is missing.

`demo/color-picker/App.vue`:

- `:319` `const mixPaneRef = ref<any>(null);`
- `:331` `mixPaneRef.value = currentConfig.value.right === "mix" ? el : null;` — inside
  `onDesktopRightMount`, and it is the **only** assignment site in the file
- `:315` the comment says it plainly: *"Populated by the onMount callbacks on the **desktop** PaneSlots"*
- `:83-91` the **mobile** `<PaneSlot>` passes `:component`, `:component-key`, `:component-props`,
  `:transition-name`, `:max`, `appear`, `:on-appeared` — and **no `:on-mount`**. The desktop slots at
  `:105` and `:131` do pass it.
- `:39` `<Dock … :generic-action-bar="actionBar" />` lives in the root `<nav>`, **outside** the
  `isDesktop` branch — the action bar renders in both layouts.
- `PaneSlot.vue:52` declares `onMount?: (instance: any) => void` — optional, so omitting it is silent.

**Measured, live, 390×844, `/#/mix`:**

```json
{ "layout": "mobile", "paneSlots": 1, "hasMixHeader": true,
  "buttons": ["…","Clear","Mix","Copy result","Select view","Toggle action bar","Picker","Mix","Menu",…] }
```

The Mix pane is mounted through the mobile slot and the dock renders all three Tools actions, while
`mixPaneRef` has no assignment path in this layout. Every handler therefore evaluates
`null?.clearSelection?.()` — the `?.` swallows it, no error, no feedback.

**Reproduction:** the four measured facts above make the consequence deterministic. The end-to-end
button-press reproduction is **HYPOTHESIS**: I could not populate the pane to observe the no-op
because C-1 kills both colors-mode add paths, and a scripted Palettes-mode selection did not take
within my probe budget (`selected: 0`). The blocker blocks its own downstream verification.

**Why it matters for the cure.** Pass A's F-9 cure (provide/inject; actions flow up) is right, and
C-3 raises its priority from *type hygiene* to *shipped-behaviour correctness*: under the inversion
the binding cannot be layout-conditional, because the publisher is the mounted component itself.
`PaneActionRefs`, three `Ref<any>`, nine `?.` masks, `PaneSlot.onMount` and the desktop/mobile fork
all delete together. It also makes `disabled` honest — today all three Mix dock actions are enabled
at zero selection, because the shell cannot see `canMix`.

---

## C-4 · MINOR · NEW — three parallel homes for demo tests; pass A's F-14 sees one of them

Pass A's F-14 correctly finds that `test/` imports `demo/`. The census is wider: there are **three**
homes for the single concept "a test of demo code".

```
$ grep -rl '"\.\./demo/' test/*.test.ts | wc -l
      10        # of 19 flat files in test/ — a majority
$ find test/demo -type f
test/demo/palettes/api/admin-palettes.test.ts
$ find demo/test -type f
demo/test/export/byte-exact.test.ts
demo/test/glass/aurora-bracket.test.ts
demo/test/glass/aurora-motion.test.ts
```

`vitest.config.ts:20-24` documents the third as a late patch (*"the two relocated aurora suites live
under `demo/test/glass/`; extend the include so they are discovered"*) without retiring the first
two. `test/mix-v4.test.ts:3-4` is this cone's instance:

```ts
import { parseColorIn } from "../demo/color-session/color-utils";
import { mixColorSequence } from "../demo/palettes/mix";
```

**Cure.** `test/` mirrors `src/` and imports only `@mkbabb/value.js/*` — that is what makes it a
consumer-truth suite. All 11 demo-testing files move to `demo/test/<feature>/`; `test/demo/` is
deleted; an eslint `no-restricted-imports` rule forbids `../demo` from `test/**`. Under pass A's F-1
the mix algebra's test splits correctly on its own: the `mixColorSequence` half becomes a genuine
`test/color/` library test.

---

## C-5 · MINOR · NEW — and a correction to a pass-A factual claim: `test/dist/` does not exist

`vitest.config.ts:25-29` carries a workaround for a directory that was deleted:

```ts
// U.W-CANON (U-F49/U-F50): the repo-hygiene gates live in `test/dist/`, but
// vitest's default exclude swallows `**/dist/**`. … drop just the dist rule …
exclude: configDefaults.exclude.filter((p) => !p.includes("dist")),
```

```
$ ls -d test/dist
ls: test/dist: No such file or directory
$ git log --oneline -1 -- test/dist
6d6d3521 chore(v-w42)!: prune proof-theater, orphaned probes, design residue; re-gate demo typecheck
$ git ls-files test | wc -l
      23        # none under test/dist
```

The filter now only weakens vitest's default excludes for no consumer.

**Correction to pass A.** Pass A, line 389, proposes relocating a gate to `test/dist/` and asserts
*"(that directory already exists for exactly this purpose per `vitest.config.ts:22-25`)"*. It does
not exist; pass A read the comment as the tree. The proposal is still sound, but it creates the
directory rather than reusing one.

**Cure.** Restore `exclude: configDefaults.exclude` and delete the comment — or land pass A's gate
and make the comment true again. Either is fine; the current state, where a config workaround
outlives its subject and a downstream audit inherits the fiction, is not.

---

## C-6 · CONFIRMATION with new artifact evidence — pass B's N-B1 settled from the shipped bundle

Pass B disproved F-13's bundle-cost clause by reasoning about eager root-barrel importers in the boot
graph. Pass C settles it directly from the built artifact, and adds a sharper measurement of the
structural claim.

**The granularity gap, measured as a transitive ESM graph** over `node_modules/@mkbabb/glass-ui/dist`
(script: resolve every relative `import`/`from` specifier from each entry, transitively, summing
bytes):

| specifier | entry | files | bytes |
|---|---|---:|---:|
| `@mkbabb/glass-ui` (root) | `dist/glass-ui.js` | 66 | 224,193 |
| `@mkbabb/glass-ui/card` | `dist/card.js` | 10 | 18,979 |
| `@mkbabb/glass-ui/tabs` | `dist/tabs.js` | 20 | 50,466 |
| `@mkbabb/glass-ui/watercolor-dot` | `dist/watercolor-dot.js` | 6 | 9,503 |

11.8× / +205 KB of module graph to obtain `Card` — a real dev-server and type-program cost, and a
sharper number than pass B's 43-vs-1 edge count.

**And the production negative, from the artifact rather than from reasoning.**
`dist/gh-pages/assets` (built `Jul 28 18:35`, 1.3 MB) contains **0 hits** for each of `data-table`,
`tags-input`, `number-field`, `accordion`, `toggle-group`, `role="progressbar"`, `cmdk` — all
glass-ui root-barrel members the demo never references (`grep -rl` over `demo/` → 0 files each).
Rolldown tree-shakes the barrel clean under `sideEffects: ["*.css"]`. **N-B1 is confirmed by
artifact:** F-13 stands in full as a *structure* defect and must not be cited as a shipped-bundle
cost.

I independently reproduce pass B's C-3 census (19 barrels, all single-`index.ts`, 48 importers, 24
straddling both paths, only `input` on a subpath) and pass B's C-1 resolution trace verbatim, so
those are twice-confirmed and need no restating here.

---

## Negatives — pass C's own

Pass A's negatives stand as amended by pass B (§2 corrected by B-1, §4 narrowed by B-3), with §N-B5
further corrected by C-1 above. Pass C adds:

**N-C1 · glass-ui's own value.js consumption is clean, so the phantom bare `paths` entry is inert.**
glass-ui 7.0.0's published `dist/` imports `@mkbabb/value.js/color` ×7, `/css` ×4, `/easing` ×2 —
and the bare root **zero** times. `package.json#exports` declares no `"."`, so the dead
`"@mkbabb/value.js": ["./dist/index.d.ts"]` entry cannot cause a boot break. It is inert, not
dangerous — which is precisely why it survived. Corroborates pass B's addendum to F-6 from the
package side rather than the trace side.

**N-C2 · Every value.js import in MixPane's closure is one a real consumer could write.** Re-verified
independently: `/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4 across the whole
demo; zero `@src/*`, zero relative reaches into `src/`, zero bare-root imports. `mixStage.ts:15-17`
and `useMixingAnimation.ts:41-42` in particular consume `/math`, `/easing`, `/color` and
`@mkbabb/glass-ui/{dom,motion-core}` exactly as a downstream package would. Third confirmation of
the T.W1 keystone at the specifier level.

**N-C3 · `verbatimModuleSyntax` is clean across the subtree.** All eleven type-only imports in the
eight files of the closure use `import type`. Zero violations. Third confirmation.

**N-C4 · The one-clock discipline holds.** `useMixingState.ts` contains no `setTimeout`, no
`requestAnimationFrame`; the only clock is `useMixingAnimation`'s `useRAFLoop`, and `settleMix` is
its single downstream edge. The architecture the file's header claims is the architecture it has.
Unrelated to C-1/C-2, which are boundary defects, not clock defects.

**N-C5 · The route renders without error.** `REPORT.md:123,138,153,168` — `/#/mix` across all four
Safari matrices: `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0`, no `blankOrNearBlank`, no
`darkClassMissing`. This is a true negative about *rendering* and a **false comfort** about
*function* — see C-1's correction to N-B5.

---

## The greenfield lattice — merged

Pass A's lattice, as amended by pass B, is correct and pass C adopts it whole. Pass C amends two
lines and adds one law:

**`@mkbabb/glass-ui`** — owns every interactive affordance and every primitive, imported **by
subpath**, never through a demo-local barrel. `WatercolorDot` is a *decorative face*; the control is
the consumer's own host element (C-1). Where the demo needs an interactive swatch, glass-ui either
declares a polymorphic root or ships the variant — the demo never prop-guesses one into existence.

**`demo/workbenches/mix/`** — as pass B laid it out, with two corrections:
`MixResultDisplay.vue` stamps `data-mix-target` on its **own wrapper**, never on a glass-ui
component (C-2); `MixSourceSelector.vue` wraps its dots in real `<button>` hosts (C-1).

**`demo/shell/`** — renders what panes publish. The action channel is `provide`/`inject`, so it is
**layout-independent by construction** (C-3): no `PaneActionRefs`, no `Ref<any>`, no `?.()`, no
`PaneSlot.onMount`, no desktop/mobile fork.

**New cross-cutting law pass C adds — *a prop contract that can evaporate must be gated at
runtime*.** Vue's fallthrough-attr design means `vue-tsc` structurally cannot see C-1's class of
defect, and eslint cannot either. Every cross-package component contract in this constellation needs
one DOM-level assertion in `demo/test/` — that the elements a component claims to render, with the
roles and names it claims, exist. This is the only gate that would have caught the blocker, and its
absence is why two prior expert passes and a full Safari visual matrix all reported green.

---

## Merged findings index — pass A (F-*) + pass B (B-*) + pass C (C-*)

| id | sev | family | finding | anchor | pass |
|---|---|---|---|---|---|
| **C-1** | **BLOCKER** | **D** | **`WatercolorDot` prop contract is fiction at glass-ui 7.0.0; both colors-mode add paths dead — reproduced live; corrects pass-B N-B5** | **`MixSourceSelector.vue:166,215`** | **C** |
| F-1 | MAJOR | A | N-ary mix order-dependent — measured 120° hue divergence | `demo/palettes/mix.ts:39` | A |
| F-2 | MAJOR | B | Two clipboard impls + two serializers, divergent UX | `MixPane.vue:49` / `MixResultDisplay.vue:42` | A |
| F-3 | MAJOR | B | `MixResult` not a discriminated union → 11 masking guards | `useMixingState.ts:32` | A |
| F-4 | MAJOR | A | `Result` erased by throwing adapter; no failure surface | `picker-color.ts:104` | A |
| B-1 | MAJOR | D | Pigment travels through the DOM as JSON + silent `catch`; corrects pass-A Negatives §2 | `mixStage.ts:140,150` | B |
| **C-2** | **MAJOR** | **D** | **`[data-mix-target]` never exists → B-1's invented-geometry fallback is the ONLY branch ever taken** | **`MixResultDisplay.vue:68` / `mixStage.ts:121`** | **C** |
| F-6 | MAJOR | C | `paths` forked from `exports`; 3 dead keys, 2 missing | `tsconfig.demo.json:42` | A (B·C-1, N-C1) |
| F-7 | MAJOR | C | Two resolution mechanisms in one file | `picker-color.ts:1,28` | A (B·C-1) |
| F-8 | MAJOR | C | Undeclared frozen `value.js@4.0.0`; `css.d.ts` 382 vs 350 lines (duplicate `*_2` model) | `node_modules/@mkbabb/value.js` | A (B·C-2) |
| F-9 | MAJOR | D | Shell→feature `Ref<any>` + `?.()` masks | `usePaneRouter.ts:107,220` | A (B·C-4) |
| **C-3** | **MAJOR** | **D** | **F-9's channel is never bound in the mobile layout — mobile Mix dock actions structurally unreachable** | **`App.vue:83,319,331`** | **C** |
| F-14 | MAJOR | D | `test/` imports `demo/`; `test/` in no tsconfig program | `test/mix-v4.test.ts:3` | A |
| B-4 | MAJOR | B | `PickerColorIn<S>` forces 6 casts, 2 `as unknown as`, on library returns (dissent: A filed INFO) | `picker-color.ts:36` | B |
| F-5 | MINOR | A | Space type 17-wide, UI offers 9 | `useMixingState.ts:44` | A |
| F-10 | MINOR | D | Child defines parent's scroll host, unscoped | `PaneHeader.vue:40` | A |
| F-11 | MINOR | B | `export/` (11 modules) test-only; `export.ts` is live | `demo/palettes/export*` | A |
| F-12 | MINOR | D | 4× duplicated pane chrome, 3 drifted variants | `MixPane.vue:61` | A |
| F-13 | MINOR | D | `demo/ui/` = 19 pure aliases; 48 importers, 24 straddle | `demo/ui/card/index.ts` | A (B·C-3, C-6) |
| F-16 | MINOR | D | Dead `computed` import; lint structurally blind | `MixPane.vue:2` | A (B-5) |
| B-2 | MINOR | A | `demo/palettes/mix.ts` has 1 consumer, in another feature | `useMixingState.ts:24` | B |
| B-3 | MINOR | B | `INTERPOLATION_SPACES` re-exported by the vacated path | `useGradientInterpolation.ts:17` | B |
| B-5 | MINOR | D | Lint relaxation's rationale false at HEAD: `src/` 0 `any`, `demo/` 52 | `eslint.config.js:8` | B |
| **C-4** | **MINOR** | **D** | **Three parallel homes for demo tests (10 / 1 / 3); F-14 sees one** | **`vitest.config.ts:20`** | **C** |
| **C-5** | **MINOR** | **D** | **`test/dist/` workaround outlives the deleted directory; corrects pass-A line 389** | **`vitest.config.ts:25`** | **C** |
| F-15 | — | B | superseded by B-4 (INFO → MAJOR) | `picker-color.ts:35` | A→B |
| F-17 | INFO | D | 19-member port injected for one member | `MixPane.vue:16` | A |

**Totals: 25 live findings — 1 BLOCKER, 12 MAJOR, 11 MINOR, 1 INFO, 1 superseded.** Pass C
contributes 5 (1 BLOCKER, 2 MAJOR, 2 MINOR), one correction to a pass-A factual claim, one correction
to a pass-B negative, one upgrade of a pass-B finding from latent to always-taken, and artifact
evidence settling pass B's N-B1.

**Strongest defect overall (all three passes): C-1.** It displaces F-1. F-1 is a measured wrong
answer; C-1 is a measured *absence of the ability to ask the question* — the Mix workbench's colors
mode has no working entry point on the running application, and the fault is a library-boundary
contract the demo asserted and the design system never implemented.

**What pass C's method contributes to the mega-tranche.** Two prior expert passes, a full Safari
visual matrix, `eslint --max-warnings=0`, and a hard CI typecheck all reported green over a dead
control. The single technique that found it was reading the **rendered vnode props** against the
**published `.d.ts`** — comparing what the demo says to what the package accepts. That comparison
should run for every cross-package component contract in the constellation, not just this one.
