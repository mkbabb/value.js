# CHALLENGE-D — AdminNamesPanel.vue · the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
spawned with. Declared, not inherited.

- **Seat:** CHALLENGE-D (design), premise: the design is wrong; find how.
- **Subject:** `demo/palettes/browser/admin/AdminNamesPanel.vue` (152 lines), area `palettes`.
- **Route:** `/#/admin/names`.
- **Base:** branch `tranche-u`, HEAD `c654824e`.
- **Verdict: DEFECTIVE.** 18 findings; 2 BLOCKER, 8 MAJOR, 6 MINOR, 2 INFO.
- **Writes:** this file only. No source touched.

---

## 0. The gestalt failure, stated once

The premise holds, and the shape of the wrongness is specific:

> **This was designed as a *list of two strings*, not as a *review instrument*.**

Every defect below is a consequence of that one substitution. A review instrument owes the
reviewer four things the canon names explicitly — *actor, scope, provenance, effect*
(`VISUAL-CONSTITUTION.md:218`) — plus confirmation before irreversible harm and a durable
record of what the command actually did (`PROPORTION-AUDIT.md:52`, PR-08). This panel renders
a color name, a CSS literal, and two icon buttons. It has no actor, no timestamp, no
normalized slot, no confirmation, no undo, no failure surface, and no pagination. Where it
*was* designed carefully, it was designed at the wrong altitude: enormous craft went into the
error-vs-empty split for **loads** (`W5-5/F-2`, lines 30–41 and 80–91) while **mutations** —
the only thing a moderator actually does here — got nothing.

The component's own comments are the tell. Lines 2–12 spend eleven lines on a grid
`min-width:auto` fix. Not one line of the file concerns what happens when Approve fails.

---

## 1. Visual truth — the screenshots first

Read at desktop 1440 and mobile, light and dark:

- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/admin-names.png`
- `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-dark/admin-names.png`
- `docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/admin-names.png`

### 1.1 The selected-tab pill hangs out of its own track

This is the first thing the eye catches in all four captures and it is not a rendering
artifact. Reproduced live and measured at 1440×900:

```
route  http://localhost:9000/#/admin/names   viewport 1440×900   main w=1408

track   .segmented-tabs                 x=224.00  y=257.73  w=462.00  h=39.00  bottom=296.73
active  .segmented-tab[aria-pressed=true] x=228.00 y=261.73  w=227.00  h=31.00  bottom=292.73
indicator .segmented-indicator          x=228.14  y=269.79  w=227.94  h=38.90  bottom=308.68
inline style: left:0px; top:0px; width:227.944px; height:38.9032px;
              translate: 4.13721px 12.0594px; opacity:1

edge delta (indicator − active button):
  left   +0.14      right  +1.07
  top    +8.06      bottom +15.95
