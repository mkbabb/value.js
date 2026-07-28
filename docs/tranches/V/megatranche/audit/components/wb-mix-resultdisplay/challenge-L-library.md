# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]` (the 1M-context
variant) — the tier this seat was explicitly spawned with. Declared, not inherited.

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Subject `demo/workbenches/mix/MixResultDisplay.vue` (159 lines), area `demo/workbenches`
- Axis: library structure — module boundaries, ownership, dependency direction, public surface

---

## Provenance — this is run **r3**

Two prior runs of this seat existed at this path. I preserved both before writing:

- `challenge-L-library.r2-prior.md` — the run that occupied this filename (645 lines)
- `challenge-L-library.prior-run.md` — the r1 it in turn preserved

I completed my own independent trace **before** reading r2. The convergence is therefore
real, and I record it honestly rather than re-presenting shared ground as discovery:

**Confirmed independently (r2 ↔ r3):** the `WatercolorDot` fallthrough blocker (r2 L-1/L-2/L-3
↔ F-1), the duplicated clipboard serializer (L-4 ↔ F-4), the undiscriminated `MixResult`
(L-5 ↔ F-5), the discarded `CopyResult` failure channel (L-7 ↔ F-4b), the root-barrel import
(L-8a ↔ F-8), the redundant `TransitionGroup` import (L-9 ↔ F-9). r2's evidence for these is
excellent — its jsdom SFC mount (`ANCHOR_COUNT=0`) and its pasted e2e RED are stronger
artefacts than anything I add, and I cite them rather than duplicate them.

**New in r3** — four findings r2 does not contain, plus one correction:

| | |
|---|---|
| **F-2** | **[NEW]** 100% of the demo import-boundary eslint regime is dead — every rule globs a deleted tree; the subject resolves `no-restricted-imports: undefined` |
| **F-3** | **[SHARPENED + CORRECTED]** r2 found the `tsconfig` `paths` *drift*. The real defect is one level down: `paths` **shadows** self-reference, so 29 of 38 demo import sites bypass `package.json#exports` entirely. r2's proposed cure (generate `paths` from `exports`) is contrivance — the correct cure is to **delete the block**, which I prove safe |
| **F-6** | **[NEW]** a fourth hand-rolled `palette → linear-gradient` strip; `PreviewRamp.vue` already owns the concept; the 1-colour case emits invalid CSS |
| **F-7** | **[NEW]** `mixColorSequence` — weighted N-ary colour maths, pure and host-free — is homed in `demo/palettes/`, forcing an `as unknown as` at the seam |
| **F-1c** | **[NEW]** r2 reports the e2e failing "one assertion earlier". Stated at full strength: `canMix` is **permanently `false`**, so this component has **never rendered in the shipped application at all** |
| — | **[CORRECTION]** r2's L-6 implies the plate's `DockControl`s may be nameless. I tested that hypothesis and **disproved** it — see Negative Results §3 |

---

## Verdict — **DEFECTIVE (BLOCKER)**

The seat's premise is correct and the failure is structural, not stylistic.

`MixResultDisplay.vue` consumes `<WatercolorDot>` — a `@mkbabb/glass-ui@7.0.0` primitive —
through **props and attributes that do not exist in the published surface**. `WatercolorDot`
declares `inheritAttrs: false` and manually re-forwards **only `$attrs.class` and
`$attrs.style`**. Everything else is discarded. Here that kills `data-mix-target`, the anchor
this file's own docblock (`:14`) calls "the anchor the canvas convergence lands on". One
component over it kills `tag="button"`, `aria-label`, `:disabled` and `@click` on the
add-colour slot — so `selectedColors` can never reach 2, `canMix` is permanently `false`, the
Mix button is permanently `disabled`, and **`MixResultDisplay.vue` can never mount.**

`vue-tsc` is green throughout, because unknown attributes on a Vue component are legal
fallthrough. The dist-`.d.ts` trust boundary the tranche record repeatedly cites as *the*
dogfood proof is **structurally blind to this entire failure class** — it certifies the typed
prop surface and says nothing about the attribute surface, which is where all the load-bearing
plumbing (`data-*` hooks, listeners, `aria-*`, host tag) actually lives.

F-3 is the same disease in the other direction: the demo is configured so that 76% of its
value.js imports never touch `package.json#exports`. Both findings are instances of one
mechanism — **a public surface asserted by the consumer's configuration rather than read from
the producer's contract.**

**Strongest defect: F-1.**

---

## Method — what I ran

| # | Probe | Outcome |
|---|---|---|
| 1 | `Read` subject + `useMixingState.ts` + `MixPane.vue` + `MixSourceSelector.vue` + `mixStage.ts` | import graph traced to homes |
| 2 | `node -e` over both packages' `package.json#exports` | every specifier verified real |
| 3 | `npx tsc -p tsconfig.demo.json --noEmit --traceResolution` | **F-3** — resolution split, counted |
| 4 | `npx eslint --print-config demo/workbenches/mix/MixResultDisplay.vue` | **F-2** — `no-restricted-imports: undefined` |
| 5 | `grep -o '$attrs' watercolor-dot.js \| wc -l` → **0**; render-fn extraction | **F-1** mechanism |
| 6 | Isolated WebKit Playwright ×3 against live `:9000` | **F-1** empirical, live DOM |
| 7 | `grep`-census of `linear-gradient` / `WatercolorDot` / glass-ui root-barrel | **F-6/F-8** blast radius |
| 8 | Read `shots/safari-desktop-light/mix.png` | plate absent at rest — coverage gap confirmed |

Probes live in the session scratchpad (`.../scratchpad/probe{,2,3}.mjs`). Nothing outside this
report's directory was written; no `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`,
`dev.sh` or `INBOX.md` was touched. No source edits land from this seat.

---

## 1 · The import trace

Every import in `MixResultDisplay.vue:2-7`, traced to its home:

| line | specifier | home | verdict |
|---|---|---|---|
| 2 | `@lucide/vue` → `Copy, Check, Save, RotateCcw` | devDep `@lucide/vue@^1.16.0` | **OK** |
| 3 | `@mkbabb/glass-ui/dock` → `DockControl, DockSeparator` | real subpath (`exports["./dock"]` ✓) | resolves; dock-vocabulary-out-of-dock is r2 L-6's lane |
| 4 | `vue` → `computed, TransitionGroup` | peer | `TransitionGroup` dead — **F-9** |
| 5 | `@mkbabb/glass-ui` → `useClipboard` | **root barrel** | published on `./dom` — **F-8** |
| 6 | `@mkbabb/glass-ui/watercolor-dot` → `WatercolorDot` | real subpath ✓ | **consumed against a contract that does not exist — F-1** |
| 7 | `import type { MixResult }` ← `./composables/useMixingState` | sibling | correct `import type`; the *type* is defective — **F-5** |

**No wrong-direction boundary crossing.** Nothing reaches into `shell/`, `platform/`, `boot/`
or `src/`. Zero `@src/*`, zero deep `dist/` paths, zero raw-`.vue` reaches into another
feature's internals. The subject's own module edges are clean; its defects are *contract*
defects, not *topology* defects.

**The library seam, one hop out.** `composables/useMixingState.ts:19`:

```ts
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
```

`"./color"` is a real `exports` key and a real consumer could write this line. But *how it
resolves under the demo's own typecheck* is F-3, and it is not what the tranche record claims.

---

## 2 · Defects

### F-1 · BLOCKER — the component consumes an imagined `WatercolorDot` public surface, and the feature it lives in is unreachable in consequence

**The published surface.**
`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` declares
exactly six props:

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

No `tag`, no `as`, no `title`, no `aria-label`, no `disabled`, no emit surface, no slot.

**The mechanism.** `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```js
inheritAttrs: !1,
__name: "WatercolorDot",
props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...}, range:{...}, seed:{...} },
setup(e) {
  let t = e, n = h() /* useAttrs() */, c = i(() => n.class), f = i(() => n.style), …
  return (t, n) => (d(), o("span", {                     // ← root tag HARDCODED
    "aria-hidden": "true",                                // ← hardcoded, unoverridable
    class: l([c.value, "watercolor-swatch", …]),          // ← class forwarded
    "data-testid": "watercolor-swatch",
    "data-variant": e.variant,
    style: u([f.value, { …, pointerEvents: "none", … }])  // ← style forwarded; pointer-events HARD-OFF
  }, [ … ], 14, C));
}
```

```
$ grep -o '\$attrs' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | wc -l
       0
```

`inheritAttrs: false` + `useAttrs()` read for `class` and `style` **only** = every other
fallthrough attribute and every listener is dropped. r2 proved the DOM consequence
deterministically with a jsdom SFC mount (`ANCHOR_COUNT>>> 0`, `TITLE_COUNT>>> 0`,
`TAGATTR_COUNT>>> 1`) — that artefact stands and I do not repeat it.

**What breaks inside the subject file:**

| line | authored | runtime |
|---|---|---|
| `:66`, `:81`, `:100` | `tag="div"` | **no-op** — already a `<span>`; one dead prop written three times |
| `:69` | `data-mix-target` | **DROPPED** — the convergence anchor |
| `:72` | `aria-hidden="true"` | **DROPPED**, *and* redundant (glass-ui hardcodes it) |
| `:103` | `:title="color.css"` | **DROPPED** — the palette branch's only descriptive text |

`:69` is compounded by a **masking fallback** in the consumer —
`MixAnimationCanvas/composables/mixStage.ts:121-124`:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };   // ← invents a geometry
```

The selector can never match, so the convergence always lands on a hardcoded guess. The `?:`
exists only to make a broken contract look satisfied — edict 2, and the reason this survived
three tranches.

#### F-1c · [NEW] The feature is not degraded — it is unreachable, and this component has never rendered

r2 records the e2e failing at the add-slot assertion. Stated at full strength, with the live
DOM: the same `inheritAttrs` mechanism makes **every** colour-authoring path in the Mix
workbench inert.

`MixSourceSelector.vue:164-174` — the add slot:

```vue
<WatercolorDot
    key="__add__" :color="cssColorOpaque ?? 'var(--muted-foreground)'" variant="ghost"
    tag="button"                                   ← :168 DROPPED (root is a hardcoded <span>)
    seed="mix-add-slot"
    class="add-slot-ghost w-11 h-11 … disabled:pointer-events-none"   ← :170 the ONLY survivor
    aria-label="Add current color to the mix"      ← :171 DROPPED
    :disabled="!canAddColor || undefined"          ← :172 DROPPED (the MAX_COLORS guard is dead)
    @click="addCurrentColor"                       ← :173 DROPPED (no listener bound)
>
```

Live DOM, WebKit against `http://localhost:9000/#/mix` (`scratchpad/probe3.mjs`):

```json
{
  "wellHtml": "…<span data-v-292b9032 data-v-a3e86846 aria-hidden=\"true\"
     class=\"add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer hover:scale-110 …\"
     data-testid=\"watercolor-swatch\" data-variant=\"ghost\"
     style=\"border-radius: 76.83…%; pointer-events: none; …\">…",
  "addSlotByClass": 1,
  "ariaLabelHits": 0,        ← the aria-label never landed
  "anyWatercolor": 9
}
```

A `<span>` with `pointer-events: none`. Not a button, no name, not clickable. Note the class
list still carries `disabled:opacity-30 disabled:cursor-not-allowed
disabled:pointer-events-none` — Tailwind variants keyed on a `:disabled` state a `<span>`
cannot have.

The second authoring path, "From palettes" (`MixSourceSelector.vue:211-221`), is the **same
dead `tag="button" … @click` pattern**. Both are inert. Consequence, measured
(`scratchpad/probe.mjs`):

```
mix btn count: 3
mixclick locator.click: Timeout 30000ms exceeded.
  - locator resolved to <button disabled type="button" … class="button tap-squish … font-display">
  - element is not enabled              ← canMix === false, permanently
{ "present": false, … }                 ← ".mix-plate" NEVER EXISTS IN THE DOM
```

