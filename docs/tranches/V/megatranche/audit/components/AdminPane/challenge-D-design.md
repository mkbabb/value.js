# CHALLENGE-D — AdminPane design audit

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context). Seat declared explicitly at
spawn; not inherited, not Fable, not Sonnet.

---

## Subject and scope

- **Component:** `demo/palettes/admin/AdminPane.vue` (135 lines)
- **Routes:** `/#/admin/users`, `/#/admin/names`, `/#/admin/audit`, `/#/admin/flagged`, `/#/admin/tags`
- **Repo state:** `tranche-u` @ `c654824e`
- **Verdict:** **DEFECTIVE.** 2 BLOCKER, 9 MAJOR, 3 MINOR, 1 INFO.

The premise held. This component is not a badly-styled admin pane; it is the *wrong shape*. The
tranche canon already ratified what the five Admin routes must be — full-width structural review
fields with no companion, no Card, no pane selector, one query grammar and a shared row rhythm
(`VISUAL-CONSTITUTION.md §7`, `OPTICAL-BENCH-COMPOSITIONS.md:51,57-61,100`,
`PROPORTION-AUDIT.md` PR-04/PR-11). What ships is the *pre-ruling* shape: one component forked five
ways, wrapped in a Card, seated in a 50/50 split beside an empty personal palette library. Every
measurement below was taken against that ratified text, not against taste.

### Evidence sources

| Kind | Where |
|---|---|
| Live probe A (LTR 1440, geometry/computed/DOM) | `node scratchpad/probe.mjs` against `http://localhost:9000` — Chromium 1440×900 @2x |
| Live probe B (RTL + 1440/390/320 arms) | `scratchpad/probe2.mjs` |
| Live probe C (WebKit motion/containment) | `scratchpad/probe3.mjs` — `playwright.webkit` |
| Safari capture matrix | `docs/tranches/V/megatranche/audit/visual/REPORT.{md,json}` + `shots/*/admin-*.png` |
| Binding canon | `docs/tranches/V/VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `OPTICAL-BENCH-COMPOSITIONS.md` |

---

## Visual truth first

`shots/safari-desktop-light/admin-users.png` and `…-dark/admin-users.png` show the same thing in
both schemes: a **"Users" moderation console occupying exactly half the viewport, with "My Palettes"
— a personal, empty palette library — occupying the other half.** Two Cards of identical width,
identical height, identical material tier, identical 8px cartoon caster, sitting as equals. Nothing
about the composition says which one the route is about.

Inside the admin half the hierarchy is worse. The route's own identity line reads **"Users ⓪"** —
a Fraunces display-1 title with a Fira Code counter chip welded to it — and then the same number is
restated 137px lower as mono body text "0 users", and then restated a third time as the empty-state
sentence "No users found." Three assertions of one fact in three type registers, in a card whose
bottom **158.78px (30.85% of its 514.7px height)** is empty plate. The card is that tall because
`h-full` pins it to the grid row, and the grid row is sized by the companion. The admin field is
literally donating its emptiness to a pane that should not exist.

`shots/safari-mobile-light/admin-users.png` shows the second half of the same defect: because the
view declares a right pane, the narrow layout must ship a **"Users | Palettes" pane selector in the
dock** to reach it. `shots/zoom-200-desktop/adminusers.png` shows the identical selector at 200%
zoom.

`shots/rtl-desktop/adminusers.png` shows the badge fused to the title with no gap — the count chip
reads "⓪Users" rather than "Users ⓪". That is measured below (D-07) and it is a physical-margin bug.

`shots/safari-desktop-light/admin-tags.png` shows the fourth register problem: Tags gets **no**
badge and **no** search bar, yet still states "0 tags" in the body and still sits beside the same
50% companion. The five routes that the canon says share one anatomy do not.

---

## Findings

### D-01 · BLOCKER · The ratified Admin composition is not shipped: the 50/50 Palettes companion survives

**Measured** (probe A/B, 1440×900):

```
cards: 2
adminRect     { x: 199, y: 232.5, w: 512, h: 514.7 }
companionRect { x: 729, y: 232.5, w: 512, h: 514.7 }
splitPct: [ 50, 50 ]
companionHeadingText: "My Palettes"
```

**Law quoted three ways, all binding:**

- `VISUAL-CONSTITUTION.md §7`: *"Each Admin route uses the full main width: the current Palettes
  companion, right label and resulting mobile pane selector are **removed rather than restyled**."*
- `VISUAL-CONSTITUTION.md §3` law 1: a two-part desktop scene is *"exactly `golden`
  (61.8033989% / 38.1966011%) or `preview-dominant` (66.6666667% / 33.3333333%)"*. **50/50 is
  neither.** Law 2: *"Empty secondary content occupies at most a narrow invitation tray (≤15% of the
  stage) or disappears. **It never receives half the viewport.**"* The companion renders
  "No saved palettes yet." — it is empty and it has 50%.
- `OPTICAL-BENCH-COMPOSITIONS.md:51`: *"In the current view schema every Admin member is forced
  beside a Palettes companion; V removes that companion, its right label, its mobile pane toggle,
  and its 50% acreage."* Rows :57–:61 repeat `Companion rect 50%→0` for **all five** members.
- `PROPORTION-AUDIT.md` PR-04: *"Empty/equal companion Cards and nested housing → **REMOVE** …
  Admin companion `50%→0`."*

**Mechanism.** AdminPane is registered as a *left-slot* pane. `usePaneRouter.ts:93`
(`if (name.startsWith("admin-")) return AdminPane;`) resolves it inside `componentFor`, and
`leftProps` at `usePaneRouter.ts:140` supplies `{ subView: name }`. Because the admin view configs
declare a non-null `right`, `desktopRight` (`usePaneRouter.ts:169`) unconditionally mounts
PalettesPane beside it. The defect is not in AdminPane's classes; it is in AdminPane *being a
half-pane at all*.

**Reproduction.** `http://localhost:9000/#/admin/users` at ≥1024px. Every one of the five admin
routes, both schemes: `shots/safari-desktop-{light,dark}/admin-{users,names,audit,flagged,tags}.png`.