indicator bottom − TRACK bottom: +11.95
```

`VISUAL-CONSTITUTION.md:89` — "A selected `SegmentedTabs` item has one producer-owned filled
indicator **whose four edges match the active inner button within 0.5px** across
orientation/viewport/direction". Measured worst edge **15.95px = 31.9× the tolerance**, and the
fill physically escapes its container by 11.95px. The producer is computing the indicator's
`height` from the **track** (38.90 ≈ track 39.00) and its y-`translate` as 12.06px where the
button's actual offset inside the track is 4.00px.

The mobile capture shows the same overhang proportionally larger. The Dock's own
`SegmentedTabs` instance on the same page measures `delta {left:0, right:0, top:0, bottom:0}` —
so the primitive *can* land exactly; this instance does not.

### 1.2 The companion the canon deleted is still there, at equal weight

Measured live at 1440×900:

```
main                    x=16   w=1408
.pane-wrapper--left     x=199  y=103  w=512  h=774   (Names — the protagonist)
.pane-wrapper--right    x=729  y=103  w=512  h=774   (My Palettes — the companion)
```

Names occupies **512/1408 = 36.4%** of the main. The companion occupies an identical
**512px, 36.4%** — same width, same height, same `glass-resting card` material, same shadow.

Three binding rules, all failed:

| Rule | Required | Measured |
|---|---|---|
| `OPTICAL-BENCH-COMPOSITIONS.md` §4, Admin·Names | "Full-width proposal queue"; "**Companion `0`**" | companion 512px |
| `PROPORTION-AUDIT.md:48` PR-04 | "Admin companion **`50%→0`**" | 50% retained |
| `VISUAL-CONSTITUTION.md:34` §3 law 8 | "Supporting fixtures do not compete with it through **equal size or equal shadow**" | exactly equal, both |

In the Safari capture the companion is *empty* — "No saved palettes yet." — which additionally
trips `VISUAL-CONSTITUTION.md:28` §3 law 2: "Empty secondary content occupies at most a narrow
invitation tray (≤15% of the stage) or disappears. **It never receives half the viewport.**"
It receives half the viewport.

### 1.3 The mobile pane selector the canon retired is still there

`safari-mobile-light/admin-names.png` shows a `Names | Palettes` segmented control in the dock.
`VISUAL-CONSTITUTION.md:32` §3 law 6: "**no global pane selector**, left/right split state, or
simultaneous two-stage miniature survives". `:89` §4.2: "V **retires** the global Dock
`PaneSegmentedControl` and left/right view state." `OPTICAL-BENCH-COMPOSITIONS.md` §4: "V
removes that companion, its right label, and its **mobile pane toggle**."

### 1.4 The card is a tall empty box

Desktop light: the Names card runs to y≈1035 (display px) while its last ink — "No pending
proposals." — ends at y≈810. Roughly 225 display px / 324 real px of unowned acreage below the
content, because the card is `h-full` (`AdminPane.vue:2`) and the `EmptyState` is a
`flex-col items-center justify-center py-8` block that packs to the top of the remaining flow
rather than centering in the card. The empty plate reads as abandoned rather than composed.

### 1.5 Three coordinates of the same zero

The desktop capture states "0" three times in one 250px-tall region: the header `Badge` (`0`),
the tab label (`Pending · 0`), and the plate ("No pending proposals."). `Approved · 0` makes
four. `PROPORTION-AUDIT.md:71` §5 law 6: "**Subtraction precedes explanation.**"

### 1.6 Dark mode

Dark is a straight tonal inversion with no separate treatment. The `hover:bg-destructive/10`
wash (`:64`, `:109`) is an alpha over a dark plate and is the only chromatic signal for the
destructive path; it was never separately toned for the dark pole. Not measured at rest
(no rows render in this environment) — **hypothesis, repro in §6**.

---

## 2. State coverage — the enumeration

`ProposedColorName` (`demo/color-session/color-names.ts:12-20`) carries
`{id, name, css, status: "proposed"|"approved"|"rejected", contributor?, createdAt, approvedAt?}`.

| State | Designed? | Evidence |
|---|---|---|
| loading | ✅ `AdminListSkeleton`×3 | `:26-28`, `:76-78` |
| load error | ✅ `EmptyState variant="error"` + Retry | `:30-41`, `:80-91` |
| empty (true) | ✅ eyebrow plate | `:42`, `:92` |
| populated | ✅ | `:44-71`, `:94-116` |
| **empty (filtered)** | ❌ **renders the true-empty lie** | §3 D-5 |
| **mutation in flight** | ❌ no per-row pending/disabled | `:55`, `:61`, `:106` |
| **mutation failure** | ❌ `console.warn` only | `useColorNameQueue.ts:77,88,100` |
| **mutation success** | ❌ no announcement, row just vanishes | `useColorNameQueue.ts:73,86,97` |
| **disabled** | ❌ never set on any action | grep: 0 `:disabled` in file |
| **`status:"rejected"`** | ❌ **unreachable from both tabs** | 3-member union, 2 tabs |
| focused | ⚠️ producer default only; roving `tabindex=-1` on the inactive tab | measured |
| hovered | ✅ `hover:text-destructive` | `:64`, `:109` |
| pressed / active | ❌ no distinct press register | — |
| selected (row) | n/a — no row selection exists | — |
| dragging | n/a | — |
| **overflowing (long list)** | ❌ **no pagination, no virtualization** | §3 D-10 |
| truncated | ✅ `truncate` on both lines | `:50`, `:52`, `:100`, `:102` |
| **RTL** | ❌ **CSS literals not LTR-isolated** | §3 D-14 |
| reduced-motion | ⚠️ unproven — route absent from the matrix | `shots/reduced-motion-desktop/` has 5 routes, not this one |
| forced-colors | ⚠️ unproven — route absent from the matrix | `shots/forced-colors-desktop/` has 5 routes, not this one |
| zoom 200% | ⚠️ unproven — route absent from the matrix | `shots/zoom-200-desktop/` has 5 routes, not this one |

**Six of twenty-two states are undesigned; three more are unproven** because the visual matrix
captured `adminusers` and not `adminnames` for the forced-colors / reduced-motion / RTL /
keyboard-focus / zoom-200 arms. A state that was never designed is a design defect; a state
that was never captured is an evidence hole, and I label those as such rather than as findings.

---

## 3. Findings

### D-1 · BLOCKER · A failed moderation command is invisible

```
useColorNameQueue.ts:76-78   catch (e: any) { console.warn("Failed to approve:", e?.message); }
useColorNameQueue.ts:87-89   catch (e: any) { console.warn("Failed to reject:", e?.message); }
useColorNameQueue.ts:99-101  catch (e: any) { console.warn("Failed to delete color:", e?.message); }
```

A moderator clicks Approve, the API 500s, and **the UI does not change and says nothing**. The
row stays in Pending. The moderator's model is "I approved it"; the truth is "nothing
happened". There is no toast (vue-sonner was removed repo-wide), no inline row error, no
`aria-live`, no retry for the mutation — the two `Retry` buttons (`:37`, `:87`) re-run *loads*
only (`AdminPane.vue:56-57` → `loadColorQueue` / `loadApprovedColors`).

This is the exact inverse of the care taken at `:30-41`: the panel proves it knows error ≠
empty for reads, and provides nothing for writes.

`PROPORTION-AUDIT.md:52` PR-08 — "Pending/failure/export/recovery truth only transient →
**ADD-AFFORDANCE**. Persistent entity status/recovery."
`VISUAL-CONSTITUTION.md:101` — "Persistent operation state stays with the entity/workspace. A
transient flourish may celebrate success but **never carries the only truth**." Here nothing
carries the truth at all.

**Cure (transposition, not patch):** the row is the state owner. Give `AdminListItem` a
`state` slot fed by a per-item operation record (`idle | inflight | failed`), so an in-flight
row dims and disables its own actions and a failed row keeps its place carrying the machine
message and a real per-row Retry. The `EmptyState variant="error"` register already exists —
this is the same species one altitude lower, not a new mechanism.

---

### D-2 · BLOCKER · Irreversible, opposite-valence actions: no confirmation, 28×30px, 6px apart

```
AdminNamesPanel.vue:55-57    Approve  — Button h-7 px-2, <Check class="w-3.5 h-3.5">
AdminNamesPanel.vue:61-69    Reject   — Button h-7 px-2, <XIcon class="w-3.5 h-3.5">
AdminNamesPanel.vue:106-114  Delete   — Button h-7 px-2, <Trash2 class="w-3.5 h-3.5">
AdminListItem.vue:20         actions container: flex items-center gap-1.5 shrink-0
```

Measured Tailwind v4 scale (live: `--spacing = 0.25rem`):
`h-7` = **28px** tall; `px-2` (8+8) + `w-3.5` icon (14) = **30px** wide; `gap-1.5` = **6px**
between them.

So on every pending row, **Approve and Reject — the two commands with opposite and irreversible
meaning — are two 28×30px targets 6px apart, discriminated only by a 14px glyph**, and either
one fires on a single click with no confirmation:

```
:66  @click="emit('reject', item)"   → useColorNameQueue.ts:81  immediate rejectColorName()
:111 @click="emit('delete', item)"   → useColorNameQueue.ts:92  immediate deleteColorName()
```

There is no confirm, no undo, no toast-with-undo. `VISUAL-CONSTITUTION.md:218` — Admin uses
"one review-row anatomy, query/pagination/state grammar, **dangerous confirmation** and
responsive disclosure." `OPTICAL-BENCH-COMPOSITIONS.md` §4 gives Admin·Users "dangerous
confirmation" and Admin·Tags "contextual retirement confirmation"; Names is designed with
neither.

Compounding it: `status: "rejected"` is a real member of the DTO union
(`color-names.ts:16`) and **the panel has two tabs**. A rejected proposal is visible from
nowhere. So the mis-tap is not merely uncofirmed — it is *unobservable after the fact* from
this surface.

`PROPORTION-AUDIT.md:56` PR-12 — "Touch padding bloats/misaligns visual glyphs → TIGHTEN.
**Invisible/seat geometry preserves target floor while optics follow rung.**" The rung was
followed (14px glyph, correct) and the floor was simply dropped: there is no invisible seat
expansion anywhere in this file. `smallTapTargets` on `/#/admin/names` is already **4 in all
four Safari matrices with zero rows rendered** (`REPORT.md:42,57,72,87`); every pending row adds
two more.

