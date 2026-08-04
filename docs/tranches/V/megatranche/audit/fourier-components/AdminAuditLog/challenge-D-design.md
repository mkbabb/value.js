claude-opus-5[1m]

# CHALLENGE — `AdminAuditLog.vue` · axis **D · DESIGN**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/gallery/AdminAuditLog.vue`
(190 lines; 6,483 B; mtime 2026-06-02). Read whole, plus every file it imports.

**Substrate.** fourier-analysis HEAD `cd26c65` — the coordinate certified byte-identical to the
F.W0 scope by intake row **R4-9 (ADOPT-AS-FACT)**. Pins as installed: `@mkbabb/glass-ui ^4.0.0` /
inst **4.0.0**; producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`).

**Method.** Static + source-derived only. No browser tooling. Contrast figures are computed from
the *installed* 4.0.0 token bytes (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css`)
and the Tailwind v4.3.1 default palette, using the WCAG 2.x relative-luminance formula; each is
reproducible with arithmetic alone. Any claim that needs a live viewport is marked
**UNPROVEN-NEEDS-LIVE (SS-13)**.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Five candidate defects were filed
and then **killed by their own falsifiers** — recorded in §7, one of them promoted to a superlative.

---

## §0 — Import closure actually read

| File | Why |
|---|---|
| `web/src/components/visualization/gallery/AdminAuditLog.vue` | subject, whole |
| `web/src/composables/useOffsetPagination.ts` (83 lines) | the state machine — 13 returns, 10 consumed |
| `web/src/lib/types.ts:173-185` | `AuditEntry` / `AuditListResponse` |
| `web/src/lib/api.ts:245-256, 649-670` | `adminFetch` + `listAuditLog` |
| `web/src/stores/auth.ts:96-98, 138` | `getAdminToken(): string \| null` |
| `node_modules/@mkbabb/glass-ui/dist/components/ui/button/{index,Button.vue}.d.ts` | the **installed** Button contract |
| `node_modules/@mkbabb/glass-ui/dist/styles/tokens/light-dark.css:84-99`, `tokens/dark-arm.css:43-60` | `--muted` / `--border` / `--muted-foreground` / `--card` literals |
| `node_modules/@mkbabb/glass-ui/dist/dark.js:14-18` | theme seeding (`auto` → `prefers-color-scheme`) |
| `web/src/style.css:38-49, 83-96, 117-141` | root type scale, the tab-panel motion + its reduce guard, the `--viz-amber` carry |
| `web/src/components/visualization/GalleryView.vue:33, 385-387` | host: `defineAsyncComponent`, bare `<template v-if>` |
| **Comparanda (same family, same composable):** `AdminUserList.vue`, `AdminFlaggedPanel.vue` | the house idiom this file diverges from |
| `glass-ui/src/components/button/Button.vue:15-31`, `badge/index.ts:1-48`, `_shared/axes.ts:29-52` | producer 7.0.0 break/improve surface |

---

## §1 — Verdict

| Severity | Count |
|---|---:|
| **BLOCKER** | **4** |
| **MAJOR** | **10** |
| **MINOR** | **9** |
| **INFO** | **4** |
| **TOTAL DEFECTS** | **27** |
| **SUPERLATIVES** (L-18 reverse) | **4** |

**One-line verdict.** This is the *un-remediated twin* of `AdminUserList.vue`. The two files share a
composable, a layout skeleton, a spinner, an empty state and a pagination control; the sibling
carries a full a11y pass (`role="status"`, `sr-only`, `<nav aria-label>`, `aria-label` on every
control, `aria-hidden` on every glyph, `focus:ring-ring`) and this one carries **none of it**. On
top of that inheritance gap sit two independent failures that are this file's own: every one of its
five semantic colours is illegible in the default (light) theme, and a failed fetch is rendered to
the operator as the sentence **"No audit entries"** — an audit log affirming that nothing happened
when it means it could not ask.

---

## §2 — BLOCKERS

### D-B1 · A failed fetch renders as the affirmative empty state. The audit log lies.
**Severity BLOCKER** — state coverage + prose.
**Provenance.** `AdminAuditLog.vue:15-26` destructures **10 of the composable's 13 returns**;
`error` is not among them. `useOffsetPagination.ts:31` declares `const error = ref<string|null>(null)`,
`:47-49` catches every throw into it, `:74` exports it. `grep -n "error" AdminAuditLog.vue` → **0 hits**.
`AdminAuditLog.vue:28` is `const token = auth.getAdminToken()!` over a `string | null` return
(`auth.ts:96-98`), so a missing admin token becomes `Bearer null` → 401 → `ApiProblem` thrown in
`adminFetch` (`api.ts:245-256`) → swallowed by the same catch.
**Failure scenario.** Admin opens the Audit tab while the API is down, the token has expired, or a
429 exhausts its two retries. `loading` flips false, `items` stays `[]`, `v-if="!entries.length"`
(`:152`) fires, and the panel renders `<p class="text-sm">No audit entries</p>` (`:156`). Nothing —
no toast, no banner, no retry — distinguishes "the ledger is empty" from "I never reached the ledger."
On a compliance surface that is the single worst available output.
**The house already has the idiom.** `AdminFlaggedPanel.vue:52,67` — `toast(e.message ?? "Failed to
load flagged entries", "error")`. `AdminAuditLog.vue` imports no toast at all.
**Falsifier (applied).** *Would die if* the component rendered `error`, or `loadPage` re-threw, or
the empty branch were guarded on `!error`. None hold. *Partially blunted by*: `AdminUserList.vue:42-53`
drops `error` identically — so the **dead-error-surface** half is a family defect, not unique. The
BLOCKER stands on the consequence that is unique here: for a user list, "No users found" is merely
wrong; for an audit log it is a false statement about the system of record.

