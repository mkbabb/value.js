# CHALLENGE-L — library structure · `demo/workbenches/mix/MixConfigBar.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, 1M context. That is the tier
this seat was explicitly spawned with. Declared, not inherited.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject: `demo/workbenches/mix/MixConfigBar.vue` (173 lines), area `demo/workbenches`.
- Axis: library structure — module boundaries, ownership, dependency direction, public surface.
- Write scope honoured: only files under `…/components/wb-mix-configbar/`. **No source edited.**

---

## §00 · Provenance — this is ROUND 5; rounds 1–4 are preserved intact, nothing lost

| round | report | status |
|---|---|---|
| 1 | `challenge-L-library-round-1.md` | **verbatim, untouched** |
| 2 | `challenge-L-library-round-2.md` | **verbatim, untouched** |
| 3 | `challenge-L-library-round-3.md` | **verbatim, untouched** |
| 4 | `challenge-L-library-round-4.md` | **verbatim, copied from the head before this write** |
| **5** | `challenge-L-library.md` (this) | supersedes as the head; carries 1 + 2 + 3 + 4 whole |

All twenty-nine prior findings — r1 `L-1…L-9`, r2 `L2-1…L2-7`, r3 `L3-1…L3-8`, r4 `R4-1…R4-4`
(**2 BLOCKER · 15 MAJOR · 8 MINOR · 2 INFO**) — **stand in full.** I traced the import cone and ran
my own measurements before reading any prior round, then reconciled. I contradict nothing and retract
nothing. Round-5 items are numbered `R5-n` so all five records remain collision-free.

**Discipline note.** My independent pass produced thirteen candidate findings. Nine of them were
already held by rounds 1–4 — `variant="primary-audacious"` (r2 **L2-1**, which measured 51 of 55
sites where I had two), the `tsconfig.demo.json` phantom keys (r2 **L2-2**, which used
`import.meta.resolve` where I used `ls`), the three-hop re-export chain (r1 **L-5**, identical), the
duplicated select pair (r1 **L-3**), the `reka-ui` reach (r1 **L-6**), the `demo/ui/` alias layer
(r1 **L-4** / r3 **L3-8**), the non-exhaustive vocabulary arrays (r1 **L-7** / r2 **L2-5** / r4
**R4-4b**), the dangling `<label>`s (r2 **L2-6**), and the in-view ramp orchestration (r1 **L-9**).
Those nine are **not re-reported**; they are carried in §5 with any strengthening evidence I gathered
attached to their row. **Four survived as genuinely new**, and one of them is a BLOCKER no prior round
touched.

| new | severity | one line |
|---|---|---|
| **R5-1** | **BLOCKER** | `@mkbabb/value.js@4.0.0` declares `@mkbabb/glass-ui ^7.0.0` + `@mkbabb/keyframes.js ^6.0.0` as **runtime `dependencies`** — and `src/` + `dist/` reference **neither** (`grep` → 0). glass-ui@7 declares `@mkbabb/value.js: ^4.0.0` as a **peerDependency**, closing a published producer↔consumer **cycle**. 5.8 MB of dead install against a 1.7 MB product. Zero mentions across rounds 1–4. |
| **R5-2** | **MAJOR** | The library owns a complete runtime space registry — `SPACE_SCHEMA` + `SPACE_IDS`, `src/color/model.ts:56,76` — and **publishes neither** (`grep -c SPACE_IDS dist/subpaths/color.d.ts` → **0**). The demo re-types it by hand: channel-key lists **17/17 identical**, the CSS-paintable set **13/13 identical**, `hueIndex` re-spelled as `hue?: true`. This is the *root cause* beneath r2 L2-4 and r2 L2-5, which found the symptoms and not the withholding. Zero mentions across rounds 1–4. |
| **R5-3** | **MAJOR** | Measured against glass-ui's own control tokens: `h-10` and `font-medium` on the CTA are **provable no-ops** (40→40 px, 500→500), and `h-9` on the three `SelectTrigger`s **re-implements the `size="sm"` prop in raw Tailwind** — `--control-h-sm` = 2.25rem = **36 px exactly**. Round 2 pasted this class string as evidence for L2-1 but never measured a single class in it. Zero mentions of `--control-h-*` across rounds 1–4. |
| **R5-4** | **MAJOR** | The Mix verb has **two homes with divergent affordances**: `MixConfigBar.vue:162-170` (disabled when `!canMix`) and `demo/shell/usePaneRouter.ts:221` (same `Blend` icon, same label, **no disabled concept**, silently no-ops). `usePaneRouter` appears **zero** times across rounds 1–4. |

**Verdict: DEFECTIVE.** Cumulative across five rounds: **3 BLOCKER · 18 MAJOR · 8 MINOR · 2 INFO.**
Strongest defect this round: **R5-1** — and it is the strongest on this axis across all five rounds,
because it is the only finding whose blast radius is *every npm consumer of the library*, not the demo.

---

## §0 · Independent re-derivation of the import cone

Traced before reading any prior round. Fifth independent observation; the boundaries agree.

