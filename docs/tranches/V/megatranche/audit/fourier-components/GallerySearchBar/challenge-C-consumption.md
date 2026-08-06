claude-opus-5[1m]

# CHALLENGE · GallerySearchBar · axis C (CONSUMPTION)

**Subject** `fourier-analysis/web/src/components/visualization/gallery/GallerySearchBar.vue` (223 lines)
**Axis** how the component consumes value.js 0.13 · keyframes.js 4.3 · glass-ui ^4.0.0 · the 45-operation fourier API; props/emits contract quality; integration seams.
**Method** static + source-derived only, over the READ-ONLY fourier tree at `cd26c65`, plus its installed `web/node_modules/@mkbabb/{value.js@0.13.0, keyframes.js@4.3.0, glass-ui@4.0.0}` and the Python API under `api/`. No browser. One numeric proof was computed by *executing value.js 0.13 itself* (§Appendix A) — the library the component's color chain declines to use.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Four hypotheses were killed by their own falsifiers and are recorded in §5 rather than banked as findings.

**Tally — 18 defects (2 BLOCKER · 5 MAJOR · 7 MINOR · 4 INFO) · 5 superlatives.**

---

## §0 — What this component actually consumes

| Dependency | Direct consumption | Verdict |
|---|---|---|
| **value.js 0.13** | **ZERO** — no import at `:1-12`. Transitive only: `:4` → `../lib/basis-display` → `@/lib/colors` (117 hand-rolled lines). | The `colors.ts` hand-rolled arm named by CENSUS §4 item 3 (F.W2) sits **directly under this component's color chain**. See C-4. |
| **keyframes.js 4.3** | **ZERO**. Motion is raw CSS `<Transition>` at `:78`, `:186-201`. | Fine in itself (S-3, S-5) — but the easing token it reaches for does not exist (C-3). |
| **glass-ui ^4.0.0** | `Button` (`:5`), `Select`/`SelectTrigger`/`SelectContent`/`SelectItem`/`SelectValue` (`:6-12`), the `glass-resting` material class (`:80`), and the `--z-bar` (`:169`) / `--ease-standard` (`:193`) / `--ease-apple-spring` (`:188-189`) tokens. | Subpath specifiers verified valid against the installed exports map. One token is a phantom (C-3); the `Select` wrapper's dropped generic forces two `as any` (C-5). |
| **fourier API (45 ops)** | **Indirect** — the component is a pure props/emits leaf; the wire is `GalleryView.vue:229-238` → `stores/gallery.ts:60-103` → `lib/api.ts:397-413` → `api/routers/visualizations.py:287-292`. | **The seam is broken end-to-end.** See C-1, C-2. |

---

## §1 — BLOCKERS

### C-1 · BLOCKER · Three of the component's four controls are inert end-to-end. The search box is a false promise.

**Provenance**

- `GallerySearchBar.vue:14-19` declares four props; `:21-26` declares four `update:*` emits.
- `GalleryView.vue:230-237` binds all four to `stores/gallery` and writes all four back.
- `GalleryView.vue:93-98` debounces `gallery.searchQuery` at 300 ms → `gallery.resetAndFetch()`.
- `GalleryView.vue:110-113` watches `[sort, tierFilter, basisFilter]` → `gallery.resetAndFetch()`.
- `stores/gallery.ts:90-93` — `resetAndFetch()` calls `api.listVisualizations({ limit: 20, sort: sort.value, owner: ownerParam() })`. **`searchQuery`, `tierFilter` and `basisFilter` are never read.**
- `stores/gallery.ts:64-69` — `fetchNextPage()` likewise passes only `{ limit, sort, cursor, owner }`.
- `lib/api.ts:397-407` — `listVisualizations` accepts *exactly* `{limit?, sort?, cursor?, owner?}`; the `URLSearchParams` builder has four `qs.set` lines and no fifth.
- `api/routers/visualizations.py:287-293` — the server signature is `(request, limit, sort, cursor, owner)`. No `q`, no `tier`, no `basis`.
- `api/routers/gallery.py:37-42` — the alias `GET /api/gallery/cursor` is *narrower still* (`limit, sort, cursor`).
- Across all 45 operations, `q` appears **once**: `api/routers/admin.py:244`, on the admin *user* list.
- No client-side filter exists either. `GalleryView.vue:65-70` computes `featuredEntries` / `nonFeaturedEntries` by `e.tier` alone; `GalleryInfiniteGrid.vue:31-33` renders `entries` verbatim via `v-for="entry in entries"`. Exhaustive greps for `searchQuery` / `tierFilter` / `basisFilter` over `web/src/` return **only** the store declaration, the store return, the `GalleryView` binding, and this component. Nothing consumes them.

**Consequence.** The user types into `:48-54` under the placeholder `"Search by slug..."` (`:51`). 300 ms later a network round-trip fires and returns **the identical first page**. Same for every tier `Select` change (`:82-95`) and every basis pill (`:113-126`). Worse than inert: `resetAndFetch()` opens with `entries.value = []` (`gallery.ts:85`), so each dead interaction **silently discards every infinite-scroll page the user has accumulated** and reloads page 1. The controls are not merely decorative — they are destructive of scroll state while delivering nothing.

