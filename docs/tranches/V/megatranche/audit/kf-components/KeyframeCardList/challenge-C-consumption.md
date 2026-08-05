claude-opus-5[1m]

# Challenge · `KeyframeCardList.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframeCardList.vue` (82 lines)
**Axis:** how this component consumes **keyframes.js** (the library under test) and **glass-ui** (the design system) — subpath choice, shadow components, value.js transitive exposure, props/emits contract, sibling seams.
**Mode:** static, read-only. No installs, no dev server, no browser. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Prior:** DEFECTIVE until the tree proves otherwise. A false defect is worse than a missed one — every claim carries its falsifier.

**Folded corpus:** `formation/keyframes/lane-frontend.md` (F-1 phantom glass-ui dep; S-1..S-8 shadow census; §3.1 subpath utilisation 21/73; F-6 clean reka boundary) and `lane-library.md` (parse seams). Overlaps cited by id; no contradiction of either lane was found — §3.1's root-barrel count and F-1's reachability are **corroborated** here at a specific line.

---

## 0. Verdict

| | count |
|---|---|
| **Defects** | 10 |
| **BLOCKER** | 1 |
| **MAJOR** | 3 |
| **MINOR** | 4 |
| **INFO** | 2 |
| **Superlatives** | 3 |

The component is a thin (82-line) index-pairing wrapper, and its *architectural* consumption is genuinely good — barrel-only library access, a declared child-ref contract that retired a document-wide DOM sweep, an honest comment about engine-chunk purity that survives verification (§3). But its **data** consumption is broken at the seam where keyframes.js hands it a value.js type: it serializes a `KeyframeSelector` with `Object.prototype.toString`, and the demo's own `selectorText` — asserted by the demo's own value.js-4 boundary test — sits unimported two directories away.

---

## 1. What the component consumes

| edge | line | specifier | class |
|---|---|---|---|
| keyframes.js runtime | `:30` | `loadAnimationEngine` from `@mkbabb/keyframes.js` | LIGHT barrel, dynamic heavy accessor — **correct boundary** |
| glass-ui component | `:29` | `Separator` from `@mkbabb/glass-ui` | **root barrel** (a `./separator` subpath exists — D-7) |
| sibling component | `:31` | `../KeyframeCard.vue` | relative, in-cluster |
| vue | `:28` | `computed, ref, shallowRef` | — |
| **value.js, direct** | — | **none** | superlative S-C |
| **`@src/*` deep** | — | **none** | superlative S-C |

Transitive value.js exposure is **structural, not by import**: the component's `frames` prop carries `TemplateAnimationFrame<V>[]`, whose `start` field is typed `KeyframeSelector` — a **value.js** type (`@mkbabb/value.js/css`) re-exported through keyframes.js's light barrel (`src/animation/constants/types.ts:18,66`). That transitive type is where D-1 lives.

---

## 2. Defects

### D-1 · BLOCKER — `frames[i].start.toString()` renders `[object Object]`; the keyframe-offset field is dead end-to-end

`KeyframeCardList.vue:11`

```
:frame-start="frames[i].start.toString()"
```

`start` is not a scalar. It is a value.js discriminated union:

- `src/animation/constants/types.ts:66` — `TemplateAnimationFrame.start: KeyframeSelector`
- `node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts:210-217` —
  `KeyframeSelector = Readonly<{kind:"percent"; value:number}> | Readonly<{kind:"named"; name:…; offset?:number}>`
- runtime confirms plain object literals, no prototype, no `toString`:
  `node_modules/@mkbabb/value.js/dist/subpaths/css.js:484-495` → `return b({ kind: "percent", value: t / 100 })`

There is **no numeric escape hatch**. `addFrame` normalizes a numeric input to a string *before* parsing, so `start` is an object on every path:

```
src/animation/compile/frame-compiler.ts:134   if (typeof start === "number") start = `${start}%`;
src/animation/compile/frame-compiler.ts:145-6 const parsedStart = typeof start === "string" ? parseKeyframeSelector(start) : start;
src/animation/compile/frame-compiler.ts:150   start: parsedStart,
```

Therefore `frames[i].start.toString()` is `Object.prototype.toString.call({})` → **`"[object Object]"`**.

**The demo already owns the correct serializer, and its own test asserts it.**