**Cure (transposition, not patch).** The five Admin routes stop being left-slot panes. Their view
configs declare `right: null` and the route body becomes a full-width structural review field —
which also dissolves D-02, D-11 and the 158.78px void in one move, because nothing is left to
donate acreage or to need a selector.

---

### D-02 · BLOCKER · The mobile/zoom pane selector the canon retires is still rendered

**Measured** (probe B):

| Arm | cards | pane selector controls |
|---|---|---|
| 1440 LTR | 2 | none rendered (0×0) |
| 390 LTR | 1 | `Users` 57.50×26.25 @ y 35.88 · `Palettes` 57.50×26.25 @ y 35.88 |
| 320 LTR | 1 | `Users` 56.98×26.05 @ y 35.97 · `Palettes` 56.98×26.05 @ y 35.97 |

**Law.** `VISUAL-CONSTITUTION.md §7` (quoted above — the *"resulting mobile pane selector"* is named
explicitly as removed); `§3` law 6: *"no global pane selector, left/right split state, or
simultaneous two-stage miniature survives"*; `OPTICAL-BENCH-COMPOSITIONS.md:107`: *"The global
narrow `PaneSegmentedControl` and left/right view state are **retired** because all mobile
compositions are single sequences."*

**Reproduction.** `shots/safari-mobile-{light,dark}/admin-users.png` (visible top-centre in the
dock) and `shots/zoom-200-desktop/adminusers.png`.

**Mechanism family.** Same as D-01: the selector exists *only because* the admin views declare a
right pane (`usePaneRouter.ts:180-186`, `mobile` returns `desktopRight` at pane-index 1). It is a
symptom, not an independent bug — but it is a separately-ratified removal so it is booked
separately.

---

### D-03 · MAJOR · The header count lies in the error state — the identical lie was already cured one register down

**Code.** `useAdminUsers.ts:54-68`:

```ts
} catch (e: any) {
    // W5-5 (F-2): a dead backend must never read as "No users found."
    usersLoadError.value = e?.message ?? "Backend unreachable";
```

On failure `adminUsers` is **left untouched** (`[]` on a first load) and `loadingUsers` returns to
`false`. `AdminPane.vue:120-122` then evaluates:

