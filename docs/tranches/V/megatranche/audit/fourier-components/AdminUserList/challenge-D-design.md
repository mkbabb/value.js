claude-opus-5[1m]

# CHALLENGE · `AdminUserList.vue` · axis **D — DESIGN**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminUserList.vue` (529 lines)
**Host** `web/src/components/visualization/GalleryView.vue:31` (`defineAsyncComponent`) → `:376` (`activeTab === 'users' && gallery.adminMode`)
**Pin** `@mkbabb/glass-ui@4.0.0` installed (`web/package.json:14` `^4.0.0`; `node_modules/@mkbabb/glass-ui/package.json` → `4.0.0`); producer latest **7.0.0**
**Method** static + source-derived only. No browser. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is presumed DEFECTIVE. Every claim below carries a falsifier; superlatives carry them too (L-18 runs both ways). Where a *naive* conformance read would produce a finding and the tree refutes it, I say so explicitly rather than banking the easy defect.

**Tally — 32 defects · 5 BLOCKER · 6 superlatives.**

---

## §0 · Read surface (files opened, read-only)

| File | Why |
|---|---|
| `web/src/components/visualization/gallery/AdminUserList.vue` | target |
| `web/src/composables/useOffsetPagination.ts` | `items/total/page/pageCount/loading/hasNext/hasPrev/loadPage/nextPage/prevPage` + the **unread** `error` |
| `web/src/composables/useToast.ts` | `ToastVariant` (uplift break surface) |
| `web/src/stores/auth.ts` · `web/src/lib/api.ts:566-645` · `web/src/lib/types.ts:122-135` | `AdminUserInfo`, `BatchResponse`, the 5 admin endpoints |
| `web/src/style.css` (whole) | `@utility cartoon-card`, the `--viz-amber` WCAG carry, the canonical `:focus-visible` ring, the root-size inversion |
| `web/src/components/visualization/GalleryView.vue:220,280,298-352,376` | host scroll container + the **duplicate** batch toolbar |
| `web/src/components/visualization/gallery/{AdminFlaggedPanel,GalleryCard}.vue` | `timeAgo` + spinner precedent |
| glass-ui 4.0.0 dist: `button-BNDWhAZb.js:65-73`, `glass-ui.js:314-320` (Checkbox), `components/ui/dialog/DialogContent.vue.d.ts`, `components/ui/data-table/DataTable.vue.d.ts`, `components/ui/checkbox/Checkbox.vue.d.ts`, `styles/cards.css`, `styles/tokens/offsets-sizing.css:136-152,461`, `styles/tokens/light-dark.css:17-21`, `styles/utilities/a11y-overrides.css` (whole), `styles/typography/scale.css:86`, `styles/theme/bridges.css:287-305`, `styles/components.css` (compiled `.outline-none` / `.outline-hidden`) | conformance ground truth **under the old pin** |
| `web/node_modules/tailwindcss` → **4.3.1** | `outline-none` vs `outline-hidden` semantics |
| Hitherto corpus: `formation/fourier/{lane-frontend.md,CENSUS-2026-08-03.md}`, `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` | folded, not re-invented — see §5 |

**Corpus fold.** `lane-frontend.md:102` inventories this file as *"529 · Admin user table + role dialogs"* — the descriptor is **wrong on both nouns**: there is no `<table>` (§D-11/§5) and there are no *role* dialogs (there is one destructive-confirm dialog; "role" appears nowhere in the file). `lane-frontend.md:332-335` is the only other row touching it, and it is an import census, not a design read. **The design axis on this component is un-audited hitherto** — nothing below duplicates a prior row. The adjudicated intake `lane-fourier-r3-r6.md` contains no AdminUserList row; its R5-7 finding (native-element loops invisible to callsite-keyed derivation, `ADOPT-AS-FACT`, carried to F.W4) **applies here and is not contradicted**: this file's 20-row list is a native `<div v-for>` (`:359`), so any instance denominator built on component callsites drops it — I flag that as reinforcing evidence for F.W4, not as a new claim.

---

## §1 · BLOCKERS

### D-01 · [BLOCKER] · Forced-colors mode annihilates the search field's focus indicator — and Tailwind v4 ships the safe variant this line declined
`AdminUserList.vue:243-249`

```
class="w-full rounded-md border bg-background/50 py-1.5 pl-7 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
```

Two independent facts compose into a total loss of keyboard focus visibility under Windows High Contrast / `forced-colors: active`:

1. **`outline-none` is the unsafe kill in Tailwind v4.** Compiled from the installed tailwindcss 4.3.1 (`glass-ui/dist/styles/components.css`):
   - `.outline-none{--tw-outline-style:none;outline-style:none}` — unconditional.
   - `.outline-hidden{--tw-outline-style:none;outline-style:none}` **plus** `@media (forced-colors:active){.outline-hidden{outline-offset:2px;outline:2px solid #0000}}`.

   v4 split the v3 behaviour into two utilities precisely so authors could keep the transparent-outline forced-colors escape hatch. This line took the one without it.
2. **`focus:ring-1` is a `box-shadow`, and forced-colors strips `box-shadow`.** glass-ui states the failure mode verbatim (`styles/utilities/a11y-overrides.css:57-62`): *"Windows High Contrast / forced-colors mode STRIPS `box-shadow` — so the glass focus rings (box-shadow + `outline: none`) vanish, leaving keyboard users with no visible focus."* Its restore block (`a11y-overrides.css:83-95`) is a **closed selector list**: `.focus-ring`, `.glass-btn`, `.interactive-item`, `.btn-pill`, `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`, `.input-pill`. The raw `<input>` at `:243` carries **none** of them.

The cruelty of the composition is local: the `<Checkbox>` two elements away (`:290`) *does* carry `focus-ring` in its own base class (`glass-ui.js:314`), so inside one control cluster the checkbox survives forced-colors and the search field goes dark. And the repo already ratified the correct pattern — `style.css:136-143` installs `outline: 2px solid var(--ring); outline-offset: 2px` globally for four scoped-styled classes, citing `AppHeader.vue` as *"the only pre-W4 conformant site."* This input was not added to that list.

Third aggravation: `focus:` not `focus-visible:`. Clicking the field paints the ring; the repo's own canonical block uses `:focus-visible`.

**Falsifier.** Show that (a) some ancestor or a UA stylesheet re-establishes an outline on this input under `forced-colors: active`, or (b) `.input-pill` / `.focus-ring` reaches it via a glass-ui base layer. I grepped: the element's entire class list is the 11 literals above; no `@layer base` rule in `style.css` or glass-ui's `components.css` targets bare `input`. Also falsified if fourier drops light/HC support — but `layout/DarkModeToggle.vue:33` (`useGlobalDark`) proves both arms are user-reachable.

---

### D-02 · [BLOCKER] · The select-all checkbox can never show "some" — and the `data-some` mechanism the comment describes does not exist, while glass-ui already paints indeterminate in full
`AdminUserList.vue:282-295` · `:134-150`

The comment claims a mechanism:

> *"The indeterminate visual state is carried by the `data-some` attribute on the row so the checkbox reflects partial selection in CSS."* (`:282-284`)

