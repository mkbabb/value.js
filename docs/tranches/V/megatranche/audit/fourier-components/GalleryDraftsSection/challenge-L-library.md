claude-opus-5[1m]

# CHALLENGE — `GalleryDraftsSection.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/GalleryDraftsSection.vue` (108 lines; census row `lane-frontend.md:110` — "Draft list", 108).
**Evidence tree** fourier-analysis @ `cd26c65` (READ-ONLY). No browser tooling used; every claim below is static + source-derived.
**Import closure read whole** — `web/src/lib/types.ts` (`WorkspaceDraft` 83-91), `web/src/lib/api.ts` (`thumbnailUrl` 292-294), `web/src/components/visualization/lib/basis-display.ts` (7 lines), `@mkbabb/glass-ui/button` (`dist/components/ui/button/*.d.ts`), `@mkbabb/glass-ui/metric-badge` (`dist/components/custom/metric-badge/MetricBadge.vue.d.ts`), `lucide-vue-next`. Plus the contract surfaces the component's props/emits bind to: `GalleryView.vue` (sole consumer, 76-81 / 207-215 / 356-371), `stores/workspace.ts` (95-104, 408-410), `stores/gallery.ts` (237-262), `lib/draftStorage.ts` (whole), `api/routers/visualizations.py` (165-236), `api/lib/crud/idempotency.py` (57-79), `api/services/database.py:98`.

**Posture** — assumed DEFECTIVE at open. The file is small, non-god, leak-free, and its *hygiene* survives audit (six superlatives, §S). What does not survive is its **contract surface**: the props it accepts cannot express the row states it must render, and it declines a keyboard-accessibility cure its own sibling file documents having applied. 15 defects, 1 BLOCKER.

---

## §L — Defects

### L-1 · BLOCKER · a11y-correctness — the section's primary action is keyboard-unreachable, and the repo already documents the cure

`GalleryDraftsSection.vue:72-75` and `:83` are two bare `<div … cursor-pointer @click="emit('open', draft.imageSlug)">`. No `role`, no `tabindex`, no `@keydown`. The only keyboard-reachable control in a row is the Publish `Button` (`:91`, → a real `<button>` via glass-ui `Button`/reka `Primitive`).

Net effect for a keyboard or AT user: **every draft can be published, none can be opened.** Not "harder" — unreachable. There is no alternate route to `/w/:imageSlug` from this section; the emit is the only edge (`GalleryView.vue:370` `@open="router.push(\`/w/${$event}\`)"`).

This is not an unknown class in this repo. The sibling `GalleryCard.vue:64-80` carries a standing comment naming the exact defect and its remediation:

```
<!-- D.W4.c — keyboard-accessible card. Was a bare `<div @click>` (per
     A3 #4 finding — unreachable by keyboard, no Enter/Space activation,
     no focus ring). Lifted to the canonical ARIA button-on-non-button
     pattern: role + tabindex + keydown + aria-label. -->
```
…followed by `role="button" tabindex="0" :aria-label="\`Open ${entry.image_slug}\`" @click @keydown.enter.prevent @keydown.space.prevent`.