| # | line | specifier | resolves to | direction | verdict |
|---|---|---|---|---|---|
| 1 | 2 | `vue` | peer | — | SOUND |
| 2 | 3–9 | `../../ui/select` | `demo/ui/select/index.ts` — **one line**, re-exports `@mkbabb/glass-ui` | lateral, into a zero-content alias layer | r1 **L-4** · r3 **L3-8** |
| 3 | 10 | `../../ui/button` | `demo/ui/button/index.ts` — **one line** | same | r1 **L-4** · r3 **L3-8** |
| 4 | 11 | `@lucide/vue` (`Blend`) | devDep | — | SOUND |
| 5 | 12 | `@mkbabb/value.js/color` (type) | real `exports` key → `dist/subpaths/color.d.ts` | consumer-legal | **SOUND** (code) · r2 **L2-2** (config) |
| 6 | 13 | `../../color-session/picker-color` (type) | domain module | feature → domain, downhill | r2 **L2-4** · **R5-2** |
| 7 | 14 | `../../palettes/mix` (type) | sibling **feature** tree | lateral | r1 **L-2** · r4 **R4-3/R4-4** |
| 8 | 15 | `reka-ui` (type) | glass-ui's own private dep | **past the design system** | r1 **L-6** |
| 9 | 18 | `../../color-session/color-space-meta` | the F16 neutral home | downhill | r1 **L-5** · r2 **L2-5** · **R5-2** |
| 10 | 23 | `../../color-session/color-chips` | domain module | downhill | r1 **L-3** · r4 **R4-1/R4-2** |

No `@src/*` reach, no `demo/ → src/` internal edge, no feature → shell edge. Line 12 remains the
file's one clean library edge and a real npm consumer could write it verbatim. Ten edges, one
unqualified — the same ratio four prior rounds found, reached independently.

**But the two edges I did not previously question — #2 and #3, the glass-ui edges — turn out to rest
on R5-1.** They are *demo* needs, and they are load-bearing on a dependency that every *library*
consumer pays for. That is the thread this round pulls.

---

## §1 · R5-1 — BLOCKER · the published library declares the demo's design system as a runtime dependency, closing a package cycle

### 1a — the declaration

```
$ node -e "const p=require('./package.json'); console.log(p.name, p.version); \
           console.log('dependencies =', JSON.stringify(p.dependencies)); \
           console.log('files =', JSON.stringify(p.files))"
@mkbabb/value.js 4.0.0
dependencies = {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}
files = ["dist","!dist/gh-pages","!dist/gh-pages/**"]
```

`@mkbabb/value.js` is a color/CSS-value library. It declares a **Vue design system** and an
**animation engine** as hard runtime dependencies of its published package.

### 1b — neither is used

```
$ grep -rn "@mkbabb/glass-ui\|@mkbabb/keyframes" src/
(no output)

$ grep -rl "@mkbabb/glass-ui" dist/
(no output)
```

Zero references in the source tree. Zero in the built artifact. And `files` ships `dist/` only — so
the tarball a consumer receives contains no code that could ever reach either package. The
declaration is pure liability.

The library's own tsconfig states the invariant these dependencies violate, in its own words
(`tsconfig.demo.json:27-28`):

> *"This is the ONLY value.js program that may see glass-ui; the library program (`tsconfig.lib.json`)
> never does (inv-K-1 — **structurally glass-ui-free**)."*

`inv-K-1` is honoured in the *type* program and broken in the *package manifest*. The typecheck
boundary and the dependency boundary disagree, and only one of them ships to consumers.

### 1c — the cycle

`node_modules/@mkbabb/glass-ui/package.json`, version 7.0.0:

```
peerDependencies = {"@lucide/vue":"^1.16.0","@mkbabb/keyframes.js":"^6.0.0",
                    "@mkbabb/pencil-boil":"^0.9.2","@mkbabb/value.js":"^4.0.0",
                    "@vueuse/core":"^14.0","embla-carousel":"^8.0","embla-carousel-vue":"^8.0",
                    "reka-ui":"^2.0","tailwindcss":"^4.0","tw-animate-css":"^1.2.5","vue":"^3.5"}
```

So, published, at pinned majors on both sides:

```
@mkbabb/value.js@4.0.0  ──(dependencies)──▶  @mkbabb/glass-ui@^7.0.0
        ▲                                             │
        └────────────(peerDependencies ^4.0.0)────────┘
```

A producer↔consumer cycle between a library and the design system built on top of it. glass-ui's
direction is correct — a UI kit legitimately peers on the color library it renders with. value.js's
direction is the invented one.

The repo already pays interest on this. `vite.config.ts:23-36` and `tsconfig.demo.json:21-25` both
carry multi-paragraph workarounds whose stated premise is *"a package does not install itself"* — the
self-alias machinery exists because the demo lives inside the library's own package. That is a demo
problem. R5-1 is what happens when the demo's problems are written into the library's manifest.