```ts
case "admin-users":
    return pm.loadingUsers.value ? null : pm.adminUsers.value.length;   // → 0
```

So the header renders **"Users 0"** while the body renders the load-error branch. The A-3 comment at
`AdminPane.vue:120-121` — *"suppress the badge while the roster/queue loads — a '0' over the loading
skeletons lies"* — got the loading arm and missed the error arm, even though the composable's own
W5-5 comment states the general rule.

**Reproduction.** `/#/admin/users` with a valid admin token and the API unreachable (stop the api
container, or block `GET /admin/users`): badge `0`, body `usersLoadError`. Same shape on
`/#/admin/names` via `queueLoadError`.

**Cure.** `adminCount` returns `null` unless the sub-view's port is in a *settled-success* state.
The null arm already exists; it is being asked the wrong question (`loading?` instead of
`have I got a trustworthy number?`).

---

### D-04 · MAJOR · The two badges that exist mean different things

`AdminPane.vue:122` — users badge = `pm.adminUsers.value.length` (**unfiltered total**).
`AdminPane.vue:128` — names badge = `pm.filteredColorQueue.value.length` (**filtered/visible**).

Same header slot, same chip, two semantics. `AdminPane.vue:125-126` records why Names was changed:
*"the header badge is the ACTIONABLE queue — the old pending+approved sum matched neither visible
list."* The identical argument applies to Users, whose rendered list is `pm.filteredAdminUsers`
(`AdminPane.vue:28`), computed by slug substring at `useAdminUsers.ts:29-34`. It was never carried
across.

**Reproduction.** `/#/admin/users` with N users loaded → type a slug fragment into "Search users…".
The list shrinks; the badge does not move. (Needs a seeded backend with users; the code path is
unambiguous at `useAdminUsers.ts:32-34` vs `AdminPane.vue:122`.)

---

### D-05 · MAJOR · One number, one source, two renderings, one screen

**Measured** (probe A, leaf text nodes inside the admin Card containing a bare `0`):

```
zeroMentions: [ "0", "0 users" ]
badge rect  { x: 345, y: 268.5, w: 29.47, h: 26.05 }
```

`AdminPane.vue:5` renders `<Badge>{{ adminCount }}` = `pm.adminUsers.value.length`.
`AdminPane.vue:33` passes `:total-users="pm.adminUsers.value.length"` **to the same panel**, which
renders it again at `AdminUsersPanel.vue:9`: `{{ totalUsers }} user{{ totalUsers !== 1 ? 's' : '' }}`.
Then the empty state says it a third time in words.

