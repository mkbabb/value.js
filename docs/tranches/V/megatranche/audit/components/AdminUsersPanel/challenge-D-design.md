# CHALLENGE-D · `AdminUsersPanel.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]`, spawned with an
explicit Opus 5 declaration. The seat is declared, not inherited.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines), area `palettes`, route `#/admin/users`.
- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`. Subject file clean at HEAD
  (`git status --porcelain demo/palettes/browser/admin/AdminUsersPanel.vue` → empty).
- Run date 2026-07-27. A prior challenge-D pass (2026-07-24) is preserved beside this file as
  `challenge-D-design.2026-07-24-prior.md`; this pass was conducted independently of its body.
- **Verdict: DEFECTIVE.** 4 BLOCKER · 11 MAJOR · 4 MINOR/INFO.

---

## 0 · The evidence gap this seat had to close first

The mega-tranche visual audit captured `/#/admin/users` in nine matrices — 4 Safari light/dark ×
desktop/mobile plus forced-colors, reduced-motion, RTL desktop, RTL mobile, zoom-200 — and **every one of
them is the zero-row state.** `audit/visual/REPORT.md:128,143,158,173` records `text` 273/273/122/122 for the
four Safari rows; every screenshot shows the dock reading `Login` and the panel reading `No users found.`

So the largest component in the palettes area has **never been photographed doing its job**: no row, no
disclosure, no expanded panel, no confirm dialog, no destructive result, no mutation failure. Judging this
design from those frames is judging an empty stage.

I closed the gap with read-only live probes against `http://localhost:9000`, all API traffic intercepted in
the browser, no repo source touched. Frames land in `frames-D2/`. One harness note for reproducibility: the
dev server currently has no `VITE_API_URL`, so `demo/platform/transport/availability.ts:114` trips the
designed `misconfigured` latch and the admin pane falls to a bare `Try again` boundary. The probe rewrites
the *served* `transport/client.ts` module so `BASE_URL` is same-origin; nothing in the component is patched.

| frame | state |
|---|---|
| `frames-D2/A-populated-desktop-light.png` | 6 users, 3 empty, desktop light |
| `frames-D2/B-populated-mobile-light.png` | same roster at 390 |
| `frames-D2/C-populated-rtl-desktop.png` | same roster, `dir=rtl` |
| `frames-D2/D-expanded-desktop-dark.png` | row expanded, dark |
| `frames-D2/D-confirm-prune-filtered-dark.png` | prune confirmation under an active filter |
| `frames-D2/F-prune-result-mobile.png` | after a successful prune, 390 |
| `frames-D2/G-prune-FAILED-desktop-light.png` | after a **500** on the prune endpoint |

**That gap is itself the first design finding.** A surface whose primary state has never been reviewed has
not been designed; it has been written.

---

## BLOCKERS

### D-1 · The confirmation of an irreversible deletion misstates its scope. Measured: 1 promised, 3 executed.

`emptyCount` is derived from the `users` prop (`AdminUsersPanel.vue:241`), and `AdminPane.vue:28` binds that
prop to `pm.filteredAdminUsers` — the **search-filtered, sorted** list (`useAdminUsers.ts:29-48`). The
confirmation copy interpolates that filtered number (`AdminUsersPanel.vue:290-291`). The action it guards
calls `pruneEmptyUsers(token)` with no scope argument at all (`useAdminUsers.ts:190`) — a whole-collection
server mutation.

Reproduction (one probe run, roster of 6 with 3 empty, search = `aaaa-33`):

```
D-filtered: { "headerBadge": "6", "toolbar": ["6 users","· 1 empty"], "renderedRows": 1 }
D-dialog:   "Prune 1 empty users?\n\nThis will permanently delete 1 user with 0 palettes and
             their sessions. This cannot be undone.\n\nCancel\nPrune"
D-after:    POST /admin/users/prune-empty   →  toolbarAfter: ["Pruned 3 users"]
```

Frame: `frames-D2/D-confirm-prune-filtered-dark.png`.