There is **no CSS anywhere in the repo that reads `data-some`**. `grep -rn "data-some" web/src/` returns exactly three hits, all inside this file: the comment (`:283`), the binding (`:288`), and nothing else. `style.css` (143 lines, read whole) has no `[data-some]` selector; the file's own `<style scoped>` block (`:527-529`) contains only `@reference "tailwindcss"` and zero rules. The attribute paints nothing.

Worse, it is a bad re-implementation of a state the primitive already ships completely. glass-ui 4.0.0's `Checkbox` (`glass-ui.js:314-318`) carries **both halves**:

- fill — `data-[state=indeterminate]:bg-[color-mix(in_srgb,var(--primary)_88%,var(--glass-bg-floating))] data-[state=indeterminate]:text-primary-foreground`
- glyph swap — a dedicated indeterminate icon `class="hidden h-4 w-4 group-data-[state=indeterminate]:block"` alongside the check `class="h-4 w-4 group-data-[state=indeterminate]:hidden"`

and its typed contract accepts it: `Checkbox.vue.d.ts` → `modelValue: boolean | "indeterminate"` (`CheckboxRootProps`, emit `(value: boolean | "indeterminate")`). The component computes the predicate — `someOnPageSelected` (`:138-140`) — passes it to a dead attribute, and binds `:model-value="allOnPageSelected"` (`:291`), a plain boolean.

**Consequence.** With 5 of 20 rows checked, the select-all control renders **fully unchecked**. It is the gate to a bulk toolbar whose third button is a permanent, un-undoable delete (`:331-339`), and it misreports the state of that gate. A user who sees an empty box and clicks it does not clear 5 selections — `toggleSelectAllOnPage(true)` *adds the other 15* (`:142-148`), so the destructive blast radius **quadruples** on a click that visually reads as "start selecting".

**Falsifier.** Produce a `[data-some]` rule reachable at runtime, or show reka-ui's `CheckboxRoot` deriving `indeterminate` from something other than `modelValue`. Neither exists in the installed tree. Also falsified if `someOnPageSelected` were unused — it is not; it is the sole reason the computed exists.

---

### D-03 · [BLOCKER] · WCAG 2.5.3 *Label in Name* (Level A) fails on the one irrevocable global operation
`AdminUserList.vue:264-273`

One control carries three mutually-exclusive strings:

| Channel | Value |
|---|---|
| visible label (`:272`) | `Prune empty` |
| `aria-label` (`:268`) | `Prune users with zero entries` |
| `title` (`:269`) | `Remove users with 0 entries` |

`aria-label` wins the accessible name and does **not contain** the visible text "Prune empty". SC 2.5.3 requires the accessible name to contain the visible label text. A speech-input user saying *"click Prune empty"* — reading the button — cannot activate it.

This is not a cosmetic label bug. The control it names calls `pruneEmptyUsers` (`api.ts:605-613`, `POST /api/admin/users/prune-empty`), a **server-side unbounded permanent delete** whose own dialog copy admits *"This shall permanently delete every user with zero gallery entries. The action is irrevocable."* (`:483-484`). It is the highest-blast-radius control on the surface and the only one whose name is unspeakable.

The same defect, non-blocking, repeats on all six icon buttons (`title="Suspend"` vs `aria-label="Suspend user {slug}"` — `:391-392`); there the *visible* label is an icon with no text, so 2.5.3 does not bite. See D-22.

**Falsifier.** Drop the `aria-label` (the visible text "Prune empty" is already a valid name), or extend it to *contain* the visible string ("Prune empty — users with zero entries"). Falsified only if the button's visible text were removed, which would surface a different failure.

---

### D-04 · [BLOCKER] · Selection survives filter and sort changes — batch destructive operations fire at rows the operator cannot see, and the batch confirm never enumerates them
`AdminUserList.vue:121-124` · `:156` · `:72-78` · `:101-109` · `:486-489`

The file states its own invariant:

> *"Page changes clear the selection to prevent stale slugs persisting across views."* (`:123-124`)

The enforcement is a single watcher: `watch(page, () => clearSelection())` (`:156`). But the two filter mutations do **not** move `page`:

- `watch(searchQuery, … loadPage(1))` (`:72-75`)
- `watch(sortMode, () => loadPage(1))` (`:78`)

and `useOffsetPagination.loadPage(1)` assigns `page.value = Math.max(1, Math.min(1, pageCount||1))` = **1** (`useOffsetPagination.ts:39`). If the operator was already on page 1 — the overwhelmingly common case, and the *only* case reachable immediately after typing in the search box, since search itself resets to page 1 — `page` does not change, the watcher never fires, and the selection carries into a completely different result set.

**The design failure that makes this a blocker rather than a plain bug** is what the confirmation shows at that moment. Compare the two confirm bodies:

| Path | Copy | Names its targets? |
|---|---|---|
| single delete (`:477-481`) | "This shall permanently delete user `{{ pending.slug }}` and all their gallery entries." | **yes** — the exact slug, in `font-mono` |
| batch delete (`:486-489`) | "This shall permanently delete the selected users and all their gallery entries." | **no** — "the selected users", zero enumeration |

The count appears only in the title (`:468`). So the *less* dangerous action gets the *more* specific confirmation, and the more dangerous one degrades to a pronoun — at exactly the moment the referent of "the selected" has silently become unobservable. The toolbar reads `"{{ selected.size }} user(s) selected"` (`:311`) against a list that no longer contains them, and there is no affordance anywhere in the file to review or expand the selection set.

**Falsifier.** Show `page` changing on a same-page `loadPage(1)` (it does not — `useOffsetPagination.ts:39`), or a second `clearSelection()` call site (there are two: `:156` and `:172` after a successful batch; neither covers filter change), or enumeration in the batch dialog body (`:486-497` — none). Note the mitigation this does *not* have: `askBatch` snapshots `Array.from(selected.value)` at `:106`, which freezes the stale set rather than re-deriving it against the visible page.

---

### D-05 · [BLOCKER] · Hard-coded palette literals fail WCAG 1.4.3 in light mode — on the only signifier of "suspended", and on the prune control — bypassing the contrast discipline this very repo ratified
`AdminUserList.vue:374-377` · `:264-273`

Two token-decidable failures. Both modes are user-reachable (`DarkModeToggle.vue:33`, `useGlobalDark`), and `style.css` overrides only `--viz-amber` / `--section-color-5` — **no** override of Tailwind's `amber-*` / `red-*` scale exists anywhere in `web/src`.

**(a) The suspended badge** (`:374-377`)

```
class="rounded-full bg-red-500/20 px-1.5 py-0.5 text-admin-label text-red-400"
```

Backdrop chain in light mode: the row is `.cartoon-card` → the fourier shim sets `background: var(--card)` (`style.css:110`) → glass-ui light `--card: hsl(36 48% 97%)` (`tokens/color-radius.css:72`), a warm near-white. `bg-red-500/20` over it composites to roughly `#F7D9D2` (relative luminance ≈ 0.72). Foreground `text-red-400` ≈ `#f87171` (L ≈ 0.36). Ratio ≈ **1.9 : 1** against a 4.5 : 1 requirement. `text-admin-label` is `--type-admin-label: 0.625rem` = **10 px** (`glass-ui/dist/styles/typography/scale.css:86`) — far below any large-text exemption.

