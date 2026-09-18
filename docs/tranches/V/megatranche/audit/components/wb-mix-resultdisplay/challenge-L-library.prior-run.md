# CHALLENGE-L — library structure · `demo/workbenches/mix/MixResultDisplay.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (the 1M-context
variant), matching the explicit declaration under which this seat was spawned. Not
inherited, not undeclared.

---

## Verdict

**DEFECTIVE.** The premise holds, and harder than the brief implies. The component's
single most load-bearing structural act — publishing the mix convergence's landing
anchor as `data-mix-target` on a glass-ui `<WatercolorDot>` — **does not work and has
never worked** under glass-ui 7.0.0. The attribute never reaches the DOM. The canvas's
`querySelector` therefore always misses, always takes its invented-point fallback, and
the pigment drops land **251 px** from the well they are documented to land in —
visibly, on the *Mix button*.

That is not a rendering nit. It is the exact failure mode this seat exists to find: a
cross-module contract routed through a stringly-typed HTML attribute across a
third-party component boundary that discards attributes, with a masking fallback
downstream that converts the break into plausible-looking motion, and a typecheck gate
that is structurally blind to the whole class.

Nine further structural defects follow, five of them sharing two mechanisms.

---

## 1. The import trace

`MixResultDisplay.vue` has five imports. Every one traced to its home:

| # | line | specifier | home | verdict |
|---|------|-----------|------|---------|
| 1 | :2 | `@lucide/vue` | devDependency `^1.16.0` | OK |
| 2 | :3 | `@mkbabb/glass-ui/dock` | published subpath `./dock` | resolves; **wrong family** (L-6) |
| 3 | :4 | `vue` — `computed`, `TransitionGroup` | peer | `TransitionGroup` import is dead (L-9) |
| 4 | :5 | `@mkbabb/glass-ui` — `useClipboard` | **root barrel**; the symbol's real home is `./dom` | **dual path** (L-3) |
| 5 | :6 | `@mkbabb/glass-ui/watercolor-dot` | published subpath | resolves; **API does not exist** (L-1, L-2) |
| 6 | :7 | `./composables/useMixingState` — `type MixResult` | sibling composable | `import type` ✓ `verbatimModuleSyntax` satisfied |

No edge crosses feature → shell, component → boot, or demo → `src/` internal. **The
`@mkbabb/value.js` question is clean at this file**: the component imports the library
not at all; its transitive reach (`useMixingState.ts:19`) is
`import type { HueInterpolationMethod } from "@mkbabb/value.js/color"` — a *published*
subpath (`package.json#exports["./color"]`), the exact specifier a real consumer would
write. The demo-dogfood keystone holds here. The drift is one hop away and structural,
not local (L-8).

---

## 2. Defects

### L-1 · BLOCKER — the convergence anchor never exists. `data-mix-target` is discarded by the primitive it is stamped on.

`MixResultDisplay.vue:69` stamps `data-mix-target` on a `<WatercolorDot>`. Its own
docstring (`:14-16`) names this "the anchor the canvas convergence lands on".
`mixStage.ts:121` reads it:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };   // :122-124
```

glass-ui 7.0.0's `WatercolorDot` sets `inheritAttrs: false` and forwards **only**
`$attrs.class` and `$attrs.style`. From the shipped bundle
(`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`, decompiled):

```js
inheritAttrs: !1,
props: { color:{}, variant:{default:"solid"}, animate:{...}, cycleDuration:{...},
         range:{...}, seed:{default:""} },
setup(e) {
  let t = e, n = useAttrs(), c = computed(() => n.class), f = computed(() => n.style);
  ...
  return () => (openBlock(), createElementBlock("span", {
      "aria-hidden": "true",
      class: normalizeClass([c.value, "watercolor-swatch", ...]),
      "data-testid": "watercolor-swatch",
      "data-variant": e.variant,
      style: normalizeStyle([f.value, { ..., pointerEvents: "none", ... }])
  }, ...))
}
```

There is no `v-bind="$attrs"`. Every other fallthrough attribute and every listener is
dropped on the floor.

**Measured, live** (`localhost:9000/#/mix`, seeded localStorage, palettes mode, two
palettes selected, Mix clicked; per-frame DOM sampling for 700 ms across both the first
mix and a re-mix):