```
demo/utils/keyframeSelector.ts:7-12
  export const selectorText = (selector: KeyframeSelector): string =>
      selector.kind === "percent" ? `${selector.value * 100}%` : …
demo/utils/keyframeSelector.ts:28-30   selectorPercent(selector): number
```

Used correctly by the sibling composable — `demo/components/instrument/keyframes/composables/useKeyframeOps.ts:9,111` (`selectorText(start)`), and pinned by the demo's **value.js-4 editor-boundary test**:

```
test/demo/instrument/value4-editor-boundary.test.ts:19-27
  expect(requireKeyframeSelector("from")).toEqual({ kind: "percent", value: 0 });
  expect(selectorText(named)).toBe("entry 50%");
```

The test asserts the exact structural shape whose `.toString()` is `[object Object]`. `KeyframeCardList.vue:11` is the **one render-side consumer of `templateFrames[i].start`** and it bypasses all three helpers.

**Blast radius — three live surfaces:**

1. `KeyframeCard.vue:5` — `<Input :model-value="frameStart">` — the editable offset field displays `[object Object]`.
2. `KeyframeCard.vue:36-38` — the `s {{ frameStart }}` readout label.
3. **The write path is severed.** `KeyframesEditor.vue:186-193` handles the edit with
   `const parsed = parseCssScalar(val)` — value.js's scalar grammar — and on failure raises
   `toast.error("Invalid keyframe offset")`. Seeded with `"[object Object]"`, any edit derived from
   the displayed value fails `parseCssScalar`. The round trip was designed for `selectorText`'s
   `"50%"` output (which `parseCssScalar` accepts); `.toString()` breaks both halves at once.

**Provenance of the regression:** `git blame -L 9,12` dates line 11 to `905a8c360` (2026-06-05), predating the named-selector migration that introduced `KeyframeSelector` (`namedSelectorToFraction` lands in the `4b0cc171`/`40834d26` R-wave carve). The line was correct when `start` was a percent number and was never re-audited when the field became a union. `frames: any[]` (D-2) is why no gate noticed.

**Falsifier.** Any one of these kills the claim: (a) `KeyframeSelector` instances carry a custom `toString` — refuted, they are object literals from `css.js:484-495`; (b) `templateFrames[i].start` is a number or string at runtime — refuted by `frame-compiler.ts:134-150`, which parses unconditionally; (c) `KeyframesEditor` passes something other than `animation.templateFrames` — refuted, `KeyframesEditor.vue:15,26` `:frames="animation.templateFrames"`; (d) glass-ui `Input` coerces a non-string `model-value` — inapplicable, the template already stringified it.
`UNPROVEN-NEEDS-LIVE`: only the *pixel* — the literal `[object Object]` glyph in the card — awaits SS-13. The value is proven; the render is deduced.

---

### D-2 · MAJOR — `frames: any[]` declines the library's own exported, zero-cost type

`KeyframeCardList.vue:33-36`

```ts
const props = defineProps<{
    frameStrings: string[];
    frames: any[];
}>();
```

keyframes.js exports the exact type, **from the LIGHT barrel, type-only**, under a header that names this precise use:

```
src/animation/index.ts:154-170
  // ── TYPE surface (erased; no runtime edge) ─────────────────────────────
  // The animation-domain types consumers should prefer over redefining their own.
  export type { …, TemplateAnimationFrame, … } from "./constants/types";
```

`constants/types.ts` is `import type`-pure by construction and gated by `proof:boundary`'s S.B1 clause (`constants/types.ts:1-16`), so `import type { TemplateAnimationFrame } from "@mkbabb/keyframes.js"` adds **zero** runtime edge and **cannot** drag value.js onto the light graph. There is no cost to decline.

The cost of `any[]` is concrete: it erases the shape of `.start` (the D-1 union), of `.id` (line 5), and of the length contract (D-3) — the component is the demo's own dogfood surface and it consumes the library's data structure as untyped.

**Honest limit — I do not claim tsc would have caught D-1.** `.toString()` is valid on `object`, so a correctly-typed `start` still compiles. The claim is narrower and still real: `any[]` removes the *only* static signal that `start` is a discriminated union rather than a scalar, in a file whose one job is to project that field.

**Falsifier.** If `TemplateAnimationFrame` were not exported from the light barrel, or if importing it pulled a value.js runtime edge, `any[]` would be a forced workaround. Both refuted (`index.ts:165`; `constants/types.ts:1-16`).

---

### D-3 · MAJOR — the index pairing is guarded on one line and unguarded on the next