This span is the **sole** rendering of `user.status === 'suspended'` (`AdminUserInfo.status`, `types.ts:127`). The row's per-user action button also swaps (`:387` / `:397`), but that is an icon-only affordance, not a state read-out. So the one moderation state the panel exists to surface is illegible in light mode.

**(b) The prune control** (`:267`)

```
class="border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 hover:bg-amber-500/20"
```

`amber-300` (≈ `#fcd34d`, L ≈ 0.68) on `bg-amber-500/10` over the page `--background` (`--neutral-0`, near-white) composites to ≈ 1.4 : 1 at `text-xs`. A catastrophic failure on the button that permanently deletes users.

**Why this is a blocker and not a routine contrast nit.** The repo has *already* fought and documented this exact battle, one file away. `style.css:113-118`:

> *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` — fails WCAG AA for normal text. The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA)."*

An amber token was measured, found at 3.54 : 1, and overridden. This component then reached past the repaired semantic token to a raw Tailwind literal that is **2.5× worse** than the value that triggered the carry. The system's own remedy is bypassed by the very axis it remedied.

Related, non-blocking (folded here rather than double-counted): `hover:text-amber-400` / `hover:text-green-400` / `hover:text-red-400` on the icon buttons (`:390`, `:401`, `:411`) are the *only* hover signal on icon-only controls; `amber-400` ≈ 1.8 : 1 and `green-400` ≈ 1.9 : 1 against a near-white row, under 1.4.11's 3 : 1 for meaningful graphical objects.

**Falsifier.** Recompute the composites — the claim dies if any fourier layer remaps `--color-amber-300` / `--color-red-400` (grep: none), if `--card` were dark in light mode (it is not — `hsl(36 48% 97%)`), or if light mode were unreachable (it is not). Exact ratios are derived, not measured: verify with a contrast checker on the composited stack for SS-13 — but the direction and the ~3× margin are not in dispute.

---

## §2 · MAJOR

### D-06 · [MAJOR] · `role="toolbar"` is asserted; the APG contract behind it is not implemented
`AdminUserList.vue:304-349`

The element declares `role="toolbar" aria-label="Batch user actions"` and hosts four focusable controls. The WAI-ARIA Authoring Practices toolbar pattern requires a **single tab stop** with roving `tabindex` and Left/Right arrow navigation between members. There is no `tabindex` binding, no `keydown` handler, and no roving-focus composable in the file (grep: zero `tabindex`, zero `@keydown` in all 529 lines).

Screen-reader users are told "toolbar, 4 items" and then find that arrow keys do nothing and Tab visits each button individually — the announced affordance contradicts the actual interaction. Declaring the role is strictly worse than omitting it: a plain `<div>` with `aria-label` and a `group` role would describe reality.

**Falsifier.** Point to a roving-tabindex implementation on this subtree, or to a glass-ui directive supplying it (none is imported; `@mkbabb/glass-ui` root exports were read — no toolbar primitive). Falsified in the other direction too: if the intent is a labelled grouping, `role="group"` is correct and free.

### D-07 · [MAJOR] · `role="list"` owns a non-`listitem` child (`aria-required-children`)
`AdminUserList.vue:352-426`

The container is `role="list"` (`:355`). Its children are the `v-for` `role="listitem"` rows (`:358-419`) **and** the empty-state block (`:422-425`), which carries no role. When `users.length === 0` the list has exactly one child and it is not a `listitem` — the failing shape axe reports as `aria-required-children` (serious).

The empty state is *inside* the list because the list wrapper is gated `v-if="!loading"` and the empty state needs the same gate; the fix is to hoist it as a sibling and let `v-else` carry it, not to nest it.

**Falsifier.** Show ARIA permitting arbitrary children under `role="list"` (it does not — required owned elements: `listitem`), or show the empty block outside the `role="list"` element (it is at `:422`, unambiguously inside the div opened at `:352` and closed at `:426`).

### D-08 · [MAJOR] · There is no error state; a failed load renders as "No users found"
`AdminUserList.vue:43-66` · `:422-425` · `useOffsetPagination.ts:31,47-49`

The composable catches fetch failures and stores them: `error.value = e instanceof Error ? e.message : "Failed to load"` (`useOffsetPagination.ts:47-49`), and exports `error` (`:75`). The component's destructure (`:43-54`) takes ten members — `items`, `total`, `page`, `pageCount`, `loading`, `hasNext`, `hasPrev`, `loadPage`, `nextPage`, `prevPage` — and **omits `error`**. Nothing in the template references it.

So a 401 (expired admin token — `auth.getAdminToken()!` is non-null-asserted at `:56`), a 500, or a dropped connection produces: `items` unchanged from the previous successful load or `[]`, `loading` false, and the template falls through to `<Users class="h-8 w-8 opacity-30" /> No users found` (`:422-425`). The operator is told the *database is empty* when the truth is *the request failed*. On an admin moderation panel, "there are no users" and "I could not reach the server" are not interchangeable readings, and the first invites exactly the wrong next action.

Note the asymmetry: every **action** failure is surfaced (six `catch` blocks, `:174-176`, `:184-187`, `:195-198`, `:206-209`, `:218-220` → `toast(..., "error")`). Only the **read** path is silent.

**Falsifier.** Find any consumption of the composable's `error`, or any `v-else-if` branch distinguishing failure from emptiness. Neither exists.

### D-09 · [MAJOR] · The "Loading overlay" is not an overlay — it is a full content swap, on every debounced keystroke
`AdminUserList.vue:276-280` · `:352-353` · `:72-75`

```html
<!-- Loading overlay -->
<div v-if="loading" …>            <!-- :276-280 -->
…
<div v-if="!loading" …role="list">  <!-- :352-357 -->
```

The comment says overlay; the code is a mutually exclusive `v-if`/`v-if(!)` pair. The entire list unmounts and is replaced by a 24 px spinner in a `py-8` box, then remounts.

Compounded by the search wiring: `watch(searchQuery, … setTimeout(() => loadPage(1), 300))` (`:72-75`). Every 300 ms pause during typing destroys and rebuilds 20 rows. The measured height delta is large — 20 rows × (2 text lines + `py-2` + 2 px border) + 19 × `gap-1.5` collapses to a single `py-8` spinner box — inside a scrolling ancestor (`GalleryView.vue:220`, `overflow-y-auto h-full`), so the scroll position of everything below it thrashes on each pause.

No `aria-busy`, no dimmed-in-place treatment, and no skeleton — although glass-ui 4.0.0 exports `Skeleton` from the package root (`dist/index.d.ts` → `export * from "./components/ui/skeleton"`; `components/ui/skeleton/index.d.ts`) and it survives the 7.0.0 export cull (not on the removed list, `lane-frontend.md:462-467`). The canonical treatment — keep the rows, set `aria-busy="true"`, dim — is one prop and one class away, in a primitive already installed.

**Falsifier.** Show the two blocks co-rendering (they cannot; `:277` and `:353` are exact complements), or show the swap is height-stable (it is not — see the geometry above). The perceptual severity of the flash is `UNPROVEN-NEEDS-LIVE`; the swap itself is structural.

### D-10 · [MAJOR] · Search results are never announced; the only live region is a page counter that does not render at small totals
`AdminUserList.vue:243-249` · `:430-457` · `:422-425`

The input is correctly labelled (`aria-label="Search users"`, `:247`) but nothing reports its outcome. The two live regions are:

- `role="status" aria-live="polite"` on the **spinner** (`:277`), announcing "Loading users" — a process, not a result;
- `<span aria-live="polite">{{ page }} / {{ pageCount }}</span>` (`:445`) — inside `<nav v-if="pageCount > 1">` (`:430-431`).

So for a query narrowing 200 users to 3, `pageCount` becomes 1, the entire `<nav>` unmounts, and a screen-reader user hears "Loading users" and then **silence**. "No users found" (`:424`) sits in no live region at all. The `{{ total }} total` read-out (`:456`) — the one datum that would answer "did my search work?" — is inside the same `pageCount > 1` gate and disappears exactly when the result set gets interesting.

Secondary: `"2 / 5"` is poor announcement prose even when it does render; `aria-label="Page 2 of 5"` on the same span costs nothing.

**Falsifier.** Find a live region covering the result count. Falsified if the pagination `<nav>` rendered unconditionally — it does not (`:431`).

### D-11 · [MAJOR] · The control-height ladder is bypassed by literals — three mismatched heights in the header row, and a coarse-pointer geometry blowout in the action cluster
`AdminUserList.vue:253` · `:267` · `:343` · `:390,401,411` · `:438,449`

glass-ui 4.0.0 encodes control heights as tokens, not literals (`button-BNDWhAZb.js:65-72`):

```
default   h-(--control-h-md)      xs   h-(--control-h-xs)
sm        h-(--control-h-sm)      icon      h/w-(--control-h-md)
                                  icon-sm   h/w-(--control-h-xs)