```
"mix1": { "everTarget": false,
          "first": [ {"t":30,"target":false,"plate":true,"ghostCls":true}, … ],
          "last":  {"t":701,"target":false,"plate":true,"ghostCls":true} }
"settled": { "plate": true, "target": false,
             "dots": [ { "tag":"SPAN",
                         "attrs":["data-v-292b9032","data-v-0f138735","aria-hidden",
                                  "class","data-testid","data-variant","style"] }, ×3 ] }
"mix2": { "everTarget": false, … }
```

`[data-mix-target]` is **never in the document** — not for one frame, not at settle, not
on re-mix. The plate *is* there (`plate: true`, `ghostCls: true`); only the anchor is
gone.

Geometry of the resulting miss, measured in pane-local coordinates at t≈120 ms:

```
rootClientWidth   510      rootScrollHeight  702
fallbackPoint     { x: 255,  y: 491.4 }        ← mixStage.ts:124, always taken
wellCenterLocal   { x:  61,  y: 650.5 }        ← where the well actually is
missDistancePx    251
mixBtnCenterLocal { x: 256,  y: 547.8 }
distToMixBtnPx    56
```

The screenshot confirms it visually: the purple convergence pool sits **on the "Mix"
button**, 56 px from its centre, while the dashed ghost well waits untouched 251 px
below-left. Reproduction script:
`…/scratchpad/L-wbmixresult-probe.mjs` and `…/scratchpad/L-geom.mjs`.

Everything MixResultDisplay's docstring claims at `:10-18` — "the plate stands as the
announced destination", "the anchor the canvas convergence lands on", "the silhouette
the pigment poured into is the silhouette the result wears" — is **inert prose**. The
one-clock machinery, the seeded-ghost/seeded-solid pairing, the `flush:"post"` timing
note at `useMixingAnimation.ts:169-170`: all of it is scaffolding around a joint that
was never connected.

**Mechanism.** A cross-module port expressed as a *stringly-typed DOM attribute*,
stamped on a **third-party** component whose attribute-forwarding policy the demo does
not control and cannot typecheck. Compounded by a **masking fallback** at
`mixStage.ts:122-124` that invents a plausible coordinate instead of failing — the
break renders as *slightly-wrong motion* rather than as nothing, which is why it
survived a shipped tranche.

**Cure (transposition, not patch).** Kill the DOM query. The anchor is a *typed port*:

```ts
// demo/workbenches/mix/mixAnchors.ts   (new — one file, no new shared/ dir)
export interface MixAnchors { well: Ref<HTMLElement | null>; }
export const MIX_ANCHORS_KEY: InjectionKey<MixAnchors> = Symbol("mix-anchors");
```

`MixPane` provides; `MixResultDisplay` binds `useTemplateRef("well")` to a plain
wrapper `<div>` **it owns** (never to the glass-ui dot — the dot is a paint, not an
anchor); `useMixingAnimation` injects and hands `collectStage` a real element.
`mixStage.collectStage` takes `target: HTMLElement` as a parameter and loses its
`querySelector` and its invented-point branch entirely. When there is no anchor,
`arm()` settles honestly — that path already exists at `useMixingAnimation.ts:148-154`
and is the correct one. This also fixes `[data-mix-source]` (same disease, same file,
`mixStage.ts:129`).

---

### L-2 · MAJOR — `tag` is a prop that does not exist. 21 call sites; the typecheck gate is blind to all of them.

`MixResultDisplay.vue:67`, `:81`, `:101` pass `tag="div"` to `<WatercolorDot>`.
`:103` passes `:title="color.css"`.

glass-ui 7.0.0's `WatercolorDot` props are exactly
`{ color, variant, animate, cycleDuration, range, seed }`
(`dist/components/watercolor-dot/WatercolorDot.vue.d.ts`). Measured:

```
$ grep -c 'tag' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js
0
$ grep -o 'o("[a-z]*"' node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js | sort | uniq -c
   2 o("span"
   1 o("svg"
```

Zero occurrences of the string `tag` in the entire shipped module. The root is always
`<span>`. `title` is dropped with the rest of `$attrs` — and could not surface anyway,
because the component hardcodes `pointerEvents: "none"` in its inline style. Live
confirmation is in L-1's `settled.dots` payload: the rendered attribute set is
`[data-v-*, aria-hidden, class, data-testid, data-variant, style]`. No `tag`. No
`title`.

Repo-wide census (AST-ish scan of `<WatercolorDot …>` openers in `demo/`):