### D-B2 · All five `actionTone` branches fail WCAG 1.4.3 in the DEFAULT (light) theme.
**Severity BLOCKER** — a11y / contrast, token-decidable.
**Provenance.** `AdminAuditLog.vue:67-81` returns raw Tailwind palette inks — `text-red-300` (`:69`),
`text-amber-300` (`:72`), `text-emerald-300` (`:75`), `text-violet-300` (`:78`), `text-sky-300` (`:80`)
— over a 10 % tint of the matching `-500`. Rendered at `:134` on `text-[0.65rem]`.
**Light is the default.** `dist/dark.js:17`: `m==="dark" || ((m===null||m==="auto") && matchMedia("(prefers-color-scheme: dark)").matches)` — with no stored preference the app follows the OS, so every light-OS operator gets the light arm on first paint. `--card` light = `hsl(36 48% 97%)` (`tokens/light-dark.css:99`), relative luminance **L ≈ 0.9421**.
**Measured (WCAG 2.x, computed from the palette + token bytes):**

| branch | ink | L(ink) | contrast vs light `--card` | contrast vs dark `--card` (L≈0.0220) | AA 4.5:1? |
|---|---|---:|---:|---:|---|
| `delete*` / `prune_empty_users` `:69` | red-300 | 0.4968 | **1.81 : 1** | 7.60 : 1 | **LIGHT FAIL** |
| `set_user_status*` `:72` | amber-300 | 0.6781 | **1.36 : 1** | 10.1 : 1 | **LIGHT FAIL** |
| `set_tier*` / `dismiss*` `:75` | emerald-300 | 0.6390 | **1.44 : 1** | 9.57 : 1 | **LIGHT FAIL** |
| `batch*` `:78` | violet-300 | 0.5189 | **1.74 : 1** | 7.90 : 1 | **LIGHT FAIL** |
| default `:80` | sky-300 | 0.5791 | **1.58 : 1** | 8.74 : 1 | **LIGHT FAIL** |

100 % of branches, 100 % of rows. The dark arm passes comfortably — which is exactly why this shipped:
it was authored and reviewed in dark mode only.
**Failure scenario.** Light-OS admin opens the Audit tab. The action column — the only column that
carries semantic weight, and the one the colour was chosen to encode — is a pale wash at 1.36–1.81 : 1.
Deletions are indistinguishable from grants at a glance, which inverts the colour's entire purpose.
**Falsifier (applied).** *Would die if* the app forced `.dark` (it does not — `DarkModeToggle.vue:18,33`
uses `useGlobalDark`, seeded `auto`), or the pill sat on an opaque saturated plate (it does not —
`bg-*-500/10` is a 10 % tint that moves the backdrop luminance by <0.02), or the text qualified as
"large" (it does not — `text-[0.65rem]` = **10.4 px** at the ≥768 px root `html{font-size:1rem}`,
`style.css:46-49`; large-text relief needs ≥18.66 px bold).
**Cure exists under the CURRENT pin** — see §6 item 3.

### D-B3 · The component's entire visual chassis is drawn with a token that cannot render.
**Severity BLOCKER** — spacing/proportion, token conformance.
**Provenance.** `--muted` is a **surface-fill** token: `--muted: var(--neutral-1)`, and
`--neutral-1: light-dark(hsl(38 26% 95%), hsl(28 12% 11%))` (`tokens/light-dark.css:84`). The
**border** token is `--border: var(--neutral-4)` = `light-dark(hsl(32 26% 70%), hsl(30 16% 34%))`
(`:87`). This file uses the fill token *as a border*, at 30–40 % alpha, at every structural seam:
filter-bar container `border-muted/40 bg-muted/5` (`:87`); both input resting borders `border-muted/30`
(`:93`, `:100`); every log row `border-muted/30 bg-muted/5` (`:128`).
**Measured (alpha-composited over `--card`, then luminance-differenced):**

| declaration | site | light | dark |
|---|---|---:|---:|
| `border-muted/40` | `:87` | **1.02 : 1** | **1.07 : 1** |
| `border-muted/30` | `:93 :100 :128` | ≈ 1.01 : 1 | ≈ 1.05 : 1 |
| `bg-muted/5` | `:87 :128` | ≈ 1.00 : 1 | ≈ 1.00 : 1 |
| *(house token `border` = `--border`)* | *AdminUserList.vue:248* | *1.90 : 1* | *2.6 : 1* |

**Failure scenario.** Every border and every row plate the author wrote is a no-op in **both** arms.
25 rows of four unlabeled columns separated by nothing but `gap-1.5` (6 px). The delivered artefact
is not a quieter version of the intent — the intent (a bordered filter bar and 25 bordered row cards)
simply does not exist on screen. Combined with **D-M1** (no column headers) the log has neither
ruling nor labelling.
**Honest scoping.** This breaches no numbered success criterion — a purely decorative container edge
is outside 1.4.11. It is filed BLOCKER on the **design** axis because the authored composition is
not delivered at all. Note also that even the correct house token lands at 1.90 : 1, still under the
3 : 1 non-text floor — so the minimum cure is `border-border`, and the residual is an upstream
glass-ui token question worth a BH-inbox line.
**Falsifier (applied).** *Would die if* `--muted` were the border token (it is not: `--muted:
var(--neutral-1)`, `--border: var(--neutral-4)` — both grepped from the installed dist), or if a
local override redefined it (`grep -n -- "--muted" web/src/style.css` → no redefinition; only
`--viz-amber` / `--section-color-5` are overridden, `style.css:117-129`).