```
with `--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor))` etc. (`tokens/offsets-sizing.css:149-152`).

**(a) The header row has three heights.** `:237-274` places, in one `flex items-center`:
- raw `<input>` — `text-sm` (`0.875rem`/`1.25rem`) + `py-1.5` + 1 px border ⇒ **≈ 34 px**
- `<SelectTrigger class="h-8">` (`:253`) ⇒ **32 px**
- `<Button size="sm">` ⇒ `--control-h-sm` = `2.25rem` ⇒ **36 px**

A 34/32/36 stagger in a single row of three controls. `items-center` centres them, so the mismatch reads as three different vertical extents around a shared axis — the classic control-row tell. The system's own answer is one `size` prop each.

**(b) Six buttons hard-override the ladder.** `size="icon"` resolves to `--control-h-md` (40 px at `--ui-scale: 1`), then `class="h-6 w-6"` (24 px) and `class="h-7 w-7"` (28 px) override it — the icon buttons render at **60 % / 70 %** of the system's icon size. `size="icon-sm"` (= `--control-h-xs`, 28 px) exists and is unused; the `h-7 w-7` sites are byte-equivalent to it.

**(c) On a coarse pointer the cluster triples in width.** `tokens/light-dark.css:17-21` lifts `--ui-scale` to 1.5 and `--control-floor` to `--touch-target` (2.75rem = 44 px) under `@media (pointer: coarse)`; separately `a11y-overrides.css:115-121` applies `min-block-size/min-inline-size: var(--touch-target)` to `[data-size="icon"]`, and `Button` reflects `data-size` (`button-BNDWhAZb.js:34,45`). `min-*-size` raises over `height`/`width`, so on touch each 24 px button becomes a **44 px box still painted with a 14 px (`h-3.5`) glyph**. The three-button cluster goes 3×24 + 2×4 = **80 px** → 3×44 + 2×4 = **140 px**, +75 %, taken directly out of the `flex-1 min-w-0` column (`:371`) whose slug is already `truncate` (`:373`). On a narrow admin viewport the user identifier — the row's only identity — loses ~60 px of width to chrome that grew for a floor it was never going to violate.

**Explicit refutation of the naive read.** A conformance auditor would file "24 px destructive buttons defeat WCAG 2.5.5 / 2.5.8." **That is false and I am not banking it.** On coarse pointers the glass-ui floor wins (above). On fine pointers, `h-6` = `1.5rem`; the app's root is `1rem` at ≥768 px (`style.css:45-50`) ⇒ exactly **24 px**, which *meets* SC 2.5.8's 24×24 minimum with zero margin — and 27 px below 768 px, where the root is `1.125rem`. No target-size violation exists. The defect is the ladder bypass and the geometry it produces, not the target size.

**Falsifier.** Show `--ui-scale`/`--control-floor` unreachable (both are `:root`-level in installed CSS), or that tailwind-merge lets `size="icon"`'s token height beat the literal `h-6` (it does not — the `class` prop merges last). (c)'s visual consequence is `UNPROVEN-NEEDS-LIVE`; its cause is static.

### D-12 · [MAJOR] · The select-all checkbox is not in the same column as the row checkboxes it governs
`AdminUserList.vue:285-295` vs `:358-370`

| Element | Horizontal chain to the checkbox's left edge |
|---|---|
| select-all row (`:287`) | `px-1` = **4 px** |
| list row (`:362`) | `.cartoon-card` 2 px border (`cards.css:34`) + `px-3` = **14 px** |

A **10 px** offset between a master control and the column of controls it operates. Both live in the same `flex flex-col gap-3` stack (`:235`) at the same width, so the misalignment is a plain vertical-edge break — the single most legible alignment error a checklist can have, and the one an operator uses to confirm the master/detail relationship at a glance.

The same 10 px shifts the label text beside it, so the "Select all on page" / "N selected" string also fails to align with the `font-mono` slug column (`:373`), which sits at 14 px + 16 px checkbox + `gap-3` (12 px) = 42 px.

**Falsifier.** Measure the two left edges. Falsified if `.cartoon-card` contributed no border — it declares `border-width: 2px` (`cards.css:34`) and the fourier shim `@apply cartoon-surface` (`style.css:107-111`) keeps it. Falsified if the select-all block carried compensating padding — it carries `px-1`, and no margin.

### D-13 · [MAJOR] · The same batch toolbar exists twice in the same view, with four divergences
`AdminUserList.vue:304-349` vs `GalleryView.vue:308-352`

Two hand-rolled floating batch toolbars, in sibling tabs of one view, structurally identical (a `flex-1 text-xs text-muted-foreground` count, action `Button`s, a `variant="destructive"` delete with `<Trash2 class="h-3.5 w-3.5 mr-1">`, a `variant="ghost" size="icon" class="h-7 w-7"` clear-X with `aria-label="Clear selection"`) — and divergent on every positioning decision:

| | AdminUserList `:308` | GalleryView `:312` |
|---|---|---|
| anchor edge | `sticky top-2` | `sticky bottom-2` |
| stacking | `z-10` | `z-20` |
| horizontal inset | none | `mx-4` |
| shadow | `+ shadow-cartoon` | (none) |
| count copy | `N user(s) selected` | `N entr(ies) selected` |

The user reaches these by clicking adjacent tabs in one panel. Selecting items in Gallery pins the toolbar to the **bottom** of the viewport; switching to Users and selecting pins it to the **top**, at a lower elevation, flush to the gutter, with an extra drop shadow. Nothing in the semantics justifies the flip — it is the signature of copy-paste divergence, and it is exactly what a shared primitive prevents.

**Falsifier.** Show a design rationale for a per-tab anchor flip, or a shared component behind both (there is none — grep `role="toolbar"` returns two literal sites: `GalleryView.vue:310`, `AdminUserList.vue:306`). Falsified if the two toolbars were unreachable from one another — they are two clicks apart in one `GalleryView`.

### D-14 · [MAJOR] · Pagination can display an impossible page after a tail-page batch delete
`AdminUserList.vue:158-177` · `:212-221` vs `useOffsetPagination.ts:38-52`

`loadPage`'s clamp is guarded: `if (p != null) page.value = Math.max(1, Math.min(p, pageCount.value || 1))` (`useOffsetPagination.ts:39`). Every post-action reload except prune calls the **no-argument** form — `loadPage()` at `:173`, `:183`, `:194`, `:205` — which skips the clamp entirely and re-fetches at the stale `offset` (`:34`).

Delete the last 20 users while on page 3 of 3: `total` drops to 40, `pageCount` recomputes to 2, `page` stays 3, `offset` stays 40, the fetch returns `[]`. The panel then renders, simultaneously:

- `No users found` (`:424`) — the empty state, on a database with 40 users;
- `3 / 2` (`:445`) — a page index past the end;
- `40 total` (`:456`);
- `Previous` enabled, `Next` disabled (`hasNext: 3 < 2` = false).

`performPrune` gets this right — `loadPage(1)` (`:217`). Four of five reload sites do not.

**Falsifier.** Show `loadPage()` clamping without an argument (`useOffsetPagination.ts:39` — it does not), or `page` being reset elsewhere after a batch (`:172` clears the *selection*, not the page).

### D-15 · [MAJOR] · `timeAgo` is a fifth divergent copy, and it is the *worst* of the five — on the surface where dates matter most
`AdminUserList.vue:223-231` · `:379-383`

Five independent implementations exist: `AdminUserList.vue:223`, `AdminFlaggedPanel.vue:137`, `GalleryDraftsSection.vue:28`, `GalleryCard.vue:53`, `GalleryCardModal.vue:58`. They do not agree.

`GalleryCard.vue:53-61` has the sub-minute floor:
```js
if (m < 1) return "just now";
```
`AdminUserList.vue:226` does not:
```js
if (mins < 60) return `${mins}m ago`;
```

**Consequence at the render site** (`:381-382`): a user who just registered reads **"joined 0m ago · seen 0m ago"**. On the panel whose purpose is to distinguish real accounts from churn, the newest — most interesting — rows print a zero.

Neither copy caps the unit, and this is the surface where that bites: `joined {{ timeAgo(user.created_at) }}` (`:381`) on a two-year-old account prints **"joined 730d ago"**. A gallery card's relative age is fine; an admin roster's *join date* is a fact an operator cross-references against logs and support tickets, and 730d is a subtraction problem, not a date. `AdminFlaggedPanel.vue:137` at least guards null (`if (!iso) return ""`); this copy does not, so a null `last_seen_at` renders **"seen NaNm ago"** — and `AdminUserInfo.last_seen_at` is typed `string` (`types.ts:125`) with no server-side non-null guarantee visible in `api.ts:566-580`.

Third: no negative guard. Clock skew ⇒ **"seen -3m ago"**.

**Falsifier.** The five-copy count is a grep result (`grep -rn "function timeAgo"` → 5). The "0m ago" and "730d ago" outputs are direct evaluations of `:223-231`. Falsified only if `created_at`/`last_seen_at` were pre-formatted server-side — `types.ts:124-125` types both as raw ISO `string` and `:381-382` passes them straight in. `NaNm ago` is falsified if the API guarantees non-null; the TS type says `string`, so it is a contract-level claim, not a proven runtime one — tag `UNPROVEN-NEEDS-LIVE` for the null arm only.

---

## §3 · MINOR

### D-16 · [MINOR] · Duplicate selection prose, and the select-all control loses its own name
`:296-298` · `:310-312`
When anything is selected, two adjacent elements state the same fact in two different registers: `{{ selected.size }} selected` (`:297`) and `{{ selected.size }} user(s) selected` (`:311`). Worse, the first is a **ternary that replaces the control's label**: `selected.size > 0 ? \`${n} selected\` : "Select all on page"` (`:297`). The moment the affordance becomes useful — you have items selected and might want to extend to the whole page — its name is overwritten by a count that is already rendered 14 lines below. The checkbox keeps its `aria-label="Select all users on this page"` (`:292`), so the sighted label and the accessible name diverge (a soft echo of D-03). *Falsifier:* read `:297` — the ternary has no branch preserving both.