Only `sort` reaches the wire, and it is genuinely live: `cursors.SORT_KEYS` (`api/lib/crud/cursors.py:20-23`) contains `newest`, `views`, `likes` — all three of the bar's options at `:105-107`. **1 of 4 controls works.**

That `AdminUserList.vue:61` *does* send `q: searchQuery.value || undefined` proves this is an omission, not an architectural stance: the codebase knows how to wire a search param and did so in the sibling component.

**Falsifier (survived).** *Show any code path — client-side predicate, server query param, or store getter — through which `searchQuery`, `tierFilter` or `basisFilter` changes the rendered set.* Searched: all of `web/src/` (grep, three terms, no hits beyond the plumbing above), `lib/api.ts` (the only `listVisualizations` builder), and both Python list handlers. None exists. The falsifier would also be satisfied by a `q`/`tier`/`basis` param anywhere on the 45-op surface; `grep -rn "Query(default" api/routers/*.py` returns 12 params, of which the only search-shaped one is the admin `q`.

**Relation to corpus.** Not in `lane-frontend.md` (which inventories the file at :106 as "Search + filter `Select`s" — a description of intent, not of behavior) and not in `lane-crud.md`. **New.** It is the same *family* as intake row `R6-8` (`lane-fourier-r3-r6.md:142`): the client leaf and the operation leaf are out of correspondence. R6-8's pathology was an operation record that over-couples to its client; C-1 is the dual — a **client control with no operation to couple to at all**. Both belong in the F.W5 ADMISSION KEYSTONE contract, and C-1 argues the contract needs a *coverage* direction as well as an *isolation* direction: every user-facing filter control must name the operation parameter it drives, or be deleted.

---

### C-2 · BLOCKER · The basis vocabulary the component emits does not exist in the persisted domain. Any naive repair of C-1 ships a filter that matches zero rows.

**Provenance**

- `:122` emits `b.key` — the keys of `basisDisplay`, which are exactly `"fourier"`, `"chebyshev"`, `"legendre"` (`lib/basis-display.ts:4-6`).
- The persisted field is `Visualization.active_bases: string[]` (`lib/types.ts:214`).
- Its actual values are `"fourier-epicycles"`, `"fourier-series"`, `"chebyshev"`, `"legendre"` — established at `BasisSelector.vue:11` (`const fourierModes = ["fourier-epicycles", "fourier-series"] as const`), and written on every publish path: `stores/gallery.ts:250-252` and `stores/workspace.ts:351-353` both default `active_bases` to `["fourier-epicycles"]`.
- **The sibling component already carries the translation.** `GalleryCard.vue:39` — `const key = b.startsWith("fourier") ? "fourier" : b;` — normalizes the *stored* vocabulary down to the *display* vocabulary before indexing `basisDisplay`. GallerySearchBar has no inverse.

**Consequence.** `basisFilter === "fourier"` is a display key, not a domain value. A repair that does the obvious thing — forward `basisFilter` as a query param and match it against `active_bases` — returns **zero rows for the Fourier pill**, which is the default basis of essentially every visualization in the gallery (both publish paths default to `fourier-epicycles`). The two non-Fourier pills would work by coincidence, making the bug maximally confusing: one control, two arms live, one arm silently empty.

This is precisely the operation↔client leaf coupling failure `R6-8` warns about, arriving from the vocabulary side rather than the back-reference side.

**Falsifier (survived).** *Show that `"fourier"` is ever a stored `active_bases` value.* It is not: the only two writers (`gallery.ts:250-252`, `workspace.ts:351-353`) pass through `animationSettings.active_bases` or default to `["fourier-epicycles"]`, and the only producer of `animationSettings.active_bases` is `BasisSelector`, whose entire vocabulary is `fourierModes` ∪ `{chebyshev, legendre}` (`BasisSelector.vue:11, 37, 96-105`). A second falsifier — *the server normalizes on write* — also fails: `api/routers/visualizations.py` contains **zero** occurrences of `basis`.

**Corpus.** New. CARRY → F.W5 (contract) and F.W4 (the repair).

---

## §2 — MAJOR

### C-3 · MAJOR · `--ease-apple-spring` does not exist in glass-ui 4.0.0. The drawer's enter transition is invalid-at-computed-value-time and does not animate.

**Provenance**

- `:186-190` — `.filter-drawer-enter-active { transition: opacity 0.3s var(--ease-apple-spring), transform 0.3s var(--ease-apple-spring); }`, annotated `/* Filter drawer transition (A.W3.d — named properties + canonical tokens) */` at `:185`. The annotation asserts the tokens are canonical.
- Exhaustive search of the installed glass-ui 4.0.0 for a **definition** — `grep -rn -- "--ease-apple-spring\s*:" node_modules/@mkbabb/ src/ index.html` — returns **zero hits**.
- The only occurrence of the string anywhere in `node_modules/@mkbabb/` is **prose**: `glass-ui/README.md:211`, a token-inventory table row. The documentation advertises a token the CSS does not ship.
- The sibling token *is* real: `--ease-standard` at `glass-ui/dist/styles/tokens/scheme-motion.css:216` → `var(--motion-ease-standard)` → `cubic-bezier(0.4, 0, 0.2, 1)` at `:211`. So the leave arm (`:191-195`) animates correctly. `--z-bar` (`:169`) is likewise real (`scheme-motion.css:337` = `30`).