### 1d — the cost, measured

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js dist/
5.2M    node_modules/@mkbabb/glass-ui
608K    node_modules/@mkbabb/keyframes.js
1.7M    dist/
```

**5.8 MB of unreachable install against a 1.7 MB product — 3.4× the payload, all of it dead.** And
because glass-ui's peers are unmet in a bare install, the consumer also receives peer warnings naming
eleven packages (`vue`, `reka-ui`, `tailwindcss`, `embla-carousel`, `@mkbabb/pencil-boil`, …) for a
library they installed to convert OKLCh.

### 1e — the tie to this component

`MixConfigBar.vue:3-10` imports `Select*` and `Button` — through `demo/ui/` (r1 L-4), and ultimately
from `@mkbabb/glass-ui`. Those are the *demo's* imports. R5-1 is the structural statement of why
rounds 1–4 kept finding glass-ui defects inside a color library's audit at all: **the boundary between
the library and its demo does not exist in the one file that defines the published product.** The
demo is not a consumer of value.js in the manifest — it is fused to it.

- **Mechanism.** A monorepo-shaped tree published as a single package: demo dependencies were added
  to the only `package.json` there is, which happens to be the library's public contract.
- **Reproduction.** The four commands above, all in this checkout. Independently:
  `npm pack && npm i ./mkbabb-value.js-4.0.0.tgz` in an empty project installs
  `node_modules/@mkbabb/glass-ui`; `grep -r glass-ui node_modules/@mkbabb/value.js/dist` → nothing.
- **Cure — the transposition, not a patch.** Move both entries to `devDependencies`.
  `@mkbabb/value.js` must declare **zero** runtime dependencies; its `dist/` already has none, so this
  is a manifest edit with no code consequence. The cycle dissolves with it. Then make the invariant
  enforceable rather than aspirational — a CI check that `Object.keys(pkg.dependencies ?? {})` is
  empty, which is the manifest-level twin of the `inv-K-1` rule `tsconfig.lib.json` already enforces
  at the type level. One assertion, and the boundary the tsconfig only *describes* becomes real.
  **Relay to the glass-ui BH inbox** (standing E-edict): the cycle is visible from their side too and
  they should know value.js is about to stop being their dependent.

---

## §2 · R5-2 — MAJOR · the library withholds its own space registry, so the demo re-types it (17/17 and 13/13 verbatim)

Rounds 2 and 3 found two symptoms in this neighbourhood: **L2-4** (`PickerSpace = SpaceId` has 17
members but the dropdown renders 9, so the prop admits 8 unrenderable states) and **L2-5**
(`HUE_INTERPOLATION_METHODS` is non-exhaustive over a library-owned union). Both are real and both
stand. Neither asked *why* the demo is hand-writing these tables at all. The answer is a withheld
export, and it is measurable.

### 2a — the registry exists, complete, in the library

```ts
// src/color/model.ts:51-76
type SpaceSchema = Readonly<{ channels: readonly string[]; hueIndex?: number; css: boolean }>;

export const SPACE_SCHEMA = {
    rgb:   { channels: ["r","g","b"],   css: true },
    hsl:   { channels: ["h","s","l"],   hueIndex: 0, css: true },
    hsv:   { channels: ["h","s","v"],   hueIndex: 0, css: false },
    hwb:   { channels: ["h","w","b"],   hueIndex: 0, css: true },
    lab:   { channels: ["l","a","b"],   css: true },
    lch:   { channels: ["l","c","h"],   hueIndex: 2, css: true },
    …
} as const satisfies Record<SpaceId, SpaceSchema>;

export const SPACE_IDS = Object.freeze(Object.keys(SPACE_SCHEMA) as SpaceId[]);
```

It knows every space, every channel key, which channel is the hue axis, and which spaces are
CSS-paintable. It is `as const satisfies Record<SpaceId, …>` — already exhaustive by construction.

### 2b — it is published nowhere

`src/color/index.ts` re-exports 12 types and 22 functions from `./model` and `./operations`.
`SPACE_SCHEMA` and `SPACE_IDS` are in neither list. Confirmed against the built artifact:

```
$ grep -c "SPACE_IDS" dist/subpaths/color.d.ts dist/subpaths/css.d.ts
dist/subpaths/color.d.ts:0
dist/subpaths/css.d.ts:0
```

The published `dist/subpaths/color.js` export list is 23 names; neither appears.

### 2c — the demo re-types it, measured

Parser over both files (`<scratchpad>/dup.mjs`, never written to the repo), comparing
`src/color/model.ts` to `demo/color-session/picker-color.ts`:

```
$ node <scratchpad>/dup.mjs
SPACE_SCHEMA spaces: 17
PICKER_CHANNELS spaces: 17
channel-key-list IDENTICAL for 17 of 17
differences: []
SPACE_SCHEMA css:true = 13 ["a98-rgb","display-p3","hsl","hwb","lab","lch","oklab","oklch",
                            "prophoto-rgb","rec2020","rgb","srgb-linear","xyz"]
CSS_PICKER_SPACES    = 13 ["a98-rgb","display-p3","hsl","hwb","lab","lch","oklab","oklch",
                            "prophoto-rgb","rec2020","rgb","srgb-linear","xyz"]