`useMixingState.ts:50-53` needs `selectedColors.length >= 2`; nothing can append to it;
`mixResult` stays `null`; `MixPane.vue:113` `v-if="mixResult"` never fires. **The component
this seat audits has never once rendered in the shipped application, and no gate in the repo
says so.** The visual-audit matrix corroborates by absence: `shots/*/mix.png` in all four
matrices show the pane with no plate, and the `/#/mix` rows in `REPORT.md` (186 text,
0 overflow, 0 pageErr, 0 consoleErr) are **silent about this component entirely**.

**Why every gate is green.** `vue-tsc` types extra component attributes as HTML fallthrough,
not as prop-surface errors. The `.d.ts` trust boundary cannot see prop-surface drift on the
attribute channel. r2's `git show f2c8f565` establishes the historical mechanism precisely: the
W44 glass-7 adoption migrated this file's *removed exports* (`DockIconButton` → `DockControl`,
`copyToClipboard` → `useClipboard`, 13+/13−) and touched no `WatercolorDot` line, because
removed exports are export-shaped and this break is prop-shaped.

**Scope — systemic, not local:**

```
$ grep -rln "WatercolorDot" demo/ | wc -l                                 → 19  files
$ grep -rn -A8  "<WatercolorDot" demo/ | grep -c 'tag="'                  → 21  dead `tag` props
$ grep -rn -A10 "<WatercolorDot" demo/ | grep -cE ':?(title|aria-label)=' → 11  dropped names
$ grep -rn -A10 "<WatercolorDot" demo/ | grep -c '@click='                →  7  dropped listeners
```

**Cure (gestalt, two ends, no shim).**

1. **glass-ui (BH/BI relay — the standing fond).** `WatercolorDot` is a leaf swatch consumers
   legitimately need to make interactive. Give it the `Primitive` posture the rest of the
   library already uses — `DockControl` ships `as` / `asChild` / `class` and *no*
   `inheritAttrs: false`. Add `as?: string | Component` + `asChild?: boolean`, drop
   `inheritAttrs: false`, make the hardcoded `aria-hidden="true"` conditional on a
   non-interactive host. **Reuse the existing component-type name** (edict 4); do not mint a
   `WatercolorSwatchButton`.
2. **value.js.** Delete all 21 `tag=`. Where the dot must be interactive or identified, wrap it
   in the real element and put `aria-label` / `@click` / `disabled` / `data-mix-target` there.
   **The correct idiom is already in the same file**: `MixSourceSelector.vue:127-133` puts
   `data-mix-source` on a plain `<div>` wrapper and it works. The defect is the sites that
   departed from an idiom their own neighbour demonstrates.
3. **Delete the fallback.** `collectStage` returns `null` when the anchor is absent;
   `useMixingAnimation`'s PRM path already settles honestly on a null stage. A missing anchor
   becomes an instant correct settle instead of a lie. (r2's transposition — kill the
   `querySelector` seam entirely for a `provide()`d `MixStage` registry — is the stronger
   version and I endorse it.)

**No compat layer** in glass-ui for `tag`/`title` (edict 2). Migrate the consumers at the root.

---

### F-2 · MAJOR **[NEW]** — 100% of the demo's import-boundary enforcement is dead

`eslint.config.js` carries three `no-restricted-imports` blocks. One guards `src/` (inv-K-1,
alive and correct: bans `@mkbabb/glass-ui` under `src/`). The other two guard the demo — and
glob a tree that no longer exists:

```
$ grep -n '"demo/@' eslint.config.js
235:            "demo/@/components/**/*.ts",
236:            "demo/@/components/**/*.vue",
237:            "demo/@/lib/**/*.ts",
238:            "demo/@/lib/**/*.vue",
275:            "demo/@/composables/**/*.ts",
276:            "demo/@/composables/**/*.vue",

$ ls demo/@
ls: demo/@: No such file or directory
```

Six of eight demo glob rows are dead. The two survivors
(`demo/color-picker/**`, `eslint.config.js:233-234`) carry a rule banning
`@components/custom/palette-browser/**/*.vue` — a specifier written through the `@components`
alias that **W43 / RF-15 deleted**. `vite.config.ts:63-66` states it outright:

> *"W43 (RF-15) killed the demo `@…` path aliases: every demo import is now relative to its
> physical home"*

and `tsconfig.demo.json` retains only `vue`, `@vue/*` and the value.js keys. The surviving rule
bans a string no file in the repo can any longer write.

Measured against the subject:

```
$ npx eslint --print-config demo/workbenches/mix/MixResultDisplay.vue | jq '.rules["no-restricted-imports"]'
undefined
```

**The subject component — and the whole `demo/workbenches/` tree — has zero import-boundary
enforcement.** The `G-DEMO-1` / `G-DEMO-3a` / `G-DEMO-3b` invariants (barrel-seam reach only;
composables are a clean lower layer; never reach up into app-root boot) survive as ~60 lines of
comment prose in `eslint.config.js:220-300` enforced against nothing.

This is the meta-finding of this seat: it is the mechanism that lets F-6 and F-7 exist
unchallenged, and it is "wrong module boundaries" in the brief's exact sense — the boundaries
were re-drawn by the W43 restructure and the enforcement was never re-aimed. **A boundary law
with no matching glob is worse than no law: it reads as enforced, and every subsequent audit
credits it.**

**Cure.** Re-aim the globs at the live tree —
`demo/{picker,shell,palettes,workbenches,color-session,shared,scenes,platform}/**` — and
restate the bans as path *zones* (`import/no-restricted-paths`) rather than alias strings,
since W43 removed the aliases the current patterns were written against. Add one CI assertion
that every configured glob matches ≥1 file, so a future restructure cannot silently disarm the
regime a second time.

---

### F-3 · MAJOR **[SHARPENED + CORRECTED]** — `tsconfig.demo.json#paths` shadows `package.json#exports`: 29 of 38 demo import sites never touch the published surface

r2 (L-8b) correctly found that the `paths` table has *drifted* from the `exports` map. That is
true and it is the smaller half. The load-bearing defect is that `paths` **wins over
self-reference**, so most of the demo's library imports are resolved by raw file substitution
with the exports map never consulted.