**Cure:** one `ConfirmAction` seat for the destructive verb (glass-ui `AlertDialog` family, or
an in-row two-step arm/commit), the approve/reject pair separated by a real interval rather
than 6px, and an invisible `::before` seat expansion to the 44px floor while the visible
lozenge stays on its rung — which is precisely the mechanism PR-12 prescribes.

---

### D-3 · MAJOR · The `SegmentedTabs` indicator misses the active button by 15.95px (31.9× tolerance)

Full measurement in §1.1. Reproduced at `http://localhost:9000/#/admin/names`, 1440×900.
Violates `VISUAL-CONSTITUTION.md:89` (0.5px, four edges, all orientations/viewports).

Mechanism: the JS-measured indicator (`.segmented-indicator--js`) takes its `height` from the
track (38.90 vs track 39.00) instead of the active button (31.00), and its y-`translate`
resolves to 12.06px where the button sits 4.00px inside the track. The Dock's instance on the
same page measures `{0,0,0,0}` — the primitive is sound; this seat is not.

**Attribution honesty:** the indicator geometry is producer-owned (glass-ui). The consumer's
contribution is `class="w-full font-display"` at `:17` (see D-8), which swaps the family to
Fraunces — a webfont whose late metric arrival changes the button box after the producer's
mount-time measurement. I have **not** proven the font is the trigger (I did not bisect it), so
that half is a **hypothesis**; the 15.95px miss itself is CONFIRMED and reproducible.

