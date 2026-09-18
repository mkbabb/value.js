# CHALLENGE-L — library structure · `demo/palettes/browser/search/SearchFilterBar.vue`

## PASS 2 (2026-07-28) — read this header first

A prior CHALLENGE-L seat already audited this component at HEAD `c654824e` and produced a
42 745-byte report with a 12-row ledger. **I did not overwrite it.** It is preserved verbatim at

    docs/tranches/V/megatranche/audit/components/SearchFilterBar/challenge-L-library-pass1-c654824e.md

and it remains authoritative for its own findings. This file is the **second pass** (E-1
twice-audit): I re-derived the axis independently, then reconciled. It contains only

1. **independent verification** of pass 1's two BLOCKERs — one confirmed, one confirmed-but-remeasured
   with a number I dispute (§2);
2. **five findings pass 1 does not have** (§3), one of which is a confirmed correctness defect in the
   **published library surface** and is, in my judgement, the most consequential thing either pass
   found;
3. a **stronger proof** of pass 1's L-11 (§4).

For the import trace, the `tsconfig.demo.json`↔`exports` drift (their L-10), the text-search
two-matcher finding (their L-7), the four-owner filter topology (their L-4), the `Channel` guard
homes (their L-8) and the out-of-chain suspects, **read pass 1** — I re-checked those and have nothing
to add or correct.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, as declared at
spawn. Declared, not inherited.

## Substrate

- Repo HEAD at this pass: **`80fc5c4054d5bd790b1b2b73280a2e0ced4535de`** — *not* the `c654824e` named
  in my work order and used by pass 1. The branch advanced (`docs(V·mega): shell band COMPLETE-TRUE
  12/12`). All line numbers below are against `80fc5c40`; I re-verified that every line I cite is
  unchanged from pass 1's reading of it.
- The dev server at `:9000` answered `200`, but the Playwright MCP profile was held by a concurrent
  seat: `Browser is already in use for …/mcp-chrome-83447af`. **I had no browser.** Every claim below
  is static evidence, a pasted command, or a measured number from `node` against the built `dist/`.
  Where a claim needs the browser I label it HYPOTHESIS and say so. Pass 1 *did* have the browser, so
  where our evidence classes differ I defer to its live measurements and note it.

**Verdict: DEFECTIVE.** One BLOCKER (confirming pass 1), and one new MAJOR in the published library
that neither pass 1 nor the library-audit seat caught.

---

## §1 · Ledger — pass 2 only

| id | sev | defect | status vs pass 1 |
|---|---|---|---|
| LP2-1 | **BLOCKER** | Tags filter is inert: `:checked`/`@update:checked` are not glass-ui 7's `Checkbox` surface | **confirms** its L-1, independent evidence |
| LP2-2 | MAJOR | `variant` is not a `ButtonProps` key; "ghost" buttons render at `primary` emphasis | **confirms** its L-2; **disputes** the count (28/19, not 51/20) and the severity |
| LP2-3 | MAJOR | **NEW** — published `toRgba8` is not channel-symmetric: an achromatic colour projects to a *tinted* byte triple |
| LP2-4 | MAJOR | **NEW measurement** — the two colour engines disagree on **27.37%** of a 14 641-point HSV grid (quantifies its L-6) |
| LP2-5 | MAJOR | **NEW** — inverted seam discipline: 7 barrels on the leaf, 0 on `color-session/`, which 57 files reach through 18 raw modules |
| LP2-6 | MINOR | **NEW** — `searching` is dead state; the `Loader2` spinner and `:disabled` can never render |
| LP2-7 | MINOR | **NEW measurement** — `demo/ui/` funnels glass-ui's *root* barrel (66 modules / 224 193 B) past the granular subpaths it ships (quantifies its L-9) |
| LP2-8 | INFO | **NEW** — `hexToOklab`'s `"none"` throw is unreachable |

Pass 1's L-3, L-4, L-5, L-7, L-8, L-10, L-11, L-12 stand as written; I reproduced L-3, L-5 and L-11
and found them exactly as reported (my L-11 proof is stronger — §4).

---