**The drift, first** — `vite.config.ts:29-52` *generates* its self-alias set from
`package.json#exports`, naming the hazard in a comment:

> *"GENERATED (not hand-rolled) so the alias set can never drift from the exports map."*

`tsconfig.demo.json` was hand-rolled and drifted exactly as predicted:

| specifier | in `exports`? | in `paths`? | target exists? |
|---|---|---|---|
| `@mkbabb/value.js` (bare) | **no** (no `"."` key) | yes → `./dist/index.d.ts` | **no** (`ls dist/*.d.ts` → no matches) |
| `…/parsing` | **no** | yes | **no** |
| `…/units` | **no** | yes | **no** |
| `…/color` `…/math` `…/easing` `…/transform` `…/quantize` | yes | yes | yes |
| `…/css` | yes | **no** | — |
| `…/value` | yes | **no** | — |

Three phantom rows, two omissions.

**The real defect** — `--traceResolution`, pasted:

```
======== Resolving module '@mkbabb/value.js/color' from '…/demo/workbenches/mix/composables/useMixingState.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Trying substitution './dist/subpaths/color.d.ts' …
======== Module name '@mkbabb/value.js/color' was successfully resolved to '…/dist/subpaths/color.d.ts'. ========
                                                                     ^^^ NO Package ID — exports map never entered

======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '…/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== … resolved to '…/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
                                                    ^^^ Package ID — true self-reference through exports
```

Counted across the whole demo program:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution \
    | grep "was successfully resolved" | grep "@mkbabb/value.js" \
    | sed -E "s/.*Module name '([^']+)'.*/\1/" | sort | uniq -c
  19 @mkbabb/value.js/color        ← via paths — exports BYPASSED
   9 @mkbabb/value.js/css          ← via exports self-reference
   4 @mkbabb/value.js/easing       ← via paths — BYPASSED
   3 @mkbabb/value.js/math         ← via paths — BYPASSED
   3 @mkbabb/value.js/quantize     ← via paths — BYPASSED
```

**29 of 38 sites (76%) bypass `package.json#exports`.** Only the nine `/css` sites — the
subpath the hand-rolled table *forgot* — exercise the resolution a real consumer would get.
The subject's own composable (`useMixingState.ts:19`, `/color`) is in the bypassed 76%.

The practical consequence: delete `"./color"` from `package.json#exports` today and the demo
typecheck stays green while every downstream consumer's build breaks. **The T.W1 demo-dogfood
keystone is 9/38 real.** This is the seat brief's "false proof of the public API" in its
configuration form, and it is the same disease as F-1 — a surface asserted by the consumer's
config instead of read from the producer's contract.

There is also a genuine registry install of the package **inside its own repo**:

```
$ ls -la node_modules/@mkbabb/value.js/            # a real directory, Jul 17 21:10
$ node -e "…" → @mkbabb/value.js 4.0.0, exports: ./color ./value ./css ./easing ./math ./transform ./quantize
```

directly contradicting `vite.config.ts:33` (*"A package does not install itself"*). A fourth
resolution outcome — the demo typechecking against frozen published 4.0.0 rather than the
working tree — is one `paths` edit away.

**Correction to r2's cure.** r2 proposes generating `paths` from `exports` via a prebuild step
writing `tsconfig.paths.generated.json`. That is a new build artefact, a new config file, and a
new thing to keep in sync — contrivance (edict 3) in service of a table that should not exist.
**The correct cure is to delete the `@mkbabb/value.js*` block from `tsconfig.demo.json`
outright.** Node/TS self-name resolution already resolves all seven through
`package.json#exports` natively — the nine `/css` sites prove it, today, in the shipping
config. Evidence that deletion is safe:

```
$ npx tsc -p tsconfig.demo.json --noEmit 2>&1 | grep -E "TS2307|TS2305" | grep -c "value.js"
0
```

Zero unresolved/missing-export diagnostics on the self-reference path. (Total `tsc` errors: 3,
all `TS2344 ComponentOptions` — artefacts of my running plain `tsc`; the repo's gate is
`vue-tsc`, which handles SFC instance types. They are not resolution errors and not
value.js-related.)

Deleting the block removes the three phantom rows and the two omissions in the same move, and
leaves exactly **one authority** for the package's own surface — `package.json#exports` — with
Vite deriving from it (already true) and TypeScript reading it natively. That is the honest
lattice; a hand-mirrored table beside a generated alias set is a dual path (edict 2) whichever
way it is generated.

---

### F-4 · MAJOR — the `MixResult` → clipboard serializer is duplicated across parent and child, on two different clipboard mechanisms, and both discard the typed failure

**(a) Two homes for one concept, inside one feature directory.**

`MixResultDisplay.vue:42-47`:

```ts
async function onCopy() {
    const text = result.type === "color"
        ? result.css ?? ""
        : result.colors?.map((c) => c.css).join(", ") ?? "";
    await copy(text);                                    // useClipboard — has status/confirmation
}
```

`MixPane.vue:49-55`:

```ts
async function copyResult() {
    if (!mixResult.value) return;
    const text = mixResult.value.type === "color"
        ? mixResult.value.css ?? ""
        : mixResult.value.colors?.map((c) => c.css).join(", ") ?? "";
    await writeClipboard(text);                          // bare primitive — NO status at all
}
```

Byte-identical modulo the `.value` deref. Both are live and reachable by different affordances:
the in-plate `DockControl` (`:121-127`), and the shell action bar
(`demo/shell/usePaneRouter.ts:222`, `handler: () => paneRefs.mix.value?.copyResult?.()`). The
same user action yields a check-mark from one surface and silence from the other, and a change
to the serialization must be made twice or they diverge. `MixPane.vue:41-46` (`onSave`)
re-derives the same union narrowing a third time.

**(b) The named failure channel is thrown away — at both sites.**

`node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts`:

```ts
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
copy: (text: string) => Promise<CopyResult>;
onCopyError?: (reason: CopyFailureReason) => void;
```

