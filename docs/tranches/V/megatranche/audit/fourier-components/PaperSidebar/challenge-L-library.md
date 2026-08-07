claude-opus-5[1m] (served model id)

# CHALLENGE — `PaperSidebar.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/paper/PaperSidebar.vue`
(283 lines — script `:1-46` · template `:48-128` · style `:130-283`). Desktop `/paper`
table-of-contents.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every row below carries a severity, a
`file:line` provenance, and the falsifier that would kill it. **§5 lists five candidate defects that
their own falsifiers killed** — L-18 runs both ways, and so does the discipline.

**Method / limits.** Static + source-derived only. No browser tooling. Read whole: the component,
all eight of its imports, their transitive impls in `web/node_modules/@mkbabb/{glass-ui,latex-paper}`
+ `reka-ui`, the parent (`PaperView.vue`), the sibling (`MobileFloatingToc.vue`), the search stack,
and `web/e2e/paper-performance.spec.ts`. Two claims required knowing the *real* shape of
`paperSections` (a `virtual:paper-content` build artifact); I re-derived it read-only by running
`latex-paper`'s own `Transformer` over `paper/fourier_paper.{tex,log,aux,toc,bbl}` in a scratchpad
script — **13 roots · 51 subsections · 34 sub-subsections · 98 nodes**. That figure is load-bearing
for L-7 and L-10 and is stated wherever used. Claims that need a live page are marked
**UNPROVEN-NEEDS-LIVE (SS-13)**.

**Tally. 15 defects · 0 BLOCKERS · 5 superlatives.** (MAJOR ×5 · MINOR ×5 · INFO ×5.)

**No BLOCKER, stated affirmatively.** Nothing in this file crashes, leaks, or fails typecheck. It
registers zero listeners, timers, observers or rAFs (S-1), its `any` is inert because the prop
carrying it is never read (L-3), and its worst behaviour is a wrong-but-recoverable interaction
(L-1). The component is *mediocre*, not *broken* — which is the finding.

---

## §0 — Fold of the hitherto corpus (what I inherit, and what I add)

| corpus row | what it says about this file | this challenge |
|---|---|---|
| **R5-7** (intake `lane-fourier-r3-r6.md:125`) — ADOPT-AS-FACT + CARRY→F.W4 | "template-loop evidence keyed to *component* callsites is blind to native HTML element loops … `PaperSidebar.vue` renders the entire paper ToC through three nested native `<li v-for>` loops (live 65, 87, 105), so any instance denominator built on component callsites drops the whole sidebar subtree" | **Confirmed line-for-line and EXTENDED with the multiplier — see §2.** |
| **R6-5** (`:139`) — ADOPT-AS-FACT | R6 cured the leaf with a `NATIVE_TEMPLATE_LOOP` family: 3 rows at 65/87/105, expressions `(section, si) in sections` / `sub in section.subsections` / `subsub in sub.subsections` | Live tree agrees exactly (I re-read 65/87/105). **But 3 loop *rows* is not an instance denominator — §2.** |
| **R3-7a** (`:79`) — CARRY→F.W3 | "PaperSidebar 2" of the 35 Tooltip callsites over 9 consumers | Confirmed: `:70` and `:88`. **The absence of a third is itself a defect — L-8.** |
| **CENSUS §3a / lane-frontend §6** (`lane-frontend.md:512-566`) | "Canvas2D throughout, **WebGL/WebGPU ABSENT**"; three canvases — `BasisCanvas` (store rAF, off-screen gated), `ConvergencePlot` (own ungated rAF), `FrequencyGraph` (watch-driven) — + 12 SVG surfaces | **PaperSidebar touches none of them.** Its render-path contact is the *scroll* path, not the canvas path — and there it contributes a **third ungated clock** the inventory misses. See §1 L-11. |
| **lane-frontend §8** (`:624`) | "⚠️ COVERAGE GAP (flag): the two ungated animation clocks are `stores/animation.ts` and `ConvergencePlot.vue`"; `:617` books `PaperView.vue:176` as the one JS PRM gate | **Contradicted as incomplete — there is a third: L-11.** |
| **lane-frontend `:156`** | `PaperSidebar.vue` · 283 · "Desktop ToC sidebar (`useSidebarState` + `Collapsible`)" | Size confirmed (`wc -l` → 283). Goldilocks-correct — S-4. The `+ Collapsible` half of that description is where the rot is (L-5). |
| **lane-frontend `:70`** | reka-ui has 0 direct imports; the 6 mentions are prose, incl. `PaperSidebar.vue:256` | Confirmed — `:255-257` is the W3.5.c comment. No direct reka import here. Clean. |