### D-17 · [MINOR] · `z-10` bypasses the shipped z-index ladder
`:308`
glass-ui compiles a token ladder — `.z-dock`, `.z-hovercard`, `.z-modal`, `.z-overlay`, `.z-popover`, `.z-toast`, `.z-tooltip` (`glass-ui/dist/styles/components.css`, `z-*{z-index:var(--z-*)}`). This toolbar picks the literal `z-10`; its twin picks `z-20` (`GalleryView.vue:312`). Neither participates in the ladder, so the ordering of the sticky toolbar against a portaled Toast (`useToast.ts`), the Dialog scrim, or the dock is undefined by construction rather than by token. *Falsifier:* show a `--z-*` rung intended for in-flow sticky chrome (the ladder is overlay-oriented; a `z-10` literal may be defensible — but then so was `z-20`, and they disagree).

### D-18 · [MINOR] · Two competing base shadows on one element
`:308`
`.cartoon-card` → `@apply cartoon-surface` (`style.css:107-108`) → `box-shadow: var(--shadow-cartoon-md)` (`cards.css:35`). The same class list then adds `shadow-cartoon`, the Tailwind utility for `--shadow-cartoon` (bridged at `theme/bridges.css:287`) — a *different* token (`3px 3px 0 0 color-mix(…foreground 8%…)`, `tokens/shadow.css:9`) than the `-md` rung. Two base `box-shadow` declarations at equal specificity, resolved by generated source order. The hover rung (`&:hover` → `--shadow-cartoon-lg`, `cards.css:45-47`) still wins on specificity, so the visible symptom is a base-state shadow that is whichever token the compiler emitted last. The twin toolbar omits `shadow-cartoon` entirely (`GalleryView.vue:312`) — so the two are shadow-divergent as well (D-13). *Falsifier:* dump the compiled order; if `shadow-cartoon` loses, the class is merely dead rather than conflicting — either way it does not belong.

### D-19 · [MINOR] · `class="h-4 w-4"` on `<Checkbox>` is a byte-identical no-op, twice
`:293` · `:368`
The primitive's own base class already contains `h-4 w-4` (`glass-ui.js:314`: `… peer relative touch-hit-area h-4 w-4 shrink-0 rounded-control …`). Both overrides restate the default. Beyond the dead bytes, they read as an intentional size decision and will mislead the next author into thinking the checkbox size is consumer-controlled here. *Falsifier:* remove them and diff the computed box — identical.

### D-20 · [MINOR] · An empty `<style scoped>` block stamps a scope attribute on every element for zero CSS
`:527-529`
```html
<style scoped>
@reference "tailwindcss";
</style>
```
`@reference` emits nothing by definition (it exists to make `@apply`/`theme()` resolvable) and there are no rules. But `scoped` is still honoured: Vue's SFC compiler adds a `data-v-*` attribute to every rendered element in a ~290-line template — 20 rows × ~9 elements plus chrome. Zero styles, a per-element attribute on every render. *Falsifier:* delete the block and diff the rendered CSS (empty either way) and the DOM (attributes disappear).