**Consequence.** Per CSS Variables §3, `var()` on an undefined custom property with no fallback substitutes the guaranteed-invalid value, and the containing declaration becomes invalid at computed-value time — for the non-inherited `transition` shorthand that means it computes to its **initial value**, `all 0s ease 0s`. `.filter-drawer-enter-active` therefore carries no transition at all. Vue's `Transition` reads the computed style, finds duration 0, and resolves the enter on the next frame: the panel **pops** in. The leave, using the real token, animates over 200 ms. The drawer is asymmetric — and the asymmetry is invisible to the author because the annotation at `:185` claims the opposite.

Repo blast radius: 4 other sites reach for the same phantom — `VisualizationView.vue:426`, `GalleryCard.vue:196` and `:295` (the latter on an `animation` shorthand, which fails the same way), `AppHeader.vue:280`.

**Falsifier (survived).** *Find a definition site.* Three searches, three misses: the whole `node_modules/@mkbabb/` tree, the whole `web/src/` tree, `index.html`. Second falsifier — *glass-ui registers it via `@property` with an initial value*, which would make the substitution valid: `grep -rn "@property" node_modules/@mkbabb/glass-ui/dist/styles/` finds no registration for this name. Third falsifier — *Tailwind v4's `@theme` synthesizes it*: `src/style.css:13-16` declares only `--font-sans`.

**Relay.** Per the standing BH/BI invariant this is a glass-ui-level finding: **either ship `--ease-apple-spring` or strike README.md:211.** It joins the two carries already held in `style.css` (`cartoon-card`, the `--viz-amber` WCAG darken) noted at `lane-frontend.md:643` [P2].

---

### C-4 · MAJOR · The basis pill colors are a module-evaluation snapshot of a palette that is *itself* blind to the `oklch()` tokens glass-ui 4.0.0 actually ships. Two independent breaks, one masking the other.

**Provenance — break A (the snapshot).**
`lib/basis-display.ts:3-7` is a plain object literal: `color: VIZ_COLORS.fourier` is read **once, at module evaluation**, copying a `string`. `VIZ_COLORS` is `reactive()` (`lib/colors.ts:77-87`) but nothing survives the copy. `resolveVizColors()` runs later — in `App.vue:11`'s `onMounted`, and again on every `.dark` toggle via the `MutationObserver` at `App.vue:13`. `basisDisplay.*.color` therefore holds the **hardcoded initializers forever**: `#bf4040`, `#3d72b8`, `#9545b8` (`colors.ts:78-80`). `:121` projects those into `--pill-c`; `:213-222` mixes them into border, background and text. **The pills never respond to light/dark.**

**Provenance — break B (the oklch blindness).**
`cssVarToHex` (`colors.ts:22-54`) matches four shapes: leading `#` (`:29`), `hsl(...)` (`:32-37`), a bare Tailwind HSL triplet (`:40-43`), `rgb(...)` (`:46-51`). Everything else falls to `return "#888888"` (`:53`). glass-ui 4.0.0 ships the three basis tokens as **`oklch()`**:
```
glass-ui/dist/styles/tokens/light-dark.css:145-147
    --viz-fourier:   light-dark(oklch(0.579 0.201 30.4),  oklch(0.693 0.151 28.1));
    --viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4));
    --viz-legendre:  light-dark(oklch(0.532 0.180 317.5), oklch(0.739 0.134 318.1));
glass-ui/dist/styles/tokens/dark-arm.css:113-115  (the dark arm, same values)
```
Custom properties are unregistered, so `getComputedStyle(...).getPropertyValue("--viz-fourier")` returns the substituted token stream — an `oklch(...)`/`light-dark(...)` string, never an `rgb()` serialization. `colors.ts:91-93` therefore assigns **`"#888888"` to all three** of `VIZ_COLORS.fourier|chebyshev|legendre` on mount.

**The interaction.** Break A *masks* break B **for this component only**: because `basisDisplay` snapshotted before `resolveVizColors()` ran, the pills show stale-but-chromatic hexes rather than uniform grey. Every consumer that reads `VIZ_COLORS` *reactively* gets the grey — `BasisSelector.vue:176` and `:203` (`--track-color`), `EditorControlsDock.vue:123`, `BasisCanvas.vue:127, 172, 261, 326`, `ContourSettings.vue:236-301`. So `BasisSelector` renders its pill in stale `#bf4040` and its slider track in grey `#888888`, **in the same panel**, while the surrounding CSS (`FunctionInput.vue:236-247`, `EquationPanel.vue:101`, …) reads `var(--viz-fourier)` directly and shows the true oklch. Three different reds for one concept.

**Magnitude (computed with value.js 0.13 — §Appendix A).** ΔE-OK between each stale pill hex and the token it purports to represent, against value.js's own `DELTA_E_OK_JND = 0.02`:

| basis | pill (frozen) | live light | ΔE light | live dark | ΔE dark |
|---|---|---|---|---|---|
| fourier | `#bf4040` | `#d73523` | 0.0597 (3.0× JND) | `#eb7366` | **0.1422 (7.1× JND)** |
| chebyshev | `#3d72b8` | `#3156b9` | 0.0870 (4.4× JND) | `#88a1e7` | **0.1725 (8.6× JND)** |
| legendre | `#9545b8` | `#9541af` | 0.0179 (0.9× JND) | `#ce8ee1` | **0.2059 (10.3× JND)** |

And the grey the reactive path actually produces sits 0.16–0.26 ΔE-OK from every token — 8–13× JND.

**value.js is on the shelf, unused.** The installed `@mkbabb/value.js@0.13.0` root export surface is **239 symbols** and includes `parseCSSColor`, `colorUnit2`, `color2`, `normalizeColor`, `OKLCHColor`, `RGBColor`, `deltaEOK`, `COLOR_NAMES` (`dist/index.d.ts:10-22, 43`). `parseCSSColor` parses every token above correctly (§Appendix A). The whole of `cssVarToHex` + `hslToHex` + `rgbToHex` + `hexToRgba` + `hexToRgb` (`colors.ts:22-117`) is subsumed by three symbols already in the bundle.

**Corpus — fold and CONTRADICT.** `CENSUS-2026-08-03.md:174-175` records `colors.ts` as "a 117-line hand-rolled regex file … no `oklch()` arm", the "deletion target of W.L5 item 2", and `:188` scopes the F.W2 work as *"delete the `colors.ts` hand-rolled arms (**declared 3-line hex residual**)"*. **That framing is too weak and should be corrected.** The census reads the missing arm as *migration hygiene*; the tree shows it is a **live chromatic fault today**, because the very tokens `resolveVizColors()` is written to read have already moved to `oklch()` in the pinned glass-ui 4.0.0. F.W2 should be re-scoped from "delete a residual" to "repair a live palette break", and it must additionally fix `basis-display.ts:3-7` — **deleting `colors.ts` alone leaves the snapshot bug standing**, and would in fact make this component *worse* by unfreezing it onto whatever the replacement returns.

**Falsifier (survived).** *(a) Show `basisDisplay` is reactive.* It is a `Record<string, {icon;label;color}>` object literal of primitives (`basis-display.ts:3-7`); no getter, no `computed`, no `toRef`. *(b) Show `cssVarToHex` handles `oklch()`.* Four regexes at `colors.ts:29-51`, none matching `oklch`/`lab`/`lch`/`color(`; the terminal `return "#888888"` at `:53`. *(c) Show fourier overrides the three tokens locally, as it does `--viz-amber`.* `src/style.css:119-127` overrides **only** `--viz-amber` and `--section-color-5`; `grep -rn -- "--viz-fourier" src/` returns 8 hits, all *consumers* (`EquationPanel.vue:101`, `FunctionInput.vue:185-247`, `EditorControlsDock.vue:205-208`, `colors.ts:91`), zero declarations. *(d) The `light-dark()` wrapper resolves before readback.* Irrelevant to the outcome — both arms are `oklch()`, so either resolution misses all four regexes.

---

### C-5 · MAJOR · `$event as any` twice discards the typed emit contract the component just declared — and the glass-ui `Select` wrapper is the reason it feels necessary.

**Provenance.** `:84` `@update:model-value="emit('update:tierFilter', $event as any)"` and `:99` `emit('update:sort', $event as any)`. The emits at `:23-24` are precisely typed literal unions.

**Upstream cause.** `glass-ui/dist/components/ui/select/Select.vue.d.ts` types the root as `type __VLS_Props = SelectRootProps` with `"update:modelValue": (value: import("reka-ui").AcceptableValue) => any`. **The wrapper drops reka-ui's generic** — upstream `SelectRoot` is generic over the value type; glass-ui's re-export collapses it to `AcceptableValue`. A consumer cannot narrow through it.

**Why `as any` is still the wrong local answer.** `as typeof props.tierFilter` would assert on the *input* while leaving the emit's payload checked. `as any` widens the **argument** position, so the emit signature stops constraining anything. Concrete failure: change `:91` from `<SelectItem value="featured">` to `value="featurd"`. `vue-tsc -b` (the `build` script, `package.json:8`) stays green; at runtime `tierFilter` becomes `"featurd"`, and `hasActiveFilters` (`:39-41`) starts reporting `true` permanently, which via `:69-70` pins the toggle button into its active styling and `aria-pressed="true"` forever. A one-character typo in a template literal becomes a silent, permanent UI state change — with no type error and no test (C-7) to catch it.

**Falsifier (survived).** *Is a narrowing cast actually available?* Yes — `Select`'s emit payload is `AcceptableValue` (a union including `string`), and both prop unions are string-literal subsets, so `$event as typeof props.tierFilter` compiles. *Does glass-ui expose a generic escape hatch?* `dist/select.d.ts` is a bare `export * from "./components/ui/select"`; `index.d.ts` re-exports ten default components; no generic component, no typed factory.

**Relay.** glass-ui BH: **preserve reka-ui's `SelectRoot` generic through the wrapper.** Every glass-ui `Select` consumer in every repo is currently paying this cast.

