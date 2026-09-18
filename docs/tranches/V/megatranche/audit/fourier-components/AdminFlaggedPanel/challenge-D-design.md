claude-opus-5[1m] (served model id)

# CHALLENGE — `AdminFlaggedPanel.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminFlaggedPanel.vue` (285 lines, incl. a 2-line `<style scoped>` that contains only `@reference "tailwindcss"` and emits no rules).

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Read-only everywhere; this file is the lane's only write. No browser tooling — every claim is static or source-derived, and the contrast figures are computed from the *compiled token values* the component actually resolves against, not guessed. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Pin.** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the same coordinate the intake lane re-verified as byte-identical to the F.W0 open (`lane-fourier-r3-r6.md` R4-9, X-4). Installed `@mkbabb/glass-ui@4.0.0` (`web/node_modules/@mkbabb/glass-ui/package.json`); producer latest `7.0.0` (`/Users/mkbabb/Programming/glass-ui/package.json`).

**Tally.** 22 defects (3 BLOCKER · 7 MAJOR · 10 MINOR · 2 INFO) · 6 superlatives.

---

## §0 — The verdict in one paragraph

This is a *carefully made* component that was designed in exactly one theme, tested by exactly nobody, and is about to be structurally invalidated by the tri-package uplift. Its accessibility scaffolding is the best in the admin family — every glyph is `aria-hidden`, every action carries a slug-bearing `aria-label`, the loading state is announced, the native `confirm()` was properly supplanted by a real focus-trapping Dialog. And then: its entire semantic palette is hardcoded Tailwind `red-300/400/500`, which measures **1.39:1** in the light theme the app ships a toggle for; every mutation unmounts the list and dumps keyboard focus to `<body>`; a failed load renders as *"No flagged content"* — a false all-clear on a safety surface; and all six of its `<Button>` callsites use props (`variant`, `size="icon"`) that do not exist in glass 7.0.0. The panel is dark-mode-only, mouse-only past the first action, and pinned.

Two findings from fourier's own prior design audit (`docs/audits/runs/2026-05-27-D-audit/design/DA-design-A3-gallery-admin.md`, findings **#7** and **#8**) are folded below and confirmed **still live, verbatim, at the same line numbers** — unrepaired for the entire interval.

---

## §1 — What the component is (so the findings have a shape)

A moderation queue. Mounted at `GalleryView.vue:380-382` behind `activeTab === 'flagged' && gallery.adminMode`, via `defineAsyncComponent` (`GalleryView.vue:32`). It renders a `role="list"` of red-tinted cards, one per flagged visualization; each card carries an identity line (Flag glyph · mono slug · flag-count pill), a meta line (owner · tier · age), an indented stack of per-flag reason/detail/reporter rows, and three ghost icon-buttons — Star ("mark acceptable"), XCircle ("dismiss flags"), Trash2 ("delete"). A cursor "Load more" `<nav>` and a destructive-confirm `<Dialog surface="opaque">` close it. Data: `GET /api/admin/flagged` (`api/routers/admin.py:509-585`) through `api.listFlaggedVisualizations` (`web/src/lib/api.ts:538-550`), envelope `{items, next_cursor, has_more}` (`types.ts:165-169`).

The `<style scoped>` block is empty of rules. **Every visual decision in this file is a Tailwind utility string in the template** — which is why the theme and uplift findings below are total rather than local.

---

## §2 — BLOCKERS

### D-1 · [BLOCKER] All six `<Button>` callsites break at F.W1; `size="icon"` is a hard `vue-tsc` break

**Where.** `AdminFlaggedPanel.vue:198-207, 208-217, 218-227` (`variant="ghost" size="icon"`), `:246-253` (`variant="ghost" size="sm"`), `:275` (`variant="ghost"`), `:276` (`variant="destructive"`).

**The tree.** Installed glass 4.0.0 declares (`node_modules/@mkbabb/glass-ui/dist/components/ui/button/Button.vue.d.ts:4-10` + `index.d.ts:4-6`):

```ts
interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant'];   // "ghost" | "destructive" | … 13 members
    size?: ButtonVariants['size'];         // "default"|"xs"|"sm"|"lg"|"icon"|"icon-sm"
}
```

Producer 7.0.0 declares (`/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-31`):

```ts
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  // "primary"|"secondary"|"quiet"|"text"
    tone?: Tone;                // "neutral"|"success"|"warning"|"info"|"destructive"
    size?: ButtonSize;
    iconOnly?: boolean;
    loading?: boolean;
}
```

`variant` is **gone** (the `_shared/axes.ts:47-50` comment is explicit: *"proof:variant-residual moves them off `variant` onto `tone`"*). `"icon"` is **not a member** of `ButtonSize` — and unlike `variant` it is a *declared* prop with a narrow union, so `size="icon"` is a type error, not a silent fallthrough. `variant="destructive"` at `:276` degrades worst: with `variant` no longer a prop it falls through to the DOM as a bare attribute and the confirm dialog's **Delete** button renders in glass 7's default `emphasis="secondary" tone="neutral"` — visually identical to the **Cancel** button beside it.