### D-B4 · **UNBOOKED uplift break** — glass-ui 7.0.0 renames `Button`'s `variant` → `emphasis` and deletes `size="icon"`. Blast radius 37 files.
**Severity BLOCKER** — glass conformance under the old pin / F.W1 planning.
**Provenance.** Installed 4.0.0: `dist/components/ui/button/index.d.ts` —
`variant?: "link"|"default"|"solid"|…|"secondary"|"accent"|"ghost"|"glass"|…`, `size?: "default"|"xs"|"sm"|"lg"|"icon"|"icon-sm"`.
Producer 7.0.0: `glass-ui/src/components/button/Button.vue:15-31` —
```
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // ← no `variant`
    tone?: Tone;
    size?: ButtonSize;           // ← no "icon"
    iconOnly?: boolean;          // ← the silhouette moved to its own axis
```
`_shared/axes.ts:11-18` codifies the law that made this happen: *"A SILHOUETTE word (a `cell` tile,
an `icon`-only button, a `card` shape) NEVER appears in a `size` union."*
**This file's two sites:** `:103` `<Button variant="secondary" size="sm">`; `:106-109`
`<Button variant="ghost" size="icon">`. Under 7.0.0 both are **unknown props** → hard `vue-tsc`
failure, the same class as the census's booked `ToastVariant` break.
**Blast radius (measured, live tree):** `grep -rl "<Button" web/src | wc -l` → **37 files**;
`grep -rn 'size="icon"' web/src | wc -l` → **38**; `grep -rn 'variant="' web/src | wc -l` → **124**.
**The corpus does not book this.**
`grep -n 'emphasis\|size="icon"\|variant="ghost"\|ButtonEmphasis' formation/fourier/lane-frontend.md
formation/fourier/CENSUS-2026-08-03.md` → **0 hits**. The census's enumerated break surface
[CENSUS §3a "The uplift break surface"; lane-frontend.md:472-478] is `metric-badge` ×7 files +
`hover-card`/`-popover` ×4 + dock members ×3 + `ToastVariant` ×1 + the lucide rename = **15 files
of component surface**. The Button rename alone is **37 files** — larger than the whole booked
surface combined, and it is the [P1] `ToastVariant` break multiplied by 37.
**Failure scenario.** F.W1 is planned as an atomic tri-package transaction against a 15-file cure
budget [CENSUS §6 F.W1]. It opens, `vue-tsc` returns ~160 errors across 37 files that no wave spec
anticipated, and the atomic transaction cannot be split (the resolution deadlock, [FE §5 🔴]).
**Falsifier (applied).** *Would die if* 7.0.0 kept a `variant` alias (`grep -n "variant" glass-ui/src/components/button/Button.vue` → only `ButtonEmphasis`/`ButtonProps`; no alias), or if `Size` still carried `"icon"` (`axes.ts:31` — `SIZES = ["xs","sm","md","lg","xl"]`), or if lane-frontend booked it (grep → 0).
**Extension, not contradiction.** I am adding a row to the census break surface, not disputing one.
Census C-4 is upheld independently: AdminAuditLog is **not** one of the 7 `metric-badge` files —
its imports (`:2-8`) are `vue`, `glass-ui/button`, the local composable, the auth store, `lib/api`,
`lib/types`, `lucide-vue-next`. Nothing else.

---

## §3 — MAJORS

