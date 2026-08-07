claude-opus-5[1m]

# CHALLENGE · `PaperSidebar.vue` · axis **C — CONSUMPTION**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSidebar.vue` (283 lines,
clean at HEAD `cd26c653` — `git status --porcelain -- web/src/components/paper/` returns `MobileFloatingToc.vue`,
`PaperView.vue`, `search/PaperSearchDropdown.vue` only, so **this file is NOT part of the 24-path in-flight bump**;
it was authored against the `[HEAD]` pin `@mkbabb/glass-ui: ^3.1.0` and now executes against the installed `4.0.0`).

**Mode** static + source-derived, read-only. No browser tooling. Every livable-only consequence is tagged
**UNPROVEN-NEEDS-LIVE (SS-13)**. Assumed DEFECTIVE until the tree proved otherwise; five claims survived their
falsifier in the component's favour and are booked as superlatives (L-18 runs both ways).

**Consumption surface, measured**

| producer | import sites in this file | verdict |
|---|---|---|
| `@mkbabb/glass-ui` `^4.0.0` (installed **4.0.0**) | 3 — `:6 /button`, `:7 /collapsible`, `:8 /sidebar` | deep, and **uplift-clean** (S-1) |
| `@mkbabb/latex-paper` `0.2.1` | 1 type-only, transitively — `:4 → lib/paperContent.ts:6` | its runtime half enters as **props**, not imports (C-B2) |
| `lucide-vue-next` `^1.0.0` | 1 — `:9 ChevronUp` | **runtime import from `devDependencies`** (C-m9) |
| `@mkbabb/value.js` `0.13.0` | **0** | not reachable here — and that is the point (S-3 / C-B1) |
| `@mkbabb/keyframes.js` `4.3.0` | **0** | the collapse motion is producer-owned (S-4) |
| fourier API (45 operations) | **0** — `grep -n "lib/api\|stores/" PaperSidebar.vue` → *(empty)* | R6-8 **not reachable**; see §5 |

**Tally: 20 defects — 3 BLOCKER · 7 MAJOR · 10 MINOR — and 5 superlatives.**

---

## §1 · BLOCKERS

### C-B1 — the axis's named `colors.ts` arm is oklch-blind; the producer ships oklch. `#888888` for the whole viz palette. [locus: ADJACENT]

`web/src/lib/colors.ts:22-54` `cssVarToHex()` recognises exactly four forms — `#hex` (`:29`),
`hsl(...)` (`:32-34`), a bare Tailwind-v3 HSL triplet `"6 72% 49%"` (`:40`), and `rgb(...)` (`:46-48`) — and
returns the literal `"#888888"` on any other input (`:26`, `:53`). The tokens it is pointed at
(`colors.ts:91-95`) are, in the **installed** producer:

```
node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css
  :263  --viz-fourier:   oklch(0.579 0.201 30.4);
  :264  --viz-chebyshev: oklch(0.484 0.163 265.5);
  :265  --viz-legendre:  oklch(0.532 0.180 317.5);
  :267  --viz-green:     var(--section-color-4);   → oklch(0.551 0.088 171.1)  (:245)
```

Per css-variables-1 §2.1 the computed value of an unregistered custom property is its specified value with
`var()` substituted — it is **not** converted to a legacy color form — and glass-ui registers no `<color>`
`@property` (`tokens/light-dark.css:52-56` says so in prose: *"glass-ui's only `@property` registrations (§18)"*,
none of them colour). So `getComputedStyle(...).getPropertyValue("--viz-fourier")` yields the string
`"oklch(0.579 0.201 30.4)"`, no regex arm matches, and `VIZ_COLORS.fourier/chebyshev/legendre/green` are all
`#888888`. Only `--viz-amber` survives, and only because `web/src/style.css:120,125` locally re-declares it in
`hsl()`.

**Why this is the CONSUMPTION finding and not a viz finding.** `@mkbabb/value.js@0.13.0` is pinned in
`web/package.json:20` and exists precisely to parse this. The component under audit is the *control case*: it
consumes the same producer ramp through CSS `var()` (`:77`, `:96`, `:112`) and is therefore correct by
construction (S-3). Four lines away, the hand-rolled arm silently greys the product. This is the **cheapest and
sharpest leg of lane-frontend §9 carry 5** ("value.js 0→4 consumer surface is tiny — 5 sites") and it is not on
that list, because the list counted *imports*, not *the parser fourier wrote instead of importing*.