**Law.** `PROPORTION-AUDIT.md §5` law 5 (*a small mark is either data, status, labeled action, drag
affordance, focus/selection register **or removed***) and law 6 (*"Subtraction precedes
explanation"*). Two of the three are redundant; the canon's disposition for redundancy is REMOVE,
not re-style.

**Reproduction.** Any admin/users capture — e.g. `shots/safari-desktop-light/admin-users.png`,
badge at the title, "0 users" 137px below it.

---

### D-06 · MAJOR · A live counter is welded into the document heading

**Measured** (probe A): `h3.text = "Users 0"`, `tag = "H3"`; `h1Count = 0`, `mainCount = 1`.
Badge computed `fontFamily: "Fira Code"`, `fontSize: 16.4px` — inside a Fraunces
`--type-display-1` line box.

`PaneHeader.vue:22` places `<slot/>` inside `<h3 class="pane-header-title font-display">`;
`AdminPane.vue:4-5` places both the title text **and** the Badge into that slot. The heading's
accessible name therefore mutates with network state: `"Users"` while loading → `"Users 0"` →
`"Users 42"`.

**Law.** `VISUAL-CONSTITUTION.md §5`/`PROPORTION-AUDIT.md §5` law 11: *"A display-sized readout is
not therefore a document heading or live status."* `VISUAL-CONSTITUTION.md §4` type matrix: identity
is Fraunces, value/provenance is Fira `text-mono-small` — the shipped h3 line is both at once.
`§4.1`: *"Each route has one H1"* — measured **0** on every one of the 20 admin captures
(`REPORT.md` h1 column, rows `/#/admin/*`). The H1 is shell-owned so its absence is not AdminPane's
finding, but it is why a mutating h3 is the route's *only* heading and therefore its de-facto
landmark.

**Cure.** The count is status, not identity. It belongs in the review field's status region
(where "0 users" already is), announced through that region — not in the heading, and not twice.

---

### D-07 · MAJOR · The badge margin is physical, so the RTL title/badge gap measures 0.00px

**Measured** (probe B). Computed badge margins, **identical in both directions**:

```
dir=ltr  →  marginLeft: "8px",  marginRight: "0px"
dir=rtl  →  marginLeft: "8px",  marginRight: "0px"
```

Derivation at 1440 from the measured rects:

| | LTR | RTL |
|---|---|---|
| admin card | x 199 → right 711 | x 729 → right 1241 |
| header padding-inline-start | 24px | 24px |
| title glyph run | left 223 → right 337 (width 114) | right 1217 → left **1103** |
| badge rect | x **345** → right 374.47 | x 1073.53 → right **1103.00** |
| **title ↔ badge gap** | **8.00px** | **0.00px** |

(LTR title-right is derived as `badge.x − marginLeft = 345 − 8 = 337`, giving the 114px glyph run
that then mirrors exactly in RTL: `1217 − 114 = 1103` = the measured badge right edge.)

The 8px does not vanish — it moves to the badge's *outboard* side, adding a phantom gap between the
badge and nothing. Corroborated visually: `shots/rtl-desktop/adminusers.png` shows "⓪Users" with the
chip touching the F of the title and clear air to its left.

**Law.** `VISUAL-CONSTITUTION.md §6.1`: *"chrome, navigation and layout — logical inline/block
direction follows the document."* Owner edict 5: style at the root, never per-instance. The class
list is a textbook per-instance override of a glass-ui root:
`… bg-secondary text-secondary-foreground … text-mono-small ml-2`.

**Reproduction.** `document.documentElement.dir = "rtl"` on `/#/admin/users`; or open
`shots/rtl-desktop/adminusers.png`.

---

### D-08 · MAJOR · One component for five ratified compositions — and the union prop buys nothing, because the router keys each sub-view separately

`componentFor` returns the *same* AdminPane for all `admin-*` (`usePaneRouter.ts:93`). But
`desktopLeft.key = left` (`usePaneRouter.ts:165`) is the **sub-view name**, and `PaneSlot.vue:123`
binds `:key="liveKey"` inside `<KeepAlive :max="6">`. Five sub-views ⇒ **five distinct KeepAlive
entries of one component**. No instance is reused. `App.vue:97-100` concedes the cost in its own
comment:

> `:max` = the 6 distinct non-admin LEFT panes … admin left panes fall off the LRU rather than
> bloating the cache.

Eleven distinct left keys against a six-slot LRU. So the union prop pays the full cost — a five-way
`v-if` fan (`AdminPane.vue:12,26,45,61,64,67`), three parallel `switch` blocks over the same union
(`:97`, `:107`, `:117`), four unrendered branches per instance, and a `subView` string that must be
kept in sync with the router's name scheme — for zero runtime sharing.

Meanwhile the canon demands the opposite: `VISUAL-CONSTITUTION.md §3.1` — *"**one Admin frame cannot
stand in for its four siblings**"*; `OPTICAL-BENCH-COMPOSITIONS.md:9` — *"a family frame cannot stand
in for a member"*, with five separately-specified rows at :57–:61 (Users = review rows; Names = P092
selector + queue; Audit = chronological ledger + pagination; Flagged = evidence-led report queue;
Tags = taxonomy list + create).

**Cure.** Five route bodies. The genuinely shared parts (identity band, query tray, review-row
rhythm, dangerous-confirmation grammar) become **one review-field composition consumed five times**
— which is what "one review-row anatomy" means — not one component branched five ways. This is the
architectural transposition; D-09, D-10 and the badge inconsistencies D-03/D-04 are all downstream
of the fork.

---

### D-09 · MAJOR · "One query/pagination/state grammar" is measurably three grammars and zero pagination