`KeyframeCardList.vue:3-11`

```
v-for="(s, i) in frameStrings"        ← iterates array A
:key="frames[i]?.id ?? i"             ← array B, GUARDED
:frame-start="frames[i].start…"       ← array B, UNGUARDED
```

The component iterates `frameStrings` and indexes `frames`. Line 5 asserts, by writing `?.`, that `frames[i]` may be `undefined`. Line 11 then dereferences it. If line 5's guard is warranted, line 11 throws `TypeError: Cannot read properties of undefined (reading 'start')` **inside the render function** — a whole-subtree render failure, not a blank card.

The two arrays are independently sourced and updated on different clocks:

| array | source | update |
|---|---|---|
| `frames` | `animation.templateFrames` (`KeyframesEditor.vue:15,26`) | **synchronous** — `useKeyframeOps.ts:202-204` reassigns via `.filter()` |
| `frameStrings` | `state.templateFrameStrings` (a real `ref`, `useKeyframesState.ts:25`) | **three awaits deep** — `useKeyframesParsing.ts:48-54`: `await loadAnimationEngine()` → `await CSSKeyframesToStrings()` → `await Promise.all(map(formatEditorCSS))`, and `formatEditorCSS` itself dynamic-imports prettier (`demo/utils/formatEditorCSS.ts:5-8`) |

`updateAllStrings` carries **no generation token and no abort** (`useKeyframesParsing.ts:48-60`). Concrete reachable interleaving:

1. A slider drag fires `updateAllStringsAndAnimation()` (`KeyframesEditor.vue:45`) → call **A** begins, N stops in flight.
2. The user clicks a card's ✕ → `removeKeyframe` (`KeyframesEditor.vue:232-250`) **awaits a real removal animation** (`AnimationGroup.of(…).play()`, `:244-247`) — a wide, deterministic window for A.
3. `removeKeyframeData` → `templateFrames` becomes **N−1** synchronously (`useKeyframeOps.ts:202`).
4. A's `Promise.all` resolves late and writes `templateFrameStrings.value = <N strings>` (`useKeyframesParsing.ts:52`). That ref write **is itself the render trigger** → render with `frameStrings.length === N`, `frames.length === N−1` → `frames[N-1]` is `undefined` → `.start` throws.

Note the author of the *parsing* composable saw this hazard and defended the watch against it — `useKeyframesParsing.ts:86-95` reasons explicitly about "the derived strings … reprojecting off a half-applied array between the mutation and the render barrier" and adds `flush:"post"` + `nextTick`. The render barrier itself is exactly where the component drops the guard.

**Falsifier.** The claim dies if every path that shortens `templateFrames` is serialized against every in-flight `updateAllStrings` — i.e. if a cancellation token, an in-flight guard, or a single-writer queue exists. I read all four editor composables (`useKeyframesEditor.ts`, `useKeyframesParsing.ts`, `useKeyframeOps.ts`, `useKeyframesState.ts`): there is none. It also dies if `frameStrings` can never exceed `frames` in length — refuted by the stale-write in step 4. The *guard asymmetry* (line 5 vs line 11) is unconditional and holds regardless of the race's reachability.
`UNPROVEN-NEEDS-LIVE`: the race's real-world hit rate.

---

### D-4 · MAJOR — index-keyed inline function refs corrupt the exposed `cardRefs` / `getPreElements()` contract on every non-tail removal

`KeyframeCardList.vue:8, 64-81`

```
:ref="(el: any) => setCardRef(i, el)"        ← a NEW arrow every render, closing over the render-time i
const setCardRef = (i, el) => { cardInstances.value[i] = el; }   ← index-assign only; never truncated
```

Two facts from the installed Vue (3.5.x, `node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js`):

1. **`setRef` never nulls a *function* old-ref on patch.** Lines `1803-1817` unset only `isString(oldRef)` and `isRef(oldRef)`; the function branch at `1818-1819` only *sets* the new value. So a re-rendered card's stale slot is never cleared by the patch.
2. **Unmount *does* call the removed vnode's closure with `null`** (`setRef(..., isUnmount=true)` → `value = null` at `:1766` → `ref(null)` at `:1819`), and in `patchKeyedChildren` the unmount loop runs **after** both sync loops have re-registered the survivors.

Trace, removing the head of `[id0,id1,id2]` (keys are `frames[i].id`, line 5):

