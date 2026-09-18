claude-opus-5[1m]

# CHALLENGE — `GalleryCard.vue` · axis L (LIBRARY)

**Target** `fourier-analysis/web/src/components/visualization/gallery/GalleryCard.vue` (309 lines —
matches lane-frontend.md:103 exactly; no drift).
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every row below carries
severity · file:line provenance · its own falsifier. Superlatives carry the same burden (L-18 runs
both ways).
**Method** static + source-derived only. No browser. Read whole: the SFC and **every** module it
imports (`vue`, `@mkbabb/glass-ui/button`, `/badge`, root barrel `Checkbox`, `@/lib/types`,
`@/lib/api`, `../lib/basis-display`, `@/lib/colors`, `@/components/ui/PathPreview.vue`,
`lucide-vue-next`), plus all three consumers, the reka/glass-ui dist implementations of the nested
controls, the glass-ui token/utility CSS actually installed, the Vue runtime key-modifier table, the
backend models + the gallery list route, and the e2e surface. Livable-only claims are marked
**UNPROVEN-NEEDS-LIVE (SS-13)**.

**Verdict** `2 BLOCKER · 4 MAJOR · 7 MINOR = 13 defects`, plus 2 INFO rows (not counted as defects:
one *corrects* a corpus reading, one is a derivation-model note) and **5 superlatives**. The
component is well-built in its statics and broken in its dynamics: its motion contract does not
execute at all, and its keyboard contract inverts every nested control.

**Counting convention** `defects = 13` = the severity-bearing rows B-1..B-2, M-1..M-4, D-1..D-7.
`blockers = 2`. `superlatives = 5`. INFO rows I-1/I-2 are excluded from `defects` by construction.

---

## BLOCKERS

### B-1 · BLOCKER · `--ease-apple-spring` is defined nowhere in the installed cascade — the card's entire motion contract is dead CSS

**Claim.** `GalleryCard.vue:195-198` and `:295` both reference `var(--ease-apple-spring)`. That
custom property is **not defined by any stylesheet in the install**. An unresolvable `var()` makes
the declaration *invalid at computed-value time*; for a shorthand the whole declaration becomes
`unset`. Therefore:

- `:195-198` — the ONE `transition` shorthand carries all three animated properties
  (`transform 0.25s var(--ease-apple-spring), box-shadow 0.2s var(--ease-standard), border-color
  0.2s var(--ease-standard)`). The unresolvable var in the *first* component kills the **entire
  declaration**, so the hover lift (`:209-213`), the press squish (`:215-217`), the tier glow and the
  `[data-selected]` ring all snap with **no transition at all**.
- `:295` — `animation: like-bounce 0.3s var(--ease-apple-spring)` is likewise invalid ⇒ the like
  bounce **never runs**. Collaterally, `@keyframes like-bounce` (`:298-302`) is unreachable dead
  code and the `prefers-reduced-motion` override (`:304-307`) that disables it is vacuous — the card
  is counted among the census's "18 reduced-motion references" [CENSUS §3a, FE §8] for a rule that
  can never fire.

**Provenance of the absence** (exhaustive sweep, all negative):

| where | result |
| --- | --- |
| `grep -rn -- "--ease-apple-spring *:" web/src/` | 0 hits (only *usages*, never a definition) |
| `grep -rl -- "--ease-apple-spring" node_modules --include="*.css"` | 0 hits |
| `grep -rln -- "ease-apple-spring" node_modules/@mkbabb/` | **exactly one file** — `@mkbabb/glass-ui/README.md:211` |

`README.md:211` is a token-table row: `| Easing | \`--spring-{smooth,snappy,bouncy,gentle}\`,
\`--ease-standard\`, \`--ease-apple-spring\` etc. |`. What glass-ui **4.0.0 actually ships** is
`--ease-apple` (`dist/styles/tokens/scheme-motion.css:224`) and `--ease-spring`
(`scheme-motion.css:225`, `= var(--spring-snappy)`), plus `--ease-spring-{smooth,snappy,bouncy,
gentle}` (`dist/styles/theme/bridges.css:320-323`). The name `--ease-apple-spring` is a **producer
documentation fiction** — and the fourier `A.W3.d` wave migrated onto it in four files on the
strength of that doc. The card's own comments (`:194`, `:293-294`) cite `A.W3.d` and call it "the
closest canonical overshoot", so the intent is explicit and the failure is silent.