**Measured** (probe A, per sub-view):

| route | AdminPane SearchBar (`.search-seated`) | header badge | `<input>` count in the pane | body flex children |
|---|---|---|---|---|
| `/#/admin/users` | ✅ | ✅ | 1 | 2 |
| `/#/admin/names` | ✅ | ✅ | 1 | 2 |
| `/#/admin/audit` | ❌ | ❌ | 2 | 1 |
| `/#/admin/flagged` | ❌ | ❌ | **0** | 1 |
| `/#/admin/tags` | ❌ | ❌ | 2 | 1 |

`AdminPane.vue:11-16` gates the query tray on
`subView === 'admin-users' || subView === 'admin-names'`. So the app ships **three** query registers
across five sibling routes: a glass-ui `SearchBar` in the seated register (2 routes), bare inputs
inside the panels (2 routes), and nothing at all (Flagged). Grep confirms Tags and Flagged contain
no search element; Audit references `SearchBar` only in a comment (`AdminAuditPanel.vue:6`).

**Law.** `VISUAL-CONSTITUTION.md §7`: *"Admin is a five-route review suite … using **one** review-row
anatomy, **query/pagination/state grammar**, dangerous confirmation and responsive disclosure."*
`OPTICAL-BENCH-COMPOSITIONS.md:57-61` names a query region for all five and **pagination** for
Audit. Measured pagination controls: **0 of 5**.

**Companion defect — silent truncation with a confident count.** `useAdminUsers.ts:59` is
`await listUsers(token, 50)` with no cursor. Past 50 users the roster is silently cut and the badge
(D-04) reports the truncated length as if it were the total.
*Reproduction of the truncation arm requires a backend seeded with >50 users — labelled a code-read
hypothesis; the absence of a cursor at `useAdminUsers.ts:59` is not.*

---

### D-10 · MAJOR · The ratified major-section interval is 24px; the shipped one is 12px

**Measured** (probe A):

```
body class : "px-4 sm:px-6 py-4 flex flex-col gap-3 min-h-0"
rowGap                : 12px        (identical on all five sub-views)
descToSearchGapPx     : 24.00       ← header → query tray  ✅
searchToPanelGapPx    : 12.00       ← query tray → review field  ✗
paddingInlineStart    : 24px        ← --spacing(6) at 1440  ✅
paddingTop/Bottom     : 16px
```

`OPTICAL-BENCH-COMPOSITIONS.md:100` (PR-35, binding for the non-P122 review family):

> Major section interval: About/recovery `--space-phi-5`; **`ADMIN5`/Account `--spacing(6)`**.
> … No margin collapse, Card-padding variable/formula or per-route substitute; **the five Admin
> members share the one dense-row rhythm.**

`--spacing(6)` = 24px. `AdminPane.vue:7` hardcodes `gap-3` = 12px. The pane already renders the
correct 24px rung immediately above (header → query), so it demonstrably knows the interval and then
halves it at the one boundary that separates two ratified regions. Optically this is why the search
bar reads as glued to the field instead of as its own tray — the two intervals framing the query row
are 24 above and 12 below, which inverts the grouping the composition asks for.

---

### D-11 · MAJOR · Admin's outer housing is a Card with an 8px cartoon caster; the register says structural review field, no Card, no caster

`AdminPane.vue:2`:

```html
<Card tier="resting" class="pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

**Measured** (probe A): `boxShadow: color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px`,
`contain: content`, `overflowY: auto`, `display: block`.

**Law.**
- `OPTICAL-BENCH-COMPOSITIONS.md:57-61`, outer-housing column: Users/Names — *"Structural review
  field; rows are bounded review entities, **not nested glass Cards**"*; Audit — *"Quiet data field;
  no decorative dashboard metrics or palette companion"*; Tags — *"Structural list; no statistics
  tiles or palette companion."*
- `OPTICAL-BENCH-COMPOSITIONS.md:90`: *"Any additional line, automatic P122 divider,
  consumer-hidden producer line, terminal row rule, **caster stroke** or corner rule is a defect."*
- `VISUAL-CONSTITUTION.md §3.1`: *"`Card` remains semantic housing for a bounded object or specimen
  and **is never the default page primitive**."* `§2`: *"One surface has one tier … Glass earns its
  blur by revealing live content; otherwise it is a neutral well."*

A moderation console is not a bounded specimen. The Card is doing three unrelated jobs here —
material tier, scroll host, and grid cell — and the 8px offset caster is decorative boundary on a
data surface that the register explicitly bans.

**Consequence, measured.** Because the Card is `h-full` inside a grid row sized by the companion,
its empty state carries **158.78px of dead plate below the last ink — 30.85% of its 514.7px
height** (ink fill 69.15%). It also never scrolls in that state (WebKit probe C:
`scrollHeight 513 === clientHeight 513`), so the entire sticky-header choreography the Card exists to
host is inert on the routes' most common state.

---

### D-12 · MINOR · Two dead classes on the root

`AdminPane.vue:2` `w-full mx-auto` — with `width: 100%` the auto inline margins resolve to 0; the
measured card rect (`x 199, w 512`) is exactly its grid column. `mx-auto` does nothing.

`AdminPane.vue:7` `min-h-0` — measured parent (`Card` root) `display: block`. `min-height: 0` only
matters for a flex/grid *item* that would otherwise refuse to shrink below content size. The body div
is a block-in-block child. Measured `minHeight: "0px"` with no constraint to relax. Inert.

Owner edict 3 (KISS, no contrivance): both are cargo. They cost nothing at runtime and everything in
the next reader's confidence about what the layout actually does.

---

### D-13 · MINOR · The pane is a DI shim — it plants a child instance into a composable's ref so a third module can call it imperatively

`AdminPane.vue:134`:

```ts
// Sync the admin panel ref for prune operations
const adminUsersPanelRef = pm.adminUsersPanelRef;
```

This re-exposes a ref *owned by `useAdminUsers`* (`useAdminUsers.ts:27`) as a local binding purely so
the string template ref at `AdminPane.vue:27` fills it — so that `usePalettePorts.ts:123` can reach
across and call `admin.adminUsersPanelRef.value?.onPruneDone(pruned)`, and `useAdminUsers.ts:99,121,
136,150` can call `.updatePaletteTier()`, `.removeUserPalette()`, `.clearUserPalettes()`.

Five imperative methods invoked on a child component instance from two other modules, routed through
a view whose only role in the transaction is *happening to render that child*. AdminPane cannot be
moved, split, or lazily mounted without breaking prune. It is also not the Vue 3.5 idiom the edicts
name (`useTemplateRef`) — but the idiom is the smaller half; the design defect is a view used as a
wiring harness.

**Cure.** The prune/feature/delete results are state, not method calls. They flow down as props from
the port; `AdminUsersPanel` renders them. The ref, the string binding and the alias all die together.

---

### D-14 · MINOR · `.search-seated` is a consumer recipe filling a producer gap, applied per-instance at three sites

`AdminPane.vue:14` applies `class="search-seated"` to the glass-ui `SearchBar`. The recipe lives at
`demo/styles/utils.css:132-154` (fill, `1.5px` border, `--shadow-cartoon-sm`, `max-width: none`,
a `:focus-within` shadow recomposition, and a descendant `.input-bar-field` font override).

The producer's own variant union has no seated rung — `node_modules/@mkbabb/glass-ui/dist/components/search/searchVariants.d.ts`:

```ts
declare const VARIANT: {
    readonly inline: "";
    readonly bare: "border-none bg-transparent p-0 rounded-none";
    readonly floating: "border-none bg-transparent p-0 rounded-none";
};
```

Owner edicts 4 and 5: variants belong in glass-ui; consumers do not per-instance-override a producer
root. The same 7-line comment is triplicated verbatim at `BrowsePane.vue:8-11`,
`PalettesPane.vue:31-34` and `AdminPane.vue:8-10`, and a descendant selector
(`.search-seated .input-bar-field`) reaches into producer internals.

**Standing.** `demo/DESIGN.md:107-118` books this as INTERIM against glass-ui ask **ASK-D / packet
P3**. It is a *known, filed* debt rather than an unnoticed one — recorded here because it is live and
because it is the third query register this component family wears (see D-09).

---

### D-15 · INFO · State coverage enumeration — what was never designed

| State | Status | Evidence |
|---|---|---|
| empty | ✅ designed | `EmptyState` in the panels; "ROSTER CLEAR / No users found." |
| loading | ✅ designed | badge suppressed (`AdminPane.vue:120-122`), panel skeletons |
| populated | ✅ | — |
| **error** | ❌ **broken** | **D-03** — header asserts `0` while the body reports failure |
| **truncated** | ❌ **absent** | **D-09** — `listUsers(token, 50)`, no "showing 50 of N" |
| **paginating** | ❌ **absent** | **D-09** — 0 pagination controls on 5 routes; Audit's is ratified |
| **filtered (badge)** | ❌ **wrong** | **D-04** — Users badge ignores the filter its list applies |
| disabled / focused / hovered / active / pressed / selected / dragging | n/a at this seat | AdminPane owns no interactive element of its own; the sort trigger belongs to `UserSortMenu` |
| overflowing / truncated text | ⚠️ untested | no long-slug fixture available at this seat — **hypothesis**, not a finding |
| **RTL** | ❌ **broken** | **D-07** — title↔badge gap 8px → 0.00px |
| zoom 200% | ✅ no overflow | `docScrollW === innerW` at 320/390/1440; `REPORT.md` overflowX `0` on all 20 admin captures |
| reduced-motion | ✅ (inherited, defensible) | AdminPane authors no motion; it inherits PaneHeader's compositor-only scroll *scrub*, which is position-mapped rather than time-based |
| **forced-colors** | ⚠️ **UNPROVEN** | `shots/forced-colors-desktop/adminusers.png` still renders the full chromatic aurora, pink cartoon casters and coloured chrome — the harness did **not** put WebKit into forced-colors mode. That row of the matrix decides nothing either way. Treat the forced-colors behaviour of this component as **unmeasured**, and note that `.search-seated`'s boundary is carried partly by `box-shadow` (dropped under forced-colors) with only a `1.5px` border surviving. |

---

## Motion

AdminPane authors **zero** motion of its own — no transition, no keyframe, no token. It inherits:

1. **Pane swap.** `PaneSlot.vue:113` wraps the slot in `<Transition :name="vj-enter">`. Because
   `liveKey` is the sub-view name (D-08), moving `admin-users → admin-names` is a full
   unmount/remount with a crossfade — not an in-place content change.
2. **Sticky-header scroll scrub.** `.pane-scroll-fade` on the Card root declares
   `scroll-timeline: --pane-scroll block` and `contain: layout style paint`
   (`PaneHeader.vue` unscoped block). The header veil, title scale and description fade are all
   scroll-driven, inside an `@supports (animation-timeline: scroll())` gate, compositor-only.

**Verified, not assumed** (probe C, real WebKit):

```
supportsSDA        : true
shrinkRatioRaw     : calc(tan(atan2(1.618rem, clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem))))
--type-heading     : 1.618rem
--type-display-1   : clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)   → 2.618rem at 1440
titleAnimName      : pane-title-shrink-19daabcf
titleTransform     : none     (rest = identity — correct)
```

`1.618 / 2.618 = 0.61803…` = `1/φ`. The `atan2`-on-lengths identity resolves correctly under the
shipping WebKit and the SDA guard is satisfied rather than silently failing. **No motion defect
found** — but see D-11: on the empty admin state the Card measures
`scrollHeight 513 === clientHeight 513`, so none of this choreography ever runs on the route's most
common state. No property that forces layout is animated (the padding/font-size/grid-template-rows
fork is retired per the file's own comment).

---

## Design-system boundary

**Clean:**
- `demo/ui/card/index.ts` and `demo/ui/badge/index.ts` are pure re-exports of `@mkbabb/glass-ui`.
  Nothing is hand-rolled where glass-ui provides it. Owner edict 4 satisfied at the import boundary.
- `SearchBar` is consumed from `@mkbabb/glass-ui/search` directly (`AdminPane.vue:87`).
- `UserSortMenu` already retired its hand-rolled icon trigger onto the glass-ui `Button` atom
  (`UserSortMenu.vue:4-15`) with an `aria-label`.

**Not clean:**
- `.search-seated` per-instance override at three sites (**D-14**).
- `class="text-mono-small ml-2"` per-instance override of the `Badge` root (**D-07**), which is also
  what makes the RTL break possible.

---

## Negative proofs — what I attacked and could not break

The premise says the design is wrong. These are the places I expected it to be wrong and it was not;
recording them so the next seat does not re-litigate them.

1. **Containment does not clip the popover.** `contain: content` on the Card would make it a
   containing block for fixed descendants and paint-clip overflow. Probe A opened the sort menu:
   `parentChain: ["DIV.dropdown-menu-content", "DIV", "BODY.relative", "HTML"]`,
   `insideAdminCard: false`, rect `{x 481, y 375.5, w 192, h 176}`. It portals to `body` and is
   correctly positioned. **Not a defect.**
2. **The 4 small tap targets on every admin route are not AdminPane's.** `REPORT.json`
   `safari-desktop-light /#/admin/users` names them: an unlabelled `input` 160×23, plus
   `"Switch to slug"`, `"Generate new slug"`, `"Cancel"` at 22×22 — all dock/account controls.
   AdminPane's only own control, the sort trigger, measures **28×28 at 1440, 390 and 320** — above
   the 24px AA floor. **Not a defect at this seat.**