```
WatercolorDot call sites passing a dead `tag` prop: 21
  demo/workbenches/mix/MixSourceSelector.vue:146, :164, :211
  demo/workbenches/mix/MixResultDisplay.vue:64, :79, :97
  demo/workbenches/generate/GenerateControls.vue:199
  demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:26
  demo/picker/controls/ComponentSliders/ConsoleRail.vue:57
  demo/shell/dock/Dock.vue:136, :138, :271
  demo/shared/ui/EmptyState.vue:45, :46, :47
  demo/color-session/ColorSpaceSelector.vue:81
  demo/palettes/browser/card/SwatchHoverMenu.vue:14, :29
  demo/palettes/browser/card/CurrentPaletteEditor.vue:62, :64, :95
```

(`MixResultDisplay.vue:94`'s `tag="div"` is on `<TransitionGroup>` — that one is a real
Vue built-in prop and is correct. It is also the reason the dead ones read as normal.)

And the gate:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
EXIT=0        (0 lines of output)
```

**Fully green.** Vue treats unknown component attributes as fallthrough attrs, so no
compiler in this repo can distinguish "a prop that does something" from "a string
appended to nothing". The demo has been writing against a `WatercolorDot` API that
7.0.0 does not have, and every gate said yes.

**Mechanism.** Consumer-side ownership of a producer-side render seam, with no
compile-time contract. This is a **glass-ui-owned** repair under edict 4, not a demo
patch.

**Cure.** glass-ui restores the host seam its sibling primitives already publish:
`DockControl` exposes `as` / `asChild` (reka `Primitive`) and `WatercolorDot` should
too, plus `v-bind="$attrs"` on the root and `pointer-events` driven by whether an
interactive host was requested. Relay to the glass-ui BH inbox (standing formation
invariant). Until then the demo deletes 21 dead props rather than leaving them as
false documentation. Note that L-1's cure removes MixResultDisplay's *need* for a host
seam entirely — the anchor moves to a wrapper the demo owns.

---

### L-3 · MAJOR — one concept, two implementations, two import paths, inside one feature directory.

"Copy the mix result" exists twice:

```
MixResultDisplay.vue:31   const { status, copy } = useClipboard({ resetMs: 1500 });
MixResultDisplay.vue:42-47 async function onCopy() {
                             const text = result.type === "color"
                                 ? result.css ?? ""
                                 : result.colors?.map(c => c.css).join(", ") ?? "";
                             await copy(text); }

MixPane.vue:12            import { writeClipboard } from "@mkbabb/glass-ui";
MixPane.vue:49-55         async function copyResult() {
                             const text = mixResult.value.type === "color"
                                 ? mixResult.value.css ?? ""
                                 : mixResult.value.colors?.map(c => c.css).join(", ") ?? "";
                             await writeClipboard(text); }
MixPane.vue:57            defineExpose({ clearSelection, startMix, copyResult });
```

Both live. The second is reachable from the command palette:

```
demo/shell/usePaneRouter.ts:222
  { key:"copy", icon:Copy, title:"Copy result", …, handler: () => paneRefs.mix.value?.copyResult?.() }