### D-M1 · Four unlabeled columns; no table semantics anywhere.
**MAJOR.** `:125-148` renders each entry as an independent `<div class="grid grid-cols-[auto_auto_1fr_auto]">`
of four bare `<span>`s. No `<table>`, no `role="table"/"row"/"columnheader"`, no header row, no
`<caption>`, no `aria-label` on the list region.
**Failure scenario.** A screen-reader operator hears each row as one undifferentiated run:
*"Jul 27, 2026, 03:14:22 PM set_tier w/spiral-3 a3f9c21b04"* — with no cue that the last token is an
IP hash or the third a target. A sighted operator has the same problem visually: nothing on screen
names any column. Because each row is its **own** grid, the tracks are also computed independently —
`auto` column 2 sizes to that row's action string, so the target column's left edge steps left and
right down the page (`set_tier` 8 chars vs `batch_set_visibility` 20 chars at `tracking-wide` mono).
The one column that *is* aligned is the timestamp, and only because `tabular-nums` (`:130`) pins it.
**Falsifier (applied).** *Would die if* a shared grid context existed (the wrapper `:124` is
`flex flex-col gap-1.5`, not a grid — each row's `grid` is its own formatting context), or if any
`role`/`aria` attribute appeared in `:124-148` (none does).
**Seat exists at both pins** — see §6 item 5.

### D-M2 · The log answers *what/when/where-from* and never *who* — and does not say so.
**MAJOR** — prose / information design. `types.ts:173-178`: `AuditEntry = { timestamp, action, target, ip_hash }`.
There is no actor field. The UI's response is to render `entry.ip_hash.slice(0, 10)` (`:146`) in an
unlabeled fourth column at `text-[0.65rem] text-muted-foreground` — a 10-character opaque prefix
presented as the only identity proxy, with no legend, no header, and no statement that admin
identity is not recorded.
**Failure scenario.** An operator investigating "who suspended this user" reads `a3f9c21b04`, cannot
resolve it, and either assumes it identifies a person (it does not — it identifies a hashed network
origin, shared across an office NAT) or assumes the log is broken. Both are worse than an honest
"actor: not recorded".
**Falsifier (applied).** *Would die if* the schema carried an actor (`grep -n "AuditEntry" -A 12
types.ts` → four fields, verified), or if any label/legend existed in the template (`grep -n
"ip\|hash\|Origin\|Actor" AdminAuditLog.vue` → only `:144,:146`, both bare bindings).

### D-M3 · `hasFilters` reads DRAFT state, not APPLIED state.
**MAJOR** — state coverage. `:52` — `computed(() => !!(actionFilter.value || targetFilter.value))`
over the two `v-model` refs, which are the *unsubmitted* box contents. The applied filter lives
nowhere: `fetchFn` reads `actionFilter.value` at request time (`:32-33`).
**Failure scenarios.** (a) Type one character into "action" and the clear-X (`:107`) appears although
nothing is filtered. (b) Apply `action=delete`, then manually select-all-delete the box text without
pressing Apply: the X vanishes and the empty-state counsel (`:157`) is suppressed, while the list on
screen is still the filtered result — the UI now denies a filter it is displaying. (c) Same state,
press Next: `nextPage()` → `loadPage` → `fetchFn` reads the now-empty refs and silently returns
*unfiltered* page 2, so page 1 and page 2 come from different queries.
**Falsifier (applied).** *Would die if* `applyFilters` (`:42-44`) snapshotted the values into a
separate applied-ref (it does not — it only calls `loadPage(1)`).

### D-M4 · The pagination control is a raw-`<button>` re-implementation of a control the sibling ships fully remediated.
**MAJOR** — glass conformance + a11y + internal consistency.
`AdminAuditLog.vue:164-184` vs `AdminUserList.vue:428-456` — same composable, same shape:

| | AdminAuditLog | AdminUserList |
|---|---|---|
| landmark | `<div>` `:164` | `<nav aria-label="User list pagination">` `:430,:433` |
| control | raw `<button class="rounded border px-2 py-1">` `:168,:176` | glass `<Button variant="ghost" size="icon">` |
| accessible name | **none** | `aria-label="Previous page"` `:440` / `"Next page"` `:451` |
| page counter | `<span>{{ page }} / {{ pageCount }}</span>` `:175` | `<span aria-live="polite">` `:445` |
| affordance | text "Prev"/"Next" | `ChevronLeft`/`ChevronRight` + `aria-hidden` |

`AdminUserList.vue:428-429` even carries the standing carry note — *"a canonical glass-ui
`<Pagination>` primitive is the named carry"* — which this file neither honours nor references.
**Failure scenario.** SR operator tabs to the pagination: two buttons announced as "Prev, button" /
"Next, button" with no region context; activating them changes 25 rows of content with **zero live
announcement** (the counter is not `aria-live` here). The same operator on the Users tab gets the
full treatment. Two admin panels, two accessibility standards.
**Falsifier (applied).** *Would die if* AdminUserList used raw buttons too — it does not
(`grep -n 'aria-label="Previous page"' AdminUserList.vue` → `:440`).

### D-M5 · The loading block is the sibling's block with the a11y attributes deleted.
**MAJOR** — a11y. `AdminAuditLog.vue:119-121`:
```
<div v-if="loading" class="flex justify-center py-8">
    <div class="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
</div>
```
`AdminUserList.vue:277-280` and `AdminFlaggedPanel.vue:151-153` are byte-identical **plus**
`role="status" aria-live="polite"` on the wrapper and (`AdminUserList.vue:279`)
`<span class="sr-only">Loading users</span>`.
**Failure scenario.** First paint and every page change are completely silent to assistive tech; the
operator hears nothing between activating Next and the content swapping under them. Both siblings
announce.
**Falsifier (applied).** *Would die if* the wrapper or an ancestor carried a live region —
`grep -n "aria-live\|role=\"status\"\|sr-only" AdminAuditLog.vue` → **0 hits** in the whole file.

### D-M6 · Both filter inputs are labelled by `placeholder` only.
**MAJOR** — a11y (WCAG 3.3.2 / 4.1.2). `:89-95` and `:96-102` carry `placeholder="action (e.g.
delete, set_tier)"` / `"target (substring match)"`, no `aria-label`, no `<label>`, no
`aria-labelledby`. The sibling's search input carries `aria-label="Search users"`
(`AdminUserList.vue:247`).
**Failure scenario.** The placeholder — which is also the field's only documentation of its syntax
("substring match") — is destroyed by the first keystroke. A user who returns to a partially typed
form, or who uses voice control ("click action"), or who navigates by form-field list, has no name
for either box. Two adjacent identically styled text inputs become indistinguishable.
**Falsifier (applied).** Placeholders *do* contribute a last-resort accessible name in most AT, so
the fields are not strictly nameless. The claim survives on (a) the name being destroyed by input,
(b) the syntax documentation being destroyed with it, (c) the dispositive divergence from the
sibling one directory-mate away.

### D-M7 · `focus:outline-none` removes the focus indicator and replaces it with a 2.39 : 1 hairline — and it is `focus:`, not `focus-visible:`.
**MAJOR** — a11y (2.4.7 / 2.4.11) + house-law violation.
`:93` and `:100` — `border border-muted/30 … focus:border-muted-foreground/60 focus:outline-none`.
**Measured.** Focused border = `--muted-foreground` (`--neutral-5`, light `hsl(30 22% 40%)`) at 60 %
over `--card` → **L ≈ 0.3647** → **2.39 : 1** against the adjacent card, under the 3 : 1
focus-indicator floor. The resting border is `border-muted/30` ≈ 1.01 : 1 (D-B3), so the entire
focus signal is a 1 px hue shift on an edge that was invisible to begin with.
**House law.** `style.css:132-141` codifies the repo's own `:focus-visible` ring (the D.W4.d block,
`outline: 2px solid var(--ring); outline-offset: 2px`), and `AdminUserList.vue:248` uses
`outline-none focus:ring-1 focus:ring-ring`. This file uses neither `--ring` nor `focus-visible`.
**Failure scenario.** Keyboard operator tabs through the filter bar: the browser's default focus
ring is suppressed and nothing legible replaces it, so focus position is unknowable in light mode.
Separately, `focus:` (not `focus-visible:`) paints the state on mouse click, so the indicator is
both absent when needed and present when not.
**Falsifier (applied).** *Would die if* a scoped or global rule restored a ring on these inputs —
the scoped block (`:188-190`) contains only `@reference "tailwindcss";`, and the global
`:focus-visible` rule (`style.css:132-136`) is scoped to four named link classes, none of which
appear here.