| step | effect on `cardInstances` |
|---|---|
| sync-from-end patches `id2` (old i=2 → new i=1) | `[…, card_id2, stale_id2]` — index 1 set; index 2 left stale |
| sync-from-end patches `id1` (old i=1 → new i=0) | index 0 ← `card_id1` |
| unmount `id0` (closure i=**0**) | index 0 ← **`null`** — clobbers the card just written |

Result `[null, card_id2, stale_unmounted]`: length 3 for 2 rendered cards, the **first live card's ref is null**, and a detached instance is retained. Because removal always shifts survivors left, the removed index `k` always collides with the survivor that just took slot `k` — **every non-tail removal nulls a live ref**. Tail removal nulls the correct slot but still leaves `cardInstances.length > frames.length` (nothing ever truncates: no `splice`, no `.length =` in the 82 lines).

Consequences at the two exposed consumers:

- `getPreElements()` (`:76-79`) filters the `null`, so the highlight set silently **omits the card at the nulled index** and **includes a detached `<pre>`**. Fed straight to `useCodeHighlight` (`KeyframesEditor.vue:176-178`). Newly-rendered content landing in a nulled slot never highlights.
- `cardRefs` (`:70-72`) is read **positionally** by the parent's removal animation (`KeyframesEditor.vue:237-240`): `el1 = cards[frameIx]` can be `null`, and `el2` is chosen off the inflated `cards.length - 1`, so it can select the stale slot. `presets.warpLeft().setTargets(null)` does **not** throw — `setTargets` (`src/animation/engine/animation.ts:465-472`) → `bindTargets` (`src/animation/resolve/element-resolve.ts:136-148`) is null-tolerant, and `buildElementAwareEnv` returns `undefined` on a null target (`:171-172`). So the failure mode is a **silent no-op removal animation**, not a crash. Severity held at MAJOR for that reason.

The order-independent consumption idiom is a `Map` keyed by `frames[i].id` (the key the `v-for` already uses) rather than by render index; the file's own sibling uses the modern seam correctly (`KeyframeCard.vue:78` `useTemplateRef`).

**Falsifier.** The claim dies if Vue nulls function old-refs during patch (it does not — `:1803-1817` handles only string and ref), or if `patchKeyedChildren` unmounts *before* the sync loops (it does not — the `i > e2` unmount loop follows both), or if anything truncates `cardInstances` (nothing does — the whole file is above). A `key` that is not position-stable would change the trace; the key here is `frames[i]?.id ?? i`, and `id` is a stable content-derived counter (`frame-compiler.ts:149,167`).
`UNPROVEN-NEEDS-LIVE`: the visible "removal animation did nothing" symptom.

---

### D-5 · MINOR — an async engine accessor where the demo's own *synchronous* one is already a hard precondition upstream

`KeyframeCardList.vue:38-52`

```ts
const formatFn = shallowRef<((keyframe: string) => string) | null>(null);
void loadAnimationEngine().then((engine) => { formatFn.value = engine.formatCSSKeyframeString; });
const formattedStrings = computed(() => props.frameStrings.map((s) => (formatFn.value ? formatFn.value(s) : s)));
```

The demo has exactly one ergonomic seam for this and its own parent uses it:

```
demo/kf-engine.ts:49-56    kfEngine(): AnimationEngine   — SYNCHRONOUS, throws if read before the warm
demo/app/main.ts:30,50-52  void Promise.all([warmKfEngine()…]).finally(() => app.mount("#app"))
KeyframesEditor.vue:130    const { CSSKeyframesAnimation, AnimationGroup, presets } = kfEngine();
```

`KeyframesEditor` reads `kfEngine()` at `<script setup>` top level. If the warm has not resolved, **the parent throws before this child ever mounts**. So by construction, at every moment `KeyframeCardList` exists, the resolved engine is in hand synchronously — the `shallowRef` + `.then` + null-fallback branch + the 6-line justifying comment all defend a state that cannot occur beyond a single scheduler tick. `engine.formatCSSKeyframeString` is available on the same object the parent already destructured.

Two riders:

- **Un-handled rejection.** `void` (`:46`) suppresses the floating-promise lint but installs **no** rejection handler. `main.ts:50` deliberately swallows a failed warm (`warmKfEngine().catch(() => undefined)`) so "warm failed, app mounted" is a designed state; `loadAnimationEngine` memoizes, so the rejection is sticky. *Reachability caveat, stated against myself:* this component has exactly one consumer, and that consumer's `kfEngine()` throws first — so the unhandled rejection is **latent, not live**. Recorded as INFO-weight inside a MINOR.
- The comment's routing claim ("it lives in the engine chunk, so it rides `loadAnimationEngine()` rather than a deep `@src` import") is **correct and well-reasoned** — see S-B. The defect is the accessor choice, not the boundary reasoning.

**Falsifier.** The claim dies if `KeyframesEditor` can render while the warm is unresolved (it cannot — `kfEngine()` at `:130` throws, `kf-engine.ts:50-55`), or if `formatCSSKeyframeString` were absent from the `AnimationEngine` surface `kfEngine()` returns (it is present — `src/animation/load-engine.ts:54,109`).

---

### D-6 · MINOR — `Separator` consumed without `decorative`; N−1 semantic separators announced inside an editing surface

`KeyframeCardList.vue:19-22`

```html
<Separator class="w-full" v-if="i < frameStrings.length - 1" />
```

glass-ui 7.0.0's `Separator` defaults `decorative: false` (`node_modules/@mkbabb/glass-ui/dist/separator-qqQ_Er0U.js:12-15`), and the unlabelled branch forwards straight to reka-ui, whose `BaseSeparator` then emits `role: "separator"` (`node_modules/reka-ui/dist/component/BaseSeparator.js` — `semanticProps = props.decorative ? {role:"none"} : {"aria-orientation":…, role:"separator"}`).

The element is purely visual gap-marking between sibling cards in a `display:contents` grid — the textbook `decorative` case. As written, a screen-reader user traversing an N-stop animation hears N−1 separator announcements interleaved with N contenteditable regions. The fix is one prop; the design system already exposes it.

**Falsifier.** The claim dies if glass-ui overrides `decorative` to `true` by default (it does not — the prop block above), or if the separators are visually load-bearing group boundaries rather than gap marks (they are not — one unconditional `<Separator class="w-full">` between every adjacent pair, no grouping semantics anywhere in the file).
`UNPROVEN-NEEDS-LIVE`: the actual AT announcement.

---

### D-7 · MINOR — root-barrel import where a dedicated subpath exists

`KeyframeCardList.vue:29` — `import { Separator } from "@mkbabb/glass-ui";`

glass-ui 7.0.0 publishes **73** subpath exports and `./separator` is one of them (`node_modules/@mkbabb/glass-ui/package.json`). The root entry is `./dist/glass-ui.js` — the full re-export graph — and `sideEffects` is `["*.css"]`, so production tree-shaking recovers most of it, but the subpath contract exists precisely so a consumer names what it uses; the root import defeats it and inflates dev-server cold-start graph walk.

This **corroborates lane-frontend §3.1** (31 of 82 glass-ui import lines go through the root barrel, utilisation 21/73 ≈ 29%) with a named instance. The immediate sibling makes the inconsistency plain inside one cluster:

```
KeyframeCard.vue:57   import { Label } from "@mkbabb/glass-ui";          ← root
KeyframeCard.vue:58   import { Input } from "@mkbabb/glass-ui/forms";    ← subpath
```

**Falsifier.** The claim dies if `./separator` is absent from the installed exports map (it is present) or if the root barrel is the *documented* consumption idiom. No such doc was found; the demo's own dominant pattern is subpaths (`/tooltip`, `/forms`, `/dock`, `/dark`, `/easing`, … — §3.1).

---

### D-8 · MINOR — three payload key names for one positional concept across four sibling emits

`KeyframeCardList.vue:13-16, 54-59`

```ts
(e: "updateStart", val: { val: string;  index: number }): void;   // …{ val,   index }
(e: "updateCSS",   val: { value: string; index: number }): void;  // …{ value, index }
(e: "remove",      val: { event: Event;  index: number }): void;  // …{ event, index }
(e: "keydown",     event: KeyboardEvent): void;                   // …no index at all
```

The wrapper's sole contract job is to add `index` to the child's flat emits (`KeyframeCard.vue:69-74`, which are cleanly `val: string` / `val: string` / `event: Event`). On the way through it renames the payload three different ways, and the fourth event carries no index — the parent recovers the target from `e.target` instead (`KeyframesEditor.vue:218-230`). The parent's handlers then destructure three different shapes (`KeyframesEditor.vue:182, 213, 18`). Nothing breaks; the contract is simply not a contract.

