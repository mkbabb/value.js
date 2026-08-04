claude-opus-5[1m]

# CHALLENGE C — CONSUMPTION · `CanvasOverlayButton.vue`

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasOverlayButton.vue`
(25 lines · 595 bytes · sha256 `35f3db919432e330205348c8fed2132892a5d36f514873a792a77bc5d85b5efd`)
**Axis** C — consumption of value.js `0.13.0` · keyframes.js `4.3.0` · glass-ui `^4.0.0` · the fourier API 45-operation surface; props/emits contract quality; integration seams.
**Method** static + source-derived only (no browser). Every artifact below was read in the live
`fourier-analysis` tree at `HEAD = cd26c65` and in `web/node_modules/` as installed today (2026-08-04).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; each claim carries its
own falsifier and dies if the falsifier holds.

---

## §0 — The consumption surface, enumerated

The whole import graph this file owns is **one edge**:

```
CanvasOverlayButton.vue:9   import { Button } from "@mkbabb/glass-ui/button";
```

| Consumed constellation surface | This component | Evidence |
|---|---|---|
| **value.js `0.13.0`** | **ZERO** | `grep -rn "@mkbabb/value.js" web/src/` → 5 sites, all easings (`ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `lib/easings.ts:9,16`, `equation/lib/harmonics.ts:5`); none is this file |
| **keyframes.js `4.3.0`** | **ZERO** | `grep -rn "@mkbabb/keyframes.js" web/src/` → `composables/useFourierMorph.ts:14` only (+ a prose note at `stores/animation.ts:47`) |
| **fourier API (45 ops)** | **ZERO** | no `lib/api.ts` import; no store; no fetch |
| **fourier-local `lib/colors.ts`** | **ZERO** | no import |
| **glass-ui `4.0.0`** | `Button` via the `./button` subpath | above |

Everything in this challenge therefore turns on **one dependency edge and one 8-line template**. That
narrowness is itself the finding: §2 shows what the edge gets right, §1 shows where it is broken or
unratified.