IDENTICAL SET: true
SPACE_SCHEMA hueIndex: hsl:0 hsv:0 hwb:0 lch:2 oklch:2
```

Three verbatim duplications of library facts inside `demo/color-session/picker-color.ts`:

| library fact | `src/color/model.ts` | demo copy | agreement |
|---|---|---|---|
| channel keys per space | `SPACE_SCHEMA[*].channels` | `PICKER_CHANNELS` (`:53-71`) | **17 of 17 identical** |
| which spaces are CSS-paintable | `SPACE_SCHEMA[*].css` | `CSS_PICKER_SPACES` (`:92-96`) | **13-member set identical** |
| which channel is the hue axis | `SPACE_SCHEMA[*].hueIndex` | `hue?: true` marker (`:49`) | same 5 spaces |

Nothing links them. All three drift silently.

### 2d — the fourth copy is the one this component iterates

`demo/color-session/color-space-meta.ts:38` — imported at `MixConfigBar.vue:18`, rendered at `:129`:

```ts
export const HUE_INTERPOLATION_METHODS: HueInterpolationMeta[] = [
    { value: "shorter", … }, { value: "longer", … },
    { value: "increasing", … }, { value: "decreasing", … },
];
```

A hand-written **value** mirror of a **published type** — `HueInterpolationMethod = "shorter" |
"longer" | "increasing" | "decreasing"` (`src/color/model.ts:46`). The library publishes the type and
withholds the tuple, so the runtime list must be re-typed in the consumer. That is precisely r2
L2-5's finding; **R5-2 names its cause.** `INTERPOLATION_SPACES` (`:26`) is the same shape over the
9-of-17 curation r2 L2-4 found — and with `SPACE_IDS` unpublished, the demo has no way to *state* that
curation as a subset of anything.

### 2e — why this is a library-structure defect and not a demo one

The invariant is unique semantic ownership. *Which spaces exist · which channels they carry · which
channel is hue · which are CSS-paintable · which hue arcs exist* are **library facts**. The library
computes all five, uses all five internally, and exports none of them as values. Every consumer that
needs to *enumerate* rather than merely *type-check* must therefore re-derive them by hand — and the
dogfood consumer, which exists to prove the public surface is sufficient, has quietly proven it is
not, four times over, in one directory.

- **Mechanism.** A type-only public surface over a value-carrying internal registry. Consumers can
  name the domain but cannot walk it, so they rebuild it.
- **Reproduction.** The `grep -c` and the `dup.mjs` output above.
- **Cure — publish the registry, then derive.**
  ```ts
  // src/color/index.ts  +  src/subpaths/color.ts
  export { SPACE_IDS, SPACE_SCHEMA } from "./model";
  export const HUE_INTERPOLATION_METHODS =
      ["shorter", "longer", "increasing", "decreasing"] as const
      satisfies readonly HueInterpolationMethod[];
  ```
  Then `picker-color.ts` derives `PICKER_CHANNELS` keys and `CSS_PICKER_SPACES` from `SPACE_SCHEMA`,
  keeping only the genuinely demo-owned min/max/unit ranges (a *picker* fact, correctly homed);
  and `color-space-meta.ts` becomes a label overlay keyed by the library's ids —
  `Record<HueInterpolationMethod, Meta>` for the arcs (exhaustive by construction, closing r2 L2-5)
  and an explicitly-typed `Record<Exclude<SpaceId, "kelvin" | "ictcp" | …>, Meta>` for the spaces
  (which *states* the curation instead of hiding it, closing r2 L2-4). Both prior findings collapse
  into one export. This composes with r4 R4-1's `mixSequence`/`sampleColorRamp` pair — same subpath,
  same wave, and it is the smaller half of the same transposition.

---

## §3 · R5-3 — MAJOR · per-instance costume over the root register; two of the four override classes are measured no-ops

Round 2 pasted `class="h-10 gap-2 font-medium font-display"` verbatim as evidence for L2-1's dead
`variant` prop, and stopped there. No round measured what those four classes actually do. All four are
per-instance overrides of a design-system primitive, which edict 5 forbids outright — and three of the
four turn out not even to be *doing* anything the root did not already say.

Measured in the running dev server at `http://localhost:9000/#/mix` by cloning the live nodes,
stripping one class at a time, and reading `getBoundingClientRect()` / `getComputedStyle` on both:

```
tokens (from getComputedStyle(document.documentElement)):
  --control-h-xs 1.75rem | --control-h-sm 2.25rem | --control-h-md 2.5rem | --control-h-lg 2.75rem

mixH_asShipped: 40        mixH_noH10_noFontMedium: 40        ← h-10 changes NOTHING
mixWeight_asShipped: 500  mixWeight_noOverride: 500          ← font-medium changes NOTHING
mixFont_asShipped: Fraunces   mixFont_noFontDisplay: "Plus Jakarta Sans"
trigH_asShipped: 36       trigH_noH9: 39
```

| class | site | root register | measured effect | verdict |
|---|---|---|---|---|
| `h-10` | `:165` | `--control-h-md` = 2.5rem = **40 px**; `Button` defaults to `size="md"` | 40 → 40 | **pure no-op** |
| `font-medium` | `:165` | `.button { font-weight: 500 }` (`components/button/styles.css`) | 500 → 500 | **pure no-op** |
| `h-9` | `:100`, `:123`, `:147` | `--control-h-sm` = 2.25rem = **36 px**; `SelectTrigger` declares `size?: "sm" \| "default"` | 39 → 36 | **re-implements a prop that exists** |
| `font-display` | `:165` | none — `Button` has no typographic-voice axis | Plus Jakarta Sans → Fraunces | **the one live override; the real edict-5 violation** |

Two of these deserve their own sentence.

**`h-9` is the sharp one.** glass-ui's `SelectTrigger.vue.d.ts` declares:

```ts
export interface SelectTriggerProps {
    variant?: "default" | "ghost";
    /** Trigger height register. */
    size?: "sm" | "default";
}
```

The component never passes it — live DOM confirms `data-size` is `null` — and instead forces the
height with a raw Tailwind class that lands on **exactly** the value the `sm` token defines
(2.25rem = 36 px, measured to the pixel). The design system offered the register, named it "Trigger
height register" in a doc comment, and the consumer re-derived the number by hand. `GradientVisualizer.vue:182`
carries the identical `h-9`, so the costume is systematic, not local — it is the same copy r1 L-3
found, wearing the same mistake.

**`font-display` is the honest violation.** Fraunces on a glass-ui `Button` has no producer seam:
`ButtonProps` is `emphasis × tone × size × iconOnly × loading` and carries no voice axis. So the demo
dresses the instance. Under edict 4 that is a glass-ui gap, not a demo licence.

This finding is the quiet half of r2 L2-1. L2-1 found that the *prop* the CTA passes does not exist.
R5-3 finds that three of the four *classes* it passes alongside are either redundant with the root or
substitutes for props that do. The same line of markup is fighting the design system on both axes at
once — and the reason the fight is invisible is the same reason L2-1 was: nothing at the boundary
compares what the consumer asked for against what the producer offers.

- **Mechanism.** Utility-first styling applied *over* a token-driven component system, with no gate
  that can see the redundancy. Tailwind classes always "work"; that is exactly why they mask a root
  register that already said the same thing.
- **Reproduction.** The clone-and-strip `page.evaluate` above, against the live dev server; the token
  values read from `:root`; `SelectTrigger.vue.d.ts` quoted from the installed package.