### D-21 · [MINOR] · No clear-search affordance, though `X` is already imported and used
`:243-249` · `:33` · `:347`
The field has a leading `Search` glyph and no trailing clear control. Clearing requires select-all-and-delete, then a 300 ms debounce. The `X` icon is imported at `:33` and rendered at `:347` for "Clear selection" — the exact affordance, three hundred lines away, applied to the other stateful selection on the surface but not this one. *Falsifier:* find a clear control (`:243-249` is the complete input markup).

### D-22 · [MINOR] · `title` + `aria-label` doubling on every icon button
`:269` · `:269/391-392` · `:402-403` · `:412-413`
Six controls carry both. `title` tooltips are unreachable by keyboard, invisible to touch, and here they **diverge** from the accessible name (`title="Suspend"` vs `aria-label="Suspend user {slug}"`), so a mouse user and a screen-reader user are given different labels for the same button. glass-ui 4.0.0 ships the accessible answer at two subpaths — `./tooltip` (`Tooltip`) and `./icon-tooltip` (`IconTooltip`) — neither imported. **Uplift note:** `./icon-tooltip` is REMOVED at 7.0.0 (`lane-frontend.md:462-467`); `./tooltip` survives. Reach for `Tooltip`, not `IconTooltip`. *Falsifier:* keyboard-focus a button and observe whether the `title` surfaces (it does not, by platform behaviour).

### D-23 · [MINOR] · Typography literals override the shipped scale, and the row's only quantitative data sits at the system's smallest rung
`:248` · `:253` · `:267` · `:287` · `:308` · `:310` · `:316` · `:325` · `:334` · `:362` · `:373` · `:424` · `:432`
**Thirteen** `text-xs` / `text-sm` literals (`grep -c "text-xs\|text-sm"` → 13) where glass-ui exposes a named semantic ladder (`text-micro`, `text-caption`, `text-small`, `text-admin-label` — `styles/typography/semantic.css`, regex-registered at `cn-DJXf4yaB.js:8`) and a comfort-aware control register (`--control-text-sm`, `tokens/offsets-sizing.css`). The mixture is inconsistent within one component: the meta row correctly uses the semantic `text-admin-label` (`:379`) while the toolbar count beside it uses raw `text-xs` (`:310`) for the same register.

Separately: `text-admin-label` is `0.625rem` = **10 px**, documented upstream as *"fixed sub-control micro (NOT fluid)"* (`typography/scale.css:86`). The row applies it to `{{ user.entry_count }} entries · joined … · seen …` (`:379-383`) — the **only** quantitative content in the row, and the data the `entries` sort mode (`:261`) exists to rank by. A sub-control micro rung is the wrong register for the row's payload. *Falsifier:* the rung's own upstream comment names its intent ("sub-control micro"); show the meta row is chrome rather than content.

### D-24 · [MINOR] · A hover-lift on rows that are not clickable — and under reduced motion it becomes a discrete jump
`:362`
Every row is `.cartoon-card` → `cartoon-surface` (`cards.css:31-48`), which declares `&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm); box-shadow: var(--shadow-cartoon-lg) }` with `--lift-sm: -1px` (`tokens/offsets-sizing.css:10`). The row has **no** `@click`, no `role="button"`, no `tabindex` (`:358-364`) — only its three buttons and checkbox are interactive. Hovering anywhere in the 100 %-width row promises activation the row does not offer.

Under `prefers-reduced-motion: reduce`, glass-ui's blanket carve (`a11y-overrides.css:12-16`) restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow` — dropping `translate`. The lift therefore still **applies**, but instantly: a 1 px discrete jump on hover for exactly the users who asked for less motion. Small, but the wrong direction.

**Explicit refutation of the naive read.** A conformance auditor would file "`animate-spin` at `:278` is ungated under `prefers-reduced-motion`, contra `style.css:92`." **False.** `a11y-overrides.css:6-10` applies `animation-duration: 0.01ms !important; animation-iteration-count: 1 !important` to `*:not([data-allow-motion])` globally. The spinner is gated. What *is* true, and much smaller: under PRM the spinner freezes into a static 3/4 ring (`border-2 … border-t-transparent`) that reads as a decorative circle, leaving the `sr-only` text (`:279`) as the only loading signal for a sighted PRM user — an argument for the skeleton treatment of D-09, not a motion violation. *Falsifier:* the PRM block is `!important` and unscoped; read `a11y-overrides.css:5-30`.

### D-25 · [MINOR] · A reversible action is gated behind the same modal as permanent deletion
`:101-109` · `:490-496` · `:501-506`
`askBatch('unsuspend')` opens the full destructive-confirm modal to ask *"The selected users shall be reinstated to active status."* (`:494-496`) — a fully reversible, zero-risk operation, behind the same interrupt as *"permanently delete … irrevocable."* Meanwhile the **singular** suspend/unsuspend path (`:386-407` → `handleSuspend`/`handleUnsuspend`) fires with **no** confirmation at all. So the risk ladder is inverted twice over: reversible-batch gets a modal, and reversible-single gets nothing, while the two differ only in cardinality. Every unnecessary interrupt discounts the modal for the case that needs it. *Falsifier:* show `unsuspend` to be irreversible (`api.setAdminUserStatus(token, slug, "active")`, `api.ts:582-592` — a plain status flip). Partly mitigated by S-6.

---

## §4 · INFO

### D-26 · [INFO] · The entire admin arm has zero e2e and zero axe coverage
`web/e2e/` (9 specs) — `grep -rln "adminMode\|admin" e2e/*.ts` returns **nothing**. The repo wires `@axe-core/playwright` and asserts zero serious/critical violations at three keystones (`visualization-crud.spec.ts:85-95,528,616,639`; `visualization-ux.spec.ts:28`), none of which reach `GalleryView`'s admin tabs. Combined with the census's *"vitest is ABSENT"* (`CENSUS-2026-08-03.md:256-258`), this surface has **no automated gate of any kind**. D-02, D-06 and D-07 are all axe-detectable (`aria-required-children`, `aria-*` state) and would have been caught by extending one keystone. *Falsifier:* name a spec that authenticates as admin.

### D-27 · [INFO] · `defineAsyncComponent` with no loading or error component
`GalleryView.vue:31`. The chunk boundary has no fallback: a slow or failed chunk fetch on the Users tab renders nothing, with no distinction between the two. Host-owned, but it is this component's mount boundary and it precedes every state D-08/D-09 discusses. *Falsifier:* pass `loadingComponent`/`errorComponent` (the call is the bare one-arg form).

### D-28 · [INFO] · Root-size inversion makes the admin meta row *smaller on the larger screen*
`style.css:40-50` sets `html { font-size: 1.125rem }` and `@media (min-width: 768px) { html { font-size: 1rem } }` — 18 px mobile, 16 px desktop. Every `rem`-denominated glass-ui token therefore renders **12.5 % larger on mobile** than the values its upstream comments quote. `--type-admin-label`, documented as "10px" (`typography/scale.css:86`), is 11.25 px on phones and 10 px on desktop. So the densest, most data-heavy reading context gets the smallest type. App-wide, not component-owned; recorded here because `:379` is where it lands hardest. *Falsifier:* the two rules are unconditional; compute `0.625 × 18` and `0.625 × 16`.