## §2 · Independent verification of pass 1's two BLOCKERs

### LP2-1 · BLOCKER · The Tags filter is inert — CONFIRMED

`SearchFilterBar.vue:51-55`:

```vue
<Checkbox
    :checked="selectedTags.includes(tag.name)"
    @update:checked="toggleTag(tag.name)"
    class="shrink-0"
/>
```

glass-ui 7.0.0's declared surface,
`node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts:4-11, 21`:

```ts
export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}
…
{ "update:modelValue": (value: CheckedState) => any; }
```

There is **no `checked` prop and no `update:checked` emit.** Both authored bindings fall through to
`$attrs`: `:checked` becomes a stray DOM attribute, and `onUpdate:checked` is a listener nothing ever
calls. Therefore `toggleTag` (`:197-203`) is never invoked, `update:selectedTags` is never emitted,
and the tag rows are additionally *uncontrolled* (`modelValue` undefined), so the box can latch
visually while `selectedTags` stays empty forever.

**Why CI cannot see it.** Vue permits arbitrary fallthrough attributes on a component, so `vue-tsc`
has nothing to reject — the prop is not *wrong*, it is *absent*, which is legal. This is the exact
class of defect the "no legacy code / no dual paths" edict exists to prevent: the markup is written
against a glass-ui API that was retired, and nothing in the toolchain is positioned to notice.

**Blast radius is cluster-local, not repo-wide** — four sites, two files, both inside this
component's own cluster:

```
$ grep -rn 'update:checked\|:checked=' demo --include=*.vue
demo/palettes/browser/search/TagEditPopover.vue:28:  :checked="currentTags.includes(tag.name)"
demo/palettes/browser/search/TagEditPopover.vue:29:  @update:checked="(checked: boolean) => onToggle(tag.name, checked)"
demo/palettes/browser/search/SearchFilterBar.vue:52:  :checked="selectedTags.includes(tag.name)"
demo/palettes/browser/search/SearchFilterBar.vue:53:  @update:checked="toggleTag(tag.name)"
```

So the *same* mistake disables tag filtering in the browse bar and tag *editing* in the popover — the
`search/` cluster is the only place in `demo/` that uses `Checkbox` at all, and it uses it wrongly in
both places. Nothing else regressed; there is no third copy to hunt.

**Reproduction status.** CONFIRMED by type declaration, not by click — the browser was locked. Pass 1
reports having measured it live; I defer to that for the runtime half and note that the declarative
evidence alone is sufficient, since the named prop and emit simply do not exist in the installed
package.

**Cure.** `v-model="…"` semantics, i.e. `:model-value="selectedTags.includes(tag.name)"` +
`@update:model-value="toggleTag(tag.name)"`. But per §5 the structural cure is better: the component
should not own tag-selection state at all.

### LP2-2 · MAJOR · `variant` is not a Button prop — CONFIRMED, count disputed