### D-M8 · `text-[0.65rem]` — a magic 10.4 px, applied to the two least-legible columns.
**MAJOR** — typography. `:134` (action pill) and `:143` (ip hash). `0.65rem` × the desktop root
(`html{font-size:1rem}` at ≥768 px, `style.css:46-49`) = **10.4 px**; on mobile the root is
`1.125rem` so it renders **11.7 px** — the desktop, where audit review actually happens, gets the
*smaller* text. It is the only arbitrary `text-[…]` value in the file (everything else is
`text-xs`/`text-sm`), i.e. an off-scale rung minted inline.
**Failure scenario.** The action pill is 10.4 px **uppercase, mono, `tracking-wide`** — the three
choices that most reduce x-height legibility, stacked — carrying the row's semantic payload. The
hash column is 10.4 px hexadecimal, the string type most sensitive to size. Both are below the
practical 12 px UI floor, and both compound D-B2's contrast failure (small text is precisely where
4.5 : 1 is non-negotiable).
**Falsifier (applied).** *Would die if* the root were larger on desktop (it is smaller — verified
`style.css:39-49`) or if `text-[0.65rem]` matched a token rung (`grep -n "0.65rem" web/src/style.css`
→ no hits; it matches nothing).

### D-M9 · Zero responsive treatment in a fixed four-column data grid.
**MAJOR** — proportion. `grep -c "sm:\|md:\|lg:" AdminAuditLog.vue` → **0**. `grid-cols-[auto_auto_1fr_auto]`
(`:128`) is unconditional; there is no stacked/card layout, no column drop, no `min-w-0` need
(see S-3), and no `whitespace-nowrap` on the timestamp.
**Mechanism (static).** Under width pressure the `1fr` target track collapses first (correctly —
S-3), then the two `auto` tracks must shrink to min-content. The timestamp `<span>` (`:130-132`) has
spaces, so its min-content is one word (`"03:14:22"`) — it **wraps to two or three lines**. The
action pill (`:133-138`) has none — `batch_set_visibility` is unbreakable at mono/uppercase/
`tracking-wide` — so it holds full width. `items-center` (`:128`) then vertically centres a 3-line
timestamp against a 1-line pill, and the row's height triples while its neighbours stay single-line.
**Failure scenario.** An admin auditing from a phone or a narrow split pane gets a ragged list of
alternating 1-line and 3-line rows in which the timestamp — the log's primary sort key — is the
thing that broke.
**UNPROVEN-NEEDS-LIVE (SS-13):** the exact viewport at which wrapping begins (estimated ~340–380 px
from mono advance widths). The mechanism is static and stands.
**Falsifier (applied).** *Would die if* any breakpoint modifier or `whitespace-nowrap` existed
(`grep -n "nowrap\|sm:\|md:\|lg:" AdminAuditLog.vue` → 0 hits).

### D-M10 · Paging collapses the panel by ~800 px, throwing the control out from under the pointer.
**MAJOR** — motion / interaction proportion. The row list is `v-else` on the loading flag (`:119`
vs `:124`), so the entire list unmounts for the duration of the request and is replaced by a
`py-8` spinner block ≈ 56 px tall. Twenty-five rows at ≈ 34 px (`py-1.5` + `text-xs` line box +
`gap-1.5`) ≈ **850 px**.
**Failure scenario.** Operator clicks **Next** (`:176-182`). The list vanishes, the page shortens by
~800 px, the pagination control leaps up the viewport, the scroll position clamps, and when the rows
return the control jumps back down — under a cursor that is now somewhere else. Repeat for every page.
**Shared, not unique** — `AdminUserList.vue:277` / `:353` have the same `v-if`/`v-if="!loading"`
split. Recorded as a family defect so the cure is written once.
**Cure available under the CURRENT pin:** glass-ui 4.0.0 already exports `Skeleton`
(`dist/index.d.ts:28` — `export * from "./components/ui/skeleton"`). Twenty-five skeleton rows hold
the box.
**Falsifier (applied).** *Would die if* the list were `v-show` or the container had a `min-h-*`
(neither: `:124` is `v-else` on a `flex flex-col gap-1.5` with no height constraint).

---

## §4 — MINORS

- **D-m1 · Decorative glyphs missing `aria-hidden="true"`** — `:88` (`FilterIcon`), `:114` (`X`),
  `:155` (`ScrollText`). The house applies it universally: `AdminUserList.vue:241,319,328,337,347,423`;
  `GalleryView.vue:323,350`. *Falsifier:* would die if the house omitted it — it does not, 6 sites in
  the sibling alone. Consequence: the empty state announces a meaningless glyph before its message.