```

So the *same user intent* takes two code paths with two different feedback contracts:
the in-plate button flips to a check for 1500 ms; the palette command gives nothing.
The `MixResult → string` serialization is written twice, character-identical modulo the
`.value`.

Layered on top, an import-granularity split: `useClipboard` and `writeClipboard` both
live in `dist/composables/dom/useClipboard.d.ts`, published at
`@mkbabb/glass-ui/dom` — and the sibling file `useMixingAnimation.ts:41` already
imports `useBreakpoint` from `@mkbabb/glass-ui/dom`. Same physical home, two specifiers,
same directory.

**Cure.** `mixResultToText(result: MixResult): string` lives beside the type;
`useMixingState` owns *one* `useClipboard` and returns `{ copyStatus, copyResult }`;
the plate renders `copyStatus`; `MixPane.defineExpose` re-exports the same function.
One home per concept, one specifier (`@mkbabb/glass-ui/dom`).

---

### L-4 · MAJOR — the primitive hands the component a named failure channel and the component throws it away.

`MixResultDisplay.vue:46` — `await copy(text);` — discards the return value.
glass-ui documents this return as the point of the primitive
(`dist/composables/dom/useClipboard.d.ts`):

> "Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy
> boolean" … "A failed copy always names its channel."

`CopyResult = { ok: true } | { ok: false; reason: "clipboard-api" | "no-api" }`, and
`UseClipboardOptions` also offers `onCopyError`. The component uses neither. `:32`
reads `copied = status.value === "success"`, so `status === "failure"` renders
**pixel-identical to idle** — the user sees the copy icon not change and cannot tell a
failure from a mis-click. On Safari, where clipboard writes outside a user-gesture
chain reject, this is the live case, not a theoretical one.

**Mechanism.** Masking fallback (edict 2) — the library was upgraded to be
failure-explicit and the consumer stayed failure-silent.

**Cure.** `const res = await copy(text); if (!res.ok) …` with the plate's own
three-state affordance (idle / copied / failed), or pass `onCopyError`. This is the
`value.js` house idiom (`Result`-shaped, `mixStage.ts:106` already does
`if (!result.ok) throw`) — the component is the odd one out in its own repo.

---

### L-5 · MAJOR — `MixResult` is a union that is not discriminated, and every consumer pays for it.

```ts
// useMixingState.ts:32-36
export interface MixResult {
    type: MixResultType;        // "color" | "palette"
    css?: string;
    colors?: PaletteColor[];
}
```

The type permits `{ type:"color", colors:[…] }` and `{ type:"palette" }` — states the
producer never emits (`:90`, `:97`) but the type cannot forbid. The tax, counted:

| site | cost |
|---|---|
| `MixResultDisplay.vue:37-39` | `result.css ?? "var(--muted-foreground)"` and `result.colors?.[0]?.css ?? …` |
| `MixResultDisplay.vue:44-45` | two more `??` in `onCopy` |
| `MixResultDisplay.vue:78` | `v-if="result.type === 'color' && result.css"` — re-guard |
| `MixResultDisplay.vue:91` | `v-if="result.type === 'palette' && result.colors"` — re-guard |
| `MixPane.vue:41, :44, :52, :53` | four more |
| `useMixingAnimation.ts:78, :81` | two more |

Ten `??`/`?.` masking operators and four re-guards to defend against states the machine
cannot produce. `wellColor`'s `?? "var(--muted-foreground)"` (`:39`) will paint a grey
dot for an impossible input — a fallback that hides a bug rather than surfacing one
(edict 2).

**Cure.**

```ts
export type MixResult =
    | { kind: "color";   css: string }
    | { kind: "palette"; colors: PaletteColor[] };
```

`v-if="result.kind === 'color'"` narrows; every `??` and every re-guard deletes itself;
`v-if="ghost"`'s sizing ternary (`:71`) reads the discriminant directly. Fourteen
defensive constructs become zero.

---

### L-6 · MAJOR — dock primitives in a plate with no dock: a 28×28 hit box where the primitive promises ≥44.

`MixResultDisplay.vue:120-143` builds its action row from `DockControl compact` ×3 and
`DockSeparator`, inside `.mix-plate` — a card fixture with no `.glass-dock` ancestor.

`DockControl`'s own docstring states the contract it is being used outside of:

> "the HIT CELL stays the full `--dock-control-size` (**≥44px on coarse** via the
> density clamp) — hit box ≠ paint box"

Measured inside the plate:

```
dockControlSizeToken : "(unset)"          ← --dock-control-size does not resolve here
actionButtons        : [ {title:"Copy color",     ariaLabel:null, w:28, h:28},
                         {title:"Save to palettes",ariaLabel:null, w:28, h:28},
                         {title:"Reset",           ariaLabel:null, w:28, h:28} ]
separators           : 1
```

**28×28 px** — 40 % of the WCAG 2.5.8 / owner tap-target bar, because the density clamp
lives on the dock root and there is no dock root. `DockSeparator` likewise resolves its
axis through `useOptionalDockContext()` and silently defaults to horizontal. The
primitives are *published* on `./dock` and they *render*, but their guarantees are
dock-scoped and this is not a dock. (The mega-tranche visual audit reports
`smallTapTargets: 8` on `/#/mix` in every matrix — those are the pane's other controls;
these three are additional, because the audit never mixed anything, see L-10.)

**Cure.** glass-ui publishes `./button` — an icon register with no dock dependency.
Either use it, or (edict 4, the better fix) glass-ui moves the ≥44 coarse clamp onto
`DockControl` itself so the guarantee travels with the component rather than with its
ancestor. Relay to the BH inbox with L-2.

---

### L-7 · MINOR — `demo/ui/` is a 19-barrel shadow namespace over glass-ui; both paths are alive inside this one feature.