- **Cure.** `size="sm"` on the three `SelectTrigger`s (and on `GradientVisualizer.vue:182`); delete
  `h-9`, `h-10`, `font-medium` — three classes that say nothing the root did not. For `font-display`:
  if the house wants primary verbs in the display voice, that is a producer concern — a `voice` axis
  on `Button`, or a documented `--button-font-family` seam — **relayed to glass-ui BH**, not four
  Tailwind classes on one instance. Note the cure lands with r2 L2-1's (`emphasis="primary"`) on the
  same five lines of markup: one edit closes both.

---

## §4 · R5-4 — MAJOR · the Mix verb has two homes with divergent affordances

The component is named a *config bar* and owns the page's primary action (`:162-170`). The same verb
exists a second time, in the shell, and no prior round names the file:

```ts
// demo/shell/usePaneRouter.ts:219-223
actions: computed(() => [
    { key: "clear", icon: Trash2, title: "Clear",  description: "Clear all selected colors.",
      handler: () => paneRefs.mix.value?.clearSelection?.() },
    { key: "mix",   icon: Blend,  title: "Mix",    description: "Mix the selected colors.",
      handler: () => paneRefs.mix.value?.startMix?.() },
    { key: "copy",  icon: Copy,   title: "Copy result", … },
]),
```

Same verb, same label, **same `Blend` icon** as `MixConfigBar.vue:168`. Two implementations: one as
declarative registry metadata, one as inline markup.

**They disagree on state.** The pane's button is `:disabled="!canMix"` — confirmed live:

```
hasDisabledAttr: true   domDisabled: true   matchesDisabled: true
opacity: "0.5"          cursor: "not-allowed"
```

The dock action carries no disabled concept at all. Its only guard is inside the state machine:

```ts
// demo/workbenches/mix/composables/useMixingState.ts:82
function startMix() {
    if (!canMix.value) return;
```

So on `/#/mix` with fewer than two operands, the pane shows a visibly disabled button while the dock
shows an identically-labelled, fully-enabled one that does nothing when pressed. The enabled
predicate is declared once and *ignored* once.

**The structural consequence chains outward.** Because the verb lives in the config bar rather than
the pane:

- `MixPane.vue:57` must `defineExpose({ clearSelection, startMix, copyResult })` to give the shell a
  handle into pane internals;
- `MixConfigBar` must accept a `canMix` prop and emit a `mix` event — two of its six props/emits have
  nothing to do with configuration;
- the shell reaches a component's imperative surface through `paneRefs.mix.value?.startMix?.()`, with
  two optional chains that will silently swallow a rename.

That last point is the same failure mode as r2 L2-1 one layer out: `?.startMix?.()` cannot fail
loudly. Rename `startMix` and the dock action becomes a no-op with a green build — exactly how
`variant` survived a glass-ui major.