**Cure:** delete the consumer override (D-8) and relay the residual to the glass-ui BH inbox
per the standing relay fond — the producer must re-measure on `document.fonts.ready` and on its
own `ResizeObserver`, and must measure the *button*, not the track.

---

### D-4 · MAJOR · The Palettes companion is retained at exactly equal weight

Measured in §1.2: 512px vs 512px, equal height, equal material. Required: `0`.
`OPTICAL-BENCH-COMPOSITIONS.md` §4 · `PROPORTION-AUDIT.md:48` PR-04 · `VISUAL-CONSTITUTION.md:28,34`.

**Attribution:** the split is owned by the pane router, not by this file. It is nonetheless the
dominant visual fact of this component's route and the composition it is a member of, so it
belongs in this report; the executing wave is W24 per PR-04.

---

### D-5 · MAJOR · "Queue clear" is displayed over a queue that is not clear

`AdminPane.vue:46-47` feeds the panel the **filtered** lists:

```
useColorNameQueue.ts:27-33
  const filteredColorQueue = useFilteredList(adminColorQueue, deps.searchQuery, …)
  const filteredApproved   = useFilteredList(approvedColors,  deps.searchQuery, …)
useFilteredList.ts:8-11   if (!q) return items.value; return items.value.filter(…)
```

The panel's only zero-length branches are the *true-empty* plates:

```
:42  <EmptyState eyebrow="· queue clear ·"        message="No pending proposals." />
:92  <EmptyState eyebrow="· none approved yet ·"  message="No approved color names." />
```

So with 40 pending proposals and the search box holding `zzz`, a moderator is told
**"· QUEUE CLEAR · / No pending proposals."** The component that so carefully split *error* from
*empty* (`W5-5`, F-2) never split **no-data** from **no-results** — and the second conflation is
the more dangerous one, because it reports the reviewer's job as finished.

`VISUAL-CONSTITUTION.md:114` §5.1 also requires an in-route filter to report its "changed result
count/state through the owning status region"; there is no status region and no announcement.

**Reproduction:** sign in as admin on a queue with ≥1 pending item; type `zzzz` into
"Search color names…"; the queue-clear plate renders. (Not rendered on this dev instance —
both lists are genuinely 0 here, so this is **source-derived** from the three files above,
with the repro recipe stated.)

**Cure:** the empty branch is a three-way, not a two-way — `no-query-no-data`,
`query-no-match`, `data`. The middle arm keeps the plain register and offers "Clear search",
never the eyebrow.

---

### D-6 · MAJOR · The tab counts lie while the data is loading, against a rule this route already codified

```
:19  { label: `Pending · ${pendingItems.length}`,  value: 'pending'  }
:20  { label: `Approved · ${approvedItems.length}`, value: 'approved' }
```

`pendingItems` is `[]` until the request resolves, so during load the strip reads
**`Pending · 0`** directly above three loading skeletons.

Its own parent forbids exactly this, 90 lines away, in a comment:

```
AdminPane.vue:120-128
  // A-3: suppress the badge while the roster/queue loads — a "0" over
  // the loading skeletons lies (the length is 0 before data arrives).
  case "admin-names":
      return pm.loadingColorQueue.value ? null : pm.filteredColorQueue.value.length;
```

The header badge was cured; the tab strip inside the same route commits the identical lie. This
is a codified law violated by its own neighbour — the strongest kind of internal inconsistency.

**Cure:** the count is a property of the loaded list, so it must not exist before the list does.
Derive both labels through the same guard the parent already wrote, or hoist that guard into the
panel and delete the parent's copy — one owner, not two.

---

### D-7 · MAJOR · The decided review anatomy is absent; the data for it is already on the wire