- **D-m2 · The clear-filters button names itself with `title` only** — `:106-115` carries
  `title="Clear filters"` and no `aria-label`. `title` is the last-resort accname fallback, is not
  surfaced on touch, and diverges from `GalleryView.vue:347` (`aria-label="Clear selection"` + an
  `aria-hidden` glyph). *Falsifier:* `title` does compute a name, so the control is not nameless —
  the claim rests on the touch gap and the divergence.
- **D-m3 · Empty-state proportion drift** — `py-10` (`:153`) against the house `py-8`
  (`AdminUserList.vue:422`) with an identical `h-8 w-8` glyph and `text-sm` line. Two units of
  unexplained divergence in a family that is otherwise pixel-identical.
- **D-m4 · Truncated values disclose only on hover** — the elided target (`:139`, `truncate` +
  `:title`) and the sliced hash (`:146`, `.slice(0,10)` + `:title` at `:144`). `title` on a
  non-focusable `<span>` reaches neither keyboard nor touch, so those operators cannot read a
  truncated audit target **at all**. Note the obvious cure is a trap: `HoverCard` is **removed at
  7.0.0** (see §6) — route to `Tooltip` (present at both pins) or a copy affordance.
- **D-m5 · The record count is hidden exactly when it is cheapest to show** — `{{ total }} total`
  (`:183`) lives inside `v-if="pageCount > 1"` (`:165`), so with ≤25 entries the operator is never
  told how many entries exist. That is the case where "3 total" most reassures.
- **D-m6 · `animate-spin` (`:120`) is ungated under `prefers-reduced-motion: reduce`.** The repo's
  only reduce block (`style.css:92-96`) covers `[data-state="active"][role="tabpanel"]`; the JS-gate
  precedent is `decorative/SvgFilters.vue:7-9`. **Honest scope:** a status spinner is defensible
  under 2.2.2 (essential, typically <5 s), so this is a vestibular-comfort and house-consistency
  note, *not* an SC failure. It extends the corpus's booked reduced-motion gap
  [CENSUS §3a; lane-frontend.md:624; P3 #9] from the two rAF clocks to a third site class —
  CSS-keyframe spinners, 3 gallery files.
- **D-m7 · The panel has no heading and no `role="tabpanel"` association.** `GalleryView.vue:385-387`
  mounts it inside a bare `<template v-if="activeTab === 'audit' && gallery.adminMode">`;
  `grep -n "tabpanel" GalleryView.vue` → **0 hits**. Two consequences: (a) no programmatic link from
  the "Audit" tab to the content it controls; (b) the house tab-entrance animation **and its
  reduced-motion guard** (`style.css:83-96`, selector `[data-state="active"][role="tabpanel"]`)
  never match — the motion treatment the repo deliberately authored is silently absent from all four
  gallery tabs. *Falsifier:* would die if the glass tabs primitive injected the role onto sibling
  content — it cannot; the panels are not its children (`GalleryView.vue:225-226` passes only
  `:model-value`).
- **D-m8 · Visual hierarchy inverts the reading order.** `text-foreground/80` on the target (`:139`)
  drops the single most operationally important datum — *what was acted on* — below full ink, while
  metadata (timestamp, `text-muted-foreground`) and the action (a saturated pill) outrank it. An
  operator scans target → action → timestamp; the page ranks action → timestamp → target.
- **D-m9 · `disabled:opacity-30` (`:170`, `:178`) reduces the disabled label to ≈ 1.49 : 1** over
  light `--card` (computed: `--muted-foreground` at 30 % → L ≈ 0.6141). **WCAG explicitly exempts
  inactive components from 1.4.3, so this is not an SC failure** — filed because at 1.49 : 1 the
  control does not read as *unavailable*, it reads as *absent*, and the operator loses the
  affordance's existence rather than its state. `opacity-50` + `cursor-not-allowed` is the
  conventional floor.

---

## §5 — INFO

- **D-i1 ·** `<style scoped>` containing only `@reference "tailwindcss";` (`:188-190`) emits zero
  rules but still makes Vue stamp a `data-v-*` scope attribute on every template element — 5 per row
  × 25 rows, for nothing. Either add a rule or drop the block.
- **D-i2 ·** `:key="`${entry.timestamp}-${i}`"` (`:127`) folds the array index into the key, so keys
  are position-dependent and every row re-keys on page change. (The diffing consequence belongs to
  the correctness axis; noted here because it also forecloses any row-level enter transition.)
- **D-i3 ·** `loadPage(1)` fires at setup top level (`:40`), not in `onMounted`, with no abort on
  unmount. Benign under `defineAsyncComponent` (`GalleryView.vue:33`) but it means switching tabs
  mid-flight leaves an in-flight admin request with no cancellation path.
- **D-i4 ·** `import { ScrollText, Filter as FilterIcon, X } from "lucide-vue-next"` (`:8`) — 1 of
  the 35 rename sites [lane-frontend.md:478; CENSUS §3a].

---

## §6 — Uplift break/improve surface (glass ^4.0.0 installed · producer 7.0.0)

**Breaks in THIS file**

1. **`Button` `variant` → `emphasis`; `"ghost"` → `"quiet"`; `size="icon"` → `iconOnly`** — `:103`,
   `:108-109`. **Unbooked in the corpus; 37-file blast radius.** Full treatment at **D-B4**.
2. **`lucide-vue-next` → `@lucide/vue`** — `:8`. Booked [lane-frontend.md:478].

**Explicitly NOT on this file's break list** (verified by reading `:2-8`, so the wave budget is not
inflated): `metric-badge` (census **C-4**'s 7 files are EquationView, InfoCard, AnimationControls,
EditorControlsDock, EquationPanel, GalleryAdminBanner, GalleryDraftsSection — **not** this one);
`hover-card` / `hover-popover`; the dock members `DockIconButton` / `DockDropdownTrigger`;
`ToastVariant`. **No contradiction with the census.**