Corpus fold — the hitherto record on this file is **five prior verdicts, all DELETE**:
`docs/audits/runs/2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:29` (A8-14) ·
`.../2026-06-17-M-critique-audit/findings-index.txt:105` (CHR-26) and `:144` (A8-21) ·
`docs/tranches/M/M.md:141` · `docs/tranches/M/design/M-bump-migration.md:56,199` (STEP 2i).
The megatranche record: `formation/fourier/lane-frontend.md:101,304` (census row + the import line) ·
`coordination/FOURIER-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:72` ("`InfoCard` and
`CanvasOverlayButton` remain unmounted") · `coordination/FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md:31`
(**`F8-REACH-02`**, workflow `N.C39`, "**HOLD is RED**").

---

## §1 — DEFECTS (10 · 2 BLOCKER · 3 MAJOR · 4 MINOR · 1 INFO)

### C-1 · BLOCKER · The consumption contract has never been ratified — zero consumers, unreachable by construction

**Claim.** The component consumes glass-ui but is itself consumed by nothing, and cannot be: it is
unreachable by every resolution mechanism the app owns. Its props/emits contract has therefore never
been exercised by a single call site, so every contract claim in §1's remainder is *latent*, and
`F8-REACH-02` (2026-08-03) rules that continuing to hold it in that state is RED.

**Provenance.**
- `grep -rn "CanvasOverlay" --exclude-dir=node_modules /Users/mkbabb/Programming/fourier-analysis/web/` → **exit 1, zero hits** (not even a self-hit: the file's own jsdoc says "canvas-overlay", lowercase-hyphenated, `CanvasOverlayButton.vue:3`).
- No global auto-registration: `web/vite.config.ts` plugins are `latexPaperPlugin` + `vue()` only — **no `unplugin-vue-components`**, so a `<CanvasOverlayButton>` tag cannot resolve without an explicit import.
- No string-keyed resolution: `grep -rn "import.meta.glob\|defineAsyncComponent" web/src/` → one file, `GalleryView.vue:31-33`, three **literal** paths (`AdminUserList` / `AdminFlaggedPanel` / `AdminAuditLog`). No glob, no dynamic component registry.
- Byte-identity with the census: `shasum -a 256` → `35f3db91…5efd`, `wc -c` → `595` — **exact match** to `FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md:31`. Nothing has moved since the delta was published.
- Age: `git log -1 -- …/CanvasOverlayButton.vue` → `262c3d0 2026-06-02`. Orphaned at `2f53d5d feat(web): replace overlay buttons with canvas controls dock`; DELETE first ordered 2026-06-16 (A8-14). **49 days** of ordered-but-unexecuted deletion; `docs/tranches/M/PROGRESS.md:16` still lists "DELETE `CanvasOverlayButton`" as FINISH-owed on an uncommitted branch.

**Falsifier.** Any importer, any `import.meta.glob` whose pattern covers `components/visualization/*.vue`,
any `<component :is>` whose selector could evaluate to this component, or any e2e spec referencing it.
All four were checked; `e2e/` exists and is inside the grep root; all four are empty of it. The claim
stands.

**Scope honesty.** This is not "dead code, therefore harmless." On the consumption axis it is the
maximal defect: a component whose *only* function is to be consumed, that nothing consumes, while still
holding a live compile-surface cost (`tsconfig.json:19` includes `src/**/*.vue`; `package.json:8`
runs `vue-tsc -b` over it) and a live authored-contract claim (the jsdoc) that §C-3/§C-9 show to be false.

**Disposition input for `F8-REACH-02`.** The tree favours **DELETE**. `KEEP_WITH_MOUNT` would require
first repairing C-3/C-4/C-5/C-6 (all of which the live open-coded twin at `FullscreenViewer.vue:110`
also lacks — see C-10), i.e. mounting it would propagate C-4 and C-5 to every future overlay
affordance. `ISOLATED_HARNESS` buys nothing: there is no visual-regression harness in `web/` for it to
join (`playwright` config covers e2e only).

---

### C-2 · BLOCKER (inherited, not component-local) · The sole consumed package is installed peer-INVALID

**Claim.** `@mkbabb/glass-ui@4.0.0` — this component's only dependency — declares
`"@mkbabb/value.js": "^0.10.0 || ^0.11.0"`, and the tree installs `0.13.0`. The install is
**ELSPROBLEMS today**, so any strict `npm ci` / fresh `npm install` on this consumption edge is at risk.

**Provenance (live, this session).**
```
$ npm ls @mkbabb/value.js @mkbabb/glass-ui @mkbabb/keyframes.js     # web/
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS
```
`node_modules/@mkbabb/glass-ui/package.json` `peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`;
`web/package.json:22` declares `"@mkbabb/value.js": "^0.13.0"`; installed `0.13.0`.
`peerDependenciesMeta` marks value.js `optional: true` — which relaxes *presence*, **not** the range
check when the package is present; hence the invalid marking above rather than a silent pass.

**Corpus agreement.** `docs/audits/runs/2026-06-17-M-critique-audit/partial-prior-run.json:155` count (1)
predicted exactly this ("npm ls → ELSPROBLEMS … only closes at glass-ui 4.1.0"); the megatranche
excavation repeats it (`excavation/extracts/fourier-parsethat-truth.md:213`). **This challenge confirms
the prediction is still live 48 days later.**

**Falsifier — and the honest scoping it forces.** The falsifier for "this breaks *this component*" is:
does the `./button` module subgraph actually reach value.js? It does **not** —
`grep -c "value.js"` over `dist/button.js`, `dist/button-BNDWhAZb.js`, `dist/cn-DJXf4yaB.js` → `0, 0, 0`;
the chunk imports only `clsx`, `vue`, `reka-ui`, `class-variance-authority`. So the *runtime* of this
component is unaffected. The defect is **install-reproducibility**, is repo-wide, and is **not caused by
this file** — it is recorded here because it is the governing fact about the one package this file
consumes, and because C-1's `KEEP_WITH_MOUNT` option cannot be exercised on an install that `npm ci`
may refuse.

---

### C-3 · MAJOR · `.is-active` is provably inert on this element — the migration orphaned the class from its paint

**Claim.** `CanvasOverlayButton.vue:21` binds `:class="{ 'is-active': active }"`, but `variant="glass"`
emits **`btn-glass`**, while the glass-ui rule that paints the active state is **`.glass-btn.is-active`**
(`surfaces.css:111`). Different class. The class contributes nothing.

**Provenance (mechanism, not inference).**
- Emitted classes for `variant="glass" size="icon"` (`dist/button-BNDWhAZb.js`, cva `f`):
  base `btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium cursor-pointer active:scale-(--scale-press-btn) …`
  + glass `glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting) … aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]`
  + icon `h-(--control-h-md) w-(--control-h-md) p-0`. **`glass-btn` never appears.**
- Every `.is-active` selector shipped by glass-ui 4.0.0 is host-qualified, and none of the hosts is on
  this element: `glass/surfaces.css:111` `.glass-btn.is-active` · `glass/material.css:231-234`
  `.dock-icon-button/.dock-tab-button/.dock-select-trigger/.dock-dropdown-trigger` ·
  `dock-controls/icon-button.css:109` (nested `&` under `.dock-icon-button`) ·
  `dock-controls/triggers.css:99-109` (nested under `.dock-select-trigger`/`.dock-dropdown-trigger`) ·
  `dock-controls/tab-button.css:89` · `dock/layers.css:148-156`, `dock/layer-group.css:310,329`,
  `dock/rail-extend.css:381`. **No bare `.is-active` rule exists.**
- fourier's own CSS: `grep -rn "is-active" web/src/` → every backing rule is scoped to a *local* class
  (`.floating-toc-item.is-active`, `.sidebar-link.is-active`, `.easing-chip.is-active`,
  `.filter-toggle.is-active`, `.preset-pill.is-active`, `.eq-toggle-btn.is-active`,
  `.nav-dropdown-item.is-active`). **This file has no `<style>` block at all**, so no local paint either.

**Archaeology — the exact commit that broke it.**
```
$ git show be24948^:web/src/components/visualization/CanvasOverlayButton.vue
<button class="glass-btn" :class="{ 'is-active': active }">
```
Before `be24948 refactor(A.W3.b): migrate visualization+ui native <button> to <Button>`, the element
**did** carry `.glass-btn`, so `.glass-btn.is-active` matched and the class was load-bearing. The A.W3.b
migration swapped the host to `<Button variant="glass">` — which emits `btn-glass` **and always
`btn-pill`** — and kept the class binding. Note that re-adding `.glass-btn` is *not* the repair:
`surfaces.css:47-52` states `.glass-btn` and `.btn-pill` are "MUTUALLY EXCLUSIVE; never stack". The
correct migration was to delete the class and keep `aria-pressed` (which the same commit correctly
added — see S-2).

**Falsifier.** Any selector in glass-ui's shipped cascade or fourier's tree that matches `.is-active` on
an element carrying `btn-glass`/`glass-wash`/`btn-pill` and none of the dock-control classes. Exhaustive
grep over `node_modules/@mkbabb/glass-ui/dist/styles/**` and `web/src/**` finds none.

---

### C-4 · MAJOR · `aria-pressed="false"` is emitted on **every** instance, including non-toggle uses — a role misstatement

**Claim.** `active` is a type-only optional boolean prop, so Vue's boolean casting makes it `false` when
absent — never `undefined`. `:aria-pressed="active"` therefore always renders the attribute, and any
consumer using this wrapper for an *action* (close, download, reset — the normal canvas-overlay
vocabulary) ships a control that AT announces as "toggle button, not pressed". WCAG 2.2 **4.1.2
Name/Role/Value**.

**Provenance (both halves proved, not assumed).**
1. Compiler output — `vue/compiler-sfc` `compileScript` on the live file emits
   `props: { active: { type: Boolean, required: false } }` (no `default`).
2. Runtime — `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5011-5013`:
   ```js
   if (opt[0 /* shouldCast */]) {
     if (isAbsent && !hasDefault) { value = false; }
   ```
   with `shouldCast` set at `:5089` for `Boolean` prop types. Vue `3.5.38`.
3. The attribute reaches the DOM: `CanvasOverlayButton` → `Button` (`aria-pressed` is not a declared
   Button prop, so it lands in `$attrs`; Button does not set `inheritAttrs:false`) → reka-ui
   `Primitive` (`dist/Primitive/Primitive.js:12` `inheritAttrs:false` + `:26` `h(props.as, attrs, …)`,
   `as` defaulting to `"button"`) → real `<button aria-pressed="false">`.

**Sharpened by the tree's own reasoning.** `EasingPicker.vue:10-15` carries an authored comment stating
that "`aria-pressed` would mislabel a radio as a toggle" and deliberately uses
`role="menuitemradio"` + `aria-checked`. fourier's authors reason about exactly this hazard at the call
site — and this wrapper hard-codes the hazard one level *above* every future call site, where no
consumer can opt out (there is no way to pass `:aria-pressed="undefined"` and win; see C-8).

**Falsifier.** If the compiler emitted `active: {}` (untyped) or if Vue left absent booleans
`undefined`, the attribute would be dropped for non-toggle uses and the claim dies. Both were read in
the installed sources; neither holds.

**Repair shape (for the record, not applied).** `withDefaults(defineProps<{active?: boolean}>(), {active: undefined})`
+ `:aria-pressed="active === undefined ? undefined : active"`, or split the toggle affordance into a
distinct component and leave the action affordance role-neutral.

---

### C-5 · MAJOR · An icon-only wrapper with no accessible-name affordance

**Claim.** The component pins `size="icon"` and exposes only an unnamed default `<slot/>`. Nothing in
the chain supplies an accessible name: the cva emits `[&_svg]:pointer-events-none` and no `sr-only`
text; `Button` has no `label`/`aria-label` prop (`dist/components/ui/button/index.d.ts` +
`dist/button-BNDWhAZb.js` props = `variant, size, class, type, disabled, asChild, as`); `Primitive`
injects nothing. An icon-only `<button>` with an svg child and no `aria-label`/`title` has **no
accessible name** — WCAG 4.1.2 again.

**Why this belongs to the wrapper and not the consumer.** The component's stated purpose
(`CanvasOverlayButton.vue:3-8`) is to be the one place where the overlay-affordance contract is pinned.
It pins the two cosmetic knobs (`variant`, `size`) and leaves the one correctness knob to consumer
memory. glass-ui's own icon-button canon shows the alternative is available and idiomatic:
`DockIconButton.vue.d.ts` declares `compact`, `type`, `as`, `asChild`, `class` — a wrapper *can* declare
policy props.

**Live corroboration of the hazard.** `FullscreenViewer.vue:110`
`<Button variant="glass" size="icon" class="fs-close" @click="emit('close')"><Minimize2 …/></Button>` —
a shipping, mounted, icon-only glass Button with **no `aria-label` and no `title`**. The failure this
wrapper could have prevented is already in the tree at the exact site the wrapper was written for.

**Falsifier.** Any name source in the chain — a `title`/`aria-label` default in the cva, an `sr-only`
span in Button's template, or a reka-ui `Primitive` injection. `dist/button-BNDWhAZb.js`'s render fn is
`renderSlot($slots,'default')` inside `Primitive` with `data-slot/data-variant/data-size` only. None
exists. (UNPROVEN-NEEDS-LIVE for SS-13: the *computed* accessible name in a real AT tree — the static
chain is dispositive as far as source can go.)

---

### C-6 · MINOR · `type="button"` is not pinned — the one knob glass-ui's own icon canon *does* pin

**Claim.** `Button`'s `type` prop is undefined here, so `Primitive` renders `<button>` with no `type`
attribute and the HTML default `type="submit"` applies. A wrapper that exists to pin the contract omits
the pin that prevents accidental form submission.

**Provenance.** `dist/button-BNDWhAZb.js` `setup`: `d = computed(() => ({ type: u.type, disabled: u.disabled }))`,
merged into the Primitive vnode; `type` has no `default` in the props block (contrast `as: { default: "button" }`
on the same object). Against this, `dist/components/custom/dock/DockIconButton.vue.d.ts:15-16`:
> `/** Button type attribute (default: "button" to prevent form submission). */`
> `type?: ButtonHTMLAttributes["type"];`
and its resolved defaults block lists `type: "button" | "submit" | "reset"` as a *defaulted* prop.

**Falsifier.** A `type` default anywhere in Button's cva/props/Primitive path, or a global
`button { type }` impossibility (there is none — `type` is not settable from CSS). Neither exists.
Severity MINOR because no canvas overlay in this tree sits inside a `<form>` today — but the wrapper is
generic by construction, and C-1's `KEEP_WITH_MOUNT` option makes future placement unconstrained.

---

### C-7 · MINOR · The interaction contract is 100% implicit — no `defineEmits`, no `disabled`, no `inheritAttrs` guard

**Claim.** The component declares one prop and nothing else. Every interactive behaviour it advertises
("Forwards every attr/listener", `:5`) rides on two unstated invariants: (a) the template stays
single-root, and (b) `inheritAttrs` stays default. Neither is asserted in code, and a second root node
(a tooltip wrapper, a badge) would silently strip every listener from consumers with no type error and
no test to catch it — there is no test for this file anywhere (`e2e/` has zero references, C-1).

**Provenance.** `CanvasOverlayButton.vue:10-13` is the entire script surface: one `defineProps`. No
`defineEmits`, no `defineOptions`, no `defineExpose`. Compiled output confirms:
`_defineComponent({ __name, props: { active }, setup(){ … return { get Button(){…} } } })` — no `emits`,
no `inheritAttrs` key.

**Falsifier.** If the component declared `emits: ['click']` or `defineOptions({inheritAttrs: true})`,
or if a test pinned the fallthrough, the claim would be weaker. None do. INFO-adjacent, kept MINOR
because it is the mechanism by which C-1's "never exercised" becomes "cannot be regression-detected".

---

### C-8 · MINOR · Public type and runtime disagree about `active`

**Claim.** The exported type says `active?: boolean | undefined`; the runtime guarantees `boolean`. A
consumer who reads the type and writes `:active="undefined"` to mean "this one is not a toggle" gets
`aria-pressed="false"` anyway (C-4 mechanism). The tri-state the type advertises does not exist.

**Provenance.** `defineProps<{ active?: boolean }>()` (`:11-13`) → `{ type: Boolean, required: false }`
→ `runtime-core.cjs.js:5011-5013` coerces absent **and** explicitly-`undefined` bindings to `false`
(`isAbsent` is `!hasOwn(props,key)`; an explicit `:active="undefined"` sets the key, then
`resolvePropValue`'s `value === undefined` default path falls through to the same cast). Either way the
consumer cannot reach `undefined`.

**Falsifier.** `withDefaults(..., { active: undefined })` would restore the tri-state and kill this
claim; it is absent.

---

### C-9 · MINOR · The jsdoc asserts a glass-ui canon that the very same commit broke, over stale provenance

**Claim.** `CanvasOverlayButton.vue:5-7` — "surfaces the `active` flag as both `aria-pressed` and the
legacy `.is-active` class, **matching the glass-ui canon for toggle buttons**". Against glass-ui 4.0.0
as installed, `.is-active` is canon **only** for `.glass-btn` and the dock-control family (C-3 selector
list); for a `<Button variant="glass">` the canon is `aria-pressed` (the cva's own
`aria-pressed:bg-[color-mix(…)]` leg). The comment documents a *pre-migration* truth as a post-migration
canon, and it was written in the commit that made it false (`be24948`, per C-3's `git show`). The header
also cites `A.W3.b` — a tranche-A wave; the tree's authoring frontier is tranche N (`git log -1` →
`cd26c65 coordination(N inbox)`), and the file has been under a DELETE order since tranche M.

**Falsifier.** Any glass-ui 4.0 documentation or selector establishing `.is-active` as the Button-family
canon. `utilities/btn.css`, `glass/surfaces.css`, `glass/material.css` and the button cva were read; the
Button family's active hook is `aria-pressed`, present in **12 of the 13** cva variants — every one
except `link` (`default`, `solid`, `primary-audacious`, `gold-audacious`, `destructive`, `outline`,
`secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`). Claim stands.

---

### C-10 · INFO · The pin this wrapper provides is open-coded at the live sites it was written for

**Claim.** `grep -rn 'variant="glass"' web/src/` → **12** occurrences across 8 files, including
`FullscreenViewer.vue:110` — a `variant="glass" size="icon"` canvas-overlay close button, i.e. verbatim
the composition this wrapper encapsulates, hand-rolled. The wrapper's consumption value proposition is
being met by copy-paste while the wrapper sits unconsumed.

**Falsifier.** If the live sites diverged materially from `variant="glass" size="icon"` the wrapper
would be genuinely inapplicable. `FullscreenViewer.vue:110` matches on both knobs. INFO because it is
an observation about the tree, not a defect *in* this file — it is recorded because it is the strongest
argument that C-1's answer is DELETE-and-let-`Button`-be-the-surface, which is exactly the ruling
already on record at `docs/tranches/A/audit/W3-button-ledger.md:93` ("`<Button variant="glass" size="icon">`
**IS** the surface").

---

## §2 — SUPERLATIVES (4) — L-18 runs both ways

### S-1 · The import is the cleanest possible form of this dependency edge

`import { Button } from "@mkbabb/glass-ui/button";` (`:9`) is correct on **four** independent axes that
the surrounding tree gets wrong elsewhere:
1. **Bare specifier, no `dist/` alias** — contract-v2 §2.4 compliant; `web/vite.config.ts:25-33` documents
   that the `development` condition is STRUCK and `@mkbabb/*` `dist/`-path aliases are forbidden. The only
   alias in the config is `@ → ./src`.
2. **Resolvable at runtime** — `package.json` `exports["./button"] = { types: "./dist/button.d.ts", import: "./dist/button.js" }`; `dist/button.js` re-exports `Button`.
3. **Resolvable at type level under `moduleResolution: "bundler"`** (`tsconfig.json:5`) — and *doubly*
   so, since glass-ui also ships `typesVersions["*"].button = ["dist/button.d.ts"]` as a legacy fallback.
4. **Leaf subpath, not the barrel** — contrast `web/src/components/ui/CollapsibleSection.vue:2`, which
   imports from the root `"@mkbabb/glass-ui"` barrel. The leaf import keeps the module graph minimal and
   does not defeat the `vendor-ui` `manualChunks` split declared at `vite.config.ts:53-57`.
**Falsifier.** Absence of `./button` from the exports map (present), or a `dist/` path/alias/`development`
condition in the specifier (none). Nothing here to fix.

### S-2 · The `aria-pressed` leg is **live** — and this contradicts the hitherto corpus

`CanvasOverlayButton.vue:20` `:aria-pressed="active"` is not decoration: the glass cva variant carries
`aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]`, a Tailwind v4
`aria-pressed` variant compiling to `&[aria-pressed="true"]` on the utility's own class, and glass-ui's
`dist/styles/index.css:222` `@source "../*.js";` — documented at `:203-221` as the backstop that scans
`dist/*.js` for exactly these cva strings — guarantees the utility is generated in a consumer build that
imports `@mkbabb/glass-ui/styles` (`web/src/style.css:3` does).

**Explicit contradiction of the corpus.** `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:2919`
states "fourier's `is-active` is therefore a dead class: a toggled button looks identical to an idle
one", naming `CanvasOverlayButton.vue:7` among its instances, and `:2968` asserts
"`.dock-icon-button.is-active` has NO backing paint in glass-ui dock.css OR fourier's scoped CSS".
Against glass-ui **4.0.0 as installed**, both halves are wrong:
- For **this** component, the toggled state *does* paint — via `aria-pressed`, which no other Button
  toggle in the tree sets (`grep -rn 'aria-pressed' web/src/` → the only glass-**Button** toggles that
  set it are `BasisSelector.vue:144`, `GallerySearchBar.vue:70,120`, `GalleryCard.vue:140`,
  `GalleryCardModal.vue:114,163,173` — each with *hand-rolled local* `[aria-pressed="true"]` CSS at
  `BasisSelector.vue:269`, `GallerySearchBar.vue:218`, `GalleryCardModal.vue:241`; **only
  `CanvasOverlayButton` relies on the upstream cva paint**).
- For **DockIconButton**, `dock-controls/icon-button.css:109`
  `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])` and
  `dock-controls/touch-floor.css:64,82` and `glass/material.css:231` all paint it. The corpus finding was
  measured against glass-ui 3.x pre-bump and is **stale**; glass-ui 4.0 shipped the active register the
  finding asked for.
The residual defect is C-3 (the `.is-active` half), not the whole binding. **The dead component is
carrying the tree's only upstream-canonical toggle-paint idiom.**
**Falsifier.** If `aria-pressed:` were not a Tailwind built-in aria variant, or if the `@source` glob did
not reach `dist/button-BNDWhAZb.js` (it is `dist/styles/../*.js` = `dist/*.js`, non-recursive, and the
chunk is flat in `dist/`), the paint would not generate. Both were checked. *(The rendered pixel is
UNPROVEN-NEEDS-LIVE for SS-13; the generation chain is proved statically.)*

### S-3 · Zero colour duplication in a tree with a four-body colour-utility epidemic

The active tint rides glass-ui tokens end-to-end (`--surface-tint-*`, `--glass-bg-resting`,
`--glass-bg-floating`, `--foreground`) with **no** fourier-local colour code, no `lib/colors.ts` import,
and no value.js colour call. Contrast the live tree: `spectrumColor` exists in **four distinct bodies** —
`components/visualization/lib/canvas-drawing/transforms.ts:3`, `components/equation/FrequencyGraph.vue:42`,
`components/equation/lib/harmonics.ts:81`, `components/shared/CoefficientsSpectrum.vue:47` — and
`lib/colors.ts:22-30` hand-rolls a `cssVarToHex` resolver with a `"#888888"` fallback. This 25-line file
is one of the few visual components in `web/src/` that adds **zero** to that surface.
**Falsifier.** Any colour literal, `color-mix`, or `cssVar` call in the file. It has no `<style>` block
and no script beyond `defineProps`.

### S-4 · Structurally out of reach of the R6-8 hazard, and of the rAF epidemic

- **API seam.** The intake lane's `R6-8` (`audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142`,
  verdict TRUE, CARRY → F.W5) establishes that fourier's operation records embed derived client
  back-references (`operation:PATCH:/api/visualizations/{slug}` carrying
  `"clients": ["client:updateVisualization"]`), so a client-side edit mutates both leaves and defect
  attribution across the seam is impossible. **This component touches neither leaf** — zero API imports,
  zero store reads — so it is non-participating in the 45-operation surface by construction. For a
  presentational leaf that is the correct posture, and it is worth recording as the shape F.W5's
  contract repair should preserve: presentational components must stay outside the operation↔client join.
- **Animation seam.** The toggle transition is owned entirely by glass-ui CSS
  (`glass/surfaces.css:82-87`: `background`/`border-color`/`color` on `--ease-standard`, `scale` on
  `--spring-smooth`). No manual `requestAnimationFrame`, no keyframes.js `Animation` instance — contrast
  `A8-no-legacy-sweep.md:8`'s category (3), "manual rAF loops duplicating keyframes.js", and the
  `animation.ts` ping-pong loop it names as chronic.
**Falsifier.** Any `fetch`/`api`/store import, or any `rAF`/`setInterval`/keyframes import in the file.
The file's entire import list is one line (`:9`).

---

## §3 — Verdict

**DEFECTIVE, and the defect that dominates is structural rather than textual.** Line for line this is one
of the better-behaved consumers in the fourier tree: the import is contract-v2-perfect (S-1), it is the
tree's only user of glass-ui 4.0's upstream toggle-paint canon (S-2), and it adds nothing to fourier's
duplicated-colour or manual-rAF surfaces (S-3, S-4). But it is consumed by nothing and cannot be
(C-1, BLOCKER), its sole dependency edge sits in a peer-invalid install (C-2, BLOCKER, inherited), and
of the four contract knobs a wrapper of this kind exists to pin it pins two cosmetic ones and misses
three correctness ones — a dead class (C-3), an unconditional and frequently-wrong ARIA role state
(C-4), no accessible name (C-5), and no `type="button"` (C-6).

**`F8-REACH-02` disposition recommended: `DELETE`** — with one carry, so the deletion is not a net loss:
**S-2's `aria-pressed` idiom must be lifted to the live sites before or with the delete.**
`FullscreenViewer.vue:110` and the six `DockIconButton :class="{'is-active': …}"` sites
(`CanvasControlsDock.vue:54,59,71,77,87`, `EditorControlsDock.vue:143,148`) should carry
`:aria-pressed`, which glass-ui 4.0 now paints natively for both families. Deleting the file without
that lift discards the only place in the tree where the correct 4.0 idiom is written down.

**Counts** — defects **10** (BLOCKER 2 · MAJOR 3 · MINOR 4 · INFO 1) · superlatives **4** ·
corpus contradictions **2** (raw-findings.json:2919 and :2968, both stale against glass-ui 4.0.0) ·
corpus confirmations **3** (A8-14/CHR-26/A8-21 dead-component → C-1; partial-prior-run.json:155 count (1)
peer breach → C-2; `F8-REACH-02` hash + byte identity → C-1).