`OPTICAL-BENCH-COMPOSITIONS.md` §4, Admin·Names — measured close: "Companion `0`; **queue state,
normalized slot and decision provenance** survive narrow width."
`VISUAL-CONSTITUTION.md:218` — "**Actor, scope, provenance and effect remain visible.**"
`PROPORTION-AUDIT.md:55` PR-11 — "Admin rows obscure actor/scope/effect → **ADD-AFFORDANCE**.
One review anatomy with authority/state/confirmation."

The DTO already carries every field required:

```
color-names.ts:12-20
  id · name · css · status · contributor? · createdAt · approvedAt?
```

The row renders `name` (`:50`) and `css` (`:52`). **`contributor`, `createdAt`, `approvedAt`
and `status` are fetched and discarded.** There is no normalized slot (the canonical key the
name would occupy), no proposer, no age, and — on the Approved tab — no record of who approved
it or when. A moderator is asked to approve a name with no information about who proposed it or
whether the slot is contested.

The `attribution:"system"` / `"principal"` law (`OPTICAL-BENCH-COMPOSITIONS.md` §4) has no
expression here at all.

**Cure:** `AdminListItem` already has a three-slot anatomy (swatch / content / actions). The
content slot needs its third line — provenance in `text-mono-small` (proposer · relative age ·
normalized slot) — which is the *same* readout register F-9 already established for the CSS
literal. No new component, no new mechanism: one more line in a slot that exists.

---

### D-8 · MAJOR · Control labels render in Fraunces — a closed-type-matrix violation caused by a per-instance override

Measured live at `/#/admin/names`, 1440×900:

```
.segmented-tabs parent element   font-family: "Plus Jakarta Sans"
.segmented-tab[aria-pressed=true] font-family: Fraunces   font-size: 14px   font-weight: 400
```

The family flips solely because of the consumer class at `AdminNamesPanel.vue:17`:

```
class="w-full font-display"
```

`VISUAL-CONSTITUTION.md:75` binding type matrix — "control or label, **including dropdown
options** → `text-small` → **Plus Jakarta Sans**, non-bold." `OPTICAL-BENCH-COMPOSITIONS.md`
"Binding type matrix" repeats it and declares the relation "exact across `ALL18`", with P019's
Picker pair as "**the sole** paired-scale exception". A pending/approved filter is a control.
Measured: Fraunces.

Two more sites in the same file put display type on control copy:

```
:37  <Button … class="font-display">Retry</Button>
:87  <Button … class="font-display">Retry</Button>
```

This is a **family, not a one-off** — `font-display` appears on control seats at 12 sites across
the admin cluster:

```
$ grep -rn "font-display" demo/palettes/browser/admin/
AdminTagsPanel.vue:75 · AdminAuditPanel.vue:49 · AdminUsersPanel.vue:24,35,58,116
AdminFlaggedPanel.vue:29,65,90 · AdminNamesPanel.vue:17,37,87
```

It is also a direct hit on owner edict 5 (root-level styling, never per-instance overrides): the
consumer is reaching into a glass-ui root and rewriting its family from the call site.

**Cure:** delete `font-display` from every control seat in the cluster; if the admin review
register genuinely wants display type somewhere, it belongs on a glass-ui variant, decided once.

---

### D-9 · MAJOR · A four-sided border per row plus a terminal rule, where the law allows one adjacent separator

```
AdminListItem.vue:11   class="flex items-center gap-3 px-3 py-2.5 rounded-md
                              border border-card-edge min-w-0"
AdminNamesPanel.vue:43 <div class="grid gap-2 min-w-0">   ← rows separated by interval AND boxed
AdminNamesPanel.vue:46 swatch: border border-card-edge    ← a further stroke per row
```

`OPTICAL-BENCH-COMPOSITIONS.md` §5, the *complete binding inventory*, Admin·Names:

> "**one low-emphasis separator between adjacent review rows; none after the final row**"

and immediately below the table:

> "Any additional line, automatic P122 divider, consumer-hidden producer line, **terminal row
> rule**, caster stroke or corner rule **is a defect**."

Rendered: **4 strokes per row × N rows + 1 swatch ring per row**, where the law grants exactly
**N−1 single lines** — and the last row's bottom border *is* the named terminal rule. A stack of
boxes is not a separator; it is the "caster stacked within casters" grammar
`VISUAL-CONSTITUTION.md:186` rejects for the palette field, reappearing here.

`PROPORTION-AUDIT.md:69` §5 law 4 — "A divider is retained only when grouping would be ambiguous
without it. **Spacing plus material already expressing the same boundary makes the line
duplicative.**" The rows already have `gap-2` interval *and* an inset; the box is the third
expression of one boundary.

**Cure:** rows lose `border` + `rounded-md`; the field takes one `divide-y` low-emphasis rule
with no terminal edge. This is one class change in `AdminListItem.vue` and it closes the row
across all five Admin members at once, which is what "one review-row anatomy" means.