**Improvements — two of them do not need the uplift**

3. **`Badge` retires `actionTone` entirely and CURES D-B2 — available at the CURRENT pin.**
   4.0.0 already ships it: `dist/badge.d.ts` → `badgeVariants` with
   `variant: default|destructive|outline|secondary|success|warning|info`, `size: sm|md|lg`.
   7.0.0 refactors it onto the shared tone axis (`glass-ui/src/components/badge/index.ts:9-19`):
   `<Badge tone="destructive|success|warning|info|neutral" surface="loud|glass">`, painted from
   `--destructive` / `--warning` / `--success` / `--info` **with their `-foreground` pairs**, which
   are light-and-dark resolved. Adopting it deletes `AdminAuditLog.vue:67-81` and D-B2 with it.
   *The one genuine gap:* `actionTone`'s violet `batch*` branch (`:77-79`) has **no home** in the
   5-member grammar `TONES = ["neutral","success","warning","info","destructive"]`
   (`_shared/axes.ts:51`). Four of five map cleanly (red→`destructive`, amber→`warning`,
   emerald→`success`, sky→`info`); `batch` does not. → **ADOPTION-ASK for the glass-ui BH inbox**
   under the standing relay law, or route `batch` to `variant="outline"` and keep the tone axis honest.
   Note the 4→7 shape change is itself a break for any *other* consumer already on
   `<Badge variant="destructive">` — a tone is not a style, per the producer's own prop doc.
4. **`Skeleton`** — `dist/index.d.ts:28`, present at 4.0.0. The house cure for **D-M10**, no uplift
   required.
5. **`DataTable`** — `dist/index.d.ts:11` at 4.0.0, `./data-table` at 7.0.0. The seat for **D-M1**'s
   missing headers and row semantics.
6. **The named `<Pagination>` carry does NOT land at 7.0.0.** `AdminUserList.vue:428-429` books it
   as "the named carry"; the 7.0.0 export map has **no `./pagination`** (76 keys enumerated; absent).
   F.W1 must not plan the pagination cure around a primitive that is still not shipping.
7. **`Input` is NOT a conformance gap at either pin — do not file it.** 4.0.0 ships `Input.vue` in
   `dist/components/ui/input/` but exports it at neither the root index (`grep -n "input"
   dist/index.d.ts` → 0) nor any subpath (no `./input` among the 4.0.0 export keys); 7.0.0 has
   `src/components/input/` but likewise no `./input` export. The two raw `<input>`s at `:89`, `:96`
   are therefore unavoidable under both pins. Recorded in §7 as a killed claim.

**Ordering constraint F.W1 must respect (non-obvious).**
The cure for **D-B1** is the house error idiom — `toast(e.message ?? "…", "error")`
(`AdminFlaggedPanel.vue:52`). That routes through `web/src/composables/useToast.ts:3,9`, which
imports `type ToastVariant` — **definition-absent at 7.0.0** and already the census's [P1] hard
typecheck break. So **fixing this component's BLOCKER widens the `ToastVariant` blast radius from
1 file to 2+, and the two admin panels that need it are exactly the two that currently drop
`error`.** Either cure `useToast.ts` first, or cure D-B1 without a toast (an inline error banner).

---

## §7 — Claims I filed and my own falsifiers killed (L-18 discipline)

| Killed claim | Falsifier that killed it | Disposition |
|---|---|---|
| "`truncate` on the `1fr` grid track is inert — the row overflows horizontally." | CSS Sizing §4.1: a grid item's content-based automatic minimum size applies **only** when `overflow` is `visible`. Tailwind's `truncate` includes `overflow: hidden`, so the track's automatic minimum collapses to 0 and the ellipsis fires. | **Promoted to superlative S-3.** |
| "Raw `<input>` instead of glass `Input` is a conformance violation." | `Input` is exported at **neither** pin — no `./input` subpath and no root re-export at 4.0.0 or 7.0.0. | Dropped; recorded as §6 item 7. |
| "`disabled:opacity-30` is a WCAG 1.4.3 failure." | 1.4.3 explicitly exempts inactive user-interface components. | Downgraded to **D-m9** with the exemption stated. |
| "The dropped `error` ref is this component's own defect." | `AdminUserList.vue:42-53` drops it identically — a family defect. | **D-B1** re-scoped: the BLOCKER now rests on the audit-log-specific consequence (empty-state-as-assertion), not on the dropped ref alone. |
| "`animate-spin` is a WCAG 2.3.3 / 2.2.2 failure." | Status indicators are exempt (essential, short-duration). | Downgraded to **D-m6**, a house-consistency note. |

---

## §8 — Superlatives (L-18 runs both ways)

- **S-1 · The `NaN` guard on `formatTimestamp` (`:55-56`).**
  `if (Number.isNaN(d.getTime())) return iso;` — a malformed timestamp degrades to the **source
  bytes**, never to the string `"Invalid Date"`. For a system of record that is exactly right:
  showing the unparseable original preserves evidentiary value; showing "Invalid Date" destroys it.
  *Falsifier:* pass `"not-a-date"` → returns `"not-a-date"`. It is also the **only** place in the
  file where the author considered a hostile input, which is why it deserves the credit.

- **S-2 · `font-mono … tabular-nums` on the timestamp (`:130`).**
  Correct and non-obvious. `font-mono` alone does not guarantee tabular figures — several mono faces
  ship proportional or oldstyle numerals for the digit run — so the explicit `tabular-nums` is what
  actually pins the `03:14:22` column. It is the one thing keeping the four-column grid scannable
  despite D-M1's per-row track independence.
  *Falsifier:* remove it and the seconds field jitters row-to-row in any such family.