- **Mechanism.** A component named for one responsibility (configuration) acquired a second (the
  page's primary action), and the shell then needed a second route to it. Two homes for one verb, and
  the enabled predicate only travelled to one of them.
- **Reproduction.** `usePaneRouter.ts:221` vs `MixConfigBar.vue:162-170`; live DOM `disabled === true`
  on the pane button with no equivalent on the dock action; `useMixingState.ts:82` as the sole guard.
- **Cure.** One home for the verb, and one declaration of its predicate. Either **(a)** the config bar
  is only configuration and the Mix button moves to `MixPane` beside the result plate — then `canMix`,
  the `mix` emit and `defineExpose({ startMix })` all collapse into pane-local state; or **(b)** the
  pane-action registry becomes the single declaration, gains a `disabled?: ComputedRef<boolean>` field,
  and the pane renders its primary action *from* the registry. **(a)** is the smaller change and the
  better boundary: the shell should route, not hold verbs. Either way the registry entry must carry
  the predicate, and `paneRefs.mix.value?.startMix?.()` should become a typed pane contract rather
  than two optional chains — which is r3 L3-1's lint theme applied to the imperative surface.

---

## §5 · Rounds 1–4 — carried in full, round-5 status

No prior finding is retracted, downgraded, or contested. ✓ marks one I re-derived independently this
run before reading it; **+** marks one where I gathered evidence that strengthens it.

| id | sev | round-5 status |
|---|---|---|
| r1 **L-1** | BLOCKER | carried. |
| r1 **L-2** | MAJOR | carried ✓ (`demo/palettes/mix.ts` reached from `workbenches/mix` at `MixConfigBar.vue:14` + `useMixingState.ts:23`). |
| r1 **L-3** | MAJOR | carried ✓ **+** — re-diffed the twin blocks independently and logged four live divergences: `<label>` vs `<span>` (`:98` / `GradientVisualizer.vue:180`), the preview-ramp lane present vs absent, the 3-hop vs 1-hop vocabulary import, and identical `class="h-9"` in both (which is **R5-3**). The copies drift on everything except the mistake. |
| r1 **L-4** | MAJOR | carried ✓ **+** — beyond the barrel-vs-direct census, glass-ui publishes **74** export keys and the demo uses three specifier styles at once: the `demo/ui/` barrel (19 dirs, **29 lines total**), the bare root (**18** sites outside `demo/ui/`, incl. siblings `MixPane.vue:12`, `MixResultDisplay.vue:5`), and granular subpaths (`/dock` 15, `/watercolor-dot` 11, `/dark` 9, `/aurora` 9, `/dom` 8 …). `dialog` is provably dual: `demo/ui/dialog` has 5 consumers **and** `@mkbabb/glass-ui/dialog` has 2. |
| r1 **L-5** | MAJOR | carried ✓ — re-derived the identical 3-hop chain and both self-declaring comments (*"keep their import path"*, `useGradientInterpolation.ts:14-16`; *"Re-exports (preserve public API surface)"*, `useGradientModel.ts:19`). |
| r1 **L-6** | MAJOR | carried ✓ **+** — round 4 measured `SelectionValue` unexported from `index.d.ts`. I widened the search to **every** glass-ui entry declaration: `for f in dist/*.d.ts; do grep -l SelectionValue "$f"; done` → **no output**. It is unreachable from all 74 export keys, not just the root. The producer gap is total, which is why four demo files reach into reka-ui. |
| r1 **L-7** | MINOR | carried ✓ (`tsc` probe reproduced independently: `Record<LeftoverStrategy,…>` errors TS2741 on a new member, `LeftoverStrategy[]` is silent). Merged with L2-5 in r4 R4-4b. |
| r1 **L-8** | MAJOR | carried. |
| r1 **L-9** | INFO | carried ✓ — re-confirmed no `[data-stops]` node exists at rest; the lazy claim at `:19-22` holds. |
| r2 **L2-1** | BLOCKER | carried ✓ **+** — independently reproduced the live DOM (`data-emphasis="secondary"`, `variant="primary-audacious"` as a raw attribute, `glass-wash glass-capsule`). Adding the gate evidence L2-1 did not record: `npx vue-tsc -p tsconfig.demo.json --noEmit` → **EXIT=0**, so the demo typecheck is provably blind to it; and glass-ui's `.button[data-emphasis="primary"]` rule (`components/button/styles.css` — `--glass-bg-floating`, `--glass-plate-tinted`, `blur-deep`, `font-weight: 650`) is the exact register the source comment wants, one word away. **R5-3 is its class-side twin.** |
| r2 **L2-2** | MAJOR | carried ✓ **+** — re-verified the three phantom keys by file existence (`ls dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts` → three "No such file"). Two additions L2-2 did not record: `paths` **omits `@mkbabb/value.js/css`**, which the demo imports **10** times and `src/` imports **3** times — so those resolve by a *different* mechanism (the `node_modules` symlink) than the other four, two resolution paths in one program; and `./value` is published with **0** demo consumers — dead public surface the dogfood never exercises. |
| r2 **L2-3** | MAJOR | carried — cure corrected by r4 R4-1d. |
| r2 **L2-4** | MAJOR | carried. **Root cause supplied by R5-2**: the demo cannot state the 9-of-17 curation as a subset because `SPACE_IDS` is unpublished. |
| r2 **L2-5** | MAJOR | carried. **Root cause supplied by R5-2**: the library publishes the `HueInterpolationMethod` type and withholds the tuple, so the runtime list must be hand-written. |
| r2 **L2-6** | MINOR | carried ✓ (live DOM label census: both `<label class="section-label">` carry `for: null` and wrap `0` controls). **+** glass-ui ships a `Label` component re-exported at `demo/ui/label/index.ts` with **zero** consumers repo-wide, against 12 bare `<label>` elements. |
| r2 **L2-7** | MINOR | carried — extended by r4 R4-2. |
| r3 **L3-1** | MAJOR | carried. **R5-4 is the same theme on the imperative surface**: `paneRefs.mix.value?.startMix?.()` is a boundary crossing with two optional chains and no contract. |
| r3 **L3-2** | MAJOR | carried. |
| r3 **L3-3** | MAJOR | carried. |
| r3 **L3-4** | MINOR | carried. |
| r3 **L3-5** | MINOR | carried. |
| r3 **L3-6** | MINOR | carried. |
| r3 **L3-7** | INFO | carried — superseded in framing by r4 R4-1. |
| r3 **L3-8** | MINOR | carried ✓ (per-directory consumer census: `label` → 0, `switch` → 0). |
| r4 **R4-1** | MAJOR | carried. **R5-2 is its smaller sibling** — same subpath, same wave: R4-1 adds the two missing *operations*, R5-2 publishes the missing *registry*. |
| r4 **R4-2** | MAJOR | carried. |
| r4 **R4-3** | MAJOR | carried. **R5-1 is the manifest-level statement of the same ownership defect**: R4-3 shows the library's *tests* already own demo code; R5-1 shows the library's *manifest* already owns demo dependencies. Same fusion, two artifacts. |
| r4 **R4-4** | MINOR | carried. |

---

## §6 · The greenfield lattice — five rounds folded

Round 4's four strata stand unchanged in shape. Round 5 adds **one stratum above them all** — the
package boundary, which no prior round drew because no prior round looked at the manifest — and three
edges inside the existing ones.

```
  L0  ── THE PACKAGE BOUNDARY ──                                            ← R5-1 (NEW STRATUM)
      @mkbabb/value.js        dependencies: {}          ← nothing. dist/ imports nothing.
                              devDependencies: { @mkbabb/glass-ui, @mkbabb/keyframes.js, … }
        │  ⟦gate 0⟧  Object.keys(pkg.dependencies ?? {}).length === 0
        │            the manifest twin of inv-K-1, which tsconfig.lib.json already enforces at
        │            the type level and the manifest silently breaks
        │  the value.js → glass-ui → value.js CYCLE is gone; the demo is a devDependent, not a peer
        ▼
  L1  @mkbabb/value.js/color
        mixColors(a, b, t)                  binary                            (exists)
        mixSequence(colors, opts)           N → 1  THE OPERATION              ← r1 L-2 · R4-1
        sampleColorRamp(colors, opts)       N → k  THE PATH                   ← L2-3 · L3-7 · R4-1
              ── the two RELATED by construction, not merely adjacent ──      ← R4-1d
        SPACE_IDS · SPACE_SCHEMA            the registry, PUBLISHED           ← R5-2 (NEW EDGE)
        HUE_INTERPOLATION_METHODS  as const satisfies readonly HueInterpolationMethod[]
              ── closes L2-4 (the curation becomes statable) and L2-5 (exhaustive by construction)
        │  ⟦lint 1⟧ no demo module names src/ — the T.W1 keystone made structural
        │  ⟦gate⟧   `grep -rln 'from "../demo/' test/` names only VIEW concerns   ← R4-3
        ▼
  L2  @mkbabb/glass-ui/{select,button,forms,typography,…}   demo/ui/ deleted  ← r1 L-4 / L3-8
        Select generic over its value; SelectionValue EXPORTED from the barrel  ← r1 L-6 (+R5)
        Button: emphasis × tone × size — and a `voice` axis, so `font-display` has a home ← R5-3
        SelectTrigger size="sm" consumed as a PROP, never re-derived as h-9      ← R5-3
        FieldLabel ships the atom, not just the class                            ← L3-3
        │  ⟦lint 1⟧ zero demo edges to reka-ui
        │  ⟦lint 4⟧ no Tailwind class on a glass primitive that a token already sets ← R5-3 (NEW)
        ▼
  L3  demo/color/                 ← replaces demo/color-session/ (L3-5)
        InterpolationSelect.vue   ← r1 L-3 / L2-6 / L3-3 — ONE space+hue control, TWO consumers
              props { space, hue, preview: "ramp" | "result" }                  ← R4-1c
        spaces.ts   — a LABEL OVERLAY keyed by SPACE_IDS, no facts of its own    ← R5-2
        convert.ts · chips/ · ink/ · session/
        │  ⟦lint 2⟧ L3 never imports an L4 feature tree
        ▼
  L4  demo/workbenches/mix/       MixPane — owns the verb ONCE, with its predicate  ← R5-4 (NEW EDGE)
                                  MixSourceSelector · MixConfigBar · MixResultDisplay
                                  mix-domain.ts   ← r1 L-2 (relocated out of demo/palettes/)
      demo/model/palette.ts       Palette · PaletteColor — the data model         ← R4-4a
        │  MixConfigBar: 173 → ~55 lines. 3× defineModel + <InterpolationSelect> + the leftover row.
        │  No verb, no canMix, no reka edge, no casts, no vocabulary, no ramp computation.
        ▼
  ⟂   demo/shell/                 routes; holds NO verbs. The pane-action registry carries a
                                  typed contract + a disabled predicate, not `?.startMix?.()`  ← R5-4
```

**Round 4's rules 0–6 stand. Two gain a clause; one is new.**

- **Rule 0** (*every boundary has a live lint rule*) gains its outermost case: **the `package.json`
  `dependencies` field is a boundary declaration, and it is the only one that ships.** A library whose
  type program is "structurally glass-ui-free" while its manifest depends on glass-ui has written its
  boundary in the one place consumers cannot see and broken it in the one place they can. **(R5-1)**
- **Rule 5** (*the library's granularity is set by what consumers actually write — and by what they
  claim*) gains: *…and by what they must **enumerate**. A type-only export lets a consumer name the
  domain; only a value export lets them walk it. Where the library iterates a registry internally and
  a consumer must iterate the same registry, withholding the value forces a hand-written copy —* four
  of them, in one directory, all currently exact. **(R5-2)**
- **Rule 7 — NEW: a design system's registers must be consumed as props, never re-derived as values.**
  `h-9` landing on exactly `--control-h-sm` (2.25rem = 36 px, measured) while `SelectTrigger` ships a
  `size="sm"` prop is the token system working perfectly and the consumer routing around it. The
  receipt is a class that produces the *right* number by the *wrong* mechanism — which is worse than a
  wrong number, because nothing will ever flag it. **(R5-3)**

---

## §7 · Negative proof — checked this round, genuinely sound

Recorded so the absences are evidence, including probes I ran and discarded.

1. **The public surface is clean in the code.** `MixConfigBar.vue:12` →
   `@mkbabb/value.js/color`, a real `exports` key; `HueInterpolationMethod` is exported at
   `src/subpaths/color.ts:8` and present in the built `dist/subpaths/color.d.ts`. Independently
   re-censused every value.js specifier in the demo — `color` 24, `css` 10, `math` 6, `easing` 5,
   `quantize` 4 — **all five are real `exports` keys; zero deep paths; zero bare-root imports.** A
   real npm consumer could write line 12 verbatim. (The *config* around it is r2 L2-2's defect, and
   the *manifest* around it is R5-1's; the import itself is correct.)
2. **`verbatimModuleSyntax` honoured.** Lines 12, 13, 14, 15 all `import type`; lines 18 and 23 are
   genuine value imports. Edict 8 satisfied. Whole-demo typecheck `EXIT=0`.
3. **Dependency direction is downhill within the demo.** `workbenches/mix` → `color-session` (domain)
   and → `palettes` (domain). No feature → shell edge, no component → boot edge, no import of
   `App.vue` or `usePaneRouter`. The cross-feature reach the file's own comment claims cured
   (S.W5-6 · F16) is genuinely cured — line 18 reads the neutral home, not the gradient tree.
4. **Not a god module.** 173 lines, one job, no local state, no timers, no fetches, one `computed`
   pair. Every defect across five rounds is a *boundary* defect. The god-module finding in this
   neighbourhood is a directory (r3 L3-5), not this file.
5. **The disabled state on the CTA works.** I initially measured `disabled === false` with
   `pointer-events: none` and nearly filed it as a dropped prop. Re-probing after a clean navigation
   showed `hasDisabledAttr: true`, `matchesDisabled: true`, `opacity: 0.5`, `cursor: not-allowed` —
   my first read caught the pane mid-transition with a stale dialog in the tree. **glass-ui's `Button`
   forwards `disabled` correctly** (`button-Bu9F4uU6.js`: `disabled: h.value ? m.value : void 0`, plus
   an `aria-disabled` branch for the `asChild` case). **No finding.** Recorded because the false
   positive was one probe away from being reported, and R5-4's real finding — that the *dock* copy has
   no disabled concept — only became visible once this one was cleared.
6. **A second discarded probe.** I checked whether `.section-label` and `text-micro` were undefined
   demo-local classes (neither appears in `demo/styles/*.css` nor in `dist/glass-ui.css`). They are
   **producer-owned**, delivered through glass-ui's Tailwind *source* surface —
   `@import "@mkbabb/glass-ui/styles"` at `demo/styles/foundation.css:56`, with
   `demo/styles/utils.css:13` naming `.section-label` as "glass-ui typography". The styling is
   correctly rooted; only the *element* is ad hoc (r2 L2-6). **No finding.**
7. **Visual audit: nothing attributable to this component.** `REPORT.md` per-capture rows for `/#/mix`,
   all four Safari matrices — `pageErr 0 · consoleErr 0 · overflowX 0 · main 1`. The 8 desktop /
   4 mobile `smallTapTargets` and the 1 `namelessButton` are outside this component's subtree; its own
   targets measure 36 px (`SelectTrigger`) and 40 px (CTA), both named via `aria-label` / text
   content. `shots/safari-desktop-light/mix.png` renders the bar correctly — COLOR SPACE and HUE
   METHOD side by side, the size-mismatch row correctly hidden in colors mode, the CTA full-width and
   disabled. The screenshot does, however, corroborate r2 L2-1 visually: the CTA is the palest,
   lowest-contrast element on the pane, which is the wash tier its own source comment forbids.

---

## §8 · Verdict

**DEFECTIVE** — cumulative across five rounds: **3 BLOCKER · 18 MAJOR · 8 MINOR · 2 INFO.**

**Strongest defect this round, and the strongest on this axis across all five: R5-1.** The published
`@mkbabb/value.js@4.0.0` declares `@mkbabb/glass-ui ^7.0.0` and `@mkbabb/keyframes.js ^6.0.0` as
runtime `dependencies`. Neither appears anywhere in `src/` or in `dist/` — the only directory the
package ships. Every `npm i @mkbabb/value.js` therefore installs **5.8 MB** of unreachable Vue design
system and animation engine against a **1.7 MB** product, and inherits eleven unmet peer warnings for
a library installed to convert OKLCh. Worse, glass-ui@7.0.0 declares `@mkbabb/value.js: ^4.0.0` as a
**peerDependency** — so the manifest closes a published producer↔consumer **cycle**, at pinned majors
on both sides. The library's own `tsconfig.lib.json` is described as *"structurally glass-ui-free
(inv-K-1)"*; the invariant holds in the type program and is broken in the one artifact consumers
actually receive.

That is the deepest answer this seat has to the question it was given. Rounds 1–4 kept finding
glass-ui defects inside a color library's component audit — a dead `variant` prop, a 19-module alias
layer, a reach into reka-ui, an unexported `SelectionValue` — and treated each as a consumer mistake.
They are consumer mistakes. But **the reason a color library's audit is full of design-system findings
at all is that the manifest never separated the two.** The demo is not a consumer of value.js; it is
fused to it, and R4-3 found the same fusion in the test suite (53% of the library's vitest files
import from `demo/`). Two artifacts, one boundary that was never drawn.

**R5-2** is the same withholding in miniature and supplies the root cause under two prior findings.
The library owns a complete runtime registry — `SPACE_SCHEMA` + `SPACE_IDS`, `src/color/model.ts:56,76`,
already `as const satisfies Record<SpaceId, …>` — and publishes neither
(`grep -c SPACE_IDS dist/subpaths/color.d.ts` → **0**). So the dogfood consumer re-types it: channel
keys **17/17 identical**, the CSS-paintable set **13/13 identical**, `hueIndex` re-spelled as
`hue?: true`, and — the copy this component iterates at `:129` — the hue-arc tuple hand-written beneath
a published type. r2 L2-4 found the 9-of-17 gap and r2 L2-5 found the non-exhaustive arc list; both are
downstream of one missing `export`.

**R5-3** shows the design-system boundary failing on a second axis in the same five lines r2 L2-1
already condemned: `h-10` and `font-medium` are measured no-ops (40→40 px, 500→500), and `h-9`
re-derives `--control-h-sm` — 2.25rem, **36 px exactly** — in raw Tailwind while `SelectTrigger` ships
a `size="sm"` prop whose doc comment literally reads *"Trigger height register."* A class that
produces the right number by the wrong mechanism is worse than a wrong number: nothing will ever flag
it.

**R5-4** shows the last unowned concept: the Mix verb lives in a component named for configuration and
again in `usePaneRouter.ts:221`, same label, same `Blend` icon, with the disabled predicate travelling
to only one of them — so the dock's Mix is permanently enabled and silently does nothing, reached
through `paneRefs.mix.value?.startMix?.()`, two optional chains that cannot fail loudly.

Round 3 closed on *"the rule that said there must be only one home no longer matches any file."*
Round 4 added *"where one concept did get a single home, the guard built to protect it was pointed at
its own reflection."* Round 5 adds the layer beneath both: **the outermost boundary — the one the
package manifest declares and the only one consumers can see — was never drawn at all**, and every
inward defect these five rounds found has been growing in the space where it should have been.

---

*Seat: CHALLENGE-L (library structure), round 5. Rounds 1–4 preserved verbatim at
`challenge-L-library-round-{1,2,3,4}.md`. No source edits land from this formation. All probe and
`tsc` scripts were written to the session scratchpad, never to the repository. Browser probes were
read-only against the running dev server at `:9000`.*