`SearchFilterBar.vue:5` (`variant="ghost" icon-only`) and `:111-114` (`variant="ghost" size="sm"`)
against `node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:4-19`:

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← the axis "ghost" was aiming at is `quiet`
    tone?: Tone;
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
    …
}
```

No `variant`. It falls to `$attrs` and lands as a literal `variant="ghost"` attribute on the
`<button>`; `emphasis` takes its declared default, `primary`. So the filter `⋮` trigger and the
"Clear all filters" row render at **primary** emphasis — the loudest register in the system — where
the author asked for the quietest.

**Where I differ from pass 1.** Two points, both stated so the record is honest rather than
consensual:

- *Count.* Pass 1 reports "51 sites / 20 files repo-wide". I measure **28 occurrences across 19
  files** in `demo/`:

  ```
  $ grep -rn 'variant="ghost"' demo --include=*.vue | wc -l
        28
  $ grep -rln 'variant="ghost"' demo --include=*.vue | wc -l
        19
  ```

  I cannot reproduce 51. The likeliest explanation is that pass 1 counted all `variant="…"` values
  (glass-ui `Badge` *does* declare `variant`, `badgeVariants` is exported from
  `demo/ui/badge/index.ts`, so some `variant=` sites are correct) or included non-`demo/` trees. The
  `ghost`-specific figure is 28/19. I use mine and flag the discrepancy rather than average them.
- *Severity.* Pass 1 grades this BLOCKER; I grade it **MAJOR**. It degrades appearance
  deterministically and repo-wide, but no command stops working — unlike LP2-1, where a control
  silently does nothing. A reviewer triaging both should fix LP2-1 first.

**Cure.** `emphasis="quiet"` at all 28 sites. This is a consumer-side migration, not a glass-ui
change — and it is worth saying that the *reason* 28 sites drifted silently is edict-4-shaped: the
demo talks to the design system through `demo/ui/`'s re-export barrels (LP2-7), which are the one
place a migration could have been noticed and were instead the place it was laundered.

---

## §3 · New findings

### LP2-3 · MAJOR · NEW · `toRgba8`, a published API, maps an achromatic colour to a tinted byte triple

This is the finding I would most want carried into the mega-tranche, because it is not in the demo —
it is in `@mkbabb/value.js`, on the public surface, and it is why the duplicated colour engine
(LP2-4 / pass 1's L-6) has survived every previous audit: **the canonical path is worse than the
copy on the neutral axis, so nothing ever forced convergence.**

**Where.** `src/color/operations.ts:305-331`, shipped as `@mkbabb/value.js/color`.

```ts
// src/color/operations.ts:305
function roundHalfEven(value: number): number {
    const floor = Math.floor(value);
    const fraction = value - floor;
    if (Math.abs(fraction - 0.5) < Number.EPSILON * Math.max(1, Math.abs(value))) {
        return floor % 2 === 0 ? floor : floor + 1;
    }
    return Math.round(value);
}
```

**Mechanism — two faults compounding.**

1. `hsv → rgb` is not channel-symmetric at `s = 0`: a colourless input yields three RGB channels
   1–3 ulp apart instead of bit-identical.
2. `roundHalfEven`'s "is this exactly .5" tolerance is **scaled by the value's magnitude** —
   `Number.EPSILON * max(1, |value|)` ≈ 1.70e-14 at 76.5, i.e. about *one* ulp. Channels whose float
   error differs by 1–3 ulp therefore take **different rounding branches**: some banker's-round down,
   some `Math.round` up. `toRgba8` is not a pure per-channel map.

**Reproduction — pasted output.**

```
$ node -e "import('./dist/subpaths/color.js').then(({hsv,convertColor,toRgba8})=>{ … })"
hsv channels: [ 0, 0, 0.30000000000000004 ]
 ch0 exact=76.500000000000042633 frac-0.5=4.2633e-14 tol=1.6986e-14 halfEvenBranch=false -> byte 77
 ch1 exact=76.500000000000014211 frac-0.5=1.4211e-14 tol=1.6986e-14 halfEvenBranch=true  -> byte 76
 ch2 exact=76.500000000000028422 frac-0.5=2.8422e-14 tol=1.6986e-14 halfEvenBranch=false -> byte 77
toRgba8: [ 77, 76, 77, 255 ]
```

Three mathematically identical channels → `[77, 76, 77]` = `#4d4c4d`: a magenta cast on what must be
neutral grey.

**Rate, over ladders a UI can actually emit.**

```
v = k/10   (0.1 step, JS accumulation)      2/11    v=0.30000000000000004 -> [77,76,77]
                                                    v=0.8999999999999999  -> [230,229,230]
v = k/100  (1% step, accumulation)          0/101
v = k/255  (byte ladder)                    0/256
v = (k+0.5)/255 (half-byte ladder)         67/255   v=0.00196078431372549 -> [1,0,0]
                                                    v=0.01764705882352941 -> [5,4,4]
```

`hsv(0, 0, 0.5/255)` → `[1, 0, 0]`: a **pure red** byte from a colourless input. Over 200 000 random
`v` the hit rate is 0/200 000 — the defect fires only at half-byte boundaries, so it is
rare-but-exact rather than noisy, which is precisely why sampling-style tests miss it.