### D-29 · [INFO] · Coarse-pointer hit-halo clearance is ~4 px — `UNPROVEN-NEEDS-LIVE`
glass-ui's `touch-hit-area` (`a11y-overrides.css:143-170`) gives every `Checkbox` a centred 44 px `::before` on coarse pointers. Centre-to-centre from the select-all checkbox (`:290`, in a ~16 px-tall row) to the first row checkbox (`:365`, centred in a ~52 px row) computes to ≈ 48 px across `gap-3` + the 2 px border — against 22 + 22 = 44 px of combined half-extent. ~4 px of clearance, and only when nothing is selected (a non-empty selection interposes the toolbar). Derived arithmetic on `py`/`gap`/line-height; flagged for live measurement rather than asserted. *Falsifier:* measure the two hit rects on a touch device.

---

## §5 · The F.W1 tri-package uplift — what breaks, what improves

Every row cites the census break surface (`CENSUS-2026-08-03.md:102-104,185-186`) and the measured export diff (`lane-frontend.md:455-467`). The three bumps are **one atomic transaction** — `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0` (`lane-frontend.md`, "THE RESOLUTION DEADLOCK").

**BREAKS**

### D-30 · [MAJOR] · `ToastVariant` removal takes every user-facing message on this surface
`useToast.ts:4` imports `type ToastVariant`; `:9` uses it as `Record<ToastType, ToastVariant>`. The census records it as **definition-absent** at 7.0.0 — *"`grep -rn "ToastVariant" glass-ui/src/` → (empty)… This is a typecheck-breaking removal"* (`lane-frontend.md`, break table; `CENSUS-2026-08-03.md:102-104`). AdminUserList is the heaviest single consumer: **11 `toast(...)` call sites** (`:168`, `:170`, `:175`, `:183`, `:186`, `:194`, `:197`, `:205`, `:208`, `:216`, `:219` — `:170` being the per-error batch fan-out, so the *runtime* message count is unbounded). Every success and every error message on the panel routes through the broken type. With no vitest and no e2e on this arm (D-26), `vue-tsc` is the **only** thing that will catch it — which, here, is a mercy: the break is loud.

### D-31 · [MINOR] · Eight `lucide-vue-next` imports rename to `@lucide/vue`
`:25-34` — `Search, Trash2, Ban, UserCheck, Users, ChevronLeft, ChevronRight, X`. Eight of the repo's 35 sites (`lane-frontend.md` break table; glass-ui 7 peers `@lucide/vue ^1.16.0`). Mechanical.

**NOT a break — the census surface this component happens to dodge.** It imports **none** of `./metric-badge` (×7 files elsewhere), `./hover-card` (×2), `./hover-popover` (×2), `DockIconButton`/`DockDropdownTrigger` (×3). Its four glass-ui subpaths — `./button`, `./dialog`, `./select`, and root `Checkbox` — all **survive** 7.0.0 (absent from the REMOVED list, `lane-frontend.md:462-467`). Structurally, this is one of the cheaper files in the uplift.

**IMPROVES**

### D-32 · [INFO] · 7.0.0 makes three of the defects above cheaper to cure than to patch
- **`./metric` (new at 7.0.0, replacing `./metric-badge`)** is the right home for the suspended pill (`:374-377`) and the `entry_count` datum (`:380`) — the two surfaces carrying D-05(a) and D-23. Curing them by hand under the pin duplicates work the uplift retires.
- **`./chip`** (new; `./toggle-chip` folds into it) is the canonical status-pill register — again `:374-377`.
- **`DataTable` survives the cull** and already ships every mechanism this file hand-rolls: `columns/rows/total/pageSize/page/isLoading/sort` props, `@update:page`, a `row-actions` slot, an `empty` slot, and — decisively for D-11(c) — a documented `responsive` + `cardBreakpoint` container-driven card projection for narrow widths (`components/ui/data-table/DataTable.vue.d.ts`). Adopting it would retire D-06, D-07, D-09, D-12, D-13 and D-14 wholesale. It is available **today**, under the old pin. Whether the admin panel *should* become a table is a design ruling above this challenge's pay grade — but `lane-frontend.md:102` already calls the file an "Admin user table," so someone has assumed it.

---

## §6 · SUPERLATIVES — L-18 runs both ways

Each carries a falsifier. Two of these actively contradict findings a naive conformance pass would have filed.

### S-1 · [SUPERLATIVE] · `surface="opaque"` is the *new* axis, correctly, on the first try
`:461` — `<DialogContent surface="opaque" class="max-w-sm">`. `DialogContent.vue.d.ts` documents this as the shared `{glass · veil · opaque}` surface axis that **"Replaces the retired binary `variant: glass|opaque` (clean break)."** Opaque is also the right *design* call: a destructive confirmation must not let the list it is about to mutate show through the scrim. The uncommitted 3.1→4.0 sweep the lane measured (`lane-frontend.md`, "Prior-art") was 46 lines of exactly this kind of rename that other files did *not* get right on the first try. *Falsifier:* find `variant=` on any Dialog in this file — there is none.

### S-2 · [SUPERLATIVE] · The hand-rolled confirm dialog is **forward-correct**, and the obvious conformance finding against it is wrong
`:80-119`, `:459-523`. glass-ui 4.0.0 exports `./confirm-dialog` (`package.json` exports map; `components/custom/confirm-dialog/ConfirmDialog.vue.d.ts`) and this file does not use it. Under the old pin that reads as a conformance miss, and I expect other challenges to file it.

**It is not a defect.** `./confirm-dialog` is on the 7.0.0 **REMOVED** list (`lane-frontend.md:462-467`, 21 retired subpaths). Adopting `ConfirmDialog` today would manufacture a twelfth break row for F.W1 to cure. The hand-roll is the posture the uplift wants. Its shape is also right for one: a discriminated `PendingAction` union (`:83-87`) instead of parallel booleans, one dialog serving all four flows, `dialogOpen` closed *before* the await (`:113`) so the modal never hangs on a slow request. *Falsifier:* show `./confirm-dialog` surviving at 7.0.0 — the measured export diff says otherwise.

### S-3 · [SUPERLATIVE] · Icon-labelling discipline is complete, and strictly above the sibling in the same view
Eight lucide icon types across **11 render sites**, and **11/11** carry `aria-hidden="true"` (`:241`, `:319`, `:328`, `:337`, `:347`, `:395`, `:406`, `:416`, `:423`, `:443`, `:454` — `grep -c 'aria-hidden="true"'` → 11, against 11 icon elements). Every icon-only button carries a descriptive, **slug-bearing** `aria-label` — `Suspend user {slug}` (`:391`), not "Suspend" — so a screen-reader user tabbing the list always knows *whose* row they are on, which is the single hardest thing to get right in an admin table and the thing D-04's operator most needs.

The comparison proves this is not grade inflation: `GalleryView.vue:280` and `:361` render `<Layers class="h-12 w-12 opacity-30" />` — decorative, in the empty state, with **no** `aria-hidden`. Same view, same author-era; this file is better. *Falsifier:* one un-hidden decorative icon or one unlabelled icon button here. I found none.

