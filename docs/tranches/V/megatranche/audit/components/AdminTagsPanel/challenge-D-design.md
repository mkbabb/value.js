# CHALLENGE-D — `AdminTagsPanel.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier explicitly
declared for this seat. Nothing was inherited; the declaration and the observation agree.

- **Seat**: CHALLENGE-D (design), mega-tranche per-component audit.
- **Subject**: `demo/palettes/browser/admin/AdminTagsPanel.vue` (126 lines), area `palettes`.
- **Base**: branch `tranche-u`, HEAD `c654824e`.
- **Verdict**: **DEFECTIVE**. 3 BLOCKER · 9 MAJOR · 6 MINOR · 2 INFO.
- **Writes**: only under `docs/tranches/V/megatranche/audit/components/AdminTagsPanel/`. No
  source touched. All browser work read-only (navigation, `emulateMedia`, and DOM-injected
  measurement replicas that were removed with the page).

---

## 0. Method and its honest limits

Four evidence classes are used, and each finding says which it rests on.

1. **Shipped captures.** `docs/tranches/V/megatranche/audit/visual/shots/{safari-desktop-light,
   safari-desktop-dark,safari-mobile-light,safari-mobile-dark}/admin-tags.png` — read as images.
2. **Live DOM measurement** on the running dev server (`http://localhost:9000/#/admin/tags`),
   Playwright, viewports 1440×900 / 720×450 / 390×844 / 320×700, plus `emulateMedia` arms for
   `prefers-reduced-motion: reduce`, `forced-colors: active`, and `dir="rtl"`.
3. **Cascade replica.** The populated state is not reachable on this machine: the dev server runs
   `dev:web-only`, so `initApiEnvironment` (`demo/platform/transport/availability.ts:151-164`)
   latches `misconfigured` and the tag list never renders real rows. To measure the populated
   state honestly I injected the **exact class strings copied byte-for-byte from
   `AdminTagsPanel.vue:85-108`** into the live route's own card body, so every measurement resolves
   through the real cascade, real tokens, real aurora ground. Findings that rest on the replica are
   labelled **[replica]** and their reproduction says so. Geometry and computed style are real;
   only the data is synthetic.
4. **Source + API read** — `demo/palettes/useAdminTags.ts`, `demo/palettes/admin/AdminPane.vue`,
   `demo/shell/viewSchema.ts`, `api/src/modules/admin/service/tags.ts`, `@mkbabb/glass-ui@7.0.0`
   type declarations and compiled runtime.

A correction I owe the record: my first focus probe read `opacity: 0` on the delete control while
`:focus-visible` matched, and I nearly filed "keyboard focus is invisible". It was a measurement
artifact — I sampled inside the element's own `transition-all 0.2s`. Re-measured after a 600 ms
settle the value is `opacity: 1` with a painted ring. **Keyboard focus is NOT a defect and is not
filed.** The touch-path defect below is a different mechanism and survives.

---

## 1. Visual truth — what the four shipped captures actually show

### 1.1 Desktop, light and dark (`safari-desktop-light|dark/admin-tags.png`, 1440 CSS px)

Two equal cards. Left: `Tags`. Right: an **empty `My Palettes` card** that has nothing to do with
tag taxonomy. Measured live, not eyeballed:

```
main                     w=1408
Tags card                x=199  w=512   36.4% of main
"My Palettes" companion  x=729  w=512   36.4% of main
```

The two cards are byte-identical in width; the companion is in its true-empty state (`· EMPTY
PLATE ·`, `No saved palettes yet.`). So the Tags route spends **half its content band, and 36.4% of
`<main>`, rendering an empty specimen plate for a different domain.**

The whole left card body below the header is then mostly void: at 0 tags the panel is
`toolbar → create form → EmptyState`, and the EmptyState's dot-trio + two lines float in the middle
of a 673 px-tall card with roughly 300 px of unowned space beneath them. Nothing occupies the
interval; nothing collapses.

Dark mode is not a separate treatment — it is the same geometry with the plate darkened. The
category `section-label` rung, the chip fill (`bg-muted/30`) and the chip edge
(`border-card-edge`, measured `oklab(0.216 … / 0.12)`) all thin out against the darker plate, and
the chip becomes an outline of an outline. There is no dark-specific chip material.

### 1.2 Mobile, light and dark (`safari-mobile-*/admin-tags.png`, 390 CSS px)

The dock renders a **`Tags | Palettes` segmented pane selector**. That control exists only because
the desktop composition has a companion pane to switch between. Its presence on mobile is the
downstream cost of §1.1.

And the create form is visibly broken in the shipped capture: the primary field's placeholder
`Tag name...` is **clipped mid-glyph** while the secondary `Category...` well sits beside it at a
larger fixed width. That is measurable and measured — see D-5.

### 1.3 The populated state, rendered [replica]

`evidence/D-tags-cascade-replica-1440-light.png` (this directory). Three things read wrong at a
glance and are argued in design terms below: the category heading (`MOOD`) is smaller and quieter
than the chips it heads; a long tag becomes a two-line 330 px lozenge next to a 67 px pill so the
row has no rhythm; and **no chip shows any delete affordance at rest** — the panel looks read-only.

---

## 2. Defects