- **S-3 · The `truncate` on the `1fr` track (`:139`) is correctly composed.**
  Because Tailwind's `truncate` bundles `overflow: hidden`, the grid item's automatic minimum size
  collapses to zero (CSS Sizing §4.1), so the ellipsis actually fires instead of the track blowing
  out. The near-universal hand-rolled failure — `text-ellipsis whitespace-nowrap` without
  `overflow-hidden`, or a `1fr` track holding a nowrap child with no `min-w-0` — is precisely what
  this avoids. **I filed this as a defect and the falsifier killed it**; the composition is right.

- **S-4 · The empty state escalates its counsel (`:151-160`) — better than the house standard.**
  ```
  <p class="text-sm">No audit entries</p>
  <p v-if="hasFilters" class="text-xs opacity-70">Try clearing filters to widen the search.</p>
  ```
  It distinguishes *"the ledger is empty"* from *"your query is narrow"* and tells the operator what
  to do about the second. The sibling's empty state is a flat, counsel-free `"No users found"`
  (`AdminUserList.vue:422-425`). This is the one place where AdminAuditLog is **ahead** of the family
  idiom, and the cure for D-M3 must preserve the branch (fixing only the signal it reads) rather
  than delete it. *Falsifier:* would die if the sibling had the same branch — it does not.

---

## §9 — Corpus reconciliation (fold, don't re-invent)

| Corpus row | This challenge |
|---|---|
| **R4-9** (`intakes/lane-fourier-r3-r6.md`, ADOPT-AS-FACT — "the audited scope is byte-identical to the tree F.W0 opens on") | **Relied upon.** Every read here is against live `web/src` at HEAD `cd26c65`, which R4-9 certifies as the F.W0 scope. No re-verification attempted. |
| **R5-7** (ADOPT-AS-FACT + CARRY→F.W4 — "template-loop evidence keyed to *component* callsites is blind to native HTML element loops") | **Directly corroborated, and it bites here.** AdminAuditLog's only loop is `v-for` on a **native `<div>`** (`:126`). Under the R5 deriver this component registers **zero** loop evidence — the exact blind spot PaperSidebar exposed. F.W4's per-component denominator must count native-element loops or this file's 25-row list is invisible to it. |
| **R3-10** (CARRY→F.W4 — six live dynamic `:is` families) | No overlap: `grep -n "component :is" AdminAuditLog.vue` → 0. Stated for exhaustiveness. |
| **CENSUS §2 C-4** (metric-badge is 7 *files*) | **Upheld, independently.** AdminAuditLog is not one of the 7 — its full import list is `:2-8`. |
| **CENSUS §3a "The uplift break surface"** (metric-badge ×7 files, hover-card/-popover ×4, dock ×3, `ToastVariant` ×1, lucide ×35, pencil-boil) | **EXTENDED, not contradicted** — see **D-B4**: the `Button` `variant`→`emphasis` / `size="icon"`→`iconOnly` rename (37 files) is absent from lane-frontend.md and the census (grep → 0 hits) and exceeds the entire booked component surface. |
| **CENSUS [P1] #3 / lane-frontend.md:477** (`ToastVariant` = hard typecheck break, `useToast.ts:3,9`) | **Extended with an ordering constraint** — see §6: the D-B1 cure routes through `useToast.ts`, widening that break's radius. |
| **lane-frontend.md:612-624 / [P3] #9** (reduced-motion: 18 refs, the two rAF clocks ungated) | **Extended twice** — D-m6 adds a third site class (CSS `animate-spin`, 3 gallery files); D-m7 shows the tab-panel reduce guard (`style.css:92-96`) has **no matching selector** in `GalleryView.vue`, so the authored guard protects nothing here. |
| **lane-frontend.md:107** (`AdminAuditLog.vue` — 190 lines, "Audit-log list") | Confirmed exactly: 190 lines. |
| **CENSUS §3a** ("deepest, cleanest glass consumer in the constellation — 0 direct reka-ui, 0 shadcn copies") | **Locally contradicted at this coordinate.** This file's glass adoption is one symbol (`Button`, `:3`). Its badge, its table, its pagination, its loading state and its inputs are all hand-rolled against raw Tailwind palette values, three of which (`Badge`, `Skeleton`, `DataTable`) are exported by the **installed** 4.0.0. The census claim is a repo-wide aggregate and remains true as such; it does not hold here. |

---

## §10 — What the F.W1/F.W4 wave should carry out of this file

1. **`Badge` adoption** (§6.3) — deletes `actionTone`, cures **D-B2**, no uplift required.
   Raise the missing 5th tone (`batch`) to the glass-ui BH inbox.
2. **Error surface** (**D-B1**) — but respect the `ToastVariant` ordering constraint (§6).
3. **`border-muted/*` → `border-border`, `bg-muted/5` → a token that renders** (**D-B3**); and raise
   the residual (`--border` at 1.90 : 1) as an upstream token question.
4. **Book the `Button` rename as a break-surface row** (**D-B4**) *before* F.W1 commits to a cure
   budget — 37 files, currently unplanned.
5. **Port the sibling's a11y pass wholesale** (**D-M4 · D-M5 · D-M6 · D-m1 · D-m2**) — it is already
   written in `AdminUserList.vue`; this is a copy, not a design.
6. **Preserve S-1, S-2, S-3, S-4 through the rewrite.** S-4 in particular: fix the signal
   (**D-M3**), keep the branch.