**Reachability from the shipped UI — HYPOTHESIS.** The picker's HSV sliders are
`demo/picker/controls/ComponentSliders/ComponentSliders.vue:70` → `:step="0.001"`. Canonical step
quantization (`min + step*n`) puts the V slider's `.700` detent at `0.001*700 === 0.7000000000000001`
— *not* `0.7`; verified in `node` — and:

```
V slider at .700  v=0.7000000000000001  bytes=[179,178,179]  hex=#b3b2b3  neutral=false
V slider at .300  v=0.3                 bytes=[76,76,76]     hex=#4c4c4c  neutral=true
V slider at .500  v=0.5                 bytes=[128,128,128]  hex=#808080  neutral=true
```

`#b3b2b3` is what `pickerColorToHex` (`demo/color-session/picker-color.ts:212`, reached via
`color-model.ts:64`) would hand the hex readout and the clipboard, and what `colorToRgb255`
(`color-utils.ts:17`) would hand the WebGL shader. I could **not** confirm that reka-ui computes the
detent as `step*n` — no browser — so the UI hop is a hypothesis. The library defect is confirmed.

**Cure.** The magnitude-scaled epsilon is the wrong instrument: at byte scale it is ~1 ulp, so it
cannot distinguish "exactly .5" from "0.5 + 2 ulp of upstream conversion error", and it resolves
*per channel* what is logically one decision. Two changes, both structural:

1. Make achromaticity structural in the conversion: `hsv → rgb` at `s === 0` must emit the value
   channel three times, bit-identically, not compute it three times.
2. Replace `roundHalfEven`'s tolerance with an absolute ulp budget on the *triple* (round the three
   channels under one shared decision), or accept plain half-even on exact `.5` and stop pretending a
   float-error window is the same thing.
3. Add the property test that would have caught it: **for every `AnyColor` whose RGB channels are
   equal, `toRgba8` returns equal bytes.** This is a one-line invariant over the library's most
   depended-on projection and it does not exist today.

### LP2-4 · MAJOR · NEW measurement · the two colour engines disagree on 27.37% of the HSV grid

Pass 1's L-6 establishes that `MiniColorPicker.vue` contains a second colour engine. It does not say
how far the two engines have drifted. They have drifted a long way.

Transcribing `MiniColorPicker.vue:85-105` verbatim and diffing it against the library path
(`hsv()` → `toRgba8()`, which is what `pickerColorToHex` does) over a 14 641-point HSV grid:

```
$ node scratchpad/hsv.mjs
samples=14641  mismatches=4007  (27.37%)
  h=0 s=0.0 v=0.3  local=#4d4d4d library=#4d4c4d
  h=0 s=0.0 v=0.7  local=#b3b3b3 library=#b2b2b2
  h=0 s=0.0 v=0.9  local=#e5e5e5 library=#e6e5e6
  h=0 s=0.1 v=0.1  local=#1a1717 library=#191717
```