### BLOCKER

---

#### D-1 — An unbounded, cross-collection destructive write fires on one click of a hover-only 16 px glyph, with no confirmation, no scope, no result

`AdminTagsPanel.vue:98-104` binds `@click="tagsApi.deleteTag(tag.name)"` directly. There is no
intermediate state, no dialog, no typed confirmation.

What that click actually does, server-side — `api/src/modules/admin/service/tags.ts:72-90`:

```ts
await services.withTransaction(async (session) => {
    const deleted = await tags.deleteByName(name, session);
    if (deleted === 0) throw new NotFoundError("Tag not found");
    await palettes.pullTagFromAll(name, session);   // ← every palette in the database
});
```

So the operation is not "remove a row from a list". It is **"strip this tag from every palette in
the product, irreversibly"**. The UI never states the scope, never names how many palettes carry
the tag, never asks, and — see D-8 — never reports the outcome.

The suite's own sibling proves this is a deliberate omission rather than a missing convention:
`AdminUsersPanel.vue:157-181` ships a full glass-ui `Dialog` confirmation whose description ends
`"and all associated data. This cannot be undone."` for its destructive verbs. The five-route admin
suite therefore contains two contradictory destructive grammars, and the *wider-blast-radius* one
is the unguarded one.

- **Canon**: `VISUAL-CONSTITUTION.md §7` — "Admin is a five-route review suite … using one review-row
  anatomy, query/pagination/state grammar, **dangerous confirmation** and responsive disclosure."
  `PROPORTION-AUDIT.md` PR-11 — "Admin rows obscure actor/scope/effect → **ADD-AFFORDANCE** … One
  review anatomy with authority/state/confirmation."
- **Evidence**: `demo/palettes/browser/admin/AdminTagsPanel.vue:98-104` ·
  `demo/palettes/useAdminTags.ts:87-96` · `api/src/modules/admin/service/tags.ts:72-90` ·
  counter-example `demo/palettes/browser/admin/AdminUsersPanel.vue:157-181`.