with the doc comment stating the intent: *"Returns the discriminated result … rather than a
lossy boolean."* `MixResultDisplay.vue:46` does `await copy(text)` and drops the result;
`onCopyError` is never passed; `copied` (`:32`) tests only `status === "success"`. On failure
the icon never changes, the title stays `"Copy color"`, and the user is told nothing.
glass-ui went to explicit trouble to make failure nameable; the consumer un-names it. r2's
reading is exactly right: the W44 migration retired the *symbol* (`copyToClipboard` →
`useClipboard`) but kept the fire-and-forget *shape*.

*Reproduction:* NONE for the user-visible failure branch — labelled a hypothesis. The API
misuse is confirmed by signature-vs-call-site; the consequence is inferred from `status` never
leaving `idle`/`failure`, both of which render `copied === false`.

**Cure.** One serializer, one owner, one side-effect seat. `MixResult → string` is a property
of the result type, not of either component: put it beside the type (on the discriminated union
of F-5). Then delete `MixPane.copyResult` and have `MixResultDisplay` **emit `copy`** the way
it already emits `save` / `reset` — a component named `…Display` owning a platform write is
the ownership inversion that produced the duplication. `MixPane` then owns one clipboard path
for both entry points and surfaces `{ ok: false, reason }` once.

---

### F-5 · MAJOR — `MixResult` is an optional bag, not a discriminated union, and that is what manufactures every masking fallback downstream

`composables/useMixingState.ts:30-36`:

```ts
export type MixResultType = "color" | "palette";
export interface MixResult {
    type: MixResultType;
    css?: string;
    colors?: PaletteColor[];
}
```

`{ type: "color", colors: [...] }` and `{ type: "palette" }` are both legal values. Neither is
producible — `useMixingState.ts:90` always sets `css` on the colour branch, `:97` always sets
`colors` on the palette branch. The type is strictly wider than its producer, so every consumer
must defend against states that cannot occur. In this file alone:

| line | defence |
|---|---|
| `:37-39` | `result.css ?? "var(--muted-foreground)"` **and** `result.colors?.[0]?.css ?? "var(--muted-foreground)"` |
| `:43-45` | `result.css ?? ""` **and** `result.colors?.map(…) ?? ""` |
| `:78` | `v-if="result.type === 'color' && result.css"` — `&& result.css` is pure compensation |
| `:91` | `v-if="result.type === 'palette' && result.colors"` — likewise |

Plus `MixPane.vue:41,44,52,53` and `useMixingAnimation.ts:79,81` — **ten masking fallbacks
across three files, all downstream of one type declaration.** Each `?? ""` is a silent
copy-empty-string; each `?? "var(--muted-foreground)"` paints grey where a colour failed;
`:78`/`:91` would render an empty flex box with an action row and no error.

**Cure — pure widening removal, no call-site churn:**

```ts
export type MixResult =
    | { readonly type: "color";   readonly css: string }
    | { readonly type: "palette"; readonly colors: readonly PaletteColor[] };
```

Under `strict` + `exactOptionalPropertyTypes` (`tsconfig.base.json:8,12`, both on), narrowing on
`type` makes `css`/`colors` non-optional and **all ten defences delete themselves**. The
producer already satisfies the tighter type verbatim.

---

### F-6 · MAJOR **[NEW]** — a fourth hand-rolled `palette → linear-gradient` strip; the concept already has a component that owns it

`MixResultDisplay.vue:109-116` builds the gradient strip inline in the template:

```vue
<div class="h-4 rounded-full overflow-hidden"
     :style="{ background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})` }"
     aria-hidden="true" role="presentation" />