---

### D-10 · MAJOR · The list is unbounded — no pagination, though the sibling module and the API both have it

```
useColorNameQueue.ts:56    await getApprovedColorNamesAdmin(token)   ← no limit, no offset
color-names.ts:24-33       getApprovedColorNames(limit?, offset?)    ← the API is paginated
demo/palettes/browser/admin/PaginationBar.vue                        ← exists, same directory
$ grep -rn "PaginationBar" demo/ --include=*.vue
  AdminAuditPanel.vue:83,102 · AdminFlaggedPanel.vue:126,144          ← 2 of 5 members use it
```

The Approved list is fetched whole and rendered whole into a `grid gap-2` inside a scrolling
card. At a few thousand approved names this is a few thousand DOM rows. The overflow state was
never designed — and the cure is already sitting in the same folder, already adopted by two of
this component's four siblings.

`VISUAL-CONSTITUTION.md:218` requires Admin to use "one review-row anatomy, **query/pagination/
state grammar**". Three of five members have that grammar. Names is one of the two that do not.

---

### D-11 · MINOR · Three simultaneous `role="status"` live regions during load, inside a role-less labelled wrapper

```
AdminNamesPanel.vue:26  <div v-if="loadingPending" class="grid gap-2"
                             aria-label="Loading pending proposals">
AdminNamesPanel.vue:27  <AdminListSkeleton v-for="i in 3" :key="i" />
AdminListSkeleton.vue:11-12   role="status"  aria-label="Loading"
```

Two defects in four lines: (a) `aria-label` on a plain `div` with no role maps to
`role="generic"`, where accessible names are not exposed — the wrapper's label is silently
dropped; (b) the three skeletons are three live regions that each announce "Loading",
so the load announces itself **three times**.

**Cure:** the skeleton is decorative repetition — `aria-hidden` on the items, `role="status"`
once on the wrapper carrying the real label.

---

### D-12 · MINOR · A roving-tabindex selector with no tab semantics and no accessible name

Measured live on `/#/admin/names`:

```
document.querySelectorAll('[role="tablist"]').length  → 0
document.querySelectorAll('[role="tabpanel"]').length → 0

<div role="group" class="segmented-tabs …">          ← no aria-label, no aria-labelledby
  <div class="segmented-indicator …"></div>
  <button type="button" class="segmented-tab" tabindex="0"  aria-pressed="true">Pending · 0</button>
  <button type="button" class="segmented-tab" tabindex="-1" aria-pressed="false">Approved · 0</button>
</div>
```

The strip implements **roving tabindex** (`0` / `-1`) — the keyboard idiom of a composite
widget — while exposing **`role="group"` with two toggle buttons** and no `aria-controls` to the
panel bodies (which are bare `v-if` divs, `:24` and `:75`). Consequences: the Approved filter
cannot be reached by <kbd>Tab</kbd>; nothing tells an AT user that arrows move within the group;
the group itself is unnamed, so its two buttons are announced without their shared purpose;
and the relationship between the pressed button and the list that changed below it is
unexpressed.

`VISUAL-CONSTITUTION.md:83` §4.1 — "Selected, failed, pending, withdrawn and disabled states are
never color-only. **Role, accessible name, state/value and associated error/status are
explicit.**"

**Attribution:** semantics are producer-owned; the missing accessible name is a consumer
omission (`SegmentedTabs` at `:14-22` passes no label). Relay the rest to glass-ui BH.

---

### D-13 · MINOR · `cssColorOpaque` is a dead required prop

```
AdminNamesPanel.vue:140     cssColorOpaque: string;      ← declared, required
AdminPane.vue:52            :css-color-opaque="cssColorOpaque"   ← supplied

$ grep -rn "cssColorOpaque" demo/palettes/browser/admin/
demo/palettes/browser/admin/AdminNamesPanel.vue:140
```

**One hit — the declaration.** The prop is never read in template or script. It is a required
member of the component's public contract that does nothing, and it forces every caller to
thread a value through for no reason. Owner edict 2 (no legacy code, no dual paths, no
vestigial surface) and edict 3 (KISS).

---

### D-14 · MINOR · CSS literals are not LTR-isolated

```
:52  <span class="text-mono-small text-muted-foreground truncate">{{ item.css }}</span>
:102 (identical)

$ grep -rn "unicode-bidi\|dir=\"ltr\"\|bidi-isolate" demo/ --include=*.css --include=*.vue
(no output — zero bidi isolation anywhere in demo/)
```

`VISUAL-CONSTITUTION.md:154` §6.1, direction jurisdictions — "CSS strings, hex, slugs, IDs and
provenance | render in **LTR-isolated spans** inside RTL prose." `:133` §5.2 repeats it.