So the codebase has an adjudicated finding (A3 #4), a canonical pattern, a wave that applied it (D.W4.c), a global focus ring (`.gallery-card:focus-visible` in `style.css`) — and this file, 30 lines away in the same directory, was not swept. **Severity BLOCKER** on the ground that a documented-and-cured exclusion class recurring uncured in a sibling is a shipping regression, not a backlog item.

*Falsifier* — (a) a global delegated keydown handler that activates `[cursor-pointer]` elements: `grep -rn "keydown" web/src/App.vue web/src/main.ts web/src/style.css` → no such delegation exists; (b) the row `<div>` at `:67` being itself focusable: it is not — it carries only layout/hover classes; (c) glass-ui `Button` rendering as a non-button: `Props extends PrimitiveProps` with `as` defaulting to `"button"` (`button/Button.vue.d.ts`), so Publish *is* reachable, which is precisely what makes the asymmetry provable. Claim survives. **UNPROVEN-NEEDS-LIVE (SS-13):** only the *presence* of a visible focus ring after the cure needs a live check; the unreachability itself is static.

---

### L-2 · MAJOR · error-posture — Publish is enabled on drafts the store will reject, and the component holds the field that proves it

`:95` `:disabled="publishing"` is the row button's **only** gate. But `stores/gallery.ts:238` opens with:

```ts
async function publishDraft(draft: WorkspaceDraft) {
    if (!draft.contour) throw new Error("Draft has no contour");
```

— a bare throw **outside** the function's own `try`, so it escapes to `GalleryView.vue:211` and toasts `"Draft has no contour"`.

Reachability is not hypothetical, it is the *default* for a fresh upload. `stores/workspace.ts` `uploadImage` sets `contour.value = null` (line ~114), then `imageSlug.value = meta.image_slug`, then `await _saveDraftNow()` — and `_saveDraftNow` (95-104) persists `contour: contour.value`, i.e. `null`. `refreshDrafts` (408-410) is `drafts.value = await listDrafts()` — `draftStorage.ts:97-105` is an unfiltered `getAll()`. So **every image uploaded and navigated away from before contour extraction lands in this list with `contour: null` and a fully enabled Publish button that is guaranteed to fail.**

`WorkspaceDraft.contour: ContourAsset | null` (`types.ts:85`) is in the component's own prop type. The eligibility predicate is one keystroke — `:disabled="publishing || !draft.contour"` — and the component instead ships the failure to a toast.

*Falsifier* — (a) contour always non-null by the time a draft is listed: refuted by the upload path above plus the unfiltered `getAll()`; (b) the store's `if` being inside the try (it would then toast twice rather than once): `sed -n '237,240p' stores/gallery.ts` shows `throw` precedes `try` — the single-toast reading is the right one, and the defect is unaffected either way. Claim survives.

---

### L-3 · MAJOR · composable/props contract — `publishing: boolean` is too coarse to express row state; the consequence is duplicate public rows

Three separate coarseness failures ride on the single boolean at `:12`/`:95`:

1. **Fan-out disable.** One publish disables *all* Publish buttons (`:95` reads the same scalar in every row) with no indication which row is in flight. `GalleryView.vue:207-215` sets one module-scope `publishing` ref for the whole list.
2. **No terminal state.** After a successful publish the row is byte-identical to before. `gallery.publishDraft` ends in `resetAndFetch()` (`gallery.ts:259`) — which refetches *gallery entries*, not drafts. `refreshDrafts` is called only from `GalleryView.vue:89` (onMounted) and `:106` (login transition). The drafts array is never re-read after a publish.
3. **The filter that should have hidden it is a tautology.** `GalleryView.vue:76-81` filters on `!d.savedSnapshots?.length || …`. `grep -rn savedSnapshots web/src` returns exactly one writer: `stores/workspace.ts:102` `savedSnapshots: []`. The field is *always* the empty array, so the first disjunct is always true and `unpublishedDrafts === workspace.drafts`, always.

Composed: press Publish → toast "Published!" → row unchanged, button re-enabled → press again → **a second public visualization is minted.** Server side there is nothing to stop it: `web/src/lib/api.ts:372-380` `createVisualization` sends no `Idempotency-Key`; `api/lib/crud/idempotency.py:68-70` is explicit — *"No header → `handler()`"*; and `content_hash` carries a **non-unique** index (`api/services/database.py:98` `create_index("content_hash")`, contrast the deliberate `unique=True` compound at `:140`). Each press inserts a fresh slug (`visualizations.py:225` `insert_one`) with an identical `content_hash`.

The component-level defect is the contract: a row needs `publishedSlug: string | null` (or a `state: 'idle'|'publishing'|'published'`) per draft, not a list-wide boolean.

*Falsifier* — (a) server dedupe by `(image_slug, contour_hash)`: refuted, the only uniqueness assertions in `database.py` are `:140` (flags) — the visualizations `content_hash` index at `:98` is plain; (b) rate limiting foreclosing the second press: `visualizations.py:167` routes the write budget through middleware, which throttles but does not deduplicate; (c) drafts refreshing on tab activation: `watch(activeTab, …)` at `GalleryView.vue:204` only clears gallery selection. Claim survives.

---

### L-4 · MAJOR · duplication — `timeAgo` exists five times in one directory, in two mutually-inconsistent variants

`GalleryDraftsSection.vue:28-36` is **byte-identical** (verified by `diff`) to `GalleryCard.vue:53-61` and `GalleryCardModal.vue:58-66`. Two further copies diverge: `AdminUserList.vue:223-232` and `AdminFlaggedPanel.vue:137-147` drop the `if (m < 1) return "just now"` rung and rename the locals (`diff`/`mins`/`hours`/`days`).

The divergence is user-visible and is the proof the duplication already cost something: a 30-second-old row reads **"just now"** in the gallery surfaces and **"0m ago"** in the admin surfaces. Five copies, one shared behaviour, already forked — and there is a `web/src/lib/` with 18 modules (`lane-frontend.md:190`) and a directory-local `components/visualization/lib/` that is the obvious home.

*Falsifier* — the copies being intentionally register-specific: refuted by three of five being byte-identical, and by the two divergent copies differing in a *rung* (a behaviour), not a register. Claim survives.

---

### L-5 · MAJOR · colocation — the module that owns `basisDisplay` does not own the key normalization every consumer of it must perform

`:43` `const key = b.startsWith("fourier") ? "fourier" : b;`. The same undocumented convention — that an `active_bases` entry is a *family-prefixed* string (`"fourier-epicycles"`) whose display key is the family — is re-expressed at six sites:

| site | form |
|---|---|
| `GalleryDraftsSection.vue:43` | `b.startsWith("fourier") ? "fourier" : b` |
| `GalleryCard.vue:39` | identical |
| `GalleryCardModal.vue:44` | identical |
| `BasisCanvas.vue:250` | `basisKey.startsWith("fourier") ? "fourier" : basisKey` |
| `BasisSelector.vue:98` | inverse — `.filter(b => !b.startsWith("fourier"))` |
| `useWorkspaceLoader.ts:112` | inverse — `.filter((b) => !b.startsWith("fourier"))` |

`components/visualization/lib/basis-display.ts` is 7 lines and exports only the `Record`. It does not export a `basisKeyFor(b: string)`, so every consumer must re-derive it, and two of the six express the *inverse* predicate inline. Add a fourth basis family tomorrow and six files must change in lockstep. This is a colocation defect, not merely duplication: the table and its access rule are separated.

*Falsifier* — the normalization being a one-off gallery idiom: refuted by `BasisCanvas.vue:250` (the canvas render path) and `useWorkspaceLoader.ts:112` (the hydration path) carrying it too. Claim survives.

---

### L-6 · MINOR · efficiency — `getBasisLabel(draft)` is invoked twice per row per render

`:86` renders it; `:87` calls it *again* purely to decide whether to show a `&middot;` separator. Each call allocates: `?? []`, `.map()` (closure per element), `.join()`. Per render that is `2 × N` array allocations for a value that is a pure function of `draft`. Nothing memoizes it — it is a plain function in the render scope, so it re-runs on every re-render of the section (including the one caused by toggling `collapsed`, and by any `publishing` flip, which touches all rows).

The Goldilocks cure is one line of shape, not a new module: make `sortedDrafts` a view-model — `computed(() => props.drafts.slice().sort(…).map(d => ({ ...d, basisLabel: …, when: … })))` — which simultaneously retires L-6 and L-7.

*Falsifier* — Vue caching identical calls within a render: it does not; only `computed` memoizes. Claim survives.

---

### L-7 · MINOR · correctness — `timeAgo` is a non-reactive read of `Date.now()`; the displayed age freezes

`:29` `Date.now()` is read inside a plain function called from the template (`:88`). There is no ticker, no `useNow`, no `setInterval` anywhere in the file (0 timers — see S-4). A drafts list left open therefore keeps reporting "just now" indefinitely, and only corrects when an unrelated re-render happens to fire.

*Falsifier* — a global clock ref forcing periodic re-render: `grep -rn "useNow\|setInterval" web/src/components/visualization/gallery/` → nothing. Claim survives.

---

### L-8 · MINOR · wrong-types — the file guards nullish exactly where the type forbids it and omits the guard exactly where it would matter

`types.ts:83-91` declares every relevant field non-optional: `animationSettings: AnimationSettings`, `lastOpenedAt: string`, and `AnimationSettings.active_bases: string[]` (`types.ts:50`). Against that:

- `:25` `(b.lastOpenedAt ?? "")` — guards a `string`.
- `:39` `item.animationSettings?.active_bases ?? []` — two guards on two non-nullable fields.
- `:88` `timeAgo(draft.lastOpenedAt)` — **no** guard, and `timeAgo` has none either.

So the file's posture is "the type is lying" in two places and "the type is honest" in a third, for the *same field*. If the pessimistic reading is right, `:88` is the one site that breaks: `new Date(undefined as any).getTime()` → `NaN`, every comparison at `:31-34` is false, and the row renders **`"NaNd ago"`**. If the optimistic reading is right, `:25` and `:39` are dead defensive noise. Both readings convict; they cannot both be discharged. `strict: true` and no `noUncheckedIndexedAccess` (`web/tsconfig.json`) means the compiler is silent either way — `basisDisplay[key]?.` at `:44` is a third instance of the same tell, hedging an index the declared `Record<string, …>` says is total.

*Falsifier* — a legacy IndexedDB v1 row genuinely lacking `lastOpenedAt`, which would elevate this to MAJOR: not provable from the tree (`draftStorage.ts` `DB_VERSION = 2` with no v1 schema record, and `onupgradeneeded` at `:28-41` adds an index without rewriting rows, so old rows survive verbatim). Held at MINOR, with the incoherence — not the NaN — as the confirmed part.

---

### L-9 · MINOR · dead-code — the root `v-if` is invariantly true; empty-state ownership is split across two files

`:51` `v-if="sortedDrafts.length > 0"`. The sole consumer (`grep -rn GalleryDraftsSection web/src` → `GalleryView.vue:29,365`) mounts it as the `v-else` of an emptiness test on the *same array*:

```
GalleryView.vue:358   <div v-if="!unpublishedDrafts.length"> …No drafts yet… </div>
GalleryView.vue:365-367   <GalleryDraftsSection v-else :drafts="unpublishedDrafts" …>
```

`sortedDrafts` derives from `props.drafts` with no filtering (`:22-26`), so `sortedDrafts.length === props.drafts.length === unpublishedDrafts.length`, and the component only exists when that is non-zero. The false branch is unreachable. Worse than dead: it advertises an empty-state contract the component does not actually implement (rendering nothing is not an empty state), which is why the real one had to be written in the parent.

*Falsifier* — a second consumer passing a possibly-empty array: exactly one consumer exists. Claim survives.

---

### L-10 · MINOR · dead-code — a `<style scoped>` block that emits zero CSS, plus two class hooks defined nowhere

`:106-108` is `<style scoped>` containing only `@reference "tailwindcss";` — a Tailwind v4 compiler directive that emits no rules. The block is nonetheless a scoped block, so the SFC compiler stamps a `data-v-*` scope id onto every element in the template and threads a scopeId through the render function, for zero styling benefit — across `N` rows × 6 elements each.

This is not a house convention: 35 of 66 SFCs use `@reference`, but only **4** have a scoped block whose entire content is that directive (`GalleryDraftsSection.vue`, `AdminAuditLog.vue`, `AdminFlaggedPanel.vue`, `AdminUserList.vue`) — the residue of scoped rules that were deleted without deleting their block.

Corroborating: `:54` `drafts-header` and `:70` `draft-item` are class hooks with no definition anywhere — `grep -rn "drafts-header\|draft-item" web/src` returns only these two authoring sites. They are the ghosts of the deleted rules.

*Falsifier* — the classes being live test selectors: `grep -rn "drafts-header\|draft-item" web/e2e` → no hits. Or glass-ui defining them: absent from `dist/glass-ui.css` and `dist/styles/`. Claim survives.

---

### L-11 · MINOR · error-posture + redundancy — the thumbnail has no failure path and its alt duplicates adjacent visible text

`:76-81`. `thumbnailUrl` (`api.ts:292-294`) is bare string interpolation — `${BASE}/api/images/${imageSlug}/thumbnail` — with no existence guarantee. A draft outlives its server-side asset trivially: drafts live in IndexedDB (client, unbounded), images live in Mongo/GridFS behind `last_accessed_at` reaping (`types.ts:60`, `ImageMeta.last_accessed_at`). On a 404 the row shows the browser's broken-image glyph inside a `bg-muted` box; there is no `@error`, no placeholder, no dimming. No gallery surface has one (`grep -rn "@error" web/src/components/visualization/gallery/` → empty), so this is a directory-wide gap that this file inherits rather than invents.

Separately, `:78` `:alt="draft.imageSlug"` repeats verbatim the visible text at `:84`, so a screen reader announces the slug twice per row. With a labelled sibling present the thumbnail is decorative: `alt=""` is correct.

*Falsifier* — `bg-muted` on the wrapper (`:73`) masking the broken glyph: it does not; the `<img>` renders its alt-text/broken-icon above the background. Claim survives.

---

### L-12 · MINOR · correctness — collapse state is lost on every tab visit, and the disclosure exposes no ARIA state

`:20` `const collapsed = ref(false)`. `GalleryView.vue:356` wraps the drafts tab in `<template v-if="activeTab === 'drafts'">`, which **unmounts** the subtree on tab change (as opposed to `v-show`), so `collapsed` re-initialises to `false` on every return. The control is therefore write-only across the session.

And the disclosure button (`:52-64`) carries no `aria-expanded` / `aria-controls`. Its state is conveyed solely by a CSS transform on a chevron (`:62` `'-rotate-90': collapsed`) — invisible to AT.

*Falsifier* — a `<KeepAlive>` around the tab content: `grep -rn "KeepAlive" web/src/components/visualization/GalleryView.vue` → none. Claim survives.

---

### L-13 · MINOR · correctness/efficiency — `localeCompare` used for ordering, against the formation's adopted ordering law

`:25` `(b.lastOpenedAt ?? "").localeCompare(a.lastOpenedAt ?? "")`.

**Fold, with an explicit scope correction.** The corpus adopted, at `CENSUS-2026-08-03.md:348-349` (§ addendum item 5(ii)), *"identity ordering is `UTF8_BYTEWISE_CODEPOINT`, never `localeCompare`"*, on the strength of intake row **R3-14** (`lane-fourier-r3-r6.md:88`, TRUE / ADOPT-AS-FACT: `AUDITOR.mjs:34` locale-dependent identity ordering, cured downstream by the R4+ `SNAPSHOT-MANIFEST.json.ordering` field). **I contradict any reading that this line is an instance of R3-14.** R3-14 is about *identity/reproducibility* ordering inside the audit deriver; `:25` is *display* ordering of a UI list. The law does not literally bind here.

What survives on its own footing: the operands are uniformly-formatted ISO-8601 strings, for which plain `<`/`>` is exactly correct and roughly two orders of magnitude cheaper than an ICU collation call per comparison (`O(n log n)` collator invocations on every recompute of `sortedDrafts`). `localeCompare` also silently couples list order to the host locale — the precise coupling the formation resolved to stop tolerating anywhere in this tree. Cure: `(b.lastOpenedAt < a.lastOpenedAt ? -1 : b.lastOpenedAt > a.lastOpenedAt ? 1 : 0)`, or sort on `Date.parse`.

*Falsifier* — ICU variable-weighting reordering ISO strings and thereby making `localeCompare` *wrong*: it does not, because punctuation elision is uniform across identically-formatted operands, so the induced order is preserved. Correctness holds; the claim is narrowed to cost + locale coupling, and stands at MINOR (not the MAJOR it would be if the ordering were wrong).

---

### L-14 · INFO · forward break — 2 of this file's 8 imports are on the glass-7 / lucide break list

- `:8` `import { MetricBadge } from "@mkbabb/glass-ui/metric-badge"` — `lane-frontend.md:472` lists this exact line as one of the `./metric-badge`-removed sites, cured by `./metric` (`Metric`); `CENSUS-2026-08-03.md:63-65` **corrects the count to 7 files** (C-4) and names `GalleryDraftsSection` among them.
- `:6` `import { ChevronDown, Upload } from "lucide-vue-next"` — one of the 35 sites moving to `@lucide/vue` per `lane-frontend.md:477`.

**Not broken today, and I say so explicitly against a careless reading of the census:** the installed producer is `@mkbabb/glass-ui@4.0.0` and `./metric-badge` is present in its live exports map (`node_modules/@mkbabb/glass-ui/package.json`, `{types: ./dist/metric-badge.d.ts, import: ./dist/metric-badge.js}`); `package.json:14` declares `"^4.0.0"`. The props in use are valid against 4.0.0: `value` and `size: 'sm'` are both on `MetricBadgeProps` (`metric-badge/MetricBadge.vue.d.ts`), as are `variant: 'ghost'|'outline'` and `size: 'sm'` on `buttonVariants` (`button/index.d.ts`). Budget 1 file, 2 import lines, and re-check the `value=` prop at the hop — `lane-frontend.md:472` warns "another prop pass is due".

*Falsifier* — the break being live now: refuted by the installed exports map above. Held at INFO.

---

### L-15 · INFO · audit-model exposure — this file is a clean instance of the R5-7 native-template-loop blind spot

`:68` `v-for="draft in sortedDrafts"` sits on a **native `<div>`**, and the only component callsite inside the loop is the Publish `Button` at `:91`.

**Fold** — intake row **R5-7** (`lane-fourier-r3-r6.md:125`, TRUE / ADOPT-AS-FACT + CARRY-TO-WAVE → F.W4): *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*, re-derived against R5's literally-empty `instance.loop.paper-sidebar` leaf and cured by R6's `NATIVE_TEMPLATE_LOOP` family (R6-5, `lane-fourier-r3-r6.md:140`). The F.W4 carry is explicit (`CENSUS-2026-08-03.md:362`): *"count native element loops or inherit the blind spot."*

The exposure here is sharper than PaperSidebar's, not milder. PaperSidebar's native `<li v-for>` loops (65/87/105) drop a *content* subtree. Here the native loop is the **multiplicity parent of a glass-ui `Button` callsite** — so a callsite-keyed deriver records `Button` as one static site with multiplicity 1, while the live multiplicity is `|drafts|`, unbounded. That is a direct contributor to the census's own open row, *"mounted-instance denominator OPEN"* (`CENSUS-2026-08-03.md:337`), on the constellation's most-consumed producer symbol. Any glass-adoption sizing built on component callsites undercounts `Button` by every draft in every user's IndexedDB.

Concretely for the register: **1 native template loop · 1 component callsite enclosed · derived multiplicity 1 · live multiplicity `|props.drafts|`.**

*Falsifier* — the loop being on a component (which would register normally): `:67-71` is a plain `<div>`. Claim survives.

---

### On the viz render path — an explicit negative finding

The brief asks where this component touches the canvas/WebGL path. **It does not, and the negative is worth recording rather than eliding.** `CENSUS-2026-08-03.md:85-87` fixes fourier's viz architecture as *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces"*. `GalleryDraftsSection` opens no canvas, schedules no rAF, and imports nothing from `components/visualization/lib/canvas-drawing/` (1 315 LOC, `CENSUS:96-97`) — its only pixel surface is a server-rendered `<img>` thumbnail (`:76`). Its sole *contact* with the render substrate is semantic, via `basisDisplay` (`:5`), which it shares with `BasisCanvas.vue:8,250` — and that shared edge is exactly the L-5 colocation defect: the drafts list and the canvas label renderer independently re-derive the same basis-key rule. The absence of rAF/WebGL is also what makes S-4 true rather than lucky.

---

## §S — Superlatives (L-18 runs both ways)

**S-1 · The sort does not mutate the prop.** `:23-25` `props.drafts.slice().sort(…)`. Without `.slice()` this would reorder `workspace.drafts` in place inside a `computed` — a store mutation from a render dependency, the classic Vue foot-gun, and one that would corrupt the sole IndexedDB mirror. *Falsifier:* remove `.slice()` and `workspace.drafts` reorders on every recompute. It is there.

**S-2 · The `:key` is a provably unique persistent identity.** `:69` `:key="draft.imageSlug"` is the IndexedDB object-store `keyPath` itself (`draftStorage.ts:31` `createObjectStore(STORE_NAME, { keyPath: "imageSlug" })`). Uniqueness is enforced by the storage layer, not hoped for. Neither an index key nor a synthesised id — no patch-reuse bug is possible. *Falsifier:* a non-unique key would produce duplicate-key warnings and DOM reuse across sorts; the keyPath forecloses it.

**S-3 · The thumbnail loading posture is correct and complete.** `:73` fixes the box (`w-12 h-12`, `shrink-0`), `:79` `object-cover` prevents distortion, `:80` `loading="lazy"` prevents an N-request burst on mount. Zero CLS by construction, and it matches the established sibling posture (`GalleryCard.vue:103`). *Falsifier:* an unsized `<img>` or a missing `lazy` would show as layout shift / a request storm at large draft counts; neither applies.

**S-4 · Nothing to leak, and nothing missing.** Zero timers, zero `addEventListener`, zero `watch`, zero rAF, zero canvas contexts, zero async lifecycle. The only reactive state is one `ref<boolean>` (`:20`) and one pure `computed` (`:22`). There is consequently no `onUnmounted`/`onScopeDispose` — and correctly so; adding one would be noise. Against a repo whose census flags *"ConvergencePlot with its own ungated rAF"* (`CENSUS:86-87`) and whose stores need explicit `onScopeDispose` for debounce timers (`stores/workspace.ts:74-76`), a leaf that needs no teardown is the right shape. *Falsifier:* any of the above appearing in the file. None do.

**S-5 · Producer-first styling, with no local font or component shadow.** It consumes glass-ui `Button` and `MetricBadge` rather than local copies, and reaches for the producer's typographic utilities `cm-serif` (`:57`) and `fira-code` (`:84`) — both real `@utility` declarations in `@mkbabb/glass-ui/dist/styles/typography/utilities.css:65,69`, reachable because `src/style.css:3` imports `@mkbabb/glass-ui/styles`. Not dangling classes, not local `font-family` overrides. This file is a small piece of the evidence behind the census's *"deepest, cleanest consumer in the constellation"* verdict (`CENSUS:88-89`). *Falsifier:* grep for the utilities in `web/src/**/*.css` returns nothing — which reads as a dangling class until you check the producer, which defines both. Verified.

**S-6 · The nested-interactive trap is avoided by construction.** The Publish `Button` (`:91`) is a **sibling** of the two open-targets (`:72`, `:83`), not nested inside them. So no `@click.stop` is needed and none is missing — contrast `GalleryCard.vue:88`, where the admin checkbox sits inside the card's own click surface and *must* carry `@click.stop`. The row layout got this right for free. *Falsifier:* were Publish inside the `:83` div, every publish would also navigate. It is not. **Note:** this superlative is exactly what makes L-1 curable in three attributes on `:72`/`:83` with no event-plumbing risk.

---

## Tally

| | count |
|---|---|
| Defects | **15** (L-1 … L-15) |
| — BLOCKER | **1** (L-1) |
| — MAJOR | 4 (L-2, L-3, L-4, L-5) |
| — MINOR | 8 (L-6 … L-13) |
| — INFO | 2 (L-14, L-15) |
| Superlatives | **6** (S-1 … S-6) |

**Corpus rows folded:** `lane-frontend.md:110` (census row), `:344-345` (import provenance), `:472,477` (break surface) · `CENSUS-2026-08-03.md:63-65` (C-4, 7-file metric budget), `:85-89` (viz architecture + glass posture), `:337` (mounted-instance denominator OPEN), `:348-349` (ordering law), `:362` (F.W4 carries) · intake `lane-fourier-r3-r6.md:88` (R3-14), `:125` (R5-7), `:140` (R6-5/R6-6).
**Corpus contradicted, explicitly:** R3-14's ordering law does **not** literally reach `:25` (identity vs display ordering — L-13); the census break-surface rows do **not** describe a live break at the installed producer version (L-14).

**Verdict.** The file's craft is real — L-18 does run both ways here, and six of its habits are the ones the rest of the directory should copy. But it ships one documented-and-already-cured accessibility exclusion (L-1) and a props contract that cannot represent the two states its own action produces (L-2, L-3), the second of which mints duplicate public rows end-to-end with server confirmation. **DEFECTIVE.**