The dialog promised one deletion; the system performed three. Compounding it, the client only ever knows 50
users (`listUsers(token, 50)`, `useAdminUsers.ts:59`), so even *unfiltered* the number in the dialog is a
page count presented as a corpus count.

Visible in the same frame: **"Prune 1 empty users?"** — line 290 carries no plural guard while line 291 does.
The grammar bug is not the finding; it is the tell that this string was never read on screen.

Binding law: `VISUAL-CONSTITUTION.md:218` — "Admin is a five-route review suite … using one review-row
anatomy, query/pagination/state grammar, **dangerous confirmation** … Actor, scope, provenance and effect
remain visible." `PROPORTION-AUDIT.md:55` PR-11 — "Admin rows obscure actor/scope/effect →
**ADD-AFFORDANCE** … One review anatomy with authority/state/confirmation."

**Cure (transposition, not patch).** A bulk irreversible action must confirm against the *server's* scope,
not a client-derived count. The idiomatic shape is the two-phase review PR-11 already prescribes: the prune
affordance resolves the candidate set, the dialog *names* the candidates, and the confirmed call carries
those identities. Patching `emptyCount` to read the unfiltered array only swaps a wrong number for a
differently wrong one, because the client's array is a 50-row page.

---

### D-2 · A failed destructive mutation renders as a benign, self-contradicting success message.

`useAdminUsers.ts:195-198` swallows every prune failure into `return 0`. `AdminUsersPanel.vue:303-309` maps
`0` to the string **"No empty users to prune"**. The two paths — *the server refused* and *there was nothing
to do* — arrive at the same sentence.

Reproduction (probe with the prune endpoint fulfilled `500 application/problem+json`):

```
[warn] Failed to prune empty users: Internal Server Error
PRUNE-FAILURE: { "message": "No empty users to prune",
                 "toolbar": ["3 users", "· 2 empty"],
                 "rowsStillRendered": 3,
                 "anyErrorRole": false }
```

Frame: `frames-D2/G-prune-FAILED-desktop-light.png`. The toolbar simultaneously states *"· 2 empty"* and
*"No empty users to prune"*, ~220 px apart, in the same type register. `role="alert"` count is **0**.

This component already ratified the correct principle for the *load* path — the source comment at lines 49-50
reads "error ≠ empty — a dead backend never costumes as an empty roster", and `EmptyState variant="error"`
implements it (51-62). The principle was applied once and never carried to the mutation path, where the
stakes are higher.

**Cure.** The result channel must carry the three outcomes the action actually has — *pruned N* / *nothing to
prune* / *failed, with the machine reason* — in the error register already ratified at 51-62.
`onPruneDone(count: number)` is the wrong signature: it cannot express failure, so no downstream design can.

---

### D-3 · The unauthenticated state was never designed. It costumes as a clean roster, and Refresh is a dead control.

With no admin token, `loadAdminUsers` returns at `useAdminUsers.ts:55-56` before any request is made. The
panel therefore falls to `AdminUsersPanel.vue:63` and renders the TRUE-EMPTY plate: **"· roster clear · /
No users found."** — a positive factual claim about the corpus, set in Fraunces display, made by an app that
has never asked.

Measured (probe E, no token):

```
E: { "token": null, "adminReqsBefore": 10, "adminReqsAfterRefreshClick": 10,
     "emptyStateSays": "· ROSTER CLEAR · |  | No users found.",
     "refreshDisabled": false, "pruneDisabled": true }
```

Zero new requests after clicking Refresh. **Refresh is enabled, named, styled, and inert.** This is the state
in **all 60 captures** of the mega-tranche audit (`REPORT.md:128,143,158,173`), so the only picture anyone has
ever had of this component is a picture of an undesigned state.

