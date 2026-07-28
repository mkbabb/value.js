# CHALLENGE-L — library structure under `demo/shared/ui/EmptyState.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
Opus 5 seat. The spawn declaration was explicit and matches the served tier; this seat is
not inherited and not undeclared.

**Substrate note (record correction).** The work order names `HEAD c654824e`. Actual HEAD
at read time:

```
$ git rev-parse HEAD
80fc5c4054d5bd790b1b2b73280a2e0ced4535de
$ git log --oneline -1
80fc5c40 docs(V·mega): shell band COMPLETE-TRUE 12/12 — records lie in both directions; cap-4 restored by liveness probe
```

Branch `tranche-u`. Every line/number below is against `80fc5c40`, not `c654824e`.

**Verdict: DEFECTIVE.** The subject component is 105 lines and, taken alone, is small and
disciplined. The library structure *under* it is not. The strongest defect is a
**consumer/design-system boundary drift**: glass-ui 7.0.0 deleted `WatercolorDot`'s `tag`
prop and hard-sealed the component against attribute fallthrough; value.js adopted glass 7
whole at W44/D58 and never migrated the 18 call sites that still pass `tag=`. In
`EmptyState.vue` that is three dead props. Elsewhere, through the identical mechanism,
**three user-facing controls are inoperable** — measured live, not inferred.

---

## 0. What this component imports, and whether it should

`demo/shared/ui/EmptyState.vue:65-66` — the entire import surface, two lines:

```ts
import { CircleAlert } from "@lucide/vue";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
```

| edge | verdict | note |
|---|---|---|
| `@lucide/vue` | LEGAL | `package.json:59` devDependency `^1.16.0`; also a declared glass-ui peer. Demo-only, correct. |
| `@mkbabb/glass-ui/watercolor-dot` | LEGAL PATH, **DEAD PAYLOAD** | Published subpath — `glass-ui/package.json#exports["./watercolor-dot"] = {types: ./dist/watercolor-dot.d.ts, import: ./dist/watercolor-dot.js}`. The specifier is right; the props passed through it are not (§L-1). |
| `@mkbabb/value.js/*` | **ABSENT — and correctly so** | See the negative proof in §7. |
| any `../../shell/`, `../../color-picker/composables/boot/` | ABSENT in the module graph | but present as an **undeclared CSS side-channel edge** (§L-5). |

Zero cross-boundary import violations. Zero deep-`src/` reach. The `import`-graph half of
this challenge comes back clean; the defects are in the *dependency manifest*, the
*attribute contract*, and a *CSS side channel* that the module graph cannot see.

---

## L-1 — BLOCKER (family) / MINOR (this component): `tag=` is a dead prop at the glass-ui boundary

### The library moved

glass-ui `490cc46e` — *"feat(BI): land the Glass 7 component, motion, material, and
public-surface cut"*, 2026-07-16 — removed the prop and sealed the component:

```
$ cd ../glass-ui && git show 490cc46e -- src/components/watercolor-dot/WatercolorDot.vue \
    | grep -E "^[-+].*(tag|inheritAttrs|useAttrs|<span|<component)"
+import { computed, toRef, useAttrs, useId, type HTMLAttributes } from "vue";
+defineOptions({ inheritAttrs: false });
-        /** Host tag — `div` (decorative) or `button` (interactive). */
-        tag?: "div" | "button";
-        tag: "div",
+const attrs = useAttrs();
-    <component
-        :is="tag"
-        :type="tag === 'button' ? 'button' : undefined"
+    <span
```

The live 7.0.0 source (`../glass-ui/src/components/watercolor-dot/WatercolorDot.vue:70-73`)
states the new contract in its own words:

```ts
// A WatercolorDot is paint, never the seat. Suppress every semantic/action
// fallthrough attribute and forward only the two visual composition channels.
const attrs = useAttrs();
const visualClass = computed(() => attrs.class as HTMLAttributes["class"]);
const visualStyle = computed(() => attrs.style as HTMLAttributes["style"]);
```

Root is a hard `<span aria-hidden="true" … pointerEvents:'none'>`. `inheritAttrs:false` +
only `class`/`style` forwarded means **every other attribute is silently swallowed** — no
DOM attribute, no warning, no type error.