**Blast radius** (same class, outside this component's cure): `VisualizationView.vue:426`,
`GallerySearchBar.vue:188-189`, `AppHeader.vue:280`. Four files, one non-existent token — this is a
**supply-chain finding**, not local sloppiness, and it belongs in the standing glass-BH relay
alongside the `--viz-amber` WCAG carry [CENSUS §3a, FE §3/§8].

**Contrast that proves the sweep is sound.** Every *other* token the file uses resolves:
`--shadow-cartoon` / `--shadow-cartoon-hover` (`glass-ui/dist/styles/tokens/dark-arm.css:157-158`,
`theme/bridges.css:287`), `--ease-standard` (`scheme-motion.css:216`), `--ring`, `--tier-featured` /
`--tier-saved` (`tokens/color-radius.css:270-271`, `dark-arm.css:141-142`), `--like`
(`color-radius.css:272`), `--muted`, `--foreground`. One token in ~120 lines of CSS is broken, and
it is the one the producer's README invented.

**Falsifier.** Define `--ease-apple-spring` anywhere in the cascade — or find it in ANY shipped
stylesheet, JS-injected style, or `@property` registration — and this row dies whole. The sweep
above covers the entire `node_modules` CSS surface, the entire `@mkbabb/*` package tree (all file
types, which is how the README hit surfaced), and all of `web/src` (`style.css` is the *only* CSS
file in the app: `find src -name "*.css"` → 1). **Cure:** `--ease-spring` (the shipped snappy
spring) or `--ease-apple`, and add a fallback — `var(--ease-apple-spring, var(--ease-spring))` —
so the next producer rename degrades instead of detonating.

**UNPROVEN-NEEDS-LIVE (SS-13):** the rendered confirmation is one expression —
`getComputedStyle($0).transitionProperty` on a `.gallery-card` (expect `all`/empty, not
`transform, box-shadow, border-color`).

---

### B-2 · BLOCKER · the root's keydown handlers hijack every nested control: like / select / feature / save / delete are all keyboard-dead, and each attempt opens the card instead

**Claim.** `GalleryCard.vue:78-79`

```
@keydown.enter.prevent="emit('click')"
@keydown.space.prevent="emit('click')"
```

sit on the `role="button"` root (`:70-80`) with **no `.self` modifier and no
`event.target === event.currentTarget` guard**. Keydown bubbles from whatever is focused, so these
handlers fire for keystrokes aimed at the five nested widgets, and `.prevent` cancels the keydown —
which is precisely the event whose *default action* activates a native button.

**The nested widgets rely on exactly that default action:**

- glass-ui `Button` renders a native `<button>` (`@mkbabb/glass-ui/dist/button-BNDWhAZb.js:22`,
  `as: { default: "button" }`) and installs **no** keydown handler and **no** `stopPropagation`
  (grep over the chunk → 0 hits). Used at `:135-145` (like), `:157-165` / `:166-174` / `:175-183`
  (feature / save / delete).
- `Checkbox` forwards to reka `CheckboxRoot`, which renders `role="checkbox"` on a `<button>` and
  installs a **single** keydown handler:
  `onKeydown: withKeys(withModifiers(() => {}, ["prevent"]), ["enter"])`
  (`reka-ui/dist/Checkbox/CheckboxRoot.js:122`) — an Enter no-op (per ARIA, Enter must not toggle a
  checkbox) with **no** `stopPropagation`. Space toggling is the native `<button>` default →
  `onClick: handleClick` (`:123`). Used at `:90-95`.
- Vue's `.space` modifier does resolve: `keyNames = { … space: " " … }`
  (`@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1860-1868`), so both handlers really fire on a
  Space keypress.

**Net behaviour.** Focus the like button, press Space (or Enter) → keydown dispatches to the button,
bubbles to the card root, the root calls `preventDefault()` → the button's activation behaviour is
canceled → **`emit('like')` never fires** → and the root emits `click` → the card opens the modal.
Identical for the admin checkbox and the three admin overlay buttons. In admin mode a keyboard user
**cannot** feature, save, delete, multi-select or like anything; every attempt navigates instead.

**Both branches are defects (the claim survives either way).** Even under an engine that dispatched
the activation click regardless of the ancestor's `preventDefault`, the card would still `emit('click')`
during the same gesture — the user gets *like AND open*, *delete AND open*. There is no branch in
which `:78-79` is correct as written.

**The click path was guarded; the keydown path was not.** Three deliberate seals exist —
`@click.stop` on the checkbox chrome (`:88`), on the like button (`:141`), and on the admin overlay
(`:156`). Vue's `.stop` binds to *that listener's event type only*; nothing in the subtree stops
keydown. So the author demonstrably understood the hazard on the pointer path and the accessibility
lift missed it on the key path. The header comment (`:65-69`) records that lift: "Was a bare
`<div @click>` (per A3 #4 finding — unreachable by keyboard…). Lifted to the canonical ARIA
button-on-non-button pattern." **The cure for A3 #4 introduced this regression.**

**Root cause is the DOM shape.** `role="button"` + `tabindex="0"` on a *container* that holds five
focusable widgets is non-conforming ARIA (`button` takes presentational children; nested widgets are
not exposed). That shape is what makes an ancestor keydown handler able to swallow descendant
activation at all. (Full a11y treatment belongs to the D/A11y challenge; it is named here only as
the mechanism.)

**Nothing guards it.** `e2e/gallery.spec.ts` has 6 tests
(`gallery page renders…`, `switching to drafts tab…`, `search bar filter drawer toggles`,
`login form…`, `visualizer surfaces its overlay control dock`, `no console errors…`) and **zero**
occurrences of `keyboard`, `press`, `Enter`, `Space`, `gallery-card`, `like` or `tier` — the card's
entire interaction surface is untested. Consistent with CENSUS §3a: "**vitest ABSENT** — the only
frontend gates are `vue-tsc` + 29 Playwright tests on a single chromium project [FE §0, §9]."

**Falsifier.** Add `.self` to both handlers (or a `target === currentTarget` guard) and the row dies.
Alternatively, produce a `stopPropagation` on any nested control — none exists in glass-ui `Button`,
in reka `CheckboxRoot`, or in this SFC. **UNPROVEN-NEEDS-LIVE (SS-13):** one Playwright keyboard
walk (`Tab` to the like button, `Space`, assert `/like` request fired and no navigation) converts
this to measured.

---

## MAJOR

### M-1 · MAJOR · `basisDisplay` snapshots the *reactive* `VIZ_COLORS` at module-eval, so every pill colour — and every canvas curve/label colour — is frozen at the hard-coded fallback and never tracks the theme

**Claim.** `basis-display.ts:3-7` builds a plain object literal:

```
export const basisDisplay: Record<string, {icon; label; color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

Those three property reads execute **once, at module evaluation**, outside any reactive effect, and
copy out primitive strings. `VIZ_COLORS` is `reactive({ fourier: "#bf4040", chebyshev: "#3d72b8",
legendre: "#9545b8", … })` (`lib/colors.ts:77-87`) whose values are *fallback literals*;
`resolveVizColors()` (`colors.ts:90-96`) overwrites them from the live `--viz-*` CSS vars and is
invoked at `App.vue:11` on mount and at `App.vue:13` from a `MutationObserver` on every theme
toggle. It writes **only** to `VIZ_COLORS.*` (`colors.ts:91-95`) — never to `basisDisplay`.

Because module eval necessarily precedes `onMounted`, the snapshot is **always** the literal
fallback — the table never even sees the *first* resolution, let alone the theme toggle.

**GalleryCard consumes exactly that frozen field:** `:40` `const cfg = basisDisplay[key]` → `:48`
`{ icon, label, color: cfg.color }` → `:121` `:style="{ '--pill-c': b.color }"` → `.basis-tint`
(`:270-274`) tints border, text and a 12 % plate from it. `isLiked`/`basisLabels` are computeds, but
a computed cannot track a value that was never read reactively.

**Measured divergence** (glass-ui tokens converted from OKLab statically; no browser):

| basis | frozen literal | shipped light `--viz-*` | shipped dark `--viz-*` |
| --- | --- | --- | --- |
| fourier | `#bf4040` | `oklch(0.579 0.201 30.4)` ≈ **`#d73523`** | `oklch(0.693 0.151 28.1)` ≈ **`#eb7366`** |
| chebyshev | `#3d72b8` | `oklch(0.484 0.163 265.5)` ≈ **`#3156b9`** | `oklch(0.718 0.107 268.4)` ≈ **`#88a1e7`** |
| legendre | `#9545b8` | `oklch(0.532 0.180 317.5)` ≈ **`#9541af`** | `oklch(0.739 0.134 318.1)` ≈ **`#ce8ee1`** |

(tokens: `glass-ui/dist/styles/tokens/color-radius.css:263-265` light arm,
`tokens/dark-arm.css:113-115` dark arm, `tokens/light-dark.css` for the `light-dark()` form.) The
dark-mode gap is the damaging one — the pill keeps a light-mode-weight red/blue/purple on a dark
card, i.e. the divergence is largest exactly where contrast is tightest.

**This reaches the viz render path** (CENSUS §3a, FE §6: "Canvas2D throughout, **WebGL/WebGPU
ABSENT**; three independent canvases … + 12 SVG surfaces"; SOFT-shadow row: "`BasisCanvas` +
`canvas-drawing/` (1 311 LOC Canvas2D)"). The *same frozen field* is the stroke and fill source for
the live instrument:

- `BasisCanvas.vue:257` — `ctx.strokeStyle = isHovered ? VIZ_COLORS.golden : cfg.color;`
- `canvas-drawing/labels.ts:39` — `ctx.fillStyle = isHovered ? VIZ_COLORS.golden : cfg.color;`

Both lines mix a **live** reactive read (`VIZ_COLORS.golden`) with a **frozen** snapshot
(`cfg.color`) inside one draw call. So the gallery pill and the canvas curve agree with each other
and disagree with the theme — a single fix at `basis-display.ts` repairs the card and the canvas
together, which is why this is filed as MAJOR rather than cosmetic.

**The tree already documents the correct idiom two directories away.**
`equation/composables/useCoeffHover.ts:60-65`:

> "KaTeX cannot resolve CSS vars; read the resolved `--viz-amber` hex via `VIZ_COLORS` **at render
> time** (the runtime token-shadow pattern documented at `lib/colors.ts:11`). The `STATIC.golden`
> constant is the canonical fallback used when `resolveVizColors` has not yet run (mounted before
> paint)."

`basisDisplay` is on the wrong side of that documented line. And CENSUS §3a records that fourier
deliberately *darkens* `--viz-amber` for WCAG [FE §3/§8] — proof the CSS-var values are intentionally
**not** the JS statics.

**Falsifier.** Make `color` a getter/computed (`get color() { return VIZ_COLORS.fourier }`), or have
`resolveVizColors()` also write the table, and the row dies. As of this read `resolveVizColors`
touches `VIZ_COLORS` only (`colors.ts:91-95`), and `basisDisplay` has no accessor. Second falsifier:
show that the `--viz-*` CSS vars equal the literals — the table above refutes it in both arms.

---

### M-2 · MAJOR · the whole `likedHashes` Set is passed to every card, so one like re-renders the entire unbounded grid — while the sibling `selected` flag is passed correctly two lines away

**Claim.** `GalleryCard.vue:22` takes `likedHashes?: Set<string>` and `:34` derives
`props.likedHashes?.has(props.entry.slug) ?? false`. The owner replaces the Set **by identity** on
every like: `GalleryView.vue:45` `const likedHashes = ref(new Set<string>())`, `:127-129`

```
const s = new Set(likedHashes.value);
result.liked ? s.add(hash) : s.delete(hash);
likedHashes.value = s;
```

Every mounted card therefore sees a changed prop (`hasPropsChanged` compares references), so one
like → parent re-render → **N child patches**, each re-running the template including `timeAgo`
(`:110`). `N` is unbounded: `GalleryInfiniteGrid.vue` accumulates through `InfiniteScroll` and
prints its own running total at `:27` (`{{ entries.length }} loaded`).

**The correct idiom is already in the same element.** `GalleryInfiniteGrid.vue`:

- `:35` `:liked-hashes="likedHashes"` ← the whole collection (wrong)
- `:36` `:selected="selectedHashes?.has(entry.slug) ?? false"` ← the derived scalar (right)

Same parent, same loop, adjacent lines, opposite contracts. The card's prop surface is what permits
the wrong one: it should take `liked?: boolean`, not the membership structure. (`selected` is also
correctly *not* re-created wholesale — `GalleryView.vue:155-158` clones the Set, but the card only
ever receives a boolean, so the churn is contained.)

**Second-order.** This defect *masks* D-2: the constant re-render churn is the only reason a stale
`timeAgo` ever refreshes. Fixing M-2 makes D-2 user-visible — the two must be cured together.

**Falsifier.** Change the prop to a boolean and the amplification disappears; or demonstrate Vue
skipping the child update on a new `Set` reference (it cannot — reference inequality forces it).
Note the cheapness of an individual patch does not save the row: the cost is O(N) per like with N
unbounded by design, on the gallery's hottest interaction.

---

### M-3 · MAJOR · `tabindex="0"` is hardcoded with no opt-out, and the aria-hidden marquee duplicate re-renders the card with it

**Claim.** `GalleryCard.vue:72-73` fixes `role="button"` + `tabindex="0"` unconditionally — the
component exposes no `focusable` / `inert` / `tabindex` prop (`defineProps` at `:19-24` = `entry`,
`adminMode`, `likedHashes`, `selected`).

`GalleryMarquee.vue` renders each track **twice** for the seamless loop: the real pass at `:35-49`
and a `aria-hidden="true"` duplicate at `:51-66`, each hosting a full `<GalleryCard>` (`:40`, `:57`)
with no attempt to neutralise it. Result: focusable, activatable content inside `aria-hidden`
(axe `aria-hidden-focus`; WCAG 4.1.2), and a duplicated tab-stop run equal to the track length —
one per entry, every entry, on the marquee surface.

Attribution is honest: the consumer wrote the loop, but the card's contract gives it nothing to
write. The only escape today is a fallthrough `:tabindex="-1" inert` on the callsite (single-root
component, so fallthrough attrs merge and the parent's value wins) — undocumented, and used nowhere.

`@axe-core/playwright` is installed (`web/package.json` devDependencies) — this is precisely the
class it flags. **UNPROVEN-NEEDS-LIVE (SS-13):** whether any current spec renders the marquee (it
needs `entries.length >= 4`, `GalleryMarquee.vue:27`) and therefore whether the violation is live
today or latent-on-data.

**Falsifier.** Give the card an explicit `focusable`/`inert` prop and set it at the dup callsite —
or show that the duplicate track never mounts. `GalleryMarquee.vue:19-23` builds `tracks` from
`props.entries` unconditionally, and `:27` gates the whole component at `entries.length >= 4`, so
any gallery with 4+ public entries mounts it.

---

### M-4 · MAJOR · `basisLabels` and `timeAgo` are copy-pasted verbatim into the sibling modal; `timeAgo` exists 5× in one directory in 3 divergent variants; the basis fold exists 5×

**Claim — verbatim duplication.**
`GalleryCard.vue:36-51` (`basisLabels`) is **byte-identical** to `GalleryCardModal.vue:41-56`.
`GalleryCard.vue:53-61` (`timeAgo`) is byte-identical to `GalleryCardModal.vue:58-66` and to
`GalleryDraftsSection.vue:28-36`. ~26 lines cloned between two files in the same folder.

**Claim — the clones have already drifted.** Five definitions of one name, three semantics:

| site | shape |
| --- | --- |
| `GalleryCard.vue:53` · `GalleryCardModal.vue:58` · `GalleryDraftsSection.vue:28` | `(iso: string)`, has the `m < 1 → "just now"` branch |
| `AdminUserList.vue:223` | `(iso: string)`, **no** `"just now"` branch → renders `"0m ago"` |
| `AdminFlaggedPanel.vue:137` | `(iso: string \| null)`, null-guard → `""` |

Same name, three contracts, one directory. That is drift, not intent — if divergence were intended
the functions would be named for their differences.

**Claim — the basis fold is re-implemented 5×.** `b.startsWith("fourier") ? "fourier" : b` at
`GalleryCard.vue:39`, `GalleryCardModal.vue:44`, `GalleryDraftsSection.vue:43`,
`BasisCanvas.vue:250`, `canvas-drawing/labels.ts:29`; and the mode-label ternary
(`fourier-epicycles → "Epicycles"`, `fourier-series → "Series"`) at `GalleryCard.vue:43-47`,
`GalleryCardModal.vue:48-52`, `canvas-drawing/labels.ts:32-34`, `BasisSelector.vue:48`.

**Colocation defect.** `components/visualization/lib/basis-display.ts` already owns display identity
(icon / label / colour) but exports **only the table** — no `resolveBasisDisplay(basisKey)`. The
module that owns the display contract does not own the display *mapping*, so five call sites
re-derive it, two of them on the canvas render path. (`src/lib/bases.ts` is evaluation-only —
`evaluateBasis`, `fourierPositionsAt` — so it is not the home; `basis-display.ts` is.)

**Cost, already paid.** The copy-paste propagated a bug verbatim: D-1's non-undefined-safe tier
predicate exists identically at `GalleryCard.vue:149` and `GalleryCardModal.vue:85`.

**Falsifier.** One exported `resolveBasisDisplay()` in `basis-display.ts` plus one `timeAgo` in
`src/lib/` collapses all five sites with no behaviour change (modulo choosing which of the three
`timeAgo` semantics is canonical — which is itself the finding). If any clone were load-bearingly
different, the diff above would show it; only `AdminUserList` and `AdminFlaggedPanel` differ, and
both differences are accidents (a missing branch, a missing null-guard), not designs.

---

## MINOR

### D-1 · MINOR · `entry.tier !== 'normal'` is not undefined-safe — every uncurated card renders a phantom empty 1.5 rem tier slot

`GalleryCard.vue:149` `v-if="entry.tier !== 'normal'"` over `tier?: GalleryTier`
(`lib/types.ts:232`). When `tier` is `undefined` the predicate is **true**, the
`w-6 h-6 rounded-full` div renders, and neither icon branch matches (`:150` needs `'featured'`,
`:151` needs `'saved'`) — an empty 24 px box in every footer, plus `:data-tier` resolving to nothing.

**The backend never defaults it.** `tier` is written **only** by admin moderation:
`api/routers/admin.py:183` (`$set` from `SetTierRequest`), `:432` / `:438` (the featured toggle).
`api/models/visualization.py` contains **no `tier` field at all**, and the public list route returns
raw Mongo documents with no response model and no defaults —
`api/routers/gallery.py:32-34` (`_public_doc` = a key filter dropping `_id`/`liked_ips`), `:57`
(`find(query, {"liked_ips": 0})`), `:72-77` (`json.dumps` of those dicts). The insert sites
(`api/routers/visualizations.py:219`, `:587`) set no tier. So for every visualization no admin has
ever curated — the dominant population — the key is **absent from the JSON**.

Copied verbatim into `GalleryCardModal.vue:85` (which additionally interpolates `{{ entry.tier }}`
at `:91`, rendering an empty pill).

**Falsifier.** Show a create/backfill path writing `tier: "normal"` (none found across
`grep -rn tier api/` — the only writers are the three admin `$set`s), or change the predicate to
`entry.tier === 'featured' || entry.tier === 'saved'` and the phantom disappears.

### D-2 · MINOR · `timeAgo` is a plain template call — never reactive, never ticks

`GalleryCard.vue:53-61` is invoked at `:110` as a render-time function with no clock dependency
(no `useNow`, no interval, no `Date.now()` ref). A card rendered at *t₀* keeps saying "just now"
indefinitely; its label only advances when something *else* re-renders the component. Today that
"something else" is M-2's whole-grid churn — the two defects prop each other up.
**Falsifier.** A shared reactive clock (or `@vueuse/core`'s `useNow`, already a dependency) makes it
correct; leaving M-2 fixed and D-2 unfixed makes the staleness user-visible, which is the proof.

### D-3 · MINOR · two dead imports — one drags a whole otherwise-unreferenced component into the module graph

`GalleryCard.vue:9` imports `VIZ_COLORS` — referenced **nowhere** in the script or template (the
colour arrives indirectly through `basisDisplay`). `GalleryCard.vue:10` imports `PathPreview` —
referenced nowhere, and `grep -rn "PathPreview" web/src/` returns **exactly one hit: this line**, so
`web/src/components/ui/PathPreview.vue` (69 lines, SVG path renderer with its own scoped `<style>`
at `:64-69`) is dead-by-transitivity.

**Proven, not assumed:** compiling the SFC with the installed `@vue/compiler-sfc`
(`compileScript(descriptor).content`) shows the compiler **retains both import statements** — Vue
does not strip them. The scoped-style side effect means the module stays in the graph.

**Falsifier.** Delete both lines; `vue-tsc -b` stays green and no behaviour changes. Whether the
emitted production bundle also carries `PathPreview`'s CSS is **UNPROVEN-NEEDS-LIVE (SS-13)** — Vite
marks CSS modules `no-treeshake`, which predicts yes, but the repo is read-only here and no build
was run.

### D-4 · MINOR · dead `:data-tier` binding on the inner badge

`GalleryCard.vue:149` binds `:data-tier="entry.tier"` on the inner div. The only `[data-tier]`
selectors in scope are `.gallery-card[data-tier="featured"]` (`:228`) and `…["saved"]` (`:233`),
which match the **root** — already bound at `:75`. Global CSS contributes nothing:
`src/style.css` holds exactly one `.gallery-card` rule, `:focus-visible` (`style.css:136-143`).
**Falsifier.** Produce any selector that matches the inner element's attribute.

### D-5 · MINOR · `:key="b.label"` is not guaranteed unique — the backend neither dedupes nor constrains `active_bases`

`GalleryCard.vue:117` keys the pill loop on the *display label*. `:39-47` folds **every** string
starting with `fourier` to the `fourier` table entry, and labels it `"Fourier"` unless it is exactly
`fourier-epicycles` / `fourier-series`. So `["fourier", "fourier-x"]` → two pills keyed `"Fourier"`,
as does a literal duplicate. Backend guarantees: `active_bases: list[str]` with
`Field(min_length=1, max_length=16)` and **no** enum, no uniqueness, no validator
(`api/models/visualization.py:186`, `:280`; `grep -n "validator" models/visualization.py` → 0).
Duplicate v-for keys ⇒ dev warning + patch mis-association on update.
**Falsifier.** Key on the raw `b` (`:key="b"` after carrying it through), or prove a writer that
dedupes/validates.

### D-6 · MINOR · types laundered — index signature + `as` cast instead of narrowing

`basis-display.ts:3` types the table as `Record<string, {icon; label; color}>`, so any string key
type-checks. `tsconfig.json:8` sets `strict: true` but **not** `noUncheckedIndexedAccess`, so
`basisDisplay[key]` (`GalleryCard.vue:40`) is typed as always-present and the `if (!cfg) return null`
guard (`:41`) is invisible to the checker — it is correct at runtime and dead to the type system.
Then `.filter(Boolean) as { icon: string; label: string; color: string }[]` (`:50`) removes the
`null`s **by assertion**, because `Boolean` does not narrow. Same shape in the dead import's own
code (`PathPreview.vue:39`, unchecked `pathY[i]`).
**Falsifier.** `noUncheckedIndexedAccess: true` (or a keyed union + `.flatMap(cfg => cfg ? [x] : [])`)
makes the guard load-bearing and the cast unnecessary — and would have caught D-1's optional `tier`
class of bug elsewhere.

### D-7 · MINOR · no error posture on the thumbnail; `alt` is a slug; the entity's `title` is used nowhere

`GalleryCard.vue:99-104` renders `:src="thumbnailUrl(entry.image_slug)"` — a pure string builder with
no existence guarantee (`lib/api.ts:292-294`, `${BASE}/api/images/${imageSlug}/thumbnail`). A deleted
or failed image asset yields a broken-image glyph inside the 4:3 frame; there is no `@error`
fallback and no `decoding="async"`. `:alt="entry.image_slug"` publishes an opaque asset FK as the
accessible name, and `:aria-label="\`Open ${entry.image_slug}\`"` (`:74`) does the same for the card
— while `title?: string | null` exists on the entity (`lib/types.ts:226`) and is read by neither.
**Falsifier.** An `@error` handler (or a server placeholder) plus `entry.title ?? entry.image_slug`
in both label sites.

---

## INFO (not counted as defects)

### I-1 · INFO · the root-barrel `Checkbox` import is **not** a consumer defect — corpus reading corrected

`lane-frontend.md:340` inventories `GalleryCard.vue:5  import { Checkbox } from "@mkbabb/glass-ui"`
directly beneath 21 clean subpath imports, in a section whose thesis is "deepest, cleanest consumer
in the constellation — 95 named-import statements / 21 subpaths / 49 symbols" [CENSUS §3a, FE §3].
Read alone, that row invites a "granularity defect" verdict. **The tree refutes it:** glass-ui 4.0.0's
`exports` map enumerates 79 subpaths (`./button`, `./badge`, `./dialog`, `./select`, `./switch`,
`./number-field`, … ) and contains **no `./checkbox`**. The root barrel is the *only* resolvable
specifier for this symbol. Mitigations are already in place upstream: `sideEffects: ["*.css"]` and a
pure re-export ESM barrel (`dist/glass-ui.js`, 33 KB) that Rollup can shake.

**Reclassification:** an upstream export-map gap → glass-BH inbox relay (standing formation law),
not a fourier cure. Identical at `AdminUserList.vue:4` and (for `useClipboard`) `UserSlugBar.vue:5`,
`useMorphConfig.ts:9`, `router/index.ts:2`.
**Falsifier.** Find `./checkbox` in any glass-ui version fourier can install — then it becomes a
one-line consumer fix and this row converts to a MINOR.

### I-2 · INFO · R5-7 (native-template-loop invisibility) does **not** bite inside this component — it bites at its consumer boundary

The intake row R5-7 (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT, carried to F.W4) states the class:
*"template-loop evidence keyed to component callsites is blind to native HTML element loops"* —
demonstrated by `instance.loop.paper-sidebar` = `[]` and cured by R6's `NATIVE_TEMPLATE_LOOP` family
(`lane-fourier-r3-r6.md:139`, three rows at `PaperSidebar.vue:65/87/105`).

**Inside GalleryCard the class is inapplicable, and I say so rather than manufacture a hit:** the
file's only loop is `<Badge v-for="b in basisLabels">` (`:115-117`) — a *component* callsite, exactly
the shape a callsite-keyed deriver registers (cf. the populated sibling leaf
`instance.loop.presets`, keyed `callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:…`).

**One level up it bites hard.** GalleryCard has **four** registered component callsites —
`GalleryInfiniteGrid.vue:30`, `GalleryFeaturedCarousel.vue:32`, `GalleryMarquee.vue:40`,
`GalleryMarquee.vue:57` — but the per-entry fan-out lives in **native `<div v-for>` wrappers** that
register nowhere: `GalleryMarquee.vue:35-39` and `:51-56`, `GalleryFeaturedCarousel.vue:27-31`. A
callsite-keyed instance denominator therefore cannot see (a) that marquee callsites 3 and 4 render
the **same** `track` array twice, nor (b) that the second run is `aria-hidden`. Consequences for any
per-card derivation: live DOM instances undercounted by exactly the duplicate track length, and
M-3's duplicated tab stops attributed to zero.

**Directly actionable for F.W4**, per the intake's carry ("F.W4's per-component D/L/C audit must
count native element loops or it will inherit exactly this blind spot", `lane-fourier-r3-r6.md:125`;
census row `F.W4 | … R5-7 (count native element loops or inherit the blind spot)`,
`CENSUS-2026-08-03.md:362`).
**Falsifier.** Run the R6 `NATIVE_TEMPLATE_LOOP` family over `web/src/components/visualization/gallery/`
and confirm the two marquee wrappers and the carousel wrapper appear as rows; if they already do,
this note is discharged.

---

## SUPERLATIVES (L-18 both ways — each with its own falsifier)

### S-1 · zero teardown surface, provably

The entire `<script setup>` is 2 computeds and 1 pure function (`:34`, `:36-51`, `:53-61`). There is
**no** `onMounted`/`onUnmounted`/`onBeforeUnmount`, no `watch`/`watchEffect`, no `setInterval`/
`setTimeout`, no `requestAnimationFrame`, no `addEventListener`, no `IntersectionObserver`/
`ResizeObserver`, no store subscription. Nothing can leak; the component is safely mountable in an
unbounded `v-for` and survives the marquee's 2× duplication at no cost beyond render. This matters
against the census's standing hygiene gap — "the two rAF clocks themselves are **ungated** under
`prefers-reduced-motion: reduce`" [CENSUS §3a, FE §8] — the gallery leaf contributes nothing to it.
**Falsifier.** Any subscription, timer or listener in the file. There is none.

### S-2 · the `content-visibility` adoption is correct *including the documented trap*

`:71` applies glass-ui's `.deferred-section`
(`dist/styles/utilities/base.css:477-479`: `content-visibility: auto; contain-intrinsic-size: auto
var(--deferred-section-size, 30rem)`), and `:206` supplies `--deferred-section-size: 17rem` on the
same element — a working custom-property handshake (the var name matches the producer's exactly),
with the estimate *derived in the comment* (`:199-205`: 4:3 thumbnail ≈ 11 rem at a ~15 rem cell +
meta footer). Critically it inherits the producer's `contain-intrinsic-size: **auto** <estimate>`
form, which base.css's own comment (`:465-470`) identifies as the safe branch: "plain `<estimate>`
freezes the section + thrashes the scrollbar — **the trap this closes**." The comment also states
the graceful floor (`inv-29`) and defers the measurement to W6 instead of asserting a win.
**Falsifier.** A hardcoded `contain-intrinsic-size`, a mis-named var, or a missing floor — none
present.

### S-3 · no CLS surface on the lazy image

`:98` reserves the box with `aspect-[4/3]` before load; `:102` `w-full h-full object-cover` fills it.
So `loading="lazy"` (`:103`) costs **zero** layout shift without explicit `width`/`height`, and the
`.deferred-section` intrinsic size stays honest.
**Falsifier.** Remove the aspect-ratio frame and the lazy image becomes a CLS generator; it is there.

### S-4 · token discipline — zero literal colours in ~120 lines of CSS

Every value in the `<style scoped>` block resolves to an upstream token:
`--shadow-cartoon` / `--shadow-cartoon-hover` (`glass-ui/dist/styles/tokens/dark-arm.css:157-158`,
`theme/bridges.css:287`), `--ring`, `--foreground`, `--muted`, `--tier-featured` / `--tier-saved`
(`tokens/color-radius.css:270-271`, `dark-arm.css:141-142`, `tokens/light-dark.css:156-157`),
`--like` (`color-radius.css:272`), plus the Tailwind v4 utility bridges `text-tier-featured` /
`text-tier-saved` / `text-delete`, which **do** generate because `theme/bridges.css:12` opens an
`@theme inline` block declaring `--color-tier-featured` / `--color-tier-saved` / `--color-delete`
(`:198-204`). Light/dark arms come free. Exactly **one** token in the file fails to resolve, and it
is the *producer's README* that invented it (B-1) — which is what makes B-1 a supply-chain finding
rather than carelessness.
**Falsifier.** Any hex/rgb literal in the style block, or an unbridged utility colour. Checked: none
besides B-1's token.

### S-5 · the click-path guarding is complete and deliberate — which is exactly what localises B-2

Three independent seals — `@click.stop` on the checkbox chrome (`:88`), on the like button (`:141`),
and on the admin overlay (`:156`) — mean **no** nested control leaks a card-open on the pointer path,
including the checkbox whose reka root fires its own click. `:aria-pressed="isLiked"` (`:140`) and
`:aria-label` on the checkbox (`:92`) are likewise correct-by-construction. The B-2 blocker is
therefore surgical: `:78-79` needs `.self`, and nothing else in the interaction model is wrong. A
component whose pointer contract is airtight and whose key contract is inverted is a better repair
target than one that is uniformly sloppy.
**Falsifier.** A pointer path that reaches the root through a nested control — none exists; each of
the three interactive clusters is sealed.

---

## Ledger

| id | sev | one-line | anchor |
| --- | --- | --- | --- |
| B-1 | BLOCKER | `--ease-apple-spring` undefined ⇒ transition + like-bounce shorthands invalid, keyframes & reduced-motion rule dead | `GalleryCard.vue:195-198`, `:295` |
| B-2 | BLOCKER | ancestor keydown `.prevent` hijacks all 5 nested controls ⇒ keyboard-dead admin/like + wrong navigation | `GalleryCard.vue:78-79` |
| M-1 | MAJOR | `basisDisplay` snapshots reactive `VIZ_COLORS` ⇒ pill **and canvas** colours frozen at fallbacks | `basis-display.ts:3-7` → `GalleryCard.vue:40,48,121` |
| M-2 | MAJOR | whole `Set` as prop ⇒ O(N) re-render per like; sibling `selected` shows the right idiom | `GalleryCard.vue:22,34` · `GalleryInfiniteGrid.vue:35-36` |
| M-3 | MAJOR | hardcoded `tabindex="0"`, no opt-out ⇒ focusable content inside the aria-hidden marquee dup | `GalleryCard.vue:72-73` · `GalleryMarquee.vue:51-57` |
| M-4 | MAJOR | `basisLabels`+`timeAgo` cloned verbatim; 5 `timeAgo` / 3 semantics; basis fold ×5 | `GalleryCard.vue:36-61` · `GalleryCardModal.vue:41-66` |
| D-1 | MINOR | `tier !== 'normal'` not undefined-safe; backend never defaults tier ⇒ phantom empty badge | `GalleryCard.vue:149` · `api/routers/gallery.py:32-34` |
| D-2 | MINOR | `timeAgo` non-reactive, never ticks (masked by M-2) | `GalleryCard.vue:53-61,110` |
| D-3 | MINOR | dead imports `VIZ_COLORS` + `PathPreview`; compiler keeps both; PathPreview otherwise unreferenced | `GalleryCard.vue:9-10` |
| D-4 | MINOR | dead `:data-tier` binding on the inner badge | `GalleryCard.vue:149` |
| D-5 | MINOR | `:key="b.label"` collides; backend does not constrain/dedupe `active_bases` | `GalleryCard.vue:117` · `api/models/visualization.py:186` |
| D-6 | MINOR | `Record<string,…>` + `as` cast launder types; no `noUncheckedIndexedAccess` | `basis-display.ts:3` · `GalleryCard.vue:41,50` · `tsconfig.json:8` |
| D-7 | MINOR | no `@error` on the thumbnail; `alt`/`aria-label` are slugs; `title` unused | `GalleryCard.vue:74,99-104` |
| I-1 | INFO | root-barrel `Checkbox` is forced — glass-ui 4.0.0 ships no `./checkbox` (corpus row corrected) | `GalleryCard.vue:5` · glass-ui exports map |
| I-2 | INFO | R5-7 inapplicable inside; live at the consumer boundary (marquee/carousel native `v-for`) | `GalleryMarquee.vue:35-39,51-56` |
| S-1 | SUPER | zero teardown surface — no timers/listeners/observers/watchers at all | `GalleryCard.vue:34-61` |
| S-2 | SUPER | `content-visibility` adopted correctly, `auto <estimate>` trap avoided, floor stated | `GalleryCard.vue:71,199-206` |
| S-3 | SUPER | zero CLS: aspect frame reserves the lazy image's box | `GalleryCard.vue:98-104` |
| S-4 | SUPER | zero colour literals; every token upstream + `@theme inline` bridged | `GalleryCard.vue:189-308` |
| S-5 | SUPER | pointer path fully sealed (3× `@click.stop`) — which is what makes B-2 a one-line cure | `GalleryCard.vue:88,141,156` |

**Cure ordering if this challenge is adopted.** B-1 (one token + fallback, 4 files) → B-2 (`.self` ×2)
→ M-1 (accessor in `basis-display.ts`; repairs the gallery **and** the Canvas2D instrument in one
edit) → M-2+D-2 together (boolean prop + a shared clock) → M-4 (one `resolveBasisDisplay`, one
`timeAgo`, which also kills D-1 in both copies) → the remaining MINORs. Nothing here requires a
glass-ui uplift; B-1 and I-1 are the two rows that should ride the standing glass-BH relay.