Two distinct causes inside that 27.37%: a **deliberate rounding-policy fork** (the local
`Math.round(c*255)` at `:103` is half-up; the library is banker's) and the LP2-3 asymmetry. Both are
consequences of the same structural fact — one concept, two homes — and note the direction: on the
neutral axis the *demo's copy* is right and the *library* is wrong.

Four homes already own this conversion, which is the actual finding:

| home | symbol | anchor |
|---|---|---|
| the library | `hsv()` · `convertColor()` · `toRgba8()` | `src/subpaths/color.ts` (published) |
| the demo's colour layer | `pickerColorToHex(color)` | `demo/color-session/picker-color.ts:212` |
| the demo's colour layer | `convertPickerColor(color, "hsv")` | used 6× in `useColorPipeline.ts`, `useColorParsing.ts` |
| glass-ui 7 | `oklchStopToHex` · `cssToOklch` | `@mkbabb/glass-ui/color` |

`grep "toString(16)"` across `demo/` + `src/` returns 5 sites; `MiniColorPicker.vue:103` is the only
one that is a *colour* serializer not routed through `toRgba8`.

**Cure.** As pass 1 says — delete both conversions, `currentHex` becomes
`pickerColorToHex(convertPickerColor(hsv(hue, sat, val), "rgb"))` and the incoming watcher becomes
`convertPickerColor(parsePickerColor(hex), "hsv")` — with the addition that **LP2-3 must land first**,
or the deletion is a regression: convergence onto a wrong canonical path makes neutral greys worse
than they are today. Sequence matters here; that is the whole reason to record the 27.37%.

### LP2-5 · MAJOR · NEW · seam discipline is inverted — 7 barrels on the leaf, 0 on the spine

`SearchFilterBar.vue:145` reaches three levels up, out of its own area, into a sibling area's
internal module:

```ts
import { parseColorIn } from "../../../color-session/color-utils";
```

Pass 1 marks this edge ✔ ("correct layer"), and on *direction* it is right — `palettes` (feature) →
`color-session` (spine) is downward. But the target has no seam to arrive at. `demo/color-session/`
contains 24 files and **no `index.ts`**. Its de-facto public surface, measured:

```
$ grep -rho 'from "[^"]*color-session/[^"]*"' demo --include=*.ts --include=*.vue | sed … | sort | uniq -c | sort -rn
  26 keys            11 useContrastSafeColor     4 color-names        2 color-space-meta
  19 picker-color      6 color-utils             3 color-chips        2 ColorSpaceSelector.vue
  16 color-model       5 ink                     2 colorSpaceInfo     1 view-accent   (+5 more)
$ grep -rl 'color-session/' demo --include=*.ts --include=*.vue | grep -v '^demo/color-session/' | wc -l
      57
```

**57 files** outside the area reach **18 distinct raw internal modules** of it, one of them a raw
`.vue`. Meanwhile `demo/palettes/browser/` — a *leaf* — carries **seven** barrels (`browser/index.ts`
plus `card/ admin/ search/ dialog/ slug/ status/`), and its top barrel opens with eighteen lines of
prose about seam law (`browser/index.ts:1-18`).

The effort is spent exactly inverse to the risk. And the inversion has a second edge: because
`color-session` is simultaneously a peer feature and the shared spine, it has the surface discipline
of neither — nothing declares what of it is public, so all of it is.

**Cure.** Give `color-session/` the one barrel that matters — `demo/color-session/index.ts`, named
exports only (`parseColorIn`, `colorToCss`, `colorToRgb255`, `pickerColorToHex`,
`convertPickerColor`, `parsePickerColor`, the `PICKER_*` tables, `keys`) — and route the 57 consumers
through it. Then collapse the leaf's seven barrels to the one at `browser/index.ts`: a sub-barrel per
sub-directory is the "new shared dir that does not already exist" contrivance the KISS edict forbids,
five times over.

While doing it, fix the throw-vs-`Result` inversion the barrel would otherwise enshrine:
`parsePickerColor` (`picker-color.ts:103`) converts the library's explicit `Result` into an exception,
which is why the component ended up writing a regex instead of reading a failure (pass 1's L-5). The
barrel should re-export the `Result`-shaped function and let callers narrow once.

### LP2-6 · MINOR · NEW · `searching` is dead state; the spinner branch cannot render

`SearchFilterBar.vue:213-225` is declared `async` and contains **no `await`**:

```ts
async function applyColorSearch() {
    if (searching.value) return;
    searching.value = true;
    try {
        …
        emit("colorSearch", lab.L, lab.a, lab.b);
    } finally {
        searching.value = false;
    }
}
```

`searching.value = true` and the `finally` reset execute in the same synchronous tick, so Vue never
observes `true`. Therefore:

- `:98` `:disabled="searching"` never binds,
- `:102` `<Loader2 v-if="searching" class="… animate-spin" />` is an unreachable branch,
- `:99`'s `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` are dead
  classes.

This is honest in one respect: the search *is* synchronous, because it is the client-side
`Array.filter` of pass 1's L-3. The spinner is residue from an intended server call.

**Cure, ordered.** Fix L-3 (send `colorL/colorA/colorB` on the wire) and the async-ness becomes real
and the spinner earns its place. If L-3 is deferred, delete `searching`, the `Loader2` import and both
dead attribute sets. *Edict-6 check:* `animate-spin` is a Tailwind utility on a never-rendered node,
not an authored keyframe — removing it deletes no animation, and `demo/styles/` keeps its keyframe
library untouched.

### LP2-7 · MINOR · NEW measurement · `demo/ui/` funnels the root barrel past the subpaths glass-ui ships

Pass 1's L-9 establishes that `demo/ui/` is a pure alias layer. Two costs it does not quantify.

**(a) It flattens glass-ui 7's own module lattice into shadcn-vue's 2023 directory taxonomy.**
glass-ui 7.0.0 publishes 70 subpaths, including `./button`, `./popover`, `./card`, `./select`,
`./slider`, `./switch`, `./tooltip`, `./separator`, `./label`, `./collapsible`, `./dropdown-menu`,
`./dialog`, `./badge`. **Thirteen of `demo/ui/`'s nineteen names have a dedicated glass-ui entry
point, and the barrels route all of them through the root `.` barrel anyway** — while
`demo/ui/input/index.ts` alone reaches a real subpath (`@mkbabb/glass-ui/forms`). From a call site
`demo/ui/button` and `demo/ui/input` are indistinguishable, so the design system's actual boundaries
are invisible at the point of use. The demo invented a second, worse module map for a package that
already has a good one — and that laundering is the mechanism by which LP2-2's 28-site drift went
unnoticed.

**(b) Measured funnel.** Transitive closure of glass-ui's unbundled `dist/`:

```
root barrel closure:  66 modules, 224 193 bytes
button.js  closure:   11 modules,  17 224 bytes
popover.js closure:    7 modules,  13 960 bytes
```

and Vite's dep pre-bundle confirms nothing goes through the granular entries:

```
$ ls -l node_modules/.vite/deps/ | grep glass
231357  @mkbabb_glass-ui.js          ← the root barrel
202019  @mkbabb_glass-ui_aurora.js
104093  @mkbabb_glass-ui_blob.js
 43369  @mkbabb_glass-ui_dock.js
  2940  @mkbabb_glass-ui_color.js
…                                     ← no @mkbabb_glass-ui_button.js, no _popover.js
```

**Honest scoping**, because the number invites overclaiming: the root chunk loads anyway (three demo
files import `writeClipboard` / `useClipboard` / `useTouchGate` from bare glass-ui), and
`sideEffects: ["*.css"]` lets Rolldown tree-shake the production build. So the 231 KB is a **dev-mode**
cost, not a shipped one. Cost (a) is unconditional.

**Cure.** Delete `demo/ui/` (19 directories, 29 lines total) and import glass-ui at the point of use
through the granular subpath where one exists — `import { Button } from "@mkbabb/glass-ui/button"`.
That kills the alias layer the no-legacy edict forbids, replaces `../../../ui/popover` with a bare
specifier at every depth, and makes the design system's boundaries visible in the import block.

### LP2-8 · INFO · NEW · unreachable defensive throw

```ts
// SearchFilterBar.vue:205
function hexToOklab(hex: string): { L: number; a: number; b: number } {
    const [L, a, b] = parseColorIn(hex, "oklab").channels;
    if (L === "none" || a === "none" || b === "none") {
        throw new Error("Hex color produced missing OKLab channels");
    }
    return { L, a, b };
}
```

Both callers can only pass a 6-digit hex or `pickerHex.value`; neither can yield a `none` channel —
`none` arrives from CSS `none` keywords, which the L-5 regex gate excludes by construction. The branch
is type narrowing wearing runtime-error clothes. It disappears once the `"none"` policy has the single
home pass 1's L-8 asks for.

---

## §4 · A stronger proof of pass 1's L-11 (the seam is enforced by nothing)

Pass 1 infers the G-DEMO rules are inert from their globs. That inference is correct, and it can be
made a direct measurement — worth recording because it is the form a gate should be checked in:

```
$ npx eslint --print-config demo/palettes/browser/search/SearchFilterBar.vue | …
no-restricted-imports for SearchFilterBar.vue -> "<ABSENT>"
$ npx eslint --print-config demo/palettes/BrowsePane.vue | …
no-restricted-imports for BrowsePane.vue -> "<ABSENT>"
```

The rule is not merely unable to match — it is **absent from the effective configuration** for both
files. Root cause as pass 1 states: `eslint.config.js:232-239` scopes G-DEMO-3b to
`demo/@/components/**` / `demo/@/lib/**`, `:275-278` scopes G-DEMO-3a to `demo/@/composables/**`, and
W43 (RF-15) deleted that tree — quoted in `vite.config.ts:66-72`. Confirmed:

```
$ ls -d demo/@
ls: demo/@: No such file or directory
$ grep -rn '"@components' tsconfig*.json vite.config.ts vitest.config.ts     # → nothing
$ grep -rn 'from "@components' demo --include=*.ts --include=*.vue | wc -l
0
```

**Corroboration that the seam is already being bypassed inside its own tree**, which pass 1 does not
have: `demo/palettes/browser/card/CurrentPaletteEditor.vue:193` → `import ApiOfflineChip from
"../status/ApiOfflineChip.vue"` — a raw `.vue` reach from the `card/` sub-feature into `status/`, past
`status/`'s barrel. Exactly the crossing G-DEMO-3b names, and `eslint` is green.

**Cure.** Re-target the globs to physical homes (`demo/palettes/**`, `demo/picker/**`,
`demo/workbenches/**`, `demo/scenes/**`, `demo/shell/**`) and re-express the ban against physical
paths. Better and cheaper to keep true: replace the bespoke `no-restricted-imports` encoding with a
declarative boundary map (`import/no-restricted-paths` zones, or `eslint-plugin-boundaries`) where
each area declares its allowed targets once — so a rename cannot silently unhook it, which is what
happened here.

---

## §5 · Greenfield lattice — pass 2's amendments

Pass 1's lattice (its §4) is sound and I adopt it. Three amendments, all consequences of §3:

```
L0  @mkbabb/value.js   (7 published subpaths — posture unchanged)
      + deltaE(a, b)                                pass 1's L-3 cure, unchanged
      + resolveChannels(c): Result<[n,n,n]>          pass 1's L-8 cure, unchanged
   ▸ + toRgba8 channel-symmetry INVARIANT + test     NEW (LP2-3) — and it must land
   ▸   hsv→rgb emits bit-identical channels at s=0     BEFORE the L-6 engine merge,
                                                        or convergence is a regression

L1 ▸demo/color-session/index.ts    NEW (LP2-5) — the ONE barrel that matters, named exports only.
      Re-exports the Result-shaped parse, not the throwing wrapper — which is what
      made pass 1's L-5 regex feel necessary in the first place.

L2  demo/palettes/browse/useBrowseQuery.ts     pass 1's design, unchanged: one owner for
      { text, sort, tier, tags, color, radius } + toListOptions() + activeCount + clear()

L3  FilterMenu.vue  (was SearchFilterBar)      stateless over v-model:query.
      Loses colorText · pickerHex · colorSearchActive · miniPickerOpen · searching (:169-173)
    ▸ and `searching` does not come back until the search is actually async (LP2-6)
    ColorField.vue  (was MiniColorPicker)      two pointer-drag regions; emits an AnyColor.
    ▸ ~45 lines of duplicated library math deleted — AFTER L0 (LP2-4)

  ▸demo/ui/  DELETED — and the 28 `variant="ghost"` sites (LP2-2) migrate to `emphasis="quiet"`
              in the same pass, since deleting the laundering layer is what makes the drift visible
```

The transposition underneath all of it, which both passes reach from different directions: **a filter
bar should own no state and no arithmetic.** LP2-1 (a control that cannot report), LP2-6 (state that
cannot render), pass 1's L-5 (a parser that should not exist) and LP2-4 (a conversion that should not
exist) are four faces of one fact — a *view* is holding filter truth and colour math that belong one
or two layers down. Move both down and every one of them becomes unwriteable.

The sequencing constraint is the genuinely new claim: **LP2-3 gates LP2-4.** Merging the two colour
engines onto today's `toRgba8` would make neutral greys measurably worse than the hand-rolled copy
produces. Fix the library first, then delete the duplicate.

---

## §6 · Negative results — pass 2

Pass 1's §5 negatives I re-checked and confirm: no wrong-direction edge; honest library reach;
`verbatimModuleSyntax` clean (`:144 import type { Tag }`); Vue 3.5 idioms correct (reactive props
destructure `:147`; `useTemplateRef` in `MiniColorPicker.vue:82-83`); tokens live; `@reference` idiom
correct; no animation deleted; `/#/browse` clean for `pageErrors`, `horizontalOverflow`, `main`,
`namelessButtons` across all four Safari matrices (`REPORT.md:120-121, 135-136, 150-151, 165-166`);
the four `smallTapTargets` on that route are `PaletteSlugBar`'s, not this component's
(`REPORT.json`: `input 160×23` + three `button 22×22` labelled "Switch to slug" / "Generate new slug"
/ "Cancel").

Two negatives I add, both bearing on the CHALLENGE-L premise, which was that the library structure
under this component is wrong. On the axis the premise most directly names, it is **right**:

- **The demo's consumption of `@mkbabb/value.js` is genuinely honest — no deep-path cheating
  anywhere.** `grep -rn 'from "\(\.\./\)*src/' demo` returns **zero** hits across the whole demo tree.
  The five specifiers in use (`/color` ×24, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4) are
  all real keys in `package.json#exports`, and `vite.config.ts:38-49` **generates** the self-alias set
  *from* that exports map — with anchored regexes, so a subpath cannot prefix-collide — resolving to
  `dist/subpaths/*.js`, the built artifact. A real npm consumer could write every import the demo
  writes. Pass 1 proved the same point with `tsc --traceResolution`; two independent methods agree.
  **This is a true proof of the public API, and it is the strongest thing about the structure here.**
- **glass-ui composition uses the design system's own contract, not an override.** `SearchFilterBar`
  is slotted into glass-ui's `SearchBar` default slot (`BrowsePane.vue:15-26`); `SearchBar`'s compiled
  definition ends in `A(n.$slots, "default")` after its own input, so a trailing default slot is the
  intended host for exactly this. No glass-ui internal is reached and no variant is forked into
  `demo/ui/`. The scoped block (`:235-249`) styles only demo-local `.filter-*` classes through tokens
  (`--font-serif`, `--type-small`, `--leading-small`, `--radius-md`, `--duration-fast`,
  `--ease-standard`, `--accent`) — no hard-coded colour, no glass-root override. Root-level-styling
  edict: satisfied. (Pass 1's `#filters`-slot request to glass-ui is an *enhancement*, not a violation
  by this component.)

Caveats I will not paper over: I had no browser, so LP2-1's runtime half and LP2-3's UI hop rest on
declarative and arithmetic evidence rather than a click; and every browse capture in the visual matrix
logged `Failed to load remote palettes: SyntaxError: The string did not match the expected pattern.`
— the API was down, so the component was photographed filtering an empty wall, and no capture has
ever opened its popover.

---

## §7 · Reproduction scripts

Written to the session scratchpad, not committed (this seat writes only under
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/`). Both import `dist/subpaths/*.js`
directly, so they exercise the **published** surface, not `src/`:

- `probe.mjs` — applies `SearchFilterBar.vue:218`'s gate verbatim to 7 CSS colours and compares
  against `parseCssColor` + `convertColor(_, "oklab")`. Reproduces pass 1's L-5 independently:
  6 of 7 library-valid colours — including the placeholder's own `hsl(...)` example and 3-digit hex —
  are discarded and silently replaced by `#4488cc`.
- `hsv.mjs` — LP2-4: transcribes `MiniColorPicker.vue:85-105` verbatim, diffs against
  `hsv()` → `toRgba8()` over 14 641 points.
- `gray.mjs` + inline `node -e` probes — LP2-3: the achromatic asymmetry, the ulp/tolerance
  arithmetic, the four UI ladders, and the `step=0.001` detent test.