### The consumer did not

value.js adopted glass 7.0.0 whole at W44/D58 (`91fa1368`) and left the old prop in place
at **18 bindings across 9 files**:

```
$ grep -rn 'tag="' demo/ | wc -l
      18
```

Three of them are this component:

```
demo/shared/ui/EmptyState.vue:45:  <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-a" class="w-8 h-8 opacity-80" />
demo/shared/ui/EmptyState.vue:46:  <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-b" class="w-11 h-11" />
demo/shared/ui/EmptyState.vue:47:  <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-c" class="w-6 h-6 opacity-60" />
```

### Measured, live (`http://localhost:9000/#/palettes`, chromium 1440×900)

`[data-slot="empty-state-trio"]` children:

```json
{"tagName":"SPAN",
 "attrs":["data-v-292b9032=","data-v-7acf0aa0=","aria-hidden=true",
          "class=w-8 h-8 opacity-80 watercolor-swatch",
          "data-testid=watercolor-swatch","data-variant=ghost","style=border-radius: 55.52% …"],
 "pointerEvents":"none","hasTagAttr":false}
```

(all three identical in shape; `hasTagAttr: false` on every one). So `tag="div"` is a
**pure no-op reference to an API that no longer exists** — owner edict 2, "no legacy code
… no aliases, migration shims, dual paths". For `EmptyState` the render delta is nil (the
paint span sits inside an already-`aria-hidden` flex div), which is exactly why it
survived: a dead prop with a null visual delta is invisible to every gate the repo runs.

Two collateral notes on the same three lines: the component's own
`aria-hidden="true"` (`EmptyState.vue:41`) is now redundant — glass-ui sets it — and the
comment at `:45-47` asserting a `div` host describes a `<span>`.

### The blast radius — this is where the mechanism is a BLOCKER

The same swallow eats `@click`, `aria-label`, `:disabled` and `:title` at the three
`tag="button"` sites:

- `demo/workbenches/mix/MixSourceSelector.vue:164-176` — "Add current color to the mix"
- `demo/workbenches/mix/MixSourceSelector.vue:210-221` — per-palette add-color swatches
- `demo/workbenches/generate/GenerateControls.vue:199-208` — copy-color swatches

Measured at `#/mix`:

```json
{"found":true,"tagName":"SPAN","ariaHidden":"true","ariaLabel":null,"tabIndex":-1,
 "pointerEvents":"none","isButton":false,"accessibleNamePresent":false}
MIX focus: {"activeIsAdd":false,"activeTag":"BODY"}
```

`.add-slot-ghost` is **not a button, not focusable (`.focus()` is a no-op), not clickable
(`pointer-events:none`), has no accessible name, and is `aria-hidden` from assistive
tech**. Its `@click="addCurrentColor"` never fires. Three shipped affordances are dead
through one un-migrated library boundary. That belongs to the Mix/Generate seats to fix,
but it is the *same defect* my subject carries, and it is the proof that the mechanism —
not the individual prop — is the thing to cure.

**Cure.** Delete `tag=` at all 18 sites (mechanical, zero-delta at the 15 decorative
ones). At the 3 interactive ones, honour glass-ui's stated seam — *paint, never the seat* —
by wrapping the dot in a real `<button>` that owns `@click`, `aria-label`, `:disabled` and
focus ring. Then add an eslint `vue/no-undef-props`-class guard, or a smoke test that
asserts `document.querySelector('.add-slot-ghost').tagName === 'BUTTON'`, so the next
glass major cannot silently re-open it.

---

## L-2 — MAJOR: the published library declares a runtime dependency on its own consumer's design system (package-level cycle + 5.8 MB of phantom deps)

`package.json:82-85`:

```json
"dependencies": {
    "@mkbabb/glass-ui": "^7.0.0",
    "@mkbabb/keyframes.js": "^6.0.0"
}
```

These are **runtime** deps of the published `@mkbabb/value.js@4.0.0`. Four independent
measurements say the published library uses neither:

```
$ grep -rn "@mkbabb" src/
src/subpaths/math.ts:2:  * `@mkbabb/value.js/math` — pure numeric math (O.W2). parse-that-FREE.
src/subpaths/transform.ts:2: * `@mkbabb/value.js/transform` — matrix decomposition + path geometry (O.W2).
        (two doc comments; zero imports)

$ grep -h "^import" dist/subpaths/*.js | sort -u
import { … } from "../anchors-C_wdoOYd.js";
import { … } from "../operations-CB_1wGy4.js";
import { … } from "../result-CZJK1CwL.js";
        (zero bare package specifiers — the published graph is fully self-contained)

vite.library.ts:13:  export const libraryExternal: string[] = [];
eslint.config.js:211-213: group ["@mkbabb/glass-ui", "@mkbabb/glass-ui/*"] →
    "inv-K-1: the value.js LIBRARY (src/) must never import glass-ui — the topology is
     glass-ui → value.js(lib), one direction, no cycle."
```

And `@mkbabb/keyframes.js` is imported by **nothing in the repository at all**:

```
$ grep -rn "@mkbabb/keyframes" --include="*.ts" --include="*.vue" --include="*.js" src demo test e2e scripts plugins
        (no output)
```

Meanwhile the other end of the edge:

```
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies)"
{ …, '@mkbabb/value.js': '^4.0.0', … }
```

So the shipped manifest asserts `value.js → glass-ui`, and glass-ui asserts
`glass-ui → value.js`. **That is the exact cycle `inv-K-1` was written to forbid, declared
in the file `inv-K-1` does not police.** The eslint rule guards the import graph; nothing
guards the manifest, and the manifest is what npm installs.