**Falsifier.** The claim dies if the three names are semantically distinct — they are not: all three are "the child's payload", and the child names all three `val`/`event` uniformly.

---

### D-9 · INFO — census F-1 (phantom glass-ui dependency) is reachable at this file

`KeyframeCardList.vue:29` is one of the **42** files importing `@mkbabb/glass-ui`, which lane-frontend F-1 established is declared in **neither** `package.json` nor `package-lock.json` while 7.0.0 sits installed. Re-verified: `grep -n "mkbabb" package.json` yields only `"@mkbabb/value.js": "4.0.0"`. Under `npm ci` this import does not resolve. Recorded, not re-litigated — F-1 owns it, and it gates any repair wave touching this file.

---

### D-10 · INFO — two dead defensive branches

- `:10` `:formatted-c-s-s="formattedStrings[i] ?? s"` — `formattedStrings` is `props.frameStrings.map(…)` (`:50-52`), so index parity with `frameStrings` is structural. The `?? s` can never fire.
- `:71` `cardInstances.value.map((c) => c?.$el ?? c)` — `cardInstances` only ever receives a `KeyframeCard` component instance or `null` (`:8, 65-67`); a component instance always has `$el`, so `?? c` can only ever return the `null` that `c?.$el` already turned into `undefined`. Net effect: `null` where `undefined` would do.

Both are cheap, but in a file whose *real* index-pairing hazards are unguarded (D-3, D-4), defensive code aimed at impossible states is a misdirected signal.

**Falsifier.** `?? s` fires if `formattedStrings` could be shorter than `frameStrings` — impossible, it is a `.map` of it. `?? c` fires if a raw `HTMLElement` could land in `cardInstances` — impossible, the ref sits on a component (`:7-8`).

---

## 3. Superlatives (L-18 runs both ways)

### S-A · The child-ref contract that retired a document-wide DOM sweep — **exemplary**

`KeyframeCard.vue:76-80` exposes `preEl`; `KeyframeCardList.vue:74-81` collects those exposed refs into `getPreElements()` and exposes it; `KeyframesEditor.vue:176-178` hands it to `useCodeHighlight` as a getter. The driver names what this replaced:

```
demo/components/instrument/keyframes/composables/useHighlightCSS.ts:73-76
  … highlights ONLY the elements the caller hands it via `getOwnedElements` — never the whole
  document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug).
```

A three-component chain with **zero** DOM archaeology, ownership declared at each hop, scoped by construction rather than by selector discipline. `grep -rn "querySelector" demo/components/instrument/keyframes/` returns only the two `document.head.querySelector("#id")` `<style>`-singleton lookups and one container-scoped toolbar query — the sweep is genuinely gone.

**Falsifier (run):** a `querySelector`/`querySelectorAll` inside this component, or a document-wide sweep still reachable from the highlight path. Neither exists. The superlative survives. *(D-4 damages this contract's* payload *at runtime; it does not diminish the* design *— the shape is right, the ref bookkeeping under it is not.)*

### S-B · The engine-purity comment is load-bearing **and true**

`KeyframeCardList.vue:38-43` claims `formatCSSKeyframeString` is "a value.js-free pure-string trim" that nonetheless "lives in the engine chunk", justifying the dynamic route over a deep `@src` import. Verified at the source:

```
src/animation/compile/emit/format.ts:136-147
  export function formatCSSKeyframeString(keyframe: string) {
      let s = keyframe.replace(/^[^{]*{/, "").replace(/^  /gm, "").replace(/}\s*$/, "");
      s = s.trim();  s = s.replace(/^  /, "");  return s;
  }
```

Three regexes and a trim — no imports, no closure deps, no value.js, no DOM. It really is value.js-free, and it really does ship inside the heavy `./engine` composition barrel (`src/animation/public.ts:170`, `src/animation/load-engine.ts:54,109`), which is value.js-bearing by design (`public.ts:44-46`). Both halves of the comment hold, and the routing conclusion the author drew from them is the correct one for `proof:boundary`. A comment that survives its own audit is rare enough to name.

**Falsifier (run):** any value.js edge reachable from the function body, or `formatCSSKeyframeString` also being exported from the LIGHT `.` barrel (which would make the dynamic route gratuitous). Neither: the body is self-contained, and `grep` places it only on the engine surface.

### S-C · Barrel-only library access — stricter than its own composables; the R1 crash class is not reachable here

The component reaches keyframes.js through exactly one specifier — the published LIGHT barrel `@mkbabb/keyframes.js` (`:30`) — with **zero** `@src/*` deep imports and **zero** direct `@mkbabb/value.js/*` imports. Its own sibling composables do not hold that line:

```
useKeyframeOps.ts:1,4        import … from "@src/animation/compile/emit/css-text" / "@src/animation/internal/helpers"
useKeyframesState.ts:1       import { convertPixelsToCh } from "@src/animation/resolve/browser"
useKeyframesParsing.ts:1     import { debounce } from "@src/animation/internal/helpers"
```

Consequence for the **R1 parser-crash class** (live `parseCssColor("oklch()")`): it is **not reachable from this component's own import surface**. The value.js parse seam in this cluster sits one level *up* — `KeyframesEditor.vue:123` `import { parseCssScalar } from "@mkbabb/value.js/css"`, exercised at `:186`. Any R1-class hardening lands there, not here. (This is the clean counterpart to D-1: the component's *import* hygiene toward value.js is spotless; its handling of a value.js *type* handed to it through a prop is not.)