**Why it is a BLOCKER and not a MAJOR.** This is a compile break *and* a silent-degradation break on the one control in the file where a wrong click is irreversible.

**Census delta.** The census break surface [FE §5 / §3a] names `metric-badge ×7 files`, `hover-card ×2`, `hover-popover ×2`, `DockIconButton ×2`, `DockDropdownTrigger ×1`, `ToastVariant`. **The `Button` variant→emphasis/tone/iconOnly re-grammar is not on that list.** This file alone contributes 6 callsites; it is a *sixth break class*, and since `Button` is the most-used primitive in the constellation the true F.W1 budget is materially larger than the census records. Route: **F.W1**, and re-census `<Button` across all 66 SFCs before sizing the wave.

**Falsifier.** Produce a `variant` prop, an `"icon"` size rung, or a compat shim in glass 7's button surface. `src/components/button/index.ts` exports exactly `Button, ButtonProps, ButtonEmphasis, ButtonSize` — there is none.

**Cure (mechanical, 6 lines).** `variant="ghost"` → `emphasis="quiet"`; `variant="destructive"` → `emphasis="primary" tone="destructive"`; `size="icon"` → `size="sm" iconOnly` (which also retires the `h-7 w-7` class override — see D-18); `size="sm"` survives verbatim.

---

### D-2 · [BLOCKER] The panel is unshipped in light mode — hardcoded Tailwind reds fail WCAG AA by up to 3.2×

**Where.** `:166` (`border-red-500/20 bg-red-500/5`), `:172` (`text-red-400`), `:176` (`bg-red-500/20 … text-red-300`), `:191` (`text-red-300`), `:201/:211/:221` (`hover:text-blue-400 / green-400 / red-400`).

**The tree.** The app ships a real light/dark toggle: `DarkModeToggle.vue:33` `const { isDark, toggleDark } = useGlobalDark()` from `@mkbabb/glass-ui/dark`, and `style.css:115-124` maintains *separate light and dark values* for `--viz-amber` — so light mode is a first-class, actively-tuned state. Glass ships `--destructive: hsl(0 72% 50%)` with a dark arm (`glass-ui/src/styles/tokens/color-radius.css:100`; `tokens/dark-arm.css`). **This file uses none of it** — it reaches past the design system into the raw Tailwind v4 red ramp.

**The measurement.** Computed from the resolved tokens (light `--background: hsl(40 30% 98%)` = `color-radius.css:42,57`; dark `--neutral-0: hsl(24 9% 4%)` = `dark-arm.css:42`), Tailwind v4 `red-300/400/500` oklch → sRGB, WCAG 2.x relative-luminance ratio:

| surface | pair | **light** | dark | required |
|---|---|---:|---:|---:|
| flag-count pill `:176` | `text-red-300` on `bg-red-500/20` | **1.39:1** | 8.59:1 | 4.5:1 (10px text) |
| card body `:191` | `text-red-300` on `bg-red-500/5` | **1.72:1** | 10.01:1 | 4.5:1 |
| flag glyph `:172` | `text-red-400` on `bg-red-500/5` | **2.59:1** | 6.65:1 | 3:1 (1.4.11) |
| card outline `:166` | `border-red-500/20` vs page | **1.33:1** | 1.20:1 | 3:1 (1.4.11) |

In light mode the flag-count — the single number that ranks the queue — is at **1.39:1**, i.e. functionally invisible. The last row fails in *both* themes: the card's own red outline is imperceptible against the page, so the only thing separating one flagged card from the next is a 5%-alpha fill.

**Falsifier.** Show the panel cannot be reached in light mode. `GalleryView.vue:380` gates on `gallery.adminMode` only; there is no theme guard, no `.dark`-scoped mount, and `useGlobalDark` is app-global. Or recompute — the numbers above are reproducible from the four cited token declarations.

**Cure.** `--destructive` / `tone="destructive"` (both arms already tuned) for text and glyphs; `--border` for the outline.

---

### D-3 · [BLOCKER] Every mutation unmounts the list and drops keyboard focus to `<body>`

**Where.** `reload()` `:44-56` (`loading.value = true` at `:45`) ← awaited by `confirmDelete` `:94`, `handleDismiss` `:106`, `handleSetTier` `:122`. Template `v-if="loading"` `:151` / `v-else` `:157`.

**The mechanism.** The spinner and the list are `v-if`/`v-else` siblings, so `loading = true` **destroys the entire `role="list"` subtree** — including the `<Button>` the user just activated, which is the element holding focus. `document.activeElement` falls back to `<body>`. When `loading` flips false the list is re-created fresh; nothing restores focus. After the first keyboard-driven Dismiss, <kbd>Tab</kbd> restarts at the top of the document and the reviewer must traverse the entire page to reach row 2. The `Dialog` path is worse: `confirmDelete` sets `dialogOpen = false` at `:86`, reka-ui returns focus to the trigger button at `:218` — and then `reload()` at `:94` destroys that button.