3. **No horizontal overflow anywhere.** `docScrollW === innerW` at 1440/390/320;
   `REPORT.md` overflowX column is `0` on all 20 admin captures across 4 matrices.
4. **No errors.** `REPORT.json` records `pageErrors: []`, `consoleErrors: []`, `failedRequests: []`
   on all 20 admin captures. The one console error in the whole matrix is a WebGL context loss on
   `/#/`.
5. **`verbatimModuleSyntax` is respected.** Every import at `AdminPane.vue:73-88` is a value import;
   there is no type-only import miscategorised as a value import.
6. **Vue 3.5 reactive props destructure is correct.** `const { subView } = defineProps<…>()`
   (`:90-92`) is the sanctioned idiom, and `subView` is read inside `computed()` so the reactivity
   transform applies. Not a stale-read site; no `defineModel` round-trip here.
7. **Not a god module.** 135 lines, one job, five branches. The defect is the *shape* of the job
   (D-08), not the file's size or cohesion.
8. **The inline gutter rung is right.** PR-35 requires `--spacing(6)` at 1440 and `--spacing(4)` at
   390/320/400%-zoom; `px-4 sm:px-6` measured `paddingInlineStart: 24px` at 1440 and resolves to
   16px below the `sm` breakpoint, which the 400%-zoom arm also lands in. Only the *section
   interval* is wrong (D-10).

