# CHALLENGE-D — AdminFlaggedPanel.vue · the design is wrong

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M context), spawned with an explicit
Opus-5 declaration. The seat is declared, not inherited.

**Subject** · `demo/palettes/browser/admin/AdminFlaggedPanel.vue` (153 lines, area `palettes`)
**Repo** · `/Users/mkbabb/Programming/value.js` · branch `tranche-u` · HEAD `c654824e`
**Verdict** · **DEFECTIVE** — 3 BLOCKER, 13 MAJOR, 7 MINOR, 3 INFO
**Strongest** · **D-1** — the panel reports an unauthenticated moderation queue as *clear*.

---

## 0. Method and evidence base

| Source | What I did |
|---|---|
| `AdminFlaggedPanel.vue` + all 7 siblings + `AdminPane.vue` | read whole |
| `useAdminFlagged.ts`, `useAdminAuth.ts`, `types.ts`, `dateFormat.ts` | read whole |
| `docs/tranches/V/{VISUAL-CONSTITUTION,PROPORTION-AUDIT,PALETTE-CONTRACT}.md` | read; cited by section |
| `shots/safari-{desktop,mobile}-{light,dark}/admin-flagged.png` | **viewed all four** |
| `visual/REPORT.json` | extracted the 4 `/#/admin/flagged` rows |
| `@mkbabb/glass-ui@7.0.0` `dist/components/{button,badge}/` | read the shipped `.d.ts` + compiled recipes |
| live app `localhost:9000` | Playwright: measured the rendered toolbar at 1440×900 |

Measured live (1440×900, `/#/admin/flagged`):

```
refresh button   getBoundingClientRect() = 28.00 × 36.00   computed min-height: 36px
toolbar          462.00 × 36.00           alignItems: center
"0 flagged"      Fira Code 16.4px         rgb(112,89,66)
spacer void      343.2px  (count.right → button.left)   = 74.3% of the toolbar
panel root       462.0 × 502.1
card             512.0 × 774.0            dead height below panel content: 166.2px
main             1408.0                   card / main = 36.36%
```

Two probes were lost to another agent driving the same browser (the page was navigated out from
under me twice); the numbers above are from the run that completed. Where a claim needed a probe I
could not land, it is labelled **HYPOTHESIS** and says so.

---

## 1. Visual truth — what the four captures actually show

All four matrices (`desktop-light`, `desktop-dark`, `mobile-light`, `mobile-dark`) show the panel in
**exactly one state: empty**. That is itself the first thing wrong with the evidence base, and the
second thing wrong with the product.

**Desktop light/dark.** The Flagged card is 512px inside a 1408px main, sitting beside a co-equal
"My Palettes" companion card. Inside it: a single line of mono text `0 flagged` pinned to the far
left, a 28×36 refresh lozenge pinned to the far right with **343px of nothing between them**, then a
centred empty plate, then **166px of dead card below**. The card is 774px tall to hold ~200px of
content. This is not a moderation console; it is a caption in a vitrine.

**Mobile light/dark.** Same content, and the refresh control renders as a **portrait lozenge** —
measured off `shots/safari-mobile-light/admin-flagged.png` at DPR 3 the button box is ≈82 × 150
device px = **≈27 × 50 CSS px**. A refresh glyph in a 27-wide, 50-tall pill is not a considered
shape; it is `h-7` losing an argument with a root `min-height` (D-7).

**Dark treatment.** The card body in dark is a flat mauve-brown wash; `0 flagged` is set in
`text-muted-foreground` Fira at 16.4px with no compensation for the darker plate. The empty plate's
own captions were explicitly rescued in T.W8 (`EmptyState.vue` `.plate-ink` → `--ink-muted`, the
certified de-emphasis rung, because static `text-muted-foreground` composited 3.84:1 on the light
plate). **This panel's toolbar count uses the exact `text-muted-foreground` that remediation
retired**, on the same plate, in the same card. The cure was applied to the atom and not to its
neighbour.

**Hierarchy.** The three loudest marks in the empty frame are, in order: the display-set
"No flagged palettes.", the small-caps eyebrow, and the refresh icon. The **count** — the only datum
— is the quietest thing on the card. The panel says nothing three times (D-24) and its one number
last.

---

## 2. Defect register

### D-1 · BLOCKER · An unauthenticated queue costumes as a clear queue