```

The same concept, independently re-implemented across the demo:

```
demo/workbenches/mix/MixResultDisplay.vue:112                   linear-gradient(to right, …join(', '))
demo/workbenches/generate/GenerateControls.vue:72               linear-gradient(to right, …join(", "))
demo/workbenches/extract/composables/useExtractSession.ts:111   linear-gradient(to right, …join(", "))
demo/color-session/color-chips/PreviewRamp.vue:25               linear-gradient(90deg,     …join(", "))
demo/workbenches/gradient/composables/useGradientCSS.ts:223     linear-gradient(90deg,     …join(", "))
```

`GenerateControls.vue:65-73` and `useExtractSession.ts:101-113` are near-byte-identical — same
even-spacing formula, same `pct.toFixed(0)`, same `"var(--muted)"` empty guard. And
`PreviewRamp.vue` is **a 50-line component whose entire job is exactly this**: "paint an array
of CSS colour strings as a ramp strip", already tokenized (`--radius-sm`, the inset hairline
ring), already `aria-hidden`, already carrying the `data-stops` paint≡stops referent.

The subject re-does it inline and worse:

- no `data-stops` referent (the O-14 paint≡stops law is unobservable here)
- raw `h-4 rounded-full` geometry instead of the token ladder — a per-instance style decision
  where the design system already has a rung (edict 5)
- **no length guard**: `result.colors` of length 1 emits `linear-gradient(to right, red)` — a
  single-stop gradient, **invalid CSS**, which paints nothing. `PreviewRamp.vue:31` guards with
  `v-if="stops.length >= 2"`; the subject does not. `mixPalettes` can return a 1-colour result
  when the shortest input palette has one entry under the `discard` strategy.

**Cure.** One home. `PreviewRamp` is already the component-type name (edict 4: reuse, do not
mint). Widen it to accept `colors: readonly string[]`, give it the full-width `strip` size this
plate wants, and mount it at all four call sites; delete the three inline builders. The
positioned-stop form in `useGradientCSS.rampGradient` stays where it is — that one obeys a
genuinely different law (eased sub-stop sampling) and is correctly isolated.

---

### F-7 · MINOR **[NEW]** — pure library-grade colour maths is homed in `demo/palettes/`, and the seam it creates forces a cast

`demo/palettes/mix.ts` (146 lines) — the module `useMixingState.ts:21` reaches three directory
levels to import — is entirely Vue-free and DOM-free. Its only imports are
`@mkbabb/value.js/color` plus two demo type modules. It exports:

- **`mixColorSequence(colors, space, hueMethod, weights)`** — weighted **N-ary** colour mix
  with a full argument contract (`:47-55`: length agreement, finiteness, non-negativity,
  at-least-one-positive)
- `mixPalettes(palettes, opts)` — column-wise palette mix under three leftover strategies

`@mkbabb/value.js/color` publishes `mixColors` — **binary only**. The weighted N-ary
generalization satisfies every criterion the library uses for its own surface (pure, total,
failure-explicit, no host dependency) and is sitting in the demo, reachable only by a relative
path.

The dependency direction is also wrong at the seam: `demo/palettes/mix.ts:16-17` imports
`colorToCss` / `parseColorIn` / `PickerColorIn` / `PickerSpace` from `../color-session/` — a
*sibling feature* — so one mathematical operation traverses
`workbenches/mix → palettes → color-session`. `PickerSpace` is itself a demo-local narrowing of
the library's `SpaceId`, and the mismatch shows up as a cast:

```ts
// demo/palettes/mix.ts:38
return result.value as unknown as PickerColorIn<S>;
```

**Labelled honestly: the promotion is a hypothesis, not a reproduction.** I measured no defect
*caused* by the current home. What *is* reproducible is the `as unknown as` — the signature of
a type boundary drawn in the wrong place.

**Cure.** Promote `mixColorSequence` into `src/color/` behind the existing `./color` subpath,
typed on `SpaceId` and returning the library's own `Result`. `mixPalettes` stays in the demo —
"palette" is a demo concept — but becomes a thin fold over the library primitive, and the cast
dissolves with it.

---

### F-8 · MINOR — three depths of one package in one file; the narrow subpath is published and already used by a sibling

```ts
// MixResultDisplay.vue
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";           // :3  subpath
import { useClipboard }               from "@mkbabb/glass-ui";                // :5  ROOT BARREL
import { WatercolorDot }              from "@mkbabb/glass-ui/watercolor-dot"; // :6  subpath
```

`useClipboard` is published on `./dom` (`dist/dom.d.ts` → `export * from "./composables/dom"`),
and **the sibling composable in this very feature already uses it** —
`MixAnimationCanvas/composables/useMixingAnimation.ts:43`,
`import { useBreakpoint } from "@mkbabb/glass-ui/dom"`. The correct spelling is established
in-tree and this file does not use it. Repo-wide the root barrel is imported **37 times**.

```
$ ls -l node_modules/@mkbabb/glass-ui/dist/{glass-ui.js,dom.js,useClipboard-*.js}
25239  glass-ui.js        ← the root barrel
 4179  dom.js             ← the correct narrow subpath
 1321  useClipboard-D36OTaeT.js
```

r2 sized the shipped delta honestly with esbuild (+818 B minified, +76%, for one symbol) and
graded it MINOR on the measurement. I concur, and add one honesty note r2 does not: on **this
route** there is no byte win at all, because `demo/ui/card/index.ts:1` re-exports from the root
barrel and `MixPane.vue:3` imports it (F-10) — `glass-ui.js` is in the `/#/mix` graph
regardless. This is an **idiom inconsistency** — one file speaking two dialects of the same
import law, which is how a codebase forgets which one is canonical — and MINOR for that reason.

**Cure.** `@mkbabb/glass-ui/dom` here and at the nine sibling sites; then F-10 removes the
barrel's last excuse.

---

### F-9 · MINOR — one Vue built-in imported, its sibling three lines above not

`MixResultDisplay.vue:4` — `import { computed, TransitionGroup } from "vue"`. The template uses
both `<Transition>` (`:60`) and `<TransitionGroup>` (`:92`); only the latter is imported. Both
are SFC-compiler built-ins resolved without an import — the file proves it itself, and r2's
jsdom mount confirms `<Transition>` rendered as `<transition-stub>` with no import present.
The same split exists across the feature: `MixSourceSelector.vue:2` imports it,
`MixPane.vue:2` does not and uses `<Transition>` at `:111`.

Not a `verbatimModuleSyntax` violation — a real value import of a real value, merely dead.
Delete it; `import { computed } from "vue"` is the whole need.

---

### F-10 · INFO — `demo/ui/` is nineteen pass-through barrels over the glass-ui root

Not the subject's own import but its parent's (`MixPane.vue:3`, `import { Card } from
"../../ui/card"`), and the structural context for the lattice below.

```
$ grep -rn 'from "@mkbabb/glass-ui"' demo/ui/*/index.ts | wc -l
19
demo/ui/card/index.ts:1     export { Card, CardHeader, CardTitle, … } from "@mkbabb/glass-ui";
demo/ui/tooltip/index.ts:1  export { Tooltip, TooltipContent, … }     from "@mkbabb/glass-ui";
…17 more, all pure re-export, zero added behaviour
```

Nineteen modules whose only function is to rename `@mkbabb/glass-ui/card` to `../../ui/card`.
They add an indirection hop, force the root barrel into every graph that touches them (F-8),
and give a false impression that `demo/ui/` is a design layer with content — against edict 4
(variants belong in glass-ui) and edict 3 (no wrapper layers that do not earn their existence).

**Cure.** Delete them; import the glass-ui subpaths directly at the ~40 call sites. A genuine
variant goes into glass-ui under the existing component-type name.

---

## 3 · Negative results — hypotheses I tested and cleared

Recorded so the next seat does not re-spend the probes.

1. **No deep-internal reach into `src/`.** No `@src/`, no `../../src/`, no
   `@mkbabb/value.js/dist/...` anywhere under `demo/workbenches/mix/`. The one library import
   (`useMixingState.ts:19`) is a real published subpath, correctly `import type`. The subject's
   *module* topology is clean; its defects are contract and configuration defects.
2. **Every glass-ui specifier is a real published export.** Verified against
   `node_modules/@mkbabb/glass-ui/package.json#exports` (73 keys): `./dock` ✓,
   `./watercolor-dot` ✓, `.` ✓. No demo-only path a real consumer could not write. F-1 is a
   *prop*-surface fiction, not a *module*-surface one.