```
$ cat demo/ui/card/index.ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

All nineteen `demo/ui/*` barrels are pure re-exports of glass-ui (alert, avatar, badge,
button, card, checkbox, collapsible, dialog, dropdown-menu, input, label, popover,
radio-group, select, separator, skeleton, slider, switch, tooltip). They are aliases —
exactly the legacy shim edict 2 forbids and edict 3 calls contrivance.

The dual path is live *within this component's directory*:
`MixPane.vue:3` → `import { Card } from "../../ui/card"` (shim → glass-ui **root**),
`MixResultDisplay.vue:3` → `import { DockControl } from "@mkbabb/glass-ui/dock"`
(subpath). Two spellings of the same design system, one feature, adjacent files.

**Cure.** Delete `demo/ui/` wholesale; rewrite ~N imports to the glass-ui subpaths.
The barrels carry no code — this is a mechanical rename with zero behavioural risk, and
it collapses a whole namespace.

---

### L-8 · MINOR — `tsconfig.demo.json` `paths` has drifted from `package.json#exports`; the Vite half was made drift-proof and the TS half was not.

`vite.config.ts:39-49` **generates** its value.js self-alias set from
`package.json#exports` precisely so it cannot drift, with a long comment saying so.
`tsconfig.demo.json` was left hand-rolled, and has:

| declared in tsconfig | in `exports`? | file exists? |
|---|---|---|
| `@mkbabb/value.js` → `dist/index.d.ts` | **no** | **no** |
| `@mkbabb/value.js/color` | yes | yes |
| `@mkbabb/value.js/parsing` | **no** | **no** |
| `@mkbabb/value.js/math` | yes | yes |
| `@mkbabb/value.js/easing` | yes | yes |
| `@mkbabb/value.js/units` | **no** | **no** |
| `@mkbabb/value.js/transform` | yes | yes |
| `@mkbabb/value.js/quantize` | yes | yes |
| — | `./value` **missing from tsconfig** | yes |
| — | `./css` **missing from tsconfig** (10 demo import sites) | yes |

```
$ ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: … No such file or directory   (×3)
```

The two *real* subpaths with no `paths` entry resolve anyway — traced:

```
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'
'paths' option is specified, looking for a pattern to match … (no match)
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
======== … successfully resolved to '…/dist/subpaths/css.d.ts' with Package ID '…@4.0.0'
```

TypeScript's **package self-reference** through the repo's own `exports` map already
does the right thing. This component's chain crosses the boundary at
`useMixingState.ts:19` (`/color`, mapped) and `useMixingState.ts:23` →
`color-session/picker-color` → `@mkbabb/value.js/css` (unmapped, self-referenced).

Three of eight entries point at files that do not exist; two published keys are absent;
the map that Vite refuses to hand-maintain is hand-maintained here.

**Cure.** Delete the `@mkbabb/value.js*` block from `tsconfig.demo.json` entirely. Self-
reference resolution is *proved working* above, it reads the same `exports` map Vite
generates from, and the drift surface goes to zero — the strictly better structural
posture than mirroring the map twice.

---

### L-9 · MINOR — one Vue built-in imported, its sibling not.

`:4` imports `TransitionGroup`; `:60` uses `<Transition>` with no import. Vue resolves
both built-ins without any import, so `TransitionGroup` at `:4` is dead weight and the
asymmetry is the tell that neither was a decision. Delete it.

---

### L-10 · MAJOR — this component is currently unreachable for a first-time visitor, by the same mechanism as L-2.

Not this file's defect, but it decides whether this file ships. `MixSourceSelector.vue:164-176`
renders the "Add current color to the mix" affordance as
`<WatercolorDot tag="button" @click="addCurrentColor" aria-label="…" :disabled="…">`.
Per L-2, `WatercolorDot` drops `$attrs` **including listeners** and hardcodes
`pointer-events: none`. Measured on a clean profile:

```
addSlot: { tagName: "SPAN",
           pointerEvents: "none",
           attrs: ["data-v-292b9032","data-v-a3e86846","aria-hidden","class",
                   "data-testid","data-variant","style"] }
```

No `aria-label`, no listener, no `disabled`, not a button, `aria-hidden="true"`,
pointer-events off. Playwright's real click times out:
`<html lang="en" dir="ltr">…</html> intercepts pointer events`. Programmatic
`.click()` ×2 → `sourcesAfterSelect: 0`, `mixBtnDisabled: true`.

Consequence for **this** component: on a clean profile, Colors mode cannot accept a
colour and Palettes mode is empty, so `canMix` never turns true, so `mixResult` stays
`null`, so **`MixResultDisplay` never mounts.** That is why the 60-capture mega-tranche
visual audit contains no row that exercises it — `/#/mix` reports `text: 186` desktop /
`118` mobile with zero blank flags, all of it the selector and config bar. The result
plate is un-audited because it is currently un-reachable.

(I reached it only by seeding `localStorage["color-palettes"]` with two palettes via
`addInitScript`, then using Palettes mode.)

---

## 3. The lattice I would build greenfield

Today the mix feature is three concerns fused into one composable plus a DOM-attribute
side channel:

```
useMixingState.ts (138 L)   ← selection state + colour math + phase machine + THE TYPES
MixResultDisplay.vue        ← render + clipboard + DOM-attribute anchor + result serialization
MixPane.vue                 ← orchestration + a SECOND clipboard + a SECOND serialization
mixStage.ts                 ← geometry + querySelector into a tree it does not own
```

Not a god module by line count — a god module by *concept count*. `useMixingState` is
the single home for four unrelated things, and the two things that genuinely need a
shared vocabulary (the result shape, the anchor) are the two that have no home at all.

Greenfield:

```
demo/workbenches/mix/
├── mix.ts              PURE. `type MixResult` (discriminated, L-5) ·
│                       `mixResultToText()` (L-3) · `runMix(inputs): MixResult`.
│                       Zero Vue. Unit-testable without a DOM. Owns the vocabulary
│                       three modules currently re-derive.
├── mixAnchors.ts       The typed port (L-1): `MIX_ANCHORS_KEY: InjectionKey<{
│                       well: Ref<HTMLElement|null>; sources: Ref<HTMLElement[]> }>`.
│                       Replaces every `data-mix-*` attribute and every querySelector.
├── useMixSelection.ts  Selection only: colors/palettes in, add/remove/clear.
├── useMixPhase.ts      idle→mixing→done + the ONE clipboard (L-3/L-4), nothing else.
├── MixPane.vue         Composition root. Provides the anchors. Exposes ONE copyResult.
├── MixSourceSelector.vue   Stamps `sources` on the port; real `<button>` hosts.
├── MixResultDisplay.vue    Pure presentation. Binds `useTemplateRef("well")` to a
│                           wrapper IT owns; renders `copyStatus`; emits save/reset.
│                           No clipboard logic, no serialization, no `??`.
└── MixAnimationCanvas/     Injects the anchors. `collectStage(target: HTMLElement,
                            sources: HTMLElement[], …)` — no DOM search, no invented
                            fallback; missing anchor ⇒ settle honestly.
```

Four structural inversions, each removing a defect class rather than an instance:

1. **The anchor becomes a value, not a string.** `InjectionKey<Ref<HTMLElement|null>>`
   is checked by `tsc`; `"[data-mix-target]"` is checked by nothing. L-1 becomes
   uncompilable.
2. **The result type becomes a discriminated union.** Fourteen defensive constructs
   across three files delete themselves; the impossible states stop being
   representable. L-5 becomes uncompilable.
3. **The clipboard has one home.** One `useClipboard` in `useMixPhase`, one
   `mixResultToText` in `mix.ts`; the plate and the command palette are two *views* of
   one action, not two actions. L-3 and L-4 collapse into one correct path.
4. **The design system has one address.** `demo/ui/` deleted (L-7); every glass-ui
   symbol imported from its narrow subpath (`/dom`, `/button`, `/watercolor-dot`); the
   `tsconfig.demo.json` value.js `paths` block deleted in favour of the self-reference
   the compiler already performs (L-8).

Two items leave the repo entirely, as glass-ui work under edict 4: `WatercolorDot`
needs an `as`/`asChild` seam and `v-bind="$attrs"` (L-2, L-10); `DockControl` needs its
≥44 px coarse clamp to travel with the component rather than with a dock ancestor
(L-6). Both belong in the glass-ui BH relay, not in a demo patch.

---

## 4. Evidence index

| artefact | path |
|---|---|
| anchor + settle probe (L-1, L-2, L-6, L-10) | `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/L-wbmixresult-probe.mjs` |
| miss-geometry probe (L-1, L-6) | `…/scratchpad/L-geom.mjs` |
| settled-plate screenshot (pool on the Mix button) | `…/scratchpad/L-mix-settled.png` |
| clean-profile probe (L-10) | `…/scratchpad/probe-mix-target.mjs` |
| demo typecheck, green (L-2) | `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`, 0 lines |
| TS resolution trace (L-8) | `npx tsc -p tsconfig.demo.json --noEmit --traceResolution` |

**No source edits were made. Nothing outside this directory was written.**