`useAdminFlagged.ts:59-61`

```ts
async function loadFlagged() {
    const token = getToken();
    if (!token) return;          // ← loading:false, items:[], loadError:null
```

The early return leaves the exact triple `(loading=false, loadError=null, items=[])`. The panel's
`v-if` chain (`AdminFlaggedPanel.vue:16 / 22 / 37`) resolves that triple to the **TRUE-EMPTY plate**:

```
· nothing flagged ·
No flagged palettes.
```

**The shipped audit captures are the reproduction.** In all four matrices the dock renders the
signed-out `→] Login` control, so `getToken()` returned `null`, so `loadFlagged` never ran — and the
panel asserted an empty moderation queue anyway. See
`shots/safari-desktop-light/admin-flagged.png` (dock: `Login`; card: `0 flagged` /
`No flagged palettes.`), identically in the other three.

Cross-confirmed live in one session at 02:52 UTC on the same dev server:

```
/#/admin/names   → "The proposal queue is unreachable."
/#/admin/flagged → "0 flagged"  "· nothing flagged ·"  "No flagged palettes."
```

One backend condition, one auth state, one review suite — **two contradictory reports**. Names tells
the truth; Flagged lies.

This is the *same* defect the panel's own comment claims to have cured:

> `AdminFlaggedPanel.vue:20` — *"W5-5 (F-2, the P0 case): error ≠ empty — a dead backend never
> costumes as a clear moderation queue."*

F-2 was closed against `loadError`. It was never closed against **no-authority**, which is the
commoner arm and the more dangerous one: a dead backend is loud and transient; a missing admin token
is silent and permanent, and the person looking at the screen is the one person whose job is to
believe it.

**Mechanism** · the state taxonomy has three species (loading / error / empty) for a domain with
four (loading / unauthorized / error / empty). A state that was never designed is a design defect.