---

### C-6 · MAJOR · `aria-pressed` on the filter toggle conflates *disclosure state* with *filter state*, and is the wrong ARIA pattern for a disclosure in the first place.

**Provenance.** `:70` — `:aria-pressed="showFilters || hasActiveFilters"`, where `hasActiveFilters` (`:39-41`) is true whenever `tierFilter !== "all" || sort !== "newest" || basisFilter !== ""`. The button's sole behavior (`:71`) is `showFilters = !showFilters` — it controls the `v-if` panel at `:79`.

**Consequence.** With the drawer **closed** but any filter set, a screen-reader user is told *"Filters, toggle button, pressed"* while the panel it controls is not in the accessibility tree. The state announced and the state the control governs have diverged. Separately, a control that shows/hides a region is a **disclosure**: it wants `aria-expanded` plus `aria-controls` pointing at an `id` on `.filter-panel`, not `aria-pressed`. The component has neither; `.filter-panel` (`:80`) carries no `id`.

The visual arm shares the flaw — `:69` drives `.is-active` from the same disjunction, so "drawer open" and "filters set" are visually indistinguishable.

**Falsifier (survived).** *Does axe already cover this?* No, and that is the point: `aria-pressed` on a `<button>` is *valid*, so `e2e/visualization-ux.spec.ts:26-38`'s serious/critical gate cannot see it. The defect is semantic, below axe's reach. *Does glass-ui's `Button` add disclosure semantics?* `Button.vue.d.ts` declares `PrimitiveProps & {variant,size,class,type,disabled}` and renders a reka-ui `Primitive` — attributes fall through unchanged, nothing is synthesized.

---

### C-7 · MAJOR · The e2e coverage of this component is vacuous by construction — a self-nullifying guard, zero behavioral assertions, and a stale DOM contract. It is why C-1 shipped.

**Provenance.** `e2e/gallery.spec.ts:43-65`, the sole spec naming this component:
- `:57-58` — `const filterToggle = page.locator(".filter-toggle"); if (await filterToggle.isVisible()) { … }`. **If the toggle is not visible, the test passes with zero assertions.** A regression that removes the search bar entirely turns this spec green.
- `:62-63` — the only assertion inside the guard is `expect(filterPanel).toBeVisible()`. It never touches a `Select`, never clicks a basis pill, and never asserts anything about the result set. C-1 — three controls that change nothing — is exactly the class of defect this spec is shaped to miss.
- `:19-22` — `const glassDock = page.locator(".glass-dock"); … expect(glassDock.or(searchInput)).toBeVisible();` and `:49-53` expand a `.glass-dock` before interacting. **GallerySearchBar renders no dock** — `grep -n "glass-dock\|GlassDock"` over the SFC returns nothing; its root is `.search-bar-root` (`:45`). The spec is written against a DOM contract this component no longer (or never did) satisfy, and the `.or()` disjunction at `:22` hides the drift.

**Falsifier (survived).** *Is behavior covered elsewhere?* Greps for `search-pill`, `basis-pill-btn`, `filter-panel`, `Search by slug` across `e2e/` return hits only in `gallery.spec.ts`. `visual-baseline.spec.ts:33` screenshots `/gallery` — a pixel baseline, which by construction *locks in* C-4's wrong pill colors rather than detecting them.

---

## §3 — MINOR

### C-8 · MINOR · Dead class binding.
`:119` — `:class="{ active: basisFilter === b.key }"`. The scoped block styles `.basis-pill-btn` (`:211`), `.basis-pill-btn:hover` (`:214`) and `.basis-pill-btn[aria-pressed="true"]` (`:219`). **No `.active` rule exists.** Vue's scoped-CSS compiler does not error on unmatched classes, so the binding evaluates on every render and paints nothing. *Falsifier:* searched the SFC's whole `<style scoped>` (`:134-223`) and `src/style.css` (global) for `.active` — the only global hits are `[data-state="active"][role="tabpanel"]` (`style.css:83`) and `.is-amber`-family rules elsewhere, neither matching. Delete `:119`; `aria-pressed` at `:120` already carries the state (S-1).