- **Reproduction**: read the three files. The click path from template to `$pull`-from-all is
  unbroken and contains no confirmation node. (Live end-to-end execution requires a real admin
  session against a live backend, which this machine's `dev:web-only` server cannot reach.)
- **Cure (architectural)**: the delete verb moves out of the chip and into the same
  `Dialog` confirmation composition `AdminUsersPanel` already owns, promoted to a shared admin
  destructive-confirmation seat, carrying the *scope* the server implies — "`warm` is on N palettes.
  Deleting removes it from all of them. This cannot be undone." Scope requires the list endpoint to
  return a usage count; that is the honest fix, not a copy-writing patch.

---

#### D-2 — The delete control is invisible at rest, is gated behind `@media (hover: hover)` so it can never appear on a touch device, and is still the live hit target at `opacity: 0`

`AdminTagsPanel.vue:99` — `class="… opacity-0 transition-all group-hover:opacity-100 …"`.

The generated rule, read out of the live stylesheet:

```
.group-hover\:opacity-100 {
  &:is(:where(.group):hover *) {
    @media (hover: hover) {   ← the gate
      opacity: 1;
    }
  }
}
```

On any `hover: none` pointer — every phone and tablet, i.e. both mobile matrices of the shipped
capture — that rule **cannot match**. The only remaining reveal path is `:focus-visible`, and on
touch the way to focus a button is to tap it, which *is* the delete.

Meanwhile the invisible element remains hit-testable. Measured live at 1440 [replica]:

```
delOpacity                : "0"
invisibleButtonIsHitTarget: true          // document.elementFromPoint at the button's centre
hitTag                    : path (the X icon inside the button)
pointer-events            : auto
```

So the composed state on touch is: **a permanently invisible, permanently live, unconfirmed
control that destroys data across the whole database, sitting inside every tag pill.** D-1 and D-2
are separable defects but they compose into the single worst state in this component.

- **Canon**: `PROPORTION-AUDIT.md` PR-07 — "**Hover-only**/unlabeled controls and invisible drag
  state → ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a name/state."
  `§5 Card and micro-UI laws` 5 — "A small icon/mark is either data, status, labeled action, drag
  affordance, focus/selection register or removed."
- **Evidence**: `AdminTagsPanel.vue:99` · live stylesheet dump of `.group-hover\:opacity-100`
  showing the `@media (hover: hover)` wrapper · `elementFromPoint` hit test returning the button's
  own `<path>` at `opacity: 0`.
- **Reproduction**: load `/#/admin/tags`, inject the chip replica, `getComputedStyle(btn).opacity`
  → `"0"`, `document.elementFromPoint(cx, cy)` → inside the button. Grep the served CSS for
  `group-hover\:opacity-100` → the `@media (hover: hover)` gate.
- **Cure**: delete the reveal mechanism entirely. The producer `Chip mode="removable"` (D-4) renders
  its remove button **always present** with a producer `focus-ring`; visibility stops being a
  consumer concern.

---

#### D-3 — The route's mandated composition was never built: an empty foreign companion takes 36.4% of `<main>`, and its mobile pane selector is still shipping

`demo/shell/viewSchema.ts:224-232`:

```ts
"admin-tags": { left: "admin-tags", right: "palettes", label: "Tags",
                leftLabel: "Tags", rightLabel: "Palettes", icon: Tag, accentHueShift: 0 },
```

Every one of the five admin views declares `right: "palettes"` (`viewSchema.ts:186-232`).

Measured live at 1440×900, `/#/admin/tags`:

| element | x | width | % of `<main>` |
|---|---:|---:|---:|
| `<main>` | 16 | 1408 | 100 |
| Tags card | 199 | 512 | **36.4** |
| `My Palettes` companion (true-empty) | 729 | 512 | **36.4** |

Three named laws are violated at once by the same measurement:

- `VISUAL-CONSTITUTION.md §7 About and Admin` — "**Each Admin route uses the full main width:** the
  current Palettes companion, right label and resulting mobile pane selector are **removed rather
  than restyled**." Measured: 36.4%, companion present, `rightLabel: "Palettes"` present, mobile
  selector present in `safari-mobile-light/admin-tags.png`.
- `PROPORTION-AUDIT.md` PR-04 — "Empty/equal companion Cards and nested housing → **REMOVE** …
  Admin companion **50% → 0**." Measured: 50% of the content band, i.e. 0% of the required removal
  has landed.
- `VISUAL-CONSTITUTION.md §3` law 2 — "Empty secondary content occupies **at most a narrow
  invitation tray (≤15% of the stage)** or disappears. It **never receives half the viewport**."
  Measured 36.4% of `<main>` — **2.4× the ceiling** — and exactly half the content band.

At 720 CSS px the layout does collapse to a single 100%-width card, which shows the collapse
machinery exists; it is simply never engaged on the desktop arm the constitution legislates.

- **Evidence**: `demo/shell/viewSchema.ts:224-232` · live geometry above ·
  `shots/safari-desktop-{light,dark}/admin-tags.png` · `shots/safari-mobile-light/admin-tags.png`
  (the `Tags | Palettes` selector).
- **Reproduction**: `/#/admin/tags` at 1440×900, read the two `.pane-scroll-fade` rects.
- **Cure**: `right` leaves the five admin rows in `viewSchema.ts` and the admin composition becomes
  single-stage full-main-width; the mobile pane selector then has nothing to select and dies with
  it. This is a schema deletion, not a CSS width change.

---

### MAJOR

---

#### D-4 — The tag chip is a hand-rolled clone of a glass-ui primitive that ships the exact needed mode; the producer's geometry was copied while its semantics were reimplemented worse

`@mkbabb/glass-ui@7.0.0` exports `./chip`. Its type surface
(`dist/components/chip/types.d.ts`):

```ts
export type ChipMode = "static" | "selectable" | "action" | "removable";
export interface RemovableChipProps extends ChipVisualProps {
    mode: "removable";
    disabled?: boolean;
    /** Accessible name for the sole remove button in removable mode. */
    removeLabel: string;
}
```

and the compiled runtime renders, for `mode="removable"`, a `<span class="glass-chip …">` wrapping
the content plus an **always-present** `<button type="button" class="glass-chip__remove focus-ring"
:aria-label="removeLabel" :disabled>` that emits `remove` — with a `TypeError` thrown at setup if
`removeLabel` is empty. It also carries `disabled`, `surface`, `tone`, `shape` and `size` axes.

`AdminTagsPanel.vue:94` instead hand-rolls:

```
group flex items-center gap-1 rounded-full border border-card-edge bg-muted/30 px-2.5 py-1
text-mono-small transition-colors hover:bg-accent/50
```

Compare the producer's own `sm` rung (`dist/components/chip/chipVariants.d.ts`):

```ts
readonly sm: "gap-1 px-2.5 py-1 text-caption";
```

`gap-1 px-2.5 py-1` is **verbatim the producer's `sm` geometry**, hand-copied into raw utilities —
with `text-caption` swapped for `text-mono-small` (D-6). So the component did not diverge because
the primitive did not fit; it reproduced the primitive's measurements while discarding its
behaviour: the always-present remove button, the producer `focus-ring`, the enforced accessible
name, the `disabled` state, and the surface/tone axes. D-2 exists *only* because of this bypass.

The primitive is already proven consumable in this repo:
`demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:14` —
`import { Chip } from "@mkbabb/glass-ui/chip";`

- **Canon**: owner edict 4 — "Glass-ui is the design system — variants/primitives belong in
  glass-ui, not in demo/ui/. **Reuse existing component-type names.**" The component-type name here
  is literally `Chip`.
- **Evidence**: `node_modules/@mkbabb/glass-ui/dist/components/chip/{types,chipVariants}.d.ts` ·
  `dist/chip-DFZQr6rV.js` (the `mode === "removable"` branch) · `AdminTagsPanel.vue:90-105` ·
  existing consumer `EasingSpecimenStrip.vue:14`.
- **Reproduction**: `node -e` over `@mkbabb/glass-ui/package.json` → `./chip` is exported at
  `7.0.0`; read the two `.d.ts` files.
- **Cure**: the whole `v-for` chip body becomes
  `<Chip mode="removable" size="sm" :remove-label="\`Delete tag ${tag.name}\`" @remove="…">{{ tag.name }}</Chip>`,
  and D-2 plus half of D-15 disappear as a side effect.

---

#### D-5 — The create form's proportion is inverted below 720 px: a fixed-width secondary starves the elastic primary to 66 px and clips its placeholder — and the in-file comment asserting the opposite is falsified

`AdminTagsPanel.vue:20-35`: name = `class="flex-1 min-w-0 font-mono"`, category = `class="w-36
font-mono"`. The comment immediately above (lines 17-19) claims:

> "the pair sized honestly (name vs category was ~5×; the category well no longer clips its own
> placeholder)."