Cost to every downstream consumer of a parse/convert library:

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
```

5.8 MB, a Vue 3 design system, and a resolution cycle — for `parseCssColor`.

`EmptyState.vue` is the archetypal beneficiary: it is a **demo-only** glass-ui consumer
(129 glass-ui import sites in `demo/`, 0 in `src/`) whose dependency is billed to library
consumers. My seat found it by tracing this component's one non-trivial import to its home
and reading the manifest that funds it.

**Cure (idiomatic, immediate).** Move both entries to `devDependencies`. Nothing in the
published graph resolves them; `files: ["dist"]` ships nothing that needs them; the vite
self-alias set (`vite.config.ts:38-51`) is generated off `#exports` and is untouched.
**Cure (structural).** Make `demo/` its own private workspace package with its own
manifest. Then the demo's dependency set cannot leak into the library's published one *by
construction*, rather than by remembering — which is the class of guarantee this repo
already prefers (cf. the generated self-alias set, chosen precisely so "the alias set can
never drift from the exports map").

---

## L-3 — MAJOR: the error plate has two implementations, and they have already drifted

`demo/color-picker/ErrorBoundary.vue:16-34` is a hand-copy of `EmptyState.vue:19-31`.
Element-for-element, class-for-class:

| | `EmptyState.vue` (error branch) | `ErrorBoundary.vue` |
|---|---|---|
| wrapper | `flex flex-col items-center justify-center gap-2.5 py-8 text-center` `role="alert"` | `flex flex-col items-center justify-center gap-3 py-10 px-6 text-center` `role="alert"` |
| glyph | `<CircleAlert class="w-6 h-6 text-destructive/80" aria-hidden>` | `<CircleAlert class="w-7 h-7 text-destructive/80" aria-hidden>` |
| statement | `font-display text-heading text-foreground max-w-[26ch] text-balance leading-snug` | `font-display text-heading text-foreground max-w-[28ch] text-balance leading-snug` |
| detail | `text-mono-small plate-ink max-w-[44ch] break-words` | `text-mono-small plate-ink max-w-[46ch] break-words` |
| action | `<slot name="action" />` | inlined `<Button variant="outline" size="sm" class="font-display">` |

The only differences are **four unexplained numbers** — `w-6→w-7`, `26ch→28ch`,
`44ch→46ch`, `gap-2.5 py-8→gap-3 py-10 px-6`. No comment justifies any of them.
`ErrorBoundary.vue:12-14` even *names* the duplication as intentional ("The plain register
mirrors EmptyState's `error` variant"), which is how a dual path gets ratified: the copy is
documented, so the copy looks deliberate, and then it drifts. Owner edict 2 forbids dual
paths; the named historical suspect in this seat's brief — `ActionBarLayer`'s local
reimplementation of a removed composable — is the same shape.

**Cure.** Split (see §L-4) and let `ErrorBoundary` *compose* `ErrorPlate`, keeping only
what is genuinely its own: `onErrorCaptured`, `aria-live="assertive"`, `tabindex="-1"` +
`focus()`, and the `reset` emit. The four drifted numbers collapse to one set by
construction.

---

## L-4 — MAJOR: `EmptyState` is two components wearing one name, and the seam leaks into 6 call sites

`EmptyState.vue:75-91` — the whole prop surface is a **flat record of independent optional
props**, not a discriminated union:

```ts
message?: string | undefined;
variant?: "empty" | "error" | undefined;
eyebrow?: string | undefined;   // empty only  (Q6)
hint?:    string | undefined;   // empty only
detail?:  string | undefined;   // error only
dots?:    boolean | undefined;  // empty only, defaults TRUE
```

The two template branches (`:18-31` vs `:32-63`) share nothing but the flex wrapper — they
differ in `role` (`alert` vs `status`), in glyph vs ghost trio, and in every caption slot.
The component's own header comment opens with *"TWO species, never conflated"*. The type
conflates them: `<EmptyState variant="error" eyebrow="x" hint="y" dots />` is well-typed
and silently drops three props, and `dots` defaults `true` on a variant that has no dots.
(Structural claim, read off `:75-91`; I did not execute `vue-tsc` to confirm the compile —
label this half a hypothesis. The zero-shared-markup and disjoint-prop facts are direct.)

The seam then leaks outward. Six call sites repeat the *same twelve lines*:

```
demo/palettes/browser/admin/AdminAuditPanel.vue:42-53
demo/palettes/browser/admin/AdminFlaggedPanel.vue:22-33
demo/palettes/browser/admin/AdminNamesPanel.vue:30-41  and  :80-91
demo/palettes/browser/admin/AdminTagsPanel.vue:68-79
demo/palettes/browser/admin/AdminUsersPanel.vue:51-62
demo/palettes/BrowsePane.vue:61-78
```

each being `<EmptyState variant="error" message="…" :detail="x.loadError.value">` +
`<template #action><Button variant="outline" size="sm" class="font-display" @click="x.load()">Retry</Button></template>`.

That repetition is not laziness at the call site — it is the boundary being in the wrong
place. The *error plate* concept includes its retry affordance; the component models the
retry as an anonymous slot, so every consumer re-authors it.

**Cure.** Two components, one home:

```
EmptyPlate.vue   role=status · eyebrow + display + hint + #action · owns the ghost trio
ErrorPlate.vue   role=alert  · glyph + display + detail · props {message, detail, retryLabel} · emits retry
```

Six call sites become one line each:
`<ErrorPlate message="The tag ledger is unreachable." :detail="tagsApi.loadError.value" @retry="tagsApi.loadTags()" />`.
Retire `variant` entirely (no alias, no shim — edict 2).

---

## L-5 — MAJOR: inverted dependency — the tree's most-shared leaf is correct only inside the app-shell boot, via a channel the module graph cannot see

`EmptyState.vue` reads two custom properties it does not own:

- `:45-47` → `color="var(--accent-live)"`
- `:100-104` → `.plate-ink { color: var(--ink-muted, var(--muted-foreground)); }`

Both are written **imperatively, inline, by the app-shell boot**:

```
demo/color-picker/composables/boot/useAtmosphereBoot.ts:96:
    document.documentElement.style.setProperty("--accent-live", css);
demo/color-picker/composables/boot/useAtmosphereBoot.ts:103:
    document.documentElement.style.setProperty("--ink-muted", css);
```

`--ink-muted` has **no declaration anywhere in the stylesheet layer**:

```
$ grep -rn "ink-muted" demo/styles/
$ echo $?
1
```

Measured live (chromium, `#/palettes`), the inline value and the computed value are
byte-identical, i.e. the cascade contributes nothing:

```json
{"label":"DOMContentLoaded",
 "cascade":"oklch(44.712054906087% 0.003861589952 34.629978305623deg)",
 "inline": "oklch(44.712054906087% 0.003861589952 34.629978305623deg)",
 "mutedFg":"light-dark(hsl(30 22% 40%), hsl(34 14% 62%))"}
```

So the direction of dependency is `demo/shared/ui/EmptyState.vue` (a leaf, 15 call sites,
the most-shared presentational atom in the tree) → `demo/color-picker/composables/boot/`
(the app shell's boot). Component → boot is precisely the edge this challenge asks me to
record. It carries no import, so no lint, no typecheck and no module-graph tool can see it.

The fallback is the tell. `var(--ink-muted, var(--muted-foreground))` is a **masking
fallback** (owner edict 2, explicit), and its masked value is not neutral — the
component's own comment, `EmptyState.vue:45-49`, records what it is:

> the STATIC `text-muted-foreground` composited 3.84:1 over the My Palettes plate in light
> (< the 4.5:1 small-text floor)

The fallback silently re-instates the exact sub-floor contrast the class exists to
eliminate. In the live dev boot it does not fire (module scripts are deferred, so the
writer runs before `DOMContentLoaded` — measured above), so the live blast radius is the
first-paint window only. It *would* fire in any mount outside App.vue's boot scope — a unit
test mounting `EmptyState` in isolation, or the gh-pages prod-preview empty-mount already
carried in `CARRY-LEDGER.md §F`. I did not reproduce either; that half is a **hypothesis**.
The structural violation — a masking fallback whose masked value is a known WCAG failure —
is not.

**Cure.** Declare both tokens in `demo/styles/foundation.css :root` with the correct
literal (the file already does exactly this for `--accent-live` at `:231`). The boot writer
then *overrides* a declared token instead of *originating* an undeclared one. The fallback
is deleted outright, the leaf→boot edge becomes a cascade contract that holds in every
mount context, and `--ink-muted` stops being the one token in the design system with no
home.

---

## L-6 — MAJOR: `.plate-ink` is copy-pasted verbatim into five scoped `<style>` blocks

```
$ for f in demo/shared/ui/EmptyState.vue demo/color-picker/ErrorBoundary.vue \
           demo/workbenches/extract/ExtractWorkbench.vue \
           demo/workbenches/extract/ImageDropZone.vue \
           demo/workbenches/extract/ExtractControls.vue; do grep -A2 "^\.plate-ink" $f | md5; done
ade540e9e300d50d6dbe02bc25dfe2ae
ade540e9e300d50d6dbe02bc25dfe2ae
ade540e9e300d50d6dbe02bc25dfe2ae
ade540e9e300d50d6dbe02bc25dfe2ae
ade540e9e300d50d6dbe02bc25dfe2ae
```

Identical md5 five times (`EmptyState.vue:102`, `ErrorBoundary.vue:84`,
`ExtractWorkbench.vue:290`, `ImageDropZone.vue:109`, `ExtractControls.vue:148`). The
concept — *"apply the certified de-emphasis rung to text"* — has five homes. Unique
semantic ownership requires one. `demo/styles/utils.css` exists and is already the demo's
utility home. Each copy also carries its own 4-8 line rationale comment, so the duplication
is ~40 lines of prose repeated alongside 3 lines of CSS.

The `scoped` attribute makes this worse than ordinary duplication: five `data-v-*`-scoped
rules, one per component, cannot be overridden or audited as one thing. And because
`EmptyState.vue:97-101` claims to be *"the ONE shared empty atom (8 consumers incl. the
admin walls), so every consumer inherits the cure"* — the sentence is true of the
component and false of the class, which is exactly the confusion a five-way copy produces.

**Cure.** One `.plate-ink` in `demo/styles/utils.css`, one rationale comment, five scoped
blocks deleted. (Or, cleaner still: fold it into `demo/styles/` typography so
`text-mono-caption`/`text-mono-small` carry the rung and `.plate-ink` disappears.)

---

## L-7 — MINOR: `PaletteCardGrid` re-declares `EmptyState`'s API under an `empty*` prefix

`demo/palettes/browser/card/PaletteCardGrid.vue:21-30, 38-44`:

```vue
<EmptyState v-if="empty" class="col-span-full" :message="emptyText" :eyebrow="emptyEyebrow" :hint="emptyHint">
    <template v-if="$slots.emptyAction" #action><slot name="emptyAction" /></template>
</EmptyState>
...
defineProps<{ empty?: boolean; emptyText?: string; emptyEyebrow?: string; emptyHint?: string; gridClass?: string }>();
```

Four props and one slot forwarded 1:1, renamed. The empty-plate concept now has **two
public surfaces**: `message/eyebrow/hint/#action` and `emptyText/emptyEyebrow/emptyHint/
#emptyAction`. Consumers see whichever their host exposes (`BrowsePane.vue:83-86` uses the
prefixed one). A wrapper whose whole content is a rename is the "wrapper component that
does not need to exist" of edict 3, and it fixes the grid's job as *knowing about
emptiness* — which is the pane's job, not the grid's.

**Cure.** Delete the four `empty*` props. The host renders `<EmptyPlate>` as the grid's
sibling under its own `v-if`; a card grid with zero children needs no opinion about why.

---

## L-8 — MINOR: per-instance styling at the `#action` slot and on the trio

- **11** `class="font-display"` overrides on `<Button>` in `demo/`, **6** of them the
  copied Retry inside an `EmptyState` `#action` slot
  (`AdminAuditPanel.vue:49`, `AdminFlaggedPanel.vue:29`, `AdminNamesPanel.vue:37`, `:87`,
  `AdminTagsPanel.vue:75`, `AdminUsersPanel.vue:58`). Owner edict 5 puts this at the root
  component level: if the demo's buttons speak Fraunces, that belongs in the `button`
  variant, not on six instances.
- The trio's scale is three per-instance Tailwind pairs — `w-8 h-8 opacity-80` /
  `w-11 h-11` / `w-6 h-6 opacity-60` (`EmptyState.vue:45-47`). The 8/11/6 + 0.8/1/0.6 ramp
  is a *design decision about the plate register*, hard-coded as utility classes on three
  siblings. It belongs in one place — a `trioScale` on `EmptyPlate`, or tokens beside the
  other plate tokens.
- Two Button sources coexist: `demo/ui/button/index.ts` (local shadcn) and glass-ui's
  published `./button`. Edict 4 names glass-ui as the design system. The shadcn tree is a
  standing sanctioned structure ("~178 files, DO NOT modify"), so this is recorded as
  context rather than pressed as a violation — but the `#action` slot is where the two
  systems meet, and it currently resolves to the local one at every site.

---

## L-9 — INFO: the design system has no `empty-state`, so the demo owns a primitive

glass-ui 7.0.0 publishes **74** subpaths — including `./status-dot`, `./badge`, `./card`,
`./metric`, `./pulse`, `./completion-seal`, `./watercolor-dot` — and no `./empty-state`
(full list read from `glass-ui/package.json#exports`). Edict 4 puts variants and primitives
in glass-ui.

I decline to file this as a defect, and the reason matters for the lattice: the *slot
lattice* (species · eyebrow · display · hint/detail · action) is generic and would be a
sound glass-ui primitive, but the *content* here is not portable — Fraunces display line,
Fira caps eyebrow, the literal copy `"· empty plate ·"`, and a `WatercolorDot` trio whose
register is fixed by owner ruling (R12 / t33-audit-08). Lifting the whole component into
glass-ui would move project-specific typography and ratified copy into the design system —
a worse ownership error than the one it cures, and a contrivance under edict 3.

**The honest split, if this is ever pursued:** glass-ui gains `./plate` — the two-species
structural lattice with named slots and zero baked typography — and the demo keeps a thin
`EmptyPlate`/`ErrorPlate` that fills those slots with its own voice. That is a glass-ui BH
relay item (standing formation invariant per the BH/BI relay edict), not a value.js edit.

---

## L-10 — INFO: the `shared/` bucket hosting this component is also the tree's declared fork home

`demo/shared/` holds exactly three files:

```
demo/shared/utils.ts
demo/shared/ui/PaneHeader.vue
demo/shared/ui/EmptyState.vue
```

`demo/shared/utils.ts:9-22` documents a deliberate fork of `debounce` out of the library
("The utility tail has no rightful subpath home … so the demo owns its copy; the library's
root-barrel export stands for external consumers"). That fork is defensible on its own
terms — it exists to keep a 40-line timer from dragging ~36 KiB of scroll-timeline grammar
into the eager graph — but it means the directory that houses the tree's most-shared UI atom
is named for a layer, not a concept, and its charter is "things with no home." Two
components and a fork is not a module; it is a residue. Edict 3's prohibition on new
`shared/` dirs is aimed at exactly this. Recorded as context for §8, not as an
`EmptyState` defect.

---

## 7. Negative proofs — what I looked for and did not find

An audit that only reports hits is not a measurement. These came back clean:

1. **The published-surface question — CLEAN, and this is the important one.** The brief
   warns that a demo import a real consumer could not write is a false proof of the public
   API. `EmptyState.vue` imports value.js **nowhere**, and the whole demo tree consumes it
   only through published subpaths:

   ```
   $ grep -rhn 'from "@mkbabb/value.js[^"]*"' demo/ | grep -o '@mkbabb/value.js[^"]*' | sort | uniq -c
     24 @mkbabb/value.js/color
     10 @mkbabb/value.js/css
      5 @mkbabb/value.js/easing
      6 @mkbabb/value.js/math
      4 @mkbabb/value.js/quantize
   $ grep -rn '"@src' demo/        # (no output)
   $ grep -rn 'from "\.\./.*src/' demo/   # (no output)
   ```

   49 imports, five of the seven published subpaths, zero deep-`src/` reach, zero `@src`
   alias use. Every specifier is one a real consumer could write verbatim. T.W1's
   demo-dogfood keystone holds under adversarial grep. The library-structure defects in
   this report are in the *manifest* and the *design-system boundary*, **not** in
   value.js's own public surface.

2. **God module — absent.** 105 lines; 6 props; 2 slots; 2 imports; zero composables, zero
   stores, zero side effects, zero lifecycle. There is nothing to decompose except the
   two-species conflation of §L-4.

3. **Library code doing this component's job — absent.** No `src/` module knows anything
   about empty states; the reverse direction of the ownership question is clean.

4. **Third `useDark` store / `useLayerTransition` reimplementation — not present here.**
   Neither named suspect touches `EmptyState` or its two imports.

5. **Visual, across all 60 Safari captures** (`audit/visual/REPORT.md`):
   `blankOrNearBlank 0`, `pageErrors 0`, `horizontalOverflow 0`, `darkClassMissing 0`,
   `mainCountNotOne 0`. Every `EmptyState`-bearing route settles: `/#/browse` 3595/3470 ms,
   `/#/palettes` 3139/3443 ms, `/#/admin/{users,names,audit,flagged,tags}` 3427-3506 ms.
   I read `safari-desktop-light/admin-tags.png` and `safari-desktop-dark/browse.png`
   directly: the empty plate renders correctly in both schemes — accent-pink ghost trio +
   `· NO TAGS MINTED ·` + `No tags yet.` in light; and in dark the two species sit side by
   side on one screen (Browse's error statement *"The commons is unreachable." / "Failed to
   load palettes" / Retry* next to My Palettes' neutral-dash trio + `· EMPTY PLATE ·`),
   visibly distinct registers. **The Q6 two-species design intent is achieved on screen.**
   It is achieved despite the structure, not because of it — which is why every defect
   above needed evidence a screenshot cannot produce.

The four `smallTapTargets` counted on each `/#/admin/*` route are dock chrome, not
`EmptyState`; the 8 on `/#/mix` are the Mix seat's. Not claimed here.

---

## 8. The greenfield lattice — what I would build today, no legacy

Stated concretely, as asked. Transposition, not patches.

```
demo/plate/                      ← ONE home for the three page-state species
    EmptyPlate.vue               role=status · eyebrow/display/hint/#action · owns the ghost trio + its scale ramp
    ErrorPlate.vue               role=alert  · glyph/display/detail · props {message, detail, retryLabel} · emits retry
    LoadingPlate.vue             the shimmer register (today unowned, scattered through PaletteCardSkeleton)
    index.ts                     the barrel — call sites import "…/plate", never a 3-deep relative .vue path

demo/styles/utils.css            .plate-ink — ONCE (five scoped copies deleted)
demo/styles/foundation.css       :root { --ink-muted: <literal>; }  ← the missing declaration
```

Seven moves, in dependency order:

1. **`package.json`** — `@mkbabb/glass-ui` + `@mkbabb/keyframes.js` → `devDependencies`.
   The published cycle dies; downstream consumers stop installing 5.8 MB for
   `parseCssColor`. Zero code changes; four measurements in §L-2 say nothing resolves them.
   *Longer arc:* `demo/` becomes a private workspace package with its own manifest, so the
   leak is impossible rather than merely fixed.
2. **Delete `tag=` at all 18 sites.** 15 are null-delta. The 3 `tag="button"` sites get a
   real `<button>` wrapping the paint span — glass-ui's own seam, in glass-ui's own words.
   Add the `tagName === 'BUTTON'` smoke assertion so a glass major cannot re-open it.
3. **Split the species.** `EmptyState.vue` → `EmptyPlate.vue` + `ErrorPlate.vue`; `variant`
   retired with no alias. `ErrorPlate` owns `retryLabel` + `@retry`.
4. **Collapse the six copied error blocks** to one line each. ~72 lines of duplicated
   template deleted; the six `class="font-display"` Retry overrides die with them (§L-8).
5. **`ErrorBoundary` composes `ErrorPlate`**, keeping only `onErrorCaptured` +
   `aria-live="assertive"` + `tabindex/focus` + `reset`. The four drifted numbers of §L-3
   converge by construction.
6. **Declare `--ink-muted` in `:root`** and delete the masking fallback. The boot writer
   overrides a declared token instead of originating an undeclared one; the leaf→boot edge
   becomes a cascade contract valid in every mount context, including the isolated ones.
7. **`PaletteCardGrid` drops its four `empty*` props.** The pane renders `<EmptyPlate>`
   itself. `demo/shared/ui/` dissolves — `PaneHeader` joins `demo/shell/`, `EmptyState`
   becomes `demo/plate/`, `utils.ts` becomes `demo/lib/`. No bucket named for a layer
   survives.

Net: one concept per home; ~120 lines of duplicated template and CSS deleted; three dead
controls revived; a package cycle and 5.8 MB of phantom runtime dependency removed from the
published library; and the two edges that no tool could see — leaf→boot, and
manifest→design-system — become edges that a declaration and a lint can hold.

---

## Evidence appendix — commands run

```
git rev-parse HEAD                                        → 80fc5c4054d5bd790b1b2b73280a2e0ced4535de
grep -rn "@mkbabb" src/                                   → 2 doc comments, 0 imports
grep -h "^import" dist/subpaths/*.js | sort -u             → 0 bare package specifiers
grep -rn "@mkbabb/keyframes" src demo test e2e scripts plugins → 0
grep -rn "@mkbabb/glass-ui" demo/ | wc -l                  → 129
grep -rn 'tag="' demo/ | wc -l                             → 18
grep -rn "ink-muted" demo/styles/ ; echo $?                → 1 (no declaration)
grep -A2 "^\.plate-ink" <5 files> | md5                    → ade540e9e300d50d6dbe02bc25dfe2ae ×5
grep -rn 'class="font-display"' demo/ | wc -l              → 11
du -sh node_modules/@mkbabb/{glass-ui,keyframes.js}        → 5.2M / 608K
node -e "…glass-ui/package.json.peerDependencies"          → includes "@mkbabb/value.js": "^4.0.0"
node -e "…glass-ui/package.json.exports"                   → 74 subpaths, no ./empty-state
(cd ../glass-ui && git show 490cc46e -- …/WatercolorDot.vue) → -tag?: "div"|"button"  +<span> +inheritAttrs:false
playwright chromium → localhost:9000/#/palettes            → trio: 3× SPAN, hasTagAttr false, pointer-events none
playwright chromium → localhost:9000/#/mix                 → .add-slot-ghost: SPAN, aria-label null,
                                                              tabIndex -1, pointer-events none, focus() no-op
playwright addInitScript → --ink-muted @ DOMContentLoaded  → inline === cascade (cascade contributes nothing)
```

Probe scripts (scratchpad, not repo artefacts):
`…/scratchpad/probe-emptystate.mjs`, `…/scratchpad/probe-token.mjs`.

Screenshots read as images:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-tags.png`,
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-dark/browse.png`.

**No source edits landed from this seat.** The only file written is this report, under
`docs/tranches/V/megatranche/audit/components/EmptyState/`.