**Why BLOCKER.** This makes an admin moderation queue single-use per keyboard session. It is not a cosmetic focus-ring gap; it is loss of operability (WCAG 2.4.3 focus order / 3.2.x).

**Falsifier.** Point to any focus restoration in the file (there is none — no `nextTick`, no template ref on a row, no `useFocusTrap`), or an ancestor that keeps the subtree alive: `GalleryView.vue:380-382` uses `v-if` on the tab with no `<KeepAlive>`, and the component itself is `defineAsyncComponent`'d.

**Cure, already present in the file.** `loadMore()` `:58-71` does it correctly — a *separate* `loadingMore` flag, no `v-if` swap, list never unmounted (see superlative **S-4**). Give the mutation path the same shape: a `refreshing` flag that dims rather than destroys, or re-focus the row that survived.

---

## §3 — MAJOR

### D-4 · [MAJOR] The error state is the empty state — a failed load renders "No flagged content"

`reload()`'s catch `:51-53` toasts and returns; `flaggedEntries` stays `[]`; `finally :54` clears `loading`; the template then paints `v-if="!flaggedEntries.length"` `:232-235` — a Flag glyph and **"No flagged content"**. A 500, a network drop, or an expired admin token therefore tells a moderator the queue is *clean*. There is no `error` ref in the file. On a safety surface a false all-clear is the worst available failure mode: the toast is transient, the empty state is permanent, and the two disagree.

**Falsifier.** Find an `error` ref or a third template branch. `grep -n "error" AdminFlaggedPanel.vue` → only the `"error"` toast-type string literals at `:52, :67, :96, :108, :123`.

---

### D-5 · [MAJOR] Destructive intent is colour-on-hover only, with no `focus-visible` counterpart

`:201/:211/:221` — all three actions rest at `text-muted-foreground`; the blue / green / red that distinguishes *save* from *dismiss* from **delete** arrives only under `hover:`. Keyboard users and touch users never see it. The three targets are 28px (`h-7 w-7`) at 4px separation (`gap-1`, `:197`), and **Delete sits immediately beside Dismiss** — the two actions with opposite reversibility, at rest visually identical, 4px apart. Dismiss has no confirm step; only Delete does. There is no `focus-visible:` variant anywhere in the file.

**Prior art, still live.** `DA-design-A3-gallery-admin.md` finding **#7** (P2, 2026-05-27) named exactly this at exactly these lines — *"At rest the Delete (Trash) is indistinguishable from Dismiss/Save by colour, and touch / keyboard users never see the hover tint"* — and cited `AdminFlaggedPanel.vue:201,211,221`. Unrepaired at HEAD. **I raise it to MAJOR**: the prior audit graded it P2 on general polish grounds; the compounding facts it did not have are (a) the hover tints are the *only* differentiator, (b) `focus-visible` is absent everywhere, and (c) the light-mode figures in D-2 mean the tint is sub-3:1 even when it *does* appear.

**Falsifier.** A rest-state tint or `focus-visible:` on `:221`, or a confirm step on Dismiss.

---

### D-6 · [MAJOR] Three of four mutations have no in-flight guard and no disabled state

`loadMore` guards correctly (`if (!hasMore.value || loadingMore.value) return`, `:59`) and binds `:disabled="loadingMore"` `:250`. `handleDismiss` `:101`, `handleSetTier` `:116` and `confirmDelete` `:84` do **none** of this, and none of `:198/:208/:218/:276` binds `disabled`. A double-click on Dismiss fires two `DELETE /flags` requests and stacks two toasts; a double-click on Delete fires two deletes plus two concurrent `reload()`s whose completion order decides what `flaggedEntries` ends up holding. The correct pattern is ten lines above the incorrect one.

**Falsifier.** A `disabled` binding or an in-flight ref on those four handlers/buttons.

**Uplift note.** glass 7's `Button` ships `loading?: boolean` which sets `aria-busy`, suppresses activation via `guardDisabledActivation` (`Button.vue:76-80`) and paints `[data-loading]` — the primitive that makes this a one-word fix lands with F.W1.

---

### D-7 · [MAJOR] `opacity-60` on `text-muted-foreground` fails AA in **both** themes

`:193` — `<span class="opacity-60"> ({{ flag.reporter_slug }}, {{ timeAgo(flag.created_at) }})</span>`, inside a row already at `text-admin-label text-muted-foreground` `:189`. Composited over the card:

| | measured | required |
|---|---:|---:|
| dark | **3.38:1** | 4.5:1 |
| light | **2.34:1** | 4.5:1 |

(`--muted-foreground` is `--neutral-5`, itself a *deliberately AA-tuned* rung — `color-radius.css:52` documents 5.21:1 light, `dark-arm.css:47` documents 7.64:1 dark. The `opacity-60` throws that engineering away.) The content is not chrome: it is *who reported this and when* — the reviewer's provenance for the decision.