### S-4 · [SUPERLATIVE] · Native `confirm()` supplanted, and the single-delete confirmation names its target exactly
`:80` books the intent — *"supplants native `confirm()`"* — and delivers a real upgrade: focus-managed, themed, screen-reader-navigable, non-blocking. `:477-481` then names the exact victim in `font-mono`:

> "This shall permanently delete user `{{ pending.slug }}` and all their gallery entries. The action is irrevocable."

Slug in `font-mono` so `user-a1b2` and `user-alb2` are distinguishable; *"and all their gallery entries"* states the cascade, which matches the API's actual return shape `{ deleted, entries_deleted }` (`api.ts:597`); *"irrevocable"* is the correct register. This is the standard the batch path fails to meet (D-04) — which is precisely why it counts as a superlative: the file demonstrates it knows how. *Falsifier:* any remaining `confirm(` / `alert(` — grep returns none.

### S-5 · [SUPERLATIVE] · The pagination hand-roll is correct-by-necessity and honestly booked
`:428-429` names the carry — *"a canonical glass-ui `<Pagination>` primitive is the named carry"* — and `useOffsetPagination.ts:9-18` justifies the fork in full: forked verbatim from glass-ui v0.9.3, subpath retired at v1.0 with zero constellation consumers, canonical migration per `MIGRATION.md §3.1` is "copy from v0.9.3 source," **and** it explicitly refuses the wrong easy swap — *"vueuse's `useOffsetPagination` is intentionally NOT a 1:1 swap — it is a passive page-state primitive (external `total` ref, no fetch loader). The admin call sites in this repo are active-loader-shaped."* That is a fork with a receipt, a rejected alternative, and a named carry. The lane's own census corroborates the retirement (`lane-frontend.md:226`, `:358`). *Falsifier:* find `./pagination` in glass-ui 4.0.0's export map — it is absent.

### S-6 · [SUPERLATIVE] · The confirm button's variant is severity-matched, not blanket-destructive
`:501-506`:
```
:variant="pending?.kind === 'batch' && pending.action !== 'delete' ? 'default' : 'destructive'"
```
Batch suspend/unsuspend get `default`; every genuinely irreversible path — single delete, batch delete, prune — gets `destructive`. Most hand-rolled confirms paint every confirm button red and thereby teach the operator that red means nothing. This one preserves the signal. (It does not go far enough — see D-25, which argues the reversible paths should not reach the modal at all — but the colour discipline inside the modal is right.) *Falsifier:* show a reversible action receiving `destructive`, or an irreversible one receiving `default`. Neither occurs.

---

## §7 · Ledger

| ID | Sev | Claim | Anchor |
|---|---|---|---|
| D-01 | BLOCKER | forced-colors kills the search focus ring; `outline-hidden` was the safe variant | `:243-249` |
| D-02 | BLOCKER | select-all indeterminate is dead CSS; primitive ships it whole | `:282-295` |
| D-03 | BLOCKER | WCAG 2.5.3 Label-in-Name on the irrevocable prune | `:264-273` |
| D-04 | BLOCKER | selection survives filter change; batch confirm never enumerates | `:72-78,156,486-489` |
| D-05 | BLOCKER | 1.9:1 suspended badge · 1.4:1 prune, light mode; bypasses the repo's own carry | `:376,267` |
| D-06 | MAJOR | `role="toolbar"` without roving tabindex / arrow keys | `:304-349` |
| D-07 | MAJOR | `role="list"` owns a non-`listitem` empty state | `:352-426` |
| D-08 | MAJOR | no error state; failure renders as "No users found" | `:43-54,422` |
| D-09 | MAJOR | "Loading overlay" is a full swap; `Skeleton` shipped, unused | `:276-280,352` |
| D-10 | MAJOR | results never announced; live region hides at `pageCount ≤ 1` | `:430-457` |
| D-11 | MAJOR | control ladder bypassed: 34/32/36 header, 24→44 coarse blowout | `:253,343,390` |
| D-12 | MAJOR | select-all checkbox 10 px out of the row-checkbox column | `:287` vs `:362` |
| D-13 | MAJOR | duplicate batch toolbar, four divergences, adjacent tabs | `:308` vs `GalleryView:312` |
| D-14 | MAJOR | `loadPage()` skips the clamp → renders "3 / 2" | `:173` |
| D-15 | MAJOR | 5th `timeAgo`; "joined 0m ago" / "730d ago" / `NaNm` | `:223-231,379-383` |
| D-16 | MINOR | duplicate count prose; select-all loses its label | `:297,311` |
| D-17 | MINOR | `z-10` literal bypasses the `--z-*` ladder | `:308` |
| D-18 | MINOR | `shadow-cartoon` fights `cartoon-surface`'s `-md` | `:308` |
| D-19 | MINOR | `h-4 w-4` on Checkbox = the primitive's own default | `:293,368` |
| D-20 | MINOR | empty `<style scoped>` stamps scope attrs for zero CSS | `:527-529` |
| D-21 | MINOR | no clear-search, though `X` is imported and used | `:243-249` |
| D-22 | MINOR | `title`+`aria-label` doubling, divergent strings | `:391-392` et al |
| D-23 | MINOR | 13 type literals over the semantic ladder; payload at the 10 px rung | `:379` |
| D-24 | MINOR | hover-lift on non-clickable rows; discrete 1 px jump under PRM | `:362` |
| D-25 | MINOR | reversible unsuspend gated by the destructive modal; single path ungated | `:101-109,494` |
| D-26 | INFO | zero e2e / zero axe on the whole admin arm | `e2e/` |
| D-27 | INFO | `defineAsyncComponent` with no loading/error component | `GalleryView:31` |
| D-28 | INFO | root-size inversion: meta row smaller on desktop | `style.css:40-50` |
| D-29 | INFO | ~4 px coarse hit-halo clearance — `UNPROVEN-NEEDS-LIVE` | `:290` vs `:365` |
| D-30 | MAJOR | uplift: `ToastVariant` absent at 7.0.0 → 11 call sites | `useToast.ts:4` |
| D-31 | MINOR | uplift: 8 `lucide-vue-next` → `@lucide/vue` | `:25-34` |
| D-32 | INFO | uplift improve: `./metric`, `./chip`, surviving `DataTable` | §5 |

| | Superlative | Anchor |
|---|---|---|
| S-1 | `surface="opaque"` — the new axis, right the first time | `:461` |
| S-2 | confirm hand-roll is **forward-correct** (`./confirm-dialog` dies at 7.0.0) | `:80-119,459-523` |
| S-3 | 11/11 `aria-hidden`, slug-bearing labels; above the sibling in the same view | throughout |
| S-4 | native `confirm()` supplanted; single-delete names its target in `font-mono` | `:80,477-481` |
| S-5 | pagination fork with a receipt and a rejected alternative | `:428-429` |
| S-6 | confirm-button variant severity-matched, not blanket-red | `:501-506` |

**Two naive findings explicitly refuted rather than banked:** "24 px buttons defeat the WCAG touch floor" (D-11 — the glass-ui coarse floor wins; 24 px meets 2.5.8 exactly) and "`animate-spin` is ungated under `prefers-reduced-motion`" (D-24 — `a11y-overrides.css:6-10` gates it globally with `!important`).