**Falsifier (run):** any `@src`, `@kf-engine`, or `@mkbabb/value.js` specifier in the 82 lines. The whole file is above; there is none. Also consistent with lane-frontend F-6 (zero local `ui/` copies, zero direct `reka-ui`) — neither appears here.

---

## 4. Shadow-component census (S-1..S-8) — applicability

No S-row applies to this component. It renders one glass primitive (`Separator`) and one in-cluster sibling; there is **no bespoke reimplementation of a glass-ui primitive here**. `display:contents` on the root (`:2`) is a correct layout-transparency choice, not a shadowed `Surface`/`Card`. The S-3 timeline cluster and S-1 `KfPillTabs` findings are elsewhere in the tree. Recorded so the wave planner does not go looking.

---

## 5. Repair order (consumption axis only)

| # | defect | shape of the fix | blocked by |
|---|---|---|---|
| 1 | **D-1** | `:frame-start="selectorText(frames[i].start)"` — the helper is already in `@utils/keyframeSelector` and already test-pinned | — |
| 2 | **D-2** | `import type { TemplateAnimationFrame } from "@mkbabb/keyframes.js"`; `frames: TemplateAnimationFrame<any>[]` | — |
| 3 | **D-3** | one `v-if="frames[i]"` (or iterate `frames` and index `frameStrings`, which is the array with the honest length) | — |
| 4 | **D-4** | key `cardInstances` by `frames[i].id`, not by render index; delete on `null` | D-2 (needs the typed `.id`) |
| 5 | **D-5** | `const { formatCSSKeyframeString } = kfEngine()` — drop the ref, the `.then`, the fallback, the comment | — |
| 6 | **D-6/D-7** | `<Separator decorative …>`; import from `@mkbabb/glass-ui/separator` | **F-1** (nothing glass-side is reproducible until the dep is declared) |
| 7 | **D-8** | one payload key across the four emits | — |

---

## Provenance

Read whole, read-only: the target; `KeyframeCard.vue`; `KeyframesEditor.vue`; `demo/kf-engine.ts`; `demo/utils/keyframeSelector.ts`; `demo/utils/formatEditorCSS.ts`; the four editor composables (`useKeyframesEditor`, `useKeyframesParsing`, `useKeyframeOps`, `useKeyframesState`) and `useHighlightCSS`; `src/animation/compile/emit/format.ts`; `src/animation/compile/selector.ts`; `src/animation/compile/frame-compiler.ts` (§addFrame); `src/animation/constants/types.ts`; `src/animation/index.ts` (§type surface); `src/animation/public.ts`; `src/animation/engine/animation.ts` (§setTargets); `src/animation/resolve/element-resolve.ts` (§bindTargets); `test/demo/instrument/value4-editor-boundary.test.ts`; `package.json`. Installed-artifact evidence from `node_modules/@mkbabb/value.js/dist/subpaths/css.{d.ts,js}`, `node_modules/@mkbabb/glass-ui/{package.json,dist/separator-qqQ_Er0U.js}`, `node_modules/reka-ui/dist/component/BaseSeparator.js`, `node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js` (§setRef). Two `git` reads (`log`, `blame`). **No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed; no installs, no dev servers, no browser tooling.** The single write is this file.