Glass ships `--muted-foreground-strong` (`color-radius.css:86-89`) minted for precisely this "one rung less-faint" register, and its own comment says the step must be *"by-COLOUR per the canon (a neutral step, not an alpha mute)"* — this line is the anti-pattern that token exists to prevent.

**Falsifier.** Recompute; or argue the parenthetical is decorative — it carries the reporter slug, so it is not.

---

### D-8 · [MAJOR] Every mutation silently discards all accumulated cursor pages

`reload()` `:48` assigns `flaggedEntries.value = result.items` — the first 20 rows, from `fetchFlagged(null)`. A reviewer who pressed **Load more** four times to reach row 87, then dismisses one flag, is returned to rows 1–20 with the scroll position gone and 80 loaded rows destroyed. The file's own header comment `:28-29` promises the opposite: *"`flaggedEntries` accumulates across 'load more'"*. It accumulates on the read path and un-accumulates on every write path.

On a queue with no total (D-10), re-finding your position costs four more round-trips *per moderation action*.

**Falsifier.** An in-place splice, or a refetch bounded to the loaded window. Neither exists.

---

### D-9 · [MAJOR] `ToastVariant` — the panel's 8 toasts ride the census's named hard break, and its 4 success toasts are *already* indistinguishable from info

**Today.** `useToast.ts:11-15` maps `success → "default"`, identical to `info → "default"`. So the panel's four positive confirmations — `"Entry deleted"` `:93`, `` `Dismissed ${n} flags` `` `:105`, `` `Tier set to ${tier}` `` `:120` — paint exactly like an informational toast. The moderation surface has **no positive-outcome signal**; success and neutral are the same pixel.

**At F.W1.** `useToast.ts:3,9` imports `type ToastVariant` from `@mkbabb/glass-ui/toast`. `grep -rn "ToastVariant" /Users/mkbabb/Programming/glass-ui/src/` → **0 hits**; `src/components/toast/index.ts` exports `ToastOptions`, whose shape is `{title?, description?, tone?: Tone}` (`use-toast.ts:11-15`) with `TONES = ["neutral","success","warning","info","destructive"]` (`_shared/axes.ts:49-51`). This confirms census [FE §5] *"`ToastVariant` definition-absent → hard typecheck break (`useToast.ts:3,9`)"* — and adds the design consequence the census did not book: the cure is not a rename, it is **an improvement**. `tone: "success"` exists at 7.0.0 and does not exist at 4.0.0. Route: **F.W1**, and fix `VARIANT_MAP` to `Record<ToastType, Tone>` with `success → "success"` rather than mechanically re-typing `"default"` → `"neutral"`.

**Falsifier.** Find `ToastVariant` in glass 7, or a `success` variant in glass 4's toast surface that `useToast.ts` declined to use.

---

### D-10 · [MAJOR] The moderation queue has no size, anywhere in the product

Nothing in this component reports how many entries are flagged, and nothing can: `FlaggedCursorResponse` is `{items, next_cursor, has_more}` (`types.ts:165-169`) with no total, and the backend never computes one (`admin.py:509-585` — `has_more` is derived from `limit + 1`, no `count_documents`). `GalleryAdminBanner.vue:45-84` renders six `MetricBadge`s — entries · featured · saved · views · likes · storage — and **not one moderation signal**; `AdminStats` (`types.ts:110-118`) has no flagged field. A moderator opening the admin surface cannot tell a 3-item queue from a 3,000-item one without paging to the end 20 rows at a time, and the tab label carries no badge.

Six vanity metrics and zero pressure metrics is a design judgment, and it is the wrong one for the surface where wrong = irreversible deletion.