Measured live, `main input` rects:

| viewport | `Tag name...` | `Category...` | name : category |
|---|---:|---:|---:|
| 1440 | 274 px | 144 px | 1.90 : 1 |
| 720 (≈200% zoom) | 136 px | 144 px | **0.94 : 1** |
| 390 | 136 px | 144 px | **0.94 : 1** |
| 320 | **66 px** | 144 px | **0.46 : 1** |

At 390 and below **the secondary field is wider than the primary**. At 320 the primary holds 66 px
of a 12.03 px Fira Code face — about 8 glyph cells for an 11-character placeholder. The clip is
visible unaided in the shipped capture `shots/safari-mobile-light/admin-tags.png`, where
`Tag name...` renders cut mid-glyph.

The old defect was fixed by shrinking the wrong side of the ratio. `min-w-0` on the elastic member
authorises collapse to zero; `w-36` on the fixed member refuses to yield. The suite's own sibling
gets this right: `AdminAuditPanel.vue:22` uses `class="flex-1 min-w-[6rem] font-mono"` — a real
floor — with a *smaller* fixed partner (`w-32`, line 12). Tags is strictly worse than the repo's own
adjacent precedent on both terms.

- **Canon**: `VISUAL-CONSTITUTION.md §3` law 7 — "Spacing is container-scaled from glass-ui tokens.
  No desktop-tight/mobile-airy fork." `PROPORTION-AUDIT.md §1` — "Every element earns its scale …
  from its job relative to the local protagonist." The tag *name* is the protagonist of this form.
- **Evidence**: `AdminTagsPanel.vue:17-35` · `AdminAuditPanel.vue:12,22` · the measured table ·
  `shots/safari-mobile-light/admin-tags.png`.
- **Reproduction**: `/#/admin/tags` at 320×700, read `document.querySelectorAll('main input')` rects.
- **Cure**: invert the elasticity — the *category* well takes the clamp
  (`min-w-` floor + `max-w-`), the name well takes the remaining inline size with a real
  `min-w-[Nch]` floor sized to its own placeholder; below the breakpoint the pair stacks rather
  than competing. Better still, the pair becomes one glass-ui `labeled-field` composition so the
  floors are producer-owned.

---

#### D-6 — Type hierarchy is inverted and the section heading sits in the wrong family jurisdiction

Measured live at 1440 [replica]:

| element | class | computed size | family |
|---|---|---:|---|
| category heading | `section-label text-muted-foreground` (`:87`) | **14.384 px** | Fira Code, uppercase |
| tag chip content | `text-mono-small` (`:94`) | **16.40 px** | Fira Code |

The heading is **0.877×** the size of the items it heads, non-bold, muted, uppercase — i.e. the
group label is the quietest and smallest thing in its own group. Nothing else supplies the
grouping: `PR-05` and `§4.2` forbid a divider here, and correctly so, which means the *only*
carrier of grouping is a type/interval relation that currently runs backwards.

Separately, the family is wrong. `VISUAL-CONSTITUTION.md §4`:

| Semantic role | Exact glass-ui role | Family |
|---|---|---|
| **section heading** | `text-heading` | **Plus Jakarta Sans** |
| value, code, or provenance | `text-mono-small` / `mono-caption` | Fira Code |

`.section-label` resolves to Fira Code (measured `font-family: "Fira Code", …`). A *category name* —
`mood`, `saturation`, `usage` — is a section heading, not a value or provenance readout. It is
rendered in the value jurisdiction. And `§5` law 13 closes the matrix: "This matrix is closed
across all eighteen compositions. P019's … Picker … pair is the **sole** paired-scale exception."

- **Evidence**: `AdminTagsPanel.vue:87,94` · measured computed sizes above ·
  `VISUAL-CONSTITUTION.md §4` table · `PROPORTION-AUDIT.md §5` law 13.
- **Reproduction**: `/#/admin/tags`, inject the replica, read `getComputedStyle` on the
  `.section-label` and on the chip.
- **Cure**: the category heading takes `text-heading` (Plus Jakarta Sans) at a rung *above* the
  chip content, and the chips drop to the producer `Chip` `sm` rung (`text-caption`) per D-4. The
  two moves are the same edit and restore the heading:member relation in one step.

---

#### D-7 — The category heading measures 4.36:1 on the live plate — below the small-text floor

Sampled from a real screenshot clip of the heading's own rect on the running route (light scheme,
live aurora ground), decoded with PIL:

```
plate background (lightest quintile) : rgb(244, 200, 200)
darkest glyph ink                    : rgb(116,  92,  70)
measured contrast (ink vs plate)     : 4.15 : 1
token colour rgb(112, 89, 66) vs plate: 4.36 : 1
```