**Nothing in the corpus is contradicted on fact.** One row is contradicted on *completeness*
(lane-frontend §8's two-clock inventory, L-11), and one Codex measurement is extended rather than
disputed (R5-7's blind spot, quantified in §2).

---

## §1 — Defects

### L-1 · **MAJOR** — clicking the section you are reading collapses it, and silently breaks sidebar-follow

`PaperSidebar.vue:74`

```
@click="scrollTo(section.id); sidebarState.toggleSection(section.id)"
```

The root row's click handler couples *navigation* with *disclosure toggle*. Trace it against the
composable (`glass-ui/src/composables/sidebar/useSidebarState.ts:71-85`):

```
isExpanded(id)  → userCollapsed.has(id) ? false
                : userExpanded.has(id)  ? true
                : toValue(activeRootId) === id       ← the default rule
toggleSection(id) → isExpanded(id) ? userCollapsed.add(id) : userExpanded.add(id)
```

You are reading chapter **C**, so `activeRootId === C`, so `isExpanded(C)` is `true` by the default
rule with no user override. You click C's title to jump to its start. `toggleSection(C)` sees
`true` and writes `userCollapsed.add(C)`. **The chapter you are in collapses on the click that was
meant to navigate into it** — and `userCollapsed` is sticky, so the default-expand rule can never
re-open it. Every subsequent scroll through C's subsections leaves the ToC showing a closed chapter.

Second-order, and worse: `CollapsibleContent` unmounts its slot when closed (reka
`CollapsibleRoot.js:26-30`, `unmountOnHide` default `true`; `CollapsibleContent.js:90`). So C's
subsection rows leave the DOM. `useSidebarFollow` locates its scroll target purely by DOM query —
`latex-paper/dist/vue.js:518-520`, `nav.querySelector('[data-toc-id="…"]')` — and bails at `:566`
when it finds nothing. **The sidebar stops following the reader**, with no error, for the rest of
the session.

*Provenance:* `PaperSidebar.vue:74` · `useSidebarState.ts:71-85` · `reka-ui/dist/Collapsible/CollapsibleRoot.js:26-30` · `latex-paper/dist/vue.js:518-520,562-566`.

*Corroboration from the repo's own test suite* — `web/e2e/paper-performance.spec.ts:117-120`:

> `// Only OPEN closed sections — 'toggleSection' flips state, so clicking an already-open chapter would collapse it (churning the tree across the serial tests). Expand-if-closed is idempotent.`

The e2e author hit exactly this and worked around it rather than filing it.

*Falsifier:* the row dies if `isExpanded(section.id)` were false at click time for the active root.
It is not: with no user override the composable returns `activeRootId === sectionId` verbatim
(`useSidebarState.ts:75`), and `activeRootId` is precisely the scroll-tracker's answer to "which
chapter is on screen" (`PaperView.vue:68-90`, `useVirtualSectionWindow`, `activeRootId` at `:75`).
The only way to falsify is
for the reader to click a chapter they are *not* in — which is the other half of the ToC's job, not
a refutation of this half. **Survives.**

*Sibling contrast (this is a divergence, not a house style):* `MobileFloatingToc.vue:155` binds the
same composable's root row to `@click="sidebarState.toggleSection(section.id)"` — toggle only, never
navigate. Two ToC surfaces, one composable, two incompatible interaction contracts.

---

### L-2 · **MAJOR** — an unconditionally-mounted search stack yields two teleported modals and a cross-instance `document.querySelector`

`PaperSidebar.vue:51` mounts the full search stack — `<PaperSearch :search="search" variant="sidebar" />` —
inside the `<nav>` (`:50`), with no viewport gate. `PaperSidebar.vue:132-136` then hides the whole
component with **CSS only**:

```
.paper-sidebar { … display: none; }      /* < 1024px; re-shown only at :138 @media (min-width:1024px) */
```

and `PaperView.vue:335-347` mounts `<PaperSidebar>` with no `v-if`. So below 1024px the sidebar's
`PaperSearch` — input + dropdown + **`PaperSearchModal`** — is fully instantiated.

`PaperSearchModal.vue:40-42` is `<Teleport to="body">` + `v-if="search.isExpanded.value"`. **The
teleport moves the modal out of the `display:none` subtree**, so the invisible sidebar's modal is
visible. Meanwhile `MobileFloatingToc.vue:111` mounts a *second* `PaperSearch` (`variant="floating"`)
on the *same shared* `PaperSearchState` — one `usePaperSearch(...)` object created once at
`PaperView.vue:111` and prop-drilled to both. Two `PaperSearchModal` instances, one predicate.

Three concrete consequences, all static-certain:

1. **Duplicate overlay.** Both modals satisfy `v-if="search.isExpanded.value"` simultaneously; both
   render `.search-modal-overlay` at `z-index: var(--z-modal)` into `body`.
2. **Wrong-instance DOM write.** `PaperSearchModal.vue:31` scrolls the selection into view via
   `document.querySelector(".search-modal-results")` — a **document-global** query. Instance B's
   watcher resolves instance A's element. The keyboard-navigated selection scrolls the wrong list.
3. **Focus race.** `PaperSearchInput.vue:19-25` auto-focuses on the shared `search.isOpen`; every
   mounted input fires `inputRef.value?.focus()` in the same `nextTick`. Last-mounted wins; the
   `display:none` one is a no-op that still runs.

*Reachability (below 1024px):* scroll until the inline mobile ToC leaves the viewport →
`PaperView.vue:319` mounts `MobileFloatingToc` (`v-if="!mobileTocVisible"`) → tap its search icon
(`MobileFloatingToc.vue:123` → `openMobileSearch()` at `:86-91`, sets `searchActive` and
`search.open()`) → type → tap expand (`PaperSearchInput.vue:47-55` emits `expand` →
`search.toggleExpanded()`). `isExpanded` flips; both modals mount.

*Provenance:* `PaperSidebar.vue:51,132-136` · `PaperView.vue:111,319,335-347` · `PaperSearch.vue:22-39` (Input `:24`, Dropdown `:31`, Modal `:35`) · `PaperSearchModal.vue:26-36,40-42` · `PaperSearchInput.vue:19-25` · `MobileFloatingToc.vue:86-91,111,123`.

*Falsifier:* dies if the two `PaperSearch` instances can never coexist. They can — the sidebar's is
unconditional, the floating one is `v-if="searchActive"` inside a component that is itself mounted
whenever the inline ToC is off-screen, and `searchActive` is set by a control that is only reachable
*below* 1024px, i.e. exactly where the sidebar is invisible-but-mounted. Also dies if the modal
weren't teleported — it is (`:40`). **Survives.** The *visual* stacking of the two overlays is
**UNPROVEN-NEEDS-LIVE (SS-13)**; the double instantiation and the global `querySelector` are not.

*Root cause attributable to this component:* a component that renders nothing below 1024px should
not be the mount point for a document-global, teleporting modal.

---

### L-3 · **MAJOR** — `treeIndex: Map<string, any>` is a dead prop, and the file's only `any`

`PaperSidebar.vue:20`

```
treeIndex: Map<string, any>;
```

Declared in `defineProps`, supplied by the parent (`PaperView.vue:343` `:tree-index="treeIndex"`),
and **never read** — not in the script, not in the template. `grep -n treeIndex PaperSidebar.vue`
returns exactly one hit: the declaration.

Two defects in one line. It is dead surface that the parent pays to compute and pass. And its
element type is `any` — the *only* `any` in the file — so the prop contract is unchecked in both
directions: `PaperView` could hand it a `Map<string, number>` and nothing would complain. The real
type exists and is exported: `TreeIndexEntry<T>` (`glass-ui/dist/composables/sidebar/index.d.ts:7`).

*Falsifier:* dies if any usage exists. None does. **Survives.**

---

### L-4 · **MAJOR** — three parallel derivations of one 98-node tree, from two packages, in one render path

The `/paper` ToC builds the same index three times:

| # | site | what it builds |
|---|---|---|
| 1 | `paperTree.ts:4-9` `paperSectionToTreeNode`, called at `PaperView.vue:47` | 98 fresh `TreeNode` objects whose sole purpose is renaming `subsections` → `children` |
| 2 | `PaperView.vue:48` `useTreeIndex(treeNodes)` (**latex-paper**) | a 98-entry `Map` + `isActive` / `isInActiveChain` |
| 3 | `PaperSidebar.vue:38-45` `useSidebarState<PaperSectionData>({… getChildren: n => n.subsections})` (**glass-ui**) | internally calls glass-ui `useTreeIndex` → a **second** 98-entry `Map` + a second `isActive` / `isInActiveChain` |

The two `useTreeIndex` implementations are functionally identical — compare
`latex-paper/dist/vue.js:74-120` against `glass-ui/src/composables/sidebar/useTreeIndex.ts:22-90`:
same `walk`, same `parentId: depth === 0 ? node.id : parentId`, same `isInActiveChain`, same
`isDescendant`. Two packages, one algorithm, both resident.

And **#1 is provably unnecessary**: `useSidebarState`'s `getChildren` override
(`PaperSidebar.vue:44`) demonstrates that the index can read `subsections` directly. The adapter
exists only to feed #2, whose product (`treeIndex`) reaches this component as a prop that is never
read (L-3).

The waste compounds at the consumer. `useSidebarState` returns **ten** members
(`useSidebarState.d.ts:28-38`); `grep -n 'sidebarState\.' PaperSidebar.vue` finds **two** in use —
`isExpanded` ×1 (`:67`) and `toggleSection` ×3 (`:68,:74`). The other eight —
`sections`, `activeId`, `activeRootId`, `treeIndex`, `navigateTo`, `scrollToTop`, `isActive`,
`isInActiveChain` — are all unused, and the template instead threads the **prop** forms with the
leaky two-arg signature at five call sites (`:94` ×2, `:95`, `:104`, `:111`), each re-passing
`activeId` by hand. The component holds a zero-argument `sidebarState.isActive(id)` and chooses
`isActive(id, activeId)` instead.

*Provenance:* `paperTree.ts:4-9` · `PaperView.vue:47,48,335-347` · `PaperSidebar.vue:20-22,38-45,67,68,74,94,95,104,111` · `glass-ui useTreeIndex.ts:22-90` · `latex-paper vue.js:74-120` · `useSidebarState.d.ts:28-38`.

*Falsifier:* dies if the two indices differ semantically (then both are needed). They do not — I
read both whole; the glass-ui `.ts` and the latex-paper bundled `.js` are line-for-line equivalent
including the identical grandchild-`parentId` quirk (`parentId` of a depth-2 node is the **root**,
not its parent — masked in both by the `isDescendant` fallback at `vue.js:106` /
`useTreeIndex.ts:79`). Also dies if `sidebarState`'s helpers were used — they are not.
**Survives.**

---

### L-5 · **MAJOR** — the `Collapsible` contract is used half-way: no trigger, dead emit, dangling `aria-labelledby`

`PaperSidebar.vue:66-85` composes `Collapsible` + `CollapsibleContent` and **omits
`CollapsibleTrigger`** (exported and available: `glass-ui/src/components/collapsible/index.ts:6-9`).
The disclosure is hand-rolled onto a plain `Button` at `:71-81`. Three symptoms of the one defect:

**(a) `@update:open` at `:68` is unreachable dead code.** `Collapsible` forwards only reka's emit
(`glass-ui Collapsible.vue:57`). reka writes `open` in exactly one place — `onOpenToggle`
(`CollapsibleRoot.js:52-55`) — which is invoked by `CollapsibleTrigger` (absent) and by
`CollapsibleContent`'s `beforematch` listener (`CollapsibleContent.js:64-69`). The latter cannot
fire: `beforematch` requires `hidden="until-found"`, and with `unmountOnHide` defaulting `true`
(`CollapsibleRoot.js:26-30`) the attribute is written as `hidden=""` (`CollapsibleContent.js:82`).
So the handler never runs — **and if it ever did it would double-toggle**, because `:74` already
calls `toggleSection` on the same click.

**(b) A `region` landmark labelled by an element that does not exist.** glass-ui stamps
`role="region" :aria-labelledby="ids.trigger"` on every `CollapsibleContent`
(`CollapsibleContent.vue:44-46`), where `ids.trigger` comes from `provideDisclosureIds()`
(`Collapsible.vue:31`) and is applied **only by `CollapsibleTrigger`**. Ten of the thirteen chapters
(those with `subsections`) therefore emit a landmark whose `aria-labelledby` IDREF resolves to
nothing.

**(c) No `aria-expanded` / `aria-controls` anywhere.** The `Button` at `:71-81` is a disclosure
control that announces no disclosure state. Expanded/collapsed is conveyed to sighted users by the
subsection list appearing and to everyone else by nothing.

*Provenance:* `PaperSidebar.vue:66-85` · `glass-ui Collapsible.vue:31,57` · `glass-ui CollapsibleContent.vue:44-46` · `glass-ui collapsible/index.ts:6-9` · `reka-ui CollapsibleRoot.js:26-30,52-55` · `reka-ui CollapsibleContent.js:64-69,82,90`.

*Falsifier:* (a) dies if reka emits `update:open` on any third path — I read `CollapsibleRoot.js`
whole; `useVModel` writes only via `onOpenToggle`. (b) dies if `ids.trigger` is stamped by something
other than `CollapsibleTrigger` — it is not; `CollapsibleContent` only *reads* it. (c) dies if a
glass-ui `Button` injected disclosure ARIA — it does not; it is a plain `Primitive` button.
**All three survive.**

*Producer-side note (glass-ui BH relay, per standing law):* `Collapsible.vue:38-40` **strips**
`unmountOnHide` / `unmount-on-hide` from forwarded attrs and does not re-declare it as a prop, so no
consumer can choose mount-while-closed. That is a producer contract gap; it is not this component's
defect, but it bounds what any fix here can do.

---

### L-6 · **MINOR** — `is-active-sub` is a dead class binding that costs a recursive tree walk to compute

`PaperSidebar.vue:94`

```
:class="{ 'is-active-sub': isActive(sub.id, activeId) || isInActiveChain(sub.id, activeId) }"
```

`grep -rn "is-active-sub" web/src web/e2e` → **one hit: this line.** No rule in the scoped block
(`:130-283` defines `.sidebar-link.is-active` at `:240` and `.sidebar-link.is-active .sidebar-number`
at `:251` — never `.is-active-sub`), none in the global `style.css` (which *does* reach into this
component's classes at `:136`, `.sidebar-link:focus-visible`), none in a test assertion.

It is not merely inert. Evaluating it runs `isInActiveChain` per subsection row per render, and that
helper recurses through `isDescendant` (`latex-paper/dist/vue.js:108-118`). The sibling depth-1
styling is already done by the inline `:style` at `:95-97`, so the class was never wired.

*Falsifier:* dies if any stylesheet or test selects `.is-active-sub`. Grepped `web/src` and
`web/e2e` — nothing. Dies if Tailwind generated it — it is not a utility name. **Survives.**

---

### L-7 · **MINOR** — an empty tooltip bubble on exactly one row

`PaperSidebar.vue:88` `<Tooltip :text="getPreview(sub)" side="right">`. The local shim renders the
body unconditionally — `ui/tooltip/Tooltip.vue:37` `<slot name="content">{{ text }}</slot>` — with no
`v-if` on `text`. `getPaperPreview` (`paperTree.ts:16-23`) returns `""` when a node has no leading
string block in `content` **and** no `summary`.

Re-derived against the real compiled tree (Transformer over `paper/fourier_paper.*`; **98 nodes**):
**exactly one node yields `""`** — appendix **A.1 "Sturm-Liouville Completeness"**. Hovering that row
opens an empty tooltip.

*Provenance:* `PaperSidebar.vue:88` · `web/src/components/ui/tooltip/Tooltip.vue:31-38` · `paperTree.ts:16-23`.

*Falsifier:* dies if `getPaperPreview` can never return `""` (it can — the `parts` array stays empty
when both sources are absent), or if the shim guarded on `text` (it does not), or if no node in the
paper hits it (one does, named above). **Survives** — narrow but exact.

---

### L-8 · **MINOR** — depth-2 rows have no tooltip; the asymmetry is why R3-7a counts 2, not 3

Depth-0 (`:70`) and depth-1 (`:88`) rows are `Tooltip`-wrapped. Depth-2 (`:106-117`) is not — a bare
`Button`, no preview affordance, in a list whose whole purpose is orientation. The three levels also
diverge on class: `:76` sets `is-active`, `:94` sets the dead `is-active-sub` (L-6), `:106-113` sets
none — three levels, three different state-conveyance strategies.

*Provenance:* `PaperSidebar.vue:70,88,106-117`.

*Falsifier / corroboration:* R3-7a (`lane-fourier-r3-r6.md:79`) sums the live tree at "PaperSidebar
2" of 35 Tooltip callsites. Two, not three — the intake's own count is the receipt for the gap.
**Survives.**

---

### L-9 · **MINOR** — `sections` is captured non-reactively, inconsistently with its own sibling options

`PaperSidebar.vue:38-45`

```
useSidebarState<PaperSectionData>({
    sections: props.sections,             ← snapshot, evaluated once at setup
    activeId:     () => props.activeId,   ← getter, re-read on every access
    activeRootId: () => props.activeRootId,
    …
})
```

Two of the three data inputs are getters; the third is a value. `useTreeIndex` walks that array once
(`glass-ui useTreeIndex.ts:26,54`) and the resulting `Map` is never rebuilt. Meanwhile the template
iterates `sections` **reactively** (`:65`). A parent that swaps the array therefore re-renders the
list from new data while `sidebarState` still answers from the old tree: `isExpanded`'s default rule
compares against dead ids and every row falls back to collapsed.

*Provenance:* `PaperSidebar.vue:38-45,65` · `glass-ui useSidebarState.ts:62-66` · `useTreeIndex.ts:26,54`.

*Falsifier:* **partially fires.** `PaperView.vue:120` passes `computed(() => paperSections)` over a
module-level constant from `virtual:paper-content`, so identity never changes at runtime today — the
latent break is unreachable in this app. What survives unconditionally is the *contract* defect: a
`defineProps<{ sections: PaperSectionData[] }>` that silently accepts only its first value, while the
two neighbouring options in the same object literal are correctly reactive. Downgraded to MINOR on
that basis.

---

### L-10 · **MINOR** — the section-colour token index has exactly zero headroom and no `var()` fallback

`PaperSidebar.vue:77`, `:96`, `:112` all build a token name from the raw root index:

```
{ color: `var(--section-color-${si})` }
```

No fallback argument. glass-ui defines exactly `--section-color-0` … `--section-color-12` —
thirteen — at `glass-ui/dist/styles/tokens/light-dark.css:126-138`. Re-derived from the compiled
paper: the ToC has **exactly 13 roots** (`0.1 Introduction`, chapters 1-9, appendices A/B/C). 13 for
13. A fourteenth `\chapter` in `paper/fourier_paper.tex` makes `var(--section-color-13)` resolve to
nothing, which renders the whole `color` declaration *invalid at computed-value time* — `color` then
inherits, and the active-chapter hue silently disappears with no console error and no build failure.

The coupling is also duplicated: `MobileFloatingToc.vue:154` does the same, so the failure would be
symmetric across both ToC surfaces.

*Provenance:* `PaperSidebar.vue:77,96,112` · `MobileFloatingToc.vue:154` · `glass-ui light-dark.css:126-138` · `web/src/style.css:119-127` (the local `--section-color-5` WCAG override at `:121`/`:126`, D.W4.d — evidence that these tokens are already a hand-maintained set).

*Falsifier:* **the "it is broken today" version is dead** — 13 roots against 13 tokens; I counted
both. What survives is the boundary-exact, fallback-free coupling between a *content* count and a
*design-system* token count, with no test, no type, and no `var(…, fallback)` guarding it. MINOR by
that reading, deliberately not inflated.

---

### L-11 · **INFO** — a third ungated animation clock, on the element this component exposes

`PaperSidebar.vue:27-28`

```
const sidebarNav = ref<HTMLElement | null>(null);
defineExpose({ sidebarNav });
```

That element is handed to `useSidebarFollow` (`PaperView.vue:232-238`, via
`computed(() => sidebarRef.value?.sidebarNav ?? null)`), which runs a **damped rAF scroll animation**
on it: `damping = 0.22` (`latex-paper/dist/vue.js:488`), `nav.scrollTop += delta * damping` inside
`requestAnimationFrame(follow)` (`:543-560`), re-armed from scroll via
`scheduleFromScroll → queue() → requestAnimationFrame(follow)` (`:582-592`).

`grep` over the entire composable region (`vue.js:485-640`) for
`reduce | matchMedia | prefers` → **no match. No `prefers-reduced-motion` gate.**

lane-frontend §8 (`:624`) flags the coverage gap as *two* clocks — `stores/animation.ts` and
`ConvergencePlot.vue` — and books `PaperView.vue:176` as the sole JS PRM gate (that is
`armProgressFallback`, the progress bar, a different animation). This is a **third**, and it is the
one the reader sees on every scroll of the paper.

*Falsifier:* dies if the follow only ever jumps. It does not — `queue(immediate = true)` is used only
at mount/resize (`PaperView.vue:261,287`); the scroll-driven path is the damped one (`vue.js:562-581`).
Dies if the gate lives upstream in the composable's caller — `PaperView.vue` passes no motion option
(`:233-238`) and the composable accepts none (`SidebarFollowOptions`). **Survives.**

INFO rather than MINOR because the defect is *upstream* (`latex-paper`) and this component's only
participation is exposing the element. **UNPROVEN-NEEDS-LIVE (SS-13)** for the perceived motion under
PRM; the missing gate is static-certain. Route as a `latex-paper` coordination relay alongside the
glass-ui carry in L-5.

---

### L-12 · **INFO** — mounted-but-invisible below 1024px (bounded waste, honestly bounded)

`PaperSidebar.vue:132-136` hides the component with `display: none` (`:135`), re-shown only under a
`min-width: 1024px` media query (`:138-160`), and `PaperView.vue:335-347` mounts it
unconditionally. Below 1024px the
component still instantiates 13 root `Button`s, 13 `Tooltip` roots, 13 `Collapsible`s, 10
`CollapsibleContent` `role="region"` wrappers, and the entire `PaperSearch` stack (L-2), and
`useSidebarFollow` still schedules rAFs against a zero-height nav — `resolveTarget` with
`navHeight = 0` returns `nav.scrollTop` unchanged (`vue.js:522-532`), so `follow()` writes `0` and
exits (`:549-555`). Two wasted frames per active-section change, forever, on phones.

Contrast the sibling: `MobileFloatingToc` is genuinely `v-if`-gated at `PaperView.vue:319`.

*Falsifier — and it substantially deflates the claim:* the maximal version ("all 51 subsections and
34 sub-subsections mount on phones") is **FALSE**. reka's `unmountOnHide` defaults to `true`
(`CollapsibleRoot.js:26-30`) and the slot is gated on `present` (`CollapsibleContent.js:90`), so
closed chapters mount no children; and the depth-2 lists are additionally `v-if`-gated on
`isInActiveChain` (`PaperSidebar.vue:104`). Mounted cost is bounded to 13 roots + one chapter's
subsections. Reported at INFO on that basis.

---

### L-13 · **INFO** — three dead API surfaces inside this component's direct import closure

- `PaperSearch.vue:8` — `const props = defineProps<{…}>()`; `props` is assigned and never read
  (the template binds `search` / `variant` directly). `grep -n props PaperSearch.vue` → one hit.
- `PaperSearchModal.vue:12-14` — `defineEmits<{ select: [id: string] }>()`; `grep -n emit` → one
  hit, the declaration. The component calls `search.selectResult()` directly instead.
- `PaperSearchDropdown.vue:12-14` — identical dead `select` emit.

Two components publish an event contract they never fulfil, so any parent wiring `@select` gets
silence. `PaperSidebar.vue:51` is the mount point for all three.

*Falsifier:* dies if `emit(` appears anywhere in those files. It does not. **Survives.**

---

### L-14 · **INFO** — raw-HTML sink with asymmetric trust against the sibling derivation of the same field

`PaperSidebar.vue:80`, `:100`, `:116` all `v-html="renderTitle(<node>.title)"`. `createRenderTitle`
(`latex-paper/dist/vue.js:3-8`) substitutes `$…$` spans and **passes every other character through
verbatim** — there is no escaping step. Meanwhile the *other* derivation of the same data in the
same render, `getPaperPreview` (`paperTree.ts:18`), does `.replace(/<[^>]+>/g, "")`. One component,
one field, two opposite trust postures.

*Falsifier — and it is decisive:* `section.title` originates from the repo's own
`paper/fourier_paper.tex`, parsed at **build time** by the vite plugin
(`latex-paper/dist/vite.js:110-155`, emitting a frozen `virtual:paper-content` module). No user input
reaches it. **This is not a vulnerability**; it is filed as INFO because the asymmetry is a latent
trap the moment paper content becomes user-supplied, and because L-18 requires reporting the check
that was run, not only the ones that failed.

---

### L-15 · **INFO** — idiom drift with its own sibling, on the same composable

Same repo, same directory, same `useSidebarState`, different idioms:

| | `PaperSidebar.vue` | `MobileFloatingToc.vue` |
|---|---|---|
| template ref | `ref<HTMLElement\|null>` + `defineExpose` (`:27-28`) | `useTemplateRef` (`:28`) — the Vue 3.5 idiom |
| root-row click | navigate **and** toggle (`:74`) | toggle only (`:155`) |
| sub-row click | navigate, parent stays (`:92`) | `selectSection` → closes the whole dropdown (`:76-79`) |
| `PaperSectionData` import | `@/lib/paperContent` (`:4`) | `@/lib/paperContent` (`:7`) — but `usePaperSearch.ts:6`, in the same feature, imports it from `@mkbabb/latex-paper` |

None of these is wrong alone. Together they mean the two ToC surfaces cannot be reasoned about — or
regression-tested — as one behaviour.

*Falsifier:* none available; all four rows are direct reads of both files. **Survives** at INFO.

---

## §2 — R5-7 / R6-5: confirmed, and extended with the multiplier the leaf still lacks

R5-7 is **TRUE and reproduced**: `grep -n "v-for" PaperSidebar.vue` → `65`, `87`, `105`, expressions
exactly as R6-5 records. R6 cured the empty leaf by adding a `NATIVE_TEMPLATE_LOOP` family with
`baselinePaperRowCount: 3`.

**What three rows still does not give you is an instance denominator** — and the census's
"mounted-instance denominator **OPEN**" (`lane-fourier-r3-r6.md:176`) is exactly the hole. Measured
against the real compiled tree:

| what a component-callsite deriver sees in this file | count |
|---|---:|
| `Tooltip` callsites (R3-7a) | 2 (`:70`, `:88`) |
| `Button` callsites | 4 (`:54`, `:71`, `:89`, `:106`) |
| `Collapsible` / `CollapsibleContent` callsites | 2 (`:66`, `:85`) |
| `PaperSearch` callsite | 1 (`:51`) |
| **total counted component callsites** | **9** |

| what the DOM actually materialises | count |
|---|---:|
| root rows (`li` @ 65) | **13** |
| subsection rows (`li` @ 87), all chapters expanded | **51** |
| sub-subsection rows (`li` @ 105), all chains active | **34** |
| **total interactive ToC rows** | **98** |

**9 counted callsites ↔ up to 98 live rows — a 10.9× blind spot**, and the multiplier is
*content-dependent*: it is a function of `paper/fourier_paper.tex`, not of `web/src`. R6's cure
counts the *loops*; the denominator needs the *fan-out*, and the fan-out cannot be closed by static
source derivation at all — it requires either running the build-time LaTeX transform (as I did here)
or a live mount.

**Recommendation to F.W4:** adopt R6's `NATIVE_TEMPLATE_LOOP` family *and* record, per native loop,
the **iterable provenance** (`sections` ← `virtual:paper-content` ← `paper/fourier_paper.tex`). A
denominator that cannot name where its iterable comes from will keep reporting 3 where the answer is
98. This is the concrete form of X-9's "the formation must pick and publish one scope law"
(`lane-fourier-r3-r6.md:160`) for template instances.

**Viz render path — explicit negative.** `PaperSidebar` touches **none** of the three canvases in
lane-frontend §6 (`BasisCanvas` / `ConvergencePlot` / `FrequencyGraph`) nor any of the 12 SVG
surfaces; its import closure (`Tooltip`, `PaperSearch*`, `paperContent`, `usePaperSearch`, glass-ui
`button` / `collapsible` / `sidebar`, `lucide-vue-next`) reaches no `getContext`, no `rAF`, no
`ResizeObserver`. The census's "Canvas2D throughout, WebGL/WebGPU **ABSENT**" is unaffected here. Its
only render-path coupling is the **scroll** path: it owns and exposes the element that
`useSidebarFollow` animates every frame (L-11), inside the same `.paper-scroll` scroller that carries
the native `scroll()`-timeline progress bar (`PaperView.vue:313-314`, JS floor gated at `:176`).

---

## §3 — Superlatives (L-18 the other way; each with its falsifier)

**S-1 · Zero teardown surface — the component cannot leak.**
`grep -nE "addEventListener|setTimeout|setInterval|requestAnimationFrame|IntersectionObserver|ResizeObserver|MutationObserver|onMounted|onUnmounted|onBeforeUnmount|watch\(|watchEffect" PaperSidebar.vue` → **zero hits.** No listener, no timer, no observer, no rAF, no lifecycle hook. There is nothing to forget to tear down. *Falsifier:* a side effect hidden in the composable — `useSidebarState` is pure (`reactive(new Set)` + closures; `useSidebarState.ts:62-113`), no lifecycle, no listener. *Contrast within the same directory:* `MobileFloatingToc.vue:44-57` mutates `props.scrollContainer.style.overflow` and needs an `onUnmounted` restore to avoid stranding a locked scroller. **Holds.**

**S-2 · The W3.5.c de-duplication is real, not aspirational.** The header comment (`:30-37`) claims the `userExpanded` / `userCollapsed` Sets were lifted out of both ToC components into glass-ui. Verified: `grep -rn "userExpanded\|userCollapsed" web/src` → **one hit, and it is that comment.** The state genuinely lives once, in `useSidebarState.ts:68-69`. *Falsifier:* any surviving local Set — none. **Holds.** (A comment that survives its own grep is rarer than it should be.)

**S-3 · Token-pure styling with named-property transitions.** `grep -nE "#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|transition: all"` over the style block (`:130-283`) → the only hit is the *comment* at `:197` saying "no `transition: all`". Every colour is `var(--…)` or `color-mix(in srgb, var(--…) …)`; every transition names its properties and uses canonical easing tokens (`--ease-standard` at `:198`, `--ease-out-expo` at `:229-232`). *Falsifier:* a literal colour anywhere — none. **Holds.**

**S-4 · Stable domain keys on all three native loops.** `:key="section.id"` / `sub.id` / `subsub.id` (`:65`, `:87`, `:105`) — never the index, even though `si` is in scope at `:65` and used elsewhere in the same element's subtree (`:77`). Correct list reconciliation is what makes the R5-7 blind spot a *counting* problem rather than a *correctness* problem. *Falsifier:* `:key="si"` anywhere — none. **Holds.**

**S-5 · Goldilocks size, correctly proportioned.** 283 lines = 47 script / 76 template / 156 style; one responsibility (render a tree, delegate its state). No god module, no premature extraction, no wrapper-component contrivance. Its 397-line sibling is larger precisely because it owns imperative scroll-lock state that this one correctly does not. *Falsifier:* `wc -l` → 283 (matches lane-frontend `:156`); the script section holds one composable call and one ref. **Holds.**

---

## §4 — Disposition

| id | severity | one-line | route |
|---|---|---|---|
| L-1 | MAJOR | click-to-navigate collapses the active chapter; sidebar-follow silently dies | F.W4 — split navigate from toggle (the sibling at `MobileFloatingToc.vue:154` is the reference) |
| L-2 | MAJOR | two teleported search modals + document-global `querySelector` + focus race | F.W4 — gate the sidebar's `PaperSearch`, or hoist one modal to `PaperView` |
| L-3 | MAJOR | `treeIndex: Map<string, any>` — dead prop, only `any` in the file | F.W4 — delete the prop and the parent's binding |
| L-4 | MAJOR | three parallel derivations of one 98-node tree across two packages; 8 of 10 composable members unused | F.W4 — keep `useSidebarState`, delete `paperTree.ts`'s adapter + `PaperView.vue:47` |
| L-5 | MAJOR | no `CollapsibleTrigger` → dead `@update:open`, dangling `aria-labelledby`, no `aria-expanded` | F.W4 + **glass-ui BH relay** (the `unmountOnHide` strip at `Collapsible.vue:38-40`) |
| L-6 | MINOR | `is-active-sub` styles nothing and costs a recursive walk per row | F.W4 |
| L-7 | MINOR | empty tooltip on appendix A.1 (1 of 98 nodes) | F.W4 — `v-if` the shim's content on `text` |
| L-8 | MINOR | depth-2 rows have no tooltip; three levels, three state strategies | F.W3 (rides R3-7a's Tooltip migration budget) |
| L-9 | MINOR | `sections` snapshotted while its two sibling options are getters | F.W4 |
| L-10 | MINOR | `--section-color-${si}` — 13 roots vs 13 tokens, no fallback, no test | F.W4 + **glass-ui BH relay** |
| L-11 | INFO | third ungated rAF clock (`useSidebarFollow`), missing from lane-frontend §8's inventory | **latex-paper relay**; amend lane-frontend §8 |
| L-12 | INFO | mounted-but-invisible below 1024px (bounded by `unmountOnHide`) | F.W4, low priority |
| L-13 | INFO | dead `props` + two dead `select` emits in the imported search stack | F.W4 |
| L-14 | INFO | unescaped `v-html` sink vs tag-stripping sibling derivation | book only |
| L-15 | INFO | idiom drift with `MobileFloatingToc` on four axes | F.W4 |

---

## §5 — Candidates their own falsifiers killed (reported, per L-18)

Five plausible defects did not survive verification. Recording them so the next auditor does not
re-spend the tokens, and so the confirmed rows above are read against a known false-positive rate.

1. **"`scrollbar-thin` (`:50`) is an undefined class."** — **FALSE.** It resolves in `web/src/style.css:3`'s `@import "@mkbabb/glass-ui/styles"` → `glass-ui/dist/styles/utilities/base.css:155-171` (`scrollbar-width: thin` + a `@supports not (scrollbar-color: auto)` WebKit arm). The identically-named rule in `FrequencyGraph.vue:236` is a scoped duplicate, not the source.
2. **"`renderTitle` re-runs KaTeX for every row on every re-render."** — **FALSE.** `createRenderTitle` is a plain `String.replace` (`latex-paper vue.js:3-8`), and `renderInline` is memoised in a **module-level** `Map` (`vue.js:387-401`). Only 4 of 98 titles contain `$…$` at all, and each is rendered once per process.
3. **"All 51 subsections stay mounted because reka force-mounts `Presence`."** — **FALSE.** `Presence` is force-mounted, but the *slot* is gated on `present` when `unmountOnHide` is true, and reka defaults it true (`CollapsibleRoot.js:26-30`, `CollapsibleContent.js:90`). Closed chapters mount no children. (This falsifier is what bounds L-12.)
4. **"`var(--section-color-${si})` overruns the token set today."** — **FALSE.** Re-derived the compiled tree: exactly **13 roots** against exactly **13 tokens** (`light-dark.css:126-138`). Survives only as the fallback-free, zero-headroom coupling of L-10.
5. **"`Tooltip` will throw — no `TooltipProvider` ancestor."** — **FALSE.** `App.vue:23` wraps the entire `RouterView` in `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">`. The injection resolves.

---

## §6 — Provenance index (everything read for this challenge, read-only)

`fourier-analysis/web/src/` — `components/paper/PaperSidebar.vue` (whole) · `PaperView.vue` (whole) ·
`MobileFloatingToc.vue` (whole) · `PaperSearch.vue` · `paperTree.ts` · `search/usePaperSearch.ts` ·
`search/PaperSearchInput.vue` · `search/PaperSearchModal.vue` · `search/PaperSearchDropdown.vue` ·
`components/ui/tooltip/Tooltip.vue` · `lib/paperContent.ts` · `lib/colors.ts` · `style.css` ·
`App.vue` · `main.ts` · `web/e2e/paper-performance.spec.ts` · `web/package.json` ·
`paper/fourier_paper.tex`.
`web/node_modules/@mkbabb/glass-ui/` — `dist/composables/sidebar/*.d.ts` ·
`dist/styles/tokens/light-dark.css` · `dist/styles/utilities/base.css`; source mirror at
`/Users/mkbabb/Programming/glass-ui/src/composables/sidebar/{useSidebarState,useTreeIndex}.ts` and
`src/components/collapsible/{Collapsible,CollapsibleContent}.vue` + `index.ts`.
`web/node_modules/@mkbabb/latex-paper/` — `dist/vue.js` (useKatex · useTreeIndex · useSidebarFollow ·
PaperSection render) · `dist/vite.js` · `dist/flattenPaperSections-*.d.ts`.
`web/node_modules/reka-ui/dist/Collapsible/{CollapsibleRoot,CollapsibleContent}.js` ·
`dist/Presence/Presence.js`.
Corpus: `formation/fourier/{CENSUS-2026-08-03,lane-frontend}.md` ·
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md`.

**Writes performed by this lane: this file only.** No product source in any repo was modified. The
`paperSections` re-derivation ran read-only from a scratchpad script outside both repos.