**Cure (gestalt, not patch)** · `unauthorized` is not a fourth `v-else-if` in five panels. Authority
is a property of the *route*, not of each list: `AdminPane.vue` gates the whole five-route suite on
`useAdminAuth().isAuthenticated` and renders one signed-out article in place of the body. Every
panel then gets to assume it has authority, and `if (!token) return` disappears from all five
composables. (Note also `PALETTE-CONTRACT.md §2`: *"there is no cross-origin Authorization /
X-Session-Token / **localStorage** / sessionStorage auth path in the browser"* — `useAdminAuth.ts:15`
stores the admin token in `localStorage`. Contract owner is the auth composable, recorded here
because D-1's whole mechanism hangs off it.)

---

### D-2 · BLOCKER · An irreversible destructive command with no confirmation

`AdminFlaggedPanel.vue:93-101` — one click on the trash glyph calls
`flagged.deletePalette(item.paletteSlug)` → `DELETE /admin/palettes/:slug`
(`useAdminFlagged.ts:93-103`). No dialog, no typed confirm, no undo window, no post-hoc restore.
Another person's saved palette is gone on a single pointer-down, from a 28×36 hit box, adjacent to a
button that does something entirely different.

`VISUAL-CONSTITUTION.md §7` is binding and explicit:

> *"Admin is a five-route review suite — Users, Names, Audit, Flagged and Tags — using one review-row
> anatomy, query/pagination/state grammar, **dangerous confirmation** and responsive disclosure."*

`PROPORTION-AUDIT.md` PR-11 names the same family: *"Admin rows obscure actor/scope/effect →
**ADD-AFFORDANCE** — One review anatomy with authority/state/**confirmation**."*

The panel's design comment (`:86-89`) spends four lines reasoning about the button's **colour** —
"ink at rest, red only on hover/focus" — and zero lines on the fact that it is unconfirmed. The
design deliberated over the paint on a door it left unlocked.

**Cure** · the confirmation belongs to the review-row anatomy shared by all five routes, not to this
file: a destructive command in the Admin suite resolves through one glass-ui `AlertDialog` naming the
scope (*palette, owner, flag count*) and the effect. One owner, five sites.

---

### D-3 · BLOCKER · The actor is designed out of a queue whose whole job is judging actors

`demo/palettes/types.ts:103-108`

```ts
export interface Flag {
    reporterSlug: string;   // ← on the wire, in the type, never rendered
    reason: string;
    detail?: string;
    createdAt: string;
}
```

`AdminFlaggedPanel.vue:107-121` renders `flag.reason`, `flag.detail`, `formatDate(flag.createdAt)`.
`reporterSlug` appears **nowhere in the file** (`grep -c reporterSlug AdminFlaggedPanel.vue` → 0).

Consequence: `Badge tone="destructive"` shows `7`, and a moderator cannot distinguish *seven people
independently reported this* from *one person reported it seven times*. Brigading, retaliation and
report-abuse are structurally invisible — not hard to see, **not renderable**. Sorting, muting a bad
reporter, or weighting a trusted one are all impossible because the datum is discarded at the
template.

`VISUAL-CONSTITUTION.md §7`: *"**Actor**, scope, provenance and effect remain visible."*
`PROPORTION-AUDIT.md` PR-11 is the owning family row.

**Cure** · the flag line is `reporter · reason · when`, with `detail` as its own wrapped block; the
count badge becomes `N flags from M reporters` or dies in favour of the enumerated list it duplicates.

---

### D-4 · MAJOR · loading / error / populated are not mutually exclusive — the states overlap on screen

The three plates are a `v-if` chain (`:16`, `:22`, `:37`). **The row list is not in the chain**:

```
:16   <div v-if="flagged.loading.value" …>          skeletons
:22   <EmptyState v-else-if="…loadError…" …>        error plate
:37   <EmptyState v-else-if="…length === 0" …>      empty plate
:44   <div v-for="item in flagged.items.value" …>   ← no v-else. Always rendered.
```

Two confirmed consequences, both from `useAdminFlagged.ts`:

1. **Pagination.** `nextPage()` (`:105-110`) → `loadFlagged()` sets `loading = true` at `:62` and only
   replaces `items` at `:69`. Between those, the panel renders **2 skeletons stacked above N live
   rows of the previous page**. Reproduction: click *Next page*.
2. **Refresh against a dead backend.** The catch at `:72-75` sets `loadError` and **never clears
   `items`**. The panel then renders `"The flag queue is unreachable."` **above a still-interactive
   stale queue** whose Dismiss and Delete buttons post to the backend it just declared unreachable.
   Reproduction: stop the api, click refresh. This is F-2's own thesis — *error ≠ empty* — defeated
   by the arrangement of the very template that asserts it.

**Cure** · one `v-if/v-else-if/v-else` chain over a single derived state (`"loading" | "unauthorized"
| "error" | "empty" | "ready"`), so the panel can only ever be in one of them. The chain is not
decoration; it is the invariant.

---

### D-5 · MAJOR · No command has an in-flight, failed, or succeeded state — and the producer already ships one

`useAdminFlagged.ts:81-103`: `dismiss` and `deletePalette` swallow every failure into
`console.warn`. There is no `pending`, no per-row busy flag, no error surface. On failure the row
stays and **nothing at all happens** — indistinguishable from a slow network, from a no-op, from
success-then-refresh. On double-click, two `DELETE`s go out.

`@mkbabb/glass-ui@7.0.0` `dist/components/button/Button.vue.d.ts:14-15`:

```ts
/** Marks an in-flight command and suppresses activation until it settles. */
loading?: boolean;
```

The affordance exists at the root, documented, one prop away, and is used **zero times** in this file.

`VISUAL-CONSTITUTION.md §5`: *"Persistent operation state stays with the entity/workspace. A
transient flourish may celebrate success but never carries the only truth."* PR-08:
*"Pending/failure/export/recovery truth only transient → **ADD-AFFORDANCE**."*

---

### D-6 · MAJOR · `variant` is a dead prop — the panel's action hierarchy is not rendered at all

`AdminFlaggedPanel.vue` passes `variant="outline"` (`:10`, `:29`, `:90`) and `variant="ghost"`
(`:93`). glass-ui 7's Button has **no `variant` prop**:

```
node_modules/@mkbabb/glass-ui/package.json          version 7.0.0
dist/index.d.ts:5                                   export * from "./components/button";
dist/components/button/Button.vue.d.ts  ButtonProps = { emphasis, tone, size, iconOnly, loading, … }
$ grep -c variant dist/button-Bu9F4uU6.js           0
$ grep -roh "\[variant=[^]]*\]" dist/styles/        (no output — no attribute selector anywhere)
```

`demo/ui/button/index.ts` is a bare re-export (`export { Button } from "@mkbabb/glass-ui"`), so the
value.js call sites hit that component directly. Unknown props fall through to the DOM as literal
attributes and select nothing; the recipe keys off `data-emphasis`.

So the panel's headline design decision —

> `:86-89` *"the pair weighted asymmetrically — the labeled neutral Dismiss is the primary
> affordance; the delete is a QUIET icon … never its equal-weight red twin"*

— **does not render**. Both buttons resolve to the same default emphasis. The asymmetry exists only
in the comment. Every visual-weight claim in this file is unbacked for the same reason.

Family: `grep -ro 'variant="outline"\|variant="ghost"' demo | wc -l` → **57 occurrences across 26
files**. This is a Glass-7 adoption residue (W44 adopted 7.0.0 whole) and an **edict-2 violation**:
legacy prop names surviving a major, silently, with no typecheck failure because Vue accepts fallthrough
attributes.

**Cure** · `emphasis="secondary"` / `emphasis="quiet"` + `tone="destructive"` at every site, in one
sweep, and the `variant` spelling deleted — not aliased.

---

### D-7 · MAJOR · Per-instance geometry loses to the root; every control is a 28 × 36 rectangle

Measured live, the refresh button: **28.00 × 36.00**, `min-height: 36px`.

`h-7` (28px) is overridden by the producer's `--control-h-sm`:

```
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor))   → 36px @ ui-scale 1
--control-h-xs: max(calc(1.75rem * var(--ui-scale)), var(--control-floor))   → 28px
```

The panel wants 28px. **The producer has a 28px rung** (`size="xs"`) and a square-icon rung
(`iconOnly` — *"Square geometry for an accessibly named icon command"*, `Button.vue.d.ts:12-13`).
The panel reaches past both and stamps `class="h-7 px-2"` at four sites (`:10`, `:29`, `:90`, `:93`),
producing a control that is neither the size it asked for nor the size the system offers.

On mobile the same override yields ≈27 × 50 CSS px (`shots/safari-mobile-light/admin-flagged.png`,
82×150 device px at DPR 3) — the `--ui-scale`/`--control-floor` arm of the same `max()`, wearing a
28px width the panel hard-coded. This is the visible portrait lozenge in §1.

Owner edict 5 (*style at the root, never per-instance*) and `PROPORTION-AUDIT.md` law 7 (*"Visual
glyph size, operable target size and layout reservation are separate quantities"*) — the panel
conflates all three into one `h-7`.

---

### D-8 · MAJOR · The toolbar is not a composition — 74% of it is void between the count and its own control

Measured: toolbar 462.0 wide; gap from `"0 flagged"`.right to refresh.left = **343.2px = 74.3%**.
The `<div class="flex-1" />` at `:8` is a hand-rolled spacer that pushes the *only* control on the
strip as far as possible from the *only* datum it changes.

The sibling does it the other way round — `AdminAuditPanel.vue:23-32` puts `flex-1` **before** the
count, so count and refresh read as one unit at the end of the strip. Two toolbar grammars inside a
five-route suite the constitution requires to share one (`§7`). Nothing decides which is right; they
simply differ.

`PROPORTION-AUDIT.md` §1: *"Every element earns its scale, interval, boundary and material from its
job relative to the local protagonist… they do not excuse a **mechanically large gap**."* 343px is
the definition of a mechanically large gap: it is not a designed interval, it is `flex-1` eating the
remainder.

---

### D-9 · MAJOR · The loading shadow is the wrong shape and the wrong count

`AdminListSkeleton.vue:13-18` is the **single-tier** `AdminListItem` row: 32px round swatch,
two lines, one trailing lozenge. The real flagged row (`:44-123`) is **two-tier** — a header band
plus a bordered flag-detail block whose height grows with `item.flags.length`.

So the shadow promises an anatomy the data never takes, and the settle is a shape change, not a
fill. `v-for="i in 2"` (`:17`) against `pageSize = 20` (`useAdminFlagged.ts:51`) makes the
mis-promise dimensional as well as structural: two short rows resolve into up to twenty tall ones.

`VISUAL-CONSTITUTION.md §7`: *"Request-bound skeletons exist only while real work is in flight"* —
and a skeleton whose shape is a lie is not request-bound truth, it is furniture.

---

### D-10 · MAJOR · The panel opts out of the one review-row anatomy the suite is built on

`AdminListItem.vue` sits in the same directory. `AdminNamesPanel.vue:44` and `:94` consume it;
`AdminUsersPanel.vue` consumes it. `AdminFlaggedPanel.vue` hand-rolls its own row at `:44-123`.
`VISUAL-CONSTITUTION.md §7`: *"a five-route review suite … using **one review-row anatomy**"*.

Three measurable consequences:

1. **Two specimen scales in one suite.** `AdminListItem.vue:13` reserves a fixed `w-8 h-8` (32px)
   leading slot. This panel's swatches are `h-5 w-5` (20px, `:56`). Same suite, same job, 20px vs 32px.
2. **The F-1 cure is missing.** `AdminListItem.vue:6-11` carries a documented `min-w-0` on the row
   itself, because the row is a grid item whose `min-width:auto` resolves to the min-content of the
   nowrap spans and blew the track to ~850px at 390 — *"the moderation flow was INOPERABLE at 390px"*
   (`AdminNamesPanel.vue:2-9`). The hand-rolled row at `:47`
   (`class="rounded-md border border-card-edge overflow-hidden"`) has **no `min-w-0`**. It inherits
   the bug the sibling was surgically cured of. The mega-tranche audit reads `overflowX: 0` on this
   route in all four matrices — but the queue is **empty in all four captures**, so that zero is
   evidence about an empty card, not about a row. *(The overflow consequence is a **HYPOTHESIS** —
   not reproduced, needs a populated queue at 390px. The missing `min-w-0` against the sibling's
   documented cure is a **fact**.)*
3. **No row affordance.** `AdminAuditPanel.vue:62` gives its row
   `transition-colors duration-fast hover:bg-accent/50`. This panel's row has no hover, no
   transition, no focus-within treatment — in the one panel where the row carries destructive
   commands.

---

### D-11 · MAJOR · The deleted-palette state collapses the row's left anchor

`:52-59` — `(item.palette?.colors ?? []).slice(0, 5)`. When `item.palette` is `null` the array is
empty, the flex container renders at **width 0**, and the entire content column jumps 20px + `gap-3`
to the left. Every deleted-palette row is horizontally misaligned against every live row above and
below it.

This happens in exactly the state the panel believes it is handling with care:

> `:68-70` *"a null palette is a DELETED palette — say so in the K-INV5 small-caps annotation
> register, never a silent bare slug with an empty strip."*

The annotation was added; **the empty strip is still there**. `AdminListItem.vue:13` reserves its
32px slot unconditionally precisely so this cannot happen. Confirmed by construction (a zero-child
`flex` box has zero width).

Also `:73-75` sets `style="font-variant: small-caps"` as an inline literal — a per-instance style for
a register the codebase treats as a named class elsewhere (edict 5).

---

### D-12 · MAJOR · Three boundary species stacked, in a register PR-05 already zeroed

The row draws a full box rule — `border border-card-edge` (`:47`) — and then an **internal**
rule 8px lower: `border-t border-border/50` (`:106`). Two different mints:

```
demo/styles/foundation.css:270   --card-edge: color-mix(in oklab, var(--foreground) 12%, transparent)
glass-ui components.css          .border-border\/50 → color-mix(in oklab, var(--border) 50%, transparent)
```

`PROPORTION-AUDIT.md` PR-05 is binding and quoted verbatim in `VISUAL-CONSTITUTION.md §4.2`:

> *"only the five Admin fields retain **one** adjacent-row separator and no terminal rule; every other
> divider/ornament is **zero**."*

and Card law 4: *"A divider is retained only when grouping would be ambiguous without it. Spacing
plus material already expressing the same boundary makes the line duplicative."* The box border and
the `py-2.5` / `py-2` interval already express the header→details grouping. The inner rule is the
duplicate the register was written to kill.

---

### D-13 · MAJOR · Fraunces on a control label — the type matrix has no such role

`:90` `class="h-7 px-2 text-caption font-display"` on **Dismiss**, and `:29`
`class="font-display"` on **Retry**.

`VISUAL-CONSTITUTION.md §4`, the closed matrix:

| role | token | family |
|---|---|---|
| control or label, including dropdown options | `text-small` | **Plus Jakarta Sans, non-bold** |

and §4: *"Fraunces owns display/identity, Plus Jakarta Sans owns headings/prose/controls"*;
`foundation.css:102`: *"the three-voice law reserves Fraunces for display rungs only"*.

`font-display` is Fraunces (`--font-stack-display`, `foundation.css:99`). `text-caption`
(`font-size: var(--type-caption)`) is not a control role in the matrix at all. Two violations on the
panel's only labelled command, and the matrix is declared **closed across all eighteen compositions**.

---

### D-14 · MAJOR · The reporter's prose is set in code type and truncated to one line

`:115` `<span v-if="flag.detail" class="text-mono-small text-muted-foreground truncate">`

Two defects in one class list:

- **Family.** §4 assigns Fira Code to *"value, code, or provenance"*. A moderation report is prose
  written by a person. The sibling panels are careful about the converse case — `AdminNamesPanel.vue:51`
  *"a CSS literal is a readout (F-9)"* — and the rule was applied in only one direction.
- **Truncation.** `truncate` = `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`. The one
  free-text datum a moderator needs to act on is clipped to a single line, with no `title`, no wrap,
  no expand. And the flex arrangement guarantees it is the loser: the reason badge is `shrink-0`
  (`:112`), the date is `shrink-0` with `ml-auto` (`:118`), so **`detail` is the only item in the row
  that can give up width**. Everything that matters least is protected; the thing that matters most
  is the shock absorber.

---

### D-15 · MAJOR · Badges are per-instance-overridden instead of using their own `size` rung

Badge recipe, `dist/badge-u65NClWn.js`:

```js
sm: "text-[length:var(--control-text-sm)] leading-[1.1] px-2 py-0.5"
md: "text-[length:var(--control-text)]    leading-[1.1] px-2.5 py-1"   // default
```

`:81` and `:112` pass **no `size`** and stamp `class="text-mono-caption"`. Result: `md` padding
(10px / 4px, calibrated for `--control-text`) wrapped around caption-sized mono type. The pill is
optically loose around its own content, at both sites, by construction. The producer's `sm` rung is
the shape the panel is trying to draw. Edict 5.

---

### D-16 · MAJOR · Emphasis is inverted — loud red on the datum that cannot be acted on, flat grey on the one that can

- `:81` `<Badge tone="destructive">{{ item.flagCount }}</Badge>` — a saturated red pill on **every
  row, at rest**. `flagCount` is not actionable and is redundant with the enumerated flag list
  directly below it.
- `:112` `<Badge variant="secondary">{{ flag.reason }}</Badge>` — `reason` is the **only triage
  datum** in the panel (spam vs copyright vs hate speech vs mistake), and every reason renders in one
  flat plate.

The producer's own doc comment on the axis it ignores (`Badge.vue.d.ts`):

> *"the semantic status register (the shared `tone` axis: neutral/destructive/success/warning/info)…
> A status badge stays loud (information, not a sticker)."*

And the resting red directly contradicts the panel's own stated doctrine four lines above it:

> `:88-89` *"red only on hover/focus, never a resting beacon on every row"*

The beacon was not removed. It moved ~40px to the left and got bigger.

---

### D-17 · MAJOR · Forced colors erases the specimen and the destructive semantics · **HYPOTHESIS**

`:57` `:style="{ backgroundColor: c.css }"` on each swatch. Under `forced-colors: active` the UA
forces `background-color` to a system colour, so the swatch strip renders as five identical
system-coloured discs — the row loses its only palette identity, and the `border-background` ring
(`:56`) that separates the overlapped discs goes with it. There is no `forced-color-adjust: none`, no
border/pattern/label fallback anywhere in the file.

Compounding: the delete command's entire meaning is a hover-only colour change (`:96`
`hover:text-destructive focus-visible:text-destructive`), which forced colors flattens.

`VISUAL-CONSTITUTION.md §4.1`: *"Selected, failed, pending, withdrawn and disabled states are never
colour-only"* and *"…show a nonzero selected-state delta in monochrome and forced colors."*

Labelled **HYPOTHESIS**: spec-derived, not reproduced. `shots/forced-colors-desktop/` contains only
`adminusers.png` — **Flagged has never been observed in forced colors, RTL, 200% zoom, keyboard
focus, or reduced motion.** Five of the seven state matrices in the audit skip this component
entirely.

---

### D-18 · MINOR · `aria-label` on a role-less `div` is dropped

`:16` `<div v-if="flagged.loading.value" class="grid gap-2" aria-label="Loading flagged palettes">`

`aria-label` is prohibited on `role="generic"` and is not exposed. The sibling gets it right —
`AdminTagsPanel.vue:51-56` puts `role="status"` on the same wrapper. Net effect here: two
`AdminListSkeleton` children each announce a bare "Loading" (`AdminListSkeleton.vue:10-11`) with no
context, twice, and the contextual label the author wrote is discarded.

---

### D-19 · MINOR · Provenance is ambiguous by a year

`dateFormat.ts:16-25` — `formatDate` → `"Mar 26"`. No year, no time. A flag from March last year and
one from this morning are indistinguishable in a queue whose only ordering signal is recency.
`AdminAuditPanel.vue:71` uses `formatTime` (month, day, hour, minute) for the same class of datum.
One suite, two provenance formats, and the queue that most needs recency got the coarser one.

---

### D-20 · MINOR · No sort, no filter, no facet — in the one panel that is a work queue

`AdminAuditPanel.vue:7-22` ships two filters. `AdminNamesPanel.vue:14-22` ships state tabs. Flagged
ships Prev/Next over `pageSize = 20`. There is no *sort by flag count*, no *filter by reason*, no
*oldest-first*. The moderator's only tool for a 200-item queue is paging through it.
`VISUAL-CONSTITUTION.md §7` requires the suite to share one *"query/pagination/state grammar"*;
Flagged has a third of one.

---

### D-21 · MINOR · The swatch strip truncates silently and occludes what it does show

`:54` `.slice(0, 5)` — a 12-colour palette shows 5 and says nothing; there is no `+7` residue mark.
`:52` `-space-x-1` then overlaps them, so the 5th disc is partly hidden behind the 4th. The moderator
judges a palette on ~4.5 visible colours out of 12, with no indication that is what they are doing.
`EmptyState.vue:38-42` shows the disciplined form of the same idea: an exact, deliberate,
`aria-hidden` trio at three named scales.

---

### D-22 · MINOR · Zero motion vocabulary, on the one panel whose actions are irreversible

No transition, no `TransitionGroup`, no exit. `useAdminFlagged.ts:86` and `:98` splice the item out of
the array and the row is simply gone on the next frame, with everything below jumping up.
`VISUAL-CONSTITUTION.md §6`: *"Spatial continuity uses one producer-owned glass-ui spring register…
exit is shorter than entry."* Nothing here is tokenized because nothing here moves.

No `prefers-reduced-motion` handling is needed **because there is no motion** — that is not
compliance, it is absence. Edict 6 is not violated (no animation was deleted).

Related **HYPOTHESIS** (not reproduced, needs a populated queue): rows have variable height
(`v-for` over `item.flags`, `:107-121`), so after a delete the next row lands under a stationary
pointer at the delete column — a second unconfirmed destructive click on a *different* palette. This
is why D-2 and D-22 are one mechanism, not two.

---

### D-23 · INFO · The panel is 36.4% of main; the constitution says full main width

Measured at 1440: card **512.0**, `main` **1408.0** → **36.36%**; 166.2px of dead card height below
the content in the empty state; a co-equal "My Palettes" companion occupies the remainder
(`shots/safari-desktop-light/admin-flagged.png`).

`VISUAL-CONSTITUTION.md §7`: *"Each Admin route uses the **full main width**: the current Palettes
companion, right label and resulting mobile pane selector are **removed** rather than restyled."*
`PROPORTION-AUDIT.md` PR-04: *"Empty/equal companion Cards and nested housing → **REMOVE** …
**Admin companion 50%→0**"*; §3 law 2: *"Empty secondary content occupies at most a narrow invitation
tray (≤15% of the stage) or disappears. It never receives half the viewport."*

Owner is `AdminPane.vue` / the route composition, not this file. Recorded so the family is not lost:
the flagged panel is the *witness*, and its own 502px content stretched into a 774px card is the
measured symptom.

---

### D-24 · INFO · The same nullity is asserted three times in three registers

`0 flagged` (Fira, `:6`) + `· nothing flagged ·` (Fira small-caps eyebrow, `:39`) +
`No flagged palettes.` (Fraunces display, `:40`) — three statements of one fact inside a 512px card,
visible simultaneously in all four captures. `PROPORTION-AUDIT.md` §5 law 6: *"Subtraction precedes
explanation."*

---

### D-25 · INFO · The count lives in two different places across the suite

`AdminPane.vue:117-131` — `adminCount` returns the header Badge for `admin-users` and `admin-names`
and **`null` for `admin-flagged`** (`default: return null`). Users and Names put their count in the
PaneHeader badge; Flagged, Tags and Audit invent an in-body toolbar count. One suite, two homes for
one class of datum, decided per-panel.

---

### D-26 · MINOR · The flag list is unbounded inside a row that is already a card

`:107-121` iterates `item.flags` with no cap and no disclosure. `Flag[]` is unbounded in the type
(`types.ts:114`). A palette with 60 flags renders 60 detail lines inside one bordered row — the row
becomes a page. `flagCount` (`:82`) and the enumerated list are the same information at two scales
with no relationship between them. **HYPOTHESIS** on the practical ceiling: the api's per-palette
flag cap was not read.

---

## 3. Mechanism families (the cure is architectural, not 26 patches)

| Family | Members | The one cure |
|---|---|---|
| **F-α · the state taxonomy is short a species and its plates are not exclusive** | D-1, D-4, D-5, D-9 | one derived `status` union (`loading \| unauthorized \| error \| empty \| ready`) driving one `v-if/v-else` chain; route-level auth gate in `AdminPane`; per-command `loading`/failure state on the entity |
| **F-β · the review-row anatomy was forked** | D-3, D-10, D-11, D-12, D-19, D-20, D-21, D-26 | Flagged consumes `AdminListItem` like its siblings; the flag line becomes a named sub-anatomy (`reporter · reason · when` + wrapped detail) shared by the suite; one separator, one specimen scale, one date format |
| **F-γ · the panel reaches past glass-ui and then overrides it per instance** | D-6, D-7, D-13, D-15 | `emphasis`/`tone`/`size="xs"`/`iconOnly`/`loading` at every Button; `size` at every Badge; delete `variant`, `h-7 px-2`, `text-caption font-display`, `text-mono-caption` from the call sites |
| **F-δ · danger is styled, not designed** | D-2, D-16, D-17, D-22 | one suite-level destructive-confirmation composition; severity carried by `tone` on the reason, not by a resting red on the count; non-colour state channels for forced colors |
| **F-ε · proportion by remainder** | D-8, D-23, D-24 | the toolbar is a composition (count and its control adjacent), not `flex-1`; the Admin route takes full main width and the companion goes to zero |

---

## 4. What is *not* wrong

Stated so the negative is proven rather than assumed:

- `verbatimModuleSyntax` — the file has no type-only imports; nothing to violate (`:137-146`).
- Edict 1 (no god modules) — 153 lines, one job, no shared-mutable reach; the composable is separate.
- Edict 3 (KISS) — no new `shared/` dir, no wrapper component invented; `EmptyState`,
  `AdminListSkeleton`, `PaginationBar` are all pre-existing.
- Edict 6 (animations never deleted) — nothing was removed; there was never any.
- Vue 3.5 idioms — no props and no template refs, so `useTemplateRef` / reactive destructure /
  `shallowRef` do not apply.
- The three icon-only buttons and the delete command all carry `aria-label`, and the glyphs are
  `aria-hidden` (`:10-12`, `:97-100`) — the W5-a11y pass held. `REPORT.json` records
  `namelessButtons: 0` on this route in all four matrices, and none of the 4 small-tap-target rows
  belong to this component (they are the dock slug editor: *Switch to slug*, *Generate new slug*,
  *Cancel*).
- `overflowX: 0`, `pageErrors: []`, `consoleErrors: []` on `/#/admin/flagged` in all four matrices —
  true, and true **of an empty card**; see D-10.2.

---

## 5. Verdict

**DEFECTIVE.**

The panel is competently *decorated* and structurally *undesigned*. Its comment blocks are the tell:
four lines reasoning about the hue of a delete button that ships without confirmation (D-2, D-16);
a paragraph declaring that "a dead backend never costumes as a clear moderation queue" above a
composable that costumes a *missing admin token* as exactly that (D-1); a note that "a null palette
is a DELETED palette — never a silent bare slug with an empty strip" above the empty strip (D-11);
and an asymmetric action hierarchy expressed entirely through a prop glass-ui 7 removed (D-6).

Every one of those is the same failure: **a visual intention was written down and not verified
against a rendered state.** The captures prove it — four matrices, one state, and the one state
captured is the state that is lying.