Laws: `PROPORTION-AUDIT.md:70` §5.5 ("A small icon/mark is either data, status, labeled action … or
removed"); §5.6 line 71 ("Subtraction precedes explanation"); `PROPORTION-AUDIT.md:52` PR-08
("Pending/failure/… truth only transient → ADD-AFFORDANCE").

**Cure.** Signed-out is a route-guard species, not a roster species. The admin route should not mount a
roster it cannot populate, and the panel should not own a third empty-shaped state. Subtract the state, do
not annotate it.

---

### D-4 · RTL fabricates identifiers. `empty-ghost-account-aaaa-33` renders as `aaa-33empty-ghost-account-a`.

The tail-priority truncation (`AdminUsersPanel.vue:97-101`, `slugHead`/`slugTail` at 246-252) splits one
identifier into two sibling spans with no bidi isolation. Under `dir=rtl` the bidi algorithm reorders them.

Measured (probe C):

```
C: { "dir": "rtl",
     "headText": "an-extremely-long-anonymous-visitor-slug-from-the-wild-2", "headL": 1010.5, "headR": 1194,
     "tailText": "f9a-33",                                                   "tailL":  950,   "tailR": 1010.5,
     "tailRenderedLeftOfHead": true,
     "countText": "6 users", "countDirection": "rtl", "countUnicodeBidi": "normal" }
```

Frame `frames-D2/C-populated-rtl-desktop.png` shows the rendered result: `aaa-33empty-ghost-account-a` ·
`aaa-77empty-ghost-account-a` · `bbb-11empty-three-b` · `f9a-33…g-from-the-wild-2`. Every one of those is a
string that does not exist. The delete confirmation quotes the *raw* `user.slug` (line 169, unsplit), so the
row and its own confirmation dialog display two different identities for the same account.

The count line inherits the same failure: **"empty 3 · users 6"** in the frame — both the inter-span order and
the number-noun order inside each span invert, because `{{ totalUsers }} user…` (line 9) is a bare
neutral-plus-Latin run in an RTL paragraph.

Binding law, `VISUAL-CONSTITUTION.md:133`:
> "CSS direction keywords, physical axes, code, hex, **slug, ID** | preserve the declared physical/domain
> meaning | **identical domain meaning inside an LTR-isolated value** | … **no custom bidi reinterpretation**"

and `VISUAL-CONSTITUTION.md:154`:
> "CSS strings, hex, **slugs, IDs and provenance** | **render in LTR-isolated spans inside RTL prose**"

The two-span split *is* a custom bidi reinterpretation, which the constitution names and forbids.

**Cure.** The mechanism is the wrong shape even in LTR. Head-elision with a protected tail is one CSS
declaration on one LTR-isolated text node (`direction: rtl; text-overflow: ellipsis` inside a `<bdi>`), not
two spans plus two string functions. The 7-line JS split at 246-252 exists because the CSS idiom was never
reached for — and it drags a bidi defect, a measurement defect (D-11), and a rendering artefact along.

Corroborating artefact, LTR: at 390 the ellipsis does not butt the tail. Frame B shows
`empty-ghost-acco…  aaa-33` with a visible inter-token gap (`headSpanW: 63.7`, `tailSpanW: 51.7`), because
`text-overflow` drops the last partial glyph and leaves its advance as whitespace before the clip edge. At
1440 the same pill renders `an-extremely-long…f9a-33` with no gap. **One identifier, two different rendered
grammars, viewport-dependent.**

---

## MAJORS

### D-5 · The same number, from the same expression, rendered twice, 60 px apart.

`AdminPane.vue:5` renders `<Badge>{{ adminCount }}</Badge>` where `adminCount` is `pm.adminUsers.value.length`
(`AdminPane.vue:117-122`). `AdminUsersPanel.vue:8-10` renders `{{ totalUsers }} user…` where `totalUsers` is
bound to `pm.adminUsers.value.length` (`AdminPane.vue:33`). Same array, same expression, two renderings.

Measured: `headerBadgeText: "6"` / `toolbarText: "6 users"`, both `fontSize 16.4px`. Visible in **every**
audit capture as `Users ⓪` above `0 users`, and in frames A/B/D/F as `Users ⑥` above `6 users`.

`PROPORTION-AUDIT.md:57` PR-13 is the mechanism family (`total 2→1`); §5.6 line 71 is the law: "Subtraction
precedes explanation." The count is the header badge's job; the toolbar span is furniture.

### D-6 · Two different denominators joined by a "·" and read as one sentence.

`totalUsers` is unfiltered (`AdminPane.vue:33`); `emptyCount` is computed over the **filtered** prop
(`AdminUsersPanel.vue:241`). Measured under an active search: toolbar `["6 users", "· 1 empty"]` with
`renderedRows: 1`. The line asserts a population of 6 and a subset of 1 while displaying 1 row; neither
number describes what is on screen.

### D-7 · The roster has no columns. The one scannable quantity sits at five different x-positions.

Measured left edges of the palette-count Badge across 6 rows at 1440 (identical in light and dark):

```
badgeXs:  [313.5, 507, 535.5, 293.3, 454.8]      # 5 distinct x, spread 242.2 px
actsXs:   [549.1, 645]                            # action cluster starts at 2 different x
```

Because the identity pill is `max-w-full` and shrink-to-content (line 98), the badge that follows it (102-104)
lands wherever the slug ends. Frames A and B show it plainly: `12`, `3`, `0`, `0`, `1`, `0` walking diagonally
down the card. For a surface whose entire job is *who owns how many palettes*, the quantity costs a fresh
saccade per row.

Rows with palettes open their action cluster at 549.1 (width 123.9); rows without at 645 (width 28) — a 96 px
hole opens and closes down the list where the `Palettes` button appears and disappears (line 112,
`v-if="user.paletteCount"`).

`PROPORTION-AUDIT.md:5` — "Every element earns its scale, interval, boundary and material from its job
relative to the local protagonist"; line 73 §5.8 — "Real rendered relation wins over token intent."

### D-8 · The disclosure has no affordance at rest, and none when open.

Rows with palettes are `role=button` + `tabindex=0` + `aria-expanded` (78-90); rows without are inert
(measured `interactiveRows: 3`, `inertRows: 3`). **Nothing in the resting paint distinguishes them.** The only
signals are `cursor: pointer`, `hover:bg-accent/50` and `focus-visible:` — all transient. Compare frame `A`
(all closed) with frame `D` (row 1 open): the header row is treated identically in both. No chevron, no
rotation, no persistent open marker, no rule tying the expansion to the row above it.

`PROPORTION-AUDIT.md:51` PR-07 — "**Hover-only**/unlabeled controls and invisible drag state →
ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a name/state." Line 70 §5.5 — a mark is
"data, status, labeled action, drag affordance, focus/selection register or removed."

Aggravating: `expandedUserSlug` is a single ref (236), so opening a second row silently closes the first — an
accordion nobody declared and nothing signals.

### D-9 · The row is a `role="button"` div whose accessible name swallows two destructive actions.

Two-engine `ariaSnapshot`, **byte-identical in WebKit and Chromium**:

```
- button "mbabb 12 Palettes Delete user mbabb":
  - text: mbabb 12
  - button "Palettes":
    - img
    - text: Palettes
  - button "Delete user mbabb"
```

A screen-reader user tabbing to the disclosure hears *"mbabb 12 Palettes Delete user mbabb, button,
collapsed."* The disclosure's own name is the concatenation of the two irreversible actions nested inside it.
This is not an ARIA-attribute bug; it is the consequence of the design decision to make **the whole row** the
button while parking operable controls inside it.

`VISUAL-CONSTITUTION.md:102` states the anatomy for exactly this shape: "One native `<button type="button">`
**spans its specimen/identity region** … The card body owns no expand … or hover-only swatch-action path."
The identity region — pill + count — is the button; the action cluster is its sibling. Here the button is the
container and the actions are its children.

Chromium full tab order (macOS Full Keyboard Access on, so this is the true order; the WebKit delta is
MT-F022 and is not counted):
`… → DIV(role=button "mbabb12 Palettes") → BUTTON "Palettes" → BUTTON "Delete user mbabb" → …`

### D-10 · Two irreversible actions of different scope share one glyph, six pixels apart.

The row cluster (106-131) is `🗑 Palettes` (82 px) then a bare `🗑` (28 px), `gap-1.5` = 6 px. Both are
`Trash2`. One deletes every palette the user owns; the other deletes the user and everything attached. The
sole differentiator in the resting paint is the word **"Palettes"** — which names the *object*, not the
*verb*: nothing on that button says *delete*.

Measured at 390: `Palettes` 82×36, `Delete user …` 28×36; the cluster is 116 px = **36 % of a 324 px row given
to two destructive actions**, against 133 px for identity.

`PROPORTION-AUDIT.md:50` PR-06 — "Three adjacent action species or duplicated selected fills → **REMOVE** …
One action/selection owner." The correct anatomy is one destructive owner per row with scope chosen inside
it, not two identical glyphs racing for the same 6 px of thumb.

The W5-12/F-8 comment at 107-111 claims this family was cured. It cured the *colour* — measured resting ink
`rgb(91,70,51)` light, `rgb(213,208,200)` dark, correctly quiet. It did not reduce the **count**: frame A
shows six resting trash glyphs down the list plus three more inside the `Palettes` buttons. Nine destructive
glyphs on a six-row roster.

### D-11 · The result beat displaces both live controls by 105 px, on the pointer axis.

`<Transition name="vj-celebrate">` wraps a text span (16-20) that is a **flex sibling** of the two action
buttons inside `flex items-center gap-2 flex-wrap` (line 4). Its entry re-flows the toolbar.

Measured at 390, before and after one successful prune:

```
before: Prune empty (x 249.1, y 274.1)   Refresh (x 33, y 318.1)
after:  Prune empty (x 249.1, y 379.1)   Refresh (x 33, y 423.1)     # both +105.0 px
```

Frame `frames-D2/F-prune-result-mobile.png`. The destructive button the user just released moves 105 px down
as the *acknowledgement* of the action.

The same measurement exposes a second defect present **before** any animation: at 390 the toolbar is already
ragged — `Prune empty` right-aligned on line 1, `Refresh` orphaned alone at the left margin of line 2
(x 33 vs 249.1). Two sibling actions of the same species, split across two lines and opposite ends of the
card. Nothing designed that; it is what `<div class="flex-1" />` (line 14) plus `flex-wrap` produces when the
line runs out.

Motion-law status, stated precisely so it is not over-claimed: the transition **is** tokenized
(`demo/styles/animations.css:142-165`, `--duration-fast` / `--spring-bouncy`) and **is** neutralised under
`prefers-reduced-motion` by the global guard at `animations.css:184-192`. The 105 px reflow is not a
transition, so the guard does not touch it — reduced-motion users get the displacement instantaneously
instead of smoothly. The defect is the *layout participation*, not the easing.

Register defect on the same line: the celebration is `text-mono-small text-muted-foreground italic` (17); the
count 40 px to its left is `text-mono-small text-muted-foreground` (8). A one-shot event and a persistent
state speak in the same voice, distinguished by italics.

### D-12 · The area's ratified row primitive is bypassed, and the cure it carries was not copied.

`AdminListItem.vue` is the review-row anatomy for this area. `AdminNamesPanel.vue:44,94` consumes it.
`AdminListSkeleton.vue:4` states the skeleton is "shaped as the **AdminListItem** row grammar" — so
**AdminUsersPanel's loading state is shaped like a row it never renders** (46-48).

`AdminListItem.vue:6-11` documents the S.W5-12 / F-1 cure in its own words:

> "`min-w-0` on the ROW ITSELF — the row is a grid item, and its `min-width:auto` automatic minimum resolves
> to the flex row's min-content …, blowing the track to ~850px at 390."

The hand-rolled row does not carry it. Measured on the live grid item:

```
wrapperComputedMinWidth: "auto"      # the exact condition AdminListItem exists to prevent
wrapperOverflow:         "hidden"    # AdminUsersPanel.vue:68 — clips instead of truncating
rowComputedMinWidth:     "0px"
```

The panel is not currently overflowing (`scrollW 390 = clientW 390`) because `overflow-hidden` on line 68
masks it — a clip, not a truncation. The cure was landed on the shared primitive; the copy never received it.
That is precisely the failure mode a shared primitive exists to make impossible.

`VISUAL-CONSTITUTION.md:218` — "Admin is a five-route review suite … using **one review-row anatomy**".

### D-13 · The destructive dialog is the least legible surface in the app, and the safe exit is the invisible one.

Frame `frames-D2/D-confirm-prune-filtered-dark.png`. `DialogContent surface="glass" :show-close="false"`
(line 159): the pane behind — the search field's `aaaa-33`, the "Start a new palette" card, the very row being
deleted — reads *through* the confirmation copy. The most consequential sentence in the application is
rendered on the most transparent material in the application.

The footer (173-179): `Cancel` is `emphasis="text"` — no container, no border, no fill. `Prune` is a solid
saturated red pill, the only saturated red on the surface. With `:show-close="false"` removing the X, the
**only container-shaped affordance in an irreversible-delete modal is the irreversible action.**

`PROPORTION-AUDIT.md:71` §5.6 and `VISUAL-CONSTITUTION.md:218` ("dangerous confirmation") both bear. The
weight order is inverted: the recoverable path should be the available one.

### D-14 · The sort offers a key the row refuses to display.

`useAdminUsers.ts:36-46` sorts by `slug` | `newest` (`createdAt`) | `palettes`, and `UserSortMenu` exposes all
three (`AdminPane.vue:17-21`). The row renders slug and count only (91-105). Choosing "newest" produces an
order the surface cannot justify — six rows rearranged with no visible cause.

`VISUAL-CONSTITUTION.md:218` — "**Actor, scope, provenance and effect remain visible.**" `createdAt` and
`status` are on the `User` model and are consumed by the sort; neither reaches the row.

### D-15 · Row identity is painted in a variable that carries no information about the row.

Lines 99 and 168: `:style="{ color: safeAccent, borderColor: safeAccent }"`. `safeAccent` is the live picked
colour (`SAFE_ACCENT_KEY`). Every user's identity chip re-paints when the operator picks a different colour in
the picker. Measured across two boots of the same roster: `oklch(0.751 0.147 84.2)` in one (gold), crimson in
the frames captured minutes earlier — same data, different identity paint.

Worse, the chip wears *operable-chrome material*: pill radius, a border, `font-weight: 700`, full accent
chroma. `demo/styles/foundation.css:746` groups `.slug-pill` with `[role="tab"]` and `.glass-resting` for the
operable-chrome border-weight bump. Measured type: pill `Fira Code / 16.4 px / 700 / accent + accent border`;
the real operable controls beside it are neutral glass with `rgb(0,0,0)` (light) / `rgb(255,255,255)` (dark)
text.

**The one element in the row that looks interactive is the only one that is not**, while the real disclosure
(D-8) has no paint at all. `PROPORTION-AUDIT.md:70` §5.5 and line 74 §5.9 ("A renderer specimen is not an
unlabeled button") name this exact inversion. Line 78 §5.13's role matrix assigns identity to
`--type-subheading` and provenance to `text-mono-small`; a slug is provenance, correctly mono-small, and
therefore must not also be the loudest chromatic mark on the card.

---

## MINOR / INFO

### D-16 (MINOR) · Physical-direction margin in a bidi-bearing row.
`AdminUsersPanel.vue:119` — `<Trash2 class="w-3 h-3 mr-1" />`. `mr-1` is physical. Frame C shows the icon
trailing the word with the gap on the wrong side under RTL. The surrounding layout is logical (flex order);
only this margin is not.

### D-17 (MINOR) · Nested housing: three boundary levels around one palette.
Measured resting border chain outward from a row: `DIV.rounded-md.border.border-card-edge` →
`DIV.glass-resting.card.rounded-card`. Expanding adds `border-t` (134) and then seats full `PaletteCard`s
inside (140-151) — pane Card → row box → PaletteCard. Frame D. `PROPORTION-AUDIT.md:48` PR-04 — "Empty/equal
companion Cards and **nested housing** → REMOVE"; line 66 §5.1 — "A page region, empty column, inner stage or
mere padding group does not become a Card by default."

Related, and not this file's code but the frame it was designed into: the route still renders the
`My Palettes` companion at 50 % in **every** capture and every probe frame, against
`VISUAL-CONSTITUTION.md:218` ("Each Admin route uses the full main width: the current Palettes companion …
removed rather than restyled") and `PROPORTION-AUDIT.md:48` PR-04 ("Admin companion `50%→0`"). The row
anatomy above is fighting for 640 px it should not have to.

### D-18 (INFO) · Encapsulation inverted: the child owns list state the parent reaches in and patches.
`defineExpose({ removeUserPalette, updatePaletteTier, clearUserPalettes, onPruneDone, userPalettes })`
(line 389). `userPalettes` (237) is loaded, owned and mutated inside the leaf, and the port drives it through
three imperative mutators plus a completion callback (`useAdminUsers.ts:95,117,132,146`;
`usePalettePorts.ts:121-123`). Five exposed members is the largest imperative surface in the area. The
expanded palettes belong to the port that already owns every other list on this route; the panel should
render props. Owner edict 1 (no god modules — real encapsulation).

Same paragraph: the six confirm refs plus a callback-in-a-ref (255-261) reimplement an imperative modal
driver inside a leaf. glass-ui 7.0.0 ships `./data-table` and `./toast` (verified in
`node_modules/@mkbabb/glass-ui/package.json` exports, version `7.0.0`); neither is consumed anywhere in
`demo/`. The row list and the 3-second self-clearing result span are hand-rolled equivalents of both. Owner
edict 4.

### D-19 (INFO) · Two hygiene items.
- `setTimeout(…, 3000)` at line 308 is never cleared. Two prunes inside 3 s truncate the first message; an
  unmount inside 3 s writes to a dead ref.
- Line 186 imports `Transition` from `vue`. 19 files in `demo/` use `<Transition>`; **exactly one** imports it
  (`grep -rl "<Transition" demo | wc -l` → `19`; `grep -rl 'Transition[ ,}].*from "vue"' demo | wc -l` → `1`).
  It is a built-in the compiler resolves. Owner edict 3 (KISS, no contrivance).

Verified-clean, recorded so the negatives are not re-litigated: `import type` is correct at line 199
(`verbatimModuleSyntax`, edict 8); reactive props destructure with a default is correct at 205-220 (Vue 3.5,
edict 7); the `target === currentTarget` guard at 345 is load-bearing and correct; the shift-click confirm
bypass really was excised (311-314); the resting destructive ink really was quieted (measured); the loading
state really is row-shaped rather than a centered spinner (46-48); motion really is tokenized and
reduced-motion-guarded (`animations.css:142-165,184-192`); no horizontal overflow at 390 (`scrollW 390 =
clientW 390`); and the WebKit/Chromium keyboard delta is macOS Full Keyboard Access per MT-F022 and is not
counted as a defect here.

---

## Where this leaves the component

These are not fifteen independent bugs. They fall into three mechanisms:

1. **Counts and scopes are derived at the wrong altitude.** D-1, D-2, D-5, D-6, D-14 share one cause: the
   panel computes truth from whatever array it was handed instead of receiving it, and the port hands it a
   filtered 50-row page. The confirmation lie (D-1) and the failure lie (D-2) are the same defect in
   different copy.
2. **The row anatomy was hand-rolled instead of consumed.** D-7, D-8, D-9, D-10, D-12, D-15, D-17 all follow
   from re-inventing `AdminListItem` inside this file: no column grammar, no disclosure affordance, a
   container-as-button, duplicated destructive glyphs, the missing `min-w-0` cure, an inverted paint
   hierarchy, boxes inside boxes.
3. **Text is composed by concatenation instead of by typed, isolated values.** D-4 and the
   viewport-dependent ellipsis artefact both come from splitting one identifier into two spans and one
   sentence into two spans, with no bidi isolation on either.

The gestalt cure is to stop authoring a table here. Consume the area's review-row anatomy, receive counts and
scopes from the port rather than deriving them, render identifiers as single LTR-isolated values, and let the
confirmation describe the server's effect. That subtracts roughly the whole toolbar, the whole confirm-state
block, and the slug-splitting pair — the direction `SUBTRACTION.md` and `PROPORTION-AUDIT.md` §6 both point.

**Strongest single defect: D-1.** An irreversible bulk deletion whose confirmation understated its scope by
3× on the first attempt, reproduced in one run, with the frame to prove it.