3. **[CORRECTION to r2 L-6] `DockControl` does forward `title`.** I hypothesized the plate's
   three action buttons were nameless — `dist/dock.js` contains `inheritAttrs: !1` twice. I
   extracted the context of both: they belong to `GlassDock` (line 689) and `DockTrigger`
   (line 1212). The `__name: "DockControl"` factory has **no** `inheritAttrs` key, so `title`
   reaches the root `<button>` and contributes a last-resort accessible name.
   Hypothesis **disproven**. The `namelessButtons: 1` on `/#/mix` in `REPORT.json` is the F-1
   add slot, not this component. (r2's separate point — that the demo's own dock-wide law
   retired `title` in favour of `aria-label`, `SlugEditLayer.vue:88-90` — stands on its own
   merits and is the a11y seat's lane.)
4. **`verbatimModuleSyntax` satisfied.** `import type { MixResult }` (`:7`) is the only
   type-only import and is correctly marked.
5. **Vue 3.5 idiom correct.** `const { result, ghost = false } = defineProps<…>()` (`:20-23`)
   is reactive props destructure with a default — the current idiom, not `withDefaults`.
6. **Scoped styling is legitimate.** `.mix-plate` / `.mix-plate--ghost` (`:152-157`) use
   `--duration-fast` / `--ease-standard` and are component-scoped *presence*, not a global
   keyframe misplaced (edict 6 satisfied — nothing deleted, nothing that belongs in
   `demo/styles/` is here). `bg-well` resolves through `demo/styles/foundation.css:143,328` —
   a real demo token, not an ad-hoc value.
7. **Visual-audit coverage gap, not a component defect.** `shots/*/mix.png` in all four
   matrices show the pane with no plate; per F-1c it can never appear. The `/#/mix` rows in
   `REPORT.md` are structurally silent about this component, and its four `smallTapTargets` /
   one `namelessButtons` belong to the shell and the add slot. Worth an explicit `STATES.json`
   entry once F-1 is cured.

---

## 4 · The lattice I would build greenfield

Concretely, no legacy. The mix feature has **four** real concepts and currently smears them
across seven files. I keep r2's shape — it is right — and state the enforcement layer it omits.

```
L0  library         @mkbabb/value.js/color     mixColors · mixColorSequence (←F-7) · SpaceId
    design system   @mkbabb/glass-ui/{dock,watercolor-dot,dom,card}
                        imports downward only; never sideways into a demo feature

L1  demo/color/     colour text ⇄ colour value. parseColorIn · colorToCss · PickerSpace.
                    (today: color-session/{color-utils,picker-color} — right content,
                     a name that says "session" for something that is not session state)

L2  demo/palettes/  the Palette aggregate. types · mix (thin fold over L0) · export/serializers.
                    ONE export authority — the pre-contract palettes/export.ts is DELETED,
                    not kept beside export/serializers.ts.

L3  demo/workbenches/mix/
      mix-result.ts       THE MODEL. The discriminated union (F-5) + landingCss + resultText,
                          each defined ONCE (kills F-4 and the useMixingAnimation:79-81 fork).
      useMix.ts           THE MACHINE. selection · space/hue config · phase. Owns no timers —
                          the one-clock law is correct; keep it.
      MixPane.vue         THE SEAT. Every side-effect: clipboard, save, the dock command
                          surface. Provides the stage handle the canvas measures.
      MixResultPlate.vue  PURE PRESENTATION. props {result, ghost}; emits {copy, save, reset}.
                          No clipboard, no serialization, no `??`, no inline CSS strings.
                          Mounts <PreviewRamp> (F-6) instead of interpolating a gradient.
      MixAnimationCanvas/ THE NARRATION.

Lshell demo/shell/  usePaneRouter drives L3 through defineExpose. Shell → feature, one way.
```

Four structural moves beyond file layout — the first three are r2's and I endorse them
unchanged; the fourth is what r2 omits and F-2 shows is load-bearing:

1. **Kill the DOM-attribute seam.** `[data-mix-target]` / `[data-mix-source]` are a
   cross-sibling contract expressed as a global `querySelector`, typed by nothing and — as F-1
   proves — silently satisfiable by an unrelated component's rendering decisions. Replace with
   an explicit registry: `MixPane` `provide()`s a `MixStage` (`registerTarget(el)`,
   `registerSource(el, css)`); plate and selector call it from `useTemplateRef`. The contract
   becomes typed, the anchor cannot vanish without a compile error, and `collectStage` has no
   fallback left to mask anything with.
2. **Decoration is never a control.** Every `WatercolorDot` is an `aria-hidden`,
   `pointer-events: none` `<span>` — *correct* for a pigment face, *fatal* when a call site
   pretends it is a button or an anchor. The rule: `WatercolorDot` is only ever a child of the
   element carrying the semantics. That one rule kills F-1 and the 21 `tag=` sites at once —
   and if dot-shaped buttons are wanted as a *thing*, that belongs in glass-ui (edict 4), not
   in a `tag=` string the producer ignores.
3. **Actions come from `./button`, not `./dock`.** An in-plate action row is not a dock.
   `<Button icon-only emphasis="quiet" :aria-label>` gets correct geometry, a real accessible
   name, and no dependence on an ancestor that does not exist.
4. **[NEW] One authority per surface, and a gate that matches something.** F-2 and F-3 are the
   same shape: an authority that has been *copied* (eslint globs copied from a deleted tree;
   `paths` copied from an exports map) instead of *read*. The lattice above survives only if
   (a) `package.json#exports` is the sole library-surface authority — delete the `paths` block,
   let self-reference read it, keep Vite's generated alias; and (b) the eslint zones are
   re-aimed at the live tree with a CI assertion that every configured glob matches ≥1 file.
   Without (b), moves 1–3 decay exactly the way the `demo/@` rules did — silently, while every
   subsequent audit credits an enforcement that is not running.

After all four, `MixResultDisplay.vue` is roughly 95 lines: two `WatercolorDot` arms wrapped in
elements that own their own semantics, one `PreviewRamp`, one action row, one scoped presence
transition — no `??`, no `?.`, no inline CSS string, and exactly one thing it owns: *what the
result plate looks like*.

---

## 5 · Cure ledger

| id | sev | defect | cure | lands in |
|---|---|---|---|---|
| **F-1** | **BLOCKER** | `WatercolorDot` prop-surface fiction — `tag`/`aria-label`/`title`/`disabled`/`@click`/`data-mix-target` all silently dropped; Mix colours mode is inert; **this component has never rendered** | glass-ui: `as`/`asChild` + drop `inheritAttrs:false` (BH relay). value.js: delete 21 `tag=`, move semantics to real wrapper elements; delete the `mixStage.ts:122` fallback | glass-ui + demo (19 files) |
| **F-2** | MAJOR | 100% of demo import-boundary eslint rules glob the deleted `demo/@` tree; subject resolves `no-restricted-imports: undefined` | re-aim globs at the live tree; restate as path zones; CI-assert every glob matches ≥1 file | `eslint.config.js` |
| **F-3** | MAJOR | `tsconfig.demo.json#paths` shadows `package.json#exports` — 29/38 demo import sites bypass the published surface; 3 phantom rows, 2 omissions | **delete** the `@mkbabb/value.js*` `paths` block; self-reference already resolves all seven (proven) | `tsconfig.demo.json` |
| **F-4** | MAJOR | `MixResult`→clipboard serializer duplicated in parent and child on two clipboard mechanisms; both discard `{ok:false,reason}` | one serializer on the model; `MixResultDisplay` emits `copy`; `MixPane` owns the single clipboard seat and reports failure once | `mix/` + `usePaneRouter.ts` |
| **F-5** | MAJOR | `MixResult` is an optional bag, not a discriminated union → 10 masking fallbacks across 3 files | discriminate on `type`; all ten delete themselves under `strict` + `exactOptionalPropertyTypes` | `mix/mix-result.ts` |
| **F-6** | MAJOR | 4th hand-rolled `palette → linear-gradient` strip; `PreviewRamp` owns the concept; 1-colour case emits invalid CSS | widen `PreviewRamp`, mount at all four sites, delete the three inline builders | `color-chips/` + 3 workbenches |
| **F-7** | MINOR | weighted N-ary `mixColorSequence` homed in `demo/palettes/`, forcing `as unknown as` at the seam — *hypothesis, no reproduction* | promote to `src/color/` behind `./color`, typed on `SpaceId` | `src/color/` |
| **F-8** | MINOR | root-barrel `@mkbabb/glass-ui` for `useClipboard` while the same file uses two subpaths and a sibling already uses `/dom` | `@mkbabb/glass-ui/dom` here + 9 siblings | demo (10 files) |
| **F-9** | MINOR | dead `TransitionGroup` import; `<Transition>` three lines above proves it unnecessary | delete the import | `MixResultDisplay.vue:4` |
| **F-10** | INFO | 19 pass-through `demo/ui/*` barrels over the glass-ui root — indirection with zero added behaviour (edicts 3 + 4) | delete; import glass-ui subpaths directly | `demo/ui/` |

**Strongest defect: F-1.** Not a style objection. A published-surface contract the consumer
imagined; a runtime that silently agrees; a typechecker structurally unable to disagree; and a
masking fallback (`mixStage.ts:122-124`) that hid the consequence — with the result that the
component this seat was asked to audit **has never once rendered in the shipped application,
and no gate in the repo says so.**

---

## 6 · Evidence index

| # | artefact |
|---|---|
| E1 | `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, six props, hardcoded `<span>`, `aria-hidden` + `pointer-events:none` baked in, only `class`/`style` re-applied; `grep -c '$attrs'` → **0** |
| E2 | `…/dist/components/watercolor-dot/WatercolorDot.vue.d.ts` — the six-prop published surface |
| E3 | Live WebKit DOM of the add slot (`scratchpad/probe3.mjs` vs `localhost:9000/#/mix`): `ariaLabelHits: 0`, rendered as `<span … pointer-events: none>` |
| E4 | `scratchpad/probe.mjs` — Mix button `element is not enabled`; `.mix-plate` `present: false` |
| E5 | `npx eslint --print-config demo/workbenches/mix/MixResultDisplay.vue` → `no-restricted-imports: undefined`; `ls demo/@` → No such file or directory |
| E6 | `npx tsc -p tsconfig.demo.json --noEmit --traceResolution` — `/color` resolved via `paths` with **no** Package ID; `/css` resolved via `exports` **with** `@4.0.0`; counted 19+4+3+3 bypassed vs 9 exports-gated |
| E7 | `npx tsc -p tsconfig.demo.json --noEmit \| grep -E "TS2307\|TS2305" \| grep -c value.js` → **0** (the `paths`-deletion cure is safe) |
| E8 | `node_modules/@mkbabb/value.js@4.0.0` — a real registry install of the repo inside itself, contradicting `vite.config.ts:33` |
| E9 | `grep` census — 19 `WatercolorDot` files / 21 dead `tag=` / 11 dropped names / 7 dropped listeners; 5 independent `linear-gradient` builders; 37 glass-ui root-barrel imports; 19 `demo/ui/*` pass-through barrels |
| E10 | `ls -l dist/{glass-ui,dom,useClipboard-*}.js` → 25239 / 4179 / 1321 B |
| E11 | `shots/safari-desktop-light/mix.png` (read) + `REPORT.md` `/#/mix` rows — the plate is absent from all 60 captures |
| — | **Inherited, not re-run:** r2's jsdom SFC mount (`ANCHOR_COUNT=0` / `TITLE_COUNT=0` / `TAGATTR_COUNT=1`), its pasted `playwright … mix.spec.ts` RED, its esbuild barrel-vs-subpath delta (1895 vs 1077 B), its `git show f2c8f565` W44-migration diff, and its `touch-floor.css` compact-exclusion analysis. See `challenge-L-library.r2-prior.md`. |

Prior runs preserved at `challenge-L-library.r2-prior.md` and `challenge-L-library.prior-run.md`
in this directory. Related banked entries (independent seats, same F-1 family):
`docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md:4552, 5326, 5866, 20414`.