---

## Mechanism families

| Family | Findings | One cure |
|---|---|---|
| **F1 — AdminPane is a half-pane, not a route body** | D-01, D-02, D-11, and the 158.78px void | Admin routes declare `right: null`; the body becomes a full-width structural review field with no Card and no caster |
| **F2 — the identity band carries data it should not** | D-03, D-04, D-05, D-06, D-07 | Delete the header badge. The count is status; it already exists in the review field's status row, where the error/filter/truncation truth also lives |
| **F3 — one component forked five ways** | D-08, D-09, D-10 | Five route bodies over one shared review-field composition; the query tray, section rhythm and pagination become properties of that composition rather than of a `v-if` |
| **F4 — consumer-side chrome** | D-12, D-13, D-14 | Producer variants (glass-ui seated rung, ASK-D/P3) + state-down instead of instance-method-across |

## Strongest single defect

**D-01.** Every admin route ships at exactly 50/50 beside an empty personal palette library, in a
composition the tranche canon ruled out in three separate binding documents (`VISUAL-CONSTITUTION.md
§3` laws 1–2 and §7, `OPTICAL-BENCH-COMPOSITIONS.md:51,57-61`, `PROPORTION-AUDIT.md` PR-04), all of
which specify `50% → 0`. It is measured, not argued (`splitPct: [50, 50]`), it is visible in eight
shipped screenshots, and it is the parent of D-02, D-11 and the empty-state void. Nothing else in
this report changes what the route *is*; this one does.