The text is 14.384 px, non-bold — small text, whose WCAG floor is 4.5:1. Measured **4.36:1**.

This independently confirms the flag already booked against this exact coordinate:
`docs/tranches/T/audit/w8-certification/passes/admin.p1.md:138` (A-2) names
`AdminTagsPanel.vue:87 (.section-label)` and estimates "light ≈ 3.72:1" analytically. My rendered
measurement is kinder than the analytic proxy but still under the floor — the row does not close.

- **Canon**: `VISUAL-CONSTITUTION.md §4.1` — "Text, focus, boundaries and state meet their rendered
  contrast **on the actual material tier**; a token name is not evidence."
- **Evidence**: measurement above · `AdminTagsPanel.vue:87` · booked prior A-2.
- **Reproduction**: `/#/admin/tags` at 1440, screenshot-clip the heading rect, decode, compare the
  darkest-vs-lightest populations.
- **Cure**: the heading threads the certified de-emphasis rung the `EmptyState` eyebrow already
  threads (`plate-ink`, `EmptyState.vue:52-57` — floor-clamped against the live resting plate)
  rather than the global static `text-muted-foreground`. Fixing D-6 (larger, headings family) also
  moves it above the small-text threshold.

---

#### D-8 — Create and delete have no pending, no failure and no result surface; only *load* has one

`demo/palettes/useAdminTags.ts`:

```ts
} catch (e) { console.warn("Failed to create tag:", e); }   // :80-82
} catch (e) { console.warn("Failed to delete tag:", e); }   // :93-95
```

`loadTags` sets `loadError` and the panel renders a proper `EmptyState variant="error"` with Retry
(`AdminTagsPanel.vue:68-79`). The two **mutations** — including the D-1 cascade — resolve to a
`console.warn`. A failed delete leaves the chip on screen with no explanation; a failed create
leaves the form full with no explanation. `creating` exists but is spent only on the disabled
attribute (`:42`); there is no spinner, no optimistic row, no busy chip.

Delete has no pending state at all — `UseAdminTags` has no `deleting` field
(`useAdminTags.ts:15-27`), so between click and server round-trip the UI is identical to before the
click. On a slow link the user clicks again.

Refresh is the same story: `AdminTagsPanel.vue:10` renders a static icon, whereas the sibling
`AdminUsersPanel.vue:39` binds `:class="loading && 'animate-spin'"` on the same glyph. Two refresh
grammars, one suite.

- **Canon**: `PROPORTION-AUDIT.md` PR-08 — "Pending/failure/export/recovery truth only transient →
  **ADD-AFFORDANCE** … Persistent entity status/recovery." `VISUAL-CONSTITUTION.md §4.1` —
  "Selected, **failed, pending**, withdrawn and disabled states are never colour-only … explicit."
  `§5` — "Persistent operation state stays with the entity/workspace."
- **Evidence**: `useAdminTags.ts:15-27,65-96` · `AdminTagsPanel.vue:10,42` ·
  `AdminUsersPanel.vue:39`.
- **Reproduction**: read the two `catch` blocks; the `UseAdminTags` interface has no error or
  pending field for either mutation.
- **Cure**: the port grows per-entity operation state (`pending: Set<name>`, `opError`), the chip
  renders its own busy/failed register through the `Chip` `disabled`/`tone` axes, and the failure
  is durable next to the entity rather than transient — the same shape PR-08 demands everywhere.

---

#### D-9 — The loading skeleton is a structurally dishonest shadow of the settled state, guaranteeing layout shift

`AdminTagsPanel.vue:51-65` renders **one flat row** of 5 pills with widths alternating `w-20`/`w-14`
by `i % 2`.

The settled state (`:85-108`) is *N* category groups, each a `section-label` heading plus a wrapped
row of chips whose widths are the tag names. The skeleton contains **zero headings**, a fixed count
unrelated to the data, and a decorative width alternation that encodes nothing. On resolution the
panel jumps from one row to (headings + rows). Sibling panels shadow their real rows via
`AdminListSkeleton` (`AdminNamesPanel.vue:27`, `AdminFlaggedPanel.vue:17`); Tags is the only member
whose skeleton is not the silhouette of its own content.

The in-file comment (`:49-50`) claims the register is right — "tag chips load as chip-shaped
shadows in the ONE loading-ink register". The *ink* register is right (`skeleton-ink-register`,
`demo/styles/utils.css:56-61`). The *structure* is not, and structure is what a skeleton is for.

- **Canon**: `VISUAL-CONSTITUTION.md §7` — "Request-bound skeletons exist only while real work is in
  flight" (the register); `§6` — "The CSS ground is the honest first frame … no rAF-delayed blank."
- **Evidence**: `AdminTagsPanel.vue:51-65` vs `:85-108` · `AdminNamesPanel.vue:27` ·
  `AdminFlaggedPanel.vue:17`.
- **Reproduction**: read the two blocks; the loading tree has no `.section-label` node and the
  settled tree always does when `groupedTags` is non-empty.
- **Cure**: the skeleton is generated from the same group shape — one heading shadow plus a chip row
  per expected group — or, simpler and more honest, the panel keeps the previous list visible with a
  busy affordance and does not fake structure it does not know.