Under `dir="rtl"`, `oklch(70% 0.15 30 / 50%)` reorders around its parentheses and slash and the
readout becomes wrong, not merely mirrored. The color name (`:50`) is user-supplied text and can
itself be RTL, so the two lines can disagree in direction inside one column.

Not captured: `shots/rtl-desktop/` and `shots/rtl-mobile/` contain `adminusers.png`, not
`adminnames.png`. **Hypothesis** — repro in §6.

---

### D-15 · MINOR · The spacing is off the binding PR-35 matrix at every rung

`OPTICAL-BENCH-COMPOSITIONS.md` §5, PR-35 (`ADMIN5`), against measured/derived values
(live `--spacing = 0.25rem`):

| Rung | Required | Rendered | Site |
|---|---|---|---|
| major section interval | `--spacing(6)` = **24px** | **12px** (measured `rowGap: "12px"`) | `:13` `gap-3` |
| Admin row block inset | `--spacing(4)` = **16px** wide / `--spacing(3)` = 12px narrow | **10px**, constant at every viewport | `AdminListItem.vue:11` `py-2.5` |
| action gap | `--spacing(2)` = **8px** | **6px** | `AdminListItem.vue:20` `gap-1.5` |

The section interval is exactly 2× off; the row inset matches neither arm and has no responsive
behaviour at all, so the "one dense-row rhythm" the five Admin members are required to share is
not the rhythm the matrix decided.

---

### D-16 · MINOR · The two transitions this component owns are undesigned; the one that exists animates layout properties

The component owns two state changes and animates neither:

- skeleton → rows: a hard `v-if` swap (`:26` → `:43`)
- pending ↔ approved: the entire panel body is destroyed and rebuilt (`:24` / `:75` `v-if`/`v-else`)

There is no `<TransitionGroup>`, no `--animation-slide-sm/md/lg`, no tokenized effect curve.
`VISUAL-CONSTITUTION.md:141` §6 — "A scene swap preserves the specimen and changes the
surrounding instrument. **No full-slab remount hole**". Switching tabs is a full-slab remount of
the panel body.

The only motion in the composition is the producer's indicator, and its computed transition is:

```
translate 0.44s linear(…) , width 0.44s linear(…) , height 0.44s linear(…) ,
scale 0.44s linear(…) , opacity 0.2s
```

**`width` and `height` are transitioned for 440ms** — both force layout on every frame of the
tab switch. Producer-owned; relay.

Reduced-motion behaviour is **unproven** (route absent from `shots/reduced-motion-desktop/`).
No owner-edict-6 violation found: nothing was deleted, there was simply never anything here.

---

### D-17 · INFO · The tab state is a `string`, and `v-else` makes every invalid value render Approved

```
:151  const namesTab = ref<string>("pending");
:24   <div v-if="namesTab === 'pending'" …>
:75   <div v-else …>
```

The domain is a closed two-member union; it is typed open. Any value other than `"pending"` —
including a typo or a future third state — silently renders the **Approved** list, which on a
moderation surface means showing live approved names where pending proposals were expected.
Owner edict 7 (idiomatic Vue 3.5) and the repo's own branded-type discipline
(`api/src/lib/models.ts`) both point the other way.

---

### D-18 · INFO · The tab is not addressable and does not survive navigation

`namesTab` is component-local (`:151`). `/#/admin/names` cannot deep-link to Approved; leaving
to Users and returning resets to Pending; a mid-review browser Back loses the reviewer's place.
`VISUAL-CONSTITUTION.md:112` §5.1 requires Back/Forward to restore "the last connected focused
element stored in that history entry" — state the component does not publish cannot be restored.

---

### Also noted, below finding threshold

- **Duplicated branch bodies.** `:24-73` and `:75-118` are 45-line near-identical blocks
  differing only in the action set. Any fix to the row must be made twice; D-5, D-6, D-7 and
  D-9 each currently have two edit sites in this file.
- **The destructive-quiet recipe is copy-pasted, not a variant.** The five-class string
  `text-muted-foreground hover:text-destructive focus-visible:text-destructive
  hover:bg-destructive/10` appears at `:64` and `:109` in this file and in **6 files / 7 sites**
  across `demo/` (`grep -rn "hover:text-destructive" demo/ --include=*.vue | wc -l` → 7).
  W5-12/F-8 made a genuinely good design decision — quiet the destructive at rest — and then
  expressed it as a per-instance class list instead of a `variant="destructive-quiet"` on the
  Button root. Owner edicts 4 and 5.