**Severity BLOCKER.** Falsifier: open `/paper` or `/v/:slug`, run
`getComputedStyle(document.documentElement).getPropertyValue("--viz-fourier")` in the console. If it returns
`rgb(...)` or a hex — i.e. if the engine normalises unregistered custom-property computed values — the claim
falls entirely. **UNPROVEN-NEEDS-LIVE for the engine-serialisation half; the four regex arms and the four oklch
token values are source-proven.**

---

### C-B2 — the ToC's active-state model is split across **two producers**, and this component builds a second tree index it then discards

`PaperView.vue:2-11` imports `useTreeIndex` **and** `useSidebarFollow` from `@mkbabb/latex-paper/vue`; it builds
the index at `PaperView.vue:47-48` over a locally re-implemented adapter (`paperTree.ts:4-9`, a byte-for-byte
re-write of latex-paper's own private `paperToTree`, `latex-paper/dist/vue.js:421-426`) and passes
`isActive` / `isInActiveChain` / `treeIndex` down as props (`PaperView.vue:343-345`).

`PaperSidebar.vue:38-45` then calls **glass-ui's** `useSidebarState`, which internally calls **glass-ui's**
`useTreeIndex` over the *same* tree with a *different* children adapter
(`glass-ui/dist/sidebar.js:273` → `u(t.sections, { getChildren: t.getChildren })`), and returns its own
`isActive`, `isInActiveChain`, `treeIndex`, `activeId`, `activeRootId`, `navigateTo`, `scrollToTop`
(`sidebar.js:290-301`).

The template then uses **the props**, never the composable's copies — `isActive(...)` at `:94`, `:95`, `:111`;
`isInActiveChain(...)` at `:94`, `:104`; `activeId`/`activeRootId` at `:76`, `:77`, `:94`; `scrollTo` at `:74`,
`:92`, `:109`; `scrollToTop` at `:58`. Only **2 of the 10** returned members are consumed: `isExpanded` (`:67`)
and `toggleSection` (`:68`, `:74`).

So the paper route runs two independent implementations of one model — latex-paper's owns scroll-follow and
active-chain, glass-ui's owns expand/collapse — over 13 top-level + 51 + 31 nodes, with two adapters and two
full `Map` walks per mount. Both producers export `useTreeIndex` **and** `useSidebarFollow`
(`latex-paper/dist/vue/index.d.ts:3,7` vs `glass-ui/dist/sidebar.js:304`); nothing in the tree picks a winner.

The in-file comment at `:30-37` asserts the glass-ui augmentation is *"symmetric with `useTreeIndex` /
`useScrollTracker`"* — but the `useTreeIndex` actually wired into this subtree is latex-paper's, so the stated
symmetry is with a composable the component does not use.

**Severity BLOCKER** — F.W3 cannot budget a sidebar migration without an owner ruling on which producer owns the
ToC model. Falsifier: show a call site in `web/src/` that consumes `sidebarState.isActive` /
`.isInActiveChain` / `.treeIndex` / `.navigateTo`. `grep -rn "sidebarState\." web/src/` → `:67`, `:68`, `:74`
only (and `MobileFloatingToc.vue`'s own three). None.

---

### C-B3 — the mobile breakpoint mounts **two** `PaperSearch` trees over **one** `PaperSearchState`, hence two `<Teleport to="body">` modals

`PaperSidebar.vue:132-136` (scoped style) sets `.paper-sidebar { display: none }` with a `@media (min-width:
1024px) { display: block }` at `:138-149`. `display:none` is **not** unmounting — `PaperView.vue:335-346` renders
`<PaperSidebar>` unconditionally, while it gates its mobile twin with `v-if="!mobileTocVisible"`
(`PaperView.vue:321-331`). Below 1024 px both are therefore in the component tree, and both mount
`<PaperSearch :search="search">` — `PaperSidebar.vue:51` and `MobileFloatingToc.vue:111` — with the **same**
`PaperSearchState` instance created once at `PaperView.vue` and passed to both.

`PaperSearch.vue:35-37` unconditionally renders `<PaperSearchModal :search="search" />`, and
`PaperSearchModal.vue:41-47` is `<Teleport to="body"> … <div v-if="search.isExpanded.value" class="search-modal-overlay">`.
One shared `isExpanded` ref therefore drives **two** overlays teleported into the same `body`, each with its own
`@click.self="search.toggleExpanded()"` and its own `modalInputRef` focus race (`PaperSearchModal.vue:19-24`).

This is the live counterpart of intake row **R3-11**, which recorded that
`INSTANCE-STATE-REGISTRY.json.teleports` "duplicates `PaperSearchModal`" (same `callsiteId`, same
`PaperSearchModal.vue:41`) and read it as a registry-join defect. **The tree partly vindicates the registry:**
the callsite is one, but the *instance* count at <1024 px is two. The registry's duplicate row is wrong as a
join and accidentally right as a count.

**Severity BLOCKER.** Falsifier: resize to 375 px, scroll until `mobileTocVisible` is false, open search, and
count `document.querySelectorAll(".search-modal-overlay").length`. If it is 1, either `PaperSearch` is
`v-if`-gated somewhere I did not find, or Vue de-duplicates the Teleport — the claim falls.
**UNPROVEN-NEEDS-LIVE for the double render; the mount topology is source-proven.**

---

## §2 · MAJOR

### C-M1 — glass-ui `Button`'s chassis classes survive all three scoped row overrides: every ToC row is `white-space: nowrap` at a fixed `height`

`Button` is a `cva` over reka-ui `Primitive` whose **base** string is
(`glass-ui/dist/button-BNDWhAZb.js:48`):

```
btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium … [&_svg:not([class*=size-])]:size-(--ui-glyph) …
```

with `size` defaulting to `"default"` → `h-(--control-h-md) px-4 py-2` (`:64`, `:75`), and
`--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`
(`glass-ui/dist/styles/tokens/offsets-sizing.css:151`), where `--control-floor` rises to
`var(--touch-target, 2.75rem)` on coarse pointers (`tokens/light-dark.css:20`).

The three row classes neutralise **padding** (`:226`), **colour** (`:228`), **radius** (`:227`),
**display/width/text-align** (`:217-219`) and **line-height** (`:225`) — and declare **no `white-space` and no
`height`**: `grep -n "white-space" PaperSidebar.vue` → *(empty)*; no `height` outside `.sidebar-top-btn` (`:191`).
`cn()` is `twMerge(clsx(...))` (`button-BNDWhAZb.js:1`), and `sidebar-link` / `cm-serif` are not Tailwind
classes, so tailwind-merge strips nothing. Both producer declarations therefore win by default (nothing
competes) and by specificity for `h-…` (`.h-\(--control-h-md\)` (0,1,0) is uncontested).

Consequences: (a) `\chapter{Eigentheory Applied: SVD, PCA, and Compression}` and
`\section{Complex Analysis of Orthogonal Polynomials and Green's Functions}` (`paper/fourier_paper.tex:2803`,
`:2187`) cannot wrap; (b) `.sidebar-nav` declares `overflow-y: auto` (`:155`) and `overscroll-behavior-x:
contain` (`:157`) but **no `overflow-x`**, and `overflow-y: auto` + `overflow-x: visible` computes to
`overflow-x: auto` — the ToC gains a horizontal scrollbar; (c) `.sidebar-subsublink { font-size: 0.72rem;
padding: 0.15rem 0.32rem }` (`:279-282`) buys nothing, because the row is still exactly `--control-h-md`
(40 px, 44 px on touch) tall. The author's intent is legible in `line-height: 1.35` (`:225`) +
`display: block` + `text-align: left` (`:217`, `:219`) — a wrapping row.

**Severity MAJOR.** Falsifier: render at ≥1024 px and read
`getComputedStyle($('.sidebar-link')).whiteSpace` / `.height`. If `whiteSpace === "normal"` or `height` is
content-derived, some rule I did not find (a global `@layer`, a producer 3.1→4.0 delta) wins and the claim falls.
**UNPROVEN-NEEDS-LIVE for the overflow; the class conflict is source-proven.**

### C-M2 — the disclosure has no `CollapsibleTrigger`: no `aria-expanded`, no `aria-controls`, and `@update:open` is unreachable

`:66-69` mounts `<Collapsible :open @update:open>`; `:71-81` puts a bare `<Button>` inside it; `:85` mounts
`<CollapsibleContent>`. `CollapsibleTrigger` — which glass-ui exports from the very subpath imported at `:7`
(`glass-ui/dist/collapsible.js:2`), and which the sibling `components/ui/CollapsibleSection.vue:2` does import —
is absent. Two consequences:

1. **a11y contract.** reka-ui's trigger is what emits `aria-expanded`, `aria-controls` and `data-state` onto the
   control. Without it the toggling control announces nothing; the `<nav aria-label="Table of contents">`
   (`:50`) is a tree of buttons with no expanded state. `axe` is in devDeps (`package.json:35`) but
   `e2e/` has no accessibility spec for `/paper` (`ls e2e/` — 8 specs, none a11y; `paper-performance.spec.ts` is
   the only paper spec).
2. **dead-or-double.** `Collapsible` forwards `update:open` to reka-ui `CollapsibleRoot`
   (`CollapsibleContent-C_s6fG7r.js:17-19` `useForwardPropsEmits`). With `open` bound (`:67`) the root is
   *controlled*, so it emits `update:open` only from an internal trigger — of which there is none. **Today
   `:68` is dead code.** The moment anyone adds the `CollapsibleTrigger` that fixes (1), `:68` and `:74` both
   fire and every section toggles twice, i.e. never opens.

**Severity MAJOR.** Falsifier: instrument `:68` and click a chapter. If it logs, the handler is live and the
finding upgrades to a present double-toggle rather than a latent one.

### C-M3 — the click contract conflates *navigate* and *toggle*; the e2e suite carries a 50-line workaround as the receipt

`:74` — `@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"`. One activation performs two
unrelated jobs, and the toggle is a **flip**, not an open. The in-tree receipt is
`web/e2e/paper-performance.spec.ts:74-135`, whose own comments name the defect:

> `:118-120` *"Only OPEN closed sections — `toggleSection` flips state, so clicking an already-open chapter would
> collapse it (churning the tree across the serial tests). Expand-if-closed is idempotent."*
> `:78-82` *"…renders a section's sub-entries inside a `CollapsibleContent` that is NOT mounted while the parent
> top-level section is collapsed — and 3rd-level `subsub` entries only mount when their branch is the active
> chain."*

A test harness that must dynamically discover and expand ancestors, and must reason about flip-vs-open, is a
direct measurement of a leaking component contract. Sub-rows have the clean contract (`:92`, `:109` —
`scrollTo` only); only the top level is conflated.

**Severity MAJOR.** Falsifier: show a product requirement that a chapter's ToC row must collapse the chapter when
the reader is already inside it. `DESIGN.md` and `docs/tranches/M/M.md` carry no such row.

### C-M4 — the e2e "expand-if-closed" guard reads the **Tooltip's** `data-state`, not the Collapsible's, so it is a no-op

`paper-performance.spec.ts:105-108` does
`const collapsible = element.closest("[data-state]"); if (collapsible?.getAttribute("data-state") !== "open") element.click();`
where `element` is the `[data-toc-id]` button. That button is wrapped by
`Tooltip` → `TooltipTrigger as-child` (`ui/tooltip/Tooltip.vue:27-29`), and reka-ui's `TooltipTrigger` writes
`data-state` **onto the trigger element itself** (`reka-ui/dist/Tooltip/TooltipTrigger.js` →
`"data-state": unref(rootContext).stateAttribute.value`, whose domain is `closed | delayed-open |
instant-open` — never `"open"`).

`closest()` therefore matches the button, reads the tooltip state, and the `!== "open"` test is **always true** —
the guard clicks unconditionally and produces exactly the serial-test churn its comment says it prevents. This
is a structural consequence of stacking a `TooltipTrigger as-child` and a would-be collapsible trigger on one
element; it is a *consumption* defect, not a test defect.

**Severity MAJOR.** Falsifier: inspect a rendered `[data-toc-id]` button. If it carries no `data-state`
attribute (e.g. glass-ui's `TooltipTrigger` strips it), `closest()` walks up to `CollapsibleRoot` and the guard
works — the claim falls.

### C-M5 — the `--section-color-N` ramp is consumed at exactly 13/13 with no fallback, and one stop is locally re-declared with app-wide blast radius

`:77`, `:96`, `:112` interpolate `var(--section-color-${si})` where `si` is the **unbounded** `v-for` index
bound at `:65`. The producer ramp is finite — `--section-color-0 … --section-color-12`, exactly 13 stops
(`glass-ui/dist/styles/tokens/color-radius.css:241-253`) — and the producer's own consumer uses a fallback:
`glass-ui/dist/IconChip-BDw1j5mu.js:28` → `` `var(--section-color-${h.section}, var(--muted-foreground))` ``.
Fourier omits the fallback at all three sites. Beyond index 12 the declaration is invalid at computed-value time
and, `color` being inherited, the row silently falls back to the *inherited* colour — not even to
`.sidebar-link { color: var(--muted-foreground) }` (`:228`).

**The document already occupies 13 of the 13 stops.** Deriving top-level count from the source:
`paper/fourier_paper.tex` has 11 `^\chapter{` and 0 `^\part{`; `\section{Introduction}` at `:93` precedes the
first `\chapter{}` at `:118`, and latex-paper hoists a level-1 heading with no level-0 parent to top level
(`latex-paper/dist/chunk-A7GY23HR.js:814-816` — `if (!parent || range.level === 1 && !levelParents.has(0))
topLevel.push(section)`); `\bibliography{fourier_paper}` at `:3119` inserts a further **top-level** node
(`chunk-A7GY23HR.js:760-766` — `topLevel.push(bibliography)`), gated on a non-empty bibliography, and
`paper/fourier_paper.bbl` carries **34** `\bibitem`. → 1 orphan + 11 chapters + 1 bibliography = **13**.
The next chapter added to the paper is index 13 and loses its colour, silently.

Second half of the defect: `web/src/style.css:119-127` re-declares `--section-color-5` in both `:root` and
`.dark`. Its stated intent (`:113-118`) is the `--viz-amber` WCAG darken — but glass-ui already aliases
`--viz-amber: var(--section-color-5)` (`color-radius.css:266`), so overriding `--viz-amber` alone sufficed.
Overriding the **ramp stop** re-tints every `--section-color-5` consumer app-wide — chapter #6 of this ToC, and
any glass-ui `IconChip section="5"`. It also makes stop 5 the *only* theme-varying stop: the producer declares
the ramp once, with no `.dark` re-declaration (`grep -n "section-color" color-radius.css` → 13 hits, one block).
The other 12 stops are light-calibrated (L 0.484–0.623) and are applied unchanged over a dark `--card`
(`.sidebar-nav { background: var(--card) }`, `:164`) in dark mode.

**Severity MAJOR.** Falsifier for the exact-13: run `npm run build` and log `paperSections.length`. If it is
< 13 the *saturation* weakens; the missing-fallback and the ramp-override blast radius stand regardless.
**UNPROVEN-NEEDS-LIVE for the dark-mode contrast ratio of stops 0–4 and 6–12.**

### C-M6 — the props contract: 11 props, 6 of them functions, 0 emits, 7 duplicating the composable, and one dead `any`

`:13-25`. Specifics:

- **`treeIndex: Map<string, any>` (`:20`) is passed and never read.** `grep -n "treeIndex" PaperSidebar.vue` →
  `:20` only. It is also the file's sole `any`, and it *widens* a type the caller already has precisely:
  `PaperView.vue:48` destructures `index` from latex-paper's `useTreeIndex`, typed
  `Map<string, TreeIndexEntry>` (`latex-paper/dist/vue/tracking/useTreeIndex.d.ts`). A dead prop that discards a
  producer type.
- **6 function props** — `scrollTo`, `scrollToTop`, `renderTitle`, `isActive`, `isInActiveChain`, `getPreview`
  (`:17-19`, `:21-23`). `scrollTo`/`scrollToTop` are events wearing prop clothing; `defineEmits` is absent from
  the file entirely.
- **7 of 11 props are re-derived internally** — `sections`, `activeId`, `activeRootId`, `scrollTo`,
  `scrollToTop`, `isActive`, `isInActiveChain` all exist on `sidebarState` (`glass-ui/dist/sidebar.js:290-301`)
  and are ignored (C-B2).
- **`search: PaperSearchState` (`:24`) is a pure pass-through of a 10-member mutable state bag** —
  `usePaperSearch.ts:94-108` returns 5 refs + `close`/`open`/`toggleExpanded`/`onKeydown`/`selectResult`; the
  only use in this file is forwarding at `:51`. A leaf component holds the whole search API's mutators.

**Severity MAJOR.** Falsifier: any read of `treeIndex` or of a `sidebarState` member other than
`isExpanded`/`toggleSection` in this file. There is none.

### C-M7 — `.sidebar-top-btn` shrinks a producer control to 20 × 20 px, defeating glass-ui's touch-target floor and WCAG 2.5.8

`:54-62` mounts `<Button variant="ghost" size="icon">`, whose producer geometry is
`h-(--control-h-md) w-(--control-h-md)` (`button-BNDWhAZb.js:70`) — deliberately floored at
`var(--touch-target, 2.75rem)` on coarse pointers (`tokens/light-dark.css:20`). The scoped rule at `:190-191`
overrides both to `1.25rem` (20 px), winning by specificity (`.sidebar-top-btn[data-v-…]` (0,2,0) vs `.w-…`
(0,1,0)). 20 px is below the WCAG 2.2 SC 2.5.8 *Target Size (Minimum)* 24 × 24 CSS-px threshold, and the sidebar
is visible at ≥1024 px — which includes coarse-pointer tablets in landscape.

Compounding: `<ChevronUp class="h-3 w-3" />` (`:61`) is inert — the producer base carries
`[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`button-BNDWhAZb.js:48`), which compiles to a
`(0,2,0)` descendant rule and beats `.h-3` `(0,1,0)`. The glyph renders at
`--ui-glyph = calc(1rem * var(--ui-scale))` = 16 px inside an 18 px content box (20 px minus the 1 px border at
`:193`), not the 12 px the class requests. The escape hatch the producer built in is a class *containing*
`size-` — i.e. `size-3`. The repo is split on the idiom: `grep -rn 'class="h-3 w-3"\|class="h-4 w-4"' src/` → 15,
`grep -rn 'size-3\|size-4' src/` → 5.

**Severity MAJOR.** Falsifier: measure the rendered button's box and the SVG's box. If `width === 20 && svg
width === 12`, the producer rule loses (e.g. a `@layer` ordering I did not model) and the icon half falls; the
target-size half stands either way.

---

## §3 · MINOR

| id | claim | provenance | falsifier |
|---|---|---|---|
| C-m1 | **`is-active-sub` is bound but defined nowhere.** The "subsection is in the active chain" state has **zero** visual effect; only exact-`isActive` gets an inline style (`:95-97`). | bound at `:94`; `grep -rn "is-active-sub" web/src/` → that one line, nothing else. Scoped block defines `.sidebar-link.is-active` (`:240-243`) only; `style.css:136-142` adds only `:focus-visible`. | show a rule matching `.is-active-sub` anywhere in `web/src/` or the glass-ui dist. |
| C-m2 | **Icon sizing idiom is wrong for this producer** (`h-3 w-3` inert, `size-3` is the opt-out). | `:61`; `button-BNDWhAZb.js:48`. | see C-M7. |
| C-m3 | **Level-3 rows are affordance-asymmetric**: `<Tooltip :text="getPreview(...)">` wraps levels 1 and 2 (`:70`, `:88`) but **not** level 3 (`:106-117`), which also has no `:class` binding — inline style only. | `:70`, `:88` vs `:106`. `getPreview` accepts any `PaperSectionData`, so the omission is not a type constraint. | a design note requiring previews to stop at depth 2. None found in `DESIGN.md`. |
| C-m4 | **Native `title="Scroll to top"`** (`:59`) in a file that mounts the glass-ui-backed `Tooltip` twice — two tooltip mechanisms, different delay/placement/theming. | `:59` vs `:70`, `:88`; `ui/tooltip/Tooltip.vue:30-34` sets `side-offset` 6 / `collision-padding` 8. | intentional — `title` survives when JS fails. Weak but real. |
| C-m5 | **Inline style literals duplicate the stylesheet.** `background: 'color-mix(in srgb, var(--muted) 40%, transparent)'` and `fontWeight: '600'` are written twice in the template (`:96`, `:112`) while `.sidebar-link.is-active` (`:240-243`) already owns weight, and `.sidebar-link:hover` (`:235-238`) already owns a `color-mix` background at 50 %. A fresh object literal is allocated per row per render. | `:96`, `:112` vs `:235-243`. | none — this is a design-system-bypass judgement, cf. `feedback_root_styling`. |
| C-m6 | **Uncached producer functions invoked in the render path.** `getPreview` (`paperTree.ts:11-21` — `.find()` + 2 regex + slice + join, no memo) and `renderTitle` (`latex-paper/dist/vue.js:3-8` — an unmemoised `.replace` closure; only the inner `renderInline` has a cache at `vue.js:390-402`) run once per mounted row per render, and the sidebar re-renders on every `activeId` tick from the scroll tracker. | `:70`, `:80`, `:88`, `:100`, `:116`. Mounted rows ≈ 13 + the active chapter's sections ≈ 20. | profile it. At ~20 rows this is cheap; the finding is the *shape* (uncached call in render), not a measured cost. **UNPROVEN-NEEDS-LIVE.** |
| C-m7 | **`sections` is handed to `useSidebarState` non-reactively** (`:39` — a raw array) while `activeId`/`activeRootId` are handed as getters (`:40-41`). glass-ui's `useTreeIndex` builds its `Map` eagerly and never watches (`sidebar.js:211-227`), so the internal index cannot rebuild. Benign only because `paperSections` is a build-time constant (`lib/paperContent.ts:7`, `virtual:paper-content`). | `:39` vs `:40-41`; `sidebar.js:273`. | make `paperSections` dynamic (hot-reload of the `.tex`) and watch the expand state desync. |
| C-m8 | **`.sidebar-sublist-wrapper { overflow: hidden }`** (`:258-260`) re-declares what the producer already ships — `CollapsibleContent` hard-codes `class="overflow-hidden transition-collapse …"` (`CollapsibleContent-C_s6fG7r.js:56`). | both cited. | none; harmless duplication, but it is a consumer restating a producer invariant. |
| C-m9 | **`lucide-vue-next` is imported at runtime but declared in `devDependencies`** (`web/package.json:44`), alongside `reka-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` — all runtime-reachable through glass-ui's own peer set (`glass-ui/package.json.peerDependencies`). `web/Dockerfile:11` runs a full `npm ci`, so the build survives; any `npm ci --omit=dev` breaks it. Also the 7.0.0 rename target (`@lucide/vue ^1.16.0` in producer peers) — this file is 1 of the 35 sites in lane-frontend §5. | `:9`; `web/package.json:32-47`; `web/Dockerfile:11`. | show a prod install path that omits devDeps. Today there is none — hence MINOR, not BLOCKER. |
| C-m10 | **Three unsanitised `v-html` sinks** over parser output (`:80`, `:100`, `:116`), rendering `renderTitle(...)` = a regex-spliced `<span class="math-inline">` + raw KaTeX HTML. Provenance is a build-time `.tex` under `paper/`, so this is trusted-author content today; the sink is unconditional and would carry any future runtime-sourced title. | `:80`, `:100`, `:116`; `latex-paper/dist/vue.js:3-8`. | show a runtime path that can inject a section title. There is none at HEAD — hence MINOR. |

---

## §4 · SUPERLATIVES (L-18, verified against the same falsifier standard)

**S-1 — a ZERO-break glass-ui surface across the 4.0.0 → 7.0.0 uplift.** All three subpaths imported here —
`./button` (`:6`), `./collapsible` (`:7`), `./sidebar` (`:8`) — exist in producer 7.0.0's export map
(`node -e` over `/Users/mkbabb/Programming/glass-ui/package.json` → `sidebar: true button: true collapsible:
true`), and none appears in lane-frontend §5's 21-subpath REMOVED list. Against lane-frontend §9 carry 4
("11 removed-subpath import sites"), **`PaperSidebar.vue` contributes zero of them.** Its only uplift cost is the
`lucide-vue-next → @lucide/vue` rename (C-m9). Falsifier: name a removed subpath or a removed member (`MetricBadge`,
`HoverPopover`, `HoverCard`, `DockIconButton`, `DockDropdownTrigger`, `ToastVariant`) used in this file. None is.

**S-2 — the `getChildren` claim in the comment is TRUE at the pinned dist.** `:34-37` asserts glass-ui's
composable was augmented to accept a children-key override. Verified byte-level in the **installed 4.0.0**:
`glass-ui/dist/sidebar.js:273` → `u(t.sections, { getChildren: t.getChildren })`, and `useTreeIndex` itself
defaults `t?.getChildren ?? (e => e.children)` at `:212`. The `PaperSectionData`/`children` impedance mismatch is
resolved by a producer-side parameter rather than a local fork. I opened this expecting a stale comment claiming
an unshipped augmentation; the tree refuted me.

**S-3 — the correct colour-token posture, and the control case that exposes C-B1.** This component reads
`--section-color-N` through CSS `var()` (`:77`, `:96`, `:112`), which resolves oklch natively, instead of routing
it through `lib/colors.ts`'s four-arm string parser. It is the only place in the paper subtree that consumes a
producer colour token without a hand-rolled parser in the way — and it is what makes the `colors.ts` blindness
legible as a defect rather than a design choice.

**S-4 — the retired hand-rolled collapse shim was a real simplification, and the replacement claim holds.**
`:255-257` records that a `grid-template-rows: 0fr → 1fr` shim was replaced by producer motion. Verified end to
end: `CollapsibleContent` ships
`data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down`
(`CollapsibleContent-C_s6fG7r.js:56`); `tw-animate-css` (a real dependency at `package.json:24`) defines
`@keyframes collapsible-down/up` over `var(--reka-collapsible-content-height, …)`; glass-ui's
`styles/animations.css:24,31` carries the same variable. Falsifier: remove `@import "tw-animate-css"`
(`style.css:2`) and the animation dies — which is exactly the coupling the comment claims.

**S-5 — the R5-7 / R6-5 native-loop coordinate reproduces exactly, today.** `grep -n "v-for"
web/src/components/paper/PaperSidebar.vue` → **65, 87, 105**, with expressions `(section, si) in sections` /
`sub in section.subsections` / `subsub in sub.subsections` — line-for-line the rows adjudicated TRUE in
`intakes/lane-fourier-r3-r6.md` §4 R6-5 and §3 R5-7, and byte-identical to what the R6 gate
(`NATIVE-LOOP-GATE-VERDICT.json`, `baselinePaperRowCount: 3`) authenticated. The file has not moved.

---

## §5 · Corpus reconciliation — where this lane AGREES, EXTENDS, or CONTRADICTS

| corpus row | disposition here |
|---|---|
| **R3-7a** (35 Tooltip callsites / 9 consumers; `PaperSidebar` = 2) | **AGREE, exactly.** `grep -c "<Tooltip" PaperSidebar.vue` → 2 (`:70`, `:88`). **EXTEND:** the *callsite* count is 2 but the *instance* count is ~20 (one `TooltipRoot` per mounted row), and level 3 has none (C-m3). F.W3's migration budget should carry the callsite figure; any runtime/DOM budget must not. |
| **R5-7 / R6-5** (native `<li v-for>` at 65/87/105) | **AGREE, reproduced exactly** (S-5). |
| **R6-8** (operation ↔ client leaf coupling) | **NOT REACHABLE — receipted.** `grep -n "lib/api\|stores/\|fetch(" PaperSidebar.vue` → *(empty)*. This component consumes 0 of the 45 operations; all of its data is build-time (`lib/paperContent.ts:7` → `virtual:paper-content`). The F.W5 seam does not pass through here. Stating this positively matters: a per-component audit that reports "no API findings" without the probe is indistinguishable from one that did not look. |
| **lane-frontend §2** ("`PaperSidebar.vue` 283 — Desktop ToC sidebar (`useSidebarState` + `Collapsible`)") | **AGREE on the shape, CONTRADICT on completeness.** The census read the composable adoption as the whole story; it is 2 of 10 members, over a model the parent sources from a *different producer* (C-B2). |
| **lane-frontend §3** ("the cleanest glass-ui consumer posture in the constellation… deep and idiomatic") | **PARTIALLY CONTRADICT.** True at the *import* layer (S-1 is evidence for it). False at the *contract* layer: this file overrides the `Button` chassis with 12 scoped declarations (C-M1, C-M7), drops the primitive that carries the a11y contract (C-M2), and hand-rolls the trigger. Importing a design system idiomatically is not the same as consuming its contracts. |
| **lane-frontend §9 carry 5** ("value.js 0.13 → 4.0 consumer surface is tiny — 5 sites, `easeInOutSine` + `timingFunctions`") | **CONTRADICT / EXTEND.** The surface measured by import count is 5 sites. The surface measured by *what value.js exists to do* includes `lib/colors.ts:22-54` — a 33-line hand-rolled colour parser that cannot read the producer's own tokens (C-B1). The value.js leg of the tri-package deadlock is cheaper *and* more valuable than the census scored it. |
| **census §6.7 / intake §0** ("measurements enter the substrate; the authority does not") | **CONFIRMED in the small.** Two Codex coordinates (R5-7's blind loop leaf, R3-11's duplicated Teleport row) were re-derived here from the live tree, and one of them — R3-11 — turns out to describe a real runtime duplication the registry got right for the wrong reason (C-B3). |

---

## §6 · Method, limits, and what would falsify this lane wholesale

- **Read-only.** `/Users/mkbabb/Programming/fourier-analysis` was never written. The single write of this lane is
  this file. No product source in any repo was touched; `scripts/dev/dev.sh` untouched.
- **Probes:** `cat` / `sed` / `grep` / `find` / `wc` / `node -e` over `package.json` export maps, across
  `web/src/`, `web/e2e/`, `paper/fourier_paper.{tex,bbl}`, and the **installed** `web/node_modules/@mkbabb/{glass-ui,
  latex-paper}` dists + `node_modules/reka-ui` + `node_modules/tw-animate-css`. Producer `glass-ui` 7.0.0 was read
  only for its export map.
- **The pinned-dist rule.** Every producer claim is against the **installed** `4.0.0`, not the producer working
  tree — `node -e` on `web/node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`. Where a 7.0.0 fact is used it is
  labelled as such (S-1, C-m9).
- **Wholesale falsifier.** This lane's spine is that `PaperSidebar.vue` executes against glass-ui **4.0.0** while
  having been authored against **3.1.0** (it is clean at HEAD; `web/package.json` is dirty). If the 3.1.0 `Button`
  cva already carried `whitespace-nowrap` + `h-(--control-h-md)`, C-M1/C-M7 are long-standing rather than
  bump-induced — the defects stand, the *provenance* narrative does not. I could not check 3.1.0: it is not
  installed and the producer tree is at 7.0.0.
- **UNPROVEN-NEEDS-LIVE (SS-13) inventory** — C-B1 (custom-property computed-value serialisation),
  C-B3 (double modal render), C-M1 (overflow), C-M5 (dark-mode contrast of stops 0–4, 6–12), C-m6 (render cost).
  Everything else is source-proven at the cited lines.