---

#### D-10 — The five-route suite ships three different list grammars, and Tags has none of them: no filter, no pagination, no ordering, no cap

- Users, Names → `SearchBar` (gated at `AdminPane.vue:11-22` to exactly those two).
- Audit, Flagged → `PaginationBar` (`AdminAuditPanel.vue:83`, `AdminFlaggedPanel.vue:126`).
- **Tags → neither.**

`getAdminTags` returns the whole collection (`api/src/modules/admin/service/tags.ts:39-43`,
`findAllSorted`) and the panel renders every row. There is no client filter, no server page, no
"show more". A taxonomy is precisely the surface that grows monotonically and is never pruned.

The rendered consequence at scale, measured [replica] at 1440: chip widths in one row ranged
64.2 px (`ui`) to 462 px (a 67-character tag), and the long chip **wrapped to two lines inside a
`rounded-full` pill** — 55.9 px tall at 1440, 68.8 px at 390, 88.4 px at 320. A stadium radius on a
two-line box is not a chip; it is a lozenge, and the row's optical rhythm collapses. There is no
`truncate`, no `max-w-`, and the API applies no name-length cap
(`api/src/modules/admin/service/tags.ts:45-70` inserts `name` unvalidated for length).

- **Canon**: `VISUAL-CONSTITUTION.md §7` — the five routes use "**one** review-row anatomy,
  query/pagination/state grammar". `§5 Card and micro-UI laws` 8 — "Real rendered relation wins over
  token intent."
- **Evidence**: `AdminPane.vue:11-22` · `AdminAuditPanel.vue:83` · `AdminFlaggedPanel.vue:126` ·
  `AdminTagsPanel.vue` (no filter/pagination anywhere) · measured chip widths and wrap heights ·
  `evidence/D-tags-cascade-replica-1440-light.png`.
- **Reproduction**: `/#/admin/tags`, inject the replica containing a 67-char tag; read the chip rect
  (`h=55.9` at 1440 with `border-radius: 9999px`).
- **Cure**: Tags adopts the same query/pagination composition its siblings already own — filter by
  name and by category, page the result — and the chip takes a `max-inline-size` with a truncation
  + title/tooltip disclosure so the pill stays a pill.

---

#### D-11 — Every glass-ui `Button` in this panel is per-instance-overridden past its own size rung

`AdminTagsPanel.vue:10` and `:40` both read `variant="outline" size="sm" class="h-7 px-2"`. The
`size="sm"` prop already resolves a height and inline padding at the producer; `h-7 px-2` overrides
both from the consumer. Measured live: those buttons render **28 × 36 px** — the `h-7` (28 px) is
being *overridden back* by the producer's own min-height, so the consumer override does not even
win, it only obscures which rung is in force.

The same three tokens appear at `AdminAuditPanel.vue:30`, `AdminFlaggedPanel.vue:10`,
`AdminNamesPanel.vue:55,63,107` — the override is a copied idiom across the suite, which is exactly
how a producer rung silently stops being the source of truth.

- **Canon**: owner edict 5 — "Root-level styling — style at the shadcn/glass root component level,
  **never per-instance overrides**." `PROPORTION-AUDIT.md` PR-12 — "Touch padding bloats/misaligns
  visual glyphs → TIGHTEN … Invisible/seat geometry preserves target floor while optics follow rung."
- **Evidence**: `AdminTagsPanel.vue:10,40` · measured 28×36 rects · sibling sites listed above.
- **Reproduction**: `/#/admin/tags`, read the rects of `button[aria-label="Refresh tags"]` and
  `button[aria-label="Create tag"]`.
- **Cure**: if the admin toolbar genuinely needs a tighter rung than `sm`, that rung belongs in
  glass-ui as a size value; the six consumer sites then carry a prop, not a class.

---

#### D-12 — The error surface pours a 400-character developer diagnostic into the user plate, centred, in mono, at 10 lines