- **`Button` is taken from `demo/ui/button` (`:125`) while `SegmentedTabs` is taken from
  glass-ui (`:124`)** — two design systems inside one 152-line component.
- **Mobile order inverted.** `OPTICAL-BENCH-COMPOSITIONS.md` §4 decides Admin·Names mobile as
  "**selector; query;** rows; decision disclosure". Rendered: query (`AdminPane.vue:11`) then
  selector (`AdminNamesPanel.vue:14`).
- **Swatch has no invalid/alpha state.** `:46`/`:96` bind `backgroundColor: item.css` raw. An
  unparseable literal paints nothing and is indistinguishable from `transparent`; a semi-opaque
  color composites against the plate with no checkerboard, so alpha is invisible. On a surface
  whose entire job is judging *color names*, the specimen cannot express two of its own states.

---

## 4. Owner-edict scorecard

| # | Edict | Verdict |
|---|---|---|
| 1 | No god modules | **PASS** — 152 lines, focused |
| 2 | No legacy code / dead paths | **FAIL** — D-13 dead required prop |
| 3 | KISS, no contrivance | **PASS** — no invented wrappers or shared/ dirs |
| 4 | glass-ui is the design system | **FAIL** — mixed sources; destructive-quiet is a call-site recipe, not a variant |
| 5 | Root-level styling, no per-instance overrides | **FAIL** — D-8 (`font-display`, 12 admin sites), `:64`/`:109` five-class recipe, `cursor-pointer` on a Button |
| 6 | Animations never deleted | **PASS** — nothing deleted (see D-16: nothing designed either) |
| 7 | Idiomatic Vue 3.5 | **PARTIAL** — reactive props destructure ✅ (`:132`), `defineEmits` typed ✅; D-17 open string |
| 8 | `verbatimModuleSyntax` | **PASS** — `:127` `import type { ProposedColorName }` correct |

---

## 5. Family grouping — the four mechanisms

| Family | Findings | Mechanism |
|---|---|---|
| **M-1 · Designed for reads, not for writes** | D-1, D-2, D-7, D-18 | The panel's state model is "two arrays"; a command has no representation before, during, or after it runs — so failure, confirmation, provenance and place are all unrepresentable. |
| **M-2 · Displaying a derived value as if it were the source** | D-5, D-6 | Filtered length and pre-load length are both rendered as ground truth, producing two active falsehoods on a surface whose only output is a judgment. |
| **M-3 · Consumer overriding the producer at the call site** | D-3(part), D-8, destructive recipe, `cursor-pointer` | Decisions the design system must own are re-decided per instance; one of them (`font-display`) plausibly *causes* a rendered geometry defect. |
| **M-4 · The decided composition was not adopted** | D-4, D-9, D-10, D-15, mobile order | Companion 50%, boxed rows with a terminal rule, no pagination, off-matrix spacing: the ratified Admin·Names frame exists on paper and not in the tree. |

---

## 6. Reproductions for the three unproven arms

The visual matrix captured `adminusers` for the forced-colors, reduced-motion, RTL,
keyboard-focus and zoom-200 arms and **never captured `adminnames`**
(`ls docs/tranches/V/megatranche/audit/visual/shots/*/` — 5 routes each, Names absent). These
are labelled hypotheses above; each is decided by one capture:

1. **RTL (D-14).** `document.documentElement.dir = "rtl"` on `/#/admin/names` with ≥1 row;
   capture the `item.css` line. Expect the parentheses/slash to reorder.
2. **forced-colors (§1.6, swatch).** Emulate `forced-colors: active`; the `:46` inline
   `backgroundColor` is overridden, `border-card-edge` flattens to `CanvasText`, and the row-box
   grammar of D-9 collapses to N identical rectangles. Confirm whether the CSS literal remains
   the sole surviving color evidence.
3. **reduced-motion (D-16).** Emulate `prefers-reduced-motion: reduce`; switch tabs; confirm
   whether the producer's 440ms `width`/`height` transition resolves directly to final geometry
   as `VISUAL-CONSTITUTION.md:144` requires.

---

## 7. The one-line cure

Stop treating this as a list with buttons on it and build it as the **review row the canon
already decided**: one `AdminListItem` anatomy carrying swatch · identity · normalized slot ·
provenance · per-row operation state, separated by a single low-emphasis rule with no terminal
edge, paginated, with the destructive verb behind a confirmation and every command's failure
landing on the row that issued it. Every finding above except D-3 and D-4 closes inside that one
transposition — which is exactly why the defect is a *design* defect and not a list of bugs.

---

*Seat CHALLENGE-D · design · Opus 5 · no source edits · report written only under
`docs/tranches/V/megatranche/audit/components/AdminNamesPanel/`.*