**This is a contract gap, not only a UI omission** — route to **F.W5** (the count must be added to the envelope or to `AdminStats` before any UI can show it), with the render seat at **F.W1** (glass 7 retires `./metric-badge` for `./metric`; the banner is one of the census's 7 `metric-badge` files [C-4] and is already being touched).

**Falsifier.** Any flagged count on any admin surface. `grep -rn "flag" web/src/components/visualization/gallery/*.vue` → this panel plus `GalleryCard`'s *raise-a-flag* affordance; no counter.

---

## §4 — MINOR

### D-11 · [MINOR] The reviewer's decision data sits at the smallest type rung in the system

`text-admin-label` at `:176` (flag count), `:180` (owner · tier · age) and `:189` (every reason / detail / reporter line). The token is `--type-admin-label: 0.625rem` and its own comment says *"fixed sub-control micro (**NOT fluid**)"* (`glass-ui/src/styles/typography/scale.css:86`; utility at `typography/semantic.css:213-215`). Against the app's root sizing (`style.css:39-49`: `1.125rem` below 768px, `1rem` at ≥768px) that resolves to **10px on desktop**, 11.25px on mobile — desktop being exactly where moderation is done.

The identity row `:170` sets `text-sm`, the slug `:175` overrides to `text-xs`, and the pill `:176` overrides to 10px — three type sizes in one 20px-tall row, with the `text-sm` doing nothing but setting a line-height.

**Prior art, still live.** `DA-design-A3` finding **#8** (P2), citing `AdminFlaggedPanel.vue:176,180,188-193` and prescribing: step the reason/detail lines to `text-xs`, keep 10px only for the `(reporter, time)` parenthetical. Unrepaired at HEAD, same lines. Note it composes badly with **D-7**: the parenthetical the prior audit was willing to leave at 10px is also the one carrying `opacity-60`.

---

### D-12 · [MINOR] Two `animate-spin`s with no reduced-motion branch, in a codebase with 18 PRM references

`:152` (loading spinner) and `:256` (`RotateCw`, `:class="loadingMore && 'animate-spin'"`). Neither carries `motion-reduce:animate-none`. The app's own PRM block (`style.css:92-96`) covers only `[data-state="active"][role="tabpanel"]`; there are 13 other PRM sites across `src/` and none reaches here. Glass 4's PRM resets (`styles/transitions.css:225-262`) *enumerate named transition classes* (`fade-slide-*`, `dialog-scale-*`, `dock-in`, …) and never touch `.animate-spin`; there is no global `* { animation-duration: 0.01ms }` reset anywhere in the imported sheets.

**Honest counter, stated because L-18 runs both ways.** A busy indicator is the canonical `prefers-reduced-motion` exception — it conveys state, and WCAG 2.2.2 exempts it. The `RotateCw` at `:256` is the weaker case: it is a decorative spin on a button that is *already* labelled `"Loading…"` `:259`, so the motion is redundant with the text. Graded MINOR on that basis, not MAJOR.

**Falsifier.** Any rule matching `.animate-spin` inside a `prefers-reduced-motion: reduce` block in the compiled stylesheet.

---

### D-13 · [MINOR] The nesting device is imperceptible: `border-l border-muted` at 1.13:1 / 1.01:1

`:189` — the per-flag rows are grouped by a left rule in `--muted`. Measured against the card fill: **1.13:1 dark, 1.01:1 light**. `--muted` is `--neutral-1` (`color-radius.css:84`) — a *fill* token, one rung off the page; the border token is `--border` = `--neutral-4` (`:95`). The component's only visual signal that "these lines belong to that card" is a rule you cannot see in either theme, leaving `pl-2` (8px) as the sole grouping cue — 8px of indent at 10px type.

**Falsifier.** Recompute against the compiled tokens, or argue the indent alone is the intended device — in which case the border is dead CSS and should go.

---

### D-14 · [MINOR] `role="list"` owns a non-`listitem` child

`:156-161` declares `role="list" aria-label="Flagged gallery entries"`; `:162-167` supplies `role="listitem"` rows; but `:232-235` — the empty state — is also a **direct child of that container**. ARIA 1.2 constrains `list` to own only `listitem`. The violation fires precisely in the state where it is loudest: when the list is empty, its *only* child is the illegal one, and a screen reader announces "Flagged gallery entries, list" with zero items *plus* the visual "No flagged content" copy.

**Falsifier.** An ARIA carve-out for non-`listitem` children of `list`. `aria-owns` reparenting and presentational-children roles are the only ones, and neither applies.

---

### D-15 · [MINOR] `reasonLabel` discards the typed union — an unmapped reason ships the raw wire token to a moderator

`:127-135`: `function reasonLabel(reason: string)` over `Record<string, string>` with `?? reason`. But `FlagReason` is a *closed* union — `"inappropriate" | "spam" | "copyright" | "other"` (`types.ts:139`) — and `FlagInfo.reason` is typed to it (`types.ts:143`). Widening to `string` at the boundary throws away the only mechanism that would catch a drifted map: add `harassment` server-side and the UI silently renders the literal string `harassment`, lowercase, unlabelled, in the reviewer's primary decision slot. The reason vocabulary is the taxonomy of the whole moderation surface; it deserves an exhaustiveness check.

**Falsifier.** Change the signature to `FlagReason` and the map to `Record<FlagReason, string>`; TypeScript then enforces exhaustiveness and nothing else in the file depends on the widened type (`:191` is the sole callsite).

---

### D-16 · [MINOR] `timeAgo` — "0m ago", negative durations, no absolute time, and the fifth verbatim copy

`:137-146`. (a) Floors to whole minutes, so a flag raised 20 seconds ago reads **"0m ago"**. (b) No clamp — client clock skew renders **"-3m ago"**. (c) No `<time datetime="…">` element and no `title` with the absolute timestamp, so a moderator can never recover *when* a flag was actually filed — and "2d ago" is the only temporal evidence they get for a decision that permanently destroys content. (d) It is the **fifth** copy of this function in one directory: `AdminUserList.vue:223`, `GalleryCard.vue:53`, `GalleryDraftsSection.vue:28`, `GalleryCardModal.vue:58`, and this one — the only one whose parameter is `string | null`, i.e. the five have already drifted.

**Falsifier.** A `<time>` element or a shared import. `grep -rn "function timeAgo" web/src/` returns exactly those five definitions and no shared helper.

---

### D-17 · [MINOR] The flag list is unbounded — server-side confirmed — and breaks the card's proportion

`:186-194` iterates `item.flags` with no cap, no collapse, no "+N more". The backend `$push`es **every** flag document into the array with **no `$slice`** (`api/routers/admin.py:530-548`). A brigaded entry with 60 reports therefore renders 60 rows at 10px inside a `p-3` card, driving the three action buttons — which are top-aligned in a `flex items-start` row (`:168`) and thus stay pinned at the top — an arbitrary distance from the bottom of their own card, and pushing every subsequent entry off-screen. The card has one geometry for a 1-flag item and no geometry at all for a 60-flag item.

Glass ships `./expandable-container` in both 4.0.0 and 7.0.0 — the collapse primitive is already installed.

*(Cross-axis pointer, not claimed here: `admin.py:530-548` aggregates the entire `flags` collection unscoped on every page request. That belongs to the CRUD/perf lane.)*

**Falsifier.** A server-side cap — the aggregation above has none.

---

### D-18 · [MINOR] Three icon-in-button ratios and two reds across three sibling admin tabs

Same tab strip, three geometries:

| panel | button | glyph | ratio |
|---|---|---|---:|
| `AdminFlaggedPanel.vue:198-227` | `h-7 w-7` | `h-4 w-4` | 0.571 |
| `AdminAuditLog.vue:110-114` | `h-7 w-7` | `h-3.5 w-3.5` | 0.500 |
| `AdminUserList.vue:388-414` | `h-6 w-6` | `h-3.5 w-3.5` | 0.583 |

The flagged actions read visually heavier than an identically-sized button one tab over. And the *same pill recipe* carries two different inks: `rounded-full bg-red-500/20 px-1.5 py-0.5 text-admin-label` + `text-red-300` here `:176` vs `text-red-400` at `AdminUserList.vue:376`.

Each of these `h-*` classes is also an override *against* the design system's own size token (`size="icon"`), which is why they drifted — nothing was enforcing them. glass 7's `iconOnly` + `size` rungs (`Button.vue:26,16`) make the override unnecessary; retiring them at F.W1 collapses all three geometries onto one ladder for free.

**Falsifier.** A documented per-panel size intent — the comments in all three files are silent on it.

---

### D-19 · [MINOR] Truncated identity with no recovery, and native `title` instead of the app's Tooltip

`:175` `truncate`s the slug — the sole identity of the object about to be permanently deleted — with no `title`, no tooltip, no expand. Screen-reader users get the full value through the action `aria-label`s (`:202/:212/:222`); a sighted mouse user gets `sunflower-decompos…` and no way to see the rest until the confirm dialog. Meanwhile the three actions use native `title` (`:203/:213/:223`), which does not appear on touch, cannot be styled, and is not the app's idiom: fourier carries **35 glass `Tooltip` callsites over 9 consumers** (intake `lane-fourier-r3-r6.md` **R3-7a**, ADOPT-AS-FACT, live-summed). This panel is outside that set — the one place a tooltip protects a destructive action is the one place the app declines to use its tooltip.

Route the `title`→`Tooltip` conversion with R3-7a's **F.W3** migration.

---

### D-20 · [MINOR] Prose: three names for one object, a legal-register confirm, and a broken plural

`:267-272` —

> **Delete gallery entry?** / This **shall** permanently delete the flagged **entry** `<slug>`. The action is **irrevocable**.

(a) *shall* is statutory register, not UI register; the plain form is "This will permanently delete…". (b) *irrevocable* describes grants, licences and offers; deletions are *irreversible*, and the plain-language form users actually parse under stress is **"This can't be undone."** (c) One object, three names in one component: the dialog says **gallery entry** `:267`, the toast says **Entry** `:93`, and the code says **visualization** throughout (`FlaggedVisualization`, `adminDeleteVisualization`, `setVisualizationTier`). (d) `` toast(`Dismissed ${result.dismissed} flags`) `` `:105` does not pluralize — **"Dismissed 1 flags"** — while the flag-count pill *eleven lines away* pluralizes correctly (`:177`, `flag_count === 1 ? "flag" : "flags"`). The component demonstrably knows how; it just didn't here.

**Falsifier.** A style guide mandating "shall"/"irrevocable" — `grep -rn "shall permanently\|irrevocable" web/src/` returns this file only, so it is not even an internal convention.

---

## §5 — INFO

### D-21 · [INFO] Zero automated coverage of any kind

`grep -rn "flagged" web/e2e/` → **0 hits** across 8 spec files. `web/package.json` has **no `test` script and no vitest dependency** — the census's *"vitest ABSENT"* [FE §0, §9] confirmed at the manifest. The only gates over this file are `vue-tsc` (which catches D-1's `size="icon"` and D-9's `ToastVariant`, and nothing else above) and 29 single-chromium Playwright tests that never open the tab. Every defect in §2–§4 is unguarded. This is census risk **#10** with a concrete instance: the surface where a wrong click is irreversible is the surface with no test.

### D-22 · [INFO] `getAdminToken()!` ×4 against a `string | null` return, and a setup-time unguarded fetch

`:37, :88, :102, :117` all non-null-assert; `stores/auth.ts:96-98` returns `string | null`. `reload()` fires at **module setup** (`:73`, bare call, not in a lifecycle hook) with no token check. The panel is mounted behind `gallery.adminMode` (`GalleryView.vue:380`), so in practice a token exists — but an *expired* one produces a 401 that lands in D-4's false all-clear rather than in a "session expired, sign in again" state. There is no unauthorized state in this component.

---

## §6 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The loading state is actually announced — and it is the *only* thing announced in the admin family
`:151-153`: `role="status" aria-live="polite"` plus a real `sr-only` label ("Loading flagged entries"). `AdminAuditLog.vue:119-121` carries the byte-identical spinner markup with **no role and no label** — a silent spinner. This panel and `AdminUserList.vue:277-280` are the conformant two of three. *Falsifier:* argue `role="status"` + `aria-live="polite"` is a conflict — it is not, `status` implies polite and the explicit attribute is belt-and-braces, not a contradiction.

### S-2 · `min-w-0` on the flex child — the idiom everyone forgets
`:169` `class="flex-1 min-w-0"` is the *reason* `truncate` at `:175` works at all; without it a flex item's `min-width: auto` floor makes the mono slug blow the row out instead of ellipsing. It is the single most-omitted Tailwind flex idiom and it is correct here, first try. *Falsifier:* remove it and the slug overflows rather than truncates.

### S-3 · Not one of ten glyphs leaks into the accessibility tree, and every action names its target
`aria-hidden="true"` on all ten icons (`:173, :206, :216, :226, :233, :257`), and every one of the three per-row actions plus the pager carries an interpolated, slug-bearing `aria-label` (`:202, :212, :222, :251`). A screen-reader user hears *"Delete entry sunflower-3f2, button"* — not *"button, button, button"* — which is the difference between a usable and an unusable moderation queue. The sibling `AdminAuditLog.vue:114` (`<X class="h-3.5 w-3.5" />`) shows the default the author had to beat. This is genuinely above the constellation's median.

### S-4 · The append path is written correctly — and is the cure for D-3, already in the file
`:58-71`: re-entry guard, a *separate* `loadingMore` flag that does not participate in the `v-if`, `.push(...)` rather than reassignment, and `:disabled="loadingMore"` on the trigger `:250`. The list is never unmounted, focus survives, and the button reports its own busy state in text `:259`. The correct pattern and the BLOCKER-grade wrong pattern (D-3, D-6, D-8) live thirty lines apart in one file.

### S-5 · `surface="opaque"` is the one glass API here that survives 4→7 untouched — and it is the right call
`:265`. glass 7 still declares `surface?: Surface` defaulting to `"glass"` (`DialogContent.vue:38-42, 60-61`) over `SURFACES = ["glass","veil","opaque"]` (`_shared/axes.ts:22-24`), and the component's own comment at `:418` documents `surface="opaque"` as a first-class footprint. Deliberately opting a *destructive confirm* out of the glass material — so the content you are about to destroy is not legible **through** the dialog asking whether you are sure — is a real design judgment, and the uplift ratifies it verbatim. *Falsifier:* a glass 7 `Surface` union without `"opaque"`. **Improve surface at F.W1:** 7.0.0 re-cuts the dialog's padding from flat `p-6` to a proportioned `--overlay-pad-inline` / `×1.272` block ratio (`DialogContent.vue:228`), so this dialog gains a φ-adjacent vertical rhythm for free.

### S-6 · The native `confirm()` was properly supplanted — this is the best modal in the gallery surface
`:75` (comment), `:263-279`. The reka-ui-backed `Dialog` brings the focus trap, `aria-modal`, Escape handling and return-focus that `GalleryCardModal.vue:71-83` — a hand-rolled roleless `<div>` — still lacks (`DA-design-A3` finding **#5**, also still live). `DA-design-A3`'s own §Notes reached the same verdict about this component's C.W4 wiring: *"the `role="list"`/`listitem` semantics are correct, and the confirm-dialog supplanting native `confirm()` is the right call."* I concur, with the D-14 correction to the "semantics are correct" half.

---

## §7 — The F.W1 uplift ledger for this file

| surface | 4.0.0 (pinned) | 7.0.0 | verdict |
|---|---|---|---|
| `Button variant` ×6 | `variant?: ButtonVariants['variant']` | **removed** → `emphasis` + `tone` | **BREAK** (D-1) — *not on the census break list* |
| `Button size="icon"` ×3 | `"icon"` ∈ size union | `Extract<Size,"xs"\|"sm"\|"md"\|"lg">` | **BREAK, hard `vue-tsc`** (D-1) |
| `Button size="sm"` ×1 | ✓ | ✓ | survives |
| `DialogContent surface="opaque"` | ✓ | ✓ | **survives** (S-5) |
| Dialog padding | flat `p-6` | proportioned inline/block ×1.272 | **improve** (S-5) |
| `useToast` → `ToastVariant` ×8 calls | exported | **absent** → `tone?: Tone` | **BREAK** (D-9) — census [FE §5] confirmed |
| toast `success` | maps to `"default"` | `tone: "success"` exists | **improve** (D-9) |
| in-flight guards | hand-rolled or absent | `Button loading` + `aria-busy` | **improve** (D-6) |
| icon-button geometry | `h-7 w-7` override | `iconOnly` + size rungs | **improve** (D-18) |
| hand-rolled flag pill `:176` | — | `./chip` (`tone`) / `./badge` (`tone`) | **improve** (D-2 cure lands here) |
| flag-count metric (absent) | `./metric-badge` | `./metric` | **improve** (D-10 render seat) |
| `lucide-vue-next` ×5 symbols | `1.0.0` | `@lucide/vue` rename | **BREAK** — 1 of the census's 35 sites |
| `metric-badge` / `hover-card` / `hover-popover` / dock members | — | — | **not used here** — this file is *outside* the census's 7 + 2 + 2 + 3 |

**Explicit census refinement.** The census break surface [FE §5, C-4] is accurate as far as it goes and this component confirms it does *not* touch `metric-badge`/`hover-card`/`hover-popover`/dock members. But the surface is **incomplete**: the `Button` variant→emphasis/tone/iconOnly re-grammar is a sixth break class the census does not name, and `Button` is the constellation's most-used primitive. Recommend F.W1 open with a `<Button` census across all 66 SFCs before the wave is sized.

---

## §8 — UNPROVEN-NEEDS-LIVE (SS-13)

1. **Perceived severity of D-2 in light mode.** The ratios are computed exactly; what a moderator *actually experiences* at 1.39:1 (illegible vs merely faint) wants one light-theme screenshot.
2. **D-3 focus destination.** The unmount is certain from the `v-if`/`v-else` structure; that `activeElement` lands on `<body>` rather than being retargeted by reka-ui's Dialog is the standard browser behaviour but is not statically provable. One keyboard trace confirms.
3. **D-17 at scale.** The unbounded `$push` is proven server-side; the *visual* failure mode of a 60-flag card (and whether the card scrolls or the page does) needs a seeded fixture.
4. **D-19 dialog overflow.** `max-w-sm` (24rem) with a long `font-mono` slug and no `break-all` at `:270` — plausibly overflows past ~45 characters; the real slug-length distribution is unknown.
5. **D-12 compiled-sheet check.** No PRM rule reaching `.animate-spin` was found in any imported source; a grep of the *built* stylesheet would close it absolutely.

---

## §9 — Method and limits

- Read the component whole (285 lines) and every file it imports: `stores/auth.ts`, `composables/useToast.ts`, `lib/api.ts` (the 4 called functions), `lib/types.ts` (`FlaggedVisualization`, `FlagInfo`, `FlagReason`, `GalleryTier`, `FlaggedCursorResponse`, `AdminStats`), `@mkbabb/glass-ui/button` + `/dialog` + `/toast` at the **installed 4.0.0** (dist `.d.ts` + `src/styles/`), `lucide-vue-next@1.0.0`. Plus, as comparanda: `AdminUserList.vue`, `AdminAuditLog.vue`, `GalleryAdminBanner.vue`, `GalleryView.vue`, `style.css`, `api/routers/admin.py:509-585`.
- Producer glass-ui **7.0.0** read read-only at `/Users/mkbabb/Programming/glass-ui` (`package.json` exports, `_shared/axes.ts`, `button/Button.vue` + `index.ts`, `dialog/DialogContent.vue`, `toast/index.ts` + `use-toast.ts`, `chip/`, `badge/`).
- Contrast figures computed from first principles: Tailwind v4 oklch palette → sRGB → WCAG 2.x relative luminance, compositing alpha in sRGB as browsers do, against the resolved glass tokens at the cited declaration sites. Reproducible from the four token line-refs in D-2.
- **Read-only everywhere.** No product source in any repo was touched. This file is the lane's only write.
- No browser tooling. Five livable-only claims are quarantined in §8 rather than asserted.
- **Corpus folded, not re-invented:** census `CENSUS-2026-08-03.md` [FE §5 break surface, C-4, risk #10], intake `lane-fourier-r3-r6.md` (**R3-7a** Tooltip migration budget → D-19; **R4-9 / X-4** substrate pin → header), and fourier's own `DA-design-A3-gallery-admin.md` findings **#5, #7, #8** — the latter two re-verified **still live at identical line numbers**, with #7 re-graded upward on evidence the prior audit did not hold.