### C-9 · MINOR · Three controls with no accessible name.
`:48-54` the text input has `placeholder` only — no `<label>`, no `aria-label`; a placeholder vanishes on input, so the field is unnamed exactly while in use. `:55-63` the clear button is icon-only (`<X :size="14" />`) with no `aria-label`. `:65-74` the filter toggle likewise (`<SlidersHorizontal :size="15" />`). *Falsifier:* `glass-ui` `Button` synthesizes nothing (see C-6's falsifier); `lucide-vue-next` icons render `<svg>` without `<title>` unless passed one, and none is. axe's `label` rule accepts placeholder as an accname source, which is why `visualization-ux.spec.ts` stays green — sub-axe, real.

### C-10 · MINOR · `hasActiveFilters` counts a sort as a filter; and there is no clear-all.
`:39-41` folds `props.sort !== "newest"` into a predicate named *filters*. Sorting by "Most Liked" is not filtering; it makes the toggle read "active" when nothing is filtered. The component also offers no way to reset the set it advertises as active — the only clear affordance (`:55-63`) resets `searchQuery` alone.

### C-11 · MINOR · `@click.stop` guards a listener that does not exist; the drawer has no dismiss path.
`:71` — `@click.stop="showFilters = !showFilters"`. `.stop` on the *opener* is the idiom for coexisting with a document-level outside-click closer. The SFC installs none: no `onClickOutside`, no `addEventListener`, no `@keydown.esc`, no `vOnClickOutside` — read whole, `:1-42` has only `ref` and two `computed`. So the drawer, once open, closes only by clicking the same button, and swallows the click event for no beneficiary. *Falsifier:* `@vueuse/core@^14.3.0` (`package.json:23`) ships `onClickOutside` and glass-ui ships `HoverPopover`/`PopoverContent` primitives — the capability is present and unused; the `.stop` is vestigial, not defensive.

### C-12 · MINOR · Runtime import of a devDependency; also one of the 35 F.W1 rename sites.
`:3` imports `lucide-vue-next` at runtime, but `package.json:35` declares it under `devDependencies`. Harmless for `private: true` + Vite bundling today, but any `npm ci --omit=dev` build stage fails. 35 files import it (`grep -rl` over `web/src/`), matching the census's "`@lucide/vue` rename (35 sites)" at `CENSUS-2026-08-03.md:186` — **this line is one of them**, so the two repairs should land together. Same misclassification applies to `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` (`package.json:37, 30-31, 40`).

### C-13 · MINOR · Four `defineModel`s would delete this component's entire props/emits ceremony and half its call site.
`:14-26` = 13 lines of paired declarations, mechanically derivable. Vue 3.5 `defineModel` is available (`vue: ^3.5.38`, `package.json:26`), and it collapses to four lines here plus `v-model:search-query` / `:sort` / `:tier-filter` / `:basis-filter` at the call site — `GalleryView.vue:230-237` drops from 8 lines to 4. *Falsifier:* is the manual form load-bearing? The only asymmetry between prop and emit is the `as any` at `:84`/`:99` (C-5), which `defineModel`'s setter handles identically. No prop is transformed, defaulted, or validated. Nothing is lost. (Filed MINOR, not MAJOR: the current form is correct, merely verbose.)

### C-14 · MINOR · The display map's type erases the key union, forcing `basisFilter: string`.
`lib/basis-display.ts:3` annotates `Record<string, {icon;label;color}>`. Dropping the annotation (or using `satisfies`) would give `keyof typeof basisDisplay = "fourier"|"chebyshev"|"legendre"`, letting `:18` and `:25` be typed unions like their three siblings. As written, `basisFilter` is the one untyped member of an otherwise precisely-typed contract — and the one that is wrong (C-2). Fixing the annotation would not have caught C-2 (the union would be the *display* union either way), but it would have made the vocabulary mismatch legible at the type level.

---

## §4 — INFO

### C-15 · INFO · The `scheduler.yield()` INP floor is arithmetically inert on the path every interaction here triggers. **Contradicts `lane-frontend.md`.**
`stores/gallery.ts:74` calls `processInChunks(fresh, …, { chunkSize: 24 })`; `:65` requests `limit: 20`. `processInChunks` yields only when `(i + 1) % chunkSize === 0 && i + 1 < items.length` (`lib/scheduler.ts:50`) — unreachable for `items.length ≤ 20 < 24`. The function runs fully synchronously on every gallery page. `scheduler.ts:14-18` names "the gallery infinite-scroll accumulation" as *"the genuine unbounded consumer"* and states it "yields between card batches"; `lane-frontend.md` (INP/long-task section) concludes **"Good hygiene, correctly scoped."** **The tree disagrees**: the yield boundary can never be crossed at the shipped page size. Either `chunkSize` must drop below `limit` or the claim should be withdrawn. (INFO, not MAJOR — 20 card pushes is not a long task; the defect is that a documented mitigation is a no-op, which is a governance problem, not a performance one.)

### C-16 · INFO · The bar under-consumes the sort surface it already reaches.
`cursors.SORT_KEYS` (`api/lib/crud/cursors.py:20-23`) offers five keys — `newest, popular, most-forked, views, likes`. The bar surfaces three (`:105-107`). `most-forked` is backed by a first-class denormalized counter (`fork_count`, `lib/types.ts:225`, part of the WAVE D fork/provenance substrate) that the gallery cannot sort by. Cheap, and it exercises the one seam that actually works.

### C-17 · INFO · The scoped comment's parity claim is materially false in three respects.
`:206-209` states `.basis-pill-btn` "match[es] BasisSelector's `.basis-toggle` recipe." Against `BasisSelector.vue:245-292`: (1) BasisSelector binds its color var **only when pressed** — `:style="isBasisActive(key) ? { '--pill-color': info.color } : {}"` (`:145`) — whereas `:121` binds `--pill-c` unconditionally; (2) BasisSelector's non-pressed `:hover` stays neutral (`--muted-foreground`, `--foreground 25%`, `:264-268`) whereas `:214-218` tints hover to `--pill-c` — a different affordance language for the same concept; (3) BasisSelector adds `border-width: 2px`, `min-w-[5.5rem]` and a `max-width: 639px` compact block (`:258-262`, `:279-292`), none present here. The token names also differ (`--pill-color` vs `--pill-c`). Either converge the two recipes or strike the claim; a comment asserting parity that does not hold is worse than no comment, because it defeats the next reader's inspection.

### C-18 · INFO · **UNPROVEN-NEEDS-LIVE (SS-13)** — the drawer's "does not affect flow" claim is only half true.
`:77` annotates the drawer "overlaid, does not affect flow"; `:165-174` makes `.filter-anchor` `position: absolute` inside the `position: relative` `.search-bar-root` (`:139-143`). It is correct about *layout* flow. But the whole bar sits inside `GalleryView.vue:220`'s `overflow-y-auto h-full` scroller, and an absolutely-positioned box whose containing block lies inside a scroll container contributes to that container's **scrollable overflow**. Predicted: opening the drawer grows the gallery's scroll extent by ~its height, and the drawer scrolls away with content while remaining open (it is not `sticky`/`fixed`). Requires a live page to confirm; flagged for the SS-13 pass, not banked.

---

## §5 — Hypotheses tested and REJECTED (L-18, both directions)

Recorded so a later pass does not re-derive them, and so the confirmed findings are read against a visible denominator.

1. **"Filter/sort changes race an in-flight `fetchNextPage`, so stale pages get appended to the new set."** — **REJECTED twice.** (a) `lib/api.ts:54-58` runs a per-key `AbortController` registry and `:161` defaults every call's signal to `abortable(abortKey)`; both `resetAndFetch` and `fetchNextPage` route through `abortKey = "listVisualizations"` (`api.ts:409-412`), so the second call aborts the first at the fetch layer. (b) The remaining window — a resolved fetch suspended mid-`processInChunks` — requires that function to actually yield, and per C-15 it never does at `limit: 20` / `chunkSize: 24`. No race.
2. **"`<SelectValue />` without a `placeholder` prop renders the raw value (`all`, `newest`) instead of the label."** — **REJECTED.** glass-ui's `SelectItem` wraps its slot in reka-ui `SelectItemText` (`dist/SelectScrollDownButton-C1jb3b3K.js`), which is what `SelectValue` mirrors. The trigger shows "All tiers" / "Newest" correctly.
3. **"The `sort` values the bar offers are rejected by the server."** — **REJECTED.** All three (`newest`, `views`, `likes`) are present in `cursors.SORT_KEYS` (`cursors.py:20-23`); the `sort not in SORT_KEYS` guard at `visualizations.py:298` never fires for this component. `sort` is genuinely live — which is what makes C-1's "1 of 4" precise rather than rhetorical.
4. **"`parseCSSColor` is unreachable at value.js 0.13, since its `exports` map has no subpaths."** — **REJECTED.** The map is indeed `"." `-only (`value.js/package.json`), but `dist/index.d.ts:43` re-exports `CSSColor, parseCSSColor, registerColorNames, clearCustomColorNames, getCustomColorNames` from the root, and a runtime import confirms `parseCSSColor` among 239 root exports. **The capability is already installed and reachable** — which strengthens C-4 rather than excusing it.

---

## §6 — SUPERLATIVES (5)

Each carries its own falsifier; L-18 runs both ways.

**S-1 · The visual state is *derived from* the accessibility state, not parallel to it.**
`:219` — `.basis-pill-btn[aria-pressed="true"]`. The active tint is keyed off the ARIA attribute (`:120`), so the two cannot drift: a broken `aria-pressed` is immediately visible as a broken pill. This is strictly better than the class-keyed idiom and better than its own sibling — `BasisSelector.vue:269` uses the same attribute selector but *also* gates the color var on a separate JS predicate (`:145`), reintroducing a second source of truth. *Falsifier (partially bites):* the pattern is only half-honored here — `:119` still emits a redundant `.active` class (C-8). Strip that dead binding and this component becomes the reference implementation for the repo.

**S-2 · A genuinely controlled leaf: zero store reach-in, zero local mirror.**
`:1-12` imports no store, no router, no `api`. All four filter values arrive as props and leave as emits; the only local state is `showFilters` (`:28`), which is genuinely local (nothing else needs it). Compare `GalleryView.vue:4-8`, which imports three Pinia stores. The dual-source-of-truth bug class — a `ref` seeded from a prop and then diverging — is structurally impossible here. *Falsifier:* `BasisSelector.vue:37` does exactly the thing this component avoids (`const selected = ref<string[]>(props.activeBases ?? [...])`), so the discipline is a choice, not an accident of the codebase.

**S-3 · Named-property transitions, not `transition: all`.**
`:186-195` enumerate `opacity` and `transform` — the two compositor-friendly properties — with distinct durations and distinct easings per direction (0.3 s spring in, 0.2 s standard out). This is the correct asymmetry: enter may overshoot, exit should not hesitate, which is precisely the doctrine glass-ui's own token file lays out at `scheme-motion.css:162-180`. *Falsifier (bites hard):* the enter arm's easing token does not exist (C-3), so the right structure currently produces no animation at all. The structure survives as a superlative; the token does not.

**S-4 · Correct toggle-off semantics for a single-select pill group.**
`:122` — `emit('update:basisFilter', basisFilter === b.key ? '' : b.key)`. Clicking the active pill clears the filter rather than re-asserting it, and the empty string is a coherent "no filter" sentinel consistent with the store's initializer (`gallery.ts:38`) and with `hasActiveFilters` (`:40`). No third state, no null/undefined ambiguity. *Falsifier:* none found — the sentinel is used consistently at `:40`, `:119`, `:120`, `:122` and in the store.

**S-5 · The lowest tri-package blast radius in the gallery folder.**
Zero direct `@mkbabb/value.js` and zero `@mkbabb/keyframes.js` imports (`:1-12`) means the F.W1 atomic uplift (glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0, `CENSUS-2026-08-03.md:185-186`) touches this file **only** through `Button` and `Select` — two of the most stable glass-ui primitives, neither on the census's named break surface (metric-badge, hover-card/-popover, dock members, `ToastVariant`). Contrast `GalleryDraftsSection.vue:8` (`MetricBadge`, on the break list) and `GalleryCardModal.vue:3-5`. *Falsifier (mostly holds):* the file does consume three glass-ui *tokens* (`--z-bar`, `--ease-standard`, `--ease-apple-spring`), and one is already broken at the pinned version — so the token surface is the uplift risk here, not the component surface. Worth pinning C-3's repair to the F.W1 transaction.

---

## §7 — Carries

| # | Finding | Severity | Wave | Note |
|---|---|---|---|---|
| C-1 | Three inert controls, full-stack | BLOCKER | **F.W5** (contract) + F.W4 (repair) | Argues the ADMISSION KEYSTONE needs a *coverage* direction beside R6-8's *isolation* direction |
| C-2 | basis vocabulary mismatch | BLOCKER | **F.W5** | Must be settled before any C-1 wiring |
| C-3 | `--ease-apple-spring` phantom | MAJOR | **F.W1** + glass-ui BH relay | 5 sites repo-wide; glass README:211 also wrong |
| C-4 | snapshot + oklch-blind palette | MAJOR | **F.W2** — **re-scope** | Census §4 item 3's "3-line hex residual" understates a live break; `basis-display.ts` must be fixed too |
| C-5 | `as any` ×2 / dropped Select generic | MAJOR | F.W4 + glass-ui BH relay | |
| C-6 | `aria-pressed` disclosure conflation | MAJOR | F.W4 | Below axe's reach |
| C-7 | vacuous e2e | MAJOR | F.W4 | The reason C-1 shipped |
| C-8..C-14 | seven MINOR | MINOR | F.W4 | C-12 rides the 35-site lucide rename |
| C-15 | inert INP yield floor | INFO | F.W4 | **Contradicts** `lane-frontend.md`'s "correctly scoped" |
| C-16..C-17 | under-consumed sorts; false parity comment | INFO | F.W4 | |
| C-18 | scroll-extent claim | INFO | **SS-13** | UNPROVEN-NEEDS-LIVE |

---

## Appendix A — the value.js 0.13 proof

Run against `fourier-analysis/web/node_modules/@mkbabb/value.js@0.13.0` — the pinned, installed copy. The point is not the arithmetic but that **every symbol used here was already in the bundle** when `cssVarToHex` was written.

```js
const { parseCSSColor, colorUnit2, DELTA_E_OK_JND } = await import("@mkbabb/value.js");
const hx = n => Math.round(Math.max(0, Math.min(255, n * 255))).toString(16).padStart(2, "0");
const toHex = s => { const c = colorUnit2(parseCSSColor(s), "rgb").value;
                     return "#" + hx(c.r) + hx(c.g) + hx(c.b); };
```

`parseCSSColor("oklch(0.579 0.201 30.4)")` → `rgb(0.8433193300445836 0.20836136534517996 0.1371963578904081)` → `#d73523`. All six glass-ui basis tokens parse; none throws. `DELTA_E_OK_JND` = `0.02`.

| token (glass-ui 4.0.0) | value.js → hex | `basisDisplay` frozen hex | ΔE-OK |
|---|---|---|---|
| `--viz-fourier` light `oklch(0.579 0.201 30.4)` | `#d73523` | `#bf4040` | 0.0597 |
| `--viz-fourier` dark `oklch(0.693 0.151 28.1)` | `#eb7366` | `#bf4040` | 0.1422 |
| `--viz-chebyshev` light `oklch(0.484 0.163 265.5)` | `#3156b9` | `#3d72b8` | 0.0870 |
| `--viz-chebyshev` dark `oklch(0.718 0.107 268.4)` | `#88a1e7` | `#3d72b8` | 0.1725 |
| `--viz-legendre` light `oklch(0.532 0.180 317.5)` | `#9541af` | `#9545b8` | 0.0179 |
| `--viz-legendre` dark `oklch(0.739 0.134 318.1)` | `#ce8ee1` | `#9545b8` | 0.2059 |

`cssVarToHex`'s fallback `#888888` sits at ΔE-OK 0.1619–0.2557 from all six — 8–13× JND. ΔE computed as the Euclidean OKLab distance via `colorUnit2(·, "oklab")`, matching value.js's own `deltaEOK` definition (`dist/units/color/gamut.d.ts`).