Captured live and visible in `evidence/D-tags-cascade-replica-1440-light.png`: the
`EmptyState variant="error"` `detail` slot (`AdminTagsPanel.vue:72`,
`:detail="tagsApi.loadError.value"`) receives the raw `e.message`
(`useAdminTags.ts:58`). In the dev-misconfig arm that message is 400 characters of operator
instructions ("…Run `npm run dev` (the full local stack via scripts/dev.sh up) instead of `npm run
dev:web-only`, or set VITE_API_URL to…").

`EmptyState.vue:26-28` renders it as `text-mono-small plate-ink max-w-[44ch] break-words` inside a
`text-center` column. Ten lines of centred monospace with both edges ragged is the least readable
form available, and it occupies roughly 46% of the panel body height, displacing the create form's
visual claim on the panel.

The design defect is not the message's existence — it is that the error composition has **no length
budget and no disclosure**: any exception string, of any length, is rendered verbatim, centred, at
full weight.

- **Canon**: `VISUAL-CONSTITUTION.md §5` — "A transient flourish may celebrate success but never
  carries the only truth" / `§4.1` — failure states are "explicit"; `§7 About` sets the precedent
  that prose is bounded (`≤66ch`) and that a diagnostic is not a headline.
- **Evidence**: `AdminTagsPanel.vue:68-79` · `EmptyState.vue:19-30` · `useAdminTags.ts:56-59` ·
  `demo/platform/transport/availability.ts:119-130` (the 400-char message) ·
  `evidence/D-tags-cascade-replica-1440-light.png`.
- **Reproduction**: `/#/admin/tags` on a `dev:web-only` server with an admin token present — the
  error arm renders as captured.
- **Cure**: the error composition owns a two-tier shape — a bounded human statement (already
  present: "The tag ledger is unreachable.") plus a *collapsed* technical detail behind a named
  disclosure, left-aligned when it exceeds one line. That is one change in `EmptyState`, not in
  every caller.

---

### MINOR

---

#### D-13 — `ml-0.5` is a physical margin and does not flip in RTL

`AdminTagsPanel.vue:99`. Measured with `document.documentElement.dir = "rtl"` at 1440 [replica]:

```
margin-left : 2px      margin-right: 0px
chip x=1132 w=84   |   span x=1165   |   button x=1145   (button now visually left of the label)
```

In RTL the flex row reverses, so the 2 px that was meant to separate the label from the remove
glyph lands on the button's *outer* side, against the pill's inner edge, and the intended
separation drops to 0. A 2 px error, but it is the one directional idiom in the file and it is
wrong. `§6.1` — "chrome, navigation and layout — **logical** inline/block direction follows the
document."

- **Cure**: `ms-0.5` — or nothing at all, because the parent already sets `gap-1` and the producer
  `Chip` owns this spacing (D-4).

---

#### D-14 — The delete control's motion is `transition-all`, untokenized, and animates `transform`

Measured: `transition-property: all`, `transition-duration: 0.2s`. `AdminTagsPanel.vue:99` also
carries `active:scale-95` — a transform — so `all` is animating layout-adjacent geometry, and any
property added later is animated by accident. No `--animation-slide-sm/md/lg` token and no
producer spring is involved; 0.2s / `cubic-bezier(0.4,0,0.2,1)` is the Tailwind default.

Reduced motion is honoured — under `prefers-reduced-motion: reduce` the computed transition becomes
`0.1s / opacity, color, background-color, border-color, box-shadow` (a global reset shortens the
duration and drops `transform`), and the settled focus state is unchanged. So this is a **tokenizing
and property-scope** defect, not a PRM defect.

- **Canon**: `VISUAL-CONSTITUTION.md §6` — "Spatial continuity uses **one producer-owned glass-ui
  spring register**"; owner edict 6 — animations are moved or tokenized, never ad hoc.
- **Cure**: name the properties (`transition-opacity`/`transition-colors`), or let the producer
  `Chip` own the interaction motion entirely.

---

#### D-15 — Sub-minimum touch targets that scale with the data

Measured at 1440 / 390 / 320, identical at all three: every `Delete tag …` button is **16 × 16 CSS
px**. WCAG 2.2 SC 2.5.8 (Target Size, Minimum) floor is 24 × 24 with no applicable exception here
(the targets are neither inline-in-a-sentence nor UA-controlled). The toolbar's refresh and create
buttons measure 28 × 36 — above the 24 floor, below the 44 comfort target the shipped audit counts
(`REPORT.md` records 4 `smallTapTargets` on `/#/admin/tags` in **all four matrices**, at zero tags).

The count is unbounded: it is 4 + N, one extra sub-minimum target per tag.

- **Evidence**: measured rects; `visual/REPORT.md` `smallTapTargets` rows for
  `/#/admin/tags` (4 in each of the four matrices).
- **Cure**: the producer `Chip` remove button carries the producer's own target geometry (D-4);
  `§5` law 7 — "Visual glyph size, operable target size and layout reservation are separate
  quantities" — is the licence to keep the 12 px glyph inside a 24 px seat.

---

#### D-16 — Three count grammars in one suite

`AdminPane.vue:117-131` returns a header `Badge` count for `admin-users` and `admin-names` and
`null` for the other three. Tags then renders its own count *in the body toolbar*, on the **left**
(`AdminTagsPanel.vue:5-7`), as does Flagged (`AdminFlaggedPanel.vue:5-7`), while Audit renders its
count on the **right**, after the spacer (`AdminAuditPanel.vue:26-28`). Same suite, same datum,
three placements. `§7` requires one grammar.

---

#### D-17 — `<div class="flex-1" />` as a spacer

`AdminTagsPanel.vue:8` (and `:24` of Flagged, `:23` of Audit). An empty element whose only job is to
push. `justify-between` — or the `Chip`/toolbar composition — expresses the same intent with no
node. Owner edict 3, KISS / no contrivance.

---

#### D-18 — The `EmptyPaletteMark` dot trio is borrowed to mean "no tags"

`AdminTagsPanel.vue:82` renders `EmptyState` in its default `empty` variant, which paints three
`WatercolorDot`s reading `var(--accent-live)` (`EmptyState.vue:42-47`). `VISUAL-CONSTITUTION.md §2`
scopes that species to "swatches, active mark, pastel `Palettes` identity … they remain colour
because they **depict colour**". Three colour ghosts standing in for an absent *string taxonomy*
depict nothing. `§7` names the mark as the *palette* empty invitation specifically. Visible in all
four shipped captures.

---

### INFO

---

#### D-19 — The unauthenticated state has never been designed; it renders as TRUE-EMPTY, and that is what the shipped audit captured

`useAdminTags.ts:49-51`:

```ts
async function loadTags() {
    const token = getToken();
    if (!token) return;          // ← loading stays false, loadError stays null, tags stays []
```

The panel then falls to `v-else-if="tagsApi.tags.value.length === 0"` and renders
`eyebrow="· no tags minted ·" message="No tags yet."`.

That is exactly what the four shipped captures show: the dock reads **`Login`** — no admin session —
and the panel asserts the ledger is empty. Three distinct truths (unauthorized / empty / unreachable)
collapse into two rendered states, and the missing one is the one the visitor is actually in. This
is the same class as the F-2 defect the file's own comments claim to have cured for the *load-error*
axis (`:67`, "error ≠ empty"); the *authorization* axis was never given a state.

Filed INFO rather than MAJOR because the route's access-control policy sits above this component —
but the component is where the lie is rendered, and the audit's own screenshots are the evidence.

- **Evidence**: `useAdminTags.ts:49-51` · `AdminTagsPanel.vue:82` ·
  `shots/safari-{desktop,mobile}-{light,dark}/admin-tags.png` (dock shows `Login`; panel shows
  `· NO TAGS MINTED ·`).
- **Cure**: `loadTags` distinguishes "no session" from "no rows", and the panel gains a third
  branch — or the route is gated above the panel so the state cannot be reached.

---

#### D-20 — `@click="tagsApi.loadTags"` passes the `MouseEvent`; the retry path uses `loadTags()`

`AdminTagsPanel.vue:10` vs `:75`. Harmless today (`loadTags` takes no parameters) and inert as a
defect, but it is a live footgun the moment the signature grows, and the two spellings sit 65 lines
apart in one file.

---

## 3. Family grouping — the four mechanisms behind twenty findings

| Family | Mechanism | Members |
|---|---|---|
| **F-A · producer bypass** | a shipped glass-ui primitive was re-implemented from raw utilities, so every behaviour it owns had to be re-invented and was re-invented worse | D-2, D-4, D-11, D-13, D-14, D-15 |
| **F-B · composition never executed** | the constitution's Admin composition (full main width, no companion, one review anatomy, one query grammar) was legislated but never built | D-3, D-9, D-10, D-16, D-17 |
| **F-C · state truth incomplete** | states that exist in the system have no rendered form: authorization, mutation-pending, mutation-failure, over-long error | D-1 (confirmation), D-8, D-12, D-19 |
| **F-D · type & ink jurisdiction** | headings borrowed the value family and the muted ink rung, inverting hierarchy and failing contrast | D-5, D-6, D-7, D-18 |

The single architectural transposition that dissolves most of F-A and part of F-C: **adopt
`Chip mode="removable"` and route its `remove` through the admin destructive-confirmation Dialog
that `AdminUsersPanel` already owns.** That one move retires D-2, D-4, D-13, D-14, D-15 outright,
converts D-1 from "absent" to "shared", and gives D-8 a producer-owned `disabled` seat to render
pending into. It is a subtraction — the panel gets shorter, not longer, which is what
`PROPORTION-AUDIT.md §6` means by "Subtraction precedes explanation."

## 4. What is NOT defective (the negative half, so the report is honest)

- **Keyboard focus on the delete control works.** Settled measurement after the 0.2s transition:
  `opacity: 1`, ring painted (`box-shadow: … rgb(28,25,23)`), `:focus-visible` matching. In
  `forced-colors: active` the ring is dropped (`box-shadow: none`) but the UA forces its own
  `outline-style: solid`, so focus survives. My first reading said otherwise and was wrong.
- **`prefers-reduced-motion` is honoured** through a global reset: duration drops to 0.1s and
  `transform` leaves the transition list.
- **Accessible names are complete** — all three icon-only controls carry `aria-label`, the loading
  region carries `role="status"` + label, and the shipped audit reports **0 `namelessButtons`** on
  `/#/admin/tags` in all four matrices.
- **No horizontal overflow, no page errors, exactly one `<main>`** on this route in all four
  matrices (`visual/REPORT.md` rows for `/#/admin/tags`).
- **`verbatimModuleSyntax` is satisfied** — the SFC imports no types.
- **The load-error state is genuinely distinct from empty** (`:67-79`), which is more than most of
  this app's surfaces manage; the defect is that only *one* of three axes got that treatment.

## 5. Strongest single defect

**D-1 + D-2 composed**: on any touch device, every tag pill contains a permanently invisible,
permanently tappable 16 px control that, with no confirmation and no reported outcome, deletes the
tag **and strips it from every palette in the database** (`api/src/modules/admin/service/tags.ts:
72-90`, `palettes.pullTagFromAll`). The invisibility is not a rendering accident — it is
`opacity-0` revealed only by `group-hover`, and the generated rule wraps that reveal in
`@media (hover: hover)`, which no touch device satisfies.

---

*Report: `docs/tranches/V/megatranche/audit/components/AdminTagsPanel/challenge-D-design.md`*
*Evidence: `./evidence/D-tags-cascade-replica-1440-light.png`*
